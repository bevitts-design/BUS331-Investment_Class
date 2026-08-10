import CoreFoundation
import Foundation

enum CourseMapServiceError: LocalizedError {
    case repositoryNotFound
    case unreadableSource(String)
    case invalidSource([ValidationIssue])
    case externallyModified
    case noMatchingChapter(String)
    case unableToWrite(String)

    var errorDescription: String? {
        switch self {
        case .repositoryNotFound:
            "BUS331 Mission Control could not locate a repository containing course-map.json and the BUS331 build scripts."
        case .unreadableSource(let detail):
            "The course map could not be read. \(detail)"
        case .invalidSource(let issues):
            "The course map is not safe to edit:\n\(issues.map { "• \($0.message)" }.joined(separator: "\n"))"
        case .externallyModified:
            "course-map.json changed after it was loaded. Reload before saving so another edit is not overwritten."
        case .noMatchingChapter(let id):
            "The chapter \(id) no longer exists in course-map.json. Reload before saving."
        case .unableToWrite(let detail):
            "The chapter access changes could not be written. \(detail)"
        }
    }
}

struct CourseMapService {
    private let fileManager: FileManager

    init(fileManager: FileManager = .default) {
        self.fileManager = fileManager
    }

    func load(repositoryRoot: URL? = nil) throws -> CourseMapSnapshot {
        let root: URL
        if let repositoryRoot {
            let selectedRoot = repositoryRoot.standardizedFileURL
            guard RepositoryLocator.isRepositoryRoot(selectedRoot, fileManager: fileManager) else {
                throw CourseMapServiceError.repositoryNotFound
            }
            root = selectedRoot
        } else {
            guard let locatedRoot = RepositoryLocator.locate(fileManager: fileManager) else {
                throw CourseMapServiceError.repositoryNotFound
            }
            root = locatedRoot
        }
        let sourceURL = root.appendingPathComponent("course-map.json")
        let data: Data
        do {
            data = try Data(contentsOf: sourceURL)
        } catch {
            throw CourseMapServiceError.unreadableSource(error.localizedDescription)
        }

        let parsed = try parse(data: data)
        let errors = parsed.issues.filter { $0.severity == .error }
        if !errors.isEmpty { throw CourseMapServiceError.invalidSource(errors) }
        return CourseMapSnapshot(map: parsed.map, sourceData: data, sourceURL: sourceURL, repositoryRoot: root)
    }

    func parse(data: Data) throws -> (map: CourseMap, issues: [ValidationIssue]) {
        let object: Any
        do {
            object = try JSONSerialization.jsonObject(with: data)
        } catch {
            throw CourseMapServiceError.unreadableSource("Malformed JSON: \(error.localizedDescription)")
        }
        guard let root = object as? [String: Any] else {
            throw CourseMapServiceError.invalidSource([.init(severity: .error, message: "The JSON root must be an object.")])
        }

        var issues: [ValidationIssue] = []
        if number(root["schemaVersion"]) != 1 {
            issues.append(.init(severity: .error, message: "schemaVersion must be 1."))
        }

        let course = root["course"] as? [String: Any]
        let courseCode = string(course?["code"])
        let courseTitle = string(course?["title"])
        if courseCode != "BUS331" { issues.append(.init(severity: .error, message: "course.code must be BUS331.")) }
        if courseTitle.isEmpty { issues.append(.init(severity: .error, message: "course.title is required.")) }

        guard let rawSections = root["sections"] as? [[String: Any]] else {
            throw CourseMapServiceError.invalidSource([.init(severity: .error, message: "sections must be an array of objects.")])
        }
        guard let rawChapters = root["chapters"] as? [[String: Any]] else {
            throw CourseMapServiceError.invalidSource([.init(severity: .error, message: "chapters must be an array of objects.")])
        }

        var sections: [CourseMapSection] = []
        var sectionIDs = Set<String>()
        var sectionOrders = Set<Double>()
        for raw in rawSections {
            let id = string(raw["id"])
            let badge = string(raw["badge"])
            let title = string(raw["title"])
            let order = number(raw["displayOrder"])
            if id.isEmpty { issues.append(.init(severity: .error, message: "Every section needs an id.")) }
            else if !sectionIDs.insert(id).inserted { issues.append(.init(severity: .error, message: "Duplicate section id: \(id).")) }
            if badge.isEmpty { issues.append(.init(severity: .error, message: "\(id.isEmpty ? "A section" : id) needs a badge.")) }
            if title.isEmpty { issues.append(.init(severity: .error, message: "\(id.isEmpty ? "A section" : id) needs a title.")) }
            guard let order else {
                issues.append(.init(severity: .error, message: "\(id.isEmpty ? "A section" : id) needs a numeric displayOrder."))
                continue
            }
            if !sectionOrders.insert(order).inserted { issues.append(.init(severity: .error, message: "Duplicate section displayOrder: \(format(order)).")) }
            sections.append(.init(id: id, badge: badge, title: title, displayOrder: order))
        }

        var chapters: [CourseMapChapter] = []
        var chapterIDs = Set<String>()
        var chapterOrders = Set<Double>()
        for raw in rawChapters {
            let id = string(raw["id"])
            let sectionID = string(raw["sectionId"])
            let code = string(raw["code"])
            let title = string(raw["title"])
            let topic = string(raw["topic"])
            let status = string(raw["status"])
            let order = number(raw["displayOrder"])
            let visible = boolean(raw["visible"])
            let label = id.isEmpty ? "A chapter" : id

            if id.isEmpty { issues.append(.init(severity: .error, message: "Every chapter needs an id.")) }
            else if !chapterIDs.insert(id).inserted { issues.append(.init(severity: .error, message: "Duplicate chapter id: \(id).")) }
            if !sectionIDs.contains(sectionID) { issues.append(.init(severity: .error, message: "\(label) references unknown sectionId \(sectionID).")) }
            if code.isEmpty { issues.append(.init(severity: .error, message: "\(label) needs a code.")) }
            if title.isEmpty { issues.append(.init(severity: .error, message: "\(label) needs a title.")) }
            if topic.isEmpty { issues.append(.init(severity: .error, message: "\(label) needs a topic.")) }
            if !["live", "comingSoon"].contains(status) { issues.append(.init(severity: .error, message: "\(label) has unsupported status \(status).")) }
            if visible == true && status != "live" { issues.append(.init(severity: .error, message: "\(label) is available but its status is not live.")) }
            if let links = raw["links"] as? [[String: Any]] {
                if status == "live" && links.isEmpty {
                    issues.append(.init(severity: .error, message: "\(label) is live but has no links."))
                }
                if visible == true && links.isEmpty {
                    issues.append(.init(severity: .error, message: "\(label) is available but has no functional chapter link."))
                }
                for link in links {
                    let linkLabel = string(link["label"])
                    let url = string(link["url"])
                    let style = string(link["style"])
                    if linkLabel.isEmpty { issues.append(.init(severity: .error, message: "\(label) has a link without a label.")) }
                    if url.isEmpty || url == "#" { issues.append(.init(severity: .error, message: "\(label) has a missing or placeholder link URL.")) }
                    if !["primary", "reference"].contains(style) { issues.append(.init(severity: .error, message: "\(label) has unsupported link style \(style).")) }
                    if url.range(of: #"(^|[/_-])(instructor|answer[-_ ]?key|solutions?|grading|qti)([/_.-]|$)|\.zip$"#, options: [.regularExpression, .caseInsensitive]) != nil {
                        issues.append(.init(severity: .error, message: "\(label) links a private or non-public path."))
                    }
                    if url.hasPrefix("/") || url.contains("../") {
                        issues.append(.init(severity: .error, message: "\(label) has a link that escapes the repository."))
                    }
                    if let colon = url.firstIndex(of: ":") {
                        let scheme = String(url[..<colon]).lowercased()
                        if scheme != "http" && scheme != "https" {
                            issues.append(.init(severity: .error, message: "\(label) uses an unsupported URL scheme."))
                        }
                    }
                }
            } else {
                issues.append(.init(severity: .error, message: "\(label).links must be an array of objects."))
            }
            guard let order else {
                issues.append(.init(severity: .error, message: "\(label) needs a numeric displayOrder."))
                continue
            }
            if !chapterOrders.insert(order).inserted { issues.append(.init(severity: .error, message: "Duplicate chapter displayOrder: \(format(order)).")) }
            guard let visible else {
                issues.append(.init(severity: .error, message: "\(label).visible must be true or false."))
                continue
            }
            chapters.append(.init(id: id, sectionID: sectionID, code: code, title: title, topic: topic, status: status, visible: visible, displayOrder: order))
        }

        sections.sort { $0.displayOrder < $1.displayOrder }
        chapters.sort { $0.displayOrder < $1.displayOrder }
        return (.init(courseCode: courseCode, courseTitle: courseTitle, sections: sections, chapters: chapters), issues)
    }

    func writeVisibilityChanges(snapshot: CourseMapSnapshot, visibilityByChapterID: [String: Bool]) throws -> Data {
        let freshData: Data
        do {
            freshData = try Data(contentsOf: snapshot.sourceURL)
        } catch {
            throw CourseMapServiceError.unreadableSource(error.localizedDescription)
        }
        guard freshData == snapshot.sourceData else { throw CourseMapServiceError.externallyModified }

        let updatedData: Data
        do {
            updatedData = try JSONSourceEditor.updatingChapterVisibility(in: freshData, desired: visibilityByChapterID)
            let parsed = try parse(data: updatedData)
            let errors = parsed.issues.filter { $0.severity == .error }
            if !errors.isEmpty { throw CourseMapServiceError.invalidSource(errors) }
            try updatedData.write(to: snapshot.sourceURL, options: .atomic)
        } catch let error as CourseMapServiceError {
            throw error
        } catch {
            throw CourseMapServiceError.unableToWrite(error.localizedDescription)
        }
        return updatedData
    }

    func restore(snapshot: CourseMapSnapshot) throws {
        do {
            try snapshot.sourceData.write(to: snapshot.sourceURL, options: .atomic)
        } catch {
            throw CourseMapServiceError.unableToWrite("Rollback failed: \(error.localizedDescription)")
        }
    }
}

private func string(_ value: Any?) -> String {
    (value as? String)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
}

private func number(_ value: Any?) -> Double? {
    guard let number = value as? NSNumber, CFGetTypeID(number) != CFBooleanGetTypeID() else { return nil }
    return number.doubleValue
}

private func boolean(_ value: Any?) -> Bool? {
    guard let number = value as? NSNumber, CFGetTypeID(number) == CFBooleanGetTypeID() else { return nil }
    return number.boolValue
}

private func format(_ value: Double) -> String {
    value.rounded() == value ? String(Int(value)) : String(value)
}

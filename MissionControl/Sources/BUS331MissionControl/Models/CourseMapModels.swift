import Foundation

struct CourseMapSection: Identifiable, Equatable {
    let id: String
    let badge: String
    let title: String
    let displayOrder: Double
}

struct CourseMapChapter: Identifiable, Equatable {
    let id: String
    let sectionID: String
    let code: String
    let title: String
    let topic: String
    let status: String
    let visible: Bool
    let displayOrder: Double
}

struct CourseMap: Equatable {
    let courseCode: String
    let courseTitle: String
    let sections: [CourseMapSection]
    let chapters: [CourseMapChapter]

    var visibleChapterCount: Int { chapters.filter(\.visible).count }
}

struct CourseMapSnapshot {
    let map: CourseMap
    let sourceData: Data
    let sourceURL: URL
    let repositoryRoot: URL
}

struct VisibilityChange: Identifiable, Equatable {
    let chapter: CourseMapChapter
    let wasVisible: Bool
    let willBeVisible: Bool

    var id: String { chapter.id }
    var action: String { willBeVisible ? "Unlock" : "Lock" }
    var systemImage: String { willBeVisible ? "lock.open" : "lock" }
}

struct WorkflowStepResult: Equatable {
    let title: String
    let output: String
}

enum ValidationSeverity: String {
    case error
    case warning
}

struct ValidationIssue: Identifiable, Equatable {
    let severity: ValidationSeverity
    let message: String

    var id: String { "\(severity.rawValue):\(message)" }
}

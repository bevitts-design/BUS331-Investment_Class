import Foundation

@MainActor
final class MissionControlStore: ObservableObject {
    @Published var selectedFeature: MissionControlFeature? = .chapterVisibility
    @Published private(set) var snapshot: CourseMapSnapshot?
    @Published private(set) var draftVisibility: [String: Bool] = [:]
    @Published private(set) var isWorking = false
    @Published private(set) var errorMessage: String?
    @Published private(set) var successMessage: String?
    @Published private(set) var workflowResults: [WorkflowStepResult] = []
    @Published var searchText = ""

    private let courseMapService: CourseMapService
    private let workflowService: WorkflowService

    init(
        courseMapService: CourseMapService = .init(),
        workflowService: WorkflowService = .init()
    ) {
        self.courseMapService = courseMapService
        self.workflowService = workflowService
    }

    var courseMap: CourseMap? { snapshot?.map }
    var repositoryPath: String? { snapshot?.repositoryRoot.path }
    var repositoryRootURL: URL? { snapshot?.repositoryRoot }

    var changes: [VisibilityChange] {
        guard let courseMap else { return [] }
        return courseMap.chapters.compactMap { chapter in
            let desired = draftVisibility[chapter.id] ?? chapter.visible
            guard desired != chapter.visible else { return nil }
            return VisibilityChange(chapter: chapter, wasVisible: chapter.visible, willBeVisible: desired)
        }
    }

    var isDirty: Bool { !changes.isEmpty }

    var availableAfterSaveCount: Int {
        guard let courseMap else { return 0 }
        return courseMap.chapters.filter { draftVisibility[$0.id] ?? $0.visible }.count
    }

    func load(repositoryRoot: URL? = nil) {
        guard !isWorking else { return }
        errorMessage = nil
        successMessage = nil
        workflowResults = []
        do {
            let loaded = try courseMapService.load(repositoryRoot: repositoryRoot)
            if repositoryRoot != nil {
                RepositoryLocator.remember(loaded.repositoryRoot)
            }
            snapshot = loaded
            draftVisibility = Dictionary(uniqueKeysWithValues: loaded.map.chapters.map { ($0.id, $0.visible) })
        } catch {
            snapshot = nil
            draftVisibility = [:]
            errorMessage = error.localizedDescription
        }
    }

    func isVisible(_ chapterID: String) -> Bool {
        draftVisibility[chapterID] ?? snapshot?.map.chapters.first(where: { $0.id == chapterID })?.visible ?? false
    }

    func setVisible(_ value: Bool, for chapterID: String) {
        if value,
           snapshot?.map.chapters.first(where: { $0.id == chapterID })?.status != "live" {
            errorMessage = "A chapter must be marked live and have a public link in course-map.json before it can be made available."
            return
        }
        errorMessage = nil
        successMessage = nil
        workflowResults = []
        draftVisibility[chapterID] = value
    }

    func discardChanges() {
        guard let snapshot else { return }
        draftVisibility = Dictionary(uniqueKeysWithValues: snapshot.map.chapters.map { ($0.id, $0.visible) })
        errorMessage = nil
        successMessage = nil
        workflowResults = []
    }

    func saveAndRebuild() {
        guard let snapshot, isDirty, !isWorking else { return }
        let desired = draftVisibility
        isWorking = true
        errorMessage = nil
        successMessage = nil
        workflowResults = []

        Task {
            do {
                _ = try courseMapService.writeVisibilityChanges(snapshot: snapshot, visibilityByChapterID: desired)
                do {
                    let results = try await workflowService.run(repositoryRoot: snapshot.repositoryRoot)
                    let reloaded = try courseMapService.load(repositoryRoot: snapshot.repositoryRoot)
                    self.snapshot = reloaded
                    self.draftVisibility = Dictionary(uniqueKeysWithValues: reloaded.map.chapters.map { ($0.id, $0.visible) })
                    self.workflowResults = results
                    self.successMessage = "Saved \(changesDescription(count: desiredChangesCount(snapshot: snapshot, desired: desired))) and rebuilt the student homepage."
                } catch {
                    let workflowError = error
                    do {
                        try courseMapService.restore(snapshot: snapshot)
                        _ = try? await workflowService.run(repositoryRoot: snapshot.repositoryRoot)
                        let restored = try courseMapService.load(repositoryRoot: snapshot.repositoryRoot)
                        self.snapshot = restored
                        self.draftVisibility = Dictionary(uniqueKeysWithValues: restored.map.chapters.map { ($0.id, $0.visible) })
                        self.errorMessage = "The build did not complete, so course-map.json was rolled back safely. \(workflowError.localizedDescription)"
                    } catch {
                        self.errorMessage = "The build failed and automatic rollback also failed. Stop and inspect course-map.json before making another change. Build error: \(workflowError.localizedDescription) Rollback error: \(error.localizedDescription)"
                    }
                }
            } catch {
                self.errorMessage = error.localizedDescription
            }
            self.isWorking = false
        }
    }

    func chapters(in section: CourseMapSection) -> [CourseMapChapter] {
        guard let courseMap else { return [] }
        let query = searchText.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        return courseMap.chapters.filter { chapter in
            guard chapter.sectionID == section.id else { return false }
            guard !query.isEmpty else { return true }
            return [chapter.code, chapter.title, chapter.topic, section.badge, section.title]
                .joined(separator: " ")
                .lowercased()
                .contains(query)
        }
    }
}

private func desiredChangesCount(snapshot: CourseMapSnapshot, desired: [String: Bool]) -> Int {
    snapshot.map.chapters.filter { desired[$0.id] != nil && desired[$0.id] != $0.visible }.count
}

private func changesDescription(count: Int) -> String {
    "\(count) chapter access change\(count == 1 ? "" : "s")"
}

import Foundation

@MainActor
final class PublishStore: ObservableObject {
    @Published private(set) var preflight: PublishPreflight?
    @Published private(set) var result: PublishResult?
    @Published private(set) var errorMessage: String?
    @Published private(set) var isWorking = false
    @Published private(set) var activityLabel: String?
    @Published private(set) var selectedPaths: Set<String> = []
    @Published private(set) var reviewedScope: ReviewedPublishScope?
    @Published var commitMessage = "Update BUS331 chapter access and Mission Control"
    @Published var showsConfirmation = false

    private let service: GitPublishService

    init(service: GitPublishService = .init()) {
        self.service = service
    }

    func resetForRepositoryChange() {
        preflight = nil
        result = nil
        errorMessage = nil
        activityLabel = nil
        selectedPaths = []
        reviewedScope = nil
        showsConfirmation = false
    }

    var selectionBlockers: [String] {
        guard let preflight else { return ["Run publishing preflight first."] }
        return PublishSafetyPolicy.selectionBlockers(
            selectedPaths: selectedPaths,
            eligibleChanges: preflight.eligibleChanges
        )
    }

    var selectionIsReviewed: Bool {
        guard let preflight, let reviewedScope else { return false }
        return reviewedScope.paths == selectedPaths && reviewedScope.preflightFingerprint == preflight.fingerprint
    }

    var canRequestPublish: Bool {
        preflight?.canReview == true && selectionBlockers.isEmpty && selectionIsReviewed
    }

    func runPreflight(repositoryRoot: URL?) {
        guard let repositoryRoot, !isWorking else {
            if repositoryRoot == nil { errorMessage = "Choose a valid BUS331 repository before running publishing preflight." }
            return
        }
        isWorking = true
        activityLabel = "Fetching origin/main and checking the reviewed scope…"
        errorMessage = nil
        result = nil
        preflight = nil
        selectedPaths = []
        reviewedScope = nil
        Task {
            do {
                let completed = try await service.preflight(repositoryRoot: repositoryRoot)
                preflight = completed
                selectedPaths = Set(completed.eligibleChanges.map(\.path))
            } catch {
                errorMessage = error.localizedDescription
            }
            activityLabel = nil
            isWorking = false
        }
    }

    func setSelected(_ selected: Bool, path: String) {
        if selected {
            selectedPaths.insert(path)
        } else {
            selectedPaths.remove(path)
        }
        reviewedScope = nil
        showsConfirmation = false
        result = nil
        errorMessage = nil
    }

    func markSelectedScopeReviewed() {
        guard let preflight, preflight.canReview, selectionBlockers.isEmpty else { return }
        reviewedScope = ReviewedPublishScope(paths: selectedPaths, preflightFingerprint: preflight.fingerprint)
    }

    func requestPublish() {
        guard canRequestPublish, !isWorking else { return }
        showsConfirmation = true
    }

    func confirmPublish(repositoryRoot: URL?) {
        showsConfirmation = false
        guard let repositoryRoot,
              let reviewedPreflight = preflight,
              let reviewedScope,
              canRequestPublish,
              !isWorking else { return }
        isWorking = true
        activityLabel = "Rebuilding, validating, committing, and pushing main…"
        errorMessage = nil
        result = nil
        Task {
            do {
                result = try await service.publish(
                    repositoryRoot: repositoryRoot,
                    reviewedPreflight: reviewedPreflight,
                    reviewedScope: reviewedScope,
                    commitMessage: commitMessage
                )
                preflight = nil
                selectedPaths = []
                self.reviewedScope = nil
            } catch let failure as PublishOperationError {
                result = failure.result
                errorMessage = failure.localizedDescription
            } catch {
                errorMessage = error.localizedDescription
            }
            activityLabel = nil
            isWorking = false
        }
    }
}

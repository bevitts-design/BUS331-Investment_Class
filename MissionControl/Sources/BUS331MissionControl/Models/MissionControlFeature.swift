import Foundation

enum MissionControlFeature: String, CaseIterable, Identifiable {
    case chapterVisibility
    case publishToMain

    var id: String { rawValue }

    var title: String {
        switch self {
        case .chapterVisibility: "Chapter Access"
        case .publishToMain: "Publish to Main"
        }
    }

    var subtitle: String {
        switch self {
        case .chapterVisibility: "Choose which chapters students can open"
        case .publishToMain: "Review, commit, and push safely"
        }
    }

    var systemImage: String {
        switch self {
        case .chapterVisibility: "lock.open"
        case .publishToMain: "arrow.up.circle"
        }
    }
}

import SwiftUI

struct ChapterVisibilityView: View {
    @ObservedObject var store: MissionControlStore

    var body: some View {
        VStack(spacing: 0) {
            header
            Divider()
            if let message = store.errorMessage {
                StatusBanner(kind: .error, message: message)
                    .padding(.horizontal, 20)
                    .padding(.top, 14)
            }
            if let message = store.successMessage {
                StatusBanner(kind: .success, message: message)
                    .padding(.horizontal, 20)
                    .padding(.top, 14)
            }
            if let map = store.courseMap {
                HSplitView {
                    chapterList(map: map)
                        .frame(minWidth: 520)
                    ChangePreviewView(store: store)
                        .frame(minWidth: 300, idealWidth: 340, maxWidth: 400)
                }
            } else {
                unavailableState
            }
        }
        .toolbar {
            ToolbarItemGroup {
                Button {
                    store.load()
                } label: {
                    Label("Reload", systemImage: "arrow.clockwise")
                }
                .disabled(store.isWorking || store.isDirty)
                .help(store.isDirty ? "Discard or save the pending changes before reloading." : "Reload course-map.json")
            }
        }
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(alignment: .firstTextBaseline) {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Chapter Access")
                        .font(.largeTitle.weight(.semibold))
                    Text("Every chapter card stays listed. Choose which chapters students can open; locked cards show a coming-soon preview without a link.")
                        .foregroundStyle(.secondary)
                }
                Spacer()
                if let map = store.courseMap {
                    Text("\(store.availableAfterSaveCount) of \(map.chapters.count) available")
                        .font(.callout.monospacedDigit())
                        .foregroundStyle(.secondary)
                }
            }
            TextField("Search chapters", text: $store.searchText)
                .textFieldStyle(.roundedBorder)
                .frame(maxWidth: 360)
        }
        .padding(20)
    }

    private func chapterList(map: CourseMap) -> some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 22) {
                ForEach(map.sections) { section in
                    let chapters = store.chapters(in: section)
                    if !chapters.isEmpty {
                        VStack(alignment: .leading, spacing: 10) {
                            VStack(alignment: .leading, spacing: 2) {
                                Text(section.badge.uppercased())
                                    .font(.caption.weight(.bold))
                                    .foregroundStyle(.tint)
                                Text(section.title)
                                    .font(.title3.weight(.semibold))
                            }
                            ForEach(chapters) { chapter in
                                ChapterVisibilityRow(
                                    chapter: chapter,
                                    isVisible: Binding(
                                        get: { store.isVisible(chapter.id) },
                                        set: { store.setVisible($0, for: chapter.id) }
                                    )
                                )
                            }
                        }
                    }
                }
            }
            .padding(20)
            .frame(maxWidth: .infinity, alignment: .leading)
        }
    }

    private var unavailableState: some View {
        ContentUnavailableView {
            Label("Course Map Unavailable", systemImage: "doc.badge.ellipsis")
        } description: {
            Text("Mission Control will not make changes until it can safely read the BUS331 source files.")
        } actions: {
            HStack {
                Button("Choose Repository…") { chooseRepository(for: store) }
                Button("Try Again") { store.load() }
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

private struct ChapterVisibilityRow: View {
    let chapter: CourseMapChapter
    @Binding var isVisible: Bool

    var body: some View {
        HStack(alignment: .top, spacing: 14) {
            VStack(alignment: .leading, spacing: 5) {
                HStack(spacing: 8) {
                    Text(chapter.code)
                        .font(.caption.monospaced().weight(.semibold))
                        .foregroundStyle(.secondary)
                    Text(chapter.status == "comingSoon" ? "COMING SOON" : "LIVE")
                        .font(.caption2.weight(.bold))
                        .foregroundStyle(chapter.status == "comingSoon" ? .orange : .green)
                }
                Text(chapter.title)
                    .font(.headline)
                Text(chapter.topic)
                    .font(.callout)
                    .foregroundStyle(.secondary)
                    .fixedSize(horizontal: false, vertical: true)
            }
            Spacer(minLength: 12)
            Toggle(isOn: $isVisible) {
                Text(isVisible ? "Available" : "Locked")
                    .frame(width: 68, alignment: .trailing)
            }
            .toggleStyle(.switch)
            .disabled(chapter.status != "live")
            .help(chapter.status == "live" ? "Toggle student access for this chapter." : "Add and validate a public chapter link in course-map.json before making this chapter available.")
            .accessibilityLabel("\(chapter.title) student access")
        }
        .padding(14)
        .background(.background.secondary, in: RoundedRectangle(cornerRadius: 12))
        .overlay {
            RoundedRectangle(cornerRadius: 12)
                .stroke(.separator.opacity(0.45), lineWidth: 1)
        }
    }
}

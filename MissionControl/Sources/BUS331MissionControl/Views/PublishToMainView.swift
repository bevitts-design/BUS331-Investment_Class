import SwiftUI

struct PublishToMainView: View {
    @ObservedObject var store: PublishStore
    @ObservedObject var missionControlStore: MissionControlStore

    var body: some View {
        VStack(spacing: 0) {
            header
            Divider()
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    safetyCard
                    if let message = store.errorMessage {
                        StatusBanner(kind: .error, message: message)
                    }
                    if let result = store.result {
                        resultCard(result)
                    }
                    if let preflight = store.preflight {
                        preflightCard(preflight)
                        checksCard(preflight)
                        changedFilesCard(preflight)
                        publishCard(preflight)
                    } else if store.result == nil {
                        emptyPreflightCard
                    }
                }
                .padding(24)
                .frame(maxWidth: 920, alignment: .leading)
                .frame(maxWidth: .infinity)
            }
        }
        .confirmationDialog(
            "Commit and push the selected reviewed files to main?",
            isPresented: $store.showsConfirmation,
            titleVisibility: .visible
        ) {
            Button("Commit and Push Selected Files", role: .destructive) {
                store.confirmPublish(repositoryRoot: missionControlStore.repositoryRootURL)
            }
            Button("Cancel", role: .cancel) {}
        } message: {
            Text("This is the final approval step. Mission Control will rebuild and validate again, stage only the selected reviewed BUS331 paths, create one commit, and push main. Pages deployment happens separately.")
        }
    }

    private var header: some View {
        HStack(alignment: .firstTextBaseline) {
            VStack(alignment: .leading, spacing: 4) {
                Text("Publish to Main")
                    .font(.largeTitle.weight(.semibold))
                Text("Review the repository, exact file scope, validation, and GitHub readiness before publishing.")
                    .foregroundStyle(.secondary)
            }
            Spacer()
            if store.isWorking {
                ProgressView()
                    .controlSize(.small)
            }
        }
        .padding(20)
    }

    private var safetyCard: some View {
        HStack(alignment: .top, spacing: 14) {
            Image(systemName: "lock.shield.fill")
                .font(.title2)
                .foregroundStyle(.blue)
            VStack(alignment: .leading, spacing: 5) {
                Text("Publishing is always separate from Save and Rebuild")
                    .font(.headline)
                Text("Nothing is committed or pushed automatically. Run preflight, select files, mark that exact scope reviewed, then approve the final confirmation dialog.")
                    .foregroundStyle(.secondary)
                if let activity = store.activityLabel {
                    Text(activity)
                        .font(.callout.weight(.medium))
                        .foregroundStyle(.blue)
                        .padding(.top, 3)
                }
            }
        }
        .publishCardStyle()
    }

    private var emptyPreflightCard: some View {
        VStack(alignment: .leading, spacing: 12) {
            Label("Preflight has not run", systemImage: "checklist")
                .font(.title3.weight(.semibold))
            Text("Preflight fetches origin/main, checks branch synchronization and authentication, validates the generated files, and identifies which changes are eligible to select. It does not stage, commit, or push files.")
                .foregroundStyle(.secondary)
            Button {
                store.runPreflight(repositoryRoot: missionControlStore.repositoryRootURL)
            } label: {
                Label("Run Publishing Preflight", systemImage: "arrow.clockwise.circle")
            }
            .buttonStyle(.borderedProminent)
            .disabled(store.isWorking || missionControlStore.repositoryRootURL == nil || missionControlStore.isDirty)
            if missionControlStore.isDirty {
                Text("Save or discard pending chapter access changes before running publishing preflight.")
                    .font(.caption)
                    .foregroundStyle(.orange)
            }
        }
        .publishCardStyle()
    }

    private func preflightCard(_ preflight: PublishPreflight) -> some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack {
                Label("Repository preflight", systemImage: preflight.canReview ? "checkmark.seal.fill" : "exclamationmark.triangle.fill")
                    .font(.title3.weight(.semibold))
                    .foregroundStyle(preflight.canReview ? .green : .orange)
                Spacer()
                Button("Run Again") {
                    store.runPreflight(repositoryRoot: missionControlStore.repositoryRootURL)
                }
                .disabled(store.isWorking || missionControlStore.isDirty)
            }
            Grid(alignment: .leading, horizontalSpacing: 24, verticalSpacing: 8) {
                summaryRow("Repository", preflight.repositoryRoot.path)
                summaryRow("Branch", preflight.branch)
                summaryRow("Upstream", preflight.upstream.isEmpty ? "Unavailable" : preflight.upstream)
                summaryRow("Synchronization", preflight.relationshipDescription)
                summaryRow("Current commit", preflight.headSHA)
                summaryRow("Origin", preflight.remoteURL.isEmpty ? "Unavailable" : preflight.remoteURL)
            }
            .font(.callout)
        }
        .publishCardStyle()
    }

    private func summaryRow(_ label: String, _ value: String) -> some View {
        GridRow {
            Text(label)
                .foregroundStyle(.secondary)
            Text(value)
                .fontDesign(.monospaced)
                .textSelection(.enabled)
        }
    }

    private func checksCard(_ preflight: PublishPreflight) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Safety and validation")
                .font(.title3.weight(.semibold))
            ForEach(preflight.checks) { check in
                HStack(alignment: .top, spacing: 10) {
                    Image(systemName: check.state == .passed ? "checkmark.circle.fill" : check.state == .blocked ? "xmark.octagon.fill" : "info.circle.fill")
                        .foregroundStyle(check.state == .passed ? .green : check.state == .blocked ? .red : .blue)
                    VStack(alignment: .leading, spacing: 3) {
                        Text(check.title)
                            .font(.callout.weight(.semibold))
                        Text(check.detail)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                            .fixedSize(horizontal: false, vertical: true)
                            .textSelection(.enabled)
                    }
                }
            }
        }
        .publishCardStyle()
    }

    private func changedFilesCard(_ preflight: PublishPreflight) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Select files to publish")
                    .font(.title3.weight(.semibold))
                Spacer()
                Text("\(store.selectedPaths.count) of \(preflight.eligibleChanges.count) selected")
                    .foregroundStyle(.secondary)
            }
            Text("Only checked, eligible paths can enter the reviewed scope. Mission Control never uses git add -A. When both chapter-map files changed, course-map.json and index.html must stay together.")
                .font(.callout)
                .foregroundStyle(.secondary)
            ForEach(preflight.eligibleChanges) { change in
                Toggle(
                    isOn: Binding(
                        get: { store.selectedPaths.contains(change.path) },
                        set: { store.setSelected($0, path: change.path) }
                    )
                ) {
                    HStack(spacing: 10) {
                        Text(change.displayStatus.uppercased())
                            .font(.caption2.monospaced().weight(.bold))
                            .foregroundStyle(.secondary)
                            .frame(width: 64, alignment: .leading)
                        Text(change.path)
                            .font(.caption.monospaced())
                            .textSelection(.enabled)
                    }
                }
                .toggleStyle(.checkbox)
                .disabled(store.isWorking)
            }

            if !preflight.excludedChanges.isEmpty {
                Divider()
                Text("Excluded changes")
                    .font(.headline)
                Text("These paths are outside this narrowly defined public Mission Control scope. They cannot be selected and will remain unstaged.")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                ForEach(preflight.excludedChanges) { change in
                    HStack(spacing: 10) {
                        Image(systemName: "minus.circle")
                            .foregroundStyle(.secondary)
                        Text(change.path)
                            .font(.caption.monospaced())
                            .textSelection(.enabled)
                    }
                }
            }
        }
        .publishCardStyle()
    }

    private func publishCard(_ preflight: PublishPreflight) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(preflight.canReview ? (store.selectionIsReviewed ? "Selected scope reviewed" : "Explicit review required") : "Publishing blocked")
                .font(.title3.weight(.semibold))
            if preflight.canReview {
                ForEach(store.selectionBlockers, id: \.self) { blocker in
                    Label(blocker, systemImage: "exclamationmark.triangle")
                        .font(.callout)
                        .foregroundStyle(.orange)
                }

                if store.selectionIsReviewed {
                    Label("The exact selected file list and preflight fingerprint are marked reviewed. Changing the selection clears this approval.", systemImage: "checkmark.seal.fill")
                        .font(.callout)
                        .foregroundStyle(.green)
                } else {
                    Text("Inspect every selected path above, then explicitly mark that exact scope reviewed. This review does not stage, commit, or push anything.")
                        .font(.callout)
                        .foregroundStyle(.secondary)
                    Button {
                        store.markSelectedScopeReviewed()
                    } label: {
                        Label("Mark Selected Scope Reviewed", systemImage: "checkmark.seal")
                    }
                    .buttonStyle(.bordered)
                    .disabled(store.isWorking || !store.selectionBlockers.isEmpty)
                }

                TextField("Commit message", text: $store.commitMessage)
                    .textFieldStyle(.roundedBorder)
                Text("The next button opens a separate final approval dialog. Only after that confirmation will Mission Control rebuild, revalidate, verify the review fingerprint, stage the selected paths, commit, and push main.")
                    .font(.callout)
                    .foregroundStyle(.secondary)
                Button {
                    store.requestPublish()
                } label: {
                    Label("Continue to Final Publish Approval…", systemImage: "arrow.up.circle.fill")
                }
                .buttonStyle(.borderedProminent)
                .tint(.orange)
                .disabled(store.isWorking || !store.canRequestPublish || !PublishSafetyPolicy.isValidCommitMessage(store.commitMessage))
            } else {
                ForEach(preflight.blockers) { blocker in
                    Label(blocker.detail, systemImage: "xmark.octagon")
                        .font(.callout)
                        .foregroundStyle(.red)
                }
                Text("Resolve the blockers outside Mission Control, then run preflight again. No Git changes were made.")
                    .font(.callout)
                    .foregroundStyle(.secondary)
            }
        }
        .publishCardStyle()
    }

    private func resultCard(_ result: PublishResult) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            Label(result.succeeded ? "Push completed" : "Recovery status", systemImage: result.succeeded ? "checkmark.circle.fill" : "wrench.and.screwdriver.fill")
                .font(.title3.weight(.semibold))
                .foregroundStyle(result.succeeded ? .green : .orange)
            resultRow("Staged scope", "\(result.stagedFiles.count) reviewed path\(result.stagedFiles.count == 1 ? "" : "s")")
            resultRow("Commit", result.commitSHA ?? "Not created")
            resultRow("Push", result.pushOutput == nil ? "Not completed" : "Completed to origin/main")
            if let failure = result.failureMessage {
                Text(failure)
                    .font(.callout)
                    .foregroundStyle(.red)
                    .textSelection(.enabled)
            }
            Divider()
            Text("GitHub Pages deployment is separate and asynchronous. A successful push means GitHub received main; it does not prove that the live site has finished deploying.")
                .font(.callout)
                .foregroundStyle(.secondary)
            HStack {
                Link("View GitHub Actions", destination: URL(string: "https://github.com/bevitts-design/BUS331-Investment_Class/actions")!)
                Link("Open BUS331 site", destination: URL(string: "https://bevitts-design.github.io/BUS331-Investment_Class/")!)
            }
        }
        .publishCardStyle()
    }

    private func resultRow(_ label: String, _ value: String) -> some View {
        HStack(alignment: .firstTextBaseline) {
            Text(label)
                .foregroundStyle(.secondary)
                .frame(width: 110, alignment: .leading)
            Text(value)
                .fontDesign(.monospaced)
                .textSelection(.enabled)
        }
    }
}

private extension View {
    func publishCardStyle() -> some View {
        self
            .padding(18)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(.background.secondary, in: RoundedRectangle(cornerRadius: 14))
            .overlay {
                RoundedRectangle(cornerRadius: 14)
                    .stroke(.separator.opacity(0.45), lineWidth: 1)
            }
    }
}

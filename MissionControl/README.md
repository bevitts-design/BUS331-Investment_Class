# BUS331 Mission Control

BUS331 Mission Control is a native macOS control panel for safe, instructor-facing course operations. Chapter Visibility is the first feature section; additional course controls can be added through the feature, store, and service layers without duplicating course state.

## Source and save behavior

- `../course-map.json` remains the source of truth.
- The app reads chapter/section names and states from that file; it has no built-in duplicate chapter list.
- Every chapter card remains listed on the student homepage. The `visible` field controls student access: available chapters retain their functional links, while locked chapters render as accessible noninteractive coming-soon previews with no exposed chapter URL.
- Pending chapter-access changes are shown before save.
- A save checks that the source has not changed since load, preserves unknown JSON fields, changes only the selected chapters' `visible` boolean bytes, rebuilds `../index.html`, and validates the result.
- If generation or validation fails, the app restores the original source map and attempts to restore the generated homepage.

## Run locally

From the BUS331 repository root:

```sh
./script/build_and_run.sh
```

The script builds the Swift package and stages `MissionControl/dist/BUS331 Mission Control.app`. Use `--verify` to confirm that the bundled app launches.

The editable icon master is `MissionControl/Assets/AppIcon.svg`: a gold rising market line crossing white candlesticks on a BUS331 navy-and-teal tile. `script/build_app_icon.sh` renders the complete macOS iconset and `.icns`; `build_and_run.sh` embeds that resource and writes `CFBundleIconFile` before signing the app.

Run the framework-free source-data safety checks with:

```sh
./script/test_mission_control_core.sh
```

The checks use a temporary copy of the actual BUS331 course map; they do not alter the maintained source.

## Publish to Main

Publishing is a separate, explicit feature section; saving chapter visibility never stages, commits, or pushes. **Run Publishing Preflight** fetches `origin/main`, verifies that the primary checkout is synchronized on `main`, checks GitHub authentication with a dry-run push, validates the course map and generated homepage, runs the Node and Swift safety checks, and identifies the files eligible for selection.

The review-first sequence is deliberate:

1. Run preflight; no files are staged.
2. Select eligible paths. Changes outside the narrow public Mission Control scope are shown as excluded and cannot be selected.
3. Mark the exact selected scope reviewed. Changing the selection clears this approval.
4. Enter a commit message and continue to a separate final approval dialog.
5. Only after final approval does Mission Control rebuild and validate again, verify the reviewed fingerprint, stage the selected paths with an explicit path list (never `git add -A`), create the commit, and push `main`.

`course-map.json` and its generated `index.html` chapter region must be selected together when both changed. Publishing remains blocked when the branch is not synchronized `main`, conflicts or pre-staged work exist, a required source/build file is missing, validation is stale, authentication fails, or the selected scope no longer matches the reviewed preflight.

The result view distinguishes staging, commit, and push results. A successful push does not mean GitHub Pages is already live; Pages deployment is separate and asynchronous, so the app links to GitHub Actions for deployment status.

A Finder-launched app prefers `~/Documents/GitHub/BUS331-Investment_Class` whenever that primary checkout is complete, even if an older review worktree was previously remembered. Use **Change Repository…** only when the primary checkout is unavailable; `BUS331_REPO_ROOT` remains the highest-priority environment override for controlled testing. The bundled Node runtime used by Codex is discovered automatically; `BUS331_NODE_PATH` is also supported.

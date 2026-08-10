#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CHECK_DIR="$(mktemp -d "${TMPDIR:-/tmp}/bus331-mission-control-checks.XXXXXX")"
trap 'rm -rf "$CHECK_DIR"' EXIT

swiftc \
  -swift-version 5 \
  -o "$CHECK_DIR/bus331-mission-control-core-checks" \
  "$ROOT_DIR/MissionControl/Sources/BUS331MissionControl/Models/CourseMapModels.swift" \
  "$ROOT_DIR/MissionControl/Sources/BUS331MissionControl/Models/PublishingModels.swift" \
  "$ROOT_DIR/MissionControl/Sources/BUS331MissionControl/Services/RepositoryLocator.swift" \
  "$ROOT_DIR/MissionControl/Sources/BUS331MissionControl/Services/JSONSourceEditor.swift" \
  "$ROOT_DIR/MissionControl/Sources/BUS331MissionControl/Services/CourseMapService.swift" \
  "$ROOT_DIR/MissionControl/Sources/BUS331MissionControl/Services/GitPublishService.swift" \
  "$ROOT_DIR/MissionControl/Tests/CoreChecks/main.swift"

BUS331_REPO_ROOT="$ROOT_DIR" "$CHECK_DIR/bus331-mission-control-core-checks"


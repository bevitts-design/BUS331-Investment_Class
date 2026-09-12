# BUS331 Project Guidance

## Project boundary

- This repository is the public, student-facing BUS331 Investments course repository.
- Keep instructor-only answer keys, completed solution workbooks, private assessment content, grading artifacts, student information, and proprietary FactSet captures in the separate `BUS331-instructor` workspace. Student-facing assignment prompts and activity instructions may be public when intended for student access.
- Public decks may contain formative in-class answers and explanations when the interaction itself reveals them. Do not treat this as permission to expose private assignment or assessment solutions.

## Maintained sources

- Treat `course-map.json` as the source of truth for public homepage chapter cards and chapter visibility. Update it instead of hand-editing the managed `BUS331 COURSE MAP` region in `index.html`.
- Treat `MissionControl/Package.swift` and the sources under `MissionControl/Sources/BUS331MissionControl/` as the maintained BUS331 Mission Control desktop app. Saving chapter visibility may rebuild local artifacts; staging, committing, pushing, and publishing must remain separate, explicitly authorized actions. Use authorization already granted within its stated scope without requesting it again.
- Treat `docs/bus331-html-deck-standard.md` as the course-specific design, teaching-pattern, and verification standard for BUS331 HTML decks.
- Treat `styles/bus331-deck.css`, `deck-stage.js`, `image-slot.js`, and the current build scripts as the maintained BUS331 presentation system. Existing decks use shared local runtime files; do not replace them with BUS311-specific scaffolding or inline copies without an explicit migration decision.
- Update deck content in the relevant maintained source module under `scripts/decks/`, then regenerate the HTML. Do not hand-edit a generated deck as the final source of truth.
- Keep source-slide mapping, rights decisions, corrections, and rebuild history in `source-inventory.md`, `review-log.md`, or internal metadata—not on projected slides or in teaching notes.
- Preserve source learning objectives, distinct concepts, assumptions, evidence, and worked examples needed to teach them. Removing that instructional content requires instructor approval; an explicit request to remove or replace it supplies approval within that scope. Duplicate explanations may be consolidated, and obsolete examples may be updated with documented corrections while preserving their instructional purpose. Split, combine, clarify, or rebuild the visual structure as needed.

## HTML slide preferences

- Use BUS331's established navy, gold, teal, terra, and steel investment identity. Do not import BUS311 module branding.
- Build varied, graphic-led slides with one clear teaching message and purposeful investment examples. Follow `docs/bus331-html-deck-standard.md` for detailed visual, activity, reveal, image, numbering, and speaker-note requirements.
- Apply the standard's Excel presentation guidance when Excel supports the lesson's learning objective; quantitative explanations do not automatically require an Excel function or worksheet visual.

## Required verification

- These implementation checks apply after changes to the relevant maintained sources. Read-only audits must not run builders or other commands that write artifacts; report any resulting verification limits. Documentation-only edits require a content and diff review unless they affect generated artifacts or executable behavior.
- For homepage chapter-map data or rendering changes, run `node scripts/build-index.mjs`, `node scripts/validate-course-map.mjs`, and `node --test tests/course-map.test.mjs`. Confirm locked chapter cards expose no functional links.
- For Mission Control app changes, run `bash script/test_mission_control_core.sh` and `swift build --package-path MissionControl`. Run the homepage checks too when changes affect chapter-map data, serialization, or homepage generation. A homepage-only change does not require a Swift build.
- After deck source changes, run the applicable builder before its validator: for Chapters 1–4, use `scripts/build-bus331-intro-m01-m04.mjs` and `scripts/validate-bus331-intro-m01-m04.mjs`; for Portfolio Theory M05, use `scripts/build-bus331-portfolio-m05-l01.mjs` and `scripts/validate-bus331-portfolio-m05-l01.mjs`.
- For deck edits, inspect every revised slide for clipping, overflow, text below the standard's size floor, image loading, notes, and affected interactive states. Check hash navigation, controls, and browser console errors once per affected deck. When shared styles or runtime change, expand inspection to the slides and decks affected by that change. Apply the standard's full lesson review to major rebuilds.
- Independently verify financial calculations when added or changed, and check that affected outputs preserve the public/private boundary. Confirm that boundary again before publication.

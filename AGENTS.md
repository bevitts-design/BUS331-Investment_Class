# BUS331 Project Guidance

## Project boundary

- This repository is the public, student-facing BUS331 Investments course repository.
- Keep instructor-only answer keys, completed workbooks, assessments, grading artifacts, student information, and proprietary FactSet captures in the separate `BUS331-instructor` workspace.
- Public decks may contain formative in-class answers and explanations when the interaction itself reveals them. Do not treat this as permission to expose private assignment or assessment solutions.
- Preserve unrelated work and do not commit, push, publish, or alter external systems unless Bethany explicitly requests it.

## Maintained sources

- Treat `docs/bus331-html-deck-standard.md` as the course-specific design, teaching-pattern, and verification standard for BUS331 HTML decks.
- Treat `styles/bus331-deck.css`, `deck-stage.js`, `image-slot.js`, and the current build scripts as the maintained BUS331 presentation system. Existing decks use shared local runtime files; do not replace them with BUS311-specific scaffolding or inline copies without an explicit migration decision.
- Update deck content in the relevant maintained source module under `scripts/decks/`, then regenerate the HTML. Do not hand-edit a generated deck as the final source of truth.
- Keep source-slide mapping, rights decisions, corrections, and rebuild history in `source-inventory.md`, `review-log.md`, or internal metadata—not on projected slides or in teaching notes.
- Do not remove substantive source information without instructor approval. Split, combine, clarify, correct with documentation, or rebuild the visual structure when needed for teaching and projection.

## HTML slide preferences

- Use BUS331's established navy, gold, teal, terra, and steel investment identity. Do not import BUS311 module branding.
- Build visually varied, graphic-led classroom experiences rather than repeated text-card grids. Each slide needs one explicit teaching message that is understandable from its title and visual.
- Use meaningful investment visuals: risk-return plots, market maps, portfolio allocations, security comparisons, timelines, waterfalls, trading flows, Excel worksheets, and scaled values.
- Structure counterintuitive discoveries as setup or prediction → student work → answer reveal and debrief. Do not show a surprising conclusion without first giving students enough context to reason toward it.
- Give interactive slides precise on-slide directions, timing, interaction method, and a visible deliverable. Put the formative answer, rationale, likely misconception, and debrief question in speaker notes.
- For quantitative work, introduce the relevant Excel function early and prefer editable worksheet-style visuals with formula bars, real cell references, highlighted inputs and results, and consistent inputs across related slides. Show manual arithmetic only when it materially improves conceptual understanding.
- Use real securities, companies, funds, indexes, and market situations. Add purposeful, rights-safe local images or public company logos when they improve recognition; avoid generic placeholders and decorative logo collages.
- Do not use ornamental numeric labels such as `01`, `02`, or `03`. Keep numbers when they carry instructional, financial, date, formula, navigation, course/module, or genuinely sequential meaning.
- Speaker notes are teaching guidance only. Do not put source-deck provenance, carryover decisions, rights review, or production commentary in notes.

## Required verification

- Run the applicable builder before validating a maintained deck.
- For Chapters 1–4, run `scripts/build-bus331-intro-m01-m04.mjs` and `scripts/validate-bus331-intro-m01-m04.mjs`.
- For Portfolio Theory M05, run `scripts/build-bus331-portfolio-m05-l01.mjs` and `scripts/validate-bus331-portfolio-m05-l01.mjs`.
- Inspect every revised slide for clipping, overflow, below-floor text, image loading, hash navigation, notes, controls, interaction behavior, and console errors.
- Verify financial calculations independently and preserve the public/private boundary before publication.


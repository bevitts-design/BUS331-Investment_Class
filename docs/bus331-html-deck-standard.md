# BUS331 editable HTML deck standard

**Status:** Active project standard

**Updated:** July 24, 2026

**Default mode:** Presenter

**Textbook alignment:** Bodie, Kane and Marcus, *Investments*

**Visual authority:** Current BUS331 M01–M05 HTML decks and `styles/bus331-deck.css`

This document is the maintained BUS331 standard for rebuilding PowerPoint, Canva, PDF, and legacy lecture material as editable student-facing HTML. It combines the approved BUS331 investment-course identity with Bethany's cross-course preferences for visually engaging, classroom-ready slides.

## Source-of-truth hierarchy

1. `AGENTS.md` defines repository boundaries and required working behavior.
2. This document defines BUS331 design, teaching, documentation, and review standards.
3. `styles/bus331-deck.css` and the shared local runtime files define the implemented presentation system.
4. Maintained modules under `scripts/decks/` define slide content and speaker notes.
5. Lesson `source-inventory.md` and `review-log.md` files preserve source mapping, corrections, rights decisions, and instructor feedback.
6. Generated HTML decks are deliverables, not the maintained authoring source.

Original decks are read-only content references. Preserve their substantive information, but do not preserve a confusing layout or unclear teaching message merely because it appeared in the source.

## BUS331 design identity

- Lead with navy `#0A2540` and gold `#B8843D`.
- Use teal `#1B6F73` for diversification, positive analytical relationships, and connected market systems.
- Use terra `#9C4A2B` for downside, risk, warnings, losses, and contradictory evidence.
- Use steel `#355773` for supporting structures, neutral comparisons, and secondary analytical paths.
- Use warm paper `#FAF8F3` and white for content surfaces; use dark navy for title, section, quote, and closing slides.
- Use Geist for presentation text, JetBrains Mono for formulas and market labels, and Instrument Serif selectively for quotations or large investment statistics.
- Author at 1920×1080 with a 24px absolute text floor. Split dense material instead of shrinking it.
- Use color semantically and consistently. Decorative color changes that do not communicate meaning are not sufficient visual design.

## Preferred visual character

BUS331 decks should feel like an investment research classroom: analytical, current, professional, energetic, and visually purposeful.

- Give every slide one explicit teaching message. The headline and visual should make the point clear without requiring a long verbal rescue.
- Prefer one or two strong visual chunks; use three only when the relationship requires it.
- Vary slide silhouettes across the lesson. Alternate among market maps, risk-return plots, portfolio allocations, Excel worksheets, security comparisons, timelines, payment waterfalls, data tables, image-led scenes, and sparse statement slides.
- Avoid repeated equal-card grids. The existing project rule remains: generic card grids should be rare, never consecutive, limited to three cards, and replaced whenever a source-specific composition teaches better.
- Use arrows for market transmission, security flows, portfolio decisions, or sequence. Use axes for risk-return and valuation relationships. Use scale when magnitude is the message.
- Keep editable instructional labels in HTML/CSS/SVG. Direct-label charts and diagrams rather than relying on detached legends.
- Use meaningful `role="img"` and `aria-label` text for relationship graphics. Mark purely decorative graphics appropriately.
- Do not use ornamental numeric labels such as `01`, `02`, or `03` on cards, agendas, takeaways, or section tags. Retain numbers only when they are financially, instructionally, chronologically, navigationally, or sequentially meaningful.

## Teaching-message discipline

- Treat source decks as content evidence rather than layout authority.
- When a source slide is confusing, use the surrounding chapter material and BKM terminology to determine the correct teaching message, then rebuild around that message.
- Titles should tell the lesson's story when read in sequence.
- Explain what an investment relationship means for an investor, portfolio manager, issuer, or market—not only how a formula is calculated.
- Use real securities, companies, funds, indexes, asset classes, and market events instead of abstract Company A or Project B placeholders.
- Use current corporate or market examples only after verifying time-sensitive facts. Record refresh requirements in review documentation.

## Setup, participation, and reveal

- Build toward insight rather than displaying a surprising answer in isolation.
- Use setup or prediction → student attempt → reveal and debrief for metric conflicts, security comparisons, portfolio choices, market reactions, and counterintuitive risk findings.
- Give students enough information to calculate, rank, sort, predict, or defend a choice before revealing the conclusion.
- The activity slide must state what students should do, how they should interact, how long they have, and what evidence or recommendation they must produce.
- The reveal slide must explicitly connect to the preceding task, show the answer clearly, and explain why it matters.
- For formative in-deck activities, speaker notes should contain the exact answer, rationale, likely misconception, timing, and debrief question.
- Formative answers in an interactive public deck are not a substitute for the private repository. Completed workbook solutions, assessments, grading keys, and project answers remain instructor-only.

## Excel and quantitative examples

- Introduce the relevant Excel function early so a complex investment calculation feels manageable.
- Prefer an editable Excel-style worksheet with a visible formula bar, row and column headings, real cell references, highlighted inputs and results, and the correct displayed outcome.
- Preserve the same numbers and cell locations across prompt, calculation, sensitivity, comparison, and interpretation slides whenever one model is evolving.
- Show signs, dates, timing, ranges, and absolute-versus-relative references explicitly when they affect the answer.
- Use Excel-native syntax such as `PV`, `FV`, `RATE`, `IRR`, `XIRR`, `NPV`, `STDEV.S`, `CORREL`, or portfolio formulas as appropriate to the lesson.
- Do not require a manual calculation beside every worksheet. Include manual arithmetic when it clarifies the investment concept, exposes a common error, or helps students interpret the function.
- When the lesson involves a student workbook, keep the deck's inputs, labels, formulas, and expected workflow synchronized with that workbook.
- Verify every financial calculation independently before presenting it.

## Images, logos, and market evidence

- Use real corporate, security, market, and asset-class visuals when they materially improve recognition or context.
- Store public company logos and approved images locally. Keep an asset record with the source or rights basis, purpose, and alternative text.
- Use `object-fit: contain` for screenshots, logos, documents, charts, and other images whose full content matters. Use `cover` only for scene-setting photography where cropping is acceptable.
- Rebuild screenshots as editable HTML/SVG when important labels, numbers, formulas, or axes would be unreadable on a projector.
- Do not place proprietary FactSet screens, licensed publisher figures, student information, or private course material in the public deck.
- Avoid decorative logo collages. A logo should help students recognize the company or security being analyzed.

## Speaker notes and source documentation

- Speaker notes are the instructor's teaching script, not a production log.
- Include explanations, examples, answers to formative activities, likely misconceptions, timing, transitions, and debrief prompts.
- Do not include source-slide mapping, original-deck provenance, carryover decisions, rights notes, production commentary, or rebuild history in speaker notes.
- Keep those records in `source-inventory.md`, `review-log.md`, asset documentation, or internal `data-source-slides` metadata.
- Preserve note parity in Presenter mode, even when a note is intentionally brief.

## Runtime and file conventions

- Preserve the existing BUS331 shared local presentation system: `styles/bus331-deck.css`, `deck-stage.js`, `image-slot.js`, and the current builders.
- Existing BUS331 decks may reference shared local runtime files rather than inlining them. This is a deliberate course-specific exception to the generic bus-slide-builder scaffold.
- Preserve URL hashes, slide counter, navigation controls, keyboard access, fullscreen behavior, speaker-note controls, and viewport scaling.
- Keep generated slides linked to their source records with internal `data-source-slides` metadata while removing visible source-slide labels from the projected canvas.
- Use the current course naming patterns such as `bus331-intro-m##-l##-slides.html` and `bus331-portfolio-m##-l##-slides.html`.

## Public and private boundary

The public repository may contain newly authored decks, student activities, starter workbooks, formative interactions, and their in-class reveal states.

Keep these in `BUS331-instructor`:

- completed student workbooks and solution versions;
- assessment and project answer keys;
- grading rubrics, graders, gradebooks, and student submissions;
- instructor-only teaching documents not intended for student access;
- proprietary FactSet captures and licensed publisher solution material.

## Required lesson documentation

Each major rebuild or revision should maintain:

- a rebuild brief;
- a source inventory with every source slide mapped, held, split, combined, corrected, or omitted with approval;
- an asset record for local images and logos;
- a review log classifying instructor feedback and recording its disposition;
- internal `data-source-slides` metadata;
- speaker-note parity in Presenter mode.

Classify instructor feedback as:

- **Global standard:** applies to future BUS331 decks and updates this document.
- **Pattern-level:** applies whenever the same slide type recurs.
- **Deck-specific:** applies only to the current lesson.
- **Correction:** fixes an error without changing the standard.

## Build and verification gates

Before instructor approval:

1. Update the maintained content module rather than only the generated HTML.
2. Rebuild with the applicable BUS331 builder.
3. Run the applicable lesson or module validator.
4. Confirm every local image and SVG loads.
5. Inspect every slide for overflow, clipping, overlap, and text below 24px.
6. Confirm URL hashes, counter, previous/next controls, keyboard navigation, fullscreen, and speaker notes.
7. Test every interactive state and verify that its formative answer matches the speaker-note key.
8. Check the browser console for warnings and errors.
9. Verify numerical accuracy, source coverage, and workbook parity where applicable.
10. Confirm every activity states the action, timing, interaction method, and expected deliverable.
11. Confirm every surprising reveal has a preceding setup or student task and explicitly debriefs it.
12. Inspect the lesson as a sequence for visual variety and replace unnecessary repeated card grids.
13. Confirm projected content contains no ornamental numeric labels or visible production notes.
14. Confirm speaker notes contain teaching guidance only and no source provenance or rebuild commentary.
15. Confirm no private, proprietary, licensed, student, grading, or instructor-only material entered the public repository.

After instructor approval, do not commit, push, or publish until Bethany explicitly requests that workflow.

# BUS331 Chapters 1–4 review log

## Review status

- Status: complete classroom-ready draft pending instructor decisions below
- Source coverage: 198 of 198 source slides mapped or held
- Public mapping: 194 source slides represented in the generated student decks
- Held for instructor review: source slides 3, 9, 62 and 107
- Global rule: do not remove, condense away or publish source information without instructor approval

## Decisions requiring instructor approval

1. Keep source slide 9's named student project-team roster out of the public deck, or replace it with a current roster supplied for this course.
2. Keep source slides 62 and 107 held as stale announcements, or provide current Canvas dates to replace them.
3. Approve the editable reconstructions as the public treatment for licensed FactSet and publisher/vendor screenshots.
4. Confirm the proposed eleven 75-minute lesson divisions.
5. Confirm the source slide 186 correction from the table header “Class B” to “Class C.” The source paragraph and the fee pattern both describe Class C.
6. Confirm how source slide 6's “55% hands-on work” statement should map to the displayed grading rows. The four visible row weights are 30%, 10%, 15% and 45%, but the source does not identify the intended 55% subtotal.

## Calculation review

- Source slide 126: price-weighted index calculation verified as `(100 + 20 + 50 + 10) / 4 = 45`.
- Source slide 144: inside bid–ask spread verified as `286.97 - 286.95 = $0.02`.
- Source slides 164–165: initial margin verified as `6,000 / 10,000 = 60%`; after the price decline, margin is `3,000 / 7,000 = 42.857%`, displayed as approximately 43%.
- Source slide 166: with a $4,000 broker loan and 30% maintenance threshold, the call price is verified as `$4,000 / (100 × 0.70) = $57.142857`, displayed as $57.14.
- Source slide 171: the short-sale formula is corrected to show that dividends and borrow costs reduce profit.
- Source slide 183: NAV independently verified as `(220.075M - 17.050M) / 5.000M = $40.605`, displayed as $40.61 per share.
- Source slide 187: all 5-, 10-, 15- and 20-year proceeds independently match the source after rounding:
  - Fund A: `$10,000 × 1.0975^n`
  - Fund B: `$10,000 × 1.0875^n`
  - Fund C: `$9,400 × 1.092^n`

## Corrections and interpretive rebuilds

- Source slide 44: the Efficient Market Hypothesis is presented as a testable benchmark rather than an absolute claim that prices are always correct.
- Source slide 6: the infographic is rebuilt as three coherent slides. All grading weights and course expectations are preserved; the ambiguous 55% hands-on-work subtotal remains flagged above.
- Source slide 10: the project infographic is rebuilt as five editable slides covering macro scenarios, RRTTLLU constraints, performance measures, SML security selection, AI verification, stress testing and deliverables.
- Source slide 48: unsupported yield ranges are preserved in the speaker note; the student slide uses dated official Treasury figures and the FDIC insurance limit.
- Source slide 49: unsupported expected-return and volatility forecasts are retained in the speaker note but are not presented as forecasts.
- Source slides 53–60: mixed secondary rankings and untraceable forecasts are retained in notes; the student slides use dated primary-source operating measures.
- Source slide 71: the Case-Shiller chart is replaced with an editable current snapshot from the official index source.
- Source slide 76: the CDO structure and full tranche priority from the source note are rebuilt as an editable payment waterfall; a source typographical error is corrected.
- Source slide 75: the dated licensed FactSet TBA analytics screen is rebuilt as a two-slide guide to cohort, coupon, collateral, prepayment, duration, convexity and OAS fields. The complete extracted numeric matrix remains in the speaker note and maintained source record.
- Source slides 85–87, 93, 95 and 96: licensed charts are replaced with official, dated Federal Reserve, New York Fed, Treasury and Freddie Mac data or conceptual reconstructions.
- Source slide 163: Regulation T's 50% initial-margin rule is distinguished from FINRA's general 25% minimum maintenance rule; the source exercise's 30% threshold remains explicit.
- Source slide 186: the public slide uses “Class C,” while the source's conflicting “Class B” table header remains recorded here and in the speaker note.

## Accessibility and public-safety conventions

- Decks use semantic headings, labelled relationship graphics, semantic HTML tables and keyboard navigation from the shared runtime.
- Slide text respects the 24 px minimum floor; dense content is split rather than shrunk.
- Four original chapter-opener images have meaningful alternative text; 785 recurring concept graphics remain editable inline SVG after replacing generic card treatments with larger source-specific compositions.
- Generic numbered-box decoration has been removed. The 12 remaining step-grid slides were replaced with source-specific diagrams, so no `intro-card-number` or `intro-steps` markup remains in the generated decks.
- Every generated slide carries source-slide provenance in internal `data-source-slides` metadata; provenance is not printed on the student-facing slide canvas.
- No named student roster, local path, OneDrive path, BUS311 branding, answer key or grading material is intentionally included.
- Shared runtime references resolve locally from every module.

## Validation and browser QA

- Static validator: passed 465 checks across all four generated decks after the source-graphic, numbered-card, image-restoration, visible-provenance, instructor-slide-removal and quote-focus revisions.
- Coverage: 198 of 198 source slides are mapped or explicitly held.
- Calculations: index, spread, margin, NAV and fund-performance calculations passed independent checks.
- Original browser baseline: 22 representative dense, market-data, formula, table, comparison and flow slides passed at 1280×720 and 1024×768 before the icon-and-image revision.
- Render checks: no below-floor text, out-of-stage elements, meaningful overflow, open-by-default tool menus or incorrect stage scaling were found in the final pass.
- Interaction checks: speaker notes opened and closed correctly; Next advanced the deck and updated the URL hash and slide counter.
- Console: no browser warnings or errors in the final interaction pass.
- QA fixes completed: the presentation-tools menu now honors its collapsed state, table row headers use readable white-on-navy contrast, and the densest project slides use coherent multi-slide layouts rather than fragmented extraction.
- Source-graphic browser recheck: the decks were served locally through an approved HTTP preview path. Ten representative source-inspired slides were visually inspected at 1280×720; five of the densest compositions were also checked at 1024×768. The smaller viewport produced the expected `[0, 96, 1024, 576]` stage box, retained the 24 px authored text floor and showed no out-of-stage elements or meaningful overflow.
- Console: no warnings or errors were reported during the source-graphic browser pass.
- Numbered-card browser recheck: slide 29 and the densest calendar, transcript, stock-index and fund-source graphics were checked at both 1280×720 and 1024×768. All retained the expected 1920×1080 authored bounds with no clipped or out-of-stage descendants.
- Console: no errors were reported during the numbered-card replacement pass.

## Source-image restoration for generated slides 21–23 — 2026-07-23

- Rebuilt the three-slide reveal mapped to source slides 13–15: dated current-events collage → handbag investment question → handbag-fund evidence and risk discussion.
- Restored nine unique embedded source assets: the globe, calendar/announcement icon, four December 2025 headline captures, red handbag photo, Luxusfunds Hermès image and private-fund caption. The handbag is intentionally reused on the two consecutive reveal slides, matching the source sequence.
- Preserved the Forbes headline and link, “If so, what kind?”, “Good Investment or Gamble?” and “What could go wrong?” as editable student-facing text.
- Marked the current-events collage as a December 2025 example and added a speaker note to refresh the headlines before class; it is not represented as current July 2026 market data.
- Rights review remains advisable before public distribution because the restored visuals inherit the source deck's mixed Canva, Adobe and publisher-image provenance.
- Static validation passed 465 checks with 252 generated slides and complete 198/198 source coverage. The new checks require every restored asset, meaningful alternative text, all discussion prompts and the dated-news recheck note.
- Browser QA passed on generated slides 21–23 at 1280×720, 1024×768 and the 455×677 instructor-review viewport. All images loaded; the 24 px authored text floor remained intact; no content left the slide bounds; Next advanced 21 → 22 → 23; the dated speaker note opened correctly; and the console remained clean.

## Visual revision record — 2026-07-23

- Added `assets/bus331-intro/m01-investment-environment.png`: investment-research workspace with charts, documents and portfolio-analysis cues.
- Added `assets/bus331-intro/m02-asset-classes.png`: asset-class still life with bond, real-estate, gold, global-market and derivative cues.
- Added `assets/bus331-intro/m03-trading-infrastructure.png`: exchange and market-infrastructure scene with server, network and price-discovery cues.
- Added `assets/bus331-intro/m04-pooled-investments.png`: pooled-investment funnel and diversified-basket metaphor.
- Replaced 864 generic two-digit box labels with contextual graphics. Ordered procedures retain numbers so sequence remains explicit.

## Source-inspired graphic rebuild — 2026-07-23

- Re-rendered 24 generated slides with visual structures drawn from the original PowerPoint rather than the shared card template.
- M01 now includes a five-part portfolio-project control panel, an asset-allocation/security-selection split, an editable risk-return plot and a capital-flow system map.
- M02 now includes a financial-crisis taxonomy, MBS cash-flow loop, CDO payment waterfall, three-market spectrum and four distinct price- versus market-cap-weighting graphics.
- M03 now includes an IPO underwriting hierarchy, three-lane market mosaic, clearinghouse triptych, margin gauge and short-selling lifecycle.
- M04 now includes an investment-company family tree, reconstructed ETF issuance chart and editable equity/fixed-income style boxes.
- Source slide 191’s ETF category values were restored to the student deck. The six categories independently sum to $597.505 billion for 2023, $1.144853 trillion for 2024 and $1.416635 trillion for 2025.

## Numbered-card replacement — 2026-07-23

- Replaced all 12 uses of the repeated four-card step template across M01–M04.
- Slide 29 now uses a FactSet e-learning library composition inspired by source slide 18 rather than four numbered boxes.
- Other replacements include workstation and activation interfaces, a help orbit, news-evidence funnel, economics calendar, comparable-company workbench, transcript-and-reported-data panel, sector-intelligence map, FactSet exploration lab, stock-index lens and primary-document pyramid.
- All replacements are editable HTML/SVG, use the BUS331 navy/gold/teal/terra palette, retain the complete source instructions and carry accessible diagram labels.

## Source slide 2 image restoration — 2026-07-23

- Replaced generated slide 3’s six-card grid with one image-led welcome composition.
- Restored both original embedded book-cover images: the 13th-edition Bodie, Kane and Marcus textbook and the instructor’s 1998 Investments text.
- Consolidated the course description and CFA Level I learning-path comparison into two readable visual chunks while retaining every substantive source statement in the maintained content module.
- Browser QA passed at the instructor-comment viewport of 818×994 and the classroom viewport of 1280×720. Both images loaded, the authored slide retained its 1920×1080 bounds, and no clipping or console errors were detected.

## Student-facing provenance cleanup — 2026-07-23

- Removed visible “Source slide” identifiers from every M01–M04 header, activity slide and diagram accessibility label.
- Removed the student-facing “Source visual held for review” banner; that licensing and review status remains in speaker notes, the maintained source record and `source-inventory.md`.
- Preserved internal `data-source-slides` mappings on all 253 generated slides so coverage validation and future maintenance remain intact.
- Browser checks at 818×994 and 1280×720 found no visible source-slide labels, no source-review banners, no clipping and no console errors across representative content and activity slides.

## Meet-your-instructor slide removal — 2026-07-23

- Removed the entire generated “Meet your instructor” slide from M01 at the instructor’s request.
- Preserved source slide 3’s text, speaker note, visual count and removal reason in the maintained source record and `source-inventory.md`.
- M01 now contains 79 generated slides; the four-module total is 253.
- Browser QA at 818×994 confirmed that the former slide 4 is absent, the quote slide now occupies position 4, all 79 M01 slides retain internal mappings, and no console errors occurred.

## Quote-focus revision — 2026-07-23

- Rebuilt the Benjamin Franklin attribution slide as a dark, full-canvas quote composition with the quotation as the dominant visual element.
- Moved “Often attributed to Benjamin Franklin” to the bottom of the composition and removed the former attribution card.
- Omitted the original source speaker note from the generated student deck at the instructor’s request; the complete note remains preserved in `bus331-intro-source-data.mjs` and the source inventory.
- Browser QA passed at 818×994 and 1280×720. The attribution remained anchored at the bottom, the generated note record was empty, and no console errors occurred.

## Investment-project workflow revision — 2026-07-23

- Combined the former generated slides 5 and 6, both mapped to source slide 5, into one graphical research-to-presentation workflow.
- Preserved podcasts, current events, Canvas discussion groups, ETF prospectus research, Excel, FactSet, comps valuation, DCF, and mutual-fund NAV and fee calculations.
- Replaced the repeated card grids with an editable market-input → analysis-and-valuation → presentation composition using purposeful teal, gold, steel and terra roles.
- Retained the original source speaker note about following current events.
- Browser QA passed at the 455×677 review viewport and 1280×720 classroom viewport. The complete workflow stayed inside the authored slide, retained every visible label, and produced no console warnings or errors.

## Generic-card-grid removal and layout-diversity rule — 2026-07-23

- Replaced the default equal-rounded-textbox renderer across M01–M04 with adaptive editable compositions: editorial ribbons, open cascades, connected concept maps, overlapping triads, paired shapes and single-message spotlights.
- Reduced generated `intro-grid` use from 115 slides to zero. Student activity prompt layouts remain distinct and are not treated as generic content grids.
- Rebuilt generated slides 9–11 in M01 from source slide 7 as a 100% grade-allocation bar, a 65% weekly-work pathway and a 35% concept-check/project demonstration.
- Added project rules limiting generic card grids to one per 15 slides, prohibiting consecutive uses and grids above three cards, and preventing one adaptive fallback layout from dominating a module.
- Extended the validator to enforce those rules, confirm the six grading weights sum to 100%, preserve the source grading details and detect repeated fallback compositions.
- Static validation passed 446 checks with 252 generated slides and 198/198 source slides mapped or held.
- Browser QA checked 15 representative grading, ribbon, cascade and concept-map slides at 455×677, 1024×768 and 1280×720. No content left the authored slide bounds, and no console warnings or errors were reported.

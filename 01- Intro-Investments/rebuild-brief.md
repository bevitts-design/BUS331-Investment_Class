# BUS331 Chapters 1–4 rebuild brief

## Communication job

By the end of these modules, undergraduate Investments students should be able to describe the investment environment, classify major financial instruments, explain how securities are issued and traded, calculate the effects of margin and short selling, and compare pooled-investment structures and fees.

## Source and scope

- Source deck: `Investments - Intro Chapter 1 -4.pptx`
- Textbook alignment: *Investments* by Bodie, Kane and Marcus
- Source scope: 198 slides covering course orientation and textbook Chapters 1–4
- Destination: `01- Intro-Investments`, organized as M01–M04
- Class format: Tuesday/Thursday, 75 minutes
- Design authority: the completed BUS331 Chapter 5 pilot and shared BUS331 runtime
- Source rule: preserve every substantive source element; split dense slides rather than deleting content
- Speaker-note rule: retain original notes and label instructor-added transitions and corrections

## Proposed 75-minute lesson boundaries

1. M01 Tuesday 1 — Course launch and the investment question (source slides 1–16)
2. M01 Thursday 1 — FactSet orientation and information workflow (source slides 17–31)
3. M01 Tuesday 2 — Assets, agency and the investment process (source slides 32–46)
4. M01 Thursday 2 — Risk, diversification and financial intermediaries (source slides 47–62)
5. M02 Tuesday 3 — Financial markets, crises and securitization (source slides 63–88)
6. M02 Thursday 3 — Interest rates, bonds and credit (source slides 89–111)
7. M02 Tuesday 4 — Equity, exchanges, indexes and derivatives (source slides 112–130)
8. M03 Thursday 4 — Issuance, trading venues and market mechanics (source slides 131–160)
9. M03 Tuesday 5 — Margin, short selling and market regulation (source slides 161–178)
10. M04 Thursday 5 — Fund structures, NAV, fees and ETFs (source slides 179–193)
11. M04 Tuesday 6 — Fund calculations and ETF research lab (source slides 194–198)

Each chapter remains one navigable deck. These lesson boundaries are internal section breaks, not separate files.

## Visual and instructional treatment

- Use the BUS331 navy, investment gold, teal, warm-neutral and restrained-terra palette.
- Use Instrument Serif, Geist and JetBrains Mono from the Chapter 5 pilot.
- Open each chapter with one original, image-led editorial scene composed for the BUS331 palette and paired with meaningful alternative text.
- Preserve the two original source-slide-2 textbook covers in the M01 welcome slide; pair them with consolidated editable course-introduction copy rather than a fragmented card grid.
- Use editable inline SVG symbols to give recurring concepts a visual anchor. Ordinary cards are icon-led; numeric badges are reserved for genuine procedures and ordered sequences.
- Do not use repeated rows of equal rounded textboxes with an icon and paragraph as the default content layout. Changing only the icons or colors does not create meaningful visual variety.
- Choose the visual form from the information structure: percentages use proportional charts; sequences use pathways or timelines; hierarchies use trees or pyramids; comparisons use matrices, scales or side-by-side compositions; cause-and-effect uses connected systems; and a single central idea uses editorial typography or an image-led composition.
- A generic card grid may appear no more than once per 15 generated slides, never on consecutive slides, and may contain no more than three cards. Four or more peer items must become a meaningful visual system or be divided across slides.
- Adaptive fallback compositions must also be varied: no single fallback type may account for more than 55% of a module’s adaptive concept slides, and the same composition may not repeat three slides in succession.
- For visually distinctive source slides, preserve the original visual grammar with an editable reconstruction: charts remain charts, hierarchies remain hierarchies, taxonomies remain taxonomies, and cash-flow or market-system diagrams retain their directional structure.
- Rebuild flows, comparison diagrams, timelines, formulas and source tables as editable semantic HTML.
- Treat licensed FactSet, publisher and vendor captures as held source visuals; preserve their instructional purpose with editable reconstructions.
- Split dense originals into multiple generated slides so the minimum slide-text size remains 24 px.
- Mark section-break slides and explanatory transitions as instructor additions in metadata and speaker notes.
- Keep source-slide provenance in internal metadata, speaker notes and the source inventory; do not print source-slide identifiers or instructor-review banners on the student-facing slide canvas.

## Privacy, licensing and public-deck boundaries

- Source slide 9 contains named student team assignments and is held out of the student deck.
- Source slide 3 contains professional biography, personal/family imagery and detail; the instructor requested removal of the entire slide from the student deck on July 23, 2026, while its source record remains preserved for review.
- Source slides 62 and 107 contain stale dated class announcements and are held out of the student deck.
- Licensed FactSet screens and publisher/vendor screenshots are not embedded.
- No local file paths, OneDrive paths, source PowerPoint, answer keys or grading artifacts are exposed.

## Time-sensitive content

- Market rates, inflation, mortgage rates, housing data and company operating statistics are updated with dated official primary sources.
- Every current-data speaker note says to recheck the figure before class.
- Unsupported forward-looking ranges and mixed-metric rankings from the source are preserved in speaker notes for review rather than presented as current fact.

## Source of truth and generation

- Maintained source audit: `scripts/decks/bus331-intro-source-data.mjs`
- Maintained authored content: `scripts/decks/bus331-intro-m01-m04-content.mjs`
- Shared visual system: `styles/bus331-deck.css`
- Builder: `scripts/build-bus331-intro-m01-m04.mjs`
- Validator: `scripts/validate-bus331-intro-m01-m04.mjs`
- Generated outputs: the four M01–M04 HTML files and `source-inventory.md`

# Efficient diversification image lesson

Local draft requested October 12, 2026. Scope: replace the teaching sequence represented by Canva pages 18–70 with no more than 30 copyable slide images. Original design DAHXc4bDiXg, “Updated: BUS331 Chapters 6–7,” has 70 pages. Pages 1–17 are outside this replacement scope.

## Governing sources

- Current source deck: https://canva.link/7i0yxwmgc2owrwo. Read rich text and inspect page thumbnails for the requested range. Some source pages contain raster artwork, so text extraction alone is incomplete.
- Chapter 7 Integrated Excel.xlsx, supplied instructor reference: inspect all Q1–Q7 labels, input ranges and formulas. Classroom examples use different values. No completed assigned answers are included in the new image package.
- Bodie_Investments_13e_IM_CH07_a11y.docx: chapter overview and learning objectives inform coverage. Its embedded recommendations are reference content, not additional user instructions.
- Course Presentation Design Standard v1.2, maintained DOCX: read the current standard rather than using the skill's v1.1 transcription as authority.
- BUS331 course profile: navy/gold/teal/terra/steel palette. The current task requests flattened images; the standard's editable-object default is therefore an explicit format exception. Georgia substitutes for unavailable Georgia Pro. These assets do not migrate the existing HTML scaffold or runtime.

## Diagnosis and reconciliation

The source introduces frontier/CAL concepts before basic risk calculations, follows with a long sequence of individually solved calculations, then restarts two-asset formulas and frontier explanations. Condense repeated exposition and use coherent examples; preserve the required distinctions and methods.

| Original Canva pages | Treatment | New destination | Reason |
|---|---|---|---|
| 18 | REDESIGN | 1 | Replace section cover with an investable risk question |
| 19–20 | COMBINE / MOVE | 22–23 | Teach variance first, then minimum variance and efficient upper branch |
| 21–23 | COMBINE / MOVE | 24–27, 29 | Connect risk-free mixing and the steepest CAL to Sharpe calculations |
| 24–27 | COMBINE / REFINE | 29 and teaching guide | Retain CAL/CML distinction and investor choice; distinguish arbitrary risky mix from market portfolio |
| 28–29 | COMBINE / REDESIGN | 2–3 | Keep firm-specific/systematic risk and risk reduction with meaningful graphics |
| 30–34 | COMBINE / REFINE | 4–7 | One state table, mean, worked variance, Excel construction; bond result included without a second derivation slide |
| 35–37 | REFINE | 8–10 | Intuitive sign, one covariance solve, correlation scale |
| 38–40 | COMBINE / REFINE | 13–14 | Preserve scenario-versus-sample distinction and n−1; demonstrate actual Excel functions |
| 41–43 | REFINE | 15–17 | Keep consistent summary inputs; teach three additive variance terms |
| 44 | REDESIGN | 20 | Fixed-weight correlation sensitivity makes the causal relationship explicit |
| 45–46 | COMBINE | 11–12, 18–19 | Move negative co-movement into practice; use the running portfolio for the second practice cycle |
| 47–48 | COMBINE / REFINE | 18–21 | Practice changing weights, then show formulas with fixed references |
| 49 | COMBINE | 23 | One frontier treatment rather than separate repeated definitions |
| 50–51 | REFINE | 24–25 | Preserve attempt/reveal and best-candidate-versus-continuous-optimum distinction |
| 52–55 | COMBINE / REFINE | 26–28 | Formula logic, Excel construction, and total-versus-excess return transfer |
| 56 | COMBINE | 29 | CAL/CML distinction beside the complete-portfolio allocation |
| 57 | COMBINE | 21, 28, 30 and teaching guide | Put reference, units, constraint and interpretation checks where they matter |
| 58 | KEEP / MOVE | 22 | Minimum-variance calculation is a stated manual learning objective, not merely optional |
| 59 | REFINE | 30 and teaching guide | Keep estimates and trading-cost caveats; advanced downside/factor/dynamic methods remain further-study references rather than calculations in this core lesson |
| 60–61 | COMBINE | 16–17 | Remove repeated section cover and repeated core formulas |
| 62–64 | COMBINE | 3, 8, 10, 20 | Consolidate recurring co-movement explanations and correlation cases |
| 65 | REMOVE | — | Decorative hedge joke adds no required concept; retain the genuine perfect-negative-correlation hedge condition in 20's notes |
| 66–68 | COMBINE | 23 | Consolidate repeated frontier cover, picture and definition |
| 69–70 | COMBINE | 15–16 | Repeated input set and return example already taught |

Added scaffolding: explicit scenario practice/reveal (11–12), absolute-reference construction (21), Q6/Q7 input convention transfer (28), and concise pooling/sharing/time-horizon limits (30). Multi-asset input requirements appear on 23. Chapter objectives are preserved in the slides and guide; multi-asset Solver implementation is not part of the supplied Q1–Q7 tasks.

## Workbook skill alignment

| Question | Skills | Slides |
|---|---|---|
| Q1 | Probability-weighted mean, variance, SD | 4–7, 11–12 |
| Q2 | Weighted covariance, correlation | 8–12 |
| Q3 | Two-asset mean, variance and SD | 15–19 |
| Q4 | Historical sample variance and SD | 13–14 |
| Q5 | Vary weights, lock inputs, interpret opportunity set | 18–23 |
| Q6 | Optimal risky weights from excess returns | 24–28 |
| Q7 | Convert total returns to excess returns; maximize Sharpe | 24–28 |

Workbook construction tables explicitly say practice layout. Equivalent cell positions are used where useful, but the scenario has three rows rather than the assignment's four and all classroom numerical inputs differ. Notes identify the correct assignment ranges and output positions. No student counterpart was provided, so no paired workbook alignment is claimed; no workbook was edited.

## Rights and verification

All new diagrams, charts and layouts are original. Do not copy licensed publisher figures or private answer-key screens into student-facing material. Numerical results are independently calculated in the builder, including variance terms, correlation, sample statistics, minimum-variance weight and tangency weight. Formula references and copied-down behavior were checked against the current workbook and independently evaluated using classroom inputs. Native Excel recalculation was not run; no workbook was changed.

Visual review: inspect all new rendered slides and revise glyphs, co-movement illustration, chart labels and spacing. Source-deck review uses current text and 53 page thumbnails, not a full-resolution original-deck audit. Nothing is committed, pushed, published or written to Canva. Instructor-key defects are documented separately outside this public repository.


## October 13: daily prices through portfolio risk extension

Deck-specific instructor request: expand the daily-prices/returns section into a step-by-step conceptual lesson while leaving actual workbook formulas and cell references for students to determine independently. This explicit instruction overrides the standard's workbook-reference display preference for this extension. Maintained source: `multi-asset-extension.json`; builder: `scripts/build-bus331-multi-asset-extension.py`. The original 30-slide package and Canva design are preserved.

The former daily-return, covariance and portfolio-calculation slides are expanded into matching-date prices, simple returns, return observations, deviations, sample covariance, covariance matrix, weighted daily returns, sample portfolio volatility, equivalent covariance risk, annualization and independent construction. The log-return distinction is retained; annual compounded growth convention is retained in teaching guidance. Sharpe and Solver concepts remain, with workbook-specific construction removed in accordance with the request. Hypothetical SPY/GLD prices are illustrative, not observed market data or assignment answers.

Visual treatments: price/return/deviation tables deliberately reuse a consistent model; covariance matrix and weighted-return ledger carry the same observations forward; log comparison and Solver parameter comparison retain their established layouts. Georgia is the preview substitute for Georgia Pro. Existing flattened-image format is retained; content remains editable in JSON, not as individual objects in Canva.

Verification: all 15 rendered slides inspected for clipping, overlap and readability; independent sample covariance, variances, daily portfolio return series, matrix identity and annualization checks pass. No workbook formulas or cell addresses appear in the source or notes. Each slide has matching teaching notes. No workbook, HTML runtime, homepage or external Canva design was changed. No private workbook solutions or proprietary captures added. Nothing committed, pushed or published. The ZIP, PDF and gallery list the current 15-slide sequence; earlier loose PNGs are preserved but are not included in the current package.


## October 16, 2026 — LN / EXP clarification

- Reviewed live Canva DAHXc4bDiXg slides 53–57; slide 55 combined daily-return definitions with a compressed LN/EXP example.
- Rebuilt the explanation as five steps: growth factors, multiplication, natural logs, summation, inverse EXP conversion. Preserve the $100/$102/$104.04 example, the distinction between log and simple gains, and the exact simple-return weighting caution. Additional instructor explanation remains in local Teaching-Notes.md.
- Maintained content: multi-asset-extension.json; renderer: scripts/build-bus331-multi-asset-extension.py. Regenerated the 15-slide local package; no workbook or private content changed. Older generated PNGs are retained as historical artifacts and excluded from the current manifest/package.
- Applied maintained Course Presentation Design Standard v1.2 over the skill transcription v1.1. Local renderer uses Georgia in place of Georgia Pro. Canva preserves the existing typeface; exact Georgia Pro assignment is unavailable through this editing API.
- Local slide visually inspected; builder bounds and independent compounding checks passed. Live Canva slide 55 was saved after explicit user approval of the final preview; Canva confirmed transaction 2567570948548720915 committed. No sharing/publication or Git commit/push performed.

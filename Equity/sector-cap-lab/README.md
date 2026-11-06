# Equity Research Lab — local teaching prototype

Open `index.html` in a browser. The maintained sources are `index.html`, `lab.css`, `model.js` and `lab.js`; no build or external dependencies are needed. Changes are local and unpublished. No homepage, deck, workbook or overall project requirement is changed.

Students choose an individual company or equity ETF, research one candidate and one comparable alternative in FactSet, try base/downside scenarios, and produce an Equity Analysis Report. Bond, leveraged, inverse and other non-equity ETFs remain excluded. Eligibility is a student classification to verify using source material; the app has no live FactSet connection or ticker classifier.

## Compact student inputs

Each security has one shared source/report, research date and optional notes field. Metrics use a value and, only when useful, a short qualifier. P/E is a number plus a Forward / Trailing / Other / Not meaningful / Unavailable selector. Other reveals one short type field. Not meaningful/unavailable disables the number without erasing it, so switching back or importing older work is safe. Percentages use 5 for 5%. Units are supplied by the metric labels; note any differences in the shared notes. Leave unavailable metrics blank, explaining important gaps or different sources/dates in the optional notes.

Eight core metrics per asset type are shown directly. Extra metrics and definitions sit behind expandable help. Company fields include price, P/E, EPS, growth, market capitalization, beta, volatility and yield. Equity ETF fields include price, P/E, beta, volatility, yield, trailing one-year return, NAV and expense ratio. Sector/industry or benchmark/focus are recorded once. Research is sequential: complete security 1, use Save & research security 2, and complete security 2 independently. Previous/Next controls follow that sequence while allowing review. No comparison table appears during data entry. The final Comparison & report stage and PDF automatically generate the same side-by-side identity, source/date and metric tables; ETFs also get a sector comparison. Missing entries remain explicit, and different P/E periods are flagged without declaring a winner.

ETFs retain all eleven equity sector weights plus cash and other/unclassified, reconciling to 100% within 0.1 percentage point. Do not normalize away residuals. Each sector and holdings table has one source/date pair; blank table provenance inherits the security’s shared source/date. Largest-holding rows take a name or ticker, weight and optional sector. Unused rows may stay blank. Concentration and overlap are discussed in the final response, rather than repeated beside each table.

The final form asks for a decision/total-portfolio weight and three shared responses: valuation versus the alternative; risks and potential rewards, including reconsideration evidence; and the choice’s fit with the client. Starting context is just client/team and the investment role. Detailed Phase 4 notes are optional. Earlier saved responses remain editable under optional details and appear in the report when populated; they do not become required blanks for new users.

## Calculations and evidence

Scenarios remain one-year conditional assumptions. Company P/E scenarios use positive EPS × (1 + EPS growth) × ending P/E; negative or unsuitable earnings require an alternative supported target price. ETF scenarios use a fund-wide price change and cash distributions, not a forecast for a single holding. Specify fee treatment where relevant and avoid double counting expenses. Cash payments are not reinvested; taxes, trading costs and currency conversion are excluded.

Price return = ending price / observed price − 1. Total return = (ending price + cash payments) / observed price − 1. Portfolio contribution in percentage points = security total return (%) × total-portfolio weight (%) / 100. Blank inputs do not become zero; the downside case must be worse than the base. If the decision is Do not include, weight must be zero. Scenario explanations are brief notes, with conclusions in the shared final responses. Detailed guidance is expandable.

The printable report starts with the automatically generated comparison, followed by the decision, three responses, scenarios and compact evidence tables with shared provenance. Old per-metric sources/dates and explanations are retained as explicit overrides and printed when present. Completion checks follow the compact form, rather than demanding the retired per-metric documentation or every optional field. They assess entered research and arithmetic, not factual accuracy or investment quality. Use source documents to verify eligibility and observations.

## Saved work and project handoff

Version-2 JSON and `bus331-equity-research-v2` browser storage remain compatible. Company and ETF observations, scenarios and briefs stay separate. New shared provenance and P/E-type fields are additive; older P/E types are inferred from explicit stored Forward/Trailing descriptions, and original details are retained. Earlier version-1 files are importable with the full original under `legacy`; earlier browser keys are untouched. Review imported research before submission. Optional six-company research remains separate from core completion and can be included in the PDF.

Save the JSON file for portable backup; browser storage is origin-specific and can be cleared. Loading replacement research requires confirmation. Completed research and licensed FactSet evidence belong in private Canvas submissions, outside this public repository. There is no backend or automatic submission. Transfer accepted eligible securities to Phase 4’s client table and matching thesis reference; add any separately required project explanations there. Full-portfolio allocation, other holdings, hedges and stress testing remain separate.

Validation: `node --test tests/equity-research-lab.test.mjs`; browser checks cover compact forms, P/E availability/type behavior, shared-source inheritance, three-question completion, legacy detail preservation, JSON/PDF output, ETF scope and desktop/mobile layouts.

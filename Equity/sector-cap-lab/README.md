# BUS331 Equity Research Notebook — local prototype

Open `index.html` in a browser. The maintained sources are `index.html`, `lab.css`, `lab.js`, `model.js` (metric definitions, financial calculations and earlier-file compatibility), and `notebook-model.js` (collection, drafts, reviews/history and migration). No build or external libraries are required. This change remains local and unpublished; homepage visibility, decks, workbooks and overall project requirements are unchanged.

## Workflow

The opening screen is the security-entry form, with visible pale-yellow input boxes, teal selectors and section bars, and navy/gold branding. A fresh notebook shows a blank stock form; the asset selector starts a stock, equity mutual fund or ETF record. Existing notebooks resume a draft or saved record. The research list and reports remain separate tabs. New untouched starter forms are reused when selecting an asset type, so changing that selector does not create duplicate blank records.

The notebook replaces the fixed two-security assignment with a growing research collection. Add stocks, **equity mutual funds**, and **equity ETFs**, one record at a time. Bond, leveraged, inverse and other non-equity funds are out of scope. Eligibility is a student classification to verify from fund/issuer sources; the notebook has no FactSet integration, ticker classifier or automatic investment-quality rating.

Three views support the workflow:

1. **Research list:** set a research question and structured criteria (role, sector exposure, geography, size/style, valuation, risk, cost/access); add securities; filter by text, asset type, review status and portfolio role; select records for reports. Criteria guide the manual FactSet search rather than automatically screening a live universe. New records inherit the project role as an editable starting point.
2. **Security record:** enter compact facts, a shared source/date, optional exceptions, and a small review tracker. Status is Researching, Reviewed, Shortlisted or Rejected. Record a portfolio role, one valuation takeaway, one principal risk and a question to revisit. Scenarios and project recommendations are optional later steps, not prerequisites to saving research.
3. **Comparisons and reports:** generate individual profiles, comparisons of selected saved records, or an eligible project shortlist. Selection survives list filtering. Mixed asset types get a portfolio-role/takeaway comparison; detailed metrics are grouped by asset type. Tables split into groups of up to four for legible printing. Periods, source dates and share classes remain visible; differing P/E periods are flagged. Reports do not declare a winner or interpret raw differences as mispricing. Excluded/unverified funds remain in research records but are explicitly excluded from the eligible shortlist report.

## Compact asset-specific inputs

P/E uses a number plus Forward, Trailing, Other, Not meaningful or Unavailable. Other exposes a short qualifier. Other metrics use a value and a short period/type qualifier only where useful. Definitions and extra metrics are expandable. Each security has one source/report and research/observation date, with optional notes for differing dates, sources or missing measures. Earlier per-metric provenance remains preserved and printed when present.

Stocks retain sector/industry, price, EPS, growth, market cap, beta, volatility and yield. Funds retain reported aggregate valuation, benchmark/objective and risk/return measures. Equity mutual funds specifically add **exact share class, NAV, expense ratio, minimum investment and sales load/type**. ETFs retain market price, NAV and optional trading/implementation details. Fund sector weights include eleven equity sectors plus cash and other/unclassified; reconciliation requires all values and a 100% total within 0.1 percentage point. Never normalize residuals away. Optional major-holdings tables record names/identifiers, weights, sectors and a shared source/date. Those tables inherit the security source/date when separate provenance is blank.

## Drafts, collection and dated reviews

Edits automatically persist as **drafts** in browser storage. Multiple records can have drafts simultaneously. **Save record** commits the draft; changed saved content retains the complete prior version, including prior metrics, reasoning and review dates, in history. Opening history displays prior evidence without replacing current research. A no-op save does not add duplicate history. The collection date stays fixed; the updated date changes when a version is committed.

**Mark reviewed & save** records an explicit review date. Moving a record into Reviewed also records a review when that status is newly selected. Shortlisting or rejecting a record is a separate student judgment and does not invent a review date. Changes to observations, role or takeaways after review display Updated since review. Reports use saved versions and identify outstanding drafts; save a record before generating its updated profile.

Version-3 JSON export includes the collection, criteria, comparison selection, drafts, review metadata and histories. Storage uses `bus331-equity-notebook-v3`. Earlier v2/v1 storage keys are untouched. Use Import earlier browser research or load an old file to migrate populated paired records and company extension records into the notebook. The full original remains under `legacyData`, retaining legacy notes and data even where they do not map to a notebook field. Exact duplicate extension records are omitted from the visible collection, with the original retained in the backup. Imported records are not automatically marked reviewed; fund eligibility must be checked. Loading a replacement notebook requires confirmation. Export a file for portable backup; browser storage is origin-specific and can be cleared or fill up.

## Optional scenarios and Phase 4 use

Each record can later hold base/downside assumptions and client-specific valuation, risk/reward, suitability, weight and reconsideration reasoning. Stock P/E scenario price = positive EPS × (1 + assumed growth) × ending P/E; alternative valuation supports an explicitly justified target price. ETF scenario price = observed price × (1 + assumed fund-wide price change). Mutual fund scenarios use NAV instead of exchange price. Cash payments are entered separately, without reinvestment. Return = (ending price/NAV + cash payments) / observed price/NAV − 1. Taxes, loads, trading costs and FX conversion are excluded; justify ongoing expense treatment without double counting. A single holding cannot forecast a fund. Proposed portfolio contribution (percentage points) = security total return (%) × portfolio weight (%) / 100.

Profiles show data gaps and review state without requiring a scenario, verdict or thesis to capture research. Use shortlisted profiles/comparisons to support Phase 4's client selection table and Investment Thesis Log, with matching thesis references and client-specific suitability. Full-portfolio allocations, other holdings, hedges and stress testing remain separate project requirements.

Completed notebooks, licensed FactSet observations, and reports belong in private Canvas submissions, outside this public repository. There is no backend, multi-user synchronization or automatic Canvas submission.

## Validation

Run `node --test tests/equity-notebook.test.mjs tests/equity-research-lab.test.mjs`. Tests cover collection/filtering, review-date/history behavior, draft/history/selection round trips, old-file migration, share-class/NAV inputs, scope restrictions and financial calculations. Browser verification covers growing mixed collections, filters and selections, optional scenarios, draft recovery, review history, profiles/comparison PDFs, eligible shortlists, JSON export/import, legacy migration, and desktop/mobile views.

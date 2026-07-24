import { bus331IntroSource } from './bus331-intro-source-data.mjs';

const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

const modules = {
  M01: {
    id: 'intro-m01-l01',
    chapter: 1,
    title: 'The Investment Environment',
    sourceRange: '1-62',
    output: 'bus331-intro-m01-l01-slides.html',
    heroImage: '../../assets/bus331-intro/m01-investment-environment.png',
    heroAlt: 'Investment research workspace with portfolio charts, a laptop and analytical tools overlooking a city skyline',
    divisions: [
      { source: 1, label: 'Tuesday 1 · Course launch and the investment question', minutes: '75' },
      { source: 17, label: 'Thursday 1 · FactSet orientation and information workflow', minutes: '75' },
      { source: 32, label: 'Tuesday 2 · Assets, agency and the investment process', minutes: '75' },
      { source: 47, label: 'Thursday 2 · Risk, diversification and financial intermediaries', minutes: '75' }
    ]
  },
  M02: {
    id: 'intro-m02-l01',
    chapter: 2,
    title: 'Asset Classes and Financial Instruments',
    sourceRange: '63-130',
    output: 'bus331-intro-m02-l01-slides.html',
    heroImage: '../../assets/bus331-intro/m02-asset-classes.png',
    heroAlt: 'Editorial still life representing bonds, property, commodities, equities and derivatives',
    divisions: [
      { source: 63, label: 'Tuesday 3 · Financial markets, crises and securitization', minutes: '75' },
      { source: 89, label: 'Thursday 3 · Interest rates, bonds and credit', minutes: '75' },
      { source: 112, label: 'Tuesday 4 · Equity, exchanges, indexes and derivatives', minutes: '75' }
    ]
  },
  M03: {
    id: 'intro-m03-l01',
    chapter: 3,
    title: 'How Securities Are Traded',
    sourceRange: '131-178',
    output: 'bus331-intro-m03-l01-slides.html',
    heroImage: '../../assets/bus331-intro/m03-trading-infrastructure.png',
    heroAlt: 'Modern exchange infrastructure with server racks, order-book light patterns and market activity',
    divisions: [
      { source: 131, label: 'Thursday 4 · Issuance, trading venues and market mechanics', minutes: '75' },
      { source: 161, label: 'Tuesday 5 · Margin, short selling and market regulation', minutes: '75' }
    ]
  },
  M04: {
    id: 'intro-m04-l01',
    chapter: 4,
    title: 'Mutual Funds and Other Investment Companies',
    sourceRange: '179-198',
    output: 'bus331-intro-m04-l01-slides.html',
    heroImage: '../../assets/bus331-intro/m04-pooled-investments.png',
    heroAlt: 'Investment tokens pooling through transparent funnels into diversified portfolio baskets',
    divisions: [
      { source: 179, label: 'Thursday 5 · Fund structures, NAV, fees and ETFs', minutes: '75' },
      { source: 194, label: 'Tuesday 6 · Fund calculations and ETF research lab', minutes: '75' }
    ]
  }
};

const officialSources = {
  fed: {
    label: 'Federal Reserve · June 17, 2026 FOMC statement',
    url: 'https://www.federalreserve.gov/newsevents/pressreleases/monetary20260617a.htm'
  },
  treasury: {
    label: 'U.S. Treasury · Daily Treasury par yield curve rates',
    url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value=2026&type=daily_treasury_yield_curve'
  },
  bls: {
    label: 'U.S. Bureau of Labor Statistics · June 2026 CPI',
    url: 'https://www.bls.gov/news.release/cpi.nr0.htm'
  },
  fdic: {
    label: 'FDIC · Deposit insurance',
    url: 'https://www.fdic.gov/resources/deposit-insurance/'
  },
  jpm: {
    label: 'JPMorganChase · Q1 2026 results / Form 10-Q',
    url: 'https://www.jpmorganchase.com/content/dam/jpmc/jpmorgan-chase-and-co/investor-relations/documents/quarterly-earnings/2026/1st-quarter/a5fd2d13-877b-43b2-8b58-81bad4399c87.pdf'
  },
  blackrock: {
    label: 'BlackRock · Q2 2026 results',
    url: 'https://www.blackrock.com/corporate/newsroom/press-releases/article/corporate-one/press-releases/blackrock-reports-second-quarter-2026'
  },
  visa: {
    label: 'Visa · Fiscal Q2 2026 earnings release filed with the SEC',
    url: 'https://www.sec.gov/Archives/edgar/data/1403161/000140316126000077/q22026earningsrelease.htm'
  },
  nubank: {
    label: 'Nu Holdings · Q1 2026 results',
    url: 'https://international.nubank.com.br/company/nu-holdings-ltd-reports-first-quarter-2026-financial-results/'
  },
  coinbase: {
    label: 'Coinbase · Q1 2026 results',
    url: 'https://investor.coinbase.com/news/news-details/2026/Coinbase-Q1-Financial-Results-Show-Resilient-Financial-Performance-Driven-by-New-All-Time-High-Crypto-Trading-Volume-Market-Share/default.aspx'
  },
  freddie: {
    label: 'Freddie Mac · Primary Mortgage Market Survey',
    url: 'https://www.freddiemac.com/pmms'
  },
  finra: {
    label: 'FINRA · Margin requirements',
    url: 'https://www.finra.org/rules-guidance/key-topics/margin-accounts'
  },
  regT: {
    label: 'Federal Reserve · Regulation T margin requirements',
    url: 'https://www.federalreserve.gov/frrs/regulations/section-22012-supplement-margin-requirements.htm'
  },
  sofr: {
    label: 'Federal Reserve Bank of New York · SOFR',
    url: 'https://www.newyorkfed.org/markets/reference-rates/sofr'
  },
  caseShiller: {
    label: 'S&P Cotality Case-Shiller U.S. National Home Price NSA Index',
    url: 'https://www.spglobal.com/spdji/en/indices/indicators/sp-cotality-case-shiller-us-national-home-price-nsa-index/'
  }
};

const marketUpdates = {
  48: {
    title: 'Low risk does not mean one universal yield',
    asOf: 'Official data checked July 23, 2026',
    stats: [
      ['3.89%', '3-month Treasury par yield', 'U.S. Treasury, July 22, 2026'],
      ['$250k', 'Standard FDIC insurance limit', 'Per depositor, per insured bank, per ownership category'],
      ['4.11%', '1-year Treasury par yield', 'U.S. Treasury, July 22, 2026']
    ],
    sources: ['treasury', 'fdic'],
    note: 'Source slide ranges of 4–5.2% for savings, CDs and Treasuries were not supported by official primary data and are retained below as original source text for review. Recheck all rates before class.'
  },
  53: {
    title: 'Scale is only one way to compare financial intermediaries',
    asOf: 'Official filings checked July 23, 2026',
    stats: [
      ['$4.9T', 'JPMorganChase total assets', 'March 31, 2026'],
      ['9.8%', 'JPMorganChase global investment-banking wallet share', 'Q1 2026'],
      ['$2.858B', 'JPMorganChase investment-banking fees', 'Q1 2026']
    ],
    sources: ['jpm'],
    note: 'The source slide ranked global banks using secondary-source values. The student slide uses one internally consistent official filing rather than combining incompatible rankings. Recheck before class.'
  },
  54: {
    title: 'Investment-banking leadership depends on the metric',
    asOf: 'Official filing checked July 23, 2026',
    stats: [
      ['#1', 'JPMorganChase global investment-banking fee rank', 'Q1 2026'],
      ['$1.583B', 'Underwriting fees', 'Q1 2026'],
      ['$1.275B', 'Advisory fees', 'Q1 2026']
    ],
    sources: ['jpm'],
    note: 'The source used a 2025 multi-firm league table without a primary-source citation. Its original values remain in this slide’s speaker note for instructor review. Recheck before class.'
  },
  55: {
    title: 'Asset-management scale is visible in assets under management',
    asOf: 'BlackRock results through June 30, 2026',
    stats: [
      ['$15.3T', 'BlackRock assets under management', 'June 30, 2026'],
      ['$192B', 'Q2 net inflows', 'Second quarter 2026'],
      ['$6T+', 'iShares assets under management', 'Reported July 15, 2026']
    ],
    sources: ['blackrock'],
    note: 'The source mixed insurer assets, revenue and asset-manager AUM, which are not directly comparable. Original source values remain in the speaker note. Recheck before class.'
  },
  56: {
    title: 'Fintech leadership is better measured with operating evidence',
    asOf: 'Official company results checked July 23, 2026',
    stats: [
      ['66.1B', 'Visa processed transactions', 'Three months ended March 31, 2026'],
      ['135M+', 'Nu customers', 'March 31, 2026'],
      ['8.6%', 'Coinbase crypto trading-volume market share', 'Q1 2026']
    ],
    sources: ['visa', 'nubank', 'coinbase'],
    note: 'The source’s $2.5T “top 10 fintech” valuation and company-count forecast were not traceable to primary sources. They are preserved as original source text in the speaker note. Recheck before class.'
  },
  57: {
    title: 'Payment networks scale through transaction throughput',
    asOf: 'Visa fiscal Q2 2026',
    stats: [
      ['66.1B', 'Transactions processed', 'Three months ended March 31, 2026'],
      ['+9%', 'Processed transactions year over year', 'Fiscal Q2 2026'],
      ['200+', 'Countries and territories served', 'Visa company disclosure']
    ],
    sources: ['visa'],
    note: 'The source compared Visa and Mastercard using secondary-source market-cap and card-volume values. The updated slide uses Visa primary-source operating data. Recheck before class.'
  },
  58: {
    title: 'Digital banking scales customers, engagement and credit together',
    asOf: 'Nu Holdings Q1 2026',
    stats: [
      ['135M+', 'Global customers', 'March 31, 2026'],
      ['$5B+', 'Quarterly revenue', 'Q1 2026'],
      ['83%', 'Monthly activity rate', 'Q1 2026']
    ],
    sources: ['nubank'],
    note: 'The source compared Revolut, Nubank and Chime using mixed valuation and customer metrics. The update uses a single company’s primary-source operating measures. Recheck before class.'
  },
  59: {
    title: 'Crypto-exchange scale requires a defined metric',
    asOf: 'Coinbase Q1 2026 / full-year 2025',
    stats: [
      ['8.6%', 'Crypto trading-volume market share', 'Q1 2026'],
      ['$5.2T', 'Total trading volume', 'Full-year 2025; definition updated by company'],
      ['~1M', 'Coinbase One subscribers', 'Year-end 2025']
    ],
    sources: ['coinbase'],
    note: 'The source compared exchanges with secondary-source volume and user claims. The update uses Coinbase disclosures and keeps definitions visible. Recheck before class.'
  },
  60: {
    title: 'Current market backdrop: policy is restrictive and inflation elevated',
    asOf: 'Official data through July 22, 2026',
    stats: [
      ['3.50–3.75%', 'Federal funds target range', 'Since June 17, 2026'],
      ['3.5%', 'CPI-U, 12-month change', 'June 2026'],
      ['4.67%', '10-year Treasury par yield', 'July 22, 2026']
    ],
    sources: ['fed', 'bls', 'treasury'],
    note: 'This replaces unsupported forward-looking claims in the source with dated official observations. Recheck before class.'
  },
  71: {
    title: 'U.S. home prices: a national repeat-sales benchmark',
    asOf: 'S&P Cotality Case-Shiller data for April 2026, published June 30, 2026',
    stats: [
      ['332.68', 'U.S. National Home Price NSA Index', 'April 2026 index level'],
      ['+0.8%', 'Change from one year earlier', 'April 2026'],
      ['Repeat sales', 'Measurement approach', 'Tracks changes in the value of the same single-family homes over time']
    ],
    sources: ['caseShiller'],
    note: 'The source chart is updated with the official current index level and annual change. Recheck the latest release before class.'
  },
  85: {
    title: 'Stress appears in the spread between private and public short rates',
    asOf: 'Concept preserved; live data should be refreshed before class',
    stats: [
      ['Credit stress', 'Private short rates rise relative to Treasury bills', 'Wider spreads signal higher perceived risk'],
      ['Liquidity stress', 'Funding demand intensifies', 'Banks and dealers conserve cash'],
      ['Policy response', 'Central banks may supply liquidity', 'The spread can compress as stress eases']
    ],
    sources: ['fed', 'treasury'],
    note: 'The source chart is a historical FactSet capture. The editable reconstruction preserves the interpretation without republishing the licensed screenshot. Recheck before class.'
  },
  86: {
    title: 'The policy-rate anchor in July 2026',
    asOf: 'Federal Reserve, June 17, 2026',
    stats: [
      ['3.50–3.75%', 'Federal funds target range', 'FOMC decision'],
      ['3.65%', 'Interest rate on reserve balances', 'Effective June 18, 2026'],
      ['3.75%', 'Standing overnight repo rate', 'Implementation note']
    ],
    sources: ['fed'],
    note: 'The source FactSet policy tracker is withheld as a licensed capture. Official Federal Reserve figures replace it. Recheck before class.'
  },
  87: {
    title: 'SOFR replaced USD LIBOR as the core U.S. dollar benchmark',
    asOf: 'Official framework checked July 23, 2026',
    stats: [
      ['SOFR', 'Secured overnight financing rate', 'Broad Treasury-repo transaction base'],
      ['LIBOR', 'Legacy panel-bank benchmark', 'USD settings have ceased or are nonrepresentative'],
      ['Spread', 'Legacy contracts may need fallback adjustments', 'Read the contract language']
    ],
    sources: ['sofr'],
    note: 'The source comparison graphic cited training and advisory sources. The student slide uses the New York Fed’s official SOFR definition. Recheck before class.'
  },
  93: {
    title: 'The Federal Reserve’s current policy range',
    asOf: 'Federal Reserve, June 17, 2026',
    stats: [
      ['3.50%', 'Lower bound', 'Target range'],
      ['3.625%', 'Midpoint', 'Useful summary, not an administered rate'],
      ['3.75%', 'Upper bound', 'Target range']
    ],
    sources: ['fed'],
    note: 'The source uses a licensed FactSet 10-year chart. The public deck uses official current values; refresh before class.'
  },
  95: {
    title: 'The 10-year Treasury yield is a market benchmark',
    asOf: 'U.S. Treasury, July 22, 2026',
    stats: [
      ['4.67%', '10-year par yield', 'Official daily curve'],
      ['4.11%', '1-year par yield', 'Shorter-horizon comparison'],
      ['5.15%', '30-year par yield', 'Longer-horizon comparison']
    ],
    sources: ['treasury'],
    note: 'Treasury yields change every trading day. Recheck before class.'
  },
  96: {
    title: 'Mortgage rates reflect Treasury yields plus credit, duration and servicing economics',
    asOf: 'Freddie Mac PMMS, July 16, 2026',
    stats: [
      ['6.55%', '30-year fixed-rate mortgage', 'Weekly national average'],
      ['5.93%', '15-year fixed-rate mortgage', 'Weekly national average'],
      ['4.67%', '10-year Treasury par yield', 'July 22, 2026 comparison']
    ],
    sources: ['freddie', 'treasury'],
    note: 'Mortgage and Treasury observations use different dates and are shown for conceptual comparison, not as a precise spread. Recheck before class.'
  }
};

const visualRebuilds = {
  2: {
    title: 'Welcome to Investment Class!',
    layout: 'source-books',
    items: [
      'This class is designed to provide you with a comprehensive understanding of asset classes, investment strategies, financial markets, and risk management.',
      'This class will follow a “similar” path as the CFA Level 1 Learning Modules.',
      'Investments 13th Edition · Bodie, Kane and Marcus · Investment Class Textbook.',
      'My CFA version back in 1998.'
    ],
    note: 'The two book-cover images are restored from the original source slide and presented with consolidated editable text.'
  },
  4: {
    title: '“Tell me and I forget. Teach me and I may remember. Involve me and I learn.”',
    layout: 'quote-focus',
    items: ['Often attributed to Benjamin Franklin'],
    note: '',
    omitDeckSourceNote: true
  },
  5: {
    title: 'Investment projects: from market signals to a recommendation',
    layout: 'project-workflow',
    items: [
      'Podcasts',
      'Canvas Discussion Groups',
      'Finding and reading an ETF prospectus',
      'Comps Valuation Spreadsheet',
      'DCF Spreadsheet',
      'Mutual Fund NAV and fee calculations',
      'Excel & FactSet',
      'Current Events'
    ],
    note: 'The former two-slide card treatment is recombined as one editable research-to-presentation workflow. Every source project, tool and research input remains visible.'
  },
  6: {
    slides: [
      {
        title: 'Investments: what you will learn and use',
        layout: 'matrix',
        items: [
          'Analyze core investment vehicles: learn to value stocks, bonds and options and assess their risk-return characteristics.',
          'Master professional finance tools: gain hands-on experience with FactSet for data exploration and Excel for portfolio optimization.',
          'Essential equipment: bring a laptop to every class for financial calculations and activities.'
        ],
        note: 'The source says “Cain hands-on experience”; the student slide corrects that typographical error to “gain hands-on experience.”'
      },
      {
        title: 'How the source course is graded',
        layout: 'matrix',
        items: [
          'In-class Excel assignments and in-class projects · 30%',
          'Concept and key-term quizzes (5) · 10%',
          'Participation and attendance · 15%',
          'Reading, homework and project · 45%',
          'The source also states that 55% of the grade is hands-on work.',
          'The source grading labels are preserved pending confirmation of the intended 55% grouping.'
        ],
        note: 'The four displayed weights total 100%. The source also calls 55% “hands-on work,” but does not clearly identify which rows form that subtotal; this is preserved for instructor review.'
      },
      {
        title: 'Key course expectations in the source',
        layout: 'matrix',
        items: [
          'Time commitment · expect at least six hours per week outside class.',
          'Attendance · six or more unexcused absences will result in a request for withdrawal from the course.',
          'Quizzes · five paper-based concept checks; no electronics or notes; 15 minutes per quiz.',
          'AI tools · prohibited unless the professor gives explicit permission.',
          'NotebookLM appears in the source visual as a named course tool.',
          'Bring a laptop to every class for calculations and activities.'
        ]
      }
    ]
  },
  7: {
    slides: [
      {
        title: 'Your grade is built from six connected components',
        layout: 'grade-allocation',
        items: [
          'Attendance and participation · 15%',
          'Reading assignments · 10%',
          'Homework · 10%',
          'In-class activities · 30%',
          'Concept checks · 10%',
          'Investment project and presentations · 25%'
        ],
        note: 'The six source weights independently sum to 100%.'
      },
      {
        title: 'The weekly rhythm earns 65% of the grade',
        layout: 'grade-rhythm',
        items: [
          'Attendance and participation (15%): active participation supports deeper understanding; arrive on time for each class.',
          'Reading assignments (10%): a high level of reading is assigned and graded for timely completion.',
          'Homework (10%): Connect questions and Excel-based problems.',
          'In-class activities (30%): Excel- and FactSet-focused work, submitted before the next class or the Canvas due date.'
        ],
        note: 'Attendance, reading, homework and in-class activities sum to 65%.'
      },
      {
        title: 'Concept checks and the group project show what you can do',
        layout: 'grade-demonstration',
        items: [
          'Concept checks (10%): paper tests covering key terms and equations; no electronics or notes.',
          'Investment project and presentations—group (25%).',
          'The group project is graded individually based on effort, group feedback, understanding of the material and the quality of the business-level presentation.',
          'Grading for BUS331-02.'
        ],
        note: 'Concept checks and the investment project sum to 35%. The source explicitly says the group project receives individual grades.'
      }
    ]
  },
  10: {
    slides: [
      {
        title: 'Portfolio-management project: the core mission',
        layout: 'flow',
        items: ['Define base, bull and bear macro scenarios', 'Design a real-world investment portfolio', 'Implement the strategy', 'Test performance and mandate compliance']
      },
      {
        title: 'Macro forecasting turns a scenario into measurable inputs',
        layout: 'matrix',
        items: ['Real GDP quarter-over-quarter · economic momentum', 'One-month inflation · interest-rate path', '10-year minus 2-year yield curve · recession-risk signal', 'Base case', 'Bull case', 'Bear case']
      },
      {
        title: 'Phases 1–4: mandate, constraints, strategy and selection',
        layout: 'matrix',
        items: [
          'Establish client-specific RRTTLLU constraints and drawdown limits.',
          'RRTTLLU: risk, return, time horizon, taxes, liquidity, legal and unique circumstances.',
          'Optimize asset weights for maximum Sharpe ratio.',
          'Evaluate portfolio beta, Sharpe ratio, Treynor ratio and maximum drawdown.',
          'Select ten undervalued securities using Security Market Line analysis.'
        ]
      },
      {
        title: 'The junior-analyst AI model requires verification',
        layout: 'comparison',
        items: [
          ['Use AI deliberately', 'Use AI for Excel troubleshooting, red-teaming and documented workflow support.'],
          ['Verify independently', 'Check every data point against the original source and maintain the required AI audit log.']
        ],
        note: 'The source spells AI as “Al” in several places. The student slide corrects the typography while preserving the policy.'
      },
      {
        title: 'Phase 5 and final deliverables',
        layout: 'matrix',
        items: [
          'Stress-test the portfolio against bear-case scenarios.',
          'Adjust allocations or use derivative hedges to maintain IPS compliance.',
          'Critical constraint: maximum drawdown limit.',
          '20–30-page PowerPoint submission.',
          'Functional Excel model and formal team presentation.',
          'Required AI audit log and a NotebookLM resource.'
        ]
      }
    ]
  },
  11: {
    layout: 'prompt',
    items: ['What counts as an investment?', 'What makes an investment different from a gamble?', 'What information would change your decision?']
  },
  13: {
    title: 'Current events: read beyond the headline',
    layout: 'current-events-source',
    items: ['Current events', 'M&A activity', 'Corporate bond issuance', 'Global stock leadership', 'Additional market headlines'],
    note: 'The original source collage and its embedded headline captures are restored as a dated December 2025 example. These are not presented as current July 2026 market data. Recheck and replace the headlines before class.'
  },
  14: {
    title: 'Should this be considered an investment?',
    layout: 'investment-question-source',
    items: ['Should this be considered an investment?', 'If so, what kind?'],
    note: 'The original red-handbag image is restored so the class question lands as a visual reveal.'
  },
  15: {
    title: 'Handbag Fund',
    layout: 'handbag-fund-source',
    items: ['You Can Now Invest In A Hedge Fund Dedicated To Hermès Bags', 'Forbes', 'Good Investment or Gamble?', 'What could go wrong?', 'Handbag Fund'],
    note: 'The original handbag photo, Luxusfunds Hermès fund image and source caption are restored. The source article link remains available from the editable Forbes callout.'
  },
  16: {
    title: 'Activate your FactSet workstation before the first lab',
    layout: 'steps',
    items: ['Complete the Canvas activation assignment.', 'Install or open the FactSet workstation.', 'Submit a workstation snapshot only through the course assignment.', 'Ask for help before the first data lab if activation fails.']
  },
  17: {
    title: 'FactSet account activation',
    layout: 'steps',
    items: ['Open the FactSet activation link provided in Canvas.', 'Use your Endicott email and complete the account setup.', 'Install FactSet and any required Office integration.', 'Launch the workstation and confirm that you can sign in.']
  },
  18: {
    title: 'Use FactSet learning modules as optional practice',
    layout: 'steps',
    items: ['Open the FactSet e-learning site.', 'Choose a module that matches the current task.', 'Use training for navigation and workflow—not as a substitute for source verification.', 'Record questions to bring to class.']
  },
  19: {
    title: 'Start with FactSet’s built-in help',
    layout: 'steps',
    items: ['Open Help from the top-right of the workstation.', 'Search Getting Started before opening a support case.', 'Use the assistant for workflow questions.', 'Verify any generated interpretation against the underlying data.']
  },
  20: {
    title: 'Navigate with company and keyboard shortcuts',
    layout: 'flow',
    items: ['Enter a company or security identifier', 'Open Snapshot', 'Move to News, Estimates or Ownership', 'Use hotkeys for repeated workflows']
  },
  21: {
    title: 'Build a custom FactSet workspace',
    layout: 'matrix',
    items: ['News 2.0', 'Markets', 'Economics', 'Company / Security', 'Charting', 'Watchlist', 'Industry', 'Private markets and portfolio tools']
  },
  22: {
    title: 'Company / Security Snapshot organizes the first research pass',
    layout: 'flow',
    items: ['Company identity', 'Price and valuation', 'Estimates and financials', 'News, ownership and risk']
  },
  23: {
    title: 'Use news tools to move from headline to evidence',
    layout: 'steps',
    items: ['Scan top stories and company-specific news.', 'Open the original article or transcript.', 'Separate reported fact from commentary.', 'Record the date, source and investment implication.']
  },
  24: {
    title: 'Market monitors answer “what moved?” before “why?”',
    layout: 'flow',
    items: ['Index and sector performance', 'Rates and currencies', 'Breadth and volume', 'Evidence-based explanation']
  },
  25: {
    title: 'The economic calendar turns releases into a research checklist',
    layout: 'steps',
    items: ['Filter by country and importance.', 'Record consensus and prior values.', 'Capture the actual release.', 'Explain the market reaction without assuming causation.']
  },
  26: {
    title: 'Country and corporate-finance views connect macro to firms',
    layout: 'flow',
    items: ['Country conditions', 'Monetary and fiscal indicators', 'Industry exposure', 'Company financing and valuation']
  },
  27: {
    title: 'Comparable-company analysis is a relative-value workflow',
    layout: 'steps',
    items: ['Define the peer set.', 'Choose operating and valuation metrics.', 'Normalize dates and accounting definitions.', 'Explain why the range is informative—and imperfect.']
  },
  28: {
    title: 'Earnings research starts with the primary transcript',
    layout: 'steps',
    items: ['Open the call transcript.', 'Review management themes and segment evidence.', 'Compare claims with reported numbers.', 'Use AI summaries only as a navigation aid.']
  },
  29: {
    title: 'Sector intelligence narrows a broad industry question',
    layout: 'steps',
    items: ['Open sector or industry intelligence.', 'Identify the data center or source report.', 'Filter to the relevant business drivers.', 'Cite the original data behind any conclusion.']
  },
  30: {
    title: 'Industry overviews establish the competitive frame',
    layout: 'matrix',
    items: ['Industry performance', 'Valuation ranges', 'Key companies', 'Growth drivers', 'Risks', 'Recent news']
  },
  31: {
    title: 'Industry financials become useful when definitions match',
    layout: 'flow',
    items: ['Select an industry', 'Choose consistent metrics', 'Compare firms and trends', 'Document the screen and date']
  },
  39: {
    title: 'Financial assets distribute claims and risks',
    layout: 'matrix',
    items: ['Fixed income: promised or formula-based cash flows', 'Equity: residual ownership in a firm', 'Derivatives: payoff depends on another price or rate', 'Currencies: claims used in global exchange', 'Commodities: standardized claims on physical goods', 'Real estate and cryptoassets: distinct risk and cash-flow structures']
  },
  43: {
    title: 'Asset allocation sets the mix; security selection fills it',
    layout: 'comparison',
    items: [
      ['Asset allocation', 'Choose among broad asset classes: stocks, bonds, commodities, currencies and real estate.'],
      ['Security selection', 'Choose securities within each class: Ford, Alphabet, Microsoft or General Mills.']
    ],
    note: 'The source note distinguishes a top-down process—asset allocation followed by security selection—from a bottom-up process that begins with attractively priced securities.'
  },
  45: {
    title: 'Modern and behavioral finance use different assumptions',
    layout: 'comparison',
    items: [
      ['Modern finance', 'Prices reflect available information; investors are modeled as broadly rational; diversification and equilibrium organize decisions.'],
      ['Behavioral finance', 'Biases, limits to arbitrage and social dynamics can create persistent departures from intrinsic value.']
    ]
  },
  47: {
    title: 'Higher expected return generally requires accepting more risk',
    layout: 'matrix',
    items: [
      'Higher potential returns typically require accepting higher levels of risk.',
      'Lower-risk investments generally provide more stability and more modest returns.',
      'Risk tolerance depends on age, goals and comfort with volatility.',
      'A longer time horizon can increase an investor’s capacity to bear risk.'
    ],
    note: 'The editable scatter plot preserves the source’s upward-sloping risk-return relationship and its four interpretation points.'
  },
  44: {
    title: 'The Efficient Market Hypothesis is a testable benchmark',
    layout: 'comparison',
    items: [
      ['EMH claim', 'Security prices rapidly incorporate available information, so persistent abnormal returns are difficult after costs and risk adjustment.'],
      ['What EMH does not claim', 'Prices are always perfectly correct, investors are never biased, or no manager will ever outperform in a period.']
    ]
  },
  49: {
    title: 'Higher-risk assets widen the range of possible outcomes',
    layout: 'matrix',
    items: ['Individual stocks · company-specific risk', 'Growth stocks · valuation and expectation risk', 'Emerging markets · political, currency and liquidity risk', 'Small-cap stocks · business and trading-liquidity risk'],
    note: 'The source supplied unsupported expected-return and volatility ranges. They remain in the source record and speaker note, but are not presented as forecasts.'
  },
  50: {
    title: 'Diversification spreads—not eliminates—risk',
    layout: 'flow',
    items: ['Combine imperfectly correlated assets', 'Set a target allocation', 'Monitor drift and changing risk', 'Rebalance when policy requires'],
    note: 'Source illustration retained for discussion: stocks 60–80%, bonds 20–40%, and alternatives such as REITs 5–10%, with quarterly or annual rebalancing. These are examples, not personal investment advice.'
  },
  52: {
    title: 'Capital markets connect net suppliers and net demanders of funds',
    layout: 'flow',
    items: ['Households supply capital', 'Intermediaries transform and route funds', 'Firms raise capital for investment', 'Governments may borrow or lend']
  },
  61: {
    title: 'FactSet exploration lab',
    layout: 'steps',
    items: ['Open a company Snapshot.', 'Locate one current news item and the original source.', 'Find one market, economics or industry view connected to the company.', 'Save your evidence and be ready to explain the investment relevance.']
  },
  66: {
    title: 'When markets fail, financing and risk transfer can seize up',
    layout: 'flow',
    items: ['Information becomes unreliable', 'Liquidity disappears', 'Credit contracts', 'Investment and employment weaken']
  },
  67: {
    title: 'Financial crises take different forms',
    layout: 'matrix',
    items: [
      'Speculative bubbles and crashes · Dutch Tulip Mania · Wall Street crash of 1929 · dot-com bubble in 2000',
      'International financial crisis · currency or balance-of-payments crisis · sovereign default',
      'Wider economic crisis · recession · depression',
      'Banking crisis · bank run'
    ]
  },
  68: {
    title: 'A financial crisis links markets, balance sheets and the real economy',
    layout: 'flow',
    items: ['Asset-price shock', 'Credit and liquidity stress', 'Institution failures and forced sales', 'Policy response', 'Real-economy damage']
  },
  69: {
    title: 'The 2007–2009 crisis accelerated through feedback loops',
    layout: 'timeline',
    items: ['2007 · Mortgage losses emerge', 'Mar. 2008 · Bear Stearns rescue', 'Sept. 2008 · Lehman bankruptcy and AIG rescue', 'Oct. 2008 · TARP enacted', '2009 · Stress tests and stabilization']
  },
  74: {
    title: 'Mortgage cash flows move through a securitization chain',
    layout: 'flow',
    items: ['Homeowner pays principal and interest', 'Originator / servicer collects payments', 'Agency or sponsor pools mortgages', 'MBS investors receive net cash flows']
  },
  75: {
    slides: [
      {
        title: 'MBS TBA analytics compare cohorts across coupon stacks',
        layout: 'matrix',
        items: [
          'Report date in source capture · November 26, 2025',
          '30-year cohorts · UMBS, FHLMC, GNMA I and GNMA II',
          '15-year cohorts · UMBS and FHLMC',
          'Coupon stacks range from 1.5% or 2.0% through 6.5% or 7.0%, depending on cohort.',
          'Each row is one cohort; each column is one coupon.',
          'The original FactSet capture is licensed and held out of the public deck.'
        ]
      },
      {
        title: 'Read an MBS cohort across price, prepayment and option risk',
        layout: 'matrix',
        items: [
          'Valuation · price and yield',
          'Collateral · gross weighted-average coupon (WAC), weighted-average loan age (WALA) and weighted-average maturity (WAM)',
          'Cash-flow timing · average life',
          'Prepayment · three-month CPR, five-year CPR, projected prepayments and pool-balance weighted-average CPR',
          'Rate sensitivity · effective duration and effective convexity',
          'Relative value · option-adjusted spread to Treasury and legacy LIBOR curves'
        ],
        note: 'The full extracted numeric matrix is preserved in this slide’s speaker note and the maintained source record. It is a dated licensed snapshot and should not be treated as current market data.'
      }
    ]
  },
  76: {
    title: 'A CDO redistributes one collateral pool across a payment waterfall',
    layout: 'flow',
    items: ['Loans and other debt enter one collateral pool', 'Cash flows pay the senior tranche first', 'The mezzanine tranche absorbs losses after equity', 'The junior / equity tranche is paid last and absorbs losses first'],
    note: 'The source sentence ends with a typographical “t.” The student slide corrects that typo while preserving the complete tranche explanation in this slide’s speaker note.'
  },
  78: {
    title: 'The 2008 crisis combined market losses with economic contraction',
    layout: 'matrix',
    items: ['Equities fell sharply', 'Credit spreads widened', 'Housing prices declined', 'Unemployment rose', 'Bank capital eroded', 'Policy support expanded']
  },
  79: {
    title: 'Financial stress unfolded in phases',
    layout: 'timeline',
    items: ['Housing and subprime deterioration', 'Funding and liquidity stress', 'Lehman-era panic', 'Extraordinary policy response', 'Slow recovery and repair']
  },
  80: {
    title: 'Bear Stearns demonstrates liquidity risk',
    layout: 'flow',
    items: ['Confidence falls', 'Short-term lenders withdraw', 'Liquid assets are sold', 'Liquidity buffer collapses', 'Resolution becomes unavoidable']
  },
  82: {
    title: 'Crisis outcomes differed across banking systems',
    layout: 'comparison',
    items: [
      ['United States', 'Rapid losses, recapitalization, stress tests and eventual recovery.'],
      ['Europe', 'Longer sovereign-bank feedback loops and uneven recovery across countries.']
    ]
  },
  83: {
    title: 'Three connected markets organize the financial system',
    layout: 'flow',
    items: ['Money market · short-term funding', 'Capital market · long-term debt and equity', 'Derivatives market · contingent claims and risk transfer']
  },
  84: {
    title: 'Money-market instruments differ by issuer and collateral',
    layout: 'matrix',
    items: ['Treasury bills', 'Certificates of deposit', 'Commercial paper', 'Bankers’ acceptances', 'Eurodollars', 'Federal funds', 'Broker call loans', 'Repurchase agreements']
  },
  88: {
    title: 'Classify investments by the claim they create',
    layout: 'matrix',
    items: ['Ownership shares', 'Debt instruments', 'Pooled investments', 'Options and contingent claims', 'Futures and obligations to transact']
  },
  89: {
    title: 'Interest rates to know',
    layout: 'flow',
    items: ['Risk-free proxy', 'Money-market rates', 'Federal funds target', 'Prime rate', '10-year Treasury yield', '30-year mortgage rate']
  },
  101: {
    title: 'Bond risk begins with credit quality and interest-rate sensitivity',
    layout: 'comparison',
    items: [
      ['Credit quality', 'Default probability and loss severity influence the required yield spread.'],
      ['Interest-rate sensitivity', 'Longer maturity and lower coupon generally increase price sensitivity to yield changes.']
    ]
  },
  104: {
    title: 'Ratings summarize credit risk—not price certainty',
    layout: 'flow',
    items: ['Issuer capacity and willingness to pay', 'Rating category', 'Market-required spread', 'Ongoing monitoring and possible migration']
  },
  109: {
    title: 'Tax-equivalent yield makes municipal and taxable bonds comparable',
    layout: 'formula',
    formula: 'Tax-equivalent yield = Municipal yield ÷ (1 − marginal tax rate)',
    items: ['Use the investor’s relevant marginal tax rate.', 'Consider state and local tax treatment separately.', 'Compare credit quality, maturity and liquidity—not yield alone.']
  },
  110: {
    title: 'Municipal relative value changes with taxes and market yields',
    layout: 'flow',
    items: ['Municipal yield', 'Investor tax rate', 'Tax-equivalent yield', 'Comparable taxable-bond yield']
  },
  111: {
    title: 'Municipal returns include both income and price risk',
    layout: 'matrix',
    items: ['Coupon income', 'Changes in Treasury yields', 'Changes in credit spreads', 'Call and reinvestment risk', 'Tax-policy changes', 'Liquidity conditions']
  },
  114: {
    title: 'Public and private valuations solve different information problems',
    layout: 'comparison',
    items: [
      ['Public company', 'Continuous market price, broad disclosure and high liquidity.'],
      ['Private company', 'Negotiated valuation, limited disclosure and illiquidity adjustments.']
    ]
  },
  119: {
    title: 'Three questions define any stock index',
    layout: 'steps',
    items: ['What securities are eligible?', 'What economic exposure does the index represent?', 'How are constituent weights and the index level calculated?']
  },
  120: {
    title: 'A stock index is a rule-based measurement portfolio',
    layout: 'flow',
    items: ['Define the eligible securities', 'Choose a weighting rule', 'Calculate the index level', 'Maintain the membership and divisor']
  },
  121: {
    title: 'Price-weighted indexes give higher-priced shares more influence',
    layout: 'formula',
    formula: 'Index level = Sum of component share prices ÷ divisor',
    items: ['The Dow Jones Industrial Average is price weighted.', 'A share split requires a divisor adjustment.', 'Share price—not company size—drives the weight.']
  },
  122: {
    title: 'Equal percentage moves can have unequal index effects',
    layout: 'comparison',
    items: [
      ['$100 stock gains 10%', '$10 price gain receives ten times the price impact of a $1 gain.'],
      ['$10 stock gains 10%', '$1 price gain has less impact even though the return is identical.']
    ]
  },
  123: {
    title: 'Market-value-weighted indexes scale influence by company value',
    layout: 'formula',
    formula: 'Company weight = Market capitalization ÷ Total index market capitalization',
    items: ['The S&P 500 is float-adjusted market-cap weighted.', 'Shares outstanding and share price both matter.', 'Larger companies have larger index weights.']
  },
  124: {
    title: 'Market capitalization corrects the high-price bias',
    layout: 'comparison',
    items: [
      ['Stock A', '$100 price × 1 million shares = $100 million market value.'],
      ['Stock B', '$10 price × 100 million shares = $1 billion market value; ten times Stock A’s influence in a simple market-cap index.']
    ]
  },
  125: {
    title: 'Index methodology varies across global benchmarks',
    layout: 'matrix',
    items: ['Price weighted', 'Market-cap weighted', 'Float adjusted', 'Equal weighted', 'Fundamental weighted', 'Regional and global eligibility rules']
  },
  126: {
    title: 'Apply both index-weighting methods to the same four stocks',
    layout: 'formula',
    formula: 'Price weighted: (100 + 20 + 50 + 10) ÷ 4 = 45',
    items: ['Market-cap weighting uses price × shares outstanding.', 'A high share price and a high market value are different concepts.', 'Compare each stock’s influence under both rules.']
  },
  129: {
    title: 'Options create rights; futures create obligations',
    layout: 'comparison',
    items: [
      ['Option', 'Buyer has a right, not an obligation; seller has the corresponding obligation; buyer pays a premium.'],
      ['Futures contract', 'Both counterparties are obligated under a standardized contract; positions are marked to market.']
    ]
  },
  133: {
    title: 'An IPO moves ownership from private investors to the public',
    layout: 'flow',
    items: ['Issuing firm', 'Lead underwriter', 'Underwriting syndicate', 'Institutional and retail investors', 'Public trading']
  },
  134: {
    title: 'Primary issuance creates or sells securities',
    layout: 'comparison',
    items: [
      ['Initial public offering', 'A private firm’s first public issue of shares.'],
      ['Seasoned equity offering', 'An already public firm sells additional shares.']
    ]
  },
  135: {
    title: 'The IPO timeline balances preparation, review and marketing',
    layout: 'timeline',
    items: ['Registration statement prepared', 'SEC review and amendments', 'Road show and book building', 'Pricing', 'Shares offered to the public']
  },
  137: {
    title: 'Shelf registration separates approval from issuance',
    layout: 'flow',
    items: ['Shelf registration becomes effective', 'Issuer monitors financing conditions', 'A short-form supplement updates terms', 'Securities are sold from the shelf']
  },
  138: {
    title: 'IPO activity is cyclical',
    layout: 'matrix',
    items: ['Market valuations', 'Volatility', 'Investor demand', 'Private financing availability', 'Sector cycles', 'Regulatory and disclosure readiness']
  },
  141: {
    title: 'Security identifiers solve different lookup problems',
    layout: 'matrix',
    items: ['Ticker · exchange shorthand', 'CUSIP · North American issue identifier', 'ISIN · global security identifier', 'SEDOL · UK and Ireland market identifier']
  },
  142: {
    title: 'Trading rules differ by asset class',
    layout: 'comparison',
    items: [
      ['Equities', 'Exchange and off-exchange venues; speed and quote protection matter.'],
      ['Bonds', 'Dealer networks; relationships, inventory and bid–ask spreads matter.'],
      ['Derivatives', 'Exchanges or OTC contracts; standardization, collateral and clearing matter.']
    ]
  },
  145: {
    title: 'Read the order book from the inside market outward',
    layout: 'flow',
    items: ['Highest bid', 'Lowest ask', 'Bid–ask spread', 'Depth at additional prices', 'Potential execution price']
  },
  147: {
    title: 'The modern market mosaic connects asset class, venue and rulebook',
    layout: 'matrix',
    items: ['Equities · fragmented venues', 'Bonds · dealer markets', 'Derivatives · standardized and cleared contracts', 'Settlement and custody infrastructure']
  },
  148: {
    title: 'Technology changes execution without eliminating judgment',
    layout: 'comparison',
    items: [
      ['Manual trading', 'Human judgment, negotiation and relationship context.'],
      ['Algorithmic trading', 'Rules, speed and automated execution across fragmented markets.']
    ]
  },
  149: {
    title: 'The equity ecosystem combines venues, participants and rules',
    layout: 'matrix',
    items: ['NYSE and Nasdaq', 'Electronic communication networks', 'Dark pools', 'Algorithmic and high-frequency traders', 'Institutional and retail investors', 'Reg NMS and decimal pricing']
  },
  151: {
    title: 'Colocation turns physical distance into trading latency',
    layout: 'flow',
    items: ['Trading signal', 'Exchange data center', 'Co-located server', 'Order decision', 'Exchange matching engine']
  },
  152: {
    title: 'Dealer bond markets earn the bid–ask spread',
    layout: 'flow',
    items: ['Investor sells at dealer bid', 'Dealer holds or offsets inventory', 'Dealer quotes an ask', 'Another investor buys']
  },
  153: {
    title: 'Electronic venues reveal different slices of fixed-income liquidity',
    layout: 'comparison',
    items: [
      ['Tradeweb', 'Multi-asset institutional trading and request-for-quote workflows.'],
      ['MarketAxess', 'Electronic credit trading, liquidity and data services.']
    ]
  },
  155: {
    title: 'A futures board standardizes contracts and concentrates liquidity',
    layout: 'matrix',
    items: ['Contract month', 'Bid and ask', 'Last price', 'Daily change', 'Volume', 'Open interest']
  },
  156: {
    title: 'Options trade on organized exchanges around the world',
    layout: 'matrix',
    items: ['Cboe', 'Nasdaq options markets', 'NYSE options markets', 'MIAX', 'Eurex', 'Osaka Exchange and Tokyo Stock Exchange']
  },
  157: {
    title: 'The clearinghouse becomes the buyer to every seller and seller to every buyer',
    layout: 'flow',
    items: ['Trader A', 'Clearinghouse counterparty substitution', 'Trader B', 'Daily marking to market', 'Margin and default resources']
  },
  158: {
    title: 'The market mosaic is organized by liquidity and standardization',
    layout: 'matrix',
    items: ['Equities · high liquidity and automation', 'Bonds · lower liquidity and relationship trading', 'Futures · standardized and centrally cleared', 'Swaps · more bespoke and often dealer intermediated']
  },
  159: {
    title: 'The 2010 Flash Crash exposed feedback in automated markets',
    layout: 'timeline',
    items: ['Large sell pressure', 'Liquidity providers retreat', 'Algorithms react to falling depth', 'Prices dislocate', 'Many prices recover quickly']
  },
  160: {
    title: 'Every market still reflects human design and incentives',
    layout: 'matrix',
    items: ['Algorithms encode rules', 'Venues define matching priorities', 'Clearinghouses mutualize risk', 'Regulation sets boundaries', 'Humans choose objectives', 'Structure shapes outcomes']
  },
  161: {
    title: 'Buying on margin',
    layout: 'flow',
    items: ['Investor contributes equity', 'Broker lends the balance', 'Securities collateralize the loan', 'Gains and losses accrue to investor equity']
  },
  162: {
    title: 'Margin creates leverage and a broker call-loan balance',
    layout: 'flow',
    items: ['Purchase price', 'Investor margin', 'Broker loan', 'Market-value changes', 'Margin call if equity falls too far']
  },
  163: {
    title: 'Initial and maintenance margin come from different rule layers',
    layout: 'comparison',
    items: [
      ['Initial margin', 'Regulation T generally requires 50% for a new margin-equity purchase.'],
      ['Maintenance margin', 'FINRA generally requires at least 25% for long margin securities; firms may impose higher house requirements. The source exercise uses 30%.']
    ],
    note: 'The source correctly states the 50% Reg T initial requirement but can imply that a 30% maintenance level is universal. The public slide corrects that distinction using Federal Reserve and FINRA primary sources.'
  },
  167: {
    title: 'Short selling reverses the usual order of a stock trade',
    layout: 'flow',
    items: ['Borrow shares', 'Sell shares', 'Price changes and dividends accrue against the position', 'Buy shares to cover', 'Return shares to lender']
  },
  168: {
    title: 'A short position profits only when the repurchase cost is low enough',
    layout: 'flow',
    items: ['Borrow', 'Sell', 'Maintain collateral and pay borrow costs', 'Buy to cover', 'Return shares']
  },
  170: {
    title: 'Short-sale cost is a live financing input',
    layout: 'matrix',
    items: ['Borrow availability', 'Borrow fee', 'Collateral requirement', 'Dividend reimbursement', 'Recall risk', 'Market-price risk']
  },
  171: {
    title: 'Dividends reverse the short seller’s cash flow',
    layout: 'formula',
    formula: 'Short-sale profit = Initial sale price − Ending purchase price − Dividends − Borrow costs',
    items: ['A long investor receives the dividend.', 'A short seller must reimburse the stock lender for the dividend.', 'A rising price and a dividend both reduce short-sale profit.']
  },
  172: {
    title: 'Regulation of securities markets',
    layout: 'flow',
    items: ['Disclosure and issuance', 'Trading and market integrity', 'Broker-dealer and adviser conduct', 'Custody and customer protection', 'Enforcement']
  },
  173: {
    title: 'The SEC regulates securities markets and disclosure',
    layout: 'matrix',
    items: ['Administers federal securities laws', 'Requires public-company disclosure', 'Oversees exchanges and market participants', 'Enforces against fraud and misconduct']
  },
  174: {
    title: 'Multiple regulators divide the financial system by function',
    layout: 'matrix',
    items: ['SEC · securities', 'CFTC · derivatives', 'Federal Reserve · bank holding companies and monetary policy', 'OCC · national banks', 'FINRA · broker-dealer self-regulation', 'Treasury / FinCEN · financial-crime framework']
  },
  175: {
    title: 'U.S. securities law developed in layers',
    layout: 'timeline',
    items: ['1933 · Securities Act', '1934 · Securities Exchange Act', '1940 · Investment Company and Advisers Acts', '1970 · Securities Investor Protection Act', '2002 · Sarbanes–Oxley', '2010 · Dodd–Frank']
  },
  182: {
    title: 'Investment-company structures change pricing and liquidity',
    layout: 'matrix',
    items: ['Unit investment trust · fixed unmanaged portfolio', 'Open-end fund · issues and redeems at NAV', 'Closed-end fund · fixed shares trade in the market', 'Commingled fund · pooled partnership', 'REIT · real-estate vehicle', 'Hedge fund · private pooled vehicle']
  },
  183: {
    title: 'NAV divides the fund’s net assets across outstanding shares',
    layout: 'formula',
    formula: 'NAV = (Market value of assets − Liabilities) ÷ Shares outstanding',
    items: ['$200.0M investments + $14.0M cash + $6.0M receivables + $0.075M accrued income', '$13.0M short-term liabilities + $4.0M long-term liabilities + $0.050M accrued expenses', '$203.025M net assets ÷ 5.0M shares = $40.605 ≈ $40.61 per share']
  },
  184: {
    title: 'Mutual funds can be classified by the portfolio mandate',
    layout: 'matrix',
    items: ['Money market', 'Equity', 'Sector', 'Bond', 'International / global', 'Balanced or fund of funds']
  },
  186: {
    title: 'Share classes trade front-end loads against ongoing fees',
    layout: 'matrix',
    items: [
      'Class A · front-end load 0–4.5%; no back-end load; 0.25% 12b-1 fee; 0.7% expense ratio',
      'Class C · no front-end load; back-end load 0–1%; 1.0% 12b-1 fee; 0.7% expense ratio',
      'Class I · no front-end or back-end load; no 12b-1 fee; 0.7% expense ratio',
      'Class A load tapers with investment size; the source starts at 4.5% below $50,000 and reaches zero above $1 million.',
      'Class C exit fee is 1% when shares are redeemed within one year.',
      'Class I shares are described in the source as institutional shares with lower distribution fees.'
    ],
    note: 'The source paragraph identifies Class C, but the extracted source table header says Class B. The public slide uses Class C because its fee pattern and the explanatory paragraph agree; the discrepancy remains in the source inventory and review log for instructor approval.'
  },
  191: {
    slides: [
      {
        title: 'ETF net issuance accelerated from 2023 through 2025',
        layout: 'matrix',
        items: [
          '2023 total · $597.505 billion',
          '2024 total · $1.144853 trillion',
          '2025 total · $1.416635 trillion',
          'Domestic equity led issuance in each year shown.',
          'Taxable bond and world equity funds were the next-largest categories.',
          'Source table units: millions of U.S. dollars.'
        ],
        data: {
          years: ['2023', '2024', '2025'],
          categories: [
            ['Hybrid', [1943, 4687, 8335]],
            ['Commodity', [-8217, 5104, 59693]],
            ['Municipal bond', [14674, 17190, 44946]],
            ['World equity', [83331, 97119, 242807]],
            ['Taxable bond', [186811, 278179, 387742]],
            ['Domestic equity', [318963, 742574, 673112]]
          ],
          totals: [597505, 1144853, 1416635]
        },
        note: 'Editable reconstruction of the source Investment Company Institute table and clustered chart. Values were transcribed from the source slide and independently summed by year.'
      },
      {
        title: 'ETF shares are created and redeemed in large blocks',
        layout: 'flow',
        items: ['Authorized participant assembles basket', 'Basket delivered to ETF sponsor', 'Creation units issued', 'ETF shares trade on exchange', 'Redemption reverses the process'],
        note: 'Instructor-added clarification: creation and redemption mechanics explain how ETF shares reach the secondary market; this process was not pictured on source slide 191.'
      }
    ]
  },
  192: {
    title: 'Use primary fund documents before commercial summaries',
    layout: 'steps',
    items: ['Read the prospectus and summary prospectus.', 'Verify holdings, fees and risks in fund filings and reports.', 'Use SEC EDGAR and the issuer’s investor site.', 'Use FactSet or Morningstar as research interfaces, then trace claims to primary documents.']
  },
  193: {
    title: 'The Morningstar style box is a classification—not a forecast',
    layout: 'matrix',
    items: ['Large / mid / small capitalization', 'Value / blend / growth style', 'Nine equity-style cells', 'Useful for portfolio comparison', 'Sensitive to holdings and methodology', 'Does not measure expected return']
  },
  198: {
    title: 'Build the portfolio from evidence',
    layout: 'close',
    items: ['Define the claim.', 'Measure the risk.', 'Verify the source.', 'Explain the decision.']
  }
};

const titleOverrides = {
  7: 'How the source course work is graded',
  32: 'Chapter 1 · The Investment Environment',
  34: 'Chapter 1 key terms',
  38: 'The investment environment · concept check',
  63: 'Chapter 2 · Asset Classes and Financial Instruments',
  64: 'Chapter 2 key terms',
  85: 'Federal funds–Treasury bill spread',
  104: 'Bond ratings and default risk',
  107: 'Dated class announcement',
  119: 'Stock-index concept check',
  127: 'Why an index divisor must be adjusted',
  130: 'Index calculation exercise',
  131: 'Chapter 3 · How Securities Are Traded',
  132: 'Chapter 3 key terms',
  164: 'Margin-account opening balance sheet',
  165: 'Margin after the stock price falls',
  166: 'Maintenance-margin calculation',
  176: 'Sarbanes–Oxley Act of 2002',
  178: 'Margin and short-selling exercise',
  179: 'Chapter 4 · Mutual Funds and Other Investment Companies',
  180: 'Chapter 4 key terms',
  194: 'Mutual fund and ETF calculations and research',
  196: 'ETF scavenger hunt',
  197: 'Current-events discussion'
};

const splitLong = (value) => {
  if (value.length <= 240) return [value];
  const sentences = value.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((item) => item.trim()).filter(Boolean) || [value];
  const chunks = [];
  let current = '';
  for (const sentence of sentences) {
    if (current && `${current} ${sentence}`.length > 240) {
      chunks.push(current);
      current = sentence;
    } else {
      current = current ? `${current} ${sentence}` : sentence;
    }
  }
  if (current) chunks.push(current);
  return chunks;
};

const sourcePoints = (source) => {
  const title = titleOverrides[source.sourceSlide] || source.title;
  const values = source.textBlocks
    .flatMap((block) => block.split(/\n+/))
    .map((value) => value.trim())
    .filter((value) => value && value !== String(source.sourceSlide) && value !== source.title && value !== title)
    .flatMap(splitLong);
  return [...new Set(values)];
};

const displayTitle = (source) => {
  const value = titleOverrides[source.sourceSlide] || visualRebuilds[source.sourceSlide]?.title || source.title;
  if (value.length <= 92) return value;
  const words = value.split(/\s+/);
  let short = '';
  while (words.length && `${short} ${words[0]}`.trim().length <= 88) short = `${short} ${words.shift()}`.trim();
  return `${short}…`;
};

// Source provenance remains in data attributes, speaker notes, and the source inventory.
// It is intentionally omitted from the student-facing slide canvas.
const sourceCredit = () => '';

const header = (source, title, subtitle = '') => `
  <div class="header-row">
    <div>
      <p class="eyebrow">${esc(source.module)} · Chapter ${modules[source.module].chapter}</p>
      <h2>${esc(title)}</h2>
      ${subtitle ? `<p class="subtitle">${esc(subtitle)}</p>` : ''}
    </div>
  </div>
  <div class="rule"></div>`;

const iconName = (value = '') => {
  const text = String(value).toLowerCase();
  if (/risk|loss|drawdown|protect|insurance|safety/.test(text)) return 'shield';
  if (/research|source|verify|evidence|news|review|find|search/.test(text)) return 'search';
  if (/bond|debt|loan|credit|fixed.income|prospectus|document/.test(text)) return 'document';
  if (/stock|equity|share|ownership|company|corporate/.test(text)) return 'building';
  if (/global|country|currency|international|world|emerging/.test(text)) return 'globe';
  if (/time|maturity|horizon|year|date|calendar|history/.test(text)) return 'clock';
  if (/fund|portfolio|divers|allocation|basket|pool|asset class/.test(text)) return 'portfolio';
  if (/calculate|excel|formula|nav|margin|ratio|weight|price/.test(text)) return 'calculator';
  if (/client|investor|team|manager|people|participant|customer/.test(text)) return 'people';
  if (/regulation|rule|law|sec|finra|policy|legal|compliance/.test(text)) return 'gavel';
  if (/technology|factset|data|computer|laptop|electronic|algorithm/.test(text)) return 'laptop';
  return 'chart';
};

const iconGraphic = (value) => {
  const icons = {
    chart: '<path d="M10 52h44M15 44l11-13 10 8 14-21"/><path d="M44 18h6v6"/>',
    shield: '<path d="M32 7l20 8v14c0 13-8 23-20 29C20 52 12 42 12 29V15l20-8z"/><path d="M23 32l6 6 13-15"/>',
    search: '<circle cx="28" cy="28" r="16"/><path d="M40 40l13 13M22 28h12M28 22v12"/>',
    document: '<path d="M17 7h21l11 11v39H17z"/><path d="M38 7v12h11M23 30h20M23 39h20M23 48h13"/>',
    building: '<path d="M10 55h44M15 55V24l17-12 17 12v31M24 55V43h16v12M22 29h4M30 29h4M38 29h4M22 36h4M38 36h4"/>',
    globe: '<circle cx="32" cy="32" r="24"/><path d="M8 32h48M32 8c8 7 12 15 12 24S40 49 32 56M32 8c-8 7-12 15-12 24s4 17 12 24"/>',
    clock: '<circle cx="32" cy="32" r="24"/><path d="M32 18v15l10 7M20 8l-7 7M44 8l7 7"/>',
    portfolio: '<circle cx="31" cy="33" r="23"/><path d="M31 10v23h23M31 33L16 50M31 33L13 20"/>',
    calculator: '<rect x="14" y="7" width="36" height="50" rx="5"/><path d="M21 15h22v10H21zM22 34h2M31 34h2M40 34h2M22 43h2M31 43h2M40 43h2M22 51h2M31 51h11"/>',
    people: '<circle cx="24" cy="24" r="8"/><circle cx="43" cy="27" r="6"/><path d="M9 53c1-11 7-17 15-17s14 6 15 17M36 52c1-8 5-12 11-12 5 0 9 4 10 12"/>',
    gavel: '<path d="M13 49h34M20 53h28M22 19l15 15M31 10l14 14-8 8-14-14zM37 34l15 15"/>',
    laptop: '<rect x="12" y="11" width="40" height="31" rx="3"/><path d="M6 49h52l-5 7H11zM22 35l8-9 7 5 7-10"/>',
  };
  const name = iconName(value);
  return `<svg class="intro-icon" viewBox="0 0 64 64" aria-hidden="true" focusable="false">${icons[name]}</svg>`;
};

const renderCards = (items, className = 'intro-grid', { numbered = false } = {}) => `
  <div class="${className}">
    ${items.map((item, index) => `<article class="intro-card tone-${index % 4}">
      ${numbered
        ? `<span class="intro-card-number">${String(index + 1).padStart(2, '0')}</span>`
        : `<div class="intro-card-visual">${iconGraphic(item)}</div>`}
      <p>${esc(item)}</p>
    </article>`).join('')}
  </div>`;

const renderConceptField = (items, label, seed = 0) => {
  const values = items.map(String);
  const aria = `${label}: ${values.join('; ')}`;
  const averageLength = values.reduce((sum, value) => sum + value.length, 0) / Math.max(1, values.length);

  if (values.length === 1) return `
    <div class="concept-field concept-spotlight" role="img" aria-label="${esc(aria)}">
      <div class="concept-spotlight-icon">${iconGraphic(values[0])}</div>
      <p>${esc(values[0])}</p>
      <i aria-hidden="true"></i>
    </div>`;

  if (averageLength > 100 || values.length > 6) return `
    <div class="concept-field concept-ribbons" role="img" aria-label="${esc(aria)}">
      ${values.map((value, index) => `<article class="ribbon-tone-${index % 4}"><span>${iconGraphic(value)}</span><p>${esc(value)}</p></article>`).join('')}
    </div>`;

  if (values.length === 2) return `
    <div class="concept-field concept-duet" role="img" aria-label="${esc(aria)}">
      ${values.map((value, index) => `<article class="duet-${index}"><span>${iconGraphic(value)}</span><p>${esc(value)}</p></article>`).join('<i aria-hidden="true">↔</i>')}
    </div>`;

  if (values.length === 3) return `
    <div class="concept-field concept-triad" role="img" aria-label="${esc(aria)}">
      <svg viewBox="0 0 1600 520" aria-hidden="true"><path d="M800 70L1280 435H320Z"/></svg>
      ${values.map((value, index) => `<article class="triad-${index}"><span>${iconGraphic(value)}</span><p>${esc(value)}</p></article>`).join('')}
    </div>`;

  if (seed % 3 === 1) return `
    <div class="concept-field concept-ribbons" role="img" aria-label="${esc(aria)}">
      ${values.map((value, index) => `<article class="ribbon-tone-${index % 4}"><span>${iconGraphic(value)}</span><p>${esc(value)}</p></article>`).join('')}
    </div>`;

  if (seed % 3 === 2) return `
    <div class="concept-field concept-cascade count-${values.length}" role="img" aria-label="${esc(aria)}">
      <svg viewBox="0 0 1660 560" aria-hidden="true"><path d="M85 160C280 160 270 415 500 415S720 160 940 160 1160 415 1380 415 1510 250 1580 250"/></svg>
      ${values.map((value, index) => `<article class="cascade-${index + 1}"><span>${iconGraphic(value)}</span><p>${esc(value)}</p></article>`).join('')}
    </div>`;

  const orientation = seed % 2 ? 'orbit-clockwise' : 'orbit-counterclockwise';
  return `
    <div class="concept-field concept-orbit ${orientation} count-${values.length}" role="img" aria-label="${esc(aria)}">
      <svg viewBox="0 0 1660 560" aria-hidden="true"><circle cx="830" cy="280" r="165"/><path d="M830 280L225 90M830 280L1435 90M830 280L140 280M830 280L1520 280M830 280L225 470M830 280L1435 470"/></svg>
      <div class="orbit-hub"><span>CONNECT</span><strong>THE IDEAS</strong></div>
      ${values.map((value, index) => `<article class="orbit-node node-${index + 1}"><span>${iconGraphic(value)}</span><p>${esc(value)}</p></article>`).join('')}
    </div>`;
};

const renderFlow = (items, label) => `
  <div class="intro-flow" role="img" aria-label="${esc(label)}">
    ${items.map((item, index) => `
      <div><span class="intro-flow-visual">${iconGraphic(item)}</span><p>${esc(item)}</p></div>
      ${index < items.length - 1 ? '<i aria-hidden="true">→</i>' : ''}`).join('')}
  </div>`;

const renderTimeline = (items, label) => `
  <div class="intro-timeline" role="img" aria-label="${esc(label)}">
    ${items.map((item) => `<div><i aria-hidden="true"></i><p>${esc(item)}</p></div>`).join('')}
  </div>`;

const renderComparison = (items, label) => `
  <div class="intro-comparison" role="img" aria-label="${esc(label)}">
    ${items.map(([title, body], index) => `<article class="${index ? 'right' : 'left'}"><div class="comparison-visual">${iconGraphic(`${title} ${body}`)}</div><h3>${esc(title)}</h3><p>${esc(body)}</p></article>`).join('')}
  </div>`;

const renderTable = (source, table, tableIndex = 0) => {
  const rows = table.rows || [];
  if (!rows.length) return '';
  return `<table class="finance-table compact intro-source-table">
    <caption>${esc(displayTitle(source))}${tableIndex ? ` · table ${tableIndex + 1}` : ''}</caption>
    <thead><tr>${rows[0].map((cell) => `<th scope="col">${esc(cell)}</th>`).join('')}</tr></thead>
    <tbody>${rows.slice(1).map((row) => `<tr>${row.map((cell, index) => `<${index === 0 ? 'th scope="row"' : 'td'}>${esc(cell)}</${index === 0 ? 'th' : 'td'}>`).join('')}</tr>`).join('')}</tbody>
  </table>`;
};

const renderMarketUpdate = (source, update) => `
  ${header(source, update.title, update.asOf)}
  <div class="market-snapshot">
    ${update.stats.map(([value, label, detail]) => `<article><div class="market-visual">${iconGraphic(`${label} ${detail}`)}</div><strong>${esc(value)}</strong><h3>${esc(label)}</h3><p>${esc(detail)}</p></article>`).join('')}
  </div>
  <div class="official-links" aria-label="Official data sources">
    ${update.sources.map((key) => `<a href="${officialSources[key].url}" target="_blank" rel="noopener">${esc(officialSources[key].label)}</a>`).join('')}
  </div>`;

const renderSourceInspiredGraphic = (source, rebuild) => {
  const title = rebuild.title || displayTitle(source);
  const label = `${title}. Editable instructional reconstruction.`;

  if (source.sourceSlide === 2) return `
    <div class="welcome-books" role="group" aria-label="${esc(label)}">
      <div class="welcome-copy">
        <p>This class builds a comprehensive understanding of <strong>asset classes, investment strategies, financial markets and risk management.</strong></p>
        <div class="welcome-path" role="img" aria-label="BUS331 Investments begins a pathway toward CFA Level I learning">
          <strong>BUS331 Investments</strong><i aria-hidden="true">→</i><span>CFA Level I learning path</span>
        </div>
      </div>
      <div class="book-pair" aria-label="Original textbook images used in the course welcome">
        <figure class="book-current">
          <img src="../../assets/bus331-intro/source-slide-02-investments-13e.png" alt="Cover of Investments, thirteenth edition, by Bodie, Kane and Marcus">
          <figcaption><span>Investment class textbook</span><strong>Investments · 13th Edition</strong><small>Bodie · Kane · Marcus</small></figcaption>
        </figure>
        <div class="book-time" aria-hidden="true"><span>1998</span><i></i><span>NOW</span></div>
        <figure class="book-archive">
          <img src="../../assets/bus331-intro/source-slide-02-investments-1998.png" alt="Cover of the Investments text used for the instructor’s CFA study in 1998">
          <figcaption><span>My CFA version</span><strong>Back in 1998</strong></figcaption>
        </figure>
      </div>
    </div>`;

  if (source.sourceSlide === 5) return `
    <div class="project-workflow" role="img" aria-label="Investment project workflow. Market inputs include podcasts, current events, Canvas discussion groups, and finding and reading an ETF prospectus. Excel and FactSet support comps valuation, DCF, and mutual fund NAV and fee calculations. The work culminates in an investment project presentation and recommendation.">
      <div class="market-signals">
        <p>MARKET INPUTS</p>
        <article class="signal-podcast">
          <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 33c0-10 8-18 18-18s18 8 18 18"/><path d="M21 33c0-6 5-11 11-11s11 5 11 11"/><circle cx="32" cy="34" r="4"/><path d="M32 38v13"/></svg>
          <strong>Podcasts</strong>
        </article>
        <article class="signal-news">
          <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M13 15h38v34H13z"/><path d="M20 23h16M20 31h24M20 39h24"/></svg>
          <strong>Current events</strong>
        </article>
        <article class="signal-discussion">
          <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M12 16h40v27H29l-11 8v-8h-6z"/><path d="M21 27h22M21 34h15"/></svg>
          <strong>Canvas discussion groups</strong>
        </article>
        <article class="signal-prospectus">
          <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M18 10h22l8 8v36H18z"/><path d="M40 10v9h8M25 29h16M25 37h16M25 45h11"/></svg>
          <strong>Find + read an ETF prospectus</strong>
        </article>
      </div>

      <div class="workflow-arrow" aria-hidden="true"><i></i><span>→</span></div>

      <div class="analysis-engine">
        <p>ANALYZE + VALUE</p>
        <svg class="engine-lines" viewBox="0 0 620 470" aria-hidden="true"><path d="M310 235C215 205 170 145 132 96"/><path d="M310 235C405 205 450 145 488 96"/><path d="M310 235V392"/></svg>
        <div class="tool-core"><span>FACTSET</span><b>+</b><strong>EXCEL</strong></div>
        <div class="model model-comps"><small>RELATIVE VALUE</small><b>Comps valuation spreadsheet</b></div>
        <div class="model model-dcf"><small>INTRINSIC VALUE</small><b>DCF spreadsheet</b></div>
        <div class="model model-nav"><small>FUND ECONOMICS</small><b>Mutual fund NAV + fee calculations</b></div>
      </div>

      <div class="workflow-arrow" aria-hidden="true"><i></i><span>→</span></div>

      <div class="presentation-stage">
        <p>COMMUNICATE</p>
        <div class="presentation-screen">
          <span>INVESTMENT PROJECT</span>
          <svg viewBox="0 0 250 130" aria-hidden="true"><path class="axis" d="M22 106H232M22 106V18"/><path class="chart" d="M29 93L70 72 105 80 143 47 179 57 222 25"/><circle cx="222" cy="25" r="8"/></svg>
          <strong>Present the recommendation</strong>
        </div>
        <div class="stage-floor"><i></i><b>Research → model → explain</b></div>
      </div>
    </div>`;

  if (source.sourceSlide === 7 && rebuild.layout === 'grade-allocation') return `
    <div class="grade-allocation" role="img" aria-label="BUS331 grade allocation: attendance and participation 15 percent, reading 10 percent, homework 10 percent, in-class activities 30 percent, concept checks 10 percent, and investment project and presentations 25 percent. Total 100 percent.">
      <div class="grade-total"><span>COURSE GRADE</span><strong>100%</strong><small>six connected components</small></div>
      <div class="grade-stack" aria-hidden="true">
        <i class="attendance" style="--weight:15"><b>15%</b></i>
        <i class="reading" style="--weight:10"><b>10%</b></i>
        <i class="homework" style="--weight:10"><b>10%</b></i>
        <i class="activities" style="--weight:30"><b>30%</b></i>
        <i class="checks" style="--weight:10"><b>10%</b></i>
        <i class="project" style="--weight:25"><b>25%</b></i>
      </div>
      <div class="grade-key">
        <span class="attendance">Attendance + participation <b>15%</b></span>
        <span class="reading">Reading <b>10%</b></span>
        <span class="homework">Homework <b>10%</b></span>
        <span class="activities">In-class activities <b>30%</b></span>
        <span class="checks">Concept checks <b>10%</b></span>
        <span class="project">Investment project + presentations <b>25%</b></span>
      </div>
    </div>`;

  if (source.sourceSlide === 7 && rebuild.layout === 'grade-rhythm') return `
    <div class="grade-rhythm" role="img" aria-label="Weekly course rhythm: attendance and participation 15 percent, reading 10 percent, homework 10 percent, and in-class Excel and FactSet activities 30 percent. Together these components earn 65 percent of the grade.">
      <svg viewBox="0 0 1660 500" aria-hidden="true"><path class="rhythm-route" d="M150 280C310 75 535 70 690 270S1075 475 1250 265 1450 80 1550 245"/><path class="rhythm-progress" d="M150 280C310 75 535 70 690 270S1075 475 1250 265 1450 80 1550 245"/></svg>
      <div class="rhythm-total"><strong>65%</strong><span>earned through the weekly rhythm</span></div>
      <article class="rhythm-attend"><span>15%</span><b>Show up + participate</b><p>Active participation deepens understanding. Arrive on time.</p></article>
      <article class="rhythm-read"><span>10%</span><b>Read before class</b><p>Complete the assigned reading on time.</p></article>
      <article class="rhythm-homework"><span>10%</span><b>Practice in Connect</b><p>Questions and Excel-based problems.</p></article>
      <article class="rhythm-activities"><span>30%</span><b>Apply Excel + FactSet</b><p>Submit before the next class or the Canvas due date.</p></article>
    </div>`;

  if (source.sourceSlide === 7 && rebuild.layout === 'grade-demonstration') return `
    <div class="grade-demonstration" role="img" aria-label="Demonstration of learning: paper concept checks are 10 percent and allow no electronics or notes. The group investment project and presentations are 25 percent and are graded individually based on effort, group feedback, understanding of material and business presentation quality.">
      <div class="concept-check-sheet">
        <span>CONCEPT CHECKS · 10%</span>
        <svg viewBox="0 0 260 220" aria-hidden="true"><path d="M44 20h148l28 28v152H44z"/><path d="M192 20v31h28M72 80h112M72 112h112M72 144h76"/><path class="check" d="M72 175l18 18 38-49"/></svg>
        <strong>Key terms + equations</strong>
        <p>Paper tests · no electronics · no notes</p>
      </div>
      <div class="assessment-plus" aria-hidden="true">+</div>
      <div class="project-stage-visual">
        <span>GROUP PROJECT + PRESENTATIONS · 25%</span>
        <div class="project-screen"><i></i><i></i><i></i><b>Investment recommendation</b></div>
        <strong>One team project. Individual grades.</strong>
        <div class="individual-criteria"><b>Effort</b><b>Group feedback</b><b>Understanding</b><b>Business-level presentation</b></div>
      </div>
      <div class="assessment-total"><strong>35%</strong><span>demonstrate what you can do</span><small>Grading for BUS331-02</small></div>
    </div>`;

  if (source.sourceSlide === 13) return `
    <div class="source-events-board" role="group" aria-label="Dated December 2025 current-events collage restored from the original slide. It includes headlines about mergers and acquisitions, corporate bond issuance, global stock-market leadership and additional market stories.">
      <div class="source-events-heading">
        <img class="events-globe" src="../../assets/bus331-intro/source-slide-13-globe.png" alt="Illustrated globe from the original current-events slide">
        <div><span>DECEMBER 2025 EXAMPLE</span><h2>CURRENT <strong>EVENTS</strong></h2><p>What would you verify before using a headline?</p></div>
        <img class="events-calendar" src="../../assets/bus331-intro/source-slide-13-current-events.png" alt="Calendar and announcement icon from the original current-events slide">
      </div>
      <div class="source-events-clippings">
        <figure class="event-ma"><img src="../../assets/bus331-intro/source-slide-13-headline-ma.png" alt="Source headline: M and A outlook brightens heading into 2026"></figure>
        <figure class="event-bonds"><img src="../../assets/bus331-intro/source-slide-13-headline-bonds.png" alt="Source headline: corporate bond sales approach pandemic-era record"></figure>
        <figure class="event-stocks"><img src="../../assets/bus331-intro/source-slide-13-headline-stocks.png" alt="Source headline: global stocks split by AI, defense and tariffs in 2025"></figure>
        <figure class="event-more"><img src="../../assets/bus331-intro/source-slide-13-headline-more.png" alt="Additional source market headlines from Bloomberg and the Financial Times"></figure>
      </div>
      <p class="events-recheck">Dated source example · refresh the news before class</p>
    </div>`;

  if (source.sourceSlide === 14) return `
    <div class="investment-question-reveal" role="group" aria-label="Discussion prompt asking whether a red handbag should be considered an investment and, if so, what kind.">
      <div class="investment-question-copy">
        <span>DISCUSSION</span>
        <h2>Should this be considered <strong>an investment?</strong></h2>
        <p>If so, what kind?</p>
      </div>
      <figure><img src="../../assets/bus331-intro/source-slide-14-handbag.jpeg" alt="Red handbag used in the original slide's investment discussion prompt"></figure>
      <div class="investment-question-accent" aria-hidden="true"><i></i><i></i><i></i></div>
    </div>`;

  if (source.sourceSlide === 15) return `
    <div class="handbag-fund-reveal" role="group" aria-label="Original Handbag Fund example. A Forbes article and Luxusfunds Hermès fund images lead to the questions: good investment or gamble, and what could go wrong?">
      <div class="handbag-fund-title"><span>ALTERNATIVE ASSET CASE</span><h2>Handbag<br><strong>Fund</strong></h2></div>
      <a class="handbag-forbes" href="https://www.forbes.com/sites/celiashatzman/2025/11/07/you-can-now-invest-in-a-hedge-fund-dedicated-to-herms-bags/" target="_blank" rel="noopener"><b>You Can Now Invest In A Hedge Fund Dedicated To Hermès Bags</b><span>Forbes ↗</span></a>
      <div class="handbag-evidence">
        <img src="../../assets/bus331-intro/source-slide-15-luxus-hermes.png" alt="Original Luxusfunds image stating that Hermès Edition 01 and 02 are oversubscribed and closed to new investors">
        <figure class="handbag-caption-evidence">
          <img src="../../assets/bus331-intro/source-slide-15-fund-caption.png" alt="Original source caption explaining that the private closed funds do not have publicly traded ticker symbols">
          <figcaption><strong>Private, closed funds</strong><p>The Luxusfunds Hermès Edition 01 and Edition 02 do not have publicly traded ticker symbols because they are private, closed investment funds—not publicly listed securities.</p></figcaption>
        </figure>
      </div>
      <figure class="handbag-hero"><img src="../../assets/bus331-intro/source-slide-14-handbag.jpeg" alt="Red handbag repeated from the original Handbag Fund example"></figure>
      <div class="handbag-question"><strong>Good investment<br>or gamble?</strong><span>What could go wrong?</span></div>
    </div>`;

  if (source.sourceSlide === 16) return `
    <div class="factset-launchpad" role="img" aria-label="${esc(label)}">
      <div class="factset-screen"><span>FACTSET</span><div class="screen-market"><i></i><i></i><i></i><i></i><i></i></div><b>Workstation ready</b></div>
      <div class="launch-route">
        <article class="canvas"><span>Canvas</span><strong>Complete the activation assignment</strong></article><i aria-hidden="true">→</i>
        <article class="workstation"><span>Workstation</span><strong>Install or open FactSet</strong></article><i aria-hidden="true">→</i>
        <article class="proof"><span>Course submission</span><strong>Submit the snapshot only in Canvas</strong></article><i aria-hidden="true">→</i>
        <article class="help"><span>Before the lab</span><strong>Ask for help if activation fails</strong></article>
      </div>
    </div>`;

  if (source.sourceSlide === 17) return `
    <div class="activation-console" role="img" aria-label="${esc(label)}">
      <div class="activation-browser"><span class="browser-tab">FACTSET ACCOUNT ACTIVATION</span><i></i><i></i><i></i>
        <div class="activation-form"><b>Endicott email</b><span>Account setup</span><strong>Verified access</strong></div>
      </div>
      <div class="activation-ribbon">
        <span class="email">Open the Canvas activation link</span><i aria-hidden="true">→</i>
        <span class="identity">Complete setup with your Endicott email</span><i aria-hidden="true">→</i>
        <span class="install">Install FactSet and Office integration</span><i aria-hidden="true">→</i>
        <span class="confirm">Launch the workstation and confirm sign-in</span>
      </div>
    </div>`;

  if (source.sourceSlide === 18) return `
    <div class="learning-library" role="img" aria-label="${esc(label)}">
      <aside><span>FACTSET</span><strong>E-learning library</strong><div class="library-filter"><i></i><i></i><i></i></div></aside>
      <div class="learning-shelf">
        <article class="open"><b>Open</b><strong>FactSet e-learning</strong><span>Start from the course library</span></article>
        <article class="match"><b>Match</b><strong>Choose the module for today’s task</strong><span>Navigation · workflow · tools</span></article>
        <article class="verify"><b>Verify</b><strong>Training supports—not replaces—source checks</strong><span>Trace every claim to the underlying data</span></article>
        <article class="questions"><b>Capture</b><strong>Record questions for class</strong><span>Bring the sticking point, not a silent guess</span></article>
      </div>
    </div>`;

  if (source.sourceSlide === 19) return `
    <div class="help-orbit" role="img" aria-label="${esc(label)}">
      <div class="help-hub"><b>?</b><strong>FactSet Help</strong><span>Top-right of the workstation</span></div>
      <article class="help-start"><span>Start here</span><strong>Search Getting Started</strong><p>Try the built-in guide before opening a support case.</p></article>
      <article class="help-assistant"><span>Workflow support</span><strong>Ask the assistant</strong><p>Use it for navigation and process questions.</p></article>
      <article class="help-verify"><span>Evidence gate</span><strong>Verify interpretations</strong><p>Return to the underlying FactSet data.</p></article>
      <svg viewBox="0 0 1500 590" aria-hidden="true" focusable="false"><path d="M750 295C520 95 300 125 170 210M750 295C985 90 1215 130 1340 220M750 295C990 500 1210 470 1345 390"/></svg>
    </div>`;

  if (source.sourceSlide === 23) return `
    <div class="news-evidence-funnel" role="img" aria-label="${esc(label)}">
      <div class="news-monitor"><span>TODAY’S TOP NEWS</span><div class="market-tape"><b>SPX</b><i></i><b>10Y</b><i></i><b>USD</b></div>${['Company headline','Sector story','Earnings update'].map(item=>`<p><i></i>${item}</p>`).join('')}</div>
      <div class="news-funnel"><span>Scan</span><i></i><span>Open original</span><i></i><span>Separate fact</span></div>
      <div class="evidence-ledger"><strong>Evidence record</strong><p class="fact"><b>FACT</b> What the source reports</p><p class="commentary"><b>COMMENTARY</b> What someone infers</p><p class="citation"><b>CITE</b> Date · source · investment implication</p></div>
    </div>`;

  if (source.sourceSlide === 25) return `
    <div class="economic-calendar" role="img" aria-label="${esc(label)}">
      <div class="calendar-strip"><span>MON</span><span>TUE</span><span class="active">WED</span><span>THU</span><span>FRI</span></div>
      <div class="release-board">
        <div class="release-controls"><b>Country</b><b>Importance</b><b>Consensus + prior</b></div>
        <article><span>8:30 AM</span><strong>Economic release</strong><b>CONSENSUS</b><i aria-hidden="true">→</i><b>ACTUAL</b><i aria-hidden="true">→</i><em>MARKET REACTION</em></article>
        <p>Filter the calendar, capture the estimates and actual value, then explain the reaction without assuming causation.</p>
      </div>
    </div>`;

  if (source.sourceSlide === 27) return `
    <div class="comp-workbench" role="img" aria-label="${esc(label)}">
      <div class="peer-basket"><span>PEER SET</span>${['CAT','DE','CMI','PCAR'].map(ticker=>`<b>${ticker}</b>`).join('')}</div>
      <div class="metric-table"><span>CONSISTENT METRICS</span><div><b>EV / EBITDA</b><i></i><strong>12.4×</strong></div><div><b>P / E</b><i></i><strong>18.7×</strong></div><small>Normalize dates and accounting definitions</small></div>
      <div class="valuation-range"><span>RELATIVE-VALUE RANGE</span><i><b></b></i><p>Informative comparison—not an intrinsic-value verdict.</p></div>
    </div>`;

  if (source.sourceSlide === 28) return `
    <div class="transcript-workbench" role="img" aria-label="${esc(label)}">
      <div class="transcript-panel"><span>EARNINGS CALL TRANSCRIPT</span><div class="speaker-line"><b>CEO</b><p>Management themes and segment evidence</p></div><div class="speaker-line"><b>CFO</b><p>Reported results and operating drivers</p></div><div class="speaker-line highlight"><b>Q&amp;A</b><p>Claims to test against the numbers</p></div></div>
      <div class="reported-numbers"><span>REPORTED NUMBERS</span><svg viewBox="0 0 520 270" aria-hidden="true" focusable="false"><path d="M40 220H490M40 40V220"/><path class="reported-line" d="M55 185L145 155 235 175 325 95 415 115 485 70"/><circle cx="325" cy="95" r="10"/></svg><b>Primary evidence</b></div>
      <div class="ai-navigation"><span>AI SUMMARY</span><strong>Navigation aid only</strong><p>Use it to find themes; verify every conclusion in the transcript and reported data.</p></div>
    </div>`;

  if (source.sourceSlide === 29) return `
    <div class="sector-intelligence-map" role="img" aria-label="${esc(label)}">
      <div class="sector-nav"><span>COMPANY / SECURITY</span><b>Industry</b><b class="active">Sector Intelligence</b><b>Data Centers</b></div>
      <div class="sector-report"><span>DATA CENTER INTELLIGENCE REPORT</span><strong>Business-driver dashboard</strong><div class="driver-grid"><b>Capacity</b><b>Pricing</b><b>Demand</b><b>Capital intensity</b></div></div>
      <div class="source-trace"><span>TRACE THE CONCLUSION</span><i></i><strong>Original data source</strong><p>Filter to the relevant drivers, then cite the evidence behind the claim.</p></div>
    </div>`;

  if (source.sourceSlide === 61) return `
    <div class="factset-exploration-lab" role="img" aria-label="${esc(label)}">
      <div class="lab-center"><span>LET’S EXPLORE</span><strong>Company Snapshot</strong><b>FactSet</b></div>
      <article class="lab-news"><span>NEWS</span><strong>One current item</strong><p>Open the original source.</p></article>
      <article class="lab-context"><span>CONTEXT</span><strong>Market · economics · industry</strong><p>Connect one relevant view.</p></article>
      <article class="lab-evidence"><span>EVIDENCE</span><strong>Save what supports the claim</strong><p>Keep the source and date.</p></article>
      <div class="lab-brief">Be ready to explain the investment relevance.</div>
      <svg viewBox="0 0 1500 590" aria-hidden="true" focusable="false"><path d="M750 300L260 150M750 300L1240 150M750 300L750 515"/></svg>
    </div>`;

  if (source.sourceSlide === 119) return `
    <div class="index-blueprint" role="img" aria-label="${esc(label)}">
      <div class="index-core"><span>RULE-BASED MEASUREMENT PORTFOLIO</span><strong>STOCK INDEX</strong><i></i></div>
      <div class="index-lenses">
        <article class="eligible"><div aria-hidden="true"></div><span>ELIGIBILITY</span><strong>Which securities enter?</strong></article>
        <article class="exposure"><div aria-hidden="true"></div><span>EXPOSURE</span><strong>What slice of the economy does it represent?</strong></article>
        <article class="weight"><div aria-hidden="true"></div><span>WEIGHTING</span><strong>How are weights and the index level calculated?</strong></article>
      </div>
    </div>`;

  if (source.sourceSlide === 192) return `
    <div class="fund-source-pyramid" role="img" aria-label="${esc(label)}">
      <div class="source-layer interfaces"><span>RESEARCH INTERFACES</span><strong>FactSet · Morningstar</strong><p>Useful for discovery—trace claims downward.</p></div>
      <div class="source-layer gateways"><span>OFFICIAL GATEWAYS</span><strong>SEC EDGAR · issuer investor site</strong><p>Locate the authoritative documents.</p></div>
      <div class="source-layer primary"><span>PRIMARY FUND DOCUMENTS</span><strong>Prospectus · summary prospectus · filings · reports</strong><p>Verify holdings, fees and risks here.</p></div>
      <aside><b>Research flows up</b><i aria-hidden="true">↑</i><strong>Verification flows down</strong><i aria-hidden="true">↓</i></aside>
    </div>`;

  if (source.sourceSlide === 10) {
    if (/core mission/i.test(title)) return `
      <div class="project-mission" role="img" aria-label="${esc(label)}">
        <div class="project-target" aria-hidden="true"><i></i><i></i><i></i><b>BUS331</b></div>
        <div class="mission-core"><span>The core mission</span><strong>Design, implement and defend a real-world investment portfolio</strong></div>
        <div class="mission-route">
          ${['Define macro scenarios', 'Design the portfolio', 'Implement the strategy', 'Audit performance and compliance'].map((item, index) => `<div><small>0${index + 1}</small><b>${esc(item)}</b></div>${index < 3 ? '<i aria-hidden="true">→</i>' : ''}`).join('')}
        </div>
      </div>`;
    if (/Macro forecasting/i.test(title)) return `
      <div class="scenario-lab" role="img" aria-label="${esc(label)}">
        <div class="scenario-inputs">
          <span>Real GDP <b>Q/Q%</b></span><span>Inflation <b>1-month %</b></span><span>Yield curve <b>10Y − 2Y</b></span>
        </div>
        <div class="scenario-fan" aria-hidden="true"><i></i><i></i><i></i></div>
        <div class="scenario-outcomes">
          <article class="base"><strong>Base</strong><span>Most likely path</span></article>
          <article class="bull"><strong>Bull</strong><span>Upside conditions</span></article>
          <article class="bear"><strong>Bear</strong><span>Stress conditions</span></article>
        </div>
      </div>`;
    if (/Phases 1–4/i.test(title)) return `
      <div class="project-phase-map" role="img" aria-label="${esc(label)}">
        <aside><span>Mandate rail</span><b>R</b><b>R</b><b>T</b><b>T</b><b>L</b><b>L</b><small>Risk · Return · Time · Taxes · Liquidity · Legal / unique</small></aside>
        <div class="phase-spine">
          <article><small>Phases 1 &amp; 2</small><strong>Foundations &amp; mandates</strong><p>Set client constraints and the maximum drawdown limit.</p></article>
          <i aria-hidden="true">↓</i>
          <article><small>Phases 3 &amp; 4</small><strong>Strategy &amp; selection</strong><p>Optimize the allocation, measure performance and select ten undervalued securities with SML analysis.</p></article>
        </div>
        <aside class="metrics"><span>Performance rail</span><b>β</b><b>S</b><b>T</b><b>DD</b><small>Beta · Sharpe · Treynor · Maximum drawdown</small></aside>
      </div>`;
    if (/AI model requires verification/i.test(title)) return `
      <div class="verification-bridge" role="img" aria-label="${esc(label)}">
        <div class="ai-workbench"><span>Junior analyst</span><strong>AI</strong><p>Excel troubleshooting<br>Red-team the model<br>Document the workflow</p></div>
        <div class="verification-gate"><b>VERIFY</b><i aria-hidden="true"></i><span>Every data point</span></div>
        <div class="evidence-stack"><span>Original sources</span><b>Filing</b><b>Market data</b><b>Calculation</b><b>Audit log</b></div>
      </div>`;
    if (/Phase 5/i.test(title)) return `
      <div class="stress-test-board" role="img" aria-label="${esc(label)}">
        <div class="stress-chart">
          <span>Bear-case stress test</span>
          <svg viewBox="0 0 760 360" aria-hidden="true" focusable="false"><path class="stress-grid" d="M60 55V310H710M60 110H710M60 165H710M60 220H710M60 275H710"/><path class="drawdown-limit" d="M60 250H710"/><path class="portfolio-path" d="M60 90C135 70 170 116 230 104S330 85 375 125 455 265 510 235 610 178 710 190"/><circle cx="455" cy="265" r="15"/><text x="82" y="242">MAX DRAWDOWN LIMIT</text></svg>
          <p>Adjust allocation or add derivative hedges to restore IPS compliance.</p>
        </div>
        <div class="deliverable-stack"><span>Final deliverables</span><b>20–30-page PowerPoint</b><b>Functional Excel model</b><b>Formal team presentation</b><b>AI audit log + NotebookLM resource</b></div>
      </div>`;
  }

  if (source.sourceSlide === 43) return `
    <div class="investment-process" role="img" aria-label="${esc(label)}">
      <article class="allocation-side"><span>Broad choices</span><strong>Asset allocation</strong><div class="allocation-donut" aria-hidden="true"><i></i></div><p>Stocks · bonds · commodities · currencies · real estate</p></article>
      <div class="decision-funnel"><b>PORTFOLIO</b><i aria-hidden="true">→</i><span>Top-down</span><span>or bottom-up</span><i aria-hidden="true">←</i></div>
      <article class="selection-side"><span>Specific choices</span><strong>Security selection</strong><div class="ticker-cloud"><b>F</b><b>GOOG</b><b>MSFT</b><b>GIS</b></div><p>Securities chosen within each asset class</p></article>
    </div>`;

  if (source.sourceSlide === 47) return `
    <div class="risk-return-rebuild" role="img" aria-label="${esc(label)}">
      <svg viewBox="0 0 900 590" aria-hidden="true" focusable="false">
        <path class="rr-grid" d="M90 40V510H850M90 430H850M90 350H850M90 270H850M90 190H850M90 110H850M220 40V510M350 40V510M480 40V510M610 40V510M740 40V510"/>
        <path class="rr-trend" d="M130 458C260 420 355 360 470 290S660 172 805 78"/>
        ${[[150,446],[205,420],[280,385],[405,330],[520,260],[665,176],[800,88]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${12+i}"/>`).join('')}
        <text x="390" y="565">Risk / volatility →</text><text transform="translate(35 370) rotate(-90)">Expected return →</text>
      </svg>
      <div class="risk-principles">${rebuild.items.map((item,index)=>`<p><b>${index+1}</b>${esc(item)}</p>`).join('')}</div>
    </div>`;

  if (source.sourceSlide === 52) return `
    <div class="capital-cycle" role="img" aria-label="${esc(label)}">
      <div class="capital-node household"><span>Net suppliers</span><strong>Households</strong><p>Buy securities and supply savings.</p></div>
      <div class="capital-channel"><i aria-hidden="true">capital →</i><b>Financial markets<br>&amp; intermediaries</b><i aria-hidden="true">← securities</i></div>
      <div class="capital-node firm"><span>Net demanders</span><strong>Firms</strong><p>Raise funds for plant, equipment and growth.</p></div>
      <div class="government-branch"><strong>Government</strong><span>Borrower or lender depending on taxes and expenditures</span></div>
    </div>`;

  if (source.sourceSlide === 67) return `
    <div class="crisis-taxonomy" role="img" aria-label="${esc(label)}">
      ${[
        ['Bubbles & crashes','Tulip mania|1929 crash|Dot-com bubble'],
        ['International','Currency / balance of payments|Sovereign default'],
        ['Wider economy','Recession|Depression'],
        ['Banking','Bank run']
      ].map(([heading,children],index)=>`<article class="crisis-${index}"><strong>${heading}</strong>${children.split('|').map(child=>`<span>${child}</span>`).join('')}</article>`).join('')}
    </div>`;

  if (source.sourceSlide === 74) return `
    <div class="mbs-cashflow" role="img" aria-label="${esc(label)}">
      <svg class="mbs-arrows" viewBox="0 0 1500 470" aria-hidden="true" focusable="false"><defs><marker id="mbs-arrow" markerWidth="12" markerHeight="12" refX="8" refY="4" orient="auto"><path d="M0,0 L0,8 L9,4 z"/></marker></defs><path class="principal" d="M1320 85H180" marker-end="url(#mbs-arrow)"/><path class="payments" d="M180 365H1320" marker-end="url(#mbs-arrow)"/><text x="680" y="56">$100K principal funding</text><text x="610" y="430">Principal &amp; interest, net of fees</text></svg>
      <div class="mbs-nodes"><div><b>Homeowner</b><span>Mortgage</span></div><div><b>Originator</b><span>− servicing fee</span></div><div><b>Agency / sponsor</b><span>− guarantee fee</span></div><div><b>MBS investor</b><span>Receives net cash flow</span></div></div>
    </div>`;

  if (source.sourceSlide === 76) return `
    <div class="cdo-waterfall" role="img" aria-label="${esc(label)}">
      <div class="cdo-pool"><span>Collateral pool</span><strong>Loans + debt instruments</strong></div>
      <div class="tranche-stack">
        <article class="senior"><strong>Senior tranche</strong><span>Paid first · lowest risk and return</span></article>
        <article class="mezz"><strong>Mezzanine tranche</strong><span>Paid second · moderate risk and return</span></article>
        <article class="equity"><strong>Junior / equity tranche</strong><span>Paid last · absorbs losses first</span></article>
      </div>
      <div class="waterfall-arrows"><span>Cash payments ↓</span><span>Losses travel ↑</span><b>Credit risk concentrates at the bottom</b></div>
    </div>`;

  if (source.sourceSlide === 83) return `
    <div class="market-spectrum" role="img" aria-label="${esc(label)}">
      <article class="money"><span>Short term</span><strong>Money market</strong><p>Treasury bills<br>Certificates of deposit<br>Commercial paper</p></article>
      <article class="capital"><span>Long term</span><strong>Capital market</strong><p>Bonds<br>Common stock<br>Preferred stock</p></article>
      <article class="derivative"><span>Value-dependent claims</span><strong>Derivatives market</strong><p>Options: right to transact<br>Futures: obligation to transact</p></article>
      <div class="spectrum-axis"><b>Funding horizon</b><i></i><b>Risk transfer</b></div>
    </div>`;

  if (source.sourceSlide === 121) return `
    <div class="index-scale price-scale" role="img" aria-label="${esc(label)}">
      <div class="index-copy"><span>Mechanism</span><strong>Σ share prices ÷ divisor</strong><p>Price—not company size—sets influence in the DJIA.</p></div>
      <div class="balance"><i class="beam"></i><i class="stem"></i><div class="pan high"><b>$100</b><span>High share price</span></div><div class="pan low"><b>$10 + $10 + $10</b><span>Several low prices</span></div></div>
    </div>`;

  if (source.sourceSlide === 122) return `
    <div class="price-bias" role="img" aria-label="${esc(label)}">
      <div class="price-bar high"><span>$100</span><i></i><b>+10% = +$10</b><small>High index impact</small></div>
      <strong class="not-equal">≠</strong>
      <div class="price-bar low"><span>$10</span><i></i><b>+10% = +$1</b><small>Low index impact</small></div>
      <p>Equal returns; Stock A moves a price-weighted index 10× more.</p>
    </div>`;

  if (source.sourceSlide === 123) return `
    <div class="market-cap-logic" role="img" aria-label="${esc(label)}">
      <div class="cap-formula"><span>Mechanism</span><strong>Price × shares outstanding</strong><p>Weight = company market cap ÷ total index market cap</p></div>
      <div class="cap-treemap"><b class="apple">Apple</b><b class="microsoft">Microsoft</b><b class="amazon">Amazon</b><i></i><i></i><i></i><i></i><i></i><i></i></div>
    </div>`;

  if (source.sourceSlide === 124) return `
    <div class="market-cap-balance" role="img" aria-label="${esc(label)}">
      <article><span>Stock A</span><strong>$100</strong><p>1M shares<br><b>$100M market value</b></p></article>
      <div class="cap-beam"><i></i><b>10×</b></div>
      <article class="heavy"><span>Stock B</span><strong>$10</strong><p>100M shares<br><b>$1B market value</b></p></article>
      <aside>Stock B has ten times the influence in a market-cap-weighted index.</aside>
    </div>`;

  if (source.sourceSlide === 133) return `
    <div class="ipo-org" role="img" aria-label="${esc(label)}">
      <div class="ipo-issuer">Issuing firm</div><i aria-hidden="true">↓</i><div class="ipo-lead">Lead underwriter</div><i aria-hidden="true">↓</i>
      <div class="ipo-syndicate"><span>Underwriting syndicate</span>${['Bank A','Bank B','Bank C','Bank D'].map(bank=>`<b>${bank}</b>`).join('')}</div>
      <i aria-hidden="true">↓ allocations</i><div class="ipo-investors">Institutional + retail investors</div><small>Road show → book building → pricing → public trading</small>
    </div>`;

  if (source.sourceSlide === 147) return `
    <div class="market-mosaic" role="img" aria-label="${esc(label)}">
      ${[
        ['Equities','Fast + transparent','Exchanges and ECNs','Automation · Reg NMS · decimal pricing'],
        ['Bonds','Relationship-driven','Dealer / OTC network','Inventory · negotiation · bid–ask spread'],
        ['Derivatives','Standardized + protected','Exchange + clearinghouse','Counterparty substitution · margin · daily P/L']
      ].map(([name,tag,venue,rules],index)=>`<article class="mosaic-${index}"><span>${tag}</span><strong>${name}</strong><b>${venue}</b><p>${rules}</p><i aria-hidden="true"></i></article>`).join('')}
    </div>`;

  if (source.sourceSlide === 157) return `
    <div class="clearing-triptych" role="img" aria-label="${esc(label)}">
      <article><span>1 · Counterparty substitution</span><div class="counterparties"><b>Trader A</b><i>⇄</i><strong>Clearing<br>house</strong><i>⇄</i><b>Trader B</b></div><p>Each trader faces the clearinghouse.</p></article>
      <article><span>2 · Marking to market</span><div class="daily-mark"><b>End of day</b><i>+$</i><i>−$</i></div><p>Gains and losses move between accounts daily.</p></article>
      <article><span>3 · Margin requirements</span><div class="margin-meter"><i></i><b>Maintenance</b><strong>Margin call</strong></div><p>Collateral protects the system from default.</p></article>
    </div>`;

  if (source.sourceSlide === 162) return `
    <div class="margin-guide" role="img" aria-label="${esc(label)}">
      <article><span>Buying on margin</span><strong>Investor equity + broker loan</strong><div class="coin-stack"><i></i><i></i><i></i></div><p>Borrow part of the stock purchase price.</p></article>
      <article><span>Maintenance margin</span><strong>Minimum equity</strong><div class="margin-gauge safe"><i></i></div><p>Equity must stay above the required level.</p></article>
      <article class="call"><span>Margin call</span><strong>Deposit funds or reduce the loan</strong><div class="margin-gauge danger"><i></i></div><p>Triggered when account equity falls too far.</p></article>
    </div>`;

  if (source.sourceSlide === 168) return `
    <div class="short-selling-map" role="img" aria-label="${esc(label)}">
      <svg viewBox="0 0 1180 300" aria-hidden="true" focusable="false"><path class="short-area" d="M40 60L170 130 285 88 410 175 540 120 660 218 790 165 920 250 1110 272V285H40Z"/><path class="short-path" d="M40 60L170 130 285 88 410 175 540 120 660 218 790 165 920 250 1110 272"/><path class="risk-path" d="M765 210C820 105 905 65 1035 40"/><text x="55" y="45">Price falls</text><text x="880" y="72">If price rises, losses can be unlimited</text></svg>
      <div class="short-steps">${['Borrow shares','Sell shares','Buy back later','Return shares'].map((step,index)=>`<div><b>${index+1}</b><span>${step}</span></div>`).join('')}</div>
    </div>`;

  if (source.sourceSlide === 182) return `
    <div class="fund-family-tree" role="img" aria-label="${esc(label)}">
      <div class="tree-root">Investment companies</div>
      <div class="tree-branches">
        <article><strong>Unit investment trusts</strong><span>Fixed, unmanaged portfolio</span></article>
        <article><strong>Managed investment companies</strong><span>Open-end funds</span><span>Closed-end funds</span></article>
        <article><strong>Other pooled organizations</strong><span>Commingled funds</span><span>REITs</span><span>Hedge funds</span></article>
      </div>
    </div>`;

  if (source.sourceSlide === 191 && rebuild.data) {
    const max = Math.max(...rebuild.data.categories.flatMap(([, values]) => values.map(Math.abs)));
    return `
      <div class="etf-issuance" role="img" aria-label="${esc(label)}">
        <div class="etf-bars">
          ${rebuild.data.years.map((year,yearIndex)=>`<div class="etf-year"><span>${year}</span><div class="bar-cluster">${rebuild.data.categories.map(([category,values],categoryIndex)=>`<i class="cat-${categoryIndex}${values[yearIndex] < 0 ? ' negative' : ''}" style="--bar:${Math.max(8,Math.round(Math.abs(values[yearIndex])/max*330))}px" title="${esc(category)}: ${values[yearIndex].toLocaleString()} million"></i>`).join('')}</div><strong>${rebuild.data.totals[yearIndex] < 1000000 ? `$${(rebuild.data.totals[yearIndex]/1000).toFixed(3)}B` : `$${(rebuild.data.totals[yearIndex]/1000000).toFixed(6)}T`}</strong></div>`).join('')}
        </div>
        <div class="etf-legend">${rebuild.data.categories.map(([category],index)=>`<span class="cat-${index}">${esc(category)}</span>`).join('')}</div>
      </div>`;
  }

  if (source.sourceSlide === 193) return `
    <div class="style-box-rebuild" role="img" aria-label="${esc(label)}">
      <div class="style-matrix equity-style"><strong>Equity style box</strong><div class="axis-top"><span>Value</span><span>Blend</span><span>Growth</span></div><div class="axis-side"><span>Large</span><span>Mid</span><span>Small</span></div><div class="nine-box">${Array.from({length:9},(_,i)=>`<i class="${i===0?'active':''}"></i>`).join('')}</div></div>
      <div class="style-matrix bond-style"><strong>Fixed-income style box</strong><div class="axis-top"><span>Short</span><span>Medium</span><span>Long</span></div><div class="axis-side"><span>High</span><span>Medium</span><span>Low</span></div><div class="nine-box">${Array.from({length:9},(_,i)=>`<i class="${i===4?'active':''}"></i>`).join('')}</div></div>
      <div class="style-uses"><b>Use the boxes to</b><span>Assess diversification</span><span>Compare funds</span><span>Monitor style drift</span><small>Classification—not a return forecast</small></div>
    </div>`;

  return '';
};

const renderRebuild = (source, rebuild) => {
  const title = rebuild.title || displayTitle(source);
  if (rebuild.layout === 'quote-focus') return `
    <div class="quote-focus-shell">
      <div class="quote-focus-mark" aria-hidden="true">“</div>
      <blockquote>
        <h2>Tell me and I forget.<br>Teach me and I may remember.<br><strong>Involve me and I learn.</strong></h2>
        <footer>Often attributed to <b>Benjamin Franklin</b></footer>
      </blockquote>
      <div class="quote-focus-rings" aria-hidden="true"><i></i><i></i><i></i></div>
    </div>`;
  if (rebuild.layout === 'close') return `
    <div class="gradient-bar"></div>
    <p class="eyebrow">BUS331 · Investments</p>
    <h2>${esc(title)}</h2>
    ${renderFlow(rebuild.items, `${title}: ${rebuild.items.join('; ')}`)}
    <div class="course-mark"><span>331</span><small>INVESTMENTS</small></div>`;
  if (rebuild.layout === 'prompt') return `
    <p class="eyebrow">${esc(source.module)} · Discussion</p>
    <h2>${esc(title)}</h2>
    ${renderCards(rebuild.items, 'intro-prompt-grid')}`;
  if (['current-events-source', 'investment-question-source', 'handbag-fund-source'].includes(rebuild.layout)) {
    return renderSourceInspiredGraphic(source, rebuild);
  }
  const sourceGraphic = renderSourceInspiredGraphic(source, rebuild);
  if (sourceGraphic) return `${header(source, title)}${sourceGraphic}${sourceCredit(source)}`;
  const body = rebuild.layout === 'flow' ? renderFlow(rebuild.items, `${title}: ${rebuild.items.join('; ')}`)
    : rebuild.layout === 'timeline' ? renderTimeline(rebuild.items, `${title}: ${rebuild.items.join('; ')}`)
      : rebuild.layout === 'comparison' ? renderComparison(rebuild.items, `${title}: ${rebuild.items.flat().join('; ')}`)
        : rebuild.layout === 'formula' ? `
          <div class="intro-formula" role="img" aria-label="${esc(rebuild.formula)}"><strong>${esc(rebuild.formula)}</strong></div>
          ${renderConceptField(rebuild.items, title, source.sourceSlide)}`
          : rebuild.layout === 'steps' ? renderCards(rebuild.items, 'intro-steps', { numbered: true })
            : renderConceptField(rebuild.items, title, source.sourceSlide);
  return `${header(source, title)}${body}${sourceCredit(source)}`;
};

const baseNote = (source, extra = '') => {
  const original = source.speakerNote ? `Original speaker note: ${source.speakerNote}` : '';
  const archivedText = (marketUpdates[source.sourceSlide] || [6, 10, 44, 49, 50, 75, 163].includes(source.sourceSlide))
    ? `Original source text retained for review: ${source.textBlocks.join(' | ')}`
    : '';
  const archivedTables = visualRebuilds[source.sourceSlide] && source.tables.length
    ? `Original source table retained for review: ${source.tables.map((table) => table.rows.map((row) => row.join(' | ')).join(' / ')).join(' // ')}`
    : '';
  const visual = source.sourceVisualHeld
    ? 'The original licensed or vendor screen capture is held for instructor review and is not embedded in the student deck.'
    : '';
  return [extra, original, archivedText, archivedTables, visual].filter(Boolean).join('\n\n');
};

const createSourceSlides = (source) => {
  const update = marketUpdates[source.sourceSlide];
  if (update) {
    return [{
      label: update.title,
      sourceSlides: String(source.sourceSlide),
      classes: 'cream content-slide market-slide',
      body: renderMarketUpdate(source, update),
      note: baseNote(source, `${update.note} Added current-data snapshot uses the official links shown on the slide.`),
      treatment: 'data-led',
      action: 'current-data rebuild'
    }];
  }

  const rebuild = visualRebuilds[source.sourceSlide];
  if (rebuild) {
    const rebuildSlides = rebuild.slides || [rebuild];
    return rebuildSlides.map((rebuildSlide) => {
      const dark = ['close', 'prompt', 'quote-focus', 'current-events-source', 'investment-question-source', 'handbag-fund-source'].includes(rebuildSlide.layout);
      const darkClass = rebuildSlide.layout === 'close' ? 'close-slide'
        : rebuildSlide.layout === 'quote-focus' ? 'quote-focus-slide'
          : rebuildSlide.layout === 'current-events-source' ? 'source-events-slide'
            : rebuildSlide.layout === 'investment-question-source' ? 'investment-question-slide'
              : rebuildSlide.layout === 'handbag-fund-source' ? 'handbag-fund-slide'
                : 'activity-slide';
      return {
        label: rebuildSlide.title || displayTitle(source),
        sourceSlides: String(source.sourceSlide),
        classes: dark ? `dark ${darkClass}`
          : 'cream content-slide intro-visual-slide',
        body: renderRebuild(source, rebuildSlide),
        note: rebuildSlide.omitDeckSourceNote
          ? (rebuildSlide.note || '')
          : baseNote(source, rebuildSlide.note || 'Instructional graphic rebuilt as editable HTML; source sequence and substantive content retained.'),
        treatment: rebuildSlide.layout === 'formula' ? 'data-led'
          : ['source-books', 'current-events-source', 'investment-question-source', 'handbag-fund-source'].includes(rebuildSlide.layout) ? 'image-led'
            : 'HTML/SVG-led',
        action: rebuildSlides.length > 1 ? 'split interpretive rebuild' : 'interpretive rebuild'
      };
    });
  }

  if (source.kind === 'section') {
    return [{
      label: displayTitle(source),
      sourceSlides: String(source.sourceSlide),
      classes: 'dark section',
      body: `<div class="gradient-bar"></div><p class="eyebrow">${esc(source.module)} · BUS331 Investments</p><h2>${esc(displayTitle(source))}</h2>${sourcePoints(source).slice(0, 2).map((point) => `<p>${esc(point)}</p>`).join('')}`,
      note: baseNote(source),
      treatment: 'sparse text',
      action: 'rebuild'
    }];
  }

  if (source.tables.length) {
    return source.tables.map((table, index) => ({
      label: displayTitle(source),
      sourceSlides: String(source.sourceSlide),
      classes: 'cream content-slide data-slide',
      body: `${header(source, displayTitle(source), source.tables.length > 1 ? `Source table ${index + 1} of ${source.tables.length}` : '')}${renderTable(source, table, index)}${sourceCredit(source)}`,
      note: baseNote(source, 'Source table rebuilt as semantic editable HTML.'),
      treatment: 'data-led',
      action: 'table rebuild'
    }));
  }

  const points = sourcePoints(source);
  const values = points.length ? points : [
    `The source visual for slide ${source.sourceSlide} is preserved in the inventory.`,
    'Its instructional role is reconstructed here without embedding the original raster capture.'
  ];
  const maxItems = values.some((item) => item.length > 170) ? 4 : 6;
  const chunks = [];
  for (let index = 0; index < values.length; index += maxItems) chunks.push(values.slice(index, index + maxItems));
  return chunks.map((chunk, index) => {
    const suffix = chunks.length > 1 ? ` · ${index + 1}/${chunks.length}` : '';
    const activity = source.kind === 'activity';
    return {
      label: `${displayTitle(source)}${suffix}`,
      sourceSlides: String(source.sourceSlide),
      classes: activity ? 'dark activity-slide source-activity-slide' : 'cream content-slide intro-concept-slide',
      body: activity
        ? `<h2>${esc(displayTitle(source))}</h2>${renderCards(chunk, 'intro-prompt-grid')}`
        : `${header(source, `${displayTitle(source)}${suffix}`)}${renderConceptField(chunk, `${displayTitle(source)}${suffix}`, source.sourceSlide + index)}${sourceCredit(source)}`,
      note: baseNote(source, chunks.length > 1 ? `Source slide split into ${chunks.length} HTML slides to preserve all text above the 24px floor.` : ''),
      treatment: source.treatment,
      action: chunks.length > 1 ? 'split and rebuild' : 'rebuild'
    };
  });
};

const renderLessonBreak = (meta, division, imageLed) => {
  const copy = `<div class="lesson-copy"><div class="gradient-bar"></div><p class="eyebrow">Suggested 75-minute class</p><h2>${esc(division.label)}</h2><p>${esc(meta.title)}</p></div>`;
  if (imageLed) return `<div class="lesson-break-grid">${copy}<figure class="lesson-hero"><img src="${esc(meta.heroImage)}" alt="${esc(meta.heroAlt)}"></figure></div>`;
  return `<div class="lesson-break-grid lesson-break-graphic">${copy}<div class="lesson-signal" aria-hidden="true">
    <svg viewBox="0 0 700 520" aria-hidden="true" focusable="false">
      <path class="signal-axis" d="M70 440H640M90 460V70"/>
      <path class="signal-area" d="M90 390C160 360 180 290 250 315S360 230 420 250 525 135 625 105V440H90Z"/>
      <path class="signal-line" d="M90 390C160 360 180 290 250 315S360 230 420 250 525 135 625 105"/>
      <circle cx="250" cy="315" r="14"/><circle cx="420" cy="250" r="14"/><circle cx="625" cy="105" r="14"/>
    </svg>
  </div></div>`;
};

const buildDeck = (moduleId) => {
  const meta = modules[moduleId];
  const sourceSlides = bus331IntroSource.slides.filter((source) => source.module === moduleId);
  const divisionMap = new Map(meta.divisions.map((division) => [division.source, division]));
  const slides = [];
  for (const source of sourceSlides) {
    if (source.held) continue;
    const division = divisionMap.get(source.sourceSlide);
    if (division) {
      const imageLed = division.source === meta.divisions[0].source;
      slides.push({
        label: division.label,
        sourceSlides: String(source.sourceSlide),
        classes: `dark section lesson-break ${imageLed ? 'image-led' : 'graphic-led'}`,
        body: renderLessonBreak(meta, division, imageLed),
        note: `Instructor-added navigation break. This is not original source content. Suggested duration: ${division.minutes} minutes.${imageLed ? ' Original AI-generated chapter illustration added July 23, 2026; it contains no source data.' : ''}`,
        treatment: imageLed ? 'image-led' : 'HTML/SVG-led',
        action: 'instructional addition',
        added: true
      });
    }
    slides.push(...createSourceSlides(source));
  }
  return { ...meta, sourceFile: bus331IntroSource.sourceFile, sourceSlideCount: sourceSlides.length, slides };
};

export const bus331IntroDecks = Object.fromEntries(Object.keys(modules).map((moduleId) => [moduleId, buildDeck(moduleId)]));
export const bus331IntroMetadata = {
  sourceFile: bus331IntroSource.sourceFile,
  sourceSlideCount: bus331IntroSource.sourceSlideCount,
  modules,
  officialSources,
  heldSlides: bus331IntroSource.slides.filter((source) => source.held),
  licensedVisualSlides: bus331IntroSource.slides.filter((source) => source.sourceVisualHeld).map((source) => source.sourceSlide)
};

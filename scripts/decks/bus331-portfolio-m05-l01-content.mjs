const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

const header = (eyebrow, title, subtitle = '') => `
  <div class="header-row">
    <div>
      <p class="eyebrow">${esc(eyebrow)}</p>
      <h2>${title}</h2>
      ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}
    </div>
  </div>
  <div class="rule"></div>`;

const card = (title, body, tone = '') => `
  <article class="card ${tone}">
    <h3>${title}</h3>
    <div>${body}</div>
  </article>`;

const formula = (expression, label = '') => `
  <div class="formula-box">
    ${label ? `<span>${label}</span>` : ''}
    <strong>${expression}</strong>
  </div>`;

const slide = (label, sourceSlides, classes, body, note, treatment = 'HTML/SVG-led', action = 'rebuild') => ({
  label, slides: sourceSlides, classes, body, note, treatment, action
});

export const chapter5Deck = {
  id: 'portfolio-m05-l01',
  title: 'Risk, Return and the Historical Record',
  sourceFile: 'BUS331 Chapter 5.pptx',
  sourceSlideCount: 55,
  recommendedSections: [
    { label: 'Return measurement', sourceSlides: '1-13' },
    { label: 'Real rates and inflation', sourceSlides: '14-24' },
    { label: 'Expected return and statistical risk', sourceSlides: '25-39' },
    { label: 'Tail risk and historical evidence', sourceSlides: '40-55' }
  ],
  heldSourceSlides: [
    {
      slide: 30,
      title: 'Scenario-analysis spreadsheet answer key',
      reason: 'Completed student activity values are held from the public pilot pending instructor approval.'
    }
  ],
  slides: [
    slide('Chapter 5', '1', 'dark title-slide', `
      <div class="gradient-bar"></div>
      <p class="eyebrow">BUS331 · Investments</p>
      <h1>Measuring market reality</h1>
      <p class="title-subtitle">Risk, return and performance analysis</p>
      <div class="title-mark" aria-hidden="true"><span>μ</span><span>σ</span><span>R</span></div>
    `, 'Open by asking: “When an investment earns 10%, what else must you know before judging it?”', 'sparse text'),

    slide('The vocabulary of return', '2', 'cream content-slide', `
      ${header('Return language', 'Different return measures answer different questions')}
      <div class="term-flow" role="img" aria-label="Return measures progress from holding-period return to annualized and continuously compounded rates">
        <div><b>HPR</b><span>What did I earn over the full holding period?</span></div>
        <i aria-hidden="true">→</i>
        <div><b>APR</b><span>What simple annual rate is being quoted?</span></div>
        <i aria-hidden="true">→</i>
        <div><b>EAR</b><span>What annual rate includes compounding?</span></div>
        <i aria-hidden="true">→</i>
        <div><b>r<sub>cc</sub></b><span>What continuous rate produces the same growth?</span></div>
      </div>
    `, 'Define each measure only at a high level. The calculation sequence follows.', 'HTML/SVG-led'),

    slide('The vocabulary of risk', '2', 'cream content-slide', `
      ${header('Risk language', 'Risk has a center, a spread and a shape')}
      <div class="risk-language" role="img" aria-label="Risk measures grouped into center, spread, shape, downside, and reward per unit of risk">
        <div class="risk-hub"><strong>Return distribution</strong><span>What outcomes are possible?</span></div>
        <div class="risk-node center"><b>Center</b><span>Mean return</span></div>
        <div class="risk-node spread"><b>Spread</b><span>Variance · standard deviation</span></div>
        <div class="risk-node shape"><b>Shape</b><span>Skew · kurtosis · tail risk</span></div>
        <div class="risk-node downside"><b>Downside</b><span>VaR · expected shortfall · LPSD</span></div>
        <div class="risk-node reward"><b>Efficiency</b><span>Risk premium · Sharpe ratio</span></div>
      </div>
    `, 'Use this as a map. Students will return to each family of measures later in the chapter.', 'HTML/SVG-led'),

    slide('Why measurement matters', '3', 'cream content-slide', `
      ${header('Investment judgment', 'A return number becomes useful only when it is comparable')}
      <div class="reason-path" role="img" aria-label="Four reasons return measurement matters: performance evaluation, risk adjustment, time value, and portfolio decisions">
        <div><span>01</span><strong>Evaluate performance</strong><p>Standard metrics let us compare opportunities consistently.</p></div>
        <div><span>02</span><strong>Adjust for risk</strong><p>Profitability alone does not reveal how much uncertainty was accepted.</p></div>
        <div><span>03</span><strong>Respect time</strong><p>A 20% gain over six months is not the same as 20% over five years.</p></div>
        <div><span>04</span><strong>Allocate capital</strong><p>Portfolio choices depend on comparable returns across assets.</p></div>
      </div>
      <p class="insight">Choose the measure that matches the decision—not the measure that produces the largest number.</p>
    `, 'Invite students to give an example of two investments that cannot be compared using raw percentage gain alone.'),

    slide('Four lenses on one investment', '4', 'cream content-slide', `
      ${header('One scenario · four lenses', 'A $10,000 investment grows to $12,500 and pays $300 over 18 months')}
      <div class="metric-ribbon">
        <div><span>HPR</span><strong>28.00%</strong><small>Total holding-period gain</small></div>
        <div><span>EAR</span><strong>17.89%</strong><small>True annualized growth</small></div>
        <div><span>APR</span><strong>16.57%</strong><small>Monthly periodic rate × 12</small></div>
        <div><span>Continuous</span><strong>16.46%</strong><small>Equivalent log return</small></div>
      </div>
      <div class="cash-bridge" role="img" aria-label="Beginning value 10000 plus capital gain 2500 plus income 300 equals ending wealth 12800">
        <div><b>$10,000</b><span>beginning value</span></div><i>+</i>
        <div><b>$2,500</b><span>capital gain</span></div><i>+</i>
        <div><b>$300</b><span>income</span></div><i>=</i>
        <div class="result"><b>$12,800</b><span>ending wealth</span></div>
      </div>
    `, 'Keep the cash-flow base consistent across the four calculations. Values are independently checked.'),

    slide('Match the method to the decision', '5', 'cream content-slide', `
      ${header('Industry practice', 'Each return measure has a natural job')}
      <div class="method-grid">
        ${card('HPR', '<p>Individual securities, portfolio evaluation and any clearly defined holding period.</p>', 'gold')}
        ${card('APR', '<p>Quoted lending rates, consumer disclosures and periodic-rate comparisons.</p>', 'steel')}
        ${card('EAR', '<p>Savings, bonds and investment products when compounding must be reflected.</p>', 'teal')}
        ${card('Continuous return', '<p>Derivatives, statistical models and time-additive return analysis.</p>', 'terra')}
      </div>
      <p class="insight">Best practice: match the convention, horizon and compounding assumption before comparing alternatives.</p>
    `, 'Preserve the source applications. Later slides show the calculations.', 'HTML/SVG-led'),

    slide('HPR captures price change and income', '6', 'cream formula-slide', `
      ${header('Holding-period return', 'HPR measures the full payoff over the period you actually held the asset')}
      ${formula('HPR = (P₁ − P₀ + Income) ÷ P₀', 'Total return')}
      <div class="two-card">
        ${card('What it captures', '<p>Capital appreciation plus dividends, interest or other distributions.</p>')}
        ${card('What it does not solve', '<p>It does not annualize the result or make different horizons directly comparable.</p>')}
      </div>
    `, 'Use P₀ for beginning price and P₁ for ending price. Connect income to dividends or coupon interest.'),

    slide('Return calculation activity', '7', 'dark activity-slide', `
      <p class="eyebrow">Excel activity</p>
      <h2>Calculate the same investment four ways</h2>
      <div class="activity-instructions">
        <div><b>1</b><span>Open the Chapter 5 return-calculation workbook in Canvas.</span></div>
        <div><b>2</b><span>Calculate HPR, EAR, APR and the continuously compounded rate.</span></div>
        <div><b>3</b><span>Explain why the four percentages differ even though the investment is identical.</span></div>
      </div>
    `, 'The source deck directs students to Canvas / Class Activities / Return Calculation Exercise.', 'sparse text'),

    slide('Build HPR from cash flows', '8', 'cream formula-slide', `
      ${header('Worked example', 'The investor earned $2,800 on a $10,000 beginning value')}
      <div class="calculation-stack">
        <div><span>Capital appreciation</span><b>$12,500 − $10,000 = $2,500</b></div>
        <div><span>Income</span><b>$300</b></div>
        <div><span>Total dollar return</span><b>$2,500 + $300 = $2,800</b></div>
      </div>
      ${formula('$2,800 ÷ $10,000 = 0.28 = 28.00%', 'Holding-period return')}
    `, 'Ask students to distinguish the capital-gain component (25%) from income yield (3%).', 'data-led'),

    slide('APR and EAR are not interchangeable', '9', 'cream content-slide', `
      ${header('Annualization', 'APR reports a periodic rate; EAR reports actual annual growth')}
      <div class="compounding-path" role="img" aria-label="Periodic monthly rate is multiplied to produce APR and compounded to produce EAR">
        <div class="source"><small>Monthly rate</small><strong>1.3809%</strong></div>
        <div class="branch"><span>× 12</span><i aria-hidden="true">→</i><b>APR 16.57%</b></div>
        <div class="branch"><span>(1 + r)¹² − 1</span><i aria-hidden="true">→</i><b>EAR 17.89%</b></div>
      </div>
      <p class="insight">EAR exceeds APR when compounding occurs more than once per year.</p>
    `, 'The 18-month HPR first implies a monthly effective rate; APR and EAR then annualize it differently.', 'HTML/SVG-led'),

    slide('Continuous compounding is the log-return lens', '10', 'cream formula-slide', `
      ${header('Continuous return', 'Log returns convert compounded growth into a time-additive rate')}
      <div class="two-col">
        <div>
          ${formula('r<sub>cc</sub> = ln(1 + HPR) ÷ t', 'Equivalent continuous rate')}
          ${formula('ln(1.28) ÷ 1.5 = 16.46%', '18-month scenario')}
        </div>
        <div class="growth-curve" role="img" aria-label="Continuous growth curve rises smoothly from beginning wealth to ending wealth">
          <svg viewBox="0 0 700 470" role="img" aria-label="Smooth exponential growth from 10000 to 12800 over 18 months">
            <path class="axis" d="M80 50V400H650" />
            <path class="curve" d="M90 360 C250 345 360 270 470 190 C560 125 605 85 640 65" />
            <circle cx="90" cy="360" r="12"/><circle cx="640" cy="65" r="12"/>
            <text x="90" y="430">Today: $10,000</text><text x="505" y="45">18 months: $12,800</text>
          </svg>
        </div>
      </div>
    `, 'Continuous returns are useful because log returns can be added across time. Preserve the source distinction from EAR.'),

    slide('One scenario, four correct answers', '11', 'cream data-slide', `
      ${header('Comparison', 'The right answer depends on the question')}
      <table class="finance-table">
        <thead><tr><th>Measure</th><th>Calculation</th><th>Result</th><th>Use</th></tr></thead>
        <tbody>
          <tr><td>HPR</td><td>(12,500 − 10,000 + 300) ÷ 10,000</td><td>28.00%</td><td>Total 18-month performance</td></tr>
          <tr><td>EAR</td><td>(1.28)<sup>1/1.5</sup> − 1</td><td>17.89%</td><td>Annual compounded comparison</td></tr>
          <tr><td>APR</td><td>[(1.28)<sup>1/18</sup> − 1] × 12</td><td>16.57%</td><td>Annual quoted rate</td></tr>
          <tr><td>Continuous</td><td>ln(1.28) ÷ 1.5</td><td>16.46%</td><td>Log-return modeling</td></tr>
        </tbody>
      </table>
    `, 'Calculations were independently checked against the source values.', 'data-led'),

    slide('Try the return conversion', '12', 'dark activity-slide', `
      <p class="eyebrow">Partner calculation</p>
      <h2>Rebuild all four measures in Excel</h2>
      <div class="prompt-grid">
        <div><small>Beginning price</small><strong>$10,000</strong></div>
        <div><small>Ending price</small><strong>$12,500</strong></div>
        <div><small>Income</small><strong>$300</strong></div>
        <div><small>Horizon</small><strong>1.5 years</strong></div>
      </div>
      <p class="activity-question">Which cell should contain the periodic rate before you calculate APR?</p>
    `, 'Let students build the formulas before showing the debrief. The original slide displays a worksheet prompt.', 'data-led'),

    slide('Return conversion debrief', '13', 'cream data-slide', `
      ${header('Answer reveal', 'The formulas should preserve the same economic growth')}
      <div class="excel-formulas">
        <div><span>HPR</span><code>=(Ending-Beginning+Income)/Beginning</code><b>28.00%</b></div>
        <div><span>EAR</span><code>=(1+HPR)^(1/Years)-1</code><b>17.89%</b></div>
        <div><span>APR</span><code>=((1+HPR)^(1/Months)-1)*12</code><b>16.57%</b></div>
        <div><span>Continuous</span><code>=LN(1+HPR)/Years</code><b>16.46%</b></div>
      </div>
    `, 'This is a student-facing worked reveal corresponding to the source solution screenshot.', 'data-led'),

    slide('Real rates and inflation', '14', 'dark section', `
      <div class="gradient-bar"></div>
      <p class="eyebrow">Section 02</p>
      <h2>Returns must be measured in purchasing power</h2>
      <p>Nominal growth tells you how many dollars you have. Real growth tells you what those dollars can buy.</p>
    `, 'Transition from return conventions to the economic forces that determine required returns.', 'sparse text'),

    slide('The cost of money balances competing demands', '14', 'cream content-slide', `
      ${header('Interest-rate fundamentals', 'Market rates emerge where the supply and demand for funds meet')}
      <div class="funds-system" role="img" aria-label="Household saving supplies funds while business and government borrowing demand funds, with Federal Reserve policy influencing conditions">
        <div class="supply"><b>Household saving</b><span>Primary supply of funds</span></div>
        <i aria-hidden="true">→</i>
        <div class="market"><b>Cost of money</b><span>Equilibrium interest rate</span></div>
        <i aria-hidden="true">←</i>
        <div class="demand"><b>Business + government</b><span>Demand for investment and financing</span></div>
        <div class="policy"><b>Federal Reserve</b><span>Policy changes financial conditions</span></div>
      </div>
    `, 'Preserve the source factors: household saving, business investment demand, government net demand, and Federal Reserve actions.'),

    slide('Nominal and real rates answer different questions', '15', 'cream formula-slide', `
      ${header('Money versus purchasing power', 'Inflation separates the stated rate from the economic gain')}
      <div class="rate-compare">
        <div class="nominal"><small>Nominal rate</small><strong>Growth of money</strong><p>The rate quoted by banks and on bonds.</p></div>
        <div class="minus" aria-hidden="true">−</div>
        <div class="inflation"><small>Inflation</small><strong>Loss of purchasing power</strong><p>The rate at which the price level rises.</p></div>
        <div class="equals" aria-hidden="true">≈</div>
        <div class="real"><small>Real rate</small><strong>Growth of purchasing power</strong><p>The investor’s approximate economic gain.</p></div>
      </div>
      ${formula('Real rate ≈ Nominal rate − Inflation', 'Quick approximation')}
    `, 'Positive real rates indicate growth beyond inflation; negative real rates indicate purchasing-power loss.'),

    slide('The inflation reality check', '16', 'cream formula-slide', `
      ${header('A 5.5% account may grow purchasing power by only 2.23%', 'The exact Fisher relationship compounds both the real rate and inflation')}
      <div class="rate-equation">
        <div><small>Nominal growth</small><strong>5.50%</strong></div>
        <div><small>Inflation</small><strong>3.20%</strong></div>
        <div class="result"><small>Exact real growth</small><strong>2.23%</strong></div>
      </div>
      ${formula('(1 + 0.055) ÷ (1 + 0.032) − 1 = 2.23%', 'Exact real rate')}
    `, 'Contrast the 2.30% approximation with the 2.23% exact calculation.', 'data-led'),

    slide('Supply and demand set the price of funds', '17', 'cream chart-slide', `
      ${header('Cost of money', 'The equilibrium rate balances funds supplied with funds demanded')}
      <svg class="supply-demand" viewBox="0 0 1200 620" role="img" aria-label="Upward-sloping supply of funds and downward-sloping demand for funds intersect at the equilibrium real interest rate">
        <path class="axis" d="M120 70V540H1110"/><path class="supply-line" d="M190 480L1010 120"/><path class="demand-line" d="M190 130L1010 490"/>
        <line class="guide" x1="600" y1="300" x2="600" y2="540"/><line class="guide" x1="120" y1="300" x2="600" y2="300"/>
        <circle class="equilibrium" cx="600" cy="300" r="18"/>
        <text x="835" y="150">Supply of funds</text><text x="835" y="500">Demand for funds</text>
        <text x="475" y="585">Quantity of funds</text><text transform="translate(55 390) rotate(-90)">Real interest rate</text>
        <text x="625" y="285">Equilibrium</text>
      </svg>
    `, 'A nominal rate is the growth rate of money; a real rate is the growth rate of purchasing power.'),

    slide('Money growth can mask purchasing-power loss', '18', 'cream content-slide', `
      ${header('Monetary illusion', 'A positive account balance does not guarantee a positive real return')}
      <div class="purchasing-power" role="img" aria-label="Nominal balance rises while purchasing power falls when inflation exceeds the nominal return">
        <div class="wallet"><small>Bank balance</small><strong>↑ 2%</strong><span>More dollars</span></div>
        <div class="basket"><small>Price level</small><strong>↑ 3%</strong><span>Goods cost more</span></div>
        <div class="power"><small>Purchasing power</small><strong>≈ −1%</strong><span>Real wealth falls</span></div>
      </div>
    `, 'Ask which measure matters more to a retiree funding living expenses.'),

    slide('The Fisher equation links nominal, real and inflation rates', '19', 'cream formula-slide', `
      ${header('Exact relationship', 'Nominal returns combine real compensation with expected inflation')}
      ${formula('1 + i = (1 + r)(1 + π)', 'Fisher equation')}
      <div class="fisher-steps">
        <div><span>Exact real rate</span><code>r = (1 + i) ÷ (1 + π) − 1</code></div>
        <div><span>Approximation</span><code>r ≈ i − π</code></div>
        <div><span>Interpretation</span><code>i ≈ r + π</code></div>
      </div>
    `, 'Use i for the nominal rate, r for the real rate and π for inflation.'),

    slide('The July 2026 rate backdrop is still restrictive', '20', 'cream data-slide', `
      ${header('Current market snapshot', 'Policy rates and real yields remain positive as inflation stays above the 2% objective')}
      <div class="snapshot-grid">
        <div><span>Federal funds target</span><strong>3.50–3.75%</strong><small>June 17, 2026 FOMC decision</small></div>
        <div><span>10-year real Treasury yield</span><strong>2.35%</strong><small>July 20, 2026 TIPS curve</small></div>
        <div><span>Inflation objective</span><strong>2%</strong><small>Longer-run FOMC objective</small></div>
      </div>
      <p class="source-note">Sources: Federal Reserve Board (June 17, 2026) · U.S. Treasury daily par real yield curve (July 20, 2026)</p>
    `, 'This updates the source slide’s 2024–2025 snapshot. Recheck before the Fall 2026 class because rates are time-sensitive.', 'data-led', 'update'),

    slide('Real rates move with inflation, policy and crises', '21', 'cream chart-slide', `
      ${header('Historical context', 'The rate regime changes the opportunity set for every asset class')}
      <div class="era-line" role="img" aria-label="Timeline from high real rates in the 1980s through declining rates, post-crisis lows, and positive real yields in 2026">
        <div><time>1980s</time><b>8%+ peaks</b><span>Volcker-era inflation control</span></div>
        <div><time>2000s</time><b>2–3% range</b><span>Long decline in real yields</span></div>
        <div><time>2010s</time><b>Near zero</b><span>Post-crisis accommodation</span></div>
        <div><time>2026</time><b>Positive again</b><span>Inflation and policy repricing</span></div>
      </div>
    `, 'Treat the percentages as broad era markers from the source, not a continuous data series.'),

    slide('Inflation compounds quietly', '22', 'cream data-slide', `
      ${header('Real-world impact', 'A small negative real return becomes a large purchasing-power loss over time')}
      <div class="loss-display"><strong>−9.3%</strong><span>Exact five-year purchasing-power change when 2% nominal return trails 4% inflation</span></div>
      <div class="scenario-compare">
        ${card('Treasury scenario', '<p><b>4.5% nominal − 3% inflation ≈ 1.5% real.</b><br>Purchasing power grows modestly.</p>', 'teal')}
        ${card('Savings scenario', '<p><b>2% nominal − 3% inflation ≈ −1% real.</b><br>The balance grows while real wealth falls.</p>', 'terra')}
      </div>
    `, 'The source slide displays −22%. Exact compounding gives (1.02 ÷ 1.04)^5 − 1 = −9.3%, so the verified result is shown while the source value remains documented here for instructor review.', 'data-led', 'rebuild-and-flag'),

    slide('Real-rate changes transmit differently across assets', '23', 'cream content-slide', `
      ${header('Portfolio implications', 'The same rate shock changes bond prices and equity valuations through different channels')}
      <div class="transmission" role="img" aria-label="A real rate increase flows to bond price declines and higher equity discount rates">
        <div class="shock"><small>Shock</small><strong>Real rates rise</strong></div>
        <div class="arrow" aria-hidden="true">↙</div><div class="arrow" aria-hidden="true">↘</div>
        <div class="bond"><b>Bonds</b><span>Existing prices fall · duration amplifies sensitivity · TIPS and ladders manage different risks</span></div>
        <div class="equity"><b>Equities</b><span>Discount rates rise · long-duration growth cash flows become less valuable · sector effects differ</span></div>
      </div>
    `, 'Avoid presenting sector rotation as automatic. Frame these as directional channels, not guaranteed trades.'),

    slide('Separate money returns from real wealth', '24', 'cream content-slide', `
      ${header('Decision framework', 'Use the Fisher lens before judging a portfolio return')}
      <div class="decision-sequence">
        <div><span>1</span><b>Observe the nominal return</b></div>
        <i>→</i><div><span>2</span><b>Estimate inflation</b></div>
        <i>→</i><div><span>3</span><b>Calculate real return</b></div>
        <i>→</i><div><span>4</span><b>Evaluate asset sensitivity</b></div>
      </div>
      <p class="insight">Portfolio construction starts with the return that survives inflation—not the largest quoted yield.</p>
    `, 'Preserve the source emphasis on real returns, inflation risk, duration risk and policy shifts.'),

    slide('Expected return and statistical risk', '25', 'dark section', `
      <div class="gradient-bar"></div>
      <p class="eyebrow">Section 03</p>
      <h2>Risk is a distribution of possible outcomes</h2>
      <p>Expected return describes the center. Variance and standard deviation describe the spread.</p>
    `, 'Transition to scenario analysis and probability distributions.', 'sparse text'),

    slide('Risk measures turn uncertainty into comparable quantities', '26', 'cream content-slide', `
      ${header('Key terms', 'Each statistic answers one part of the risk question')}
      <div class="definition-ladder">
        <div><b>Expected return</b><span>Probability-weighted mean HPR</span></div>
        <div><b>Variance</b><span>Probability-weighted squared distance from the mean</span></div>
        <div><b>Standard deviation</b><span>Square root of variance, in return units</span></div>
        <div><b>Risk-free rate</b><span>Return treated as certain for the horizon, commonly a T-bill proxy</span></div>
        <div><b>Risk premium</b><span>Expected HPR minus the risk-free rate</span></div>
        <div><b>Excess return</b><span>Actual return minus the risk-free rate</span></div>
      </div>
    `, 'Risk aversion influences how much investors allocate to risky assets; Chapter 6 develops that decision.'),

    slide('The risk premium is compensation for uncertainty', '27', 'cream formula-slide', `
      ${header('Price of uncertainty', 'Investors demand expected return above the risk-free alternative')}
      <div class="return-stack" role="img" aria-label="Expected return is composed of the risk-free rate plus the risk premium">
        <div class="safe"><span>Risk-free rate</span><strong>Time value of money</strong></div>
        <div class="premium"><span>Risk premium</span><strong>Compensation for uncertainty</strong></div>
      </div>
      ${formula('Risk premium = E(r) − r<sub>f</sub>', 'Expected compensation')}
      ${formula('Excess return = r<sub>actual</sub> − r<sub>f</sub>', 'Realized outcome')}
    `, 'Returns compensate investors for waiting and for bearing risk.'),

    slide('Scenario analysis connects economic states to returns', '28', 'cream content-slide', `
      ${header('Probability distribution of HPR', 'Portfolio risk comes from economy-wide, industry and firm-specific surprises')}
      <div class="uncertainty-map" role="img" aria-label="Macroeconomic, industry, and firm-specific surprises feed scenario returns and a probability distribution">
        <div><b>Macroeconomy</b><span>Growth · inflation · rates</span></div>
        <div><b>Industry</b><span>Competition · regulation · demand</span></div>
        <div><b>Firm</b><span>Execution · products · financing</span></div>
        <i>→</i>
        <div class="distribution"><b>Scenario HPRs</b><span>Outcomes + probabilities</span></div>
      </div>
    `, 'A scenario table makes the distribution explicit before statistics are calculated.'),

    slide('Build the scenario model', '29', 'dark activity-slide', `
      <p class="eyebrow">Spreadsheet activity</p>
      <h2>Translate four economic states into a return distribution</h2>
      <div class="activity-instructions">
        <div><b>1</b><span>Calculate HPR in each state.</span></div>
        <div><b>2</b><span>Compute expected HPR, variance and standard deviation.</span></div>
        <div><b>3</b><span>Calculate risk premium, SD of excess return and Sharpe ratio.</span></div>
      </div>
      <p class="activity-question">Check that scenario probabilities sum to 100% before calculating the mean.</p>
    `, 'The completed source answer key is intentionally held from the public pilot pending instructor approval.', 'data-led'),

    slide('Concept check: price a risky bond outcome', '31', 'cream activity-slide light', `
      ${header('Concept Check 5.3', 'A $27,000 investment buys bonds at $900 per $1,000 of par')}
      <div class="bond-prompt">
        <div><small>Coupon</small><strong>$75</strong><span>per $1,000 par</span></div>
        <div><small>Risk-free alternative</small><strong>5%</strong><span>T-bill yield</span></div>
        <div><small>Unknown</small><strong>P₁</strong><span>depends on rates</span></div>
      </div>
      <p class="question">Calculate each HPR, expected return, risk premium and expected year-end dollar value.</p>
    `, 'Students should first determine that $27,000 ÷ $900 = 30 bonds.', 'data-led'),

    slide('Bond scenario debrief', '32', 'cream data-slide', `
      ${header('Concept Check 5.3', 'The probability-weighted portfolio value is $29,940')}
      <table class="finance-table compact">
        <thead><tr><th>Rate state</th><th>Probability</th><th>Year-end price</th><th>HPR</th><th>Year-end value</th></tr></thead>
        <tbody>
          <tr><td>Higher</td><td>20%</td><td>$850</td><td>2.78%</td><td>$27,750</td></tr>
          <tr><td>Unchanged</td><td>50%</td><td>$915</td><td>10.00%</td><td>$29,700</td></tr>
          <tr><td>Lower</td><td>30%</td><td>$985</td><td>17.78%</td><td>$31,800</td></tr>
        </tbody>
      </table>
      <div class="result-row"><span>Expected return <b>10.89%</b></span><span>Risk premium <b>5.89%</b></span><span>Expected value <b>$29,940</b></span></div>
    `, 'Values were independently checked from the source assumptions.', 'data-led'),

    slide('Sharpe ratio measures reward per unit of risk', '33', 'cream formula-slide', `
      ${header('Risk-adjusted performance', 'A higher Sharpe ratio means more expected premium for each unit of volatility')}
      ${formula('Sharpe ratio = [E(r) − r<sub>f</sub>] ÷ σ<sub>excess</sub>', 'Reward-to-volatility ratio')}
      <div class="sharpe-scale" role="img" aria-label="Sharpe ratio increases from low reward per unit of risk to high reward per unit of risk">
        <span>Lower efficiency</span><div><i></i></div><span>Higher efficiency</span>
      </div>
      <p class="insight">Use it to compare portfolios or managers only when the return distributions and horizons are meaningfully comparable.</p>
    `, 'The source calls Sharpe the “gold standard.” Stress that it is useful, but not sufficient when distributions are skewed or fat-tailed.'),

    slide('Volatility is only the beginning', '34', 'dark statement-slide', `
      <p class="eyebrow">Risk measurement</p>
      <h2>Standard deviation describes spread—not the full shape of risk</h2>
      <p>The next question is whether the normal distribution is a reasonable model for the outcomes investors actually face.</p>
    `, 'Use this transition in place of the source logo-only slide while preserving its section-break function.', 'sparse text'),

    slide('The normal model organizes outcomes around a mean', '35', 'cream chart-slide', `
      ${header('Normal distribution', 'With μ = 10% and σ = 20%, most observations cluster near the mean')}
      <svg class="normal-curve" viewBox="0 0 1400 570" role="img" aria-label="Normal distribution with mean 10 percent and standard deviation 20 percent, showing 68.26, 95.44, and 99.74 percent ranges">
        <path class="axis" d="M90 470H1320"/><path class="curve" d="M120 460 C330 455 420 420 520 260 C590 145 650 70 705 70 C760 70 820 145 890 260 C990 420 1080 455 1290 460"/>
        <path class="shade one" d="M520 460V260 C590 145 650 70 705 70 C760 70 820 145 890 260V460Z"/>
        <line x1="705" y1="70" x2="705" y2="480"/><text x="670" y="535">μ = 10%</text>
        <text x="570" y="200">68.26%</text><text x="410" y="120">95.44%</text><text x="235" y="70">99.74%</text>
      </svg>
    `, 'Connect one, two and three standard deviations to probability ranges under normality.', 'HTML/SVG-led'),

    slide('Use NORM.DIST to calculate a left-tail probability', '36', 'cream activity-slide light', `
      ${header('Excel exercise', 'What is the probability of a return below −15% when μ = 1% and σ = 6%?')}
      <div class="excel-call">
        <code>=NORM.DIST(-15%, 1%, 6%, TRUE)</code>
        <strong>0.38%</strong>
      </div>
      <div class="function-anatomy"><span>cutoff</span><span>mean</span><span>standard deviation</span><span>cumulative = TRUE</span></div>
      <p class="question">What changes if the cutoff is 0%?</p>
    `, 'Have students calculate both P(r&lt;0) and P(r&lt;−15%).', 'data-led'),

    slide('Normal probabilities depend on the cutoff', '37', 'cream data-slide', `
      ${header('Example 5.5 and Concept Check 5.4', 'The same distribution produces different probabilities at different thresholds')}
      <div class="probability-compare">
        <div><small>P(r &lt; 0%)</small><strong>43.38%</strong><code>=NORM.DIST(0%,1%,6%,TRUE)</code></div>
        <div><small>P(r &lt; −15%)</small><strong>0.38%</strong><code>=NORM.DIST(-15%,1%,6%,TRUE)</code></div>
      </div>
    `, 'Cumulative TRUE returns the probability at or below the cutoff.', 'data-led'),

    slide('Standard deviation measures the wobble of returns', '38', 'cream chart-slide', `
      ${header('Quantifying uncertainty', 'Two investments can share the same mean while producing very different experiences')}
      <div class="volatility-compare">
        <svg viewBox="0 0 650 360" role="img" aria-label="Narrow low-volatility distribution"><path class="axis" d="M40 310H610"/><path class="low" d="M55 305C220 300 250 40 325 40S430 300 595 305"/><text x="215" y="345">Low σ · outcomes cluster</text></svg>
        <svg viewBox="0 0 650 360" role="img" aria-label="Wide high-volatility distribution"><path class="axis" d="M40 310H610"/><path class="high" d="M55 305C140 300 205 145 325 145S510 300 595 305"/><text x="205" y="345">High σ · outcomes spread</text></svg>
      </div>
      ${formula('σ = √Variance', 'Standard deviation')}
    `, 'Standard deviation is expressed in return units, which makes it easier to interpret than variance.'),

    slide('Normality can hide crash risk', '39', 'cream chart-slide', `
      ${header('When the model fails', 'Real returns may be asymmetric and more extreme than a bell curve predicts')}
      <svg class="non-normal" viewBox="0 0 1320 560" role="img" aria-label="Observed return histogram with a long left tail compared with a normal curve">
        <path class="axis" d="M80 480H1240"/>
        <g class="bars"><rect x="120" y="430" width="45" height="50"/><rect x="185" y="390" width="45" height="90"/><rect x="250" y="440" width="45" height="40"/><rect x="315" y="350" width="45" height="130"/><rect x="380" y="295" width="45" height="185"/><rect x="445" y="230" width="45" height="250"/><rect x="510" y="165" width="45" height="315"/><rect x="575" y="105" width="45" height="375"/><rect x="640" y="80" width="45" height="400"/><rect x="705" y="130" width="45" height="350"/><rect x="770" y="205" width="45" height="275"/><rect x="835" y="275" width="45" height="205"/><rect x="900" y="335" width="45" height="145"/><rect x="965" y="395" width="45" height="85"/><rect x="1030" y="430" width="45" height="50"/></g>
        <path class="curve" d="M160 470C380 465 440 110 650 110S920 465 1110 470"/>
        <text x="125" y="530">Large negative returns</text><text x="855" y="530">Large positive returns</text>
      </svg>
      <p class="insight risk">A distribution can have familiar volatility and still carry unfamiliar tail risk.</p>
    `, 'Set up skewness and kurtosis as shape statistics that complement standard deviation.'),

    slide('Skewness tells us which tail is longer', '40', 'cream chart-slide', `
      ${header('Direction of risk', 'Negative skew concentrates the most dangerous surprises in the left tail')}
      <div class="skew-panels">
        <div class="negative"><b>Negative skew</b><span>Extreme losses are more frequent than symmetric models imply.</span><strong>Crash risk</strong></div>
        <div class="zero"><b>Zero skew</b><span>Upside and downside tails are symmetric around the mean.</span><strong>Balanced tails</strong></div>
        <div class="positive"><b>Positive skew</b><span>Occasional large gains extend the right tail.</span><strong>Upside asymmetry</strong></div>
      </div>
      ${formula('Skewness = E[(X − μ)³] ÷ σ³', 'Standardized third moment')}
    `, 'Source speaker note preserved: negative skew means a fatter left tail and standard deviation can understate the risk; positive skew means a fatter right tail.', 'HTML/SVG-led'),

    slide('Negative skew calls for defensive choices', '41', 'cream content-slide', `
      ${header('Investment decisions', 'When downside asymmetry rises, reduce exposure or add protection')}
      <div class="strategy-path negative-path">
        <div><b>Smaller positions</b><span>Limit exposure to crash-prone assets.</span></div>
        <div><b>Tail hedges</b><span>Use protective puts or other defined-risk strategies.</span></div>
        <div><b>Stress tests</b><span>Test losses beyond ordinary volatility assumptions.</span></div>
        <div><b>Timing discipline</b><span>Review carry and momentum exposure before stress events.</span></div>
      </div>
    `, 'These are examples, not automatic trading rules. Preserve the source focus on defensive positioning, hedging, due diligence and timing.'),

    slide('Positive skew can justify small, asymmetric bets', '41', 'cream content-slide', `
      ${header('Investment decisions', 'Limited downside with meaningful upside can improve a portfolio’s payoff shape')}
      <div class="strategy-path positive-path">
        <div><b>Upside capture</b><span>Allocate selectively to assets with convex payoff potential.</span></div>
        <div><b>Venture-style sizing</b><span>Use small positions where losses are bounded but upside is large.</span></div>
        <div><b>Long optionality</b><span>Calls and long-volatility strategies can create positive skew.</span></div>
        <div><b>Portfolio balance</b><span>Pair asymmetric growth exposure with stable income assets.</span></div>
      </div>
    `, 'Preserve the source examples while emphasizing position sizing and portfolio context.'),

    slide('Kurtosis tells us how much probability lives in the tails', '42', 'cream chart-slide', `
      ${header('Likelihood of extremes', 'Fat tails produce more extreme outcomes than a normal model predicts')}
      <div class="kurtosis-visual" role="img" aria-label="Normal and fat-tailed distributions compared, with the fat-tailed curve showing more extreme outcomes">
        <svg viewBox="0 0 900 480"><path class="axis" d="M50 420H850"/><path class="normal" d="M70 415C260 410 300 80 450 80S640 410 830 415"/><path class="fat" d="M70 390C240 370 350 145 450 145S660 370 830 390"/><text x="570" y="110">Normal</text><text x="650" y="300">Fat tails</text></svg>
        <div class="kurtosis-stats"><div><small>Excess kurtosis</small><strong>6.2</strong></div><div><small>Normal baseline</small><strong>3.0</strong></div><div><small>Total kurtosis</small><strong>9.2</strong></div></div>
      </div>
    `, 'Source speaker note preserved: another potentially important departure from normality is kurtosis.', 'HTML/SVG-led'),

    slide('High kurtosis requires more loss-absorbing capacity', '43', 'cream content-slide', `
      ${header('Fat-tail response', 'When extreme events are more likely, ordinary volatility budgets may be too small')}
      <div class="strategy-path negative-path three">
        <div><b>Increase capital buffers</b><span>Hold more liquidity against sudden losses.</span></div>
        <div><b>Reduce position limits</b><span>Prevent one tail event from dominating the portfolio.</span></div>
        <div><b>Add tail protection</b><span>Use defined-risk hedges when the cost is justified.</span></div>
      </div>
    `, 'Preserve the source defensive actions for high kurtosis.'),

    slide('Low kurtosis may support—but never guarantee—more risk capacity', '43', 'cream content-slide', `
      ${header('Thin-tail opportunity', 'More predictable distributions can support larger positions only when the model remains stable')}
      <div class="strategy-path positive-path three">
        <div><b>Consider more leverage</b><span>Only within explicit limits and stable assumptions.</span></div>
        <div><b>Increase allocations</b><span>When risk remains diversified and well understood.</span></div>
        <div><b>Harvest volatility premium</b><span>Option selling adds its own tail exposure and must be stress-tested.</span></div>
      </div>
    `, 'The source recommends aggressive responses for low kurtosis. Add the stability caveat because kurtosis estimates can change.'),

    slide('Shape statistics reveal what volatility misses', '44', 'cream chart-slide', `
      ${header('Beyond the bell curve', 'Skewness and kurtosis work together to expose asymmetric and extreme outcomes')}
      <div class="tail-matrix" role="img" aria-label="Matrix comparing negative skew, positive skew, high kurtosis and low kurtosis">
        <div class="neg"><b>Negative skew</b><span>Protect the left tail</span></div>
        <div class="pos"><b>Positive skew</b><span>Capture convex upside</span></div>
        <div class="high"><b>High kurtosis</b><span>Prepare for extremes</span></div>
        <div class="low"><b>Low kurtosis</b><span>Monitor model stability</span></div>
      </div>
    `, 'Use the matrix to transition from descriptive shape statistics to explicit downside measures.'),

    slide('A single crash changes the entire risk story', '45', 'cream data-slide', `
      ${header('Hypothetical tech fund', 'Twelve monthly returns include one −15% crash and one +10% boom')}
      <div class="return-strip" role="img" aria-label="Monthly returns: January 2, February 3, March negative 1, April 4, May 2, June negative 2, July 1, August negative 15, September 2, October 3, November 10, December 1 percent">
        <span style="--r:2">Jan <b>2%</b></span><span style="--r:3">Feb <b>3%</b></span><span class="down" style="--r:1">Mar <b>−1%</b></span><span style="--r:4">Apr <b>4%</b></span>
        <span style="--r:2">May <b>2%</b></span><span class="down" style="--r:2">Jun <b>−2%</b></span><span style="--r:1">Jul <b>1%</b></span><span class="crash" style="--r:15">Aug <b>−15%</b></span>
        <span style="--r:2">Sep <b>2%</b></span><span style="--r:3">Oct <b>3%</b></span><span class="boom" style="--r:10">Nov <b>10%</b></span><span style="--r:1">Dec <b>1%</b></span>
      </div>
    `, 'Ask students whether the mean alone would reveal the August crash.', 'data-led'),

    slide('The sample is negatively skewed and fat-tailed', '45', 'cream data-slide', `
      ${header('Excel diagnostics', 'AVERAGE, STDEV.S, SKEW and KURT summarize different properties')}
      <div class="diagnostic-grid">
        <div><small>Mean</small><strong>0.83%</strong><code>=AVERAGE(B2:B13)</code></div>
        <div><small>Sample SD</small><strong>5.80%</strong><code>=STDEV.S(B2:B13)</code></div>
        <div><small>Skew</small><strong>−1.776</strong><code>=SKEW(B2:B13)</code></div>
        <div><small>Excess kurtosis</small><strong>5.752</strong><code>=KURT(B2:B13)</code></div>
      </div>
      <p class="insight risk">The crash drives a long left tail; the crash and boom together create fat tails.</p>
    `, 'Values were independently recomputed from the 12 source returns.', 'data-led'),

    slide('VaR draws a line in the loss tail', '46', 'cream content-slide', `
      ${header('Downside-risk framework', 'Value at Risk estimates a loss threshold for a stated horizon and confidence level')}
      <div class="var-flow" role="img" aria-label="Skewness and kurtosis inform a Value at Risk threshold, followed by expected shortfall and portfolio action">
        <div><b>Shape</b><span>Skew + kurtosis</span></div><i>→</i>
        <div><b>Threshold</b><span>Value at Risk</span></div><i>→</i>
        <div><b>Beyond threshold</b><span>Expected shortfall</span></div><i>→</i>
        <div><b>Decision</b><span>Limits · hedges · allocation</span></div>
      </div>
      <p class="insight">VaR is a boundary—not the expected size of every bad outcome.</p>
    `, 'Preserve the source distinction between total volatility, tail threshold and losses beyond the threshold.'),

    slide('VaR answers a narrowly defined question', '47', 'cream formula-slide', `
      ${header('Parametric VaR', 'Under a normal model, the threshold combines mean, volatility and a confidence multiplier')}
      ${formula('VaR<sub>5%</sub> = μ − 1.65σ', '5% lower-tail threshold')}
      ${formula('VaR<sub>1%</sub> = μ − 2.33σ', '1% lower-tail threshold')}
      <p class="insight risk">The sign convention matters: a return threshold of −8.73% corresponds to an 8.73% loss magnitude.</p>
    `, 'Standard deviation measures broad volatility; VaR focuses on a specified left-tail probability.', 'data-led'),

    slide('The hypothetical fund has an 8.73% monthly 5% VaR', '48', 'cream data-slide', `
      ${header('VaR calculation', 'Use μ = 0.83% and σ = 5.80% from the 12-month sample')}
      <div class="var-results">
        <div><small>5% threshold</small><code>0.83% − 1.65(5.80%)</code><strong>−8.73%</strong><span>5% chance of a return at or below this threshold under the model</span></div>
        <div><small>1% threshold</small><code>0.83% − 2.33(5.80%)</code><strong>−12.67%</strong><span>1% chance of a return at or below this threshold under the model</span></div>
      </div>
    `, 'Values were independently recomputed. Avoid saying the loss “will not exceed” VaR; VaR is a quantile, not a maximum loss.', 'data-led', 'rebuild-and-correct'),

    slide('Downside measures answer different tail questions', '49', 'cream content-slide', `
      ${header('Beyond VaR', 'A threshold, an average tail loss and downside-only volatility are not the same measure')}
      <div class="downside-layers">
        <div><b>VaR</b><span>Where does the adverse tail begin?</span></div>
        <div><b>Expected shortfall</b><span>What is the average loss after VaR is breached?</span></div>
        <div><b>LPSD</b><span>How volatile are returns below a target threshold?</span></div>
        <div><b>Sortino ratio</b><span>How much excess return is earned per unit of downside deviation?</span></div>
      </div>
    `, 'Preserve the source definitions and compare Sortino with Sharpe.'),

    slide('Learning from historical returns', '50', 'dark section', `
      <div class="gradient-bar"></div>
      <p class="eyebrow">Section 04</p>
      <h2>History reveals the trade-off—not the next outcome</h2>
      <p>Past returns help calibrate expectations, but they do not guarantee future performance.</p>
    `, 'Transition from model-based risk to observed asset-class experience.', 'sparse text'),

    slide('Higher average return arrived with higher volatility', '51', 'cream data-slide', `
      ${header('Illustrative source-deck summary · 2000–2024', 'Stocks, Treasury bonds and Treasury bills occupy different risk-return positions')}
      <table class="finance-table compact">
        <thead><tr><th>Asset class</th><th>Average</th><th>SD</th><th>Minimum</th><th>Maximum</th></tr></thead>
        <tbody><tr><td>S&amp;P 500 stocks</td><td>7.33%</td><td>17.95%</td><td>−38.47%</td><td>30.43%</td></tr>
        <tr><td>10-year Treasury bonds</td><td>4.39%</td><td>8.40%</td><td>−13.00%</td><td>20.10%</td></tr>
        <tr><td>3-month Treasury bills</td><td>1.76%</td><td>1.86%</td><td>0.03%</td><td>5.82%</td></tr></tbody>
      </table>
      <p class="source-note">Source-deck values retained for the pilot; benchmark definitions and data series require instructor/source confirmation before publication.</p>
    `, 'Preserve every source value. Confirm whether stock figures use price or total returns and how bond returns were constructed.', 'data-led', 'rebuild-and-flag'),

    slide('The risk-return map is a choice frontier', '52', 'cream chart-slide', `
      ${header('Observed trade-off', 'Moving toward higher expected return usually means accepting more dispersion')}
      <svg class="risk-return" viewBox="0 0 1250 610" role="img" aria-label="Scatter plot with Treasury bills at low risk and low return, Treasury bonds in the middle, and stocks at high risk and high return">
        <path class="axis" d="M100 60V520H1170"/><text x="510" y="585">Standard deviation →</text><text transform="translate(35 390) rotate(-90)">Average return →</text>
        <circle class="bill" cx="220" cy="430" r="22"/><text x="255" y="440">Treasury bills</text>
        <circle class="bond" cx="570" cy="300" r="24"/><text x="605" y="310">Treasury bonds</text>
        <circle class="stock" cx="1030" cy="145" r="26"/><text x="900" y="105">S&amp;P 500 stocks</text>
        <path class="trend" d="M205 450C470 370 760 245 1060 125"/>
      </svg>
    `, 'Use the plot to reinforce the pattern without claiming the three points define an efficient frontier.', 'HTML/SVG-led'),

    slide('Portfolio design combines return, risk and investor capacity', '53', 'cream content-slide', `
      ${header('Investment lessons', 'Asset allocation should match the investor—not the best historical performer')}
      <div class="allocation-wheel" role="img" aria-label="Four-part wheel showing risk tolerance, time horizon, diversification and rebalancing around portfolio allocation">
        <div class="hub"><strong>Portfolio allocation</strong></div>
        <div class="node tolerance"><b>Risk tolerance</b><span>Willingness to bear uncertainty</span></div>
        <div class="node horizon"><b>Time horizon</b><span>Capacity to recover from volatility</span></div>
        <div class="node diversify"><b>Diversification</b><span>Spread exposure across return drivers</span></div>
        <div class="node rebalance"><b>Rebalancing</b><span>Restore the intended risk mix</span></div>
      </div>
    `, 'Source speaker note preserved for review: lognormal distributions describe variables whose logs are normal; continuously compounded returns are often used in that framework.', 'HTML/SVG-led'),

    slide('Chapter 5 mastery means you can connect the measures', '54', 'cream content-slide', `
      ${header('Make sure you can…', 'Move from cash flows to distributions to portfolio judgment')}
      <div class="mastery-path">
        <div><span>01</span><b>Calculate</b><p>HPR, EAR, APR, continuous return and real return.</p></div>
        <div><span>02</span><b>Model</b><p>Expected return, variance, standard deviation and Sharpe ratio.</p></div>
        <div><span>03</span><b>Diagnose</b><p>Skewness, kurtosis, VaR and other downside measures.</p></div>
        <div><span>04</span><b>Decide</b><p>Use historical evidence without treating it as a forecast.</p></div>
      </div>
    `, 'Use as a formative checklist before moving to capital allocation.'),

    slide('Measure first. Allocate second.', '55', 'dark close-slide', `
      <div class="gradient-bar"></div>
      <p class="eyebrow">BUS331 · Investments</p>
      <h2>Return without risk is incomplete.<br>Risk without context is misleading.</h2>
      <p>Next: capital allocation to risky assets</p>
      <div class="course-mark" aria-label="BUS331 course mark"><span>331</span><small>INVESTMENTS</small></div>
    `, 'Close by asking students which risk measure they would want before choosing between two funds.', 'sparse text')
  ]
};

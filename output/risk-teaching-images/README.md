# BUS331 risk teaching images

Created September 24, 2026 with the built-in image-generation tool, using `../returns-teaching-images/13-volatility-drag.png` as the visual reference. Eleven final PNGs are saved in this folder. `index.html` is a local review gallery. Original and correction prompts are saved alongside the images.

## Delivery and verification

- All 11 final images were visually inspected for readable text, mathematical notation, labels, diagram meaning, and clipping. Several generated chart drafts were revised before selection.
- Numerical examples were independently recomputed with Python's standard-library arithmetic and normal distribution functions. The Excel formulas were checked against their intended operations; no native Excel workbook was created or tested.
- Final PNG files were opened and verified. Native dimensions are **1672 × 941 pixels**, approximately 16:9. The image tool did not return the requested 3840 × 2160 resolution. These are native generated files, not 4K exports or artificially upscaled copies.
- Illustrative dot spacing and distribution curves are conceptual, not precision statistical plots. The opening, normal probability, and skewness graphics explicitly label this. Exact quantities appear in their calculation panels.
- Canva and existing course materials were not modified. Nothing was committed, pushed, or published.

## Sequence

1. Same average, different uncertainty: introduce spread before formulas.
2. Probability-weighted expected return: retain the four existing scenarios.
3. Variance to standard deviation: show decimal inputs, deviations, weights, squared units, and the square root.
4. Match method to data: distinguish probability scenarios, historical samples, and populations.
5. Risk premium versus excess return: separate expectation from realization over the same horizon.
6. Sharpe: compare the fund, investor mix, and market using the existing separate hypothetical example.
7. Normal probability: retain the deck's hypothetical 1% monthly mean and 6% SD, and state normality explicitly.
8. Skewness: describe tail direction without automatic trading prescriptions.
9. Kurtosis: distinguish raw and excess benchmarks and identify Excel's sample convention.
10. VaR and expected shortfall: distinguish a loss threshold from average loss in the worst tail.
11. Sortino: measure shortfalls relative to 0%, using all 12 months in the denominator.

## Verified calculation record

### Opening comparison

Each of three outcomes has probability 1/3. A: 5%, 10%, 15%; B: −20%, 10%, 40%. Both expected returns equal 10%. Probability-weighted SDs are 4.0824829% and 24.4948974%, respectively. These are scenario SDs, not sample SDs.

### Four scenarios

Probabilities: 0.30, 0.40, 0.275, 0.025. Decimal returns: 0.45, 0.13, −0.15, −0.40.

Expected return = 0.13575 = 13.575%.

Weighted squared deviations = 0.02962591875, 0.000013225, 0.0224545921875, 0.0071757015625. Individual table entries are rounded; totals use unrounded terms.

Variance = 0.0592694375 in squared decimal-return units, equivalent to 592.694375 percentage-points squared. SD = 0.2434531526, or 24.34531526 percentage points, conventionally displayed as 24.35%.

With a hypothetical 5% risk-free rate, expected premium = 8.575 percentage points. A hypothetical realized return of 3% produces an excess return of −2 percentage points.

### Sharpe comparison

Risk-free rate 2.5%; fund expected return 14.05%; fund SD 25%; investor weights 70% fund and 30% risk-free bills. Investor expected return = 10.585%; SD = 17.5%. Fund and investor Sharpe = 0.462. Market expected return 12%, SD 20%, Sharpe = 0.475. All quantities share a one-year horizon; the risk-free rate is fixed.

### Normal probability

For normal monthly returns with mean 1% and SD 6%, z = (−15% − 1%)/6% = −2.6666667. P(R < −15%) = 0.003830380568 = 0.3830380568%.

### Hypothetical 12-month sample

Jan–Dec returns: 2%, 3%, −1%, 4%, 2%, −2%, 1%, −15%, 2%, 3%, 10%, 1%.

- Arithmetic mean: 0.8333333333% monthly.
- Sample SD (n−1 denominator): 5.7970734518% monthly.
- Adjusted sample skewness, matching Excel SKEW: −1.7757164208.
- Adjusted sample excess kurtosis, matching Excel KURT: 5.7522043190.
- Normal-model 95% one-month loss VaR: 8.7020039596%, or $8,702.00 per $100,000.
- Normal-model 95% expected shortfall: 11.1243643218%, or $11,124.36 per $100,000.
- For ES: loss rate = −mean + SD × φ(z)/0.05, with z = Φ⁻¹(0.95). This is a model result, not the average of a robust observed 5% tail in 12 observations.
- With target 0%, squared shortfalls total 0.023; downside deviation = sqrt(0.023/12) = 4.3779751789%; monthly Sortino = 0.1903467469.

The monthly normal-probability exercise uses the deck's separate 1%/6% assumptions. The VaR example uses estimates from the 12-month sample. Do not substitute these rounded or distinct inputs interchangeably.

## Excel setup

For scenario images, B2:B5 contains probabilities, C2:C5 contains returns, and D2:D5 contains each return minus the probability-weighted mean. Enter returns as actual percentages (e.g. 45%, stored as 0.45), not the number 45.

For historical images, B2:B13 contains the 12 monthly percentage returns. In the Sortino example C2 is `=MIN(B2-0%,0)` and is filled through C13. `=SQRT(SUMSQ(C2:C13)/COUNT(B2:B13))` uses all observations in the denominator.

The VaR formula's `mean` and `SD` are descriptive placeholders or Excel defined names. A directly usable equivalent with the sample in B2:B13 is `=-NORM.INV(5%,AVERAGE(B2:B13),STDEV.S(B2:B13))`. Multiply by portfolio value for dollar VaR.

## References checked during the preceding instructional review

- NIST, measures of skewness and kurtosis: https://itl.nist.gov/div898/handbook/eda/section3/eda35b.htm
- Microsoft KURT: https://support.microsoft.com/en-us/excel/functions/kurt-function
- Microsoft STDEV.P and sample/population distinction: https://support.microsoft.com/en-us/excel/functions/stdev-p-function
- BIS market risk terminology: https://www.bis.org/committees/bcbs/basel-framework/standard/mar/10/inforce/2023-01-01/published/2020-03-27
- CME Sortino and target downside deviation: https://www.cmegroup.com/education/files/rr-sortino-a-sharper-ratio.pdf

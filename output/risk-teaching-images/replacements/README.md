# BUS331 risk-metric teaching images

These PNGs are local, Canva-ready teaching assets for the Chapter 5 risk section. They do not change the Canva design. Each image is 1672 × 941 pixels (16:9). All examples are hypothetical.

| Teaching use | Image |
| --- | --- |
| Method-selection attempt | [Your Turn: Which Method Fits?](00-which-method-student-attempt.png) |
| Method-selection reveal | [Which Method Fits These Data?](01-which-method-fits-these-data.png) |
| Replace the worked Q7 question with an attempt | [Your Turn: Scenario Risk](02-scenario-risk-student-attempt.png) |
| Replace the Q7 spreadsheet answer | [Scenario Risk: Check Your Result](03-scenario-risk-check-result.png) |
| Replace the bond spreadsheet solution | [Bond Scenarios: From Price to Expected Wealth](04-bond-scenarios-expected-wealth.png) |
| Replace the normal-probability screenshot question | [Your Turn: Left-Tail Probability](05-left-tail-probability-student-attempt.png) |
| Replace the normal-probability spreadsheet answer | [From Threshold to Probability](06-threshold-to-probability.png) |
| Replace the Q8 spreadsheet-style worked prompt | [Your Turn: Compare Risk-Adjusted Reward](07-sharpe-student-attempt.png) |
| Replace the monthly-return spreadsheet screenshot | [See the Data Before the Metric](08-twelve-month-data-anchor.png) |
| Replace the VaR calculation spreadsheet screenshot | [VaR Calculation: Return Cutoff to Loss](09-var-return-cutoff-to-loss.png) |
| Clarify the normal-model coverage bands | [Normal Model: Center and Bands](10-normal-model-center-and-bands.png) |

## Proposed teaching order by slide title

1. Investment Risk
2. Same Average. Different Uncertainty. — use the corrected existing asset once
3. Key Terms to Remember — tighten definitions before presenting
4. Your Turn: Which Method Fits?
5. Which Method Fits These Data?
6. Expected Return Weights Possible Outcomes
7. From Spread to Standard Deviation
8. Your Turn: Scenario Risk
9. Scenario Risk: Check Your Result
10. Defining Risk: The Price of Uncertainty
11. Expected Reward. Realized Result.
12. Concept Check 5.3 — keep the bond question
13. Bond Scenarios: From Price to Expected Wealth
14. Your Turn: Compare Risk-Adjusted Reward
15. Sharpe: Reward per Unit of Volatility — keep the existing answer visual
16. Normal Model: Center and Bands
17. Your Turn: Left-Tail Probability
18. From Threshold to Probability
19. When the Model Fails: Non-Normality
20. See the Data Before the Metric
21. Skewness: Which Tail Extends Farther? — use the corrected existing asset
22. Kurtosis: Look Beyond Ordinary Fluctuations
23. Four Measures Describe Different Features of Returns
24. Sortino Focuses on Shortfalls Below a Target
25. VaR Calculation: Return Cutoff to Loss
26. VaR Marks the Threshold. ES Describes the Tail. — use the version with the explicit 95% VaR and ES values

This sequence leaves out repeated drafts of *Same Average. Different Uncertainty.*, *From a Return Threshold to a Probability*, and *VaR Marks the Threshold. ES Describes the Tail.* It also sets aside *Quantifying Uncertainty: Standard Deviation* because the concept and calculation are already covered, and *Beyond the Bell Curve: Mastering Tail Risk* and *Additional Measures of Downside Risk* until their claims and definitions are revised.

## Checks and corrections

- The probability-weighted scenario mean is 13.575%; variance is 0.0592694375 in decimal-squared units; SD is 24.35%. Scenario probabilities call for weighted calculations, not `STDEV.S` or `STDEV.P` applied directly to the four outcome returns.
- The bond example gives an expected sale price of $923, expected ending wealth of $29,940, expected HPR of 10.89%, and expected premium of 5.89 percentage points over the stated 5% T-bill rate. The coupon is included once. The image does not call the coupon risk-free.
- Under the hypothetical normal model with monthly mean 1% and SD 6%, the probability below 0% is 43.38%, and the probability below −15% is 0.383%.
- For the Sharpe exercise, the 70% fund / 30% T-bill mix has expected return 10.585%, SD 17.5% under the stated fixed-rate assumption, and Sharpe ratio 0.462. Fund A also has Sharpe 0.462; the market's is 0.475. The tiny gap is an arithmetic comparison, not strong evidence of future superiority.
- The 12 hypothetical monthly returns have a mean of 0.833% and sample SD of 5.797%. With a normal model fitted to these values, the 5th-percentile return cutoff is −8.702%, corresponding to a **positive** 95% one-month VaR of 8.702%, or about $8,702 on $100,000. This is an illustration, not a reliable tail estimate from 12 observations.
- The normal-model central intervals for mean 1% and SD 6% are −5% to +7% (68.27%), −11% to +13% (95.45%), and −17% to +19% (99.73%). These depend on the normal assumption.

## Teaching gaps still to address

- Add a one-sentence transition from the scenario exercise to historical returns: probabilities are assigned to possible future outcomes, while the 12-month series records past observations. The two methods answer different data questions.
- The T-bill is an approximate matched-horizon nominal benchmark. Its return does not remove inflation or reinvestment risk in every setting.
- In the Sharpe exercise, the mix SD shortcut works because this example treats the T-bill return as fixed. Before portfolio theory, state that two risky assets require covariance or correlation; weighted SDs cannot simply be averaged.
- Before the normal-model example, say explicitly that it introduces a **new hypothetical distribution**, separate from the earlier four scenarios and later 12-month series. After the normal result, ask what happens if the left tail is heavier than the model assumes.
- The skewness and kurtosis estimates from only 12 observations are fragile. Use them to describe this small hypothetical series, not to predict reliable future tail probabilities.
- Define downside deviation using all observations in the denominator with shortfalls set to zero for above-target periods, if that is the version used by the Sortino image. The existing *Additional Measures of Downside Risk* definition of LPSD as the SD of only the below-target subset should be corrected before reuse.
- End with a decision prompt that asks students which risk measure they would report for a goal: overall variability, below-target performance, or severe tail loss. This checks transfer beyond formula recognition and reinforces that volatility does not capture every investment risk.

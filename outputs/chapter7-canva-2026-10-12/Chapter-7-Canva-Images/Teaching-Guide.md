# Chapter 7 teaching guide

30 slides. Georgia substitutes for Georgia Pro in these flattened PNGs. All examples are hypothetical annual data. Reveal slides follow student attempts.

## 1. Can a mix be safer than either fund?

Ask for a prediction before showing the later minimum-variance result. All figures in this lesson are hypothetical annual returns, not market forecasts. Students should already know weights, percentages and Chapter 6's CAL.

Workbook connection: Chapter 7 diversification

## 2. Diversification removes firm-specific risk

A recall can affect one firm; a recession affects many. Diversification substantially reduces firm-specific risk but does not eliminate systematic risk. Do not claim every security falls in every market shock.

Workbook connection: Manual: diversification and portfolio risk

## 3. Different return patterns create the benefit

Ask why buying ten firms in one narrow industry can leave concentrated exposure. Correlation describes return co-movement, not whether the two prices are high or low. Illustration is schematic.

Workbook connection: Q2, Q3 and Q5

## 4. Start with a distribution of possible returns

This example transfers to Q1–Q2 but deliberately uses different data. In the practice layout, B5:B7 are probabilities, C5:C7 stocks and D5:D7 bonds.

Workbook connection: Q1–Q2 method

## 5. Expected return is the probability-weighted mean

Contrast with the unweighted stock mean of 8.33%. SUMPRODUCT multiplies corresponding rows and adds the products. Store rates as decimals; format as percentages.

Workbook connection: Q1–Q2 means

## 6. Variance measures distance from the mean

Variance uses squared decimal-return units, not percentage return units. Sigma is standard deviation. Bond variance is 0.000304 and bond SD is 1.744%; show the parallel Excel calculation next.

Workbook connection: Q1–Q2 variance and SD

## 7. Build the statistics with cell references

Use the three-state data on slide 4, with headers on row 4. This deliberately mirrors the reference's calculation locations but has only three states. Q1–Q2 extend through row 8; use all four assignment states. Helper calculations must link to the current mean. Actual workbook B16/C16 hold means and B17/C17 variances.

Workbook connection: Q1–Q2 Excel structure

## 8. Covariance compares deviations in the same state

A negative contribution occurs when one return is above its mean and the other below. Covariance is an average product of deviations, not an average of raw returns. Preserve the pairing of economic states.

Workbook connection: Q2 covariance

## 9. Calculate the covariance one state at a time

In a helper column H5 use =B5*(C5-$C$9)*(D5-$D$9), fill through H7, and sum. A conventional unweighted COVARIANCE function would not implement these unequal state probabilities.

Workbook connection: Q2 probability-weighted covariance

## 10. Correlation puts covariance on a common scale

Calculation: .001320/(sqrt(.01560)*sqrt(.000304)) = .606143. Use unrounded SDs, not the rounded display. Zero correlation means no linear association, not necessarily independence.

Workbook connection: Q2 correlation

## 11. Your turn: compare two equally likely states

Keep slide 12 hidden until students have attempted. Ask for a signed covariance and a sentence explaining its sign. Students can use scratch cells; this is a formative exercise, not an assigned workbook solution.

Workbook connection: Practice for Q1–Q2

## 12. Opposite deviations create negative correlation

Explain that this two-state teaching example has perfect negative correlation by construction. That is not a realistic guarantee about stocks and bonds.

Workbook connection: Debrief for Q1–Q2

## 13. Historical samples need sample statistics

Do not confuse a scenario distribution with a historical sample. For Q4, inspect the actual data B5:E54. Sample SD estimates volatility; the annual mean is not a guaranteed annual outcome.

Workbook connection: Q4 method and input range

## 14. One Excel function estimates sample volatility

Check sample SD squared equals sample variance within rounding. Q4's saved output locations are B62:E62 for SD and B63:E63 for variance, using B5:E54. The classroom example uses a shorter scratch layout and different data.

Workbook connection: Q4 STDEV.S and VAR.S

## 15. Carry one stock–bond example through the model

Switch explicitly from the state example to summary-statistic inputs. S means stock and B means bond. Expected returns 12%/6%, SDs 20%/10%, correlation .20, Rf 3%. These are not assignment answers or current market estimates.

Workbook connection: Related example for Q3 and Q5–Q7

## 16. Portfolio return weights the two fund means

Calculation .6*.12+.4*.06=.096. The expected return lies between 6% and 12% for long-only weights. This result is for the classroom running example, not Q3.

Workbook connection: Q3 and Q5 expected return

## 17. Portfolio variance has three terms

Three terms are .0144, .0016, .00192. Add them; do not multiply terms together. Standard deviation is not usually the weighted average of individual SDs. Risk inputs are the same as slide 15.

Workbook connection: Q3 and Q5 portfolio risk

## 18. Your turn: increase the bond share

Keep slide 19 hidden. Have students write a prediction about the SD before calculating. Covariance stays .004 because changing weights does not change the asset inputs.

Workbook connection: Practice for Q3 and Q5

## 19. A small stock share can reduce bond-only risk

Compare the actual SD with weighted-average SD of 12%; they answer different calculations. Ask why adding a riskier fund can lower overall risk.

Workbook connection: Q3 and Q5 interpretation

## 20. Lower correlation lowers risk at fixed weights

At 60/40: correlation +1 SD16%, +.2 SD13.3866%, zero SD12.6491%, −1 SD8%. Long-only +1 gives no benefit against weighted-average SD. With −1, zero risk requires special weights: wS=σB/(σS+σB)=1/3 here, not arbitrary weights. At zero correlation covariance is zero.

Workbook connection: Correlation effects; Q3 and Q5

## 21. Vary weights without moving fixed inputs

This layout mirrors Q5 with classroom data. Display formula as two lines only for legibility; enter it as one formula. In Q5 use its supplied inputs instead. Plot SD on x and expected return on y with an XY scatter chart. Spot-check 0% and 100% stock endpoints.

Workbook connection: Q5 weight table and absolute references

## 22. Minimum variance finds the least volatile mix

Manual objective explicitly includes finding the minimum-variance combination. The result is interior and long-only. If a formula yields weights outside 0–1, check whether short sales are allowed; long-only constraints may put the optimum at an endpoint.

Workbook connection: Manual objective; Q5 frontier interpretation

## 23. The efficient frontier is the upper boundary

Use the running-example two-asset locus. The lower branch is dominated; the minimum-variance point is the leftmost point. For many assets, Markowitz searches feasible combinations using means, variances and pairwise covariances. There are N(N−1)/2 distinct pairwise covariances. Efficient upper boundary, not any interior point.

Workbook connection: Manual: Markowitz model and efficient frontier

## 24. Which candidate has the best reward per risk?

Keep next slide hidden until attempt. Rf is the risk-free rate; use the same annual period and decimal convention as returns and SDs. Sharpe is dimensionless, not a percentage.

Workbook connection: Q7 optimization objective

## 25. 60/40 wins the comparison, but is not optimal

Stocks .45, 60/40 .49303, bonds .30. The continuous running-example tangency mix has Sharpe .498435. Rounding can hide differences between nearby portfolios. A 10%-step table is useful exploration, not proof of the exact optimum.

Workbook connection: Q6–Q7 optimal risky portfolio

## 26. Tangency weights maximize the Sharpe ratio

Formula is for a nonsingular two-asset covariance model with a common risk-free rate and nondegenerate denominator. Check feasibility and investment constraints. In this lesson the solution is interior and feasible without short sales. Q6 supplies excess returns already; Q7 gives total means and Treasury bills.

Workbook connection: Q6 and Q7 formula logic

## 27. Construct the tangency weights in Excel

This mirrors Q6's bond-first input order but uses classroom inputs. Numerator .00084; denominator .00162. Recompute portfolio SD and Sharpe (.498435) from unrounded weights. The worksheet's excess-return input must not have Rf subtracted again.

Workbook connection: Q6 structure; check for Q7

## 28. Total returns must become excess returns first

Q7 bond excess return is B21; bill benchmark is D5. Stock and bond SD inputs B6/C6; paired correlation B11 or C10. These are locations and construction guidance, not completed assignment answers. Do not treat zero bill SD as implying correlation is mathematically defined; covariance with a constant is zero.

Workbook connection: Q6–Q7 independent application

## 29. Choose the risky mix, then choose its size

With shared expectations, a common risk-free rate and the same feasible investment set, the optimal risky composition is the same; risk aversion selects y. Classroom example y=.60 yields 28.89% stocks, 31.11% bonds, 40% bills, expected return6.5333%, SD7.0889%. CAL becomes CML only when risky portfolio is the market portfolio. Borrowing at a different rate or constraints can alter the result.

Workbook connection: Manual: optimal complete portfolio; Chapter 6 bridge

## 30. Diversification is powerful, but has limits

Risk pooling adds independent exposures; total dollar risk may grow even if average loss becomes more stable. Risk sharing distributes a fixed exposure among more investors. A longer horizon does not guarantee smaller cumulative losses or make stocks risk-free. Finish by asking students to explain why a low SD and a high Sharpe answer different questions. Student workflow Q1 weighted moments, Q2 co-movement, Q3 combine, Q4 sample stats, Q5 vary weights, Q6–Q7 optimize. Trading and borrowing costs can reduce model benefits; different borrowing/lending rates can change the optimal choice. Further study includes VaR/CVaR, factor models, behavioral finance, dynamic rebalancing and alternative data; these are not required calculations for Q1–Q7.

Workbook connection: Manual: pooling, sharing and long horizons; assignment synthesis
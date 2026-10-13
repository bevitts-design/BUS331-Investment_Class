# Four-asset portfolio extension

Insert after the two-asset portfolio-risk explanation. Georgia substitutes for Georgia Pro. PNG text is flattened; maintain content in the JSON source. Workbook unchanged. Existing slides preserved.

## 1. From two funds to a four-asset portfolio

Start with equal weights in SPY, GLD, MSFT and VCIT. Four assets require four variances and six distinct pairwise covariances. More tickers do not guarantee diversification: fund and individual-stock exposures can overlap. Students will identify their own workbook inputs and construct their own formulas. Ask which pair might move most closely together.

## 2. Start with prices on matching dates

Allow a brief paired prediction, then ask for evidence. SPY rises $2; GLD falls $1. Prices alone are not comparable percentage performance. Use appropriately adjusted data for total-return analysis and check provider definitions. Four prices provide three returns. The hypothetical values are chosen to produce exact simple returns; do not present them as market history.

## 3. Turn a price change into a daily return

Ask students to calculate GLD independently before debriefing: 99/100−1 = −1%. The denominator is yesterday’s price, not today’s. Store returns as decimals and display percentages. Each valid historical day is an equally weighted observation, unlike forecast states with assigned probabilities. Students locate their own inputs and choose their own formula references.

## 4. Why use LN returns? They add across time

Natural log return is ln(today’s price / yesterday’s price). It describes continuously compounded growth. Log returns add across time; simple returns compound. Two consecutive 2% simple returns produce 4.04% cumulative growth. Weighted simple asset returns produce exact one-day portfolio returns using beginning-of-day weights. Individual asset log returns cannot be weighted to obtain the exact portfolio log return. Log covariance provides an approximation to simple-return portfolio volatility. Ask students to distinguish aggregation across time from aggregation across assets.

## 5. Returns reveal the pattern that prices hide

Debrief the earlier GLD calculation before moving on. SPY sample daily standard deviation is 2.0817%; GLD is 1.5275%. Students can select a suitable sample standard-deviation method themselves. These three days demonstrate mechanics only; they are not a reliable estimate or forecast. Average return and volatility answer different questions.

## 6. Covariance starts with deviations from averages

Allow students to predict the signs before advancing. All three products are negative. pp means percentage points; deviations shown are rounded. Use full-precision decimal returns for computation. A positive raw return can still be below its average: GLD’s zero return on day 4 is below its 0.3333% average. Covariance concerns deviations from means, not merely whether raw returns have opposite signs.

## 7. Negative covariance reveals offsetting movement

Use full precision: SPY mean 0.0133333333 and GLD mean 0.0033333333. Products are −0.0000888889, −0.0003888889 and −0.0000555556. Sum is −0.0005333333; divide by two for sample covariance. Distinguish covariance from correlation: correlation standardizes covariance by the two standard deviations. Negative covariance is evidence in this sample, not a promise of future hedging.

## 8. A matrix organizes every asset pair

Variances are sample variance of the same aligned return observations. Variance is covariance of an asset with itself. SPY variance is 0.0004333333; GLD variance is 0.0002333333. Maintain identical asset ordering in rows, columns and weights. Use sample estimates consistently, or population estimates consistently; do not mix them. If a tool returns only a triangle, mirror the values rather than treating blanks as zeros. Students choose their own data ranges and computation method.

## 9. Weights turn asset returns into portfolio returns

Students calculate the first weighted result before the full table debrief. These fixed weights imply daily rebalancing, ignoring trading costs. Buy-and-hold weights drift and must be updated for an exact return series. Weights total 100%. Exact weighted portfolio returns require simple asset returns; weighted asset log returns are an approximation.

## 10. Portfolio risk is the spread of portfolio returns

Independently compute the sample standard deviation of portfolio returns. Portfolio deviations are −0.0033333333, −0.0033333333 and +0.0066666667. Sum squares divided by two gives 0.0000333333. Square root gives 0.0057735027. This example illustrates diversification, not a general guarantee that every combination has lower volatility than both components.

## 11. The covariance matrix gives the same portfolio risk

For two assets portfolio variance equals wA² varA + wB² varB + 2 wA wB covAB. With equal weights, terms are 0.0001083333, 0.0000583333 and −0.0001333333. The covariance term captures diversification. For multiple assets, the compact relationship is w-transpose times covariance matrix times w. It is exact for simple-return covariance and fixed weights. Log-return covariance instead approximates simple-return portfolio volatility. Do not supply workbook formulas or cell references; students construct and verify their own implementation.

## 12. Annualize only after calculating daily risk

Use unrounded daily standard deviation to obtain 9.1652% annualized volatility. 252 is an approximate number of trading days. Multiplying standard deviation directly by 252 is wrong. With serial correlation, multi-day variance also depends on cross-time covariances. Log returns add across time; simple returns compound. Historical compounded annual asset growth can be estimated by converting 252 times mean daily log return back to a simple return; that is not an arithmetic expected return. Keep the workbook’s return convention distinct from the exact simple-return risk cross-check.

## 13. Now construct the analysis independently

Allow about six minutes for construction, then compare results and reasoning. Students select their own cells, ranges, functions and formulas. Do not reveal assignment answers. Debrief with a verbal explanation and an independent cross-check using the weighted simple-return series where applicable. If using log covariance, explain why exact equality with simple-return risk is not required. Ask which inputs are held fixed when weights change. Optional fallback: explain the hypothetical example verbally without workbook access.

## 14. Sharpe ratio: excess return per unit of risk

Compare hypothetical annual mixes A and B: A has (10%−4%)/12%=0.50; B has (12%−4%)/20%=0.40. A has higher excess return per unit of volatility despite lower raw return. Use consistent dates, annual units and return definitions. The ratio is dimensionless, not a percentage or probability. A conventional expected Sharpe uses arithmetic expected returns; a compounded historical growth estimate creates a model-specific comparison. Students identify their own inputs and construct their own calculation. Volatility includes upside and downside and is not maximum loss.

## 15. Use Solver to maximize the Sharpe ratio

Students locate their own objective, weight cells and constraint inputs. Keep return estimates, risk-free rate and covariance fixed while weights change. Use continuous weights and GRG Nonlinear because risk includes a square root and Sharpe is a ratio. Use the activity’s specified allocation bounds. Before solving, check valid paired returns, consistent covariance, finite outputs and positive risk. Check unrounded weights, total allocation and improvement from the initial Sharpe; try another feasible starting mix. Solver failure is not an optimal solution. Historical inputs and constraints determine the result; no future performance is guaranteed.
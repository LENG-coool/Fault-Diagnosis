---
prev: false
next: false
---
<br><br>

# Explainable Fault Diagnosis for Combustion Chamber Components Based on SHAP + Thermodynamic Simulation-Assisted Random Forest
## Introduction
Today, I’m sharing a cutting-edge paper recently published in Measurement: **"Thermodynamic Simulation-assisted Random Forest: Towards explainable fault diagnosis of combustion chamber components of marine diesel engines"**.

In the field of AI, we often face an awkward reality: a model might boast 99% accuracy, yet engineers hesitate to use it. Why? Because in safety-critical sectors like marine engine diagnostics, a "black-box" prediction isn't enough—we need explainability.

This paper demonstrates not only how to combine **Thermodynamic Simulation with Random Forest**(RF) but, more importantly, how to deeply apply the SHAP (Shapley Additive Explanations) algorithm. This provides a novel "X-ray" perspective for complex system diagnostics: it doesn't just locate the fault; it explains exactly which thermodynamic parameters are driving that conclusion.

## Marginal Contribution
The core goal of SHAP is to answer: How much did each feature contribute to the final prediction? In fault diagnosis, this means identifying which thermodynamic parameter led the model to flag a specific fault.

Standard diagnostics usually end once the model outputs a result. However, this explainable approach "deconstructs" the logic backward.

Using Random Forest as an example: the forest consists of many decision trees. Each tree votes for a fault category, and the majority vote wins.

When data is fed into the model, the prediction score $f$ for fault $k$ equals the number of trees voting for that category. This score is determined by a set of parameters $S$ (all parameters excluding parameter $i$) plus parameter $i$ itself: $f(S \cup \{i\})$.

To find the standalone contribution of parameter $i$, we calculate the Marginal Contribution $\Delta \phi_i(S)$ by finding the difference between the score with and without $i$:
$$\Delta \phi_{\scriptscriptstyle i}(S) = f(S \cup \{i\}) - f(S)$$

This value reveals the direction and magnitude of the impact:
- Positive value: Parameter $i$ increases the probability of fault $k$ (it is a driver of the fault).
- Negative value: Parameter $i$ decreases the probability (it argues against that fault).
- Larger magnitude: The more dominant the parameter is in the root cause analysis.

## From Marginal Contribution to SHAP Values
For a single parameter, multiple marginal contributions exist because the parameter set $S$ can be formed in various combinations.

For example, given four thermodynamic parameters $P1$–$P4$, when calculating the marginal contribution of $P1$, there are 8 possible subsets $S$ that do not include $P1$: $\{P2, P3, P4\}$, $\{P2, P3\}$, $\{P3, P4\}$, $\{P2, P4\}$, $\{P2\}$, $\{P3\}$, $\{P4\}$, and $\emptyset$. Consequently, $P1$ has 8 distinct marginal contributions.

The SHAP value is the weighted average of all these marginal contributions:
$$\phi_{\scriptscriptstyle i}(f,x) = \sum_{S \subseteq N \setminus \{i\}} \frac{|S|!(n - |S| - 1)!}{n!} [f(S \cup \{i\}) - f(S)]$$
Where $n$ is the total number of parameters and $|S|$ is the size of the subset. 

The SHAP value quantifies the importance: the higher the value, the more critical the parameter is for classifying the fault.

## Tree SHAP: Accelerating the Calculation
Calculating exact SHAP values is computationally expensive because it requires traversing every possible combination. Tree SHAP solves this by leveraging the hierarchical structure of decision trees. Instead of all combinations, it only calculates contributions along the **actual paths** a sample takes through the tree, drastically improving efficiency.

### Example：
<img src="/en图片1.png" style="width: 50%; margin: 0 auto; display: block;" />
In a tree with 4 parameters, if a sample follows the path[P1 → P2 → P3 → Fault 2], Tree SHAP only processes these specific parameters rather than every possible permutation.

## Explainability Analysis (Case Study: Piston Ring Wear - F4)
![图片描述](/en图片2.png)
The researchers analyzed Piston Ring Wear (Fault F4) using multi-dimensional SHAP plots，Plot(a) is Waterfall Plot；Plot(b) is Beeswarm Plot。

### 1. Waterfall Plot（Plot a）
- Purpose: Explains the decision for a single F4 fault sample；
- Logic: Starting from the base value $E[f(X)] = -1.797$ (the average prediction), it adds the SHAP values of each parameter to reach the final score of $1.464$；
- Key Finding: Parameters like P12 (Exhaust gas temp before turbo), P6 (Blow-by heat flow), and P14/P7 (Exhaust gas temp after turbo) show the highest absolute SHAP values, identifying them as the primary triggers for this specific case.

### 2. Beeswarm Plot（Plot b）
- Purpose: Provides a global view of parameter importance across all F4 samples；
- Logic: The y-axis lists parameters; the x-axis shows the SHAP value；
- Key Finding：
  - (Exhaust gas pressure before turbo) has the highest average SHAP value；
  - Low values of P11 (indicated by color) often fall in the positive SHAP zone, meaning "low P11" is a hallmark of piston ring wear；
  - Integrating the physical mechanism: Piston ring wear leads to sealing failure → increased blow-by gas → thermodynamic imbalance in the exhaust system → reduction in P11.

### 3. Core Conclusion
The study identifies that the root causes of Piston Ring Wear (F4) in marine diesel engines are characterized by：
- Low P11: Exhaust gas pressure before turbocharger.
- Low P12: Exhaust gas temperature before turbocharger.
- Low P7: Exhaust gas temperature after turbocharger.
- High P6: Increased blow-by heat flow.

## Original Reference
C. Luo, M. Zhao, X. Fu, S. Zhong, S. Fu, K. Zhang, X. Yu. Thermodynamic simulation-assisted random forest: Towards explainable fault diagnosis of combustion chamber components of marine diesel engines [J]. Measurement, 2025, 251: 117252.

<br>
<hr>
<div style="display: flex; justify-content: flex-end; padding: 20px 0;">
  <a href="https://ts-rf.github.io/" 
     style="text-decoration: none; color: inherit; border: 1px solid #e2e2e3; padding: 12px 24px; border-radius: 8px; transition: border-color 0.25s; background-color: var(--vp-c-bg-soft);">
    <div style="font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 4px;">Original Reference</div>
    <div style="font-size: 16px; color: var(--vp-c-brand); font-weight: 600;">Click Here →</div>
  </a>
</div>
# A New Paradigm for Explainable Fault Diagnosis:
# Thermodynamic Simulation-assisted Random Forest (TSRF)

<br>

::: info [**Original Publication📜:**](link:/public/TSRF.pdf)
*Thermodynamic Simulation-assisted Random Forest: Towards explainable fault diagnosis of combustion chamber components of marine diesel engines*, **Measurement**, 2024.
:::

## Introduction {#引言}
In the field of diesel engine combustion chamber fault diagnosis, engineers have long struggled with three critical challenges:
1. **Data Scarcity**：The rarity of real-world fault samples limits the training effectiveness of deep learning models.
2. **Implementation Gap**：Pure physical models are often too computationally intensive for real-time engineering applications.
3. **The "Black Box" Dilemma**：Traditional machine learning models lack transparency, making it difficult to trace the underlying physical mechanisms of a detected fault.

To address these issues, a recent study published in Measurement proposes an innovative and practical framework: leveraging physical simulation to augment machine learning rather than relying solely on data fitting. This approach significantly enhances both the explainability and reliability of fault diagnosis.

The authors introduce the **Thermodynamic Simulation-assisted Random Forest (TSRF)**—a framework that bridges thermodynamic mechanisms with explainable machine learning. In small-sample environments, this method achieves high diagnostic accuracy while maintaining consistency with physical laws, offering substantial value for marine engineering.

## The TSRF Framework{#框架}
The TSRF framework integrates a 1D thermodynamic model, a Random Forest (RF) classifier, and a SHAP (SHapley Additive exPlanations) interpreter to create a closed-loop diagnostic system.
1. **Data Generation & Preprocessing**：Synthetic datasets covering both normal and faulty conditions are generated via 1D thermodynamic simulation.
2. **Model Training & Validation**：A Random Forest model is trained on the preprocessed data, with performance evaluated through cross-validation.
3. **Explainability Analysis**：The SHAP method is applied to the trained model to identify key thermodynamic parameters and quantify their contribution to the diagnostic results.
<img src="/en图片8.png" style="width: 100%; margin: 0 auto; display: block;" />
<p align="center" style="color: grey">The Thermodynamic Simulation-assisted Random Forest (TSRF) Framework</p>

## 1D Thermodynamic Model Construction & Calibration{#模型}
The foundation of the study is a **1D thermodynamic model** designed to simulate the thermal behavior of the combustion chamber. The authors performed meticulous calibration against experimental data to ensure the model accurately reflects thermodynamic characteristics under real operating conditions.
<img src="/en图片7.png"  style="width: 100%; margin: 0 auto; display: block;" />
<p align="center" style="color: grey">Schematic of the 1D Thermodynamic Model</p>

Furthermore, the model is calibrated using field data acquired through a **Data Collection Module (DCM)**. This ensures that the simulation output remains consistent with the key thermodynamic parameters observed in actual engine operations.
<img src="/en图片6.png" style="width: 60%; margin: 0 auto; display: block;" />
<p align="center" style="color: grey">Data Collection Module (DCM)</p>

## Physical Modeling & Simulation of Typical Faults{#故障建模}
Once calibrated, the authors introduced targeted perturbations to key parameters to simulate five typical combustion chamber faults, ensuring each fault is backed by a clear physical mechanism.
| Fault ID | Fault Type  | Physical Mechanism                  | Key Parameter Adjustments                       |
| ---- | ----- | ---------------------- | ---------------------------- |
| F1   | Cylinder Head Crack  | Thermo-mechanical loading leads to cracking; structural/cooling degradation. | Increase Head Temp (TH) to 346 °C         |
| F2   | Piston Erosion  | Material degradation causes thermal erosion and increased blow-by.         | Increase Piston Temp (TP) + Minor Blow-by (0.01 kg/s) |
| F3   | Cylinder Liner Wear  | Abrasive particles cause geometric deformation and seal failure.      | Increase Bore Diameter + Heavy Blow-by (0.03 kg/s)       |
| F4   | Piston Ring Wear | Wear-induced seal degradation creates a blow-by feedback loop.     | Adjust Blow-by Mass Flow Rate (0.02 kg/s)          |
| F5   | Piston Ring Sticking | Carbon deposits, poor lubrication, and sludge buildup.           | Adjust Bore Diameter + Increase Liner Temp + Blow-by           |

This mechanism-driven modeling produces a high-quality, comprehensive dataset that serves as the "ground truth" for machine learning.

## Feature Selection via RF and SHAP{#特征筛选}
With the dataset established, the **Random Forest (RF)** algorithm is employed as the primary classifier. To solve the "black box" problem, the authors introduce **SHAP** analysis to provide deep insights into the model's decision-making process.

The feature selection follows a two-stage strategy:

1.RF Preliminary Identification:
- The RF learns the mapping between thermodynamic parameters and fault types.
- Marginal contributions of each parameter are calculated based on prediction scores.

2.Tree SHAP Quantitative Analysis:
- SHAP values are calculated for each parameter.
- Features are filtered based on their SHAP weights, prioritizing those with the highest diagnostic impact and clearest physical significance.

## Experimental Results & Performance Evaluation{#实验结果}
Experimental validation demonstrates the effectiveness of the TSRF framework. Even in small-sample environments, the method achieves a diagnostic accuracy of over 95%, significantly outperforming traditional black-box models.

Moreover, the SHAP analysis successfully reveals the importance distribution of thermodynamic parameters across different fault types. This provides engineers with a reliable reference for Root Cause Analysis (RCA), turning a simple classification result into actionable physical insight.

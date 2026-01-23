# 可解释故障诊断的新思路：
# 热力学仿真辅助随机森林(TSRF)

<br>

::: info [**原始文献📜:**](../public/TSRF.pdf)
*Thermodynamic Simulation-assisted Random Forest: Towards explainable fault diagnosis of combustion chamber components of marine diesel engines*, **Measurement**, 2025.
:::

## 引言 {#引言}
在柴油机的燃烧室故障诊断中，工程实践中长期面临以下三大严峻挑战：
1. **样本匮乏**：真实故障样本的稀缺限制了深度学习模型的训练效能；
2. **机理落地难**：纯物理模型因计算复杂度极高，难以满足实际工程的实时性需求；
3. **黑箱困境**：传统模型往往缺乏可解释性，无法溯源故障发生的内在机理。

针对以上问题，发表在《Measurement》的论文提出了一种创新性且具实际应用潜力的方法：通过物理仿真来辅助机器学习，而不是仅依赖数据来拟合物理模型，从而提升故障诊断的可解释性与可靠性。

基于这一思路，文章提出了**热力学仿真辅助随机森林**，一种将热力学机理与可解释机器学习结合的燃烧室故障诊断框架。在小样本数据环境下，该方法成功实现了高诊断准确性，同时保持了与物理模型一致的结果，具有显著的工程应用价值。

## 热力学仿真辅助随机森林整体框架{#框架}
论文提出的**热力学仿真辅助随机森林**（Thermodynamic Simulation-assisted Random Forest, TSRF）框架，集成了一维热力学模型、随机森林分类器与SHAP解释器，形成了一个闭环的故障诊断系统。
1. **数据生成与预处理**：通过热力学仿真生成包含正常与故障工况的综合数据集，并进行必要的预处理。
2. **模型训练与验证**：利用随机森林对预处理后的数据进行训练，并通过交叉验证评估模型性能。
3. **可解释性分析**：应用SHAP方法对训练好的模型进行解释
，识别关键热力学参数及其对故障诊断的贡献。
<img src="/图片8.png" style="width: 100%; margin: 0 auto; display: block;" />
<p align="center" style="color: grey">热力学仿真辅助随机森林 (TSRF) 框架示意图</p>

## 一维热力学模型构建与校准{#模型}
论文首先构建了**一维热力学模型**，模拟柴油机燃烧室的热力学行为。通过对比实验数据，作者对模型进行了精细校准，确保其能够准确反映实际工况下的热力学特性。
<img src="/图片7.png"  style="width: 100%; margin: 0 auto; display: block;" />
<p align="center" style="color: grey">柴油机一维热力学模型示意图</p>

此外，模型通过**数据采集模块**(**Data Collection Module, DCM**)获取的实测运行数据进行校准，以确保仿真输出与真实工况在关键热力学参数上保持一致。
<img src="/图片6.png" style="width: 60%; margin: 0 auto; display: block;" />
<p align="center" style="color: grey">数据采集模块 (DCM)</p>

## 燃烧室典型故障的物理建模与仿真{#故障建模}
在完成模型校准后，作者对燃烧室关键参数进行有针对性的扰动，仿真了五类典型故障，并确保每一类故障均有明确的物理机理支撑。
| 故障编号 | 故障类型  | 物理机制                   | 关键参数调节                       |
| ---- | ----- | ---------------------- | ---------------------------- |
| F1   | 缸盖裂纹  | 热–机械载荷导致裂纹产生，结构与散热能力退化 | 缸盖表面温度 TH 提升至 346 °C         |
| F2   | 活塞烧蚀  | 材料退化引发热烧蚀，加剧窜气         | 活塞温度 TP 升高 + 轻微窜气（0.01 kg/s） |
| F3   | 缸套磨损  | 磨粒侵入导致几何变形与严重密封失效      | 缸径增大 + 大量窜气（0.03 kg/s）       |
| F4   | 活塞环磨损 | 磨损变形引发密封退化，形成窜气正反馈     | 窜气质量流量调节（0.02 kg/s）          |
| F5   | 活塞环粘着 | 积碳、润滑不足与油泥堆积           | 缸径变化 + 缸套温度升高 + 窜气           |

通过上述故障建模，论文生成了涵盖正常与故障工况的综合数据集，为后续机器学习提供了高质量输入。

## 基于RF与SHAP的特征筛选{#特征筛选}
在数据集构建完成后，作者采用**随机森林**（**Random Forest, RF**）作为主要的机器学习模型，利用其强大的分类能力对燃烧室故障进行诊断。为了提升模型的可解释性，论文引入了**SHAP（SHapley Additive exPlanations**）方法，对模型输出进行深入分析。

采用以下两阶段策略进行筛选：

1.随机森林预识别
- 利用 RF 学习参数与故障类型之间的映射关系；
- 根据预测得分计算各参数的边际贡献。

2.Tree SHAP 定量分析
- 计算各参数的 SHAP 值；
- 依据 SHAP 权重筛选出对诊断最具贡献、且物理意义明确的参数。

## 实验结果与性能评估{#实验结果}
论文通过一系列实验验证了TSRF框架的有效性。结果显示，该方法在小样本数据环境下，依然能够实现高达95%以上的诊断准确率，显著优于传统的黑箱模型。

此外，SHAP分析揭示了各热力学参数在不同故障类型中的重要性分布，为工程实践中的故障根因分析提供了宝贵的参考。

<br>
<hr>
<div style="display: flex; justify-content: flex-end; padding: 20px 0;">
  <a href="https://ts-rf.github.io/zh-CN/" 
     style="text-decoration: none; color: inherit; border: 1px solid #e2e2e3; padding: 12px 24px; border-radius: 8px; transition: border-color 0.25s; background-color: var(--vp-c-bg-soft);">
    <div style="font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 4px;">了解更多</div>
    <div style="font-size: 16px; color: var(--vp-c-brand); font-weight: 600;">点击此处 →</div>
  </a>
</div>
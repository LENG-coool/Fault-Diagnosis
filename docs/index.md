---
prev: false
next: false
---
<br><br>

# 基于SHAP＋热力学仿真辅助随机森林的可解释性故障诊断
## 引言
今天分享一篇近期发表在《Measurement》上的前沿论文：《Thermodynamic Simulation-assisted Random Forest: Towards explainable fault diagnosis of combustion chamber components of marine diesel engines》。

在人工智能领域，我们经常面临一个尴尬：模型精度高达 99%，但工程师却不敢用。为什么？因为在涉及生命财产安全的领域（如船舶发动机诊断），“黑盒”模型给出的一个数字是不够的，我们需要的是可解释性。

这篇文章不仅展示了如何将**热力学仿真与随机森林**（RF）结合，更重要的是，它深度应用了 SHAP 算法，为复杂系统的故障诊断提供了新颖的“透视”视角：既能精准定位故障，还能说清是哪个热力学参数在起作用。

## 边际贡献
SHAP 的核心目标是：回答每一个特征对最终预测结果做出了多少贡献。放在故障诊断里，就是哪个热力学参数让模型判定了这个故障。

普通的故障诊断是将模型训练好后，输入数据，输出结果就结束了。但这个可解释性故障诊断会反向拆解，推测各个热力学参数的贡献大小，具体逻辑如下：

以随机森林模型为例，随机森林内部包含许多决策树，每个决策树均能进行分类任务，每个决策树给它自己分类出来的故障种类投票，将投票最多的故障判定为随机森林最终输出的故障种类。

将数据输入给随机森林模型后，故障 k 的预测分数为 f=投票给类别 k 的决策树数量。这个预测分数是热力学参数 i 与除了参数 i 的其他参数组成的集合 S 共同输入模型后输出的预测分数f(S∪{i})。

若想知道单独输入参数 i 的贡献，只需再计算只输入参数集合 S 时的预测分数f(S)，两者做差即可得到参数 i 的边际贡献Δϕ​(S)：
$$ \Delta \phi_{\scriptscriptstyle i}(S) = f(S \cup \{i\}) - f(S) $$

参数 i 的边际贡献表明了其在判断故障 k 时发挥的作用，包含影响的正负与大小：
- 若加入参数 i 后，模型判断故障 k 的概率（预测分数）变大，表明参数 i 对故障 k 起到**正面作用**（是故障 k 的诱因之一）；
- 若加入参数 i 后，预测分数变小：参数 i 对故障 k 起到**负面作用**（不是故障 k 的诱因）；
- 边际贡献数值越大，参数 i 对故障 k 的作用越显著，在故障根因中越占主导地位。

## 从边际贡献到 SHAP 值
对于一个参数，会存在多个边际贡献——因为参数集合 S 有多种组合方式。

举个例子：有 P1-P4 这 4 个热力学参数，计算 P1 的边际贡献时，不包含 P1 的参数集合有 {P2,P3,P4}、{P2,P3}、{P3,P4}、{P2,P4}、{P2}、{P3}、{P4}、∅ 共 8 种，因此 P1 的边际贡献也有 8 个。

SHAP 值是该参数所有边际贡献的**加权平均**，公式如下：
$$ \phi_{\scriptscriptstyle i}(f,x) = \sum_{S \subseteq N \setminus \{i\}} \frac{|S|!(n - |S| - 1)!}{n!} [f(S \cup \{i\}) - f(S)] $$
其中n为总参数个数，|S|为集合S中的参数个数。

SHAP 值表明了该参数在故障诊断中的重要程度：SHAP 值越大，对模型分类故障的作用就越大，可据此筛选出更具判断价值的核心参数。

## Tree SHAP：让计算“快起来”
正常计算 SHAP 值需要遍历所有参数的组合，效率极低。而 Tree SHAP 利用决策树的层级结构，通过路径上的节点分裂贡献直接计算 SHAP 值——只需计算样本在决策树中**实际经过的路径**上的参数，大幅提升计算效率。

### 示例说明：
<img src="/图片1.png" style="width: 50%; margin: 0 auto; display: block;" />
如上图，假设有 4 个参数（参数 1-4）组成的决策树，普通 SHAP 需计算所有参数组合；若样本实际经过的路径是「参数 1 → 参数 2 → 参数 3 → 故障 2」，则 Tree SHAP 仅计算这 3 个参数的组合，简化了计算过程。

## 可解释性分析（以活塞环磨损 F4 故障为例）
![图片描述](/图片2.png)
如上图是活塞环磨损（F4故障）的 SHAP 值多维度分析图，图(a)为瀑布图；图(b)为蜂群图。

### 1. 瀑布图（图 a）
- 作用：解释**单个 F4 故障样本**的判定原因；
- 逻辑：从模型对所有样本的平均预测水平 E[f(X)] = -1.797 开始，叠加每个参数的 SHAP 值，最终得到该样本的预测得分 1.464；
- 关键结论：红色参数（正向作用）、蓝色参数（负向作用）中，**P12涡轮增压器前排气温度、P6窜气热流、P14涡轮增压器后排气温度、P7涡轮增压器后排气温度**的SHAP 绝对值最大，是该样本判定为 F4 故障的核心原因。

### 2. 蜂群图（图 b）
- 作用：展示**所有 F4 故障样本**的全局参数重要性；
- 逻辑：纵轴为参数，横轴为 SHAP 值（上横轴是参数平均 SHAP 值），参数越靠上、SHAP 值越大，对故障判定的作用越关键；
- 关键结论：
  - P11（涡轮增压器前排气压力）的平均 SHAP 值最高，是 F4 故障的全局核心指标；
  - P11 低值样本多分布在 SHAP 正值区域（正向作用），说明「P11 过低」是活塞环磨损的主要特征；
  - 结合物理机制：活塞环磨损导致密封失效 → 窜气加剧 → 排气系统热力学失衡 → P11 降低。

### 3. 核心结论
船舶柴油机燃烧室活塞环磨损（F4 故障）的主要根因是：
- P11 涡轮增压器前排气压力过低；
- P12 涡轮增压器前排气温度过低；
- P7 涡轮增压器后排气温度过低；
- P6 窜起热流量过高。

## 原始文献
C. Luo, M. Zhao, X. Fu, S. Zhong, S. Fu, K. Zhang, X. Yu. Thermodynamic simulation-assisted random forest: Towards explainable fault diagnosis of combustion chamber components of marine diesel engines [J]. Measurement, 2025, 251: 117252.

<br>
<hr>
<div style="display: flex; justify-content: flex-end; padding: 20px 0;">
  <a href="https://ts-rf.github.io/zh-CN/" 
     style="text-decoration: none; color: inherit; border: 1px solid #e2e2e3; padding: 12px 24px; border-radius: 8px; transition: border-color 0.25s; background-color: var(--vp-c-bg-soft);">
    <div style="font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 4px;">原始文献</div>
    <div style="font-size: 16px; color: var(--vp-c-brand); font-weight: 600;">点击此处 →</div>
  </a>
</div>
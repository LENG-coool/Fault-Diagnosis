# Nouvelle approche pour le diagnostic des défaillances interprétable :
# Forêt aléatoire assistée par simulation thermodynamique (TSRF)

<br>

::: info [**Références originales 📜:**](/TSRF.pdf)
*Thermodynamic Simulation-assisted Random Forest: Towards explainable fault diagnosis of combustion chamber components of marine diesel engines*, **Measurement**, 2025.
:::

## Introduction {#introduction}
Dans le diagnostic des défaillances de la chambre de combustion des moteurs diesel, la pratique d'ingénierie a longtemps été confrontée aux trois grands défis suivants :
1. **Pénurie d'échantillons** : la rareté des échantillons de défaillance réels limite l'efficacité de l'entraînement des modèles d'apprentissage profond ;
2. **Difficultés d'implémentation des mécanismes** : les modèles purement physiques, en raison de leur extrême complexité de calcul, ont du mal à répondre aux exigences de temps réel de l'ingénierie pratique ;
3. **Dilemme de la boîte noire** : les modèles traditionnels manquent souvent d'interprétabilité et ne peuvent pas retracer le mécanisme intrinsèque de l'apparition des défaillances.

Pour résoudre les problèmes ci-dessus, un article publié dans *Measurement* propose une méthode innovante et potentiellement applicable : en utilisant la simulation physique pour assister l'apprentissage automatique, plutôt que de dépendre uniquement de données pour adapter des modèles physiques, améliorant ainsi l'interprétabilité et la fiabilité du diagnostic des défaillances.

Basée sur cette approche, l'article propose la **forêt aléatoire assistée par simulation thermodynamique**, un cadre de diagnostic des défaillances de la chambre de combustion qui combine la mécanique thermodynamique et l'apprentissage automatique interprétable. Dans un environnement de petit nombre d'échantillons de données, cette méthode a réussi à réaliser une précision de diagnostic supérieure à 95 %, tout en maintenant la cohérence avec les résultats des modèles physiques, ce qui a une valeur d'application d'ingénierie significative.

## Cadre global de la forêt aléatoire assistée par simulation thermodynamique{#cadre}
Le cadre de **forêt aléatoire assistée par simulation thermodynamique** (Thermodynamic Simulation-assisted Random Forest, TSRF) proposé dans l'article intègre un modèle thermodynamique unidimensionnel, un classificateur de forêt aléatoire et un interpréteur SHAP, formant un système de diagnostic des défaillances en boucle fermée.
1. **Génération et prétraitement des données** : génération d'un ensemble de données complet contenant les conditions normales et défaillantes par simulation thermodynamique, ainsi que le prétraitement nécessaire.
2. **Entraînement et validation du modèle** : utilisation de la forêt aléatoire pour entraîner les données prétraitées et évaluation de la performance du modèle par validation croisée.
3. **Analyse d'interprétabilité** : application de la méthode SHAP pour interpréter le modèle entraîné, identifier les paramètres thermodynamiques clés et leur contribution au diagnostic des défaillances.
<img src="/图片8.png" style="width: 100%; margin: 0 auto; display: block;" />
<p align="center" style="color: grey">Schéma du cadre de forêt aléatoire assistée par simulation thermodynamique (TSRF)</p>

## Construction et calibrage du modèle thermodynamique unidimensionnel{#modele}
L'article construit d'abord un **modèle thermodynamique unidimensionnel** pour simuler le comportement thermodynamique de la chambre de combustion du moteur diesel. En comparant les données expérimentales, les auteurs ont effectué un calibrage fin du modèle pour assurer qu'il peut refléter avec précision les caractéristiques thermodynamiques dans les conditions réelles de fonctionnement.
<img src="/图片7.png"  style="width: 100%; margin: 0 auto; display: block;" />
<p align="center" style="color: grey">Schéma du modèle thermodynamique unidimensionnel du moteur diesel</p>

De plus, le modèle est calibré par les données de fonctionnement mesurées obtenues via le **module de collecte de données** (**Data Collection Module, DCM**), pour assurer que la sortie de la simulation reste cohérente avec les conditions réelles de fonctionnement en termes de paramètres thermodynamiques clés.
<img src="/图片6.png" style="width: 60%; margin: 0 auto; display: block;" />
<p align="center" style="color: grey">Module de collecte de données (DCM)</p>

## Modélisation physique et simulation des défaillances typiques de la chambre de combustion{#modelisation-defaillance}
Après avoir achevé le calibrage du modèle, les auteurs ont intentionnellement perturbé les paramètres clés de la chambre de combustion pour simuler cinq catégories de défaillances typiques, chacune étant soutenue par un mécanisme physique explicite.
| Numéro de défaillance | Type de défaillance | Mécanisme physique | Ajustement des paramètres clés |
| ---- | ----- | ---------------------- | ---------------------------- |
| F1   | Fissure de culasse | Les charges thermo-mécaniques produisent des fissures, la structure et la capacité de dissipation thermique se dégradent | Température de surface de la culasse TH augmentée à 346 °C |
| F2   | Érosion thermique du piston | La dégradation des matériaux provoque une érosion thermique, exacerbant la fuite-vapeur | Température du piston TP augmente + légère fuite-vapeur (0,01 kg/s) |
| F3   | Usure de la chemise | L'invasion de particules de poussière provoque une déformation géométrique et une défaillance sévère de l'étanchéité | Diamètre alésage augmente + fuite-vapeur importante (0,03 kg/s) |
| F4   | Usure des segments de piston | La déformation due à l'usure provoque une dégradation de l'étanchéité, formant une rétroaction positive de fuite-vapeur | Ajustement du débit massique de fuite-vapeur (0,02 kg/s) |
| F5   | Collage des segments de piston | Dépôt de carbone, lubrification insuffisante et accumulation de boues | Variation du diamètre alésage + élévation de la température de la chemise + fuite-vapeur |

Grâce à cette modélisation des défaillances, l'article a généré un ensemble de données complet couvrant les conditions normales et défaillantes, fournissant une entrée de haute qualité pour l'apprentissage automatique ultérieur.

## Sélection des caractéristiques basée sur RF et SHAP{#selection-caracteristiques}
Une fois la construction de l'ensemble de données terminée, les auteurs ont adopté la **forêt aléatoire** (**Random Forest, RF**) comme modèle principal d'apprentissage automatique, utilisant sa puissante capacité de classification pour diagnostiquer les défaillances de la chambre de combustion. Pour améliorer l'interprétabilité du modèle, l'article introduit la méthode **SHAP (SHapley Additive exPlanations)** pour une analyse approfondie de la sortie du modèle.

Stratégie de sélection en deux étapes adoptée :

1. Pré-identification par forêt aléatoire
- Utilisation de RF pour apprendre la relation de mapping entre les paramètres et les types de défaillances ;
- Calcul de la contribution marginale de chaque paramètre selon le score de prédiction.

2. Analyse quantitative par Tree SHAP
- Calcul des valeurs SHAP de chaque paramètre ;
- Sélection des paramètres ayant la plus grande contribution au diagnostic et une signification physique explicite selon les poids SHAP.
<img src="/图片9.png" style="width: 100%; " />
<p align="center" style="color: grey">Processus de sélection des paramètres basé sur les valeurs SHAP</p>

## Résultats expérimentaux et évaluation de la performance{#resultats-experimentaux}
L'article valide l'efficacité du cadre TSRF grâce à une série d'expériences. Les résultats montrent que cette méthode peut toujours réaliser une précision de diagnostic supérieure à 95 % dans un environnement de petit nombre d'échantillons de données, surpassant significativement les modèles boîte noire traditionnels.

De plus, l'analyse SHAP révèle la distribution de l'importance des différents paramètres thermodynamiques dans différents types de défaillances, fournissant des références précieuses pour l'analyse des causes racines des défaillances dans la pratique d'ingénierie.

<br>
<hr>
<div style="display: flex; justify-content: flex-end; padding: 20px 0;">
  <a href="https://ts-rf.github.io/zh-CN/" 
     style="text-decoration: none; color: inherit; border: 1px solid #e2e2e3; padding: 12px 24px; border-radius: 8px; transition: border-color 0.25s; background-color: var(--vp-c-bg-soft);">
    <div style="font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 4px;">En savoir plus</div>
    <div style="font-size: 16px; color: var(--vp-c-brand); font-weight: 600;">Cliquez ici →</div>
  </a>
</div>

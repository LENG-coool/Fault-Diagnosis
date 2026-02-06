---
prev: false
next: false
---
<br><br>

# Diagnostic des défaillances interprétable assisté par forêt aléatoire SHAP + simulation thermodynamique
## Introduction{#introduction}
Aujourd'hui, je partage un article de recherche de pointe récemment publié dans *Measurement* : **《Thermodynamic Simulation-assisted Random Forest: Towards explainable fault diagnosis of combustion chamber components of marine diesel engines》**（Forêt aléatoire assistée par simulation thermodynamique : Vers un diagnostic des défaillances interprétable des composants de la chambre de combustion des moteurs diesel marins）.

Dans le domaine de l'intelligence artificielle, nous sommes souvent confrontés à un dilemme : la précision du modèle atteint 99 %, mais les ingénieurs n'osent pas l'utiliser. Pourquoi ? Parce que dans les domaines impliquant la sécurité des vies et des biens (comme le diagnostic des moteurs marins), un seul chiffre fourni par un modèle « boîte noire » n'est pas suffisant. Ce dont nous avons besoin, c'est de l'interprétabilité.

Cet article non seulement montre comment combiner **la simulation thermodynamique et la forêt aléatoire** (RF), mais plus importantly, il applique profondément l'algorithme SHAP, offrant une perspective « transparente » nouvelle pour le diagnostic des défaillances dans les systèmes complexes : il peut non seulement localiser précisément les défaillances, mais aussi clarifier quel paramètre thermodynamique joue un rôle.

## Contribution marginale{#contribution-marginale}
L'objectif central de SHAP est : répondre à la question de savoir combien chaque caractéristique a contribué au résultat final de la prédiction. Dans le contexte du diagnostic des défaillances, c'est quel paramètre thermodynamique a conduit le modèle à identifier cette défaillance.

Le diagnostic conventionnel des défaillances se termine après l'entraînement du modèle, l'entrée des données et la sortie du résultat. Mais ce diagnostic des défaillances interprétable décompose en sens inverse et déduit la contribution de chaque paramètre thermodynamique. La logique spécifique est la suivante :

Prenons une forêt aléatoire comme exemple. Elle contient de nombreux arbres de décision en son sein. Chaque arbre de décision peut effectuer une tâche de classification. Chaque arbre de décision vote pour la catégorie de défaillance qu'il a classée, et la catégorie avec le plus de votes est déterminée comme le type de défaillance final de la forêt aléatoire.

Une fois les données entrées dans le modèle de forêt aléatoire, le score de prédiction de la défaillance k est f = nombre d'arbres de décision votant pour la catégorie k. Ce score de prédiction est f(S∪{i}), le score de prédiction obtenu en entrant conjointement le paramètre thermodynamique i et l'ensemble S composé d'autres paramètres.

Pour connaître la contribution de la saisie seule du paramètre i, il suffit de calculer à nouveau le score de prédiction f(S) lors de la saisie uniquement de l'ensemble de paramètres S. La différence entre les deux donne la contribution marginale Δϕ(S) du paramètre i :
$$ \Delta \phi_{\scriptscriptstyle i}(S) = f(S \cup \{i\}) - f(S) $$

La contribution marginale du paramètre i indique le rôle qu'il joue dans la détermination de la défaillance k, y compris la direction et l'ampleur de l'influence :
- Si l'ajout du paramètre i augmente la probabilité du modèle de déterminer la défaillance k (score de prédiction), cela indique que le paramètre i a un **effet positif** sur la défaillance k (l'une des causes de la défaillance k) ;
- Si l'ajout du paramètre i diminue le score de prédiction : le paramètre i a un **effet négatif** sur la défaillance k (pas une cause de la défaillance k) ;
- Plus la valeur de la contribution marginale est grande, plus l'effet du paramètre i sur la défaillance k est prononcé et joue un rôle dominant dans la cause première de la défaillance.

## De la contribution marginale aux valeurs SHAP{#valeurs-shap}
Pour un paramètre donné, il existe plusieurs contributions marginales, car l'ensemble de paramètres S peut être composé de différentes manières.

Prenons un exemple : il y a 4 paramètres thermodynamiques P1-P4. Lors du calcul de la contribution marginale de P1, les ensembles de paramètres ne contenant pas P1 sont {P2,P3,P4}, {P2,P3}, {P3,P4}, {P2,P4}, {P2}, {P3}, {P4}, ∅, soit 8 au total. Par conséquent, il existe également 8 contributions marginales pour P1.

La valeur SHAP est la **moyenne pondérée** de toutes les contributions marginales de ce paramètre, avec la formule suivante :
$$ \phi_{\scriptscriptstyle i}(f,x) = \sum_{S \subseteq N \setminus \{i\}} \frac{|S|!(n - |S| - 1)!}{n!} [f(S \cup \{i\}) - f(S)] $$
où n est le nombre total de paramètres et |S| est le nombre de paramètres dans l'ensemble S.

La valeur SHAP indique le degré d'importance du paramètre dans le diagnostic des défaillances : plus la valeur SHAP est grande, plus l'effet du paramètre sur la classification des défaillances par le modèle est important. On peut ainsi filtrer les paramètres essentiels qui ont la plus grande valeur diagnostique.

## Tree SHAP : Accélérer le calcul{#tree-shap}
Le calcul normal des valeurs SHAP nécessite de parcourir toutes les combinaisons de paramètres, ce qui est extrêmement inefficace. Tree SHAP utilise la structure hiérarchique des arbres de décision et calcule directement les valeurs SHAP grâce aux contributions de division des nœuds sur le chemin. Il suffit de calculer les paramètres sur le **chemin réellement parcouru** par l'échantillon dans l'arbre de décision, améliorant ainsi considérablement l'efficacité du calcul.

### Illustration par exemple :
<img src="/图片1.png" style="width: 50%; margin: 0 auto; display: block;" />
<p align="center" style="color: grey">Diagramme de chemin Tree SHAP</p>
Comme le montre la figure ci-dessus, en supposant qu'il y ait un arbre de décision composé de 4 paramètres (paramètres 1-4), SHAP normal aurait besoin de calculer toutes les combinaisons de paramètres. Si le chemin réellement parcouru par l'échantillon est « paramètre 1 → paramètre 2 → paramètre 3 → défaillance 2 », alors Tree SHAP ne calcule que la combinaison de ces 3 paramètres, simplifiant le processus de calcul.

## Analyse d'interprétabilité (en prenant la défaillance F4 d'usure des segments de piston comme exemple){#analyse-interpretabilite}
![描述图片](/图片2.png)
La figure ci-dessus est un graphique d'analyse multidimensionnelle des valeurs SHAP de l'usure des segments de piston (défaillance F4). La figure (a) est un diagramme en cascade ; la figure (b) est un diagramme en essaim.

### 1. Diagramme en cascade (figure a)
- Fonction : expliquer la raison de la détermination d'un **seul échantillon de défaillance F4** ;
- Logique : à partir du niveau de prédiction moyen E[f(X)] = -1,797 du modèle sur tous les échantillons, on ajoute successivement les valeurs SHAP de chaque paramètre pour obtenir finalement le score de prédiction de 1,464 pour cet échantillon ;
- Conclusion clé : parmi les paramètres rouges (effet positif) et bleus (effet négatif), **la température des gaz d'échappement avant le turbocompresseur P12, le flux thermique de la fuite-vapeur P6, la température des gaz d'échappement après le turbocompresseur P14, la température des gaz d'échappement après le turbocompresseur P7** ont les plus grandes valeurs absolues SHAP, qui sont les raisons essentielles pour déterminer que cet échantillon est une défaillance F4.

### 2. Diagramme en essaim (figure b)
- Fonction : afficher l'importance globale des paramètres de **tous les échantillons de défaillance F4** ;
- Logique : l'axe vertical représente les paramètres, l'axe horizontal représente les valeurs SHAP (l'axe supérieur représente la valeur SHAP moyenne des paramètres). Plus un paramètre est vers le haut, plus sa valeur SHAP est grande, plus crucial est son rôle dans la détermination de la défaillance ;
- Conclusion clé :
  - La valeur SHAP moyenne de P11 (pression des gaz d'échappement avant le turbocompresseur) est la plus élevée, ce qui en fait l'indicateur essentiel global de la défaillance F4 ;
  - Les échantillons à faible valeur P11 sont largement distribués dans la région de valeur SHAP positive (effet positif), ce qui indique que « P11 trop bas » est la caractéristique principale de l'usure des segments de piston ;
  - En combinant le mécanisme physique : l'usure des segments de piston entraîne une défaillance de l'étanchéité → intensification de la fuite-vapeur → déséquilibre thermodynamique du système d'échappement → baisse de P11.

### 3. Conclusion essentielle
La cause première de l'usure des segments de piston dans la chambre de combustion du moteur diesel marin (défaillance F4) est :
- P11 Pression des gaz d'échappement avant le turbocompresseur trop basse ;
- P12 Température des gaz d'échappement avant le turbocompresseur trop basse ;
- P7 Température des gaz d'échappement après le turbocompresseur trop basse ;
- P6 Flux thermique de fuite-vapeur trop élevé.

## Références originales{#references-originales}
*C. Luo, M. Zhao, X. Fu, S. Zhong, S. Fu, K. Zhang, X. Yu. Thermodynamic simulation-assisted random forest: Towards explainable fault diagnosis of combustion chamber components of marine diesel engines [J]. Measurement, 2025, 251: 117252.*

<br>
<hr>
<div style="display: flex; justify-content: flex-end; padding: 20px 0;">
  <a href="https://ts-rf.github.io/zh-CN/" 
     style="text-decoration: none; color: inherit; border: 1px solid #e2e2e3; padding: 12px 24px; border-radius: 8px; transition: border-color 0.25s; background-color: var(--vp-c-bg-soft);">
    <div style="font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 4px;">Références originales</div>
    <div style="font-size: 16px; color: var(--vp-c-brand); font-weight: 600;">Cliquez ici →</div>
  </a>
</div>

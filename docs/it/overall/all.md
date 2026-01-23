# Un Nuovo Paradigma per la Diagnosi dei Guasti Spiegabile:
# Random Forest Assistito da Simulazione Termodinamica (TSRF)

<br>

::: info [**Pubblicazione Originale📜:**](../../public/TSRF.pdf)
*Thermodynamic Simulation-assisted Random Forest: Towards explainable fault diagnosis of combustion chamber components of marine diesel engines*, **Measurement**, 2025.
:::

## Introduzione {#introduzione}
Nel campo della diagnosi dei guasti della camera di combustione dei motori diesel, gli ingegneri affrontano da tempo tre sfide critiche:
1. **Scarsità di Dati**: La rarità di campioni di guasti reali limita l'efficacia dell'addestramento dei modelli di deep learning.
2. **Gap di Implementazione**: I modelli fisici puri sono spesso troppo intensivi dal punto di vista computazionale per applicazioni ingegneristiche in tempo reale.
3. **Il Dilemma della "Scatola Nera"**: I modelli tradizionali di machine learning mancano di trasparenza, rendendo difficile tracciare i meccanismi fisici sottostanti di un guasto rilevato.

Per affrontare questi problemi, uno studio recente pubblicato in Measurement propone un framework innovativo e pratico: sfruttare la simulazione fisica per aumentare il machine learning piuttosto che affidarsi esclusivamente al data fitting. Questo approccio migliora significativamente sia l'interpretabilità che l'affidabilità della diagnosi dei guasti.

Gli autori introducono il **Random Forest Assistito da Simulazione Termodinamica (TSRF)**—un framework che colma il divario tra i meccanismi termodinamici e il machine learning interpretabile. In ambienti con campioni limitati, questo metodo raggiunge un'elevata precisione diagnostica mantenendo la coerenza con le leggi fisiche, offrendo un valore sostanziale per l'ingegneria marina.

## Il Framework TSRF {#framework}
Il framework TSRF integra un modello termodinamico 1D, un classificatore Random Forest (RF) e un interprete SHAP (SHapley Additive exPlanations) per creare un sistema diagnostico a circuito chiuso.
1. **Generazione e Preprocessamento dei Dati**: I set di dati sintetici che coprono condizioni normali e di guasto vengono generati tramite simulazione termodinamica 1D.
2. **Addestramento e Validazione del Modello**: Un modello Random Forest viene addestrato sui dati preprocessati, con le prestazioni valutate mediante convalida incrociata.
3. **Analisi di Interpretabilità**: Il metodo SHAP viene applicato al modello addestrato per identificare i parametri termodinamici chiave e quantificarne il contributo ai risultati diagnostici.
<img src="/en图片8.png" style="width: 100%; margin: 0 auto; display: block;" />
<p align="center" style="color: grey">Il Framework Random Forest Assistito da Simulazione Termodinamica (TSRF)</p>

## Costruzione e Calibrazione del Modello Termodinamico 1D {#modello}
La base dello studio è un **modello termodinamico 1D** progettato per simulare il comportamento termico della camera di combustione. Gli autori hanno eseguito una calibrazione meticolosa rispetto ai dati sperimentali per garantire che il modello rifletta accuratamente le caratteristiche termodinamiche in condizioni di esercizio reali.
<img src="/en图片7.png"  style="width: 100%; margin: 0 auto; display: block;" />
<p align="center" style="color: grey">Schema del Modello Termodinamico 1D</p>

Inoltre, il modello viene calibrato utilizzando i dati di campo acquisiti tramite un **Modulo di Raccolta Dati (DCM)**. Ciò garantisce che l'output della simulazione rimanga coerente con i parametri termodinamici chiave osservati nelle operazioni del motore reale.
<img src="/en图片6.png" style="width: 60%; margin: 0 auto; display: block;" />
<p align="center" style="color: grey">Modulo di Raccolta Dati (DCM)</p>

## Modellazione Fisica e Simulazione di Guasti Tipici {#guasti}
Una volta calibrato, gli autori hanno introdotto perturbazioni mirate ai parametri chiave per simulare cinque guasti tipici della camera di combustione, assicurando che ogni guasto sia supportato da un meccanismo fisico chiaro.
| ID Guasto | Tipo di Guasto  | Meccanismo Fisico                  | Regolazioni dei Parametri Chiave                       |
| ---- | ----- | ---------------------- | ---------------------------- |
| F1   | Frattura della Testata  | Il carico termomeccanico causa cricche; degrado strutturale/di raffreddamento. | Aumenta la Temp. della Testata (TH) a 346 °C         |
| F2   | Erosione del Pistone  | Il degrado del materiale causa erosione termica e aumento delle perdite.         | Aumenta la Temp. del Pistone (TP) + Perdite Minori (0.01 kg/s) |
| F3   | Usura della Camicia del Cilindro  | Le particelle abrasive causano deformazione geometrica e cedimento della tenuta.      | Aumenta il Diametro della Foratura + Perdite Elevate (0.03 kg/s)       |
| F4   | Usura dell'Anello del Pistone | L'usura causa degrado della tenuta e crea un ciclo di feedback di perdite.     | Regola la Portata di Massa delle Perdite (0.02 kg/s)          |
| F5   | Anello del Pistone Bloccato | Depositi di carbonio, lubrificazione insufficiente e accumulo di fanghi.           | Regola il Diametro della Foratura + Aumenta la Temp. della Camicia + Perdite           |

Questa modellazione basata su meccanismi produce un set di dati completo e di alta qualità che serve come "ground truth" per il machine learning.

## Selezione delle Caratteristiche tramite RF e SHAP {#selezione}
Con il set di dati stabilito, l'algoritmo **Random Forest (RF)** viene impiegato come classificatore principale. Per risolvere il problema della "scatola nera", gli autori introducono l'analisi **SHAP** per fornire approfondimenti sul processo decisionale del modello.

La selezione delle caratteristiche segue una strategia in due fasi:

1. Identificazione Preliminare con RF:
- L'RF apprende la mappatura tra i parametri termodinamici e i tipi di guasto.
- I contributi marginali di ogni parametro vengono calcolati in base ai punteggi di previsione.

2. Analisi Quantitativa con Tree SHAP:
- I valori SHAP vengono calcolati per ogni parametro.
- Le caratteristiche vengono filtrate in base ai loro pesi SHAP, dando priorità a quelle con il massimo impatto diagnostico e la significanza fisica più evidente.

## Risultati Sperimentali e Valutazione delle Prestazioni {#risultati}
La validazione sperimentale dimostra l'efficacia del framework TSRF. Anche in ambienti con campioni limitati, il metodo raggiunge una precisione diagnostica superiore al 95%, superando significativamente i modelli tradizionali a scatola nera.

Inoltre, l'analisi SHAP rivela con successo la distribuzione dell'importanza dei parametri termodinamici tra i diversi tipi di guasto. Questo fornisce agli ingegneri un riferimento affidabile per l'Analisi delle Cause Radice (RCA), trasformando un semplice risultato di classificazione in un'intuizione fisica praticabile.

<br>
<hr>
<div style="display: flex; justify-content: flex-end; padding: 20px 0;">
  <a href="https://ts-rf.github.io/it/" 
     style="text-decoration: none; color: inherit; border: 1px solid #e2e2e3; padding: 12px 24px; border-radius: 8px; transition: border-color 0.25s; background-color: var(--vp-c-bg-soft);">
    <div style="font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 4px;">Scopri di più</div>
    <div style="font-size: 16px; color: var(--vp-c-brand); font-weight: 600;">Clicca qui →</div>
  </a>
</div>
# Diagnosi dei guasti interpretabile basata su SHAP + Foresta Casuale assistita da simulazione termodinamica
## Introduzione{#introduzione}
Oggi condividiamo un articolo all'avanguardia pubblicato recentemente su Measurement:**《Thermodynamic Simulation-assisted Random Forest: Towards explainable fault diagnosis of combustion chamber components of marine diesel engines》**。

Nel campo dell'intelligenza artificiale, ci troviamo spesso di fronte a un paradosso: il modello ha un'accuratezza del 99%, ma gli ingegneri non osano usarlo. Perché? Perché in settori che coinvolgono la sicurezza della vita e dei beni (come la diagnosi dei motori navali), un semplice numero fornito da un modello "black box" non è sufficiente; ciò di cui abbiamo bisogno **èl'interpretabilità**.

Questo articolo non mostra solo come combinare la **simulazione termodinamica con la Foresta Casuale** (Random Forest - RF), ma applica in modo approfondito l'algoritmo SHAP per fornire una nuova prospettiva "a raggi X" sulla diagnosi dei guasti di sistemi complessi: non solo individua con precisione il guasto, ma spiega anche quale parametro termodinamico stia giocando un ruolo determinante.

## Contributo Marginale{#contributo-marginale}
L'obiettivo principale di SHAP è rispondere a una domanda: quanto contribuisce ogni singola caratteristica al risultato finale della previsione? Applicato alla diagnosi dei guasti, significa capire quale parametro termodinamico ha portato il modello a identificare quel determinato malfunzionamento.

Nella diagnosi dei guasti tradizionale, una volta addestrato il modello, si inseriscono i dati e si ottiene il risultato. La diagnosi interpretabile, invece, scompone il processo all'indietro per stimare l'entità del contributo di ciascun parametro termodinamico, secondo la seguente logica:

Prendendo come esempio il modello Random Forest, esso contiene al suo interno molti alberi decisionali. Ogni albero esegue un compito di classificazione e "vota" per una categoria di guasto; il guasto che riceve il maggior numero di voti viene decretato come output finale della Foresta Casuale.

Dopo aver inserito i dati nel modello, il punteggio di previsione per il guasto k è definito come f = numero di alberi che hanno votato per la categoria k. Questo punteggio è il risultato dell'inserimento nel modello del parametro termodinamico i insieme all'insieme S (composto da tutti gli altri parametri tranne i), indicato come $f(S \cup \{i\})$.

Per conoscere il contributo isolato del parametro i, basta calcolare il punteggio di previsione $f(S)$ utilizzando solo l'insieme di parametri S. La differenza tra i due valori rappresenta il contributo marginale $\Delta \phi_{\scriptscriptstyle i}(S)$:
$$ \Delta \phi_{\scriptscriptstyle i}(S) = f(S \cup \{i\}) - f(S) $$

Il contributo marginale del parametro i indica il ruolo svolto nella diagnosi del guasto k, includendo sia la direzione (positiva o negativa) che l'entità dell'influenza:
-Se, aggiungendo il parametro i, la probabilità (punteggio di previsione) del guasto k aumenta, il parametro ha un **effetto positivo** (è una delle cause scatenanti del guasto k);
- Se il punteggio diminuisce, il parametro ha un **effetto negativo** (non è tra le cause del guasto k);
- Maggiore è il valore assoluto del contributo marginale, più significativo è il ruolo del parametro i nella diagnosi del guasto.

## Dal Contributo Marginale al valore SHAP{#SHAP}
Per un singolo parametro esistono molteplici contributi marginali, poiché l'insieme di parametri S può essere combinato in molti modi.

Ad esempio: se abbiamo 4 parametri termodinamici (P1-P4), per calcolare il contributo di P1, esistono 8 possibili combinazioni dell'insieme S che non includono P1 (es. {P2,P3,P4}, {P2,P3}, ..., fino all'insieme vuoto ∅). Di conseguenza, P1 avrà 8 contributi marginali diversi.

Il valore SHAP è la **media pesata** di tutti questi contributi marginali, calcolata con la seguente formula:
$$ \phi_{\scriptscriptstyle i}(f,x) = \sum_{S \subseteq N \setminus \{i\}} \frac{|S|!(n - |S| - 1)!}{n!} [f(S \cup \{i\}) - f(S)] $$
dove n è il numero totale di parametri e $|S|$ è il numero di parametri nell'insieme S.

Il valore SHAP indica l'importanza di quel parametro nella diagnosi: più alto è il valore SHAP, maggiore è l'impatto del parametro sulla classificazione del guasto da parte del modello.

## Tree SHAP: Accelerare i calcoli{#Tree}
Il calcolo normale dei valori SHAP richiede di analizzare tutte le combinazioni di parametri, il che è estremamente inefficiente. Tree SHAP sfrutta la struttura gerarchica degli alberi decisionali per calcolare i valori SHAP direttamente attraverso i contributi dei nodi di divisione lungo il percorso. In questo modo, è necessario calcolare solo i parametri lungo il **percorso effettivamente intrapreso** dal campione nell'albero, migliorando drasticamente l'efficienza.

### Esempio illustrativo：
<img src="/it图片1.png" style="width: 50%; margin: 0 auto; display: block;" />
<p align="center" style="color: grey">Diagramma del percorso Tree SHAP</p>
Supponendo un albero decisionale composto da 4 parametri: mentre lo SHAP standard dovrebbe calcolare tutte le combinazioni, se un campione segue il percorso "Parametro 1 → Parametro 2 → Parametro 3 → Guasto 2", Tree SHAP calcolerà solo le combinazioni relative a questi tre parametri, semplificando il processo.

## Analisi dell'interpretabilità (Esempio: Guasto F4 - Usura delle fasce elastiche){#analisi}
![图片描述](/it图片2.png)
L'immagine sopra mostra l'analisi dei valori SHAP per l'usura delle fasce elastiche (guasto F4). La figura (a) è un grafico a cascata (Waterfall plot), mentre la figura (b) è un grafico a sciame (Beeswarm plot).

### 1. Grafico a cascata (Fig. a)
- Scopo: Spiegare il motivo della diagnosi per un **singolo campione** di guasto
- Logica: Parte dal livello di previsione medio del modello per tutti i campioni E[f(X)] = -1.797 e somma i valori SHAP di ogni parametro, arrivando al punteggio finale di 1.464 per quel campione.
- Conclusione chiave: Tra i parametri rossi (effetto positivo) e blu (effetto negativo), **P12 (Temp. scarico pre-turbina), P6 (Flusso calore blow-by), P14 (Temp. scarico post-turbina) e P7 (Temp. scarico post-turbina)** hanno i valori SHAP assoluti più alti, rappresentando le cause principali per cui questo campione è stato classificato come F4.

### 2. Grafico a sciame (Fig. b)
- Scopo: Mostrare l'importanza globale dei parametri per **tutti i campioni** di guasto F4.
- Logica: L'asse verticale elenca i parametri, l'asse orizzontale mostra i valori SHAP. Più un parametro è in alto e maggiore è il suo valore SHAP, più è critico per la diagnosi.
- Conclusioni chiave:
  - P11 (Pressione scarico pre-turbina) ha il valore SHAP medio più alto, rendendolo l'indicatore principale globale per il guasto F4.
  - I campioni con valori bassi di P11 si distribuiscono nell'area SHAP positiva, indicando che una "P11 troppo bassa" è la caratteristica principale dell'usura delle fasce elastiche.
  - Meccanismo fisico: L'usura delle fasce causa il fallimento della tenuta → aumento del blow-by (trafilamento gas) → squilibrio termodinamico del sistema di scarico → diminuzione di P11.

### 3. Conclusione Principale
Le cause principali del guasto da usura delle fasce elastiche della camera di combustione di un motore diesel marino (Guasto F4) sono:
- Pressione allo scarico pre-turbina (P11) troppo bassa;
- Temperatura allo scarico pre-turbina (P12) troppo bassa;
- Temperatura allo scarico post-turbina (P7) troppo bassa;
- Flusso di calore da trafilamento (P6) troppo alto.

## Letteratura Originale{#letteratura}
C. Luo, M. Zhao, X. Fu, S. Zhong, S. Fu, K. Zhang, X. Yu. Thermodynamic simulation-assisted random forest: Towards explainable fault diagnosis of combustion chamber components of marine diesel engines [J]. Measurement, 2025, 251: 117252.

<br>
<hr>
<div style="display: flex; justify-content: flex-end; padding: 20px 0;">
  <a href="https://ts-rf.github.io/it/" 
     style="text-decoration: none; color: inherit; border: 1px solid #e2e2e3; padding: 12px 24px; border-radius: 8px; transition: border-color 0.25s; background-color: var(--vp-c-bg-soft);">
    <div style="font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 4px;">Letteratura Originale</div>
    <div style="font-size: 16px; color: var(--vp-c-brand); font-weight: 600;">Clicca qui →</div>
  </a>
</div>
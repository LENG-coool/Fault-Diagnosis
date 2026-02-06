# Erklärbare Fehlerdiagnose auf Basis von SHAP + Thermodynamik‑Simulationsgestütztem Random Forest
## Einleitung {#einleitung}
Heute möchte ich einen aktuellen Forschungsartikel aus dem Journal **Measurement** präsentieren: **„Thermodynamic Simulation-assisted Random Forest: Towards explainable fault diagnosis of combustion chamber components of marine diesel engines"**.

In der Künstlichen Intelligenz begegnen uns häufig paradoxe Situationen: Modelle mit 99 % Genauigkeit, die Ingenieure jedoch nicht verwenden möchten. Warum? In sicherheitskritischen Bereichen (wie der Fehlerdiagnose von Schiffsdieselmotoren) genügt eine Black‑Box‑Vorhersage nicht. Wir brauchen Erklärbarkeit.

Dieser Artikel zeigt nicht nur, wie man **Thermodynamik‑Simulation mit Random Forest (RF)** kombiniert, sondern demonstriert auch die tiefe Anwendung des SHAP‑Algorithmus. Damit eröffnet sich eine neue „Perspektive" für die Fehlerdiagnose komplexer Systeme: Präzise Fehlererkennung plus Aufklärung der zugrundeliegenden thermodynamischen Parameter.

## Marginale Beiträge {#marginale-beiträge}
Das Kernziel von SHAP lautet: Wie viel trägt ein einzelnes Merkmal zur Gesamtvorhersage bei? Im Kontext der Fehlerdiagnose: Welcher thermodynamische Parameter hat das Modell zur Fehlererkennung bewogen?

Eine klassische Fehlerdiagnose endet nach Training, Eingabe und Ausgabe. Die erklärbare Variante dekonstruiert rückwärts und quantifiziert die Beiträge der Parameter nach folgendem Prinzip:

Mit Random Forest beispielsweise: Das Modell enthält viele Entscheidungsbäume, jeder klassifiziert unabhängig. Die Mehrheit ihrer Stimmen bestimmt die diagnostizierte Fehlerklasse k, mit Vorhersagepunktzahl f = Anzahl Bäume mit Stimme für k.

Nach Eingabe der Daten ist f(S∪{i}) die Vorhersagepunktzahl bei Parametergruppe S vereinigt mit Parameter i. Der marginale Beitrag eines einzelnen Parameters i ergibt sich aus der Differenz zwischen Vorhersagepunktzahl mit und ohne i:
$$ \Delta \phi_{\scriptscriptstyle i}(S) = f(S \cup \{i\}) - f(S) $$

Der marginale Beitrag von Parameter i zeigt seine Rolle bei der Diagnose von Fehler k – mit Richtung und Magnitude:
- Erhöht sich die Vorhersagepunktzahl für Fehler k nach Einführung von Parameter i: Parameter i wirkt **positiv** auf Fehler k (ist eine Ursache).
- Sinkt die Vorhersagepunktzahl: Parameter i wirkt **negativ** auf Fehler k (ist keine Ursache).
- Je höher der marginale Beitrag, desto dominanter ist Parameter i bei der Fehlerursachenanalyse.

## Vom marginalen Beitrag zum SHAP‑Wert {#shap-wert}
Für einen Parameter existieren mehrere marginale Beiträge – da es verschiedene Kombinationen der Parametergruppe S gibt.

Beispiel: Mit 4 thermodynamischen Parametern P1–P4 gibt es bei der Berechnung von P1s Beitrag 8 mögliche Parametergruppen ohne P1 (von {P2,P3,P4} bis ∅), also 8 marginale Beiträge für P1.

Der SHAP‑Wert ist der **gewichtete Durchschnitt** aller marginalen Beiträge eines Parameters:
$$ \phi_{\scriptscriptstyle i}(f,x) = \sum_{S \subseteq N \setminus \{i\}} \frac{|S|!(n - |S| - 1)!}{n!} [f(S \cup \{i\}) - f(S)] $$
Dabei ist n die Gesamtzahl der Parameter und |S| die Größe der Menge S.

Der SHAP‑Wert quantifiziert die Bedeutung eines Parameters in der Fehlerdiagnose: Je höher der SHAP‑Wert, desto größer die Auswirkung auf die Klassifizierung. Dadurch lassen sich Kernparameter identifizieren.

## Tree SHAP: Effiziente Berechnung {#tree}
Die normale SHAP‑Berechnung benötigt die Durchsuchung aller Parameterkombinationen – extrem ineffizient. Tree SHAP nutzt die hierarchische Struktur von Entscheidungsbäumen und berechnet SHAP‑Werte direkt anhand der Pfade: Nur Parameter auf dem **tatsächlichen Pfad des Samples** werden berechnet, was die Effizienz drastisch verbessert.

### Illustratives Beispiel:
<img src="/图片1.png" style="width: 50%; margin: 0 auto; display: block;" />
<p align="center" style="color: grey">Tree SHAP Pfaddiagramm</p>
Wie abgebildet: Für einen Entscheidungsbaum mit 4 Parametern würde normales SHAP alle Kombinationen berechnen. Nimmt das Sample den Pfad „Parameter 1 → Parameter 2 → Parameter 3 → Fehler 2", berechnete Tree SHAP nur diese 3 Parameter – eine erhebliche Vereinfachung.

## Erklärbarkeitsanalyse (am Beispiel von Kolbenring‑Verschleiß, Fehler F4) {#erklärbarkeitsanalyse}
![Bildbeschreibung](/图片2.png)
Oben ist eine multidimensionale SHAP‑Werteanalyse für Kolbenring‑Verschleiß (Fehler F4) gezeigt: (a) Wasserfall‑Diagramm; (b) Bienenschwarm‑Diagramm.

### 1. Wasserfall‑Diagramm (Abb. a)
- Zweck: Erklärt die Diagnose **eines einzelnen F4‑Fehlerfalls**;
- Logik: Beginnend vom Durchschnittswert E[f(X)] = ‑1.797, werden SHAP‑Werte aller Parameter addiert, bis die Vorhersagepunktzahl 1.464 des Samples erreicht ist;
- Kernschlussfolgerung: Unter den roten (positiv) und blauen (negativ) Parametern haben **P12 (Abgastemperatur vor Turbolader), P6 (Blow‑by‑Wärmestrom), P14 (Abgastemperatur nach Turbolader), P7 (Abgastemperatur nach Turbolader)** die größten SHAP‑Absolutwerte und sind damit die Kernursachen für die F4‑Diagnose.

### 2. Bienenschwarm‑Diagramm (Abb. b)
- Zweck: Zeigt die **globale Parameterbedeutsamkeit aller F4‑Fehler**;
- Logik: Vertikale Achse = Parameter, horizontale = SHAP‑Wert (obere Achse = mittlerer SHAP‑Wert), oben positionierte Parameter mit höherem SHAP sind kritischer;
- Kernschlussfolgerung:
  - P11 (Abgasdruck vor Turbolader) hat den höchsten mittleren SHAP‑Wert – globales Kernmerkmal für F4;
  - P11‑Niedrigwertsamples konzentrieren sich auf SHAP‑positive Regionen (positive Auswirkung), zeigt: „Niedriges P11" ist ein Hauptmerkmal des Kolbenring‑Verschleißes;
  - Im physikalischen Zusammenhang: Kolbenring‑Verschleiß → Dichtungsverlust → erhöhter Blow‑by → Thermodynamisches Ungleichgewicht im Abgassystem → P11 sinkt.

### 3. Kernschlussfolgerung
Die Hauptursachen des Kolbenring‑Verschleißes (F4) in Schiffs‑Dieselmotoren sind:
- P11 Abgasdruck vor Turbolader ist zu niedrig;
- P12 Abgastemperatur vor Turbolader ist zu niedrig;
- P7 Abgastemperatur nach Turbolader ist zu niedrig;
- P6 Blow‑by‑Wärmestrom ist zu hoch.

## Originalpublikation {#originalpublikation}
*C. Luo, M. Zhao, X. Fu, S. Zhong, S. Fu, K. Zhang, X. Yu. Thermodynamic simulation-assisted random forest: Towards explainable fault diagnosis of combustion chamber components of marine diesel engines [J]. Measurement, 2025, 251: 117252.*

<br>
<hr>
<div style="display: flex; justify-content: flex-end; padding: 20px 0;">
  <a href="https://ts-rf.github.io/zh-CN/" 
     style="text-decoration: none; color: inherit; border: 1px solid #e2e2e3; padding: 12px 24px; border-radius: 8px; transition: border-color 0.25s; background-color: var(--vp-c-bg-soft);">
    <div style="font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 4px;">Originalpublikation</div>
    <div style="font-size: 16px; color: var(--vp-c-brand); font-weight: 600;">Hier klicken →</div>
  </a>
</div>

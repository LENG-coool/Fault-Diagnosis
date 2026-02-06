# Ein neuer Ansatz für erklärbare Fehlerdiagnose:
# Thermodynamik‑Simulationsgestützter Random Forest (TSRF)

<br>

::: info [**Originalpublikation📜:**](/TSRF.pdf)
*Thermodynamic Simulation-assisted Random Forest: Towards explainable fault diagnosis of combustion chamber components of marine diesel engines*, **Measurement**, 2025.
:::

## Einleitung {#einleitung}
In der Fehlerdiagnose von Diesel‑Verbrennungskammern stehen die Ingenieurpraxis seit Langem vor drei gravierenden Herausforderungen:
1. **Datenknappheit**: Die Seltenheit realer Fehlerproben begrenzt die Trainingsleistung von Deep‑Learning‑Modellen.
2. **Schwierige Umsetzung von Mechanismen**: Reine physikalische Modelle sind aufgrund der hohen Rechenkomplexität schwer in Echtzeit anwendbar.
3. **Black‑Box‑Problematik**: Klassische Modelle sind häufig nicht erklärbar und erlauben keine Rückverfolgung der zugrunde liegenden Ursachen.

Um diese Probleme zu adressieren, schlägt der in **Measurement** veröffentlichte Beitrag einen innovativen Ansatz vor: Physikalische Simulation unterstützt das Machine‑Learning‑Modell, anstatt dass ausschließlich Daten die Physik „lernen“. Dadurch steigen Erklärbarkeit und Zuverlässigkeit der Diagnose.

Auf dieser Grundlage wird der **Thermodynamik‑Simulationsgestützte Random Forest** eingeführt – ein Rahmenwerk, das thermodynamische Mechanismen mit erklärbarem Machine Learning verbindet. In kleinen Datenszenarien erzielt die Methode hohe Diagnosegenauigkeit und bleibt zugleich konsistent mit physikalischen Modellen – mit klarem Praxisnutzen.

## Gesamtrahmen des Thermodynamik‑Simulationsgestützten Random Forest {#rahmen}
Das TSRF‑Framework (Thermodynamic Simulation‑assisted Random Forest) integriert ein eindimensionales thermodynamisches Modell, einen Random‑Forest‑Klassifikator sowie einen SHAP‑Erklärer zu einem geschlossenen Diagnosesystem.
1. **Datengenerierung und Vorverarbeitung**: Thermodynamische Simulation erzeugt ein kombiniertes Datenset aus Normal‑ und Fehlerzuständen und bereitet es auf.
2. **Modelltraining und Validierung**: Der Random Forest wird auf den vorverarbeiteten Daten trainiert und per Kreuzvalidierung bewertet.
3. **Erklärbarkeitsanalyse**: SHAP erklärt das trainierte Modell und identifiziert die relevanten thermodynamischen Parameter und deren Beitrag zur Diagnose.
<img src="/图片8.png" style="width: 100%; margin: 0 auto; display: block;" />
<p align="center" style="color: grey">Schematische Darstellung des TSRF‑Rahmens</p>

## Aufbau und Kalibrierung des eindimensionalen Thermodynamikmodells {#modell}
Zunächst wird ein **eindimensionales thermodynamisches Modell** aufgebaut, das das thermodynamische Verhalten der Diesel‑Verbrennungskammer simuliert. Durch den Abgleich mit Messdaten wird das Modell fein kalibriert, um reale Betriebszustände zuverlässig abzubilden.
<img src="/图片7.png"  style="width: 100%; margin: 0 auto; display: block;" />
<p align="center" style="color: grey">Schematische Darstellung des eindimensionalen Diesel‑Thermodynamikmodells</p>

Zusätzlich wird das Modell mit realen Betriebsdaten aus dem **Data Collection Module (DCM)** kalibriert, um die Übereinstimmung der wichtigsten thermodynamischen Parameter zwischen Simulation und Realität sicherzustellen.
<img src="/图片6.png" style="width: 60%; margin: 0 auto; display: block;" />
<p align="center" style="color: grey">Data Collection Module (DCM)</p>

## Physikalische Modellierung und Simulation typischer Verbrennungskammerfehler {#fehler-modellierung}
Nach der Kalibrierung werden gezielte Störungen an Schlüsselparametern der Verbrennungskammer vorgenommen, um fünf typische Fehlerarten zu simulieren – jeweils mit klarer physikalischer Begründung.
| Fehler‑Nr. | Fehlertyp        | Physikalischer Mechanismus                                     | Zentrale Parameteranpassung                                  |
| ---- | --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| F1   | Zylinderkopfriss | Thermo‑mechanische Lasten verursachen Risse; Struktur und Wärmeabfuhr verschlechtern sich | Zylinderkopf‑Oberflächentemperatur $T_H$ auf 346 °C erhöhen |
| F2   | Kolbenabbrand    | Materialdegradation führt zu thermischem Abbrand, verstärkt Blow‑by | Kolbentemperatur $T_P$ erhöhen + leichter Blow‑by (0,01 kg/s) |
| F3   | Zylinderlaufbuchsen‑Verschleiß | Partikel führen zu Geometrieänderung und starker Dichtungsverschlechterung | Zylinderdurchmesser erhöhen + starker Blow‑by (0,03 kg/s) |
| F4   | Kolbenring‑Verschleiß | Verschleiß verformt Dichtung und erzeugt eine Blow‑by‑Rückkopplung | Blow‑by‑Massenstrom auf 0,02 kg/s anpassen |
| F5   | Kolbenring‑Festkleben | Ablagerungen, unzureichende Schmierung und Ölschlamm | Zylinderdurchmesser ändern + Laufbuchsentemperatur erhöhen + Blow‑by |

Die obige Fehlermodellierung erzeugt ein Datenset mit Normal‑ und Fehlerzuständen und liefert hochwertige Eingaben für das Machine‑Learning‑Modell.

## Merkmalsauswahl auf Basis von RF und SHAP {#merkmalsauswahl}
Nach Aufbau des Datensets wird ein **Random Forest (RF)** als Kernmodell zur Fehlerdiagnose eingesetzt. Zur Verbesserung der Erklärbarkeit wird **SHAP (SHapley Additive exPlanations)** verwendet, um die Modellentscheidungen detailliert zu analysieren.

Es wird eine zweistufige Strategie genutzt:

1. Voridentifikation durch Random Forest
- RF lernt die Abbildung zwischen Parametern und Fehlertypen.
- Aus den Vorhersagescores werden die marginalen Beiträge der Parameter abgeleitet.

2. Quantitative Tree‑SHAP‑Analyse
- Berechnung der SHAP‑Werte für alle Parameter.
- Auswahl der Parameter mit dem größten Beitrag und klarer physikalischer Bedeutung.
<img src="/图片9.png" style="width: 100%; " />
<p align="center" style="color: grey">Merkmalsauswahl basierend auf SHAP‑Werten</p>

## Versuchsergebnisse und Leistungsbewertung {#ergebnisse}
Die Experimente belegen die Wirksamkeit des TSRF‑Frameworks. Selbst bei kleinen Datensätzen wird eine Diagnosegenauigkeit von über 95 % erreicht, was klassische Black‑Box‑Modelle deutlich übertrifft.

Darüber hinaus zeigt die SHAP‑Analyse die Bedeutung thermodynamischer Parameter für unterschiedliche Fehlertypen auf und liefert wertvolle Hinweise für die Ursachenanalyse in der Praxis.

<br>
<hr>
<div style="display: flex; justify-content: flex-end; padding: 20px 0;">
	<a href="https://ts-rf.github.io/zh-CN/" 
		 style="text-decoration: none; color: inherit; border: 1px solid #e2e2e3; padding: 12px 24px; border-radius: 8px; transition: border-color 0.25s; background-color: var(--vp-c-bg-soft);">
		<div style="font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 4px;">Mehr erfahren</div>
		<div style="font-size: 16px; color: var(--vp-c-brand); font-weight: 600;">Hier klicken →</div>
	</a>
</div>

---
name: L'évaluation des risques (interview intervieweur / responsable HSE) — capsule métro 2D (5 min 24), papier cramé + cercles dorés, transitions gyrophare avec alarme, rubalise, pastille « qui parle »
section: assets
slug: eval-risques-interview
description: Capsule verticale 1080 × 1920 sur la voix d'origine d'une interview. Habillage papier cramé + deux cercles dorés, bordure de marquage au sol, ligne de métro à 12 stations, sept guichets ouverts par la transition gyrophare + alarme, faisceau gyrophare à chaque changement de titre, rubalise (ruban diagonal, barrière qui se lève, ruban qui se déroule, zones délimitées), bandeaux de référence normative ISO 45001. Briques nouvelles - `ErSpeaker` (pastille INTERVIEWEUR / RESPONSABLE HSE avec ondes de voix), `RMatrix` (matrice gravité × probabilité 5 × 5, axes qui se tracent, jeton qui tombe dans la case), `Gears3` (trois engrenages numérotés qui s'entraînent), `StartGate` (démarrage des travaux verrouillé jusqu'à la fin du processus), `ExpoLine` (mesures de contrôle posées avant l'exposition), `GasScene` (espace confiné : extraction des gaz dans le mauvais puis le bon ordre), `RiskDial` (cadran du niveau de risque qui monte puis redescend), `PaperSign` (papier signé en vitesse puis archivé), `Rain` (averse). Réutilise PicFX, PhotoScan, PhotoLoupe, PhotoWall, PhotoShatter, PhotoCompare, StepTrack, NumList, CheckList, LoopN, Counter, Crossed, Stamp2, Medal, VerbCard.
quand: Capsule pédagogique longue sur une interview ou un dialogue (question / réponse) ; méthode d'évaluation des risques, DUERP, matrice gravité × probabilité, anticipation, révision d'une analyse de risques.
component: src/evalRisquesInterviewMetro/EvalRisquesInterviewMetro.tsx
demo: Demo-EvalRisquesInterviewMetro
tags: [évaluation des risques, interview, ISO 45001, matrice, gravité, probabilité, anticipation, espace confiné, révision, métro, gyrophare, rubalise, photos animées, 2D]
---

## Utilisation
Composition `EvalRisquesInterviewMetro`. `ER_Q` liste les plages où parle l'intervieweur. `RMatrix`, `RiskDial`, `GasScene` et `PaperSign` se réutilisent pour toute capsule sur l'analyse de risques.

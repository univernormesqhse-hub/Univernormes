---
name: Analyse des risques — capsule métro 2D (7 min 37) refaite d'après une présentation, titre en lettres-photos animées, édifice SST qui s'effondre, tableau des méthodes surligné, 30 % / 22 %, grille de 100 actions triée, transitions gyrophare avec carillon
section: assets
slug: analyse-risques-terrain
description: Capsule verticale 1080 × 1920 sur la voix d'origine d'une présentation sur le choix de la méthode d'évaluation des risques (enjeux de la maîtrise, contexte de l'organisation, cartographie des méthodes, épreuve objective terrain, évolution et amélioration continue). Habillage papier cramé + deux cercles dorés, bordure de marquage au sol, ligne de métro à 12 stations, transitions gyrophare + carillon montant, tintement à chaque titre, rubalise, bandeaux ISO. Briques nouvelles - `ArMorph` (document réglementaire dissous en particules qui reforment un cadran de pilotage), `ArBuilding` (socle / piliers / toit, effondrement quand le socle est retiré), `ArDistance` (bureau ↔ terrain, perception du danger qui se brouille), `ArBridge` (prescrit / réel et pont qui comble le fossé), `ArSizes` (bâtiments selon la taille + jauge de formalisme), `ArVenn` (trois cercles qui convergent), `ArTable` (tableau construit ligne à ligne, surlignage au fil de la voix), `ArPriori` (ligne du temps avant / après l'accident), `ArStat` (grand pourcentage sur histogramme qui chute), `ArMerge` (deux cartes fusionnent en « synergie »), `ArActions` (grille de 100 cases qui se trie par priorité), `ArRings` (périmètre d'analyse en anneaux jusqu'aux RPS). Réutilise PicFX, PhotoRadar, NumList, Scale2, Crossed, Stamp2, Medal.
quand: Capsule sur l'évaluation des risques professionnels, le choix d'une méthode (AMDEC, APR, OiRA, MOSAR, Kinney, arbre des causes), l'analyse du contexte, les retours terrain chiffrés, la digitalisation du DUERP et les RPS.
component: src/analyseRisquesTerrainMetro/AnalyseRisquesTerrainMetro.tsx
demo: Demo-AnalyseRisquesTerrainMetro
tags: [évaluation des risques, AMDEC, APR, DUERP, OiRA, MOSAR, Kinney, arbre des causes, RPS, contexte, métro, gyrophare, rubalise, photos animées, 2D]
---

## Utilisation
Composition `AnalyseRisquesTerrainMetro`. `ArTable`, `ArStat`, `ArActions`, `ArBuilding` et `ArRings` se réutilisent pour toute capsule sur les méthodes d'analyse ou les résultats chiffrés.

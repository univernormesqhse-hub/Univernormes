---
name: La méthode AMDEC en 5 étapes — capsule métro (3 min 53) sur fond papier cramé et cercles dorés, photos du dépôt animées, fil des 5 étapes, chaîne causes → défaillance → effets, formule G × F × D = C, barres de priorité, transitions gyrophare + alarme
section: assets
slug: amdec-cinq-etapes
description: Capsule métro (voix d'origine) sur l'habillage `regles-or-papier` (`PaperGoldBg`, `DemingCorner`, bordure marquage au sol, couverture `KTriptych` Identifier / Évaluer / Agir, titre en lettres-photos « AMDEC / 5 ÉTAPES »), six guichets ouverts par la transition `Gyro` avec `alarme`. Réutilise les boîtes à outils `dix-outils-qhse`, `coordonnateur-hse` (`VerbCard`) et `criteres-smi` (`StepTrack`) et ajoute : `CauseChain` (trois cartes-photo causes → défaillance → effets reliées par des flèches qui se tracent), `Formula` (tuiles G × F × D = C qui s'assemblent, résultat doré qui pulse), `PriorityBars` (barres colorées du vert au rouge selon la hauteur, qui montent puis se réordonnent, « PRIORITÉ » sur la plus haute), `TwoCurves` (courbe des risques qui baisse, courbe des performances qui monte), `lerpC` (interpolation de couleur hexadécimale).
quand: Méthodes d'analyse de risques en étapes (AMDEC, HAZOP, APR), criticité / cotation G × F × D, priorisation, passage du réactif au proactif, amélioration continue.
component: src/amdecCinqEtapes/AmdecCinqEtapesMetro.tsx
demo: Demo-AmdecCinqEtapesMetro
tags: [AMDEC, défaillance, criticité, gravité, fréquence, détectabilité, priorités, actions correctives, suivi, prévention, photos animées, gyrophare, alarme, fond papier, 2D, métro]
---

## Utilisation
`CauseChain y items=[[src, l, c, at]]` (3 éléments) ; `Formula y at eq` ; `PriorityBars y at sort` ; `TwoCurves y at at2`.

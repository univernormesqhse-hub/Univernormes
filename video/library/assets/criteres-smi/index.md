---
name: Critères QHSE via le SMI — capsule métro (4 min 04) sur fond papier cramé et cercles dorés, photos du dépôt animées, fil des 7 étapes, absorption Q / H / S / E dans le noyau SMI, transitions gyrophare + alarme
section: assets
slug: criteres-smi
description: Capsule métro (voix d'origine) sur l'habillage `regles-or-papier` (`PaperGoldBg`, `DemingCorner`, bordure marquage au sol, couverture `KTriptych` Planifier / Intégrer / Certifier, titre en lettres-photos « SMI / INTÉGRÉ »), cinq guichets ouverts par la transition `Gyro` avec `alarme`. Réutilise les boîtes à outils de `dix-outils-qhse` (photos) et `coordonnateur-hse` (`Bridge`, `DataFlow`) et ajoute : `StepTrack` (fil de N étapes numérotées, la courante en or qui pulse, les passées cochées, barre de progression dorée), `VarOrbit` (photo ronde au centre, pastilles-variables en orbite reliées par des pointillés), `Absorb` (photos rondes des politiques qui convergent vers un noyau « SMI » qui grossit, ondes dorées), `LoopN` (boucle de N nœuds avec flèches qui tournent), `OrBadge` (« OU » qui pivote entre deux options).
quand: Démarches en étapes numérotées (mise en place d'un SMI, certification, projet), choix entre deux options (interne / externe), intégration de plusieurs politiques dans un système unique, boucle d'amélioration continue.
component: src/criteresSmiMetro/CriteresSmiMetro.tsx
demo: Demo-CriteresSmiMetro
tags: [SMI, système de management intégré, QHSE, étapes, charte, ICP, indicateurs, certification, amélioration continue, photos animées, gyrophare, alarme, fond papier, 2D, métro]
---

## Utilisation
`StepTrack y at end steps=[[libellé, t]]` ; `VarOrbit src at cx cy R items=[[l, ic, c, at]]` ; `Absorb at pull cx cy items=[[src, l, c]]` ; `LoopN cx cy r at nodes=[[l, ic, c, at]]` ; `OrBadge x y at`.

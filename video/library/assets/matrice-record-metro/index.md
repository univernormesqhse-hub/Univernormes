---
name: La matrice des risques 4 × 4 « record » — condensé des techniques de la session (particules, lettres et chiffres 3D, ombres, molettes de réglage, dé balistique, vitre qui éclate, matrice en colonnes, échafaudage, podium, recherche + carrousel) et couverture avec la matrice d'évaluation en perspective
section: assets
slug: matrice-record-metro
description: Capsule métro (1 min 05, voix d'origine) à cinq guichets et neuf stations (gyrophare `TK = 3.4`, cadre de marquage au sol jaune / noir, recherche qui ouvre un carrousel 3D d'images du dépôt, NeoCaptions, aucune musique) qui combine les packs WebGL de la session et ajoute `src/matriceRecordMetro/MxGL.tsx` — `Dice` (dé aux arêtes arrondies, points creux, lancé en rotation balistique), `Knob` (molette crantée graduée 1 à 4, index qui tourne jusqu'à la valeur), `Matrix16` (matrice 4 × 4 en colonnes, hauteur = P × G, couleur vert → rouge, faisceaux de croisement, case cible qui monte et pulse, chiffres d'axes en volume), `Scaffold` (échafaudage tubulaire généré par code), `Podium` (trois marches), `riskCol`. Couverture : `KMatrix`, matrice d'évaluation 4 × 4 en perspective (DOM), case « 12 » qui pulse, axes Probabilité / Gravité, sigles en orbite autour. Scènes — `MxIntro` (particules « 4 × 4 », la matrice se dresse), `MxTwo` (« SIMPLE » avec flou de mouvement, deux molettes), `MxCriteria` (dé pour la probabilité, vitre qui éclate pour la gravité), `MxCross` (échelle 1 à 4, croisement), `MxCase` (échafaudage et opérateur en hauteur, molettes 3 et 4, calcul 3 × 4 = 12 en chiffres 3D, case qui s'embrase, étincelles), `MxRemember` (podium bien / mieux / indispensable, casque), `MxAsk` (recherche + carrousel).
quand: Matrice des risques, cotation probabilité × gravité, criticité, hiérarchisation des risques, évaluation des risques professionnels, travail en hauteur ; toute capsule « condensé » qui doit montrer le plus de techniques possible.
component: src/matriceRecordMetro/MatriceRecordMetro.tsx
demo: Demo-MatriceRecord
tags: [matrice des risques, 4x4, probabilité, gravité, criticité, WebGL, condensé, métro]
---

## Utilisation
`Matrix16 u at target tq sweepP sweepG heights` ; `Knob pos v c label s` (v 0 → 1 pour 1 → 4) ; `Dice pos rot s` ; `Scaffold pos levels grow` ; `Podium steps u pos` (`[instant, libellé, couleur]`).

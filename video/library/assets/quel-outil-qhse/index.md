---
name: Quel outil QHSE choisir ? — capsule métro (6 min 16) sur fond papier cramé et cercles dorés, 8 outils (5S, QQOQCCP, Ishikawa + 5M, Pareto, AMDEC, SWOT, audit interne, PDCA), photos du dépôt animées, schémas propres à chaque outil, transitions variées (rubalise, damier, encre, gyrophare + alarme), bandeaux de référence normative
section: assets
slug: quel-outil-qhse
description: Capsule métro (voix d'origine) sur l'habillage `regles-or-papier` (`PaperGoldBg`, `DemingCorner`, bordure marquage au sol, couverture `KTriptych` Analyser / Prioriser / Vérifier, titre en lettres-photos « QUEL OUTIL / QHSE CHOISIR ? »), six guichets ouverts par la transition `Gyro` avec `alarme`. Ajoute `ToolGrid` (8 tuiles-outils qui tombent et s'allument par étape), `LetterTiles` (lettres d'un acronyme qui tombent et se posent), `FishBone` (arête d'Ishikawa : arête centrale, 5 arêtes avec médaillons photo et étiquettes, tête « ANOMALIE »), `ParetoChart` (barres décroissantes, courbe cumulée, séparation 20 % / 80 %, barres vitales en rouge, sans autre chiffre), `SwotGrid` (matrice SWOT en tuiles-photo qui s'allument), `ToolCheat` (antisèche « besoin → outil » qui se remplit ligne à ligne), `BigWord` (mot doré qui claque). Réutilise `ToolBanner` (`kind` BESOIN / OUTIL), `LoopN` (roue des sept questions, roue PDCA), `PhotoCompare`, `PhotoRadar`, `PhotoScan`, `PhotoWall`, `PhotoRing`, `SearchOpen` + `FilmStrip`, et le kit rubalise (`TapeFX`, `NormRef`) mêlé aux transitions damier et encre.
quand: Panorama d'outils ou de méthodes (qualité, sécurité, environnement, management), « quel outil pour quel problème », guide de choix, antisèche, capsule de synthèse.
component: src/quelOutilQhseMetro/QuelOutilQhseMetro.tsx
demo: Demo-QuelOutilQhseMetro
tags: [outils QHSE, 5S, QQOQCCP, Ishikawa, 5M, Pareto, 80/20, AMDEC, SWOT, audit interne, PDCA, amélioration continue, antisèche, rubalise, référence normative, photos animées, gyrophare, alarme, fond papier, 2D, métro]
---

## Utilisation
`ToolGrid y at lit` ; `LetterTiles y at word c s step` ; `FishBone y at head items=[[src, label, at]×5]` ; `ParetoChart y at split vital res` ; `SwotGrid y at items=[[src, lettre, label, couleur, at]×4]` ; `ToolCheat y at rows=[[besoin, outil, couleur]] step` ; `BigWord y at l fs out`.

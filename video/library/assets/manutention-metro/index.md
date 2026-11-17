---
name: Manutention manuelle vs mécanique — capsule métro 2D (fond blanc, roue de Deming « QHSE », bordure marquage jaune / noir, triptyque), carton de A à B, gestes qui partent dans leur direction, escalier du diable à la grue, balance qui penche, 25 kg face aux tonnes
section: assets
slug: manutention-metro
description: Capsule métro (4 min 13, voix d'origine) entièrement en 2D sur l'habillage de `acteurs-prevention-hse` (`WhiteBg`, `DemingCorner`, bordure marquage au sol, couverture `KTriptych` Manuelle / Mécanique / Le bon choix), sept guichets et douze stations, recherche qui ouvre un film photo 2D, NeoCaptions, aucune musique. Nouveaux outils 2D — `VerbTile` (tuile-verbe qui oscille dans sa direction : soulever ↑, pousser →, tirer ←), `Crossed` (idée écartée barrée), `CmpBar` (barre de comparaison gauche / droite) ; scènes `ManIntro` (carton qui voyage de A à B, « OU » qui tourne, trois conséquences), `ManHuman` (définition, trois gestes, exemples en tiroirs, dilemme en deux colonnes), `ManMachine` (« INVERSÉ » qui se retourne, escalier du plus simple au plus complexe, jauge de productivité, contrepartie), `ManVersus` (VS, balance qui penche, barres de comparaison par critère), `ManKilos` (kettlebell qui compte jusqu'à 25 kg puis colonne « TONNES »), `ManChoice` (règle en deux colonnes), `ManFuture` (robot face à la main qui pâlit puis se rallume). Réutilise `DrawWord`, `Fold`, `Stamp2`, `NumList`, `PopChip`, `ArcGauge`, `Trace`, `FilmStrip`.
quand: Manutention manuelle ou mécanique, port de charges, chariots élévateurs, CACES, TMS, choix d'un équipement ; toute capsule « A contre B » à trancher par critères, sur fond blanc sans 3D.
component: src/manutentionMetro/ManutentionMetro.tsx
demo: Demo-ManutentionMetro
tags: [manutention, port de charges, chariot élévateur, CACES, comparaison, balance, fond blanc, 2D, métro]
---

## Utilisation
`VerbTile x y at l ic c dx dy` ; `Crossed x y w at strike l fs` ; `CmpBar x y w v at c l right`.

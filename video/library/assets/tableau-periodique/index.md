---
name: Afficheur à palettes + fiche 3D + tableau périodique des normes
section: assets
slug: tableau-periodique
description: Pour chaque élément d'une liste de référentiels : afficheur à palettes façon aéroport (chaque chiffre défile puis se fige avec un claquement, ligne de pli centrale, lueur colorée), fiche photo qui pivote en 3D (rotateY + translateZ + reflet), tuile façon tableau périodique (numéro, symbole court, domaine, marqueur « G » pour les guides) et domaine tapé à la voix, mini tableau 5 × 3 en coin qui se remplit ; final : les 15 tuiles volent depuis des positions 3D dispersées, s'assemblent en « tableau périodique des normes ISO », vague lumineuse diagonale, décompte certifiables / guides.
quand: Présenter une famille de référentiels, de normes, de sigles, d'indicateurs ou d'outils ; récapitulatif final spectaculaire d'une longue liste.
component: src/isoQuinzeMetro/IsoQuinzeMetro.tsx
demo: Demo-TableauPeriodique
tags: [normes, ISO, split-flap, tableau périodique, 3D, récapitulatif]
---

## Utilisation
Données dans `N` (préfixe, numéro, symbole, domaine, description, pictogramme, couleur, image, temps) ; `<Flap text at size c />`, `<Elem d size glow? />`, `<MiniTable upto />` et `Periodic` (final).

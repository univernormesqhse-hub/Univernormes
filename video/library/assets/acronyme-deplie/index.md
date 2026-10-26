---
name: Acronyme qui se déplie lettre par lettre
section: assets
slug: acronyme-deplie
description: Colonne de tuiles-lettres qui pivotent et se colorent au mot prononcé, chaque carte se déroule (scaleX) avec le mot complet, dernier mot en couleur.
quand: Expliquer un sigle (AMDEC, SMART, QHSE, PDCA…) en synchronisation avec la voix.
component: src/amdec/Amdec.tsx
demo: Demo-AcronymeDeplie
tags: [acronyme, sigle, lettres, déroulé]
---

## Utilisation
`ACRO` (L, w, at, c) ; tuile `rotate((1 - spring) * -180)`, carte `scaleX(spring)` origine à gauche. Même motif dans `SmartMethode` (`LET`).

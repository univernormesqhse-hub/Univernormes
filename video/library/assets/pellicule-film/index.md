---
name: Pellicule de film qui défile
section: assets
slug: pellicule-film
description: Bande noire perforée en défilement continu avec vignettes colorées (une par élément), puis badge incliné « 9 NORMES » qui se colle.
quand: Annoncer une série / un sommaire (« découvrons 9 normes »).
component: src/normesIsac/NormesIsac.tsx
demo: Demo-PelliculeFilm
tags: [néo-brutal, sommaire, défilement]
---

## Utilisation
Perforations = `repeating-linear-gradient` + `backgroundPositionX: -film` ; vignettes doublées pour la boucle.

## Origine
Capsule « 9 normes ISO » voix Isac (`CondenseNormesIsac`).

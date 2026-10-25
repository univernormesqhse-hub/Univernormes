---
name: Triangle qui se trace + menaces repoussées
section: assets
slug: triangle-cid
description: Triangle tracé (pathLength) avec trois sommets en médaillons qui surgissent, puis éclairs qui rebondissent autour d’un bouclier pulsant.
quand: Trois piliers indissociables (C-I-D, qualité-coût-délai…), protection contre des menaces.
component: src/normesIsac/NormesIsac.tsx
demo: Demo-TriangleCid
tags: [triangle, protection, schéma]
---

## Utilisation
Remplissage `fillOpacity` lié au tracé ; éclairs : distance `360 - |sin(p·π)|·160`.

## Origine
Capsule « 9 normes ISO » voix Isac (`CondenseNormesIsac`).

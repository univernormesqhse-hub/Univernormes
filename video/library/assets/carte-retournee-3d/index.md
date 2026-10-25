---
name: Carte qui se retourne en 3D
section: assets
slug: carte-retournee-3d
description: Panneau rouge « PARLER » qui bascule sur l’axe X (rotateX 180°) et révèle au dos le panneau vert « ÉCOUTER ».
quand: Inversion de posture, avant/après, mythe/réalité.
component: src/cafeHse/CafeHse.tsx
demo: Demo-CarteRetournee3d
tags: [3d, avant-après, inversion]
---

## Utilisation
Deux faces `backfaceVisibility: hidden`, dos en `rotateX(180deg)`, parent `preserve-3d` + `perspective`.

## Origine
Capsule « Café HSE : la sagesse » (`CondenseCafeHse`).

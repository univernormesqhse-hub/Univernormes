---
name: Carte « besoin » → carte outil retournée en 3D
section: assets
slug: besoin-outil-flip
description: Carte BESOIN N°k (indice puis question tapée au mot prononcé) à gauche, carte noire « ? » à droite qui se retourne en 3D (rotateY 180°, halo jaune) sur le nom de l'outil en couleur ; le visuel de l'outil se construit dessous.
quand: Toute capsule « quel outil pour quel problème », FAQ, problème → solution, quiz.
component: src/bonOutilMetro/BonOutilMetro.tsx
demo: Demo-BesoinOutilFlip
tags: [flip 3d, carte, problème solution, outil, quiz]
---

## Utilisation
`TL` (need, needAt, q, qAt, name, tAt, c, heads) + `ToolScene` : `flip = prog(t, tAt-0.1, tAt+0.5)` ; deux faces `backfaceVisibility: hidden`, conteneur `perspective: 1200` + `transformStyle: preserve-3d`.

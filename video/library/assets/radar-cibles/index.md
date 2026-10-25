---
name: Radar qui détecte des cibles
section: assets
slug: radar-cibles
description: Écran radar vert, balayage conique en rotation, cibles qui apparaissent avec onde de ping à chaque mot clé.
quand: Lister des pistes, des cibles, des zones à prospecter ou à surveiller.
component: src/premierEmploi/PremierEmploi.tsx
demo: Demo-RadarCibles
tags: [radar, liste, wahou]
---

## Utilisation
`conic-gradient(from ${(t*120)%360}deg, …)` ; cibles `spring` + cercle qui s’agrandit `(t - a) % 1`. SFX : ticks lents + ding par cible.

## Origine
Capsule « Premier emploi en QHSE » (`CondensePremierEmploi`).

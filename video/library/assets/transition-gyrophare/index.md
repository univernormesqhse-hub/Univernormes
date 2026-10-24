---
name: Transition gyrophare
section: assets
slug: transition-gyrophare
description: Faisceau de gyrophare qui balaie l’écran, bandeau damier qui traverse en biais et carte de partie numérotée.
quand: Transition principale entre parties d’une capsule (≈ 3,7 s).
component: src/langageDg/LangageDg.tsx
demo: Demo-TransitionGyrophare
tags: [transition, métro, partie]
---

## Utilisation
Dans `SECT`, `k: 'gyro'` ; rendu via `TRANS[x.k]` dans `<Gate from={x.at} to={x.at + 3.7}>`. SFX : `trans(x)` (whoosh + 4 dings + soft-whoosh + thud + pop).

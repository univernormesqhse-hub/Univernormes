---
name: Atelier encombré balayé, voies de circulation tracées
section: assets
slug: atelier-balaye
description: Sol couvert d'objets en vrac (cartons, outils), un opérateur glisse (« GLISSADE ! »), puis tout est balayé vers les rayonnages pendant que deux bandes jaunes tracent l'allée et qu'un opérateur la remonte ; tampon « ABSOLU ».
quand: Rangement, 5S, voies de circulation, chutes de plain-pied, avant / après d'un poste.
component: src/sainSaufMetro/SainSaufMetro.tsx
demo: Demo-AtelierBalaye
tags: [rangement, 5s, chute, glissade, allée, avant après]
---

## Utilisation
`ITEMS` (icônes) ; position `lerp(chaos, rayonnage, sweep)` avec rotation qui s'annule ; bandes jaunes `height: 600 · lines`.

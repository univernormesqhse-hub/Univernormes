---
name: Coffre au trésor qui s’ouvre
section: assets
slug: coffre-tresor
description: Cadenas qui tombe, couvercle qui bascule, pièces d’or lumineuses qui remontent en continu.
quand: Information précieuse, retour d’expérience, presque-accidents, « l’or » d’un sujet.
component: src/cafeHse/CafeHse.tsx
demo: Demo-CoffreTresor
tags: [trésor, révélation, wahou]
---

## Utilisation
Couvercle `rotateX(prog*70)` ; pièces : boucle `(t*0.6 + k/26) % 1`. Combiné à la barre de recherche (résultat ouvert).

## Origine
Capsule « Café HSE : la sagesse » (`CondenseCafeHse`).

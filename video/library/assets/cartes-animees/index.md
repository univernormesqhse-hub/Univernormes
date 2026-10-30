---
name: Cartes animées (distribution, retournement, éventail, reflet holographique)
section: assets
slug: cartes-animees
description: Chaque fiche photo devient une carte à jouer distribuée par un croupier invisible : elle surgit du coin bas-droit en arc avec traînée de 3 échos flous, montre son dos (motif losanges + liseré or + logo), se retourne en vol (rotateY 540° + rotateZ) et se pose avec ombre portée ; une fois posée, elle flotte (inclinaison 3D rotateX/rotateY) avec un reflet holographique arc-en-ciel en « overlay ». À la carte suivante, la précédente glisse derrière en éventail (rotation autour d'un pivot bas, assombrie) : la pile des cartes jouées se lit en un coup d'œil.
quand: Énumérations (normes, outils, règles, étapes) où chaque élément a une image ; effet « collection » ou « jeu de cartes » pour une série de capsules.
component: src/isoQuinzeCartes/IsoQuinzeCartes.tsx
demo: Demo-CartesAnimees
tags: [cartes, card deal, flip 3D, éventail, holographique, énumération]
---

## Utilisation
`<DealtCard t s0 c>…face…</DealtCard>` (dos automatique via `CardBack`) et `<PlayedCard d t s0 />` pour la carte précédente. Trajectoire dans `dealPose(p)`, durée du vol 0,75 s.

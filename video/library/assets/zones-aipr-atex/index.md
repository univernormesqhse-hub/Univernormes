---
name: Comparatif « terre / air » — coupe de terrain à réseaux, nuage de gaz, zones ATEX, bonneteau, compteur d'années
section: assets
slug: zones-aipr-atex
description: Boîte à outils pour opposer deux dispositifs voisins sur une voix longue (5 à 6 min). Coupe de terrain `Ground` (strates, réseaux gaz / électricité / eau / télécom en couleurs, option aérienne) face au nuage `GasCloud` (bulles qui dérivent, densité réglable) en écran partagé, signe « ≠ » qui frappe, fissures et secousse. Bonneteau de deux gobelets AIPR / ATEX qui s'échangent sur la voix puis se révèlent, barre de recherche ouverte sur les deux sigles, pièces de puzzle et personas à point d'interrogation. Compteur mécanique `Odo` à retenue (1999 → 2014 → 2013 → 2018) puis frise, godet stoppé par un panneau STOP. Trois profils en cartes avec témoin et chaîne, zones 0 · 1 · 2 en halos concentriques, plan des réseaux qui se déroule avec détecteur balayant et pioche arrêtée par une main, triangle du feu qui se trace, boîtier « Ex » qui confine l'étincelle, volets « 7 H » / « 5 ANS » et réglette élastique 1 heure → plusieurs jours. Carrefour final TERRE → AIPR / AIR → ATEX, tracé cardiaque et cœur battant.
quand: Comparer deux formations, deux normes ou deux habilitations souvent confondues, risques enfouis contre risques ambiants, capsules « quelle différence ? », vidéos réglementaires longues découpées en parties annoncées par la voix.
component: src/aiprAtexMetro/AiprAtexMetro.tsx
demo: Demo-ZonesAtex
tags: [aipr, atex, comparatif, réseaux, gaz, zones, explosion, bonneteau, compteur, triangle du feu, métro]
---

## Utilisation
Couleurs : `AIPR_C` (bleu) et `ATEX_C` (orange). Coupe de terrain : `<Ground w h t overhead? />` (tableau `NETS`). Nuage : `<GasCloud w h t dens />`. Bonneteau : `Confusion` (échanges `SH`, révélation à 14,9 s). Compteur : `Odo` + `YEARS`. Profils : `PROF`. Zones : `ZN`. Éclair de gyrophare : `GyroFlash` aux changements de partie. Parties : `SECT` (6 guichets du tube), stations : `STATIONS`. Sous-titres repris de `src/aiprAtex/captions.ts` (même voix).

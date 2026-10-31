---
name: Entrepôt animé « Que se passerait-il si… » + arbre des possibles
section: assets
slug: entrepot-whatif
description: Scène d'entrepôt en SVG (rayonnages avec cartons, allée, marquage au sol) où chaque question « Que se passerait-il si… » est tapée dans une carte au-dessus puis jouée : chariot élévateur qui roule puis perd ses freins (accélération, traces de dérapage, lignes de vitesse, ✕ clignotant), charge qui glisse des fourches levées et tombe en tournant avec rebond et éclats d'impact, piéton (marche animée) qui traverse un passage zébré face à un chariot qui approche avec triangle « ! » ; compteur de questions 1/3 → 3/3. Composants réutilisables `Forklift` (fourches à hauteur variable, charge, freins hors service) et `Walker`. Aussi : arbre des possibles (« ET SI… ? » → 3 situations → 3 conséquences, branches qui se tracent), pluie de points d'interrogation, schéma en escalier, matrice de coches conséquences / mesures, bulles « Et si… ? » au-dessus d'une photo d'équipe.
quand: What-if, analyse de scénarios, logistique, circulation engins-piétons, manutention, chariots élévateurs, causeries « et si… ? », questionnement collectif.
component: src/whatIfMetro/WhatIfMetro.tsx
demo: Demo-EntrepotWhatIf
tags: [what if, entrepôt, chariot élévateur, piéton, manutention, scénario, arbre, questionnement]
---

## Utilisation
`<Warehouse t />` (questions et temps dans `QS`), `<Forklift x y fork load brakeOut t />`, `<Walker x y t s />`. Arbre : `Principe`. Matrice : `ROWS` + `Mesures`.

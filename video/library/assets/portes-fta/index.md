---
name: Portes logiques ET / OU en circuit + arbre des défaillances + cadenas à combinaison
section: assets
slug: portes-fta
description: Portes logiques au format arbre des défaillances (ET en dôme, OU en ogive) branchées comme un circuit : deux entrées « événement A / B » qui s'allument, fils où le courant circule (tirets lumineux qui défilent), lampe de sortie qui ne s'allume qu'avec les deux entrées pour ET et avec une seule pour OU ; tampons « SIMULTANÉMENT », « CONJOINTEMENT », « INDÉPENDAMMENT ». Aussi : cartes qui se retournent en 3D (anglais → français), causes « ? » balayées à la loupe qui convergent vers l'événement redouté avec ondes d'alarme, arbre qui pousse du sommet vers les causes (traits qui se tracent, événements de base en cercles, flèche de descente), local électrique en SVG qui s'embrase (flammes, fumée, étincelles, voyants rouges) puis se réduit en nœud sommet de l'arbre (transition d'élément partagé), 4 pictogrammes dessinés (court-circuit, isolant abîmé, multiprise surchargée, protection hors service), cadenas à combinaison dont les molettes alignent les défaillances puis s'ouvre sur l'incendie.
quand: FTA / arbre des défaillances, arbre des causes, logique ET / OU, barrières, analyse de scénarios, risque électrique, incendie, combinaisons de causes, sigles anglais à traduire.
component: src/ftaMetro/FtaMetro.tsx
demo: Demo-PortesFta
tags: [fta, arbre, défaillances, porte et, porte ou, logique, circuit, incendie, électrique, cadenas, combinaison]
---

## Utilisation
Portes : `<GateDemo t kind="et"|"ou" a b />` (formes `andPath` / `orPath`, fils `<Wire d on t />`) + `Portes`. Arbre : `Principe`. Local électrique : `<Room t />` + morph dans `Exemple` (`NODE`, `CARD`). Pictos : `<CauseIco k size t />`. Cadenas : `Objectif` (`STOPS`). Cartes 3D : `FLIPS` dans `Intro`. Voix démarrée à `VOICE_FROM` (`trimBefore`) pour ne garder qu'une prise.

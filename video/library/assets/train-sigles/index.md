---
name: Sigles en série — carte focus + train de wagons, zones concentriques, carte de contrôle, cartes distribuées
section: assets
slug: train-sigles
description: Boîte à outils pour une longue liste de sigles calée sur la voix (tableau `IT` : sigle, début du sigle, début et fin de l'expansion). Carte focus commune : le sigle en tuiles qui tombent en tournant + l'expansion qui s'écrit mot à mot au rythme de la voix, initiales retrouvées automatiquement et soulignées (`initials`, mots vides ignorés, « d' / l' » gérés, accents normalisés), compteur « SIGLE n / N ». Une technique par famille : tableau des départs en palettes d'aéroport ouvert par une barre de recherche, zones concentriques autour d'un site (anneaux qui se tracent et pulsent), train de marchandises dont chaque wagon porte un sigle sur plaque orange et s'arrête à quai (roues qui tournent, fumée de la locomotive), tuiles qui pivotent façon tableau périodique, carte de contrôle qui se trace avec un point étiqueté par sigle, cartes distribuées en éventail sur une photo de réunion. Transitions qui présentent le premier sigle de chaque famille.
quand: Glossaires, sigles et acronymes, lexique métier, listes longues (20 à 40 éléments) sur voix, quiz de vocabulaire, familles de termes, capsules « à connaître ».
component: src/siglesMetro/SiglesMetro.tsx
demo: Demo-TrainSigles
tags: [sigles, acronymes, glossaire, train, wagon, tableau des départs, palettes, carte de contrôle, cartes, liste]
---

## Utilisation
Données : `IT` (+ groupes `G1`…`G6`). Carte focus : `<Focus i c x y w h compact? />` avec `curOf(ids, t)`. Train : `Risques` (`trainX`, `LOCO`, `STRIDE`). Anneaux : `Urgence` (`G2` = [index, rayon]). Tuiles : `Chimie`. Carte de contrôle : `Qualite` (`cx5`, `cy5`). Cartes : `Gouvernance`. Voix démarrée à `VOICE_FROM` (`trimBefore`).

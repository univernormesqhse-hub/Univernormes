---
name: Machine animée en 5 étapes (JSA) + ascenseur 4 étages + énergie consignée
section: assets
slug: machine-jsa
description: Machine industrielle en SVG qui joue une intervention étape par étape : check-list de préparation qui se coche, arrêt d'urgence enfoncé (onde rouge) et engrenages qui ralentissent jusqu'à l'arrêt (vitesse intégrée image par image, voyant et écran ON/OFF), sectionneur basculé sur O puis cadenas qui tombe avec étiquette « NE PAS MANŒUVRER » qui se balance, énergie barrée, clé qui s'active sur l'engrenage, vérification (coche géante) puis cadenas retiré, sectionneur sur I et redémarrage ; flux d'énergie qui circule dans le câble tant que le sectionneur est fermé ; carte « ÉTAPE n / 5 » avec chiffre en palette d'aéroport et frise des 5 étapes. Aussi : sigles en palettes (JSA puis AST) dépliés lettre à lettre, bloc « activité » qui éclate en 5 étapes puis scanner qui révèle les dangers et boucliers qui tombent, schéma en ascenseur qui monte 4 étages (portes coulissantes, afficheur ▲ n/4, coches par étage), photo découpée en 5 lamelles numérotées, énergie bloquée par un cadenas (particules qui s'accumulent) + testeur de vérification, jauge de risque qui bascule au rouge + tampon.
quand: JSA / AST, analyse de tâche, consignation / déconsignation, maintenance, arrêt machine, procédure en étapes, LOTO, méthode en 4 niveaux, travaux à risques.
component: src/jsaAstMetro/JsaAstMetro.tsx
demo: Demo-MachineJsa
tags: [jsa, ast, consignation, cadenas, machine, engrenages, maintenance, étapes, ascenseur, énergie, jauge]
---

## Utilisation
Machine : `<Machine t />` (temps des étapes dans `ST5`, vitesse dans `speedAt`, engrenages `gearPath(r, n)`) + `Etapes`. Ascenseur : `Schema` (étages dans `FLOORS`, trajets dans `LIFT`). Lamelles : `Exemple`. Énergie : `<Energie t />`. Jauge : `<Gauge t />`.

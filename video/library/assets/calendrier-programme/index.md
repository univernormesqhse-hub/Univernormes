---
name: Programme de formation en calendrier sombre — surbrillance qui voyage et remplit les modules (style « 28-Day Course »)
section: assets
slug: calendrier-programme
description: Motion design d'un programme détaillé semaine par semaine, repris de la vidéo de référence « 28-Day Claude Course for Safety Managers » et adapté aux formations UNIVERSNORMES. Fond bleu nuit avec photo floutée et vignettage ; chaque semaine = un bandeau (pastille, « Semaine N » en blanc, thème dans la couleur de la semaine, pastille « S N / 8 ») + une grille 4 × 2 de cartes-modules numérotées en continu (icône, numéro, intitulé) complétée par une cellule photo « OBJECTIF · SEMAINE N » qui s'écrit au balayage. Au rythme de la voix, un cadre lumineux voyage de carte en carte et chaque carte se remplit de la couleur de la semaine ; les semaines terminées passent en ✓. Caméra : barre de recherche qui ouvre le programme, vue d'ensemble du tableau (échelle 0,25) puis plongée dans la semaine 1, défilement de semaine en semaine avec flou de bougé, recul final sur le tableau entièrement rempli. Volets « SEMAINE N » en palettes avec jauge des 8 semaines. Cartes-loupes FLIP : la carte grandit depuis sa place dans la grille, montre un détail animé (trio ISO qui pivotent, 5 pourquoi / Ishikawa / Pareto, mini rouleaux-prismes APR · AMDEC · HAZOP, cadenas LOTO + EPI, scopes 1-2-3, roue PDCA, diplôme) puis y retourne. Fin : publics visés en cartes de verre, lignes « sessions · modalités · inscriptions » et bouton jaune d'appel cliqué.
quand: Programmes de formation, cursus en semaines ou en jours, plans d'action en étapes, feuilles de route, calendriers d'audit, parcours d'intégration, toute liste « période → contenus » annoncée par la voix.
component: src/programmeQhseMetro/ProgrammeQhseMetro.tsx
demo: Demo-CalendrierProgramme
tags: [programme, formation, calendrier, semaines, modules, surbrillance, tableau, sombre, FLIP, appel à l'action, QHSE]
---

## Utilisation
Données : `WEEKS` (numéro, temps d'annonce, thème, couleur, objectif, photo, modules `[intitulé, temps, icône]`). Tableau : `<PBoard />` (géométrie `SEC`, `CW`, `CH`, `cardRect`), caméra `boardCam(t)` + `SCROLL` (temps de défilement par semaine). Fond : `<DarkBg img />`. Carte-loupe : `<PopOut k j a b>…</PopOut>`. Volet : `<WeekFlap k />`. Titre sur fond sombre : `<DarkTitle a t1 t2 />`. Sous-titres : `src/programmeQhse/captions.ts`.

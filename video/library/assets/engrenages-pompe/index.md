---
name: Train d'engrenages, jauges qui convergent, pompe animée et ses défaillances
section: assets
slug: engrenages-pompe
description: Train de 4 engrenages SVG générés (dents calculées par `gearPath`) placés en zigzag, qui s'engrènent un à un sur la voix (chaque roue démarre, sens alterné, vitesse inverse du rayon) avec libellé et numéro au centre + réglette de « cotation » dont le curseur glisse ; 3 jauges circulaires (G, F, D) qui se remplissent puis envoient trois courbes vers une case « CRITICITÉ » ; barres de risques qui se trient toutes seules (hiérarchisation) avec rang qui apparaît ; pompe industrielle SVG (moteur à ailettes, accouplement, roulement, volute avec roue qui tourne, flux dans les tuyauteries) dont les défaillances s'allument : fuite (gouttes + flaque), surchauffe (moteur rosé + ondes de chaleur), usure des roulements (vibration + roulement orange), panne du moteur (moteur gris, roue arrêtée, ✕), puis remise en état (coche verte) ; 3 actions animées (calendrier qui se coche, clé qui oscille, pièce rouge remplacée par une verte) ; mots barrés à la main.
quand: AMDEC, maintenance, fiabilité, analyse de causes, criticité, toute démarche en étapes « qui s'enchaînent » (engrenages), équipements industriels.
component: src/amdecMetro/AmdecMetro.tsx
demo: Demo-EngrenagesPompe
tags: [AMDEC, engrenages, criticité, jauges, pompe, maintenance, défaillances, hiérarchisation]
---

## Utilisation
Engrenages : `gearPath(r, nDents)` + tableau `GEARS` ([libellé, cx, cy, r, temps, couleur, sens]). Jauges : `FACT`. Pompe : `<Pump t />` (les temps des défaillances sont dans `FAIL` et dans le composant). Actions : `ACTS`.

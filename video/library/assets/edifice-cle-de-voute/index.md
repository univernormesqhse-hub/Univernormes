---
name: Édifice à piliers et clé de voûte qui s'effondre
section: assets
slug: edifice-cle-de-voute
description: Socle, trois piliers colorés qui montent un à un, liaisons qui s'allument, toit « SYSTÈME DE MANAGEMENT » qui se pose et clé de voûte qui tombe et se verrouille (anneau doré) ; si on retire un pilier, tout l'édifice bascule et s'effondre (« TOUT S'EFFONDRE »).
quand: Toute capsule « système intégré », piliers interdépendants, normes qui se complètent, « si un maillon manque tout tombe » ; version miniature (scale 0.48) réutilisable comme fil conducteur sous les parties.
component: src/edificeIsoMetro/EdificeIsoMetro.tsx
demo: Demo-EdificeCleDeVoute
tags: [édifice, piliers, clé de voûte, effondrement, système, normes iso]
---

## Utilisation
Composant `Edifice` : montée des piliers pilotée par des instants (`spring` par pilier), liaisons = lignes dont l'opacité suit `prog(t, …)`, toit qui descend puis `KEY_AT` pour la chute de la clé + anneau doré. Effondrement : pilier tiré latéralement puis rotation/chute des éléments avec délais échelonnés.

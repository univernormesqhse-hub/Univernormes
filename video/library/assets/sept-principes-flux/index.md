---
name: Les 7 principes de management de la qualité — pictogrammes ronds dessinés en direct et schéma de flux bouclé
section: assets
slug: sept-principes-flux
description: Les 7 principes de management de la qualité (ISO 9001:2015) en pictogrammes ronds conçus pour la capsule : orientation client (cible + flèche), leadership (podium + drapeau), implication du personnel (trois silhouettes), approche processus (trois blocs fléchés + boucle), amélioration (escalier + flèche montante), décisions basées sur des faits (histogramme + loupe), relations parties intéressées (chaîne). `<PPicto id draw glow />` : l'anneau de couleur se trace, puis le symbole élément par élément, puis les formes se remplissent (même moteur que les pictogrammes SGH). `<PrRing>` : carrousel rotatif des 7 qui converge au centre avec un éclair. `<Flow>` : flèche de flux qui se trace puis fait circuler des particules jaunes. Dans le film : rivière de flux où défilent les principes (ouverte par la barre de recherche), chaîne direction → système (blocs qui tombent) → clients, découpage d'un bloc « activités » en quatre processus reliés en cycle, photos HD (équipe, analyste, poignée de main), chaîne amont / organisation / aval aux maillons tracés, schéma de flux complet en S bouclé par une ellipse « amélioration » qui se trace.
quand: ISO 9001, principes de management de la qualité, systèmes de management (QSE), cartographie des processus, chaîne de valeur amont / aval, tout contenu « vision en flux » ou cycle d'amélioration continue.
component: src/septPrincipesMetro/SeptPrincipesMetro.tsx
demo: Demo-SeptPrincipesFlux
tags: [ISO 9001, principes, management, qualité, flux, processus, pictogrammes, dessin animé, carrousel, convergent, amélioration continue, chaîne de valeur]
---

## Utilisation
`PR[id]` (`name`, `num` selon l'ordre ISO 9000:2015, `c`, `els`), `PR_IDS`, `<PPicto id="PRO" size={200} draw={prog(t, a, a + 1.2, (v) => v)} />`, `<PNode id a x y size label />`, `<PHero id a fly end />` (dessin en grand puis badge dans le coin), `<Flow x1 y1 x2 y2 a c dur />`, `<PrRing a b cy />`. Transitions gyrophare resserrées par `TimeWarp` (`TK = 1.8`).

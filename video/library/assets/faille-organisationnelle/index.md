---
name: De l'individu à la faille organisationnelle
section: assets
slug: faille-organisationnelle
description: Carte « l'opérateur » + badge « presque accident », étiquette « SANCTION » barrée, puis mini-organigramme : la loupe quitte l'opérateur et révèle les vraies failles (machine mal protégée, procédure inadaptée) qui tremblent et s'allument en orange.
quand: Culture juste, analyse d'événement, retour d'expérience, « chercher la cause, pas le coupable ».
component: src/piliersTerrainMetro/PiliersTerrainMetro.tsx
demo: Demo-FailleOrganisationnelle
tags: [culture juste, faille, organisation, presque accident, loupe, REX]
---

## Utilisation
Composant `Faille` : deux phases ; cartes `[ic, l, at, x]`, une carte devient « faille » quand `t > at` (fond orange clair, halo, tremblement 0,5 s, icône danger) ; deux `LoupeSweep` enchaînés.

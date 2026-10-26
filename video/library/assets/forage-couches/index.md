---
name: Forage en coupe de terrain (caméra qui descend couche par couche)
section: assets
slug: forage-couches
description: Coupe géologique (surface + 5 couches de plus en plus sombres) filmée par une caméra qui descend à chaque niveau ; racine qui se dessine, point d'interrogation qui tourne en tête de forage, couche finale qui s'illumine (onde dorée + poussière), puis dézoom sur toute la coupe avec surface barrée, engrenages et pousse.
quand: 5 pourquoi, analyse de cause racine, « aller au fond des choses », iceberg / niveaux de profondeur, toute progression du visible vers l'invisible.
component: src/cinqPourquoiMetro/CinqPourquoiMetro.tsx
demo: Demo-ForageCouches
tags: [cause racine, 5 pourquoi, profondeur, caméra, couches, dézoom]
---

## Utilisation
`LAYERS` (l, at, c, ic) ; `DEPTH` = images clés [t, profondeur] ; `depthAt(t)` interpolé easeInOut ; monde de hauteur `6·LH` transformé `translate(...) scale(z)` ; dézoom `z = lerp(1, 930/(6·LH), zo)`, centre clampé pour ne jamais montrer le vide sous la dernière couche.

## Notes
Libellés intermédiaires (facteur intermédiaire, éléments structurels) repris de la vidéo source.

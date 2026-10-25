---
name: Circuit fermé (flux descendants / montants)
section: assets
slug: circuit-ferme
description: Dézoom sur l’organigramme complet : flèches bleues (directives) et vertes (remontées) passent en pointillés qui défilent, des pastilles circulent dans les deux sens, badge « CIRCUIT FERMÉ ».
quand: Conclure sur une boucle de rétroaction : PDCA, remontée terrain, amélioration continue.
component: src/equipeIsac/EquipeIsac.tsx
demo: Demo-CircuitFerme
tags: [boucle, flux, conclusion]
---

## Utilisation
`loop = prog(t, a, a+1)` active `strokeDasharray` + `strokeDashoffset={-t*90}` et des cercles qui parcourent chaque lien `((t*0.7 + k*0.3) % 1)`.

## Origine
Capsule « Équipe HSE performante » voix Isac (`CondenseEquipeIsac`).

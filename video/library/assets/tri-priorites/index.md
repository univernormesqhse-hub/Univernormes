---
name: Formule G × F × D = C puis tri animé des priorités
section: assets
slug: tri-priorites
description: Trois tuiles (G, F, D) tombent au mot prononcé, résultat « = C » qui s'allume, puis barres de criticité qui se remplissent et se réordonnent (la plus critique monte en tête avec le badge « PRIORITÉ 1 »).
quand: Cotation / criticité (AMDEC, évaluation des risques, matrice), classement par priorité, tout calcul produit de facteurs.
component: src/amdec/Amdec.tsx
demo: Demo-TriPriorites
tags: [criticité, amdec, cotation, tri, priorités, formule]
---

## Utilisation
Composant `Criticite` : `tile(x, L, l, at, c)` + `op(x, '×', at)` ; tri : `sorted = [...bars].sort()`, position `lerp(k, sorted.indexOf(b), sp)` avec `sp = prog(t, a, a+0.6)`.

## Notes
Barres sans valeur chiffrée (libellés génériques « défaillance A/B/C ») : ne pas afficher de scores non prononcés.

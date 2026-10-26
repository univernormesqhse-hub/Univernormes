---
name: Idée reçue barrée puis checklist déchirée
section: assets
slug: checklist-dechiree
description: Checklist de contraintes cochée mécaniquement + tampon « AMENDE », barre de recherche dont le 1er résultat (l'idée reçue) est barré en rouge, puis la page se déchire en deux moitiés qui s'écartent sur « en réalité ».
quand: Casser un cliché, opposer « ce qu'on croit » et « ce qui est vrai », ouverture d'une capsule.
component: src/piliersPrevMetro/PiliersPrevMetro.tsx
demo: Demo-ChecklistDechiree
tags: [cliché, déchirure, checklist, idée reçue, recherche]
---

## Utilisation
Deux demi-pages `clipPath` en dents de scie, `translate(±tear·300, tear·200) rotate(±tear·25)` avec `tear = prog(t, a, a+0.7, easeIn)`.

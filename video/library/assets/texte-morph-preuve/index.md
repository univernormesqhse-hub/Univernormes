---
name: Morph de texte flou → net + tampon
section: assets
slug: texte-morph-preuve
description: Une ligne de CV se dissout en flou et se reforme en version chiffrée surlignée, puis tampon « PREUVE » et barres qui montent.
quand: Avant/après d’une formulation (vague → quantifié), reformulation d’un argument.
component: src/premierEmploi/PremierEmploi.tsx
demo: Demo-TexteMorphPreuve
tags: [texte, avant-après, cv]
---

## Utilisation
Deux calques superposés, opacité et `blur` croisés sur 1,4 s ; ne jamais inventer le chiffre affiché (le reprendre de la voix).

## Origine
Capsule « Premier emploi en QHSE » (`CondensePremierEmploi`).

---
name: Sous-titres néo-brutalistes
section: subtitles
slug: sous-titres-neo-brutal
description: 2 à 4 mots en grotesque très grasse dans une carte blanche à bordure noire 4 px et ombre dure 8 px, mot porteur en vert, entrée en ressort de 6 images, ~0,15 s d’avance sur la voix.
quand: Capsules « UI motion » épurées (skill capsule-ui-neo-brutal) ; voix de synthèse ou voix off rythmée.
component: src/components/NeoCaptions.tsx
demo: Demo-SousTitresNeoBrutal
tags: [sous-titres, néo-brutal]
---

## Utilisation
`<NeoCaptions captions={captions} accent="#22B573" top={1640} />` — mêmes `captions.ts` que le style papier (groupes ≤ 22 caractères, `*mot*` = accent).

## Origine
Capsule « 9 normes ISO » voix Isac (`CondenseNormesIsac`).

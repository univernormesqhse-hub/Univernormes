---
name: Sous-titres papier mot à mot
section: subtitles
slug: sous-titres-papier-mot-a-mot
description: Carte blanche manuscrite sous le métro, mots qui apparaissent en suivant la voix, mot clé en vert (`*emph*`).
quand: Style par défaut des capsules UNIVERSNORMES (thème papier quadrillé clair).
component: src/components/Captions.tsx
demo: Demo-SousTitresPapierMotAMot
tags: [sous-titres, mot à mot]
---

## Utilisation
`captions.ts` généré depuis les segments (`SEG=[(s,e,"texte *emph*")]`), recalé au mot sur l’alignement ; `<AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><Captions captions={captions} /></Gate></AbsoluteFill>`.

## Notes
Contrôler les chevauchements et les durées < 0,15 s après recalage.

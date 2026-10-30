---
name: Couche de post-production « subliminale »
section: assets
slug: superposition-subliminale
description: Couche qui enveloppe n'importe quelle capsule existante sans la modifier : images-éclairs de 3 images à l'entrée de chaque élément (numéro géant découpé dans la photo, sur la couleur de l'élément), double exposition (numéro-photo géant en « multiply » qui dérive en parallaxe pendant la scène), aberration chromatique RVB + secousse aux transitions (filtre SVG feColorMatrix/feOffset/feBlend appliqué à toute l'image, WebGL compris), fuites de lumière chaudes en « screen », rafale de mots-éclairs (3 images par mot, fond alterné noir/blanc), négatif de 2 images sur un temps fort, grain de pellicule animé (feTurbulence), impacts sonores synchronisés.
quand: Donner une seconde version « choc » à une capsule déjà montée, rythmer les entrées d'éléments, signature visuelle agressive pour les réseaux sociaux. Garder les éclairs espacés (≥ 3 s) : pas de stroboscope.
component: src/isoQuinzeSub/IsoQuinzeSub.tsx
demo: Demo-SuperpositionSubliminale
tags: [post-production, flash frames, double exposition, aberration chromatique, glitch, light leak, grain, subliminal]
---

## Utilisation
Envelopper la capsule : `<AbsoluteFill style={{filter: 'url(#rgbSplit)'}}><Capsule /></AbsoluteFill>` + `<RgbFilter amt f />`, `<FlashFrame d />`, `<DoubleExpo t />`, `<Leaks t />`, `<WordBurst t />`, `<Grain f />`. Les temps viennent des données exportées de la capsule (`N`, `shownAt`, `TRANS_AT`).

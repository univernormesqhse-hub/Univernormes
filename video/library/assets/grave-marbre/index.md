---
name: Règle gravée dans le marbre + carte hier → demain
section: assets
slug: grave-marbre
description: Plaque de marbre veinée (dégradé gris, veines SVG, ombre dure) où un intitulé de procédure se grave lettre par lettre avec des étincelles dorées qui suivent le burin ; dessous, une carte néo-brutale « L'ADAPTATION D'HIER » bascule en rotateX et devient « LA RÈGLE DE DEMAIN » (orange → vert), puis pluie d'or.
quand: Toute conclusion « retour d'expérience → nouvelle règle », capitalisation, standardisation, mise à jour de procédure, leçon apprise.
component: src/securiteRegleeGeree/SecuriteRegleeGeree.tsx
demo: Demo-GraveMarbre
tags: [marbre, gravure, procédure, retour d'expérience, flip, conclusion]
---

## Utilisation
Composant `Demain` : `n = floor(prog(t, a, b, linéaire) × longueur)` pour la gravure (texte `ENGRAVE`) ; carte `rotateX(flip × 180)` avec contre-rotation du texte une fois passé 0,5.

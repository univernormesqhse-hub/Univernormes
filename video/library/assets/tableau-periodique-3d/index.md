---
name: Tableau périodique en vraie 3D (WebGL)
section: assets
slug: tableau-periodique-3d
description: Final récapitulatif en WebGL (@remotion/three) sur fond transparent, par-dessus la mise en page 2D : 15 tuiles extrudées (texture canvas : rang, préfixe, symbole, numéro, domaine, pastille « G » pour les guides) sortent d'un vortex en spirale depuis la profondeur, en tournoyant, et se rangent en grille 5 × 3 ; travelling arrière + orbite caméra puis plan presque frontal ; vague lumineuse diagonale (les tuiles avancent et s'illuminent), reflet spéculaire qui balaie la grille (lumière ponctuelle + bande additive), halo doré, poussière 3D, respiration finale des tuiles.
quand: Récapitulatif final d'une liste (normes, indicateurs, outils, sigles) quand on veut un « effet wahou » 3D réel plutôt qu'une perspective CSS.
component: src/isoQuinze3D/Periodic3D.tsx
demo: Demo-TableauPeriodique3D
tags: [3D, WebGL, three.js, tableau périodique, récapitulatif, final, wahou]
---

## Utilisation
`<ThreeCanvas … gl={{alpha: true}}><Periodic3DScene u={t - début} tiles={TILES} /></ThreeCanvas>` avec `TILES: Tile3D[]` (`pre`, `num`, `sym`, `dom`, `c`, `guide?`). Charger Montserrat avant (delayRender + `document.fonts.load`) pour les textures. Caméra : tableau `KEYS` dans le fichier.

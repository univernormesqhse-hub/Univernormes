---
name: Carrousel cylindrique 3D — cartes-photos à l'intérieur d'un cylindre qui tourne (effet rotatif, reflet au sol)
section: assets
slug: carrousel-cylindrique-3d
description: Reprise de l'« effet rotatif » fourni en capture : des cartes-photos (cadre blanc arrondi) sont posées à l'intérieur d'un cylindre et vues depuis son centre, sur une scène sombre striée de fines lignes de balayage. Les deux cartes de face sont grandes, celles des bords fuient en perspective comme des pans de mur courbe ; chaque carte s'assombrit selon son angle, reçoit un reflet de verre en diagonale et un reflet au sol estompé. Entrée en vrille (rotation + avancée vers la caméra, ressort), puis rotation lente et continue. CSS 3D pur (perspective, preserve-3d, backface-visibility), tous les paramètres à l'échelle (rayon, taille des cartes, avancée, perspective) pour garder les proportions. Utilisé dans la capsule ISO 45001 deux fois : dans le panneau ouvert par la barre de recherche (« démarche participative ») puis en final (« un système qui écoute son terrain »), avec un tampon qui s'abat par-dessus.
quand: Montrer « le terrain », une équipe, des participants, une galerie de sites ou de missions, des références, un avant/après en série ; tout moment « plusieurs voix / plusieurs lieux » de la narration ; transition spectaculaire vers une conclusion.
component: src/iso45001Metro/Iso45001Metro.tsx
demo: Demo-CarrouselCylindrique
tags: [3D, carrousel, cylindre, rotation, photos, galerie, perspective, reflet, terrain, participation, wahou, scène sombre]
---

## Utilisation
`<Ring3D imgs={[...]} at={t0} w={950} h={835} cw={525} ch={375} R={720} zr={405} persp={1500} speed={16} cy={0.44} />` dans un conteneur sombre (`STAGE` + calque `SCAN`). Garder `N = 8` images pour avoir deux cartes de face (±22,5°) et deux pans fuyants ; pour agrandir ou réduire, multiplier `cw`, `ch`, `R`, `zr` et `persp` par le même facteur. `speed` en degrés par seconde ; l'entrée en vrille dure le temps du ressort `sp(t, at)`. Tampon par-dessus : `<SlamTag at text c ic />`.

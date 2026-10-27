---
name: Cercle de causerie (participants, écoute, réticences, échanges)
section: assets
slug: cercle-causerie
description: Animateur en photo détourée au centre d'un cercle pointillé tournant ; 8 participants en pastilles néo-brutales qui popent un à un. Modes pilotés par le temps : bulles d'écoute, barres de niveau, recul grisé des participants (« réticences »), liaisons en pointillés animés vers chacun (« échange »), mains levées (« tout le monde participe »), halo doré final.
quand: Toute capsule sur la causerie / le quart d'heure sécurité, l'animation d'équipe, la communication terrain, la participation, l'écoute active.
component: src/animTerrainMetro/AnimTerrainMetro.tsx
demo: Demo-CercleCauserie
tags: [cercle, équipe, causerie, participation, écoute, communication]
---

## Utilisation
`<Circle cx cy r at bub={[a, b]} lvl={t} away={[a, b]} links={t} hands={t} glow={t} c={couleur} />` — chaque option est un instant (secondes) ; `away` repousse les pastilles de 35 % en niveaux de gris puis les ramène.

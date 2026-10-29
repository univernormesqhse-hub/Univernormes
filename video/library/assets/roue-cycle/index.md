---
name: Roue du cycle (segments qui volent se souder, puis rotation)
section: assets
slug: roue-cycle
description: Roue néo-brutale à 7 segments colorés (secteurs d'anneau SVG à contour noir épais) : chaque segment arrive de l'extérieur dans l'axe de son angle avec un rebond (spring) au moment où la voix le nomme, son pictogramme et son libellé restent droits ; une fois complète, la roue se met à tourner avec une accélération douce, moyeu blanc lumineux (« CYCLE CONTINU ») au halo pulsé et poussière dorée.
quand: Tout cycle ou processus bouclé à énumérer : PDCA, 7 missions du responsable QHSE, étapes d'un audit, cycle de vie d'un document, amélioration continue, roue de Deming.
component: src/missionsMetro/MissionsMetro.tsx
demo: Demo-RoueCycle
tags: [roue, cycle, amélioration continue, PDCA, segments, neo-brutal]
---

## Utilisation
`<Wheel R={420} cx={540} cy={900} ats={[t1, …, t7]} spinAt={t} center="CYCLE CONTINU" />` — les libellés et pictogrammes viennent du tableau `MIS` ; `sector(cx, cy, r0, r1, a0, a1)` donne le tracé d'un secteur d'anneau réutilisable.

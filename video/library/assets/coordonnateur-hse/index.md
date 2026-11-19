---
name: Le rôle du coordonnateur HSE — capsule métro (5 min 18) sur fond papier cramé et cercles dorés, photos du dépôt animées, toutes les transitions en gyrophare (carte numérotée sur ruban à damier + alarme), pyramide des quatre niveaux HSE
section: assets
slug: coordonnateur-hse
description: Capsule métro (voix d'origine) sur l'habillage `regles-or-papier` (`PaperGoldBg`, `DemingCorner`, bordure marquage au sol, couverture `KTriptych` Organiser / Coordonner / Suivre, titre en lettres-photos « COORDONNATEUR / HSE »), sept guichets (introduction, sections 1 à 4, nuance, conclusion) ouverts **tous** par la même transition `Gyro` (carte numérotée sur ruban à damier jaune / marine) avec le son `alarme` ajouté dans `trans()`. Réutilise la boîte à outils photo de `dix-outils-qhse` (`PicFX`, `PhotoScan`, `PhotoLoupe`, `Polaroids`, `PhotoCompare`, `PhotoTilt`, `PhotoShatter`, `PhotoWall`, `PhotoRing` avec `nums={false}`, `PhotoDeck`, `WeakChain`, `Medal`) et ajoute : `VerbCard` (tuile-verbe à icône qui surgit), `Bridge` (pont qui se trace entre deux photos, tablier parcouru), `InspCal` (calendrier d'inspection : grille, cases ciblées puis cochées), `Scale2` (balance qui penche), `DataFlow` (flux de données qui converge vers un entonnoir de consolidation), `Cycle3` (cycle à trois nœuds, flèche circulaire tournante), `Pyramid` (étages qui se construisent puis reçoivent photo ronde + rôle, étage surligné en or, navettes de liaison), `Compartments` (quatre cases-photos qui se verrouillent d'un cadenas).
quand: Fiches métier / rôles (agent, superviseur, coordonnateur, responsable), hiérarchie d'un département, missions d'un poste en verbes d'action, inspections et causeries, reporting et indicateurs ; toute capsule où l'on veut des transitions identiques gyrophare + alarme.
component: src/coordonnateurHseMetro/CoordonnateurHseMetro.tsx
demo: Demo-CoordonnateurHseMetro
tags: [coordonnateur HSE, rôle, hiérarchie, agent, superviseur, responsable, inspections, causeries, JSA, reporting, indicateurs, photos animées, gyrophare, alarme, fond papier, 2D, métro]
---

## Utilisation
`VerbCard x y w at c ic l` ; `Bridge x0 x1 y at` ; `InspCal x y at done` ; `Scale2 at y tilt=[[t, angle]]` ; `DataFlow at merge y0 y1` ; `Cycle3 cx cy r at nodes=[[l, ic, c]]` ; `Pyramid at hl=[niveau, t] links rows=[[src, rôle, mission, c, at]]` ; `Compartments at lock items=[[src, l, c]]`. Transitions : `k: 'gyro'` sur chaque guichet + `{at: x.at, s: 'alarme', v: 0.3, dur: 1.6}` dans `trans`.

---
name: Scission au laser — un bloc « Risques & opportunités » découpé en deux cartes qui s'écartent
section: assets
slug: scission-laser-risques-opportunites
description: Une carte néo-brutale blanche portant deux notions mêlées (« Risques & opportunités ») est enveloppée d'un brouillard de « ? » gris qui flottent (ambiguïté). Un faisceau laser rouge lumineux descend verticalement au milieu de la carte, avec une pointe incandescente blanc-jaune et une gerbe d'étincelles qui suit la découpe. Au bout du trait, la carte se scinde en deux cartes pleines qui s'écartent et pivotent légèrement — rouge « Risques » (triangle d'alerte) et verte « Opportunités » (ampoule) —, un anneau d'étincelles jaunes s'ouvre, le brouillard de « ? » se dissipe et une pastille « Fin de l'ambiguïté technique » se pose. Tout en CSS (aucune image), synchronisé sur le mot « scindées » de la voix.
quand: Séparer deux notions confondues (risques / opportunités, danger / risque, incident / accident, correction / action corrective, vérification / validation), lever une ambiguïté, montrer un découpage d'exigence, une réorganisation de clause ou d'article, « avant c'était mélangé, maintenant c'est distinct ».
component: src/iso9001EvolMetro/Iso9001EvolMetro.tsx
demo: Demo-ScissionLaser
tags: [laser, découpe, scission, séparation, ambiguïté, risques, opportunités, ISO 9001, étincelles, brouillard, néo-brutal, CSS]
---

## Utilisation
Dans la scène `Structure` : `cut = prog(t, début, fin)` pilote la hauteur du faisceau (`360 * cut`) et la position de la pointe ; `beam = 1 - prog(t, fin, fin + 0.25)` l'éteint ; `apart = prog(t, fin, fin + 0.55, easeOut)` écarte les deux moitiés (`translateX ±34 px`, `rotate ±3°`) ; `fog = 1 - prog(t, fin + 0.55, fin + 1.45)` dissipe les « ? ». Caler `fin` juste avant le mot clé de la voix. Même film : globe photo-texturé `<PhotoGlobe t={t} d={440} />` (photo HD qui défile derrière un masque circulaire, méridiens qui tournent, ombrage 3D, halo, pastille en orbite), temple des fondements dont les colonnes passent du flou au net, cartes qui pivotent tamponnées « CONTRÔLE », analyse d'écart à la loupe (barre hachurée « ÉCARTS ») et planning de transition qui se remplit, carrousel cylindrique 3D final.

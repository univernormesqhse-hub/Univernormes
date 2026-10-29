---
name: Film 3D WebGL — site industriel, fromage suisse, hiérarchie, PDCA
section: assets
slug: fromage-suisse-3d
description: Film 3D temps réel (Three.js / @remotion/three) entièrement procédural : site industriel de nuit (cuves, tuyauteries, passerelle sans garde-corps, grue et charge qui balance), scanner volumétrique qui détecte 4 dangers, jauge de risque ; modèle de Reason avec 4 plaques extrudées percées de vrais trous, trajectoire qui traverse les failles alignées, arrêt sur image, retour en arrière (faisceau qui recule, cadre rouge « RETOUR »), une plaque pivote et la trajectoire se brise en éclats ; hiérarchie des mesures en 5 blocs qui tombent ; anneau PDCA qui se trace autour du site, piliers Q·H·S·E, passage nuit → aube. Caméra à images clés avec coupes, halos additifs (bloom simulé), poussière, typographie cinétique 2D en surcouche, bande-son synthétisée synchronisée.
quand: Film « vitrine » sans voix, explication d'une chaîne causale (danger → risque → barrières → accident), démonstration du modèle de Reason, ou tout sujet qui gagne à être mis en scène dans un décor 3D.
component: src/ligneInvisible/Site3D.tsx
demo: Demo-FromageSuisse3D
tags: [3D, WebGL, three.js, Reason, fromage suisse, hiérarchie des mesures, PDCA, film, sound design]
---

## Utilisation
`<ThreeCanvas><Scene3D t={t} /></ThreeCanvas>` (temps en secondes). Caméra : tableau `KEYS` `[t, position, cible, fov]` (deux clés au même instant = coupe). Dangers : `HAZ`, barrières : plaques de `Reason`, mesures : `HIER`. Surcouche 2D et post-traitement dans `LigneInvisible.tsx` ; bande-son régénérable avec `python3 scripts/ligne-invisible-son.py`.
Dépendances : three 0.169, @react-three/fiber 9.1.2, @remotion/three 4.0.532.

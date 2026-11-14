---
name: Les 3 B de la souffrance (burn-out, bore-out, brown-out) « record de motion design » — flamme volumétrique en shader, bougie qui fond, tubes de verre au liquide qui ondule et se vide, presse qui écrase, boussole qui perd le nord, vortex du vide existentiel
section: assets
slug: trois-b-record-metro
description: Capsule métro (1 min 03, voix d'origine d'une vidéo fournie) à quatre guichets et dix stations (gyrophare `TK = 3.4`, cadre de marquage au sol jaune / noir, NeoCaptions, aucune musique) qui ajoute aux packs `SwotGL`, `DangerGL` et `FishGL` un quatrième pack réutilisable, `src/troisBRecordMetro/BurnGL.tsx` — `Flame` (flamme volumétrique en shader, deux plans croisés additifs, lumière qui vacille), `Embers` (braises en spirale), `LiquidTube` (tube de verre à transmission ; liquide opaque en shader : niveau, surface qui ondule, bulles, teinte trouble `murk`), `Compass3D` (boussole dont l'aiguille perd le nord, `lost` 0 → 1), `Vortex` (disque qui aspire en spirale), `Press` (presse qui descend). Scènes — `BIntro` (trois « B » vernis), `BBurnFlame` (bougie qui fond, mot « BURN-OUT » lancé avec flou de mouvement), `BBattery` (physique, émotionnel, mental : trois tubes qui se vident et virent au rouge), `BPress` (le plus engagé sous une pression écrasante, sans reconnaissance ni ressources), `BSide` (les trois tubes côte à côte : surcharge qui bout et brûle, sous-charge presque vide, brun trouble avec boussole perdue et vortex), `BEnd`. Note : le liquide doit rester opaque pour être vu à travers un verre à transmission.
quand: Burn-out, bore-out, brown-out, risques psychosociaux, épuisement professionnel, surcharge ou sous-charge de travail, perte de sens, santé mentale au travail ; toute scène 3D de flamme, de niveau de liquide ou de « vide ».
component: src/troisBRecordMetro/TroisBRecordMetro.tsx
demo: Demo-TroisBRecord
tags: [burn-out, bore-out, brown-out, RPS, santé mentale, WebGL, shaders, flamme, liquide, boussole, vortex, métro]
---

## Utilisation
`LiquidTube u pos level c murk s` (niveau 0 → 1) ; `Flame3D u pos s i` (dans la capsule, importé sous ce nom pour éviter le conflit avec l'icône Lucide `Flame`) ; `Compass3D u pos s lost` ; `Vortex u pos s r` ; `Press y pos w`.

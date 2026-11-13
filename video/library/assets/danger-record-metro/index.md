---
name: Danger ou risque ? « record de motion design » — ombres portées en temps réel, gobelets tournés en volume, mur de briques instanciées, cloches de verre physique, éclair et arcs électriques procéduraux, personnage 3D qui marche / s'électrocute / chute, vu-mètres 3D, particules « NUANCE » → « CRUCIALE »
section: assets
slug: danger-record-metro
description: Capsule métro (34 s, voix d'origine) à quatre guichets et dix stations (gyrophare `TK = 3.4`, cadre de marquage au sol jaune / noir, NeoCaptions, aucune musique) qui ajoute au pack WebGL `SwotGL` un second pack réutilisable, `src/dangerRecordMetro/DangerGL.tsx` — `GLStageS` (scène three.js avec ombres PCF douces), `KeyLight` (lumière qui projette l'ombre), `ShadowFloor` (sol invisible qui ne garde que l'ombre sur le papier), `Cup` (gobelet LatheGeometry vernis + mot extrudé), `BrickWall` (briques instanciées qui tombent une à une), `GlassJar` (cloche de verre à transmission sur socle de musée), `Bolt3D` (éclair extrudé émissif qui scintille + arcs électriques régénérés à chaque image + lumière qui palpite), `Stairs` (escalier qui se construit), `Figure` (personnage articulé : marche, électrocution, chute), `Sparks` (gerbe d'étincelles balistiques), `Meter` (vu-mètre 3D en segments instanciés). Scènes — `DrCups` (bonneteau DANGER / RISQUE puis mur qui les sépare), `DrMuseum` (le danger : l'électricité et l'escalier sous cloche, « un fait indéniable »), `DrRisk` (le risque : on s'expose, électrocution, chute dans l'escalier), `DrEval` (pas l'escalier en soi : probabilité et gravité), `DrNuance` (particules « NUANCE » → « CRUCIALE »). Packs 25 techniques et 15 effets recalés. Seuls les chiffres prononcés sont affichés (aucun).
quand: Danger et risque, différence danger / risque, propriété intrinsèque, exposition, événement redouté, probabilité et gravité, évaluation des risques ; toute scène 3D qui demande des ombres, du verre, de l'électricité ou un personnage qui chute.
component: src/dangerRecordMetro/DangerRecordMetro.tsx
demo: Demo-DangerRecord
tags: [danger, risque, probabilité, gravité, WebGL, ombres temps réel, verre, électricité, personnage 3D, métro]
---

## Utilisation
Dans `<GLStageS>` : `<Env />`, `<KeyLight pos k />`, `<ShadowFloor y />`, puis les objets (`castShadow` est déjà réglé). `Figure walk zap fall` : phase de marche, électrocution 0 → 1, chute 0 → 1. `Bolt3D arcs` : opacité des arcs. `Meter v c` : niveau 0 → 1.

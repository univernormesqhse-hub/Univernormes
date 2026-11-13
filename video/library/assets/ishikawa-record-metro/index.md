---
name: Diagramme d'Ishikawa « record de motion design » — monde sous-marin (caustiques, rayons de lumière, bulles), arête de poisson en tubes 3D qui poussent, cartes photo qui se déroulent comme une page, vol de caméra le long de la colonne vertébrale, tête du problème qui passe au vert
section: assets
slug: ishikawa-record-metro
description: Capsule métro (1 min 09, voix d'origine) à cinq guichets et onze stations (gyrophare `TK = 3.4`, cadre de marquage au sol jaune / noir, NeoCaptions, aucune musique) qui ajoute aux packs `SwotGL` et `DangerGL` un troisième pack réutilisable, `src/ishikawaRecordMetro/FishGL.tsx` — `CausticFloor` (fond marin aux caustiques lumineuses, shader procédural), `GodRays` (rayons volumétriques additifs), `Bubbles` (bulles qui montent), `GrowTube` (tube 3D le long d'une courbe Catmull-Rom qui pousse grâce à `setDrawRange`), `CurlCard` (carte photo arrondie qui se déroule comme une page, courbure en vertex shader, bordure couleur), `pathCam` (vol de caméra sur courbe, regard en avant). Scènes — `FmIntro` (le squelette entier s'assemble, caméra en orbite), `FmProblem` (la tête du problème, puis la colonne vertébrale qui pousse et s'illumine), `FmFiveM` (les cinq grandes arêtes une à une, carte photo à chaque extrémité, une brindille par cause prononcée), `FmCauses` (causes principales, petites branches secondaires, vol le long de la colonne, tête qui passe du rouge au vert sur « actions correctives »), `FmEnd` (vue de dessus structurée, carte « le template » à télécharger). `farK` éloigne une série d'images clés de caméra d'un facteur donné. Seuls les chiffres prononcés sont affichés (5 M).
quand: Diagramme d'Ishikawa, arête de poisson, diagramme causes-effet, 5M / 6M / 8P, analyse des causes, résolution de problèmes, actions correctives ; toute scène 3D qui doit faire pousser un réseau de branches, montrer des photos en 3D ou voler le long d'un parcours.
component: src/ishikawaRecordMetro/IshikawaRecordMetro.tsx
demo: Demo-IshikawaRecord
tags: [Ishikawa, 5M, causes, arête de poisson, WebGL, shaders, caustiques, tubes, caméra en vol, métro]
---

## Utilisation
Dans `<GLStageS>` : `<FmWorld u />` (environnement, lumière, caustiques, rayons), puis `FmSkeleton spine bones twigs fine head ok` (progressions 0 → 1). `GrowTube pts k r c glow` ; `CurlCard src k pos rot w h border` ; `pathCam(points, k)` renvoie `{p, at}` pour `<Cam>`.

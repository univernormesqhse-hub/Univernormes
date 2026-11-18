---
name: Presque-accident, le signal — capsule métro 2D (fond blanc, roue de Deming « QHSE », bordure marquage jaune / noir, triptyque), cloche d'alarme, frise de signaux faibles, cartes qui se retournent d'aujourd'hui à demain, cadeau qui s'ouvre, dominos de la cause à l'effet
section: assets
slug: presque-accident-metro
description: Capsule métro (3 min 56, voix d'origine) entièrement en 2D sur l'habillage de `manutention-metro` (`WhiteBg`, `DemingCorner`, bordure marquage au sol, couverture `KTriptych` Signaler / Analyser / Corriger), sept guichets et douze stations, recherche qui ouvre un film photo 2D, NeoCaptions, aucune musique. Nouveaux outils 2D — `Medal` (grand médaillon icône à ressort, halo pulsé, vibration), `Bubble` (bulle de parole qui gonfle), `SignalRow` (frise de triangles d'alerte qui s'accumulent vers l'accident grave, le premier mis en avant), `FlipCard` (carte d'exemple qui se retourne vers sa version « demain », en rouge) ; scènes `PaIntro` (cloche, idées barrées, ombre de l'embuscade), `PaDef` (potentiel de catastrophe, trèfle de la chance, « Ouf ! », trois « personne ne… » barrés), `PaSignal` (avertissement gratuit, faille, signaux avant-coureurs, pari perdu), `PaCases` (outil / glissade / étincelle, horloge « mais quand »), `PaMethod` (traiter, analyser, corriger), `PaCulture` (cœur, confiance, bouclier, électrocardiogramme), `PaFinal` (cadeau, dominos, aujourd'hui / demain). Réutilise `DrawWord`, `Fold`, `Stamp2`, `NumList`, `PopChip`, `Crossed`, `FilmStrip`.
quand: Presque-accident, signalement, remontée d'incidents, signaux faibles, culture sécurité juste, pyramide des accidents ; toute capsule « aujourd'hui sans conséquence, demain un drame » sur fond blanc sans 3D.
component: src/presqueAccidentMetro/PresqueAccidentMetro.tsx
demo: Demo-PresqueAccidentMetro
tags: [presque-accident, signalement, signaux faibles, culture sécurité, incident, fond blanc, 2D, métro]
---

## Utilisation
`Medal x y r at c ic glow shake=[a,b] out` ; `Bubble x y w at l c fs out` ; `SignalRow at n y first` ; `FlipCard x y w h at flip ic l sub ic2 l2 c`.

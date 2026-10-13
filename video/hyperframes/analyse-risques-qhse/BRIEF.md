---
workflow: general-video
flow: automation
storyboard: no
aspect: "9:16 + 16:9"
duration: 428.76
destination: social-vertical + youtube
---

# Analyse des risques QHSE — « LE SIGNAL »

## Intent

Version premium, à la longueur de la source (7 min 09), en 9:16 (`index.html`) et 16:9 (`../analyse-risques-qhse-16x9/`),
générées depuis la même liste de scènes (`python3 build.py`).

Direction artistique « LE SIGNAL » : salle de contrôle de nuit dans la charte UNIVERSNORMES (marine, vert), grille
lumineuse, halos qui dérivent, cartes de verre, reflets lumineux à chaque changement de plan. Fil rouge : une **ligne
d'oscilloscope** vivante (en bas en 9:16, en haut en 16:9) qui défile tout le film, réagit aux « signes avant-coureurs »
et vire au rouge sur la sirène finale.

Scènes clés : radar de couverture, oscilloscope des signes avant-coureurs, triade danger / probabilité / gravité,
fiches méthodes HAZOP / MOSAR / 5 pourquoi, cadran APR ⟷ AMDEC (F × G × D), arbres des causes / défaillances / événements,
C = P × G puis matrice 5 × 5 vivante, 7 étapes terrain (identification puis évaluer / décider / mettre à jour),
genchi genbutsu, risques combinés, biais d'optimisme, espoir vs barrière, plan d'action piloté, murmures → hurlement,
sirène finale.

## Assets

- Voix d'origine intégrale ; sous-titres = `src/script.txt` (texte corrigé) aligné mot à mot sur l'ASR (`src/align.py`).
  Le passage 4:36–5:00 était mal capté par l'ASR : il est reconstitué d'après la diapositive « Phase d'action ».
- Photos réelles de la banque UNIVERSNORMES ; icônes Fluent Emoji ; bruitages `sfx2` (pas de musique).
- Typographie (CLAUDE.md) : accroches Montserrat ExtraBold, sous-titres Inter Medium, notes Patrick Hand, étiquettes Space Mono.

---
workflow: general-video
flow: automation
storyboard: no
aspect: "9:16 + 16:9"
duration: 451.93
destination: social-vertical + youtube
---

# Les 15 erreurs du débutant HSE (de la théorie au terrain)

## Intent

Version premium, **à la longueur de la vidéo source (7 min 32)**, en deux formats générés depuis la même liste de scènes :
`index.html` (9:16, ce dossier) et `../erreurs-debutant-hse-16x9/index.html` (16:9). Les 4 skills vidéo du dépôt sont
combinés dans la charte UNIVERSNORMES :

- **William** : cartes UI premium, titres de partie (grand chiffre + carte), maquettes (tableau Excel), inclinaisons 3D ;
- **Ray** : papier millimétré, cartes à ombre dure, idées reçues barrées puis corrigées, équations, karaoké « encre » ;
- **ambassa** : passages par flou, mots géants (COMPRENDRE / CORRIGER), karaoké « gris » ;
- **Amadou** : fond chaud à anneaux flous, citations surlignées, karaoké qui sort du flou.

Montage inédit : collision école / terrain, mur de briques qui s'effondre, balance respect > peur, hiérarchie des contrôles
qui se construit, marteau qui traverse le tableau Excel, compteur « jours sans accident » puis pastèque qui s'ouvre,
réseau de l'écosystème HSE (portraits réels), route GPS des 4 parties (en bas en 9:16, en haut en 16:9).

## Assets

- **Voix d'origine intégrale** (`assets/voix-origine.m4a`).
- Sous-titres : script corrigé à la main (`src/script.txt`, l'ASR fait des erreurs) puis aligné mot à mot sur la
  transcription horodatée de la voix (`src/align.py`, sherpa-onnx). `*mot*` = vert, `!mot!` = rouge.
- Photos réelles de la banque UNIVERSNORMES (`video/public/`), professionnels africains noirs.
- Icônes Fluent Emoji, polices Montserrat / Patrick Hand (charte), Archivo Black, Space Mono ; bruitages `sfx2`.

## Customizations

- Générer : `python3 build.py` (écrit les deux `index.html` et recopie les assets dans le dossier 16:9).
- Couverture (image 0) : « 15 erreurs du débutant HSE — de la théorie au terrain » (titre de la source).
- Pas de musique de fond ; bruitages seuls. Aucun chiffre inventé (le compteur « jours sans accident » est un décor qui tombe à 0).

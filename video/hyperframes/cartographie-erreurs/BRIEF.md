---
workflow: general-video
flow: automation
storyboard: no
aspect: "9:16"
duration: 117.65
destination: social-vertical
---

# Cartographie des processus : 5 erreurs à éviter (ISO 9001)

## Intent

Version courte premium (≈ 1 min 58) de la vidéo source de 6 min 30 « Quelques erreurs à éviter lors de l'établissement de votre
cartographie de processus », en combinant les 4 skills vidéo du dépôt dans la charte UNIVERSNORMES :

| Scène | Contenu | Style dominant |
|---|---|---|
| Couverture | titre de la thématique dès l'image 0, « labyrinthe ou carte claire ? » | William (UI premium) |
| GPS | la cartographie = le GPS de l'entreprise, éclat vert, mot géant | ambassa |
| Définition | organigramme barré → flux client → valeur livrée → ISO 9001 § 4.4 | Ray (cartes à ombre dure, étiquettes mono) |
| 3 niveaux | application de carte en 3D, zoom macro → méso → micro (logigramme), échelle de zoom | William + zoom cartographique |
| 3 familles | bandes management / réalisation / support avec portraits réels | Amadou (mots qui sortent du flou, surligneur) |
| 5 erreurs | chaîne de 5 maillons qui rougissent + cartes néo-brutalistes qui s'abattent | Ray + William |
| Pilotage | idée reçue barrée → « un outil de pilotage » + pouls de l'entreprise | Ray + ambassa |
| Appel à l'action | « claire ou labyrinthe ? », champ de commentaire tapé | ambassa + Amadou |

Fil rouge inédit : une route GPS en bas d'écran dont le repère avance d'étape en étape. Karaoké en haut d'écran avec
4 grammaires (couleur, gris, flou, montée) selon la scène.

## Assets

- **Voix d'origine** de la vidéo source : 21 extraits montés bout à bout (`assets/voix-origine.m4a`, 114 s),
  `timeline.json` = début / fin de chaque extrait dans le montage. Le karaoké reprend les mots exacts du narrateur.
- Les animations sont écrites sur une timeline de référence (`src/timeline-tts.json`, première version avec voix générée
  `assets/voix.m4a`) puis recalées phrase par phrase sur la voix d'origine (fonction `M` dans `build.py` et le template).
- Photos réelles de la banque UNIVERSNORMES (`video/public/`), professionnels africains noirs quand une personne est visible.
- Polices Montserrat, Patrick Hand (charte), Archivo Black, Space Mono, Caveat (OFL) ; icônes Fluent Emoji ; bruitages `sfx2`.

## Customizations

- `index.html` est généré : modifier `src/template.html` ou `build.py`, puis `python3 build.py`.
- Pas de musique de fond ; bruitages seuls.
- Aucun chiffre inventé : seuls ISO 9001 § 4.4 (processus) et le contenu de la source sont cités.

---
name: video-storytelling-amadou
description: Crée une vidéo verticale de storytelling / présentation de chaîne (50–60 s) au style « Mr Amadou » — fond blanc chaud avec grandes formes jaunes floutées qui dérivent, portrait détouré dans un disque jaune avec rayons, texte fin qui sort du flou mot à mot et mots-clés surlignés au feutre jaune, écriture manuscrite, personnages plats en aplat à peau foncée, maquettes de téléphone, ampoule qui s'allume, carte de profil finale avec bouton jaune. Utiliser pour une vidéo de présentation, un « qui suis-je », le lancement d'une série, un témoignage, une sensibilisation racontée, ou une vidéo « comme Mr Amadou / storytelling / personal branding ».
---

# Vidéo « storytelling » — style Mr Amadou

Recette tirée de l'analyse d'une vidéo de référence (63 s, 9:16, 576×1024, 30 i/s, voix seule + bruitages, pas de musique).
On reprend **le style et la mécanique**, jamais l'identité de l'auteur (nom « Mr Amadou », sa photo, son pseudo) :
le présentateur est UNIVERSNORMES ou une personne réelle fournie par l'utilisateur.

Gabarit prêt à l'emploi : `starter/` (composition HyperFrames de 16 s, personnage plat SVG réutilisable ; validée par `hyperframes check`).

## 1. Analyse de la référence

| Temps | Beat | Visuel | Mécanique |
|---|---|---|---|
| 0–3 s | **Présentation** « Hello, je suis Mr Amadou. » | photo détourée qui monte dans un grand disque jaune, rayons jaunes qui jaillissent derrière, onde sonore à droite | nom en gras **surligné jaune** |
| 3–6 s | Aveu « Et non, ce n'est pas moi… c'est une voix IA. » | petit portrait rond + robot blanc à visière, étiquette noire « Voix IA » | honnêteté = connivence |
| 6–7,5 s | « Mais bon, on ne va pas en faire un roman » | livre ouvert dessiné | |
| 9–13,5 s | **Le sujet** « Je viens de créer… sur lequel je vais parler de » | maquette de téléphone avec profil vierge « Nouveau compte · S'abonner », puis 2 pastilles « storytelling », « personal branding » | téléphone qui rétrécit |
| 15–16,5 s | Le jargon | personnage plat sur estrade, mégaphone, bulles noires « STORYTELLING ! » « PERSONAL BRANDING ! » | bras levés |
| 18–21 s | L'ennui | personnage qui fait défiler un téléphone, doigt qui glisse | « certains ont déjà envie de défiler » |
| 21–22,5 s | « Moi je vais les ramener » | les pastilles retombent au sol | |
| 22,5–27 s | **Définition 1** « Le storytelling, c'est savoir raconter pour qu'on s'en souvienne » | 2 personnages face à face, bulles de pensée (photo, cerveau) ; fin de phrase en écriture manuscrite | idée → mémoire |
| 27–31,5 s | **Définition 2** « Le personal branding, c'est ce que les gens retiennent de toi » | orateur sur une estrade portée par 3 personnes, puis têtes auréolées de son visage | |
| 33–36 s | Pourquoi ça compte | cartes blanches à icônes : Vendre (colis + étiquette prix), Des clients, Un travail, Un stage | apparition une par une |
| 37,5–40,5 s | **Le problème** « on te l'explique avec des schémas, des pyramides et des mots compliqués » | tableau blanc sur chevalet qui se remplit d'organigrammes, pyramide, sigles (SEO, KPI, USP, B2B, ROI), points d'interrogation | surcharge croissante |
| 42–45 s | **La promesse** « Ici ce sera différent : des vidéos de moins d'une minute » | téléphone jaune avec avatar et barre de lecture 0:00 → 0:43 | |
| 45–46,5 s | « Une idée à la fois » | ampoule suspendue qui s'allume (halo jaune) | |
| 46,5–48 s | « Des choses que tu peux essayer » | calendrier « OCT · 6 » | |
| 48–49,5 s | Abonnement | pilule jaune « + S'abonner » + doigt qui tape | |
| 49,5–54 s | **Engagement** « si tu trouves que j'utilise des mots compliqués, dis-le-moi en commentaire » | téléphone avec fil de commentaires qui se remplit | |
| 54–58,5 s | **Signature** | photo ronde à anneau jaune, nom en gras, « storytelling & personal branding » manuscrit, bouton jaune « Raconte ton histoire » | |
| 58,5–63 s | Fin plateforme (TikTok) | — | **ne pas reproduire** |

Rythme : un plan toutes les 1,5–4 s, fondus courts entre plans ; le texte en haut (y ≈ 300 px) affiche la phrase en cours
sur 1 à 4 lignes, les mots **sortent du flou** au moment où ils sont dits.

## 2. Constantes de style (en 1080×1920)

| Élément | Valeur |
|---|---|
| Fond | blanc chaud `#FBFAF4` + 2–3 grands anneaux jaunes (bordure 90 px) floutés `blur(60px)` à 22 % d'opacité qui dérivent lentement |
| Encre / jaune / sarcelle | `#1A171A` / `#FECD01` / `#538D94` |
| Texte | Inter 400, 60 px, interligne 1,22, centré ; nom / mot fort en Inter 800 76 px |
| Surligneur | bande jaune sur les 46 % bas du mot, `scaleX 0 → 1` de gauche à droite, 0,3 s, juste après le mot |
| Manuscrit | Caveat 600, 78–92 px, révélé par masque de gauche à droite (`clip-path inset`) |
| Portrait | photo réelle dans un disque jaune (bordure 18 px `#FECD01`), rayons jaunes arrondis à 55 % derrière |
| Personnages | aplats sans contour : peau `#6B3F25` / `#8A5636`, cheveux `#1A1414`, chemise blanche / sarcelle / moutarde / brique, pantalon `#1F2A44` ; symbole SVG `#perso` du starter (`--shirt` pour la couleur) |
| Cartes | blanches, rayon 28 px, ombre douce `0 20px 44px rgba(26,23,26,.12)`, icône + légende Inter 600 |
| Bulle | pilule noire, Inter 800 blanc 36 px |
| Bouton | pilule jaune, Inter 800 44 px, ombre jaune |
| Polices fournies | `starter/assets/` : Inter 400/600/800, Caveat 600 (OFL) |

Mouvements (GSAP, voir `starter/index.html`) : mots `blur(14px) → 0` + opacité en 0,28 s ; surligneur via la variable CSS `--hl` ;
portrait qui monte (`y 500 → 0`, `scale 0.2 → 1`, `back.out(1.4)`) ; rayons `scaleY 0 → 1` en cascade ; personnages qui entrent par le bas ;
ampoule qui descend en rebond, se balance, halo qui s'allume ; manuscrit révélé par masque.

Son : **pas de musique**. `soft-whoosh` à l'entrée du portrait, `pop` sur chaque carte et bulle, `swish` entre les plans,
`ding` quand l'ampoule s'allume, `click` sur le bouton. Volumes 0,35–0,5.

## 3. Adaptation QHSE (script type)

1. **Présentation** — « Bonjour, ici **UNIVERSNORMES**. » (logo ou portrait réel fourni dans le disque jaune)
2. **Connivence** — un aveu ou une question simple (« On ne va pas faire un cours magistral. »)
3. **Le sujet** — téléphone / pastilles : « prévention », « culture sécurité »
4. **Le jargon** — personnage sur estrade qui crie les sigles (« DUERP ! », « ISO 45001 ! »)
5. **Définitions** en 2 plans avec bulles de pensée et fin de phrase manuscrite
6. **Pourquoi ça compte** — 4 cartes (moins d'accidents, des clients rassurés, un audit réussi, des équipes qui rentrent chez elles)
7. **Le problème** — tableau blanc qui se surcharge de sigles
8. **La promesse** — « des vidéos de moins d'une minute », « une idée à la fois » (ampoule), « à essayer dès lundi » (calendrier)
9. **Engagement** — fil de commentaires + « dis-le-moi en commentaire »
10. **Signature** — carte de profil + bouton jaune (« Pose ta question »)

Règles de contenu (obligatoires) :
- **Ne jamais inventer** une personne, un nom, un chiffre ni un témoignage : le portrait est une photo réelle fournie
  (ou de la banque `video/public/`), les cartes « pourquoi » restent qualitatives sans source.
- Toute personne ou personnage représenté est **africain noir** (CLAUDE.md du dépôt).
- Ne pas reproduire le nom, la photo, le pseudo ni l'écran de fin TikTok de la référence.

## 4. Production dans ce dépôt (HyperFrames)

1. Créer `video/hyperframes/<nom>/` : copier `starter/` puis `hyperframes.json`, `meta.json`, `package.json`, `.gitignore`
   d'un projet existant (ex. `video/hyperframes/acronymes-securite/`).
2. **Voix** fournie (caler les `data-t` des mots et les `data-h` des surlignages) ou générée (Kokoro `ff_siwis`).
3. `BRIEF.md` (workflow `general-video`) + tableau temps / beat / visuel.
4. Un `<div class="scene clip">` par beat, fondu de 0,25 s en sortie ; les anneaux jaunes floutés sont un calque permanent.
   Pour des personnages variés : dupliquer `<use href="#perso">` avec un autre `--shirt`, ou ajouter des variantes au `<defs>`.
5. `npx hyperframes check`, snapshots sur 8–10 instants (aucun texte caché par un élément : fil de l'ampoule, bulles),
   rendu `--crf 20` → loudnorm `I=-14:TP=-1.5:LRA=11` → 720p (crf 25).
6. Couverture : faire apparaître le titre de la thématique sur l'image 0 (texte déjà net, sans flou d'entrée, dans le premier plan).

---
name: capsule-ui-neo-brutal
description: Crée une capsule verticale (45–60 s) au format « interface néo-brutaliste » (référence analysée : vidéo TikTok @max_simplifia « Claude Motion ») — fond uni crème-gris, cartes d'interface blanches à bordure noire épaisse et ombre portée dure décalée, une seule couleur d'accent, sous-titre central de 2 à 4 mots qui change à chaque groupe de mots avec UN mot en couleur, maquettes d'outil qui se construisent sous les yeux (champ de saisie, commande tapée lettre à lettre, pièce jointe, curseur de durée, éditeur de code qui modifie un résultat en direct), barrés « NON », pellicule de film, barre de progression, cartes « astuces » et bouton « S'abonner » cliqué. Utiliser quand on demande une vidéo « comme la vidéo Claude Motion », une présentation d'outil / de fonctionnalité / de méthode pas à pas, un tutoriel « tu tapes… tu joins… tu obtiens… », ou une capsule « UI motion » épurée pour UNIVERSNORMES.
---

# Capsule « interface néo-brutaliste »

Recette tirée de l'analyse image par image (1 image/s) et de la transcription mot à mot d'une vidéo de référence
(55,9 s, 9:16, 576×1024 natif, 30 i/s, voix off masculine énergique, tutoiement). Elle se produit dans ce dépôt
avec Remotion (`video/`). Ne pas copier la référence (marque, compte, textes) : en reprendre la mécanique.

## 1. Anatomie du format

### Structure (minutage de la référence)

| Temps | Beat | Voix | Image |
|---|---|---|---|
| 0–4,5 s | **Annonce** | « X vient de sortir… et ça change absolument tout » | icône d'app carrée (accent) qui tombe, nom en 2 lignes (« Claude » noir / « Motion » accent) qui s'écrit lettre par lettre, pellicule de film qui défile dessous (vignettes : graphique, camembert, « +18 % »), badge incliné « NOUVEAU » qui se colle |
| 4,5–9 s | **Le geste** | « Tu tapes juste /motion, tu joins ton fichier et tu dis ce que tu veux » | champ de saisie vide « Écris à… » → la commande se tape (`/mo|`) avec rangée de touches de clavier en dessous qui s'enfoncent une à une → pastille accent `/motion` ; un document « PDF » vole et se pose en pastille-pièce jointe ; le texte se tape, curseur souris qui clique la flèche d'envoi |
| 9–15,5 s | **Exemple concret** | « Par exemple : transforme ce rapport trimestriel en vidéo explicative de 30 s pour notre réunion d'équipe » | étiquette « EXEMPLE DE DEMANDE » (pilule noire, police mono) au-dessus d'une grande carte où la phrase s'écrit avec surlignage accent pâle des mots-clés ; puis la carte se réduit en haut et des widgets s'empilent dessous : curseur « Durée 0:11 → 0:30 », carte agenda « Réunion d'équipe · lundi 9:00 » |
| 15,5–21,5 s | **Le résultat se construit** | « Il construit une animation à partir de tes textes, graphiques, images, et elle se lit comme une vraie vidéo » | cadre en pointillés « … construit… » (points qui pulsent) → tuiles « Aa Textes », « Graphiques », « Images » qui arrivent une à une avec coche verte → la carte se remplit (« Ventes du T3 », « +18 % » accent, barres noires + dernière barre accent) → barre de lecture « ▶ 0:01 / 0:30 » qui avance pendant que le chiffre compte |
| 21,5–29 s | **Le « mais » / la différence** | « Mais voilà ce qui fait la différence : ce n'est pas un modèle vidéo IA, pas de fausses images, pas de personnes générées » | **plein écran accent** (seule rupture de fond) avec pictogramme rond « = » et texte blanc ; retour au fond crème : carte « Modèle vidéo IA » floutée barrée d'une croix accent + tampon « NON » ; polaroïds « fausses images » puis « personnes IA » qui tombent et se font barrer |
| 29–36,5 s | **La preuve** | « Il construit tout en code : tu changes un mot, un chiffre ou le timing, et tout le reste est identique » | fenêtre d'éditeur `motion.js` (3 pastilles, onglet) dont les lignes s'écrivent (`scene`, `titre`, `chiffre`, `barres`, `couleur`) ; flèche vers la carte-résultat ; une ligne modifiée (`"Ventes du T3"` → `"Croissance T3"`, `+15 %` → `+18 %`) est marquée d'un point accent et le résultat change en direct ; pellicule avec la vignette modifiée encadrée et les autres cadenassées + pilule verte « le reste : identique » |
| 36,5–43,5 s | **Export / compatibilité** | « Tu peux l'exporter en MP4 ou l'ouvrir dans n'importe quel logiciel de montage comme Descript ou Runway » | cœur qui pulse sur la carte, bouton « Exporté ✓ » cliqué, fichier qui sort ; icône fichier « MP4 », menu contextuel « Ouvrir avec… » (survol), deux fenêtres de logiciel reliées à l'icône par une ligne en pointillés, entourées une à une |
| 43,5–47,5 s | **Rareté** | « C'est en bêta, tout le monde n'y a pas encore accès » | carte produit + badge incliné « BÊTA », jauge « Déploiement en cours 37 % » hachurée, petits personnages ronds : « Ont accès » / barrière / « En attente » avec bulle « … » |
| 47,5–52 s | **Appel à s'abonner** | « Si tu veux plus d'astuces… abonne-toi pour la suite » | éventail de 3 cartes « ASTUCE 1/2/3 » (en-tête accent), carte de profil avec bouton « S'abonner » cliqué → « Abonné ✓ » + confettis |
| 52–56 s | Plaque de fin de la plateforme | — | — |

Règles d'or : **une seule idée par plan**, le plan change toutes les 1 à 2 s, chaque nom concret prononcé a son
objet à l'écran *au moment* où il est dit (« PDF », « 30 secondes », « réunion », « MP4 », « Descript »).

### Direction artistique

| Élément | Règle observée |
|---|---|
| Fond | aplat crème-gris `#EDEDE4`, sans grain ni dégradé. Une seule rupture : un plan plein cadre couleur d'accent `#CB6B53` (motif de points très léger) pour le « mais voilà ». |
| Accent | terracotta `#CB6B53` unique (chiffres, mot du sous-titre, pastilles de commande, badges, dernière barre) ; teinte pâle `#F6D6CB` pour les tuiles actives et le surlignage ; vert doux uniquement pour les coches. Le reste est noir `#111` et blanc. |
| Cartes | blanc pur, **bordure noire 3–4 px**, coins 14–18 px, **ombre dure décalée** noire (6–8 px vers le bas-droite, sans flou) — c'est la signature du style. Barres de titre de fenêtre rose pâle avec 3 pastilles. |
| Sous-titre | centré à ≈ 72 % de la hauteur, grotesque très grasse (Archivo Black / Montserrat 900), noire, ≈ 5 % de la largeur ; **2 à 4 mots seulement**, remplacés à chaque groupe ; **un mot en accent** par groupe (le mot porteur). Pas de fond, pas de contour. |
| Typo UI | sans-serif grasse pour les titres de carte, **mono** pour les commandes, le code et les étiquettes en capitales espacées (« EXEMPLE DE DEMANDE »). |
| Badges | rectangles accent inclinés de 8–12°, texte blanc en capitales, bordure noire, qui « se collent » avec un léger dépassement d'échelle (« NOUVEAU », « NON », « BÊTA »). |
| Pictos | traits noirs épais, remplissages plats, personnages ronds minimalistes (pastels) ; polaroïds légèrement inclinés. |
| Mouvement | apparitions en ressort court (scale 0,9 → 1 + translation 20–40 px), frappe lettre à lettre, compteurs, barres qui poussent, curseur souris qui se déplace et clique (petit enfoncement du bouton), croix dessinée en 2 traits, pellicule en défilement continu. La carte principale reste au centre et se transforme plutôt que de couper. |
| Son | voix off rythmée, phrases courtes, tutoiement ; micro-bruitages UI (clic, frappe, pop, swoosh, ding de coche) ; musique très discrète ou absente. |

## 2. Adaptation UNIVERSNORMES

- Couleurs : accent **vert de marque** `#22B573` (ou `#2E9B3E`), titres en marine `#082B66` au lieu du noir pur
  si besoin de cohérence avec la charte (garder bordures et ombres en `#111` pour le style), fond `#F3F5F7` ou
  `#EDEDE4`. Plan de rupture plein cadre en marine `#082B66` ou en vert.
- Logo officiel `promo/logo.png` sur la carte de profil finale (pas de faux compte, pas de logo de plateforme
  inventé). Remplacer « S'abonner » par l'action réelle (« Lien en bio », « Abonne-toi à UNIVERSNORMES »).
- Sujets adaptés :
  1. *Méthode pas à pas* : « Ton document unique en 4 gestes » → champ de saisie / fiche qui se remplit, curseurs,
     coches.
  2. *Présentation d'un ouvrage ou d'une offre* (ex. « Décrypter l'ISO 14001 ») : annonce + badge « NOUVEAU »,
     exemple de chapitre en carte, « ce n'est pas… / c'est… » avec barrés, carte produit + lien.
  3. *Outil QHSE* (grille d'audit, tableau d'indicateurs) : la carte-résultat se construit (tuiles « Exigences »,
     « Preuves », « Actions » cochées), un paramètre modifié change le résultat en direct.
- Ne jamais inventer de chiffres réels, de taux de déploiement, de clients ou de témoignages : les valeurs montrées
  dans les maquettes sont des exemples explicites ou viennent de l'utilisateur.

## 3. Production dans ce dépôt

1. **Script** : 120–150 mots pour ≈ 50 s, phrases courtes, tutoiement ; découper en groupes de 2–4 mots et
   choisir le mot accent de chaque groupe ; noter l'objet UI de chaque groupe.
2. **Voix** : ElevenLabs (« Florian » `FL0d5832ACnJkBaedeKX` pour un ton dynamique, ou « Isac »
   `SomyDQQmnE7TsltdiDgp`, modèle `eleven_v4`) ou voix fournie. Transcrire mot à mot avec
   `video/tools/asr-timestamps.py <audio.wav> <sortie.json>` (lancer depuis le scratchpad où se trouve le modèle
   sherpa-onnx FR) et caler les groupes de sous-titres sur les instants.
3. **Composition** `video/src/<sujet>/` (1080×1920, 30 i/s), composants :
   - `Card` (blanc, `border: 4px solid #111`, `borderRadius: 18`, `boxShadow: '8px 8px 0 #111'`), `Window`
     (barre de titre + 3 pastilles + onglet), `Badge` incliné, `Pill` mono (commande / pièce jointe / étiquette).
   - `TypeLine` (frappe lettre à lettre + curseur clignotant), `KeyRow` (touches qui s'enfoncent), `Cursor`
     (flèche souris interpolée entre points + clic), `Slider` (durée), `Counter`, `Bars`, `PlayBar`,
     `FilmStrip` (défilement en boucle), `CrossOut` (2 traits accent dessinés), `Confetti`.
   - `Caption` : groupes `{at, words, accent}` affichés à y ≈ 1380, mot accent en couleur, entrée en pop court.
   - Plans calés sur le début des groupes ; la carte principale persiste et se transforme entre plans voisins.
4. **Son** : `prevention2/Cine SoundDesign` avec `sfx/click` (frappe, clic), `sfx/pop` (apparitions),
   `sfx/swish` (vol du fichier), `validation` (coches), `tampon` (badge « NON »), musique facultative à 0,05.
5. **Contrôle** : 12–15 images fixes ; vérifier que le sous-titre ne dépasse jamais 1 ligne (2 au maximum), que
   les ombres dures sont nettes, que chaque objet nommé est à l'écran au bon mot ; rendu + loudnorm
   `I=-14:TP=-1.5:LRA=11`, script `render:<sujet>`, couverture (`remotion still`) en `attached_pic`.

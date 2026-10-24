---
name: capsule-fiches-qhse
description: Crée une capsule vidéo verticale UNIVERSNORMES au format « fiches éditoriales » (référence : « Les sigles importants à connaître en QHSE », SiglesQHSE / src/vocab) — fond papier vivant, bandeau logo + bande marine en haut, slogan en bas, une fiche par notion avec pastille de famille, compteur n/N, tuiles-lettres 3D qui tombent puis s'allument sur la voix, définition mot à mot, bloc visuel (photo + tuiles d'icônes, formule, pyramide, schéma), points de progression, transitions en balayage diagonal de marque. Utiliser quand on demande de refaire / reproduire une vidéo QHSE « en qualité », « comme les sigles », « comme les anciennes vidéos », ou pour toute capsule pédagogique qui énumère des notions (catégories, sigles, étapes, familles, documents).
---

# Capsule « fiches éditoriales » UNIVERSNORMES

Recette tirée de la capsule de référence `SiglesQHSE` (`video/src/vocab/Vocab.tsx`, 60 s, 1080×1920, 30 i/s).
Elle se produit dans ce dépôt avec Remotion (`video/`). La réutiliser telle quelle : c'est la charte que la marque
considère comme « la qualité ».

## 1. Ce qui fait la qualité du format

| Élément | Règle |
|---|---|
| Fond | `components/Background` : papier `#F1EDE3` + grain, grille de points qui monte, filigrane « UNIVERSNORMES » qui défile très pâle (3 %), 2 grandes taches floues vert / marine en parallaxe, particules « + » et cercles. **Jamais de fond sombre.** |
| Habillage | `components/Header` (vague blanche + liseré vert + logo officiel `promo/logo.png` à gauche, bande marine WhatsApp « FORMATIONS • AUDITS / ACCOMPAGNEMENT • CONSEIL » à droite) et `components/Footer` (slogan « Des normes aujourd'hui, un avenir durable demain »). Ils entrent en glissant à 0,05 s / 0,25 s et ressortent à l'outro. |
| Une fiche = une notion | En-tête de fiche à y = 290 : étiquette blanche (icône Fluent + titre de série en capitales, ex. « LEXIQUE DES SIGLES QHSE ») à gauche, compteur `01 / 20` dans la couleur de la fiche à droite. |
| Pastille de famille | y = 400, fond couleur de la famille, texte blanc en capitales espacées, entrée en ressort (`Enter bouncy`). |
| Tuiles-lettres | y = 590 : une tuile carrée arrondie par lettre (190–240 px), marine au départ, qui **tombent en cascade** (0,07 s d'écart, rotation ±12°) puis **s'allument dans la couleur de la famille au moment où la voix prononce le mot** (petit rebond d'échelle). Ombre portée + bord inférieur assombri = effet 3D. |
| Sous-titre secondaire | y ≈ 772 : développé anglais / précision en italique gris, initiales en couleur, badge « EN ». |
| Définition | y ≈ 860–905 : Montserrat 800, marine, **mot à mot calé sur la voix** (`[mot, instant, style]`) : style 1 = initiale colorée agrandie, style 2 = mot-clé plein, sinon mot de liaison gris plus petit. |
| Bloc visuel | centré y ≈ 1290 : photo dans une carte à bord blanc 10 px (`charte/ui PhotoCard`) + colonne de tuiles d'icônes blanches à liseré couleur ; ou formule (carte blanche, numérateur / trait qui se dessine / dénominateur) ; ou pyramide de gravité dont le niveau concerné s'allume avec étiquette « ◀ » ; ou schéma (arbre, étapes fléchées, cartes en cascade). Cartes : blanc, rayon 26, ombre douce, `borderBottom` 7 px couleur. |
| Progression | y = 1560 : points de 13 px, le courant s'étire en pilule de 40 px dans la couleur de la fiche, les passés en gris moyen. |
| Transitions | `components/Fx Wipe` : bande diagonale marine (ou couleur de la fiche) bordée de vert qui balaie l'écran à chaque changement de fiche (0,45 s). `Camera` : légère dérive de zoom permanente + secousse sur le moment dramatique, avec `Flash` blanc. |
| Sous-titres | `components/Captions` : boîte blanche manuscrite (Patrick Hand) à y = 1650, mots-clés `*…*` en vert. |
| Intro | mosaïque de tuiles colorées (une par notion) qui tombent, titre Montserrat 900 marine 120 px + ligne verte 92 px, phrase manuscrite 78 px, badge marine incliné −3° « N NOTIONS ». |
| Outro | `scenes/Outro` avec le logo, précédé d'un `Wipe`. |
| Son | **bruitages seuls**, ni musique ni ambiance (`prevention2/Cine SoundDesign`) : `page`/`soft-whoosh` à chaque fiche, `sfx/click` par tuile qui tombe, `tick` quand une tuile s'allume, `stylo` sur une formule, `sfx/ding` ou `deep-hit` sur la pyramide, `validation` sur une coche, `tampon` sur un badge, `signature-marque` à l'outro. |

Palette : marine `#0E2A5C`, vert `#2E9B3E`, papier `#F1EDE3`, rouge `#D9443A`, bleu `#3D7DD8`, violet `#7B5CD6`,
orange `#E67E22`, or `#E3A92B`. Polices : Montserrat (titres), Patrick Hand (manuscrit). Icônes : Fluent 3D
(`public/fluent/`, `iso/ui F`), personnages à peau foncée.

## 2. Méthode

1. **Voix** : garder la voix d'origine (extraire l'audio de la vidéo source dans `public/voix-<sujet>-origine.m4a`).
   Transcrire mot à mot en local : `video/tools/asr-timestamps.py` (sherpa-onnx, modèle zipformer FR), puis écrire
   `captions.ts` (2–4 mots par sous-titre, mots-clés entre `*`) et le recaler : `tools/retime-captions.py`.
2. **Découpage** : une fiche par notion, bornée sur la voix (début de fiche ≈ 0,1 s avant le premier mot). Chaque
   fiche a : famille + couleur, lettres / chiffre des tuiles, mots de définition horodatés (instants ASR), bloc visuel.
3. **Composition** `video/src/<sujet>/` en reprenant la structure de `vocab/Vocab.tsx` (`Entry[]`, `Letters`,
   `Definition`, `VisualBlock`, `Page`, `Intro`, `CUES`) et les composants partagés ci-dessus — ne pas réinventer
   l'habillage.
4. **Couverture** (`Couverture.tsx`, composition `<Id>Couverture`) : fond + header + footer, mosaïque, titre de la
   thématique, badge. Rendue en image fixe, affichée sur les premières images de la vidéo et jointe au MP4 comme
   vignette (`-disposition:v:1 attached_pic`).
5. **Visuels** : photos de la banque `public/` ou visuels générés par IA (sans droits) placés dans
   `public/<sujet>/`, toujours dans une `PhotoCard` (jamais plein écran sur fond sombre).
6. **Contrôle** : images fixes à 10–15 instants (`npx remotion still`, navigateur
   `REMOTION_BROWSER=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`), vérifier que rien
   ne déborde, que les tuiles s'allument sur le bon mot, que le bloc visuel ne touche ni la définition ni les points.
7. **Rendu** : script `render:<sujet>` dans `package.json` (rendu → still couverture → loudnorm
   `I=-14:TP=-1.5:LRA=11` + vignette), ligne dans `video/README.md`, composition dans `src/Root.tsx`.

## 3. Règles de contenu

- Ne rien inventer : chiffres, normes, définitions viennent de la voix ou d'une source fournie ; une référence
  ajoutée (ex. règlement) est signalée à l'utilisateur.
- Une seule information par fiche, titre / tuiles toujours en haut, beaucoup d'air.
- Personnages et mains : peau foncée.

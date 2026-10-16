---
name: style-amadou-storytelling
description: Applique le style « Mr Amadou » (storytelling & personal branding) à une vidéo verticale UNIVERSNORMES — fond blanc lumineux avec halos jaunes flous, phrase en haut qui s'écrit mot à mot avec mot-clé surligné jaune et mot manuscrit, personnages en illustration plate à peau foncée, portrait détouré dans un disque jaune, maquette de téléphone, pastilles noires à texte jaune, un visuel par idée. Utiliser quand on demande une vidéo « comme Amadou », « style Amadou », une capsule pédagogique simple et chaleureuse, ou quand une capsule doit combiner les skills de William, Ray, Ambassade et Amadou.
---

# Style « Amadou » — storytelling illustré, une idée à la fois

Recette tirée de l'analyse de la vidéo de référence de Mr Amadou (présentation de son compte TikTok
« storytelling & personal branding », 63 s, 9:16, 576×1024, 30 i/s, voix de synthèse assumée).
On reprend **le langage visuel**, jamais son identité : ni son nom, ni sa photo, ni les filigranes TikTok.

## 1. Ce qui fait fonctionner le format

- **Ton** : conversationnel, autodérision (« ce n'est pas ma voix… on ne va pas en faire toute une histoire »),
  promesse anti-jargon (« je vais les ramener sur terre », « pas de schémas, de pyramides, de mots compliqués »).
  Phrases courtes, définitions en une ligne (« Le storytelling, c'est… pour qu'on s'en souvienne »), « C'est tout. »
- **Structure** (≈ 60 s) : présentation (0–8 s) → sujet (8–20 s) → définitions simples (20–35 s) → à qui ça sert
  (35–40 s) → problème des explications compliquées (40–44 s) → promesse du format (44–52 s) → appel à s'abonner
  + question en commentaire (52–60 s) → carte de fin (portrait, nom, slogan, bouton).
- **Fond** : blanc chaud `#FAFAF5` avec 2–3 grands halos jaunes très flous (blur 60–90 px, opacité 15–25 %) qui
  dérivent lentement ; aucun quadrillage.
- **Texte** : toujours en haut (y ≈ 6–9 % de la hauteur), centré, sans-serif gras (Montserrat 700–800),
  apparition **mot par mot** calée sur la voix (les mots à venir restent invisibles ou gris très clair), le mot-clé reçoit
  un **surlignage jaune** `#F5C400` qui se dessine de gauche à droite sous le mot (hauteur 40 % du corps, léger
  débord). Un mot-chute par séquence passe en **manuscrit noir** (Patrick Hand / marqueur) sur sa propre ligne :
  « *sur terre.* », « *s'en souvienne.* », « *aujourd'hui même.* ».
- **Pastilles** : rectangles très arrondis noirs `#151515`, texte jaune gras, ombre portée douce ; elles tombent et
  rebondissent (ressort) ou s'empilent.
- **Illustrations** : personnages en aplat (style « flat vector »), peau foncée, contours absents, 3–4 couleurs
  (moutarde, bordeaux, vert sapin, blanc) ; objets simples (téléphone, livre, tableau blanc, ampoule, calendrier,
  mégaphone, bulles de pensée avec mini-portraits dans des disques jaunes).
- **Portrait** : photo réelle détourée posée sur un grand disque jaune plein, cadrée épaules ; réduite ensuite dans un
  petit cercle bordé de jaune (avatar).
- **Rythme** : changement de visuel à chaque groupe de 3–6 mots (≈ 1,2–2 s) ; transitions = fondu enchaîné court
  (6–8 images) + légère montée d'échelle ; un mot qui sort se floute (blur 8 px) en disparaissant.
- **Gags visuels** : objets qui confirment la phrase (livre qui s'ouvre puis se ferme « on ne va pas en faire toute une
  histoire », personnages qui « redescendent sur terre » sur un sol brun, coche ronde noire au-dessus d'une scène
  « C'est tout. », ampoule qui s'allume « une idée à la fois », main qui clique « + S'abonner »).
- **Carte de fin** : avatar au centre, nom en gras, slogan en manuscrit, bouton jaune.

## 2. Adaptation UNIVERSNORMES / QHSE

- Remplacer le portrait par une **photo réelle de travailleur ou d'animateur QHSE** (dossier `video/public/`),
  détourée si une variante `-d.png` existe (`causerie/manager-d.png`, `causerie/orateur-d.png`…).
- Garder le jaune comme couleur d'accent (`#F5C400`) — compatible avec la charte papier ; le marine `#0E2A5C` peut
  remplacer le noir des pastilles.
- Mots manuscrits : chutes du texte (« *sans jargon.* », « *dès lundi.* »).
- Les « gags visuels » illustrent les notions QHSE : EPI qui s'enfilent, panneau qui tombe, check-list qui se coche.
- Personnages : icônes Fluent peau foncée (`video/public/fluent/`) ou illustrations plates maison en SVG.

## 3. Production dans ce dépôt (Remotion, `video/`)

- Composer dans `video/src/<nom>/` en réutilisant : `Kin` (texte mot à mot, `src/durab/Durab.tsx`), `Pill`, `Card`,
  `F` (icônes Fluent, `src/iso/ui`), `Captions` (sous-titres), `SoundDesign` (`src/prevention2/Cine.tsx`), `Outro`.
- Nouveaux blocs à écrire pour ce style : `Highlight` (barre jaune animée sous un mot), `HandWord` (mot manuscrit
  révélé par `clipPath`), `YellowHalo` (halos flous animés), `Avatar` (photo dans un disque jaune).
- Son : bruitages seuls (pas de musique) — `sfx/pop` par pastille, `soft-whoosh` par changement de visuel,
  `stylo` sous un mot manuscrit, `validation` sur la coche, `sfx/click` sur le bouton.
- Contrôle : images fixes (`stills.mjs`), vérifier que le surlignage tombe sous le bon mot au bon moment.
- Combinaison avec les autres styles : Amadou donne la **chaleur et la clarté** (texte haut + surlignage + manuscrit +
  illustrations) ; à marier avec la typographie UI d'Ambassade, les schémas « décodés » de Ray et la mécanique
  promo de William.

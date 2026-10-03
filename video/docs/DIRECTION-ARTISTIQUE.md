# Direction artistique « premium institutionnel » UNIVERSNORMES

Référence appliquée à partir de la capsule `ResponsableQHSE` (kit réutilisable : `src/premium/kit.tsx`).

## Principes
- **Une seule famille typographique** : Montserrat (800 titres, 600–700 textes, 500 compléments).
- **Palette restreinte** : bleu institutionnel `#0E2A5C`, vert `#2E9B3E`, blanc, gris clair `#F3F5F8`,
  gris `#8A94A3` ; rouge `#C8402F` réservé aux alertes.
- **Pictogrammes vectoriels** cohérents (Lucide, licence ISC) dans des pastilles blanches — plus d'émojis 3D.
- **Mots-clés à l'écran** (surtitre vert + titre fort + trait), la voix off complète passant en
  sous-titres sobres sur bandeau bleu, mot prononcé surligné (lecture sans le son sur les réseaux).
- **Mouvements doux** (fondu + glissement, zoom lent sur les photos), aucune animation à rebond.
- **Transitions graphiques** : panneau bleu à liseré vert entre les chapitres.
- **Habillage discret** : logo officiel en haut à gauche, chapitre en cours à droite, barre de progression.
- **Intro courte** (logo puis titre en 4 s) et **outro réutilisable** (`PremiumOutro` : logo, appel à
  l'action, services, WhatsApp, signature).
- **Son** : voix prioritaire, musique à -24 dB environ, seulement un souffle discret aux changements de chapitre.
- **Ne rien inventer** : chaque libellé à l'écran reprend une information dite par la voix off.

## Composants (`src/premium/kit.tsx`)
`PremiumBackground`, `PremiumFrame`, `KeyTitle`, `Reveal`, `IconDisc`, `InfoCard`, `PhotoFrame`,
`Connector`, `PanelWipe`, `KaraokeCaptions`, `PremiumIntro`, `PremiumOutro`.

## Images
1. Banque fournie par le client (`public/promo`, `public/epi`, `public/induction`, …), logos tiers floutés.
2. Pictogrammes Lucide (npm `lucide-react`).
3. Images libres : `tools/fetch_images.py "<requête>" --out public/banque/<sujet>` (Openverse, CC0 / CC BY /
   CC BY-SA, crédits enregistrés en JSON). Le réseau de l'environnement cloud bloque ces banques :
   le script est à lancer en local, puis les images sont poussées dans le dépôt.

---

# Modèle UNIVERSNORMES « d'origine » enrichi (référence à partir de `PlanPrevention`)

Le client préfère son modèle d'origine (fond papier, bandeaux haut/bas avec le logo, sous-titres
manuscrits, titres cinétiques, illustrations 3D, photos en cartes). Il est conservé et enrichi :

- **Plans « cinéma »** (`src/prevention2/Cine.tsx` → `CineShot`) : photo plein cadre avec travelling,
  push/pull, panoramique, caméra à l'épaule très légère, étalonnage, vignettage et reflet lumineux.
- **Hiérarchie visuelle** : `Highlight` (cercle de mise en évidence qui se dessine puis pulse) pour
  montrer où regarder ; peu de texte, un mot-clé par idée.
- **Infographies animées** : piliers, feuille de route, balance, iceberg, pastèque, jauges.
- **Micro-animations** : stylo qui signe, tampon, classeur, flux d'informations, scanner.
- **Sound design sans musique** (`tools/sound_design.py` → `public/sfx2/`, sons synthétisés).
  Le client ne veut **ni musique ni son de fond** : pas d'ambiance d'usine (le composant `Ambience`
  reste disponible mais n'est plus utilisé), uniquement des bruitages réalistes (stylo, page, tampon, cadenas), impacts graves sur les révélations, riser,
  notification, signature sonore de marque sur le logo final.
- **Règle d'or** : pas « une phrase = un son » ; le spectaculaire sert la pédagogie.

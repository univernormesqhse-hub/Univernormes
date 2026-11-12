---
name: carte-pays-animee
description: Affiche automatiquement une carte politique animée, style atlas (mer vert d'eau, pays crème, frontières brunes, noms en capitales), dès qu'un pays du monde est cité dans une vidéo — le pays s'allume en vert, se soulève, un repère tombe et pulse, son nom apparaît en grand, puis la caméra peut plonger dessus. Couvre les 249 pays et territoires ISO avec leurs noms français et les gentilés courants (« ivoirien », « sénégalais », « américain »…), cadrage automatique sur la région concernée ou planisphère. Utiliser dès qu'une voix off, un script ou une demande mentionne un pays, une nationalité, une comparaison entre pays, une implantation, des sites dans plusieurs pays, ou quand l'utilisateur demande « montre-le sur une carte ».
---

# Carte pays animée

Composant Remotion prêt à l'emploi dans `video/src/carte/` :
- `pays.ts` : tous les pays du monde (base ISO 3166 via `i18n-iso-countries`, noms officiels français), noms d'usage
  corrigés (« Côte d'Ivoire », « États-Unis », « RD Congo »…), gentilés, fonctions `trouverPays()` et `detecterPays()`.
- `CartePays.tsx` : le composant `<CartePays />` et trois démonstrations (`CartePaysDemo` Afrique de l'Ouest,
  `CartePaysMondeDemo` planisphère, `CartePaysEuropeDemo` Europe), enregistrées dans `src/Root.tsx`.
- Contours : Natural Earth 1:50 m (domaine public) via `world-atlas`, projection `d3-geo` (Mercator en vue régionale,
  Natural Earth en planisphère).

## 1. Repérer les pays cités

1. Transcrire la voix mot à mot (`video/tools/asr-timestamps.py <audio.wav> <sortie.json>` depuis le scratchpad où se
   trouve le modèle sherpa-onnx FR), puis regrouper les jetons en mots `[mot, seconde][]`.
2. Appeler `detecterPays(mots)` : il renvoie chaque mention `{pays, at}`. Il reconnaît les noms composés jusqu'à
   5 mots (le plus long gagne : « Guinée équatoriale » avant « Guinée »), les noms sans accents, les gentilés
   (« ivoiriens » → Côte d'Ivoire) et les codes ISO.
3. Vérifier à la main les faux positifs : « Niger » (fleuve ou pays), « Guinée » (golfe ou pays), « Maurice » (prénom),
   « Tchad » (lac), « Congo » (fleuve, Congo ou RD Congo). En cas de doute, garder le contexte de la phrase.
4. Sans voix off (script écrit), passer directement les noms au composant.

## 2. Afficher la carte

```tsx
import {CartePays} from './carte/CartePays';

<Sequence from={s(12.4)} durationInFrames={s(6)}>
  <CartePays
    pays={['Sénégal', 'Bénin', "Côte d'Ivoire"]}   // noms, gentilés ou codes ISO, dans l'ordre de la voix
    instants={[0.8, 2.2, 3.6]}                       // secondes, relatives au début de la séquence
    zoom={2.2}                                       // plongée finale sur le dernier pays (1 = pas de zoom)
    legende="Golfe de Guinée"                        // texte libre en bas, facultatif
  />
</Sequence>
```

- `vue="auto"` (défaut) cadre la région autour des pays cités ; `contexte` (défaut 2,6) règle la marge de voisins
  visibles. `vue="monde"` affiche le planisphère (mettre `etiquettes={false}` pour éviter les noms minuscules).
- Chaque pays s'allume **0,2 à 0,3 s avant** le mot prononcé (l'œil doit arriver avec la voix).
- Un seul pays : zoom 1,8 à 2,5. Plusieurs pays proches : pas de zoom ou zoom sur le dernier. Pays sur plusieurs
  continents : `vue="monde"`.
- Les noms d'atlas des voisins s'effacent automatiquement près d'un pays allumé ; les grands noms qui se chevauchent
  sont décalés vers le bas ; le nom passe à gauche du repère près du bord droit.
- Couleurs : `couleurs={{accent: '#22B573', ...}}` pour la charte UNIVERSNORMES (vert #22B573, marine #082B66) ; le
  style atlas par défaut reprend la référence (mer #A9D6C2, terre #FBE3B6, frontières #B0652F, texte #5A2A12).

## 3. Règles d'exactitude

- Toujours les noms officiels actuels en français : Eswatini (pas Swaziland), Tchéquie, Macédoine du Nord, Myanmar,
  Cabo Verde peut s'écrire Cap-Vert. Ne jamais reprendre les fautes d'une carte de référence (« Lestoho »,
  « Mediterranean » mal écrit…).
- Territoires contestés : les contours suivent Natural Earth (Sahara occidental séparé du Maroc, Somaliland sans nom).
  Si le sujet est sensible, prévenir l'utilisateur avant publication.
- Le centre d'un pays à territoires lointains (France avec la Guyane, Norvège avec le Svalbard) peut être décalé :
  vérifier sur une image fixe que le repère tombe bien dans le pays et ajuster si besoin.

## 4. Contrôle

Rendre 2 à 3 images fixes de chaque séquence carte (`npx remotion still <Composition> --frame=<n>` avec
`--browser-executable` pointant vers le Chromium préinstallé) : pays allumé au bon moment, nom lisible et non coupé,
aucun nom d'atlas qui chevauche le nom principal, zoom centré sur le bon pays.

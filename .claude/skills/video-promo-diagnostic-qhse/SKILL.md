---
name: video-promo-diagnostic-qhse
description: Crée une vidéo verticale courte (30–40 s) de promotion d'un diagnostic / audit QHSE au format « UI motion premium » (accroche problème en 3 temps, chaîne de 5 maillons dont un casse, maquette d'outil, score /100 animé, livrables cochés, appel à l'action avec URL tapée). Utiliser quand on demande une vidéo promo, une pub TikTok/Reels/Shorts, un teaser d'audit, de diagnostic, de formation ou d'offre UNIVERSNORMES « comme la vidéo de référence William Angora ».
---

# Vidéo promo « diagnostic QHSE » — format UI motion premium

Recette tirée de l'analyse d'une vidéo de référence (promo « Audit Contenu & Clients », 34 s, 9:16, 576×1024, 30 i/s).
Elle se reproduit dans ce dépôt avec Remotion (`video/`), sans génération IA.

## 1. Ce qui fait fonctionner le format (analyse de la référence)

| Temps | Durée | Beat narratif | Visuel | Mécanique d'attention |
|---|---|---|---|---|
| 0,0–5,6 | 5,6 s | **Douleur en 3 temps** : « Tu publies… Des vues, des likes… Et toujours pas de clients ? » | 2 téléphones qui s'allument (TikTok / Instagram), compteurs qui montent (12,4 k vues, 1 870 likes), puis « 0 messages de clients » | titre mot à mot avec 1 mot-clé en couleur, chiffres qui défilent, contraste « beaucoup vs 0 » |
| 6,2–11,1 | 5 s | **Le mécanisme caché** : « Entre ton expertise et tes clients, il y a 5 maillons. Un seul casse et tout s'arrête. » | chaîne verticale de 5 pilules numérotées reliées par des maillons, du haut (ton expertise) au bas (tes clients) ; le n° 4 se fissure, la suite pâlit | grand chiffre « 5 », construction élément par élément, rupture visuelle |
| 11,8–16,0 | 4 s | **La solution** : « L'audit te montre lequel. 20 questions, moins de 5 minutes. » | maquette navigateur 3D inclinée (page de l'outil), puis liste des questions qui défile ; pastilles « 20 questions » et « Moins de 5 min » | preuve de simplicité par 2 chiffres |
| 16,7–20,9 | 4 s | **Le résultat** : « Ton score sur 100, tes 5 maillons notés, et celui qui te bloque. » | jauge circulaire 31 → 62/100, puis 5 barres notées /20, le maillon faible surligné « le maillon qui te bloque » | compteur animé, mise en évidence du point faible |
| 21,5–24,8 | 3,5 s | **Les livrables** : « 3 actions prioritaires, un plan sur 30 jours… » | cartes empilées : « 3 actions prioritaires ✓ », « Un plan sur 30 jours » (mini-calendrier), « Rapport PDF par email » | chaque carte se coche, étincelle sur le chiffre |
| 25,4–31,4 | 6 s | **Appel à l'action** : « Fais ton audit maintenant sur … » | fond inversé (sombre), question « Prêt à savoir quel maillon te bloque ? », bouton, curseur qui clique, URL tapée lettre à lettre puis validée, preuve sociale (« Déjà 1 496 … ») | changement de couleur = moment décisif, frappe au clavier |
| 31,4–34,4 | 3 s | Signature plateforme | carte de fin | — |

Constantes de style : palette 2 tons chauds (crème + brun), beaucoup d'air, cartes blanches à ombres douces et léger 3D,
une seule information par plan, titre toujours en haut, logo discret en haut au centre, voix rapide (≈ 3 mots/s),
coupes sur la voix, aucune musique dominante.

## 2. Adaptation QHSE (script type à personnaliser)

Remplacer le contenu, garder la structure et le minutage :

1. **Douleur** — « Tu fais des formations. Des audits, des affichages… Et toujours des accidents ? »
   Visuel : 2 écrans/tableaux (« Heures de formation : 1 240 », « Audits réalisés : 18 ») puis « Jours sans accident : 0 ».
2. **Mécanisme** — « Entre ta politique sécurité et le terrain, il y a 5 maillons. Un seul casse et tout s'arrête. »
   Maillons proposés : 1 Engagement de la direction · 2 Évaluation des risques (DUERP) · 3 Formation et compétences ·
   4 Mesures de prévention sur le terrain · 5 Suivi et indicateurs. Le maillon qui casse : choisir celui que le diagnostic cible.
3. **Solution** — « Le diagnostic QHSE UNIVERSNORMES te montre lequel. 20 questions, moins de 5 minutes. »
4. **Résultat** — « Ton score sur 100, tes 5 maillons notés, et celui qui te bloque. »
5. **Livrables** — « 3 actions prioritaires, un plan sur 30 jours, et ton rapport PDF. »
6. **CTA** — « Prêt à savoir quel maillon te bloque ? » + bouton + URL tapée.

Règles de contenu (obligatoires) :
- **Ne jamais inventer** l'URL, le nombre de questions, la durée, les livrables ni le chiffre de preuve sociale :
  les demander ou les reprendre d'une source fournie. Sans chiffre réel, supprimer la ligne de preuve sociale.
- Les chiffres de la douleur et le score affiché sont des **exemples** : afficher la pastille « EXEMPLE » sur la carte du score.
- Pas de coordonnées personnelles non fournies.

## 3. Production dans ce dépôt

Charte et contraintes UNIVERSNORMES (voir `video/README.md`) :
- logo original `video/public/promo/logo.png` (jamais redessiné), marine `#0E2A5C`, vert `#2E9B3E`, papier `#F1EDE3`,
  Montserrat + Patrick Hand ; personnages et mains : peau foncée (icônes Fluent variantes `Medium-Dark` / `Dark`) ;
- **pas de musique de fond ni d'ambiance industrielle** : bruitages seuls (`video/public/sfx2/`, `video/public/sfx/`),
  volumes 0,35–0,6, voix prioritaire ;
- 1080×1920, 30 i/s.

Étapes :
1. **Voix** : si un audio est fourni, le placer dans `video/public/` et le transcrire (faster-whisper, mots horodatés).
   Sinon, générer la narration en local avec Kokoro (`kokoro-onnx`, voix `ff_siwis`, vitesse 0,95–1,05) phrase par phrase
   et construire la timeline à partir des durées réelles (voir `video/src/pls/timeline.ts` pour le modèle).
2. **Storyboard** : un tableau temps / beat / visuel calé sur la timeline (6 beats ci-dessus).
3. **Composition** `video/src/<nom>/` avec ces blocs (à créer ou réutiliser) :
   - `Kinetic` (`src/anim.tsx`) pour les titres mot à mot, `*mot*` = mot-clé coloré ;
   - `Phone` / `PhotoCard` / cartes blanches arrondies pour les maquettes ; légère rotation 3D (`perspective`, `rotateY` 8–12°) ;
   - **chaîne de maillons** : 5 pilules empilées reliées par des anneaux SVG, entrée en cascade (0,15 s d'écart),
     le maillon faible se fissure (trait en zigzag + couleur rouge `#D9443A`), les suivants passent à 35 % d'opacité ;
   - **jauge de score** : arc SVG `strokeDasharray` + compteur entier (voir `Count` dans `src/pieges/ui.tsx`),
     puis 5 barres /20 dont la plus basse est surlignée ;
   - **cartes livrables** : grand chiffre + libellé + coche qui se dessine, étincelle au premier plan ;
   - **CTA** : fond inversé marine, bouton blanc, curseur qui clique (scale 0,92), champ URL dont le texte apparaît
     caractère par caractère (≈ 18 car./s), puis coche verte ;
   - fin : `Outro` (`src/scenes/Outro.tsx`) avec le logo.
4. **Son** : `SoundDesign` (`src/prevention2/Cine.tsx`) — `tick` sur chaque chiffre, `sfx/pop` sur chaque carte,
   `soft-whoosh` aux changements de plan, `deep-hit` sur la rupture du maillon, `sfx/click` par lettre tapée (vol. 0,25),
   `validation` sur la coche, `signature-marque` à la fin.
5. **Contrôle** : images fixes à 8–10 instants (`stills.mjs`), vérifier lisibilité mobile, qu'aucun texte ne déborde,
   que les mots-clés surlignés tombent sur la voix ; puis rendu
   `remotion render <Id>` → loudnorm `I=-14:TP=-1.5:LRA=11` → version 720p (crf 25).
6. Enregistrer la composition dans `src/Root.tsx`, un script `render:<nom>` dans `package.json`, une ligne dans `README.md`.

## 4. Variantes possibles du même gabarit

- Formation (« 5 compétences » au lieu de 5 maillons, CTA d'inscription) ;
- Certification ISO 9001 / 14001 / 45001 (« 5 étapes vers la certification », score de maturité) ;
- Audit sécurité chantier (« 5 points de contrôle », maillon faible = EPI, balisage…).

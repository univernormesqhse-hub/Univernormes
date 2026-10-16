---
name: style-ray-tech-decodee
description: Applique le style « Ray // Tech décodée » à une vidéo verticale UNIVERSNORMES — papier beige quadrillé, palette noir + bordeaux, en-tête monospace « NOM // RUBRIQUE », mascotte astronaute à casque audio, cartes et boutons néo-brutalistes (contour noir épais + ombre portée dure décalée), étiquettes monospace en capitales, schémas pédagogiques animés (courbes qui se tracent, compteurs, flèches, vibrations), texte en haut mot à mot avec mots à venir grisés. Utiliser quand on demande une vidéo « comme Ray », « style Tech décodée », une explication « comment ça marche vraiment », ou quand une capsule doit combiner les skills de William, Ray, Ambassade et Amadou.
---

# Style « Ray » — tech décodée, schémas néo-brutalistes

Recette tirée de l'analyse de la vidéo de référence de Ray (« Ton téléphone sait que t'as marché 8000 pas…
pourtant il n'a pas de pieds », 58 s, 9:16, 576×1024, 30 i/s). On reprend **le langage visuel**, jamais
l'identité : ni le nom « Ray », ni sa mascotte telle quelle, ni les filigranes.

## 1. Ce qui fait fonctionner le format

- **Ton** : paradoxe d'accroche (« il sait que… pourtant il n'a pas de pieds »), promesse de rubrique
  (« je te montre comment sont vraiment faites les technologies que tu utilises tous les jours »), rappel d'un épisode
  précédent, explication pas à pas avec phrases très courtes (« Un pic, un pas. Un autre pic, un autre pas. »),
  objection (« Mais si tu secoues ton téléphone… »), règle (« deux pas par seconde, de façon régulière »),
  **phrase-résumé barrée** (« il ne compte pas ~~tes pas~~, il compte tes secousses »), rendez-vous
  (« On se retrouve au prochain décodage »).
- **Structure** (≈ 55 s) : accroche paradoxe (0–6 s) → présentation + abonne-toi (6–14 s) → composant clé (14–19 s)
  → mécanisme (19–29 s) → objection + filtre (29–40 s) → détail technique (40–47 s) → résumé barré (47–53 s) → au
  revoir mascotte.
- **Fond** : papier beige `#EAE6DC` à quadrillage fin `#DCD6C9` (pas 40 px), grain léger ; petites croix « + »
  de repère dans les marges.
- **En-tête fixe** : en haut, monospace minuscule espacée « **RAY** // TECH DÉCODÉE » (nom en gras noir, `//`
  bordeaux, rubrique gris) → ici « **UNIVERSNORMES** // QHSE DÉCODÉE ».
- **Texte** : sous l'en-tête, une ligne en sans-serif très gras (Montserrat 800) qui s'écrit **mot par mot** ; mots
  dits en noir, mots à venir en gris clair `#B9B4AA`, un mot fort en **bordeaux** `#7A1F2B` (« 8 000 »,
  « pas aujourd'hui », « l'accéléromètre », « choc », « gravité ? »).
- **Néo-brutalisme** : cartes et boutons blancs, **contour noir 4–6 px**, coins 10–14 px, **ombre dure décalée**
  (6–8 px, noire ou bordeaux, sans flou) ; boutons pilule bordeaux à texte blanc (« ABONNE-TOI ») qui se
  transforment en « ✓ ABONNÉ » ; étiquettes noires à texte blanc **monospace capitales** (« SECOUSSES »,
  « IL VÉRIFIE LE RYTHME »).
- **Schémas animés** : téléphone en trait noir avec compteur qui défile (0 → 8 000), traces de pas qui
  apparaissent une à une, puce « ACC » au centre, flèches MONTE / REDESCEND, **courbe qui se trace dans une carte
  graphe** (pics numérotés « PAS 1, 2, 3… »), vibration (arcs bordeaux autour du téléphone), deux cartes comparées
  « MARCHE ≈ 2 PAS / SECONDE ✓ » vs « TROP RAPIDE / IRRÉGULIER ✗ » (croix rouge), batterie 100 % qui baisse à
  99 %, puce CPU + « PROCESSEUR À PART », bandeau final avec mots barrés.
- **Mascotte** : petit astronaute blanc à visière noire souriante et casque audio bordeaux, pose qui change
  (bras levé, pointe le bouton, perplexe avec « ? »), apparaît en coin pendant les explications.
- **Rythme** : un plan toutes les 1,5–3 s ; transitions = coupe franche ou fondu très court ; chaque nouvel élément
  entre avec un petit rebond ; les cartes restent pendant que la ligne de texte change (continuité du schéma).

## 2. Adaptation UNIVERSNORMES / QHSE

- En-tête « UNIVERSNORMES // QHSE DÉCODÉE » (logo officiel `video/public/promo/logo.png` à côté si besoin).
- Mascotte : ne pas copier l'astronaute ; utiliser un personnage QHSE maison (casque de chantier + gilet, peau foncée,
  icône Fluent `ouvrier` / `agent-hse` ou SVG maison) avec les mêmes poses expressives.
- Schémas : détecteur de gaz, chaîne de sécurité, courbe de bruit en dB, compteur de jours sans accident, jauge de
  risque, pyramide de Bird… toujours en trait noir + bordeaux, avec étiquettes monospace.
- Chiffres : uniquement ceux de la source, marqués « cité » ; les valeurs de schéma inventées sont signalées.

## 3. Production dans ce dépôt (Remotion, `video/`)

- Réutiliser `Kin`, `Board` (palettes, pour les étiquettes qui défilent), `Stamp`, `Captions`, `SoundDesign`,
  `Outro`, le fond papier `Bg` (`src/implIso/kit.tsx`).
- Nouveaux blocs pour ce style : `BrutCard` (contour noir + ombre dure décalée), `MonoTag` (étiquette monospace
  capitales), `SeriesHeader` (« NOM // RUBRIQUE »), `TraceGraph` (courbe qui se dessine avec pics numérotés),
  `Counter` (compteur qui défile), `Strike` (mot barré puis remplacé), `Mascot` (personnage à poses).
- Police monospace : `JetBrains Mono` / `IBM Plex Mono` si disponibles, sinon `monospace` système.
- Son : bruitages seuls — `tick` à chaque incrément de compteur (par paquets), `sfx/pop` par carte,
  `sfx/thud` sur chaque pic de courbe, `sfx/click` sur le bouton, `deep-hit` sur la croix rouge, `validation` sur
  la coche.
- Combinaison : Ray apporte **la rigueur pédagogique et les schémas décodés** ; à marier avec l'énergie UI
  d'Ambassade, la chaleur illustrée d'Amadou et la mécanique promo de William.

---
name: video-decodeur-ray
description: Crée une vidéo verticale pédagogique (45–60 s) au style « Ray // Tech décodée » — papier millimétré crème, accent bordeaux, cartes blanches à contour noir épais et ombre décalée dure, étiquettes en police machine à écrire, titre karaoké mot à mot (mots à venir pâles), mascotte récurrente, schémas et courbes qui se dessinent, idée reçue barrée puis corrigée. Utiliser quand on demande d'« expliquer comment ça marche », de « décoder » un équipement, une norme, un capteur, un indicateur QHSE, ou une vidéo « comme Ray / tech décodée / le décodeur ».
---

# Vidéo « décodeur » — style Ray // Tech décodée

Recette tirée de l'analyse d'une vidéo de référence (57,8 s, 9:16, 576×1024, 30 i/s, voix seule + bruitages, pas de musique).
On reprend **le style et la mécanique**, jamais l'identité de l'auteur (nom « Ray », mascotte astronaute, pseudo TikTok) :
la série devient « UNIVERSNORMES // QHSE DÉCODÉE » et la mascotte est un personnage HSE à peau foncée.

Gabarit prêt à l'emploi : `starter/` (composition HyperFrames de 16 s qui montre chaque composant ; validée par `hyperframes check`).

## 1. Analyse de la référence

| Temps | Beat | Visuel | Mécanique |
|---|---|---|---|
| 0–3 s | **Accroche chiffrée** (« Ton téléphone sait que t'as fait… pas aujourd'hui ») | téléphone-carte arrondi au centre, jauge circulaire + compteur 4 320 → 8 000, empreintes qui défilent en bas | compteur qui tourne, question implicite |
| 3–4,5 s | Doute | mascotte qui hausse les épaules + téléphone « ? » qui tremble | pop avec rebond |
| 4,5–6 s | « Avant qu'on… » | carte noire qui se retourne (couverture d'épisode) | flip 3D |
| 6–9 s | **Présentation** « moi c'est Ray » | mascotte qui salue + étiquette « RAY // » en carte à ombre bordeaux | balancement, nom en bordeaux |
| 9–10,5 s | Ce que tu utilises | grille 2×2 d'icônes-cartes (téléphone, écouteurs, laptop, puce) avec légendes mono | apparition en cascade |
| 10,5–13,5 s | **Abonne-toi** | bouton pilule bordeaux « ABONNE-TOI », curseur qui arrive et clique → bouton blanc « ✓ ABONNÉ », mascotte qui saute | clic = changement d'état |
| 13,5–16 s | Titre d'épisode | carte « ÉPISODE #1 · ACCÉLÉRO-MÈTRE » avec puce, schéma ressort + masse « ELLE SENT LA GRAVITÉ » en cadre pointillé | carte inclinée, schéma technique |
| 16,5–21 s | Mécanisme 1 | téléphone sur ligne de sol pointillée, flèches « MONTE » / « REDESCEND » | flèches qui poussent |
| 21–28 s | **Mécanisme 2 : la courbe** | carte graphique « ACCÉLÉRATION / TEMPS → », la courbe se trace, chaque pic se marque d'une empreinte, compteur « PAS : 3 → 4 », flèche manuscrite « UN PIC » | tracé progressif + compteur |
| 27–30 s | Contre-exemple | téléphone qui vibre, courbe chaotique « DES PICS PARTOUT » + étiquette noire « SECOUSSES » | chaos vs ordre |
| 30–39 s | **La règle** | carte « ALGORITHME » + pastille noire « IL VÉRIFIE LE RYTHME », courbe régulière « ≈ 2 PAS / SECONDE » cochée, courbe irrégulière bordeaux en dessous | carte qui s'empile |
| 39–46 s | Coût | batterie 100 % → 99 %, puce « CPU » + petit co-processeur rond « CONSOMME PRESQUE RIEN » | compteur qui baisse d'1 |
| 46–51 s | **Idée reçue corrigée** | « IL NE COMPTE PAS ~~TES PAS~~ » (barré bordeaux) → carte bordeaux « IL COMPTE TES SECOUSSES », mascotte qui fait un clin d'œil, « …ET DEVINE ? » | rature + révélation |
| 51–54 s | Signature | carte « RAY // LE DÉCODEUR ULTIME », mascotte qui salue (« On se retrouve au prochain décodage ») | rendez-vous |
| 54–58 s | Fin plateforme (TikTok) | — | **ne pas reproduire** |

Rythme : un plan toutes les 1,5–3 s, **coupes sèches** (pas de transition), chaque élément entre en « pop » avec rebond.
Voix rapide et tutoyée, ≈ 3 mots/s, phrases courtes. Le titre en haut affiche 2 à 4 mots de la phrase en cours.

## 2. Constantes de style (en 1080×1920)

| Élément | Valeur |
|---|---|
| Fond | papier `#EFECE6` + grille fine `#D8D1C9` (traits 2 px, pas 68 px) + vignette chaude légère |
| Encre / accent / mots à venir / gris | `#0E090A` / bordeaux `#690F1D` / `#D4BFC0` / `#8A8480` |
| En-tête de série | y ≈ 205 px, 30 px : **UNIVERSNORMES** (Inter 800) + `//` bordeaux + « QHSE DÉCODÉE » (Space Mono, gris, espacement 6 px) |
| Titre karaoké | y ≈ 285 px, Inter 800, 76 px, centré ; mot à venir `#D4BFC0`, mot dit `#0E090A`, mot-clé `#690F1D` |
| Carte | fond blanc, contour 6 px noir, rayon 20 px, **ombre dure** `14px 14px 0` noire (ou bordeaux pour l'info clé) |
| Étiquettes techniques | Space Mono 700, 26 px, MAJUSCULES, espacement 3 px, gris `#6B6460` ; libellés d'axe « TEMPS → » |
| Pastille noire | fond noir, Space Mono blanc 30 px, rayon 6 px (« IL VÉRIFIE LE RYTHME ») |
| Gros libellé de carte | Archivo Black 56–66 px, majuscules |
| Décor | croix « + » bordeaux éparses, cadres pointillés pour les schémas |
| Mascotte | personnage HSE à peau foncée (Fluent `ouvrier-dark.png`, `agent-hse.png`, ou personnage SVG maison) ; ombre portée douce ; toujours le même d'une vidéo à l'autre |
| Polices fournies | `starter/assets/` : Inter 400/700/800, Archivo Black, Space Mono 400/700 (OFL) |

Mouvements (GSAP, voir `starter/index.html`) :
- `pop` : `scale 0.4 → 1`, `back.out(2.4)`, 0,42 s ;
- karaoké : chaque `<span class="w" data-t>` passe à l'encre à son instant (`data-k` = bordeaux) ;
- courbe : `strokeDasharray/strokeDashoffset` sur 2 s, `power1.inOut` ;
- rature : barre bordeaux `scaleX 0 → 1` puis la carte passe à 45 % d'opacité ;
- clic : curseur qui arrive, `scale 0.92` aller-retour, bouton inversé « ✓ ABONNÉ » ;
- mascotte : rebond d'entrée par le bas puis flottement `y ±18 px` (sinus) tant qu'elle est à l'écran.

Son : **pas de musique** (la référence n'en a pas). `pop` sur chaque carte, `tick` sur chaque incrément de compteur, `click` + `validation`
sur le bouton, `soft-whoosh` quand une courbe se trace, `deep-hit` sur la rature, `ding` sur la correction. Volumes 0,35–0,6.

## 3. Adaptation QHSE (script type)

1. **Accroche chiffrée** — « Ton détecteur de gaz sait avant toi qu'il y a un problème. » (carte-appareil + compteur ppm, pastille EXEMPLE)
2. **Doute** — « Mais comment ? »
3. **Présentation** — « Moi c'est [mascotte], et je décode la sécurité. » + bouton s'abonner cliqué
4. **Titre d'épisode** — carte « ÉPISODE #n · [OBJET] »
5. **Mécanisme** en 2–3 schémas (capteur, seuil, alarme) avec une courbe qui se trace et une annotation manuscrite
6. **Contre-exemple** (ce qui fausse la mesure)
7. **La règle** (carte « SEUIL » / « VLEP » / « ÉTALONNAGE » + pastille noire)
8. **Idée reçue barrée → correction**
9. **Signature** « UNIVERSNORMES // LE DÉCODEUR QHSE » + rendez-vous

Sujets qui s'y prêtent : détecteur 4 gaz, harnais et facteur de chute, extincteur (classes de feu), sonomètre et dB(A), casque (date de péremption),
DUERP (criticité = gravité × probabilité), TF / TG, consignation (cadenas).

Règles de contenu (obligatoires) :
- **Ne jamais inventer** un chiffre, un seuil réglementaire ou une valeur limite : les reprendre d'une source fournie ou les demander.
  Les chiffres de démonstration portent l'étiquette « EXEMPLE ».
- Toute personne ou mascotte représentée est **africaine noire** (CLAUDE.md du dépôt).
- Ne pas reproduire le nom, la mascotte ni le pseudo de la vidéo de référence, ni l'écran de fin TikTok.

## 4. Production dans ce dépôt (HyperFrames)

1. Créer `video/hyperframes/<nom>/` : copier `starter/` (index.html + assets), puis `hyperframes.json`, `meta.json`, `package.json`,
   `.gitignore` d'un projet existant (ex. `video/hyperframes/acronymes-securite/`).
2. **Voix** : si un audio est fourni, le placer dans `assets/` et caler les `data-t` du karaoké sur les mots (sous-titres incrustés,
   transcription, ou écoute). Sinon générer la narration (Kokoro `ff_siwis` en local) et construire la timeline sur les durées réelles.
3. Écrire un `BRIEF.md` (workflow `general-video`) et un tableau temps / beat / visuel (section 1 comme modèle).
4. Composer les beats dans `index.html` : un `<div class="scene clip">` par beat (coupes sèches), titre karaoké par beat,
   bruitages en `<audio class="clip">` (durée = durée réelle du fichier).
5. `npx hyperframes check` — les avertissements de contraste sur les mots à venir pâles sont **voulus** (karaoké) ; corriger tout le reste.
6. `npx hyperframes snapshot --at …` sur 8–10 instants, vérifier lisibilité mobile et débordements ; puis
   `npx hyperframes render -o renders/<nom>-raw.mp4 --crf 20` → loudnorm `I=-14:TP=-1.5:LRA=11` → version 720p (crf 25).
7. Couverture : l'image 0 doit afficher le titre de la thématique (carte d'épisode ou titre karaoké déjà « dit »).

---
name: video-annonce-ambassa
description: Crée une vidéo verticale d'annonce / démonstration d'outil (40–50 s) au style « ambassa.exe » — fond gris très clair à trame de points, accent corail, grand éclat de traits corail qui sort d'un coin, typographie Roboto très grasse avec mots à venir en gris, puces noires arrondies, maquettes d'interface (éditeur de code sombre, pellicule d'images, navigateur, grille), passages par flou, appel à l'action « commente « MOT » ». Utiliser pour présenter un outil, une méthode, une nouveauté, un logiciel QHSE, une offre, ou une vidéo « comme ambassa / annonce IA / révolution ».
---

# Vidéo « annonce d'outil » — style ambassa.exe

Recette tirée de l'analyse d'une vidéo de référence (50,8 s, 9:16, 576×1024, 30 i/s, voix seule + bruitages, pas de musique).
On reprend **le style et la mécanique**, jamais l'identité de l'auteur (pseudo « ambassa.exe », sa couverture de livre) :
le filigrane et l'appel à l'action portent « universnormes ».

Gabarit prêt à l'emploi : `starter/` (composition HyperFrames de 15 s ; validée par `hyperframes check`).

## 1. Analyse de la référence

| Temps | Beat | Visuel | Mécanique |
|---|---|---|---|
| 0–1,5 s | **Annonce** « Claude vient de révolutionner… » | tuile noire arrondie inclinée avec triangle « play » corail, mot géant « Claude » en Roboto noir, ligne secondaire en dessous | mot géant qui se pose (scale 1,3 → 1) |
| 1–2,5 s | Le sujet | puce noire « le motion design » qui apparaît sous le titre | puis **tout le plan passe au flou** et s'efface |
| 3–7,5 s | **Fausse piste** « Oubliez tout ce que vous savez… ce n'est pas de la génération vidéo classique » | cartes blanches portrait avec gravures/croquis, une main qui dessine | phrase longue sur 2 lignes, mot-clé en gros |
| 7,5–9 s | Ce que ce n'est pas | mosaïque de pixels noir/corail barrée d'un ✕ « Le modèle n'invente pas **des pixels** » | négation visuelle |
| 9–15 s | **Comment ça marche** « Il écrit du code, cadre par cadre » | éditeur de code sombre (3 pastilles, lignes corail et grises), pellicule de 5 vignettes numérotées dont le point corail se déplace | puces noires « Remotion », « SVG » |
| 15–18 s | L'entrée | tuile vidéo → flèche → petit robot pixel ; carte lien « votre-app.com » | schéma d'entrée |
| 18–21 s | L'analyse | maquette de navigateur filaire (barre, bouton corail, colonnes) + pastilles de couleur extraites | « Opus analyse le design pour recréer une vidéo de **lancement** » |
| 21–25 s | Ressource | grille de modèles (captures) + puce noire « prompt-motion.com » | preuve par l'exemple |
| 25–28 s | Coulisses | navigateur en pointillés, éclat corail, petit fantôme « navigateur fantôme puis l'enregistre » | |
| 28–31 s | **Auto-vérification** | grille 3×2 de vignettes noires, loupe qui balaie, une case cerclée de rouge puis cochée verte | puce « et corrige les bugs » |
| 31–36 s | **Le résultat ?** | cartes-écrans en démonstration (réservation de vol, « C'est tout » bleu, morphing UI) | « digne d'une agence » |
| 36–39 s | Conclusion | « Le motion design à la main ? » + puce « c'est terminé » | |
| 39–40 s | Passage à l'action | « Lancez Claude Code et testez » | |
| 40–46 s | **CTA** | « N'oublie pas de t'abonner à » + **ambassa.exe** géant, couverture de livre inclinée, « et commente » + grosse puce « « GUIDE » », « pour passer au niveau supérieur avec l'IA » | mot-clé à commenter |
| 46–51 s | Fin plateforme (TikTok) | — | **ne pas reproduire** |

Rythme : un plan toutes les 1,5–3 s. **Transition signature : flou** (le plan sortant se brouille et s'efface en 0,3 s,
le suivant sort du flou en 0,35 s). Le grand éclat corail reste dans un coin, respire, et change de coin entre les parties.

## 2. Constantes de style (en 1080×1920)

| Élément | Valeur |
|---|---|
| Fond | `#F3F3F3` + trame de points `rgba(23,23,26,0.10)` (rayon 2,5 px, pas 46 px) |
| Encre / corail / gris des mots à venir / gris secondaire | `#17171A` / `#D87554` / `#B4B3B4` / `#4F4E54` |
| Éclat corail | 4 traits arrondis (680×70 px) qui rayonnent depuis un coin hors champ (bas-droite puis haut-gauche), rotation lente ±8° |
| Filigrane | « universnormes » Roboto 700, 48 px, gris `#858487`, centré à y ≈ 1640 px |
| Titre géant | Roboto 900, 118–128 px, interlettrage −3 px |
| Ligne secondaire | Roboto 700, 66 px (ou 92 px en 900 pour la phrase clé) ; sous-ligne Roboto 400, 58 px, `#4F4E54` |
| Mots à venir | gris `#B4B3B4` → encre au moment où ils sont dits |
| Puce noire | fond `#17171A`, Roboto 700 blanc 54 px, rayon 16 px, ombre `0 18px 30px rgba(0,0,0,.25)` ; version CTA 96 px « « MOT » » |
| Tuile / vignette | fond `#17171A`, rayon 14–26 px, point corail ; éditeur de code `#1C1C1F` avec 3 pastilles et lignes corail/grises |
| Polices fournies | `starter/assets/` : Roboto 400/700/900 (OFL) |

Mouvements (GSAP, voir `starter/index.html`) : `pop` (`scale 0.7 → 1`, `y 30 → 0`, `back.out(2)`), mot géant `scale 1.3 → 1` `power3.out`,
`blurOut` / `blurIn` (filtre `blur(26px)` + opacité + `scale` 1,04 / 0,96), lignes de code `scaleX 0 → 1` en cascade,
vignettes de pellicule en cascade 0,1 s, loupe qui glisse puis cadre corail sur la case trouvée.

Son : **pas de musique**. `whoosh` sur chaque passage flou, `pop` sur chaque puce, `tick` sur les lignes de code,
`validation` sur la case cochée, `bass-hit` sur la grosse puce CTA. Volumes 0,35–0,5.

## 3. Adaptation QHSE (script type)

1. **Annonce** — tuile-logo + mot géant (« DUERP », « ISO 45001 », « Permis de feu ») + « …expliqué en 60 secondes »
2. **Fausse piste** — « Oubliez le classeur qui dort dans un placard. »
3. **Ce que ce n'est pas** — « Ce n'est pas **de la paperasse**. » (mosaïque barrée)
4. **Comment ça marche** — maquette d'outil + 2 puces (« Analyse », « Contrôle »)
5. **L'entrée / l'analyse / les coulisses** — 2 à 3 plans de maquette (tableau, formulaire, grille de risques)
6. **Auto-vérification** — grille + loupe + case corrigée
7. **Le résultat ?** — 2 cartes-résultats (rapport, plan d'action)
8. **CTA** — « N'oublie pas de t'abonner à **universnormes** » + visuel (logo, couverture de guide réel) + « et commente « MOT » »

Règles de contenu (obligatoires) :
- **Ne jamais inventer** une fonctionnalité, un site, un chiffre ni le mot-clé à commenter : les demander ou les reprendre d'une source fournie.
- Toute personne représentée est **africaine noire** (CLAUDE.md du dépôt).
- Ne pas reproduire le pseudo, la couverture de livre ni l'écran de fin TikTok de la référence.

## 4. Production dans ce dépôt (HyperFrames)

1. Créer `video/hyperframes/<nom>/` : copier `starter/` puis `hyperframes.json`, `meta.json`, `package.json`, `.gitignore`
   d'un projet existant (ex. `video/hyperframes/acronymes-securite/`).
2. **Voix** fournie (caler les `data-t` des mots gris sur la voix) ou générée (Kokoro `ff_siwis`), timeline construite sur les durées réelles.
3. `BRIEF.md` (workflow `general-video`) + tableau temps / beat / visuel.
4. Un `<div class="scene clip">` par beat ; enchaîner `blurOut(scène, fin − 0,3)` puis `blurIn(suivante, début)` ;
   l'éclat corail et le filigrane restent hors des scènes (calques permanents).
5. `npx hyperframes check` (les mots gris à venir déclenchent des avertissements de contraste voulus), snapshots sur 8–10 instants,
   rendu `--crf 20` → loudnorm `I=-14:TP=-1.5:LRA=11` → 720p (crf 25).
6. Couverture : l'image 0 montre déjà le titre de la thématique (tuile-logo + mot géant affichés dès t = 0).

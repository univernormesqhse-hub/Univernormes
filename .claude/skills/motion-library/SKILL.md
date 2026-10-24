---
name: motion-library
description: Monter des vidéos avec Claude Code + Remotion en s'appuyant sur une librairie de motions validés qui grandit à chaque montage. Utiliser quand l'utilisateur dit "installe motion-library", "configure ma librairie", donne le chemin d'un dérush à monter ("monte cette vidéo", "fais le montage de"), valide un motion ("on garde", "parfait", "validé", "ajoute à la librairie"), demande des sous-titres, ou partage une vidéo de référence ("inspire-toi de", "refais ce motion"). Aussi pour mettre à jour ou vérifier la librairie ("mets à jour la fiche X", "check la librairie").
---

# Motion Library

Le principe : Claude ne repart jamais de zéro. Chaque motion validé (asset, template, style de sous-titres, son) est sauvegardé dans `library/` avec une fiche qui dit quand l'utiliser et un aperçu vidéo. Avant chaque montage, Claude lit le catalogue et réutilise ce qui existe. Plus l'utilisateur monte, plus Claude devient son monteur.

## Router vers le bon workflow

| L'utilisateur… | Workflow |
|---|---|
| installe le skill, ou `library/` n'existe pas encore | `steps/01-setup.md` |
| donne un dérush à monter | `steps/02-montage.md` |
| valide un motion, ou demande d'ajouter / mettre à jour une fiche | `steps/03-sauvegarder.md` |
| partage une vidéo de référence à reproduire | `steps/04-inspiration.md` |

Si `library/` n'existe pas dans le projet, faire le setup d'abord, quel que soit le workflow demandé.

## Repères

- Projet = le dossier Remotion de l'utilisateur (là où il y a `package.json` et `remotion`). Tous les chemins ci-dessous sont relatifs à sa racine.
- `library/<section>/<slug>/index.md` est la source de vérité. `library/index.md`, `library/index.json` et `library/gallery.html` sont générés par le build : ne jamais les éditer à la main.
- Sections : `templates` (vidéo complète paramétrable), `assets` (motion réutilisable), `subtitles` (style de sous-titres), `sounds` (son validé).
- Les compos d'aperçu vivent dans `src/library-demos/` (`Demo-<Slug>`), parce que le render a besoin du vrai code.
- Les médias d'un montage vont dans `public/<episode>/` (voix, transcript, b-rolls, sons).

## Scripts (depuis la racine du projet)

```bash
SKILL=.claude/skills/motion-library/scripts

node $SKILL/transcribe.mjs <rush.mp4> --episode <slug> [--lang fr]   # voix pleine qualité + transcript au mot
bash $SKILL/extract-frames.sh <reference.mp4> [fps] [dossier]       # grilles de frames d'une vidéo de référence
node $SKILL/build-library.mjs [--check] [--no-render] [--force]     # fiches → aperçus, index.md/json, gallery.html
```

## Règles qui ne se négocient pas

Elles sont aussi injectées dans le `CLAUDE.md` du projet au setup (`resources/claude-md-rules.md`) :

1. Lire `library/index.md` avant de créer un motion. Réutiliser ou adapter avant d'écrire du neuf.
2. Proposer la sauvegarde de chaque motion validé. Ne jamais clore une session sans l'avoir ajouté ou sans un « non » explicite.
3. Après avoir modifié un composant référencé par une fiche : `build-library.mjs --check`, puis build si ça dérive.
4. Sous-titres : toujours demander quel style de la librairie utiliser, ou s'il en faut un nouveau.
5. Qualité de livraison : piste voix d'origine (jamais le WAV de transcription), render en `--color-space=bt709 --image-format=png --crf=10`, sous-titres avec ~0,15 s d'avance et une entrée de 6 frames max.

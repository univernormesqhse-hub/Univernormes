# 02 — Monter un dérush

1. **Lire le catalogue** : `library/index.md` (et `index.json` pour les détails). Noter les templates, assets, styles de sous-titres et sons qui collent au sujet.
2. **Préparer les médias** :
   ```bash
   node .claude/skills/motion-library/scripts/transcribe.mjs <rush.mp4> --episode <slug> --lang fr
   ```
   → `public/<slug>/voix.m4a` (voix d'origine, pleine qualité) et `public/<slug>/transcript.json` (mots horodatés). Le WAV 16 kHz ne sert qu'à la transcription : il n'est jamais utilisé dans le montage. Relire le transcript et corriger les mots douteux avant de caler quoi que ce soit.
3. **Sous-titres** : demander quel style de `library/subtitles/` utiliser, ou s'il en faut un nouveau. Caler ~0,15 s d'avance sur la voix, entrée de 6 frames max.
4. **Construire** : partir du template le plus proche, réutiliser les assets en l'état (import du composant indiqué dans la fiche) ; n'écrire du neuf que pour ce qui manque, et le signaler comme candidat à la librairie.
5. **Vérifier** : `npx tsc --noEmit`, puis images fixes aux moments clés (débordements, chevauchements, lisibilité).
6. **Rendre** : `npx remotion render <Compo> out/<slug>.mp4 --color-space=bt709 --image-format=png --crf=10`. Contrôler le son (piste voix d'origine) et la durée.
7. **Proposer la sauvegarde** de chaque motion nouveau ou modifié qui a été validé (`steps/03-sauvegarder.md`). Ne pas clore sans ajout ou « non » explicite.

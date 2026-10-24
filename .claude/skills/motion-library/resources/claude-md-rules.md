<!-- motion-library:start -->
## Motion Library — règles de montage

1. Lire `library/index.md` avant de créer un motion. Réutiliser ou adapter avant d'écrire du neuf.
2. Proposer la sauvegarde de chaque motion validé (skill `motion-library`, `steps/03-sauvegarder.md`). Ne jamais clore une session sans l'avoir ajouté ou sans un « non » explicite.
3. Après avoir modifié un composant référencé par une fiche : `node .claude/skills/motion-library/scripts/build-library.mjs --check`, puis build si ça dérive.
4. Sous-titres : toujours demander quel style de la librairie utiliser (`library/subtitles/`), ou s'il en faut un nouveau.
5. Qualité de livraison : piste voix d'origine (jamais le WAV de transcription), render en `--color-space=bt709 --image-format=png --crf=10`, sous-titres avec ~0,15 s d'avance et une entrée de 6 frames max.
<!-- motion-library:end -->

# 03 — Sauvegarder un motion validé

Déclencheurs : « on garde », « parfait », « validé », « ajoute à la librairie », « mets à jour la fiche X ».

1. **Choisir la section** : `templates` (vidéo complète paramétrable), `assets` (motion réutilisable), `subtitles` (style de sous-titres), `sounds` (son validé). Slug en kebab-case.
2. **Rendre le code réutilisable** si besoin : un motion enfoui dans une compo peut être montré tel quel via une fenêtre (`Window`), mais s'il doit être réutilisé souvent, l'extraire dans un composant exporté et faire pointer la fiche dessus.
3. **Créer la démo** dans `src/library-demos/index.tsx` : `<Composition id="Demo-<Slug>" …/>` (durée courte, 1080×1920, 30 fps).
4. **Écrire la fiche** `library/<section>/<slug>/index.md` :
   ```markdown
   ---
   name: Transition gyrophare
   section: assets
   slug: transition-gyrophare
   description: Une phrase sur ce que fait le motion.
   quand: Quand l'utiliser (et quand ne pas l'utiliser).
   component: src/chemin/Fichier.tsx      # fichier surveillé par --check
   demo: Demo-TransitionGyrophare         # compo d'aperçu (ou "none" pour un son)
   audio: public/sfx/xxx.mp3              # sections sounds uniquement (facultatif)
   tags: [transition, métro]
   ---

   ## Utilisation
   Comment l'appeler (props, timing, sons associés).

   ## Notes
   Pièges connus, variantes validées.
   ```
5. **Build** : `node .claude/skills/motion-library/scripts/build-library.mjs` → `preview.mp4` dans le dossier de la fiche, `library/index.md`, `index.json`, `gallery.html` régénérés. Ne jamais éditer ces trois fichiers à la main.
6. Pour une mise à jour : modifier la fiche et/ou le composant, puis `--check` et build (`--force` pour re-rendre l'aperçu même sans dérive).

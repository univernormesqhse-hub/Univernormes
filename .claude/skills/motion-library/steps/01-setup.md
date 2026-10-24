# 01 — Setup

À faire une seule fois par projet Remotion (ou si `library/` manque).

1. **Trouver la racine du projet** : le dossier qui contient `package.json` avec `remotion` en dépendance (ici `video/`). Tout se fait depuis là.
2. **Créer l'arborescence** :
   ```
   library/templates/  library/assets/  library/subtitles/  library/sounds/
   src/library-demos/
   ```
3. **Brancher les démos** : créer `src/library-demos/index.tsx` qui exporte `LibraryDemos` (un fragment de `<Composition id="Demo-<Slug>" …/>`), puis l'ajouter une fois dans `src/Root.tsx` (import + `<LibraryDemos />` dans le fragment racine). Une démo réutilise le vrai code : soit le composant importé directement, soit une fenêtre d'une compo existante via `Window` (`src/library-demos/Window.tsx` : `<Sequence from={-start}>`).
4. **Injecter les règles** : copier `resources/claude-md-rules.md` dans le `CLAUDE.md` du projet (le créer s'il n'existe pas). Si le bloc `<!-- motion-library:start -->` existe déjà, le remplacer au lieu de le dupliquer.
5. **Amorcer la librairie** avec les motions déjà validés dans le projet (ceux que l'utilisateur a gardés dans ses montages livrés) : une fiche par motion (voir `steps/03-sauvegarder.md`).
6. **Build** : `node .claude/skills/motion-library/scripts/build-library.mjs` (ajouter `--no-render` si le navigateur n'est pas dispo), puis `npx tsc --noEmit`.
7. Résumer à l'utilisateur ce qui a été installé et le contenu initial de la librairie.

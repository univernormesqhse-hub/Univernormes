# Capsules vidéo UNIVERSNORMES (Remotion)

Capsules animées verticales (1080×1920, 30 i/s) dans la charte UNIVERSNORMES :
- `SuperviseurHSE` : « Le Superviseur HSE » (54 s).
- `EquipeHSE` : « L'architecture d'une équipe HSE performante » (69 s) — organigramme vivant des 6 rôles,
  chaque rôle présenté en plein écran (photo détourée) puis envolé dans son médaillon. Code dans `src/equipe/`
  (`roles.ts` : rôles, cadrages, timings, liens ; `captions.ts` : script de la voix-off).

## Commandes
```bash
npm install
npm run studio            # aperçu interactif dans le navigateur
npm run render:superviseur # rendu + mastering audio (-14 LUFS) → 1080p et 720p dans out/
npm run render:equipe
```
Dans l'environnement cloud, pointer Remotion vers le Chromium préinstallé :
`REMOTION_BROWSER=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`.

## Direction motion design
- 9 actes (`src/scenes/`), calés sur les sous-titres de la voix-off : Hook, Terrain, Permis, Urgence, Versus, Action, Manuels, Bouclier, Outro.
- Transitions de marque en diagonale (marine + liserés verts) aux changements d'acte, caméra avec dérive de zoom et secousses sur les impacts (tampon, VS, cadenas…).
- Typographie cinétique (mots révélés par masque, mots clés en vert), sous-titres révélés mot à mot.
- Fond vivant : formes floues en parallaxe, filigrane qui défile, particules.
- Sound design : bruitages synthétisés dans `public/sfx/` (whoosh, pop, clic, impact, ding, cloche), placés dans `CUES` (`src/SuperviseurHSE.tsx`).
- Boîte à outils d'animation dans `src/anim.tsx` (`Enter`, `Kinetic`, `Underline`, courbes d'accélération).

## Structure
- `src/captions.ts` : script de la voix-off + timings des sous-titres (à modifier pour une autre capsule).
- `src/SuperviseurHSE.tsx` : orchestration des actes, transitions, caméra, bruitages.
- `src/components/` : charte fixe (fond, bandeaux, sous-titres), personnages photo (`PhotoPerson`) et pictos SVG.
- `public/personnages/equipe-hse/` : les 6 rôles détourés pour la capsule équipe.
- `public/personnages/` : personnes détourées depuis la photo (superviseur = gilet orange, responsable = casque blanc) et photo d'équipe pour la scène finale.
- `public/voix-off.m4a` : piste audio (extraite de la capsule d'origine ; à remplacer par une voix-off propre).
- `public/fonts/` : Patrick Hand (sous-titres) et Montserrat (titres, bandeaux), embarquées.

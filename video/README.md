# Capsules vidéo UNIVERSNORMES (Remotion)

Capsules animées verticales (1080×1920, 30 i/s) dans la charte UNIVERSNORMES :
- `SuperviseurHSE` : « Le Superviseur HSE » (54 s).
- `DangerRisque` : « La différence entre danger et risque » (58 s) — machine à lame animée, logo officiel et
  photos de la banque (`public/promo/`) ; script dans `src/danger/`.
- `CharteQualite` : « La Charte Qualité » (5 min 11) — 5 chapitres, document « charte » animé en fil rouge,
  logo officiel, ingénieur présentateur et photos de la banque ; script dans `src/charte/`.
- `EpiEpc` : « EPI vs EPC : le guide sécurité » (4 min 29) — 4 chapitres, figure EPI annotée, tableau
  comparatif animé, pyramide de priorité ; images dans `public/epi/`, script dans `src/epi/`.
- `PromoFormationQHSE` : vidéo promotionnelle de la formation Management QHSE (77 s, session du 05/11/2026 en ligne) — logo officiel
  (`public/promo/logo.png`), banque de photos fournie (`public/promo/`), badges ISO recréés, musique de fond générée.
- `PyramideQHSE` : « L'anatomie d'un système documentaire QHSE » (73 s) — pyramide documentaire à 5 niveaux, avec
  l'ingénieur au plan (photo détourée) ; script dans `src/pyramide/`.
- `AgentSuperviseur` : « Agent ou Superviseur HSE : qui fait quoi ? » (64 s) — les deux photos détourées + illustrations
  Fluent ; script dans `src/roles/`.
- `Iso9001` : « Les véritables évolutions de la norme qualité » (65 s) — illustrations 3D Microsoft Fluent Emoji
  (licence MIT, `public/fluent/LICENSE-fluentui-emoji.txt`) ; script dans `src/iso/`.
- `Prevention` : « Pourquoi la prévention rapporte gros » (61 s) — personnages et objets générés avec Nano Banana Pro
  (Higgsfield), détourés, dans `public/nanobanana/` ; script dans `src/prevention/`. Sans les visuels, prévisualiser avec
  `--props='{"placeholders":true}'` (images factices aux mêmes dimensions).
- `EquipeHSE` : « L'architecture d'une équipe HSE performante » (69 s) — organigramme vivant des 6 rôles,
  chaque rôle présenté en plein écran (photo détourée) puis envolé dans son médaillon. Code dans `src/equipe/`
  (`roles.ts` : rôles, cadrages, timings, liens ; `captions.ts` : script de la voix-off).

## Commandes
```bash
npm install
npm run studio            # aperçu interactif dans le navigateur
npm run render:superviseur # rendu + mastering audio (-14 LUFS) → 1080p et 720p dans out/
npm run render:equipe
npm run render:prevention
npm run render:iso
npm run render:roles
npm run render:pyramide
npm run render:promo
npm run render:danger
npm run render:charte
npm run render:epi
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

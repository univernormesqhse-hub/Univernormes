# Capsules vidéo UNIVERSNORMES (Remotion)

Capsule animée verticale (1080×1920, 30 i/s) « Le Superviseur HSE », reconstruite dans le style des capsules UNIVERSNORMES.

## Commandes
```bash
npm install
npm run studio            # aperçu interactif dans le navigateur
npm run render            # out/capsule-superviseur-hse.mp4 (1080p)
npm run render:whatsapp   # version 720p légère
```
Dans l'environnement cloud, pointer Remotion vers le Chromium préinstallé :
`REMOTION_BROWSER=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`.

## Structure
- `src/captions.ts` : script de la voix-off + timings des sous-titres (à modifier pour une autre capsule).
- `src/SuperviseurHSE.tsx` : storyboard découpé en actes (terrain, urgence, responsable, action, bouclier, carton final).
- `src/components/` : charte fixe (fond, bandeaux, sous-titres), personnages photo (`PhotoPerson`) et pictos SVG.
- `public/personnages/` : personnes détourées depuis la photo (superviseur = gilet orange, responsable = casque blanc) et photo d'équipe pour la scène finale.
- `public/voix-off.m4a` : piste audio (extraite de la capsule d'origine ; à remplacer par une voix-off propre).
- `public/fonts/` : Patrick Hand (sous-titres) et Montserrat (titres, bandeaux), embarquées.

# 04 — Reproduire une vidéo de référence

Déclencheurs : « inspire-toi de », « refais ce motion », une vidéo de référence partagée.

1. **Décomposer la référence** :
   ```bash
   bash .claude/skills/motion-library/scripts/extract-frames.sh <reference.mp4> 4 /tmp/ref-frames
   ```
   → grilles de frames (`grid-XX.jpg`). Les lire pour identifier : mise en page, typographie, couleurs, courbes d'animation (entrée, maintien, sortie), durées, sons.
2. **Chercher dans la librairie** (`library/index.md`) un motion proche : adapter plutôt que réécrire.
3. **Décrire** à l'utilisateur ce qui a été compris (timing par phase, éléments), puis construire la démo `Demo-<Slug>` qui le reproduit.
4. **Comparer** : images fixes de la démo aux mêmes instants que la référence ; corriger les écarts.
5. Une fois validé, sauvegarder (`steps/03-sauvegarder.md`) en notant la référence d'origine dans la fiche.

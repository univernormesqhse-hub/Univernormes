---
name: Kit SFX de transition
section: sounds
slug: kit-sfx-transition
description: Séquence whoosh → 4 dings → soft-whoosh → thud → pop → whoosh qui accompagne chaque transition de partie.
quand: À chaque transition (gyrophare, loupe, tube, store) ; volume 0,12–0,45 sous la voix.
component: src/langageDg/LangageDg.tsx
demo: none
audio: public/sfx/whoosh.wav
tags: [son, transition]
---

## Utilisation
`const trans = (x) => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}]` → `CUES`, joué par `<SoundDesign cues={CUES} />`. Fichiers dans `public/sfx/`.

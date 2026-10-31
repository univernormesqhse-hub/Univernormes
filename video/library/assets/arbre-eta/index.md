---
name: Arbre des événements (ETA) qui se construit + plans de propagation du feu
section: assets
slug: arbre-eta
description: Composant SVG `EventTree` générique : événement initiateur, colonnes de barrières, branches succès (haut, vert) / échec (bas, rouge) qui se tracent colonne par colonne avec pastilles ✓ / ✗, feuilles finales colorées selon le nombre d'échecs (vert → jaune → orange → rouge), libellés optionnels. Exemple incendie : départ de feu animé sur photo (flammes, fumée), puis 3 barrières jouées dans un panneau pendant que l'arbre pousse au-dessus (détecteur qui clignote et émet des ondes, sprinkler qui arrose et fait baisser la flamme, camion de pompiers qui arrive gyrophares allumés, roues qui tournent, route qui défile), boutons « ✓ fonctionne / ✗ défaillance ». Aussi : lettres E · T · A qui déplient leurs mots avec traduction qui glisse, miroir FTA ◀◀ causes / ETA ▶▶ scénarios avec barre de lecture façon magnétoscope, deux plans d'atelier (feu maîtrisé : la case passe au vert ; feu non maîtrisé : propagation case par case selon la distance jusqu'à l'incendie généralisé), zoom arrière qui révèle l'arbre complet + tampon.
quand: ETA / arbre des événements, barrières de sécurité, nœud papillon (partie droite), scénarios d'accident, LOPA, incendie, plan d'intervention, succès / échec, propagation.
component: src/etaMetro/EtaMetro.tsx
demo: Demo-ArbreEta
tags: [eta, arbre, événements, barrières, succès, échec, incendie, détecteur, sprinkler, pompiers, propagation]
---

## Utilisation
`<EventTree w h n pr leaf headers init leafLabels t />` (n = 2 ou 3 colonnes, `pr` = avancement de chaque colonne 0→1, `leaf` = apparition des feuilles). Barrières : `<Barrier t q />` (q = 0 détecteur, 1 sprinkler, 2 pompiers) + `QS3`. Flammes : `<Flames t s x y />`. Propagation : `<Plan t ko />` (grille `GC` × `GR`, origine `OX`, `OY`).

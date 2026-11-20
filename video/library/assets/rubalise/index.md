---
name: Kit rubalise — bandeau de référence normative (« ISO 45001 § 6.1.2 »), ruban rouge et blanc en diagonale qui emporte l'image, barrière de signalisation qui se lève, rubalise qui se déroule pour délimiter une zone ou servir de transition
section: assets
slug: rubalise
description: Module partagé `src/rubalise/Rubalise.tsx`, 2D, sans dépendance à une capsule. `NormRef` (petit bandeau marine à liseré rouge et blanc, icône livre, sur-titre monospace et référence en gras, reflet doré, entre et sort par la gauche), `RibbonSweep` (large bande papier bordée de rubalise qui traverse l'écran à −28° et masque la coupure), `BarrierLift` (six bandes de signalisation qui glissent depuis les côtés, se ferment puis pivotent vers le haut comme une barrière), `TapeZone` (rubalise qui se déroule autour d'un rectangle avec son rouleau en tête, puis s'efface), `TapeCross` (quatre rubans qui se déroulent en travers de l'écran avec éclair papier), orchestrés par `TapeFX`. Démo : « Identifier ou évaluer ? » version rubalise (`IdentificationEvaluationUiRubalise`), qui superpose le kit à la capsule UI motion d'origine sans la modifier.
quand: Toute capsule HSE / QHSE : citer une clause de norme ou une source, transitions de chantier ou de sécurité entre plans, mettre en évidence une zone (photo, jauge, cadran) comme un périmètre balisé.
component: src/rubalise/Rubalise.tsx
demo: Demo-IdentificationEvaluationUiRubalise
tags: [rubalise, ruban, barrière, signalisation, balisage, transition, référence normative, ISO 45001, clause, bandeau, zone délimitée, 2D]
---

## Utilisation
Une seule balise dans la composition principale :
`<TapeFX paper="#F6F3EA" refY={1528} events={[[t, 'ribbon' | 'barrier' | 'tape'], …]} zones={[[x, y, w, h, début, fin], …]} refs={[[t, 'ISO 45001 § 6.1.2.1', 'IDENTIFICATION DES DANGERS', durée], …]} />`
Chaque transition est centrée sur l'instant de coupe `t` (± 0,5 s). Le bandeau ne doit afficher qu'une référence exacte (clause existante, ou citée dans la voix). Éléments utilisables seuls : `NormRef`, `RibbonSweep`, `BarrierLift`, `TapeZone`, `TapeCross`.

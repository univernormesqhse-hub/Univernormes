---
name: Barre de recherche qui trouve et ouvre
section: assets
slug: barre-recherche-ouvre
description: Requête tapée lettre à lettre, liste de résultats scannée, « TROUVÉ ✓ », curseur qui clique et la fenêtre du résultat s’ouvre en plein cadre.
quand: Introduire une notion clé, une comparaison ou un outil ; une fois par capsule.
component: src/langageDg/LangageDg.tsx
demo: Demo-BarreRechercheOuvre
tags: [recherche, interface, wahou]
---

## Utilisation
`<SearchOpen x={60} y={440} w={960} h={930} at={157.0} query="levier stratégique" results={[…3]} found={1} foundAt={159.2} clickAt={159.6} c={VIO}>…contenu ouvert…</SearchOpen>`
SFX : `searchCues(at, query.length, foundAt, clickAt)`.

## Notes
Laisser ≥ 0,5 s entre fin de frappe (`at + 0.3 + 0.05 × longueur`) et `foundAt`, sinon la liste n’a pas le temps d’apparaître. Requête courte (≤ 20 caractères).

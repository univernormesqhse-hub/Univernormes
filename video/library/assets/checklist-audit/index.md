---
name: Checklist d'audit sur écritoire (13 lignes cochées en cascade + compteur + tampon)
section: assets
slug: checklist-audit
description: Écritoire néo-brutale crème avec pince grise : 13 lignes (case, pictogramme, libellé numéroté) dont les cases se cochent en cascade rapide (spring + clic sonore), compteur géant qui passe de 0 à 13 et vire au vert en pulsant, tampon « PRÊT POUR L'AUDIT ? », puces d'accompagnement en dessous ; s'enchaîne avec le téléphone TikTok et le numéro WhatsApp entouré. Va de pair avec le petit compteur « n / 13 » à jauge circulaire affiché dans chaque scène d'élément.
quand: Récapitulatif final d'une liste de contrôle (exigences d'audit, documents à présenter, points de vérification d'une inspection, prérequis d'un permis) ; montrer qu'on est prêt.
component: src/audit13Metro/Audit13Metro.tsx
demo: Demo-ChecklistAudit
tags: [checklist, audit, compteur, écritoire, coche, neo-brutal]
---

## Utilisation
Composant `Final` : lit le tableau `EL` (libellé, pictogramme, temps, couleur) ; la cascade se règle par `126.4 + k * 0.13`. `Counter` (`n`, `at`, `c`) s'utilise seul dans un coin de panneau.

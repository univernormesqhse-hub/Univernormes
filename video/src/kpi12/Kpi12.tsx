import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {Gate, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s} from '../theme';
import {captions} from './captions';
import {Bg, Cover, FILL, Header, LOGO, OUTRO_AT, PAPER, PT, TileWipe, WIPE} from './kit';
import {End, Intro, P1, P2} from './scenes';

/**
 * « Les 12 indicateurs pour maîtriser sa performance QHSE » (1 min 07) — voix d'origine, sous-titres recalés mot à mot,
 * photos réelles, thème « papier quadrillé » de la série.
 * Fil rouge inédit : un tableau de 12 cases (6 réactifs en rouge, 6 proactifs en vert) qui se remplit à chaque
 * indicateur nommé ; transitions en mur de tuiles qui pivotent en vague diagonale.
 * Une micro-animation propre à chaque indicateur : métronome (fréquence), enclume sur un plateau (gravité), caisse figée
 * au-dessus du casque (presque-accident), produit rejeté au tampon (non-conformité qualité), flaque confinée par un
 * boudin (incident environnemental), marteau de juge (non-conformité réglementaire), loupe qui coche une grille
 * (inspections), salle de formation qui se remplit, matrice 5×5 qui s'allume (évaluation des risques), carte Kanban
 * qui file vers « Terminé » avant l'échéance (actions correctives), engrenage et planning cochés (maintenance
 * préventive), liste d'audit tamponnée « CONFORME » ; introduction rétroviseur contre phares.
 */
export const KPI12_FRAMES = s(OUTRO_AT + 3.8);

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};
const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v}));
const STARTS = [9.6, 13.3, 16.7, 21.4, 25.1, 28.8, 36.6, 40.7, 44.8, 49.1, 53.4, 58.0];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2}, {at: 2.6, s: 'sfx/whoosh', v: 0.35}, {at: 2.8, s: 'sfx/whoosh', v: 0.35}, ...rep(4.0, 12, 0.1, 'sfx/click', 0.18),
  ...PT.flatMap((p) => [{at: p.at, s: 'sfx/whoosh', v: 0.4}, ...rep(p.at + 0.05, 12, 0.03, 'sfx/click', 0.16), {at: p.at + 0.6, s: 'bass-hit', v: 0.3}, ...rep(p.at + WIPE - 0.55, 10, 0.03, 'sfx/click', 0.14)]),
  {at: 8.5, s: 'sfx/pop', v: 0.25}, {at: 35.3, s: 'sfx/pop', v: 0.25},
  ...STARTS.flatMap((at) => [{at, s: 'sfx/swish', v: 0.3}, {at: at + 0.1, s: 'sfx/thud', v: 0.25}]),
  ...FILL.map((at) => ({at, s: 'sfx/ding', v: 0.22})),
  ...rep(9.9, 6, 0.6, 'tick', 0.2), {at: 15.4, s: 'deep-hit', v: 0.5}, {at: 15.42, s: 'sfx/thud', v: 0.45},
  {at: 18.0, s: 'sfx/whoosh', v: 0.3}, {at: 18.7, s: 'alarme', v: 0.12, dur: 0.6}, {at: 18.72, s: 'sfx/thud', v: 0.3},
  {at: 23.6, s: 'tampon', v: 0.55}, {at: 23.8, s: 'sfx/swish', v: 0.3}, {at: 26.4, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 27.4, s: 'sfx/rise', v: 0.25},
  ...[31.0, 31.9].map((at) => ({at, s: 'sfx/thud', v: 0.45})),
  ...rep(38.0, 10, 0.18, 'sfx/click', 0.22), ...rep(42.4, 12, 0.12, 'sfx/pop', 0.16), ...rep(46.4, 9, 0.12, 'tick', 0.18),
  {at: 50.6, s: 'sfx/swish', v: 0.35}, {at: 52.2, s: 'validation', v: 0.3}, ...rep(54.8, 12, 0.15, 'tick', 0.16),
  ...[59.6, 60.0, 60.4, 60.8].map((at) => ({at, s: 'stylo', v: 0.25})), {at: 61.6, s: 'tampon', v: 0.55},
  {at: 63.2, s: 'sfx/rise', v: 0.3}, {at: 63.6, s: 'validation', v: 0.3}, {at: 64.3, s: 'notification', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Kpi12: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.0} to={6.5}><Intro /></Gate>
    <Gate from={8.2} to={33.2}><P1 /></Gate>
    <Gate from={35.0} to={63.3}><P2 /></Gate>
    <Gate from={63.0} to={OUTRO_AT}><End /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><TileWipe p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-12-indicateurs-origine.m4a')} trimAfter={s(66.9)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

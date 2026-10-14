import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {Gate, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s} from '../theme';
import {captions} from './captions';
import {Bg, Cover, GaugeWipe, Header, LOGO, OUTRO_AT, PAPER, PT, WIPE} from './kit';
import {Intro, P1, P2, P3} from './scenes';

/**
 * « Construire un tableau de bord QHSE efficace » (1 min 16) — voix d'origine, sous-titres recalés mot à mot, photos
 * réelles, thème « papier quadrillé » de la série.
 * Fil rouge inédit : un combiné d'instruments à 4 cadrans Q · H · S · E dont les aiguilles montent vers le vert au fil de
 * la vidéo (en-tête) ; transitions en compteur géant dont l'aiguille balaie l'écran et allume les graduations.
 * Autres techniques nouvelles : bulles de conversation qui fusent, cartes-questions qui se retournent, poste de pilotage
 * (volant, courbe tracée sur le pare-brise), fenêtres photo qui s'ouvrent depuis leur centre, verbes animés (règle,
 * sonar, télescope, coche), rail de progression des 5 étapes, flèche plantée dans la cible, cartes KPI dont l'intruse est
 * écartée, fiche d'identité de l'indicateur remplie à la main, entonnoir de données, barre sous la cible avec l'écart
 * mesuré, plan d'actions coché, mur de chiffres qui converge en boussole, roue PDCA qui gravit une pente avec sa cale,
 * enveloppe qui s'envole vers la boîte de réception.
 */
export const TDB_FRAMES = s(OUTRO_AT + 3.8);

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};
const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...rep(2.7, 6, 0.22, 'sfx/pop', 0.25), {at: 4.7, s: 'sfx/swish', v: 0.35}, {at: 6.3, s: 'sfx/swish', v: 0.35},
  ...PT.flatMap((p) => [{at: p.at, s: 'sfx/whoosh', v: 0.4}, {at: p.at + 0.25, s: 'sfx/rise', v: 0.3}, ...rep(p.at + 0.3, 10, 0.09, 'tick', 0.2), {at: p.at + 1.25, s: 'sfx/ding', v: 0.3}, {at: p.at + WIPE - 0.4, s: 'sfx/swish', v: 0.4}]),
  {at: 10.0, s: 'sfx/pop', v: 0.25}, {at: 12.1, s: 'soft-whoosh', v: 0.3, dur: 1.5},
  ...[14.6, 15.3, 16.2, 17.0].map((at) => ({at: at - 0.25, s: 'sfx/whoosh', v: 0.28})), ...rep(18.0, 4, 0.12, 'sfx/click', 0.25),
  {at: 20.3, s: 'sfx/pop', v: 0.25}, ...[21.6, 23.2, 24.8, 27.8].map((at) => ({at: at - 0.2, s: 'sfx/swish', v: 0.3})), {at: 23.3, s: 'notification', v: 0.2}, {at: 27.9, s: 'validation', v: 0.3},
  {at: 32.0, s: 'sfx/pop', v: 0.3}, ...[34.7, 38.0, 42.5, 51.9, 55.2].map((at) => ({at: at - 0.3, s: 'sfx/ding', v: 0.22})),
  {at: 35.8, s: 'sfx/whoosh', v: 0.35}, {at: 36.5, s: 'sfx/thud', v: 0.5}, {at: 36.52, s: 'deep-hit', v: 0.3},
  ...rep(38.9, 5, 0.35, 'sfx/pop', 0.22), {at: 40.6, s: 'sfx/swish', v: 0.35}, {at: 40.7, s: 'alarme', v: 0.08, dur: 0.4},
  {at: 42.8, s: 'page', v: 0.45}, ...[45.5, 46.3, 47.7, 49.0, 50.0].flatMap((at) => [{at, s: 'stylo', v: 0.25}, {at: at + 0.6, s: 'sfx/click', v: 0.3}]), {at: 51.0, s: 'tampon', v: 0.55},
  ...rep(52.6, 16, 0.12, 'tick', 0.16), {at: 53.6, s: 'sfx/pop', v: 0.25}, {at: 54.9, s: 'sfx/ding', v: 0.22},
  {at: 56.3, s: 'sfx/rise', v: 0.3}, {at: 58.4, s: 'deep-hit', v: 0.3}, {at: 59.9, s: 'sfx/pop', v: 0.25}, ...[60.3, 60.7, 61.1].map((at) => ({at, s: 'sfx/click', v: 0.35})),
  ...rep(64.0, 10, 0.05, 'sfx/click', 0.14), {at: 65.3, s: 'sfx/swish', v: 0.4}, {at: 66.6, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: 67.4, s: 'validation', v: 0.3},
  {at: 68.9, s: 'sfx/rise', v: 0.3}, ...rep(69.0, 6, 0.3, 'sfx/thud', 0.18),
  {at: 72.1, s: 'sfx/pop', v: 0.22}, {at: 73.0, s: 'sfx/pop', v: 0.22}, {at: 74.0, s: 'notification', v: 0.3}, {at: 75.2, s: 'sfx/whoosh', v: 0.35}, {at: 75.5, s: 'validation', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const TdbQhse: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.0} to={8.0}><Intro /></Gate>
    <Gate from={9.5} to={30.0}><P1 /></Gate>
    <Gate from={31.5} to={62.1}><P2 /></Gate>
    <Gate from={63.6} to={OUTRO_AT}><P3 /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><GaugeWipe p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-tableau-bord-qhse-origine.m4a')} trimAfter={s(77.2)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

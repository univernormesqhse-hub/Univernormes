import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {Gate, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s} from '../theme';
import {captions} from './captions';
import {Bg, Cover, Header, LOGO, OUTRO_AT, PAPER, PT, ScanWipe, WIPE} from './kit';
import {Intro, P1} from './s1';
import {P2, P3} from './s2';
import {Final, P4, P5, P6} from './s3';

/**
 * « Maîtrise de la JSA » (6 min 32) — voix d'origine, sous-titres recalés mot à mot, photos réelles.
 * Univers « papier quadrillé » de la série, panneaux façon interface de supervision (HUD), bleus et verts de la vidéo source.
 * Fil rouge : un tableau de consignation à 6 cadenas, verrouillés un à un à chaque partie (en-tête) et tous fermés au
 * mot de la fin ; transitions en balayage laser de scanner, compteur de module qui défile, cadenas qui claque.
 * Autres techniques nouvelles : piliers J-S-A qui soutiennent un fronton, acronyme qui se déplie, dé 3D barré,
 * micromètre qui se serre au centième, radar qui verrouille et neutralise les dangers, programme en nid d'abeilles,
 * badges JSA/JHA qui fusionnent, ligne du temps « T-1 », formulaire passé au broyeur, photo fracturée en étapes avec
 * zoom microscope, barrière levante, chaîne de montage à 4 postes, « zéro » assemblé pixel par pixel, chronomètre au
 * dixième, ampoule et échelle à 5 barreaux gravie par un casque, pellicule de film piégée, lampe UV qui révèle les
 * dangers invisibles, pièces de puzzle danger/parade qui s'emboîtent, machine à sous Danger/Risque/Mesure, alphabet
 * A→Z, caisse à outils, panneau d'affichage à volets, double hélice ADN « AVANT », affiche de combat VS, objectif photo
 * 16 → 200 mm, cartes en chute libre « en vrac », carte dorée tapée à la machine avec « BAM ! », socle contre accessoire,
 * pendule, mot « FATALITÉ » qui vole en éclats.
 */
export const JSA_FRAMES = s(OUTRO_AT + 3.8);

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...[3.2, 3.55, 3.9].map((at) => ({at, s: 'sfx/thud', v: 0.35})), {at: 5.4, s: 'sfx/whoosh', v: 0.35}, {at: 5.8, s: 'deep-hit', v: 0.35}, {at: 8.4, s: 'sfx/rise', v: 0.25}, {at: 10.2, s: 'sfx/ding', v: 0.22},
  {at: 13.0, s: 'sfx/pop', v: 0.25}, ...rep(14.4, 8, 0.18, 'sfx/click', 0.3), {at: 16.0, s: 'sfx/swish', v: 0.4}, {at: 16.3, s: 'bass-hit', v: 0.3}, {at: 18.1, s: 'sfx/pop', v: 0.25}, {at: 19.3, s: 'stylo', v: 0.3},
  ...rep(20.8, 12, 0.13, 'tick', 0.22), {at: 22.5, s: 'sfx/click', v: 0.4}, {at: 22.6, s: 'validation', v: 0.3},
  {at: 26.4, s: 'soft-whoosh', v: 0.3, dur: 2}, ...[27.5, 28.4, 29.3, 30.2].map((at) => ({at, s: 'notification', v: 0.18})), ...[29.5, 30.4, 31.3, 32.2].map((at) => ({at, s: 'sfx/click', v: 0.35})), ...[34.0, 34.3, 34.6, 34.9].map((at) => ({at, s: 'sfx/pop', v: 0.3})), {at: 35.6, s: 'validation', v: 0.25},
  ...rep(36.7, 6, 0.12, 'sfx/pop', 0.16), ...[38.1, 40.5, 42.7, 45.4, 47.5, 51.2].map((at) => ({at: at - 0.1, s: 'sfx/ding', v: 0.25})),
  ...PT.flatMap((p) => [{at: p.at, s: 'sfx/rise', v: 0.3}, {at: p.at + 0.05, s: 'sfx/whoosh', v: 0.4}, ...rep(p.at + 0.4, 6, 0.1, 'tick', 0.2), {at: p.at + 1.33, s: 'cadenas', v: 0.6}, {at: p.at + 1.35, s: 'sfx/thud', v: 0.3}, {at: p.at + WIPE - 0.5, s: 'sfx/swish', v: 0.4}]),
  {at: 56.3, s: 'sfx/pop', v: 0.25}, {at: 61.3, s: 'sfx/pop', v: 0.25}, {at: 64.8, s: 'sfx/swish', v: 0.3}, {at: 65.7, s: 'validation', v: 0.3},
  {at: 68.0, s: 'sfx/rise', v: 0.25}, {at: 69.0, s: 'sfx/thud', v: 0.4},
  {at: 72.0, s: 'page', v: 0.4}, {at: 74.0, s: 'tension', v: 0.15, dur: 2}, ...rep(74.0, 16, 0.12, 'sfx/click', 0.18), {at: 76.9, s: 'sfx/whoosh', v: 0.3}, {at: 77.1, s: 'sfx/ding', v: 0.22},
  {at: 80.2, s: 'deep-hit', v: 0.4}, {at: 80.25, s: 'sfx/swish', v: 0.35}, {at: 83.4, s: 'soft-whoosh', v: 0.35, dur: 1.2}, {at: 84.6, s: 'sfx/ding', v: 0.22},
  ...[86.0, 87.4, 88.8].map((at) => ({at, s: 'sfx/pop', v: 0.28})), {at: 89.8, s: 'sfx/thud', v: 0.5}, {at: 89.9, s: 'validation', v: 0.3},
  ...rep(97.0, 4, 0.2, 'sfx/pop', 0.2), ...[101.0, 102.9, 104.6, 107.0].flatMap((at) => [{at: at - 0.7, s: 'sfx/swish', v: 0.25}, {at, s: 'sfx/click', v: 0.45}]), {at: 102.95, s: 'sfx/thud', v: 0.25}, {at: 104.7, s: 'alarme', v: 0.08, dur: 0.5}, {at: 107.1, s: 'validation', v: 0.3},
  ...rep(112.6, 24, 0.15, 'tick', 0.16), {at: 116.4, s: 'sfx/ding', v: 0.3}, {at: 119.6, s: 'sfx/pop', v: 0.3},
  {at: 125.2, s: 'sfx/pop', v: 0.25}, {at: 126.6, s: 'sfx/swish', v: 0.35}, ...[131.1, 132.6, 133.3, 134.3].map((at) => ({at: at - 0.2, s: 'sfx/whoosh', v: 0.28})),
  ...rep(137.4, 14, 0.1, 'tick', 0.24), {at: 138.9, s: 'deep-hit', v: 0.45}, {at: 138.95, s: 'alarme', v: 0.12, dur: 0.6}, {at: 142.6, s: 'sfx/rise', v: 0.25},
  {at: 147.3, s: 'soft-whoosh', v: 0.3, dur: 1.5}, {at: 151.8, s: 'sfx/pop', v: 0.22}, {at: 156.4, s: 'bass-hit', v: 0.4}, {at: 156.5, s: 'sfx/ding', v: 0.3},
  ...[158.3, 160.1, 161.2, 163.7, 165.0].flatMap((at) => [{at: at - 0.2, s: 'sfx/thud', v: 0.25}, {at, s: 'sfx/pop', v: 0.22}]),
  {at: 166.4, s: 'soft-whoosh', v: 0.3, dur: 3}, ...rep(166.6, 18, 0.4, 'tick', 0.12), ...[174.2, 174.45, 174.7, 174.95].map((at) => ({at, s: 'sfx/pop', v: 0.28})), {at: 174.3, s: 'alarme', v: 0.1, dur: 0.8},
  {at: 177.0, s: 'tension', v: 0.15, dur: 3}, ...[186.2, 188.2, 192.3, 194.7].map((at) => ({at: at - 0.3, s: 'sfx/rise', v: 0.2})), ...[186.2, 188.2, 192.3, 194.7].map((at) => ({at, s: 'notification', v: 0.2})), ...[199.4, 199.55, 199.7, 199.85].map((at) => ({at, s: 'sfx/click', v: 0.35})),
  ...rep(204.2, 4, 0.3, 'sfx/pop', 0.2), ...[210.7, 214.7, 218.2, 222.3].flatMap((at) => [{at: at - 0.4, s: 'sfx/whoosh', v: 0.28}, {at, s: 'sfx/click', v: 0.5}, {at: at + 0.05, s: 'validation', v: 0.18}]), {at: 214.75, s: 'cadenas', v: 0.4}, {at: 225.6, s: 'sfx/ding', v: 0.3},
  ...[230.5, 236.5, 239.6].flatMap((a) => rep(a, 14, 0.09, 'sfx/click', 0.14)), ...[232.1, 233.5, 235.6, 238.1, 238.6, 239.2, 241.2, 241.7, 242.7].map((at) => ({at, s: 'sfx/thud', v: 0.3})), {at: 235.7, s: 'sfx/ding', v: 0.25}, {at: 239.3, s: 'sfx/ding', v: 0.25}, {at: 242.8, s: 'sfx/bell', v: 0.25},
  ...rep(245.4, 26, 0.16, 'tick', 0.12), {at: 251.6, s: 'tampon', v: 0.55},
  {at: 258.4, s: 'sfx/click', v: 0.35}, {at: 258.6, s: 'sfx/rise', v: 0.25}, {at: 259.2, s: 'sfx/ding', v: 0.22},
  ...[262.9, 267.7, 269.7, 271.1, 272.1, 275.4].flatMap((at) => [...rep(at - 0.3, 8, 0.05, 'sfx/click', 0.18), {at: at + 0.5, s: 'sfx/pop', v: 0.22}]),
  {at: 276.4, s: 'soft-whoosh', v: 0.3, dur: 2}, ...rep(278.0, 5, 0.12, 'sfx/ding', 0.16), {at: 280.6, s: 'sfx/pop', v: 0.25},
  {at: 287.2, s: 'sfx/whoosh', v: 0.4}, {at: 287.5, s: 'sfx/whoosh', v: 0.4}, {at: 287.9, s: 'bass-hit', v: 0.5}, {at: 287.95, s: 'deep-hit', v: 0.4}, {at: 289.9, s: 'sfx/pop', v: 0.22},
  {at: 295.4, s: 'sfx/click', v: 0.3}, {at: 302.8, s: 'sfx/rise', v: 0.3}, ...rep(302.8, 16, 0.12, 'tick', 0.16), {at: 304.8, s: 'sfx/click', v: 0.4}, {at: 305.9, s: 'sfx/pop', v: 0.22}, {at: 310.4, s: 'sfx/whoosh', v: 0.3}, {at: 312.3, s: 'sfx/pop', v: 0.25},
  {at: 318.0, s: 'soft-whoosh', v: 0.25, dur: 1.5}, {at: 325.6, s: 'sfx/pop', v: 0.22}, ...rep(330.0, 16, 0.11, 'sfx/click', 0.15),
  {at: 333.2, s: 'alarme', v: 0.12, dur: 0.8}, {at: 333.2, s: 'bass-hit', v: 0.35}, ...[336.6, 336.95, 337.3, 337.65, 338.0].map((at) => ({at, s: 'sfx/thud', v: 0.35})), {at: 339.0, s: 'sfx/whoosh', v: 0.25},
  {at: 343.0, s: 'sfx/rise', v: 0.25}, ...rep(344.4, 50, 0.14, 'sfx/click', 0.12), {at: 351.5, s: 'deep-hit', v: 0.5}, {at: 351.52, s: 'bass-hit', v: 0.4},
  {at: 358.6, s: 'sfx/pop', v: 0.22}, {at: 359.6, s: 'sfx/swish', v: 0.35}, {at: 362.0, s: 'sfx/thud', v: 0.45}, {at: 362.1, s: 'validation', v: 0.3}, {at: 364.8, s: 'sfx/ding', v: 0.3},
  {at: 366.6, s: 'soft-whoosh', v: 0.3, dur: 2}, ...rep(367.4, 12, 0.83, 'tick', 0.18), {at: 372.5, s: 'sfx/pop', v: 0.22}, {at: 375.8, s: 'sfx/pop', v: 0.22},
  {at: 380.9, s: 'deep-hit', v: 0.5}, {at: 380.92, s: 'sfx/thud', v: 0.4}, ...rep(381.0, 6, 0.08, 'sfx/click', 0.25), {at: 382.4, s: 'sfx/ding', v: 0.22},
  {at: 385.0, s: 'sfx/pop', v: 0.22}, {at: 386.4, s: 'sfx/swish', v: 0.35}, {at: 388.5, s: 'sfx/rise', v: 0.3}, ...[0, 1, 2, 3, 4, 5].map((k) => ({at: 389.85 + k * 0.27, s: 'cadenas', v: 0.4})), {at: 391.2, s: 'validation', v: 0.4},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Jsa: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.0} to={53.5}><Intro /></Gate>
    <Gate from={55.6} to={92.6}><P1 /></Gate>
    <Gate from={94.7} to={144.7}><P2 /></Gate>
    <Gate from={146.8} to={253.0}><P3 /></Gate>
    <Gate from={255.1} to={284.6}><P4 /></Gate>
    <Gate from={286.7} to={314.7}><P5 /></Gate>
    <Gate from={316.8} to={366.6}><P6 /></Gate>
    <Gate from={366.4} to={OUTRO_AT}><Final /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><ScanWipe p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-jsa-origine.m4a')} trimAfter={s(392.6)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

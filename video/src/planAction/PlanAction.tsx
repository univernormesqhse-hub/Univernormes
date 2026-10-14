import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {Gate, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s} from '../theme';
import {captions} from './captions';
import {Bg, Clap, CLAP, Cover, END_STEPS, Header, LOGO, OUTRO_AT, PAPER, STEPS} from './kit';
import {Intro, Steps1to4} from './s1';
import {Finale, Steps5to8} from './s2';

/**
 * « Maîtriser le plan d'action QHSE » (3 min 23) — voix d'origine (la répétition accidentelle des 1 min 44 de début
 * présente dans la vidéo source est retirée), sous-titres recalés mot à mot, photos réelles, thème « papier quadrillé ».
 * Fil rouge inédit : la feuille « Plan d'action QHSE » dont les 8 lignes se remplissent (ruban de 8 cases en en-tête) ;
 * transitions en clap de cinéma « Étape N / 8 · Prise 1 » qui claque puis repart.
 * Autres techniques nouvelles : pile de photos-problèmes, tâches distribuées comme des cartes, boomerang des problèmes
 * qui reviennent, plan d'action fissuré sous le projecteur, machine à transformer à trois trémies, touches de clavier
 * Quoi/Pourquoi/Qui/Quand/Comment, plante déterrée jusqu'à la cause racine, clé dans la serrure « cause », garde-corps
 * qui se monte, projecteur qui désigne un responsable, patate chaude qui tombe, action repoussée par « Reporter »,
 * podium des priorités, caisse de ressources, plan qui se déplie en carte pop-up, Kanban, calendrier de points de suivi,
 * « Réalisée ≠ Efficace », flash photo des preuves, rembobinage vers les causes, tableau vivant qui se réordonne et dont
 * sort une pousse, défilement sans fin des lignes contre problèmes résolus.
 */
export const PLANACTION_FRAMES = s(OUTRO_AT + 3.8);

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};
const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2}, ...[0.79, 1.59, 2.59].map((at) => ({at, s: 'sfx/thud', v: 0.35})),
  ...[4.8, 6.0, 7.2].map((at) => ({at, s: 'sfx/swish', v: 0.3})), ...rep(9.6, 4, 0.4, 'page', 0.3), {at: 11.0, s: 'sfx/whoosh', v: 0.4}, {at: 12.0, s: 'alarme', v: 0.1, dur: 0.6},
  {at: 13.3, s: 'bass-hit', v: 0.35}, {at: 16.2, s: 'soft-whoosh', v: 0.3, dur: 1.5}, {at: 18.4, s: 'sfx/thud', v: 0.35}, {at: 18.45, s: 'deep-hit', v: 0.3},
  ...[25.8, 27.6, 28.9].map((at) => ({at: at + 0.8, s: 'sfx/thud', v: 0.25})), ...rep(25.5, 18, 0.33, 'tick', 0.12), ...[30.7, 31.4, 32.1].map((at) => ({at, s: 'sfx/pop', v: 0.28})),
  ...[34.0, 35.1, 36.9, 38.1, 39.0].map((at) => ({at: at + 0.05, s: 'sfx/click', v: 0.5})), {at: 41.6, s: 'page', v: 0.45},
  ...STEPS.flatMap((p) => [{at: p.at, s: 'sfx/whoosh', v: 0.4}, {at: p.at + 0.62, s: 'sfx/thud', v: 0.55}, {at: p.at + 0.63, s: 'sfx/click', v: 0.5}, {at: p.at + CLAP - 0.4, s: 'sfx/swish', v: 0.35}]),
  ...[51.5, 53.2, 55.7, 57.1].map((at) => ({at, s: 'sfx/whoosh', v: 0.25})), {at: 61.8, s: 'soft-whoosh', v: 0.3, dur: 2}, {at: 63.4, s: 'sfx/ding', v: 0.25},
  {at: 71.8, s: 'sfx/swish', v: 0.3}, {at: 73.0, s: 'cadenas', v: 0.5}, {at: 79.6, s: 'sfx/swish', v: 0.35}, ...rep(82.0, 6, 0.3, 'sfx/thud', 0.2), ...[83.8, 84.6, 85.6].map((at) => ({at, s: 'sfx/ding', v: 0.22})),
  {at: 89.4, s: 'soft-whoosh', v: 0.3, dur: 1.5}, {at: 91.4, s: 'sfx/pop', v: 0.3}, ...rep(95.4, 4, 0.55, 'sfx/swish', 0.25), {at: 98.3, s: 'sfx/thud', v: 0.45},
  {at: 103.4, s: 'sfx/rise', v: 0.25}, {at: 105.0, s: 'sfx/ding', v: 0.25}, ...rep(107.5, 3, 1.1, 'notification', 0.2), ...[113.1, 114.4, 115.8].map((at) => ({at, s: 'sfx/thud', v: 0.35})),
  ...[120.7, 122.2, 123.1, 124.1, 125.3].map((at) => ({at: at + 0.5, s: 'sfx/thud', v: 0.3})), {at: 128.6, s: 'page', v: 0.45}, {at: 129.8, s: 'validation', v: 0.3},
  ...[136.9, 138.0, 139.0].flatMap((at) => rep(at - 0.4, 3, 0.2, 'sfx/pop', 0.2)), ...rep(141.0, 4, 0.7, 'sfx/click', 0.25),
  {at: 148.8, s: 'sfx/pop', v: 0.25}, {at: 150.6, s: 'sfx/pop', v: 0.25}, {at: 150.9, s: 'bass-hit', v: 0.35}, {at: 153.8, s: 'sfx/click', v: 0.5}, ...[154.5, 157.0, 159.2].map((at) => ({at, s: 'sfx/pop', v: 0.22})),
  {at: 160.3, s: 'sfx/rise', v: 0.3}, ...rep(160.4, 12, 0.11, 'tick', 0.2), {at: 161.3, s: 'sfx/ding', v: 0.22}, {at: 162.6, s: 'validation', v: 0.25},
  {at: 169.8, s: 'stylo', v: 0.25}, {at: 171.2, s: 'sfx/swish', v: 0.35}, {at: 174.9, s: 'soft-whoosh', v: 0.3, dur: 2}, {at: 177.0, s: 'validation', v: 0.3},
  ...rep(180.0, 20, 0.15, 'tick', 0.12), {at: 185.0, s: 'sfx/ding', v: 0.3}, {at: 186.6, s: 'sfx/rise', v: 0.3},
  ...[190.3, 193.4, 194.5].map((at) => ({at, s: 'sfx/pop', v: 0.25})), {at: 196.2, s: 'notification', v: 0.3}, {at: 200.6, s: 'validation', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const PlanAction: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={0} to={48.3}><Intro /></Gate>
    <Gate from={49.5} to={117.7}><Steps1to4 /></Gate>
    <Gate from={119.0} to={END_STEPS + 0.1}><Steps5to8 /></Gate>
    <Gate from={END_STEPS} to={OUTRO_AT}><Finale /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {STEPS.map((p) => <Gate key={p.n} from={p.at} to={p.at + CLAP + 0.1}><Clap s={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-plan-action-qhse-origine.m4a')} trimAfter={s(202.8)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

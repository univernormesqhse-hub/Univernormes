import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {Gate, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s} from '../theme';
import {captions} from './captions';
import {Bg, Blueprint, Cover, Header, LOGO, OUTRO_AT, PAPER, PT, WIPE} from './kit';
import {Intro, P1} from './scenes1';
import {P2} from './scenes2';
import {P3, P4} from './scenes3';
import {P5} from './scenes4';

/**
 * « Implémenter l'ISO 9001 dans le monde réel » (5 min 11) — voix d'origine, sous-titres recalés mot à mot, photos
 * réelles, univers « papier quadrillé » aux couleurs jaunes de la vidéo source.
 * Fil rouge inédit : l'immeuble « système qualité » qui gagne un étage par partie (posé par une grue), visible en
 * en-tête et achevé, drapeau planté, sur le mot de la fin ; transitions en plan d'architecte bleu qui se déroule depuis
 * un rouleau, chiffre tracé au trait et étage dessiné en pointillés.
 * Autres techniques nouvelles dans la série : texte de norme dont les lignes s'envolent en sable sur des dunes, iris
 * qui plonge dans une photo, citation tapée à la machine, tableau noir effacé à l'éponge, moniteur cardiaque qui
 * s'arrête, plan de métro parcouru par une rame, manuel qui se referme et file dans un tiroir, photo qui se retourne
 * comme une carte, engrenages qui s'engrènent ou coincent, stylo qui s'arrête au-dessus d'une procédure vierge,
 * chaîne de dominos, marionnette « POURQUOI » qui tient les lettres « COMMENT », mâchoires de pièges, panneau
 * publicitaire à lamelles prismatiques (trivision), polaroïd qui se développe, jauge d'écart au pied à coulisse,
 * cartes distribuées depuis un paquet, iceberg avec plongée sous la surface, tapis qui se soulève, balance, carte
 * dépliée en accordéon sur une dalle de béton, éphéméride effeuillé, règle des mois, coquille qui se remplit, tour de
 * Jenga qui s'effondre, sablier, mur de briques, carrefour à deux panneaux, plaque qui s'étiole, moteur d'engrenages,
 * pièce lancée en 3D qui retombe sur la tranche « NEUTRE », ascension vers un drapeau.
 */
export const IMPLISO_FRAMES = s(OUTRO_AT + 3.8);

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  {at: 2.6, s: 'page', v: 0.4}, {at: 4.1, s: 'soft-whoosh', v: 0.5, dur: 2.2}, {at: 4.05, s: 'sfx/thud', v: 0.3},
  {at: 6.6, s: 'sfx/rise', v: 0.3}, {at: 7.4, s: 'sfx/whoosh', v: 0.35}, {at: 8.8, s: 'sfx/pop', v: 0.3}, {at: 9.7, s: 'sfx/ding', v: 0.25},
  {at: 12.2, s: 'sfx/pop', v: 0.3}, {at: 13.4, s: 'sfx/pop', v: 0.3}, {at: 13.5, s: 'sfx/swish', v: 0.25},
  ...rep(15.2, 18, 0.11, 'sfx/click', 0.16),
  {at: 18.7, s: 'sfx/swish', v: 0.35}, {at: 19.2, s: 'sfx/swish', v: 0.3}, {at: 20.4, s: 'sfx/whoosh', v: 0.3}, {at: 20.6, s: 'sfx/pop', v: 0.25},
  ...rep(21.8, 6, 0.455, 'tick', 0.22), {at: 22.6, s: 'sfx/ding', v: 0.2}, {at: 24.4, s: 'alarme', v: 0.14, dur: 1.2}, {at: 24.35, s: 'deep-hit', v: 0.3},
  {at: 26.0, s: 'sfx/pop', v: 0.28}, {at: 27.0, s: 'sfx/pop', v: 0.28},
  {at: 28.5, s: 'sfx/rise', v: 0.25}, ...[30.4, 34.5, 37.8, 40.5, 45.3].flatMap((at) => [{at: at - 0.7, s: 'sfx/swish', v: 0.22}, {at, s: 'sfx/ding', v: 0.25}]), {at: 46.2, s: 'validation', v: 0.25},
  ...PT.flatMap((p) => [{at: p.at, s: 'page', v: 0.5}, {at: p.at + 0.05, s: 'sfx/whoosh', v: 0.4}, {at: p.at + 0.4, s: 'stylo', v: 0.3}, {at: p.at + 1.0, s: 'sfx/thud', v: 0.25}, {at: p.at + WIPE - 0.5, s: 'sfx/swish', v: 0.4}]),
  {at: 51.6, s: 'page', v: 0.45}, {at: 52.4, s: 'sfx/thud', v: 0.35}, {at: 53.3, s: 'sfx/thud', v: 0.45}, {at: 53.6, s: 'sfx/pop', v: 0.3},
  {at: 55.0, s: 'sfx/swish', v: 0.35}, {at: 55.9, s: 'sfx/ding', v: 0.25},
  ...rep(56.7, 8, 0.24, 'tick', 0.18), {at: 57.6, s: 'sfx/whoosh', v: 0.3}, {at: 58.0, s: 'validation', v: 0.25}, {at: 58.6, s: 'deep-hit', v: 0.4}, {at: 58.62, s: 'sfx/thud', v: 0.4}, {at: 58.7, s: 'alarme', v: 0.1, dur: 0.6},
  {at: 65.0, s: 'stylo', v: 0.3}, {at: 66.6, s: 'sfx/thud', v: 0.45}, {at: 66.62, s: 'bass-hit', v: 0.3},
  {at: 68.7, s: 'bass-hit', v: 0.4}, {at: 69.3, s: 'sfx/pop', v: 0.25},
  {at: 71.2, s: 'sfx/pop', v: 0.2}, ...[72.6, 73.9, 74.6, 76.9].map((at) => ({at: at + 0.2, s: 'sfx/click', v: 0.5})), {at: 77.2, s: 'sfx/thud', v: 0.4},
  {at: 79.8, s: 'sfx/whoosh', v: 0.3}, {at: 83.6, s: 'sfx/ding', v: 0.25}, {at: 85.8, s: 'validation', v: 0.25},
  {at: 86.8, s: 'sfx/whoosh', v: 0.3}, ...[88.9, 89.4, 89.9, 90.4].map((at) => ({at, s: 'cadenas', v: 0.4})),
  {at: 92.4, s: 'sfx/whoosh', v: 0.35}, ...rep(95.2, 4, 0.3, 'sfx/pop', 0.22),
  ...[98.6, 100.5, 106.0, 113.7, 116.0, 117.6, 122.3, 126.4, 129.2].flatMap((at) => rep(at, 8, 0.05, 'sfx/click', 0.14)),
  {at: 100.6, s: 'deep-hit', v: 0.3}, {at: 106.2, s: 'validation', v: 0.25}, {at: 116.1, s: 'deep-hit', v: 0.25}, {at: 117.8, s: 'validation', v: 0.25}, {at: 126.5, s: 'deep-hit', v: 0.25}, {at: 129.4, s: 'validation', v: 0.25},
  {at: 138.45, s: 'tampon', v: 0.25}, {at: 138.5, s: 'sfx/pop', v: 0.4}, {at: 138.7, s: 'sfx/rise', v: 0.25}, {at: 141.9, s: 'soft-whoosh', v: 0.25, dur: 2.5}, {at: 145.9, s: 'sfx/pop', v: 0.25}, {at: 146.9, s: 'sfx/swish', v: 0.3}, {at: 148.0, s: 'sfx/ding', v: 0.22},
  {at: 150.7, s: 'sfx/pop', v: 0.25}, ...[152.0, 156.3, 163.4, 168.1].flatMap((at) => [{at: at - 0.45, s: 'sfx/swish', v: 0.35}, {at: at + 0.1, s: 'page', v: 0.35}]), {at: 171.6, s: 'tampon', v: 0.5},
  {at: 173.0, s: 'soft-whoosh', v: 0.3, dur: 2}, {at: 177.2, s: 'sfx/pop', v: 0.25}, {at: 179.3, s: 'soft-whoosh', v: 0.5, dur: 1.5}, {at: 179.6, s: 'bass-hit', v: 0.35}, {at: 181.8, s: 'sfx/ding', v: 0.22},
  {at: 184.2, s: 'sfx/pop', v: 0.25}, {at: 185.3, s: 'sfx/swish', v: 0.4}, {at: 185.5, s: 'sfx/whoosh', v: 0.3}, {at: 186.4, s: 'sfx/thud', v: 0.35},
  {at: 187.2, s: 'sfx/whoosh', v: 0.25}, {at: 188.8, s: 'sfx/thud', v: 0.25}, {at: 190.8, s: 'validation', v: 0.3},
  {at: 195.6, s: 'page', v: 0.45}, {at: 196.2, s: 'page', v: 0.35}, {at: 198.3, s: 'sfx/thud', v: 0.5}, {at: 198.32, s: 'deep-hit', v: 0.35}, {at: 200.3, s: 'stylo', v: 0.35}, ...[201.4, 201.75, 202.1].map((at) => ({at, s: 'sfx/pop', v: 0.25})), {at: 203.0, s: 'tampon', v: 0.5},
  {at: 204.6, s: 'sfx/whoosh', v: 0.25}, ...rep(206.0, 18, 0.255, 'page', 0.2), {at: 210.6, s: 'sfx/ding', v: 0.3}, {at: 211.0, s: 'sfx/rise', v: 0.25}, {at: 214.6, s: 'sfx/pop', v: 0.25}, {at: 217.2, s: 'soft-whoosh', v: 0.3, dur: 1.2}, {at: 218.0, s: 'validation', v: 0.3},
  {at: 220.6, s: 'alarme', v: 0.12, dur: 0.8}, {at: 220.6, s: 'sfx/pop', v: 0.3}, ...rep(221.8, 12, 0.16, 'sfx/click', 0.22), {at: 223.6, s: 'sfx/pop', v: 0.25},
  {at: 228.1, s: 'deep-hit', v: 0.45}, ...rep(228.3, 8, 0.12, 'sfx/thud', 0.3), {at: 229.0, s: 'sfx/swish', v: 0.2},
  {at: 231.0, s: 'soft-whoosh', v: 0.25, dur: 2}, ...[232.9, 233.5, 235.7].flatMap((at) => [{at, s: 'sfx/pop', v: 0.25}, {at: at + 0.3, s: 'sfx/ding', v: 0.22}]),
  {at: 238.8, s: 'sfx/pop', v: 0.25}, {at: 239.9, s: 'sfx/ding', v: 0.2}, {at: 243.8, s: 'sfx/swish', v: 0.3}, ...rep(243.9, 10, 0.15, 'tick', 0.16), ...[246.0, 250.2, 251.8].map((at) => ({at, s: 'sfx/whoosh', v: 0.28})), {at: 254.0, s: 'sfx/pop', v: 0.3},
  {at: 256.2, s: 'sfx/rise', v: 0.3}, {at: 257.5, s: 'sfx/thud', v: 0.6}, {at: 257.52, s: 'deep-hit', v: 0.5},
  {at: 261.0, s: 'soft-whoosh', v: 0.3, dur: 1.5}, {at: 263.5, s: 'sfx/swish', v: 0.35}, {at: 265.0, s: 'sfx/swish', v: 0.35}, {at: 265.2, s: 'sfx/pop', v: 0.25},
  {at: 267.8, s: 'sfx/whoosh', v: 0.3}, {at: 273.3, s: 'sfx/click', v: 0.3}, {at: 274.6, s: 'sfx/thud', v: 0.35}, {at: 277.1, s: 'tension', v: 0.15, dur: 1.6},
  {at: 279.7, s: 'sfx/whoosh', v: 0.35}, {at: 280.0, s: 'sfx/rise', v: 0.25}, ...[282.3, 284.0, 289.3].map((at) => ({at, s: 'sfx/pop', v: 0.25})), {at: 287.8, s: 'riser', v: 0.25, dur: 1.4},
  {at: 292.6, s: 'sfx/whoosh', v: 0.4}, ...rep(292.8, 22, 0.2, 'tick', 0.14), {at: 297.3, s: 'sfx/thud', v: 0.45}, {at: 297.4, s: 'sfx/ding', v: 0.3}, {at: 298.2, s: 'sfx/pop', v: 0.25}, {at: 299.3, s: 'sfx/pop', v: 0.25},
  {at: 303.2, s: 'sfx/pop', v: 0.2}, {at: 303.8, s: 'sfx/click', v: 0.3}, {at: 304.6, s: 'sfx/whoosh', v: 0.25}, {at: 306.6, s: 'sfx/ding', v: 0.3}, {at: 306.8, s: 'soft-whoosh', v: 0.35, dur: 1.5}, {at: 307.6, s: 'validation', v: 0.35}, {at: 308.5, s: 'sfx/pop', v: 0.2},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const ImplIso: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.0} to={48.0}><Intro /></Gate>
    <Gate from={50.1} to={62.7}><P1 /></Gate>
    <Gate from={64.8} to={134.2}><P2 /></Gate>
    <Gate from={136.4} to={193.2}><P3 /></Gate>
    <Gate from={195.4} to={258.7}><P4 /></Gate>
    <Gate from={260.8} to={OUTRO_AT}><P5 /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><Blueprint p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.3} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-implementation-iso-origine.m4a')} trimAfter={s(311.5)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

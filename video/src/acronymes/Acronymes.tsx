import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s, sansFont} from '../theme';
import {Abs, Bg, BLUE, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, LOGO, PAPER, PH, pop, prog, RED, Row, spring, T, useT} from '../implIso/kit';
import {captions} from './captions';

/**
 * « Le vocabulaire indispensable des professionnels HSE » (1 min 24) — voix d'origine, sous-titres recalés mot à mot,
 * photos réelles, thème « papier quadrillé » de la série, finition « haut de gamme ».
 * Fil rouge inédit : des tuiles de lettres en bois façon jeu de lettres — chaque acronyme se compose avec une entrée
 * différente (chute avec rebond, glissé, bascule 3D, toupie, pluie de tuiles), et chaque tuile gagnée rejoint le
 * chevalet de l'en-tête qui compte jusqu'à 20/20 ; récapitulatif final en mosaïque des 20 acronymes.
 * Langage visuel premium : photo réelle en profondeur 3D derrière chaque acronyme (inclinaison, parallaxe, balayage de
 * lumière), définition écrite lettre par lettre avec flou de mise au point, initiales surlignées qui « expliquent »
 * l'acronyme, pastille de famille (risques, urgence, secours, réglementation, chimie, déchets), tornade de tuiles en
 * ouverture.
 */
const ORANGE = '#F28C1E';
const VIO = '#7B5CD6';
const TEAL = '#14A3A3';
const WOOD = '#F3D9A4';
const OUTRO_AT = 83.4;
export const ACRONYMES_FRAMES = s(OUTRO_AT + 3.8);
const FAM: Record<string, {l: string; c: string}> = {
  R: {l: 'Risques & explosion', c: RED}, U: {l: 'Plans d’urgence', c: BLUE}, S: {l: 'Secours & lieux', c: ORANGE},
  G: {l: 'Réglementation', c: VIO}, C: {l: 'Produits chimiques', c: TEAL}, D: {l: 'Déchets', c: GREEN}, O: {l: 'Opérations', c: INK},
};
type A = {k: string; d: string; at: number; ph: string; f: string; pos?: string};
const AC: A[] = [
  {k: 'ATEX', d: 'Atmosphère explosible', at: 11.6, ph: 'smi/raffinerie.jpg', f: 'R'},
  {k: 'ALARP', d: 'As Low As Reasonably Practicable', at: 14.7, ph: 'arsenal/risk.jpg', f: 'R'},
  {k: 'PPI', d: 'Plan particulier d’intervention', at: 18.1, ph: 'promo/raffinerie.jpg', f: 'U'},
  {k: 'POI', d: 'Plan d’opération interne', at: 21.2, ph: 'promo/formation-incendie.jpg', f: 'U'},
  {k: 'ORSEC', d: 'Organisation de la réponse de sécurité civile', at: 23.9, ph: 'promo/mine-terrain.jpg', f: 'U'},
  {k: 'PCS', d: 'Plan communal de sauvegarde', at: 28.0, ph: 'verites/plans.jpg', f: 'U'},
  {k: 'PCE', d: 'Plan de continuité d’exploitation', at: 31.1, ph: 'promo/hse-machine.jpg', f: 'U'},
  {k: 'DAE', d: 'Défibrillateur automatisé externe', at: 34.3, ph: 'incident/blessure-soins.jpg', f: 'S'},
  {k: 'RIA', d: 'Robinet d’incendie armé', at: 38.0, ph: 'epiepc/extincteur.jpg', f: 'S'},
  {k: 'ERP', d: 'Établissement recevant du public', at: 40.8, ph: 'induction/accueil-groupe.jpg', f: 'S'},
  {k: 'ICPE', d: 'Installation classée pour la protection de l’environnement', at: 44.0, ph: 'smi/fumees.jpg', f: 'G'},
  {k: 'LIE', d: 'Limite inférieure d’explosivité', at: 48.3, ph: 'confines/detecteur.jpg', f: 'R'},
  {k: 'LEL', d: 'Lower Explosive Limit', at: 51.8, ph: 'confines/regard.jpg', f: 'R'},
  {k: 'UEL', d: 'Upper Explosive Limit', at: 55.0, ph: 'soudage/soudeur-etincelles.jpg', f: 'R'},
  {k: 'REACH', d: 'Registration, Evaluation, Authorisation and restriction of CHemicals', at: 58.1, ph: 'iso26/labo-manuel.jpg', f: 'C'},
  {k: 'CLP', d: 'Classification, Labelling and Packaging', at: 63.8, ph: 'iso26/audit-checklist.jpg', f: 'C'},
  {k: 'DIS', d: 'Déchets industriels spéciaux', at: 68.0, ph: 'ident/flaque.jpg', f: 'D'},
  {k: 'DIB', d: 'Déchets industriels banals', at: 71.2, ph: 'septm/entrepot.jpg', f: 'D'},
  {k: 'DEEE', d: 'Déchets d’équipements électriques et électroniques', at: 74.2, ph: 'ident/electrique.jpg', f: 'D'},
  {k: 'SIMOPS', d: 'SIMultaneous OPerationS', at: 78.3, ph: 'tirant/echafaudage.jpg', f: 'O'},
];
const endOf = (i: number) => (i < AC.length - 1 ? AC[i + 1].at : 80.7);

/* ─────────── Briques ─────────── */
const Tile: React.FC<{ch: string; size: number; c?: string; glow?: number}> = ({ch, size, c = INK, glow = 0}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.14, background: `linear-gradient(160deg, #FBEBC6, ${WOOD} 55%, #E2BE7C)`, boxShadow: `0 ${size * 0.08}px 0 #B98A4A, 0 ${size * 0.16}px ${size * 0.25}px rgba(20,33,61,0.3)${glow ? `, 0 0 ${size * 0.5 * glow}px ${c}` : ''}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.62, color: c, position: 'relative'}}>
    {ch}
    <div style={{position: 'absolute', inset: size * 0.05, borderRadius: size * 0.11, border: '1px solid rgba(255,255,255,0.5)'}} />
  </div>
);
/** Les 5 façons d'entrer en scène pour une tuile. */
const tileMotion = (variant: number, i: number, n: number, p: number) => {
  const q = 1 - p;
  switch (variant) {
    case 0: return {transform: `translateY(${-q * 900}px) rotate(${q * (i % 2 ? 25 : -25)}deg)`, opacity: 1};
    case 1: return {transform: `translateX(${q * 1100}px) rotate(${q * 40}deg)`, opacity: 1};
    case 2: return {transform: `perspective(800px) rotateX(${q * 95}deg)`, opacity: p};
    case 3: return {transform: `rotate(${q * 540}deg) scale(${p})`, opacity: 1};
    default: return {transform: `translate(${q * (random(`rx${i}${n}`) - 0.5) * 1400}px, ${q * (random(`ry${i}${n}`) - 0.5) * 1800}px) rotate(${q * 300}deg)`, opacity: 1};
  }
};
const Word: React.FC<{text: string; at: number; size: number; variant: number; c: string}> = ({text, at, size, variant, c}) => {
  const t = useT();
  const L = text.split('');
  return (
    <div style={{display: 'flex', gap: size * 0.1, justifyContent: 'center'}}>
      {L.map((ch, i) => {
        const st = at + i * 0.07;
        const p = variant === 0 ? Math.min(1, spring(t, st, 7, 12)) : prog(t, st, st + 0.45, easeOut);
        const land = Math.max(0, 1 - Math.abs(t - st - 0.4) * 4);
        return <div key={i} style={tileMotion(variant, i, L.length, Math.max(0, p))}><Tile ch={ch} size={size} c={c} glow={land} /></div>;
      })}
    </div>
  );
};
const norm = (w: string) => w.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/^[^A-Za-z]+/, '').replace(/^(d|l)’/i, '').toUpperCase();
const STOP = new Set(['pour', 'la', 'de', 'des', 'du', 'le', 'et', 'and', 'of']);
/** Définition écrite mot à mot avec flou ; les initiales qui forment l'acronyme sont surlignées. */
const Def: React.FC<{a: A; at: number; c: string}> = ({a, at, c}) => {
  const t = useT();
  const words = a.d.split(' ');
  let k = 0;
  const key = a.k.replace(/E{3}$/, 'EEE');
  return (
    <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: a.d.length > 40 ? 46 : 56, color: INK, lineHeight: 1.25, textAlign: 'center'}}>
      {words.map((w, i) => {
        const p = prog(t, at + i * 0.12, at + i * 0.12 + 0.4, easeOut);
        const n = norm(w);
        let hi = -1;
        if (a.k === 'SIMOPS') hi = -2;
        else if (k < key.length && n[0] === key[k] && !STOP.has(w.toLowerCase())) { hi = k; k++; }
        const body = hi === -2
          ? <span>{w.split('').map((ch, j) => <span key={j} style={{color: ch === ch.toUpperCase() && /[A-Z]/.test(ch) ? c : INK}}>{ch}</span>)}</span>
          : hi >= 0 ? <span><span style={{color: '#fff', background: c, borderRadius: 10, padding: '0 8px', marginRight: 2}}>{w[0] === 'É' ? 'É' : w[0]}</span>{w.slice(1)}</span>
          : <span>{w}</span>;
        return <span key={i} style={{display: 'inline-block', marginRight: 16, opacity: p, transform: `translateY(${(1 - p) * 30}px)`, filter: `blur(${(1 - p) * 8}px)`}}>{body}</span>;
      })}
    </div>
  );
};
const Deep: React.FC<{src: string; at: number; pos?: string}> = ({src, at, pos = 'center'}) => {
  const t = useT();
  const k = t - at;
  const inn = prog(t, at - 0.2, at + 0.5, easeOut);
  const sweep = ((k * 0.5) % 1.6) - 0.3;
  return (
    <Abs x={60} y={330} w={960} h={640} style={{perspective: 2200, opacity: inn}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 32, overflow: 'hidden', border: '8px solid #fff', boxShadow: '0 40px 80px rgba(20,33,61,0.35)', transform: `rotateY(${Math.sin(k * 0.8) * 4}deg) rotateX(${2 + Math.cos(k * 0.6) * 2}deg) scale(${0.94 + inn * 0.06})`}}>
        <Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${1.15 + k * 0.02}) translateX(${Math.sin(k * 0.5) * 16}px)`}} />
        <div style={{position: 'absolute', inset: 0, background: `linear-gradient(105deg, transparent ${sweep * 100 - 12}%, rgba(255,255,255,0.35) ${sweep * 100}%, transparent ${sweep * 100 + 12}%)`}} />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(20,33,61,0.55))'}} />
      </div>
    </Abs>
  );
};

/* ─────────── Fil rouge : le chevalet ─────────── */
const Rack: React.FC<{w: number; n: number; full?: boolean}> = ({w, n, full = false}) => {
  const sz = w / 23;
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: sz * 0.6}}>
      <div style={{position: 'relative', padding: `${sz * 0.25}px ${sz * 0.3}px ${sz * 0.45}px`, background: 'linear-gradient(180deg, #C99A5B, #8A5A2B)', borderRadius: sz * 0.3, display: 'flex', gap: sz * 0.12}}>
        {AC.map((a, i) => <div key={i} style={{width: sz, height: sz, borderRadius: sz * 0.15, background: i < n ? WOOD : 'rgba(255,255,255,0.15)', boxShadow: i < n ? '0 2px 0 #B98A4A' : 'none', fontFamily: sansFont, fontWeight: 900, fontSize: sz * 0.62, color: FAM[a.f].c, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${i < n ? 1 : 0.85})`}}>{full || i < n ? a.k[0] : ''}</div>)}
      </div>
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: sz * 1.4, color: INK}}>{Math.min(20, Math.floor(n))}/20</div>
    </div>
  );
};
const countAt = (t: number) => AC.filter((a) => t >= a.at + 0.3).length;

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('promo/terrain-controle.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 900, objectFit: 'cover', objectPosition: '55% 30%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 30%, ${PAPER}DD 43%, ${PAPER} 49%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={50} y={780} w={980} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>20 ACRONYMES À CONNAÎTRE</div>
        <T size={100} style={{marginTop: 18, textTransform: 'uppercase', letterSpacing: -3}}>Le vocabulaire</T>
        <T size={90} style={{textTransform: 'uppercase', letterSpacing: -3}}><span style={{background: '#F5B700', padding: '0 20px', borderRadius: 18}}>indispensable</span></T>
        <T size={64} color={DIM} style={{marginTop: 8, textTransform: 'uppercase', letterSpacing: -1}}>des professionnels <span style={{color: GREEN}}>HSE</span></T>
      </Abs>
      <Abs x={0} y={1290} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}>{'ATEX'.split('').map((c, i) => <div key={i} style={{transform: `rotate(${(i - 1.5) * 5}deg)`}}><Tile ch={c} size={140} c={RED} /></div>)}</Abs>
      <Abs x={0} y={1480} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 10}}>{'ICPE'.split('').map((c, i) => <div key={i} style={{transform: `rotate(${(i - 1.5) * -4}deg)`}}><Tile ch={c} size={100} c={VIO} /></div>)}</Abs>
    </AbsoluteFill>
  );
};

/* ─────────── En-tête ─────────── */
const Header: React.FC = () => {
  const t = useT();
  const show = t > 2.6 && t < OUTRO_AT;
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 80, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {show && <div style={{position: 'absolute', left: 0, right: 0, top: 214, display: 'flex', justifyContent: 'center', opacity: pop(t, 2.6)}}><Rack w={760} n={countAt(t)} /></div>}
    </AbsoluteFill>
  );
};

/* ─────────── INTRO ─────────── */
const Tornado: React.FC = () => {
  const t = useT();
  const L = 'ATEXALARPPPIPOIORSECPCSPCEDAERIAERPICPELIEREACHCLPDISDIB'.split('');
  const form = prog(t, 4.6, 6.2, easeInOut);
  const target = 'ACRONYMES'.split('');
  return (
    <AbsoluteFill>
      {L.map((ch, i) => {
        const a = t * 1.6 + i * 0.45;
        const r = 160 + (i % 7) * 50;
        const x = 540 + Math.cos(a) * r * (1 - form) - 50;
        const y = 1000 + Math.sin(a) * r * 0.55 * (1 - form) - (i % 9) * 40 * (1 - form) - 50;
        return <div key={i} style={{position: 'absolute', left: x, top: y, transform: `rotate(${a * 40}deg) scale(${(0.6 + (i % 3) * 0.15) * (1 - form)})`, opacity: 1 - form}}><Tile ch={ch} size={100} c={[RED, BLUE, ORANGE, VIO, TEAL, GREEN][i % 6]} /></div>;
      })}
      <Abs x={0} y={860} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 8, opacity: form}}>
        {target.map((ch, i) => <div key={i} style={{transform: `translateY(${(1 - prog(t, 5.6 + i * 0.05, 6.1 + i * 0.05, easeOut)) * -300}px)`}}><Tile ch={ch} size={104} c={INK} /></div>)}
      </Abs>
      <Row y={420}><T size={54} style={{opacity: pop(t, 3.0)}}>Le langage des pros HSE</T></Row>
      {t > 5.8 && <Row y={1110}><T size={46} color={DIM} style={{opacity: pop(t, 5.8)}}>pour mieux gérer les risques</T></Row>}
    </AbsoluteFill>
  );
};
const Twenty: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Abs x={0} y={500} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 30}}>
        {['2', '0'].map((c, i) => <div key={c} style={{transform: `perspective(900px) rotateY(${(1 - prog(t, 8.2 + i * 0.2, 8.9 + i * 0.2, easeOut)) * 180}deg)`}}><Tile ch={c} size={330} c={RED} /></div>)}
      </Abs>
      <Row y={940}><T size={66} style={{opacity: pop(t, 8.9)}}>acronymes à connaître</T></Row>
      <Abs x={0} y={1100} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', padding: '0 80px', boxSizing: 'border-box'}}>
        {Object.values(FAM).map((f, i) => <div key={f.l} style={{opacity: pop(t, 9.4 + i * 0.12), padding: '8px 18px', borderRadius: 30, background: f.c, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 26}}>{f.l}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Scène d'un acronyme ─────────── */
const Card: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const a = AC[i];
  const f = FAM[a.f];
  const sz = Math.min(170, Math.floor(880 / a.k.length) - 18);
  const out = prog(t, endOf(i) - 0.35, endOf(i), easeIn);
  return (
    <AbsoluteFill style={{opacity: 1 - out, transform: `scale(${1 + out * 0.04})`}}>
      <Deep src={a.ph} at={a.at} pos={a.pos} />
      <Abs x={90} y={360} style={{opacity: pop(t, a.at + 0.1)}}><div style={{padding: '8px 20px', borderRadius: 30, background: f.c, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 28}}>{f.l}</div></Abs>
      <Abs x={790} y={360} w={200} style={{textAlign: 'right', opacity: pop(t, a.at + 0.1)}}><div style={{display: 'inline-block', padding: '8px 18px', borderRadius: 30, background: '#ffffffE6', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>n° {String(i + 1).padStart(2, '0')}</div></Abs>
      <Abs x={0} y={900 - sz / 2} w={1080}><Word text={a.k} at={a.at} size={sz} variant={i % 5} c={f.c} /></Abs>
      <Abs x={70} y={1120} w={940}><Def a={a} at={a.at + 0.55} c={f.c} /></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Récapitulatif ─────────── */
const Recap: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Row y={330}><T size={56} style={{opacity: pop(t, 80.8)}}>Les 20 à retenir</T></Row>
      <Abs x={60} y={440} w={960} style={{display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center'}}>
        {AC.map((a, i) => (
          <div key={i} style={{width: 220, height: 120, borderRadius: 18, background: `linear-gradient(160deg, #FBEBC6, ${WOOD})`, boxShadow: '0 6px 0 #B98A4A, 0 12px 20px rgba(20,33,61,0.2)', borderTop: `8px solid ${FAM[a.f].c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: a.k.length > 5 ? 36 : 46, color: FAM[a.f].c, transform: `scale(${spring(t, 80.8 + i * 0.05, 7, 12)}) rotate(${(random(`g${i}`) - 0.5) * 6}deg)`}}>{a.k}</div>
        ))}
      </Abs>
    </AbsoluteFill>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2}, {at: 2.8, s: 'soft-whoosh', v: 0.35, dur: 2}, ...rep(3.0, 12, 0.13, 'sfx/click', 0.12),
  ...rep(5.6, 9, 0.05, 'sfx/thud', 0.2), {at: 6.2, s: 'sfx/ding', v: 0.25},
  {at: 8.2, s: 'sfx/swish', v: 0.35}, {at: 8.4, s: 'sfx/swish', v: 0.35}, {at: 8.9, s: 'bass-hit', v: 0.4}, ...rep(9.4, 7, 0.12, 'sfx/pop', 0.15),
  ...AC.flatMap((a, i) => [
    {at: a.at - 0.15, s: i % 5 === 1 ? 'sfx/whoosh' : 'sfx/swish', v: 0.3},
    ...rep(a.at + 0.35, a.k.length, 0.07, 'sfx/click', 0.32),
    {at: a.at + 0.55, s: 'soft-whoosh', v: 0.18, dur: 0.8},
    {at: a.at + 0.3, s: 'sfx/ding', v: 0.14},
  ]),
  {at: 80.8, s: 'sfx/rise', v: 0.3}, ...rep(80.8, 20, 0.05, 'sfx/click', 0.14), {at: 82.0, s: 'validation', v: 0.4},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Acronymes: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.4} to={7.6}><Tornado /></Gate>
    <Gate from={7.5} to={11.6}><Twenty /></Gate>
    {AC.map((a, i) => <Gate key={a.k} from={a.at - 0.25} to={endOf(i) + 0.02}><Card i={i} /></Gate>)}
    <Gate from={80.6} to={OUTRO_AT}><Recap /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={80.9}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-acronymes-hse-origine.m4a')} trimAfter={s(81.0)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [easeInOut, lerp];

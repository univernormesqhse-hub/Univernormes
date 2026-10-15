import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {Blinds, Board, Card, Center, Cite, Deep, Dust, Flap, Kin, Out, Pill, Stamp, Tile, Word} from '../durab/Durab';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s, sansFont} from '../theme';
import {Abs, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, LOGO, PAPER, PH, pop, prog, RED, spring, T, useT} from '../implIso/kit';
import {captions} from './captions';

/**
 * « AIPR vs ATEX : la différence qui sauve des vies » (5 min 41) — capsule « hors norme » : voix d'origine, sous-titres
 * recalés mot à mot, photos réelles, thème « papier quadrillé ».
 * Fil rouge inédit : LA COUPE DE TERRAIN. Derrière toutes les scènes, une coupe géologique vivante : l'air au-dessus
 * (nuées de gaz orange, monde ATEX) et le sous-sol en dessous (réseaux enterrés aux couleurs réglementaires : gaz jaune,
 * électricité rouge, eau bleue, télécom vert — monde AIPR). La ligne d'horizon monte ou descend selon le sujet :
 * on « plonge » sous terre pour l'AIPR, on « s'élève » dans l'air pour l'ATEX. L'en-tête porte une jauge
 * AIR ▲ / SOUS-SOL ▼ qui suit ce mouvement, et les 6 parties.
 * Reprend le meilleur de la série : tuiles en bois (AIPR / ATEX qui se mélangent puis se séparent), palettes d'affichage
 * (1999 · 2013 · 2014 · 2018 · 7 H · 5 ANS), ligne de métro (feuille de route), passage du témoin (transitions de partie
 * ET chaîne de responsabilités concepteur → encadrant → opérateur), store vénitien, photos en profondeur 3D, passeport
 * (certificat AIPR), anneaux concentriques (zones 0 / 1 / 2), écran partagé, carrefour, tampons, poussière, cinétique.
 */
const AI = '#1F6FD1';
const AX = '#F07A12';
const GOLD = '#F5B700';
const SOIL = '#E9D9C2';
const AIR = '#FFF1E0';
const NET = {gaz: '#F2C200', elec: '#E53935', eau: '#1E88E5', tel: '#43A047'};
const OUTRO_AT = 337.5;
export const AIPRATEX_FRAMES = s(OUTRO_AT + 3.8);

const PARTS = [
  {at: 60.2, n: '01', title: 'Les zones à risque', c: INK},
  {at: 92.2, n: '02', title: 'Origine & réglementation', c: '#5B4FCF'},
  {at: 123.1, n: '03', title: 'Le champ d’application', c: AI},
  {at: 216.5, n: '04', title: 'Les objectifs de formation', c: AX},
  {at: 263.5, n: '05', title: 'Les modalités', c: '#0F9D8F'},
  {at: 291.6, n: '06', title: 'Conclusion', c: RED},
];
/* mode de la coupe : 'N' neutre, 'P' sous-sol (AIPR), 'X' air (ATEX) */
const MODES: [number, 'N' | 'P' | 'X'][] = [
  [0, 'N'], [65.0, 'P'], [78.0, 'X'], [92.0, 'N'], [96.8, 'X'], [111.0, 'P'], [123.0, 'N'], [128.2, 'P'], [170.5, 'X'], [216.4, 'N'], [221.6, 'P'],
  [242.3, 'X'], [263.4, 'N'], [268.3, 'P'], [277.9, 'X'], [291.5, 'N'], [295.5, 'P'], [308.5, 'X'], [314.7, 'N'],
];
const HZ = {N: 1180, P: 600, X: 1560};
const horizon = (t: number) => {
  let i = 0;
  while (i < MODES.length - 1 && t >= MODES[i + 1][0]) i++;
  const prev = i > 0 ? HZ[MODES[i - 1][1]] : HZ.N;
  const k = easeInOut(Math.min(1, Math.max(0, (t - MODES[i][0]) / 1.2)));
  return lerp(prev, HZ[MODES[i][1]], k);
};
const partIdx = (t: number) => PARTS.reduce((k, p, i) => (t >= p.at ? i : k), -1);

/* ═════════════ Fil rouge : la coupe de terrain ═════════════ */
const Coupe: React.FC = () => {
  const t = useT();
  const h = horizon(t);
  const pipes = [{c: NET.tel, d: 90, w: 10, dash: false}, {c: NET.elec, d: 170, w: 16, dash: false}, {c: NET.gaz, d: 270, w: 26, dash: false}, {c: NET.eau, d: 390, w: 30, dash: false}];
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {/* air */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: h, background: `linear-gradient(180deg, ${PAPER}, ${AIR})`}} />
      {Array.from({length: 16}, (_, k) => {
        const x = ((random(`gx${k}`) * 1300 + t * (12 + random(`gs${k}`) * 20)) % 1300) - 110;
        const y = h - 80 - random(`gy${k}`) * Math.max(0, h - 300);
        const r = 60 + random(`gr${k}`) * 120;
        return y > 260 ? <div key={k} style={{position: 'absolute', left: x, top: y - r / 2, width: r * 1.6, height: r, borderRadius: '50%', background: `radial-gradient(ellipse, ${AX}2A, transparent 70%)`, filter: 'blur(6px)'}} /> : null;
      })}
      {/* sol */}
      <div style={{position: 'absolute', left: 0, right: 0, top: h, bottom: 0, background: `linear-gradient(180deg, #CDB89A 0, ${SOIL} 40px, #E2CFB4 100%)`, opacity: 0.85}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: h - 14, height: 24, background: 'repeating-linear-gradient(90deg, #8FBF6A 0 18px, #7DB35A 18px 30px)', borderRadius: 6, opacity: 0.9}} />
      {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{position: 'absolute', left: 0, right: 0, top: h + 60 + k * 140, height: 2, background: 'rgba(120,90,60,0.18)'}} />)}
      {pipes.map((p, k) => (
        <div key={k} style={{position: 'absolute', left: -20, right: -20, top: h + p.d, height: p.w, borderRadius: p.w / 2, background: p.c, opacity: 0.75, boxShadow: `0 2px 0 rgba(0,0,0,0.12)`}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: -24, height: 8, background: `repeating-linear-gradient(90deg, ${p.c} 0 14px, transparent 14px 22px)`, opacity: 0.6}} />
        </div>
      ))}
      {Array.from({length: 8}, (_, k) => {
        const x = ((k * 160 + t * 60) % 1240) - 80;
        return <div key={k} style={{position: 'absolute', left: x, top: h + 390 + 8, width: 26, height: 14, borderRadius: 7, background: '#ffffff88'}} />;
      })}
    </AbsoluteFill>
  );
};
const Header: React.FC = () => {
  const t = useT();
  const h = horizon(t);
  const m = (h - HZ.P) / (HZ.X - HZ.P);
  const pi = partIdx(t);
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 58, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div>
      {t > 2.6 && t < OUTRO_AT && (
        <div style={{position: 'absolute', left: 36, right: 36, top: 186, height: 86, borderRadius: 24, background: '#ffffffEC', boxShadow: '0 8px 20px rgba(20,33,61,0.1)', padding: '10px 22px', boxSizing: 'border-box', opacity: pop(t, 2.6)}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 18, color: AI, width: 170}}>▼ SOUS-SOL · AIPR</div>
            <div style={{flex: 1, height: 16, borderRadius: 8, position: 'relative', background: `linear-gradient(90deg, ${AI}, #C9B08A 50%, ${AX})`}}>
              <div style={{position: 'absolute', left: `calc(${m * 100}% - 15px)`, top: -7, width: 30, height: 30, borderRadius: 15, background: '#fff', border: `6px solid ${m < 0.4 ? AI : m > 0.6 ? AX : INK}`, boxSizing: 'border-box'}} />
            </div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 18, color: AX, width: 150, textAlign: 'right'}}>AIR · ATEX ▲</div>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', gap: 8, marginTop: 10}}>
            {PARTS.map((p, i) => <div key={i} style={{width: i === pi ? 60 : 26, height: 12, borderRadius: 6, background: i <= pi ? p.c : '#DDE3EC'}} />)}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
/** Passage du témoin : volet diagonal + numéro de partie en palettes + titre. */
const Baton: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const p = PARTS[i];
  const k = t - p.at;
  const inn = prog(t, p.at, p.at + 0.6, easeInOut);
  const out = prog(t, p.at + 3.0, p.at + 3.6, easeInOut);
  if (k < 0 || out >= 1) return null;
  const lead = out > 0 ? out : inn;
  const X = -500 + lead * 2100;
  const poly = out > 0 ? `polygon(${X}px 0, 2200px 0, 2200px 1920px, ${X - 400}px 1920px)` : `polygon(-600px 0, ${X}px 0, ${X - 400}px 1920px, -600px 1920px)`;
  return (
    <AbsoluteFill style={{zIndex: 35}}>
      <AbsoluteFill style={{background: p.c, clipPath: poly}}>
        <Abs x={0} y={560} w={1080}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 40, letterSpacing: 8, color: '#ffffffCC', textAlign: 'center', opacity: pop(t, p.at + 0.4)}}>PARTIE</div></Abs>
        <Abs x={0} y={640} w={1080}><Board text={p.n} at={p.at + 0.45} h={240} gap={14} c={p.c} n={10} /></Abs>
        <Abs x={70} y={930} w={940} style={{textAlign: 'center'}}><Kin text={p.title} at={p.at + 1.1} size={72} color="#fff" /></Abs>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 26, background: 'repeating-linear-gradient(90deg, #ffffff40 0 60px, transparent 60px 120px)'}} />
      </AbsoluteFill>
      <div style={{position: 'absolute', left: X - 200 - 130, top: 960 - 34, width: 260, height: 68, borderRadius: 34, background: `linear-gradient(180deg, #fff, ${GOLD} 40%, #C98F00)`, boxShadow: '0 16px 30px rgba(0,0,0,0.3)', transform: `rotate(${-68 + Math.sin(k * 8) * 4}deg)`}} />
    </AbsoluteFill>
  );
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 900, overflow: 'hidden', clipPath: 'polygon(0 0, 62% 0, 38% 100%, 0 100%)'}}><Img src={PH('epi/chantier.jpg')} style={{width: 1080, height: 900, objectFit: 'cover', objectPosition: '30% 50%'}} /></div>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 900, overflow: 'hidden', clipPath: 'polygon(62% 0, 100% 0, 100% 100%, 38% 100%)'}}><Img src={PH('smi/raffinerie.jpg')} style={{width: 1080, height: 900, objectFit: 'cover', objectPosition: '70% 40%'}} /></div>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 900, background: `linear-gradient(115deg, transparent 49.4%, #fff 49.5%, #fff 50.5%, transparent 50.6%)`}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 34%, ${PAPER}DD 43%, ${PAPER} 47%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={760} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 26}}>
        <div style={{display: 'flex', gap: 8}}>{'AIPR'.split('').map((c, i) => <Tile key={i} ch={c} size={96} c={AI} />)}</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: INK}}>vs</div>
        <div style={{display: 'flex', gap: 8}}>{'ATEX'.split('').map((c, i) => <Tile key={i} ch={c} size={96} c={AX} />)}</div>
      </Abs>
      <Abs x={50} y={960} w={980} style={{textAlign: 'center'}}>
        <T size={84} style={{textTransform: 'uppercase', letterSpacing: -2}}>Deux formations,</T>
        <T size={84} style={{textTransform: 'uppercase', letterSpacing: -2}}><span style={{background: GOLD, padding: '0 18px', borderRadius: 16}}>deux mondes</span></T>
        <T size={44} color={DIM} style={{marginTop: 16}}>Sous nos pieds… ou dans l’air qu’on respire</T>
      </Abs>
      <Abs x={0} y={1330} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 26}}>
        {[NET.gaz, NET.elec, NET.eau, NET.tel].map((c, k) => <div key={k} style={{width: 150, height: 22, borderRadius: 11, background: c}} />)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO ═════════════ */
const Confusion: React.FC = () => {
  const t = useT();
  const mix = prog(t, 16.3, 17.5, easeInOut) * (1 - prog(t, 20.4, 21.4, easeInOut));
  const L = [...'AIPR'.split('').map((c, i) => ({c, k: i, col: AI, side: 0})), ...'ATEX'.split('').map((c, i) => ({c, k: i, col: AX, side: 1}))];
  return (
    <Out end={21.9}>
      <Center y={330}><Kin text="La sécurité au travail" at={7.7} size={60} /></Center>
      <Abs x={0} y={430} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16}}>
        {[{l: 'construction', ic: 'grue', a: 5.3}, {l: 'industrie', ic: 'usine', a: 6.3}, {l: 'énergie', ic: 'eclair', a: 6.9}].map((x, k) => (
          <div key={k} style={{display: 'flex', alignItems: 'center', gap: 10, padding: '10px 22px', borderRadius: 40, background: '#fff', boxShadow: '0 10px 24px rgba(20,33,61,0.12)', transform: `scale(${Math.min(1, spring(t, x.a, 8, 14))})`}}><F n={x.ic} size={56} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>{x.l}</span></div>
        ))}
      </Abs>
      <Abs x={0} y={600} w={1080} h={500}>
        {L.map((l, i) => {
          const hx = (l.side ? 600 : 80) + l.k * 104;
          const mx = 160 + ((i * 3) % 8) * 100 + Math.sin(t * 3 + i) * 20;
          const my = 120 + Math.cos(t * 2.5 + i * 1.7) * 90;
          const at = l.side ? 15.6 : 15.0;
          return (
            <div key={i} style={{position: 'absolute', left: lerp(hx, mx, mix), top: lerp(120, my, mix), transform: `rotate(${mix * Math.sin(t * 2 + i) * 40}deg) translateY(${(1 - Math.min(1, spring(t, at + l.k * 0.07, 7, 12))) * -700}px)`, opacity: t > at + l.k * 0.07 ? 1 : 0}}>
              <Tile ch={l.c} size={96} c={l.col} />
            </div>
          );
        })}
        <div style={{position: 'absolute', left: 0, right: 0, top: 270, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: RED, opacity: mix}}>confusion…</div>
      </Abs>
      <Abs x={0} y={1080} w={1080} style={{display: 'flex', justifyContent: 'space-around', opacity: pop(t, 20.6)}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: AI}}>sous terre ▼</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: AX}}>dans l’air ▲</div>
      </Abs>
      <Stamp at={20.5} c={GREEN} text="au clair" x={380} y={1200} rot={-6} size={54} />
    </Out>
  );
};
const CasseTete: React.FC = () => {
  const t = useT();
  const split = prog(t, 38.2, 39.4, easeInOut);
  const shake = t > 42.0 && t < 43.2 ? Math.sin(t * 70) * 8 : 0;
  return (
    <Out end={46.0}>
      <Center y={320}><Kin text="Un vrai casse-tête" at={22.8} size={62} /></Center>
      <Abs x={0} y={420} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 20}}>
        {[{ph: 'epi/chantier.jpg', l: 'terrain', a: 25.8}, {ph: 'induction/ingenieur-chantier.jpg', l: 'responsables sécurité', a: 27.5}, {ph: 'promo/formation-incendie.jpg', l: 'formateurs', a: 29.0}].map((x, k) => (
          <Blinds key={k} src={x.ph} x={0} y={0} w={300} h={330} at={x.a} n={7}>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 10, background: 'linear-gradient(0deg, rgba(20,33,61,0.85), transparent)', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: '#fff', textAlign: 'center'}}>{x.l}</div>
          </Blinds>
        )).map((el, k) => <div key={k} style={{position: 'relative', width: 300, height: 330}}>{el}</div>)}
      </Abs>
      <Abs x={0} y={800} w={1080} h={420} style={{transform: `translateX(${shake}px)`}}>
        {[0, 1].map((k) => (
          <div key={k} style={{position: 'absolute', left: 540 - 190 + (k ? 1 : -1) * lerp(110, 260, split), top: 20, width: 380, height: 380, borderRadius: 190, background: `${k ? AX : AI}30`, border: `6px solid ${k ? AX : AI}`, opacity: pop(t, 33.1 + k * 0.3), display: 'flex', alignItems: 'center', justifyContent: 'center', mixBlendMode: 'multiply'}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: k ? AX : AI, transform: `translateX(${(k ? 1 : -1) * 70}px)`}}>{k ? 'ATEX' : 'AIPR'}</div>
          </div>
        ))}
        <div style={{position: 'absolute', left: 0, right: 0, top: 180, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, opacity: pop(t, 34.5) * (1 - split)}}>risques ·<br />zones</div>
        {split > 0.5 && <div style={{position: 'absolute', left: 530, top: 0, width: 20, height: 420, background: `repeating-linear-gradient(180deg, ${RED} 0 30px, transparent 30px 44px)`, opacity: split}} />}
      </Abs>
      <Stamp at={38.4} c={RED} text="rien à voir" x={360} y={760} rot={-6} size={52} />
      <Abs x={0} y={1250} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={42.0} c={RED} size={34}>conséquences désastreuses</Pill></Abs>
    </Out>
  );
};
const Route: React.FC = () => {
  const t = useT();
  const items = [{l: 'Les zones à risque', a: 50.3}, {l: 'La réglementation', a: 52.3}, {l: 'Qui est concerné', a: 54.2}, {l: 'Les objectifs', a: 55.7}, {l: 'Les formats de formation', a: 57.4}, {l: 'Le bon choix', a: 59.2}];
  const fill = items.filter((x) => t >= x.a).length;
  return (
    <Out end={60.2}>
      <Center y={320}><Kin text="La feuille de route" at={47.6} size={62} /></Center>
      <Abs x={150} y={440} w={100} h={900}>
        <div style={{position: 'absolute', left: 38, top: 20, width: 24, height: 800, borderRadius: 12, background: '#DDE3EC'}} />
        <div style={{position: 'absolute', left: 38, top: 20, width: 24, height: Math.max(0, (fill - 1) / 5) * 800, borderRadius: 12, background: `linear-gradient(180deg, ${PARTS.map((p) => p.c).join(', ')})`}} />
      </Abs>
      {items.map((x, k) => {
        const on = t >= x.a;
        const p = PARTS[k];
        return (
          <Abs key={k} x={160} y={440 + k * 160} w={880} style={{display: 'flex', alignItems: 'center', gap: 26}}>
            <div style={{width: 80, height: 80, borderRadius: 40, background: on ? p.c : '#fff', border: `8px solid ${p.c}`, boxSizing: 'border-box', transform: `scale(${on ? 1 + 0.2 * Math.max(0, 1 - (t - x.a) * 3) : 0.9})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: on ? '#fff' : p.c}}>{k + 1}</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: on ? INK : '#C3CAD6'}}>{x.l}</div>
          </Abs>
        );
      })}
    </Out>
  );
};

/* ═════════════ PARTIE 1 ═════════════ */
const Def: React.FC<{parts: [string, boolean][]; at: number; c: string; size?: number}> = ({parts, at, c, size = 50}) => {
  const t = useT();
  return (
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color: INK, lineHeight: 1.3, textAlign: 'center'}}>
      {parts.map(([w, hi], i) => {
        const p = prog(t, at + i * 0.12, at + i * 0.12 + 0.4, easeOut);
        return <span key={i} style={{display: 'inline-block', marginRight: 14, opacity: p, filter: `blur(${(1 - p) * 8}px)`}}>{hi ? <><span style={{color: '#fff', background: c, borderRadius: 10, padding: '0 8px'}}>{w[0]}</span>{w.slice(1)}</> : w}</span>;
      })}
    </div>
  );
};
const AiprDef: React.FC = () => {
  const t = useT();
  return (
    <Out end={78.0}>
      <Center y={320}><Kin text="Un énorme indice…" at={65.9} size={52} color={DIM} /></Center>
      <Abs x={0} y={400} w={1080}><Word text="AIPR" at={68.9} size={170} c={AI} variant={0} /></Abs>
      <Abs x={60} y={620} w={960}><Def at={69.6} c={AI} parts={[['Autorisation', true], ['d’Intervention', true], ['à', false], ['Proximité', true], ['des', false], ['Réseaux', true]]} /></Abs>
      <Blinds src="epi/chantier.jpg" x={160} y={800} w={760} h={420} at={73.2} pos="50% 55%">
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 12, background: 'linear-gradient(0deg, rgba(20,33,61,0.85), transparent)', display: 'flex', justifyContent: 'center', gap: 12}}><Pill at={76.0} c={NET.eau} size={26}>tuyaux</Pill><Pill at={76.8} c={NET.elec} size={26}>câbles</Pill></div>
      </Blinds>
    </Out>
  );
};
const AtexDef: React.FC = () => {
  const t = useT();
  const sun = prog(t, 90.9, 91.6, easeOut);
  return (
    <Out end={92.2}>
      <Abs x={0} y={340} w={1080}><Word text="ATEX" at={78.6} size={170} c={AX} variant={1} /></Abs>
      <Abs x={60} y={560} w={960}><Def at={79.2} c={AX} parts={[['ATmosphère', true], ['EXplosible', true]]} size={60} /></Abs>
      <Deep src="smi/raffinerie.jpg" x={160} y={700} w={760} h={380} at={81.4} pos="50% 40%">
        {t > 81.8 && Array.from({length: 10}, (_, k) => <div key={k} style={{position: 'absolute', left: ((k * 90 + t * 30) % 820) - 60, top: 60 + (k % 4) * 70 + Math.sin(t + k) * 20, width: 140, height: 80, borderRadius: '50%', background: `radial-gradient(ellipse, ${AX}66, transparent 70%)`, filter: 'blur(4px)'}} />)}
        <div style={{position: 'absolute', left: 20, top: 20}}><Pill at={81.9} c={AX} size={26}>invisible · dans l’air</Pill></div>
      </Deep>
      <Abs x={60} y={1110} w={960} style={{display: 'flex', justifyContent: 'center', gap: 20, alignItems: 'center'}}>
        <Pill at={86.0} c={AI} size={28}>enfoui ou suspendu</Pill>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, opacity: pop(t, 88.2)}}>≠</div>
        <Pill at={88.7} c={AX} size={28}>chimique & ambiant</Pill>
      </Abs>
      {t > 90.8 && (
        <Abs x={0} y={1220} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 50, alignItems: 'center', opacity: sun}}>
          <F n="soleil" size={110} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK}}>le jour et la nuit</div>
          <div style={{width: 96, height: 96, borderRadius: 48, background: '#3A4466', boxShadow: 'inset -26px -6px 0 0 #F2E8C9'}} />
        </Abs>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 2 ═════════════ */
const Frise: React.FC = () => {
  const t = useT();
  const D = [
    {y: '1999', l: 'ATEX 137', s: 'éviter les explosions au travail', a: 98.6, c: AX, x: 0},
    {y: '2013', l: 'Directive européenne', s: 'origine de l’AIPR', a: 113.7, c: AI, x: 1},
    {y: '2014', l: 'ATEX 114', s: 'équipements en zones dangereuses', a: 105.4, c: AX, x: 2},
    {y: '2018', l: 'Décret en France', s: 'AIPR obligatoire', a: 116.8, c: AI, x: 3},
  ];
  const bucket = prog(t, 120.4, 121.1, easeIn);
  return (
    <Out end={123.1}>
      <Center y={320}><Kin text="Qui a ouvert le bal ?" at={97.0} size={58} /></Center>
      <Abs x={60} y={470} w={960} h={8} style={{background: '#DDE3EC', borderRadius: 4}} />
      {D.map((d, k) => (
        <Abs key={k} x={60 + d.x * 240} y={420} w={240} style={{textAlign: 'center', opacity: pop(t, d.a - 0.3)}}>
          <div style={{width: 40, height: 40, borderRadius: 20, margin: '0 auto', background: d.c, border: '6px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', marginTop: 32}} />
          <div style={{display: 'flex', justifyContent: 'center', gap: 3, marginTop: 14}}>{d.y.split('').map((ch, i) => <Flap key={i} ch={ch} at={d.a + i * 0.06} h={64} c={d.c} />)}</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: d.c, marginTop: 10}}>{d.l}</div>
          <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 21, color: DIM, padding: '0 8px'}}>{d.s}</div>
        </Abs>
      ))}
      <Cite y={760} at={98.6} text="dates et textes tels que cités dans la vidéo d’origine" />
      {t > 118.0 && (
        <Abs x={140} y={860} w={800} h={440} style={{opacity: pop(t, 118.0), borderRadius: 30, overflow: 'hidden', background: SOIL, boxShadow: '0 20px 40px rgba(20,33,61,0.2)'}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 110, background: AIR}} />
          <div style={{position: 'absolute', left: -10, right: -10, top: 300, height: 34, borderRadius: 17, background: NET.gaz}} />
          <div style={{position: 'absolute', left: 340, top: lerp(-40, 180, bucket), width: 150, height: 120, background: '#F2B705', clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)', borderBottom: '0'}}>
            {[0, 1, 2, 3].map((k) => <div key={k} style={{position: 'absolute', bottom: -18, left: 22 + k * 30, width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '20px solid #8A6A00'}} />)}
          </div>
          <div style={{position: 'absolute', left: 400, top: -200, width: 26, height: lerp(160, 380, bucket), background: '#C98F00', transform: 'rotate(8deg)', transformOrigin: 'top'}} />
          {bucket >= 1 && Array.from({length: 12}, (_, k) => {
            const a = (k / 12) * Math.PI * 2;
            const p = Math.min(1, (t - 121.1) * 2);
            return <div key={k} style={{position: 'absolute', left: 415 + Math.cos(a) * p * 160, top: 315 + Math.sin(a) * p * 100, width: 12, height: 12, borderRadius: 6, background: GOLD, opacity: 1 - p, boxShadow: `0 0 12px ${AX}`}} />;
          })}
          <div style={{position: 'absolute', left: 20, top: 20}}><Pill at={118.9} c={RED} size={26}>accidents · pannes monstres</Pill></div>
        </Abs>
      )}
      <Stamp at={121.2} c={RED} text="coup de pelle !" x={300} y={1230} rot={-6} size={50} />
    </Out>
  );
};

/* ═════════════ PARTIE 3 ═════════════ */
const AiprQui: React.FC = () => {
  const t = useT();
  const nets = [{l: 'conduite de gaz', a: 137.7, c: NET.gaz}, {l: 'ligne haute tension', a: 138.7, c: NET.elec}, {l: 'fibre optique', a: 139.6, c: NET.tel}];
  return (
    <Out end={150.2}>
      <Center y={320}><Kin text="L’AIPR : qui est concerné ?" at={128.6} size={56} color={AI} /></Center>
      <Deep src="confines/regard.jpg" x={60} y={420} w={600} h={160} at={130.5} pos="50% 35%" />
      <Abs x={680} y={420} w={340} style={{display: 'flex', flexDirection: 'column', gap: 10}}>
        <Pill at={131.7} c={AI} size={26}>travaux publics</Pill><Pill at={132.7} c={AI} size={26}>artisans</Pill><Pill at={133.6} c={AI} size={26}>techniciens</Pill>
      </Abs>
      <Abs x={0} y={600} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK, opacity: pop(t, 134.4)}}>creuser le sol · poser des infrastructures</Abs>
      {nets.map((n, k) => (
        <Abs key={k} x={80} y={690 + k * 80} w={920} style={{display: 'flex', alignItems: 'center', gap: 18, opacity: pop(t, n.a)}}>
          <div style={{width: 520 * prog(t, n.a, n.a + 0.6, easeOut), height: 24, borderRadius: 12, background: n.c, boxShadow: `0 0 18px ${n.c}`}} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK}}>{n.l}</div>
        </Abs>
      ))}
      <Stamp at={140.9} c={AI} text="AIPR exigée" x={600} y={930} rot={6} size={40} />
      <Abs x={0} y={1060} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 60, alignItems: 'center'}}>
        <div style={{textAlign: 'center', opacity: pop(t, 147.5)}}><div style={{fontSize: 80, color: AI, transform: `translateY(${Math.sin(t * 5) * 8}px)`}}>▼</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>sous ses pieds</div></div>
        <div style={{textAlign: 'center', opacity: pop(t, 148.5)}}><div style={{fontSize: 80, color: NET.elec, transform: `translateY(${-Math.sin(t * 5) * 8}px)`}}>▲</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>au-dessus de sa tête</div></div>
      </Abs>
      <Center y={1260}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: AI, opacity: pop(t, 146.3)}}>repérer et respecter les réseaux</div></Center>
    </Out>
  );
};
const Chaine: React.FC = () => {
  const t = useT();
  const P = [{l: 'Concepteur', s: 'bureau d’études', a: 155.1, ph: 'induction/ingenieur-chantier.jpg'}, {l: 'Encadrant', s: 'chef de chantier', a: 159.8, ph: 'promo/terrain-controle.jpg'}, {l: 'Opérateur', s: 'pilote les engins', a: 162.7, ph: 'epi/chantier.jpg'}];
  const step = t < 159.8 ? 0 : t < 162.7 ? 1 : 2;
  const prevAt = step === 0 ? 155.1 : P[step].a;
  const bp = prog(t, prevAt - 0.8, prevAt, easeInOut);
  const bx = step === 0 ? 140 : lerp(140 + (step - 1) * 330, 140 + step * 330, bp);
  return (
    <Out end={170.5}>
      <Center y={320}><Kin text="Trois profils, une chaîne" at={150.3} size={58} color={AI} /></Center>
      {P.map((p, k) => (
        <Card key={k} x={50 + k * 330} y={430} w={320} h={520} at={p.a} c={AI} style={{padding: 0, overflow: 'hidden'}}>
          <div style={{height: 300, overflow: 'hidden'}}><Img src={PH(p.ph)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
          <div style={{padding: 18, textAlign: 'center'}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: AI}}>{p.l}</div>
            <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 24, color: DIM}}>{p.s}</div>
          </div>
        </Card>
      ))}
      {t > 155.1 && <div style={{position: 'absolute', left: bx + 20, top: 980, width: 180, height: 46, borderRadius: 23, background: `linear-gradient(180deg, #fff, ${GOLD} 40%, #C98F00)`, boxShadow: '0 10px 20px rgba(0,0,0,0.25)', transform: `rotate(${Math.sin(bp * Math.PI) * -12}deg)`}} />}
      {t > 168.2 && (
        <Abs x={60} y={1070} w={960} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6}}>
          {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{width: 120, height: 60, borderRadius: 30, border: `12px solid ${AI}`, marginLeft: k ? -26 : 0, transform: `scale(${Math.min(1, spring(t, 168.3 + k * 0.08, 9, 14))})`}} />)}
        </Abs>
      )}
      <Stamp at={165.9} c={RED} text="obligatoire avant le 1er coup de pioche" x={70} y={1170} rot={-3} size={30} />
    </Out>
  );
};
const AtexOu: React.FC = () => {
  const t = useT();
  return (
    <Out end={193.2}>
      <Center y={320}><Kin text="L’ATEX : l’industrie lourde" at={171.0} size={56} color={AX} /></Center>
      <Blinds src="promo/raffinerie.jpg" x={60} y={420} w={960} h={420} at={172.4} pos="50% 35%">
        {t > 177.9 && Array.from({length: 14}, (_, k) => <div key={k} style={{position: 'absolute', left: ((k * 75 + t * 40) % 1000) - 40, top: 360 - (((t * 60 + k * 50) % 340)), width: 18, height: 18, borderRadius: 9, background: `${AX}AA`, filter: 'blur(3px)'}} />)}
      </Blinds>
      <Abs x={0} y={870} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 40}}>
        {[{l: 'gaz', ic: 'vapeur', a: 179.0}, {l: 'vapeurs chimiques', ic: 'eprouvette', a: 180.4}, {l: 'poussières', ic: 'brouillard', a: 181.7}].map((x, k) => <div key={k} style={{textAlign: 'center', opacity: pop(t, x.a), transform: `translateY(${(1 - pop(t, x.a)) * 30}px)`}}><F n={x.ic} size={100} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>{x.l}</div></div>)}
      </Abs>
      <Abs x={0} y={1060} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', padding: '0 60px', boxSizing: 'border-box'}}>
        <Pill at={184.2} c={AX} size={28}>stockage</Pill><Pill at={185.7} c={AX} size={28}>usines chimiques</Pill><Pill at={186.8} c={AX} size={28}>agroalimentaire</Pill>
      </Abs>
      <Abs x={0} y={1170} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 12}}>
        <Pill at={190.1} c={INK} size={28}>fabrication</Pill><Pill at={191.0} c={INK} size={28}>sécurité</Pill><Pill at={191.6} c={INK} size={28}>maintenance</Pill>
      </Abs>
    </Out>
  );
};
const Zones: React.FC = () => {
  const t = useT();
  const Z = [{n: '2', l: 'dysfonctionnement / courte durée', a: 207.2, c: '#F6C343', r: 400}, {n: '1', l: 'probable en fonctionnement normal', a: 204.3, c: AX, r: 290}, {n: '0', l: 'présent presque tout le temps', a: 199.8, c: RED, r: 170}];
  return (
    <Out end={216.5}>
      <Center y={320}><Kin text="Le danger découpé en zones" at={194.2} size={56} color={AX} /></Center>
      <Abs x={140} y={420} w={800} h={800}>
        {Z.map((z, k) => {
          const p = Math.min(1, spring(t, z.a, 7, 12));
          return <div key={k} style={{position: 'absolute', left: 400 - z.r, top: 400 - z.r, width: z.r * 2, height: z.r * 2, borderRadius: '50%', background: `${z.c}${k === 2 ? 'EE' : '99'}`, transform: `scale(${Math.max(0, p)})`, boxShadow: k === 2 ? `0 0 ${30 + 20 * Math.sin(t * 5)}px ${RED}` : 'none'}} />;
        })}
        <div style={{position: 'absolute', left: 340, top: 320, opacity: pop(t, 197.3)}}><F n="vapeur" size={120} /></div>
        {Z.map((z, k) => (
          <div key={k} style={{position: 'absolute', left: 400 + z.r - 110, top: 400 - 40 - k * 6, width: 90, height: 90, borderRadius: 45, background: '#fff', border: `6px solid ${z.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: k === 0 ? '#B98A00' : z.c, opacity: pop(t, z.a + 0.2)}}>{z.n}</div>
        ))}
      </Abs>
      <Abs x={60} y={1150} w={960} style={{display: 'flex', flexDirection: 'column', gap: 8}}>
        {[...Z].reverse().map((z, k) => <div key={k} style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: INK, opacity: pop(t, z.a + 0.3)}}><span style={{color: k === 2 ? '#B98A00' : z.c, fontWeight: 900}}>Zone {z.n}</span> · {z.l}</div>)}
      </Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 4 ═════════════ */
const AiprObj: React.FC = () => {
  const t = useT();
  const scan = prog(t, 232.4, 235.5, easeInOut);
  return (
    <Out end={242.3}>
      <Center y={320}><Kin text="AIPR : très pragmatique" at={221.8} size={58} color={AI} /></Center>
      <Abs x={60} y={420} w={600} h={520} style={{borderRadius: 26, background: '#fff', boxShadow: '0 20px 40px rgba(20,33,61,0.15)', overflow: 'hidden', opacity: pop(t, 227.7)}}>
        <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#E6ECF5 2px, transparent 2px), linear-gradient(90deg, #E6ECF5 2px, transparent 2px)', backgroundSize: '40px 40px'}} />
        <svg width={600} height={520} style={{position: 'absolute', inset: 0}}>
          {[{c: NET.gaz, d: 'M0 120 L240 120 L300 200 L600 200'}, {c: NET.elec, d: 'M0 280 L600 280'}, {c: NET.eau, d: 'M120 0 L120 520'}, {c: NET.tel, d: 'M0 420 L380 420 L440 360 L600 360'}].map((n, k) => <path key={k} d={n.d} stroke={n.c} strokeWidth={14} fill="none" strokeDasharray={900} strokeDashoffset={900 * (1 - prog(t, 228.0 + k * 0.3, 229.2 + k * 0.3))} strokeLinecap="round" />)}
        </svg>
        <div style={{position: 'absolute', left: lerp(60, 420, scan), top: lerp(380, 120, scan), transform: 'rotate(-20deg)', opacity: pop(t, 232.4)}}><F n="loupe" size={130} /></div>
        <div style={{position: 'absolute', left: 16, top: 14}}><Pill at={227.8} c={AI} size={24}>lire les plans des exploitants</Pill></div>
      </Abs>
      <Deep src="confines/detecteur.jpg" x={690} y={420} w={330} h={520} at={233.6} pos="55% 50%">
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 10, background: 'linear-gradient(0deg, rgba(20,33,61,0.85), transparent)', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: '#fff', textAlign: 'center'}}>outils de localisation</div>
      </Deep>
      <Abs x={60} y={970} w={960} style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap'}}>
        <Pill at={232.6} c={AI} size={26}>méthodes de repérage</Pill><Pill at={237.3} c={NET.eau} size={26}>✕ percer une conduite</Pill><Pill at={238.5} c={NET.elec} size={26}>✕ sectionner un câble</Pill>
      </Abs>
      <Abs x={0} y={1140} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 30, alignItems: 'center', opacity: pop(t, 239.9)}}>
        <F n="telephone" size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: AI}}>communication & coordination</div>
      </Abs>
    </Out>
  );
};
const AtexObj: React.FC = () => {
  const t = useT();
  const bar = prog(t, 259.5, 262.2, easeInOut);
  const nospark = prog(t, 257.3, 257.8, easeOut);
  return (
    <Out end={263.5}>
      <Center y={320}><Kin text="ATEX : physique & chimie" at={242.6} size={58} color={AX} /></Center>
      <Abs x={290} y={470} w={500} h={440} style={{opacity: pop(t, 246.8)}}>
        <svg width={500} height={440} viewBox="0 0 500 440"><polygon points="250,20 480,420 20,420" fill={`${AX}22`} stroke={AX} strokeWidth={12} strokeLinejoin="round" strokeDasharray={1400} strokeDashoffset={1400 * (1 - prog(t, 246.8, 248.6))} /></svg>
        <div style={{position: 'absolute', left: 190, top: 200}}><F n="feu" size={120} /></div>
        <div style={{position: 'absolute', left: 150, top: -50, width: 200, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK, opacity: pop(t, 248.0)}}>combustible</div>
        <div style={{position: 'absolute', left: -60, top: 420, width: 200, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK, opacity: pop(t, 248.3)}}>comburant (air)</div>
        <div style={{position: 'absolute', left: 360, top: 420, width: 200, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK, opacity: pop(t, 248.6)}}>source d’ignition</div>
      </Abs>
      <Abs x={0} y={960} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: DIM, opacity: pop(t, 248.3)}}>mécanismes de combustion</Abs>
      <Abs x={0} y={1010} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={250.3} c={AX} size={28}>identifier les zones</Pill></Abs>
      <Abs x={0} y={1090} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30, opacity: pop(t, 255.2)}}>
        <div style={{position: 'relative'}}><F n="etincelles" size={110} /><div style={{position: 'absolute', left: -10, top: 50, width: 130, height: 12, background: RED, borderRadius: 6, transform: `rotate(-35deg) scaleX(${nospark})`}} /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: AX}}>équipements antidéflagrants</div>
      </Abs>
      <Abs x={120} y={1240} w={840} style={{opacity: pop(t, 259.4)}}>
        <div style={{height: 22, borderRadius: 11, background: `linear-gradient(90deg, #F6C343, ${AX}, ${RED})`, position: 'relative'}}>
          <div style={{position: 'absolute', left: `calc(${bar * 100}% - 20px)`, top: -9, width: 40, height: 40, borderRadius: 20, background: '#fff', border: `7px solid ${INK}`, boxSizing: 'border-box'}} />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: sansFont, fontWeight: 900, fontSize: 26, marginTop: 12}}><span>sensibilisation</span><span style={{color: RED}}>gestion des urgences</span></div>
      </Abs>
      <Cite y={1350} at={248.0} text="triangle du feu ajouté pour illustrer la combustion" />
    </Out>
  );
};

/* ═════════════ PARTIE 5 ═════════════ */
const Modalites: React.FC = () => {
  const t = useT();
  const wipe = prog(t, 277.9, 278.9, easeInOut);
  const dur = prog(t, 280.4, 284.0, easeInOut);
  return (
    <Out end={291.6}>
      <Center y={320}><Kin text="La logistique fait la différence" at={268.5} size={52} /></Center>
      <Abs x={30} y={420} w={500} h={900} style={{borderRadius: 28, background: `${AI}14`, border: `5px solid ${AI}`, opacity: pop(t, 272.6)}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 24, textAlign: 'center'}}><div style={{display: 'inline-flex', gap: 4}}>{'AIPR'.split('').map((c, i) => <Tile key={i} ch={c} size={64} c={AI} />)}</div></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: AI}}>très carré</div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 190, display: 'flex', justifyContent: 'center', gap: 4}}>{'7 H'.split('').map((ch, i) => (ch === ' ' ? <div key={i} style={{width: 16}} /> : <Flap key={i} ch={ch} at={274.9 + i * 0.06} h={110} c={AI} />))}</div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 310, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: DIM}}>session standard</div>
        {/* passeport : certificat AIPR */}
        <div style={{position: 'absolute', left: 40, right: 40, top: 380, height: 300, borderRadius: 22, background: 'linear-gradient(135deg, #1F3B73, #2C5AA0)', boxShadow: '0 20px 40px rgba(20,33,61,0.3)', transformOrigin: 'left center', transform: `perspective(1400px) rotateY(${(1 - prog(t, 276.0, 276.8, easeOut)) * -80}deg)`, padding: 24, boxSizing: 'border-box', color: '#fff', fontFamily: sansFont}}>
          <div style={{fontSize: 20, fontWeight: 800, letterSpacing: 4, opacity: 0.75}}>CERTIFICAT AIPR</div>
          <div style={{fontSize: 22, fontWeight: 700, opacity: 0.75, marginTop: 20}}>Validité</div>
          <div style={{display: 'flex', gap: 4, marginTop: 8}}>{'5 ANS'.split('').map((ch, i) => (ch === ' ' ? <div key={i} style={{width: 14}} /> : <Flap key={i} ch={ch} at={277.0 + i * 0.06} h={80} c={AI} />))}</div>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 46, background: '#ffffff18', fontFamily: 'monospace', fontSize: 20, lineHeight: '46px', paddingLeft: 24, opacity: 0.7}}>{'AIPR<<VALIDE<<5<ANS<<<<<'}</div>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 720, textAlign: 'center', fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: DIM, padding: '0 20px'}}>durée et validité citées dans la vidéo d’origine</div>
      </Abs>
      <Abs x={550} y={420} w={500} h={900} style={{borderRadius: 28, background: `${AX}14`, border: `5px solid ${AX}`, clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0 round 28px)`}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 24, textAlign: 'center'}}><div style={{display: 'inline-flex', gap: 4}}>{'ATEX'.split('').map((c, i) => <Tile key={i} ch={c} size={64} c={AX} />)}</div></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: AX}}>sur-mesure</div>
        <div style={{position: 'absolute', left: 40, right: 40, top: 220}}>
          <div style={{height: 26, borderRadius: 13, background: '#fff', border: `4px solid ${AX}`, overflow: 'hidden'}}><div style={{width: `${10 + dur * 90}%`, height: '100%', background: AX}} /></div>
          <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: sansFont, fontWeight: 900, fontSize: 24, marginTop: 10, color: INK}}><span>~1 heure</span><span>plusieurs jours</span></div>
          <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: sansFont, fontWeight: 700, fontSize: 20, color: DIM}}><span>intervenant ponctuel</span><span>expert maintenance</span></div>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 420, textAlign: 'center', opacity: pop(t, 287.3)}}>
          <div style={{transform: `rotate(${Math.max(0, t - 287.3) * 90}deg)`, display: 'inline-block'}}><F n="repeter" size={130} /></div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: AX, marginTop: 10}}>recyclage périodique souple</div>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: INK, marginTop: 6}}>défini par l’employeur</div>
        </div>
      </Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 6 ═════════════ */
const Resume: React.FC = () => {
  const t = useT();
  const fireOut = prog(t, 310.7, 311.4, easeOut);
  return (
    <Out end={314.8}>
      <Card x={60} y={330} w={960} h={430} at={298.2} c={AI}>
        <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
          <div style={{position: 'relative', width: 200, height: 200}}>
            <div style={{position: 'absolute', left: 30, top: 150, width: 140, height: 18, borderRadius: 9, background: NET.gaz}} />
            <div style={{position: 'absolute', left: 30, top: 176, width: 140, height: 14, borderRadius: 7, background: NET.elec}} />
            <div style={{position: 'absolute', left: 30, top: 0, transform: `scale(${Math.min(1, spring(t, 298.4, 8, 12))})`}}><F n="bouclier" size={140} /></div>
          </div>
          <div>
            <div style={{display: 'flex', gap: 4}}>{'AIPR'.split('').map((c, i) => <Tile key={i} ch={c} size={60} c={AI} />)}</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: AI, marginTop: 12}}>le bouclier des réseaux</div>
            <div style={{display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap'}}><Pill at={301.1} c={AI} size={22}>travaux de creusement</Pill><Pill at={306.1} c={NET.elec} size={22}>électrocutions</Pill><Pill at={307.5} c={NET.eau} size={22}>fuites</Pill></div>
          </div>
        </div>
      </Card>
      <Card x={60} y={800} w={960} h={430} at={308.6} c={AX}>
        <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
          <div style={{position: 'relative', width: 200, height: 200}}>
            <div style={{position: 'absolute', left: 30, top: 30, opacity: 1 - fireOut * 0.7}}><F n="feu" size={140} /></div>
            <div style={{position: 'absolute', left: 10, top: 90, width: 180, height: 16, borderRadius: 8, background: RED, transform: `rotate(-35deg) scaleX(${fireOut})`}} />
          </div>
          <div>
            <div style={{display: 'flex', gap: 4}}>{'ATEX'.split('').map((c, i) => <Tile key={i} ch={c} size={60} c={AX} />)}</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: AX, marginTop: 12}}>empêcher l’air de s’embraser</div>
            <div style={{display: 'flex', gap: 10, marginTop: 12}}><Pill at={312.5} c={AX} size={22}>prévient les explosions</Pill></div>
          </div>
        </div>
      </Card>
    </Out>
  );
};
const Choix: React.FC = () => {
  const t = useT();
  const fork = prog(t, 322.0, 323.2, easeInOut);
  const heart = t > 332.2 ? Math.max(0, Math.sin((t - 332.2) * 7)) ** 8 : 0;
  return (
    <Out end={OUTRO_AT}>
      <Center y={320}><Kin text="Regardez votre activité en face" at={316.8} size={52} /></Center>
      <svg style={{position: 'absolute', left: 0, top: 0}} width={1080} height={1920}>
        <path d="M540 1300 L540 1050 C540 940, 290 920, 270 800" fill="none" stroke={`${AI}55`} strokeWidth={70} strokeLinecap="round" strokeDasharray={800} strokeDashoffset={800 * (1 - fork)} />
        <path d="M540 1050 C540 940, 790 920, 810 800" fill="none" stroke={`${AX}55`} strokeWidth={70} strokeLinecap="round" strokeDasharray={600} strokeDashoffset={600 * (1 - fork)} />
      </svg>
      <Card x={50} y={430} w={460} h={340} at={323.1} c={AI}>
        <F n="pelle" size={90} />
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, marginTop: 10}}>Je retourne la terre près d’un câble ?</div>
        <div style={{marginTop: 12}}><Pill at={323.9} c={AI} size={26}>→ AIPR</Pill></div>
      </Card>
      <Card x={570} y={430} w={460} h={340} at={324.9} c={AX}>
        <F n="vapeur" size={90} />
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, marginTop: 10}}>L’air lui-même peut s’enflammer ?</div>
        <div style={{marginTop: 12}}><Pill at={326.6} c={AX} size={26}>→ ATEX</Pill></div>
      </Card>
      {t > 331.0 && (
        <Abs x={0} y={1060} w={1080} style={{textAlign: 'center'}}>
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: 24}}><div style={{transform: `scale(${1 + heart * 0.2})`}}><F n="coeur" size={150} /></div></div>
          <Kin text="une formation qui sauve des vies" at={332.2} size={52} color={RED} />
        </Abs>
      )}
      {t > 332 && <Dust n={20} c={GOLD} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const DIVES = MODES.slice(1).map(([a]) => a);
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...DIVES.map((a) => ({at: a, s: 'soft-whoosh', v: 0.22, dur: 1.4})),
  ...PARTS.flatMap((p) => [{at: p.at, s: 'sfx/whoosh', v: 0.45}, ...flaps(p.at + 0.45, 12), {at: p.at + 1.1, s: 'bass-hit', v: 0.3}, {at: p.at + 3.0, s: 'sfx/swish', v: 0.4}]),
  // intro
  ...[5.3, 6.3, 6.9].map((a) => ({at: a, s: 'sfx/pop', v: 0.22})), ...rep(15.0, 8, 0.075, 'sfx/thud', 0.22), {at: 16.3, s: 'tension', v: 0.2, dur: 3}, {at: 20.5, s: 'tampon', v: 0.45},
  ...[25.8, 27.5, 29.0].map((a) => ({at: a, s: 'soft-whoosh', v: 0.22, dur: 1})), {at: 33.1, s: 'sfx/pop', v: 0.22}, {at: 38.2, s: 'deep-hit', v: 0.4}, {at: 38.4, s: 'tampon', v: 0.4}, {at: 42.0, s: 'sfx/thud', v: 0.35},
  ...[50.3, 52.3, 54.2, 55.7, 57.4, 59.2].map((a) => ({at: a, s: 'sfx/ding', v: 0.22})),
  // partie 1
  ...rep(69.25, 4, 0.07, 'sfx/thud', 0.28), {at: 73.2, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 76.0, s: 'sfx/pop', v: 0.22}, {at: 76.8, s: 'sfx/pop', v: 0.22},
  ...rep(78.95, 4, 0.07, 'sfx/click', 0.28), {at: 81.4, s: 'sfx/whoosh', v: 0.3}, {at: 86.0, s: 'sfx/pop', v: 0.2}, {at: 88.7, s: 'sfx/pop', v: 0.2}, {at: 90.9, s: 'sfx/ding', v: 0.3},
  // partie 2
  ...[98.6, 105.4, 113.7, 116.8].flatMap((a) => flaps(a, 12)), {at: 118.0, s: 'sfx/whoosh', v: 0.3}, {at: 120.4, s: 'sfx/swish', v: 0.35}, {at: 121.1, s: 'deep-hit', v: 0.45}, {at: 121.2, s: 'tampon', v: 0.45},
  // partie 3
  {at: 130.5, s: 'soft-whoosh', v: 0.3}, ...[137.7, 138.7, 139.6].map((a) => ({at: a, s: 'sfx/rise', v: 0.18})), {at: 140.9, s: 'tampon', v: 0.4}, {at: 147.5, s: 'sfx/pop', v: 0.2}, {at: 148.5, s: 'sfx/pop', v: 0.2},
  ...[155.1, 159.8, 162.7].map((a) => ({at: a, s: 'sfx/swish', v: 0.3})), {at: 165.9, s: 'tampon', v: 0.4}, ...rep(168.3, 5, 0.08, 'sfx/click', 0.2),
  {at: 172.4, s: 'soft-whoosh', v: 0.3, dur: 1}, ...[179.0, 180.4, 181.7].map((a) => ({at: a, s: 'sfx/pop', v: 0.22})), ...[184.2, 185.7, 186.8, 190.1, 191.0, 191.6].map((a) => ({at: a, s: 'sfx/click', v: 0.18})),
  {at: 199.8, s: 'deep-hit', v: 0.4}, {at: 204.3, s: 'bass-hit', v: 0.3}, {at: 207.2, s: 'sfx/thud', v: 0.3}, {at: 211.8, s: 'sfx/ding', v: 0.25},
  // partie 4
  ...rep(228.0, 4, 0.3, 'stylo', 0.25), {at: 232.4, s: 'sfx/swish', v: 0.25}, {at: 233.6, s: 'soft-whoosh', v: 0.3}, {at: 237.3, s: 'sfx/thud', v: 0.2}, {at: 238.5, s: 'sfx/thud', v: 0.2}, {at: 239.9, s: 'sfx/ding', v: 0.22},
  {at: 246.8, s: 'stylo', v: 0.35}, {at: 250.3, s: 'sfx/pop', v: 0.22}, {at: 257.3, s: 'sfx/swish', v: 0.3}, {at: 259.4, s: 'riser', v: 0.25, dur: 3},
  // partie 5
  {at: 272.6, s: 'sfx/whoosh', v: 0.25}, ...flaps(274.9, 10), {at: 276.0, s: 'page', v: 0.3}, ...flaps(277.0, 12), {at: 277.9, s: 'sfx/whoosh', v: 0.35}, {at: 280.4, s: 'sfx/rise', v: 0.25}, {at: 287.3, s: 'sfx/ding', v: 0.25},
  // partie 6
  {at: 298.2, s: 'sfx/whoosh', v: 0.3}, {at: 298.4, s: 'validation', v: 0.3}, {at: 308.6, s: 'sfx/whoosh', v: 0.3}, {at: 310.7, s: 'sfx/swish', v: 0.35},
  {at: 322.0, s: 'soft-whoosh', v: 0.35}, {at: 323.1, s: 'sfx/pop', v: 0.25}, {at: 324.9, s: 'sfx/pop', v: 0.25}, ...rep(332.2, 5, 0.9, 'sfx/thud', 0.22), {at: 333.0, s: 'validation', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const AiprAtex: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(20,33,61,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(20,33,61,0.05) 2px, transparent 2px)', backgroundSize: '60px 60px'}} />
    <Gate from={2.6} to={OUTRO_AT}><Coupe /></Gate>
    <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(20,33,61,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(20,33,61,0.05) 2px, transparent 2px)', backgroundSize: '60px 60px'}} />
    <Gate from={4.8} to={22.0}><Confusion /></Gate>
    <Gate from={21.9} to={46.1}><CasseTete /></Gate>
    <Gate from={46.0} to={60.3}><Route /></Gate>
    <Gate from={63.6} to={78.1}><AiprDef /></Gate>
    <Gate from={78.0} to={92.3}><AtexDef /></Gate>
    <Gate from={95.6} to={123.2}><Frise /></Gate>
    <Gate from={126.5} to={150.3}><AiprQui /></Gate>
    <Gate from={150.2} to={170.6}><Chaine /></Gate>
    <Gate from={170.5} to={193.3}><AtexOu /></Gate>
    <Gate from={193.2} to={216.6}><Zones /></Gate>
    <Gate from={219.9} to={242.4}><AiprObj /></Gate>
    <Gate from={242.3} to={263.6}><AtexObj /></Gate>
    <Gate from={266.9} to={291.7}><Modalites /></Gate>
    <Gate from={295.0} to={314.9}><Resume /></Gate>
    <Gate from={314.8} to={OUTRO_AT}><Choix /></Gate>
    {PARTS.map((p, i) => <Gate key={p.n} from={p.at} to={p.at + 3.7}><Baton i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={337.2}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-aipr-atex-origine.m4a')} trimAfter={s(337.3)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {Blinds, Board, Card, Center, Cite, Deep, Dust, Kin, Out, Pill, Stamp, Tile, Word} from '../durab/Durab';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s, sansFont} from '../theme';
import {Abs, Bg, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, LOGO, PAPER, PH, pop, prog, RED, spring, T, useT} from '../implIso/kit';
import {captions} from './captions';

/**
 * « La roue de Deming » (5 min 22) — capsule « hors normes » : voix d'origine, sous-titres recalés mot à mot, photos
 * réelles, thème « papier quadrillé ».
 * Fil rouge inédit : LA ROUE ELLE-MÊME. Une roue PDCA en 4 quartiers (Planifier · Déployer · Contrôler · Agir) gravit
 * une pente, retenue par sa cale « standard » ; elle vit dans l'en-tête (mini-roue qui tourne, quartier actif allumé) et
 * revient en grand aux moments-clés (principe, itération en spirale, final).
 * Transition inédite : le TOUR DE ROUE — un balayage circulaire (comme une aiguille qui fait le tour du cadran) révèle
 * le panneau de partie, puis le referme.
 * Reprend le meilleur de la série : tuiles en bois (P-D-C-A), palettes d'affichage (numéros de partie), ligne de métro
 * (programme), store vénitien et photos en profondeur 3D, rideau de théâtre, tampons, écran partagé, balance,
 * carrefour, typographie cinétique, poussière d'or.
 */
const P_ = '#1F6FD1';
const D_ = '#F07A12';
const C_ = '#14A37F';
const A_ = '#C2335B';
const GOLD = '#F5B700';
const Q = [{k: 'P', l: 'Planifier', c: P_}, {k: 'D', l: 'Déployer', c: D_}, {k: 'C', l: 'Contrôler', c: C_}, {k: 'A', l: 'Agir', c: A_}];
const OUTRO_AT = 318.9;
export const DEMING_FRAMES = s(OUTRO_AT + 3.8);
const PARTS = [
  {at: 50.4, n: '1', title: 'Le principe de la roue', c: P_},
  {at: 93.2, n: '2', title: 'Les 4 étapes clés', c: D_},
  {at: 177.9, n: '3', title: 'Agilité & innovation continue', c: C_},
  {at: 225.7, n: '4', title: 'Les limites du modèle', c: A_},
];
const partIdx = (t: number) => PARTS.reduce((k, p, i) => (t >= p.at ? i : k), -1);
const activeQ = (t: number) => (t >= 123 && t < 142.7 ? 0 : t >= 142.7 && t < 160.8 ? 1 : t >= 160.8 && t < 177.9 ? 2 : -1);

/* ═════════════ La roue (fil rouge) ═════════════ */
const Wheel: React.FC<{size: number; rot: number; active?: number; labels?: boolean; reveal?: number[]; t0?: number}> = ({size, rot, active = -1, labels = true, reveal, t0 = -99}) => {
  const t = useT();
  const R = 100;
  const arc = (i: number) => {
    const a0 = (i * Math.PI) / 2 - Math.PI / 2 - Math.PI / 4, a1 = a0 + Math.PI / 2;
    const p = (a: number, r: number) => `${R + Math.cos(a) * r},${R + Math.sin(a) * r}`;
    return `M${R},${R} L${p(a0, R - 3)} A${R - 3},${R - 3} 0 0 1 ${p(a1, R - 3)} Z`;
  };
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{transform: `rotate(${rot}deg)`, filter: 'drop-shadow(0 10px 18px rgba(20,33,61,0.25))', overflow: 'visible'}}>
      {Q.map((q, i) => {
        const vis = reveal ? prog(t, reveal[i], reveal[i] + 0.4, easeOut) : 1;
        const lit = active === -1 || active === i;
        return <path key={i} d={arc(i)} fill={q.c} opacity={vis * (lit ? 1 : 0.28)} stroke="#fff" strokeWidth={3} transform={`translate(${R} ${R}) scale(${0.85 + 0.15 * vis}) translate(${-R} ${-R})`} />;
      })}
      <circle cx={R} cy={R} r={26} fill="#fff" />
      <circle cx={R} cy={R} r={10} fill={INK} opacity={0.15} />
      {labels && Q.map((q, i) => {
        const a = (i * Math.PI) / 2 - Math.PI / 2;
        const vis = reveal ? prog(t, reveal[i] + 0.1, reveal[i] + 0.5, easeOut) : 1;
        return <text key={i} x={R + Math.cos(a) * 60} y={R + Math.sin(a) * 60 + 13} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={38} fill="#fff" opacity={vis} transform={`rotate(${-rot} ${R + Math.cos(a) * 60} ${R + Math.sin(a) * 60})`}>{q.k}</text>;
      })}
      {t0 > 0 && t > t0 && <circle cx={R} cy={R} r={R + 6} fill="none" stroke={GOLD} strokeWidth={4} strokeDasharray="6 10" opacity={0.6} />}
    </svg>
  );
};
/** La roue qui gravit la pente, retenue par la cale « standard ». */
const Slope: React.FC<{at: number; w?: number; climb?: number}> = ({at, w = 1000, climb = 0.5}) => {
  const t = useT();
  const k = Math.max(0, t - at);
  const ang = -14;
  const pos = 160 + climb * (w - 460) + Math.sin(k * 0.6) * 6;
  const rad = 150;
  const rot = (pos / (2 * Math.PI * rad)) * 360 + k * 6;
  return (
    <div style={{position: 'relative', width: w, height: 520}}>
      <div style={{position: 'absolute', left: 0, bottom: 40, width: w, height: 0, borderBottom: `16px solid ${INK}`, transformOrigin: '0 50%', transform: `rotate(${ang}deg)`}} />
      <div style={{position: 'absolute', left: 0, bottom: 40, width: w, transformOrigin: '0 100%', transform: `rotate(${ang}deg)`}}>
        <div style={{position: 'absolute', left: pos - rad, bottom: 8}}><Wheel size={rad * 2} rot={rot} /></div>
        <div style={{position: 'absolute', left: pos - rad - 64, bottom: 8, width: 80, height: 90, background: `linear-gradient(135deg, #8D96A6, #5C6577)`, clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'}} />
        <div style={{position: 'absolute', left: pos - rad - 180, bottom: 100, padding: '4px 12px', borderRadius: 10, background: '#fff', border: `3px solid ${INK}`, fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: INK, transform: `rotate(${-ang}deg)`, whiteSpace: 'nowrap'}}>cale « standard »</div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 30, fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: GREEN}}>qualité ▲</div>
    </div>
  );
};
const Header: React.FC = () => {
  const t = useT();
  const pi = partIdx(t);
  const aq = activeQ(t);
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 58, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div>
      {t > 2.6 && t < OUTRO_AT && (
        <div style={{position: 'absolute', left: 36, right: 36, top: 186, height: 84, borderRadius: 24, background: '#ffffffEC', boxShadow: '0 8px 20px rgba(20,33,61,0.1)', display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', opacity: pop(t, 2.6)}}>
          <Wheel size={64} rot={t * 24} active={aq} labels={false} />
          <div style={{display: 'flex', gap: 6}}>
            {Q.map((q, i) => <div key={i} style={{padding: '4px 12px', borderRadius: 10, background: aq === i ? q.c : `${q.c}22`, color: aq === i ? '#fff' : q.c, fontFamily: sansFont, fontWeight: 900, fontSize: 20}}>{aq === i ? q.l : q.k}</div>)}
          </div>
          <div style={{flex: 1}} />
          <div style={{display: 'flex', gap: 6}}>{PARTS.map((p, i) => <div key={i} style={{width: i === pi ? 46 : 20, height: 12, borderRadius: 6, background: i <= pi ? p.c : '#DDE3EC'}} />)}</div>
        </div>
      )}
    </AbsoluteFill>
  );
};
/** Le tour de roue : balayage circulaire. */
const TourDeRoue: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const p = PARTS[i];
  const inn = prog(t, p.at, p.at + 0.8, easeInOut);
  const out = prog(t, p.at + 3.0, p.at + 3.7, easeInOut);
  if (t < p.at || out >= 1) return null;
  const deg = out > 0 ? 360 * (1 - out) : 360 * inn;
  const mask = out > 0 ? `conic-gradient(from ${360 * out}deg at 50% 50%, #000 0 ${deg}deg, transparent ${deg}deg)` : `conic-gradient(from 0deg at 50% 50%, #000 0 ${deg}deg, transparent ${deg}deg)`;
  const needle = out > 0 ? 360 * out : deg;
  return (
    <AbsoluteFill style={{zIndex: 35}}>
      <AbsoluteFill style={{background: p.c, WebkitMaskImage: mask, maskImage: mask}}>
        <Abs x={0} y={520} w={1080}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 40, letterSpacing: 8, color: '#ffffffCC', textAlign: 'center', opacity: pop(t, p.at + 0.5)}}>PARTIE</div></Abs>
        <Abs x={0} y={600} w={1080}><Board text={p.n} at={p.at + 0.5} h={260} gap={14} c={p.c} n={10} /></Abs>
        <Abs x={70} y={920} w={940} style={{textAlign: 'center'}}><Kin text={p.title} at={p.at + 1.1} size={72} color="#fff" /></Abs>
      </AbsoluteFill>
      {(inn < 1 || out > 0) && <div style={{position: 'absolute', left: 540 - 6, top: 960 - 1200, width: 12, height: 1200, background: `linear-gradient(0deg, ${GOLD}, transparent)`, transformOrigin: '50% 100%', transform: `rotate(${needle}deg)`}} />}
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
      <Img src={PH('promo/hse-machine.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 820, objectFit: 'cover', objectPosition: '45% 30%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 30%, ${PAPER}DD 39%, ${PAPER} 43%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={50} y={690} w={980} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>AMÉLIORATION CONTINUE</div>
        <T size={116} style={{marginTop: 18, textTransform: 'uppercase', letterSpacing: -3}}>La roue</T>
        <T size={116} style={{textTransform: 'uppercase', letterSpacing: -3}}><span style={{background: GOLD, padding: '0 22px', borderRadius: 18}}>de Deming</span></T>
        <div style={{display: 'flex', justifyContent: 'center', gap: 10, marginTop: 20}}>{Q.map((q, i) => <Tile key={i} ch={q.k} size={92} c={q.c} />)}</div>
      </Abs>
      <Abs x={40} y={1180} w={1000}><Slope at={-9} climb={0.55} /></Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  return (
    <Out end={19.0}>
      <Center y={320}><Kin text="Le fameux cycle" at={8.0} size={56} /></Center>
      <Abs x={0} y={410} w={1080}><Word text="PDCA" at={8.6} size={170} c={INK} variant={0} /></Abs>
      <Deep src="induction/technicien-hse.jpg" x={60} y={640} w={960} h={520} at={12.0} pos="50% 30%">
        <div style={{position: 'absolute', left: 20, top: 20}}><Pill at={12.4} c={P_} size={26}>méthode « ultra occidentale »</Pill></div>
        <div style={{position: 'absolute', right: 20, bottom: 20}}><Pill at={16.2} c={RED} size={28}>Toyota · Japon d’après-guerre</Pill></div>
      </Deep>
      <Center y={1200}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: GOLD, opacity: pop(t, 14.7)}}>le moteur caché d’un succès phénoménal</div></Center>
    </Out>
  );
};
const Hasard: React.FC = () => {
  const t = useT();
  const cross = prog(t, 22.5, 23.0, easeOut);
  const flip = prog(t, 26.2, 27.6, easeInOut);
  return (
    <Out end={36.8}>
      <Abs x={0} y={340} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30, opacity: pop(t, 19.2)}}>
        <div style={{position: 'relative', transform: `rotate(${(1 - cross) * t * 200}deg)`}}><F n="de" size={150} /><div style={{position: 'absolute', left: -20, top: 66, width: 190, height: 16, background: RED, borderRadius: 8, transform: `rotate(-35deg) scaleX(${cross})`}} /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: INK}}>rien au hasard</div>
      </Abs>
      <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 8}}>
        {Array.from({length: 6}, (_, k) => <div key={k} style={{width: 130, height: 70, borderRadius: 8, background: 'linear-gradient(180deg, #B8BFCB, #8D96A6)', boxShadow: 'inset 0 -6px 0 rgba(0,0,0,0.15)', transform: `translateY(${(1 - Math.min(1, spring(t, 24.6 + k * 0.08, 9, 14))) * -300}px)`}} />)}
      </Abs>
      <Center y={650}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: DIM, opacity: pop(t, 24.6)}}>des modèles en béton</div></Center>
      <Abs x={140} y={760} w={800} h={300} style={{perspective: 1400}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: 30, background: flip < 0.5 ? '#FDECEC' : '#E6F6EF', border: `6px solid ${flip < 0.5 ? RED : GREEN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, transform: `rotateY(${flip * 180}deg)`, opacity: pop(t, 25.0)}}>
          <div style={{transform: `rotateY(${flip >= 0.5 ? 180 : 0}deg)`, display: 'flex', alignItems: 'center', gap: 24}}>
            <F n={flip < 0.5 ? 'baisse' : 'hausse'} size={130} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: flip < 0.5 ? RED : GREEN}}>{flip < 0.5 ? 'faiblesses' : 'forces'}</div>
          </div>
        </div>
      </Abs>
      <Abs x={0} y={1100} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={29.6} c={GREEN} size={32}>amélioration continue</Pill></Abs>
      <Stamp at={33.9} c={A_} text="comprendre ses limites" x={190} y={1200} rot={-4} size={44} />
    </Out>
  );
};
const Programme: React.FC = () => {
  const t = useT();
  const items = [{a: 39.9}, {a: 42.8}, {a: 44.6}, {a: 47.4}];
  const fill = items.filter((x) => t >= x.a).length;
  return (
    <Out end={50.4}>
      <Center y={320}><Kin text="Au programme" at={37.0} size={64} /></Center>
      <Abs x={170} y={450} w={100} h={900}>
        <div style={{position: 'absolute', left: 38, top: 20, width: 24, height: 780, borderRadius: 12, background: '#DDE3EC'}} />
        <div style={{position: 'absolute', left: 38, top: 20, width: 24, height: Math.max(0, (fill - 1) / 3) * 780, borderRadius: 12, background: `linear-gradient(180deg, ${PARTS.map((p) => p.c).join(', ')})`}} />
      </Abs>
      {PARTS.map((p, k) => {
        const on = t >= items[k].a;
        return (
          <Abs key={k} x={180} y={450 + k * 260} w={860} style={{display: 'flex', alignItems: 'center', gap: 30}}>
            <div style={{width: 80, height: 80, borderRadius: 40, background: on ? p.c : '#fff', border: `8px solid ${p.c}`, boxSizing: 'border-box', transform: `scale(${on ? 1 + 0.2 * Math.max(0, 1 - (t - items[k].a) * 3) : 0.9})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: on ? '#fff' : p.c}}>{p.n}</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: on ? INK : '#C3CAD6'}}>{p.title}</div>
          </Abs>
        );
      })}
    </Out>
  );
};

/* ═════════════ PARTIE 1 ═════════════ */
const Rideau: React.FC = () => {
  const t = useT();
  const curtain = prog(t, 59.4, 60.3, easeInOut) * (1 - prog(t, 60.6, 61.3, easeInOut));
  const spin = t > 61.3 ? (t - 61.3) * 120 : 0;
  const lin = prog(t, 55.8, 59.0, easeInOut);
  const cross = prog(t, 64.6, 65.2, easeOut);
  return (
    <Out end={70.2}>
      <Center y={320}><Kin text="Fini le projet linéaire" at={53.6} size={56} /></Center>
      <Abs x={90} y={460} w={900} h={160}>
        <div style={{position: 'absolute', left: 60, right: 60, top: 70, height: 10, background: '#DDE3EC', borderRadius: 5}} />
        <div style={{position: 'absolute', left: 60, width: 780 * lin, top: 70, height: 10, background: INK, borderRadius: 5}} />
        <div style={{position: 'absolute', left: 0, top: 40}}><Pill at={57.1} c={INK} size={26}>début</Pill></div>
        <div style={{position: 'absolute', right: 0, top: 40}}><Pill at={59.0} c={INK} size={26}>fin</Pill></div>
      </Abs>
      {curtain > 0 && [0, 1].map((k) => <div key={k} style={{position: 'absolute', top: 280, bottom: 0, [k ? 'right' : 'left']: 0, width: 540 * curtain, background: 'repeating-linear-gradient(90deg, #B3122E 0 40px, #8E0E24 40px 70px)', zIndex: 10, boxShadow: '0 0 40px rgba(0,0,0,0.4)'}} />)}
      {curtain > 0.6 && <Abs x={0} y={900} w={1080} style={{textAlign: 'center', zIndex: 11, fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: '#fff'}}>…et rideau ?</Abs>}
      {t > 61.0 && (
        <Abs x={340} y={680} w={400} h={400} style={{opacity: pop(t, 61.0)}}>
          <div style={{transform: `rotate(${spin}deg)`}}><Wheel size={400} rot={0} /></div>
        </Abs>
      )}
      {t > 61.3 && <Center y={1100}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: P_, opacity: pop(t, 61.3)}}>une rotation constante</div></Center>}
      {t > 63.4 && (
        <Abs x={60} y={1190} w={960} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 26}}>
          <div style={{position: 'relative', opacity: pop(t, 63.5)}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: DIM}}>☑ to-do list jetable</div><div style={{position: 'absolute', left: -10, right: -10, top: '50%', height: 8, background: RED, transform: `scaleX(${cross})`, transformOrigin: '0 50%'}} /></div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: GOLD, opacity: pop(t, 66.5)}}>∞</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK, opacity: pop(t, 66.5)}}>mouvement perpétuel</div>
        </Abs>
      )}
    </Out>
  );
};
const LaRoue: React.FC = () => {
  const t = useT();
  const rev = [74.7, 75.9, 76.6, 77.2];
  const band = prog(t, 82.2, 83.8, easeOut);
  return (
    <Out end={93.2}>
      <Center y={320}><Kin text="La roue de Deming" at={72.1} size={66} /></Center>
      <Abs x={290} y={420} w={500} h={500}><Wheel size={500} rot={Math.max(0, t - 77.5) * 20} reveal={rev} /></Abs>
      <Abs x={60} y={940} w={960} style={{display: 'flex', justifyContent: 'center', gap: 12}}>
        {Q.map((q, i) => <Pill key={i} at={rev[i]} c={q.c} size={30}>{q.l}</Pill>)}
      </Abs>
      <Abs x={60} y={1060} w={960} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 50}}>
        <div style={{position: 'relative', textAlign: 'center', opacity: pop(t, 82.3)}}>
          <F n="pansement" size={110} />
          <div style={{position: 'absolute', left: -10, top: 50, width: 130, height: 12, background: RED, borderRadius: 6, transform: `rotate(-35deg) scaleX(${band})`}} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: DIM}}>petit pansement</div>
        </div>
        <div style={{textAlign: 'center', opacity: pop(t, 80.9)}}><F n="arbre" size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: GREEN}}>à la racine</div></div>
      </Abs>
      {t > 88.4 && <Stamp at={88.5} c={A_} text="bam !" x={720} y={1060} rot={10} size={56} />}
      <Abs x={0} y={1250} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={90.6} c={INK} size={28}>définitive</Pill><Pill at={92.4} c={INK} size={28}>systématique</Pill></Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 2 ═════════════ */
const Mecanique: React.FC = () => {
  const t = useT();
  const steps = [108.3, 109.5, 111.3, 112.8];
  let cur = -1;
  steps.forEach((a, i) => { if (t >= a) cur = i; });
  const turn = t > 116.0 ? (t - 116.0) * 90 : cur * 90;
  const helix = prog(t, 117.2, 121.4, easeInOut);
  return (
    <Out end={123.0}>
      <Center y={320}><Kin text="Une mécanique de précision" at={97.4} size={56} color={D_} /></Center>
      {t < 103.8 && (
        <Abs x={0} y={500} w={1080} style={{display: 'flex', justifyContent: 'center', opacity: pop(t, 99.5) * (1 - prog(t, 103.4, 103.8))}}>
          <div style={{transform: `rotate(${t * 60}deg)`}}><F n="engrenage" size={260} /></div>
          <div style={{transform: `rotate(${-t * 60 + 15}deg)`, marginLeft: -40, marginTop: 150}}><F n="engrenage" size={200} /></div>
        </Abs>
      )}
      {t >= 103.8 && (
        <Abs x={0} y={420} w={1080} h={900} style={{opacity: pop(t, 103.9)}}>
          {helix > 0 && [0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 290, top: 520 - k * 170 * helix, width: 500, height: 150, borderRadius: '50%', border: `10px solid ${[P_, D_, C_][k]}`, opacity: 0.5 * helix, transform: 'rotateX(70deg)'}} />)}
          <div style={{position: 'absolute', left: 340, top: 120 - helix * 60, transform: `scale(${1 - helix * 0.25})`}}><Wheel size={400} rot={-turn} active={t > 116 ? -1 : cur} /></div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 580, display: 'flex', justifyContent: 'center', gap: 12}}>
            {Q.map((q, i) => <Pill key={i} at={steps[i]} c={q.c} size={28}>{q.l}</Pill>)}
          </div>
          {t > 116 && <div style={{position: 'absolute', left: 0, right: 0, top: 690, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: GOLD, opacity: pop(t, 116.1)}}>…et ça relance un nouveau tour</div>}
          {t > 121.3 && <div style={{position: 'absolute', left: 0, right: 0, top: 770, textAlign: 'center'}}><Pill at={121.4} c={INK} size={36}>l’itération</Pill></div>}
        </Abs>
      )}
    </Out>
  );
};
const Etape: React.FC<{q: number; from: number; to: number; title: string; children: React.ReactNode}> = ({q, from, to, title, children}) => {
  const t = useT();
  const Qd = Q[q];
  return (
    <Out end={to}>
      <Abs x={60} y={310} w={960} style={{display: 'flex', alignItems: 'center', gap: 22}}>
        <div style={{transform: `scale(${Math.min(1, spring(t, from + 0.1, 8, 13))})`}}><Tile ch={Qd.k} size={110} c={Qd.c} /></div>
        <div>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: Qd.c}}>ÉTAPE {q + 1}</div>
          <Kin text={title} at={from + 0.3} size={60} color={INK} />
        </div>
      </Abs>
      {children}
    </Out>
  );
};
const Planifier: React.FC = () => {
  const t = useT();
  const hit = prog(t, 135.5, 136.2, easeIn);
  return (
    <Etape q={0} from={123.1} to={142.7} title="Planifier">
      <Abs x={60} y={470} w={960} style={{display: 'flex', alignItems: 'center', gap: 20, opacity: pop(t, 127.2)}}>
        <div style={{transform: `scale(${Math.min(1, spring(t, 127.2, 8, 12))})`}}><F n="bouclier" size={110} /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: P_}}>le bouclier anti-échec · la plus cruciale</div>
      </Abs>
      <Blinds src="induction/reunion-audit.jpg" x={60} y={620} w={600} h={400} at={130.4}>
        <div style={{position: 'absolute', left: lerp(60, 380, prog(t, 132.3, 134.6, easeInOut)), top: lerp(220, 90, prog(t, 132.3, 134.6, easeInOut)), opacity: pop(t, 132.3)}}><F n="loupe" size={130} /></div>
        <div style={{position: 'absolute', left: 14, bottom: 14}}><Pill at={133.4} c={P_} size={22}>analyser la situation de départ</Pill></div>
      </Blinds>
      <Abs x={690} y={620} w={330} h={400} style={{opacity: pop(t, 135.5)}}>
        <div style={{position: 'absolute', left: 25, top: 30}}><F n="cible" size={280} /></div>
        <div style={{position: 'absolute', left: lerp(-300, 150, hit), top: lerp(0, 150, hit), width: 120, height: 10, background: INK, borderRadius: 5, transform: 'rotate(30deg)'}} />
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: P_}}>une cible claire</div>
      </Abs>
      <Abs x={60} y={1060} w={960} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16}}>
        <Pill at={138.7} c={P_} size={30}>ressources</Pill><div style={{fontWeight: 900, fontSize: 44, opacity: pop(t, 139.6)}}>→</div><Pill at={140.6} c={INK} size={30}>plan d’action solide comme un roc</Pill>
      </Abs>
      {t > 141 && <Abs x={460} y={1150} style={{transform: `translateY(${(1 - Math.min(1, spring(t, 141.1, 9, 13))) * -300}px)`}}><F n="montagne" size={150} /></Abs>}
    </Etape>
  );
};
const Deployer: React.FC = () => {
  const t = useT();
  return (
    <Etape q={1} from={142.8} to={160.8} title="Déployer">
      <Deep src="promo/hse-machine.jpg" x={60} y={480} w={960} h={420} at={148.3} pos="45% 30%">
        <div style={{position: 'absolute', left: 20, bottom: 20}}><Pill at={148.5} c={D_} size={28}>les mains dans le cambouis</Pill></div>
      </Deep>
      <Abs x={110} y={940} w={860} style={{display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 10}}>
        {Array.from({length: 16}, (_, k) => {
          const a = 151.0 + Math.floor(k / 8) * 1.2 + (k % 8) * 0.05;
          return <div key={k} style={{height: 70, borderRadius: 12, background: t > a ? D_ : '#fff', border: `4px solid ${D_}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 36, transform: `translateY(${t > a && t < a + 0.25 ? -10 : 0}px)`}}>{t > a ? '✓' : ''}</div>;
        })}
      </Abs>
      <Center y={1130}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: D_, opacity: pop(t, 153.3)}}>discipline militaire</div></Center>
      <Abs x={0} y={1210} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={158.4} c={INK} size={30}>réflexion → actions hyper précises</Pill></Abs>
    </Etape>
  );
};
const Controler: React.FC = () => {
  const t = useT();
  const blind = prog(t, 165.9, 166.5, easeOut);
  const bars = [{l: 'attendu', v: 0.8, c: '#C3CAD6'}, {l: 'obtenu', v: 0.62, c: C_}];
  const adj = prog(t, 175.4, 177.0, easeInOut);
  return (
    <Etape q={2} from={161.0} to={177.9} title="Contrôler">
      <Abs x={60} y={470} w={960} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, opacity: pop(t, 164.1)}}>
        <div style={{position: 'relative'}}><F n="yeux" size={110} /><div style={{position: 'absolute', left: -10, top: 48, width: 130, height: 12, background: RED, borderRadius: 6, transform: `rotate(-35deg) scaleX(${blind})`}} /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>agir à l’aveugle ? ça ne sert à rien</div>
      </Abs>
      <Deep src="iso26/analyste-kpi.jpg" x={60} y={620} w={520} h={460} at={167.4} />
      <Abs x={620} y={640} w={400} h={420} style={{background: '#fff', borderRadius: 24, boxShadow: '0 16px 34px rgba(20,33,61,0.15)', padding: 26, boxSizing: 'border-box', opacity: pop(t, 168.4)}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: C_}}>mesurer froidement</div>
        <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: 260, marginTop: 14}}>
          {bars.map((b, k) => <div key={k} style={{textAlign: 'center'}}><div style={{width: 90, height: 240 * b.v * prog(t, 169.9 + k * 0.6, 171.0 + k * 0.6, easeOut) * (k === 1 ? 1 + adj * 0.28 : 1), background: b.c, borderRadius: '10px 10px 0 0'}} /><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 22, marginTop: 6}}>{b.l}</div></div>)}
        </div>
      </Abs>
      <Abs x={0} y={1120} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={172.1} c={C_} size={30}>a-t-on touché la cible ?</Pill><Pill at={175.4} c={INK} size={30}>ajuster le tir</Pill></Abs>
      <Cite y={1210} at={169.9} text="graphique illustratif, sans valeur chiffrée" />
    </Etape>
  );
};

/* ═════════════ PARTIE 3 ═════════════ */
const Racines: React.FC = () => {
  const t = useT();
  const cut = prog(t, 193.9, 194.5, easeIn);
  const regrow = prog(t, 195.0, 196.2, easeOut);
  const pull = prog(t, 196.6, 197.8, easeInOut);
  return (
    <Out end={206.5}>
      <Center y={320}><Kin text="Les superpouvoirs" at={186.8} size={64} color={C_} /></Center>
      <Abs x={0} y={420} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, opacity: pop(t, 192.1)}}>
        <F n="eclair" size={100} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44}}>un vrai catalyseur</div>
      </Abs>
      <Abs x={60} y={560} w={960} h={460} style={{borderRadius: 30, overflow: 'hidden', background: 'linear-gradient(180deg, #E8F4FF 0 45%, #D9C4A3 45%)', boxShadow: '0 20px 40px rgba(20,33,61,0.15)', opacity: pop(t, 193.6)}}>
        <div style={{position: 'absolute', left: 120, top: 120 - pull * 120}}>
          <div style={{transform: `scaleY(${t < 195 ? 1 - cut * 0.7 : 0.3 + regrow * 0.7})`, transformOrigin: 'bottom'}}><F n="herbe" size={160} /></div>
          <svg width={160} height={200} style={{position: 'absolute', left: 0, top: 150, opacity: pull > 0 ? 1 : 0.6}}><path d="M80 0 L80 60 M80 30 L40 90 M80 40 L120 110 M80 60 L70 150 M40 90 L20 140 M120 110 L140 170" stroke="#7A5230" strokeWidth={6} fill="none" /></svg>
        </div>
        <div style={{position: 'absolute', left: 30, top: 20}}><Pill at={193.7} c={DIM} size={24}>couper les mauvaises herbes ?</Pill></div>
        <div style={{position: 'absolute', right: 30, top: 20}}><Pill at={196.6} c={GREEN} size={24}>s’attaquer aux racines ✓</Pill></div>
        <div style={{position: 'absolute', right: 120, top: 120, opacity: pop(t, 199.2)}}><F n="ampoule" size={150} float={6} /></div>
      </Abs>
      <Abs x={0} y={1060} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}>
        <Pill at={199.2} c={C_} size={28}>nouvelles solutions</Pill><Pill at={200.8} c={C_} size={28}>gains de performance</Pill>
      </Abs>
      <Abs x={0} y={1160} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={203.8} c={GOLD} size={34}>innovation constante</Pill></Abs>
    </Out>
  );
};
const Ressort: React.FC = () => {
  const t = useT();
  const k = t - 217.4;
  const sq = k > 0 ? 1 - Math.exp(-k * 1.6) * Math.cos(k * 9) * 0.6 : 0.4;
  const coil = (h: number) => {
    const n = 9;
    let d = 'M100 0';
    for (let i = 1; i <= n * 2; i++) d += ` L${i % 2 ? 20 : 180} ${(i / (n * 2)) * h}`;
    return d + ` L100 ${h}`;
  };
  const H = 120 + sq * 260;
  return (
    <Out end={223.8}>
      <Center y={320}><Kin text="Le paradoxe : rigueur = agilité" at={206.6} size={50} color={C_} /></Center>
      <Abs x={60} y={430} w={420} h={420} style={{borderRadius: 26, background: '#fff', boxShadow: '0 14px 30px rgba(20,33,61,0.12)', opacity: pop(t, 207.2), backgroundImage: 'linear-gradient(#DDE3EC 3px, transparent 3px), linear-gradient(90deg, #DDE3EC 3px, transparent 3px)', backgroundSize: '60px 60px'}}>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>cadre ultra structuré</div>
      </Abs>
      <Abs x={540} y={430} w={480} h={560} style={{opacity: pop(t, 214.9)}}>
        <svg width={200} height={420} style={{position: 'absolute', left: 140, top: 440 - H}}><path d={coil(H)} stroke={C_} strokeWidth={10} fill="none" strokeLinejoin="round" /></svg>
        <div style={{position: 'absolute', left: 120, top: 440 - H - 30, width: 240, height: 34, borderRadius: 10, background: INK}} />
        <div style={{position: 'absolute', left: 100, top: 450, width: 280, height: 24, borderRadius: 8, background: '#8D96A6'}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 490, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: C_}}>un ressort bien tendu</div>
      </Abs>
      <Abs x={0} y={1060} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}>
        <Pill at={212.6} c={INK} size={28}>remises en question régulières</Pill><Pill at={214.9} c={C_} size={28}>hyper souple</Pill>
      </Abs>
      <Abs x={0} y={1160} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={219.8} c={GOLD} size={32}>réactivité bluffante</Pill></Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 4 ═════════════ */
const PasMagique: React.FC = () => {
  const t = useT();
  const cross = prog(t, 228.6, 229.2, easeOut);
  const crash = prog(t, 234.3, 234.9, easeIn);
  return (
    <Out end={237.6}>
      <Abs x={0} y={380} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 26}}>
        <div style={{position: 'relative', opacity: pop(t, 228.3)}}><F n="baguette" size={160} /><div style={{position: 'absolute', left: -10, top: 70, width: 190, height: 16, background: RED, borderRadius: 8, transform: `rotate(-35deg) scaleX(${cross})`}} /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: INK}}>la méthode magique<br />n’existe pas</div>
      </Abs>
      <Abs x={0} y={700} w={1080} h={440}>
        <div style={{position: 'absolute', left: 760, top: 0, width: 90, height: 420, display: 'grid', gridTemplateRows: 'repeat(7, 1fr)', gap: 4, opacity: pop(t, 233.7)}}>
          {Array.from({length: 7}, (_, k) => <div key={k} style={{borderRadius: 4, background: 'linear-gradient(180deg, #D98C5F, #B5653B)', transform: crash > 0.9 ? `translate(${(random(`w${k}`) - 0.2) * 60}px, ${(random(`v${k}`) - 0.5) * 40}px) rotate(${(random(`u${k}`) - 0.5) * 30}deg)` : 'none'}} />)}
        </div>
        <div style={{position: 'absolute', left: lerp(60, 520, crash), top: 120, transform: `rotate(${crash * 300}deg)`, opacity: pop(t, 233.7)}}><Wheel size={220} rot={0} labels={false} /></div>
        <div style={{position: 'absolute', left: 60, top: 370}}><Pill at={232.8} c={A_} size={28}>angles morts</Pill></div>
      </Abs>
      <Stamp at={234.9} c={RED} text="droit dans le mur" x={280} y={1170} rot={-5} size={50} />
    </Out>
  );
};
const Crise: React.FC = () => {
  const t = useT();
  const wipe = prog(t, 243.4, 244.4, easeInOut);
  const heavy = prog(t, 253.0, 255.0, easeInOut);
  const shake = t > 244.4 && t < 250 ? Math.sin(t * 60) * 5 : 0;
  return (
    <Out end={258.8}>
      <Center y={300}><Kin text="Imaginons le contraste" at={237.5} size={56} /></Center>
      <Abs x={30} y={400} w={500} h={820} style={{borderRadius: 28, background: '#E8F6EF', overflow: 'hidden', opacity: pop(t, 237.6)}}>
        <Img src={PH('verites/groupe.jpg')} style={{position: 'absolute', left: 0, top: 0, width: '100%', height: 330, objectFit: 'cover'}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 300, textAlign: 'center'}}><span style={{padding: '8px 20px', borderRadius: 30, background: GREEN, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>scénario de rêve</span></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 400, display: 'flex', justifyContent: 'center'}}><div style={{transform: `rotate(${t * 15}deg)`}}><Wheel size={220} rot={0} /></div></div>
        <div style={{position: 'absolute', left: 20, right: 20, top: 650, display: 'flex', flexDirection: 'column', gap: 10, fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: GREEN}}>
          <div style={{opacity: pop(t, 239.8)}}>✓ on a le temps</div><div style={{opacity: pop(t, 240.7)}}>✓ on planifie</div><div style={{opacity: pop(t, 241.7)}}>✓ on s’améliore doucement</div>
        </div>
      </Abs>
      <Abs x={550} y={400} w={500} h={820} style={{borderRadius: 28, background: '#FDECEC', overflow: 'hidden', clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0 round 28px)`, transform: `translateX(${shake}px)`}}>
        <Img src={PH('smi/fumees.jpg')} style={{position: 'absolute', left: 0, top: 0, width: '100%', height: 330, objectFit: 'cover'}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 300, textAlign: 'center'}}><span style={{padding: '8px 20px', borderRadius: 30, background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>incendie · crise</span></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 400 + heavy * 50, display: 'flex', justifyContent: 'center', filter: `grayscale(${heavy})`}}><div style={{transform: `rotate(${(1 - heavy) * t * 15}deg) scale(${1 + heavy * 0.15})`}}><Wheel size={220} rot={0} /></div></div>
        {heavy > 0.2 && <div style={{position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: RED, opacity: heavy}}>trop lourde !</div>}
        <div style={{position: 'absolute', left: 20, right: 20, top: 690, display: 'flex', flexDirection: 'column', gap: 10, fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: RED}}>
          <div style={{opacity: pop(t, 247.6)}}>⚠ urgence absolue</div><div style={{opacity: pop(t, 248.9)}}>⏱ réagir à la seconde</div>
        </div>
      </Abs>
      <Stamp at={256.0} c={RED} text="pas taillée pour l'urgence" x={120} y={1240} rot={-4} size={40} />
    </Out>
  );
};
const Cout: React.FC = () => {
  const t = useT();
  const C = [{l: 'temps', ic: 'sablier', a: 267.0}, {l: 'formation', ic: 'ecole', a: 268.1}, {l: 'ressources humaines', ic: 'equipe', a: 268.6}];
  return (
    <Out end={277.2}>
      <Center y={320}><Kin text="Le grand oublié : le coût" at={258.9} size={56} color={A_} /></Center>
      <Abs x={0} y={440} w={1080} h={440}>
        {Array.from({length: 14}, (_, k) => {
          const p = Math.min(1, spring(t, 264.0 + k * 0.12, 9, 14));
          return <div key={k} style={{position: 'absolute', left: 430 + (k % 2) * 14, top: 400 - k * 26 - (1 - Math.max(0, p)) * 400, width: 220, height: 34, borderRadius: '50%', background: `linear-gradient(180deg, #FFE27A, ${GOLD} 60%, #B07D00)`, boxShadow: '0 4px 0 #8A5F00', opacity: t > 264 + k * 0.12 ? 1 : 0}} />;
        })}
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#B07D00', opacity: pop(t, 265.0)}}>investissement colossal</div>
      </Abs>
      <Abs x={0} y={930} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 50}}>
        {C.map((c, k) => <div key={k} style={{textAlign: 'center', opacity: pop(t, c.a), transform: `translateY(${(1 - pop(t, c.a)) * 30}px)`}}><F n={c.ic} size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>{c.l}</div></div>)}
      </Abs>
      <Abs x={0} y={1160} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={270.1} c={GOLD} size={30}>un vrai luxe</Pill><Pill at={273.4} c={A_} size={30}>moyens limités ?</Pill></Abs>
    </Out>
  );
};
const Limites: React.FC = () => {
  const t = useT();
  const L = [{l: 'Très lente', s: 'planifiée sur de longues périodes', ic: 'escargot', a: 278.1}, {l: 'Tue l’initiative spontanée', s: 'une camisole de force', ic: 'cadenas', a: 284.2}, {l: 'Usine à gaz', s: 'face à l’imprévu', ic: 'usine', a: 291.8}];
  return (
    <Out end={293.9}>
      <Center y={320}><Kin text="Si on résume…" at={277.3} size={60} color={A_} /></Center>
      {L.map((c, k) => (
        <Card key={k} x={80} y={440 + k * 270} w={920} h={240} at={c.a} c={A_}>
          <div style={{display: 'flex', alignItems: 'center', gap: 26}}>
            <div style={{width: 130, flexShrink: 0, transform: k === 0 ? `rotate(${Math.sin(t * 2) * 6}deg)` : 'none'}}><F n={c.ic} size={130} /></div>
            <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: INK}}>{c.l}</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 30, color: DIM}}>{c.s}</div></div>
          </div>
        </Card>
      ))}
    </Out>
  );
};
const Dilemme: React.FC = () => {
  const t = useT();
  const tilt = t < 302.2 ? lerp(0, -12, prog(t, 298.3, 300.0, easeInOut)) : t < 309 ? lerp(-12, 12, prog(t, 302.2, 304.0, easeInOut)) : Math.sin((t - 309) * 2.2) * 12 * Math.max(0, 1 - (t - 309) / 8);
  const storm = t > 306.6 && t < 307.6 ? Math.abs(Math.sin((t - 306.6) * 20)) : 0;
  return (
    <Out end={OUTRO_AT}>
      {storm > 0 && <AbsoluteFill style={{background: `rgba(255,255,255,${storm * 0.8})`, zIndex: 20}} />}
      <Center y={320}><Kin text="Le casse-tête du leader" at={294.0} size={58} /></Center>
      <Abs x={60} y={580} w={960} h={520} style={{opacity: pop(t, 297.7)}}>
        <div style={{position: 'absolute', left: 470, top: 120, width: 20, height: 380, background: DIM, borderRadius: 10}} />
        <div style={{position: 'absolute', left: 380, top: 480, width: 200, height: 26, borderRadius: 10, background: INK}} />
        <div style={{position: 'absolute', left: 60, top: 110, width: 840, height: 18, background: INK, borderRadius: 9, transform: `rotate(${tilt}deg)`}}>
          <div style={{position: 'absolute', left: -50, top: -210, width: 300, height: 200, borderRadius: 24, background: '#fff', border: `6px solid ${P_}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `rotate(${-tilt}deg)`}}>
            <Wheel size={90} rot={t * 20} labels={false} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: P_, textAlign: 'center'}}>structurer à long terme<br />→ excellence</div>
          </div>
          <div style={{position: 'absolute', right: -50, top: -210, width: 300, height: 200, borderRadius: 24, background: '#fff', border: `6px solid ${A_}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `rotate(${-tilt}deg)`, opacity: pop(t, 302.9)}}>
            <F n="eclair" size={90} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: A_, textAlign: 'center'}}>trancher en une<br />fraction de seconde</div>
          </div>
        </div>
      </Abs>
      <Abs x={60} y={1110} w={960} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16}}>
        <Pill at={308.9} c={A_} size={28}>sacrifier la méthode ?</Pill><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, opacity: pop(t, 311.0)}}>ou</div><Pill at={311.5} c={P_} size={28}>risquer l’inertie ?</Pill>
      </Abs>
      {t > 314.3 && <Abs x={40} y={1180} w={1000}><Slope at={314.3} climb={lerp(0.3, 0.75, prog(t, 314.3, 318.5, easeInOut))} /></Abs>}
      {t > 316 && <Dust n={20} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...PARTS.flatMap((p) => [{at: p.at, s: 'riser', v: 0.25, dur: 1}, ...rep(p.at, 8, 0.1, 'sfx/click', 0.12), ...flaps(p.at + 0.5, 12), {at: p.at + 1.1, s: 'bass-hit', v: 0.3}, {at: p.at + 3.0, s: 'sfx/swish', v: 0.4}]),
  // intro
  ...rep(8.95, 4, 0.07, 'sfx/thud', 0.28), {at: 12.0, s: 'soft-whoosh', v: 0.3}, {at: 16.2, s: 'sfx/pop', v: 0.25}, {at: 14.7, s: 'sfx/ding', v: 0.22},
  {at: 19.2, s: 'sfx/pop', v: 0.22}, {at: 22.5, s: 'sfx/swish', v: 0.3}, ...rep(24.6, 6, 0.08, 'sfx/thud', 0.2), {at: 26.2, s: 'sfx/whoosh', v: 0.3}, {at: 29.6, s: 'sfx/ding', v: 0.25}, {at: 33.9, s: 'tampon', v: 0.45},
  ...[39.9, 42.8, 44.6, 47.4].map((a) => ({at: a, s: 'sfx/ding', v: 0.22})),
  // partie 1
  {at: 55.8, s: 'sfx/swish', v: 0.25}, {at: 59.4, s: 'soft-whoosh', v: 0.45, dur: 1.5}, {at: 61.0, s: 'sfx/whoosh', v: 0.35}, {at: 64.6, s: 'sfx/swish', v: 0.3}, {at: 66.5, s: 'sfx/rise', v: 0.25},
  ...[74.7, 75.9, 76.6, 77.2].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 80.9, s: 'sfx/pop', v: 0.22}, {at: 82.2, s: 'sfx/swish', v: 0.3}, {at: 88.5, s: 'deep-hit', v: 0.45}, {at: 88.6, s: 'tampon', v: 0.4},
  // partie 2
  ...rep(99.5, 8, 0.3, 'sfx/click', 0.14), ...[108.3, 109.5, 111.3, 112.8].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 116.0, s: 'sfx/rise', v: 0.3}, {at: 121.4, s: 'validation', v: 0.3},
  {at: 127.2, s: 'sfx/ding', v: 0.25}, {at: 130.4, s: 'soft-whoosh', v: 0.25, dur: 1}, {at: 132.3, s: 'sfx/swish', v: 0.25}, {at: 135.5, s: 'sfx/whoosh', v: 0.3}, {at: 136.2, s: 'sfx/thud', v: 0.4}, {at: 141.1, s: 'sfx/thud', v: 0.35},
  {at: 148.3, s: 'soft-whoosh', v: 0.3}, ...rep(151.0, 8, 0.05, 'sfx/click', 0.18), ...rep(152.2, 8, 0.05, 'sfx/click', 0.18), {at: 158.4, s: 'sfx/ding', v: 0.22},
  {at: 165.9, s: 'sfx/swish', v: 0.3}, {at: 167.4, s: 'soft-whoosh', v: 0.25}, {at: 169.9, s: 'sfx/rise', v: 0.2}, {at: 172.1, s: 'sfx/pop', v: 0.22}, {at: 175.4, s: 'sfx/ding', v: 0.25},
  // partie 3
  {at: 192.1, s: 'sfx/pop', v: 0.25}, {at: 193.9, s: 'sfx/swish', v: 0.35}, {at: 195.0, s: 'sfx/rise', v: 0.2}, {at: 196.6, s: 'sfx/whoosh', v: 0.3}, {at: 199.2, s: 'sfx/ding', v: 0.25}, {at: 203.8, s: 'validation', v: 0.3},
  {at: 207.2, s: 'sfx/pop', v: 0.22}, {at: 217.4, s: 'bass-hit', v: 0.3}, ...rep(217.6, 4, 0.35, 'sfx/thud', 0.15), {at: 219.8, s: 'sfx/ding', v: 0.25},
  // partie 4
  {at: 228.6, s: 'sfx/swish', v: 0.3}, {at: 233.7, s: 'sfx/whoosh', v: 0.3}, {at: 234.9, s: 'deep-hit', v: 0.45}, {at: 235.0, s: 'tampon', v: 0.4},
  {at: 243.4, s: 'sfx/whoosh', v: 0.35}, {at: 244.4, s: 'tension', v: 0.3, dur: 5}, {at: 253.0, s: 'sfx/thud', v: 0.35}, {at: 256.0, s: 'tampon', v: 0.45},
  ...rep(264.0, 14, 0.12, 'sfx/click', 0.18), ...[267.0, 268.1, 268.6].map((a) => ({at: a, s: 'sfx/pop', v: 0.22})), {at: 270.1, s: 'sfx/ding', v: 0.25},
  ...[278.1, 284.2, 291.8].map((a) => ({at: a, s: 'sfx/thud', v: 0.35})),
  {at: 297.7, s: 'soft-whoosh', v: 0.3}, {at: 302.2, s: 'sfx/swish', v: 0.3}, {at: 306.6, s: 'deep-hit', v: 0.4}, {at: 308.9, s: 'sfx/pop', v: 0.22}, {at: 311.5, s: 'sfx/pop', v: 0.22}, {at: 314.3, s: 'riser', v: 0.3, dur: 4}, {at: 317.0, s: 'bass-hit', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Deming: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={7.0} to={19.1}><Intro /></Gate>
    <Gate from={19.0} to={36.9}><Hasard /></Gate>
    <Gate from={36.8} to={50.5}><Programme /></Gate>
    <Gate from={53.3} to={70.3}><Rideau /></Gate>
    <Gate from={70.2} to={93.3}><LaRoue /></Gate>
    <Gate from={96.6} to={123.1}><Mecanique /></Gate>
    <Gate from={123.0} to={142.8}><Planifier /></Gate>
    <Gate from={142.7} to={160.9}><Deployer /></Gate>
    <Gate from={160.8} to={178.0}><Controler /></Gate>
    <Gate from={181.3} to={206.6}><Racines /></Gate>
    <Gate from={206.5} to={223.9}><Ressort /></Gate>
    <Gate from={228.4} to={237.7}><PasMagique /></Gate>
    <Gate from={237.4} to={258.9}><Crise /></Gate>
    <Gate from={258.8} to={277.3}><Cout /></Gate>
    <Gate from={277.2} to={294.0}><Limites /></Gate>
    <Gate from={293.9} to={OUTRO_AT}><Dilemme /></Gate>
    {PARTS.map((p, i) => <Gate key={p.n} from={p.at} to={p.at + 3.8}><TourDeRoue i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={318.7}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-roue-deming-origine.m4a')} trimAfter={s(318.8)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

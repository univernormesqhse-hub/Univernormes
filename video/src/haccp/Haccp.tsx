import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s, sansFont} from '../theme';
import {Abs, Bg, BLUE, Chip, DIM, easeIn, easeInOut, easeOut, GREEN, Hand, INK, lerp, LOGO, Mark, PAPER, PH, Photo, pop, prog, RED, Row, Sc, spring, T, Title, useT} from '../implIso/kit';
import {captions} from './captions';

/**
 * « Maîtriser les PRP, PRPo et CCP » (1 min 07) — voix d'origine, sous-titres recalés mot à mot, photos réelles,
 * thème « papier quadrillé » de la série.
 * Fil rouge inédit : la ligne de production de jus et sa bouteille qui franchit les trois barrières PRP → PRPo → CCP
 * (en-tête). Transitions : l'écran se remplit de jus — une vague monte, des bulles portent le nom de la barrière — puis
 * se vide.
 * Autres techniques nouvelles : trois gants de boxe de puissance croissante, serpillière qui fait briller le sol, bactérie
 * qui survit dans la bouteille, tuyau d'eau contaminée, filtre dont la maille retient les germes, thermomètre qui grimpe,
 * double cadran temps / température avec limites, voyant rouge et barrière qui bloque la bouteille, pyramide de la
 * hiérarchie, scellé « sécurité sanitaire garantie ».
 */
const ORANGE = '#F28C1E';
const JUICE = '#F7A21B';
const OUTRO_AT = 67.0;
export const HACCP_FRAMES = s(OUTRO_AT + 3.8);
type B = {n: number; k: string; l: string; sub: string; at: number; end: number; c: string};
const BAR: B[] = [
  {n: 1, k: 'PRP', l: 'Programmes prérequis', sub: 'L’hygiène de base', at: 12.3, end: 26.7, c: GREEN},
  {n: 2, k: 'PRPo', l: 'PRP opérationnel', sub: 'La mesure essentielle', at: 26.7, end: 40.3, c: ORANGE},
  {n: 3, k: 'CCP', l: 'Point critique pour la maîtrise', sub: 'L’ultime barrière', at: 40.3, end: 49.9, c: RED},
];
const WIPE = 1.8;

/** Bouteille de jus. f = remplissage, germ = bactéries visibles, seal = capsule scellée. */
const Bottle: React.FC<{h: number; f?: number; germ?: number; seal?: boolean}> = ({h, f = 0.8, germ = 0, seal = false}) => {
  const w = h * 0.42;
  return (
    <svg width={w} height={h} viewBox="0 0 42 100">
      <defs><clipPath id={`bt${Math.round(h)}`}><path d="M 15 2 L 27 2 L 27 18 Q 40 26 40 40 L 40 94 Q 40 98 36 98 L 6 98 Q 2 98 2 94 L 2 40 Q 2 26 15 18 Z" /></clipPath></defs>
      <g clipPath={`url(#bt${Math.round(h)})`}>
        <rect x={0} y={0} width={42} height={100} fill="#EAF6FF" />
        <rect x={0} y={100 - f * 80} width={42} height={100} fill={JUICE} />
        {germ > 0 && [0, 1, 2].map((i) => <circle key={i} cx={12 + i * 9} cy={60 + (i % 2) * 14} r={3.2} fill={GREEN} stroke={INK} strokeWidth={0.8} opacity={germ} />)}
      </g>
      <path d="M 15 2 L 27 2 L 27 18 Q 40 26 40 40 L 40 94 Q 40 98 36 98 L 6 98 Q 2 98 2 94 L 2 40 Q 2 26 15 18 Z" fill="none" stroke={INK} strokeWidth={2} />
      <rect x={13} y={0} width={16} height={7} rx={2} fill={seal ? GREEN : RED} stroke={INK} strokeWidth={1.5} />
      <rect x={6} y={50} width={30} height={20} rx={3} fill="#fff" stroke={INK} strokeWidth={1.2} />
      <text x={21} y={63} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={7} fill={INK}>JUS</text>
    </svg>
  );
};

/** Fil rouge : la ligne de production et ses 3 barrières ; pos ∈ [0, 3] (barrières franchies). */
const Line: React.FC<{w: number; pos: number}> = ({w, pos}) => {
  const h = w * 0.22;
  const gx = (i: number) => w * (0.25 + i * 0.25);
  return (
    <div style={{position: 'relative', width: w, height: h}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: h * 0.14, borderRadius: h * 0.07, background: '#8C9AB8'}} />
      {BAR.map((b, i) => (
        <div key={i} style={{position: 'absolute', left: gx(i) - h * 0.2, bottom: h * 0.14, width: h * 0.4, height: h * 0.8, borderRadius: `${h * 0.08}px ${h * 0.08}px 0 0`, border: `${Math.max(2, h * 0.04)}px solid ${b.c}`, borderBottom: 'none', background: pos > i + 0.5 ? `${b.c}33` : 'transparent', display: 'flex', alignItems: 'flex-start', justifyContent: 'center'}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: h * 0.16, color: b.c, marginTop: h * 0.04}}>{b.k}</div>
        </div>
      ))}
      <div style={{position: 'absolute', left: lerp(w * 0.04, w * 0.92, pos / 3) - h * 0.12, bottom: h * 0.14}}><Bottle h={h * 0.6} seal={pos >= 3} /></div>
    </div>
  );
};
const linePos = (t: number) => BAR.reduce((acc, b) => acc + prog(t, b.at + WIPE, b.end - 0.3, (x) => x), 0);

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('iso26/labo-manuel.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 940, objectFit: 'cover', objectPosition: '50% 40%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 30%, ${PAPER}DD 44%, ${PAPER} 50%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={50} y={790} w={980} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>HACCP · SÉCURITÉ DES ALIMENTS</div>
        <T size={100} style={{marginTop: 20, textTransform: 'uppercase', letterSpacing: -3}}>Maîtriser les</T>
        <div style={{display: 'flex', justifyContent: 'center', gap: 18, marginTop: 10}}>{BAR.map((b) => <div key={b.k} style={{padding: '6px 26px', borderRadius: 22, background: b.c}}><T size={96} color="#fff">{b.k}</T></div>)}</div>
        <Hand size={54} color={DIM} style={{marginTop: 18}}>Trois barrières, trois forces de frappe</Hand>
      </Abs>
      <Abs x={140} y={1330}><Line w={800} pos={3} /></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : l'écran se remplit de jus ─────────── */
const JuiceWipe: React.FC<{p: B}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const up = prog(t, a, a + 0.55, easeOut);
  const down = prog(t, b - 0.5, b, easeIn);
  const level = 1920 * (1 - up + down);
  const wave = (ph: number) => {
    let d = `M 0 ${level}`;
    for (let x = 0; x <= 1080; x += 40) d += ` L ${x} ${level + Math.sin(x / 90 + t * 9 + ph) * 26}`;
    return d + ' L 1080 1920 L 0 1920 Z';
  };
  return (
    <AbsoluteFill style={{zIndex: 55, pointerEvents: 'none'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={wave(1.5)} fill="#FFC453" />
        <path d={wave(0)} fill={JUICE} />
      </svg>
      {Array.from({length: 18}, (_, i) => {
        const r = 10 + random(`b${i}`) * 26;
        const y = 1920 - ((t - a) * (300 + random(`v${i}`) * 400) + random(`y${i}`) * 1900) % 1920;
        return y > level + 30 ? <div key={i} style={{position: 'absolute', left: random(`x${i}`) * 1040, top: y, width: r, height: r, borderRadius: r, border: '3px solid #ffffffAA'}} /> : null;
      })}
      <div style={{position: 'absolute', left: 0, right: 0, top: Math.max(level, 0) + 500, textAlign: 'center', opacity: up * (1 - down)}}>
        <div style={{display: 'inline-block', padding: '10px 40px', borderRadius: 30, background: p.c}}><T size={150} color="#fff">{p.k}</T></div>
        <T size={56} color={INK} style={{marginTop: 26}}>{p.l}</T>
        <Hand size={56} color="#fff" style={{marginTop: 10}}>{p.sub}</Hand>
      </div>
    </AbsoluteFill>
  );
};

/* ─────────── En-tête ─────────── */
const Header: React.FC = () => {
  const t = useT();
  const p = BAR.findIndex((x) => t >= x.at + WIPE - 0.3 && t < x.end);
  const intro = t > 2.6 && t < 12.0;
  const fin = t >= 49.9 && t < OUTRO_AT;
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 80, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {(intro || p >= 0 || fin) && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 210, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: intro ? pop(t, 2.6) * (1 - prog(t, 11.7, 12.0)) : p >= 0 ? pop(t, BAR[p].at + WIPE - 0.3) * (1 - prog(t, BAR[p].end - 0.3, BAR[p].end)) : pop(t, 49.9)}}>
          <Line w={170} pos={fin ? 3 : linePos(t)} />
          <div style={{padding: '6px 20px', borderRadius: 40, background: '#fff', border: `3px solid ${p >= 0 ? BAR[p].c : INK}`}}><T size={30}>{p >= 0 ? `${BAR[p].k} · ${BAR[p].sub}` : fin ? 'La hiérarchie HACCP' : 'PRP · PRPo · CCP'}</T></div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── INTRO ─────────── */
const Punch: React.FC = () => {
  const t = useT();
  const G = [{at: 2.9, k: 'PRP', s: 0.6, c: GREEN}, {at: 3.6, k: 'PRPo', s: 0.8, c: ORANGE}, {at: 4.3, k: 'CCP', s: 1, c: RED}];
  return (
    <AbsoluteFill>
      <Title>Pas la même <Mark c={RED} p={prog(t, 8.0, 8.8)}>force de frappe</Mark></Title>
      <Abs x={440} y={520} style={{transform: `scale(${1 + Math.max(0, Math.sin(Math.max(0, t - 8.9) * 12)) * 0.15 * (t < 9.6 ? 1 : 0)})`}}><F n="microbe" size={200} /></Abs>
      {G.map((g, i) => {
        const hit = t > 8.6 + i * 0.25 ? Math.max(0, Math.sin((t - 8.6 - i * 0.25) * 10)) : 0;
        return (
          <Abs key={i} x={70 + i * 330} y={880 - hit * 120} w={290} style={{textAlign: 'center', transform: `scale(${spring(t, g.at) * g.s})`, transformOrigin: '50% 100%'}}>
            <div style={{fontSize: 220, lineHeight: 1, filter: `hue-rotate(${i * 30}deg)`}}>🥊</div>
            <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 20, background: g.c, marginTop: 10}}><T size={52} color="#fff">{g.k}</T></div>
          </Abs>
        );
      })}
      <Row y={1380}><Chip c={INK} light size={36} style={{opacity: pop(t, 5.6)}}>Face aux risques d’intoxication</Chip></Row>
    </AbsoluteFill>
  );
};
const Launch: React.FC = () => {
  const t = useT();
  const off = (t - 9.7) * 180;
  return (
    <AbsoluteFill>
      <Title>Une <Mark c={ORANGE} p={prog(t, 10.7, 11.5)}>ligne de production de jus</Mark></Title>
      <Photo src="promo/hse-machine.jpg" x={60} y={460} w={960} h={520} pos="50% 40%" />
      <Abs x={0} y={1290} w={1080} h={40} style={{background: 'repeating-linear-gradient(90deg, #8C9AB8 0 30px, #A9B4CC 30px 60px)', backgroundPosition: `${off}px 0`}} />
      {Array.from({length: 6}, (_, i) => <Abs key={i} x={((i * 200 + off) % 1200) - 120} y={1060}><Bottle h={230} f={0.8} /></Abs>)}
    </AbsoluteFill>
  );
};

/* ─────────── PRP ─────────── */
const Mop: React.FC = () => {
  const t = useT();
  const clean = prog(t, 14.4, 16.4, (x) => x);
  return (
    <AbsoluteFill>
      <Title>L’<Mark c={GREEN} p={prog(t, 15.4, 16.1)}>hygiène de base</Mark></Title>
      <Abs x={60} y={900} w={960} h={420} style={{background: '#C9B48A', borderRadius: 24, overflow: 'hidden'}}>
        {Array.from({length: 14}, (_, i) => <div key={i} style={{position: 'absolute', left: random(`m${i}`) * 900, top: random(`n${i}`) * 380, width: 40 + random(`o${i}`) * 50, height: 20 + random(`p${i}`) * 20, borderRadius: '50%', background: '#7A5A3A', opacity: random(`m${i}`) * 960 > clean * 960 ? 0.8 : 0}} />)}
        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${clean * 100}%`, background: 'linear-gradient(90deg, #E9F6FF, #FFFFFF)', opacity: 0.85}} />
        {clean > 0.95 && Array.from({length: 6}, (_, i) => <div key={i} style={{position: 'absolute', left: 120 + i * 140, top: 80 + (i % 2) * 160, fontSize: 60, transform: `scale(${spring(t, 16.4 + i * 0.08)})`}}>✨</div>)}
      </Abs>
      <Abs x={60 + clean * 820} y={520} style={{transform: `rotate(${Math.sin(t * 8) * 12}deg)`, transformOrigin: '50% 100%'}}>
        <svg width={200} height={420}><rect x={95} y={0} width={14} height={340} fill="#8A5A2B" /><rect x={30} y={330} width={150} height={60} rx={10} fill="#5BB7E6" stroke={INK} strokeWidth={5} /></svg>
      </Abs>
      <Abs x={60} y={470} style={{opacity: pop(t, 12.6)}}><Chip c={GREEN} light size={34}>PRP = programmes prérequis</Chip></Abs>
      {clean > 0.95 && <Row y={1360}><div style={{transform: `scale(${spring(t, 16.4)})`}}><Chip c={GREEN} light size={40}>✓ Environnement sain</Chip></div></Row>}
    </AbsoluteFill>
  );
};
const Survivor: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Abs x={60} y={420} w={460} h={700} style={{background: '#fff', borderRadius: 30, border: `6px solid ${GREEN}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, opacity: pop(t, 17.0)}}>
        <F n="maison" size={200} /><T size={40}>Environnement sain</T><T size={80} color={GREEN}>✓</T>
      </Abs>
      <Abs x={560} y={420} w={460} h={700} style={{background: '#fff', borderRadius: 30, border: `6px solid ${RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: pop(t, 19.0)}}>
        <Bottle h={320} germ={prog(t, 19.6, 20.2)} /><T size={36} style={{textAlign: 'center'}}>Danger dans la boisson</T><T size={80} color={RED}>✗</T>
      </Abs>
      <Row y={1200}><Hand size={50} color={DIM} style={{opacity: pop(t, 20.0)}}>aucun danger spécifique neutralisé</Hand></Row>
    </AbsoluteFill>
  );
};
const Pipe: React.FC = () => {
  const t = useT();
  const flow = (t - 22) * 300;
  const alarm = t > 25.3 && Math.floor(t * 4) % 2 === 0;
  return (
    <AbsoluteFill>
      <Title size={48}>L’eau des machines est <Mark c={RED} p={prog(t, 24.8, 25.4)}>contaminée</Mark></Title>
      <Photo src="iso26/labo-manuel.jpg" x={60} y={440} w={960} h={420} pos="50% 50%" filter="saturate(0.6)" />
      <Abs x={0} y={980} w={1080} h={160} style={{background: '#9AA3B2', borderTop: `8px solid ${INK}`, borderBottom: `8px solid ${INK}`}}>
        <div style={{position: 'absolute', inset: 14, borderRadius: 60, background: '#7FC3EA', overflow: 'hidden'}}>
          {Array.from({length: 12}, (_, i) => <div key={i} style={{position: 'absolute', left: ((i * 110 + flow) % 1200) - 60, top: 30 + (i % 3) * 25, width: 30, height: 30, borderRadius: 15, background: GREEN, border: `3px solid ${INK}`, opacity: pop(t, 24.6)}} />)}
        </div>
      </Abs>
      {t > 25.3 && <Row y={1230}><Chip c={alarm ? RED : '#fff'} light={alarm} size={44} style={{border: `4px solid ${RED}`, color: alarm ? '#fff' : RED}}>⚠ Le risque persiste</Chip></Row>}
    </AbsoluteFill>
  );
};

/* ─────────── PRPo ─────────── */
const Filter: React.FC = () => {
  const t = useT();
  const flow = (t - 30.5) * 260;
  return (
    <AbsoluteFill>
      <Title>Un <Mark c={ORANGE} p={prog(t, 30.6, 31.3)}>filtre</Mark> à surveiller</Title>
      <Abs x={0} y={700} w={1080} h={180} style={{background: '#7FC3EA', borderTop: `8px solid ${INK}`, borderBottom: `8px solid ${INK}`, overflow: 'hidden'}}>
        {Array.from({length: 14}, (_, i) => {
          const x = ((i * 90 + flow) % 1300) - 100;
          const stop = Math.min(x, 470);
          return <div key={i} style={{position: 'absolute', left: i % 2 ? stop : x, top: 40 + (i % 3) * 35, width: 30, height: 30, borderRadius: 15, background: i % 2 ? GREEN : '#BEE3F8', border: i % 2 ? `3px solid ${INK}` : 'none'}} />;
        })}
      </Abs>
      <Abs x={490} y={640} w={70} h={300} style={{background: `repeating-linear-gradient(0deg, ${ORANGE} 0 6px, transparent 6px 16px), repeating-linear-gradient(90deg, ${ORANGE} 0 6px, transparent 6px 16px)`, border: `6px solid ${INK}`, borderRadius: 12}} />
      <Abs x={400} y={980} style={{opacity: pop(t, 31.7)}}><svg width={280} height={180}><path d="M 20 160 A 120 120 0 0 1 260 160" fill="none" stroke="#E3E6EC" strokeWidth={22} /><path d="M 20 160 A 120 120 0 0 1 200 60" fill="none" stroke={GREEN} strokeWidth={22} /><line x1={140} y1={160} x2={140 + Math.cos(-0.8 + Math.sin(t * 2) * 0.1) * 100} y2={160 + Math.sin(-0.8 + Math.sin(t * 2) * 0.1) * 100} stroke={RED} strokeWidth={8} /></svg><T size={30} style={{textAlign: 'center'}}>Surveillance</T></Abs>
      {t > 33.0 && <Row y={1300}><div style={{transform: `scale(${spring(t, 33.0)})`}}><Chip c={ORANGE} light size={38}>Mesure de maîtrise essentielle</Chip></div></Row>}
      {t > 34.4 && <Row y={1420}><Chip c="#fff" size={32} style={{border: `4px solid ${ORANGE}`, opacity: pop(t, 34.4)}}>🎯 un danger ciblé</Chip></Row>}
    </AbsoluteFill>
  );
};
const Thermo: React.FC = () => {
  const t = useT();
  const h = prog(t, 38.4, 40.0, easeInOut);
  return (
    <AbsoluteFill>
      <Title>L’<Mark c={RED} p={prog(t, 37.6, 38.3)}>ultime barrière</Mark></Title>
      <svg width={200} height={900} style={{position: 'absolute', left: 440, top: 470}}>
        <rect x={70} y={20} width={60} height={700} rx={30} fill="#fff" stroke={INK} strokeWidth={8} />
        <rect x={84} y={700 - h * 640} width={32} height={h * 640 + 40} fill={RED} />
        <circle cx={100} cy={790} r={80} fill={RED} stroke={INK} strokeWidth={8} />
      </svg>
      <Row y={1430}><Chip c={RED} light size={40} style={{opacity: pop(t, 39.1)}}>🔥 Traitement thermique</Chip></Row>
      <Abs x={90} y={900} style={{opacity: pop(t, 36.2)}}><Chip c={BLUE} light size={30}>Eau filtrée ✓</Chip></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── CCP ─────────── */
const Pasteur: React.FC = () => {
  const t = useT();
  const dev = t > 47.2;
  const tv = dev ? lerp(0.62, 0.32, prog(t, 47.2, 47.7)) : 0.62 + Math.sin(t * 3) * 0.04;
  const block = prog(t, 48.0, 48.4, easeOut);
  const D = ({x, v, l}: {x: number; v: number; l: string}) => {
    const a = -Math.PI + v * Math.PI;
    return (
      <Abs x={x} y={480} w={420} style={{textAlign: 'center'}}>
        <svg width={420} height={250}>
          <path d="M 30 220 A 180 180 0 0 1 390 220" fill="none" stroke="#E3E6EC" strokeWidth={30} />
          <path d={`M ${210 + Math.cos(-Math.PI + 0.45 * Math.PI) * 180} ${220 + Math.sin(-Math.PI + 0.45 * Math.PI) * 180} A 180 180 0 0 1 ${210 + Math.cos(-Math.PI + 0.85 * Math.PI) * 180} ${220 + Math.sin(-Math.PI + 0.85 * Math.PI) * 180}`} fill="none" stroke={GREEN} strokeWidth={30} />
          <line x1={210} y1={220} x2={210 + Math.cos(a) * 160} y2={220 + Math.sin(a) * 160} stroke={v < 0.45 ? RED : INK} strokeWidth={10} strokeLinecap="round" />
          <circle cx={210} cy={220} r={16} fill={INK} />
        </svg>
        <T size={38}>{l}</T>
      </Abs>
    );
  };
  return (
    <AbsoluteFill>
      <Title>Des <Mark c={RED} p={prog(t, 46.0, 46.7)}>limites strictes</Mark></Title>
      <D x={70} v={0.6 + Math.sin(t * 2) * 0.03} l="⏱ Temps" />
      <D x={590} v={tv} l="🌡 Température" />
      <Abs x={440} y={860} w={200} h={200} style={{borderRadius: 100, background: dev && Math.floor(t * 5) % 2 ? RED : '#E3E6EC', border: `8px solid ${INK}`, boxShadow: dev ? `0 0 60px ${RED}` : 'none'}} />
      <Abs x={120} y={1120} w={840} h={260}>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 26, background: '#8C9AB8', borderRadius: 13}} />
        <div style={{position: 'absolute', left: lerp(0, 330, prog(t, 46.5, 48.0, (x) => x))}}><Bottle h={230} /></div>
        <div style={{position: 'absolute', left: 470, bottom: 26, width: 30, height: 260, background: INK, borderRadius: 8}} />
        <div style={{position: 'absolute', left: 470, bottom: 200, width: 360, height: 40, transformOrigin: '0 50%', transform: `rotate(${(1 - block) * -80}deg)`, background: `repeating-linear-gradient(90deg, ${RED} 0 50px, #fff 50px 100px)`, borderRadius: 10}} />
      </Abs>
      {block > 0.9 && <Abs x={600} y={1000} style={{transform: `rotate(-10deg) scale(${spring(t, 48.4)})`, border: `6px solid ${RED}`, borderRadius: 14, padding: '4px 18px', background: '#ffffffee'}}><T size={50} color={RED}>PRODUIT BLOQUÉ</T></Abs>}
    </AbsoluteFill>
  );
};

/* ─────────── RÉSUMÉ & FIN ─────────── */
const Pyramid: React.FC = () => {
  const t = useT();
  const L = [{at: 51.0, k: 'PRP', s: 'Base hygiénique globale', c: GREEN, w: 920, y: 1180}, {at: 53.3, k: 'PRPo', s: 'Dangers opérationnels ciblés', c: ORANGE, w: 680, y: 950}, {at: 55.8, k: 'CCP', s: 'L’étape critique', c: RED, w: 440, y: 720}];
  return (
    <AbsoluteFill>
      <Title>La <Mark p={prog(t, 58.0, 58.7)}>hiérarchie</Mark> HACCP</Title>
      {L.map((l) => {
        const g = spring(t, l.at, 6, 11);
        return (
          <Abs key={l.k} x={540 - l.w / 2} y={l.y + (1 - g) * 300} w={l.w} h={210} style={{opacity: g, background: l.c, clipPath: 'polygon(8% 0, 92% 0, 100% 100%, 0 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <T size={64} color="#fff">{l.k}</T><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: '#fff'}}>{l.s}</div>
          </Abs>
        );
      })}
      {t > 59.4 && <Abs x={760} y={450} style={{transform: `scale(${spring(t, 59.4)}) rotate(8deg)`, textAlign: 'center'}}><F n="clipboard" size={150} /><Chip c={INK} light size={26}>Analyse des dangers</Chip></Abs>}
    </AbsoluteFill>
  );
};
const Exit: React.FC = () => {
  const t = useT();
  const x = lerp(-200, 380, prog(t, 61.2, 63.0, easeOut));
  return (
    <AbsoluteFill>
      <Abs x={140} y={420}><Line w={800} pos={3} /></Abs>
      <Abs x={x} y={720}><Bottle h={600} seal /></Abs>
      {t > 64.6 && <Abs x={600} y={980} style={{transform: `rotate(-8deg) scale(${spring(t, 64.6, 8, 16)})`}}>
        <svg width={360} height={360}>{Array.from({length: 24}, (_, i) => <path key={i} d="M 180 180 L 180 10 L 205 28 Z" fill={GREEN} transform={`rotate(${i * 15} 180 180)`} />)}<circle cx={180} cy={180} r={140} fill="#fff" stroke={GREEN} strokeWidth={10} /><text x={180} y={170} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={34} fill={GREEN}>SÉCURITÉ</text><text x={180} y={210} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={30} fill={INK}>GARANTIE</text></svg>
      </Abs>}
    </AbsoluteFill>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2}, ...[2.9, 3.6, 4.3].map((at) => ({at, s: 'sfx/pop', v: 0.3})),
  ...[8.75, 9.0, 9.25].map((at) => ({at, s: 'sfx/thud', v: 0.45})), {at: 8.8, s: 'deep-hit', v: 0.35},
  ...rep(9.8, 6, 0.4, 'sfx/click', 0.2),
  ...BAR.flatMap((p) => [{at: p.at, s: 'soft-whoosh', v: 0.5, dur: 1.2}, {at: p.at + 0.4, s: 'sfx/rise', v: 0.25}, ...rep(p.at + 0.3, 6, 0.15, 'sfx/pop', 0.14), {at: p.at + WIPE - 0.5, s: 'sfx/swish', v: 0.4}]),
  ...rep(14.4, 8, 0.25, 'sfx/swish', 0.12), {at: 16.4, s: 'sfx/ding', v: 0.3}, {at: 17.0, s: 'sfx/pop', v: 0.22}, {at: 19.0, s: 'sfx/pop', v: 0.22}, {at: 19.7, s: 'alarme', v: 0.08, dur: 0.5},
  {at: 22.2, s: 'soft-whoosh', v: 0.25, dur: 3}, {at: 25.3, s: 'alarme', v: 0.12, dur: 1.2},
  {at: 30.6, s: 'soft-whoosh', v: 0.25, dur: 3}, ...rep(31.0, 6, 0.3, 'sfx/click', 0.15), {at: 33.0, s: 'validation', v: 0.3}, {at: 34.4, s: 'sfx/pop', v: 0.25},
  {at: 38.4, s: 'sfx/rise', v: 0.35}, {at: 39.1, s: 'sfx/pop', v: 0.25},
  ...rep(43.6, 12, 0.3, 'tick', 0.18), {at: 47.2, s: 'alarme', v: 0.15, dur: 1.2}, {at: 48.0, s: 'sfx/thud', v: 0.5}, {at: 48.4, s: 'tampon', v: 0.55},
  ...[51.0, 53.3, 55.8].map((at) => ({at, s: 'sfx/thud', v: 0.4})), {at: 59.4, s: 'sfx/pop', v: 0.25},
  {at: 61.2, s: 'sfx/whoosh', v: 0.35}, {at: 64.6, s: 'tampon', v: 0.5}, {at: 64.7, s: 'validation', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];
const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

export const Haccp: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.0} to={12.4}>
      <Sc a={2.6} b={9.7}><Punch /></Sc>
      <Sc a={9.6} b={12.4}><Launch /></Sc>
    </Gate>
    <Gate from={13.9} to={26.8}>
      <Sc a={14.0} b={16.9}><Mop /></Sc>
      <Sc a={16.8} b={21.9}><Survivor /></Sc>
      <Sc a={21.8} b={26.7}><Pipe /></Sc>
    </Gate>
    <Gate from={28.3} to={40.4}>
      <Sc a={28.4} b={35.9}><Filter /></Sc>
      <Sc a={35.8} b={40.3}><Thermo /></Sc>
    </Gate>
    <Gate from={41.9} to={50.0}><Sc a={42.0} b={49.9}><Pasteur /></Sc></Gate>
    <Gate from={49.8} to={OUTRO_AT}>
      <Sc a={49.9} b={60.9}><Pyramid /></Sc>
      <Sc a={60.8} b={OUTRO_AT}><Exit /></Sc>
    </Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {BAR.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><JuiceWipe p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-prp-prpo-ccp-origine.m4a')} trimAfter={s(66.8)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

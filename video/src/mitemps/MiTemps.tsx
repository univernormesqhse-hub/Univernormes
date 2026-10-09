import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Gate, kf, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Check} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {handFont, s, sansFont} from '../theme';
import {captions} from './captions';

/**
 * « Le mi-temps thérapeutique » (4 min 46) — voix d'origine, transcription locale. Habillage « carnet santé » premium.
 * Techniques nouvelles dans la série : couverture titrée dès la première image (emblème horloge à moitié remplie),
 * cartes de chapitre en origami qui se déplient, classeur à onglets, mur contre escalier (rechute / reprise
 * progressive), curseur de comparaison glissant, ordonnance qui s'écrit, batterie qui se recharge en douceur, route
 * qui bifurque, réaction en chaîne de dominos pour les 4 acteurs, verre rempli par deux robinets, rosette « travail
 * effectif », bocal de congés, signature tracée, astérisque qui déploie la note de bas de page, brique contre plume,
 * balançoire à ressort qui cherche son équilibre.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 286.6;
export const MITEMPS_FRAMES = s(OUTRO_AT + 3.8);
const BG = '#F7F5EF';
const INK = '#10233F';
const DIM = 'rgba(16,35,63,0.6)';
const MINT = '#14B892';
const CORAL = '#FF6B5B';
const HL = '#FFE066';

type Ch = {n: number; l: string; at: number; end: number; c: string; icon: string};
const CH: Ch[] = [
  {n: 1, l: "Qu'est-ce que c'est ?", at: 38.1, end: 70.9, c: '#14B892', icon: 'stethoscope'},
  {n: 2, l: 'Quand y avoir recours ?', at: 71.1, end: 103.9, c: '#3D7BFF', icon: 'calendrier'},
  {n: 3, l: 'La procédure', at: 104.1, end: 140.8, c: '#8A5CF6', icon: 'clipboard'},
  {n: 4, l: 'Salaire et contrat', at: 141.0, end: 213.7, c: '#F29F05', icon: 'argent'},
  {n: 5, l: "L'employeur peut-il refuser ?", at: 213.9, end: 258.2, c: '#FF6B5B', icon: 'directeur'},
];
const CARD = 3.1;
const CONCL = 258.4;

const pop = (t: number, at: number, d = 0.4) => prog(t, at, at + d, easeOut);
const spring = (t: number, at: number, k = 7, w = 15) => {
  const x = t - at;
  return x <= 0 ? 0 : 1 - Math.exp(-x * k) * Math.cos(x * w);
};
const win = (t: number, a: number, b: number, f = 0.4) => prog(t, a, a + f) * (1 - prog(t, b - f, b));
const T: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 40, color = INK, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, letterSpacing: -0.5, lineHeight: 1.05, ...style}}>{children}</div>
);
const Hand: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 48, color = INK, style}) => (
  <div style={{fontFamily: handFont, fontSize: size, color, lineHeight: 1.1, ...style}}>{children}</div>
);
const Abs: React.FC<{x: number; y: number; w?: number; h?: number; children?: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, ...style}}>{children}</div>
);
const Paper: React.CSSProperties = {background: '#fff', borderRadius: 36, boxShadow: '0 24px 60px rgba(16,35,63,0.14), 0 2px 0 rgba(16,35,63,0.05)'};
const Chip: React.FC<{children: React.ReactNode; c?: string; q?: number; style?: React.CSSProperties}> = ({children, c = MINT, q = 1, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, padding: '14px 28px', borderRadius: 50, background: c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 38, transform: `scale(${q})`, boxShadow: `0 12px 30px ${c}55`, ...style}}>{children}</div>
);

/** Emblème « mi-temps » : horloge à moitié remplie. */
const HalfClock: React.FC<{size: number; t: number; fill?: number; c?: string}> = ({size, t, fill = 1, c = MINT}) => {
  const r = 46;
  const a = Math.PI * fill;
  const x = 50 + r * Math.sin(a), y = 50 - r * Math.cos(a);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx={50} cy={50} r={48} fill="#fff" stroke={INK} strokeWidth={3} />
      <path d={`M50 50 L50 4 A${r} ${r} 0 ${fill > 1 ? 1 : 0} 1 ${x} ${y} Z`} fill={c} />
      {Array.from({length: 12}, (_, k) => <line key={k} x1={50 + 40 * Math.sin((k * Math.PI) / 6)} y1={50 - 40 * Math.cos((k * Math.PI) / 6)} x2={50 + 44 * Math.sin((k * Math.PI) / 6)} y2={50 - 44 * Math.cos((k * Math.PI) / 6)} stroke={INK} strokeWidth={2} />)}
      <line x1={50} y1={50} x2={50 + 26 * Math.sin(t * 0.8)} y2={50 - 26 * Math.cos(t * 0.8)} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <line x1={50} y1={50} x2={50 + 36 * Math.sin(t * 4)} y2={50 - 36 * Math.cos(t * 4)} stroke={CORAL} strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={50} cy={50} r={4} fill={INK} />
    </svg>
  );
};

/* ─────────── Couverture + accroche (0 → 16.5) ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.5, 3.3, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 30, background: BG, transform: `translateY(${-out * 1920}px)`, borderRadius: out > 0 ? 60 : 0, boxShadow: '0 40px 80px rgba(0,0,0,0.25)'}}>
      <AbsoluteFill style={{background: `radial-gradient(circle at 20% 15%, ${MINT}30, transparent 45%), radial-gradient(circle at 85% 80%, ${HL}55, transparent 40%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(16,35,63,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={380} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{transform: `rotate(${Math.sin(t * 2) * 3}deg)`}}><HalfClock size={380} t={t + 2} /></div></Abs>
      <Abs x={60} y={820} w={960} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 34, letterSpacing: 3}}>DROIT DU TRAVAIL · SANTÉ</div>
        <T size={150} style={{marginTop: 28, textTransform: 'uppercase', letterSpacing: -3}}>Mi-temps</T>
        <T size={112} color={MINT} style={{textTransform: 'uppercase', letterSpacing: -2}}>thérapeutique</T>
        <div style={{width: 520, height: 14, background: HL, borderRadius: 7, margin: '10px auto 0'}} />
        <Hand size={62} style={{marginTop: 26}}>Reprendre le travail en douceur</Hand>
      </Abs>
      <Abs x={0} y={1560} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 18}}>
        {['Définition', 'Conditions', 'Procédure', 'Salaire', 'Droits'].map((l) => <div key={l} style={{padding: '10px 20px', borderRadius: 30, border: `3px solid ${INK}22`, fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: DIM}}>{l}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

const Hook: React.FC = () => {
  const t = useT();
  if (t > 16.8) return null;
  const o = 1 - prog(t, 16.0, 16.6);
  // personnage : tentative de saut puis rechute, puis montée de l'escalier
  const steps = 5;
  const sw = 150, sh = 90, x0 = 200, y0 = 1460;
  const build = prog(t, 9.2, 10.6);
  const wall = 1 - prog(t, 9.0, 9.6);
  const climb = Math.max(0, Math.min(steps, (t - 10.6) / 0.75));
  const ci = Math.floor(climb), cf = climb - ci;
  let px = 140, py = y0;
  if (t < 9.0) {
    const jump = t > 5.6 && t < 6.6 ? Math.sin(((t - 5.6) / 1.0) * Math.PI) * 260 : 0;
    const fallBack = prog(t, 7.5, 8.3, easeOut);
    px = 300 - fallBack * 160 + (t > 5.6 && t < 6.6 ? Math.sin(((t - 5.6) / 1.0) * Math.PI) * 60 : 0);
    py = y0 - jump;
  } else {
    px = x0 + 40 + (ci + cf) * sw;
    py = y0 - ci * sh - (cf > 0 ? Math.sin(cf * Math.PI) * 60 + cf * sh : 0);
    if (ci >= steps) { px = x0 + 40 + steps * sw; py = y0 - steps * sh; }
  }
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* arrêt maladie */}
      <Abs x={140} y={560} w={800} h={300} style={{...Paper, display: 'flex', alignItems: 'center', gap: 30, padding: '0 40px', boxSizing: 'border-box', transform: `translateY(${(1 - spring(t, 3.0)) * -200}px) rotate(${-2 + (1 - spring(t, 3.0)) * 10}deg)`, opacity: prog(t, 3.0, 3.3) * (1 - prog(t, 9.0, 9.5))}}>
        <div style={{position: 'relative'}}><F n="canape" size={170} /><div style={{position: 'absolute', right: -30, top: -20}}><F n="thermometre" size={100} /></div></div>
        <div>
          <Hand size={46} color={DIM}>Retour au travail après un</Hand>
          <T size={76} color={CORAL} style={{textTransform: 'uppercase'}}>arrêt maladie</T>
        </div>
      </Abs>
      {/* mur trop haut */}
      {wall > 0 && (
        <Abs x={420} y={y0 - 560 * prog(t, 4.6, 5.2, easeOut)} w={420} h={560 * prog(t, 4.6, 5.2, easeOut)} style={{background: `repeating-linear-gradient(0deg, #C9CFD9 0 70px, #B7BEC9 70px 76px)`, borderRadius: '24px 24px 0 0', opacity: wall, transformOrigin: '50% 100%', transform: `scaleY(${wall})`}}>
          <div style={{position: 'absolute', top: 30, left: 0, right: 0, textAlign: 'center'}}><T size={36} color={INK}>Reprise d'un coup</T></div>
        </Abs>
      )}
      {t > 7.5 && t < 9.4 && (
        <Abs x={120} y={1000} style={{opacity: 1 - prog(t, 9.0, 9.4)}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, transform: `scale(${spring(t, 7.5)})`}}><F n="effondre" size={110} /><Chip c={CORAL}>Rechute</Chip></div>
        </Abs>
      )}
      {/* escalier progressif */}
      {Array.from({length: steps}, (_, k) => {
        const q = prog(build, k / steps, (k + 1) / steps, easeOut);
        return q > 0 ? <Abs key={k} x={x0 + 100 + k * sw} y={y0 - (k + 1) * sh} w={sw} h={(k + 1) * sh + 60} style={{background: `linear-gradient(180deg, ${MINT}, #0E9C7B)`, borderRadius: '16px 16px 0 0', transformOrigin: '50% 100%', transform: `scaleY(${q})`, boxShadow: 'inset 0 6px 0 rgba(255,255,255,0.35)'}} /> : null;
      })}
      <Abs x={0} y={y0 + 60} w={1080} h={10} style={{background: INK, opacity: 0.15}} />
      {t > 10.4 && (
        <Abs x={0} y={640} w={1080} style={{display: 'flex', justifyContent: 'center', transform: `scale(${spring(t, 10.4)})`}}>
          <div style={{...Paper, padding: '16px 28px', display: 'flex', alignItems: 'center', gap: 16}}><HalfClock size={110} t={t} /><T size={62} color={MINT}>Mi-temps thérapeutique</T></div>
        </Abs>
      )}
      {t > 14.5 && <Abs x={x0 + steps * sw - 20} y={y0 - steps * sh - 260} style={{transform: `scale(${spring(t, 14.5)}) rotate(${t * 20}deg)`}}><F n="soleil" size={150} /></Abs>}
      {/* personnage */}
      <Abs x={px - 85} y={py - 190} w={170} h={190} style={{opacity: prog(t, 4.7, 5.1), transform: t > 7.5 && t < 8.6 ? `rotate(${-20 * Math.sin(prog(t, 7.5, 8.6) * Math.PI)}deg)` : undefined}}><F n="femme-bureau" size={170} /></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Programme : classeur à onglets ─────────── */
const PROG: [string, number, number][] = [['Définir le mi-temps thérapeutique', 20.0, 0], ['Quand y avoir recours ?', 22.95, 1], ['La procédure, étape par étape', 25.7, 2], ['Salaire et contrat de travail', 28.5, 3], ["L'employeur peut-il refuser ?", 35.2, 4]];
const Programme: React.FC = () => {
  const t = useT();
  const o = win(t, 16.4, 38.4, 0.5);
  if (o <= 0) return null;
  const enter = spring(t, 16.6, 6, 12);
  const cur = PROG.reduce((a, p, k) => (t >= p[1] ? k : a), -1);
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Abs x={70} y={540} w={880} h={1040} style={{...Paper, transform: `translateY(${(1 - enter) * 1400}px) rotate(${(1 - enter) * 8 - 1}deg)`}}>
        {/* anneaux */}
        {Array.from({length: 6}, (_, k) => <div key={k} style={{position: 'absolute', left: -26, top: 90 + k * 165, width: 60, height: 34, borderRadius: 17, border: '8px solid #9AA3B2', background: BG}} />)}
        <div style={{position: 'absolute', left: 60, top: 50}}><Hand size={50} color={DIM}>Au programme</Hand></div>
        <div style={{position: 'absolute', left: 60, right: 40, top: 130, height: 4, background: `${INK}15`}} />
        {PROG.map(([l, at, k]) => {
          const q = pop(t, at, 0.5);
          const c = CH[k].c;
          const here = cur === k;
          return (
            <div key={l} style={{position: 'absolute', left: 60, right: 40, top: 170 + k * 170, height: 140, display: 'flex', alignItems: 'center', gap: 24, opacity: q, transform: `translateX(${(1 - q) * 120}px)`}}>
              <div style={{position: 'absolute', inset: '10px -20px', borderRadius: 24, background: `${c}22`, transformOrigin: '0 50%', transform: `scaleX(${here ? prog(t, at + 0.1, at + 0.6) : 0})`}} />
              <div style={{width: 96, height: 96, borderRadius: 48, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 54, color: '#fff', zIndex: 1}}>{k + 1}</div>
              <T size={here ? 48 : 42} style={{flex: 1, zIndex: 1}}>{l}</T>
              <div style={{zIndex: 1}}><F n={CH[k].icon} size={90} /></div>
            </div>
          );
        })}
        {t > 35.2 && <div style={{position: 'absolute', right: 30, bottom: 30, transform: `scale(${spring(t, 36.2)}) rotate(${Math.sin(t * 3) * 8}deg)`}}><F n="question" size={110} /></div>}
      </Abs>
      {/* onglets */}
      {PROG.map(([, at, k]) => (
        <Abs key={k} x={930} y={600 + k * 170} w={110} h={130} style={{background: CH[k].c, borderRadius: '0 26px 26px 0', transform: `translateX(${(1 - spring(t, at - 0.1)) * -110 + (1 - enter) * 1400}px)`, boxShadow: '6px 8px 20px rgba(16,35,63,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: '#fff'}}>{k + 1}</Abs>
      ))}
    </AbsoluteFill>
  );
};

/* ─────────── Cartes de chapitre en origami ─────────── */
const ChapterCard: React.FC<{ch: Ch}> = ({ch}) => {
  const t = useT();
  const a = ch.at, b = ch.at + CARD;
  if (t < a || t > b) return null;
  const q1 = prog(t, a, a + 0.6, easeOut);
  const q2 = prog(t, a + 0.15, a + 0.8, easeOut);
  const z = prog(t, b - 0.55, b, easeIn);
  const content = (
    <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, background: `linear-gradient(160deg, ${ch.c}, ${ch.c}D0)`}}>
      <div style={{position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 2px, transparent 2px)', backgroundSize: '36px 36px'}} />
      <div style={{position: 'absolute', left: -40, top: 360, fontFamily: sansFont, fontWeight: 900, fontSize: 900, color: 'rgba(255,255,255,0.18)', lineHeight: 1}}>{ch.n}</div>
      <div style={{position: 'absolute', left: 80, right: 80, top: 760}}>
        <div style={{display: 'inline-block', padding: '10px 26px', borderRadius: 40, background: 'rgba(255,255,255,0.95)', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: ch.c, letterSpacing: 2}}>CHAPITRE {ch.n}/5</div>
        <T size={110} color="#fff" style={{marginTop: 30, textShadow: '0 8px 30px rgba(0,0,0,0.15)'}}>{ch.l}</T>
      </div>
      <div style={{position: 'absolute', right: 90, top: 1200, transform: `rotate(${Math.sin(t * 2) * 6}deg) scale(${spring(t, a + 0.5)})`}}><F n={ch.icon} size={240} /></div>
    </div>
  );
  return (
    <AbsoluteFill style={{zIndex: 50, perspective: 2400, opacity: 1 - z * 0.2}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 960, overflow: 'hidden', transformOrigin: '50% 100%', transform: `rotateX(${-90 * (1 - q1) + -95 * z}deg)`}}>
        {content}
        <div style={{position: 'absolute', inset: 0, background: '#000', opacity: (1 - q1) * 0.4 + z * 0.4}} />
      </div>
      <div style={{position: 'absolute', left: 0, top: 960, width: 1080, height: 960, overflow: 'hidden', transformOrigin: '50% 0%', transform: `rotateX(${90 * (1 - q2) + 95 * z}deg)`}}>
        <div style={{position: 'absolute', left: 0, top: -960, width: 1080, height: 1920}}>{content}</div>
        <div style={{position: 'absolute', inset: 0, background: '#000', opacity: (1 - q2) * 0.4 + z * 0.4}} />
      </div>
    </AbsoluteFill>
  );
};

/* ─────────── Chapitre 1 : définition ─────────── */
const Ch1: React.FC = () => {
  const t = useT();
  const o = win(t, 41.1, 70.9, 0.4);
  if (o <= 0) return null;
  // curseur de comparaison (part « mi-temps » à gauche)
  const split = kf(t, [41.4, 42.2, 43.9, 44.6, 45.0, 45.7, 47.9, 48.6, 49.4, 50.2, 51.8, 52.5, 55.6, 56.3], [0.5, 0.5, 0.5, 0.82, 0.82, 0.18, 0.18, 0.62, 0.38, 0.5, 0.5, 1, 1, 0]);
  const cmpO = 1 - prog(t, 59.0, 59.5);
  const CW = 940, CH_ = 960, cx = 70, cy = 580;
  const colW = 440;
  const panel = (mi: boolean) => {
    const center = mi ? (split * CW) / 2 : split * CW + ((1 - split) * CW) / 2;
    return (
      <div style={{position: 'absolute', inset: 0, background: mi ? `linear-gradient(170deg, #E6FBF5, #C9F3E6)` : 'linear-gradient(170deg, #EEF1F6, #DCE1EA)'}}>
        <div style={{position: 'absolute', left: center - colW / 2, top: 70, width: colW, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
          {mi ? <HalfClock size={150} t={t} /> : <F n="calendrier" size={150} />}
          <T size={44} color={mi ? '#0B7F65' : '#4A5568'} style={{marginTop: 24, textTransform: 'uppercase'}}>{mi ? 'Mi-temps thérapeutique' : 'Temps partiel classique'}</T>
          <div style={{marginTop: 34, display: 'flex', flexDirection: 'column', gap: 18, width: '100%'}}>
            {(mi ? [['Prescrit par un médecin', 'medecin', 0], ['Aménagement temporaire', 'sablier', 0], ['Objectif : la santé', 'coeur', 0]] : [['Un choix de travailler moins', 'homme-bureau', 56.6], ['Sans motif médical', 'chrono', 0]]).map(([l, ic, strike]) => (
              <div key={l as string} style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,0.8)', padding: '14px 18px', borderRadius: 24, textAlign: 'left'}}>
                <F n={ic as string} size={60} /><T size={32} style={{flex: 1}}>{l}</T>
                {(strike as number) > 0 && t > (strike as number) && <div style={{position: 'absolute', left: 10, top: '50%', height: 9, borderRadius: 5, background: CORAL, width: `${prog(t, strike as number, (strike as number) + 0.6) * 95}%`, transform: 'rotate(-3deg)'}} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  return (
    <AbsoluteFill style={{opacity: o}}>
      {cmpO > 0 && (
        <Abs x={cx} y={cy} w={CW} h={CH_} style={{...Paper, overflow: 'hidden', opacity: cmpO, transform: `scale(${0.9 + 0.1 * spring(t, 41.2)})`}}>
          {panel(false)}
          <div style={{position: 'absolute', inset: 0, clipPath: `inset(0 ${(1 - split) * 100}% 0 0)`}}>{panel(true)}</div>
          {/* poignée */}
          <div style={{position: 'absolute', left: split * CW - 4, top: 0, bottom: 0, width: 8, background: '#fff', boxShadow: '0 0 20px rgba(0,0,0,0.25)'}}>
            <div style={{position: 'absolute', left: -46, top: CH_ / 2 - 50, width: 100, height: 100, borderRadius: 50, background: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 44}}>‹ ›</div>
          </div>
          {/* tampon THÉRAPEUTIQUE */}
          {t > 52.1 && t < 55.8 && <div style={{position: 'absolute', left: 0, right: 0, top: 720, display: 'flex', justifyContent: 'center'}}><div style={{transform: `scale(${(2.2 - 1.2 * pop(t, 52.1, 0.3)) * (1 + 0.04 * Math.sin((t - 52) * 9))}) rotate(-6deg)`, opacity: pop(t, 52.1, 0.3), border: `8px solid ${MINT}`, borderRadius: 20, padding: '8px 30px', background: 'rgba(255,255,255,0.85)'}}><T size={74} color={MINT} style={{textTransform: 'uppercase'}}>Thérapeutique</T></div></div>}
          {/* « pas juste un choix » barré */}
        </Abs>
      )}
      {/* ordonnance */}
      {t > 59.2 && t < 64.0 && (
        <Abs x={150} y={560} w={780} h={1000} style={{...Paper, transform: `translateY(${(1 - spring(t, 59.3, 6, 12)) * 1400}px) rotate(${(1 - spring(t, 59.3)) * -12 + 2}deg)`, opacity: 1 - prog(t, 63.5, 64.0), padding: 50, boxSizing: 'border-box'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 20, borderBottom: `4px solid ${MINT}`, paddingBottom: 20}}><F n="medecin" size={110} /><div><T size={54} color={MINT}>ORDONNANCE</T><Hand size={36} color={DIM}>Dr — médecin traitant</Hand></div></div>
          <div style={{fontFamily: 'Georgia, serif', fontSize: 80, color: MINT, marginTop: 30, fontStyle: 'italic'}}>Rx</div>
          {[['Mi-temps thérapeutique', 60.0], ['Aménagement temporaire', 61.0], ['Reprise adaptée', 61.9]].map(([l, at]) => (
            <div key={l as string} style={{overflow: 'hidden', whiteSpace: 'nowrap', width: `${prog(t, at as number, (at as number) + 0.8) * 100}%`, marginTop: 14}}><Hand size={60}>— {l}</Hand></div>
          ))}
          <svg width={500} height={160} viewBox="0 0 500 160" style={{position: 'absolute', right: 40, bottom: 40}}>
            <path d="M20 110 C 60 20, 90 140, 130 70 S 200 40, 220 100 S 300 130, 330 60 C 350 30, 380 120, 420 80 L 480 90" fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray={`${prog(t, 62.6, 63.4)} 1`} />
            <line x1={10} y1={140} x2={490} y2={140} stroke={`${INK}40`} strokeWidth={3} />
          </svg>
        </Abs>
      )}
      {/* batterie qui se recharge en douceur */}
      {t > 63.6 && (() => {
        const lvl = 0.15 + 0.85 * prog(t, 64.6, 70.0, easeInOut);
        return (
          <>
            <Abs x={150} y={640} w={720} h={340} style={{border: `16px solid ${INK}`, borderRadius: 50, opacity: pop(t, 63.6), transform: `scale(${0.85 + 0.15 * spring(t, 63.6)})`, padding: 18, boxSizing: 'border-box'}}>
              <div style={{position: 'absolute', right: -60, top: 100, width: 40, height: 108, borderRadius: '0 16px 16px 0', background: INK}} />
              <div style={{height: '100%', width: `${lvl * 100}%`, borderRadius: 26, background: `linear-gradient(90deg, ${lvl < 0.4 ? CORAL : '#F5B700'}, ${MINT} 80%)`, position: 'relative', overflow: 'hidden'}}>
                {Array.from({length: 8}, (_, k) => <div key={k} style={{position: 'absolute', left: `${random(`b${k}`) * 90}%`, bottom: `${((t * 30 + random(`c${k}`) * 100) % 100)}%`, width: 16, height: 16, borderRadius: 8, background: 'rgba(255,255,255,0.5)'}} />)}
              </div>
              <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="pousse" size={150 * (0.6 + 0.4 * lvl)} /></div>
            </Abs>
            <Abs x={60} y={1060} w={960} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
              {[['Se réadapter en douceur', 65.8, MINT], ['Reprendre pied', 67.1, '#3D7BFF'], ['Sans compromettre sa santé', 68.4, CORAL]].map(([l, at, c]) => <Chip key={l as string} c={c as string} q={spring(t, at as number)}>{l}</Chip>)}
            </Abs>
          </>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Chapitre 2 : la route qui bifurque ─────────── */
const Ch2: React.FC = () => {
  const t = useT();
  const o = win(t, 74.0, 103.9, 0.4);
  if (o <= 0) return null;
  const qO = 1 - prog(t, 78.8, 79.3);
  const road = prog(t, 79.2, 80.6, easeInOut);
  const dot1 = prog(t, 81.0, 83.0, easeInOut);
  const dot2 = prog(t, 90.7, 92.6, easeInOut);
  // route en Y : tronc (540,1600)->(540,1330), branches vers (270,1160) et (810,1160)
  const P = (u: number, side: number): [number, number] => {
    if (u < 0.5) return [540, 1600 - u * 2 * 270];
    const v = (u - 0.5) * 2;
    return [540 + side * 270 * v, 1330 - 170 * v];
  };
  const [d1x, d1y] = P(dot1, -1);
  const [d2x, d2y] = P(dot2, 1);
  const lane = (side: number, items: [string, string, number, string?][], hl: number) => (
    <Abs x={side < 0 ? 50 : 560} y={560} w={470} h={560} style={{...Paper, padding: '26px 24px', boxSizing: 'border-box', opacity: pop(t, side < 0 ? 81.2 : 90.8), transform: `translateY(${(1 - spring(t, side < 0 ? 81.2 : 90.8)) * 80}px)`, border: hl > 0 ? `5px solid ${side < 0 ? '#3D7BFF' : CORAL}` : '5px solid transparent'}}>
      <T size={34} color={side < 0 ? '#3D7BFF' : CORAL} style={{textTransform: 'uppercase', letterSpacing: 1}}>Scénario {side < 0 ? 1 : 2}</T>
      <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14}}>
        {items.map(([l, ic, at, sub], k) => (
          <React.Fragment key={l}>
            {k > 0 && <div style={{height: 22, width: 6, background: `${INK}30`, marginLeft: 38, transform: `scaleY(${pop(t, at)})`}} />}
            <div style={{display: 'flex', alignItems: 'center', gap: 14, opacity: pop(t, at), transform: `translateX(${(1 - pop(t, at)) * 40}px)`}}>
              {ic === 'half' ? <HalfClock size={82} t={t} /> : <F n={ic} size={82} />}
              <div><T size={32}>{l}</T>{sub && <Hand size={30} color={DIM}>{sub}</Hand>}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </Abs>
  );
  return (
    <AbsoluteFill style={{opacity: o}}>
      {qO > 0 && (
        <Abs x={60} y={640} w={960} style={{opacity: qO, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30}}>
          <div style={{transform: `scale(${spring(t, 74.2)}) rotate(${Math.sin(t * 2) * 5}deg)`}}><F n="pensif" size={220} /></div>
          <Chip c="#3D7BFF" q={spring(t, 75.6)}>Dans quel cas ?</Chip>
          <Chip c={INK} q={spring(t, 77.8)}>Quelles conditions ?</Chip>
        </Abs>
      )}
      {road > 0 && (
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          {[-1, 1].map((sd) => <path key={sd} d={`M540 1640 L540 1330 Q540 1300 ${540 + sd * 60} 1290 L${540 + sd * 270} 1160`} fill="none" stroke="#3A4558" strokeWidth={70} strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray={`${road} 1`} />)}
          {[-1, 1].map((sd) => <path key={sd} d={`M540 1640 L540 1330 Q540 1300 ${540 + sd * 60} 1290 L${540 + sd * 270} 1160`} fill="none" stroke="#fff" strokeWidth={6} strokeDasharray="24 22" strokeDashoffset={-t * 60} opacity={road} />)}
          {/* panneaux */}
          {[-1, 1].map((sd) => {
            const at = sd < 0 ? 79.6 : 80.0;
            return <g key={sd} transform={`translate(${540 + sd * 150} 1450) scale(${spring(t, at)})`}><rect x={-6} y={0} width={12} height={150} fill="#6B7280" /><rect x={-110} y={-70} width={220} height={80} rx={14} fill={sd < 0 ? '#3D7BFF' : CORAL} /><text x={0} y={-18} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={34} fill="#fff">{sd < 0 ? '← SCÉNARIO 1' : 'SCÉNARIO 2 →'}</text></g>;
          })}
        </svg>
      )}
      {t > 81.0 && <Abs x={d1x - 32} y={d1y - 32} w={64} h={64} style={{borderRadius: 32, background: '#3D7BFF', border: '8px solid #fff', boxShadow: '0 0 30px #3D7BFF'}} />}
      {t > 90.7 && <Abs x={d2x - 32} y={d2y - 32} w={64} h={64} style={{borderRadius: 32, background: CORAL, border: '8px solid #fff', boxShadow: `0 0 30px ${CORAL}`}} />}
      {t > 81.0 && lane(-1, [['Arrêt de travail', 'thermometre', 85.5, 'maladie ou accident'], ['Mi-temps thérapeutique', 'half', 86.6], ['Reprise progressive', 'pousse', 89.5]], t < 90.7 ? 1 : 0)}
      {t > 90.7 && lane(1, [['Reprise à temps plein', 'chrono', 94.4], ['Santé qui se fragilise', 'anxieux', 98.6], ['Temps de travail réduit', 'half', 100.9]], 1)}
    </AbsoluteFill>
  );
};

/* ─────────── Chapitre 3 : réaction en chaîne de dominos ─────────── */
const ACT: {n: string; icon: string; at: number; act: [string, number, string]}[] = [
  {n: 'Médecin traitant', icon: 'medecin', at: 119.6, act: ['Certificat médical', 122.4, 'memo']},
  {n: 'Salarié → CPAM', icon: 'femme-bureau', at: 124.0, act: ['Feu vert de la CPAM', 128.0, 'feu']},
  {n: 'Médecin du travail', icon: 'stethoscope', at: 129.9, act: ["Avis sur l'aptitude", 134.1, 'check']},
  {n: 'Employeur', icon: 'directeur', at: 135.2, act: ['Dossier complet présenté', 139.6, 'dossier']},
];
const Ch3: React.FC = () => {
  const t = useT();
  const o = win(t, 107.2, 140.8, 0.4);
  if (o <= 0) return null;
  const cur = ACT.reduce((a, x, k) => (t >= x.at ? k : a), -1);
  const DW = 180, DH = 360, gap = 230, x0 = 110, base = 1560;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* intro : qui fait quoi, dans quel ordre */}
      {t < 119.4 && (
        <Abs x={60} y={600} w={960} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, opacity: 1 - prog(t, 119.0, 119.4)}}>
          <Chip c="#8A5CF6" q={spring(t, 108.0)}>Quelles démarches ?</Chip>
          <Chip c={INK} q={spring(t, 111.1)}>Qui fait quoi ?</Chip>
          <Chip c="#F29F05" q={spring(t, 111.8)}>Dans quel ordre ?</Chip>
          {t > 116.0 && <Hand size={56} style={{marginTop: 10, opacity: pop(t, 116.0)}}>un processus à plusieurs</Hand>}
        </Abs>
      )}
      {/* fiche de l'acteur courant */}
      {cur >= 0 && (() => {
        const a = ACT[cur];
        const q = spring(t, a.at, 8, 16);
        return (
          <Abs key={cur} x={90} y={570} w={900} h={470} style={{...Paper, padding: 40, boxSizing: 'border-box', transform: `scale(${0.8 + 0.2 * q})`, opacity: Math.min(1, q * 1.5), borderTop: '14px solid #8A5CF6'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
              <div style={{width: 160, height: 160, borderRadius: 80, background: '#EFE8FF', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={a.icon} size={130} /></div>
              <div>
                <T size={34} color="#8A5CF6" style={{letterSpacing: 2}}>TEMPS {cur + 1}/4</T>
                <T size={64}>{a.n}</T>
              </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 40, opacity: pop(t, a.act[1]), transform: `translateY(${(1 - pop(t, a.act[1])) * 30}px)`}}>
              {a.act[2] === 'feu' ? (
                <svg width={90} height={180} viewBox="0 0 50 100"><rect x={2} y={2} width={46} height={96} rx={12} fill={INK} />{['#FF4D3D', '#FFB21E', '#2FC27A'].map((c, k) => <circle key={c} cx={25} cy={20 + k * 30} r={11} fill={c} opacity={(k === 2 ? t > 128.0 : k === 0 && t < 128.0) ? 1 : 0.2} />)}</svg>
              ) : a.act[2] === 'check' ? <Check p={prog(t, a.act[1], a.act[1] + 0.5)} size={110} color={MINT} /> : <F n={a.act[2]} size={110} />}
              <T size={50} color={INK}>{a.act[0]}</T>
            </div>
          </Abs>
        );
      })()}
      {/* dominos */}
      <Abs x={0} y={base} w={1080} h={10} style={{background: `${INK}22`}} />
      {t > 110.8 && ACT.map((a, k) => {
        const fall = prog(t, a.at, a.at + 0.45, easeIn);
        const lean = k < 3 ? 34 + (t > ACT[k + 1].at + 0.3 ? 14 : 0) : 62;
        const ang = fall * lean;
        const appear = spring(t, 110.9 + k * 0.15);
        return (
          <Abs key={k} x={x0 + k * gap} y={base - DH} w={DW} h={DH} style={{transformOrigin: '100% 100%', transform: `rotate(${ang}deg) scaleY(${appear})`, borderRadius: 26, background: t >= a.at ? '#8A5CF6' : '#fff', border: `6px solid ${t >= a.at ? '#6B3FE0' : '#D5D9E2'}`, boxShadow: '8px 10px 0 rgba(16,35,63,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', padding: '20px 0', boxSizing: 'border-box'}}>
            <div style={{width: 70, height: 70, borderRadius: 35, background: t >= a.at ? '#fff' : '#EFE8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#8A5CF6', transform: `scale(${spring(t, 111.8 + k * 0.12)})`}}>{k + 1}</div>
            <div style={{width: 120, height: 4, background: t >= a.at ? 'rgba(255,255,255,0.5)' : '#E3E6EC'}} />
            <div style={{opacity: t > 118.2 + k * 0.15 ? 1 : 0.15}}><F n={t > 118.2 + k * 0.15 ? a.icon : 'question'} size={110} /></div>
          </Abs>
        );
      })}
      {/* étincelle d'impact */}
      {ACT.map((a, k) => t > a.at + 0.4 && t < a.at + 0.9 && <Abs key={k} x={x0 + k * gap + DW + 10} y={base - DH + 40} w={60} h={60} style={{borderRadius: 30, border: `6px solid #F29F05`, transform: `scale(${1 + (t - a.at - 0.4) * 4})`, opacity: 1 - (t - a.at - 0.4) * 2}} />)}
    </AbsoluteFill>
  );
};

/* ─────────── Chapitre 4 : salaire (verre à deux robinets) puis contrat ─────────── */
const Ch4: React.FC = () => {
  const t = useT();
  const o = win(t, 144.2, 213.7, 0.4);
  if (o <= 0) return null;
  const qO = 1 - prog(t, 150.0, 150.5);
  const glassO = win(t, 150.3, 183.0, 0.5);
  const f1 = prog(t, 165.0, 169.8, easeInOut) * 0.5;
  const f2 = prog(t, 170.4, 176.8, easeInOut) * 0.42;
  const tap1 = t > 164.7 && t < 169.9;
  const tap2 = t > 170.1 && t < 176.9;
  const GX = 330, GY = 1060, GW = 420, GH = 500;
  const wave = (y: number, ph: number) => {
    let d = `M0 ${y}`;
    for (let x = 0; x <= GW; x += 20) d += ` L${x} ${y + Math.sin(x / 40 + t * 4 + ph) * 8}`;
    return d + ` L${GW} ${GH} L0 ${GH} Z`;
  };
  const contractO = win(t, 182.8, 213.7, 0.5);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {qO > 0 && (
        <Abs x={60} y={620} w={960} style={{opacity: qO, display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center'}}>
          {[['Le salaire ?', 'argent', 145.7, '#F29F05'], ['Le contrat de travail ?', 'parchemin', 147.2, INK]].map(([l, ic, at, c]) => (
            <div key={l} style={{...Paper, display: 'flex', alignItems: 'center', gap: 24, padding: '24px 40px', transform: `scale(${spring(t, at as number)}) rotate(${(at as number) > 146 ? 2 : -2}deg)`}}><F n={ic as string} size={130} /><T size={56} color={c as string}>{l}</T></div>
          ))}
        </Abs>
      )}
      {glassO > 0 && (
        <AbsoluteFill style={{opacity: glassO}}>
          <Abs x={60} y={560} w={960} style={{textAlign: 'center', opacity: pop(t, 152.5)}}>
            <Hand size={52} color={DIM}>{t < 158.2 ? "Le salaire ne vient pas d'un seul endroit…" : 'Deux parties, deux sources'}</Hand>
          </Abs>
          {/* robinets */}
          {[-1, 1].map((sd) => {
            const at = sd < 0 ? 158.3 : 158.6;
            const open = sd < 0 ? tap1 : tap2;
            const c = sd < 0 ? '#F29F05' : MINT;
            const x = sd < 0 ? 120 : 760;
            return (
              <React.Fragment key={sd}>
                <Abs x={x} y={700} w={200} h={150} style={{transform: `scale(${spring(t, at)})`}}>
                  <div style={{position: 'absolute', left: 0, top: 40, width: 200, height: 60, borderRadius: 30, background: c}} />
                  <div style={{position: 'absolute', left: sd < 0 ? 150 : 0, top: 40, width: 50, height: 130, borderRadius: '0 0 20px 20px', background: c}} />
                  <div style={{position: 'absolute', left: 80, top: 0, width: 40, height: 40, borderRadius: 10, background: INK, transform: `rotate(${open ? 90 : 0}deg)`}} />
                </Abs>
                {open && <Abs x={sd < 0 ? 280 : 770} y={870} w={30} h={GY + GH - 870 - (sd < 0 ? f1 : f1 + f2) * GH} style={{background: c, borderRadius: 15, opacity: 0.9}} />}
                <Abs x={sd < 0 ? 20 : 760} y={1120} w={300} style={{opacity: pop(t, sd < 0 ? 164.7 : 170.1), transform: `translateY(${(1 - pop(t, sd < 0 ? 164.7 : 170.1)) * 40}px)`}}>
                  <div style={{...Paper, padding: '18px 20px', textAlign: sd < 0 ? 'left' : 'right', borderTop: `10px solid ${c}`, width: 300, boxSizing: 'border-box'}}>
                    <T size={36} color={c}>{sd < 0 ? 'Employeur' : 'Sécurité sociale'}</T>
                    <Hand size={36} style={{marginTop: 6, opacity: pop(t, sd < 0 ? 167.0 : 172.7)}}>{sd < 0 ? 'salaire des heures travaillées' : 'indemnités journalières'}</Hand>
                  </div>
                </Abs>
              </React.Fragment>
            );
          })}
          {/* verre */}
          <Abs x={GX} y={GY} w={GW} h={GH} style={{transform: `scale(${spring(t, 153.5)})`, transformOrigin: '50% 100%'}}>
            <svg width={GW} height={GH} style={{position: 'absolute', inset: 0, borderRadius: '0 0 50px 50px', overflow: 'hidden'}}>
              <defs><clipPath id="gl"><path d={`M0 0 L${GW} 0 L${GW - 30} ${GH - 20} Q${GW - 34} ${GH} ${GW - 60} ${GH} L60 ${GH} Q34 ${GH} 30 ${GH - 20} Z`} /></clipPath></defs>
              <g clipPath="url(#gl)">
                <rect width={GW} height={GH} fill="rgba(200,230,255,0.25)" />
                {f1 + f2 > 0 && <path d={wave(GH * (1 - f1 - f2), 1)} fill={MINT} opacity={0.9} />}
                {f1 > 0 && <path d={wave(GH * (1 - f1), 0)} fill="#F29F05" />}
              </g>
              <path d={`M0 0 L30 ${GH - 20} Q34 ${GH} 60 ${GH} L${GW - 60} ${GH} Q${GW - 34} ${GH} ${GW - 30} ${GH - 20} L${GW} 0`} fill="none" stroke={INK} strokeWidth={10} strokeLinejoin="round" />
            </svg>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center'}}><T size={44} color={f1 > 0.2 ? '#fff' : INK}>REVENU</T></div>
          </Abs>
          {t > 175.4 && <Abs x={0} y={990} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Chip c={INK} q={spring(t, 175.4)}>Partie non travaillée compensée</Chip></Abs>}
        </AbsoluteFill>
      )}
      {/* contrat de travail */}
      {contractO > 0 && (
        <AbsoluteFill style={{opacity: contractO}}>
          <Abs x={170} y={560} w={740} h={560} style={{...Paper, padding: '36px 44px', boxSizing: 'border-box', transform: `translateX(${(1 - spring(t, 183.0, 6, 12)) * 1100}px) rotate(${-1.5 + (t > 205.8 ? -4 * prog(t, 205.8, 206.6) : 0)}deg) translateX(${-120 * prog(t, 208.8, 209.6, easeInOut)}px)`}}>
            <T size={46} style={{textAlign: 'center'}}>CONTRAT DE TRAVAIL</T>
            {Array.from({length: 7}, (_, k) => <div key={k} style={{height: 14, borderRadius: 7, background: `${INK}18`, marginTop: 24, width: `${[100, 92, 96, 70, 88, 94, 60][k]}%`}} />)}
            {t > 189.9 && t < 195.0 && <div style={{position: 'absolute', right: 30, top: 20, transform: `scale(${spring(t, 189.9)})`}}><div style={{width: 90, height: 90, borderRadius: 45, background: CORAL, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 70, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>!</div></div>}
            {/* rosette « travail effectif » */}
            {t > 194.9 && (
              <div style={{position: 'absolute', right: -60, bottom: -70, transform: `scale(${spring(t, 194.9, 6, 14)}) rotate(${-10 + Math.sin(t * 2) * 3}deg)`}}>
                <svg width={300} height={340} viewBox="0 0 300 340">
                  <path d="M110 200 L80 330 L130 300 L150 340 L160 200 Z" fill={CORAL} /><path d="M190 200 L220 330 L170 300 L150 340 L140 200 Z" fill="#E0503F" />
                  {Array.from({length: 16}, (_, k) => <circle key={k} cx={150 + 110 * Math.cos((k / 16) * Math.PI * 2)} cy={140 + 110 * Math.sin((k / 16) * Math.PI * 2)} r={28} fill="#F29F05" />)}
                  <circle cx={150} cy={140} r={110} fill="#FFC23D" stroke="#fff" strokeWidth={8} />
                  <text x={150} y={130} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={34} fill={INK}>TRAVAIL</text>
                  <text x={150} y={170} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={34} fill={INK}>EFFECTIF</text>
                </svg>
              </div>
            )}
          </Abs>
          {/* droits maintenus */}
          {t > 199.6 && t < 206.0 && (
            <Abs x={60} y={1190} w={960} h={400} style={{opacity: 1 - prog(t, 205.6, 206.0)}}>
              <div style={{textAlign: 'center', transform: `scale(${spring(t, 199.8)})`}}><Chip c={MINT}><Check p={prog(t, 200, 200.4)} size={40} color="#fff" />Tous les droits maintenus</Chip></div>
              <div style={{display: 'flex', gap: 24, marginTop: 26}}>
                {/* ancienneté : piste de course */}
                <div style={{...Paper, flex: 1, height: 230, padding: 20, boxSizing: 'border-box', opacity: pop(t, 200.8), position: 'relative', overflow: 'hidden'}}>
                  <T size={32}>Ancienneté</T>
                  <div style={{position: 'absolute', left: 20, right: 20, bottom: 50, height: 12, borderRadius: 6, background: `${INK}15`}} />
                  <div style={{position: 'absolute', left: 20, bottom: 50, height: 12, borderRadius: 6, background: MINT, width: `${8 + ((t - 200.8) * 22) % 82}%`}} />
                  <div style={{position: 'absolute', left: `${4 + ((t - 200.8) * 22) % 82}%`, bottom: 66}}><F n="chrono" size={70} /></div>
                </div>
                {/* congés payés : bocal de soleils */}
                <div style={{...Paper, flex: 1, height: 230, padding: 20, boxSizing: 'border-box', opacity: pop(t, 202.8), position: 'relative', overflow: 'hidden'}}>
                  <T size={32}>Congés payés</T>
                  <div style={{position: 'absolute', right: 30, bottom: 20, width: 150, height: 150, border: `6px solid ${INK}55`, borderTop: 'none', borderRadius: '0 0 30px 30px'}} />
                  {Array.from({length: 6}, (_, k) => {
                    const at = 202.9 + k * 0.35;
                    const y = Math.min(1, Math.max(0, (t - at) / 0.4));
                    return t > at ? <div key={k} style={{position: 'absolute', right: 40 + (k % 3) * 44, bottom: 26 + Math.floor(k / 3) * 44 + (1 - y) * 200}}><F n="soleil" size={44} /></div> : null;
                  })}
                </div>
              </div>
              {t > 204.5 && <div style={{textAlign: 'center', marginTop: 18}}><Hand size={52} style={{transform: `scale(${spring(t, 204.5)})`}}>… comme à temps plein</Hand></div>}
            </Abs>
          )}
          {/* avenant signé */}
          {t > 208.9 && (
            <Abs x={380} y={980} w={620} h={600} style={{...Paper, padding: '30px 36px', boxSizing: 'border-box', transform: `translateY(${(1 - spring(t, 209.0, 6, 12)) * 800}px) rotate(3deg)`, borderTop: `14px solid #F29F05`}}>
              <T size={50} color="#F29F05">AVENANT</T>
              <Hand size={36} color={DIM}>au contrat de travail</Hand>
              {Array.from({length: 4}, (_, k) => <div key={k} style={{height: 12, borderRadius: 6, background: `${INK}18`, marginTop: 22, width: `${[96, 84, 90, 64][k]}%`}} />)}
              <Hand size={34} style={{marginTop: 20}}>Aménagement temporaire</Hand>
              <svg width={420} height={140} viewBox="0 0 420 140" style={{position: 'absolute', left: 40, bottom: 30}}>
                <path d="M10 90 C 40 10, 70 130, 100 60 S 150 30, 170 90 S 230 110, 260 50 C 280 20, 310 110, 350 70 L 400 80" fill="none" stroke="#1F3D8A" strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray={`${prog(t, 210.6, 212.2)} 1`} />
                <line x1={0} y1={120} x2={410} y2={120} stroke={`${INK}40`} strokeWidth={3} />
              </svg>
              {t > 210.5 && t < 212.6 && (() => {
                const u = prog(t, 210.6, 212.2);
                return <div style={{position: 'absolute', left: 30 + u * 380, bottom: 60 + Math.sin(u * 20) * 20}}><F n="ecrit" size={110} /></div>;
              })()}
            </Abs>
          )}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Chapitre 5 : principe, exception, astérisque ─────────── */
const Ch5: React.FC = () => {
  const t = useT();
  const o = win(t, 217.0, 258.2, 0.4);
  if (o <= 0) return null;
  const aO = 1 - prog(t, 226.2, 226.6);
  const bO = win(t, 226.5, 233.2, 0.4);
  const pc = 236.0;
  const grow = prog(t, pc, pc + 0.7, easeInOut) * (1 - prog(t, 252.5, 253.1, easeInOut));
  const star = prog(t, 242.5, 243.3, easeOut);
  const needle = t < 231.0 ? kf(t, [228.8, 229.9, 230.5], [0, -60, 55]) : 55 * Math.exp(-(t - 231) * 2.5) * Math.cos((t - 231) * 9);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {aO > 0 && (
        <Abs x={60} y={590} w={960} style={{opacity: aO, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24}}>
          <div style={{display: 'flex', gap: 60, alignItems: 'flex-end'}}>
            <div style={{transform: `scale(${spring(t, 221.7)})`, textAlign: 'center'}}><F n="femme-bureau" size={200} /><T size={30} color={DIM}>Salarié</T></div>
            <div style={{transform: `scale(${spring(t, 217.2)})`, textAlign: 'center'}}><F n="directeur" size={240} /><T size={30} color={DIM}>Employeur</T></div>
          </div>
          <Chip c={CORAL} q={spring(t, 218.6)}>Son mot à dire ?</Chip>
          <Chip c={INK} q={spring(t, 220.5)}>Peut-il s'y opposer ?</Chip>
        </Abs>
      )}
      {bO > 0 && (
        <Abs x={60} y={600} w={960} style={{opacity: bO, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
          <div style={{display: 'flex', gap: 30}}>{[0, 1].map((k) => <div key={k} style={{position: 'relative', transform: `scale(${spring(t, 226.6 + k * 0.2)})`}}><F n={k ? 'stethoscope' : 'medecin'} size={150} /><div style={{position: 'absolute', right: -16, bottom: -6, background: '#fff', borderRadius: 30}}><Check p={prog(t, 227.4 + k * 0.2, 227.8 + k * 0.2)} size={60} color={MINT} /></div></div>)}</div>
          <T size={64} style={{transform: `scale(${spring(t, 229.9)})`}}>Peut-il dire <span style={{color: CORAL}}>NON</span> ?</T>
          <svg width={700} height={380} viewBox="0 0 700 380">
            <path d="M80 330 A270 270 0 0 1 620 330" fill="none" stroke="url(#gN)" strokeWidth={44} strokeLinecap="round" />
            <defs><linearGradient id="gN"><stop offset="0" stopColor={MINT} /><stop offset="0.5" stopColor="#F5C342" /><stop offset="1" stopColor={CORAL} /></linearGradient></defs>
            <text x={70} y={375} fontFamily={sansFont} fontWeight={900} fontSize={34} fill={MINT}>OUI</text>
            <text x={630} y={375} textAnchor="end" fontFamily={sansFont} fontWeight={900} fontSize={34} fill={CORAL}>NON</text>
            <g transform={`translate(350 330) rotate(${needle})`}><line x1={0} y1={0} x2={0} y2={-230} stroke={INK} strokeWidth={12} strokeLinecap="round" /><circle r={26} fill={INK} /></g>
            {t > 231.0 && <text x={350} y={250} textAnchor="middle" fontFamily={handFont} fontSize={52} fill={INK} opacity={pop(t, 231.3)}>c'est nuancé…</text>}
          </svg>
        </Abs>
      )}
      {t > 233.0 && (
        <>
          {/* principe : gros bloc */}
          <Abs x={70} y={560} w={940} h={180 + 340 * grow} style={{...Paper, background: '#E9FBF5', border: `6px solid ${MINT}`, padding: 34, boxSizing: 'border-box', transform: `scale(${spring(t, 233.1)})`, transformOrigin: '50% 0', overflow: 'hidden'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}><Check p={prog(t, 236, 236.5)} size={80} color={MINT} /><T size={78} color="#0B7F65">GRAND PRINCIPE</T></div>
            <div style={{opacity: grow, marginTop: 24}}>
              <T size={44}>L'employeur respecte la décision du médecin du travail</T>
              <div style={{display: 'flex', gap: 16, marginTop: 22, flexWrap: 'wrap'}}>
                <Chip c={MINT} q={spring(t, 239.6)}>Aménagement mis en place</Chip>
                <Chip c={INK} q={spring(t, 241.4)}>C'est la règle</Chip>
              </div>
            </div>
            <div style={{position: 'absolute', right: 40, top: 40, fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: CORAL, transform: `scale(${1 + star * 0.6}) rotate(${star * 180}deg)`, opacity: t > 234.2 ? 1 : 0}}>*</div>
          </Abs>
          {/* petite exception → note de bas de page */}
          <Abs x={70 + (1 - star) * 640} y={760 + 340 * grow + star * 20} w={300 + star * 640} h={90 + star * 400} style={{...Paper, background: '#FFF2F0', border: `5px solid ${CORAL}`, padding: star > 0.5 ? 34 : 14, boxSizing: 'border-box', transform: `scale(${spring(t, 234.2)})`, transformOrigin: '100% 0', overflow: 'hidden'}}>
            <T size={star > 0.5 ? 54 : 34} color={CORAL}>{star > 0.5 ? '* EXCEPTION' : '* petite exception'}</T>
            {star > 0.5 && (
              <div style={{marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14}}>
                <T size={40} style={{opacity: pop(t, 244.2)}}>Refus possible uniquement si…</T>
                <div style={{opacity: pop(t, 248.1)}}><T size={44} color={CORAL}><span style={{background: HL, padding: '0 8px'}}>impossibilité justifiée</span></T></div>
                <Hand size={46} style={{opacity: pop(t, 251.1)}}>liée à la bonne marche de l'entreprise</Hand>
              </div>
            )}
          </Abs>
          {/* brique contre plume */}
          {t > 252.9 && (
            <>
              <Abs x={150} y={1300 - (1 - Math.min(1, ((t - 253.0) / 0.45) ** 2)) * 700} w={300} style={{textAlign: 'center'}}>
                <F n="brique" size={170} />
                <T size={34} color={INK}>Arguments solides</T>
              </Abs>
              {t > 254.4 && (
                <Abs x={620 + (t - 254.4) * 40} y={1320 - (t - 254.4) * 120} w={320} style={{textAlign: 'center', transform: `rotate(${Math.sin((t - 254.4) * 3) * 20}deg)`, opacity: 1 - prog(t, 256.8, 257.8)}}>
                  <svg width={170} height={170} viewBox="0 0 100 100"><path d="M20 90 C 30 50, 60 20, 90 10 C 80 40, 60 70, 20 90 Z" fill="#E8EDF5" stroke="#9AA3B2" strokeWidth={3} /><path d="M20 90 L75 25" stroke="#9AA3B2" strokeWidth={3} /></svg>
                  <T size={34} color={DIM} style={{textDecoration: 'line-through'}}>Simple excuse</T>
                </Abs>
              )}
            </>
          )}
        </>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Conclusion : la balançoire qui cherche l'équilibre ─────────── */
const Concl: React.FC = () => {
  const t = useT();
  if (t < CONCL) return null;
  const o = prog(t, CONCL + 0.2, CONCL + 0.8);
  let ang = 0;
  if (t < 271.0) ang = -14 * prog(t, 268.3, 269.3, easeOut);
  else ang = -14 * Math.exp(-(t - 271.0) * 1.1) * Math.cos((t - 271.0) * 4.2);
  if (t > 277.7) ang += Math.sin((t - 277.7) * 2.4) * 4 * prog(t, 277.7, 278.5);
  const PX = 540, PY = 1260, L = 900;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Abs x={60} y={570} w={960} style={{textAlign: 'center'}}>
        <Hand size={54} color={DIM} style={{opacity: pop(t, 258.8)}}>Le mi-temps thérapeutique, c'est avant tout</Hand>
        <T size={92} color={MINT} style={{textTransform: 'uppercase', transform: `scale(${spring(t, 262.1)})`}}>un outil d'équilibre</T>
      </Abs>
      {t > 277.7 && t < 284.2 && <Abs x={0} y={830} w={1080} style={{display: 'flex', justifyContent: 'center', transform: `scale(${spring(t, 277.7)})`}}><div style={{display: 'flex', alignItems: 'center', gap: 10}}><F n="question" size={110} /><T size={60}>Équilibre parfait ?</T></div></Abs>}
      {/* pivot */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={`M${PX} ${PY} L${PX - 90} ${PY + 210} L${PX + 90} ${PY + 210} Z`} fill={INK} opacity={pop(t, 263.0)} />
      </svg>
      <Abs x={PX - L / 2} y={PY - 18} w={L} h={36} style={{background: '#8B5E3C', borderRadius: 18, transform: `rotate(${ang}deg) scaleX(${pop(t, 263.4, 0.6)})`, transformOrigin: '50% 50%', boxShadow: 'inset 0 6px 0 rgba(255,255,255,0.25)'}}>
        {/* plateau gauche : santé */}
        <div style={{position: 'absolute', left: 10, bottom: 36, width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `rotate(${-ang}deg) translateY(${(1 - Math.min(1, ((t - 268.3) / 0.5) ** 2)) * -900}px)`, opacity: t > 268.3 ? 1 : 0}}>
          <div style={{display: 'flex', alignItems: 'flex-end'}}><F n="femme-bureau" size={190} /><div style={{marginLeft: -40}}><F n="coeur" size={120} /></div></div>
          <div style={{background: CORAL, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, padding: '8px 16px', borderRadius: 16, textAlign: 'center'}}>Santé du salarié</div>
        </div>
        {/* plateau droit : entreprise */}
        <div style={{position: 'absolute', right: 10, bottom: 36, width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `rotate(${-ang}deg) translateY(${(1 - Math.min(1, ((t - 271.0) / 0.5) ** 2)) * -900}px)`, opacity: t > 271.0 ? 1 : 0}}>
          <div style={{display: 'flex', alignItems: 'flex-end'}}><F n="batiment" size={190} /><div style={{marginLeft: -40}}><F n="engrenage" size={110} /></div></div>
          <div style={{background: '#3D7BFF', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, padding: '8px 16px', borderRadius: 16, textAlign: 'center'}}>Besoins de l'entreprise</div>
        </div>
      </Abs>
      {/* débat ouvert */}
      {t > 284.2 && (
        <>
          {[-1, 1].map((sd) => <Abs key={sd} x={sd < 0 ? 110 : 750} y={1390} style={{transform: `scale(${spring(t, 284.3 + (sd > 0 ? 0.25 : 0))}) scaleX(${sd})`}}><div style={{position: 'relative'}}><F n="bulle" size={220} /><div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scaleX(${sd})`, fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: INK, paddingBottom: 30}}>…</div></div></Abs>)}
          <Abs x={0} y={840} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Chip c={INK} q={spring(t, 285.25)} style={{fontSize: 46}}>Le débat reste ouvert</Chip></Abs>
        </>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── En-tête persistant ─────────── */
const Header: React.FC = () => {
  const t = useT();
  const ch = CH.find((c) => t >= c.at + CARD - 0.3 && t < c.end);
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 95, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(16,35,63,0.1)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {t > 3.0 && t < 38.1 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', opacity: pop(t, 3.0) * (1 - prog(t, 37.6, 38.1))}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '10px 26px', borderRadius: 40, background: '#fff', boxShadow: '0 10px 30px rgba(16,35,63,0.1)'}}><HalfClock size={60} t={t} /><T size={40}>Mi-temps thérapeutique</T></div>
        </div>
      )}
      {ch && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', opacity: pop(t, ch.at + CARD - 0.3) * (1 - prog(t, ch.end - 0.3, ch.end))}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '10px 26px 10px 10px', borderRadius: 40, background: '#fff', boxShadow: '0 10px 30px rgba(16,35,63,0.1)'}}>
            <div style={{width: 64, height: 64, borderRadius: 32, background: ch.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 38, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{ch.n}</div>
            <T size={38}>{ch.l}</T>
          </div>
        </div>
      )}
      {/* barre de progression des chapitres */}
      {t > 3.0 && (
        <div style={{position: 'absolute', left: 120, right: 120, top: 340, display: 'flex', gap: 10, opacity: pop(t, 3.0)}}>
          {CH.map((c) => <div key={c.n} style={{flex: 1, height: 8, borderRadius: 4, background: `${INK}15`, overflow: 'hidden'}}><div style={{height: '100%', width: `${prog(t, c.at, c.end, (x) => x) * 100}%`, background: c.c}} /></div>)}
        </div>
      )}
    </AbsoluteFill>
  );
};

const Bg: React.FC = () => {
  const t = useT();
  const ch = CH.find((c) => t >= c.at && t < c.end + 0.2);
  const c = ch ? ch.c : MINT;
  return (
    <AbsoluteFill style={{background: BG}}>
      <AbsoluteFill style={{backgroundImage: `radial-gradient(${INK}14 2px, transparent 2px)`, backgroundSize: '40px 40px', backgroundPosition: `0 ${-t * 6}px`}} />
      <AbsoluteFill style={{background: `radial-gradient(circle at 80% 20%, ${c}26, transparent 45%), radial-gradient(circle at 15% 85%, ${c}1C, transparent 40%)`}} />
    </AbsoluteFill>
  );
};

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'signature', v: 0.35},
  {at: 2.5, s: 'soft-whoosh', v: 0.55, dur: 2},
  {at: 3.0, s: 'sfx/thud', v: 0.35},
  {at: 4.6, s: 'sfx/rise', v: 0.3}, {at: 5.6, s: 'sfx/swish', v: 0.3}, {at: 6.5, s: 'sfx/thud', v: 0.35},
  {at: 7.5, s: 'deep-hit', v: 0.4},
  ...[0, 1, 2, 3, 4].map((k) => ({at: 9.2 + k * 0.28, s: 'sfx/pop', v: 0.3})),
  ...[0, 1, 2, 3, 4].map((k) => ({at: 10.95 + k * 0.75, s: 'sfx/click', v: 0.28})),
  {at: 10.4, s: 'validation', v: 0.32}, {at: 14.5, s: 'sfx/ding', v: 0.3},
  {at: 16.5, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...PROG.map(([, at]) => ({at, s: 'page', v: 0.45})),
  ...PROG.map(([, at]) => ({at: at + 0.05, s: 'sfx/pop', v: 0.28})),
  ...CH.flatMap((c) => [{at: c.at - 0.05, s: 'soft-whoosh', v: 0.55, dur: 2}, {at: c.at + 0.45, s: 'page', v: 0.5}, {at: c.at + 0.7, s: 'bass-hit', v: 0.35}, {at: c.at + CARD - 0.5, s: 'sfx/swish', v: 0.35}]),
  {at: 41.3, s: 'sfx/whoosh', v: 0.3}, {at: 44.0, s: 'sfx/swish', v: 0.3}, {at: 45.0, s: 'sfx/swish', v: 0.3}, {at: 48.0, s: 'sfx/swish', v: 0.25},
  {at: 52.1, s: 'tampon', v: 0.55}, {at: 55.7, s: 'sfx/swish', v: 0.3}, {at: 56.6, s: 'sfx/click', v: 0.35},
  {at: 59.3, s: 'sfx/whoosh', v: 0.35}, {at: 60.0, s: 'stylo', v: 0.4, dur: 2.6}, {at: 62.6, s: 'signature', v: 0.4},
  {at: 63.6, s: 'sfx/pop', v: 0.35}, {at: 64.6, s: 'riser', v: 0.18, dur: 5.4},
  ...[65.8, 67.1, 68.4].map((at) => ({at, s: 'validation', v: 0.3})),
  {at: 74.2, s: 'sfx/pop', v: 0.3}, {at: 75.6, s: 'sfx/pop', v: 0.3}, {at: 77.8, s: 'sfx/pop', v: 0.3},
  {at: 79.2, s: 'soft-whoosh', v: 0.45, dur: 1.5}, {at: 81.0, s: 'sfx/whoosh', v: 0.35}, {at: 90.7, s: 'sfx/whoosh', v: 0.35},
  ...[85.5, 86.6, 89.5, 94.4, 98.6, 100.9].map((at) => ({at, s: 'sfx/pop', v: 0.3})),
  {at: 98.6, s: 'deep-hit', v: 0.25},
  {at: 108.0, s: 'sfx/pop', v: 0.3}, {at: 111.1, s: 'sfx/pop', v: 0.3}, {at: 111.8, s: 'sfx/pop', v: 0.3},
  ...[0, 1, 2, 3].map((k) => ({at: 110.9 + k * 0.15, s: 'sfx/click', v: 0.3})),
  ...ACT.map((a) => ({at: a.at + 0.4, s: 'sfx/thud', v: 0.45})),
  ...ACT.map((a) => ({at: a.at, s: 'sfx/swish', v: 0.3})),
  ...ACT.map((a) => ({at: a.act[1], s: 'validation', v: 0.3})),
  {at: 128.0, s: 'sfx/ding', v: 0.35},
  {at: 145.7, s: 'sfx/pop', v: 0.3}, {at: 147.2, s: 'sfx/pop', v: 0.3},
  {at: 153.5, s: 'sfx/pop', v: 0.35}, {at: 158.3, s: 'sfx/click', v: 0.3}, {at: 158.6, s: 'sfx/click', v: 0.3},
  {at: 164.7, s: 'sfx/click', v: 0.4}, {at: 170.1, s: 'sfx/click', v: 0.4}, {at: 175.4, s: 'validation', v: 0.32},
  {at: 183.0, s: 'sfx/whoosh', v: 0.35}, {at: 189.9, s: 'notification', v: 0.35}, {at: 194.9, s: 'tampon', v: 0.5},
  {at: 199.8, s: 'validation', v: 0.35}, {at: 200.8, s: 'sfx/pop', v: 0.3},
  ...[0, 1, 2, 3, 4, 5].map((k) => ({at: 203.2 + k * 0.35, s: 'tick', v: 0.28})),
  {at: 204.5, s: 'sfx/ding', v: 0.3}, {at: 209.0, s: 'sfx/whoosh', v: 0.35}, {at: 210.6, s: 'stylo', v: 0.45, dur: 1.6},
  {at: 217.2, s: 'sfx/pop', v: 0.3}, {at: 218.6, s: 'sfx/pop', v: 0.3}, {at: 220.5, s: 'sfx/pop', v: 0.3}, {at: 221.7, s: 'sfx/pop', v: 0.3},
  {at: 227.4, s: 'validation', v: 0.25}, {at: 229.9, s: 'sfx/swish', v: 0.3}, {at: 230.5, s: 'tick', v: 0.3}, {at: 231.0, s: 'tension', v: 0.2, dur: 1.5},
  {at: 233.1, s: 'bass-hit', v: 0.4}, {at: 234.2, s: 'sfx/pop', v: 0.3}, {at: 236.0, s: 'validation', v: 0.32},
  {at: 239.6, s: 'sfx/pop', v: 0.3}, {at: 241.4, s: 'sfx/pop', v: 0.3}, {at: 242.5, s: 'sfx/rise', v: 0.35}, {at: 248.1, s: 'sfx/swish', v: 0.3},
  {at: 253.45, s: 'deep-hit', v: 0.5}, {at: 254.5, s: 'soft-whoosh', v: 0.35, dur: 2},
  {at: CONCL, s: 'soft-whoosh', v: 0.5, dur: 2}, {at: 262.1, s: 'bass-hit', v: 0.4}, {at: 263.4, s: 'sfx/swish', v: 0.3},
  {at: 268.8, s: 'sfx/thud', v: 0.45}, {at: 271.5, s: 'sfx/thud', v: 0.45}, {at: 273.0, s: 'validation', v: 0.3},
  {at: 277.7, s: 'sfx/pop', v: 0.35}, {at: 284.3, s: 'sfx/pop', v: 0.3}, {at: 284.55, s: 'sfx/pop', v: 0.3}, {at: 285.25, s: 'sfx/ding', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const MiTemps: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <Bg />
    <Gate from={0} to={17}><Hook /></Gate>
    <Gate from={16} to={39}><Programme /></Gate>
    <Gate from={38} to={71.5}><Ch1 /></Gate>
    <Gate from={71} to={104.5}><Ch2 /></Gate>
    <Gate from={104} to={141.5}><Ch3 /></Gate>
    <Gate from={141} to={214.5}><Ch4 /></Gate>
    <Gate from={213.8} to={259}><Ch5 /></Gate>
    <Gate from={258} to={OUTRO_AT}><Concl /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {CH.map((c) => <Gate key={c.n} from={c.at} to={c.at + CARD + 0.1}><ChapterCard ch={c} /></Gate>)}
    <Gate from={0} to={3.5}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.5} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-mi-temps-therapeutique-origine.m4a')} trimAfter={s(286.5)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

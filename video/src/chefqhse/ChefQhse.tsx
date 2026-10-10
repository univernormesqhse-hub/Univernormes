import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Gate, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Check} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {handFont, s, sansFont} from '../theme';
import {captions} from './captions';

/**
 * « Les missions du responsable QHSE : le chef d'orchestre » (5 min 30) — voix d'origine, sous-titres recalés mot à
 * mot, photos réelles et chef d'orchestre détouré. Fil rouge inédit : une portée musicale dont chaque mouvement
 * allume une note, et des transitions en rideau de théâtre qui s'ouvre sous un projecteur. Autres techniques
 * nouvelles : verre dépoli qui s'éclaircit, baguette qui trace sa trajectoire, ondes sonores symphonie / cacophonie,
 * plan de placement de l'orchestre, programme posé sur la portée, parapluie qui chapeaute, coup d'échecs, mouvement
 * d'horlogerie, tracé A → Z avec scans, calendrier qui s'effeuille jusqu'aux heures, jumelles, pile de risques,
 * carte de chaleur des douleurs sur une silhouette, changement d'échelle de la poubelle au site industriel, dôme qui
 * protège le village, partition sans improvisation, entonnoir théorie → pratique, plan d'évacuation multi-mobilités,
 * ola du public et applaudimètre, pièce à deux faces interne / externe, seau percé qu'on colmate, pièces qui
 * poussent comme une plante, rideau final.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 330.4;
export const CHEFQHSE_FRAMES = s(OUTRO_AT + 3.8);
const BG = '#14101F';
const INK = '#1A1426';
const LIGHT = '#FFF8EE';
const DIM = 'rgba(255,248,238,0.65)';
const GOLD = '#F2B83A';
const RED = '#E5484D';
const VELVET = '#8E1B2C';
const BLUE = '#4C8DFF';
const GREEN = '#3CCB86';
const TEAL = '#2EC4C4';
const VIO = '#A68BFF';
const PAPER = '#FBF3E2';
const PH = (p: string) => staticFile(p);

type Pt = {n: number; l: string; at: number; end: number; c: string; ic: string};
const PT: Pt[] = [
  {n: 1, l: 'La stratégie', at: 77.0, end: 100.9, c: GOLD, ic: 'boussole'},
  {n: 2, l: 'Une qualité parfaite', at: 101.0, end: 132.6, c: BLUE, ic: 'loupe'},
  {n: 3, l: 'La santé au travail', at: 132.8, end: 164.5, c: GREEN, ic: 'coeur'},
  {n: 4, l: "L'environnement industriel", at: 164.7, end: 191.7, c: TEAL, ic: 'planete'},
  {n: 5, l: 'Normes et certifications', at: 191.9, end: 255.9, c: VIO, ic: 'diplome'},
  {n: 6, l: 'Communiquer et protéger le portefeuille', at: 256.1, end: 309.0, c: RED, ic: 'megaphone'},
  {n: 7, l: 'Finale', at: 309.2, end: 330.2, c: GOLD, ic: 'etoile'},
];
const WIPE = 2.4;

const pop = (t: number, at: number, d = 0.4) => prog(t, at, at + d, easeOut);
const spring = (t: number, at: number, k = 7, w = 15) => {
  const x = t - at;
  return x <= 0 ? 0 : 1 - Math.exp(-x * k) * Math.cos(x * w);
};
const win = (t: number, a: number, b: number, f = 0.4) => prog(t, a, a + f) * (1 - prog(t, b - f, b));
const T: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 40, color = LIGHT, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, letterSpacing: -0.5, lineHeight: 1.05, ...style}}>{children}</div>
);
const Hand: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 48, color = LIGHT, style}) => (
  <div style={{fontFamily: handFont, fontSize: size, color, lineHeight: 1.1, ...style}}>{children}</div>
);
const Abs: React.FC<{x: number; y: number; w?: number; h?: number; children?: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, ...style}}>{children}</div>
);
const Chip: React.FC<{children: React.ReactNode; c?: string; q?: number; size?: number; dark?: boolean; style?: React.CSSProperties}> = ({children, c = GOLD, q = 1, size = 34, dark = true, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 26px', borderRadius: 50, background: c, color: dark ? INK : '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size, transform: `scale(${q})`, boxShadow: `0 12px 30px ${c}55`, whiteSpace: 'nowrap', ...style}}>{children}</div>
);
const Row: React.FC<{y: number; children: React.ReactNode; gap?: number}> = ({y, children, gap = 14}) => (
  <Abs x={0} y={y} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap, flexWrap: 'wrap', padding: '0 40px', boxSizing: 'border-box'}}>{children}</Abs>
);
const Title: React.FC<{children: React.ReactNode; y?: number}> = ({children, y = 450}) => <Abs x={60} y={y} w={960} style={{textAlign: 'center'}}><T size={58}>{children}</T></Abs>;
const Photo: React.FC<{src: string; x: number; y: number; w: number; h: number; q?: number; r?: number; pos?: string; children?: React.ReactNode; filter?: string; border?: string}> = ({src, x, y, w, h, q = 1, r = 0, pos = 'center', children, filter, border = 'rgba(255,255,255,0.92)'}) => {
  const t = useT();
  return (
    <Abs x={x} y={y} w={w} h={h} style={{borderRadius: 30, overflow: 'hidden', border: `6px solid ${border}`, boxShadow: '0 30px 60px rgba(0,0,0,0.5)', transform: `scale(${q}) rotate(${r}deg)`}}>
      <Img src={src} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${1.05 + (t % 30) * 0.004})`, filter}} />
      {children}
    </Abs>
  );
};
/** Note de musique (croche). */
const Note: React.FC<{size?: number; c?: string}> = ({size = 60, c = GOLD}) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 50 70"><ellipse cx={16} cy={58} rx={14} ry={10} fill={c} transform="rotate(-20 16 58)" /><rect x={27} y={4} width={5} height={54} fill={c} /><path d="M32 4 Q48 14 44 32 Q42 20 32 18 Z" fill={c} /></svg>
);
/** Portée musicale avec notes. */
const Staff: React.FC<{w: number; notes: {x: number; line: number; on: number; c?: string}[]; lineC?: string}> = ({w, notes, lineC = 'rgba(255,248,238,0.4)'}) => (
  <div style={{position: 'relative', width: w, height: 160}}>
    {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{position: 'absolute', left: 0, top: 30 + k * 24, width: w, height: 3, background: lineC}} />)}
    {notes.map((n, k) => <div key={k} style={{position: 'absolute', left: n.x, top: 30 + n.line * 12 - 70, opacity: n.on, transform: `scale(${0.6 + 0.4 * n.on})`}}><Note size={50} c={n.c} /></div>)}
  </div>
);

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: BG, opacity: 1 - out}}>
      {/* rideaux */}
      {[0, 1].map((k) => <div key={k} style={{position: 'absolute', top: 0, left: k ? 760 : 0, width: 320, height: 1920, background: `repeating-linear-gradient(90deg, ${VELVET} 0 40px, #6A1220 40px 80px)`, boxShadow: 'inset 0 0 80px rgba(0,0,0,0.6)'}} />)}
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 120, background: `repeating-linear-gradient(90deg, ${VELVET} 0 60px, #6A1220 60px 120px)`, borderBottom: `8px solid ${GOLD}`}} />
      <div style={{position: 'absolute', left: 140, top: 0, width: 800, height: 1500, background: 'radial-gradient(ellipse at 50% 0%, rgba(255,240,200,0.35), transparent 70%)'}} />
      <Img src={PH('causerie/orateur-d.png')} style={{position: 'absolute', left: 300, top: 360, height: 760, filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.6))'}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><path d="M760 420 Q820 330 900 300" stroke={GOLD} strokeWidth={6} fill="none" strokeLinecap="round" /></svg>
      {[[150, 400, BLUE], [880, 520, GREEN], [200, 760, VIO], [860, 840, RED]].map(([x, y, c], k) => <Abs key={k} x={x as number} y={(y as number) + Math.sin(t * 3 + k) * 12}><Note size={70} c={c as string} /></Abs>)}
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center', zIndex: 2}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <AbsoluteFill style={{background: `linear-gradient(180deg, transparent 50%, ${BG} 66%)`}} />
      <Abs x={60} y={1150} w={960} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: GOLD, color: INK, fontFamily: sansFont, fontWeight: 800, fontSize: 32, letterSpacing: 3}}>LE CHEF D'ORCHESTRE</div>
        <T size={112} style={{marginTop: 18, textTransform: 'uppercase', letterSpacing: -3}}>Missions du</T>
        <T size={112} color={GOLD} style={{textTransform: 'uppercase', letterSpacing: -3}}>responsable QHSE</T>
        <Hand size={46} color={DIM} style={{marginTop: 16}}>six mouvements pour une entreprise en harmonie</Hand>
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : rideau de théâtre ─────────── */
const CurtainWipe: React.FC<{p: Pt}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const close = prog(t, a, a + 0.5, easeInOut);
  const open = prog(t, b - 0.6, b, easeInOut);
  const w = 560 * close * (1 - open);
  return (
    <AbsoluteFill style={{zIndex: 55, pointerEvents: 'none'}}>
      {[0, 1].map((k) => (
        <div key={k} style={{position: 'absolute', top: 0, [k ? 'right' : 'left']: 0, width: w, height: 1920, background: `repeating-linear-gradient(90deg, ${VELVET} 0 46px, #6A1220 46px 92px)`, boxShadow: 'inset 0 0 90px rgba(0,0,0,0.6)', borderRadius: k ? '60px 0 0 0' : '0 60px 0 0'}} />
      ))}
      {close > 0.95 && open < 0.05 && (
        <AbsoluteFill>
          <div style={{position: 'absolute', left: 140, top: 0, width: 800, height: 1500, background: 'radial-gradient(ellipse at 50% 30%, rgba(255,240,200,0.45), transparent 65%)', opacity: pop(t, a + 0.5)}} />
          <Abs x={0} y={600} w={1080} style={{display: 'flex', justifyContent: 'center', transform: `scale(${spring(t, a + 0.55)})`}}><div style={{width: 220, height: 220, borderRadius: 110, background: 'rgba(0,0,0,0.35)', border: `5px solid ${p.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={p.ic} size={140} /></div></Abs>
          <Abs x={80} y={870} w={920} style={{textAlign: 'center', opacity: pop(t, a + 0.7)}}>
            <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: GOLD, fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK, letterSpacing: 2}}>{p.n < 7 ? `MOUVEMENT ${p.n}/6` : 'FINALE'}</div>
            <T size={p.l.length > 26 ? 72 : 88} style={{marginTop: 22, textShadow: '0 10px 30px rgba(0,0,0,0.5)'}}>{p.l}</T>
          </Abs>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Introduction ─────────── */
const Intro: React.FC = () => {
  const t = useT();
  const o = 1 - prog(t, 76.6, 77.0);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* lourd, opaque… fascinant : le verre dépoli */}
      {t < 19.6 && (() => {
        const frost = 1 - prog(t, 9.0, 10.4, easeInOut);
        const weight = prog(t, 5.3, 5.8, easeIn);
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 19.2, 19.6)}}>
            <Title>{t < 9.0 ? <>Un sujet <span style={{color: DIM}}>lourd, opaque</span>…</> : <>… absolument <span style={{color: GOLD}}>fascinant</span></>}</Title>
            <Photo src={PH('induction/technicien-hse.jpg')} x={90} y={600} w={900} h={700} q={spring(t, 3.0)} filter={`blur(${frost * 18}px) saturate(${1 - frost * 0.6})`}>
              <div style={{position: 'absolute', inset: 0, background: `rgba(255,255,255,${0.35 * frost})`}} />
              {t > 11.3 && <div style={{position: 'absolute', left: 24, bottom: 24, transform: `scale(${spring(t, 11.3)})`}}><Chip c={GOLD} size={32}>Le responsable QHSE</Chip></div>}
            </Photo>
            {t > 5.2 && t < 9.4 && <Abs x={430} y={-200 + weight * 760} style={{opacity: 1 - prog(t, 9.0, 9.4)}}><div style={{width: 220, height: 170, background: '#3A3346', clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 30, boxSizing: 'border-box'}}><T size={46}>LOURD</T></div></Abs>}
            {t > 14.0 && <Row y={1350} gap={14}><Chip c={LIGHT} q={spring(t, 14.06)}>Le pilier</Chip><Chip c={GOLD} q={spring(t, 14.6)}>Le roc</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* le chef d'orchestre : baguette + ondes */}
      {t > 19.4 && t < 44.6 && (() => {
        const sym = t > 38.0 && t < 42.6;
        const caco = t > 42.6;
        const trail: string[] = [];
        for (let k = 0; k < 24; k++) { const tt = t - k * 0.03; trail.push(`${700 + Math.sin(tt * 3) * 120},${640 + Math.sin(tt * 6) * 60}`); }
        return (
          <AbsoluteFill style={{opacity: win(t, 19.4, 44.6, 0.4)}}>
            <Title>Un <span style={{color: GOLD}}>chef d'orchestre</span></Title>
            <div style={{position: 'absolute', left: 140, top: 0, width: 800, height: 1500, background: 'radial-gradient(ellipse at 50% 20%, rgba(255,240,200,0.25), transparent 70%)'}} />
            <Img src={PH('causerie/orateur-d.png')} style={{position: 'absolute', left: 230, top: 560, height: 620, transform: `scale(${spring(t, 23.7)})`, transformOrigin: '50% 100%'}} />
            {t > 23.7 && <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><polyline points={trail.join(' ')} stroke={GOLD} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.8} /></svg>}
            {/* violons / trompettes → procédures / équipes */}
            {t > 28.9 && t < 38.0 && (
              <Abs x={620} y={820} w={420}>
                {[['♪ Violons', 28.9, 'Procédures', 32.1], ['♫ Trompettes', 29.6, 'Équipes', 35.1]].map(([a1, at1, b1, at2]) => (
                  <div key={a1 as string} style={{marginTop: 20, position: 'relative', height: 80}}>
                    {t < (at2 as number) ? <Chip c="#3A3346" dark={false} q={spring(t, at1 as number)}>{a1}</Chip> : <Chip c={GOLD} q={spring(t, at2 as number)}>{b1}</Chip>}
                  </div>
                ))}
              </Abs>
            )}
            {/* visualiseur d'ondes */}
            {(sym || caco) && (
              <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                {Array.from({length: 40}, (_, k) => {
                  const h = sym ? 40 + 60 * Math.abs(Math.sin(k * 0.35 + t * 4)) : 20 + 180 * random(`c${k}${Math.floor(t * 12)}`);
                  return <rect key={k} x={60 + k * 24} y={1290 - h / 2} width={14} height={h} rx={7} fill={sym ? GOLD : RED} opacity={0.9} />;
                })}
              </svg>
            )}
            {sym && <Row y={1420}><Chip c={GOLD} q={spring(t, 38.05)} size={30}>Une symphonie, au bureau ou à l'usine</Chip></Row>}
            {caco && <Row y={1420}><Chip c={RED} dark={false} q={spring(t, 42.7)} size={30}>Sans lui : la cacophonie</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* QHSE : le plan de placement de l'orchestre */}
      {t > 44.4 && t < 63.1 && (() => {
        const sec: [string, string, string, number][] = [['Q', 'Qualité', BLUE, 51.82], ['H', 'Hygiène', TEAL, 52.58], ['S', 'Sécurité', RED, 53.22], ['E', 'Environnement', GREEN, 53.7]];
        return (
          <AbsoluteFill style={{opacity: win(t, 44.4, 63.1, 0.4)}}>
            <Title>Que veut dire <span style={{color: GOLD}}>QHSE</span> ?</Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              {sec.map(([l, , c, at], k) => {
                const a0 = Math.PI + (k / 4) * Math.PI, a1 = Math.PI + ((k + 1) / 4) * Math.PI;
                const R = 440, r = 170, cx = 540, cy = 1260;
                const on = t > at;
                const p = (a: number, rr: number) => `${cx + rr * Math.cos(a)} ${cy + rr * Math.sin(a)}`;
                return <path key={l} d={`M${p(a0, r)} L${p(a0, R)} A${R} ${R} 0 0 1 ${p(a1, R)} L${p(a1, r)} A${r} ${r} 0 0 0 ${p(a0, r)} Z`} fill={on ? c : 'rgba(255,255,255,0.08)'} stroke={BG} strokeWidth={8} opacity={pop(t, 47.0 + k * 0.1)} />;
              })}
              {Array.from({length: 4}, (_, row) => Array.from({length: 9 + row * 3}, (_, k) => { const a = Math.PI + ((k + 0.5) / (9 + row * 3)) * Math.PI; const rr = 210 + row * 60; return <circle key={`${row}-${k}`} cx={540 + rr * Math.cos(a)} cy={1260 + rr * Math.sin(a)} r={9} fill="rgba(0,0,0,0.35)" />; }))}
            </svg>
            {sec.map(([l, n, c, at], k) => { const a = Math.PI + ((k + 0.5) / 4) * Math.PI; return t > at && <Abs key={l} x={540 + 320 * Math.cos(a) - 70} y={1260 + 320 * Math.sin(a) - 60} w={140} style={{textAlign: 'center', transform: `scale(${spring(t, at)})`}}><T size={72} color="#fff">{l}</T><T size={22} color="#fff">{n}</T></Abs>; })}
            {/* pupitre du chef */}
            <Abs x={480} y={1220} w={120} h={60} style={{borderRadius: 12, background: GOLD}} />
            {t > 54.8 && <Row y={1380}><Chip c={GOLD} q={spring(t, 54.85)} size={30}>4 grandes familles d'instruments</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* programme : six mouvements sur la portée */}
      {t > 62.9 && (() => {
        const at = [66.7, 68.1, 69.66, 70.98, 71.94, 73.5];
        return (
          <AbsoluteFill style={{opacity: pop(t, 62.9)}}>
            <Title>Six <span style={{color: GOLD}}>mouvements</span></Title>
            <Abs x={60} y={620}><Staff w={960} notes={PT.slice(0, 6).map((p, k) => ({x: 90 + k * 150, line: [6, 4, 5, 2, 3, 1][k], on: pop(t, at[k]), c: p.c}))} /></Abs>
            <div style={{position: 'absolute', left: 50, top: 630, fontFamily: 'serif', fontSize: 150, color: 'rgba(255,248,238,0.6)', lineHeight: 1}}>𝄞</div>
            <Abs x={90} y={840} w={900} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
              {PT.slice(0, 6).map((p, k) => (
                <div key={p.n} style={{display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 18, background: 'rgba(255,255,255,0.06)', border: `3px solid ${t > at[k] ? p.c : 'transparent'}`, opacity: pop(t, at[k]), transform: `translateY(${(1 - pop(t, at[k])) * 40}px)`}}>
                  <div style={{width: 52, height: 52, borderRadius: 26, background: p.c, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><T size={28} color={INK}>{p.n}</T></div>
                  <T size={28}>{['Stratégie', 'Qualité parfaite', 'Santé au travail', 'Environnement', 'Normes', 'Communication et coûts'][k]}</T>
                </div>
              ))}
            </Abs>
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Mouvement 1 : stratégie ─────────── */
const M1: React.FC = () => {
  const t = useT();
  const o = win(t, 79.4, 100.9, 0.4);
  if (o <= 0) return null;
  const umb = prog(t, 86.9, 87.9, easeOut);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 95.8 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 95.4, 95.8)}}>
          <Title>Un leader, une <span style={{color: GOLD}}>vision claire</span></Title>
          {t > 82.4 && t < 86.9 && <Abs x={360} y={620} style={{transform: `scale(${spring(t, 82.5)}) rotate(-15deg)`}}><F n="telescope" size={360} /></Abs>}
          {t > 86.8 && (
            <AbsoluteFill style={{opacity: pop(t, 86.8)}}>
              <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                <path d={`M${540 - 420 * umb} 900 Q540 ${900 - 360 * umb} ${540 + 420 * umb} 900 Q${540 + 315 * umb} 860 ${540 + 210 * umb} 900 Q${540 + 105 * umb} 860 540 900 Q${540 - 105 * umb} 860 ${540 - 210 * umb} 900 Q${540 - 315 * umb} 860 ${540 - 420 * umb} 900 Z`} fill={GOLD} />
                <line x1={540} y1={900 - 360 * umb} x2={540} y2={1250} stroke="#C9B48A" strokeWidth={10} />
                <path d="M540 1250 Q540 1290 500 1290" stroke="#C9B48A" strokeWidth={10} fill="none" />
              </svg>
              {['Qualité', 'Hygiène', 'Sécurité', 'Environnement'].map((l, k) => <Abs key={l} x={130 + k * 210} y={980} w={190} style={{textAlign: 'center', transform: `scale(${spring(t, 88.0 + k * 0.15)})`}}><F n={['loupe', 'savon', 'casque', 'planete'][k]} size={110} style={{margin: '0 auto'}} /><T size={26} style={{marginTop: 8}}>{l}</T></Abs>)}
              <Row y={1340}><Chip c={GOLD} q={spring(t, 87.0)} size={30}>Chapeauter et harmoniser toutes les démarches</Chip></Row>
              {t > 90.9 && <Row y={1440} gap={12}><Chip c={RED} dark={false} q={spring(t, 91.0)} size={28}>Garant de la sécurité</Chip>{t > 92.9 && <Chip c={LIGHT} q={spring(t, 92.95)} size={28}>Conformité réglementaire</Chip>}</Row>}
            </AbsoluteFill>
          )}
        </AbsoluteFill>
      )}
      {/* coup d'échecs */}
      {t > 95.6 && (() => {
        const mv = prog(t, 99.3, 100.0, easeInOut);
        return (
          <AbsoluteFill style={{opacity: pop(t, 95.6)}}>
            <Title>Rien n'est fait <span style={{color: GOLD}}>au hasard</span></Title>
            <Abs x={180} y={600} w={720} h={720} style={{display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', transform: `perspective(1400px) rotateX(25deg) scale(${spring(t, 95.7)})`}}>
              {Array.from({length: 36}, (_, k) => <div key={k} style={{background: (Math.floor(k / 6) + k) % 2 ? '#3A2E4A' : PAPER}} />)}
            </Abs>
            {[['♜', 1, 4, 97.06, 'Décision'], ['♝', 4, 4, 98.06, 'Politique']].map(([g, cx, cy, at, l]) => t > (at as number) && <Abs key={l as string} x={180 + (cx as number) * 120} y={560 + (cy as number) * 110} w={120} style={{textAlign: 'center', transform: `scale(${spring(t, at as number)})`}}><div style={{fontSize: 110, color: GOLD, lineHeight: 1, textShadow: '0 8px 16px rgba(0,0,0,0.5)'}}>{g}</div><T size={22} color={GOLD}>{l}</T></Abs>)}
            <Abs x={180 + (2 + mv * 1) * 120} y={560 + (5 - mv * 2) * 110 - Math.sin(mv * Math.PI) * 120} w={120} style={{textAlign: 'center'}}><div style={{fontSize: 120, color: LIGHT, lineHeight: 1, textShadow: '0 8px 16px rgba(0,0,0,0.5)'}}>♞</div></Abs>
            {t > 99.5 && <Row y={1360}><Chip c={GOLD} q={spring(t, 99.6)}>100 % stratégique</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Mouvement 2 : qualité ─────────── */
const M2: React.FC = () => {
  const t = useT();
  const o = win(t, 103.4, 132.6, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* mécanique de précision : mouvement d'horlogerie */}
      {t < 116.6 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 116.2, 116.6)}}>
          <Title>{t < 113.8 ? <>Pas une simple <span style={{color: DIM}}>case à cocher</span></> : <>Une <span style={{color: BLUE}}>mécanique de précision</span></>}</Title>
          {t < 113.8 && <Abs x={390} y={700} w={300} h={300} style={{borderRadius: 30, border: `14px solid ${LIGHT}`, transform: `scale(${spring(t, 103.7)}) rotate(${t > 113.0 ? (t - 113) * 40 : 0}deg)`, opacity: 1 - prog(t, 113.3, 113.8)}}><Check p={prog(t, 111.5, 112.0)} size={240} color={LIGHT} /></Abs>}
          {t > 113.8 && (
            <Abs x={240} y={620} w={600} h={600} style={{borderRadius: 300, background: 'radial-gradient(circle, #2A2340, #14101F)', border: `10px solid ${GOLD}`, overflow: 'hidden', transform: `scale(${spring(t, 113.9)})`}}>
              {[[120, 140, 220, 1, 14, GOLD], [300, 260, 200, -1.4, 12, '#C9B48A'], [150, 330, 160, 1.8, 10, BLUE], [330, 90, 140, -2.2, 9, '#E8D9B5']].map(([x, y, sz, sp, n, c], k) => (
                <div key={k} style={{position: 'absolute', left: x as number, top: y as number, width: sz as number, height: sz as number}}>
                  <svg width={sz as number} height={sz as number} viewBox="-50 -50 100 100" style={{transform: `rotate(${t * 40 * (sp as number)}deg)`}}>
                    {Array.from({length: n as number}, (_, j) => <rect key={j} x={-5} y={-50} width={10} height={14} fill={c as string} transform={`rotate(${(j * 360) / (n as number)})`} />)}
                    <circle r={38} fill={c as string} /><circle r={12} fill="#14101F" />{[0, 1, 2, 3].map((j) => <rect key={j} x={-3} y={-34} width={6} height={22} fill="#14101F" transform={`rotate(${j * 90})`} />)}
                  </svg>
                </div>
              ))}
              <div style={{position: 'absolute', left: 290, top: 290, width: 20, height: 20, borderRadius: 10, background: RED}} />
            </Abs>
          )}
        </AbsoluteFill>
      )}
      {/* tracer de A à Z, efficacité, sûreté, client */}
      {t > 116.4 && t < 126.0 && (
        <AbsoluteFill style={{opacity: win(t, 116.4, 126.0, 0.35)}}>
          <Title>Les rouages de la <span style={{color: BLUE}}>qualité</span></Title>
          <Abs x={70} y={570} w={940} h={300} style={{borderRadius: 26, background: 'rgba(255,255,255,0.05)', border: '3px solid rgba(255,255,255,0.15)'}}>
            <T size={30} color={BLUE} style={{position: 'absolute', left: 24, top: 16}}>Traçabilité des composants</T>
            <svg width={940} height={300} style={{position: 'absolute', inset: 0}}><line x1={80} y1={180} x2={80 + 780 * prog(t, 116.7, 118.9)} y2={180} stroke={BLUE} strokeWidth={8} strokeDasharray="18 10" /></svg>
            {['A', 'B', 'C', '…', 'Z'].map((l, k) => { const at = 116.7 + k * 0.5; return <div key={l} style={{position: 'absolute', left: 50 + k * 195, top: 140, width: 70, height: 70, borderRadius: 35, background: t > at ? BLUE : '#2A2340', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${t > at ? spring(t, at) : 0.8})`}}><T size={34} color="#fff">{l}</T>{t > at && <div style={{position: 'absolute', top: 76, width: 90, height: 6, background: `repeating-linear-gradient(90deg, #fff 0 3px, transparent 3px 6px)`}} />}</div>; })}
          </Abs>
          <Row y={920} gap={18}>
            {[['Efficacité des procédés', 'graphique', 119.2], ['Sûreté alimentaire', 'assiette', 121.46], ['Client satisfait', 'pouce', 123.1]].map(([l, ic, at]) => t > (at as number) - 0.1 && (
              <div key={l as string} style={{width: 280, height: 300, borderRadius: 26, background: PAPER, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `rotateY(${(1 - pop(t, at as number, 0.5)) * 90}deg)`}}><F n={ic as string} size={130} /><T size={30} color={INK} style={{textAlign: 'center', marginTop: 14, padding: '0 10px'}}>{l}</T></div>
            ))}
          </Row>
        </AbsoluteFill>
      )}
      {/* calendrier qui s'effeuille : semaines → heures */}
      {t > 125.8 && (() => {
        const flip = prog(t, 129.2, 131.4, easeIn);
        const days = Math.round(21 * (1 - flip));
        return (
          <AbsoluteFill style={{opacity: pop(t, 125.8)}}>
            <Title>Une <span style={{color: BLUE}}>traçabilité béton</span></Title>
            <Abs x={340} y={600} w={400} h={460} style={{borderRadius: 26, background: PAPER, boxShadow: '0 30px 60px rgba(0,0,0,0.5)', overflow: 'hidden', transform: `scale(${spring(t, 126.0)})`}}>
              <div style={{height: 100, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={36} color="#fff">RAPPEL PRODUIT</T></div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 360}}>
                {t < 131.4 ? <><T size={150} color={INK}>{days}</T><T size={40} color={INK}>jours</T></> : <><F n="sablier" size={150} /><T size={44} color={GREEN}>quelques heures</T></>}
              </div>
              {flip > 0 && flip < 1 && <div style={{position: 'absolute', left: 0, top: 100, width: 400, height: 360, background: PAPER, transformOrigin: '50% 0', transform: `rotateX(${((t * 14) % 1) * 90}deg)`, opacity: 0.8}} />}
            </Abs>
            <Row y={1120} gap={20}><Chip c="#3A3346" dark={false} size={30} q={spring(t, 130.18)} style={{textDecoration: t > 131.4 ? 'line-through' : 'none'}}>Plusieurs semaines</Chip><T size={50}>→</T><Chip c={GREEN} size={30} q={spring(t, 131.46)}>Quelques heures</Chip></Row>
            {t > 131.5 && <Abs x={0} y={1230} w={1080} style={{textAlign: 'center', opacity: pop(t, 131.6)}}><Hand size={32} color={DIM}>exemple cité par la vidéo d'origine</Hand></Abs>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Mouvement 3 : santé au travail ─────────── */
const M3: React.FC = () => {
  const t = useT();
  const o = win(t, 135.2, 164.5, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* jumelles : anticiper */}
      {t < 142.6 && (() => {
        const sx = Math.sin((t - 136) * 0.9) * 160;
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 142.2, 142.6)}}>
            <Title>Dans l'<span style={{color: GREEN}}>anticipation</span></Title>
            <Abs x={60} y={600} w={960} h={600} style={{overflow: 'hidden', borderRadius: 30, WebkitMaskImage: `radial-gradient(circle 230px at ${330 + sx}px 300px, #000 98%, transparent 100%), radial-gradient(circle 230px at ${630 + sx}px 300px, #000 98%, transparent 100%)`, WebkitMaskComposite: 'source-over'}}>
              <Img src={PH('verites/formation-sol.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(1.3) translateX(${-sx * 0.3}px)`}} />
            </Abs>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><circle cx={390 + sx} cy={900} r={232} fill="none" stroke="#1A1426" strokeWidth={14} /><circle cx={690 + sx} cy={900} r={232} fill="none" stroke="#1A1426" strokeWidth={14} /></svg>
            {t > 139.8 && <Row y={1260}><Chip c={GREEN} q={spring(t, 139.9)} size={30}>Ne pas attendre que les problèmes arrivent</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* une montagne de risques */}
      {t > 142.4 && t < 154.4 && (
        <AbsoluteFill style={{opacity: win(t, 142.4, 154.4, 0.35)}}>
          <Title>Une <span style={{color: GREEN}}>montagne</span> de risques</Title>
          <Photo src={PH('verites/accident.jpg')} x={70} y={580} w={560} h={380} q={spring(t, 146.7)} />
          {t > 146.6 && <Abs x={90} y={900}><Chip c={RED} dark={false} q={spring(t, 146.7)} size={28}>Accidents du travail</Chip></Abs>}
          {t > 148.3 && <Abs x={660} y={600} w={350} h={340} style={{borderRadius: 30, background: PAPER, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `rotate(4deg) scale(${spring(t, 148.35)})`}}><F n="stethoscope" size={150} /><T size={30} color={INK} style={{textAlign: 'center', marginTop: 10}}>Maladies professionnelles</T></Abs>}
          {t > 152.4 && <Abs x={300} y={990} w={480} h={340} style={{borderRadius: 30, background: '#2A2340', border: `5px solid ${VIO}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `rotate(-3deg) scale(${spring(t, 152.5)})`}}><F n="cerveau" size={150} /><T size={32} style={{marginTop: 10}}>Risques psychosociaux</T><Hand size={28} color={DIM}>on les oublie souvent</Hand></Abs>}
          {t > 144.3 && t < 146.6 && <Abs x={380} y={700} style={{transform: `scale(${spring(t, 144.35)})`}}><F n="montagne" size={320} /></Abs>}
          <Abs x={110} y={1380} style={{opacity: pop(t, 145.3)}}><Chip c={GREEN} size={28}>Évaluation proactive</Chip></Abs>
        </AbsoluteFill>
      )}
      {/* carte de chaleur des douleurs */}
      {t > 154.2 && (() => {
        const fix = prog(t, 158.2, 160.2, easeInOut);
        const spots: [number, number, number][] = [[540, 830, 50], [470, 980, 60], [610, 980, 60], [540, 1110, 70], [420, 1260, 40]];
        return (
          <AbsoluteFill style={{opacity: pop(t, 154.2)}}>
            <Title>{t < 158.1 ? <>Des tactiques <span style={{color: GREEN}}>concrètes</span></> : <>Revoir l'<span style={{color: GREEN}}>ergonomie</span></>}</Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <circle cx={540} cy={720} r={70} fill="#3A3346" />
              <path d="M450 800 Q540 780 630 800 L660 1180 L600 1190 L590 1500 L555 1500 L540 1250 L525 1500 L490 1500 L480 1190 L420 1180 Z" fill="#3A3346" />
              <path d="M450 810 L360 1080 L390 1090 L470 900 Z M630 810 L720 1080 L690 1090 L610 900 Z" fill="#3A3346" />
              {spots.map(([x, y, r], k) => <circle key={k} cx={x} cy={y} r={r * (1 + 0.15 * Math.sin(t * 5 + k))} fill={fix < 0.5 ? RED : GREEN} opacity={(0.55 - 0.25 * fix) * pop(t, 155.3 + k * 0.2)} style={{filter: 'blur(14px)'}} />)}
            </svg>
            {t > 158.2 && <Abs x={720} y={760} w={300} h={260} style={{borderRadius: 24, background: PAPER, padding: 20, boxSizing: 'border-box', transform: `scale(${spring(t, 158.3)})`}}>
              <T size={26} color={INK}>Poste réglé</T>
              {['Écran à hauteur', 'Siège ajusté', 'Gestes adaptés'].map((l, k) => <div key={l} style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 12}}><div style={{width: 34, height: 34, borderRadius: 8, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Check p={prog(t, 158.6 + k * 0.4, 159 + k * 0.4)} size={28} color={INK} /></div><T size={24} color={INK}>{l}</T></div>)}
            </Abs>}
            {t > 155.3 && t < 158.2 && <Abs x={740} y={900}><Chip c={RED} dark={false} q={spring(t, 155.35)} size={28}>Zones de douleur</Chip></Abs>}
            {t > 162.8 && <Row y={1420}><Chip c={GREEN} q={spring(t, 162.85)} size={30}>Ni douleurs, ni blessures</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Mouvement 4 : environnement ─────────── */
const M4: React.FC = () => {
  const t = useT();
  const o = win(t, 167.1, 191.7, 0.4);
  if (o <= 0) return null;
  const zoom = prog(t, 176.3, 177.8, easeInOut);
  const dome = prog(t, 188.4, 189.6, easeOut);
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Title>{t < 176.3 ? <>On <span style={{color: TEAL}}>change d'échelle</span></> : t < 185.3 ? <>Des enjeux <span style={{color: RED}}>colossaux</span></> : <>Protéger la <span style={{color: TEAL}}>planète</span> et les riverains</>}</Title>
      {/* poubelle de cantine → site industriel */}
      <Abs x={70} y={580} w={940} h={760} style={{borderRadius: 30, overflow: 'hidden', border: '6px solid rgba(255,255,255,0.9)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)'}}>
        <Img src={PH('smi/raffinerie.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${3.5 - 2.5 * zoom})`, opacity: zoom, filter: t > 185.3 ? 'none' : 'grayscale(0.4)'}} />
        <div style={{position: 'absolute', inset: 0, background: '#E8E1D2', opacity: 1 - zoom, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{transform: `scale(${1 - zoom * 0.8})`}}><F n="poubelle" size={300} /></div>
          <T size={40} color={INK} style={{opacity: 1 - zoom}}>Le tri à la cantine ?</T>
        </div>
        {/* points chauds */}
        {zoom > 0.9 && [[200, 600, 179.3, 'Explosions', 'bombe'], [720, 420, 180.26, 'Pollution chimique des sols', 'goutte'], [650, 170, 182.26, 'Incendies majeurs', 'feu']].map(([x, y, at, l, ic]) => t > (at as number) && (
          <div key={l as string} style={{position: 'absolute', left: x as number, top: y as number, transform: `scale(${spring(t, at as number)})`}}>
            <div style={{position: 'absolute', left: -60, top: -60, width: 120, height: 120, borderRadius: 60, border: `6px solid ${RED}`, transform: `scale(${1 + ((t * 1.5) % 1)})`, opacity: 1 - ((t * 1.5) % 1)}} />
            <div style={{position: 'absolute', left: -50, top: -50, width: 100, height: 100, borderRadius: 50, background: 'rgba(229,72,77,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={ic as string} size={64} /></div>
            <div style={{position: 'absolute', left: x as number > 500 ? -330 : 60, top: 50, whiteSpace: 'nowrap'}}><Chip c={RED} dark={false} size={26}>{l}</Chip></div>
          </div>
        ))}
        {/* dôme protecteur */}
        {dome > 0 && <div style={{position: 'absolute', left: 470 - 600 * dome, top: 760 - 600 * dome, width: 1200 * dome, height: 1200 * dome, borderRadius: '50%', border: `8px solid ${TEAL}`, background: 'rgba(46,196,196,0.12)'}} />}
      </Abs>
      {t > 189.5 && <Row y={1380} gap={16}>{[0, 1, 2, 3].map((k) => <div key={k} style={{transform: `scale(${spring(t, 190.5 + k * 0.1)})`}}><F n="maison" size={90} /></div>)}<Chip c={TEAL} q={spring(t, 190.5)} size={28}>Populations locales</Chip></Row>}
      {t > 185.3 && t < 189.5 && <Row y={1380}><Chip c={TEAL} q={spring(t, 185.4)}>Maîtriser les risques extrêmes : vital</Chip></Row>}
    </AbsoluteFill>
  );
};

/* ─────────── Mouvement 5 : normes et certifications ─────────── */
const M5: React.FC = () => {
  const t = useT();
  const o = win(t, 194.3, 255.9, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* la partition stricte */}
      {t < 218.4 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 218.0, 218.4)}}>
          <Title>Une <span style={{color: VIO}}>partition stricte</span></Title>
          <Abs x={90} y={570} w={900} h={460} style={{borderRadius: 18, background: PAPER, boxShadow: '0 30px 60px rgba(0,0,0,0.5)', padding: '30px 40px', boxSizing: 'border-box', transform: `rotate(-1deg) scale(${spring(t, 196.3)})`}}>
            {[0, 1, 2].map((r) => <div key={r} style={{marginTop: r ? 10 : 0}}><Staff w={820} lineC="rgba(26,20,38,0.5)" notes={Array.from({length: 9}, (_, k) => ({x: 30 + k * 88, line: (k * 3 + r * 2) % 7, on: pop(t, 196.6 + r * 0.5 + k * 0.05), c: INK}))} /></div>)}
          </Abs>
          {t > 200.4 && <Abs x={640} y={980} style={{transform: `rotate(-10deg) scale(${spring(t, 200.5)})`, border: `7px solid ${RED}`, borderRadius: 14, padding: '4px 18px', background: 'rgba(20,16,31,0.9)'}}><T size={40} color={RED}>ZÉRO IMPROVISATION</T></Abs>}
          {t > 203.3 && (
            <Abs x={90} y={1100} w={900} style={{display: 'flex', gap: 18, alignItems: 'center'}}>
              <div style={{transform: `scale(${spring(t, 203.4)})`}}><F n="livres" size={170} /></div>
              <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
                <T size={34}>Textes réglementaires très denses</T>
                <div style={{display: 'flex', gap: 12}}>{[['État', 206.38], ['ISO', 208.3], ['AFNOR', 209.4]].map(([l, at]) => t > (at as number) && <div key={l as string} style={{padding: '8px 20px', border: `5px solid ${VIO}`, borderRadius: 12, transform: `rotate(${-6 + (l as string).length}deg) scale(${spring(t, at as number, 9, 18)})`}}><T size={32} color={VIO}>{l}</T></div>)}</div>
              </div>
            </Abs>
          )}
          {t > 212.5 && <Row y={1360}><Chip c={VIO} q={spring(t, 212.6)}><F n="cadenas" size={44} />Non négociable · en toute légalité</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* entonnoir théorie → pratique + plan d'évacuation */}
      {t > 218.2 && t < 240.6 && (() => {
        const plan = t > 236.3;
        return (
          <AbsoluteFill style={{opacity: win(t, 218.2, 240.6, 0.35)}}>
            <Title>De la <span style={{color: VIO}}>théorie</span> à la <span style={{color: GOLD}}>pratique</span></Title>
            {!plan && (
              <AbsoluteFill>
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><path d="M190 700 L890 700 L620 1050 L620 1200 L460 1200 L460 1050 Z" fill="rgba(166,139,255,0.18)" stroke={VIO} strokeWidth={6} /></svg>
                {Array.from({length: 6}, (_, k) => { const p = ((t - 222) * 0.4 + k / 6) % 1; if (t < 222) return null; return <div key={k} style={{position: 'absolute', left: 300 + (k % 3) * 160 + (540 - 300 - (k % 3) * 160) * Math.min(1, p * 1.6) - 50, top: 600 + p * 520, width: 100, height: 130, borderRadius: 8, background: PAPER, opacity: 1 - p, transform: `rotate(${k * 30 + t * 40}deg) scale(${1 - p * 0.6})`}} />; })}
                {[['Évaluer l’environnement de travail', 227.0, 'loupe'], ['Intégrer les besoins de chacun', 229.26, 'equipe'], ['Procédures hyper ciblées', 234.3, 'clipboard']].map(([l, at, ic], k) => t > (at as number) && <Abs key={l as string} x={90} y={1240 + k * 90} style={{transform: `translateX(${(1 - pop(t, at as number)) * -400}px)`}}><Chip c={[LIGHT, VIO, GOLD][k]} size={30}><F n={ic as string} size={40} />{l}</Chip></Abs>)}
                {t > 224.6 && t < 227 && <Row y={1240}><Chip c={GOLD} q={spring(t, 224.66)} size={30}>Inclusives et sur mesure</Chip></Row>}
              </AbsoluteFill>
            )}
            {plan && (
              <AbsoluteFill style={{opacity: pop(t, 236.3)}}>
                <Abs x={120} y={600} w={840} h={720} style={{borderRadius: 20, background: PAPER, boxShadow: '0 30px 60px rgba(0,0,0,0.5)', overflow: 'hidden'}}>
                  <T size={30} color={INK} style={{position: 'absolute', left: 24, top: 18}}>PLAN D'ÉVACUATION — toutes mobilités</T>
                  <svg width={840} height={720} style={{position: 'absolute', inset: 0}}>
                    <rect x={40} y={80} width={760} height={600} fill="none" stroke={INK} strokeWidth={8} />
                    <line x1={420} y1={80} x2={420} y2={420} stroke={INK} strokeWidth={6} /><line x1={40} y1={420} x2={600} y2={420} stroke={INK} strokeWidth={6} />
                    <rect x={720} y={560} width={80} height={120} fill={GREEN} /><text x={760} y={630} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={22} fill="#fff">SORTIE</text>
                    <path d="M200 250 L200 520 L700 520 L760 600" stroke={GREEN} strokeWidth={10} fill="none" strokeDasharray="1 0" pathLength={1} strokeDashoffset={1 - prog(t, 236.5, 238.0)} />
                    <path d="M560 250 L560 470 L680 470 L760 580" stroke={BLUE} strokeWidth={10} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, 237.2, 238.7)} />
                    <path d="M200 600 L700 620" stroke={GOLD} strokeWidth={10} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, 238.0, 239.5)} />
                  </svg>
                  {[[160, 210, GREEN, 'marche'], [520, 210, BLUE, 'fauteuil'], [160, 560, GOLD, 'malvoyant']].map(([x, y, c, l]) => <div key={l as string} style={{position: 'absolute', left: x as number, top: y as number, padding: '4px 12px', borderRadius: 10, background: c as string}}><T size={22} color={INK}>{l === 'fauteuil' ? 'Fauteuil roulant' : l === 'marche' ? 'À pied' : 'Malvoyant'}</T></div>)}
                </Abs>
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* la ola du public : certification */}
      {t > 240.4 && (
        <AbsoluteFill style={{opacity: pop(t, 240.4)}}>
          <Title>Les <span style={{color: GOLD}}>applaudissements</span> du public</Title>
          {t > 243.9 && <Abs x={410} y={620} style={{transform: `scale(${spring(t, 244.0)}) rotate(${Math.sin(t * 2) * 5}deg)`}}><F n="medaille" size={260} /></Abs>}
          {t > 243.9 && <Row y={900}><Chip c={GOLD} q={spring(t, 244.1)}>Certification</Chip></Row>}
          {Array.from({length: 4}, (_, r) => Array.from({length: 10}, (_, k) => {
            const wave = t > 247.6 ? Math.max(0, Math.sin((t - 247.6) * 5 - k * 0.6)) : 0;
            return <div key={`${r}-${k}`} style={{position: 'absolute', left: 70 + k * 96 + (r % 2) * 20, top: 1080 + r * 80 - wave * 40, width: 56, height: 56, borderRadius: 28, background: ['#C99467', '#8D5A3B', '#E3B48C', '#6B4A33'][(k + r) % 4], boxShadow: '0 30px 0 -8px #3A3346', opacity: pop(t, 240.6 + r * 0.1)}}>{wave > 0.6 && <div style={{position: 'absolute', left: -14, top: -40, fontSize: 30}}>👏</div>}</div>;
          }))}
          {t > 252.1 && <Abs x={0} y={1420} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}>{[['Réputation', 252.18], ['Valeur', 252.98], ['Crédibilité', 253.6]].map(([l, at]) => t > (at as number) && <Chip key={l as string} c={GOLD} q={spring(t, at as number)} size={30}>↑ {l}</Chip>)}</Abs>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Mouvement 6 : communication et portefeuille ─────────── */
const M6: React.FC = () => {
  const t = useT();
  const o = win(t, 258.5, 309.0, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* pièce à deux faces : interne / externe */}
      {t < 289.4 && (() => {
        const flip = prog(t, 276.2, 277.0, easeInOut);
        const ext = flip > 0.5;
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 289.0, 289.4)}}>
            <Title>Une <span style={{color: RED}}>double casquette</span></Title>
            <Abs x={140} y={570} w={800} h={560} style={{perspective: 1600}}>
              <div style={{width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d', transform: `rotateY(${flip * 180}deg) scale(${spring(t, 262.9)})`}}>
                {[['INTERNE', 'induction/briefing-atelier.jpg', GOLD, 0], ['EXTERNE', 'induction/reunion-audit.jpg', BLUE, 180]].map(([l, src, c, r]) => (
                  <div key={l as string} style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: `rotateY(${r}deg)`, borderRadius: 30, overflow: 'hidden', border: `8px solid ${c}`}}>
                    <Img src={PH(src as string)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                    <div style={{position: 'absolute', left: 20, top: 20, padding: '6px 20px', borderRadius: 14, background: c as string}}><T size={36} color={INK}>{l}</T></div>
                  </div>
                ))}
              </div>
            </Abs>
            {!ext && t > 269.8 && <Abs x={140} y={1170} w={800} style={{display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center'}}>{[['Équipes', 271.78], ['Représentants du personnel', 272.6], ['Sensibiliser au bon comportement', 274.0]].map(([l, at]) => t > (at as number) && <Chip key={l as string} c={GOLD} q={spring(t, at as number)} size={28}>{l}</Chip>)}</Abs>}
            {ext && <Abs x={140} y={1170} w={800} style={{display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center'}}>{[['Rassurer', 279.78], ['Prouver', 280.86], ['Négocier', 281.5], ['Fournisseurs', 282.7], ['Clients', 283.62], ['Autorités', 284.3]].map(([l, at], k) => t > (at as number) && <Chip key={l as string} c={k < 3 ? BLUE : LIGHT} dark={k >= 3} q={spring(t, at as number)} size={28}>{l}</Chip>)}</Abs>}
            {t > 287.4 && <Row y={1400}><Chip c={RED} dark={false} q={spring(t, 287.5)}><F n="poignee" size={44} />Un vrai diplomate</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* le seau percé qu'on colmate */}
      {t > 289.2 && (() => {
        const patch = prog(t, 296.9, 297.9, easeOut);
        const holes: [number, number, number, string][] = [[370, 1080, 298.5, 'Produits défectueux'], [700, 1150, 301.9, 'Accidents du travail']];
        return (
          <AbsoluteFill style={{opacity: pop(t, 289.2)}}>
            <Title>{t < 304.9 ? <>Protéger le <span style={{color: RED}}>portefeuille</span></> : <>Des <span style={{color: GOLD}}>investissements</span> qui rapportent</>}</Title>
            {t < 305.0 && (
              <AbsoluteFill style={{opacity: 1 - prog(t, 304.6, 305.0)}}>
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                  <path d="M300 820 L780 820 L720 1300 L360 1300 Z" fill="#5B5268" stroke="#C9C1D6" strokeWidth={8} />
                  <ellipse cx={540} cy={820} rx={240} ry={40} fill="#3A3346" stroke="#C9C1D6" strokeWidth={8} />
                  <ellipse cx={540} cy={840} rx={210} ry={28} fill={GOLD} opacity={0.8 - 0.3 * (1 - patch) * prog(t, 292, 296.8)} />
                </svg>
                {holes.map(([x, y, at, l], k) => {
                  const fixed = t > at;
                  return (
                    <React.Fragment key={l}>
                      {!fixed && Array.from({length: 5}, (_, j) => { const p = ((t * 1.2 + j * 0.2) % 1); return <div key={j} style={{position: 'absolute', left: x + (k ? 1 : -1) * p * 120, top: y + p * p * 260, width: 34, height: 34, borderRadius: 17, background: GOLD, opacity: 1 - p, boxShadow: '0 0 0 3px #B8862A'}} />; })}
                      <div style={{position: 'absolute', left: x - 30, top: y - 30, width: 60, height: 60, borderRadius: fixed ? 10 : 30, background: fixed ? GREEN : '#14101F', transform: `rotate(${fixed ? 20 : 0}deg) scale(${fixed ? spring(t, at) : 1})`}} />
                      {fixed && <div style={{position: 'absolute', left: k ? 560 : 110, top: 1340}}><Chip c={GREEN} q={spring(t, at)} size={26}>✓ {l}</Chip></div>}
                    </React.Fragment>
                  );
                })}
                {t > 291.8 && t < 298.5 && <Row y={1440}><Chip c={RED} dark={false} q={spring(t, 291.9)} size={30}>Les coûts de non-qualité fuient</Chip></Row>}
                {t > 301.8 && <Row y={1440}><Chip c={GOLD} q={spring(t, 301.9)} size={30}>Coût humain et financier évité</Chip></Row>}
              </AbsoluteFill>
            )}
            {t > 304.8 && (
              <AbsoluteFill style={{opacity: pop(t, 304.8)}}>
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                  <rect x={380} y={1240} width={320} height={160} rx={20} fill="#8A5A2B" />
                  <path d={`M540 1240 L540 ${1240 - 420 * prog(t, 305.0, 306.6)}`} stroke={GREEN} strokeWidth={16} />
                  {[[-1, 1130], [1, 1030], [-1, 930], [1, 860]].map(([sd, y], k) => t > 305.4 + k * 0.3 && <ellipse key={k} cx={540 + (sd as number) * 70} cy={y as number} rx={70} ry={30} fill={GREEN} transform={`rotate(${(sd as number) * -25} ${540 + (sd as number) * 70} ${y})`} />)}
                </svg>
                {[[-1, 1080], [1, 980], [-1, 880], [1, 810]].map(([sd, y], k) => t > 306.9 + k * 0.25 && <Abs key={k} x={540 + (sd as number) * 150 - 40} y={(y as number) - 40} style={{transform: `scale(${spring(t, 306.9 + k * 0.25)})`}}><div style={{width: 80, height: 80, borderRadius: 40, background: GOLD, border: '6px solid #B8862A', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={40} color={INK}>€</T></div></Abs>)}
                <Row y={1440}><Chip c={GOLD} q={spring(t, 306.9)} size={30}>Sécurité + qualité = rentabilité</Chip></Row>
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Finale ─────────── */
const Finale: React.FC = () => {
  const t = useT();
  if (t < 311.5) return null;
  const o = pop(t, 311.6, 0.5);
  const calm = prog(t, 316.5, 318.0, easeInOut);
  const close = prog(t, 328.2, 329.8, easeInOut);
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Title>{t < 319.4 ? <>Garder l'<span style={{color: GOLD}}>harmonie</span></> : <>Le <span style={{color: GOLD}}>gardien de l'équilibre</span></>}</Title>
      <div style={{position: 'absolute', left: 140, top: 0, width: 800, height: 1500, background: 'radial-gradient(ellipse at 50% 30%, rgba(255,240,200,0.3), transparent 70%)'}} />
      <Img src={PH('causerie/orateur-d.png')} style={{position: 'absolute', left: 300, top: 640, height: 640, transform: `scale(${spring(t, 311.8)})`, transformOrigin: '50% 100%'}} />
      {/* tempête de risques qui s'apaise en notes */}
      {['danger', 'feu', 'eclair', 'collision', 'vent', 'goutte'].map((ic, k) => {
        const a = (k / 6) * Math.PI * 2 + t * (1.2 - calm);
        const r = 380 - calm * 40;
        return <Abs key={ic} x={540 + Math.cos(a) * r - 45} y={960 + Math.sin(a) * r * 0.75 - 45} style={{transform: `rotate(${Math.sin(t * 6 + k) * 20 * (1 - calm)}deg)`}}>{calm < 0.5 ? <F n={ic} size={90} /> : <Note size={70} c={[GOLD, BLUE, GREEN, VIO, RED, TEAL][k]} />}</Abs>;
      })}
      {t > 321.9 && t < 323.6 && <Abs x={110} y={1330} style={{transform: `scale(${spring(t, 321.95)})`}}><Chip c="#3A3346" dark={false} style={{textDecoration: 'line-through'}}>Simple contrôleur de règles</Chip></Abs>}
      {t > 323.6 && <Row y={1330} gap={12}><Chip c={GOLD} q={spring(t, 323.65)}>Gardien de l'équilibre</Chip><Chip c={LIGHT} q={spring(t, 325.0)}>et de l'avenir</Chip></Row>}
      {/* rideau final */}
      {close > 0 && [0, 1].map((k) => <div key={k} style={{position: 'absolute', top: 0, [k ? 'right' : 'left']: 0, width: 560 * close, height: 1920, background: `repeating-linear-gradient(90deg, ${VELVET} 0 46px, #6A1220 46px 92px)`, boxShadow: 'inset 0 0 90px rgba(0,0,0,0.6)', zIndex: 5}} />)}
      {t > 328.6 && <Abs x={0} y={880} w={1080} style={{textAlign: 'center', zIndex: 6, opacity: pop(t, 328.7)}}><Hand size={70} color={GOLD}>Merci, et à la prochaine !</Hand></Abs>}
    </AbsoluteFill>
  );
};

/* ─────────── En-tête : la portée des mouvements ─────────── */
const Header: React.FC = () => {
  const t = useT();
  const p = PT.find((x) => t >= x.at + WIPE - 0.3 && t < x.end);
  const done = PT.filter((x) => t >= x.at + 1).length;
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 95, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {t > 2.5 && t < 77.0 && <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', opacity: pop(t, 2.5) * (1 - prog(t, 76.6, 77.0))}}><div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '8px 24px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${GOLD}`}}><Note size={30} /><T size={34}>Missions du <span style={{color: GOLD}}>responsable QHSE</span></T></div></div>}
      {p && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 232, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: pop(t, p.at + WIPE - 0.3) * (1 - prog(t, p.end - 0.3, p.end))}}>
          <div style={{position: 'relative', width: 150, height: 60}}>
            {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{position: 'absolute', left: 0, top: 8 + k * 10, width: 150, height: 2, background: 'rgba(255,248,238,0.35)'}} />)}
            {PT.slice(0, 6).map((x, k) => <div key={k} style={{position: 'absolute', left: 6 + k * 24, top: 4 + [4, 2, 3, 1, 2, 0][k] * 8, width: 14, height: 11, borderRadius: '50%', background: k < done ? x.c : 'rgba(255,248,238,0.2)', transform: 'rotate(-20deg)'}} />)}
          </div>
          <div style={{padding: '8px 22px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${p.c}`}}><T size={p.l.length > 26 ? 26 : 32}>{p.l}</T></div>
        </div>
      )}
    </AbsoluteFill>
  );
};

const Bg: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{background: BG}}>
      {/* notes qui flottent */}
      {Array.from({length: 14}, (_, k) => {
        const y = 1920 - (((t * (0.02 + random(`ny${k}`) * 0.03) + random(`n0${k}`)) % 1) * 2100);
        return <div key={k} style={{position: 'absolute', left: random(`nx${k}`) * 1000, top: y, opacity: 0.08, transform: `rotate(${Math.sin(t + k) * 15}deg)`}}><Note size={50} c={LIGHT} /></div>;
      })}
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 0%, rgba(242,184,58,0.12), transparent 60%)'}} />
    </AbsoluteFill>
  );
};

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/bell', v: 0.3}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  {at: 3.0, s: 'sfx/pop', v: 0.25}, {at: 5.8, s: 'deep-hit', v: 0.4}, {at: 9.0, s: 'sfx/rise', v: 0.3}, {at: 10.4, s: 'sfx/ding', v: 0.3}, {at: 11.3, s: 'sfx/pop', v: 0.28}, {at: 14.06, s: 'sfx/thud', v: 0.35}, {at: 14.6, s: 'sfx/thud', v: 0.35},
  {at: 19.6, s: 'sfx/whoosh', v: 0.3}, {at: 23.7, s: 'sfx/swish', v: 0.35}, ...[28.9, 29.6].map((at) => ({at, s: 'sfx/pop', v: 0.25})), ...[32.1, 35.1].map((at) => ({at, s: 'sfx/ding', v: 0.3})), {at: 38.0, s: 'sfx/rise', v: 0.25}, {at: 42.6, s: 'tension', v: 0.25, dur: 1.6}, {at: 42.7, s: 'deep-hit', v: 0.35},
  {at: 44.6, s: 'sfx/whoosh', v: 0.3}, ...[51.82, 52.58, 53.22, 53.7].map((at) => ({at, s: 'sfx/ding', v: 0.3})), {at: 54.85, s: 'sfx/pop', v: 0.25},
  {at: 63.0, s: 'sfx/whoosh', v: 0.3}, ...[66.7, 68.1, 69.66, 70.98, 71.94, 73.5].map((at) => ({at, s: 'sfx/bell', v: 0.22})),
  ...PT.flatMap((p) => [{at: p.at, s: 'sfx/swish', v: 0.45}, {at: p.at + 0.5, s: 'sfx/thud', v: 0.35}, {at: p.at + 0.55, s: 'bass-hit', v: 0.3}, {at: p.at + WIPE - 0.6, s: 'soft-whoosh', v: 0.4, dur: 1}]),
  {at: 82.5, s: 'sfx/pop', v: 0.3}, {at: 86.9, s: 'sfx/whoosh', v: 0.35}, ...[88.0, 88.15, 88.3, 88.45].map((at) => ({at, s: 'sfx/pop', v: 0.22})), {at: 91.0, s: 'sfx/pop', v: 0.25}, {at: 92.95, s: 'tampon', v: 0.35},
  {at: 95.7, s: 'sfx/whoosh', v: 0.3}, {at: 97.06, s: 'sfx/thud', v: 0.35}, {at: 98.06, s: 'sfx/thud', v: 0.35}, {at: 99.3, s: 'sfx/swish', v: 0.3}, {at: 100.0, s: 'sfx/thud', v: 0.45}, {at: 99.6, s: 'sfx/ding', v: 0.3},
  {at: 103.7, s: 'sfx/pop', v: 0.25}, {at: 111.5, s: 'sfx/ding', v: 0.25}, {at: 113.3, s: 'sfx/swish', v: 0.3}, {at: 113.9, s: 'sfx/rise', v: 0.25}, ...Array.from({length: 10}, (_, k) => ({at: 114.0 + k * 0.25, s: 'tick', v: 0.22})),
  ...Array.from({length: 5}, (_, k) => ({at: 116.7 + k * 0.5, s: 'sfx/click', v: 0.35})), ...[119.2, 121.46, 123.1].map((at) => ({at, s: 'page', v: 0.35})),
  {at: 126.0, s: 'sfx/pop', v: 0.3}, ...Array.from({length: 18}, (_, k) => ({at: 129.2 + k * 0.12, s: 'page', v: 0.15})), {at: 131.46, s: 'validation', v: 0.32},
  {at: 135.3, s: 'sfx/whoosh', v: 0.3}, {at: 139.9, s: 'sfx/pop', v: 0.25}, {at: 144.35, s: 'deep-hit', v: 0.3}, {at: 146.7, s: 'sfx/thud', v: 0.35}, {at: 148.35, s: 'sfx/pop', v: 0.28}, {at: 152.5, s: 'sfx/pop', v: 0.28},
  {at: 154.3, s: 'sfx/whoosh', v: 0.3}, ...Array.from({length: 5}, (_, k) => ({at: 155.3 + k * 0.2, s: 'tick', v: 0.2})), {at: 158.3, s: 'sfx/swish', v: 0.3}, ...[158.6, 159.0, 159.4].map((at) => ({at, s: 'sfx/click', v: 0.35})), {at: 162.85, s: 'validation', v: 0.3},
  {at: 167.2, s: 'sfx/pop', v: 0.25}, {at: 176.3, s: 'sfx/whoosh', v: 0.4}, {at: 177.6, s: 'bass-hit', v: 0.35}, ...[179.3, 180.26, 182.26].map((at) => ({at, s: 'alarme', v: 0.12, dur: 0.7})), {at: 185.4, s: 'deep-hit', v: 0.3}, {at: 188.4, s: 'sfx/rise', v: 0.3}, {at: 189.6, s: 'validation', v: 0.32},
  {at: 196.3, s: 'page', v: 0.45}, ...Array.from({length: 8}, (_, k) => ({at: 196.6 + k * 0.2, s: 'tick', v: 0.18})), {at: 200.5, s: 'tampon', v: 0.45}, {at: 203.4, s: 'sfx/thud', v: 0.35}, ...[206.38, 208.3, 209.4].map((at) => ({at, s: 'tampon', v: 0.35})), {at: 212.6, s: 'cadenas', v: 0.45},
  {at: 218.4, s: 'sfx/whoosh', v: 0.3}, {at: 222.0, s: 'page', v: 0.3}, {at: 224.66, s: 'sfx/pop', v: 0.25}, ...[227.0, 229.26, 234.3].map((at) => ({at, s: 'sfx/swish', v: 0.3})), {at: 236.4, s: 'page', v: 0.4}, ...[236.5, 237.2, 238.0].map((at) => ({at, s: 'sfx/rise', v: 0.18})),
  {at: 240.6, s: 'sfx/whoosh', v: 0.3}, {at: 244.0, s: 'sfx/bell', v: 0.35}, {at: 247.6, s: 'soft-whoosh', v: 0.3, dur: 3}, ...Array.from({length: 8}, (_, k) => ({at: 247.8 + k * 0.4, s: 'sfx/pop', v: 0.15})), ...[252.18, 252.98, 253.6].map((at) => ({at, s: 'sfx/ding', v: 0.28})),
  {at: 262.9, s: 'sfx/pop', v: 0.3}, ...[271.78, 272.6, 274.0].map((at) => ({at, s: 'sfx/pop', v: 0.25})), {at: 276.2, s: 'sfx/swish', v: 0.45}, {at: 277.0, s: 'sfx/thud', v: 0.3}, ...[279.78, 280.86, 281.5, 282.7, 283.62, 284.3].map((at) => ({at, s: 'sfx/pop', v: 0.22})), {at: 287.5, s: 'validation', v: 0.3},
  {at: 289.3, s: 'sfx/whoosh', v: 0.3}, {at: 298.5, s: 'sfx/thud', v: 0.4}, {at: 301.9, s: 'sfx/thud', v: 0.4}, {at: 302.0, s: 'validation', v: 0.3},
  {at: 305.0, s: 'sfx/rise', v: 0.3}, ...[306.9, 307.15, 307.4, 307.65].map((at) => ({at, s: 'sfx/ding', v: 0.25})),
  {at: 311.7, s: 'sfx/whoosh', v: 0.3}, {at: 312.0, s: 'tension', v: 0.15, dur: 4}, {at: 317.0, s: 'sfx/rise', v: 0.3}, {at: 318.0, s: 'sfx/bell', v: 0.3}, {at: 321.95, s: 'sfx/thud', v: 0.3}, {at: 323.65, s: 'validation', v: 0.32}, {at: 328.2, s: 'soft-whoosh', v: 0.4, dur: 1.6},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const ChefQhse: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <Bg />
    <Gate from={0} to={77.1}><Intro /></Gate>
    <Gate from={79.3} to={101.0}><M1 /></Gate>
    <Gate from={103.3} to={132.8}><M2 /></Gate>
    <Gate from={135.1} to={164.7}><M3 /></Gate>
    <Gate from={167.0} to={191.9}><M4 /></Gate>
    <Gate from={194.2} to={256.1}><M5 /></Gate>
    <Gate from={258.4} to={309.2}><M6 /></Gate>
    <Gate from={311.4} to={OUTRO_AT}><Finale /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><CurtainWipe p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.3} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-chef-orchestre-qhse-origine.m4a')} trimAfter={s(330.2)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

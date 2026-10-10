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
 * « QSE : une politique ou trois ? » (4 min 58) — voix d'origine, sous-titres recalés mot à mot, photos réelles et
 * personnages détourés. Fil rouge inédit : le passage du « OU » au « ET », et des transitions en tresse (trois brins
 * Q, S, E qui se tressent en une seule corde). Autres techniques nouvelles : pièces de puzzle qui s'emboîtent, échangeur
 * routier qui fusionne trois voies, mobile en équilibre, colonnes antiques qui sortent du sol, horloge à engrenages,
 * bouclier qui renvoie les dangers, empreinte qui rétrécit, aimants qui se repoussent, silos, tir à la corde à trois,
 * photocopieuse qui crache des doublons, agenda des audits qui se chevauchent, face-à-face de deux responsables,
 * boussole affolée, cercles qui fusionnent, boutons radio (OU) contre cases à cocher (ET), gemme à facettes, train
 * d'engrenages Q → S → E, coffre au trésor et radar à 360°, immeuble en coupe avec ascenseur, plateau de jeu des
 * étapes, levier qui soulève la performance, saut du « OU » au « ET ».
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 297.6;
export const SMI_FRAMES = s(OUTRO_AT + 3.8);
const BG = '#0E1726';
const INK = '#121A2B';
const LIGHT = '#F4F7FF';
const DIM = 'rgba(244,247,255,0.65)';
const Q = '#3D8BFF';
const S = '#FF5A4E';
const E = '#3DD68C';
const GOLD = '#FFC83D';
const PAPER = '#FBF6EA';
const PH = (p: string) => staticFile(p);

type Pt = {n: number; l: string; at: number; end: number; c: string};
const PT: Pt[] = [
  {n: 1, l: 'Les trois piliers', at: 36.0, end: 94.4, c: Q},
  {n: 2, l: 'Trois systèmes, trop de problèmes', at: 94.6, end: 149.0, c: S},
  {n: 3, l: 'La solution : un système intégré', at: 149.2, end: 200.0, c: E},
  {n: 4, l: "Les bénéfices de l'intégration", at: 200.2, end: 247.0, c: GOLD},
  {n: 5, l: 'Passer à l’action', at: 247.2, end: 269.9, c: '#B48CFF'},
  {n: 6, l: 'Le mot de la fin', at: 270.1, end: 297.4, c: GOLD},
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
    <Abs x={x} y={y} w={w} h={h} style={{borderRadius: 30, overflow: 'hidden', border: `6px solid ${border}`, boxShadow: '0 30px 60px rgba(0,0,0,0.45)', transform: `scale(${q}) rotate(${r}deg)`}}>
      <Img src={src} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${1.05 + (t % 30) * 0.004})`, filter}} />
      {children}
    </Abs>
  );
};
const Letter: React.FC<{l: string; c: string; size?: number}> = ({l, c, size = 90}) => (
  <div style={{width: size, height: size, borderRadius: size / 2, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 10px 24px ${c}66`}}><T size={size * 0.55} color="#fff">{l}</T></div>
);
const Iso: React.FC<{n: string; c: string; q?: number}> = ({n, c, q = 1}) => (
  <div style={{display: 'inline-flex', flexDirection: 'column', alignItems: 'center', padding: '14px 26px', borderRadius: 20, border: `5px solid ${c}`, background: 'rgba(14,23,38,0.85)', transform: `scale(${q})`}}><T size={26} color={DIM}>NORME</T><T size={50} color={c}>ISO {n}</T></div>
);
const Gear: React.FC<{size: number; c: string; rot: number; teeth?: number; children?: React.ReactNode}> = ({size, c, rot, teeth = 12, children}) => (
  <div style={{position: 'relative', width: size, height: size}}>
    <svg width={size} height={size} viewBox="-50 -50 100 100" style={{position: 'absolute', inset: 0, transform: `rotate(${rot}deg)`}}>
      {Array.from({length: teeth}, (_, k) => <rect key={k} x={-6} y={-50} width={12} height={16} rx={2} fill={c} transform={`rotate(${(k * 360) / teeth})`} />)}
      <circle r={38} fill={c} /><circle r={30} fill={BG} opacity={0.35} />
    </svg>
    <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{children}</div>
  </div>
);

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  const panels: [string, string, string][] = [['induction/operatrice.jpg', Q, 'Q'], ['verites/groupe.jpg', S, 'S'], ['smi/raffinerie.jpg', E, 'E']];
  return (
    <AbsoluteFill style={{zIndex: 60, background: BG, opacity: 1 - out}}>
      {panels.map(([src, c, l], k) => (
        <div key={l} style={{position: 'absolute', left: k * 360, top: 0, width: 360, height: 1100, overflow: 'hidden', borderRight: k < 2 ? `6px solid ${BG}` : 'none'}}>
          <Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.85)'}} />
          <div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${c}55, ${BG}EE 92%)`}} />
          <div style={{position: 'absolute', left: 135, top: 820}}><Letter l={l} c={c} /></div>
        </div>
      ))}
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${BG}CC 0%, transparent 22%, transparent 45%, ${BG} 62%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={60} y={1120} w={960} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: GOLD, color: INK, fontFamily: sansFont, fontWeight: 800, fontSize: 32, letterSpacing: 3}}>MANAGEMENT INTÉGRÉ</div>
        <T size={150} style={{marginTop: 18, letterSpacing: -4}}>QSE</T>
        <T size={72} style={{letterSpacing: -2}}>une politique <span style={{color: GOLD}}>ou trois ?</span></T>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30, marginTop: 30}}>
          <T size={64} color={DIM} style={{textDecoration: 'line-through', textDecorationColor: S, textDecorationThickness: 8}}>OU</T>
          <T size={64} color={DIM}>→</T>
          <T size={80} color={GOLD}>ET</T>
        </div>
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : la tresse ─────────── */
const BraidWipe: React.FC<{p: Pt}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const inQ = prog(t, a, a + 0.45, easeInOut);
  const merge = prog(t, a + 0.5, a + 1.4, easeInOut);
  const out = prog(t, b - 0.45, b, easeIn);
  const path = (ph: number) => {
    let d = '';
    for (let x = -20; x <= 1100; x += 20) {
      const amp = 160 * (1 - merge) + 14;
      const y = 960 + Math.sin(x / 90 + t * 5 + ph) * amp;
      d += `${x === -20 ? 'M' : 'L'}${x} ${y}`;
    }
    return d;
  };
  return (
    <AbsoluteFill style={{zIndex: 55, background: BG, clipPath: `inset(${(1 - inQ) * 50 + out * 50}% 0 ${(1 - inQ) * 50 + out * 50}% 0)`}}>
      <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, ${p.c}44, transparent 60%)`}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[[Q, 0], [S, (2 * Math.PI) / 3], [E, (4 * Math.PI) / 3]].map(([c, ph]) => <path key={c as string} d={path(ph as number)} stroke={c as string} strokeWidth={30} fill="none" strokeLinecap="round" opacity={1 - merge * 0.5} />)}
        {merge > 0.5 && <path d={path(0)} stroke={GOLD} strokeWidth={44 * prog(merge, 0.5, 1)} fill="none" strokeLinecap="round" />}
      </svg>
      <Abs x={60} y={560} w={960} style={{textAlign: 'center', opacity: pop(t, a + 0.4), transform: `translateY(${(1 - pop(t, a + 0.4, 0.5)) * 40}px)`}}>
        <div style={{display: 'inline-block', padding: '8px 24px', borderRadius: 40, background: 'rgba(255,255,255,0.1)', border: `3px solid ${p.c}`, fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff', letterSpacing: 2}}>{p.n < 6 ? `PARTIE ${p.n}/5` : 'CONCLUSION'}</div>
        <T size={86} style={{marginTop: 24}}>{p.l}</T>
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Introduction ─────────── */
const Intro: React.FC = () => {
  const t = useT();
  const o = 1 - prog(t, 35.9, 36.2);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* puzzle : casse-tête ou avantage */}
      {t < 11.6 && (() => {
        const snap = prog(t, 6.2, 7.2, easeInOut);
        const pcs: [string, string, number, number, number][] = [['Q', Q, -260, 0.2, -25], ['S', S, 0, 0.87, 18], ['E', E, 260, 1.52, -12]];
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 11.2, 11.6)}}>
            <Title>{t < 6.2 ? <>Un vrai <span style={{color: S}}>casse-tête</span>…</> : <>… ou un <span style={{color: GOLD}}>avantage compétitif</span></>}</Title>
            {pcs.map(([l, c, x, at, r], k) => {
              const sx = x * 1.25 + (k - 1) * 40, sy = (k === 1 ? -120 : 90);
              const fx = (k - 1) * 230, fy = 0;
              return t > at - 0.2 && (
                <Abs key={l} x={540 - 120 + sx + (fx - sx) * snap} y={860 + sy + (fy - sy) * snap} w={240} h={240} style={{transform: `rotate(${r * (1 - snap)}deg) scale(${spring(t, at)})`}}>
                  <svg width={240} height={240} viewBox="0 0 100 100" style={{overflow: 'visible'}}><path d="M10 10 H40 a10 10 0 1 1 20 0 H90 V40 a10 10 0 1 1 0 20 V90 H60 a10 10 0 1 0 -20 0 H10 V60 a10 10 0 1 0 0 -20 Z" fill={c} stroke={snap > 0.95 ? GOLD : 'none'} strokeWidth={3} /></svg>
                  <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={110} color="#fff">{l}</T></div>
                </Abs>
              );
            })}
            {t > 7.2 && <Abs x={420} y={1150} style={{transform: `scale(${spring(t, 7.3)})`}}><F n="trophee" size={240} /></Abs>}
            {t < 6.2 && ['Qualité', 'Sécurité', 'Environnement'].map((l, k) => t > [0.2, 0.87, 1.52][k] && <Abs key={l} x={0} y={1180 + k * 80} w={1080} style={{textAlign: 'center'}}><T size={50} color={[Q, S, E][k]} style={{opacity: pop(t, [0.2, 0.87, 1.52][k])}}>{l}</T></Abs>)}
          </AbsoluteFill>
        );
      })()}
      {/* échangeur : trois voies ou une seule */}
      {t > 11.4 && t < 20.1 && (() => {
        const m = prog(t, 14.5, 16.6, easeInOut);
        return (
          <AbsoluteFill style={{opacity: win(t, 11.4, 20.1, 0.4)}}>
            <Title>Séparés… <span style={{color: GOLD}}>ou intégrés ?</span></Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              {[Q, S, E].map((c, k) => {
                const x0 = 240 + k * 300;
                const x1 = 540 + (k - 1) * 300 * (1 - m);
                return (
                  <g key={c}>
                    <path d={`M${x0} 1500 C${x0} 1200 ${x1} 1050 ${x1} 760`} stroke="#2A3550" strokeWidth={130} fill="none" />
                    <path d={`M${x0} 1500 C${x0} 1200 ${x1} 1050 ${x1} 760`} stroke={c} strokeWidth={10} fill="none" strokeDasharray="40 30" strokeDashoffset={t * 160} />
                  </g>
                );
              })}
              {m > 0.6 && <path d="M540 780 L540 640" stroke={GOLD} strokeWidth={130 * prog(m, 0.6, 1)} />}
            </svg>
            {[0, 1, 2].map((k) => { const p = ((t * 0.35 + k * 0.33) % 1); const x0 = 240 + k * 300, x1 = 540 + (k - 1) * 300 * (1 - m); const y = 1500 - p * 740; const u = p; const x = x0 + (x1 - x0) * easeInOut(Math.min(1, u * 1.2)); return <Abs key={k} x={x - 40} y={y - 60}><F n="camion" size={80} /></Abs>; })}
            {t > 12.8 && t < 14.5 && <Row y={1560}><Chip c="#2A3550" dark={false} q={spring(t, 12.8)} size={30}>3 pilotages séparés ?</Chip></Row>}
            {t > 16.0 && <Row y={1560}><Chip c={GOLD} q={spring(t, 16.0)} size={30}>Une seule et même stratégie</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* le mobile en équilibre */}
      {t > 19.9 && (() => {
        const items: [string, string, number, string][] = [['Produits au top', 'etoile', 26.3, Q], ['Travail super sûr', 'casque', 28.4, S], ['Respect de la planète', 'planete', 29.6, E], ['Rentabilité', 'argent', 31.98, GOLD]];
        const n = items.filter((i) => t > i[2]).length;
        const tilt = n === 0 ? 0 : n === 4 ? Math.sin(t * 1.5) * 2 * Math.exp(-(t - 32) * 0.8) : [0, -14, 10, -8][n] + Math.sin(t * 2) * 2;
        return (
          <AbsoluteFill style={{opacity: pop(t, 19.9)}}>
            <Title>{t < 34.7 ? <>Trouver l'<span style={{color: GOLD}}>équilibre parfait</span></> : <>La <span style={{color: GOLD}}>performance durable</span></>}</Title>
            {t > 22.5 && t < 25.5 && <Abs x={380} y={620} style={{transform: `rotate(${Math.sin(t * 3) * 6}deg) scale(${spring(t, 22.5)})`}}><F n="parchemin" size={300} /></Abs>}
            {t > 25.5 && (
              <Abs x={0} y={600} w={1080} h={900} style={{opacity: pop(t, 25.5)}}>
                <div style={{position: 'absolute', left: 538, top: 0, width: 4, height: 90, background: '#C9D3E6'}} />
                <div style={{position: 'absolute', left: 140, top: 90, width: 800, height: 600, transformOrigin: '50% 0', transform: `rotate(${tilt}deg)`}}>
                  <div style={{position: 'absolute', left: 0, top: 0, width: 800, height: 8, borderRadius: 4, background: '#C9D3E6'}} />
                  {items.map(([l, ic, at, c], k) => {
                    const x = [40, 270, 530, 760][k];
                    const L = [180, 330, 240, 380][k];
                    return t > at && (
                      <div key={l} style={{position: 'absolute', left: x - 2, top: 4, width: 4, height: L, background: '#C9D3E6', transformOrigin: '50% 0', transform: `rotate(${-tilt}deg)`}}>
                        <div style={{position: 'absolute', left: -90, top: L, width: 180, textAlign: 'center', transform: `scale(${spring(t, at)})`}}>
                          <div style={{width: 130, height: 130, margin: '0 auto', borderRadius: 65, background: `${c}33`, border: `5px solid ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={ic} size={80} /></div>
                          <T size={26} style={{marginTop: 8}}>{l}</T>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Abs>
            )}
            {t > 34.7 && <Row y={1460}><Chip c={GOLD} q={spring(t, 34.75)}>Tout tient ensemble</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 1 : les trois piliers ─────────── */
const Column: React.FC<{c: string; l: string; h: number; rise: number; on: boolean}> = ({c, l, h, rise, on}) => (
  <div style={{position: 'relative', width: 220, height: h, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 0, bottom: 0, width: 220, height: h, transform: `translateY(${(1 - rise) * h}px)`}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 220, height: 40, borderRadius: 8, background: on ? c : '#C9D3E6'}} />
      <div style={{position: 'absolute', left: 20, top: 40, width: 180, height: h - 80, background: on ? `repeating-linear-gradient(90deg, ${c} 0 22px, ${c}BB 22px 30px)` : 'repeating-linear-gradient(90deg, #DCE3EF 0 22px, #B9C4D8 22px 30px)'}} />
      <div style={{position: 'absolute', left: 0, bottom: 0, width: 220, height: 40, borderRadius: 8, background: on ? c : '#C9D3E6'}} />
      <div style={{position: 'absolute', left: 0, top: 70, width: 220, textAlign: 'center'}}><T size={110} color="#fff" style={{textShadow: '0 6px 16px rgba(0,0,0,0.3)'}}>{l}</T></div>
    </div>
  </div>
);
const P1: React.FC = () => {
  const t = useT();
  const o = win(t, 38.4, 94.4, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* les colonnes qui sortent du sol */}
      {t < 46.0 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 45.6, 46.0)}}>
          <Title>Trois <span style={{color: GOLD}}>piliers</span></Title>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><path d="M80 680 L540 560 L1000 680 Z" fill="#C9D3E6" opacity={pop(t, 42.8)} /></svg>
          <Row y={690} gap={60}>{[Q, S, E].map((c, k) => <Column key={c} c={c} l={'QSE'[k]} h={620} rise={prog(t, 40.9 + k * 0.4, 42.0 + k * 0.4, easeOut)} on={t > 43.0} />)}</Row>
          <div style={{position: 'absolute', left: 60, top: 1310, width: 960, height: 30, borderRadius: 8, background: '#C9D3E6'}} />
          {t > 41.7 && <Row y={1380}><Chip c={GOLD} q={spring(t, 41.75)} size={30}>Trois engagements fondamentaux</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* Qualité : horloge à engrenages */}
      {t > 45.8 && t < 61.1 && (
        <AbsoluteFill style={{opacity: win(t, 45.8, 61.1, 0.35)}}>
          <Title><span style={{color: Q}}>Qualité</span> : la confiance client</Title>
          <Photo src={PH('induction/operatrice.jpg')} x={70} y={590} w={520} h={700} q={spring(t, 46.0)} pos="50% 25%" border={Q} />
          <Abs x={630} y={600} style={{transform: `scale(${spring(t, 52.5)})`}}><Iso n="9001" c={Q} /></Abs>
          {t > 59.3 && (
            <Abs x={640} y={820} w={360} h={360} style={{transform: `scale(${spring(t, 59.4)})`}}>
              <div style={{position: 'absolute', left: 30, top: 30}}><Gear size={200} c={Q} rot={t * 90} /></div>
              <div style={{position: 'absolute', left: 190, top: 170}}><Gear size={150} c="#7FB2FF" rot={-t * 120 + 15} teeth={9} /></div>
              <svg width={360} height={360} style={{position: 'absolute', inset: 0}}><circle cx={130} cy={130} r={40} fill="#fff" /><line x1={130} y1={130} x2={130 + 30 * Math.sin(t * 6)} y2={130 - 30 * Math.cos(t * 6)} stroke={INK} strokeWidth={5} strokeLinecap="round" /><line x1={130} y1={130} x2={130 + 20 * Math.sin(t * 0.5)} y2={130 - 20 * Math.cos(t * 0.5)} stroke={INK} strokeWidth={7} strokeLinecap="round" /></svg>
            </Abs>
          )}
          {t > 55.1 && <Row y={1340}><Chip c={Q} dark={false} q={spring(t, 56.3)}><F n="pouce" size={44} />Client satisfait à 100 %</Chip></Row>}
          {t > 56.3 && <Abs x={0} y={1440} w={1080} style={{textAlign: 'center', opacity: pop(t, 56.5)}}><Hand size={30} color={DIM}>objectif cité par la vidéo d'origine</Hand></Abs>}
          {t > 59.4 && <Abs x={640} y={1200}><Hand size={38} style={{opacity: pop(t, 59.6)}}>des processus réglés comme une horloge</Hand></Abs>}
        </AbsoluteFill>
      )}
      {/* Sécurité : le bouclier qui renvoie les dangers */}
      {t > 60.9 && t < 75.4 && (
        <AbsoluteFill style={{opacity: win(t, 60.9, 75.4, 0.35)}}>
          <Title><span style={{color: S}}>Sécurité</span> : protéger les équipes</Title>
          <Photo src={PH('verites/groupe.jpg')} x={70} y={590} w={940} h={520} q={spring(t, 61.1)} border={S}>
            {t > 66.1 && <div style={{position: 'absolute', left: 24, bottom: 20, transform: `scale(${spring(t, 66.2)})`}}><Chip c={S} dark={false} size={30}><F n="coeur" size={40} />L'atout le plus précieux</Chip></div>}
          </Photo>
          <Abs x={70} y={1150} style={{transform: `scale(${spring(t, 69.4)})`}}><Iso n="45001" c={S} /></Abs>
          {t > 72.0 && (() => {
            const hz = ['danger', 'feu', 'eclair', 'collision'];
            return (
              <Abs x={420} y={1130} w={600} h={380}>
                <div style={{position: 'absolute', left: 30, top: 60, transform: `scale(${spring(t, 72.1)})`}}><F n="bouclier" size={230} /></div>
                {hz.map((h, k) => {
                  const at = 72.6 + k * 0.4;
                  if (t < at) return null;
                  const p = prog(t, at, at + 0.35, (x) => x);
                  const back = prog(t, at + 0.35, at + 0.9, easeOut);
                  const x = 600 - p * 340 + back * 400, y = 60 + k * 70 - back * (k % 2 ? -120 : 120);
                  return <div key={h} style={{position: 'absolute', left: x, top: y, transform: `rotate(${back * 300}deg)`, opacity: 1 - back}}><F n={h} size={80} /></div>;
                })}
              </Abs>
            )})()}
          {t > 73.8 && <Abs x={110} y={1330} style={{transform: `scale(${spring(t, 73.85)})`}}><Chip c={S} dark={false}>Objectif : risque zéro</Chip></Abs>}
        </AbsoluteFill>
      )}
      {/* Environnement : l'empreinte qui rétrécit */}
      {t > 75.2 && t < 88.0 && (() => {
        const shrink = prog(t, 85.2, 87.2, easeInOut);
        return (
          <AbsoluteFill style={{opacity: win(t, 75.2, 88.0, 0.35)}}>
            <Title><span style={{color: E}}>Environnement</span> : la responsabilité</Title>
            <Photo src={PH('smi/raffinerie.jpg')} x={70} y={590} w={500} h={760} q={spring(t, 75.4)} border={E} filter={`grayscale(${1 - shrink})`} />
            {/* fumées qui diminuent */}
            {Array.from({length: 10}, (_, k) => { const p = ((t * 0.3 + k * 0.1) % 1); return <div key={k} style={{position: 'absolute', left: 280 + Math.sin(k * 3 + t) * 60, top: 620 - p * 120, width: 70 + p * 60, height: 70 + p * 60, borderRadius: '50%', background: 'rgba(160,170,180,0.5)', filter: 'blur(8px)', opacity: (1 - p) * (1 - shrink)}} />; })}
            <Abs x={640} y={600} style={{transform: `scale(${spring(t, 82.3)})`}}><Iso n="14001" c={E} /></Abs>
            {t > 85.2 && (
              <Abs x={600} y={830} w={420} h={420} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{transform: `scale(${1.6 - shrink * 0.9}) rotate(-15deg)`}}><F n="pas" size={220} /></div>
              </Abs>
            )}
            {t > 85.2 && <Abs x={620} y={1270}><Chip c={E} q={spring(t, 85.3)} size={30}>Empreinte écologique ↓</Chip></Abs>}
            {t > 78.9 && t < 85.2 && <Abs x={640} y={900}><Hand size={40} style={{opacity: pop(t, 79.0)}}>vis-à-vis de la société</Hand></Abs>}
          </AbsoluteFill>
        );
      })()}
      {/* aimants qui se repoussent */}
      {t > 87.8 && (() => {
        const push = prog(t, 92.6, 93.6, easeOut);
        return (
          <AbsoluteFill style={{opacity: pop(t, 87.8)}}>
            <Title>Du mal à <span style={{color: S}}>cohabiter</span></Title>
            {[Q, S, E].map((c, k) => <Abs key={c} x={540 - 70 + (k - 1) * (170 + push * 150)} y={850 + (k === 1 ? -push * 60 : push * 40)} style={{transform: `rotate(${(k - 1) * push * 25}deg) scale(${spring(t, [87.8, 88.54, 89.54][k])})`}}><Letter l={'QSE'[k]} c={c} size={140} /></Abs>)}
            {push > 0 && [0, 1].map((k) => <Abs key={k} x={540 - 30 + (k ? 1 : -1) * (85 + push * 75)} y={880} style={{opacity: 1 - push}}><T size={60} color={GOLD}>⚡</T></Abs>)}
            {t > 90.7 && <Row y={1150}><Chip c={LIGHT} q={spring(t, 90.7)} size={30}>Trois domaines essentiels</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 2 : les silos ─────────── */
const P2: React.FC = () => {
  const t = useT();
  const o = win(t, 97.0, 149.0, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* silos + tir à la corde à trois */}
      {t < 108.7 && (() => {
        const tug = t > 106.4;
        const pull = tug ? Math.sin((t - 106.4) * 6) * 18 : 0;
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 108.3, 108.7)}}>
            <Title>Gérés <span style={{color: S}}>en silo</span></Title>
            {!tug && [Q, S, E].map((c, k) => (
              <Abs key={c} x={130 + k * 290} y={620} w={240} h={760} style={{transform: `translateY(${(1 - spring(t, 97.1 + k * 0.2)) * 900}px)`}}>
                <div style={{position: 'absolute', left: 0, top: 0, width: 240, height: 120, borderRadius: '120px 120px 0 0', background: c}} />
                <div style={{position: 'absolute', left: 0, top: 110, width: 240, height: 600, background: `repeating-linear-gradient(180deg, ${c} 0 60px, ${c}CC 60px 66px)`}} />
                <div style={{position: 'absolute', left: 20, top: 700, width: 200, height: 60, background: '#5B6A85'}} />
                <div style={{position: 'absolute', left: 0, top: 300, width: 240, textAlign: 'center'}}><T size={120} color="#fff">{'QSE'[k]}</T></div>
              </Abs>
            ))}
            {t > 102.9 && !tug && <Row y={1430}><Chip c={S} dark={false} q={spring(t, 103.0)} size={30}>Trois systèmes parallèles</Chip></Row>}
            {tug && (
              <AbsoluteFill style={{opacity: pop(t, 106.4)}}>
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                  {[[220, 1250], [860, 1250], [540, 700]].map(([x, y], k) => <line key={k} x1={540 + pull * (k - 1)} y1={1030} x2={x} y2={y} stroke="#C9A26B" strokeWidth={14} />)}
                </svg>
                <div style={{position: 'absolute', left: 510 + pull, top: 1000, width: 60, height: 60, borderRadius: 30, background: GOLD}} />
                {[[150, 1200, Q, 'Q'], [790, 1200, E, 'E'], [470, 600, S, 'S']].map(([x, y, c, l]) => <Abs key={l as string} x={x as number} y={y as number}><Letter l={l as string} c={c as string} size={140} /></Abs>)}
                <Row y={1440}><Chip c={S} dark={false} q={spring(t, 106.6)} size={30}>Ils se tirent dans les pattes</Chip></Row>
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* la citation : le piège classique */}
      {t > 108.5 && t < 125.0 && (
        <AbsoluteFill style={{opacity: win(t, 108.5, 125.0, 0.35)}}>
          <Abs x={90} y={500} w={900} h={420} style={{borderRadius: 30, background: PAPER, padding: '40px 50px', boxSizing: 'border-box', boxShadow: '0 30px 60px rgba(0,0,0,0.45)', transform: `rotate(-1deg) scale(${spring(t, 108.7)})`}}>
            <T size={120} color="#D9CBA8" style={{position: 'absolute', left: 24, top: 0}}>“</T>
            <Hand size={52} color={INK} style={{marginTop: 50}}>Difficile de satisfaire la clientèle et d'accroître les profits sans porter atteinte à l'environnement.</Hand>
          </Abs>
          {t > 112.1 && (
            <Abs x={90} y={960} w={900} h={460}>
              <Photo src={PH('smi/fumees.jpg')} x={0} y={0} w={440} h={330} q={spring(t, 114.6)} border={E} />
              {t > 112.1 && <div style={{position: 'absolute', left: 30, top: 350, transform: `scale(${spring(t, 112.2)})`}}><Chip c={GOLD} size={28}><F n="argent" size={40} />Plus de profit</Chip></div>}
              {t > 115.2 && <div style={{position: 'absolute', left: 140, top: 230, transform: `rotate(-6deg) scale(${spring(t, 115.2)})`}}><Chip c={E} size={26}>… mais polluant</Chip></div>}
              {t > 116.2 && (
                <Abs x={480} y={0} w={420} h={330} style={{borderRadius: 30, background: '#1B2740', border: `6px solid ${S}`, overflow: 'hidden', transform: `scale(${spring(t, 116.3)})`}}>
                  <div style={{position: 'absolute', left: 0, right: 0, top: 200, height: 40, background: 'repeating-linear-gradient(90deg, #5B6A85 0 30px, #3A4660 30px 60px)', backgroundPosition: `${-(t - 116.3) * (200 + (t - 116.3) * 400)}px 0`}} />
                  {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: ((t - 116.3) * (200 + (t - 116.3) * 300) + k * 140) % 460 - 40, top: 140}}><F n="colis" size={64} /></div>)}
                  <Abs x={20} y={20}><T size={30}>Cadence ⏩</T></Abs>
                  {t > 118.2 && <div style={{position: 'absolute', right: 16, top: 16, transform: `scale(${spring(t, 118.2)})`}}><F n="danger" size={80} /></div>}
                </Abs>
              )}
            </Abs>
          )}
          {t > 121.5 && <Row y={1440}><Chip c={S} dark={false} q={spring(t, 121.6)} size={30}>Des compromis… souvent mauvais</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* conséquences : doublons, audits qui se chevauchent, objectifs en tous sens */}
      {t > 124.8 && t < 133.4 && (
        <AbsoluteFill style={{opacity: win(t, 124.8, 133.4, 0.35)}}>
          <Title>Les <span style={{color: S}}>conséquences</span></Title>
          {/* photocopieuse */}
          <Abs x={70} y={590} w={440} h={420} style={{opacity: pop(t, 128.0)}}>
            <div style={{position: 'absolute', left: 40, top: 120, width: 360, height: 200, borderRadius: 20, background: '#D6DEEC'}} />
            <div style={{position: 'absolute', left: 60, top: 100, width: 320, height: 30, borderRadius: 8, background: '#AEB9CC'}} />
            {Array.from({length: 6}, (_, k) => { const p = prog(t, 128.1 + k * 0.25, 128.6 + k * 0.25); return p > 0 && <div key={k} style={{position: 'absolute', left: 120 + p * 140 + k * 6, top: 200 + p * 120 + k * 12, width: 150, height: 190, borderRadius: 8, background: '#fff', border: '2px solid #C9D3E6', transform: `rotate(${p * 15 - k * 3}deg)`, padding: 12, boxSizing: 'border-box'}}><T size={18} color={INK}>PROCÉDURE</T><T size={14} color={S}>copie {k + 1}</T></div>; })}
            <Abs x={40} y={0}><Chip c={LIGHT} size={26}>Documents en double</Chip></Abs>
          </Abs>
          {/* agenda des audits */}
          <Abs x={560} y={590} w={450} h={420} style={{borderRadius: 22, background: '#F3F6FB', overflow: 'hidden', opacity: pop(t, 129.7)}}>
            <div style={{height: 54, background: '#DDE4F0', display: 'flex', alignItems: 'center', padding: '0 18px'}}><T size={26} color={INK}>Agenda · audits</T></div>
            {[['Audit Q', Q, 0], ['Audit S', S, 1], ['Audit E', E, 2]].map(([l, c, k]) => <div key={l as string} style={{position: 'absolute', left: 40 + (k as number) * 50, top: 90 + (k as number) * 70, width: 300, height: 130, borderRadius: 14, background: `${c}DD`, border: '3px solid #fff', padding: 12, boxSizing: 'border-box', transform: `scale(${spring(t, 129.8 + (k as number) * 0.25)})`}}><T size={30} color="#fff">{l}</T><T size={20} color="#fff">lun. 9 h – 12 h</T></div>)}
          </Abs>
          {/* objectifs en tous sens */}
          {t > 131.1 && <Abs x={540 - 160} y={1060} w={320} h={320} style={{opacity: pop(t, 131.1)}}>
            {Array.from({length: 8}, (_, k) => { const a = (k / 8) * Math.PI * 2 + Math.sin(t * 3 + k) * 0.3; const L = 140 * prog(t, 131.2 + k * 0.04, 131.7 + k * 0.04); return <svg key={k} width={320} height={320} style={{position: 'absolute', inset: 0}}><line x1={160} y1={160} x2={160 + Math.cos(a) * L} y2={160 + Math.sin(a) * L} stroke={[Q, S, E][k % 3]} strokeWidth={10} strokeLinecap="round" /><circle cx={160 + Math.cos(a) * L} cy={160 + Math.sin(a) * L} r={12} fill={[Q, S, E][k % 3]} /></svg>; })}
            <div style={{position: 'absolute', left: 120, top: 120}}><F n="cible" size={80} /></div>
          </Abs>}
          {t > 131.1 && <Row y={1420}><Chip c={LIGHT} q={spring(t, 131.2)} size={30}>Des objectifs dans tous les sens</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* face-à-face des responsables */}
      {t > 133.2 && (() => {
        const clash = t > 143.3;
        const sh = clash ? Math.sin(t * 50) * 4 : 0;
        return (
          <AbsoluteFill style={{opacity: pop(t, 133.2)}}>
            <Title>Imaginez la <span style={{color: S}}>scène</span></Title>
            <Img src={PH('causerie/animatrice-d.png')} style={{position: 'absolute', left: 40 + sh, top: 760, height: 520, transform: `scale(${spring(t, 134.4)})`, transformOrigin: '50% 100%'}} />
            <Img src={PH('causerie/manager-d.png')} style={{position: 'absolute', right: 30 - sh, top: 720, height: 560, transform: `scale(${spring(t, 138.7)}) scaleX(-1)`, transformOrigin: '50% 100%'}} />
            {t > 134.4 && <Abs x={60} y={1290}><Chip c={Q} dark={false} size={26}>Resp. qualité</Chip></Abs>}
            {t > 138.7 && <Abs x={650} y={1290}><Chip c={E} size={26}>Resp. environnement</Chip></Abs>}
            {t > 135.5 && t < 143.4 && <Abs x={70} y={570} w={420} style={{transform: `scale(${spring(t, 135.6)})`, transformOrigin: '20% 100%'}}><div style={{padding: '18px 22px', borderRadius: 30, background: '#fff'}}><Hand size={36} color={INK}>« Un matériau moins cher, pour les achats ! »</Hand></div></Abs>}
            {t > 140.2 && t < 143.4 && <Abs x={560} y={590} w={440} style={{transform: `scale(${spring(t, 140.3)})`, transformOrigin: '80% 100%'}}><div style={{padding: '18px 22px', borderRadius: 30, background: '#FFE3E1', border: `4px solid ${S}`}}><Hand size={36} color={INK}>🔔 « Désastre écologique ! »</Hand></div></Abs>}
            {clash && (
              <>
                <Abs x={440} y={800} style={{transform: `scale(${spring(t, 143.4)}) rotate(${Math.sin(t * 20) * 8}deg)`}}><F n="eclair" size={200} /></Abs>
                {t > 144.7 && <Abs x={130} y={590} w={360} h={170} style={{borderRadius: 20, background: 'rgba(255,255,255,0.08)', opacity: pop(t, 144.7)}}><T size={28} style={{position: 'absolute', left: 20, top: 14}}>Coûts</T><div style={{position: 'absolute', left: 120, bottom: 20, width: 200 * prog(t, 144.8, 145.8), height: 40, borderRadius: 10, background: S}} /><div style={{position: 'absolute', right: 20, top: 10}}><F n="hausse" size={60} /></div></Abs>}
                {t > 147.1 && <Abs x={620} y={580} style={{transform: `scale(${spring(t, 147.2)})`}}><div style={{transform: `rotate(${t * 400}deg)`}}><F n="boussole" size={160} /></div></Abs>}
                {t > 147.1 && <Abs x={560} y={760}><Chip c={S} dark={false} q={spring(t, 147.3)} size={26}>Stratégie perdue de vue</Chip></Abs>}
              </>
            )}
            {clash && t < 147.1 && <Row y={1400}><Chip c={S} dark={false} q={spring(t, 143.4)} size={30}>Tensions</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 3 : la solution ─────────── */
const P3: React.FC = () => {
  const t = useT();
  const o = win(t, 151.6, 200.0, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* fusion des trois cercles */}
      {t < 163.4 && (() => {
        const f = prog(t, 157.9, 160.0, easeInOut);
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 163.0, 163.4)}}>
            <Title>Le <span style={{color: E}}>système de management intégré</span></Title>
            {[Q, S, E].map((c, k) => {
              const a = (k / 3) * Math.PI * 2 - Math.PI / 2;
              const d = 190 * (1 - f) + 20;
              return <div key={c} style={{position: 'absolute', left: 540 + Math.cos(a) * d - 210, top: 1000 + Math.sin(a) * d - 210, width: 420, height: 420, borderRadius: 210, background: c, opacity: 0.55, mixBlendMode: 'screen', transform: `scale(${spring(t, 151.8 + k * 0.15)})`}} />;
            })}
            {f > 0.6 && <div style={{position: 'absolute', left: 540 - 230, top: 1000 - 230, width: 460, height: 460, borderRadius: 230, border: `10px solid ${GOLD}`, boxShadow: `0 0 60px ${GOLD}`, opacity: prog(f, 0.6, 1), display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={120} color="#fff">SMI</T></div>}
            {t > 155.7 && t < 157.9 && <Abs x={0} y={950} w={1080} style={{textAlign: 'center'}}><T size={120} color="#fff" style={{opacity: pop(t, 155.75)}}>SMI</T></Abs>}
            {t > 161.2 && <Row y={1300}><Chip c={GOLD} q={spring(t, 161.25)}><F n="boussole" size={44} />Un seul pilotage unifié</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* OU (boutons radio) contre ET (cases à cocher) */}
      {t > 163.2 && t < 185.7 && (() => {
        const et = t > 176.1;
        const items: [string, string][] = [['Qualité', Q], ['Sécurité', S], ['Environnement', E]];
        const selOu = t < 171.9 ? -1 : t < 173.5 ? 0 : t < 174.9 ? 1 : 2;
        const etAt = [178.0, 179.7, 180.98];
        return (
          <AbsoluteFill style={{opacity: win(t, 163.2, 185.7, 0.35)}}>
            <Title>Un <span style={{color: GOLD}}>changement de mentalité</span></Title>
            <Abs x={0} y={570} w={1080} style={{textAlign: 'center'}}>
              <div style={{display: 'inline-block', transform: `rotateY(${prog(t, 176.0, 176.6) * 360}deg)`}}><T size={190} color={et ? GOLD : S} style={{textShadow: `0 0 40px ${et ? GOLD : S}88`}}>{et ? 'ET' : 'OU'}</T></div>
            </Abs>
            <Abs x={170} y={820} w={740} h={520} style={{borderRadius: 30, background: PAPER, boxShadow: '0 30px 60px rgba(0,0,0,0.45)', padding: '30px 40px', boxSizing: 'border-box', opacity: pop(t, 166.3)}}>
              <T size={30} color="#7A869E">{et ? 'Cochez tout ce que vous voulez :' : 'Choisissez UNE priorité :'}</T>
              {items.map(([l, c], k) => {
                const on = et ? t > etAt[k] : selOu === k;
                return (
                  <div key={l} style={{display: 'flex', alignItems: 'center', gap: 26, marginTop: 34}}>
                    <div style={{width: 76, height: 76, borderRadius: et ? 14 : 38, border: `6px solid ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: on && et ? c : 'transparent'}}>
                      {!et && on && <div style={{width: 40, height: 40, borderRadius: 20, background: c, transform: `scale(${spring(t, [171.9, 173.5, 174.9][k])})`}} />}
                      {et && on && <Check p={prog(t, etAt[k], etAt[k] + 0.35)} size={56} color="#fff" />}
                    </div>
                    <T size={50} color={INK} style={{opacity: et || selOu === k || selOu === -1 ? 1 : 0.35}}>{l}</T>
                    {!et && selOu > k && <T size={30} color={S} style={{marginLeft: 'auto'}}>sacrifié</T>}
                  </div>
                );
              })}
            </Abs>
            {t > 169.2 && t < 176.1 && <Row y={1400}><Chip c={S} dark={false} q={spring(t, 169.3)} size={30}>Des choix et des sacrifices</Chip></Row>}
            {t > 182.1 && <Row y={1400}><Chip c={GOLD} q={spring(t, 182.2)} size={30}>Les facettes d'une même performance</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* empiler non, fusionner oui : le train d'engrenages */}
      {t > 185.5 && (() => {
        const stackOut = prog(t, 189.2, 189.9, easeIn);
        const drive = t > 194.4 ? (t - 194.4) * 60 : 0;
        return (
          <AbsoluteFill style={{opacity: pop(t, 185.5)}}>
            <Title>{t < 189.3 ? <>Pas juste <span style={{color: S}}>empiler</span>…</> : <>… une <span style={{color: GOLD}}>fusion intelligente</span></>}</Title>
            {stackOut < 1 && [Q, S, E].map((c, k) => <Abs key={c} x={340 + Math.sin(t * 3 + k) * 20 * (k + 1) * 0.5} y={1100 - k * 170 - stackOut * 300} w={400} h={160} style={{borderRadius: 16, background: c, transform: `rotate(${Math.sin(t * 2.5 + k) * 4 * (k + 1)}deg) scale(${spring(t, 186.5 + k * 0.3)})`, opacity: 1 - stackOut, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={60} color="#fff">Système {'QSE'[k]}</T></Abs>)}
            {t > 189.4 && (
              <AbsoluteFill style={{opacity: pop(t, 189.4)}}>
                <Abs x={140} y={640} w={800} h={700} style={{borderRadius: 40, border: `5px dashed ${GOLD}`, opacity: pop(t, 192.1)}} />
                {t > 192.1 && <Abs x={0} y={600} w={1080} style={{textAlign: 'center'}}><Chip c={GOLD} size={28}>Un seul cadre de pilotage</Chip></Abs>}
                <Abs x={170} y={760}><Gear size={300} c={Q} rot={drive}><T size={110} color="#fff">Q</T></Gear></Abs>
                <Abs x={340} y={1010}><Gear size={260} c={S} rot={-drive * (12 / 10) + 18} teeth={10}><T size={100} color="#fff">S</T></Gear></Abs>
                <Abs x={570} y={880}><Gear size={240} c={E} rot={drive * (12 / 9) + 8} teeth={9}><T size={90} color="#fff">E</T></Gear></Abs>
                {[[194.4, 'Qualité'], [195.4, '→ renforce la sécurité'], [197.7, '→ améliore l’environnement']].map(([at, l], k) => t > (at as number) && <Abs key={k} x={150} y={1340 + k * 60} style={{opacity: pop(t, at as number)}}><Hand size={40} color={[Q, S, E][k]}>{l}</Hand></Abs>)}
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 4 : les bénéfices ─────────── */
const P4: React.FC = () => {
  const t = useT();
  const o = win(t, 202.6, 247.0, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* 3 audits → 1, paperasse, coffre au trésor, radar */}
      {t < 229.8 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 229.4, 229.8)}}>
          {t < 218.0 && (
            <AbsoluteFill style={{opacity: 1 - prog(t, 217.6, 218.0)}}>
              <Title>Gain n°1 : les <span style={{color: GOLD}}>coûts</span></Title>
              {t > 204.2 && t < 211.3 && <Abs x={340} y={640} style={{transform: `scale(${spring(t, 204.3)})`}}><F n="batiment" size={400} /></Abs>}
              {t > 207.1 && t < 211.3 && <Row y={1100}><Chip c={GOLD} q={spring(t, 207.2)} size={30}>Ressenti à tous les étages</Chip></Row>}
              {t > 211.3 && (() => {
                const m = prog(t, 214.0, 214.9, easeInOut);
                return (
                  <AbsoluteFill style={{opacity: pop(t, 211.3)}}>
                    {[Q, S, E].map((c, k) => <Abs key={c} x={150 + k * 280 * (1 - m) + 280 * m} y={640} w={240} h={240} style={{borderRadius: 24, background: '#F3F6FB', overflow: 'hidden', transform: `rotate(${(k - 1) * 6 * (1 - m)}deg)`, opacity: k === 1 ? 1 : 1 - m * 0.9, zIndex: k === 1 ? 2 : 1}}><div style={{height: 60, background: m > 0.9 && k === 1 ? GOLD : c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={28} color="#fff">{m > 0.9 && k === 1 ? 'AUDIT QSE' : `AUDIT ${'QSE'[k]}`}</T></div><div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}><F n="clipboard" size={110} /></div></Abs>)}
                    {t > 213.8 && <Abs x={0} y={920} w={1080} style={{textAlign: 'center'}}><T size={64} style={{opacity: pop(t, 213.9)}}>{m > 0.9 ? <>1 seul audit <span style={{color: DIM, fontSize: 40}}>au lieu de 3</span></> : '3 audits…'}</T></Abs>}
                    {t > 215.4 && <Abs x={130} y={1060} style={{transform: `scale(${spring(t, 215.5)})`}}><Chip c={LIGHT} size={30}><F n="tableau" size={40} />1 seule revue de direction</Chip></Abs>}
                    {t > 216.8 && (
                      <Abs x={680} y={1060} w={280} h={300}>
                        {Array.from({length: 10}, (_, k) => <div key={k} style={{position: 'absolute', left: 30, bottom: k * 18 * (1 - prog(t, 217.0, 217.6)), width: 220, height: 16, borderRadius: 4, background: '#fff', border: '2px solid #C9D3E6', opacity: k < 3 ? 1 : 1 - prog(t, 217.0, 217.6)}} />)}
                        <Abs x={0} y={-50}><T size={28}>Paperasse ↓</T></Abs>
                      </Abs>
                    )}
                  </AbsoluteFill>
                );
              })()}
            </AbsoluteFill>
          )}
          {t > 217.8 && (() => {
            const lid = prog(t, 218.9, 219.6, easeOut);
            const sweep = (t - 220.1) * 140;
            return (
              <AbsoluteFill style={{opacity: pop(t, 217.8)}}>
                <Title>Le vrai trésor : <span style={{color: GOLD}}>stratégique</span></Title>
                {t < 220.3 && (
                  <Abs x={340} y={760} w={400} h={300}>
                    <div style={{position: 'absolute', left: 0, top: 110, width: 400, height: 190, borderRadius: 16, background: '#8A5A2B', border: `8px solid ${GOLD}`}} />
                    <div style={{position: 'absolute', left: 0, top: 30, width: 400, height: 90, borderRadius: '50px 50px 10px 10px', background: '#A86C34', border: `8px solid ${GOLD}`, transformOrigin: '50% 100%', transform: `rotateX(${lid * 110}deg)`}} />
                    {lid > 0.3 && <div style={{position: 'absolute', left: 50, top: 60, width: 300, height: 80, borderRadius: '50%', background: `radial-gradient(${GOLD}, transparent 70%)`, opacity: lid}} />}
                  </Abs>
                )}
                {t > 220.1 && (
                  <Abs x={290} y={620} w={500} h={500} style={{borderRadius: 250, background: 'radial-gradient(circle, #10301F, #0A1A12)', border: `6px solid ${E}`, overflow: 'hidden', transform: `scale(${spring(t, 220.15)})`}}>
                    {[1, 2, 3].map((k) => <div key={k} style={{position: 'absolute', left: 250 - k * 80, top: 250 - k * 80, width: k * 160, height: k * 160, borderRadius: '50%', border: `2px solid ${E}55`}} />)}
                    <div style={{position: 'absolute', inset: 0, background: `conic-gradient(from ${sweep}deg, ${E}AA 0deg, transparent 60deg)`}} />
                    {[[120, 150, 223.9, 'Décisions cohérentes'], [330, 260, 224.8, 'Risques anticipés'], [170, 360, 226.4, 'Image de marque']].map(([x, y, at, l]) => t > (at as number) && <div key={l as string} style={{position: 'absolute', left: x as number, top: y as number, width: 24, height: 24, borderRadius: 12, background: GOLD, boxShadow: `0 0 20px ${GOLD}`, transform: `scale(${spring(t, at as number)})`}} />)}
                    <div style={{position: 'absolute', left: 0, right: 0, top: 220, textAlign: 'center'}}><T size={60}>360°</T></div>
                  </Abs>
                )}
                {[['Décisions plus cohérentes', 223.94, 'cible'], ['Risques mieux anticipés', 224.78, 'loupe'], ['Image de marque solide', 226.38, 'medaille']].map(([l, at, ic], k) => t > (at as number) && <Abs key={l as string} x={150} y={1170 + k * 100} style={{transform: `translateX(${(1 - pop(t, at as number)) * -300}px)`, opacity: pop(t, at as number)}}><Chip c={[E, Q, GOLD][k]} size={30}><F n={ic as string} size={40} />{l}</Chip></Abs>)}
              </AbsoluteFill>
            );
          })()}
        </AbsoluteFill>
      )}
      {/* l'immeuble en coupe et son ascenseur */}
      {t > 229.6 && (() => {
        const floors: [string, string, number, string, string][] = [['Organisation', 'Clarté · simplicité', 232.54, Q, 'engrenage'], ['Économique', 'Moins de coûts liés aux accidents et défauts', 235.7, S, 'argent'], ['Relationnel', 'Confiance : clients, partenaires, équipes', 240.3, E, 'poignee']];
        const cur = floors.filter((f) => t > f[2]).length;
        const fy = (k: number) => 1250 - k * 230;
        const ey = cur === 0 ? 1250 + 40 : fy(cur - 1) + 40;
        const prev = cur <= 1 ? 1290 : fy(cur - 2) + 40;
        const atT = cur === 0 ? 229.6 : floors[cur - 1][2];
        const y = prev + (ey - prev) * prog(t, atT, atT + 0.9, easeInOut);
        return (
          <AbsoluteFill style={{opacity: pop(t, 229.6)}}>
            <Title>{t < 245.2 ? <>Tout se <span style={{color: GOLD}}>tient</span></> : <>Un <span style={{color: GOLD}}>cercle vertueux</span></>}</Title>
            <Abs x={80} y={560} w={920} h={950} style={{borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '4px solid rgba(255,255,255,0.15)'}} />
            <Abs x={100} y={600} w={150} h={890} style={{background: '#1B2740', borderRadius: 10}} />
            <Abs x={110} y={y - 30} w={130} h={170} style={{borderRadius: 10, background: GOLD, boxShadow: `0 0 30px ${GOLD}88`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="equipe" size={90} /></Abs>
            {floors.map(([l, d, at, c, ic], k) => (
              <Abs key={l} x={280} y={fy(k)} w={690} h={200} style={{borderRadius: 18, background: t > at ? `${c}26` : 'rgba(255,255,255,0.04)', borderBottom: `8px solid ${t > at ? c : '#2A3550'}`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 24px', boxSizing: 'border-box'}}>
                <div style={{opacity: t > at ? 1 : 0.3}}><F n={ic} size={90} /></div>
                <div style={{opacity: pop(t, at + 0.6)}}><T size={44} color={c}>{l}</T><Hand size={32}>{d}</Hand></div>
              </Abs>
            ))}
            {t > 245.2 && <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><circle cx={540} cy={1000} r={480} fill="none" stroke={GOLD} strokeWidth={10} strokeDasharray="60 30" strokeDashoffset={-t * 200} opacity={pop(t, 245.3)} /></svg>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 5 : plateau de jeu des étapes ─────────── */
const STEPS: [string, string, number, string][] = [
  ['Volonté de la direction', 'causerie/manager.jpg', 252.9, '50% 15%'],
  ['État des lieux', 'verites/ecriture.jpg', 258.02, 'center'],
  ['Planification', 'verites/plans.jpg', 259.14, '60% 30%'],
  ['Formation', 'induction/briefing-atelier.jpg', 260.34, 'center'],
  ['Déploiement terrain', 'induction/technicien-hse.jpg', 262.18, '50% 35%'],
  ['Amélioration continue', '', 264.42, ''],
];
const P5: React.FC = () => {
  const t = useT();
  const o = win(t, 249.6, 269.9, 0.4);
  if (o <= 0) return null;
  const pos = (k: number) => ({x: 110 + (k % 2) * 450, y: 600 + Math.floor(k / 2) * 300});
  const order = [0, 1, 3, 2, 4, 5];
  const cell = (k: number) => pos(order[k]);
  const cur = STEPS.filter((st) => t > st[2]).length - 1;
  let px = cell(0).x, py = cell(0).y;
  if (cur >= 0) {
    const a = cell(Math.max(0, cur - 1)), b = cell(cur);
    const p = prog(t, STEPS[cur][2], STEPS[cur][2] + 0.5, easeInOut);
    px = a.x + (b.x - a.x) * p; py = a.y + (b.y - a.y) * p - Math.sin(p * Math.PI) * 80;
  }
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Title>Une <span style={{color: '#B48CFF'}}>méthode</span>, pas de la magie</Title>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={STEPS.map((_, k) => `${k ? 'L' : 'M'}${cell(k).x + 205} ${cell(k).y + 120}`).join(' ')} stroke="#B48CFF" strokeWidth={14} strokeDasharray="24 16" fill="none" opacity={0.6} />
        {t > 265.0 && <path d={`M${cell(5).x + 205} ${cell(5).y + 240} C${cell(5).x + 205} ${cell(5).y + 330} 60 ${cell(5).y + 330} 60 900 C60 640 100 620 ${cell(0).x} ${cell(0).y + 120}`} stroke={GOLD} strokeWidth={10} fill="none" strokeDasharray="20 14" strokeDashoffset={-t * 120} opacity={pop(t, 265.0)} />}
      </svg>
      {STEPS.map(([l, src, at, p2], k) => {
        const c = cell(k);
        const on = t > at;
        return (
          <Abs key={l} x={c.x} y={c.y} w={410} h={240} style={{borderRadius: 24, overflow: 'hidden', background: '#1B2740', border: `6px solid ${on ? (k === 0 ? GOLD : '#B48CFF') : '#2A3550'}`, transform: `scale(${on ? 1 + 0.06 * spring(t, at) - 0.06 : 0.92})`, opacity: t > 250.0 + k * 0.1 ? 1 : 0}}>
            {src ? <Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: p2, filter: on ? 'none' : 'grayscale(1) brightness(0.5)'}} /> : <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: on ? '#2B2347' : '#1B2740'}}><div style={{transform: `rotate(${on ? t * 90 : 0}deg)`}}><F n="repeter" size={130} /></div></div>}
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '10px 14px', background: 'rgba(14,23,38,0.85)', display: 'flex', alignItems: 'center', gap: 10}}><div style={{width: 40, height: 40, borderRadius: 20, background: on ? '#B48CFF' : '#2A3550', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><T size={24} color={INK}>{k + 1}</T></div><T size={28}>{l}</T></div>
          </Abs>
        );
      })}
      {cur >= 0 && <Abs x={px + 300} y={py - 40} style={{zIndex: 5}}><svg width={90} height={130} viewBox="0 0 90 130"><circle cx={45} cy={30} r={24} fill={GOLD} /><path d="M20 120 Q45 40 70 120 Z" fill={GOLD} /><ellipse cx={45} cy={122} rx={34} ry={8} fill="#C99A1F" /></svg></Abs>}
      {t > 255.1 && t < 258.0 && <Row y={1520}><Chip c={GOLD} q={spring(t, 255.2)} size={28}>Sans ça, rien n'est possible</Chip></Row>}
      {t > 268.3 && <Row y={1520}><Chip c="#B48CFF" q={spring(t, 268.35)} size={28}>Un vrai projet d'entreprise</Chip></Row>}
    </AbsoluteFill>
  );
};

/* ─────────── Conclusion : levier puis saut du OU au ET ─────────── */
const P6: React.FC = () => {
  const t = useT();
  if (t < 272.4) return null;
  const o = pop(t, 272.5, 0.5);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* contrainte → levier */}
      {t < 285.8 && (() => {
        const lift = prog(t, 279.0, 280.6, easeInOut);
        const ang = -14 + 28 * lift;
        const rad = (ang * Math.PI) / 180;
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 285.4, 285.8)}}>
            <Title>{t < 278.9 ? <>Plus une <span style={{color: S}}>contrainte</span>…</> : <>… un <span style={{color: GOLD}}>levier</span></>}</Title>
            {t < 279.0 && (
              <AbsoluteFill style={{opacity: 1 - prog(t, 278.7, 279.0)}}>
                <Abs x={340} y={640} style={{transform: `scale(${spring(t, 276.2)})`}}><F n="chaine-cassee" size={400} /></Abs>
                {t > 276.9 && <Abs x={260} y={1080} w={560} h={130} style={{borderRadius: 20, background: PAPER, display: 'flex', alignItems: 'center', gap: 20, padding: '0 26px', boxSizing: 'border-box', transform: `scale(${spring(t, 276.95)})`}}><div style={{width: 70, height: 70, borderRadius: 12, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Check p={prog(t, 277.3, 277.7)} size={56} color={INK} /></div><T size={44} color={INK} style={{textDecoration: t > 278.2 ? 'line-through' : 'none', textDecorationColor: S, textDecorationThickness: 6}}>Case à cocher</T></Abs>}
              </AbsoluteFill>
            )}
            {t > 278.9 && (
              <AbsoluteFill style={{opacity: pop(t, 278.9)}}>
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                  <polygon points="580,1300 520,1400 640,1400" fill="#C9D3E6" />
                  <line x1={580 - 380 * Math.cos(rad)} y1={1300 + 380 * Math.sin(rad) * -1} x2={580 + 330 * Math.cos(rad)} y2={1300 + 330 * Math.sin(rad)} stroke="#C9D3E6" strokeWidth={20} strokeLinecap="round" />
                </svg>
                {/* plateau soulevé */}
                <Abs x={Math.max(20, 580 - 380 * Math.cos(rad) - 160)} y={1300 - 380 * Math.sin(rad) - 330} w={320} h={320} style={{display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', gap: 10}}>
                  {[['Performance', 281.8, E], ['Compétitivité', 283.06, Q], ['Différenciation', 284.06, GOLD]].map(([l, at, c]) => t > (at as number) && <div key={l as string} style={{padding: '12px 22px', borderRadius: 14, background: c as string, transform: `scale(${spring(t, at as number)})`}}><T size={34} color={INK}>{l}</T></div>)}
                </Abs>
                <Abs x={580 + 330 * Math.cos(rad) - 60} y={1300 + 330 * Math.sin(rad) - 130} style={{transform: `translateY(${-lift * 10}px)`}}><Letter l="ET" c={GOLD} size={120} /></Abs>
                {t > 279.0 && <Abs x={0} y={1440} w={1080} style={{textAlign: 'center'}}><Hand size={40} style={{opacity: pop(t, 280.5)}}>l'approche intégrée soulève tout</Hand></Abs>}
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* le grand saut du OU au ET */}
      {t > 285.6 && (() => {
        const jump = prog(t, 290.8, 292.2, easeInOut);
        const morph = prog(t, 293.6, 294.6, easeInOut);
        const jx = 230 + jump * 600, jy = 1050 - Math.sin(jump * Math.PI) * 330;
        return (
          <AbsoluteFill style={{opacity: pop(t, 285.6)}}>
            <Title>Prêts pour le <span style={{color: GOLD}}>grand saut</span> ?</Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <path d="M0 1150 L400 1150 L360 1600 L0 1600 Z" fill="#3A2733" />
              <path d="M680 1150 L1080 1150 L1080 1600 L720 1600 Z" fill="#3B4A2E" />
              {jump > 0 && jump < 1 && <path d={`M230 1050 Q530 ${720 - 50} ${230 + 600 * jump} ${jy}`} stroke={GOLD} strokeWidth={6} strokeDasharray="14 12" fill="none" />}
            </svg>
            <Abs x={90} y={1200}><T size={110} color={S} style={{opacity: 0.4 + 0.6 * (1 - morph)}}>OU</T></Abs>
            <Abs x={780} y={1200}><T size={110} color={GOLD} style={{textShadow: `0 0 ${30 * morph}px ${GOLD}`}}>ET</T></Abs>
            <Abs x={jx - 45} y={jy - 100}><svg width={90} height={130} viewBox="0 0 90 130"><circle cx={45} cy={30} r={24} fill={LIGHT} /><path d="M20 120 Q45 40 70 120 Z" fill={LIGHT} /></svg></Abs>
            {t > 286.0 && t < 288.5 && <Row y={620}><Chip c={LIGHT} q={spring(t, 286.1)} size={30}>Plus besoin de choisir</Chip></Row>}
            {t > 288.5 && <Row y={620}><Chip c={GOLD} q={spring(t, 288.55)} size={30}>Votre organisation est-elle prête ?</Chip></Row>}
            {t > 293.5 && <Abs x={0} y={760} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-flex', gap: 30, alignItems: 'center', transform: `scale(${spring(t, 293.6)})`}}><Letter l="Q" c={Q} size={110} /><T size={70} color={GOLD}>&</T><Letter l="S" c={S} size={110} /><T size={70} color={GOLD}>&</T><Letter l="E" c={E} size={110} /></div></Abs>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── En-tête ─────────── */
const Header: React.FC = () => {
  const t = useT();
  const p = PT.find((x) => t >= x.at + WIPE - 0.3 && t < x.end);
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 95, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {t > 2.5 && t < 36.0 && <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', opacity: pop(t, 2.5) * (1 - prog(t, 35.6, 36.0))}}><div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '8px 24px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${GOLD}`}}>{[Q, S, E].map((c, k) => <div key={c} style={{width: 18, height: 18, borderRadius: 9, background: c}} />)}<T size={34} style={{marginLeft: 6}}>QSE : une politique <span style={{color: GOLD}}>ou trois ?</span></T></div></div>}
      {p && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 236, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: pop(t, p.at + WIPE - 0.3) * (1 - prog(t, p.end - 0.3, p.end))}}>
          <div style={{display: 'flex', gap: 4}}>{[Q, S, E].map((c) => <div key={c} style={{width: 10, height: 44, borderRadius: 5, background: c}} />)}</div>
          <div style={{padding: '8px 22px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${p.c}`}}><T size={32}>{p.n < 6 ? `${p.n}. ` : ''}{p.l}</T></div>
        </div>
      )}
    </AbsoluteFill>
  );
};

const Bg: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{background: BG}}>
      {/* trois rubans Q, S, E qui ondulent en fond */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: 0.08}}>
        {[Q, S, E].map((c, k) => { let d = ''; for (let y = -40; y <= 1960; y += 40) d += `${y === -40 ? 'M' : 'L'}${540 + Math.sin(y / 260 + t * 0.4 + (k * 2 * Math.PI) / 3) * 420} ${y}`; return <path key={c} d={d} stroke={c} strokeWidth={60} fill="none" />; })}
      </svg>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.35))'}} />
    </AbsoluteFill>
  );
};

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2}, ...[0.2, 0.87, 1.52].map((at) => ({at, s: 'sfx/ding', v: 0.25})),
  {at: 5.6, s: 'sfx/thud', v: 0.3}, {at: 6.2, s: 'sfx/swish', v: 0.35}, {at: 7.2, s: 'validation', v: 0.32},
  {at: 11.6, s: 'sfx/whoosh', v: 0.3}, {at: 12.8, s: 'sfx/pop', v: 0.25}, {at: 14.5, s: 'sfx/rise', v: 0.28}, {at: 16.0, s: 'sfx/ding', v: 0.3},
  {at: 20.0, s: 'sfx/whoosh', v: 0.3}, {at: 22.5, s: 'page', v: 0.4}, {at: 25.5, s: 'sfx/pop', v: 0.25}, ...[26.3, 28.4, 29.6, 31.98].map((at) => ({at, s: 'sfx/pop', v: 0.3})), {at: 32.4, s: 'sfx/bell', v: 0.3}, {at: 34.75, s: 'validation', v: 0.3},
  ...PT.flatMap((p) => [{at: p.at, s: 'sfx/swish', v: 0.4}, {at: p.at + 0.05, s: 'soft-whoosh', v: 0.45, dur: 1.6}, {at: p.at + 1.0, s: 'bass-hit', v: 0.35}, {at: p.at + WIPE - 0.45, s: 'sfx/whoosh', v: 0.3}]),
  ...[40.9, 41.3, 41.7].map((at) => ({at, s: 'sfx/rise', v: 0.2})), ...[42.0, 42.4, 42.8].map((at) => ({at, s: 'sfx/thud', v: 0.4})), {at: 43.0, s: 'sfx/ding', v: 0.3},
  {at: 46.0, s: 'sfx/whoosh', v: 0.3}, {at: 52.5, s: 'tampon', v: 0.4}, {at: 56.3, s: 'sfx/pop', v: 0.3}, {at: 59.4, s: 'tick', v: 0.3}, ...Array.from({length: 6}, (_, k) => ({at: 59.6 + k * 0.25, s: 'tick', v: 0.22})),
  {at: 61.1, s: 'sfx/whoosh', v: 0.3}, {at: 66.2, s: 'sfx/pop', v: 0.3}, {at: 69.4, s: 'tampon', v: 0.4}, {at: 72.1, s: 'sfx/pop', v: 0.3}, ...[72.95, 73.35, 73.75, 74.15].map((at) => ({at, s: 'sfx/thud', v: 0.35})), {at: 73.85, s: 'validation', v: 0.3},
  {at: 75.4, s: 'sfx/whoosh', v: 0.3}, {at: 82.3, s: 'tampon', v: 0.4}, {at: 85.2, s: 'sfx/rise', v: 0.25}, {at: 87.2, s: 'sfx/ding', v: 0.3},
  ...[87.8, 88.54, 89.54].map((at) => ({at, s: 'sfx/pop', v: 0.3})), {at: 92.6, s: 'deep-hit', v: 0.35}, {at: 92.65, s: 'sfx/swish', v: 0.3},
  ...[97.1, 97.3, 97.5].map((at) => ({at, s: 'sfx/thud', v: 0.35})), {at: 103.0, s: 'sfx/pop', v: 0.25}, {at: 106.4, s: 'tension', v: 0.2, dur: 2}, ...Array.from({length: 4}, (_, k) => ({at: 106.6 + k * 0.5, s: 'sfx/swish', v: 0.2})),
  {at: 108.7, s: 'page', v: 0.45}, {at: 112.2, s: 'sfx/pop', v: 0.3}, {at: 114.6, s: 'sfx/whoosh', v: 0.25}, {at: 115.2, s: 'sfx/thud', v: 0.3}, {at: 116.3, s: 'sfx/rise', v: 0.25}, {at: 118.2, s: 'alarme', v: 0.15, dur: 1}, {at: 121.6, s: 'sfx/thud', v: 0.3},
  ...Array.from({length: 6}, (_, k) => ({at: 128.1 + k * 0.25, s: 'page', v: 0.25})), ...[129.8, 130.05, 130.3].map((at) => ({at, s: 'notification', v: 0.28})), {at: 131.2, s: 'sfx/swish', v: 0.3},
  {at: 133.4, s: 'sfx/whoosh', v: 0.3}, {at: 134.4, s: 'sfx/pop', v: 0.3}, {at: 135.6, s: 'sfx/pop', v: 0.25}, {at: 138.7, s: 'sfx/pop', v: 0.3}, {at: 140.3, s: 'alarme', v: 0.2, dur: 1.2},
  {at: 143.4, s: 'deep-hit', v: 0.45}, {at: 144.8, s: 'sfx/rise', v: 0.25}, {at: 147.2, s: 'sfx/swish', v: 0.3},
  ...[151.8, 151.95, 152.1].map((at) => ({at, s: 'sfx/pop', v: 0.3})), {at: 155.75, s: 'bass-hit', v: 0.35}, {at: 157.9, s: 'sfx/rise', v: 0.3}, {at: 160.0, s: 'validation', v: 0.35}, {at: 161.25, s: 'sfx/ding', v: 0.28},
  {at: 166.3, s: 'page', v: 0.4}, ...[171.9, 173.5, 174.9].map((at) => ({at, s: 'sfx/click', v: 0.5})), {at: 169.3, s: 'sfx/thud', v: 0.25}, {at: 176.0, s: 'sfx/swish', v: 0.4}, {at: 176.6, s: 'bass-hit', v: 0.4}, ...[178.0, 179.7, 180.98].map((at) => ({at, s: 'sfx/ding', v: 0.32})), {at: 182.2, s: 'sfx/pop', v: 0.28},
  ...[186.5, 186.8, 187.1].map((at) => ({at, s: 'sfx/thud', v: 0.3})), {at: 189.2, s: 'sfx/swish', v: 0.35}, {at: 189.5, s: 'sfx/rise', v: 0.25}, {at: 192.1, s: 'sfx/pop', v: 0.25}, ...[194.4, 195.4, 197.7].map((at) => ({at, s: 'sfx/click', v: 0.35})),
  {at: 204.3, s: 'sfx/pop', v: 0.3}, {at: 207.2, s: 'sfx/ding', v: 0.25}, {at: 211.3, s: 'sfx/whoosh', v: 0.3}, {at: 214.0, s: 'sfx/swish', v: 0.35}, {at: 214.9, s: 'tampon', v: 0.4}, {at: 215.5, s: 'sfx/pop', v: 0.28}, {at: 217.0, s: 'page', v: 0.35},
  {at: 217.9, s: 'sfx/whoosh', v: 0.3}, {at: 218.9, s: 'sfx/rise', v: 0.3}, {at: 219.6, s: 'sfx/bell', v: 0.35}, {at: 220.15, s: 'sfx/whoosh', v: 0.3}, ...[223.94, 224.78, 226.38].map((at) => ({at, s: 'notification', v: 0.25})),
  {at: 229.7, s: 'sfx/whoosh', v: 0.3}, ...[232.54, 235.7, 240.3].map((at) => ({at, s: 'sfx/rise', v: 0.2})), ...[233.44, 236.6, 241.2].map((at) => ({at, s: 'sfx/ding', v: 0.35})), {at: 245.3, s: 'validation', v: 0.32},
  {at: 250.0, s: 'sfx/whoosh', v: 0.3}, ...STEPS.flatMap((st) => [{at: st[2], s: 'sfx/swish', v: 0.25}, {at: st[2] + 0.5, s: 'sfx/thud', v: 0.35}]), {at: 265.0, s: 'sfx/rise', v: 0.25}, {at: 268.35, s: 'validation', v: 0.3},
  {at: 272.6, s: 'sfx/whoosh', v: 0.3}, {at: 276.2, s: 'deep-hit', v: 0.35}, {at: 276.95, s: 'sfx/pop', v: 0.28}, {at: 277.3, s: 'sfx/click', v: 0.35}, {at: 278.2, s: 'stylo', v: 0.35},
  {at: 279.0, s: 'sfx/rise', v: 0.3}, {at: 280.6, s: 'bass-hit', v: 0.4}, ...[281.8, 283.06, 284.06].map((at) => ({at, s: 'sfx/pop', v: 0.3})),
  {at: 285.7, s: 'sfx/whoosh', v: 0.3}, {at: 288.55, s: 'sfx/pop', v: 0.28}, {at: 290.8, s: 'sfx/swish', v: 0.4}, {at: 292.2, s: 'sfx/thud', v: 0.4}, {at: 292.3, s: 'validation', v: 0.32}, {at: 293.6, s: 'sfx/bell', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Smi: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <Bg />
    <Gate from={0} to={36.3}><Intro /></Gate>
    <Gate from={38.3} to={94.6}><P1 /></Gate>
    <Gate from={96.9} to={149.2}><P2 /></Gate>
    <Gate from={151.5} to={200.2}><P3 /></Gate>
    <Gate from={202.5} to={247.2}><P4 /></Gate>
    <Gate from={249.5} to={270.1}><P5 /></Gate>
    <Gate from={272.4} to={OUTRO_AT}><P6 /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><BraidWipe p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.3} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-smi-qse-integre-origine.m4a')} trimAfter={s(297.4)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

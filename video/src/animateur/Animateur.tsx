import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {handFont, s, sansFont} from '../theme';
import {Abs, Bg, BLUE, Chip, DIM, easeIn, easeInOut, easeOut, GREEN, Hand, INK, lerp, LOGO, Mark, PAPER, PH, pop, prog, RED, Row, Sc, spring, T, Title, useT} from '../implIso/kit';
import {captions} from './captions';

/**
 * « Comment l'animateur HSE transforme la sécurité en réflexe » (1 min 10) — voix d'origine, sous-titres recalés mot à
 * mot, photos réelles, thème « papier quadrillé » de la série, finition « haut de gamme ».
 * Fil rouge inédit : un réseau de neurones — chaque action de l'animateur allume un neurone, jusqu'au réflexe complet
 * (en-tête + final). Transitions : onde de choc sonore (anneaux concentriques qui balaient l'écran).
 * Langage visuel premium : photos en profondeur 3D (inclinaison, parallaxe, balayage de lumière), typographie cinétique
 * lettre par lettre avec flou de mise au point, mot « RÉFLEXE » rempli d'une vraie photo, particules en suspension,
 * carrousel 3D, affiche de campagne qui se déroule, foule de bulles « compris », compte à rebours « AVANT », auditoire
 * endormi barré, projecteur qui capte l'attention, cases « comprise / appliquée ».
 */
const ORANGE = '#F28C1E';
const VIO = '#7B5CD6';
const TEAL = '#14A3A3';
const OUTRO_AT = 66.6;
export const ANIMATEUR_FRAMES = s(OUTRO_AT + 3.8);
type P = {n: number; l: string; sub: string; at: number; end: number; c: string};
const PT: P[] = [
  {n: 1, l: 'Aller vers les équipes', sub: 'Causeries, campagnes, bonnes pratiques', at: 11.0, end: 27.0, c: ORANGE},
  {n: 2, l: 'Avant, pendant, après', sub: 'Rappeler, exercer, partager', at: 27.0, end: 40.0, c: BLUE},
  {n: 3, l: 'Animer, pas réciter', sub: 'Capter, faire participer, vérifier', at: 40.0, end: 58.5, c: VIO},
];
const WIPE = 1.7;
/** Instants où un neurone s'allume (une action de l'animateur). */
const NEU = [12.6, 14.1, 15.8, 20.7, 22.7, 25.7, 29.2, 33.6, 35.4, 37.6, 46.9, 48.7, 50.3];

/* ─────────── Briques « haut de gamme » ─────────── */
/** Typographie cinétique : chaque lettre monte avec un flou de mise au point. */
const Kin: React.FC<{text: string; at: number; size: number; color?: string; stagger?: number; style?: React.CSSProperties}> = ({text, at, size, color = INK, stagger = 0.03, style}) => {
  const t = useT();
  return (
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, lineHeight: 1.05, letterSpacing: -1, ...style}}>
      {text.split('').map((ch, i) => {
        const p = prog(t, at + i * stagger, at + i * stagger + 0.45, easeOut);
        return <span key={i} style={{display: 'inline-block', whiteSpace: 'pre', opacity: p, transform: `translateY(${(1 - p) * size * 0.6}px) rotate(${(1 - p) * 8}deg)`, filter: `blur(${(1 - p) * 10}px)`}}>{ch}</span>;
      })}
    </div>
  );
};
/** Photo en profondeur : inclinaison 3D lente, zoom, balayage de lumière et vignette. */
const Deep: React.FC<{src: string; x: number; y: number; w: number; h: number; at: number; pos?: string; tilt?: number; children?: React.ReactNode}> = ({src, x, y, w, h, at, pos = 'center', tilt = 1, children}) => {
  const t = useT();
  const k = t - at;
  const inn = prog(t, at, at + 0.7, easeOut);
  const sweep = ((k * 0.45) % 1.6) - 0.3;
  return (
    <Abs x={x} y={y} w={w} h={h} style={{perspective: 2200, opacity: inn}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 30, overflow: 'hidden', border: '8px solid #fff', boxShadow: '0 40px 80px rgba(20,33,61,0.35)', transform: `rotateY(${Math.sin(k * 0.6) * 5 * tilt}deg) rotateX(${Math.cos(k * 0.5) * 3 * tilt}deg) scale(${0.92 + inn * 0.08})`}}>
        <Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${1.12 + k * 0.012}) translateX(${Math.sin(k * 0.4) * 14}px)`}} />
        <div style={{position: 'absolute', inset: 0, background: `linear-gradient(105deg, transparent ${sweep * 100 - 12}%, rgba(255,255,255,0.35) ${sweep * 100}%, transparent ${sweep * 100 + 12}%)`}} />
        <div style={{position: 'absolute', inset: 0, boxShadow: 'inset 0 0 120px rgba(20,33,61,0.35)'}} />
        {children}
      </div>
    </Abs>
  );
};
/** Particules lumineuses en suspension. */
const Dust: React.FC<{n?: number; c?: string}> = ({n = 26, c = '#F5B700'}) => {
  const t = useT();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: n}, (_, i) => {
        const x = random(`dx${i}`) * 1080 + Math.sin(t * 0.6 + i) * 30;
        const y = ((random(`dy${i}`) * 1920 - t * (20 + random(`ds${i}`) * 40)) % 1920 + 1920) % 1920;
        const r = 4 + random(`dr${i}`) * 8;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: r, height: r, borderRadius: r, background: c, opacity: 0.25 + 0.35 * Math.abs(Math.sin(t * 1.5 + i)), boxShadow: `0 0 ${r * 2}px ${c}`}} />;
      })}
    </AbsoluteFill>
  );
};
/** Mot rempli d'une photo réelle (texte-fenêtre). */
const PhotoWord: React.FC<{text: string; src: string; size: number; at: number; pos?: string}> = ({text, src, size, at, pos = 'center'}) => {
  const t = useT();
  const p = prog(t, at, at + 0.8, easeOut);
  return (
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, letterSpacing: -4, lineHeight: 1, backgroundImage: `url(${PH(src)})`, backgroundSize: 'cover', backgroundPosition: `${pos}`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextStroke: `4px ${INK}`, transform: `scale(${0.85 + p * 0.15})`, opacity: p, filter: `drop-shadow(0 20px 30px rgba(20,33,61,0.25))`}}>{text}</div>
  );
};

/* ─────────── Fil rouge : réseau de neurones ─────────── */
const NODES: [number, number][] = [[0.08, 0.5], [0.2, 0.2], [0.22, 0.78], [0.35, 0.45], [0.42, 0.12], [0.45, 0.85], [0.55, 0.38], [0.62, 0.7], [0.66, 0.15], [0.75, 0.5], [0.84, 0.22], [0.86, 0.8], [0.95, 0.48]];
const EDGES = [[0, 1], [0, 2], [1, 3], [2, 3], [1, 4], [2, 5], [3, 6], [4, 6], [5, 7], [6, 7], [4, 8], [6, 9], [7, 9], [8, 10], [9, 10], [9, 11], [10, 12], [11, 12], [3, 7], [8, 9]];
const Brain: React.FC<{w: number; h: number; lit: number; pulse?: boolean}> = ({w, h, lit, pulse = true}) => {
  const t = useT();
  const on = (i: number) => Math.max(0, Math.min(1, lit - i));
  const r = Math.max(4, w * 0.022);
  return (
    <svg width={w} height={h} style={{overflow: 'visible'}}>
      {EDGES.map(([a, b], k) => {
        const e = Math.min(on(a), on(b));
        return <line key={k} x1={NODES[a][0] * w} y1={NODES[a][1] * h} x2={NODES[b][0] * w} y2={NODES[b][1] * h} stroke={e > 0 ? ORANGE : '#C9CED8'} strokeWidth={Math.max(1.5, w * 0.006)} opacity={0.4 + e * 0.6} />;
      })}
      {EDGES.map(([a, b], k) => {
        const e = Math.min(on(a), on(b));
        if (e < 1 || !pulse) return null;
        const f = ((t * 0.9 + k * 0.17) % 1);
        return <circle key={`p${k}`} cx={lerp(NODES[a][0], NODES[b][0], f) * w} cy={lerp(NODES[a][1], NODES[b][1], f) * h} r={r * 0.45} fill="#fff" stroke={ORANGE} strokeWidth={1.5} />;
      })}
      {NODES.map(([x, y], i) => {
        const o = on(i);
        return <circle key={i} cx={x * w} cy={y * h} r={r * (0.8 + o * 0.4)} fill={o > 0 ? '#F5B700' : '#E3E6EC'} stroke={INK} strokeWidth={Math.max(1, w * 0.004)} style={{filter: o > 0.9 ? `drop-shadow(0 0 ${r}px #F5B700)` : 'none'}} />;
      })}
    </svg>
  );
};
const litAt = (t: number) => NEU.reduce((a, at) => a + prog(t, at, at + 0.4), 0);

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('causerie/orateur.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1000, objectFit: 'cover', objectPosition: '50% 25%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 34%, ${PAPER}DD 48%, ${PAPER} 54%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={50} y={880} w={980} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>DU MESSAGE AU RÉFLEXE</div>
        <T size={96} style={{marginTop: 18, textTransform: 'uppercase', letterSpacing: -3, whiteSpace: 'nowrap'}}>L’animateur <span style={{color: ORANGE}}>HSE</span></T>
        <T size={58} color={DIM} style={{textTransform: 'uppercase', letterSpacing: -1, whiteSpace: 'nowrap'}}>transforme la sécurité</T>
        <T size={130} style={{textTransform: 'uppercase', letterSpacing: -4, lineHeight: 1.05, marginTop: 6}}><span style={{background: '#F5B700', padding: '0 24px', borderRadius: 20}}>en réflexe</span></T>
      </Abs>
      <Abs x={190} y={1400}><Brain w={700} h={200} lit={13} pulse={false} /></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : onde de choc ─────────── */
const Shock: React.FC<{p: P}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const grow = prog(t, a, a + 0.6, easeIn);
  const shrink = prog(t, b - 0.5, b, easeIn);
  const R = 2300 * (grow - shrink * 0);
  const hole = 2300 * shrink;
  return (
    <AbsoluteFill style={{zIndex: 55, pointerEvents: 'none'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <defs><mask id={`m${p.n}`}><rect width={1080} height={1920} fill="#000" /><circle cx={540} cy={960} r={R} fill="#fff" /><circle cx={540} cy={960} r={hole} fill="#000" /></mask></defs>
        <rect width={1080} height={1920} fill={p.c} mask={`url(#m${p.n})`} />
        {[0, 1, 2, 3].map((k) => <circle key={k} cx={540} cy={960} r={Math.max(0, R - k * 140)} fill="none" stroke="#fff" strokeWidth={10 - k * 2} opacity={(1 - shrink) * (0.7 - k * 0.15)} />)}
        {[0, 1, 2].map((k) => <circle key={`h${k}`} cx={540} cy={960} r={hole + k * 120} fill="none" stroke={p.c} strokeWidth={14} opacity={shrink > 0 && shrink < 1 ? 0.6 - k * 0.2 : 0} />)}
      </svg>
      <Abs x={0} y={720} w={1080} style={{textAlign: 'center', opacity: prog(t, a + 0.4, a + 0.7) * (1 - prog(t, b - 0.55, b - 0.35))}}>
        <T size={40} color="#ffffffcc" style={{letterSpacing: 10}}>PARTIE {p.n}/3</T>
        <Kin text={p.l} at={a + 0.45} size={90} color="#fff" stagger={0.02} />
        <Hand size={54} color="#fff" style={{marginTop: 16, opacity: 0.9}}>{p.sub}</Hand>
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── En-tête ─────────── */
const Header: React.FC = () => {
  const t = useT();
  const p = PT.findIndex((x) => t >= x.at + WIPE - 0.3 && t < x.end);
  const intro = t > 2.6 && t < 10.7;
  const fin = t >= 58.5 && t < OUTRO_AT;
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 80, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {(intro || p >= 0 || fin) && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 210, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: intro ? pop(t, 2.6) * (1 - prog(t, 10.4, 10.7)) : p >= 0 ? pop(t, PT[p].at + WIPE - 0.3) * (1 - prog(t, PT[p].end - 0.3, PT[p].end)) : pop(t, 58.5)}}>
          <Brain w={130} h={44} lit={litAt(t)} pulse={false} />
          <div style={{padding: '6px 20px', borderRadius: 40, background: '#fff', border: `3px solid ${p >= 0 ? PT[p].c : INK}`}}><T size={30}>{p >= 0 ? `${PT[p].n}. ${PT[p].l}` : fin ? 'Le réflexe terrain' : 'L’animateur HSE'}</T></div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── INTRO ─────────── */
const Reflex: React.FC = () => {
  const t = useT();
  const pts: string[] = [];
  for (let i = 0; i <= 120; i++) {
    const x = i * 8.2;
    const ph = ((t * 1.3 - i * 0.012) % 1 + 1) % 1;
    const y = ph < 0.06 ? -Math.sin((ph / 0.06) * Math.PI) * 90 : ph < 0.1 ? Math.sin(((ph - 0.06) / 0.04) * Math.PI) * 40 : 0;
    pts.push(`${x},${120 + y}`);
  }
  return (
    <AbsoluteFill>
      <Dust />
      <Abs x={0} y={380} w={1080} style={{textAlign: 'center'}}><Kin text="Faire de la sécurité un" at={3.9} size={50} /></Abs>
      <Abs x={0} y={480} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoWord text="RÉFLEXE" src="induction/mine-equipe.jpg" size={230} at={5.2} pos="50% 35%" /></Abs>
      <svg width={1000} height={240} style={{position: 'absolute', left: 40, top: 760, opacity: pop(t, 5.6)}}><polyline points={pts.join(' ')} fill="none" stroke={ORANGE} strokeWidth={8} strokeLinejoin="round" style={{filter: `drop-shadow(0 0 8px ${ORANGE})`}} /></svg>
      <Abs x={0} y={1040} w={1080} style={{textAlign: 'center'}}><Kin text="quotidien" at={5.8} size={70} color={ORANGE} /></Abs>
      <Row y={1200} gap={10}>{Array.from({length: 12}, (_, i) => <div key={i} style={{opacity: t > 6.4 + i * 0.05 ? 1 : 0.2, transform: `scale(${t > 6.4 + i * 0.05 ? spring(t, 6.4 + i * 0.05) : 0.8})`}}><F n={i % 2 ? 'ouvrier' : 'salariee'} size={64} /></div>)}</Row>
    </AbsoluteFill>
  );
};
const NotJust: React.FC = () => {
  const t = useT();
  const cross = prog(t, 10.0, 10.5);
  return (
    <AbsoluteFill>
      <Abs x={0} y={520} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', position: 'relative'}}><Kin text="Transmettre" at={8.6} size={110} color={DIM} /><div style={{position: 'absolute', left: -20, right: -20, top: '52%', height: 16, background: RED, transform: `scaleX(${cross})`, transformOrigin: '0 50%', borderRadius: 8}} /></div>
        <T size={70} color={DIM} style={{marginTop: 10, opacity: pop(t, 9.3)}}>des consignes</T>
      </Abs>
      {Array.from({length: 6}, (_, i) => {
        const f = prog(t, 8.2 + i * 0.25, 9.6 + i * 0.25, easeIn);
        return <Abs key={i} x={120 + i * 150} y={lerp(900, 1500, f)} w={110} h={140} style={{background: '#fff', border: `3px solid ${DIM}`, borderRadius: 8, transform: `rotate(${(i - 2.5) * 12 + f * 40}deg)`, opacity: 1 - f * 0.8}}><div style={{margin: 12, height: 8, background: '#D5DBE6'}} /><div style={{margin: 12, height: 8, background: '#D5DBE6'}} /></Abs>;
      })}
      {t > 10.4 && <Abs x={0} y={880} w={1080} style={{textAlign: 'center'}}><Kin text="… ne suffit pas" at={10.4} size={64} color={RED} /></Abs>}
    </AbsoluteFill>
  );
};

/* ─────────── PARTIE 1 ─────────── */
const Causerie: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Dust c={ORANGE} n={14} />
      <Deep src="causerie/orateur.jpg" x={140} y={360} w={800} h={900} at={12.6} pos="50% 20%">
        {[0, 1, 2].map((k) => { const f = ((t - 12.6) * 0.8 + k / 3) % 1; return <div key={k} style={{position: 'absolute', left: 520 - f * 300, top: 260 - f * 300, width: f * 600, height: f * 600, borderRadius: '50%', border: `6px solid ${ORANGE}`, opacity: (1 - f) * 0.7}} />; })}
      </Deep>
      <Abs x={90} y={1290} style={{transform: `scale(${spring(t, 12.6)})`}}><Chip c={ORANGE} light size={36}>🤝 À la rencontre des équipes</Chip></Abs>
      {t > 14.0 && <Abs x={90} y={1400} style={{transform: `scale(${spring(t, 14.0)})`}}><Chip c={INK} light size={36}>💬 Causerie sécurité</Chip></Abs>}
    </AbsoluteFill>
  );
};
const Risks: React.FC = () => {
  const t = useT();
  const R = [{at: 16.6, ph: 'ident/electrique.jpg', l: 'Électrique'}, {at: 17.3, ph: 'incident/chute-echelle.jpg', l: 'Chute'}, {at: 18.0, ph: 'promo/hse-machine.jpg', l: 'Machines'}];
  return (
    <AbsoluteFill>
      <Abs x={0} y={340} w={1080} style={{textAlign: 'center'}}><Kin text="Sensibiliser aux risques" at={15.6} size={56} /></Abs>
      {R.map((r, i) => {
        const f = prog(t, r.at - 0.3, r.at + 0.4, easeInOut);
        return (
          <Abs key={i} x={60 + i * 330} y={520} w={300} h={760} style={{perspective: 1800}}>
            <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `rotateY(${(1 - f) * 180}deg) translateY(${Math.sin(t * 1.2 + i) * 10}px)`}}>
              <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: 26, overflow: 'hidden', border: '6px solid #fff', boxShadow: '0 30px 60px rgba(20,33,61,0.3)'}}>
                <Img src={PH(r.ph)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '60px 16px 18px', background: `linear-gradient(180deg, transparent, ${RED}EE)`, textAlign: 'center'}}><T size={36} color="#fff">{r.l}</T></div>
              </div>
              <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: 26, background: `repeating-linear-gradient(45deg, ${ORANGE} 0 30px, #F5B700 30px 60px)`}} />
            </div>
          </Abs>
        );
      })}
    </AbsoluteFill>
  );
};
const Campaign: React.FC = () => {
  const t = useT();
  const unroll = prog(t, 20.5, 21.6, easeOut);
  const crowd = t > 25.4;
  return (
    <AbsoluteFill>
      <Abs x={140} y={360} w={800} h={60} style={{borderRadius: 30, background: 'linear-gradient(180deg, #E9C892, #B98A4A)', boxShadow: '0 10px 20px rgba(0,0,0,0.25)', zIndex: 2}} />
      <Abs x={170} y={390} w={740} h={860 * unroll} style={{overflow: 'hidden', background: '#fff', borderRadius: '0 0 20px 20px', boxShadow: '0 30px 60px rgba(20,33,61,0.25)'}}>
        <div style={{height: 860, padding: '50px 40px', boxSizing: 'border-box', background: `linear-gradient(180deg, ${ORANGE}22, #fff 40%)`}}>
          <T size={30} color={ORANGE} style={{letterSpacing: 6}}>CAMPAGNE DE PRÉVENTION</T>
          <T size={70} style={{marginTop: 14}}>Les bonnes pratiques</T>
          <div style={{display: 'flex', justifyContent: 'space-around', marginTop: 40}}>{['casque', 'gants', 'lunettes', 'chaussure'].map((ic, i) => <div key={ic} style={{transform: `scale(${spring(t, 22.6 + i * 0.2)})`}}><F n={ic} size={120} /></div>)}</div>
          <div style={{marginTop: 40, display: 'flex', flexDirection: 'column', gap: 16}}>{['Je porte mes EPI', 'Je signale', 'Je respecte le balisage'].map((l, i) => <div key={l} style={{opacity: pop(t, 23.2 + i * 0.3), fontFamily: handFont, fontSize: 44, color: INK}}>✓ {l}</div>)}</div>
        </div>
      </Abs>
      {crowd && Array.from({length: 7}, (_, i) => <Abs key={i} x={60 + (i % 4) * 250} y={1290 + Math.floor(i / 4) * 80} style={{transform: `scale(${spring(t, 25.5 + i * 0.07)})`}}><div style={{background: GREEN, borderRadius: 24, padding: '10px 18px', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>✓ compris</div></Abs>)}
    </AbsoluteFill>
  );
};

/* ─────────── PARTIE 2 ─────────── */
const Before: React.FC = () => {
  const t = useT();
  const n = 3 - Math.min(3, Math.floor(prog(t, 27.4, 28.6, (x) => x) * 3));
  return (
    <AbsoluteFill>
      <Deep src="induction/briefing-atelier.jpg" x={60} y={360} w={960} h={600} at={27.4} pos="50% 50%" />
      <Abs x={380} y={900} w={320} h={320} style={{borderRadius: 160, background: '#fff', border: `12px solid ${BLUE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(20,33,61,0.25)', transform: `scale(${spring(t, 27.4)})`}}>
        {n > 0 ? <T size={160} color={BLUE}>{n}</T> : <T size={64} color={BLUE}>AVANT</T>}
      </Abs>
      <Row y={1270} gap={16}>
        {t > 29.6 && <div style={{transform: `scale(${spring(t, 29.6)})`}}><Chip c={RED} light size={36}>⚠ Les dangers</Chip></div>}
        {t > 30.6 && <div style={{transform: `scale(${spring(t, 30.6)})`}}><Chip c={GREEN} light size={36}>🛡 Les mesures</Chip></div>}
      </Row>
    </AbsoluteFill>
  );
};
const Carousel: React.FC = () => {
  const t = useT();
  const C = [{at: 33.6, l: 'Journées de sensibilisation', ph: 'promo/formation-incendie.jpg', c: ORANGE}, {at: 35.4, l: 'Exercices d’urgence', ph: 'confines/tripode-formation.jpg', c: RED}, {at: 37.6, l: 'Retours d’expérience', ph: 'promo/audit-reunion.jpg', c: TEAL}];
  const idx = C.filter((c) => t >= c.at - 0.4).length - 1;
  const rot = C.reduce((a, c, i) => (i === 0 ? a : a + prog(t, c.at - 0.6, c.at, easeInOut)), 0);
  const Rz = 420;
  return (
    <AbsoluteFill>
      <Abs x={0} y={340} w={1080} style={{textAlign: 'center'}}><Kin text="Il participe aussi…" at={32.5} size={56} /></Abs>
      <div style={{position: 'absolute', left: 540, top: 900, perspective: 2400}}>
        <div style={{transformStyle: 'preserve-3d', transform: `translateZ(${-Rz}px) rotateY(${-rot * 120}deg)`}}>
          {C.map((c, i) => (
            <div key={i} style={{position: 'absolute', left: -320, top: -400, width: 640, height: 760, transform: `rotateY(${i * 120}deg) translateZ(${Rz}px)`, borderRadius: 30, overflow: 'hidden', border: `8px solid ${c.c}`, boxShadow: '0 30px 60px rgba(20,33,61,0.3)', backfaceVisibility: 'hidden', opacity: i === Math.max(0, idx) ? 1 : 0.5}}>
              <Img src={PH(c.ph)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '80px 24px 24px', background: `linear-gradient(180deg, transparent, ${c.c}EE)`}}><T size={46} color="#fff">{c.l}</T></div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ─────────── PARTIE 3 ─────────── */
const Boring: React.FC = () => {
  const t = useT();
  const cross = prog(t, 44.0, 44.6);
  return (
    <AbsoluteFill>
      <Abs x={0} y={360} w={1080} style={{textAlign: 'center'}}><Kin text="Animer ≠ parler devant un groupe" at={41.6} size={50} stagger={0.02} /></Abs>
      <Abs x={140} y={520} w={800} h={760} style={{background: '#EEF0F4', borderRadius: 30, overflow: 'hidden', filter: `grayscale(${0.6 + cross * 0.4})`}}>
        <Abs x={330} y={60}><F n="intervenant" size={150} /></Abs>
        {Array.from({length: 8}, (_, i) => (
          <Abs key={i} x={60 + (i % 4) * 180} y={330 + Math.floor(i / 4) * 200}>
            <F n={i % 2 ? 'salarie' : 'salariee'} size={110} />
            <div style={{position: 'absolute', left: 80, top: -20 - ((t * 30 + i * 10) % 40), fontFamily: handFont, fontSize: 36, color: DIM, opacity: t > 42.6 ? 0.8 : 0}}>z z</div>
          </Abs>
        ))}
        <svg width={800} height={760} style={{position: 'absolute', inset: 0}}><line x1={40} y1={720} x2={40 + 720 * cross} y2={720 - 680 * cross} stroke={RED} strokeWidth={22} strokeLinecap="round" /></svg>
      </Abs>
    </AbsoluteFill>
  );
};
const ThreeVerbs: React.FC = () => {
  const t = useT();
  const spot = prog(t, 46.6, 47.4, easeOut);
  return (
    <AbsoluteFill>
      <Deep src="promo/participants.jpg" x={60} y={360} w={960} h={620} at={45.4} pos="50% 40%">
        <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 55% 45%, transparent ${spot * 30}%, rgba(20,33,61,${0.6 * (1 - prog(t, 48.4, 49.0))}) ${spot * 30 + 8}%)`}} />
      </Deep>
      {[{at: 46.9, l: 'Capter l’attention', ic: 'aimant', c: ORANGE}, {at: 48.7, l: 'Faire participer', ic: 'main-levee', c: BLUE}, {at: 50.3, l: 'Vérifier les comportements sûrs', ic: 'check', c: GREEN}].map((v, i) => (
        <Abs key={i} x={90} y={1020 + i * 150} w={900} h={130} style={{opacity: pop(t, v.at), transform: `translateX(${(1 - pop(t, v.at)) * -120}px)`, display: 'flex', alignItems: 'center', gap: 22, background: '#fff', borderRadius: 26, padding: '0 28px', boxSizing: 'border-box', borderLeft: `14px solid ${v.c}`, boxShadow: '0 14px 30px rgba(20,33,61,0.12)'}}>
          <F n={v.ic} size={80} /><T size={40}>{v.l}</T>
        </Abs>
      ))}
    </AbsoluteFill>
  );
};
const Useless: React.FC = () => {
  const t = useT();
  const ok = prog(t, 57.0, 57.6);
  return (
    <AbsoluteFill>
      <Abs x={190} y={380} w={700} h={860} style={{background: '#fff', borderRadius: 24, border: `5px solid ${INK}`, padding: 50, boxSizing: 'border-box', transform: `rotate(${-2 + ok * 2}deg)`, filter: `grayscale(${1 - ok})`, boxShadow: '0 30px 60px rgba(20,33,61,0.2)'}}>
        <T size={44}>CONSIGNES DE SÉCURITÉ</T>
        {[0, 1, 2, 3].map((k) => <div key={k} style={{marginTop: 30, height: 16, borderRadius: 8, background: '#D5DBE6', width: `${60 + (k % 3) * 14}%`}} />)}
        {[{at: 56.8, l: 'Comprises'}, {at: 57.5, l: 'Appliquées'}].map((c) => (
          <div key={c.l} style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 44}}>
            <div style={{width: 70, height: 70, borderRadius: 14, border: `6px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GREEN, fontSize: 56, fontWeight: 900}}>{t > c.at ? '✓' : ''}</div>
            <T size={44}>{c.l}</T>
          </div>
        ))}
      </Abs>
      {t < 56.6 && <Row y={1300}><Chip c={RED} light size={40} style={{opacity: pop(t, 55.0)}}>Sinon, elles ne servent à rien</Chip></Row>}
    </AbsoluteFill>
  );
};

/* ─────────── FINAL ─────────── */
const Final: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Dust n={40} />
      <Abs x={0} y={360} w={1080} style={{textAlign: 'center'}}><Kin text="Il donne vie à la prévention" at={59.2} size={58} stagger={0.02} /></Abs>
      <Abs x={90} y={500} w={900} h={360}><Brain w={900} h={360} lit={13} /></Abs>
      <Abs x={0} y={920} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoWord text="RÉFLEXE" src="causerie/orateur.jpg" size={230} at={64.3} pos="50% 20%" /></Abs>
      {t > 65.2 && <Row y={1210}><div style={{transform: `scale(${spring(t, 65.2)})`}}><Chip c={GREEN} light size={44}>… sur le terrain</Chip></div></Row>}
      {t > 62.0 && t < 64.3 && <Row y={1000}><Hand size={60} color={DIM} style={{opacity: pop(t, 62.0)}}>message → réflexe</Hand></Row>}
    </AbsoluteFill>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2}, {at: 3.9, s: 'sfx/rise', v: 0.25}, {at: 5.2, s: 'bass-hit', v: 0.45}, {at: 5.25, s: 'sfx/ding', v: 0.3}, ...rep(6.4, 12, 0.05, 'sfx/pop', 0.12),
  ...rep(8.2, 6, 0.25, 'page', 0.2), {at: 10.0, s: 'sfx/swish', v: 0.4}, {at: 10.4, s: 'deep-hit', v: 0.3},
  ...PT.flatMap((p) => [{at: p.at, s: 'bass-hit', v: 0.45}, {at: p.at + 0.02, s: 'soft-whoosh', v: 0.5, dur: 1.2}, {at: p.at + 0.45, s: 'sfx/rise', v: 0.25}, {at: p.at + WIPE - 0.5, s: 'sfx/whoosh', v: 0.4}]),
  ...NEU.map((at) => ({at, s: 'sfx/ding', v: 0.16})),
  {at: 12.6, s: 'soft-whoosh', v: 0.3, dur: 2}, {at: 14.0, s: 'sfx/pop', v: 0.25}, ...[16.3, 17.0, 17.7].map((at) => ({at, s: 'sfx/swish', v: 0.3})),
  {at: 20.5, s: 'page', v: 0.5}, ...rep(22.6, 4, 0.2, 'sfx/pop', 0.2), ...rep(23.2, 3, 0.3, 'stylo', 0.22), ...rep(25.5, 7, 0.07, 'sfx/pop', 0.18), {at: 25.9, s: 'validation', v: 0.3},
  ...[27.4, 27.8, 28.2].map((at) => ({at, s: 'tick', v: 0.4})), {at: 28.6, s: 'sfx/bell', v: 0.3}, {at: 29.6, s: 'sfx/pop', v: 0.25}, {at: 30.6, s: 'sfx/pop', v: 0.25},
  {at: 32.5, s: 'soft-whoosh', v: 0.3, dur: 1.2}, ...[35.0, 37.2].map((at) => ({at, s: 'sfx/whoosh', v: 0.35})), {at: 35.4, s: 'alarme', v: 0.1, dur: 0.8},
  {at: 42.6, s: 'tension', v: 0.12, dur: 1.4}, {at: 44.0, s: 'sfx/swish', v: 0.4},
  {at: 45.4, s: 'soft-whoosh', v: 0.3, dur: 1.2}, {at: 46.6, s: 'sfx/rise', v: 0.25}, ...[46.9, 48.7, 50.3].map((at) => ({at, s: 'sfx/pop', v: 0.28})), {at: 52.8, s: 'validation', v: 0.3},
  {at: 55.0, s: 'alarme', v: 0.08, dur: 0.5}, {at: 56.8, s: 'sfx/click', v: 0.4}, {at: 57.5, s: 'sfx/click', v: 0.4}, {at: 57.6, s: 'validation', v: 0.3},
  {at: 59.2, s: 'sfx/rise', v: 0.3}, ...rep(59.6, 13, 0.18, 'sfx/ding', 0.12), {at: 64.3, s: 'bass-hit', v: 0.5}, {at: 64.35, s: 'sfx/ding', v: 0.3}, {at: 65.2, s: 'validation', v: 0.4},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Animateur: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.0} to={11.1}>
      <Sc a={2.5} b={8.0}><Reflex /></Sc>
      <Sc a={7.9} b={11.1}><NotJust /></Sc>
    </Gate>
    <Gate from={12.4} to={27.1}>
      <Sc a={12.5} b={15.5}><Causerie /></Sc>
      <Sc a={15.4} b={19.8}><Risks /></Sc>
      <Sc a={19.7} b={27.0}><Campaign /></Sc>
    </Gate>
    <Gate from={28.4} to={40.1}>
      <Sc a={28.5} b={32.4}><Before /></Sc>
      <Sc a={32.3} b={40.0}><Carousel /></Sc>
    </Gate>
    <Gate from={41.4} to={58.6}>
      <Sc a={41.5} b={45.3}><Boring /></Sc>
      <Sc a={45.2} b={54.0}><ThreeVerbs /></Sc>
      <Sc a={53.9} b={58.6}><Useless /></Sc>
    </Gate>
    <Gate from={58.4} to={OUTRO_AT}><Sc a={58.5} b={OUTRO_AT}><Final /></Sc></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><Shock p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-animateur-hse-origine.m4a')} trimAfter={s(66.4)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

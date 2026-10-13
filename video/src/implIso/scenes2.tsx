import React from 'react';
import {AbsoluteFill} from 'remotion';
import {F} from '../iso/ui';
import {sansFont} from '../theme';
import {Abs, BLUE, Chip, DIM, easeIn, easeInOut, GREEN, Hand, INK, Mark, Photo, pop, prog, RED, Row, Sc, spring, T, Title, useT, YEL} from './kit';

/* ─────────── PARTIE 2 : la question fondamentale ─────────── */

/** Le stylo suspendu au-dessus d'une procédure vierge, qui s'arrête net. */
const Pen: React.FC = () => {
  const t = useT();
  const stop = t > 66.6;
  const hover = stop ? 0 : Math.sin(t * 9) * 10;
  return (
    <AbsoluteFill>
      <Title>Avant la moindre ligne de procédure…</Title>
      <Abs x={190} y={480} w={700} h={900} style={{background: '#fff', borderRadius: 16, boxShadow: '0 30px 60px rgba(20,33,61,0.2)', padding: 50, boxSizing: 'border-box'}}>
        <T size={34} color={DIM}>PROCÉDURE N° 001</T>
        {Array.from({length: 12}, (_, i) => <div key={i} style={{marginTop: 34, height: 3, background: '#E3E6EC'}} />)}
      </Abs>
      <Abs x={560} y={560 + hover} style={{transform: `rotate(${stop ? -28 : -38}deg)`, transformOrigin: '0 100%'}}>
        <div style={{width: 46, height: 420, borderRadius: 23, background: `linear-gradient(90deg, ${INK}, #3A4C78)`}} />
        <div style={{width: 0, height: 0, marginLeft: 3, borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderTop: `60px solid ${YEL}`}} />
      </Abs>
      {stop && <Abs x={330} y={820} style={{transform: `scale(${spring(t, 66.6)})`}}><Chip c={RED} light size={60}>✋ STOP</Chip></Abs>}
    </AbsoluteFill>
  );
};

/** La question capitale + la chaîne de dominos qu'elle fait tomber. */
const DOM = [
  {at: 72.6, l: 'Réponse honnête', c: YEL, ic: 'question'},
  {at: 73.9, l: 'Budget', c: BLUE, ic: 'argent'},
  {at: 74.6, l: 'Énergie', c: GREEN, ic: 'eclair'},
  {at: 76.9, l: 'Survie après l’audit', c: RED, ic: 'coeur'},
];
const Why: React.FC = () => {
  const t = useT();
  const q = spring(t, 68.7, 6, 12);
  return (
    <AbsoluteFill>
      <Abs x={340} y={300} style={{fontFamily: sansFont, fontWeight: 900, fontSize: 620, color: `${YEL}55`, lineHeight: 1, transform: `scale(${q})`}}>?</Abs>
      <Abs x={60} y={420} w={960} style={{textAlign: 'center', transform: `scale(${q})`}}>
        <T size={70}><Mark c={BLUE} p={prog(t, 69.3, 70.0)}>Pourquoi</Mark> voulez-vous cette <Mark c={BLUE} p={prog(t, 70.0, 70.8)}>certification</Mark> ?</T>
        {t > 69.3 && <Hand size={50} color={DIM} style={{marginTop: 14, opacity: pop(t, 69.3)}}>une seule question… capitale</Hand>}
      </Abs>
      <div style={{position: 'absolute', left: 60, right: 60, top: 1430, height: 10, borderRadius: 5, background: INK, opacity: pop(t, 71.2)}} />
      {DOM.map((d, i) => {
        const fall = prog(t, d.at - 0.25, d.at + 0.25, easeIn);
        const max = i === DOM.length - 1 ? 82 : 24;
        return (
          <Abs key={i} x={110 + i * 225} y={1010} w={150} h={420} style={{transformOrigin: '100% 100%', transform: `rotate(${fall * max}deg)`, opacity: pop(t, 71.2 + i * 0.12)}}>
            <div style={{width: '100%', height: '100%', borderRadius: 18, background: '#fff', border: `6px solid ${INK}`, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', padding: '20px 6px', boxShadow: `inset 0 -16px 0 ${d.c}`}}>
              <F n={d.ic} size={78} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 25, textAlign: 'center', color: INK, lineHeight: 1.1}}>{d.l}</div>
            </div>
          </Abs>
        );
      })}
    </AbsoluteFill>
  );
};

/** Marionnette : le « POURQUOI » tient les fils du « COMMENT ». */
const Puppet: React.FC = () => {
  const t = useT();
  const L = 'COMMENT'.split('');
  const why = prog(t, 83.6, 84.2);
  const cm = prog(t, 85.8, 86.3);
  return (
    <AbsoluteFill>
      <Title>Le pourquoi dicte le comment</Title>
      <Abs x={190} y={500} w={700} h={60} style={{borderRadius: 30, background: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${Math.sin(t * 2.4) * 6}deg)`, boxShadow: `0 16px 30px ${BLUE}55`}}><T size={50} color="#fff" style={{letterSpacing: 10, transform: `scale(${1 + why * 0.12})`}}>POURQUOI</T></Abs>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {L.map((_, i) => {
          const x = 180 + i * 120;
          const y = 1000 + Math.sin(t * 3 + i) * 50;
          return <line key={i} x1={x + Math.sin(t * 2.4) * (i - 3) * 6} y1={560} x2={x} y2={y - 60} stroke={INK} strokeWidth={3} opacity={0.6} />;
        })}
      </svg>
      {L.map((ch, i) => (
        <Abs key={i} x={130 + i * 120} y={940 + Math.sin(t * 3 + i) * 50} w={100} style={{textAlign: 'center', transform: `rotate(${Math.sin(t * 3 + i * 1.3) * 14}deg)`}}>
          <T size={130} color={cm > 0 ? GREEN : INK} style={{transform: `scale(${1 + cm * 0.08})`}}>{ch}</T>
        </Abs>
      ))}
    </AbsoluteFill>
  );
};

/** Chaque motivation a ses pièges : les mâchoires se referment une à une. */
const TRAP = [
  {l: 'Le client exige', ic: 'poignee'},
  {l: 'S’améliorer', ic: 'hausse'},
  {l: 'La concurrence', ic: 'trophee'},
  {l: 'C’est bien de l’avoir', ic: 'medaille'},
];
const Traps: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Title>Chaque motivation a ses <Mark c={RED} p={prog(t, 88.9, 89.6)}>pièges</Mark></Title>
      {TRAP.map((m, i) => {
        const at = 88.9 + i * 0.5;
        const snap = prog(t, at, at + 0.15, easeIn);
        const x = 60 + (i % 2) * 490, y = 480 + Math.floor(i / 2) * 520;
        return (
          <Abs key={i} x={x} y={y} w={470} h={480} style={{opacity: pop(t, 86.8 + i * 0.25), transform: `translateX(${t > at ? Math.sin((t - at) * 60) * 6 * (1 - prog(t, at, at + 0.5)) : 0}px)`}}>
            <div style={{position: 'absolute', left: 0, top: 0, width: 470, height: 260, borderRadius: 26, background: '#fff', boxShadow: '0 16px 30px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}>
              <F n={m.ic} size={100} /><T size={36}>{m.l}</T>
            </div>
            <svg width={470} height={200} style={{position: 'absolute', top: 270}}>
              <g transform="translate(235,100)">
                <g transform={`rotate(${-70 + snap * 70})`}><path d="M -150 0 L 150 0" stroke={INK} strokeWidth={10} /><path d="M -150 0 L -130 -30 L -110 0 L -90 -30 L -70 0 L -50 -30 L -30 0 L -10 -30 L 10 0 L 30 -30 L 50 0 L 70 -30 L 90 0 L 110 -30 L 130 0 L 150 -30" stroke={RED} strokeWidth={8} fill="none" /></g>
                <g transform={`scale(1,-1) rotate(${-70 + snap * 70})`}><path d="M -150 0 L 150 0" stroke={INK} strokeWidth={10} /><path d="M -150 0 L -130 -30 L -110 0 L -90 -30 L -70 0 L -50 -30 L -30 0 L -10 -30 L 10 0 L 30 -30 L 50 0 L 70 -30 L 90 0 L 110 -30 L 130 0 L 150 -30" stroke={RED} strokeWidth={8} fill="none" /></g>
                <circle r={16} fill={INK} />
              </g>
            </svg>
          </Abs>
        );
      })}
    </AbsoluteFill>
  );
};

/**
 * Panneau publicitaire à lamelles prismatiques (« trivision ») : chaque lamelle pivote d'un tiers de tour pour passer
 * de la motivation au danger, puis à la bonne stratégie.
 */
type Face = {kind: 'intro' | 'why' | 'danger' | 'strat'; text: string; row: number};
const FACES: Face[] = [
  {kind: 'intro', text: 'Les raisons qu’on entend sur le terrain', row: -1},
  {kind: 'why', text: 'Un gros client l’exige', row: 0},
  {kind: 'danger', text: 'Un système en carton : une façade pour passer l’audit', row: 0},
  {kind: 'strat', text: 'Retourner la situation : régler les problèmes internes', row: 0},
  {kind: 'why', text: '« On veut s’améliorer »', row: 1},
  {kind: 'danger', text: 'L’intention floue', row: 1},
  {kind: 'strat', text: 'Connecter la norme à des soucis très concrets', row: 1},
  {kind: 'why', text: 'Faire comme la concurrence ou «\u00a0c’est bien de l’avoir\u00a0»', row: 2},
  {kind: 'danger', text: 'Un projet sans âme, sans vision', row: 2},
  {kind: 'strat', text: 'Construire la vision avec la direction', row: 2},
];
const STEPS = [92.4, 98.6, 100.5, 106.0, 113.7, 116.0, 117.6, 122.3, 126.4, 129.2];
const KIND = {
  intro: {bg: INK, fg: '#fff', tag: 'LE TABLEAU', ic: 'tableau'},
  why: {bg: YEL, fg: INK, tag: 'POURQUOI ?', ic: 'question'},
  danger: {bg: RED, fg: '#fff', tag: 'DANGER', ic: 'danger'},
  strat: {bg: GREEN, fg: '#fff', tag: 'STRATÉGIE EXPERTE', ic: 'cible'},
};
const BW = 960, BH = 470, NS = 8, SW = BW / NS;
const FaceView: React.FC<{k: number; i: number}> = ({k, i}) => {
  const f = FACES[Math.max(0, Math.min(FACES.length - 1, k))];
  const K = KIND[f.kind];
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: K.bg, backfaceVisibility: 'hidden'}}>
      <div style={{position: 'absolute', left: -i * SW, top: 0, width: BW, height: BH, display: 'flex', alignItems: 'center', gap: 34, padding: '0 54px', boxSizing: 'border-box'}}>
        <div style={{flex: '0 0 auto'}}><F n={K.ic} size={150} /></div>
        <div>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 6, color: K.fg, opacity: 0.8}}>{K.tag}{f.row >= 0 ? ` · ${f.row + 1}/3` : ''}</div>
          <T size={56} color={K.fg} style={{marginTop: 10, maxWidth: 620}}>{f.text}</T>
        </div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 0, bottom: 0, width: 3, background: 'rgba(0,0,0,0.25)'}} />
    </div>
  );
};
const ROWPH = ['promo/audit-reunion.jpg', 'induction/technicien-hse.jpg', 'iso26/courbe-strategie.jpg'];
const Trivision: React.FC = () => {
  const t = useT();
  const cur = STEPS.filter((s) => t >= s).length - 1;
  const step0 = Math.max(0, cur);
  const f = FACES[step0];
  const row = Math.max(0, f.row);
  const phTime = f.row < 0 ? 98.6 : STEPS[1 + row * 3];
  const isDanger = f.kind === 'danger';
  const isStrat = f.kind === 'strat';
  const filter = isDanger ? (row === 1 ? 'blur(14px)' : row === 0 ? 'sepia(1) saturate(0.6) contrast(0.9)' : 'grayscale(1) brightness(0.8)') : 'none';
  return (
    <AbsoluteFill>
      <Title y={330} size={50}>Motivation → Danger → Stratégie</Title>
      <Abs x={60} y={430} w={BW} h={BH} style={{perspective: 2600, borderRadius: 24, boxShadow: '0 30px 60px rgba(20,33,61,0.3)', border: `10px solid ${INK}`, boxSizing: 'content-box', background: INK}}>
        {Array.from({length: NS}, (_, i) => {
          const ang = STEPS.reduce((acc, s, k) => (k === 0 ? acc : acc + prog(t, s + i * 0.05, s + 0.55 + i * 0.05, easeInOut)), 0);
          const base = Math.floor(ang + 1e-6);
          const z = SW * 0.2887;
          return (
            <div key={i} style={{position: 'absolute', left: i * SW, top: 0, width: SW, height: BH, transformStyle: 'preserve-3d', transform: `translateZ(${-z}px) rotateY(${-ang * 120}deg)`}}>
              {[0, 1, 2].map((j) => {
                const k = base + ((j - (base % 3) + 3) % 3);
                const kk = k > base + 1 ? k - 3 : k;
                return <div key={j} style={{position: 'absolute', inset: 0, transform: `rotateY(${j * 120}deg) translateZ(${z}px)`, backfaceVisibility: 'hidden'}}><FaceView k={kk} i={i} /></div>;
              })}
            </div>
          );
        })}
      </Abs>
      {t > 98.4 && (
        <Photo key={row} src={ROWPH[row]} x={110} y={1000} w={860} h={520} pos="50% 40%" filter={filter} q={pop(t, phTime - 0.2)}>
          {isDanger && row === 0 && <div style={{position: 'absolute', inset: 0, background: 'repeating-linear-gradient(90deg, #B08050AA 0 18px, #9A6A3AAA 18px 22px)'}}><div style={{position: 'absolute', left: 30, bottom: 30, transform: 'rotate(-6deg)'}}><Chip c={RED} light size={44}>FAÇADE EN CARTON</Chip></div></div>}
          {isDanger && row === 1 && <div style={{position: 'absolute', left: 30, bottom: 30}}><Chip c={RED} light size={44}>FLOU</Chip></div>}
          {isDanger && row === 2 && <div style={{position: 'absolute', left: 30, bottom: 30}}><Chip c={RED} light size={44}>SANS ÂME</Chip></div>}
          {isStrat && <div style={{position: 'absolute', right: 30, bottom: 30, transform: `scale(${spring(t, STEPS[cur])})`}}><Chip c={GREEN} light size={44}>✓ STRATÉGIE EXPERTE</Chip></div>}
        </Photo>
      )}
      {t > 92.6 && t < 98.4 && (
        <Row y={1100} gap={18}>
          {['Client', 'Amélioration', 'Concurrence', 'Image'].map((l, i) => <div key={l} style={{opacity: pop(t, 95.2 + i * 0.3)}}><Chip c="#fff" size={36} style={{border: `4px solid ${INK}`}}>{l}</Chip></div>)}
        </Row>
      )}
      {t > 92.6 && t < 98.4 && <Row y={1260}><Hand size={50} color={DIM} style={{opacity: pop(t, 97.5)}}>Le cas le plus fréquent… ↓</Hand></Row>}
    </AbsoluteFill>
  );
};

export const P2: React.FC = () => (
  <AbsoluteFill>
    <Sc a={64.9} b={68.7}><Pen /></Sc>
    <Sc a={68.6} b={79.7}><Why /></Sc>
    <Sc a={79.6} b={86.6}><Puppet /></Sc>
    <Sc a={86.5} b={92.4}><Traps /></Sc>
    <Sc a={92.3} b={134.1}><Trivision /></Sc>
  </AbsoluteFill>
);

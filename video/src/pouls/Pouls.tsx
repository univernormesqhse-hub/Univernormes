import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {Blinds, Board, Card, Center, Cite, Deep, Dust, Kin, Out, Pill, Stamp, Tile, Word} from '../durab/Durab';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {handFont, s, sansFont} from '../theme';
import {Abs, Bg, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, LOGO, PAPER, PH, pop, prog, RED, spring, T, useT} from '../implIso/kit';
import {captions} from './captions';

/**
 * « Prendre le pouls du terrain » (5 min 04) — capsule « hors normes » : voix d'origine, sous-titres recalés mot à mot,
 * photos réelles, thème « papier quadrillé ».
 * Fil rouge inédit : LE MONITEUR DU SITE. L'en-tête est un moniteur cardiaque sur papier millimétré rose : le tracé ECG
 * défile en continu pendant que, à droite, un marcheur parcourt le plan du site d'étape en étape — la marche du lundi
 * et le pouls ne font qu'un.
 * Transition inédite : LE BATTEMENT — un tracé ECG traverse l'écran, le pic déclenche un double battement « lub-dub »
 * (onde de choc + cœur), le titre de la section apparaît, puis la page se contracte comme une systole vers le cœur.
 * Reprend le meilleur de la série : cinétique, tuiles en bois, palettes d'affichage, store vénitien, photos en
 * profondeur 3D, écran partagé, tampons, citations, poussière — et ajoute : traces de pas, chrono, jeu des
 * différences, loupe à fort grossissement, météo des équipes, pont de confiance, temple à quatre piliers.
 */
const BLUE = '#1F6FD1';
const ORANGE = '#F07A12';
const TEAL = '#0F9D8F';
const VIO = '#6D4BD8';
const PULSE = '#E0314B';
const GRID = '#F6C9CF';
const GOLDC = '#E0A100';
const OUTRO_AT = 304.6;
export const POULS_FRAMES = s(OUTRO_AT + 3.8);
const SECT = [
  {at: 32.2, n: '1', title: 'Le rituel', s: '30 minutes de marche le lundi', c: BLUE},
  {at: 84.95, n: '2', title: 'Pas une inspection', s: 'contrôle ≠ connexion', c: RED},
  {at: 131.1, n: '3', title: 'Trois niveaux d’observation', s: 'ensemble · détails · personnes', c: TEAL},
  {at: 213.35, n: '4', title: 'Le pourquoi', s: 'l’impact sur la culture', c: ORANGE},
  {at: 256.85, n: '5', title: 'Les règles d’or', s: 'quatre piliers', c: VIO},
];
const STATIONS = ['briefing', 'rituel', 'posture', '3 niveaux', 'pourquoi', 'piliers'];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);

/* ─── Tracé ECG ─── */
const KP: [number, number][] = [[0, 0], [0.08, 0], [0.11, 0.1], [0.14, 0.12], [0.17, 0.1], [0.2, 0], [0.24, 0], [0.26, -0.14], [0.29, 1], [0.32, -0.32], [0.35, 0], [0.44, 0], [0.49, 0.2], [0.53, 0.26], [0.57, 0.2], [0.62, 0], [1, 0]];
const ecg = (u: number) => {
  const f = u - Math.floor(u);
  for (let i = 1; i < KP.length; i++) if (f <= KP[i][0]) return lerp(KP[i - 1][1], KP[i][1], (f - KP[i - 1][0]) / (KP[i][0] - KP[i - 1][0]));
  return 0;
};
/** Polyline ECG entre x0 et x1 ; phase(x) donne la position dans le battement. */
const ecgPath = (x0: number, x1: number, y0: number, amp: number, phase: (x: number) => number, step = 3) => {
  let d = '';
  for (let x = x0; x <= x1; x += step) d += `${x === x0 ? 'M' : 'L'}${x.toFixed(1)} ${(y0 - ecg(phase(x)) * amp).toFixed(1)} `;
  return d;
};
const Paper: React.FC<{w: number; h: number; cell?: number}> = ({w, h, cell = 12}) => (
  <svg width={w} height={h} style={{position: 'absolute', left: 0, top: 0}}>
    <rect width={w} height={h} fill="#FFF6F7" />
    {Array.from({length: Math.ceil(w / cell)}, (_, k) => <line key={`v${k}`} x1={k * cell} y1={0} x2={k * cell} y2={h} stroke={GRID} strokeWidth={k % 5 ? 0.8 : 1.8} />)}
    {Array.from({length: Math.ceil(h / cell)}, (_, k) => <line key={`h${k}`} x1={0} y1={k * cell} x2={w} y2={k * cell} stroke={GRID} strokeWidth={k % 5 ? 0.8 : 1.8} />)}
  </svg>
);
/** Cœur qui bat (forme SVG). */
const Heart: React.FC<{size: number; beat?: number; c?: string}> = ({size, beat = 0, c = PULSE}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{transform: `scale(${1 + beat * 0.18})`, filter: `drop-shadow(0 ${size * 0.06}px ${size * 0.1}px rgba(224,49,75,${0.25 + beat * 0.4}))`, overflow: 'visible'}}>
    <path d="M50 88 C 20 66, 4 48, 4 30 C 4 15, 16 5, 29 5 C 39 5, 46 11, 50 19 C 54 11, 61 5, 71 5 C 84 5, 96 15, 96 30 C 96 48, 80 66, 50 88 Z" fill={c} />
    <path d="M24 22 C 18 26, 16 32, 17 38" fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" opacity={0.6} />
  </svg>
);
/** Intensité d'un battement « lub-dub » périodique. */
const beatAt = (t: number, bps = 1.15) => {
  const f = (t * bps) % 1;
  return Math.max(0, 1 - Math.abs(f - 0.29) * 14) + 0.6 * Math.max(0, 1 - Math.abs(f - 0.5) * 14);
};
/** Traces de pas qui apparaissent le long d'une liste de points. */
const Steps: React.FC<{pts: [number, number][]; at: number; dur: number; c?: string; size?: number}> = ({pts, at, dur, c = INK, size = 26}) => {
  const t = useT();
  return (
    <>
      {pts.map(([x, y], i) => {
        const nx = pts[Math.min(i + 1, pts.length - 1)];
        const pv = pts[Math.max(i - 1, 0)];
        const ang = (Math.atan2(nx[1] - pv[1], nx[0] - pv[0]) * 180) / Math.PI + 90;
        const st = at + (i / pts.length) * dur;
        const side = i % 2 ? 1 : -1;
        return (
          <div key={i} style={{position: 'absolute', left: x - size / 2, top: y - size, transform: `rotate(${ang}deg) translateX(${side * size * 0.45}px)`, opacity: pop(t, st, 0.2) * (0.35 + 0.65 * Math.max(0, 1 - (t - st) * 0.12))}}>
            <svg width={size} height={size * 2} viewBox="0 0 26 52"><ellipse cx={13} cy={18} rx={9} ry={14} fill={c} /><ellipse cx={13} cy={43} rx={7} ry={7} fill={c} /></svg>
          </div>
        );
      })}
    </>
  );
};
const Cross: React.FC<{p: number; w?: number; rot?: number}> = ({p, w = 14, rot = -18}) => (
  <div style={{position: 'absolute', left: '-4%', right: '-4%', top: '50%', height: w, marginTop: -w / 2, background: RED, borderRadius: w, transform: `rotate(${rot}deg) scaleX(${p})`, transformOrigin: '0 50%', boxShadow: '0 4px 10px rgba(229,72,77,0.4)'}} />
);

/* ═════════════ Fil rouge : le moniteur du site ═════════════ */
const MAP: [number, number][] = [[18, 70], [62, 26], [110, 64], [152, 22], [200, 60], [240, 24]];
const Header: React.FC = () => {
  const t = useT();
  const si = sectIdx(t);
  const x = si + 1;
  const a = si >= 0 ? SECT[si].at : 0;
  const pos = si < 0 ? 0 : lerp(si, x, prog(t, a, a + 2.2, easeInOut));
  const seg = Math.min(4, Math.floor(pos));
  const fr = pos - seg;
  const wx = lerp(MAP[seg][0], MAP[seg + 1][0], fr);
  const wy = lerp(MAP[seg][1], MAP[seg + 1][1], fr);
  const sec = si >= 0 && t - a < 3.6;
  const bps = sec ? 2.1 : 1.15;
  const c = si < 0 ? PULSE : SECT[si].c;
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 56, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div>
      {t > 2.6 && t < OUTRO_AT && (
        <div style={{position: 'absolute', left: 36, right: 36, top: 182, height: 100, borderRadius: 20, background: '#fff', border: '6px solid #E9C7CC', boxShadow: '0 8px 20px rgba(20,33,61,0.1)', opacity: pop(t, 2.6), overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 0, top: 0, width: 640, height: 88, overflow: 'hidden'}}>
            <Paper w={640} h={88} />
            <svg width={640} height={88} style={{position: 'absolute', inset: 0}}>
              <path d={ecgPath(70, 628, 58, 40, (px) => (t - (628 - px) / 240) * bps)} fill="none" stroke={c} strokeWidth={3.5} strokeLinejoin="round" />
              <circle cx={628} cy={58 - ecg(t * bps) * 40} r={6} fill={c} />
            </svg>
            <div style={{position: 'absolute', left: 8, top: 14}}><Heart size={44} beat={beatAt(t, bps)} c={c} /></div>
            <div style={{position: 'absolute', left: 8, top: 62, fontFamily: sansFont, fontWeight: 900, fontSize: 13, color: c, letterSpacing: 1}}>POULS</div>
          </div>
          <div style={{position: 'absolute', left: 646, top: 0, width: 350, height: 88, background: '#F5F8FC'}}>
            <svg width={350} height={88} style={{position: 'absolute', left: 20, top: 0}}>
              <path d={'M' + MAP.map((p) => p.join(' ')).join(' L')} fill="none" stroke="#C9D2DF" strokeWidth={4} strokeDasharray="2 7" strokeLinecap="round" />
              {MAP.map((p, k) => <circle key={k} cx={p[0]} cy={p[1]} r={k <= x ? 8 : 6} fill={k <= x ? (k ? SECT[k - 1].c : INK) : '#fff'} stroke={k <= x ? '#fff' : '#C9D2DF'} strokeWidth={3} />)}
              <circle cx={wx} cy={wy} r={13} fill="none" stroke={c} strokeWidth={3} opacity={0.5 + 0.5 * Math.sin(t * 6)} />
            </svg>
            <div style={{position: 'absolute', left: 20 + wx - 16, top: wy - 40, transform: `translateY(${-Math.abs(Math.sin(t * 7)) * 3}px)`}}><F n="pas" size={32} /></div>
            <div style={{position: 'absolute', right: 10, bottom: 4, fontFamily: sansFont, fontWeight: 900, fontSize: 15, color: c, textAlign: 'right'}}>{STATIONS[Math.max(0, x)]}</div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/** Le battement : tracé, double pulsation, titre, puis systole. */
const Battement: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECT[i];
  const k = t - S0.at;
  if (k < 0 || k > 3.6) return null;
  const draw = prog(t, S0.at, S0.at + 0.75, easeInOut);
  const head = lerp(-20, 1100, draw);
  const lub = Math.max(0, 1 - Math.abs(k - 0.62) * 7);
  const dub = 0.7 * Math.max(0, 1 - Math.abs(k - 0.86) * 7);
  const thump = lub + dub;
  const sys = prog(t, S0.at + 3.0, S0.at + 3.55, easeIn);
  const rad = lerp(1500, 0, sys);
  const enter = prog(t, S0.at, S0.at + 0.3, easeOut);
  return (
    <AbsoluteFill style={{zIndex: 35, clipPath: `circle(${rad}px at 108px 232px)`, opacity: enter}}>
      <AbsoluteFill style={{background: '#FFF8F8', transform: `scale(${1 + thump * 0.025})`}}>
        <Paper w={1080} h={1920} cell={36} />
        {[0, 1].map((r) => {
          const rk = k - (r ? 0.86 : 0.62);
          if (rk < 0 || rk > 1.4) return null;
          return <div key={r} style={{position: 'absolute', left: 540 - rk * 700, top: 820 - rk * 700, width: rk * 1400, height: rk * 1400, borderRadius: '50%', border: `${lerp(30, 2, rk / 1.4)}px solid ${S0.c}`, opacity: 0.5 * (1 - rk / 1.4)}} />;
        })}
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <defs><clipPath id={`bt${i}`}><rect x={0} y={0} width={Math.max(0, head)} height={1920} /></clipPath></defs>
          <path d={ecgPath(0, 1080, 1180, 300, (px) => (px - 540) / 900 + 0.29, 4)} fill="none" stroke={S0.c} strokeWidth={12} strokeLinejoin="round" strokeLinecap="round" clipPath={`url(#bt${i})`} opacity={0.9} />
          {draw < 1 && <circle cx={head} cy={1180 - ecg((head - 540) / 900 + 0.29) * 300} r={20} fill={S0.c} />}
        </svg>
        <Abs x={0} y={600} w={1080} style={{display: 'flex', justifyContent: 'center', opacity: prog(t, S0.at + 0.55, S0.at + 0.7)}}><Heart size={300} beat={thump} c={S0.c} /></Abs>
        <Abs x={0} y={690} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 130, color: '#fff', opacity: prog(t, S0.at + 0.7, S0.at + 0.9)}}>{S0.n}</Abs>
        <Abs x={60} y={1290} w={960} style={{textAlign: 'center'}}><Kin text={S0.title} at={S0.at + 1.05} size={S0.title.length > 22 ? 70 : 92} color={INK} /></Abs>
        <Abs x={0} y={S0.title.length > 22 ? 1500 : 1430} w={1080} style={{textAlign: 'center'}}><Pill at={S0.at + 1.7} c={S0.c} size={36}>{S0.s}</Pill></Abs>
      </AbsoluteFill>
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
      <Img src={PH('zones/entrepot.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 900, objectFit: 'cover', objectPosition: '62% 40%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 34%, ${PAPER}DD 42%, ${PAPER} 47%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={50} y={760} w={980} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: PULSE, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>LE RITUEL DU LUNDI MATIN</div>
        <T size={104} style={{marginTop: 18, textTransform: 'uppercase', letterSpacing: -2, lineHeight: 1}}>Prendre le</T>
        <div style={{display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16}}>{'POULS'.split('').map((c, i) => <Tile key={i} ch={c} size={140} c={[PULSE, BLUE, TEAL, ORANGE, VIO][i]} />)}</div>
        <T size={84} style={{marginTop: 18, textTransform: 'uppercase', letterSpacing: -1}} color={PULSE}>du terrain</T>
      </Abs>
      <Abs x={90} y={1420} w={900} h={170} style={{borderRadius: 22, overflow: 'hidden', border: '6px solid #E9C7CC', background: '#fff'}}>
        <Paper w={900} h={170} cell={15} />
        <svg width={900} height={170} style={{position: 'absolute', inset: 0}}><path d={ecgPath(0, 900, 110, 80, (px) => px / 300 + 0.05)} fill="none" stroke={PULSE} strokeWidth={6} strokeLinejoin="round" /></svg>
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO ═════════════ */
const Terrain: React.FC = () => {
  const t = useT();
  const sweep = prog(t, 5.6, 6.3, easeIn);
  const focus = prog(t, 13.6, 15.4, easeInOut);
  const docs = [{l: 'rapports', ic: 'dossier', a: 3.5}, {l: 'chiffres', ic: 'graphique', a: 4.6}, {l: 'réunions', ic: 'calendrier', a: 5.1}];
  return (
    <Out end={17.6}>
      <Center y={320}><Kin text="Que se passe-t-il vraiment sur le terrain ?" at={2.8} size={58} /></Center>
      <Abs x={60} y={500} w={960} h={240}>
        {docs.map((d, k) => (
          <div key={k} style={{position: 'absolute', left: 30 + k * 310, top: 0, width: 280, height: 220, borderRadius: 24, background: '#fff', boxShadow: '0 16px 30px rgba(20,33,61,0.14)', textAlign: 'center', paddingTop: 20, boxSizing: 'border-box', transform: `scale(${Math.min(1, spring(t, d.a, 8, 13))}) translateY(${-sweep * 120}px) rotate(${sweep * (k - 1) * 14}deg)`, opacity: 1 - sweep * 0.75}}>
            <div style={{display: 'flex', justifyContent: 'center'}}><F n={d.ic} size={110} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: DIM, marginTop: 10}}>{d.l}</div>
            <div style={{position: 'absolute', left: 6, top: 6, fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: '#fff', background: DIM, borderRadius: 10, padding: '2px 10px', opacity: pop(t, 3.5)}}>au-delà</div>
          </div>
        ))}
      </Abs>
      <Center y={650}><div style={{opacity: pop(t, 6.6), transform: `scale(${Math.min(1, spring(t, 6.6, 7, 12))})`}}><Pill at={6.6} c={PULSE} size={44}>un rituel de leadership</Pill></div></Center>
      <Abs x={60} y={790} w={960} style={{display: 'flex', justifyContent: 'space-between'}}>
        <Card x={0} y={0} w={460} h={170} at={8.9} c={TEAL} style={{position: 'relative', textAlign: 'center'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: TEAL}}>simplicité</div><div style={{fontFamily: handFont, fontSize: 42, color: INK}}>déconcertante</div></Card>
        <Card x={0} y={0} w={460} h={170} at={10.8} c={PULSE} style={{position: 'relative', textAlign: 'center'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: PULSE}}>efficacité</div><div style={{fontFamily: handFont, fontSize: 42, color: INK}}>redoutable</div></Card>
      </Abs>
      {t > 12.4 && (
        <Deep src="promo/terrain-controle.jpg" x={110} y={1000} w={860} h={380} at={12.5} pos="50% 30%" filter={`blur(${(1 - focus) * 14}px) saturate(${0.4 + focus * 0.6})`}>
          <div style={{position: 'absolute', left: 20, bottom: 20, opacity: pop(t, 13.6)}}><Pill at={13.6} c={INK} size={28}>{focus < 0.5 ? 'perception floue' : 'perception nette'}</Pill></div>
        </Deep>
      )}
    </Out>
  );
};
const Signaux: React.FC = () => {
  const t = useT();
  const brk = prog(t, 20.4, 21.2, easeOut);
  const grow = prog(t, 25.7, 27.4, easeIn);
  const sig = [{l: 'signaux faibles', a: 22.3, c: BLUE}, {l: 'ambiance réelle', a: 23.6, c: TEAL}, {l: 'petites dérives', a: 24.7, c: ORANGE}];
  return (
    <Out end={32.2}>
      <Center y={320}><Kin text="Dépasser le cadre formel" at={19.2} size={62} /></Center>
      <Abs x={140} y={430} w={800} h={560}>
        {[0, 1, 2, 3].map((k) => {
          const sides = [{left: 0, top: 0, width: 800, height: 14}, {left: 786, top: 0, width: 14, height: 560}, {left: 0, top: 546, width: 800, height: 14}, {left: 0, top: 0, width: 14, height: 560}][k];
          const dx = [0, 1, 0, -1][k] * brk * 160;
          const dy = [-1, 0, 1, 0][k] * brk * 120;
          return <div key={k} style={{position: 'absolute', ...sides, background: INK, borderRadius: 7, opacity: (1 - brk * 0.85) * pop(t, 18.0), transform: `translate(${dx}px, ${dy}px) rotate(${brk * (k % 2 ? 8 : -6)}deg)`}} />;
        })}
        <div style={{position: 'absolute', left: 4, top: -50, fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: DIM, opacity: (1 - brk) * pop(t, 18.0)}}>le cadre formel</div>
        <div style={{position: 'absolute', left: 340, top: 190, opacity: pop(t, 21.5)}}><F n="yeux" size={130} /></div>
        {[0, 1, 2].map((r) => {
          const ph = ((t - 21.5) * 0.7 + r / 3) % 1;
          return t > 21.5 ? <div key={r} style={{position: 'absolute', left: 405 - ph * 380, top: 255 - ph * 380, width: ph * 760, height: ph * 760, borderRadius: '50%', border: `4px solid ${PULSE}`, opacity: 0.45 * (1 - ph)}} /> : null;
        })}
        {sig.map((g, k) => (
          <div key={k} style={{position: 'absolute', left: [20, 470, 60][k], top: [60, 120, 420][k], transform: `scale(${Math.max(0, Math.min(1, spring(t, g.a, 8, 13)))})`}}><Pill at={g.a} c={g.c} size={30}>{g.l}</Pill></div>
        ))}
        <div style={{position: 'absolute', left: 520, top: 380, width: lerp(40, 230, grow), height: lerp(40, 230, grow), borderRadius: '50%', background: `radial-gradient(circle at 35% 35%, #fff, ${lerp(0, 1, grow) > 0.5 ? RED : ORANGE})`, boxShadow: '0 16px 30px rgba(20,33,61,0.25)', opacity: pop(t, 24.7), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: lerp(10, 30, grow), color: '#fff', textAlign: 'center'}}>{grow > 0.5 ? 'gros problème' : ''}</div>
      </Abs>
      <Abs x={0} y={1060} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: DIM, opacity: pop(t, 25.0)}}>la petite dérive devient boule de neige…</Abs>
      <Stamp at={30.6} c={GREEN} text="très, très concret" x={270} y={1180} rot={-5} size={52} />
    </Out>
  );
};

/* ═════════════ SECTION 1 ═════════════ */
const Rituel: React.FC = () => {
  const t = useT();
  const spin = Math.max(0, t - 38.8) * 120;
  const cr1 = prog(t, 46.3, 46.8, easeOut);
  const cr2 = prog(t, 47.7, 48.3, easeOut);
  return (
    <Out end={49.4}>
      <Center y={320}><Kin text="Un rituel : simple et répété" at={35.8} size={60} color={BLUE} /></Center>
      <Abs x={140} y={430} w={520} h={520} style={{opacity: pop(t, 36.6)}}>
        <svg width={520} height={520} style={{position: 'absolute', inset: 0, transform: `rotate(${spin}deg)`}}>
          <circle cx={260} cy={260} r={200} fill="none" stroke={`${BLUE}33`} strokeWidth={34} />
          <path d="M260 60 A200 200 0 0 1 460 260" fill="none" stroke={BLUE} strokeWidth={34} strokeLinecap="round" />
          <path d="M260 460 A200 200 0 0 1 60 260" fill="none" stroke={BLUE} strokeWidth={34} strokeLinecap="round" />
          <path d="M440 230 L460 290 L490 236 Z" fill={BLUE} /><path d="M80 290 L60 230 L30 284 Z" fill={BLUE} />
        </svg>
        <div style={{position: 'absolute', left: 160, top: 160, width: 200, height: 200, borderRadius: 100, background: '#fff', boxShadow: '0 12px 30px rgba(20,33,61,0.18)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: BLUE}}>lundi</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: INK}}>×{Math.max(1, Math.min(52, Math.floor((t - 39.8) * 9) + 1))}</div>
        </div>
      </Abs>
      <Abs x={680} y={470} w={360} h={460} style={{textAlign: 'center'}}>
        <div style={{opacity: pop(t, 39.8)}}><Pill at={39.8} c={BLUE} size={30}>la répétition</Pill></div>
        <div style={{fontSize: 60, fontWeight: 900, color: DIM, opacity: pop(t, 40.6)}}>↓</div>
        <div style={{display: 'flex', justifyContent: 'center', opacity: pop(t, 40.9)}}>
          <div style={{transform: `rotate(${Math.max(0, t - 40.9) * 160}deg)`}}><F n="engrenage" size={130} /></div>
          <div style={{transform: `rotate(${-Math.max(0, t - 40.9) * 160 + 20}deg)`, marginLeft: -30, marginTop: 70}}><F n="engrenage" size={100} /></div>
        </div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK, opacity: pop(t, 41.2)}}>le vrai moteur</div>
      </Abs>
      <Abs x={60} y={1010} w={460} h={190} style={{borderRadius: 24, background: '#fff', boxShadow: '0 14px 30px rgba(20,33,61,0.14)', display: 'flex', alignItems: 'center', gap: 16, padding: 20, boxSizing: 'border-box', opacity: pop(t, 45.9)}}>
        <F n="equipe" size={100} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: DIM}}>réunions<br />compliquées</div><Cross p={cr1} />
      </Abs>
      <Abs x={560} y={1010} w={460} h={190} style={{borderRadius: 24, background: '#fff', boxShadow: '0 14px 30px rgba(20,33,61,0.14)', display: 'flex', alignItems: 'center', gap: 16, padding: 20, boxSizing: 'border-box', opacity: pop(t, 47.2)}}>
        <F n="ordinateur" size={100} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: DIM}}>logiciel de suivi<br />dernier cri</div><Cross p={cr2} />
      </Abs>
      <Abs x={0} y={1250} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: PULSE, opacity: pop(t, 44.3)}}>le grand secret ?</Abs>
    </Out>
  );
};
const Marche: React.FC = () => {
  const t = useT();
  const ring = prog(t, 49.9, 52.6, easeInOut);
  const swap = prog(t, 58.3, 58.9, easeInOut);
  const path: [number, number][] = Array.from({length: 18}, (_, k) => [80 + k * 52, 1130 - Math.sin(k * 0.55) * 50]);
  return (
    <Out end={62.8}>
      <Center y={320}><Kin text="Juste 30 petites minutes de marche" at={49.4} size={58} color={BLUE} /></Center>
      <Abs x={330} y={420} w={420} h={420} style={{opacity: pop(t, 49.6)}}>
        <svg width={420} height={420}>
          <circle cx={210} cy={220} r={170} fill="#fff" stroke="#DDE3EC" strokeWidth={26} />
          <circle cx={210} cy={220} r={170} fill="none" stroke={BLUE} strokeWidth={26} strokeDasharray={1068} strokeDashoffset={1068 * (1 - ring * 0.5)} transform="rotate(-90 210 220)" strokeLinecap="round" />
          {Array.from({length: 12}, (_, k) => <line key={k} x1={210 + Math.sin((k * Math.PI) / 6) * 130} y1={220 - Math.cos((k * Math.PI) / 6) * 130} x2={210 + Math.sin((k * Math.PI) / 6) * 145} y2={220 - Math.cos((k * Math.PI) / 6) * 145} stroke={INK} strokeWidth={k % 3 ? 3 : 6} />)}
          <line x1={210} y1={220} x2={210 + Math.sin(ring * Math.PI) * 110} y2={220 - Math.cos(ring * Math.PI) * 110} stroke={PULSE} strokeWidth={8} strokeLinecap="round" />
          <rect x={185} y={22} width={50} height={26} rx={6} fill={INK} />
        </svg>
        <div style={{position: 'absolute', left: 0, right: 0, top: 250, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: BLUE}}>{Math.round(ring * 30)} min</div>
      </Abs>
      <Cite y={860} at={50.0} text="30 minutes : durée citée par la vidéo d’origine" />
      <Abs x={0} y={0} w={1080} h={1920} style={{opacity: pop(t, 51.0)}}><Steps pts={path} at={51.0} dur={4.4} c={`${BLUE}AA`} size={30} /></Abs>
      <div style={{position: 'absolute', left: lerp(40, 920, prog(t, 51.0, 55.4)), top: 1000, transform: `translateY(${-Math.abs(Math.sin(t * 8)) * 10}px)`, opacity: pop(t, 51.0)}}><F n="ouvrier" size={110} /></div>
      <Abs x={0} y={1000} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: DIM, opacity: pop(t, 52.9) * (1 - prog(t, 55.0, 55.5))}}>ça paraît presque trop simple…</Abs>
      <Abs x={60} y={1200} w={960} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: lerp(60, 38, swap), color: lerp(0, 1, swap) > 0.5 ? '#B8C0CC' : INK, opacity: pop(t, 56.5)}}>la marche</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: DIM, opacity: pop(t, 58.3)}}>→</div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: lerp(38, 76, swap), color: PULSE, opacity: pop(t, 58.3)}}>la manière</div>
      </Abs>
      <Stamp at={60.6} c={PULSE} text="ça change tout" x={300} y={880} rot={-6} size={54} />
    </Out>
  );
};
const Lundi: React.FC = () => {
  const t = useT();
  const tog = prog(t, 74.4, 74.9, easeInOut);
  const zones: [number, number, string][] = [[90, 70, 'atelier'], [400, 60, 'stock'], [700, 90, 'quai'], [640, 300, 'bureaux'], [330, 320, 'maintenance'], [80, 300, 'parking']];
  const route: [number, number][] = [];
  zones.forEach(([x, y], k) => {
    const n = zones[(k + 1) % zones.length];
    for (let j = 0; j < 4; j++) route.push([lerp(x + 90, n[0] + 90, j / 4), lerp(y + 60, n[1] + 60, j / 4)]);
  });
  return (
    <Out end={84.95}>
      <Abs x={60} y={320} w={960} style={{display: 'flex', alignItems: 'center', gap: 30, justifyContent: 'center'}}>
        <div style={{opacity: pop(t, 64.8)}}><Board text="LUNDI" at={66.4} h={92} c={BLUE} /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, opacity: pop(t, 66.6)}}>matin</div>
      </Abs>
      {t < 79.0 && (
        <>
          <Blinds src="induction/briefing-atelier.jpg" x={70} y={460} w={940} h={420} at={67.3} pos="50% 45%">
            <div style={{position: 'absolute', left: 20, top: 20}}><Pill at={67.6} c={INK} size={28}>juste après le briefing</Pill></div>
            <div style={{position: 'absolute', right: 20, bottom: 20}}><Pill at={69.0} c={BLUE} size={28}>une image toute fraîche</Pill></div>
          </Blinds>
          <Abs x={70} y={920} w={940} h={300} style={{opacity: pop(t, 72.1)}}>
            <div style={{position: 'absolute', left: 0, top: 0, width: 450, height: 280, borderRadius: 24, overflow: 'hidden', border: `6px solid ${tog < 0.5 ? BLUE : '#DDE3EC'}`, background: '#fff'}}>
              <Img src={PH('causerie/manager.jpg')} style={{width: '100%', height: 200, objectFit: 'cover', objectPosition: '50% 20%', filter: `grayscale(${tog})`}} />
              <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: BLUE, marginTop: 14}}>seul · observation pure</div>
            </div>
            <div style={{position: 'absolute', right: 0, top: 0, width: 450, height: 280, borderRadius: 24, overflow: 'hidden', border: `6px solid ${tog > 0.5 ? TEAL : '#DDE3EC'}`, background: '#fff', opacity: 0.4 + tog * 0.6}}>
              <Img src={PH('personnages/equipe.jpg')} style={{width: '100%', height: 200, objectFit: 'cover', objectPosition: '50% 25%', filter: `grayscale(${1 - tog})`}} />
              <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: TEAL, marginTop: 14}}>avec un chef de département</div>
            </div>
          </Abs>
          <Abs x={0} y={1240} w={1080} style={{textAlign: 'center', opacity: pop(t, 76.3)}}><Pill at={76.3} c={TEAL} size={28}>échanger des perceptions</Pill></Abs>
        </>
      )}
      {t >= 79.0 && (
        <Abs x={70} y={460} w={940} h={520} style={{borderRadius: 30, background: '#EEF3F8', border: '6px solid #C9D2DF', overflow: 'hidden', opacity: pop(t, 79.0)}}>
          <svg width={940} height={520} style={{position: 'absolute', inset: 0}}>{Array.from({length: 24}, (_, k) => <line key={k} x1={k * 40} y1={0} x2={k * 40} y2={520} stroke="#DCE4EE" strokeWidth={1} />)}{Array.from({length: 14}, (_, k) => <line key={k} x1={0} y1={k * 40} x2={940} y2={k * 40} stroke="#DCE4EE" strokeWidth={1} />)}</svg>
          {zones.map(([x, y, l], k) => {
            const lit = t > 79.3 + k * 0.7;
            return <div key={k} style={{position: 'absolute', left: x, top: y, width: 180, height: 120, borderRadius: 16, background: lit ? `${[BLUE, TEAL, ORANGE, VIO, PULSE, GREEN][k]}22` : '#fff', border: `4px solid ${lit ? [BLUE, TEAL, ORANGE, VIO, PULSE, GREEN][k] : '#C9D2DF'}`, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 8, boxSizing: 'border-box', fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: INK}}>{l}{lit && <span style={{position: 'absolute', right: 8, top: 4, color: GREEN, fontSize: 26}}>✓</span>}</div>;
          })}
          <Steps pts={route} at={79.3} dur={4.4} c={`${INK}88`} size={18} />
        </Abs>
      )}
      {t >= 79.0 && <Abs x={0} y={1030} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={79.3} c={INK} size={30}>passer partout</Pill><Pill at={81.5} c={BLUE} size={30}>vision globale</Pill></Abs>}
      {t >= 79.0 && <Stamp at={83.9} c={ORANGE} text="après le week-end" x={260} y={1150} rot={-5} size={50} />}
    </Out>
  );
};

/* ═════════════ SECTION 2 ═════════════ */
const Posture: React.FC = () => {
  const t = useT();
  const tilt = (prog(t, 102.7, 103.4, easeInOut) - prog(t, 104.5, 105.6, easeInOut) * 2) * 10;
  return (
    <Out end={111.9}>
      <Abs x={140} y={330} w={800} h={420} style={{borderRadius: 30, background: '#fff', boxShadow: '0 20px 40px rgba(20,33,61,0.15)', opacity: pop(t, 88.4), overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 60, top: 40, opacity: 0.85}}><F n="clipboard" size={220} /></div>
        <div style={{position: 'absolute', left: 320, top: 70, fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: INK}}>Inspection ?</div>
        <div style={{position: 'absolute', left: 320, top: 150, fontFamily: sansFont, fontWeight: 700, fontSize: 30, color: DIM}}>comme on en a l’habitude</div>
        <Stamp at={91.5} c={RED} text="absolument pas" x={300} y={240} rot={-8} size={56} />
      </Abs>
      <Center y={800}><Kin text="C’est même tout le contraire." at={95.1} size={54} color={RED} /></Center>
      {t > 98.2 && (
        <Abs x={90} y={900} w={900} h={420} style={{opacity: pop(t, 98.3)}}>
          <svg width={900} height={420} style={{position: 'absolute', inset: 0}}>
            <polygon points="450,400 410,420 490,420" fill={INK} />
            <line x1={450} y1={150} x2={450} y2={400} stroke={INK} strokeWidth={12} />
            <g transform={`rotate(${tilt} 450 150)`}>
              <line x1={110} y1={150} x2={790} y2={150} stroke={INK} strokeWidth={12} strokeLinecap="round" />
            </g>
          </svg>
          {[0, 1].map((k) => {
            const ang = (tilt * Math.PI) / 180;
            const cx = 450 + (k ? 340 : -340) * Math.cos(ang);
            const cy = 150 + (k ? 340 : -340) * Math.sin(ang);
            const it = k ? {l: 'la connexion', s: 'comprendre l’état de santé', ic: 'stethoscope', c: TEAL, a: 104.5, sa: 108.4} : {l: 'le contrôle', s: 'chercher des fautes', ic: 'loupe', c: RED, a: 102.7, sa: 106.3};
            return (
              <div key={k} style={{position: 'absolute', left: cx - 170, top: cy, width: 340, textAlign: 'center', opacity: pop(t, it.a)}}>
                <div style={{width: 2, height: 30, background: INK, margin: '0 auto'}} />
                <div style={{background: `${it.c}18`, border: `5px solid ${it.c}`, borderRadius: 24, padding: '14px 10px'}}>
                  <div style={{display: 'flex', justifyContent: 'center'}}><F n={it.ic} size={84} /></div>
                  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: it.c}}>{it.l}</div>
                  <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 24, color: INK, opacity: pop(t, it.sa)}}>{it.s}</div>
                </div>
              </div>
            );
          })}
        </Abs>
      )}
    </Out>
  );
};
const Split: React.FC = () => {
  const t = useT();
  const open = prog(t, 112.0, 112.9, easeInOut);
  const L = [{l: 'contrôle', a: 114.9}, {l: 'checklist', a: 115.7}, {l: 'réaction', a: 116.5}];
  const R = [{l: 'observation', a: 121.1}, {l: 'connexion humaine', a: 122.2}, {l: 'anticipation', a: 123.4}];
  const crossCoup = prog(t, 126.4, 127.0, easeOut);
  return (
    <Out end={131.1}>
      <Center y={310}><Kin text="Noir sur blanc" at={112.9} size={56} /></Center>
      <Abs x={30} y={400} w={505} h={880} style={{borderRadius: 28, overflow: 'hidden', background: '#FFF1F1', border: `5px solid ${RED}`, transform: `translateX(${(1 - open) * -560}px)`}}>
        <div style={{height: 280, position: 'relative', overflow: 'hidden'}}><Img src={PH('verites/clipboard.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.6) contrast(1.05)'}} /><div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 50%, #FFF1F1)`}} /></div>
        <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: RED, marginTop: 6}}>L’inspection</div>
        <div style={{padding: '14px 34px', display: 'flex', flexDirection: 'column', gap: 16}}>
          {L.map((x, k) => <div key={k} style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: INK, opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * -40}px)`}}>☐ {x.l}</div>)}
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, textAlign: 'center', opacity: pop(t, 118.5)}}><Pill at={118.5} c={RED} size={26}>on cherche ce qui cloche</Pill></div>
      </Abs>
      <Abs x={545} y={400} w={505} h={880} style={{borderRadius: 28, overflow: 'hidden', background: '#EAF8F5', border: `5px solid ${TEAL}`, transform: `translateX(${(1 - open) * 560}px)`}}>
        <div style={{height: 280, position: 'relative', overflow: 'hidden'}}><Img src={PH('personnages/equipe.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 25%'}} /><div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 50%, #EAF8F5)`}} /></div>
        <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: TEAL, marginTop: 6, opacity: pop(t, 119.9)}}>La prise de pouls</div>
        <div style={{padding: '14px 34px', display: 'flex', flexDirection: 'column', gap: 16}}>
          {R.map((x, k) => <div key={k} style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: INK, opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * 40}px)`}}>♥ {x.l}</div>)}
        </div>
        <svg width={505} height={120} style={{position: 'absolute', left: 0, bottom: 90, opacity: pop(t, 127.3)}}>
          <path d={ecgPath(0, 505, 80, 60, (px) => (t - (505 - px) / 260) * 1.2)} fill="none" stroke={TEAL} strokeWidth={5} />
        </svg>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, textAlign: 'center', opacity: pop(t, 127.3)}}><Pill at={127.3} c={TEAL} size={26}>sentir les dérives</Pill></div>
      </Abs>
      <Abs x={0} y={1300} w={1080} style={{textAlign: 'center', opacity: pop(t, 125.2)}}>
        <div style={{display: 'inline-block', position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: DIM}}>trouver des coupables<Cross p={crossCoup} w={10} rot={-4} /></div>
      </Abs>
      <div style={{position: 'absolute', left: 540 - 46, top: 760, width: 92, height: 92, borderRadius: 46, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: open, zIndex: 3, border: '6px solid #fff'}}>VS</div>
    </Out>
  );
};

/* ═════════════ SECTION 3 ═════════════ */
const Filtres: React.FC = () => {
  const t = useT();
  const LV = [{n: '1', l: 'vue d’ensemble', s: 'l’état général', a: 143.4, z: 1, c: BLUE, fx: 0.5, fy: 0.5}, {n: '2', l: 'les détails', s: 'signaux discrets', a: 146.3, z: 2.4, c: ORANGE, fx: 0.28, fy: 0.72}, {n: '3', l: 'les personnes', s: 'le plus important', a: 149.5, z: 3.2, c: TEAL, fx: 0.78, fy: 0.42}];
  const W = 300;
  return (
    <Out end={152.5}>
      <Center y={320}><Kin text="Trois filtres, l’un après l’autre" at={134.6} size={56} color={TEAL} /></Center>
      <Abs x={0} y={430} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 10, opacity: pop(t, 136.4)}}>
        {['1', '2', '3'].map((n, k) => <div key={k} style={{transform: `scale(${Math.min(1, spring(t, 136.5 + k * 0.25, 8, 12))})`}}><Tile ch={n} size={90} c={[BLUE, ORANGE, TEAL][k]} /></div>)}
      </Abs>
      <Abs x={0} y={600} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: DIM, opacity: pop(t, 137.4) * (1 - pop(t, 143.0))}}>niveaux d’observation bien distincts</Abs>
      {LV.map((v, k) => {
        const p = Math.min(1, spring(t, v.a, 8, 13));
        return (
          <div key={k} style={{position: 'absolute', left: 50 + k * 335, top: 680, width: W, textAlign: 'center', opacity: t >= v.a ? 1 : 0, transform: `scale(${0.6 + 0.4 * Math.max(0, p)})`}}>
            <div style={{width: W, height: W, borderRadius: W / 2, overflow: 'hidden', border: `10px solid ${v.c}`, boxShadow: '0 20px 40px rgba(20,33,61,0.22)', position: 'relative', background: '#000'}}>
              <Img src={PH('zones/entrepot.jpg')} style={{position: 'absolute', width: W * v.z * 1.78, height: W * v.z, left: W / 2 - W * v.z * 1.78 * v.fx, top: W / 2 - W * v.z * v.fy, objectFit: 'cover'}} />
              <div style={{position: 'absolute', inset: 0, boxShadow: 'inset 0 0 40px rgba(0,0,0,0.35)', borderRadius: '50%'}} />
            </div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: v.c, marginTop: 14}}>{v.l}</div>
            <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 24, color: DIM}}>{v.s}</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: '#fff', background: v.c, borderRadius: 10, display: 'inline-block', padding: '2px 12px', marginTop: 6}}>zoom ×{v.z}</div>
          </div>
        );
      })}
      <Cite y={1160} at={146.3} text="grossissements illustratifs (ajout graphique)" />
      <Stamp at={150.7} c={TEAL} text="les personnes" x={320} y={1220} rot={-5} size={50} />
    </Out>
  );
};
/** Niveau 1 : le jeu des différences vendredi / lundi. */
const Niveau1: React.FC = () => {
  const t = useT();
  const ring = (a: number) => prog(t, a, a + 0.5, easeOut);
  return (
    <Out end={164.8}>
      <Abs x={60} y={320} w={960} style={{display: 'flex', alignItems: 'center', gap: 20}}>
        <Tile ch="1" size={80} c={BLUE} /><div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: INK}}>La référence</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 26, color: DIM}}>le site a-t-il la même tête ?</div></div>
      </Abs>
      {[0, 1].map((k) => (
        <Abs key={k} x={70} y={460 + k * 420} w={940} h={390} style={{borderRadius: 26, overflow: 'hidden', border: '8px solid #fff', boxShadow: '0 20px 40px rgba(20,33,61,0.2)', opacity: pop(t, k ? 158.2 : 152.6), transform: `translateX(${(1 - pop(t, k ? 158.2 : 152.6, 0.6)) * (k ? 300 : -300)}px)`}}>
          <Img src={PH('zones/entrepot.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '30% 40%', filter: k ? 'saturate(1.1)' : 'saturate(0.85) sepia(0.15)'}} />
          {k === 1 && (
            <>
              <div style={{position: 'absolute', left: 90, top: 250, opacity: pop(t, 159.0)}}>
                {[0, 1, 2].map((j) => <div key={j} style={{position: 'absolute', left: j * 34, top: -j * 46, width: 90, height: 60, background: 'linear-gradient(160deg, #D9A866, #B07A3C)', border: '3px solid #8A5B26', borderRadius: 4}} />)}
              </div>
              <svg width={80} height={100} style={{position: 'absolute', left: 300, top: 250, opacity: pop(t, 159.2)}}><polygon points="40,4 74,96 6,96" fill={ORANGE} stroke="#9A4500" strokeWidth={3} /><rect x={22} y={44} width={36} height={12} fill="#fff" /></svg>
              <div style={{position: 'absolute', left: 40, top: 110, width: 260, height: 260, borderRadius: '50%', border: `8px solid ${RED}`, transform: `scale(${ring(160.9)})`, opacity: ring(160.9)}} />
              <div style={{position: 'absolute', left: 230, top: 200, width: 200, height: 200, borderRadius: '50%', border: `8px solid ${GREEN}`, transform: `scale(${ring(161.5)})`, opacity: ring(161.5)}} />
            </>
          )}
          <div style={{position: 'absolute', right: 20, top: 20}}><Pill at={k ? 158.3 : 152.8} c={k ? BLUE : DIM} size={30}>{k ? 'ce lundi' : 'vendredi dernier'}</Pill></div>
        </Abs>
      ))}
      <Abs x={0} y={1300} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={161.0} c={GREEN} size={28}>en bien ?</Pill><Pill at={161.6} c={RED} size={28}>en mal ?</Pill><Pill at={162.9} c={INK} size={28}>1er grand indicateur</Pill></Abs>
      <Cite y={1270} at={159.0} text="différences ajoutées pour illustrer" />
    </Out>
  );
};
/** Niveau 2 : la loupe du détective (fort grossissement). */
const Niveau2: React.FC = () => {
  const t = useT();
  const W = 940;
  const H = 620;
  const HS = [{x: 470, y: 200, l: 'équipement pas à sa place', a: 171.3}, {x: 700, y: 330, l: 'stock plus haut', a: 172.7}, {x: 300, y: 470, l: 'zone moins propre', a: 174.2}, {x: 160, y: 300, l: 'EPI qui traînent', a: 175.5}];
  const cur = HS.reduce((k, h, i) => (t >= h.a ? i : k), 0);
  const prev = Math.max(0, cur - 1);
  const mv = prog(t, HS[cur].a - 0.2, HS[cur].a + 0.5, easeInOut);
  const lx = cur === 0 ? lerp(800, HS[0].x, prog(t, 169.0, 171.4, easeInOut)) : lerp(HS[prev].x, HS[cur].x, mv);
  const ly = cur === 0 ? lerp(520, HS[0].y, prog(t, 169.0, 171.4, easeInOut)) : lerp(HS[prev].y, HS[cur].y, mv);
  const R = 140;
  const Z = 2.4;
  return (
    <Out end={180.1}>
      <Abs x={60} y={320} w={960} style={{display: 'flex', alignItems: 'center', gap: 20}}>
        <Tile ch="2" size={80} c={ORANGE} /><div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: INK}}>Mode détective</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 26, color: DIM}}>les petits détails qui sortent de l’ordinaire</div></div>
        <div style={{marginLeft: 'auto', opacity: pop(t, 167.2)}}><F n="detective" size={100} /></div>
      </Abs>
      <Abs x={70} y={460} w={W} h={H} style={{borderRadius: 26, overflow: 'hidden', border: '8px solid #fff', boxShadow: '0 20px 40px rgba(20,33,61,0.2)', opacity: pop(t, 165.0)}}>
        <Img src={PH('epiepc/allee.jpg')} style={{width: W, height: H, objectFit: 'cover', filter: 'brightness(0.8) saturate(0.8)'}} />
        {HS.map((h, k) => (
          <div key={k} style={{position: 'absolute', left: h.x - 14, top: h.y - 14, width: 28, height: 28, borderRadius: 14, background: ORANGE, border: '4px solid #fff', opacity: t > h.a + 0.5 ? 1 : 0, boxShadow: '0 0 0 6px rgba(240,122,18,0.35)'}} />
        ))}
        {t > 168.8 && (
          <div style={{position: 'absolute', left: lx - R, top: ly - R, width: R * 2, height: R * 2, borderRadius: R, overflow: 'hidden', border: `10px solid ${INK}`, boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 0 30px rgba(255,255,255,0.4)', opacity: pop(t, 168.8)}}>
            <Img src={PH('epiepc/allee.jpg')} style={{position: 'absolute', width: W * Z, height: H * Z, left: R - lx * Z, top: R - ly * Z, objectFit: 'cover'}} />
            <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), transparent 40%)'}} />
          </div>
        )}
        {t > 168.8 && <div style={{position: 'absolute', left: lx + R * 0.62, top: ly + R * 0.62, width: 30, height: 150, background: INK, borderRadius: 15, transform: 'rotate(-45deg)', transformOrigin: '50% 0'}} />}
      </Abs>
      <Abs x={70} y={1110} w={940} style={{display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center'}}>
        {HS.map((h, k) => <Pill key={k} at={h.a} c={k === cur ? ORANGE : '#8B95A5'} size={24}>{h.l}</Pill>)}
      </Abs>
      <Abs x={0} y={1250} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={177.6} c={INK} size={30}>des indices</Pill><Pill at={178.4} c={RED} size={30}>des symptômes</Pill></Abs>
    </Out>
  );
};
/** La dérive : un tracé qui s'écarte de sa voie. */
const Derive: React.FC = () => {
  const t = useT();
  const dr = prog(t, 187.8, 191.0, easeIn);
  const ign = prog(t, 192.4, 194.6, easeIn);
  const pts = Array.from({length: 60}, (_, k) => {
    const x = 40 + k * 14;
    const off = k > 20 ? Math.pow((k - 20) / 40, 2) * 200 * dr : 0;
    return `${k ? 'L' : 'M'}${x} ${200 - off}`;
  }).join(' ');
  return (
    <Out end={195.65}>
      <Card x={80} y={320} w={920} at={180.1} c={ORANGE}>
        <div style={{fontFamily: 'Georgia, serif', fontSize: 110, color: ORANGE, lineHeight: 0.6, opacity: 0.8}}>“</div>
        <Kin text="Ces petites choses sont en fait cruciales." at={182.1} size={50} />
        <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 28, color: DIM, marginTop: 10, opacity: pop(t, 185.2)}}>pas encore de vrais problèmes… mais un signal</div>
      </Card>
      <Abs x={70} y={720} w={940} h={420} style={{borderRadius: 26, background: '#fff', boxShadow: '0 20px 40px rgba(20,33,61,0.14)', overflow: 'hidden', opacity: pop(t, 186.0)}}>
        <svg width={940} height={420} style={{position: 'absolute', inset: 0}}>
          <rect x={30} y={170} width={880} height={60} rx={30} fill={`${GREEN}22`} stroke={GREEN} strokeWidth={3} strokeDasharray="10 8" />
          <text x={40} y={160} fontFamily={sansFont} fontWeight={800} fontSize={24} fill={GREEN}>les habitudes</text>
          <path d={pts} fill="none" stroke={dr > 0.6 ? RED : ORANGE} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{position: 'absolute', left: 340, top: 300, opacity: pop(t, 188.3)}}><Pill at={188.3} c={ORANGE} size={26}>petit relâchement</Pill></div>
        <div style={{position: 'absolute', right: 30, top: 30, opacity: pop(t, 189.4)}}><Pill at={189.4} c={RED} size={26}>début de dérive</Pill></div>
      </Abs>
      <Abs x={70} y={1170} w={940} h={150} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, opacity: pop(t, 191.3)}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM}}>ignorer</div>
        <div style={{fontSize: 50, fontWeight: 900, color: DIM}}>→</div>
        {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{width: 28, height: 110, borderRadius: 6, background: k === 4 ? RED : INK, transformOrigin: '50% 100%', transform: `rotate(${Math.min(75, Math.max(0, (ign * 6 - k) * 75))}deg)`}} />)}
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: RED, opacity: pop(t, 194.4)}}>incidents sérieux</div>
      </Abs>
    </Out>
  );
};
/** Niveau 3 : la météo des équipes. */
const Niveau3: React.FC = () => {
  const t = useT();
  const M = [{l: 'tension', ic: 'eclair', a: 200.9, c: RED, x: 60, y: 40}, {l: 'ambiance détendue', ic: 'soleil', a: 202.6, c: GOLDC, x: 590, y: 30}, {l: 'fatigue', ic: 'fatigue', a: 204.5, c: DIM, x: 40, y: 330}, {l: 'abattement', ic: 'pensif', a: 205.0, c: VIO, x: 330, y: 400}, {l: 'enthousiasme', ic: 'etoile', a: 206.7, c: GREEN, x: 620, y: 320}];
  return (
    <Out end={213.35}>
      <Abs x={60} y={320} w={960} style={{display: 'flex', alignItems: 'center', gap: 20}}>
        <Tile ch="3" size={80} c={TEAL} /><div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: INK}}>Au cœur du réacteur</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 26, color: DIM}}>les gens · comment vont les équipes ?</div></div>
      </Abs>
      <Deep src="causerie/groupe.jpg" x={70} y={460} w={940} h={560} at={196.3} pos="50% 45%" filter={`saturate(${0.9})`}>
        {M.map((m, k) => (
          <div key={k} style={{position: 'absolute', left: m.x, top: m.y, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.92)', borderRadius: 40, padding: '8px 18px 8px 8px', border: `4px solid ${m.c}`, transform: `scale(${Math.max(0, Math.min(1, spring(t, m.a, 8, 13)))})`, boxShadow: '0 10px 20px rgba(0,0,0,0.25)'}}>
            <F n={m.ic} size={60} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: m.c}}>{m.l}</div>
          </div>
        ))}
        {t > 208.5 && [0, 1, 2].map((r) => {
          const ph = ((t - 208.5) * 0.6 + r / 3) % 1;
          return <div key={r} style={{position: 'absolute', left: 470 - ph * 500, top: 280 - ph * 500, width: ph * 1000, height: ph * 1000, borderRadius: '50%', border: `5px solid ${PULSE}`, opacity: 0.5 * (1 - ph)}} />;
        })}
      </Deep>
      <Abs x={0} y={1060} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: pop(t, 208.5)}}>
        <Heart size={70} beat={beatAt(t)} /><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 52, color: PULSE}}>une lecture très intuitive</div>
      </Abs>
      <Abs x={0} y={1200} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={211.6} c={GREEN} size={30}>le comment ✓</Pill><Pill at={212.4} c={ORANGE} size={30}>le pourquoi ?</Pill></Abs>
    </Out>
  );
};
/* ═════════════ SECTION 4 ═════════════ */
const Presence: React.FC = () => {
  const t = useT();
  const c1 = prog(t, 229.6, 230.1, easeOut);
  const c2 = prog(t, 230.5, 231.0, easeOut);
  const planks = 8;
  return (
    <Out end={236.9}>
      <Center y={320}><Kin text="Quel impact sur la culture ?" at={216.9} size={58} color={ORANGE} /></Center>
      <Abs x={0} y={420} w={1080} style={{opacity: pop(t, 224.0)}}><Word text="PRÉSENT" at={224.1} size={104} c={ORANGE} variant={1} gap={8} /></Abs>
      <Abs x={0} y={570} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 12}}><Pill at={225.8} c={BLUE} size={30}>régulière</Pill><Pill at={227.1} c={TEAL} size={30}>visible</Pill><Pill at={228.0} c={GREEN} size={30}>bienveillante</Pill></Abs>
      <Abs x={90} y={680} w={900} h={170} style={{display: 'flex', justifyContent: 'center', gap: 40, opacity: pop(t, 229.1) * (1 - prog(t, 232.4, 232.9))}}>
        {[{ic: 'calendrier', l: 'agenda caché', p: c1}, {ic: 'memo', l: 'carnet à la main', p: c2}].map((x, k) => (
          <div key={k} style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 22, padding: '18px 26px', boxShadow: '0 12px 26px rgba(20,33,61,0.14)'}}>
            <F n={x.ic} size={80} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: DIM}}>sans {x.l}</div><Cross p={x.p} w={10} rot={-10} />
          </div>
        ))}
      </Abs>
      {t > 232.4 && (
        <Abs x={60} y={700} w={960} h={600} style={{opacity: pop(t, 232.5)}}>
          <div style={{position: 'absolute', left: 0, top: 0, width: 260, textAlign: 'center'}}>
            <div style={{width: 230, height: 230, borderRadius: 115, overflow: 'hidden', border: `8px solid ${ORANGE}`, margin: '0 auto'}}><Img src={PH('causerie/manager.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 18%'}} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, marginTop: 8}}>le responsable</div>
          </div>
          <div style={{position: 'absolute', right: 0, top: 0, width: 260, textAlign: 'center'}}>
            <div style={{width: 230, height: 230, borderRadius: 115, overflow: 'hidden', border: `8px solid ${TEAL}`, margin: '0 auto'}}><Img src={PH('induction/mine-equipe.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '30% 40%'}} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, marginTop: 8}}>les équipes</div>
          </div>
          <svg width={960} height={600} style={{position: 'absolute', inset: 0}}>
            <path d="M250 150 Q 480 40 710 150" fill="none" stroke={INK} strokeWidth={5} strokeDasharray={600} strokeDashoffset={600 * (1 - prog(t, 232.6, 233.4))} />
            <path d="M250 150 Q 480 260 710 150" fill="none" stroke={INK} strokeWidth={5} strokeDasharray={600} strokeDashoffset={600 * (1 - prog(t, 232.6, 233.4))} />
          </svg>
          {Array.from({length: planks}, (_, k) => {
            const x = lerp(270, 690, (k + 0.5) / planks);
            const y = 150 + Math.sin(((k + 0.5) / planks) * Math.PI) * 55;
            const p = Math.min(1, spring(t, 233.2 + k * 0.22, 9, 12));
            return <div key={k} style={{position: 'absolute', left: x - 22, top: y - 10 - (1 - p) * 200, width: 44, height: 26, borderRadius: 5, background: 'linear-gradient(160deg, #FBEBC6, #D8A85E)', border: '2px solid #A87A3C', opacity: t > 233.2 + k * 0.22 ? 1 : 0}} />;
          })}
          <div style={{position: 'absolute', left: 0, right: 0, top: 320, textAlign: 'center', opacity: pop(t, 233.8)}}><Pill at={233.8} c={ORANGE} size={40}>un lien de confiance solide</Pill></div>
        </Abs>
      )}
    </Out>
  );
};
const Resultats: React.FC = () => {
  const t = useT();
  const B = [{l: 'Chef, vous avez une minute ?', a: 244.5, x: 60, y: 30}, {l: 'Il y a un souci au quai…', a: 245.6, x: 440, y: 110}, {l: 'On a une idée !', a: 246.7, x: 120, y: 210}];
  const burst = prog(t, 255.1, 256.3, easeOut);
  return (
    <Out end={256.85}>
      <Center y={320}><Kin text="Des résultats très concrets" at={236.9} size={58} color={ORANGE} /></Center>
      <Abs x={0} y={420} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={241.3} c={BLUE} size={30}>familier</Pill><Pill at={242.5} c={TEAL} size={30}>accessible</Pill></Abs>
      <Deep src="promo/participants.jpg" x={70} y={520} w={940} h={520} at={240.3} pos="50% 40%">
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,33,61,0.15), transparent 50%)'}} />
        {B.map((b, k) => (
          <div key={k} style={{position: 'absolute', left: b.x, top: b.y - burst * 60, background: '#fff', borderRadius: 26, padding: '14px 22px', fontFamily: handFont, fontWeight: 700, fontSize: 34, color: INK, boxShadow: '0 12px 24px rgba(0,0,0,0.25)', transform: `scale(${Math.max(0, Math.min(1, spring(t, b.a, 8, 12)))})`, transformOrigin: '20% 100%'}}>
            {b.l}
            <div style={{position: 'absolute', left: 40, bottom: -18, width: 0, height: 0, borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderTop: '20px solid #fff'}} />
          </div>
        ))}
      </Deep>
      <Abs x={0} y={1062} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: DIM, opacity: pop(t, 244.6)}}>répliques imaginées pour illustrer (ajout)</Abs>
      <Abs x={70} y={1110} w={940} h={150} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24}}>
        <div style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 10, background: '#fff', padding: '12px 22px', borderRadius: 20, boxShadow: '0 10px 22px rgba(20,33,61,0.12)', opacity: pop(t, 247.8)}}><F n="dossier" size={60} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: DIM}}>jamais dans un rapport</div></div>
        <div style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 10, background: '#fff', padding: '12px 22px', borderRadius: 20, boxShadow: '0 10px 22px rgba(20,33,61,0.12)', opacity: pop(t, 251.1)}}><F n="clipboard" size={60} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: DIM}}>inspection</div><Cross p={prog(t, 252.3, 252.9, easeOut)} w={10} /></div>
      </Abs>
      <Stamp at={255.2} c={GREEN} text="la parole se libère" x={250} y={1240} rot={-5} size={50} />
      {t > 255.1 && <Dust n={18} c={ORANGE} />}
    </Out>
  );
};

/* ═════════════ SECTION 5 ═════════════ */
const Piliers: React.FC = () => {
  const t = useT();
  const P = [{k: 'REGULARITE', l: 'Régularité', s: 'non négociable', s2: 'habitude + confiance', a: 268.4, sa: 269.7, s2a: 271.0, c: BLUE},
    {k: 'INTENTION', l: 'Intention claire', s: 'observer & comprendre', s2: 'pas inspecter & juger', a: 274.6, sa: 276.6, s2a: 278.6, c: TEAL},
    {k: 'PRESENCE', l: 'Présence pleine', s: 'sans checklist', s2: 'sans téléphone', a: 280.5, sa: 282.2, s2a: 282.9, c: ORANGE},
    {k: 'ACCES', l: 'Accessibilité', s: 's’arrêter · écouter', s2: 'échanger', a: 284.7, sa: 285.9, s2a: 288.8, c: VIO}];
  const roof = Math.min(1, spring(t, 288.9, 8, 12));
  return (
    <Out end={290.15}>
      <Center y={310}><Kin text="Quatre piliers, des règles d’or" at={260.4} size={56} color={VIO} /></Center>
      <Abs x={60} y={410} w={960} h={170}>
        <svg width={960} height={170} style={{position: 'absolute', inset: 0, transform: `translateY(${(1 - Math.max(0, roof)) * -260}px)`, opacity: t > 288.9 ? 1 : 0.0}}>
          <polygon points="480,10 940,150 20,150" fill="#fff" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        </svg>
        <div style={{position: 'absolute', left: 0, right: 0, top: 86, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: PULSE, opacity: t > 288.9 ? pop(t, 289.1) : 0}}>PRISE DE POULS</div>
      </Abs>
      {P.map((p, k) => {
        const h = 640 * Math.max(0, Math.min(1, spring(t, p.a, 8, 13)));
        return (
          <div key={k} style={{position: 'absolute', left: 80 + k * 236, top: 1240 - h, width: 210, height: h, overflow: 'hidden', borderRadius: '10px 10px 0 0', background: `linear-gradient(90deg, ${p.c}DD, ${p.c}, ${p.c}BB)`, boxShadow: '0 16px 30px rgba(20,33,61,0.22)'}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 34, background: 'rgba(255,255,255,0.25)'}} />
            {Array.from({length: 4}, (_, j) => <div key={j} style={{position: 'absolute', top: 40, bottom: 0, left: 30 + j * 46, width: 6, background: 'rgba(255,255,255,0.18)', borderRadius: 3}} />)}
            <div style={{position: 'absolute', left: 0, right: 0, top: 60, textAlign: 'center'}}><Tile ch={String(k + 1)} size={70} c={p.c} /></div>
            <div style={{position: 'absolute', left: 8, right: 8, top: 160, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff', lineHeight: 1.1}}>{p.l}</div>
            <div style={{position: 'absolute', left: 8, right: 8, top: 270, textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 30, color: '#fff', opacity: pop(t, p.sa), lineHeight: 1.1}}>{p.s}</div>
            <div style={{position: 'absolute', left: 8, right: 8, top: 380, textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 30, color: '#fff', opacity: pop(t, p.s2a), lineHeight: 1.1}}>{p.s2}</div>
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 60, right: 60, top: 1240, height: 40, background: INK, borderRadius: 8, opacity: pop(t, 266.7)}} />
      <Abs x={0} y={1290} w={1080} style={{display: 'flex', justifyContent: 'center', opacity: pop(t, 266.7)}}>
        <Board text={['', 'REGULARITE', 'INTENTION', 'PRESENCE', 'ACCES'][P.reduce((a, p, i) => (t >= p.a ? i + 1 : a), 0)] || 'PILIERS'} at={P.reduce((a, p) => (t >= p.a ? p.a : a), 266.7)} h={56} c={INK} stag={0.04} />
      </Abs>
    </Out>
  );
};
const Final: React.FC = () => {
  const t = useT();
  const q = prog(t, 299.3, 301.5, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      <Center y={320}><Kin text="Un rituel simple mais puissant" at={290.3} size={58} color={PULSE} /></Center>
      <Deep src="induction/ingenieur-chantier.jpg" x={150} y={430} w={780} h={420} at={291.0} pos="50% 30%" />
      <Card x={80} y={900} w={920} at={295.3} c={PULSE}>
        <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: DIM}}>peu importe la fonction ou le secteur…</div>
        <Kin text="Quel est votre rituel pour prendre le pouls de votre environnement ?" at={299.3} size={46} />
      </Card>
      <Abs x={90} y={1230} w={900} h={130} style={{borderRadius: 20, overflow: 'hidden', border: '5px solid #E9C7CC', opacity: pop(t, 299.0)}}>
        <Paper w={900} h={130} cell={13} />
        <svg width={900} height={130} style={{position: 'absolute', inset: 0}}>
          <defs><clipPath id="fq"><rect x={0} y={0} width={900 * q} height={130} /></clipPath></defs>
          <path d={ecgPath(0, 900, 90, 70, (px) => px / 300 + 0.05)} fill="none" stroke={PULSE} strokeWidth={6} clipPath="url(#fq)" />
        </svg>
        <div style={{position: 'absolute', right: 20, top: 12, opacity: pop(t, 301.6)}}><Heart size={90} beat={beatAt(t)} /></div>
      </Abs>
      {t > 301.6 && <Dust n={22} c={PULSE} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap((x) => [{at: x.at, s: 'soft-whoosh', v: 0.4, dur: 1}, {at: x.at + 0.6, s: 'deep-hit', v: 0.5}, {at: x.at + 0.84, s: 'bass-hit', v: 0.4}, {at: x.at + 1.05, s: 'sfx/swish', v: 0.25}, {at: x.at + 1.7, s: 'sfx/pop', v: 0.22}, {at: x.at + 3.0, s: 'sfx/whoosh', v: 0.3}]),
  {at: 3.5, s: 'sfx/pop', v: 0.2}, {at: 4.6, s: 'sfx/pop', v: 0.2}, {at: 5.1, s: 'sfx/pop', v: 0.2}, {at: 5.6, s: 'sfx/swish', v: 0.3}, {at: 6.6, s: 'sfx/ding', v: 0.22}, {at: 8.9, s: 'sfx/thud', v: 0.25}, {at: 10.8, s: 'sfx/thud', v: 0.25}, {at: 12.5, s: 'soft-whoosh', v: 0.3}, {at: 13.6, s: 'sfx/rise', v: 0.2},
  {at: 20.4, s: 'sfx/swish', v: 0.35}, {at: 20.6, s: 'sfx/thud', v: 0.25}, {at: 22.3, s: 'sfx/pop', v: 0.2}, {at: 23.6, s: 'sfx/pop', v: 0.2}, {at: 24.7, s: 'sfx/pop', v: 0.2}, {at: 25.7, s: 'sfx/rise', v: 0.25}, {at: 30.6, s: 'tampon', v: 0.45},
  {at: 36.6, s: 'sfx/whoosh', v: 0.25}, {at: 40.9, s: 'sfx/rise', v: 0.2}, {at: 46.3, s: 'sfx/swish', v: 0.3}, {at: 47.7, s: 'sfx/swish', v: 0.3},
  {at: 49.9, s: 'tick', v: 0.25}, ...rep(51.0, 12, 0.37, 'sfx/thud', 0.08), {at: 58.3, s: 'sfx/whoosh', v: 0.3}, {at: 60.6, s: 'tampon', v: 0.45},
  ...flaps(66.4, 10), {at: 67.3, s: 'soft-whoosh', v: 0.3}, {at: 72.1, s: 'sfx/pop', v: 0.2}, {at: 74.4, s: 'sfx/swish', v: 0.25}, {at: 79.0, s: 'sfx/whoosh', v: 0.3}, ...rep(79.3, 6, 0.7, 'sfx/pop', 0.12), {at: 83.9, s: 'tampon', v: 0.45},
  {at: 88.4, s: 'soft-whoosh', v: 0.3}, {at: 91.5, s: 'tampon', v: 0.5}, {at: 98.3, s: 'sfx/whoosh', v: 0.25}, {at: 102.7, s: 'sfx/thud', v: 0.3}, {at: 104.5, s: 'sfx/thud', v: 0.3}, {at: 108.4, s: 'sfx/ding', v: 0.22},
  {at: 112.0, s: 'sfx/whoosh', v: 0.35}, ...[114.9, 115.7, 116.5, 121.1, 122.2, 123.4].map((a) => ({at: a, s: 'sfx/pop', v: 0.18})), {at: 126.4, s: 'sfx/swish', v: 0.3}, {at: 127.3, s: 'sfx/rise', v: 0.2},
  ...[136.5, 136.75, 137.0].map((a) => ({at: a, s: 'sfx/thud', v: 0.25})), {at: 143.4, s: 'sfx/pop', v: 0.25}, {at: 146.3, s: 'sfx/pop', v: 0.25}, {at: 149.5, s: 'sfx/pop', v: 0.25}, {at: 150.7, s: 'tampon', v: 0.45},
  {at: 152.6, s: 'sfx/whoosh', v: 0.25}, {at: 158.2, s: 'sfx/whoosh', v: 0.25}, {at: 160.9, s: 'stylo', v: 0.35}, {at: 161.5, s: 'stylo', v: 0.35},
  {at: 165.0, s: 'soft-whoosh', v: 0.3}, {at: 168.8, s: 'sfx/swish', v: 0.25}, ...[171.3, 172.7, 174.2, 175.5].map((a) => ({at: a, s: 'sfx/ding', v: 0.16})),
  {at: 180.1, s: 'soft-whoosh', v: 0.3}, {at: 187.8, s: 'tension', v: 0.25, dur: 3}, ...rep(192.6, 5, 0.33, 'sfx/thud', 0.22),
  {at: 196.3, s: 'soft-whoosh', v: 0.3}, ...[200.9, 202.6, 204.5, 205.0, 206.7].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 211.6, s: 'validation', v: 0.3},
  ...rep(224.1, 7, 0.07, 'sfx/thud', 0.2), {at: 225.8, s: 'sfx/pop', v: 0.2}, {at: 227.1, s: 'sfx/pop', v: 0.2}, {at: 228.0, s: 'sfx/pop', v: 0.2}, {at: 229.6, s: 'sfx/swish', v: 0.25}, {at: 230.5, s: 'sfx/swish', v: 0.25}, ...rep(233.2, 8, 0.22, 'sfx/thud', 0.14), {at: 233.8, s: 'sfx/ding', v: 0.22},
  {at: 240.3, s: 'soft-whoosh', v: 0.3}, {at: 244.5, s: 'sfx/pop', v: 0.22}, {at: 245.6, s: 'sfx/pop', v: 0.22}, {at: 246.7, s: 'sfx/pop', v: 0.22}, {at: 252.3, s: 'sfx/swish', v: 0.3}, {at: 255.2, s: 'tampon', v: 0.45},
  ...[268.4, 274.6, 280.5, 284.7].flatMap((a) => [{at: a, s: 'sfx/rise', v: 0.22}, ...flaps(a, 9)]), {at: 288.9, s: 'bass-hit', v: 0.4},
  {at: 291.0, s: 'soft-whoosh', v: 0.3}, {at: 295.3, s: 'sfx/whoosh', v: 0.25}, {at: 299.3, s: 'riser', v: 0.25, dur: 3}, {at: 301.6, s: 'deep-hit', v: 0.35}, {at: 301.85, s: 'bass-hit', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Pouls: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={17.7}><Terrain /></Gate>
    <Gate from={17.6} to={32.3}><Signaux /></Gate>
    <Gate from={35.6} to={49.5}><Rituel /></Gate>
    <Gate from={49.4} to={62.9}><Marche /></Gate>
    <Gate from={62.8} to={85.0}><Lundi /></Gate>
    <Gate from={88.3} to={112.0}><Posture /></Gate>
    <Gate from={111.9} to={131.2}><Split /></Gate>
    <Gate from={134.5} to={152.6}><Filtres /></Gate>
    <Gate from={152.5} to={164.9}><Niveau1 /></Gate>
    <Gate from={164.8} to={180.2}><Niveau2 /></Gate>
    <Gate from={180.1} to={195.7}><Derive /></Gate>
    <Gate from={195.6} to={213.4}><Niveau3 /></Gate>
    <Gate from={216.8} to={237.0}><Presence /></Gate>
    <Gate from={236.9} to={256.9}><Resultats /></Gate>
    <Gate from={260.3} to={290.2}><Piliers /></Gate>
    <Gate from={290.1} to={OUTRO_AT}><Final /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Battement i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={304.3}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-prise-de-pouls-origine.m4a')} trimAfter={s(304.5)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [random, easeIn];

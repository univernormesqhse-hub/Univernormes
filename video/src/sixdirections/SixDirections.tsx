import React, {createContext, useContext} from 'react';
import {AbsoluteFill, Audio, Img, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Gate, kf, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Check} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s, sansFont} from '../theme';
import {captions} from './captions';

/**
 * « La sécurité dans les six directions » (1 min 20) — voix d'origine. Technique nouvelle dans la série : un diorama
 * 3D réel (CSS preserve-3d) — un disque d'atelier flottant, l'opérateur au centre, et une caméra orbitale qui tourne
 * autour de lui pour regarder chaque direction (devant, derrière, gauche, droite), bascule vers le haut (charge
 * suspendue qui se balance, objets qui tombent avec leur ombre) puis passe en plongée verticale (trappe à charnière
 * qui s'ouvre, fissures, niveau inférieur). Objets en « billboards » toujours face caméra, balayage radar au sol,
 * cube gyroscopique dans le viseur qui pivote sur la face de la direction, rubalise circulaire, clignement d'œil final.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 76.2;
export const SIXDIRECTIONS_FRAMES = s(OUTRO_AT + 3.8);
const INK = '#F4F1EA';
const AMBER = '#FFB21E';
const RED = '#FF4D3D';
const GREEN = '#2FC27A';
const BG = '#121821';

type Dir = {n: number; l: string; at: number; until: number; ang: number; c: string};
const DIRS: Dir[] = [
  {n: 1, l: 'Devant', at: 5.5, until: 12.4, ang: 0, c: '#FFB21E'},
  {n: 2, l: 'Derrière', at: 12.6, until: 20.2, ang: 180, c: '#FF7A3D'},
  {n: 3, l: 'À gauche', at: 20.4, until: 28.4, ang: 270, c: '#3DB7FF'},
  {n: 4, l: 'À droite', at: 28.6, until: 36.0, ang: 90, c: '#B57BFF'},
  {n: 5, l: 'Au-dessus', at: 36.2, until: 43.8, ang: -1, c: '#2FD3B4'},
  {n: 6, l: 'Au-dessous', at: 44.0, until: 51.8, ang: -2, c: '#FF5FA2'},
];
const SYN = 52.0;
const ATT = 60.4;
const FIN = 69.0;
const SUB = 71.3;

const pop = (t: number, at: number, d = 0.4) => prog(t, at, at + d, easeOut);
const spring = (t: number, at: number) => {
  const x = Math.max(0, t - at);
  return t < at ? 0 : 1 - Math.exp(-x * 7) * Math.cos(x * 16);
};
const T: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 34, color = INK, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, textTransform: 'uppercase', letterSpacing: -0.5, lineHeight: 1.04, ...style}}>{children}</div>
);

/* ─────────── Caméra orbitale ─────────── */
type Cam = {yaw: number; tilt: number; zoom: number; fx: number; fy: number; cy: number};
// [t, yaw, tilt, zoom, fx, fy, cy]
const SHOTS: number[][] = [
  [0.0, -40, 0, 1.5, 0, 0, 1000],
  [1.6, -20, 10, 1.15, 0, 0, 1000],
  [3.0, 0, 56, 0.72, 0, -60, 1080],
  [5.0, 0, 56, 0.66, 0, -60, 1080],
  [6.2, 0, 58, 0.74, 0, -480, 1020],
  [12.3, 8, 58, 0.78, 0, -480, 1020],
  [13.5, 180, 58, 0.74, 0, 470, 1020],
  [20.1, 172, 58, 0.78, 0, 470, 1020],
  [21.4, 90, 58, 0.74, -470, 0, 1020],
  [28.3, 82, 58, 0.78, -470, 0, 1020],
  [29.6, -90, 58, 0.74, 470, 0, 1020],
  [35.9, -98, 58, 0.78, 470, 0, 1020],
  [37.3, 0, 78, 0.8, 0, -250, 1480],
  [43.7, 10, 78, 0.8, 0, -250, 1480],
  [45.0, 0, 0, 1.25, 0, 120, 1000],
  [51.6, 10, 0, 1.3, 0, 120, 1000],
  [53.2, 0, 52, 0.44, 0, 0, 1080],
  [59.6, 90, 52, 0.44, 0, 0, 1080],
  [61.0, 110, 60, 0.6, 0, 0, 1180],
  [68.4, 150, 60, 0.6, 0, 0, 1180],
  [70.0, 180, 8, 0.5, 0, 0, 1000],
  [80, 200, 8, 0.5, 0, 0, 1000],
];
const camAt = (t: number): Cam => {
  const times = SHOTS.map((r) => r[0]);
  const col = (k: number) => kf(t, times, SHOTS.map((r) => r[k]), easeInOut);
  return {yaw: col(1), tilt: col(2), zoom: col(3), fx: col(4), fy: col(5), cy: col(6)};
};
const GCtx = createContext(1);
/** Groupe d'objets d'une direction : visible pendant sa scène, puis tous ensemble à partir de la synthèse. */
const G: React.FC<{g: number; children: React.ReactNode}> = ({g, children}) => {
  const t = useT();
  const d = DIRS[g];
  const o = t >= SYN - 0.8 ? prog(t, SYN - 0.8, SYN) : prog(t, d.at - 0.6, d.at - 0.1) * (1 - prog(t, d.until - 0.1, d.until + 0.4));
  if (o <= 0.001) return null;
  return <GCtx.Provider value={o}>{children}</GCtx.Provider>;
};
const CamCtx = createContext<Cam>({yaw: 0, tilt: 0, zoom: 1, fx: 0, fy: 0, cy: 1000});

/** Objet debout, toujours face caméra, posé au sol en (x, y), à la hauteur z. */
const Bb: React.FC<{x: number; y: number; z?: number; w: number; h: number; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, z = 0, w, h, children, style}) => {
  const cam = useContext(CamCtx);
  const g = useContext(GCtx);
  return (
    <div style={{opacity: g, position: 'absolute', left: x - w / 2, top: y - h, width: w, height: h, transformOrigin: '50% 100%', transform: `translateZ(${z}px) rotateZ(${-cam.yaw}deg) rotateX(${-cam.tilt}deg)`, transformStyle: 'preserve-3d', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', ...style}}>
      {children}
    </div>
  );
};
/** Élément à plat sur le sol, centré en (x, y). */
const Flat: React.FC<{x: number; y: number; w: number; h: number; z?: number; children?: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, z = 1, children, style}) => {
  const g = useContext(GCtx);
  return <div style={{position: 'absolute', left: x - w / 2, top: y - h / 2, width: w, height: h, transform: `translateZ(${z}px)`, ...style, opacity: (style?.opacity as number ?? 1) * g}}>{children}</div>;
};
const Shadow: React.FC<{x: number; y: number; r: number; o?: number}> = ({x, y, r, o = 0.35}) => (
  <Flat x={x} y={y} w={r * 2} h={r * 1.2} style={{borderRadius: '50%', background: `radial-gradient(ellipse, rgba(20,24,30,${o}) 0%, transparent 70%)`}} />
);

/** Repère « danger identifié » au sol, qui passe au vert (mesure appliquée) en synthèse. */
const Ring: React.FC<{x: number; y: number; at: number; r?: number}> = ({x, y, at, r = 130}) => {
  const t = useT();
  if (t < at) return null;
  const q = pop(t, at, 0.5);
  const safe = prog(t, 57.6, 58.4);
  const c = safe > 0.5 ? GREEN : RED;
  const pulse = 1 + 0.08 * Math.sin((t - at) * 6);
  return (
    <Flat x={x} y={y} w={r * 2} h={r * 2} z={2} style={{borderRadius: '50%', border: `10px solid ${c}`, boxShadow: `0 0 30px ${c}`, transform: `translateZ(2px) scale(${(2 - q) * pulse})`, opacity: q * 0.9, background: `${c}22`}} />
  );
};

const Forklift: React.FC<{w: number; color?: string}> = ({w, color = '#F5B800'}) => {
  const t = useT();
  return (
    <svg width={w} height={w * 1.1} viewBox="0 0 200 220">
      <rect x={20} y={10} width={12} height={170} fill="#5A6170" />
      <rect x={168} y={10} width={12} height={170} fill="#5A6170" />
      <rect x={20} y={20} width={160} height={10} fill="#5A6170" />
      <rect x={30} y={168} width={140} height={10} fill="#2B2F38" />
      <rect x={44} y={60} width={112} height={110} rx={14} fill={color} />
      <rect x={58} y={74} width={84} height={50} rx={8} fill="#BFE6FF" />
      <rect x={30} y={175} width={40} height={40} rx={10} fill="#1E2229" />
      <rect x={130} y={175} width={40} height={40} rx={10} fill="#1E2229" />
      <rect x={88} y={46} width={24} height={14} rx={5} fill={Math.floor(t * 4) % 2 ? '#FF8A00' : '#FFD08A'} />
      <rect x={60} y={140} width={22} height={12} rx={4} fill="#FFF6C8" />
      <rect x={118} y={140} width={22} height={12} rx={4} fill="#FFF6C8" />
    </svg>
  );
};

/* ─────────── Le monde (disque d'atelier) ─────────── */
const World: React.FC = () => {
  const t = useT();
  const cam = camAt(t);
  const shake = t > 27.2 && t < 27.7 ? Math.sin(t * 90) * 10 * (1 - (t - 27.2) / 0.5) : 0;
  const active = DIRS.find((d) => t >= d.at && t < d.until);
  // balayage radar au sol orienté vers la direction active (4 directions horizontales)
  const sweepDir = active && active.ang >= 0 ? active.ang : null;
  const sweepO = active && sweepDir !== null ? prog(t, active.at + 0.6, active.at + 1.2) * (1 - prog(t, active.until - 0.6, active.until)) : 0;
  const sweep = Math.sin(t * 2.2) * 28;
  // positions animées
  const fk = kf(t, [7.3, 8.8], [-1350, -720]);
  const truck = kf(t, [14.5, 16.6], [1350, 760]);
  const walker = prog(t, 17.8, 19.6, easeInOut);
  const cart = kf(t, [23.4, 24.6], [-1250, -640]);
  const swing = Math.sin((t - 38) * 2.1) * 14 * (t > 38 ? 1 : 0);
  const loadZ = 400;
  const fall = (at: number) => Math.max(0, 1150 - Math.pow(Math.max(0, t - at), 2) * 2600);
  const lid = prog(t, 47.3, 48.3, easeOut);
  const crack = prog(t, 48.2, 49.4, easeInOut);
  const deep = prog(t, 49.8, 50.8, easeOut);
  const tape = prog(t, 65.4, 66.6, easeInOut);
  const workerOp = 1;
  return (
    <CamCtx.Provider value={cam}>
      <AbsoluteFill style={{perspective: 2200, perspectiveOrigin: `540px ${cam.cy - 150}px`, overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 0, height: 0, transformStyle: 'preserve-3d', transform: `translate(${540 + shake}px, ${cam.cy}px) rotateX(${cam.tilt}deg) rotateZ(${cam.yaw}deg) scale3d(${cam.zoom}, ${cam.zoom}, ${cam.zoom}) translate(${-cam.fx}px, ${-cam.fy}px)`}}>
          {/* tranche du disque */}
          <div style={{position: 'absolute', left: -1500, top: -1500, width: 3000, height: 3000, borderRadius: '50%', background: '#5B5246', transform: 'translateZ(-60px)', boxShadow: '0 0 0 30px #3F382F'}} />
          {/* sol béton + quadrillage */}
          <div style={{position: 'absolute', left: -1500, top: -1500, width: 3000, height: 3000, borderRadius: '50%', overflow: 'hidden', background: 'radial-gradient(circle at 50% 50%, #E8E3D8 0%, #D8D1C3 60%, #C6BDAC 100%)'}}>
            <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(60,52,40,0.13) 3px, transparent 3px), linear-gradient(90deg, rgba(60,52,40,0.13) 3px, transparent 3px)', backgroundSize: '200px 200px', backgroundPosition: '-3px -3px'}} />
            {/* allée piétonne (avant) */}
            <div style={{position: 'absolute', left: 1500 - 260, top: 0, width: 520, height: 1500 - 120, borderLeft: '14px solid #F2C200', borderRight: '14px solid #F2C200', boxSizing: 'border-box', opacity: 0.8}} />
          </div>
          {/* repère central : rose des six directions */}
          <Flat x={0} y={0} w={420} h={420} style={{borderRadius: '50%', border: '6px dashed rgba(40,40,40,0.25)'}} />
          {/* balayage radar */}
          {sweepDir !== null && sweepO > 0 && (
            <Flat x={0} y={0} w={2200} h={2200} z={3} style={{borderRadius: '50%', opacity: sweepO, background: `conic-gradient(from ${sweepDir - 30 + sweep}deg, ${active!.c}88 0deg, ${active!.c}22 60deg, transparent 61deg)`, WebkitMaskImage: 'radial-gradient(circle, black 15%, rgba(0,0,0,0.7) 45%, transparent 70%)'}} />
          )}
          {/* flèches au sol du crochet (3.2 – 5.0) */}
          {[0, 90, 180, 270].map((a, k) => {
            const q = prog(t, 3.3 + k * 0.18, 3.8 + k * 0.18, easeOut) * (1 - prog(t, 5.3, 5.9));
            return q > 0 ? (
              <div key={a} style={{position: 'absolute', left: -40, top: -260 - 420 * q, width: 80, height: 420 * q, transformOrigin: `40px ${260 + 420 * q}px`, transform: `rotateZ(${a}deg) translateZ(4px)`}}>
                <div style={{position: 'absolute', left: 10, top: 40, width: 60, bottom: 0, background: DIRS[[0, 3, 1, 2][k]].c, borderRadius: 30}} />
                <div style={{position: 'absolute', left: -20, top: 0, width: 0, height: 0, borderLeft: '60px solid transparent', borderRight: '60px solid transparent', borderBottom: `80px solid ${DIRS[[0, 3, 1, 2][k]].c}`}} />
              </div>
            ) : null;
          })}

          {/* ── 1 · DEVANT ── */}
          <G g={0}>
          <Flat x={0} y={-640} w={60} h={1000} z={4} style={{opacity: prog(t, 11.2, 11.6), background: `repeating-linear-gradient(0deg, ${AMBER} 0 50px, transparent 50px 100px)`, backgroundPositionY: `${t * 220}px`, borderRadius: 30, clipPath: `inset(${(1 - prog(t, 11.2, 12.0)) * 100}% 0 0 0)`}} />
          {t > 7.2 && <><Shadow x={160} y={fk} r={170} /><Bb x={160} y={fk} w={300} h={330}><Forklift w={300} /></Bb></>}
          <Ring x={160} y={-720} at={8.2} r={190} />
          {t > 9.1 && <><Shadow x={-300} y={-560} r={110} /><Bb x={-300} y={-560} w={200} h={200}><F n="colis" size={200 * spring(t, 9.1)} /></Bb></>}
          <Ring x={-300} y={-560} at={9.3} />
          {t > 9.5 && <Bb x={-180} y={-980} w={240} h={240}><F n="barriere" size={240 * spring(t, 9.5)} /></Bb>}
          {t > 10.2 && <Bb x={330} y={-1150} w={200} h={200}><F n="danger" size={200 * spring(t, 10.2)} /></Bb>}
          <Ring x={330} y={-1150} at={10.4} />

          </G>
          {/* ── 2 · DERRIÈRE ── */}
          <G g={1}>
          {t > 14.4 && <><Shadow x={180} y={truck} r={220} /><Bb x={180} y={truck} w={380} h={380}><div style={{position: 'relative'}}><F n="camion" size={380} />{t > 16.8 && t < 20.2 && <div style={{position: 'absolute', left: 150, top: 20, width: 80, height: 80}}><F n="gyrophare" size={80} /></div>}</div></Bb></>}
          {t > 16.8 && t < 20.4 && [0, 1, 2].map((k) => {
            const q = ((t - 16.8) * 1.6 + k / 3) % 1;
            return <Bb key={k} x={180} y={truck - 60} z={200} w={400} h={200}><div style={{width: 160 + q * 300, height: 80 + q * 150, borderRadius: '50%', border: `10px solid ${RED}`, borderBottomColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', opacity: 1 - q}} /></Bb>;
          })}
          {t > 16.8 && t < 20.2 && <Bb x={180} y={truck} z={360} w={300} h={120}><div style={{background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 56, padding: '4px 22px', borderRadius: 18, opacity: Math.floor(t * 4) % 2 ? 1 : 0.35}}>BIP · BIP</div></Bb>}
          <Ring x={180} y={760} at={15.5} r={220} />
          {t > 17.7 && (
            <>
              {[0, 1, 2, 3, 4].map((k) => k / 5 < walker && <Flat key={k} x={-760 + k * 120} y={950 - k * 110} w={60} h={60} z={3} style={{opacity: 0.5}}><F n="pas" size={60} /></Flat>)}
              <Bb x={-760 + walker * 520} y={950 - walker * 470} w={240} h={240}><F n="salarie" size={240} /></Bb>
            </>
          )}
          <Ring x={-240} y={480} at={19.2} />
          {/* arc « dans votre dos » */}
          {t > 19.2 && t < 20.6 && <Flat x={0} y={0} w={560} h={560} z={5} style={{borderRadius: '50%', border: `16px solid ${RED}`, borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', opacity: Math.floor(t * 6) % 2 ? 1 : 0.4}} />}

          </G>
          {/* ── 3 · GAUCHE ── */}
          <G g={2}>
          {t > 23.3 && <><Shadow x={cart} y={-260} r={130} /><Bb x={cart} y={-260} w={230} h={230}><F n="chariot" size={230} /></Bb></>}
          <Ring x={-640} y={-260} at={24.0} />
          {t > 23.8 && <><Shadow x={-860} y={260} r={150} /><Bb x={-860} y={260} w={240} h={270}><Forklift w={240} color="#3DB7FF" /></Bb></>}
          {t > 24.6 && [0, 1, 2].map((k) => <Bb key={k} x={-520 + (k === 2 ? 40 : k * 90 - 40)} y={330} z={k === 2 ? 150 : 0} w={160} h={160}><F n="colis" size={160 * spring(t, 24.6 + k * 0.15)} /></Bb>)}
          <Ring x={-480} y={330} at={25.0} r={160} />
          {t > 25.6 && <Bb x={-400} y={-620} w={180} h={180}><F n="brique" size={180 * spring(t, 25.6)} /></Bb>}
          <Ring x={-400} y={-620} at={25.8} />
          {t > 27.2 && t < 28.4 && <Bb x={-560} y={20} z={60} w={300} h={300}><F n="collision" size={300 * spring(t, 27.2)} /></Bb>}

          </G>
          {/* ── 4 · DROITE ── */}
          <G g={3}>
          {/* zone de circulation */}
          <Flat x={900} y={430} w={1100} h={260} z={2} style={{opacity: prog(t, 32.6, 33.2), clipPath: `inset(0 ${(1 - prog(t, 32.6, 33.6)) * 100}% 0 0)`, borderTop: '16px solid #F2C200', borderBottom: '16px solid #F2C200', background: `repeating-linear-gradient(90deg, rgba(242,194,0,0.55) 0 40px, transparent 40px 120px)`, backgroundPositionX: `${-t * 160}px`}} />
          {t > 31.3 && (
            <>
              <Shadow x={760} y={-160} r={260} />
              <Bb x={760} y={-160} w={420} h={340}>
                <div style={{position: 'relative', width: 400, height: 300 * spring(t, 31.4), borderRadius: 26, background: 'linear-gradient(180deg, #6A7385, #3E4555)', border: '8px solid #2B303B', overflow: 'hidden'}}>
                  <div style={{position: 'absolute', left: 30, top: 40, transform: `rotate(${t * 120}deg)`}}><F n="engrenage" size={150} /></div>
                  <div style={{position: 'absolute', left: 180, top: 120, transform: `rotate(${-t * 160}deg)`}}><F n="engrenage" size={110} /></div>
                  <div style={{position: 'absolute', right: 20, top: 20, width: 50, height: 50, borderRadius: 25, background: Math.floor(t * 3) % 2 ? GREEN : '#1E8B55'}} />
                </div>
              </Bb>
            </>
          )}
          {t > 34.4 && <Flat x={760} y={-200} w={760} h={760} z={3} style={{borderRadius: '50%', border: `12px dashed ${RED}`, opacity: 0.4 + 0.5 * Math.abs(Math.sin(t * 4)), transform: `translateZ(3px) rotate(${t * 20}deg) scale(${pop(t, 34.4, 0.5)})`}} />}
          {t > 34.4 && <Bb x={980} y={-520} w={180} h={180}><F n="danger" size={180 * spring(t, 34.4)} /></Bb>}
          <Ring x={760} y={-160} at={31.8} r={240} />
          <Ring x={700} y={430} at={33.2} r={150} />

          </G>
          {/* ── 5 · AU-DESSUS ── */}
          <G g={4}>
          {t > 37.3 && <Bb x={-120} y={-760} w={760} h={760}><F n="grue2" size={760 * spring(t, 37.4)} /></Bb>}
          {t > 38.4 && cam.tilt > 30 && (
            <>
              <Flat x={0} y={-40} w={360 * (0.6 + 0.4 * prog(t, 41.1, 42))} h={260 * (0.6 + 0.4 * prog(t, 41.1, 42))} style={{borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(20,20,20,0.55), transparent 70%)', transform: `translateZ(2px) translateX(${swing * 6}px)`}} />
              <Bb x={0} y={-40} z={loadZ + 1200 * (1 - prog(t, 38.4, 39.4, easeOut))} w={300} h={1170}>
                <div style={{transformOrigin: '50% 0', transform: `rotate(${swing * 0.4}deg)`, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <div style={{width: 8, height: 900, background: '#2B2F38'}} />
                  <div style={{width: 0, height: 0, borderLeft: '50px solid transparent', borderRight: '50px solid transparent', borderBottom: '50px solid #2B2F38'}} />
                  <div style={{marginTop: -6}}><F n="colis" size={220} /></div>
                </div>
              </Bb>
            </>
          )}
          <Ring x={0} y={-40} at={41.1} r={210} />
          {[[40.0, -330, 60, 'outils'], [40.35, 300, -60, 'boulon'], [40.7, -120, 260, 'brique']].map(([at, x, y, n]) => t > (at as number) && (
            <React.Fragment key={n as string}>
              <Shadow x={x as number} y={y as number} r={60 + (1 - fall(at as number) / 1150) * 50} o={0.5} />
              <Bb x={x as number} y={y as number} z={fall(at as number)} w={130} h={130}><div style={{transform: `rotate(${(t - (at as number)) * 300}deg)`}}><F n={n as string} size={110} /></div></Bb>
            </React.Fragment>
          ))}
          {t > 42.5 && (
            <>
              <Bb x={520} y={-240} w={260} h={560}><div style={{height: 560 * spring(t, 42.6), overflow: 'hidden', display: 'flex', alignItems: 'flex-end'}}><F n="echelle" size={520} /></div></Bb>
              <Bb x={520} y={-240} z={430} w={200} h={200}><F n="intervenant" size={200 * spring(t, 42.9)} /></Bb>
            </>
          )}
          <Ring x={520} y={-240} at={43.0} r={170} />

          </G>
          {/* ── 6 · AU-DESSOUS ── */}
          <G g={5}>
          {/* trou avec niveau inférieur */}
          {t > 46.1 && (
            <Flat x={-300} y={170} w={300 * pop(t, 46.2, 0.5)} h={300 * pop(t, 46.2, 0.5)} z={2} style={{background: '#1A1612', border: `14px solid ${AMBER}`, borderRadius: 18, overflow: 'hidden', boxShadow: 'inset 0 0 60px #000'}}>
              {[0, 1, 2, 3].map((k) => <div key={k} style={{position: 'absolute', inset: 22 + k * 28 * (0.4 + deep), border: `4px solid rgba(255,178,30,${0.5 - k * 0.1})`, borderRadius: 10}} />)}
              {deep > 0 && <div style={{position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%, -50%) scale(${0.3 + deep * 0.3})`, opacity: deep}}><F n="echelle" size={160} /></div>}
            </Flat>
          )}
          <Ring x={-300} y={170} at={46.5} r={210} />
          {/* trappe à charnière */}
          {t > 47.2 && (
            <>
              <Flat x={300} y={150} w={260} h={260} z={1} style={{background: '#14110E', boxShadow: 'inset 0 0 50px #000'}} />
              <div style={{position: 'absolute', left: 300 - 130, top: 150 - 130, width: 260, height: 260, transformOrigin: '50% 0', transform: `translateZ(2px) rotateX(${-lid * 110}deg)`, background: 'repeating-linear-gradient(45deg, #7C8494 0 18px, #5D6474 18px 36px)', border: '8px solid #3C4250', boxSizing: 'border-box'}} />
            </>
          )}
          <Ring x={300} y={150} at={47.8} r={200} />
          {/* sol instable : fissures */}
          <Flat x={0} y={420} w={560} h={300} z={3}>
            <svg width={560} height={300} viewBox="0 0 560 300">
              {['M20 150 L120 130 L180 170 L260 120 L340 160 L420 110 L540 140', 'M180 170 L200 240 L170 290', 'M340 160 L370 60 L350 10', 'M420 110 L470 220'].map((d, k) => (
                <path key={k} d={d} fill="none" stroke="#2A221A" strokeWidth={k ? 7 : 11} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${Math.max(0, Math.min(1, crack * 1.4 - k * 0.15))} 1`} />
              ))}
            </svg>
          </Flat>
          <Ring x={0} y={420} at={48.8} r={230} />

          </G>
          {/* ── ATTENTION : rubalise circulaire + barrières ── */}
          {tape > 0 && (
            <>
              <Flat x={0} y={0} w={1300} h={1300} z={4} style={{borderRadius: '50%', border: '28px solid transparent', background: `repeating-conic-gradient(${RED} 0 6deg, #fff 6deg 12deg) border-box`, WebkitMask: 'linear-gradient(#000 0 0) padding-box exclude, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', clipPath: `polygon(50% 50%, 50% -50%, ${tape > 0.25 ? '150% -50%' : `${50 + tape * 400}% -50%`}, ${tape > 0.5 ? '150% 150%' : tape > 0.25 ? `150% ${-50 + (tape - 0.25) * 800}%` : '150% -50%'}, ${tape > 0.75 ? '-50% 150%' : tape > 0.5 ? `${150 - (tape - 0.5) * 800}% 150%` : '150% 150%'}, ${tape >= 1 ? '-50% -50%' : tape > 0.75 ? `-50% ${150 - (tape - 0.75) * 800}%` : '-50% 150%'}, ${tape >= 1 ? '50% -50%' : '-50% -50%'})`}} />
              {Array.from({length: 8}, (_, k) => {
                const a = (k / 8) * Math.PI * 2;
                return <Bb key={k} x={Math.sin(a) * 650} y={-Math.cos(a) * 650} w={200} h={200}><F n="barriere" size={200 * spring(t, 65.4 + k * 0.14)} /></Bb>;
              })}
            </>
          )}

          {/* ── l'opérateur ── */}
          <Shadow x={0} y={0} r={150} o={0.45} />
          <Bb x={0} y={0} w={300} h={300} style={{opacity: workerOp}}>
            <div style={{position: 'relative'}}>
              <F n="ouvrier-dark" size={300} />
              {t > 60.4 && t < 63.4 && <div style={{position: 'absolute', left: 60, top: -150, width: 180, height: 140}}><F n="yeux" size={140} /></div>}
            </div>
          </Bb>
          {/* flèches verticales (crochet) */}
          {[1, -1].map((d) => {
            const q = prog(t, 4.1 + (d < 0 ? 0.2 : 0), 4.6 + (d < 0 ? 0.2 : 0), easeOut) * (1 - prog(t, 5.3, 5.9));
            return q > 0 ? (
              <Bb key={d} x={0} y={d > 0 ? 0 : 6} z={d > 0 ? 330 : -10} w={100} h={260}>
                <div style={{transform: `scaleY(${q * d})`, transformOrigin: '50% 100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <div style={{width: 0, height: 0, borderLeft: '50px solid transparent', borderRight: '50px solid transparent', borderBottom: `70px solid ${d > 0 ? DIRS[4].c : DIRS[5].c}`}} />
                  <div style={{width: 44, height: 180, background: d > 0 ? DIRS[4].c : DIRS[5].c, borderRadius: 22}} />
                </div>
              </Bb>
            ) : null;
          })}
        </div>
      </AbsoluteFill>
    </CamCtx.Provider>
  );
};

/* ─────────── Viseur / HUD ─────────── */
const CUBE = 130;
const CubeHud: React.FC = () => {
  const t = useT();
  // [t, rotX, rotY]
  const K: number[][] = [[5.0, -20, 30], [5.8, 0, 0], [12.4, 0, 0], [13.2, 0, 180], [20.2, 0, 180], [21.0, 0, 270], [28.4, 0, 270], [29.2, 0, 450], [36.0, 0, 450], [36.8, -90, 360], [43.8, -90, 360], [44.6, 90, 360], [51.8, 90, 360], [53, -25, 400], [59.6, -25, 760]];
  const rx = kf(t, K.map((k) => k[0]), K.map((k) => k[1]));
  const ry = kf(t, K.map((k) => k[0]), K.map((k) => k[2]));
  const faces: [string, string, string][] = [
    ['DEVANT', `translateZ(${CUBE / 2}px)`, DIRS[0].c],
    ['DERRIÈRE', `rotateY(180deg) translateZ(${CUBE / 2}px)`, DIRS[1].c],
    ['GAUCHE', `rotateY(90deg) translateZ(${CUBE / 2}px)`, DIRS[2].c],
    ['DROITE', `rotateY(-90deg) translateZ(${CUBE / 2}px)`, DIRS[3].c],
    ['DESSUS', `rotateX(90deg) translateZ(${CUBE / 2}px)`, DIRS[4].c],
    ['DESSOUS', `rotateX(-90deg) translateZ(${CUBE / 2}px)`, DIRS[5].c],
  ];
  const o = prog(t, 5.0, 5.6) * (1 - prog(t, 59.6, 60.2));
  if (o <= 0) return null;
  return (
    <div style={{position: 'absolute', right: 70, top: 230, width: CUBE, height: CUBE, perspective: 600, opacity: o, zIndex: 50}}>
      <div style={{width: CUBE, height: CUBE, position: 'relative', transformStyle: 'preserve-3d', transform: `rotateX(${rx}deg) rotateY(${-ry}deg)`}}>
        {faces.map(([l, tr, c]) => (
          <div key={l} style={{position: 'absolute', inset: 0, transform: tr, background: `${c}EE`, border: '4px solid rgba(255,255,255,0.85)', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 20, color: '#14181F', borderRadius: 14}}>{l}</div>
        ))}
      </div>
    </div>
  );
};

const ARROW: Record<number, string> = {1: 'M50 90 V20 M20 45 L50 15 L80 45', 2: 'M50 10 V80 M20 55 L50 85 L80 55', 3: 'M90 50 H20 M45 20 L15 50 L45 80', 4: 'M10 50 H80 M55 20 L85 50 L55 80', 5: 'M20 12 H80 M50 92 V30 M25 52 L50 27 L75 52', 6: 'M20 88 H80 M50 8 V70 M25 48 L50 73 L75 48'};
const Hud: React.FC = () => {
  const t = useT();
  const d = DIRS.find((x) => t >= x.at - 0.1 && t < x.until);
  const rec = t < ATT ? 1 : 0;
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 620, background: 'linear-gradient(180deg, rgba(10,14,20,0.92) 0%, rgba(10,14,20,0.75) 55%, transparent 100%)'}} />
      {/* coins de viseur */}
      {[[50, 360, 0], [1030, 360, 90], [1030, 1620, 180], [50, 1620, 270]].map(([x, y, r], k) => (
        <div key={k} style={{position: 'absolute', left: x - 6, top: y - 6, width: 70, height: 70, borderLeft: '6px solid rgba(255,255,255,0.7)', borderTop: '6px solid rgba(255,255,255,0.7)', transformOrigin: '6px 6px', transform: `rotate(${r}deg)`, opacity: prog(t, 0.6, 1.2)}} />
      ))}
      {rec > 0 && <div style={{position: 'absolute', left: 80, top: 1560, display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'monospace', fontWeight: 700, fontSize: 28, color: '#fff', opacity: prog(t, 1.2, 1.6)}}><div style={{width: 20, height: 20, borderRadius: 10, background: RED, opacity: Math.floor(t * 2) % 2 ? 1 : 0.3}} />SCAN 360°</div>}
      <div style={{position: 'absolute', left: '50%', top: 95, transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.95)', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {/* titre du crochet */}
      {t < 5.4 && (
        <div style={{position: 'absolute', left: 60, right: 60, top: 250, textAlign: 'center', opacity: pop(t, 1.8) * (1 - prog(t, 5.0, 5.4))}}>
          <T size={48} color="rgba(244,241,234,0.75)" style={{textAlign: 'center'}}>La sécurité dans les</T>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 18}}>
            <T size={170} color={AMBER} style={{transform: `scale(${spring(t, 3.2)})`}}>6</T>
            <T size={96}>directions</T>
          </div>
        </div>
      )}
      {/* bandeau de direction */}
      {d && (() => {
        const q = pop(t, d.at - 0.1, 0.5);
        const out = prog(t, d.until - 0.35, d.until);
        return (
          <div style={{position: 'absolute', left: 50, top: 225, display: 'flex', alignItems: 'center', gap: 22, transform: `translateX(${(1 - q) * -600 + out * -600}px)`}}>
            <div style={{width: 150, height: 150, borderRadius: 34, background: d.c, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 40px ${d.c}88`}}>
              <svg width={110} height={110} viewBox="0 0 100 100"><path d={ARROW[d.n]} fill="none" stroke="#14181F" strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${prog(t, d.at, d.at + 0.6)} 1`} /></svg>
            </div>
            <div>
              <T size={30} color="rgba(244,241,234,0.7)">Direction {d.n}/6</T>
              <T size={82} color="#fff" style={{textShadow: '0 4px 20px rgba(0,0,0,0.5)'}}>{d.l}</T>
            </div>
          </div>
        );
      })()}
      {/* synthèse : 6 directions cochées */}
      {t >= SYN && t < ATT && (
        <div style={{position: 'absolute', left: 50, right: 50, top: 235, opacity: pop(t, SYN) * (1 - prog(t, ATT - 0.4, ATT))}}>
          <T size={48} style={{textAlign: 'center'}}>Avant toute activité</T>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 16}}>
            {DIRS.map((x, k) => {
              const q = pop(t, 54.2 + k * 0.25, 0.35);
              return (
                <div key={x.n} style={{display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 18, background: 'rgba(20,26,36,0.85)', border: `4px solid ${x.c}`, transform: `scale(${q})`}}>
                  <Check p={prog(t, 54.4 + k * 0.25, 54.8 + k * 0.25)} size={34} color={x.c} />
                  <T size={26} color="#fff">{x.l}</T>
                </div>
              );
            })}
          </div>
          <div style={{display: 'flex', justifyContent: 'center', gap: 14, marginTop: 16}}>
            {[['Identifier', 56.4, RED], ['Prévenir', 57.6, GREEN]].map(([l, at, c]) => <div key={l as string} style={{padding: '8px 24px', borderRadius: 40, background: c as string, transform: `scale(${spring(t, at as number)})`}}><T size={34} color="#fff">{l}</T></div>)}
          </div>
        </div>
      )}
      {/* attention */}
      {t >= ATT && t < FIN && (
        <div style={{position: 'absolute', left: 50, right: 50, top: 230, opacity: pop(t, ATT) * (1 - prog(t, FIN - 0.4, FIN))}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, transform: `scale(${spring(t, ATT)})`}}>
            <div style={{background: RED, borderRadius: 20, padding: '8px 22px'}}><T size={58} color="#fff">Attention</T></div>
          </div>
          <div style={{marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, opacity: pop(t, 61.4)}}>
            <div style={{position: 'relative'}}><F n="yeux" size={90} /><div style={{position: 'absolute', left: -10, top: 40, width: 110 * prog(t, 62.4, 62.8), height: 12, background: RED, borderRadius: 6, transform: 'rotate(-30deg)', transformOrigin: '0 50%'}} /></div>
            <T size={44}>Observer ne suffit pas toujours</T>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18, alignItems: 'center'}}>
            {[['Respecter les procédures', 64.0], ['Sécuriser la zone', 66.2], ['Avant toute intervention dangereuse', 67.4]].map(([l, at]) => (
              <div key={l as string} style={{display: 'flex', alignItems: 'center', gap: 12, padding: '8px 22px', borderRadius: 40, background: 'rgba(20,26,36,0.88)', opacity: pop(t, at as number), transform: `translateY(${(1 - pop(t, at as number)) * 30}px)`}}>
                <Check p={prog(t, (at as number) + 0.1, (at as number) + 0.5)} size={38} color={GREEN} />
                <T size={34} color="#fff">{l}</T>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* message final */}
      {t >= FIN && t < OUTRO_AT && (
        <div style={{position: 'absolute', left: 50, right: 50, top: 250, textAlign: 'center', opacity: pop(t, FIN)}}>
          <T size={44} color="rgba(244,241,234,0.85)" style={{textAlign: 'center'}}>La prévention commence par la</T>
          <T size={120} color={AMBER} style={{textAlign: 'center', transform: `scale(${spring(t, 70.0)})`}}>vigilance</T>
        </div>
      )}
    </AbsoluteFill>
  );
};

/** Bouton « S'abonner » cliqué + cloche (71.3 → 75.9). */
const Subscribe: React.FC = () => {
  const t = useT();
  const q = pop(t, SUB, 0.5);
  const clicked = t > 72.4;
  const cur = kf(t, [SUB + 0.2, 72.3], [1, 0], easeInOut);
  const press = t > 72.3 && t < 72.55 ? 0.92 : 1;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1290, display: 'flex', justifyContent: 'center', zIndex: 45, opacity: q, transform: `translateY(${(1 - q) * 80}px)`}}>
      <div style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 20}}>
        <div style={{padding: '22px 46px', borderRadius: 60, background: clicked ? '#2B3240' : RED, transform: `scale(${press})`, boxShadow: '0 20px 50px rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', gap: 14}}>
          {clicked && <Check p={prog(t, 72.4, 72.8)} size={46} color="#fff" />}
          <T size={50} color="#fff">{clicked ? 'Abonné' : "S'abonner"}</T>
        </div>
        <div style={{transformOrigin: '50% 10%', transform: `rotate(${t > 72.8 ? Math.sin((t - 72.8) * 18) * 22 * Math.exp(-(t - 72.8) * 1.6) : 0}deg) scale(${pop(t, 72.7, 0.4)})`}}><F n="cloche" size={110} /></div>
        <div style={{position: 'absolute', left: 170 + cur * 260, top: 60 + cur * 260, fontSize: 0, opacity: t < 73.2 ? 1 : 1 - prog(t, 73.2, 73.6)}}>
          <svg width={70} height={70} viewBox="0 0 24 24"><path d="M4 2 L4 19 L8.5 15 L11.5 22 L14 21 L11 14 L17 14 Z" fill="#fff" stroke="#14181F" strokeWidth={1.4} strokeLinejoin="round" /></svg>
        </div>
      </div>
    </div>
  );
};

/** Paupières : ouverture au début, clignement sur « vigilance ». */
const Eyelids: React.FC = () => {
  const t = useT();
  const open = prog(t, 0.15, 1.4, easeInOut);
  const blink = t > 70.55 && t < 71.15 ? Math.sin(((t - 70.55) / 0.6) * Math.PI) : 0;
  const c = Math.max(1 - open, blink);
  if (c <= 0.001) return null;
  return (
    <AbsoluteFill style={{zIndex: 70, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: -200, right: -200, top: -1100 + c * 1100 + 960 - 960, height: 1100, background: '#07090C', borderRadius: '0 0 50% 50%'}} />
      <div style={{position: 'absolute', left: -200, right: -200, bottom: -1100 + c * 1100, height: 1100, background: '#07090C', borderRadius: '50% 50% 0 0'}} />
    </AbsoluteFill>
  );
};

/** Flash « Attention » et vignette. */
const Grade: React.FC = () => {
  const t = useT();
  const flash = t > ATT && t < ATT + 0.5 ? 1 - (t - ATT) / 0.5 : 0;
  return (
    <AbsoluteFill style={{pointerEvents: 'none', zIndex: 60}}>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 55%, transparent 50%, rgba(0,0,0,0.6) 100%)'}} />
      {flash > 0 && <AbsoluteFill style={{background: RED, opacity: flash * 0.35, mixBlendMode: 'screen'}} />}
    </AbsoluteFill>
  );
};

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const CUES: Sfx[] = [
  {at: 0.1, s: 'riser', v: 0.3, dur: 1.6},
  {at: 1.4, s: 'soft-whoosh', v: 0.5, dur: 2},
  {at: 3.2, s: 'bass-hit', v: 0.5},
  ...[0, 1, 2, 3, 4, 5].map((k) => ({at: 3.3 + k * 0.2, s: 'sfx/pop', v: 0.3})),
  ...DIRS.map((d) => ({at: d.at - 0.3, s: 'soft-whoosh', v: 0.55, dur: 1.8})),
  ...DIRS.map((d) => ({at: d.at + 0.1, s: 'sfx/ding', v: 0.3})),
  {at: 7.3, s: 'sfx/whoosh', v: 0.35},
  {at: 9.1, s: 'sfx/pop', v: 0.35}, {at: 9.5, s: 'sfx/thud', v: 0.35}, {at: 10.2, s: 'sfx/pop', v: 0.35},
  {at: 11.2, s: 'sfx/swish', v: 0.35},
  {at: 14.5, s: 'sfx/whoosh', v: 0.35},
  ...Array.from({length: 8}, (_, k) => ({at: 16.8 + k * 0.42, s: 'tick', v: 0.32})),
  {at: 17.8, s: 'sfx/swish', v: 0.28},
  {at: 19.2, s: 'sfx/bell', v: 0.3},
  {at: 23.4, s: 'sfx/whoosh', v: 0.35}, {at: 24.6, s: 'sfx/pop', v: 0.3}, {at: 24.75, s: 'sfx/pop', v: 0.3}, {at: 24.9, s: 'sfx/pop', v: 0.3}, {at: 25.6, s: 'sfx/thud', v: 0.35},
  {at: 27.2, s: 'deep-hit', v: 0.5},
  {at: 31.4, s: 'sfx/pop', v: 0.35}, {at: 32.6, s: 'sfx/swish', v: 0.35}, {at: 34.4, s: 'sfx/bell', v: 0.3},
  {at: 37.4, s: 'sfx/rise', v: 0.3}, {at: 38.4, s: 'sfx/swish', v: 0.28},
  {at: 40.4, s: 'sfx/thud', v: 0.4}, {at: 40.75, s: 'sfx/thud', v: 0.35}, {at: 41.1, s: 'sfx/thud', v: 0.35},
  {at: 42.6, s: 'sfx/pop', v: 0.32},
  {at: 46.2, s: 'sfx/pop', v: 0.32}, {at: 47.3, s: 'page', v: 0.5}, {at: 48.2, s: 'deep-hit', v: 0.3}, {at: 49.8, s: 'sfx/whoosh', v: 0.3},
  {at: 52.4, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...DIRS.map((_, k) => ({at: 54.4 + k * 0.25, s: 'validation', v: 0.25})),
  {at: 56.4, s: 'sfx/pop', v: 0.35}, {at: 57.6, s: 'validation', v: 0.4},
  {at: ATT, s: 'deep-hit', v: 0.6}, {at: ATT + 0.05, s: 'tension', v: 0.25, dur: 2.5},
  {at: 62.4, s: 'sfx/swish', v: 0.35},
  {at: 64.0, s: 'validation', v: 0.32}, {at: 66.2, s: 'validation', v: 0.32}, {at: 67.4, s: 'validation', v: 0.32},
  ...Array.from({length: 8}, (_, k) => ({at: 65.4 + k * 0.14, s: 'sfx/click', v: 0.3})),
  {at: FIN, s: 'soft-whoosh', v: 0.5, dur: 2}, {at: 70.0, s: 'bass-hit', v: 0.45}, {at: 70.6, s: 'sfx/swish', v: 0.3},
  {at: SUB, s: 'sfx/whoosh', v: 0.3}, {at: 72.35, s: 'sfx/click', v: 0.5}, {at: 72.8, s: 'notification', v: 0.45},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const SixDirections: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 35%, #2A3445 0%, #121821 65%)'}} />
    <Gate from={0} to={OUTRO_AT}><World /></Gate>
    <Gate from={0} to={OUTRO_AT}><CubeHud /></Gate>
    <Gate from={0} to={OUTRO_AT}><Hud /></Gate>
    <Gate from={SUB} to={OUTRO_AT}><Subscribe /></Gate>
    <Gate from={0} to={OUTRO_AT}><Grade /></Gate>
    <Gate from={0} to={OUTRO_AT}><Eyelids /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-six-directions-origine.m4a')} trimAfter={s(76.0)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

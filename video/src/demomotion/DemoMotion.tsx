import React from 'react';
import {AbsoluteFill, Audio, Img, interpolate, random, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {geoMercator, geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import world from 'world-atlas/countries-50m.json';
import {easeIn, easeInOut, easeOut, prog} from '../anim';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {s, sansFont} from '../theme';

/**
 * Bande démo motion design (≈ 44 s) sur le thème du permis de feu : 6 techniques jamais utilisées dans les capsules
 * précédentes — distorsion de chaleur (filtre SVG turbulence + déplacement), étincelles simulées (vitesse, gravité,
 * rebond), casque 3D temps réel en vue éclatée (Three.js), carte réelle de la Côte d'Ivoire (world-atlas + d3-geo),
 * transition en verre brisé (éclats découpés de la scène figée) et morphing de formes danger → coche.
 */
const NAVY = '#082B66';
const GREEN = '#22B573';
const ORANGE = '#F47D00';
const NIGHT = '#0A0E18';
const END = 44;
export const DEMOMOTION_FRAMES = s(END);

/* Temps local surchargeable : permet de figer une scène pour la briser en éclats. */
const TimeCtx = React.createContext<number | null>(null);
const useTime = () => {
  const f = useCurrentFrame();
  const o = React.useContext(TimeCtx);
  return o ?? f / 30;
};
const rise = (t: number, at: number, d = 0.5) => prog(t, at, at + d, easeOut);

/* ---------- Étiquette de technique ---------- */
const Tag: React.FC<{at: number; until: number; n: number; title: string; sub: string; light?: boolean}> = ({at, until, n, title, sub, light}) => {
  const t = useTime();
  if (t < at || t > until) return null;
  const p = rise(t, at + 0.3) * (1 - prog(t, until - 0.3, until, easeIn));
  const c = light ? NAVY : '#fff';
  return (
    <div style={{position: 'absolute', left: 70, top: 120, opacity: p, transform: `translateY(${(1 - p) * -20}px)`}}>
      <div style={{display: 'inline-flex', alignItems: 'center', gap: 14, background: light ? NAVY : 'rgba(255,255,255,0.12)', border: light ? 'none' : '2px solid rgba(255,255,255,0.25)', borderRadius: 999, padding: '10px 26px 10px 12px'}}>
        <span style={{width: 46, height: 46, borderRadius: '50%', background: GREEN, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26}}>{n}</span>
        <span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 26, letterSpacing: 4, color: '#fff'}}>TECHNIQUE {n} / 6</span>
      </div>
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: c, marginTop: 22, lineHeight: 1.05}}>{title}</div>
      <div style={{fontFamily: sansFont, fontWeight: 600, fontSize: 32, color: light ? '#5A5A5A' : 'rgba(255,255,255,0.7)', marginTop: 10}}>{sub}</div>
    </div>
  );
};

/* ---------- 1. Distorsion de chaleur ---------- */
const Embers: React.FC<{n?: number}> = ({n = 70}) => {
  const t = useTime();
  return (
    <>
      {Array.from({length: n}, (_, i) => {
        const life = 3 + random(`el${i}`) * 3;
        const age = (t + random(`eo${i}`) * life) % life;
        const x = 100 + random(`ex${i}`) * 880 + Math.sin(age * 2 + i) * 30;
        const y = 1900 - age * (220 + random(`ev${i}`) * 200);
        const a = Math.sin((age / life) * Math.PI);
        const r = 3 + random(`er${i}`) * 5;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: r, height: r, borderRadius: '50%', background: '#FFB347', opacity: a, boxShadow: `0 0 ${r * 4}px ${r}px rgba(255,140,40,0.8)`}} />;
      })}
    </>
  );
};

const HeatScene: React.FC = () => {
  const t = useTime();
  const f = Math.round(t * 30);
  const amp = 14 + Math.sin(t * 2) * 6;
  return (
    <AbsoluteFill style={{background: NIGHT, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 90% 45% at 50% 105%, rgba(244,125,0,0.85), rgba(200,40,10,0.35) 45%, transparent 75%)'}} />
      <svg width={0} height={0} style={{position: 'absolute'}}>
        <filter id="heat" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="turbulence" baseFrequency={`0.012 ${0.045 + Math.sin(t * 3) * 0.01}`} numOctaves={2} seed={f % 60} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={amp} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <Embers />
      <div style={{position: 'absolute', left: 0, right: 0, top: 760, textAlign: 'center', filter: 'url(#heat)', opacity: rise(t, 0.2, 0.8)}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 150, lineHeight: 0.95, color: '#fff', textShadow: '0 0 40px rgba(255,150,40,0.7)'}}>PERMIS</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 150, lineHeight: 0.95, color: ORANGE, textShadow: '0 0 60px rgba(255,90,0,0.9)'}}>DE FEU</div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1130, textAlign: 'center', fontFamily: sansFont, fontWeight: 700, fontSize: 38, letterSpacing: 8, color: 'rgba(255,255,255,0.75)', opacity: rise(t, 1.2)}}>BANDE DÉMO · MOTION DESIGN</div>
      <Tag at={1.6} until={6.6} n={1} title="Distorsion de chaleur" sub="filtre de turbulence recalculé à chaque image" />
    </AbsoluteFill>
  );
};

/* ---------- 2. Étincelles simulées ---------- */
const SPARK_ORIGIN = {x: 600, y: 1080};
const FLOOR = 1500;
const Sparks: React.FC<{n?: number}> = ({n = 260}) => {
  const t = useTime();
  const lines: React.ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    const life = 0.9 + random(`sl${i}`) * 0.7;
    const period = 1.6;
    const age = (t - 6.6 + random(`so${i}`) * period) % period;
    if (age < 0 || age > life) continue;
    const ang = (-160 + random(`sa${i}`) * 70) * (Math.PI / 180);
    const v = 900 + random(`sv${i}`) * 1100;
    let vx = Math.cos(ang) * v;
    let vy = Math.sin(ang) * v;
    const g = 2600;
    let x = SPARK_ORIGIN.x + vx * age;
    let y = SPARK_ORIGIN.y + vy * age + 0.5 * g * age * age;
    // rebond sur le sol (coefficient 0,35)
    const tHit = (-vy + Math.sqrt(vy * vy + 2 * g * (FLOOR - SPARK_ORIGIN.y))) / g;
    if (age > tHit) {
      const vyHit = vy + g * tHit;
      const a2 = age - tHit;
      const xh = SPARK_ORIGIN.x + vx * tHit;
      vx *= 0.6;
      vy = -vyHit * 0.35;
      x = xh + vx * a2;
      y = FLOOR + vy * a2 + 0.5 * g * a2 * a2;
      if (y > FLOOR) y = FLOOR;
    }
    const k = age / life;
    const curVy = vy + g * (age > tHit ? age - tHit : age);
    const len = 0.028;
    const col = k < 0.3 ? '#FFF6D8' : k < 0.6 ? '#FFC24A' : '#FF6A1A';
    lines.push(<line key={i} x1={x} y1={y} x2={x - vx * len} y2={y - curVy * len} stroke={col} strokeWidth={3.2 - k * 2} strokeLinecap="round" opacity={1 - k * 0.8} />);
  }
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, filter: 'drop-shadow(0 0 6px rgba(255,170,60,0.9))', mixBlendMode: 'screen'}}>
      {lines}
    </svg>
  );
};

const SparkScene: React.FC = () => {
  const t = useTime();
  const spin = t * 2400;
  const glow = 0.7 + Math.sin(t * 40) * 0.15;
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #121826 0%, #1B2233 60%, #0D111B 100%)', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: FLOOR, bottom: 0, background: 'linear-gradient(180deg, #2A2F3A, #12151C)'}} />
      {/* pièce métallique */}
      <div style={{position: 'absolute', left: 380, top: 1095, width: 640, height: 70, background: 'linear-gradient(180deg, #9AA3AC, #5B636C)', borderRadius: 6, boxShadow: '0 20px 30px rgba(0,0,0,0.5)'}} />
      {/* meuleuse */}
      <div style={{position: 'absolute', left: SPARK_ORIGIN.x - 10, top: SPARK_ORIGIN.y - 250}}>
        <svg width={400} height={400} viewBox="0 0 400 400" style={{position: 'absolute', left: -150, top: 20}}>
          <g transform={`rotate(${spin} 200 200)`}>
            <circle cx={200} cy={200} r={150} fill="#3A3F45" stroke="#22262B" strokeWidth={8} />
            {Array.from({length: 12}, (_, i) => (
              <line key={i} x1={200} y1={200} x2={200 + Math.cos((i * Math.PI) / 6) * 140} y2={200 + Math.sin((i * Math.PI) / 6) * 140} stroke="#555C64" strokeWidth={6} />
            ))}
            <circle cx={200} cy={200} r={36} fill="#9AA3AC" />
          </g>
        </svg>
        <div style={{position: 'absolute', left: 30, top: -120, width: 420, height: 120, borderRadius: 60, background: 'linear-gradient(180deg, #2E7D32, #1B5E20)', transform: 'rotate(-12deg)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)'}} />
      </div>
      <div style={{position: 'absolute', left: SPARK_ORIGIN.x - 120, top: SPARK_ORIGIN.y - 120, width: 240, height: 240, borderRadius: '50%', background: `radial-gradient(circle, rgba(255,220,140,${glow}), transparent 70%)`, mixBlendMode: 'screen'}} />
      <Sparks />
      <Tag at={6.8} until={13.4} n={2} title="Étincelles simulées" sub="vitesse, gravité et rebond calculés par particule" />
      <div style={{position: 'absolute', left: 0, right: 0, top: 1640, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 40, color: '#fff', opacity: rise(t, 8.5)}}>
        Chaque point chaud se prépare <span style={{color: ORANGE}}>avant</span> l’étincelle.
      </div>
    </AbsoluteFill>
  );
};

/* ---------- 3. Casque 3D en vue éclatée ---------- */
const Helmet3D: React.FC = () => {
  const t = useTime();
  const local = t - 14;
  const ex = prog(local, 1.6, 3.2, easeInOut) * (1 - prog(local, 6.2, 7.4, easeInOut));
  const rotY = local * 0.75 - 0.6;
  const yellow = '#F2B705';
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} />
      <pointLight position={[-3, -1, 3]} intensity={18} color="#FF9A3C" />
      <group rotation={[0.28, rotY, 0]} position={[0, -0.75, 0]}>
        {/* coque */}
        <mesh position={[0, ex * 0.75, 0]}>
          <sphereGeometry args={[1, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={yellow} roughness={0.35} metalness={0.1} side={2} />
        </mesh>
        {/* arête de renfort */}
        <mesh position={[0, ex * 1.35, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.0, 0.07, 16, 64, Math.PI]} />
          <meshStandardMaterial color="#D99F00" roughness={0.3} />
        </mesh>
        {/* visière / bord */}
        <mesh position={[0, -ex * 0.2, ex * 0.6]}>
          <cylinderGeometry args={[1.22, 1.22, 0.05, 64, 1, false, -Math.PI / 2.4, Math.PI / 1.2]} />
          <meshStandardMaterial color={yellow} roughness={0.35} />
        </mesh>
        {/* coiffe (harnais intérieur) */}
        <group position={[0, -ex * 0.7, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.12, 0]}>
            <torusGeometry args={[0.82, 0.05, 12, 64]} />
            <meshStandardMaterial color="#4A5058" roughness={0.6} />
          </mesh>
          <mesh rotation={[0, 0, 0]} position={[0, 0.12, 0]}>
            <torusGeometry args={[0.72, 0.035, 12, 48, Math.PI]} />
            <meshStandardMaterial color="#6B7380" />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]} position={[0, 0.12, 0]}>
            <torusGeometry args={[0.72, 0.035, 12, 48, Math.PI]} />
            <meshStandardMaterial color="#6B7380" />
          </mesh>
        </group>
        {/* jugulaire */}
        <mesh position={[0, -0.45 - ex * 0.85, 0]} rotation={[0, Math.PI / 2, Math.PI]}>
          <torusGeometry args={[0.7, 0.04, 12, 48, Math.PI]} />
          <meshStandardMaterial color="#1E2329" />
        </mesh>
        {/* lampe frontale */}
        <mesh position={[0, 0.45 + ex * 0.5, 0.92 + ex * 0.9]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.14, 32]} />
          <meshStandardMaterial color="#C9D2DA" emissive="#FFF2C0" emissiveIntensity={0.8} metalness={0.6} roughness={0.2} />
        </mesh>
      </group>
    </>
  );
};

const HelmetScene: React.FC = () => {
  const t = useTime();
  const {width, height} = useVideoConfig();
  const local = t - 14;
  const labels = ['Coque', 'Arête de renfort', 'Visière', 'Coiffe intérieure', 'Jugulaire', 'Lampe frontale'];
  const show = prog(local, 2.6, 3.0) * (1 - prog(local, 6.0, 6.4));
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #1D2C4A, #0A0E18 75%)'}}>
      <ThreeCanvas width={width} height={height} camera={{position: [0, 0.4, 7.4], fov: 42}}>
        <Helmet3D />
      </ThreeCanvas>
      <div style={{position: 'absolute', left: 70, top: 1480, opacity: show, display: 'flex', flexWrap: 'wrap', gap: 14, width: 940}}>
        {labels.map((l, i) => (
          <span key={l} style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: '#fff', background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 999, padding: '10px 22px', opacity: prog(local, 2.6 + i * 0.12, 2.9 + i * 0.12)}}>
            {l}
          </span>
        ))}
      </div>
      <Tag at={14.2} until={21.8} n={3} title="3D temps réel" sub="casque modélisé en volumes, vue éclatée et orbite" />
    </AbsoluteFill>
  );
};

/* ---------- 4. Carte de Côte d'Ivoire ---------- */
type Geo = {type: string; coordinates: unknown};
const civ = (feature(world as never, (world as never as {objects: {countries: never}}).objects.countries) as unknown as {features: {id: string; geometry: Geo}[]}).features.find((f) => f.id === '384')!;
const proj = geoMercator().fitExtent(
  [
    [90, 560],
    [990, 1460],
  ],
  civ as never,
);
const CIV_PATH = geoPath(proj)(civ as never) ?? '';
const CITIES: [string, number, number, number][] = [
  ['Abidjan', -4.008, 5.36, 24.4],
  ['Yamoussoukro', -5.276, 6.827, 25.0],
  ['Bouaké', -5.03, 7.69, 25.4],
  ['San-Pédro', -6.636, 4.748, 25.8],
  ['Korhogo', -5.629, 9.458, 26.2],
];
const MapScene: React.FC = () => {
  const t = useTime();
  const draw = prog(t, 22.3, 24.0, easeInOut);
  const fill = prog(t, 23.6, 24.4);
  const [ax, ay] = proj([-4.008, 5.36])!;
  const z = interpolate(t, [28.0, 29.6], [1, 1.9], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  return (
    <AbsoluteFill style={{background: '#F3F5F7', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${z})`, transformOrigin: `${ax}px ${ay}px`}}>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <path d={CIV_PATH} fill={`rgba(34,181,115,${fill * 0.18})`} stroke={NAVY} strokeWidth={5} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} strokeLinejoin="round" />
          {CITIES.slice(1).map(([n, lon, lat, at]) => {
            const [x, y] = proj([lon, lat])!;
            const p = prog(t, at + 0.4, at + 1.2, easeInOut);
            const mx = (x + ax) / 2 + (y - ay) * 0.25;
            const my = (y + ay) / 2 - Math.abs(x - ax) * 0.3 - 40;
            return <path key={n} d={`M${x},${y} Q${mx},${my} ${ax},${ay}`} fill="none" stroke={ORANGE} strokeWidth={4} strokeDasharray="1" pathLength={1} strokeDashoffset={1 - p} strokeLinecap="round" />;
          })}
        </svg>
        {CITIES.map(([n, lon, lat, at], i) => {
          const [x, y] = proj([lon, lat])!;
          if (t < at) return null;
          const drop = interpolate(t, [at, at + 0.35, at + 0.5], [-120, 8, 0], {extrapolateRight: 'clamp'});
          const pulse = ((t - at) % 1.4) / 1.4;
          const main = i === 0;
          return (
            <div key={n} style={{position: 'absolute', left: x, top: y}}>
              <div style={{position: 'absolute', left: -40 * (0.5 + pulse), top: -40 * (0.5 + pulse), width: 80 * (0.5 + pulse), height: 80 * (0.5 + pulse), borderRadius: '50%', border: `4px solid ${main ? GREEN : NAVY}`, opacity: 1 - pulse}} />
              <div style={{position: 'absolute', left: -14, top: -14 + drop, width: 28, height: 28, borderRadius: '50%', background: main ? GREEN : NAVY, border: '5px solid #fff', boxShadow: '0 6px 12px rgba(0,0,0,0.25)'}} />
              <div style={{position: 'absolute', left: 24, top: -22 + drop, fontFamily: sansFont, fontWeight: 800, fontSize: main ? 36 : 28, color: NAVY, whiteSpace: 'nowrap', opacity: rise(t, at + 0.3, 0.3)}}>{n}</div>
            </div>
          );
        })}
      </div>
      <Tag at={22.2} until={29.8} n={4} title="Carte animée" sub="contour réel du pays (données géographiques ouvertes)" light />
      <div style={{position: 'absolute', left: 0, right: 0, top: 1620, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 40, color: NAVY, opacity: rise(t, 26.6) * (1 - prog(t, 29.4, 29.8))}}>
        Un même standard, <span style={{color: GREEN}}>sur chaque site</span>.
      </div>
    </AbsoluteFill>
  );
};

/* ---------- 5. Transition en verre brisé ---------- */
const SHARDS = (() => {
  const cols = 5;
  const rows = 8;
  const pts: [number, number][][] = [];
  for (let r = 0; r <= rows; r++) {
    const row: [number, number][] = [];
    for (let c = 0; c <= cols; c++) {
      const edge = r === 0 || c === 0 || r === rows || c === cols;
      const jx = edge && (c === 0 || c === cols) ? 0 : (random(`gx${r}${c}`) - 0.5) * 150;
      const jy = edge && (r === 0 || r === rows) ? 0 : (random(`gy${r}${c}`) - 0.5) * 150;
      row.push([(c / cols) * 1080 + jx, (r / rows) * 1920 + jy]);
    }
    pts.push(row);
  }
  const tris: [number, number][][] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const a = pts[r][c], b = pts[r][c + 1], d = pts[r + 1][c], e = pts[r + 1][c + 1];
      if (random(`d${r}${c}`) > 0.5) tris.push([a, b, e], [a, e, d]);
      else tris.push([a, b, d], [b, e, d]);
    }
  return tris;
})();

const Shatter: React.FC<{at: number; freeze: number; children: React.ReactNode}> = ({at, freeze, children}) => {
  const t = useTime();
  const d = t - at;
  if (d < 0 || d > 1.5) return null;
  const crack = prog(d, 0, 0.25);
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {SHARDS.map((tri, i) => {
        const cx = (tri[0][0] + tri[1][0] + tri[2][0]) / 3;
        const cy = (tri[0][1] + tri[1][1] + tri[2][1]) / 3;
        const dist = Math.hypot(cx - 540, cy - 960) / 1100;
        const delay = 0.25 + dist * 0.25;
        const k = Math.max(0, d - delay);
        const dx = (cx - 540) * 0.9 * k + (random(`vx${i}`) - 0.5) * 300 * k;
        const dy = (cy - 960) * 0.4 * k + 2200 * k * k;
        const rot = (random(`r${i}`) - 0.5) * 220 * k;
        const sc = 1 - k * 0.15;
        const poly = tri.map(([x, y]) => `${x}px ${y}px`).join(',');
        return (
          <AbsoluteFill key={i} style={{clipPath: `polygon(${poly})`, transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(${sc})`, transformOrigin: `${cx}px ${cy}px`, opacity: 1 - prog(k, 0.6, 1.0)}}>
            <TimeCtx.Provider value={freeze}>{children}</TimeCtx.Provider>
            <AbsoluteFill style={{background: `linear-gradient(${135 + i * 17}deg, rgba(255,255,255,${0.25 * crack}), transparent 40%)`}} />
          </AbsoluteFill>
        );
      })}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: crack * (1 - prog(d, 0.3, 0.45))}}>
        {SHARDS.map((tri, i) => (
          <polygon key={i} points={tri.map((p) => p.join(',')).join(' ')} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth={2.5} />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

/* ---------- 6. Morphing danger → coche ---------- */
const resample = (poly: [number, number][], n: number): [number, number][] => {
  const segs = poly.map((p, i) => {
    const q = poly[(i + 1) % poly.length];
    return {p, q, l: Math.hypot(q[0] - p[0], q[1] - p[1])};
  });
  const total = segs.reduce((a, b) => a + b.l, 0);
  const out: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    let d = (i / n) * total;
    for (const sg of segs) {
      if (d <= sg.l) {
        const k = d / sg.l;
        out.push([sg.p[0] + (sg.q[0] - sg.p[0]) * k, sg.p[1] + (sg.q[1] - sg.p[1]) * k]);
        break;
      }
      d -= sg.l;
    }
  }
  return out;
};
const N = 160;
const TRI = resample([[540, 600], [880, 1180], [200, 1180]], N);
const area = (p: [number, number][]) => p.reduce((a, q, i) => {
  const r = p[(i + 1) % p.length];
  return a + q[0] * r[1] - r[0] * q[1];
}, 0);
/** Aligne la coche sur le triangle (même sens de parcours, meilleur point de départ) pour un morphing sans torsion. */
const CHECK = (() => {
  let c = resample([[470, 1120], [230, 880], [330, 780], [470, 920], [770, 620], [870, 720]], N);
  if (Math.sign(area(c)) !== Math.sign(area(TRI))) c = [...c].reverse();
  let best = 0;
  let bestD = Infinity;
  for (let o = 0; o < N; o++) {
    let d = 0;
    for (let i = 0; i < N; i++) d += Math.hypot(c[(i + o) % N][0] - TRI[i][0], c[(i + o) % N][1] - TRI[i][1]);
    if (d < bestD) [bestD, best] = [d, o];
  }
  return c.map((_, i) => c[(i + best) % N]);
})();
const lerpC = (a: string, b: string, k: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * k)).join(',')})`;
};
const MorphScene: React.FC = () => {
  const t = useTime();
  const k = prog(t, 33.2, 34.6, easeInOut);
  const pts = TRI.map(([x, y], i) => [x + (CHECK[i][0] - x) * k, y + (CHECK[i][1] - y) * k]);
  const scale = 0.6 + rise(t, 30.6, 0.7) * 0.4 + Math.sin(prog(t, 34.6, 35.2) * Math.PI) * 0.06;
  const recap = prog(t, 38.2, 38.7);
  const items = ['Distorsion de chaleur', 'Particules physiques', '3D temps réel', 'Carte animée', 'Verre brisé', 'Morphing'];
  return (
    <AbsoluteFill style={{background: '#F3F5F7', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, transform: `translateY(${-recap * 420}px) scale(${1 - recap * 0.45})`, transformOrigin: '540px 900px'}}>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, transform: `scale(${scale})`, transformOrigin: '540px 900px'}}>
          <polygon points={pts.map((p) => p.join(',')).join(' ')} fill={lerpC('#D0312D', '#22B573', k)} stroke="#fff" strokeWidth={14} strokeLinejoin="round" style={{filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.25))'}} />
          <g opacity={1 - prog(t, 32.8, 33.3)}>
            <rect x={522} y={760} width={36} height={240} rx={18} fill="#fff" />
            <circle cx={540} cy={1070} r={24} fill="#fff" />
          </g>
        </svg>
        <div style={{position: 'absolute', left: 0, right: 0, top: 1300, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: lerpC('#D0312D', '#082B66', k)}}>{k < 0.5 ? 'DANGER' : 'MAÎTRISÉ'}</div>
      </div>
      <div style={{position: 'absolute', left: 90, right: 90, top: 1060, opacity: recap}}>
        {items.map((l, i) => (
          <div key={l} style={{display: 'flex', alignItems: 'center', gap: 22, marginBottom: 20, opacity: prog(t, 38.5 + i * 0.18, 38.8 + i * 0.18), transform: `translateX(${(1 - prog(t, 38.5 + i * 0.18, 38.9 + i * 0.18, easeOut)) * 40}px)`}}>
            <span style={{width: 54, height: 54, borderRadius: '50%', background: GREEN, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>✓</span>
            <span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 44, color: NAVY}}>{l}</span>
          </div>
        ))}
      </div>
      {t > 40.4 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 1720, display: 'flex', justifyContent: 'center', opacity: rise(t, 40.4)}}>
          <Img src={staticFile('promo/logo.png')} style={{width: 300, background: '#fff', borderRadius: 12, padding: '8px 14px', boxShadow: '0 10px 24px rgba(0,0,0,0.12)'}} />
        </div>
      )}
      <Tag at={30.8} until={38.0} n={5} title="Morphing de formes" sub="le triangle danger devient une coche" light />
    </AbsoluteFill>
  );
};

/* ---------- Composition ---------- */
const Span: React.FC<{a: number; b: number; children: React.ReactNode}> = ({a, b, children}) => {
  const t = useTime();
  return t >= a && t < b ? <>{children}</> : null;
};

export const DemoMotion: React.FC = () => {
  const t = useTime();
  return (
    <AbsoluteFill style={{background: NIGHT}}>
      <Span a={0} b={6.6}>
        <HeatScene />
      </Span>
      <Span a={6.6} b={13.4}>
        <SparkScene />
      </Span>
      <Span a={13.4} b={22.2}>
        <HelmetScene />
      </Span>
      <Shatter at={13.4} freeze={13.35}>
        <SparkScene />
      </Shatter>
      <Span a={22.2} b={30.4}>
        <MapScene />
      </Span>
      <Span a={30.4} b={END}>
        <MorphScene />
      </Span>
      <Shatter at={30.4} freeze={30.35}>
        <MapScene />
      </Shatter>
      {/* étiquette de la technique 6, posée sur la transition */}
      {t > 13.3 && t < 14.9 && <TransitionTag />}
      {t > 30.3 && t < 31.9 && <TransitionTag />}
      <Audio src={staticFile('musique-promo.m4a')} volume={(f) => 0.4 * Math.min(1, f / 20) * Math.max(0, Math.min(1, (s(END) - f) / 45))} />
      <SoundDesign cues={SFX} />
    </AbsoluteFill>
  );
};

const TransitionTag: React.FC = () => (
  <div style={{position: 'absolute', left: 0, right: 0, bottom: 160, display: 'flex', justifyContent: 'center'}}>
    <div style={{display: 'inline-flex', alignItems: 'center', gap: 14, background: NAVY, borderRadius: 999, padding: '12px 30px 12px 14px', boxShadow: '0 10px 30px rgba(0,0,0,0.4)'}}>
      <span style={{width: 46, height: 46, borderRadius: '50%', background: GREEN, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26}}>6</span>
      <span style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: '#fff', letterSpacing: 2}}>TRANSITION EN VERRE BRISÉ</span>
    </div>
  </div>
);

const SFX: Sfx[] = [
  {at: 0.2, s: 'riser', v: 0.25, dur: 2},
  {at: 6.6, s: 'sfx/whoosh', v: 0.3},
  {at: 12.6, s: 'riser', v: 0.25, dur: 1},
  {at: 13.4, s: 'deep-hit', v: 0.45},
  {at: 13.65, s: 'sfx/swish', v: 0.3},
  {at: 15.6, s: 'soft-whoosh', v: 0.3},
  {at: 22.3, s: 'stylo', v: 0.25},
  ...CITIES.map(([, , , at]) => ({at, s: 'sfx/pop', v: 0.22})),
  {at: 29.6, s: 'riser', v: 0.25, dur: 1},
  {at: 30.4, s: 'deep-hit', v: 0.45},
  {at: 30.65, s: 'sfx/swish', v: 0.3},
  {at: 33.2, s: 'soft-whoosh', v: 0.3},
  {at: 34.6, s: 'validation', v: 0.35},
  {at: 38.2, s: 'sfx/whoosh', v: 0.25},
  {at: 40.4, s: 'signature-marque', v: 0.3, dur: 3},
];

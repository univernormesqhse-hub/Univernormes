/**
 * « La ligne invisible » — décor et caméra 3D (Three.js via @remotion/three + @react-three/fiber).
 * Tout est procédural et déterministe (aucun asset externe) : site industriel de nuit, étincelle d'ouverture,
 * scanner volumétrique, dangers étiquetés, charge suspendue, modèle de Reason (plaques extrudées à trous réels),
 * hiérarchie des mesures, anneau PDCA et piliers Q-H-S-E, lever du jour final.
 */
import React, {useLayoutEffect, useMemo} from 'react';
import {useThree} from '@react-three/fiber';
import * as THREE from 'three';
import {random} from 'remotion';

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const ease = (x: number) => { const c = clamp01(x); return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2; };
export const outE = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);
export const pg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const L = (a: number, b: number, p: number) => a + (b - a) * p;
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/* ═════════════ Textures générées (étiquettes, halos) ═════════════ */
const texCache = new Map<string, THREE.Texture>();
export const labelTex = (text: string, bg: string, fg = '#fff', w = 1024, h = 220, size = 120) => {
  const key = `${text}|${bg}|${fg}|${w}|${h}|${size}`;
  const hit = texCache.get(key);
  if (hit) return hit;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d')!;
  if (bg !== 'transparent') {
    g.fillStyle = '#0B0F18'; g.fillRect(0, 0, w, h);
    g.fillStyle = bg; g.fillRect(10, 10, w - 20, h - 20);
  }
  g.fillStyle = fg; g.font = `900 ${size}px Montserrat, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(text, w / 2, h / 2 + size * 0.04, w - 40);
  const tx = new THREE.CanvasTexture(c);
  tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 8;
  texCache.set(key, tx);
  return tx;
};
let glowT: THREE.Texture | null = null;
export const glowTex = () => {
  if (glowT) return glowT;
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const g = c.getContext('2d')!;
  const r = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.18, 'rgba(255,255,255,0.75)'); r.addColorStop(0.45, 'rgba(255,255,255,0.18)'); r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r; g.fillRect(0, 0, 256, 256);
  glowT = new THREE.CanvasTexture(c);
  return glowT;
};
const Glow: React.FC<{p: [number, number, number]; s: number; c: string; o?: number}> = ({p, s, c, o = 1}) => (
  <sprite position={p} scale={[s, s, 1]}><spriteMaterial map={glowTex()} color={c} transparent opacity={o} blending={THREE.AdditiveBlending} depthWrite={false} /></sprite>
);
const Label: React.FC<{p: [number, number, number]; text: string; bg: string; w?: number; o?: number; scale?: number}> = ({p, text, bg, w = 4.6, o = 1, scale = 1}) => (
  <sprite position={p} scale={[w * scale, w * scale * 0.215, 1]}><spriteMaterial map={labelTex(text, bg)} transparent opacity={o} depthWrite={false} depthTest={false} /></sprite>
);

/* ═════════════ Caméra pilotée par images clés ═════════════ */
type K = [number, [number, number, number], [number, number, number], number];
const KEYS: K[] = [
  [0.0, [0, 7.5, 11], [0, 12.5, 0], 40],
  [1.5, [0, 5.5, 9.5], [0, 6, 0], 40],
  [2.2, [0, 3.0, 6.8], [0, 0.6, 0], 42],
  [3.0, [0, 3.0, 7.2], [0, 0.6, 0], 42],
  [5.6, [5, 6.5, 15], [0, 1.5, -2], 44],
  [8.6, [14, 14, 30], [0, 2.5, -3], 46],
  [10.2, [16, 16, 28], [0, 3, -3], 46],
  [20.0, [-18, 15, 26], [0, 3, -3], 46],
  [22.6, [18, 10, 14], [5, 4, -2], 44],
  [32.0, [15, 7.5, 12], [5, 3.2, -2], 42],
  [33.6, [116, 9, 19], [100, 3, -1], 44],
  [36.0, [113, 7.5, 16], [100, 3, -1], 44],
  [39.6, [109, 5.5, 14], [100, 3, -1], 44],
  [40.4, [102.5, 5.5, 38], [100, 2.6, -4], 30],
  [42.4, [102.5, 5.5, 38], [100, 2.6, -4], 30],
  [43.4, [112, 7, 12], [100, 3, -1], 44],
  [48.6, [114, 8.5, 15], [100, 3, -1], 44],
  [49.6, [-100, 5, 33], [-100, 5.4, 0], 46],
  [58.6, [-100, 4.5, 29], [-100, 5.4, 0], 46],
  [59.6, [0, 26, 34], [0, 1, -3], 48],
  [66.0, [26, 21, 34], [0, 2, -3], 48],
  [72.0, [8, 24, 48], [0, 4, -5], 46],
];
const cut = [33.6, 49.6, 59.6];
const camAt = (t: number) => {
  let i = KEYS.findIndex((k) => k[0] > t);
  if (i === -1) i = KEYS.length - 1;
  if (i === 0) i = 1;
  const a = KEYS[i - 1], b = KEYS[i];
  const isCut = cut.includes(b[0]);
  const raw = (t - a[0]) / (b[0] - a[0]);
  const p = isCut ? (raw >= 1 ? 1 : 0) : ease(raw);
  return {pos: a[1].map((v, j) => L(v, b[1][j], p)) as [number, number, number], tgt: a[2].map((v, j) => L(v, b[2][j], p)) as [number, number, number], fov: L(a[3], b[3], p)};
};
const CamRig: React.FC<{t: number}> = ({t}) => {
  const {camera} = useThree();
  useLayoutEffect(() => {
    const c = camAt(t);
    const shake = Math.max(0, 1 - Math.abs(t - 2.2) * 3) * 0.12 + Math.max(0, 1 - Math.abs(t - 45.1) * 3) * 0.08;
    camera.position.set(c.pos[0] + Math.sin(t * 61) * shake, c.pos[1] + Math.cos(t * 53) * shake, c.pos[2]);
    camera.lookAt(...c.tgt);
    (camera as THREE.PerspectiveCamera).fov = c.fov;
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
  }, [t, camera]);
  return null;
};

/* ═════════════ Matériaux communs ═════════════ */
const steel = new THREE.MeshStandardMaterial({color: '#4E607D', metalness: 0.45, roughness: 0.38});
const steel2 = new THREE.MeshStandardMaterial({color: '#647694', metalness: 0.35, roughness: 0.45});
const neon = (c: string, o = 1) => new THREE.MeshBasicMaterial({color: c, transparent: o < 1, opacity: o, toneMapped: false});

/* ═════════════ Le site industriel ═════════════ */
const Tank: React.FC<{p: [number, number, number]; r: number; h: number; ring: string; on: number; hot?: number}> = ({p, r, h, ring, on, hot = 0}) => (
  <group position={p}>
    <mesh position={[0, h / 2, 0]} material={steel}><cylinderGeometry args={[r, r, h, 40]} /></mesh>
    <mesh position={[0, h + 0.4, 0]} material={steel2}><sphereGeometry args={[r, 40, 12, 0, Math.PI * 2, 0, Math.PI / 2]} /></mesh>
    {[0.25, 0.6, 0.9].map((f, k) => <mesh key={k} position={[0, h * f, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[r + 0.05, 0.05, 8, 64]} /><meshBasicMaterial color={hot > 0 ? '#FF6A1A' : ring} transparent opacity={clamp01(on) * (0.35 + 0.65 * (hot > 0 ? 0.5 + 0.5 * Math.sin(hot * 18) : 1))} toneMapped={false} /></mesh>)}
  </group>
);
const Pipe: React.FC<{pts: [number, number, number][]; r?: number; on: number; c?: string}> = ({pts, r = 0.22, on, c = '#2EC5FF'}) => {
  const geo = useMemo(() => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map((q) => V(...q))), 80, r, 12, false), [pts, r]);
  const geo2 = useMemo(() => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map((q) => V(q[0], q[1] + r + 0.02, q[2]))), 80, 0.035, 6, false), [pts, r]);
  return <group><mesh geometry={geo} material={steel2} /><mesh geometry={geo2}><meshBasicMaterial color={c} transparent opacity={clamp01(on) * 0.9} toneMapped={false} /></mesh></group>;
};
const Worker: React.FC<{p: [number, number, number]; vest?: string; ry?: number; s?: number}> = ({p, vest = '#F5C400', ry = 0, s = 1}) => (
  <group position={p} rotation={[0, ry, 0]} scale={s}>
    <mesh position={[0, 0.55, 0]} material={steel2}><cylinderGeometry args={[0.18, 0.2, 1.1, 12]} /></mesh>
    <mesh position={[0, 1.3, 0]}><cylinderGeometry args={[0.27, 0.24, 0.65, 14]} /><meshStandardMaterial color={vest} emissive={vest} emissiveIntensity={0.35} /></mesh>
    <mesh position={[0, 1.82, 0]}><sphereGeometry args={[0.17, 16, 12]} /><meshStandardMaterial color="#5A3B2A" /></mesh>
    <mesh position={[0, 1.95, 0]}><sphereGeometry args={[0.2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.2} /></mesh>
  </group>
);

/** Étincelle d'ouverture : chute + gerbe d'éclats au sol (balistique déterministe). */
const Spark: React.FC<{t: number}> = ({t}) => {
  const fall = pg(t, 0.2, 2.2);
  const y = L(14, 0.05, fall * fall);
  const burst = useMemo(() => Array.from({length: 160}, (_, i) => ({a: random(`sa${i}`) * Math.PI * 2, v: 2 + random(`sv${i}`) * 5, up: 2 + random(`su${i}`) * 6, life: 0.6 + random(`sl${i}`) * 1.4})), []);
  const k = t - 2.2;
  const pos = useMemo(() => new Float32Array(160 * 3), []);
  const geo = useMemo(() => new THREE.BufferGeometry(), []);
  if (k > 0) {
    burst.forEach((b, i) => { const tt = Math.min(k, b.life); pos[i * 3] = Math.cos(b.a) * b.v * tt; pos[i * 3 + 1] = Math.max(0.02, b.up * tt - 4.9 * tt * tt); pos[i * 3 + 2] = Math.sin(b.a) * b.v * tt; });
    geo.setAttribute('position', new THREE.BufferAttribute(pos.slice(), 3));
  }
  return (
    <group>
      {t < 2.25 && t > 0.15 && <><Glow p={[0, y, 0]} s={3.4} c="#FFB347" /><Glow p={[0, y, 0]} s={1.1} c="#FFF3D0" /><Glow p={[0, y + 1.2, 0]} s={1.2} c="#FFC06A" o={0.5} /></>}
      {t < 2.2 && t > 0.2 && <mesh position={[0, y + 0.9, 0]}><cylinderGeometry args={[0.02, 0.06, 1.8, 6]} /><meshBasicMaterial color="#FFC06A" transparent opacity={0.9} toneMapped={false} /></mesh>}
      {k > 0 && k < 2.2 && <points geometry={geo}><pointsMaterial color="#FFB347" size={0.09} transparent opacity={clamp01(1 - k / 2.2)} blending={THREE.AdditiveBlending} depthWrite={false} /></points>}
      {k > 0 && k < 1.2 && <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[k * 9, k * 9 + 0.25, 96]} /><meshBasicMaterial color="#FFB347" transparent opacity={1 - k / 1.2} toneMapped={false} /></mesh>}
      {k > 0 && k < 0.6 && <Glow p={[0, 0.3, 0]} s={8 * (1 - k)} c="#FFD9A0" o={1 - k / 0.6} />}
    </group>
  );
};

/** Poussière en suspension (déterministe, dérive lente). */
const Dust: React.FC<{t: number; o: number; c?: string}> = ({t, o, c = '#9CC6FF'}) => {
  const base = useMemo(() => Array.from({length: 500}, (_, i) => [(random(`dx${i}`) - 0.5) * 60, random(`dy${i}`) * 18, (random(`dz${i}`) - 0.5) * 50 - 3]), []);
  const geo = useMemo(() => new THREE.BufferGeometry(), []);
  const arr = new Float32Array(base.length * 3);
  base.forEach((b, i) => { arr[i * 3] = b[0] + Math.sin(t * 0.3 + i) * 0.8; arr[i * 3 + 1] = (b[1] + t * 0.25) % 18; arr[i * 3 + 2] = b[2] + Math.cos(t * 0.2 + i) * 0.8; });
  geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
  return <points geometry={geo}><pointsMaterial color={c} size={0.07} transparent opacity={o} blending={THREE.AdditiveBlending} depthWrite={false} /></points>;
};

/** Faisceau de scanner volumétrique tournant (danger = ce qu'on éclaire). */
const Scanner: React.FC<{t: number; o: number}> = ({t, o}) => {
  const ang = (t - 10) * 0.55;
  return (
    <group position={[2, 0, 1]}>
      <mesh position={[0, 5, 0]} material={steel}><cylinderGeometry args={[0.25, 0.4, 10, 12]} /></mesh>
      <Glow p={[0, 10.2, 0]} s={2.2 * o} c="#FFE27A" />
      <group position={[0, 10.2, 0]} rotation={[0, ang, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2 + 0.42]} position={[-9, -3.9, 0]}><coneGeometry args={[3.2, 20, 40, 1, true]} /><meshBasicMaterial color="#FFE27A" transparent opacity={0.11 * o} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} /></mesh>
        <mesh rotation={[0, 0, Math.PI / 2 + 0.42]} position={[-9, -3.9, 0]}><coneGeometry args={[1.4, 20, 30, 1, true]} /><meshBasicMaterial color="#FFF3C0" transparent opacity={0.13 * o} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} /></mesh>
      </group>
    </group>
  );
};
export const HAZ: {name: string; c: string; p: [number, number, number]; lab: [number, number, number]; at: number}[] = [
  {name: 'ÉNERGIE ÉLECTRIQUE', c: '#F5C400', p: [9, 1.2, 4], lab: [9, 4.4, 4], at: 12.4},
  {name: 'CHUTE DE HAUTEUR', c: '#FF5A4E', p: [-2, 6.2, -1.5], lab: [-2, 8.6, -1.5], at: 14.2},
  {name: 'PRODUIT CHIMIQUE', c: '#B06CFF', p: [-9, 3, -7], lab: [-9, 9.8, -7], at: 16.0},
  {name: 'CHARGE SUSPENDUE', c: '#FF8A1F', p: [5, 5, -2], lab: [5, 8.9, -2], at: 17.8},
];

const Site: React.FC<{t: number; power: number; day: number}> = ({t, power, day}) => {
  const on = (k: number) => clamp01((power - k * 0.12) * 4);
  const hz = (i: number) => (t > HAZ[i].at && t < 33.6 ? t - HAZ[i].at : 0);
  const swing = Math.sin(t * 1.3) * 0.25 * (t < 22 ? 1 : 0.6);
  const loadPos: [number, number, number] = [5 + Math.sin(swing) * 6.6, 12 - Math.cos(swing) * 6.6, -2];
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -3]}><planeGeometry args={[220, 220]} /><meshStandardMaterial color={day > 0 ? new THREE.Color('#0B1220').lerp(new THREE.Color('#5E6E85'), day) : '#0B1220'} metalness={0.2} roughness={0.85} /></mesh>
      <gridHelper args={[120, 60, '#1E5AA8', '#14325C']} position={[0, 0.01, -3]} />
      <Tank p={[-9, 0, -7]} r={2.3} h={6} ring="#2EC5FF" on={on(0)} hot={hz(2) > 0 ? hz(2) : 0} />
      <Tank p={[-3.5, 0, -10]} r={2.0} h={7.5} ring="#2EC5FF" on={on(1)} />
      <Tank p={[2.5, 0, -11]} r={1.6} h={5} ring="#2EC5FF" on={on(2)} />
      <Pipe pts={[[-6.7, 4.5, -7], [-4, 5.2, -8.4], [-1.5, 5.6, -9.4], [1, 4.4, -10.4]]} on={on(3)} />
      <Pipe pts={[[-9, 1.2, -4.7], [-5, 1.0, -3], [0, 1.0, -2.6], [6, 1.0, -2.6], [9, 1.0, 2.5]]} r={0.18} on={on(4)} c="#22B573" />
      {/* passerelle en hauteur (garde-corps manquant au centre) */}
      <group position={[-2, 6, -1.5]}>
        <mesh material={steel2}><boxGeometry args={[7, 0.18, 1.4]} /></mesh>
        {[-3.4, -2.2, 2.2, 3.4].map((x) => <mesh key={x} position={[x, 0.55, 0.65]}><boxGeometry args={[0.06, 1.1, 0.06]} /><meshBasicMaterial color="#F5C400" toneMapped={false} /></mesh>)}
        <mesh position={[-2.8, 1.1, 0.65]}><boxGeometry args={[1.3, 0.06, 0.06]} /><meshBasicMaterial color="#F5C400" toneMapped={false} /></mesh>
        <mesh position={[2.8, 1.1, 0.65]}><boxGeometry args={[1.3, 0.06, 0.06]} /><meshBasicMaterial color="#F5C400" toneMapped={false} /></mesh>
        {[-3.4, 3.4].map((x) => <mesh key={`l${x}`} position={[x, -3, 0]} material={steel}><boxGeometry args={[0.18, 6, 0.18]} /></mesh>)}
        <Worker p={[0.4, 0.09, 0.1]} ry={0.3} />
        {hz(1) > 0 && <mesh position={[0, 0.6, 0.7]}><boxGeometry args={[3.2, 1.2, 0.02]} /><meshBasicMaterial color="#FF5A4E" transparent opacity={0.25 + 0.2 * Math.sin(hz(1) * 10)} toneMapped={false} /></mesh>}
      </group>
      {/* armoire électrique */}
      <group position={[9, 0, 4]}>
        <mesh position={[0, 1.1, 0]} material={steel2}><boxGeometry args={[1.4, 2.2, 0.7]} /></mesh>
        <mesh position={[0, 1.4, 0.36]}><planeGeometry args={[0.7, 0.7]} /><meshBasicMaterial map={labelTex('⚡', '#F5C400', '#111', 256, 256, 200)} toneMapped={false} /></mesh>
        {hz(0) > 0 && <Glow p={[0, 1.4, 0.5]} s={2 + Math.sin(hz(0) * 14)} c="#F5C400" />}
      </group>
      {/* grue + charge suspendue */}
      <group>
        <mesh position={[11, 6.5, -2]} material={steel}><boxGeometry args={[0.5, 13, 0.5]} /></mesh>
        <mesh position={[6.5, 12.6, -2]} material={steel}><boxGeometry args={[10, 0.35, 0.35]} /></mesh>
        <mesh position={[(5 + loadPos[0]) / 2, (12 + loadPos[1] + 0.5) / 2, -2]} rotation={[0, 0, swing]}><cylinderGeometry args={[0.025, 0.025, 6.1, 6]} /><meshBasicMaterial color="#C9D2DF" /></mesh>
        <mesh position={[loadPos[0], loadPos[1] - 0.2, -2]} rotation={[0, 0, swing]}><boxGeometry args={[1.6, 1.0, 1.2]} /><meshStandardMaterial color="#8A5A2B" emissive="#FF8A1F" emissiveIntensity={hz(3) > 0 ? 0.4 + 0.3 * Math.sin(hz(3) * 12) : 0.05} /></mesh>
        {t > 22.4 && t < 33.6 && <mesh position={[loadPos[0], 0.03, -2]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[2.2, 48]} /><meshBasicMaterial color="#FF3B30" transparent opacity={(0.25 + 0.2 * Math.sin(t * 8)) * pg(t, 22.4, 23.4)} toneMapped={false} /></mesh>}
        {t > 22.4 && t < 33.6 && <Worker p={[L(9.5, 5.4, ease(pg(t, 23.4, 27.5))), 0, -1.2]} ry={-Math.PI / 2} vest="#22B573" />}
      </group>
      {/* projecteurs du site */}
      {[[-14, 9, 6], [14, 9, 8], [-12, 9, -16], [15, 9, -14]].map((q, k) => <group key={k}><mesh position={[q[0], q[1] / 2, q[2]]} material={steel}><cylinderGeometry args={[0.12, 0.16, q[1], 8]} /></mesh><Glow p={q as [number, number, number]} s={3.2 * on(k + 1)} c="#CFE6FF" o={0.9} /></group>)}
      {HAZ.map((h, i) => (t > h.at && t < 22.6 ? <Label key={i} p={h.lab} text={h.name} bg={h.c} w={6.8} o={pg(t, h.at, h.at + 0.3)} scale={L(1.4, 1, outE(pg(t, h.at, h.at + 0.35)))} /> : null))}
    </group>
  );
};

/* ═════════════ Modèle de Reason (plaques à trous réels) ═════════════ */
const SLABS = ['CONCEPTION', 'ORGANISATION', 'PROCÉDURES', 'EPI'];
const holesFor = (i: number): [number, number, number][] => [[0, 0, 0.55], [-1.6 + i * 0.4, 2.1, 0.4], [1.5, -2.2 + i * 0.3, 0.45], [1.7 - i * 0.6, 1.4, 0.3]];
const slabGeo = (i: number) => {
  const s = new THREE.Shape();
  s.moveTo(-2.6, -3.4); s.lineTo(2.6, -3.4); s.lineTo(2.6, 3.4); s.lineTo(-2.6, 3.4); s.lineTo(-2.6, -3.4);
  holesFor(i).forEach(([x, y, r]) => { const h = new THREE.Path(); h.absarc(x, y, r, 0, Math.PI * 2, true); s.holes.push(h); });
  return new THREE.ExtrudeGeometry(s, {depth: 0.35, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06, bevelSegments: 2, curveSegments: 40});
};
const Reason: React.FC<{t: number}> = ({t}) => {
  const geos = useMemo(() => SLABS.map((_, i) => slabGeo(i)), []);
  const zs = [4, 1.3, -1.4, -4.1];
  // trajectoire : avance 36→40.4, gel 40.4→41, retour 41→42.4, rejoue 43→45 et s'arrête sur la plaque 2
  const zStart = 8, zEnd = -8;
  let head = zStart;
  if (t < 36) head = zStart;
  else if (t < 40.4) head = L(zStart, -6.5, pg(t, 36, 40.4));
  else if (t < 41) head = -6.5;
  else if (t < 42.4) head = L(-6.5, zStart, ease(pg(t, 41, 42.4)));
  else if (t < 43) head = zStart;
  else head = Math.max(zs[1] + 0.45, L(zStart, zEnd, pg(t, 43, 45.5)));
  const blocked = t > 44.5;
  const rot2 = t > 42.4 ? ease(pg(t, 42.4, 43.0)) * 0.9 : 0;
  const k = t - 45.1;
  const shards = useMemo(() => Array.from({length: 90}, (_, i) => ({a: random(`ra${i}`) * Math.PI * 2, b: (random(`rb${i}`) - 0.5) * Math.PI, v: 2 + random(`rv${i}`) * 4})), []);
  const sGeo = useMemo(() => new THREE.BufferGeometry(), []);
  if (k > 0) {
    const arr = new Float32Array(90 * 3);
    shards.forEach((s, i) => { const tt = Math.min(k, 1.6); arr[i * 3] = 100 + Math.cos(s.a) * Math.cos(s.b) * s.v * tt; arr[i * 3 + 1] = 3 + Math.sin(s.b) * s.v * tt - 2 * tt * tt; arr[i * 3 + 2] = zs[1] + 0.6 + Math.sin(s.a) * Math.cos(s.b) * s.v * tt * 0.6; });
    sGeo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
  }
  const frozen = t > 40.4 && t < 41;
  const red = frozen ? '#FF2D55' : '#FF3B30';
  return (
    <group>
      <mesh position={[100, 3, -14]}><planeGeometry args={[80, 60]} /><meshBasicMaterial color="#050812" /></mesh>
      {SLABS.map((n, i) => (
        <group key={n} position={[100, 3, zs[i]]} rotation={[0, 0, i === 1 ? rot2 : 0]}>
          <mesh geometry={geos[i]} position={[0, 0, -0.17]}><meshStandardMaterial color="#F5C400" emissive="#F5A400" emissiveIntensity={0.22} metalness={0.1} roughness={0.5} transparent opacity={0.9} /></mesh>
          <Label p={[0, -4.2, 0]} text={n} bg={i === 1 && blocked ? '#22B573' : '#0E2A5C'} w={3.4} />
        </group>
      ))}
      <mesh position={[100, 3, (zStart + head) / 2]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.09, 0.09, Math.max(0.01, zStart - head), 10]} /><meshBasicMaterial color={red} toneMapped={false} /></mesh>
      <Glow p={[100, 3, head]} s={frozen ? 3.2 : 2.2} c={red} />
      <Glow p={[100, 3, (zStart + head) / 2]} s={Math.max(0.1, (zStart - head) * 0.6)} c={red} o={0.25} />
      {t > 36 && <group position={[100, 3, -7.5]}><Worker p={[0, -1.9, 0]} s={0.9} vest="#22B573" ry={Math.PI} /></group>}
      {k > 0 && k < 1.6 && <points geometry={sGeo}><pointsMaterial color="#FFD27A" size={0.12} transparent opacity={1 - k / 1.6} blending={THREE.AdditiveBlending} depthWrite={false} /></points>}
      {k > 0 && k < 0.5 && <Glow p={[100, 3, zs[1] + 0.6]} s={6 * (1 - k * 2)} c="#FFE6A8" />}
    </group>
  );
};

/* ═════════════ Hiérarchie des mesures (pyramide inversée) ═════════════ */
export const HIER: [string, string, number][] = [['ÉLIMINER', '#22B573', 50.4], ['SUBSTITUER', '#0F9D8F', 51.9], ['PROTECTION COLLECTIVE', '#1F6FD1', 53.4], ['ORGANISATION · FORMATION', '#F07A12', 54.9], ['EPI', '#E04A3F', 56.4]];
const Hierarchy: React.FC<{t: number}> = ({t}) => (
  <group position={[-100, 0, 0]}>
    <mesh position={[0, 6, -10]}><planeGeometry args={[90, 60]} /><meshBasicMaterial color="#060A14" /></mesh>
    {HIER.map(([n, c, a], i) => {
      const w = 11 - i * 1.9;
      const y = 10.5 - i * 2.05;
      const p = outE(pg(t, a, a + 0.55));
      const bounce = Math.sin(pg(t, a + 0.55, a + 0.95) * Math.PI) * 0.15;
      return t > a ? (
        <group key={n} position={[0, L(y + 14, y, p) + bounce, 0]}>
          <mesh><boxGeometry args={[w, 1.75, 2.2]} /><meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.25 + (i === 0 ? 0.25 * Math.abs(Math.sin(t * 3)) : 0)} metalness={0.2} roughness={0.4} /></mesh>
          <mesh position={[0, 0, 1.11]}><planeGeometry args={[Math.min(w - 0.4, 9.6), 1.3]} /><meshBasicMaterial map={labelTex(n, 'transparent', '#fff', 1400, 190, 112)} transparent toneMapped={false} /></mesh>
        </group>
      ) : null;
    })}
  </group>
);

/* ═════════════ Anneau PDCA et piliers Q-H-S-E ═════════════ */
const PDCA: [string, string, number][] = [['PLANIFIER', '#1F6FD1', 60.3], ['RÉALISER', '#22B573', 61.6], ['VÉRIFIER', '#F07A12', 62.9], ['AGIR', '#E04A3F', 64.2]];
const QHSE: [string, string, [number, number, number]][] = [['Q', '#1F6FD1', [-18, 0, -20]], ['H', '#0F9D8F', [-6, 0, -24]], ['S', '#F07A12', [6, 0, -24]], ['E', '#22B573', [18, 0, -20]]];
const Ring: React.FC<{t: number}> = ({t}) => (
  <group position={[0, 0.25, -3]}>
    {PDCA.map(([n, c, a], i) => {
      const on = pg(t, a, a + 0.5);
      return (
        <group key={n} rotation={[-Math.PI / 2, 0, -i * (Math.PI / 2)]}>
          <mesh><torusGeometry args={[18, 0.28, 10, 80, (Math.PI / 2) * on * 0.96]} /><meshBasicMaterial color={c} toneMapped={false} /></mesh>
        </group>
      );
    })}
    {PDCA.map(([n, c, a], i) => { const ang = -(i + 0.5) * (Math.PI / 2); return t > a + 0.2 ? <Label key={`l${n}`} p={[Math.cos(ang) * 18, 2.2, -Math.sin(ang) * 18]} text={n} bg={c} w={4.6} o={pg(t, a + 0.2, a + 0.6)} /> : null; })}
    {QHSE.map(([n, c, q], i) => { const h = 11 * outE(pg(t, 63.4 + i * 0.35, 64.6 + i * 0.35)); return h > 0.05 ? (
      <group key={n} position={q}>
        <mesh position={[0, h / 2, 0]}><boxGeometry args={[2.4, h, 2.4]} /><meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.35} /></mesh>
        <mesh position={[0, h + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[2.3, 2.3]} /><meshBasicMaterial map={labelTex(n, 'transparent', '#fff', 256, 256, 210)} transparent toneMapped={false} /></mesh>
        <Glow p={[0, h + 1.2, 0]} s={5} c={c} o={0.7} />
      </group>
    ) : null; })}
  </group>
);

/* ═════════════ Scène complète ═════════════ */
export const Scene3D: React.FC<{t: number}> = ({t}) => {
  const {scene} = useThree();
  const day = ease(pg(t, 66, 70));
  const power = pg(t, 3.2, 8.2) + (t > 59.6 ? 1 : 0);
  useLayoutEffect(() => {
    const night = new THREE.Color('#03060D');
    const dawn = new THREE.Color('#E9A86B');
    const bg = night.clone().lerp(dawn, day * 0.85);
    scene.background = bg;
    scene.fog = new THREE.Fog(bg, 30, t > 33.6 && t < 59.6 ? 140 : 95);
  }, [scene, day, t]);
  return (
    <>
      <CamRig t={t} />
      <ambientLight intensity={0.9 + day * 1.0} color={day > 0 ? '#FFE2C2' : '#8FB4FF'} />
      <hemisphereLight args={['#8FB8FF', '#1A2433', 1.1 + day * 0.6]} />
      <directionalLight position={[-20, 30, 10]} intensity={1.2 + day * 2.4} color={day > 0 ? '#FFD2A0' : '#BFD7FF'} />
      <pointLight position={[0, 1, 0]} intensity={t > 2.2 && t < 3.6 ? 120 * (1 - pg(t, 2.2, 3.6)) : 0} color="#FFB347" distance={30} />
      {t < 33.7 || t > 59.5 ? <Site t={t} power={power} day={day} /> : null}
      {t < 9.5 && <Spark t={t} />}
      {t > 9.6 && t < 22.8 && <Scanner t={t} o={pg(t, 9.6, 10.6) * (1 - pg(t, 21.6, 22.6))} />}
      <Dust t={t} o={0.55 * (1 - day * 0.7)} c={day > 0.5 ? '#FFE2C2' : '#9CC6FF'} />
      {t > 33.5 && t < 49.7 && <Reason t={t} />}
      {t > 49.5 && t < 59.7 && <Hierarchy t={t} />}
      {t > 59.5 && <Ring t={t} />}
    </>
  );
};

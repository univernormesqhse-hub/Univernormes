/**
 * Pack WebGL « Le responsable QHSE » — nouvelles techniques (en plus des packs SwotGL, DangerGL, FishGL, BurnGL, SafeGL) :
 * - `labelTex` : étiquettes rendues en texture (canvas) posées sur des objets 3D.
 * - `Hub` : réseau en étoile — nœuds vernis reliés par des tubes courbes où circulent des impulsions lumineuses.
 * - `OrgTree` : organigramme 3D (cartes-nœuds) dont les liens poussent du haut vers le bas.
 * - `TitleDrum` : tambour à facettes qui tourne et présente un intitulé de poste par face.
 * - `Radar3D` : radar de compétences extrudé dont le polygone se gonfle axe par axe.
 * - `Bars3D` : histogramme en volume qui monte, flèche de croissance.
 * - `LoopTrack` : anneau (tore) parcouru par un jeton, quatre stations qui s'allument au passage.
 * - `CardFan` : cartes de mission qui arrivent une à une et se rangent en éventail, la carte active face à la caméra.
 * - `Sites` : plateau avec plusieurs sites et un trajet en arc parcouru par un véhicule-jeton.
 */
import React, {useMemo} from 'react';
import * as THREE from 'three';
import {GrowTube} from '../ishikawaRecordMetro/FishGL';
import {V3} from '../swotRecordMetro/SwotGL';

const cl = (v: number) => Math.min(1, Math.max(0, v));
const phys = (c: string, o: Partial<THREE.MeshPhysicalMaterialParameters> = {}) => new THREE.MeshPhysicalMaterial({color: c, roughness: 0.25, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.06, ...o});
const eo = (x: number) => 1 - Math.pow(1 - cl(x), 3);

/* ═════════════ Étiquette en texture ═════════════ */
const TEX = new Map<string, THREE.CanvasTexture>();
export const labelTex = (txt: string, bg: string, fg = '#ffffff', w = 512, h = 160, fs = 64, sub?: string) => {
  const k = `${txt}|${bg}|${fg}|${w}|${h}|${fs}|${sub}`;
  const hit = TEX.get(k); if (hit) return hit;
  const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d')!;
  const r = 28; g.fillStyle = bg; g.beginPath(); g.moveTo(r, 0); g.arcTo(w, 0, w, h, r); g.arcTo(w, h, 0, h, r); g.arcTo(0, h, 0, 0, r); g.arcTo(0, 0, w, 0, r); g.fill();
  g.strokeStyle = '#0B0F18'; g.lineWidth = 10; g.stroke();
  g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle';
  let f = fs; g.font = `900 ${f}px Montserrat, sans-serif`; while (g.measureText(txt).width > w - 50 && f > 18) { f -= 2; g.font = `900 ${f}px Montserrat, sans-serif`; }
  g.fillText(txt, w / 2, sub ? h * 0.4 : h / 2 + 3);
  if (sub) { g.globalAlpha = 0.85; g.font = `700 ${Math.round(fs * 0.5)}px Montserrat, sans-serif`; g.fillText(sub, w / 2, h * 0.74); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; TEX.set(k, t); return t;
};
/** Carte plate (étiquette) en 3D : `w` × hauteur proportionnelle. */
export const Tag: React.FC<{txt: string; bg: string; fg?: string; pos: V3; w?: number; rot?: V3; s?: number; sub?: string; op?: number}> = ({txt, bg, fg = '#fff', pos, w = 1.6, rot = [0, 0, 0], s = 1, sub, op = 1}) => {
  const tex = labelTex(txt, bg, fg, 512, sub ? 220 : 160, 64, sub);
  const h = w * (sub ? 220 : 160) / 512;
  return s > 0.001 ? <mesh position={pos} rotation={rot} scale={s} castShadow><boxGeometry args={[w, h, 0.06]} /><meshStandardMaterial attach="material-0" color={bg} /><meshStandardMaterial attach="material-1" color={bg} /><meshStandardMaterial attach="material-2" color={bg} /><meshStandardMaterial attach="material-3" color={bg} /><meshStandardMaterial attach="material-4" map={tex} roughness={0.45} transparent opacity={op} /><meshStandardMaterial attach="material-5" color={bg} /></mesh> : null;
};

/* ═════════════ Réseau en étoile avec impulsions ═════════════ */
export const Hub: React.FC<{u: number; nodes: [V3, string, string, number][]; center: V3; grow: (i: number) => number; pulse?: number}> = ({u, nodes, center, grow, pulse = 1}) => {
  const core = useMemo(() => phys('#0B2E6B', {emissive: new THREE.Color('#1F5BD8'), emissiveIntensity: 0.25}), []);
  core.emissiveIntensity = 0.25 + 0.2 * Math.sin(u * 4);
  return <>
    <mesh position={center} material={core} castShadow><icosahedronGeometry args={[0.55, 3]} /></mesh>
    {nodes.map(([p, l, c, a], i) => {
      const k = grow(i);
      const mid: V3 = [(center[0] + p[0]) / 2, (center[1] + p[1]) / 2 + 0.6, (center[2] + p[2]) / 2];
      const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(...center), new THREE.Vector3(...mid), new THREE.Vector3(...p));
      const ph = ((u * 0.7 + i * 0.37) % 1);
      const q = curve.getPoint(ph);
      return <React.Fragment key={l}>
        <GrowTube pts={[center, mid, p]} k={k} r={0.035} c={c} glow={0.25} />
        {k >= 1 && pulse > 0 && <mesh position={[q.x, q.y, q.z]}><sphereGeometry args={[0.08, 16, 12]} /><meshBasicMaterial color="#ffffff" /></mesh>}
        {k > 0.85 && <Tag txt={l} bg={c} pos={[p[0], p[1] + 0.05, p[2]]} w={1.4} s={eo((k - 0.85) / 0.15) * (1 + 0.08 * Math.max(0, Math.sin((u - a) * 6)) * (u > a && u < a + 1 ? 1 : 0))} />}
      </React.Fragment>;
    })}
  </>;
};

/* ═════════════ Organigramme 3D ═════════════ */
export const OrgTree: React.FC<{u: number; top: number; mid: number; leaves: [number, number]; glowMid?: number}> = ({u, top, mid, leaves, glowMid = 0}) => {
  const T: V3 = [0, 3.0, 0], M: V3 = [0, 1.55, 0], L1: V3 = [-1.55, 0.1, 0], L2: V3 = [1.55, 0.1, 0];
  const g = (a: number) => eo((u - a) / 0.6);
  return <>
    <Tag txt="Directeur qualité" bg="#5B6577" pos={T} w={2.3} s={g(top)} />
    <GrowTube pts={[[0, 2.75, 0], [0, 2.2, 0], [0, 1.8, 0]]} k={g(mid - 0.3)} r={0.04} c="#C99A06" />
    <Tag txt="Responsable QHSE" bg="#0B2E6B" pos={M} w={2.5} s={g(mid) * (1 + 0.06 * glowMid * Math.sin(u * 6))} />
    {[L1, L2].map((p, i) => <React.Fragment key={i}>
      <GrowTube pts={[[0, 1.3, 0], [p[0] * 0.6, 0.85, 0], [p[0], 0.35, 0]]} k={g(leaves[i] - 0.3)} r={0.035} c="#C99A06" />
      <Tag txt={i ? 'Techniciens qualité' : 'Contrôleurs qualité'} bg={i ? '#14A3A3' : '#1F5BD8'} pos={p} w={2.1} s={g(leaves[i])} />
    </React.Fragment>)}
  </>;
};

/* ═════════════ Tambour des intitulés ═════════════ */
export const TitleDrum: React.FC<{titles: [string, string][]; turn: number; pos: V3}> = ({titles, turn, pos}) => {
  const n = titles.length, R = 1.05 / Math.tan(Math.PI / n);
  const frame = useMemo(() => phys('#2B2F3A', {metalness: 0.6, roughness: 0.3}), []);
  return <group position={pos}>
    <group rotation={[turn * ((Math.PI * 2) / n), 0, 0]}>
      {titles.map(([t, c], i) => { const a = -(i / n) * Math.PI * 2; return <group key={t} rotation={[a, 0, 0]}><Tag txt={t} bg={c} pos={[0, 0, R]} w={3.8} /></group>; })}
      <mesh material={frame} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[R - 0.05, R - 0.05, 4.0, n]} /></mesh>
    </group>
    {[-2.25, 2.25].map((x) => <mesh key={x} material={frame} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[R + 0.35, R + 0.35, 0.12, 48]} /></mesh>)}
  </group>;
};

/* ═════════════ Radar de compétences ═════════════ */
export const Radar3D: React.FC<{vals: number[]; labels: [string, string][]; pos: V3; r?: number; u: number}> = ({vals, labels, pos, r = 1.7, u}) => {
  const n = vals.length;
  const P = (i: number, k: number) => { const a = Math.PI / 2 + (i / n) * Math.PI * 2; return [Math.cos(a) * r * k, Math.sin(a) * r * k] as [number, number]; };
  const geo = useMemo(() => new THREE.BufferGeometry(), []);
  const s = new THREE.Shape(); vals.forEach((v, i) => { const [x, y] = P(i, Math.max(0.02, v)); if (i) s.lineTo(x, y); else s.moveTo(x, y); }); s.closePath();
  const ex = new THREE.ExtrudeGeometry(s, {depth: 0.16, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2});
  geo.copy(ex); ex.dispose();
  const grid = useMemo(() => phys('#DCE3EE', {roughness: 0.6, clearcoat: 0.2}), []);
  return <group position={pos} rotation={[-0.35 + Math.sin(u * 0.4) * 0.05, Math.sin(u * 0.5) * 0.2, 0]}>
    {[0.33, 0.66, 1].map((k) => <mesh key={k} material={grid} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[r * k, 0.012, 6, n]} /></mesh>)}
    {vals.map((_, i) => { const [x, y] = P(i, 1); return <mesh key={i} material={grid} position={[x / 2, y / 2, 0]} rotation={[0, 0, Math.atan2(y, x) + Math.PI / 2]}><boxGeometry args={[0.02, r, 0.02]} /></mesh>; })}
    <mesh geometry={geo} castShadow><meshPhysicalMaterial color="#1F5BD8" roughness={0.2} clearcoat={1} transparent opacity={0.88} emissive="#1F5BD8" emissiveIntensity={0.2} /></mesh>
    {labels.map(([l, c], i) => { const [x, y] = P(i, 1.32); return <Tag key={l} txt={l} bg={c} pos={[x, y, 0.2]} w={1.9} s={vals[i] > 0.05 ? 1 : 0} />; })}
  </group>;
};

/* ═════════════ Histogramme en volume ═════════════ */
export const Bars3D: React.FC<{k: number; pos: V3; n?: number; c?: string}> = ({k, pos, n = 5, c = '#14A35A'}) => {
  const m = useMemo(() => phys(c, {emissive: new THREE.Color(c), emissiveIntensity: 0.1}), [c]);
  return <group position={pos}>
    {Array.from({length: n}, (_, i) => { const h = (0.5 + i * 0.45) * eo(k * n - i); return h > 0.01 ? <mesh key={i} material={m} position={[(i - (n - 1) / 2) * 0.55, h / 2, 0]} castShadow receiveShadow><boxGeometry args={[0.42, h, 0.42]} /></mesh> : null; })}
    {k > 0.7 && <GrowTube pts={[[-1.4, 0.8, 0.4], [0, 1.6, 0.4], [1.5, 2.6, 0.4]]} k={(k - 0.7) / 0.3} r={0.06} c="#D7263D" glow={0.4} />}
  </group>;
};

/* ═════════════ Anneau parcouru par un jeton ═════════════ */
export const LoopTrack: React.FC<{u: number; k: number; stations: [string, string][]; pos: V3; R?: number; speed?: number}> = ({u, k, stations, pos, R = 1.8, speed = 0.18}) => {
  const ring = useMemo(() => phys('#DCE3EE', {roughness: 0.5}), []);
  const tok = useMemo(() => phys('#C99A06', {metalness: 0.8, roughness: 0.2, emissive: new THREE.Color('#C99A06'), emissiveIntensity: 0.3}), []);
  const ph = (u * speed) % 1;
  const a = Math.PI / 2 - ph * Math.PI * 2;
  return <group position={pos}>
    <mesh material={ring} rotation={[Math.PI / 2, 0, 0]} receiveShadow><torusGeometry args={[R, 0.08, 16, 120]} /></mesh>
    <mesh rotation={[Math.PI / 2, 0, -Math.PI / 2]}><torusGeometry args={[R, 0.1, 16, 120, Math.PI * 2 * k]} /><meshStandardMaterial color="#C99A06" emissive="#C99A06" emissiveIntensity={0.5} /></mesh>
    {k > 0.98 && <mesh material={tok} position={[Math.cos(a) * R, 0.2, -Math.sin(a) * R]} castShadow><sphereGeometry args={[0.2, 32, 16]} /></mesh>}
    {stations.map(([l, c], i) => { const sa = Math.PI / 2 - (i / stations.length) * Math.PI * 2; const on = k > i / stations.length + 0.05; const near = k > 0.98 ? Math.max(0, 1 - Math.abs(((ph - i / stations.length + 1.5) % 1) - 0.5) * 10) : 0; return on ? <Tag key={l} txt={l} bg={c} pos={[Math.cos(sa) * (R + 0.15), 0.55 + near * 0.25, -Math.sin(sa) * (R + 0.15)]} w={1.7} rot={[-0.5, 0, 0]} s={1 + 0.15 * near} /> : null; })}
  </group>;
};

/* ═════════════ Éventail de cartes de mission ═════════════ */
export const CardFan: React.FC<{u: number; cards: [number, string, string, string][]; pos: V3}> = ({u, cards, pos}) => {
  const cur = cards.reduce((acc, c, i) => (u >= c[0] ? i : acc), -1);
  return <group position={pos}>
    {cards.map(([a, t, sub, c], i) => {
      if (u < a - 0.05) return null;
      const k = eo((u - a) / 0.7);
      const done = i < cur;
      const slot = i - cur;
      const fanA = done ? -0.95 + (i / Math.max(1, cards.length - 1)) * 0.4 : 0;
      const tx = done ? -1.2 + i * 0.08 : 0, ty = done ? -2.0 + i * 0.03 : 0.3, tz = done ? -0.6 - (cur - i) * 0.04 : 0.6;
      const fx = 6, fy = 2, fz = 2;
      const x = done ? tx : fx + (tx - fx) * k, y = done ? ty : fy + (ty - fy) * k, z = done ? tz : fz + (tz - fz) * k;
      const rz = done ? fanA : (1 - k) * -0.9, ry = done ? 0.35 : (1 - k) * -1.6;
      void slot;
      return <Tag key={t} txt={t} sub={sub} bg={c} pos={[x, y, z]} rot={[0, ry, rz]} w={done ? 1.9 : 3.1} />;
    })}
  </group>;
};

/* ═════════════ Plateau multi-sites ═════════════ */
export const Sites: React.FC<{u: number; at: number; pos: V3}> = ({u, at, pos}) => {
  const P: V3[] = [[-2.2, 0, 0.6], [0, 0, -1.4], [2.2, 0, 0.7]];
  const base = useMemo(() => phys('#E9EEF5', {roughness: 0.6, clearcoat: 0.2}), []);
  const bld = useMemo(() => phys('#5B6577', {roughness: 0.4}), []);
  const leg = Math.floor(Math.max(0, u - at) / 1.2) % 2;
  const k = (Math.max(0, u - at) / 1.2) % 1;
  const A = P[leg], B = P[leg + 1];
  const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(...A), new THREE.Vector3((A[0] + B[0]) / 2, 1.6, (A[2] + B[2]) / 2), new THREE.Vector3(...B));
  const q = curve.getPoint(eo(k));
  return <group position={pos}>
    {P.map((p, i) => <group key={i} position={p}>
      <mesh material={base} position={[0, 0.05, 0]} receiveShadow castShadow><cylinderGeometry args={[0.75, 0.8, 0.1, 40]} /></mesh>
      {[[-0.25, 0.5], [0.15, 0.8], [0.4, 0.35]].map(([x, h], j) => <mesh key={j} material={bld} position={[x, 0.1 + h / 2, (j - 1) * 0.2]} castShadow><boxGeometry args={[0.28, h, 0.28]} /></mesh>)}
    </group>)}
    {[0, 1].map((i) => <GrowTube key={i} pts={[P[i], [(P[i][0] + P[i + 1][0]) / 2, 1.6, (P[i][2] + P[i + 1][2]) / 2], P[i + 1]]} k={eo((u - at + 0.6 - i * 0.3) / 0.6)} r={0.025} c="#C99A06" />)}
    {u > at && <mesh position={[q.x, q.y + 0.15, q.z]} castShadow><sphereGeometry args={[0.16, 24, 16]} /><meshPhysicalMaterial color="#D7263D" clearcoat={1} emissive="#D7263D" emissiveIntensity={0.3} /></mesh>}
  </group>;
};

/**
 * Pack WebGL « Matrice des risques 4 × 4 » — nouvelles techniques (en plus des packs SwotGL, DangerGL, SafeGL, RqGL…) :
 * - `Dice` : dé en volume aux arêtes arrondies (RoundedBox maison) et points creux, lancé en rotation balistique.
 * - `Knob` : molette de réglage 3D crantée (graduations 1 à 4) dont l'index tourne jusqu'à la valeur choisie.
 * - `Matrix16` : matrice 4 × 4 de colonnes en volume (hauteur = P × G, couleur du vert au rouge), faisceaux de croisement
 *   qui balaient une ligne et une colonne, case cible qui monte et pulse.
 * - `Scaffold` : échafaudage tubulaire (montants, lisses, diagonales, plateaux) généré par code.
 * - `Podium` : trois marches qui montent l'une après l'autre (bien, mieux, indispensable).
 */
import React, {useMemo} from 'react';
import * as THREE from 'three';
import {random} from 'remotion';
import {Tag} from '../respQhseRecordMetro/RqGL';
import {Letter3D, V3} from '../swotRecordMetro/SwotGL';

const cl = (v: number) => Math.min(1, Math.max(0, v));
const eo = (x: number) => 1 - Math.pow(1 - cl(x), 3);
const phys = (c: string, o: Partial<THREE.MeshPhysicalMaterialParameters> = {}) => new THREE.MeshPhysicalMaterial({color: c, roughness: 0.25, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.06, ...o});
export const riskCol = (v: number) => { const stops: [number, string][] = [[1, '#22B573'], [4, '#F5C400'], [8, '#F07A12'], [16, '#E0383E']]; let i = 0; while (i < stops.length - 2 && v > stops[i + 1][0]) i++; const [a, ca] = stops[i], [b, cb] = stops[i + 1]; return new THREE.Color(ca).lerp(new THREE.Color(cb), cl((v - a) / (b - a))); };

/* ═════════════ Dé ═════════════ */
const roundedBox = (() => { let g: THREE.BufferGeometry | null = null; return () => { if (g) return g; const b = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10); const p = b.attributes.position; const v = new THREE.Vector3(); for (let i = 0; i < p.count; i++) { v.fromBufferAttribute(p, i); const inner = v.clone().clampScalar(-0.38, 0.38); const d = v.clone().sub(inner); if (d.length() > 0) d.setLength(0.12); v.copy(inner.add(d)); p.setXYZ(i, v.x, v.y, v.z); } b.computeVertexNormals(); g = b; return g; }; })();
const PIPS: [number, number][][] = [[[0, 0]], [[-1, -1], [1, 1]], [[-1, -1], [0, 0], [1, 1]], [[-1, -1], [1, -1], [-1, 1], [1, 1]], [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]]];
const FACES: [V3, V3][] = [[[0, 0, 0.5], [0, 0, 0]], [[0, 0, -0.5], [0, Math.PI, 0]], [[0.5, 0, 0], [0, Math.PI / 2, 0]], [[-0.5, 0, 0], [0, -Math.PI / 2, 0]], [[0, 0.5, 0], [-Math.PI / 2, 0, 0]], [[0, -0.5, 0], [Math.PI / 2, 0, 0]]];
export const Dice: React.FC<{pos: V3; rot: V3; s?: number}> = ({pos, rot, s = 1}) => {
  const body = useMemo(() => phys('#F7F4EE', {roughness: 0.18}), []);
  const pip = useMemo(() => phys('#1F5BD8', {roughness: 0.3}), []);
  return <group position={pos} rotation={rot} scale={s}>
    <mesh geometry={roundedBox()} material={body} castShadow receiveShadow />
    {FACES.map(([p, r], f) => <group key={f} position={p} rotation={r}>{PIPS[[2, 4, 0, 5, 1, 3][f]].map(([x, y], j) => <mesh key={j} material={pip} position={[x * 0.24, y * 0.24, 0.005]}><sphereGeometry args={[0.075, 16, 12]} /></mesh>)}</group>)}
  </group>;
};
/* ═════════════ Molette crantée ═════════════ */
export const Knob: React.FC<{pos: V3; v: number; c: string; label: string; s?: number}> = ({pos, v, c, label, s = 1}) => {
  const base = useMemo(() => phys('#2B2F3A', {metalness: 0.6, roughness: 0.3}), []);
  const cap = useMemo(() => phys(c, {metalness: 0.3}), [c]);
  const a = Math.PI * 0.75 - ((cl(v) * 3) / 3) * Math.PI * 1.5;
  return <group position={pos} scale={s}>
    <mesh material={base} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow><cylinderGeometry args={[1.25, 1.3, 0.16, 64]} /></mesh>
    {[1, 2, 3, 4].map((n, i) => { const aa = Math.PI * 0.75 - (i / 3) * Math.PI * 1.5; const on = v * 3 >= i - 0.01; return <group key={n}>
      <mesh position={[Math.cos(aa) * 1.05, Math.sin(aa) * 1.05, 0.1]}><boxGeometry args={[0.08, 0.08, 0.06]} /><meshStandardMaterial color={on ? c : '#8A93A3'} emissive={on ? c : '#000'} emissiveIntensity={on ? 0.6 : 0} /></mesh>
      <Tag txt={String(n)} bg={on ? c : '#5B6577'} pos={[Math.cos(aa) * 1.55, Math.sin(aa) * 1.55, 0.05]} w={0.5} />
    </group>; })}
    <group rotation={[0, 0, a]}>
      <mesh material={cap} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.2]} castShadow><cylinderGeometry args={[0.72, 0.78, 0.32, 48]} /></mesh>
      {Array.from({length: 24}, (_, i) => <mesh key={i} material={cap} position={[Math.cos((i / 24) * 6.283) * 0.76, Math.sin((i / 24) * 6.283) * 0.76, 0.2]} rotation={[0, 0, (i / 24) * 6.283]}><boxGeometry args={[0.06, 0.08, 0.3]} /></mesh>)}
      <mesh position={[0.45, 0, 0.38]}><boxGeometry args={[0.36, 0.08, 0.04]} /><meshStandardMaterial color="#ffffff" /></mesh>
    </group>
    <Tag txt={label} bg={c} pos={[0, -1.85, 0.05]} w={2.0} />
  </group>;
};
/* ═════════════ Matrice 4 × 4 en colonnes ═════════════ */
export const Matrix16: React.FC<{u: number; at: number; target?: [number, number]; tq?: number; sweepP?: number; sweepG?: number; heights?: number}> = ({u, at, target, tq = 0, sweepP = -1, sweepG = -1, heights = 1}) => {
  const S = 0.62;
  const cells = useMemo(() => Array.from({length: 16}, (_, i) => ({p: Math.floor(i / 4) + 1, g: (i % 4) + 1})), []);
  const mats = useMemo(() => cells.map(({p, g}) => new THREE.MeshPhysicalMaterial({color: riskCol(p * g), emissive: riskCol(p * g), emissiveIntensity: 0.05, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.06})), [cells]);
  return <group>
    {cells.map(({p, g}, i) => {
      const a = at + (p + g) * 0.06 + random(`mx${i}`) * 0.1;
      const k = eo((u - a) / 0.7);
      const isT = target && target[0] === p && target[1] === g;
      const h = Math.max(0.03, ((p * g) / 16) * 1.9 * k * heights) + (isT ? tq * 1.2 : 0);
      const lit = Math.max(sweepP === p ? 1 : 0, sweepG === g ? 1 : 0);
      const m = mats[i]; m.emissiveIntensity = 0.05 + lit * 0.5 + (isT ? tq * (0.5 + 0.4 * Math.sin(u * 9)) : 0);
      return <mesh key={i} material={m} position={[(g - 2.5) * S, h / 2, (2.5 - p) * S]} castShadow receiveShadow scale={[S * 0.88, h, S * 0.88]}><boxGeometry args={[1, 1, 1]} /></mesh>;
    })}
    {[1, 2, 3, 4].map((n) => <Letter3D key={`g${n}`} ch={String(n)} c="#D7263D" k="black" pos={[(n - 2.5) * S, 0.25, 1.75 * S + 0.45]} rot={[-0.9, 0, 0]} s={0.38} />)}
    {[1, 2, 3, 4].map((n) => <Letter3D key={`p${n}`} ch={String(n)} c="#1F5BD8" k="black" pos={[-1.75 * S - 0.45, 0.25, (2.5 - n) * S]} rot={[-0.9, 0, 0]} s={0.38} />)}
  </group>;
};
/* ═════════════ Échafaudage ═════════════ */
export const Scaffold: React.FC<{pos: V3; levels?: number; grow?: number}> = ({pos, levels = 4, grow = 1}) => {
  const tube = useMemo(() => phys('#B8C0CC', {metalness: 0.85, roughness: 0.3}), []);
  const deck = useMemo(() => phys('#C0392B', {roughness: 0.5, clearcoat: 0.3}), []);
  const H = 1.0, W = 2.2, D = 1.2;
  const shown = levels * cl(grow);
  return <group position={pos}>
    {[-W / 2, W / 2].flatMap((x) => [-D / 2, D / 2].map((z) => <mesh key={`${x}${z}`} material={tube} position={[x, (shown * H) / 2, z]} castShadow><cylinderGeometry args={[0.04, 0.04, Math.max(0.01, shown * H), 10]} /></mesh>))}
    {Array.from({length: levels}, (_, l) => { const k = cl(shown - l); if (k <= 0) return null; const y = (l + 1) * H; return <group key={l} scale={[1, k, 1]}>
      {[-D / 2, D / 2].map((z) => <mesh key={z} material={tube} position={[0, y, z]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.035, 0.035, W, 8]} /></mesh>)}
      <mesh material={tube} position={[0, y - H / 2, D / 2]} rotation={[0, 0, Math.atan2(H, W)]}><cylinderGeometry args={[0.03, 0.03, Math.hypot(W, H), 8]} /></mesh>
      <mesh material={deck} position={[0, y + 0.03, 0]} castShadow receiveShadow><boxGeometry args={[W + 0.1, 0.06, D]} /></mesh>
    </group>; })}
  </group>;
};
/* ═════════════ Podium à trois marches ═════════════ */
export const Podium: React.FC<{steps: [number, string, string][]; u: number; pos: V3}> = ({steps, u, pos}) => (
  <group position={pos}>{steps.map(([a, l, c], i) => { const k = eo((u - a) / 0.6); const h = (0.6 + i * 0.6) * Math.max(0.01, k); return <group key={l}>
    <mesh position={[(i - 1) * 1.45, h / 2, 0]} castShadow receiveShadow><boxGeometry args={[1.35, h, 1.2]} /><meshPhysicalMaterial color={c} roughness={0.3} clearcoat={1} /></mesh>
    {k > 0.3 && <Tag txt={l} bg={c} pos={[(i - 1) * 1.45, h + 0.35, 0.3]} w={1.4} s={eo((k - 0.3) / 0.7)} />}
  </group>; })}</group>
);

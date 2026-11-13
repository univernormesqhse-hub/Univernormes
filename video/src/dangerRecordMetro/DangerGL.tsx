/**
 * Pack WebGL « Danger ou risque ? » — nouvelles techniques (en plus du pack SwotGL) :
 * - `GLStageS` : scène three.js avec ombres portées en temps réel (shadow maps PCF douces).
 * - `Cup` : gobelet tourné en volume (LatheGeometry) en matériau vernis, mot extrudé en façade.
 * - `BrickWall` : mur de briques instanciées qui tombent une à une.
 * - `GlassJar` : cloche de verre physique transparente (transmission, IOR) sur socle.
 * - `Bolt3D` : éclair extrudé émissif qui scintille, entouré d'arcs électriques procéduraux régénérés à chaque image.
 * - `Stairs` : escalier en volume ; `Figure` : personnage 3D articulé (marche, électrocution, chute).
 * - `Sparks` : gerbe d'étincelles balistiques ; `Meter` : vu-mètre 3D en segments instanciés.
 */
import React, {useLayoutEffect, useMemo} from 'react';
import {useThree} from '@react-three/fiber';
import {ThreeCanvas} from '@remotion/three';
import {random} from 'remotion';
import * as THREE from 'three';
import {glyphGeo, gpg, V3} from '../swotRecordMetro/SwotGL';

const cl = (v: number) => Math.min(1, Math.max(0, v));
const lp = (a: number, b: number, k: number) => a + (b - a) * k;
const eio = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const back = (x: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };

const ShadowSetup: React.FC = () => {
  const {gl} = useThree();
  useLayoutEffect(() => { gl.toneMapping = THREE.NeutralToneMapping; gl.shadowMap.enabled = true; gl.shadowMap.type = THREE.PCFSoftShadowMap; }, [gl]);
  return null;
};
export const GLStageS: React.FC<{children: React.ReactNode; z?: number; fov?: number}> = ({children, z = 5, fov = 35}) => (
  <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, zIndex: z, pointerEvents: 'none', overflow: 'hidden'}}>
    <ThreeCanvas width={1080} height={1920} shadows camera={{position: [0, 1, 10], fov, near: 0.1, far: 200}} gl={{antialias: true, preserveDrawingBuffer: true, alpha: true}}>
      <ShadowSetup />
      {children}
    </ThreeCanvas>
  </div>
);
/** Lumière principale qui projette des ombres douces. */
export const KeyLight: React.FC<{pos?: V3; k?: number; target?: V3}> = ({pos = [4, 8, 6], k = 2.4, target = [0, 0, 0]}) => {
  const light = useMemo(() => { const l = new THREE.DirectionalLight('#FFF1DC', k); l.castShadow = true; l.shadow.mapSize.set(2048, 2048); l.shadow.radius = 6; l.shadow.bias = -0.0004; const c = l.shadow.camera as THREE.OrthographicCamera; c.left = -6; c.right = 6; c.top = 6; c.bottom = -6; c.near = 0.5; c.far = 40; return l; }, []);
  light.position.set(...pos); light.intensity = k; light.target.position.set(...target); light.target.updateMatrixWorld();
  return <><primitive object={light} /><primitive object={light.target} /></>;
};
/** Sol qui ne reçoit que l'ombre (invisible ailleurs, le papier reste visible). */
export const ShadowFloor: React.FC<{y?: number; op?: number; size?: number}> = ({y = 0, op = 0.28, size = 30}) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]} receiveShadow><planeGeometry args={[size, size]} /><shadowMaterial transparent opacity={op} /></mesh>
);
const phys = (c: string, o: Partial<THREE.MeshPhysicalMaterialParameters> = {}) => new THREE.MeshPhysicalMaterial({color: c, roughness: 0.22, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.06, ...o});

/* ═════════════ Gobelet tourné + mot extrudé ═════════════ */
const CUP_GEO = (() => { let g: THREE.LatheGeometry | null = null; return () => g ?? (g = new THREE.LatheGeometry([[0, 0], [0.5, 0], [0.54, 0.05], [0.66, 1.15], [0.72, 1.2], [0.74, 1.26], [0.6, 1.26], [0, 1.2]].map(([x, y]) => new THREE.Vector2(x, y)), 72)); })();
export const Cup: React.FC<{c: string; word: string; pos: V3; rot?: V3; s?: number}> = ({c, word, pos, rot = [0, 0, 0], s = 1}) => {
  const mat = useMemo(() => phys(c), [c]);
  const wm = useMemo(() => new THREE.MeshPhysicalMaterial({color: '#ffffff', roughness: 0.3, clearcoat: 1}), []);
  const wg = glyphGeo(word, 'black', 0.08);
  return <group position={pos} rotation={rot} scale={s}>
    <mesh geometry={CUP_GEO()} material={mat} castShadow receiveShadow />
    <mesh geometry={wg} material={wm} position={[0, 0.66, 0.66]} rotation={[-0.1, 0, 0]} scale={0.16} castShadow />
  </group>;
};
/* ═════════════ Mur de briques instanciées ═════════════ */
export const BrickWall: React.FC<{u: number; at: number; pos: V3; rows?: number; cols?: number}> = ({u, at, pos, rows = 9, cols = 2}) => {
  const cnt = rows * cols;
  const mesh = useMemo(() => { const m = new THREE.InstancedMesh(new THREE.BoxGeometry(0.42, 0.2, 0.3), phys('#B4532A', {roughness: 0.6, clearcoat: 0.1}), cnt); m.castShadow = true; m.receiveShadow = true; m.frustumCulled = false; return m; }, [cnt]);
  useLayoutEffect(() => {
    const o = new THREE.Object3D();
    for (let i = 0; i < cnt; i++) {
      const r = Math.floor(i / cols), c = i % cols;
      const a = at + r * 0.07 + c * 0.03;
      const k = back(gpg(u, a, a + 0.35)), k0 = gpg(u, a, a + 0.35);
      const x = (c - (cols - 1) / 2) * 0.44 + (r % 2 ? 0.11 : -0.11), y = 0.1 + r * 0.21;
      o.position.set(x, lp(y + 7, y, k), 0); o.rotation.set(0, 0, (1 - k0) * (random(`bw${i}`) - 0.5) * 2); o.scale.setScalar(k0 > 0 ? 1 : 0.0001);
      o.updateMatrix(); mesh.setMatrixAt(i, o.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });
  return <primitive object={mesh} position={pos} />;
};
/* ═════════════ Cloche de verre sur socle ═════════════ */
export const GlassJar: React.FC<{pos: V3; children?: React.ReactNode; s?: number}> = ({pos, children, s = 1}) => {
  const glass = useMemo(() => new THREE.MeshPhysicalMaterial({color: '#ffffff', roughness: 0.04, metalness: 0, transmission: 1, thickness: 0.25, ior: 1.5, transparent: true, opacity: 1, clearcoat: 1, envMapIntensity: 1.2, side: THREE.DoubleSide}), []);
  const base = useMemo(() => phys('#F4F1EA', {roughness: 0.35, clearcoat: 0.6}), []);
  const rim = useMemo(() => phys('#2B2F3A', {metalness: 0.6, roughness: 0.25}), []);
  return <group position={pos} scale={s}>
    <mesh position={[0, -0.65, 0]} material={base} castShadow receiveShadow><boxGeometry args={[1.5, 1.3, 1.5]} /></mesh>
    <mesh position={[0, 0.03, 0]} material={rim} castShadow receiveShadow><cylinderGeometry args={[0.72, 0.76, 0.08, 64]} /></mesh>
    {children}
    <mesh position={[0, 0.85, 0]} material={glass}><cylinderGeometry args={[0.62, 0.62, 1.6, 64, 1, true]} /></mesh>
    <mesh position={[0, 1.65, 0]} material={glass}><sphereGeometry args={[0.62, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} /></mesh>
  </group>;
};
/* ═════════════ Éclair extrudé + arcs électriques procéduraux ═════════════ */
const BOLT = (() => { let g: THREE.ExtrudeGeometry | null = null; return () => { if (g) return g; const s = new THREE.Shape(); [[0.12, 0.8], [-0.3, 0.02], [-0.02, 0.02], [-0.16, -0.8], [0.3, 0.08], [0.02, 0.08], [0.2, 0.8]].forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y))); s.closePath(); g = new THREE.ExtrudeGeometry(s, {depth: 0.14, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03, bevelSegments: 4}); g.center(); return g; }; })();
export const Bolt3D: React.FC<{u: number; pos: V3; s: number; arcs?: number; c?: string}> = ({u, pos, s, arcs = 1, c = '#FFC21A'}) => {
  const mat = useMemo(() => new THREE.MeshPhysicalMaterial({color: c, emissive: new THREE.Color(c), emissiveIntensity: 0.6, roughness: 0.2, clearcoat: 1, metalness: 0.2}), [c]);
  const f = Math.floor(u * 30);
  mat.emissiveIntensity = 0.5 + 0.5 * random(`bf${f}`);
  const arcGeo = useMemo(() => new THREE.BufferGeometry(), []);
  const lm = useMemo(() => new THREE.LineBasicMaterial({color: '#BFE9FF', transparent: true, blending: THREE.AdditiveBlending, depthWrite: false}), []);
  const pts: number[] = [];
  if (arcs > 0) for (let a = 0; a < 5; a++) {
    let x = (random(`ax${f}${a}`) - 0.5) * 0.4, y = (random(`ay${f}${a}`) - 0.5) * 1.4, z = 0.1;
    const dx = (random(`ad${f}${a}`) - 0.5) * 0.2, dy = (random(`ae${f}${a}`) - 0.5) * 0.2;
    for (let k = 0; k < 9; k++) { const nx = x + dx + (random(`an${f}${a}${k}`) - 0.5) * 0.28, ny = y + dy + (random(`am${f}${a}${k}`) - 0.5) * 0.28, nz = z + (random(`az${f}${a}${k}`) - 0.5) * 0.2; pts.push(x, y, z, nx, ny, nz); x = nx; y = ny; z = nz; }
  }
  arcGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  lm.opacity = arcs;
  return <group position={pos} scale={s}>
    <mesh geometry={BOLT()} material={mat} rotation={[0, Math.sin(u * 1.5) * 0.4, 0]} castShadow />
    <lineSegments geometry={arcGeo} material={lm} />
    <pointLight color={c} intensity={6 * arcs * (0.6 + 0.4 * random(`bl${f}`))} distance={4} />
  </group>;
};
/* ═════════════ Escalier ═════════════ */
export const Stairs: React.FC<{pos: V3; n?: number; s?: number; grow?: number; c?: string; rot?: V3}> = ({pos, n = 5, s = 1, grow = 1, c = '#C5CCD8', rot = [0, 0, 0]}) => {
  const mat = useMemo(() => phys(c, {roughness: 0.4, clearcoat: 0.4}), [c]);
  return <group position={pos} scale={s} rotation={rot}>{Array.from({length: n}, (_, i) => { const h = (i + 1) * 0.3 * cl(grow * n - i); return h > 0.001 ? <mesh key={i} position={[(i - (n - 1) / 2) * 0.36, h / 2, 0]} material={mat} castShadow receiveShadow><boxGeometry args={[0.36, h, 0.9]} /></mesh> : null; })}</group>;
};
/* ═════════════ Personnage 3D articulé ═════════════ */
const FIG_GEO = (() => { let g: {head: THREE.SphereGeometry; limb: THREE.CapsuleGeometry; body: THREE.CapsuleGeometry} | null = null; return () => g ?? (g = {head: new THREE.SphereGeometry(0.17, 32, 16), limb: new THREE.CapsuleGeometry(0.055, 0.42, 6, 12), body: new THREE.CapsuleGeometry(0.11, 0.5, 8, 16)}); })();
/** `walk` = phase de marche, `zap` 0 → 1 = électrocution (secousse, rouge), `fall` 0 → 1 = bascule. */
export const Figure: React.FC<{pos: V3; rot?: V3; walk?: number; zap?: number; fall?: number; u: number; c?: string; s?: number}> = ({pos, rot = [0, 0, 0], walk = 0, zap = 0, fall = 0, u, c = '#1B2433', s = 1}) => {
  const G = FIG_GEO();
  const mat = useMemo(() => phys(c, {roughness: 0.35}), [c]);
  mat.color.set(c).lerp(new THREE.Color('#E5242B'), zap); mat.emissive.set('#FFD23F'); mat.emissiveIntensity = zap * (0.3 + 0.7 * random(`fz${Math.floor(u * 30)}`));
  const sw = Math.sin(walk * Math.PI * 2) * 0.6;
  const jit = zap > 0 ? (random(`fj${Math.floor(u * 30)}`) - 0.5) * 0.12 * zap : 0;
  const arm = zap > 0 ? -2.6 * zap : sw;
  return <group position={[pos[0] + jit, pos[1], pos[2]]} rotation={[rot[0], rot[1], rot[2] - fall * 1.9]} scale={s}>
    <mesh geometry={G.head} material={mat} position={[0, 1.42, 0]} castShadow />
    <mesh geometry={G.body} material={mat} position={[0, 0.98, 0]} castShadow />
    <group position={[-0.17, 1.18, 0]} rotation={[arm, 0, 0.15 + zap * 0.6]}><mesh geometry={G.limb} material={mat} position={[0, -0.25, 0]} castShadow /></group>
    <group position={[0.17, 1.18, 0]} rotation={[-arm, 0, -0.15 - zap * 0.6]}><mesh geometry={G.limb} material={mat} position={[0, -0.25, 0]} castShadow /></group>
    <group position={[-0.08, 0.62, 0]} rotation={[-sw + fall * 0.8, 0, 0]}><mesh geometry={G.limb} material={mat} position={[0, -0.27, 0]} castShadow /></group>
    <group position={[0.08, 0.62, 0]} rotation={[sw - fall * 0.5, 0, 0]}><mesh geometry={G.limb} material={mat} position={[0, -0.27, 0]} castShadow /></group>
  </group>;
};
/* ═════════════ Gerbe d'étincelles balistiques ═════════════ */
export const Sparks: React.FC<{u: number; at: number; pos: V3; n?: number; c?: string}> = ({u, at, pos, n = 140, c = '#FFD54A'}) => {
  const k = u - at;
  const geo = useMemo(() => new THREE.BufferGeometry(), []);
  const mat = useMemo(() => new THREE.PointsMaterial({color: c, size: 0.07, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false}), [c]);
  if (k < 0 || k > 1.4) return null;
  const p: number[] = [];
  for (let i = 0; i < n; i++) { const a = random(`sp${i}`) * Math.PI * 2, e = random(`se${i}`) * 1.2 + 0.2, v = 2 + random(`sv${i}`) * 3; p.push(Math.cos(a) * Math.cos(e) * v * k, Math.sin(e) * v * k - 4.9 * k * k, Math.sin(a) * Math.cos(e) * v * k); }
  geo.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
  mat.opacity = 1 - k / 1.4;
  return <points geometry={geo} material={mat} position={pos} frustumCulled={false} />;
};
/* ═════════════ Vu-mètre 3D en segments instanciés ═════════════ */
export const Meter: React.FC<{pos: V3; v: number; c: string; n?: number; u: number}> = ({pos, v, c, n = 14, u}) => {
  const mesh = useMemo(() => { const m = new THREE.InstancedMesh(new THREE.BoxGeometry(0.62, 0.15, 0.4), new THREE.MeshPhysicalMaterial({color: '#ffffff', roughness: 0.3, clearcoat: 0.8, emissive: '#ffffff', emissiveIntensity: 0}), n); m.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(n * 3), 3); m.castShadow = true; m.frustumCulled = false; return m; }, [n]);
  const frame = useMemo(() => phys('#232733', {metalness: 0.5, roughness: 0.3}), []);
  useLayoutEffect(() => {
    const o = new THREE.Object3D(), col = new THREE.Color(), off = new THREE.Color('#D9DEE7'), on = new THREE.Color(c);
    for (let i = 0; i < n; i++) {
      const lit = cl(v * n - i);
      o.position.set(0, 0.15 + i * 0.19, 0); o.scale.set(1, 1, 1 + 0.25 * lit); o.updateMatrix(); mesh.setMatrixAt(i, o.matrix);
      col.copy(off).lerp(on, lit); if (lit > 0.5 && i === Math.floor(v * n - 0.01)) col.lerp(new THREE.Color('#ffffff'), 0.25 + 0.25 * Math.sin(u * 12));
      mesh.setColorAt(i, col);
    }
    mesh.instanceMatrix.needsUpdate = true; if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });
  return <group position={pos}>
    <mesh material={frame} position={[0, n * 0.095 + 0.07, -0.12]} castShadow receiveShadow><boxGeometry args={[0.86, n * 0.19 + 0.3, 0.2]} /></mesh>
    <primitive object={mesh} />
  </group>;
};
export {eio as dEio, back as dBack};

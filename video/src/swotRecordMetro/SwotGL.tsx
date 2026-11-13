/**
 * Pack WebGL de la capsule SWOT « record » — techniques inédites dans le dépôt :
 * - `GLStage` : scène three.js (ThreeCanvas) transparente posée sur le papier, résolution réglable (rendu ½ puis agrandi).
 * - `Env` : éclairage d'environnement physique (RoomEnvironment → PMREM) pour des reflets réalistes.
 * - `Letter3D` : lettres extrudées et biseautées (TextGeometry, police convertie en JSON typeface) en matériau
 *   physique vernis (clearcoat + iridescence).
 * - `ParticleMorph` : nuée de particules GPU (BufferGeometry + shaders GLSL) qui se métamorphose de forme en forme
 *   (nuage → mot → matrice → boussole…) avec retard par particule et tourbillon de bruit.
 * - `CubeMatrix` : matrice 2 × 2 en milliers de cubes instanciés (InstancedMesh) qui s'assemblent, se soulèvent
 *   et changent de couleur en vague.
 * - `PhotoFX` : photos du dépôt dans un shader de transition (dissolution brûlée, onde liquide, glissé RVB, tourbillon).
 * - `Membrane` : sphère de verre à effet Fresnel (shader) avec orbites intérieures / extérieures de particules.
 * - `InkWipe` : transition plein écran d'encre liquide au bord bruité (shader).
 * - `project` : projection 3D → écran pour poser les étiquettes DOM exactement sur les objets 3D.
 */
import React, {useLayoutEffect, useMemo} from 'react';
import {useLoader, useThree} from '@react-three/fiber';
import {ThreeCanvas} from '@remotion/three';
import {random, staticFile} from 'remotion';
import * as THREE from 'three';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
import {Font, FontLoader} from 'three/examples/jsm/loaders/FontLoader.js';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js';
import BLACK_JSON from './montserrat-black.typeface.json';
import SERIF_JSON from './caladea-bold.typeface.json';

export type V3 = [number, number, number];
export const SWC = {S: '#14A35A', W: '#F07D1A', O: '#2563EB', T: '#D7263D', N: '#0B2E6B', G: '#E9B949', P: '#7C3AED'};
export const SW4 = [SWC.S, SWC.W, SWC.O, SWC.T];
const cl = (v: number) => Math.min(1, Math.max(0, v));
export const gpg = (u: number, a: number, b: number) => cl((u - a) / (b - a));
export const geo3 = (x: number) => 1 - Math.pow(1 - x, 3);
export const gio = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const gback = (x: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lp = (a: number, b: number, k: number) => a + (b - a) * k;
const lv = (a: V3, b: V3, k: number): V3 => [lp(a[0], b[0], k), lp(a[1], b[1], k), lp(a[2], b[2], k)];

/* ═════════════ Scène, caméra, environnement ═════════════ */
export const GLStage: React.FC<{children: React.ReactNode; res?: number; z?: number; fov?: number; style?: React.CSSProperties}> = ({children, res = 1, z = 5, fov = 35, style}) => (
  <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, zIndex: z, pointerEvents: 'none', overflow: 'hidden', ...style}}>
    <div style={{width: Math.round(1080 * res), height: Math.round(1920 * res), transform: `scale(${1 / res})`, transformOrigin: '0 0'}}>
      <ThreeCanvas width={Math.round(1080 * res)} height={Math.round(1920 * res)} camera={{position: [0, 0, 12], fov, near: 0.1, far: 400}} gl={{antialias: true, preserveDrawingBuffer: true, alpha: true}}>
        <ToneMap />
        {children}
      </ThreeCanvas>
    </div>
  </div>
);
const ToneMap: React.FC = () => {
  const {gl} = useThree();
  useLayoutEffect(() => { gl.toneMapping = THREE.NeutralToneMapping; gl.toneMappingExposure = 1.0; }, [gl]);
  return null;
};
export const Env: React.FC = () => {
  const {gl, scene} = useThree();
  useLayoutEffect(() => {
    const pm = new THREE.PMREMGenerator(gl);
    const rt = pm.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = rt.texture;
    return () => { scene.environment = null; rt.dispose(); pm.dispose(); };
  }, [gl, scene]);
  return null;
};
export const Cam: React.FC<{p: V3; at: V3; fov?: number; roll?: number}> = ({p, at, fov = 35, roll = 0}) => {
  const {camera} = useThree();
  useLayoutEffect(() => {
    const c = camera as THREE.PerspectiveCamera;
    c.position.set(...p); c.up.set(Math.sin(roll), Math.cos(roll), 0); c.lookAt(...at); c.fov = fov; c.updateProjectionMatrix();
  });
  return null;
};
/** Images clés de caméra : [instant, position, cible, champ]. */
export type CK = [number, V3, V3, number];
export const camKF = (u: number, K: CK[]) => {
  let i = 0;
  while (i < K.length - 2 && u > K[i + 1][0]) i++;
  const [a, pa, ta, fa] = K[i], [b, pb, tb, fb] = K[Math.min(K.length - 1, i + 1)];
  const e = b > a ? gio(gpg(u, a, b)) : 1;
  return {p: lv(pa, pb, e), at: lv(ta, tb, e), fov: lp(fa, fb, e)};
};
/** Projection d'un point 3D vers l'écran 1080 × 1920 (pour poser des étiquettes DOM sur la 3D). */
export const project = (pt: V3, cam: {p: V3; at: V3; fov: number}): [number, number, number] => {
  const c = new THREE.PerspectiveCamera(cam.fov, 1080 / 1920, 0.1, 400);
  c.position.set(...cam.p); c.lookAt(...cam.at); c.updateMatrixWorld(); c.updateProjectionMatrix();
  const v = new THREE.Vector3(...pt).project(c);
  return [(v.x + 1) * 540, (1 - v.y) * 960, v.z];
};
export const Lights: React.FC<{k?: number; warm?: string; cool?: string}> = ({k = 1, warm = '#FFE2B8', cool = '#BFD8FF'}) => (
  <>
    <ambientLight intensity={0.35 * k} />
    <directionalLight position={[4, 6, 8]} intensity={2.2 * k} color={warm} />
    <directionalLight position={[-6, -2, 4]} intensity={0.9 * k} color={cool} />
    <pointLight position={[0, 0, -6]} intensity={30 * k} distance={30} color="#ffffff" />
  </>
);

/* ═════════════ Lettres 3D extrudées ═════════════ */
const FONTS: Partial<Record<'black' | 'serif', Font>> = {};
const font = (k: 'black' | 'serif') => FONTS[k] ?? (FONTS[k] = new FontLoader().parse((k === 'black' ? BLACK_JSON : SERIF_JSON) as never));
const GEO = new Map<string, THREE.BufferGeometry>();
export const glyphGeo = (ch: string, k: 'black' | 'serif' = 'black', depth = 0.42) => {
  const key = `${k}|${ch}|${depth}`;
  let g = GEO.get(key);
  if (!g) {
    g = new TextGeometry(ch, {font: font(k), size: 1, depth, curveSegments: 14, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.045, bevelOffset: 0, bevelSegments: 6});
    g.computeBoundingBox();
    const b = g.boundingBox!;
    g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2);
    GEO.set(key, g);
  }
  return g;
};
export const Letter3D: React.FC<{ch: string; c: string; pos: V3; rot?: V3; s?: number; op?: number; k?: 'black' | 'serif'; glow?: number; metal?: number}> = ({ch, c, pos, rot = [0, 0, 0], s = 1, op = 1, k = 'black', glow = 0, metal = 0.18}) => {
  const geo = glyphGeo(ch, k);
  const mat = useMemo(() => new THREE.MeshPhysicalMaterial({color: c, metalness: metal, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.05, iridescence: 0.2, iridescenceIOR: 1.5, envMapIntensity: 1.0, transparent: true, emissive: new THREE.Color(c)}), [c, metal]);
  mat.opacity = op; mat.emissiveIntensity = glow; mat.depthWrite = op > 0.98;
  return <mesh geometry={geo} material={mat} position={pos} rotation={rot} scale={s} visible={op > 0.003 && s > 0.001} />;
};
/** Ombre de contact douce (texture radiale générée). */
const blobTex = (() => { let t: THREE.Texture | null = null; return () => { if (t) return t; const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d')!; const r = g.createRadialGradient(64, 64, 4, 64, 64, 62); r.addColorStop(0, 'rgba(11,20,40,0.55)'); r.addColorStop(1, 'rgba(11,20,40,0)'); g.fillStyle = r; g.fillRect(0, 0, 128, 128); t = new THREE.CanvasTexture(c); return t; }; })();
export const Blob: React.FC<{pos: V3; s: number; op?: number}> = ({pos, s, op = 1}) => (
  <mesh position={pos} rotation={[-Math.PI / 2, 0, 0]} scale={[s, s * 0.55, 1]}><planeGeometry args={[1, 1]} /><meshBasicMaterial map={blobTex()} transparent opacity={op} depthWrite={false} /></mesh>
);

/* ═════════════ Échantillonnage de formes (points) ═════════════ */
type Pts = {p: Float32Array; c: Float32Array};
const hexRGB = (h: string) => { const c = new THREE.Color(h); return [c.r, c.g, c.b]; };
const sampleTri = (tri: number[][], n: number, seed: string, z = 0.25) => {
  const area = tri.map(([ax, ay, bx, by, cx, cy]) => Math.abs((bx - ax) * (cy - ay) - (cx - ax) * (by - ay)) / 2);
  const tot = area.reduce((a, b) => a + b, 0);
  const cum: number[] = []; area.reduce((a, b, i) => (cum[i] = a + b), 0);
  const out: number[][] = [];
  for (let i = 0; i < n; i++) {
    const r = random(`${seed}a${i}`) * tot;
    let lo = 0, hi = cum.length - 1;
    while (lo < hi) { const m = (lo + hi) >> 1; if (cum[m] < r) lo = m + 1; else hi = m; }
    const [ax, ay, bx, by, cx, cy] = tri[lo];
    let u = random(`${seed}u${i}`), v = random(`${seed}v${i}`);
    if (u + v > 1) { u = 1 - u; v = 1 - v; }
    out.push([ax + u * (bx - ax) + v * (cx - ax), ay + u * (by - ay) + v * (cy - ay), (random(`${seed}z${i}`) - 0.5) * z]);
  }
  return out;
};
/** Points répartis dans le texte (police 3D), centrés, largeur `w` ; couleur par lettre (`cols`) ou unie. */
export const textPts = (text: string, n: number, w: number, cols: string[], k: 'black' | 'serif' = 'black', y0 = 0): Pts => {
  const f = font(k);
  const shapes = f.generateShapes(text, 1);
  const g = new THREE.ShapeGeometry(shapes, 8);
  const pos = g.attributes.position.array as Float32Array;
  const idx = g.index ? (g.index.array as ArrayLike<number>) : Array.from({length: pos.length / 3}, (_, i) => i);
  const tri: number[][] = [];
  for (let i = 0; i < idx.length; i += 3) { const a = idx[i] * 3, b = idx[i + 1] * 3, c = idx[i + 2] * 3; tri.push([pos[a], pos[a + 1], pos[b], pos[b + 1], pos[c], pos[c + 1]]); }
  g.computeBoundingBox(); const bb = g.boundingBox!;
  const sc = w / (bb.max.x - bb.min.x), cx = (bb.max.x + bb.min.x) / 2, cy = (bb.max.y + bb.min.y) / 2;
  const P = sampleTri(tri, n, `tx${text}`, 0.3 / sc);
  const p = new Float32Array(n * 3), c = new Float32Array(n * 3);
  P.forEach(([x, y, z], i) => {
    p[i * 3] = (x - cx) * sc; p[i * 3 + 1] = (y - cy) * sc + y0; p[i * 3 + 2] = z * sc;
    const li = Math.min(cols.length - 1, Math.floor(((x - bb.min.x) / (bb.max.x - bb.min.x)) * cols.length));
    const [r, gg, b] = hexRGB(cols[li]); c[i * 3] = r; c[i * 3 + 1] = gg; c[i * 3 + 2] = b;
  });
  g.dispose();
  return {p, c};
};
/** Points répartis dans des lettres isolées posées aux centres `ctr` (mêmes centres et taille que `Letter3D`). */
export const lettersPts = (chars: string[], ctr: [number, number][], size: number, n: number, cols: string[], k: 'black' | 'serif' = 'serif'): Pts => {
  const f = font(k);
  const per = Math.floor(n / chars.length);
  const p = new Float32Array(n * 3), c = new Float32Array(n * 3);
  let o = 0;
  chars.forEach((ch, li) => {
    const g = new THREE.ShapeGeometry(f.generateShapes(ch, 1), 8);
    const pos = g.attributes.position.array as Float32Array;
    const idx = g.index ? (g.index.array as ArrayLike<number>) : Array.from({length: pos.length / 3}, (_, i) => i);
    const tri: number[][] = [];
    for (let i = 0; i < idx.length; i += 3) { const a = idx[i] * 3, b = idx[i + 1] * 3, cc = idx[i + 2] * 3; tri.push([pos[a], pos[a + 1], pos[b], pos[b + 1], pos[cc], pos[cc + 1]]); }
    g.computeBoundingBox(); const bb = g.boundingBox!;
    const cx = (bb.max.x + bb.min.x) / 2, cy = (bb.max.y + bb.min.y) / 2;
    const cnt = li === chars.length - 1 ? n - o : per;
    const [r, gg, b] = hexRGB(cols[li % cols.length]);
    sampleTri(tri, cnt, `lp${ch}${li}`, 0.5).forEach(([x, y, z]) => { p[o * 3] = ctr[li][0] + (x - cx) * size; p[o * 3 + 1] = ctr[li][1] + (y - cy) * size; p[o * 3 + 2] = z * size; c[o * 3] = r; c[o * 3 + 1] = gg; c[o * 3 + 2] = b; o++; });
    g.dispose();
  });
  return {p, c};
};
export const cloudPts = (n: number, r: number, cols: string[], seed = 'cl'): Pts => {
  const p = new Float32Array(n * 3), c = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const th = random(`${seed}t${i}`) * Math.PI * 2, ph = Math.acos(2 * random(`${seed}p${i}`) - 1), rr = r * Math.cbrt(random(`${seed}r${i}`));
    p[i * 3] = rr * Math.sin(ph) * Math.cos(th); p[i * 3 + 1] = rr * Math.cos(ph) * 1.6; p[i * 3 + 2] = rr * Math.sin(ph) * Math.sin(th);
    const [a, b, d] = hexRGB(cols[i % cols.length]); c[i * 3] = a; c[i * 3 + 1] = b; c[i * 3 + 2] = d;
  }
  return {p, c};
};
/** Matrice 2 × 2 pleine (quatre carrés), couleurs SWOT ; `s` = demi-taille d'un carré, `g` = demi-espace. */
export const gridPts = (n: number, s: number, g: number, cols = SW4, seed = 'gr'): Pts => {
  const p = new Float32Array(n * 3), c = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const q = i % 4, qx = q % 2 ? 1 : -1, qy = q < 2 ? 1 : -1;
    p[i * 3] = qx * (g + s) + (random(`${seed}x${i}`) - 0.5) * 2 * s; p[i * 3 + 1] = qy * (g + s) + (random(`${seed}y${i}`) - 0.5) * 2 * s; p[i * 3 + 2] = (random(`${seed}z${i}`) - 0.5) * 0.25;
    const [a, b, d] = hexRGB(cols[q]); c[i * 3] = a; c[i * 3 + 1] = b; c[i * 3 + 2] = d;
  }
  return {p, c};
};
/** Boussole / flèche d'orientation stratégique : anneau + aiguille. */
export const compassPts = (n: number, r: number, cols = SW4, seed = 'cp'): Pts => {
  const p = new Float32Array(n * 3), c = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    let x, y; const k = random(`${seed}k${i}`);
    if (k < 0.45) { const a = random(`${seed}a${i}`) * Math.PI * 2, rr = r * (0.9 + random(`${seed}r${i}`) * 0.12); x = Math.cos(a) * rr; y = Math.sin(a) * rr; }
    else { const tt = random(`${seed}t${i}`), wv = (1 - tt) * 0.32 * r * (random(`${seed}w${i}`) - 0.5) * 2, up = k < 0.8; const L = up ? 0.85 * r : 0.6 * r; const d = up ? 1 : -1; const ax = Math.cos(Math.PI / 4) * d, ay = Math.sin(Math.PI / 4) * d; x = ax * tt * L - ay * wv; y = ay * tt * L + ax * wv; }
    p[i * 3] = x; p[i * 3 + 1] = y; p[i * 3 + 2] = (random(`${seed}z${i}`) - 0.5) * 0.2;
    const col = k < 0.45 ? cols[Math.floor(((Math.atan2(y, x) + Math.PI) / (Math.PI * 2)) * 4) % 4] : k < 0.8 ? SWC.T : SWC.N;
    const [a, b, d] = hexRGB(col); c[i * 3] = a; c[i * 3 + 1] = b; c[i * 3 + 2] = d;
  }
  return {p, c};
};

/* ═════════════ Nuée de particules GPU qui se métamorphose ═════════════ */
const NOISE_GLSL = `
vec3 hash3(vec3 p){ p = vec3(dot(p,vec3(127.1,311.7,74.7)), dot(p,vec3(269.5,183.3,246.1)), dot(p,vec3(113.5,271.9,124.6))); return fract(sin(p)*43758.5453)*2.0-1.0; }
vec3 swirl(vec3 p, float t){ return vec3(sin(p.y*1.7+t*1.3)+cos(p.z*1.1-t), sin(p.z*1.3+t*0.9)+cos(p.x*1.5+t*1.1), sin(p.x*1.2-t*0.7)+cos(p.y*1.4+t)); }
`;
const PM_VS = `
attribute vec3 aB; attribute vec3 aC; attribute vec3 aD; attribute vec3 cA; attribute vec3 cB; attribute vec3 cC; attribute vec3 cD; attribute float aDelay; attribute float aSize;
uniform float uStage; uniform float uT; uniform float uSize; uniform float uSwirl; uniform float uScale; uniform float uDrift;
varying vec3 vCol; varying float vA;
${NOISE_GLSL}
float k(float s){ return smoothstep(0.0, 1.0, clamp((uStage - s - aDelay * 0.45) / 0.55, 0.0, 1.0)); }
void main(){
  float k1 = k(0.0), k2 = k(1.0), k3 = k(2.0);
  vec3 p = mix(mix(mix(position, aB, k1), aC, k2), aD, k3);
  vec3 col = mix(mix(mix(cA, cB, k1), cC, k2), cD, k3);
  float tr = sin(k1*3.14159) + sin(k2*3.14159) + sin(k3*3.14159);
  p += swirl(p*0.8 + aDelay*6.0, uT) * (tr * uSwirl + uDrift);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * aSize * (uScale / -mv.z);
  vCol = col; vA = 1.0;
}`;
const PM_FS = `
varying vec3 vCol; varying float vA; uniform float uOp;
void main(){
  vec2 d = gl_PointCoord - 0.5; float r = length(d);
  if (r > 0.5) discard;
  float core = smoothstep(0.5, 0.15, r);
  vec3 c = mix(vCol * 0.75, vCol + vec3(0.25), smoothstep(0.35, 0.0, r));
  gl_FragColor = vec4(c, core * uOp * vA);
}`;
/** `shapes` : 2 à 4 formes de même nombre de points ; `stage` 0 → 3 fait passer de l'une à l'autre. */
export const ParticleMorph: React.FC<{u: number; shapes: Pts[]; stage: number; size?: number; swirl?: number; drift?: number; op?: number; rot?: V3; pos?: V3}> = ({u, shapes, stage, size = 7, swirl = 0.9, drift = 0.02, op = 1, rot = [0, 0, 0], pos = [0, 0, 0]}) => {
  const n = shapes[0].p.length / 3;
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const S = [0, 1, 2, 3].map((i) => shapes[Math.min(i, shapes.length - 1)]);
    g.setAttribute('position', new THREE.BufferAttribute(S[0].p, 3));
    g.setAttribute('aB', new THREE.BufferAttribute(S[1].p, 3)); g.setAttribute('aC', new THREE.BufferAttribute(S[2].p, 3)); g.setAttribute('aD', new THREE.BufferAttribute(S[3].p, 3));
    g.setAttribute('cA', new THREE.BufferAttribute(S[0].c, 3)); g.setAttribute('cB', new THREE.BufferAttribute(S[1].c, 3)); g.setAttribute('cC', new THREE.BufferAttribute(S[2].c, 3)); g.setAttribute('cD', new THREE.BufferAttribute(S[3].c, 3));
    const dl = new Float32Array(n), sz = new Float32Array(n);
    for (let i = 0; i < n; i++) { dl[i] = random(`pmd${i}`); sz[i] = 0.6 + random(`pms${i}`) * 0.8; }
    g.setAttribute('aDelay', new THREE.BufferAttribute(dl, 1)); g.setAttribute('aSize', new THREE.BufferAttribute(sz, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1000);
    return g;
  }, [shapes, n]);
  const mat = useMemo(() => new THREE.ShaderMaterial({vertexShader: PM_VS, fragmentShader: PM_FS, transparent: true, depthWrite: false, uniforms: {uStage: {value: 0}, uT: {value: 0}, uSize: {value: 7}, uSwirl: {value: 0.9}, uScale: {value: 12}, uDrift: {value: 0.02}, uOp: {value: 1}}}), []);
  mat.uniforms.uStage.value = stage; mat.uniforms.uT.value = u; mat.uniforms.uSize.value = size; mat.uniforms.uSwirl.value = swirl; mat.uniforms.uDrift.value = drift; mat.uniforms.uOp.value = op;
  return <points geometry={geo} material={mat} rotation={rot} position={pos} frustumCulled={false} />;
};

/* ═════════════ Matrice en cubes instanciés ═════════════ */
/** `lift[q]` 0 → 1 soulève le quadrant q ; `paint` : couleurs cibles par quadrant (vague de transformation `paintK[q]`). */
export const CubeMatrix: React.FC<{u: number; at: number; N?: number; size?: number; gap?: number; lift?: number[]; dip?: number[]; cols?: string[]; paint?: string[]; paintK?: number[]; glow?: number[]; spread?: number}> = ({u, at, N = 9, size = 1.5, gap = 0.16, lift = [0, 0, 0, 0], dip = [0, 0, 0, 0], cols = SW4, paint, paintK = [0, 0, 0, 0], glow = [0, 0, 0, 0], spread = 1}) => {
  const cnt = 4 * N * N;
  const mesh = useMemo(() => {
    const m = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhysicalMaterial({color: '#ffffff', roughness: 0.42, metalness: 0.05, clearcoat: 0.35, clearcoatRoughness: 0.3, envMapIntensity: 0.75}), cnt);
    m.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(cnt * 3), 3);
    m.frustumCulled = false;
    return m;
  }, [cnt]);
  useLayoutEffect(() => {
    const o = new THREE.Object3D(), c = new THREE.Color(), c2 = new THREE.Color(), w = new THREE.Color('#ffffff');
    const cell = size / N, cs = cell * 0.86;
    for (let i = 0; i < cnt; i++) {
      const q = Math.floor(i / (N * N)), j = i % (N * N), gx = j % N, gy = Math.floor(j / N);
      const qx = q % 2 ? 1 : -1, qy = q < 2 ? 1 : -1;
      const tx = qx * (gap / 2 + size / 2) + (gx - (N - 1) / 2) * cell, tz = -qy * (gap / 2 + size / 2) + (gy - (N - 1) / 2) * cell;
      const d = random(`cmd${i}`), dist = Math.hypot(tx, tz) / (size * 1.5);
      const a0 = at + dist * 0.9 + d * 0.5;
      const k = gback(gpg(u, a0, a0 + 0.9)), k0 = gpg(u, a0, a0 + 0.9);
      const sx = (random(`cmx${i}`) - 0.5) * 30 * spread, sy = 8 + random(`cmy${i}`) * 14 * spread, sz = (random(`cmz${i}`) - 0.5) * 30 * spread;
      const wave = Math.sin(u * 2.2 - (gx + gy) * 0.55) * 0.5 + 0.5;
      const h = cs * (0.5 + 3.2 * lift[q] * (0.55 + 0.45 * wave)) * (1 - 0.7 * dip[q]);
      o.position.set(lp(sx, tx, k), lp(sy, h / 2, k), lp(sz, tz, k));
      o.rotation.set((1 - k0) * (random(`cmr${i}`) * 6), (1 - k0) * (random(`cms${i}`) * 6), 0);
      o.scale.set(cs, Math.max(0.001, h), cs);
      o.updateMatrix(); mesh.setMatrixAt(i, o.matrix);
      const pk = paint ? cl((paintK[q] * (N * 2 + 4) - (gx + gy)) / 4) : 0;
      c.set(cols[q]); if (paint) c.lerp(c2.set(paint[q]), pk);
      if (glow[q] > 0) c.lerp(w, glow[q] * 0.35 * wave);
      mesh.setColorAt(i, c);
    }
    mesh.instanceMatrix.needsUpdate = true; if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });
  return <primitive object={mesh} />;
};

/* ═════════════ Photos dans un shader de transition ═════════════ */
const useTex = (srcs: string[]) => {
  const tex = useLoader(THREE.TextureLoader, srcs.map((x) => staticFile(x)));
  tex.forEach((t) => { if (t.colorSpace !== THREE.NoColorSpace || t.generateMipmaps) { t.colorSpace = THREE.NoColorSpace; t.minFilter = THREE.LinearFilter; t.generateMipmaps = false; t.needsUpdate = true; } });
  return tex;
};
const PF_VS = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const PF_FS = `
varying vec2 vUv; uniform sampler2D tA; uniform sampler2D tB; uniform float uP; uniform float uMode; uniform float uT; uniform float uReveal; uniform float uPA; uniform float uAA; uniform float uAB; uniform float uZoom;
float h21(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
float ns(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f); return mix(mix(h21(i), h21(i+vec2(1,0)), f.x), mix(h21(i+vec2(0,1)), h21(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ v += a * ns(p); p *= 2.03; a *= 0.5; } return v; }
vec2 cov(vec2 uv, float ia){ vec2 s = vec2(1.0); if (ia > uPA) s.x = uPA / ia; else s.y = ia / uPA; return (uv - 0.5) * s / uZoom + 0.5; }
vec3 sa(vec2 uv){ return texture2D(tA, cov(uv, uAA)).rgb; }
vec3 sb(vec2 uv){ return texture2D(tB, cov(uv, uAB)).rgb; }
void main(){
  vec2 uv = vUv; float p = uP; vec3 col;
  if (uMode < 0.5) {
    float n = fbm(uv * vec2(3.0, 5.0) + uT * 0.05);
    float th = p * 1.25 - 0.12;
    float m = smoothstep(th + 0.015, th - 0.015, n);
    float edge = smoothstep(0.06, 0.0, abs(n - th)) * (1.0 - step(0.999, p));
    col = mix(sa(uv), sb(uv), m);
    col += edge * vec3(1.0, 0.55, 0.12) * 1.6 + smoothstep(0.02, 0.0, abs(n - th)) * vec3(1.0);
  } else if (uMode < 1.5) {
    vec2 d = uv - vec2(0.5, 0.45); float r = length(d * vec2(uPA, 1.0)); float a = sin(p * 3.14159);
    vec2 off = normalize(d + 1e-5) * sin(r * 38.0 - p * 22.0) * 0.035 * a;
    float m = smoothstep(p * 1.3 - 0.15, p * 1.3 - 0.35, r);
    col = mix(sa(uv + off), sb(uv - off), m);
    col += a * smoothstep(0.03, 0.0, abs(r - (p * 1.3 - 0.25))) * vec3(0.6, 0.8, 1.0);
  } else if (uMode < 2.5) {
    float e = p < 0.5 ? 4.0*p*p*p : 1.0 - pow(-2.0*p + 2.0, 3.0) / 2.0; float v = sin(p * 3.14159) * 0.06;
    vec2 ua = uv + vec2(e, 0.0), ub = uv - vec2(1.0 - e, 0.0);
    vec3 A = vec3(texture2D(tA, cov(ua + vec2(v, 0.0), uAA)).r, texture2D(tA, cov(ua, uAA)).g, texture2D(tA, cov(ua - vec2(v, 0.0), uAA)).b);
    vec3 B = vec3(texture2D(tB, cov(ub + vec2(v, 0.0), uAB)).r, texture2D(tB, cov(ub, uAB)).g, texture2D(tB, cov(ub - vec2(v, 0.0), uAB)).b);
    col = uv.x + e < 1.0 ? A : B;
  } else {
    vec2 d = uv - 0.5; float r = length(d * vec2(uPA, 1.0)); float a = sin(p * 3.14159);
    float ang = a * 5.0 * smoothstep(0.75, 0.0, r);
    vec2 q = vec2(cos(ang) * d.x - sin(ang) * d.y, sin(ang) * d.x + cos(ang) * d.y) * (1.0 - 0.35 * a) + 0.5;
    col = mix(sa(q), sb(q), smoothstep(0.35, 0.65, p));
  }
  vec2 c = uv - 0.5; float vig = smoothstep(0.85, 0.25, length(c * vec2(1.0, 1.2)));
  col *= 0.82 + 0.18 * vig;
  float rn = fbm(uv * vec2(4.0, 6.0) + 3.1);
  float al = smoothstep(uReveal * 1.5 - 0.1, uReveal * 1.5 - 0.02, length(c * vec2(uPA, 1.0)) * 1.2 + rn * 0.25);
  gl_FragColor = vec4(col, 1.0 - al);
}`;
/** Photos successives (`srcs`) ; `cuts` = [instant de début, durée, mode] pour passer de srcs[i] à srcs[i+1]. */
export const PhotoFX: React.FC<{u: number; srcs: string[]; cuts: [number, number, number][]; w: number; h: number; pos?: V3; rot?: V3; reveal?: number; zoom?: number}> = ({u, srcs, cuts, w, h, pos = [0, 0, 0], rot = [0, 0, 0], reveal = 1, zoom = 1}) => {
  const tex = useTex(srcs);
  const mat = useMemo(() => new THREE.ShaderMaterial({vertexShader: PF_VS, fragmentShader: PF_FS, transparent: true, uniforms: {tA: {value: null}, tB: {value: null}, uP: {value: 0}, uMode: {value: 0}, uT: {value: 0}, uReveal: {value: 1}, uPA: {value: 1}, uAA: {value: 1}, uAB: {value: 1}, uZoom: {value: 1}}}), []);
  let i = 0;
  while (i < cuts.length && u >= cuts[i][0] + cuts[i][1]) i++;
  const cur = Math.min(i, srcs.length - 1);
  const inCut = i < cuts.length && u >= cuts[i][0];
  const A = tex[cur], B = tex[Math.min(cur + 1, srcs.length - 1)];
  const asp = (t: THREE.Texture) => { const im = t.image as HTMLImageElement | undefined; return im && im.width ? im.width / im.height : 1.5; };
  mat.uniforms.tA.value = A; mat.uniforms.tB.value = inCut ? B : A;
  mat.uniforms.uP.value = inCut ? gpg(u, cuts[i][0], cuts[i][0] + cuts[i][1]) : 0;
  mat.uniforms.uMode.value = inCut ? cuts[i][2] : 0;
  mat.uniforms.uT.value = u; mat.uniforms.uReveal.value = reveal; mat.uniforms.uPA.value = w / h; mat.uniforms.uAA.value = asp(A); mat.uniforms.uAB.value = asp(inCut ? B : A); mat.uniforms.uZoom.value = zoom;
  return <mesh position={pos} rotation={rot} material={mat}><planeGeometry args={[w, h, 1, 1]} /></mesh>;
};

/* ═════════════ Sphère de verre (Fresnel) et orbites ═════════════ */
const MB_VS = `varying vec3 vN; varying vec3 vV; varying vec3 vP; void main(){ vec4 wp = modelMatrix * vec4(position, 1.0); vP = position; vN = normalize(mat3(modelMatrix) * normal); vV = normalize(cameraPosition - wp.xyz); gl_Position = projectionMatrix * viewMatrix * wp; }`;
const MB_FS = `
varying vec3 vN; varying vec3 vV; varying vec3 vP; uniform vec3 uC; uniform vec3 uRim; uniform float uT; uniform float uOp;
void main(){
  float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.4);
  float band = 0.5 + 0.5 * sin(vP.y * 9.0 + uT * 2.0 + sin(vP.x * 5.0 + uT) * 1.5);
  vec3 c = mix(uC, uRim, f) + band * f * 0.25;
  gl_FragColor = vec4(c, (0.06 + f * 0.85) * uOp);
}`;
export const Membrane: React.FC<{u: number; r: number; c?: string; rim?: string; op?: number; pos?: V3}> = ({u, r, c = '#DCE8FF', rim = SWC.N, op = 1, pos = [0, 0, 0]}) => {
  const mat = useMemo(() => new THREE.ShaderMaterial({vertexShader: MB_VS, fragmentShader: MB_FS, transparent: true, depthWrite: false, side: THREE.FrontSide, uniforms: {uC: {value: new THREE.Color(c)}, uRim: {value: new THREE.Color(rim)}, uT: {value: 0}, uOp: {value: 1}}}), [c, rim]);
  mat.uniforms.uT.value = u; mat.uniforms.uOp.value = op;
  return <mesh position={pos} material={mat} scale={r}><sphereGeometry args={[1, 96, 64]} /></mesh>;
};
const OB_VS = `
attribute float aR; attribute float aSp; attribute float aPh; attribute float aTilt; attribute float aGrp; attribute float aSize;
uniform float uT; uniform float uSplit; uniform float uScale; uniform float uSize; uniform vec3 uC0; uniform vec3 uC1; uniform vec3 uC2; uniform float uSpread;
varying vec3 vCol;
void main(){
  float a = aPh + uT * aSp;
  vec3 p = vec3(cos(a) * aR, sin(a * 1.3) * 0.18 * aR, sin(a) * aR);
  float ct = cos(aTilt), st = sin(aTilt); p = vec3(p.x, p.y * ct - p.z * st, p.y * st + p.z * ct);
  float side = aGrp < 0.5 ? -1.0 : 1.0; p.x += side * uSplit * uSpread * 0.35 * aR;
  vCol = mix(uC0, aGrp < 0.5 ? uC1 : uC2, uSplit);
  vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = uSize * aSize * (uScale / -mv.z);
}`;
const OB_FS = `varying vec3 vCol; uniform float uOp; void main(){ vec2 d = gl_PointCoord - 0.5; float r = length(d); if (r > 0.5) discard; gl_FragColor = vec4(mix(vCol * 0.8, vCol + 0.25, smoothstep(0.3, 0.0, r)), smoothstep(0.5, 0.2, r) * uOp); }`;
/** Essaim en orbite (rayons r0 → r1) ; `split` 0 → 1 sépare le groupe en deux couleurs c1 / c2. */
export const Orbiters: React.FC<{u: number; n: number; r0: number; r1: number; c0: string; c1: string; c2: string; split: number; size?: number; op?: number; seed: string; spread?: number}> = ({u, n, r0, r1, c0, c1, c2, split, size = 9, op = 1, seed, spread = 0}) => {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const P = new Float32Array(n * 3), R = new Float32Array(n), Sp = new Float32Array(n), Ph = new Float32Array(n), Ti = new Float32Array(n), Gr = new Float32Array(n), Sz = new Float32Array(n);
    for (let i = 0; i < n; i++) { R[i] = lp(r0, r1, random(`${seed}r${i}`)); Sp[i] = (0.25 + random(`${seed}s${i}`) * 0.5) * (random(`${seed}d${i}`) < 0.5 ? 1 : -1) * (r1 < 3 ? 1.4 : 0.6); Ph[i] = random(`${seed}p${i}`) * Math.PI * 2; Ti[i] = (random(`${seed}t${i}`) - 0.5) * 2.6; Gr[i] = i % 2; Sz[i] = 0.6 + random(`${seed}z${i}`) * 0.9; }
    g.setAttribute('position', new THREE.BufferAttribute(P, 3)); g.setAttribute('aR', new THREE.BufferAttribute(R, 1)); g.setAttribute('aSp', new THREE.BufferAttribute(Sp, 1)); g.setAttribute('aPh', new THREE.BufferAttribute(Ph, 1)); g.setAttribute('aTilt', new THREE.BufferAttribute(Ti, 1)); g.setAttribute('aGrp', new THREE.BufferAttribute(Gr, 1)); g.setAttribute('aSize', new THREE.BufferAttribute(Sz, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1000);
    return g;
  }, [n, r0, r1, seed]);
  const mat = useMemo(() => new THREE.ShaderMaterial({vertexShader: OB_VS, fragmentShader: OB_FS, transparent: true, depthWrite: false, uniforms: {uT: {value: 0}, uSplit: {value: 0}, uScale: {value: 12}, uSize: {value: 9}, uC0: {value: new THREE.Color(c0)}, uC1: {value: new THREE.Color(c1)}, uC2: {value: new THREE.Color(c2)}, uOp: {value: 1}, uSpread: {value: 0}}}), [c0, c1, c2]);
  mat.uniforms.uT.value = u; mat.uniforms.uSplit.value = split; mat.uniforms.uSize.value = size; mat.uniforms.uOp.value = op; mat.uniforms.uSpread.value = spread;
  return <points geometry={geo} material={mat} frustumCulled={false} />;
};
export const Ring: React.FC<{r: number; c: string; op?: number; tube?: number; rot?: V3; glow?: number}> = ({r, c, op = 1, tube = 0.02, rot = [Math.PI / 2, 0, 0], glow = 0.6}) => (
  <mesh rotation={rot}><torusGeometry args={[r, tube, 12, 160]} /><meshStandardMaterial color={c} emissive={c} emissiveIntensity={glow} transparent opacity={op} /></mesh>
);

/* ═════════════ Transition plein écran : encre liquide ═════════════ */
const IW_VS = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;
const IW_FS = `
varying vec2 vUv; uniform float uP; uniform float uT; uniform vec3 uC; uniform vec3 uE; uniform vec2 uO1; uniform vec2 uO2;
float h21(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
float ns(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f); return mix(mix(h21(i), h21(i+vec2(1,0)), f.x), mix(h21(i+vec2(0,1)), h21(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ v += a * ns(p); p *= 2.07; a *= 0.5; } return v; }
void main(){
  vec2 asp = vec2(0.5625, 1.0);
  float n = fbm(vUv * vec2(3.0, 5.3) + uT * 0.6) * 0.42;
  float r1 = clamp(uP * 2.0, 0.0, 1.0) * 1.55, r2 = clamp(uP * 2.0 - 1.0, 0.0, 1.0) * 1.55;
  float d1 = length((vUv - uO1) * asp) + n, d2 = length((vUv - uO2) * asp) + n * 1.1;
  float cov = smoothstep(r1, r1 - 0.012, d1) * (1.0 - smoothstep(r2, r2 - 0.012, d2));
  float e1 = smoothstep(0.03, 0.0, abs(d1 - r1)) * step(uP, 0.5) * step(0.001, uP), e2 = smoothstep(0.03, 0.0, abs(d2 - r2)) * step(0.5, uP) * step(uP, 0.999);
  vec3 c = mix(uC, uC * 1.35 + 0.05, fbm(vUv * 8.0 - uT));
  float edge = max(e1, e2);
  gl_FragColor = vec4(mix(c, uE, edge), max(cov, edge));
}`;
export const InkWipe: React.FC<{u: number; a: number; d: number; c?: string; edge?: string; o1?: [number, number]; o2?: [number, number]}> = ({u, a, d, c = SWC.N, edge = SWC.G, o1 = [0.15, 0.1], o2 = [0.85, 0.95]}) => {
  const mat = useMemo(() => new THREE.ShaderMaterial({vertexShader: IW_VS, fragmentShader: IW_FS, transparent: true, depthTest: false, depthWrite: false, uniforms: {uP: {value: 0}, uT: {value: 0}, uC: {value: new THREE.Color(c)}, uE: {value: new THREE.Color(edge)}, uO1: {value: new THREE.Vector2(...o1)}, uO2: {value: new THREE.Vector2(...o2)}}}), [c, edge, o1[0], o1[1], o2[0], o2[1]]);
  mat.uniforms.uP.value = gpg(u, a, a + d); mat.uniforms.uT.value = u;
  return <mesh material={mat} frustumCulled={false}><planeGeometry args={[2, 2]} /></mesh>;
};

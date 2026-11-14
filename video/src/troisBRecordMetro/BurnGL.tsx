/**
 * Pack WebGL « Les 3 B de la souffrance » — nouvelles techniques (en plus des packs SwotGL, DangerGL, FishGL) :
 * - `Flame` : flamme volumétrique en shader (bruit fractal qui monte, cœur blanc, bords orangés), en billboard additif.
 * - `Embers` : braises qui s'envolent en spirale.
 * - `LiquidTube` : tube de verre dont le liquide (shader) a une surface qui ondule, un niveau qui monte ou se vide,
 *   des bulles et une couleur qui vire (rouge, gris, brun trouble).
 * - `Compass3D` : boussole en volume dont l'aiguille perd le nord (rotation erratique).
 * - `Vortex` : vide existentiel — disque sombre qui aspire la lumière en spirale (shader).
 * - `Press` : presse qui descend et écrase (pression écrasante).
 */
import React, {useMemo} from 'react';
import {random} from 'remotion';
import * as THREE from 'three';
import {V3} from '../swotRecordMetro/SwotGL';

const NOISE = `
float h21(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
float ns(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f); return mix(mix(h21(i), h21(i+vec2(1,0)), f.x), mix(h21(i+vec2(0,1)), h21(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ v += a * ns(p); p *= 2.02; a *= 0.5; } return v; }
`;
/* ═════════════ Flamme volumétrique ═════════════ */
const FL_VS = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const FL_FS = `
varying vec2 vUv; uniform float uT; uniform float uI;
${NOISE}
void main(){
  vec2 p = vUv; p.x = (p.x - 0.5) * 2.0;
  float n = fbm(vec2(p.x * 2.2, p.y * 3.0 - uT * 2.6)) ;
  float shape = 1.0 - smoothstep(0.0, 1.0, abs(p.x) / (0.55 * (1.0 - p.y) + 0.05));
  float f = shape * (1.2 - p.y) * (0.6 + 0.8 * n) * uI;
  f = smoothstep(0.25, 1.0, f);
  vec3 c = mix(vec3(0.85, 0.12, 0.03), vec3(1.0, 0.62, 0.12), smoothstep(0.2, 0.6, f));
  c = mix(c, vec3(1.0, 0.97, 0.85), smoothstep(0.7, 1.0, f));
  gl_FragColor = vec4(c, f);
}`;
export const Flame: React.FC<{u: number; pos: V3; s: number; i?: number}> = ({u, pos, s, i = 1}) => {
  const mat = useMemo(() => new THREE.ShaderMaterial({vertexShader: FL_VS, fragmentShader: FL_FS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: {uT: {value: 0}, uI: {value: 1}}}), []);
  mat.uniforms.uT.value = u; mat.uniforms.uI.value = i;
  return s > 0.001 ? <group position={pos}>
    <mesh material={mat} scale={[s * 0.8, s * 1.6, 1]} position={[0, s * 0.75, 0]}><planeGeometry args={[1, 1]} /></mesh>
    <mesh material={mat} scale={[s * 0.8, s * 1.6, 1]} position={[0, s * 0.75, 0]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[1, 1]} /></mesh>
    <pointLight color="#FF8A2A" intensity={10 * s * i * (0.85 + 0.15 * Math.sin(u * 17))} distance={6} position={[0, s * 0.6, 0.3]} />
  </group> : null;
};
export const Embers: React.FC<{u: number; pos: V3; n?: number; op?: number}> = ({u, pos, n = 60, op = 1}) => {
  const geo = useMemo(() => new THREE.BufferGeometry(), []);
  const mat = useMemo(() => new THREE.PointsMaterial({color: '#FFB347', size: 0.06, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false}), []);
  const p: number[] = [];
  for (let i = 0; i < n; i++) { const sp = 0.5 + random(`em${i}`) * 0.8, k = ((u * sp + random(`eo${i}`) * 3) % 3) / 3; const a = random(`ea${i}`) * 6.28 + k * 4; p.push(Math.cos(a) * 0.3 * k, k * 3.2, Math.sin(a) * 0.3 * k); }
  geo.setAttribute('position', new THREE.Float32BufferAttribute(p, 3)); mat.opacity = op;
  return <points geometry={geo} material={mat} position={pos} frustumCulled={false} />;
};
/* ═════════════ Tube de verre et liquide qui ondule ═════════════ */
const LQ_VS = `varying vec3 vP; varying vec3 vN; varying vec3 vV; void main(){ vP = position; vec4 wp = modelMatrix * vec4(position, 1.0); vN = normalize(mat3(modelMatrix) * normal); vV = normalize(cameraPosition - wp.xyz); gl_Position = projectionMatrix * viewMatrix * wp; }`;
const LQ_FS = `
varying vec3 vP; varying vec3 vN; varying vec3 vV; uniform float uLevel; uniform float uT; uniform vec3 uC; uniform float uMurk; uniform float uH;
${NOISE}
void main(){
  float y = (vP.y + uH * 0.5) / uH;
  float wave = 0.025 * sin(vP.x * 9.0 + uT * 3.0) + 0.02 * sin(vP.z * 7.0 - uT * 2.3);
  if (y > uLevel + wave) discard;
  float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.0);
  float bub = step(0.985, h21(floor(vec2(atan(vP.z, vP.x) * 12.0, (y - uT * 0.25) * 40.0)))) * (1.0 - uMurk);
  float m = fbm(vec2(atan(vP.z, vP.x) * 2.0, y * 4.0 + uT * 0.2));
  vec3 c = mix(uC, uC * 0.55 + vec3(0.18, 0.12, 0.05) * m, uMurk);
  c = c * (0.75 + 0.35 * (1.0 - f)) + f * 0.25 + bub * 0.6;
  gl_FragColor = vec4(c, 1.0);
}`;
export const LiquidTube: React.FC<{u: number; pos: V3; level: number; c: string; murk?: number; s?: number}> = ({u, pos, level, c, murk = 0, s = 1}) => {
  const H = 2.4;
  const mat = useMemo(() => new THREE.ShaderMaterial({vertexShader: LQ_VS, fragmentShader: LQ_FS, transparent: false, side: THREE.DoubleSide, uniforms: {uLevel: {value: 0.5}, uT: {value: 0}, uC: {value: new THREE.Color(c)}, uMurk: {value: 0}, uH: {value: H}}}), []);
  mat.uniforms.uLevel.value = level; mat.uniforms.uT.value = u; mat.uniforms.uC.value.set(c); mat.uniforms.uMurk.value = murk;
  const glass = useMemo(() => new THREE.MeshPhysicalMaterial({color: '#ffffff', roughness: 0.05, transmission: 1, thickness: 0.2, ior: 1.45, transparent: true, clearcoat: 1}), []);
  const cap = useMemo(() => new THREE.MeshPhysicalMaterial({color: '#2B2F3A', metalness: 0.6, roughness: 0.25, clearcoat: 1}), []);
  return <group position={pos} scale={s}>
    <mesh material={mat} position={[0, H / 2 + 0.05, 0]}><cylinderGeometry args={[0.36, 0.36, H, 48, 24]} /></mesh>
    <mesh material={glass} position={[0, H / 2 + 0.1, 0]}><cylinderGeometry args={[0.42, 0.42, H + 0.2, 48, 1, true]} /></mesh>
    <mesh material={cap} position={[0, 0, 0]} castShadow receiveShadow><cylinderGeometry args={[0.5, 0.52, 0.14, 48]} /></mesh>
    <mesh material={cap} position={[0, H + 0.25, 0]} castShadow><cylinderGeometry args={[0.46, 0.46, 0.1, 48]} /></mesh>
  </group>;
};
/* ═════════════ Boussole qui perd le nord ═════════════ */
export const Compass3D: React.FC<{u: number; pos: V3; s?: number; lost?: number}> = ({u, pos, s = 1, lost = 0}) => {
  const base = useMemo(() => new THREE.MeshPhysicalMaterial({color: '#C99A06', metalness: 0.8, roughness: 0.25, clearcoat: 1}), []);
  const face = useMemo(() => new THREE.MeshPhysicalMaterial({color: '#F7F2E6', roughness: 0.4, clearcoat: 0.5}), []);
  const nr = useMemo(() => new THREE.MeshPhysicalMaterial({color: '#D7263D', roughness: 0.3, clearcoat: 1}), []);
  const nb = useMemo(() => new THREE.MeshPhysicalMaterial({color: '#2B2F3A', roughness: 0.3, clearcoat: 1}), []);
  const ang = (1 - lost) * Math.sin(u * 2) * 0.08 + lost * (u * 5.5 + Math.sin(u * 3.1) * 2.2 + Math.sin(u * 7.3));
  return <group position={pos} scale={s} rotation={[Math.PI / 2.6, 0, 0]}>
    <mesh material={base} castShadow><cylinderGeometry args={[1.0, 1.05, 0.22, 64]} /></mesh>
    <mesh material={face} position={[0, 0.12, 0]}><cylinderGeometry args={[0.88, 0.88, 0.04, 64]} /></mesh>
    {Array.from({length: 12}, (_, i) => <mesh key={i} material={nb} position={[Math.cos((i / 12) * 6.283) * 0.76, 0.15, Math.sin((i / 12) * 6.283) * 0.76]} rotation={[0, -(i / 12) * 6.283, 0]}><boxGeometry args={[i % 3 ? 0.06 : 0.14, 0.02, 0.02]} /></mesh>)}
    <group position={[0, 0.2, 0]} rotation={[0, ang, 0]}>
      <mesh material={nr} position={[0, 0, -0.32]} rotation={[Math.PI / 2, 0, 0]}><coneGeometry args={[0.09, 0.64, 4]} /></mesh>
      <mesh material={nb} position={[0, 0, 0.32]} rotation={[-Math.PI / 2, 0, 0]}><coneGeometry args={[0.09, 0.64, 4]} /></mesh>
      <mesh material={base}><sphereGeometry args={[0.06, 16, 12]} /></mesh>
    </group>
  </group>;
};
/* ═════════════ Vortex du vide existentiel ═════════════ */
const VX_FS = `
varying vec2 vUv; uniform float uT; uniform float uR;
${NOISE}
void main(){
  vec2 p = vUv - 0.5; float r = length(p) * 2.0; float a = atan(p.y, p.x);
  float sw = a + 3.5 / (r + 0.15) - uT * 1.2;
  float arms = 0.5 + 0.5 * sin(sw * 4.0 + fbm(vec2(sw, r * 3.0)) * 3.0);
  float hole = smoothstep(uR * 0.45, uR * 0.15, r);
  float disc = smoothstep(uR, uR * 0.55, r);
  vec3 c = mix(vec3(0.42, 0.33, 0.24), vec3(0.06, 0.05, 0.08), 1.0 - arms * (1.0 - r));
  c = mix(c, vec3(0.0), hole);
  gl_FragColor = vec4(c, disc * (0.55 + 0.45 * arms + hole));
}`;
export const Vortex: React.FC<{u: number; pos: V3; s: number; r?: number}> = ({u, pos, s, r = 1}) => {
  const mat = useMemo(() => new THREE.ShaderMaterial({vertexShader: FL_VS, fragmentShader: VX_FS, transparent: true, depthWrite: false, uniforms: {uT: {value: 0}, uR: {value: 1}}}), []);
  mat.uniforms.uT.value = u; mat.uniforms.uR.value = r;
  return s > 0.001 ? <mesh material={mat} position={pos} scale={[s, s, 1]}><planeGeometry args={[1, 1]} /></mesh> : null;
};
/* ═════════════ Presse qui écrase ═════════════ */
export const Press: React.FC<{y: number; pos: V3; w?: number}> = ({y, pos, w = 2.2}) => {
  const m = useMemo(() => new THREE.MeshPhysicalMaterial({color: '#3A4150', metalness: 0.7, roughness: 0.3, clearcoat: 0.6}), []);
  const st = useMemo(() => new THREE.MeshPhysicalMaterial({color: '#F2C230', metalness: 0.2, roughness: 0.4}), []);
  return <group position={pos}>
    <mesh material={m} position={[0, y + 0.2, 0]} castShadow><boxGeometry args={[w, 0.4, 1.2]} /></mesh>
    <mesh material={st} position={[0, y + 0.42, 0]}><boxGeometry args={[w * 1.01, 0.06, 1.21]} /></mesh>
    <mesh material={m} position={[0, y + 2.6, 0]}><cylinderGeometry args={[0.15, 0.15, 4.4, 24]} /></mesh>
  </group>;
};

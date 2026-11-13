/**
 * Pack WebGL « Ishikawa sous-marin » — nouvelles techniques (en plus des packs SwotGL et DangerGL) :
 * - `CausticFloor` : fond marin dont la lumière ondule en caustiques (shader GLSL procédural).
 * - `GodRays` : rayons de lumière volumétriques descendant de la surface (cônes additifs bruités en shader).
 * - `Bubbles` : bulles qui montent en oscillant (points GPU).
 * - `GrowTube` : arête en tube 3D le long d'une courbe, qui pousse grâce à la plage de dessin (setDrawRange).
 * - `CurlCard` : carte photo arrondie qui se déroule comme une page (courbure en vertex shader).
 * - `pathCam` : vol de caméra le long d'une courbe Catmull-Rom, regard posé en avant sur la trajectoire.
 */
import React, {useMemo} from 'react';
import {useLoader} from '@react-three/fiber';
import {random, staticFile} from 'remotion';
import * as THREE from 'three';
import {V3} from '../swotRecordMetro/SwotGL';

const cl = (v: number) => Math.min(1, Math.max(0, v));

/* ═════════════ Fond marin à caustiques ═════════════ */
const CF_VS = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const CF_FS = `
varying vec2 vUv; uniform float uT; uniform vec3 uA; uniform vec3 uB; uniform float uOp;
float cau(vec2 p, float t){ vec2 i = p; float c = 1.0; float inten = 0.005;
  for (int n = 0; n < 5; n++) { float tt = t * (1.0 - (3.5 / float(n + 1))); i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
    c += 1.0 / length(vec2(p.x / (sin(i.x + tt) / inten), p.y / (cos(i.y + tt) / inten))); }
  c /= 5.0; c = 1.17 - pow(c, 1.4); return pow(abs(c), 8.0); }
void main(){
  vec2 p = mod(vUv * 9.0, 6.2831) - 250.0;
  float c = clamp(cau(p, uT * 0.5 + 23.0), 0.0, 1.0);
  float edge = smoothstep(0.5, 0.18, length(vUv - 0.5));
  vec3 col = mix(uA, uB, c);
  gl_FragColor = vec4(col, (0.55 + 0.45 * c) * edge * uOp);
}`;
export const CausticFloor: React.FC<{u: number; size?: number; y?: number; op?: number; a?: string; b?: string}> = ({u, size = 16, y = -0.02, op = 1, a = '#BFE3EE', b = '#FFFFFF'}) => {
  const mat = useMemo(() => new THREE.ShaderMaterial({vertexShader: CF_VS, fragmentShader: CF_FS, transparent: true, depthWrite: false, uniforms: {uT: {value: 0}, uA: {value: new THREE.Color(a)}, uB: {value: new THREE.Color(b)}, uOp: {value: 1}}}), [a, b]);
  mat.uniforms.uT.value = u; mat.uniforms.uOp.value = op;
  return <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]} material={mat} renderOrder={-1}><planeGeometry args={[size, size]} /></mesh>;
};
/* ═════════════ Rayons de lumière volumétriques ═════════════ */
const GR_VS = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const GR_FS = `
varying vec2 vUv; uniform float uT; uniform float uOp; uniform float uSeed;
void main(){
  float fall = smoothstep(0.0, 0.9, vUv.y);
  float side = smoothstep(0.0, 0.35, vUv.x) * smoothstep(1.0, 0.65, vUv.x);
  float fl = 0.65 + 0.35 * sin(uT * 1.3 + uSeed * 7.0 + vUv.y * 3.0);
  gl_FragColor = vec4(vec3(1.0, 0.98, 0.9), fall * side * fl * 0.22 * uOp);
}`;
export const GodRays: React.FC<{u: number; op?: number; n?: number}> = ({u, op = 1, n = 6}) => {
  const mats = useMemo(() => Array.from({length: n}, (_, i) => new THREE.ShaderMaterial({vertexShader: GR_VS, fragmentShader: GR_FS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, uniforms: {uT: {value: 0}, uOp: {value: 1}, uSeed: {value: i}}})), [n]);
  return <>{mats.map((m, i) => { m.uniforms.uT.value = u; m.uniforms.uOp.value = op; const x = -3 + (i / (n - 1)) * 6 + Math.sin(u * 0.3 + i) * 0.3; return <mesh key={i} material={m} position={[x, 3.5, -1.5 + (i % 3)]} rotation={[0, 0, 0.18 + Math.sin(u * 0.2 + i) * 0.04]}><planeGeometry args={[0.9 + (i % 2) * 0.6, 9]} /></mesh>; })}</>;
};
/* ═════════════ Bulles ═════════════ */
export const Bubbles: React.FC<{u: number; n?: number; op?: number}> = ({u, n = 90, op = 1}) => {
  const geo = useMemo(() => new THREE.BufferGeometry(), []);
  const mat = useMemo(() => new THREE.PointsMaterial({color: '#E9F8FF', size: 0.09, transparent: true, depthWrite: false, sizeAttenuation: true}), []);
  const p: number[] = [];
  for (let i = 0; i < n; i++) { const sp = 0.4 + random(`bv${i}`) * 0.7, ph = random(`bp${i}`) * 8; const y = ((u * sp + ph) % 8) - 1; p.push((random(`bx${i}`) - 0.5) * 8 + Math.sin(u * 2 + i) * 0.12, y, (random(`bz${i}`) - 0.5) * 7); }
  geo.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
  mat.opacity = 0.75 * op;
  return <points geometry={geo} material={mat} frustumCulled={false} />;
};
/* ═════════════ Arête en tube qui pousse ═════════════ */
export const GrowTube: React.FC<{pts: V3[]; k: number; r?: number; c?: string; glow?: number}> = ({pts, k, r = 0.07, c = '#F3EBDD', glow = 0}) => {
  const geo = useMemo(() => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p))), 64, r, 14, false), [pts.map((p) => p.join(',')).join('|'), r]);
  const mat = useMemo(() => new THREE.MeshPhysicalMaterial({color: c, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.08, emissive: new THREE.Color(c), emissiveIntensity: 0}), [c]);
  mat.emissiveIntensity = glow;
  const total = geo.index ? geo.index.count : 0;
  geo.setDrawRange(0, Math.floor((total / 6) * cl(k)) * 6);
  return k > 0.001 ? <mesh geometry={geo} material={mat} castShadow receiveShadow /> : null;
};
/* ═════════════ Carte photo qui se déroule comme une page ═════════════ */
const CC_VS = `
varying vec2 vUv; uniform float uCurl;
void main(){ vUv = uv; vec3 p = position;
  float a = uCurl * (1.0 - uv.x) * 3.1416; float r = 0.35;
  if (uCurl > 0.001) { float x = p.x + 0.5; p.z += (1.0 - cos(a)) * r * (1.0 - uv.x); p.x -= sin(a) * 0.15 * (1.0 - uv.x); }
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); }`;
const CC_FS = `
varying vec2 vUv; uniform sampler2D tMap; uniform float uAsp; uniform float uImg; uniform float uOp; uniform vec3 uBorder;
float rbox(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
void main(){
  vec2 q = (vUv - 0.5) * vec2(uAsp, 1.0);
  float d = rbox(q, vec2(uAsp * 0.5, 0.5), 0.06);
  if (d > 0.0) discard;
  vec2 s = vec2(1.0); if (uImg > uAsp) s.x = uAsp / uImg; else s.y = uImg / uAsp;
  vec3 col = texture2D(tMap, (vUv - 0.5) * s * 0.92 + 0.5).rgb;
  float b = smoothstep(-0.035, -0.025, d);
  col = mix(col, uBorder, b);
  gl_FragColor = vec4(col, uOp);
}`;
export const CurlCard: React.FC<{src: string; k: number; pos: V3; rot?: V3; w?: number; h?: number; border?: string}> = ({src, k, pos, rot = [0, 0, 0], w = 1.3, h = 0.95, border = '#ffffff'}) => {
  const tex = useLoader(THREE.TextureLoader, staticFile(src));
  const mat = useMemo(() => new THREE.ShaderMaterial({vertexShader: CC_VS, fragmentShader: CC_FS, transparent: true, side: THREE.DoubleSide, uniforms: {tMap: {value: null}, uCurl: {value: 1}, uAsp: {value: 1}, uImg: {value: 1}, uOp: {value: 1}, uBorder: {value: new THREE.Color(border)}}}), [border]);
  const im = tex.image as HTMLImageElement | undefined;
  mat.uniforms.tMap.value = tex; mat.uniforms.uCurl.value = 1 - cl(k); mat.uniforms.uAsp.value = w / h; mat.uniforms.uImg.value = im && im.width ? im.width / im.height : 1.5; mat.uniforms.uOp.value = cl(k * 3);
  return k > 0.001 ? <mesh material={mat} position={pos} rotation={rot} scale={[w, h, 1]}><planeGeometry args={[1, 1, 40, 4]} /></mesh> : null;
};
/* ═════════════ Vol de caméra le long d'une courbe ═════════════ */
export const pathCam = (pts: V3[], k: number, ahead = 0.06, lift = 0) => {
  const c = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)));
  const p = c.getPointAt(cl(k)), q = c.getPointAt(cl(k + ahead));
  return {p: [p.x, p.y + lift, p.z] as V3, at: [q.x, q.y, q.z] as V3};
};

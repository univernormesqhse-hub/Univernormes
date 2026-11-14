/**
 * Pack WebGL « La sécurité, une responsabilité » — nouvelles techniques (en plus des packs SwotGL, DangerGL, FishGL, BurnGL) :
 * - `HardHat` : casque de chantier en volume (calotte, nervure, visière), vernis brillant.
 * - `Gear` : engrenage extrudé à dents et alésage (Shape avec trou), métal, rotation pilotée.
 * - `Conveyor` : convoyeur à rouleaux instanciés et bande qui défile.
 * - `LightCurtain` : barrière immatérielle (faisceaux lumineux) avec poteaux, qui vire au rouge quand on la franchit.
 * - `Beacon` : gyrophare 3D dont le faisceau tournant est un cône de lumière volumétrique (shader additif).
 * - `EStop` : bouton d'arrêt d'urgence (champignon rouge sur socle jaune) qui s'enfonce.
 * - `Balance` : balance à fléau qui penche.
 * - `Padlock` : cadenas de consignation (anse qui se referme) avec étiquette « Danger, ne pas manœuvrer ».
 * - `Shards` : vitre qui éclate en éclats triangulaires instanciés.
 * - `House` : maison au toit en volume, fenêtre qui s'allume.
 */
import React, {useLayoutEffect, useMemo} from 'react';
import {random} from 'remotion';
import * as THREE from 'three';
import {V3} from '../swotRecordMetro/SwotGL';

const cl = (v: number) => Math.min(1, Math.max(0, v));
const phys = (c: string, o: Partial<THREE.MeshPhysicalMaterialParameters> = {}) => new THREE.MeshPhysicalMaterial({color: c, roughness: 0.25, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.06, ...o});

/* ═════════════ Casque de chantier ═════════════ */
export const HardHat: React.FC<{pos: V3; rot?: V3; s?: number; c?: string}> = ({pos, rot = [0, 0, 0], s = 1, c = '#F6C21A'}) => {
  const m = useMemo(() => phys(c, {clearcoatRoughness: 0.03}), [c]);
  const band = useMemo(() => phys('#2B2F3A', {roughness: 0.5}), []);
  return <group position={pos} rotation={rot} scale={s}>
    <mesh material={m} castShadow><sphereGeometry args={[1, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} /></mesh>
    <mesh material={m} castShadow scale={[1, 0.22, 1]} position={[0, 0.02, 0.18]}><cylinderGeometry args={[1.32, 1.36, 0.25, 64]} /></mesh>
    <mesh material={m} castShadow position={[0, 0.55, 0]} rotation={[0, 0, Math.PI / 2]} scale={[1, 1, 0.16]}><torusGeometry args={[0.86, 0.1, 16, 64, Math.PI]} /></mesh>
    <mesh material={band} position={[0, 0.12, 0]}><cylinderGeometry args={[1.005, 1.005, 0.12, 64, 1, true]} /></mesh>
  </group>;
};
/* ═════════════ Engrenage extrudé ═════════════ */
const gearGeo = (() => { const cache = new Map<string, THREE.ExtrudeGeometry>(); return (r: number, n: number) => { const k = `${r}|${n}`; if (cache.has(k)) return cache.get(k)!; const s = new THREE.Shape(); const ri = r * 0.82, st = (Math.PI * 2) / n; for (let i = 0; i < n; i++) { const a = i * st; const P = (aa: number, rr: number) => [Math.cos(aa) * rr, Math.sin(aa) * rr]; const pts = [P(a, ri), P(a + st * 0.12, r), P(a + st * 0.42, r), P(a + st * 0.54, ri)]; pts.forEach(([x, y], j) => (i === 0 && j === 0 ? s.moveTo(x, y) : s.lineTo(x, y))); } s.closePath(); const h = new THREE.Path(); h.absarc(0, 0, r * 0.22, 0, Math.PI * 2, true); s.holes.push(h); const g = new THREE.ExtrudeGeometry(s, {depth: 0.22, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.02, bevelSegments: 3, curveSegments: 16}); g.center(); cache.set(k, g); return g; }; })();
export const Gear: React.FC<{pos: V3; r: number; n: number; a: number; c?: string; rot?: V3}> = ({pos, r, n, a, c = '#8A93A3', rot = [0, 0, 0]}) => {
  const m = useMemo(() => phys(c, {metalness: 0.75, roughness: 0.28}), [c]);
  return <group position={pos} rotation={rot}><mesh geometry={gearGeo(r, n)} material={m} rotation={[0, 0, a]} castShadow receiveShadow /></group>;
};
/* ═════════════ Convoyeur ═════════════ */
export const Conveyor: React.FC<{pos: V3; len?: number; u: number; speed: number}> = ({pos, len = 4, u, speed}) => {
  const n = 12;
  const rollers = useMemo(() => { const m = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.09, 0.09, 1.0, 20), phys('#C7CDD6', {metalness: 0.8, roughness: 0.25}), n); m.castShadow = true; return m; }, []);
  useLayoutEffect(() => { const o = new THREE.Object3D(); for (let i = 0; i < n; i++) { o.position.set(-len / 2 + (i + 0.5) * (len / n), 0, 0); o.rotation.set(Math.PI / 2, 0, -u * speed * 6); o.updateMatrix(); rollers.setMatrixAt(i, o.matrix); } rollers.instanceMatrix.needsUpdate = true; });
  const belt = useMemo(() => { const c = document.createElement('canvas'); c.width = 256; c.height = 32; const g = c.getContext('2d')!; g.fillStyle = '#23272F'; g.fillRect(0, 0, 256, 32); g.fillStyle = '#3A404C'; for (let i = 0; i < 8; i++) g.fillRect(i * 32, 0, 14, 32); const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; t.repeat.set(4, 1); return new THREE.MeshStandardMaterial({map: t, roughness: 0.8}); }, []);
  (belt.map as THREE.Texture).offset.x = -u * speed * 0.35;
  const frame = useMemo(() => phys('#F2C230', {roughness: 0.4}), []);
  return <group position={pos}>
    <primitive object={rollers} />
    <mesh material={belt} position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[len, 0.95]} /></mesh>
    {[-0.55, 0.55].map((z) => <mesh key={z} material={frame} position={[0, 0.02, z]} castShadow><boxGeometry args={[len + 0.2, 0.26, 0.1]} /></mesh>)}
    {[-len / 2 + 0.2, len / 2 - 0.2].flatMap((x) => [-0.5, 0.5].map((z) => <mesh key={`${x}${z}`} material={frame} position={[x, -0.45, z]} castShadow><boxGeometry args={[0.1, 0.8, 0.1]} /></mesh>))}
  </group>;
};
/* ═════════════ Barrière immatérielle ═════════════ */
export const LightCurtain: React.FC<{pos: V3; h?: number; w?: number; alarm: number; u: number; rot?: V3}> = ({pos, h = 1.8, w = 2.2, alarm, u, rot = [0, 0, 0]}) => {
  const post = useMemo(() => phys('#F2C230', {roughness: 0.35}), []);
  const beam = useMemo(() => new THREE.MeshBasicMaterial({color: '#4ADE80', transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false}), []);
  const fl = alarm > 0 ? (Math.sin(u * 22) > 0 ? 1 : 0.35) : 1;
  beam.color.set('#4ADE80').lerp(new THREE.Color('#FF2E2E'), alarm); beam.opacity = 0.55 * fl;
  return <group position={pos} rotation={rot}>
    {[-w / 2, w / 2].map((x) => <mesh key={x} material={post} position={[x, h / 2, 0]} castShadow><boxGeometry args={[0.14, h, 0.14]} /></mesh>)}
    {Array.from({length: 9}, (_, i) => <mesh key={i} material={beam} position={[0, 0.15 + i * ((h - 0.3) / 8), 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.012, 0.012, w, 6]} /></mesh>)}
  </group>;
};
/* ═════════════ Gyrophare à faisceau volumétrique ═════════════ */
const BC_VS = `varying vec2 vUv; varying float vY; void main(){ vUv = uv; vY = position.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const BC_FS = `varying vec2 vUv; varying float vY; uniform vec3 uC; uniform float uI; void main(){ float a = smoothstep(-1.0, 1.0, vY) * (0.4 + 0.6 * smoothstep(0.0, 0.5, vUv.x) * smoothstep(1.0, 0.5, vUv.x)); gl_FragColor = vec4(uC, a * 0.35 * uI); }`;
export const Beacon: React.FC<{pos: V3; u: number; on: number; s?: number; c?: string}> = ({pos, u, on, s = 1, c = '#FF8A00'}) => {
  const dome = useMemo(() => new THREE.MeshPhysicalMaterial({color: c, transmission: 0.6, roughness: 0.15, emissive: new THREE.Color(c), emissiveIntensity: 0.2, clearcoat: 1}), [c]);
  const cone = useMemo(() => new THREE.ShaderMaterial({vertexShader: BC_VS, fragmentShader: BC_FS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, uniforms: {uC: {value: new THREE.Color(c)}, uI: {value: 1}}}), [c]);
  dome.emissiveIntensity = 0.2 + 1.2 * on; cone.uniforms.uI.value = on;
  const a = u * 7;
  return <group position={pos} scale={s}>
    <mesh position={[0, -0.1, 0]} castShadow><cylinderGeometry args={[0.32, 0.36, 0.2, 32]} /><meshPhysicalMaterial color="#2B2F3A" metalness={0.6} roughness={0.3} /></mesh>
    <mesh material={dome} position={[0, 0.2, 0]}><sphereGeometry args={[0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} /></mesh>
    <mesh material={dome} position={[0, 0.1, 0]}><cylinderGeometry args={[0.3, 0.3, 0.2, 32, 1, true]} /></mesh>
    {on > 0.01 && <group position={[0, 0.2, 0]} rotation={[0, a, 0]}><mesh material={cone} position={[0, 0, 2.2]} rotation={[-Math.PI / 2, 0, 0]}><coneGeometry args={[1.1, 4.4, 32, 1, true]} /></mesh><pointLight color={c} intensity={18 * on} distance={7} position={[0, 0, 0.6]} /></group>}
  </group>;
};
/* ═════════════ Arrêt d'urgence ═════════════ */
export const EStop: React.FC<{pos: V3; press: number; s?: number}> = ({pos, press, s = 1}) => {
  const red = useMemo(() => phys('#D7263D', {emissive: new THREE.Color('#D7263D'), emissiveIntensity: 0}), []);
  red.emissiveIntensity = 0.5 * press;
  return <group position={pos} scale={s}>
    <mesh position={[0, 0.3, 0]} castShadow receiveShadow><boxGeometry args={[1.5, 0.6, 1.5]} /><meshPhysicalMaterial color="#F2C230" roughness={0.35} clearcoat={0.8} /></mesh>
    <mesh position={[0, 0.66, 0]}><cylinderGeometry args={[0.5, 0.55, 0.12, 48]} /><meshPhysicalMaterial color="#2B2F3A" metalness={0.5} roughness={0.3} /></mesh>
    <mesh material={red} position={[0, 0.92 - 0.18 * press, 0]} castShadow><cylinderGeometry args={[0.18, 0.2, 0.36, 32]} /></mesh>
    <mesh material={red} position={[0, 1.12 - 0.18 * press, 0]} scale={[1, 0.45, 1]} castShadow><sphereGeometry args={[0.6, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} /></mesh>
  </group>;
};
/* ═════════════ Balance à fléau ═════════════ */
export const Balance: React.FC<{pos: V3; tilt: number; left?: React.ReactNode; right?: React.ReactNode}> = ({pos, tilt, left, right}) => {
  const metal = useMemo(() => phys('#C99A06', {metalness: 0.85, roughness: 0.22}), []);
  const L = 1.9;
  const pan = (x: number, ch: React.ReactNode) => { const y = Math.sin(tilt) * x; return <group position={[Math.cos(tilt) * x, 2.4 + y - 0.9, 0]}>
    <mesh material={metal} position={[0, 0.45, 0]}><cylinderGeometry args={[0.012, 0.012, 0.9, 6]} /></mesh>
    <mesh material={metal} castShadow receiveShadow><cylinderGeometry args={[0.62, 0.5, 0.08, 48]} /></mesh>
    <group position={[0, 0.05, 0]}>{ch}</group>
  </group>; };
  return <group position={pos}>
    <mesh material={metal} position={[0, 0.06, 0]} castShadow receiveShadow><cylinderGeometry args={[0.6, 0.7, 0.12, 48]} /></mesh>
    <mesh material={metal} position={[0, 1.2, 0]} castShadow><cylinderGeometry args={[0.06, 0.08, 2.3, 16]} /></mesh>
    <mesh material={metal} position={[0, 2.4, 0]} rotation={[0, 0, tilt]} castShadow><boxGeometry args={[L * 2, 0.08, 0.08]} /></mesh>
    <mesh material={metal} position={[0, 2.48, 0]}><coneGeometry args={[0.12, 0.25, 16]} /></mesh>
    {pan(-L, left)}{pan(L, right)}
  </group>;
};
/* ═════════════ Cadenas de consignation ═════════════ */
export const Padlock: React.FC<{pos: V3; lock: number; s?: number; rot?: V3}> = ({pos, lock, s = 1, rot = [0, 0, 0]}) => {
  const body = useMemo(() => phys('#D7263D'), []);
  const steel = useMemo(() => phys('#D9DEE7', {metalness: 0.9, roughness: 0.18}), []);
  const tag = useMemo(() => { const c = document.createElement('canvas'); c.width = 256; c.height = 360; const g = c.getContext('2d')!; g.fillStyle = '#fff'; g.fillRect(0, 0, 256, 360); g.fillStyle = '#D7263D'; g.fillRect(0, 0, 256, 110); g.fillStyle = '#fff'; g.font = '900 64px Montserrat, sans-serif'; g.textAlign = 'center'; g.fillText('DANGER', 128, 80); g.fillStyle = '#111'; g.font = '800 34px Montserrat, sans-serif'; ['NE PAS', 'MANŒUVRER'].forEach((l, i) => g.fillText(l, 128, 180 + i * 46)); g.strokeStyle = '#111'; g.lineWidth = 8; g.strokeRect(4, 4, 248, 352); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return new THREE.MeshStandardMaterial({map: t, roughness: 0.6, side: THREE.DoubleSide}); }, []);
  const up = (1 - cl(lock)) * 0.38;
  return <group position={pos} scale={s} rotation={rot}>
    <mesh material={body} castShadow><boxGeometry args={[0.9, 0.8, 0.36]} /></mesh>
    <mesh material={steel} position={[0, 0.4 + up, 0]} castShadow><torusGeometry args={[0.3, 0.07, 16, 48, Math.PI]} /></mesh>
    <mesh material={steel} position={[0.3, 0.4 + up * 0.5 - 0.08, 0]}><cylinderGeometry args={[0.07, 0.07, 0.16 + up, 16]} /></mesh>
    <mesh material={steel} position={[-0.3, 0.4 - 0.08, 0]}><cylinderGeometry args={[0.07, 0.07, 0.16, 16]} /></mesh>
    <mesh material={tag} position={[0.15, -0.95, 0.05]} rotation={[0, 0, 0.08 + Math.sin(lock * 6) * 0.05]} castShadow><planeGeometry args={[0.7, 1.0]} /></mesh>
  </group>;
};
/* ═════════════ Vitre qui éclate ═════════════ */
export const Shards: React.FC<{pos: V3; k: number; w?: number; h?: number; c?: string}> = ({pos, k, w = 3, h = 2.2, c = '#BFE3FF'}) => {
  const N = 140;
  const mesh = useMemo(() => {
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute([0, 0.12, 0, -0.1, -0.08, 0, 0.11, -0.07, 0], 3)); g.computeVertexNormals();
    const m = new THREE.InstancedMesh(g, new THREE.MeshPhysicalMaterial({color: c, roughness: 0.05, metalness: 0.1, clearcoat: 1, transparent: true, opacity: 0.85, side: THREE.DoubleSide, emissive: new THREE.Color('#9FD3FF'), emissiveIntensity: 0.15}), N); m.frustumCulled = false; return m;
  }, [c]);
  useLayoutEffect(() => {
    const o = new THREE.Object3D();
    for (let i = 0; i < N; i++) {
      const x = (random(`shx${i}`) - 0.5) * w, y = (random(`shy${i}`) - 0.5) * h;
      const vx = x * 1.6 + (random(`svx${i}`) - 0.5) * 2, vy = 1.5 + random(`svy${i}`) * 2.5, vz = 2 + random(`svz${i}`) * 3;
      o.position.set(x + vx * k, y + vy * k - 4.9 * k * k, vz * k);
      o.rotation.set(k * random(`sr${i}`) * 12, k * random(`ss${i}`) * 10, random(`st${i}`) * 6);
      o.scale.setScalar(0.9 + random(`sz${i}`) * 1.6); o.updateMatrix(); mesh.setMatrixAt(i, o.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    (mesh.material as THREE.MeshPhysicalMaterial).opacity = 0.85 * (1 - cl((k - 0.6) / 0.6));
  });
  return <primitive object={mesh} position={pos} />;
};
/* ═════════════ Maison ═════════════ */
export const House: React.FC<{pos: V3; light: number; s?: number}> = ({pos, light, s = 1}) => {
  const win = useMemo(() => new THREE.MeshStandardMaterial({color: '#2B2F3A', emissive: new THREE.Color('#FFD27A'), emissiveIntensity: 0}), []);
  win.emissiveIntensity = 1.6 * light;
  const roof = useMemo(() => { const s2 = new THREE.Shape(); s2.moveTo(-1.25, 0); s2.lineTo(0, 0.95); s2.lineTo(1.25, 0); s2.closePath(); const g = new THREE.ExtrudeGeometry(s2, {depth: 1.6, bevelEnabled: false}); g.translate(0, 0, -0.8); return g; }, []);
  return <group position={pos} scale={s}>
    <mesh position={[0, 0.7, 0]} castShadow receiveShadow><boxGeometry args={[2.1, 1.4, 1.4]} /><meshPhysicalMaterial color="#F4EBDC" roughness={0.6} clearcoat={0.2} /></mesh>
    <mesh geometry={roof} position={[0, 1.4, 0]} castShadow><meshPhysicalMaterial color="#C0392B" roughness={0.45} clearcoat={0.5} /></mesh>
    <mesh material={win} position={[-0.5, 0.8, 0.71]}><planeGeometry args={[0.5, 0.45]} /></mesh>
    <mesh material={win} position={[0.5, 0.8, 0.71]}><planeGeometry args={[0.5, 0.45]} /></mesh>
    <mesh position={[0, 0.38, 0.705]}><planeGeometry args={[0.42, 0.76]} /><meshStandardMaterial color="#7A4B2A" /></mesh>
    {light > 0.01 && <pointLight color="#FFC46B" intensity={6 * light} distance={4} position={[0, 0.9, 1.4]} />}
  </group>;
};

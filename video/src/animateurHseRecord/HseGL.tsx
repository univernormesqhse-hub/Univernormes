/**
 * Pack WebGL « Animateur HSE » — nouvelles techniques (en plus des packs SwotGL, DangerGL, FishGL, BurnGL, SafeGL, RqGL, MxGL) :
 * - `TowerCrane` : grue à tour en treillis généré par code (mât, flèche, contre-flèche, chariot), orientation, câble
 *   et charge en pendule amorti (physique analytique).
 * - `ExclusionRing` : zone d'exclusion au sol, anneau à hachures jaune / noir dont la texture défile, pulsation d'alarme.
 * - `StopSign` : panneau octogonal extrudé (biseau) avec face imprimée « STOP », qui pivote et se plante.
 * - `CauseTree` : arbre des causes — liens tubulaires qui poussent de l'événement vers les causes, cause racine qui pulse.
 * - `NightRain` : ciel qui passe de la nuit au jour (dôme dégradé), étoiles, pluie en lignes instanciées, soleil levant.
 * - `DropBall` + `ShockRing` : essai de choc sur casque (bille d'acier en chute avec rebonds amortis, onde d'impact).
 * - `Visor` : écran facial en verre physique courbe, projections qui ricochent dessus.
 * - `Glove` : gant en volume (paume arrondie, doigts en capsules) et disque de coupe qui crache des étincelles.
 * - `LifeLine` : ligne de vie en chaînette (caténaire) entre un ancrage et un harnais, tension réglable.
 * - `SignalScope` : oscilloscope 3D — signal bruité qui défile, pics faibles cerclés, courbe de prédiction.
 * - `ReportStack` : rapport final en feuilles imprimées (texture canvas), tampon qui descend et marque « VALIDÉ ».
 */
import React, {useMemo} from 'react';
import * as THREE from 'three';
import {random} from 'remotion';
import {GrowTube} from '../ishikawaRecordMetro/FishGL';
import {Tag} from '../respQhseRecordMetro/RqGL';
import {V3} from '../swotRecordMetro/SwotGL';

const cl = (v: number) => Math.min(1, Math.max(0, v));
const eo = (x: number) => 1 - Math.pow(1 - cl(x), 3);
const phys = (c: string, o: Partial<THREE.MeshPhysicalMaterialParameters> = {}) => new THREE.MeshPhysicalMaterial({color: c, roughness: 0.3, metalness: 0.15, clearcoat: 1, clearcoatRoughness: 0.08, ...o});
const YEL = '#F6C21A';

/* ═════════════ Barre entre deux points ═════════════ */
const Strut: React.FC<{a: V3; b: V3; r?: number; m: THREE.Material}> = ({a, b, r = 0.03, m}) => {
  const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b);
  const mid = A.clone().add(B).multiplyScalar(0.5);
  const d = B.clone().sub(A); const len = d.length();
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
  return <mesh material={m} position={mid} quaternion={q} castShadow><cylinderGeometry args={[r, r, len, 6]} /></mesh>;
};

/* ═════════════ Grue à tour ═════════════ */
export const TowerCrane: React.FC<{u: number; pos: V3; slew: number; trolley: number; drop: number; swing?: number; s?: number; load?: boolean}> = ({u, pos, slew, trolley, drop, swing = 0, s = 1, load = true}) => {
  const m = useMemo(() => phys(YEL, {metalness: 0.4, roughness: 0.35}), []);
  const dark = useMemo(() => phys('#2B2F3A', {metalness: 0.6}), []);
  const crate = useMemo(() => phys('#B5651D', {roughness: 0.6, clearcoat: 0.2}), []);
  const H = 6, w = 0.36, seg = 10;
  const mast: React.ReactNode[] = [];
  const cs: [number, number][] = [[-w, -w], [w, -w], [w, w], [-w, w]];
  cs.forEach(([x, z], i) => mast.push(<Strut key={`m${i}`} a={[x, 0, z]} b={[x, H, z]} r={0.035} m={m} />));
  for (let k = 0; k < seg; k++) {
    const y0 = (k / seg) * H, y1 = ((k + 1) / seg) * H;
    for (let f = 0; f < 4; f++) { const [x0, z0] = cs[f], [x1, z1] = cs[(f + 1) % 4]; mast.push(<Strut key={`d${k}${f}`} a={[x0, y0, z0]} b={[x1, y1, z1]} r={0.016} m={m} />); mast.push(<Strut key={`h${k}${f}`} a={[x0, y1, z0]} b={[x1, y1, z1]} r={0.016} m={m} />); }
  }
  const L = 5.2, back = 1.8, jh = 0.4;
  const jib: React.ReactNode[] = [];
  for (let k = 0; k < 12; k++) {
    const x0 = -back + (k / 12) * (L + back), x1 = -back + ((k + 1) / 12) * (L + back);
    jib.push(<Strut key={`j${k}`} a={[x0, 0, 0]} b={[x1, jh * (1 - Math.abs(x1) / (L + 0.6)) + 0.08, 0]} r={0.016} m={m} />);
  }
  const tx = 0.6 + trolley * (L - 0.9);
  const rope = 0.6 + drop * (H - 1.4);
  const ang = swing * Math.sin(u * 2.4) * Math.exp(-0.15 * (u % 30));
  return (
    <group position={pos} scale={s}>
      {mast}
      <mesh material={dark} position={[0, -0.1, 0]} receiveShadow castShadow><boxGeometry args={[1.4, 0.2, 1.4]} /></mesh>
      <group position={[0, H, 0]} rotation={[0, slew, 0]}>
        <mesh material={dark} position={[0, 0.2, 0]} castShadow><boxGeometry args={[0.8, 0.45, 0.7]} /></mesh>
        <mesh material={m} position={[(L - back) / 2, 0, 0]} castShadow><boxGeometry args={[L + back, 0.12, 0.3]} /></mesh>
        {jib}
        <Strut a={[0, 0, 0]} b={[0, 1.3, 0]} r={0.05} m={m} />
        <Strut a={[0, 1.3, 0]} b={[L * 0.8, 0.08, 0]} r={0.012} m={dark} />
        <Strut a={[0, 1.3, 0]} b={[-back, 0.08, 0]} r={0.012} m={dark} />
        <mesh material={dark} position={[-back + 0.3, -0.25, 0]} castShadow><boxGeometry args={[0.6, 0.5, 0.5]} /></mesh>
        <group position={[tx, -0.08, 0]}>
          <mesh material={dark}><boxGeometry args={[0.32, 0.12, 0.34]} /></mesh>
          <group rotation={[ang * 0.4, 0, ang]}>
            <mesh material={dark} position={[0, -rope / 2, 0]}><cylinderGeometry args={[0.012, 0.012, rope, 5]} /></mesh>
            <mesh material={m} position={[0, -rope, 0]}><torusGeometry args={[0.08, 0.025, 8, 16, Math.PI * 1.4]} /></mesh>
            {load && <group position={[0, -rope - 0.45, 0]}>
              <Strut a={[0, 0.4, 0]} b={[-0.45, 0, -0.3]} r={0.008} m={dark} /><Strut a={[0, 0.4, 0]} b={[0.45, 0, 0.3]} r={0.008} m={dark} />
              <mesh material={crate} position={[0, -0.25, 0]} castShadow><boxGeometry args={[1.0, 0.5, 0.7]} /></mesh>
            </group>}
          </group>
        </group>
      </group>
    </group>
  );
};

/* ═════════════ Zone d'exclusion au sol ═════════════ */
const hazardTex = (() => { let t: THREE.CanvasTexture | null = null; return () => { if (t) return t; const c = document.createElement('canvas'); c.width = 512; c.height = 64; const g = c.getContext('2d')!; for (let i = -2; i < 18; i++) { g.fillStyle = i % 2 ? '#14213D' : '#F5C400'; g.beginPath(); g.moveTo(i * 32, 64); g.lineTo(i * 32 + 32, 64); g.lineTo(i * 32 + 64, 0); g.lineTo(i * 32 + 32, 0); g.fill(); } t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; t.repeat.set(8, 1); return t; }; })();
export const ExclusionRing: React.FC<{u: number; r: number; pos: V3; k?: number; alarm?: number}> = ({u, r, pos, k = 1, alarm = 0}) => {
  const tex = hazardTex();
  const mat = useMemo(() => new THREE.MeshStandardMaterial({map: tex, roughness: 0.6, emissive: new THREE.Color('#FF3B30'), emissiveIntensity: 0}), [tex]);
  mat.emissiveIntensity = alarm * (0.25 + 0.25 * Math.sin(u * 12));
  tex.offset.x = (u * 0.15) % 1;
  return (
    <group position={pos}>
      <mesh material={mat} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]} receiveShadow><ringGeometry args={[r * cl(k) - 0.22, Math.max(0.01, r * cl(k)), 96, 1, 0, Math.PI * 2 * eo(k)]} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]}><circleGeometry args={[Math.max(0.01, r * cl(k) - 0.22), 64]} /><meshBasicMaterial color="#FF3B30" transparent opacity={0.06 + 0.1 * alarm * (0.5 + 0.5 * Math.sin(u * 12))} /></mesh>
    </group>
  );
};

/* ═════════════ Panneau STOP extrudé ═════════════ */
const stopTex = (() => { let t: THREE.CanvasTexture | null = null; return () => { if (t) return t; const c = document.createElement('canvas'); c.width = 512; c.height = 512; const g = c.getContext('2d')!; g.fillStyle = '#C8102E'; g.fillRect(0, 0, 512, 512); g.fillStyle = '#fff'; g.font = '900 170px Montserrat, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('STOP', 256, 266); t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }; })();
export const StopSign: React.FC<{pos: V3; rot?: V3; s?: number}> = ({pos, rot = [0, 0, 0], s = 1}) => {
  const geo = useMemo(() => { const sh = new THREE.Shape(); for (let i = 0; i < 8; i++) { const a = Math.PI / 8 + (i / 8) * Math.PI * 2; const x = Math.cos(a), y = Math.sin(a); if (i === 0) sh.moveTo(x, y); else sh.lineTo(x, y); } sh.closePath(); return new THREE.ExtrudeGeometry(sh, {depth: 0.12, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.05, bevelSegments: 3}); }, []);
  const face = useMemo(() => { const sh = new THREE.Shape(); for (let i = 0; i < 8; i++) { const a = Math.PI / 8 + (i / 8) * Math.PI * 2; const x = Math.cos(a) * 0.86, y = Math.sin(a) * 0.86; if (i === 0) sh.moveTo(x, y); else sh.lineTo(x, y); } sh.closePath(); const g = new THREE.ShapeGeometry(sh); const p = g.attributes.position; const uv = new Float32Array(p.count * 2); for (let i = 0; i < p.count; i++) { uv[i * 2] = p.getX(i) / 2 + 0.5; uv[i * 2 + 1] = p.getY(i) / 2 + 0.5; } g.setAttribute('uv', new THREE.BufferAttribute(uv, 2)); return g; }, []);
  const white = useMemo(() => phys('#FFFFFF'), []);
  const mat = useMemo(() => new THREE.MeshPhysicalMaterial({map: stopTex(), roughness: 0.3, clearcoat: 1}), []);
  const pole = useMemo(() => phys('#9AA3B2', {metalness: 0.8}), []);
  return (
    <group position={pos} rotation={rot} scale={s}>
      <mesh geometry={geo} material={white} castShadow />
      <mesh geometry={face} material={mat} position={[0, 0, 0.17]} />
      <mesh material={pole} position={[0, -1.9, -0.1]} castShadow><cylinderGeometry args={[0.06, 0.06, 2.4, 12]} /></mesh>
    </group>
  );
};

/* ═════════════ Arbre des causes ═════════════ */
export const CauseTree: React.FC<{u: number; nodes: {id: string; p: V3; t: string; c: string; at: number; root?: boolean}[]; edges: [string, string][]; pulse?: number}> = ({u, nodes, edges, pulse = 0}) => {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <group>
      {edges.map(([a, b]) => { const A = byId[a], B = byId[b]; const k = cl((u - B.at + 0.5) / 0.6); if (k <= 0) return null; const mid: V3 = [(A.p[0] + B.p[0]) / 2, (A.p[1] + B.p[1]) / 2 + 0.1, (A.p[2] + B.p[2]) / 2 + 0.3]; return <GrowTube key={a + b} pts={[A.p, mid, B.p]} k={k} r={0.045} c="#5B6B85" glow={B.root ? pulse : 0.15} />; })}
      {nodes.map((n) => { const k = eo((u - n.at) / 0.5); if (k <= 0) return null; const pz = n.root ? 1 + 0.08 * pulse * Math.sin(u * 10) : 1; return <Tag key={n.id} txt={n.t} bg={n.c} pos={n.p} w={1.7} s={k * pz} />; })}
    </group>
  );
};

/* ═════════════ Nuit → jour, pluie ═════════════ */
export const NightRain: React.FC<{u: number; day: number; rain: number; sun?: number}> = ({u, day, rain, sun = 0}) => {
  const dome = useMemo(() => new THREE.ShaderMaterial({side: THREE.BackSide, depthWrite: false, uniforms: {d: {value: 0}}, vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }', fragmentShader: 'uniform float d; varying vec3 vP; void main(){ float h = clamp(vP.y*0.5+0.5,0.0,1.0); vec3 nTop = vec3(0.03,0.06,0.16), nBot = vec3(0.12,0.16,0.32); vec3 dTop = vec3(0.55,0.75,0.98), dBot = vec3(1.0,0.82,0.6); vec3 n = mix(nBot,nTop,h), dd = mix(dBot,dTop,pow(h,0.7)); gl_FragColor = vec4(mix(n,dd,d),1.0); }'}), []);
  dome.uniforms.d.value = day;
  const stars = useMemo(() => { const g = new THREE.BufferGeometry(); const p = new Float32Array(600 * 3); for (let i = 0; i < 600; i++) { const th = random(`st${i}`) * Math.PI * 2, ph = 0.1 + random(`sp${i}`) * 1.2; p[i * 3] = Math.cos(th) * Math.cos(ph) * 40; p[i * 3 + 1] = Math.sin(ph) * 40; p[i * 3 + 2] = Math.sin(th) * Math.cos(ph) * 40; } g.setAttribute('position', new THREE.BufferAttribute(p, 3)); return g; }, []);
  const N = 700;
  const drops = useMemo(() => Array.from({length: N}, (_, i) => [random(`rx${i}`) * 14 - 7, random(`ry${i}`), random(`rz${i}`) * 10 - 6] as V3), []);
  const tmp = useMemo(() => new THREE.Object3D(), []);
  const inst = useMemo(() => { const m = new THREE.InstancedMesh(new THREE.BoxGeometry(0.015, 0.45, 0.015), new THREE.MeshBasicMaterial({color: '#BFD8FF', transparent: true, opacity: 0.5}), N); m.frustumCulled = false; return m; }, []);
  (inst.material as THREE.MeshBasicMaterial).opacity = 0.55 * rain;
  drops.forEach(([x, y0, z], i) => { const y = 9 - ((y0 * 10 + u * 9) % 10); tmp.position.set(x + (9 - y) * 0.12, y, z); tmp.rotation.set(0, 0, 0.12); tmp.scale.set(1, rain > 0.01 ? 1 : 0.0001, 1); tmp.updateMatrix(); inst.setMatrixAt(i, tmp.matrix); });
  inst.instanceMatrix.needsUpdate = true;
  return (
    <group>
      <mesh material={dome}><sphereGeometry args={[60, 32, 16]} /></mesh>
      <points geometry={stars}><pointsMaterial color="#ffffff" size={0.18} transparent opacity={(1 - day) * 0.9} /></points>
      <mesh position={[-4, -2 + sun * 9, -30]}><sphereGeometry args={[2.4, 32, 16]} /><meshBasicMaterial color="#FFD27A" transparent opacity={cl(sun * 1.4)} /></mesh>
      <primitive object={inst} />
    </group>
  );
};

/* ═════════════ Essai de choc : bille + onde ═════════════ */
export const dropY = (u: number, at: number, h0: number, floor: number) => {
  const g = 18; let t = u - at; if (t < 0) return h0;
  let v0 = 0, y = h0, e = 0.45, tt = Math.sqrt((2 * (h0 - floor)) / g);
  if (t < tt) return h0 - 0.5 * g * t * t;
  t -= tt; v0 = Math.sqrt(2 * g * (h0 - floor)) * e;
  for (let k = 0; k < 4; k++) { const T = (2 * v0) / g; if (t < T) { y = floor + v0 * t - 0.5 * g * t * t; return y; } t -= T; v0 *= e; }
  return floor;
};
export const DropBall: React.FC<{pos: V3; r?: number}> = ({pos, r = 0.32}) => {
  const m = useMemo(() => phys('#C9D1DC', {metalness: 1, roughness: 0.12}), []);
  return <mesh material={m} position={pos} castShadow><sphereGeometry args={[r, 48, 32]} /></mesh>;
};
export const ShockRing: React.FC<{u: number; at: number; pos: V3; c?: string; R?: number}> = ({u, at, pos, c = '#1F5BD8', R = 2.2}) => {
  const q = (u - at) / 0.7; if (q < 0 || q > 1) return null;
  return <mesh position={pos} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.2 + q * R, 0.26 + q * R + 0.12 * (1 - q), 64]} /><meshBasicMaterial color={c} transparent opacity={0.9 * (1 - q)} side={THREE.DoubleSide} /></mesh>;
};

/* ═════════════ Écran facial + projections ═════════════ */
export const Visor: React.FC<{u: number; pos: V3; at: number; s?: number}> = ({u, pos, at, s = 1}) => {
  const glass = useMemo(() => new THREE.MeshPhysicalMaterial({color: '#DDF2FF', transmission: 0.92, thickness: 0.3, roughness: 0.04, ior: 1.5, clearcoat: 1, transparent: true, opacity: 0.85, side: THREE.DoubleSide}), []);
  const rim = useMemo(() => phys('#1F5BD8'), []);
  const N = 40;
  const parts = Array.from({length: N}, (_, i) => {
    const a = at + (i / N) * 2.2; const t = u - a; if (t < 0 || t > 1.2) return null;
    const y = (random(`vy${i}`) - 0.5) * 1.4, x = (random(`vx${i}`) - 0.5) * 1.6;
    const hit = 0.35;
    const z = t < hit ? 4 - (t / hit) * 3.6 : 0.4 + (t - hit) * 3.0;
    const dx = t < hit ? 0 : (t - hit) * (random(`vd${i}`) - 0.5) * 6;
    const dy = t < hit ? 0 : -(t - hit) * (t - hit) * 6;
    return <mesh key={i} position={[x + dx, y + dy, z]}><sphereGeometry args={[0.05, 8, 6]} /><meshStandardMaterial color="#8B5A2B" emissive="#FF7A1A" emissiveIntensity={0.4} /></mesh>;
  });
  return (
    <group position={pos} scale={s}>
      <mesh material={glass} rotation={[0, Math.PI, 0]}><cylinderGeometry args={[1.4, 1.4, 1.9, 48, 1, true, -0.75, 1.5]} /></mesh>
      <mesh material={rim} position={[0, 0.98, 0.1]} rotation={[0, Math.PI, 0]}><cylinderGeometry args={[1.42, 1.42, 0.12, 48, 1, true, -0.78, 1.56]} /></mesh>
      <group position={[0, 0, -1.2]}>{parts}</group>
    </group>
  );
};

/* ═════════════ Gant + disque de coupe ═════════════ */
export const Glove: React.FC<{pos: V3; rot?: V3; s?: number; c?: string; cuff?: string}> = ({pos, rot = [0, 0, 0], s = 1, c = '#5A6475', cuff = '#C8CFD9'}) => {
  const m = useMemo(() => phys(c, {roughness: 0.75, clearcoat: 0.1}), [c]);
  const k = useMemo(() => phys(cuff, {roughness: 0.9, clearcoat: 0}), [cuff]);
  const F: [number, number, number, number][] = [[-0.36, 0.95, 0.42, 0.18], [-0.12, 1.08, 0.5, 0.06], [0.12, 1.05, 0.48, -0.04], [0.34, 0.92, 0.4, -0.14]];
  return (
    <group position={pos} rotation={rot} scale={s}>
      <mesh material={m} position={[0, 0.45, 0]} scale={[1, 1.05, 0.42]} castShadow><sphereGeometry args={[0.55, 32, 24]} /></mesh>
      {F.map(([x, y, l, a], i) => <mesh key={i} material={m} position={[x, y, 0]} rotation={[0, 0, a]} castShadow><capsuleGeometry args={[0.1, l, 6, 12]} /></mesh>)}
      <mesh material={m} position={[-0.58, 0.45, 0.05]} rotation={[0, 0, 0.9]} castShadow><capsuleGeometry args={[0.11, 0.36, 6, 12]} /></mesh>
      <mesh material={k} position={[0, -0.25, 0]} castShadow><cylinderGeometry args={[0.5, 0.46, 0.5, 32]} /></mesh>
    </group>
  );
};
export const Blade: React.FC<{u: number; pos: V3; rot?: V3; s?: number}> = ({u, pos, rot = [0, 0, 0], s = 1}) => {
  const m = useMemo(() => phys('#D9DEE6', {metalness: 1, roughness: 0.18}), []);
  const teeth = 36;
  return (
    <group position={pos} rotation={rot} scale={s}>
      <group rotation={[0, 0, -u * 18]}>
        <mesh material={m} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.7, 0.7, 0.03, 48]} /></mesh>
        {Array.from({length: teeth}, (_, i) => { const a = (i / teeth) * Math.PI * 2; return <mesh key={i} material={m} position={[Math.cos(a) * 0.74, Math.sin(a) * 0.74, 0]} rotation={[0, 0, a + 0.5]}><boxGeometry args={[0.1, 0.06, 0.03]} /></mesh>; })}
        <mesh position={[0, 0, 0.03]}><cylinderGeometry args={[0.12, 0.12, 0.06, 24]} /><meshStandardMaterial color="#D7263D" /></mesh>
      </group>
    </group>
  );
};

/* ═════════════ Ligne de vie en chaînette ═════════════ */
export const LifeLine: React.FC<{a: V3; b: V3; sag: number; k?: number; c?: string}> = ({a, b, sag, k = 1, c = '#F28C28'}) => {
  const pts: V3[] = Array.from({length: 13}, (_, i) => { const t = i / 12; const ch = Math.cosh((t - 0.5) * 3) / Math.cosh(1.5); return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t - sag * (1 - ch) / (1 - 1 / Math.cosh(1.5)), a[2] + (b[2] - a[2]) * t]; });
  const ring = useMemo(() => phys('#9AA3B2', {metalness: 0.9, roughness: 0.2}), []);
  return <group><GrowTube pts={pts} k={k} r={0.035} c={c} glow={0.2} /><mesh material={ring} position={a} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[0.16, 0.045, 12, 24]} /></mesh></group>;
};

/* ═════════════ Oscilloscope des signaux faibles ═════════════ */
export const SignalScope: React.FC<{u: number; pos: V3; w?: number; h?: number; pred: number; spikes: number[]; k?: number}> = ({u, pos, w = 5, h = 2.4, pred, spikes, k = 1}) => {
  const N = 220;
  const geo = useMemo(() => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3)); return g; }, []);
  const pg = useMemo(() => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3)); return g; }, []);
  const p = geo.attributes.position as THREE.BufferAttribute, q = pg.attributes.position as THREE.BufferAttribute;
  const vis = Math.floor(N * cl(k));
  for (let i = 0; i < N; i++) {
    const x = -w / 2 + (i / (N - 1)) * w; const ph = i * 0.18 + u * 4;
    let y = 0.18 * Math.sin(ph) * Math.sin(ph * 0.37) + 0.08 * (random(`sg${(i + Math.floor(u * 30)) % 997}`) - 0.5);
    spikes.forEach((s) => { const d = (i / N) - s; y += 0.5 * Math.exp(-d * d * 4000); });
    p.setXYZ(i, x, i < vis ? y : 0, 0);
    const tr = (i / (N - 1)); q.setXYZ(i, x, -0.9 + tr * tr * 1.9 * pred, 0.02);
  }
  p.needsUpdate = true; q.needsUpdate = true;
  geo.setDrawRange(0, Math.max(2, vis)); pg.setDrawRange(0, Math.max(2, Math.floor(N * cl(pred))));
  const frame = useMemo(() => phys('#14213D', {metalness: 0.5}), []);
  const l1 = useMemo(() => new THREE.Line(geo, new THREE.LineBasicMaterial({color: '#3CF0A8'})), [geo]);
  const l2 = useMemo(() => new THREE.Line(pg, new THREE.LineBasicMaterial({color: '#FFB020'})), [pg]);
  return (
    <group position={pos}>
      <mesh material={frame} position={[0, 0, -0.08]} castShadow><boxGeometry args={[w + 0.4, h + 0.4, 0.1]} /></mesh>
      <mesh position={[0, 0, -0.02]}><planeGeometry args={[w, h]} /><meshBasicMaterial color="#071A2E" /></mesh>
      {Array.from({length: 9}, (_, i) => <mesh key={`g${i}`} position={[-w / 2 + (i / 8) * w, 0, -0.01]}><planeGeometry args={[0.01, h]} /><meshBasicMaterial color="#1D4E6E" /></mesh>)}
      {Array.from({length: 5}, (_, i) => <mesh key={`h${i}`} position={[0, -h / 2 + (i / 4) * h, -0.01]}><planeGeometry args={[w, 0.01]} /><meshBasicMaterial color="#1D4E6E" /></mesh>)}
      <primitive object={l1} />
      <primitive object={l2} />
      {spikes.map((s, i) => { const x = -w / 2 + s * w; if (i / N > k && s > k) return null; const pul = 0.5 + 0.5 * Math.sin(u * 8 + i); return <mesh key={i} position={[x, 0.5, 0.02]}><ringGeometry args={[0.16 + pul * 0.05, 0.2 + pul * 0.05, 32]} /><meshBasicMaterial color="#FF4D5E" transparent opacity={s <= k ? 0.9 : 0} /></mesh>; })}
    </group>
  );
};

/* ═════════════ Rapport final + tampon ═════════════ */
const reportTex = (title: string, seed: number) => {
  const c = document.createElement('canvas'); c.width = 512; c.height = 720; const g = c.getContext('2d')!;
  g.fillStyle = '#FFFFFF'; g.fillRect(0, 0, 512, 720);
  g.fillStyle = '#14213D'; g.fillRect(0, 0, 512, 90);
  g.fillStyle = '#F5C400'; g.fillRect(0, 90, 512, 10);
  g.fillStyle = '#fff'; g.font = '900 40px Montserrat, sans-serif'; g.textBaseline = 'middle'; g.fillText(title, 28, 48);
  for (let i = 0; i < 12; i++) { const y = 140 + i * 44; g.fillStyle = '#CBD3DE'; g.fillRect(70, y, 380 - random(`rl${seed}${i}`) * 160, 12); g.strokeStyle = '#14213D'; g.lineWidth = 3; g.strokeRect(28, y - 8, 26, 26); if (random(`rc${seed}${i}`) > 0.3) { g.strokeStyle = '#14A35A'; g.lineWidth = 6; g.beginPath(); g.moveTo(32, y + 6); g.lineTo(40, y + 14); g.lineTo(52, y - 4); g.stroke(); } }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
};
const stampTex = (() => { let t: THREE.CanvasTexture | null = null; return () => { if (t) return t; const c = document.createElement('canvas'); c.width = 512; c.height = 256; const g = c.getContext('2d')!; g.strokeStyle = '#14A35A'; g.lineWidth = 18; g.strokeRect(14, 14, 484, 228); g.fillStyle = '#14A35A'; g.font = '900 110px Montserrat, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('VALIDÉ', 256, 132); t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }; })();
export const ReportStack: React.FC<{u: number; pos: V3; titles: string[]; at: number[]; stampAt: number; rot?: V3}> = ({u, pos, titles, at, stampAt, rot = [0, 0, 0]}) => {
  const texs = useMemo(() => titles.map((t, i) => reportTex(t, i)), [titles]);
  const st = stampTex();
  const body = useMemo(() => phys('#7A3E12', {roughness: 0.4}), []);
  const sq = (u - stampAt);
  const sy = sq < 0 ? 2.4 : sq < 0.18 ? 2.4 - (sq / 0.18) * 2.25 : sq < 0.5 ? 0.15 : 0.15 + (sq - 0.5) * 6;
  const inked = sq > 0.17;
  return (
    <group position={pos} rotation={rot}>
      {texs.map((tx, i) => { const k = eo((u - at[i]) / 0.6); if (k <= 0) return null; return <mesh key={i} position={[(1 - k) * 4 + i * 0.04, 0.02 + i * 0.03, -(1 - k) * 2 - i * 0.05]} rotation={[-Math.PI / 2, 0, (1 - k) * 0.8 + (i - titles.length / 2) * 0.05]} castShadow receiveShadow><planeGeometry args={[2.1, 2.95]} /><meshStandardMaterial map={tx} roughness={0.85} side={THREE.DoubleSide} /></mesh>; })}
      {inked && <mesh position={[0.25, 0.06 + titles.length * 0.03, 0.6]} rotation={[-Math.PI / 2, 0, 0.18]}><planeGeometry args={[1.5, 0.75]} /><meshBasicMaterial map={st} transparent opacity={0.9} /></mesh>}
      {sy < 2.4 && sy < 3.9 && <group position={[0.25, sy + titles.length * 0.03, 0.6]}>
        <mesh material={body} position={[0, 0.5, 0]} castShadow><cylinderGeometry args={[0.18, 0.25, 0.7, 24]} /></mesh>
        <mesh material={body} position={[0, 0.95, 0]} castShadow><sphereGeometry args={[0.3, 24, 16]} /></mesh>
        <mesh position={[0, 0.07, 0]} castShadow><boxGeometry args={[1.5, 0.14, 0.75]} /><meshStandardMaterial color="#14213D" /></mesh>
      </group>}
    </group>
  );
};

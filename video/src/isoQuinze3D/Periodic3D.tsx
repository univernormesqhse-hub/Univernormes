/**
 * Tableau périodique des normes en vraie 3D (WebGL, @remotion/three) : 15 tuiles extrudées qui sortent d'un vortex,
 * se rangent en grille 5 × 3, caméra en travelling + orbite, vague lumineuse diagonale (les tuiles avancent et
 * s'illuminent), reflet spéculaire qui balaie la grille, halo additif et poussière dorée. `u` = temps local (s).
 */
import React, {useLayoutEffect, useMemo} from 'react';
import {useThree} from '@react-three/fiber';
import * as THREE from 'three';
import {random} from 'remotion';
import {clamp01, ease, glowTex, outE, pg} from '../ligneInvisible/Site3D';

export type Tile3D = {pre: string; num: string; sym: string; dom: string; c: string; guide?: boolean};

const SZ = 2, GAP = 0.25, STEP = SZ + GAP;
const gridPos = (k: number): [number, number, number] => [((k % 5) - 2) * STEP, (1 - Math.floor(k / 5)) * STEP, 0];

const shade = (hex: string, f: number) => { const c = new THREE.Color(hex); c.multiplyScalar(f); return `#${c.getHexString()}`; };

const tileTex = (d: Tile3D, k: number) => {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d')!;
  const gr = g.createLinearGradient(0, 0, 512, 512);
  gr.addColorStop(0, shade(d.c, 1.25)); gr.addColorStop(1, shade(d.c, 0.72));
  g.fillStyle = gr; g.fillRect(0, 0, 512, 512);
  g.strokeStyle = 'rgba(255,255,255,0.55)'; g.lineWidth = 10; g.strokeRect(14, 14, 484, 484);
  g.fillStyle = '#fff'; g.textBaseline = 'alphabetic';
  g.font = '800 54px Montserrat, sans-serif'; g.textAlign = 'left'; g.fillText(String(k + 1), 40, 92);
  g.font = '800 40px Montserrat, sans-serif'; g.textAlign = 'right'; g.fillText(d.pre, 472, 86);
  g.font = '900 190px Montserrat, sans-serif'; g.textAlign = 'center'; g.fillText(d.sym, 256, 312, 440);
  g.font = '900 72px Montserrat, sans-serif'; g.fillText(d.num, 256, 400);
  g.font = '700 38px Montserrat, sans-serif'; g.globalAlpha = 0.92; g.fillText(d.dom.toUpperCase(), 256, 462, 440); g.globalAlpha = 1;
  if (d.guide) { g.fillStyle = '#111'; g.beginPath(); g.arc(452, 140, 34, 0, Math.PI * 2); g.fill(); g.fillStyle = '#fff'; g.font = '900 40px Montserrat, sans-serif'; g.fillText('G', 452, 154); }
  const tx = new THREE.CanvasTexture(c);
  tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 8;
  return tx;
};

/* Caméra : [u, position, cible, fov] — travelling arrière, orbite, puis plan frontal. */
type K = [number, [number, number, number], [number, number, number], number];
const KEYS: K[] = [
  [0, [0, -2, 16], [0, -0.6, 0], 46],
  [1.4, [-7, -4, 27], [0, 0, 0], 42],
  [3.4, [6, 2.5, 30], [0, -0.1, 0], 40],
  [5.0, [2.4, -1.2, 31], [0, -0.1, 0], 40],
  [9.0, [1.2, -0.6, 30.5], [0, -0.1, 0], 40],
];
const camAt = (u: number) => {
  let i = 0;
  while (i < KEYS.length - 2 && u > KEYS[i + 1][0]) i++;
  const [a, pa, ta, fa] = KEYS[i], [b, pb, tb, fb] = KEYS[i + 1];
  const e = ease(pg(u, a, b));
  const L = (x: number[], y: number[]) => x.map((v, j) => v + (y[j] - v) * e) as [number, number, number];
  return {p: L(pa, pb), t: L(ta, tb), f: fa + (fb - fa) * e};
};
const Cam: React.FC<{u: number}> = ({u}) => {
  const {camera} = useThree();
  useLayoutEffect(() => {
    const c = camAt(u);
    const cam = camera as THREE.PerspectiveCamera;
    cam.position.set(...c.p); cam.fov = c.f; cam.lookAt(...c.t); cam.updateProjectionMatrix();
  }, [u, camera]);
  return null;
};

const Tile: React.FC<{d: Tile3D; k: number; u: number}> = ({d, k, u}) => {
  const tex = useMemo(() => tileTex(d, k), [d, k]);
  const mats = useMemo(() => {
    const side = new THREE.MeshStandardMaterial({color: shade(d.c, 0.55), roughness: 0.35, metalness: 0.3});
    const face = new THREE.MeshStandardMaterial({map: tex, roughness: 0.28, metalness: 0.15, emissive: new THREE.Color(d.c), emissiveIntensity: 0});
    return {side, face, arr: [side, side, side, side, face, side]};
  }, [d.c, tex]);
  const a = 0.05 + k * 0.07;
  const p = outE(pg(u, a, a + 1.25));
  const [gx, gy] = gridPos(k);
  const ang = k * 0.42 * Math.PI + (1 - p) * 4.5;
  const r = 16 * (1 - p);
  const sx = Math.cos(ang) * r, sy = Math.sin(ang) * r * 0.7, sz = -38 * (1 - p);
  const col = k % 5, row = Math.floor(k / 5);
  const wave = Math.max(0, 1 - Math.abs(u - 2.2 - (col + row) * 0.12) * 3.2);
  const breathe = u > 4.6 ? Math.sin(u * 2.2 + k * 0.7) * 0.12 : 0;
  mats.face.emissiveIntensity = wave * 0.55;
  return (
    <mesh position={[gx * p + sx, gy * p + sy, sz + wave * 0.7 + breathe]} rotation={[(1 - p) * (2.4 + random(`rx${k}`) * 2), (1 - p) * -(3 + random(`ry${k}`) * 2), (1 - p) * 1.4]} scale={0.4 + 0.6 * p} material={mats.arr}>
      <boxGeometry args={[SZ, SZ, 0.42]} />
    </mesh>
  );
};

const Dust3D: React.FC<{u: number}> = ({u}) => {
  const geo = useMemo(() => {
    const n = 420, pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { pos[i * 3] = (random(`dx${i}`) - 0.5) * 30; pos[i * 3 + 1] = (random(`dy${i}`) - 0.5) * 40; pos[i * 3 + 2] = (random(`dz${i}`) - 0.5) * 20 - 4; }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); return g;
  }, []);
  return (
    <points geometry={geo} position={[0, u * 0.35, 0]}>
      <pointsMaterial color="#F2B630" size={0.09} transparent opacity={0.75 * clamp01(u / 1.2)} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
};

export const Periodic3DScene: React.FC<{u: number; tiles: Tile3D[]}> = ({u, tiles}) => {
  const g = glowTex();
  const sweep = pg(u, 2.0, 3.1);
  return (
    <>
      <Cam u={u} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[6, 9, 14]} intensity={2.2} />
      <directionalLight position={[-10, -4, 8]} intensity={0.7} color="#9CC4FF" />
      <pointLight position={[-14 + sweep * 28, 1, 5]} intensity={sweep > 0 && sweep < 1 ? 160 : 0} distance={18} color="#FFFFFF" />
      <sprite position={[0, 0, -6]} scale={[30 * clamp01(u / 1.4), 22 * clamp01(u / 1.4), 1]}>
        <spriteMaterial map={g} color="#F5C400" transparent opacity={0.32} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      {sweep > 0 && sweep < 1 && (
        <mesh position={[-13 + sweep * 26, 0, 0.6]} rotation={[0, 0, -0.35]}>
          <planeGeometry args={[1.2, 14]} />
          <meshBasicMaterial map={g} color="#FFFFFF" transparent opacity={0.55 * Math.sin(sweep * Math.PI)} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      )}
      {tiles.map((d, k) => <Tile key={k} d={d} k={k} u={u} />)}
      <Dust3D u={u} />
    </>
  );
};

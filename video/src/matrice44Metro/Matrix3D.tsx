/**
 * Matrice des risques 4 × 4 en vraie 3D (WebGL) : 16 colonnes dont la hauteur vaut P × G, couleur du vert au rouge,
 * qui surgissent en vague ; caméra en orbite puis vue de dessus (la matrice redevient un tableau) ; « hiérarchiser » :
 * les colonnes s'illuminent dans l'ordre de leur valeur. `u` = temps local (s).
 */
import React, {useLayoutEffect, useMemo} from 'react';
import {useThree} from '@react-three/fiber';
import * as THREE from 'three';
import {clamp01, ease, glowTex, outE, pg} from '../ligneInvisible/Site3D';

const STEP = 1.25;
export const riskColor = (v: number) => {
  const c = new THREE.Color();
  const stops: [number, string][] = [[1, '#22B573'], [4, '#F5C400'], [8, '#F07A12'], [16, '#E0383E']];
  let i = 0;
  while (i < stops.length - 2 && v > stops[i + 1][0]) i++;
  const [a, ca] = stops[i], [b, cb] = stops[i + 1];
  return c.set(ca).lerp(new THREE.Color(cb), clamp01((v - a) / (b - a)));
};
const numTex = (() => {
  const cache = new Map<string, THREE.Texture>();
  return (txt: string) => {
    const hit = cache.get(txt);
    if (hit) return hit;
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const g = c.getContext('2d')!;
    g.fillStyle = '#fff'; g.font = '900 150px Montserrat, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.lineWidth = 14; g.strokeStyle = 'rgba(11,15,24,0.85)'; g.strokeText(txt, 128, 136); g.fillText(txt, 128, 136);
    const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; cache.set(txt, tx); return tx;
  };
})();

type K = [number, [number, number, number], [number, number, number], number];
const KEYS: K[] = [
  [0, [12, 10.5, 14.5], [0, 0.6, 0], 40],
  [2.6, [-13, 11, 13], [0, 0.8, 0], 40],
  [4.2, [-5, 19, 7.5], [0, 0.2, 0], 40],
  [5.6, [0, 22, 0.01], [0, 0, 0], 40],
  [9.0, [0, 22, 0.01], [0, 0, 0], 40],
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

/** P = ligne (1 en bas → 4 en haut de l'écran en vue de dessus), G = colonne (1 à gauche → 4 à droite). */
const Bar: React.FC<{p: number; g: number; u: number; rank: number}> = ({p, g, u, rank}) => {
  const v = p * g;
  const a = 0.2 + (p + g) * 0.09;
  const grow = outE(pg(u, a, a + 0.9));
  const h = Math.max(0.02, (v / 16) * 3.2 * grow);
  const col = useMemo(() => riskColor(v), [v]);
  const lit = Math.max(0, 1 - Math.abs(u - 2.9 - rank * 0.09) * 3.5);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({color: col, roughness: 0.35, metalness: 0.15, emissive: col, emissiveIntensity: 0}), [col]);
  mat.emissiveIntensity = 0.12 + lit * 0.9;
  const x = (g - 2.5) * STEP, z = (2.5 - p) * STEP;
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, h / 2, 0]} material={mat}><boxGeometry args={[1.05, h, 1.05]} /></mesh>
      <sprite position={[0, h + 0.45, 0]} scale={[0.75 * grow, 0.75 * grow, 1]}><spriteMaterial map={numTex(String(v))} transparent depthWrite={false} /></sprite>
    </group>
  );
};

export const Matrix3DScene: React.FC<{u: number}> = ({u}) => {
  const cells = useMemo(() => {
    const l: {p: number; g: number; v: number}[] = [];
    for (let p = 1; p <= 4; p++) for (let g = 1; g <= 4; g++) l.push({p, g, v: p * g});
    const sorted = [...l].sort((a, b) => a.v - b.v || a.p - b.p);
    return l.map((c) => ({...c, rank: sorted.indexOf(c)}));
  }, []);
  const gl = glowTex();
  return (
    <>
      <Cam u={u} />
      <ambientLight intensity={1.0} />
      <directionalLight position={[5, 10, 7]} intensity={2.0} />
      <directionalLight position={[-6, 4, -5]} intensity={0.6} color="#9CC4FF" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}><planeGeometry args={[5.4, 5.4]} /><meshStandardMaterial color="#14213D" roughness={0.8} /></mesh>
      <gridHelper args={[5, 4, '#5B6B8C', '#5B6B8C']} position={[0, 0.005, 0]} />
      <sprite position={[0, 0.2, 0]} scale={[11 * clamp01(u / 1.2), 11 * clamp01(u / 1.2), 1]}><spriteMaterial map={gl} color="#F07A12" transparent opacity={0.22} depthWrite={false} blending={THREE.AdditiveBlending} /></sprite>
      {cells.map((c) => <Bar key={`${c.p}-${c.g}`} p={c.p} g={c.g} u={u} rank={c.rank} />)}
    </>
  );
};

/**
 * Habillage « blanc + roue de Deming » (demande du 16/11) :
 * - `WhiteBg` : fond totalement blanc, deux grands cercles colorés très doux qui respirent et dérivent lentement
 *   (jaune en haut à droite, bleu en bas à gauche), rien d'autre.
 * - `DemingFrame` : la bordure de cadre devient une roue de Deming déroulée — quatre segments Plan / Do / Check / Act
 *   (bleu, rouge, jaune, vert) qui tournent en continu le long du périmètre, chaque segment portant sa lettre en pastille,
 *   filet intérieur sombre.
 * - `DemingCorner` : à l'extrémité haute droite, la roue PDCA « QHSE » qui gravit sa pente, retenue par la cale
 *   (système qualité) : quatre quadrants qui tournent, moyeu « QHSE », quadrant de la section courante mis en avant.
 */
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useT} from '../anim';

export const PDCA: [string, string, string][] = [['P', 'Plan', '#1F5BD8'], ['D', 'Do', '#D7263D'], ['C', 'Check', '#F5B400'], ['A', 'Act', '#14A35A']];
const INKD = '#14213D';

export const WhiteBg: React.FC = () => {
  const t = useT();
  const b1 = 1 + 0.04 * Math.sin(t * 0.5), b2 = 1 + 0.05 * Math.cos(t * 0.42);
  return (
    <AbsoluteFill style={{background: '#FFFFFF'}}>
      <div style={{position: 'absolute', left: 700 + Math.sin(t * 0.12) * 30, top: 380 + Math.cos(t * 0.1) * 40, width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle at 40% 40%, rgba(245,196,0,0.30), rgba(245,196,0,0.20) 60%, rgba(245,196,0,0.12))', transform: `scale(${b1})`}} />
      <div style={{position: 'absolute', left: -230 + Math.cos(t * 0.11) * 30, top: 1180 + Math.sin(t * 0.09) * 40, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle at 60% 40%, rgba(31,91,216,0.16), rgba(31,91,216,0.10) 60%, rgba(31,91,216,0.06))', transform: `scale(${b2})`}} />
    </AbsoluteFill>
  );
};

export const DEMING_B = 26;
export const DemingFrame: React.FC = () => {
  const t = useT();
  const B = DEMING_B, W = 1080, H = 1920;
  const m = B / 2;
  const L = 2 * (W - B) + 2 * (H - B);
  const seg = L / 4;
  const off = (t * 90) % L;
  const path = `M ${m} ${m} L ${W - m} ${m} L ${W - m} ${H - m} L ${m} ${H - m} Z`;
  const at = (d: number): [number, number] => {
    let s = ((d % L) + L) % L; const w = W - B, h = H - B;
    if (s < w) return [m + s, m]; s -= w;
    if (s < h) return [W - m, m + s]; s -= h;
    if (s < w) return [W - m - s, H - m]; s -= w;
    return [m, H - m - s];
  };
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0}}>
        {PDCA.map(([, , c], i) => <path key={i} d={path} fill="none" stroke={c} strokeWidth={B} strokeDasharray={`${seg - 6} ${L - seg + 6}`} strokeDashoffset={-(off + i * seg)} />)}
        {PDCA.map(([, , c], i) => Array.from({length: 3}, (_, k) => { const [x, y] = at(off + i * seg + seg * (k + 0.5) / 3 + 0); return <circle key={`${i}${k}`} cx={x} cy={y} r={3} fill="#fff" opacity={0.7} />; }))}
        {PDCA.map(([l, , c], i) => { const [x, y] = at(off + i * seg + seg / 2); return <g key={l} transform={`translate(${x} ${y})`}><circle r={17} fill="#fff" stroke={c} strokeWidth={4} /><text y={7} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={20} fill={c}>{l}</text></g>; })}
        <rect x={B} y={B} width={W - 2 * B} height={H - 2 * B} fill="none" stroke={INKD} strokeWidth={3} />
      </svg>
    </AbsoluteFill>
  );
};

export const DemingCorner: React.FC<{active: number; show: number; done?: number}> = ({active, show, done = 0}) => {
  const t = useT();
  const rot = t * 40 + done * 360;
  const R = 50;
  const q = (k: number) => { const a0 = (k / 4) * Math.PI * 2 - Math.PI / 2, a1 = ((k + 1) / 4) * Math.PI * 2 - Math.PI / 2; return `M 0 0 L ${Math.cos(a0) * R} ${Math.sin(a0) * R} A ${R} ${R} 0 0 1 ${Math.cos(a1) * R} ${Math.sin(a1) * R} Z`; };
  return (
    <svg width={170} height={150} style={{position: 'absolute', left: 880, top: 40, zIndex: 41, opacity: show}}>
      <path d="M 6 138 L 164 92 L 164 138 Z" fill="#E7ECF3" stroke={INKD} strokeWidth={3} />
      <g transform="translate(70 67)">
        <g transform={`rotate(${rot})`}>
          {PDCA.map(([l, , c], k) => <g key={l}><path d={q(k)} fill={c} opacity={k === active % 4 ? 1 : 0.82} stroke="#fff" strokeWidth={3} />
            <text transform={`rotate(${(k + 0.5) * 90 - 90}) translate(0 ${-R * 0.62}) rotate(${-((k + 0.5) * 90 - 90) - rot})`} y={6} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={17} fill="#fff">{l}</text></g>)}
          <circle r={R} fill="none" stroke={INKD} strokeWidth={4} />
        </g>
        <circle r={21} fill="#fff" stroke={INKD} strokeWidth={3} />
        <text y={5} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={13} fill={INKD}>QHSE</text>
      </g>
      <path d="M 22 133 L 52 124.3 L 22 104 Z" fill={INKD} /><text x={30} y={147} fontFamily="Montserrat, sans-serif" fontWeight={800} fontSize={9} fill={INKD} opacity={0.0}>cale</text>
    </svg>
  );
};

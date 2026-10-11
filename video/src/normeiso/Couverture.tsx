import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Backdrop, shadow} from '../identui/IdentUi';
import {colors, handFont, sansFont} from '../theme';

/**
 * Couverture de « Comment fonctionne vraiment une norme ISO » : titre de la thématique et le compteur à rouleaux
 * de l'ouverture de la capsule (9001, 14001, 45001). Rendue en image fixe, posée sur les premières images de la vidéo
 * et jointe au MP4 comme vignette.
 */
const RED = '#D9443A';
const NUMS: [string, string][] = [['9001', '#3D7DD8'], ['14001', colors.green], ['45001', '#E8892B']];

const Odo: React.FC<{n: string; c: string}> = ({n, c}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
    <div style={{display: 'flex', gap: 6, background: '#fff', borderRadius: 22, boxShadow: shadow, padding: '14px 14px'}}>
      {n.split('').map((d, k) => (
        <div key={k} style={{position: 'relative', width: 50, height: 78, borderRadius: 10, background: 'linear-gradient(180deg, #E9EDF2 0%, #FFFFFF 30%, #FFFFFF 70%, #E9EDF2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 60, color: colors.navy}}>{d}</div>
      ))}
    </div>
    <div style={{width: 60, height: 8, borderRadius: 4, background: c}} />
  </div>
);

export const NormeIsoCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Backdrop />
    <div style={{position: 'absolute', left: 50, right: 50, top: 260, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: colors.green, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>NORMALISATION</div>
      <div style={{fontWeight: 900, fontSize: 76, textTransform: 'uppercase', marginTop: 26, lineHeight: 1}}>Comment fonctionne</div>
      <div style={{fontWeight: 900, fontSize: 76, textTransform: 'uppercase', marginTop: 8, lineHeight: 1}}>vraiment</div>
      <div style={{fontWeight: 900, fontSize: 132, textTransform: 'uppercase', lineHeight: 1, marginTop: 10, letterSpacing: -3, color: colors.green}}>une norme</div>
      <div style={{fontWeight: 900, fontSize: 132, textTransform: 'uppercase', lineHeight: 1, letterSpacing: -3}}>ISO ?</div>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34}}>
      <div style={{display: 'flex', gap: 26}}>{NUMS.slice(0, 2).map(([n, c]) => <Odo key={n} n={n} c={c} />)}</div>
      <Odo n={NUMS[2][0]} c={NUMS[2][1]} />
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1400, textAlign: 'center', fontWeight: 900, fontSize: 64, textTransform: 'uppercase'}}>Du <span style={{color: RED}}>chaos</span> au <span style={{color: colors.green}}>progrès</span></div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1520, textAlign: 'center', fontFamily: handFont, fontSize: 52, opacity: 0.85}}>Mais au fond, qu'est-ce qu'une norme ISO ?</div>
  </AbsoluteFill>
);

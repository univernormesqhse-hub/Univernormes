import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Backdrop, shadow} from './IdentUi';
import {F} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';

/**
 * Couverture de « Identifier ou évaluer ? » : titre de la thématique, les deux cartes de la capsule (loupe ≠ balance)
 * et le résumé final. Rendue en image fixe, posée sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
const ORANGE = '#E8892B';
const RED = '#D9443A';

const Big: React.FC<{icon: string; t: string; c: string; bg: string; tilt: number}> = ({icon, t, c, bg, tilt}) => (
  <div style={{width: 380, borderRadius: 30, background: '#fff', boxShadow: shadow, overflow: 'hidden', transform: `rotate(${tilt}deg)`}}>
    <div style={{height: 250, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={icon} size={190} /></div>
    <div style={{padding: '22px 28px 28px'}}>
      <div style={{fontWeight: 900, fontSize: 44, color: c}}>{t}</div>
      <div style={{fontWeight: 700, fontSize: 28, color: '#6B7684'}}>des risques</div>
    </div>
  </div>
);

export const IdentUiCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Backdrop />
    <div style={{position: 'absolute', left: 50, right: 50, top: 250, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: colors.green, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>ANALYSE DES RISQUES</div>
      <div style={{fontWeight: 900, fontSize: 118, textTransform: 'uppercase', marginTop: 24, lineHeight: 1, letterSpacing: -3, color: colors.green}}>Identifier</div>
      <div style={{fontWeight: 900, fontSize: 70, textTransform: 'uppercase', lineHeight: 1.1}}>ou</div>
      <div style={{fontWeight: 900, fontSize: 118, textTransform: 'uppercase', lineHeight: 1, letterSpacing: -3, color: ORANGE}}>évaluer ?</div>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 790, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30}}>
      <Big icon="loupe" t="Identification" c={colors.green} bg="#DDF1E1" tilt={-4} />
      <div style={{position: 'absolute', left: 540 - 46, top: 190, width: 92, height: 92, borderRadius: 46, background: RED, color: '#fff', fontWeight: 900, fontSize: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: shadow}}>≠</div>
      <Big icon="balance" t="Évaluation" c={ORANGE} bg="#FCE6D0" tilt={4} />
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1300, textAlign: 'center', fontWeight: 900, fontSize: 52, textTransform: 'uppercase'}}>Quelle est la <span style={{color: RED}}>différence</span> ?</div>
    <div style={{position: 'absolute', left: 80, right: 80, top: 1410, display: 'flex', flexDirection: 'column', gap: 16}}>
      {([['Identifier', "c'est repérer", colors.green], ['Évaluer', "c'est hiérarchiser", ORANGE]] as const).map(([a, b, c]) => (
        <div key={a} style={{background: '#fff', borderRadius: 22, boxShadow: shadow, padding: '16px 26px', fontSize: 40, display: 'flex', gap: 14, justifyContent: 'center'}}>
          <span style={{fontWeight: 900, color: c}}>{a},</span><span style={{fontFamily: handFont, fontSize: 46}}>{b}</span>
        </div>
      ))}
    </div>
  </AbsoluteFill>
);

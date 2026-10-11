import React from 'react';
import {AbsoluteFill, random} from 'remotion';
import {Backdrop, shadow} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';

/**
 * Couverture de « Comment identifier un feu de classe A » : titre de la thématique sur le pictogramme A embrasé de la
 * capsule. Rendue en image fixe, posée sur les premières images de la vidéo et jointe au MP4 comme vignette.
 */
const RED = '#D9443A';
const EMBER = '#E07B2B';
const MATS: [string, string][] = [['Bois', 'arbre'], ['Papier', 'parchemin'], ['Carton', 'colis']];

const Flames: React.FC<{w: number; h: number; n: number}> = ({w, h, n}) => (
  <div style={{position: 'relative', width: w, height: h}}>
    {Array.from({length: n}, (_, i) => {
      const ww = (w / n) * 1.8;
      return <div key={i} style={{position: 'absolute', left: (i / n) * w - ww * 0.2, bottom: 0, width: ww, height: h * (0.55 + random(`c${i}`) * 0.45), borderRadius: '50% 50% 45% 45% / 65% 65% 35% 35%', background: 'radial-gradient(ellipse at 50% 80%, #FFF3C0 0%, #FFC94A 30%, #FF7A1A 58%, rgba(229,67,47,0) 76%)', filter: 'blur(1.5px)'}} />;
    })}
  </div>
);

export const FeuClasseACouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont}}>
    <Backdrop />
    <div style={{position: 'absolute', left: 60, right: 60, top: 300, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: RED, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>RISQUE INCENDIE</div>
      <div style={{fontWeight: 900, fontSize: 70, color: colors.navy, textTransform: 'uppercase', marginTop: 28, lineHeight: 1}}>Comment identifier</div>
      <div style={{fontWeight: 900, fontSize: 70, color: colors.navy, textTransform: 'uppercase', marginTop: 6, lineHeight: 1}}>un feu de <span style={{color: RED}}>classe A</span></div>
    </div>
    <div style={{position: 'absolute', left: 270, top: 640, width: 540, height: 540, borderRadius: 50, background: RED, boxShadow: '0 40px 90px rgba(217,68,58,0.6)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'absolute', left: 30, right: 30, bottom: 0}}><Flames w={480} h={360} n={8} /></div>
      <div style={{position: 'relative', fontWeight: 900, fontSize: 410, color: '#fff', lineHeight: 1, textShadow: '0 0 40px rgba(255,200,80,0.9)'}}>A</div>
    </div>
    <div style={{position: 'absolute', left: 60, right: 60, top: 1260, textAlign: 'center'}}>
      <div style={{fontWeight: 900, fontSize: 56, color: colors.navy, textTransform: 'uppercase'}}>Feux de <span style={{color: EMBER}}>solides</span></div>
      <div style={{display: 'flex', justifyContent: 'center', gap: 34, marginTop: 34}}>
        {MATS.map(([l, i]) => (
          <div key={l} style={{width: 240, padding: '26px 0 22px', borderRadius: 30, background: '#fff', boxShadow: shadow, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
            <F n={i} size={120} />
            <div style={{fontWeight: 900, fontSize: 36, color: colors.navy, textTransform: 'uppercase'}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{fontFamily: handFont, fontSize: 52, color: colors.navy, opacity: 0.8, marginTop: 44}}>Tu connais un feu de classe A ?</div>
    </div>
  </AbsoluteFill>
);

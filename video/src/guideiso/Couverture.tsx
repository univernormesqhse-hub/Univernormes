import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Backdrop, shadow} from '../identui/IdentUi';
import {colors, handFont, sansFont} from '../theme';

/**
 * Couverture du « Guide ISO 9001, 14001, 45001 » : titre de la thématique et la maison fil rouge de la capsule
 * (9001 = fondation, 14001 = murs, 45001 = toit). Rendue en image fixe, posée sur les premières images de la vidéo
 * et jointe au MP4 comme vignette.
 */
const BLUE = '#2F6FB5';
const ECO = '#2E9B3E';
const SAFE = '#E8892B';

const Floor: React.FC<{n: string; l: string; c: string; w: number; h: number}> = ({n, l, c, w, h}) => (
  <div style={{width: w, height: h, background: c, borderRadius: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: shadow}}>
    <div style={{fontWeight: 900, fontSize: 64, lineHeight: 1}}>ISO {n}</div>
    <div style={{fontWeight: 800, fontSize: 28, textTransform: 'uppercase', letterSpacing: 2, marginTop: 6, opacity: 0.92}}>{l}</div>
  </div>
);

export const GuideIsoCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Backdrop />
    <div style={{position: 'absolute', left: 50, right: 50, top: 240, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: colors.navy, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>LE DÉCRYPTAGE</div>
      <div style={{fontWeight: 900, fontSize: 120, textTransform: 'uppercase', marginTop: 20, lineHeight: 1, letterSpacing: -3}}>Guide ISO</div>
      <div style={{display: 'flex', justifyContent: 'center', gap: 18, marginTop: 14, fontWeight: 900, fontSize: 72, letterSpacing: -1}}>
        <span style={{color: BLUE}}>9001</span><span style={{opacity: 0.3}}>·</span><span style={{color: ECO}}>14001</span><span style={{opacity: 0.3}}>·</span><span style={{color: SAFE}}>45001</span>
      </div>
      <div style={{fontWeight: 900, fontSize: 44, textTransform: 'uppercase', marginTop: 14}}>Qualité, écologie, sécurité</div>
    </div>
    {/* Maison : toit 45001, murs 14001, fondation 9001 */}
    <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
      <div style={{position: 'relative', width: 820, height: 300}}>
        <svg width={820} height={300} style={{position: 'absolute', inset: 0, filter: 'drop-shadow(0 20px 30px rgba(20,40,60,0.18))'}}><path d="M410 10 L810 290 L10 290 Z" fill={SAFE} stroke={SAFE} strokeWidth={20} strokeLinejoin="round" /></svg>
        <div style={{position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center', color: '#fff'}}>
          <div style={{fontWeight: 900, fontSize: 64, lineHeight: 1}}>ISO 45001</div>
          <div style={{fontWeight: 800, fontSize: 28, textTransform: 'uppercase', letterSpacing: 2, marginTop: 6}}>Santé-sécurité · le toit</div>
        </div>
      </div>
      <Floor n="14001" l="Environnement · les murs" c={ECO} w={700} h={250} />
      <Floor n="9001" l="Qualité · la fondation" c={BLUE} w={880} h={170} />
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1700, textAlign: 'center', fontFamily: handFont, fontSize: 52, opacity: 0.85}}>Bienvenue dans ce décryptage</div>
  </AbsoluteFill>
);

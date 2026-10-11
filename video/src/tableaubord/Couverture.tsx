import React from 'react';
import {AbsoluteFill, random} from 'remotion';
import {Backdrop, shadow} from '../identui/IdentUi';
import {colors, handFont, sansFont} from '../theme';

/**
 * Couverture de « Pourquoi alléger votre tableau de bord QHSE » : titre de la thématique et le passage du mur de
 * 50 indicateurs aux 5 indicateurs vitaux (sans chiffre). Rendue en image fixe, posée sur les premières images de la
 * vidéo et jointe au MP4 comme vignette.
 */
const RED = '#D9443A';
const spark = (seed: string, w: number, h: number) =>
  Array.from({length: 7}, (_, k) => `${k ? 'L' : 'M'}${(k / 6) * w} ${h * (0.2 + random(`${seed}${k}`) * 0.6)}`).join(' ');

const Tile: React.FC<{w: number; h: number; seed: string; c: string; bg?: string}> = ({w, h, seed, c, bg = '#fff'}) => (
  <div style={{width: w, height: h, borderRadius: Math.max(6, w * 0.08), background: bg, boxShadow: shadow, display: 'flex', alignItems: 'flex-end', padding: w * 0.08, boxSizing: 'border-box'}}>
    <svg width={w * 0.84} height={h * 0.55}><path d={spark(seed, w * 0.84, h * 0.55)} fill="none" stroke={c} strokeWidth={Math.max(2, w * 0.03)} strokeLinecap="round" strokeLinejoin="round" /></svg>
  </div>
);

export const TableauBordCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Backdrop />
    <div style={{position: 'absolute', left: 50, right: 50, top: 250, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: colors.green, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>PILOTAGE QHSE</div>
      <div style={{fontWeight: 900, fontSize: 80, textTransform: 'uppercase', marginTop: 26, lineHeight: 1}}>Pourquoi <span style={{color: colors.green}}>alléger</span></div>
      <div style={{fontWeight: 900, fontSize: 80, textTransform: 'uppercase', marginTop: 8, lineHeight: 1}}>votre tableau</div>
      <div style={{fontWeight: 900, fontSize: 80, textTransform: 'uppercase', marginTop: 8, lineHeight: 1}}>de bord <span style={{color: colors.green}}>QHSE</span></div>
    </div>
    {/* 50 → 5 */}
    <div style={{position: 'absolute', left: 60, top: 760, width: 960, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 70px)', gap: 8, opacity: 0.9}}>
          {Array.from({length: 50}, (_, k) => <Tile key={k} w={70} h={46} seed={`a${k}`} c={k % 3 ? '#9AA6B4' : RED} bg={k % 4 === 0 ? '#FBE3E1' : '#fff'} />)}
        </div>
        <div style={{fontWeight: 900, fontSize: 44, color: RED}}>50 indicateurs</div>
      </div>
      <svg width={110} height={80}><path d="M8 40 H90 M64 14 L94 40 L64 66" fill="none" stroke={colors.navy} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" /></svg>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          {Array.from({length: 5}, (_, k) => <Tile key={k} w={330} h={92} seed={`b${k}`} c={colors.green} />)}
        </div>
        <div style={{fontWeight: 900, fontSize: 44, color: colors.green}}>5 vitaux</div>
      </div>
    </div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1500, textAlign: 'center', fontWeight: 900, fontSize: 58, textTransform: 'uppercase'}}>Seulement <span style={{color: colors.green}}>l'essentiel</span></div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1610, textAlign: 'center', fontFamily: handFont, fontSize: 50, opacity: 0.85}}>Un indicateur doit déclencher une décision</div>
  </AbsoluteFill>
);

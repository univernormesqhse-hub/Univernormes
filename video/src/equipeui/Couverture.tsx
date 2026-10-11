import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Backdrop, shadow} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';

/**
 * Couverture de « L'architecture d'une équipe HSE performante » : titre de la thématique et l'organigramme des
 * 6 maillons de la capsule. Rendue en image fixe, posée sur les premières images de la vidéo et jointe au MP4 comme
 * vignette.
 */
const BLUE = '#3D7DD8';
const VIO = '#8E5BD0';
type N = {t: string; icon: string; chip: string; c: string; x: number; y: number};
const NODES: N[] = [
  {t: 'Responsable HSE', icon: 'directeur', chip: 'Stratégie · Conformité', c: colors.navy, x: 540, y: 820},
  {t: 'Coordonnateur HSE', icon: 'coordinatrice', chip: 'Procédures', c: BLUE, x: 245, y: 1070},
  {t: 'Superviseur HSE', icon: 'superviseur', chip: 'Encadrement', c: BLUE, x: 835, y: 1070},
  {t: 'Assistant HSE', icon: 'assistante', chip: 'Statistiques · Rapports', c: VIO, x: 540, y: 1220},
  {t: 'Agent HSE', icon: 'agent-hse', chip: 'Inspection · Intervention', c: colors.green, x: 245, y: 1370},
  {t: 'Relais HSE', icon: 'relais', chip: 'Signalement', c: colors.green, x: 835, y: 1370},
];
const LINKS: [number, number][] = [[0, 1], [0, 2], [1, 4], [2, 5], [0, 3]];

export const EquipeHseCouverture: React.FC = () => (
  <AbsoluteFill style={{fontFamily: sansFont, color: colors.navy}}>
    <Backdrop />
    <div style={{position: 'absolute', left: 50, right: 50, top: 250, textAlign: 'center'}}>
      <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: colors.green, color: '#fff', fontWeight: 800, fontSize: 30, letterSpacing: 3}}>ORGANISATION HSE</div>
      <div style={{fontWeight: 900, fontSize: 72, textTransform: 'uppercase', marginTop: 26, lineHeight: 1}}>L'architecture</div>
      <div style={{fontWeight: 900, fontSize: 72, textTransform: 'uppercase', marginTop: 8, lineHeight: 1}}>d'une équipe <span style={{color: colors.green}}>HSE</span></div>
      <div style={{fontWeight: 900, fontSize: 104, textTransform: 'uppercase', marginTop: 8, lineHeight: 1, letterSpacing: -2, color: colors.green}}>performante</div>
    </div>
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      {LINKS.map(([a, b]) => <line key={`${a}${b}`} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} stroke="#B9C3CF" strokeWidth={6} strokeDasharray="14 10" />)}
    </svg>
    {NODES.map((n) => (
      <div key={n.t} style={{position: 'absolute', left: n.x - 195, top: n.y - 70, width: 390, background: '#fff', borderRadius: 22, boxShadow: shadow, borderTop: `10px solid ${n.c}`, padding: '12px 10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}><F n={n.icon} size={50} /><div style={{fontWeight: 900, fontSize: 27, whiteSpace: 'nowrap'}}>{n.t}</div></div>
        <div style={{padding: '4px 14px', borderRadius: 20, background: n.c, color: '#fff', fontWeight: 800, fontSize: 20}}>{n.chip}</div>
      </div>
    ))}
    <div style={{position: 'absolute', left: 50, right: 50, top: 1530, textAlign: 'center', fontWeight: 900, fontSize: 48, textTransform: 'uppercase'}}><span style={{color: colors.green}}>6</span> maillons · un <span style={{color: colors.green}}>circuit fermé</span></div>
    <div style={{position: 'absolute', left: 50, right: 50, top: 1650, textAlign: 'center', fontFamily: handFont, fontSize: 50, opacity: 0.85}}>Gérer la sécurité, ce n'est pas empiler des règles</div>
  </AbsoluteFill>
);

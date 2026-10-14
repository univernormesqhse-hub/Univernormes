import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {sansFont} from '../theme';
import {Abs, easeIn, easeInOut, GREEN, Hand, INK, LOGO, PAPER, PH, pop, prog, RED, Row, T, useT, YEL} from '../implIso/kit';

export {Abs, BLUE, Chip, DIM, easeIn, easeInOut, easeOut, GREEN, Hand, INK, lerp, LOGO, Mark, PAPER, PH, Photo, pop, prog, RED, Row, Sc, spring, T, Title, useT, VIO, YEL, Bg} from '../implIso/kit';
export const ORANGE = '#F28C1E';

export type Pt = {n: number; l: string; sub: string; at: number; end: number; c: string};
export const PT: Pt[] = [
  {n: 1, l: 'Les 6 indicateurs réactifs', sub: 'Mesurer ce qui est arrivé', at: 6.3, end: 33.1, c: RED},
  {n: 2, l: 'Les 6 indicateurs proactifs', sub: 'Agir avant que ça n’arrive', at: 33.1, end: 63.1, c: GREEN},
];
export const WIPE = 2.2;
export const OUTRO_AT = 67.0;
/** Instants où chaque indicateur est nommé (remplit sa case du tableau fil rouge). */
export const FILL = [11.0, 14.6, 18.1, 22.7, 26.4, 30.0, 37.9, 42.0, 46.2, 50.4, 54.6, 59.3];

/** Fil rouge : le tableau des 12 cases (6 réactifs en rouge, 6 proactifs en vert). */
export const Board: React.FC<{cell: number; t: number; nums?: boolean; force?: number}> = ({cell, t, nums = false, force}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: cell * 0.14, padding: cell * 0.18, background: '#fff', borderRadius: cell * 0.25, border: `${Math.max(2, cell * 0.05)}px solid ${INK}`}}>
    {[0, 1].map((r) => (
      <div key={r} style={{display: 'flex', gap: cell * 0.14}}>
        {Array.from({length: 6}, (_, k) => {
          const i = r * 6 + k;
          const f = force ?? prog(t, FILL[i] - 0.1, FILL[i] + 0.3);
          const c = r ? GREEN : RED;
          return (
            <div key={k} style={{width: cell, height: cell, borderRadius: cell * 0.18, background: f > 0 ? c : '#E3E6EC', transform: `scale(${0.75 + f * 0.25})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: cell * 0.5, color: '#fff', opacity: 0.5 + f * 0.5}}>
              {nums ? k + 1 : ''}
            </div>
          );
        })}
      </div>
    ))}
  </div>
);

/* ─────────── Couverture ─────────── */
export const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('promo/terrain-controle.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 980, objectFit: 'cover', objectPosition: '55% 30%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 46%, ${PAPER} 52%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={50} y={860} w={980} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>6 RÉACTIFS · 6 PROACTIFS</div>
        <T size={84} style={{marginTop: 20, textTransform: 'uppercase', letterSpacing: -2}}>Les <span style={{background: YEL, padding: '0 18px', borderRadius: 16}}>12 indicateurs</span></T>
        <T size={70} style={{marginTop: 8, textTransform: 'uppercase', letterSpacing: -2}}>pour maîtriser sa</T>
        <T size={92} style={{textTransform: 'uppercase', letterSpacing: -2}}>performance <span style={{color: GREEN}}>QHSE</span></T>
      </Abs>
      <Row y={1380}><Board cell={96} t={0} nums force={1} /></Row>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : mur de tuiles qui pivotent en vague diagonale ─────────── */
export const TileWipe: React.FC<{p: Pt}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const C = 6, R = 10, W = 1080 / C, H = 1920 / R;
  return (
    <AbsoluteFill style={{zIndex: 55, pointerEvents: 'none'}}>
      {Array.from({length: C * R}, (_, i) => {
        const cx = i % C, cy = Math.floor(i / C);
        const d = (cx + cy) * 0.025;
        const inn = prog(t, a + d, a + d + 0.35, easeInOut);
        const out = prog(t, b - 0.55 + d, b - 0.2 + d, easeInOut);
        const ang = (1 - inn) * 90 + out * 90;
        return (
          <div key={i} style={{position: 'absolute', left: cx * W, top: cy * H, width: W + 1, height: H + 1, transform: `perspective(900px) rotateY(${ang}deg)`, opacity: ang >= 89.9 ? 0 : 1, overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: -cx * W, top: -cy * H, width: 1080, height: 1920, background: p.c}}>
              <div style={{position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 3px, transparent 3px)', backgroundSize: '40px 40px'}} />
              <Abs x={0} y={620} w={1080} style={{textAlign: 'center'}}>
                <T size={300} color="#fff" style={{lineHeight: 1}}>6</T>
                <T size={44} color="#ffffffcc" style={{letterSpacing: 10}}>INDICATEURS</T>
              </Abs>
              <Abs x={60} y={1040} w={960} style={{textAlign: 'center'}}>
                <T size={84} color="#fff">{p.n === 1 ? 'RÉACTIFS' : 'PROACTIFS'}</T>
                <Hand size={56} color="#fff" style={{marginTop: 14, opacity: 0.9}}>{p.sub}</Hand>
              </Abs>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* ─────────── En-tête ─────────── */
export const Header: React.FC = () => {
  const t = useT();
  const p = PT.find((x) => t >= x.at + WIPE - 0.3 && t < x.end);
  const intro = t > 2.6 && t < 6.0;
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 80, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {(intro || p) && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 214, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: intro ? pop(t, 2.6) * (1 - prog(t, 5.7, 6.0)) : p ? pop(t, p.at + WIPE - 0.3) * (1 - prog(t, p.end - 0.3, p.end)) : 1}}>
          <Board cell={14} t={t} />
          <div style={{padding: '6px 20px', borderRadius: 40, background: '#fff', border: `3px solid ${p ? p.c : INK}`}}><T size={30}>{p ? p.l : '12 indicateurs QHSE'}</T></div>
        </div>
      )}
    </AbsoluteFill>
  );
};


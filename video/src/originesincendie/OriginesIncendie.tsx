import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {easeInOut, easeOut, Gate, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Check} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, s, sansFont} from '../theme';
import {captions} from './captions';

/**
 * « Maîtriser les différentes origines d'un incendie industriel » (49 s) — UI motion premium (skill
 * video-promo-diagnostic-qhse), voix d'origine. Technique nouvelle dans la série : plan-séquence sur une grande planche
 * « tableau périodique des feux » — la caméra vole de case en case (dézoom au milieu de chaque trajet), chaque case
 * porte sa propre animation (braises, nappe qui s'embrase, jet de gaz, gerbe métallique Mg/Na/Al, poêle qui s'enflamme,
 * emballement thermique en chaîne), puis vue d'ensemble et partage.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 46.6;
export const ORIGINESINCENDIE_FRAMES = s(OUTRO_AT + 3.8);
const BG = '#0D1117';
const INK = '#F3F5F8';
const DIM = 'rgba(243,245,248,0.6)';
type Cls = {l: string; name: string; c: string; at: number; ex: string[]};
const CL: Cls[] = [
  {l: 'A', name: 'Solides', c: '#E07B2B', at: 3.0, ex: ['Bois', 'Papier', 'Carton']},
  {l: 'B', name: 'Liquides', c: '#2F6FB5', at: 8.8, ex: ['Essence', 'Gasoil', 'Solvants']},
  {l: 'C', name: 'Gaz', c: '#C6A400', at: 16.2, ex: ['Propane', 'Butane', 'Gaz naturel']},
  {l: 'D', name: 'Métaux', c: '#8A93A0', at: 21.8, ex: ['Mg', 'Na', 'Al']},
  {l: 'F', name: 'Huiles de cuisson', c: '#6B4FA0', at: 28.6, ex: ['Huiles', 'Graisses', 'Cuisines pro']},
  {l: 'L', name: 'Batteries lithium-ion', c: '#D9443A', at: 34.4, ex: ['Emballement', 'thermique']},
];
const CW = 1000;
const CH = 1150;
const GX = 1120;
const GY = 1270;
const center = (i: number): [number, number] => [(i % 2) * GX + CW / 2, Math.floor(i / 2) * GY + CH / 2];
const OV: [number, number, number] = [GX / 2 + CW / 2, GY + CH / 2 - 260, 0.3];
const OV_END = 40.2;

const pop = (t: number, at: number, d = 0.35) => prog(t, at, at + d, easeOut);
const T: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 34, color = INK, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, textTransform: 'uppercase', letterSpacing: -0.5, textAlign: 'center', lineHeight: 1.05, ...style}}>{children}</div>
);
const Flame: React.FC<{w: number; h: number; blue?: boolean; seed?: number}> = ({w, h, blue, seed = 0}) => {
  const t = useT();
  const fl = Math.sin(t * 14 + seed) * 0.08 + Math.sin(t * 9 + seed) * 0.05;
  return <div style={{width: w, height: h, transform: `scale(${1 + fl}, ${1 - fl})`, transformOrigin: '50% 100%', borderRadius: '50% 50% 45% 45% / 65% 65% 35% 35%', background: blue ? 'radial-gradient(ellipse at 50% 80%, #FFFFFF 0%, #9ED8FF 30%, #2F7DFF 60%, rgba(47,125,255,0) 78%)' : 'radial-gradient(ellipse at 50% 80%, #FFF3C0 0%, #FFC94A 30%, #FF7A1A 58%, rgba(229,67,47,0) 76%)', filter: 'blur(2px)'}} />;
};

/* ─────────── Animation propre à chaque case (lt = temps local depuis l'arrivée) ─────────── */
const CellViz: React.FC<{i: number; lt: number}> = ({i, lt}) => {
  const t = useT();
  const p = (a: number, b: number) => prog(lt, a, b, easeOut);
  if (i === 0) {
    return (
      <div style={{position: 'relative', width: 760, height: 520}}>
        {[['arbre', 2.8], ['parchemin', 3.6], ['colis', 4.4]].map(([n, at], k) => <div key={n as string} style={{position: 'absolute', left: 60 + k * 230, bottom: 100 + (1 - p(at as number, (at as number) + 0.5)) * 300, opacity: p(at as number, (at as number) + 0.3)}}><F n={n as string} size={200} /></div>)}
        <div style={{position: 'absolute', left: 80, right: 80, bottom: 40, height: 60, borderRadius: 30, background: `radial-gradient(ellipse, rgba(255,122,26,${0.6 + Math.sin(t * 6) * 0.2}), transparent 70%)`}} />
        {Array.from({length: 14}, (_, k) => { const q = (t * 0.5 + random(`a${k}`)) % 1; return <div key={k} style={{position: 'absolute', left: 80 + random(`x${k}`) * 600, bottom: 60 + q * 420, width: 7, height: 7, borderRadius: 4, background: '#FFB13B', opacity: Math.sin(q * Math.PI) * p(1, 2)}} />; })}
      </div>
    );
  }
  if (i === 1) {
    const spread = p(1.0, 3.0);
    const fire = p(3.4, 4.6);
    return (
      <div style={{position: 'relative', width: 760, height: 520}}>
        <div style={{position: 'absolute', left: 380 - 340 * spread, bottom: 60, width: 680 * spread, height: 120 * spread, borderRadius: '50%', background: 'radial-gradient(ellipse, #1C3F70, #10233F 70%)', boxShadow: '0 0 0 4px rgba(47,111,181,0.5)'}} />
        <div style={{position: 'absolute', left: 300, top: 10}}><F n="goutte" size={150} /></div>
        {fire > 0 && <div style={{position: 'absolute', left: 380 - 320 * fire, bottom: 100, width: 640 * fire, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>{Array.from({length: 6}, (_, k) => <Flame key={k} w={110} h={(170 + (k % 3) * 60) * fire} seed={k} />)}</div>}
      </div>
    );
  }
  if (i === 2) {
    const on = p(1.0, 1.6);
    return (
      <div style={{position: 'relative', width: 760, height: 520}}>
        <div style={{position: 'absolute', left: 60, top: 200, width: 240, height: 90, borderRadius: 20, background: '#8A6A2A'}} />
        <div style={{position: 'absolute', left: 120, top: 80, width: 120, height: 120, borderRadius: '50%', border: '16px solid #B08A3A', transform: `rotate(${on * 180}deg)`}} />
        <div style={{position: 'absolute', left: 300, top: 205, transform: 'rotate(90deg)', transformOrigin: '0 0', opacity: on}}>
          <div style={{position: 'absolute', left: 0, top: -400 * on, transform: 'translateX(-50%)'}}><Flame w={120} h={400 * on} blue /></div>
        </div>
        <div style={{position: 'absolute', left: 300, top: 230, width: 420 * on, height: 40, background: 'radial-gradient(ellipse at 0% 50%, #FFFFFF, #7CC4FF 40%, rgba(47,125,255,0) 80%)', filter: 'blur(4px)'}} />
      </div>
    );
  }
  if (i === 3) {
    const burst = p(1.4, 2.4);
    return (
      <div style={{position: 'relative', width: 760, height: 520}}>
        <div style={{position: 'absolute', left: 380, top: 250, width: 20, height: 20}}>
          {Array.from({length: 60}, (_, k) => { const a = random(`s${k}`) * Math.PI * 2; const r = (80 + random(`r${k}`) * 260) * ((lt * 0.8 + random(`o${k}`)) % 1); return <div key={k} style={{position: 'absolute', left: Math.cos(a) * r, top: Math.sin(a) * r, width: 6, height: 6, borderRadius: 3, background: '#FFFFFF', boxShadow: '0 0 10px #CFE8FF', opacity: burst * (1 - r / 340)}} />; })}
          <div style={{position: 'absolute', left: -80, top: -80, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, #FFFFFF, rgba(207,232,255,0) 70%)', opacity: burst}} />
        </div>
      </div>
    );
  }
  if (i === 4) {
    const flare = p(2.6, 3.4);
    return (
      <div style={{position: 'relative', width: 760, height: 520}}>
        <div style={{position: 'absolute', left: 150, bottom: 80, width: 460, height: 90, borderRadius: '0 0 230px 230px / 0 0 90px 90px', background: '#2A2F38'}} />
        <div style={{position: 'absolute', left: 600, bottom: 140, width: 180, height: 26, borderRadius: 13, background: '#2A2F38'}} />
        <div style={{position: 'absolute', left: 170, bottom: 150, width: 420, height: 26, borderRadius: '50%', background: '#B8862E'}} />
        <div style={{position: 'absolute', left: 230, bottom: 160, display: 'flex', alignItems: 'flex-end', gap: 0}}>{Array.from({length: 3}, (_, k) => <Flame key={k} w={130} h={(120 + k * 40) * (0.3 + 1.6 * flare) * (k === 1 ? 1.2 : 1)} seed={k} />)}</div>
      </div>
    );
  }
  // batteries : emballement thermique en chaîne
  return (
    <div style={{position: 'relative', width: 760, height: 520, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18}}>
      {Array.from({length: 6}, (_, k) => {
        const heat = prog(lt, 3.6 + k * 0.35, 4.2 + k * 0.35);
        return (
          <div key={k} style={{width: 96, height: 260, borderRadius: 18, position: 'relative', background: `linear-gradient(180deg, ${heat > 0.5 ? '#FF7A1A' : '#3A4452'}, ${heat > 0.5 ? '#D9443A' : '#232A33'})`, boxShadow: heat > 0.5 ? `0 0 ${30 * heat}px rgba(255,122,26,0.8)` : 'none', transform: `translateY(${heat > 0.9 ? Math.sin(t * 40 + k) * 3 : 0}px)`}}>
            <div style={{position: 'absolute', left: 30, top: -18, width: 36, height: 18, borderRadius: 6, background: '#8A93A0'}} />
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 14, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff'}}>{Math.round(25 + heat * 600)}°</div>
          </div>
        );
      })}
    </div>
  );
};

/* ─────────── Planche + caméra ─────────── */
const Board: React.FC = () => {
  const t = useT();
  // caméra : vue d'ensemble → chaque case → vue d'ensemble
  const keys: [number, [number, number, number]][] = [[0, OV], [2.6, OV], ...CL.map((c, i) => [c.at, [...center(i), 1]] as [number, [number, number, number]]), [OV_END, OV]];
  let k = 0;
  while (k < keys.length - 1 && t >= keys[k + 1][0]) k++;
  const [t0, a] = keys[k];
  const [t1, b] = keys[Math.min(k + 1, keys.length - 1)];
  const dur = Math.min(1.1, (t1 - t0));
  const u = k === keys.length - 1 ? 0 : prog(t, t1 - dur, t1, easeInOut);
  const x = a[0] + (b[0] - a[0]) * u;
  const y = a[1] + (b[1] - a[1]) * u;
  const sc = (a[2] + (b[2] - a[2]) * u) * (1 - 0.32 * Math.sin(Math.PI * u) * (a[2] === 1 && b[2] === 1 ? 1 : 0.4));
  const focus = CL.reduce((acc, c, i) => (t >= c.at - 0.2 && t < OV_END - 0.6 ? i : acc), -1);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, top: 0, transformOrigin: '0 0', transform: `translate(${540 - x * sc}px, ${980 - y * sc}px) scale(${sc})`}}>
        {CL.map((c, i) => {
          const [cx, cy] = center(i);
          const lt = t - c.at;
          const lit = focus === i;
          const done = t >= c.at + 1;
          return (
            <div key={c.l} style={{position: 'absolute', left: cx - CW / 2, top: cy - CH / 2, width: CW, height: CH, borderRadius: 60, background: 'linear-gradient(180deg, #171D26, #0F141B)', border: `8px solid ${lit || t > OV_END ? c.c : 'rgba(255,255,255,0.08)'}`, boxShadow: lit ? `0 0 80px ${c.c}66` : 'none', overflow: 'hidden'}}>
              <div style={{position: 'absolute', left: 50, top: 40, fontFamily: sansFont, fontWeight: 900, fontSize: 300, lineHeight: 1, color: c.c}}>{c.l}</div>
              <div style={{position: 'absolute', right: 50, top: 70, textAlign: 'right'}}>
                <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: DIM, letterSpacing: 6}}>CLASSE</div>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: c.name.length > 14 ? 52 : 70, color: INK, textTransform: 'uppercase', lineHeight: 1, maxWidth: 560}}>{c.name}</div>
                {c.l === 'L' && <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 26, color: DIM, marginTop: 14, maxWidth: 560}}>« Classe L » : appellation d'usage, hors norme EN 2</div>}
              </div>
              <div style={{position: 'absolute', left: 120, top: 400}}>{lt > -0.5 && <CellViz i={i} lt={lt} />}</div>
              <div style={{position: 'absolute', left: 40, right: 40, bottom: 50, display: 'flex', justifyContent: 'center', gap: 20}}>
                {c.ex.map((e, j) => {
                  const q = pop(t, c.at + 2.6 + j * 0.8, 0.4);
                  const elem = i === 3;
                  return <div key={e} style={{transform: `scale(${q})`, padding: elem ? 0 : '14px 28px', width: elem ? 170 : undefined, height: elem ? 170 : undefined, borderRadius: elem ? 20 : 40, border: `4px solid ${c.c}`, background: 'rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>{elem && <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 26, color: DIM}}>{[12, 11, 13][j]}</div>}<T size={elem ? 80 : 36} color={elem ? INK : INK}>{e}</T></div>;
                })}
              </div>
              {t > OV_END + 0.8 + i * 0.15 && <div style={{position: 'absolute', right: 60, bottom: 60, transform: `scale(${pop(t, OV_END + 0.8 + i * 0.15, 0.3) * 3})`, transformOrigin: '100% 100%'}}><Check p={1} size={60} color={c.c} /></div>}
              {!done && !lit && t > 2.6 && t < OV_END && <AbsoluteFill style={{background: 'rgba(13,17,23,0.55)'}} />}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const Overlay: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: '50%', top: 95, transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.94)', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {t < 2.8 && <div style={{position: 'absolute', left: 60, right: 60, top: 300, opacity: pop(t, 0.3) * (1 - prog(t, 2.4, 2.8))}}><T size={74}>Les différentes</T><T size={92} color="#FF7A1A">classes de feu</T></div>}
      {t > OV_END && t < 44.3 && <div style={{position: 'absolute', left: 60, right: 60, top: 300, opacity: pop(t, OV_END + 0.2)}}><T size={66}>Connaître la nature du feu</T><T size={66} color="#3FBF5F">= extinction adaptée</T></div>}
      {t >= 44.3 && (
        <div style={{position: 'absolute', left: 60, right: 60, top: 300, opacity: pop(t, 44.4)}}>
          <T size={84} color="#3FBF5F">Partage à ton équipe</T>
          <div style={{display: 'flex', justifyContent: 'center', gap: 22, marginTop: 30}}>{['ouvrier', 'ouvrier-dark', 'salariee', 'agent-hse'].map((n, k) => <div key={n} style={{width: 120, height: 120, borderRadius: 60, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(t, 44.7 + k * 0.15, 0.3)})`}}><F n={n} size={90} /></div>)}</div>
        </div>
      )}
      <div style={{position: 'absolute', left: 0, right: 0, top: 1540, display: 'flex', justifyContent: 'center', gap: 14, opacity: t > 2.8 && t < OV_END ? 1 : 0}}>
        {CL.map((c, i) => <div key={c.l} style={{width: 70, height: 70, borderRadius: 16, background: t >= c.at - 0.2 ? c.c : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff', transform: `scale(${t >= c.at - 0.2 && (i === CL.length - 1 || t < CL[i + 1].at - 0.2) ? 1.15 : 0.9})`}}>{c.l}</div>)}
      </div>
      
    </AbsoluteFill>
  );
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'bass-hit', v: 0.45},
  ...CL.map((_, i) => ({at: 0.4 + i * 0.12, s: 'sfx/click', v: 0.3})),
  ...CL.map((c) => ({at: c.at - 1.1, s: 'soft-whoosh', v: 0.5})),
  ...CL.map((c) => ({at: c.at - 0.05, s: 'deep-hit', v: 0.4})),
  ...CL.flatMap((c) => c.ex.map((_, j) => ({at: c.at + 2.6 + j * 0.8, s: 'sfx/pop', v: 0.35}))),
  {at: 3.0 + 1, s: 'tension', v: 0.18, dur: 2},
  {at: 8.8 + 3.4, s: 'sfx/whoosh', v: 0.45},
  {at: 16.2 + 1.0, s: 'riser', v: 0.22, dur: 1.2},
  {at: 21.8 + 1.4, s: 'bass-hit', v: 0.45},
  {at: 28.6 + 2.6, s: 'sfx/whoosh', v: 0.5},
  ...Array.from({length: 6}, (_, k) => ({at: 34.4 + 3.6 + k * 0.35, s: 'tick', v: 0.45})),
  {at: 34.4 + 5.8, s: 'alarme', v: 0.12, dur: 0.8},
  {at: OV_END - 1.1, s: 'soft-whoosh', v: 0.55},
  ...CL.map((_, i) => ({at: OV_END + 0.8 + i * 0.15, s: 'tick', v: 0.4})),
  {at: 44.4, s: 'notification', v: 0.4},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const OriginesIncendie: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 40%, #1A2230 0%, #0D1117 70%)'}} />
    <Gate from={0} to={OUTRO_AT}><Board /></Gate>
    <Gate from={0} to={OUTRO_AT}><Overlay /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)'}} /></Gate>
    <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-origines-incendie-origine.m4a')} trimAfter={s(46.4)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

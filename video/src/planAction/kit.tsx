import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {sansFont} from '../theme';
import {Abs, BLUE, easeIn, easeOut, GREEN, Hand, INK, LOGO, PAPER, PH, pop, prog, RED, T, useT, VIO, YEL} from '../implIso/kit';

export {Abs, BLUE, Chip, Cite, DIM, easeIn, easeInOut, easeOut, GREEN, Hand, INK, lerp, LOGO, Mark, PAPER, PH, Photo, pop, prog, RED, Row, Sc, spring, T, Title, useT, VIO, YEL, Bg} from '../implIso/kit';
export const ORANGE = '#F28C1E';
export const TEAL = '#14A3A3';

export type Step = {n: number; l: string; at: number; c: string};
export const STEPS: Step[] = [
  {n: 1, l: 'Identifier & analyser', at: 48.1, c: RED},
  {n: 2, l: 'Définir les actions', at: 66.3, c: ORANGE},
  {n: 3, l: 'Désigner un responsable', at: 87.4, c: YEL},
  {n: 4, l: 'Fixer les délais & prioriser', at: 99.6, c: GREEN},
  {n: 5, l: 'Déterminer les ressources', at: 117.6, c: TEAL},
  {n: 6, l: 'Suivre l’avancement', at: 131.3, c: BLUE},
  {n: 7, l: 'Vérifier l’efficacité', at: 144.4, c: VIO},
  {n: 8, l: 'Mettre à jour', at: 164.0, c: INK},
];
export const CLAP = 1.7;
export const END_STEPS = 179.3;
export const OUTRO_AT = 203.0;
export const stepEnd = (i: number) => (i < 7 ? STEPS[i + 1].at : END_STEPS);

/** Fil rouge : la feuille « Plan d'action » dont les 8 lignes se remplissent. filled ∈ [0, 8]. */
export const PlanSheet: React.FC<{w: number; filled: number; labels?: boolean}> = ({w, filled, labels = true}) => {
  const rh = w * 0.1;
  return (
    <div style={{width: w, background: '#fff', borderRadius: w * 0.03, border: `${Math.max(2, w * 0.006)}px solid ${INK}`, boxShadow: '0 20px 40px rgba(20,33,61,0.16)', overflow: 'hidden'}}>
      <div style={{height: rh * 1.1, background: INK, display: 'flex', alignItems: 'center', padding: `0 ${w * 0.04}px`, fontFamily: sansFont, fontWeight: 900, fontSize: rh * 0.5, color: '#fff', letterSpacing: 2}}>PLAN D’ACTION QHSE</div>
      {STEPS.map((s, i) => {
        const f = Math.max(0, Math.min(1, filled - i));
        return (
          <div key={i} style={{height: rh, display: 'flex', alignItems: 'center', gap: w * 0.03, padding: `0 ${w * 0.04}px`, borderBottom: i < 7 ? '2px solid #E3E6EC' : 'none', background: f > 0 ? `${s.c}${f >= 1 ? '18' : '10'}` : '#fff'}}>
            <div style={{width: rh * 0.62, height: rh * 0.62, borderRadius: rh * 0.16, background: f > 0 ? s.c : '#E3E6EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: rh * 0.38, flex: '0 0 auto'}}>{s.n}</div>
            {labels && <div style={{flex: 1, fontFamily: sansFont, fontWeight: 800, fontSize: rh * 0.36, color: f > 0 ? INK : '#B5BCCB', clipPath: `inset(0 ${(1 - f) * 100}% 0 0)`}}>{s.l}</div>}
            <div style={{fontSize: rh * 0.5, fontWeight: 900, color: GREEN, opacity: f >= 1 ? 1 : 0}}>✓</div>
          </div>
        );
      })}
    </div>
  );
};
export const filledAt = (t: number) => STEPS.reduce((acc, s, i) => acc + prog(t, s.at + 0.6, stepEnd(i) - 0.4, (x) => x), 0);

/* ─────────── Couverture ─────────── */
export const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('promo/audit-reunion.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 960, objectFit: 'cover', objectPosition: '50% 45%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 30%, ${PAPER}DD 45%, ${PAPER} 50%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={50} y={820} w={980} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>LES 8 ÉTAPES CLÉS</div>
        <T size={96} style={{marginTop: 20, textTransform: 'uppercase', letterSpacing: -2}}>Maîtriser le</T>
        <T size={120} style={{textTransform: 'uppercase', letterSpacing: -3, lineHeight: 1.05}}><span style={{background: YEL, padding: '0 22px', borderRadius: 18}}>plan d’action</span></T>
        <T size={110} style={{textTransform: 'uppercase', letterSpacing: -3}}><span style={{color: GREEN}}>QHSE</span></T>
      </Abs>
      <Abs x={0} y={1420} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 12}}>{STEPS.map((s) => <div key={s.n} style={{width: 92, height: 92, borderRadius: 18, background: s.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: s.c === YEL ? INK : '#fff'}}>{s.n}</div>)}</Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : le clap de cinéma « Étape N » ─────────── */
export const Clap: React.FC<{s: Step}> = ({s}) => {
  const t = useT();
  const a = s.at, b = s.at + CLAP;
  if (t < a || t > b) return null;
  const inn = prog(t, a, a + 0.35, easeOut);
  const out = prog(t, b - 0.35, b, easeIn);
  const arm = 1 - prog(t, a + 0.45, a + 0.62, easeIn) + prog(t, b - 0.5, b - 0.3);
  const shake = Math.max(0, 1 - Math.abs(t - a - 0.64) * 8) * 14;
  const W = 900, x0 = 90, y0 = 560 + (1 - inn) * 1400 - out * 1400;
  const fg = s.c === YEL ? INK : '#fff';
  return (
    <AbsoluteFill style={{zIndex: 55, pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: INK, opacity: 0.45 * inn * (1 - out)}} />
      <Abs x={x0 + Math.sin(t * 90) * shake} y={y0} w={W} h={700}>
        <div style={{position: 'absolute', left: 0, top: 140, width: W, height: 560, borderRadius: 24, background: '#1E2433', boxShadow: '0 40px 80px rgba(0,0,0,0.5)', padding: '40px 50px', boxSizing: 'border-box'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid #ffffff55', paddingBottom: 14}}>
            <span style={{fontFamily: 'monospace', fontSize: 30, color: '#ffffffaa', letterSpacing: 3}}>PLAN D’ACTION QHSE</span>
            <span style={{fontFamily: 'monospace', fontSize: 30, color: '#ffffffaa'}}>PRISE 1</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 36, marginTop: 40}}>
            <div style={{width: 200, height: 200, borderRadius: 30, background: s.c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={150} color={fg}>{s.n}</T></div>
            <div>
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: '#ffffffaa', letterSpacing: 6}}>ÉTAPE {s.n} / 8</div>
              <T size={60} color="#fff" style={{marginTop: 8, maxWidth: 520}}>{s.l}</T>
            </div>
          </div>
          <Hand size={44} color="#ffffff88" style={{position: 'absolute', left: 50, bottom: 30}}>Action !</Hand>
        </div>
        <div style={{position: 'absolute', left: 0, top: 70, width: W, height: 80, background: 'repeating-linear-gradient(135deg, #fff 0 60px, #1E2433 60px 120px)', borderRadius: 10}} />
        <div style={{position: 'absolute', left: 0, top: 70, width: W, height: 80, background: 'repeating-linear-gradient(45deg, #fff 0 60px, #1E2433 60px 120px)', borderRadius: 10, transformOrigin: '0% 100%', transform: `rotate(${-arm * 28}deg)`}} />
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── En-tête : ruban des 8 étapes ─────────── */
export const Header: React.FC = () => {
  const t = useT();
  const cur = STEPS.filter((s) => t >= s.at + CLAP - 0.3).length - 1;
  const inSteps = cur >= 0 && t < END_STEPS;
  const intro = t > 2.6 && t < 47.8;
  const fin = t >= END_STEPS;
  const f = filledAt(t);
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 80, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {(intro || inSteps || fin) && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 214, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: intro ? pop(t, 2.6) * (1 - prog(t, 47.5, 47.8)) : pop(t, inSteps ? STEPS[cur].at + CLAP - 0.3 : END_STEPS)}}>
          <div style={{display: 'flex', gap: 4}}>{STEPS.map((s, i) => <div key={i} style={{width: 16, height: 30, borderRadius: 4, background: f > i ? s.c : '#D5DBE6'}} />)}</div>
          <div style={{padding: '6px 20px', borderRadius: 40, background: '#fff', border: `3px solid ${inSteps ? STEPS[cur].c : INK}`}}><T size={30}>{inSteps ? `Étape ${cur + 1}. ${STEPS[cur].l}` : fin ? 'À retenir' : 'Plan d’action QHSE'}</T></div>
        </div>
      )}
    </AbsoluteFill>
  );
};


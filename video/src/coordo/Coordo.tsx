import React from 'react';
import {AbsoluteFill, Audio, Img, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s, sansFont} from '../theme';
import {Abs, Bg, BLUE, Chip, DIM, easeIn, easeInOut, easeOut, GREEN, Hand, INK, lerp, LOGO, Mark, PAPER, PH, Photo, pop, prog, RED, Row, Sc, spring, T, Title, useT} from '../implIso/kit';
import {captions} from './captions';

/**
 * « Le rôle stratégique du coordinateur HSE » (28 s) — voix d'origine, sous-titres recalés mot à mot, photo réelle fournie
 * (coordinatrice en entrepôt) en couverture et en final, thème « papier quadrillé » de la série.
 * Fil rouge inédit : la partition du chef d'orchestre — une portée dont les notes sont les acteurs du terrain (casque,
 * extincteur, chariot, gilet, tablette) et qui battent la mesure ; transition : la baguette dorée trace un arc qui
 * balaie l'écran. Autres techniques nouvelles : badges « bonnes conditions » qui se posent sur chaque acteur, tablette de
 * contrôle qui se coche, « constater » barré au profit de l'action, réseau d'équipes relié au coordinateur avec barres de
 * suivi des actions, frise des étapes des opérations où s'allument bouclier et feuille, crescendo final.
 */
const ORANGE = '#F28C1E';
const GOLD = '#E0A800';
const OUTRO_AT = 26.2;
export const COORDO_FRAMES = s(OUTRO_AT + 3.8);
const NOTES = [{ic: 'casque', c: ORANGE}, {ic: 'extincteur', c: RED}, {ic: 'chariot', c: BLUE}, {ic: 'gilet', c: GREEN}, {ic: 'ordinateur', c: '#7B5CD6'}];

/** La portée : 5 lignes, les acteurs-notes sautent en rythme ; harmony ∈ [0,1] aligne les notes. */
const Staff: React.FC<{w: number; harmony?: number; beat?: boolean}> = ({w, harmony = 0, beat = true}) => {
  const t = useT();
  const h = w * 0.36;
  const gap = h / 6;
  return (
    <div style={{position: 'relative', width: w, height: h}}>
      {[1, 2, 3, 4, 5].map((k) => <div key={k} style={{position: 'absolute', left: 0, right: 0, top: k * gap, height: Math.max(2, w * 0.004), background: INK, opacity: 0.6}} />)}
      <div style={{position: 'absolute', left: w * 0.01, top: gap * 0.4, fontSize: h * 0.85, lineHeight: 1, color: INK, fontFamily: 'serif'}}>𝄞</div>
      {NOTES.map((n, i) => {
        const base = [3.6, 2.4, 4.2, 1.8, 3.0][i];
        const y = lerp(base, 3, harmony) * gap - (beat ? Math.abs(Math.sin(t * 4.2 + i * 0.9)) * gap * 0.5 : 0);
        const sz = w * 0.12;
        return (
          <div key={i} style={{position: 'absolute', left: w * (0.2 + i * 0.16), top: y - sz / 2, width: sz, height: sz, borderRadius: sz / 2, background: '#fff', border: `${Math.max(2, w * 0.006)}px solid ${n.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <F n={n.ic} size={sz * 0.72} />
          </div>
        );
      })}
    </div>
  );
};

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('coordo/coordinatrice.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1020, objectFit: 'cover', objectPosition: '50% 25%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 34%, ${PAPER}DD 48%, ${PAPER} 54%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={50} y={900} w={980} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>LE CHEF D’ORCHESTRE DE LA SÉCURITÉ</div>
        <T size={84} style={{marginTop: 20, textTransform: 'uppercase', letterSpacing: -2}}>Le rôle stratégique du</T>
        <T size={98} style={{textTransform: 'uppercase', letterSpacing: -3, lineHeight: 1.1}}><span style={{background: '#F5B700', padding: '0 22px', borderRadius: 18}}>coordinateur</span></T>
        <T size={120} style={{textTransform: 'uppercase', letterSpacing: -3, color: GREEN}}>HSE</T>
      </Abs>
      <Abs x={190} y={1430}><Staff w={700} beat={false} harmony={1} /></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : la baguette dorée balaie l'écran ─────────── */
const Baton: React.FC<{at: number; label: string}> = ({at, label}) => {
  const t = useT();
  if (t < at || t > at + 1.4) return null;
  const sw = prog(t, at, at + 0.6, easeInOut);
  const back = prog(t, at + 0.9, at + 1.4, easeIn);
  const ang = -60 + sw * 140;
  const R = 2200;
  return (
    <AbsoluteFill style={{zIndex: 55, pointerEvents: 'none'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={`M 1080 1920 L ${1080 + Math.cos(((-150) * Math.PI) / 180) * R} ${1920 + Math.sin(((-150) * Math.PI) / 180) * R} A ${R} ${R} 0 0 1 ${1080 + Math.cos(((-150 + sw * 120 - back * 120) * Math.PI) / 180) * R} ${1920 + Math.sin(((-150 + sw * 120 - back * 120) * Math.PI) / 180) * R} Z`} fill={GOLD} opacity={0.95} />
      </svg>
      <div style={{position: 'absolute', left: 900, top: 1700, width: 1200, height: 16, borderRadius: 8, background: 'linear-gradient(90deg, #fff, #F5D77A)', transformOrigin: '0 50%', transform: `rotate(${ang - 120}deg)`, boxShadow: `0 0 30px ${GOLD}`, opacity: 1 - back}} />
      <Abs x={0} y={780} w={1080} style={{textAlign: 'center', opacity: prog(t, at + 0.4, at + 0.6) * (1 - back)}}><span style={{display: 'inline-block', background: '#fff', borderRadius: 30, padding: '10px 40px', border: `6px solid ${INK}`}}><T size={100}>{label}</T></span></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Scènes ─────────── */
const Maestro: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Title size={46}>Le <Mark p={prog(t, 2.6, 3.4)}>chef d’orchestre</Mark> de la sécurité</Title>
      <Photo src="coordo/coordinatrice.jpg" x={240} y={430} w={600} h={600} pos="50% 25%" />
      <Abs x={90} y={1090}><Staff w={900} /></Abs>
      {t > 5.0 && <Row y={1430}><Chip c={GREEN} light size={36} style={{opacity: pop(t, 5.0)}}>sur le terrain</Chip></Row>}
    </AbsoluteFill>
  );
};
const Conditions: React.FC = () => {
  const t = useT();
  const A = [{ph: 'induction/operatrice.jpg', l: 'Opérateurs'}, {ph: 'promo/hse-machine.jpg', l: 'Techniciens'}, {ph: 'induction/mine-equipe.jpg', l: 'Équipes terrain'}, {ph: 'integration/agent-terrain.jpg', l: 'Sous-traitants'}];
  return (
    <AbsoluteFill>
      <Title>Chaque acteur dans les <Mark c={GREEN} p={prog(t, 9.4, 10.0)}>bonnes conditions</Mark></Title>
      {A.map((a, i) => (
        <Photo key={i} src={a.ph} x={60 + (i % 2) * 490} y={450 + Math.floor(i / 2) * 500} w={470} h={470} q={0.85 + pop(t, 7.4 + i * 0.25) * 0.15} o={pop(t, 7.4 + i * 0.25)}>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '50px 18px 16px', background: 'linear-gradient(180deg, transparent, rgba(20,33,61,0.85))'}}><T size={34} color="#fff">{a.l}</T></div>
          {t > 9.5 + i * 0.15 && <div style={{position: 'absolute', right: 16, top: 16, width: 80, height: 80, borderRadius: 40, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 52, fontWeight: 900, transform: `scale(${spring(t, 9.5 + i * 0.15)})`}}>✓</div>}
        </Photo>
      ))}
    </AbsoluteFill>
  );
};
const Tablet: React.FC = () => {
  const t = useT();
  const L = ['Extincteurs vérifiés', 'Passerelles dégagées', 'Zones balisées', 'Éclairage testé'];
  return (
    <AbsoluteFill>
      <Title>Chaque risque <Mark c={ORANGE} p={prog(t, 11.7, 12.4)}>anticipé</Mark></Title>
      <Abs x={160} y={440} w={760} h={900} style={{background: INK, borderRadius: 50, padding: 40, boxSizing: 'border-box', transform: `rotate(${-3 + pop(t, 10.6) * 3}deg)`}}>
        <div style={{width: '100%', height: '100%', background: '#fff', borderRadius: 26, padding: '40px 40px', boxSizing: 'border-box'}}>
          <T size={40}>Liste de contrôle sécurité</T>
          {L.map((l, i) => (
            <div key={l} style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 40}}>
              <div style={{width: 64, height: 64, borderRadius: 14, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GREEN, fontSize: 50, fontWeight: 900}}>{t > 11.9 + i * 0.5 ? '✓' : ''}</div>
              <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 36, color: INK}}>{l}</div>
            </div>
          ))}
        </div>
      </Abs>
      {t > 14.4 && <Abs x={500} y={1250} style={{transform: `rotate(-8deg) scale(${spring(t, 14.4)})`}}><Chip c={RED} light size={40}>🎲 Rien au hasard</Chip></Abs>}
    </AbsoluteFill>
  );
};
const Network: React.FC = () => {
  const t = useT();
  const cross = prog(t, 17.0, 17.5);
  const N = [[200, 560], [880, 560], [140, 980], [940, 980], [540, 1260]];
  return (
    <AbsoluteFill>
      <Row y={340}><div style={{position: 'relative', opacity: 1 - prog(t, 17.8, 18.2) * 0.6}}><Chip c="#fff" size={40} style={{border: `4px solid ${DIM}`, color: DIM}}>👁 Constater les problèmes</Chip><div style={{position: 'absolute', left: -10, right: -10, top: '50%', height: 10, background: RED, transform: `scaleX(${cross})`, transformOrigin: '0 50%'}} /></div></Row>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {N.map(([x, y], i) => <line key={i} x1={540} y1={780} x2={x} y2={y} stroke={GREEN} strokeWidth={8} strokeDasharray={600} strokeDashoffset={600 * (1 - prog(t, 18.2 + i * 0.12, 18.7 + i * 0.12))} />)}
      </svg>
      <Abs x={400} y={640} w={280} h={280} style={{borderRadius: 140, overflow: 'hidden', border: `8px solid ${GOLD}`, boxShadow: `0 0 40px ${GOLD}88`}}><Img src={PH('coordo/coordinatrice.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 25%'}} /></Abs>
      {N.map(([x, y], i) => (
        <Abs key={i} x={x - 80} y={y - 80} w={160} h={160} style={{borderRadius: 80, background: '#fff', border: `6px solid ${NOTES[i].c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 18.4 + i * 0.12)})`}}><F n={['equipe', 'superviseur', 'ouvrier', 'salariee', 'intervenant'][i]} size={100} /></Abs>
      ))}
      {t > 19.5 && (
        <Abs x={140} y={1400} w={800} style={{opacity: pop(t, 19.5)}}>
          <T size={34}>Actions correctives</T>
          {[0.9, 0.6, 0.35].map((v, i) => <div key={i} style={{marginTop: 14, height: 26, borderRadius: 13, background: '#E3E6EC', overflow: 'hidden'}}><div style={{height: '100%', width: `${v * prog(t, 19.7 + i * 0.2, 20.7 + i * 0.2) * 100}%`, background: [GREEN, ORANGE, BLUE][i]}} /></div>)}
        </Abs>
      )}
    </AbsoluteFill>
  );
};
const Steps: React.FC = () => {
  const t = useT();
  const S = ['Préparation', 'Exécution', 'Contrôle', 'Clôture'];
  const fin = prog(t, 24.9, 25.6);
  return (
    <AbsoluteFill>
      <Title>Une <Mark c={GREEN} p={prog(t, 23.6, 24.3)}>priorité</Mark> à chaque étape</Title>
      <div style={{position: 'absolute', left: 120, right: 120, top: 640, height: 12, borderRadius: 6, background: '#E3E6EC'}} />
      <div style={{position: 'absolute', left: 120, top: 640, height: 12, borderRadius: 6, background: GREEN, width: 840 * prog(t, 23.5, 25.2, (x) => x)}} />
      {S.map((l, i) => {
        const on = t > 23.5 + i * 0.4;
        return (
          <Abs key={l} x={60 + i * 250} y={560} w={210} style={{textAlign: 'center'}}>
            <div style={{width: 160, height: 160, margin: '0 auto', borderRadius: 80, background: on ? '#fff' : '#F1F2F5', border: `6px solid ${on ? GREEN : '#C9CED8'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4}}>
              <div style={{transform: `scale(${on ? spring(t, 23.5 + i * 0.4) : 0.6})`, display: 'flex'}}><F n="bouclier" size={60} /><F n="feuille" size={56} /></div>
            </div>
            <T size={30} style={{marginTop: 14}}>{l}</T>
          </Abs>
        );
      })}
      <Row y={900} gap={16}>
        <div style={{transform: `scale(${spring(t, 21.9)})`}}><Chip c={BLUE} light size={38}>🛡 Sécurité</Chip></div>
        <div style={{transform: `scale(${spring(t, 22.7)})`}}><Chip c={GREEN} light size={38}>🌿 Environnement</Chip></div>
      </Row>
      <Abs x={190} y={1080} style={{opacity: 0.4 + fin * 0.6}}><Staff w={700} harmony={fin} /></Abs>
    </AbsoluteFill>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...rep(2.7, 8, 0.375, 'tick', 0.18), {at: 5.0, s: 'sfx/ding', v: 0.22},
  {at: 6.0, s: 'sfx/whoosh', v: 0.45}, {at: 6.4, s: 'sfx/bell', v: 0.3}, {at: 7.0, s: 'sfx/swish', v: 0.3},
  ...[7.4, 7.65, 7.9, 8.15].map((at) => ({at, s: 'sfx/pop', v: 0.22})), ...[9.5, 9.65, 9.8, 9.95].map((at) => ({at, s: 'sfx/ding', v: 0.18})),
  {at: 10.6, s: 'sfx/whoosh', v: 0.3}, ...[11.9, 12.4, 12.9, 13.4].map((at) => ({at, s: 'sfx/click', v: 0.4})), {at: 14.4, s: 'sfx/pop', v: 0.3},
  {at: 17.0, s: 'sfx/swish', v: 0.4}, ...rep(18.2, 5, 0.12, 'sfx/pop', 0.22), {at: 19.6, s: 'sfx/rise', v: 0.25},
  {at: 21.9, s: 'sfx/pop', v: 0.25}, {at: 22.7, s: 'sfx/pop', v: 0.25}, ...[23.5, 23.9, 24.3, 24.7].map((at) => ({at, s: 'sfx/ding', v: 0.2})), {at: 25.0, s: 'validation', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Coordo: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.0} to={OUTRO_AT}>
      <Sc a={2.4} b={6.2}><Maestro /></Sc>
      <Sc a={7.2} b={10.6}><Conditions /></Sc>
      <Sc a={10.5} b={15.6}><Tablet /></Sc>
      <Sc a={15.5} b={21.1}><Network /></Sc>
      <Sc a={21.0} b={OUTRO_AT}><Steps /></Sc>
    </Gate>
    <Gate from={6.0} to={7.5}><Baton at={6.0} label="Son rôle ?" /></Gate>
    <Gate from={0} to={OUTRO_AT}>
      <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
        <div style={{position: 'absolute', left: '50%', top: 80, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      </AbsoluteFill>
    </Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-coordinateur-hse-origine.m4a')} trimAfter={s(26.0)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);


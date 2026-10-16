import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {Blinds, Board, Center, Deep, Dust, Kin, Out, Pill, Stamp, Tile, Word} from '../durab/Durab';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {handFont, s, sansFont} from '../theme';
import {Abs, Bg, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, LOGO, PAPER, PH, pop, prog, RED, spring, T, useT} from '../implIso/kit';
import {Brut, HiLine, Link, Mono, Strike} from '../tdbPilot/TdbPilot';
import {captions} from './captions';

/**
 * « Danger ou situation dangereuse ? » (1 min 07) — la capsule « best-of » : elle compile les éléments de montage les
 * plus forts de toute la série, sur le thème « papier quadrillé », avec voix d'origine, sous-titres recalés mot à mot
 * et photos réelles.
 * Fil rouge inédit : LA MÈCHE. L'en-tête est une mèche qui relie le bidon de solvant (le danger) au fourneau ; une
 * étincelle la remonte de maillon en maillon (danger → situation dangereuse → événement déclencheur) jusqu'à
 * l'embrasement, se fige pendant le quiz, puis s'éteint dans une volute de fumée au bilan (« jamais un incendie »).
 * Transitions : un « best-of » des transitions phares de la série, une par étape —
 *  1. le panneau à palettes (Acronymes sécurité) ; 2. le store vénitien (Procédure des procédures) ;
 *  3. le battement ECG (Prise de pouls) ; 4. les feux de départ (Tableaux de bord) ; 5. le tube pneumatique
 *  (Déclaration AT).
 * Autres éléments repris : tuiles de bois (Vocabulaire), chaîne de maillons (skill William), en-tête monospace et
 * cartes à ombre dure (skill Ray), étiquettes noires (skill Ambassade), mot surligné jaune (skill Amadou), photos en
 * profondeur 3D, tampons, poussière, écran qui tremble, chrono à rebours, curseur qui choisit, bulle de commentaire tapée.
 */
const ORANGE = '#F07A12';
const YEL = '#F5C400';
const BURG = '#7A1F2B';
const NIGHT = '#151A26';
const TEAL = '#0F9D8F';
const VIO = '#6D4BD8';
const BLUE = '#1F6FD1';
const MONO = '"JetBrains Mono", "IBM Plex Mono", "DejaVu Sans Mono", monospace';
const OUTRO_AT = 67.2;
export const DANGERSIT_FRAMES = s(OUTRO_AT + 3.8);
type Kind = 'flap' | 'blinds' | 'beat' | 'lights' | 'tube';
const STEP: {at: number; k: Kind; n: string; title: string; c: string}[] = [
  {at: 20.8, k: 'flap', n: '1', title: 'LE DANGER', c: YEL},
  {at: 30.4, k: 'blinds', n: '2', title: 'LA SITUATION DANGEREUSE', c: INK},
  {at: 39.7, k: 'beat', n: '3', title: 'L’ÉVÉNEMENT DÉCLENCHEUR', c: ORANGE},
  {at: 49.95, k: 'lights', n: '?', title: 'À VOUS DE JOUER', c: VIO},
  {at: 58.95, k: 'tube', n: '✓', title: 'LE BILAN', c: GREEN},
];
const TR = 1.85;

/* ═════════════ Fil rouge : la mèche ═════════════ */
const fuseAt = (t: number) => {
  if (t < 20.8) return lerp(0, 0.08, prog(t, 3, 20.8));
  if (t < 30.4) return lerp(0.08, 0.33, prog(t, 20.8, 22.4, easeInOut));
  if (t < 39.7) return lerp(0.33, 0.62, prog(t, 30.4, 32.0, easeInOut));
  if (t < 49.95) return lerp(0.62, 1, prog(t, 39.7, 47.8, easeInOut));
  return 1;
};
const Header: React.FC = () => {
  const t = useT();
  const f = fuseAt(t);
  const out = prog(t, 61.4, 62.6, easeInOut);
  const X0 = 110, X1 = 900, Y = 64;
  const path = (x: number) => Y + Math.sin(x / 38) * 10;
  const sx = lerp(X0, X1, f);
  const lit = f >= 1 && out < 1;
  const nodes = [{u: 0.33, l: 'DANGER', c: YEL}, {u: 0.62, l: 'SITUATION', c: INK}, {u: 1, l: 'ÉVÉNEMENT', c: ORANGE}];
  const pts = Array.from({length: 80}, (_, k) => {const x = lerp(X0, X1, k / 79); return `${k ? 'L' : 'M'}${x.toFixed(1)} ${path(x).toFixed(1)}`;}).join(' ');
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 56, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div>
      {t > 2.6 && t < OUTRO_AT && (
        <div style={{position: 'absolute', left: 36, right: 36, top: 178, height: 108, borderRadius: 18, background: '#fff', border: `5px solid ${INK}`, boxShadow: `7px 7px 0 ${BURG}`, opacity: pop(t, 2.6), overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 16, top: 6, fontFamily: MONO, fontSize: 13, letterSpacing: 2, color: DIM}}><b style={{color: INK}}>UNIVERSNORMES</b> <span style={{color: ORANGE}}>//</span> TEST QHSE</div>
          <svg width={1008} height={108} style={{position: 'absolute', left: 0, top: 0}}>
            <path d={pts} fill="none" stroke="#B9B4AA" strokeWidth={6} strokeDasharray="2 6" strokeLinecap="round" />
            <path d={pts} fill="none" stroke="#2A2A2A" strokeWidth={6} strokeLinecap="round" strokeDasharray={1000} strokeDashoffset={-1000 * f + 0} opacity={0} />
            <path d={pts} fill="none" stroke={out > 0 ? '#9AA3B2' : '#3A3A3A'} strokeWidth={5} strokeLinecap="round" clipPath="url(#fz)" />
            <defs><clipPath id="fz"><rect x={sx} y={0} width={1008} height={108} /></clipPath></defs>
            {nodes.map((n, k) => {
              const x = lerp(X0, X1, n.u);
              const on = f >= n.u - 0.001;
              return <g key={k}><circle cx={x} cy={path(x)} r={on ? 13 : 10} fill={on ? n.c : '#fff'} stroke={INK} strokeWidth={3} /><text x={x} y={path(x) + 34} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={13} fill={on ? INK : '#A9B1BE'}>{n.l}</text></g>;
            })}
            {f > 0.001 && f < 1 && out === 0 && Array.from({length: 8}, (_, j) => {
              const a = random(`sp${j}`) * Math.PI * 2 + t * 9;
              const r = 8 + ((t * 40 + j * 5) % 14);
              return <circle key={j} cx={sx + Math.cos(a) * r} cy={path(sx) + Math.sin(a) * r} r={2.5} fill={j % 2 ? YEL : ORANGE} />;
            })}
            {f > 0.001 && f < 1 && out === 0 && <circle cx={sx} cy={path(sx)} r={7 + Math.sin(t * 30) * 2} fill={YEL} stroke={ORANGE} strokeWidth={3} />}
          </svg>
          <div style={{position: 'absolute', left: 18, top: 30}}><Img src={PH('danger2/bidon.png')} style={{height: 66}} /></div>
          <div style={{position: 'absolute', right: 18, top: 24, transform: `scale(${lit ? 1 + 0.08 * Math.sin(t * 14) : 0.85})`, filter: lit ? undefined : 'grayscale(1) opacity(0.5)'}}><F n="feu" size={64} /></div>
          {out > 0 && <div style={{position: 'absolute', right: 30, top: 10 - out * 20, fontSize: 40, opacity: (1 - out) * 0.8 + 0.2 * Math.sin(t * 3)}}><F n="vapeur" size={56} /></div>}
          {t > 49.95 && t < 58.9 && <div style={{position: 'absolute', left: 430, top: 4, fontFamily: MONO, fontWeight: 700, fontSize: 18, color: VIO}}>⏸ QUIZ EN COURS</div>}
        </div>
      )}
    </AbsoluteFill>
  );
};

/* ═════════════ Best-of des transitions ═════════════ */
const Hit: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = STEP[i];
  const k = t - S0.at;
  if (k < 0 || k > TR) return null;
  const inn = prog(t, S0.at, S0.at + 0.25, easeOut) * (1 - prog(t, S0.at + TR - 0.3, S0.at + TR, easeIn));
  const title = (y: number, at: number, size = 72) => <Abs x={60} y={y} w={960} style={{textAlign: 'center'}}><Kin text={S0.title} at={at} size={size} color={INK} /></Abs>;
  let body: React.ReactNode = null;
  if (S0.k === 'flap') {
    body = (
      <>
        <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 12}}>{['M', 'A', 'I', 'L', 'L', 'O', 'N'].map((c, j) => <div key={j} style={{transform: `scale(${Math.max(0, Math.min(1, spring(t, S0.at + j * 0.05, 8, 12)))})`}}><Tile ch={c} size={96} c={BURG} /></div>)}</Abs>
        <Abs x={0} y={720} w={1080} style={{textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 44, color: DIM}}>N°{S0.n}</Abs>
        <Abs x={0} y={820} w={1080}><Board text={S0.title.replace('’', '')} at={S0.at + 0.3} h={100} c={INK} stag={0.04} n={6} /></Abs>
      </>
    );
  } else if (S0.k === 'blinds') {
    const n = 10;
    body = (
      <>
        {Array.from({length: n}, (_, j) => {
          const p = prog(t, S0.at + j * 0.04, S0.at + 0.4 + j * 0.04, easeOut);
          return <div key={j} style={{position: 'absolute', left: 0, right: 0, top: j * 192, height: 193, background: j % 2 ? '#20283A' : NIGHT, transform: `perspective(900px) rotateX(${(1 - p) * 88}deg)`}} />;
        })}
        <Abs x={0} y={620} w={1080} style={{textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 44, color: '#8B95A8', opacity: prog(t, S0.at + 0.5, S0.at + 0.7)}}>MAILLON N°{S0.n}</Abs>
        <Abs x={60} y={720} w={960} style={{textAlign: 'center'}}><Kin text={S0.title} at={S0.at + 0.55} size={74} color="#fff" /></Abs>
      </>
    );
  } else if (S0.k === 'beat') {
    const draw = prog(t, S0.at, S0.at + 0.6, easeInOut);
    const beat = Math.max(0, 1 - Math.abs(k - 0.62) * 7) + 0.7 * Math.max(0, 1 - Math.abs(k - 0.85) * 7);
    const pts = Array.from({length: 120}, (_, j) => {const x = j * 9; const u = (x - 540) / 260; const y = Math.abs(u) < 0.08 ? -300 * (1 - Math.abs(u) / 0.08) : Math.abs(u - 0.12) < 0.04 ? 90 : 0; return `${j ? 'L' : 'M'}${x} ${1000 + y}`;}).join(' ');
    body = (
      <>
        <AbsoluteFill style={{background: '#FFF6F2'}} />
        {[0, 1].map((r) => {const rk = k - (r ? 0.85 : 0.62); return rk > 0 && rk < 1 ? <div key={r} style={{position: 'absolute', left: 540 - rk * 700, top: 900 - rk * 700, width: rk * 1400, height: rk * 1400, borderRadius: '50%', border: `${lerp(26, 2, rk)}px solid ${ORANGE}`, opacity: 0.5 * (1 - rk)}} /> : null;})}
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><defs><clipPath id="hb"><rect x={0} y={0} width={1080 * draw} height={1920} /></clipPath></defs><path d={pts} fill="none" stroke={ORANGE} strokeWidth={12} strokeLinejoin="round" clipPath="url(#hb)" /></svg>
        <Abs x={0} y={540} w={1080} style={{display: 'flex', justifyContent: 'center', transform: `scale(${1 + beat * 0.15})`}}><F n="etincelles" size={200} /></Abs>
        {title(1160, S0.at + 0.7, 66)}
      </>
    );
  } else if (S0.k === 'lights') {
    const go = k > 1.05;
    body = (
      <>
        <Abs x={110} y={520} w={860} h={230} style={{background: NIGHT, borderRadius: 30, border: `6px solid ${INK}`, boxShadow: `10px 10px 0 ${VIO}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 30px', boxSizing: 'border-box'}}>
          {[0, 1, 2, 3, 4].map((j) => {const on = !go && k > 0.15 + j * 0.17; const col = go ? GREEN : on ? RED : '#2A3142'; return <div key={j} style={{width: 110, height: 110, borderRadius: 55, background: `radial-gradient(circle at 35% 35%, ${on || go ? '#fff' : '#3A4458'}, ${col} 55%)`, border: '6px solid #0B0F18', boxShadow: on || go ? `0 0 30px ${col}` : 'none'}} />;})}
        </Abs>
        <Abs x={0} y={800} w={1080} style={{textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 40, letterSpacing: 6, color: go ? GREEN : DIM}}>{go ? 'C’EST PARTI !' : 'QUIZ'}</Abs>
        {title(900, S0.at + 1.05, 80)}
      </>
    );
  } else {
    const arrive = prog(t, S0.at, S0.at + 0.45, easeOut);
    const unroll = prog(t, S0.at + 0.55, S0.at + 1.0, easeOut);
    body = (
      <>
        <div style={{position: 'absolute', left: -40, top: 520, width: 1160, height: 110, borderRadius: 55, background: 'linear-gradient(180deg, rgba(255,255,255,0.9), #BFD7EA99 45%, #BFD7EAcc 75%, rgba(255,255,255,0.7))', border: '3px solid #BFD7EA'}} />
        <div style={{position: 'absolute', left: lerp(-300, 380, arrive), top: 530, width: 320, height: 90, borderRadius: 45, background: `linear-gradient(180deg, #fff, ${GREEN} 40%, ${GREEN} 70%, #0003)`}} />
        {unroll > 0 && <div style={{position: 'absolute', left: 170, top: 620, width: 740, height: 520 * unroll, overflow: 'hidden', background: 'linear-gradient(90deg, #EFE3C2, #FBF4DF 12%, #FBF4DF 88%, #EFE3C2)', boxShadow: '0 30px 60px rgba(20,33,61,0.25)'}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center'}}><div style={{display: 'inline-block', padding: '8px 24px', border: `6px solid ${GREEN}`, borderRadius: 12, color: GREEN, fontFamily: sansFont, fontWeight: 900, fontSize: 38, transform: 'rotate(-4deg)'}}>DOSSIER CLOS</div></div>
          <div style={{position: 'absolute', left: 30, right: 30, top: 220, textAlign: 'center'}}><Kin text={S0.title} at={S0.at + 0.8} size={84} /></div>
        </div>}
      </>
    );
  }
  return (
    <AbsoluteFill style={{zIndex: 35, opacity: inn}}>
      <AbsoluteFill style={{background: PAPER}} />
      <Bg />
      {body}
    </AbsoluteFill>
  );
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('permisfeu/soudeur-etincelles.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 860, objectFit: 'cover', objectPosition: '50% 40%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 40%, ${PAPER} 44%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={690} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>TEST QHSE · ANALYSE DES RISQUES</div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 10, marginTop: 22}}>{'DANGER'.split('').map((c, i) => <Tile key={i} ch={c} size={118} c={BURG} />)}</div>
        <T size={64} style={{marginTop: 14}}>ou</T>
        <T size={84} style={{textTransform: 'uppercase', letterSpacing: -2, lineHeight: 1.02}}><span style={{backgroundImage: `linear-gradient(${YEL}, ${YEL})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 42%', backgroundPosition: '0 88%'}}>situation</span><br />dangereuse ?</T>
      </Abs>
      <Abs x={110} y={1420} w={860} h={110} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 16, boxShadow: `7px 7px 0 ${BURG}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', boxSizing: 'border-box'}}>
        <Img src={PH('danger2/bidon.png')} style={{height: 80}} />
        <svg width={560} height={40}><path d="M0 20 C 60 0, 120 40, 180 20 S 300 0, 360 20 S 480 40, 560 20" fill="none" stroke="#3A3A3A" strokeWidth={5} /><circle cx={360} cy={20} r={10} fill={YEL} stroke={ORANGE} strokeWidth={4} /></svg>
        <F n="feu" size={76} />
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Scènes ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  return (
    <Out end={11.55}>
      <Abs x={0} y={330} w={1080} style={{opacity: pop(t, 2.7)}}><Board text="TEST QHSE" at={2.75} h={96} c={INK} stag={0.04} /></Abs>
      <HiLine words={['le', 'processus', 'd’apparition', 'd’un', 'dommage']} mark={[1, 4]} at={3.5} y={470} size={52} />
      <Abs x={90} y={640} w={900} style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        {[{l: 'Maillon 1', s: '?', c: YEL}, {l: 'Maillon 2', s: '?', c: INK}, {l: 'Maillon 3', s: '?', c: ORANGE}].map((x, k) => <Link key={k} n={String(k + 1)} label={x.l} sub={x.s} at={7.4 + k * 0.35} c={x.c} />)}
      </Abs>
      <Abs x={0} y={1110} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: pop(t, 9.6)}}>
        <F n="cible" size={90} /><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 52, color: GREEN}}>cibler la bonne prévention</div>
      </Abs>
    </Out>
  );
};
const Cas: React.FC = () => {
  const t = useT();
  return (
    <Out end={20.85}>
      <HiLine words={['Analysons', 'ce', 'cas']} mark={[2]} at={11.7} y={320} size={66} />
      <Deep src="permisfeu/technicien.jpg" x={70} y={440} w={560} h={460} at={13.2} pos="35% 30%">
        <div style={{position: 'absolute', left: 16, bottom: 16}}><Mono at={13.4} c={INK} size={20}>un technicien</Mono></div>
      </Deep>
      <Brut x={660} y={440} w={350} h={220} at={14.3} sh={RED} style={{textAlign: 'center', padding: 12}}>
        <Img src={PH('danger2/bidon.png')} style={{height: 130}} />
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: RED}}>solvant inflammable</div>
      </Brut>
      <Brut x={660} y={690} w={350} h={210} at={16.0} sh={ORANGE} style={{textAlign: 'center', padding: 12}}>
        <div style={{display: 'flex', justifyContent: 'center', transform: `scale(${1 + 0.05 * Math.sin(t * 9)})`}}><F n="feu" size={110} /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: ORANGE}}>fourneau allumé</div>
      </Brut>
      {t > 18.4 && (
        <Blinds src="permisfeu/meuleuse.jpg" x={70} y={940} w={940} h={330} at={18.5} pos="40% 55%">
          <div style={{position: 'absolute', right: 20, top: 20}}><Mono at={18.9} c={ORANGE} size={24}>une étincelle jaillit</Mono></div>
        </Blinds>
      )}
    </Out>
  );
};
const LabelStack: React.FC<{upto: number; t0: number[]}> = ({upto, t0}) => {
  const t = useT();
  const L = [{l: 'DANGER', bg: YEL, c: INK}, {l: 'SITUATION DANGEREUSE', bg: INK, c: '#fff'}, {l: 'ÉVÉNEMENT DÉCLENCHEUR', bg: ORANGE, c: '#fff'}];
  return (
    <Abs x={190} y={1080} w={700} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0}}>
      {L.slice(0, upto).map((x, k) => {
        const p = Math.max(0, Math.min(1, spring(t, t0[k], 8, 12)));
        return <div key={k} style={{width: lerp(380, 640, k / 2), padding: '16px 0', textAlign: 'center', background: x.bg, color: x.c, fontFamily: sansFont, fontWeight: 900, fontSize: 32, letterSpacing: 1, border: `4px solid ${INK}`, marginTop: k ? -4 : 0, transform: `translateY(${(1 - p) * -40}px) scaleY(${0.6 + 0.4 * p})`, opacity: t >= t0[k] ? 1 : 0}}>{x.l}</div>;
      })}
    </Abs>
  );
};
const Danger: React.FC = () => {
  const t = useT();
  const spot = prog(t, 22.7, 23.5, easeOut);
  return (
    <Out end={30.45}>
      <HiLine words={['Isolons', 'le', 'bidon']} mark={[2]} at={22.6} y={320} size={64} />
      <Abs x={140} y={440} w={800} h={580} style={{borderRadius: 30, overflow: 'hidden', background: NIGHT, border: `6px solid ${INK}`, boxShadow: `10px 10px 0 ${YEL}`}}>
        <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 55%, rgba(255,240,200,${0.9 * spot}) 0, rgba(255,240,200,${0.25 * spot}) 30%, transparent 55%)`}} />
        <div style={{position: 'absolute', left: 280, top: 150, transform: `scale(${0.9 + 0.1 * spot})`}}><Img src={PH('danger2/bidon.png')} style={{height: 300}} /></div>
        {t > 23.3 && t < 25.3 && <div style={{position: 'absolute', left: 600, top: 60, fontFamily: sansFont, fontWeight: 900, fontSize: 160, color: YEL, transform: `rotate(${Math.sin(t * 6) * 8}deg)`}}>?</div>}
        <div style={{position: 'absolute', left: 30, top: 30, display: 'flex', flexDirection: 'column', gap: 10}}>
          <Mono at={25.3} c={YEL} size={22} style={{color: INK}}>capacité intrinsèque</Mono>
          <Mono at={26.8} c={RED} size={22}>s’enflammer</Mono>
          <Mono at={27.8} c={RED} size={22}>nuire</Mono>
        </div>
      </Abs>
      <LabelStack upto={1} t0={[29.06]} />
      <Stamp at={29.1} c={BURG} text="propriété du bidon" x={560} y={1180} rot={-6} size={30} />
    </Out>
  );
};
const Situation: React.FC = () => {
  const t = useT();
  const ring = prog(t, 35.0, 36.3, easeInOut);
  const near = prog(t, 32.4, 34.0, easeInOut);
  return (
    <Out end={39.75}>
      <HiLine words={['À', 'proximité', 'du', 'fourneau']} mark={[1]} at={32.3} y={320} size={60} />
      <Abs x={70} y={440} w={940} h={600} style={{borderRadius: 30, background: '#fff', border: `5px solid ${INK}`, boxShadow: `9px 9px 0 ${INK}`, overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: lerp(60, 230, near), top: 230}}><Img src={PH('danger2/bidon.png')} style={{height: 200}} /></div>
        <div style={{position: 'absolute', right: 70, top: 210, transform: `scale(${1 + 0.05 * Math.sin(t * 9)})`}}><F n="feu" size={200} /></div>
        <div style={{position: 'absolute', left: 380, top: 60, width: 190, height: 190, borderRadius: 95, overflow: 'hidden', border: `6px solid ${INK}`, opacity: pop(t, 35.4)}}><Img src={PH('permisfeu/technicien.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '35% 20%'}} /></div>
        <svg width={940} height={600} style={{position: 'absolute', inset: 0}}><ellipse cx={470} cy={320} rx={400} ry={240} fill="none" stroke={ORANGE} strokeWidth={6} strokeDasharray="18 14" pathLength={100} strokeDashoffset={0} opacity={ring} transform={`rotate(${t * 6} 470 320)`} /></svg>
        <div style={{position: 'absolute', left: 30, bottom: 24}}><Mono at={36.3} c={ORANGE} size={22}>exposition directe du travailleur</Mono></div>
      </Abs>
      <LabelStack upto={2} t0={[30.5, 37.3]} />
    </Out>
  );
};
const Evenement: React.FC = () => {
  const t = useT();
  const tilt = prog(t, 41.9, 42.8, easeInOut);
  const boom = Math.max(0, 1 - Math.abs(t - 46.2) * 2.5);
  const fire = prog(t, 46.1, 46.8, easeOut);
  return (
    <Out end={50.0}>
      <HiLine words={['Une', 'projection', 'soudaine']} mark={[1]} at={41.5} y={320} size={60} />
      <Abs x={70} y={440} w={940} h={600} style={{borderRadius: 30, background: fire > 0 ? `rgba(240,122,18,${0.12 + 0.2 * boom})` : '#fff', border: `5px solid ${INK}`, boxShadow: `9px 9px 0 ${ORANGE}`, overflow: 'hidden', transform: `translate(${Math.sin(t * 80) * 14 * boom}px, ${Math.cos(t * 70) * 10 * boom}px) rotate(${tilt * -2}deg)`}}>
        <div style={{position: 'absolute', left: 230, top: 230, opacity: 1 - fire}}><Img src={PH('danger2/bidon.png')} style={{height: 200}} /></div>
        <div style={{position: 'absolute', left: 200, top: 150, opacity: fire, transform: `scale(${0.6 + 0.6 * fire + 0.05 * Math.sin(t * 20)})`}}><F n="feu" size={300} /></div>
        <div style={{position: 'absolute', right: 70, top: 210}}><F n="feu" size={200} /></div>
        {t > 41.0 && t < 46.4 && Array.from({length: 26}, (_, j) => {
          const ph = ((t - 41.0) * 1.4 + random(`e${j}`)) % 1;
          return <div key={j} style={{position: 'absolute', left: 700 - ph * (400 + random(`ex${j}`) * 200), top: 300 - Math.sin(ph * Math.PI) * (120 + random(`ey${j}`) * 100) + ph * 80, width: 10, height: 10, borderRadius: 5, background: j % 2 ? YEL : ORANGE, boxShadow: `0 0 12px ${YEL}`}} />;
        })}
        <div style={{position: 'absolute', left: 30, top: 24}}><Mono at={43.5} c={ORANGE} size={22}>le catalyseur exact</Mono></div>
        <div style={{position: 'absolute', left: 30, bottom: 24, opacity: pop(t, 46.1)}}><Mono at={46.1} c={RED} size={24}>accident inévitable</Mono></div>
      </Abs>
      <LabelStack upto={3} t0={[39.8, 39.9, 47.82]} />
    </Out>
  );
};
const Quiz: React.FC = () => {
  const t = useT();
  const left = Math.max(0, Math.ceil(lerp(10, 0, prog(t, 51.0, 58.0))));
  const ring = prog(t, 51.0, 58.0);
  const hover = t > 54.3 ? (Math.sin((t - 54.3) * 3) > 0 ? 0 : 1) : -1;
  const typed = Math.max(0, Math.floor((t - 57.0) * 18));
  const msg = 'Ma réponse : …';
  return (
    <Out end={59.0}>
      <HiLine words={['À', 'vous', 'de', 'jouer']} mark={[3]} at={51.7} y={350} size={64} x={60} w={700} />
      <Abs x={830} y={320} w={180} h={180}>
        <div style={{position: 'relative', width: 170, height: 170}}>
          <svg width={170} height={170}><circle cx={85} cy={85} r={70} fill="#fff" stroke="#DDE3EC" strokeWidth={14} /><circle cx={85} cy={85} r={70} fill="none" stroke={left <= 3 ? RED : VIO} strokeWidth={14} strokeDasharray={440} strokeDashoffset={440 * ring} transform="rotate(-90 85 85)" strokeLinecap="round" /></svg>
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 64, color: left <= 3 ? RED : INK}}>{left}</div>
        </div>
      </Abs>
      <Deep src="epiepc/allee.jpg" x={70} y={530} w={940} h={420} at={51.8} pos="50% 60%">
        <svg width={940} height={420} style={{position: 'absolute', inset: 0, opacity: pop(t, 52.4)}}><path d="M380 260 C 420 210, 540 200, 600 240 C 660 270, 640 330, 560 340 C 480 360, 360 330, 380 260 Z" fill="rgba(20,20,20,0.82)" /><path d="M430 260 C 470 240, 520 240, 540 250" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={6} strokeLinecap="round" /></svg>
        <div style={{position: 'absolute', left: 16, top: 16}}><Mono at={52.4} c={INK} size={22}>flaque d’huile · passerelle</Mono></div>
        <div style={{position: 'absolute', right: 16, bottom: 16}}><Mono at={52.6} c={DIM} size={16}>flaque ajoutée pour illustrer</Mono></div>
      </Deep>
      <Abs x={70} y={990} w={940} style={{display: 'flex', gap: 24}}>
        {[{l: 'DANGER', bg: YEL, c: INK}, {l: 'SITUATION DANGEREUSE', bg: INK, c: '#fff'}].map((b, k) => (
          <div key={k} style={{flex: 1, padding: '22px 10px', textAlign: 'center', background: b.bg, color: b.c, fontFamily: sansFont, fontWeight: 900, fontSize: 30, border: `5px solid ${INK}`, borderRadius: 16, boxShadow: hover === k ? `0 0 0 6px ${VIO}` : `6px 6px 0 ${BURG}`, transform: `scale(${Math.max(0, Math.min(1, spring(t, 54.3 + k * 0.5, 8, 12))) * (hover === k ? 1.04 : 1)})`, position: 'relative'}}>
            {b.l}
            {hover === k && <svg width={50} height={60} style={{position: 'absolute', right: 30, bottom: -36}}><path d="M5 5 L5 45 L16 34 L24 54 L32 50 L24 31 L40 31 Z" fill="#fff" stroke={INK} strokeWidth={3} /></svg>}
          </div>
        ))}
      </Abs>
      {t > 56.7 && (
        <Abs x={140} y={1160} w={800} h={130} style={{background: '#fff', border: `4px solid ${INK}`, borderRadius: 24, display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px', boxSizing: 'border-box', opacity: pop(t, 56.8)}}>
          <F n="bulle" size={70} />
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: INK}}>{msg.slice(0, typed)}<span style={{opacity: Math.sin(t * 10) > 0 ? 1 : 0}}>|</span></div>
          <div style={{marginLeft: 'auto'}}><Mono at={57.6} c={VIO} size={20}>en commentaire</Mono></div>
        </Abs>
      )}
    </Out>
  );
};
const Bilan: React.FC = () => {
  const t = useT();
  const cross = prog(t, 61.6, 62.2, easeOut);
  const fireX = prog(t, 65.8, 66.4, easeOut);
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={['Retour', 'au', 'technicien']} mark={[2]} at={60.8} y={320} size={60} />
      <Deep src="permisfeu/technicien.jpg" x={150} y={430} w={780} h={420} at={60.8} pos="35% 30%" />
      <Abs x={70} y={890} w={940} h={230} style={{display: 'flex', justifyContent: 'center', gap: 40}}>
        <div style={{position: 'relative', width: 220, height: 220, background: '#fff', border: `5px solid ${INK}`, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 61.4)}}>
          <F n="etincelles" size={140} />
          <svg width={220} height={220} style={{position: 'absolute', inset: 0}}><line x1={20} y1={20} x2={200} y2={200} stroke={RED} strokeWidth={14} strokeLinecap="round" strokeDasharray={260} strokeDashoffset={260 * (1 - cross)} /></svg>
          <div style={{position: 'absolute', bottom: -40, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: RED}}>SANS ÉTINCELLE</div>
        </div>
        <div style={{width: 380, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16}}>
          <div style={{opacity: pop(t, 64.3)}}><Pill at={64.3} c={GREEN} size={30}>un risque à maîtriser</Pill></div>
          <div style={{position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 10, opacity: pop(t, 65.7)}}><F n="feu" size={70} /><div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM}}>un incendie<Strike p={fireX} c={RED} /></div></div>
        </div>
      </Abs>
      <Stamp at={65.9} c={GREEN} text="jamais un incendie" x={250} y={1180} rot={-5} size={52} />
      {t > 66.0 && <Dust n={20} c={YEL} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...flaps(2.75, 12), {at: 3.5, s: 'sfx/pop', v: 0.2}, ...[7.4, 7.75, 8.1].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 9.6, s: 'sfx/ding', v: 0.22},
  {at: 11.7, s: 'sfx/whoosh', v: 0.25}, {at: 13.2, s: 'soft-whoosh', v: 0.3}, {at: 14.3, s: 'sfx/thud', v: 0.3}, {at: 16.0, s: 'sfx/thud', v: 0.3}, {at: 18.5, s: 'sfx/swish', v: 0.35},
  /* 1 palettes */ ...rep(20.8, 7, 0.05, 'sfx/thud', 0.18), ...flaps(21.1, 12),
  {at: 22.7, s: 'deep-hit', v: 0.3}, {at: 23.4, s: 'sfx/pop', v: 0.2}, ...[25.3, 26.8, 27.8].map((a) => ({at: a, s: 'sfx/pop', v: 0.18})), {at: 29.06, s: 'sfx/thud', v: 0.35}, {at: 29.1, s: 'tampon', v: 0.4},
  /* 2 store */ ...rep(30.4, 10, 0.04, 'page', 0.12), {at: 30.95, s: 'sfx/whoosh', v: 0.3},
  {at: 32.4, s: 'sfx/swish', v: 0.25}, {at: 35.0, s: 'stylo', v: 0.3}, {at: 35.4, s: 'sfx/pop', v: 0.2}, {at: 37.3, s: 'sfx/thud', v: 0.35},
  /* 3 battement */ {at: 39.7, s: 'soft-whoosh', v: 0.35}, {at: 40.32, s: 'deep-hit', v: 0.5}, {at: 40.55, s: 'bass-hit', v: 0.4},
  {at: 41.0, s: 'sfx/swish', v: 0.3}, ...rep(41.2, 10, 0.5, 'tick', 0.12), {at: 41.9, s: 'tension', v: 0.25, dur: 3}, {at: 46.1, s: 'deep-hit', v: 0.55}, {at: 46.2, s: 'bass-hit', v: 0.45}, {at: 47.82, s: 'sfx/thud', v: 0.35},
  /* 4 feux */ ...[50.1, 50.27, 50.44, 50.61, 50.78].map((a) => ({at: a, s: 'cadenas', v: 0.25})), {at: 51.0, s: 'validation', v: 0.35},
  ...rep(51.0, 7, 1, 'tick', 0.28), {at: 52.4, s: 'sfx/pop', v: 0.2}, {at: 54.3, s: 'sfx/pop', v: 0.22}, {at: 54.8, s: 'sfx/pop', v: 0.22}, ...rep(57.0, 12, 0.055, 'sfx/click', 0.15),
  /* 5 tube */ {at: 58.95, s: 'sfx/whoosh', v: 0.45}, {at: 59.45, s: 'sfx/thud', v: 0.35}, {at: 59.5, s: 'page', v: 0.45},
  {at: 60.8, s: 'soft-whoosh', v: 0.3}, {at: 61.6, s: 'sfx/swish', v: 0.35}, {at: 64.3, s: 'validation', v: 0.3}, {at: 65.8, s: 'sfx/swish', v: 0.3}, {at: 65.9, s: 'tampon', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const DangerSit: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={11.6}><Intro /></Gate>
    <Gate from={11.55} to={20.9}><Cas /></Gate>
    <Gate from={22.55} to={30.5}><Danger /></Gate>
    <Gate from={32.2} to={39.8}><Situation /></Gate>
    <Gate from={41.45} to={50.05}><Evenement /></Gate>
    <Gate from={51.7} to={59.05}><Quiz /></Gate>
    <Gate from={60.7} to={OUTRO_AT}><Bilan /></Gate>
    {STEP.map((x, i) => <Gate key={i} from={x.at} to={x.at + TR + 0.05}><Hit i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={67.0}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-danger-situation-origine.m4a')} trimAfter={s(67.1)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Word, Center, TEAL, BLUE, easeInOut];

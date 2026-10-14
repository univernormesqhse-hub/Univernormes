import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s, sansFont} from '../theme';
import {Abs, Bg, BLUE, DIM, easeIn, easeOut, GREEN, INK, LOGO, PAPER, PH, pop, prog, RED, Row, spring, T, useT} from '../implIso/kit';
import {captions} from './captions';

/**
 * « Les acronymes incontournables en sécurité industrielle » (1 min 24) — voix d'origine, sous-titres recalés mot à mot,
 * photos réelles, thème « papier quadrillé » de la série.
 * Fil rouge inédit : un tableau d'affichage à palettes (type hall de gare / aéroport). Chaque acronyme s'affiche en
 * palettes qui battent avant de se figer, le compteur de l'en-tête bat de 00/16 à 16/16, et le final est un tableau
 * des « départs » listant les 16 acronymes.
 * Transition inédite : la photo réelle apparaît à travers des lamelles de store vénitien qui pivotent en 3D.
 * Définition imprimée sur une « carte d'embarquement » qui sort d'une fente, initiales en couleur.
 */
const ORANGE = '#F28C1E';
const VIO = '#7B5CD6';
const TEAL = '#14A3A3';
const OUTRO_AT = 80.4;
export const ACROSECU_FRAMES = s(OUTRO_AT + 3.8);
const FAM: Record<string, {l: string; c: string}> = {
  A: {l: 'Autorisations', c: BLUE}, X: {l: 'Conformité & exposition', c: VIO}, M: {l: 'Sécurité machines', c: RED},
  P: {l: 'Pilotage & amélioration', c: GREEN}, S: {l: 'Santé au travail', c: ORANGE}, R: {l: 'Protection respiratoire', c: TEAL},
  I: {l: 'Incendie & secours', c: RED},
};
type A = {k: string; d: string; at: number; ph: string; f: string; pos?: string; fit?: boolean};
const AC: A[] = [
  {k: 'AIPR', d: '[A]utorisation d’[I]ntervention à [P]roximité des [R]éseaux', at: 13.5, ph: 'induction/ingenieur-chantier.jpg', f: 'A', pos: '50% 30%'},
  {k: 'ATPM', d: '[A]utorisation de [T]ravail à [P]roximité des [M]achines', at: 18.85, ph: 'promo/hse-machine.jpg', f: 'A'},
  {k: 'CE', d: '[C]onformité [E]uropéenne', at: 23.4, ph: 'epiepc/kit-epi.jpg', f: 'X', fit: true},
  {k: 'VLE', d: '[V]aleur [L]imite d’[E]xposition', at: 26.4, ph: 'soudage/soudeur-fumees.jpg', f: 'X'},
  {k: 'VLEP', d: '[V]aleur [L]imite d’[E]xposition [P]rofessionnelle', at: 29.9, ph: 'soudage/aspirateur-fumees.jpg', f: 'X', fit: true},
  {k: 'LOTO', d: '[Lo]ckout [T]ag[o]ut', at: 34.75, ph: 'promo/formation-consignation.jpg', f: 'M'},
  {k: 'KPI', d: '[K]ey [P]erformance [I]ndicator', at: 38.15, ph: 'iso26/analyste-kpi.jpg', f: 'P'},
  {k: 'CAPA', d: '[C]orrective [A]nd [P]reventive [A]ctions', at: 41.95, ph: 'iso26/audit-checklist.jpg', f: 'P'},
  {k: 'PDCA', d: '[P]lan, [D]o, [C]heck, [A]ct', at: 46.1, ph: 'iso26/courbe-strategie.jpg', f: 'P'},
  {k: 'TMS', d: '[T]roubles [M]usculo[s]quelettiques', at: 50.75, ph: 'zones/entrepot.jpg', f: 'S'},
  {k: 'ARI', d: '[A]ppareil [R]espiratoire [I]solant', at: 54.3, ph: 'confines/tripode-toit.jpg', f: 'R'},
  {k: 'SSIAP', d: '[S]ervice de [S]écurité [I]ncendie et d’[A]ssistance à [P]ersonnes', at: 58.15, ph: 'promo/formation-incendie.jpg', f: 'I'},
  {k: 'BAES', d: '[B]loc [A]utonome d’[É]clairage de [S]écurité', at: 62.9, ph: 'epiepc/allee.jpg', f: 'I'},
  {k: 'FFP2', d: '[F]iltering [F]ace[P]iece [2]', at: 67.15, ph: 'permisfeu/poumons-particules.jpg', f: 'R', fit: true},
  {k: 'FFP3', d: '[F]iltering [F]ace[P]iece [3]', at: 70.9, ph: 'soudage/voies-respiratoires.jpg', f: 'R', fit: true},
  {k: 'SAMU', d: '[S]ervice d’[A]ide [M]édicale [U]rgente', at: 74.65, ph: 'incident/blessure-soins.jpg', f: 'I'},
];
const endOf = (i: number) => (i < AC.length - 1 ? AC[i + 1].at : 77.5);

/* ─────────── Palette (split-flap) ─────────── */
const POOL = 'ABCDEFGHIJKLMNOPRSTUVXYZ0123456789';
const FL = 0.06;
const Half: React.FC<{ch: string; top: boolean; w: number; h: number; c: string}> = ({ch, top, w, h, c}) => (
  <div style={{width: w, height: h / 2, overflow: 'hidden', position: 'relative', background: top ? '#FFFFFF' : '#F4F6FA'}}>
    <div style={{position: 'absolute', left: 0, top: top ? 0 : -h / 2, width: w, height: h, lineHeight: `${h}px`, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: h * 0.68, color: c}}>{ch}</div>
  </div>
);
const Flap: React.FC<{ch: string; at: number; h: number; w?: number; n?: number; c?: string; seed?: string}> = ({ch, at, h, w = h * 0.74, n = 8, c = INK, seed = ''}) => {
  const t = useT();
  const seq = [...Array.from({length: n}, (_, k) => POOL[Math.floor(random(`${seed}${ch}${k}`) * POOL.length)]), ch];
  const raw = (t - at) / FL;
  const idx = Math.max(0, Math.min(n, Math.floor(raw)));
  const f = raw < 0 ? 1 : idx >= n ? 1 : raw - idx;
  const cur = raw < 0 ? ' ' : seq[idx];
  const prev = raw < 0 ? ' ' : idx === 0 ? ' ' : seq[idx - 1];
  const done = raw >= n;
  const show = done ? cur : f < 1 ? cur : cur;
  const r = h * 0.08;
  return (
    <div style={{position: 'relative', width: w, height: h, borderRadius: r, overflow: 'hidden', perspective: h * 4, boxShadow: `0 ${h * 0.05}px ${h * 0.12}px rgba(20,33,61,0.25), inset 0 0 0 1px rgba(20,33,61,0.08)`}}>
      <Half ch={show} top w={w} h={h} c={c} />
      <Half ch={done ? cur : prev} top={false} w={w} h={h} c={c} />
      {!done && raw >= 0 && (f < 0.5
        ? <div style={{position: 'absolute', left: 0, top: 0, transformOrigin: '50% 100%', transform: `rotateX(${-f * 180}deg)`, filter: `brightness(${1 - f * 0.4})`}}><Half ch={prev} top w={w} h={h} c={c} /></div>
        : <div style={{position: 'absolute', left: 0, top: h / 2, transformOrigin: '50% 0%', transform: `rotateX(${(1 - f) * 180}deg)`, filter: `brightness(${0.8 + f * 0.2})`}}><Half ch={cur} top={false} w={w} h={h} c={c} /></div>)}
      <div style={{position: 'absolute', left: 0, right: 0, top: h / 2 - 1, height: 2, background: 'rgba(20,33,61,0.18)'}} />
      <div style={{position: 'absolute', left: -2, top: h / 2 - h * 0.05, width: 4, height: h * 0.1, background: '#C8D0DC', borderRadius: 2}} />
      <div style={{position: 'absolute', right: -2, top: h / 2 - h * 0.05, width: 4, height: h * 0.1, background: '#C8D0DC', borderRadius: 2}} />
    </div>
  );
};
const Board: React.FC<{text: string; at: number; h: number; gap?: number; c?: string; stag?: number; n?: number}> = ({text, at, h, gap = 4, c = INK, stag = 0.05, n = 7}) => (
  <div style={{display: 'flex', gap, justifyContent: 'center'}}>
    {text.split('').map((ch, i) => <Flap key={i} ch={ch} at={at + i * stag} h={h} c={c} n={n + (i % 3)} seed={text} />)}
  </div>
);

/* ─────────── Photo en store vénitien ─────────── */
const Blinds: React.FC<{src: string; at: number; pos?: string; fit?: boolean}> = ({src, at, pos = 'center', fit = false}) => {
  const t = useT();
  const W = 960, H = 640, N = 10, sh = H / N;
  const k = t - at;
  return (
    <Abs x={60} y={330} w={W} h={H} style={{borderRadius: 30, overflow: 'hidden', boxShadow: `0 30px 70px rgba(20,33,61,${0.3 * prog(t, at, at + 0.8)})`, background: fit ? '#fff' : 'transparent'}}>
      {Array.from({length: N}, (_, i) => {
        const p = prog(t, at - 0.15 + i * 0.045, at + 0.35 + i * 0.045, easeOut);
        return (
          <div key={i} style={{position: 'absolute', left: 0, top: i * sh, width: W, height: sh + 1, overflow: 'hidden', perspective: 900, opacity: p > 0 ? 1 : 0}}>
            <div style={{width: W, height: sh + 1, overflow: 'hidden', transform: `rotateX(${(1 - p) * 88}deg)`, transformOrigin: '50% 50%', filter: `brightness(${0.7 + p * 0.3})`}}>
              <Img src={PH(src)} style={{position: 'absolute', left: 0, top: -i * sh, width: W, height: H, objectFit: fit ? 'contain' : 'cover', objectPosition: pos, transformOrigin: `${W / 2}px ${H / 2}px`, transform: `scale(${1.1 + k * 0.012}) translateX(${Math.sin(k * 0.45) * 14}px)`}} />
            </div>
          </div>
        );
      })}
      {!fit && <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(20,33,61,0.5))'}} />}
      <div style={{position: 'absolute', inset: 0, borderRadius: 30, boxShadow: 'inset 0 0 0 8px #fff'}} />
    </Abs>
  );
};

/* ─────────── Carte d'embarquement ─────────── */
const Def: React.FC<{d: string; at: number; c: string}> = ({d, at, c}) => {
  const t = useT();
  const words = d.split(' ');
  return (
    <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: d.length > 48 ? 40 : 48, color: INK, lineHeight: 1.25}}>
      {words.map((w, i) => {
        const p = prog(t, at + i * 0.1, at + i * 0.1 + 0.35, easeOut);
        const parts = w.split(/(\[[^\]]+\])/).filter(Boolean);
        return (
          <span key={i} style={{display: 'inline-block', marginRight: 12, opacity: p, filter: `blur(${(1 - p) * 6}px)`}}>
            {parts.map((x, j) => x.startsWith('[') ? <span key={j} style={{color: c, textDecoration: 'underline', textDecorationThickness: 5, textUnderlineOffset: 6}}>{x.slice(1, -1)}</span> : <span key={j}>{x}</span>)}
          </span>
        );
      })}
    </div>
  );
};
const Pass: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const a = AC[i];
  const f = FAM[a.f];
  const p = prog(t, a.at + 0.5, a.at + 1.0, easeOut);
  return (
    <Abs x={50} y={1095} w={980} h={330} style={{overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 10, borderRadius: 5, background: INK, zIndex: 2}} />
      <div style={{position: 'absolute', left: 20, right: 20, top: 4, transform: `translateY(${(p - 1) * 320}px)`, display: 'flex', background: '#fff', borderRadius: '0 0 24px 24px', boxShadow: '0 14px 30px rgba(20,33,61,0.18)', minHeight: 270}}>
        <div style={{width: 190, background: f.c, borderRadius: '0 0 0 24px', color: '#fff', fontFamily: sansFont, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '20px 0'}}>
          <div style={{fontSize: 22, fontWeight: 700, letterSpacing: 3, opacity: 0.85}}>PORTE</div>
          <div style={{fontSize: 74, fontWeight: 900, lineHeight: 1}}>{String(i + 1).padStart(2, '0')}</div>
          <div style={{fontSize: 22, fontWeight: 700, opacity: 0.85}}>sur 16</div>
        </div>
        <div style={{width: 0, borderLeft: '4px dashed #D5DBE5', margin: '18px 0'}} />
        <div style={{flex: 1, padding: '24px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14}}>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 24, letterSpacing: 2, color: f.c, textTransform: 'uppercase'}}>{f.l}</div>
          <Def d={a.d} at={a.at + 0.8} c={f.c} />
        </div>
      </div>
    </Abs>
  );
};
const Card: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const a = AC[i];
  const out = prog(t, endOf(i) - 0.3, endOf(i), easeIn);
  const len = a.k.length;
  const h = len > 4 ? 170 : 200;
  return (
    <AbsoluteFill style={{opacity: 1 - out, transform: `translateY(${-out * 40}px)`}}>
      <Blinds src={a.ph} at={a.at} pos={a.pos} fit={a.fit} />
      <Abs x={0} y={970 - h * 0.62} w={1080} style={{transform: `scale(${0.9 + 0.1 * Math.min(1, spring(t, a.at, 8, 14))})`}}><Board text={a.k} at={a.at + 0.05} h={h} gap={10} c={FAM[a.f].c} stag={0.07} n={8} /></Abs>
      <Pass i={i} />
    </AbsoluteFill>
  );
};

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('epiepc/technicienne.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 920, objectFit: 'cover', objectPosition: '50% 25%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 30%, ${PAPER}DD 42%, ${PAPER} 48%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={50} y={760} w={980} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>16 ACRONYMES À CONNAÎTRE</div>
        <T size={96} style={{marginTop: 18, textTransform: 'uppercase', letterSpacing: -3}}>Les acronymes</T>
        <T size={88} style={{textTransform: 'uppercase', letterSpacing: -3}}><span style={{background: '#F5B700', padding: '0 20px', borderRadius: 18}}>incontournables</span></T>
        <T size={60} color={DIM} style={{marginTop: 10, textTransform: 'uppercase', letterSpacing: -1}}>en sécurité <span style={{color: RED}}>industrielle</span></T>
      </Abs>
      <Abs x={0} y={1300} w={1080}><Board text="LOTO" at={-9} h={150} gap={10} c={RED} /></Abs>
      <Abs x={0} y={1480} w={1080}><Board text="SSIAP" at={-9} h={110} gap={8} c={BLUE} /></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── En-tête : compteur à palettes ─────────── */
const countAt = (t: number) => AC.filter((a) => t >= a.at).length;
const Header: React.FC = () => {
  const t = useT();
  const n = countAt(t);
  const last = n > 0 ? AC[n - 1].at : 2.6;
  const txt = String(n).padStart(2, '0');
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 80, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {t > 2.6 && t < OUTRO_AT && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 216, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: pop(t, 2.6)}}>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 24, letterSpacing: 3, color: DIM}}>ACRONYMES</div>
          <div style={{display: 'flex', gap: 4}}>{txt.split('').map((c, i) => <Flap key={`${n}-${i}`} ch={c} at={last + i * 0.05} h={64} n={i === 0 ? 2 : 5} seed={`h${n}`} />)}</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>/16</div>
          <div style={{width: 220, height: 10, borderRadius: 5, background: '#E3E8F0', overflow: 'hidden'}}><div style={{width: `${(n / 16) * 100}%`, height: '100%', background: n ? FAM[AC[n - 1].f].c : INK}} /></div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── INTRO ─────────── */
const Intro: React.FC = () => {
  const t = useT();
  const rows = [{x: 'MAÎTRISER LES RISQUES', at: 3.2, c: RED}, {x: 'RESPECTER LES EXIGENCES', at: 4.7, c: BLUE}, {x: 'INTERVENIR EFFICACEMENT', at: 6.4, c: GREEN}];
  return (
    <AbsoluteFill>
      <Row y={380}><T size={56} style={{opacity: pop(t, 2.6)}}>En HSE, certains acronymes</T></Row>
      <Row y={448}><T size={56} style={{opacity: pop(t, 2.9)}}>sont <span style={{background: '#F5B700', padding: '0 12px', borderRadius: 10}}>incontournables</span></T></Row>
      <Abs x={30} y={600} w={1020} h={520} style={{background: '#E9EEF5', borderRadius: 30, boxShadow: 'inset 0 4px 14px rgba(20,33,61,0.12)', opacity: pop(t, 2.8)}} />
      <Abs x={60} y={625} style={{fontFamily: sansFont, fontWeight: 800, fontSize: 24, letterSpacing: 4, color: DIM, opacity: pop(t, 2.8)}}>POUR…</Abs>
      {rows.map((r, i) => (
        <Abs key={i} x={0} y={690 + i * 140} w={1080}>
          <Board text={r.x} at={r.at} h={48} gap={3} c={r.c} stag={0.03} n={6} />
          <div style={{position: 'absolute', left: 52, top: 70, width: 976, height: 6, borderRadius: 3, background: r.c, transformOrigin: 'left', transform: `scaleX(${prog(t, r.at + 1.0, r.at + 1.5, easeOut)})`}} />
        </Abs>
      ))}
    </AbsoluteFill>
  );
};
const Sixteen: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Row y={400}><T size={50} color={DIM} style={{opacity: pop(t, 8.95)}}>Voici</T></Row>
      <Abs x={0} y={500} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 22}}>
        <Flap ch="1" at={9.0} h={380} n={10} c={RED} seed="s1" />
        <Flap ch="6" at={9.1} h={380} n={16} c={RED} seed="s6" />
      </Abs>
      <Row y={925}><T size={52} style={{opacity: pop(t, 10.3)}}>acronymes <span style={{color: RED}}>supplémentaires</span></T></Row>
      <Row y={1005}><T size={40} color={DIM} style={{opacity: pop(t, 11.2)}}>que tout pro HSE devrait connaître</T></Row>
      <Abs x={60} y={1130} w={960} style={{display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center'}}>
        {Object.values(FAM).map((f, i) => <div key={i} style={{opacity: pop(t, 11.6 + i * 0.1), padding: '8px 18px', borderRadius: 30, background: f.c, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 25}}>{f.l}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Final : tableau des départs ─────────── */
const Departures: React.FC = () => {
  const t = useT();
  const T0 = 77.5;
  return (
    <AbsoluteFill>
      <Row y={330}><T size={54} style={{opacity: pop(t, T0)}}>Le tableau des 16</T></Row>
      <Abs x={30} y={420} w={1020} h={900} style={{background: '#E9EEF5', borderRadius: 30, boxShadow: 'inset 0 4px 14px rgba(20,33,61,0.12)', opacity: pop(t, T0)}} />
      {AC.map((a, i) => {
        const col = i < 8 ? 0 : 1;
        const row = i % 8;
        const at = T0 + 0.1 + row * 0.12 + col * 0.06;
        return (
          <Abs key={i} x={60 + col * 500} y={450 + row * 106} w={470} style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <div style={{width: 46, fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: DIM, opacity: pop(t, at)}}>{String(i + 1).padStart(2, '0')}</div>
            <div style={{display: 'flex', gap: 3}}>{a.k.split('').map((ch, j) => <Flap key={j} ch={ch} at={at + j * 0.03} h={70} n={5} c={FAM[a.f].c} seed={`d${i}`} />)}</div>
            <div style={{marginLeft: 'auto', width: 30, height: 30, borderRadius: 15, background: FAM[a.f].c, transform: `scale(${spring(t, at + 0.5, 8, 14)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 20}}>✓</div>
          </Abs>
        );
      })}
    </AbsoluteFill>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.5}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...[3.2, 4.7, 6.4].flatMap((a) => [...rep(a, 10, 0.06, 'tick', 0.18), {at: a + 1.0, s: 'sfx/swish', v: 0.2}]),
  ...rep(9.0, 16, 0.06, 'tick', 0.25), {at: 10.1, s: 'bass-hit', v: 0.45}, ...rep(11.6, 7, 0.1, 'sfx/pop', 0.14),
  ...AC.flatMap((a) => [
    {at: a.at - 0.2, s: 'soft-whoosh', v: 0.35, dur: 1},
    ...rep(a.at - 0.1, 10, 0.045, 'sfx/click', 0.12),
    ...rep(a.at + 0.05, 9 + a.k.length, 0.06, 'tick', 0.22),
    {at: a.at + 0.05 + (8 + a.k.length * 0.07 + 1) * FL, s: 'sfx/thud', v: 0.3},
    {at: a.at + 0.55, s: 'page', v: 0.3},
    ...(a.k === 'LOTO' ? [{at: a.at + 1.4, s: 'cadenas', v: 0.4}] : []),
  ]),
  ...rep(77.6, 24, 0.05, 'tick', 0.18), {at: 79.0, s: 'validation', v: 0.4},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const AcroSecu: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.3} to={8.95}><Intro /></Gate>
    <Gate from={8.8} to={13.5}><Sixteen /></Gate>
    {AC.map((a, i) => <Gate key={a.k} from={a.at - 0.25} to={endOf(i) + 0.02}><Card i={i} /></Gate>)}
    <Gate from={77.4} to={OUTRO_AT}><Departures /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={77.7}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-acronymes-securite-origine.m4a')} trimAfter={s(78.2)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

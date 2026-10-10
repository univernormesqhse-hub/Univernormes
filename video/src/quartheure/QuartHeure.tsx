import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Gate, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Check} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {handFont, s, sansFont} from '../theme';
import {captions} from './captions';

/**
 * « Le Quart d'Heure Sécurité » (4 min 38) — voix d'origine, sous-titres recalés mot à mot, illustrations par photos
 * réelles. Fil rouge inédit : un chronomètre de 15 minutes dont chaque partie est une tranche ; transitions en
 * balayage d'horloge. Autres techniques nouvelles : une année en 365 points, ciel jour / nuit scindé, minuterie 2 → 15
 * min, colonne vertébrale qui se redresse, courbe de glycémie, carte « menu » des formats 10 / 15 / 20 min, jauge de
 * surcharge cognitive, cercle de respiration, effet « glitch » des bugs humains, jeu « trouvez le risque » sur photo
 * réelle, courriel frauduleux à l'hameçon, fissure qui grandit du petit écart au vrai accident, graine qui devient
 * arbre de la culture active.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 277.6;
export const QUARTHEURE_FRAMES = s(OUTRO_AT + 3.8);
const BG = '#0F2A2E';
const INK = '#13232A';
const LIGHT = '#F3FAF8';
const DIM = 'rgba(243,250,248,0.65)';
const MINT = '#2EE6A8';
const PINK = '#FF5FA8';
const AMB = '#FFB648';
const RED = '#FF5A4E';
const IND = (n: string) => staticFile(`induction/${n}`);

type Pt = {n: number; l: string; at: number; end: number; c: string};
const PT: Pt[] = [
  {n: 1, l: 'Intro et enjeux', at: 43.6, end: 76.7, c: '#4FA3FF'},
  {n: 2, l: "Le quart d'heure expliqué", at: 76.9, end: 106.7, c: MINT},
  {n: 3, l: 'Santé physique', at: 106.9, end: 159.0, c: AMB},
  {n: 4, l: 'Santé mentale', at: 159.2, end: 206.0, c: PINK},
  {n: 5, l: 'Vigilance et culture', at: 206.2, end: 252.4, c: '#B48CFF'},
  {n: 6, l: 'Conclusion', at: 252.6, end: 277.0, c: '#7CE07C'},
];
const WIPE = 2.6;

const pop = (t: number, at: number, d = 0.4) => prog(t, at, at + d, easeOut);
const spring = (t: number, at: number, k = 7, w = 15) => {
  const x = t - at;
  return x <= 0 ? 0 : 1 - Math.exp(-x * k) * Math.cos(x * w);
};
const win = (t: number, a: number, b: number, f = 0.4) => prog(t, a, a + f) * (1 - prog(t, b - f, b));
const T: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 40, color = LIGHT, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, letterSpacing: -0.5, lineHeight: 1.05, ...style}}>{children}</div>
);
const Hand: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 48, color = LIGHT, style}) => (
  <div style={{fontFamily: handFont, fontSize: size, color, lineHeight: 1.1, ...style}}>{children}</div>
);
const Abs: React.FC<{x: number; y: number; w?: number; h?: number; children?: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, ...style}}>{children}</div>
);
const Chip: React.FC<{children: React.ReactNode; c?: string; q?: number; size?: number; dark?: boolean; style?: React.CSSProperties}> = ({children, c = MINT, q = 1, size = 34, dark = true, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 26px', borderRadius: 50, background: c, color: dark ? INK : '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size, transform: `scale(${q})`, boxShadow: `0 12px 30px ${c}55`, whiteSpace: 'nowrap', ...style}}>{children}</div>
);
const Row: React.FC<{y: number; children: React.ReactNode; gap?: number}> = ({y, children, gap = 14}) => (
  <Abs x={0} y={y} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap, flexWrap: 'wrap', padding: '0 40px', boxSizing: 'border-box'}}>{children}</Abs>
);
const Title: React.FC<{children: React.ReactNode; y?: number}> = ({children, y = 470}) => <Abs x={60} y={y} w={960} style={{textAlign: 'center'}}><T size={58}>{children}</T></Abs>;
const Photo: React.FC<{src: string; x: number; y: number; w: number; h: number; q?: number; r?: number; pos?: string; children?: React.ReactNode; filter?: string}> = ({src, x, y, w, h, q = 1, r = 0, pos = 'center', children, filter}) => {
  const t = useT();
  return (
    <Abs x={x} y={y} w={w} h={h} style={{borderRadius: 34, overflow: 'hidden', border: '6px solid rgba(255,255,255,0.9)', boxShadow: '0 30px 60px rgba(0,0,0,0.45)', transform: `scale(${q}) rotate(${r}deg)`}}>
      <Img src={src} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${1.06 + (t % 30) * 0.004})`, filter}} />
      {children}
    </Abs>
  );
};

/** Chronomètre : arc rempli de 0 à 1, segments des parties. */
const Stopwatch: React.FC<{size: number; fill: number; label?: string; seg?: boolean}> = ({size, fill, label, seg}) => (
  <svg width={size} height={size * 1.15} viewBox="0 0 200 230">
    <rect x={88} y={0} width={24} height={22} rx={6} fill="#D8E6E2" />
    <rect x={150} y={22} width={18} height={14} rx={4} fill="#D8E6E2" transform="rotate(40 159 29)" />
    <circle cx={100} cy={130} r={92} fill="#0B1F22" stroke="#D8E6E2" strokeWidth={10} />
    {seg ? PT.map((p, k) => <path key={k} d={arc(100, 130, 74, (k / 6) * 360 + 2, ((k + 1) / 6) * 360 - 2)} stroke={p.c} strokeWidth={22} fill="none" opacity={fill * 6 > k ? 1 : 0.18} />) : <path d={arc(100, 130, 74, 0, Math.max(0.5, fill * 360))} stroke={MINT} strokeWidth={22} fill="none" strokeLinecap="round" />}
    {Array.from({length: 12}, (_, k) => <line key={k} x1={100 + 56 * Math.sin((k * Math.PI) / 6)} y1={130 - 56 * Math.cos((k * Math.PI) / 6)} x2={100 + 62 * Math.sin((k * Math.PI) / 6)} y2={130 - 62 * Math.cos((k * Math.PI) / 6)} stroke="#ffffff88" strokeWidth={3} />)}
    <line x1={100} y1={130} x2={100 + 58 * Math.sin(fill * Math.PI * 2)} y2={130 - 58 * Math.cos(fill * Math.PI * 2)} stroke={RED} strokeWidth={5} strokeLinecap="round" />
    <circle cx={100} cy={130} r={7} fill={RED} />
    {label && <text x={100} y={176} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={22} fill="#fff">{label}</text>}
  </svg>
);
function arc(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p = (a: number) => [cx + r * Math.sin((a * Math.PI) / 180), cy - r * Math.cos((a * Math.PI) / 180)];
  const [x0, y0] = p(a0), [x1, y1] = p(a1);
  return `M${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`;
}

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: BG, opacity: 1 - out}}>
      <Img src={IND('briefing-atelier.jpg')} style={{position: 'absolute', left: -400, top: 0, width: 1880, height: 1920, objectFit: 'cover', filter: 'saturate(0.9)'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${BG}CC 0%, ${BG}55 35%, ${BG}EE 62%, ${BG} 100%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={330} y={420} style={{filter: `drop-shadow(0 0 40px ${MINT}66)`}}><Stopwatch size={420} fill={0.25 + t * 0.01} label="15:00" /></Abs>
      <Abs x={60} y={1080} w={960} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: MINT, color: INK, fontFamily: sansFont, fontWeight: 800, fontSize: 32, letterSpacing: 3}}>RITUEL DE PRÉVENTION</div>
        <T size={130} style={{marginTop: 20, textTransform: 'uppercase', letterSpacing: -3}}>Le quart d'heure</T>
        <T size={130} color={MINT} style={{textTransform: 'uppercase', letterSpacing: -3}}>sécurité</T>
        <Hand size={54} color={DIM} style={{marginTop: 16}}>15 minutes qui changent la culture</Hand>
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : balayage d'horloge ─────────── */
const ClockWipe: React.FC<{p: Pt}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const inQ = prog(t, a, a + 0.6, easeInOut);
  const out = prog(t, b - 0.6, b, easeInOut);
  const ang = inQ * 360;
  return (
    <AbsoluteFill style={{zIndex: 55, clipPath: out > 0 ? undefined : undefined, WebkitMaskImage: `conic-gradient(from 0deg at 50% 45%, #000 ${ang}deg, transparent ${ang}deg)`, opacity: 1 - out}}>
      <AbsoluteFill style={{background: `radial-gradient(circle at 50% 45%, ${p.c}, ${BG} 80%)`}} />
      <Abs x={330} y={420} style={{transform: `scale(${spring(t, a + 0.3)})`}}><Stopwatch size={420} fill={(p.n - 1 + prog(t, a + 0.3, a + 1.2)) / 6} seg /></Abs>
      <Abs x={60} y={960} w={960} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 24px', borderRadius: 40, background: 'rgba(0,0,0,0.3)', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff', letterSpacing: 2}}>PARTIE {p.n}/6</div>
        <T size={96} style={{marginTop: 20, textShadow: '0 10px 30px rgba(0,0,0,0.4)'}}>{p.l}</T>
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Introduction : Safety Day vs habitude ─────────── */
const Intro: React.FC = () => {
  const t = useT();
  const o = 1 - prog(t, 43.3, 43.7);
  if (o <= 0) return null;
  const all = prog(t, 22.6, 26.5, (x) => x);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 27.8 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 27.4, 27.8)}}>
          <Title>{t < 21.6 ? <>Un <span style={{color: AMB}}>Safety Day</span> par an… suffisant ?</> : <>La sécurité : une <span style={{color: MINT}}>habitude</span> quotidienne</>}</Title>
          {/* l'année en 365 points */}
          <div style={{position: 'absolute', left: 90, top: 640, width: 900, display: 'flex', flexWrap: 'wrap', gap: 6}}>
            {Array.from({length: 365}, (_, k) => {
              const sd = k === 160;
              const on = sd ? t > 6.2 : k / 365 < all;
              return <div key={k} style={{width: 30, height: 30, borderRadius: 8, background: on ? (sd ? AMB : MINT) : 'rgba(255,255,255,0.08)', transform: `scale(${sd && t > 6.2 ? 1.5 + 0.1 * Math.sin(t * 5) : 1})`, boxShadow: sd && t > 6.2 ? `0 0 24px ${AMB}` : 'none', zIndex: sd ? 2 : 1, opacity: pop(t, 3.4 + (k % 30) * 0.02)}} />;
            })}
          </div>
          {t > 6.2 && t < 21.6 && <Row y={1500}><Chip c={AMB} q={spring(t, 6.3)}>1 journée sur 365</Chip>{t > 11.6 && <Chip c={RED} dark={false} q={spring(t, 11.7)}>Formations isolées</Chip>}</Row>}
          {t > 22.5 && <Row y={1500}><Chip c={MINT} q={spring(t, 22.6)}>Engagement quotidien</Chip></Row>}
        </AbsoluteFill>
      )}
      {t > 27.6 && (
        <AbsoluteFill style={{opacity: pop(t, 27.6)}}>
          <Title>Le plan</Title>
          <Abs x={330} y={580}><Stopwatch size={420} fill={prog(t, 31.0, 42.6, (x) => x)} seg /></Abs>
          <div style={{position: 'absolute', left: 90, top: 1110, width: 900, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14}}>
            {PT.map((p, k) => { const at = [32.1, 34.4, 37.2, 38.8, 39.8, 42.5][k]; return <div key={p.n} style={{display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 18, background: 'rgba(255,255,255,0.06)', border: `3px solid ${p.c}`, transform: `scale(${spring(t, at)})`}}><div style={{width: 46, height: 46, borderRadius: 23, background: p.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>{p.n}</div><T size={28}>{p.l}</T></div>; })}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 1 : jour / nuit ─────────── */
const P1: React.FC = () => {
  const t = useT();
  const o = win(t, 46.2, 76.7, 0.4);
  if (o <= 0) return null;
  const split = 540 + Math.sin(t * 0.8) * 30;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Title>Le <span style={{color: AMB}}>contraste</span> est saisissant</Title>
      {/* nuit : ancienne formation */}
      <Abs x={0} y={580} w={split} h={900} style={{overflow: 'hidden', background: 'linear-gradient(180deg, #0A1230, #1B2550)'}}>
        {Array.from({length: 30}, (_, k) => <div key={k} style={{position: 'absolute', left: random(`sx${k}`) * 520, top: random(`sy${k}`) * 300, width: 4, height: 4, borderRadius: 2, background: '#fff', opacity: 0.4 + 0.6 * Math.abs(Math.sin(t * 2 + k))}} />)}
        <div style={{position: 'absolute', left: 60, top: 60, width: 110, height: 110, borderRadius: 55, boxShadow: '-24px 10px 0 0 #F2F0D8'}} />
        <Abs x={40} y={240} w={460} style={{opacity: pop(t, 54.3)}}>
          <T size={38} color="#C9D3FF">L'ANCIENNE FORMATION</T>
          {[['Descendante', 56.6], ['Lourde, théorique', 57.6], ['1 fois par an', 59.3], ['Vite oubliée', 60.8]].map(([l, at]) => <div key={l as string} style={{marginTop: 14, padding: '10px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.08)', fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: '#E2E7FF', opacity: pop(t, at as number), transform: `translateX(${(1 - pop(t, at as number)) * -200}px)`}}>{l}</div>)}
        </Abs>
        <div style={{position: 'absolute', left: 140, bottom: 40, transform: `rotate(-4deg) scale(${spring(t, 55.0)})`}}><F n="livres" size={200} /></div>
      </Abs>
      {/* jour : quart d'heure */}
      <Abs x={split} y={580} w={1080 - split} h={900} style={{overflow: 'hidden', background: 'linear-gradient(180deg, #7FD3FF, #E4F7FF)'}}>
        <div style={{position: 'absolute', right: 60, top: 50, width: 120, height: 120, borderRadius: 60, background: '#FFD54A', boxShadow: '0 0 60px #FFD54A'}} />
        <Abs x={30} y={240} w={470} style={{opacity: pop(t, 62.1)}}>
          <T size={38} color="#0B4A6E">LE QUART D'HEURE</T>
          {[['Agile', 66.1], ['Pratique', 67.0], ['Un rituel', 68.7], ['Fluide, interactif, régulier', 72.4]].map(([l, at]) => <div key={l as string} style={{marginTop: 14, padding: '10px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.75)', fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: '#0B4A6E', opacity: pop(t, at as number), transform: `translateX(${(1 - pop(t, at as number)) * 200}px)`}}>{l}</div>)}
        </Abs>
        {t > 64.0 && <div style={{position: 'absolute', right: 30, bottom: 30, width: 400, height: 240, borderRadius: 20, overflow: 'hidden', border: '5px solid #fff', transform: `scale(${spring(t, 64.0)})`}}><Img src={IND('briefing-atelier.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>}
      </Abs>
      <Abs x={split - 4} y={580} w={8} h={900} style={{background: '#fff', boxShadow: '0 0 30px #fff'}} />
      {t > 75.0 && <Row y={1520}><Chip c={AMB} q={spring(t, 75.1)}>Le jour et la nuit</Chip></Row>}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 2 : le safety moment ─────────── */
const P2: React.FC = () => {
  const t = useT();
  const o = win(t, 79.5, 106.7, 0.4);
  if (o <= 0) return null;
  const mins = Math.round(2 + 13 * prog(t, 89.7, 92.5, easeInOut));
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 98.5 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 98.1, 98.5)}}>
          <Title>Le <span style={{color: MINT}}>Safety Moment</span></Title>
          <Abs x={330} y={570} style={{transform: `scale(${spring(t, 87.2)})`}}><Stopwatch size={420} fill={mins / 60} label={`${mins} MIN`} /></Abs>
          {t > 89.7 && <Row y={1080}><Chip c={MINT} q={spring(t, 89.8)}>Entre 2 et 15 minutes, pas plus</Chip></Row>}
          {t > 94.0 && (
            <Photo src={IND('briefing-atelier.jpg')} x={140} y={1180} w={800} h={340} q={spring(t, 94.1)}>
              <div style={{position: 'absolute', left: 20, bottom: 16, padding: '6px 16px', borderRadius: 12, background: AMB, fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, opacity: pop(t, 97.4)}}>☀ Briefing du matin</div>
            </Photo>
          )}
        </AbsoluteFill>
      )}
      {t > 98.3 && (
        <AbsoluteFill style={{opacity: pop(t, 98.3)}}>
          <Title>Le résultat</Title>
          <Photo src={IND('accueil-groupe.jpg')} x={90} y={600} w={900} h={700} q={spring(t, 98.5)}>
            {/* repères AR sur la photo réelle */}
            {[['Vigilance constante', 'yeux', 99.6, 200, 160], ['Parole libérée', 'bulle', 101.2, 520, 260], ["Signaux d'alerte", 'gyrophare', 103.1, 300, 470]].map(([l, ic, at, x, y]) => (
              <div key={l as string} style={{position: 'absolute', left: x as number, top: y as number, transform: `scale(${spring(t, at as number)})`}}>
                <div style={{position: 'absolute', left: -30, top: -30, width: 60, height: 60, borderRadius: 30, border: `5px solid ${MINT}`, transform: `scale(${1 + ((t * 1.5) % 1)})`, opacity: 1 - ((t * 1.5) % 1)}} />
                <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderRadius: 30, background: 'rgba(15,42,46,0.9)', border: `3px solid ${MINT}`}}><F n={ic as string} size={44} /><T size={26}>{l}</T></div>
              </div>
            ))}
          </Photo>
          {t > 104.6 && <Row y={1360}><Hand size={44} style={{opacity: pop(t, 104.6)}}>sans jamais plomber l'emploi du temps</Hand></Row>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 3 : santé physique ─────────── */
const P3: React.FC = () => {
  const t = useT();
  const o = win(t, 109.5, 159.0, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* colonne vertébrale + écran */}
      {t < 125.2 && (() => {
        const fix = prog(t, 121.2, 123.4, easeInOut);
        const bend = 1 - fix;
        const scr = fix * 110;
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 124.8, 125.2)}}>
            <Title>Maîtriser son corps et son poste</Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <rect x={150} y={1360} width={780} height={20} rx={8} fill="#5E7A7E" />
              <rect x={640} y={1180 - scr} width={240} height={150} rx={14} fill="#1C3438" stroke="#D8E6E2" strokeWidth={6} />
              <rect x={745} y={1330 - scr} width={30} height={30 + scr} fill="#D8E6E2" />
              {/* personnage : tête + colonne */}
              <circle cx={380 + bend * 80} cy={900 + bend * 60} r={60} fill="#C99467" />
              <path d={`M${380 + bend * 70} ${960 + bend * 60} Q${380 + bend * 140} ${1080} ${380} ${1240}`} stroke={bend > 0.5 ? RED : MINT} strokeWidth={26} fill="none" strokeLinecap="round" />
              {Array.from({length: 8}, (_, k) => { const u = k / 7; const x = (1 - u) * (1 - u) * (380 + bend * 70) + 2 * (1 - u) * u * (380 + bend * 140) + u * u * 380; const y = (1 - u) * (1 - u) * (960 + bend * 60) + 2 * (1 - u) * u * 1080 + u * u * 1240; return <circle key={k} cx={x} cy={y} r={14} fill="#fff" />; })}
              <rect x={300} y={1240} width={170} height={20} rx={8} fill="#5E7A7E" />
              <rect x={370} y={1260} width={24} height={100} fill="#5E7A7E" />
              <line x1={430 + bend * 60} y1={1050} x2={660} y2={1250 - scr} stroke="#C99467" strokeWidth={20} strokeLinecap="round" />
            </svg>
            {t > 119.8 && <Row y={600}><Chip c={AMB} q={spring(t, 119.9)}>Micro-atelier : hauteur de l'écran</Chip></Row>}
            {t > 123.4 && <Abs x={140} y={760}><Chip c={MINT} q={spring(t, 123.4)}><Check p={prog(t, 123.5, 123.9)} size={36} color={INK} />Dos préservé</Chip></Abs>}
          </AbsoluteFill>
        );
      })()}
      {/* glycémie + travail de nuit */}
      {t > 125.0 && t < 143.5 && (() => {
        const pts: string[] = [];
        const d = prog(t, 126.6, 130.6, (x) => x);
        for (let x = 0; x <= 840 * d; x += 10) { const u = x / 840; const y = 300 - Math.exp(-Math.pow((u - 0.25) * 8, 2)) * 220 + Math.exp(-Math.pow((u - 0.55) * 7, 2)) * 120; pts.push(`${120 + x},${700 + y}`); }
        return (
          <AbsoluteFill style={{opacity: win(t, 125.0, 143.5, 0.4)}}>
            <Title>Ce qu'on mange compte</Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <line x1={120} y1={1000} x2={960} y2={1000} stroke="#ffffff44" strokeWidth={3} />
              <polyline points={pts.join(' ')} fill="none" stroke={AMB} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />
              <text x={130} y={640} fontFamily={sansFont} fontWeight={900} fontSize={30} fill={DIM}>GLYCÉMIE</text>
            </svg>
            {t > 129.0 && <Abs x={500} y={1040} style={{transform: `scale(${spring(t, 129.1)})`}}><Chip c={RED} dark={false}><F n="fatigue" size={44} />Coup de fatigue</Chip></Abs>}
            {t > 131.6 && (
              <Abs x={90} y={1180} w={900} h={260} style={{borderRadius: 30, background: 'linear-gradient(90deg, #0A1230, #1B2550)', overflow: 'hidden', transform: `scale(${spring(t, 131.7)})`, display: 'flex', alignItems: 'center', gap: 24, padding: '0 30px', boxSizing: 'border-box'}}>
                <div style={{width: 120, height: 120, borderRadius: 60, boxShadow: '-24px 10px 0 0 #F2F0D8', flexShrink: 0}} />
                <div><T size={40}>Travailleurs de nuit</T><Hand size={36} color={DIM}>perturbations métaboliques</Hand></div>
              </Abs>
            )}
            {t > 139.2 && <Row y={1480} gap={12}><Chip c={MINT} q={spring(t, 139.2)}>Moins de douleur</Chip><Chip c={MINT} q={spring(t, 140.2)}>Moins de fatigue</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* carte « menu » des formats */}
      {t > 143.3 && (
        <AbsoluteFill style={{opacity: pop(t, 143.3)}}>
          <Title>Du sur-mesure</Title>
          <Abs x={140} y={590} w={800} h={880} style={{background: '#F7F1E3', borderRadius: 24, boxShadow: '0 30px 60px rgba(0,0,0,0.45)', padding: '40px 50px', boxSizing: 'border-box', transform: `rotate(-1.5deg) translateY(${(1 - spring(t, 143.5, 6, 12)) * 1200}px)`}}>
            <div style={{textAlign: 'center'}}><Hand size={54} color={INK}>La carte</Hand><T size={40} color={INK}>DES QUARTS D'HEURE</T></div>
            <div style={{height: 3, background: INK, opacity: 0.2, margin: '20px 0'}} />
            {[['10 min', 'Point rapide · posture', 143.8, 'courbe-dos'], ['15 min', 'Nutrition · énergie', 147.0, 'banane'], ['20 min +', 'Postes de nuit · sommeil', 153.6, 'canape']].map(([m, l, at, ic]) => (
              <div key={m as string} style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 30, opacity: pop(t, at as number), transform: `translateX(${(1 - pop(t, at as number)) * 100}px)`}}>
                <F n={ic as string} size={100} />
                <div style={{flex: 1}}><T size={38} color={INK}>{l}</T><div style={{borderBottom: `4px dotted ${INK}55`, marginTop: 8}} /></div>
                <T size={44} color="#0E8A66">{m}</T>
              </div>
            ))}
          </Abs>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 4 : santé mentale ─────────── */
const P4: React.FC = () => {
  const t = useT();
  const o = win(t, 161.8, 206.0, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* surcharge + tabou + quiz */}
      {t < 176.1 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 175.7, 176.1)}}>
          <Title>La <span style={{color: PINK}}>surcharge cognitive</span></Title>
          <Abs x={340} y={580} style={{transform: `scale(${spring(t, 162.0)})`}}><F n="cerveau" size={400} /></Abs>
          <Abs x={140} y={1020} w={800} h={70} style={{borderRadius: 35, background: 'rgba(255,255,255,0.1)', overflow: 'hidden'}}>
            <div style={{height: '100%', width: `${Math.min(100, 20 + 85 * prog(t, 163.0, 166.5))}%`, background: `linear-gradient(90deg, ${MINT}, ${AMB}, ${RED})`}} />
          </Abs>
          {t > 167.7 && t < 170.1 && <Row y={1140}><div style={{transform: `rotate(-6deg) scale(${spring(t, 167.8)})`, border: `7px solid ${RED}`, borderRadius: 14, padding: '4px 22px'}}><T size={56} color={RED} style={{textDecoration: t > 169.0 ? 'line-through' : 'none'}}>TABOU</T></div></Row>}
          {t > 170.1 && (
            <Abs x={240} y={1130} w={600} h={300} style={{perspective: 1200}}>
              <div style={{width: '100%', height: '100%', transformStyle: 'preserve-3d', transform: `rotateY(${prog(t, 173.5, 174.3) * 180}deg) scale(${spring(t, 170.2)})`}}>
                <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: 26, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, boxSizing: 'border-box'}}><T size={28} color={PINK}>QUIZ</T><T size={36} color={INK} style={{textAlign: 'center', marginTop: 8}}>« Le stress, c'est dans la tête. » Vrai ou faux ?</T></div>
                <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: 26, background: PINK, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={48} color="#fff">Idée reçue cassée</T></div>
              </div>
            </Abs>
          )}
        </AbsoluteFill>
      )}
      {/* respiration + glitch des bugs humains */}
      {t > 175.9 && t < 189.9 && (() => {
        const br = (Math.sin((t - 176) * 1.3) + 1) / 2;
        const glitch = t > 186.2 && t < 189.6;
        const gx = glitch ? (random(`g${Math.floor(t * 12)}`) - 0.5) * 30 : 0;
        return (
          <AbsoluteFill style={{opacity: win(t, 175.9, 189.9, 0.4)}}>
            <Title>Gérer le stress</Title>
            <Abs x={540 - 160 - br * 140} y={960 - 160 - br * 140} w={320 + br * 280} h={320 + br * 280} style={{borderRadius: '50%', background: `radial-gradient(circle, ${PINK}AA, ${PINK}22)`, boxShadow: `0 0 80px ${PINK}88`, opacity: t < 186 ? 1 : 0.3}} />
            {t < 186 && <Abs x={0} y={920} w={1080} style={{textAlign: 'center'}}><T size={64}>{Math.sin((t - 176) * 1.3) > 0 ? 'Inspirez…' : 'Expirez…'}</T></Abs>}
            {glitch && (
              <AbsoluteFill>
                {[RED, MINT, '#6FA8FF'].map((c, k) => <Abs key={c} x={gx * (k - 1)} y={860 + (k - 1) * 4} w={1080} style={{textAlign: 'center', mixBlendMode: 'screen'}}><T size={90} color={c}>ERREUR HUMAINE</T></Abs>)}
                {Array.from({length: 6}, (_, k) => <Abs key={k} x={0} y={600 + random(`gl${k}${Math.floor(t * 10)}`) * 800} w={1080} h={10 + random(`gh${k}`) * 30} style={{background: 'rgba(255,255,255,0.12)', transform: `translateX(${gx * 3}px)`}} />)}
              </AbsoluteFill>
            )}
            {t > 186.3 && <Row y={1300} gap={12}><Chip c={RED} dark={false} q={spring(t, 186.3)}>Bugs humains</Chip><Chip c={AMB} q={spring(t, 187.5)}>Erreurs d'inattention</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* 3 questions en 3 minutes */}
      {t > 189.7 && (
        <AbsoluteFill style={{opacity: pop(t, 189.7)}}>
          <Abs x={0} y={460} w={1080} style={{textAlign: 'center'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 300, color: PINK, lineHeight: 1, transform: `scale(${spring(t, 192.1)})`, textShadow: `0 0 60px ${PINK}88`}}>3</div></Abs>
          <Row y={820} gap={18}>
            {['Comment ça va, vraiment ?', "Qu'est-ce qui te pèse ?", 'De quoi as-tu besoin ?'].map((q, k) => <div key={q} style={{width: 290, height: 200, borderRadius: 24, background: '#fff', padding: 18, boxSizing: 'border-box', transform: `rotate(${(k - 1) * 4}deg) translateY(${(1 - spring(t, 193.3 + k * 0.4)) * 400}px)`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}><T size={24} color={PINK}>QUESTION {k + 1}</T><Hand size={38} color={INK}>{q}</Hand></div>)}
          </Row>
          <Abs x={420} y={1080} style={{transform: `scale(${spring(t, 194.6)})`}}><Stopwatch size={240} fill={prog(t, 194.6, 198.0) * 0.05} label="3 MIN" /></Abs>
          {t > 202.1 && <Row y={1400} gap={12}><Chip c={PINK} dark={false} q={spring(t, 202.2)}>Mental</Chip><T size={50}>=</T><Chip c={AMB} q={spring(t, 204.3)}>Physique</Chip></Row>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 5 : vigilance ─────────── */
const P5: React.FC = () => {
  const t = useT();
  const o = win(t, 208.8, 252.4, 0.4);
  if (o <= 0) return null;
  const V5 = '#B48CFF';
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* jeu : trouvez le risque */}
      {t < 220.7 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 220.3, 220.7)}}>
          <Title>Défi photo : <span style={{color: V5}}>trouvez les risques</span></Title>
          <Photo src={IND('marquage.jpg')} x={140} y={580} w={800} h={890} q={spring(t, 213.2)}>
            {[[120, 700, 216.6], [560, 520, 217.6], [470, 200, 218.6]].map(([x, y, at], k) => t > (at as number) && (
              <div key={k} style={{position: 'absolute', left: (x as number) - 70, top: (y as number) - 70, width: 140, height: 140, borderRadius: 70, border: `8px solid ${RED}`, transform: `scale(${spring(t, at as number, 8, 18)})`, boxShadow: `0 0 20px ${RED}`}}><div style={{position: 'absolute', right: -16, top: -16, width: 44, height: 44, borderRadius: 22, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff'}}>{k + 1}</div></div>
            ))}
          </Photo>
          {t > 216.6 && <Abs x={0} y={1500} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Chip c={RED} dark={false} size={34} q={spring(t, 216.7)}>{Math.min(3, Math.floor((t - 216.6) + 1))}/3 trouvés</Chip></Abs>}
        </AbsoluteFill>
      )}
      {/* courriel frauduleux à l'hameçon */}
      {t > 220.5 && t < 226.6 && (() => {
        const hook = prog(t, 224.7, 225.8, easeInOut);
        return (
          <AbsoluteFill style={{opacity: win(t, 220.5, 226.6, 0.3)}}>
            <Title>Cybersécurité</Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><line x1={540} y1={300} x2={540} y2={620 - hook * 200} stroke="#D8E6E2" strokeWidth={4} /><path d={`M540 ${620 - hook * 200} q0 60 -40 60 q-30 0 -30 -30`} stroke="#D8E6E2" strokeWidth={10} fill="none" strokeLinecap="round" /></svg>
            <Abs x={190} y={720 - hook * 200} w={700} h={460} style={{borderRadius: 26, background: '#fff', padding: 30, boxSizing: 'border-box', boxShadow: '0 30px 60px rgba(0,0,0,0.4)', transform: `rotate(${hook * -8}deg) scale(${spring(t, 220.8)})`}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}><F n="enveloppe" size={70} /><div><T size={30} color={INK}>« Urgent : votre compte »</T><div style={{fontFamily: 'monospace', fontSize: 24, color: RED}}>securite@faux-support.biz</div></div></div>
              <div style={{marginTop: 24, height: 14, borderRadius: 7, background: '#E3E8EA', width: '90%'}} /><div style={{marginTop: 14, height: 14, borderRadius: 7, background: '#E3E8EA', width: '70%'}} />
              <div style={{marginTop: 30, display: 'inline-block', padding: '14px 30px', borderRadius: 14, background: '#2D6CDF', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>Cliquez ici</div>
              {t > 224.7 && <div style={{position: 'absolute', right: 20, top: 20, transform: `rotate(-12deg) scale(${spring(t, 224.8)})`, border: `6px solid ${RED}`, borderRadius: 12, padding: '4px 16px'}}><T size={36} color={RED}>FRAUDE</T></div>}
            </Abs>
          </AbsoluteFill>
        );
      })()}
      {/* presque-accident (photo réelle) */}
      {t > 226.4 && t < 234.9 && (
        <AbsoluteFill style={{opacity: win(t, 226.4, 234.9, 0.4)}}>
          <Title>Le <span style={{color: AMB}}>presque-accident</span> du mois</Title>
          <Photo src={staticFile('quartheure/peau-banane.jpg')} x={290} y={590} w={500} h={760} q={spring(t, 228.0)} pos="50% 70%" />
          {t > 230.6 && <Row y={1410}><Chip c={V5} q={spring(t, 230.7)}>Chacun acteur de la sécurité</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* citation : la fissure qui grandit */}
      {t > 234.7 && (() => {
        const grow = prog(t, 237.8, 240.0, easeIn);
        return (
          <AbsoluteFill style={{opacity: pop(t, 234.7)}}>
            <Abs x={90} y={560} w={900} h={620} style={{borderRadius: 30, background: '#F7F1E3', boxShadow: '0 30px 60px rgba(0,0,0,0.45)', padding: 50, boxSizing: 'border-box', overflow: 'hidden'}}>
              <T size={130} color="#C9B99A" style={{position: 'absolute', left: 30, top: 10}}>“</T>
              <T size={60} color={INK} style={{marginTop: 70}}>Un <span style={{background: '#FFE27A', padding: '0 8px'}}>petit écart</span> aujourd'hui…</T>
              <T size={60} color={INK} style={{marginTop: 20, opacity: pop(t, 239.4)}}>… est un <span style={{background: RED, color: '#fff', padding: '0 8px'}}>vrai accident</span> demain.</T>
              <svg width={900} height={620} style={{position: 'absolute', inset: 0}}>
                <path d="M60 600 L140 520 L120 470 L220 400 L200 340 L320 280 L300 210 L430 160 L420 100 L560 60 L860 20" fill="none" stroke={INK} strokeWidth={3 + grow * 9} pathLength={1} strokeDasharray={`${0.08 + 0.92 * grow} 1`} strokeLinejoin="round" />
              </svg>
            </Abs>
            {t > 240.9 && (
              <Row y={1260} gap={12}>
                <div style={{opacity: 0.6, transform: `scale(${spring(t, 244.2)})`}}><Chip c="#3A5458" dark={false} style={{textDecoration: 'line-through'}}>Chercher un coupable</Chip></div>
                <Chip c={MINT} q={spring(t, 247.1)}>Une leçon collective</Chip>
              </Row>
            )}
            {t > 250.5 && <Row y={1380}><Hand size={48} style={{opacity: pop(t, 250.6)}}>collective et constructive</Hand></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 6 : conclusion, la graine devient arbre ─────────── */
const P6: React.FC = () => {
  const t = useT();
  if (t < 255.1) return null;
  const o = pop(t, 255.2, 0.5);
  const tree = prog(t, 267.8, 271.6, easeOut);
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Title>Une <span style={{color: '#7CE07C'}}>culture active</span></Title>
      {/* cases à cocher barrées */}
      {t < 268.0 && (
        <Abs x={190} y={600} w={700} style={{opacity: 1 - prog(t, 267.6, 268.0)}}>
          {['Conformité', 'Formation annuelle', 'Registre signé'].map((l, k) => (
            <div key={l} style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 20, padding: '16px 22px', borderRadius: 18, background: 'rgba(255,255,255,0.07)', opacity: pop(t, 261 + k * 0.6)}}>
              <div style={{width: 50, height: 50, borderRadius: 8, border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{t > 265.0 + k * 0.3 && <Check p={prog(t, 265 + k * 0.3, 265.4 + k * 0.3)} size={40} color="#fff" />}</div>
              <T size={36} style={{textDecoration: t > 266.4 ? 'line-through' : 'none', opacity: t > 266.4 ? 0.5 : 1}}>{l}</T>
            </div>
          ))}
        </Abs>
      )}
      {/* arbre */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <ellipse cx={540} cy={1440} rx={300} ry={40} fill="#3E2E20" opacity={pop(t, 267.6)} />
        {t > 267.6 && <circle cx={540} cy={1430} r={14} fill="#C9A26B" />}
        <path d={`M540 1440 L540 ${1440 - 420 * tree}`} stroke="#7A5634" strokeWidth={34} strokeLinecap="round" />
        {tree > 0.4 && [[-1, 1200], [1, 1150], [-1, 1080], [1, 1040]].map(([sd, y], k) => <path key={k} d={`M540 ${y} Q${540 + sd * 100} ${y - 40} ${540 + sd * 200 * prog(tree, 0.4 + k * 0.1, 0.8 + k * 0.05)} ${y - 110}`} stroke="#7A5634" strokeWidth={16} fill="none" strokeLinecap="round" />)}
        {tree > 0.6 && <circle cx={540} cy={1000} r={320 * prog(tree, 0.6, 1)} fill="#2F9E5B" opacity={0.95} />}
        {tree > 0.6 && <circle cx={380} cy={1060} r={180 * prog(tree, 0.6, 1)} fill="#3DBA6E" />}
        {tree > 0.6 && <circle cx={700} cy={1060} r={180 * prog(tree, 0.6, 1)} fill="#3DBA6E" />}
      </svg>
      {t > 267.8 && <Abs x={460} y={830} style={{transform: `scale(${spring(t, 267.9)})`}}><Chip c="#fff" size={36}>ADN</Chip></Abs>}
      {[['Crée de la valeur', 271.6, 230, 920], ['Protège les équipes', 272.8, 600, 900], ['Fluidifie l’organisation', 274.5, 330, 1160]].map(([l, at, x, y]) => t > (at as number) && <Abs key={l as string} x={x as number} y={y as number} style={{transform: `scale(${spring(t, at as number)})`}}><Chip c={AMB} size={28}>{l}</Chip></Abs>)}
    </AbsoluteFill>
  );
};

/* ─────────── En-tête ─────────── */
const Header: React.FC = () => {
  const t = useT();
  const p = PT.find((x) => t >= x.at + WIPE - 0.3 && t < x.end);
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 95, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {t > 2.5 && t < 43.6 && <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', opacity: pop(t, 2.5) * (1 - prog(t, 43.2, 43.6))}}><div style={{padding: '10px 26px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${MINT}`}}><T size={36}>Le quart d'heure <span style={{color: MINT}}>sécurité</span></T></div></div>}
      {p && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 232, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: pop(t, p.at + WIPE - 0.3) * (1 - prog(t, p.end - 0.3, p.end))}}>
          <Stopwatch size={84} fill={(p.n - 0.5) / 6} seg />
          <div style={{padding: '8px 22px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${p.c}`}}><T size={34}>{p.n}. {p.l}</T></div>
        </div>
      )}
    </AbsoluteFill>
  );
};

const Bg: React.FC = () => {
  const t = useT();
  const p = PT.find((x) => t >= x.at && t < x.end);
  const c = p ? p.c : MINT;
  return (
    <AbsoluteFill style={{background: BG}}>
      <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 2px, transparent 2px)', backgroundSize: '44px 44px', backgroundPosition: `0 ${-t * 6}px`}} />
      <AbsoluteFill style={{background: `radial-gradient(circle at 80% 20%, ${c}33, transparent 45%), radial-gradient(circle at 15% 85%, ${c}22, transparent 45%)`}} />
    </AbsoluteFill>
  );
};

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'tick', v: 0.4}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  {at: 3.4, s: 'riser', v: 0.15, dur: 2}, {at: 6.3, s: 'sfx/ding', v: 0.4}, {at: 11.7, s: 'sfx/pop', v: 0.3}, {at: 22.6, s: 'sfx/rise', v: 0.3}, {at: 26.5, s: 'validation', v: 0.32},
  ...[32.1, 34.4, 37.2, 38.8, 39.8, 42.5].map((at) => ({at, s: 'tick', v: 0.35})),
  ...PT.flatMap((p) => [{at: p.at, s: 'sfx/click', v: 0.5}, {at: p.at + 0.05, s: 'soft-whoosh', v: 0.45, dur: 1.6}, {at: p.at + 0.6, s: 'bass-hit', v: 0.35}, ...Array.from({length: 4}, (_, k) => ({at: p.at + 0.3 + k * 0.22, s: 'tick', v: 0.22}))]),
  ...[56.6, 57.6, 59.3, 60.8].map((at) => ({at, s: 'sfx/thud', v: 0.25})), ...[66.1, 67.0, 68.7, 72.4].map((at) => ({at, s: 'sfx/pop', v: 0.28})), {at: 75.1, s: 'sfx/ding', v: 0.3},
  {at: 87.2, s: 'sfx/pop', v: 0.3}, ...Array.from({length: 13}, (_, k) => ({at: 89.7 + k * 0.21, s: 'tick', v: 0.22})), {at: 94.1, s: 'sfx/whoosh', v: 0.3}, ...[99.6, 101.2, 103.1].map((at) => ({at, s: 'sfx/pop', v: 0.3})),
  {at: 119.9, s: 'sfx/pop', v: 0.3}, {at: 121.2, s: 'sfx/rise', v: 0.25}, {at: 123.4, s: 'validation', v: 0.32}, {at: 129.1, s: 'deep-hit', v: 0.3}, {at: 131.7, s: 'sfx/whoosh', v: 0.3}, {at: 139.2, s: 'sfx/pop', v: 0.28}, {at: 140.2, s: 'sfx/pop', v: 0.28},
  {at: 143.5, s: 'page', v: 0.5}, ...[143.8, 147.0, 153.6].map((at) => ({at, s: 'sfx/ding', v: 0.28})),
  {at: 163.0, s: 'tension', v: 0.2, dur: 3.5}, {at: 167.8, s: 'tampon', v: 0.45}, {at: 170.2, s: 'sfx/pop', v: 0.3}, {at: 173.5, s: 'sfx/swish', v: 0.35},
  {at: 176.2, s: 'soft-whoosh', v: 0.3, dur: 4}, {at: 186.3, s: 'deep-hit', v: 0.4}, ...Array.from({length: 6}, (_, k) => ({at: 186.4 + k * 0.5, s: 'sfx/click', v: 0.25})),
  {at: 192.1, s: 'bass-hit', v: 0.4}, ...[193.3, 193.7, 194.1].map((at) => ({at, s: 'page', v: 0.35})), {at: 202.2, s: 'sfx/pop', v: 0.3}, {at: 204.3, s: 'sfx/pop', v: 0.3},
  {at: 213.2, s: 'sfx/whoosh', v: 0.3}, ...[216.6, 217.6, 218.6].map((at) => ({at, s: 'sfx/ding', v: 0.35})), {at: 220.8, s: 'notification', v: 0.4}, {at: 224.7, s: 'tampon', v: 0.5},
  {at: 228.0, s: 'sfx/swish', v: 0.35}, {at: 230.7, s: 'validation', v: 0.3}, {at: 237.8, s: 'sfx/rise', v: 0.3}, {at: 239.5, s: 'deep-hit', v: 0.5}, {at: 247.1, s: 'validation', v: 0.32},
  ...[261, 261.6, 262.2].map((at) => ({at, s: 'sfx/pop', v: 0.22})), ...[265.0, 265.3, 265.6].map((at) => ({at, s: 'sfx/click', v: 0.35})), {at: 266.4, s: 'sfx/swish', v: 0.3},
  {at: 267.8, s: 'sfx/rise', v: 0.3}, ...[271.6, 272.8, 274.5].map((at) => ({at, s: 'sfx/pop', v: 0.3})),
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const QuartHeure: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <Bg />
    <Gate from={0} to={43.8}><Intro /></Gate>
    <Gate from={46.1} to={77}><P1 /></Gate>
    <Gate from={79.4} to={107}><P2 /></Gate>
    <Gate from={109.4} to={159.3}><P3 /></Gate>
    <Gate from={161.7} to={206.3}><P4 /></Gate>
    <Gate from={208.7} to={252.7}><P5 /></Gate>
    <Gate from={255} to={OUTRO_AT}><P6 /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><ClockWipe p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.3} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-quart-heure-securite-origine.m4a')} trimAfter={s(277.4)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

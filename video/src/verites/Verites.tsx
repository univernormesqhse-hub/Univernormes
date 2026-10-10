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
 * « Les 13 vérités du HSE » (5 min 28) — voix d'origine, sous-titres recalés mot à mot, illustrations par photos
 * réelles. Fil rouge inédit : un dossier confidentiel dont les 13 vérités sont déclassifiées une à une (bandes de
 * caviardage qui s'effacent, marqueurs de preuve numérotés). Autres techniques nouvelles : intercalaires de dossier
 * qui s'ouvrent, photo « super-héros » façon BD puis déchirée, couteau suisse des 10 métiers, tapis de course de
 * l'apprentissage, vinyle qui répète « on a toujours fait comme ça », atome à l'électron solitaire, insigne de
 * police qui se retourne en poignée de main, funambule entre sécurité et production, manomètre de la pression,
 * trousseau des clés du succès, piste du marathon. Les chiffres (1 h / 3 h, 70 %) sont ceux de la vidéo d'origine.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 327.9;
export const VERITES_FRAMES = s(OUTRO_AT + 3.8);
const BG = '#1D1A17';
const PAPER = '#F4ECDD';
const KRAFT = '#C9A46A';
const INK = '#1C1C1C';
const DIM = 'rgba(28,28,28,0.62)';
const LIGHT = '#F6F1E8';
const RED = '#D7263D';
const YEL = '#FFC400';
const BLUE = '#2D6CDF';
const V = (n: string) => staticFile(`verites/${n}`);

type Pt = {n: number; l: string; at: number; end: number};
const PT: Pt[] = [
  {n: 1, l: 'La réalité du terrain', at: 43.7, end: 102.7},
  {n: 2, l: 'La réalité humaine', at: 102.9, end: 185.8},
  {n: 3, l: 'Le poids de la responsabilité', at: 186.0, end: 243.4},
  {n: 4, l: 'Pourquoi ça en vaut la peine', at: 243.6, end: 315.0},
];
const TAB = 2.8;
// [n°, titre court, début]
const TRUTHS: [number, string, number][] = [
  [1, 'Le grand écart', 26.3], [2, 'La paperasse', 33.1], [3, '1 h terrain, 3 h bureau', 53.8], [4, 'Dix métiers en un', 68.2],
  [5, 'Apprendre sans fin', 85.5], [6, "70 % d'humain", 115.6], [7, '« On a toujours fait comme ça »', 131.4], [8, 'La solitude', 150.7],
  [9, 'Policier ou allié', 160.6], [10, 'Sécurité vs production', 168.3], [11, "L'impact d'un accident", 193.4], [12, 'La pression constante', 208.1],
  [13, 'Des attentes irréalistes', 223.8],
];

const pop = (t: number, at: number, d = 0.4) => prog(t, at, at + d, easeOut);
const spring = (t: number, at: number, k = 7, w = 15) => {
  const x = t - at;
  return x <= 0 ? 0 : 1 - Math.exp(-x * k) * Math.cos(x * w);
};
const win = (t: number, a: number, b: number, f = 0.4) => prog(t, a, a + f) * (1 - prog(t, b - f, b));
const T: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 40, color = INK, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, letterSpacing: -0.5, lineHeight: 1.05, ...style}}>{children}</div>
);
const Hand: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 48, color = INK, style}) => (
  <div style={{fontFamily: handFont, fontSize: size, color, lineHeight: 1.1, ...style}}>{children}</div>
);
const Type: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 34, color = INK, style}) => (
  <div style={{fontFamily: '"Courier New", monospace', fontWeight: 700, fontSize: size, color, lineHeight: 1.15, ...style}}>{children}</div>
);
const Abs: React.FC<{x: number; y: number; w?: number; h?: number; children?: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, ...style}}>{children}</div>
);
const Chip: React.FC<{children: React.ReactNode; c?: string; q?: number; size?: number; dark?: boolean; style?: React.CSSProperties}> = ({children, c = RED, q = 1, size = 34, dark, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 24px', borderRadius: 14, background: c, color: dark ? INK : '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size, transform: `scale(${q})`, boxShadow: '0 10px 24px rgba(0,0,0,0.3)', whiteSpace: 'nowrap', ...style}}>{children}</div>
);
const Row: React.FC<{y: number; children: React.ReactNode; gap?: number}> = ({y, children, gap = 14}) => (
  <Abs x={0} y={y} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap, flexWrap: 'wrap', padding: '0 40px', boxSizing: 'border-box'}}>{children}</Abs>
);
const Paper: React.CSSProperties = {background: PAPER, borderRadius: 6, boxShadow: '0 30px 60px rgba(0,0,0,0.45)', backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 46px, rgba(45,108,223,0.08) 46px 48px)'};
/** Photo réelle épinglée (trombone + ombre). */
const Pin: React.FC<{src: string; x: number; y: number; w: number; h: number; r?: number; q?: number; pos?: string; filter?: string; children?: React.ReactNode}> = ({src, x, y, w, h, r = 0, q = 1, pos = 'center', filter, children}) => (
  <Abs x={x} y={y} w={w} h={h} style={{transform: `rotate(${r}deg) scale(${q})`, background: '#fff', padding: 12, boxSizing: 'border-box', boxShadow: '0 24px 50px rgba(0,0,0,0.5)'}}>
    <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}}><Img src={src} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, filter}} />{children}</div>
    <div style={{position: 'absolute', left: 40, top: -26, width: 34, height: 80, borderRadius: 17, border: '6px solid #9AA3AE', borderBottomColor: 'transparent'}} />
  </Abs>
);
const Stamp: React.FC<{children: React.ReactNode; at: number; c?: string; r?: number; size?: number}> = ({children, at, c = RED, r = -8, size = 60}) => {
  const t = useT();
  if (t < at) return null;
  const q = prog(t, at, at + 0.22, easeIn);
  return <div style={{display: 'inline-block', transform: `rotate(${r}deg) scale(${2.2 - 1.2 * q})`, opacity: q, border: `8px solid ${c}`, borderRadius: 14, padding: '4px 22px', color: c, fontFamily: sansFont, fontWeight: 900, fontSize: size, letterSpacing: 2, mixBlendMode: 'multiply'}}>{children}</div>;
};
/** Ligne caviardée qui se dévoile. */
const Redact: React.FC<{children: React.ReactNode; at: number; size?: number}> = ({children, at, size = 40}) => {
  const t = useT();
  const q = prog(t, at, at + 0.6, easeInOut);
  return (
    <div style={{position: 'relative', display: 'inline-block'}}>
      <T size={size} style={{opacity: q > 0 ? 1 : 0}}>{children}</T>
      <div style={{position: 'absolute', left: -8, right: -8, top: 2, bottom: 2, background: '#111', transformOrigin: '100% 50%', transform: `scaleX(${1 - q})`}} />
    </div>
  );
};
/** Marqueur de preuve numéroté (chevalet jaune). */
const Marker: React.FC<{n: number; q?: number}> = ({n, q = 1}) => (
  <div style={{width: 110, height: 100, transform: `scale(${q})`, position: 'relative'}}>
    <svg width={110} height={100} viewBox="0 0 110 100"><path d="M10 95 L30 8 L80 8 L100 95 Z" fill={YEL} stroke="#B38900" strokeWidth={3} /><path d="M30 8 L55 28 L80 8" fill="none" stroke="#B38900" strokeWidth={2} /></svg>
    <div style={{position: 'absolute', left: 0, right: 0, top: 36, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK}}>{n}</div>
  </div>
);

/* ─────────── Couverture : dossier confidentiel ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.1, 2.8, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: BG, opacity: 1 - out}}>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, rgba(255,196,0,0.18), transparent 55%)'}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      {/* chemise kraft */}
      <Abs x={80} y={300} w={920} h={1300} style={{transform: 'rotate(-2deg)'}}>
        <div style={{position: 'absolute', left: 0, top: 40, width: 920, height: 1260, background: `linear-gradient(160deg, #D8B57A, ${KRAFT})`, borderRadius: 18, boxShadow: '0 40px 80px rgba(0,0,0,0.6)'}} />
        <div style={{position: 'absolute', left: 40, top: 0, width: 300, height: 70, background: '#D8B57A', borderRadius: '18px 18px 0 0'}} />
        <Pin src={V('plans.jpg')} x={90} y={150} w={500} h={560} r={-4} pos="60% 30%" />
        <Abs x={560} y={180}><Marker n={13} /></Abs>
        <Abs x={540} y={420} style={{transform: 'rotate(10deg)'}}><Stamp at={0} size={54}>CONFIDENTIEL</Stamp></Abs>
        <Abs x={60} y={790} w={800}>
          <Type size={36} color="#5A4420">DOSSIER N° HSE-13</Type>
          <T size={120} style={{marginTop: 10, textTransform: 'uppercase', letterSpacing: -3}}>Les 13 vérités</T>
          <T size={92} color={RED} style={{textTransform: 'uppercase'}}>du HSE</T>
          <Hand size={52} style={{marginTop: 18}}>Ce que les fiches de poste ne disent pas</Hand>
        </Abs>
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Intercalaire de dossier (ouverture de partie) ─────────── */
const TabCard: React.FC<{p: Pt}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + TAB;
  if (t < a || t > b) return null;
  const inQ = prog(t, a, a + 0.5, easeOut);
  const open = prog(t, b - 0.8, b - 0.1, easeInOut);
  return (
    <AbsoluteFill style={{zIndex: 55, perspective: 2400, background: `rgba(29,26,23,${0.92 * (1 - open)})`}}>
      <div style={{position: 'absolute', left: 90, top: 380, width: 900, height: 1150, transform: `translateY(${(1 - inQ) * 1600}px)`, transformStyle: 'preserve-3d'}}>
        {/* page intérieure */}
        <div style={{position: 'absolute', inset: 0, ...Paper, opacity: 1 - open}} />
        {/* couverture de l'intercalaire qui s'ouvre */}
        <div style={{position: 'absolute', inset: 0, transformOrigin: '0 50%', transform: `rotateY(${-170 * open}deg)`, background: `linear-gradient(160deg, #D8B57A, ${KRAFT})`, borderRadius: 14, boxShadow: '0 30px 60px rgba(0,0,0,0.5)', backfaceVisibility: 'hidden'}}>
          <div style={{position: 'absolute', right: -70, top: 120 + p.n * 160, width: 90, height: 140, background: [RED, BLUE, '#6B4E9B', '#2E8B57'][p.n - 1], borderRadius: '0 16px 16px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: '#fff'}}>{p.n}</div>
          <Abs x={70} y={280} w={760}>
            <Type size={36} color="#5A4420">PARTIE {p.n}/4</Type>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 300, color: INK, lineHeight: 1, opacity: 0.85}}>{p.n}</div>
            <T size={90}>{p.l}</T>
          </Abs>
          <Abs x={440} y={880} style={{transform: 'rotate(-6deg)'}}><Stamp at={a + 0.6} size={46}>DÉCLASSIFIÉ</Stamp></Abs>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ─────────── Introduction ─────────── */
const Intro: React.FC = () => {
  const t = useT();
  const o = 1 - prog(t, 26.0, 26.4);
  if (o <= 0) return null;
  const tear = prog(t, 9.4, 10.4, easeInOut);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* super-héros façon BD, puis déchiré */}
      {t < 12.0 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 11.6, 12.0)}}>
          {[0, 1].map((k) => (
            <div key={k} style={{position: 'absolute', inset: 0, clipPath: k ? 'polygon(52% 0, 100% 0, 100% 100%, 46% 100%, 50% 70%, 44% 45%, 53% 22%)' : 'polygon(0 0, 52% 0, 53% 22%, 44% 45%, 50% 70%, 46% 100%, 0 100%)', transform: `translateX(${(k ? 1 : -1) * tear * 260}px) rotate(${(k ? 1 : -1) * tear * 6}deg)`}}>
              <Abs x={90} y={460} w={900} h={1100} style={{background: '#fff', padding: 16, boxSizing: 'border-box', boxShadow: '0 30px 60px rgba(0,0,0,0.6)'}}>
                <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: YEL}}>
                  <Img src={V('plans.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '55% 30%', filter: 'contrast(1.3) saturate(1.5)', transform: `scale(${1.1 + t * 0.01})`}} />
                  <div style={{position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(0,0,0,0.35) 2px, transparent 2.5px)', backgroundSize: '12px 12px', mixBlendMode: 'multiply'}} />
                  {Array.from({length: 18}, (_, j) => <div key={j} style={{position: 'absolute', left: '50%', top: '40%', width: 1400, height: 6, background: 'rgba(255,255,255,0.5)', transformOrigin: '0 50%', transform: `rotate(${j * 20 + t * 4}deg) translateX(300px)`}} />)}
                </div>
              </Abs>
            </div>
          ))}
          <Abs x={120} y={500} style={{transform: `rotate(-10deg) scale(${spring(t, 2.7)})`, opacity: 1 - tear}}>
            <div style={{background: RED, padding: '16px 30px', clipPath: 'polygon(0 20%, 10% 0, 30% 15%, 50% 0, 70% 15%, 90% 0, 100% 25%, 92% 50%, 100% 75%, 88% 100%, 65% 85%, 45% 100%, 25% 85%, 8% 100%, 0 75%, 6% 50%)'}}><T size={64} color="#fff">SUPER-HÉROS ?</T></div>
          </Abs>
          {t > 9.4 && <Row y={960}><Chip c={INK} q={spring(t, 9.6)} size={44}>Un cliché</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* fiche de poste caviardée */}
      {t > 11.8 && (
        <AbsoluteFill style={{opacity: pop(t, 11.8)}}>
          <Abs x={110} y={470} w={860} h={1050} style={{...Paper, padding: '50px 56px', boxSizing: 'border-box', transform: `rotate(1.5deg) translateY(${(1 - spring(t, 11.9, 6, 12)) * 1200}px)`}}>
            <Type size={34} color="#7A6A50">FICHE DE POSTE</Type>
            <T size={60} style={{marginTop: 8}}>Responsable HSE</T>
            <div style={{height: 4, background: INK, margin: '20px 0 30px', opacity: 0.3}} />
            {[0, 1, 2, 3, 4, 5, 6].map((k) => <div key={k} style={{height: 30, background: '#111', marginTop: 22, width: `${55 + random(`r${k}`) * 40}%`, transformOrigin: '100% 50%', transform: `scaleX(${1 - prog(t, 14.9 + k * 0.25, 15.6 + k * 0.25)})`}} />)}
            <div style={{position: 'absolute', left: 56, right: 56, top: 290}}>
              {['Bureau', 'Humain', 'Pression', 'Solitude', 'Attentes', 'Sens', '…'].map((l, k) => <div key={l} style={{height: 30, marginTop: 22, opacity: prog(t, 15.2 + k * 0.25, 15.6 + k * 0.25)}}><Type size={30} color={RED}>■ {l}</Type></div>)}
            </div>
            <Abs x={420} y={760} style={{transform: 'rotate(-8deg)'}}><Stamp at={20.3} size={48}>13 VÉRITÉS</Stamp></Abs>
          </Abs>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Vérités 1–2 (avant la partie 1) ─────────── */
const V12: React.FC = () => {
  const t = useT();
  const o = win(t, 26.2, 43.6, 0.4);
  if (o <= 0) return null;
  const rip = prog(t, 32.0, 32.9, easeInOut);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 38.7 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 38.3, 38.7)}}>
          <Abs x={60} y={470} w={480} style={{textAlign: 'center'}}><Chip c={BLUE} q={spring(t, 27.8)}>L'ATTENTE</Chip></Abs>
          <Abs x={540} y={470} w={480} style={{textAlign: 'center', opacity: pop(t, 32.1)}}><Chip c={RED}>LA RÉALITÉ</Chip></Abs>
          <Pin src={V('telephone.jpg')} x={70} y={580} w={450} h={680} r={-3} pos="40% 30%" q={spring(t, 27.9)} />
          {/* bord déchiré qui révèle la réalité */}
          <div style={{position: 'absolute', left: 560, top: 580, width: 450, height: 680, clipPath: `inset(0 ${(1 - rip) * 100}% 0 0)`}}>
            <Pin src={V('ecriture.jpg')} x={0} y={0} w={450} h={680} r={3} pos="60% 50%" />
          </div>
          {t > 33.9 && <Row y={1320} gap={10}>{[['Rapports', 34.0], ['Procédures', 34.7], ['Réunions', 35.6]].map(([l, at]) => <Chip key={l as string} c={INK} size={30} q={spring(t, at as number)}>{l}</Chip>)}</Row>}
        </AbsoluteFill>
      )}
      {t > 38.5 && (
        <AbsoluteFill style={{opacity: pop(t, 38.5)}}>
          <Abs x={60} y={470} w={960} style={{textAlign: 'center'}}><T size={60} color={LIGHT}>Une charge administrative <span style={{color: YEL}}>colossale</span></T></Abs>
          {/* compteur de notifications qui s'emballe */}
          <Abs x={330} y={640} w={420} h={420} style={{borderRadius: 60, background: 'linear-gradient(160deg, #3A3633, #24211E)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 38.7)})`}}>
            <F n="enveloppe" size={220} />
            <div style={{position: 'absolute', right: -30, top: -30, minWidth: 150, height: 150, borderRadius: 75, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px', boxSizing: 'border-box', border: '8px solid #1D1A17'}}><T size={60} color="#fff">{t < 42 ? Math.floor(Math.pow(prog(t, 38.8, 42.0), 2) * 999) : '999+'}</T></div>
          </Abs>
          {Array.from({length: 14}, (_, k) => {
            const q = Math.min(1, Math.max(0, (t - 39.0 - k * 0.2) / 0.6));
            return <Abs key={k} x={150 + (k % 7) * 120} y={1500 - Math.floor(k / 7) * 30 - q * 0 - (1 - q) * 900} w={140} h={26} style={{background: PAPER, borderRadius: 4, boxShadow: '0 4px 8px rgba(0,0,0,0.4)', transform: `rotate(${(random(`p${k}`) - 0.5) * 20}deg)`, opacity: q > 0 ? 1 : 0}} />;
          })}
          <Row y={1200}><Hand size={50} color={LIGHT} style={{opacity: pop(t, 40.5)}}>elle dévore une bonne partie du temps</Hand></Row>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 1 : vérités 3–5 ─────────── */
const P1: React.FC = () => {
  const t = useT();
  const o = win(t, 46.4, 102.7, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 53.8 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 53.4, 53.8)}}>
          <Abs x={60} y={560} w={960} style={{textAlign: 'center'}}><T size={64} color={LIGHT}>Les tâches du quotidien</T><Hand size={48} color={YEL} style={{marginTop: 10}}>le socle du métier, même pas glamour</Hand></Abs>
          <Pin src={V('clipboard.jpg')} x={330} y={820} w={420} h={620} r={-3} q={spring(t, 47.0)} />
        </AbsoluteFill>
      )}
      {/* V3 : 1 h terrain / 3 h bureau */}
      {t > 53.6 && t < 68.2 && (
        <AbsoluteFill style={{opacity: win(t, 53.6, 68.2, 0.4)}}>
          <Abs x={60} y={470} w={960} style={{textAlign: 'center'}}><T size={58} color={LIGHT}>Pour <span style={{color: YEL}}>1 heure</span> de terrain…</T><T size={58} color={LIGHT} style={{opacity: pop(t, 57.4)}}>… <span style={{color: RED}}>3 heures</span> au bureau</T></Abs>
          <Row y={680} gap={18}>
            {[0, 1, 2, 3].map((k) => (
              <div key={k} style={{width: 210, height: 300, borderRadius: 26, background: k === 0 ? '#2E8B57' : '#3A3633', border: `5px solid ${k === 0 ? '#5CD08A' : RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, k === 0 ? 55.7 : 57.4 + (k - 1) * 0.3)})`}}>
                <F n={k === 0 ? 'casque' : 'ordinateur'} size={110} />
                <T size={36} color="#fff" style={{marginTop: 10}}>1 h</T>
                <Type size={22} color="#ffffffaa">{k === 0 ? 'TERRAIN' : 'BUREAU'}</Type>
              </div>
            ))}
          </Row>
          {/* écran : le travail de fond */}
          <Abs x={140} y={1040} w={800} h={420} style={{borderRadius: 24, background: '#0F1A2B', border: '10px solid #2C2A28', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', padding: 30, boxSizing: 'border-box', opacity: pop(t, 59.4)}}>
            {[['Analyses de risques', 61.7], ['Veille réglementaire', 63.0], ["Plans d'action", 64.3]].map(([l, at]) => (
              <div key={l as string} style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 14, opacity: pop(t, at as number)}}><Check p={prog(t, (at as number) + 0.1, (at as number) + 0.5)} size={46} color="#5CD08A" /><Type size={38} color="#DDE7F5">{l}</Type></div>
            ))}
            <div style={{position: 'absolute', right: 24, bottom: 18, width: 16, height: 36, background: '#5CD08A', opacity: Math.floor(t * 2) % 2}} />
          </Abs>
        </AbsoluteFill>
      )}
      {/* V4 : couteau suisse des 10 métiers */}
      {t > 68.0 && t < 85.6 && (() => {
        const BL: [string, number, string][] = [['Juriste', 73.8, 'balance'], ['Technicien', 75.1, 'outils'], ['Psychologue', 75.8, 'cerveau'], ['Manager', 76.5, 'equipe'], ['Analyste de données', 77.2, 'graphique']];
        return (
          <AbsoluteFill style={{opacity: win(t, 68.0, 85.6, 0.4)}}>
            <Abs x={60} y={470} w={960} style={{textAlign: 'center'}}><T size={64} color={LIGHT} style={{transform: `scale(${spring(t, 72.1)})`}}>Dix métiers <span style={{color: RED}}>en un</span></T></Abs>
            {/* manche */}
            <Abs x={300} y={1180} w={480} h={150} style={{zIndex: 3, borderRadius: 75, background: `linear-gradient(180deg, #E5394B, ${RED} 50%, #9E1A2B)`, boxShadow: '0 20px 40px rgba(0,0,0,0.5)', transform: `scale(${spring(t, 68.4)})`}}>
              <div style={{position: 'absolute', left: 200, top: 35, width: 80, height: 80, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{width: 18, height: 56, background: RED, position: 'absolute'}} /><div style={{width: 56, height: 18, background: RED, position: 'absolute'}} /></div>
            </Abs>
            {BL.map(([l, at, ic], k) => {
              const ang = -64 + k * 32;
              const open = spring(t, at, 6, 12);
              const rot = ang * open;
              return (
                <div key={l} style={{position: 'absolute', left: 540, top: 1230, width: 0, height: 0, transform: `rotate(${rot}deg)`, zIndex: 2}}>
                  <div style={{position: 'absolute', left: -22, top: -360 * (0.3 + 0.7 * open), width: 44, height: 360 * (0.3 + 0.7 * open), borderRadius: '22px 22px 6px 6px', background: 'linear-gradient(90deg, #F1F4F8, #A9B3BF)', boxShadow: '4px 0 0 rgba(0,0,0,0.15)'}} />
                  <div style={{position: 'absolute', left: -105, top: -360 - 150, width: 210, textAlign: 'center', transform: `rotate(${-rot}deg)`, opacity: t > at + 0.1 ? 1 : 0}}>
                    <div style={{width: 84, height: 84, margin: '0 auto', borderRadius: 42, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={ic} size={60} /></div>
                    <div style={{marginTop: 6, padding: '4px 10px', borderRadius: 10, background: YEL, fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: INK, display: 'inline-block'}}>{l}</div>
                  </div>
                </div>
              );
            })}
            {t > 79.0 && <Row y={1420}><Hand size={46} color={LIGHT} style={{opacity: pop(t, 79.0)}}>et peu de formations y préparent</Hand></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* V5 : tapis de course de l'apprentissage */}
      {t > 85.4 && (
        <AbsoluteFill style={{opacity: pop(t, 85.4)}}>
          <Abs x={60} y={470} w={960} style={{textAlign: 'center'}}><T size={60} color={LIGHT}>Un apprentissage <span style={{color: YEL}}>sans fin</span></T></Abs>
          {/* tapis */}
          <Abs x={150} y={1220} w={780} h={70} style={{borderRadius: 35, background: '#2C2A28', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)'}}>
            <div style={{position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(90deg, #3E3B38 0 40px, #2C2A28 40px 80px)', backgroundPosition: `${-t * 300}px 0`}} />
          </Abs>
          <Abs x={820} y={900} w={30} h={330} style={{background: '#4A4643', borderRadius: 10}} />
          <Abs x={760} y={880} w={160} h={60} style={{background: '#4A4643', borderRadius: 14}} />
          <Abs x={420} y={850} style={{transform: `translateY(${Math.abs(Math.sin(t * 7)) * -26}px)`}}><F n="ouvrier-dark" size={260} /></Abs>
          {/* éléments qui défilent vers lui */}
          {[['Réglementations', 87.6, 'parchemin'], ['Normes', 89.0, 'clipboard'], ['Technologies', 90.2, 'ordinateur']].map(([l, at, ic], k) => {
            const x = 1100 - (t - (at as number)) * 260;
            return t > (at as number) && x > -300 ? <Abs key={l as string} x={x} y={680 + k * 0} style={{textAlign: 'center'}}><F n={ic as string} size={110} /><Chip c={BLUE} size={26}>{l}</Chip></Abs> : null;
          })}
          {t > 93.9 && t < 96.4 && <Row y={720}><Stamp at={93.9} size={64}>OBSOLÈTE</Stamp></Row>}
          {t > 96.4 && <Row y={1360} gap={12}><Chip c={YEL} dark q={spring(t, 96.5)}>Formation continue</Chip><Chip c={RED} q={spring(t, 99.1)}>= survie professionnelle</Chip></Row>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 2 : vérités 6–10 ─────────── */
const P2: React.FC = () => {
  const t = useT();
  const o = win(t, 105.6, 185.8, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* V6 : 70 % humain */}
      {t < 131.3 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 130.9, 131.3)}}>
          <Abs x={60} y={470} w={960} style={{textAlign: 'center'}}><T size={60} color={LIGHT}>Purement technique ? <span style={{color: RED, textDecoration: t > 115.6 ? 'line-through' : 'none'}}>Un leurre</span></T></Abs>
          {t < 126.6 ? (
            <>
              <Abs x={240} y={620} w={600} h={600}>
                <svg width={600} height={600} viewBox="0 0 600 600" style={{position: 'absolute', inset: 0, transform: 'rotate(-90deg)'}}>
                  <circle cx={300} cy={300} r={260} fill="none" stroke="#3A3633" strokeWidth={60} />
                  <circle cx={300} cy={300} r={260} fill="none" stroke={YEL} strokeWidth={60} strokeLinecap="round" pathLength={1} strokeDasharray={`${0.7 * prog(t, 118.2, 119.6, easeInOut)} 1`} />
                </svg>
                <div style={{position: 'absolute', left: 80, top: 80, width: 440, height: 440, borderRadius: 220, overflow: 'hidden'}}><Img src={staticFile('induction/briefing-atelier.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /><div style={{position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)'}} /></div>
                <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><T size={130} color="#fff">{Math.round(70 * prog(t, 118.2, 119.6))} %</T><T size={34} color={YEL}>HUMAIN · COMMUNICATION</T></div>
              </Abs>
              <Row y={1280} gap={10}>{[['Convaincre', 122.0], ['Former', 123.6], ['Écouter', 124.0], ['Adapter son discours', 124.9]].map(([l, at]) => <Chip key={l as string} c={BLUE} size={30} q={spring(t, at as number)}>{l}</Chip>)}</Row>
              <Row y={1400}><Hand size={30} color="#ffffff99">chiffre cité par la vidéo d'origine</Hand></Row>
            </>
          ) : (
            <>
              <Pin src={staticFile('induction/operatrice.jpg')} x={70} y={640} w={440} h={600} r={-3} pos="50% 30%" q={spring(t, 127.5)} />
              <Pin src={staticFile('induction/reunion-audit.jpg')} x={570} y={680} w={440} h={520} r={3} q={spring(t, 129.6)} />
              <Abs x={90} y={1270} w={420} style={{transform: `scale(${spring(t, 127.7)})`}}><div style={{background: '#fff', borderRadius: 24, padding: '14px 20px'}}><Hand size={36}>« Concrètement, sur ta ligne… »</Hand></div><Type size={24} color={LIGHT} style={{marginTop: 8}}>OPÉRATEUR</Type></Abs>
              <Abs x={590} y={1270} w={420} style={{transform: `scale(${spring(t, 129.7)})`}}><div style={{background: '#fff', borderRadius: 24, padding: '14px 20px'}}><T size={30}>Risques, coûts, indicateurs</T></div><Type size={24} color={LIGHT} style={{marginTop: 8}}>COMITÉ DE DIRECTION</Type></Abs>
            </>
          )}
        </AbsoluteFill>
      )}
      {/* V7 : le vinyle qui tourne en boucle */}
      {t > 131.1 && t < 150.8 && (() => {
        const push = prog(t, 144.3, 147.5, easeInOut);
        return (
          <AbsoluteFill style={{opacity: win(t, 131.1, 150.8, 0.4)}}>
            {t < 141.7 ? (
              <>
                <Abs x={190} y={560} w={700} h={700} style={{transform: `scale(${spring(t, 131.5)})`}}>
                  <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: 'repeating-radial-gradient(circle, #111 0 6px, #1C1C1C 6px 9px)', transform: `rotate(${t * 200}deg)`, boxShadow: '0 30px 60px rgba(0,0,0,0.6)'}}>
                    <div style={{position: 'absolute', left: 230, top: 230, width: 240, height: 240, borderRadius: 120, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Type size={22} color="#fff" style={{textAlign: 'center'}}>EN BOUCLE</Type></div>
                    <svg width={700} height={700} viewBox="0 0 700 700" style={{position: 'absolute', inset: 0}}>
                      <defs><path id="arc" d="M350 350 m -290 0 a 290 290 0 1 1 580 0 a 290 290 0 1 1 -580 0" /></defs>
                      <text fontFamily={sansFont} fontWeight={900} fontSize={40} fill={YEL} letterSpacing={3}><textPath href="#arc">ON A TOUJOURS FAIT COMME ÇA · ON A TOUJOURS FAIT COMME ÇA ·</textPath></text>
                    </svg>
                  </div>
                </Abs>
                <Abs x={760} y={500} w={40} h={420} style={{background: '#9AA3AE', borderRadius: 20, transformOrigin: '50% 0', transform: 'rotate(22deg)'}} />
                {t > 138.4 && <Row y={1340}><Chip c={RED} q={spring(t, 138.4)}>Le mur contre lequel on se heurte</Chip></Row>}
              </>
            ) : (
              <>
                <Abs x={60} y={470} w={960} style={{textAlign: 'center'}}><T size={60} color={LIGHT}>Un combat contre l'<span style={{color: YEL}}>inertie</span></T></Abs>
                <Abs x={430 + push * 160} y={760} w={420} h={420} style={{background: 'linear-gradient(160deg, #6B6560, #3E3B38)', borderRadius: 18, boxShadow: '0 30px 60px rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={54} color="#fff" style={{textAlign: 'center'}}>LES<br />HABITUDES</T></Abs>
                <Abs x={150 + push * 160} y={820} style={{transform: 'rotate(-12deg)'}}><F n="ouvrier-dark" size={300} /></Abs>
                {t > 147.7 && <Row y={1300}><Chip c={BLUE} q={spring(t, 147.8)}>Expert de la conduite du changement</Chip></Row>}
              </>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* V8 : atome, électron solitaire · V9 : insigne → poignée de main */}
      {t > 150.6 && t < 168.3 && (() => {
        const a = (t - 150) * 2.2;
        const ex = 540 + Math.cos(a) * 330, ey = 980 + Math.sin(a) * 140;
        const flip = prog(t, 164.6, 165.4, easeInOut);
        return (
          <AbsoluteFill style={{opacity: win(t, 150.6, 168.3, 0.4)}}>
            {t < 160.6 ? (
              <>
                <Abs x={60} y={470} w={960} style={{textAlign: 'center'}}><T size={60} color={LIGHT}>Un profond sentiment de <span style={{color: YEL}}>solitude</span></T></Abs>
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><ellipse cx={540} cy={980} rx={330} ry={140} fill="none" stroke="#ffffff33" strokeWidth={4} strokeDasharray="10 12" /></svg>
                {[['Terrain', 250, 'casque', '#2E8B57'], ['Direction', 830, 'directeur', BLUE]].map(([l, x, ic, c]) => <Abs key={l as string} x={(x as number) - 110} y={870} w={220} style={{textAlign: 'center', transform: `scale(${spring(t, 151.2)})`}}><div style={{width: 180, height: 180, margin: '0 auto', borderRadius: 90, background: c as string, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 50px ${c}`}}><F n={ic as string} size={110} /></div><Chip c={c as string} size={26} style={{marginTop: 8}}>{l}</Chip></Abs>)}
                {t > 156.0 && <Abs x={ex - 70} y={ey - 70} w={140} h={140} style={{borderRadius: 70, overflow: 'hidden', border: `6px solid ${YEL}`, boxShadow: `0 0 40px ${YEL}`}}><Img src={staticFile('ingenieur/ingenieur.jpg')} style={{width: '100%', height: '140%', objectFit: 'cover', objectPosition: '50% 15%'}} /></Abs>}
                {t > 156.0 && <Row y={1260}><Chip c={YEL} dark q={spring(t, 156.1)}>Un électron libre</Chip></Row>}
              </>
            ) : (
              <>
                <Abs x={60} y={470} w={960} style={{textAlign: 'center'}}><T size={60} color={LIGHT}>Perçu comme…</T></Abs>
                <Abs x={290} y={640} w={500} h={600} style={{perspective: 1600}}>
                  <div style={{width: '100%', height: '100%', transformStyle: 'preserve-3d', transform: `rotateY(${flip * 180}deg) scale(${spring(t, 162.0)})`}}>
                    <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: '50% 50% 46% 46%', background: 'radial-gradient(circle at 35% 30%, #F5D776, #B8860B)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 30px 60px rgba(0,0,0,0.5)'}}><F n="etoile" size={170} /><T size={52} color="#4A3500">LE POLICIER</T></div>
                    <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: 40, background: 'radial-gradient(circle at 35% 30%, #7FE0A8, #2E8B57)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 30px 60px rgba(0,0,0,0.5)'}}><F n="poignee" size={220} /><T size={56} color="#fff">L'ALLIÉ</T></div>
                  </div>
                </Abs>
                <Row y={1300}><Hand size={44} color={LIGHT}>{t < 164.6 ? 'qui vient pointer les problèmes' : 'qui aide à les résoudre'}</Hand></Row>
              </>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* V10 : funambule sécurité / production */}
      {t > 168.1 && (() => {
        const tilt = Math.sin((t - 168) * 1.6) * 9 * (t < 184.4 ? 1 : 1.5);
        return (
          <AbsoluteFill style={{opacity: pop(t, 168.1)}}>
            <Abs x={60} y={470} w={960} style={{textAlign: 'center'}}><T size={58} color={LIGHT}>Le <span style={{color: YEL}}>conflit structurel</span></T></Abs>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <line x1={-20} y1={1360} x2={1100} y2={1360} stroke="#C9C1B4" strokeWidth={8} />
              <rect x={20} y={1360} width={30} height={400} fill="#5A5550" /><rect x={1030} y={1360} width={30} height={400} fill="#5A5550" />
            </svg>
            <div style={{position: 'absolute', left: 540, top: 1360, width: 0, height: 0, transform: `rotate(${tilt}deg)`}}>
              <Img src={staticFile('ingenieur/ingenieur-detoure.png')} style={{position: 'absolute', left: -170, top: -520, height: 520, filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))'}} />
              <div style={{position: 'absolute', left: -480, top: -300, width: 960, height: 14, borderRadius: 7, background: '#D9D2C5'}} />
              <Abs x={-500} y={-420} w={240} style={{textAlign: 'center', opacity: pop(t, 174.6)}}><Chip c="#2E8B57" size={28}>Sécurité parfaite</Chip></Abs>
              <Abs x={260} y={-420} w={240} style={{textAlign: 'center', opacity: pop(t, 176.6)}}><Chip c={RED} size={28}>Production</Chip></Abs>
            </div>
            {t > 178.9 && <Row y={1460}><Hand size={46} color={LIGHT} style={{opacity: pop(t, 178.9)}}>un équilibre permanent</Hand></Row>}
            {t > 184.4 && <Row y={1540}><Chip c={YEL} dark q={spring(t, 184.5)}>Souvent contradictoires</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 3 : vérités 11–13 ─────────── */
const P3: React.FC = () => {
  const t = useT();
  const o = win(t, 188.7, 243.4, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* V11 : l'impact d'un accident */}
      {t < 208.1 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 207.7, 208.1)}}>
          <Abs x={60} y={470} w={960} style={{textAlign: 'center'}}><T size={56} color={LIGHT}>Aucune formation ne prépare à un <span style={{color: RED}}>accident</span></T></Abs>
          <Pin src={V('accident.jpg')} x={100} y={680} w={880} h={560} r={-1.5} filter={`grayscale(${prog(t, 196, 199)}) contrast(1.05)`} q={spring(t, 193.5)}>
            <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle, transparent 30%, rgba(0,0,0,${0.6 * prog(t, 197, 200)}) 100%)`}} />
          </Pin>
          {t > 203.1 && <Row y={1320} gap={12}><Chip c={RED} size={30} q={spring(t, 203.2)}>Charge émotionnelle</Chip><Chip c={INK} size={30} q={spring(t, 205.1)} style={{border: '2px solid #fff'}}>Responsabilité morale</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* V12 : manomètre + questions en boucle */}
      {t > 207.9 && t < 223.9 && (() => {
        const needle = -120 + 230 * prog(t, 210.5, 213.0, easeInOut) + (t > 213 ? Math.sin(t * 20) * 4 : 0);
        return (
          <AbsoluteFill style={{opacity: win(t, 207.9, 223.9, 0.4)}}>
            <Abs x={60} y={470} w={960} style={{textAlign: 'center'}}><T size={58} color={LIGHT}>Une <span style={{color: RED}}>pression</span> constante</T></Abs>
            <Abs x={290} y={600} w={500} h={500}>
              <svg width={500} height={500} viewBox="0 0 500 500">
                <circle cx={250} cy={250} r={230} fill="#E9E2D5" stroke="#8C8478" strokeWidth={18} />
                <path d="M110 390 A200 200 0 1 1 390 390" fill="none" stroke="url(#mg)" strokeWidth={34} />
                <defs><linearGradient id="mg"><stop offset="0" stopColor="#2E8B57" /><stop offset="0.6" stopColor={YEL} /><stop offset="1" stopColor={RED} /></linearGradient></defs>
                <g transform={`translate(250 250) rotate(${needle})`}><line x1={0} y1={20} x2={0} y2={-180} stroke={INK} strokeWidth={10} strokeLinecap="round" /></g>
                <circle cx={250} cy={250} r={26} fill={INK} />
                <text x={250} y={360} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={32} fill={INK}>PRESSION</text>
              </svg>
            </Abs>
            {t > 214.7 && ['Est-ce que j’ai bien pensé à tout ?', 'Et si… ?', 'Et si… ?', 'Et si… ?'].map((q, k) => <Abs key={k} x={[90, 640, 120, 700][k]} y={[1120, 1160, 1280, 1300][k]} style={{transform: `scale(${spring(t, 214.8 + k * 0.5)}) rotate(${(k % 2 ? 4 : -4)}deg)`}}><div style={{background: '#fff', borderRadius: 30, padding: '14px 22px', maxWidth: 440}}><Hand size={k ? 44 : 36}>{q}</Hand></div></Abs>)}
            {t > 217.4 && <Row y={1460} gap={10}><Chip c="#6B4E9B" size={28} q={spring(t, 217.5)}>Syndrome de l'imposteur</Chip><Chip c={RED} size={28} q={spring(t, 218.8)}>Anxiété</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* V13 : attentes irréalistes */}
      {t > 223.7 && (
        <AbsoluteFill style={{opacity: pop(t, 223.7)}}>
          <Abs x={60} y={470} w={960} style={{textAlign: 'center'}}><T size={58} color={LIGHT}>Des attentes <span style={{color: RED}}>irréalistes</span></T></Abs>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <path d="M120 1440 L540 640 L960 1440 Z" fill="#6E7682" opacity={pop(t, 224.0)} />
            <path d="M440 830 L540 640 L640 830 L590 800 L540 850 L490 800 Z" fill="#fff" opacity={pop(t, 224.3)} />
            <line x1={540} y1={640} x2={540} y2={540} stroke={INK} strokeWidth={6} opacity={pop(t, 228.2)} />
          </svg>
          {t > 228.2 && <Abs x={545} y={540} style={{transform: `scale(${spring(t, 228.3)})`, transformOrigin: '0 50%'}}><div style={{background: RED, padding: '8px 18px', borderRadius: '0 10px 10px 0'}}><T size={30} color="#fff">ZÉRO ACCIDENT</T></div></Abs>}
          <Abs x={200} y={1330} style={{transform: `scale(${spring(t, 224.6)})`}}><F n="ouvrier-dark" size={110} /></Abs>
          {t > 230.9 && <Abs x={720} y={1180} style={{transform: `rotate(6deg) scale(${spring(t, 231.0)})`}}><div style={{width: 230, background: '#FFF27A', padding: 20, boxShadow: '0 14px 30px rgba(0,0,0,0.4)'}}><Hand size={44}>Pour HIER !</Hand></div></Abs>}
          {t > 233.4 && <Row y={1480} gap={12}><Chip c={INK} size={28} q={spring(t, 233.5)} style={{border: '2px solid #fff'}}>Ressources ?</Chip><Chip c={INK} size={28} q={spring(t, 234.4)} style={{border: '2px solid #fff'}}>Temps ?</Chip></Row>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 4 : clés, marathon, oui ─────────── */
const P4: React.FC = () => {
  const t = useT();
  const o = win(t, 246.3, 315.0, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* trousseau des 3 clés */}
      {t < 271.4 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 271.0, 271.4)}}>
          <Abs x={60} y={470} w={960} style={{textAlign: 'center'}}><T size={58} color={LIGHT}>Les <span style={{color: YEL}}>clés</span> du succès</T></Abs>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><circle cx={540} cy={700} r={80} fill="none" stroke="#C9C1B4" strokeWidth={18} /></svg>
          {[['Soutien de la direction', 255.4, -40, YEL], ['Réseau de pairs', 261.8, 0, '#9AD0F5'], ['Petites victoires', 265.1, 40, '#F5A9B8']].map(([l, at, ang, c]) => {
            const sw = (ang as number) + Math.sin(t * 2 + (ang as number)) * 4;
            return (
              <div key={l as string} style={{position: 'absolute', left: 540, top: 770, width: 0, height: 0, transform: `rotate(${sw}deg) scale(${spring(t, at as number, 6, 12)})`}}>
                <svg width={140} height={560} viewBox="0 0 70 280" style={{position: 'absolute', left: -70, top: 0}}>
                  <circle cx={35} cy={40} r={32} fill={c as string} stroke="#8C7A3C" strokeWidth={4} /><circle cx={35} cy={40} r={12} fill={BG} />
                  <rect x={28} y={70} width={14} height={190} fill={c as string} stroke="#8C7A3C" strokeWidth={3} />
                  <rect x={42} y={200} width={18} height={12} fill={c as string} /><rect x={42} y={228} width={24} height={12} fill={c as string} />
                </svg>
                <div style={{position: 'absolute', left: -150, top: 570, width: 300, textAlign: 'center', transform: `rotate(${-sw}deg)`}}><Chip c={c as string} dark size={26}>{l}</Chip></div>
              </div>
            );
          })}
          {t > 265.1 && Array.from({length: 24}, (_, k) => { const q = Math.min(1, (t - 265.1) / 1.8); const a = (k / 24) * Math.PI * 2; return <Abs key={k} x={540 + Math.cos(a) * 420 * q} y={1000 + Math.sin(a) * 420 * q + q * q * 200} w={18} h={10} style={{background: [YEL, RED, BLUE, '#5CD08A'][k % 4], transform: `rotate(${k * 30 + t * 200}deg)`, opacity: 1 - prog(t, 266.6, 267.4)}} />; })}
        </AbsoluteFill>
      )}
      {/* piste du marathon */}
      {t > 271.2 && t < 294.0 && (() => {
        const run = prog(t, 274.4, 287.0, (x) => x);
        return (
          <AbsoluteFill style={{opacity: win(t, 271.2, 294.0, 0.4)}}>
            <Abs x={60} y={470} w={960} style={{textAlign: 'center'}}><T size={56} color={LIGHT}>La culture sécurité : un <span style={{color: YEL}}>marathon</span></T></Abs>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              {[0, 1, 2, 3].map((k) => <path key={k} d={`M${60 + k * 30} 1500 Q540 ${600 + k * 60} ${1020 - k * 30} 1500`} fill="none" stroke={k === 0 ? '#C0392B' : '#B4513F'} strokeWidth={70 - k * 4} opacity={0.9} />)}
              {[0, 1, 2, 3].map((k) => <path key={`l${k}`} d={`M${75 + k * 30} 1500 Q540 ${630 + k * 60} ${1005 - k * 30} 1500`} fill="none" stroke="#fff" strokeWidth={3} strokeDasharray="22 16" />)}
            </svg>
            {(() => {
              // position sur la courbe extérieure
              const u = run;
              const x = (1 - u) * (1 - u) * 60 + 2 * (1 - u) * u * 540 + u * u * 1020, y = (1 - u) * (1 - u) * 1500 + 2 * (1 - u) * u * 600 + u * u * 1500;
              return <Abs x={x - 70} y={y - 190} style={{transform: `translateY(${Math.abs(Math.sin(t * 8)) * -14}px)`}}><F n="ouvrier-dark" size={160} /></Abs>;
            })()}
            {['1 mois', '6 mois', '1 an', '3 ans'].map((m, k) => { const u = 0.2 + k * 0.22; const x = (1 - u) * (1 - u) * 60 + 2 * (1 - u) * u * 540 + u * u * 1020, y = (1 - u) * (1 - u) * 1500 + 2 * (1 - u) * u * 600 + u * u * 1500; return <Abs key={m} x={x - 60} y={y + 30} w={120} style={{textAlign: 'center', opacity: pop(t, 276 + k)}}><Type size={24} color={LIGHT}>{m}</Type></Abs>; })}
            {t > 279.0 && <Row y={1180} gap={10}><Chip c={INK} size={30} q={spring(t, 279.0)} style={{border: '2px solid #fff', textDecoration: 'line-through'}}>Sprint</Chip><Chip c={YEL} dark size={30} q={spring(t, 280.5)}>Des années</Chip></Row>}
            {t > 282.4 && <Row y={1600} gap={10}><Chip c={BLUE} size={28} q={spring(t, 282.5)}>Patience</Chip><Chip c={BLUE} size={28} q={spring(t, 283.4)}>Persévérance</Chip><Chip c={RED} size={28} q={spring(t, 285.5)}>Les vrais outils</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* bilan + OUI */}
      {t > 293.8 && (
        <AbsoluteFill style={{opacity: pop(t, 293.8)}}>
          {t < 300.1 ? (
            <>
              <Abs x={60} y={470} w={960} style={{textAlign: 'center'}}><T size={58} color={LIGHT}>Le jeu en vaut-il la chandelle ?</T></Abs>
              {['Charge administrative', 'Isolement', 'Pression psychologique', 'Attentes irréalistes'].map((l, k) => <Abs key={l} x={180 + k * 20} y={700 + k * 140} w={680} style={{transform: `rotate(${(k % 2 ? 2 : -2)}deg) translateX(${(1 - spring(t, 288.6 + k * 1.2)) * -900}px)`}}><div style={{...Paper, padding: '24px 30px'}}><Type size={36}>DOSSIER : {l.toUpperCase()}</Type></div></Abs>)}
            </>
          ) : (
            <>
              <Pin src={staticFile('induction/mine-equipe.jpg')} x={90} y={540} w={900} h={640} r={-1.5} q={spring(t, 303.4)} />
              <Abs x={300} y={680} style={{transform: 'rotate(-10deg)'}}><Stamp at={301.1} c="#2E8B57" size={150}>OUI</Stamp></Abs>
              {t > 306.4 && <Row y={1240} gap={12}><Chip c={YEL} dark q={spring(t, 306.5)}>Un sens profond</Chip></Row>}
              {t > 309.0 && <Row y={1350} gap={12}><Chip c="#2E8B57" q={spring(t, 309.1)}><F n="coeur" size={40} />Protéger la vie et la santé</Chip></Row>}
              {t > 313.9 && <Row y={1460}><Hand size={50} color={LIGHT} style={{opacity: pop(t, 313.9)}}>une mission immensément gratifiante</Hand></Row>}
            </>
          )}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Conclusion : les 13 pièces du dossier ─────────── */
const Concl: React.FC = () => {
  const t = useT();
  if (t < 314.9) return null;
  const o = pop(t, 315.0, 0.5);
  const pick = 6;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Abs x={60} y={470} w={960} style={{textAlign: 'center'}}><T size={54} color={LIGHT}>Laquelle change votre <span style={{color: YEL}}>regard</span> ?</T></Abs>
      <div style={{position: 'absolute', left: 90, top: 600, width: 900, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16}}>
        {TRUTHS.map(([n, l], k) => {
          const hot = t > 321.4 && k === pick;
          return (
            <div key={n} style={{height: 160, ...Paper, padding: 12, boxSizing: 'border-box', transform: `scale(${spring(t, 315.2 + k * 0.12) * (hot ? 1.08 : 1)}) rotate(${(random(`c${k}`) - 0.5) * 6}deg)`, outline: hot ? `6px solid ${YEL}` : 'none', opacity: t > 321.4 && !hot ? 0.45 : 1}}>
              <Type size={22} color={RED}>N° {n}</Type>
              <T size={24} style={{marginTop: 6}}>{l}</T>
            </div>
          );
        })}
      </div>
      {t > 323.6 && <Row y={1460} gap={12}><Chip c={BLUE} q={spring(t, 323.6)}>Si essentiel</Chip><Chip c={RED} q={spring(t, 325.0)}>… si méconnu</Chip></Row>}
      {t > 326.6 && <Row y={1560}><Hand size={50} color={YEL} style={{opacity: pop(t, 326.6)}}>La réflexion est lancée</Hand></Row>}
    </AbsoluteFill>
  );
};

/* ─────────── En-tête : partie + vérité n° ─────────── */
const Header: React.FC = () => {
  const t = useT();
  const p = PT.find((x) => t >= x.at + TAB - 0.3 && t < x.end);
  const tr = TRUTHS.reduce((a, x, k) => (t >= x[2] ? k : a), -1);
  const showTruth = tr >= 0 && t < 243.4 && !PT.some((x) => t >= x.at && t < x.at + TAB);
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 95, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {t > 2.6 && t < 26.2 && <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', opacity: pop(t, 2.6) * (1 - prog(t, 25.8, 26.2))}}><div style={{padding: '10px 26px', borderRadius: 12, background: KRAFT}}><Type size={34}>DOSSIER : LES 13 VÉRITÉS DU HSE</Type></div></div>}
      {(p || showTruth) && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 230, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14}}>
          {showTruth && <div key={tr} style={{transform: `scale(${spring(t, TRUTHS[tr][2], 8, 16)})`}}><Marker n={tr + 1} q={0.8} /></div>}
          <div>
            {p && <Type size={26} color={YEL}>PARTIE {p.n} · {p.l.toUpperCase()}</Type>}
            {showTruth && <T size={38} color={LIGHT}>Vérité n° {tr + 1}/13 · {TRUTHS[tr][1]}</T>}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

const Bg: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{background: BG}}>
      <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.03) 2px, transparent 2px)', backgroundSize: '80px 80px', backgroundPosition: `0 ${-t * 4}px`}} />
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, rgba(255,196,0,0.12), transparent 60%)'}} />
      {/* lampe de bureau qui oscille */}
      <AbsoluteFill style={{background: `radial-gradient(circle at ${50 + Math.sin(t * 0.3) * 8}% 30%, rgba(255,240,200,0.07), transparent 40%)`}} />
    </AbsoluteFill>
  );
};

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'tampon', v: 0.4}, {at: 2.1, s: 'soft-whoosh', v: 0.5, dur: 2},
  {at: 2.7, s: 'bass-hit', v: 0.35}, {at: 9.4, s: 'page', v: 0.6}, {at: 9.6, s: 'sfx/pop', v: 0.3},
  {at: 11.9, s: 'sfx/whoosh', v: 0.35}, ...Array.from({length: 7}, (_, k) => ({at: 14.9 + k * 0.25, s: 'sfx/swish', v: 0.18})), {at: 20.3, s: 'tampon', v: 0.55},
  ...TRUTHS.map(([, , at]) => ({at, s: 'sfx/ding', v: 0.3})),
  ...PT.flatMap((p) => [{at: p.at, s: 'sfx/whoosh', v: 0.4}, {at: p.at + 0.6, s: 'tampon', v: 0.5}, {at: p.at + TAB - 0.8, s: 'page', v: 0.55}]),
  {at: 27.9, s: 'sfx/pop', v: 0.3}, {at: 32.0, s: 'page', v: 0.55}, ...[34.0, 34.7, 35.6].map((at) => ({at, s: 'sfx/pop', v: 0.28})),
  {at: 38.7, s: 'notification', v: 0.4}, ...Array.from({length: 14}, (_, k) => ({at: 39.0 + k * 0.2, s: 'tick', v: 0.15})),
  {at: 55.7, s: 'sfx/thud', v: 0.35}, ...[57.4, 57.7, 58.0].map((at) => ({at, s: 'sfx/thud', v: 0.35})), ...[61.7, 63.0, 64.3].map((at) => ({at, s: 'sfx/click', v: 0.35})),
  {at: 72.1, s: 'bass-hit', v: 0.35}, ...[73.8, 75.1, 75.8, 76.5, 77.2].map((at) => ({at, s: 'sfx/click', v: 0.45})),
  {at: 85.6, s: 'soft-whoosh', v: 0.3, dur: 3}, ...[87.6, 89.0, 90.2].map((at) => ({at, s: 'sfx/whoosh', v: 0.25})), {at: 93.9, s: 'tampon', v: 0.55}, {at: 96.5, s: 'validation', v: 0.3},
  {at: 118.2, s: 'sfx/rise', v: 0.3}, ...[122.0, 123.6, 124.0, 124.9].map((at) => ({at, s: 'sfx/pop', v: 0.28})), {at: 127.5, s: 'sfx/swish', v: 0.3}, {at: 129.6, s: 'sfx/swish', v: 0.3},
  {at: 131.5, s: 'sfx/click', v: 0.4}, {at: 138.4, s: 'deep-hit', v: 0.4}, {at: 144.3, s: 'tension', v: 0.2, dur: 3}, {at: 147.8, s: 'validation', v: 0.3},
  {at: 153.5, s: 'deep-hit', v: 0.3}, {at: 156.1, s: 'sfx/pop', v: 0.3}, {at: 162.1, s: 'sfx/thud', v: 0.35}, {at: 164.6, s: 'sfx/swish', v: 0.4}, {at: 165.3, s: 'validation', v: 0.32},
  {at: 170.4, s: 'tension', v: 0.2, dur: 4}, {at: 174.7, s: 'sfx/pop', v: 0.28}, {at: 176.6, s: 'sfx/pop', v: 0.28}, {at: 184.5, s: 'sfx/thud', v: 0.35},
  {at: 193.5, s: 'deep-hit', v: 0.45}, {at: 203.2, s: 'sfx/thud', v: 0.3}, {at: 205.1, s: 'sfx/thud', v: 0.3},
  {at: 210.5, s: 'sfx/rise', v: 0.3}, ...[214.8, 215.3, 215.8, 216.3].map((at) => ({at, s: 'sfx/pop', v: 0.25})), {at: 217.5, s: 'tension', v: 0.2, dur: 2},
  {at: 228.3, s: 'sfx/pop', v: 0.3}, {at: 231.0, s: 'page', v: 0.45}, {at: 233.5, s: 'sfx/thud', v: 0.25}, {at: 234.4, s: 'tick', v: 0.3},
  {at: 255.4, s: 'sfx/click', v: 0.45}, {at: 261.8, s: 'sfx/click', v: 0.45}, {at: 265.1, s: 'sfx/click', v: 0.45}, {at: 265.2, s: 'validation', v: 0.32},
  {at: 274.4, s: 'soft-whoosh', v: 0.3, dur: 3}, {at: 279.0, s: 'sfx/swish', v: 0.3}, {at: 280.5, s: 'sfx/pop', v: 0.3}, ...[282.5, 283.4, 285.5].map((at) => ({at, s: 'sfx/pop', v: 0.28})),
  ...[288.6, 289.8, 291.0, 292.2].map((at) => ({at, s: 'page', v: 0.4})), {at: 301.1, s: 'tampon', v: 0.6}, {at: 301.2, s: 'bass-hit', v: 0.4}, {at: 306.5, s: 'sfx/pop', v: 0.3}, {at: 309.1, s: 'validation', v: 0.32},
  ...Array.from({length: 13}, (_, k) => ({at: 315.2 + k * 0.12, s: 'page', v: 0.18})), {at: 321.4, s: 'sfx/ding', v: 0.35}, {at: 326.6, s: 'sfx/rise', v: 0.25},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Verites: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <Bg />
    <Gate from={0} to={26.6}><Intro /></Gate>
    <Gate from={26} to={44}><V12 /></Gate>
    <Gate from={46.3} to={103}><P1 /></Gate>
    <Gate from={105.5} to={186}><P2 /></Gate>
    <Gate from={188.6} to={243.6}><P3 /></Gate>
    <Gate from={246.2} to={315.2}><P4 /></Gate>
    <Gate from={314.8} to={OUTRO_AT}><Concl /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + TAB + 0.1}><TabCard p={p} /></Gate>)}
    <Gate from={0} to={2.9}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.3} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-13-verites-hse-origine.m4a')} trimAfter={s(327.7)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

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
 * « Se spécialiser en QHSE » (6 min 12) — voix d'origine, sous-titres recalés mot à mot, photos réelles. Fil rouge
 * inédit : une carte au trésor des spécialisations dont chaque partie est une étape du sentier, et des transitions en
 * page de magazine qui se tourne. Autres techniques nouvelles : triptyque de responsabilités, boulet qui devient
 * catapulte, panneau de demi-tour à 180°, bouclier puis coureur, étiquette « argument de vente », dominos des raisons,
 * terminal de paiement, grande roue de l'amélioration continue, icônes d'applications qui fusionnent, foule d'yeux,
 * bulle « on est verts » tamponnée « preuve ? », cercle d'étoiles, piliers ESG, double flèche de la double matérialité,
 * réacteur qui s'emballe avec courbe exponentielle et ventilateur qui faiblit, jauge du seuil adiabatique, fiche de
 * paie, couteau suisse des compétences, livre de règles poussiéreux, ruche des secteurs, ondes d'impact dans l'eau.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 372.0;
export const SPECIALISER_FRAMES = s(OUTRO_AT + 3.8);
const BG = '#0F1B1E';
const INK = '#13201F';
const LIGHT = '#F6FBF8';
const DIM = 'rgba(246,251,248,0.65)';
const MAP = '#EFE2C2';
const ORA = '#FF8A1F';
const GREEN = '#3DD68C';
const TEAL = '#24B3A8';
const RED = '#F05252';
const YEL = '#FFD23F';
const BLUE = '#4D9DFF';
const PH = (p: string) => staticFile(p);

type Pt = {n: number; l: string; at: number; end: number; c: string; ic: string};
const PT: Pt[] = [
  {n: 1, l: "Une philosophie d'entreprise", at: 43.3, end: 103.1, c: ORA, ic: 'ampoule'},
  {n: 2, l: 'Les systèmes de management', at: 103.3, end: 159.7, c: TEAL, ic: 'engrenage'},
  {n: 3, l: "L'ère de la transparence", at: 159.9, end: 215.2, c: BLUE, ic: 'loupe'},
  {n: 4, l: 'Enjeux et responsabilités', at: 215.4, end: 284.9, c: RED, ic: 'danger'},
  {n: 5, l: 'La carrière en QHSE', at: 285.1, end: 371.8, c: GREEN, ic: 'fusee'},
];
const WIPE = 2.4;

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
const Chip: React.FC<{children: React.ReactNode; c?: string; q?: number; size?: number; dark?: boolean; style?: React.CSSProperties}> = ({children, c = ORA, q = 1, size = 34, dark = true, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 26px', borderRadius: 50, background: c, color: dark ? INK : '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size, transform: `scale(${q})`, boxShadow: `0 12px 30px ${c}55`, whiteSpace: 'nowrap', ...style}}>{children}</div>
);
const Row: React.FC<{y: number; children: React.ReactNode; gap?: number}> = ({y, children, gap = 14}) => (
  <Abs x={0} y={y} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap, flexWrap: 'wrap', padding: '0 40px', boxSizing: 'border-box'}}>{children}</Abs>
);
const Title: React.FC<{children: React.ReactNode; y?: number}> = ({children, y = 450}) => <Abs x={60} y={y} w={960} style={{textAlign: 'center'}}><T size={58}>{children}</T></Abs>;
const Photo: React.FC<{src: string; x: number; y: number; w: number; h: number; q?: number; r?: number; pos?: string; children?: React.ReactNode; filter?: string; border?: string}> = ({src, x, y, w, h, q = 1, r = 0, pos = 'center', children, filter, border = 'rgba(255,255,255,0.92)'}) => {
  const t = useT();
  return (
    <Abs x={x} y={y} w={w} h={h} style={{borderRadius: 30, overflow: 'hidden', border: `6px solid ${border}`, boxShadow: '0 30px 60px rgba(0,0,0,0.5)', transform: `scale(${q}) rotate(${r}deg)`}}>
      <Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${1.05 + (t % 30) * 0.004})`, filter}} />
      {children}
    </Abs>
  );
};

/* ─────────── Couverture : la carte au trésor ─────────── */
const TrailMap: React.FC<{w: number; h: number; done: number; t: number}> = ({w, h, done, t}) => {
  const pts = [[0.12, 0.85], [0.3, 0.62], [0.58, 0.72], [0.78, 0.48], [0.5, 0.3], [0.82, 0.14]];
  const d = pts.map(([x, y], k) => `${k ? 'L' : 'M'}${x * w} ${y * h}`).join(' ');
  return (
    <div style={{position: 'relative', width: w, height: h, background: MAP, borderRadius: 18, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.45)', backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(120,90,40,0.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(120,90,40,0.15), transparent 40%)'}}>
      <svg width={w} height={h} style={{position: 'absolute', inset: 0}}>
        <path d={d} stroke="#8A5A2B" strokeWidth={Math.max(3, w / 160)} strokeDasharray={`${w / 40} ${w / 60}`} fill="none" />
        {pts.slice(1).map(([x, y], k) => <g key={k}><circle cx={x * w} cy={y * h} r={w / 30} fill={k < done ? PT[k].c : '#C9B48A'} stroke="#5A3A1A" strokeWidth={3} />{k < done && <text x={x * w} y={y * h + w / 80} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={w / 30} fill="#fff">{k + 1}</text>}</g>)}
        <g transform={`translate(${pts[0][0] * w} ${pts[0][1] * h})`}><line x1={0} y1={0} x2={0} y2={-w / 14} stroke="#5A3A1A" strokeWidth={Math.max(2, w / 200)} /><path d={`M0 ${-w / 14} L${w / 22} ${-w / 18} L0 ${-w / 26} Z`} fill={RED} /></g>
      </svg>
      {done > 0 && done <= 5 && <div style={{position: 'absolute', left: pts[done][0] * w - w / 40, top: pts[done][1] * h - w / 10 - Math.abs(Math.sin(t * 4)) * w / 60, width: w / 20, height: w / 20, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', background: RED, border: `${Math.max(2, w / 200)}px solid #fff`}} />}
    </div>
  );
};
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: BG, opacity: 1 - out}}>
      {[['induction/technicien-hse.jpg', 0], ['smi/raffinerie.jpg', 360], ['ingenieur/ingenieur.jpg', 720]].map(([src, x]) => <div key={src as string} style={{position: 'absolute', left: x as number, top: 0, width: 360, height: 1060, overflow: 'hidden', borderRight: `6px solid ${BG}`}}><Img src={PH(src as string)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>)}
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${BG}CC 0%, transparent 20%, transparent 40%, ${BG} 58%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={1000} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: GREEN, color: INK, fontFamily: sansFont, fontWeight: 800, fontSize: 32, letterSpacing: 3}}>MÉTIERS · CARRIÈRE</div>
        <T size={128} style={{marginTop: 16, textTransform: 'uppercase', letterSpacing: -3}}>Se spécialiser</T>
        <T size={150} color={GREEN} style={{letterSpacing: -4}}>en QHSE</T>
        <div style={{display: 'flex', justifyContent: 'center', gap: 14, marginTop: 18}}>{[['Sécurité des procédés', RED], ['Environnement', GREEN], ['Qualité alimentaire', YEL]].map(([l, c]) => <div key={l} style={{padding: '10px 20px', borderRadius: 30, border: `4px solid ${c}`}}><T size={28} color={c}>{l}</T></div>)}</div>
      </Abs>
      <Abs x={290} y={1460}><TrailMap w={500} h={250} done={0} t={t} /></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : la page de magazine qui se tourne ─────────── */
const PageTurn: React.FC<{p: Pt}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const turnIn = prog(t, a, a + 0.6, easeInOut);
  const turnOut = prog(t, b - 0.6, b, easeInOut);
  return (
    <AbsoluteFill style={{zIndex: 55, perspective: 2400, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', inset: 0, transformOrigin: '0% 50%', transform: `rotateY(${(1 - turnIn) * -100 + turnOut * 100}deg)`, background: p.c, boxShadow: `${(1 - turnIn) * 80}px 0 120px rgba(0,0,0,0.5)`, opacity: turnOut > 0.85 ? 0 : 1}}>
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.25), transparent 12%, transparent 88%, rgba(0,0,0,0.1))'}} />
        <Abs x={70} y={260} w={940}>
          <T size={40} color={INK} style={{letterSpacing: 6}}>DOSSIER {p.n}/5</T>
          <div style={{height: 6, background: INK, width: 200, marginTop: 14}} />
        </Abs>
        <Abs x={70} y={560}><div style={{width: 240, height: 240, borderRadius: 120, background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={p.ic} size={160} /></div></Abs>
        <Abs x={70} y={880} w={940}><T size={110} color={INK} style={{letterSpacing: -3}}>{p.l}</T></Abs>
        <Abs x={70} y={1300}><TrailMap w={500} h={250} done={p.n} t={t} /></Abs>
      </div>
    </AbsoluteFill>
  );
};

/* ─────────── Introduction ─────────── */
const Intro: React.FC = () => {
  const t = useT();
  const o = 1 - prog(t, 43.0, 43.3);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* triptyque des responsabilités */}
      {t < 17.4 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 17.0, 17.4)}}>
          <Title>{t < 10.1 ? <>Imaginez la <span style={{color: GREEN}}>responsabilité</span>…</> : <>Le monde <span style={{color: GREEN}}>QHSE</span></>}</Title>
          {[['smi/raffinerie.jpg', 'Des milliers de personnes', 1.74, RED, 'usine'], ['', 'Ce qu’on mange', 3.86, YEL, 'assiette'], ['', 'La planète entière', 5.38, GREEN, 'planete']].map(([src, l, at, c, ic], k) => (
            <Abs key={l as string} x={60 + k * 330} y={600} w={300} h={560} style={{borderRadius: 26, overflow: 'hidden', border: `5px solid ${c}`, background: '#1B2A2C', transform: `translateY(${(1 - spring(t, at as number)) * 900}px)`}}>
              {src ? <Img src={PH(src as string)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `radial-gradient(circle, ${c}44, #1B2A2C)`}}><F n={ic as string} size={200} /></div>}
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 14, background: 'rgba(15,27,30,0.85)', textAlign: 'center'}}><T size={28} color={c as string}>{l}</T></div>
            </Abs>
          ))}
          {t > 10.1 && <Row y={1220} gap={10}>{[['Q', BLUE, 10.18], ['H', TEAL, 10.7], ['S', RED, 11.18], ['E', GREEN, 11.74]].map(([l, c, at]) => <div key={l as string} style={{width: 120, height: 120, borderRadius: 20, background: c as string, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, at as number)}) rotate(${(1 - pop(t, at as number)) * 90}deg)`}}><T size={80} color="#fff">{l}</T></div>)}</Row>}
          {t > 13.3 && <Row y={1380} gap={12}><Chip c={GREEN} q={spring(t, 13.3)} size={28}>Immense</Chip><Chip c={ORA} q={spring(t, 14.18)} size={28}>Crucial</Chip><Chip c={LIGHT} q={spring(t, 15.18)} size={28}>Mille spécialisations</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* la carte des enjeux */}
      {t > 17.2 && t < 23.9 && (
        <AbsoluteFill style={{opacity: win(t, 17.2, 23.9, 0.4)}}>
          <Title>Comment <span style={{color: GREEN}}>s'y retrouver</span> ?</Title>
          <Abs x={90} y={620} style={{transform: `scale(${spring(t, 17.4)})`}}><TrailMap w={900} h={620} done={Math.min(5, Math.floor(Math.max(0, t - 19.5) * 2))} t={t} /></Abs>
          {t > 20.7 && <Row y={1300}><Chip c={GREEN} q={spring(t, 20.78)} size={30}>Les grands enjeux du secteur</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* boulet → catapulte */}
      {t > 23.7 && (() => {
        const launch = prog(t, 35.3, 36.6, easeIn);
        const rocket = prog(t, 36.4, 38.2, easeOut);
        return (
          <AbsoluteFill style={{opacity: pop(t, 23.7)}}>
            <Title>{t < 33.7 ? <>Une <span style={{color: RED}}>contrainte</span> ?</> : <>… ou un <span style={{color: GREEN}}>levier</span> ?</>}</Title>
            {t < 34.2 && (
              <AbsoluteFill style={{opacity: 1 - prog(t, 33.8, 34.2)}}>
                <Abs x={160} y={760} style={{transform: `scale(${spring(t, 27.7)})`}}><F n="ouvrier" size={260} /></Abs>
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><path d={`M380 1010 Q520 ${1060 + Math.sin(t * 2) * 10} 650 1030`} stroke="#8A97A0" strokeWidth={12} fill="none" strokeDasharray="22 10" /></svg>
                {t > 29.6 && <Abs x={620} y={940} w={180} h={180} style={{borderRadius: 90, background: 'radial-gradient(circle at 35% 35%, #8A97A0, #2B3438)', transform: `scale(${spring(t, 29.6)})`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={30} color="#fff">{t > 31.3 ? 'COÛT' : 'CHARGE'}</T></Abs>}
              </AbsoluteFill>
            )}
            {t > 33.7 && (
              <AbsoluteFill style={{opacity: pop(t, 33.7)}}>
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                  <rect x={200} y={1240} width={680} height={40} rx={10} fill="#8A5A2B" />
                  <polygon points="540,1240 500,1300 580,1300" fill="#5A3A1A" />
                  <g transform={`rotate(${-20 + launch * 40} 540 1220)`}><rect x={240} y={1210} width={600} height={24} rx={8} fill="#C9A26B" /></g>
                </svg>
                <Abs x={760 + rocket * 60} y={1100 - rocket * 520} style={{transform: `rotate(${-30 + rocket * 30}deg)`}}><F n="fusee" size={170} /></Abs>
                {t > 35.3 && <Row y={1350} gap={12}><Chip c={GREEN} q={spring(t, 35.34)} size={30}>Levier de performance</Chip>{t > 36.9 && <Chip c={YEL} q={spring(t, 36.94)} size={30}>Avantage concurrentiel</Chip>}</Row>}
                {t > 39.5 && <Abs x={0} y={1470} w={1080} style={{textAlign: 'center'}}><Hand size={42} style={{opacity: pop(t, 39.6)}}>la réponse a radicalement changé</Hand></Abs>}
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Dossier 1 : philosophie ─────────── */
const P1: React.FC = () => {
  const t = useT();
  const o = win(t, 45.7, 103.1, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* révolution culturelle + demi-tour */}
      {t < 66.2 && (() => {
        const u = prog(t, 54.2, 56.0, easeInOut);
        const ang = Math.PI * u;
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 65.8, 66.2)}}>
            <Title>{t < 54.1 ? <>Une <span style={{color: ORA}}>révolution culturelle</span></> : <>Un virage à <span style={{color: ORA}}>180°</span></>}</Title>
            {t < 54.2 && <Abs x={340} y={640} style={{transform: `scale(${spring(t, 46.5)}) rotate(${(t - 46.5) * 30}deg)`, opacity: 1 - prog(t, 53.8, 54.2)}}><F n="engrenage" size={400} /></Abs>}
            {t > 51.0 && t < 54.2 && <Abs x={360} y={1080} style={{transform: `scale(${spring(t, 51.06)})`}}><Chip c="#3A4A4C" dark={false} style={{textDecoration: 'line-through'}}>Petit ajustement</Chip></Abs>}
            {t > 54.0 && (
              <AbsoluteFill style={{opacity: pop(t, 54.0)}}>
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                  <path d="M300 1450 L300 900 A240 240 0 0 1 780 900 L780 1450" stroke="#2B3A3C" strokeWidth={150} fill="none" />
                  <path d="M300 1450 L300 900 A240 240 0 0 1 780 900 L780 1450" stroke={YEL} strokeWidth={8} fill="none" strokeDasharray="40 30" />
                </svg>
                <Abs x={(u < 0.01 ? 300 : 540 - 240 * Math.cos(ang)) - 50} y={(u < 0.01 ? 1300 - (t - 54) * 300 : 900 - 240 * Math.sin(ang)) - 50} style={{transform: `rotate(${-90 + u * 180}deg)`}}><F n="voiture" size={100} /></Abs>
                <Abs x={40} y={570}><div style={{opacity: pop(t, 56.98)}}><Chip c={RED} dark={false} size={28}><F n="bouclier" size={40} />Défensif</Chip></div></Abs>
                <Abs x={760} y={570}><div style={{opacity: pop(t, 64.2)}}><Chip c={GREEN} size={28}><F n="pas" size={40} />Proactif</Chip></div></Abs>
                {t > 59.5 && t < 64.2 && <Abs x={60} y={1470}><Hand size={34} color={DIM} style={{opacity: pop(t, 59.6)}}>un fardeau, subi à contrecœur</Hand></Abs>}
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* anticiper + argument de vente */}
      {t > 66.0 && t < 78.4 && (
        <AbsoluteFill style={{opacity: win(t, 66.0, 78.4, 0.35)}}>
          <Title>Les entreprises <span style={{color: ORA}}>agiles</span></Title>
          <Abs x={110} y={600} w={860} h={240} style={{borderRadius: 24, background: 'rgba(255,255,255,0.06)', border: '3px solid rgba(255,255,255,0.15)'}}>
            {['Aujourd’hui', 'Demain', 'Après-demain'].map((l, k) => <div key={l} style={{position: 'absolute', left: 40 + k * 280, top: 40, width: 220, textAlign: 'center'}}><F n="calendrier" size={90} style={{margin: '0 auto', opacity: k === 0 ? 1 : 0.6}} /><T size={26} style={{marginTop: 8}}>{l}</T></div>)}
            {t > 69.8 && <div style={{position: 'absolute', left: 120 + 560 * prog(t, 69.9, 71.0), top: 10}}><F n="pas" size={60} /></div>}
            {t > 70.9 && <div style={{position: 'absolute', right: 30, top: 150, transform: `scale(${spring(t, 71.0)})`}}><Chip c={ORA} size={24}>Normes anticipées</Chip></div>}
          </Abs>
          {t > 72.3 && <Row y={900}><Chip c={GREEN} q={spring(t, 72.3)} size={30}>Contraintes → opportunités</Chip></Row>}
          {t > 74.4 && (
            <Abs x={300} y={1020} w={480} h={380} style={{transform: `scale(${spring(t, 74.5)})`}}>
              <div style={{position: 'absolute', left: 60, top: 40}}><F n="colis" size={260} /></div>
              <div style={{position: 'absolute', left: 230, top: 30, padding: '16px 26px 16px 46px', background: GREEN, clipPath: 'polygon(14% 0, 100% 0, 100% 100%, 14% 100%, 0 50%)', transform: `rotate(${10 + Math.sin(t * 3) * 4}deg)`, transformOrigin: '0% 50%', opacity: pop(t, 76.5)}}><T size={34} color={INK}>Argument de vente</T></div>
            </Abs>
          )}
        </AbsoluteFill>
      )}
      {/* les dominos des raisons + terminal de paiement */}
      {t > 78.2 && (() => {
        const reasons: [string, string, number, string][] = [['Rentabilité', 'argent', 81.14, YEL], ['Efficacité', 'equipe', 87.9, TEAL], ['Ressources rares', 'goutte', 93.54, BLUE], ['Marketing vert', 'feuille', 97.86, GREEN]];
        return (
          <AbsoluteFill style={{opacity: pop(t, 78.2)}}>
            <Title>Pourquoi cette <span style={{color: ORA}}>bascule</span> ?</Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><line x1={60} y1={1080} x2={1020} y2={1080} stroke="rgba(255,255,255,0.25)" strokeWidth={6} /></svg>
            {reasons.map(([l, ic, at, c], k) => {
              const fall = prog(t, at, at + 0.5, easeIn);
              return (
                <div key={l} style={{position: 'absolute', left: 110 + k * 230, top: 680, width: 150, height: 400, transformOrigin: '100% 100%', transform: `rotate(${fall * 72}deg)`}}>
                  <div style={{width: '100%', height: '100%', borderRadius: 18, background: fall > 0.9 ? c : '#F4EEDF', border: `5px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
                    <div style={{width: 30, height: 30, borderRadius: 15, background: INK}} /><div style={{width: 110, height: 5, background: INK}} /><div style={{width: 30, height: 30, borderRadius: 15, background: INK}} />
                  </div>
                </div>
              );
            })}
            {reasons.map(([l, ic, at, c], k) => t > at + 0.5 && <Abs key={l} x={60 + k * 240} y={1110} w={230} style={{textAlign: 'center', transform: `scale(${spring(t, at + 0.5)})`}}><F n={ic} size={90} style={{margin: '0 auto'}} /><T size={28} color={c} style={{marginTop: 6}}>{l}</T></Abs>)}
            {t > 84.6 && t < 87.9 && <Abs x={60} y={1290}><Hand size={34} color={DIM} style={{opacity: pop(t, 84.62)}}>gagnant-gagnant : planète et portefeuille</Hand></Abs>}
            {t > 101.0 && (
              <Abs x={700} y={1270} w={260} h={220} style={{transform: `scale(${spring(t, 101.1)})`}}>
                <div style={{position: 'absolute', left: 40, top: 20, width: 180, height: 200, borderRadius: 20, background: '#2B3A3C', border: '4px solid #8A97A0'}}><div style={{margin: 16, height: 60, borderRadius: 8, background: t > 102.3 ? GREEN : '#0E1416', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={30} color={INK}>{t > 102.3 ? '✓' : ''}</T></div></div>
                <div style={{position: 'absolute', left: 0, top: 30 + Math.min(1, (t - 101.3) * 1.5) * 80, width: 150, height: 92, borderRadius: 12, background: `linear-gradient(135deg, ${GREEN}, ${TEAL})`, transform: 'rotate(-8deg)'}}><div style={{margin: '24px 0 0 14px', width: 34, height: 26, borderRadius: 4, background: YEL}} /></div>
              </Abs>
            )}
            {t > 101.2 && <Abs x={80} y={1320}><Chip c={GREEN} q={spring(t, 101.22)} size={28}>Ils votent avec leur carte</Chip></Abs>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Dossier 2 : systèmes de management ─────────── */
const P2: React.FC = () => {
  const t = useT();
  const o = win(t, 105.7, 159.7, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* rien au hasard */}
      {t < 115.1 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 114.7, 115.1)}}>
          <Title>Rien n'est laissé au <span style={{color: TEAL}}>hasard</span></Title>
          <Abs x={140} y={620} w={800} h={700} style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14}}>
            {Array.from({length: 25}, (_, k) => { const on = prog(t, 109.2 + k * 0.08, 109.6 + k * 0.08); return <div key={k} style={{height: 120, borderRadius: 14, background: on > 0.5 ? TEAL : 'rgba(255,255,255,0.06)', transform: `scale(${0.85 + on * 0.15}) rotate(${(1 - on) * (random(`h${k}`) - 0.5) * 60}deg)`}} />; })}
          </Abs>
          {t > 110.0 && <Row y={1360}><Chip c={TEAL} q={spring(t, 110.06)} size={30}>Des systèmes très méthodiques</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* la grande roue de l'amélioration continue */}
      {t > 114.9 && t < 138.6 && (() => {
        const steps: [string, number][] = [['Politique', 125.06], ['Planifier', 126.18], ['Ressources', 127.26], ['Contrôler', 128.74], ['Corriger', 129.74], ['Analyser', 131.38]];
        const rot = t > 134.3 ? (t - 134.3) * 50 : 0;
        return (
          <AbsoluteFill style={{opacity: win(t, 114.9, 138.6, 0.35)}}>
            <Title>L'<span style={{color: TEAL}}>amélioration continue</span></Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <line x1={540} y1={960} x2={380} y2={1460} stroke="#5A6B6D" strokeWidth={20} /><line x1={540} y1={960} x2={700} y2={1460} stroke="#5A6B6D" strokeWidth={20} />
              <g transform={`rotate(${rot} 540 960)`} opacity={pop(t, 115.2)}>
                <circle cx={540} cy={960} r={330} fill="none" stroke="#8A9A9C" strokeWidth={10} />
                {steps.map((_, k) => { const a = (k / 6) * Math.PI * 2 - Math.PI / 2; return <line key={k} x1={540} y1={960} x2={540 + Math.cos(a) * 330} y2={960 + Math.sin(a) * 330} stroke="#8A9A9C" strokeWidth={5} />; })}
              </g>
              <circle cx={540} cy={960} r={30} fill={TEAL} />
            </svg>
            {steps.map(([l, at], k) => {
              const a = (k / 6) * Math.PI * 2 - Math.PI / 2 + (rot * Math.PI) / 180;
              return t > at && <Abs key={l} x={540 + Math.cos(a) * 330 - 90} y={960 + Math.sin(a) * 330 - 30} w={180} style={{transform: `scale(${spring(t, at)})`}}><div style={{padding: '12px 0', borderRadius: '16px 16px 30px 30px', background: [TEAL, GREEN, YEL, ORA, RED, BLUE][k], textAlign: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.4)'}}><T size={26} color={INK}>{l}</T></div></Abs>;
            })}
            {t > 120.4 && <Abs x={420} y={910} style={{opacity: pop(t, 120.42)}}><T size={34} color="#fff" style={{background: 'rgba(15,27,30,0.85)', padding: '4px 14px', borderRadius: 10}}>ISO 14001</T></Abs>}
            {t > 134.3 && <Row y={1480}><Chip c={TEAL} q={spring(t, 134.3)} size={28}>La roue tourne, encore et encore</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* les icônes d'applications qui fusionnent : le SMI */}
      {t > 138.4 && (() => {
        const merge = prog(t, 151.8, 153.4, easeInOut);
        const apps: [string, string, string, number][] = [['Qualité', BLUE, 'loupe', 148.22], ['Sécurité', RED, 'casque', 148.94], ['Environnement', GREEN, 'planete', 150.18]];
        return (
          <AbsoluteFill style={{opacity: pop(t, 138.4)}}>
            <Title>Le <span style={{color: TEAL}}>système de management intégré</span></Title>
            <Abs x={290} y={600} w={500} h={880} style={{borderRadius: 60, background: '#0B1214', border: '10px solid #2B3A3C', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', transform: `scale(${spring(t, 138.6)})`}}>
              <div style={{position: 'absolute', left: 190, top: 20, width: 100, height: 20, borderRadius: 10, background: '#2B3A3C'}} />
              {apps.map(([l, c, ic, at], k) => {
                const x0 = 50 + k * 140, y0 = 200;
                const x = x0 + (170 - x0) * merge, y = y0 + (300 - y0) * merge;
                return t > at - 0.3 && <div key={l} style={{position: 'absolute', left: x, top: y, width: 130 + merge * 0, textAlign: 'center', opacity: k === 1 || merge < 0.95 ? 1 : 0, transform: `scale(${spring(t, at - 0.3)})`}}><div style={{width: 120, height: 120, margin: '0 auto', borderRadius: 30, background: merge > 0.95 ? `conic-gradient(${BLUE} 0 120deg, ${RED} 120deg 240deg, ${GREEN} 240deg)` : c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={merge > 0.95 ? 'engrenage' : ic} size={80} /></div><T size={20} style={{marginTop: 8}}>{merge > 0.95 ? 'SMI' : l}</T></div>;
              })}
              {t > 153.4 && <div style={{position: 'absolute', left: 30, right: 30, top: 520, padding: 16, borderRadius: 20, background: '#16222A', opacity: pop(t, 153.5)}}><T size={22} color={TEAL}>Notification</T><T size={26} style={{marginTop: 6}}>Silos supprimés : 3 → 1 cadre unique</T></div>}
            </Abs>
            {t > 156.9 && <Row y={1520}><Chip c={TEAL} q={spring(t, 156.9)} size={28}>Vision d'ensemble · cohérence</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Dossier 3 : transparence ─────────── */
const P3: React.FC = () => {
  const t = useT();
  const o = win(t, 162.3, 215.2, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* la foule d'yeux + dire / prouver */}
      {t < 187.1 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 186.7, 187.1)}}>
          <Title>{t < 173.2 ? <>Des entreprises <span style={{color: BLUE}}>scrutées</span></> : <>La <span style={{color: BLUE}}>transparence</span> obligatoire</>}</Title>
          {t < 177.0 && <Abs x={340} y={720} style={{transform: `scale(${spring(t, 162.6)})`, opacity: 1 - prog(t, 176.6, 177.0)}}><F n="batiment" size={400} /></Abs>}
          {t > 164.9 && t < 177.0 && Array.from({length: 12}, (_, k) => { const a = (k / 12) * Math.PI * 2; return <Abs key={k} x={540 + Math.cos(a) * 400 - 40} y={920 + Math.sin(a) * 330 - 40} style={{transform: `scale(${spring(t, 164.9 + k * 0.1)})`, opacity: 1 - prog(t, 176.6, 177.0)}}><F n="yeux" size={80} /></Abs>; })}
          {t > 177.0 && (
            <AbsoluteFill style={{opacity: pop(t, 177.0)}}>
              <Abs x={110} y={620} w={520} h={180} style={{borderRadius: 40, background: '#fff', padding: '30px 34px', boxSizing: 'border-box', transform: `scale(${spring(t, 177.1)})`}}><Hand size={50} color={INK}>« Nous sommes verts ! »</Hand></Abs>
              {t > 181.5 && <Abs x={460} y={700} style={{transform: `rotate(-14deg) scale(${spring(t, 181.54, 9, 18)})`, border: `7px solid ${RED}`, borderRadius: 12, padding: '2px 18px', background: 'rgba(15,27,30,0.9)'}}><T size={48} color={RED}>PREUVE ?</T></Abs>}
              {t > 182.6 && (
                <Abs x={160} y={880} w={760} h={460} style={{borderRadius: 24, background: '#F3F7F6', padding: 30, boxSizing: 'border-box', transform: `scale(${spring(t, 182.66)})`}}>
                  <T size={30} color={INK}>Rapport public</T>
                  <svg width={700} height={260} style={{marginTop: 20}}>{[0.4, 0.6, 0.5, 0.8, 0.7, 0.9].map((v, k) => <rect key={k} x={20 + k * 110} y={240 - 220 * v * prog(t, 183.5 + k * 0.1, 184.2 + k * 0.1)} width={70} height={220 * v * prog(t, 183.5 + k * 0.1, 184.2 + k * 0.1)} rx={8} fill={[GREEN, TEAL, BLUE][k % 3]} />)}</svg>
                  {t > 185.5 && <div style={{position: 'absolute', right: 24, top: 20, transform: `rotate(10deg) scale(${spring(t, 185.5)})`, border: `6px solid ${GREEN}`, borderRadius: 12, padding: '2px 14px'}}><T size={32} color={GREEN}>VÉRIFIÉ</T></div>}
                </Abs>
              )}
            </AbsoluteFill>
          )}
        </AbsoluteFill>
      )}
      {/* CSRD : cercle d'étoiles + piliers ESG + auditeur */}
      {t > 186.9 && t < 205.9 && (
        <AbsoluteFill style={{opacity: win(t, 186.9, 205.9, 0.35)}}>
          <Title>La directive <span style={{color: BLUE}}>CSRD</span></Title>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            {Array.from({length: 12}, (_, k) => { const a = (k / 12) * Math.PI * 2 - Math.PI / 2; const q = pop(t, 189.4 + k * 0.08); const cx = 540 + Math.cos(a) * 170, cy = 790 + Math.sin(a) * 170; return <polygon key={k} points={Array.from({length: 10}, (_, j) => { const r = j % 2 ? 9 : 22; const b = (j / 10) * Math.PI * 2 - Math.PI / 2; return `${cx + Math.cos(b) * r * q},${cy + Math.sin(b) * r * q}`; }).join(' ')} fill={YEL} />; })}
          </svg>
          <Abs x={440} y={750} w={200} style={{textAlign: 'center', opacity: pop(t, 190.5)}}><T size={50} color={LIGHT}>CSRD</T></Abs>
          <Row y={1020} gap={30}>{[['E', 'Environnement', GREEN, 196.06], ['S', 'Social', BLUE, 197.7], ['G', 'Gouvernance', YEL, 198.2]].map(([l, n, c, at]) => <div key={l as string} style={{textAlign: 'center', opacity: pop(t, at as number)}}><div style={{width: 160, height: 260 * pop(t, at as number), borderRadius: 16, background: c as string, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 20, boxSizing: 'border-box', overflow: 'hidden'}}><T size={90} color={INK}>{l}</T></div><T size={26} style={{marginTop: 10}}>{n}</T></div>)}</Row>
          {t > 200.8 && t < 203.4 && <Row y={1400}><Chip c={LIGHT} q={spring(t, 200.82)} size={28}>Normes communes (ESRS)</Chip></Row>}
          {t > 203.4 && <Row y={1400}><Chip c={BLUE} dark={false} q={spring(t, 203.42)} size={28}><F n="loupe" size={40} />Certifié par un auditeur externe</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* double matérialité */}
      {t > 205.7 && (() => {
        const in2 = t > 213.5;
        return (
          <AbsoluteFill style={{opacity: pop(t, 205.7)}}>
            <Title>La <span style={{color: BLUE}}>double matérialité</span></Title>
            <Abs x={90} y={760} style={{transform: `scale(${spring(t, 206.2)})`}}><F n="usine" size={280} /></Abs>
            <Abs x={710} y={760} style={{transform: `scale(${spring(t, 206.4)})`}}><F n="planete" size={280} /></Abs>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              {t > 209.7 && <g opacity={pop(t, 209.74)}><path d={`M390 860 L${390 + 300 * prog(t, 209.8, 210.8)} 860`} stroke={ORA} strokeWidth={16} strokeLinecap="round" /><path d={`M${670 * prog(t, 209.8, 210.8) + 390 * (1 - prog(t, 209.8, 210.8))} 840 l30 20 l-30 20`} stroke={ORA} strokeWidth={10} fill="none" /></g>}
              {in2 && <g opacity={pop(t, 213.54)}><path d={`M690 1000 L${690 - 300 * prog(t, 213.6, 214.6)} 1000`} stroke={BLUE} strokeWidth={16} strokeLinecap="round" /><path d={`M${690 - 300 * prog(t, 213.6, 214.6) + 10} 980 l-30 20 l30 20`} stroke={BLUE} strokeWidth={10} fill="none" /></g>}
            </svg>
            {t > 209.7 && <Abs x={300} y={760}><Chip c={ORA} size={24} q={spring(t, 209.8)}>Entreprise → monde</Chip></Abs>}
            {in2 && <Abs x={350} y={1050}><Chip c={BLUE} dark={false} size={24} q={spring(t, 213.6)}>Monde → entreprise · nouveau !</Chip></Abs>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Dossier 4 : le réacteur qui s'emballe ─────────── */
const P4: React.FC = () => {
  const t = useT();
  const o = win(t, 217.8, 284.9, 0.4);
  if (o <= 0) return null;
  const heat = prog(t, 245.5, 263.2, (x) => x * x);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 229.3 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 228.9, 229.3)}}>
          <Title>Des risques <span style={{color: RED}}>énormes</span></Title>
          <Photo src="smi/raffinerie.jpg" x={140} y={600} w={800} h={620} q={spring(t, 218.0)} />
          {t > 222.3 && <Row y={1260}><div style={{transform: `scale(${spring(t, 222.3)})`, border: `7px solid ${RED}`, borderRadius: 16, padding: '6px 26px', background: 'rgba(15,27,30,0.9)'}}><T size={50} color={RED}>ÉCHEC : NON ENVISAGEABLE</T></div></Row>}
        </AbsoluteFill>
      )}
      {t > 229.1 && t < 265.1 && (() => {
        const fan = Math.max(0, 1 - prog(t, 259.4, 261.8));
        const boom = prog(t, 263.4, 264.4, easeOut);
        const pts: string[] = [];
        for (let k = 0; k <= 40; k++) { const u = k / 40; if (u > prog(t, 245.5, 262.5, (x) => x)) break; pts.push(`${40 + u * 400},${380 - 340 * (Math.exp(u * 3) - 1) / (Math.exp(3) - 1)}`); }
        return (
          <AbsoluteFill style={{opacity: win(t, 229.1, 265.1, 0.35)}}>
            <Title>{t < 240.3 ? <>L'<span style={{color: RED}}>emballement</span> d'un réacteur</> : <>Une <span style={{color: RED}}>spirale infernale</span></>}</Title>
            {/* réacteur */}
            <Abs x={80} y={620} w={460} h={740} style={{transform: `translate(${heat > 0.6 ? Math.sin(t * 50) * 10 * heat : 0}px, 0)`}}>
              <div style={{position: 'absolute', left: 60, top: 60, width: 340, height: 600, borderRadius: '170px 170px 60px 60px', background: `linear-gradient(180deg, #8A9A9C, #5A6B6D)`, border: '8px solid #C9D3D4', overflow: 'hidden'}}>
                <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 360, background: `rgb(${80 + 175 * heat}, ${150 - 110 * heat}, ${200 - 170 * heat})`}} />
                {Array.from({length: 10}, (_, k) => { const p = ((t * (0.5 + heat * 2.5) + k * 0.1) % 1); return <div key={k} style={{position: 'absolute', left: 30 + random(`b${k}`) * 260, bottom: p * 360, width: 20 + heat * 20, height: 20 + heat * 20, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.7)', opacity: 1 - p}} />; })}
              </div>
              {/* thermomètre */}
              <div style={{position: 'absolute', left: 410, top: 120, width: 40, height: 460, borderRadius: 20, background: '#E9EEEF', overflow: 'hidden'}}><div style={{position: 'absolute', left: 8, right: 8, bottom: 8, height: `${15 + 80 * heat}%`, borderRadius: 12, background: RED}} /></div>
              {/* ventilateur de refroidissement */}
              <div style={{position: 'absolute', left: 0, top: 600, width: 130, height: 130, borderRadius: 65, background: '#2B3A3C', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><svg width={110} height={110} viewBox="-50 -50 100 100" style={{transform: `rotate(${t * 900 * fan}deg)`}}>{[0, 1, 2].map((k) => <ellipse key={k} rx={12} ry={40} cy={-22} fill={fan > 0.3 ? BLUE : '#5A6B6D'} transform={`rotate(${k * 120})`} />)}</svg></div>
            </Abs>
            {/* courbe exponentielle */}
            {t > 245.5 && (
              <Abs x={560} y={640} w={480} h={420} style={{borderRadius: 20, background: 'rgba(255,255,255,0.05)', border: '3px solid rgba(255,255,255,0.15)'}}>
                <svg width={480} height={420}><polyline points={pts.join(' ')} fill="none" stroke={RED} strokeWidth={8} strokeLinecap="round" /><text x={20} y={40} fontFamily={sansFont} fontWeight={900} fontSize={26} fill={DIM}>TEMPÉRATURE</text></svg>
              </Abs>
            )}
            {/* boucle de rétroaction */}
            {t > 251.0 && (
              <Abs x={580} y={1090} w={440} h={300} style={{opacity: pop(t, 251.0)}}>
                {[['Chaleur ↑', 0], ['Réaction ↑', 1]].map(([l, k]) => { const a = (k as number) * Math.PI + t * 2; return <div key={l as string} style={{position: 'absolute', left: 220 + Math.cos(a) * 140 - 90, top: 140 + Math.sin(a) * 90 - 26, width: 180, padding: '8px 0', borderRadius: 30, background: k ? ORA : RED, textAlign: 'center'}}><T size={26} color="#fff">{l}</T></div>; })}
              </Abs>
            )}
            {t > 259.4 && t < 263.3 && <Abs x={80} y={1380}><Chip c={BLUE} dark={false} q={spring(t, 259.46)} size={28}>Le refroidissement ne suit plus</Chip></Abs>}
            {boom > 0 && <div style={{position: 'absolute', left: 310 - 900 * boom, top: 990 - 900 * boom, width: 1800 * boom, height: 1800 * boom, borderRadius: '50%', background: `radial-gradient(circle, #FFF6D6, ${ORA} 40%, ${RED} 70%, transparent 72%)`, opacity: 1 - prog(t, 264.4, 265.1)}} />}
          </AbsoluteFill>
        );
      })()}
      {/* la jauge adiabatique */}
      {t > 264.9 && (() => {
        const v = prog(t, 271.5, 280.6, easeInOut) * 115;
        return (
          <AbsoluteFill style={{opacity: pop(t, 264.9)}}>
            <Title>La <span style={{color: RED}}>montée en température adiabatique</span></Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <path d="M240 1180 A300 300 0 0 1 840 1180" fill="none" stroke="#2B3A3C" strokeWidth={60} />
              <path d="M240 1180 A300 300 0 0 1 840 1180" fill="none" stroke={GREEN} strokeWidth={60} pathLength={1} strokeDasharray="0.62 1" />
              <path d="M240 1180 A300 300 0 0 1 840 1180" fill="none" stroke={RED} strokeWidth={60} pathLength={1} strokeDasharray="0 0.62 0.38 1" />
              {(() => { const a = Math.PI - (Math.min(130, v) / 160) * Math.PI; return <line x1={540} y1={1180} x2={540 + Math.cos(a) * 240} y2={1180 - Math.sin(a) * 240} stroke={LIGHT} strokeWidth={12} strokeLinecap="round" />; })()}
              <circle cx={540} cy={1180} r={30} fill={LIGHT} />
              {(() => { const a = Math.PI - (100 / 160) * Math.PI; return <line x1={540 + Math.cos(a) * 250} y1={1180 - Math.sin(a) * 250} x2={540 + Math.cos(a) * 350} y2={1180 - Math.sin(a) * 350} stroke={YEL} strokeWidth={8} />; })()}
            </svg>
            <Abs x={0} y={1230} w={1080} style={{textAlign: 'center'}}><T size={90} color={v > 100 ? RED : LIGHT}>{v > 100 ? '> +100 °C' : `+${Math.round(v)} °C`}</T></Abs>
            {t > 277.0 && <Abs x={640} y={700}><Chip c={YEL} q={spring(t, 277.02)} size={28}>Seuil critique : 100 °C</Chip></Abs>}
            {t > 283.9 && <Row y={1380}><Chip c={RED} dark={false} q={spring(t, 283.94)} size={30}>Situation très grave</Chip></Row>}
            {t > 265.0 && t < 271.5 && <Abs x={0} y={760} w={1080} style={{textAlign: 'center', opacity: pop(t, 268.0)}}><Hand size={40} color={DIM}>si le refroidissement tombait en panne…</Hand></Abs>}
            {t > 279.8 && <Abs x={0} y={1480} w={1080} style={{textAlign: 'center', opacity: pop(t, 280.0)}}><Hand size={30} color={DIM}>seuil cité par la vidéo d'origine</Hand></Abs>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Dossier 5 : la carrière ─────────── */
const P5: React.FC = () => {
  const t = useT();
  const o = win(t, 287.5, 371.8, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* la fiche de paie */}
      {t < 308.9 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 308.5, 308.9)}}>
          <Title>{t < 294.1 ? <>Qui sont ces <span style={{color: GREEN}}>gardiens</span> ?</> : <>La <span style={{color: GREEN}}>reconnaissance financière</span></>}</Title>
          {t < 294.2 && <Img src={PH('ingenieur/ingenieur-detoure.png')} style={{position: 'absolute', left: 300, top: 620, height: 760, transform: `scale(${spring(t, 287.6)})`, transformOrigin: '50% 100%', opacity: 1 - prog(t, 293.8, 294.2)}} />}
          {t > 294.0 && (
            <AbsoluteFill style={{opacity: pop(t, 294.0)}}>
              <Abs x={190} y={640} w={700} h={140} style={{borderRadius: 20, background: '#2B3A3C'}}><div style={{position: 'absolute', left: 60, right: 60, top: 60, height: 20, borderRadius: 10, background: '#0B1214'}} /></Abs>
              <div style={{position: 'absolute', left: 260, top: 700, width: 560, height: 620, overflow: 'hidden'}}>
                <div style={{position: 'absolute', left: 0, top: -620 + 620 * prog(t, 297.2, 299.4, easeOut), width: 560, height: 600, background: '#FBFAF4', borderRadius: 10, padding: 30, boxSizing: 'border-box'}}>
                  <T size={30} color={INK}>BULLETIN DE SALAIRE</T><Hand size={30} color="#5A6B6D">Responsable QHSE · France</Hand>
                  <div style={{height: 3, background: '#DDD', margin: '18px 0'}} />
                  {[0.8, 0.6, 0.7].map((w, k) => <div key={k} style={{marginTop: 14, height: 14, borderRadius: 7, background: '#E6E6DF', width: `${w * 100}%`}} />)}
                  <div style={{marginTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}><T size={28} color={INK}>Médian brut / mois</T><T size={44} color="#0E8A5A" style={{whiteSpace: 'nowrap'}}>≈ {Math.round(5300 * prog(t, 300.0, 302.8)).toLocaleString('fr-FR')} €</T></div>
                </div>
              </div>
              {t > 302.0 && <Abs x={0} y={1340} w={1080} style={{textAlign: 'center', opacity: pop(t, 302.1)}}><Hand size={32} color={DIM}>salaire médian cité par la vidéo d'origine</Hand></Abs>}
              {t > 304.8 && <Row y={1420}><Chip c={GREEN} q={spring(t, 304.86)} size={30}>Une expertise valorisée</Chip></Row>}
            </AbsoluteFill>
          )}
        </AbsoluteFill>
      )}
      {/* le couteau suisse des compétences */}
      {t > 308.7 && t < 330.4 && (() => {
        const blades: [string, number, number, string][] = [['Normes', 313.78, -60, BLUE], ['Analyse des risques', 314.9, -40, RED], ['Chef de projet', 318.02, -20, YEL], ['Audit', 319.74, 0, TEAL], ['Communiquer', 321.58, 20, GREEN], ['Accompagner le changement', 322.7, 40, ORA]];
        return (
          <AbsoluteFill style={{opacity: win(t, 308.7, 330.4, 0.35)}}>
            <Title>{t < 323.4 ? <>Le <span style={{color: GREEN}}>couteau suisse</span> des compétences</> : <>Une règle… que <span style={{color: GREEN}}>tout le monde applique</span></>}</Title>
            {t < 323.6 && (
              <AbsoluteFill style={{opacity: 1 - prog(t, 323.2, 323.6)}}>
                {blades.map(([l, at, ang, c]) => { const open = prog(t, at, at + 0.5, easeOut); const a = -90 + (ang + 90) * open; return t > at - 0.1 && <div key={l} style={{position: 'absolute', left: 380, top: 1160, width: 420, height: 60, transformOrigin: '0% 50%', transform: `rotate(${a}deg)`}}><div style={{width: 420, height: 60, borderRadius: '8px 40px 40px 8px', background: 'linear-gradient(180deg, #E9EEEF, #AEB9BB)', display: 'flex', alignItems: 'center', paddingLeft: 90}}><T size={26} color={INK}>{l}</T></div><div style={{position: 'absolute', right: 10, top: 10, width: 40, height: 40, borderRadius: 20, background: c}} /></div>; })}
                <Abs x={290} y={1100} w={220} h={180} style={{borderRadius: 60, background: RED, boxShadow: '0 20px 40px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{width: 60, height: 60, background: '#fff', clipPath: 'polygon(35% 0, 65% 0, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0 65%, 0 35%, 35% 35%)'}} /></Abs>
                {t > 312.4 && t < 316.2 && <Abs x={110} y={1360}><Chip c={BLUE} dark={false} q={spring(t, 312.42)} size={28}>Techniques</Chip></Abs>}
                {t > 316.2 && <Abs x={110} y={1360}><Chip c={GREEN} q={spring(t, 316.22)} size={28}>… et humaines</Chip></Abs>}
              </AbsoluteFill>
            )}
            {t > 323.4 && (
              <AbsoluteFill style={{opacity: pop(t, 323.4)}}>
                <Abs x={110} y={680} w={380} h={460} style={{borderRadius: 16, background: '#6E5A3A', transform: `rotate(-4deg) scale(${spring(t, 323.5)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'sepia(0.5)'}}><T size={44} color="#E9DCC0" style={{textAlign: 'center'}}>RÈGLES</T>{Array.from({length: 8}, (_, k) => <div key={k} style={{position: 'absolute', left: random(`d${k}`) * 360, top: random(`e${k}`) * 440, width: 6, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.4)'}} />)}</Abs>
                {t > 326.1 && <Abs x={400} y={700} style={{transform: `scale(${spring(t, 326.18)})`}}><T size={60} color={RED}>?</T></Abs>}
                {t > 327.0 && <Photo src="induction/accueil-groupe.jpg" x={520} y={720} w={480} h={420} q={spring(t, 327.02)} />}
                {t > 327.0 && <Row y={1220} gap={12}>{[['Convaincre', 327.02], ['Former', 328.42], ['Embarquer', 328.9]].map(([l, at]) => <Chip key={l as string} c={GREEN} q={spring(t, at as number)} size={30}>{l}</Chip>)}</Row>}
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* la ruche des secteurs */}
      {t > 330.2 && t < 350.9 && (() => {
        const hx: [string, string, number, string][] = [['Chimie', 'smi/raffinerie.jpg', 336.14, ''], ['Agroalimentaire', '', 336.8, 'assiette'], ['BTP', 'epiepc/chantier.jpg', 338.22, ''], ['Santé', '', 339.42, 'hopital'], ['Transport', '', 340.14, 'camion'], ['Énergies renouvelables', '', 343.82, 'soleil']];
        const pos = [[540, 760], [330, 880], [750, 880], [330, 1120], [750, 1120], [540, 1240]];
        return (
          <AbsoluteFill style={{opacity: win(t, 330.2, 350.9, 0.35)}}>
            <Title>Des besoins <span style={{color: GREEN}}>partout</span></Title>
            {hx.map(([l, src, at, ic], k) => t > at - 0.1 && (
              <div key={l} style={{position: 'absolute', left: pos[k][0] - 125, top: pos[k][1] - 125, width: 250, height: 250, clipPath: 'polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%)', background: k === 5 ? `linear-gradient(135deg, ${YEL}, ${GREEN})` : '#1B2A2C', transform: `scale(${spring(t, at)})`}}>
                {src ? <Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={ic} size={120} /></div>}
                <div style={{position: 'absolute', left: 0, right: 0, bottom: 34, textAlign: 'center'}}><T size={l.length > 14 ? 18 : 24} style={{display: 'inline-block', background: 'rgba(15,27,30,0.85)', padding: '2px 10px', borderRadius: 8}}>{l}</T></div>
              </div>
            ))}
            {t > 343.8 && <Abs x={680} y={1300}><Chip c={YEL} q={spring(t, 343.9)} size={26}>Le secteur qui explose</Chip></Abs>}
            {t > 348.1 && <Row y={1440}><Chip c={GREEN} q={spring(t, 348.14)} size={30}>Un vivier d'opportunités</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* conclusion : ondes d'impact */}
      {t > 350.7 && (() => {
        const drop = prog(t, 368.6, 369.4, easeIn);
        return (
          <AbsoluteFill style={{opacity: pop(t, 350.7)}}>
            <Title>{t < 361.8 ? <>Un <span style={{color: GREEN}}>domaine d'avenir</span></> : t < 363.9 ? <>Pas juste un <span style={{color: DIM}}>métier</span>…</> : <>… une <span style={{color: GREEN}}>mission</span></>}</Title>
            {t < 363.9 && <Row y={640} gap={18}>{[['Sécurité d’un procédé', 'usine', 351.62, RED], ['Décarbonation', 'feuille', 353.54, GREEN], ['Qualité dans l’assiette', 'assiette', 355.46, YEL]].map(([l, ic, at, c]) => <div key={l as string} style={{width: 280, height: 300, borderRadius: 26, border: `5px solid ${c}`, background: 'rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, at as number)})`}}><F n={ic as string} size={130} /><T size={26} style={{textAlign: 'center', marginTop: 12, padding: '0 10px'}}>{l}</T></div>)}</Row>}
            {t > 358.9 && t < 363.9 && <Row y={1040} gap={12}><Chip c={GREEN} q={spring(t, 358.98)} size={30}>D'avenir</Chip><Chip c={YEL} q={spring(t, 361.18)} size={30}>Qui a du sens</Chip></Row>}
            {t > 363.8 && (
              <AbsoluteFill style={{opacity: pop(t, 363.8)}}>
                <Abs x={90} y={620} w={900} h={760} style={{borderRadius: 40, overflow: 'hidden', background: 'radial-gradient(circle at 50% 55%, #1E5E6A, #0B2A30)'}}>
                  {drop < 1 && <div style={{position: 'absolute', left: 430, top: 60 + drop * 360, width: 40, height: 56, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: '#9FE3F0', opacity: t > 368.5 ? 1 : 0}} />}
                  {t > 369.4 && [0, 1, 2, 3].map((k) => { const p = ((t - 369.4) * 0.5 + k * 0.25) % 1; return <div key={k} style={{position: 'absolute', left: 450 - p * 440, top: 450 - p * 300, width: p * 880, height: p * 600, borderRadius: '50%', border: `${8 - p * 6}px solid rgba(159,227,240,${1 - p})`}} />; })}
                  {t > 369.4 && <div style={{position: 'absolute', left: 0, right: 0, top: 410, textAlign: 'center'}}><Hand size={60} color={LIGHT}>quel impact voulez-vous avoir ?</Hand></div>}
                  {t < 368.5 && <div style={{position: 'absolute', left: 0, right: 0, top: 330, textAlign: 'center'}}><F n="medaille" size={200} style={{margin: '0 auto', transform: `scale(${spring(t, 363.9)})`}} /></div>}
                </Abs>
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
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
      {t > 2.5 && t < 43.3 && <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', opacity: pop(t, 2.5) * (1 - prog(t, 42.9, 43.3))}}><div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '8px 24px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${GREEN}`}}><F n="boussole" size={40} /><T size={34}>Se spécialiser en <span style={{color: GREEN}}>QHSE</span></T></div></div>}
      {p && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 232, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: pop(t, p.at + WIPE - 0.3) * (1 - prog(t, p.end - 0.3, p.end))}}>
          <TrailMap w={120} h={60} done={p.n} t={t} />
          <div style={{padding: '8px 22px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${p.c}`}}><T size={32}>{p.l}</T></div>
        </div>
      )}
    </AbsoluteFill>
  );
};

const Bg: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{background: BG}}>
      {/* courbes de niveau, comme sur une carte */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: 0.07}}>
        {Array.from({length: 9}, (_, k) => <ellipse key={k} cx={760 + Math.sin(t * 0.1) * 40} cy={500} rx={120 + k * 110} ry={80 + k * 90} fill="none" stroke={LIGHT} strokeWidth={3} />)}
        {Array.from({length: 7}, (_, k) => <ellipse key={`b${k}`} cx={260} cy={1500 + Math.cos(t * 0.1) * 40} rx={100 + k * 100} ry={70 + k * 80} fill="none" stroke={LIGHT} strokeWidth={3} />)}
      </svg>
    </AbsoluteFill>
  );
};

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...[1.74, 3.86, 5.38].map((at) => ({at, s: 'sfx/whoosh', v: 0.25})), ...[10.18, 10.7, 11.18, 11.74].map((at) => ({at, s: 'sfx/thud', v: 0.3})), ...[13.3, 14.18, 15.18].map((at) => ({at, s: 'sfx/pop', v: 0.25})),
  {at: 17.4, s: 'page', v: 0.45}, ...Array.from({length: 5}, (_, k) => ({at: 19.5 + k * 0.5, s: 'tick', v: 0.25})), {at: 20.78, s: 'sfx/ding', v: 0.25},
  {at: 23.8, s: 'sfx/whoosh', v: 0.3}, {at: 29.6, s: 'sfx/thud', v: 0.4}, {at: 31.3, s: 'sfx/thud', v: 0.3}, {at: 34.0, s: 'sfx/whoosh', v: 0.3}, {at: 35.3, s: 'sfx/swish', v: 0.4}, {at: 36.4, s: 'sfx/rise', v: 0.35}, {at: 36.94, s: 'sfx/pop', v: 0.28},
  ...PT.flatMap((p) => [{at: p.at, s: 'page', v: 0.55}, {at: p.at + 0.1, s: 'soft-whoosh', v: 0.4, dur: 1.2}, {at: p.at + 0.7, s: 'bass-hit', v: 0.3}, {at: p.at + WIPE - 0.6, s: 'page', v: 0.45}]),
  {at: 46.5, s: 'sfx/rise', v: 0.2}, {at: 51.06, s: 'sfx/thud', v: 0.25}, {at: 54.2, s: 'sfx/swish', v: 0.4}, {at: 56.98, s: 'sfx/pop', v: 0.25}, {at: 64.2, s: 'sfx/pop', v: 0.28},
  {at: 69.9, s: 'sfx/swish', v: 0.25}, {at: 71.0, s: 'sfx/ding', v: 0.25}, {at: 72.3, s: 'sfx/pop', v: 0.25}, {at: 74.5, s: 'sfx/pop', v: 0.3}, {at: 76.5, s: 'validation', v: 0.3},
  ...[81.14, 87.9, 93.54, 97.86].flatMap((at) => [{at, s: 'sfx/click', v: 0.35}, {at: at + 0.5, s: 'sfx/thud', v: 0.4}]), {at: 101.3, s: 'sfx/swish', v: 0.3}, {at: 102.3, s: 'validation', v: 0.32},
  ...Array.from({length: 10}, (_, k) => ({at: 109.2 + k * 0.2, s: 'tick', v: 0.2})), {at: 115.2, s: 'sfx/whoosh', v: 0.3}, {at: 120.42, s: 'tampon', v: 0.35}, ...[125.06, 126.18, 127.26, 128.74, 129.74, 131.38].map((at) => ({at, s: 'sfx/pop', v: 0.28})), {at: 134.3, s: 'sfx/rise', v: 0.25},
  {at: 138.6, s: 'sfx/whoosh', v: 0.3}, ...[147.9, 148.6, 149.9].map((at) => ({at, s: 'notification', v: 0.25})), {at: 151.8, s: 'sfx/swish', v: 0.35}, {at: 153.4, s: 'validation', v: 0.32}, {at: 153.5, s: 'notification', v: 0.3},
  {at: 162.6, s: 'sfx/pop', v: 0.25}, ...Array.from({length: 12}, (_, k) => ({at: 164.9 + k * 0.1, s: 'tick', v: 0.18})), {at: 177.1, s: 'sfx/pop', v: 0.3}, {at: 181.54, s: 'tampon', v: 0.5}, {at: 182.66, s: 'page', v: 0.4}, {at: 185.5, s: 'tampon', v: 0.45},
  ...Array.from({length: 12}, (_, k) => ({at: 189.4 + k * 0.08, s: 'sfx/click', v: 0.15})), ...[196.06, 197.7, 198.2].map((at) => ({at, s: 'sfx/rise', v: 0.15})), {at: 203.42, s: 'tampon', v: 0.4},
  {at: 206.2, s: 'sfx/pop', v: 0.28}, {at: 209.8, s: 'sfx/swish', v: 0.35}, {at: 213.6, s: 'sfx/swish', v: 0.35},
  {at: 218.0, s: 'sfx/whoosh', v: 0.3}, {at: 222.3, s: 'deep-hit', v: 0.45}, {at: 229.4, s: 'sfx/whoosh', v: 0.3}, {at: 236.3, s: 'tension', v: 0.2, dur: 4}, {at: 245.5, s: 'sfx/rise', v: 0.25}, {at: 251.0, s: 'tension', v: 0.2, dur: 8}, {at: 259.4, s: 'alarme', v: 0.2, dur: 3}, {at: 263.4, s: 'deep-hit', v: 0.6}, {at: 263.45, s: 'bass-hit', v: 0.5},
  {at: 265.0, s: 'sfx/whoosh', v: 0.25}, {at: 271.5, s: 'sfx/rise', v: 0.3}, {at: 277.02, s: 'sfx/ding', v: 0.3}, {at: 280.6, s: 'alarme', v: 0.18, dur: 1.4}, {at: 283.94, s: 'tampon', v: 0.45},
  {at: 287.6, s: 'sfx/pop', v: 0.3}, {at: 294.1, s: 'sfx/whoosh', v: 0.3}, {at: 297.2, s: 'page', v: 0.45}, ...Array.from({length: 10}, (_, k) => ({at: 300.0 + k * 0.28, s: 'tick', v: 0.2})), {at: 302.9, s: 'sfx/bell', v: 0.35}, {at: 304.86, s: 'validation', v: 0.28},
  ...[313.78, 314.9, 318.02, 319.74, 321.58, 322.7].map((at) => ({at, s: 'sfx/swish', v: 0.3})), {at: 323.5, s: 'sfx/thud', v: 0.3}, {at: 326.18, s: 'sfx/pop', v: 0.25}, ...[327.02, 328.42, 328.9].map((at) => ({at, s: 'sfx/pop', v: 0.28})),
  ...[336.14, 336.8, 338.22, 339.42, 340.14, 343.82].map((at) => ({at, s: 'sfx/pop', v: 0.25})), {at: 343.9, s: 'sfx/rise', v: 0.25}, {at: 348.14, s: 'validation', v: 0.3},
  ...[351.62, 353.54, 355.46].map((at) => ({at, s: 'sfx/pop', v: 0.28})), {at: 358.98, s: 'sfx/ding', v: 0.28}, {at: 361.18, s: 'sfx/ding', v: 0.28}, {at: 363.9, s: 'sfx/bell', v: 0.35}, {at: 369.4, s: 'soft-whoosh', v: 0.4, dur: 2},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Specialiser: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <Bg />
    <Gate from={0} to={43.4}><Intro /></Gate>
    <Gate from={45.6} to={103.3}><P1 /></Gate>
    <Gate from={105.6} to={159.9}><P2 /></Gate>
    <Gate from={162.2} to={215.4}><P3 /></Gate>
    <Gate from={217.7} to={285.1}><P4 /></Gate>
    <Gate from={287.4} to={OUTRO_AT}><P5 /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><PageTurn p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.3} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-specialiser-qhse-origine.m4a')} trimAfter={s(371.8)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

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
 * « Le Toolbox Meeting » (6 min 05) — voix d'origine, sous-titres recalés mot à mot, photos réelles et chefs
 * détourés. Fil rouge inédit : un casque de chantier qui gagne un autocollant à chaque partie, et des transitions en
 * mètre ruban qui se déroule puis s'enroule. Autres techniques nouvelles : cartes qu'on balaie à gauche / à droite,
 * caméscope 1989 (grain VHS, REC), feuille d'émargement signée à la main, cloche « qui cloche », parapluie de papier,
 * coquille vide qui se fend, réunion de fantômes, bouclier qui se retourne vers l'entreprise, barre de vie à cinq
 * cœurs (game over), GPS « à côté de la plaque », neige télé du bruit de fond, messagerie « vu » sans réponse, curseur
 * de voix coupé, panneau sens unique → double sens, écran de projection qui s'enroule, tableau dont la colonne
 * périmée se froisse, planning annuel à pastilles, marmite aux trois ingrédients, barre de lecture des 15 minutes,
 * affiche-miroir réelle, photo qui apparaît dans le bac du révélateur, vague de statistiques, bulle cadenassée par
 * les quatre silences, marionnette dont on coupe les fils, coucher de soleil et porte qui s'ouvre sur la maison.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 365.4;
export const TOOLBOX_FRAMES = s(OUTRO_AT + 3.8);
const BG = '#0F1C2E';
const INK = '#14202F';
const LIGHT = '#F6F9FF';
const DIM = 'rgba(246,249,255,0.65)';
const YEL = '#FFC72C';
const ORA = '#FF7A1A';
const GREEN = '#2ECC71';
const RED = '#E74C3C';
const SKY = '#4DA3FF';
const VIO = '#A68BFF';
const PAPER = '#FBF6EA';
const PH = (p: string) => staticFile(p);

type Pt = {n: number; l: string; at: number; end: number; c: string; ic: string};
const PT: Pt[] = [
  {n: 1, l: 'Une formalité vide', at: 11.9, end: 69.7, c: SKY, ic: 'clipboard'},
  {n: 2, l: 'Les 5 défauts fatals', at: 69.8, end: 121.4, c: RED, ic: 'danger'},
  {n: 3, l: 'Le véritable dialogue', at: 121.5, end: 181.4, c: GREEN, ic: 'causerie'},
  {n: 4, l: 'La méthode en pratique', at: 181.5, end: 259.0, c: ORA, ic: 'boite-outils'},
  {n: 5, l: 'Révélateur de culture', at: 259.1, end: 365.2, c: VIO, ic: 'loupe'},
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
const Chip: React.FC<{children: React.ReactNode; c?: string; q?: number; size?: number; dark?: boolean; style?: React.CSSProperties}> = ({children, c = YEL, q = 1, size = 34, dark = true, style}) => (
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
/** Le casque de chantier et ses autocollants (un par partie franchie). */
const Helmet: React.FC<{w: number; stickers: number; t: number}> = ({w, stickers, t}) => (
  <svg width={w} height={w * 0.7} viewBox="0 0 200 140" style={{overflow: 'visible'}}>
    <path d="M20 110 Q20 30 100 24 Q180 30 180 110 Z" fill={YEL} stroke="#C99A12" strokeWidth={4} />
    <path d="M96 24 Q90 60 92 110 L108 110 Q110 60 104 24 Z" fill="#F2B700" />
    <rect x={6} y={104} width={188} height={18} rx={9} fill="#E5A800" />
    {PT.map((p, k) => k < stickers && (
      <g key={k} transform={`translate(${[48, 140, 66, 128, 100][k]} ${[62, 64, 92, 92, 52][k]}) rotate(${(k % 2 ? 12 : -12) + Math.sin(t * 2 + k) * 2})`}>
        <circle r={13} fill={p.c} stroke="#fff" strokeWidth={3} />
        <text y={5} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={14} fill="#fff">{p.n}</text>
      </g>
    ))}
  </svg>
);

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: BG, opacity: 1 - out}}>
      <Img src={PH('induction/briefing-atelier.jpg')} style={{position: 'absolute', left: -420, top: 0, width: 1920, height: 1120, objectFit: 'cover', filter: 'saturate(0.85) brightness(0.8)'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${BG}BB 0%, ${BG}22 26%, ${BG}22 40%, ${BG} 60%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      {/* mètre ruban déroulé sous le titre */}
      <Abs x={-20} y={1010} w={1120} h={120} style={{background: YEL, transform: 'rotate(-3deg)', boxShadow: '0 16px 30px rgba(0,0,0,0.45)'}}>
        {Array.from({length: 56}, (_, k) => <div key={k} style={{position: 'absolute', left: k * 20, top: 0, width: 3, height: k % 5 ? 26 : 46, background: INK}} />)}
        {Array.from({length: 12}, (_, k) => <div key={`n${k}`} style={{position: 'absolute', left: k * 100 + 6, top: 50, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>{k * 10}</div>)}
      </Abs>
      <Abs x={60} y={1160} w={960} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: ORA, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 32, letterSpacing: 3}}>RÉUNION SÉCURITÉ TERRAIN</div>
        <T size={128} style={{marginTop: 18, textTransform: 'uppercase', letterSpacing: -3}}>Le Toolbox</T>
        <T size={150} color={YEL} style={{textTransform: 'uppercase', letterSpacing: -4}}>Meeting</T>
        <Hand size={50} color={DIM} style={{marginTop: 12}}>formalité vide ou outil vital ?</Hand>
      </Abs>
      <Abs x={760} y={620} style={{transform: 'rotate(10deg)'}}><Helmet w={260} stickers={5} t={t} /></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : le mètre ruban ─────────── */
const TapeWipe: React.FC<{p: Pt}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const ext = prog(t, a, a + 0.7, easeOut);
  const ret = prog(t, b - 0.6, b, easeIn);
  const len = 1200 * ext * (1 - ret);
  const dark = prog(t, a, a + 0.3) * (1 - prog(t, b - 0.3, b));
  return (
    <AbsoluteFill style={{zIndex: 55, pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: `rgba(15,28,46,${0.94 * dark})`}} />
      {/* boîtier */}
      <Abs x={-40 + (1 - dark) * -260} y={760} w={300} h={300} style={{borderRadius: 60, background: `linear-gradient(135deg, ${ORA}, #C2520A)`, boxShadow: '0 20px 40px rgba(0,0,0,0.5)', zIndex: 2}}>
        <div style={{position: 'absolute', left: 70, top: 70, width: 160, height: 160, borderRadius: 80, background: '#2B3A4C', border: '10px solid #1C2836', transform: `rotate(${len * 0.6}deg)`}}><div style={{position: 'absolute', left: 64, top: 10, width: 12, height: 50, borderRadius: 6, background: '#5A6B7C'}} /></div>
      </Abs>
      {/* ruban */}
      <div style={{position: 'absolute', left: 220, top: 820, width: len, height: 180, overflow: 'hidden', zIndex: 1}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 1200, height: 180, background: YEL, boxShadow: 'inset 0 -6px 0 rgba(0,0,0,0.15)'}}>
          {Array.from({length: 60}, (_, k) => <div key={k} style={{position: 'absolute', left: k * 20, top: 0, width: 3, height: k % 5 ? 30 : 54, background: INK}} />)}
          <div style={{position: 'absolute', left: 24, top: 70, display: 'flex', alignItems: 'center', gap: 18}}>
            <div style={{width: 80, height: 80, borderRadius: 40, background: INK, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={46} color={YEL}>{p.n}</T></div>
            <T size={p.l.length > 18 ? 56 : 66} color={INK} style={{whiteSpace: 'nowrap'}}>{p.l}</T>
          </div>
        </div>
        <div style={{position: 'absolute', right: 0, top: 0, width: 24, height: 180, background: '#B8B8B8'}} />
      </div>
      <Abs x={330} y={1060} style={{opacity: dark * pop(t, a + 0.6)}}><Helmet w={420} stickers={p.n} t={t} /></Abs>
      {t > a + 0.8 && t < b - 0.4 && <Abs x={0} y={600} w={1080} style={{textAlign: 'center', opacity: pop(t, a + 0.8)}}><T size={34} color={p.c} style={{letterSpacing: 8}}>PARTIE {p.n}/5</T></Abs>}
    </AbsoluteFill>
  );
};

/* ─────────── Accroche : les cartes balayées ─────────── */
const Hook: React.FC = () => {
  const t = useT();
  const o = 1 - prog(t, 11.6, 11.9);
  if (o <= 0) return null;
  const swipeA = prog(t, 3.9, 4.5, easeIn);
  const back = prog(t, 8.0, 8.8, easeInOut);
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Title>{t < 8.1 ? <>Perte de temps ou <span style={{color: GREEN}}>outil vital</span> ?</> : <>Alors, <span style={{color: YEL}}>qui a raison</span> ?</>}</Title>
      {/* carte B (dessous) */}
      {t > 4.0 && <Abs x={190 + back * 230} y={620} w={600} h={760} style={{borderRadius: 34, overflow: 'hidden', border: `8px solid ${GREEN}`, boxShadow: '0 30px 60px rgba(0,0,0,0.5)', transform: `scale(${(0.92 + 0.08 * pop(t, 4.6)) * (1 - back * 0.25)}) rotate(${back * 6}deg)`}}>
        <Img src={PH('induction/briefing-atelier.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 24, background: 'rgba(20,32,47,0.85)'}}><T size={44} color={GREEN}>Outil de prévention vital</T></div>
      </Abs>}
      {/* carte A (dessus) balayée à gauche puis revient */}
      <Abs x={190 - swipeA * 900 * (1 - back) - back * 230} y={620} w={600} h={760} style={{borderRadius: 34, overflow: 'hidden', border: `8px solid ${RED}`, boxShadow: '0 30px 60px rgba(0,0,0,0.5)', transform: `rotate(${-swipeA * 25 * (1 - back) - back * 6}deg) scale(${spring(t, 1.0) * (1 - back * 0.25)})`}}>
        <Img src={PH('induction/reunion-audit.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.5)'}} />
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 24, background: 'rgba(20,32,47,0.85)'}}><T size={44} color={RED}>Perte de temps monumentale</T></div>
        {t > 3.6 && t < 4.5 && <div style={{position: 'absolute', left: 30, top: 30, border: `6px solid ${RED}`, borderRadius: 12, padding: '4px 16px', transform: 'rotate(-14deg)'}}><T size={44} color={RED}>NON</T></div>}
      </Abs>
      {t > 8.1 && <Abs x={490} y={940} style={{transform: `scale(${spring(t, 8.2)})`}}><div style={{width: 110, height: 110, borderRadius: 55, background: YEL, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 40px ${YEL}`}}><T size={80} color={INK}>?</T></div></Abs>}
      {t > 9.4 && <Row y={1440}><Chip c={YEL} q={spring(t, 9.4)} size={30}><F n="loupe" size={42} />On décortique ensemble</Chip></Row>}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 1 : une formalité vide ─────────── */
const P1: React.FC = () => {
  const t = useT();
  const o = win(t, 14.3, 69.7, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* caméscope 1989 + feuille d'émargement + cloche */}
      {t < 28.8 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 28.4, 28.8)}}>
          <Title>Une scène <span style={{color: SKY}}>familière</span></Title>
          <Abs x={70} y={580} w={940} h={560} style={{borderRadius: 24, overflow: 'hidden', border: '6px solid #222', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', opacity: pop(t, 14.5)}}>
            <Img src={PH('smi/raffinerie.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.75) contrast(1.1) saturate(0.8)', transform: `scale(${1.08 + (t - 14) * 0.004}) translateX(${Math.sin(t * 40) * 1.5}px)`}} />
            <div style={{position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 2px, transparent 2px 5px)'}} />
            <div style={{position: 'absolute', left: 0, right: 0, top: ((t * 220) % 600) - 40, height: 30, background: 'rgba(255,255,255,0.10)', filter: 'blur(4px)'}} />
            <div style={{position: 'absolute', left: 26, top: 22, display: 'flex', alignItems: 'center', gap: 10, opacity: Math.floor(t * 2) % 2 ? 1 : 0.3}}><div style={{width: 22, height: 22, borderRadius: 11, background: RED}} /><div style={{fontFamily: 'monospace', fontWeight: 700, fontSize: 32, color: '#fff'}}>REC</div></div>
            {t > 17.0 && <div style={{position: 'absolute', right: 26, bottom: 22, fontFamily: 'monospace', fontWeight: 700, fontSize: 40, color: '#FFE9A0', textShadow: '2px 2px 0 #000'}}>1989 · SITE PÉTROCHIMIQUE</div>}
          </Abs>
          {t > 22.0 && (
            <Abs x={110} y={1170} w={520} h={300} style={{background: PAPER, borderRadius: 10, padding: 20, boxSizing: 'border-box', transform: `rotate(-3deg) scale(${spring(t, 22.1)})`, boxShadow: '0 20px 40px rgba(0,0,0,0.45)'}}>
              <T size={24} color={INK}>FEUILLE DE PRÉSENCE</T>
              {[0, 1, 2, 3].map((k) => <div key={k} style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, borderBottom: '2px solid #DDD', height: 40}}><svg width={300} height={40}><path d={`M10 28 C 40 ${8 + k * 3} 60 34 90 18 S 140 30 170 ${12 + k * 4} S 230 28 260 20`} stroke="#1E3A8A" strokeWidth={3} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, 23.2 + k * 0.45, 23.6 + k * 0.45)} /></svg></div>)}
            </Abs>
          )}
          {t > 24.7 && t < 26.3 && <Abs x={680} y={1240}><Chip c={LIGHT} q={spring(t, 24.74)} size={26}>Et hop, au boulot !</Chip></Abs>}
          {t > 26.3 && <Abs x={720} y={1180} style={{transform: `rotate(${Math.sin((t - 26.3) * 18) * 18 * Math.exp(-(t - 26.3) * 1.2)}deg) scale(${spring(t, 26.34)})`, transformOrigin: '50% 0'}}><F n="cloche" size={200} /></Abs>}
          {t > 27.8 && <Abs x={700} y={1400}><T size={34} color={YEL} style={{opacity: pop(t, 27.86)}}>Ça cloche…</T></Abs>}
        </AbsoluteFill>
      )}
      {/* le parapluie de papier + jauge de prévention à zéro + coquille vide */}
      {t > 28.6 && t < 46.6 && (() => {
        const umb = prog(t, 30.5, 32.4, easeInOut);
        return (
          <AbsoluteFill style={{opacity: win(t, 28.6, 46.6, 0.35)}}>
            <Title>{t < 34.9 ? <>Une trace pour <span style={{color: SKY}}>se couvrir</span></> : t < 44.8 ? <>Un problème <span style={{color: SKY}}>courant</span></> : <>Une <span style={{color: SKY}}>coquille vide</span></>}</Title>
            {t < 35.1 && (
              <AbsoluteFill style={{opacity: 1 - prog(t, 34.7, 35.1)}}>
                {Array.from({length: 9}, (_, k) => { const a = Math.PI + (k / 8) * Math.PI; const fx = 540 + Math.cos(a) * 300, fy = 980 + Math.sin(a) * 200; const sx = 100 + random(`px${k}`) * 880, sy = 1500 + random(`py${k}`) * 200; return <div key={k} style={{position: 'absolute', left: sx + (fx - sx) * umb - 70, top: sy + (fy - sy) * umb - 45, width: 140, height: 90, background: PAPER, border: '2px solid #D8CFB6', transform: `rotate(${(a * 180) / Math.PI + 90 - 90 + (1 - umb) * k * 40}deg)`, boxShadow: '0 6px 10px rgba(0,0,0,0.3)'}}><div style={{margin: '16px 12px', height: 6, background: '#D8CFB6'}} /><div style={{margin: '0 12px', height: 6, width: '60%', background: '#D8CFB6'}} /></div>; })}
                <Abs x={440} y={1020} style={{transform: `scale(${spring(t, 29.0)})`}}><F n="batiment" size={200} /></Abs>
                {t > 31.5 && <Abs x={110} y={600}><Chip c={SKY} dark={false} q={spring(t, 31.54)} size={28}>Du papier, une trace</Chip></Abs>}
                {t > 33.0 && (
                  <Abs x={640} y={560} w={340} h={220} style={{transform: `scale(${spring(t, 33.06)})`}}>
                    <svg width={340} height={220}><path d="M30 190 A140 140 0 0 1 310 190" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={26} /><line x1={170} y1={190} x2={50} y2={190} stroke={RED} strokeWidth={8} strokeLinecap="round" /><circle cx={170} cy={190} r={14} fill={RED} /></svg>
                    <T size={30} color={RED} style={{position: 'absolute', top: 150, left: 210}}>0</T><T size={24} style={{position: 'absolute', top: 0, width: 340, textAlign: 'center'}}>PRÉVENTION</T>
                  </Abs>
                )}
              </AbsoluteFill>
            )}
            {t > 34.9 && (
              <AbsoluteFill style={{opacity: pop(t, 34.9)}}>
                {/* polaroïd sépia de 1989 : pas qu'une vieille anecdote */}
                {t < 38.5 && (
                  <Abs x={290} y={700} w={500} h={600} style={{background: '#fff', borderRadius: 8, padding: '24px 24px 0', boxSizing: 'border-box', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', transform: `rotate(${-6 + prog(t, 37.9, 38.5) * -20}deg) translateY(${prog(t, 37.9, 38.5, easeIn) * -900}px) scale(${spring(t, 35.0)})`}}>
                    <Img src={PH('smi/raffinerie.jpg')} style={{width: 452, height: 440, objectFit: 'cover', filter: 'sepia(0.85) contrast(1.05)'}} />
                    <Hand size={52} color={INK} style={{textAlign: 'center', marginTop: 20}}>1989</Hand>
                  </Abs>
                )}
                {t > 36.7 && t < 38.5 && <Row y={1360}><Chip c={LIGHT} q={spring(t, 36.7)} size={28}>Pas qu'une vieille anecdote</Chip></Row>}
                <Row y={600} gap={10}>{Array.from({length: 7}, (_, k) => <div key={k} style={{transform: `translateY(${(1 - spring(t, 38.6 + k * 0.08)) * -200}px)`, opacity: t > 38.5 ? 1 - prog(t, 43.3, 43.8) : 0}}><svg width={70} height={90} viewBox="0 0 70 90"><path d="M35 88 C20 60 4 46 4 30 A31 31 0 0 1 66 30 C66 46 50 60 35 88 Z" fill={RED} /><circle cx={35} cy={30} r={12} fill="#fff" /></svg></div>)}</Row>
                {t > 39.6 && t < 43.8 && <Abs x={0} y={710} w={1080} style={{textAlign: 'center', opacity: pop(t, 39.66) * (1 - prog(t, 43.3, 43.8))}}><Hand size={40} color={DIM}>un problème qu'on retrouve partout</Hand></Abs>}
                {/* l'outil puissant… */}
                {t > 40.3 && t < 44.2 && (() => {
                  const q = spring(t, 40.3) * (1 - prog(t, 43.5, 44.1, easeIn));
                  const glow = 0.35 + 0.65 * pop(t, 42.74, 0.3);
                  return (
                    <Abs x={340} y={800} w={400} h={400} style={{transform: `scale(${q}) rotate(${(1 - q) * 90}deg)`}}>
                      <div style={{position: 'absolute', inset: 0, borderRadius: 200, background: `radial-gradient(circle, ${YEL}${Math.round(glow * 120).toString(16).padStart(2, '0')} 0%, transparent 65%)`}} />
                      {t > 42.74 && Array.from({length: 10}, (_, k) => { const a = (k / 10) * Math.PI * 2; const r = 90 + prog(t, 42.74, 43.6, easeOut) * 140; return <div key={k} style={{position: 'absolute', left: 200 + Math.cos(a) * r - 8, top: 200 + Math.sin(a) * r - 8, width: 16, height: 16, borderRadius: 8, background: YEL, opacity: 1 - prog(t, 43.0, 43.6)}} />; })}
                      <div style={{position: 'absolute', left: 90, top: 90, filter: `drop-shadow(0 0 ${20 * glow}px ${YEL})`}}><F n="cle" size={220} /></div>
                    </Abs>
                  );
                })()}
                {/* … devenu une coquille vide qui s'ouvre */}
                {t > 43.9 && (() => {
                  const q = spring(t, 43.9);
                  const line = prog(t, 44.82, 45.1);
                  const open = prog(t, 45.0, 45.7, easeOut);
                  const shake = t > 44.5 && t < 45.0 ? Math.sin(t * 60) * 3 : 0;
                  const EGG = 'M540 800 C 630 800 690 930 690 1030 C 690 1120 625 1180 540 1180 C 455 1180 390 1120 390 1030 C 390 930 450 800 540 800 Z';
                  const ZIG = '380,1000 420,975 460,1010 500,972 540,1008 580,972 620,1010 660,975 700,1000';
                  return (
                    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
                      <defs>
                        <radialGradient id="tbEgg" cx="40%" cy="35%" r="70%"><stop offset="0%" stopColor="#FFFDF7" /><stop offset="100%" stopColor="#E3D6BA" /></radialGradient>
                        <clipPath id="tbEggTop"><polygon points={`370,780 710,780 710,1000 ${ZIG.split(' ').reverse().join(' ')} 370,1000`} /></clipPath>
                        <clipPath id="tbEggBot"><polygon points={`370,1000 ${ZIG} 710,1000 710,1200 370,1200`} /></clipPath>
                      </defs>
                      <g transform={`translate(${540 + shake} 1000) scale(${q}) translate(-540 -1000)`}>
                        <ellipse cx={540} cy={1195} rx={150 * q} ry={18} fill="rgba(0,0,0,0.35)" />
                        <path d={EGG} fill="url(#tbEgg)" stroke="#CDBFA0" strokeWidth={4} clipPath="url(#tbEggBot)" />
                        {open > 0 && <ellipse cx={540} cy={992} rx={146} ry={26 * open} fill="#3A2E1E" />}
                        <g transform={`translate(${-open * 60} ${-open * 210}) rotate(${-open * 28} 540 960)`}>
                          <path d={EGG} fill="url(#tbEgg)" stroke="#CDBFA0" strokeWidth={4} clipPath="url(#tbEggTop)" />
                        </g>
                        {open < 0.05 && <polyline points={ZIG} fill="none" stroke="#8A7A5A" strokeWidth={4} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - line} />}
                      </g>
                    </svg>
                  );
                })()}
                {t > 45.4 && <Abs x={0} y={1220} w={1080} style={{textAlign: 'center'}}><T size={44} color={DIM} style={{opacity: pop(t, 45.4)}}>… et vide à l'intérieur.</T></Abs>}
                {t > 43.4 && <Row y={1310}><Chip c={SKY} dark={false} q={spring(t, 43.46)} size={30}>Une simple formalité</Chip></Row>}
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* case cochée + réunion de fantômes + bouclier retourné */}
      {t > 46.4 && (() => {
        const ghost = prog(t, 55.0, 56.6, easeInOut);
        const flip = prog(t, 60.3, 61.0, easeInOut);
        return (
          <AbsoluteFill style={{opacity: pop(t, 46.4)}}>
            <Title>{t < 50.4 ? <>Pourquoi <span style={{color: SKY}}>si courant</span> ?</> : t < 57.8 ? <>Case cochée… <span style={{color: SKY}}>rien ne bouge</span></> : <>Se protéger <span style={{color: RED}}>soi-même</span></>}</Title>
            {t < 50.6 && <Abs x={340} y={760} w={400} h={400} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 46.5) * (1 + prog(t, 49.6, 50.5, easeIn) * 6)}) rotate(${Math.sin(t * 2) * 6}deg)`, opacity: 1 - prog(t, 50.1, 50.5)}}><F n="question" size={360} /></Abs>}
            {t < 58.0 && (
              <AbsoluteFill style={{opacity: 1 - prog(t, 57.6, 58.0)}}>
                <Photo src="induction/reunion-audit.jpg" x={70} y={640} w={940} h={580} q={spring(t, 50.4)} filter={`grayscale(${ghost}) brightness(${1 + ghost * 0.4}) opacity(${1 - ghost * 0.55})`}>
                  {ghost > 0.5 && <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(160,190,230,0.35), rgba(160,190,230,0.1))'}} />}
                </Photo>
                {t > 52.3 && <Abs x={110} y={570} w={440} h={120} style={{borderRadius: 18, background: '#E9EEF5', display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', boxSizing: 'border-box', boxShadow: '0 14px 30px rgba(0,0,0,0.4)', transform: `scale(${spring(t, 52.3)})`}}><div style={{width: 64, height: 64, borderRadius: 10, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Check p={prog(t, 52.6, 53.0)} size={52} color="#fff" /></div><T size={32} color={INK}>Réunion faite</T></Abs>}
                {t > 55.0 && <Row y={1270}><Chip c={LIGHT} q={spring(t, 55.06)} size={30}>Culturellement : rien</Chip></Row>}
              </AbsoluteFill>
            )}
            {t > 57.8 && (
              <AbsoluteFill style={{opacity: pop(t, 57.8)}}>
                <Abs x={80} y={720} style={{transform: `scale(${spring(t, 58.0)})`}}><Img src={PH('causerie/animatrice-d.png')} style={{height: 460}} /></Abs>
                <Abs x={660} y={760} style={{transform: `scale(${spring(t, 58.2)})`}}><F n="batiment" size={340} /></Abs>
                <Abs x={360 + flip * 260} y={820} style={{transform: `rotateY(${flip * 180}deg) scale(${spring(t, 59.3)})`}}><F n="bouclier" size={200} /></Abs>
                {t > 59.3 && t < 60.3 && <Abs x={110} y={1220}><Chip c={GREEN} q={spring(t, 59.34)} size={26}>Protéger les gens ?</Chip></Abs>}
                {t > 60.3 && <Abs x={560} y={1220}><Chip c={RED} dark={false} q={spring(t, 60.4)} size={26}>Protéger l'entreprise</Chip></Abs>}
                {t > 63.7 && (
                  <Abs x={260} y={1300} w={560} h={190} style={{background: PAPER, borderRadius: 14, padding: 20, boxSizing: 'border-box', transform: `rotate(2deg) scale(${spring(t, 63.8)})`}}>
                    <Hand size={36} color={INK}>« Regardez : on a fait la réunion ! »</Hand>
                    <div style={{display: 'flex', gap: 30, marginTop: 14}}><T size={28} color={GREEN}>Trace ✓</T><T size={28} color={RED} style={{opacity: pop(t, 67.8)}}>Prévention ✗</T></div>
                  </Abs>
                )}
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 2 : les cinq défauts, barre de vie ─────────── */
const BREAK = [89.34, 97.5, 103.14, 107.94, 117.06];
const LifeBar: React.FC<{t: number}> = ({t}) => (
  <Abs x={70} y={570} w={940} h={130} style={{borderRadius: 24, background: '#0A1320', border: '4px solid #2B3A4C', display: 'flex', alignItems: 'center', gap: 18, padding: '0 26px', boxSizing: 'border-box'}}>
    <T size={28} color={DIM} style={{width: 230}}>RÉUNION · PV</T>
    {BREAK.map((b, k) => {
      const shat = prog(t, b, b + 0.5, easeOut);
      return (
        <div key={k} style={{position: 'relative', width: 110, height: 100, transform: `scale(${spring(t, 75.0 + k * 0.12)})`}}>
          {[0, 1].map((half) => <svg key={half} width={110} height={100} viewBox="0 0 110 100" style={{position: 'absolute', inset: 0, clipPath: half ? 'inset(0 0 0 50%)' : 'inset(0 50% 0 0)', transform: `translate(${(half ? 1 : -1) * shat * 30}px, ${shat * 60}px) rotate(${(half ? 1 : -1) * shat * 30}deg)`, opacity: 1 - shat}}><path d="M55 92 C 20 66 4 46 4 28 A 24 24 0 0 1 55 18 A 24 24 0 0 1 106 28 C 106 46 90 66 55 92 Z" fill={RED} stroke="#fff" strokeWidth={4} /></svg>)}
          {shat > 0 && <svg width={110} height={100} viewBox="0 0 110 100" style={{position: 'absolute', inset: 0, opacity: 0.35}}><path d="M55 92 C 20 66 4 46 4 28 A 24 24 0 0 1 55 18 A 24 24 0 0 1 106 28 C 106 46 90 66 55 92 Z" fill="none" stroke="#fff" strokeWidth={4} strokeDasharray="8 6" /></svg>}
        </div>
      );
    })}
  </Abs>
);
const P2: React.FC = () => {
  const t = useT();
  const o = win(t, 72.2, 121.4, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Title y={455}>{t < 81.9 ? <>Cinq <span style={{color: RED}}>défauts fatals</span></> : t < 91.0 ? <>1. Sujets <span style={{color: RED}}>déconnectés</span></> : t < 98.3 ? <>2. Le chef <span style={{color: RED}}>lit sa fiche</span></> : t < 104.6 ? <>3. La <span style={{color: RED}}>fréquence</span> excessive</> : t < 109.1 ? <>4. La <span style={{color: RED}}>conformité</span> avant tout</> : <>5. La question <span style={{color: RED}}>sans réponse</span></>}</Title>
      <LifeBar t={t} />
      {t < 82.0 && t > 74.9 && <Abs x={0} y={880} w={1080} style={{textAlign: 'center', opacity: 1 - prog(t, 81.6, 82.0)}}><T size={150} color={RED} style={{transform: `scale(${spring(t, 75.02)})`}}>×5</T><Hand size={44} color={DIM}>qui vident la réunion de sa substance</Hand></Abs>}
      {/* 1 : GPS */}
      {t > 81.9 && t < 91.1 && (
        <AbsoluteFill style={{opacity: win(t, 81.9, 91.1, 0.3)}}>
          <Abs x={70} y={740} w={940} h={620} style={{borderRadius: 26, overflow: 'hidden', background: '#E8ECEF'}}>
            <svg width={940} height={620} style={{position: 'absolute', inset: 0}}>
              {Array.from({length: 9}, (_, k) => <line key={`h${k}`} x1={0} y1={k * 75} x2={940} y2={k * 75 + 40} stroke="#FFFFFF" strokeWidth={18} />)}
              {Array.from({length: 7}, (_, k) => <line key={`v${k}`} x1={k * 150} y1={0} x2={k * 150 + 60} y2={620} stroke="#FFFFFF" strokeWidth={18} />)}
              <path d="M170 500 C 300 520 420 320 560 300 S 800 120 820 110" stroke={SKY} strokeWidth={12} fill="none" strokeDasharray="22 14" pathLength={1} />
            </svg>
            <div style={{position: 'absolute', left: 120, top: 400}}><svg width={100} height={130} viewBox="0 0 70 90"><path d="M35 88 C20 60 4 46 4 30 A31 31 0 0 1 66 30 C66 46 50 60 35 88 Z" fill={GREEN} /><circle cx={35} cy={30} r={12} fill="#fff" /></svg><div style={{marginTop: -6}}><Chip c={GREEN} size={22}>Travail du jour</Chip></div></div>
            <div style={{position: 'absolute', left: 760, top: 20, transform: `scale(${spring(t, 84.8)})`}}><svg width={100} height={130} viewBox="0 0 70 90"><path d="M35 88 C20 60 4 46 4 30 A31 31 0 0 1 66 30 C66 46 50 60 35 88 Z" fill={RED} /><circle cx={35} cy={30} r={12} fill="#fff" /></svg></div>
            {t > 85.8 && <div style={{position: 'absolute', left: 520, top: 170, transform: `scale(${spring(t, 85.86)})`}}><Chip c={RED} dark={false} size={24}>Sujet du jour</Chip></div>}
            {t > 86.8 && <div style={{position: 'absolute', left: 300, top: 260, padding: '8px 16px', borderRadius: 12, background: INK, opacity: pop(t, 86.82)}}><T size={24} color={YEL}>Recalcul… déconnecté du terrain</T></div>}
          </Abs>
        </AbsoluteFill>
      )}
      {/* 2 : le chef qui lit sa fiche */}
      {t > 91.0 && t < 98.4 && (
        <AbsoluteFill style={{opacity: win(t, 91.0, 98.4, 0.3)}}>
          <Photo src="verites/plans.jpg" x={70} y={740} w={560} h={620} q={spring(t, 91.1)} pos="60% 30%" />
          <Abs x={660} y={760} w={350} h={300} style={{borderRadius: 24, background: '#0A1320', border: '4px solid #2B3A4C', padding: 20, boxSizing: 'border-box', opacity: pop(t, 95.1)}}>
            <T size={24} color={DIM}>INTERACTIONS</T>
            <T size={120} color={RED} style={{marginTop: 10}}>0</T>
            <div style={{height: 14, borderRadius: 7, background: 'rgba(255,255,255,0.1)', marginTop: 10}} />
          </Abs>
          {t > 96.5 && <Abs x={660} y={1110}><Chip c={RED} dark={false} q={spring(t, 96.5)} size={28}>Il n'anime pas : il lit</Chip></Abs>}
        </AbsoluteFill>
      )}
      {/* 3 : tous les jours, neige télé */}
      {t > 98.3 && t < 104.7 && (
        <AbsoluteFill style={{opacity: win(t, 98.3, 104.7, 0.3)}}>
          <Abs x={120} y={760} w={520} h={520} style={{borderRadius: 24, background: PAPER, padding: 20, boxSizing: 'border-box', transform: `scale(${spring(t, 98.4)})`}}>
            <T size={28} color={INK}>Ce mois-ci</T>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginTop: 14}}>{Array.from({length: 35}, (_, k) => <div key={k} style={{height: 54, borderRadius: 8, background: t > 100.3 + k * 0.03 ? ORA : '#E6E0D0'}} />)}</div>
          </Abs>
          <Abs x={680} y={760} w={320} h={520} style={{borderRadius: 24, overflow: 'hidden', background: '#222', border: '10px solid #3A3A3A'}}>
            {t > 103.1 && Array.from({length: 80}, (_, k) => <div key={k} style={{position: 'absolute', left: random(`sn${k}${Math.floor(t * 20)}`) * 300, top: random(`sm${k}${Math.floor(t * 20)}`) * 500, width: 8, height: 4, background: random(`so${k}`) > 0.5 ? '#fff' : '#888'}} />)}
            <div style={{position: 'absolute', left: 20, right: 20, bottom: 20 + (1 - Math.min(1, Math.max(0, 1 - prog(t, 102.2, 103.2)))) * 0, height: `${80 - 70 * prog(t, 102.2, 103.2)}%`, borderRadius: 14, background: `linear-gradient(0deg, ${GREEN}, ${YEL})`, opacity: t > 103.1 ? 0.25 : 1}} />
            <T size={24} style={{position: 'absolute', top: 14, width: 300, textAlign: 'center'}}>ATTENTION</T>
          </Abs>
          {t > 103.1 && <Abs x={640} y={1300}><Chip c={LIGHT} q={spring(t, 103.14)} size={26}>Du bruit de fond</Chip></Abs>}
        </AbsoluteFill>
      )}
      {/* 4 : conforme… mais l'accident ? */}
      {t > 104.6 && t < 109.2 && (
        <AbsoluteFill style={{opacity: win(t, 104.6, 109.2, 0.3)}}>
          <Photo src="verites/accident.jpg" x={70} y={760} w={940} h={520} q={spring(t, 104.7)} filter={`blur(${3 + 3 * Math.sin(t * 2)}px) saturate(0.6)`} />
          {t > 106.8 && <Abs x={260} y={880} style={{transform: `rotate(-12deg) scale(${spring(t, 106.8, 9, 18)})`, border: `10px solid ${GREEN}`, borderRadius: 18, padding: '8px 30px', background: 'rgba(20,32,47,0.85)'}}><T size={90} color={GREEN}>CONFORME</T></Abs>}
          {t > 108.0 && <Row y={1320}><Chip c={RED} dark={false} q={spring(t, 108.2)} size={30}>… et l'accident évité ?</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* 5 : messagerie « vu » sans réponse */}
      {t > 109.1 && (
        <AbsoluteFill style={{opacity: pop(t, 109.1)}}>
          <Abs x={170} y={740} w={740} h={620} style={{borderRadius: 50, background: '#E9EEF5', border: '10px solid #2B3A4C', overflow: 'hidden'}}>
            <div style={{height: 80, background: '#D5DDE8', display: 'flex', alignItems: 'center', padding: '0 26px'}}><T size={28} color={INK}>Réunion sécurité</T></div>
            {t > 112.1 && <div style={{position: 'absolute', right: 26, top: 120, maxWidth: 480, padding: '18px 22px', borderRadius: '26px 26px 4px 26px', background: SKY, transform: `scale(${spring(t, 112.14)})`, transformOrigin: '100% 100%'}}><T size={30} color="#fff">J'ai une vraie question sur ce poste…</T></div>}
            {t > 114.0 && t < 116.4 && <div style={{position: 'absolute', left: 26, top: 300, padding: '16px 22px', borderRadius: 26, background: '#fff', display: 'flex', gap: 10}}>{[0, 1, 2].map((k) => <div key={k} style={{width: 18, height: 18, borderRadius: 9, background: '#8A97A8', transform: `translateY(${Math.sin(t * 10 + k) * 5}px)`}} />)}</div>}
            {t > 116.4 && <div style={{position: 'absolute', right: 30, top: 300}}><T size={24} color="#8A97A8">Vu ✓✓</T></div>}
            {t > 117.0 && <div style={{position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center', opacity: pop(t, 117.06)}}><T size={50} color={RED}>Jamais de réponse.</T></div>}
            {t > 119.4 && (
              <div style={{position: 'absolute', left: 60, right: 60, top: 490, display: 'flex', alignItems: 'center', gap: 18, opacity: pop(t, 119.46)}}>
                <F n="haut-parleur" size={60} />
                <div style={{flex: 1, height: 16, borderRadius: 8, background: '#C9D3E6', position: 'relative'}}><div style={{width: `${70 * (1 - prog(t, 119.6, 120.6))}%`, height: '100%', borderRadius: 8, background: SKY}} /><div style={{position: 'absolute', left: `${70 * (1 - prog(t, 119.6, 120.6))}%`, top: -12, width: 40, height: 40, borderRadius: 20, background: '#fff', border: '4px solid #8A97A8', marginLeft: -20}} /></div>
              </div>
            )}
          </Abs>
          {t > 120.6 && <Abs x={0} y={1390} w={1080} style={{textAlign: 'center'}}><T size={70} color={RED} style={{transform: `scale(${spring(t, 120.7)})`, letterSpacing: 6}}>GAME OVER</T></Abs>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 3 : le véritable dialogue ─────────── */
const P3: React.FC = () => {
  const t = useT();
  const o = win(t, 123.9, 181.4, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* panneaux : déviation, sens unique → double sens */}
      {t < 135.6 && (() => {
        const morph = prog(t, 133.0, 134.0, easeInOut);
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 135.2, 135.6)}}>
            <Title>{t < 128.7 ? <>Il existe une <span style={{color: GREEN}}>autre voie</span></> : <>Du <span style={{color: RED}}>monologue</span> au <span style={{color: GREEN}}>dialogue</span></>}</Title>
            {t < 128.9 && <Abs x={340} y={640} w={400} h={400} style={{borderRadius: 30, background: YEL, border: `12px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 123.2)}) rotate(${Math.sin(t * 2) * 3}deg)`, opacity: 1 - prog(t, 128.5, 128.9)}}><T size={60} color={INK}>DÉVIATION</T><T size={130} color={INK}>↱</T></Abs>}
            {t > 128.7 && (
              <AbsoluteFill style={{opacity: pop(t, 128.7)}}>
                <Abs x={290} y={620} w={500} h={500} style={{borderRadius: 250, background: morph < 0.5 ? SKY : GREEN, border: '14px solid #fff', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotateY(${morph * 180}deg)`}}>
                  <div style={{transform: `rotateY(${morph > 0.5 ? 180 : 0}deg)`}}>{morph < 0.5 ? <T size={260} color="#fff">↓</T> : <T size={220} color="#fff">⇅</T>}</div>
                </Abs>
                <Row y={1170} gap={16}><Chip c={SKY} dark={false} q={spring(t, 130.8)} size={28}>Monologue qui descend</Chip>{t > 133.4 && <Chip c={GREEN} q={spring(t, 133.4)} size={28}>Véritable dialogue</Chip>}</Row>
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* l'écran de projection qui s'enroule → conversation */}
      {t > 135.4 && t < 157.1 && (() => {
        const roll = prog(t, 140.0, 141.4, easeInOut);
        return (
          <AbsoluteFill style={{opacity: win(t, 135.4, 157.1, 0.35)}}>
            <Title>{t < 141.8 ? <>Pas une <span style={{color: DIM}}>présentation</span>…</> : <>… une <span style={{color: GREEN}}>conversation</span></>}</Title>
            <Photo src="induction/accueil-groupe.jpg" x={70} y={620} w={940} h={640} q={spring(t, 135.6)}>
              {t > 141.8 && [[120, 60, 0], [430, 30, 0.3], [700, 90, 0.6], [260, 230, 0.9]].map(([x, y, d], k) => <div key={k} style={{position: 'absolute', left: x, top: y, transform: `scale(${spring(t, 141.9 + d)})`}}><div style={{padding: '10px 18px', borderRadius: 24, background: [GREEN, '#fff', YEL, '#fff'][k]}}><T size={26} color={INK}>{['Et toi ?', 'Moi, je…', 'Bonne idée !', 'Attention à…'][k]}</T></div></div>)}
            </Photo>
            {/* écran de projection */}
            <Abs x={70} y={620} w={940} h={640 * (1 - roll)} style={{background: '#F3F5F8', borderRadius: '30px 30px 0 0', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)'}}>
              <div style={{padding: 40}}><T size={40} color={INK}>Diapo 1/48</T>{[0.9, 0.7, 0.8, 0.6].map((w, k) => <div key={k} style={{marginTop: 24, height: 18, borderRadius: 9, background: '#D5DDE8', width: `${w * 100}%`}} />)}</div>
            </Abs>
            <Abs x={50} y={600 + 640 * (1 - roll)} w={980} h={40} style={{borderRadius: 20, background: '#5A6B7C'}} />
            {t > 143.5 && <Row y={1290} gap={12}><Chip c={GREEN} q={spring(t, 143.54)} size={28}>Courte</Chip><Chip c={GREEN} q={spring(t, 144.58)} size={28}>Précise</Chip></Row>}
            {t > 149.7 && <Abs x={760} y={1080} style={{transform: `scale(${spring(t, 149.7)})`}}><Img src={PH('causerie/manager-d.png')} style={{height: 380}} /></Abs>}
            {t > 149.7 && <Abs x={620} y={1440}><Chip c={YEL} q={spring(t, 149.8)} size={26}>Le chef d'équipe</Chip></Abs>}
            {t > 152.8 && <Abs x={100} y={1400}><Chip c={ORA} q={spring(t, 152.82)} size={26}>Le boulot de juste après</Chip></Abs>}
          </AbsoluteFill>
        );
      })()}
      {/* le tableau dont la colonne périmée se froisse */}
      {t > 156.9 && (() => {
        const rows: [string, string, number, number][] = [['Descendante', 'Vrai dialogue', 160.78, 168.42], ['Sujet abstrait', 'Travail du jour', 162.02, 169.58], ['Service lointain', 'Manager de proximité', 163.14, 170.7], ['Une signature', 'Une trace culturelle', 165.26, 174.82]];
        const crumple = prog(t, 167.6, 168.4, easeIn);
        return (
          <AbsoluteFill style={{opacity: pop(t, 156.9)}}>
            <Title>{t < 176.2 ? <>Deux <span style={{color: GREEN}}>modèles</span></> : <>Une <span style={{color: GREEN}}>trace dans les esprits</span></>}</Title>
            {t < 176.4 && (
              <AbsoluteFill style={{opacity: 1 - prog(t, 176.0, 176.4)}}>
                <Abs x={70} y={600} w={450} h={760} style={{borderRadius: 24, background: '#3A3A3A', padding: 20, boxSizing: 'border-box', transform: `scale(${1 - crumple * 0.7}) rotate(${crumple * -30}deg) translate(${crumple * -200}px, ${crumple * 500}px)`, opacity: 1 - crumple, filter: crumple > 0 ? 'contrast(1.3)' : undefined, clipPath: crumple > 0 ? `polygon(${5 * crumple}% ${8 * crumple}%, ${95 - 6 * crumple}% ${3 * crumple}%, ${98 - 10 * crumple}% ${90 - 8 * crumple}%, ${10 * crumple}% ${97 - 12 * crumple}%)` : undefined}}>
                  <T size={30} color="#BBB">VIEUX MODÈLE</T>
                  {rows.map(([l, , at]) => <div key={l} style={{marginTop: 20, padding: '20px 18px', borderRadius: 14, background: '#555', opacity: pop(t, at)}}><T size={30} color="#DDD">{l}</T></div>)}
                </Abs>
                <Abs x={560} y={600} w={450} h={760} style={{borderRadius: 24, background: 'rgba(46,204,113,0.12)', border: `4px solid ${GREEN}`, padding: 20, boxSizing: 'border-box', opacity: pop(t, 167.8)}}>
                  <T size={30} color={GREEN}>LE BON MODÈLE</T>
                  {rows.map(([, r, , at]) => <div key={r} style={{marginTop: 20, padding: '20px 18px', borderRadius: 14, background: GREEN, opacity: pop(t, at), transform: `translateX(${(1 - pop(t, at)) * 200}px)`}}><T size={30} color={INK}>{r}</T></div>)}
                </Abs>
              </AbsoluteFill>
            )}
            {t > 176.2 && (
              <AbsoluteFill style={{opacity: pop(t, 176.2)}}>
                {/* profil de tête : l'empreinte laissée dans l'esprit */}
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                  <path d="M410 1250 L410 1130 C 340 1090 300 1000 310 900 C 320 760 430 660 570 660 C 700 660 790 750 800 870 L 845 975 C 848 985 840 992 828 994 L 808 998 L 815 1030 L 803 1045 L 815 1062 C 812 1085 800 1105 780 1112 C 750 1122 720 1125 700 1135 L 700 1250 Z" fill="#22364F" stroke="rgba(77,163,255,0.55)" strokeWidth={5} style={{transform: `scale(${spring(t, 176.3)})`, transformOrigin: '560px 1250px'}} />
                  {Array.from({length: 4}, (_, k) => { const p = ((t - 176.3) * 0.5 + k / 4) % 1; return <circle key={k} cx={560} cy={880} r={110 + 170 * p} fill="none" stroke={YEL} strokeWidth={5} opacity={(1 - p) * 0.8 * pop(t, 176.6)} />; })}
                </svg>
                <Abs x={430} y={750} style={{transform: `scale(${spring(t, 176.5)})`, filter: `drop-shadow(0 0 30px ${YEL}88)`}}><F n="cerveau" size={260} /></Abs>
                <Row y={1320}><Chip c={YEL} q={spring(t, 176.4)} size={28}>Pas qu'une trace documentaire</Chip></Row>
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 4 : la méthode ─────────── */
const SEGS: [string, number, number, string][] = [['Accroche', 232.86, 0.1, SKY], ['Cœur du sujet', 236.26, 0.32, YEL], ['Questions ouvertes', 242.7, 0.3, GREEN], ['Message clé', 246.58, 0.12, ORA], ['Signalements', 253.86, 0.16, RED]];
const P4: React.FC = () => {
  const t = useT();
  const o = win(t, 183.9, 259.0, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* dé du hasard → planning annuel */}
      {t < 206.2 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 205.8, 206.2)}}>
          <Title>{t < 195.2 ? <>L'efficacité <span style={{color: RED}}>ne s'improvise pas</span></> : <>Un <span style={{color: ORA}}>programme annuel</span></>}</Title>
          {t < 195.4 && (
            <AbsoluteFill style={{opacity: 1 - prog(t, 195.0, 195.4)}}>
              <Abs x={400} y={680} w={280} h={280} style={{borderRadius: 50, background: LIGHT, boxShadow: '0 20px 40px rgba(0,0,0,0.5)', transform: `rotate(${t < 192.7 ? (t - 190) * 300 : 0}deg) scale(${spring(t, 190.9)})`}}>{[[70, 70], [210, 210], [140, 140], [70, 210], [210, 70]].map(([x, y], k) => <div key={k} style={{position: 'absolute', left: x - 22, top: y - 22, width: 44, height: 44, borderRadius: 22, background: INK}} />)}</Abs>
              {t > 192.7 && <Abs x={360} y={650} w={360} h={360} style={{transform: `scale(${spring(t, 192.74)})`}}><svg width={360} height={360}><line x1={30} y1={30} x2={330} y2={330} stroke={RED} strokeWidth={24} strokeLinecap="round" /><line x1={330} y1={30} x2={30} y2={330} stroke={RED} strokeWidth={24} strokeLinecap="round" /></svg></Abs>}
              {t > 192.7 && <Row y={1080}><Chip c={RED} dark={false} q={spring(t, 192.8)} size={28}>Pas de sujet tiré au hasard</Chip></Row>}
            </AbsoluteFill>
          )}
          {t > 195.2 && (
            <Abs x={70} y={600} w={940} h={760} style={{borderRadius: 24, background: PAPER, padding: 24, boxSizing: 'border-box', opacity: pop(t, 195.2)}}>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14}}>
                {['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'].map((m, k) => (
                  <div key={m} style={{height: 210, borderRadius: 14, background: '#fff', border: '2px solid #E2DAC6', padding: 10, boxSizing: 'border-box'}}>
                    <T size={24} color={INK}>{m}</T>
                    {[0, 1, 2].map((j) => <div key={j} style={{marginTop: 10, height: 26, borderRadius: 8, background: [ORA, SKY, GREEN, RED, YEL][(k + j) % 5], transform: `scaleX(${prog(t, 198.9 + k * 0.12 + j * 0.06, 199.3 + k * 0.12 + j * 0.06)})`, transformOrigin: '0 50%'}} />)}
                  </div>
                ))}
              </div>
            </Abs>
          )}
          {t > 201.0 && <Row y={1400} gap={12}><Chip c={ORA} q={spring(t, 201.06)} size={28}>Du sens</Chip><Chip c={YEL} q={spring(t, 202.22)} size={28}>De la cohérence</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* la marmite aux trois ingrédients */}
      {t > 206.0 && t < 227.7 && (() => {
        const ings: [string, string, number, string][] = [['Risques des documents officiels', 'dossier', 209.06, ''], ['Accidents et presque-accidents', '', 215.54, 'verites/accident.jpg'], ['Chantiers à venir', '', 220.38, 'epiepc/chantier.jpg']];
        const stir = t > 223.7 ? (t - 223.7) * 3 : 0;
        return (
          <AbsoluteFill style={{opacity: win(t, 206.0, 227.7, 0.35)}}>
            <Title>Trois <span style={{color: ORA}}>ingrédients</span></Title>
            {ings.map(([l, ic, at, src], k) => {
              const drop = prog(t, at + 1.4, at + 2.2, easeIn);
              return t > at - 0.1 && (
                <Abs key={l} x={70 + k * 320 + (390 - 70 - k * 320) * drop} y={600 + drop * 520} w={300} style={{transform: `scale(${spring(t, at) * (1 - drop * 0.6)}) rotate(${drop * 40}deg)`, opacity: 1 - prog(t, at + 2.0, at + 2.3)}}>
                  <div style={{height: 220, borderRadius: 20, overflow: 'hidden', background: '#2B3A4C', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #fff'}}>{src ? <Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : <F n={ic} size={140} />}</div>
                  <T size={24} style={{marginTop: 10, textAlign: 'center'}}>{l}</T>
                </Abs>
              );
            })}
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <path d="M300 1140 L780 1140 L740 1440 Q540 1490 340 1440 Z" fill="#3A4656" stroke="#8A97A8" strokeWidth={6} />
              <ellipse cx={540} cy={1140} rx={240} ry={44} fill={ORA} opacity={0.85} />
              <rect x={260} y={1120} width={560} height={30} rx={14} fill="#5A6B7C" />
              <line x1={540 + Math.cos(stir) * 80} y1={1130 + Math.sin(stir) * 14} x2={620 + Math.cos(stir) * 30} y2={980} stroke="#C9A26B" strokeWidth={16} strokeLinecap="round" />
            </svg>
            {Array.from({length: 5}, (_, k) => { const p = ((t * 0.5 + k * 0.2) % 1); return <div key={k} style={{position: 'absolute', left: 420 + k * 50 + Math.sin(t * 2 + k) * 20, top: 1080 - p * 260, width: 40, height: 40, borderRadius: 20, background: 'rgba(255,255,255,0.3)', filter: 'blur(6px)', opacity: 1 - p}} />; })}
            {t > 225.4 && [0, 1, 2].map((k) => <Abs key={k} x={300 + k * 180} y={820 - k * 30} style={{transform: `scale(${spring(t, 225.5 + k * 0.2)})`}}><div style={{padding: '10px 18px', borderRadius: 24, background: '#fff'}}><T size={24} color={INK}>{['Ça me parle !', 'Chez nous', 'Utile'][k]}</T></div></Abs>)}
          </AbsoluteFill>
        );
      })()}
      {/* la barre de lecture des 15 minutes */}
      {t > 227.5 && (() => {
        let acc = 0;
        const head = prog(t, 232.86, 256.0, (x) => x);
        return (
          <AbsoluteFill style={{opacity: pop(t, 227.5)}}>
            <Title>Le déroulé : <span style={{color: ORA}}>15 minutes chrono</span></Title>
            <Abs x={70} y={640} w={940} h={140} style={{borderRadius: 20, background: '#0A1320', border: '4px solid #2B3A4C', overflow: 'hidden', display: 'flex'}}>
              {SEGS.map(([l, at, w, c]) => { const x0 = acc; acc += w; return <div key={l} style={{width: `${w * 100}%`, height: '100%', background: t > at ? c : 'rgba(255,255,255,0.06)', borderRight: '4px solid #0A1320', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: t > at ? 1 : 0.6, boxShadow: l === 'Questions ouvertes' && t > 241.5 ? 'inset 0 0 0 6px #fff' : 'none'}} data-x={x0} />; })}
            </Abs>
            <Abs x={70 + 940 * head - 4} y={620} w={8} h={180} style={{background: '#fff', boxShadow: '0 0 16px #fff'}} />
            <Abs x={70} y={810} w={940} style={{display: 'flex', justifyContent: 'space-between'}}><T size={26} color={DIM}>0:00</T><T size={26} color={DIM}>15:00</T></Abs>
            {(() => { const cur = SEGS.filter((sg) => t >= sg[1]).length - 1; if (cur < 0) return null; const [l, at, , c] = SEGS[cur]; const ic = ['question', 'cible', 'bulle', 'megaphone', 'danger'][cur]; return (
              <Abs key={l} x={140} y={900} w={800} h={420} style={{borderRadius: 30, background: `${c}22`, border: `5px solid ${c}`, display: 'flex', alignItems: 'center', gap: 30, padding: '0 40px', boxSizing: 'border-box', transform: `translateY(${(1 - spring(t, at, 8, 14)) * 300}px)`, opacity: pop(t, at)}}>
                <F n={ic} size={180} />
                <div><T size={54} color={c}>{l}</T><Hand size={36} style={{marginTop: 10}}>{['une question pour capter l’attention', 'un, allez, deux points essentiels', 'faire parler l’équipe, partager', 'une seule phrase à retenir', 'chacun signale ce qu’il a vu'][cur]}</Hand>{cur === 2 && t > 241.5 && <div style={{marginTop: 10}}><Chip c="#fff" size={22}>Le moment le plus important</Chip></div>}</div>
              </Abs>
            ); })()}
            {t > 255.6 && <Row y={1400} gap={12}><Chip c={SKY} dark={false} q={spring(t, 255.66)} size={28}>Simple</Chip><Chip c={YEL} q={spring(t, 256.74)} size={28}>Rythmé</Chip><Chip c={GREEN} q={spring(t, 257.46)} size={28}>Efficace</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 5 : révélateur de culture ─────────── */
const LOCKS: [string, string, number][] = [['La peur', '« si je parle, j’aurai des ennuis »', 302.82], ['La futilité', '« déjà signalé dix fois… »', 305.06], ['Le manque de pertinence', '« ça ne me concerne pas »', 310.74], ['Le format', '« le chef parle, parle, parle »', 316.82]];
const P5: React.FC = () => {
  const t = useT();
  if (t < 261.4) return null;
  const o = pop(t, 261.5, 0.5);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* affiche-miroir réelle + photo qui se révèle */}
      {t < 271.5 && (() => {
        const dev = prog(t, 264.6, 269.6, (x) => x);
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 271.1, 271.5)}}>
            <Title>{t < 264.5 ? <>Un <span style={{color: VIO}}>miroir</span></> : <>Un <span style={{color: VIO}}>révélateur</span> de culture</>}</Title>
            {t < 264.7 && <Photo src="induction/miroir.jpg" x={190} y={600} w={700} h={760} q={spring(t, 261.7)} pos="60% 50%" />}
            {t > 264.5 && (
              <AbsoluteFill style={{opacity: pop(t, 264.5)}}>
                <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, rgba(180,20,20,0.35), transparent 70%)'}} />
                <Abs x={110} y={760} w={860} h={560} style={{borderRadius: 20, background: '#2A2E33', border: '10px solid #555', padding: 40, boxSizing: 'border-box', transform: 'perspective(1200px) rotateX(30deg)'}}>
                  <div style={{width: '100%', height: '100%', background: '#F4F4F0', overflow: 'hidden', position: 'relative', transform: `translateY(${Math.sin(t * 2) * 3}px)`}}>
                    <Img src={PH('induction/briefing-atelier.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', opacity: dev, filter: `contrast(${0.4 + dev * 0.6}) grayscale(${1 - dev * 0.6})`}} />
                  </div>
                </Abs>
                <Abs x={0} y={620} w={1080} style={{textAlign: 'center'}}><Hand size={40} color="#FFB0B0">bac du révélateur</Hand></Abs>
                {t > 266.4 && <Row y={1400}><Chip c={VIO} dark={false} q={spring(t, 267.78)} size={28}>La véritable culture apparaît</Chip></Row>}
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* la vague de statistiques contre 15 minutes sur le terrain */}
      {t > 271.3 && t < 286.1 && (() => {
        const wave = prog(t, 274.4, 276.4, easeOut) * (1 - prog(t, 276.7, 277.6, easeIn));
        return (
          <AbsoluteFill style={{opacity: win(t, 271.3, 286.1, 0.35)}}>
            <Title>Prendre le <span style={{color: VIO}}>pouls</span></Title>
            {Array.from({length: 40}, (_, k) => { const x = (k % 8) * 130 + 40; const y = 1500 - wave * (300 + Math.floor(k / 8) * 160) + Math.sin(t * 3 + k) * 20; return <div key={k} style={{position: 'absolute', left: x, top: y, fontFamily: 'monospace', fontWeight: 700, fontSize: 40, color: k % 3 ? SKY : '#7FB2FF', opacity: wave}}>{['%', '∑', '↗', 'Ø', '#', '±', '÷', '≈'][k % 8]}</div>; })}
            {t > 276.7 && (
              <AbsoluteFill style={{opacity: pop(t, 276.7)}}>
                <Photo src="induction/briefing-atelier.jpg" x={140} y={620} w={800} h={520} q={spring(t, 276.8)} />
                {t > 279.4 && <Abs x={0} y={1170} w={1080} style={{textAlign: 'center'}}><T size={60} color={YEL} style={{transform: `scale(${spring(t, 279.46)})`}}>15 minutes : on voit tout</T></Abs>}
                {t > 282.2 && <Row y={1300} gap={16}><div style={{display: 'flex', alignItems: 'center', gap: 10, transform: `scale(${spring(t, 282.26)})`}}><F n="pousse" size={70} /><Chip c={GREEN} size={26}>Valeur vivante</Chip></div><T size={36} color={DIM}>ou</T><div style={{transform: `scale(${spring(t, 283.94)})`}}><Chip c="#5A6B7C" dark={false} size={26}>Une ligne dans un rapport</Chip></div></Row>}
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* le silence : bulle cadenassée par les quatre silences */}
      {t > 285.9 && t < 329.2 && (() => {
        const burst = prog(t, 324.6, 325.4, easeOut);
        return (
          <AbsoluteFill style={{opacity: win(t, 285.9, 329.2, 0.35)}}>
            <Title>{t < 292.3 ? <>Le <span style={{color: VIO}}>silence</span></> : t < 299.2 ? <>« Tout <span style={{color: GREEN}}>va bien</span> » ?</> : <>Les <span style={{color: VIO}}>4 racines</span> du silence</>}</Title>
            {t < 299.3 && (
              <AbsoluteFill style={{opacity: 1 - prog(t, 298.9, 299.3)}}>
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                  {Array.from({length: 60}, (_, k) => { const h = t < 290.0 ? 20 + 60 * Math.abs(Math.sin(k * 0.6 + t * 6)) : 4; return <rect key={k} x={60 + k * 16} y={900 - h / 2} width={10} height={h} rx={5} fill={VIO} />; })}
                </svg>
                {t > 290.0 && <Abs x={440} y={1000} style={{transform: `scale(${spring(t, 290.02)})`}}><F n="sens-interdit" size={200} /></Abs>}
                {t > 293.2 && t < 295.8 && <Row y={640}><Chip c={GREEN} q={spring(t, 293.22)} size={30}><F n="pouce" size={44} />Tout le monde est d'accord</Chip></Row>}
                {t > 295.8 && <Row y={640}><Chip c={RED} dark={false} q={spring(t, 295.78)} size={30}><div style={{transform: 'rotate(180deg)', display: 'flex'}}><F n="pouce" size={44} /></div>Tout le contraire</Chip></Row>}
              </AbsoluteFill>
            )}
            {t > 299.1 && (
              <AbsoluteFill style={{opacity: pop(t, 299.1)}}>
                <Abs x={190} y={600} w={700} h={360} style={{transform: `scale(${1 + burst * 0.1})`}}>
                  <svg width={700} height={420} style={{position: 'absolute', inset: 0, overflow: 'visible'}}><rect x={0} y={0} width={700} height={360} rx={70} fill={burst > 0.5 ? GREEN : '#3A4656'} /><path d="M140 358 L100 420 L240 358 Z" fill={burst > 0.5 ? GREEN : '#3A4656'} /></svg>
                  <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={60} color={burst > 0.5 ? INK : DIM}>{burst > 0.5 ? 'La parole se libère' : '…'}</T></div>
                </Abs>
                {LOCKS.map(([l, q, at], k) => {
                  const fly = burst;
                  return t > at && (
                    <React.Fragment key={l}>
                      <Abs x={170 + k * 190 + (k - 1.5) * fly * 200} y={890 + fly * -300 - (k % 2) * fly * 100} style={{transform: `scale(${spring(t, at)}) rotate(${fly * (k - 1.5) * 40}deg)`, opacity: 1 - fly}}><F n="cadenas" size={130} /></Abs>
                      <Abs x={80} y={1060 + k * 110} w={920} style={{opacity: pop(t, at) * (1 - burst * 0.5)}}><div style={{display: 'flex', alignItems: 'center', gap: 16}}><div style={{padding: '8px 18px', borderRadius: 20, background: VIO, flexShrink: 0}}><T size={28} color={INK}>{l}</T></div><Hand size={34}>{q}</Hand></div></Abs>
                    </React.Fragment>
                  );
                })}
                {burst > 0 && <Abs x={430} y={960} style={{transform: `scale(${spring(t, 324.4)}) rotate(${-burst * 60}deg)`, opacity: 1 - prog(t, 325.4, 326.0)}}><F n="cle" size={200} /></Abs>}
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* l'intention du leader : la marionnette */}
      {t > 329.0 && t < 355.1 && (() => {
        const cut = prog(t, 346.4, 347.0, easeOut);
        return (
          <AbsoluteFill style={{opacity: win(t, 329.0, 355.1, 0.35)}}>
            <Title>{t < 339.9 ? <>Ce n'est pas la <span style={{color: DIM}}>technique</span>…</> : <>… c'est l'<span style={{color: VIO}}>intention du leader</span></>}</Title>
            {t < 340.0 && (
              <Abs x={140} y={640} w={800} style={{display: 'flex', flexDirection: 'column', gap: 24, opacity: 1 - prog(t, 339.6, 340.0)}}>
                {[['Technique parfaite', 334.06], ['Belle fiche support', 336.26], ['Timing à la seconde', 337.14]].map(([l, at]) => <div key={l as string} style={{padding: '24px 30px', borderRadius: 20, background: 'rgba(255,255,255,0.08)', opacity: pop(t, at as number), position: 'relative'}}><T size={44}>{l}</T>{t > (at as number) + 0.6 && <div style={{position: 'absolute', left: 20, right: 20, top: '50%', height: 8, background: RED, transform: `scaleX(${prog(t, (at as number) + 0.6, (at as number) + 1.0)})`, transformOrigin: '0 50%'}} />}</div>)}
              </Abs>
            )}
            {t > 339.9 && (
              <AbsoluteFill style={{opacity: pop(t, 339.9)}}>
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                  <rect x={330} y={600} width={420} height={24} rx={12} fill="#8A5A2B" opacity={1 - cut} />
                  {[380, 470, 610, 700].map((x, k) => <line key={k} x1={x} y1={624} x2={x + (k < 2 ? 60 : -60)} y2={cut > 0 ? 624 + 120 * (1 - cut) : 920} stroke="#DDD" strokeWidth={3} opacity={1 - cut} />)}
                </svg>
                <Img src={PH('causerie/orateur-d.png')} style={{position: 'absolute', left: 340, top: 880 - Math.sin((t - 340) * 4) * 18 * (1 - cut), height: 520, transform: `rotate(${Math.sin((t - 340) * 3) * 4 * (1 - cut)}deg)`}} />
                {t > 344.7 && t < 346.4 && <Abs x={80} y={720}><Chip c={RED} dark={false} q={spring(t, 344.78)} size={26}>Là parce qu'on l'a obligé ?</Chip></Abs>}
                {t > 346.4 && <Abs x={620} y={720}><Chip c={GREEN} q={spring(t, 346.58)} size={26}>Il y croit vraiment</Chip></Abs>}
                {t > 348.8 && <Abs x={600} y={820}><Hand size={36} color={DIM} style={{opacity: pop(t, 348.82)}}>pour éviter un drame</Hand></Abs>}
                {t > 349.5 && <Row y={1440} gap={12}><Chip c={VIO} dark={false} q={spring(t, 349.54)} size={28}>Sincérité</Chip><Chip c={VIO} dark={false} q={spring(t, 350.3)} size={28}>Authenticité</Chip></Row>}
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* coucher de soleil : rentrer chez soi en un seul morceau */}
      {t > 354.9 && (() => {
        const dusk = prog(t, 355.0, 361.0, easeInOut);
        const walk = prog(t, 357.9, 361.2, easeInOut);
        const door = prog(t, 361.2, 362.0, easeOut);
        return (
          <AbsoluteFill style={{opacity: pop(t, 354.9)}}>
            <AbsoluteFill style={{background: `linear-gradient(180deg, rgb(${80 - 60 * dusk}, ${150 - 120 * dusk}, ${220 - 150 * dusk}) 0%, rgb(${255 - 100 * dusk}, ${180 - 110 * dusk}, ${120 - 60 * dusk}) 60%, #1A1426 100%)`}} />
            <div style={{position: 'absolute', left: 640, top: 900 + dusk * 400, width: 200, height: 200, borderRadius: 100, background: '#FFD27A', boxShadow: '0 0 120px #FFB040', opacity: 1 - dusk * 0.7}} />
            {Array.from({length: 20}, (_, k) => <div key={k} style={{position: 'absolute', left: random(`st${k}`) * 1080, top: 500 + random(`su${k}`) * 500, width: 5, height: 5, borderRadius: 3, background: '#fff', opacity: prog(dusk, 0.6, 1) * Math.abs(Math.sin(t * 2 + k))}} />)}
            <div style={{position: 'absolute', left: 0, right: 0, top: 1380, height: 540, background: '#1A1426'}} />
            {/* la maison */}
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <polygon points="700,1080 900,940 1040,1080" fill="#3A2E48" />
              <rect x={720} y={1080} width={300} height={300} fill="#4A3D5C" />
              <rect x={760} y={1130} width={70} height={70} fill={`rgba(255,200,100,${0.3 + 0.7 * dusk})`} />
              <rect x={860} y={1200} width={100} height={180} fill="#2A2238" />
              <rect x={860} y={1200} width={100 * (1 - door)} height={180} fill="#6E4A2A" />
              {door > 0 && <rect x={860 + 100 * (1 - door)} y={1200} width={100 * door} height={180} fill="rgba(255,210,120,0.95)" />}
            </svg>
            {door > 0 && <div style={{position: 'absolute', left: 700, top: 1380, width: 420, height: 200, background: 'radial-gradient(ellipse at 40% 0%, rgba(255,210,120,0.5), transparent 70%)', opacity: door}} />}
            <Img src={PH('causerie/animatrice-d.png')} style={{position: 'absolute', left: 60 + walk * 560, top: 1395 - 420 * (1 - walk * 0.3) - Math.abs(Math.sin(walk * 20)) * 8, height: 420 * (1 - walk * 0.3), filter: `brightness(${1 - dusk * 0.5})`, transformOrigin: '50% 100%'}} />
            <Abs x={60} y={620} w={960} style={{textAlign: 'center'}}><T size={60} style={{textShadow: '0 6px 20px rgba(0,0,0,0.5)'}}>{t < 357.9 ? 'Une simplicité désarmante' : t < 361.3 ? 'Partir travailler le matin…' : '… et rentrer en un seul morceau.'}</T></Abs>
            {t > 363.4 && <Row y={1460}><Chip c={YEL} q={spring(t, 363.42)} size={32}>La seule chose qui compte</Chip></Row>}
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
      {t > 2.5 && t < 11.9 && <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', opacity: pop(t, 2.5) * (1 - prog(t, 11.5, 11.9))}}><div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '8px 24px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${YEL}`}}><F n="casque" size={40} /><T size={34}>Le Toolbox <span style={{color: YEL}}>Meeting</span></T></div></div>}
      {p && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 226, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: pop(t, p.at + WIPE - 0.3) * (1 - prog(t, p.end - 0.3, p.end))}}>
          <Helmet w={96} stickers={p.n} t={t} />
          <div style={{padding: '8px 22px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${p.c}`}}><T size={32}>{p.n}. {p.l}</T></div>
        </div>
      )}
    </AbsoluteFill>
  );
};

const Bg: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{background: BG}}>
      {/* bandes de balisage jaune et noir en bordure */}
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 26, backgroundImage: `repeating-linear-gradient(-45deg, ${YEL} 0 30px, ${INK} 30px 60px)`, backgroundPosition: `${t * 30}px 0`, opacity: 0.6}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 14, backgroundImage: `repeating-linear-gradient(-45deg, ${YEL} 0 30px, ${INK} 30px 60px)`, backgroundPosition: `${-t * 30}px 0`, opacity: 0.6}} />
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, rgba(255,199,44,0.08), transparent 60%)'}} />
    </AbsoluteFill>
  );
};

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2}, {at: 3.6, s: 'tampon', v: 0.4}, {at: 3.9, s: 'sfx/swish', v: 0.45}, {at: 4.6, s: 'sfx/pop', v: 0.3}, {at: 8.0, s: 'sfx/whoosh', v: 0.3}, {at: 8.2, s: 'sfx/ding', v: 0.3}, {at: 9.4, s: 'sfx/pop', v: 0.25},
  ...PT.flatMap((p) => [{at: p.at, s: 'sfx/click', v: 0.5}, {at: p.at + 0.05, s: 'sfx/swish', v: 0.4}, {at: p.at + 0.7, s: 'bass-hit', v: 0.3}, {at: p.at + WIPE - 0.6, s: 'sfx/swish', v: 0.35}, {at: p.at + WIPE - 0.05, s: 'sfx/click', v: 0.45}]),
  {at: 14.5, s: 'tension', v: 0.12, dur: 2}, {at: 17.0, s: 'tick', v: 0.3}, {at: 22.1, s: 'page', v: 0.4}, ...[23.2, 23.65, 24.1, 24.55].map((at) => ({at, s: 'signature', v: 0.3})), {at: 24.74, s: 'sfx/whoosh', v: 0.25}, {at: 26.34, s: 'sfx/bell', v: 0.45},
  ...Array.from({length: 9}, (_, k) => ({at: 30.5 + k * 0.2, s: 'page', v: 0.15})), {at: 31.54, s: 'sfx/pop', v: 0.25}, {at: 33.06, s: 'deep-hit', v: 0.3},
  {at: 35.0, s: 'sfx/swish', v: 0.3}, {at: 36.7, s: 'sfx/pop', v: 0.2}, {at: 37.9, s: 'sfx/whoosh', v: 0.25}, ...Array.from({length: 7}, (_, k) => ({at: 38.6 + k * 0.08, s: 'sfx/pop', v: 0.15})), {at: 40.3, s: 'sfx/pop', v: 0.3}, {at: 42.74, s: 'sfx/rise', v: 0.3}, {at: 42.76, s: 'sfx/ding', v: 0.25}, {at: 43.5, s: 'sfx/swish', v: 0.3}, {at: 43.9, s: 'sfx/pop', v: 0.3}, {at: 44.82, s: 'sfx/click', v: 0.4}, {at: 45.0, s: 'sfx/thud', v: 0.4},
  {at: 46.5, s: 'sfx/pop', v: 0.3}, {at: 49.6, s: 'sfx/whoosh', v: 0.35}, {at: 52.3, s: 'sfx/pop', v: 0.3}, {at: 52.6, s: 'sfx/click', v: 0.45}, {at: 55.0, s: 'soft-whoosh', v: 0.35, dur: 1.6}, {at: 59.3, s: 'sfx/pop', v: 0.25}, {at: 60.3, s: 'sfx/swish', v: 0.4}, {at: 63.8, s: 'page', v: 0.35}, {at: 67.8, s: 'tampon', v: 0.35},
  ...[75.0, 75.12, 75.24, 75.36, 75.48].map((at) => ({at, s: 'sfx/pop', v: 0.2})), {at: 75.02, s: 'bass-hit', v: 0.35},
  ...BREAK.flatMap((b) => [{at: b, s: 'deep-hit', v: 0.45}, {at: b + 0.05, s: 'sfx/thud', v: 0.35}]),
  {at: 84.8, s: 'sfx/pop', v: 0.3}, {at: 86.82, s: 'notification', v: 0.3}, {at: 95.1, s: 'tick', v: 0.3}, ...Array.from({length: 8}, (_, k) => ({at: 100.3 + k * 0.12, s: 'tick', v: 0.15})), {at: 106.8, s: 'tampon', v: 0.55},
  {at: 112.14, s: 'notification', v: 0.35}, ...Array.from({length: 4}, (_, k) => ({at: 114.0 + k * 0.6, s: 'tick', v: 0.15})), {at: 116.4, s: 'sfx/click', v: 0.25}, {at: 119.6, s: 'sfx/swish', v: 0.25}, {at: 120.7, s: 'alarme', v: 0.2, dur: 1.2},
  {at: 123.2, s: 'sfx/pop', v: 0.3}, {at: 128.7, s: 'sfx/whoosh', v: 0.3}, {at: 133.0, s: 'sfx/swish', v: 0.4}, {at: 134.0, s: 'validation', v: 0.32},
  {at: 135.6, s: 'sfx/whoosh', v: 0.25}, {at: 140.0, s: 'sfx/swish', v: 0.35}, ...[141.9, 142.2, 142.5, 142.8].map((at) => ({at, s: 'sfx/pop', v: 0.22})), {at: 149.7, s: 'sfx/pop', v: 0.3}, {at: 152.82, s: 'sfx/ding', v: 0.25},
  ...[160.78, 162.02, 163.14, 165.26].map((at) => ({at, s: 'sfx/thud', v: 0.2})), {at: 167.6, s: 'page', v: 0.5}, {at: 167.7, s: 'sfx/swish', v: 0.35}, ...[168.42, 169.58, 170.7, 174.82].map((at) => ({at, s: 'sfx/ding', v: 0.22})), {at: 176.3, s: 'sfx/rise', v: 0.25},
  {at: 190.9, s: 'sfx/click', v: 0.3}, ...Array.from({length: 6}, (_, k) => ({at: 191.0 + k * 0.28, s: 'tick', v: 0.2})), {at: 192.74, s: 'tampon', v: 0.4}, {at: 195.3, s: 'page', v: 0.4}, ...Array.from({length: 12}, (_, k) => ({at: 198.9 + k * 0.12, s: 'sfx/pop', v: 0.12})),
  ...[209.06, 215.54, 220.38].flatMap((at) => [{at, s: 'sfx/pop', v: 0.3}, {at: at + 2.2, s: 'sfx/thud', v: 0.3}]), {at: 223.7, s: 'soft-whoosh', v: 0.3, dur: 2}, ...[225.5, 225.7, 225.9].map((at) => ({at, s: 'sfx/pop', v: 0.22})),
  {at: 227.6, s: 'sfx/whoosh', v: 0.3}, ...SEGS.map((sg) => ({at: sg[1], s: 'sfx/click', v: 0.4})), {at: 241.5, s: 'sfx/ding', v: 0.3}, ...[255.66, 256.74, 257.46].map((at) => ({at, s: 'sfx/pop', v: 0.25})),
  {at: 261.7, s: 'sfx/whoosh', v: 0.3}, {at: 264.6, s: 'tension', v: 0.15, dur: 5}, {at: 267.78, s: 'sfx/ding', v: 0.3},
  {at: 274.4, s: 'soft-whoosh', v: 0.45, dur: 2.5}, {at: 276.8, s: 'sfx/swish', v: 0.3}, {at: 279.46, s: 'bass-hit', v: 0.35}, {at: 282.26, s: 'sfx/pop', v: 0.25}, {at: 283.94, s: 'sfx/thud', v: 0.25},
  {at: 290.02, s: 'deep-hit', v: 0.35}, {at: 293.22, s: 'sfx/pop', v: 0.25}, {at: 295.78, s: 'sfx/thud', v: 0.35}, ...LOCKS.map((l) => ({at: l[2], s: 'cadenas', v: 0.4})), {at: 324.4, s: 'sfx/rise', v: 0.3}, {at: 324.7, s: 'bass-hit', v: 0.45}, {at: 324.75, s: 'validation', v: 0.35},
  ...[334.66, 336.86, 337.74].map((at) => ({at, s: 'stylo', v: 0.3})), {at: 339.9, s: 'sfx/whoosh', v: 0.3}, {at: 344.78, s: 'sfx/pop', v: 0.25}, {at: 346.42, s: 'sfx/swish', v: 0.45}, {at: 346.58, s: 'validation', v: 0.3}, {at: 349.54, s: 'sfx/ding', v: 0.25}, {at: 350.3, s: 'sfx/ding', v: 0.25},
  {at: 355.0, s: 'soft-whoosh', v: 0.35, dur: 5}, {at: 361.2, s: 'sfx/click', v: 0.35}, {at: 361.3, s: 'sfx/bell', v: 0.3}, {at: 363.42, s: 'validation', v: 0.32},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Toolbox: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <Bg />
    <Gate from={0} to={12.0}><Hook /></Gate>
    <Gate from={14.2} to={69.8}><P1 /></Gate>
    <Gate from={72.1} to={121.5}><P2 /></Gate>
    <Gate from={123.8} to={181.5}><P3 /></Gate>
    <Gate from={183.8} to={259.1}><P4 /></Gate>
    <Gate from={261.3} to={OUTRO_AT}><P5 /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><TapeWipe p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.3} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-toolbox-meeting-origine.m4a')} trimAfter={s(365.25)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

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
 * « La méthode des 7M » (5 min 02) — voix d'origine, sous-titres recalés mot à mot, photos réelles en polaroïds.
 * Fil rouge inédit : un tableau d'enquête en liège où chaque M est épinglé et relié au problème par un fil rouge, et
 * des transitions à la loupe (la loupe balaie l'écran, révèle la partie suivante puis s'ouvre en plein cadre). Autres
 * techniques nouvelles : jeu de la taupe des problèmes qui reviennent, boomerang, dé du « pas de chance », pansement
 * qui se décolle et points de suture, plongée sous l'iceberg avec sonar, mallette de détective, cartes retournées
 * méthodiquement, carrousel panoramique à 360°, compteur 5M → 7M, squelette de poisson tracé à la lampe, peigne fin,
 * sept portes, pile qui se vide (fatigue), instruction jaunie, thermomètre déréglé, caisse non conforme, variateur de
 * lumière, pied à coulisse mal calibré, flèches de stratégie qui s'alignent, remontée de la rivière jusqu'à la source,
 * saut aux conclusions bloqué, phare sans angle mort, panneaux indicateurs, zoom arrière de l'incident au système.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 301.9;
export const SEPTM_FRAMES = s(OUTRO_AT + 3.8);
const BG = '#1A1714';
const INK = '#1E1A16';
const LIGHT = '#FFF8EC';
const DIM = 'rgba(255,248,236,0.65)';
const CORK = '#B98B5A';
const RED = '#E0383E';
const YEL = '#FFD84D';
const TEAL = '#2EC4B6';
const BLUE = '#4D8DFF';
const ORA = '#FF8A3D';
const PAPER = '#FBF3E1';
const PH = (p: string) => staticFile(p);

type Pt = {n: number; l: string; at: number; end: number; c: string};
const PT: Pt[] = [
  {n: 1, l: 'Un problème, plusieurs causes', at: 10.9, end: 76.5, c: RED},
  {n: 2, l: 'La méthode des 7M', at: 76.6, end: 113.3, c: YEL},
  {n: 3, l: "Les 7 axes d'investigation", at: 113.4, end: 211.0, c: TEAL},
  {n: 4, l: "L'objectif : la cause racine", at: 211.2, end: 268.0, c: BLUE},
  {n: 5, l: 'Synthèse : une philosophie', at: 268.1, end: 301.7, c: ORA},
];
const WIPE = 2.4;
type M = {n: number; l: string; src: string; pos: string; at: number; c: string; ic: string};
const MS: M[] = [
  {n: 1, l: "Main-d'œuvre", src: 'induction/accueil-groupe.jpg', pos: 'center', at: 133.54, c: '#FF6B6B', ic: 'equipe'},
  {n: 2, l: 'Méthodes', src: 'verites/ecriture.jpg', pos: 'center', at: 145.1, c: ORA, ic: 'clipboard'},
  {n: 3, l: 'Machines', src: 'smi/fumees.jpg', pos: 'center', at: 157.34, c: YEL, ic: 'engrenage'},
  {n: 4, l: 'Matières', src: 'septm/entrepot.jpg', pos: 'center', at: 167.18, c: '#7ED957', ic: 'colis'},
  {n: 5, l: 'Milieu', src: 'induction/marquage.jpg', pos: 'center', at: 177.54, c: TEAL, ic: 'usine'},
  {n: 6, l: 'Mesure', src: '', pos: 'center', at: 188.7, c: BLUE, ic: 'equerre'},
  {n: 7, l: 'Management', src: 'induction/reunion-audit.jpg', pos: 'center', at: 200.06, c: '#B48CFF', ic: 'directeur'},
];

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
/** Polaroïd épinglé. */
const Polaroid: React.FC<{src: string; w: number; h: number; label?: string; r?: number; q?: number; pos?: string; pin?: string; children?: React.ReactNode; filter?: string}> = ({src, w, h, label, r = 0, q = 1, pos = 'center', pin = RED, children, filter}) => (
  <div style={{position: 'relative', width: w, padding: 14, paddingBottom: label ? 64 : 14, background: '#FFFDF7', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', transform: `rotate(${r}deg) scale(${q})`, boxSizing: 'content-box'}}>
    <div style={{position: 'relative', width: w, height: h, overflow: 'hidden', background: '#ddd'}}>
      {src && <Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, filter}} />}
      {children}
    </div>
    {label && <Hand size={40} color={INK} style={{position: 'absolute', left: 18, bottom: 12}}>{label}</Hand>}
    <div style={{position: 'absolute', left: '50%', top: -12, width: 30, height: 30, marginLeft: -15, borderRadius: 15, background: `radial-gradient(circle at 35% 35%, #fff8, ${pin})`, boxShadow: '0 4px 6px rgba(0,0,0,0.5)'}} />
  </div>
);
const Sticky: React.FC<{children: React.ReactNode; c?: string; r?: number; q?: number; w?: number}> = ({children, c = YEL, r = 0, q = 1, w = 300}) => (
  <div style={{width: w, padding: '18px 20px', background: c, boxShadow: '0 12px 20px rgba(0,0,0,0.4)', transform: `rotate(${r}deg) scale(${q})`, boxSizing: 'border-box'}}><Hand size={38} color={INK}>{children}</Hand></div>
);
/** Loupe. */
const Lens: React.FC<{size: number; children?: React.ReactNode}> = ({size, children}) => (
  <div style={{position: 'relative', width: size, height: size}}>
    <div style={{position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', border: `${size * 0.06}px solid #3A2E22`, boxShadow: '0 20px 50px rgba(0,0,0,0.6), inset 0 0 40px rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)'}}>{children}</div>
    <div style={{position: 'absolute', left: size * 0.82, top: size * 0.82, width: size * 0.16, height: size * 0.55, borderRadius: size * 0.05, background: '#3A2E22', transform: 'rotate(-45deg)', transformOrigin: '50% 0'}} />
  </div>
);

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: CORK, opacity: 1 - out}}>
      <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(0,0,0,0.12) 2px, transparent 2px)', backgroundSize: '18px 18px'}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[[200, 420], [880, 400], [170, 900], [910, 900], [300, 650], [780, 650], [540, 330]].map(([x, y], k) => <line key={k} x1={x} y1={y} x2={540} y2={700} stroke={RED} strokeWidth={5} />)}
      </svg>
      {MS.map((m, k) => {
        const pos = [[110, 330], [780, 320], [80, 820], [820, 820], [40, 570], [860, 570], [450, 250]][k];
        return <Abs key={m.n} x={pos[0]} y={pos[1]}><div style={{width: 180, padding: '14px 10px', background: m.c, boxShadow: '0 10px 20px rgba(0,0,0,0.4)', transform: `rotate(${(k % 2 ? 4 : -5)}deg)`, textAlign: 'center'}}><T size={40} color={INK}>M{m.n}</T><T size={20} color={INK}>{m.l}</T></div></Abs>;
      })}
      <Abs x={330} y={580}><div style={{width: 420, padding: 24, background: '#FFFDF7', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', transform: 'rotate(-2deg)', textAlign: 'center'}}><T size={30} color={RED}>LE PROBLÈME</T><Hand size={44} color={INK}>qui revient sans cesse…</Hand></div></Abs>
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <AbsoluteFill style={{background: `linear-gradient(180deg, transparent 50%, ${BG} 64%)`}} />
      <Abs x={60} y={1130} w={960} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 32, letterSpacing: 3}}>ENQUÊTE QUALITÉ</div>
        <T size={128} style={{marginTop: 18, textTransform: 'uppercase', letterSpacing: -3}}>La méthode</T>
        <T size={170} color={YEL} style={{letterSpacing: -4}}>des 7M</T>
        <Hand size={50} color={DIM} style={{marginTop: 10}}>trouver enfin la cause racine</Hand>
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : la loupe ─────────── */
const LensWipe: React.FC<{p: Pt}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const sweep = prog(t, a, a + 0.9, easeInOut);
  const grow = prog(t, a + 0.9, a + 1.4, easeIn);
  const out = prog(t, b - 0.4, b, easeIn);
  const R = 220 + grow * 1400;
  const cx = -200 + sweep * 740, cy = 1400 - sweep * 500;
  return (
    <AbsoluteFill style={{zIndex: 55, opacity: 1 - out}}>
      <div style={{position: 'absolute', inset: 0, clipPath: `circle(${R}px at ${cx}px ${cy}px)`, background: `radial-gradient(circle at ${cx}px ${cy}px, ${p.c}, ${BG} 85%)`}}>
        <Abs x={60} y={760} w={960} style={{textAlign: 'center'}}>
          <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: 'rgba(0,0,0,0.35)', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff', letterSpacing: 2}}>PISTE {p.n}/5</div>
          <T size={90} style={{marginTop: 24, textShadow: '0 10px 30px rgba(0,0,0,0.5)'}}>{p.l}</T>
        </Abs>
      </div>
      {grow < 1 && <div style={{position: 'absolute', left: cx - R, top: cy - R, width: R * 2, height: R * 2, borderRadius: '50%', border: `${26 + grow * 30}px solid #3A2E22`, boxShadow: '0 30px 60px rgba(0,0,0,0.6)', opacity: 1 - grow}} />}
      {grow < 0.3 && <div style={{position: 'absolute', left: cx + R * 0.62, top: cy + R * 0.62, width: 60, height: 230, borderRadius: 18, background: '#3A2E22', transform: 'rotate(-45deg)', transformOrigin: '50% 0', opacity: 1 - grow * 3}} />}
    </AbsoluteFill>
  );
};

/* ─────────── Accroche : les problèmes qui reviennent ─────────── */
const Hook: React.FC = () => {
  const t = useT();
  const o = 1 - prog(t, 10.6, 10.9);
  if (o <= 0) return null;
  const holes = [[230, 820], [540, 760], [850, 820], [380, 1060], [700, 1060]];
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Title>{t < 5.5 ? <>Ils <span style={{color: RED}}>reviennent</span> encore et encore</> : <>Et si on trouvait la <span style={{color: YEL}}>vraie source</span> ?</>}</Title>
      {holes.map(([x, y], k) => {
        const ph = ((t - 2.0) * 1.3 + k * 0.37) % 1.6;
        const up = t > 2.0 && t < 6.0 ? Math.max(0, Math.sin(Math.min(1, ph) * Math.PI)) : 0;
        return (
          <React.Fragment key={k}>
            <div style={{position: 'absolute', left: x - 110, top: y + 60, width: 220, height: 60, borderRadius: '50%', background: '#0E0C0A'}} />
            <div style={{position: 'absolute', left: x - 70, top: y - 60 * up + 40, width: 140, height: 120 * up, overflow: 'hidden'}}>
              <div style={{width: 140, height: 120, borderRadius: '70px 70px 10px 10px', background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={70} color="#fff">!</T></div>
            </div>
          </React.Fragment>
        );
      })}
      {t > 2.0 && t < 6.0 && <Abs x={600 + Math.sin(t * 6) * 250} y={540 + Math.abs(Math.sin(t * 6)) * 80} style={{transform: `rotate(${-30 + Math.abs(Math.sin(t * 6)) * 60}deg)`}}><div style={{width: 40, height: 200, background: '#8A5A2B', borderRadius: 10, position: 'relative'}}><div style={{position: 'absolute', left: -60, top: -40, width: 160, height: 80, borderRadius: 20, background: '#5B3A1E'}} /></div></Abs>}
      {t > 6.1 && <Abs x={390} y={760} style={{transform: `scale(${spring(t, 6.18)}) rotate(${prog(t, 7.6, 8.4) * 90}deg)`}}><F n="cle" size={300} /></Abs>}
      {t > 9.0 && <Row y={1200}><Chip c={YEL} q={spring(t, 9.06)}>La véritable source du problème</Chip></Row>}
    </AbsoluteFill>
  );
};

/* ─────────── Piste 1 : un problème, plusieurs causes ─────────── */
const P1: React.FC = () => {
  const t = useT();
  const o = win(t, 13.3, 76.5, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* le boomerang */}
      {t < 24.2 && (() => {
        const p = ((t - 13.4) / 2.6) % 1;
        const ang = p * Math.PI * 2;
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 23.8, 24.2)}}>
            <Title>Un problème… qui <span style={{color: RED}}>réapparaît</span></Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><ellipse cx={540} cy={900} rx={380} ry={200} fill="none" stroke="rgba(255,248,236,0.2)" strokeWidth={4} strokeDasharray="14 12" /></svg>
            <Abs x={540 + Math.cos(ang + Math.PI) * 380 - 70} y={900 + Math.sin(ang + Math.PI) * 200 - 40} style={{transform: `rotate(${t * 900}deg)`}}><svg width={140} height={80} viewBox="0 0 140 80"><path d="M10 70 Q70 -10 130 70 Q70 30 10 70 Z" fill={RED} /></svg></Abs>
            <Abs x={90} y={850} style={{transform: `scale(${spring(t, 13.5)})`}}><F n="pensif" size={180} /></Abs>
            {t > 15.3 && <Abs x={720} y={680}><Chip c={RED} dark={false} q={spring(t, 15.34)} size={30}>Hop, il revient !</Chip></Abs>}
            {t > 16.7 && <Row y={1180} gap={12}>{[['Production', 16.74], ['Gestion de projet', 17.86], ['Vie d’équipe', 20.06]].map(([l, at]) => t > (at as number) && <Chip key={l as string} c={LIGHT} q={spring(t, at as number)} size={28}>{l}</Chip>)}</Row>}
            {t > 21.3 && <Abs x={460} y={1290} style={{transform: `scale(${spring(t, 21.3)})`}}><div style={{position: 'relative'}}><div style={{position: 'absolute', left: -40, top: -40, width: 240, height: 240, borderRadius: '50%', background: `radial-gradient(${YEL}88, transparent 70%)`, opacity: 0.5 + 0.5 * Math.sin(t * 10)}} /><F n="gyrophare" size={160} /></div></Abs>}
          </AbsoluteFill>
        );
      })()}
      {/* le dé, le pansement et les points de suture */}
      {t > 24.0 && t < 42.7 && (() => {
        const roll = prog(t, 30.0, 30.8, easeOut);
        const peel = prog(t, 38.0, 39.0, easeInOut);
        const stitch = prog(t, 39.2, 40.4, (x) => x);
        return (
          <AbsoluteFill style={{opacity: win(t, 24.0, 42.7, 0.4)}}>
            <Title>{t < 35.5 ? <>Une cause plus <span style={{color: RED}}>profonde</span> ?</> : <>Traiter le <span style={{color: RED}}>symptôme</span> ne suffit pas</>}</Title>
            {t < 35.6 && (
              <AbsoluteFill style={{opacity: 1 - prog(t, 35.2, 35.6)}}>
                {t > 28.5 && <Abs x={420} y={650} w={240} h={240} style={{borderRadius: 40, background: LIGHT, transform: `rotate(${(1 - roll) * 720}deg) translateX(${(1 - roll) * -400}px)`, boxShadow: '0 20px 40px rgba(0,0,0,0.5)'}}>{[[60, 60], [180, 180], [120, 120]].map(([x, y], k) => <div key={k} style={{position: 'absolute', left: x - 22, top: y - 22, width: 44, height: 44, borderRadius: 22, background: RED}} />)}</Abs>}
                {t > 30.3 && <Row y={960}><Chip c="#5A4E44" dark={false} q={spring(t, 30.3)}>Pas de chance ?</Chip></Row>}
                {t > 33.4 && <Row y={1080}><Chip c={RED} dark={false} q={spring(t, 33.42)}>Ou on ne traite que les symptômes ?</Chip></Row>}
              </AbsoluteFill>
            )}
            {t > 35.4 && (
              <AbsoluteFill style={{opacity: pop(t, 35.4)}}>
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                  <rect x={140} y={620} width={800} height={520} rx={40} fill="#E8B48C" />
                  <path d="M260 880 L380 860 L470 900 L560 860 L660 900 L760 870 L830 880" stroke="#8A2A22" strokeWidth={18} fill="none" strokeLinecap="round" />
                  {stitch > 0 && Array.from({length: 8}, (_, k) => k / 8 < stitch && <line key={k} x1={290 + k * 70} y1={840} x2={310 + k * 70} y2={920} stroke="#2A2A2A" strokeWidth={8} strokeLinecap="round" />)}
                </svg>
                <div style={{position: 'absolute', left: 300, top: 790, width: 480, height: 180, borderRadius: 40, background: '#F2C9A0', boxShadow: '0 10px 20px rgba(0,0,0,0.3)', transformOrigin: '100% 50%', transform: `rotate(${-peel * 40}deg) translate(${peel * 400}px, ${-peel * 300}px)`, opacity: 1 - peel, backgroundImage: 'radial-gradient(rgba(0,0,0,0.12) 3px, transparent 3px)', backgroundSize: '24px 24px'}}><div style={{position: 'absolute', left: 150, top: 30, width: 180, height: 120, borderRadius: 16, background: '#FBE7D2'}} /></div>
                {t > 36.3 && t < 39.2 && <Abs x={110} y={1180}><Chip c="#5A4E44" dark={false} q={spring(t, 36.34)} size={30}>Un simple pansement…</Chip></Abs>}
                {t > 39.2 && <Abs x={540} y={1180}><Chip c={TEAL} q={spring(t, 39.2)} size={30}>… ou des points de suture</Chip></Abs>}
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* plongée sous l'iceberg + sonar */}
      {t > 42.5 && t < 61.7 && (() => {
        const dive = prog(t, 45.8, 48.4, easeInOut);
        const ping = t > 59.1 ? ((t - 59.1) * 0.8) % 1 : -1;
        return (
          <AbsoluteFill style={{opacity: win(t, 42.5, 61.7, 0.4)}}>
            <Title>{t < 54.9 ? <>La <span style={{color: TEAL}}>cause racine</span> est cachée</> : <>Il faut un <span style={{color: YEL}}>outil</span> pour cartographier</>}</Title>
            <Abs x={60} y={570} w={960} h={900} style={{overflow: 'hidden', borderRadius: 30, background: 'linear-gradient(180deg, #BFE3F2 0%, #BFE3F2 30%, #1C5E86 30%, #07243A 100%)'}}>
              <div style={{position: 'absolute', left: 0, top: -dive * 380, width: 960, height: 1400}}>
                <svg width={960} height={1400}>
                  <path d="M380 270 L470 120 L560 180 L620 270 Z" fill="#F4FBFF" />
                  <path d="M300 270 L660 270 L800 520 L760 860 L560 1080 L340 1000 L170 700 L210 420 Z" fill="#A9D8EE" opacity={0.9} />
                  <line x1={0} y1={270} x2={960} y2={270} stroke="#fff" strokeWidth={4} />
                </svg>
                {t > 50.4 && <div style={{position: 'absolute', left: 640, top: 130, opacity: pop(t, 50.4)}}><Chip c={LIGHT} size={26}>La pointe : le symptôme</Chip></div>}
                {t > 47.0 && <div style={{position: 'absolute', left: 330, top: 900, opacity: pop(t, 47.0)}}><Chip c={RED} dark={false} size={32}>Cause racine</Chip></div>}
                {ping >= 0 && <div style={{position: 'absolute', left: 480 - ping * 700, top: 700 - ping * 700, width: ping * 1400, height: ping * 1400, borderRadius: '50%', border: `6px solid ${YEL}`, opacity: 1 - ping}} />}
                {t > 59.6 && [[330, 560], [700, 640], [460, 820], [250, 760]].map(([x, y], k) => <div key={k} style={{position: 'absolute', left: x, top: y, width: 26, height: 26, borderRadius: 13, background: YEL, boxShadow: `0 0 20px ${YEL}`, transform: `scale(${spring(t, 59.7 + k * 0.2)})`}} />)}
              </div>
            </Abs>
          </AbsoluteFill>
        );
      })()}
      {/* la mallette de détective */}
      {t > 61.5 && (() => {
        const lid = prog(t, 66.5, 67.6, easeOut);
        return (
          <AbsoluteFill style={{opacity: pop(t, 61.5)}}>
            <Title>Une <span style={{color: YEL}}>mallette de détective</span></Title>
            <Abs x={0} y={580} w={1080} style={{textAlign: 'center', opacity: pop(t, 62.8)}}><T size={80} color={YEL}>La méthode des 7M</T></Abs>
            <Abs x={170} y={760} w={740} h={560} style={{perspective: 1500}}>
              <div style={{position: 'absolute', left: 0, top: 260, width: 740, height: 300, borderRadius: 24, background: '#5B3A1E', border: '8px solid #3A2410'}}>
                {lid > 0.5 && MS.map((m, k) => <div key={m.n} style={{position: 'absolute', left: 30 + k * 100, top: 30, width: 86, height: 220, borderRadius: 10, background: m.c, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 12, boxSizing: 'border-box', transform: `translateY(${(1 - spring(t, 67.4 + k * 0.12)) * 200}px)`}}><T size={30} color={INK}>M{m.n}</T></div>)}
              </div>
              <div style={{position: 'absolute', left: 0, top: 0, width: 740, height: 270, borderRadius: 24, background: '#6E4626', border: '8px solid #3A2410', transformOrigin: '50% 100%', transform: `rotateX(${lid * 110}deg)`}}><div style={{position: 'absolute', left: 320, top: -40, width: 100, height: 50, borderRadius: '30px 30px 0 0', border: '12px solid #3A2410', borderBottom: 'none'}} /></div>
              {lid > 0.8 && <div style={{position: 'absolute', left: 560, top: 120, transform: `scale(${spring(t, 68.0)}) rotate(-20deg)`}}><F n="loupe" size={140} /></div>}
            </Abs>
            {t > 70.5 && <Abs x={0} y={1350} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 12}}>{[['Enquête de A à Z', 70.5], ['Structurée', 73.0], ['Aucune piste oubliée', 74.14]].map(([l, at]) => t > (at as number) && <Chip key={l as string} c={YEL} q={spring(t, at as number)} size={28}>{l}</Chip>)}</Abs>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Piste 2 : la méthode ─────────── */
const P2: React.FC = () => {
  const t = useT();
  const o = win(t, 79.0, 113.3, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* cartes : première cause vs exploration méthodique */}
      {t < 92.1 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 91.7, 92.1)}}>
          <Title>{t < 86.8 ? <>Ne pas se jeter sur la <span style={{color: RED}}>première cause</span></> : <>Explorer <span style={{color: YEL}}>méthodiquement</span></>}</Title>
          <Abs x={140} y={620} w={800} h={700} style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20}}>
            {Array.from({length: 12}, (_, k) => {
              const flip = prog(t, 86.8 + k * 0.22, 87.2 + k * 0.22, easeInOut);
              const grabbed = k === 0 && t > 85.1 && t < 86.8;
              return (
                <div key={k} style={{height: 210, perspective: 800}}>
                  <div style={{width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d', transform: `rotateY(${flip * 180}deg) translateY(${grabbed ? -40 : 0}px) rotate(${grabbed ? -8 : 0}deg)`}}>
                    <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: 16, background: `repeating-linear-gradient(45deg, ${RED} 0 12px, #B52A2F 12px 24px)`, border: `5px solid ${grabbed ? YEL : '#fff'}`}} />
                    <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: 16, background: PAPER, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Hand size={34} color={INK}>piste {k + 1}</Hand></div>
                  </div>
                </div>
              );
            })}
          </Abs>
          {t > 78.4 && t < 84.1 && <Row y={1360}><Chip c={LIGHT} q={spring(t, 78.4)} size={30}>Une méthode d'analyse issue de la qualité</Chip></Row>}
          {t > 85.1 && t < 86.8 && <Abs x={130} y={560}><Chip c={RED} dark={false} q={spring(t, 85.14)} size={28}>Trop vite !</Chip></Abs>}
          {t > 89.7 && <Row y={1360}><Chip c={YEL} q={spring(t, 89.78)} size={30}>Toutes les origines possibles</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* carrousel panoramique 360° */}
      {t > 91.9 && t < 104.4 && (() => {
        const imgs = ['induction/accueil-groupe.jpg', 'verites/ecriture.jpg', 'smi/fumees.jpg', 'septm/entrepot.jpg', 'induction/marquage.jpg', 'induction/reunion-audit.jpg', 'induction/technicien-hse.jpg', 'verites/plans.jpg'];
        const rot = (t - 92) * 30;
        const n = Math.round(5 + 2 * prog(t, 98.0, 99.4));
        return (
          <AbsoluteFill style={{opacity: win(t, 91.9, 104.4, 0.35)}}>
            <Title>{t < 94.8 ? <>Une <span style={{color: YEL}}>vision à 360°</span></> : <>De <span style={{color: DIM}}>5M</span> à <span style={{color: YEL}}>7M</span></>}</Title>
            <Abs x={0} y={600} w={1080} h={520} style={{perspective: 1400}}>
              <div style={{position: 'absolute', left: 540, top: 260, transformStyle: 'preserve-3d', transform: `rotateX(-8deg) rotateY(${rot}deg)`}}>
                {imgs.map((src, k) => <div key={k} style={{position: 'absolute', left: -150, top: -110, width: 300, height: 220, borderRadius: 14, overflow: 'hidden', border: '5px solid #fff', transform: `rotateY(${k * 45}deg) translateZ(400px)`, backfaceVisibility: 'hidden'}}><Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>)}
              </div>
            </Abs>
            {t > 95.8 && <Abs x={0} y={1120} w={1080} style={{textAlign: 'center', opacity: pop(t, 95.9)}}><T size={180} color={n === 7 ? YEL : LIGHT}>{n}M</T></Abs>}
            {t > 99.4 && <Row y={1360}><Chip c={YEL} q={spring(t, 99.4)} size={28}>+ Mesure</Chip><Chip c={YEL} q={spring(t, 99.7)} size={28}>+ Management</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* squelette de poisson tracé à la lampe */}
      {t > 104.2 && (() => {
        const d = prog(t, 106.2, 109.4, (x) => x);
        return (
          <AbsoluteFill style={{opacity: pop(t, 104.2)}}>
            <Title>Le <span style={{color: YEL}}>diagramme d'Ishikawa</span></Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <line x1={80} y1={980} x2={80 + 800 * d} y2={980} stroke={LIGHT} strokeWidth={12} strokeLinecap="round" />
              {[0, 1, 2, 3].map((k) => { const x = 200 + k * 180; const p = prog(d, 0.2 + k * 0.15, 0.4 + k * 0.15); return <g key={k}><line x1={x} y1={980} x2={x - 90 * p} y2={980 - 220 * p} stroke={MS[k].c} strokeWidth={10} strokeLinecap="round" /><line x1={x} y1={980} x2={x - 90 * p} y2={980 + 220 * p} stroke={MS[(k + 4) % 7].c} strokeWidth={10} strokeLinecap="round" /></g>; })}
              <path d="M880 900 L1000 980 L880 1060 Z" fill={RED} opacity={prog(d, 0.8, 1)} />
              <circle cx={80 + 800 * d} cy={980} r={30} fill={YEL} opacity={d > 0 && d < 1 ? 0.7 : 0} style={{filter: `drop-shadow(0 0 30px ${YEL})`}} />
            </svg>
            {t > 107.2 && <Abs x={760} y={1080}><Hand size={36} color={DIM} style={{opacity: pop(t, 107.2)}}>« arête de poisson »</Hand></Abs>}
            {t > 110.3 && <Row y={1330} gap={12}><Chip c={YEL} q={spring(t, 110.34)} size={28}>Classer</Chip><Chip c={TEAL} q={spring(t, 111.2)} size={28}>Visualiser les causes</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Piste 3 : les 7 axes sur le tableau d'enquête ─────────── */
const SLOT = (k: number) => ({x: 40 + k * 145, y: 560});
const Board: React.FC<{t: number}> = ({t}) => (
  <Abs x={30} y={540} w={1020} h={250} style={{borderRadius: 18, background: CORK, boxShadow: 'inset 0 0 40px rgba(0,0,0,0.4)', backgroundImage: 'radial-gradient(rgba(0,0,0,0.12) 2px, transparent 2px)', backgroundSize: '16px 16px'}}>
    <svg width={1020} height={250} style={{position: 'absolute', inset: 0}}>
      {MS.map((m, k) => t > m.at + 0.6 && <line key={k} x1={SLOT(k).x + 30} y1={60} x2={510} y2={225} stroke={RED} strokeWidth={4} opacity={pop(t, m.at + 0.6)} />)}
    </svg>
    {MS.map((m, k) => (
      <div key={m.n} style={{position: 'absolute', left: SLOT(k).x - 20, top: 22, width: 120, height: 130, background: t > m.at ? m.c : 'rgba(0,0,0,0.15)', border: t > m.at ? 'none' : '3px dashed rgba(0,0,0,0.35)', boxShadow: t > m.at ? '0 8px 14px rgba(0,0,0,0.4)' : 'none', transform: `rotate(${(k % 2 ? 3 : -3)}deg) scale(${t > m.at ? spring(t, m.at + 0.3) : 1})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box'}}>
        <T size={40} color={t > m.at ? INK : 'rgba(0,0,0,0.4)'}>M{m.n}</T>
        {t > m.at && <T size={16} color={INK} style={{textAlign: 'center'}}>{m.l}</T>}
      </div>
    ))}
    <div style={{position: 'absolute', left: 430, top: 190, width: 160, padding: '6px 0', background: '#FFFDF7', textAlign: 'center', boxShadow: '0 6px 10px rgba(0,0,0,0.4)'}}><T size={22} color={RED}>LE PROBLÈME</T></div>
  </Abs>
);
const Detail: React.FC<{m: M; until: number; children?: React.ReactNode; notes: [string, number][]; photoChildren?: React.ReactNode; filter?: string}> = ({m, until, children, notes, photoChildren, filter}) => {
  const t = useT();
  if (t < m.at - 0.2 || t > until) return null;
  return (
    <AbsoluteFill style={{opacity: win(t, m.at - 0.2, until, 0.3)}}>
      <Abs x={60} y={830} style={{transform: `translateX(${(1 - spring(t, m.at, 8, 14)) * -700}px)`}}>
        {m.src ? <Polaroid src={m.src} w={500} h={400} label={`M${m.n} · ${m.l}`} r={-3} pos={m.pos} pin={m.c} filter={filter}>{photoChildren}</Polaroid> : <Polaroid src="" w={500} h={400} label={`M${m.n} · ${m.l}`} r={-3} pin={m.c}>{photoChildren}</Polaroid>}
      </Abs>
      <Abs x={630} y={840} w={420} style={{display: 'flex', flexDirection: 'column', gap: 22}}>
        {notes.map(([n, at], k) => t > at && <Sticky key={n} c={[YEL, '#FFB3C7', '#B8F2C8', '#BFD7FF'][k % 4]} r={(k % 2 ? 3 : -2)} q={spring(t, at)} w={380}>{n}</Sticky>)}
      </Abs>
      {children}
    </AbsoluteFill>
  );
};
const P3: React.FC = () => {
  const t = useT();
  const o = win(t, 115.8, 211.0, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Board t={t} />
      {/* intro des axes : peigne fin + 7 portes */}
      {t < 132.6 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 132.2, 132.6)}}>
          {t < 126.0 ? (
            <AbsoluteFill>
              <Abs x={0} y={880} w={1080} style={{textAlign: 'center'}}><T size={70}>7 familles de causes</T><Hand size={44} color={DIM} style={{marginTop: 10}}>à passer au peigne fin</Hand></Abs>
              {t > 124.9 && <Abs x={-300 + (t - 124.9) * 1100} y={1100}><svg width={400} height={160}><rect x={0} y={0} width={400} height={40} rx={10} fill={ORA} />{Array.from({length: 20}, (_, k) => <rect key={k} x={8 + k * 19.5} y={40} width={10} height={110} rx={4} fill={ORA} />)}</svg></Abs>}
            </AbsoluteFill>
          ) : (
            <AbsoluteFill style={{opacity: pop(t, 126.0)}}>
              <Abs x={0} y={850} w={1080} style={{textAlign: 'center'}}><T size={56}>7 <span style={{color: TEAL}}>portes d'entrée</span></T></Abs>
              <Row y={970} gap={14}>{MS.map((m, k) => { const open = prog(t, 129.2 + k * 0.15, 129.7 + k * 0.15, easeOut); return <div key={m.n} style={{width: 120, height: 220, background: '#0E0C0A', borderRadius: '60px 60px 0 0', position: 'relative', perspective: 600}}><div style={{position: 'absolute', inset: 0, borderRadius: '60px 60px 0 0', background: m.c, transformOrigin: '0% 50%', transform: `rotateY(${-open * 55}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={36} color={INK}>M{m.n}</T></div></div>; })}</Row>
            </AbsoluteFill>
          )}
        </AbsoluteFill>
      )}
      {/* M1 main-d'œuvre : la pile qui se vide */}
      <Detail m={MS[0]} until={144.4} notes={[['La formation suffisait ?', 136.58], ['Opérateur fatigué ?', 138.82], ["Assez d'expérience ?", 141.86]]}>
        {t > 138.8 && t < 141.8 && <Abs x={470} y={1300} style={{transform: `scale(${spring(t, 138.9)})`}}><div style={{width: 140, height: 70, border: '6px solid #fff', borderRadius: 12, position: 'relative'}}><div style={{position: 'absolute', left: 4, top: 4, bottom: 4, width: `${Math.max(8, 90 - (t - 138.9) * 40)}%`, background: t > 140 ? RED : '#7ED957', borderRadius: 6}} /><div style={{position: 'absolute', right: -16, top: 18, width: 10, height: 22, background: '#fff', borderRadius: 3}} /></div></Abs>}
      </Detail>
      {/* M2 méthodes : l'instruction jaunie */}
      <Detail m={MS[1]} until={156.6} notes={[['Claires ?', 147.42], ['À jour ?', 148.26], ['Appliquées sur le terrain ?', 150.58]]}>
        {t > 153.0 && <Abs x={250} y={1210} w={560} h={270} style={{background: '#E8D6A4', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', padding: 24, boxSizing: 'border-box', transform: `rotate(-4deg) scale(${spring(t, 153.06)})`, backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(120,80,20,0.25), transparent 40%)'}}><T size={30} color="#5A4630">INSTRUCTION DE MONTAGE</T><Hand size={30} color="#5A4630">version 1 — très ancienne</Hand>{[0.9, 0.7, 0.8].map((w, k) => <div key={k} style={{marginTop: 14, height: 12, borderRadius: 6, background: '#C9B282', width: `${w * 100}%`}} />)}<div style={{position: 'absolute', right: 20, bottom: 20, transform: `rotate(-12deg) scale(${spring(t, 153.9)})`, border: `6px solid ${RED}`, borderRadius: 10, padding: '2px 14px'}}><T size={38} color={RED}>DÉPASSÉE</T></div></Abs>}
      </Detail>
      {/* M3 machines : thermomètre déréglé, outil usé, maintenance sautée */}
      <Detail m={MS[2]} until={166.6} notes={[['Capteur de température déréglé', 160.78], ['Outil usé', 162.46], ['Maintenance préventive sautée', 163.8]]}>
        {t > 160.7 && <Abs x={420} y={1290} style={{transform: `scale(${spring(t, 160.8)})`}}><svg width={180} height={180} viewBox="-50 -50 100 100"><circle r={44} fill="#fff" /><path d="M-35 20 A40 40 0 1 1 35 20" fill="none" stroke="#ddd" strokeWidth={8} /><line x1={0} y1={0} x2={34 * Math.sin(0.8 + Math.sin(t * 9) * 1.2)} y2={-34 * Math.cos(0.8 + Math.sin(t * 9) * 1.2)} stroke={RED} strokeWidth={5} strokeLinecap="round" /><circle r={6} fill={INK} /></svg></Abs>}
      </Detail>
      {/* M4 matières : la caisse non conforme */}
      <Detail m={MS[3]} until={177.4} notes={[['Lot de matière non conforme', 170.7], ['Composant défectueux', 172.9], ["La cause vient de l'extérieur", 175.46]]}>
        {t > 170.6 && <Row y={1300} gap={14}>{[0, 1, 2, 3].map((k) => <div key={k} style={{width: 100, height: 90, background: k === 2 ? RED : '#A87B4F', border: '5px solid #6E4A28', transform: `scale(${spring(t, 170.7 + k * 0.1)}) rotate(${k === 2 ? Math.sin(t * 12) * 4 : 0}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k === 2 && <T size={44} color="#fff">✕</T>}</div>)}{t > 176.2 && <div style={{transform: `translateX(${(1 - pop(t, 176.26, 0.8)) * 400}px)`}}><F n="camion" size={100} /></div>}</Row>}
      </Detail>
      {/* M5 milieu : variateur de lumière, bruit, désordre */}
      <Detail m={MS[4]} until={187.9} notes={[['Éclairage trop faible', 182.3], ['Trop de bruit', 183.3], ['Poste mal organisé', 183.78]]} filter={t > 182.3 ? `brightness(${1 - 0.6 * prog(t, 182.3, 183.0)})` : undefined}
        photoChildren={t > 183.3 ? <svg width={500} height={400} style={{position: 'absolute', inset: 0}}>{Array.from({length: 3}, (_, k) => { const r = ((t * 1.5 + k * 0.33) % 1) * 260; return <circle key={k} cx={250} cy={200} r={r} fill="none" stroke={YEL} strokeWidth={6} opacity={1 - r / 260} />; })}</svg> : undefined}>
        {t > 185.5 && <Row y={1440}><Chip c={RED} dark={false} q={spring(t, 185.54)} size={28}>Des erreurs en série</Chip></Row>}
      </Detail>
      {/* M6 mesure : pied à coulisse mal calibré */}
      <Detail m={MS[5]} until={198.6} notes={[['Comment contrôle-t-on la qualité ?', 189.54], ['Instrument pas calibré', 193.74], ['Décisions forcément fausses', 197.1]]}
        photoChildren={(
          <div style={{position: 'absolute', inset: 0, background: '#2B2620'}}>
            <svg width={500} height={400} style={{position: 'absolute', inset: 0}}>
              <rect x={40} y={150} width={420} height={50} fill="#C9CED6" />
              {Array.from({length: 40}, (_, k) => <line key={k} x1={50 + k * 10} y1={150} x2={50 + k * 10} y2={k % 5 ? 165 : 175} stroke="#333" strokeWidth={2} />)}
              <rect x={60} y={90} width={30} height={160} fill="#AEB4BE" />
              <rect x={220 + Math.sin(t * 1.5) * 20} y={110} width={110} height={130} rx={10} fill="#AEB4BE" />
              <rect x={230 + Math.sin(t * 1.5) * 20} y={120} width={90} height={44} rx={6} fill="#1D2B1F" />
              <text x={275 + Math.sin(t * 1.5) * 20} y={152} textAnchor="middle" fontFamily="monospace" fontWeight={700} fontSize={26} fill="#7CFF8E">{t > 193.7 ? (25 + Math.sin(t * 7) * 0.4).toFixed(2) : '25.00'}</text>
            </svg>
            {t > 193.7 && <div style={{position: 'absolute', right: 16, bottom: 16, transform: `rotate(-10deg) scale(${spring(t, 193.8)})`, border: `5px solid ${RED}`, borderRadius: 10, padding: '2px 12px', background: 'rgba(0,0,0,0.6)'}}><T size={28} color={RED}>NON CALIBRÉ</T></div>}
          </div>
        )} />
      {/* M7 management : flèches qui s'alignent */}
      <Detail m={MS[6]} until={211.0} notes={[['Communication fluide ?', 203.3], ['Pression des délais ?', 204.7], ['Raccourcis dangereux ?', 206.18], ['Stratégie alignée ?', 207.62]]}>
        {t > 201.7 && (() => {
          const al = prog(t, 208.4, 209.6, easeInOut);
          return <Abs x={160} y={1300} w={400} h={160} style={{opacity: pop(t, 201.8)}}>{[0, 1, 2, 3].map((k) => <div key={k} style={{position: 'absolute', left: 20 + k * 90, top: 60, transform: `rotate(${((random(`ar${k}`) - 0.5) * 160) * (1 - al)}deg)`}}><svg width={70} height={40}><path d="M0 20 L50 20 M40 6 L60 20 L40 34" stroke={al > 0.95 ? '#7ED957' : '#B48CFF'} strokeWidth={8} fill="none" strokeLinecap="round" /></svg></div>)}<Hand size={30} color={DIM} style={{position: 'absolute', left: 20, top: 110}}>l'axe qui chapeaute tout</Hand></Abs>;
        })()}
      </Detail>
    </AbsoluteFill>
  );
};

/* ─────────── Piste 4 : la cause racine ─────────── */
const P4: React.FC = () => {
  const t = useT();
  const o = win(t, 213.6, 268.0, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* remonter la rivière jusqu'à la source */}
      {t < 226.1 && (() => {
        const up = prog(t, 220.0, 224.6, easeInOut);
        const path = 'M540 1480 C 300 1380 820 1250 600 1120 C 380 990 760 880 560 760 C 420 680 600 620 540 590';
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 225.7, 226.1)}}>
            <Title>{t < 219.2 ? <>Pas une simple <span style={{color: DIM}}>liste</span></> : <>Remonter jusqu'à la <span style={{color: BLUE}}>source</span></>}</Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <path d={path} stroke="#2B5E8C" strokeWidth={70} fill="none" strokeLinecap="round" />
              <path d={path} stroke="#5AA9FF" strokeWidth={20} fill="none" strokeDasharray="30 40" strokeDashoffset={t * 120} strokeLinecap="round" opacity={0.8} />
              <path d={path} stroke={YEL} strokeWidth={10} fill="none" pathLength={1} strokeDasharray={`${up} 1`} />
            </svg>
            {t > 223.4 && <Abs x={460} y={500} style={{transform: `scale(${spring(t, 223.42)})`}}><div style={{width: 160, height: 160, borderRadius: 80, background: `radial-gradient(${YEL}, ${ORA})`, boxShadow: `0 0 60px ${YEL}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={30} color={INK} style={{textAlign: 'center'}}>CAUSE RACINE</T></div></Abs>}
            {t > 216.3 && t < 219.2 && <Abs x={380} y={900} style={{transform: `scale(${spring(t, 216.3)}) rotate(-6deg)`, opacity: 1 - prog(t, 218.8, 219.2)}}><Sticky>✓ liste… pour le plaisir ?</Sticky></Abs>}
            {t > 221.1 && <Abs x={90} y={1360}><Chip c={BLUE} dark={false} q={spring(t, 221.14)} size={28}>Les 7M comme guide</Chip></Abs>}
          </AbsoluteFill>
        );
      })()}
      {/* saut aux conclusions bloqué, puis la cause évidente qui n'est qu'un symptôme */}
      {t > 225.9 && t < 236.6 && (() => {
        const jump = prog(t, 229.9, 230.9, easeOut);
        const flip = prog(t, 234.6, 235.3, easeInOut);
        return (
          <AbsoluteFill style={{opacity: win(t, 225.9, 236.6, 0.35)}}>
            <Title>La <span style={{color: BLUE}}>discipline</span> de la méthode</Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><line x1={60} y1={1150} x2={1020} y2={1150} stroke="rgba(255,248,236,0.3)" strokeWidth={6} /></svg>
            <Abs x={150 + jump * 220} y={980 - Math.sin(jump * Math.PI) * 160}><F n="ouvrier" size={170} /></Abs>
            {t > 229.9 && <Abs x={470} y={880} w={40} h={270} style={{background: `repeating-linear-gradient(180deg, ${RED} 0 30px, #fff 30px 60px)`, borderRadius: 8, transform: `scaleY(${spring(t, 229.9)})`, transformOrigin: '50% 100%'}} />}
            {t > 229.9 && <Abs x={540} y={840}><Chip c={RED} dark={false} q={spring(t, 230.0)} size={26}>Pas de saut aux conclusions</Chip></Abs>}
            {t > 231.5 && (
              <Abs x={600} y={960} w={300} h={180} style={{perspective: 900}}>
                <div style={{width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d', transform: `rotateY(${flip * 180}deg) scale(${spring(t, 231.6)})`}}>
                  <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: 16, background: PAPER, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={34} color={INK}>Cause évidente</T></div>
                  <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: 16, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={34} color="#fff">Autre symptôme</T></div>
                </div>
              </Abs>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* le phare : aucun angle mort */}
      {t > 236.4 && t < 243.3 && (
        <AbsoluteFill style={{opacity: win(t, 236.4, 243.3, 0.35)}}>
          <Title>Aucun <span style={{color: BLUE}}>angle mort</span></Title>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            {MS.map((m, k) => { const a0 = (k / 7) * Math.PI * 2 + t * 0.4, a1 = ((k + 1) / 7) * Math.PI * 2 + t * 0.4; const R = 420 * prog(t, 236.8 + k * 0.15, 237.4 + k * 0.15); return <path key={k} d={`M540 990 L${540 + R * Math.cos(a0)} ${990 + R * Math.sin(a0)} A${R} ${R} 0 0 1 ${540 + R * Math.cos(a1)} ${990 + R * Math.sin(a1)} Z`} fill={m.c} opacity={0.5} />; })}
            <circle cx={540} cy={990} r={90} fill={LIGHT} />
          </svg>
          <Abs x={490} y={940}><F n="yeux" size={100} /></Abs>
          {t > 239.2 && <Row y={1440}><Chip c={BLUE} dark={false} q={spring(t, 239.22)} size={30}>Une vision complète à 360°</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* partout : production, informatique, ISO 9001 */}
      {t > 243.1 && t < 259.4 && (
        <AbsoluteFill style={{opacity: win(t, 243.1, 259.4, 0.35)}}>
          <Title>Utilisée <span style={{color: BLUE}}>partout</span></Title>
          {t > 247.1 && <Abs x={80} y={590}><Polaroid src="induction/operatrice.jpg" w={420} h={320} label="Produit défectueux" r={-4} q={spring(t, 247.14)} pos="50% 25%" /></Abs>}
          {t > 250.3 && <Abs x={560} y={640} w={440} h={330} style={{borderRadius: 18, background: '#0D1117', border: '5px solid #fff', padding: 20, boxSizing: 'border-box', transform: `rotate(3deg) scale(${spring(t, 250.38)})`}}><div style={{fontFamily: 'monospace', fontSize: 24, color: '#7EE787', whiteSpace: 'pre'}}>{'if (stock < 0) {\n  bug();  // ?\n}'}</div><div style={{position: 'absolute', right: 20, bottom: 16}}><F n="bug" size={110} /></div><Hand size={34} color={LIGHT} style={{position: 'absolute', left: 20, bottom: 16}}>Bug informatique</Hand></Abs>}
          {t > 252.9 && (
            <Abs x={300} y={1060} w={480} h={340} style={{opacity: pop(t, 252.9)}}>
              {['Plan', 'Do', 'Check', 'Act'].map((l, k) => { const a = (k / 4) * Math.PI * 2 - Math.PI / 2 + (t - 253) * 0.8; return <div key={l} style={{position: 'absolute', left: 240 + Math.cos(a) * 140 - 55, top: 160 + Math.sin(a) * 120 - 30, width: 110, padding: '10px 0', borderRadius: 30, background: [BLUE, TEAL, YEL, ORA][k], textAlign: 'center'}}><T size={26} color={INK}>{l}</T></div>; })}
              <div style={{position: 'absolute', left: 170, top: 125, width: 140, textAlign: 'center'}}><T size={30} color={YEL}>ISO 9001</T></div>
            </Abs>
          )}
          {t > 252.9 && <Abs x={0} y={1420} w={1080} style={{textAlign: 'center'}}><Hand size={36} color={DIM} style={{opacity: pop(t, 253.0)}}>amélioration continue</Hand></Abs>}
        </AbsoluteFill>
      )}
      {/* sept panneaux indicateurs */}
      {t > 259.2 && (
        <AbsoluteFill style={{opacity: pop(t, 259.2)}}>
          <Title>7 catégories, 7 <span style={{color: BLUE}}>guides</span></Title>
          <Abs x={520} y={620} w={40} h={860} style={{background: '#8A5A2B', borderRadius: 10}} />
          {MS.map((m, k) => <Abs key={m.n} x={k % 2 ? 540 : 220} y={640 + k * 110} w={320} h={84} style={{background: m.c, clipPath: k % 2 ? 'polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%)' : 'polygon(12% 0, 100% 0, 100% 100%, 12% 100%, 0 50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scaleX(${spring(t, 260.1 + k * 0.15)})`, transformOrigin: k % 2 ? '0% 50%' : '100% 50%'}}><T size={30} color={INK}>M{m.n} · {m.l}</T></Abs>)}
          {t > 264.4 && <Row y={1450} gap={12}><Chip c={BLUE} dark={false} q={spring(t, 264.42)} size={28}>Une structure</Chip><Chip c={YEL} q={spring(t, 266.0)} size={28}>= la puissance</Chip></Row>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Piste 5 : synthèse ─────────── */
const P5: React.FC = () => {
  const t = useT();
  if (t < 270.4) return null;
  const o = pop(t, 270.5, 0.5);
  const zoom = prog(t, 277.4, 280.8, easeInOut);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 285.4 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 285.0, 285.4)}}>
          <Title>{t < 275.3 ? <>Bien plus qu'une <span style={{color: DIM}}>checklist</span></> : <>Changer de <span style={{color: ORA}}>perspective</span></>}</Title>
          {t < 275.4 && (
            <AbsoluteFill style={{opacity: 1 - prog(t, 275.0, 275.4)}}>
              <Abs x={300} y={620} w={480} h={500} style={{background: PAPER, borderRadius: 16, padding: 30, boxSizing: 'border-box', transform: `rotate(${prog(t, 272.0, 273.2) * -10}deg) scale(${1 - prog(t, 273.1, 274.2) * 0.25})`, opacity: 1 - prog(t, 273.6, 274.4) * 0.6}}>
                {MS.map((m, k) => <div key={m.n} style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 10}}><div style={{width: 34, height: 34, borderRadius: 6, border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Check p={prog(t, 270.8 + k * 0.15, 271.1 + k * 0.15)} size={28} color={INK} /></div><T size={28} color={INK}>{m.l}</T></div>)}
              </Abs>
              {t > 273.1 && <Row y={1180}><Chip c={ORA} q={spring(t, 273.1)} size={32}><F n="cerveau" size={46} />Une philosophie d'analyse</Chip></Row>}
            </AbsoluteFill>
          )}
          {t > 275.2 && (
            <AbsoluteFill style={{opacity: pop(t, 275.2)}}>
              <Abs x={60} y={580} w={960} h={820} style={{overflow: 'hidden', borderRadius: 30, background: '#0E0C0A'}}>
                <div style={{position: 'absolute', left: 480, top: 410, transform: `scale(${3.2 - 2.4 * zoom})`}}>
                  <svg width={1} height={1} style={{overflow: 'visible'}}>
                    {Array.from({length: 14}, (_, k) => { const a = (k / 14) * Math.PI * 2; const r = 160 + (k % 3) * 70; return <g key={k}><line x1={0} y1={0} x2={Math.cos(a) * r} y2={Math.sin(a) * r} stroke={MS[k % 7].c} strokeWidth={3} opacity={zoom} />{k > 0 && <line x1={Math.cos(a) * r} y1={Math.sin(a) * r} x2={Math.cos(a - 0.45) * (160 + ((k - 1) % 3) * 70)} y2={Math.sin(a - 0.45) * (160 + ((k - 1) % 3) * 70)} stroke="rgba(255,248,236,0.3)" strokeWidth={2} opacity={zoom} />}<circle cx={Math.cos(a) * r} cy={Math.sin(a) * r} r={14} fill={MS[k % 7].c} opacity={zoom} /></g>; })}
                    <circle r={34} fill={RED} />
                  </svg>
                </div>
                <div style={{position: 'absolute', left: 0, right: 0, top: 30, textAlign: 'center'}}><T size={34} color={zoom < 0.5 ? RED : ORA}>{zoom < 0.5 ? 'Un incident isolé ?' : 'Le symptôme d’un système connecté'}</T></div>
              </Abs>
            </AbsoluteFill>
          )}
        </AbsoluteFill>
      )}
      {/* la question finale */}
      {t > 285.2 && (() => {
        const lit = prog(t, 292.6, 294.4, (x) => x);
        return (
          <AbsoluteFill style={{opacity: pop(t, 285.2)}}>
            <Title>Et votre problème <span style={{color: ORA}}>récurrent</span> ?</Title>
            <Abs x={30} y={600} w={1020} h={560} style={{borderRadius: 18, background: CORK, boxShadow: 'inset 0 0 40px rgba(0,0,0,0.4)', backgroundImage: 'radial-gradient(rgba(0,0,0,0.12) 2px, transparent 2px)', backgroundSize: '16px 16px'}}>
              <svg width={1020} height={560} style={{position: 'absolute', inset: 0}}>{MS.map((m, k) => { const a = Math.PI + (k / 6) * Math.PI; const x = 510 + Math.cos(a) * 400, y = 420 + Math.sin(a) * 330; return k / 7 < lit && <line key={k} x1={x} y1={y} x2={510} y2={420} stroke={RED} strokeWidth={5} />; })}</svg>
              {MS.map((m, k) => { const a = Math.PI + (k / 6) * Math.PI; const x = 510 + Math.cos(a) * 400, y = 420 + Math.sin(a) * 330; return <div key={m.n} style={{position: 'absolute', left: x - 55, top: y - 40, width: 110, padding: '10px 0', background: k / 7 < lit ? m.c : 'rgba(0,0,0,0.2)', textAlign: 'center', boxShadow: k / 7 < lit ? `0 0 24px ${m.c}` : 'none', transform: `rotate(${k % 2 ? 4 : -4}deg)`}}><T size={30} color={INK}>M{m.n}</T></div>; })}
              <div style={{position: 'absolute', left: 380, top: 380, width: 260, padding: '10px 0', background: '#FFFDF7', textAlign: 'center', boxShadow: '0 8px 14px rgba(0,0,0,0.4)'}}><Hand size={36} color={INK}>votre problème</Hand></div>
            </Abs>
            {t > 292.5 && t < 297.6 && <Row y={1220}><Chip c={ORA} q={spring(t, 292.58)} size={30}>De nouvelles pistes apparaissent</Chip></Row>}
            {t > 297.6 && <Abs x={460} y={1200} style={{transform: `scale(${spring(t, 297.62)})`}}><F n="ampoule" size={160} /></Abs>}
            {t > 299.4 && <Abs x={0} y={1400} w={1080} style={{textAlign: 'center', opacity: pop(t, 299.42)}}><Hand size={56} color={YEL}>Merci, et à très bientôt !</Hand></Abs>}
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
      {t > 2.5 && t < 10.9 && <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', opacity: pop(t, 2.5) * (1 - prog(t, 10.5, 10.9))}}><div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '8px 24px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${YEL}`}}><F n="loupe" size={40} /><T size={34}>La méthode des <span style={{color: YEL}}>7M</span></T></div></div>}
      {p && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 236, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: pop(t, p.at + WIPE - 0.3) * (1 - prog(t, p.end - 0.3, p.end))}}>
          <div style={{width: 54, height: 54, borderRadius: 27, border: `5px solid ${p.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={26} color={p.c}>{p.n}</T></div>
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
      {/* lampe de bureau qui balaie */}
      <AbsoluteFill style={{background: `radial-gradient(circle at ${540 + Math.sin(t * 0.25) * 300}px ${700 + Math.cos(t * 0.2) * 200}px, rgba(255,216,77,0.10), transparent 45%)`}} />
      <AbsoluteFill style={{backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 2px, transparent 2px 6px)'}} />
    </AbsoluteFill>
  );
};

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...Array.from({length: 6}, (_, k) => ({at: 2.3 + k * 0.55, s: 'sfx/thud', v: 0.28})), {at: 6.18, s: 'sfx/pop', v: 0.3}, {at: 7.6, s: 'cadenas', v: 0.45}, {at: 9.06, s: 'sfx/ding', v: 0.3},
  ...PT.flatMap((p) => [{at: p.at, s: 'sfx/whoosh', v: 0.4}, {at: p.at + 0.9, s: 'sfx/rise', v: 0.25}, {at: p.at + 1.4, s: 'bass-hit', v: 0.35}, {at: p.at + WIPE - 0.4, s: 'soft-whoosh', v: 0.35, dur: 1}]),
  {at: 13.5, s: 'sfx/pop', v: 0.25}, ...[14.0, 16.6, 19.2, 21.8].map((at) => ({at, s: 'sfx/swish', v: 0.25})), {at: 15.34, s: 'sfx/pop', v: 0.3}, ...[16.74, 17.86, 20.06].map((at) => ({at, s: 'sfx/pop', v: 0.22})), {at: 21.3, s: 'alarme', v: 0.12, dur: 1},
  {at: 28.5, s: 'sfx/swish', v: 0.3}, ...Array.from({length: 4}, (_, k) => ({at: 29.9 + k * 0.2, s: 'sfx/click', v: 0.3})), {at: 30.3, s: 'sfx/thud', v: 0.3}, {at: 33.42, s: 'sfx/pop', v: 0.25},
  {at: 35.5, s: 'sfx/whoosh', v: 0.25}, {at: 38.0, s: 'sfx/swish', v: 0.35}, ...Array.from({length: 8}, (_, k) => ({at: 39.2 + k * 0.15, s: 'sfx/click', v: 0.2})), {at: 40.4, s: 'validation', v: 0.3},
  {at: 42.7, s: 'sfx/whoosh', v: 0.3}, {at: 45.8, s: 'soft-whoosh', v: 0.35, dur: 2.6}, {at: 47.0, s: 'deep-hit', v: 0.35}, {at: 50.4, s: 'sfx/pop', v: 0.25}, ...[59.1, 60.35].map((at) => ({at, s: 'sfx/ding', v: 0.3})),
  {at: 61.6, s: 'sfx/whoosh', v: 0.3}, {at: 62.8, s: 'bass-hit', v: 0.3}, {at: 66.5, s: 'cadenas', v: 0.4}, {at: 67.0, s: 'sfx/swish', v: 0.3}, ...Array.from({length: 7}, (_, k) => ({at: 67.4 + k * 0.12, s: 'sfx/pop', v: 0.2})), ...[70.5, 73.0, 74.14].map((at) => ({at, s: 'sfx/ding', v: 0.25})),
  {at: 78.4, s: 'sfx/pop', v: 0.25}, {at: 85.14, s: 'sfx/swish', v: 0.3}, ...Array.from({length: 12}, (_, k) => ({at: 86.8 + k * 0.22, s: 'page', v: 0.2})), {at: 89.78, s: 'validation', v: 0.28},
  {at: 92.0, s: 'sfx/whoosh', v: 0.3}, {at: 95.9, s: 'sfx/pop', v: 0.3}, {at: 98.6, s: 'sfx/click', v: 0.35}, {at: 99.4, s: 'sfx/ding', v: 0.3}, {at: 99.7, s: 'sfx/ding', v: 0.3},
  {at: 104.3, s: 'sfx/whoosh', v: 0.3}, {at: 106.2, s: 'sfx/rise', v: 0.25}, {at: 110.34, s: 'sfx/pop', v: 0.25}, {at: 111.2, s: 'sfx/pop', v: 0.25},
  {at: 116.0, s: 'page', v: 0.4}, {at: 124.9, s: 'sfx/swish', v: 0.4}, {at: 126.0, s: 'sfx/whoosh', v: 0.25}, ...Array.from({length: 7}, (_, k) => ({at: 129.2 + k * 0.15, s: 'sfx/click', v: 0.25})),
  ...MS.flatMap((m) => [{at: m.at, s: 'sfx/whoosh', v: 0.3}, {at: m.at + 0.3, s: 'sfx/thud', v: 0.35}, {at: m.at + 0.6, s: 'sfx/swish', v: 0.2}]),
  ...[136.58, 138.82, 141.86, 147.42, 148.26, 150.58, 160.78, 162.46, 163.8, 170.7, 172.9, 175.46, 182.3, 183.3, 183.78, 189.54, 193.74, 197.1, 203.3, 204.7, 206.18, 207.62].map((at) => ({at, s: 'stylo', v: 0.2})),
  {at: 153.06, s: 'page', v: 0.4}, {at: 153.9, s: 'tampon', v: 0.45}, {at: 160.8, s: 'tension', v: 0.15, dur: 1.5}, {at: 170.7, s: 'sfx/thud', v: 0.25}, {at: 176.26, s: 'sfx/whoosh', v: 0.25}, {at: 182.3, s: 'sfx/click', v: 0.35}, {at: 183.3, s: 'alarme', v: 0.1, dur: 0.8}, {at: 193.8, s: 'tampon', v: 0.4}, {at: 208.4, s: 'sfx/swish', v: 0.3}, {at: 209.6, s: 'validation', v: 0.3},
  {at: 216.3, s: 'sfx/pop', v: 0.25}, {at: 220.0, s: 'soft-whoosh', v: 0.3, dur: 4}, {at: 223.42, s: 'sfx/bell', v: 0.35}, {at: 221.14, s: 'sfx/pop', v: 0.25},
  {at: 226.0, s: 'sfx/whoosh', v: 0.25}, {at: 229.9, s: 'sfx/swish', v: 0.3}, {at: 230.0, s: 'sfx/thud', v: 0.4}, {at: 231.6, s: 'sfx/pop', v: 0.25}, {at: 234.6, s: 'sfx/swish', v: 0.35}, {at: 235.3, s: 'deep-hit', v: 0.3},
  ...Array.from({length: 7}, (_, k) => ({at: 236.8 + k * 0.15, s: 'sfx/click', v: 0.25})), {at: 239.22, s: 'validation', v: 0.3},
  {at: 247.14, s: 'sfx/swish', v: 0.3}, {at: 250.38, s: 'notification', v: 0.3}, {at: 252.9, s: 'sfx/rise', v: 0.2}, ...MS.map((m, k) => ({at: 260.1 + k * 0.15, s: 'sfx/click', v: 0.22})), {at: 264.42, s: 'sfx/pop', v: 0.25}, {at: 266.0, s: 'sfx/ding', v: 0.3},
  ...MS.map((m, k) => ({at: 270.8 + k * 0.15, s: 'stylo', v: 0.15})), {at: 272.0, s: 'sfx/swish', v: 0.3}, {at: 273.1, s: 'sfx/pop', v: 0.3}, {at: 275.3, s: 'sfx/whoosh', v: 0.3}, {at: 277.4, s: 'soft-whoosh', v: 0.35, dur: 3.4}, {at: 280.8, s: 'bass-hit', v: 0.35},
  {at: 285.3, s: 'sfx/whoosh', v: 0.3}, ...MS.map((m, k) => ({at: 292.6 + k * 0.25, s: 'sfx/ding', v: 0.18})), {at: 297.62, s: 'sfx/bell', v: 0.35}, {at: 299.42, s: 'validation', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const SeptM: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <Bg />
    <Gate from={0} to={11.0}><Hook /></Gate>
    <Gate from={13.2} to={76.6}><P1 /></Gate>
    <Gate from={78.9} to={113.4}><P2 /></Gate>
    <Gate from={115.7} to={211.2}><P3 /></Gate>
    <Gate from={213.5} to={268.1}><P4 /></Gate>
    <Gate from={270.3} to={OUTRO_AT}><P5 /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><LensWipe p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.3} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-methode-7m-origine.m4a')} trimAfter={s(301.7)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

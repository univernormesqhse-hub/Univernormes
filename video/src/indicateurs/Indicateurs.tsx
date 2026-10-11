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
 * « Indicateurs de sécurité : réactifs ou préventifs ? » (6 min 02) — voix d'origine, sous-titres recalés mot à mot,
 * photos réelles. Fil rouge inédit : un pare-brise embué que chaque partie dégage un peu plus (en-tête), jusqu'à la
 * route claire du final ; transitions en essuie-glace qui balaie l'écran et dévoile le titre de la partie.
 * Autres techniques nouvelles : pointeuse « arrivée / retour sain et sauf », bandeau défilant d'indicateurs, boussole
 * affolée, enseigne néon « ? », photo d'archives qui se fissure, anneau zéro, pied à coulisse, panneau à deux
 * directions, rétroviseur qui reflète une vraie chute, registre des échecs, livre qui se referme sur « FIN »,
 * formules TRIR / LTIFR qui s'écrivent, deux règles aux graduations incompatibles, thèse en couverture, citation,
 * thermomètre plongé dans la glace (gérer le symptôme), toboggan de la pente glissante, filtre beauté sur un
 * rapport, mirage « 0 accident », caméra qui pivote du rétroviseur au pare-brise, stéthoscope sur l'entreprise,
 * anneaux de progression sans chiffre, tirelire de la prévention, livre passé / présent, visage de Janus,
 * puzzle, poubelle refusée, vue conducteur rétroviseur contre pare-brise avec virages et obstacles.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 362.1;
export const INDICATEURS_FRAMES = s(OUTRO_AT + 3.8);
const BG = '#0E1726';
const INK = '#101820';
const LIGHT = '#F4F7FB';
const DIM = 'rgba(244,247,251,0.66)';
const AMBER = '#FFB627';
const RED = '#FF5C5C';
const GREEN = '#2ED18B';
const SKY = '#4DA8FF';
const VIO = '#A78BFA';
const TEAL = GREEN;
const GOLD = AMBER;
const PAPER = '#F7F4EC';
const PH = (p: string) => staticFile(p);

type Pt = {n: number; l: string; at: number; end: number; c: string};
const PT: Pt[] = [
  {n: 1, l: 'Objectif zéro accident', at: 28.3, end: 48.3, c: AMBER},
  {n: 2, l: 'Les indicateurs réactifs', at: 48.4, end: 140.0, c: RED},
  {n: 3, l: "L'incitation perverse", at: 140.1, end: 206.6, c: VIO},
  {n: 4, l: "L'approche proactive", at: 206.7, end: 260.5, c: GREEN},
  {n: 5, l: 'Une vue équilibrée', at: 260.6, end: 361.9, c: SKY},
];
const WIPE = 2.4;

const pop = (t: number, at: number, d = 0.4) => prog(t, at, at + d, easeOut);
const spring = (t: number, at: number, k = 7, w = 15) => {
  const x = t - at;
  return x <= 0 ? 0 : 1 - Math.exp(-x * k) * Math.cos(x * w);
};
const win = (t: number, a: number, b: number, f = 0.4) => prog(t, a, a + f) * (1 - prog(t, b - f, b));
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
/** Point sur un cercle, angle en degrés compté depuis midi dans le sens horaire. */
const pt = (cx: number, cy: number, r: number, deg: number): [number, number] => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};
const sector = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  if (a1 - a0 <= 0.05) return '';
  const [x0, y0] = pt(cx, cy, r, a0);
  const [x1, y1] = pt(cx, cy, r, a1);
  return `M${cx} ${cy} L${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1} Z`;
};
const arc = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const [x0, y0] = pt(cx, cy, r, a0);
  const [x1, y1] = pt(cx, cy, r, a1);
  return `M${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`;
};

const T: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 40, color = LIGHT, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, letterSpacing: -0.5, lineHeight: 1.05, ...style}}>{children}</div>
);
const Hand: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 48, color = LIGHT, style}) => (
  <div style={{fontFamily: handFont, fontSize: size, color, lineHeight: 1.1, ...style}}>{children}</div>
);
const Abs: React.FC<{x: number; y: number; w?: number; h?: number; children?: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, ...style}}>{children}</div>
);
const Chip: React.FC<{children: React.ReactNode; c?: string; q?: number; size?: number; dark?: boolean; style?: React.CSSProperties}> = ({children, c = TEAL, q = 1, size = 34, dark = true, style}) => (
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
/** Titre dont un reflet balaie les lettres. */
const Shimmer: React.FC<{children: React.ReactNode; size: number; p: number}> = ({children, size, p}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, lineHeight: 1.08, letterSpacing: -0.5, backgroundImage: `linear-gradient(105deg, ${LIGHT} 0%, ${LIGHT} 42%, #FFFFFF 48%, ${GOLD} 50%, #FFFFFF 52%, ${LIGHT} 58%, ${LIGHT} 100%)`, backgroundSize: '260% 100%', backgroundPosition: `${(1 - p) * 100}% 0`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>{children}</div>
);

/* ─────────── Fil rouge : le trépied Q / S / E et son treuil PDCA ─────────── */

/* ─────────── Fil rouge : le pare-brise qui se désembue ─────────── */
const Windshield: React.FC<{w: number; clear: number; t: number}> = ({w, clear, t}) => {
  const h = w * 0.5;
  return (
    <svg width={w} height={h} viewBox="0 0 200 100" style={{display: 'block', overflow: 'visible'}}>
      <defs>
        <linearGradient id={`wsky${Math.round(w)}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7CC4FF" /><stop offset="70%" stopColor="#CFE8FF" /><stop offset="70%" stopColor="#3B4A5C" /><stop offset="100%" stopColor="#2A3644" /></linearGradient>
        <clipPath id={`wclip${Math.round(w)}`}><path d="M20 90 L40 12 Q100 2 160 12 L180 90 Z" /></clipPath>
      </defs>
      <g clipPath={`url(#wclip${Math.round(w)})`}>
        <rect x="0" y="0" width="200" height="100" fill={`url(#wsky${Math.round(w)})`} />
        <path d="M100 70 L60 100 L140 100 Z" fill="#55606E" />
        <path d={`M100 70 L100 100`} stroke={AMBER} strokeWidth={2} strokeDasharray="5 5" strokeDashoffset={-t * 20} />
        <rect x="0" y="0" width="200" height="100" fill="#DDE6EE" opacity={0.92 * (1 - clear)} />
        {clear < 1 && Array.from({length: 14}, (_, k) => <circle key={k} cx={30 + random(`fg${k}`) * 140} cy={15 + random(`fh${k}`) * 70} r={2 + random(`fr${k}`) * 3} fill="#FFFFFF" opacity={0.6 * (1 - clear)} />)}
      </g>
      <path d="M20 90 L40 12 Q100 2 160 12 L180 90 Z" fill="none" stroke="#1C2533" strokeWidth={7} strokeLinejoin="round" />
      <rect x="88" y="10" width="24" height="9" rx="3" fill="#1C2533" />
    </svg>
  );
};

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: BG, opacity: 1 - out}}>
      <Img src={PH('iso26/analyste-kpi.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1120, objectFit: 'cover', objectPosition: '40% 40%', filter: 'brightness(0.7)'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${BG}C0 0%, ${BG}20 20%, ${BG}10 36%, ${BG}EE 56%, ${BG} 62%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={60} y={1000} w={960} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: AMBER, color: INK, fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>INDICATEURS DE SÉCURITÉ</div>
        <T size={92} style={{marginTop: 22, textTransform: 'uppercase', letterSpacing: -2}}>Mesurer la</T>
        <T size={128} color={GREEN} style={{textTransform: 'uppercase', letterSpacing: -4}}>sécurité</T>
        <div style={{display: 'flex', justifyContent: 'center', gap: 16, marginTop: 24}}>
          <div style={{padding: '12px 26px', borderRadius: 40, background: RED, fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: '#fff'}}>Réactifs</div>
          <T size={40} color={DIM} style={{alignSelf: 'center'}}>ou</T>
          <div style={{padding: '12px 26px', borderRadius: 40, background: GREEN, fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK}}>Préventifs ?</div>
        </div>
        <Hand size={46} color={DIM} style={{marginTop: 18}}>rétroviseur ou pare-brise ?</Hand>
      </Abs>
      <Abs x={340} y={1560}><Windshield w={400} clear={0.6} t={t} /></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : l'essuie-glace ─────────── */
const WiperWipe: React.FC<{p: Pt}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const sweep1 = prog(t, a, a + 0.6, easeInOut);
  const sweep2 = prog(t, b - 0.6, b, easeInOut);
  const ang = t < a + 1.2 ? lerp(-80, 80, sweep1) : lerp(80, -80, sweep2);
  const cover = sweep1 * (1 - sweep2);
  return (
    <AbsoluteFill style={{zIndex: 55, pointerEvents: 'none'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <defs><clipPath id={`wipe${p.n}`}><path d={sector(540, 1900, 2200, -90, -90 + (ang + 80) * (180 / 160))} /></clipPath></defs>
        <g clipPath={t < a + 1.2 ? `url(#wipe${p.n})` : undefined} opacity={t < a + 1.2 ? 1 : cover}>
          <rect width={1080} height={1920} fill={BG} />
          <rect width={1080} height={1920} fill={p.c} opacity={0.09} />
          {Array.from({length: 40}, (_, k) => <circle key={k} cx={random(`dr${k}`) * 1080} cy={random(`ds${k}`) * 1500 + 200} r={4 + random(`dt${k}`) * 8} fill="#BFD8F0" opacity={0.25} />)}
        </g>
        <g transform={`rotate(${ang} 540 1900)`}>
          <rect x={530} y={300} width={20} height={1600} rx={10} fill="#1C2533" />
          <rect x={516} y={320} width={48} height={760} rx={12} fill="#2C3A4C" />
        </g>
      </svg>
      {cover > 0.5 && (
        <Abs x={60} y={700} w={960} style={{textAlign: 'center', opacity: prog(cover, 0.5, 1)}}>
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: 30}}><Windshield w={360} clear={lerp((p.n - 1) / 5, p.n / 5, prog(t, a + 0.7, a + 1.6, easeInOut))} t={t} /></div>
          <T size={34} color={p.c} style={{letterSpacing: 8}}>PARTIE {p.n}/5</T>
          <T size={80} style={{marginTop: 14}}>{p.l}</T>
        </Abs>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Ouverture ─────────── */
const TICK = ['Taux de fréquence', 'Jours sans accident', 'Arrêts de travail', 'Presque-accidents', 'Taux de gravité', 'Audits réalisés', 'Formations suivies'];
const Intro: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      {t < 8.5 && (
        <AbsoluteFill style={{opacity: pop(t, 2.4) * (1 - prog(t, 8.2, 8.5))}}>
          <Title>{t < 4.4 ? <>La <span style={{color: GREEN}}>sécurité au travail</span></> : <>Rentrer <span style={{color: GREEN}}>sain et sauf</span></>}</Title>
          <Abs x={240} y={620} w={600} h={760} style={{borderRadius: 26, background: '#C9B98F', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', transform: `scale(${spring(t, 2.6)})`, overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 30, right: 30, top: 30, height: 120, borderRadius: 14, background: '#2A2F36', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={44} color={AMBER} style={{fontFamily: 'monospace'}}>POINTEUSE</T></div>
            <div style={{position: 'absolute', left: 120, top: 200 + (t > 5.1 ? 0 : 0), width: 360, height: 520, background: PAPER, borderRadius: 10, padding: 30, boxSizing: 'border-box', transform: `translateY(${t > 5.1 && t < 5.6 ? -30 * Math.sin((t - 5.1) * 12) : 0}px)`}}>
              <T size={30} color={INK}>FICHE DE JOURNÉE</T>
              {[['Arrivée', 5.1], ['Retour sain et sauf', 7.3]].map(([l, at]) => (
                <div key={l as string} style={{marginTop: 40, display: 'flex', alignItems: 'center', gap: 14}}>
                  <div style={{width: 64, height: 64, borderRadius: 12, border: '4px solid #8A8170', display: 'flex', alignItems: 'center', justifyContent: 'center', background: t > (at as number) ? GREEN : 'transparent'}}>{t > (at as number) && <Check p={prog(t, at as number, (at as number) + 0.4)} size={48} color={INK} />}</div>
                  <T size={34} color={INK}>{l}</T>
                </div>
              ))}
            </div>
          </Abs>
          {t > 5.0 && <Abs x={0} y={1420} w={1080} style={{textAlign: 'center'}}><Hand size={46} color={DIM} style={{opacity: pop(t, 5.1)}}>tout le monde rentre à la maison</Hand></Abs>}
        </AbsoluteFill>
      )}
      {t > 8.3 && t < 17.9 && (
        <AbsoluteFill style={{opacity: pop(t, 8.3) * (1 - prog(t, 17.6, 17.9))}}>
          <Title>{t < 13.1 ? <>On <span style={{color: AMBER}}>mesure</span>, on suit, on analyse</> : <>Et si les chiffres nous <span style={{color: RED}}>égaraient</span> ?</>}</Title>
          <Abs x={0} y={640} w={1080} h={130} style={{background: '#05080D', borderTop: `4px solid ${AMBER}`, borderBottom: `4px solid ${AMBER}`, overflow: 'hidden'}}>
            <div style={{position: 'absolute', top: 30, left: 1080 - (t - 8.3) * 380, whiteSpace: 'nowrap', fontFamily: 'monospace', fontWeight: 700, fontSize: 56, color: AMBER}}>{[...TICK, ...TICK].map((w) => `◆ ${w}   `).join('')}</div>
          </Abs>
          <Row y={830} gap={14}>{[['On mesure', 9.9], ['Indicateurs', 10.9], ['Chiffres', 12.0]].map(([l, at]) => t > (at as number) && <Chip key={l as string} c={AMBER} q={spring(t, at as number)} size={30}>{l}</Chip>)}</Row>
          {t > 13.0 && (
            <Abs x={340} y={960} w={400} h={400} style={{borderRadius: 200, background: '#E9E1CC', border: '14px solid #8A6A2B', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', transform: `scale(${spring(t, 13.1)})`}}>
              {['N', 'E', 'S', 'O'].map((L, k) => <T key={L} size={40} color={INK} style={{position: 'absolute', left: 186 - 14 + Math.sin((k * Math.PI) / 2) * 150, top: 186 - 22 - Math.cos((k * Math.PI) / 2) * 150}}>{L}</T>)}
              <div style={{position: 'absolute', left: 186, top: 46, width: 0, height: 0, transform: `rotate(${t < 15.3 ? 0 : (t - 15.3) * (t > 16.7 ? 900 : 120) + Math.sin(t * 7) * 30}deg)`, transformOrigin: '0 140px'}}>
                <div style={{position: 'absolute', left: -14, top: 0, width: 28, height: 140, background: RED, clipPath: 'polygon(50% 0, 100% 100%, 0 100%)'}} />
                <div style={{position: 'absolute', left: -14, top: 140, width: 28, height: 140, background: '#4A5568', clipPath: 'polygon(0 0, 100% 0, 50% 100%)'}} />
              </div>
            </Abs>
          )}
        </AbsoluteFill>
      )}
      {t > 17.7 && (
        <AbsoluteFill style={{opacity: pop(t, 17.7) * (1 - prog(t, 28.0, 28.3))}}>
          <Abs x={140} y={470} w={800} h={300} style={{borderRadius: 30, border: `8px solid ${t > 19.0 && Math.floor(t * 9) % 7 !== 0 ? '#FF4FD8' : '#5A2A50'}`, boxShadow: t > 19.0 ? '0 0 50px #FF4FD8, inset 0 0 40px #FF4FD8' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>
            <T size={60} color={t > 19.0 ? '#FFD6F5' : '#5A2A50'} style={{textShadow: t > 19.0 ? '0 0 20px #FF4FD8' : 'none', textAlign: 'center', whiteSpace: 'nowrap'}}>Question provocatrice</T>
          </Abs>
          <Photo src="iso26/archives-couloir.jpg" x={140} y={840} w={800} h={560} q={spring(t, 21.6)} filter="sepia(0.7) brightness(0.9)">
            {t > 23.0 && <svg width={800} height={560} style={{position: 'absolute', inset: 0}}><polyline points="400,0 380,90 430,160 360,250 420,330 370,430 410,560" fill="none" stroke="#fff" strokeWidth={6} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, 23.0, 23.6)} /><polyline points="380,90 300,140 250,130" fill="none" stroke="#fff" strokeWidth={4} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, 23.4, 23.9)} /><polyline points="420,330 520,360 600,350" fill="none" stroke="#fff" strokeWidth={4} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, 23.6, 24.1)} /></svg>}
          </Photo>
          {t > 23.0 && <Abs x={180} y={1300}><Chip c={RED} dark={false} q={spring(t, 23.0)} size={30}>Des décennies de pratiques remises en cause</Chip></Abs>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 1 : objectif zéro accident ─────────── */
const P1: React.FC = () => {
  const t = useT();
  const o = win(t, 30.6, 48.3, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 34.8 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 34.4, 34.8)}}>
          <Title>L'ambition du <span style={{color: AMBER}}>zéro accident</span></Title>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <circle cx={540} cy={1000} r={250} fill="none" stroke="#24344A" strokeWidth={60} />
            <circle cx={540} cy={1000} r={250} fill="none" stroke={AMBER} strokeWidth={60} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, 30.7, 31.7, easeInOut)} transform="rotate(-90 540 1000)" />
          </svg>
          <Abs x={340} y={860} w={400} style={{textAlign: 'center', transform: `scale(${spring(t, 30.8)})`}}><T size={240} color={AMBER}>0</T></Abs>
          {t > 30.4 && <Abs x={80} y={1340}><Chip c={SKY} dark={false} q={spring(t, 30.5)} size={30}><F n="globe" size={44} />Universel</Chip></Abs>}
          {t > 31.4 && <Abs x={600} y={1340}><Chip c={GREEN} q={spring(t, 31.5)} size={30}>Louable</Chip></Abs>}
          {t > 32.4 && <Row y={1440} gap={6}>{Array.from({length: 9}, (_, k) => <div key={k} style={{transform: `translateY(${Math.sin((t - 32.4 - k * 0.08) * 10) * 8 * (t < 34 ? 1 : 0)}px)`, opacity: pop(t, 32.4 + k * 0.05)}}><F n={k % 2 ? 'salariee' : 'salarie'} size={70} /></div>)}</Row>}
        </AbsoluteFill>
      )}
      {t > 34.4 && t < 42.8 && (() => {
        const jaw = prog(t, 36.9, 38.4, easeInOut);
        return (
          <AbsoluteFill style={{opacity: win(t, 34.4, 42.8, 0.35)}}>
            <Title>{t < 39.8 ? <>Le défi : <span style={{color: AMBER}}>comment mesurer</span></> : <>La question <span style={{color: AMBER}}>fondamentale</span></>}</Title>
            <Abs x={100} y={760} w={880} h={90} style={{borderRadius: 12, background: 'linear-gradient(180deg, #D8DEE6, #A9B4C2)', boxShadow: '0 16px 30px rgba(0,0,0,0.45)'}}>
              {Array.from({length: 45}, (_, k) => <div key={k} style={{position: 'absolute', left: 20 + k * 19, bottom: 0, width: 3, height: k % 5 ? 22 : 40, background: INK}} />)}
            </Abs>
            <Abs x={100} y={640} w={70} h={380} style={{borderRadius: 10, background: '#8A97A8'}} />
            <Abs x={170 + jaw * 560} y={640} w={70} h={380} style={{borderRadius: 10, background: '#B8C2CF', boxShadow: '0 10px 20px rgba(0,0,0,0.4)'}}><div style={{position: 'absolute', left: -40, top: 110, width: 40, height: 6, background: RED}} /></Abs>
            <Abs x={170} y={880} w={jaw * 560 + 1} style={{textAlign: 'center', overflow: 'hidden', whiteSpace: 'nowrap'}}><T size={86} color={GREEN}>SÉCURITÉ</T></Abs>
            {t > 39.8 && <Abs x={140} y={1100} w={800} h={260} style={{borderRadius: 26, background: PAPER, padding: 34, boxSizing: 'border-box', transform: `rotate(-2deg) scale(${spring(t, 39.9)})`}}><T size={30} color="#8A8170">On le dit souvent</T><Hand size={56} color={INK} style={{marginTop: 10}}>{'« Ce qui ne se mesure pas ne s\'améliore pas. »'.slice(0, Math.floor(46 * prog(t, 42.6, 44.8)))}</Hand></Abs>}
          </AbsoluteFill>
        );
      })()}
      {t > 42.6 && (
        <AbsoluteFill style={{opacity: pop(t, 42.6)}}>
          <Title>Quels <span style={{color: AMBER}}>indicateurs</span> choisir ?</Title>
          <Abs x={510} y={640} w={60} h={800} style={{background: '#8A6A2B', borderRadius: 8}} />
          {[['Réactifs', RED, -1, 44.9], ['Préventifs', GREEN, 1, 46.6]].map(([l, c, dir, at]) => t > (at as number) && (
            <Abs key={l as string} x={dir === -1 ? 120 : 560} y={dir === -1 ? 720 : 960} w={400} h={140} style={{background: c as string, clipPath: dir === -1 ? 'polygon(18% 0, 100% 0, 100% 100%, 18% 100%, 0 50%)' : 'polygon(0 0, 82% 0, 100% 50%, 82% 100%, 0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${dir === -1 ? -4 : 4}deg) scale(${spring(t, at as number)})`}}><T size={46} color={dir === -1 ? '#fff' : INK}>{l}</T></Abs>
          ))}
          {t > 47.4 && <Abs x={430} y={1220} style={{transform: `scale(${spring(t, 47.5)})`}}><F n="question" size={220} /></Abs>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 2 : les indicateurs réactifs ─────────── */
const P2: React.FC = () => {
  const t = useT();
  const o = win(t, 50.7, 140.0, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 64.3 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 63.9, 64.3)}}>
          <Title>{t < 55.2 ? <>Regarder dans le <span style={{color: RED}}>rétroviseur</span></> : <>Les indicateurs <span style={{color: RED}}>réactifs</span></>}</Title>
          <Abs x={110} y={640} w={860} h={420} style={{borderRadius: 210, background: '#1C2533', padding: 22, boxSizing: 'border-box', boxShadow: '0 30px 60px rgba(0,0,0,0.55)', transform: `scale(${spring(t, 51.0)}) rotate(-3deg)`}}>
            <div style={{width: '100%', height: '100%', borderRadius: 190, overflow: 'hidden', position: 'relative'}}>
              <Img src={PH('causerie/chute-entrepot.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)', filter: 'saturate(0.8)'}} />
              <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(255,255,255,0.35), transparent 40%)'}} />
            </div>
          </Abs>
          <Abs x={530} y={1050} w={20} h={120} style={{background: '#1C2533'}} />
          {t > 53.2 && <Row y={1190} gap={10}>{Array.from({length: 6}, (_, k) => <div key={k} style={{width: 14, height: 90, background: RED, borderRadius: 4, transform: k === 5 ? 'rotate(60deg) translate(-40px, 10px)' : 'none', opacity: pop(t, 53.3 + k * 0.15)}} />)}<T size={34} color={DIM} style={{marginLeft: 20}}>erreurs du passé</T></Row>}
          {t > 57.1 && <Abs x={80} y={1330}><Chip c={RED} dark={false} q={spring(t, 57.2)} size={28}>Réactifs</Chip></Abs>}
          {t > 57.9 && <Abs x={330} y={1330}><Chip c={LIGHT} q={spring(t, 58.0)} size={28}>« lagging indicators »</Chip></Abs>}
          {t > 61.0 && <Abs x={80} y={1420}><Chip c="#2C3A4C" dark={false} q={spring(t, 61.1)} size={24}>Définition : Centre canadien d'hygiène et de sécurité au travail</Chip></Abs>}
        </AbsoluteFill>
      )}
      {t > 63.9 && t < 74.6 && (
        <AbsoluteFill style={{opacity: win(t, 63.9, 74.6, 0.35)}}>
          <Title>Par nature <span style={{color: RED}}>rétrospectifs</span></Title>
          <Abs x={160} y={620} w={760} h={720} style={{borderRadius: 18, background: PAPER, boxShadow: '0 30px 60px rgba(0,0,0,0.5)', padding: 40, boxSizing: 'border-box', transform: `scale(${spring(t, 64.1)})`}}>
            <T size={34} color={INK}>REGISTRE DES ÉCHECS</T>
            {Array.from({length: 6}, (_, k) => (
              <div key={k} style={{marginTop: 26, height: 60, borderBottom: '3px solid #D8CFB6', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{width: 380 - k * 30, height: 14, borderRadius: 7, background: '#CFC8B6'}} />
                {t > 67.6 + k * 0.25 && <div style={{border: `5px solid ${RED}`, borderRadius: 8, padding: '0 12px', transform: `rotate(-8deg) scale(${spring(t, 67.6 + k * 0.25, 9, 18)})`}}><T size={30} color={RED}>ÉCHEC</T></div>}
              </div>
            ))}
          </Abs>
          {t > 71.7 && <Row y={1380}><Chip c={RED} dark={false} q={spring(t, 71.8)} size={28}>N'aide pas à éviter la suite</Chip></Row>}
        </AbsoluteFill>
      )}
      {t > 74.4 && t < 89.7 && (() => {
        const close = prog(t, 87.6, 88.6, easeInOut);
        return (
          <AbsoluteFill style={{opacity: win(t, 74.4, 89.7, 0.35)}}>
            <Title>{t < 85.4 ? <>Des <span style={{color: RED}}>résultats</span>, des conséquences</> : <>Une histoire <span style={{color: RED}}>déjà terminée</span></>}</Title>
            {t < 85.6 && (
              <AbsoluteFill style={{opacity: 1 - prog(t, 85.2, 85.6)}}>
                {[['Fréquence des blessures', 'causerie/chute-escalier.jpg', 78.3, 70], ['Arrêts de travail', 'incident/blessure-soins.jpg', 79.9, 560]].map(([l, src, at, x]) => t > (at as number) - 0.1 && (
                  <Abs key={l as string} x={x as number} y={640} w={450} h={620} style={{borderRadius: 24, overflow: 'hidden', border: `6px solid ${RED}`, transform: `scale(${spring(t, at as number)})`}}>
                    <Img src={PH(src as string)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 20, background: 'rgba(14,23,38,0.88)'}}><T size={32}>{l}</T></div>
                  </Abs>
                ))}
                {t > 81.8 && <Row y={1320}><Chip c={RED} dark={false} q={spring(t, 81.9)} size={30}>Ce qu'on cherche à éviter</Chip></Row>}
              </AbsoluteFill>
            )}
            {t > 85.4 && (
              <Abs x={190} y={680} w={700} h={520} style={{perspective: 1600, opacity: pop(t, 85.4)}}>
                <div style={{position: 'absolute', left: 350, top: 0, width: 350, height: 520, background: PAPER, borderRadius: '0 16px 16px 0', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', padding: 30, boxSizing: 'border-box'}}>{close > 0.6 && <T size={70} color={RED} style={{marginTop: 160, textAlign: 'center'}}>FIN</T>}</div>
                <div style={{position: 'absolute', left: 0, top: 0, width: 350, height: 520, background: PAPER, borderRadius: '16px 0 0 16px', transformOrigin: '100% 50%', transform: `rotateY(${close * -180}deg)`, backfaceVisibility: 'hidden', padding: 30, boxSizing: 'border-box'}}>{[0.8, 0.6, 0.7, 0.5, 0.75].map((w, j) => <div key={j} style={{marginTop: 30, height: 14, width: 280 * w, borderRadius: 7, background: '#CFC8B6'}} />)}</div>
              </Abs>
            )}
            {t > 85.4 && <Abs x={80} y={1290}><Chip c={LIGHT} q={spring(t, 85.5)} size={28}>Facile à compter…</Chip></Abs>}
          </AbsoluteFill>
        );
      })()}
      {t > 89.5 && t < 119.4 && (
        <AbsoluteFill style={{opacity: win(t, 89.5, 119.4, 0.35)}}>
          <Title>{t < 103.8 ? <>Des <span style={{color: AMBER}}>formules standardisées</span></> : <>Ils ne mesurent <span style={{color: RED}}>pas la même chose</span></>}</Title>
          {[['TRIR', 'Norme américaine', '(Incidents × 200 000) ÷ Heures', 'Tous les incidents enregistrables', 95.7, 106.1, 108.1, 110.8, 'globe'], ['LTIFR', 'Norme internationale', '(Arrêts × 1 000 000) ÷ Heures', 'Uniquement les accidents avec arrêt', 98.4, 112.7, 115.4, 117.6, 'globe']].map(([name, norme, form, what, at, nAt, fAt, wAt], k) => t > (at as number) - 0.1 && (
            <Abs key={name as string} x={70} y={620 + k * 400} w={940} h={360} style={{borderRadius: 28, background: 'rgba(28,37,51,0.95)', border: `4px solid ${k ? SKY : AMBER}`, padding: 30, boxSizing: 'border-box', transform: `translateX(${(1 - spring(t, at as number)) * (k ? 1200 : -1200)}px)`}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
                <T size={70} color={k ? SKY : AMBER}>{name}</T>
                {t > (nAt as number) && <Chip c={k ? SKY : AMBER} q={spring(t, nAt as number)} size={26}>{norme}</Chip>}
              </div>
              <div style={{marginTop: 18, fontFamily: 'monospace', fontWeight: 700, fontSize: 38, color: LIGHT}}>{(form as string).slice(0, Math.floor((form as string).length * prog(t, fAt as number, (fAt as number) + 1.2)))}</div>
              {t > (wAt as number) && <T size={30} color={DIM} style={{marginTop: 18, opacity: pop(t, wAt as number)}}>{what}</T>}
            </Abs>
          ))}
          <Abs x={60} y={1420} w={960} style={{textAlign: 'center'}}><T size={22} color={DIM}>Formules et bases citées par la vidéo d'origine</T></Abs>
        </AbsoluteFill>
      )}
      {t > 119.2 && (
        <AbsoluteFill style={{opacity: pop(t, 119.2)}}>
          <Title>{t < 132.1 ? <>Impossible à <span style={{color: RED}}>comparer directement</span></> : <>1 n'est pas forcément <span style={{color: GREEN}}>mieux</span> que 2,5</>}</Title>
          {t < 132.3 && [[0, 'TRIR · base 200 000 h', AMBER, 22], [1, 'LTIFR · base 1 000 000 h', SKY, 47]].map(([k, l, c, step]) => (
            <Abs key={k as number} x={70} y={680 + (k as number) * 260} w={940} h={150} style={{borderRadius: 14, background: c as string, transform: `translateX(${(1 - spring(t, 119.4 + (k as number) * 0.3)) * -1200}px)`}}>
              {Array.from({length: 60}, (_, j) => j * (step as number) < 900 && <div key={j} style={{position: 'absolute', left: 20 + j * (step as number), top: 0, width: 4, height: j % 5 ? 40 : 70, background: INK}} />)}
              <T size={34} color={INK} style={{position: 'absolute', left: 24, bottom: 16}}>{l}</T>
            </Abs>
          ))}
          {t > 121.7 && t < 132.3 && <Abs x={470} y={880} w={140} h={140} style={{borderRadius: 70, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 121.8)})`}}><T size={90} color="#fff">≠</T></Abs>}
          {t > 129.2 && t < 132.3 && <Row y={1260}><Chip c={LIGHT} q={spring(t, 129.3)} size={30}>Des échelles différentes</Chip></Row>}
          {t > 132.1 && (
            <>
              {[['LTIFR', '1', SKY, 132.2, 90], ['TRIR', '2,5', AMBER, 133.9, 570]].map(([n, v, c, at, x]) => t > (at as number) - 0.1 && (
                <Abs key={n as string} x={x as number} y={680} w={420} h={460} style={{borderRadius: 30, background: 'rgba(28,37,51,0.95)', border: `5px solid ${c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, at as number)})`}}>
                  <T size={44} color={c as string}>{n}</T>
                  <T size={180} style={{marginTop: 10}}>{v}</T>
                </Abs>
              ))}
              {t > 135.6 && <Row y={1200}><Chip c={RED} dark={false} q={spring(t, 135.6)} size={30}>Ils ne comptent pas la même chose</Chip></Row>}
              <Abs x={60} y={1300} w={960} style={{textAlign: 'center'}}><T size={22} color={DIM}>Valeurs citées par la vidéo d'origine</T></Abs>
            </>
          )}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 3 : l'incitation perverse ─────────── */
const P3: React.FC = () => {
  const t = useT();
  const o = win(t, 142.4, 206.6, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 161.6 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 161.2, 161.6)}}>
          <Title>{t < 150.7 ? <>Quand le chiffre devient <span style={{color: VIO}}>l'objectif</span></> : <>L'<span style={{color: VIO}}>incitation perverse</span></>}</Title>
          {t < 154.7 && (
            <AbsoluteFill style={{opacity: 1 - prog(t, 154.4, 154.7)}}>
              <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>{[300, 220, 140, 60].map((r, k) => <circle key={r} cx={540} cy={1010} r={r * spring(t, 142.9 + k * 0.1)} fill={k % 2 ? '#fff' : RED} />)}</svg>
              {t > 146.9 && <Abs x={380} y={930} w={320} style={{textAlign: 'center', transform: `scale(${spring(t, 147.0)})`}}><T size={120} color={INK} style={{fontFamily: 'monospace'}}>0,0</T></Abs>}
              {t > 147.0 && <Abs x={0} y={1360} w={1080} style={{textAlign: 'center'}}><Hand size={44} color={DIM} style={{opacity: pop(t, 147.0)}}>le chiffre comme seul et unique objectif</Hand></Abs>}
            </AbsoluteFill>
          )}
          {t > 154.5 && (
            <Abs x={290} y={620} w={500} h={680} style={{borderRadius: 14, background: '#1E3A5F', boxShadow: '0 30px 60px rgba(0,0,0,0.55)', padding: 40, boxSizing: 'border-box', transform: `rotate(-3deg) scale(${spring(t, 154.7)})`, borderLeft: '22px solid #13263F'}}>
              <T size={28} color={AMBER} style={{letterSpacing: 4}}>THÈSE</T>
              <T size={110} style={{marginTop: 20}}>2013</T>
              <div style={{marginTop: 30, height: 4, background: AMBER}} />
              <T size={44} style={{marginTop: 30}}>MINES ParisTech</T>
              <T size={30} color={DIM} style={{marginTop: 20}}>Les dérives des indicateurs</T>
            </Abs>
          )}
          {t > 158.7 && <Row y={1340}><Chip c={VIO} dark={false} q={spring(t, 158.8)} size={30}><F n="loupe" size={44} />Analysé en profondeur</Chip></Row>}
        </AbsoluteFill>
      )}
      {t > 161.4 && t < 174.9 && (
        <AbsoluteFill style={{opacity: win(t, 161.4, 174.9, 0.35)}}>
          <Title>{t < 166.6 ? <>Une gestion <span style={{color: VIO}}>purement numérique</span></> : <>La conclusion <span style={{color: VIO}}>choc</span></>}</Title>
          {t < 166.8 && Array.from({length: 48}, (_, k) => <Abs key={k} x={60 + (k % 8) * 125} y={620 + Math.floor(k / 8) * 120} style={{opacity: 0.25 + 0.5 * Math.abs(Math.sin(t * 3 + k)) * pop(t, 161.6 + (k % 8) * 0.05)}}><T size={46} color={VIO} style={{fontFamily: 'monospace'}}>{'01'[Math.floor(random(`b${k}${Math.floor(t * 4)}`) * 2)]}</T></Abs>)}
          {t > 166.6 && (
            <Abs x={90} y={620} w={900} h={620} style={{borderRadius: 30, background: LIGHT, padding: 50, boxSizing: 'border-box', transform: `scale(${spring(t, 166.7)})`, borderBottom: `14px solid ${SKY}`}}>
              <T size={110} color={SKY} style={{lineHeight: 0.6}}>“</T>
              <T size={56} color={INK} style={{lineHeight: 1.2}}>Le manager… est conduit à <span style={{background: AMBER}}>agir sur l'indicateur</span> plutôt que sur les <span style={{background: AMBER}}>causes</span> d'un évènement.</T>
            </Abs>
          )}
          {t > 171.5 && <Abs x={120} y={1290}><Chip c={AMBER} q={spring(t, 171.6)} size={30}><F n="argent" size={44} />La prime en jeu</Chip></Abs>}
        </AbsoluteFill>
      )}
      {t > 174.7 && t < 183.0 && (() => {
        const cold = prog(t, 177.4, 178.6, easeInOut);
        const level = lerp(0.85, 0.25, cold);
        return (
          <AbsoluteFill style={{opacity: win(t, 174.7, 183.0, 0.35)}}>
            <Title>Gérer le <span style={{color: RED}}>chiffre</span> plutôt que le <span style={{color: GREEN}}>risque</span></Title>
            <Abs x={300} y={1060} w={480} h={300} style={{borderRadius: '0 0 60px 60px', background: 'rgba(160,210,255,0.35)', border: '5px solid #CFE8FF', opacity: cold > 0 ? 1 : 0.2}}>{Array.from({length: 6}, (_, k) => <div key={k} style={{position: 'absolute', left: 40 + k * 70, top: 40 + (k % 2) * 60, width: 60, height: 60, borderRadius: 10, background: 'rgba(230,245,255,0.8)', transform: `rotate(${k * 17}deg)`}} />)}</Abs>
            <Abs x={500} y={620 + cold * 300} w={80} h={640} style={{borderRadius: 40, background: '#F4F7FB', border: '5px solid #8A97A8'}}>
              <div style={{position: 'absolute', left: 22, right: 22, bottom: 22, height: 560 * level, borderRadius: 18, background: RED}} />
              <div style={{position: 'absolute', left: 6, bottom: 0, width: 58, height: 58, borderRadius: 29, background: RED}} />
            </Abs>
            {t > 179.2 && <Abs x={70} y={760}><Chip c={RED} dark={false} q={spring(t, 179.3)} size={28}>Le symptôme…</Chip></Abs>}
            {t > 181.8 && <Abs x={640} y={760}><Chip c={LIGHT} q={spring(t, 181.9)} size={28}>… avant la maladie</Chip></Abs>}
          </AbsoluteFill>
        );
      })()}
      {t > 182.8 && t < 196.8 && (() => {
        const ball = prog(t, 185.1, 186.0) * 0.33 + prog(t, 188.4, 189.6) * 0.33 + prog(t, 194.0, 195.4) * 0.34;
        const STEPS: [string, string, number][] = [['1. Enjeux élevés', 'La prime liée au faible taux d\'accidents', 185.1], ['2. Pression intense', 'Protéger le chiffre à tout prix', 188.4], ['3. La « solution »', 'Incidents sous-déclarés ou requalifiés', 194.0]];
        return (
          <AbsoluteFill style={{opacity: win(t, 182.8, 196.8, 0.35)}}>
            <Title>La <span style={{color: VIO}}>pente glissante</span></Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <path d="M80 640 C 400 640 400 1000 620 1080 S 900 1320 1000 1400" fill="none" stroke={VIO} strokeWidth={34} strokeLinecap="round" opacity={0.85} />
              <path d="M80 640 C 400 640 400 1000 620 1080 S 900 1320 1000 1400" fill="none" stroke="#fff" strokeWidth={6} strokeDasharray="20 20" opacity={0.4} />
            </svg>
            {(() => { const pts: [number, number][] = [[80, 640], [380, 820], [620, 1080], [1000, 1400]]; const seg = Math.min(2.999, ball * 3); const i = Math.floor(seg), f = seg - i; const x = lerp(pts[i][0], pts[i + 1][0], f), y = lerp(pts[i][1], pts[i + 1][1], f); return <Abs x={x - 40} y={y - 80} w={80} h={80} style={{borderRadius: 40, background: AMBER, boxShadow: '0 10px 20px rgba(0,0,0,0.5)'}} />; })()}
            {STEPS.map(([h, d, at], k) => t > at && <Abs key={h} x={[120, 80, 420][k]} y={[700, 1040, 1180][k]} w={[560, 460, 560][k]} style={{opacity: pop(t, at), transform: `translateY(${(1 - pop(t, at)) * 30}px)`}}><div style={{padding: '18px 24px', borderRadius: 22, background: 'rgba(28,37,51,0.95)', border: `3px solid ${k === 2 ? RED : VIO}`}}><T size={36} color={k === 2 ? RED : LIGHT}>{h}</T><T size={26} color={DIM} style={{marginTop: 6}}>{d}</T></div></Abs>)}
            {t > 193.9 && <Abs x={600} y={1460}><Chip c={RED} dark={false} q={spring(t, 194.0)} size={26}>Contraire à l'éthique</Chip></Abs>}
          </AbsoluteFill>
        );
      })()}
      {t > 196.6 && (() => {
        const beauty = prog(t, 199.6, 200.6, easeInOut);
        return (
          <AbsoluteFill style={{opacity: pop(t, 196.6)}}>
            <Title>{t < 201.0 ? <>Un rapport <span style={{color: VIO}}>plus joli</span></> : <>Une <span style={{color: RED}}>illusion de sécurité</span></>}</Title>
            {t < 201.2 && (
              <Photo src="iso26/rapport-audit.jpg" x={140} y={620} w={800} h={640} q={spring(t, 196.8)} filter={`saturate(${1 + beauty}) brightness(${1 + beauty * 0.25}) blur(${beauty * 2}px)`}>
                {beauty > 0 && Array.from({length: 12}, (_, k) => <div key={k} style={{position: 'absolute', left: random(`sp${k}`) * 760, top: random(`sq${k}`) * 600, width: 30, height: 30, background: '#fff', clipPath: 'polygon(50% 0, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0 50%, 40% 40%)', opacity: beauty * Math.abs(Math.sin(t * 5 + k))}} />)}
                {beauty > 0 && <div style={{position: 'absolute', left: 20, top: 20, padding: '8px 18px', borderRadius: 30, background: '#FF4FD8'}}><T size={26} color="#fff">Filtre beauté</T></div>}
              </Photo>
            )}
            {t > 197.4 && t < 201.2 && <Abs x={110} y={1300}><Chip c={RED} dark={false} q={spring(t, 197.5)} size={28}>Le lieu de travail plus sûr ? Non.</Chip></Abs>}
            {t > 201.0 && (
              <Abs x={190} y={700} w={700} h={420} style={{opacity: pop(t, 201.1), filter: `blur(${1.5 + Math.sin(t * 6)}px)`, transform: `skewX(${Math.sin(t * 4) * 3}deg)`}}>
                <div style={{width: '100%', height: '100%', borderRadius: 30, background: GREEN, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.6 + 0.3 * Math.sin(t * 5)}}><T size={150} color={INK}>0</T><T size={46} color={INK}>accident</T></div>
              </Abs>
            )}
            {t > 203.6 && <Row y={1220}><Chip c={RED} dark={false} q={spring(t, 203.7)} size={30}>Extrêmement dangereuse</Chip></Row>}
            {t > 204.6 && <Abs x={0} y={1330} w={1080} style={{textAlign: 'center'}}><Hand size={46} color={DIM} style={{opacity: pop(t, 204.7)}}>comment sortir de ce piège ?</Hand></Abs>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 4 : l'approche proactive ─────────── */
const P4: React.FC = () => {
  const t = useT();
  const o = win(t, 209.0, 260.5, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 221.4 && (() => {
        const turn = prog(t, 211.5, 212.5, easeInOut);
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 221.0, 221.4)}}>
            <Title>{t < 215.4 ? <>Changer de <span style={{color: GREEN}}>perspective</span></> : t < 217.2 ? <>L'<span style={{color: GREEN}}>approche proactive</span></> : <>Les indicateurs <span style={{color: GREEN}}>préventifs</span></>}</Title>
            <Abs x={140} y={640} w={800} h={560} style={{perspective: 1800}}>
              <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `rotateY(${turn * 180}deg)`}}>
                <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: 30, overflow: 'hidden', border: `6px solid ${RED}`}}><Img src={PH('causerie/chute-entrepot.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)', filter: 'grayscale(0.6)'}} /><div style={{position: 'absolute', left: 20, top: 20}}><Chip c={RED} dark={false} size={26}>Échecs du passé</Chip></div></div>
                <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: 30, overflow: 'hidden', border: `6px solid ${GREEN}`}}><Img src={PH('promo/terrain-controle.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /><div style={{position: 'absolute', left: 20, top: 20}}><Chip c={GREEN} size={26}>Efforts d'aujourd'hui</Chip></div></div>
              </div>
            </Abs>
            {t > 214.3 && <Row y={1260}><Chip c={GREEN} q={spring(t, 214.4)} size={30}>Prévenir les échecs de demain</Chip></Row>}
            {t > 221.2 && null}
          </AbsoluteFill>
        );
      })()}
      {t > 221.2 && t < 234.3 && (
        <AbsoluteFill style={{opacity: win(t, 221.2, 234.3, 0.35)}}>
          <Title>{t < 226.8 ? <>Ils mesurent les <span style={{color: GREEN}}>actions</span></> : <>La santé de la <span style={{color: GREEN}}>culture sécurité</span></>}</Title>
          {t < 227.0 && <Row y={720} gap={16}>{[['L\'échec', RED, 221.3], ['Les actions', GREEN, 223.1]].map(([l, c, at], k) => t > (at as number) && <div key={l as string} style={{position: 'relative', transform: `scale(${spring(t, at as number)})`}}><Chip c={c as string} dark={k === 1} size={44}>{l}</Chip>{k === 0 && <div style={{position: 'absolute', left: -10, right: -10, top: '50%', height: 8, background: LIGHT, transform: `scaleX(${prog(t, 222.2, 222.6)})`, transformOrigin: '0 50%'}} />}</div>)}</Row>}
          {t > 226.8 && (
            <>
              <Abs x={140} y={640} w={800} h={560} style={{borderRadius: 30, overflow: 'hidden', border: '6px solid #fff', transform: `scale(${spring(t, 226.9)})`}}><Img src={PH('induction/accueil-groupe.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                <svg width={800} height={560} style={{position: 'absolute', inset: 0}}><polyline points="0,300 200,300 240,220 280,380 320,260 360,300 800,300" fill="none" stroke={GREEN} strokeWidth={8} pathLength={1} strokeDasharray="0.3 0.7" strokeDashoffset={-(t - 227) * 0.6} /></svg>
              </Abs>
              <Abs x={700} y={1080} style={{transform: `rotate(-20deg) scale(${spring(t, 227.9)})`}}><F n="stethoscope" size={200} /></Abs>
              {t > 230.6 && <Abs x={110} y={1260}><Chip c={LIGHT} q={spring(t, 230.7)} size={28}>Pas seulement ses blessures</Chip></Abs>}
            </>
          )}
        </AbsoluteFill>
      )}
      {t > 232.2 && (
        <AbsoluteFill style={{opacity: pop(t, 232.2)}}>
          <Title>{t < 255.4 ? <>Concrètement, on <span style={{color: GREEN}}>mesure</span>…</> : <>Un <span style={{color: GREEN}}>investissement positif</span></>}</Title>
          {t < 255.6 && [['Formations suivies et comprises', 'promo/participants.jpg', 237.9, 0.8], ['Audits de maintenance préventive', 'promo/hse-machine.jpg', 245.9, 0.65], ['Risques identifiés et corrigés', 'iso26/tablette-matrice.jpg', 251.9, 0.9]].map(([l, src, at, fill], k) => t > (at as number) - 1.2 && (
            <Abs key={l as string} x={70} y={620 + k * 270} w={940} h={240} style={{borderRadius: 26, background: 'rgba(28,37,51,0.95)', border: `4px solid ${GREEN}`, overflow: 'hidden', display: 'flex', alignItems: 'center', gap: 26, transform: `translateX(${(1 - spring(t, (at as number) - 1.2)) * 1200}px)`, opacity: 1 - prog(t, 255.2, 255.6)}}>
              <Img src={PH(src as string)} style={{width: 300, height: 240, objectFit: 'cover'}} />
              <T size={38} style={{flex: 1}}>{l}</T>
              <svg width={150} height={150} style={{marginRight: 26, flexShrink: 0}}><circle cx={75} cy={75} r={58} fill="none" stroke="#24344A" strokeWidth={18} /><circle cx={75} cy={75} r={58} fill="none" stroke={GREEN} strokeWidth={18} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - (fill as number) * prog(t, at as number, (at as number) + 1.2, easeOut)} transform="rotate(-90 75 75)" /></svg>
            </Abs>
          ))}
          {t > 255.4 && (
            <>
              <Abs x={290} y={660} w={500} h={400} style={{borderRadius: '50% 50% 45% 45%', background: '#FF9EC4', boxShadow: '0 30px 60px rgba(0,0,0,0.45)', transform: `scale(${spring(t, 255.5)})`}}>
                <div style={{position: 'absolute', left: 190, top: -10, width: 120, height: 22, borderRadius: 11, background: '#C2185B'}} />
                <div style={{position: 'absolute', right: -40, top: 140, width: 70, height: 90, borderRadius: '50%', background: '#FF9EC4'}} />
                <T size={44} color={INK} style={{position: 'absolute', left: 0, right: 0, top: 170, textAlign: 'center'}}>Prévention</T>
              </Abs>
              {['casque', 'clipboard', 'boite-outils', 'loupe'].map((ic, k) => { const at = 256.7 + k * 0.4; const p = prog(t, at, at + 0.6, easeIn); return t > at && p < 1 && <Abs key={ic} x={500} y={lerp(560, 650, p)} style={{transform: `scale(${1 - p * 0.6})`, opacity: 1 - p}}><F n={ic} size={90} /></Abs>; })}
              {t > 259.5 && <Row y={1160}><Chip c={GREEN} q={spring(t, 259.6)} size={30}>… pas un échec</Chip></Row>}
            </>
          )}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 5 : une vue équilibrée ─────────── */
const P5: React.FC = () => {
  const t = useT();
  if (t < 262.8) return null;
  return (
    <AbsoluteFill style={{opacity: pop(t, 262.9, 0.5)}}>
      {t < 275.3 && (() => {
        const open = prog(t, 265.9, 266.8, easeInOut);
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 274.9, 275.3)}}>
            <Title>Deux parties de la <span style={{color: SKY}}>même histoire</span></Title>
            <Abs x={90} y={660} w={900} h={560} style={{perspective: 1800}}>
              <div style={{position: 'absolute', left: 450, top: 0, width: 450, height: 560, background: PAPER, borderRadius: '0 18px 18px 0', padding: 34, boxSizing: 'border-box', boxShadow: '0 30px 60px rgba(0,0,0,0.45)'}}><T size={34} color={GREEN}>PRÉSENT</T><T size={30} color={INK} style={{marginTop: 20}}>Ce qu'on fait pour prévenir</T></div>
              <div style={{position: 'absolute', left: 0, top: 0, width: 450, height: 560, background: PAPER, borderRadius: '18px 0 0 18px', padding: 34, boxSizing: 'border-box', transformOrigin: '100% 50%', transform: `rotateY(${(1 - open) * 170}deg)`, backfaceVisibility: 'hidden', borderRight: '3px solid #D8CFB6'}}><T size={34} color={RED}>PASSÉ</T><T size={30} color={INK} style={{marginTop: 20}}>Ce qui s'est produit</T></div>
            </Abs>
            {t > 269.1 && <Row y={1280}><Chip c={SKY} dark={false} q={spring(t, 269.2)} size={30}>Ensemble : une vision complète</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {t > 275.0 && t < 298.6 && (
        <AbsoluteFill style={{opacity: win(t, 275.0, 298.6, 0.35)}}>
          <Title>{t < 286.1 ? <>Résultats <span style={{color: DIM}}>contre</span> actions</> : <>Parfaitement <span style={{color: SKY}}>complémentaires</span></>}</Title>
          {[['Réactifs', RED, 275.1, 'Mesurent les résultats', 'souvent négatifs', 289.1, 'Repérer les tendances sur le long terme', 70], ['Préventifs', GREEN, 279.9, 'Mesurent les actions', 'efforts, contributions positives', 293.1, "Agir aujourd'hui, améliorer demain", 555]].map(([n, c, at, a, b, at2, use, x]) => t > (at as number) - 0.1 && (
            <Abs key={n as string} x={x as number} y={620} w={455} h={780} style={{borderRadius: 30, background: 'rgba(28,37,51,0.95)', border: `5px solid ${c}`, padding: 30, boxSizing: 'border-box', transform: `translateY(${(1 - spring(t, at as number)) * 900}px)`}}>
              <T size={50} color={c as string}>{n}</T>
              <T size={36} style={{marginTop: 26}}>{a}</T>
              <T size={28} color={DIM} style={{marginTop: 10}}>{b}</T>
              <svg width={390} height={170} style={{marginTop: 30}}>{n === 'Réactifs' ? <polyline points="0,40 70,70 140,60 210,110 280,100 390,150" fill="none" stroke={RED} strokeWidth={8} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, (at2 as number), (at2 as number) + 1.2)} /> : <><rect x={10} y={40} width={90} height={90} rx={16} fill="none" stroke={GREEN} strokeWidth={8} /><path d="M30 85 L55 108 L90 60" fill="none" stroke={GREEN} strokeWidth={10} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, (at2 as number) + 2.8, (at2 as number) + 3.3)} /><path d="M130 130 L380 30" stroke={GREEN} strokeWidth={8} markerEnd="" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, (at2 as number) + 3.8, (at2 as number) + 4.6)} /></>}</svg>
              {t > (at2 as number) && <T size={30} style={{marginTop: 20, opacity: pop(t, at2 as number)}}>{use}</T>}
            </Abs>
          ))}
        </AbsoluteFill>
      )}
      {t > 298.4 && t < 310.2 && (() => {
        const snap = prog(t, 303.8, 304.6, easeOut);
        return (
          <AbsoluteFill style={{opacity: win(t, 298.4, 310.2, 0.35)}}>
            <Title>{t < 302.9 ? <>Le <span style={{color: RED}}>passé</span> pour apprendre, le <span style={{color: GREEN}}>présent</span> pour agir</> : <>Deux pièces du <span style={{color: SKY}}>puzzle</span></>}</Title>
            {t < 303.0 && (
              <AbsoluteFill style={{opacity: 1 - prog(t, 302.7, 303.0)}}>
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                  <path d="M540 700 C 470 700 430 760 440 830 L 400 870 L 440 890 C 430 940 450 980 470 1000 C 440 1040 450 1100 500 1120 L 540 1140 Z" fill={RED} opacity={pop(t, 298.5)} />
                  <path d="M540 700 C 610 700 650 760 640 830 L 680 870 L 640 890 C 650 940 630 980 610 1000 C 640 1040 630 1100 580 1120 L 540 1140 Z" fill={GREEN} opacity={pop(t, 300.3)} />
                </svg>
                {t > 298.5 && <Abs x={110} y={1180}><Chip c={RED} dark={false} q={spring(t, 298.6)} size={28}>← Passé : apprendre</Chip></Abs>}
                {t > 300.3 && <Abs x={590} y={1180}><Chip c={GREEN} q={spring(t, 300.4)} size={28}>Présent : agir →</Chip></Abs>}
              </AbsoluteFill>
            )}
            {t > 302.9 && (
              <>
                {[0, 1].map((k) => (
                  <Abs key={k} x={k ? lerp(760, 540, snap) : lerp(80, 300, snap)} y={760} w={240} h={240} style={{background: k ? GREEN : RED, borderRadius: 20, clipPath: k ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 62%, 18% 62%, 18% 38%, 0 38%)' : 'polygon(0 0, 100% 0, 100% 38%, 118% 38%, 118% 62%, 100% 62%, 100% 100%, 0 100%)', transform: `scale(${spring(t, 303.0 + k * 0.15)})`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={34} color={k ? INK : '#fff'}>{k ? 'Préventifs' : 'Réactifs'}</T></Abs>
                ))}
                {t > 305.0 && <Abs x={0} y={1120} w={1080} style={{textAlign: 'center'}}><Hand size={46} color={DIM} style={{opacity: pop(t, 305.1)}}>le message à retenir ?</Hand></Abs>}
              </>
            )}
          </AbsoluteFill>
        );
      })()}
      {t > 310.0 && t < 324.9 && (() => {
        const lid = t > 312.1 ? Math.sin(Math.min(1, (t - 312.1) * 2) * Math.PI) : 0;
        return (
          <AbsoluteFill style={{opacity: win(t, 310.0, 324.9, 0.35)}}>
            <Title>{t < 319.2 ? <>Ne pas les <span style={{color: RED}}>jeter</span>…</> : <>Un <span style={{color: SKY}}>tableau de bord équilibré</span></>}</Title>
            {t < 319.4 && (
              <AbsoluteFill style={{opacity: 1 - prog(t, 319.0, 319.4)}}>
                <Abs x={380} y={900} w={320} h={380} style={{borderRadius: '0 0 30px 30px', background: '#55606E', borderTop: '10px solid #3B4450'}} />
                <Abs x={360} y={860 - lid * 120} w={360} h={50} style={{borderRadius: 14, background: '#3B4450', transform: `rotate(${-lid * 25}deg)`, transformOrigin: '0 100%'}} />
                <Abs x={lerp(620, 420, prog(t, 312.1, 312.7, easeIn)) + (t > 312.7 ? (t - 312.7) * 200 : 0)} y={lerp(640, 760, prog(t, 312.1, 312.7)) - (t > 312.7 ? (t - 312.7) * 180 : 0)} w={240} h={150} style={{borderRadius: 18, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${t > 312.7 ? (t - 312.7) * 40 : 0}deg)`, opacity: t < 315 ? 1 : 1 - prog(t, 315, 315.5)}}><T size={30} color="#fff">Réactifs</T></Abs>
                {t > 314.3 && <Abs x={110} y={1330}><Chip c={LIGHT} q={spring(t, 314.4)} size={28}>Une information importante</Chip></Abs>}
                {t > 317.5 && <Abs x={110} y={1420}><Chip c={RED} dark={false} q={spring(t, 317.5)} size={28}>L'erreur : ne regarder qu'eux</Chip></Abs>}
              </AbsoluteFill>
            )}
            {t > 319.2 && (
              <Abs x={90} y={660} w={900} h={460} style={{borderRadius: 40, background: '#151C27', border: '6px solid #2C3A4C', transform: `scale(${spring(t, 319.4)})`}}>
                {[[0, RED, 'Réactifs'], [1, GREEN, 'Préventifs']].map(([k, c, l]) => (
                  <div key={k as number} style={{position: 'absolute', left: 60 + (k as number) * 420, top: 50, width: 360, height: 360}}>
                    <svg width={360} height={300}><path d={arc(180, 200, 150, -120, 120)} fill="none" stroke="#2C3A4C" strokeWidth={26} /><path d={arc(180, 200, 150, -120, lerp(-120, 0, prog(t, 320.4 + (k as number) * 0.3, 321.4 + (k as number) * 0.3, easeOut)))} fill="none" stroke={c as string} strokeWidth={26} strokeLinecap="round" /></svg>
                    <T size={38} color={c as string} style={{textAlign: 'center', marginTop: -40}}>{l}</T>
                  </div>
                ))}
              </Abs>
            )}
          </AbsoluteFill>
        );
      })()}
      {t > 324.7 && t < 343.4 && <Drive />}
      {t > 343.1 && (() => {
        const sun = prog(t, 356.8, 361.0, easeInOut);
        return (
          <AbsoluteFill style={{opacity: pop(t, 343.2)}}>
            <AbsoluteFill style={{background: `linear-gradient(180deg, rgba(255,182,39,${0.25 * sun}) 0%, transparent 60%)`}} />
            <Title>{t < 351.7 ? <>Mesurer la <span style={{color: GREEN}}>sécurité</span> ou les <span style={{color: RED}}>accidents</span> ?</> : <>Regarder <span style={{color: AMBER}}>vers l'avant</span></>}</Title>
            {t < 351.9 && (
              <AbsoluteFill style={{opacity: 1 - prog(t, 351.5, 351.9)}}>
                {[['La sécurité', GREEN, 347.0, 640], ['Les accidents', RED, 349.8, 940]].map(([l, c, at, y]) => t > (at as number) - 0.3 && <Abs key={l as string} x={140} y={y as number} w={800} h={220} style={{borderRadius: 30, background: 'rgba(28,37,51,0.95)', border: `5px solid ${c}`, display: 'flex', alignItems: 'center', gap: 30, padding: '0 40px', boxSizing: 'border-box', transform: `scale(${spring(t, at as number)})`}}><div style={{width: 120, height: 64, borderRadius: 32, background: c as string, position: 'relative'}}><div style={{position: 'absolute', top: 6, left: (l as string).includes('sécu') ? 62 : 6, width: 52, height: 52, borderRadius: 26, background: '#fff'}} /></div><T size={52} color={c as string}>{l}</T></Abs>)}
              </AbsoluteFill>
            )}
            {t > 351.7 && (
              <>
                <Row y={640} gap={20}>
                  {[['Mesurer les accidents', 'facile', RED, 351.8], ['Mesurer la sécurité', 'réflexion, équilibre', GREEN, 354.1]].map(([a, b, c, at]) => t > (at as number) && <div key={a as string} style={{width: 440, padding: 26, borderRadius: 26, background: 'rgba(28,37,51,0.95)', border: `4px solid ${c}`, transform: `scale(${spring(t, at as number)})`}}><T size={34} color={c as string}>{a}</T><T size={30} color={DIM} style={{marginTop: 10}}>{b}</T></div>)}
                </Row>
                {t > 356.7 && <Abs x={190} y={960} style={{opacity: pop(t, 356.8)}}><Windshield w={700} clear={lerp(0.85, 1, sun)} t={t} /></Abs>}
                {t > 359.5 && <Row y={1360}><Chip c={AMBER} q={spring(t, 359.6)} size={34}>C'est tout le défi</Chip></Row>}
              </>
            )}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/** Vue conducteur : rétroviseur contre pare-brise, virages et obstacles. */
const Drive: React.FC = () => {
  const t = useT();
  const mirrorOnly = t > 328.0 && t < 338.0;
  const front = prog(t, 338.0, 339.2, easeInOut);
  const fog = mirrorOnly ? 0.9 : 0.9 * (1 - front);
  return (
    <AbsoluteFill style={{opacity: win(t, 324.7, 343.4, 0.35)}}>
      <Title>{t < 328.0 ? <>Piloter avec le seul <span style={{color: RED}}>taux d'accident</span>…</> : t < 338.0 ? <>… c'est conduire dans le <span style={{color: RED}}>rétroviseur</span></> : <>Regarder par le <span style={{color: GREEN}}>pare-brise</span></>}</Title>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <defs><linearGradient id="dsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7CC4FF" /><stop offset="100%" stopColor="#D8ECFF" /></linearGradient></defs>
        <rect x={60} y={620} width={960} height={420} fill="url(#dsky)" />
        <rect x={60} y={1040} width={960} height={330} fill="#4B5563" />
        <path d={`M540 1040 C ${560 + Math.sin(t) * 40} 1150, ${420 + Math.sin(t * 0.8) * 60} 1250, 300 1370 L 780 1370 C ${640 + Math.sin(t * 0.8) * 60} 1250, ${600 + Math.sin(t) * 40} 1150, 560 1040 Z`} fill="#2F3742" />
        {t > 336.3 && <g opacity={pop(t, 336.4)}><path d="M700 980 L760 980 L730 930 Z" fill={AMBER} /><rect x={725} y={980} width={10} height={60} fill="#555" /></g>}
        {t > 337.0 && <g opacity={pop(t, 337.1)}><rect x={470} y={1180} width={120} height={50} rx={8} fill={RED} /><rect x={480} y={1188} width={100} height={10} fill="#fff" /></g>}
        <rect x={60} y={620} width={960} height={750} fill="#DDE6EE" opacity={fog} />
        <path d="M60 620 L1020 620 L1020 1370 L60 1370 Z M120 680 Q540 640 960 680 L1000 1320 L80 1320 Z" fill="#141A22" fillRule="evenodd" />
        <circle cx={540} cy={1500} r={170} fill="none" stroke="#1C2533" strokeWidth={36} />
        <rect x={370} y={1490} width={340} height={26} rx={13} fill="#1C2533" />
      </svg>
      <Abs x={350} y={640} w={380} h={130} style={{borderRadius: 26, background: '#111', border: `6px solid ${mirrorOnly ? RED : '#333'}`, overflow: 'hidden', boxShadow: mirrorOnly ? `0 0 40px ${RED}` : 'none', transform: `scale(${1 + (mirrorOnly ? 0.25 : 0)})`}}>
        <Img src={PH('causerie/chute-escalier.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)', filter: 'grayscale(0.4)'}} />
      </Abs>
      {t > 331.2 && t < 338.0 && <Abs x={90} y={810}><Chip c={LIGHT} q={spring(t, 331.3)} size={26}>Utile : d'où l'on vient</Chip></Abs>}
      {t > 333.2 && t < 338.0 && <Abs x={500} y={900}><Chip c={RED} dark={false} q={spring(t, 333.3)} size={26}>Dangereux : où l'on va</Chip></Abs>}
      {t > 339.0 && <Abs x={90} y={820}><Chip c={GREEN} q={spring(t, 339.1)} size={30}>Pare-brise = indicateurs préventifs</Chip></Abs>}
    </AbsoluteFill>
  );
};

/* ─────────── En-tête, fond, sortie ─────────── */
const Header: React.FC = () => {
  const t = useT();
  const p = PT.find((x) => t >= x.at + WIPE - 0.3 && t < x.end);
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 95, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {t > 2.5 && t < 28.2 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 236, display: 'flex', justifyContent: 'center', opacity: pop(t, 2.5) * (1 - prog(t, 27.8, 28.2))}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '8px 24px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${AMBER}`}}><F n="graphique" size={40} /><T size={34}>Mesurer la <span style={{color: GREEN}}>sécurité</span></T></div>
        </div>
      )}
      {p && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 222, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: pop(t, p.at + WIPE - 0.3) * (1 - prog(t, p.end - 0.3, p.end))}}>
          <Windshield w={110} clear={p.n / 5} t={t} />
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
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #1A2A44 0%, #0E1726 60%)'}} />
      {Array.from({length: 8}, (_, k) => <div key={k} style={{position: 'absolute', left: 536, top: ((k * 260 + t * 120) % 2080) - 160, width: 8, height: 120, borderRadius: 4, background: 'rgba(255,182,39,0.07)'}} />)}
    </AbsoluteFill>
  );
};
const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2}, {at: 2.6, s: 'sfx/pop', v: 0.3}, {at: 5.1, s: 'tampon', v: 0.4}, {at: 7.3, s: 'tampon', v: 0.45}, {at: 7.4, s: 'validation', v: 0.3},
  {at: 8.3, s: 'sfx/whoosh', v: 0.3}, ...[9.9, 10.9, 12.0].map((at) => ({at, s: 'sfx/pop', v: 0.28})), {at: 13.1, s: 'sfx/pop', v: 0.3}, {at: 15.3, s: 'tick', v: 0.3}, ...Array.from({length: 8}, (_, k) => ({at: 16.7 + k * 0.12, s: 'tick', v: 0.2})),
  {at: 17.7, s: 'sfx/click', v: 0.3}, {at: 19.0, s: 'sfx/rise', v: 0.25}, {at: 21.6, s: 'sfx/whoosh', v: 0.3}, {at: 23.0, s: 'deep-hit', v: 0.4}, {at: 23.05, s: 'sfx/thud', v: 0.3},
  ...PT.flatMap((p) => [{at: p.at, s: 'sfx/swish', v: 0.45}, {at: p.at + 0.7, s: 'bass-hit', v: 0.3}, {at: p.at + WIPE - 0.6, s: 'sfx/swish', v: 0.4}, {at: p.at + WIPE - 0.05, s: 'sfx/click', v: 0.35}]),
  {at: 30.7, s: 'sfx/rise', v: 0.25}, {at: 30.8, s: 'bass-hit', v: 0.3}, {at: 30.5, s: 'sfx/pop', v: 0.25}, {at: 31.5, s: 'sfx/pop', v: 0.25}, ...Array.from({length: 9}, (_, k) => ({at: 32.4 + k * 0.05, s: 'sfx/pop', v: 0.1})),
  {at: 34.6, s: 'sfx/whoosh', v: 0.25}, ...Array.from({length: 6}, (_, k) => ({at: 36.9 + k * 0.25, s: 'tick', v: 0.18})), {at: 38.4, s: 'sfx/click', v: 0.4}, {at: 39.9, s: 'page', v: 0.3}, ...Array.from({length: 12}, (_, k) => ({at: 42.6 + k * 0.18, s: 'tick', v: 0.1})),
  {at: 42.7, s: 'sfx/whoosh', v: 0.25}, {at: 44.9, s: 'sfx/thud', v: 0.3}, {at: 46.6, s: 'sfx/thud', v: 0.3}, {at: 47.5, s: 'sfx/pop', v: 0.3},
  {at: 51.0, s: 'sfx/whoosh', v: 0.3}, ...Array.from({length: 6}, (_, k) => ({at: 53.3 + k * 0.15, s: 'stylo', v: 0.15})), {at: 57.2, s: 'sfx/pop', v: 0.25}, {at: 58.0, s: 'sfx/pop', v: 0.22}, {at: 61.1, s: 'sfx/ding', v: 0.2},
  {at: 64.1, s: 'page', v: 0.35}, ...Array.from({length: 6}, (_, k) => ({at: 67.6 + k * 0.25, s: 'tampon', v: 0.22})), {at: 71.8, s: 'sfx/pop', v: 0.22},
  {at: 78.3, s: 'sfx/whoosh', v: 0.25}, {at: 79.9, s: 'sfx/whoosh', v: 0.25}, {at: 81.9, s: 'sfx/pop', v: 0.22}, {at: 85.5, s: 'sfx/pop', v: 0.22}, {at: 87.6, s: 'page', v: 0.45}, {at: 88.6, s: 'sfx/thud', v: 0.35},
  {at: 95.7, s: 'sfx/swish', v: 0.35}, {at: 98.4, s: 'sfx/swish', v: 0.35}, ...[106.1, 112.7].map((at) => ({at, s: 'sfx/pop', v: 0.25})), ...[108.1, 115.4].flatMap((at) => Array.from({length: 8}, (_, k) => ({at: at + k * 0.15, s: 'tick', v: 0.12}))), ...[110.8, 117.6].map((at) => ({at, s: 'sfx/ding', v: 0.18})),
  {at: 119.4, s: 'sfx/whoosh', v: 0.3}, {at: 121.8, s: 'deep-hit', v: 0.35}, {at: 129.3, s: 'sfx/pop', v: 0.22}, {at: 132.2, s: 'sfx/pop', v: 0.3}, {at: 133.9, s: 'sfx/pop', v: 0.3}, {at: 135.6, s: 'sfx/thud', v: 0.3},
  {at: 142.9, s: 'sfx/pop', v: 0.25}, {at: 147.0, s: 'bass-hit', v: 0.3}, {at: 154.7, s: 'sfx/thud', v: 0.35}, {at: 158.8, s: 'sfx/pop', v: 0.22}, {at: 161.6, s: 'tension', v: 0.12, dur: 4},
  {at: 166.7, s: 'page', v: 0.35}, {at: 171.6, s: 'sfx/ding', v: 0.25}, {at: 175.0, s: 'sfx/whoosh', v: 0.25}, {at: 177.4, s: 'soft-whoosh', v: 0.3, dur: 1.2}, {at: 179.3, s: 'sfx/pop', v: 0.22}, {at: 181.9, s: 'sfx/pop', v: 0.22},
  {at: 183.0, s: 'sfx/whoosh', v: 0.25}, ...[185.1, 188.4, 194.0].flatMap((at) => [{at, s: 'sfx/swish', v: 0.3}, {at: at + 0.9, s: 'sfx/thud', v: 0.25}]), {at: 196.8, s: 'sfx/pop', v: 0.25}, {at: 199.6, s: 'sfx/rise', v: 0.3}, {at: 201.1, s: 'tension', v: 0.15, dur: 2.5}, {at: 203.7, s: 'deep-hit', v: 0.35},
  {at: 209.2, s: 'sfx/whoosh', v: 0.3}, {at: 211.5, s: 'sfx/swish', v: 0.45}, {at: 214.4, s: 'sfx/ding', v: 0.25}, {at: 221.3, s: 'sfx/pop', v: 0.25}, {at: 222.2, s: 'stylo', v: 0.3}, {at: 223.1, s: 'validation', v: 0.25},
  {at: 226.9, s: 'sfx/whoosh', v: 0.25}, {at: 227.9, s: 'sfx/pop', v: 0.25}, {at: 230.7, s: 'sfx/pop', v: 0.2}, ...[236.7, 244.7, 250.7].map((at) => ({at, s: 'sfx/whoosh', v: 0.28})), ...[237.9, 245.9, 251.9].map((at) => ({at, s: 'sfx/rise', v: 0.2})),
  {at: 255.5, s: 'sfx/pop', v: 0.3}, ...Array.from({length: 4}, (_, k) => ({at: 257.2 + k * 0.4, s: 'sfx/ding', v: 0.18})), {at: 259.6, s: 'validation', v: 0.3},
  {at: 265.9, s: 'page', v: 0.4}, {at: 269.2, s: 'sfx/pop', v: 0.22}, {at: 275.1, s: 'sfx/whoosh', v: 0.3}, {at: 279.9, s: 'sfx/whoosh', v: 0.3}, {at: 289.1, s: 'stylo', v: 0.22}, {at: 295.9, s: 'validation', v: 0.25},
  {at: 298.6, s: 'sfx/pop', v: 0.25}, {at: 300.4, s: 'sfx/pop', v: 0.25}, {at: 303.0, s: 'sfx/whoosh', v: 0.25}, {at: 304.5, s: 'sfx/click', v: 0.45}, {at: 304.6, s: 'validation', v: 0.3},
  {at: 312.1, s: 'sfx/swish', v: 0.3}, {at: 312.6, s: 'sfx/thud', v: 0.35}, {at: 314.4, s: 'sfx/pop', v: 0.22}, {at: 317.5, s: 'sfx/pop', v: 0.22}, {at: 319.4, s: 'sfx/whoosh', v: 0.25}, {at: 320.4, s: 'sfx/rise', v: 0.25},
  {at: 325.0, s: 'soft-whoosh', v: 0.3, dur: 2}, {at: 330.3, s: 'deep-hit', v: 0.35}, {at: 333.3, s: 'sfx/pop', v: 0.22}, {at: 336.4, s: 'sfx/pop', v: 0.25}, {at: 337.1, s: 'alarme', v: 0.15, dur: 0.8}, {at: 338.0, s: 'sfx/swish', v: 0.4}, {at: 339.1, s: 'validation', v: 0.3},
  {at: 347.0, s: 'sfx/click', v: 0.4}, {at: 349.8, s: 'sfx/click', v: 0.4}, {at: 351.8, s: 'sfx/pop', v: 0.22}, {at: 354.1, s: 'sfx/pop', v: 0.22}, {at: 356.8, s: 'soft-whoosh', v: 0.3, dur: 3}, {at: 359.6, s: 'validation', v: 0.32},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Indicateurs: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <Bg />
    <Gate from={2.0} to={28.4}><Intro /></Gate>
    <Gate from={30.5} to={48.5}><P1 /></Gate>
    <Gate from={50.6} to={140.1}><P2 /></Gate>
    <Gate from={142.3} to={206.7}><P3 /></Gate>
    <Gate from={208.9} to={260.6}><P4 /></Gate>
    <Gate from={262.7} to={OUTRO_AT}><P5 /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><WiperWipe p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.3} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-indicateurs-securite-origine.m4a')} trimAfter={s(361.9)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

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
 * « Quart d'heure sécurité : le rendre participatif » (4 min 44) — voix d'origine, sous-titres recalés mot à mot,
 * photos réelles détourées. Fil rouge inédit : l'étincelle de la discussion, et des transitions en « bulle de
 * parole » qui s'ouvre puis éclate. Autres techniques nouvelles : étiquette qui pivote (quart d'heure ↔ causerie),
 * fossé qui s'élargit entre l'intention et l'impact puis pont-levier, bulles de pensée « liste de courses » sur photo,
 * programme distribué en éventail de cartes, chaussure qui reçoit trois cailloux, jauge d'attention qui s'évapore,
 * machine à sous des animateurs (loterie du charisme), vitre « monologue » qui vole en éclats, lecteur vidéo, cube 3D
 * et viseur de chasse aux risques, table de mixage des tons, diable à ressort de la surprise, réseau descendant vs
 * réseau maillé, flou → net (« hyper concret »), filet de sécurité sous l'animatrice, fiche recette en 3 étapes,
 * panneau de réglages du déploiement, projecteur sur un seul sujet, balance passif / participatif.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 283.7;
export const CAUSERIE_FRAMES = s(OUTRO_AT + 3.8);
const BG = '#1A1430';
const INK = '#1B1530';
const LIGHT = '#FBF7FF';
const DIM = 'rgba(251,247,255,0.65)';
const SPARK = '#FF8A3D';
const YEL = '#FFD23F';
const CYAN = '#3DD6F5';
const PINK = '#FF5F8F';
const GREEN = '#4BE08A';
const RED = '#FF5A5A';
const VIO = '#B48CFF';
const CA = (n: string) => staticFile(`causerie/${n}`);

type Pt = {n: number; l: string; at: number; end: number; c: string; ic: string};
const PT: Pt[] = [
  {n: 1, l: "Les freins à l'efficacité", at: 70.6, end: 111.8, c: RED, ic: 'stop'},
  {n: 2, l: "Capter l'attention", at: 112.0, end: 148.0, c: YEL, ic: 'aimant'},
  {n: 3, l: 'Dynamique participative', at: 148.2, end: 186.9, c: GREEN, ic: 'causerie'},
  {n: 4, l: 'Accompagner les animateurs', at: 187.1, end: 223.8, c: CYAN, ic: 'formatrice'},
  {n: 5, l: 'Stratégie de déploiement', at: 224.0, end: 260.6, c: VIO, ic: 'engrenage'},
  {n: 6, l: 'Conclusion', at: 260.8, end: 283.4, c: SPARK, ic: 'etincelles'},
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
const Chip: React.FC<{children: React.ReactNode; c?: string; q?: number; size?: number; dark?: boolean; style?: React.CSSProperties}> = ({children, c = SPARK, q = 1, size = 34, dark = true, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 26px', borderRadius: 50, background: c, color: dark ? INK : '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size, transform: `scale(${q})`, boxShadow: `0 12px 30px ${c}55`, whiteSpace: 'nowrap', ...style}}>{children}</div>
);
const Row: React.FC<{y: number; children: React.ReactNode; gap?: number}> = ({y, children, gap = 14}) => (
  <Abs x={0} y={y} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap, flexWrap: 'wrap', padding: '0 40px', boxSizing: 'border-box'}}>{children}</Abs>
);
const Title: React.FC<{children: React.ReactNode; y?: number}> = ({children, y = 450}) => <Abs x={60} y={y} w={960} style={{textAlign: 'center'}}><T size={58}>{children}</T></Abs>;
const Photo: React.FC<{src: string; x: number; y: number; w: number; h: number; q?: number; r?: number; pos?: string; children?: React.ReactNode; filter?: string}> = ({src, x, y, w, h, q = 1, r = 0, pos = 'center', children, filter}) => {
  const t = useT();
  return (
    <Abs x={x} y={y} w={w} h={h} style={{borderRadius: 34, overflow: 'hidden', border: '6px solid rgba(255,255,255,0.92)', boxShadow: '0 30px 60px rgba(0,0,0,0.45)', transform: `scale(${q}) rotate(${r}deg)`}}>
      <Img src={src} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${1.05 + (t % 30) * 0.004})`, filter}} />
      {children}
    </Abs>
  );
};
/** Bulle de parole (forme SVG) — motif récurrent de la vidéo. */
const Bubble: React.FC<{w: number; h: number; c: string; tail?: 'l' | 'r'; children?: React.ReactNode; style?: React.CSSProperties}> = ({w, h, c, tail = 'l', children, style}) => (
  <div style={{position: 'relative', width: w, height: h, ...style}}>
    <svg width={w} height={h + 40} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', filter: 'drop-shadow(0 14px 24px rgba(0,0,0,0.35))'}}>
      <rect x={0} y={0} width={w} height={h} rx={Math.min(40, h / 2)} fill={c} />
      <path d={tail === 'l' ? `M${w * 0.18} ${h - 2} L${w * 0.12} ${h + 36} L${w * 0.34} ${h - 2} Z` : `M${w * 0.66} ${h - 2} L${w * 0.88} ${h + 36} L${w * 0.82} ${h - 2} Z`} fill={c} />
    </svg>
    <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px'}}>{children}</div>
  </div>
);
/** L'étincelle : noyau lumineux + rayons qui scintillent. */
const Spark: React.FC<{size: number; t: number; c?: string}> = ({size, t, c = SPARK}) => (
  <svg width={size} height={size} viewBox="-50 -50 100 100" style={{overflow: 'visible'}}>
    {Array.from({length: 8}, (_, k) => {
      const a = (k * Math.PI) / 4 + t * 0.6;
      const L = 30 + 12 * Math.sin(t * 9 + k * 1.7);
      return <line key={k} x1={Math.cos(a) * 10} y1={Math.sin(a) * 10} x2={Math.cos(a) * L} y2={Math.sin(a) * L} stroke={k % 2 ? YEL : c} strokeWidth={k % 2 ? 4 : 6} strokeLinecap="round" />;
    })}
    <circle r={13} fill="#FFF6D6" style={{filter: `drop-shadow(0 0 10px ${c})`}} />
  </svg>
);

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: BG, opacity: 1 - out}}>
      <Img src={CA('groupe.jpg')} style={{position: 'absolute', left: -560, top: 0, width: 2200, height: 1920, objectFit: 'cover', filter: 'saturate(0.85)'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${BG}DD 0%, ${BG}55 30%, ${BG}CC 52%, ${BG} 78%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={70} y={860}>
        <Bubble w={940} h={520} c={LIGHT}>
          <div>
            <div style={{display: 'inline-block', padding: '8px 24px', borderRadius: 40, background: SPARK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>CAUSERIE PRÉVENTION</div>
            <T size={104} color={INK} style={{marginTop: 18, textTransform: 'uppercase', letterSpacing: -3}}>Quart d'heure</T>
            <T size={104} color={INK} style={{textTransform: 'uppercase', letterSpacing: -3}}>sécurité</T>
            <T size={56} color={SPARK} style={{marginTop: 12}}>le rendre participatif</T>
          </div>
        </Bubble>
      </Abs>
      <Abs x={860} y={790}><Spark size={170} t={t} /></Abs>
      <Abs x={0} y={1500} w={1080} style={{textAlign: 'center'}}><Hand size={54} color={DIM}>de l'écoute passive à l'étincelle de la discussion</Hand></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : bulle de parole qui s'ouvre puis éclate ─────────── */
const BubbleWipe: React.FC<{p: Pt}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const grow = prog(t, a, a + 0.55, easeInOut);
  const burst = prog(t, b - 0.45, b, easeIn);
  const R = 1500 * grow * (1 + burst * 0.25);
  return (
    <AbsoluteFill style={{zIndex: 55, opacity: 1 - burst}}>
      <div style={{position: 'absolute', left: 540 - R, top: 900 - R * 0.8, width: R * 2, height: R * 1.6, borderRadius: '50%', background: `radial-gradient(circle at 50% 45%, ${p.c}, ${BG} 95%)`}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><path d={`M${380 - 60 * grow} ${900 + R * 0.75} L${260 - 200 * grow} ${1000 + R * 0.95} L${520} ${900 + R * 0.72} Z`} fill={p.c} opacity={grow} /></svg>
      {Array.from({length: 14}, (_, k) => {
        const ang = (k / 14) * Math.PI * 2;
        const d = burst * 700;
        return <div key={k} style={{position: 'absolute', left: 540 + Math.cos(ang) * (420 + d) - 16, top: 900 + Math.sin(ang) * (420 + d) - 16, width: 32, height: 32, borderRadius: 16, background: k % 2 ? YEL : '#fff', opacity: burst > 0 ? 1 - burst : 0}} />;
      })}
      <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center', transform: `scale(${spring(t, a + 0.3)})`}}>
        <div style={{width: 260, height: 260, borderRadius: 130, background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={p.ic} size={170} /></div>
      </Abs>
      <Abs x={60} y={880} w={960} style={{textAlign: 'center', transform: `translateY(${(1 - pop(t, a + 0.4, 0.5)) * 60}px)`, opacity: pop(t, a + 0.4)}}>
        <div style={{display: 'inline-block', padding: '8px 24px', borderRadius: 40, background: 'rgba(0,0,0,0.3)', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff', letterSpacing: 2}}>{p.n < 6 ? `AXE ${p.n}/5` : 'POUR CONCLURE'}</div>
        <T size={92} style={{marginTop: 20, textShadow: '0 10px 30px rgba(0,0,0,0.4)'}}>{p.l}</T>
      </Abs>
      <Abs x={500} y={1230}><Spark size={90} t={t} c="#fff" /></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Introduction ─────────── */
const Intro: React.FC = () => {
  const t = useT();
  const o = 1 - prog(t, 55.6, 56.0);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* étiquette qui pivote + photo réelle */}
      {t < 15.5 && (() => {
        const flip = prog(t, 2.3, 2.9, easeInOut) - prog(t, 3.9, 4.5, easeInOut) + prog(t, 5.3, 5.9, easeInOut);
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 15.1, 15.5)}}>
            <Title>Le rituel <span style={{color: SPARK}}>incontournable</span></Title>
            <Abs x={190} y={560} w={700} h={130} style={{perspective: 1200}}>
              <div style={{width: '100%', height: '100%', transformStyle: 'preserve-3d', transform: `rotateX(${flip * 180}deg)`}}>
                <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: 24, background: YEL, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 30px rgba(0,0,0,0.35)'}}><T size={54} color={INK}>Quart d'heure sécurité</T></div>
                <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateX(180deg)', borderRadius: 24, background: CYAN, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 30px rgba(0,0,0,0.35)'}}><T size={54} color={INK}>Causerie prévention</T></div>
              </div>
            </Abs>
            <Photo src={CA('groupe.jpg')} x={110} y={740} w={860} h={640} q={spring(t, 3.0)}>
              {t > 11.3 && <div style={{position: 'absolute', left: 30, top: 30, transform: `scale(${spring(t, 11.3)})`}}><Chip c={GREEN} size={30}><F n="equipe" size={44} />Réunir les équipes</Chip></div>}
            </Photo>
            {t > 5.9 && t < 13.0 && <Row y={1420}><Chip c={SPARK} q={spring(t, 5.95)}>Entreprise · industrie</Chip></Row>}
            {t > 13.0 && <Row y={1420}><Chip c={YEL} q={spring(t, 13.06)}><F n="trophee" size={44} />Excellence opérationnelle</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* le fossé intention / impact, puis le pont-levier */}
      {t > 15.3 && t < 30.2 && (() => {
        const gap = 60 + 240 * prog(t, 16.6, 18.4, easeInOut);
        const bridge = prog(t, 25.3, 26.8, easeOut);
        return (
          <AbsoluteFill style={{opacity: win(t, 15.3, 30.2, 0.4)}}>
            <Title>Un <span style={{color: RED}}>fossé énorme</span></Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <path d={`M0 900 L${540 - gap / 2} 900 L${540 - gap / 2 - 30} 1500 L0 1500 Z`} fill="#3B2F5C" />
              <path d={`M1080 900 L${540 + gap / 2} 900 L${540 + gap / 2 + 30} 1500 L1080 1500 Z`} fill="#3B2F5C" />
              <path d={`M0 900 L${540 - gap / 2} 900`} stroke={CYAN} strokeWidth={10} />
              <path d={`M1080 900 L${540 + gap / 2} 900`} stroke={GREEN} strokeWidth={10} />
              {/* le pont qui s'abaisse comme un levier */}
              <g transform={`rotate(${-80 * (1 - bridge)} ${540 - gap / 2} 900)`} opacity={t > 25.2 ? 1 : 0}>
                <rect x={540 - gap / 2} y={884} width={gap} height={24} rx={6} fill={SPARK} />
                {Array.from({length: 8}, (_, k) => <rect key={k} x={540 - gap / 2 + 8 + k * (gap - 16) / 8} y={888} width={(gap - 16) / 8 - 6} height={16} rx={3} fill="#FFB27A" />)}
              </g>
            </svg>
            <Abs x={40} y={680} w={440} style={{textAlign: 'center', opacity: pop(t, 17.6)}}><F n="ampoule" size={110} style={{margin: '0 auto'}} /><T size={40} color={CYAN}>L'intention</T></Abs>
            <Abs x={600} y={680} w={440} style={{textAlign: 'center', opacity: pop(t, 18.7)}}><F n="cible" size={110} style={{margin: '0 auto'}} /><T size={40} color={GREEN}>L'impact réel</T></Abs>
            {t > 24.0 && t < 25.3 && <Row y={1040}><Chip c="#5D5480" dark={false} q={spring(t, 24.0)}>Obligation monotone</Chip></Row>}
            {t > 25.3 && <Row y={1040}><Chip c={SPARK} q={spring(t, 25.4)}>Un levier de sécurité</Chip></Row>}
            {t > 27.1 && <Row y={1180}><Chip c={LIGHT} q={spring(t, 27.2)} size={30}><F n="megaphone" size={44} />Ce que disent les experts en communication</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* le paradoxe */}
      {t > 30.0 && t < 40.8 && (
        <AbsoluteFill style={{opacity: win(t, 30.0, 40.8, 0.4)}}>
          <Title>Le vrai <span style={{color: YEL}}>paradoxe</span></Title>
          <Abs x={0} y={560} w={1080} style={{textAlign: 'center'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 260, color: YEL, lineHeight: 1, transform: `scale(${spring(t, 31.9)}) rotate(${Math.sin(t * 2) * 6}deg)`, textShadow: `0 0 50px ${YEL}88`}}>?</div></Abs>
          <Abs x={70} y={900} w={440} h={460} style={{borderRadius: 30, background: 'rgba(75,224,138,0.12)', border: `4px solid ${GREEN}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 34.5)})`}}>
            <F n="coeur" size={170} style={{transform: `scale(${1 + 0.08 * Math.sin(t * 8)})`}} /><T size={44} style={{marginTop: 14, textAlign: 'center'}}>Conçu pour sauver des vies</T>
          </Abs>
          <Abs x={570} y={900} w={440} h={460} style={{borderRadius: 30, background: 'rgba(255,90,90,0.12)', border: `4px solid ${RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 38.2)})`}}>
            <F n="fatigue" size={170} /><T size={44} style={{marginTop: 14, textAlign: 'center'}}>… fini dans l'inattention</T>
            {['z', 'z', 'Z'].map((z, k) => <div key={k} style={{position: 'absolute', right: 60 - k * 24, top: 40 - ((t * 40 + k * 30) % 90), fontFamily: sansFont, fontWeight: 900, fontSize: 40 + k * 10, color: '#fff', opacity: t > 38.6 ? 0.8 : 0}}>{z}</div>)}
          </Abs>
        </AbsoluteFill>
      )}
      {/* présents physiquement, ailleurs dans la tête */}
      {t > 40.6 && (
        <AbsoluteFill style={{opacity: pop(t, 40.6)}}>
          <Title>Une <span style={{color: RED}}>session passive</span></Title>
          <Photo src={CA('groupe.jpg')} x={60} y={700} w={960} h={720} q={spring(t, 40.8)} filter={t > 45.6 ? `saturate(${1 - 0.7 * prog(t, 45.6, 46.6)})` : undefined}>
            {t > 49.6 && [[300, 40, 0], [600, 90, 0.35], [80, 120, 0.7]].map(([x, y, d], k) => (
              <div key={k} style={{position: 'absolute', left: x, top: y, transform: `scale(${spring(t, 49.7 + d)})`, transformOrigin: 'bottom left'}}>
                <div style={{width: 250, padding: '14px 18px', borderRadius: 36, background: '#fff', boxShadow: '0 10px 20px rgba(0,0,0,0.3)'}}>
                  <Hand size={30} color={INK}>Liste de courses</Hand>
                  {[['Pain', 'Lait', 'Œufs'], ['Riz', 'Café', 'Sucre'], ['Huile', 'Savon', 'Fruits']][k].map((it, j) => (
                    <div key={it} style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 4}}><div style={{width: 24, height: 24, borderRadius: 6, border: `3px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{t > 50.3 + d + j * 0.25 && <Check p={prog(t, 50.3 + d + j * 0.25, 50.6 + d + j * 0.25)} size={20} color={SPARK} />}</div><Hand size={30} color={INK}>{it}</Hand></div>
                  ))}
                </div>
                <div style={{position: 'absolute', left: 30, bottom: -26, width: 22, height: 22, borderRadius: 11, background: '#fff'}} />
                <div style={{position: 'absolute', left: 18, bottom: -46, width: 12, height: 12, borderRadius: 6, background: '#fff'}} />
              </div>
            ))}
          </Photo>
          {t > 47.1 && t < 51.0 && <Row y={590}><Chip c={LIGHT} q={spring(t, 47.15)} size={30}>Là physiquement…</Chip><Chip c={PINK} q={spring(t, 48.5)} size={30} dark={false}>… ailleurs dans la tête</Chip></Row>}
          {t > 51.0 && <Row y={590}><Chip c={CYAN} q={spring(t, 51.05)} size={30}><F n="loupe" size={44} />Étape 1 : comprendre ce qui bloque</Chip></Row>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Programme : cartes distribuées en éventail ─────────── */
const Programme: React.FC = () => {
  const t = useT();
  const o = win(t, 55.9, 70.5, 0.4);
  if (o <= 0) return null;
  const at = [58.1, 61.26, 63.46, 66.34, 68.7];
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Title>Au programme</Title>
      {PT.slice(0, 5).map((p, k) => {
        const q = spring(t, at[k], 6, 12);
        const ang = (k - 2) * 13;
        const cur = t >= at[k] && (k === 4 || t < at[k + 1]);
        if (t < at[k]) return null;
        return (
          <div key={p.n} style={{position: 'absolute', left: 540 - 150, top: 820, width: 300, height: 440, transformOrigin: '50% 160%', transform: `translateY(${(1 - q) * 900}px) rotate(${ang * q}deg) translateY(${cur ? -40 : 0}px)`, zIndex: cur ? 5 : k}}>
            <div style={{width: '100%', height: '100%', borderRadius: 26, background: '#fff', border: `8px solid ${p.c}`, boxShadow: '0 20px 40px rgba(0,0,0,0.45)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20, boxSizing: 'border-box'}}>
              <T size={90} color={p.c} style={{WebkitTextStroke: `2px ${INK}`}}>{p.n}</T>
              <F n={p.ic} size={120} style={{marginTop: 10}} />
              <T size={32} color={INK} style={{textAlign: 'center', marginTop: 16}}>{p.l}</T>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* ─────────── Axe 1 : les freins ─────────── */
const Pebble: React.FC<{at: number; x: number; c: string}> = ({at, x, c}) => {
  const t = useT();
  if (t < at) return null;
  const fall = prog(t, at, at + 0.5, easeIn);
  return <div style={{position: 'absolute', left: x, top: -260 + 260 * fall, width: 74, height: 58, borderRadius: '48% 52% 44% 56%', background: `radial-gradient(circle at 30% 30%, #CFC6E6, ${c})`, boxShadow: '0 6px 12px rgba(0,0,0,0.4)', transform: `rotate(${fall * 200}deg) scale(${1 + 0.12 * Math.sin(Math.max(0, t - at - 0.5) * 20) * Math.exp(-(t - at - 0.5) * 4)})`}} />;
};
const P1: React.FC = () => {
  const t = useT();
  const o = win(t, 73.0, 111.8, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Title>Trois <span style={{color: RED}}>cailloux</span> dans la chaussure</Title>
      {/* chaussure en haut, fil conducteur de l'axe */}
      <Abs x={260} y={560} w={560} h={280} style={{transform: `scale(${spring(t, 77.0)})`}}>
        <F n="chaussure" size={280} style={{position: 'absolute', left: 140, top: 0}} />
        <Abs x={150} y={150} w={300} h={80} style={{overflow: 'visible'}}>
          <Pebble at={79.8} x={20} c="#6B5E8C" />
          <Pebble at={90.0} x={110} c="#7C5E8C" />
          <Pebble at={101.7} x={200} c="#5E6B8C" />
        </Abs>
        {[['1', 79.8, -10], ['2', 90.0, 230], ['3', 101.7, 470]].map(([n, a, x]) => t > (a as number) && <div key={n as string} style={{position: 'absolute', left: x as number, top: 220, width: 64, height: 64, borderRadius: 32, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, (a as number) + 0.5)})`}}><T size={36} color="#fff">{n}</T></div>)}
      </Abs>
      {/* frein 1 : déjà tout savoir, l'attention s'évapore */}
      {t > 79.6 && t < 90.0 && (() => {
        const lvl = 1 - prog(t, 87.3, 88.8, easeIn);
        return (
          <AbsoluteFill style={{opacity: win(t, 79.6, 90.0, 0.3)}}>
            <Row y={900}><Chip c={RED} dark={false} q={spring(t, 79.8)}>L'intérêt du sujet</Chip></Row>
            {[0, 1, 2].map((k) => <Abs key={k} x={130 + k * 40} y={1010 + k * 30} w={430} h={260} style={{borderRadius: 22, background: '#fff', boxShadow: '0 12px 24px rgba(0,0,0,0.35)', padding: 22, boxSizing: 'border-box', transform: `rotate(${(k - 1) * 4}deg) scale(${spring(t, 82.2 + k * 0.5)})`}}><T size={30} color={INK}>Port des EPI</T><div style={{marginTop: 16, height: 12, borderRadius: 6, background: '#E7E3EF', width: '90%'}} /><div style={{marginTop: 12, height: 12, borderRadius: 6, background: '#E7E3EF', width: '70%'}} />{k === 2 && t > 83.8 && <div style={{position: 'absolute', right: 16, bottom: 16, transform: `rotate(-10deg) scale(${spring(t, 83.85)})`, border: `5px solid ${RED}`, borderRadius: 10, padding: '2px 12px'}}><T size={30} color={RED}>DÉJÀ VU</T></div>}</Abs>)}
            <Abs x={640} y={1000} w={150} h={380} style={{borderRadius: 30, border: '6px solid #fff', overflow: 'hidden', background: 'rgba(255,255,255,0.08)'}}>
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: `${lvl * 100}%`, background: `linear-gradient(0deg, ${CYAN}, ${GREEN})`}} />
            </Abs>
            {t > 87.3 && Array.from({length: 10}, (_, k) => { const p = ((t - 87.3) * 0.9 + k * 0.1) % 1; return <div key={k} style={{position: 'absolute', left: 660 + random(`v${k}`) * 110, top: 1000 - p * 260, width: 34, height: 34, borderRadius: 17, background: 'rgba(255,255,255,0.5)', filter: 'blur(6px)', opacity: (1 - p) * (1 - prog(t, 89.4, 89.9))}} />; })}
            <Abs x={800} y={1150}><T size={34}>ATTENTION</T>{t > 87.3 && <T size={60} color={RED} style={{transform: `scale(${spring(t, 87.35)})`}}>PAF !</T>}</Abs>
          </AbsoluteFill>
        );
      })()}
      {/* frein 2 : cours magistral, vertical */}
      {t > 89.8 && t < 101.6 && (
        <AbsoluteFill style={{opacity: win(t, 89.8, 101.6, 0.3)}}>
          <Row y={900}><Chip c={RED} dark={false} q={spring(t, 90.0)}>Le mode d'animation</Chip></Row>
          <Img src={CA('orateur-d.png')} style={{position: 'absolute', left: 400, top: 990, height: 300, transform: `scale(${spring(t, 92.0)})`}} />
          {t > 93.5 && [0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 600 + k * 30, top: 1010 - k * 26, width: 60 + k * 30, height: 60 + k * 30, borderRadius: '50%', border: `5px solid ${YEL}`, borderLeftColor: 'transparent', borderBottomColor: 'transparent', opacity: ((t * 2 + k * 0.3) % 1) > 0.5 ? 1 : 0.3, transform: 'rotate(45deg)'}} />)}
          {t > 94.5 && [0, 1, 2, 3, 4].map((k) => (
            <div key={k} style={{position: 'absolute', left: 150 + k * 170, top: 1330, width: 110, textAlign: 'center', opacity: pop(t, 94.6 + k * 0.12)}}>
              <svg width={110} height={50}><path d="M55 0 L55 36 M42 24 L55 40 L68 24" stroke={YEL} strokeWidth={6} fill="none" strokeLinecap="round" /></svg>
              <div style={{width: 70, height: 70, margin: '0 auto', borderRadius: 35, background: t > 96.1 ? '#6E6A80' : '#C99467', transition: 'none'}} />
            </div>
          ))}
          {t > 97.1 && <Abs x={110} y={1000}><Chip c={YEL} q={spring(t, 97.15)}>⬇ Vertical</Chip></Abs>}
          {t > 99.5 && <Abs x={560} y={1210} style={{transform: `rotate(-8deg) scale(${spring(t, 99.5)})`, border: `7px solid ${RED}`, borderRadius: 14, padding: '2px 20px', background: 'rgba(26,20,48,0.85)'}}><T size={50} color={RED}>RÉBARBATIF</T></Abs>}
        </AbsoluteFill>
      )}
      {/* frein 3 : la loterie du charisme */}
      {t > 101.4 && (() => {
        const faces = ['animatrice-d.png', 'orateur-d.png', 'manager-d.png'];
        const H = 260;
        return (
          <AbsoluteFill style={{opacity: pop(t, 101.4)}}>
            <Row y={900}><Chip c={RED} dark={false} q={spring(t, 101.7)}>La qualité des animateurs</Chip></Row>
            <Abs x={110} y={1000} w={860} h={420} style={{borderRadius: 40, background: 'linear-gradient(180deg, #C2263C, #7E1426)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', border: `8px solid ${YEL}`, transform: `scale(${spring(t, 102.0)})`}}>
              <Abs x={0} y={14} w={844} style={{textAlign: 'center'}}><T size={40} color={YEL}>{t > 108.4 ? 'LOTERIE DU CHARISME' : 'ORATEUR NÉ ?'}</T></Abs>
              {[0, 1, 2].map((k) => {
                const stop = 110.0 + k * 0.45;
                const spin = t < 108.4 ? 0 : t < stop ? (t - 108.4) * 2600 : (stop - 108.4) * 2600;
                const land = Math.round(spin / H) * H;
                const off = t < stop ? spin : land + (spin - land) * 0 + Math.sin(Math.max(0, t - stop) * 30) * 14 * Math.exp(-(t - stop) * 8);
                return (
                  <Abs key={k} x={42 + k * 262} y={80} w={240} h={H} style={{borderRadius: 18, background: '#fff', overflow: 'hidden', boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.4)'}}>
                    {Array.from({length: 40}, (_, j) => <Img key={j} src={CA(faces[(j + k) % 3])} style={{position: 'absolute', left: 20, top: j * H - (off % (H * 3 * 4)) + 20, width: 200, height: H - 20, objectFit: 'cover', objectPosition: 'top', filter: t > 108.4 && t < stop ? 'blur(4px)' : undefined}} />)}
                  </Abs>
                );
              })}
              <div style={{position: 'absolute', right: -70, top: 60, width: 26, height: 200, borderRadius: 13, background: '#ccc', transformOrigin: '50% 100%', transform: `rotate(${t > 108.4 && t < 109.2 ? 30 : 0}deg)`}}><div style={{position: 'absolute', left: -17, top: -30, width: 60, height: 60, borderRadius: 30, background: RED}} /></div>
            </Abs>
            {t > 105.1 && t < 108.4 && <Row y={1460}><Chip c={LIGHT} q={spring(t, 105.1)} size={30}>Pas tous des orateurs nés</Chip></Row>}
            {t > 110.6 && <Row y={1460}><Chip c={YEL} q={spring(t, 110.6)} size={30}>Tout dépend du charisme de l'animateur</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Axe 2 : capter l'attention ─────────── */
const SHARDS = (() => {
  const pts: [number, number][][] = [];
  const cx = 400, cy = 150;
  const n = 16;
  for (let k = 0; k < n; k++) {
    const a0 = (k / n) * Math.PI * 2, a1 = ((k + 1) / n) * Math.PI * 2;
    const r = 900;
    pts.push([[cx, cy], [cx + Math.cos(a0) * r, cy + Math.sin(a0) * r], [cx + Math.cos(a1) * r, cy + Math.sin(a1) * r]]);
  }
  return pts;
})();
const P2: React.FC = () => {
  const t = useT();
  const o = win(t, 114.4, 148.0, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* la vitre du monologue vole en éclats */}
      {t < 122.4 && (() => {
        const brk = 120.2;
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 122.0, 122.4)}}>
            <Title>Casser les <span style={{color: YEL}}>codes</span></Title>
            <Abs x={140} y={820} w={800} h={300}>
              {SHARDS.map((sh, k) => {
                const p = Math.max(0, t - brk);
                const mid = [(sh[1][0] + sh[2][0]) / 2 - 400, (sh[1][1] + sh[2][1]) / 2 - 150];
                const len = Math.hypot(mid[0], mid[1]);
                const dx = (mid[0] / len) * p * 700, dy = (mid[1] / len) * p * 500 + 900 * p * p;
                return (
                  <div key={k} style={{position: 'absolute', inset: 0, clipPath: `polygon(${sh.map(([x, y]) => `${x}px ${y}px`).join(',')})`, transform: `translate(${dx}px, ${dy}px) rotate(${p * (random(`r${k}`) - 0.5) * 300}deg)`, opacity: 1 - prog(t, brk + 0.6, brk + 1.2)}}>
                    <div style={{position: 'absolute', inset: 0, borderRadius: 30, background: 'linear-gradient(135deg, rgba(200,230,255,0.35), rgba(200,230,255,0.12))', border: '4px solid rgba(255,255,255,0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                      <F n="haut-parleur" size={90} /><T size={52} color="#E6F2FF">Monologue monotone</T>
                    </div>
                  </div>
                );
              })}
              {t > brk && t < brk + 0.15 && <div style={{position: 'absolute', inset: -200, background: '#fff', opacity: 0.6}} />}
            </Abs>
            {t > 117.1 && t < brk && <Row y={1200}><Chip c={LIGHT} q={spring(t, 117.15)} size={30}>Briser la routine dès les premières secondes</Chip></Row>}
            {t > brk + 0.3 && <Row y={1200}><Chip c={YEL} q={spring(t, brk + 0.3)}>Fini les monologues !</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* outils visuels : lecteur vidéo, cube 3D, viseur */}
      {t > 122.2 && t < 131.6 && (
        <AbsoluteFill style={{opacity: win(t, 122.2, 131.6, 0.35)}}>
          <Title>Des outils qui <span style={{color: YEL}}>accrochent</span></Title>
          {/* vidéo choc */}
          <Abs x={70} y={570} w={600} h={400} style={{borderRadius: 24, overflow: 'hidden', background: '#000', border: '5px solid #fff', transform: `scale(${spring(t, 126.4)})`}}>
            <Img src={CA('chute-entrepot.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.05 + (t - 126.4) * 0.03})`}} />
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 56, background: 'linear-gradient(0deg, rgba(0,0,0,0.8), transparent)'}} />
            <div style={{position: 'absolute', left: 20, right: 20, bottom: 18, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.35)'}}><div style={{width: `${Math.min(100, (t - 126.4) * 18)}%`, height: '100%', borderRadius: 4, background: RED}} /></div>
            <div style={{position: 'absolute', left: 18, top: 16, padding: '4px 14px', borderRadius: 10, background: RED, fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: '#fff'}}>▶ VIDÉO CHOC</div>
          </Abs>
          {/* animation 3D : cube qui tourne */}
          <Abs x={760} y={640} w={240} h={240} style={{perspective: 900, transform: `scale(${spring(t, 127.6)})`}}>
            <div style={{width: 200, height: 200, position: 'relative', transformStyle: 'preserve-3d', transform: `rotateX(${-20 + t * 30}deg) rotateY(${t * 60}deg)`}}>
              {[['casque', 'rotateY(0deg)'], ['extincteur', 'rotateY(90deg)'], ['gants', 'rotateY(180deg)'], ['danger', 'rotateY(270deg)'], ['lunettes', 'rotateX(90deg)'], ['epi-ble', 'rotateX(-90deg)']].map(([ic, rot], k) => (
                <div key={k} style={{position: 'absolute', width: 200, height: 200, background: ['#3D2F6E', '#4A3A80', '#3D2F6E', '#4A3A80', '#57468F', '#57468F'][k], border: `4px solid ${YEL}`, transform: `${rot} translateZ(100px)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={ic} size={120} /></div>
              ))}
            </div>
            <Abs x={-20} y={250} w={280} style={{textAlign: 'center'}}><T size={30} color={YEL}>Animation 3D</T></Abs>
          </Abs>
          {/* jeu : chasse aux risques avec viseur */}
          {t > 128.9 && (() => {
            const cx = 500 + Math.sin((t - 129) * 2.2) * 160 * (1 - prog(t, 130.3, 130.9));
            const cy = 230 + Math.cos((t - 129) * 1.7) * 90 * (1 - prog(t, 130.3, 130.9));
            const lock = t > 130.9;
            return (
              <Photo src={CA('chute-echelle.jpg')} x={70} y={1010} w={940} h={440} q={spring(t, 128.95)}>
                <div style={{position: 'absolute', left: cx - 80, top: cy - 80, width: 160, height: 160, borderRadius: 80, border: `6px solid ${lock ? RED : '#fff'}`, boxShadow: lock ? `0 0 30px ${RED}` : 'none'}}>
                  <div style={{position: 'absolute', left: 74, top: -30, width: 6, height: 220, background: lock ? RED : '#fff'}} /><div style={{position: 'absolute', top: 74, left: -30, height: 6, width: 220, background: lock ? RED : '#fff'}} />
                </div>
                <div style={{position: 'absolute', right: 18, top: 16, padding: '6px 16px', borderRadius: 12, background: lock ? RED : 'rgba(0,0,0,0.6)', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff'}}>{lock ? 'RISQUE TROUVÉ : 1 PT' : 'CHASSE AUX RISQUES'}</div>
              </Photo>
            );
          })()}
        </AbsoluteFill>
      )}
      {/* table de mixage des tons */}
      {t > 131.4 && t < 144.4 && (() => {
        const ch = [
          {l: 'Alarmiste', c: RED, ic: 'sirene', v: kfv(t, [134.3, 135.0, 137.7, 138.4], [0.1, 0.95, 0.95, 0.2])},
          {l: 'Pédagogique', c: CYAN, ic: 'ampoule', v: kfv(t, [137.9, 138.6, 140.9, 141.5], [0.1, 0.9, 0.9, 0.45])},
          {l: 'Humoristique', c: YEL, ic: 'pouce', v: kfv(t, [141.0, 141.7], [0.1, 0.9])},
        ];
        const month = t < 137.7 ? 1 : 2;
        return (
          <AbsoluteFill style={{opacity: win(t, 131.4, 144.4, 0.35)}}>
            <Title>Varier les <span style={{color: YEL}}>tons</span></Title>
            <Abs x={380} y={560} w={320} h={110} style={{borderRadius: 20, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, transform: `rotateX(${(prog(t, 137.6, 138.0) - (t > 138.0 ? 1 : 0)) * 90}deg)`}}><F n="calendrier" size={70} /><T size={44} color={INK}>Mois {month}</T></Abs>
            <Abs x={110} y={720} w={860} h={700} style={{borderRadius: 36, background: 'linear-gradient(180deg, #2B2347, #1F1838)', border: '4px solid #4A3F72', boxShadow: '0 30px 60px rgba(0,0,0,0.5)'}}>
              {ch.map((c, k) => (
                <div key={c.l} style={{position: 'absolute', left: 60 + k * 270, top: 40, width: 200, height: 620, opacity: pop(t, 132.0 + k * 0.2)}}>
                  <div style={{display: 'flex', justifyContent: 'center'}}><F n={c.ic} size={90} style={{transform: `scale(${0.8 + c.v * 0.4})`, opacity: 0.4 + c.v * 0.6}} /></div>
                  {/* vu-mètre */}
                  <div style={{position: 'absolute', left: 20, top: 120, width: 22, height: 360, display: 'flex', flexDirection: 'column-reverse', gap: 4}}>{Array.from({length: 12}, (_, j) => <div key={j} style={{flex: 1, borderRadius: 3, background: j / 12 < c.v * (0.85 + 0.15 * Math.sin(t * 18 + k)) ? (j > 9 ? RED : j > 6 ? YEL : GREEN) : 'rgba(255,255,255,0.1)'}} />)}</div>
                  <div style={{position: 'absolute', left: 92, top: 120, width: 16, height: 360, borderRadius: 8, background: '#0E0B1E'}} />
                  <div style={{position: 'absolute', left: 60, top: 120 + (1 - c.v) * 330, width: 80, height: 44, borderRadius: 10, background: c.c, boxShadow: `0 0 20px ${c.c}88`}} />
                  <T size={30} style={{position: 'absolute', top: 520, width: 200, textAlign: 'center'}}>{c.l}</T>
                </div>
              ))}
            </Abs>
            {t > 135.5 && t < 138.9 && <Row y={1450}><Chip c={RED} dark={false} q={spring(t, 135.5)} size={30}>Électrochoc sur un danger grave</Chip></Row>}
            {t > 142.2 && <Row y={1450}><Chip c={YEL} q={spring(t, 142.25)} size={30}>Une consigne stricte… en douceur</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* diable à ressort : l'effet de surprise */}
      {t > 144.2 && (() => {
        const lid = prog(t, 144.4, 144.7, easeOut);
        const jack = spring(t, 144.6, 5, 16);
        return (
          <AbsoluteFill style={{opacity: pop(t, 144.2)}}>
            <Title>L'effet de <span style={{color: YEL}}>surprise</span></Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <path d={`M540 1250 ${Array.from({length: 10}, (_, k) => `L${k % 2 ? 500 : 580} ${1250 - (k + 1) * 34 * jack}`).join(' ')}`} stroke="#ccc" strokeWidth={10} fill="none" />
            </svg>
            <Abs x={440} y={1250 - 360 * jack - 180} w={200} h={200} style={{borderRadius: 100, background: YEL, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 60px ${YEL}`}}><T size={160} color={INK}>!</T></Abs>
            <Abs x={340} y={1250} w={400} h={260} style={{background: 'linear-gradient(180deg, #E8457A, #A8264E)', borderRadius: 16, border: '6px solid #fff'}} />
            <Abs x={330} y={1236} w={420} h={30} style={{background: '#fff', borderRadius: 10, transformOrigin: '0% 50%', transform: `rotate(${-120 * lid}deg)`}} />
            {t > 146.2 && <Abs x={110} y={700}><Chip c={GREEN} q={spring(t, 146.2)} size={30}><F n="cerveau" size={44} />Cerveaux éveillés</Chip></Abs>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};
function kfv(t: number, ts: number[], vs: number[]) {
  if (t <= ts[0]) return vs[0];
  for (let k = 1; k < ts.length; k++) if (t <= ts[k]) return vs[k - 1] + (vs[k] - vs[k - 1]) * easeInOut((t - ts[k - 1]) / (ts[k] - ts[k - 1]));
  return vs[vs.length - 1];
}

/* ─────────── Axe 3 : dynamique participative ─────────── */
const P3: React.FC = () => {
  const t = useT();
  const o = win(t, 150.6, 186.9, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* réseau descendant vs réseau maillé */}
      {t < 174.0 && (() => {
        const oldDim = t > 164.0 ? 0.35 : 1;
        const N = 6;
        const nodes = Array.from({length: N}, (_, k) => { const a = (k / N) * Math.PI * 2 - Math.PI / 2; return [540 + Math.cos(a) * 250, 1260 + Math.sin(a) * 170]; });
        const mesh = prog(t, 165.4, 167.2, (x) => x);
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 173.6, 174.0)}}>
            <Title>Changer de <span style={{color: GREEN}}>philosophie</span></Title>
            {/* ancien monde */}
            {t > 156.0 && (
              <Abs x={70} y={570} w={940} h={420} style={{borderRadius: 30, background: 'rgba(255,255,255,0.05)', border: '3px solid rgba(255,255,255,0.2)', opacity: pop(t, 156.0) * oldDim, filter: t > 164.0 ? 'grayscale(1)' : undefined}}>
                <Abs x={24} y={20}><T size={30} color={DIM}>ANCIEN MONDE</T></Abs>
                <svg width={940} height={420} style={{position: 'absolute', inset: 0}}>
                  {Array.from({length: 5}, (_, k) => <line key={k} x1={470} y1={140} x2={130 + k * 170} y2={320} stroke={RED} strokeWidth={6} strokeDasharray="14 10" strokeDashoffset={-t * 60} opacity={pop(t, 157.7 + k * 0.1)} />)}
                </svg>
                <div style={{position: 'absolute', left: 420, top: 80, width: 100, height: 100, borderRadius: 50, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="megaphone" size={64} /></div>
                {Array.from({length: 5}, (_, k) => <div key={k} style={{position: 'absolute', left: 100 + k * 170, top: 300, width: 60, height: 60, borderRadius: 30, background: '#6E6A80'}} />)}
                {t > 162.8 && <div style={{position: 'absolute', right: 24, top: 20, transform: `scale(${spring(t, 162.85)})`}}><Chip c="#5D5480" dark={false} size={28}><F n="sablier" size={40} />Perte de temps</Chip></div>}
              </Abs>
            )}
            {/* nouveau : moment participatif */}
            {t > 163.6 && (
              <AbsoluteFill style={{opacity: pop(t, 163.6)}}>
                <Abs x={70} y={1010} w={940} h={480} style={{borderRadius: 30, background: 'rgba(75,224,138,0.08)', border: `3px solid ${GREEN}`}} />
                <Abs x={94} y={1030}><T size={30} color={GREEN}>MOMENT PARTICIPATIF</T></Abs>
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                  {nodes.flatMap((a, i) => nodes.slice(i + 1).map((b, j) => <line key={`${i}-${j}`} x1={a[0]} y1={a[1]} x2={a[0] + (b[0] - a[0]) * mesh} y2={a[1] + (b[1] - a[1]) * mesh} stroke={GREEN} strokeWidth={4} opacity={0.6} />))}
                </svg>
                {nodes.map(([x, y], k) => <div key={k} style={{position: 'absolute', left: x - 36, top: y - 36, width: 72, height: 72, borderRadius: 36, background: '#C99467', border: `5px solid ${GREEN}`, transform: `scale(${spring(t, 164.2 + k * 0.1)})`}} />)}
                {t > 169.2 && <div style={{position: 'absolute', left: 540 - 60, top: 1260 - 70, transform: `scale(${spring(t, 169.25)})`}}><F n="eprouvette" size={120} />{Array.from({length: 5}, (_, k) => { const p = ((t * 0.8 + k * 0.2) % 1); return <div key={k} style={{position: 'absolute', left: 50 + Math.sin(k * 2 + t * 3) * 14, top: -p * 80, width: 14, height: 14, borderRadius: 7, background: GREEN, opacity: 1 - p}} />; })}</div>}
                {t > 169.2 && t < 172.6 && <Abs x={600} y={1420}><Chip c={GREEN} q={spring(t, 169.3)} size={28}>Le support = un catalyseur</Chip></Abs>}
                {t > 172.6 && nodes.map(([x, y], k) => <div key={k} style={{position: 'absolute', left: x + (k < 3 ? 10 : -110), top: y - 100, transform: `scale(${spring(t, 172.7 + k * 0.15)})`}}><Bubble w={100} h={60} c={k % 2 ? YEL : '#fff'} tail={k < 3 ? 'l' : 'r'}><T size={28} color={INK}>…</T></Bubble></div>)}
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* récit : j'ai failli glisser — du flou au net */}
      {t > 173.8 && t < 183.6 && (() => {
        const blur = 22 * (1 - prog(t, 181.4, 182.4, easeInOut));
        return (
          <AbsoluteFill style={{opacity: win(t, 173.8, 183.6, 0.35)}}>
            <Title>Et la <span style={{color: GREEN}}>magie</span> opère</Title>
            <Photo src={CA('groupe.jpg')} x={60} y={570} w={960} h={560} q={spring(t, 174.0)}>
              {t > 175.8 && <div style={{position: 'absolute', left: 520, top: 30, transform: `scale(${spring(t, 175.9)})`, transformOrigin: '20% 100%'}}><Bubble w={400} h={130} c="#fff"><Hand size={38} color={INK}>« J'ai failli glisser ce matin… »</Hand></Bubble></div>}
            </Photo>
            {t > 178.4 && (
              <Abs x={300} y={1080} w={480} h={420} style={{background: '#fff', padding: 16, paddingBottom: 60, boxSizing: 'border-box', borderRadius: 8, boxShadow: '0 30px 60px rgba(0,0,0,0.5)', transform: `rotate(${-4 + (1 - spring(t, 178.5)) * 20}deg) scale(${spring(t, 178.5)})`}}>
                <Img src={staticFile('quartheure/peau-banane.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 70%', filter: `blur(${blur}px) saturate(${1 - blur / 30})`}} />
                <Hand size={34} color={INK} style={{position: 'absolute', left: 20, bottom: 10}}>{t > 181.4 ? 'hyper concret !' : 'un risque abstrait…'}</Hand>
              </Abs>
            )}
            {t > 178.4 && <Abs x={60} y={1150} style={{transform: `rotate(-8deg) scale(${spring(t, 178.5)})`}}><Chip c={YEL} size={28}>Presque-accident</Chip></Abs>}
          </AbsoluteFill>
        );
      })()}
      {/* jauges liées : débat → adoption */}
      {t > 183.4 && (
        <AbsoluteFill style={{opacity: pop(t, 183.4)}}>
          <Title>Plus ça <span style={{color: GREEN}}>débat</span>, plus ça <span style={{color: YEL}}>s'adopte</span></Title>
          {[['Débat · partage', GREEN, 183.5, 'causerie'], ['Règle comprise · adoptée', YEL, 186.0, 'check']].map(([l, c, at, ic], k) => (
            <Abs key={k} x={170 + k * 420} y={640} w={320} h={800}>
              <F n={ic as string} size={110} style={{margin: '0 auto'}} />
              <div style={{position: 'absolute', left: 90, top: 140, width: 140, height: 520, borderRadius: 30, background: 'rgba(255,255,255,0.08)', border: '4px solid rgba(255,255,255,0.3)', overflow: 'hidden'}}>
                <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: `${10 + 85 * prog(t, (at as number) - 0.2, (at as number) + 1.2, easeInOut)}%`, background: `linear-gradient(0deg, ${c}, ${c}88)`}} />
              </div>
              <T size={32} style={{position: 'absolute', top: 690, width: 320, textAlign: 'center'}}>{l}</T>
            </Abs>
          ))}
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><path d="M430 1000 C500 940 580 940 650 1000" stroke="#fff" strokeWidth={6} fill="none" strokeDasharray="12 10" strokeDashoffset={-t * 50} /><path d="M630 980 L652 1002 L622 1010" stroke="#fff" strokeWidth={6} fill="none" /></svg>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Axe 4 : accompagner les animateurs ─────────── */
const P4: React.FC = () => {
  const t = useT();
  const o = win(t, 189.5, 223.8, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* filet de sécurité sous l'animatrice */}
      {t < 197.3 && (() => {
        const net = prog(t, 195.1, 195.8, easeOut);
        const drop = prog(t, 195.6, 196.0, easeIn);
        const bounce = t > 196.0 ? Math.sin((t - 196.0) * 14) * 50 * Math.exp(-(t - 196.0) * 5) : 0;
        const sway = t < 195.6 ? Math.sin(t * 3) * 6 : 0;
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 196.9, 197.3)}}>
            <Title>Un <span style={{color: CYAN}}>filet de sécurité</span></Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <line x1={60} y1={1000} x2={1020} y2={1000} stroke="#D8D2EA" strokeWidth={6} />
              {net > 0 && (
                <g opacity={net}>
                  {Array.from({length: 13}, (_, k) => <path key={`v${k}`} d={`M${120 + k * 70} 1300 Q${120 + k * 70} ${1300 + 80 * net + (bounce > 0 ? bounce * 0.4 : 0)} ${120 + k * 70} 1300`} stroke={CYAN} strokeWidth={3} />)}
                  {Array.from({length: 13}, (_, k) => <line key={`a${k}`} x1={120 + k * 70} y1={1300} x2={120 + k * 70 + 35} y2={1300 + 60 * net * Math.sin(((k + 0.5) / 13) * Math.PI) + Math.max(0, bounce) * 0.3 * Math.sin(((k + 0.5) / 13) * Math.PI)} stroke={CYAN} strokeWidth={4} />)}
                  {Array.from({length: 13}, (_, k) => <line key={`b${k}`} x1={120 + k * 70 + 70} y1={1300} x2={120 + k * 70 + 35} y2={1300 + 60 * net * Math.sin(((k + 0.5) / 13) * Math.PI) + Math.max(0, bounce) * 0.3 * Math.sin(((k + 0.5) / 13) * Math.PI)} stroke={CYAN} strokeWidth={4} />)}
                  <path d={`M120 1300 Q540 ${1300 + 140 * net + Math.max(0, bounce)} 1030 1300`} stroke={CYAN} strokeWidth={8} fill="none" />
                  <line x1={120} y1={1300} x2={120} y2={1480} stroke="#D8D2EA" strokeWidth={10} /><line x1={1030} y1={1300} x2={1030} y2={1480} stroke="#D8D2EA" strokeWidth={10} />
                </g>
              )}
            </svg>
            <Img src={CA('animatrice-d.png')} style={{position: 'absolute', left: 390, top: 640 + drop * 400 + bounce, height: 360, transform: `rotate(${sway}deg)`, transformOrigin: '50% 100%'}} />
            <Abs x={90} y={590} style={{opacity: pop(t, 192.8)}}><Chip c={LIGHT} size={28}>Sessions super interactives ?</Chip></Abs>
            {t > 196.0 && <Abs x={620} y={1420}><Chip c={CYAN} q={spring(t, 196.1)} size={30}>Rattrapée !</Chip></Abs>}
          </AbsoluteFill>
        );
      })()}
      {/* guide d'animation clé en main */}
      {t > 197.1 && t < 207.1 && (
        <AbsoluteFill style={{opacity: win(t, 197.1, 207.1, 0.35)}}>
          <Title>Un <span style={{color: CYAN}}>guide d'animation</span> clé en main</Title>
          <Abs x={130} y={600} style={{transform: `rotate(${prog(t, 199.4, 200.4) * 90}deg) scale(${spring(t, 199.3)})`}}><F n="cle" size={170} /></Abs>
          {[0, 1, 2].map((k) => <Abs key={k} x={400 + k * 18} y={600 + k * 18} w={420} h={560} style={{borderRadius: 18, background: '#fff', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', transform: `scale(${spring(t, 201.8 + (2 - k) * 0.15)}) rotate(${(k - 1) * 2}deg)`, padding: 30, boxSizing: 'border-box'}}>{k === 2 && <><div style={{display: 'inline-block', padding: '4px 16px', borderRadius: 8, background: RED, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>PDF</div><T size={38} color={INK} style={{marginTop: 18}}>Guide d'animation</T>{[0.9, 0.75, 0.85, 0.6].map((w, j) => <div key={j} style={{marginTop: 18, height: 14, borderRadius: 7, background: '#E7E3EF', width: `${w * 100}%`}} />)}</>}</Abs>)}
          {t > 203.1 && <Abs x={120} y={1060} w={360} h={230} style={{borderRadius: 16, background: '#2B2347', border: `4px solid ${CYAN}`, padding: 16, boxSizing: 'border-box', transform: `rotate(-4deg) scale(${spring(t, 203.15)})`}}><T size={26} color={CYAN}>DIAPO 1/3</T><div style={{marginTop: 14, height: 70, borderRadius: 10, background: 'rgba(61,214,245,0.2)'}} /><div style={{marginTop: 12, height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.3)', width: '70%'}} /></Abs>}
          {t > 204.6 && <Row y={1360}><Chip c={CYAN} q={spring(t, 204.65)}>3 étapes très simples</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* la fiche recette */}
      {t > 206.9 && t < 217.0 && (
        <AbsoluteFill style={{opacity: win(t, 206.9, 217.0, 0.35)}}>
          <Abs x={130} y={480} w={820} h={1000} style={{background: '#FFF8EC', borderRadius: 24, boxShadow: '0 30px 60px rgba(0,0,0,0.45)', padding: '40px 50px', boxSizing: 'border-box', transform: `rotate(1.5deg) translateY(${(1 - spring(t, 207.0, 6, 12)) * 1200}px)`}}>
            <div style={{textAlign: 'center'}}><Hand size={60} color={INK}>La recette</Hand><T size={34} color={INK}>DU QUART D'HEURE PARTICIPATIF</T></div>
            <div style={{height: 3, background: INK, opacity: 0.2, margin: '22px 0'}} />
            {[['1', 'Présenter le sujet', 'Clairement', 206.94, 'tableau'], ['2', 'Questions ouvertes', 'Préparées pour lancer le débat', 210.46, 'question'], ['3', 'Rappeler les règles', 'De prévention, officiellement', 214.34, 'clipboard']].map(([n, l, d, at, ic], k) => {
              const cur = t > (at as number) && (k === 2 || t < [210.46, 214.34][k]);
              return (
                <div key={n as string} style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 26, padding: '14px 18px', borderRadius: 20, background: cur ? (k === 1 ? '#FFE9A8' : '#E3F7FD') : 'transparent', opacity: pop(t, at as number), transform: `translateX(${(1 - pop(t, at as number)) * 120}px) scale(${cur && k === 1 ? 1.04 : 1})`}}>
                  <div style={{width: 70, height: 70, borderRadius: 35, background: k === 1 ? SPARK : CYAN, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><T size={40} color="#fff">{n}</T></div>
                  <div style={{flex: 1}}><T size={40} color={INK}>{l}</T><Hand size={34} color="#6B5E8C">{d}</Hand></div>
                  <F n={ic as string} size={90} />
                </div>
              );
            })}
            {t > 209.8 && t < 214.3 && <div style={{position: 'absolute', right: 30, top: 470, transform: `rotate(10deg) scale(${spring(t, 209.85)})`}}><Chip c={SPARK} dark={false} size={26}>Le point crucial</Chip></div>}
          </Abs>
        </AbsoluteFill>
      )}
      {/* même un chef d'équipe timide : efficacité constante partout */}
      {t > 216.8 && (() => {
        const conf = prog(t, 218.9, 220.4, easeInOut);
        return (
          <AbsoluteFill style={{opacity: pop(t, 216.8)}}>
            <Title>Même un chef d'équipe <span style={{color: CYAN}}>timide</span></Title>
            <Img src={CA('orateur-d.png')} style={{position: 'absolute', left: 90, top: 590, height: 460, transform: `scale(${spring(t, 217.0)})`, transformOrigin: '50% 100%'}} />
            <Abs x={520} y={640} w={460} h={300} style={{borderRadius: 30, background: 'rgba(255,255,255,0.06)', border: '3px solid rgba(255,255,255,0.2)'}}>
              <svg width={460} height={300}>
                <path d={arcP(230, 240, 170, -90, 90)} stroke="rgba(255,255,255,0.15)" strokeWidth={30} fill="none" strokeLinecap="round" />
                <path d={arcP(230, 240, 170, -90, -90 + 180 * (0.15 + 0.8 * conf))} stroke={CYAN} strokeWidth={30} fill="none" strokeLinecap="round" />
                <line x1={230} y1={240} x2={230 + 140 * Math.sin(((-90 + 180 * (0.15 + 0.8 * conf)) * Math.PI) / 180)} y2={240 - 140 * Math.cos(((-90 + 180 * (0.15 + 0.8 * conf)) * Math.PI) / 180)} stroke="#fff" strokeWidth={8} strokeLinecap="round" />
              </svg>
              <T size={30} style={{position: 'absolute', top: 252, width: 460, textAlign: 'center'}}>ASSURANCE</T>
            </Abs>
            {t > 219.6 && <Abs x={560} y={980}><Chip c={CYAN} q={spring(t, 219.7)} size={28}>Il suit la recette</Chip></Abs>}
            {t > 220.5 && (
              <Abs x={90} y={1120} w={900} h={340} style={{borderRadius: 30, background: 'rgba(255,255,255,0.06)', border: '3px solid rgba(255,255,255,0.2)', opacity: pop(t, 220.5)}}>
                <Abs x={24} y={16}><T size={28} color={DIM}>EFFICACITÉ, SITE PAR SITE</T></Abs>
                {['Atelier', 'Chantier', 'Bureau', 'Entrepôt'].map((l, k) => (
                  <div key={l} style={{position: 'absolute', left: 50 + k * 210, bottom: 30, width: 150, textAlign: 'center'}}>
                    <div style={{height: 170 * prog(t, 220.8 + k * 0.15, 221.6 + k * 0.15), width: 90, margin: '0 auto', borderRadius: 12, background: `linear-gradient(0deg, ${CYAN}, ${GREEN})`}} />
                    <T size={26} style={{marginTop: 10}}>{l}</T>
                  </div>
                ))}
                {t > 222.1 && <div style={{position: 'absolute', left: 30, right: 30, top: 340 - 30 - 170 - 46, borderTop: `5px dashed ${YEL}`, opacity: pop(t, 222.1)}} />}
                {t > 222.1 && <div style={{position: 'absolute', right: 26, top: 50, transform: `scale(${spring(t, 222.15)})`}}><Chip c={YEL} size={26}>Constant partout</Chip></div>}
              </Abs>
            )}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};
function arcP(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p = (a: number) => [cx + r * Math.sin((a * Math.PI) / 180), cy - r * Math.cos((a * Math.PI) / 180)];
  const [x0, y0] = p(a0), [x1, y1] = p(a1);
  return `M${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`;
}

/* ─────────── Axe 5 : panneau de réglages du déploiement ─────────── */
const Toggle: React.FC<{on: number}> = ({on}) => (
  <div style={{width: 110, height: 60, borderRadius: 30, background: on > 0.5 ? GREEN : '#4A3F72', position: 'relative', flexShrink: 0}}><div style={{position: 'absolute', top: 6, left: 6 + on * 50, width: 48, height: 48, borderRadius: 24, background: '#fff'}} /></div>
);
const P5: React.FC = () => {
  const t = useT();
  const o = win(t, 226.4, 260.6, 0.4);
  if (o <= 0) return null;
  const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 251.5 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 251.1, 251.5)}}>
          <Title>Les <span style={{color: VIO}}>paramètres</span> stratégiques</Title>
          <Abs x={70} y={560} w={940} h={940} style={{borderRadius: 40, background: '#F4F1FA', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', transform: `translateY(${(1 - spring(t, 228.6, 6, 12)) * 1300}px)`, overflow: 'hidden'}}>
            <div style={{height: 90, background: '#E6E0F2', display: 'flex', alignItems: 'center', gap: 16, padding: '0 30px'}}><F n="engrenage" size={56} /><T size={36} color={INK}>Réglages · Quart d'heure</T></div>
            {/* fréquence */}
            <div style={{margin: '24px 30px 0', padding: 24, borderRadius: 24, background: '#fff', opacity: pop(t, 232.7)}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 16}}><F n="calendrier" size={60} /><T size={36} color={INK} style={{flex: 1}}>Fréquence</T><T size={30} color={VIO}>{t > 234.7 ? '≥ 1 fois / mois' : ''}</T><Toggle on={prog(t, 234.7, 235.0)} /></div>
              <div style={{display: 'flex', gap: 8, marginTop: 18}}>{MONTHS.map((m, k) => <div key={k} style={{flex: 1, textAlign: 'center'}}><div style={{width: 46, height: 46, margin: '0 auto', borderRadius: 23, background: t > 234.8 + k * 0.12 ? VIO : '#EEE9F7', transform: `scale(${t > 234.8 + k * 0.12 ? spring(t, 234.8 + k * 0.12) : 1})`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{t > 234.8 + k * 0.12 && <div style={{width: 16, height: 16, borderRadius: 8, background: '#fff'}} />}</div><T size={22} color="#8A80A8" style={{marginTop: 6}}>{m}</T></div>)}</div>
              {t > 235.8 && <Hand size={32} color="#6B5E8C" style={{marginTop: 8, opacity: pop(t, 235.8)}}>un automatisme, sans saturer les équipes</Hand>}
            </div>
            {/* animateurs */}
            {t > 238.9 && (
              <div style={{margin: '20px 30px 0', padding: 24, borderRadius: 24, background: '#fff', opacity: pop(t, 238.9), display: 'flex', alignItems: 'center', gap: 20}}>
                <div style={{width: 130, height: 130, borderRadius: 65, overflow: 'hidden', border: `5px solid ${VIO}`, flexShrink: 0}}><Img src={CA('manager.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 15%'}} /></div>
                <div style={{flex: 1}}><T size={36} color={INK}>Animateurs</T><T size={30} color={VIO} style={{marginTop: 6, opacity: pop(t, 240.6)}}>Managers de proximité</T>{t > 243.9 && <Hand size={30} color="#6B5E8C" style={{opacity: pop(t, 243.9)}}>+ soutien des préventeurs</Hand>}</div>
                <Toggle on={prog(t, 240.6, 240.9)} />
              </div>
            )}
            {/* sujets */}
            {t > 245.6 && (
              <div style={{margin: '20px 30px 0', padding: 24, borderRadius: 24, background: '#fff', opacity: pop(t, 245.6)}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 16}}><F n="graphique" size={60} /><T size={36} color={INK} style={{flex: 1}}>Sujets : l'accidentologie du site</T></div>
                <div style={{display: 'flex', gap: 16, marginTop: 16}}>
                  {[['Chutes', CA('chute-escalier.jpg'), 249.2], ['Dos', '', 249.7], ['Incendies', staticFile('epiepc/extincteur.jpg'), 250.5]].map(([l, src, at]) => (
                    <div key={l as string} style={{flex: 1, height: 170, borderRadius: 18, overflow: 'hidden', position: 'relative', transform: `scale(${spring(t, at as number)})`}}>
                      {src ? <Img src={src as string} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : <div style={{width: '100%', height: '100%', background: '#EEE9F7', display: 'flex', justifyContent: 'center', paddingTop: 10, boxSizing: 'border-box'}}><F n="courbe-dos" size={110} /></div>}
                      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '6px 0', textAlign: 'center', background: 'rgba(27,21,48,0.8)'}}><T size={28}>{l}</T></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Abs>
        </AbsoluteFill>
      )}
      {/* règle d'or : un seul sujet sous le projecteur */}
      {t > 251.3 && (() => {
        const keep = prog(t, 255.3, 256.0, easeInOut);
        const juggle = t > 256.4;
        return (
          <AbsoluteFill style={{opacity: pop(t, 251.3)}}>
            <Title>La <span style={{color: YEL}}>règle d'or</span></Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><path d={`M${540 - 80} 520 L${540 - 330 + 200 * keep} 1300 L${540 + 330 - 200 * keep} 1300 L${540 + 80} 520 Z`} fill={`${YEL}22`} opacity={pop(t, 252.3)} /></svg>
            {!juggle && [['Chutes', 'echelle', -1], ['Dos', 'courbe-dos', 0], ['Incendies', 'feu', 1]].map(([l, ic, k]) => {
              const kk = k as number;
              const away = kk === 0 ? 0 : keep;
              return (
                <Abs key={l as string} x={540 - 130 + kk * 300 + kk * away * 500} y={900 - (kk === 0 ? keep * 60 : 0)} w={260} h={330} style={{borderRadius: 26, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `rotate(${kk * away * 40}deg) scale(${kk === 0 ? 1 + keep * 0.3 : 1})`, opacity: 1 - away * 0.9, boxShadow: kk === 0 && keep > 0 ? `0 0 60px ${YEL}` : '0 20px 40px rgba(0,0,0,0.4)'}}>
                  {kk === 0 && keep > 0 && <div style={{position: 'absolute', top: -70, transform: `scale(${spring(t, 255.6)})`}}><F n="couronne" size={110} /></div>}
                  <F n={ic as string} size={140} /><T size={38} color={INK} style={{marginTop: 10}}>{l}</T>
                </Abs>
              );
            })}
            {t > 253.6 && !juggle && <Row y={1360}><Chip c={RED} dark={false} q={spring(t, 253.65)} size={30}>Non négociable</Chip></Row>}
            {t > 255.3 && !juggle && <Row y={1460}><Chip c={YEL} q={spring(t, 255.35)}>1 seul sujet par réunion</Chip></Row>}
            {juggle && (
              <AbsoluteFill style={{opacity: pop(t, 256.4)}}>
                <Abs x={390} y={980} style={{transform: `scale(${spring(t, 256.5)})`}}><F n="cerveau" size={300} /></Abs>
                {['echelle', 'courbe-dos', 'feu'].map((ic, k) => {
                  const ph = (t - 257.0) * 1.6 + k / 3;
                  const fr = ph - Math.floor(ph);
                  const x = 540 + Math.sin(fr * Math.PI * 2) * 300;
                  const y = 900 - Math.sin(fr * Math.PI) * 300;
                  const bounced = t > 258.6;
                  const bx = bounced ? 540 + (k - 1) * 260 * prog(t, 258.6, 259.4) * 2 : x;
                  const by = bounced ? 900 + 600 * Math.pow(prog(t, 258.6, 259.6, (v) => v), 2) - 200 * prog(t, 258.6, 258.9) : y;
                  return t > 257.0 && <Abs key={ic} x={bx - 60} y={by - 60} style={{transform: `rotate(${t * 200 + k * 90}deg)`, opacity: bounced ? 1 - prog(t, 259.4, 259.9) : 1}}><F n={ic} size={120} /></Abs>;
                })}
                {t > 258.6 && <Abs x={640} y={1060} style={{transform: `rotate(10deg) scale(${spring(t, 258.7)})`}}><Chip c={RED} dark={false} size={30}>Rien n'est retenu</Chip></Abs>}
                {t > 259.9 && <Row y={1380}><div style={{display: 'flex', alignItems: 'center', gap: 22, padding: '18px 30px', borderRadius: 26, background: '#fff', transform: `scale(${spring(t, 259.95)})`}}><T size={44} color={INK}>3 sujets</T><T size={50} color={RED}>≠</T><T size={44} color={INK}>mémorisation</T></div></Row>}
                {t > 257.0 && t < 258.6 && <Row y={1380}><Chip c={LIGHT} q={spring(t, 257.0)} size={30}>Trois choses en même temps…</Chip></Row>}
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Conclusion : balance, puis l'étincelle ─────────── */
const P6: React.FC = () => {
  const t = useT();
  if (t < 263.1) return null;
  const o = pop(t, 263.2, 0.5);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* balance passif / participatif */}
      {t < 270.0 && (() => {
        const tilt = -10 * prog(t, 265.2, 266.4, easeInOut) + 26 * prog(t, 267.3, 268.6, easeInOut);
        const rad = (tilt * Math.PI) / 180;
        const L = 330;
        const lx = 540 - L * Math.cos(rad), ly = 880 - L * Math.sin(rad);
        const rx = 540 + L * Math.cos(rad), ry = 880 + L * Math.sin(rad);
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 269.6, 270.0)}}>
            <Title>La réflexion <span style={{color: SPARK}}>finale</span></Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <path d="M540 880 L540 1420 M420 1420 L660 1420" stroke="#D8D2EA" strokeWidth={14} strokeLinecap="round" />
              <line x1={lx} y1={ly} x2={rx} y2={ry} stroke="#D8D2EA" strokeWidth={14} strokeLinecap="round" />
              <circle cx={540} cy={880} r={18} fill={SPARK} />
              <line x1={lx} y1={ly} x2={lx} y2={ly + 160} stroke="#D8D2EA" strokeWidth={4} /><line x1={rx} y1={ry} x2={rx} y2={ry + 160} stroke="#D8D2EA" strokeWidth={4} />
            </svg>
            <Abs x={lx - 160} y={ly + 160} w={320} h={300} style={{borderRadius: '0 0 160px 160px', background: 'rgba(255,90,90,0.15)', borderTop: `8px solid ${RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20, boxSizing: 'border-box', opacity: pop(t, 264.1)}}>
              <F n="sablier" size={100} /><T size={32} style={{textAlign: 'center', marginTop: 8}}>Échange passif</T>{t > 266.3 && <T size={28} color={RED} style={{marginTop: 6, opacity: pop(t, 266.3)}}>Perte de temps</T>}
            </Abs>
            <Abs x={rx - 160} y={ry + 160} w={320} h={300} style={{borderRadius: '0 0 160px 160px', background: 'rgba(75,224,138,0.15)', borderTop: `8px solid ${GREEN}`, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20, boxSizing: 'border-box', opacity: pop(t, 267.3)}}>
              <F n="coeur" size={100} style={{transform: `scale(${1 + 0.08 * Math.sin(t * 8)})`}} /><T size={32} style={{textAlign: 'center', marginTop: 8}}>Participatif</T>{t > 268.6 && <T size={28} color={GREEN} style={{marginTop: 6, opacity: pop(t, 268.6)}}>Sauve des vies</T>}
            </Abs>
          </AbsoluteFill>
        );
      })()}
      {/* excellence opérationnelle + santé physique */}
      {t > 269.8 && t < 279.0 && (
        <AbsoluteFill style={{opacity: win(t, 269.8, 279.0, 0.4)}}>
          <Title>Bien plus que du <span style={{color: SPARK}}>confort</span></Title>
          <Photo src={CA('groupe.jpg')} x={90} y={580} w={900} h={620} q={spring(t, 270.0)} />
          {t > 273.1 && <Row y={1250}><Chip c={YEL} q={spring(t, 273.15)}><F n="trophee" size={44} />Excellence opérationnelle</Chip></Row>}
          {t > 276.9 && <Row y={1370}><Chip c={GREEN} q={spring(t, 276.95)}><F n="coeur" size={44} />Santé physique des équipes</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* l'affiche n'est plus la fin : l'étincelle de la discussion */}
      {t > 278.8 && (() => {
        const ign = prog(t, 281.4, 282.0, easeOut);
        const N = 7;
        return (
          <AbsoluteFill style={{opacity: pop(t, 278.8)}}>
            <Title>L'<span style={{color: SPARK}}>étincelle</span> de la discussion</Title>
            <Abs x={340} y={620} w={400} h={540} style={{borderRadius: 18, background: '#fff', boxShadow: '0 30px 60px rgba(0,0,0,0.45)', padding: 26, boxSizing: 'border-box', transform: `scale(${(1 - ign * 0.35) * spring(t, 278.9)}) rotate(-3deg)`, opacity: 1 - ign * 0.5}}>
              <div style={{display: 'inline-block', padding: '4px 14px', borderRadius: 8, background: CYAN, fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>LE SUPPORT</div>
              <div style={{marginTop: 18, height: 220, borderRadius: 12, overflow: 'hidden'}}><Img src={CA('chute-escalier.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
              <T size={60} color={INK} style={{marginTop: 30, textAlign: 'center', textDecoration: t > 280.2 ? 'line-through' : 'none', textDecorationColor: RED, textDecorationThickness: 8}}>FIN</T>
            </Abs>
            {t > 281.0 && <Abs x={540 - 90 + (1 - ign) * 160} y={600 + ign * 300 - (1 - ign) * 40}><Spark size={180} t={t} /></Abs>}
            {ign > 0 && Array.from({length: N}, (_, k) => {
              const a = (k / N) * Math.PI * 2 - Math.PI / 2;
              const d = 380 * spring(t, 281.6 + k * 0.08, 6, 10);
              return <Abs key={k} x={540 + Math.cos(a) * d - 70} y={990 + Math.sin(a) * d * 0.9 - 40}><Bubble w={140} h={80} c={[SPARK, YEL, '#fff', CYAN, GREEN, PINK, VIO][k]} tail={Math.cos(a) > 0 ? 'l' : 'r'}><T size={34} color={INK}>…</T></Bubble></Abs>;
            })}
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
      {t > 2.5 && t < 70.4 && <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', opacity: pop(t, 2.5) * (1 - prog(t, 70.0, 70.4))}}><div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '10px 26px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${SPARK}`}}><F n="causerie" size={44} /><T size={34}>Quart d'heure <span style={{color: SPARK}}>participatif</span></T></div></div>}
      {p && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 236, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: pop(t, p.at + WIPE - 0.3) * (1 - prog(t, p.end - 0.3, p.end))}}>
          <Bubble w={78} h={58} c={p.c}><T size={32} color={INK}>{p.n < 6 ? p.n : '★'}</T></Bubble>
          <div style={{padding: '8px 22px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${p.c}`}}><T size={34}>{p.l}</T></div>
        </div>
      )}
    </AbsoluteFill>
  );
};

const Bg: React.FC = () => {
  const t = useT();
  const p = PT.find((x) => t >= x.at && t < x.end);
  const c = p ? p.c : SPARK;
  return (
    <AbsoluteFill style={{background: BG}}>
      {/* braises qui montent : l'étincelle en fil rouge */}
      {Array.from({length: 26}, (_, k) => {
        const sp = 0.03 + random(`es${k}`) * 0.05;
        const y = 1920 - (((t * sp + random(`ey${k}`)) % 1) * 2100);
        return <div key={k} style={{position: 'absolute', left: random(`ex${k}`) * 1080 + Math.sin(t + k) * 20, top: y, width: 6 + (k % 3) * 3, height: 6 + (k % 3) * 3, borderRadius: 6, background: k % 2 ? SPARK : YEL, opacity: 0.25, filter: 'blur(1px)'}} />;
      })}
      <AbsoluteFill style={{background: `radial-gradient(circle at 85% 18%, ${c}30, transparent 45%), radial-gradient(circle at 10% 88%, ${c}22, transparent 45%)`}} />
    </AbsoluteFill>
  );
};

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.4}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  {at: 2.3, s: 'sfx/swish', v: 0.3}, {at: 3.9, s: 'sfx/swish', v: 0.3}, {at: 5.3, s: 'sfx/swish', v: 0.3}, {at: 5.95, s: 'sfx/pop', v: 0.3}, {at: 11.3, s: 'sfx/pop', v: 0.3}, {at: 13.06, s: 'sfx/ding', v: 0.35},
  {at: 16.6, s: 'tension', v: 0.25, dur: 2}, {at: 17.0, s: 'deep-hit', v: 0.35}, {at: 24.0, s: 'sfx/thud', v: 0.25}, {at: 25.3, s: 'cadenas', v: 0.4}, {at: 26.6, s: 'sfx/thud', v: 0.4}, {at: 27.2, s: 'sfx/pop', v: 0.3},
  {at: 31.9, s: 'bass-hit', v: 0.4}, {at: 34.5, s: 'sfx/ding', v: 0.35}, {at: 38.2, s: 'sfx/thud', v: 0.3},
  {at: 40.8, s: 'sfx/whoosh', v: 0.3}, {at: 45.6, s: 'deep-hit', v: 0.25}, {at: 47.15, s: 'sfx/pop', v: 0.25}, {at: 48.5, s: 'sfx/pop', v: 0.25},
  ...[49.7, 50.05, 50.4].map((at) => ({at, s: 'sfx/pop', v: 0.3})), ...Array.from({length: 9}, (_, k) => ({at: 50.3 + Math.floor(k / 3) * 0.35 + (k % 3) * 0.25, s: 'stylo', v: 0.18})), {at: 51.05, s: 'sfx/ding', v: 0.3},
  ...[58.1, 61.26, 63.46, 66.34, 68.7].map((at) => ({at, s: 'page', v: 0.45})),
  ...PT.flatMap((p) => [{at: p.at, s: 'sfx/pop', v: 0.45}, {at: p.at + 0.05, s: 'soft-whoosh', v: 0.45, dur: 1.6}, {at: p.at + 0.4, s: 'bass-hit', v: 0.35}, {at: p.at + WIPE - 0.45, s: 'sfx/pop', v: 0.4}]),
  {at: 77.0, s: 'sfx/pop', v: 0.3}, ...[80.3, 90.5, 102.2].map((at) => ({at, s: 'sfx/thud', v: 0.45})), ...[82.2, 82.7, 83.2].map((at) => ({at, s: 'page', v: 0.3})), {at: 83.85, s: 'tampon', v: 0.4}, {at: 87.35, s: 'sfx/whoosh', v: 0.4},
  {at: 92.0, s: 'sfx/pop', v: 0.3}, {at: 97.15, s: 'sfx/pop', v: 0.28}, {at: 99.5, s: 'tampon', v: 0.5},
  {at: 102.0, s: 'sfx/whoosh', v: 0.3}, {at: 108.4, s: 'sfx/click', v: 0.5}, ...Array.from({length: 14}, (_, k) => ({at: 108.5 + k * 0.1, s: 'tick', v: 0.2})), ...[110.0, 110.45, 110.9].map((at) => ({at, s: 'sfx/thud', v: 0.35})), {at: 110.95, s: 'sfx/bell', v: 0.3},
  {at: 117.15, s: 'sfx/pop', v: 0.25}, {at: 119.8, s: 'tension', v: 0.2, dur: 0.6}, {at: 120.2, s: 'deep-hit', v: 0.5}, {at: 120.25, s: 'sfx/swish', v: 0.4}, {at: 120.5, s: 'sfx/pop', v: 0.3},
  {at: 126.4, s: 'sfx/click', v: 0.4}, {at: 127.6, s: 'sfx/whoosh', v: 0.3}, {at: 128.95, s: 'sfx/pop', v: 0.3}, {at: 130.9, s: 'sfx/ding', v: 0.4},
  {at: 132.0, s: 'sfx/click', v: 0.3}, {at: 134.3, s: 'alarme', v: 0.15, dur: 1}, {at: 137.6, s: 'page', v: 0.4}, {at: 137.9, s: 'sfx/rise', v: 0.25}, {at: 141.0, s: 'sfx/pop', v: 0.3}, {at: 142.25, s: 'sfx/ding', v: 0.3},
  {at: 144.4, s: 'sfx/click', v: 0.4}, {at: 144.6, s: 'sfx/rise', v: 0.3}, {at: 144.75, s: 'bass-hit', v: 0.45}, {at: 146.2, s: 'validation', v: 0.3},
  {at: 156.0, s: 'sfx/whoosh', v: 0.3}, {at: 157.7, s: 'sfx/thud', v: 0.25}, {at: 162.85, s: 'tick', v: 0.3}, {at: 164.2, s: 'sfx/rise', v: 0.25}, {at: 169.25, s: 'sfx/pop', v: 0.3}, ...[172.7, 172.85, 173.0, 173.15, 173.3, 173.45].map((at) => ({at, s: 'sfx/pop', v: 0.22})),
  {at: 174.0, s: 'sfx/whoosh', v: 0.3}, {at: 175.9, s: 'notification', v: 0.35}, {at: 178.5, s: 'sfx/swish', v: 0.35}, {at: 181.4, s: 'sfx/rise', v: 0.25}, {at: 182.4, s: 'sfx/ding', v: 0.35}, {at: 183.5, s: 'sfx/rise', v: 0.2}, {at: 187.0, s: 'validation', v: 0.3},
  {at: 192.8, s: 'sfx/pop', v: 0.25}, {at: 195.1, s: 'sfx/whoosh', v: 0.35}, {at: 195.6, s: 'sfx/swish', v: 0.3}, {at: 196.0, s: 'sfx/thud', v: 0.4}, {at: 196.1, s: 'validation', v: 0.3},
  {at: 199.3, s: 'sfx/pop', v: 0.3}, {at: 199.6, s: 'cadenas', v: 0.4}, ...[201.8, 201.95, 202.1].map((at) => ({at, s: 'page', v: 0.35})), {at: 203.15, s: 'sfx/click', v: 0.3}, {at: 204.65, s: 'sfx/ding', v: 0.3},
  {at: 207.0, s: 'page', v: 0.5}, ...[206.94, 210.46, 214.34].map((at) => ({at: at + 0.05, s: 'sfx/ding', v: 0.3})), {at: 209.85, s: 'tampon', v: 0.35},
  {at: 217.0, s: 'sfx/pop', v: 0.3}, {at: 218.9, s: 'sfx/rise', v: 0.25}, {at: 219.7, s: 'sfx/pop', v: 0.25}, ...[220.8, 220.95, 221.1, 221.25].map((at) => ({at, s: 'tick', v: 0.3})), {at: 222.15, s: 'validation', v: 0.3},
  {at: 228.6, s: 'sfx/whoosh', v: 0.35}, {at: 232.7, s: 'sfx/pop', v: 0.25}, {at: 234.7, s: 'sfx/click', v: 0.45}, ...Array.from({length: 12}, (_, k) => ({at: 234.8 + k * 0.12, s: 'tick', v: 0.25})),
  {at: 238.9, s: 'sfx/pop', v: 0.25}, {at: 240.6, s: 'sfx/click', v: 0.45}, {at: 243.9, s: 'sfx/pop', v: 0.25}, {at: 245.6, s: 'sfx/pop', v: 0.25}, ...[249.2, 249.7, 250.5].map((at) => ({at, s: 'sfx/pop', v: 0.3})),
  {at: 251.5, s: 'sfx/whoosh', v: 0.3}, {at: 252.3, s: 'sfx/rise', v: 0.25}, {at: 253.65, s: 'tampon', v: 0.4}, {at: 255.3, s: 'sfx/swish', v: 0.35}, {at: 255.6, s: 'sfx/bell', v: 0.35},
  {at: 256.5, s: 'sfx/pop', v: 0.3}, ...Array.from({length: 5}, (_, k) => ({at: 257.0 + k * 0.32, s: 'sfx/click', v: 0.2})), {at: 258.6, s: 'sfx/thud', v: 0.4}, {at: 258.7, s: 'deep-hit', v: 0.3}, {at: 259.95, s: 'sfx/ding', v: 0.3},
  {at: 264.1, s: 'sfx/pop', v: 0.25}, {at: 265.2, s: 'sfx/thud', v: 0.3}, {at: 267.3, s: 'sfx/pop', v: 0.25}, {at: 267.5, s: 'sfx/swish', v: 0.3}, {at: 268.6, s: 'validation', v: 0.35},
  {at: 270.0, s: 'sfx/whoosh', v: 0.3}, {at: 273.15, s: 'sfx/ding', v: 0.3}, {at: 276.95, s: 'sfx/ding', v: 0.3},
  {at: 278.9, s: 'page', v: 0.4}, {at: 280.2, s: 'stylo', v: 0.35}, {at: 281.0, s: 'sfx/rise', v: 0.3}, {at: 281.4, s: 'bass-hit', v: 0.45}, ...Array.from({length: 7}, (_, k) => ({at: 281.6 + k * 0.08, s: 'sfx/pop', v: 0.22})),
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Causerie: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <Bg />
    <Gate from={0} to={56.1}><Intro /></Gate>
    <Gate from={55.8} to={70.7}><Programme /></Gate>
    <Gate from={72.9} to={112.0}><P1 /></Gate>
    <Gate from={114.3} to={148.2}><P2 /></Gate>
    <Gate from={150.5} to={187.1}><P3 /></Gate>
    <Gate from={189.4} to={224.0}><P4 /></Gate>
    <Gate from={226.3} to={260.8}><P5 /></Gate>
    <Gate from={263.0} to={OUTRO_AT}><P6 /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><BubbleWipe p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.3} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-causerie-participative-origine.m4a')} trimAfter={s(283.5)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

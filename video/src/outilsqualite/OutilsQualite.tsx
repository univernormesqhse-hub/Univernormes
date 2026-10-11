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
 * « Outils et méthodes qualité » (8 min 27) — voix d'origine, sous-titres recalés mot à mot, photos réelles. Fil
 * rouge inédit : une servante d'atelier dont chaque partie ouvre un tiroir, et des transitions où l'écran se fend en
 * diagonale. Autres techniques nouvelles : guide en livre 3D, échelle de la vis à la planète, baguette magique brisée,
 * frise 1900 → 1977, bouquet de méthodes, électrocardiogramme du diagnostic, diagramme de Pareto avec courbe cumulée,
 * tri des causes dans les bacs des 5M, poupées gigognes des 5 Pourquoi, sept projecteurs du QQOQCCP, grue qui empile
 * la tour 8D, établi qui se range S après S, jeu de formes du poka-yoké, curseurs G × O × D de l'AMDEC, frise des
 * petits pas du Kaizen, boîte à idées, aspirateur à mudas, tuyau où la valeur coule enfin, certificat ISO, citation à
 * l'encre, planètes du cercle de la connaissance, serveur contre têtes pensantes, avalanche de notifications filtrée,
 * bulldozer du BPR, bouton d'autodestruction et renaissance, couronne de lauriers qui tombe.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 507.4;
export const OUTILSQUALITE_FRAMES = s(OUTRO_AT + 3.8);
const BG = '#0D1A26';
const INK = '#122030';
const LIGHT = '#F4F9FF';
const DIM = 'rgba(244,249,255,0.65)';
const GREEN = '#2ECC71';
const MINT = '#3DE0B0';
const YEL = '#FFD23F';
const ORA = '#FF8A3D';
const RED = '#FF5252';
const BLUE = '#4D9DFF';
const VIO = '#A68BFF';
const STEEL = '#C83B3B';
const PAPER = '#FBF6EA';
const PH = (p: string) => staticFile(p);

type Pt = {n: number; l: string; at: number; end: number; c: string; ic: string};
const PT: Pt[] = [
  {n: 1, l: "L'arsenal de la qualité", at: 39.8, end: 99.0, c: GREEN, ic: 'boite-outils'},
  {n: 2, l: 'Analyser et trouver les causes', at: 99.1, end: 175.6, c: BLUE, ic: 'loupe'},
  {n: 3, l: 'Optimiser les processus', at: 175.7, end: 280.1, c: ORA, ic: 'engrenage'},
  {n: 4, l: "Le Lean et l'amélioration continue", at: 280.2, end: 346.8, c: MINT, ic: 'pousse'},
  {n: 5, l: 'Les systèmes de management intégrés', at: 346.9, end: 445.0, c: VIO, ic: 'puzzle'},
  {n: 6, l: 'Culture et transformation radicale', at: 445.1, end: 507.2, c: RED, ic: 'eclair'},
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
const Chip: React.FC<{children: React.ReactNode; c?: string; q?: number; size?: number; dark?: boolean; style?: React.CSSProperties}> = ({children, c = GREEN, q = 1, size = 34, dark = true, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 26px', borderRadius: 50, background: c, color: dark ? INK : '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size, transform: `scale(${q})`, boxShadow: `0 12px 30px ${c}55`, whiteSpace: 'nowrap', ...style}}>{children}</div>
);
const Row: React.FC<{y: number; children: React.ReactNode; gap?: number}> = ({y, children, gap = 14}) => (
  <Abs x={0} y={y} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap, flexWrap: 'wrap', padding: '0 40px', boxSizing: 'border-box'}}>{children}</Abs>
);
const Title: React.FC<{children: React.ReactNode; y?: number}> = ({children, y = 450}) => <Abs x={60} y={y} w={960} style={{textAlign: 'center'}}><T size={56}>{children}</T></Abs>;
const Photo: React.FC<{src: string; x: number; y: number; w: number; h: number; q?: number; r?: number; pos?: string; children?: React.ReactNode; filter?: string; border?: string}> = ({src, x, y, w, h, q = 1, r = 0, pos = 'center', children, filter, border = 'rgba(255,255,255,0.92)'}) => {
  const t = useT();
  return (
    <Abs x={x} y={y} w={w} h={h} style={{borderRadius: 30, overflow: 'hidden', border: `6px solid ${border}`, boxShadow: '0 30px 60px rgba(0,0,0,0.5)', transform: `scale(${q}) rotate(${r}deg)`}}>
      <Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${1.05 + (t % 30) * 0.004})`, filter}} />
      {children}
    </Abs>
  );
};
/** Servante d'atelier : `open` = index du tiroir ouvert (-1 aucun), `lit` = tiroirs déjà vus. */
const Cabinet: React.FC<{w: number; open: number; lit: number; openP?: number; labels?: boolean}> = ({w, open, lit, openP = 1, labels = true}) => {
  const dh = w * 0.15;
  return (
    <div style={{position: 'relative', width: w, height: dh * 6 + w * 0.12}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: w, height: w * 0.06, borderRadius: `${w * 0.02}px ${w * 0.02}px 0 0`, background: '#8A1F1F'}} />
      {PT.map((p, k) => {
        const ox = k === open ? openP * w * 0.22 : 0;
        return (
          <div key={p.n} style={{position: 'absolute', left: 0, top: w * 0.06 + k * dh, width: w, height: dh, background: STEEL, borderBottom: `${Math.max(2, w / 160)}px solid #7A1A1A`}}>
            <div style={{position: 'absolute', left: ox, top: dh * 0.08, width: w * 0.96, height: dh * 0.84, marginLeft: w * 0.02, borderRadius: w * 0.012, background: k < lit ? `linear-gradient(180deg, #E04848, ${STEEL})` : '#A52E2E', boxShadow: ox > 0 ? `${ox * 0.2}px 8px 16px rgba(0,0,0,0.4)` : 'none', display: 'flex', alignItems: 'center', gap: w * 0.03, paddingLeft: w * 0.04, boxSizing: 'border-box'}}>
              <div style={{width: w * 0.22, height: dh * 0.22, borderRadius: dh * 0.11, background: '#E9EEF2'}} />
              {labels && <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: w * 0.045, color: k < lit ? '#fff' : 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap'}}>{p.n}. {p.l}</div>}
            </div>
          </div>
        );
      })}
      {[0.1, 0.82].map((x) => <div key={x} style={{position: 'absolute', left: x * w, bottom: 0, width: w * 0.08, height: w * 0.08, borderRadius: '50%', background: '#222', border: `${w / 120}px solid #666`}} />)}
    </div>
  );
};

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: BG, opacity: 1 - out}}>
      <Img src={PH('induction/technicien-hse.jpg')} style={{position: 'absolute', left: -300, top: 0, width: 1680, height: 1100, objectFit: 'cover', filter: 'saturate(0.8) brightness(0.75)'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${BG}AA 0%, ${BG}22 28%, ${BG} 56%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={330} y={330} style={{transform: 'rotate(-4deg)'}}><Cabinet w={420} open={2} lit={6} labels={false} /></Abs>
      {['cle', 'loupe', 'equerre', 'tournevis'].map((ic, k) => <Abs key={ic} x={[200, 800, 170, 820][k]} y={[420, 460, 760, 800][k] + Math.sin(t * 3 + k) * 10}><F n={ic} size={110} /></Abs>)}
      <Abs x={60} y={1080} w={960} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: GREEN, color: INK, fontFamily: sansFont, fontWeight: 800, fontSize: 32, letterSpacing: 3}}>LE GUIDE EXPERT</div>
        <T size={128} style={{marginTop: 16, textTransform: 'uppercase', letterSpacing: -3}}>Outils et</T>
        <T size={128} color={GREEN} style={{textTransform: 'uppercase', letterSpacing: -3}}>méthodes qualité</T>
        <Hand size={50} color={DIM} style={{marginTop: 14}}>de Pareto au BPR, l'arsenal complet</Hand>
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : l'écran se fend en diagonale ─────────── */
const SplitWipe: React.FC<{p: Pt}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const close = prog(t, a, a + 0.5, easeInOut);
  const open = prog(t, b - 0.55, b, easeInOut);
  const d = (1 - close + open) * 1400;
  return (
    <AbsoluteFill style={{zIndex: 55, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', inset: 0, clipPath: 'polygon(0 0, 100% 0, 100% 35%, 0 65%)', transform: `translate(${-d * 0.5}px, ${-d}px)`, background: `linear-gradient(135deg, ${p.c}, ${INK})`}}>
        <Abs x={70} y={330}><T size={36} color={INK} style={{letterSpacing: 6, background: p.c, padding: '6px 18px', borderRadius: 10, display: 'inline-block'}}>TIROIR {p.n}/6</T></Abs>
        <Abs x={70} y={420} w={940}><T size={84} style={{textShadow: '0 10px 30px rgba(0,0,0,0.4)'}}>{p.l}</T></Abs>
      </div>
      <div style={{position: 'absolute', inset: 0, clipPath: 'polygon(0 65%, 100% 35%, 100% 100%, 0 100%)', transform: `translate(${d * 0.5}px, ${d}px)`, background: `linear-gradient(315deg, ${p.c}, ${INK})`}}>
        <Abs x={330} y={1100}><Cabinet w={420} open={p.n - 1} lit={p.n} openP={prog(t, a + 0.6, a + 1.1, easeOut)} labels={false} /></Abs>
        <Abs x={760} y={1060} style={{transform: `scale(${spring(t, a + 0.9)})`}}><F n={p.ic} size={160} /></Abs>
      </div>
      <div style={{position: 'absolute', left: -100, top: 960 - 162, width: 1300, height: 8, background: '#fff', transform: 'rotate(-16.7deg)', transformOrigin: '50% 50%', opacity: close * (1 - open) * 0.9, boxShadow: '0 0 30px #fff'}} />
    </AbsoluteFill>
  );
};

/* ─────────── Introduction ─────────── */
const Intro: React.FC = () => {
  const t = useT();
  const o = 1 - prog(t, 39.5, 39.8);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* le guide en livre 3D */}
      {t < 12.9 && (() => {
        const openB = prog(t, 3.6, 5.0, easeInOut);
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 12.5, 12.9)}}>
            <Title>Un vrai <span style={{color: GREEN}}>monument</span></Title>
            <Abs x={300} y={620} w={480} h={640} style={{perspective: 1800, transform: `scale(${spring(t, 2.3)})`}}>
              <div style={{position: 'absolute', inset: 0, background: PAPER, borderRadius: 10, padding: 40, boxSizing: 'border-box'}}>
                <T size={28} color={INK}>Outils de management de la qualité</T>
                {[0.9, 0.7, 0.8, 0.6, 0.85].map((w, k) => <div key={k} style={{marginTop: 22, height: 12, borderRadius: 6, background: '#E2DAC6', width: `${w * 100}%`}} />)}
                {t > 6.2 && <Hand size={34} color="#5A6B7A" style={{marginTop: 30, opacity: pop(t, 6.3)}}>+ notes de J.-P. Huberac</Hand>}
              </div>
              <div style={{position: 'absolute', inset: 0, transformOrigin: '0% 50%', transform: `rotateY(${-openB * 160}deg)`, background: `linear-gradient(135deg, ${GREEN}, #1B8A4C)`, borderRadius: 10, boxShadow: '0 20px 40px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backfaceVisibility: 'hidden'}}>
                <div style={{background: '#fff', borderRadius: 16, padding: '8px 18px'}}><Img src={staticFile(LOGO)} style={{height: 60, display: 'block'}} /></div>
                <T size={44} color="#fff" style={{marginTop: 30, textAlign: 'center'}}>GUIDE EXPERT</T>
              </div>
            </Abs>
            {t > 11.7 && <Row y={1320}><Chip c={GREEN} q={spring(t, 11.78)} size={30}>Des opérations fiables à 100 %</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* de la vis à la multinationale */}
      {t > 12.7 && t < 23.9 && (() => {
        const z = prog(t, 14.9, 17.4, easeInOut);
        return (
          <AbsoluteFill style={{opacity: win(t, 12.7, 23.9, 0.4)}}>
            <Title>De la <span style={{color: GREEN}}>vis</span> à la <span style={{color: GREEN}}>multinationale</span></Title>
            <Abs x={90} y={620} w={900} h={640} style={{borderRadius: 30, overflow: 'hidden', background: '#122438'}}>
              <div style={{position: 'absolute', left: 450, top: 320, transform: `translate(-50%, -50%) scale(${3 - z * 2.6})`}}><F n="boulon" size={300} /></div>
              <div style={{position: 'absolute', left: 450, top: 320, transform: `translate(-50%, -50%) scale(${0.2 + z * 0.9})`, opacity: z}}><F n="globe" size={460} /></div>
              <div style={{position: 'absolute', left: 30, bottom: 30, right: 30, height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.2)'}}><div style={{width: `${z * 100}%`, height: '100%', background: GREEN, borderRadius: 5}} /></div>
            </Abs>
            {t > 18.5 && <Row y={1320} gap={12}>{[['Solide', 18.5], ['Hyper précis', 19.94], ['La base absolue', 21.26]].map(([l, at]) => <Chip key={l as string} c={LIGHT} q={spring(t, at as number)} size={28}>{l}</Chip>)}</Row>}
          </AbsoluteFill>
        );
      })()}
      {/* programme : les tiroirs */}
      {t > 23.7 && (() => {
        const ats = [25.9, 27.62, 29.62, 31.34, 33.74, 35.78];
        const cur = ats.filter((a) => t >= a).length - 1;
        return (
          <AbsoluteFill style={{opacity: pop(t, 23.7)}}>
            <Title>Au <span style={{color: GREEN}}>programme</span></Title>
            <Abs x={150} y={600} style={{transform: `scale(${spring(t, 23.9)})`}}><Cabinet w={780} open={cur} lit={cur + 1} openP={cur >= 0 ? prog(t, ats[cur], ats[cur] + 0.4, easeOut) : 0} /></Abs>
            {t > 39.1 && <Row y={1450}><Chip c={GREEN} q={spring(t, 39.14)}>C'est parti !</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Tiroir 1 : l'arsenal ─────────── */
const P1: React.FC = () => {
  const t = useT();
  const o = win(t, 42.2, 99.0, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* la baguette magique brisée */}
      {t < 49.4 && (() => {
        const brk = prog(t, 46.6, 47.2, easeOut);
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 49.0, 49.4)}}>
            <Title>Pas d'<span style={{color: GREEN}}>outil magique</span></Title>
            {[0, 1].map((k) => <Abs key={k} x={440 + (k ? 100 : 0) + (k ? 1 : -1) * brk * 120} y={760 + brk * 200} style={{transform: `rotate(${-40 + (k ? 1 : -1) * brk * 50}deg)`}}><div style={{width: 200, height: 26, borderRadius: 13, background: k ? '#fff' : '#222'}} />{!k && brk < 0.5 && <div style={{position: 'absolute', left: -40, top: -40, fontSize: 80, color: YEL}}>✦</div>}</Abs>)}
            {brk > 0 && Array.from({length: 10}, (_, k) => <div key={k} style={{position: 'absolute', left: 540 + Math.cos(k) * brk * 300, top: 800 + Math.sin(k * 1.7) * brk * 250, width: 18, height: 18, borderRadius: 9, background: YEL, opacity: 1 - brk}} />)}
          </AbsoluteFill>
        );
      })()}
      {/* frise : 1900 → 1977 */}
      {t > 49.2 && t < 77.8 && (
        <AbsoluteFill style={{opacity: win(t, 49.2, 77.8, 0.4)}}>
          <Title>Un peu d'<span style={{color: GREEN}}>histoire</span></Title>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><line x1={80} y1={700} x2={80 + 920 * prog(t, 50.5, 62.0, (x) => x)} y2={700} stroke="rgba(255,255,255,0.4)" strokeWidth={6} /></svg>
          {[['Années 1900', 52.94, 120], ['1977', 61.9, 640]].map(([l, at, x]) => t > (at as number) && <Abs key={l as string} x={x as number} y={640}><div style={{width: 30, height: 30, borderRadius: 15, background: GREEN, margin: '15px 0 0 0'}} /><T size={40} style={{marginTop: 10, transform: `scale(${spring(t, at as number)})`, transformOrigin: '0 0'}}>{l}</T></Abs>)}
          {t > 52.9 && (
            <Abs x={70} y={800} w={440} h={520} style={{borderRadius: 26, background: '#14304A', border: '3px solid #2A4E70', padding: 24, boxSizing: 'border-box', opacity: pop(t, 53.0), backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.06) 2px, transparent 2px)', backgroundSize: '30px 30px'}}>
              <T size={30}>Ingénierie ultra complexe</T>
              <svg width={390} height={300} style={{marginTop: 20}}>{Array.from({length: 18}, (_, k) => <circle key={k} cx={30 + random(`cx${k}`) * 330} cy={20 + random(`cy${k}`) * 260} r={10 + random(`cr${k}`) * 30} fill="none" stroke="#7FB2FF" strokeWidth={3} />)}<polyline points={Array.from({length: 20}, (_, k) => `${k * 20},${150 + Math.sin(k) * 80}`).join(' ')} fill="none" stroke={YEL} strokeWidth={3} /></svg>
              {t > 59.4 && <div style={{position: 'absolute', left: 20, bottom: 20}}><Chip c="#2A4E70" dark={false} q={spring(t, 59.4)} size={24}>Réservé aux experts</Chip></div>}
            </Abs>
          )}
          {t > 61.9 && (
            <Abs x={560} y={800} w={450} h={520} style={{borderRadius: 26, background: '#14382A', border: `3px solid ${GREEN}`, padding: 24, boxSizing: 'border-box', transform: `scale(${spring(t, 62.0)})`}}>
              <T size={30}>JUSE · les 7M</T><Hand size={28} color={DIM}>Union japonaise des scientifiques et ingénieurs</Hand>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 20}}>{Array.from({length: 12}, (_, k) => <div key={k} style={{transform: `scale(${spring(t, 71.0 + k * 0.08)})`}}><F n={k % 3 ? 'salarie' : 'salariee'} size={70} /></div>)}</div>
              {t > 72.6 && <div style={{position: 'absolute', left: 20, bottom: 20}}><Chip c={GREEN} q={spring(t, 72.66)} size={24}>Par tout le monde, sur le terrain</Chip></div>}
            </Abs>
          )}
        </AbsoluteFill>
      )}
      {/* une seule approche ne marche pas → bouquet de méthodes */}
      {t > 77.6 && (() => {
        const flowers: [string, string][] = [['loupe', BLUE], ['graphique', ORA], ['engrenage', YEL], ['clipboard', MINT], ['cible', RED], ['puzzle', VIO], ['balance', GREEN]];
        return (
          <AbsoluteFill style={{opacity: pop(t, 77.6)}}>
            <Title>{t < 90.1 ? <>Pas d'<span style={{color: RED}}>approche unique</span></> : <>Un <span style={{color: GREEN}}>bouquet de méthodes</span></>}</Title>
            {t < 90.2 && (
              <AbsoluteFill style={{opacity: 1 - prog(t, 89.8, 90.2)}}>
                <Abs x={160} y={720} style={{transform: `scale(${spring(t, 80.5)})`}}><F n="cle" size={220} /></Abs>
                <Row y={760} gap={20}><div style={{width: 300}} />{[0, 1, 2].map((k) => <div key={k} style={{transform: `scale(${spring(t, 81.0 + k * 0.2)}) rotate(${Math.sin(t * 8 + k) * (t > 81.8 ? 6 : 0)}deg)`}}><F n="cadenas" size={130} /></div>)}</Row>
                {t > 86.6 && <Row y={1060} gap={12}><Chip c={LIGHT} q={spring(t, 87.9)} size={28}>Analyser la culture</Chip><Chip c={LIGHT} q={spring(t, 88.5)} size={28}>et l'organisation</Chip></Row>}
              </AbsoluteFill>
            )}
            {t > 90.0 && (
              <AbsoluteFill style={{opacity: pop(t, 90.0)}}>
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>{flowers.map((_, k) => { const a = -Math.PI / 2 + (k - 3) * 0.32; return <path key={k} d={`M540 1300 Q${540 + Math.cos(a) * 120} ${1100} ${540 + Math.cos(a) * 330} ${1300 + Math.sin(a) * 520}`} stroke="#3C8A4C" strokeWidth={10} fill="none" opacity={pop(t, 91.5 + k * 0.1)} />; })}<path d="M440 1240 L640 1240 L600 1420 L480 1420 Z" fill={PAPER} /></svg>
                {flowers.map(([ic, c], k) => { const a = -Math.PI / 2 + (k - 3) * 0.32; return <Abs key={ic} x={540 + Math.cos(a) * 330 - 70} y={1300 + Math.sin(a) * 520 - 70} style={{transform: `scale(${spring(t, 91.6 + k * 0.12)})`}}><div style={{width: 140, height: 140, borderRadius: 70, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 14px ${c}55`}}><F n={ic} size={80} /></div></Abs>; })}
                {t > 93.9 && <Row y={1460}><Chip c={GREEN} q={spring(t, 93.98)} size={30}>Du sur-mesure, choisi avec soin</Chip></Row>}
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Tiroir 2 : analyser ─────────── */
const P2: React.FC = () => {
  const t = useT();
  const o = win(t, 101.5, 175.6, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* diagnostic médical : électrocardiogramme */}
      {t < 115.7 && (() => {
        const pts: string[] = [];
        for (let x = 0; x <= 900; x += 6) { const ph = ((x / 900) * 4 + t * 1.2) % 1; const y = ph > 0.45 && ph < 0.5 ? -160 : ph > 0.5 && ph < 0.55 ? 90 : Math.sin(x / 30) * 6; pts.push(`${x},${200 + y}`); }
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 115.3, 115.7)}}>
            <Title>Un <span style={{color: BLUE}}>diagnostic médical</span></Title>
            <Abs x={90} y={620} w={900} h={400} style={{borderRadius: 26, background: '#04140C', border: '4px solid #1D3A2A', overflow: 'hidden', backgroundImage: 'linear-gradient(rgba(61,224,176,0.12) 2px, transparent 2px), linear-gradient(90deg, rgba(61,224,176,0.12) 2px, transparent 2px)', backgroundSize: '40px 40px'}}>
              <svg width={900} height={400}><polyline points={pts.join(' ')} fill="none" stroke={MINT} strokeWidth={5} /></svg>
              <div style={{position: 'absolute', right: 20, top: 16}}><T size={30} color={MINT}>♥ inefficacités</T></div>
            </Abs>
            {t > 105.0 && <Abs x={110} y={1080} style={{transform: `scale(${spring(t, 105.1)}) rotate(-30deg)`}}><div style={{width: 260, height: 18, borderRadius: 9, background: '#C9D3E6'}} /><div style={{width: 120, height: 18, marginLeft: 260, marginTop: -18, background: '#E9EEF2', clipPath: 'polygon(0 0, 100% 50%, 0 100%)'}} /></Abs>}
            {t > 108.9 && <Abs x={560} y={1080}><Chip c={BLUE} dark={false} q={spring(t, 109.1)} size={30}>D'où vient la douleur ?</Chip></Abs>}
          </AbsoluteFill>
        );
      })()}
      {/* Pareto */}
      {t > 115.5 && t < 143.3 && (() => {
        const vals = [42, 23, 12, 7, 5, 4, 3, 2, 1, 1];
        const g = prog(t, 116.0, 118.0, easeOut);
        let cum = 0;
        const total = vals.reduce((a, b) => a + b, 0);
        const pts = vals.map((v, k) => { cum += v; return `${80 + k * 82 + 35},${560 - (cum / total) * 480}`; });
        return (
          <AbsoluteFill style={{opacity: win(t, 115.5, 143.3, 0.35)}}>
            <Title>La règle des <span style={{color: BLUE}}>80/20</span></Title>
            <Abs x={90} y={600} w={900} h={620} style={{borderRadius: 26, background: 'rgba(255,255,255,0.05)', border: '3px solid rgba(255,255,255,0.15)'}}>
              <svg width={900} height={620}>
                {vals.map((v, k) => <rect key={k} x={80 + k * 82} y={560 - (v / 42) * 460 * g} width={70} height={(v / 42) * 460 * g} rx={8} fill={k < 2 ? BLUE : 'rgba(77,157,255,0.35)'} />)}
                <polyline points={pts.slice(0, Math.max(1, Math.round(prog(t, 118.0, 120.0) * 10))).join(' ')} fill="none" stroke={YEL} strokeWidth={6} />
                {t > 122.4 && <line x1={60} y1={560 - 0.8 * 480} x2={880} y2={560 - 0.8 * 480} stroke={RED} strokeWidth={4} strokeDasharray="14 10" opacity={pop(t, 122.42)} />}
              </svg>
              {t > 122.4 && <div style={{position: 'absolute', right: 20, top: 70, opacity: pop(t, 122.42)}}><Chip c={RED} dark={false} size={24}>80 % des problèmes</Chip></div>}
              {t > 124.2 && <div style={{position: 'absolute', left: 60, top: 500, opacity: pop(t, 124.26)}}><Chip c={BLUE} dark={false} size={24}>← 20 % des causes</Chip></div>}
            </Abs>
            {t > 117.3 && <Row y={1270}><Chip c={LIGHT} q={spring(t, 117.3)} size={28}>Principe de Pareto · popularisé par Joseph Juran</Chip></Row>}
            {t > 128.5 && <Row y={1380}><Chip c={BLUE} dark={false} q={spring(t, 128.58)} size={30}>Frapper là où l'impact est maximal</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* Ishikawa : trier dans les bacs des 5M */}
      {t > 143.1 && t < 155.3 && (
        <AbsoluteFill style={{opacity: win(t, 143.1, 155.3, 0.35)}}>
          <Title>Classer les causes : les <span style={{color: BLUE}}>5M</span></Title>
          <Row y={1060} gap={14}>{['Méthode', "Main-d'œuvre", 'Matériel', 'Matière', 'Milieu'].map((l, k) => <div key={l} style={{width: 180, height: 220, borderRadius: '0 0 24px 24px', background: [BLUE, ORA, YEL, MINT, VIO][k], display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 16, boxSizing: 'border-box', transform: `translateY(${(1 - spring(t, 143.4 + k * 0.12)) * 400}px)`}}><T size={22} color={INK}>{l}</T></div>)}</Row>
          {Array.from({length: 10}, (_, k) => { const at = 149.0 + k * 0.45; const p = prog(t, at, at + 0.5, easeIn); const bin = k % 5; const x = 540 + (random(`sx${k}`) - 0.5) * 600; const tx = 135 + bin * 194 + 30; return t > at - 0.4 && <Abs key={k} x={x + (tx - x) * p} y={640 + p * 420 + Math.sin(p * Math.PI) * -60}><div style={{width: 80, height: 60, borderRadius: 8, background: PAPER, transform: `rotate(${(1 - p) * (k * 20 - 90)}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={22} color={INK}>cause</T></div></Abs>; })}
          {t > 145.7 && t < 148.6 && <Abs x={340} y={700} style={{opacity: pop(t, 145.74)}}><Hand size={40} color={DIM}>« arête de poisson »</Hand></Abs>}
        </AbsoluteFill>
      )}
      {/* 5 Pourquoi : les poupées gigognes */}
      {t > 155.1 && t < 164.4 && (
        <AbsoluteFill style={{opacity: win(t, 155.1, 164.4, 0.35)}}>
          <Title>Les <span style={{color: BLUE}}>5 Pourquoi</span></Title>
          {[0, 1, 2, 3, 4].map((k) => {
            const opened = prog(t, 157.0 + k * 0.9, 157.5 + k * 0.9, easeOut);
            const sz = 360 - k * 60;
            return (
              <Abs key={k} x={540 - sz / 2 + k * 160 - 320 + (k === 4 ? 0 : 0)} y={1300 - sz * 1.4} style={{opacity: t > 157.0 + (k - 1) * 0.9 || k === 0 ? 1 : 0}}>
                <svg width={sz} height={sz * 1.4} viewBox="0 0 100 140">
                  <path d="M50 4 C22 4 20 40 26 52 C10 70 10 130 50 136 C90 130 90 70 74 52 C80 40 78 4 50 4 Z" fill={k === 4 ? RED : ['#E85D75', '#F28A3D', '#F2C23D', '#4DBF8A', '#4D9DFF'][k]} />
                  <circle cx={50} cy={32} r={17} fill="#FBE3CF" /><circle cx={44} cy={30} r={2.5} fill={INK} /><circle cx={56} cy={30} r={2.5} fill={INK} />
                  <text x={50} y={100} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={k === 4 ? 14 : 30} fill="#fff">{k === 4 ? 'RACINE' : '?'}</text>
                </svg>
                {k < 4 && opened > 0 && <div style={{position: 'absolute', left: 0, top: -opened * 40, width: sz, height: 4}} />}
              </Abs>
            );
          })}
          {t > 158.6 && <Row y={1360}><Chip c={BLUE} dark={false} q={spring(t, 158.66)} size={28}>Percer le symptôme jusqu'à la cause profonde</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* QQOQCCP : sept projecteurs */}
      {t > 164.2 && (
        <AbsoluteFill style={{opacity: pop(t, 164.2)}}>
          <Title>Le <span style={{color: BLUE}}>QQOQCCP</span></Title>
          {['Quoi', 'Qui', 'Où', 'Quand', 'Comment', 'Combien', 'Pourquoi'].map((l, k) => {
            const at = [165.53, 166.4, 167.86, 168.2, 168.46, 168.92, 169.5][k];
            const a = (k / 7) * Math.PI * 2 - Math.PI / 2;
            const x = 540 + Math.cos(a) * 380, y = 980 + Math.sin(a) * 380;
            return (
              <React.Fragment key={l}>
                {t > at && <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><polygon points={`${x},${y} ${540 + Math.cos(a + 1.6) * 60},${980 + Math.sin(a + 1.6) * 60} ${540 + Math.cos(a - 1.6) * 60},${980 + Math.sin(a - 1.6) * 60}`} fill={YEL} opacity={0.18 * pop(t, at)} /></svg>}
                <Abs x={x - 80} y={y - 34} w={160} style={{textAlign: 'center', transform: `scale(${spring(t, at)})`}}><div style={{padding: '10px 0', borderRadius: 30, background: t > at ? YEL : 'rgba(255,255,255,0.1)'}}><T size={28} color={INK}>{l}</T></div></Abs>
              </React.Fragment>
            );
          })}
          <Abs x={440} y={880} style={{transform: `scale(${spring(t, 164.5)})`}}><F n="colis" size={200} /></Abs>
          {t > 170.5 && <Row y={1440}><Chip c={YEL} q={spring(t, 170.58)} size={30}>Une vue à 360° : rien dans l'ombre</Chip></Row>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Tiroir 3 : optimiser ─────────── */
const D8 = ['Former le groupe', 'Définir le problème', 'Actions curatives', 'Chercher les causes', 'Choisir les correctifs', 'Déployer', 'Prévenir', 'Refermer le dossier'];
const D8AT = [195.46, 196.5, 199.3, 202.66, 203.66, 204.98, 206.54, 208.0];
const P3: React.FC = () => {
  const t = useT();
  const o = win(t, 178.1, 280.1, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* la grue qui empile la tour 8D */}
      {t < 214.6 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 214.2, 214.6)}}>
          <Title>{t < 185.9 ? <>On administre le <span style={{color: ORA}}>traitement</span></> : <>La méthode <span style={{color: ORA}}>8D</span></>}</Title>
          {t < 186.0 && <Abs x={380} y={700} style={{transform: `scale(${spring(t, 181.4)})`, opacity: 1 - prog(t, 185.6, 186.0)}}><F n="pilule" size={320} /></Abs>}
          {t > 185.9 && (
            <AbsoluteFill style={{opacity: pop(t, 185.9)}}>
              <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                <line x1={900} y1={1480} x2={900} y2={560} stroke={YEL} strokeWidth={16} /><line x1={340} y1={580} x2={1000} y2={580} stroke={YEL} strokeWidth={14} />
                {(() => { const cur = D8AT.filter((a) => t >= a - 0.6).length - 1; if (cur < 0 || t > D8AT[cur] + 0.2) return null; const p = prog(t, D8AT[cur] - 0.6, D8AT[cur]); return <line x1={540} y1={580} x2={540} y2={580 + (1440 - cur * 92 - 580) * p - 40} stroke="#888" strokeWidth={4} />; })()}
              </svg>
              {D8.map((l, k) => {
                const at = D8AT[k];
                if (t < at - 0.6) return null;
                const p = prog(t, at - 0.6, at, easeIn);
                const y = 580 + (1400 - k * 92 - 580) * p;
                return <Abs key={l} x={260} y={y} w={560} h={84} style={{borderRadius: 12, background: [BLUE, MINT, RED, YEL, ORA, GREEN, VIO, '#5BC0DE'][k], display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', boxSizing: 'border-box', boxShadow: '0 6px 12px rgba(0,0,0,0.3)'}}><T size={38} color={INK}>D{k + 1}</T><T size={28} color={INK}>{l}</T></Abs>;
              })}
              {t > 199.3 && t < 202.6 && <Abs x={70} y={640}><Chip c={RED} dark={false} q={spring(t, 200.0)} size={26}>Protéger le client</Chip></Abs>}
              {t > 209.7 && <Abs x={60} y={640}><Chip c={ORA} q={spring(t, 209.8)} size={26}>Le problème ne revient pas</Chip></Abs>}
            </AbsoluteFill>
          )}
        </AbsoluteFill>
      )}
      {/* 5S : l'établi qui se range */}
      {t > 214.4 && t < 245.3 && (() => {
        const S: [string, string, number][] = [['Seiri', "Jeter l'inutile", 227.78], ['Seiton', 'Bien ranger', 229.62], ['Seiso', 'Nettoyer', 231.5], ['Seiketsu', 'Standardiser', 233.22], ['Shitsuke', 'Maintenir la rigueur', 235.98]];
        const st = S.filter((x) => t >= x[2]).length;
        const tools = ['cle', 'tournevis', 'equerre', 'boulon', 'ciseaux', 'feutre', 'pelle', 'colis'];
        return (
          <AbsoluteFill style={{opacity: win(t, 214.4, 245.3, 0.35)}}>
            <Title>La méthode des <span style={{color: ORA}}>5S</span></Title>
            <Abs x={90} y={580} w={900} h={560} style={{borderRadius: 26, background: st >= 3 ? '#2B3E52' : '#3A3226', border: '6px solid #6E5638', overflow: 'hidden'}}>
              {st >= 3 && Array.from({length: 6}, (_, k) => <div key={k} style={{position: 'absolute', left: random(`sp${k}`) * 860, top: random(`sq${k}`) * 520, fontSize: 40, color: '#fff', opacity: Math.abs(Math.sin(t * 4 + k))}}>✦</div>)}
              {tools.map((ic, k) => {
                const gone = st >= 1 && k >= 6;
                const gx = 60 + (k % 3) * 280, gy = 60 + Math.floor(k / 3) * 230;
                const rx = 40 + random(`tx${k}`) * 760, ry = 40 + random(`ty${k}`) * 400;
                const order = prog(t, 229.62, 230.8, easeInOut);
                return <div key={ic} style={{position: 'absolute', left: rx + (gx - rx) * order, top: ry + (gy - ry) * order + (gone ? prog(t, 227.78, 228.6) * 700 : 0), transform: `rotate(${(1 - order) * (random(`tr${k}`) - 0.5) * 120}deg)`, opacity: gone ? 1 - prog(t, 228.2, 228.6) : 1}}><F n={ic} size={110} />{st >= 4 && !gone && <div style={{position: 'absolute', left: 0, top: 110, padding: '2px 8px', borderRadius: 6, background: YEL, transform: `scale(${spring(t, 233.3 + k * 0.05)})`}}><T size={16} color={INK}>{ic.toUpperCase()}</T></div>}</div>;
              })}
            </Abs>
            <Row y={1180} gap={10}>{S.map(([j, f, at], k) => <div key={j} style={{width: 176, padding: '12px 6px', borderRadius: 16, background: t >= at ? ORA : 'rgba(255,255,255,0.08)', textAlign: 'center', transform: `scale(${t >= at ? spring(t, at) : 0.9})`}}><T size={24} color={t >= at ? INK : DIM}>{j}</T><T size={18} color={t >= at ? INK : DIM} style={{marginTop: 4}}>{f}</T></div>)}</Row>
            {st >= 5 && <Abs x={430} y={1310} style={{transform: `scale(${spring(t, 236.1)})`}}><F n="calendrier" size={110} /></Abs>}
            {t > 240.7 && <Row y={1440} gap={10}><Chip c={GREEN} q={spring(t, 240.78)} size={26}>Moins de pannes</Chip><Chip c={BLUE} dark={false} q={spring(t, 242.18)} size={26}>Plus de sécurité</Chip><Chip c={YEL} q={spring(t, 243.78)} size={26}>Confiance</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* poka-yoké : le jeu de formes */}
      {t > 245.1 && t < 262.0 && (() => {
        const tryP = prog(t, 256.4, 257.4, easeInOut);
        const reject = t > 257.4 && t < 258.6 ? Math.sin((t - 257.4) * 30) * 12 : 0;
        return (
          <AbsoluteFill style={{opacity: win(t, 245.1, 262.0, 0.35)}}>
            <Title>{t < 250.6 ? <>Deux <span style={{color: ORA}}>armes lourdes</span></> : <>Le <span style={{color: ORA}}>poka-yoké</span></>}</Title>
            <Photo src="induction/operatrice.jpg" x={90} y={600} w={380} h={420} q={spring(t, 251.3)} pos="50% 25%" />
            {t > 253.5 && <Abs x={110} y={1030}><Chip c={LIGHT} q={spring(t, 253.54)} size={24}>Shigeo Shingo</Chip></Abs>}
            <Abs x={520} y={820} w={470} h={300} style={{borderRadius: 24, background: '#2B3E52', border: '6px solid #4A6077', transform: `translateX(${reject}px)`}}>
              <div style={{position: 'absolute', left: 50, top: 90, width: 120, height: 120, borderRadius: 60, background: '#0D1A26'}} />
              <div style={{position: 'absolute', left: 280, top: 90, width: 120, height: 120, background: '#0D1A26'}} />
            </Abs>
            {t > 256.0 && <Abs x={760 - tryP * 190 + (t > 258.6 ? prog(t, 258.6, 259.4) * 220 : 0)} y={650 + tryP * 170 - (t > 257.4 && t < 258.6 ? 30 : 0)} w={110} h={110} style={{background: ORA, borderRadius: 8, transform: `rotate(${t > 258.6 ? 0 : 0}deg)`}} />}
            {t > 257.4 && t < 258.6 && <Abs x={600} y={600}><Chip c={RED} dark={false} size={26}>Impossible !</Chip></Abs>}
            {t > 259.4 && <Abs x={600} y={1160}><Chip c={GREEN} q={spring(t, 259.4)} size={26}>Erreur humaine impossible</Chip></Abs>}
          </AbsoluteFill>
        );
      })()}
      {/* AMDEC : curseurs G × O × D */}
      {t > 261.8 && (() => {
        const g = prog(t, 268.6, 269.6), oc = prog(t, 270.0, 271.2), d = prog(t, 273.2, 274.6);
        const score = (0.3 + 0.6 * g) * (0.3 + 0.6 * oc) * (0.3 + 0.6 * d);
        return (
          <AbsoluteFill style={{opacity: pop(t, 261.8)}}>
            <Title>L'<span style={{color: ORA}}>AMDEC</span> : calculer le risque</Title>
            {[['Gravité', g, RED, 268.58], ['Occurrence', oc, ORA, 269.74], ['Non-détection', d, YEL, 274.34]].map(([l, v, c, at], k) => (
              <Abs key={l as string} x={130 + k * 290} y={600} w={240} h={620} style={{opacity: pop(t, (at as number) - 0.4)}}>
                <div style={{position: 'absolute', left: 100, top: 40, width: 40, height: 460, borderRadius: 20, background: 'rgba(255,255,255,0.1)'}} />
                <div style={{position: 'absolute', left: 100, top: 40 + 460 * (1 - (0.3 + 0.6 * (v as number))), width: 40, height: 460 * (0.3 + 0.6 * (v as number)), borderRadius: 20, background: c as string}} />
                <div style={{position: 'absolute', left: 70, top: 40 + 460 * (1 - (0.3 + 0.6 * (v as number))) - 30, width: 100, height: 60, borderRadius: 14, background: '#fff', boxShadow: '0 6px 12px rgba(0,0,0,0.4)'}} />
                <T size={28} style={{position: 'absolute', top: 530, width: 240, textAlign: 'center'}}>{l}</T>
                {k < 2 && <T size={70} color={DIM} style={{position: 'absolute', left: 230, top: 230}}>×</T>}
              </Abs>
            ))}
            {t > 275.6 && (
              <Abs x={140} y={1260} w={800} h={110} style={{borderRadius: 55, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', opacity: pop(t, 275.7)}}>
                <div style={{height: '100%', width: `${score * 100 * prog(t, 275.8, 277.4)}%`, background: `linear-gradient(90deg, ${GREEN}, ${YEL}, ${RED})`}} />
                <T size={36} style={{position: 'absolute', left: 30, top: 34}}>Score de criticité</T>
              </Abs>
            )}
            {t > 277.2 && <Row y={1420}><Chip c={RED} dark={false} q={spring(t, 278.3)} size={30}>Plus il est élevé, plus il faut agir</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Tiroir 4 : Lean et Kaizen ─────────── */
const P4: React.FC = () => {
  const t = useT();
  const o = win(t, 282.6, 346.8, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* Kaizen : kai + zen, petits pas */}
      {t < 319.7 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 319.3, 319.7)}}>
          <Title>{t < 302.8 ? <>Le <span style={{color: MINT}}>Kaizen</span></> : <>Tous les jours, <span style={{color: MINT}}>petit à petit</span></>}</Title>
          {t < 302.9 && (
            <AbsoluteFill style={{opacity: 1 - prog(t, 302.5, 302.9)}}>
              <Row y={640} gap={30}>
                {[['改', 'kai', 'changement', 296.1], ['善', 'zen', 'bon', 298.06]].map(([k1, r, m, at]) => <div key={r as string} style={{width: 340, height: 420, borderRadius: 30, background: PAPER, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, at as number)})`}}><div style={{fontSize: 200, color: INK, lineHeight: 1}}>{k1}</div><T size={40} color={MINT}>{r}</T><Hand size={36} color={INK}>{m}</Hand></div>)}
              </Row>
              {t > 300.9 && <Row y={1120}><Chip c={MINT} q={spring(t, 300.94)} size={30}>Un état d'esprit</Chip></Row>}
            </AbsoluteFill>
          )}
          {t > 302.7 && (
            <AbsoluteFill style={{opacity: pop(t, 302.7)}}>
              <Abs x={90} y={620} w={900} h={360} style={{borderRadius: 26, background: 'rgba(255,255,255,0.05)', border: '3px solid rgba(255,255,255,0.12)'}}>
                <div style={{position: 'absolute', left: 30, top: 20}}><T size={26} color={DIM}>30 jours d'améliorations</T></div>
                {Array.from({length: 30}, (_, k) => { const on = t > 306.4 + k * 0.12; return <div key={k} style={{position: 'absolute', left: 30 + k * 28, bottom: 30, width: 22, height: 20 + k * 8, borderRadius: 6, background: on ? MINT : 'rgba(255,255,255,0.08)'}} />; })}
              </Abs>
              {t > 302.8 && t < 306.4 && <Abs x={110} y={1020}><Chip c="#3A4A5C" dark={false} q={spring(t, 302.82)} size={26} style={{textDecoration: 'line-through'}}>Réformes brutales</Chip></Abs>}
              {t > 308.2 && <Abs x={110} y={1020}><Chip c={MINT} q={spring(t, 311.46)} size={26}>Motivation sans faille</Chip></Abs>}
              {t > 313.4 && (
                <Abs x={560} y={1010} w={420} h={430} style={{opacity: pop(t, 313.4)}}>
                  <div style={{position: 'absolute', left: 60, top: 160, width: 300, height: 240, borderRadius: 16, background: '#8A5A2B'}}><div style={{margin: '30px auto 0', width: 160, height: 18, borderRadius: 9, background: '#3A2410'}} /><T size={26} color="#fff" style={{textAlign: 'center', marginTop: 40}}>Boîte à idées</T></div>
                  {[0, 1, 2].map((k) => { const p = prog(t, 315.0 + k * 0.8, 315.7 + k * 0.8, easeIn); return <div key={k} style={{position: 'absolute', left: 170 + (k - 1) * 40, top: -40 + p * 230, width: 80, height: 60, borderRadius: 8, background: [YEL, MINT, '#FFB3C7'][k], opacity: p < 1 ? 1 : 0, transform: `rotate(${(k - 1) * 15}deg)`}}><div style={{display: 'flex', justifyContent: 'center', marginTop: 6}}><F n="ampoule" size={46} /></div></div>; })}
                </Abs>
              )}
            </AbsoluteFill>
          )}
        </AbsoluteFill>
      )}
      {/* Lean : aspirateur à mudas puis la valeur qui coule */}
      {t > 319.5 && (() => {
        const mudas: [string, string][] = [['Surproduction', 'colis'], ['Attentes', 'sablier'], ['Transports inutiles', 'camion'], ['Stocks', 'stock'], ['Gestes inutiles', 'main-levee'], ['Défauts', 'danger'], ['Sur-traitement', 'engrenage']];
        const vac = prog(t, 332.8, 338.3, (x) => x);
        const flow = prog(t, 340.9, 343.4, easeInOut);
        return (
          <AbsoluteFill style={{opacity: pop(t, 319.5)}}>
            <Title>{t < 340.5 ? <>Le <span style={{color: MINT}}>Lean</span> : « sans gras »</> : <>La <span style={{color: MINT}}>valeur</span> circule</>}</Title>
            {t < 340.6 && (
              <AbsoluteFill style={{opacity: 1 - prog(t, 340.2, 340.6)}}>
                {mudas.map(([l, ic], k) => {
                  const at = 330.7 + k * 0.3;
                  const sucked = prog(vac, k / 7, k / 7 + 0.2);
                  const x0 = 120 + (k % 4) * 220, y0 = 660 + Math.floor(k / 4) * 260;
                  return t > at && <Abs key={l} x={x0 + (880 - x0) * sucked} y={y0 + (1280 - y0) * sucked} style={{transform: `scale(${spring(t, at) * (1 - sucked * 0.8)}) rotate(${sucked * 360}deg)`, opacity: 1 - sucked, textAlign: 'center'}}><div style={{width: 160, height: 160, borderRadius: 30, background: 'rgba(255,82,82,0.18)', border: `4px solid ${RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={ic} size={90} /></div><T size={20} style={{marginTop: 6}}>{l}</T></Abs>;
                })}
                {t > 332.8 && <Abs x={800} y={1200} style={{transform: `scale(${spring(t, 332.86)}) rotate(${Math.sin(t * 20) * 3}deg)`}}><div style={{width: 200, height: 170, borderRadius: 40, background: MINT, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={30} color={INK}>MUDA</T></div></Abs>}
                {t > 329.0 && <Abs x={100} y={1380}><Chip c={RED} dark={false} q={spring(t, 329.06)} size={28}>7 types de gaspillage</Chip></Abs>}
              </AbsoluteFill>
            )}
            {t > 340.4 && (
              <AbsoluteFill style={{opacity: pop(t, 340.4)}}>
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                  <path d="M80 900 L1000 900" stroke="#2B3E52" strokeWidth={110} strokeLinecap="round" />
                  <path d="M80 900 L1000 900" stroke={MINT} strokeWidth={70} strokeLinecap="round" pathLength={1} strokeDasharray={`${flow} 1`} />
                  {flow > 0.1 && Array.from({length: 8}, (_, k) => <circle key={k} cx={80 + ((k * 130 + t * 300) % (920 * flow))} cy={900} r={14} fill="#fff" opacity={0.7} />)}
                </svg>
                <Abs x={40} y={760}><F n="usine" size={110} /></Abs>
                <Abs x={930} y={760}><F n="salarie" size={110} /></Abs>
                {t > 342.6 && <Row y={1060}><Chip c={MINT} q={spring(t, 342.66)} size={30}>Du point de vue du client, sans interruption</Chip></Row>}
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Tiroir 5 : management intégré ─────────── */
const P5: React.FC = () => {
  const t = useT();
  const o = win(t, 349.3, 445.0, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* zoom arrière + certificat + citation à l'encre */}
      {t < 391.9 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 391.5, 391.9)}}>
          {t < 366.3 && (
            <AbsoluteFill style={{opacity: 1 - prog(t, 365.9, 366.3)}}>
              <Title>{t < 360.7 ? <>Un <span style={{color: VIO}}>zoom arrière</span> stratégique</> : <>L'objectif : la <span style={{color: VIO}}>certification</span></>}</Title>
              {t < 360.8 && (() => { const z = prog(t, 352.8, 358.3, easeInOut); return <Abs x={540} y={980} style={{transform: `translate(-50%, -50%) scale(${2.4 - z * 1.6})`}}><div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 160px)', gap: 12}}>{['loupe', 'graphique', 'engrenage', 'clipboard', 'cible', 'pousse', 'equipe', 'balance', 'puzzle'].map((ic, k) => <div key={ic} style={{width: 160, height: 160, borderRadius: 26, background: [GREEN, BLUE, ORA, MINT, RED, MINT, VIO, YEL, VIO][k], display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: k === 4 || z > 0.2 ? 1 : 0}}><F n={ic} size={90} /></div>)}</div></Abs>; })()}
              {t > 360.6 && <Abs x={190} y={620} w={700} h={520} style={{borderRadius: 16, background: PAPER, border: `14px double ${YEL}`, padding: 40, boxSizing: 'border-box', textAlign: 'center', transform: `scale(${spring(t, 360.7)})`}}><T size={40} color={INK}>CERTIFICAT</T><T size={80} color={VIO} style={{marginTop: 30}}>ISO 9001</T><div style={{margin: '40px auto 0', width: 120, height: 120, borderRadius: 60, background: YEL, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="medaille" size={90} /></div></Abs>}
            </AbsoluteFill>
          )}
          {t > 366.1 && (() => {
            const lines = ['« Si le personnel pense que la', 'certification est un subterfuge', 'pour l’exploiter davantage,', 'le problème ne se pose pas au', 'niveau de la mise en œuvre des', 'normes, mais de l’adaptation', 'de son management. »'];
            return (
              <AbsoluteFill style={{opacity: pop(t, 366.1)}}>
                <Title>Une citation <span style={{color: VIO}}>lucide</span></Title>
                <Abs x={90} y={600} w={900} h={720} style={{borderRadius: 20, background: PAPER, padding: '40px 50px', boxSizing: 'border-box', boxShadow: '0 30px 60px rgba(0,0,0,0.5)'}}>
                  {lines.map((l, k) => { const p = prog(t, 371.0 + k * 1.25, 372.2 + k * 1.25, (x) => x); return <div key={k} style={{position: 'relative', marginTop: 12, height: 64, overflow: 'hidden'}}><div style={{width: `${p * 100}%`, overflow: 'hidden', whiteSpace: 'nowrap'}}><Hand size={50} color={k >= 5 ? '#7B4FE0' : INK}>{l}</Hand></div></div>; })}
                  <T size={26} color="#7A869E" style={{position: 'absolute', right: 40, bottom: 30}}>— J.-P. Huberac</T>
                </Abs>
                {t > 381.0 && <Row y={1380}><Chip c={VIO} dark={false} q={spring(t, 383.22)} size={28}>Sans adhésion culturelle, un certificat ne vaut rien</Chip></Row>}
              </AbsoluteFill>
            );
          })()}
        </AbsoluteFill>
      )}
      {/* knowledge management : planètes autour du cerveau */}
      {t > 391.7 && t < 413.9 && (
        <AbsoluteFill style={{opacity: win(t, 391.7, 413.9, 0.35)}}>
          <Title>La <span style={{color: VIO}}>gestion des connaissances</span></Title>
          <Abs x={420} y={860} style={{transform: `scale(${spring(t, 392.0)})`}}><F n="cerveau" size={240} /></Abs>
          {[['Repérer', 402.14], ['Préserver', 403.62], ['Valoriser', 404.62], ['Partager', 405.66], ['Actualiser', 407.46]].map(([l, at], k) => {
            const a = (k / 5) * Math.PI * 2 + t * 0.5;
            return t > (at as number) && <Abs key={l as string} x={540 + Math.cos(a) * 360 - 85} y={980 + Math.sin(a) * 300 - 85} style={{transform: `scale(${spring(t, at as number)})`}}><div style={{width: 170, height: 170, borderRadius: 85, background: `radial-gradient(circle at 35% 35%, #fff, ${[VIO, BLUE, MINT, YEL, ORA][k]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 30px ${[VIO, BLUE, MINT, YEL, ORA][k]}88`}}><T size={26} color={INK}>{l}</T></div></Abs>;
          })}
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><ellipse cx={540} cy={980} rx={360} ry={300} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={3} strokeDasharray="10 10" /></svg>
          {t > 409.7 && <Row y={1400}><Chip c={RED} dark={false} q={spring(t, 410.98)} size={28}>Le sang d'une organisation apprenante</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* serveur vs têtes pensantes, puis l'avalanche filtrée */}
      {t > 413.7 && (() => {
        const filt = t > 440.4;
        return (
          <AbsoluteFill style={{opacity: pop(t, 413.7)}}>
            <Title>{t < 432.4 ? <>Données <span style={{color: BLUE}}>tangibles</span> et savoirs <span style={{color: VIO}}>tacites</span></> : <>Gare à la <span style={{color: RED}}>pollution informationnelle</span></>}</Title>
            {t < 432.6 && (
              <AbsoluteFill style={{opacity: 1 - prog(t, 432.2, 432.6)}}>
                <Abs x={90} y={640} w={420} h={560} style={{borderRadius: 26, background: '#14304A', border: `4px solid ${BLUE}`, opacity: pop(t, 419.66)}}>
                  {[0, 1, 2, 3].map((k) => <div key={k} style={{margin: '30px 30px 0', height: 90, borderRadius: 10, background: '#0B1E30', display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 20}}>{[0, 1, 2].map((j) => <div key={j} style={{width: 14, height: 14, borderRadius: 7, background: (Math.floor(t * 4) + k + j) % 3 ? GREEN : '#1D3A2A'}} />)}</div>)}
                  <T size={28} style={{position: 'absolute', bottom: 20, width: 420, textAlign: 'center'}}>Données stockées</T>
                </Abs>
                <Abs x={570} y={640} w={420} h={560} style={{borderRadius: 26, background: '#2A2048', border: `4px solid ${VIO}`, overflow: 'hidden', opacity: pop(t, 423.26)}}>
                  <Img src={PH('induction/accueil-groupe.jpg')} style={{width: '100%', height: 400, objectFit: 'cover'}} />
                  {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 60 + k * 120, top: 40 + Math.sin(t * 3 + k) * 10}}><F n="ampoule" size={70} /></div>)}
                  <T size={28} style={{position: 'absolute', bottom: 20, width: 420, textAlign: 'center'}}>Capital immatériel</T>
                </Abs>
                {t > 427.1 && <Row y={1260}><Chip c={VIO} dark={false} q={spring(t, 427.18)} size={30}>La force : l'intelligence collective</Chip></Row>}
              </AbsoluteFill>
            )}
            {t > 432.4 && (
              <AbsoluteFill style={{opacity: pop(t, 432.4)}}>
                <Img src={PH('causerie/animatrice-d.png')} style={{position: 'absolute', left: 380, top: 900, height: 460}} />
                {Array.from({length: 22}, (_, k) => { const at = 434.7 + k * 0.12; const p = prog(t, at, at + 0.6, easeIn); const keep = k === 11; const x = 100 + random(`nx${k}`) * 800; const y = 560 + p * (filt && !keep ? 900 : 420 + random(`ny${k}`) * 200); return t > at && <Abs key={k} x={filt && keep ? 540 - 160 + 0 * x : x} y={filt && keep ? 640 : y} style={{opacity: filt && !keep ? 1 - prog(t, 440.4, 441.0) : 1}}><div style={{width: filt && keep ? 320 : 180, padding: '10px 14px', borderRadius: 14, background: keep && filt ? GREEN : '#fff', boxShadow: '0 6px 12px rgba(0,0,0,0.3)', transform: `rotate(${filt && keep ? 0 : (random(`nr${k}`) - 0.5) * 30}deg)`}}><T size={filt && keep ? 30 : 18} color={INK}>{filt && keep ? 'La bonne info, au bon moment' : 'Notification'}</T></div></Abs>; })}
                {filt && <Row y={1400}><Chip c={GREEN} q={spring(t, 443.62)} size={30}>Une vraie synergie</Chip></Row>}
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Tiroir 6 : transformation radicale ─────────── */
const P6: React.FC = () => {
  const t = useT();
  if (t < 447.4) return null;
  const o = pop(t, 447.5, 0.5);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* Kaizen vs BPR : bulldozer */}
      {t < 483.3 && (() => {
        const doze = prog(t, 478.4, 480.4, easeInOut);
        const build = prog(t, 480.5, 482.6, easeOut);
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 482.9, 483.3)}}>
            <Title>{t < 460.0 ? <>L'<span style={{color: RED}}>artillerie lourde</span></> : <><span style={{color: MINT}}>Kaizen</span> contre <span style={{color: RED}}>BPR</span></>}</Title>
            {t < 460.1 && <Abs x={380} y={700} style={{transform: `scale(${spring(t, 451.98)})`, opacity: 1 - prog(t, 459.7, 460.1)}}><F n="bombe" size={320} /></Abs>}
            {t > 459.9 && (
              <AbsoluteFill style={{opacity: pop(t, 459.9)}}>
                <Abs x={60} y={620} w={460} h={300} style={{borderRadius: 26, background: 'rgba(61,224,176,0.12)', border: `4px solid ${MINT}`, padding: 20, boxSizing: 'border-box', transform: `scale(${spring(t, 463.78)})`}}><T size={40} color={MINT}>Kaizen</T><Hand size={32}>doux, continu, par la base</Hand><div style={{display: 'flex', gap: 6, marginTop: 20}}>{Array.from({length: 10}, (_, k) => <div key={k} style={{width: 30, height: 20 + k * 6, borderRadius: 4, background: MINT, alignSelf: 'flex-end'}} />)}</div></Abs>
                <Abs x={560} y={620} w={460} h={300} style={{borderRadius: 26, background: 'rgba(255,82,82,0.12)', border: `4px solid ${RED}`, padding: 20, boxSizing: 'border-box', transform: `scale(${spring(t, 468.86)})`}}><T size={40} color={RED}>BPR</T><Hand size={32}>radical, vertical, par le sommet</Hand><div style={{marginTop: 20, fontSize: 80, color: RED, lineHeight: 1}}>⬇</div></Abs>
                {/* bâtiment rasé puis reconstruit */}
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><line x1={60} y1={1420} x2={1020} y2={1420} stroke="rgba(255,255,255,0.3)" strokeWidth={6} /></svg>
                {t > 476.5 && <Abs x={560} y={1420 - 360 * (1 - doze)} w={300} h={360 * (1 - doze)} style={{background: '#5A6B7A', overflow: 'hidden', opacity: 1 - doze * 0.5}}>{Array.from({length: 8}, (_, k) => <div key={k} style={{position: 'absolute', left: 30 + (k % 3) * 90, top: 30 + Math.floor(k / 3) * 100, width: 60, height: 60, background: '#2B3A48'}} />)}</Abs>}
                {t > 477.0 && <Abs x={60 + doze * 400} y={1240} style={{transform: `rotate(${doze > 0 && doze < 1 ? Math.sin(t * 30) * 2 : 0}deg)`}}><svg width={300} height={180} viewBox="0 0 300 180"><rect x={60} y={40} width={150} height={80} rx={10} fill={YEL} /><rect x={150} y={10} width={60} height={50} rx={6} fill={YEL} /><rect x={210} y={70} width={80} height={60} fill="#888" /><circle cx={90} cy={150} r={26} fill="#222" /><circle cx={180} cy={150} r={26} fill="#222" /></svg></Abs>}
                {build > 0 && <Abs x={600} y={1420 - 420 * build} w={240} h={420 * build} style={{background: `linear-gradient(180deg, ${MINT}, ${BLUE})`, borderRadius: '20px 20px 0 0'}} />}
                {t > 480.9 && <Abs x={110} y={1000}><Chip c={RED} dark={false} q={spring(t, 480.9)} size={28}>Gains spectaculaires : coûts, délais</Chip></Abs>}
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* Destroy your own business : bouton puis renaissance, lauriers */}
      {t > 483.1 && (() => {
        const boom = prog(t, 492.3, 493.2, easeOut);
        const rise = prog(t, 494.2, 497.0, easeOut);
        const fall = prog(t, 505.9, 507.0, easeIn);
        return (
          <AbsoluteFill style={{opacity: pop(t, 483.1)}}>
            <Title>{t < 492.3 ? <>« Destroy your <span style={{color: RED}}>own business</span> »</> : t < 502.8 ? <>Anticiper <span style={{color: GREEN}}>avant les autres</span></> : <>Pas de repos sur ses <span style={{color: YEL}}>lauriers</span></>}</Title>
            {t < 492.4 && (
              <AbsoluteFill>
                <Abs x={340} y={720} w={400} h={400} style={{borderRadius: 200, background: '#2B3A48', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 483.3)})`}}><div style={{width: 280, height: 280, borderRadius: 140, background: `radial-gradient(circle at 35% 35%, #FF8A8A, ${RED})`, boxShadow: `0 ${t > 491.5 ? 4 : 20}px 0 #9A2020`, transform: `translateY(${t > 491.5 ? 16 : 0}px)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={38} color="#fff">DÉTRUIRE</T></div></Abs>
                {t > 487.7 && <Row y={1200}><Chip c={RED} dark={false} q={spring(t, 487.7)} size={30}>Une culture provocatrice</Chip></Row>}
              </AbsoluteFill>
            )}
            {boom > 0 && boom < 1 && <div style={{position: 'absolute', left: 540 - 900 * boom, top: 920 - 900 * boom, width: 1800 * boom, height: 1800 * boom, borderRadius: '50%', background: `radial-gradient(circle, #fff, ${ORA} 40%, ${RED} 70%, transparent 72%)`, opacity: 1 - boom}} />}
            {t > 493.4 && t < 503.0 && (
              <AbsoluteFill style={{opacity: 1 - prog(t, 502.6, 503.0)}}>
                <Abs x={390} y={1280 - rise * 500} style={{transform: `scale(${0.4 + rise * 0.8})`}}><F n="fusee" size={300} /></Abs>
                {t > 495.1 && <Abs x={80} y={640}><Chip c={GREEN} q={spring(t, 495.14)} size={26}>Bonds technologiques</Chip></Abs>}
                {t > 498.4 && <Abs x={560} y={720}><Chip c={BLUE} dark={false} q={spring(t, 498.5)} size={26}>Marchés qui basculent</Chip></Abs>}
                {t > 500.9 && <Abs x={160} y={1400}><Chip c={RED} dark={false} q={spring(t, 501.3)} size={26}>Avant qu'un concurrent ne le fasse</Chip></Abs>}
              </AbsoluteFill>
            )}
            {t > 502.8 && (
              <AbsoluteFill style={{opacity: pop(t, 502.8)}}>
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                  <g transform={`translate(540 ${900 + fall * 600}) rotate(${fall * 40})`} opacity={1 - fall * 0.6}>
                    {Array.from({length: 14}, (_, k) => { const a = Math.PI * 0.15 + (k / 13) * Math.PI * 0.7; const sd = k < 7 ? -1 : 1; const aa = k < 7 ? Math.PI - a : a; return <ellipse key={k} cx={Math.cos(aa) * 200 * sd * sd} cy={-Math.sin(aa) * 200 + 200} rx={34} ry={14} fill="#4DBF8A" transform={`rotate(${(aa * 180) / Math.PI + 90} ${Math.cos(aa) * 200} ${-Math.sin(aa) * 200 + 200})`} />; })}
                  </g>
                </svg>
                <Row y={1320}><Chip c={YEL} q={spring(t, 503.2)} size={30}>L'innovation poussée à l'extrême</Chip></Row>
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
      {t > 2.5 && t < 39.8 && <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', opacity: pop(t, 2.5) * (1 - prog(t, 39.4, 39.8))}}><div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '8px 24px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${GREEN}`}}><F n="boite-outils" size={40} /><T size={34}>Outils et méthodes <span style={{color: GREEN}}>qualité</span></T></div></div>}
      {p && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 230, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: pop(t, p.at + WIPE - 0.3) * (1 - prog(t, p.end - 0.3, p.end))}}>
          <Cabinet w={70} open={p.n - 1} lit={p.n} labels={false} />
          <div style={{padding: '8px 22px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${p.c}`}}><T size={p.l.length > 30 ? 26 : 32}>{p.l}</T></div>
        </div>
      )}
    </AbsoluteFill>
  );
};

const Bg: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{background: BG}}>
      {/* panneau perforé d'atelier */}
      <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 4px, transparent 4px)', backgroundSize: '50px 50px', backgroundPosition: `0 ${-t * 3}px`}} />
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 35%, rgba(46,204,113,0.10), transparent 60%)'}} />
    </AbsoluteFill>
  );
};

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2}, {at: 2.3, s: 'sfx/thud', v: 0.3}, {at: 3.6, s: 'page', v: 0.5}, {at: 6.3, s: 'stylo', v: 0.3}, {at: 11.78, s: 'validation', v: 0.3},
  {at: 13.0, s: 'sfx/whoosh', v: 0.3}, {at: 14.9, s: 'soft-whoosh', v: 0.35, dur: 2.5}, ...[18.5, 19.94, 21.26].map((at) => ({at, s: 'sfx/pop', v: 0.25})),
  {at: 23.9, s: 'sfx/thud', v: 0.35}, ...[25.9, 27.62, 29.62, 31.34, 33.74, 35.78].map((at) => ({at, s: 'sfx/swish', v: 0.35})), {at: 39.14, s: 'sfx/ding', v: 0.3},
  ...PT.flatMap((p) => [{at: p.at, s: 'sfx/swish', v: 0.45}, {at: p.at + 0.5, s: 'bass-hit', v: 0.3}, {at: p.at + 0.6, s: 'sfx/click', v: 0.4}, {at: p.at + WIPE - 0.55, s: 'soft-whoosh', v: 0.4, dur: 1}]),
  {at: 46.6, s: 'deep-hit', v: 0.35}, {at: 46.65, s: 'sfx/thud', v: 0.3}, {at: 53.0, s: 'sfx/whoosh', v: 0.25}, {at: 61.9, s: 'bass-hit', v: 0.4}, ...Array.from({length: 12}, (_, k) => ({at: 71.0 + k * 0.08, s: 'sfx/pop', v: 0.12})),
  {at: 80.5, s: 'sfx/pop', v: 0.25}, ...[81.8, 82.3].map((at) => ({at, s: 'sfx/click', v: 0.3})), ...Array.from({length: 7}, (_, k) => ({at: 91.6 + k * 0.12, s: 'sfx/pop', v: 0.2})), {at: 93.98, s: 'validation', v: 0.3},
  {at: 102.0, s: 'tick', v: 0.25}, {at: 103.0, s: 'tick', v: 0.25}, {at: 105.1, s: 'sfx/swish', v: 0.3}, {at: 109.1, s: 'sfx/pop', v: 0.25},
  {at: 116.0, s: 'sfx/rise', v: 0.3}, {at: 118.0, s: 'sfx/swish', v: 0.25}, {at: 122.42, s: 'tampon', v: 0.4}, {at: 124.26, s: 'sfx/pop', v: 0.3}, {at: 128.58, s: 'sfx/ding', v: 0.3},
  ...Array.from({length: 5}, (_, k) => ({at: 143.4 + k * 0.12, s: 'sfx/thud', v: 0.25})), ...Array.from({length: 10}, (_, k) => ({at: 149.5 + k * 0.45, s: 'sfx/click', v: 0.2})),
  ...Array.from({length: 5}, (_, k) => ({at: 157.0 + k * 0.9, s: 'sfx/pop', v: 0.3})), {at: 160.6, s: 'sfx/bell', v: 0.3},
  ...[165.53, 166.4, 167.86, 168.2, 168.46, 168.92, 169.5].map((at) => ({at, s: 'sfx/click', v: 0.3})), {at: 170.58, s: 'validation', v: 0.3},
  {at: 181.4, s: 'sfx/pop', v: 0.3}, ...D8AT.map((at) => ({at, s: 'sfx/thud', v: 0.4})), {at: 200.0, s: 'sfx/pop', v: 0.25}, {at: 209.8, s: 'validation', v: 0.3},
  {at: 214.6, s: 'sfx/whoosh', v: 0.3}, {at: 227.78, s: 'sfx/thud', v: 0.35}, {at: 229.62, s: 'sfx/swish', v: 0.35}, {at: 231.5, s: 'sfx/rise', v: 0.25}, {at: 233.22, s: 'stylo', v: 0.3}, {at: 235.98, s: 'sfx/ding', v: 0.3}, ...[240.78, 242.18, 243.78].map((at) => ({at, s: 'sfx/pop', v: 0.25})),
  {at: 251.3, s: 'sfx/whoosh', v: 0.3}, {at: 256.4, s: 'sfx/swish', v: 0.3}, {at: 257.4, s: 'sfx/thud', v: 0.4}, {at: 257.45, s: 'alarme', v: 0.15, dur: 1}, {at: 259.4, s: 'validation', v: 0.3},
  {at: 262.0, s: 'sfx/whoosh', v: 0.3}, ...[268.6, 270.0, 273.2].map((at) => ({at, s: 'sfx/rise', v: 0.2})), {at: 275.8, s: 'tension', v: 0.2, dur: 1.6}, {at: 277.4, s: 'deep-hit', v: 0.35},
  {at: 296.1, s: 'sfx/pop', v: 0.3}, {at: 298.06, s: 'sfx/pop', v: 0.3}, {at: 300.94, s: 'sfx/ding', v: 0.3}, {at: 302.82, s: 'sfx/thud', v: 0.25}, ...Array.from({length: 15}, (_, k) => ({at: 306.4 + k * 0.24, s: 'tick', v: 0.15})), ...[315.7, 316.5, 317.3].map((at) => ({at, s: 'sfx/click', v: 0.3})),
  ...Array.from({length: 7}, (_, k) => ({at: 330.7 + k * 0.3, s: 'sfx/pop', v: 0.2})), {at: 332.86, s: 'soft-whoosh', v: 0.4, dur: 5}, {at: 340.9, s: 'sfx/rise', v: 0.3}, {at: 342.66, s: 'validation', v: 0.3},
  {at: 352.8, s: 'soft-whoosh', v: 0.35, dur: 5}, {at: 360.7, s: 'tampon', v: 0.45}, {at: 366.2, s: 'page', v: 0.4}, ...Array.from({length: 7}, (_, k) => ({at: 371.0 + k * 1.25, s: 'stylo', v: 0.2})), {at: 383.22, s: 'sfx/pop', v: 0.25},
  {at: 392.0, s: 'sfx/pop', v: 0.3}, ...[402.14, 403.62, 404.62, 405.66, 407.46].map((at) => ({at, s: 'sfx/ding', v: 0.22})), {at: 410.98, s: 'sfx/pop', v: 0.25},
  {at: 419.66, s: 'sfx/whoosh', v: 0.25}, {at: 423.26, s: 'sfx/whoosh', v: 0.25}, {at: 427.18, s: 'sfx/pop', v: 0.25}, ...Array.from({length: 11}, (_, k) => ({at: 434.7 + k * 0.24, s: 'notification', v: 0.15})), {at: 440.4, s: 'sfx/swish', v: 0.4}, {at: 443.62, s: 'validation', v: 0.3},
  {at: 451.98, s: 'deep-hit', v: 0.35}, {at: 463.78, s: 'sfx/pop', v: 0.28}, {at: 468.86, s: 'sfx/thud', v: 0.35}, {at: 477.0, s: 'tension', v: 0.2, dur: 3}, {at: 478.6, s: 'deep-hit', v: 0.45}, {at: 480.5, s: 'sfx/rise', v: 0.3}, {at: 480.9, s: 'sfx/ding', v: 0.3},
  {at: 483.3, s: 'sfx/pop', v: 0.3}, {at: 487.7, s: 'sfx/pop', v: 0.25}, {at: 491.5, s: 'sfx/click', v: 0.5}, {at: 492.3, s: 'bass-hit', v: 0.55}, {at: 492.35, s: 'deep-hit', v: 0.5}, {at: 494.2, s: 'sfx/rise', v: 0.35}, ...[495.14, 498.5, 501.3].map((at) => ({at, s: 'sfx/pop', v: 0.25})), {at: 503.2, s: 'sfx/ding', v: 0.3}, {at: 505.9, s: 'sfx/swish', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const OutilsQualite: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <Bg />
    <Gate from={0} to={39.9}><Intro /></Gate>
    <Gate from={42.1} to={99.1}><P1 /></Gate>
    <Gate from={101.4} to={175.7}><P2 /></Gate>
    <Gate from={178.0} to={280.2}><P3 /></Gate>
    <Gate from={282.5} to={346.9}><P4 /></Gate>
    <Gate from={349.2} to={445.1}><P5 /></Gate>
    <Gate from={447.3} to={OUTRO_AT}><P6 /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><SplitWipe p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.3} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-outils-qualite-origine.m4a')} trimAfter={s(507.25)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

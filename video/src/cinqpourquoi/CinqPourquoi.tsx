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
 * « La méthode des 5 Pourquoi » (4 min 08) — voix d'origine, sous-titres recalés mot à mot, photos réelles. Fil rouge
 * inédit : un oignon dont chaque pourquoi épluche une couche jusqu'au cœur (la cause racine), et des transitions où la
 * caméra traverse un point d'interrogation géant. Autres techniques nouvelles : mauvaise herbe arrachée dont les
 * racines restent, fuite qu'on éponge puis qu'on répare, jauges production / qualité / sécurité, tapis roulant où le
 * défaut revient, foreuse qui traverse les couches du sol, pansement barré contre fondations, carte qui dézoome à
 * chaque pourquoi (de la ligne à l'usine du fournisseur), cible de fléchettes, fil de distance symptôme → cause,
 * écran partagé pompier / prévention avec feux qui se rallument, profondimètre du plongeur.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 248.0;
export const CINQPOURQUOI_FRAMES = s(OUTRO_AT + 3.8);
const BG = '#121627';
const INK = '#141A2C';
const LIGHT = '#F7F8FF';
const DIM = 'rgba(247,248,255,0.65)';
const PINK = '#FF6FB5';
const YEL = '#FFD23F';
const ORA = '#FF8A3D';
const RED = '#FF5252';
const GREEN = '#3DD68C';
const BLUE = '#4D9DFF';
const VIO = '#9B7BFF';
const PAPER = '#FBF4E4';
const PH = (p: string) => staticFile(p);
const LAYERS = ['#E9D5F5', '#D9B3EE', '#C58BE2', '#A85FCF', '#8236B5'];

type Pt = {n: number; l: string; at: number; end: number; c: string};
const PT: Pt[] = [
  {n: 1, l: 'Le problème de surface', at: 12.0, end: 71.7, c: PINK},
  {n: 2, l: 'La quête de la cause', at: 71.9, end: 104.9, c: YEL},
  {n: 3, l: "L'enquête : 5 niveaux de vérité", at: 105.1, end: 183.7, c: VIO},
  {n: 4, l: 'La cause racine', at: 183.9, end: 211.2, c: RED},
  {n: 5, l: 'Pompier ou prévention ?', at: 211.4, end: 247.8, c: GREEN},
];
const WIPE = 2.4;
type W = {n: number; q: string; a: string; qAt: number; aAt: number; src: string; pos: string; place: string};
const WHYS: W[] = [
  {n: 1, q: 'Pourquoi ce produit est-il défectueux ?', a: 'Il manque une pièce', qAt: 117.7, aAt: 122.98, src: 'induction/operatrice.jpg', pos: '50% 25%', place: 'La ligne'},
  {n: 2, q: 'Pourquoi manque-t-il cette pièce ?', a: "Pas livrée à temps", qAt: 131.5, aAt: 138.42, src: 'septm/entrepot.jpg', pos: 'center', place: 'La logistique'},
  {n: 3, q: "Pourquoi n'a-t-elle pas été livrée ?", a: 'Retard du fournisseur', qAt: 145.74, aAt: 152.42, src: 'induction/reunion-audit.jpg', pos: 'center', place: 'Le fournisseur'},
  {n: 4, q: 'Pourquoi ce retard ?', a: 'Problème de production', qAt: 156.94, aAt: 163.78, src: 'smi/fumees.jpg', pos: 'center', place: 'Son usine'},
  {n: 5, q: 'Pourquoi ce problème de production ?', a: 'Machines en panne', qAt: 171.1, aAt: 180.26, src: 'induction/technicien-hse.jpg', pos: '50% 35%', place: 'La machine'},
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
const Photo: React.FC<{src: string; x: number; y: number; w: number; h: number; q?: number; r?: number; pos?: string; children?: React.ReactNode; filter?: string; border?: string}> = ({src, x, y, w, h, q = 1, r = 0, pos = 'center', children, filter, border = 'rgba(255,255,255,0.92)'}) => {
  const t = useT();
  return (
    <Abs x={x} y={y} w={w} h={h} style={{borderRadius: 30, overflow: 'hidden', border: `6px solid ${border}`, boxShadow: '0 30px 60px rgba(0,0,0,0.5)', transform: `scale(${q}) rotate(${r}deg)`}}>
      <Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${1.05 + (t % 30) * 0.004})`, filter}} />
      {children}
    </Abs>
  );
};
/** L'oignon : `peeled` couches retirées (0 à 5), la dernière s'envole quand `fly` > 0. */
const Onion: React.FC<{size: number; peeled: number; fly?: number; core?: boolean}> = ({size, peeled, fly = 0, core}) => (
  <div style={{position: 'relative', width: size, height: size * 1.15}}>
    <svg width={size} height={size * 1.15} viewBox="0 0 100 115" style={{overflow: 'visible'}}>
      <path d="M50 2 Q46 14 50 22 Q54 14 50 2" fill={GREEN} />
      {LAYERS.map((c, k) => {
        if (k < Math.floor(peeled)) return null;
        const r = 46 - k * 7.5;
        const isFly = k === Math.floor(peeled) - 1;
        return <ellipse key={k} cx={50} cy={66} rx={r} ry={r * 1.02} fill={c} stroke="rgba(0,0,0,0.12)" strokeWidth={1} transform={isFly ? `translate(${fly * 80} ${-fly * 60}) rotate(${fly * 40} 50 66)` : undefined} opacity={isFly ? 1 - fly : 1} />;
      })}
      {Array.from({length: 5}, (_, k) => k >= Math.floor(peeled) && <path key={`l${k}`} d={`M${50 - (40 - k * 7.5) * 0.6} 40 Q50 ${30 + k * 4} ${50 + (40 - k * 7.5) * 0.6} 40`} stroke="rgba(255,255,255,0.4)" strokeWidth={1.2} fill="none" />)}
      {core && <circle cx={50} cy={66} r={12} fill={RED} style={{filter: `drop-shadow(0 0 6px ${RED})`}} />}
    </svg>
  </div>
);

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: BG, opacity: 1 - out}}>
      <Img src={PH('induction/technicien-hse.jpg')} style={{position: 'absolute', left: -200, top: 0, width: 1480, height: 1150, objectFit: 'cover', filter: 'saturate(0.7) brightness(0.7)'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${BG}AA 0%, ${BG}33 30%, ${BG} 60%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      {/* la chaîne des pourquoi */}
      <Abs x={0} y={420} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16}}>{[1, 2, 3, 4, 5].map((k) => <div key={k} style={{width: 150, height: 150, borderRadius: 75, background: LAYERS[k - 1], border: `6px solid ${k === 5 ? RED : '#fff'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `translateY(${Math.sin(t * 3 + k) * 10}px)`}}><T size={80} color={INK}>?</T></div>)}</Abs>
      <Abs x={390} y={640}><Onion size={300} peeled={2} core /></Abs>
      <Abs x={60} y={1060} w={960} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: PINK, color: INK, fontFamily: sansFont, fontWeight: 800, fontSize: 32, letterSpacing: 3}}>RÉSOLUTION DE PROBLÈMES</div>
        <T size={120} style={{marginTop: 18, textTransform: 'uppercase', letterSpacing: -3}}>La méthode</T>
        <T size={118} color={YEL} style={{letterSpacing: -3}}>des 5 Pourquoi</T>
        <Hand size={52} color={DIM} style={{marginTop: 12}}>un symptôme n'est jamais toute l'histoire</Hand>
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : traverser le point d'interrogation ─────────── */
const QWipe: React.FC<{p: Pt}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const z = prog(t, a, a + 1.0, easeIn);
  const out = prog(t, b - 0.45, b, easeIn);
  const sc = 0.4 + z * 18;
  return (
    <AbsoluteFill style={{zIndex: 55, pointerEvents: 'none'}}>
      {z < 0.98 && <div style={{position: 'absolute', left: 540, top: 900, transform: `translate(-50%, -50%) scale(${sc})`, fontFamily: sansFont, fontWeight: 900, fontSize: 400, color: p.c, lineHeight: 1, textShadow: '0 20px 40px rgba(0,0,0,0.5)'}}>?</div>}
      {z > 0.6 && (
        <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, ${p.c}, ${BG} 80%)`, opacity: prog(z, 0.6, 1) * (1 - out)}}>
          <Abs x={60} y={660} w={960} style={{textAlign: 'center', transform: `scale(${spring(t, a + 1.0)})`}}>
            <div style={{display: 'inline-block', width: 160, height: 160, borderRadius: 80, background: 'rgba(0,0,0,0.3)', lineHeight: '160px'}}><T size={110} style={{lineHeight: '160px'}}>{p.n}</T></div>
            <T size={92} style={{marginTop: 30, textShadow: '0 10px 30px rgba(0,0,0,0.5)'}}>{p.l}</T>
          </Abs>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Accroche ─────────── */
const Hook: React.FC = () => {
  const t = useT();
  const o = 1 - prog(t, 11.7, 12.0);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Title>{t < 7.2 ? <>Une méthode d'une <span style={{color: YEL}}>efficacité redoutable</span></> : <>La méthode des <span style={{color: YEL}}>5 Pourquoi</span></>}</Title>
      <Abs x={390} y={640} style={{transform: `scale(${spring(t, 2.9)})`}}><Onion size={300} peeled={0} /></Abs>
      {t > 8.1 && <Row y={1060}><Chip c={LIGHT} q={spring(t, 8.2)} size={30}><F n="usine" size={44} />Les industries les plus exigeantes</Chip></Row>}
      {t > 10.3 && <Row y={1180} gap={14}>{[1, 2, 3, 4, 5].map((k) => <div key={k} style={{width: 110, height: 110, borderRadius: 55, background: LAYERS[k - 1], display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 10.3 + k * 0.12)})`}}><T size={60} color={INK}>?</T></div>)}</Row>}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 1 : le problème de surface ─────────── */
const P1: React.FC = () => {
  const t = useT();
  const o = win(t, 14.4, 71.7, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* la mauvaise herbe dont les racines restent */}
      {t < 25.3 && (() => {
        const pull = prog(t, 22.9, 24.0, easeOut);
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 24.9, 25.3)}}>
            <Title>{t < 18.2 ? <>Une <span style={{color: PINK}}>panne</span>, un <span style={{color: PINK}}>bug</span>…</> : <>Ce qu'on voit n'est <span style={{color: PINK}}>jamais la cause réelle</span></>}</Title>
            <Abs x={60} y={980} w={960} h={520} style={{borderRadius: 30, background: 'linear-gradient(180deg, #5A3E2B, #3A2718)', overflow: 'hidden'}}>
              <svg width={960} height={520} style={{position: 'absolute', inset: 0}}>
                {[[480, 0, 300, 420], [480, 0, 620, 380], [480, 0, 420, 480], [480, 0, 560, 470], [480, 0, 200, 300], [480, 0, 760, 280]].map(([x0, y0, x1, y1], k) => <path key={k} d={`M${x0} ${y0} Q${(x0 + x1) / 2 + (k % 2 ? 60 : -60)} ${y1 / 2} ${x1} ${y1}`} stroke="#E8C79A" strokeWidth={10 - k} fill="none" opacity={pop(t, 19.2 + k * 0.2)} strokeDasharray="1 0" />)}
                {t > 20.8 && <circle cx={500} cy={420} r={34} fill={RED} opacity={pop(t, 20.9)} style={{filter: `drop-shadow(0 0 14px ${RED})`}} />}
              </svg>
              {t > 20.8 && <div style={{position: 'absolute', left: 560, top: 400, opacity: pop(t, 21.0)}}><Chip c={RED} dark={false} size={24}>la vraie cause</Chip></div>}
            </Abs>
            {/* la partie visible */}
            <Abs x={420} y={760 - pull * 260} style={{transform: `rotate(${pull * -20}deg)`}}>
              <svg width={240} height={240} viewBox="0 0 120 120">{[-30, -10, 10, 30].map((a, k) => <path key={k} d={`M60 120 Q${60 + a} 60 ${60 + a * 1.6} ${20 + Math.abs(a) * 0.6}`} stroke={GREEN} strokeWidth={8} fill="none" strokeLinecap="round" />)}</svg>
            </Abs>
            {t > 22.9 && <Abs x={680} y={700}><Chip c={PINK} q={spring(t, 23.0)} size={28}>Juste la surface</Chip></Abs>}
          </AbsoluteFill>
        );
      })()}
      {/* éponger l'eau ou réparer la fuite + coût de l'ignorance */}
      {t > 25.1 && t < 40.4 && (() => {
        const fixed = t > 31.3;
        return (
          <AbsoluteFill style={{opacity: win(t, 25.1, 40.4, 0.35)}}>
            <Title>{t < 32.5 ? <>Éponger… ou <span style={{color: BLUE}}>réparer la fuite</span> ?</> : <>Le <span style={{color: RED}}>coût de l'ignorance</span></>}</Title>
            {t < 32.7 && (
              <AbsoluteFill style={{opacity: 1 - prog(t, 32.3, 32.7)}}>
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                  <rect x={100} y={640} width={880} height={50} rx={20} fill="#8A97A8" /><rect x={500} y={620} width={80} height={90} rx={10} fill="#6A7688" />
                  <ellipse cx={540} cy={1300} rx={260 - (t - 25) * 8 * (fixed ? 1 : 0)} ry={50} fill={BLUE} opacity={0.6} />
                </svg>
                {!fixed && Array.from({length: 4}, (_, k) => { const p = ((t * 1.4 + k * 0.25) % 1); return <div key={k} style={{position: 'absolute', left: 528, top: 710 + p * 560, width: 24, height: 34, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: BLUE}} />; })}
                {t > 28.7 && !fixed && <Abs x={600 + Math.sin(t * 6) * 80} y={1160} style={{transform: `rotate(${Math.sin(t * 6) * 15}deg)`}}><div style={{width: 20, height: 180, background: '#C9A26B', margin: '0 auto'}} /><div style={{width: 120, height: 40, borderRadius: 10, background: YEL, marginLeft: -50}} /></Abs>}
                {fixed && <Abs x={470} y={560} style={{transform: `rotate(${prog(t, 31.3, 32.0) * 180}deg) scale(${spring(t, 31.3)})`}}><F n="cle" size={140} /></Abs>}
                {fixed && <Abs x={620} y={760}><Chip c={GREEN} q={spring(t, 31.4)} size={28}>Fuite réparée</Chip></Abs>}
              </AbsoluteFill>
            )}
            {t > 32.5 && (
              <Row y={700} gap={30}>
                {[['Production', 35.7, ORA], ['Qualité', 37.14, BLUE], ['Sécurité', 39.22, RED]].map(([l, at, c]) => {
                  const d = prog(t, at as number, (at as number) + 0.8, easeIn);
                  return <div key={l as string} style={{textAlign: 'center', opacity: pop(t, 32.6)}}><div style={{width: 200, height: 500, borderRadius: 26, background: 'rgba(255,255,255,0.08)', border: `4px solid ${c}`, position: 'relative', overflow: 'hidden'}}><div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: `${85 - d * 65}%`, background: c as string}} /></div><T size={30} style={{marginTop: 12}}>{l}</T></div>;
                })}
              </Row>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* tapis roulant : le défaut revient */}
      {t > 40.2 && (() => {
        const items = 7;
        const removed = t > 58.3;
        return (
          <AbsoluteFill style={{opacity: pop(t, 40.2)}}>
            <Title>{t < 55.4 ? <>Une <span style={{color: PINK}}>chaîne d'assemblage</span></> : t < 62.3 ? <>Le réflexe : <span style={{color: DIM}}>retirer la pièce</span></> : <>Une <span style={{color: RED}}>grosse erreur</span></>}</Title>
            <Photo src="induction/operatrice.jpg" x={260} y={570} w={560} h={300} q={spring(t, 40.4)} pos="50% 30%" />
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <rect x={40} y={1150} width={1000} height={60} rx={30} fill="#2B3448" />
              {Array.from({length: 22}, (_, k) => <circle key={k} cx={60 + ((k * 48 + t * 120) % 960)} cy={1180} r={10} fill="#4A5570" />)}
            </svg>
            {Array.from({length: items}, (_, k) => {
              const x = ((k * 170 + (t - 40) * 120) % 1190) - 110;
              const bad = k === 3 || (t > 62.3 && k === 0);
              const grabbed = bad && k === 3 && removed;
              return <div key={k} style={{position: 'absolute', left: x, top: 1040 - (grabbed ? prog(t, 58.3, 59.0) * 400 : 0), width: 110, height: 110, borderRadius: 16, background: bad && t > 47.3 ? RED : '#C9D3E6', border: '5px solid #fff', opacity: grabbed ? 1 - prog(t, 59.0, 59.5) : 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{bad && t > 47.3 && <T size={60} color="#fff">✕</T>}</div>;
            })}
            {t > 47.3 && t < 55.4 && <Row y={1270}><Chip c={RED} dark={false} q={spring(t, 47.38)} size={30}>Produit défectueux : le point de départ</Chip></Row>}
            {t > 62.3 && <Row y={1270}><Chip c={RED} dark={false} q={spring(t, 62.82)} size={30}>Il revient…</Chip></Row>}
            {t > 66.1 && <Row y={1380}><Chip c={YEL} q={spring(t, 66.1)} size={30}>Aller au-delà du symptôme</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 2 : la quête de la cause ─────────── */
const P2: React.FC = () => {
  const t = useT();
  const o = win(t, 74.3, 104.9, 0.4);
  if (o <= 0) return null;
  const drill = prog(t, 85.4, 89.8, easeInOut);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 90.9 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 90.5, 90.9)}}>
          <Title>{t < 83.7 ? <>Un vrai <span style={{color: YEL}}>outil d'analyse</span></> : <>« Pourquoi ? » <span style={{color: YEL}}>encore et encore</span></>}</Title>
          {/* couches du sol */}
          <Abs x={90} y={620} w={900} h={860} style={{borderRadius: 30, overflow: 'hidden'}}>
            {LAYERS.map((c, k) => <div key={k} style={{position: 'absolute', left: 0, right: 0, top: k * 172, height: 172, background: ['#7A5A3A', '#6A4B30', '#5A3E28', '#4A3220', '#3A2718'][k], borderBottom: '3px solid rgba(0,0,0,0.25)'}}><div style={{position: 'absolute', left: 20, top: 20, width: 60, height: 60, borderRadius: 30, background: drill * 5 > k ? c : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={34} color={INK}>?</T></div></div>)}
            <div style={{position: 'absolute', left: 430, top: 0, width: 40, height: 860 * drill, background: '#1B2236'}} />
            <div style={{position: 'absolute', left: 410, top: 860 * drill - 60, width: 80, height: 90, background: '#C9D3E6', clipPath: 'polygon(0 0, 100% 0, 50% 100%)', transform: `rotate(${t * 400}deg)`, transformOrigin: '50% 40%'}} />
            {drill > 0.98 && <div style={{position: 'absolute', left: 380, top: 760, width: 140, height: 80, borderRadius: 40, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 30px ${RED}`, transform: `scale(${spring(t, 89.4)})`}}><T size={22} color="#fff">CAUSE RACINE</T></div>}
          </Abs>
          {t > 81.4 && t < 85.4 && <Abs x={560} y={680}><Chip c={YEL} q={spring(t, 81.46)} size={28}>Simplicité désarmante</Chip></Abs>}
        </AbsoluteFill>
      )}
      {t > 90.7 && (
        <AbsoluteFill style={{opacity: pop(t, 90.7)}}>
          <Title>Une <span style={{color: YEL}}>approche de fond</span></Title>
          <Abs x={110} y={620} w={380} h={380} style={{borderRadius: 30, background: 'rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 92.9)})`}}>
            <F n="pansement" size={180} /><T size={32} style={{marginTop: 10}}>Pansement rapide</T>
            {t > 93.6 && <div style={{position: 'absolute', inset: 40, borderTop: `10px solid ${RED}`, transform: 'rotate(-35deg) translateY(150px)', opacity: pop(t, 93.6)}} />}
          </Abs>
          <Abs x={590} y={620} w={380} h={380} style={{borderRadius: 30, background: 'rgba(255,210,63,0.12)', border: `4px solid ${YEL}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 94.0)})`}}>
            <F n="brique" size={180} /><T size={32} style={{marginTop: 10}}>Corriger à la source</T>
          </Abs>
          {t > 101.7 && <Row y={1100} gap={12}><Chip c={YEL} q={spring(t, 101.78)} size={30}>Processus plus solides</Chip><Chip c={GREEN} q={spring(t, 103.5)} size={30}>Plus durables</Chip></Row>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 3 : l'enquête, l'oignon et la carte qui dézoome ─────────── */
const P3: React.FC = () => {
  const t = useT();
  const o = win(t, 107.5, 183.7, 0.4);
  if (o <= 0) return null;
  const cur = [...WHYS].reverse().find((w) => t >= w.qAt);
  const peeled = WHYS.filter((w) => t >= w.aAt + 0.6).length;
  const fly = cur && t >= cur.aAt && t < cur.aAt + 0.6 ? prog(t, cur.aAt, cur.aAt + 0.6) : 0;
  const peelNow = cur && t >= cur.aAt ? WHYS.filter((w) => t >= w.aAt).length : peeled;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* intro : épluche l'oignon */}
      {t < 117.7 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 117.3, 117.7)}}>
          <Title>Retirer <span style={{color: VIO}}>une couche</span> à la fois</Title>
          <Abs x={340} y={620} style={{transform: `scale(${spring(t, 109.8)})`}}><Onion size={400} peeled={t > 114.4 ? 1 : 0} fly={prog(t, 114.4, 115.2)} /></Abs>
          {t > 114.4 && <Row y={1220}><Chip c={VIO} dark={false} q={spring(t, 114.4)} size={30}>Comme on épluche un oignon</Chip></Row>}
        </AbsoluteFill>
      )}
      {t > 117.5 && cur && (
        <AbsoluteFill style={{opacity: pop(t, 117.5)}}>
          {/* compteur + question */}
          <Abs x={60} y={450} w={960} style={{display: 'flex', alignItems: 'center', gap: 20}}>
            <div style={{width: 120, height: 120, borderRadius: 60, background: LAYERS[cur.n - 1], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: `scale(${spring(t, cur.qAt)})`}}><T size={70} color={INK}>{cur.n}</T></div>
            <T size={44} style={{opacity: pop(t, cur.qAt)}}>{cur.q}</T>
          </Abs>
          {/* oignon */}
          <Abs x={60} y={630}><Onion size={300} peeled={fly > 0 ? peelNow : peeled} fly={fly} core={peeled >= 5} /></Abs>
          {/* réponse en photo réelle */}
          {t > cur.aAt && (
            <Photo key={cur.n} src={cur.src} x={400} y={640} w={620} h={420} q={spring(t, cur.aAt)} pos={cur.pos} border={cur.n === 5 ? RED : '#fff'}>
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 20px', background: 'rgba(20,26,44,0.85)'}}><T size={38} color={cur.n === 5 ? RED : YEL}>{cur.a}</T></div>
            </Photo>
          )}
          {t < cur.aAt && <Abs x={600} y={760} style={{transform: `rotate(${Math.sin(t * 3) * 10}deg)`}}><T size={220} color="rgba(255,255,255,0.12)">?</T></Abs>}
          {/* la carte qui dézoome */}
          <Abs x={60} y={1110} w={960} h={380} style={{borderRadius: 26, background: '#1B2236', border: '3px solid rgba(255,255,255,0.12)', overflow: 'hidden'}}>
            {(() => {
              const z = 1 + (5 - Math.min(5, WHYS.filter((w) => t >= w.aAt).length)) * 0.35;
              return (
                <div style={{position: 'absolute', inset: 0, transform: `scale(${z})`, transformOrigin: '8% 50%', transition: 'none'}}>
                  <svg width={960} height={380}>
                    <path d={WHYS.map((w, k) => `${k ? 'L' : 'M'}${90 + k * 190} ${190 + (k % 2 ? -50 : 50)}`).join(' ')} stroke="rgba(255,255,255,0.25)" strokeWidth={6} strokeDasharray="14 10" fill="none" />
                    {WHYS.map((w, k) => t > w.aAt - 0.1 && k > 0 && <line key={k} x1={90 + (k - 1) * 190} y1={190 + ((k - 1) % 2 ? -50 : 50)} x2={90 + (k - 1) * 190 + 190 * prog(t, w.aAt, w.aAt + 0.8)} y2={190 + ((k - 1) % 2 ? -50 : 50) + ((k % 2 ? -50 : 50) - ((k - 1) % 2 ? -50 : 50)) * prog(t, w.aAt, w.aAt + 0.8)} stroke={LAYERS[k]} strokeWidth={8} />)}
                  </svg>
                  {WHYS.map((w, k) => t > w.aAt - 0.1 && <div key={k} style={{position: 'absolute', left: 90 + k * 190 - 70, top: 190 + (k % 2 ? -50 : 50) - 30, width: 140, textAlign: 'center', transform: `scale(${spring(t, w.aAt)})`}}><div style={{width: 40, height: 40, margin: '0 auto', borderRadius: 20, background: k === 4 ? RED : LAYERS[k], border: '4px solid #fff'}} /><T size={20} style={{marginTop: 6}}>{w.place}</T></div>)}
                </div>
              );
            })()}
          </Abs>
          {t > 135.5 && t < 141.0 && <Abs x={680} y={1060}><Chip c={ORA} q={spring(t, 137.06)} size={24}>On sort de l'usine</Chip></Abs>}
          {t > 177.7 && t < 180.3 && <Abs x={420} y={1060}><Chip c={RED} dark={false} q={spring(t, 177.74)} size={26}>La clé de voûte</Chip></Abs>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 4 : la cause racine ─────────── */
const P4: React.FC = () => {
  const t = useT();
  const o = win(t, 186.3, 211.2, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* le fil de distance symptôme → cause */}
      {t < 196.5 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 196.1, 196.5)}}>
          <Title>Pas <span style={{color: RED}}>là où le problème est apparu</span></Title>
          <Photo src="induction/operatrice.jpg" x={70} y={640} w={400} h={320} q={spring(t, 186.4)} pos="50% 25%"><div style={{position: 'absolute', left: 10, bottom: 10}}><Chip c={PINK} size={22}>Le symptôme</Chip></div></Photo>
          <Photo src="induction/technicien-hse.jpg" x={610} y={1030} w={400} h={320} q={spring(t, 187.5)} pos="50% 35%" border={RED}><div style={{position: 'absolute', left: 10, bottom: 10}}><Chip c={RED} dark={false} size={22}>La cause</Chip></div></Photo>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><path d="M470 900 C 700 900 500 1150 610 1180" stroke={YEL} strokeWidth={8} fill="none" strokeDasharray="18 12" pathLength={1} strokeDashoffset={0} opacity={pop(t, 188.0)} /></svg>
          {t > 192.8 && <Abs x={110} y={1100}><Hand size={40} color={YEL} style={{opacity: pop(t, 192.9)}}>loin, chez un partenaire</Hand></Abs>}
        </AbsoluteFill>
      )}
      {/* la cible de fléchettes */}
      {t > 196.3 && (() => {
        const dart1 = prog(t, 199.8, 200.3, easeIn);
        const dart2 = prog(t, 201.8, 202.3, easeIn);
        return (
          <AbsoluteFill style={{opacity: pop(t, 196.3)}}>
            <Title>La <span style={{color: RED}}>vraie cible</span></Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              {[340, 270, 200, 130, 60].map((r, k) => <circle key={k} cx={540} cy={1000} r={r} fill={k % 2 ? '#F4EEDF' : LAYERS[k]} stroke={INK} strokeWidth={4} />)}
              <circle cx={540} cy={1000} r={40} fill={RED} />
            </svg>
            <Abs x={180} y={720}><T size={28} color={INK} style={{background: PAPER, padding: '4px 12px', borderRadius: 10}}>Pièce manquante</T></Abs>
            <Abs x={420} y={1080}><T size={28} color="#fff" style={{background: RED, padding: '4px 12px', borderRadius: 10}}>Panne machine</T></Abs>
            {dart1 > 0 && <Abs x={240 + (1 - dart1) * -400} y={760 + (1 - dart1) * -300} style={{transform: 'rotate(-30deg)', opacity: t > 201.0 ? 0.35 : 1}}><div style={{width: 130, height: 12, background: '#555', borderRadius: 6, position: 'relative'}}><div style={{position: 'absolute', right: -6, top: -14, width: 40, height: 40, background: BLUE, clipPath: 'polygon(0 50%, 100% 0, 100% 100%)'}} /></div></Abs>}
            {dart2 > 0 && <Abs x={420 + (1 - dart2) * 500} y={980 + (1 - dart2) * -500} style={{transform: 'rotate(40deg)'}}><div style={{width: 130, height: 12, background: '#555', borderRadius: 6, position: 'relative'}}><div style={{position: 'absolute', right: -6, top: -14, width: 40, height: 40, background: YEL, clipPath: 'polygon(0 50%, 100% 0, 100% 100%)'}} /></div></Abs>}
            {t > 205.3 && <Row y={1400}><Chip c={RED} dark={false} q={spring(t, 206.78)} size={30}>L'action corrective porte ici</Chip></Row>}
            {t > 209.8 && <Row y={1500}><Chip c={GREEN} q={spring(t, 209.9)} size={28}>Plus jamais ça</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 5 : pompier ou prévention ─────────── */
const P5: React.FC = () => {
  const t = useT();
  if (t < 213.7) return null;
  const o = pop(t, 213.8, 0.5);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 229.9 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 229.5, 229.9)}}>
          <Title>Le <span style={{color: RED}}>pompier</span> ou la <span style={{color: GREEN}}>prévention</span></Title>
          {/* gauche : feux qui se rallument */}
          <Abs x={40} y={590} w={490} h={860} style={{borderRadius: 30, overflow: 'hidden', background: '#2A1418', border: `5px solid ${RED}`}}>
            <Img src={PH('epiepc/extincteur.jpg')} style={{position: 'absolute', left: 60, top: 120, width: 370, height: 420, objectFit: 'cover', borderRadius: 20}} />
            {Array.from({length: 3}, (_, k) => { const ph = ((t - 214) * 0.7 + k * 0.33) % 1; return t > 214.5 && <div key={k} style={{position: 'absolute', left: 60 + k * 140, top: 600, transform: `scale(${Math.sin(ph * Math.PI)})`}}><F n="feu" size={110} /></div>; })}
            <div style={{position: 'absolute', left: 0, right: 0, top: 24, textAlign: 'center'}}><T size={40} color={RED}>SYMPTÔME</T></div>
            {t > 217.5 && <div style={{position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center'}}><Hand size={36} color={LIGHT}>« ça recommencera »</Hand></div>}
          </Abs>
          {/* droite : prévention */}
          <Abs x={550} y={590} w={490} h={860} style={{borderRadius: 30, overflow: 'hidden', background: '#10291E', border: `5px solid ${GREEN}`, opacity: pop(t, 220.8)}}>
            <Img src={PH('induction/technicien-hse.jpg')} style={{position: 'absolute', left: 60, top: 120, width: 370, height: 420, objectFit: 'cover', objectPosition: '50% 35%', borderRadius: 20}} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 24, textAlign: 'center'}}><T size={40} color={GREEN}>CAUSE RACINE</T></div>
            {t > 224.5 && <div style={{position: 'absolute', left: 145, top: 600, transform: `scale(${spring(t, 224.5)})`}}><F n="bouclier" size={200} /></div>}
          </Abs>
          {t > 226.6 && <Row y={1480} gap={12}><Chip c={RED} dark={false} q={spring(t, 227.54)} size={28}>Pompier</Chip><T size={40}>→</T><Chip c={GREEN} q={spring(t, 228.78)} size={28}>Prévention</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* le profondimètre du plongeur */}
      {t > 229.7 && (() => {
        const depth = t < 237.2 ? 0 : t < 238.0 ? 1 : t < 240.9 ? 2 : 2 + prog(t, 240.9, 244.4, easeInOut) * 3;
        return (
          <AbsoluteFill style={{opacity: pop(t, 229.7)}}>
            <Title>À <span style={{color: YEL}}>quel pourquoi</span> vous arrêtez-vous ?</Title>
            <Abs x={90} y={600} w={900} h={880} style={{borderRadius: 30, overflow: 'hidden', background: 'linear-gradient(180deg, #4DB6E8, #1A5E8C 40%, #071A30)'}}>
              {[1, 2, 3, 4, 5].map((k) => <div key={k} style={{position: 'absolute', left: 0, right: 0, top: 80 + k * 150, borderTop: '3px dashed rgba(255,255,255,0.35)'}}><div style={{position: 'absolute', left: 20, top: -26, padding: '4px 14px', borderRadius: 14, background: depth >= k - 0.05 ? LAYERS[k - 1] : 'rgba(255,255,255,0.2)'}}><T size={24} color={INK}>Pourquoi n°{k}</T></div></div>)}
              <div style={{position: 'absolute', left: 520, top: 80 + depth * 150 - 70, transform: `rotate(${10 + Math.sin(t * 2) * 6}deg)`}}>
                <svg width={180} height={120} viewBox="0 0 180 120"><ellipse cx={90} cy={60} rx={70} ry={26} fill="#111" /><circle cx={30} cy={50} r={22} fill="#111" /><rect x={18} y={40} width={26} height={16} rx={6} fill={YEL} /><path d="M150 60 L180 40 L180 80 Z" fill={YEL} /></svg>
              </div>
              {Array.from({length: 6}, (_, k) => { const p = ((t * 0.6 + k * 0.17) % 1); return <div key={k} style={{position: 'absolute', left: 560 + Math.sin(k + t) * 20, top: 80 + depth * 150 - 60 - p * 300, width: 16, height: 16, borderRadius: 8, border: '3px solid rgba(255,255,255,0.6)', opacity: 1 - p}} />; })}
              {depth >= 4.9 && <div style={{position: 'absolute', left: 300, top: 800, padding: '10px 26px', borderRadius: 30, background: RED, boxShadow: `0 0 30px ${RED}`, transform: `scale(${spring(t, 244.4)})`}}><T size={30} color="#fff">La vérité</T></div>}
            </Abs>
            {t > 240.9 && t < 243.4 && <Abs x={110} y={640}><Chip c={LIGHT} q={spring(t, 240.9)} size={26}>Jamais la première réponse</Chip></Abs>}
            {t > 244.4 && <Row y={1500} gap={12}><Chip c={YEL} q={spring(t, 244.42)} size={28}>Curiosité</Chip><Chip c={GREEN} q={spring(t, 245.0)} size={28}>Rigueur</Chip></Row>}
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
      {t > 2.5 && t < 12.0 && <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', opacity: pop(t, 2.5) * (1 - prog(t, 11.6, 12.0))}}><div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '8px 24px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${YEL}`}}><T size={34}>La méthode des <span style={{color: YEL}}>5 Pourquoi</span></T></div></div>}
      {p && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 236, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: pop(t, p.at + WIPE - 0.3) * (1 - prog(t, p.end - 0.3, p.end))}}>
          <div style={{display: 'flex', gap: 4}}>{LAYERS.map((c, k) => <div key={k} style={{width: 16, height: 16, borderRadius: 8, background: k < p.n ? c : 'rgba(255,255,255,0.15)'}} />)}</div>
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
      {Array.from({length: 12}, (_, k) => {
        const y = 1920 - (((t * (0.015 + random(`qy${k}`) * 0.02) + random(`q0${k}`)) % 1) * 2100);
        return <div key={k} style={{position: 'absolute', left: random(`qx${k}`) * 1000, top: y, fontFamily: sansFont, fontWeight: 900, fontSize: 80 + (k % 3) * 40, color: 'rgba(255,255,255,0.04)', transform: `rotate(${Math.sin(t * 0.5 + k) * 20}deg)`}}>?</div>;
      })}
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 30%, rgba(155,123,255,0.12), transparent 60%)'}} />
    </AbsoluteFill>
  );
};

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2}, {at: 2.9, s: 'sfx/pop', v: 0.3},
  {at: 8.2, s: 'sfx/pop', v: 0.25}, ...[10.42, 10.54, 10.66, 10.78, 10.9].map((at) => ({at, s: 'sfx/click', v: 0.25})),
  ...PT.flatMap((p) => [{at: p.at, s: 'sfx/rise', v: 0.3}, {at: p.at + 0.95, s: 'sfx/whoosh', v: 0.45}, {at: p.at + 1.0, s: 'bass-hit', v: 0.35}, {at: p.at + WIPE - 0.45, s: 'soft-whoosh', v: 0.35, dur: 1}]),
  ...Array.from({length: 6}, (_, k) => ({at: 19.2 + k * 0.2, s: 'tick', v: 0.18})), {at: 20.9, s: 'deep-hit', v: 0.3}, {at: 22.9, s: 'sfx/swish', v: 0.4},
  ...Array.from({length: 8}, (_, k) => ({at: 25.5 + k * 0.7, s: 'sfx/click', v: 0.15})), {at: 31.3, s: 'cadenas', v: 0.4}, {at: 31.4, s: 'validation', v: 0.3},
  ...[35.7, 37.14, 39.22].map((at) => ({at, s: 'sfx/thud', v: 0.35})),
  {at: 40.4, s: 'sfx/whoosh', v: 0.3}, {at: 47.38, s: 'alarme', v: 0.15, dur: 1}, {at: 58.3, s: 'sfx/swish', v: 0.35}, {at: 62.82, s: 'deep-hit', v: 0.35}, {at: 66.1, s: 'sfx/ding', v: 0.3},
  {at: 81.46, s: 'sfx/pop', v: 0.25}, {at: 85.4, s: 'tension', v: 0.2, dur: 4.4}, ...Array.from({length: 5}, (_, k) => ({at: 85.6 + k * 0.88, s: 'sfx/thud', v: 0.3})), {at: 89.4, s: 'sfx/bell', v: 0.35},
  {at: 92.9, s: 'sfx/pop', v: 0.28}, {at: 93.6, s: 'stylo', v: 0.35}, {at: 94.0, s: 'sfx/pop', v: 0.28}, {at: 101.78, s: 'sfx/ding', v: 0.28}, {at: 103.5, s: 'sfx/ding', v: 0.28},
  {at: 109.8, s: 'sfx/pop', v: 0.3}, {at: 114.4, s: 'sfx/swish', v: 0.4},
  ...WHYS.flatMap((w) => [{at: w.qAt, s: 'sfx/click', v: 0.4}, {at: w.qAt + 0.1, s: 'tension', v: 0.12, dur: 1.5}, {at: w.aAt, s: 'sfx/swish', v: 0.4}, {at: w.aAt + 0.1, s: 'sfx/thud', v: 0.35}, {at: w.aAt + 0.8, s: 'sfx/ding', v: 0.22}]),
  {at: 180.3, s: 'deep-hit', v: 0.45}, {at: 181.0, s: 'sfx/bell', v: 0.35},
  {at: 186.4, s: 'sfx/whoosh', v: 0.3}, {at: 188.0, s: 'sfx/rise', v: 0.25}, {at: 196.4, s: 'sfx/whoosh', v: 0.3}, {at: 200.3, s: 'sfx/thud', v: 0.35}, {at: 202.3, s: 'tampon', v: 0.55}, {at: 202.35, s: 'validation', v: 0.32}, {at: 206.78, s: 'sfx/pop', v: 0.25}, {at: 209.9, s: 'sfx/ding', v: 0.3},
  {at: 214.5, s: 'alarme', v: 0.12, dur: 2}, {at: 220.8, s: 'sfx/whoosh', v: 0.3}, {at: 224.5, s: 'validation', v: 0.32}, {at: 227.54, s: 'sfx/pop', v: 0.25}, {at: 228.78, s: 'sfx/pop', v: 0.25},
  {at: 229.8, s: 'sfx/whoosh', v: 0.3}, {at: 237.2, s: 'sfx/swish', v: 0.25}, {at: 238.0, s: 'sfx/swish', v: 0.25}, {at: 240.9, s: 'soft-whoosh', v: 0.35, dur: 3.5}, {at: 244.4, s: 'sfx/bell', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const CinqPourquoi: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <Bg />
    <Gate from={0} to={12.1}><Hook /></Gate>
    <Gate from={14.3} to={71.9}><P1 /></Gate>
    <Gate from={74.2} to={105.1}><P2 /></Gate>
    <Gate from={107.4} to={183.9}><P3 /></Gate>
    <Gate from={186.2} to={211.4}><P4 /></Gate>
    <Gate from={213.6} to={OUTRO_AT}><P5 /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><QWipe p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.3} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-cinq-pourquoi-origine.m4a')} trimAfter={s(247.8)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

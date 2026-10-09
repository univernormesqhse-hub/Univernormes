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
 * « EPI vs EPC : le guide sécurité » (4 min 25) — voix d'origine, sous-titres recalés mot à mot, illustrations par
 * images réelles (EPI et EPC détourés ou en photo, marques floutées). Techniques nouvelles : couverture en duel
 * scindé, ouverture de chapitre par fermeture éclair, bascule « de l'autre côté du miroir », habillage d'une
 * opératrice réelle par ses EPI (repères pointés), projecteur sur une seule personne protégée dans la foule, capot
 * qui enferme la source du danger, aspiration de particules, filet qui rattrape les silhouettes, ring de boxe et
 * tableau des rounds, lingot d'or gravé, podium, cartes Plan A / B / C, parapluie collectif contre parapluies
 * individuels.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 265.4;
export const EPIEPCGUIDE_FRAMES = s(OUTRO_AT + 3.8);
const BG = '#FFF7EE';
const INK = '#1B1F2A';
const DIM = 'rgba(27,31,42,0.6)';
const EPI = '#FF7A00';
const EPC = '#1E6BFF';
const GOLD = '#E8B21E';
const RED = '#E5383B';
const P = (n: string) => staticFile(`epiepc/${n}`);

type Ch = {n: number; l: string; at: number; end: number; c: string};
const CH: Ch[] = [
  {n: 1, l: "L'EPI · protection individuelle", at: 33.5, end: 87.6, c: EPI},
  {n: 2, l: "L'EPC · protection collective", at: 87.7, end: 141.5, c: EPC},
  {n: 3, l: 'EPI vs EPC · le face-à-face', at: 141.7, end: 195.0, c: '#7B2CBF'},
  {n: 4, l: "La règle d'or", at: 195.2, end: 242.3, c: GOLD},
];
const ZIP = 2.7;

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
const Abs: React.FC<{x: number; y: number; w?: number; h?: number; children?: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, ...style}}>{children}</div>
);
const Chip: React.FC<{children: React.ReactNode; c?: string; q?: number; size?: number; style?: React.CSSProperties}> = ({children, c = EPI, q = 1, size = 36, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, padding: '13px 26px', borderRadius: 50, background: c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size, transform: `scale(${q})`, boxShadow: `0 12px 30px ${c}55`, whiteSpace: 'nowrap', ...style}}>{children}</div>
);
const Row: React.FC<{y: number; children: React.ReactNode; gap?: number}> = ({y, children, gap = 16}) => (
  <Abs x={0} y={y} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap, flexWrap: 'wrap', padding: '0 40px', boxSizing: 'border-box'}}>{children}</Abs>
);
/** Photo réelle en carte (coins arrondis, ombre, léger Ken Burns). */
const Photo: React.FC<{src: string; x: number; y: number; w: number; h: number; t0?: number; style?: React.CSSProperties; children?: React.ReactNode; pos?: string}> = ({src, x, y, w, h, t0 = 0, style, children, pos = 'center'}) => {
  const t = useT();
  return (
    <Abs x={x} y={y} w={w} h={h} style={{borderRadius: 30, overflow: 'hidden', boxShadow: '0 26px 60px rgba(27,31,42,0.25)', border: '6px solid #fff', background: '#fff', ...style}}>
      <Img src={src} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${1.05 + Math.max(0, t - t0) * 0.012})`}} />
      {children}
    </Abs>
  );
};
/** Objet réel détouré. */
const Cut: React.FC<{src: string; x: number; y: number; w: number; style?: React.CSSProperties}> = ({src, x, y, w, style}) => (
  <Img src={src} style={{position: 'absolute', left: x, top: y, width: w, filter: 'drop-shadow(0 18px 24px rgba(27,31,42,0.28))', ...style}} />
);

/* ─────────── Couverture : duel scindé ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.1, 2.8, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: INK, opacity: 1 - out}}>
      <div style={{position: 'absolute', inset: 0, clipPath: 'polygon(0 0, 58% 0, 42% 100%, 0 100%)'}}>
        <Img src={staticFile('epiepc/technicienne.jpg')} style={{position: 'absolute', left: -600, top: 60, height: 1920, width: 1784, objectFit: 'cover'}} />
        <AbsoluteFill style={{background: `linear-gradient(180deg, ${EPI}55, ${EPI}22 40%, rgba(0,0,0,0.6))`}} />
      </div>
      <div style={{position: 'absolute', inset: 0, clipPath: 'polygon(58% 0, 100% 0, 100% 100%, 42% 100%)'}}>
        <Img src={P('echafaudage.jpg')} style={{position: 'absolute', left: 300, top: 0, height: 1920, width: 1280, objectFit: 'cover'}} />
        <AbsoluteFill style={{background: `linear-gradient(180deg, ${EPC}66, ${EPC}22 40%, rgba(0,0,0,0.6))`}} />
      </div>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><line x1={626} y1={0} x2={454} y2={1920} stroke="#fff" strokeWidth={14} /></svg>
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={60} y={360} style={{transform: 'rotate(-4deg)'}}><Chip c={EPI} size={54}>EPI</Chip><Hand size={40} color="#fff" style={{marginTop: 8, textShadow: '0 2px 10px #000'}}>individuelle</Hand></Abs>
      <Abs x={760} y={420} style={{transform: 'rotate(4deg)', textAlign: 'right'}}><Chip c={EPC} size={54}>EPC</Chip><Hand size={40} color="#fff" style={{marginTop: 8, textShadow: '0 2px 10px #000'}}>collective</Hand></Abs>
      <Abs x={440} y={820} w={200} h={200} style={{borderRadius: 100, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', transform: `scale(${1 + 0.04 * Math.sin(t * 4)})`}}><T size={92} color={INK}>VS</T></Abs>
      <Abs x={0} y={1280} w={1080} h={640} style={{background: 'linear-gradient(180deg, transparent, rgba(27,31,42,0.92) 30%, rgba(27,31,42,0.98))'}} />
      <Abs x={60} y={1400} w={960} style={{textAlign: 'center'}}>
        <T size={140} color="#fff" style={{letterSpacing: -3}}>EPI <span style={{color: '#FFFFFF88', fontSize: 90}}>vs</span> EPC</T>
        <T size={64} color={GOLD} style={{marginTop: 6, textTransform: 'uppercase'}}>Le guide sécurité</T>
        <Hand size={46} color="#ffffffcc" style={{marginTop: 14}}>Comment choisir la bonne protection ?</Hand>
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Fermeture éclair (ouverture de chapitre) ─────────── */
const ZipCard: React.FC<{ch: Ch}> = ({ch}) => {
  const t = useT();
  const a = ch.at, b = ch.at + ZIP;
  if (t < a || t > b) return null;
  const close = prog(t, a, a + 0.5, easeOut);
  const unzip = prog(t, b - 0.9, b - 0.1, easeInOut);
  const y = unzip * 2000;
  const gap = (yy: number) => (yy < y ? Math.min(560, (y - yy) * 0.6) : 0);
  const half = (side: number) => (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <path d={`M${side < 0 ? 0 : 1080} 0 ${Array.from({length: 41}, (_, k) => { const yy = k * 48; return `L${540 + side * (gap(yy) + 0)} ${yy}`; }).join(' ')} L${side < 0 ? 0 : 1080} 1920 Z`} fill={ch.c} />
      {Array.from({length: 80}, (_, k) => { const yy = k * 24 + 6; const g = gap(yy); return <rect key={k} x={540 + side * g + (side < 0 ? -18 : 0) + ((k % 2) * (side < 0 ? 8 : -8))} y={yy} width={18} height={14} rx={3} fill="#D7DCE3" />; })}
    </svg>
  );
  return (
    <AbsoluteFill style={{zIndex: 55, transform: `translateY(${(1 - close) * -1920}px)`}}>
      {half(-1)}
      {half(1)}
      <Abs x={540 - 50} y={y - 60} w={100} h={140} style={{borderRadius: 20, background: 'linear-gradient(180deg, #F2F4F7, #B8C0CC)', border: '4px solid #8B95A5', boxShadow: '0 10px 30px rgba(0,0,0,0.35)'}}><div style={{position: 'absolute', left: 30, top: 70, width: 40, height: 50, borderRadius: 12, border: '8px solid #8B95A5'}} /></Abs>
      <Abs x={90} y={560} w={900} style={{textAlign: 'center', opacity: 1 - unzip * 2, background: 'rgba(0,0,0,0.28)', borderRadius: 40, padding: '30px 20px', boxSizing: 'border-box', backdropFilter: 'blur(4px)'}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 320, color: '#fff', lineHeight: 1, opacity: 0.95}}>{ch.n}</div>
        <div style={{display: 'inline-block', padding: '8px 24px', borderRadius: 40, background: 'rgba(0,0,0,0.25)', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: '#fff', letterSpacing: 2}}>CHAPITRE {ch.n}/4</div>
        <T size={84} color="#fff" style={{marginTop: 20}}>{ch.l}</T>
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Introduction ─────────── */
const Intro: React.FC = () => {
  const t = useT();
  const o = 1 - prog(t, 33.2, 33.6);
  if (o <= 0) return null;
  const cap = prog(t, 29.4, 30.6, easeOut);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 19.8 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 19.4, 19.8)}}>
          <Abs x={0} y={500} w={1080} style={{textAlign: 'center'}}><Hand size={50} color={DIM}>Deux sigles qu'on entend partout</Hand></Abs>
          <Row y={600} gap={40}>
            <div style={{textAlign: 'center', transform: `translateX(${(1 - spring(t, 9.2)) * -600}px)`}}>
              <div style={{position: 'relative', width: 400, height: 400, borderRadius: 40, background: '#FFE8D1', border: `6px solid ${EPI}`}}><Cut src={P('casque-d.png')} x={60} y={60} w={280} /></div>
              <T size={110} color={EPI} style={{marginTop: 12}}>EPI</T>
              <T size={30} color={DIM} style={{opacity: pop(t, 11.0)}}>Équipement de protection</T><T size={34} color={EPI} style={{opacity: pop(t, 12.0)}}>INDIVIDUELLE</T>
            </div>
            <div style={{textAlign: 'center', transform: `translateX(${(1 - spring(t, 9.6)) * 600}px)`}}>
              <div style={{position: 'relative', width: 400, height: 400, borderRadius: 40, overflow: 'hidden', border: `6px solid ${EPC}`}}><Img src={P('garde-corps.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
              <T size={110} color={EPC} style={{marginTop: 12}}>EPC</T>
              <T size={30} color={DIM} style={{opacity: pop(t, 12.4)}}>Équipement de protection</T><T size={34} color={EPC} style={{opacity: pop(t, 13.4)}}>COLLECTIVE</T>
            </div>
          </Row>
        </AbsoluteFill>
      )}
      {t > 19.6 && (
        <AbsoluteFill style={{opacity: pop(t, 19.6)}}>
          <Abs x={0} y={500} w={1080} style={{textAlign: 'center'}}><T size={64} style={{transform: `scale(${spring(t, 23.5)})`}}>Face à un danger, quel <span style={{color: EPI}}>bon choix</span> ?</T></Abs>
          {/* option 1 : casque + gants pour tous */}
          <Abs x={70} y={720} w={440} h={620} style={{borderRadius: 34, background: '#fff', boxShadow: '0 20px 50px rgba(27,31,42,0.12)', border: `5px solid ${EPI}`, transform: `scale(${spring(t, 25.1)})`}}>
            <Cut src={P('casque-d.png')} x={90} y={40} w={260} style={{transform: `translateY(${(1 - spring(t, 25.2)) * -400}px)`}} />
            <Cut src={P('gants-d.png')} x={120} y={270} w={200} style={{transform: `translateY(${(1 - spring(t, 26.1)) * -500}px)`}} />
            <Abs x={20} y={540} w={400} style={{textAlign: 'center'}}><T size={30}>Un casque et des gants pour tous ?</T></Abs>
          </Abs>
          {/* option 2 : éliminer le danger à la source */}
          <Abs x={570} y={720} w={440} h={620} style={{borderRadius: 34, background: '#fff', boxShadow: '0 20px 50px rgba(27,31,42,0.12)', border: `5px solid ${EPC}`, transform: `scale(${spring(t, 27.4)})`}}>
            <div style={{position: 'absolute', left: 120, top: 120, transform: `scale(${1 - cap * 0.3})`}}><F n="danger" size={200} /></div>
            {Array.from({length: 8}, (_, k) => { const a = (k / 8) * Math.PI * 2; const r = 150 + ((t * 80) % 60); return <div key={k} style={{position: 'absolute', left: 220 + Math.cos(a) * r - 6, top: 220 + Math.sin(a) * r - 20, width: 12, height: 40, borderRadius: 6, background: RED, transform: `rotate(${(a * 180) / Math.PI + 90}deg)`, opacity: 1 - cap}} />; })}
            {/* capot qui enferme la source */}
            <div style={{position: 'absolute', left: 70, top: 70 + (1 - cap) * -600, width: 300, height: 300, borderRadius: 30, border: `10px solid ${EPC}`, background: `${EPC}22`, opacity: cap > 0 ? 1 : 0}} />
            <Abs x={20} y={540} w={400} style={{textAlign: 'center'}}><T size={30}>Éliminer le danger à la source ?</T></Abs>
          </Abs>
          {t > 31.0 && <Row y={1420}><Hand size={50} style={{opacity: pop(t, 31.0)}}>On décortique tout ça ensemble</Hand></Row>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Chapitre 1 : l'EPI ─────────── */
// photo de l'opératrice : 736 × 792, affichée à l'échelle K
const K = 0.98;
const PX = 540 - (736 * K) / 2, PY = 640;
const pt = (x: number, y: number): [number, number] => [PX + x * K, PY + y * K];
const ITEMS: [string, string, number, number, number, number, number, 'L' | 'R'][] = [
  // nom, image, t, cible x, y (photo), position x, y (écran)
  ['Casque de chantier', 'casque-d.png', 62.4, 390, 110, 40, 560, 'L'],
  ['Lunettes', 'icon:lunettes', 64.5, 390, 250, 820, 600, 'R'],
  ['Gants', 'gants-d.png', 66.0, 330, 640, 30, 1150, 'L'],
  ['Chaussures', 'icon:chaussure', 67.0, 450, 780, 830, 1300, 'R'],
  ['Masque respiratoire', 'kit-epi2-d.png', 68.1, 390, 330, 30, 830, 'L'],
  ['Bouchons d’oreille', 'bouchons-d.png', 69.5, 470, 270, 820, 860, 'R'],
  ['Harnais', 'harnais-d.png', 70.5, 390, 520, 820, 1080, 'R'],
];
const C1: React.FC = () => {
  const t = useT();
  const o = win(t, 36.0, 87.6, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* définition : porté ou tenu, bouclier personnel */}
      {t < 58.6 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 58.2, 58.6)}}>
          <Abs x={60} y={480} w={960} style={{textAlign: 'center'}}><T size={52}>Un dispositif qu'on <span style={{color: EPI}}>porte</span> ou qu'on <span style={{color: EPI}}>tient</span></T></Abs>
          <Photo src={staticFile('epiepc/technicienne.jpg')} x={190} y={620} w={700} h={760} t0={36} />
          {/* bulle-bouclier personnelle */}
          {t > 53.4 && <Abs x={140} y={570} w={800} h={860} style={{borderRadius: '50%', border: `10px solid ${EPI}`, background: `radial-gradient(circle, transparent 55%, ${EPI}33)`, transform: `scale(${spring(t, 53.5, 6, 12)})`, boxShadow: `0 0 60px ${EPI}88`}} />}
          {t > 53.4 && <Row y={1440}><Chip c={EPI} q={spring(t, 53.6)}><F n="bouclier" size={44} />Un bouclier personnel</Chip></Row>}
          {t > 46.8 && t < 53.4 && <Row y={1440}><Chip c={INK} q={spring(t, 46.9)}>Porté</Chip><Chip c={INK} q={spring(t, 47.6)}>Tenu</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* habillage de l'opératrice par ses EPI réels */}
      {t > 58.4 && t < 75.4 && (
        <AbsoluteFill style={{opacity: win(t, 58.4, 75.4, 0.4)}}>
          <Abs x={60} y={480} w={960} style={{textAlign: 'center'}}><T size={54}>Les EPI, de la tête aux pieds</T></Abs>
          <Photo src={staticFile('epiepc/technicienne.jpg')} x={PX} y={PY} w={736 * K} h={792 * K} t0={58} style={{border: 'none', borderRadius: 40}} />
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            {ITEMS.map(([n, , at, tx, ty, sx, sy, side]) => {
              if (t < at) return null;
              const [x, y] = pt(tx, ty);
              const q = prog(t, at + 0.2, at + 0.6);
              const ex = side === 'L' ? sx + 230 : sx;
              return <g key={n}><circle cx={x} cy={y} r={12 + 4 * Math.sin(t * 5)} fill={EPI} stroke="#fff" strokeWidth={4} /><line x1={x} y1={y} x2={x + (ex - x) * q} y2={y + (sy + 80 - y) * q} stroke={EPI} strokeWidth={5} strokeDasharray="10 8" /></g>;
            })}
          </svg>
          {ITEMS.map(([n, img, at, , , sx, sy]) => {
            if (t < at) return null;
            const q = spring(t, at, 7, 14);
            return (
              <Abs key={n} x={sx} y={sy} w={230} style={{transform: `scale(${q})`, textAlign: 'center'}}>
                <div style={{width: 200, height: 150, margin: '0 auto', borderRadius: 24, background: '#fff', boxShadow: '0 14px 30px rgba(27,31,42,0.2)', border: `4px solid ${EPI}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
                  {img.startsWith('icon:') ? <F n={img.slice(5)} size={110} /> : <Img src={P(img)} style={{maxWidth: 180, maxHeight: 130, objectFit: 'contain'}} />}
                </div>
                <div style={{marginTop: 6, padding: '4px 10px', borderRadius: 12, background: EPI, display: 'inline-block', fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: '#fff'}}>{n}</div>
              </Abs>
            );
          })}
          {t > 72.4 && <Row y={1470}><Hand size={46} style={{opacity: pop(t, 72.4)}}>chaque EPI répond à un risque précis</Hand></Row>}
        </AbsoluteFill>
      )}
      {/* projecteur : protection solitaire */}
      {t > 75.2 && (
        <AbsoluteFill style={{opacity: pop(t, 75.2)}}>
          <AbsoluteFill style={{background: '#14161D', opacity: prog(t, 75.4, 76.4) * 0.92}} />
          <Abs x={60} y={480} w={960} style={{textAlign: 'center'}}><T size={56} color="#fff">Une protection <span style={{color: EPI}}>solitaire</span></T></Abs>
          {/* cône de lumière */}
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <defs><linearGradient id="spot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFF4D6" stopOpacity={0.7} /><stop offset="1" stopColor="#FFF4D6" stopOpacity={0.05} /></linearGradient></defs>
            <path d={`M480 560 L600 560 L${740} 1500 L${340} 1500 Z`} fill="url(#spot)" opacity={prog(t, 76.0, 77.0)} />
          </svg>
          {Array.from({length: 9}, (_, k) => {
            const me = k === 4;
            const x = 60 + k * 110;
            return <div key={k} style={{position: 'absolute', left: x, top: 1080 + (k % 2) * 40, opacity: me ? 1 : 0.35, filter: me ? 'none' : 'brightness(0.3)', transform: `scale(${me ? 1.35 : 1})`, transformOrigin: '50% 100%'}}><F n={me ? 'ouvrier-dark' : 'salarie'} size={120} /></div>;
          })}
          {t > 80.9 && <Abs x={460} y={1000} w={160} h={260} style={{borderRadius: '50%', border: `6px solid ${EPI}`, boxShadow: `0 0 40px ${EPI}`, transform: `scale(${spring(t, 81.0)})`}} />}
          {t > 80.9 && <Row y={1430}><Chip c={EPI} q={spring(t, 81.0)}>Protège uniquement la personne qui le porte</Chip></Row>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Bascule « de l'autre côté du miroir » ─────────── */
const Mirror: React.FC = () => {
  const t = useT();
  const a = 87.7;
  if (t < a - 0.1 || t > a + 3.0) return null;
  const flip = prog(t, a, a + 1.0, easeInOut);
  const out = prog(t, a + 2.5, a + 3.0);
  return (
    <AbsoluteFill style={{zIndex: 55, perspective: 2400, opacity: 1 - out}}>
      <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `rotateY(${flip * 180}deg)`}}>
        <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', background: `linear-gradient(135deg, ${EPI}, #FFB066)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={240} color="#fff">EPI</T></div>
        <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: `linear-gradient(135deg, ${EPC}, #6FA2FF)`}}>
          <AbsoluteFill style={{background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.35) 45%, transparent 55%)', transform: `translateX(${(t - a - 1) * 600 - 600}px)`}} />
          <Abs x={60} y={600} w={960} style={{textAlign: 'center'}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 320, color: '#fff', lineHeight: 1}}>2</div>
            <div style={{display: 'inline-block', padding: '8px 24px', borderRadius: 40, background: 'rgba(0,0,0,0.2)', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: '#fff', letterSpacing: 2}}>DE L'AUTRE CÔTÉ DU MIROIR</div>
            <T size={84} color="#fff" style={{marginTop: 20}}>L'EPC · protection collective</T>
          </Abs>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ─────────── Chapitre 2 : l'EPC ─────────── */
const C2: React.FC = () => {
  const t = useT();
  const o = win(t, 90.6, 141.5, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* deux idées clés */}
      {t < 114.4 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 114.0, 114.4)}}>
          <Abs x={60} y={480} w={960} style={{textAlign: 'center'}}><T size={54} style={{transform: `scale(${spring(t, 95.4)})`}}>Changement de <span style={{color: EPC}}>philosophie</span></T></Abs>
          {/* 1 : plusieurs personnes sous un dôme */}
          <Abs x={60} y={620} w={460} h={720} style={{borderRadius: 34, background: '#fff', border: `5px solid ${EPC}`, boxShadow: '0 20px 50px rgba(27,31,42,0.12)', transform: `scale(${spring(t, 100.9)})`, overflow: 'hidden'}}>
            <T size={30} color={EPC} style={{margin: 24}}>IDÉE 1</T>
            <div style={{position: 'absolute', left: 30, right: 30, top: 160, height: 300, borderRadius: '200px 200px 0 0', border: `8px solid ${EPC}`, borderBottom: 'none', background: `${EPC}14`, transform: `scaleY(${spring(t, 102.7)})`, transformOrigin: '50% 100%'}} />
            <div style={{position: 'absolute', left: 50, right: 50, top: 330, display: 'flex', justifyContent: 'space-around'}}>{['ouvrier-dark', 'salariee', 'ouvrier', 'salarie'].map((n, k) => <div key={k} style={{transform: `translateY(${(1 - spring(t, 101.2 + k * 0.2)) * 300}px)`}}><F n={n} size={86} /></div>)}</div>
            <Abs x={20} y={520} w={420} style={{textAlign: 'center'}}><T size={36}>Plusieurs personnes en même temps</T></Abs>
          </Abs>
          {/* 2 : à la source */}
          {(() => {
            const cap = prog(t, 111.8, 112.9, easeOut);
            return (
              <Abs x={560} y={620} w={460} h={720} style={{borderRadius: 34, background: '#fff', border: `5px solid ${RED}`, boxShadow: '0 20px 50px rgba(27,31,42,0.12)', transform: `scale(${spring(t, 106.0)})`, overflow: 'hidden'}}>
                <T size={30} color={RED} style={{margin: 24}}>IDÉE 2</T>
                <div style={{position: 'absolute', left: 130, top: 200, transform: `scale(${1 - cap * 0.25})`}}><F n="radioactif" size={200} /></div>
                {Array.from({length: 10}, (_, k) => { const a = (k / 10) * Math.PI * 2; const r = 130 + ((t * 90 + k * 13) % 70); return <div key={k} style={{position: 'absolute', left: 230 + Math.cos(a) * r - 5, top: 300 + Math.sin(a) * r - 18, width: 10, height: 36, borderRadius: 5, background: RED, transform: `rotate(${(a * 180) / Math.PI + 90}deg)`, opacity: 1 - cap}} />; })}
                <div style={{position: 'absolute', left: 100, top: 160 + (1 - cap) * -500, width: 260, height: 280, borderRadius: 26, border: `10px solid ${EPC}`, background: `repeating-linear-gradient(45deg, ${EPC}22 0 14px, transparent 14px 28px)`, opacity: cap > 0 ? 1 : 0}} />
                <Abs x={20} y={520} w={420} style={{textAlign: 'center'}}><T size={36}>Agir sur la source du risque</T>{t > 111.8 && <Hand size={34} color={EPC}>neutraliser le danger</Hand>}</Abs>
              </Abs>
            );
          })()}
        </AbsoluteFill>
      )}
      {/* exemples réels : garde-corps, ventilation, intégré */}
      {t > 114.2 && t < 133.2 && (() => {
        const ex = t < 120.4 ? 0 : t < 125.2 ? 1 : 2;
        return (
          <AbsoluteFill style={{opacity: win(t, 114.2, 133.2, 0.4)}}>
            <Abs x={60} y={480} w={960} style={{textAlign: 'center'}}><T size={54}>Des exemples très concrets</T></Abs>
            {ex === 0 && (
              <>
                <Photo src={P('echafaudage.jpg')} x={90} y={600} w={440} h={760} t0={114} style={{transform: `rotate(-3deg) scale(${spring(t, 114.6)})`}} />
                <Photo src={P('garde-corps.jpg')} x={560} y={700} w={440} h={560} t0={115} style={{transform: `rotate(3deg) scale(${spring(t, 117.2)})`}} />
                <Row y={1430}><Chip c={EPC} q={spring(t, 117.2)}>Garde-corps</Chip><Hand size={44} style={{opacity: pop(t, 118.9)}}>personne ne tombe</Hand></Row>
              </>
            )}
            {ex === 1 && (
              <>
                <Abs x={190} y={620} w={700} h={700} style={{borderRadius: 40, background: '#fff', boxShadow: '0 20px 50px rgba(27,31,42,0.12)'}} />
                <Cut src={P('aspirateur-d.png')} x={340} y={680} w={420} style={{transform: `scale(${spring(t, 120.6)})`}} />
                {/* particules aspirées vers la hotte */}
                {Array.from({length: 26}, (_, k) => {
                  const q = ((t - 120.6) * 0.5 + random(`p${k}`)) % 1;
                  const sx = 220 + random(`x${k}`) * 640, sy = 1280 - random(`y${k}`) * 200;
                  const hx = 690, hy = 800;
                  return <div key={k} style={{position: 'absolute', left: sx + (hx - sx) * q * q, top: sy + (hy - sy) * q * q, width: 14 - q * 8, height: 14 - q * 8, borderRadius: 10, background: '#8A8F99', opacity: (1 - q) * 0.8 * pop(t, 121.0)}} />;
                })}
                <Row y={1430}><Chip c={EPC} q={spring(t, 120.7)}>Ventilation : l'air assaini pour tous</Chip></Row>
              </>
            )}
            {ex === 2 && (
              <>
                <Photo src={P('barriere-rack.jpg')} x={70} y={620} w={460} h={600} t0={125} style={{transform: `scale(${spring(t, 125.3)})`}} />
                <Photo src={P('allee.jpg')} x={550} y={620} w={460} h={600} t0={126} style={{transform: `scale(${spring(t, 126.5)})`}} />
                <Row y={1290} gap={12}><Chip c={EPC} size={30} q={spring(t, 126.6)}>Intégré aux locaux</Chip><Chip c={INK} size={30} q={spring(t, 127.4)}>aux machines</Chip></Row>
              </>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* casque = une tête / filet = tout le monde */}
      {t > 133.0 && (() => {
        const fall = (k: number) => Math.min(1, Math.max(0, (t - 136.4 - k * 0.25) / 0.7));
        return (
          <AbsoluteFill style={{opacity: pop(t, 133.0)}}>
            <Abs x={60} y={480} w={960} style={{textAlign: 'center'}}><T size={54}>La <span style={{color: EPC}}>force du collectif</span></T></Abs>
            <Abs x={60} y={600} w={330} h={760} style={{borderRadius: 34, background: '#fff', border: `5px solid ${EPI}`, textAlign: 'center', transform: `scale(${spring(t, 134.3)})`}}>
              <div style={{position: 'relative', height: 420}}><Cut src={P('casque-d.png')} x={60} y={60} w={210} /><div style={{position: 'absolute', left: 105, top: 220}}><F n="ouvrier" size={120} /></div></div>
              <T size={110} color={EPI}>1</T><T size={30}>tête protégée</T>
            </Abs>
            <Abs x={420} y={600} w={600} h={760} style={{borderRadius: 34, background: '#fff', border: `5px solid ${EPC}`, overflow: 'hidden', transform: `scale(${spring(t, 136.1)})`}}>
              {/* filet */}
              <svg width={600} height={760} style={{position: 'absolute', inset: 0}}>
                {(() => {
                  const sag = Array.from({length: 5}, (_, k) => fall(k)).reduce((a, b) => a + b, 0) * 10;
                  return (
                    <>
                      {Array.from({length: 13}, (_, k) => <path key={`v${k}`} d={`M${40 + k * 43} 470 Q${40 + k * 43} ${520 + sag * Math.sin((k / 12) * Math.PI)} ${40 + k * 43} 560`} stroke={EPC} strokeWidth={3} fill="none" />)}
                      {[0, 1, 2].map((r) => <path key={`h${r}`} d={`M40 ${470 + r * 45} Q300 ${470 + r * 45 + sag} 560 ${470 + r * 45}`} stroke={EPC} strokeWidth={4} fill="none" />)}
                    </>
                  );
                })()}
              </svg>
              {Array.from({length: 5}, (_, k) => {
                const f = fall(k);
                const bounce = f >= 1 ? Math.sin(Math.min(1, (t - 136.4 - k * 0.25 - 0.7) * 3) * Math.PI) * -20 : 0;
                return <div key={k} style={{position: 'absolute', left: 50 + k * 105, top: -150 + f * 560 + bounce, transform: `rotate(${(1 - f) * 120}deg)`, opacity: t > 136.3 + k * 0.25 ? 1 : 0}}><F n={['ouvrier-dark', 'salariee', 'ouvrier', 'salarie', 'intervenant'][k]} size={90} /></div>;
              })}
              <Abs x={0} y={600} w={600} style={{textAlign: 'center'}}><T size={30}>Filet de sécurité</T><T size={60} color={EPC} style={{transform: `scale(${spring(t, 137.8)})`}}>tout le monde</T></Abs>
            </Abs>
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Chapitre 3 : le ring ─────────── */
const ROUNDS: [string, string, string, number, number][] = [
  ['Personnes protégées', 'Une seule', 'Plusieurs', 170.4, 172.3],
  ['Action requise', 'Oui : le mettre, bien le mettre', 'Non : protège en permanence', 173.5, 180.5],
  ['Coût', 'Moins cher à l’unité', 'Plus rentable à long terme', 184.9, 190.5],
  ['Priorité', '2e recours', 'Toujours en premier', 193.2, 193.6],
];
const C3: React.FC = () => {
  const t = useT();
  const o = win(t, 144.4, 195.0, 0.4);
  if (o <= 0) return null;
  const V = '#7B2CBF';
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* ring */}
      {t < 168.6 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 168.2, 168.6)}}>
          <Abs x={60} y={480} w={960} style={{textAlign: 'center'}}><T size={54}>Sur le ring, face à face</T></Abs>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <path d="M90 1420 L990 1420 L900 1250 L180 1250 Z" fill="#E9DFF5" stroke={V} strokeWidth={4} />
            {[0, 1, 2].map((k) => <path key={k} d={`M100 ${1300 - k * 110} Q540 ${1320 - k * 110 + Math.sin(t * 3 + k) * 8} 980 ${1300 - k * 110}`} stroke={[RED, '#fff', EPC][k]} strokeWidth={14} fill="none" />)}
            {[100, 980].map((x) => <rect key={x} x={x - 14} y={940} width={28} height={480} rx={8} fill={x < 500 ? EPI : EPC} />)}
          </svg>
          {/* combattants */}
          <Abs x={140} y={700} w={320} style={{textAlign: 'center', transform: `translateX(${(1 - spring(t, 143.7)) * -500}px) translateY(${Math.sin(t * 4) * 6}px)`}}>
            <div style={{position: 'relative', height: 300}}><Cut src={P('casque-d.png')} x={30} y={20} w={260} /><Cut src={P('gants-d.png')} x={150} y={130} w={150} style={{transform: `rotate(${Math.sin(t * 5) * 10}deg)`}} /></div>
            <Chip c={EPI} size={44}>EPI</Chip>
          </Abs>
          <Abs x={620} y={700} w={320} style={{textAlign: 'center', transform: `translateX(${(1 - spring(t, 144.2)) * 500}px) translateY(${Math.sin(t * 4 + 1) * 6}px)`}}>
            <div style={{position: 'relative', height: 300, borderRadius: 26, overflow: 'hidden'}}><Img src={P('garde-corps.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
            <Chip c={EPC} size={44} style={{marginTop: 10}}>EPC</Chip>
          </Abs>
          {t > 155.2 && (
            <Row y={1460} gap={20}>
              <div style={{textAlign: 'center', transform: `scale(${spring(t, 156.3)})`}}><Chip c={EPI} size={30}>Agit sur la personne</Chip><Hand size={34} style={{marginTop: 4}}>une armure</Hand></div>
              <div style={{textAlign: 'center', transform: `scale(${spring(t, 160.9)})`}}><Chip c={EPC} size={30}>Agit sur le danger</Chip><Hand size={34} style={{marginTop: 4}}>supprimé ou réduit</Hand></div>
            </Row>
          )}
          {t > 143.6 && t < 145.0 && <Abs x={470} y={880} style={{transform: `scale(${spring(t, 143.7)})`}}><F n="cloche" size={140} /></Abs>}
        </AbsoluteFill>
      )}
      {/* tableau des rounds */}
      {t > 168.4 && (
        <AbsoluteFill style={{opacity: pop(t, 168.4)}}>
          <Abs x={60} y={480} w={960} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Chip c={EPI} size={40}>EPI</Chip>
            <T size={40}>Les rounds</T>
            <Chip c={EPC} size={40}>EPC</Chip>
          </Abs>
          {ROUNDS.map(([crit, a, b, at, win2], k) => {
            const q = spring(t, at, 7, 14);
            const w = t > win2;
            return (
              <Abs key={crit} x={60} y={600 + k * 220} w={960} h={200} style={{borderRadius: 26, background: '#fff', boxShadow: '0 14px 30px rgba(27,31,42,0.1)', transform: `translateY(${(1 - q) * 300}px)`, opacity: Math.min(1, q * 1.5), display: 'flex', alignItems: 'stretch', overflow: 'hidden'}}>
                <div style={{width: 180, background: V, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10}}><T size={22} color="#ffffffaa">ROUND {k + 1}</T><T size={26} color="#fff" style={{textAlign: 'center', marginTop: 6}}>{crit}</T></div>
                <div style={{flex: 1, display: 'flex', alignItems: 'center', padding: '0 18px', background: '#FFF1E3'}}><T size={28} color={EPI}>{a}</T></div>
                <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px', background: w ? `${EPC}22` : '#EEF3FF'}}><T size={28} color={EPC} style={{flex: 1}}>{b}</T>{w && <div style={{transform: `scale(${spring(t, win2)})`}}><Check p={prog(t, win2, win2 + 0.4)} size={56} color={EPC} /></div>}</div>
              </Abs>
            );
          })}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Chapitre 4 : la règle d'or ─────────── */
const C4: React.FC = () => {
  const t = useT();
  const o = win(t, 197.9, 242.3, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 209.0 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 208.6, 209.0)}}>
          <Abs x={60} y={480} w={960} style={{textAlign: 'center'}}><T size={54}>Face à un risque, par quoi commencer ?</T></Abs>
          {/* lingot d'or */}
          <Abs x={140} y={700} w={800} h={420} style={{perspective: 1400, transform: `scale(${spring(t, 198.4, 6, 12)})`}}>
            <div style={{position: 'absolute', inset: 0, transform: 'rotateX(28deg)', transformOrigin: '50% 100%'}}>
              <div style={{position: 'absolute', left: 60, right: 60, top: 0, height: 140, background: 'linear-gradient(180deg, #FFE68A, #E8B21E)', clipPath: 'polygon(8% 0, 92% 0, 100% 100%, 0 100%)'}} />
              <div style={{position: 'absolute', left: 0, right: 0, top: 140, height: 260, background: 'linear-gradient(180deg, #F5C842, #B98A10)', borderRadius: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
                <T size={40} color="#6B4E00" style={{letterSpacing: 3}}>RÈGLE D'OR</T>
                <T size={46} color="#4A3600" style={{textAlign: 'center', marginTop: 6}}>L'EPC passe avant l'EPI</T>
                <div style={{position: 'absolute', top: 0, bottom: 0, width: 120, left: ((t - 198) * 500) % 1400 - 200, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)', transform: 'skewX(-20deg)'}} />
              </div>
            </div>
          </Abs>
          {t > 206.2 && <Row y={1240}><Chip c={INK} q={spring(t, 206.3)}><F n="balance" size={44} />Logique… et légal</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* podium */}
      {t > 208.8 && t < 227.2 && (
        <AbsoluteFill style={{opacity: win(t, 208.8, 227.2, 0.4)}}>
          <Abs x={60} y={480} w={960} style={{textAlign: 'center'}}><T size={54}>La bonne <span style={{color: GOLD}}>hiérarchie</span></T></Abs>
          {[['EPC', 1, 540, 560, EPC, 218.2], ['EPI', 2, 220, 380, EPI, 219.0]].map(([l, n, x, h, c, at]) => (
            <Abs key={l as string} x={(x as number) - 160} y={1440 - (h as number) * spring(t, at as number, 6, 12)} w={320} h={(h as number) * spring(t, at as number, 6, 12)} style={{borderRadius: '20px 20px 0 0', background: `linear-gradient(180deg, ${n === 1 ? '#FFD54A' : '#D9DEE6'}, ${n === 1 ? '#C9930A' : '#9AA3B2'})`, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20, boxSizing: 'border-box'}}>
              <T size={110} color="#fff">{n}</T>
              <Chip c={c as string} size={44}>{l}</Chip>
            </Abs>
          ))}
          {t > 219.7 && <Abs x={720} y={1000} style={{transform: `scale(${spring(t, 219.8)}) rotate(-6deg)`}}><div style={{border: `6px solid ${EPC}`, borderRadius: 16, padding: '6px 20px', background: '#fff'}}><T size={50} color={EPC}>TOUJOURS</T></div></Abs>}
          {t > 223.4 && <Row y={1480}><Hand size={46} style={{opacity: pop(t, 223.4)}}>la pierre angulaire de la prévention</Hand></Row>}
        </AbsoluteFill>
      )}
      {/* Plan A / B / C + risque résiduel */}
      {t > 227.0 && (
        <AbsoluteFill style={{opacity: pop(t, 227.0)}}>
          <Row y={520} gap={18}>
            {[['Plan A', 'EPC', EPC, 229.9, -4], ['Plan B', 'EPI', EPI, 231.1, 2], ['Plan C', 'EPI', '#B5651D', 232.1, 6]].map(([p, w, c, at, r]) => (
              <div key={p as string} style={{width: 280, height: 300, borderRadius: 20, background: '#fff', borderTop: `18px solid ${c}`, boxShadow: '0 16px 30px rgba(27,31,42,0.15)', transform: `rotate(${r}deg) translateY(${(1 - spring(t, at as number)) * -600}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Hand size={48} color={DIM}>{p}</Hand>
                <T size={80} color={c as string}>{w}</T>
              </div>
            ))}
          </Row>
          {t > 233.0 && <Row y={880}><Chip c={EPI} q={spring(t, 233.1)}>L'EPI : solution de dernier recours</Chip></Row>}
          {/* barre de risque */}
          {t > 236.0 && (() => {
            const red = 1 - 0.82 * prog(t, 236.4, 238.0, easeInOut);
            const cover = prog(t, 238.8, 240.2, easeOut);
            return (
              <Abs x={90} y={1020} w={900} h={420}>
                <T size={34}>Le risque</T>
                <div style={{position: 'relative', marginTop: 14, height: 110, borderRadius: 20, background: '#EEE', overflow: 'hidden'}}>
                  <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${red * 100}%`, background: `repeating-linear-gradient(45deg, ${RED} 0 20px, #C1121F 20px 40px)`}} />
                  <div style={{position: 'absolute', left: `${red * 100}%`, top: 0, bottom: 0, right: 0, background: `${EPC}33`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={30} color={EPC}>réduit par l'EPC</T></div>
                  {cover > 0 && <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${red * 100 * cover}%`, background: `${EPI}DD`, display: 'flex', alignItems: 'center', justifyContent: 'center'}} />}
                </div>
                {t > 238.8 && <div style={{marginTop: 20, display: 'flex', alignItems: 'center', gap: 14, opacity: pop(t, 238.8)}}><div style={{width: 40, height: 40, borderRadius: 10, background: EPI}} /><T size={32}>L'EPI couvre le <span style={{color: RED}}>risque résiduel</span></T></div>}
              </Abs>
            );
          })()}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Conclusion : parapluies ─────────── */
const Concl: React.FC = () => {
  const t = useT();
  if (t < 242.3) return null;
  const o = pop(t, 242.4, 0.5);
  const big = spring(t, 255.3, 5, 9);
  const Umb: React.FC<{w: number; c: string; open: number}> = ({w, c, open}) => (
    <svg width={w} height={w * 0.75} viewBox="0 0 200 150">
      <path d={`M${100 - 95 * open} 70 Q100 ${-30 + 40 * (1 - open)} ${100 + 95 * open} 70 Q${100 + 72 * open} 56 ${100 + 48 * open} 70 Q${100 + 24 * open} 56 100 70 Q${100 - 24 * open} 56 ${100 - 48 * open} 70 Q${100 - 72 * open} 56 ${100 - 95 * open} 70 Z`} fill={c} />
      <line x1={100} y1={20} x2={100} y2={135} stroke="#333" strokeWidth={5} />
      <path d="M100 135 Q100 148 90 148 Q80 148 80 138" stroke="#333" strokeWidth={5} fill="none" />
    </svg>
  );
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Abs x={60} y={480} w={960} style={{textAlign: 'center'}}><T size={52}>La sécurité : individuelle… ou <span style={{color: EPC}}>collective</span> ?</T></Abs>
      {/* pluie */}
      {Array.from({length: 40}, (_, k) => { const x = random(`rx${k}`) * 1080; const y = ((t * 900 + random(`ry${k}`) * 1200) % 1100) + 560; const sheltered = big > 0.6 && x > 150 && x < 930 && y > 820; return sheltered ? null : <Abs key={k} x={x} y={y} w={4} h={36} style={{background: '#7FA7D9', borderRadius: 2, opacity: 0.6}} />; })}
      {/* parapluies individuels */}
      {Array.from({length: 5}, (_, k) => (
        <div key={k} style={{position: 'absolute', left: 120 + k * 175, top: 1110, opacity: 1 - big * 0.7}}>
          <div style={{transform: `scale(${spring(t, 250.3 + k * 0.15)})`}}><Umb w={130} c={EPI} open={1} /></div>
          <div style={{marginLeft: 20, marginTop: -10}}><F n={['ouvrier-dark', 'salariee', 'ouvrier', 'salarie', 'intervenant'][k]} size={90} /></div>
        </div>
      ))}
      {t > 250.3 && t < 255.3 && <Row y={1420}><Chip c={EPI} size={30} q={spring(t, 250.4)}>« Chacun son casque »</Chip></Row>}
      {/* grand parapluie collectif */}
      {t > 255.2 && <Abs x={90} y={760 - (1 - big) * 300} w={900} style={{opacity: Math.min(1, big * 2)}}><Umb w={900} c={EPC} open={Math.min(1, big)} /></Abs>}
      {t > 255.3 && <Row y={1420}><Chip c={EPC} q={spring(t, 256.4)}>Un environnement sûr pour tous</Chip></Row>}
      {t > 263.5 && <Abs x={720} y={600} style={{transform: `scale(${spring(t, 263.6)}) rotate(${Math.sin(t * 3) * 8}deg)`}}><F n="loupe" size={160} /></Abs>}
      {t > 264.6 && <Row y={1530}><T size={46} color={EPC} style={{transform: `scale(${spring(t, 264.7)})`}}>Indice : l'EPC d'abord</T></Row>}
    </AbsoluteFill>
  );
};

/* ─────────── En-tête ─────────── */
const Header: React.FC = () => {
  const t = useT();
  const ch = CH.find((c) => t >= c.at + ZIP - 0.3 && t < c.end);
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 95, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(27,31,42,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {t > 2.6 && t < 33.5 && <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', opacity: pop(t, 2.6) * (1 - prog(t, 33.1, 33.5))}}><div style={{padding: '10px 26px', borderRadius: 40, background: '#fff', boxShadow: '0 10px 30px rgba(27,31,42,0.1)'}}><T size={38}><span style={{color: EPI}}>EPI</span> vs <span style={{color: EPC}}>EPC</span> : le guide sécurité</T></div></div>}
      {ch && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', opacity: pop(t, ch.at + ZIP - 0.3) * (1 - prog(t, ch.end - 0.3, ch.end))}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '8px 24px 8px 8px', borderRadius: 40, background: '#fff', boxShadow: '0 10px 30px rgba(27,31,42,0.1)'}}>
            <div style={{width: 56, height: 56, borderRadius: 28, background: ch.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: '#fff'}}>{ch.n}</div>
            <T size={34}>{ch.l}</T>
          </div>
        </div>
      )}
      {t > 33.5 && t < 242.3 && (
        <div style={{position: 'absolute', left: 180, right: 180, top: 330, display: 'flex', gap: 10, opacity: pop(t, 33.5) * (1 - prog(t, 241.9, 242.3))}}>
          {CH.map((c) => <div key={c.n} style={{flex: 1, height: 8, borderRadius: 4, background: 'rgba(27,31,42,0.1)', overflow: 'hidden'}}><div style={{height: '100%', width: `${prog(t, c.at, c.end, (v) => v) * 100}%`, background: c.c}} /></div>)}
        </div>
      )}
    </AbsoluteFill>
  );
};

const Bg: React.FC = () => {
  const t = useT();
  const ch = CH.find((c) => t >= c.at && t < c.end);
  const c = ch ? ch.c : EPI;
  return (
    <AbsoluteFill style={{background: BG}}>
      <AbsoluteFill style={{backgroundImage: `repeating-linear-gradient(45deg, rgba(27,31,42,0.025) 0 30px, transparent 30px 60px)`, backgroundPosition: `${t * 8}px 0`}} />
      <AbsoluteFill style={{background: `radial-gradient(circle at 85% 15%, ${c}26, transparent 45%), radial-gradient(circle at 10% 85%, ${c}1C, transparent 45%)`}} />
    </AbsoluteFill>
  );
};

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'signature', v: 0.35}, {at: 2.1, s: 'soft-whoosh', v: 0.5, dur: 2},
  {at: 9.2, s: 'sfx/whoosh', v: 0.35}, {at: 9.6, s: 'sfx/whoosh', v: 0.35}, {at: 12.0, s: 'sfx/pop', v: 0.28}, {at: 13.4, s: 'sfx/pop', v: 0.28},
  {at: 23.5, s: 'sfx/pop', v: 0.3}, {at: 25.2, s: 'sfx/thud', v: 0.35}, {at: 26.1, s: 'sfx/thud', v: 0.3}, {at: 29.4, s: 'sfx/whoosh', v: 0.3}, {at: 30.4, s: 'sfx/thud', v: 0.45},
  ...CH.filter((c) => c.n !== 2).flatMap((c) => [{at: c.at, s: 'sfx/whoosh', v: 0.4}, {at: c.at + ZIP - 0.9, s: 'sfx/swish', v: 0.35}, ...Array.from({length: 8}, (_, k) => ({at: c.at + ZIP - 0.9 + k * 0.1, s: 'tick', v: 0.18}))]),
  {at: 87.7, s: 'soft-whoosh', v: 0.55, dur: 2}, {at: 88.6, s: 'sfx/ding', v: 0.35},
  {at: 46.9, s: 'sfx/pop', v: 0.3}, {at: 47.6, s: 'sfx/pop', v: 0.3}, {at: 53.5, s: 'sfx/rise', v: 0.3},
  ...ITEMS.map((it) => ({at: it[2], s: 'sfx/pop', v: 0.35})), ...ITEMS.map((it) => ({at: it[2] + 0.2, s: 'tick', v: 0.2})),
  {at: 75.4, s: 'tension', v: 0.2, dur: 3}, {at: 76.0, s: 'sfx/click', v: 0.5}, {at: 81.0, s: 'sfx/ding', v: 0.3},
  {at: 95.4, s: 'sfx/pop', v: 0.3}, {at: 100.9, s: 'sfx/pop', v: 0.3}, ...[0, 1, 2, 3].map((k) => ({at: 101.2 + k * 0.2, s: 'sfx/thud', v: 0.2})), {at: 106.0, s: 'sfx/pop', v: 0.3}, {at: 112.0, s: 'sfx/thud', v: 0.5},
  {at: 114.6, s: 'sfx/whoosh', v: 0.3}, {at: 117.2, s: 'sfx/pop', v: 0.3}, {at: 120.6, s: 'sfx/whoosh', v: 0.35}, {at: 121.0, s: 'soft-whoosh', v: 0.3, dur: 3}, {at: 125.3, s: 'sfx/pop', v: 0.3}, {at: 126.5, s: 'sfx/pop', v: 0.3},
  {at: 134.3, s: 'sfx/pop', v: 0.3}, ...Array.from({length: 5}, (_, k) => ({at: 137.1 + k * 0.25, s: 'sfx/thud', v: 0.3})), {at: 137.8, s: 'validation', v: 0.32},
  {at: 143.7, s: 'sfx/bell', v: 0.5}, {at: 143.7, s: 'bass-hit', v: 0.35}, {at: 156.3, s: 'sfx/thud', v: 0.35}, {at: 160.9, s: 'sfx/thud', v: 0.35},
  ...ROUNDS.map((r) => ({at: r[3], s: 'sfx/swish', v: 0.3})), ...ROUNDS.map((r) => ({at: r[4], s: 'validation', v: 0.32})),
  {at: 198.4, s: 'bass-hit', v: 0.45}, {at: 198.6, s: 'sfx/ding', v: 0.35}, {at: 206.3, s: 'sfx/pop', v: 0.3},
  {at: 218.2, s: 'sfx/rise', v: 0.3}, {at: 219.0, s: 'sfx/thud', v: 0.35}, {at: 219.8, s: 'tampon', v: 0.5},
  ...[229.9, 231.1, 232.1].map((at) => ({at, s: 'page', v: 0.45})), {at: 233.1, s: 'sfx/pop', v: 0.3}, {at: 236.4, s: 'sfx/swish', v: 0.3}, {at: 238.8, s: 'validation', v: 0.32},
  {at: 242.4, s: 'soft-whoosh', v: 0.45, dur: 2}, ...Array.from({length: 5}, (_, k) => ({at: 250.3 + k * 0.15, s: 'sfx/pop', v: 0.22})), {at: 255.3, s: 'sfx/whoosh', v: 0.45}, {at: 256.4, s: 'bass-hit', v: 0.4},
  {at: 263.6, s: 'sfx/pop', v: 0.3}, {at: 264.7, s: 'sfx/ding', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const EpiEpcGuide: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <Bg />
    <Gate from={0} to={33.8}><Intro /></Gate>
    <Gate from={35.9} to={87.8}><C1 /></Gate>
    <Gate from={90.5} to={141.7}><C2 /></Gate>
    <Gate from={144.3} to={195.2}><C3 /></Gate>
    <Gate from={197.8} to={242.5}><C4 /></Gate>
    <Gate from={242.2} to={OUTRO_AT}><Concl /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {CH.filter((c) => c.n !== 2).map((c) => <Gate key={c.n} from={c.at} to={c.at + ZIP + 0.1}><ZipCard ch={c} /></Gate>)}
    <Gate from={87.5} to={90.8}><Mirror /></Gate>
    <Gate from={0} to={2.9}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.3} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-epi-epc-origine.m4a')} trimAfter={s(265.2)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

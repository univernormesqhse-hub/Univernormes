import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Gate, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {handFont, s, sansFont} from '../theme';
import {captions} from './captions';

/**
 * « Fiche de poste ou fiche de fonction ? » (4 min 27) — voix d'origine, sous-titres recalés mot à mot, photos réelles,
 * univers « papier » clair aux couleurs orange de la vidéo source.
 * Fil rouge inédit : une étiquette de classeur « FICHE DE … ? » que chaque partie décolle un peu plus, jusqu'à révéler
 * « COMPÉTENCES » ; transitions en chemise cartonnée qui monte, s'ouvre en 3D sur le titre de la partie puis repart.
 * Autres techniques nouvelles dans la série : partie de ping-pong entre deux mots, étiqueteuse qui embosse puis efface,
 * tapette qui se referme sur un document, loupe qui révèle une photo cachée, photo qui gèle, entrée de dictionnaire
 * raturée, barre de progression bloquée par une barrière, tablette de marbre qui se fissure et tombe en éclats, plateau
 * de jeu de société qui bascule, mot anamorphique dont les lettres éparpillées s'alignent quand la caméra tourne, mots
 * qui se dissolvent en poussière, document passé aux rayons X, douche de projecteur, blocs de Tetris qui complètent une
 * ligne, globe filaire qui tourne, barre de recherche « 0 résultat », pont suspendu à deux pylônes, circuit en boucle
 * à trois stations parcouru par un jeton, montagnes russes, grand interrupteur OBLIGATION → OPTION, caisse à outils
 * dont les plateaux se déploient, barre rigide contre ruban souple, mètre ruban « sur mesure », jauges d'énergie qui se
 * vident d'un côté pour remplir l'autre.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 268.3;
export const FICHEPOSTE_FRAMES = s(OUTRO_AT + 3.8);
const PAPER = '#F7F3EA';
const INK = '#13213A';
const DIM = '#5B6577';
const OR = '#F28C1E';
const GREEN = '#1FA67A';
const RED = '#E5484D';
const BLUE = '#2F6FDB';
const VIO = '#7B5CD6';
const PH = (p: string) => staticFile(p);

type Pt = {n: number; l: string; sub: string; at: number; end: number; c: string};
const PT: Pt[] = [
  {n: 1, l: 'La vraie question', sub: 'Changer de perspective', at: 69.0, end: 106.9, c: OR},
  {n: 2, l: "Ce que dit l'ISO 9001", sub: 'Une référence mondiale', at: 107.0, end: 158.3, c: BLUE},
  {n: 3, l: 'Les exigences', sub: 'Les 3 attentes claires', at: 158.4, end: 192.2, c: GREEN},
  {n: 4, l: 'Au-delà de la fiche', sub: 'Les outils de gestion', at: 192.3, end: 245.8, c: VIO},
];
const WIPE = 2.4;

const pop = (t: number, at: number, d = 0.4) => prog(t, at, at + d, easeOut);
const spring = (t: number, at: number, k = 7, w = 15) => {
  const x = t - at;
  return x <= 0 ? 0 : 1 - Math.exp(-x * k) * Math.cos(x * w);
};
const win = (t: number, a: number, b: number, f = 0.4) => prog(t, a, a + f) * (1 - prog(t, b - f, b));
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

const T: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 40, color = INK, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, letterSpacing: -0.5, lineHeight: 1.05, ...style}}>{children}</div>
);
const Hand: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 48, color = INK, style}) => (
  <div style={{fontFamily: handFont, fontSize: size, color, lineHeight: 1.1, ...style}}>{children}</div>
);
const Abs: React.FC<{x: number; y: number; w?: number; h?: number; children?: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, ...style}}>{children}</div>
);
const Chip: React.FC<{children: React.ReactNode; c?: string; q?: number; size?: number; light?: boolean; style?: React.CSSProperties}> = ({children, c = OR, q = 1, size = 34, light = true, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 26px', borderRadius: 50, background: c, color: light ? '#fff' : INK, fontFamily: sansFont, fontWeight: 900, fontSize: size, transform: `scale(${q})`, boxShadow: `0 12px 28px ${c}55`, whiteSpace: 'nowrap', ...style}}>{children}</div>
);
const Row: React.FC<{y: number; children: React.ReactNode; gap?: number}> = ({y, children, gap = 14}) => (
  <Abs x={0} y={y} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap, flexWrap: 'wrap', padding: '0 40px', boxSizing: 'border-box'}}>{children}</Abs>
);
const Title: React.FC<{children: React.ReactNode; y?: number; size?: number}> = ({children, y = 330, size = 60}) => <Abs x={50} y={y} w={980} style={{textAlign: 'center'}}><T size={size}>{children}</T></Abs>;
const Photo: React.FC<{src: string; x: number; y: number; w: number; h: number; q?: number; r?: number; pos?: string; children?: React.ReactNode; filter?: string; o?: number}> = ({src, x, y, w, h, q = 1, r = 0, pos = 'center', children, filter, o = 1}) => {
  const t = useT();
  return (
    <Abs x={x} y={y} w={w} h={h} style={{borderRadius: 28, overflow: 'hidden', border: '8px solid #fff', boxShadow: '0 26px 50px rgba(19,33,58,0.28)', transform: `scale(${q}) rotate(${r}deg)`, opacity: o}}>
      <Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${1.04 + (t % 40) * 0.003})`, filter}} />
      {children}
    </Abs>
  );
};
/** Étiquette de classeur (fil rouge) : peel = 0 collée, 1 décollée — sous elle, « COMPÉTENCES ». */
const Tag: React.FC<{w: number; peel: number; label?: string; c?: string}> = ({w, peel, label = 'FICHE DE … ?', c = OR}) => {
  const h = w * 0.3;
  return (
    <div style={{position: 'relative', width: w, height: h, borderRadius: h * 0.18, background: '#FFF8EC', border: `${Math.max(2, w * 0.012)}px solid ${INK}`, boxShadow: '0 8px 18px rgba(19,33,58,0.18)', overflow: 'visible'}}>
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: w * 0.12, color: GREEN, letterSpacing: 1}}>COMPÉTENCES</div>
      <div style={{position: 'absolute', inset: -2, borderRadius: h * 0.18, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: w * 0.105, color: '#fff', transformOrigin: '100% 0%', transform: `rotate(${-peel * 38}deg) translate(${peel * w * 0.1}px, ${-peel * h * 0.9}px)`, opacity: 1 - prog(peel, 0.85, 1), boxShadow: peel > 0 ? `-8px 12px 16px rgba(0,0,0,${0.25 * peel})` : 'none'}}>{label}</div>
    </div>
  );
};

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('induction/reunion-audit.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 980, objectFit: 'cover', objectPosition: '50% 40%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 30%, ${PAPER}DD 46%, ${PAPER} 52%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={60} y={960} w={960} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>GESTION DES COMPÉTENCES · ISO 9001</div>
        <T size={100} style={{marginTop: 26, textTransform: 'uppercase', letterSpacing: -3}}>Fiche de <span style={{color: OR}}>poste</span></T>
        <T size={56} color={DIM} style={{marginTop: 6, textTransform: 'uppercase'}}>ou</T>
        <T size={100} style={{textTransform: 'uppercase', letterSpacing: -3}}>fiche de <span style={{color: OR}}>fonction</span> ?</T>
        <Hand size={56} color={GREEN} style={{marginTop: 22}}>Le vrai débat… n'est pas celui-là</Hand>
      </Abs>
      <Abs x={340} y={1560}><Tag w={400} peel={0} /></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : la chemise cartonnée ─────────── */
const FolderWipe: React.FC<{p: Pt}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const up = prog(t, a, a + 0.45, easeOut);
  const open = prog(t, a + 0.4, a + 0.95, easeInOut);
  const shut = prog(t, b - 0.75, b - 0.35, easeInOut);
  const away = prog(t, b - 0.4, b, easeIn);
  const lid = (open - shut) * 172;
  const y = (1 - up) * 1500 - away * 1700;
  return (
    <AbsoluteFill style={{zIndex: 55, pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: INK, opacity: 0.55 * up * (1 - away)}} />
      <Abs x={90} y={420 + y} w={900} h={1080} style={{perspective: 2400}}>
        <div style={{position: 'absolute', left: 0, top: -70, width: 340, height: 90, borderRadius: '24px 24px 0 0', background: '#E9C892'}} />
        <div style={{position: 'absolute', inset: 0, borderRadius: '0 26px 26px 26px', background: '#E9C892', boxShadow: '0 40px 80px rgba(0,0,0,0.4)'}} />
        <div style={{position: 'absolute', left: 40, top: 40, right: 40, bottom: 40, borderRadius: 18, background: '#FFFDF8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26}}>
          <div style={{width: 170, height: 170, borderRadius: 85, background: p.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 120, color: '#fff', lineHeight: 1}}>{p.n}</div>
          <T size={34} color={p.c} style={{letterSpacing: 8}}>PARTIE {p.n}/4</T>
          <T size={78} style={{textAlign: 'center'}}>{p.l}</T>
          <Hand size={52} color={DIM}>{p.sub}</Hand>
          <div style={{marginTop: 20}}><Tag w={360} peel={p.n / 4} /></div>
        </div>
        <div style={{position: 'absolute', inset: 0, borderRadius: '0 26px 26px 26px', background: 'linear-gradient(160deg, #F2D7A6, #DDB676)', transformOrigin: '50% 0%', transform: `rotateX(${lid}deg)`, backfaceVisibility: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 0 6px rgba(0,0,0,0.05)'}}>
          <div style={{padding: '18px 40px', borderRadius: 14, background: '#fff', border: `4px solid ${INK}`}}><T size={56}>DOSSIER {p.n}</T></div>
        </div>
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Ouverture ─────────── */
const Paddle: React.FC<{x: number; y: number; c: string; label: string; r: number}> = ({x, y, c, label, r}) => (
  <Abs x={x} y={y} style={{transform: `rotate(${r}deg)`, transformOrigin: '50% 90%'}}>
    <div style={{width: 230, height: 230, borderRadius: 115, background: c, border: `8px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={label.length > 6 ? 30 : 38} color="#fff">{label}</T></div>
    <div style={{width: 46, height: 150, margin: '-12px auto 0', borderRadius: 16, background: '#8A5A2B', border: `6px solid ${INK}`}} />
  </Abs>
);
const PingPong: React.FC = () => {
  const t = useT();
  const ph = ((t - 2.6) / 0.62) % 2;
  const k = ph < 1 ? ph : 2 - ph;
  const bx = lerp(270, 810, k);
  const by = 860 - Math.sin(k * Math.PI) * 300;
  const hitL = ph < 0.12 || ph > 1.88;
  const hitR = ph > 0.88 && ph < 1.12;
  return (
    <>
      <Title>Un débat <span style={{color: OR}}>sans fin</span></Title>
      <Abs x={120} y={1100} w={840} h={20} style={{borderRadius: 10, background: GREEN}} />
      <Abs x={536} y={980} w={8} h={130} style={{background: INK}} />
      <Paddle x={20} y={760} c={OR} label="POSTE" r={hitL ? -18 : -6} />
      <Paddle x={830} y={760} c={BLUE} label="FONCTION" r={hitR ? 18 : 6} />
      {Array.from({length: 5}, (_, i) => {
        const pp = ((t - 2.6 - i * 0.04) / 0.62) % 2;
        const kk = pp < 1 ? pp : 2 - pp;
        return <Abs key={i} x={lerp(270, 810, kk) - 22} y={860 - Math.sin(kk * Math.PI) * 300 - 22} w={44} h={44} style={{borderRadius: 22, background: '#fff', border: `4px solid ${INK}`, opacity: (5 - i) / 10}} />;
      })}
      <Abs x={bx - 26} y={by - 26} w={52} h={52} style={{borderRadius: 26, background: '#fff', border: `5px solid ${INK}`}} />
      <Row y={1250}><Chip c={INK} q={pop(t, 4.2)}>Échanges : ∞</Chip></Row>
    </>
  );
};
const Dymo: React.FC = () => {
  const t = useT();
  const A = 'FICHE DE POSTE', B = 'FICHE DE FONCTION';
  let txt = '';
  if (t < 7.6) txt = A.slice(0, Math.floor((t - 6.98) * 26));
  else if (t < 8.2) txt = A.slice(0, Math.max(9, A.length - Math.floor((t - 7.6) * 16)));
  else txt = B.slice(0, Math.min(B.length, 9 + Math.floor((t - 8.2) * 18)));
  return (
    <>
      <Title>Le bon mot, la bonne <span style={{color: OR}}>mise en page</span></Title>
      <Abs x={190} y={700} w={700} h={330} style={{borderRadius: 60, background: '#D9433F', border: `8px solid ${INK}`, boxShadow: '0 30px 60px rgba(0,0,0,0.25)'}}>
        <Abs x={60} y={60} w={180} h={180} style={{borderRadius: 90, background: '#1E1E1E', border: '8px solid #fff'}}>
          {Array.from({length: 12}, (_, i) => <Abs key={i} x={78} y={8} w={10} h={30} style={{background: '#fff', borderRadius: 4, transformOrigin: '5px 74px', transform: `rotate(${i * 30 + t * 120}deg)`}} />)}
        </Abs>
        <Abs x={290} y={110} w={340} h={100} style={{borderRadius: 18, background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={40} color="#7CFFB2" style={{fontFamily: 'monospace'}}>{txt.slice(-10)}▌</T></Abs>
      </Abs>
      <Abs x={0} y={1090} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{height: 76, background: '#1B1B1B', borderRadius: 8, display: 'flex', alignItems: 'center', padding: '0 24px', boxShadow: '0 8px 16px rgba(0,0,0,0.3)'}}>
        <span style={{fontFamily: 'monospace', fontWeight: 900, fontSize: 44, color: '#fff', letterSpacing: 4, textShadow: '0 2px 0 #000, 0 -1px 0 #666', whiteSpace: 'nowrap'}}>{txt}</span>
      </div></Abs>
    </>
  );
};
const Trap: React.FC = () => {
  const t = useT();
  const snap = prog(t, 11.2, 11.35, easeIn);
  const shake = t > 11.35 && t < 11.8 ? Math.sin(t * 90) * 10 * (1 - prog(t, 11.35, 11.8)) : 0;
  const lens = prog(t, 12.6, 15.4, easeInOut);
  const lx = lerp(260, 540, lens), ly = lerp(1000, 900, lens), lr = lerp(110, 330, prog(t, 14.5, 15.5, easeInOut));
  return (
    <>
      <Title>Et si c'était un <span style={{color: RED}}>piège</span> ?</Title>
      <Abs x={0} y={0} w={1080} h={1920} style={{transform: `translateX(${shake}px)`, opacity: 1 - prog(t, 12.4, 12.9)}}>
        <Abs x={190} y={900} w={700} h={300} style={{borderRadius: 16, background: '#C69A62', border: `8px solid ${INK}`}} />
        <Abs x={420} y={800} w={240} h={150} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 10, transform: 'rotate(-6deg)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={26}>FICHE DE …</T></Abs>
        <Abs x={240} y={1060} w={600} h={14} style={{background: '#9AA3AF', borderRadius: 7, transformOrigin: '50% 100%', transform: `translateY(${-snap * 0}px)`}} />
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <g transform={`rotate(${lerp(-150, 0, snap)} 540 1060)`}><rect x={250} y={1050} width={580} height={20} rx={10} fill="#9AA3AF" stroke={INK} strokeWidth={6} /><rect x={250} y={1050} width={20} height={-260 + 260} fill="#9AA3AF" /></g>
        </svg>
      </Abs>
      {t > 11.25 && t < 12.6 && <Row y={1260}><Chip c={RED} q={spring(t, 11.25)}>CLAC !</Chip></Row>}
      {t > 12.4 && (
        <>
          <Abs x={0} y={600} w={1080} h={800} style={{clipPath: `circle(${lr}px at ${lx}px ${ly - 600}px)`}}>
            <Img src={PH('verites/plans.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            <Abs x={0} y={600} w={1080} style={{textAlign: 'center'}}><T size={72} color="#fff" style={{textShadow: '0 4px 20px rgba(0,0,0,0.8)'}}>COMPÉTENCES</T></Abs>
          </Abs>
          <Abs x={lx - lr - 14} y={ly - lr - 14} w={lr * 2 + 28} h={lr * 2 + 28} style={{borderRadius: '50%', border: `14px solid ${INK}`, opacity: 1 - prog(t, 15.0, 15.5)}} />
          <Abs x={lx + lr * 0.62} y={ly + lr * 0.62} w={40} h={160} style={{background: INK, borderRadius: 20, transform: 'rotate(-45deg)', transformOrigin: '20px 0', opacity: 1 - prog(t, 15.0, 15.5)}} />
        </>
      )}
    </>
  );
};
const Reveal: React.FC = () => {
  const t = useT();
  return (
    <>
      <Title>Le vrai sujet stratégique</Title>
      <Abs x={0} y={760} w={1080} style={{display: 'flex', justifyContent: 'center', transform: `scale(${0.6 + 0.4 * spring(t, 15.7)})`}}><Tag w={820} peel={prog(t, 16.0, 17.0, easeInOut)} /></Abs>
      <Row y={1150}><Hand size={60} color={OR} style={{opacity: pop(t, 15.8)}}>la gestion des compétences</Hand></Row>
      <Row y={1300}><Chip c={INK} q={spring(t, 17.3)}><F n="loupe" size={44} /> On décortique ensemble</Chip></Row>
    </>
  );
};
const Frozen: React.FC = () => {
  const t = useT();
  const ice = prog(t, 22.2, 23.5, easeInOut);
  return (
    <>
      <Title>Une question qui <span style={{color: BLUE}}>paralyse</span></Title>
      <Photo src="induction/reunion-audit.jpg" x={80} y={560} w={920} h={620} filter={`saturate(${1 - ice * 0.8}) brightness(${1 + ice * 0.15}) hue-rotate(${ice * 15}deg)`}>
        <AbsoluteFill style={{background: `linear-gradient(135deg, rgba(190,225,255,${0.55 * ice}), rgba(255,255,255,${0.15 * ice}))`}} />
        {Array.from({length: 18}, (_, k) => <Abs key={k} x={random(`ix${k}`) * 900} y={random(`iy${k}`) * 600} w={4} h={60 + random(`il${k}`) * 90} style={{background: '#fff', opacity: 0.7 * ice, transform: `rotate(${random(`ir${k}`) * 180}deg)`}} />)}
        <Abs x={380} y={230} w={160} h={160} style={{borderRadius: 80, background: 'rgba(19,33,58,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, opacity: ice}}>
          <div style={{width: 24, height: 80, background: '#fff', borderRadius: 6}} /><div style={{width: 24, height: 80, background: '#fff', borderRadius: 6}} />
        </Abs>
      </Photo>
      <Row y={1240} gap={20}>
        <Chip c={BLUE} q={spring(t, 24.3)}><F n="formatrice" size={44} /> Les RH</Chip>
        <Chip c={INK} q={spring(t, 25.5)}><F n="directeur" size={44} /> Les managers</Chip>
      </Row>
    </>
  );
};
const Dico: React.FC = () => {
  const t = useT();
  const defs = ['Document qui décrit un poste…', 'Document qui décrit une fonction…', 'Selon l\'entreprise…'];
  const bar = Math.min(prog(t, 30.0, 33.2, easeOut), 0.46);
  const bump = t > 33.2 && t < 34.0 ? Math.sin((t - 33.2) * 30) * 8 * (1 - prog(t, 33.2, 34.0)) : 0;
  return (
    <>
      <Title>La définition <span style={{color: OR}}>parfaite</span> ?</Title>
      <Abs x={110} y={520} w={860} h={520} style={{borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, padding: 40, boxSizing: 'border-box', transform: 'rotate(-1.5deg)', boxShadow: '0 20px 40px rgba(19,33,58,0.15)'}}>
        <T size={56}>fiche <span style={{fontWeight: 600, fontStyle: 'italic', fontSize: 36, color: DIM}}>n. f.</span></T>
        {defs.map((d, i) => {
          const p = pop(t, 26.6 + i * 1.3);
          const cross = prog(t, 27.4 + i * 1.3, 27.9 + i * 1.3);
          return (
            <div key={d} style={{position: 'relative', marginTop: 26, opacity: p}}>
              <Hand size={46} color={DIM}>{i + 1}. {d}</Hand>
              <div style={{position: 'absolute', left: 0, top: 30, height: 6, width: `${cross * 100}%`, background: RED, borderRadius: 3, transform: 'rotate(-1deg)'}} />
            </div>
          );
        })}
      </Abs>
      <Abs x={110} y={1160} w={860} style={{opacity: pop(t, 29.8)}}>
        <T size={34} color={DIM}>PERFORMANCE</T>
        <div style={{position: 'relative', marginTop: 14, height: 64, borderRadius: 32, background: '#E6E1D6', overflow: 'hidden'}}>
          <div style={{width: `${bar * 100}%`, height: '100%', background: GREEN, transform: `translateX(${bump}px)`}} />
        </div>
        <Abs x={860 * 0.46 + 10} y={30} w={34} h={110} style={{background: `repeating-linear-gradient(180deg, ${RED} 0 20px, #fff 20px 40px)`, border: `4px solid ${INK}`, borderRadius: 6, opacity: pop(t, 32.8)}} />
        {t > 33.3 && <Abs x={860 * 0.46 + 60} y={50}><Chip c={RED} q={spring(t, 33.4)} size={28}>Bloquée</Chip></Abs>}
      </Abs>
    </>
  );
};
const Quote: React.FC = () => {
  const t = useT();
  const q = '« Savez-vous la différence\u00a0? Non\u00a0? Moi non plus\u00a0! Et ce n\'est pas grave… »';
  const n = Math.floor(prog(t, 38.2, 42.8) * q.length);
  const lock = prog(t, 45.2, 45.6, easeOut);
  return (
    <>
      <Title>Même les <span style={{color: OR}}>experts</span> le disent</Title>
      <Abs x={90} y={520} w={900} h={460} style={{borderRadius: 30, background: '#fff', border: `5px solid ${INK}`, padding: '50px 56px', boxSizing: 'border-box', boxShadow: `14px 14px 0 ${OR}`}}>
        <Hand size={64} style={{lineHeight: 1.2}}>{q.slice(0, n)}<span style={{opacity: t % 0.6 < 0.3 ? 1 : 0}}>|</span></Hand>
        <Abs x={56} y={400}><T size={22} color={DIM}>Citation affichée par la vidéo d'origine</T></Abs>
      </Abs>
      {t > 44.8 && (
        <Abs x={390} y={1030} w={300} h={300} style={{opacity: 1 - prog(t, 47.0, 47.4)}}>
          <svg width={300} height={300}>
            <path d={`M90 150 L90 ${100 - lock * 40} A60 60 0 0 1 210 ${100 - lock * 40} L210 ${150 - lock * 0}`} fill="none" stroke={INK} strokeWidth={22} transform={`rotate(${lock * 18} 210 150)`} />
            <rect x={60} y={140} width={180} height={140} rx={24} fill={OR} stroke={INK} strokeWidth={8} />
            <circle cx={150} cy={200} r={18} fill={INK} />
          </svg>
          <Abs x={0} y={290} w={300} style={{textAlign: 'center'}}><Hand size={52} color={GREEN}>libérateur !</Hand></Abs>
        </Abs>
      )}
      {t > 47.2 && (
        <>
          <Photo src="causerie/groupe.jpg" x={160} y={1020} w={760} h={420} q={spring(t, 47.3)} r={-2} />
          <Row y={1420}><Chip c={GREEN} q={spring(t, 49.2)}>En bonne compagnie</Chip></Row>
        </>
      )}
    </>
  );
};
const Marble: React.FC = () => {
  const t = useT();
  const carve = prog(t, 54.0, 56.4);
  const crack = prog(t, 57.0, 57.5);
  const fall = prog(t, 57.6, 58.3, easeIn);
  const shards = Array.from({length: 10}, (_, i) => ({x: (i % 5) * 120, y: Math.floor(i / 5) * 280, r: random(`mr${i}`) * 60 - 30, dx: random(`md${i}`) * 200 - 100}));
  return (
    <>
      <Title>Rien de <span style={{color: OR}}>gravé dans le marbre</span></Title>
      <Abs x={240} y={540} w={600} h={720}>
        {shards.map((sh, i) => (
          <Abs key={i} x={sh.x} y={sh.y} w={120} h={280} style={{background: 'linear-gradient(135deg, #EDEDED, #C9C9C9)', borderLeft: crack > 0 ? '2px solid #8B8B8B' : 'none', borderTop: crack > 0 ? '2px solid #8B8B8B' : 'none', transform: `translate(${sh.dx * fall}px, ${fall * fall * 1100}px) rotate(${sh.r * fall}deg)`, borderRadius: i === 0 ? '300px 0 0 0' : i === 4 ? '0 300px 0 0' : 0}} />
        ))}
        <Abs x={0} y={160} w={600} style={{textAlign: 'center', opacity: 1 - fall}}>
          <T size={48} color="#6F6F6F" style={{clipPath: `inset(0 ${(1 - carve) * 100}% 0 0)`, textShadow: '1px 1px 0 #fff, -1px -1px 0 #888'}}>DÉFINITION</T>
          <T size={48} color="#6F6F6F" style={{marginTop: 14, clipPath: `inset(0 ${(1 - carve) * 100}% 0 0)`, textShadow: '1px 1px 0 #fff, -1px -1px 0 #888'}}>OFFICIELLE</T>
        </Abs>
        {crack > 0 && fall < 1 && <svg width={600} height={720} style={{position: 'absolute', inset: 0}}><path d="M300 0 L270 160 L330 300 L250 460 L320 720 M270 160 L120 260 M330 300 L520 380" fill="none" stroke="#555" strokeWidth={5} strokeDasharray={1400} strokeDashoffset={1400 * (1 - crack)} /></svg>}
      </Abs>
      {t > 53.0 && <Abs x={760 - carve * 300} y={600 + Math.sin(t * 40) * 6} style={{opacity: 1 - prog(t, 56.6, 57)}}><F n="tournevis" size={150} /></Abs>}
      <Row y={1340}><Chip c={RED} q={spring(t, 53.6)}>Aucune définition officielle</Chip></Row>
    </>
  );
};
const Board: React.FC = () => {
  const t = useT();
  const tilt = prog(t, 66.9, 68.2, easeIn);
  const pawns = [{c: OR, x: 260, y: 860, l: 'Règle A'}, {c: BLUE, x: 540, y: 760, l: 'Règle B'}, {c: GREEN, x: 800, y: 900, l: 'Règle C'}];
  return (
    <>
      <Title>Chacun ses <span style={{color: OR}}>règles du jeu</span></Title>
      <Abs x={90} y={560} w={900} h={760} style={{perspective: 1600}}>
        <div style={{position: 'absolute', inset: 0, transform: `rotateX(${30 + tilt * 40}deg) rotateZ(${tilt * 25}deg) translateY(${tilt * 300}px)`, transformOrigin: '50% 80%'}}>
          <div style={{position: 'absolute', inset: 0, borderRadius: 30, background: '#2E8B57', border: `10px solid ${INK}`}} />
          {Array.from({length: 24}, (_, i) => {
            const side = Math.floor(i / 6), k = i % 6;
            const x = side === 0 ? 40 + k * 135 : side === 1 ? 760 : side === 2 ? 760 - k * 135 : 40;
            const y = side === 0 ? 40 : side === 1 ? 40 + k * 110 : side === 2 ? 620 : 620 - k * 110;
            return <Abs key={i} x={x} y={y} w={90} h={80} style={{borderRadius: 12, background: [OR, '#fff', BLUE, '#FFD84D'][i % 4], border: `4px solid ${INK}`}} />;
          })}
        </div>
        {pawns.map((p, i) => (
          <Abs key={i} x={p.x - 50} y={p.y - 160 + tilt * (700 + i * 120)} style={{transform: `rotate(${tilt * (i - 1) * 70}deg)`, opacity: pop(t, 58.6 + i * 0.5)}}>
            <svg width={100} height={160}><circle cx={50} cy={36} r={30} fill={p.c} stroke={INK} strokeWidth={6} /><path d="M20 150 Q50 40 80 150 Z" fill={p.c} stroke={INK} strokeWidth={6} /></svg>
            <div style={{position: 'absolute', left: 70, top: -20, padding: '6px 14px', borderRadius: 10, background: '#fff', border: `3px solid ${p.c}`, whiteSpace: 'nowrap'}}><T size={24}>{p.l}</T></div>
          </Abs>
        ))}
        <Abs x={380} y={440 + Math.abs(Math.sin(t * 6)) * -80 + tilt * 900} style={{transform: `rotate(${t * 400}deg)`, opacity: pop(t, 62.6)}}><F n="de" size={110} /></Abs>
      </Abs>
      {t > 66.9 && <Row y={1380}><Chip c={RED} q={spring(t, 67.0)}>Bataille perdue d'avance</Chip></Row>}
    </>
  );
};
const Intro: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      {t < 6.98 && <AbsoluteFill style={{opacity: pop(t, 2.5) * (1 - prog(t, 6.7, 6.98))}}><PingPong /></AbsoluteFill>}
      {t >= 6.9 && t < 9.7 && <AbsoluteFill style={{opacity: pop(t, 6.9) * (1 - prog(t, 9.4, 9.7))}}><Dymo /></AbsoluteFill>}
      {t >= 9.6 && t < 15.7 && <AbsoluteFill style={{opacity: pop(t, 9.6) * (1 - prog(t, 15.4, 15.7))}}><Trap /></AbsoluteFill>}
      {t >= 15.6 && t < 19.7 && <AbsoluteFill style={{opacity: pop(t, 15.6) * (1 - prog(t, 19.4, 19.7))}}><Reveal /></AbsoluteFill>}
      {t >= 19.6 && t < 26.2 && <AbsoluteFill style={{opacity: pop(t, 19.6) * (1 - prog(t, 25.9, 26.2))}}><Frozen /></AbsoluteFill>}
      {t >= 26.1 && t < 37.6 && <AbsoluteFill style={{opacity: pop(t, 26.1) * (1 - prog(t, 37.3, 37.6))}}><Dico /></AbsoluteFill>}
      {t >= 37.5 && t < 51.0 && <AbsoluteFill style={{opacity: pop(t, 37.5) * (1 - prog(t, 50.7, 51.0))}}><Quote /></AbsoluteFill>}
      {t >= 50.9 && t < 58.4 && <AbsoluteFill style={{opacity: pop(t, 50.9) * (1 - prog(t, 58.2, 58.4))}}><Marble /></AbsoluteFill>}
      {t >= 58.3 && t < 69.1 && <AbsoluteFill style={{opacity: pop(t, 58.3) * (1 - prog(t, 68.6, 69.1))}}><Board /></AbsoluteFill>}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 1 : la vraie question ─────────── */
const WORD = 'PERFORMANCE';
const Anamorph: React.FC = () => {
  const t = useT();
  const ang = lerp(65, 0, prog(t, 72.3, 75.3, easeInOut));
  const P = 1200;
  return (
    <>
      <Title>Changer de <span style={{color: OR}}>perspective</span></Title>
      <Abs x={0} y={600} w={1080} h={500} style={{perspective: P, perspectiveOrigin: '540px 250px'}}>
        <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `rotateY(${ang}deg) rotateX(${ang * 0.3}deg)`, transformOrigin: '540px 250px'}}>
          {WORD.split('').map((ch, i) => {
            const z = -900 + random(`az${i}`) * 1400;
            const k = (P - z) / P;
            const x = 540 + (i - (WORD.length - 1) / 2) * 86;
            const y = 250 + (random(`ay${i}`) - 0.5) * 0;
            return (
              <div key={i} style={{position: 'absolute', left: 540 + (x - 540) * k - 45 * k, top: 250 + (y - 250) * k - 60 * k, width: 90 * k, transform: `translateZ(${z}px)`, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 120 * k, color: i % 2 ? OR : INK, lineHeight: 1}}>{ch}</div>
            );
          })}
        </div>
      </Abs>
      {t > 75.3 && <Row y={1200}><Chip c={GREEN} q={spring(t, 75.4)}><F n="cible" size={44} /> Impact réel sur la performance</Chip></Row>}
    </>
  );
};
const Dust: React.FC = () => {
  const t = useT();
  const words = ['poste', 'fonction', 'intitulé', 'mise en page', 'sémantique', 'définition'];
  const d = prog(t, 84.0, 85.5, easeIn);
  return (
    <>
      <Title>Des détails de <span style={{color: OR}}>sémantique</span></Title>
      {words.map((w, i) => {
        const x = 110 + (i % 2) * 460, y = 560 + Math.floor(i / 2) * 230;
        return (
          <Abs key={w} x={x} y={y} w={400} h={170}>
            <div style={{position: 'absolute', inset: 0, borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 79.6 + i * 0.35) * (1 - d), transform: `scale(${spring(t, 79.6 + i * 0.35)})`}}><T size={46} color={DIM}>{w}</T></div>
            {d > 0 && Array.from({length: 26}, (_, k) => {
              const dx = (random(`dx${i}${k}`) * 0.8 + 0.2) * 600 * d, dy = -random(`dy${i}${k}`) * 400 * d;
              return <Abs key={k} x={random(`px${i}${k}`) * 400 + dx} y={random(`py${i}${k}`) * 170 + dy} w={14} h={14} style={{background: k % 3 ? DIM : OR, borderRadius: 3, opacity: (1 - d) * 0.9}} />;
            })}
          </Abs>
        );
      })}
      {t > 84.2 && <Row y={1330}><Chip c={RED} q={spring(t, 84.3)}>Aucune valeur ajoutée</Chip></Row>}
    </>
  );
};
const Xray: React.FC = () => {
  const t = useT();
  const sx = lerp(-200, 1080, prog(t, 87.6, 90.4, easeInOut));
  const items: [string, string][] = [['cerveau', 'Compétences'], ['cible', 'Missions'], ['badge', 'Responsabilités']];
  return (
    <>
      <Title>Ce qu'il y a <span style={{color: OR}}>dedans</span></Title>
      <Abs x={190} y={520} w={700} h={760} style={{borderRadius: 24, background: '#fff', border: `6px solid ${INK}`, overflow: 'hidden', boxShadow: '0 30px 60px rgba(19,33,58,0.2)'}}>
        <Abs x={40} y={40} w={620}><T size={44}>FICHE DE … ?</T>{Array.from({length: 9}, (_, k) => <div key={k} style={{height: 18, marginTop: 34, borderRadius: 9, background: '#E3DED3', width: `${90 - (k % 3) * 18}%`}} />)}</Abs>
        <Abs x={0} y={0} w={700} h={760} style={{background: '#0D2A4A', clipPath: `inset(0 ${Math.max(0, 700 - (sx - 190) - 0)}px 0 ${Math.max(0, sx - 190 - 260)}px)`}}>
          {items.map(([ic, l], i) => (
            <Abs key={l} x={70} y={120 + i * 200} style={{display: 'flex', alignItems: 'center', gap: 26}}><F n={ic} size={110} /><T size={52} color="#7FE8FF" style={{textShadow: '0 0 18px #2BD4FF'}}>{l}</T></Abs>
          ))}
        </Abs>
      </Abs>
      <Abs x={sx - 20} y={480} w={40} h={840} style={{background: 'linear-gradient(90deg, transparent, #2BD4FF, transparent)', opacity: t < 90.6 ? 1 : 0}} />
      {t > 91.0 && <Row y={1330}><Chip c={INK} q={spring(t, 91.1)}><F n="graphique" size={44} /> Piloter l'activité</Chip></Row>}
    </>
  );
};
const Spot: React.FC = () => {
  const t = useT();
  const on = prog(t, 93.2, 94.0, easeOut);
  return (
    <>
      <Photo src="verites/plans.jpg" x={90} y={460} w={900} h={720} pos="50% 30%">
        <AbsoluteFill style={{background: `radial-gradient(ellipse 380px 300px at 450px 300px, rgba(0,0,0,0) 0%, rgba(13,20,35,${0.85 * on}) 80%)`}} />
      </Photo>
      <Abs x={0} y={1060} w={1080} style={{textAlign: 'center', opacity: pop(t, 98.3)}}><T size={66} color="#fff" style={{textShadow: '0 6px 24px rgba(0,0,0,0.8)'}}>GESTION DES <span style={{color: OR}}>COMPÉTENCES</span></T></Abs>
      <Title y={330}>Le <span style={{color: OR}}>véritable</span> enjeu</Title>
      <Row y={1250} gap={18}>
        <Chip c={BLUE} q={spring(t, 96.4)}><F n="medaille" size={42} /> Qualité</Chip>
        <Chip c={GREEN} q={spring(t, 97.1)}><F n="hausse" size={42} /> Productivité</Chip>
      </Row>
    </>
  );
};
const Tetris: React.FC = () => {
  const t = useT();
  const blocks: [number, string, string, string][] = [[102.4, 'equipe', 'Bonnes personnes', BLUE], [103.6, 'cerveau', 'Bonnes compétences', OR], [104.8, 'epingle', 'Bon endroit', GREEN], [105.7, 'chrono', 'Bon moment', VIO]];
  const clear = prog(t, 106.1, 106.5);
  return (
    <>
      <Title>La seule question <span style={{color: OR}}>qui vaille</span></Title>
      <Abs x={140} y={620} w={800} h={500} style={{borderRadius: 18, background: '#E9E4D8', border: `6px solid ${INK}`, overflow: 'hidden'}}>
        {Array.from({length: 24}, (_, k) => <Abs key={k} x={(k % 4) * 200} y={Math.floor(k / 4) * 88} w={200} h={88} style={{border: '1px solid rgba(19,33,58,0.06)'}} />)}
        {blocks.map(([at, ic, l, c], i) => {
          const drop = prog(t, at, at + 0.45, easeIn);
          const land = 500 - 200 - 8;
          return (
            <Abs key={l} x={i * 200} y={lerp(-220, land, drop)} w={200} h={200} style={{padding: 8, boxSizing: 'border-box'}}>
              <div style={{width: '100%', height: '100%', borderRadius: 14, background: c, border: `5px solid ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: `inset 0 -10px 0 rgba(0,0,0,0.15), 0 0 ${clear * 60}px #fff`, filter: `brightness(${1 + clear * 0.6})`}}>
                <F n={ic} size={74} /><T size={22} color="#fff" style={{textAlign: 'center'}}>{l}</T>
              </div>
            </Abs>
          );
        })}
        <Abs x={0} y={292} w={800} h={208} style={{background: '#fff', opacity: Math.sin(clear * Math.PI) * 0.8}} />
      </Abs>
      {t > 106.1 && <Row y={1200}><Chip c={INK} q={spring(t, 106.15)}>Ligne complète : c'est tout !</Chip></Row>}
    </>
  );
};
const P1: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      {t < 79.5 && <AbsoluteFill style={{opacity: pop(t, 71.3) * (1 - prog(t, 79.2, 79.5))}}><Anamorph /></AbsoluteFill>}
      {t >= 79.4 && t < 85.7 && <AbsoluteFill style={{opacity: pop(t, 79.4) * (1 - prog(t, 85.5, 85.7))}}><Dust /></AbsoluteFill>}
      {t >= 85.6 && t < 92.6 && <AbsoluteFill style={{opacity: pop(t, 85.6) * (1 - prog(t, 92.3, 92.6))}}><Xray /></AbsoluteFill>}
      {t >= 92.5 && t < 100.0 && <AbsoluteFill style={{opacity: pop(t, 92.5) * (1 - prog(t, 99.7, 100.0))}}><Spot /></AbsoluteFill>}
      {t >= 99.9 && <AbsoluteFill style={{opacity: pop(t, 99.9) * (1 - prog(t, 106.7, 107.0))}}><Tetris /></AbsoluteFill>}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 2 : ce que dit l'ISO 9001 ─────────── */
const Globe: React.FC<{r: number; t: number; pins?: number}> = ({r, t, pins = 0}) => {
  const rot = t * 0.8;
  const dots = Array.from({length: 90}, (_, i) => ({lon: random(`gl${i}`) * Math.PI * 2, lat: (random(`gt${i}`) - 0.5) * 2.4}));
  return (
    <svg width={r * 2 + 40} height={r * 2 + 40} viewBox={`${-r - 20} ${-r - 20} ${r * 2 + 40} ${r * 2 + 40}`} style={{overflow: 'visible'}}>
      <circle r={r} fill="#EAF2FF" stroke={INK} strokeWidth={8} />
      {Array.from({length: 6}, (_, i) => <ellipse key={i} rx={Math.abs(Math.cos(rot + (i * Math.PI) / 6)) * r} ry={r} fill="none" stroke={BLUE} strokeWidth={3} opacity={0.5} />)}
      {[-0.6, -0.3, 0, 0.3, 0.6].map((k) => <ellipse key={k} cy={k * r} rx={Math.sqrt(1 - k * k) * r} ry={Math.sqrt(1 - k * k) * r * 0.18} fill="none" stroke={BLUE} strokeWidth={3} opacity={0.45} />)}
      {dots.map((d, i) => {
        const lo = d.lon + rot;
        const front = Math.cos(lo) > 0;
        if (!front) return null;
        const x = Math.sin(lo) * Math.cos(d.lat * 0.6) * r, y = Math.sin(d.lat * 0.6) * r;
        const on = i < pins * dots.length;
        return <circle key={i} cx={x} cy={y} r={on ? 12 : 6} fill={on ? OR : INK} opacity={on ? 1 : 0.35} />;
      })}
    </svg>
  );
};
const Search: React.FC = () => {
  const t = useT();
  const q1 = 'fiche de poste', q2 = 'fiche de fonction';
  const second = t >= 118.2;
  const q = second ? q2.slice(0, Math.floor(prog(t, 118.2, 119.0) * q2.length)) : q1.slice(0, Math.floor(prog(t, 116.3, 117.3) * q1.length));
  const res = second ? t > 119.3 : t > 117.6;
  return (
    <>
      <Title>Et l'<span style={{color: BLUE}}>ISO 9001</span> dans tout ça ?</Title>
      <Abs x={90} y={540} w={900} h={640} style={{borderRadius: 28, background: '#fff', border: `5px solid ${INK}`, boxShadow: '0 30px 60px rgba(19,33,58,0.18)', overflow: 'hidden'}}>
        <div style={{height: 110, background: BLUE, display: 'flex', alignItems: 'center', padding: '0 34px', gap: 18}}><F n="livres" size={64} /><T size={44} color="#fff">Norme ISO 9001</T></div>
        <div style={{margin: 40, height: 100, borderRadius: 50, border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', padding: '0 30px', gap: 18}}><F n="loupe" size={54} /><T size={44} color={DIM}>{q}<span style={{opacity: t % 0.6 < 0.3 ? 1 : 0}}>|</span></T></div>
        {res && <Abs x={40} y={300} w={820} style={{transform: `scale(${spring(t, second ? 119.3 : 117.6)})`, transformOrigin: '0 0'}}><T size={64} color={RED}>0 résultat</T><Hand size={44} color={DIM} style={{marginTop: 18}}>« {second ? q2 : q1} » n'apparaît nulle part</Hand></Abs>}
      </Abs>
    </>
  );
};
const Precise: React.FC = () => {
  const t = useT();
  const z = prog(t, 120.0, 121.6, easeInOut);
  return (
    <>
      <Title>Par contre, <span style={{color: BLUE}}>extrêmement précise</span></Title>
      <Abs x={240} y={560} w={600} h={600}>
        {[300, 220, 140].map((r, i) => <Abs key={r} x={300 - r * (1.4 - z * 0.4)} y={300 - r * (1.4 - z * 0.4)} w={r * 2 * (1.4 - z * 0.4)} h={r * 2 * (1.4 - z * 0.4)} style={{borderRadius: '50%', border: `${6 - i}px solid ${i === 2 ? RED : INK}`, opacity: 0.85}} />)}
        <Abs x={296} y={0} w={8} h={600} style={{background: INK}} /><Abs x={0} y={296} w={600} h={8} style={{background: INK}} />
        <Abs x={240} y={240} w={120} h={120} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${z})`}}><F n="cible" size={120} /></Abs>
      </Abs>
      <Row y={1240}><Chip c={BLUE} q={spring(t, 121.9)}>Ce dont l'organisation a vraiment besoin</Chip></Row>
    </>
  );
};
const Lone: React.FC = () => {
  const t = useT();
  const no = prog(t, 130.0, 130.25, easeOut);
  return (
    <>
      <Title>L'avis d'un consultant isolé ?</Title>
      <Photo src="integration/responsable.jpg" x={260} y={560} w={560} h={640} pos="50% 30%" filter={`grayscale(1) brightness(${0.9 - no * 0.3})`}>
        <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 35%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 75%)'}} />
      </Photo>
      {no > 0 && <Abs x={320} y={760} style={{transform: `rotate(-14deg) scale(${lerp(2.2, 1, no)})`, opacity: no, padding: '14px 50px', border: `12px solid ${RED}`, borderRadius: 24}}><T size={140} color={RED}>NON</T></Abs>}
    </>
  );
};
const World: React.FC = () => {
  const t = useT();
  const pins = prog(t, 132.2, 135.6);
  const n = Math.round(pins * 200);
  return (
    <>
      <Title>Un <span style={{color: OR}}>accord mondial</span></Title>
      <Abs x={240} y={480} style={{transform: `scale(${0.7 + 0.3 * spring(t, 131.0)})`}}><Globe r={280} t={t} pins={pins} /></Abs>
      <Abs x={790} y={520} style={{opacity: pop(t, 132.2)}}><F n="poignee" size={150} /></Abs>
      <Row y={1110}><div style={{opacity: pop(t, 133.0), textAlign: 'center'}}><T size={110} color={OR}>≈ {n}</T><T size={44}>pays en consensus</T><T size={22} color={DIM} style={{marginTop: 8}}>« près de 200 pays », cité par la vidéo d'origine</T></div></Row>
      <Row y={1420} gap={14}>
        <Chip c={INK} q={spring(t, 138.6)} size={30}>Solide</Chip>
        <Chip c={BLUE} q={spring(t, 139.2)} size={30}>Reconnue partout</Chip>
        <Chip c={OR} q={spring(t, 140.3)} size={30}><F n="brique" size={36} /> Du lourd</Chip>
      </Row>
    </>
  );
};
const Bridge: React.FC = () => {
  const t = useT();
  const tl = prog(t, 143.3, 144.2, easeOut), tr = prog(t, 144.4, 145.2, easeOut);
  const deck = prog(t, 155.7, 156.6, easeInOut);
  const shine = prog(t, 157.2, 158.1);
  return (
    <>
      <Title>Deux <span style={{color: OR}}>piliers</span> fondamentaux</Title>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <rect x={0} y={1380} width={1080} height={80} fill="#BFD9F2" />
        <rect x={200} y={1380 - tl * 380} width={70} height={tl * 380} fill={OR} stroke={INK} strokeWidth={6} />
        <rect x={810} y={1380 - tr * 380} width={70} height={tr * 380} fill={BLUE} stroke={INK} strokeWidth={6} />
        <path d={`M235 ${1380 - tl * 380} Q540 ${1300 - 40} 845 ${1380 - tr * 380}`} fill="none" stroke={INK} strokeWidth={8} opacity={Math.min(tl, tr)} />
        <path d={`M40 1300 L${40 + deck * 1000} 1300`} stroke={INK} strokeWidth={26} strokeLinecap="round" />
        {deck > 0 && Array.from({length: 9}, (_, i) => <line key={i} x1={300 + i * 60} y1={1300} x2={300 + i * 60} y2={1300 - Math.sin(((i + 1) / 10) * Math.PI) * -0 - (60 + Math.abs(4 - i) * 22)} stroke={INK} strokeWidth={4} opacity={deck} />)}
      </svg>
      {t > 146.7 && (
        <Abs x={60} y={480} w={440} style={{opacity: pop(t, 146.8)}}>
          <Photo src="promo/formation-consignation.jpg" x={0} y={0} w={440} h={300} r={-2} />
          <Abs x={0} y={320} w={440} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
            {([['Compétences', 147.7], ['Formation', 148.4], ['Sensibilisation', 149.2]] as [string, number][]).map(([l, at]) => <Chip key={l} c={OR} q={spring(t, at)} size={28}>{l}</Chip>)}
          </Abs>
        </Abs>
      )}
      {t > 150.5 && (
        <Abs x={580} y={480} w={440} style={{opacity: pop(t, 150.6)}}>
          <Photo src="iso26/direction-equipe.jpg" x={0} y={0} w={440} h={300} r={2} />
          <Abs x={0} y={320} w={440} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
            {([['Responsabilités', 152.6], ['Autorités', 154.0]] as [string, number][]).map(([l, at]) => <Chip key={l} c={BLUE} q={spring(t, at)} size={28}>{l}</Chip>)}
          </Abs>
        </Abs>
      )}
      {t > 157.1 && <Abs x={0} y={1480} w={1080} style={{textAlign: 'center'}}><T size={60} style={{backgroundImage: `linear-gradient(100deg, ${INK} 0%, ${INK} ${shine * 100 - 10}%, #7FD8FF ${shine * 100}%, ${INK} ${shine * 100 + 10}%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>C'est limpide.</T></Abs>}
    </>
  );
};
const P2: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      {t < 114.1 && <AbsoluteFill style={{opacity: pop(t, 109.4) * (1 - prog(t, 113.8, 114.1))}}>
        <Title>Une référence <span style={{color: BLUE}}>internationale</span></Title>
        <Abs x={240} y={500} style={{transform: `scale(${0.6 + 0.4 * spring(t, 109.5)})`}}><Globe r={280} t={t} /></Abs>
        <Row y={1200}><Chip c={BLUE} q={spring(t, 111.0)}><F n="globe" size={44} /> Management de la qualité</Chip></Row>
      </AbsoluteFill>}
      {t >= 114.0 && t < 120.0 && <AbsoluteFill style={{opacity: pop(t, 114.0) * (1 - prog(t, 119.8, 120.0))}}><Search /></AbsoluteFill>}
      {t >= 119.9 && t < 124.3 && <AbsoluteFill style={{opacity: pop(t, 119.9) * (1 - prog(t, 124.0, 124.3))}}><Precise /></AbsoluteFill>}
      {t >= 124.2 && t < 131.0 && <AbsoluteFill style={{opacity: pop(t, 124.2) * (1 - prog(t, 130.7, 131.0))}}><Lone /></AbsoluteFill>}
      {t >= 130.9 && t < 141.5 && <AbsoluteFill style={{opacity: pop(t, 130.9) * (1 - prog(t, 141.2, 141.5))}}><World /></AbsoluteFill>}
      {t >= 141.4 && <AbsoluteFill style={{opacity: pop(t, 141.4) * (1 - prog(t, 158.1, 158.4))}}><Bridge /></AbsoluteFill>}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 3 : les exigences ─────────── */
const Jargon: React.FC = () => {
  const t = useT();
  const words = ['Exigences', 'Conformité', 'Référentiel', 'Information documentée', 'Revue', 'Processus'];
  const er = prog(t, 162.8, 164.2, easeInOut);
  const cards = ['Identifier', 'Aligner', 'Communiquer'];
  return (
    <>
      <Title>On oublie le <span style={{color: OR}}>jargon</span></Title>
      {words.map((w, i) => {
        const x = 90 + random(`jx${i}`) * 560, y = 560 + i * 120;
        const gone = er * 1100 > x - 90 ? 1 : 0;
        return <Abs key={w} x={x + Math.sin(t + i) * 14} y={y} style={{opacity: pop(t, 160.9 + i * 0.2) * (1 - gone)}}><T size={48} color={DIM} style={{fontStyle: 'italic'}}>{w}</T></Abs>;
      })}
      {er > 0 && er < 1 && <Abs x={er * 1100 - 120} y={520} w={140} h={780} style={{borderRadius: 30, background: 'linear-gradient(90deg, #F48FB1, #F06292)', border: `6px solid ${INK}`}} />}
      {t > 165.3 && (
        <Row y={700} gap={20}>
          <T size={260} color={GREEN} style={{transform: `scale(${spring(t, 165.4)})`}}>3</T>
          <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            {cards.map((c, i) => <Chip key={c} c={[OR, BLUE, GREEN][i]} q={spring(t, 165.9 + i * 0.3)}>{c}</Chip>)}
          </div>
        </Row>
      )}
      {t > 166.5 && <Row y={1180}><Hand size={56} color={DIM}>trois attentes claires et logiques</Hand></Row>}
    </>
  );
};
const ST: {a: number; at: number; l: string; c: string; img: string; ic: string}[] = [
  {a: 0, at: 172.3, l: 'Identifier', c: OR, img: 'iso26/audit-checklist.jpg', ic: 'loupe'},
  {a: 120, at: 179.0, l: 'Aligner', c: BLUE, img: 'promo/participants.jpg', ic: 'puzzle'},
  {a: 240, at: 186.2, l: 'Communiquer', c: GREEN, img: 'induction/accueil-groupe.jpg', ic: 'megaphone'},
];
const Loop: React.FC = () => {
  const t = useT();
  const cx = 540, cy = 930, rx = 360, ry = 330;
  const pos = (deg: number): [number, number] => [cx + rx * Math.sin((deg * Math.PI) / 180), cy - ry * Math.cos((deg * Math.PI) / 180)];
  let deg = 0;
  if (t < 172.3) deg = -30 + 30 * prog(t, 171.6, 172.3, easeOut);
  else if (t < 189.2) {
    const k = t < 179.0 ? 0 : t < 186.2 ? 1 : 2;
    const tgt = ST[k].at;
    deg = (k - 1) * 120 + 120 * prog(t, tgt - 0.8, tgt, easeInOut);
    if (k === 0) deg = 0;
  } else deg = 240 + (t - 189.2) * 300;
  const [tx, ty] = pos(deg);
  const cur = [...ST].reverse().find((s0) => t >= s0.at);
  const val = prog(t, 189.3, 190.0, easeOut);
  return (
    <>
      <Title>Un processus en <span style={{color: GREEN}}>trois temps</span></Title>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#D8D1C2" strokeWidth={34} />
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={INK} strokeWidth={4} strokeDasharray="18 22" strokeDashoffset={-t * 60} />
      </svg>
      {ST.map((s0) => {
        const [x, y] = pos(s0.a);
        const on = t >= s0.at;
        return (
          <Abs key={s0.l} x={x - 110} y={y - 110} w={220} h={220} style={{transform: `scale(${on ? 1 + 0.08 * Math.sin((t - s0.at) * 3) * (t - s0.at < 1.5 ? 1 : 0) : 0.8})`}}>
            <div style={{width: 220, height: 220, borderRadius: 110, overflow: 'hidden', border: `10px solid ${on ? s0.c : '#B8B0A0'}`, filter: on ? 'none' : 'grayscale(1)', boxShadow: on ? `0 0 40px ${s0.c}88` : 'none'}}><Img src={PH(s0.img)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
            <div style={{position: 'absolute', left: '50%', top: 196, transform: 'translateX(-50%)'}}><Chip c={on ? s0.c : '#9C9484'} size={28}><F n={s0.ic} size={34} /> {s0.l}</Chip></div>
          </Abs>
        );
      })}
      <Abs x={tx - 30} y={ty - 30} w={60} h={60} style={{borderRadius: 30, background: '#FFD84D', border: `6px solid ${INK}`, boxShadow: '0 0 30px #FFD84D'}} />
      <Abs x={cx - 220} y={cy - 120} w={440} h={240} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 12}}>
        {val > 0 ? (
          <div style={{transform: `scale(${spring(t, 189.3)})`}}><T size={84} color={GREEN}>VALEUR</T></div>
        ) : cur ? (
          <div key={cur.l} style={{opacity: pop(t, cur.at)}}>
            {cur.l === 'Identifier' && <Hand size={44}>Lister les compétences dont on a besoin</Hand>}
            {cur.l === 'Aligner' && <><Hand size={42}>État des lieux → combler les écarts</Hand><div style={{display: 'flex', gap: 10, justifyContent: 'center', marginTop: 10}}><Chip c={BLUE} q={spring(t, 182.1)} size={24}>Recrutement</Chip><Chip c={BLUE} q={spring(t, 183.0)} size={24}>Formation</Chip></div></>}
            {cur.l === 'Communiquer' && <Hand size={44}>Chacun au clair sur son rôle</Hand>}
          </div>
        ) : null}
      </Abs>
      {t > 190.8 && <Row y={1430}><Chip c={RED} q={spring(t, 190.9)}><F n="dossier" size={40} /> Pas un simple document</Chip></Row>}
    </>
  );
};
const P3: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      {t < 168.5 && <AbsoluteFill style={{opacity: pop(t, 160.8) * (1 - prog(t, 168.2, 168.5))}}><Jargon /></AbsoluteFill>}
      {t >= 168.4 && <AbsoluteFill style={{opacity: pop(t, 168.4) * (1 - prog(t, 191.9, 192.2))}}><Loop /></AbsoluteFill>}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 4 : au-delà de la fiche ─────────── */
const Coaster: React.FC = () => {
  const t = useT();
  const k = prog(t, 200.6, 204.4, easeInOut);
  const pts = (x: number) => 1350 - Math.max(0, Math.min(1, (x - 100) / 700)) ** 1.6 * 640;
  const cx = lerp(120, 790, k), cy = pts(cx);
  const ang = Math.atan2(pts(cx + 10) - pts(cx - 10), 20) * (180 / Math.PI);
  const shake = t > 203.9 ? Math.sin(t * 50) * 4 : 0;
  return (
    <>
      <Title>La plus grande <span style={{color: VIO}}>révélation</span></Title>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={Array.from({length: 60}, (_, i) => { const x = 60 + i * 15; return `${i ? 'L' : 'M'}${x} ${pts(x)}`; }).join(' ')} fill="none" stroke={INK} strokeWidth={14} />
        {Array.from({length: 14}, (_, i) => { const x = 100 + i * 60; return <line key={i} x1={x} y1={pts(x)} x2={x} y2={1420} stroke="#B8B0A0" strokeWidth={6} />; })}
        <path d={`M790 ${pts(790)} Q880 ${pts(790) - 40} 930 1300`} fill="none" stroke={INK} strokeWidth={14} strokeDasharray="20 18" opacity={0.5} />
      </svg>
      <Abs x={cx - 80 + shake} y={cy - 110} w={160} h={100} style={{transform: `rotate(${ang}deg)`, transformOrigin: '80px 100px'}}>
        <div style={{width: 160, height: 80, borderRadius: '20px 20px 10px 10px', background: VIO, border: `6px solid ${INK}`}} />
        <div style={{position: 'absolute', left: 30, top: -40}}><F n="anxieux" size={70} /></div>
      </Abs>
      {t > 203.9 && <Row y={1460}><Chip c={VIO} q={spring(t, 204.0)}>Accrochez-vous bien…</Chip></Row>}
    </>
  );
};
const Switch: React.FC = () => {
  const t = useT();
  const k = prog(t, 208.6, 208.95, easeInOut);
  return (
    <>
      <Title>La fiche de poste, c'est…</Title>
      <Abs x={140} y={640} w={800} h={300} style={{borderRadius: 150, background: lerp(0, 1, k) > 0.5 ? GREEN : RED, border: `10px solid ${INK}`, boxShadow: 'inset 0 10px 0 rgba(0,0,0,0.15)'}}>
        <Abs x={lerp(20, 500, k)} y={20} w={260} h={240} style={{borderRadius: 130, background: '#fff', border: `8px solid ${INK}`, boxShadow: '0 12px 20px rgba(0,0,0,0.25)'}} />
      </Abs>
      <Abs x={140} y={980} w={380} style={{textAlign: 'center', opacity: 1 - k * 0.6}}><T size={52} color={RED} style={{textDecoration: k > 0.5 ? 'line-through' : 'none'}}>OBLIGATION</T></Abs>
      <Abs x={560} y={980} w={380} style={{textAlign: 'center', opacity: 0.35 + k * 0.65, transform: `scale(${1 + 0.15 * k})`}}><T size={60} color={GREEN}>OPTION</T></Abs>
      {k > 0.5 && Array.from({length: 14}, (_, i) => { const a = (i / 14) * Math.PI * 2, d = prog(t, 208.9, 209.5) * 180; return <Abs key={i} x={790 + Math.cos(a) * d} y={790 + Math.sin(a) * d} w={16} h={16} style={{borderRadius: 8, background: [GREEN, OR, '#FFD84D'][i % 3], opacity: 1 - prog(t, 209.2, 209.6)}} />; })}
    </>
  );
};
const Toolbox: React.FC = () => {
  const t = useT();
  const o = prog(t, 210.6, 211.8, easeOut);
  const c1 = prog(t, 217.9, 218.3), c2 = prog(t, 219.6, 220.0);
  return (
    <>
      <Title>Un outil parmi d'autres</Title>
      <Abs x={240} y={680} w={600} h={360}>
        <Abs x={0} y={160} w={600} h={200} style={{borderRadius: 18, background: '#C0392B', border: `8px solid ${INK}`}} />
        <Abs x={-lerp(0, 120, o)} y={160 - lerp(0, 150, o)} w={300} h={90} style={{borderRadius: 14, background: '#E74C3C', border: `7px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10}}><F n="dossier" size={56} /><F n="tournevis" size={56} /></Abs>
        <Abs x={300 + lerp(0, 120, o)} y={160 - lerp(0, 150, o)} w={300} h={90} style={{borderRadius: 14, background: '#E74C3C', border: `7px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10}}><F n="calendrier" size={56} /><F n="clipboard" size={56} /></Abs>
        <Abs x={-lerp(0, 220, o)} y={160 - lerp(0, 300, o)} w={300} h={90} style={{borderRadius: 14, background: '#E74C3C', border: `7px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: o}}><F n="equipe" size={56} /><F n="memo" size={56} /></Abs>
        <Abs x={300 + lerp(0, 220, o)} y={160 - lerp(0, 300, o)} w={300} h={90} style={{borderRadius: 14, background: '#E74C3C', border: `7px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: o}}><F n="graphique" size={56} /><F n="puzzle" size={56} /></Abs>
      </Abs>
      {t > 213.3 && <Abs x={260} y={1080} style={{transform: `rotate(-6deg) scale(${lerp(1.8, 1, pop(t, 213.4, 0.25))})`, opacity: pop(t, 213.4, 0.25), padding: '10px 30px', border: `8px solid ${RED}`, borderRadius: 18}}><T size={46} color={RED}>AUCUNE NORME NE L'IMPOSE</T></Abs>}
      {t > 216.6 && (
        <Abs x={160} y={1230} w={760} style={{display: 'flex', flexDirection: 'column', gap: 18, opacity: pop(t, 216.7)}}>
          <T size={36} color={DIM}>CE QUI EST EXIGÉ : LE RÉSULTAT</T>
          {([['Compétences maîtrisées', c1], ['Responsabilités claires', c2]] as [string, number][]).map(([l, c]) => (
            <div key={l} style={{display: 'flex', alignItems: 'center', gap: 20}}>
              <div style={{width: 64, height: 64, borderRadius: 14, border: `6px solid ${INK}`, background: c > 0 ? GREEN : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={46} color="#fff" style={{transform: `scale(${c})`}}>✓</T></div>
              <T size={44}>{l}</T>
            </div>
          ))}
        </Abs>
      )}
    </>
  );
};
const Agile: React.FC = () => {
  const t = useT();
  return (
    <>
      <Title>Rigide <span style={{color: DIM}}>ou</span> <span style={{color: GREEN}}>agile</span> ?</Title>
      <Abs x={80} y={620} w={420} style={{opacity: pop(t, 225.3)}}>
        <div style={{height: 120, borderRadius: 12, background: 'linear-gradient(180deg, #C9CED6, #8E96A3)', border: `6px solid ${INK}`}} />
        {[0, 1].map((i) => <div key={i} style={{position: 'absolute', left: 40 + i * 300, top: -120, width: 20, height: 120, background: `repeating-linear-gradient(180deg, ${INK} 0 16px, transparent 16px 26px)`}} />)}
        <T size={40} style={{marginTop: 30, textAlign: 'center'}}>Un seul document rigide</T>
      </Abs>
      <Abs x={560} y={560} w={460} h={300} style={{opacity: pop(t, 228.1)}}>
        <svg width={460} height={260}><path d={Array.from({length: 46}, (_, i) => `${i ? 'L' : 'M'}${i * 10} ${130 + Math.sin(i * 0.35 + t * 4) * 70}`).join(' ')} fill="none" stroke={GREEN} strokeWidth={40} strokeLinecap="round" /></svg>
        <T size={40} color={GREEN} style={{textAlign: 'center'}}>Des outils agiles et adaptés</T>
      </Abs>
      <Row y={1150}><Photo src="iso26/tablette-matrice.jpg" x={-380} y={0} w={760} h={300} q={pop(t, 228.5)} /></Row>
    </>
  );
};
const TOOLS: [number, string, string, string][] = [
  [231.4, 'promo/audit-reunion.jpg', 'Entretiens individuels', BLUE],
  [233.4, 'docs5/procedures.jpg', 'Procédures claires', OR],
  [234.7, 'arsenal/cartographie.jpg', 'Grilles de polyvalence', GREEN],
  [236.0, 'iso26/analyste-kpi.jpg', 'Cartographies de compétences', VIO],
  [237.4, 'iso26/ecrans-referentiels.jpg', 'Organigramme bien fait', INK],
];
const Tools: React.FC = () => {
  const t = useT();
  return (
    <>
      <Title>Dans la <span style={{color: VIO}}>boîte à outils</span></Title>
      {TOOLS.map(([at, src, l, c], i) => {
        const x = i < 4 ? 70 + (i % 2) * 480 : 310, y = 470 + Math.floor(i / 2) * 330;
        const p = spring(t, at);
        return (
          <Abs key={l} x={x} y={y} w={460} h={300} style={{transform: `scale(${p}) rotate(${(i % 2 ? 1.5 : -1.5)}deg)`}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: 22, overflow: 'hidden', border: `6px solid ${c}`, boxShadow: '0 20px 40px rgba(19,33,58,0.25)'}}><Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
            <div style={{position: 'absolute', left: 14, bottom: 14, padding: '8px 16px', borderRadius: 12, background: c}}><T size={26} color="#fff">{l}</T></div>
          </Abs>
        );
      })}
    </>
  );
};
const Tailor: React.FC = () => {
  const t = useT();
  const x = prog(t, 241.0, 241.4);
  const m = prog(t, 242.4, 243.8, easeInOut);
  return (
    <>
      <Title>Pas de <span style={{color: RED}}>recette</span> toute faite</Title>
      <Abs x={140} y={560} w={420} h={480} style={{borderRadius: 18, background: '#FFFDF6', border: `5px solid ${INK}`, padding: 30, boxSizing: 'border-box', transform: 'rotate(-4deg)'}}>
        <T size={40}>Recette universelle</T>
        {Array.from({length: 5}, (_, k) => <div key={k} style={{height: 14, marginTop: 30, borderRadius: 7, background: '#E3DED3', width: `${85 - k * 9}%`}} />)}
        <svg width={420} height={480} style={{position: 'absolute', inset: 0}}><path d="M40 40 L380 440 M380 40 L40 440" stroke={RED} strokeWidth={16} strokeLinecap="round" strokeDasharray={520} strokeDashoffset={520 * (1 - x)} /></svg>
      </Abs>
      <Abs x={560} y={560} w={420} h={480}>
        <svg width={420} height={480}>
          <path d="M210 60 C 380 60 380 260 210 260 C 40 260 40 440 210 440" fill="none" stroke="#FFD84D" strokeWidth={46} strokeDasharray={900} strokeDashoffset={900 * (1 - m)} />
          <path d="M210 60 C 380 60 380 260 210 260 C 40 260 40 440 210 440" fill="none" stroke={INK} strokeWidth={4} strokeDasharray="4 20" strokeDashoffset={900 * (1 - m)} opacity={m} />
        </svg>
      </Abs>
      {t > 242.5 && <Row y={1120}><Chip c={GREEN} q={spring(t, 242.6)}><F n="equerre" size={44} /> Sur mesure, selon sa situation</Chip></Row>}
    </>
  );
};
const P4: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      {t < 200.6 && <AbsoluteFill style={{opacity: pop(t, 194.7) * (1 - prog(t, 200.3, 200.6))}}>
        <Title>Le processus, pas le nom</Title>
        <Abs x={240} y={560} w={600} h={460} style={{borderRadius: '0 24px 24px 24px', background: '#E9C892', border: `6px solid ${INK}`}}>
          <Abs x={150} y={150} w={300} h={110} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={40} color={DIM}>NOM ?</T></Abs>
          <svg width={600} height={460} style={{position: 'absolute', inset: 0}}><path d="M150 205 L450 205" stroke={RED} strokeWidth={14} strokeDasharray={300} strokeDashoffset={300 * (1 - prog(t, 196.3, 196.8))} /></svg>
        </Abs>
        <Row y={1100}><Chip c={GREEN} q={spring(t, 194.8)}><F n="engrenage" size={44} /> Le processus d'abord</Chip></Row>
        {t > 198.2 && <Row y={1230}><Hand size={56} color={VIO}>… en pratique, concrètement</Hand></Row>}
      </AbsoluteFill>}
      {t >= 200.5 && t < 205.6 && <AbsoluteFill style={{opacity: pop(t, 200.5) * (1 - prog(t, 205.3, 205.6))}}><Coaster /></AbsoluteFill>}
      {t >= 205.5 && t < 210.4 && <AbsoluteFill style={{opacity: pop(t, 205.5) * (1 - prog(t, 210.1, 210.4))}}><Switch /></AbsoluteFill>}
      {t >= 210.3 && t < 222.9 && <AbsoluteFill style={{opacity: pop(t, 210.3) * (1 - prog(t, 222.6, 222.9))}}><Toolbox /></AbsoluteFill>}
      {t >= 222.8 && t < 231.4 && <AbsoluteFill style={{opacity: pop(t, 222.8) * (1 - prog(t, 231.1, 231.4))}}><Agile /></AbsoluteFill>}
      {t >= 231.3 && t < 239.9 && <AbsoluteFill style={{opacity: pop(t, 231.3) * (1 - prog(t, 239.6, 239.9))}}><Tools /></AbsoluteFill>}
      {t >= 239.8 && <AbsoluteFill style={{opacity: pop(t, 239.8) * (1 - prog(t, 245.6, 245.9))}}><Tailor /></AbsoluteFill>}
    </AbsoluteFill>
  );
};

/* ─────────── Final ─────────── */
const Final: React.FC = () => {
  const t = useT();
  const flow = prog(t, 255.6, 258.4, easeInOut);
  const lv = 1 - flow * 0.8, rv = 0.2 + flow * 0.8;
  return (
    <AbsoluteFill>
      {t < 249.3 && <AbsoluteFill style={{opacity: pop(t, 246.0) * (1 - prog(t, 249.0, 249.3))}}>
        <Title>La seule question <span style={{color: OR}}>qui compte</span></Title>
        <Abs x={0} y={620} w={1080} style={{display: 'flex', justifyContent: 'center', transform: `scale(${0.6 + 0.6 * prog(t, 246.2, 249.2, easeOut)})`}}><F n="yeux" size={360} /></Abs>
        {t > 248.3 && <Row y={1200}><Hand size={60} color={DIM}>là, sous nos yeux</Hand></Row>}
      </AbsoluteFill>}
      {t >= 249.2 && t < 259.7 && <AbsoluteFill style={{opacity: pop(t, 249.2) * (1 - prog(t, 259.4, 259.7))}}>
        <Title>Où investir <span style={{color: OR}}>temps et énergie</span> ?</Title>
        {([[60, 'docs5/dossiers-bleus.jpg', 'Documents administratifs', RED, lv, 252.1], [560, 'induction/briefing-atelier.jpg', 'Développement des compétences', GREEN, rv, 254.8]] as [number, string, string, string, number, number][]).map(([x, src, l, c, v, at]) => (
          <Abs key={l} x={x} y={470} w={460} style={{opacity: pop(t, at - 0.6)}}>
            <Photo src={src} x={0} y={0} w={460} h={300} />
            <Abs x={0} y={320} w={460} style={{textAlign: 'center'}}><T size={32} color={c}>{l}</T></Abs>
            <Abs x={150} y={420} w={160} h={420} style={{borderRadius: 30, border: `8px solid ${INK}`, overflow: 'hidden', background: '#fff'}}>
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: `${v * 100}%`, background: `linear-gradient(180deg, ${c}, ${c}CC)`}} />
              <Abs x={50} y={-34} w={60} h={34} style={{background: INK, borderRadius: '10px 10px 0 0'}} />
            </Abs>
          </Abs>
        ))}
        {flow > 0 && flow < 1 && Array.from({length: 10}, (_, i) => { const k = (flow * 3 + i / 10) % 1; return <Abs key={i} x={lerp(380, 700, k)} y={1100 - Math.sin(k * Math.PI) * 220} w={26} h={26} style={{borderRadius: 13, background: '#FFD84D', border: `3px solid ${INK}`}} />; })}
        {t > 257.9 && <Row y={1400}><Chip c={GREEN} q={spring(t, 258.0)}><F n="trophee" size={44} /> Le succès de l'entreprise</Chip></Row>}
      </AbsoluteFill>}
      {t >= 259.6 && <AbsoluteFill style={{opacity: pop(t, 259.6)}}>
        <Title>Le message de l'<span style={{color: BLUE}}>ISO 9001</span></Title>
        <Abs x={330} y={480} w={420} h={420} style={{borderRadius: 210, border: `14px dashed ${BLUE}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `rotate(${lerp(-30, -8, pop(t, 260.7))}deg) scale(${lerp(1.6, 1, pop(t, 260.7, 0.3))})`, opacity: pop(t, 260.7, 0.3), background: '#EAF2FF'}}>
          <T size={46} color={BLUE}>ISO</T><T size={100} color={BLUE}>9001</T>
        </Abs>
        <Row y={960} gap={16}>
          <Chip c={OR} q={spring(t, 262.2)}><F n="ampoule" size={44} /> Le bon sens</Chip>
          <Chip c={GREEN} q={spring(t, 264.0)}>✓ La deuxième option</Chip>
        </Row>
        <Abs x={0} y={1120} w={1080} style={{display: 'flex', justifyContent: 'center', transform: `scale(${pop(t, 262.8)})`}}><Tag w={560} peel={prog(t, 263.0, 264.0, easeInOut)} /></Abs>
        {t > 265.0 && <Row y={1380}><Hand size={66} color={DIM}>À méditer, n'est-ce pas ?</Hand></Row>}
      </AbsoluteFill>}
    </AbsoluteFill>
  );
};

/* ─────────── En-tête, fond, sortie ─────────── */
const Header: React.FC = () => {
  const t = useT();
  const p = PT.find((x) => t >= x.at + WIPE - 0.3 && t < x.end);
  const intro = t > 2.6 && t < 68.8;
  const fin = t > 246.0;
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 80, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(19,33,58,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {(intro || p || fin) && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 222, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: intro ? pop(t, 2.6) * (1 - prog(t, 68.4, 68.8)) : p ? pop(t, p.at + WIPE - 0.3) * (1 - prog(t, p.end - 0.3, p.end)) : pop(t, 246.0)}}>
          <Tag w={150} peel={p ? p.n / 4 : fin ? 1 : 0} />
          <div style={{padding: '6px 20px', borderRadius: 40, background: '#fff', border: `3px solid ${p ? p.c : INK}`}}><T size={30}>{p ? `${p.n}. ${p.l}` : fin ? 'Le mot de la fin' : 'Fiche de poste ou de fonction ?'}</T></div>
        </div>
      )}
    </AbsoluteFill>
  );
};
const Bg: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{background: PAPER}}>
      <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(19,33,58,0.07) 2px, transparent 2px)', backgroundSize: '36px 36px', backgroundPosition: `0 ${(t * 6) % 36}px`}} />
      <div style={{position: 'absolute', right: -160, top: 300 + Math.sin(t * 0.3) * 40, width: 420, height: 420, borderRadius: 210, background: `${OR}14`}} />
      <div style={{position: 'absolute', left: -140, top: 1250 + Math.cos(t * 0.25) * 40, width: 360, height: 360, borderRadius: 180, background: `${BLUE}10`}} />
    </AbsoluteFill>
  );
};
const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...Array.from({length: 7}, (_, k) => ({at: 2.6 + k * 0.62, s: 'sfx/click', v: 0.3})), {at: 4.2, s: 'sfx/pop', v: 0.3},
  ...rep(7.0, 9, 0.07, 'tick', 0.2), ...rep(8.2, 10, 0.06, 'tick', 0.2), {at: 9.6, s: 'sfx/whoosh', v: 0.3}, {at: 11.2, s: 'sfx/thud', v: 0.5}, {at: 11.22, s: 'deep-hit', v: 0.35},
  {at: 12.6, s: 'soft-whoosh', v: 0.35, dur: 2}, {at: 15.7, s: 'bass-hit', v: 0.35}, {at: 16.2, s: 'page', v: 0.45}, {at: 17.3, s: 'sfx/pop', v: 0.3},
  {at: 19.6, s: 'sfx/whoosh', v: 0.3}, {at: 22.3, s: 'tension', v: 0.15, dur: 1.5}, {at: 24.3, s: 'sfx/pop', v: 0.3}, {at: 25.5, s: 'sfx/pop', v: 0.3},
  {at: 26.1, s: 'page', v: 0.35}, ...[27.4, 28.7, 30.0].map((at) => ({at, s: 'stylo', v: 0.3})), {at: 32.8, s: 'sfx/thud', v: 0.35}, {at: 33.3, s: 'alarme', v: 0.12, dur: 0.6},
  {at: 37.5, s: 'sfx/whoosh', v: 0.3}, ...rep(38.3, 14, 0.32, 'tick', 0.14), {at: 45.2, s: 'cadenas', v: 0.45}, {at: 47.3, s: 'sfx/pop', v: 0.3}, {at: 49.2, s: 'validation', v: 0.3},
  {at: 50.9, s: 'sfx/whoosh', v: 0.3}, ...rep(54.0, 8, 0.3, 'sfx/click', 0.2), {at: 57.0, s: 'deep-hit', v: 0.4}, {at: 57.7, s: 'sfx/thud', v: 0.4},
  {at: 58.3, s: 'sfx/whoosh', v: 0.3}, ...[58.6, 59.1, 59.6].map((at) => ({at, s: 'sfx/pop', v: 0.28})), ...rep(62.7, 5, 0.18, 'tick', 0.22), {at: 67.0, s: 'sfx/thud', v: 0.4}, {at: 67.1, s: 'deep-hit', v: 0.35},
  ...PT.flatMap((p) => [{at: p.at, s: 'sfx/whoosh', v: 0.45}, {at: p.at + 0.4, s: 'sfx/thud', v: 0.3}, {at: p.at + 0.45, s: 'page', v: 0.45}, {at: p.at + WIPE - 0.7, s: 'page', v: 0.35}, {at: p.at + WIPE - 0.35, s: 'sfx/swish', v: 0.4}]),
  {at: 72.3, s: 'soft-whoosh', v: 0.4, dur: 3}, {at: 75.3, s: 'sfx/ding', v: 0.3}, {at: 75.4, s: 'validation', v: 0.25},
  ...rep(79.6, 6, 0.35, 'sfx/pop', 0.22), {at: 84.0, s: 'soft-whoosh', v: 0.45, dur: 1.5}, {at: 84.3, s: 'sfx/pop', v: 0.25},
  {at: 85.6, s: 'sfx/whoosh', v: 0.3}, {at: 87.6, s: 'tension', v: 0.12, dur: 3}, {at: 91.1, s: 'sfx/pop', v: 0.3},
  {at: 93.2, s: 'deep-hit', v: 0.35}, {at: 96.4, s: 'sfx/pop', v: 0.28}, {at: 97.1, s: 'sfx/pop', v: 0.28}, {at: 98.3, s: 'sfx/rise', v: 0.25},
  ...[102.85, 104.05, 105.25, 106.15].map((at) => ({at, s: 'sfx/thud', v: 0.35})), {at: 106.1, s: 'sfx/ding', v: 0.3}, {at: 106.2, s: 'validation', v: 0.3},
  {at: 109.4, s: 'soft-whoosh', v: 0.35, dur: 2}, {at: 111.0, s: 'sfx/pop', v: 0.28}, {at: 114.0, s: 'sfx/whoosh', v: 0.3}, ...rep(116.3, 14, 0.07, 'tick', 0.18), {at: 117.6, s: 'notification', v: 0.3}, ...rep(118.2, 16, 0.05, 'tick', 0.18), {at: 119.3, s: 'notification', v: 0.3},
  {at: 120.0, s: 'sfx/rise', v: 0.25}, {at: 121.6, s: 'sfx/click', v: 0.35}, {at: 121.9, s: 'sfx/pop', v: 0.25}, {at: 124.2, s: 'sfx/whoosh', v: 0.3}, {at: 130.0, s: 'tampon', v: 0.55},
  {at: 131.0, s: 'sfx/whoosh', v: 0.3}, ...rep(132.2, 17, 0.2, 'sfx/pop', 0.12), {at: 135.7, s: 'sfx/ding', v: 0.25}, {at: 138.6, s: 'sfx/pop', v: 0.28}, {at: 139.2, s: 'sfx/pop', v: 0.28}, {at: 140.3, s: 'sfx/thud', v: 0.45}, {at: 140.32, s: 'deep-hit', v: 0.35},
  {at: 141.4, s: 'sfx/whoosh', v: 0.3}, {at: 143.3, s: 'sfx/rise', v: 0.25}, {at: 144.4, s: 'sfx/rise', v: 0.25}, {at: 146.8, s: 'sfx/whoosh', v: 0.25}, ...[147.7, 148.4, 149.2, 152.6, 154.0].map((at) => ({at, s: 'sfx/pop', v: 0.25})), {at: 150.6, s: 'sfx/whoosh', v: 0.25},
  {at: 155.7, s: 'soft-whoosh', v: 0.35, dur: 1}, {at: 156.6, s: 'sfx/thud', v: 0.3}, {at: 157.2, s: 'sfx/ding', v: 0.25},
  ...rep(160.9, 6, 0.2, 'sfx/pop', 0.18), {at: 162.8, s: 'soft-whoosh', v: 0.4, dur: 1.4}, {at: 165.4, s: 'bass-hit', v: 0.35}, ...[165.9, 166.2, 166.5].map((at) => ({at, s: 'sfx/pop', v: 0.28})),
  {at: 168.4, s: 'sfx/whoosh', v: 0.3}, ...ST.flatMap((s0) => [{at: s0.at - 0.8, s: 'sfx/swish', v: 0.3}, {at: s0.at, s: 'sfx/ding', v: 0.3}]), {at: 182.1, s: 'sfx/pop', v: 0.25}, {at: 183.0, s: 'sfx/pop', v: 0.25},
  {at: 189.2, s: 'sfx/rise', v: 0.3}, {at: 189.3, s: 'validation', v: 0.3}, {at: 190.9, s: 'sfx/pop', v: 0.28},
  {at: 194.8, s: 'sfx/pop', v: 0.28}, {at: 196.3, s: 'stylo', v: 0.35}, {at: 200.6, s: 'tension', v: 0.18, dur: 3.6}, ...rep(200.7, 18, 0.2, 'tick', 0.18), {at: 204.0, s: 'deep-hit', v: 0.3},
  {at: 205.5, s: 'sfx/whoosh', v: 0.3}, {at: 208.6, s: 'sfx/click', v: 0.55}, {at: 208.9, s: 'validation', v: 0.35}, {at: 208.95, s: 'sfx/ding', v: 0.25},
  {at: 210.6, s: 'cadenas', v: 0.35}, {at: 211.2, s: 'sfx/swish', v: 0.3}, {at: 213.4, s: 'tampon', v: 0.5}, {at: 216.7, s: 'sfx/pop', v: 0.25}, {at: 217.9, s: 'stylo', v: 0.3}, {at: 218.0, s: 'sfx/ding', v: 0.22}, {at: 219.6, s: 'stylo', v: 0.3}, {at: 219.7, s: 'sfx/ding', v: 0.22},
  {at: 222.8, s: 'sfx/whoosh', v: 0.3}, {at: 225.3, s: 'sfx/thud', v: 0.35}, {at: 228.1, s: 'soft-whoosh', v: 0.3, dur: 1.2},
  ...TOOLS.map(([at]) => ({at, s: 'sfx/pop', v: 0.3})), {at: 239.8, s: 'sfx/whoosh', v: 0.3}, {at: 241.0, s: 'stylo', v: 0.35}, {at: 242.4, s: 'sfx/swish', v: 0.3}, {at: 242.6, s: 'sfx/pop', v: 0.28},
  {at: 246.0, s: 'soft-whoosh', v: 0.35, dur: 2}, {at: 249.2, s: 'sfx/whoosh', v: 0.3}, {at: 251.5, s: 'sfx/pop', v: 0.25}, {at: 254.2, s: 'sfx/pop', v: 0.25}, {at: 255.6, s: 'sfx/rise', v: 0.3}, {at: 258.0, s: 'validation', v: 0.3},
  {at: 259.6, s: 'sfx/whoosh', v: 0.3}, {at: 260.7, s: 'tampon', v: 0.5}, {at: 262.2, s: 'sfx/pop', v: 0.28}, {at: 263.0, s: 'page', v: 0.4}, {at: 264.0, s: 'sfx/ding', v: 0.3}, {at: 265.1, s: 'sfx/pop', v: 0.2},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const FichePoste: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.0} to={69.2}><Intro /></Gate>
    <Gate from={71.3} to={107.1}><P1 /></Gate>
    <Gate from={109.4} to={158.5}><P2 /></Gate>
    <Gate from={160.8} to={192.3}><P3 /></Gate>
    <Gate from={194.7} to={246.0}><P4 /></Gate>
    <Gate from={246.0} to={OUTRO_AT}><Final /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><FolderWipe p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.3} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-fiche-poste-origine.m4a')} trimAfter={s(267.9)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

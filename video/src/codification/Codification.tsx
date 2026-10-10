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
 * « Codifier ses documents QHSE » (5 min 34) — voix d'origine (la source s'interrompt au début de la partie outils :
 * la voix s'arrête net à la fin d'une phrase), sous-titres recalés mot à mot, photos réelles pour la pyramide
 * documentaire. Fil rouge inédit : une étiqueteuse qui imprime le code de chaque partie, et des transitions en
 * « dossier suspendu » qui s'ouvre. Autres techniques nouvelles : bazar de fichiers qui se range tout seul en grille,
 * explorateur de fichiers qui déborde, cascade de boîtes de dialogue d'erreur, carte d'identité qui sort d'une
 * imprimante, touches de clavier, clé de voûte ISO 9001, classeur à onglets, pyramide de photos réelles construite
 * niveau par niveau, scanner d'empreinte, chaîne des versions, afficheur à palettes (split-flap), compteur qui
 * s'incrémente, lexique en dictionnaire, puzzle « moitié du travail », nom de fichier assemblé en wagons, terminal qui
 * nettoie un nom en direct, liste qui se trie toute seule par date, fichier vu aux rayons X, rideau avant / après.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 333.8;
export const CODIFICATION_FRAMES = s(OUTRO_AT + 3.8);
const BG = '#10203A';
const INK = '#14213A';
const LIGHT = '#F5F8FF';
const DIM = 'rgba(245,248,255,0.65)';
const ORA = '#FF8A1F';
const TEAL = '#19C3B1';
const YEL = '#FFD54A';
const RED = '#FF5A5A';
const BLUE = '#5AA9FF';
const PAPER = '#FBF6EA';
const MONO = '"DejaVu Sans Mono", "Courier New", monospace';

type Pt = {n: number; l: string; code: string; at: number; end: number; c: string};
const PT: Pt[] = [
  {n: 1, l: 'La pyramide documentaire', code: 'P1_PYRAMIDE', at: 90.4, end: 140.8, c: TEAL},
  {n: 2, l: 'Comment codifier', code: 'P2_CODE_UNIQUE', at: 140.9, end: 210.2, c: ORA},
  {n: 3, l: 'Comment nommer', code: 'P3_NOMMAGE', at: 210.3, end: 318.0, c: BLUE},
  {n: 4, l: 'Outils et pratiques', code: 'P4_OUTILS', at: 318.1, end: 333.7, c: YEL},
];
const WIPE = 2.4;

const pop = (t: number, at: number, d = 0.4) => prog(t, at, at + d, easeOut);
const spring = (t: number, at: number, k = 7, w = 15) => {
  const x = t - at;
  return x <= 0 ? 0 : 1 - Math.exp(-x * k) * Math.cos(x * w);
};
const win = (t: number, a: number, b: number, f = 0.4) => prog(t, a, a + f) * (1 - prog(t, b - f, b));
const typed = (str: string, t: number, at: number, cps = 26) => str.slice(0, Math.max(0, Math.floor((t - at) * cps)));
const T: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 40, color = LIGHT, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, letterSpacing: -0.5, lineHeight: 1.05, ...style}}>{children}</div>
);
const Hand: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 48, color = LIGHT, style}) => (
  <div style={{fontFamily: handFont, fontSize: size, color, lineHeight: 1.1, ...style}}>{children}</div>
);
const Mono: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 34, color = LIGHT, style}) => (
  <div style={{fontFamily: MONO, fontWeight: 700, fontSize: size, color, letterSpacing: 0, whiteSpace: 'pre', ...style}}>{children}</div>
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
const Photo: React.FC<{src: string; x: number; y: number; w: number; h: number; q?: number; r?: number; pos?: string; children?: React.ReactNode; filter?: string}> = ({src, x, y, w, h, q = 1, r = 0, pos = 'center', children, filter}) => {
  const t = useT();
  return (
    <Abs x={x} y={y} w={w} h={h} style={{borderRadius: 30, overflow: 'hidden', border: '6px solid rgba(255,255,255,0.92)', boxShadow: '0 30px 60px rgba(0,0,0,0.45)', transform: `scale(${q}) rotate(${r}deg)`}}>
      <Img src={src} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${1.05 + (t % 30) * 0.004})`, filter}} />
      {children}
    </Abs>
  );
};
/** Icône de fichier (page cornée) avec extension. */
const FileIco: React.FC<{w?: number; c?: string; ext?: string; style?: React.CSSProperties}> = ({w = 90, c = BLUE, ext = 'DOC', style}) => (
  <div style={{position: 'relative', width: w, height: w * 1.25, ...style}}>
    <svg width={w} height={w * 1.25} viewBox="0 0 80 100"><path d="M6 2 H54 L76 24 V96 a2 2 0 0 1 -2 2 H6 a2 2 0 0 1 -2 -2 V4 a2 2 0 0 1 2 -2 Z" fill="#fff" stroke="#C9D3E6" strokeWidth={2} /><path d="M54 2 V24 H76" fill="#E3E9F5" /><rect x={4} y={62} width={56} height={22} rx={4} fill={c} /></svg>
    <div style={{position: 'absolute', left: w * 0.05, top: w * 0.8, width: w * 0.7, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: w * 0.17, color: '#fff'}}>{ext}</div>
  </div>
);
/** Ruban d'étiqueteuse : le fil rouge de la vidéo. */
const Label: React.FC<{text: string; p: number; size?: number; c?: string}> = ({text, p, size = 40, c = YEL}) => (
  <div style={{display: 'inline-block', clipPath: `inset(-20px ${(1 - p) * 100}% -20px -20px)`}}>
    <div style={{display: 'inline-block', padding: '10px 26px', background: c, borderRadius: 6, boxShadow: '0 8px 18px rgba(0,0,0,0.35)', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.04) 0 2px, transparent 2px 6px)'}}>
      <Mono size={size} color={INK}>{text}</Mono>
    </div>
  </div>
);

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: BG, opacity: 1 - out}}>
      <Img src={staticFile('verites/ecriture.jpg')} style={{position: 'absolute', left: -300, top: 0, width: 1680, height: 1920, objectFit: 'cover', filter: 'saturate(0.8)'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${BG}DD 0%, ${BG}66 28%, ${BG}DD 50%, ${BG} 72%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      {/* dossier suspendu ouvert avec étiquette */}
      <Abs x={140} y={620} w={800} h={420}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 300, height: 70, borderRadius: '20px 20px 0 0', background: ORA}} />
        <div style={{position: 'absolute', left: 0, top: 60, width: 800, height: 360, borderRadius: '0 24px 24px 24px', background: ORA, boxShadow: '0 30px 60px rgba(0,0,0,0.5)'}} />
        {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 60 + k * 230, top: 20 - k * 6, transform: `rotate(${(k - 1) * 5}deg)`}}><FileIco w={150} c={[TEAL, BLUE, RED][k]} ext={['PR', 'MO', 'RE'][k]} /></div>)}
        <div style={{position: 'absolute', left: -10, top: 210, width: 820, height: 210, borderRadius: 24, background: '#E07612'}} />
        <div style={{position: 'absolute', left: 0, top: 250, width: 800, textAlign: 'center'}}><Label text="PR-QHSE-001" p={1} size={58} /></div>
      </Abs>
      <Abs x={60} y={1120} w={960} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: TEAL, color: INK, fontFamily: sansFont, fontWeight: 800, fontSize: 32, letterSpacing: 3}}>MAÎTRISE DOCUMENTAIRE</div>
        <T size={118} style={{marginTop: 20, textTransform: 'uppercase', letterSpacing: -3}}>Codifier ses</T>
        <T size={118} color={ORA} style={{textTransform: 'uppercase', letterSpacing: -3}}>documents QHSE</T>
        <Hand size={54} color={DIM} style={{marginTop: 16}}>numéroter, nommer, retrouver en 1 seconde</Hand>
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : le dossier suspendu qui s'ouvre ─────────── */
const FolderWipe: React.FC<{p: Pt}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const rise = prog(t, a, a + 0.5, easeOut);
  const open = prog(t, a + 0.5, a + 1.0, easeInOut);
  const out = prog(t, b - 0.5, b, easeIn);
  return (
    <AbsoluteFill style={{zIndex: 55, background: `rgba(16,32,58,${0.92 * (1 - out)})`}}>
      <Abs x={90} y={1920 - rise * 1300 + out * 1400} w={900} h={1000} style={{perspective: 1800}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 360, height: 90, borderRadius: '24px 24px 0 0', background: p.c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={40} color={INK}>{p.n}/4</T></div>
        <div style={{position: 'absolute', left: 0, top: 80, width: 900, height: 900, borderRadius: '0 28px 28px 28px', background: p.c, boxShadow: '0 40px 80px rgba(0,0,0,0.5)'}} />
        {/* feuille qui sort */}
        <div style={{position: 'absolute', left: 80, top: 140 - open * 160, width: 740, height: 700, borderRadius: 18, background: PAPER, boxShadow: '0 20px 40px rgba(0,0,0,0.3)', padding: 50, boxSizing: 'border-box'}}>
          <Label text={p.code} p={prog(t, a + 0.9, a + 1.5, (x) => x)} size={44} />
          <T size={86} color={INK} style={{marginTop: 50}}>{p.l}</T>
          {[0.9, 0.7, 0.8].map((w, k) => <div key={k} style={{marginTop: 26, height: 16, borderRadius: 8, background: '#E4DCC8', width: `${w * 100}%`, opacity: pop(t, a + 1.2 + k * 0.1)}} />)}
        </div>
        {/* rabat avant qui bascule */}
        <div style={{position: 'absolute', left: 0, top: 380, width: 900, height: 600, borderRadius: 28, background: `linear-gradient(180deg, ${p.c}, ${p.c}DD)`, transformOrigin: '50% 100%', transform: `rotateX(${open * 62}deg)`, boxShadow: 'inset 0 6px 0 rgba(255,255,255,0.25)'}} />
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Introduction ─────────── */
const FILES = Array.from({length: 24}, (_, k) => ({
  rx: 140 + random(`fx${k}`) * 800, ry: 640 + random(`fy${k}`) * 700, rr: (random(`fr${k}`) - 0.5) * 120,
  gx: 150 + (k % 6) * 140, gy: 650 + Math.floor(k / 6) * 170, c: [BLUE, TEAL, ORA, RED][k % 4], ext: ['PR', 'PS', 'MO', 'RE', 'MQ', 'GU'][k % 6],
}));
const Intro: React.FC = () => {
  const t = useT();
  const o = 1 - prog(t, 69.4, 69.8);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* du bazar au système */}
      {t < 8.9 && (() => {
        const order = prog(t, 6.6, 7.8, easeInOut);
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 8.5, 8.9)}}>
            <Title>{t < 6.6 ? <>Ce <span style={{color: RED}}>bazar</span>…</> : <>… devient un <span style={{color: TEAL}}>système</span></>}</Title>
            {FILES.map((f, k) => {
              const wob = (1 - order) * Math.sin(t * 3 + k) * 14;
              return <Abs key={k} x={f.rx + (f.gx - f.rx) * order} y={f.ry + (f.gy - f.ry) * order + wob} style={{transform: `rotate(${f.rr * (1 - order)}deg) scale(${pop(t, 2.8 + k * 0.03)})`}}><FileIco w={90} c={f.c} ext={f.ext} /></Abs>;
            })}
            {t > 7.6 && [0, 1].map((k) => <Abs key={k} x={k ? 800 : 140} y={1360} style={{transform: `rotate(${t * (k ? -90 : 90)}deg) scale(${spring(t, 7.6)})`}}><F n="engrenage" size={130} /></Abs>)}
            {t > 3.0 && t < 6.6 && <Row y={1400}><Chip c={TEAL} q={spring(t, 3.0)}>Simple</Chip><Chip c={ORA} q={spring(t, 3.4)}>Super puissant</Chip></Row>}
            {t > 7.9 && <Row y={1400}><Chip c={TEAL} q={spring(t, 7.9)}>Il tourne tout seul</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* l'explorateur de fichiers qui déborde */}
      {t > 8.7 && t < 26.7 && (() => {
        const names = ['rapport_final_v2.docx', 'rapport_FINAL_vrai.docx', 'copie de copie (3).pdf', 'procédure NEW.doc', 'Document1.docx', 'scan_0045.pdf', 'à valider !!.xlsx', 'version finale 2 (2).docx', 'audit ok???.pdf', 'Nouveau dossier (7)'];
        const n = Math.min(names.length, Math.floor(Math.max(0, t - 11.3) * 2.2));
        const spin = t > 21.3 && t < 24.0;
        return (
          <AbsoluteFill style={{opacity: win(t, 8.7, 26.7, 0.4)}}>
            <Title>Ça vous est <span style={{color: YEL}}>familier</span> ?</Title>
            <Abs x={80} y={570} w={920} h={700} style={{borderRadius: 22, background: '#F3F6FB', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', overflow: 'hidden', transform: `scale(${spring(t, 9.6)}) translateX(${t > 18.4 && t < 19.4 ? Math.sin(t * 60) * 8 : 0}px)`}}>
              <div style={{height: 64, background: '#DDE4F0', display: 'flex', alignItems: 'center', gap: 12, padding: '0 22px'}}>{[RED, YEL, TEAL].map((c) => <div key={c} style={{width: 20, height: 20, borderRadius: 10, background: c}} />)}<Mono size={26} color={INK} style={{marginLeft: 14}}>Mes documents › QHSE › divers</Mono></div>
              <div style={{margin: '16px 22px', height: 58, borderRadius: 29, background: '#fff', border: '3px solid #C9D3E6', display: 'flex', alignItems: 'center', gap: 14, padding: '0 20px'}}>
                <F n="loupe" size={36} /><Mono size={26} color="#5B6A85">{t > 21.3 ? typed('procédure soudage', t, 21.3, 18) : 'Rechercher…'}</Mono>
                {spin && <div style={{marginLeft: 'auto', width: 34, height: 34, borderRadius: 17, border: '5px solid #C9D3E6', borderTopColor: ORA, transform: `rotate(${t * 720}deg)`}} />}
                {t > 24.0 && <Mono size={24} color={RED} style={{marginLeft: 'auto'}}>0 résultat</Mono>}
              </div>
              {names.slice(0, n).map((nm, k) => (
                <div key={nm} style={{display: 'flex', alignItems: 'center', gap: 16, padding: '8px 26px', transform: `translateX(${(1 - pop(t, 11.3 + k / 2.2)) * 300}px)`, opacity: pop(t, 11.3 + k / 2.2)}}>
                  <FileIco w={40} c={[BLUE, RED, ORA, TEAL][k % 4]} ext="" /><Mono size={28} color={INK}>{nm}</Mono>
                </div>
              ))}
            </Abs>
            {[['Agaçant', 18.42, RED], ['Source de stress', 19.82, ORA], ['Perte de temps', 21.34, YEL], ["Frein à l'efficacité", 24.0, RED]].map(([l, at, c], k) => t > (at as number) && <Abs key={l as string} x={k % 2 ? 560 : 90} y={1300 + Math.floor(k / 2) * 100} style={{transform: `rotate(${(k % 2 ? 4 : -4)}deg) scale(${spring(t, at as number)})`}}><Chip c={c as string} dark={c === YEL} size={32}>{l}</Chip></Abs>)}
          </AbsoluteFill>
        );
      })()}
      {/* cascade de boîtes de dialogue d'erreur */}
      {t > 26.5 && t < 49.5 && (() => {
        const dlg: [string, string, number, string][] = [
          ['Temps perdu', 'Recherche du fichier depuis 25 min…', 33.38, 'sablier'],
          ['Erreur', 'Ce document n\'est pas la dernière version.', 35.42, 'danger'],
          ['Version obsolète', 'procédure_v1.doc ouverte par l\'atelier', 36.74, 'dossier'],
          ['Conséquences financières', 'Production non conforme à reprendre', 41.5, 'argent'],
          ['Conséquences juridiques', 'Preuve introuvable', 42.34, 'juge'],
          ["Image de l'entreprise", 'Confiance des clients ternie', 43.02, 'baisse'],
        ];
        return (
          <AbsoluteFill style={{opacity: win(t, 26.5, 49.5, 0.4)}}>
            {t < 46.3 && (
              <AbsoluteFill style={{opacity: 1 - prog(t, 45.9, 46.3)}}>
                <Title>Des risques <span style={{color: RED}}>bien réels</span></Title>
                {dlg.map(([h, b, at, ic], k) => t > at && (
                  <Abs key={h} x={100 + k * 34} y={590 + k * 120} w={780} h={190} style={{borderRadius: 16, background: '#F3F6FB', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', overflow: 'hidden', transform: `scale(${spring(t, at, 9, 18)})`}}>
                    <div style={{height: 50, background: k < 3 ? '#DDE4F0' : '#FFD9D9', display: 'flex', alignItems: 'center', padding: '0 18px', gap: 10}}><div style={{width: 16, height: 16, borderRadius: 8, background: RED}} /><T size={26} color={INK}>{h}</T><div style={{marginLeft: 'auto', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#7A869E'}}>✕</div></div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '16px 22px'}}><F n={ic} size={80} /><T size={32} color={INK} style={{flex: 1}}>{b}</T></div>
                  </Abs>
                ))}
              </AbsoluteFill>
            )}
            {t > 46.1 && (() => {
              const flash = t > 47.4 ? 0.5 + 0.5 * Math.sin(t * 14) : 0;
              return (
                <AbsoluteFill style={{opacity: pop(t, 46.1)}}>
                  <Title>Le <span style={{color: RED}}>jour de l'audit</span></Title>
                  <Photo src={staticFile('induction/reunion-audit.jpg')} x={70} y={580} w={940} h={700} q={spring(t, 46.2)} r={t > 47.4 ? Math.sin(t * 40) * 0.8 : 0}>
                    <div style={{position: 'absolute', inset: 0, boxShadow: `inset 0 0 160px rgba(255,40,40,${0.7 * flash})`}} />
                  </Photo>
                  {t > 47.4 && <Row y={1330}><div style={{transform: `rotate(-4deg) scale(${spring(t, 47.45)})`, border: `7px solid ${RED}`, borderRadius: 14, padding: '6px 26px', background: 'rgba(16,32,58,0.9)'}}><T size={64} color={RED}>PANIQUE À BORD !</T></div></Row>}
                </AbsoluteFill>
              );
            })()}
          </AbsoluteFill>
        );
      })()}
      {/* la solution : une carte d'identité unique */}
      {t > 49.3 && (() => {
        const printP = prog(t, 57.9, 59.4, easeInOut);
        return (
          <AbsoluteFill style={{opacity: pop(t, 49.3)}}>
            {t < 64.9 && (
              <AbsoluteFill style={{opacity: 1 - prog(t, 64.5, 64.9)}}>
                <Title>La <span style={{color: TEAL}}>codification documentaire</span></Title>
                {t > 52.3 && <Abs x={0} y={600} w={1080} style={{textAlign: 'center', opacity: pop(t, 52.3)}}><Hand size={46} color={DIM}>un mot barbare… pour une idée toute simple</Hand></Abs>}
                {/* imprimante + carte */}
                <Abs x={190} y={720} w={700} h={150} style={{borderRadius: 30, background: '#D6DEEC', boxShadow: '0 20px 40px rgba(0,0,0,0.45)', zIndex: 2}}><div style={{position: 'absolute', left: 60, right: 60, bottom: 26, height: 16, borderRadius: 8, background: '#2B3A55'}} /><div style={{position: 'absolute', right: 40, top: 30, width: 22, height: 22, borderRadius: 11, background: printP > 0 && printP < 1 ? TEAL : '#8B97AD'}} /></Abs>
                <div style={{position: 'absolute', left: 260, top: 850 - 420 * (1 - printP), width: 560, height: 360, overflow: 'hidden', zIndex: 1, clipPath: 'inset(0 0 0 0)'}}>
                  <div style={{position: 'absolute', left: 0, top: 0, width: 560, height: 340, borderRadius: 24, background: PAPER, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', padding: 26, boxSizing: 'border-box', transform: `translateY(${-340 + 340 * printP + 20}px)`}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 12}}><T size={26} color="#7A869E">CARTE D'IDENTITÉ DOCUMENTAIRE</T></div>
                    <div style={{display: 'flex', gap: 24, marginTop: 18}}>
                      <div style={{width: 150, height: 190, borderRadius: 14, background: '#E7EEF9', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><FileIco w={100} c={TEAL} ext="PR" /></div>
                      <div style={{flex: 1}}>
                        {[['Code', 'PR-QHSE-001'], ['Type', 'Procédure'], ['Version', 'V03'], ['Statut', 'En vigueur']].map(([k2, v]) => <div key={k2} style={{marginTop: 8}}><T size={20} color="#7A869E">{k2}</T><Mono size={28} color={INK}>{v}</Mono></div>)}
                      </div>
                    </div>
                  </div>
                </div>
                {t > 60.3 && (
                  <Row y={1240} gap={18}>
                    {[['Classer', 61.14, 'classeur'], ['Retrouver', 62.06, 'loupe'], ['Suivre les versions', 62.82, 'repeter']].map(([l, at, ic]) => {
                      const press = t > (at as number) && t < (at as number) + 0.25;
                      return t > (at as number) - 0.2 && <div key={l as string} style={{display: 'flex', alignItems: 'center', gap: 12, padding: '18px 24px', borderRadius: 18, background: '#EEF2F8', borderBottom: `${press ? 2 : 10}px solid #A9B5CA`, transform: `translateY(${press ? 8 : 0}px) scale(${spring(t, (at as number) - 0.2)})`}}><F n={ic as string} size={50} /><T size={34} color={INK}>{l}</T></div>;
                    })}
                  </Row>
                )}
              </AbsoluteFill>
            )}
            {/* clé de voûte ISO 9001 */}
            {t > 64.7 && (() => {
              const drop = spring(t, 65.4, 6, 14);
              return (
                <AbsoluteFill style={{opacity: pop(t, 64.7)}}>
                  <Title>La <span style={{color: YEL}}>pierre angulaire</span></Title>
                  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                    {Array.from({length: 9}, (_, k) => {
                      if (k === 4) return null;
                      const a0 = Math.PI - (k / 9) * Math.PI, a1 = Math.PI - ((k + 1) / 9) * Math.PI;
                      const R = 380, r = 250, cx = 540, cy = 1300;
                      const pts = [[cx + R * Math.cos(a0), cy - R * Math.sin(a0)], [cx + R * Math.cos(a1), cy - R * Math.sin(a1)], [cx + r * Math.cos(a1), cy - r * Math.sin(a1)], [cx + r * Math.cos(a0), cy - r * Math.sin(a0)]];
                      return <polygon key={k} points={pts.map((p) => p.join(',')).join(' ')} fill="#6E7FA0" stroke={BG} strokeWidth={6} opacity={pop(t, 64.9 + Math.abs(k - 4) * 0.05)} />;
                    })}
                    <rect x={160} y={1300} width={130} height={200} fill="#6E7FA0" /><rect x={790} y={1300} width={130} height={200} fill="#6E7FA0" />
                    {(() => {
                      const a0 = Math.PI - (4 / 9) * Math.PI, a1 = Math.PI - (5 / 9) * Math.PI;
                      const R = 380, r = 250, cx = 540, cy = 1300 - (1 - drop) * 500;
                      const pts = [[cx + R * Math.cos(a0), cy - R * Math.sin(a0)], [cx + R * Math.cos(a1), cy - R * Math.sin(a1)], [cx + r * Math.cos(a1), cy - r * Math.sin(a1)], [cx + r * Math.cos(a0), cy - r * Math.sin(a0)]];
                      return t > 65.0 && <polygon points={pts.map((p) => p.join(',')).join(' ')} fill={YEL} stroke={BG} strokeWidth={6} style={{filter: `drop-shadow(0 0 20px ${YEL})`}} />;
                    })()}
                  </svg>
                  {t > 65.4 && <Abs x={0} y={780 - (1 - drop) * 500} w={1080} style={{textAlign: 'center'}}><T size={30} color={INK} style={{display: 'inline-block', background: YEL, padding: '4px 14px', borderRadius: 10}}>CODE</T></Abs>}
                  {t > 67.6 && <Row y={1300}><Chip c={TEAL} q={spring(t, 68.4)}><F n="medaille" size={44} />ISO 9001</Chip></Row>}
                  {t > 66.0 && <Abs x={0} y={1080} w={1080} style={{textAlign: 'center', opacity: pop(t, 66.0)}}><Hand size={44}>toute démarche qualité</Hand></Abs>}
                </AbsoluteFill>
              );
            })()}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Plan : classeur à onglets ─────────── */
const Plan: React.FC = () => {
  const t = useT();
  const o = win(t, 69.6, 90.5, 0.4);
  if (o <= 0) return null;
  const at = [78.2, 82.06, 84.26, 86.22];
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Title>Notre <span style={{color: ORA}}>plan de match</span></Title>
      <Abs x={140} y={580} w={760} h={900} style={{borderRadius: 20, background: '#2C3E63', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', transform: `scale(${spring(t, 72.1)})`}}>
        {/* anneaux */}
        {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 30, top: 180 + k * 260, width: 60, height: 60, borderRadius: 30, border: '10px solid #C9D3E6'}} />)}
        <div style={{position: 'absolute', left: 120, top: 30, right: 30, bottom: 30, borderRadius: 12, background: PAPER}} />
        {PT.map((p, k) => {
          const out = spring(t, at[k], 7, 14);
          const cur = t >= at[k] && (k === 3 || t < at[k + 1]);
          return (
            <div key={p.n} style={{position: 'absolute', left: 120, top: 60 + k * 205, width: 600 + out * 120 + (cur ? 30 : 0), height: 180, display: 'flex', alignItems: 'center'}}>
              <div style={{flex: 1, height: '100%', borderRadius: '0 20px 20px 0', background: t >= at[k] ? p.c : '#E4DCC8', display: 'flex', alignItems: 'center', gap: 20, padding: '0 30px', boxSizing: 'border-box', boxShadow: cur ? '0 14px 30px rgba(0,0,0,0.35)' : 'none'}}>
                <T size={70} color={INK}>{p.n}</T>
                <div style={{opacity: pop(t, at[k])}}><T size={40} color={INK}>{p.l}</T>{k === 1 && <Hand size={32} color={INK}>créer les codes</Hand>}{k === 2 && <Hand size={32} color={INK}>bien nommer les fichiers</Hand>}{k === 3 && <Hand size={32} color={INK}>pour que tout roule</Hand>}{k === 0 && <Hand size={32} color={INK}>la vue d'ensemble</Hand>}</div>
              </div>
            </div>
          );
        })}
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Partie 1 : la pyramide de photos réelles ─────────── */
const LEVELS = [
  {l: 'Manuel qualité', d: 'La grande vision, la stratégie', at: 111.9, src: 'causerie/manager.jpg', pos: '50% 20%', c: '#FF8A1F'},
  {l: 'Processus', d: "Les grandes activités de l'entreprise", at: 116.66, src: 'induction/reunion-audit.jpg', pos: 'center', c: '#FFB648'},
  {l: 'Procédures', d: 'Le « comment on fait », en détail', at: 122.5, src: 'verites/plans.jpg', pos: '60% 30%', c: '#19C3B1'},
  {l: 'Modes opératoires', d: "L'instruction pas à pas, ultra précise", at: 127.78, src: 'induction/technicien-hse.jpg', pos: '50% 35%', c: '#5AA9FF'},
  {l: 'Enregistrements', d: 'Les preuves tangibles que tout a été respecté', at: 134.82, src: 'verites/ecriture.jpg', pos: '50% 50%', c: '#B48CFF'},
];
const P1: React.FC = () => {
  const t = useT();
  const o = win(t, 92.8, 140.8, 0.4);
  if (o <= 0) return null;
  const top = 600, H = 116, gapY = 10;
  const cur = [...LEVELS].reverse().find((L) => t >= L.at);
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Title>{t < 99.1 ? <>Il faut une <span style={{color: TEAL}}>structure</span></> : t < 108.4 ? <>La <span style={{color: TEAL}}>pyramide</span> documentaire</> : <>Une pyramide à <span style={{color: TEAL}}>5 niveaux</span></>}</Title>
      {/* les 5 étages */}
      {LEVELS.map((L, k) => {
        const y = top + k * (H + gapY);
        const halfTop = 50 + k * 80, halfBot = 50 + (k + 1) * 80;
        const on = t >= L.at;
        const q = on ? spring(t, L.at, 7, 14) : 0;
        const ghost = t > 99.1 ? pop(t, 99.1 + k * 0.12) : 0;
        return (
          <React.Fragment key={L.l}>
            <div style={{position: 'absolute', left: 540 - halfBot - 6, top: y - 3, width: halfBot * 2 + 12, height: H + 6, clipPath: `polygon(${halfBot - halfTop + 6}px 0, ${halfBot + halfTop + 6}px 0, 100% 100%, 0 100%)`, background: on ? L.c : 'rgba(255,255,255,0.12)', opacity: Math.max(ghost, on ? 1 : 0)}} />
            {on && (
              <div style={{position: 'absolute', left: 540 - halfBot, top: y, width: halfBot * 2, height: H, clipPath: `polygon(${halfBot - halfTop}px 0, ${halfBot + halfTop}px 0, 100% 100%, 0 100%)`, overflow: 'hidden', transform: `translateY(${(1 - q) * -400}px)`, opacity: Math.min(1, q * 2)}}>
                <Img src={staticFile(L.src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: L.pos, filter: cur === L ? 'none' : 'saturate(0.5) brightness(0.75)'}} />
                <div style={{position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${L.c}AA, transparent 35%, transparent 65%, ${L.c}AA)`}} />
              </div>
            )}
            {on && <Abs x={0} y={y + H / 2 - 22} w={1080} style={{textAlign: 'center', transform: `translateY(${(1 - q) * -400}px)`}}><T size={k === 0 ? 26 : 34} style={{display: 'inline-block', padding: '2px 14px', borderRadius: 10, background: 'rgba(16,32,58,0.75)'}}>{L.l}</T></Abs>}
          </React.Fragment>
        );
      })}
      {/* flèche du général au spécifique */}
      {t > 104.1 && (
        <Abs x={6} y={600} w={120} h={620} style={{opacity: pop(t, 104.1)}}>
          <svg width={120} height={620}><line x1={40} y1={20} x2={40} y2={560 * prog(t, 104.2, 106.2) + 20} stroke={YEL} strokeWidth={8} /><path d={`M20 ${560 * prog(t, 104.2, 106.2)} L40 ${560 * prog(t, 104.2, 106.2) + 30} L60 ${560 * prog(t, 104.2, 106.2)}`} stroke={YEL} strokeWidth={8} fill="none" /></svg>
          <Hand size={30} color={YEL} style={{position: 'absolute', left: 64, top: 0, width: 160}}>général</Hand>
          <Hand size={30} color={YEL} style={{position: 'absolute', left: 64, top: 560, width: 180, opacity: pop(t, 106.0)}}>spécifique</Hand>
        </Abs>
      )}
      {t > 108.4 && t < 111.9 && <Abs x={0} y={1270} w={1080} style={{textAlign: 'center'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 200, color: TEAL, lineHeight: 1, transform: `scale(${spring(t, 108.5)})`}}>5</div></Abs>}
      {/* fiche du niveau en cours */}
      {cur && (
        <Abs key={cur.l} x={110} y={1270} w={860} h={210} style={{borderRadius: 26, background: PAPER, borderLeft: `16px solid ${cur.c}`, boxShadow: '0 20px 40px rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', gap: 26, padding: '0 30px', boxSizing: 'border-box', transform: `translateX(${(1 - spring(t, cur.at + 0.2, 8, 14)) * 1000}px)`}}>
          <T size={86} color={cur.c}>{LEVELS.indexOf(cur) + 1}</T>
          <div><T size={44} color={INK}>{cur.l}</T><Hand size={36} color="#5B6A85">{cur.d}</Hand></div>
        </Abs>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 2 : codifier ─────────── */
const FLAP = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-';
const Flap: React.FC<{ch: string; at: number; idx: number; c?: string}> = ({ch, at, idx, c = LIGHT}) => {
  const t = useT();
  const target = FLAP.indexOf(ch);
  const steps = Math.max(0, Math.floor((t - at - idx * 0.06) * 22));
  const cur = t < at ? 0 : Math.max(0, target - Math.max(0, Math.min(8, target) - steps));
  const flipping = t >= at && cur !== target;
  return (
    <div style={{position: 'relative', width: 96, height: 140, borderRadius: 12, background: '#0B1426', boxShadow: 'inset 0 -6px 0 rgba(0,0,0,0.4), 0 10px 20px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
      <Mono size={96} color={ch === '-' ? '#7A869E' : c}>{FLAP[cur]}</Mono>
      <div style={{position: 'absolute', left: 0, right: 0, top: 69, height: 3, background: '#000'}} />
      {flipping && <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 70, background: 'rgba(255,255,255,0.08)', transformOrigin: '50% 100%', transform: `rotateX(${((t * 22) % 1) * 90}deg)`}} />}
    </div>
  );
};
const P2: React.FC = () => {
  const t = useT();
  const o = win(t, 143.3, 210.2, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* règle d'or : scanner d'empreinte */}
      {t < 156.2 && (() => {
        const scan = t > 153.2 ? ((t - 153.2) * 0.8) % 1 : -1;
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 155.8, 156.2)}}>
            <Title>La <span style={{color: YEL}}>règle d'or</span></Title>
            {t < 149.5 && <Abs x={340} y={620} style={{transform: `scale(${spring(t, 143.4)})`, opacity: 1 - prog(t, 149.1, 149.5)}}><F n="carte-id" size={400} /></Abs>}
            {t > 144.0 && t < 149.5 && <Row y={1080}><Chip c={ORA} q={spring(t, 144.1)}>Une carte d'identité par document ?</Chip></Row>}
            {t > 149.4 && t < 153.2 && <Abs x={390} y={620} style={{transform: `scale(${spring(t, 149.5)}) rotate(${Math.sin(t * 2) * 5}deg)`}}><F n="medaille" size={300} /></Abs>}
            {t > 151.9 && t < 153.2 && <Row y={1000}><Chip c={RED} dark={false} q={spring(t, 152.0)}>Non négociable</Chip></Row>}
            {t > 153.0 && (
              <AbsoluteFill style={{opacity: pop(t, 153.0)}}>
                <Abs x={160} y={600} style={{transform: `scale(${spring(t, 153.1)})`}}><FileIco w={260} c={TEAL} ext="PR" /></Abs>
                <Abs x={560} y={620} w={360} h={360} style={{borderRadius: 40, background: '#0B1426', border: `5px solid ${TEAL}`, overflow: 'hidden', transform: `scale(${spring(t, 153.3)})`}}>
                  <svg width={360} height={360} viewBox="-90 -90 180 180">{Array.from({length: 8}, (_, k) => <ellipse key={k} rx={12 + k * 9} ry={16 + k * 10} fill="none" stroke={TEAL} strokeWidth={4} strokeDasharray={`${30 + k * 6} 8`} transform={`rotate(${k * 7})`} />)}</svg>
                  {scan >= 0 && <div style={{position: 'absolute', left: 0, right: 0, top: scan * 360, height: 8, background: TEAL, boxShadow: `0 0 30px ${TEAL}`}} />}
                </Abs>
                <Row y={1060}><div style={{display: 'flex', alignItems: 'center', gap: 24, padding: '24px 36px', borderRadius: 30, background: PAPER, transform: `scale(${spring(t, 153.6)})`}}><T size={56} color={INK}>1 document</T><T size={70} color={ORA}>=</T><T size={56} color={INK}>1 code unique</T></div></Row>
              </AbsoluteFill>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* traçabilité : la chaîne des versions */}
      {t > 156.0 && t < 171.0 && (
        <AbsoluteFill style={{opacity: win(t, 156.0, 171.0, 0.35)}}>
          <Title>Une <span style={{color: ORA}}>traçabilité</span> parfaite</Title>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><line x1={180} y1={820} x2={180 + 720 * prog(t, 160.8, 162.2)} y2={820} stroke={ORA} strokeWidth={8} strokeDasharray="20 12" /></svg>
          {['V01', 'V02', 'V03'].map((v, k) => (
            <Abs key={v} x={110 + k * 330} y={640} style={{transform: `scale(${spring(t, 160.9 + k * 0.4)})`, textAlign: 'center'}}>
              <FileIco w={150} c={k === 2 ? ORA : '#8B97AD'} ext={v} />
              {k === 2 && t > 161.5 && <div style={{position: 'absolute', right: -16, top: -16, transform: `scale(${spring(t, 161.6)})`}}><Chip c={TEAL} size={22}>en vigueur</Chip></div>}
              {k < 2 && t > 162.8 && <div style={{position: 'absolute', left: 10, top: 70, transform: `rotate(-14deg) scale(${spring(t, 162.9 + k * 0.2)})`, border: `4px solid ${RED}`, borderRadius: 8, padding: '0 8px', background: '#fff'}}><T size={20} color={RED}>ARCHIVÉE</T></div>}
            </Abs>
          ))}
          <Abs x={120} y={1010} w={840} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
            {[['Maîtriser les versions', 160.86], ['Suivre les modifications', 162.82], ['Prouver la conformité', 164.78]].map(([l, at]) => (
              <div key={l as string} style={{display: 'flex', alignItems: 'center', gap: 18, padding: '16px 24px', borderRadius: 20, background: 'rgba(255,255,255,0.07)', opacity: pop(t, at as number), transform: `translateX(${(1 - pop(t, at as number)) * 200}px)`}}>
                <div style={{width: 50, height: 50, borderRadius: 12, background: ORA, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Check p={prog(t, (at as number) + 0.2, (at as number) + 0.6)} size={40} color={INK} /></div><T size={40}>{l}</T>
              </div>
            ))}
          </Abs>
          {t > 165.0 && <Abs x={620} y={1310} style={{transform: `rotate(-10deg) scale(${spring(t, 165.1, 9, 18)})`, border: `7px solid ${TEAL}`, borderRadius: 14, padding: '4px 20px'}}><T size={52} color={TEAL}>CONFORME</T></Abs>}
          {t > 169.7 && <Row y={1450}><Chip c={YEL} q={spring(t, 169.75)} size={30}>Le secret : la structure</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* anatomie du code : afficheur à palettes */}
      {t > 170.8 && t < 190.6 && (() => {
        const code = t < 180.1 ? 'PR-' + String(1 + Math.min(2, Math.floor(Math.max(0, t - 175.9) * 1.6))).padStart(3, '0') : 'RE-GQ-001';
        const at = t < 180.1 ? 172.4 : 180.3;
        const chars = code.split('');
        return (
          <AbsoluteFill style={{opacity: win(t, 170.8, 190.6, 0.35)}}>
            <Title>Anatomie d'un <span style={{color: ORA}}>code</span></Title>
            <Row y={720} gap={8}>{chars.map((c, k) => <Flap key={`${code.length}-${k}`} ch={c} at={t < 180.1 && k >= 3 ? 175.9 + (Math.floor(Math.max(0, t - 175.9) * 1.6)) / 1.6 : at} idx={k} c={k < 2 ? ORA : k > 5 || (t < 180.1 && k > 2) ? TEAL : YEL} />)}</Row>
            {t < 180.1 && (
              <>
                {t > 172.4 && <Abs x={chars.length === 6 ? 230 : 120} y={900} style={{opacity: pop(t, 172.5)}}><Chip c={ORA} size={30}>Préfixe : le type</Chip></Abs>}
                {t > 175.9 && <Abs x={560} y={1000} style={{opacity: pop(t, 175.9)}}><Chip c={TEAL} size={30}>Numéro qui s'incrémente</Chip></Abs>}
                {t > 177.7 && <Row y={1160}><Hand size={42} style={{opacity: pop(t, 177.7)}}>+ d'autres infos si besoin</Hand></Row>}
              </>
            )}
            {t > 180.1 && (
              <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                {[[118, 310, 184.6, ORA], [430, 622, 187.2, YEL], [742, 962, 188.8, TEAL]].map(([x0, x1, a2, c], k) => t > (a2 as number) && <path key={k} d={`M${x0} 880 L${x0} 900 L${x1} 900 L${x1} 880 M${((x0 as number) + (x1 as number)) / 2} 900 L${((x0 as number) + (x1 as number)) / 2} ${930 + k * 130}`} stroke={c as string} strokeWidth={6} fill="none" opacity={pop(t, a2 as number)} />)}
              </svg>
            )}
            {t > 184.6 && <Abs x={60} y={950} style={{transform: `scale(${spring(t, 184.65)})`}}><Chip c={ORA} size={30}>RE = Enregistrement</Chip></Abs>}
            {t > 187.2 && <Abs x={300} y={1080} style={{transform: `scale(${spring(t, 187.25)})`}}><Chip c={YEL} size={30}>GQ = Gestion qualité</Chip></Abs>}
            {t > 188.8 && <Abs x={560} y={1210} style={{transform: `scale(${spring(t, 188.85)})`}}><Chip c={TEAL} size={30}>001 = n° du document</Chip></Abs>}
          </AbsoluteFill>
        );
      })()}
      {/* lexique commun : le dictionnaire */}
      {t > 190.4 && t < 203.8 && (
        <AbsoluteFill style={{opacity: win(t, 190.4, 203.8, 0.35)}}>
          <Title>Parler le <span style={{color: ORA}}>même langage</span></Title>
          <Abs x={140} y={580} w={800} h={880} style={{borderRadius: 18, background: PAPER, boxShadow: '0 30px 60px rgba(0,0,0,0.5)', padding: '40px 50px', boxSizing: 'border-box', transform: `rotate(-1deg) scale(${spring(t, 198.4)})`}}>
            <div style={{textAlign: 'center'}}><Hand size={56} color={INK}>Lexique commun</Hand><T size={30} color="#7A869E">PRÉFIXES STANDARDS DE L'ÉQUIPE</T></div>
            <div style={{height: 3, background: INK, opacity: 0.15, margin: '22px 0'}} />
            {[['PR', 'Procédure', 201.06], ['PS', 'Processus', 202.26], ['MO', 'Mode opératoire', 202.8], ['MQ', 'Manuel qualité', 203.1], ['RE', 'Enregistrement', 203.4]].map(([c, l, at], k) => (
              <div key={c as string} style={{display: 'flex', alignItems: 'center', gap: 24, marginTop: 18, opacity: pop(t, at as number), transform: `translateX(${(1 - pop(t, at as number)) * 120}px)`}}>
                <div style={{width: 130, padding: '8px 0', textAlign: 'center', borderRadius: 10, background: [ORA, TEAL, BLUE, YEL, '#B48CFF'][k]}}><Mono size={44} color={INK}>{c}</Mono></div>
                <T size={44} color={INK}>{l}</T>
              </div>
            ))}
          </Abs>
          {t > 194.6 && t < 198.4 && <Row y={900}>{[0, 1].map((k) => <div key={k} style={{padding: '20px 30px', borderRadius: 30, background: k ? TEAL : ORA, transform: `scale(${spring(t, 194.7 + k * 0.3)})`}}><Mono size={44} color={INK}>PR-QHSE-001</Mono></div>)}</Row>}
        </AbsoluteFill>
      )}
      {/* cohérence : on s'y tient */}
      {t > 203.6 && (
        <AbsoluteFill style={{opacity: pop(t, 203.6)}}>
          <Title>La vraie clé : la <span style={{color: ORA}}>cohérence</span></Title>
          {[0, 1, 2, 3, 4].map((k) => {
            const aligned = prog(t, 207.3, 208.2, easeInOut);
            const off = (random(`co${k}`) - 0.5) * 260 * (1 - aligned);
            return <Abs key={k} x={250 + off} y={620 + k * 120} style={{opacity: pop(t, 203.8 + k * 0.1)}}><div style={{padding: '14px 26px', borderRadius: 14, background: aligned > 0.95 ? TEAL : 'rgba(255,255,255,0.1)'}}><Mono size={42} color={aligned > 0.95 ? INK : LIGHT}>{`PR-QHSE-00${k + 1}`}</Mono></div></Abs>;
          })}
          {t > 209.4 && <Abs x={760} y={760} style={{transform: `scale(${spring(t, 209.45)})`}}><F n="cadenas" size={200} /></Abs>}
          {t > 209.4 && <Row y={1300}><Chip c={TEAL} q={spring(t, 209.5)}>Une fois choisi, on s'y tient</Chip></Row>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 3 : nommer ─────────── */
const CARS = [
  {l: 'Projet', v: 'QHSE', c: ORA, at: 246.86},
  {l: 'Type', v: 'PR', c: TEAL, at: 251.2},
  {l: 'Date', v: '20261010', c: YEL, at: 253.22},
  {l: 'Description', v: 'Soudage', c: BLUE, at: 253.86},
  {l: 'Version', v: 'V03', c: '#B48CFF', at: 255.9},
];
const P3: React.FC = () => {
  const t = useT();
  const o = win(t, 212.7, 318.0, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* puzzle : la moitié du travail */}
      {t < 226.6 && (() => {
        const join = prog(t, 215.2, 216.2, easeInOut);
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 226.2, 226.6)}}>
            <Title>La <span style={{color: BLUE}}>moitié</span> du travail</Title>
            <Abs x={120} y={640} w={400} h={320} style={{borderRadius: '30px 0 0 30px', background: ORA, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 212.9)})`}}><Mono size={44} color={INK}>PR-QHSE-001</Mono><T size={34} color={INK} style={{marginTop: 10}}>Le code ✓</T></Abs>
            <Abs x={520 + (1 - join) * 500} y={640} w={440} h={320} style={{borderRadius: '0 30px 30px 0', background: BLUE, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: t > 215.1 ? 1 : 0}}>
              <div style={{position: 'absolute', left: -50, top: 110, width: 100, height: 100, borderRadius: 50, background: BLUE}} />
              <F n="dossier" size={90} /><T size={34} color={INK} style={{marginTop: 10, position: 'relative'}}>Le nom du fichier</T>
            </Abs>
            {t > 213.0 && t < 215.2 && <Abs x={540} y={700} style={{opacity: pop(t, 213.1)}}><T size={160} color="rgba(255,255,255,0.15)">?</T></Abs>}
            {t > 219.3 && <Row y={1040}><Chip c={LIGHT} q={spring(t, 219.35)} size={30}>Des règles claires</Chip></Row>}
            {t > 222.4 && <Row y={1160} gap={12}>{[['Logique', 223.66], ['Cohérent', 224.18], ['Utile', 224.7]].map(([l, at]) => t > (at as number) && <Chip key={l as string} c={BLUE} q={spring(t, at as number)}>{l}</Chip>)}</Row>}
          </AbsoluteFill>
        );
      })()}
      {/* humain vs machine */}
      {t > 226.4 && t < 240.5 && (
        <AbsoluteFill style={{opacity: win(t, 226.4, 240.5, 0.35)}}>
          <Title>Un nom qui <span style={{color: BLUE}}>parle à tout le monde</span></Title>
          <Photo src={staticFile('verites/plans.jpg')} x={70} y={640} w={450} h={600} q={spring(t, 234.0)} pos="60% 30%">
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, background: 'rgba(16,32,58,0.85)', textAlign: 'center'}}><T size={34}>👁 L'humain</T><Hand size={30} color={DIM}>hyper clair à lire</Hand></div>
          </Photo>
          {t > 236.8 && (
            <Abs x={560} y={640} w={450} h={600} style={{borderRadius: 30, background: '#0B1426', border: '6px solid rgba(255,255,255,0.92)', padding: 26, boxSizing: 'border-box', transform: `scale(${spring(t, 236.9)})`, overflow: 'hidden'}}>
              <Mono size={24} color={TEAL}>{typed('$ parse nom_fichier\n> QHSE\n> PR\n> 20261010\n> Soudage\n> V03\n\n✓ 0 bug\n✓ 0 erreur', t, 237.0, 30)}</Mono>
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, background: 'rgba(25,195,177,0.2)', textAlign: 'center'}}><T size={34}>⚙ La machine</T><Hand size={30} color={DIM}>digeste, sans bug</Hand></div>
            </Abs>
          )}
          {t > 231.1 && <Row y={1300}><Hand size={44} style={{opacity: pop(t, 231.2)}}>un bon nom, deux lecteurs</Hand></Row>}
        </AbsoluteFill>
      )}
      {/* la structure idéale en wagons */}
      {t > 240.3 && t < 260.2 && (
        <AbsoluteFill style={{opacity: win(t, 240.3, 260.2, 0.35)}}>
          <Title>La <span style={{color: BLUE}}>structure idéale</span></Title>
          {t > 243.3 && <Abs x={0} y={580} w={1080} style={{textAlign: 'center', opacity: pop(t, 243.3)}}><Hand size={44} color={DIM}>une grammaire commune pour toute l'équipe</Hand></Abs>}
          {/* rails */}
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><line x1={40} y1={1040} x2={1040} y2={1040} stroke="#5B6A85" strokeWidth={6} />{Array.from({length: 20}, (_, k) => <line key={k} x1={50 + k * 52} y1={1030} x2={50 + k * 52} y2={1052} stroke="#5B6A85" strokeWidth={6} />)}</svg>
          {CARS.map((c, k) => {
            const x = 60 + k * 196;
            const q = prog(t, c.at, c.at + 0.6, easeOut);
            return t > c.at && (
              <Abs key={c.l} x={x + (1 - q) * 1100} y={830} w={186} h={200}>
                <div style={{position: 'absolute', inset: '0 0 26px 0', borderRadius: 16, background: c.c, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.35)'}}>
                  <T size={22} color={INK}>{c.l.toUpperCase()}</T><Mono size={c.v.length > 6 ? 26 : 34} color={INK} style={{marginTop: 8}}>{c.v}</Mono>
                </div>
                {[34, 140].map((wx) => <div key={wx} style={{position: 'absolute', left: wx - 16, bottom: 0, width: 32, height: 32, borderRadius: 16, background: '#2B3A55', border: '5px solid #C9D3E6', transform: `rotate(${t * 400}deg)`}} />)}
                {k > 0 && <div style={{position: 'absolute', left: -12, top: 84, width: 14, height: 10, background: '#C9D3E6'}} />}
              </Abs>
            );
          })}
          {t > 246.86 && <Abs x={60} y={1100} w={960} style={{textAlign: 'center'}}><svg width={960} height={60}><line x1={20} y1={30} x2={20 + 900 * prog(t, 246.9, 256.4, (v) => v)} y2={30} stroke={YEL} strokeWidth={6} /><path d={`M${10 + 900 * prog(t, 246.9, 256.4, (v) => v)} 16 L${30 + 900 * prog(t, 246.9, 256.4, (v) => v)} 30 L${10 + 900 * prog(t, 246.9, 256.4, (v) => v)} 44`} stroke={YEL} strokeWidth={6} fill="none" /></svg><Hand size={34} color={YEL}>du plus général… au plus précis</Hand></Abs>}
          {t > 256.0 && <Row y={1280}><div style={{padding: '18px 28px', borderRadius: 18, background: PAPER, transform: `scale(${spring(t, 256.05)})`}}><Mono size={36} color={INK}>QHSE_PR_20261010_Soudage_V03.docx</Mono></div></Row>}
          {t > 258.3 && <Abs x={700} y={1390} style={{transform: `rotate(-8deg) scale(${spring(t, 258.35, 9, 18)})`, border: `6px solid ${TEAL}`, borderRadius: 12, padding: '2px 16px'}}><T size={44} color={TEAL}>IMPLACABLE</T></Abs>}
        </AbsoluteFill>
      )}
      {/* terminal : nettoyer un nom pour la machine */}
      {t > 260.0 && t < 278.6 && (() => {
        const stages = [
          {at: 0, s: 'Rapport final été #2 & co!.docx'},
          {at: 267.0, s: 'Rapport final été 2 co.docx'},
          {at: 269.1, s: 'Rapport final ete 2 co.docx'},
          {at: 272.3, s: 'Rapport_final_ete_2_co.docx'},
          {at: 276.1, s: 'RAP_final_ete_2.docx'},
        ];
        const st = [...stages].reverse().find((x) => t >= x.at)!;
        const raw = t < 262.0 ? typed(stages[0].s, t, 260.4, 22) : st.s;
        const hl = (ch: string) => {
          if (t > 266.9 && t < 267.5 && /[#&!]/.test(ch)) return RED;
          if (t > 268.4 && t < 272.4 && ch === ' ') return 'rgba(255,90,90,0.55)';
          if (t > 268.9 && t < 269.6 && /[éè]/.test(ch)) return RED;
          if (t > 272.3 && t < 273.8 && ch === '_') return TEAL;
          return 'transparent';
        };
        return (
          <AbsoluteFill style={{opacity: win(t, 260.0, 278.6, 0.35)}}>
            <Title>Parlons à la <span style={{color: BLUE}}>machine</span></Title>
            <Abs x={60} y={590} w={960} h={420} style={{borderRadius: 24, background: '#0B1426', border: '4px solid #2B3A55', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', padding: 30, boxSizing: 'border-box', transform: `scale(${spring(t, 260.3)})`}}>
              <div style={{display: 'flex', gap: 10, marginBottom: 24}}>{[RED, YEL, TEAL].map((c) => <div key={c} style={{width: 18, height: 18, borderRadius: 9, background: c}} />)}</div>
              <Mono size={26} color="#7A869E">$ renommer --propre</Mono>
              <div style={{display: 'flex', flexWrap: 'wrap', marginTop: 24}}>{raw.split('').map((ch, k) => <span key={k} style={{fontFamily: MONO, fontWeight: 700, fontSize: 40, color: LIGHT, background: hl(ch), whiteSpace: 'pre', borderRadius: 4}}>{ch}</span>)}<span style={{fontFamily: MONO, fontSize: 40, color: TEAL, opacity: Math.floor(t * 3) % 2}}>▌</span></div>
              {t > 276.1 && <Mono size={26} color={TEAL} style={{marginTop: 26}}>✓ {st.s.length} caractères — court et efficace</Mono>}
            </Abs>
            <Abs x={90} y={1060} w={900} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14}}>
              {[['✗ Caractères spéciaux', 267.0, RED], ['✗ Espaces', 268.58, RED], ['✗ Accents', 269.1, RED], ['✓ Tiret bas _', 272.3, TEAL], ['✓ Court', 276.1, TEAL]].map(([l, at, c]) => t > (at as number) && (
                <div key={l as string} style={{padding: '14px 20px', borderRadius: 16, background: 'rgba(255,255,255,0.07)', border: `3px solid ${c}`, transform: `scale(${spring(t, at as number)})`}}><T size={34} color={c as string}>{l}</T></div>
              ))}
            </Abs>
          </AbsoluteFill>
        );
      })()}
      {/* la liste qui se trie toute seule */}
      {t > 278.4 && t < 296.2 && (() => {
        const files = [{d: '20260115', v: 'V01'}, {d: '20260302', v: 'V02'}, {d: '20260620', v: 'V03'}, {d: '20261010', v: 'V04'}];
        const shuffled = [2, 0, 3, 1];
        const sort = prog(t, 290.9, 292.4, easeInOut);
        const fmt = t > 289.0;
        const old = (d: string) => `${d.slice(6, 8)}-${d.slice(4, 6)}-${d.slice(0, 4)}`;
        return (
          <AbsoluteFill style={{opacity: win(t, 278.4, 296.2, 0.35)}}>
            <Title>Pour l'humain : la <span style={{color: BLUE}}>logique</span></Title>
            {t > 287.1 && <Row y={580}><Chip c={YEL} q={spring(t, 287.2)}><F n="calendrier" size={44} />{fmt ? 'AAAAMMJJ : année, mois, jour' : 'Le format de la date'}</Chip></Row>}
            <Abs x={80} y={700} w={920} h={560} style={{borderRadius: 22, background: '#F3F6FB', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', overflow: 'hidden', opacity: pop(t, 279.0)}}>
              <div style={{height: 60, background: '#DDE4F0', display: 'flex', alignItems: 'center', padding: '0 24px'}}><Mono size={24} color={INK}>Nom ▲ (tri automatique)</Mono></div>
              {files.map((f, k) => {
                const from = shuffled.indexOf(k), to = k;
                const y = 80 + (from + (to - from) * sort) * 116;
                return (
                  <div key={k} style={{position: 'absolute', left: 24, right: 24, top: y, height: 100, borderRadius: 14, background: '#fff', display: 'flex', alignItems: 'center', gap: 16, padding: '0 18px', boxShadow: '0 4px 10px rgba(0,0,0,0.08)'}}>
                    <FileIco w={50} c={k === 3 ? ORA : BLUE} ext="" />
                    <Mono size={28} color={INK}>QHSE_PR_<span style={{background: fmt ? '#FFF1B8' : 'transparent'}}>{fmt ? f.d : old(f.d)}</span>_Soudage_<span style={{background: t > 294.8 ? '#E8DCFF' : 'transparent', color: t > 294.8 ? '#7B4FE0' : INK}}>{f.v}</span></Mono>
                  </div>
                );
              })}
            </Abs>
            {t > 291.0 && <Row y={1310}><Chip c={TEAL} q={spring(t, 292.4)}>Trié tout seul, dans l'ordre chronologique</Chip></Row>}
            {t > 294.8 && <Row y={1420}><Chip c="#B48CFF" q={spring(t, 294.85)}>Toujours la version à la fin</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* rayons X : le contenu sans ouvrir */}
      {t > 296.0 && t < 301.1 && (() => {
        const lx = 300 + Math.sin((t - 296) * 1.8) * 200;
        return (
          <AbsoluteFill style={{opacity: win(t, 296.0, 301.1, 0.3)}}>
            <Title>Sans même <span style={{color: BLUE}}>l'ouvrir</span></Title>
            <Abs x={290} y={600} style={{transform: `scale(${spring(t, 296.1)})`}}><FileIco w={500} c={TEAL} ext="PR" /></Abs>
            <Abs x={lx} y={720} w={300} h={300} style={{borderRadius: 150, border: '10px solid #C9D3E6', background: '#0B1426', overflow: 'hidden', boxShadow: `0 0 40px ${TEAL}`}}>
              <div style={{position: 'absolute', left: 30, top: 70}}><Mono size={26} color={TEAL}>{'Projet : QHSE\nType : PR\nDate : 2026-10-10\nObjet : soudage\nVersion : 03'}</Mono></div>
            </Abs>
            <Abs x={lx + 250} y={980} w={40} h={160} style={{background: '#C9D3E6', borderRadius: 20, transform: 'rotate(-40deg)', transformOrigin: '50% 0'}} />
            {t > 298.5 && <Row y={1380}><Chip c={TEAL} q={spring(t, 298.55)}>On sait précisément ce qu'il y a dedans</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* rideau avant / après */}
      {t > 300.9 && (() => {
        const cut = 1080 * (1 - prog(t, 309.5, 311.5, easeInOut));
        const qm = 1 - prog(t, 316.2, 317.2);
        return (
          <AbsoluteFill style={{opacity: pop(t, 300.9)}}>
            <Title>Le <span style={{color: YEL}}>jour et la nuit</span></Title>
            <Abs x={0} y={600} w={1080} h={760} style={{overflow: 'hidden'}}>
              {/* après */}
              <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #E8F7F4, #CDEFE9)'}}>
                <div style={{position: 'absolute', left: 60, top: 70}}><FileIco w={170} c={TEAL} ext="DOCX" /></div>
                <div style={{position: 'absolute', left: 270, top: 80, right: 40}}><Mono size={30} color={INK} style={{whiteSpace: 'normal', wordBreak: 'break-all'}}>QHSE_PR_20261010_Soudage_V03.docx</Mono></div>
                {[['Projet', 'QHSE'], ['Type', 'Procédure'], ['Date', '10/10/2026'], ['Objet', 'Soudage'], ['Version', '03']].map(([k2, v], k) => <div key={k2} style={{position: 'absolute', left: 80 + (k % 2) * 470, top: 330 + Math.floor(k / 2) * 120, display: 'flex', gap: 12, alignItems: 'baseline', opacity: pop(t, 311.6 + k * 0.15)}}><T size={30} color="#5B6A85">{k2}</T><T size={40} color={INK}>{v}</T></div>)}
                <div style={{position: 'absolute', right: 40, top: 220, opacity: pop(t, 311.6)}}><Chip c={TEAL} size={28}>Carte d'identité</Chip></div>
              </div>
              {/* avant */}
              <div style={{position: 'absolute', left: 0, top: 0, width: cut, height: '100%', overflow: 'hidden', background: 'linear-gradient(180deg, #2A2238, #1A1426)'}}>
                <div style={{position: 'absolute', left: 60, top: 70, width: 960}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 30}}><FileIco w={170} c={RED} ext="DOCX" /><Mono size={44} color={LIGHT}>Révision_final.docx</Mono></div>
                  {t > 308.1 && <div style={{marginTop: 60, transform: `rotate(-4deg) scale(${spring(t, 308.15)})`, display: 'inline-block', border: `6px solid ${RED}`, borderRadius: 12, padding: '4px 20px'}}><T size={54} color={RED}>CHAOS ASSURÉ</T></div>}
                </div>
                {Array.from({length: 7}, (_, k) => <div key={k} style={{position: 'absolute', left: 80 + random(`q${k}`) * 820, top: 420 + random(`qy${k}`) * 260 + Math.sin(t * 2 + k) * 14, fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: 'rgba(255,255,255,0.25)'}}>?</div>)}
              </div>
              {cut > 4 && cut < 1076 && <div style={{position: 'absolute', left: cut - 6, top: 0, width: 12, height: '100%', background: YEL, boxShadow: `0 0 30px ${YEL}`}}><div style={{position: 'absolute', left: -34, top: 340, width: 80, height: 80, borderRadius: 40, background: YEL, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={36} color={INK}>⇆</T></div></div>}
            </Abs>
            {t > 316.2 && Array.from({length: 5}, (_, k) => <div key={k} style={{position: 'absolute', left: 140 + k * 180, top: 1420 - (1 - qm) * 200, fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: RED, opacity: qm}}>?</div>)}
            {t > 316.2 && <Row y={1400}><Chip c={TEAL} q={spring(t, 316.3)}>Ambiguïté : zéro</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 4 : outils et pratiques ─────────── */
const P4: React.FC = () => {
  const t = useT();
  if (t < 320.5) return null;
  const o = pop(t, 320.5);
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Title>Deux grandes <span style={{color: YEL}}>philosophies</span></Title>
      {/* philosophie 1 : en interne */}
      <Abs x={70} y={590} w={940} h={560} style={{borderRadius: 30, background: PAPER, boxShadow: '0 30px 60px rgba(0,0,0,0.5)', padding: 30, boxSizing: 'border-box', transform: `scale(${spring(t, 328.2)})`, opacity: t > 328.1 ? 1 : 0}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16}}><div style={{width: 64, height: 64, borderRadius: 32, background: YEL, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={38} color={INK}>1</T></div><T size={44} color={INK}>Tout gérer en interne</T></div>
        {t > 331.8 && (
          <div style={{marginTop: 24, display: 'grid', gridTemplateColumns: '170px 1fr 120px', borderTop: '3px solid #C9D3E6', borderLeft: '3px solid #C9D3E6'}}>
            {[['Code', 'Titre', 'Version'], ['PR-QHSE-001', 'Soudage', 'V03'], ['MO-QHSE-004', 'Meulage', 'V01'], ['RE-GQ-001', 'Audit interne', 'V02']].flatMap((r, i) => r.map((c, j) => (
              <div key={`${i}-${j}`} style={{padding: '10px 12px', borderRight: '3px solid #C9D3E6', borderBottom: '3px solid #C9D3E6', background: i === 0 ? '#E3F5E9' : '#fff', opacity: pop(t, 331.9 + i * 0.2 + j * 0.05)}}><Mono size={i === 0 ? 24 : 22} color={INK}>{c}</Mono></div>
            )))}
          </div>
        )}
        {t > 332.0 && <div style={{position: 'absolute', right: 26, top: 22, opacity: pop(t, 332.0)}}><F n="tableau" size={70} /></div>}
      </Abs>
      {t > 332.7 && <Abs x={600} y={1110} style={{transform: `rotate(-6deg) scale(${spring(t, 332.75, 9, 18)})`}}><Chip c="#6E7FA0" dark={false}><F n="cadenas" size={44} />Rigueur de fer</Chip></Abs>}
      {/* philosophie 2 : esquissée */}
      <Abs x={70} y={1240} w={940} h={200} style={{borderRadius: 30, border: '4px dashed rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 16, padding: '0 30px', boxSizing: 'border-box', opacity: t > 328.6 ? 0.6 : 0}}>
        <div style={{width: 64, height: 64, borderRadius: 32, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={38}>2</T></div><T size={40} color={DIM}>La seconde philosophie…</T>
      </Abs>
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
      {t > 2.5 && t < 90.2 && <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', opacity: pop(t, 2.5) * (1 - prog(t, 89.8, 90.2))}}><Label text="CODIFIER_DOCUMENTS_QHSE" p={prog(t, 2.6, 3.6, (x) => x)} size={30} /></div>}
      {p && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 236, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: pop(t, p.at + WIPE - 0.3) * (1 - prog(t, p.end - 0.3, p.end))}}>
          <div style={{padding: '6px 16px', borderRadius: '12px 12px 0 0', background: p.c}}><T size={30} color={INK}>{p.n}/4</T></div>
          <div style={{padding: '8px 22px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${p.c}`}}><T size={34}>{p.l}</T></div>
        </div>
      )}
    </AbsoluteFill>
  );
};

const Bg: React.FC = () => {
  const t = useT();
  const p = PT.find((x) => t >= x.at && t < x.end);
  const c = p ? p.c : ORA;
  return (
    <AbsoluteFill style={{background: BG}}>
      {/* trame de plan technique */}
      <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.05) 2px, transparent 2px)', backgroundSize: '90px 90px', backgroundPosition: `${-t * 4}px ${-t * 4}px`}} />
      <AbsoluteFill style={{background: `radial-gradient(circle at 85% 18%, ${c}2E, transparent 45%), radial-gradient(circle at 10% 88%, ${c}22, transparent 45%)`}} />
    </AbsoluteFill>
  );
};

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'stylo', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2}, {at: 2.6, s: 'tick', v: 0.3},
  ...Array.from({length: 8}, (_, k) => ({at: 2.8 + k * 0.09, s: 'page', v: 0.15})), {at: 3.0, s: 'sfx/pop', v: 0.3}, {at: 3.4, s: 'sfx/pop', v: 0.3}, {at: 6.6, s: 'sfx/swish', v: 0.4}, {at: 7.6, s: 'validation', v: 0.32},
  {at: 9.6, s: 'sfx/whoosh', v: 0.3}, ...Array.from({length: 10}, (_, k) => ({at: 11.3 + k / 2.2, s: 'tick', v: 0.25})), {at: 18.42, s: 'sfx/thud', v: 0.35}, {at: 19.82, s: 'sfx/pop', v: 0.28}, {at: 21.34, s: 'sfx/pop', v: 0.28},
  ...Array.from({length: 6}, (_, k) => ({at: 21.4 + k * 0.4, s: 'sfx/click', v: 0.2})), {at: 24.0, s: 'deep-hit', v: 0.35},
  ...[33.38, 35.42, 36.74, 41.5, 42.34, 43.02].map((at) => ({at, s: 'notification', v: 0.32})), {at: 46.2, s: 'sfx/whoosh', v: 0.3}, {at: 47.4, s: 'alarme', v: 0.18, dur: 1.6}, {at: 47.45, s: 'tampon', v: 0.45},
  {at: 49.4, s: 'sfx/rise', v: 0.28}, {at: 52.4, s: 'bass-hit', v: 0.35}, {at: 57.9, s: 'tension', v: 0.15, dur: 1.4}, ...Array.from({length: 8}, (_, k) => ({at: 57.95 + k * 0.18, s: 'tick', v: 0.2})), {at: 59.4, s: 'sfx/ding', v: 0.35},
  ...[61.14, 62.06, 62.82].map((at) => ({at, s: 'sfx/click', v: 0.5})), {at: 64.9, s: 'sfx/whoosh', v: 0.3}, {at: 65.5, s: 'deep-hit', v: 0.45}, {at: 68.4, s: 'validation', v: 0.32},
  {at: 72.1, s: 'sfx/thud', v: 0.35}, ...[78.2, 82.06, 84.26, 86.22].map((at) => ({at, s: 'page', v: 0.45})),
  ...PT.flatMap((p) => [{at: p.at, s: 'sfx/whoosh', v: 0.4}, {at: p.at + 0.5, s: 'page', v: 0.5}, {at: p.at + 0.9, s: 'stylo', v: 0.3}, {at: p.at + 1.0, s: 'bass-hit', v: 0.3}, {at: p.at + WIPE - 0.5, s: 'soft-whoosh', v: 0.35, dur: 1}]),
  {at: 99.1, s: 'sfx/rise', v: 0.25}, {at: 104.2, s: 'sfx/swish', v: 0.3}, {at: 108.5, s: 'bass-hit', v: 0.35},
  ...LEVELS.flatMap((L) => [{at: L.at, s: 'sfx/thud', v: 0.45}, {at: L.at + 0.2, s: 'sfx/whoosh', v: 0.25}]),
  {at: 149.5, s: 'sfx/bell', v: 0.35}, {at: 152.0, s: 'tampon', v: 0.4}, {at: 153.1, s: 'sfx/pop', v: 0.3}, {at: 153.3, s: 'tension', v: 0.15, dur: 2}, {at: 153.6, s: 'validation', v: 0.3},
  ...[160.9, 161.3, 161.7].map((at) => ({at, s: 'sfx/pop', v: 0.3})), {at: 162.9, s: 'tampon', v: 0.3}, {at: 163.1, s: 'tampon', v: 0.3}, ...[161.06, 163.02, 164.98].map((at) => ({at, s: 'sfx/ding', v: 0.28})), {at: 165.1, s: 'tampon', v: 0.5},
  ...Array.from({length: 14}, (_, k) => ({at: 172.4 + k * 0.05, s: 'tick', v: 0.25})), ...[175.9, 176.5, 177.1].map((at) => ({at, s: 'sfx/click', v: 0.35})),
  ...Array.from({length: 24}, (_, k) => ({at: 180.3 + k * 0.05, s: 'tick', v: 0.25})), ...[184.65, 187.25, 188.85].map((at) => ({at, s: 'sfx/pop', v: 0.3})),
  {at: 194.7, s: 'sfx/pop', v: 0.25}, {at: 195.0, s: 'sfx/pop', v: 0.25}, {at: 198.4, s: 'page', v: 0.5}, ...[201.06, 202.26, 202.8, 203.1, 203.4].map((at) => ({at, s: 'stylo', v: 0.25})),
  {at: 207.3, s: 'sfx/swish', v: 0.3}, {at: 208.2, s: 'sfx/ding', v: 0.3}, {at: 209.45, s: 'cadenas', v: 0.55},
  {at: 212.9, s: 'sfx/pop', v: 0.3}, {at: 215.2, s: 'sfx/whoosh', v: 0.3}, {at: 216.2, s: 'sfx/thud', v: 0.4}, {at: 219.35, s: 'sfx/pop', v: 0.25}, ...[223.66, 224.18, 224.7].map((at) => ({at, s: 'sfx/pop', v: 0.28})),
  {at: 234.0, s: 'sfx/swish', v: 0.3}, {at: 236.9, s: 'sfx/pop', v: 0.3}, ...Array.from({length: 10}, (_, k) => ({at: 237.0 + k * 0.25, s: 'sfx/click', v: 0.18})),
  ...CARS.flatMap((c) => [{at: c.at, s: 'sfx/whoosh', v: 0.3}, {at: c.at + 0.5, s: 'sfx/thud', v: 0.35}]), {at: 256.05, s: 'sfx/ding', v: 0.3}, {at: 258.35, s: 'tampon', v: 0.45},
  {at: 260.3, s: 'sfx/pop', v: 0.3}, ...Array.from({length: 14}, (_, k) => ({at: 260.4 + k * 0.1, s: 'sfx/click', v: 0.15})), ...[267.0, 268.58, 269.1].map((at) => ({at, s: 'sfx/thud', v: 0.3})), {at: 272.3, s: 'sfx/ding', v: 0.3}, {at: 276.1, s: 'validation', v: 0.3},
  {at: 279.0, s: 'sfx/whoosh', v: 0.25}, {at: 287.2, s: 'sfx/pop', v: 0.3}, {at: 289.0, s: 'sfx/click', v: 0.35}, {at: 290.9, s: 'sfx/swish', v: 0.35}, {at: 292.4, s: 'validation', v: 0.3}, {at: 294.85, s: 'sfx/pop', v: 0.3},
  {at: 296.1, s: 'sfx/pop', v: 0.3}, {at: 296.4, s: 'tension', v: 0.12, dur: 2}, {at: 298.55, s: 'sfx/ding', v: 0.3},
  {at: 301.0, s: 'sfx/whoosh', v: 0.3}, {at: 308.15, s: 'tampon', v: 0.45}, {at: 309.5, s: 'sfx/swish', v: 0.4}, {at: 311.6, s: 'sfx/ding', v: 0.3}, {at: 316.3, s: 'validation', v: 0.32},
  {at: 328.2, s: 'sfx/pop', v: 0.3}, {at: 331.9, s: 'page', v: 0.3}, {at: 332.75, s: 'cadenas', v: 0.45},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Codification: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <Bg />
    <Gate from={0} to={69.9}><Intro /></Gate>
    <Gate from={69.5} to={90.6}><Plan /></Gate>
    <Gate from={92.7} to={141.0}><P1 /></Gate>
    <Gate from={143.2} to={210.4}><P2 /></Gate>
    <Gate from={212.6} to={318.2}><P3 /></Gate>
    <Gate from={320.4} to={OUTRO_AT}><P4 /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><FolderWipe p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.3} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-codification-documents-origine.m4a')} trimAfter={s(333.6)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

import React from 'react';
import {AbsoluteFill, Audio, Img, interpolate, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, prog, useT} from '../anim';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {BLUE, Book, GREEN} from '../pub14001/Pub14001';
import {handFont, s, sansFont} from '../theme';

/**
 * Pub narrative « Décrypter l'ISO 14001 » au format récit illustré sur papier (skill capsule-recit-illustre) :
 * Koffi, responsable QHSE à Abidjan, passe d'un classeur parfait que personne n'ouvre à une méthode vécue sur le
 * terrain. Fond papier crème vignetté, titre marine qui s'écrit sur la voix avec surligneur vert, illustrations IA
 * à plat (public/recit14001), accessoires dessinés en code. Mise en situation : aucun chiffre ni témoignage.
 */
const INK = '#082B66';
const PAPER = '#E9DCBB';
const RED = '#B8322A';
const END = 61.0;
export const RECIT14001_FRAMES = s(END + 3.6);

const fade = (t: number, a: number, b: number, d = 0.25) => prog(t, a, a + d) * (1 - prog(t, b - d, b, easeIn));
const rise = (t: number, at: number, d = 0.5) => prog(t, at, at + d, easeOut);

/* ---------- Fond papier ---------- */
const PaperBg: React.FC = () => (
  <AbsoluteFill>
    <AbsoluteFill style={{background: `radial-gradient(ellipse 85% 70% at 50% 46%, ${PAPER} 38%, #C9B48A 72%, #2C2316 135%)`}} />
    <svg width="100%" height="100%" style={{position: 'absolute', inset: 0, opacity: 0.22, mixBlendMode: 'multiply'}}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.27  0 0 0 0 0.15  0 0 0 0.9 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  </AbsoluteFill>
);

/* ---------- Titre qui s'écrit mot à mot ---------- */
type W = [string, number, boolean?];
type Phrase = {at: number; end: number; size?: number; words: W[]};

const P = (end: number, words: W[], size?: number): Phrase => ({at: words[0][1], end, words, size});

const PHRASES: Phrase[] = [
  P(3.4, [['« Notre', 0.15], ['système', 0.4], ['environnemental ?', 0.8, true], ['Il', 1.85], ['est', 2.0], ['dans', 2.15], ['le', 2.35], ['classeur. »', 2.5, true]]),
  P(6.65, [["L'auditeur", 3.52], ['ouvre', 4.2], ['le', 4.56], ['classeur…', 4.8, true], ['et', 5.64], ['demande :', 5.84]]),
  P(9.0, [['« Montrez-moi', 6.72], ['vos', 7.24], ['aspects', 7.44, true], ['environnementaux. »', 7.76, true]], 68),
  P(10.2, [['Silence.', 9.08, true]], 110),
  P(15.3, [['Koffi', 10.28, true], ['est', 10.72], ['responsable', 10.88], ['QHSE', 11.6], ['dans', 12.48], ['une', 12.6], ['usine', 12.76], ['agroalimentaire,', 13.12], ['à', 14.16], ['Abidjan.', 14.32, true]], 66),
  P(20.4, [['Avant,', 15.4], ['il', 15.84], ['avait', 16.04], ['tout', 16.32], ['imprimé.', 16.56, true], ['La', 17.36], ['norme.', 17.6], ['Les', 18.08], ['procédures.', 18.28], ['Les', 19.12], ['formulaires.', 19.36]], 66),
  P(23.7, [['Un', 20.48], ['classeur', 20.6], ['parfait…', 21.2, true], ['que', 22.2], ['personne', 22.48, true], ["n'ouvrait.", 22.84, true]]),
  P(27.15, [['Puis', 23.76], ['il', 24.04], ['a', 24.24], ['repris', 24.36], ['la', 24.68], ['norme,', 24.8], ['exigence', 25.32, true], ['par', 26.0, true], ['exigence.', 26.24, true]]),
  P(30.15, [['Quels', 27.24], ['rejets ?', 27.4, true], ['Quels', 28.16], ['déchets ?', 28.36, true], ['Quelles', 29.12], ['obligations ?', 29.36, true]]),
  P(33.5, [['Il', 30.2], ['a', 30.44], ['posé', 30.52], ['les', 30.8], ['questions', 30.96], ['sur', 31.44], ['le', 31.6], ['terrain,', 31.8, true], ['avec', 32.4], ['ses', 32.68], ['équipes.', 32.88, true]]),
  P(37.35, [['Au', 33.6], ['passage', 33.68], ['suivant', 34.08], ['de', 34.36], ["l'auditeur,", 34.48], ["c'est", 35.2], ["l'opérateur", 35.44, true], ['qui', 36.04], ['a', 36.2], ['répondu.', 36.28, true]], 66),
  P(42.9, [["Qu'est-ce", 37.44], ['qui', 37.7], ['a', 37.85], ['changé ?', 37.95], ['Avant,', 38.56], ['la', 39.04], ['norme', 39.2], ['était', 39.56], ['un', 39.76], ['document.', 39.88, true], ['Après,', 40.88], ["c'est", 41.28], ['devenu', 41.52], ['une', 41.96], ['méthode.', 42.12, true]], 64),
  P(47.7, [['Comprends.', 42.96, true], ['Traduis.', 44.36, true], ['Prouve.', 45.96, true]], 92),
  P(50.95, [['Ne', 47.76], ['range', 47.92], ['pas', 48.2], ["l'ISO 14001.", 48.36], ['Décrypte-la.', 49.92, true]], 78),
  P(55.4, [['Et', 51.04], ['toi…', 51.24], ['ton', 51.72], ['système', 51.92], ['vit', 53.12], ['sur', 53.32], ['le', 53.48], ['terrain,', 53.64, true], ['ou', 54.12], ['dans', 54.28], ['un', 54.44], ['classeur ?', 54.56, true]], 70),
];

const Headline: React.FC = () => {
  const t = useT();
  const ph = PHRASES.find((p) => t >= p.at - 0.05 && t < p.end);
  if (!ph) return null;
  const size = ph.size ?? 76;
  const out = prog(t, ph.end - 0.18, ph.end, easeIn);
  return (
    <div style={{position: 'absolute', left: 64, right: 56, top: 150, display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', opacity: 1 - out}}>
      {ph.words.map(([w, at, hl], i) => {
        const p = rise(t, at, 0.3);
        const h = prog(t, at + 0.05, at + 0.4, easeInOut);
        return (
          <span
            key={i}
            style={{
              fontFamily: sansFont,
              fontWeight: 900,
              fontSize: size,
              lineHeight: 1.16,
              letterSpacing: -1,
              color: INK,
              marginRight: size * 0.24,
              opacity: p,
              transform: `translateY(${(1 - p) * 12}px)`,
              backgroundImage: hl ? `linear-gradient(${GREEN}B0, ${GREEN}B0)` : undefined,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '0 88%',
              backgroundSize: hl ? `${h * 100}% 42%` : undefined,
              padding: '0 4px',
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

/* ---------- Briques visuelles ---------- */
/** Illustration posée comme une photo sur le papier, travelling lent. */
const Plate: React.FC<{src: string; a: number; b: number; y?: number; w?: number; rot?: number; pos?: string; h?: number; zoom?: [number, number]}> = ({src, a, b, y = 600, w = 880, h, rot = -1.2, pos = 'center', zoom = [1.02, 1.1]}) => {
  const t = useT();
  const o = fade(t, a, b, 0.3);
  if (o <= 0) return null;
  const z = interpolate(t, [a, b], zoom);
  const hh = h ?? w * (4 / 3);
  return (
    <div style={{position: 'absolute', left: (1080 - w) / 2, top: y + (1 - rise(t, a, 0.5)) * 20, width: w, height: hh, opacity: o, transform: `rotate(${rot}deg)`, padding: 14, background: '#FBF6EA', boxShadow: '0 24px 50px rgba(44,35,22,0.35)', boxSizing: 'border-box'}}>
      <div style={{width: '100%', height: '100%', overflow: 'hidden'}}>
        <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${z})`}} />
      </div>
    </div>
  );
};

/** Étiquette papier blanche inclinée. */
const Label: React.FC<{at: number; until: number; x: number; y: number; rot?: number; size?: number; color?: string; bg?: string; icon?: string; children: React.ReactNode}> = ({at, until, x, y, rot = -2, size = 46, color = INK, bg = '#FFFFFF', icon, children}) => {
  const t = useT();
  const o = fade(t, at, until, 0.22);
  if (o <= 0) return null;
  const p = rise(t, at, 0.4);
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) rotate(${rot}deg) translateY(${(1 - p) * 18}px) scale(${0.9 + 0.1 * p})`, opacity: o, background: bg, padding: '18px 30px', borderRadius: 10, boxShadow: '0 12px 26px rgba(44,35,22,0.3)', display: 'flex', alignItems: 'center', gap: 16, whiteSpace: 'nowrap'}}>
      {icon && <F n={icon} size={size * 1.4} />}
      <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color}}>{children}</span>
    </div>
  );
};

/** Bulle de pensée « ? ». */
const Thought: React.FC<{at: number; until: number; x: number; y: number; text: string}> = ({at, until, x, y, text}) => {
  const t = useT();
  const o = fade(t, at, until, 0.2);
  if (o <= 0) return null;
  const p = rise(t, at, 0.45);
  const bob = Math.sin(t * 3) * 6;
  return (
    <div style={{position: 'absolute', left: x, top: y + bob, transform: `translate(-50%, -50%) scale(${p})`, opacity: o}}>
      <div style={{width: 230, height: 190, borderRadius: '50%', background: '#fff', boxShadow: '0 14px 30px rgba(44,35,22,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 120, color: INK}}>{text}</div>
      <div style={{position: 'absolute', left: 20, bottom: -40, width: 48, height: 40, borderRadius: '50%', background: '#fff'}} />
      <div style={{position: 'absolute', left: -10, bottom: -78, width: 26, height: 22, borderRadius: '50%', background: '#fff'}} />
    </div>
  );
};

/** Tampon encré qui s'écrase. */
const Stamp: React.FC<{at: number; until: number; x: number; y: number; text: string; color?: string; rot?: number}> = ({at, until, x, y, text, color = RED, rot = -12}) => {
  const t = useT();
  const o = fade(t, at, until, 0.15);
  if (o <= 0) return null;
  const k = interpolate(t, [at, at + 0.14, at + 0.24], [2.2, 0.94, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${k})`, opacity: o * 0.92, border: `9px solid ${color}`, borderRadius: 18, padding: '14px 34px', fontFamily: sansFont, fontWeight: 900, fontSize: 78, letterSpacing: 6, color, mixBlendMode: 'multiply', background: 'rgba(255,255,255,0.15)'}}>
      {text}
    </div>
  );
};

/* ---------- Scènes ---------- */
/** 1. Accroche-citation : le classeur et la bulle. */
const Hook: React.FC = () => {
  const t = useT();
  const o = fade(t, 0, 3.45, 0.2);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <div style={{position: 'absolute', left: 540, top: 1150, transform: `translate(-50%, -50%) scale(${0.85 + 0.15 * rise(t, 0, 0.6)}) rotate(${Math.sin(t * 2) * 1.5}deg)`}}>
        <F n="classeur" size={620} />
      </div>
      <div style={{position: 'absolute', left: 180, top: 690, padding: '26px 38px', background: '#fff', borderRadius: 30, boxShadow: '0 14px 30px rgba(44,35,22,0.3)', opacity: rise(t, 0.2), transform: `scale(${0.9 + 0.1 * rise(t, 0.2)})`, fontFamily: handFont, fontSize: 64, color: INK}}>
        « C'est dans le classeur ! »
        <div style={{position: 'absolute', left: 120, bottom: -30, width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: '34px solid #fff'}} />
      </div>
    </AbsoluteFill>
  );
};

/** 4. Avant : piles de documents imprimés sur Koffi. */
const Before: React.FC = () => {
  const t = useT();
  const o = fade(t, 15.35, 23.7, 0.2);
  if (o <= 0) return null;
  const dust = prog(t, 20.5, 23.0, easeInOut);
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Plate src="recit14001/koffi.webp" a={15.35} b={23.7} y={560} w={860} rot={1.2} />
      <AbsoluteFill style={{background: `rgba(120,100,70,${dust * 0.35})`, mixBlendMode: 'multiply'}} />
      <Label at={17.36} until={20.45} x={300} y={1180} rot={-4} icon="parchemin">La norme</Label>
      <Label at={18.08} until={20.45} x={720} y={1330} rot={3} icon="memo">Les procédures</Label>
      <Label at={19.12} until={20.45} x={380} y={1500} rot={-2} icon="clipboard">Les formulaires</Label>
      <Stamp at={22.22} until={23.7} x={560} y={1320} text="CLASSÉ" />
    </AbsoluteFill>
  );
};

/** 5a. Exigence par exigence : la fiche de lecture de la norme. */
const Clauses: React.FC = () => {
  const t = useT();
  const o = fade(t, 23.75, 27.15, 0.2);
  if (o <= 0) return null;
  const rows: [string, string, number][] = [
    ['4', 'Contexte de l’organisme', 25.3],
    ['6.1.2', 'Aspects environnementaux', 25.8],
    ['6.1.3', 'Obligations de conformité', 26.25],
    ['8.1', 'Maîtrise opérationnelle', 26.6],
  ];
  return (
    <AbsoluteFill style={{opacity: o}}>
      <div style={{position: 'absolute', left: 110, top: 720, width: 860, background: '#FFFDF6', borderRadius: 14, boxShadow: '0 24px 50px rgba(44,35,22,0.35)', transform: `rotate(-1.5deg) translateY(${(1 - rise(t, 23.75)) * 30}px)`, overflow: 'hidden'}}>
        <div style={{background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 46, padding: '24px 36px', letterSpacing: 1}}>ISO 14001 — ma lecture</div>
        {rows.map(([n, label, at], i) => {
          const p = rise(t, at, 0.3);
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 24, padding: '26px 36px', borderBottom: '2px dashed #D8CDB3', opacity: 0.35 + 0.65 * p}}>
              <div style={{width: 58, height: 58, borderRadius: 12, border: `5px solid ${p > 0.5 ? GREEN : '#B9AE95'}`, background: p > 0.5 ? GREEN : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 44, fontWeight: 900, fontFamily: sansFont}}>{p > 0.5 ? '✓' : ''}</div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: GREEN, width: 120}}>{n}</div>
              <div style={{fontFamily: handFont, fontSize: 52, color: INK}}>{label}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** 5b. Les questions posées sur le terrain. */
const Field: React.FC = () => {
  const t = useT();
  const o = fade(t, 27.15, 33.55, 0.2);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Plate src="recit14001/usine.webp" a={27.15} b={33.55} y={600} w={880} rot={-1} zoom={[1.0, 1.12]} />
      <Label at={27.4} until={33.55} x={330} y={780} rot={-4} icon="vapeur" size={44}>Rejets ?</Label>
      <Label at={28.36} until={33.55} x={750} y={910} rot={3} icon="recyclage" size={44}>Déchets ?</Label>
      <Label at={29.36} until={33.55} x={420} y={1040} rot={-2} icon="balance" size={44}>Obligations ?</Label>
      <Label at={31.8} until={33.55} x={720} y={1620} rot={2} bg={GREEN} color="#fff" icon="equipe" size={46}>Sur le terrain</Label>
    </AbsoluteFill>
  );
};

/** 6. L'opérateur répond, l'auditrice valide. */
const Operator: React.FC = () => {
  const t = useT();
  const o = fade(t, 33.55, 37.4, 0.2);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Plate src="recit14001/usine.webp" a={33.55} b={37.4} y={620} w={880} h={760} pos="80% 92%" rot={1} zoom={[1.15, 1.25]} />
      <div style={{position: 'absolute', left: 240, top: 1560, transform: `translate(-50%, -50%) scale(${rise(t, 35.3)})`}}>
        <F n="ouvrier-dark" size={300} />
      </div>
      <div style={{position: 'absolute', left: 400, top: 1420, padding: '22px 34px', background: '#fff', borderRadius: 26, boxShadow: '0 14px 30px rgba(44,35,22,0.3)', fontFamily: handFont, fontSize: 52, color: INK, opacity: rise(t, 35.6), transform: `translateY(${(1 - rise(t, 35.6)) * 16}px)`}}>
        « Venez, je vous montre. »
      </div>
      <Stamp at={36.3} until={37.4} x={760} y={1660} text="PREUVE" color={GREEN} rot={-8} />
    </AbsoluteFill>
  );
};

/** 7. Document → méthode. */
const Contrast: React.FC = () => {
  const t = useT();
  const o = fade(t, 37.4, 42.9, 0.2);
  if (o <= 0) return null;
  const card = (at: number, x: number, icon: string, title: string, word: string, on: boolean) => {
    const p = rise(t, at, 0.45);
    return (
      <div style={{position: 'absolute', left: x, top: 820, width: 420, height: 560, background: on ? '#fff' : '#F2EBDA', borderRadius: 20, boxShadow: '0 20px 40px rgba(44,35,22,0.3)', transform: `rotate(${on ? 2 : -2}deg) translateY(${(1 - p) * 40}px)`, opacity: p, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 30, boxSizing: 'border-box', filter: on ? 'none' : 'grayscale(0.7)', border: on ? `6px solid ${GREEN}` : '6px solid transparent'}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, letterSpacing: 4, color: on ? GREEN : '#8A7F68'}}>{title}</div>
        <div style={{marginTop: 40}}>
          <F n={icon} size={240} />
        </div>
        <div style={{marginTop: 40, fontFamily: handFont, fontSize: 70, color: INK}}>{word}</div>
      </div>
    );
  };
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 38.5 && (
        <div style={{position: 'absolute', left: 540, top: 1100, transform: `translate(-50%, -50%) scale(${rise(t, 37.44)})`, fontFamily: sansFont, fontWeight: 900, fontSize: 320, color: INK}}>?</div>
      )}
      {card(38.56, 90, 'classeur', 'AVANT', 'un document', false)}
      {card(40.88, 570, 'engrenage', 'APRÈS', 'une méthode', true)}
    </AbsoluteFill>
  );
};

/** 8. La méthode en 3 lignes, écrite à la main. */
const Method: React.FC = () => {
  const t = useT();
  const o = fade(t, 42.9, 47.7, 0.2);
  if (o <= 0) return null;
  const lines: [string, number][] = [
    ['Comprends l’exigence', 42.96],
    ['Traduis-la en action', 44.36],
    ['Montre la preuve sur le terrain', 45.96],
  ];
  return (
    <AbsoluteFill style={{opacity: o}}>
      <div style={{position: 'absolute', left: 90, top: 720, width: 900, background: '#FFFDF6', borderRadius: 16, boxShadow: '0 24px 50px rgba(44,35,22,0.35)', transform: `rotate(1.5deg) translateY(${(1 - rise(t, 42.9)) * 30}px)`, overflow: 'hidden'}}>
        <div style={{background: GREEN, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 48, padding: '26px 40px'}}>Ta méthode ISO 14001</div>
        {lines.map(([l, at], i) => {
          const chars = Math.round(l.length * prog(t, at, at + 0.9, easeInOut));
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 26, padding: '36px 40px', borderBottom: '2px solid #E5DCC6', minHeight: 90}}>
              <div style={{width: 76, height: 76, borderRadius: '50%', background: t >= at ? INK : '#D8CDB3', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{i + 1}</div>
              <div style={{fontFamily: handFont, fontSize: 60, color: INK, lineHeight: 1.1}}>{l.slice(0, chars)}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** 9. Panneau indicateur : Ranger / Décrypter. */
const Signpost: React.FC = () => {
  const t = useT();
  const o = fade(t, 47.7, 50.95, 0.2);
  if (o <= 0) return null;
  const sw = prog(t, 49.9, 50.4, easeOut);
  const arrow = (y: number, text: string, rot: number, color: string, dir: 1 | -1) => (
    <div style={{position: 'absolute', left: 540, top: y, transform: `translateX(${dir === 1 ? 0 : -100}%) rotate(${rot}deg)`, transformOrigin: dir === 1 ? '0 50%' : '100% 50%'}}>
      <div style={{width: 470, height: 130, background: color, clipPath: dir === 1 ? 'polygon(0 0, 82% 0, 100% 50%, 82% 100%, 0 100%)' : 'polygon(18% 0, 100% 0, 100% 100%, 18% 100%, 0 50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.3)'}}>
        <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 54, color: '#fff', letterSpacing: 1}}>{text}</span>
      </div>
    </div>
  );
  return (
    <AbsoluteFill style={{opacity: o}}>
      <div style={{position: 'absolute', left: 525, top: 820, width: 30, height: 900, background: '#7A5634', borderRadius: 8, boxShadow: '0 10px 20px rgba(0,0,0,0.3)'}} />
      {arrow(930, 'RANGER', -6, '#8A7F68', -1)}
      {arrow(1150, 'DÉCRYPTER', -14 + 20 * sw, sw > 0.2 ? GREEN : '#A89C82', 1)}
    </AbsoluteFill>
  );
};

/** 10. Terrain ou classeur ? */
const Question: React.FC = () => {
  const t = useT();
  const o = fade(t, 50.95, 55.4, 0.2);
  if (o <= 0) return null;
  const disc = (x: number, at: number, child: React.ReactNode, label: string) => {
    const p = rise(t, at, 0.45);
    return (
      <div style={{position: 'absolute', left: x, top: 1100, transform: `translate(-50%, -50%) scale(${0.8 + 0.2 * p})`, opacity: p, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{width: 400, height: 400, borderRadius: '50%', overflow: 'hidden', border: '12px solid #FBF6EA', boxShadow: '0 20px 40px rgba(44,35,22,0.35)', background: '#F2EBDA', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{child}</div>
        <div style={{marginTop: 30, fontFamily: sansFont, fontWeight: 900, fontSize: 54, color: INK}}>{label}</div>
      </div>
    );
  };
  return (
    <AbsoluteFill style={{opacity: o}}>
      {disc(290, 53.5, <Img src={staticFile('recit14001/usine.webp')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '70% 75%'}} />, 'Le terrain')}
      {disc(790, 54.4, <F n="classeur" size={260} />, 'Le classeur')}
      <div style={{position: 'absolute', left: 540, top: 1100, transform: 'translate(-50%, -50%)', fontFamily: handFont, fontSize: 90, color: INK, opacity: rise(t, 54.1)}}>ou</div>
    </AbsoluteFill>
  );
};

/** 11. Carte d'appel à l'action. */
const Cta: React.FC = () => {
  const t = useT();
  const a = 55.4;
  const o = prog(t, a, a + 0.3);
  if (o <= 0) return null;
  const btn = rise(t, a + 1.2);
  const pulse = 1 + Math.max(0, Math.sin((t - a) * 4)) * 0.03 * prog(t, a + 2, a + 2.5);
  return (
    <AbsoluteFill style={{opacity: o}}>
      <div style={{position: 'absolute', left: 70, top: 250, width: 940, height: 1330, background: '#FFFDF6', borderRadius: 30, boxShadow: '0 30px 60px rgba(44,35,22,0.4)', transform: `translateY(${(1 - rise(t, a, 0.6)) * 60}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 50px', boxSizing: 'border-box'}}>
        <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 36, letterSpacing: 6, color: GREEN}}>L’OUVRAGE</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 84, color: INK, textAlign: 'center', lineHeight: 1.05, marginTop: 14}}>
          Décrypter
          <br />
          l’ISO <span style={{color: GREEN}}>14001</span>
        </div>
        <div style={{marginTop: 10}}>
          <Book w={430} at={a + 0.4} />
        </div>
        <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 40, color: '#5A5A5A', marginTop: 0}}>par UNIVERSNORMES QHSE</div>
        <div style={{marginTop: 50, background: GREEN, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 54, padding: '28px 60px', borderRadius: 999, opacity: btn, transform: `scale(${(0.9 + 0.1 * btn) * pulse})`, boxShadow: '0 12px 24px rgba(34,181,115,0.4)'}}>
          Le lien est en bio →
        </div>
      </div>
      <div style={{position: 'absolute', left: 600, top: 1620, fontFamily: handFont, fontSize: 70, color: INK, transform: 'rotate(-6deg)', opacity: rise(t, a + 4.4)}}>lien en bio ↑</div>
    </AbsoluteFill>
  );
};

const Logo: React.FC = () => {
  const t = useT();
  return <Img src={staticFile('promo/logo.png')} style={{position: 'absolute', right: 40, bottom: 40, width: 220, opacity: 0.85 * (1 - prog(t, 55.2, 55.5)), borderRadius: 8}} />;
};

const SFX: Sfx[] = [
  {at: 0.15, s: 'sfx/pop', v: 0.25},
  {at: 4.2, s: 'page', v: 0.4},
  {at: 9.08, s: 'tick', v: 0.25, dur: 1.1},
  {at: 10.25, s: 'soft-whoosh', v: 0.2},
  {at: 17.36, s: 'page', v: 0.3},
  {at: 18.08, s: 'page', v: 0.3},
  {at: 19.12, s: 'page', v: 0.3},
  {at: 22.22, s: 'tampon', v: 0.45},
  {at: 25.3, s: 'stylo', v: 0.3},
  {at: 27.4, s: 'sfx/pop', v: 0.2},
  {at: 28.36, s: 'sfx/pop', v: 0.2},
  {at: 29.36, s: 'sfx/pop', v: 0.2},
  {at: 36.3, s: 'tampon', v: 0.4},
  {at: 36.4, s: 'validation', v: 0.25},
  {at: 38.56, s: 'soft-whoosh', v: 0.2},
  {at: 40.88, s: 'soft-whoosh', v: 0.2},
  {at: 42.96, s: 'stylo', v: 0.3},
  {at: 44.36, s: 'stylo', v: 0.3},
  {at: 45.96, s: 'stylo', v: 0.3},
  {at: 49.92, s: 'sfx/swish', v: 0.3},
  {at: 55.4, s: 'signature-marque', v: 0.3, dur: 4},
];

export const Recit14001: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <PaperBg />
    <Hook />
    <Plate src="recit14001/auditrice.webp" a={3.45} b={10.2} y={600} w={860} rot={-1.2} />
    <Thought at={9.08} until={10.2} x={800} y={760} text="?" />
    <Plate src="recit14001/usine.webp" a={10.2} b={15.35} y={600} w={880} rot={1} zoom={[1.12, 1.0]} />
    <Label at={10.3} until={15.35} x={330} y={1640} rot={-3} icon="agent-hse">Koffi · QHSE</Label>
    <Label at={14.32} until={15.35} x={780} y={1500} rot={3} icon="epingle" size={44}>Abidjan</Label>
    <Before />
    <Clauses />
    <Field />
    <Operator />
    <Contrast />
    <Method />
    <Signpost />
    <Question />
    <Cta />
    <Headline />
    <Logo />
    <Audio src={staticFile('recit14001/voix-recit14001.mp3')} />
    <Audio src={staticFile('musique-promo.m4a')} volume={(f) => 0.15 * Math.min(1, Math.max(0, (f - s(55.3)) / 30)) * Math.max(0, Math.min(1, (RECIT14001_FRAMES - f) / 45))} />
    <SoundDesign cues={SFX} />
  </AbsoluteFill>
);

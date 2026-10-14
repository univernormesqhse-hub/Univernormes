import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s, sansFont} from '../theme';
import {Abs, Bg, BLUE, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, LOGO, PAPER, PH, pop, prog, RED, spring, T, useT} from '../implIso/kit';
import {captions} from './captions';

/**
 * « La procédure des procédures » (6 min 13) — voix d'origine, sous-titres recalés mot à mot, photos réelles,
 * thème « papier quadrillé » de la série, finition « haut de gamme ».
 * Fil rouge inédit : le CLASSEUR À INTERCALAIRES. L'en-tête est une rangée de 7 onglets de classeur (un par chapitre) ;
 * l'onglet du chapitre en cours se soulève et prend sa couleur. Chaque chapitre s'ouvre par une FICHE BRISTOL qui sort
 * d'un tiroir d'archives (glissé vertical + bascule 3D) — transition inédite dans la série.
 * Scènes : mise en abyme (effet Droste) « les règles pour écrire les règles », tourbillon de feuilles du chaos qui se
 * range en grille, clé de voûte, mémoire qui se recondense, rouleaux « bons documents / bon endroit / bon moment »,
 * pyramide documentaire en 3 étages, passeport du document et code décodé, cycle de vie orbital, sablier des 5 ans,
 * ruban rouge qui se rompt, écran partagé chaos / système, cage contre fondations.
 */
const ORANGE = '#F28C1E';
const VIO = '#7B5CD6';
const TEAL = '#14A3A3';
const GOLD = '#F5B700';
const OUTRO_AT = 373.2;
export const PROCPROC_FRAMES = s(OUTRO_AT + 3.8);

const CH = [
  {at: 2.6, n: 'I', l: 'Enjeu', title: 'Qui écrit les règles ?', c: BLUE},
  {at: 34.2, n: 'II', l: 'Chaos', title: 'Et sans système ?', c: RED},
  {at: 71.5, n: 'III', l: 'Solution', title: 'La procédure des procédures', c: GREEN},
  {at: 134.1, n: 'IV', l: 'Pyramide', title: 'La pyramide documentaire', c: VIO},
  {at: 207.3, n: 'V', l: 'Règles', title: 'Les règles du jeu', c: ORANGE},
  {at: 288.3, n: 'VI', l: 'Débat', title: 'Juste de la bureaucratie ?', c: TEAL},
  {at: 353.0, n: 'VII', l: 'Vision', title: 'Cage ou fondations ?', c: INK},
];
const chapAt = (t: number) => CH.reduce((k, c, i) => (t >= c.at ? i : k), 0);

/* ─────────── Briques visuelles ─────────── */
const Kin: React.FC<{text: string; at: number; size: number; color?: string; stagger?: number; style?: React.CSSProperties}> = ({text, at, size, color = INK, stagger = 0.025, style}) => {
  const t = useT();
  return (
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, lineHeight: 1.08, letterSpacing: -1, ...style}}>
      {(() => {
        let n = 0;
        return text.split(' ').map((w, wi) => (
          <span key={wi} style={{display: 'inline-block', whiteSpace: 'nowrap', marginRight: size * 0.25}}>
            {w.split('').map((ch, i) => {
              const k = n++;
              const p = prog(t, at + k * stagger, at + k * stagger + 0.45, easeOut);
              return <span key={i} style={{display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * size * 0.6}px) rotate(${(1 - p) * 8}deg)`, filter: `blur(${(1 - p) * 10}px)`}}>{ch}</span>;
            })}
          </span>
        ));
      })()}
    </div>
  );
};
const Center: React.FC<{y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({y, children, style}) => (
  <Abs x={40} y={y} w={1000} style={{textAlign: 'center', ...style}}>{children}</Abs>
);
const Deep: React.FC<{src: string; x: number; y: number; w: number; h: number; at: number; pos?: string; tilt?: number; children?: React.ReactNode; filter?: string}> = ({src, x, y, w, h, at, pos = 'center', tilt = 1, children, filter}) => {
  const t = useT();
  const k = t - at;
  const inn = prog(t, at, at + 0.7, easeOut);
  const sweep = ((k * 0.45) % 1.6) - 0.3;
  return (
    <Abs x={x} y={y} w={w} h={h} style={{perspective: 2200, opacity: inn}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 30, overflow: 'hidden', border: '8px solid #fff', boxShadow: '0 40px 80px rgba(20,33,61,0.3)', transform: `rotateY(${Math.sin(k * 0.6) * 4 * tilt}deg) rotateX(${Math.cos(k * 0.5) * 2.5 * tilt}deg) scale(${0.92 + inn * 0.08})`}}>
        <Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, filter, transform: `scale(${1.12 + Math.min(k, 20) * 0.01}) translateX(${Math.sin(k * 0.4) * 14}px)`}} />
        <div style={{position: 'absolute', inset: 0, background: `linear-gradient(105deg, transparent ${sweep * 100 - 12}%, rgba(255,255,255,0.3) ${sweep * 100}%, transparent ${sweep * 100 + 12}%)`}} />
        <div style={{position: 'absolute', inset: 0, boxShadow: 'inset 0 0 120px rgba(20,33,61,0.3)'}} />
        {children}
      </div>
    </Abs>
  );
};
const Pill: React.FC<{at: number; c: string; children: React.ReactNode; size?: number; style?: React.CSSProperties}> = ({at, c, children, size = 34, style}) => {
  const t = useT();
  const p = Math.min(1, spring(t, at, 8, 14));
  return <div style={{display: 'inline-block', padding: `${size * 0.3}px ${size * 0.7}px`, borderRadius: 60, background: c, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: size, transform: `scale(${Math.max(0, p)})`, boxShadow: '0 10px 24px rgba(20,33,61,0.18)', ...style}}>{children}</div>;
};
const Stamp: React.FC<{at: number; c: string; text: string; x: number; y: number; rot?: number; size?: number}> = ({at, c, text, x, y, rot = -8, size = 54}) => {
  const t = useT();
  if (t < at) return null;
  const p = prog(t, at, at + 0.22, easeIn);
  return (
    <Abs x={x} y={y} style={{transform: `rotate(${rot}deg) scale(${lerp(2.2, 1, p)})`, opacity: p, zIndex: 5}}>
      <div style={{padding: '10px 26px', border: `7px solid ${c}`, borderRadius: 14, color: c, fontFamily: sansFont, fontWeight: 900, fontSize: size, letterSpacing: 2, textTransform: 'uppercase', background: 'rgba(255,255,255,0.85)', whiteSpace: 'nowrap'}}>{text}</div>
    </Abs>
  );
};
const Sheet: React.FC<{w: number; h: number; c?: string; label?: string; ok?: boolean; style?: React.CSSProperties}> = ({w, h, c = BLUE, label, ok, style}) => (
  <div style={{width: w, height: h, background: '#fff', borderRadius: 8, boxShadow: '0 8px 20px rgba(20,33,61,0.18)', padding: w * 0.1, boxSizing: 'border-box', position: 'relative', ...style}}>
    <div style={{height: h * 0.08, width: '60%', background: c, borderRadius: 4, marginBottom: h * 0.06}} />
    {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{height: h * 0.035, width: `${90 - (k % 3) * 18}%`, background: '#DCE2EC', borderRadius: 3, marginBottom: h * 0.05}} />)}
    {label && <div style={{position: 'absolute', right: 6, bottom: 6, padding: '2px 8px', borderRadius: 8, background: ok === undefined ? INK : ok ? GREEN : RED, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: Math.max(14, w * 0.11)}}>{label}</div>}
  </div>
);
const Dust: React.FC<{n?: number; c?: string}> = ({n = 22, c = GOLD}) => {
  const t = useT();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: n}, (_, i) => {
        const x = random(`dx${i}`) * 1080 + Math.sin(t * 0.6 + i) * 30;
        const y = ((random(`dy${i}`) * 1920 - t * (20 + random(`ds${i}`) * 40)) % 1920 + 1920) % 1920;
        const r = 4 + random(`dr${i}`) * 7;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: r, height: r, borderRadius: r, background: c, opacity: 0.2 + 0.3 * Math.abs(Math.sin(t * 1.5 + i)), boxShadow: `0 0 ${r * 2}px ${c}`}} />;
      })}
    </AbsoluteFill>
  );
};
/** Fondu de sortie commun à chaque scène. */
const Out: React.FC<{end: number; children: React.ReactNode}> = ({end, children}) => {
  const t = useT();
  const o = prog(t, end - 0.4, end, easeIn);
  return <AbsoluteFill style={{opacity: 1 - o, transform: `translateY(${-o * 50}px)`}}>{children}</AbsoluteFill>;
};

/* ─────────── Fil rouge : intercalaires + fiche bristol ─────────── */
const Header: React.FC = () => {
  const t = useT();
  const cur = chapAt(t);
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 70, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 80, display: 'block'}} /></div>
      {t > 2.6 && t < OUTRO_AT && (
        <div style={{position: 'absolute', left: 30, right: 30, top: 200, height: 76, display: 'flex', alignItems: 'flex-end', gap: 6, opacity: pop(t, 2.6), borderBottom: `5px solid ${CH[cur].c}`}}>
          {CH.map((c, i) => {
            const act = i === cur;
            const lift = act ? Math.min(1, spring(t, c.at, 8, 14)) : 0;
            const done = i < cur;
            return (
              <div key={i} style={{flex: 1, height: 52 + lift * 18, borderRadius: '14px 14px 0 0', background: act ? c.c : done ? `${c.c}33` : '#E6EAF1', color: act ? '#fff' : done ? c.c : DIM, fontFamily: sansFont, fontWeight: 800, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: act ? '0 -6px 16px rgba(20,33,61,0.15)' : 'none'}}>
                <span style={{opacity: 0.8}}>{c.n}</span>{act && <span>{c.l}</span>}
              </div>
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};
const Bristol: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const c = CH[i];
  const k = t - c.at;
  const up = prog(t, c.at, c.at + 0.7, easeOut);
  const out = prog(t, c.at + 2.5, c.at + 3.1, easeIn);
  if (k < 0 || out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 30, perspective: 2400}}>
      <AbsoluteFill style={{background: `rgba(244,241,232,${0.92 * (1 - out)})`}} />
      {/* façade du tiroir */}
      <Abs x={90} y={1300} w={900} h={230} style={{transform: `translateY(${(1 - up) * 300 + out * 400}px)`, borderRadius: 24, background: 'linear-gradient(180deg, #C9CFD9, #A8B1C0)', boxShadow: '0 20px 40px rgba(20,33,61,0.3)', zIndex: 3}}>
        <div style={{position: 'absolute', left: 350, top: 70, width: 200, height: 50, borderRadius: 25, background: '#8D96A6', boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.3)'}} />
        <div style={{position: 'absolute', left: 390, top: 140, width: 120, height: 44, borderRadius: 6, background: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: INK, textAlign: 'center', lineHeight: '44px'}}>{c.n}</div>
      </Abs>
      {/* la fiche */}
      <Abs x={110} y={430} w={860} h={900} style={{transformOrigin: '50% 100%', transform: `translateY(${(1 - up) * 900}px) rotateX(${out * -75}deg) translateY(${-out * 300}px)`, zIndex: 2}}>
        <div style={{position: 'absolute', left: 60 + i * 95, top: 0, width: 180, height: 70, borderRadius: '18px 18px 0 0', background: c.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, textAlign: 'center', lineHeight: '70px'}}>{c.l}</div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 68, bottom: 0, borderRadius: 18, background: '#FFFDF6', boxShadow: '0 30px 60px rgba(20,33,61,0.3)', overflow: 'hidden',
          backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 58px, #BFD4EE 58px 60px)', backgroundPositionY: 150}}>
          <div style={{position: 'absolute', left: 70, top: 0, bottom: 0, width: 3, background: '#F2A0A0'}} />
          <div style={{position: 'absolute', left: 110, top: 60, fontFamily: sansFont, fontWeight: 800, fontSize: 34, letterSpacing: 6, color: c.c}}>CHAPITRE</div>
          <div style={{position: 'absolute', left: 104, top: 100, fontFamily: sansFont, fontWeight: 900, fontSize: 260, lineHeight: 1, color: c.c, opacity: pop(t, c.at + 0.4)}}>{c.n}</div>
          <Abs x={110} y={430} w={700}><Kin text={c.title} at={c.at + 0.7} size={c.title.length > 24 ? 66 : 80} /></Abs>
        </div>
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('iso26/archives-couloir.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 940, objectFit: 'cover', objectPosition: '50% 40%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 44%, ${PAPER} 50%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={50} y={800} w={980} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>GESTION DOCUMENTAIRE</div>
        <T size={92} style={{marginTop: 20, textTransform: 'uppercase', letterSpacing: -3}}>La procédure</T>
        <T size={92} style={{textTransform: 'uppercase', letterSpacing: -3}}><span style={{background: GOLD, padding: '0 20px', borderRadius: 18}}>des procédures</span></T>
        <T size={50} color={DIM} style={{marginTop: 16}}>Qui écrit les règles pour écrire les règles ?</T>
      </Abs>
      <Abs x={0} y={1330} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 8}}>
        {CH.map((c, i) => <div key={i} style={{width: 120, height: 64 + (i === 2 ? 20 : 0), alignSelf: 'flex-end', borderRadius: '14px 14px 0 0', background: c.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 28, textAlign: 'center', lineHeight: '64px'}}>{c.n}</div>)}
      </Abs>
      <Abs x={30} y={1414} w={1020} h={8} style={{background: GREEN, borderRadius: 4}} />
    </AbsoluteFill>
  );
};

/* ═════════════ CHAPITRE I — Enjeu ═════════════ */
const Hopital: React.FC = () => {
  const t = useT();
  return (
    <Out end={13.3}>
      <Center y={330}><Kin text="Un immense hôpital universitaire" at={5.4} size={52} /></Center>
      <Deep src="incident/blessure-soins.jpg" x={60} y={420} w={960} h={560} at={5.3} pos="50% 40%" />
      <Abs x={90} y={440} style={{opacity: pop(t, 5.6)}}><F n="hopital" size={110} float={6} /></Abs>
      <Abs x={0} y={1010} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 18}}>
        <Pill at={5.7} c={BLUE}>organisé</Pill><Pill at={6.4} c={GREEN}>efficace</Pill><Pill at={7.7} c={RED}>sûr</Pill>
      </Abs>
      <Abs x={90} y={1110} w={900} h={220} style={{display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', alignContent: 'flex-start'}}>
        {Array.from({length: 96}, (_, i) => <div key={i} style={{width: 26, height: 26, borderRadius: 13, background: [BLUE, GREEN, ORANGE, VIO, TEAL][i % 5], transform: `scale(${pop(t, 8.2 + i * 0.03, 0.25)})`, opacity: 0.85}} />)}
      </Abs>
      <Abs x={0} y={1350} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16, opacity: pop(t, 9.8)}}>
        <F n="medecin" size={70} /><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: INK, alignSelf: 'center'}}>des chirurgiens aux techniciens</div><F n="outils" size={70} />
      </Abs>
    </Out>
  );
};
/** Mise en abyme : la règle qui contient la règle qui contient la règle… */
const Droste: React.FC = () => {
  const t = useT();
  const z = Math.pow(1.9, Math.max(0, t - 13.6) * 0.9);
  const frames = [0, 1, 2, 3, 4, 5, 6];
  return (
    <Out end={18.1}>
      <AbsoluteFill style={{overflow: 'hidden'}}>
        {frames.map((k) => {
          const sc = z / Math.pow(1.9, k + 1);
          if (sc < 0.04 || sc > 12) return null;
          return (
            <div key={k} style={{position: 'absolute', left: 540, top: 900, width: 860, height: 1080, marginLeft: -430, marginTop: -540, transform: `scale(${sc}) rotate(${k * 3}deg)`, background: '#fff', borderRadius: 30, border: `10px solid ${[BLUE, GREEN, ORANGE, VIO, RED, TEAL, INK][k]}`, boxShadow: '0 30px 60px rgba(20,33,61,0.2)', opacity: Math.min(1, sc * 3)}}>
              <div style={{position: 'absolute', left: 50, top: 40, fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: [BLUE, GREEN, ORANGE, VIO, RED, TEAL, INK][k]}}>RÈGLE</div>
            </div>
          );
        })}
      </AbsoluteFill>
      <Abs x={60} y={1240} w={960} style={{textAlign: 'center', background: '#ffffffEE', borderRadius: 30, padding: '24px 20px', boxShadow: '0 20px 40px rgba(20,33,61,0.15)', opacity: pop(t, 14.0)}}>
        <Kin text="Qui écrit les règles" at={14.0} size={60} />
        <Kin text="pour écrire les règles ?" at={15.3} size={60} color={RED} />
      </Abs>
    </Out>
  );
};
const DroitErreur: React.FC = () => {
  const t = useT();
  const cross = prog(t, 21.6, 22.1, easeOut);
  return (
    <Out end={25.8}>
      <Center y={380}><Kin text="La question fondamentale" at={18.3} size={58} /></Center>
      <Center y={560}>
        <div style={{display: 'inline-block', position: 'relative'}}>
          <Kin text="Droit à l'erreur" at={20.4} size={110} color={DIM} />
          <div style={{position: 'absolute', left: -20, right: -20, top: '50%', height: 18, background: RED, transform: `scaleX(${cross}) rotate(-3deg)`, transformOrigin: '0 50%', borderRadius: 9}} />
        </div>
      </Center>
      <Abs x={140} y={800} w={800} h={500} style={{opacity: pop(t, 22.6)}}>
        <Deep src="verites/ecriture.jpg" x={0} y={0} w={800} h={500} at={22.6} />
      </Abs>
      <Abs x={0} y={1320} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={24.0} c={RED} size={40}>conséquences dramatiques</Pill></Abs>
    </Out>
  );
};
const BonneVersion: React.FC = () => {
  const t = useT();
  const vers = ['v1', 'v2', 'v3', 'v4'];
  return (
    <Out end={34.2}>
      <Center y={340}><Kin text="Comment garantir…" at={26.0} size={58} /></Center>
      <Deep src="verites/operatrice-tablette.jpg" x={60} y={440} w={520} h={720} at={27.0} pos="50% 30%" />
      <Abs x={610} y={460} w={420} h={700}>
        {vers.map((v, i) => {
          const a = 29.0 + i * 0.5;
          const old = i < 3;
          const gone = old ? prog(t, 31.3 + i * 0.12, 31.7 + i * 0.12, easeIn) : 0;
          return (
            <div key={v} style={{position: 'absolute', left: i * 18, top: i * 120, transform: `translateX(${(1 - pop(t, a)) * 300 + gone * 500}px) rotate(${(i - 1.5) * 3}deg)`, opacity: pop(t, a) * (1 - gone)}}>
              <Sheet w={260} h={200} c={old ? DIM : GREEN} label={old ? `${v} · périmée` : 'dernière version'} ok={!old} />
            </div>
          );
        })}
      </Abs>
      <Abs x={0} y={1200} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap'}}>
        <Pill at={28.1} c={BLUE} size={30}>chaque personne</Pill><Pill at={28.9} c={VIO} size={30}>à chaque instant</Pill><Pill at={29.8} c={GREEN} size={30}>la bonne information</Pill><Pill at={32.8} c={ORANGE} size={30}>pile au bon moment</Pill>
      </Abs>
    </Out>
  );
};

/* ═════════════ CHAPITRE II — Chaos ═════════════ */
const Exercice: React.FC = () => {
  const t = useT();
  const shake = t > 41 && t < 44.5 ? Math.sin(t * 60) * 6 : 0;
  return (
    <Out end={45.4}>
      <Center y={360}><Kin text="Petit exercice mental" at={37.0} size={56} color={DIM} /></Center>
      <Abs x={390} y={460} style={{opacity: pop(t, 37.2)}}><F n="cerveau" size={300} float={10} /></Abs>
      <Center y={830} style={{transform: `translateX(${shake}px)`}}><Kin text="Le scénario catastrophe" at={41.1} size={78} color={RED} /></Center>
      <Center y={960}><Kin text="le spectre du chaos" at={42.5} size={56} /></Center>
      <Abs x={0} y={1080} w={1080} style={{display: 'flex', justifyContent: 'center', opacity: pop(t, 42.6)}}><F n="brouillard" size={200} float={8} /></Abs>
    </Out>
  );
};
const Anarchie: React.FC = () => {
  const t = useT();
  const N = 26;
  return (
    <Out end={71.5}>
      <Center y={330}><Kin text="L'anarchie documentaire" at={49.4} size={64} color={RED} /></Center>
      {/* tourbillon de feuilles */}
      <Abs x={0} y={420} w={1080} h={640} style={{overflow: 'hidden'}}>
        {Array.from({length: N}, (_, i) => {
          const a = t * (0.6 + random(`a${i}`) * 0.6) + i;
          const r = 120 + random(`r${i}`) * 300;
          const x = 540 + Math.cos(a) * r - 70;
          const y = 320 + Math.sin(a * 1.3) * r * 0.45 - 90;
          const old = i % 3 === 0;
          return <div key={i} style={{position: 'absolute', left: x, top: y, transform: `rotate(${a * 50}deg) scale(${pop(t, 45.6 + i * 0.08)})`}}><Sheet w={140} h={180} c={old ? RED : [BLUE, ORANGE, VIO][i % 3]} label={old ? 'dépassée' : `v${1 + (i % 7)}`} ok={old ? false : undefined} /></div>;
        })}
      </Abs>
      <Abs x={0} y={1080} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', padding: '0 40px', boxSizing: 'border-box'}}>
        <Pill at={51.8} c={RED} size={28}>procédures dépassées</Pill><Pill at={55.2} c={ORANGE} size={28}>soins différents d'un service à l'autre</Pill><Pill at={58.2} c={RED} size={28}>risque d'erreur ×</Pill>
      </Abs>
      {t > 59.9 && (
        <Abs x={0} y={1230} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, opacity: pop(t, 59.9)}}>
          <div style={{width: 300, height: 110, borderRadius: 20, border: `6px dashed ${RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: RED, textAlign: 'center', background: '#fff'}}>source de vérité&nbsp;?</div>
          <div style={{display: 'flex', gap: 10}}>{['Service A', 'Service B', 'Service C'].map((x, i) => <div key={x} style={{opacity: pop(t, 62.8 + i * 0.4), textAlign: 'center'}}><F n="classeur" size={70} /><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 20, color: DIM}}>{x}</div></div>)}</div>
        </Abs>
      )}
      {t > 68.0 && <AbsoluteFill style={{background: `rgba(230,57,70,${0.12 * Math.abs(Math.sin((t - 68) * 3))})`}} />}
      <Stamp at={69.0} c={RED} text="Patients en danger" x={240} y={720} rot={-6} size={58} />
    </Out>
  );
};

/* ═════════════ CHAPITRE III — Solution ═════════════ */
const Ordre: React.FC = () => {
  const t = useT();
  const N = 24;
  const ord = prog(t, 79.6, 82.0, easeInOut);
  return (
    <Out end={87.0}>
      <Center y={330}><Kin text="La procédure" at={77.3} size={86} /></Center>
      <Center y={430}><Kin text="des procédures" at={78.0} size={86} color={GREEN} /></Center>
      <Abs x={0} y={560} w={1080} h={760}>
        {Array.from({length: N}, (_, i) => {
          const a = 74.6 + i;
          const cx = 540 + Math.cos(a) * (200 + random(`o${i}`) * 260) - 60;
          const cy = 380 + Math.sin(a * 1.3) * 250 - 75;
          const gx = 110 + (i % 6) * 145;
          const gy = 200 + Math.floor(i / 6) * 170;
          return <div key={i} style={{position: 'absolute', left: lerp(cx, gx, ord), top: lerp(cy, gy, ord), transform: `rotate(${(1 - ord) * (random(`rr${i}`) - 0.5) * 120}deg)`, opacity: pop(t, 72.0 + i * 0.05)}}><Sheet w={120} h={150} c={ord > 0.6 ? GREEN : [RED, BLUE, ORANGE][i % 3]} /></div>;
        })}
        <div style={{position: 'absolute', left: 390, top: 0, transform: `scale(${spring(t, 79.6, 7, 12)})`}}><Sheet w={300} h={140} c={INK} label="document de base" /></div>
      </Abs>
      <Abs x={0} y={1350} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={81.0} c={GREEN} size={36}>met de l'ordre dans tout le reste</Pill></Abs>
    </Out>
  );
};
const ChuLille: React.FC = () => {
  const t = useT();
  const key = Math.min(1, spring(t, 91.6, 7, 12));
  return (
    <Out end={99.3}>
      <Center y={330}><Kin text="Un exemple bien réel" at={87.2} size={58} /></Center>
      <Abs x={0} y={420} w={1080} style={{display: 'flex', justifyContent: 'center', opacity: pop(t, 88.9)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '14px 28px', borderRadius: 30, background: '#fff', boxShadow: '0 12px 30px rgba(20,33,61,0.15)'}}><F n="hopital" size={80} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: INK}}>CHU de Lille</div></div>
      </Abs>
      {/* clé de voûte */}
      <Abs x={140} y={600} w={800} h={560}>
        <svg width={800} height={560} viewBox="0 0 800 560">
          {Array.from({length: 9}, (_, i) => {
            if (i === 4) return null;
            const a0 = Math.PI - (i / 9) * Math.PI;
            const a1 = Math.PI - ((i + 1) / 9) * Math.PI;
            const R1 = 360, R0 = 250, cx = 400, cy = 500;
            const p = (r: number, a: number) => `${cx + Math.cos(a) * r},${cy - Math.sin(a) * r}`;
            return <polygon key={i} points={`${p(R0, a0)} ${p(R1, a0)} ${p(R1, a1)} ${p(R0, a1)}`} fill="#E6EAF1" stroke="#fff" strokeWidth={6} opacity={pop(t, 89.5 + i * 0.1)} />;
          })}
        </svg>
        <div style={{position: 'absolute', left: 400 - 70, top: 140 - 120 - (1 - key) * 400, width: 140, height: 120, background: GREEN, clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: t > 91.6 ? 1 : 0}}>
          <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', marginTop: -10}}>PdP</span>
        </div>
        <Center y={380}><Kin text="la pierre angulaire" at={91.8} size={52} color={GREEN} /></Center>
      </Abs>
      <Center y={1200}><Kin text="la règle du jeu des autres règles" at={95.2} size={46} /></Center>
      <Abs x={0} y={1290} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 700, fontSize: 24, color: DIM, opacity: pop(t, 89.5)}}>exemple cité dans la vidéo d'origine</Abs>
    </Out>
  );
};
const Memoire: React.FC = () => {
  const t = useT();
  const word = 'savoir-faire';
  const ev = prog(t, 115.9, 116.8, easeIn);
  const back = prog(t, 117.0, 117.9, easeOut);
  return (
    <Out end={118.4}>
      <Abs x={60} y={330} w={960} style={{opacity: pop(t, 99.4)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
          <div style={{position: 'relative'}}><Kin text="Paperasse" at={99.5} size={70} color={DIM} /><div style={{position: 'absolute', left: -10, right: -10, top: '50%', height: 12, background: RED, transform: `scaleX(${prog(t, 103.8, 104.3)})`, transformOrigin: '0 50%', borderRadius: 6}} /></div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: GREEN, opacity: pop(t, 104.8)}}>→</div>
        </div>
      </Abs>
      <Deep src="iso26/archives-couloir.jpg" x={60} y={450} w={960} h={560} at={104.8} pos="50% 50%">
        <Abs x={0} y={180} w={944} style={{textAlign: 'center'}}><Kin text="La mémoire" at={106.0} size={96} color="#fff" /><Kin text="de l'établissement" at={106.6} size={64} color={GOLD} /></Abs>
      </Deep>
      <Abs x={0} y={1040} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20}}>
        <Pill at={109.2} c={GREEN} size={32}>outil vivant</Pill>
        <Pill at={110.6} c={BLUE} size={32}>capitaliser</Pill>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK, opacity: pop(t, 112.0)}}>→</div>
        <Pill at={112.4} c={VIO} size={32}>transmettre</Pill>
      </Abs>
      <Abs x={0} y={1170} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 4}}>
        {word.split('').map((ch, i) => {
          const r = random(`ev${i}`);
          const e = ev * (1 - back);
          return <span key={i} style={{display: 'inline-block', fontFamily: sansFont, fontWeight: 900, fontSize: 100, color: ORANGE, opacity: pop(t, 115.0 + i * 0.03) * (1 - e * 0.9), transform: `translate(${e * (r - 0.5) * 200}px, ${-e * (120 + r * 200)}px) rotate(${e * (r - 0.5) * 90}deg)`, filter: `blur(${e * 12}px)`}}>{ch}</span>;
        })}
      </Abs>
      <Center y={1310}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 36, color: INK, opacity: pop(t, 117.1)}}>…ne s'évapore pas quand quelqu'un s'en va</div></Center>
    </Out>
  );
};
const Promesse: React.FC = () => {
  const t = useT();
  const slots = [{a: 124.1, w: 'documents', c: BLUE}, {a: 125.5, w: 'endroit', c: GREEN}, {a: 126.3, w: 'moment', c: ORANGE}];
  const pool = ['dossier', 'version', 'service', 'classeur', 'serveur', 'fichier'];
  const ang = prog(t, 131.6, 133.3, easeInOut) * 360;
  return (
    <Out end={134.1}>
      <Center y={330}><Kin text="La promesse, en une phrase" at={119.1} size={56} /></Center>
      <Abs x={60} y={450} w={960} style={{display: 'flex', flexDirection: 'column', gap: 22}}>
        {slots.map((sl, i) => {
          const spin = prog(t, sl.a - 1.4, sl.a, easeOut);
          const idx = Math.floor((1 - spin) * 14) % pool.length;
          const landed = spin >= 1;
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 18, opacity: pop(t, 122.6 + i * 0.15)}}>
              <div style={{width: 330, fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: INK, textAlign: 'right'}}>{i === 0 ? 'les bons' : 'au bon'}</div>
              <div style={{flex: 1, height: 130, borderRadius: 24, background: landed ? sl.c : '#fff', boxShadow: 'inset 0 6px 16px rgba(20,33,61,0.15)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `5px solid ${sl.c}`}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 66, color: landed ? '#fff' : DIM, filter: `blur(${landed ? 0 : 3}px)`, transform: `translateY(${landed ? 0 : ((t * 20) % 1) * 40 - 20}px)`}}>{landed ? sl.w : pool[idx]}</div>
              </div>
            </div>
          );
        })}
      </Abs>
      <Abs x={340} y={960} w={400} h={400} style={{opacity: pop(t, 127.2)}}>
        <svg width={400} height={400} viewBox="0 0 400 400">
          <circle cx={200} cy={200} r={160} fill="#fff" stroke="#E6EAF1" strokeWidth={24} />
          <circle cx={200} cy={200} r={160} fill="none" stroke={GREEN} strokeWidth={24} strokeDasharray={`${(ang / 360) * 1005} 1005`} transform="rotate(-90 200 200)" strokeLinecap="round" />
          <line x1={200} y1={200} x2={200 + Math.sin((ang * Math.PI) / 180) * 110} y2={200 - Math.cos((ang * Math.PI) / 180) * 110} stroke={INK} strokeWidth={10} strokeLinecap="round" />
          <text x={200} y={290} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={54} fill={INK}>24 h / 24</text>
        </svg>
      </Abs>
    </Out>
  );
};

/* ═════════════ CHAPITRE IV — Pyramide ═════════════ */
const LV = [
  {l: 'Manuel d’assurance qualité', s: 'Niveau 1 · la vision', c: VIO, ic: 'parchemin'},
  {l: 'Procédures', s: 'Niveau 2 · le « comment faire »', c: BLUE, ic: 'engrenage'},
  {l: 'Formulaires d’enregistrement', s: 'Niveau 3 · la preuve', c: GREEN, ic: 'clipboard'},
];
const Pyr: React.FC<{y: number; at: number; hi?: number; w?: number}> = ({y, at, hi = -1, w = 900}) => {
  const t = useT();
  const H = 170;
  return (
    <Abs x={(1080 - w) / 2} y={y} w={w} h={H * 3 + 20}>
      {LV.map((lv, i) => {
        const top = (w / 2) * (i / 3);
        const bot = (w / 2) * ((i + 1) / 3);
        const p = Math.min(1, spring(t, at + i * 0.5, 7, 12));
        const dim = hi >= 0 && hi !== i;
        return (
          <div key={i} style={{position: 'absolute', left: 0, top: i * (H + 8), width: w, height: H, clipPath: `polygon(${w / 2 - top}px 0, ${w / 2 + top}px 0, ${w / 2 + bot}px ${H}px, ${w / 2 - bot}px ${H}px)`, background: i === 0 ? lv.c : `linear-gradient(180deg, ${lv.c}, ${lv.c}DD)`, transform: `translateY(${(1 - p) * -400}px) scale(${hi === i ? 1.04 : 1})`, opacity: (p > 0 ? 1 : 0) * (dim ? 0.3 : 1), display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 18, boxSizing: 'border-box'}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: i === 0 ? 30 : 38, color: '#fff', textAlign: 'center', maxWidth: bot * 1.7}}>{i === 0 ? 'MAQ' : lv.l}</div>
          </div>
        );
      })}
    </Abs>
  );
};
const Vrac: React.FC = () => {
  const t = useT();
  const N = 21;
  const f = prog(t, 145.0, 147.3, easeInOut);
  return (
    <Out end={147.4}>
      <Center y={340}><Kin text="Le pourquoi → le comment" at={137.0} size={58} /></Center>
      <Abs x={0} y={460} w={1080} h={860}>
        {Array.from({length: N}, (_, i) => {
          const row = i < 3 ? 0 : i < 9 ? 1 : 2;
          const inRow = row === 0 ? i : row === 1 ? i - 3 : i - 9;
          const cnt = [3, 6, 12][row];
          const gx = 540 + (inRow - (cnt - 1) / 2) * 72 - 35;
          const gy = 240 + row * 160;
          const vx = 200 + random(`vx${i}`) * 600;
          const vy = 560 + random(`vy${i}`) * 120 - (i % 4) * 22;
          return <div key={i} style={{position: 'absolute', left: lerp(vx, gx, f), top: lerp(vy, gy, f), transform: `rotate(${(1 - f) * (random(`vr${i}`) - 0.5) * 80}deg)`, opacity: pop(t, 139.6 + i * 0.04)}}><Sheet w={70} h={92} c={LV[row].c} /></div>;
        })}
      </Abs>
      <Center y={1350}><Kin text="une véritable architecture" at={142.3} size={52} color={VIO} /></Center>
    </Out>
  );
};
const PyrScene: React.FC = () => {
  const t = useT();
  return (
    <Out end={161.1}>
      <Center y={330}><Kin text="La pyramide documentaire" at={147.6} size={62} color={VIO} /></Center>
      <Pyr y={470} at={148.0} />
      <Abs x={950} y={470} w={80} h={540} style={{opacity: pop(t, 158.8)}}>
        <div style={{position: 'absolute', left: 34, top: 0, bottom: 40, width: 10, borderRadius: 5, background: `linear-gradient(180deg, ${VIO}, ${GREEN})`, transformOrigin: 'top', transform: `scaleY(${prog(t, 158.8, 160.2)})`}} />
        <div style={{position: 'absolute', left: 18, bottom: 0, width: 0, height: 0, borderLeft: '21px solid transparent', borderRight: '21px solid transparent', borderTop: `36px solid ${GREEN}`, opacity: pop(t, 160.0)}} />
      </Abs>
      <Abs x={0} y={1060} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16}}>
        <Pill at={152.9} c={INK} size={30}>un rôle précis par étage</Pill>
      </Abs>
      <Abs x={0} y={1160} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16, alignItems: 'center'}}>
        <Pill at={158.9} c={VIO} size={30}>général</Pill><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, opacity: pop(t, 159.4)}}>→</div><Pill at={160.0} c={GREEN} size={30}>spécifique</Pill>
      </Abs>
    </Out>
  );
};
const Niveau: React.FC<{i: number; from: number; to: number; ph: string; chips: {a: number; x: string}[]; stamp?: {a: number; x: string}}> = ({i, from, to, ph, chips, stamp}) => {
  const t = useT();
  const lv = LV[i];
  return (
    <Out end={to}>
      <Abs x={60} y={320} w={960} style={{display: 'flex', alignItems: 'center', gap: 20, opacity: pop(t, from + 0.1)}}>
        <div style={{transform: `scale(${Math.min(1, spring(t, from + 0.1, 7, 12))})`}}><F n={lv.ic} size={110} /></div>
        <div>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, letterSpacing: 2, color: lv.c, textTransform: 'uppercase'}}>{lv.s}</div>
          <Kin text={lv.l} at={from + 0.3} size={lv.l.length > 20 ? 52 : 70} />
        </div>
      </Abs>
      <Deep src={ph} x={60} y={500} w={600} h={600} at={from + 0.4} />
      <Abs x={690} y={510} w={330}><div style={{transform: 'scale(0.36)', transformOrigin: '0 0'}}><Pyr y={0} at={from - 3} hi={i} w={900} /></div></Abs>
      <Abs x={680} y={760} w={360} style={{display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start'}}>
        {chips.map((c, k) => <Pill key={k} at={c.a} c={lv.c} size={28}>{c.x}</Pill>)}
      </Abs>
      {stamp && <Stamp at={stamp.a} c={RED} text={stamp.x} x={200} y={1140} rot={-5} size={56} />}
    </Out>
  );
};
const Preuve: React.FC = () => {
  const t = useT();
  const items = ['Étape 1 réalisée', 'Étape 2 réalisée', 'Étape 3 réalisée', 'Contrôle signé'];
  return (
    <Out end={207.3}>
      <Center y={330}><Kin text="Le mot-clé : la preuve" at={193.5} size={64} color={GREEN} /></Center>
      <Abs x={140} y={460} w={800} h={640} style={{background: '#fff', borderRadius: 26, boxShadow: '0 30px 60px rgba(20,33,61,0.2)', padding: 40, boxSizing: 'border-box', opacity: pop(t, 195.8)}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK, marginBottom: 26}}>Formulaire d’enregistrement</div>
        {items.map((x, k) => {
          const a = 198.8 + k * 0.9;
          return (
            <div key={k} style={{display: 'flex', alignItems: 'center', gap: 20, marginBottom: 26}}>
              <div style={{width: 56, height: 56, borderRadius: 12, border: `5px solid ${GREEN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, color: GREEN, fontWeight: 900}}><span style={{transform: `scale(${Math.min(1, spring(t, a, 9, 15))})`}}>✓</span></div>
              <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 36, color: INK}}>{x}</div>
            </div>
          );
        })}
        <div style={{position: 'absolute', right: 40, bottom: 40, opacity: pop(t, 201.4)}}><F n="loupe" size={120} /></div>
      </Abs>
      <Abs x={0} y={1150} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}>
        <Pill at={200.2} c={GREEN} size={30}>traces</Pill><Pill at={201.4} c={GREEN} size={30}>preuves tangibles</Pill><Pill at={205.0} c={VIO} size={30}>→ mémoire de l'organisation</Pill>
      </Abs>
    </Out>
  );
};

/* ═════════════ CHAPITRE V — Règles du jeu ═════════════ */
const Fiable: React.FC = () => {
  const t = useT();
  const age = prog(t, 211.8, 213.4, easeInOut);
  return (
    <Out end={221.0}>
      <Center y={330}><Kin text="Comment rester fiable ?" at={210.6} size={62} color={ORANGE} /></Center>
      <Abs x={0} y={440} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 60, alignItems: 'flex-end'}}>
        <div style={{textAlign: 'center', opacity: pop(t, 210.8)}}><Sheet w={260} h={330} c={GREEN} label="neuf" ok /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: DIM, alignSelf: 'center', opacity: pop(t, 211.8)}}>→</div>
        <div style={{textAlign: 'center', opacity: pop(t, 211.8), filter: `sepia(${age}) grayscale(${age * 0.4})`, transform: `rotate(${age * 6}deg)`}}><Sheet w={260} h={330} c={age > 0.5 ? DIM : GREEN} label={age > 0.5 ? 'vieilli ?' : 'neuf'} ok={age > 0.5 ? false : true} /></div>
      </Abs>
      <Abs x={0} y={880} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={214.3} c={ORANGE} size={44}>les règles du jeu</Pill></Abs>
      <Abs x={0} y={1000} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 20, alignItems: 'center'}}>
        <div style={{opacity: pop(t, 216.6)}}><F n="repeter" size={120} float={6} /></div>
        <Kin text="un cycle de vie précis" at={216.7} size={52} />
      </Abs>
    </Out>
  );
};
const Passeport: React.FC = () => {
  const t = useT();
  const open = prog(t, 221.0, 221.9, easeOut);
  const parts = [{x: 'QA', c: VIO, d: 'département qualité', a: 238.6}, {x: 'PR', c: BLUE, d: 'procédure', a: 241.9}, {x: '001', c: ORANGE, d: 'compteur', a: 244.0}];
  return (
    <Out end={249.0}>
      <Center y={330}><Kin text="Une identité unique" at={221.0} size={66} color={ORANGE} /></Center>
      <Abs x={140} y={450} w={800} h={500} style={{perspective: 2000}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: 26, background: 'linear-gradient(135deg, #1F3B73, #2C5AA0)', boxShadow: '0 30px 60px rgba(20,33,61,0.35)', transformOrigin: 'left center', transform: `rotateY(${(1 - open) * -80}deg)`, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 40, top: 34, fontFamily: sansFont, fontWeight: 800, fontSize: 26, letterSpacing: 6, color: '#ffffffAA'}}>PASSEPORT DU DOCUMENT</div>
          <div style={{position: 'absolute', left: 40, top: 100, width: 220, height: 290, borderRadius: 14, overflow: 'hidden', border: '5px solid #fff'}}><Img src={PH('docs5/procedures.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
          <div style={{position: 'absolute', left: 300, top: 110, fontFamily: sansFont, color: '#fff'}}>
            <div style={{fontSize: 24, opacity: 0.7, fontWeight: 700}}>Type</div><div style={{fontSize: 40, fontWeight: 900, marginBottom: 18}}>Procédure</div>
            <div style={{fontSize: 24, opacity: 0.7, fontWeight: 700}}>Code unique</div><div style={{fontSize: 56, fontWeight: 900, letterSpacing: 4, color: GOLD}}>{t > 233 ? 'QA-PR-001' : '•••-••-•••'}</div>
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 70, background: '#ffffff18', fontFamily: 'monospace', fontSize: 26, color: '#ffffffAA', lineHeight: '70px', paddingLeft: 40, letterSpacing: 3}}>{'P<QA<PR<001<<<<<<<<<<<<<<<<<<<'}</div>
        </div>
      </Abs>
      <Abs x={0} y={1030} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16}}>
        {parts.map((p, i) => (
          <div key={i} style={{textAlign: 'center', opacity: pop(t, p.a)}}>
            <div style={{padding: '10px 26px', borderRadius: 18, background: p.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 64, transform: `translateY(${(1 - pop(t, p.a)) * -60}px)`}}>{p.x}</div>
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: p.c, marginTop: 10, width: 260}}>{p.d}</div>
          </div>
        ))}
      </Abs>
      <Abs x={0} y={1260} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 700, fontSize: 24, color: DIM, opacity: pop(t, 238.6)}}>code donné à titre d’exemple</Abs>
      <Stamp at={235.4} c={ORANGE} text="il parle !" x={680} y={905} rot={8} size={40} />
    </Out>
  );
};
const Cycle: React.FC = () => {
  const t = useT();
  const steps = [{l: 'Création', a: 255.1, ic: 'ecrit'}, {l: 'Validation', a: 256.6, ic: 'check'}, {l: 'Diffusion', a: 258.7, ic: 'megaphone'}, {l: 'Révision', a: 261.0, ic: 'repeter'}, {l: 'Archivage', a: 264.8, ic: 'classeur'}];
  const R = 330, cx = 540, cy = 830;
  const ang = (k: number) => -Math.PI / 2 + (k / steps.length) * Math.PI * 2;
  let cur = 0;
  steps.forEach((s0, k) => { if (t >= s0.a) cur = k; });
  const nxt = Math.min(steps.length - 1, cur + 1);
  const tp = cur === nxt ? 0 : prog(t, steps[nxt].a - 0.8, steps[nxt].a, easeInOut);
  const a = lerp(ang(cur), ang(nxt), tp) + (t > 266 ? (t - 266) * 1.2 : 0);
  return (
    <Out end={270.2}>
      <Center y={320}><Kin text="Un cycle de vie contrôlé" at={251.4} size={58} color={ORANGE} /></Center>
      <svg style={{position: 'absolute', left: 0, top: 0}} width={1080} height={1920}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#E2E7EF" strokeWidth={14} strokeDasharray="2 22" strokeLinecap="round" />
      </svg>
      {steps.map((s0, k) => {
        const x = cx + Math.cos(ang(k)) * R;
        const y = cy + Math.sin(ang(k)) * R;
        const on = t >= s0.a;
        return (
          <Abs key={k} x={x - 100} y={y - 85} w={200} style={{textAlign: 'center', opacity: pop(t, 252.0 + k * 0.15)}}>
            <div style={{width: 120, height: 120, margin: '0 auto', borderRadius: 60, background: on ? ORANGE : '#fff', boxShadow: '0 10px 24px rgba(20,33,61,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${on ? 1 + 0.15 * Math.max(0, 1 - (t - s0.a) * 3) : 0.9})`}}><F n={s0.ic} size={76} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: on ? INK : DIM, marginTop: 8}}>{s0.l}</div>
          </Abs>
        );
      })}
      <Abs x={cx + Math.cos(a) * (R - 120) - 45} y={cy + Math.sin(a) * (R - 120) - 58} style={{transform: `rotate(${Math.sin(t * 3) * 6}deg)`, opacity: pop(t, 254.5)}}><Sheet w={90} h={116} c={ORANGE} /></Abs>
      <Abs x={cx - 130} y={cy - 40} w={260} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK, opacity: pop(t, 266.0)}}>chaque étape<br />maîtrisée</Abs>
      <Stamp at={268.9} c={GREEN} text="rien au hasard" x={250} y={1240} rot={-4} size={50} />
    </Out>
  );
};
const Peremption: React.FC = () => {
  const t = useT();
  const fill = prog(t, 277.3, 279.6, easeInOut);
  return (
    <Out end={288.3}>
      <Center y={330}><Kin text="Une date de péremption" at={270.4} size={62} color={RED} /></Center>
      <Abs x={390} y={440} style={{opacity: pop(t, 270.6), transform: `rotate(${t > 279.8 && t < 280.6 ? (t - 279.8) * 225 : 0}deg)`}}><F n="sablier" size={300} /></Abs>
      <Abs x={90} y={800} w={900} style={{display: 'flex', gap: 10, opacity: pop(t, 277.3)}}>
        {['an 1', 'an 2', 'an 3', 'an 4', 'an 5'].map((y, k) => {
          const on = fill * 5 > k;
          return <div key={k} style={{flex: 1, height: 110, borderRadius: 18, background: on ? (k === 4 ? RED : ORANGE) : '#fff', boxShadow: '0 8px 20px rgba(20,33,61,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: on ? '#fff' : DIM}}>{y}</div>;
        })}
      </Abs>
      <Center y={950}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: INK, opacity: pop(t, 278.7)}}>durée de vie max : <span style={{color: RED}}>5 ans</span></div></Center>
      <Abs x={0} y={1040} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 700, fontSize: 24, color: DIM, opacity: pop(t, 278.7)}}>durée citée dans la vidéo d’origine</Abs>
      <Stamp at={281.0} c={RED} text="révision obligatoire" x={170} y={1110} rot={-5} size={54} />
      <Abs x={0} y={1270} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={285.9} c={GREEN} size={32}>fini les vieilles infos qui traînent</Pill></Abs>
    </Out>
  );
};

/* ═════════════ CHAPITRE VI — Débat ═════════════ */
const RedTape: React.FC = () => {
  const t = useT();
  const snap = prog(t, 305.2, 305.8, easeOut);
  return (
    <Out end={308.0}>
      <Center y={330}><Kin text="Juste de la bureaucratie ?" at={295.6} size={62} color={TEAL} /></Center>
      <Deep src="promo/audit-reunion.jpg" x={60} y={450} w={960} h={640} at={294.3} filter={`grayscale(${1 - snap})`} />
      {[0, 1, 2, 3].map((k) => {
        const p = prog(t, 298.9 + k * 0.3, 299.6 + k * 0.3, easeOut);
        const half = (side: number) => (
          <div style={{position: 'absolute', left: side ? '50%' : 0, width: '50%', top: 0, height: '100%', background: RED, transform: `translate(${side ? snap * 300 : -snap * 300}px, ${snap * (side ? 80 : -60)}px) rotate(${snap * (side ? 18 : -14)}deg)`, opacity: 1 - snap * 0.6}} />
        );
        return (
          <Abs key={k} x={-40} y={540 + k * 140} w={1160} h={40} style={{transform: `rotate(${(k % 2 ? 1 : -1) * (8 + k * 3)}deg) scaleX(${p})`, transformOrigin: k % 2 ? 'right' : 'left'}}>
            {half(0)}{half(1)}
          </Abs>
        );
      })}
      <Stamp at={299.0} c={RED} text="lourdeur administrative ?" x={110} y={1130} rot={-4} size={48} />
      <Abs x={0} y={1270} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={305.8} c={TEAL} size={34}>à côté du but réel</Pill></Abs>
    </Out>
  );
};
const Deming: React.FC = () => {
  const t = useT();
  const unlock = prog(t, 316.2, 316.8, easeOut);
  return (
    <Out end={330.3}>
      <Abs x={60} y={320} w={960} h={520} style={{background: '#fff', borderRadius: 30, boxShadow: '0 30px 60px rgba(20,33,61,0.15)', opacity: pop(t, 308.1)}}>
        <div style={{position: 'absolute', left: 30, top: -40, fontFamily: 'Georgia, serif', fontSize: 240, color: TEAL, lineHeight: 1, opacity: 0.9}}>“</div>
        <Abs x={60} y={120} w={840}>
          <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 30, color: DIM, marginBottom: 12, opacity: pop(t, 310.0)}}>Selon W. Edwards Deming, grand nom de la qualité :</div>
          <Kin text="Les procédures sont des" at={314.2} size={56} />
          <Kin text="outils qui libèrent." at={315.6} size={72} color={TEAL} />
        </Abs>
        <Abs x={760} y={330} style={{transform: `translateY(${-unlock * 20}px)`}}><F n={unlock > 0.5 ? 'cle' : 'cadenas'} size={140} /></Abs>
      </Abs>
      <Abs x={60} y={900} w={960} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18}}>
        <Pill at={320.4} c={DIM} size={30}>problèmes déjà résolus</Pill>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, opacity: pop(t, 321.2)}}>→</div>
        <Pill at={321.6} c={TEAL} size={30}>routine</Pill>
      </Abs>
      <Abs x={0} y={1020} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30}}>
        <div style={{opacity: pop(t, 324.9)}}><F n="eclair" size={130} float={6} /></div>
        <div style={{opacity: pop(t, 326.4)}}><F n="ampoule" size={150} float={8} /></div>
        <div style={{opacity: pop(t, 329.1)}}><F n="cible" size={130} float={6} /></div>
      </Abs>
      <Abs x={0} y={1200} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 12}}>
        <Pill at={325.0} c={ORANGE} size={28}>énergie</Pill><Pill at={326.5} c={GOLD} size={28}>créativité</Pill><Pill at={329.1} c={RED} size={28}>le vrai défi</Pill>
      </Abs>
    </Out>
  );
};
const Split: React.FC = () => {
  const t = useT();
  const d = lerp(540, 540, 0) + Math.sin(t * 0.8) * 10;
  const L = [{x: 'le chaos', a: 334.2}, {x: 'réinventer la roue', a: 335.0}, {x: 'temps perdu', a: 336.5}, {x: 'risque partout', a: 337.6}];
  const R = [{x: 'fiabilité', a: 340.6}, {x: 'routine', a: 341.8}, {x: 'confiance', a: 342.4}, {x: 'innovation', a: 346.1}];
  const wipe = prog(t, 338.9, 339.6, easeInOut);
  return (
    <Out end={353.0}>
      <Center y={320}><Kin text="Le contraste est saisissant" at={330.4} size={56} /></Center>
      <Abs x={30} y={430} w={d - 40} h={920} style={{borderRadius: 28, background: '#FDECEC', overflow: 'hidden', opacity: pop(t, 332.9)}}>
        <Img src={PH('iso26/archives-couloir.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: 300, objectFit: 'cover', filter: 'grayscale(1) contrast(1.1)'}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 230, textAlign: 'center'}}><span style={{padding: '8px 20px', borderRadius: 30, background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 34}}>Sans système</span></div>
        <div style={{position: 'absolute', left: 20, right: 20, top: 330, display: 'flex', flexDirection: 'column', gap: 18}}>
          {L.map((x, k) => <div key={k} style={{fontFamily: sansFont, fontWeight: 800, fontSize: 36, color: RED, opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * -60}px)`}}>✕ {x.x}</div>)}
        </div>
      </Abs>
      <Abs x={d + 10} y={430} w={1050 - d - 10} h={920} style={{borderRadius: 28, background: '#E7F6EE', overflow: 'hidden', clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0 round 28px)`}}>
        <Img src={PH('verites/groupe.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: 300, objectFit: 'cover'}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 230, textAlign: 'center'}}><span style={{padding: '8px 20px', borderRadius: 30, background: GREEN, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 34}}>Avec système</span></div>
        <div style={{position: 'absolute', left: 20, right: 20, top: 330, display: 'flex', flexDirection: 'column', gap: 18}}>
          {R.map((x, k) => <div key={k} style={{fontFamily: sansFont, fontWeight: 800, fontSize: 36, color: GREEN, opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * 60}px)`}}>✓ {x.x}</div>)}
        </div>
      </Abs>
      {t > 347.6 && (
        <Abs x={60} y={1100} w={960} style={{textAlign: 'center', background: '#fff', borderRadius: 26, padding: '20px 10px', boxShadow: '0 20px 40px rgba(20,33,61,0.2)', transform: `scale(${Math.min(1, spring(t, 347.6, 8, 14))})`}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK}}>Le système <span style={{color: RED, textDecoration: 'line-through'}}>tue</span> la créativité ?</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: GREEN, opacity: pop(t, 350.9)}}>Il lui offre un terrain de jeu.</div>
        </Abs>
      )}
    </Out>
  );
};

/* ═════════════ CHAPITRE VII — Vision ═════════════ */
const Final: React.FC = () => {
  const t = useT();
  const bars = prog(t, 361.4, 362.6, easeOut);
  const lift = prog(t, 364.4, 365.2, easeOut);
  const bricks = 12;
  return (
    <Out end={OUTRO_AT}>
      <Center y={320}><Kin text="Votre vision de l'organisation ?" at={356.4} size={54} /></Center>
      <Deep src="verites/heroine.jpg" x={190} y={430} w={700} h={620} at={356.2} pos="50% 25%" />
      {/* barreaux de la cage */}
      <Abs x={190} y={410} w={700} h={660} style={{display: 'flex', justifyContent: 'space-around', pointerEvents: 'none', opacity: 1 - lift}}>
        {Array.from({length: 8}, (_, k) => <div key={k} style={{width: 18, height: 660, borderRadius: 9, background: 'linear-gradient(90deg, #5B6475, #9AA3B2, #5B6475)', transform: `translateY(${(1 - bars) * -700}px)`, boxShadow: '0 6px 12px rgba(0,0,0,0.3)'}} />)}
      </Abs>
      <Stamp at={362.3} c={RED} text="une cage ?" x={80} y={460} rot={-10} size={50} />
      {/* fondations */}
      <Abs x={140} y={1080} w={800} h={240} style={{display: 'flex', flexWrap: 'wrap-reverse', gap: 8, alignContent: 'flex-start'}}>
        {Array.from({length: bricks}, (_, k) => <div key={k} style={{width: 190, height: 70, borderRadius: 8, background: `linear-gradient(180deg, ${['#D98C5F', '#C9774A'][k % 2]}, #B5653B)`, boxShadow: 'inset 0 -6px 0 rgba(0,0,0,0.12)', transform: `translateY(${(1 - Math.min(1, spring(t, 365.2 + k * 0.08, 9, 14))) * -500}px)`, opacity: t > 365.2 + k * 0.08 ? 1 : 0}} />)}
      </Abs>
      <Stamp at={366.0} c={GREEN} text="des fondations !" x={520} y={960} rot={6} size={50} />
      {t > 369.8 && (
        <Abs x={60} y={1330} w={960} style={{textAlign: 'center'}}>
          <Kin text="La réponse change tout." at={369.9} size={64} color={GREEN} />
        </Abs>
      )}
      {t > 365.5 && <Dust n={18} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  // fiches bristol : tiroir + glissé + bascule
  ...CH.flatMap((c) => [{at: c.at, s: 'deep-hit', v: 0.35}, {at: c.at + 0.05, s: 'soft-whoosh', v: 0.45, dur: 1.5}, {at: c.at + 0.45, s: 'page', v: 0.35}, {at: c.at + 2.5, s: 'sfx/swish', v: 0.35}]),
  // I
  {at: 5.3, s: 'sfx/whoosh', v: 0.3}, {at: 5.7, s: 'sfx/pop', v: 0.25}, {at: 6.4, s: 'sfx/pop', v: 0.25}, {at: 7.7, s: 'sfx/pop', v: 0.25}, ...rep(8.2, 12, 0.24, 'sfx/click', 0.1),
  {at: 13.5, s: 'riser', v: 0.3, dur: 4}, {at: 15.3, s: 'bass-hit', v: 0.35},
  {at: 21.6, s: 'sfx/swish', v: 0.35}, {at: 24.0, s: 'sfx/thud', v: 0.3},
  ...rep(29.0, 4, 0.5, 'page', 0.25), {at: 31.3, s: 'sfx/whoosh', v: 0.3}, {at: 32.8, s: 'sfx/ding', v: 0.3},
  // II
  {at: 37.2, s: 'sfx/pop', v: 0.25}, {at: 41.1, s: 'tension', v: 0.3, dur: 3.5}, {at: 41.1, s: 'deep-hit', v: 0.4},
  {at: 45.6, s: 'sfx/whoosh', v: 0.35}, ...rep(46, 6, 0.6, 'page', 0.18), {at: 51.8, s: 'sfx/pop', v: 0.2}, {at: 55.2, s: 'sfx/pop', v: 0.2}, {at: 58.2, s: 'sfx/pop', v: 0.2},
  {at: 59.9, s: 'sfx/thud', v: 0.3}, {at: 68.0, s: 'tension', v: 0.25, dur: 2.5}, {at: 69.0, s: 'tampon', v: 0.5},
  // III
  {at: 77.3, s: 'bass-hit', v: 0.35}, {at: 79.6, s: 'sfx/rise', v: 0.3}, ...rep(80.4, 8, 0.12, 'sfx/click', 0.14), {at: 81.0, s: 'validation', v: 0.3},
  {at: 88.9, s: 'sfx/pop', v: 0.3}, ...rep(89.5, 8, 0.1, 'sfx/click', 0.12), {at: 91.6, s: 'deep-hit', v: 0.45},
  {at: 103.8, s: 'sfx/swish', v: 0.3}, {at: 104.8, s: 'soft-whoosh', v: 0.4}, {at: 106.0, s: 'sfx/ding', v: 0.25}, {at: 109.2, s: 'sfx/pop', v: 0.2}, {at: 110.6, s: 'sfx/pop', v: 0.2}, {at: 112.4, s: 'sfx/pop', v: 0.2},
  {at: 115.9, s: 'soft-whoosh', v: 0.4}, {at: 117.0, s: 'sfx/rise', v: 0.3},
  ...[124.1, 125.5, 126.3].flatMap((a) => [...rep(a - 1.4, 8, 0.15, 'tick', 0.15), {at: a, s: 'sfx/ding', v: 0.3}]), {at: 131.6, s: 'riser', v: 0.25, dur: 2}, {at: 133.3, s: 'validation', v: 0.35},
  // IV
  ...rep(139.6, 10, 0.08, 'page', 0.12), {at: 145.0, s: 'sfx/whoosh', v: 0.3}, {at: 147.2, s: 'sfx/thud', v: 0.3},
  {at: 148.0, s: 'sfx/thud', v: 0.35}, {at: 148.5, s: 'sfx/thud', v: 0.35}, {at: 149.0, s: 'sfx/thud', v: 0.35}, {at: 158.8, s: 'sfx/rise', v: 0.25},
  {at: 161.3, s: 'sfx/swish', v: 0.3}, {at: 170.7, s: 'sfx/pop', v: 0.2}, {at: 171.8, s: 'sfx/pop', v: 0.2}, {at: 172.9, s: 'sfx/pop', v: 0.2},
  {at: 175.1, s: 'sfx/swish', v: 0.3}, {at: 180.9, s: 'sfx/pop', v: 0.2}, {at: 184.4, s: 'sfx/pop', v: 0.2}, {at: 187.8, s: 'tampon', v: 0.5},
  {at: 189.6, s: 'sfx/swish', v: 0.3}, {at: 195.8, s: 'sfx/whoosh', v: 0.3}, ...rep(198.8, 4, 0.9, 'stylo', 0.35), {at: 205.0, s: 'sfx/ding', v: 0.25},
  // V
  {at: 221.0, s: 'sfx/whoosh', v: 0.35}, {at: 233.0, s: 'sfx/ding', v: 0.3}, {at: 235.4, s: 'tampon', v: 0.45}, {at: 238.6, s: 'sfx/pop', v: 0.3}, {at: 241.9, s: 'sfx/pop', v: 0.3}, {at: 244.0, s: 'sfx/pop', v: 0.3},
  ...[255.1, 256.6, 258.7, 261.0, 264.8].map((a) => ({at: a, s: 'sfx/ding', v: 0.22})), {at: 268.9, s: 'tampon', v: 0.45},
  {at: 270.6, s: 'sfx/pop', v: 0.3}, ...rep(277.3, 5, 0.46, 'tick', 0.25), {at: 279.8, s: 'sfx/whoosh', v: 0.3}, {at: 281.0, s: 'tampon', v: 0.5}, {at: 285.9, s: 'validation', v: 0.3},
  // VI
  {at: 294.3, s: 'soft-whoosh', v: 0.35}, ...rep(298.9, 4, 0.3, 'sfx/swish', 0.2), {at: 299.0, s: 'tampon', v: 0.4}, {at: 305.2, s: 'sfx/whoosh', v: 0.4}, {at: 305.3, s: 'deep-hit', v: 0.3},
  {at: 308.1, s: 'soft-whoosh', v: 0.35}, {at: 315.6, s: 'bass-hit', v: 0.3}, {at: 316.2, s: 'cadenas', v: 0.45}, {at: 321.6, s: 'sfx/ding', v: 0.25}, {at: 324.9, s: 'sfx/pop', v: 0.25}, {at: 326.4, s: 'sfx/pop', v: 0.25}, {at: 329.1, s: 'sfx/pop', v: 0.25},
  {at: 332.9, s: 'sfx/whoosh', v: 0.3}, ...[334.2, 335.0, 336.5, 337.6].map((a) => ({at: a, s: 'sfx/thud', v: 0.2})), {at: 338.9, s: 'soft-whoosh', v: 0.4}, ...[340.6, 341.8, 342.4, 346.1].map((a) => ({at: a, s: 'sfx/ding', v: 0.2})), {at: 347.6, s: 'sfx/pop', v: 0.3}, {at: 350.9, s: 'validation', v: 0.3},
  // VII
  {at: 356.2, s: 'soft-whoosh', v: 0.35}, {at: 361.4, s: 'deep-hit', v: 0.4}, {at: 362.3, s: 'tampon', v: 0.4}, {at: 364.4, s: 'sfx/rise', v: 0.3}, ...rep(365.2, 12, 0.08, 'sfx/thud', 0.15), {at: 366.0, s: 'tampon', v: 0.4}, {at: 369.9, s: 'validation', v: 0.4},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const ProcProc: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={5.1} to={13.4}><Hopital /></Gate>
    <Gate from={13.3} to={18.2}><Droste /></Gate>
    <Gate from={18.1} to={25.9}><DroitErreur /></Gate>
    <Gate from={25.8} to={34.3}><BonneVersion /></Gate>
    <Gate from={36.8} to={45.5}><Exercice /></Gate>
    <Gate from={45.4} to={71.6}><Anarchie /></Gate>
    <Gate from={71.9} to={87.1}><Ordre /></Gate>
    <Gate from={87.0} to={99.4}><ChuLille /></Gate>
    <Gate from={99.3} to={118.5}><Memoire /></Gate>
    <Gate from={118.4} to={134.2}><Promesse /></Gate>
    <Gate from={136.8} to={147.5}><Vrac /></Gate>
    <Gate from={147.4} to={161.2}><PyrScene /></Gate>
    <Gate from={161.1} to={175.0}><Niveau i={0} from={161.1} to={175.0} ph="docs5/politique.jpg" chips={[{a: 164.6, x: 'la constitution'}, {a: 170.7, x: 'la vision'}, {a: 171.8, x: 'les grands principes'}, {a: 172.9, x: 'la politique qualité'}]} /></Gate>
    <Gate from={174.9} to={189.5}><Niveau i={1} from={174.9} to={189.5} ph="docs5/procedures.jpg" chips={[{a: 178.0, x: 'concret'}, {a: 180.9, x: 'étapes obligatoires'}, {a: 184.4, x: '« comment faire »'}]} stamp={{a: 187.8, x: 'non négociable'}} /></Gate>
    <Gate from={189.4} to={193.5}><Niveau i={2} from={189.4} to={193.5} ph="verites/clipboard.jpg" chips={[{a: 191.5, x: 'enregistrements'}]} /></Gate>
    <Gate from={193.4} to={207.4}><Preuve /></Gate>
    <Gate from={210.2} to={221.1}><Fiable /></Gate>
    <Gate from={220.9} to={249.1}><Passeport /></Gate>
    <Gate from={249.0} to={270.3}><Cycle /></Gate>
    <Gate from={270.2} to={288.4}><Peremption /></Gate>
    <Gate from={291.2} to={308.1}><RedTape /></Gate>
    <Gate from={308.0} to={330.4}><Deming /></Gate>
    <Gate from={330.3} to={353.1}><Split /></Gate>
    <Gate from={355.9} to={OUTRO_AT}><Final /></Gate>
    {CH.slice(1).map((c, i) => <Gate key={c.n} from={c.at} to={c.at + 3.2}><Bristol i={i + 1} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={2.6} to={5.8}><Bristol i={0} /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={372.9}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-procedure-des-procedures-origine.m4a')} trimAfter={s(373.0)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

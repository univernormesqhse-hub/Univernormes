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
 * « Identifier les processus » (7 min 07) — voix d'origine, sous-titres recalés mot à mot, photos réelles,
 * thème « papier quadrillé » de la série, finition « haut de gamme ».
 * Fil rouge inédit : une LIGNE DE MÉTRO. L'en-tête est un plan de ligne à 7 stations (Départ → Avenir) sur lequel une
 * rame avance en continu au fil de la vidéo ; le sommaire déroule la ligne en grand.
 * Transition inédite : le PASSAGE DU TÉMOIN — un témoin de relais traverse l'écran en traînant un volet diagonal à la
 * couleur de la partie, révèle le titre de partie, puis repart et découvre la scène suivante.
 * Les chiffres affichés sont ceux énoncés dans la vidéo d'origine (mention « chiffre cité »).
 */
const ORANGE = '#F28C1E';
const VIO = '#7B5CD6';
const TEAL = '#14A3A3';
const GOLD = '#F5B700';
const OUTRO_AT = 423.6;
export const IDPROC_FRAMES = s(OUTRO_AT + 3.8);

const ST = [
  {at: 2.6, l: 'Départ', c: INK},
  {at: 66.8, l: 'Enjeux', c: BLUE},
  {at: 102.5, l: 'Différencier', c: VIO},
  {at: 195.6, l: '5 étapes', c: ORANGE},
  {at: 302.3, l: 'Mesurer', c: RED},
  {at: 369.0, l: 'Excellence', c: GREEN},
  {at: 415.9, l: 'Avenir', c: TEAL},
];
const PARTS = [
  {at: 66.8, n: 1, title: 'Les enjeux des processus', c: BLUE},
  {at: 102.5, n: 2, title: 'Différencier pour mieux piloter', c: VIO},
  {at: 195.6, n: 3, title: 'La démarche en 5 étapes', c: ORANGE},
  {at: 302.3, n: 4, title: 'Mesurer et éviter les pièges', c: RED},
  {at: 369.0, n: 5, title: 'Vers l’excellence opérationnelle', c: GREEN},
];
const stIdx = (t: number) => ST.reduce((k, c, i) => (t >= c.at ? i : k), 0);
const trainPos = (t: number) => {
  const i = stIdx(t);
  if (i >= ST.length - 1) return ST.length - 1;
  const a = ST[i].at, b = ST[i + 1].at;
  const k = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return i + easeInOut(Math.min(1, k * 1.0));
};

/* ─────────── Briques visuelles ─────────── */
const Kin: React.FC<{text: string; at: number; size: number; color?: string; stagger?: number; style?: React.CSSProperties}> = ({text, at, size, color = INK, stagger = 0.025, style}) => {
  const t = useT();
  let n = 0;
  return (
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, lineHeight: 1.08, letterSpacing: -1, ...style}}>
      {text.split(' ').map((w, wi) => (
        <span key={wi} style={{display: 'inline-block', whiteSpace: 'nowrap', marginRight: size * 0.25}}>
          {w.split('').map((ch, i) => {
            const k = n++;
            const p = prog(t, at + k * stagger, at + k * stagger + 0.45, easeOut);
            return <span key={i} style={{display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * size * 0.6}px) rotate(${(1 - p) * 8}deg)`, filter: `blur(${(1 - p) * 10}px)`}}>{ch}</span>;
          })}
        </span>
      ))}
    </div>
  );
};
const Center: React.FC<{y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({y, children, style}) => (
  <Abs x={40} y={y} w={1000} style={{textAlign: 'center', ...style}}>{children}</Abs>
);
const Deep: React.FC<{src: string; x: number; y: number; w: number; h: number; at: number; pos?: string; tilt?: number; children?: React.ReactNode; filter?: string; round?: number}> = ({src, x, y, w, h, at, pos = 'center', tilt = 1, children, filter, round = 30}) => {
  const t = useT();
  const k = t - at;
  const inn = prog(t, at, at + 0.7, easeOut);
  const sweep = ((k * 0.45) % 1.6) - 0.3;
  return (
    <Abs x={x} y={y} w={w} h={h} style={{perspective: 2200, opacity: inn}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: round, overflow: 'hidden', border: '8px solid #fff', boxShadow: '0 40px 80px rgba(20,33,61,0.3)', transform: `rotateY(${Math.sin(k * 0.6) * 4 * tilt}deg) rotateX(${Math.cos(k * 0.5) * 2.5 * tilt}deg) scale(${0.92 + inn * 0.08})`}}>
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
  return <div style={{display: 'inline-block', padding: `${size * 0.3}px ${size * 0.7}px`, borderRadius: 60, background: c, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: size, transform: `scale(${Math.max(0, p)})`, boxShadow: '0 10px 24px rgba(20,33,61,0.18)', whiteSpace: 'nowrap', ...style}}>{children}</div>;
};
const Stamp: React.FC<{at: number; c: string; text: string; x: number; y: number; rot?: number; size?: number}> = ({at, c, text, x, y, rot = -8, size = 54}) => {
  const t = useT();
  if (t < at) return null;
  const p = prog(t, at, at + 0.22, easeIn);
  return (
    <Abs x={x} y={y} style={{transform: `rotate(${rot}deg) scale(${lerp(2.2, 1, p)})`, opacity: p, zIndex: 5}}>
      <div style={{padding: '10px 26px', border: `7px solid ${c}`, borderRadius: 14, color: c, fontFamily: sansFont, fontWeight: 900, fontSize: size, letterSpacing: 2, textTransform: 'uppercase', background: 'rgba(255,255,255,0.88)', whiteSpace: 'nowrap'}}>{text}</div>
    </Abs>
  );
};
const Cite: React.FC<{y: number; at: number; text?: string}> = ({y, at, text = 'chiffre cité dans la vidéo d’origine'}) => {
  const t = useT();
  return <Abs x={0} y={y} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 700, fontSize: 24, color: DIM, opacity: pop(t, at)}}>{text}</Abs>;
};
const Count: React.FC<{to: number; at: number; dur?: number; suffix?: string}> = ({to, at, dur = 1.2, suffix = ''}) => {
  const t = useT();
  return <>{Math.round(to * prog(t, at, at + dur, easeOut))}{suffix}</>;
};
const Dust: React.FC<{n?: number; c?: string; down?: boolean}> = ({n = 22, c = GOLD, down = false}) => {
  const t = useT();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: n}, (_, i) => {
        const x = random(`dx${i}`) * 1080 + Math.sin(t * 0.6 + i) * 30;
        const sp = (20 + random(`ds${i}`) * 40) * (down ? -1 : 1);
        const y = ((random(`dy${i}`) * 1920 - t * sp) % 1920 + 1920) % 1920;
        const r = 4 + random(`dr${i}`) * 7;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: r, height: r, borderRadius: r, background: c, opacity: 0.2 + 0.3 * Math.abs(Math.sin(t * 1.5 + i)), boxShadow: `0 0 ${r * 2}px ${c}`}} />;
      })}
    </AbsoluteFill>
  );
};
const Out: React.FC<{end: number; children: React.ReactNode}> = ({end, children}) => {
  const t = useT();
  const o = prog(t, end - 0.4, end, easeIn);
  return <AbsoluteFill style={{opacity: 1 - o, transform: `translateY(${-o * 50}px)`}}>{children}</AbsoluteFill>;
};
const Card: React.FC<{x: number; y: number; w: number; h?: number; at: number; c?: string; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, at, c, children, style}) => {
  const t = useT();
  const p = Math.min(1, spring(t, at, 8, 14));
  return <Abs x={x} y={y} w={w} h={h} style={{background: '#fff', borderRadius: 26, boxShadow: '0 20px 44px rgba(20,33,61,0.16)', borderTop: c ? `10px solid ${c}` : undefined, padding: 26, boxSizing: 'border-box', transform: `translateY(${(1 - p) * 60}px) scale(${0.9 + 0.1 * Math.max(0, p)})`, opacity: t >= at ? 1 : 0, ...style}}>{children}</Abs>;
};

/* ─────────── Fil rouge : ligne de métro ─────────── */
const MetroLine: React.FC<{x: number; y: number; w: number; big?: boolean}> = ({x, y, w, big = false}) => {
  const t = useT();
  const n = ST.length;
  const gap = w / (n - 1);
  const pos = trainPos(t);
  const cur = stIdx(t);
  const r = big ? 22 : 13;
  return (
    <Abs x={x} y={y} w={w} h={big ? 120 : 64}>
      <div style={{position: 'absolute', left: 0, right: 0, top: r - 4, height: 8, borderRadius: 4, background: '#DDE3EC'}} />
      <div style={{position: 'absolute', left: 0, width: pos * gap, top: r - 4, height: 8, borderRadius: 4, background: `linear-gradient(90deg, ${ST.slice(0, cur + 1).map((s0) => s0.c).join(', ')}${cur === 0 ? `, ${ST[0].c}` : ''})`}} />
      {ST.map((s0, i) => {
        const on = i <= cur;
        return (
          <div key={i} style={{position: 'absolute', left: i * gap - r, top: 0, width: r * 2, textAlign: 'center'}}>
            <div style={{width: r * 2, height: r * 2, borderRadius: r, background: on ? s0.c : '#fff', border: `${big ? 6 : 4}px solid ${s0.c}`, boxSizing: 'border-box', transform: `scale(${i === cur ? 1.15 : 1})`}} />
            <div style={{position: 'absolute', left: -70 + r, width: 140, top: r * 2 + 4, fontFamily: sansFont, fontWeight: 800, fontSize: big ? 21 : 17, color: i === cur ? s0.c : on ? INK : DIM}}>{s0.l}</div>
          </div>
        );
      })}
      <div style={{position: 'absolute', left: pos * gap - (big ? 38 : 24), top: big ? -44 : -28, width: big ? 76 : 48, height: big ? 34 : 22, borderRadius: big ? 12 : 8, background: INK, boxShadow: '0 6px 14px rgba(20,33,61,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
        {[0, 1, 2].map((k) => <div key={k} style={{width: big ? 14 : 9, height: big ? 12 : 8, borderRadius: 3, background: GOLD}} />)}
      </div>
    </Abs>
  );
};
const Header: React.FC = () => {
  const t = useT();
  const hide = t > 50.2 && t < 66.8;
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 64, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 78, display: 'block'}} /></div>
      {t > 2.6 && t < OUTRO_AT && <div style={{opacity: pop(t, 2.6) * (hide ? 1 - prog(t, 50.2, 50.6) + prog(t, 66.4, 66.8) : 1)}}><MetroLine x={80} y={226} w={920} /></div>}
    </AbsoluteFill>
  );
};
/** Le passage du témoin : volet diagonal emmené par un témoin de relais. */
const Baton: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const p = PARTS[i];
  const k = t - p.at;
  const inn = prog(t, p.at, p.at + 0.6, easeInOut);
  const out = prog(t, p.at + 2.4, p.at + 3.0, easeInOut);
  if (k < 0 || out >= 1) return null;
  const lead = out > 0 ? out : inn;
  const X = -500 + lead * 2100;
  const poly = out > 0 ? `polygon(${X}px 0, 2200px 0, 2200px 1920px, ${X - 400}px 1920px)` : `polygon(-600px 0, ${X}px 0, ${X - 400}px 1920px, -600px 1920px)`;
  return (
    <AbsoluteFill style={{zIndex: 35}}>
      <AbsoluteFill style={{background: p.c, clipPath: poly}}>
        <Abs x={90} y={640} w={900}>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 40, letterSpacing: 8, color: '#ffffffCC', opacity: pop(t, p.at + 0.4)}}>PARTIE</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 330, lineHeight: 0.9, color: '#fff', opacity: pop(t, p.at + 0.45), transform: `translateX(${(1 - pop(t, p.at + 0.45)) * -80}px)`}}>{p.n}</div>
          <Kin text={p.title} at={p.at + 0.7} size={76} color="#fff" />
        </Abs>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 26, background: 'repeating-linear-gradient(90deg, #ffffff40 0 60px, transparent 60px 120px)'}} />
      </AbsoluteFill>
      {/* le témoin, sur le front du volet */}
      <div style={{position: 'absolute', left: X - 200 - 130, top: 960 - 34, width: 260, height: 68, borderRadius: 34, background: `linear-gradient(180deg, #fff, ${GOLD} 40%, #C98F00)`, boxShadow: '0 16px 30px rgba(0,0,0,0.3)', transform: `rotate(${-68 + Math.sin(k * 8) * 4}deg)`}}>
        <div style={{position: 'absolute', left: 40, top: 0, width: 14, height: 68, background: '#ffffff88'}} />
        <div style={{position: 'absolute', right: 40, top: 0, width: 14, height: 68, background: '#00000022'}} />
      </div>
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
      <Img src={PH('promo/terrain-controle.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 940, objectFit: 'cover', objectPosition: '55% 30%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 44%, ${PAPER} 50%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={50} y={790} w={980} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>APPROCHE PROCESSUS · ISO 9001 & 45001</div>
        <T size={104} style={{marginTop: 20, textTransform: 'uppercase', letterSpacing: -3}}>Identifier</T>
        <T size={104} style={{textTransform: 'uppercase', letterSpacing: -3}}><span style={{background: GOLD, padding: '0 22px', borderRadius: 18}}>les processus</span></T>
        <T size={50} color={DIM} style={{marginTop: 16}}>De la corvée documentaire à l’outil de pilotage</T>
      </Abs>
      <Abs x={0} y={1360} w={1080}><div style={{transform: 'scale(1)'}}><MetroLine x={100} y={0} w={880} big /></div></Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO ═════════════ */
const Etagere: React.FC = () => {
  const t = useT();
  const shatter = prog(t, 13.7, 14.4, easeIn);
  return (
    <Out end={14.6}>
      <Center y={330}><Kin text="L’identification des processus…" at={2.9} size={54} /></Center>
      <Abs x={60} y={430} w={960} h={620} style={{opacity: 1 - shatter}}>
        {Array.from({length: 4}, (_, k) => {
          const r = random(`sh${k}`);
          return (
            <div key={k} style={{position: 'absolute', left: (k % 2) * 480, top: Math.floor(k / 2) * 310, width: 480, height: 310, overflow: 'hidden', transform: `translate(${shatter * (k % 2 ? 300 : -300)}px, ${shatter * (400 + r * 300)}px) rotate(${shatter * (r - 0.5) * 60}deg)`}}>
              <Img src={PH('docs5/dossiers.jpg')} style={{position: 'absolute', left: -(k % 2) * 480, top: -Math.floor(k / 2) * 310, width: 960, height: 620, objectFit: 'cover', filter: `sepia(${prog(t, 7.7, 9.5)}) contrast(0.9)`}} />
            </div>
          );
        })}
        <div style={{position: 'absolute', inset: 0, borderRadius: 24, boxShadow: 'inset 0 0 0 8px #fff'}} />
      </Abs>
      {t > 9.4 && t < 13.8 && <Dust n={40} c="#B9A27A" down />}
      <Abs x={0} y={1080} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', padding: '0 50px', boxSizing: 'border-box', opacity: 1 - shatter}}>
        <Pill at={5.3} c={DIM} size={30}>formalité administrative</Pill><Pill at={7.7} c={DIM} size={30}>corvée documentaire</Pill><Pill at={12.3} c="#9C8A66" size={30}>prend la poussière</Pill>
      </Abs>
      <Stamp at={13.7} c={RED} text="Oubliez ça !" x={250} y={700} rot={-8} size={84} />
    </Out>
  );
};
const Moteur: React.FC = () => {
  const t = useT();
  const spin = Math.max(0, t - 18.9) * 120;
  return (
    <Out end={23.1}>
      <Center y={330}><Kin text="Le décryptage UNIVERSNORMES" at={14.6} size={54} /></Center>
      <Deep src="iso26/analyste-kpi.jpg" x={60} y={430} w={960} h={560} at={15.0} />
      <Abs x={0} y={1030} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 60, alignItems: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, opacity: pop(t, 18.9)}}>
          <div style={{width: 150, height: 150, transform: `rotate(${spin}deg)`}}><F n="engrenage" size={150} /></div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: BLUE, marginTop: 10}}>outil de pilotage</div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, opacity: pop(t, 20.5)}}>
          <div style={{width: 150, height: 150, transform: `translateY(${Math.sin(t * 6) * 6}px) rotate(-30deg)`}}><F n="fusee" size={150} /></div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: GREEN, marginTop: 10}}>moteur de performance</div>
        </div>
      </Abs>
    </Out>
  );
};

/* ═════════════ INTERFACES ═════════════ */
const Interfaces: React.FC = () => {
  const t = useT();
  const gapHot = prog(t, 30.9, 31.6);
  const sparks = t > 31 && t < 42.6;
  return (
    <Out end={42.7}>
      <Center y={320}><Kin text="Regardez ce chiffre" at={23.2} size={52} color={DIM} /></Center>
      <Center y={400}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 250, lineHeight: 1, color: RED, transform: `scale(${0.6 + 0.4 * Math.min(1, spring(t, 26.2, 6, 10))})`, opacity: pop(t, 26.0)}}><Count to={60} at={26.2} suffix=" %" /></div></Center>
      <Center y={650}><Kin text="des non-conformités naissent aux interfaces" at={28.0} size={38} /></Center>
      <Cite y={760} at={28.0} text="chiffre cité dans la vidéo d’origine (jusqu’à 60 %)" />
      <Abs x={60} y={820} w={960} h={420}>
        {[0, 1].map((k) => (
          <div key={k} style={{position: 'absolute', left: k ? 560 : 0, top: 40, width: 400, height: 320, borderRadius: 26, background: k ? `${VIO}18` : `${BLUE}18`, border: `5px solid ${k ? VIO : BLUE}`, opacity: pop(t, 32.4 + k * 0.3), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}>
            <F n={k ? 'usine' : 'homme-bureau'} size={110} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: k ? VIO : BLUE}}>{k ? 'Département B' : 'Département A'}</div>
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: GREEN, opacity: pop(t, 38.4)}}>✓ cœur du travail</div>
          </div>
        ))}
        <div style={{position: 'absolute', left: 400, top: 120, width: 160, height: 160, borderRadius: 80, background: RED, opacity: 0.15 + 0.5 * gapHot * Math.abs(Math.sin(t * 4)), filter: 'blur(10px)'}} />
        <div style={{position: 'absolute', left: 405, top: 170, width: 150, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: RED, opacity: gapHot}}>zone de<br />transfert</div>
        {sparks && Array.from({length: 10}, (_, k) => {
          const a = (t * 3 + k * 0.7) % 1;
          const ang = random(`sp${k}`) * Math.PI * 2;
          return <div key={k} style={{position: 'absolute', left: 480 + Math.cos(ang) * a * 120, top: 200 + Math.sin(ang) * a * 120, width: 10, height: 10, borderRadius: 5, background: GOLD, opacity: 1 - a, boxShadow: `0 0 12px ${ORANGE}`}} />;
        })}
      </Abs>
      <Stamp at={40.2} c={RED} text="là où les responsabilités se croisent" x={60} y={1240} rot={-3} size={34} />
    </Out>
  );
};
const Relais: React.FC = () => {
  const t = useT();
  const pass = prog(t, 43.6, 44.9, easeInOut);
  const drop = prog(t, 45.0, 45.8, easeIn);
  const catchK = prog(t, 47.9, 48.6, easeOut);
  const bx = lerp(330, 640, pass);
  const by = 640 - Math.sin(pass * Math.PI) * 140 + drop * 420 * (1 - catchK);
  return (
    <Out end={50.2}>
      <Center y={330}><Kin text="Comme une course de relais" at={42.8} size={58} /></Center>
      <Deep src="induction/technicien-hse.jpg" x={60} y={440} w={440} h={560} at={42.8} pos="40% 30%" />
      <Deep src="epiepc/operatrice.jpg" x={580} y={440} w={440} h={560} at={43.0} pos="50% 25%" />
      <div style={{position: 'absolute', left: bx, top: by, width: 140, height: 40, borderRadius: 20, background: `linear-gradient(180deg, #fff, ${drop > 0 && catchK < 1 ? RED : GOLD} 40%, #A87400)`, boxShadow: '0 10px 20px rgba(0,0,0,0.3)', transform: `rotate(${pass * 40 + drop * 160 * (1 - catchK)}deg)`, zIndex: 6, opacity: pop(t, 43.4)}} />
      <Stamp at={45.1} c={RED} text="le témoin tombe" x={300} y={1060} rot={-5} size={46} />
      {t > 46.5 && (
        <Abs x={0} y={1180} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20}}>
          <Pill at={46.6} c={ORANGE} size={34}>zones de friction</Pill>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, opacity: pop(t, 47.9)}}>→</div>
          <div style={{opacity: pop(t, 48.7), display: 'flex', alignItems: 'center', gap: 10}}><F n="cle" size={90} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: GREEN}}>la clé</span></div>
        </Abs>
      )}
    </Out>
  );
};
const Programme: React.FC = () => {
  const t = useT();
  const items = [{l: 'Les enjeux des processus', a: 52.3}, {l: 'Différencier pour mieux piloter', a: 54.9}, {l: 'La démarche en 5 étapes', a: 57.4}, {l: 'Mesurer et éviter les pièges', a: 59.7}, {l: 'Maintenir l’excellence', a: 61.9}];
  const go = prog(t, 65.6, 66.8, easeIn);
  const fill = items.filter((x) => t >= x.a).length;
  return (
    <Out end={66.8}>
      <Center y={300}><Kin text="Le plan de ligne" at={50.4} size={64} /></Center>
      <Abs x={170} y={430} w={100} h={900}>
        <div style={{position: 'absolute', left: 38, top: 20, width: 24, height: 820, borderRadius: 12, background: '#DDE3EC'}} />
        <div style={{position: 'absolute', left: 38, top: 20, width: 24, height: Math.max(0, (fill - 1) / 4) * 820, borderRadius: 12, background: `linear-gradient(180deg, ${PARTS.map((p) => p.c).join(', ')})`}} />
        <div style={{position: 'absolute', left: 14, top: 20 + lerp(0, 820, Math.max(0, (fill - 1) / 4)) - 60 - go * 900, width: 72, height: 110, borderRadius: 18, background: INK, boxShadow: '0 10px 20px rgba(20,33,61,0.3)', opacity: pop(t, 52.3), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'}}>
          {[0, 1, 2].map((k) => <div key={k} style={{width: 40, height: 18, borderRadius: 4, background: GOLD}} />)}
        </div>
      </Abs>
      {items.map((x, k) => {
        const on = t >= x.a;
        const p = PARTS[k];
        return (
          <Abs key={k} x={180} y={430 + k * 205} w={860} style={{display: 'flex', alignItems: 'center', gap: 30}}>
            <div style={{width: 80, height: 80, borderRadius: 40, background: on ? p.c : '#fff', border: `8px solid ${p.c}`, boxSizing: 'border-box', transform: `scale(${on ? 1 + 0.2 * Math.max(0, 1 - (t - x.a) * 3) : 0.9})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: on ? '#fff' : p.c}}>{p.n}</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: on ? INK : '#C3CAD6', transform: `translateX(${on ? 0 : 20}px)`}}>{x.l}</div>
          </Abs>
        );
      })}
      <Abs x={0} y={1460} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={65.6} c={GREEN} size={40}>C’est parti !</Pill></Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 1 — Enjeux ═════════════ */
const Vitrine: React.FC = () => {
  const t = useT();
  const glass = prog(t, 71.5, 72.8, easeInOut);
  return (
    <Out end={76.9}>
      <Center y={330}><Kin text="Au-delà de la simple vitrine" at={69.7} size={58} color={BLUE} /></Center>
      <Deep src="iso26/direction-equipe.jpg" x={60} y={440} w={960} h={600} at={69.8}>
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(255,255,255,0.65), rgba(220,235,255,0.35) 40%, rgba(255,255,255,0.6))', transform: `translateX(${glass * 1000}px)`, borderRight: '6px solid #fff'}}>
          <div style={{position: 'absolute', left: 60, top: 40, fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: '#fff', textShadow: '0 4px 12px rgba(0,0,0,0.25)'}}>VITRINE</div>
        </div>
      </Deep>
      <Abs x={0} y={1100} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 30}}>
        {[{l: 'ISO 9001', s: 'qualité', a: 74.0, c: BLUE}, {l: 'ISO 45001', s: 'santé & sécurité', a: 75.7, c: RED}].map((b) => (
          <div key={b.l} style={{transform: `scale(${Math.min(1, spring(t, b.a, 8, 13))})`, width: 300, height: 170, borderRadius: 26, background: '#fff', border: `7px solid ${b.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 30px rgba(20,33,61,0.15)'}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: b.c}}>{b.l}</div>
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: DIM}}>{b.s}</div>
          </div>
        ))}
      </Abs>
    </Out>
  );
};
const Langage: React.FC = () => {
  const t = useT();
  const sketch = prog(t, 77.0, 79.5, easeInOut);
  const cross = prog(t, 85.8, 86.5, easeOut);
  return (
    <Out end={88.1}>
      <Abs x={110} y={360} w={860} h={420}>
        <svg width={860} height={420} viewBox="0 0 860 420">
          {[[60, 160, 250, 260], [300, 120, 520, 300], [560, 160, 800, 260]].map((r, k) => <rect key={k} x={r[0]} y={r[1]} width={r[2] - r[0]} height={r[3] - r[1]} rx={20} fill="none" stroke={DIM} strokeWidth={5} strokeDasharray={900} strokeDashoffset={900 * (1 - sketch)} />)}
          <path d="M250 210 L300 210 M520 210 L560 210" stroke={DIM} strokeWidth={5} strokeDasharray={200} strokeDashoffset={200 * (1 - sketch)} />
        </svg>
        <div style={{position: 'absolute', left: 0, top: 0, fontFamily: 'Georgia, serif', fontSize: 200, lineHeight: 1, color: BLUE, opacity: 0.25}}>“</div>
      </Abs>
      <Card x={70} y={820} w={940} at={79.6} c={BLUE}>
        <Kin text="Pas un simple dessin," at={79.7} size={52} color={DIM} />
        <Kin text="mais un langage commun de pilotage." at={80.7} size={58} color={BLUE} />
        <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 24, color: DIM, marginTop: 12}}>citation tirée de la source de la vidéo</div>
      </Card>
      <Abs x={0} y={1200} w={1080} style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{position: 'relative', opacity: pop(t, 84.7)}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: DIM}}>le mythe de la carto théorique</div>
          <div style={{position: 'absolute', left: -10, right: -10, top: '50%', height: 10, background: RED, transform: `scaleX(${cross})`, transformOrigin: '0 50%', borderRadius: 5}} />
        </div>
      </Abs>
    </Out>
  );
};
const Vivant: React.FC = () => {
  const t = useT();
  const br = 1 + 0.05 * Math.sin(t * 2.2);
  const outs = [{l: 'indicateurs', a: 94.7, ic: 'graphique', c: BLUE, x: 90}, {l: 'plans d’action', a: 96.1, ic: 'clipboard', c: ORANGE, x: 400}, {l: 'décisions de la direction', a: 97.7, ic: 'directeur', c: VIO, x: 710}];
  return (
    <Out end={102.5}>
      <Center y={330}><Kin text="Un référentiel vivant" at={90.9} size={62} color={GREEN} /></Center>
      <Abs x={290} y={430} w={500} h={500} style={{transform: `scale(${br})`, opacity: pop(t, 88.2)}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: 250, background: `radial-gradient(circle, ${GREEN}33, transparent 70%)`}} />
        <Deep src="induction/briefing-atelier.jpg" x={60} y={60} w={380} h={380} at={88.2} round={190} />
        <div style={{position: 'absolute', left: 120, top: 210, width: 260, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: '#fff', textShadow: '0 3px 10px rgba(0,0,0,0.6)', opacity: pop(t, 89.9)}}>pas figé</div>
      </Abs>
      <svg style={{position: 'absolute', left: 0, top: 0}} width={1080} height={1920}>
        {outs.map((o, k) => <path key={k} d={`M540 930 C 540 1010, ${o.x + 140} 980, ${o.x + 140} 1060`} fill="none" stroke={o.c} strokeWidth={8} strokeDasharray={300} strokeDashoffset={300 * (1 - prog(t, o.a - 0.4, o.a))} strokeLinecap="round" />)}
      </svg>
      {outs.map((o, k) => (
        <Abs key={k} x={o.x} y={1070} w={280} style={{textAlign: 'center', opacity: pop(t, o.a)}}>
          <div style={{width: 140, height: 140, margin: '0 auto', borderRadius: 70, background: '#fff', boxShadow: '0 12px 24px rgba(20,33,61,0.15)', border: `6px solid ${o.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={o.ic} size={86} /></div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: o.c, marginTop: 10}}>{o.l}</div>
        </Abs>
      ))}
    </Out>
  );
};

/* ═════════════ PARTIE 2 — Différencier ═════════════ */
const Confusion: React.FC = () => {
  const t = useT();
  const sep = prog(t, 113.0, 114.6, easeInOut);
  return (
    <Out end={113.8}>
      <Center y={340}><Kin text="S’entendre sur le vocabulaire" at={107.6} size={56} /></Center>
      <Abs x={0} y={620} w={1080} h={400}>
        {['PROCESSUS', 'PROCÉDURE'].map((w, k) => (
          <div key={w} style={{position: 'absolute', left: 0, right: 0, top: 120 + (k ? 1 : -1) * sep * 120, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 120, color: k ? ORANGE : VIO, opacity: 0.75 * pop(t, 110.2), transform: `translateX(${Math.sin(t * 9 + k * 2) * 14 * (1 - sep)}px)`, filter: `blur(${(1 - sep) * 3}px)`, mixBlendMode: 'multiply'}}>{w}</div>
        ))}
      </Abs>
      <Abs x={0} y={1120} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={110.3} c={RED} size={36}>confusion très fréquente</Pill></Abs>
    </Out>
  );
};
const ProcVsProc: React.FC = () => {
  const t = useT();
  const flow = (t - 119.1) * 0.6;
  const order = prog(t, 137.2, 138.2, easeInOut);
  return (
    <Out end={144.0}>
      <Card x={50} y={330} w={980} h={470} at={113.8} c={VIO}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: VIO}}>Processus <span style={{fontSize: 34, color: DIM}}>= une dynamique</span></div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 40}}>
          <div style={{textAlign: 'center', opacity: pop(t, 119.2)}}><F n="colis" size={90} /><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 26}}>entrées</div></div>
          <div style={{flex: 1, height: 14, margin: '0 10px', borderRadius: 7, background: `repeating-linear-gradient(90deg, ${VIO} 0 30px, ${VIO}44 30px 50px)`, backgroundPositionX: flow * 100, opacity: pop(t, 119.6)}} />
          <div style={{width: 150, height: 150, borderRadius: 30, background: VIO, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 119.8), transform: `rotate(${t > 119.8 ? (t - 119.8) * 30 : 0}deg)`}}><F n="engrenage" size={100} /></div>
          <div style={{flex: 1, height: 14, margin: '0 10px', borderRadius: 7, background: `repeating-linear-gradient(90deg, ${GREEN} 0 30px, ${GREEN}44 30px 50px)`, backgroundPositionX: flow * 100, opacity: pop(t, 120.4)}} />
          <div style={{textAlign: 'center', opacity: pop(t, 120.6)}}><F n="graphique" size={90} /><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 26}}>résultats</div></div>
        </div>
        <div style={{display: 'flex', gap: 14, marginTop: 34}}><Pill at={122.4} c={VIO} size={28}>1 propriétaire</Pill><Pill at={123.5} c={VIO} size={28}>des indicateurs</Pill><Pill at={120.4} c={GREEN} size={28}>mesurable</Pill></div>
      </Card>
      <Card x={50} y={830} w={980} h={400} at={125.9} c={ORANGE}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: ORANGE}}>Procédure <span style={{fontSize: 34, color: DIM}}>= le mode d’emploi</span></div>
        <div style={{display: 'flex', gap: 24, marginTop: 30, alignItems: 'center'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            {['Étape 1', 'Étape 2', 'Étape 3'].map((x, k) => <div key={k} style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: INK, opacity: pop(t, 127.4 + k * 0.4)}}>☐ {x}</div>)}
          </div>
          <div style={{display: 'flex', gap: 10, marginLeft: 'auto'}}>
            {[0, 1, 2].map((k) => <div key={k} style={{width: 120, height: 150, borderRadius: 12, background: `${ORANGE}18`, border: `4px solid ${ORANGE}`, opacity: pop(t, 131.2 + k * 0.25), display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="memo" size={70} /></div>)}
          </div>
        </div>
        <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: ORANGE, marginTop: 10, opacity: pop(t, 131.4)}}>répétable à l’identique</div>
      </Card>
      {t > 133.5 && (
        <Abs x={50} y={1260} w={980} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: pop(t, 133.6)}}>
          <div style={{order: order > 0.5 ? 0 : 2}}><Pill at={137.2} c={VIO} size={32}>① les flux (processus)</Pill></div>
          <div style={{order: 1, fontFamily: sansFont, fontWeight: 900, fontSize: 44}}>→</div>
          <div style={{order: order > 0.5 ? 2 : 0}}><Pill at={140.9} c={ORANGE} size={32}>② les procédures</Pill></div>
        </Abs>
      )}
    </Out>
  );
};
const Donut: React.FC = () => {
  const t = useT();
  const parts = [{v: 65, l: 'réalisation', s: 'crée la valeur client', c: GREEN, a: 148.6}, {v: 20, l: 'support', s: 'fournit les ressources', c: BLUE, a: 154.2}, {v: 15, l: 'management', s: 'stratégie', c: VIO, a: 157.8}];
  const bloat = prog(t, 162.7, 164.5, easeInOut) * (1 - prog(t, 168.6, 169.6));
  const R = 205, C = 2 * Math.PI * R;
  let acc = 0;
  return (
    <Out end={169.7}>
      <Center y={330}><Kin text="L’équilibre idéal" at={145.8} size={62} color={GREEN} /></Center>
      <Abs x={290} y={440} w={500} h={500}>
        <svg width={500} height={500} viewBox="0 0 500 500">
          {parts.map((p, k) => {
            const v = k === 2 ? p.v + bloat * 30 : k === 0 ? p.v - bloat * 30 : p.v;
            const len = (v / 100) * C * prog(t, p.a - 0.2, p.a + 0.6, easeOut);
            const el = <circle key={k} cx={250} cy={250} r={R} fill="none" stroke={p.c} strokeWidth={70} strokeDasharray={`${len} ${C}`} strokeDashoffset={-acc} transform="rotate(-90 250 250)" />;
            acc += (v / 100) * C;
            return el;
          })}
        </svg>
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: bloat > 0.3 ? RED : GREEN}}>{bloat > 0.3 ? '!' : <Count to={65} at={148.6} suffix=" %" />}</div>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: DIM}}>{bloat > 0.3 ? 'déséquilibre' : 'réalisation'}</div>
        </div>
      </Abs>
      <Abs x={90} y={990} w={900} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        {parts.map((p, k) => (
          <div key={k} style={{display: 'flex', alignItems: 'center', gap: 20, opacity: pop(t, p.a)}}>
            <div style={{width: 150, fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: p.c, textAlign: 'right'}}>{p.v} %</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK}}>{p.l} <span style={{fontWeight: 700, fontSize: 28, color: DIM}}>· {p.s}</span></div>
          </div>
        ))}
      </Abs>
      <Cite y={1290} at={148.6} text="répartition citée dans la vidéo d’origine" />
      <Stamp at={165.0} c={RED} text="alerte bureaucratie" x={230} y={640} rot={-8} size={52} />
    </Out>
  );
};
const Indicateurs: React.FC = () => {
  const t = useT();
  const flood = prog(t, 181.6, 183.0, easeOut) * (1 - prog(t, 186.6, 187.6, easeInOut));
  const N = 48;
  return (
    <Out end={195.6}>
      <Center y={320}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 200, lineHeight: 1, color: VIO, opacity: pop(t, 172.5), transform: `scale(${0.6 + 0.4 * Math.min(1, spring(t, 172.6, 6, 10))})`}}>5 à 8</div></Center>
      <Center y={540}><Kin text="indicateurs par processus" at={173.8} size={50} /></Center>
      <Cite y={610} at={173.8} text="limite recommandée citée dans la vidéo d’origine" />
      <Abs x={60} y={680} w={960} h={520}>
        {Array.from({length: N}, (_, k) => {
          const core = k < 6;
          const cx = core ? 40 + (k % 3) * 310 : 10 + (k % 8) * 120;
          const cy = core ? 20 + Math.floor(k / 3) * 250 : 10 + Math.floor(k / 8) * 85;
          const vis = core ? pop(t, 177.0 + k * 0.15) * (1 - flood) + (t > 186.8 ? 0 : 0) : flood;
          const w = core ? 280 : 104;
          const h = core ? 220 : 72;
          const val = 0.3 + random(`kv${k}`) * 0.6;
          return (
            <div key={k} style={{position: 'absolute', left: cx, top: cy, width: w, height: h, borderRadius: core ? 20 : 8, background: '#fff', boxShadow: '0 8px 18px rgba(20,33,61,0.12)', opacity: vis, transform: `scale(${0.8 + 0.2 * vis}) rotate(${core ? 0 : (random(`kr${k}`) - 0.5) * 8}deg)`, padding: core ? 18 : 6, boxSizing: 'border-box', display: 'flex', alignItems: 'flex-end', gap: core ? 10 : 3}}>
              {Array.from({length: core ? 6 : 5}, (_, j) => <div key={j} style={{flex: 1, height: `${(0.3 + random(`b${k}${j}`) * 0.7) * val * 100}%`, borderRadius: 4, background: core ? [VIO, BLUE, GREEN][k % 3] : '#C3CAD6'}} />)}
            </div>
          );
        })}
        {flood > 0.3 && <div style={{position: 'absolute', left: 140, top: 200, padding: '14px 30px', borderRadius: 20, background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 48, opacity: flood, transform: 'rotate(-4deg)'}}>paralysie analytique</div>}
      </Abs>
      <Abs x={0} y={1220} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16, alignItems: 'center'}}>
        <Pill at={178.2} c={VIO} size={30}>lisible</Pill><Pill at={189.3} c={BLUE} size={30}>chaque donnée → une action</Pill><Pill at={193.7} c={GREEN} size={30}>fiabilité &gt; 95 %</Pill>
      </Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 3 — Démarche ═════════════ */
const STEPS = [
  {l: 'Cadrage', s: 'délimiter le terrain', a: 206.4, ph: 'arsenal/cartographie.jpg', ic: 'cible'},
  {l: 'Collecte', s: 'informations factuelles', a: 209.1, ph: 'induction/reunion-audit.jpg', ic: 'loupe'},
  {l: 'Modélisation', s: 'rendre visuel', a: 211.8, ph: 'iso26/ecrans-referentiels.jpg', ic: 'graphique'},
  {l: 'Validation', s: 'par vos équipes', a: 214.9, ph: 'promo/audit-reunion.jpg', ic: 'check'},
  {l: 'Intégration', s: 'dans le quotidien', a: 216.9, ph: 'verites/groupe.jpg', ic: 'engrenage'},
];
const Escalier: React.FC = () => {
  const t = useT();
  return (
    <Out end={225.4}>
      <Center y={320}><Kin text="La méthode chronologique" at={199.9} size={58} color={ORANGE} /></Center>
      {STEPS.map((st, k) => {
        const p = Math.min(1, spring(t, st.a, 8, 13));
        const y = 1180 - k * 165;
        const x = 60 + k * 70;
        return (
          <Abs key={k} x={x} y={y} w={680} h={150} style={{transform: `translateX(${(1 - Math.max(0, p)) * 600}px)`, opacity: t >= st.a ? 1 : 0}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: 22, background: '#fff', boxShadow: '0 14px 30px rgba(20,33,61,0.15)', borderLeft: `14px solid ${ORANGE}`, display: 'flex', alignItems: 'center', gap: 18, padding: '0 20px', overflow: 'hidden'}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: ORANGE, width: 60}}>{k + 1}</div>
              <div style={{flex: 1}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: INK}}>{st.l}</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 26, color: DIM}}>{st.s}</div></div>
              <div style={{width: 190, height: 150, marginRight: -20, overflow: 'hidden'}}><Img src={PH(st.ph)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
            </div>
          </Abs>
        );
      })}
      {t > 219.3 && (
        <Abs x={700} y={420} w={330} style={{textAlign: 'center', opacity: pop(t, 222.9)}}>
          <F n="calendrier" size={150} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: ORANGE}}>6 à 8 semaines</div>
          <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: DIM}}>durée citée dans la vidéo d’origine</div>
        </Abs>
      )}
    </Out>
  );
};
const Sobriete: React.FC = () => {
  const t = useT();
  const cross = prog(t, 246.9, 247.6, easeOut);
  return (
    <Out end={251.3}>
      <Center y={320}><Kin text="La sobriété est de mise" at={228.0} size={58} color={ORANGE} /></Center>
      <Abs x={60} y={430} w={960} style={{display: 'flex', gap: 20}}>
        {[{v: '10 à 20', l: 'processus clés', a: 230.8, ic: 'cible'}, {v: '5 à 7', l: 'entretiens par périmètre', a: 234.3, ic: 'bulle'}, {v: 'Terrain', l: 'observer la réalité', a: 238.9, ic: 'yeux'}].map((x, k) => (
          <div key={k} style={{flex: 1, height: 300, borderRadius: 26, background: '#fff', boxShadow: '0 14px 30px rgba(20,33,61,0.15)', borderTop: `10px solid ${ORANGE}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, transform: `scale(${Math.min(1, spring(t, x.a, 8, 13))})`}}>
            <F n={x.ic} size={80} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: ORANGE}}>{x.v}</div>
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: INK, textAlign: 'center', padding: '0 10px'}}>{x.l}</div>
          </div>
        ))}
      </Abs>
      <Cite y={750} at={230.8} text="repères cités dans la vidéo d’origine" />
      <Abs x={60} y={810} w={430} h={440} style={{opacity: pop(t, 241.1)}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: 26, background: '#FDECEC', border: `5px solid ${RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14}}>
          <F n="parchemin" size={120} />
          <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: RED, textAlign: 'center'}}>procédures<br />théoriques<div style={{position: 'absolute', left: -10, right: -10, top: '50%', height: 8, background: RED, transform: `scaleX(${cross})`, transformOrigin: '0 50%'}} /></div>
          <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 24, color: DIM}}>que personne n’applique</div>
        </div>
      </Abs>
      <Deep src="induction/briefing-atelier.jpg" x={530} y={810} w={490} h={440} at={247.0}>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 14, background: 'linear-gradient(0deg, rgba(20,33,61,0.8), transparent)', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff', textAlign: 'center'}}>observation directe ✓</div>
      </Deep>
    </Out>
  );
};
const DeuxChemins: React.FC = () => {
  const t = useT();
  const fork = prog(t, 252.6, 253.8, easeInOut);
  const tilt = (t > 275.9 ? 0 : t > 263.6 ? -6 : t > 253.4 ? 6 : 0) * pop(t, 253.4);
  return (
    <Out end={277.5}>
      <Center y={320}><Kin text="Deux chemins s’offrent à vous" at={251.4} size={56} color={ORANGE} /></Center>
      <svg style={{position: 'absolute', left: 0, top: 0}} width={1080} height={1920}>
        <path d="M540 1340 L540 1180 C540 1100, 300 1080, 280 980" fill="none" stroke="#DDE3EC" strokeWidth={50} strokeLinecap="round" strokeDasharray={700} strokeDashoffset={700 * (1 - fork)} />
        <path d="M540 1180 C540 1100, 780 1080, 800 980" fill="none" stroke="#DDE3EC" strokeWidth={50} strokeLinecap="round" strokeDasharray={500} strokeDashoffset={500 * (1 - fork)} />
      </svg>
      <Card x={50} y={430} w={470} h={520} at={253.4} c={BLUE}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: BLUE}}>Macro d’abord</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20, fontFamily: sansFont, fontWeight: 800, fontSize: 28}}>
          <div style={{color: GREEN, opacity: pop(t, 254.8)}}>✓ vision claire</div>
          <div style={{color: GREEN, opacity: pop(t, 257.3)}}>✓ direction embarquée</div>
          <div style={{color: RED, opacity: pop(t, 260.7)}}>✕ risque d’angles morts</div>
        </div>
        <div style={{marginTop: 20, opacity: pop(t, 254.0)}}><F n="telescope" size={110} /></div>
      </Card>
      <Card x={560} y={430} w={470} h={520} at={264.5} c={GREEN}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: GREEN}}>Terrain d’abord</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20, fontFamily: sansFont, fontWeight: 800, fontSize: 28}}>
          <div style={{color: GREEN, opacity: pop(t, 265.8)}}>✓ réalisme sans faille</div>
          <div style={{color: GREEN, opacity: pop(t, 267.2)}}>✓ appropriation</div>
          <div style={{color: RED, opacity: pop(t, 271.2)}}>✕ +30 à 60 jours possibles</div>
        </div>
        <div style={{marginTop: 20, opacity: pop(t, 265.0)}}><F n="chantier" size={110} /></div>
      </Card>
      <Cite y={970} at={271.2} text="délai cité dans la vidéo d’origine" />
      <Abs x={390} y={1040} w={300} style={{textAlign: 'center', opacity: pop(t, 275.9), transform: `rotate(${tilt}deg)`}}>
        <F n="balance" size={160} />
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK}}>le juste milieu</div>
      </Abs>
    </Out>
  );
};
const Proprietaire: React.FC = () => {
  const t = useT();
  const ring = prog(t, 292.0, 293.6, easeOut);
  return (
    <Out end={302.3}>
      <Center y={320}><Kin text="La règle d’or" at={279.1} size={62} color={GOLD} /></Center>
      <Deep src="induction/technicien-hse.jpg" x={290} y={420} w={500} h={500} at={281.7} round={250} pos="45% 30%" />
      <Abs x={470} y={360} style={{transform: `translateY(${(1 - Math.min(1, spring(t, 283.7, 8, 12))) * -300}px) rotate(-8deg)`, opacity: t > 283.6 ? 1 : 0}}><F n="couronne" size={150} /></Abs>
      <Center y={950}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: INK, opacity: pop(t, 281.8)}}>1 seul propriétaire par processus</div></Center>
      <Abs x={60} y={1050} w={460} style={{textAlign: 'center', opacity: pop(t, 286.2)}}>
        <div style={{display: 'flex', justifyContent: 'center'}}>{[0, 1, 2].map((k) => <div key={k} style={{transform: `rotate(${(k - 1) * 20}deg)`, margin: '0 -10px'}}><F n="main-levee" size={90} /></div>)}</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: RED}}>coresponsabilité = ambiguïté</div>
      </Abs>
      <Abs x={560} y={1030} w={460} h={240} style={{opacity: pop(t, 292.0)}}>
        <svg width={240} height={240} viewBox="0 0 240 240" style={{position: 'absolute', left: 0, top: 0}}>
          <circle cx={120} cy={120} r={95} fill="#fff" stroke="#E6EAF1" strokeWidth={22} />
          <circle cx={120} cy={120} r={95} fill="none" stroke={GREEN} strokeWidth={22} strokeDasharray={`${ring * 597} 597`} transform="rotate(-90 120 120)" strokeLinecap="round" />
          <text x={120} y={135} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={46} fill={GREEN}>{Math.round(ring * 100)} %</text>
        </svg>
        <div style={{position: 'absolute', left: 250, top: 60, fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>en moins<br />d’un mois</div>
      </Abs>
      <Cite y={1280} at={292.0} text="objectif cité dans la vidéo d’origine" />
      <Abs x={0} y={1330} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, opacity: pop(t, 298.4)}}>
        <div style={{transform: `rotate(${(t - 298.4) * 90}deg)`}}><F n="repeter" size={90} /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: TEAL}}>lié au cycle d’amélioration continue</div>
      </Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 4 — Mesurer ═════════════ */
const Ordre: React.FC = () => {
  const t = useT();
  const bad = prog(t, 311.8, 312.5);
  return (
    <Out end={314.4}>
      <Center y={340}><Kin text="D’abord identifier, ensuite mesurer" at={306.9} size={54} color={RED} /></Center>
      <Abs x={60} y={480} w={960} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>
        <Pill at={308.3} c={VIO} size={44}>① processus</Pill>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, opacity: pop(t, 309.4)}}>→</div>
        <Pill at={310.0} c={BLUE} size={44}>② indicateurs</Pill>
      </Abs>
      <Abs x={0} y={640} w={1080} h={600} style={{opacity: bad}}>
        {Array.from({length: 18}, (_, k) => {
          const a = t * (1 + random(`c${k}`)) + k;
          return <div key={k} style={{position: 'absolute', left: 540 + Math.cos(a) * (120 + k * 14) - 40, top: 300 + Math.sin(a * 1.2) * (80 + k * 8) - 30, transform: `rotate(${a * 60}deg)`}}><F n={['graphique', 'question', 'bug'][k % 3]} size={70} /></div>;
        })}
      </Abs>
      <Stamp at={312.9} c={RED} text="sinon : le chaos" x={270} y={1260} rot={-5} size={54} />
    </Out>
  );
};
const Contextes: React.FC = () => {
  const t = useT();
  const C = [
    {l: 'Certification initiale', v: '10 à 15 processus clés', a: 318.5, c: BLUE, ph: 'induction/reunion-audit.jpg'},
    {l: 'Fusion d’entités', v: '2 référentiels → 1 · 90 jours max', a: 325.6, c: VIO, ph: 'iso26/direction-equipe.jpg'},
    {l: 'Performance SST', v: '5 indicateurs de prévention · données > 99 %', a: 335.1, c: GREEN, ph: 'promo/terrain-controle.jpg'},
  ];
  return (
    <Out end={344.2}>
      <Center y={320}><Kin text="Trois contextes concrets" at={314.5} size={58} color={RED} /></Center>
      {C.map((c, k) => (
        <Card key={k} x={60} y={430 + k * 290} w={960} h={260} at={c.a} c={c.c} style={{padding: 0, overflow: 'hidden', display: 'flex'}}>
          <div style={{width: 300, height: '100%', overflow: 'hidden'}}><Img src={PH(c.ph)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
          <div style={{flex: 1, padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: c.c}}>{c.l}</div>
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: INK}}>{c.v}</div>
          </div>
        </Card>
      ))}
      <Cite y={1310} at={318.5} text="repères cités dans la vidéo d’origine" />
    </Out>
  );
};
const Pieges: React.FC = () => {
  const t = useT();
  const P = [{l: 'Confondre organigramme et processus', a: 350.0}, {l: 'Trop découper → illisible', a: 354.1}, {l: 'Oublier les interfaces', a: 357.9}, {l: 'Pas de propriétaires clairs', a: 361.9}, {l: 'Indicateurs déconnectés des buts', a: 363.8}];
  return (
    <Out end={369.0}>
      <Center y={320}><Kin text="Les pièges classiques" at={346.1} size={60} color={RED} /></Center>
      {P.map((p, k) => {
        const d = Math.min(1, spring(t, p.a, 9, 14));
        return (
          <Abs key={k} x={80} y={440 + k * 160} w={920} h={130} style={{transform: `translateY(${(1 - Math.max(0, d)) * -500}px) rotate(${(k % 2 ? 1 : -1) * 1.5}deg)`, opacity: t >= p.a ? 1 : 0}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: 22, background: '#fff', boxShadow: '0 14px 30px rgba(20,33,61,0.15)', display: 'flex', alignItems: 'center', gap: 22, padding: '0 26px'}}>
              <div style={{width: 76, height: 76, borderRadius: 38, background: RED, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 46}}>✕</div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK}}>{p.l}</div>
            </div>
          </Abs>
        );
      })}
      <Stamp at={366.6} c={RED} text="valeur détruite" x={320} y={1240} rot={-6} size={56} />
    </Out>
  );
};

/* ═════════════ PARTIE 5 — Excellence ═════════════ */
const Revision: React.FC = () => {
  const t = useT();
  const R = [{v: '12 mois', l: 'revue annuelle', a: 383.2, ic: 'calendrier', c: BLUE}, {v: 'Immédiat', l: 'si la charge varie de + de 30 %', a: 386.2, ic: 'eclair', c: RED}, {v: '60 jours', l: 'changement stratégique ou réglementaire', a: 389.6, ic: 'juge', c: VIO}, {v: '2 trimestres', l: 'objectifs non atteints de suite', a: 394.7, ic: 'baisse', c: ORANGE}];
  return (
    <Out end={401.4}>
      <Center y={320}><Kin text="Le vrai travail commence" at={376.4} size={58} color={GREEN} /></Center>
      <Center y={400}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: DIM, opacity: pop(t, 380.3)}}>les déclencheurs de révision</div></Center>
      <Abs x={60} y={480} w={960} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22}}>
        {R.map((r, k) => (
          <div key={k} style={{height: 340, borderRadius: 26, background: '#fff', boxShadow: '0 14px 30px rgba(20,33,61,0.15)', borderTop: `10px solid ${r.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 20, boxSizing: 'border-box', transform: `scale(${Math.min(1, spring(t, r.a, 8, 13))}) rotate(${t > r.a && t < r.a + 0.6 ? Math.sin((t - r.a) * 40) * 4 : 0}deg)`}}>
            <F n={r.ic} size={90} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: r.c}}>{r.v}</div>
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: INK, textAlign: 'center'}}>{r.l}</div>
          </div>
        ))}
      </Abs>
      <Cite y={1220} at={383.2} text="délais cités dans la vidéo d’origine" />
    </Out>
  );
};
const Coeur: React.FC = () => {
  const t = useT();
  const beat = t > 408.9 ? Math.max(0, Math.sin((t - 408.9) * 7)) ** 8 : 0;
  const pts = Array.from({length: 60}, (_, k) => {
    const x = k * 16;
    const ph = (k + Math.floor((t - 408.9) * 30)) % 20;
    const y = t > 408.9 ? (ph === 8 ? -90 : ph === 9 ? 70 : ph === 10 ? -30 : 0) : 0;
    return `${x},${100 + y}`;
  }).join(' ');
  return (
    <Out end={415.9}>
      <Center y={320}><Kin text="Vitrine… ou cœur battant ?" at={401.5} size={58} /></Center>
      <Abs x={60} y={430} w={460} h={460} style={{opacity: pop(t, 405.4) * (1 - prog(t, 408.0, 408.9) * 0.6)}}>
        <Deep src="iso26/direction-equipe.jpg" x={0} y={0} w={460} h={460} at={405.4} filter="grayscale(0.7)" />
        <div style={{position: 'absolute', left: 0, right: 0, bottom: -60, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM}}>belle vitrine pour l’audit</div>
      </Abs>
      <Abs x={560} y={430} w={460} h={460} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 408.0)}}>
        <div style={{transform: `scale(${1 + beat * 0.18})`}}><F n="coeur" size={300} /></div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: -60, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: RED}}>cœur du management</div>
      </Abs>
      <Abs x={60} y={1000} w={960} h={200} style={{opacity: pop(t, 408.9)}}>
        <svg width={960} height={200}><polyline points={pts} fill="none" stroke={RED} strokeWidth={8} strokeLinejoin="round" /></svg>
      </Abs>
      <Abs x={0} y={1230} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14, alignItems: 'center', flexWrap: 'wrap'}}>
        <Pill at={410.8} c={VIO} size={28}>identification rigoureuse</Pill><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, opacity: pop(t, 412.1)}}>+</div><Pill at={412.2} c={BLUE} size={28}>pilotage par la donnée</Pill>
      </Abs>
      <Abs x={0} y={1320} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={414.0} c={GREEN} size={36}>= excellence opérationnelle</Pill></Abs>
    </Out>
  );
};
const Avenir: React.FC = () => {
  const t = useT();
  return (
    <Out end={OUTRO_AT}>
      <Deep src="promo/terrain-controle.jpg" x={60} y={330} w={960} h={600} at={416.0} />
      <Abs x={60} y={980} w={960} style={{textAlign: 'center'}}>
        <Kin text="La maîtrise de vos processus" at={419.1} size={56} />
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: TEAL, opacity: pop(t, 421.3), transform: `scale(${0.8 + 0.2 * Math.min(1, spring(t, 421.3, 7, 12))})`}}>= votre avenir</div>
      </Abs>
      <Abs x={0} y={1260} w={1080}><MetroLine x={100} y={0} w={880} big /></Abs>
      {t > 421.3 && <Dust n={20} c={TEAL} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...PARTS.flatMap((p) => [{at: p.at, s: 'sfx/whoosh', v: 0.45}, {at: p.at + 0.45, s: 'bass-hit', v: 0.35}, {at: p.at + 2.4, s: 'sfx/swish', v: 0.4}]),
  // intro
  {at: 5.3, s: 'sfx/pop', v: 0.2}, {at: 7.7, s: 'sfx/pop', v: 0.2}, {at: 12.3, s: 'sfx/pop', v: 0.2}, {at: 13.7, s: 'tampon', v: 0.5}, {at: 13.8, s: 'deep-hit', v: 0.35},
  {at: 15.0, s: 'soft-whoosh', v: 0.35}, {at: 18.9, s: 'sfx/rise', v: 0.3}, {at: 20.5, s: 'sfx/whoosh', v: 0.3},
  // interfaces
  ...rep(26.2, 10, 0.1, 'tick', 0.15), {at: 27.3, s: 'bass-hit', v: 0.4}, {at: 31.0, s: 'tension', v: 0.25, dur: 3}, {at: 38.4, s: 'sfx/ding', v: 0.2}, {at: 40.2, s: 'tampon', v: 0.45},
  {at: 43.6, s: 'sfx/swish', v: 0.35}, {at: 45.1, s: 'sfx/thud', v: 0.4}, {at: 47.9, s: 'sfx/rise', v: 0.25}, {at: 48.7, s: 'sfx/ding', v: 0.3},
  // programme
  ...[52.3, 54.9, 57.4, 59.7, 61.9].map((a) => ({at: a, s: 'sfx/ding', v: 0.25})), {at: 65.6, s: 'sfx/whoosh', v: 0.35},
  // partie 1
  {at: 71.5, s: 'soft-whoosh', v: 0.4}, {at: 74.0, s: 'sfx/pop', v: 0.3}, {at: 75.7, s: 'sfx/pop', v: 0.3}, {at: 77.0, s: 'stylo', v: 0.35}, {at: 79.6, s: 'sfx/swish', v: 0.3}, {at: 85.8, s: 'sfx/swish', v: 0.3},
  {at: 88.2, s: 'soft-whoosh', v: 0.35}, {at: 94.7, s: 'sfx/pop', v: 0.25}, {at: 96.1, s: 'sfx/pop', v: 0.25}, {at: 97.7, s: 'sfx/pop', v: 0.25},
  // partie 2
  {at: 110.2, s: 'tension', v: 0.2, dur: 2.5}, {at: 113.0, s: 'sfx/swish', v: 0.3}, {at: 113.8, s: 'sfx/whoosh', v: 0.3}, {at: 119.2, s: 'sfx/click', v: 0.2}, {at: 120.6, s: 'sfx/ding', v: 0.2}, {at: 125.9, s: 'sfx/whoosh', v: 0.3},
  ...rep(127.4, 3, 0.4, 'sfx/click', 0.2), ...rep(131.2, 3, 0.25, 'page', 0.3), {at: 137.2, s: 'sfx/swish', v: 0.3},
  {at: 148.6, s: 'sfx/rise', v: 0.25}, {at: 154.2, s: 'sfx/pop', v: 0.25}, {at: 157.8, s: 'sfx/pop', v: 0.25}, {at: 162.7, s: 'tension', v: 0.25, dur: 2.5}, {at: 165.0, s: 'tampon', v: 0.45},
  {at: 172.6, s: 'bass-hit', v: 0.4}, ...rep(177.0, 6, 0.15, 'sfx/pop', 0.15), ...rep(181.6, 16, 0.08, 'sfx/click', 0.12), {at: 186.7, s: 'sfx/whoosh', v: 0.3}, {at: 193.7, s: 'validation', v: 0.3},
  // partie 3
  ...STEPS.map((st) => ({at: st.a, s: 'sfx/thud', v: 0.3})), {at: 222.9, s: 'sfx/ding', v: 0.3},
  {at: 230.8, s: 'sfx/pop', v: 0.3}, {at: 234.3, s: 'sfx/pop', v: 0.3}, {at: 238.9, s: 'sfx/pop', v: 0.3}, {at: 241.1, s: 'sfx/thud', v: 0.3}, {at: 246.9, s: 'sfx/swish', v: 0.3}, {at: 247.0, s: 'validation', v: 0.25},
  {at: 252.6, s: 'soft-whoosh', v: 0.35}, {at: 253.4, s: 'sfx/pop', v: 0.25}, {at: 264.5, s: 'sfx/pop', v: 0.25}, {at: 260.7, s: 'sfx/thud', v: 0.2}, {at: 271.2, s: 'sfx/thud', v: 0.2}, {at: 275.9, s: 'sfx/ding', v: 0.3},
  {at: 281.7, s: 'soft-whoosh', v: 0.35}, {at: 283.7, s: 'sfx/rise', v: 0.3}, {at: 284.4, s: 'sfx/ding', v: 0.3}, {at: 286.2, s: 'tension', v: 0.2, dur: 2}, {at: 292.0, s: 'sfx/rise', v: 0.25}, {at: 293.6, s: 'validation', v: 0.3}, {at: 298.4, s: 'sfx/whoosh', v: 0.25},
  // partie 4
  {at: 308.3, s: 'sfx/pop', v: 0.3}, {at: 310.0, s: 'sfx/pop', v: 0.3}, {at: 311.8, s: 'tension', v: 0.25, dur: 2}, {at: 312.9, s: 'tampon', v: 0.45},
  {at: 318.5, s: 'sfx/whoosh', v: 0.3}, {at: 325.6, s: 'sfx/whoosh', v: 0.3}, {at: 328.8, s: 'sfx/thud', v: 0.25}, {at: 335.1, s: 'sfx/whoosh', v: 0.3},
  ...[350.0, 354.1, 357.9, 361.9, 363.8].map((a) => ({at: a, s: 'sfx/thud', v: 0.35})), {at: 366.6, s: 'tampon', v: 0.5},
  // partie 5
  {at: 376.4, s: 'sfx/rise', v: 0.25}, ...[383.2, 386.2, 389.6, 394.7].map((a) => ({at: a, s: 'sfx/ding', v: 0.3})), {at: 386.3, s: 'sfx/whoosh', v: 0.25},
  {at: 405.4, s: 'soft-whoosh', v: 0.3}, ...rep(408.9, 9, 0.9, 'sfx/thud', 0.22), {at: 414.0, s: 'validation', v: 0.35},
  {at: 416.0, s: 'soft-whoosh', v: 0.35}, {at: 421.3, s: 'bass-hit', v: 0.4},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const IdProc: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={14.7}><Etagere /></Gate>
    <Gate from={14.5} to={23.2}><Moteur /></Gate>
    <Gate from={23.1} to={42.8}><Interfaces /></Gate>
    <Gate from={42.7} to={50.3}><Relais /></Gate>
    <Gate from={50.2} to={66.9}><Programme /></Gate>
    <Gate from={69.4} to={77.0}><Vitrine /></Gate>
    <Gate from={76.9} to={88.2}><Langage /></Gate>
    <Gate from={88.1} to={102.6}><Vivant /></Gate>
    <Gate from={105.3} to={113.9}><Confusion /></Gate>
    <Gate from={113.8} to={144.1}><ProcVsProc /></Gate>
    <Gate from={144.0} to={169.8}><Donut /></Gate>
    <Gate from={169.7} to={195.7}><Indicateurs /></Gate>
    <Gate from={198.4} to={225.5}><Escalier /></Gate>
    <Gate from={225.4} to={251.4}><Sobriete /></Gate>
    <Gate from={251.3} to={277.6}><DeuxChemins /></Gate>
    <Gate from={277.5} to={302.4}><Proprietaire /></Gate>
    <Gate from={305.1} to={314.5}><Ordre /></Gate>
    <Gate from={314.4} to={344.3}><Contextes /></Gate>
    <Gate from={344.2} to={369.1}><Pieges /></Gate>
    <Gate from={371.8} to={401.5}><Revision /></Gate>
    <Gate from={401.4} to={416.0}><Coeur /></Gate>
    <Gate from={415.9} to={OUTRO_AT}><Avenir /></Gate>
    {PARTS.map((p, i) => <Gate key={p.n} from={p.at} to={p.at + 3.1}><Baton i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={423.3}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-identifier-processus-origine.m4a')} trimAfter={s(423.4)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

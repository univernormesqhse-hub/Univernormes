import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {Blinds, Board, Card, Center, Cite, Deep, Dust, Flap, Kin, Out, Pill, Stamp, Tile, Word} from '../durab/Durab';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s, sansFont} from '../theme';
import {Abs, Bg, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, LOGO, PAPER, PH, pop, prog, RED, spring, T, useT} from '../implIso/kit';
import {captions} from './captions';

/**
 * « Accident, incident, quasi-accident » (6 min 08) — capsule « hors normes » : voix d'origine, sous-titres recalés mot
 * à mot, photos réelles, thème « papier quadrillé ».
 * Fil rouge inédit : LE SISMOGRAPHE DE LA GRAVITÉ. Dans l'en-tête, une aiguille trace en continu un sismogramme dont
 * l'amplitude suit la gravité du sujet (calme pour le quasi-accident, secousses pour l'incident, séisme pour l'accident,
 * pics d'adrénaline pour le choc) et un sélecteur QUASI-ACCIDENT · INCIDENT · ACCIDENT s'allume en conséquence.
 * Transition inédite : LE REMBOBINAGE — l'image se brouille de lignes de défilement comme une cassette qu'on rembobine
 * (« et si… ? »), puis s'ouvre sur le panneau de partie.
 * Reprend le meilleur de la série : tuiles en bois, palettes d'affichage, poupées gigognes (mise en abyme), store
 * vénitien, photos en profondeur 3D, vitre qui se fissure, tampons, écran partagé, cartes, poussière, cinétique.
 */
const QA = '#14A37F';
const IN = '#F0A000';
const AC = '#D7263D';
const GOLD = '#F5B700';
const BLUE = '#1F6FD1';
const OUTRO_AT = 365.3;
export const ACCINC_FRAMES = s(OUTRO_AT + 3.8);
const PARTS = [
  {at: 55.9, n: '1', title: 'Accident & incident : les fondations', c: AC},
  {at: 165.8, n: '2', title: 'Le quasi-accident', c: QA},
  {at: 230.5, n: '3', title: 'L’exemple du stop', c: IN},
  {at: 296.6, n: '4', title: 'Le signalement', c: BLUE},
];
/* gravité : 0 calme · 1 quasi · 2 incident · 3 accident · 4 choc */
const SEV: [number, number][] = [[0, 2], [56, 2], [66.3, 3], [91.7, 2], [118.9, 2], [124.6, 3], [127.6, 2], [143.9, 3], [149.4, 2], [160, 0], [165.8, 1], [206.2, 4], [230.5, 1], [245.9, 3], [251.6, 1], [257.4, 4], [263.9, 1], [288.8, 3], [296.6, 1], [331.9, 2], [348.6, 1]];
const sevAt = (t: number) => SEV.reduce((k, x) => (t >= x[0] ? x[1] : k), 0);
const CAT = [{l: 'QUASI-ACCIDENT', c: QA, s: 1}, {l: 'INCIDENT', c: IN, s: 2}, {l: 'ACCIDENT', c: AC, s: 3}];
const partIdx = (t: number) => PARTS.reduce((k, p, i) => (t >= p.at ? i : k), -1);

/* ═════════════ Fil rouge : sismographe ═════════════ */
const ampOf = (sv: number) => [3, 8, 18, 34, 26][sv];
const Sismo: React.FC<{w: number; h: number}> = ({w, h}) => {
  const t = useT();
  const N = 90;
  const pts = Array.from({length: N}, (_, k) => {
    const tt = t - (N - k) * 0.045;
    const sv = sevAt(tt);
    const a = ampOf(sv);
    const spike = sv === 4 && Math.floor(tt * 3) % 2 === 0 && random(`sp${Math.floor(tt * 6)}`) > 0.6 ? 1.6 : 1;
    const y = h / 2 + Math.sin(tt * 37) * a * 0.5 * spike + (random(`n${Math.floor(tt * 22)}`) - 0.5) * a * spike;
    return `${(k / (N - 1)) * w},${Math.max(2, Math.min(h - 2, y))}`;
  }).join(' ');
  const col = [DIM, QA, IN, AC, AC][sevAt(t)];
  return (
    <svg width={w} height={h} style={{display: 'block'}}>
      {[0.25, 0.5, 0.75].map((f) => <line key={f} x1={0} x2={w} y1={h * f} y2={h * f} stroke="#E6EAF1" strokeWidth={2} />)}
      <polyline points={pts} fill="none" stroke={col} strokeWidth={4} strokeLinejoin="round" />
      <circle cx={w} cy={h / 2} r={6} fill={col} />
    </svg>
  );
};
const Header: React.FC = () => {
  const t = useT();
  const sv = sevAt(t);
  const pi = partIdx(t);
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 56, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div>
      {t > 2.6 && t < OUTRO_AT && (
        <div style={{position: 'absolute', left: 36, right: 36, top: 184, height: 92, borderRadius: 24, background: '#ffffffEC', boxShadow: '0 8px 20px rgba(20,33,61,0.1)', display: 'flex', alignItems: 'center', gap: 14, padding: '0 18px', opacity: pop(t, 2.6)}}>
          <div style={{width: 300, height: 64, borderRadius: 12, overflow: 'hidden', background: '#FAFBFD', border: '2px solid #E6EAF1'}}><Sismo w={300} h={64} /></div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 4, flex: 1}}>
            <div style={{display: 'flex', gap: 6}}>
              {CAT.map((c, i) => {
                const on = sv === c.s || (sv === 4 && c.s === 1);
                return <div key={i} style={{flex: 1, textAlign: 'center', padding: '6px 0', borderRadius: 10, background: on ? c.c : `${c.c}1A`, color: on ? '#fff' : c.c, fontFamily: sansFont, fontWeight: 900, fontSize: 16, transform: `scale(${on ? 1.05 : 1})`}}>{c.l}</div>;
              })}
            </div>
            <div style={{display: 'flex', gap: 6, justifyContent: 'flex-end'}}>{PARTS.map((p, i) => <div key={i} style={{width: i === pi ? 40 : 18, height: 9, borderRadius: 5, background: i <= pi ? p.c : '#DDE3EC'}} />)}</div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
/** Le rembobinage. */
const Rewind: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const p = PARTS[i];
  const k = t - p.at;
  if (k < 0 || k > 3.7) return null;
  const noise = prog(t, p.at, p.at + 0.25) * (1 - prog(t, p.at + 0.9, p.at + 1.2));
  const panel = prog(t, p.at + 0.7, p.at + 1.1, easeOut) * (1 - prog(t, p.at + 3.1, p.at + 3.6, easeIn));
  return (
    <AbsoluteFill style={{zIndex: 35}}>
      {noise > 0 && (
        <AbsoluteFill style={{background: `rgba(244,241,232,${0.6 * noise})`}}>
          {Array.from({length: 14}, (_, j) => {
            const y = ((j * 160 - k * 2600) % 1920 + 1920) % 1920;
            return <div key={j} style={{position: 'absolute', left: 0, right: 0, top: y, height: 18 + (j % 3) * 10, background: `rgba(20,33,61,${0.08 + (j % 2) * 0.06})`, transform: `translateX(${Math.sin(j + k * 30) * 30}px)`}} />;
          })}
          <div style={{position: 'absolute', left: 0, right: 0, top: 840, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 160, color: INK, opacity: noise}}>⏪</div>
        </AbsoluteFill>
      )}
      {panel > 0 && (
        <AbsoluteFill style={{background: p.c, clipPath: `inset(${(1 - panel) * 50}% 0 ${(1 - panel) * 50}% 0)`}}>
          <Abs x={0} y={540} w={1080}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 40, letterSpacing: 8, color: '#ffffffCC', textAlign: 'center'}}>PARTIE</div></Abs>
          <Abs x={0} y={620} w={1080}><Board text={p.n} at={p.at + 0.8} h={260} gap={14} c={p.c} n={10} /></Abs>
          <Abs x={70} y={940} w={940} style={{textAlign: 'center'}}><Kin text={p.title} at={p.at + 1.2} size={70} color="#fff" /></Abs>
          {[0, 1, 2, 3].map((j) => <div key={j} style={{position: 'absolute', left: 0, right: 0, top: 1300 + j * 26, height: 8, background: '#ffffff33'}} />)}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('incident/chute-entrepot.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 860, objectFit: 'cover', objectPosition: '45% 50%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 41%, ${PAPER} 45%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={50} y={730} w={980} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>LE VOCABULAIRE QUI SAUVE DES VIES</div>
        <T size={96} color={AC} style={{marginTop: 20, textTransform: 'uppercase', letterSpacing: -3}}>Accident</T>
        <T size={96} color={IN} style={{textTransform: 'uppercase', letterSpacing: -3}}>Incident</T>
        <T size={96} style={{textTransform: 'uppercase', letterSpacing: -3}}><span style={{background: QA, color: '#fff', padding: '0 20px', borderRadius: 18}}>Quasi-accident</span></T>
      </Abs>
      <Abs x={0} y={1280} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 10}}>{'≠ ≠'.split('').map((c, i) => (c === ' ' ? <div key={i} style={{width: 40}} /> : <Flap key={i} ch={c} at={-9} h={110} c={INK} />))}</Abs>
      <Abs x={140} y={1420} w={800} h={90} style={{borderRadius: 16, background: '#fff', overflow: 'hidden', border: '2px solid #E6EAF1'}}>
        <svg width={800} height={90}><polyline points={Array.from({length: 80}, (_, k) => `${k * 10.1},${45 + Math.sin(k * 1.7) * (k > 50 ? 34 : k > 30 ? 14 : 4)}`).join(' ')} fill="none" stroke={AC} strokeWidth={4} /></svg>
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO ═════════════ */
const Synonymes: React.FC = () => {
  const t = useT();
  const crack = prog(t, 8.6, 9.2, easeOut);
  return (
    <Out end={10.4}>
      <Abs x={0} y={360} w={1080}><Word text="ACCIDENT" at={0.1} size={100} c={AC} variant={0} /></Abs>
      <Abs x={0} y={600} w={1080}><Word text="INCIDENT" at={0.8} size={100} c={IN} variant={1} /></Abs>
      <Abs x={0} y={840} w={1080}><Word text="QUASI" at={1.3} size={100} c={QA} variant={2} /></Abs>
      {[490, 730].map((y, k) => (
        <Abs key={k} x={0} y={y} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: crack > 0.5 ? RED : DIM, opacity: pop(t, 3.6)}}>
          {crack > 0.5 ? '≠' : '='}
        </Abs>
      ))}
      <Center y={1000}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: DIM, opacity: pop(t, 3.6)}}>de simples synonymes ?</div></Center>
      <Stamp at={8.7} c={RED} text="la réalité est tout autre" x={150} y={1120} rot={-5} size={44} />
    </Out>
  );
};
const Danger: React.FC = () => {
  const t = useT();
  const needle = t < 20.2 ? lerp(-60, -75, prog(t, 18.2, 19.2)) : lerp(-75, 75, prog(t, 20.2, 21.2, easeInOut));
  const blur = 1 - prog(t, 25.2, 27.8, easeInOut);
  return (
    <Out end={36.6}>
      <Center y={320}><Kin text="Une confusion carrément dangereuse" at={10.5} size={48} color={RED} /></Center>
      <Abs x={290} y={440} w={500} h={300} style={{opacity: pop(t, 17.1)}}>
        <svg width={500} height={300} viewBox="0 0 500 300">
          <path d="M40 270 A210 210 0 0 1 460 270" fill="none" stroke="url(#g)" strokeWidth={40} />
          <defs><linearGradient id="g"><stop offset="0" stopColor={QA} /><stop offset="0.5" stopColor={IN} /><stop offset="1" stopColor={AC} /></linearGradient></defs>
          <line x1={250} y1={270} x2={250 + Math.sin((needle * Math.PI) / 180) * 180} y2={270 - Math.cos((needle * Math.PI) / 180) * 180} stroke={INK} strokeWidth={12} strokeLinecap="round" />
          <circle cx={250} cy={270} r={20} fill={INK} />
        </svg>
      </Abs>
      <Abs x={60} y={760} w={960} style={{display: 'flex', justifyContent: 'space-between'}}><Pill at={18.2} c={QA} size={28}>minimiser une situation critique</Pill><Pill at={20.2} c={AC} size={28}>panique totale</Pill></Abs>
      <Center y={900}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: BLUE, filter: `blur(${blur * 14}px)`, opacity: pop(t, 24.1)}}>des concepts limpides</div></Center>
      <Abs x={0} y={1030} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={24.1} c={INK} size={28}>structurer</Pill><Pill at={25.2} c={INK} size={28}>dissiper le flou</Pill></Abs>
      {t > 34.4 && <Center y={1140}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: INK, transform: `scale(${Math.min(1, spring(t, 35.4, 7, 12))})`}}>l’action.</div></Center>}
    </Out>
  );
};
const Dominos: React.FC = () => {
  const t = useT();
  return (
    <Out end={55.9}>
      <Center y={320}><Kin text="Mots précis = actions précises" at={36.9} size={54} /></Center>
      <Abs x={0} y={440} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 30, alignItems: 'center', opacity: pop(t, 39.5)}}>
        <div style={{transform: `rotate(${t > 39.5 && t < 41 ? Math.sin(t * 20) * 8 : 0}deg)`}}><F n="clipboard" size={120} /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: RED}}>mal classé → réaction à côté de la plaque</div>
      </Abs>
      <Abs x={60} y={680} w={960} h={320}>
        {Array.from({length: 9}, (_, k) => {
          const fall = prog(t, 48.9 + k * 0.18, 49.3 + k * 0.18, easeIn);
          return <div key={k} style={{position: 'absolute', left: 40 + k * 100, top: 40, width: 46, height: 220, borderRadius: 10, background: [AC, IN, QA][k % 3], transformOrigin: '50% 100%', transform: `rotate(${fall * 72}deg)`, boxShadow: '0 10px 20px rgba(20,33,61,0.2)', opacity: pop(t, 47.0 + k * 0.05)}}>
            <div style={{position: 'absolute', left: 12, top: 30, width: 22, height: 22, borderRadius: 11, background: '#fff'}} /><div style={{position: 'absolute', left: 12, top: 150, width: 22, height: 22, borderRadius: 11, background: '#fff'}} />
          </div>;
        })}
      </Abs>
      <Center y={1020}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK, opacity: pop(t, 48.9)}}>une chaîne de conséquences</div></Center>
      {t > 52.9 && <Abs x={0} y={1110} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, opacity: pop(t, 53.7)}}><F n="coeur" size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: AC}}>sauver des vies</div></Abs>}
    </Out>
  );
};

/* ═════════════ PARTIE 1 ═════════════ */
const Accident: React.FC = () => {
  const t = useT();
  const crack = prog(t, 81.6, 81.9, easeOut);
  const C = [{l: 'dommages matériels', ic: 'bris', a: 72.3}, {l: 'blessures', ic: 'pansement', a: 73.4}, {l: 'préjudices', ic: 'juge', a: 74.2}];
  return (
    <Out end={91.7}>
      <Abs x={0} y={320} w={1080}><Word text="ACCIDENT" at={66.4} size={104} c={AC} variant={0} /></Abs>
      <Center y={470}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: DIM, opacity: pop(t, 67.5)}}>événement involontaire + <span style={{color: AC, fontWeight: 900}}>condition absolue :</span></div></Center>
      <Abs x={60} y={540} w={960} style={{display: 'flex', justifyContent: 'center', gap: 30}}>
        {C.map((c, k) => <div key={k} style={{textAlign: 'center', width: 260, opacity: pop(t, c.a), transform: `translateY(${(1 - pop(t, c.a)) * 40}px)`}}><div style={{width: 130, height: 130, margin: '0 auto', borderRadius: 65, background: '#fff', border: `6px solid ${AC}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={c.ic} size={84} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: AC, marginTop: 8}}>{c.l}</div></div>)}
      </Abs>
      <Blinds src="verites/accident.jpg" x={60} y={790} w={960} h={420} at={78.2} pos="50% 50%">
        <div style={{position: 'absolute', left: 20, top: 20}}><Pill at={78.6} c={AC} size={26}>conséquences tangibles</Pill></div>
        <div style={{position: 'absolute', right: 20, bottom: 20, display: 'flex', gap: 10}}><Pill at={81.6} c={INK} size={24}>vitre brisée</Pill><Pill at={82.5} c={INK} size={24}>jambe cassée</Pill></div>
      </Blinds>
      {crack > 0 && (
        <svg style={{position: 'absolute', left: 0, top: 0, zIndex: 8}} width={1080} height={1920}>
          {Array.from({length: 9}, (_, k) => {
            const a = (k / 9) * Math.PI * 2 + 0.3;
            const len = 380 * crack;
            return <polyline key={k} points={`540,1000 ${540 + Math.cos(a) * len * 0.4 + 14},${1000 + Math.sin(a) * len * 0.4} ${540 + Math.cos(a + 0.1) * len},${1000 + Math.sin(a + 0.1) * len}`} fill="none" stroke="#ffffffDD" strokeWidth={4} />;
          })}
        </svg>
      )}
      <Abs x={0} y={1240} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 12}}><Pill at={86.8} c={AC} size={26}>réel</Pill><Pill at={87.8} c={AC} size={26}>documenté</Pill><Pill at={88.7} c={AC} size={26}>visible</Pill><Pill at={89.2} c={INK} size={26}>sommet de l’échelle</Pill></Abs>
    </Out>
  );
};
const Incident: React.FC = () => {
  const t = useT();
  const jam = t > 107.7 && t < 110 ? 0 : 1;
  return (
    <Out end={118.9}>
      <Abs x={0} y={320} w={1080}><Word text="INCIDENT" at={92.5} size={104} c={IN} variant={1} /></Abs>
      <Center y={470}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: DIM, opacity: pop(t, 98.9)}}>peut très bien <span style={{color: IN, fontWeight: 900}}>ne pas</span> entraîner de dommages</div></Center>
      <Abs x={190} y={540} w={700} h={460}>
        <div style={{position: 'absolute', left: 350 - 330 * pop(t, 102.5, 0.8), top: 230 - 220 * pop(t, 102.5, 0.8), width: 660 * pop(t, 102.5, 0.8), height: 440 * pop(t, 102.5, 0.8), borderRadius: '50%', background: `${IN}22`, border: `6px dashed ${IN}`}} />
        <div style={{position: 'absolute', left: 230, top: 140, transform: `rotate(${t * 40 * jam + (jam ? 0 : Math.sin(t * 40) * 3)}deg)`, opacity: pop(t, 105.9)}}><F n="engrenage" size={140} /></div>
        <div style={{position: 'absolute', left: 340, top: 200, transform: `rotate(${-t * 40 * jam + 15}deg)`, opacity: pop(t, 105.9)}}><F n="engrenage" size={110} /></div>
        {t > 107.6 && Array.from({length: 8}, (_, k) => <div key={k} style={{position: 'absolute', left: 340 + (random(`sa${k}`) - 0.5) * 30, top: 120 + ((t - 107.6) * 160 + k * 18) % 150, width: 8, height: 8, borderRadius: 4, background: '#C9A86A'}} />)}
        <div style={{position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: IN, opacity: pop(t, 107.7)}}>un grain de sable dans l’engrenage</div>
      </Abs>
      <Abs x={0} y={1040} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 12}}><Pill at={105.9} c={IN} size={26}>perturbations</Pill><Pill at={106.7} c={IN} size={26}>anomalies</Pill><Pill at={111.1} c={QA} size={26}>le pire évité</Pill></Abs>
      <Abs x={0} y={1140} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={103.6} c={INK} size={30}>une catégorie beaucoup plus vaste</Pill></Abs>
    </Out>
  );
};
/** Les poupées russes (mise en abyme). */
const Doll: React.FC<{w: number; h: number; c: string; label: string}> = ({w, h, c, label}) => (
  <div style={{position: 'relative', width: w, height: h}}>
    <div style={{position: 'absolute', left: w * 0.18, top: 0, width: w * 0.64, height: h * 0.42, borderRadius: '50% 50% 45% 45%', background: c}} />
    <div style={{position: 'absolute', left: w * 0.28, top: h * 0.08, width: w * 0.44, height: h * 0.26, borderRadius: '50%', background: '#FBE3CF'}} />
    <div style={{position: 'absolute', left: 0, top: h * 0.32, width: w, height: h * 0.68, borderRadius: '45% 45% 30% 30%', background: c}} />
    <div style={{position: 'absolute', left: w * 0.15, right: w * 0.15, top: h * 0.55, padding: '6px 0', borderRadius: 14, background: '#fff', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: w * 0.11, color: c}}>{label}</div>
  </div>
);
const Poupees: React.FC = () => {
  const t = useT();
  const open = prog(t, 129.6, 130.6, easeInOut);
  const machine = t > 135.3;
  return (
    <Out end={143.9}>
      <Center y={320}><Kin text="La règle d’or" at={118.9} size={60} color={GOLD} /></Center>
      <Abs x={60} y={410} w={960} style={{display: 'flex', flexDirection: 'column', gap: 10, opacity: machine ? 0 : 1}}>
        <Pill at={119.0} c={AC} size={28}>tout accident = un incident ✓</Pill>
        <Pill at={122.5} c={IN} size={28}>tout incident ≠ un accident ✕</Pill>
      </Abs>
      {!machine && (
        <Abs x={240} y={580} w={600} h={600} style={{opacity: pop(t, 124.7)}}>
          <div style={{position: 'absolute', left: 300 - 150, top: 40, clipPath: 'inset(48% 0 0 0)'}}><Doll w={300} h={520} c={IN} label="INCIDENT" /></div>
          <div style={{position: 'absolute', left: 300 - 85, top: 250 - open * 60, transform: `scale(${0.4 + open * 0.6})`, transformOrigin: '50% 100%', opacity: open}}><Doll w={170} h={300} c={AC} label="ACCIDENT" /></div>
          <div style={{position: 'absolute', left: 300 - 150 - open * 260, top: 40 - open * 60, transform: `rotate(${-open * 25}deg)`, clipPath: 'inset(0 0 52% 0)', opacity: 1 - open * 0.5}}><Doll w={300} h={520} c={IN} label="INCIDENT" /></div>
        </Abs>
      )}
      {machine && (
        <Deep src="promo/hse-machine.jpg" x={60} y={420} w={960} h={560} at={135.4} pos="45% 30%">
          <div style={{position: 'absolute', left: 30, top: 30, padding: '10px 24px', borderRadius: 12, background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40, opacity: pop(t, 136.0)}}>ARRÊT NET</div>
          <div style={{position: 'absolute', left: 20, right: 20, bottom: 20, display: 'flex', justifyContent: 'space-between'}}><Pill at={137.5} c={IN} size={30}>incident ✓</Pill><Pill at={138.5} c={AC} size={30}>accident ✕</Pill></div>
        </Deep>
      )}
      <Abs x={0} y={1220} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={126.7} c={INK} size={32}>le principe des poupées russes</Pill></Abs>
    </Out>
  );
};
const Frontiere: React.FC = () => {
  const t = useT();
  const line = prog(t, 153.7, 155.0, easeInOut);
  return (
    <Out end={165.8}>
      <Center y={320}><Kin text="Pour résumer" at={144.1} size={60} /></Center>
      <Card x={50} y={430} w={470} h={600} at={145.4} c={AC}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: AC}}>Accident</div>
        <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: INK, marginTop: 20}}>présence <span style={{color: AC}}>obligatoire</span> de dommages ou de blessures</div>
        <div style={{marginTop: 40}}><F n="bris" size={130} /></div>
      </Card>
      <Card x={560} y={430} w={470} h={600} at={150.2} c={IN}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: IN}}>Incident</div>
        <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: INK, marginTop: 20}}>absence <span style={{color: IN}}>potentielle</span> de ces mêmes dommages</div>
        <div style={{marginTop: 40}}><F n="engrenage" size={130} /></div>
      </Card>
      <Abs x={532} y={420} w={16} h={620 * line} style={{background: `repeating-linear-gradient(180deg, ${INK} 0 24px, transparent 24px 38px)`}} />
      <Abs x={0} y={1060} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={153.7} c={INK} size={30}>une frontière purement physique</Pill></Abs>
      <Stamp at={163.7} c={GREEN} text="erreur impossible" x={290} y={1150} rot={-5} size={50} />
    </Out>
  );
};

/* ═════════════ PARTIE 2 ═════════════ */
const Alerte: React.FC = () => {
  const t = useT();
  return (
    <Out end={184.4}>
      <Center y={320}><Kin text="Un véritable système d’alerte" at={168.0} size={54} color={QA} /></Center>
      <Abs x={390} y={420} style={{opacity: pop(t, 168.2)}}>
        <div style={{position: 'absolute', left: 150 - 200, top: 150 - 200, width: 400, height: 400, borderRadius: '50%', background: `conic-gradient(from ${t * 220}deg, ${QA}55, transparent 25%)`}} />
        <F n="gyrophare" size={300} />
      </Abs>
      <Abs x={0} y={800} w={1080}><Word text="QUASI" at={177.1} size={110} c={QA} variant={2} /></Abs>
      <Center y={950}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, opacity: pop(t, 177.6)}}>-accident · « near miss » en anglais</div></Center>
      <Abs x={0} y={1060} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={173.2} c={DIM} size={28}>souvent laissé de côté</Pill><Pill at={175.5} c={QA} size={28}>le plus crucial</Pill></Abs>
      <Abs x={0} y={1170} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: pop(t, 182.3)}}><F n="bouclier" size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: QA}}>empêcher le pire avant qu’il n’arrive</div></Abs>
    </Out>
  );
};
const EtSi: React.FC = () => {
  const t = useT();
  const fall = prog(t, 196.4, 197.5, easeIn);
  const ghost = t > 194.8 && t < 197.6;
  return (
    <Out end={206.2}>
      <Abs x={60} y={320} w={960} style={{display: 'flex', justifyContent: 'center', gap: 14}}>
        {[{l: 'pas de blessure', a: 187.9}, {l: 'pas de casse', a: 188.7}, {l: 'zéro dégât', a: 189.6}].map((x, k) => <Pill key={k} at={x.a} c={QA} size={28}>✓ {x.l}</Pill>)}
      </Abs>
      <Center y={420}><Kin text="…mais il aurait pu en causer" at={192.0} size={50} color={AC} /></Center>
      <Abs x={140} y={520} w={800} h={620} style={{borderRadius: 30, background: '#fff', boxShadow: '0 20px 44px rgba(20,33,61,0.15)', overflow: 'hidden', opacity: pop(t, 193.3)}}>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 60, background: '#DDE3EC'}} />
        <div style={{position: 'absolute', left: 480, top: 0, width: 14, height: 120, background: '#8D96A6'}} />
        <div style={{position: 'absolute', left: 300, top: 360, transform: `translateX(${prog(t, 193.5, 196.0) * 90}px)`}}><F n="ouvrier" size={200} /></div>
        {ghost && <div style={{position: 'absolute', left: 420, top: lerp(110, 400, prog(t, 194.8, 195.6, easeIn)), opacity: 0.35, filter: 'hue-rotate(-40deg) saturate(3)'}}><F n="colis" size={130} /></div>}
        <div style={{position: 'absolute', left: 420, top: lerp(110, 430, fall)}}><F n="colis" size={130} /></div>
        {fall >= 1 && Array.from({length: 8}, (_, k) => { const p = Math.min(1, (t - 197.5) * 2); const a = (k / 8) * Math.PI; return <div key={k} style={{position: 'absolute', left: 485 + Math.cos(a) * p * 120, top: 555 - Math.sin(a) * p * 60, width: 12, height: 12, borderRadius: 6, background: '#B9A27A', opacity: 1 - p}} />; })}
        <div style={{position: 'absolute', left: 20, top: 20, fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: AC, opacity: ghost ? 1 : 0}}>et si… ?</div>
      </Abs>
      <Stamp at={197.6} c={AC} text="à un cheveu" x={340} y={1150} rot={-5} size={50} />
      <Abs x={0} y={1270} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={199.4} c={GOLD} size={28}>la chance</Pill><Pill at={200.6} c={BLUE} size={28}>un réflexe éclair</Pill><Pill at={201.8} c={RED} size={28}>✕ environnement sûr</Pill></Abs>
    </Out>
  );
};
const Choc: React.FC = () => {
  const t = useT();
  const beat = Math.max(0, Math.sin(t * 9)) ** 6;
  const cross = prog(t, 224.0, 224.6, easeOut);
  const pts = Array.from({length: 70}, (_, k) => {
    const ph = (k + Math.floor(t * 40)) % 14;
    const y = ph === 5 ? -110 : ph === 6 ? 80 : ph === 7 ? -30 : 0;
    return `${k * 14},${110 + (t > 216 ? y : y * 0.3)}`;
  }).join(' ');
  return (
    <Out end={230.5}>
      <Center y={320}><Kin text="Le coup de massue psychologique" at={209.3} size={50} color={AC} /></Center>
      <Abs x={0} y={420} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 60, alignItems: 'center'}}>
        <div style={{transform: `scale(${1 + beat * 0.15})`, opacity: pop(t, 212.6)}}><F n="coeur" size={230} /></div>
        <div style={{opacity: pop(t, 216.1)}}><F n="cerveau" size={200} /></div>
      </Abs>
      <Abs x={60} y={720} w={960} h={220} style={{borderRadius: 20, background: '#fff', boxShadow: '0 14px 30px rgba(20,33,61,0.12)', overflow: 'hidden', opacity: pop(t, 213.5)}}>
        <svg width={960} height={220}><polyline points={pts} fill="none" stroke={AC} strokeWidth={6} strokeLinejoin="round" /></svg>
      </Abs>
      <Abs x={0} y={970} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={214.7} c={AC} size={28}>état de choc</Pill><Pill at={216.9} c={AC} size={28}>montée d’adrénaline</Pill><Pill at={217.8} c={INK} size={28}>terreur pure</Pill></Abs>
      <Abs x={0} y={1080} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20}}>
        <div style={{position: 'relative', opacity: pop(t, 222.6)}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: DIM}}>pas que la chair ou le métal</div><div style={{position: 'absolute', left: -10, right: -10, top: '50%', height: 8, background: RED, transform: `scaleX(${cross})`, transformOrigin: '0 50%'}} /></div>
      </Abs>
      <Abs x={0} y={1170} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={225.4} c={QA} size={32}>le choc émotionnel compte aussi</Pill></Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 3 ═════════════ */
const Carrefour: React.FC = () => {
  const t = useT();
  const aX = lerp(-200, 1200, prog(t, 245.9, 249.4, easeInOut));
  const bY = t < 247.5 ? lerp(1100, 760, prog(t, 245.0, 247.5, easeOut)) : 760 + Math.max(0, Math.min(1, (t - 247.5) * 4)) * -20;
  const step = t < 245.9 ? 1 : t < 251.6 ? 2 : 3;
  const shake = t > 257.4 && t < 263.9 ? Math.sin(t * 50) * 4 : 0;
  return (
    <Out end={263.9}>
      <Center y={320}><Kin text="L’anatomie d’un quasi-accident" at={238.6} size={52} color={IN} /></Center>
      <Abs x={0} y={410} w={1080}><Board text={`ETAPE ${step}`} at={step === 1 ? 242.3 : step === 2 ? 245.9 : 251.6} h={70} gap={4} c={IN} n={6} /></Abs>
      <Abs x={60} y={520} w={960} h={680} style={{borderRadius: 30, overflow: 'hidden', background: '#9BC57A', boxShadow: '0 20px 44px rgba(20,33,61,0.2)', opacity: pop(t, 241.5), transform: `translateX(${shake}px)`}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 260, height: 160, background: '#5D6472'}} />
        <div style={{position: 'absolute', left: 400, top: 0, width: 160, bottom: 0, background: '#5D6472'}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 336, height: 8, background: 'repeating-linear-gradient(90deg, #fff 0 40px, transparent 40px 70px)'}} />
        <div style={{position: 'absolute', left: 476, top: 0, width: 8, bottom: 0, background: 'repeating-linear-gradient(180deg, #fff 0 40px, transparent 40px 70px)'}} />
        <div style={{position: 'absolute', left: 300, top: 180, width: 90, height: 90, background: RED, clipPath: 'polygon(30% 0, 70% 0, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0 70%, 0 30%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 22}}>STOP</div>
        <div style={{position: 'absolute', left: aX - 60, top: 270, width: 130, height: 64, borderRadius: 16, background: AC, boxShadow: '0 8px 14px rgba(0,0,0,0.3)'}}><div style={{position: 'absolute', right: 10, top: 10, width: 30, height: 44, borderRadius: 6, background: '#ffffff88'}} /></div>
        <div style={{position: 'absolute', left: 495, top: bY - 520, width: 60, height: 120, borderRadius: 14, background: BLUE, boxShadow: '0 8px 14px rgba(0,0,0,0.3)'}}><div style={{position: 'absolute', left: 8, top: 8, width: 44, height: 26, borderRadius: 6, background: '#ffffff88'}} /></div>
        {t > 247.6 && t < 250 && <div style={{position: 'absolute', left: 430, top: 200, fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)'}}>!!</div>}
        <div style={{position: 'absolute', left: 20, top: 20}}><Pill at={243.1} c={RED} size={24}>brûle le stop</Pill></div>
        <div style={{position: 'absolute', right: 20, top: 20}}><Pill at={249.3} c={BLUE} size={24}>avait la priorité</Pill></div>
        <div style={{position: 'absolute', left: 20, bottom: 20}}><Pill at={252.4} c={QA} size={24}>aucun contact · peinture nickel</Pill></div>
      </Abs>
      {t > 257.4 && <Abs x={0} y={1220} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20}}><div style={{transform: `scale(${1 + Math.max(0, Math.sin(t * 14)) ** 6 * 0.2})`}}><F n="coeur" size={90} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: AC}}>conducteur tétanisé</div></Abs>}
    </Out>
  );
};
const Bilan: React.FC = () => {
  const t = useT();
  const sw = prog(t, 292.0, 293.6, easeInOut);
  const L = [{l: 'Passage réussi de justesse', a: 278.9}, {l: 'Personne de blessé', a: 280.7}, {l: 'Zéro dommage matériel', a: 282.8}];
  return (
    <Out end={296.6}>
      <Abs x={0} y={320} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, opacity: pop(t, 264.8)}}><F n="megaphone" size={100} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: BLUE}}>étape 4 : faire remonter l’info</div></Abs>
      <Card x={110} y={470} w={860} h={420} at={272.1} c={QA}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, marginBottom: 20}}>Le bilan</div>
        {L.map((x, k) => <div key={k} style={{display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18, opacity: pop(t, x.a)}}><div style={{width: 50, height: 50, borderRadius: 12, background: QA, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, fontWeight: 900}}>✓</div><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: INK}}>{x.l}</div></div>)}
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: AC, opacity: pop(t, 284.6)}}>…et pourtant : sous le choc</div>
      </Card>
      <Abs x={60} y={930} w={960} h={330} style={{opacity: pop(t, 288.9)}}>
        <div style={{position: 'absolute', left: 0, top: 40, width: 380, height: 200, borderRadius: 24, background: `${QA}22`, border: `6px solid ${QA}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: QA}}>quasi-accident</div>
        <div style={{position: 'absolute', right: 0, top: 40, width: 380, height: 200, borderRadius: 24, background: sw > 0.5 ? AC : `${AC}22`, border: `6px solid ${AC}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: sw > 0.5 ? '#fff' : AC}}>accident grave</div>
        <div style={{position: 'absolute', left: lerp(160, 740, sw), top: lerp(110, -10, Math.sin(sw * Math.PI) * 0 + sw), width: 60, height: 60, borderRadius: 30, background: INK, boxShadow: '0 6px 14px rgba(0,0,0,0.3)'}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 260, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>une fraction de seconde suffit</div>
      </Abs>
      {sw > 0.9 && <Blinds src="zones/accident-voiture.jpg" x={240} y={1200} w={600} h={200} at={294.0} n={6} />}
    </Out>
  );
};

/* ═════════════ PARTIE 4 ═════════════ */
const Signaler: React.FC = () => {
  const t = useT();
  const hide = prog(t, 317.6, 318.6, easeOut);
  return (
    <Out end={331.9}>
      <Center y={320}><Kin text="Le réflexe attendu : signaler" at={300.5} size={54} color={BLUE} /></Center>
      <Abs x={0} y={420} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={305.1} c={BLUE} size={28}>impératif moral</Pill><Pill at={306.8} c={BLUE} size={28}>impératif organisationnel</Pill></Abs>
      <Abs x={140} y={530} w={800} h={520} style={{borderRadius: 30, background: '#E9F3FF', overflow: 'hidden', boxShadow: '0 20px 40px rgba(20,33,61,0.15)', opacity: pop(t, 311.0)}}>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 140, background: '#5D6472'}} />
        <div style={{position: 'absolute', left: 370, top: 240, width: 16, height: 150, background: '#8D96A6'}} />
        <div style={{position: 'absolute', left: 318, top: 140, width: 120, height: 120, background: RED, clipPath: 'polygon(30% 0, 70% 0, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0 70%, 0 30%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>STOP</div>
        <div style={{position: 'absolute', left: lerp(-300, 230, hide), top: 40, transform: `scale(1.6)`, transformOrigin: 'top left'}}><F n="arbre" size={180} /></div>
        <div style={{position: 'absolute', left: 20, top: 20}}><Pill at={315.5} c={INK} size={24}>éviter que d’autres refassent l’erreur</Pill></div>
        <div style={{position: 'absolute', right: 20, bottom: 160}}><Pill at={318.7} c={IN} size={24}>problème de visibilité ?</Pill></div>
      </Abs>
      <Abs x={0} y={1080} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, opacity: pop(t, 320.9)}}><F n="megaphone" size={100} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: BLUE}}>le choc ⇒ un signalement obligatoire</div></Abs>
      <Stamp at={326.2} c={RED} text="piège grand ouvert" x={250} y={1220} rot={-5} size={48} />
    </Out>
  );
};
const Iceberg: React.FC = () => {
  const t = useT();
  const sea = prog(t, 336.2, 338.0, easeInOut);
  const look = prog(t, 357.5, 360.0, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      <Center y={320}><Kin text="Combien d’accidents futurs cachés ?" at={333.0} size={48} /></Center>
      <Abs x={60} y={410} w={960} h={760} style={{borderRadius: 30, overflow: 'hidden', background: 'linear-gradient(180deg, #F4F8FF 0 34%, #2C6CB0 34%, #173E73)', boxShadow: '0 20px 44px rgba(20,33,61,0.2)', opacity: pop(t, 334.5)}}>
        <svg width={960} height={760} style={{position: 'absolute', inset: 0}}>
          <polygon points="400,90 470,40 560,110 600,258 360,258" fill="#fff" stroke="#BFD4EE" strokeWidth={4} />
          <polygon points={`360,258 600,258 ${lerp(600, 820, sea)},${lerp(258, 560, sea)} ${lerp(480, 560, sea)},${lerp(258, 720, sea)} ${lerp(360, 160, sea)},${lerp(258, 600, sea)}`} fill="#BFE3FF" opacity={0.85} />
        </svg>
        <div style={{position: 'absolute', left: 380, top: 150}}><Pill at={336.2} c={AC} size={24}>accidents</Pill></div>
        <div style={{position: 'absolute', left: 340, top: 450, opacity: sea}}><Pill at={337.8} c={QA} size={30}>quasi-accidents</Pill></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 262, height: 6, background: '#ffffff88'}} />
      </Abs>
      <Cite y={1180} at={337.8} text="image de l’iceberg ajoutée pour illustrer la question" />
      <Abs x={0} y={1230} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', padding: '0 50px', boxSizing: 'border-box'}}>
        <Pill at={344.1} c={QA} size={26}>signaler systématiquement</Pill><Pill at={346.2} c={BLUE} size={26}>réécrire l’avenir</Pill>
      </Abs>
      {t > 355 && (
        <Abs x={60} y={410} w={960} h={760} style={{background: '#fffffff2', borderRadius: 30, opacity: pop(t, 355.4)}}>
          <div style={{display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'space-around'}}>
            <div style={{textAlign: 'center', opacity: 1 - look * 0.6}}><F n="bris" size={150} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM}}>ce qui a cassé</div></div>
            <div style={{textAlign: 'center', transform: `scale(${1 + look * 0.15})`}}><div style={{position: 'relative'}}><F n="loupe" size={170} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: QA}}>ce qui a failli casser</div></div>
          </div>
        </Abs>
      )}
      {t > 360 && <Dust n={22} c={QA} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...PARTS.flatMap((p) => [...rep(p.at, 10, 0.08, 'sfx/click', 0.18), {at: p.at + 0.05, s: 'sfx/swish', v: 0.35}, {at: p.at + 0.7, s: 'sfx/whoosh', v: 0.4}, ...flaps(p.at + 0.8, 12), {at: p.at + 1.2, s: 'bass-hit', v: 0.3}, {at: p.at + 3.1, s: 'sfx/swish', v: 0.35}]),
  // intro
  ...rep(3.0, 8, 0.07, 'sfx/thud', 0.22), {at: 8.6, s: 'deep-hit', v: 0.4}, {at: 8.7, s: 'tampon', v: 0.4},
  {at: 17.1, s: 'sfx/pop', v: 0.22}, {at: 20.2, s: 'tension', v: 0.25, dur: 2}, {at: 25.2, s: 'riser', v: 0.2, dur: 2.5}, {at: 35.4, s: 'bass-hit', v: 0.4},
  {at: 39.5, s: 'sfx/thud', v: 0.25}, ...rep(48.9, 9, 0.18, 'sfx/click', 0.3), {at: 53.7, s: 'validation', v: 0.3},
  // partie 1
  ...rep(66.75, 8, 0.07, 'sfx/thud', 0.25), ...[72.3, 73.4, 74.2].map((a) => ({at: a, s: 'sfx/pop', v: 0.22})), {at: 78.2, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 81.6, s: 'deep-hit', v: 0.5}, {at: 81.7, s: 'sfx/thud', v: 0.4},
  ...rep(92.85, 8, 0.07, 'sfx/click', 0.25), {at: 102.5, s: 'soft-whoosh', v: 0.3}, {at: 105.9, s: 'sfx/pop', v: 0.2}, {at: 107.7, s: 'tension', v: 0.2, dur: 2}, {at: 111.1, s: 'sfx/ding', v: 0.25},
  {at: 119.0, s: 'sfx/ding', v: 0.22}, {at: 122.5, s: 'sfx/thud', v: 0.25}, {at: 124.7, s: 'sfx/pop', v: 0.25}, {at: 129.6, s: 'sfx/whoosh', v: 0.3}, {at: 135.4, s: 'deep-hit', v: 0.35},
  {at: 145.4, s: 'sfx/whoosh', v: 0.3}, {at: 150.2, s: 'sfx/whoosh', v: 0.3}, {at: 153.7, s: 'sfx/swish', v: 0.3}, {at: 163.7, s: 'tampon', v: 0.45},
  // partie 2
  {at: 168.2, s: 'tension', v: 0.2, dur: 3}, ...rep(177.4, 5, 0.07, 'sfx/thud', 0.25), {at: 182.3, s: 'validation', v: 0.25},
  ...[187.9, 188.7, 189.6].map((a) => ({at: a, s: 'sfx/ding', v: 0.2})), {at: 194.8, s: 'riser', v: 0.25, dur: 1.5}, {at: 196.4, s: 'sfx/whoosh', v: 0.35}, {at: 197.5, s: 'deep-hit', v: 0.5}, {at: 197.6, s: 'tampon', v: 0.4},
  ...rep(212.6, 10, 0.7, 'sfx/thud', 0.22), {at: 216.9, s: 'sfx/rise', v: 0.3}, {at: 224.0, s: 'sfx/swish', v: 0.3},
  // partie 3
  ...flaps(242.3, 10), ...flaps(245.9, 10), ...flaps(251.6, 10), {at: 245.9, s: 'sfx/whoosh', v: 0.45}, {at: 247.5, s: 'tension', v: 0.3, dur: 2}, {at: 248.0, s: 'sfx/swish', v: 0.35}, {at: 257.4, s: 'deep-hit', v: 0.35},
  {at: 264.8, s: 'sfx/pop', v: 0.22}, {at: 272.1, s: 'sfx/whoosh', v: 0.25}, ...[278.9, 280.7, 282.8].map((a) => ({at: a, s: 'sfx/ding', v: 0.25})), {at: 284.6, s: 'sfx/thud', v: 0.3}, {at: 292.0, s: 'riser', v: 0.3, dur: 2}, {at: 293.6, s: 'deep-hit', v: 0.45},
  // partie 4
  {at: 311.0, s: 'soft-whoosh', v: 0.3}, {at: 317.6, s: 'sfx/swish', v: 0.3}, {at: 320.9, s: 'sfx/ding', v: 0.25}, {at: 326.2, s: 'tampon', v: 0.45},
  {at: 334.5, s: 'soft-whoosh', v: 0.35}, {at: 336.2, s: 'riser', v: 0.25, dur: 2}, {at: 344.1, s: 'sfx/pop', v: 0.22}, {at: 346.2, s: 'sfx/pop', v: 0.22}, {at: 355.4, s: 'sfx/whoosh', v: 0.3}, {at: 357.5, s: 'sfx/rise', v: 0.25}, {at: 360.0, s: 'validation', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const AccInc: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.4} to={10.5}><Synonymes /></Gate>
    <Gate from={10.4} to={36.7}><Danger /></Gate>
    <Gate from={36.6} to={56.0}><Dominos /></Gate>
    <Gate from={59.4} to={91.8}><Accident /></Gate>
    <Gate from={91.7} to={119.0}><Incident /></Gate>
    <Gate from={118.8} to={144.0}><Poupees /></Gate>
    <Gate from={143.9} to={165.9}><Frontiere /></Gate>
    <Gate from={169.4} to={184.5}><Alerte /></Gate>
    <Gate from={184.4} to={206.3}><EtSi /></Gate>
    <Gate from={206.2} to={230.6}><Choc /></Gate>
    <Gate from={234.1} to={264.0}><Carrefour /></Gate>
    <Gate from={263.9} to={296.7}><Bilan /></Gate>
    <Gate from={300.1} to={332.0}><Signaler /></Gate>
    <Gate from={331.9} to={OUTRO_AT}><Iceberg /></Gate>
    {PARTS.map((p, i) => <Gate key={p.n} from={p.at} to={p.at + 3.8}><Rewind i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={365.0}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-accidents-incidents-origine.m4a')} trimAfter={s(365.1)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Tile, easeInOut];

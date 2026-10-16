import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {Blinds, Board, Center, Deep, Dust, Kin, Out, Pill, Stamp, Tile, Word} from '../durab/Durab';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {handFont, s, sansFont} from '../theme';
import {Abs, Bg, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, LOGO, PAPER, PH, pop, prog, RED, spring, T, useT} from '../implIso/kit';
import {Brut, HiLine, Link, Mono, Strike} from '../tdbPilot/TdbPilot';
import {captions} from './captions';

/**
 * « L'arbre des causes » (4 min 51) — capsule premium : voix d'origine, sous-titres recalés mot à mot, photos réelles,
 * thème « papier quadrillé ». Elle reprend les techniques de série les plus fortes (texte cinétique, mot surligné jaune,
 * cartes néo-brutalistes et étiquettes monospace, palettes d'affichage, tuiles de bois, store vénitien, photos en
 * profondeur, chaîne de maillons, tampons, poussière) et ajoute de nouvelles techniques premium :
 *  - fil rouge inédit « L'ARBRE QUI SE DESSINE » : dans l'en-tête, l'arbre des causes se construit en direct, de droite
 *    (le dommage) vers la gauche (les causes), nœud après nœud, jusqu'à la cause racine qui s'allume en or ;
 *  - transition inédite « LA LOUPE » : une loupe glisse sur l'écran, le titre de la partie apparaît dans la lentille, puis
 *    la lentille s'ouvre en iris sur toute la page ;
 *  - lecture à rebours (tête de lecture qui recule sur la frise des faits) ;
 *  - dossier d'enquête déclassifié (bandes noires qui se lèvent sur les faits, hypothèses en pointillés) ;
 *  - fils qui convergent et se croisent ; lampe torche qui révèle des failles dormantes sous le sol ;
 *  - ascenseur qui descend d'étage en étage (−1, −2, −3) vers la cause racine ;
 *  - réseau d'un organisme qui se renforce quand le pansement tombe ; détrompeur (poka-yoke) qui ne s'insère que
 *    dans le bon sens.
 */
const ORANGE = '#F07A12';
const YEL = '#F5C400';
const BURG = '#7A1F2B';
const NIGHT = '#151A26';
const TEAL = '#0F9D8F';
const VIO = '#6D4BD8';
const BLUE = '#1F6FD1';
const GOLD = '#E0A100';
const BARK = '#7A5230';
const MONO = '"JetBrains Mono", "IBM Plex Mono", "DejaVu Sans Mono", monospace';
const OUTRO_AT = 291.3;
export const ARBRECAUSES_FRAMES = s(OUTRO_AT + 3.8);
const SECT = [
  {at: 38.15, n: '1', title: 'La méthode de l’arbre', s: 'remonter le fil', c: BLUE},
  {at: 80.25, n: '2', title: 'Faits et hypothèses', s: 'la rigueur de l’analyse', c: VIO},
  {at: 142.64, n: '3', title: 'Remonter à la source', s: 'un exemple concret', c: ORANGE},
  {at: 232.3, n: '4', title: 'Prévenir autrement', s: 'agir sur le système', c: GREEN},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);

/* ═════════════ Fil rouge : l'arbre qui se dessine ═════════════ */
type N = {x: number; y: number; at: number; p: number; c: string; l: string};
const NODES: N[] = [
  {x: 930, y: 54, at: 49.0, p: -1, c: RED, l: 'dommage'},
  {x: 790, y: 30, at: 60.0, p: 0, c: INK, l: ''},
  {x: 790, y: 78, at: 63.5, p: 0, c: INK, l: ''},
  {x: 650, y: 30, at: 69.5, p: 1, c: INK, l: ''},
  {x: 650, y: 78, at: 72.0, p: 2, c: INK, l: ''},
  {x: 510, y: 54, at: 76.0, p: 4, c: GOLD, l: ''},
  {x: 510, y: 18, at: 121.5, p: 3, c: INK, l: ''},
  {x: 400, y: 54, at: 175.5, p: 5, c: ORANGE, l: 'procédure'},
  {x: 290, y: 54, at: 188.0, p: 7, c: ORANGE, l: 'mise à jour'},
  {x: 180, y: 54, at: 206.0, p: 8, c: ORANGE, l: 'oubli'},
  {x: 70, y: 54, at: 213.7, p: 9, c: GOLD, l: 'RACINE'},
];
const Header: React.FC = () => {
  const t = useT();
  const glow = prog(t, 213.7, 214.5);
  const all = prog(t, 288.6, 289.6);
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 56, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div>
      {t > 2.6 && t < OUTRO_AT && (
        <div style={{position: 'absolute', left: 36, right: 36, top: 178, height: 112, borderRadius: 18, background: '#fff', border: `5px solid ${INK}`, boxShadow: `7px 7px 0 ${BURG}`, opacity: pop(t, 2.6), overflow: 'hidden'}}>
          <div style={{position: 'absolute', right: 14, top: 4, fontFamily: MONO, fontSize: 12, letterSpacing: 2, color: DIM}}><b style={{color: INK}}>UNIVERSNORMES</b> <span style={{color: BARK}}>//</span> ARBRE DES CAUSES</div>
          {t < 49 && <div style={{position: 'absolute', left: 20, top: 40, fontFamily: MONO, fontSize: 20, color: '#A9B1BE'}}>← on remonte le fil à partir du dommage…</div>}
          <svg width={1008} height={112} style={{position: 'absolute', left: 0, top: 6}}>
            {NODES.map((n, k) => {
              if (n.p < 0) return null;
              const pn = NODES[n.p];
              const d = prog(t, n.at - 0.6, n.at);
              const mx = (pn.x + n.x) / 2;
              return <path key={`e${k}`} d={`M${pn.x} ${pn.y} C ${mx} ${pn.y}, ${mx} ${n.y}, ${n.x} ${n.y}`} fill="none" stroke={n.c === ORANGE || n.c === GOLD && k > 6 ? ORANGE : BARK} strokeWidth={4} strokeDasharray={200} strokeDashoffset={200 * (1 - d)} />;
            })}
            {NODES.map((n, k) => {
              const on = t >= n.at;
              const sc = Math.min(1, Math.max(0, spring(t, n.at, 8, 11)));
              const g = (k === NODES.length - 1 ? glow : 0) + all;
              return <g key={k} transform={`translate(${n.x} ${n.y}) scale(${on ? sc : 0})`}>{g > 0 && <circle r={18 + 8 * Math.sin(t * 5)} fill={GOLD} opacity={0.35 * Math.min(1, g)} />}<circle r={n.l === 'RACINE' ? 13 : 10} fill={n.c} stroke={INK} strokeWidth={3} />{n.l && <text y={n.y > 60 ? -16 : 28} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={12} fill={n.c === GOLD ? BARK : INK}>{n.l}</text>}</g>;
            })}
          </svg>
        </div>
      )}
    </AbsoluteFill>
  );
};

/** La loupe : la lentille glisse, montre le titre, puis s'ouvre en iris. */
const Loupe: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECT[i];
  const k = t - S0.at;
  if (k < 0 || k > 3.4) return null;
  const slide = prog(t, S0.at, S0.at + 0.75, easeOut);
  const iris = prog(t, S0.at + 1.1, S0.at + 1.7, easeInOut);
  const out = prog(t, S0.at + 3.0, S0.at + 3.4, easeIn);
  const cx = lerp(1350, 540, slide);
  const cy = 860;
  const r = lerp(250, 1500, iris);
  return (
    <AbsoluteFill style={{zIndex: 35, opacity: 1 - out}}>
      <AbsoluteFill style={{background: `rgba(248,245,236,${0.6 * slide * (1 - iris) + iris})`}} />
      <AbsoluteFill style={{clipPath: `circle(${r}px at ${cx}px ${cy}px)`}}>
        <AbsoluteFill style={{background: PAPER}} />
        <Bg />
        <AbsoluteFill style={{background: `radial-gradient(circle at ${cx}px ${cy}px, ${S0.c}22, transparent 60%)`}} />
        <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center', transform: `scale(${lerp(1.5, 1, iris)})`}}><Tile ch={S0.n} size={170} c={S0.c} /></Abs>
        <Abs x={60} y={790} w={960} style={{textAlign: 'center', transform: `scale(${lerp(1.25, 1, iris)})`}}><Kin text={S0.title} at={S0.at + 0.4} size={S0.title.length > 20 ? 72 : 86} /></Abs>
        <Abs x={0} y={1010} w={1080} style={{textAlign: 'center'}}><Mono at={S0.at + 1.4} c={S0.c} size={32}>{S0.s}</Mono></Abs>
      </AbsoluteFill>
      {iris < 1 && (
        <>
          <div style={{position: 'absolute', left: cx - r, top: cy - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `${lerp(26, 6, iris)}px solid ${INK}`, boxShadow: `inset 0 0 40px rgba(255,255,255,0.6), 0 30px 60px rgba(20,33,61,0.3)`, opacity: 1 - iris}} />
          <div style={{position: 'absolute', left: cx + r * 0.68, top: cy + r * 0.68, width: 60, height: 300, background: `linear-gradient(90deg, ${BARK}, #A0703F, ${BARK})`, borderRadius: 30, transform: 'rotate(-45deg)', transformOrigin: '50% 0', opacity: 1 - iris}} />
          <div style={{position: 'absolute', left: cx - r * 0.55, top: cy - r * 0.75, width: r * 0.5, height: r * 0.25, borderRadius: '50%', background: 'rgba(255,255,255,0.35)', transform: 'rotate(-30deg)', opacity: 1 - iris}} />
        </>
      )}
    </AbsoluteFill>
  );
};

/* ═════════════ Couverture ═════════════ */
const TreeSvg: React.FC<{w: number; h: number; p: number; c?: string}> = ({w, h, p, c = BARK}) => {
  const L = [
    'M0 0 L0 -120', 'M0 -60 L-70 -130', 'M0 -80 L70 -150', 'M0 -120 L-30 -190', 'M0 -120 L40 -200', 'M-70 -130 L-120 -170', 'M70 -150 L120 -190',
    'M0 0 L-60 50', 'M0 0 L60 60', 'M0 0 L0 80', 'M-60 50 L-120 70', 'M60 60 L110 100', 'M0 80 L-30 130', 'M0 80 L40 140', 'M-120 70 L-160 110',
  ];
  return (
    <svg width={w} height={h} viewBox="-200 -230 400 400" style={{overflow: 'visible'}}>
      <line x1={-200} y1={0} x2={200} y2={0} stroke="#C9B48A" strokeWidth={3} strokeDasharray="8 8" />
      {L.map((d, k) => <path key={k} d={d} stroke={k >= 7 ? GOLD : c} strokeWidth={k === 0 ? 16 : 9 - (k % 3) * 2} strokeLinecap="round" fill="none" strokeDasharray={200} strokeDashoffset={200 * (1 - Math.max(0, Math.min(1, p * L.length - k)))} />)}
      {[[-30, -190], [40, -200], [-120, -170], [120, -190]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r={22} fill={GREEN} opacity={Math.max(0, Math.min(1, p * 2 - 1))} />)}
    </svg>
  );
};
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('incident/chute-entrepot.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 840, objectFit: 'cover', objectPosition: '50% 55%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 30%, ${PAPER}DD 38%, ${PAPER} 43%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={650} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>ANALYSE D’ACCIDENT · MÉTHODE</div>
        <T size={84} style={{marginTop: 18, textTransform: 'uppercase', letterSpacing: -2}}>L’arbre des</T>
        <div style={{display: 'flex', justifyContent: 'center', gap: 10, marginTop: 10}}>{'CAUSES'.split('').map((c, i) => <Tile key={i} ch={c} size={130} c={BARK} />)}</div>
      </Abs>
      <Abs x={290} y={1080} w={500} h={460}><TreeSvg w={500} h={460} p={1} /></Abs>
      <Abs x={0} y={1500} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 48, color: BARK}}>de la blessure… jusqu’à la racine</Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const depth = prog(t, 13.2, 15.4, easeInOut);
  return (
    <Out end={16.15}>
      <HiLine words={['Toujours', 'la', 'même', 'histoire…']} mark={[2]} at={5.9} y={320} size={60} />
      <Deep src="induction/technicien-hse.jpg" x={70} y={450} w={600} h={420} at={2.8} pos="60% 30%">
        <div style={{position: 'absolute', left: 16, top: 16}}><Mono at={3.2} c={INK} size={20}>responsable QHSE</Mono></div>
        <div style={{position: 'absolute', left: 16, bottom: 16}}><Mono at={4.6} c={RED} size={20}>analyser des accidents</Mono></div>
      </Deep>
      <Abs x={700} y={450} w={310} h={420} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        {[{l: 'une cause', a: 8.6}, {l: 'un responsable', a: 9.5}].map((x, k) => (
          <Brut key={k} x={0} y={k * 150} w={310} h={130} at={x.a} sh={RED} style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 10, padding: 14}}>
            <F n={k ? 'salarie' : 'loupe'} size={70} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>{x.l}</div>
          </Brut>
        ))}
      </Abs>
      <Abs x={70} y={910} w={940} h={360} style={{borderRadius: 26, overflow: 'hidden', border: `5px solid ${INK}`, opacity: pop(t, 10.5)}}>
        <div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, #CFE7F5 0 ${lerp(70, 20, depth)}%, #2A5D7A ${lerp(70, 20, depth)}%, #102A3A)`}} />
        <svg width={940} height={360} style={{position: 'absolute', inset: 0}}>
          <polygon points={`470,${lerp(160, 20, depth)} 560,${lerp(252, 72, depth)} 380,${lerp(252, 72, depth)}`} fill="#fff" />
          <polygon points={`380,${lerp(252, 72, depth)} 560,${lerp(252, 72, depth)} ${lerp(700, 820, depth)},${lerp(420, 360, depth)} ${lerp(240, 120, depth)},${lerp(420, 360, depth)}`} fill="#BFE0F0" opacity={0.85} />
        </svg>
        <div style={{position: 'absolute', left: 20, top: 16}}><Mono at={10.6} c={INK} size={20}>la surface</Mono></div>
        <div style={{position: 'absolute', right: 20, bottom: 16, opacity: pop(t, 14.4)}}><Mono at={14.4} c={GOLD} size={22} style={{color: INK}}>bien plus profond</Mono></div>
      </Abs>
    </Out>
  );
};
const IdeeRecue: React.FC = () => {
  const t = useT();
  const aim = prog(t, 19.9, 20.9, easeInOut);
  return (
    <Out end={29.45}>
      <HiLine words={['L’idée', 'reçue', 'à', 'déconstruire']} mark={[1]} at={16.3} y={320} size={58} />
      <Abs x={140} y={450} w={800} h={540} style={{borderRadius: 26, overflow: 'hidden', border: `5px solid ${INK}`, boxShadow: `9px 9px 0 ${RED}`, opacity: pop(t, 17.0)}}>
        <Img src={PH('integration/agent-terrain.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 20%', filter: `grayscale(${aim * 0.7})`}} />
        <svg width={800} height={540} style={{position: 'absolute', inset: 0, opacity: aim}}>
          <circle cx={400} cy={170} r={lerp(300, 110, aim)} fill="none" stroke={RED} strokeWidth={8} />
          <line x1={400} y1={20} x2={400} y2={320} stroke={RED} strokeWidth={4} /><line x1={250} y1={170} x2={550} y2={170} stroke={RED} strokeWidth={4} />
        </svg>
        <div style={{position: 'absolute', left: 20, bottom: 20}}><Mono at={20.9} c={RED} size={24}>l’erreur humaine</Mono></div>
        <div style={{position: 'absolute', right: 20, bottom: 20}}><Mono at={21.9} c={INK} size={24}>l’acte isolé</Mono></div>
      </Abs>
      <Abs x={0} y={1030} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 30}}>
        {[{l: 'simpliste', a: 25.5}, {l: 'inefficace', a: 27.3}].map((x, k) => <div key={k} style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: DIM, opacity: pop(t, x.a)}}>{x.l}<Strike p={prog(t, x.a + 0.5, x.a + 0.9)} c={RED} /></div>)}
      </Abs>
      <Stamp at={27.4} c={RED} text="dangereusement inefficace" x={170} y={1150} rot={-5} size={44} />
    </Out>
  );
};
const Outil: React.FC = () => {
  const t = useT();
  const grow = prog(t, 33.8, 37.8, easeInOut);
  return (
    <Out end={38.2}>
      <Center y={330}><Kin text="Aller au-delà de la surface" at={29.5} size={58} /></Center>
      <Abs x={190} y={450} w={700} h={620}><TreeSvg w={700} h={620} p={grow} /></Abs>
      <Abs x={0} y={1110} w={1080} style={{opacity: pop(t, 36.7)}}><Board text="ARBRE DES CAUSES" at={36.8} h={72} c={BARK} stag={0.035} /></Abs>
      <Abs x={0} y={1230} w={1080} style={{textAlign: 'center'}}><Pill at={33.8} c={GREEN} size={28}>une méthode qui a fait ses preuves</Pill></Abs>
    </Out>
  );
};

/* ═════════════ SECTION 1 ═════════════ */
const Logique: React.FC = () => {
  const t = useT();
  const back = prog(t, 47.6, 53.0, easeInOut);
  const head = lerp(900, 120, back);
  const F5 = [{x: 140, l: 'fait'}, {x: 330, l: 'fait'}, {x: 520, l: 'fait'}, {x: 710, l: 'fait'}, {x: 900, l: 'DOMMAGE'}];
  return (
    <Out end={54.35}>
      <HiLine words={['Pas', 'un', 'coupable…']} at={41.9} y={320} size={56} c={DIM} hand="un enchaînement de faits" handAt={43.3} />
      <Abs x={0} y={520} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 6, opacity: pop(t, 44.1)}}>
        {Array.from({length: 7}, (_, k) => <div key={k} style={{width: 34, height: 140, background: k === 6 ? RED : INK, borderRadius: 6, transformOrigin: '50% 100%', transform: `rotate(${Math.min(70, Math.max(0, (prog(t, 44.4, 46.0) * 8 - k) * 70))}deg)`, marginLeft: 30}} />)}
      </Abs>
      <Brut x={60} y={760} w={960} h={420} at={45.4} sh={BLUE}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}><Mono at={45.5} c={INK} size={18}>frise des faits</Mono><Mono at={47.6} c={RED} size={18}>◀◀ lecture à rebours</Mono></div>
        <div style={{position: 'absolute', left: 60, right: 60, top: 210, height: 8, background: '#DDE3EC', borderRadius: 4}} />
        {F5.map((f, k) => {
          const seen = head <= f.x + 20 || k === 4;
          return <div key={k} style={{position: 'absolute', left: f.x - 60, top: 150, width: 120, textAlign: 'center'}}>
            <div style={{width: 60, height: 60, margin: '0 auto', borderRadius: 30, background: seen ? (k === 4 ? RED : BLUE) : '#fff', border: `5px solid ${INK}`, transform: `scale(${seen ? 1.08 : 1})`}} />
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: k === 4 ? RED : INK, marginTop: 10}}>{f.l}</div>
          </div>;
        })}
        <div style={{position: 'absolute', left: head - 4, top: 110, width: 8, height: 190, background: RED, opacity: pop(t, 47.6)}}><div style={{position: 'absolute', left: -14, top: -20, width: 0, height: 0, borderLeft: '18px solid transparent', borderRight: '18px solid transparent', borderTop: `22px solid ${RED}`}} /></div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 26, textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 40, color: BLUE, opacity: pop(t, 51.6)}}>on remonte le fil, étape par étape</div>
      </Brut>
      <Abs x={0} y={1220} w={1080} style={{textAlign: 'center'}}><Pill at={47.6} c={RED} size={30}>on part de la fin</Pill></Abs>
    </Out>
  );
};
const Etapes: React.FC = () => {
  const t = useT();
  const rep = t > 71.8 ? Math.min(3, 1 + Math.floor((t - 71.8) / 0.9)) : 1;
  const E = [{n: '1', l: 'Partir du dommage', a: 59.3, ic: 'pansement'}, {n: '2', l: 'Fait juste avant', a: 61.6, ic: 'loupe'}, {n: '3', l: 'Poser LA question', a: 64.5, ic: 'question'}, {n: '4', l: 'Répéter → causes premières', a: 71.8, ic: 'repeter'}];
  return (
    <Out end={80.3}>
      <HiLine words={['Quatre', 'grandes', 'étapes']} mark={[0]} at={56.8} y={320} size={60} />
      {E.map((e, k) => (
        <Brut key={k} x={70 + (k % 2) * 480} y={430 + Math.floor(k / 2) * 190} w={460} h={170} at={e.a} sh={[RED, BLUE, VIO, GOLD][k]} style={{display: 'flex', alignItems: 'center', gap: 14, padding: 16}}>
          <Tile ch={e.n} size={64} c={[RED, BLUE, VIO, GOLD][k]} /><F n={e.ic} size={60} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 25, color: INK}}>{e.l}</div>
        </Brut>
      ))}
      <Abs x={70} y={830} w={940} h={300} style={{background: NIGHT, borderRadius: 26, border: `5px solid ${INK}`, boxShadow: `9px 9px 0 ${YEL}`, padding: 28, boxSizing: 'border-box', opacity: pop(t, 68.8)}}>
        <div style={{fontFamily: MONO, fontSize: 20, color: '#8B95A8'}}>LA QUESTION UNIQUE {t > 71.8 && <span style={{color: YEL}}>· ×{rep}</span>}</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: '#fff', marginTop: 16, lineHeight: 1.15, transform: `scale(${t > 71.8 ? 1 + 0.04 * Math.max(0, 1 - ((t - 71.8) % 0.9) * 4) : 1})`, transformOrigin: '0 50%'}}>« Qu’a-t-il fallu pour que <span style={{color: YEL}}>ce fait</span> se produise ? »</div>
      </Abs>
      <Abs x={0} y={1170} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={75.8} c={GOLD} size={28}>causes premières</Pill><Pill at={77.3} c={INK} size={28}>sans antécédent direct</Pill></Abs>
    </Out>
  );
};

/* ═════════════ SECTION 2 ═════════════ */
const Rigueur: React.FC = () => {
  const t = useT();
  const sort = prog(t, 100.2, 102.8, easeInOut);
  const C = [{l: 'certitudes', a: 97.1, fact: true}, {l: 'intuitions', a: 98.0, fact: false}, {l: 'on-dit', a: 99.0, fact: false}, {l: 'témoignage vérifié', a: 97.5, fact: true}, {l: 'photo des lieux', a: 98.5, fact: true}, {l: 'il paraît que…', a: 99.4, fact: false}];
  return (
    <Out end={114.65}>
      <HiLine words={['Une', 'discipline', 'de', 'fer']} mark={[1, 3]} at={100.9} y={320} size={60} />
      {t < 100.0 && <Center y={330}><Kin text="À chaud, on mélange tout" at={93.7} size={56} color={RED} /></Center>}
      <Abs x={70} y={440} w={940} h={760}>
        {sort > 0 && <>
          <div style={{position: 'absolute', left: 0, top: 0, width: 455, height: 760, borderRadius: 22, background: '#fff', border: `5px solid ${INK}`, boxShadow: `8px 8px 0 ${INK}`, opacity: sort}}><div style={{background: INK, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, padding: '12px 18px'}}>■ FAITS</div><div style={{padding: '8px 18px', fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: DIM}}>prouvés · objectifs · incontestables</div></div>
          <div style={{position: 'absolute', right: 0, top: 0, width: 455, height: 760, borderRadius: 22, background: '#FAF8FF', border: `5px dashed ${VIO}`, opacity: sort}}><div style={{background: VIO, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, padding: '12px 18px'}}>? HYPOTHÈSES</div><div style={{padding: '8px 18px', fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: DIM}}>à vérifier</div></div>
        </>}
        {C.map((c, k) => {
          const fx = 120 + random(`cx${k}`) * 600, fy = 140 + random(`cy${k}`) * 480;
          const fi = C.filter((q, j) => q.fact === c.fact && j < k).length;
          const tx = c.fact ? 28 : 513, ty = 140 + fi * 150;
          const x = lerp(fx + Math.sin(t * 2 + k) * 30, tx, sort);
          const y = lerp(fy + Math.cos(t * 1.7 + k) * 30, ty, sort);
          const redact = c.fact ? 1 - prog(t, 103.6 + fi * 0.5, 104.2 + fi * 0.5) : 0;
          return (
            <div key={k} style={{position: 'absolute', left: x, top: y, width: 400, height: 120, borderRadius: 14, background: '#fff', border: c.fact ? `4px solid ${INK}` : `4px dashed ${VIO}`, display: 'flex', alignItems: 'center', gap: 14, padding: '0 18px', boxSizing: 'border-box', transform: `rotate(${(1 - sort) * (k % 2 ? 8 : -8)}deg)`, opacity: pop(t, c.a)}}>
              <div style={{fontSize: 40, fontWeight: 900, color: c.fact ? GREEN : VIO}}>{c.fact ? '✓' : '?'}</div>
              <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>{c.l}{c.fact && redact > 0 && <div style={{position: 'absolute', left: -4, right: -4, top: 4, bottom: 4, background: INK, transform: `scaleX(${redact})`, transformOrigin: '100% 50%'}} />}</div>
            </div>
          );
        })}
      </Abs>
      <Stamp at={112.2} c={INK} text="solide comme le roc" x={260} y={1180} rot={-5} size={52} />
    </Out>
  );
};
const Pourquoi: React.FC = () => {
  const t = useT();
  const conv = prog(t, 121.2, 124.0, easeInOut);
  const tilt = prog(t, 126.2, 128.4, easeInOut);
  const torch = prog(t, 136.0, 140.5, easeInOut);
  const tx = lerp(120, 820, torch);
  return (
    <Out end={142.7}>
      <HiLine words={['Pourquoi', 'si', 'efficace', '?']} mark={[2]} at={114.8} y={320} size={60} />
      {t < 125.4 && (
        <Brut x={70} y={440} w={940} h={760} at={116.4} sh={BLUE}>
          <Mono at={116.5} c={BLUE} size={20}>① plusieurs chaînes d’événements</Mono>
          <svg width={880} height={640} style={{marginTop: 10}}>
            {[0, 1, 2, 3].map((k) => {
              const y0 = 70 + k * 160;
              const d = `M20 ${y0} C 300 ${y0}, 500 ${lerp(y0, 320, conv)}, 760 ${lerp(y0, 320, conv)}`;
              return <path key={k} d={d} fill="none" stroke={[BLUE, ORANGE, VIO, TEAL][k]} strokeWidth={10} strokeLinecap="round" strokeDasharray={1000} strokeDashoffset={1000 * (1 - prog(t, 118.4 + k * 0.3, 120.4 + k * 0.3))} />;
            })}
            {conv > 0.9 && <circle cx={770} cy={320} r={30 + 14 * Math.sin(t * 10)} fill={RED} opacity={0.85} />}
            {conv > 0.9 && <text x={770} y={400} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={24} fill={RED}>ACCIDENT</text>}
          </svg>
          <div style={{position: 'absolute', left: 30, bottom: 26, fontFamily: handFont, fontWeight: 700, fontSize: 40, color: INK, opacity: pop(t, 123.9)}}>… qui finissent par se croiser</div>
        </Brut>
      )}
      {t >= 125.4 && t < 131.9 && (
        <Abs x={70} y={440} w={940} h={760} style={{borderRadius: 26, overflow: 'hidden', border: `5px solid ${INK}`, boxShadow: `9px 9px 0 ${ORANGE}`, perspective: 1600}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 1520, transform: `translateY(${-tilt * 760}px)`}}>
            <div style={{height: 760, position: 'relative', background: '#EAF3FF'}}>
              <Img src={PH('promo/audit-reunion.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              <div style={{position: 'absolute', left: 20, top: 20}}><Mono at={129.4} c={ORANGE} size={24}>l’organisation · le management</Mono></div>
            </div>
            <div style={{height: 760, position: 'relative'}}>
              <Img src={PH('promo/hse-machine.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              <div style={{position: 'absolute', left: 20, bottom: 20}}><Mono at={125.5} c={INK} size={24}>② au-delà de l’opérateur</Mono></div>
            </div>
          </div>
          <div style={{position: 'absolute', right: 30, top: 340, fontFamily: MONO, fontWeight: 700, fontSize: 30, color: '#fff', background: ORANGE, padding: '6px 14px', borderRadius: 6, opacity: tilt > 0 && tilt < 1 ? 1 : 0}}>▲ lever la tête</div>
        </Abs>
      )}
      {t >= 131.9 && (
        <Abs x={70} y={440} w={940} h={760} style={{borderRadius: 26, overflow: 'hidden', border: `5px solid ${INK}`, boxShadow: `9px 9px 0 ${GOLD}`, background: '#0C0F16'}}>
          <div style={{position: 'absolute', left: 20, top: 20, zIndex: 3}}><Mono at={132.0} c={GOLD} size={22} style={{color: INK}}>③ les conditions latentes</Mono></div>
          <div style={{position: 'absolute', inset: 0, background: 'repeating-linear-gradient(90deg, #2A2F3A 0 118px, #1E222B 118px 120px), repeating-linear-gradient(0deg, transparent 0 118px, #1E222B 118px 120px)', clipPath: `circle(${torch > 0 ? 200 : 0}px at ${tx}px 420px)`}}>
            <svg width={940} height={760} style={{position: 'absolute', inset: 0}}>
              {[[100, 360, 260, 470, 330, 420], [380, 300, 470, 420, 560, 380, 620, 470], [640, 380, 760, 460, 860, 420]].map((p, k) => <polyline key={k} points={p.join(' ')} fill="none" stroke={ORANGE} strokeWidth={6} style={{filter: `drop-shadow(0 0 8px ${ORANGE})`}} />)}
            </svg>
          </div>
          {torch > 0 && <div style={{position: 'absolute', left: tx - 200, top: 220, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,240,190,0.25), transparent 70%)'}} />}
          <div style={{position: 'absolute', left: 30, bottom: 26, fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff', opacity: pop(t, 137.1)}}>des failles dormantes…</div>
          {t > 139.6 && <div style={{position: 'absolute', right: 40, bottom: 80, transform: `scale(${1 + 0.2 * Math.sin(t * 20)})`}}><F n="etincelles" size={110} /></div>}
          {t > 139.6 && <div style={{position: 'absolute', right: 30, bottom: 26}}><Mono at={139.7} c={RED} size={22}>un petit déclencheur</Mono></div>}
        </Abs>
      )}
    </Out>
  );
};

/* ═════════════ SECTION 3 ═════════════ */
const Scenario: React.FC = () => {
  const t = useT();
  const close = prog(t, 168.6, 169.4, easeIn);
  return (
    <Out end={170.6}>
      <HiLine words={['Un', 'grand', 'classique']} mark={[1]} at={152.7} y={320} size={60} />
      <Deep src="promo/hse-machine.jpg" x={70} y={440} w={560} h={430} at={155.8} pos="40% 40%">
        <div style={{position: 'absolute', left: 16, top: 16}}><Mono at={156.0} c={RED} size={22}>accident sur une machine</Mono></div>
      </Deep>
      <Brut x={660} y={440} w={350} h={430} at={161.0} sh={ORANGE} style={{textAlign: 'center'}}>
        <F n="cadenas" size={110} style={{margin: '0 auto'}} />
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, marginTop: 10}}>procédure de consignation</div>
        <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 20, color: DIM}}>travailler en sécurité</div>
        <Stamp at={165.2} c={RED} text="insuffisante" x={30} y={300} rot={-8} size={40} />
      </Brut>
      <Abs x={290} y={920} w={500} h={300} style={{opacity: pop(t, 167.8)}}>
        <div style={{position: 'absolute', left: 0, top: 60, width: 500, height: 240, background: '#E8C98A', borderRadius: 14, border: `4px solid ${BARK}`}} />
        <div style={{position: 'absolute', left: 0, top: 60, width: 500, height: 240, background: '#F2DCA8', borderRadius: 14, border: `4px solid ${BARK}`, transformOrigin: '50% 0', transform: `perspective(800px) rotateX(${lerp(-70, 0, close)}deg)`}}><div style={{padding: 30, fontFamily: handFont, fontSize: 40, color: BARK}}>Dossier accident</div></div>
        {close > 0.9 && <Stamp at={169.3} c={BARK} text="affaire classée" x={70} y={140} rot={-6} size={44} />}
      </Abs>
    </Out>
  );
};
const Descente: React.FC = () => {
  const t = useT();
  const lvl = t < 185.2 ? 1 : t < 205.8 ? 2 : 3;
  const ride = (a: number) => prog(t, a, a + 1.2, easeInOut);
  const pos = 1 + ride(184.0) + ride(204.6);
  const L = [
    {n: '−1', l: 'La procédure est insuffisante', s: 'premier fait avéré', c: ORANGE, ic: 'clipboard'},
    {n: '−2', l: 'Pas mise à jour', s: 'lors du remplacement de la machine, il y a deux ans', c: VIO, ic: 'calendrier'},
    {n: '−3', l: 'Pourquoi cet oubli ?', s: 'personne n’y a pensé…', c: RED, ic: 'question'},
  ];
  return (
    <Out end={211.95}>
      <Abs x={0} y={310} w={1080} style={{textAlign: 'center'}}><Kin text="On ne s’arrête pas là" at={170.6} size={58} color={ORANGE} /></Abs>
      <Abs x={70} y={420} w={940} h={800} style={{borderRadius: 24, background: '#2A2F3A', border: `6px solid ${INK}`, boxShadow: `10px 10px 0 ${BURG}`, overflow: 'hidden', opacity: pop(t, 172.0)}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 80, background: NIGHT, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px'}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: '#8B95A8'}}>ASCENSEUR · ENQUÊTE</div>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 46, color: L[lvl - 1].c, textShadow: `0 0 16px ${L[lvl - 1].c}`}}>{L[lvl - 1].n} ▼</div>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 80, height: 720 * 3, transform: `translateY(${-(pos - 1) * 720}px)`}}>
          {L.map((x, k) => (
            <div key={k} style={{height: 720, position: 'relative', background: `linear-gradient(180deg, ${['#F8F5EC', '#EFE8D8', '#E5DCC8'][k]}, ${['#EFE8D8', '#E5DCC8', '#D9CDB2'][k]})`, borderBottom: '14px solid #8A7A5A'}}>
              <div style={{position: 'absolute', left: 30, top: 30, fontFamily: MONO, fontWeight: 700, fontSize: 90, color: `${x.c}55`}}>{x.n}</div>
              <div style={{position: 'absolute', left: 60, right: 60, top: 180, textAlign: 'center'}}>
                <div style={{display: 'flex', justifyContent: 'center'}}><F n={x.ic} size={130} /></div>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: INK, marginTop: 14}}>{x.l}</div>
                <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 30, color: DIM, marginTop: 8}}>{x.s}</div>
              </div>
            </div>
          ))}
        </div>
        {[179.2, 205.9].map((a, k) => t > a && t < a + 2.4 && <div key={k} style={{position: 'absolute', left: 0, right: 0, bottom: 40, textAlign: 'center'}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: '#fff', background: RED, padding: '6px 26px', borderRadius: 12, transform: `scale(${Math.min(1, spring(t, a, 7, 11))})`, display: 'inline-block'}}>Pourquoi ?</span></div>)}
        {t > 191.9 && t < 197.5 && <div style={{position: 'absolute', right: 30, top: 110, fontFamily: MONO, fontWeight: 700, fontSize: 34, color: VIO, background: '#fff', border: `4px solid ${INK}`, padding: '6px 14px', borderRadius: 8}}>−2 ANS</div>}
      </Abs>
      <Cite2 at={191.9} />
    </Out>
  );
};
const Cite2: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  return <Abs x={0} y={1240} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 700, fontSize: 24, color: DIM, opacity: pop(t, at) * (1 - prog(t, 211.5, 211.9))}}>« il y a deux ans » : exemple cité par la vidéo d’origine</Abs>;
};
const Racine: React.FC = () => {
  const t = useT();
  const glow = prog(t, 213.7, 215.0);
  return (
    <Out end={232.35}>
      <Abs x={0} y={310} w={1080} style={{textAlign: 'center'}}><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 70, color: GOLD, transform: `scale(${Math.min(1, spring(t, 212.8, 7, 11))})`, opacity: t > 212.7 ? 1 : 0}}>On la tient !</div></Abs>
      <Abs x={140} y={420} w={800} h={420} style={{borderRadius: 26, background: `radial-gradient(circle at 50% 70%, rgba(224,161,0,${0.35 * glow}), transparent 60%), #fff`, border: `5px solid ${INK}`, boxShadow: `9px 9px 0 ${GOLD}`, opacity: pop(t, 212.8)}}>
        <svg width={800} height={420} style={{position: 'absolute', inset: 0}}>
          <line x1={0} y1={150} x2={800} y2={150} stroke="#C9B48A" strokeWidth={3} strokeDasharray="10 8" />
          <path d="M400 150 L400 40" stroke={BARK} strokeWidth={16} strokeLinecap="round" />
          {['M400 150 L300 230 L240 300', 'M400 150 L500 240 L560 310', 'M400 150 L400 280 L380 380'].map((d, k) => <path key={k} d={d} stroke={k === 2 ? GOLD : BARK} strokeWidth={k === 2 ? 14 : 9} fill="none" strokeLinecap="round" strokeDasharray={400} strokeDashoffset={400 * (1 - prog(t, 213.0 + k * 0.2, 214.0 + k * 0.2))} style={k === 2 ? {filter: `drop-shadow(0 0 ${12 * glow}px ${GOLD})`} : undefined} />)}
          <circle cx={380} cy={380} r={18 + 6 * Math.sin(t * 5) * glow} fill={GOLD} stroke={INK} strokeWidth={4} opacity={glow} />
        </svg>
        <div style={{position: 'absolute', right: 30, bottom: 30}}><Mono at={214.0} c={GOLD} size={26} style={{color: INK}}>la cause racine</Mono></div>
      </Abs>
      <Abs x={70} y={870} w={940} style={{display: 'flex', justifyContent: 'center', gap: 20}}>
        {[{l: 'la procédure', a: 216.8}, {l: 'la personne', a: 218.4}].map((x, k) => <div key={k} style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: DIM, opacity: pop(t, x.a), padding: '8px 16px', background: '#fff', border: `3px solid #C9D2DF`, borderRadius: 12}}>{x.l}<Strike p={prog(t, x.a + 0.4, x.a + 0.8)} c={RED} /></div>)}
      </Abs>
      <Brut x={110} y={970} w={860} h={180} at={219.9} sh={GOLD} style={{display: 'flex', alignItems: 'center', gap: 20}}>
        <div style={{transform: `rotate(${t * 40}deg)`}}><F n="engrenage" size={100} /></div>
        <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>Le système : gestion des modifications</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: RED, opacity: pop(t, 224.7)}}>défaillant</div></div>
      </Brut>
      {t > 226.8 && (
        <Abs x={110} y={1170} w={860} h={140} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, opacity: pop(t, 226.9)}}>
          <F n="usine2" size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: INK}}>=</div><F n="usine2" size={90} />
          <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM, marginLeft: 20}}>« rien ne change »<Strike p={prog(t, 230.9, 231.5)} c={RED} /></div>
        </Abs>
      )}
    </Out>
  );
};

/* ═════════════ SECTION 4 ═════════════ */
const Faille: React.FC = () => {
  const t = useT();
  const D = [{l: 'autre équipement remplacé', a: 247.4, ic: 'usine2'}, {l: 'autre procédure obsolète', a: 249.1, ic: 'clipboard'}, {l: 'autre accident', a: 251.3, ic: 'ambulance'}];
  return (
    <Out end={258.45}>
      <Brut x={70} y={330} w={940} at={239.6} sh={RED}>
        <div style={{fontFamily: 'Georgia, serif', fontSize: 100, color: RED, lineHeight: 0.6}}>“</div>
        <HiLine words={['Corriger', 'la', 'procédure', 'seule', 'laisse', 'une', 'faille', 'béante.']} mark={[6, 7]} at={242.2} y={50} size={46} x={10} w={860} />
        <div style={{height: 140}} />
      </Brut>
      <Abs x={70} y={640} w={940} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        {D.map((d, k) => {
          const p = Math.max(0, Math.min(1, spring(t, d.a, 8, 12)));
          return <div key={k} style={{display: 'flex', alignItems: 'center', gap: 18, background: '#fff', border: `4px solid ${INK}`, borderRadius: 14, padding: '14px 20px', transform: `translateX(${(1 - p) * 300}px) rotate(${(1 - p) * 6}deg)`, opacity: t >= d.a ? 1 : 0, marginLeft: k * 50}}>
            <F n={d.ic} size={70} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: k === 2 ? RED : INK}}>{d.l}</div>
            {k === 2 && <div style={{marginLeft: 'auto'}}><Mono at={253.3} c={RED} size={20}>tôt ou tard</Mono></div>}
          </div>;
        })}
      </Abs>
      <Brut x={110} y={1080} w={860} h={180} at={254.2} sh={GREEN} style={{display: 'flex', alignItems: 'center', gap: 22}}>
        <div style={{display: 'flex'}}><div style={{transform: `rotate(${t * 70}deg)`}}><F n="engrenage" size={90} /></div><div style={{transform: `rotate(${-t * 70 + 20}deg)`, marginLeft: -20, marginTop: 40}}><F n="engrenage" size={70} /></div></div>
        <div><Mono at={254.3} c={GREEN} size={20}>la vraie prévention</Mono><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, marginTop: 8}}>agir sur le processus de gestion</div></div>
      </Brut>
    </Out>
  );
};
const Organisme: React.FC = () => {
  const t = useT();
  const peel = prog(t, 263.6, 264.8, easeIn);
  const strong = prog(t, 264.0, 266.5, easeInOut);
  const pts = Array.from({length: 14}, (_, k) => [470 + Math.cos(k * 2.4) * (140 + (k % 4) * 60), 300 + Math.sin(k * 2.4) * (120 + (k % 3) * 55)]);
  const edges = pts.flatMap((_, a) => [[a, (a + 1) % 14], [a, (a + 5) % 14]]);
  return (
    <Out end={274.35}>
      <HiLine words={['Un', 'changement', 'total', 'de', 'perspective']} mark={[1]} at={258.7} y={320} size={52} />
      <Abs x={70} y={430} w={940} h={600} style={{borderRadius: 26, background: NIGHT, border: `5px solid ${INK}`, boxShadow: `9px 9px 0 ${GREEN}`, overflow: 'hidden'}}>
        <svg width={940} height={600} style={{position: 'absolute', inset: 0}}>
          {edges.map(([a, b], k) => <line key={k} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke={strong > 0 ? GREEN : '#3A4458'} strokeWidth={lerp(2, 7, strong)} opacity={0.5 + 0.5 * strong} />)}
          {pts.map(([x, y], k) => <circle key={k} cx={x} cy={y} r={lerp(8, 16, strong) + Math.sin(t * 4 + k) * 2 * strong} fill={strong > 0 ? GREEN : '#5A647A'} style={{filter: strong > 0.5 ? `drop-shadow(0 0 10px ${GREEN})` : undefined}} />)}
        </svg>
        <div style={{position: 'absolute', left: 360, top: 240, transform: `translate(${peel * 320}px, ${-peel * 260}px) rotate(${-30 + peel * 120}deg)`, opacity: 1 - peel * 0.9}}><F n="pansement" size={200} /></div>
        <div style={{position: 'absolute', left: 24, top: 20}}><Mono at={261.5} c={'#5A647A'} size={20}>pansement sur une plaie</Mono></div>
        <div style={{position: 'absolute', right: 24, bottom: 20}}><Mono at={264.0} c={GREEN} size={22}>tout l’organisme renforcé</Mono></div>
      </Abs>
      <Abs x={70} y={1070} w={940} style={{display: 'flex', justifyContent: 'center', gap: 16, alignItems: 'center'}}>
        <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: DIM, opacity: pop(t, 268.3)}}>blâmer un individu<Strike p={prog(t, 268.9, 269.4)} c={RED} /></div>
      </Abs>
      <Abs x={0} y={1160} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={269.6} c={BLUE} size={30}>améliorer le système</Pill><Pill at={271.6} c={GREEN} size={30}>robuste</Pill><Pill at={272.6} c={TEAL} size={30}>résilient</Pill></Abs>
    </Out>
  );
};
const Final: React.FC = () => {
  const t = useT();
  const tryW = prog(t, 283.6, 284.6, easeInOut);
  const rot = prog(t, 285.0, 285.8, easeInOut);
  const ins = prog(t, 286.0, 286.9, easeIn);
  const bump = t > 284.4 && t < 284.9 ? Math.sin((t - 284.4) * 60) * 8 : 0;
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={['La', 'vraie', 'question', 'de', 'fond']} mark={[2]} at={275.1} y={320} size={56} />
      <Abs x={70} y={440} w={940} style={{display: 'flex', gap: 20}}>
        <div style={{flex: 1, position: 'relative', background: '#fff', border: `4px solid #C9D2DF`, borderRadius: 18, padding: 20, textAlign: 'center', opacity: pop(t, 280.0)}}>
          <F n="formatrice" size={90} style={{margin: '0 auto'}} />
          <div style={{position: 'relative', display: 'inline-block', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: DIM, marginTop: 8}}>former à ne plus faire d’erreurs<Strike p={prog(t, 283.4, 283.9)} c={RED} /></div>
        </div>
        <div style={{flex: 1, background: '#fff', border: `5px solid ${INK}`, boxShadow: `8px 8px 0 ${GREEN}`, borderRadius: 18, padding: 20, textAlign: 'center', opacity: pop(t, 283.4)}}>
          <F n="engrenage" size={90} style={{margin: '0 auto'}} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, marginTop: 8}}>concevoir des systèmes qui rendent l’erreur quasi impossible</div>
        </div>
      </Abs>
      <Abs x={140} y={790} w={800} h={360} style={{borderRadius: 24, background: '#fff', border: `5px solid ${INK}`, boxShadow: `9px 9px 0 ${YEL}`, overflow: 'hidden', opacity: pop(t, 283.5)}}>
        <div style={{position: 'absolute', left: 20, top: 16}}><Mono at={283.6} c={INK} size={18}>détrompeur · poka-yoke</Mono></div>
        <div style={{position: 'absolute', right: 120, top: 110, width: 160, height: 160, background: '#DDE3EC', border: `5px solid ${INK}`, borderRadius: 14}}>
          <div style={{position: 'absolute', left: 30, top: 50, width: 100, height: 60, background: NIGHT, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 30% 100%, 0 60%)'}} />
        </div>
        <div style={{position: 'absolute', left: lerp(60, 380, Math.max(tryW * 0.85, ins)) + bump, top: 140, width: 160, height: 100, transform: `rotate(${lerp(180, 0, rot)}deg)`, transition: 'none'}}>
          <div style={{position: 'absolute', left: 0, top: 20, width: 70, height: 60, background: ORANGE, borderRadius: 8, border: `4px solid ${INK}`}} />
          <div style={{position: 'absolute', left: 66, top: 20, width: 100, height: 60, background: ORANGE, border: `4px solid ${INK}`, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 30% 100%, 0 60%)'}} />
        </div>
        {t > 284.4 && t < 285.0 && <div style={{position: 'absolute', left: 300, top: 60, fontSize: 60, fontWeight: 900, color: RED}}>✗</div>}
        {ins > 0.95 && <div style={{position: 'absolute', right: 160, top: 40, fontSize: 60, fontWeight: 900, color: GREEN}}>✓</div>}
      </Abs>
      <Abs x={0} y={1190} w={1080} style={{textAlign: 'center', opacity: pop(t, 287.6)}}><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 56, color: BARK}}>toute la puissance de la méthode</div></Abs>
      {t > 288.6 && <Dust n={24} c={GOLD} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap((x) => [{at: x.at, s: 'sfx/swish', v: 0.4}, {at: x.at + 0.4, s: 'sfx/thud', v: 0.3}, {at: x.at + 1.1, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 1.4, s: 'sfx/pop', v: 0.22}, {at: x.at + 3.0, s: 'sfx/whoosh', v: 0.3}]),
  ...NODES.map((n) => ({at: n.at, s: 'sfx/pop', v: 0.12})), {at: 213.7, s: 'validation', v: 0.4},
  {at: 2.8, s: 'soft-whoosh', v: 0.3}, {at: 8.6, s: 'sfx/thud', v: 0.3}, {at: 9.5, s: 'sfx/thud', v: 0.3}, {at: 10.5, s: 'sfx/whoosh', v: 0.25}, {at: 13.2, s: 'deep-hit', v: 0.35},
  {at: 17.0, s: 'soft-whoosh', v: 0.3}, {at: 19.9, s: 'tension', v: 0.2, dur: 2}, {at: 26.0, s: 'sfx/swish', v: 0.3}, {at: 27.8, s: 'sfx/swish', v: 0.3}, {at: 27.4, s: 'tampon', v: 0.45},
  {at: 33.8, s: 'stylo', v: 0.35}, {at: 33.8, s: 'sfx/rise', v: 0.25}, ...flaps(36.8, 16),
  {at: 44.4, s: 'sfx/thud', v: 0.2}, ...rep(44.6, 6, 0.2, 'sfx/thud', 0.16), {at: 45.4, s: 'sfx/thud', v: 0.3}, ...rep(47.6, 14, 0.38, 'tick', 0.14), {at: 51.6, s: 'stylo', v: 0.3},
  ...[59.3, 61.6, 64.5, 71.8].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 68.8, s: 'bass-hit', v: 0.35}, ...[71.8, 72.7, 73.6].map((a) => ({at: a, s: 'sfx/ding', v: 0.15})),
  {at: 93.7, s: 'tension', v: 0.2, dur: 3}, ...rep(97.1, 6, 0.4, 'sfx/pop', 0.14), {at: 100.2, s: 'soft-whoosh', v: 0.35}, ...rep(103.6, 3, 0.5, 'sfx/swish', 0.2), {at: 112.2, s: 'tampon', v: 0.5},
  {at: 116.4, s: 'sfx/thud', v: 0.3}, ...[118.4, 118.7, 119.0, 119.3].map((a) => ({at: a, s: 'stylo', v: 0.18})), {at: 123.9, s: 'deep-hit', v: 0.35}, {at: 125.5, s: 'soft-whoosh', v: 0.3}, {at: 126.2, s: 'sfx/rise', v: 0.3},
  {at: 132.0, s: 'soft-whoosh', v: 0.3}, {at: 136.0, s: 'cadenas', v: 0.2}, {at: 137.1, s: 'tension', v: 0.2, dur: 2.5}, {at: 139.7, s: 'sfx/swish', v: 0.35},
  {at: 155.8, s: 'soft-whoosh', v: 0.3}, {at: 161.0, s: 'sfx/thud', v: 0.3}, {at: 165.2, s: 'tampon', v: 0.45}, {at: 168.6, s: 'sfx/thud', v: 0.35}, {at: 169.3, s: 'tampon', v: 0.4},
  {at: 172.0, s: 'sfx/thud', v: 0.3}, {at: 179.2, s: 'bass-hit', v: 0.4}, {at: 184.0, s: 'riser', v: 0.25, dur: 1.4}, {at: 185.3, s: 'sfx/thud', v: 0.35}, {at: 191.9, s: 'sfx/ding', v: 0.2}, {at: 204.6, s: 'riser', v: 0.25, dur: 1.4}, {at: 205.9, s: 'bass-hit', v: 0.45},
  {at: 212.8, s: 'deep-hit', v: 0.4}, {at: 216.8, s: 'sfx/swish', v: 0.25}, {at: 218.4, s: 'sfx/swish', v: 0.25}, {at: 219.9, s: 'sfx/thud', v: 0.3}, {at: 224.7, s: 'sfx/ding', v: 0.2}, {at: 226.9, s: 'sfx/pop', v: 0.2}, {at: 230.9, s: 'sfx/swish', v: 0.3},
  {at: 239.6, s: 'sfx/thud', v: 0.3}, ...[247.4, 249.1, 251.3].map((a) => ({at: a, s: 'sfx/whoosh', v: 0.25})), {at: 251.6, s: 'deep-hit', v: 0.35}, {at: 254.2, s: 'validation', v: 0.3},
  {at: 263.6, s: 'sfx/swish', v: 0.35}, {at: 264.0, s: 'sfx/rise', v: 0.3}, {at: 268.9, s: 'sfx/swish', v: 0.3}, ...[269.6, 271.6, 272.6].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})),
  {at: 280.0, s: 'sfx/pop', v: 0.2}, {at: 283.4, s: 'sfx/swish', v: 0.3}, {at: 284.4, s: 'sfx/thud', v: 0.4}, {at: 285.0, s: 'sfx/swish', v: 0.25}, {at: 286.9, s: 'cadenas', v: 0.45}, {at: 287.0, s: 'validation', v: 0.35}, {at: 288.6, s: 'sfx/rise', v: 0.25},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const ArbreCauses: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={16.2}><Intro /></Gate>
    <Gate from={16.15} to={29.5}><IdeeRecue /></Gate>
    <Gate from={29.45} to={38.25}><Outil /></Gate>
    <Gate from={40.8} to={54.4}><Logique /></Gate>
    <Gate from={54.35} to={80.35}><Etapes /></Gate>
    <Gate from={82.9} to={114.7}><Rigueur /></Gate>
    <Gate from={114.65} to={142.75}><Pourquoi /></Gate>
    <Gate from={145.3} to={170.65}><Scenario /></Gate>
    <Gate from={170.6} to={212.0}><Descente /></Gate>
    <Gate from={211.95} to={232.4}><Racine /></Gate>
    <Gate from={234.95} to={258.5}><Faille /></Gate>
    <Gate from={258.45} to={274.4}><Organisme /></Gate>
    <Gate from={274.35} to={OUTRO_AT}><Final /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.45}><Loupe i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={291.0}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-arbre-causes-origine.m4a')} trimAfter={s(291.2)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Blinds, Word, Link, TEAL];

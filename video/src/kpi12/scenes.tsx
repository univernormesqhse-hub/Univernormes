import React from 'react';
import {AbsoluteFill, random} from 'remotion';
import {F} from '../iso/ui';
import {sansFont} from '../theme';
import {Abs, Board, BLUE, Chip, DIM, easeIn, easeInOut, easeOut, GREEN, Hand, INK, lerp, Mark, ORANGE, Photo, pop, prog, RED, Row, Sc, spring, T, Title, useT, VIO, YEL} from './kit';

/* ─────────── INTRO : rétroviseur contre phares ─────────── */
const Split: React.FC = () => {
  const t = useT();
  const l = spring(t, 1.1, 6, 11), r = spring(t, 2.7, 6, 11);
  return (
    <AbsoluteFill>
      <Abs x={60} y={400} w={460} h={900} style={{transform: `translateX(${(1 - l) * -600}px)`, background: '#fff', borderRadius: 30, border: `6px solid ${RED}`, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 30, boxSizing: 'border-box', gap: 20}}>
        <svg width={360} height={200}><rect x={10} y={30} width={340} height={140} rx={70} fill="#33415F" /><rect x={30} y={48} width={300} height={104} rx={52} fill="#9CC1FF" /><path d="M 60 140 L 150 80 L 220 120 L 300 70 L 300 140 Z" fill="#6E8FC4" /></svg>
        <T size={110} color={RED}>6</T>
        <T size={46} color={RED}>RÉACTIFS</T>
        <Hand size={40} color={DIM} style={{textAlign: 'center'}}>le rétroviseur : ce qui est arrivé</Hand>
      </Abs>
      <Abs x={560} y={400} w={460} h={900} style={{transform: `translateX(${(1 - r) * 600}px)`, background: '#fff', borderRadius: 30, border: `6px solid ${GREEN}`, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 30, boxSizing: 'border-box', gap: 20}}>
        <svg width={360} height={200}><circle cx={90} cy={100} r={60} fill={YEL} stroke={INK} strokeWidth={6} /><path d="M 160 70 L 350 20 L 350 180 L 160 130 Z" fill={`${YEL}88`} /></svg>
        <T size={110} color={GREEN}>6</T>
        <T size={46} color={GREEN}>PROACTIFS</T>
        <Hand size={40} color={DIM} style={{textAlign: 'center'}}>les phares : ce qu’on anticipe</Hand>
      </Abs>
      {t > 4.0 && <Row y={1360}><div style={{opacity: pop(t, 4.0)}}><Board cell={58} t={t} nums force={prog(t, 4.0, 5.2)} /></div></Row>}
    </AbsoluteFill>
  );
};
export const Intro: React.FC = () => <Sc a={2.6} b={6.4}><Split /></Sc>;

/* ─────────── Carte indicateur commune ─────────── */
type Ind = {at: number; end: number; k: number; name: string; ph: string; pos?: string; Anim: React.FC};
const IndCard: React.FC<{d: Ind}> = ({d}) => {
  const t = useT();
  const pro = d.k >= 6;
  const c = pro ? GREEN : RED;
  const n = (d.k % 6) + 1;
  const ph = prog(t, d.at, d.at + 0.5, easeOut);
  return (
    <AbsoluteFill>
      <Abs x={60} y={320} w={960} h={230} style={{display: 'flex', alignItems: 'center', gap: 30}}>
        <div style={{width: 190, height: 190, borderRadius: 40, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${(1 - spring(t, d.at, 6, 11)) * -90}deg) scale(${spring(t, d.at, 6, 11)})`, boxShadow: `0 16px 34px ${c}55`, flex: '0 0 auto'}}>
          <T size={140} color="#fff">{n}</T>
        </div>
        <div>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, letterSpacing: 4, color: c}}>INDICATEUR {pro ? 'PROACTIF' : 'RÉACTIF'}</div>
          <T size={d.name.length > 40 ? 44 : 52} style={{marginTop: 6, opacity: pop(t, FILLAT(d.k) - 0.2)}}>{d.name}</T>
        </div>
      </Abs>
      <Photo src={d.ph} x={60} y={600} w={960} h={470} pos={d.pos ?? '50% 45%'} q={0.9 + ph * 0.1} o={ph} />
      <Abs x={60} y={1100} w={960} h={420} style={{background: '#fff', borderRadius: 30, border: `4px solid ${c}33`, overflow: 'hidden', opacity: pop(t, d.at + 0.3)}}>
        <d.Anim />
      </Abs>
    </AbsoluteFill>
  );
};
const FILLAT = (k: number) => [11.0, 14.6, 18.1, 22.7, 26.4, 30.0, 37.9, 42.0, 46.2, 50.4, 54.6, 59.3][k];

/* ─────────── Les 12 micro-animations ─────────── */
const W = 960, H = 420;
/** R1 — Fréquence : un métronome bat la mesure, chaque battement allume un trait. */
const Metronome: React.FC = () => {
  const t = useT();
  const a = Math.sin(t * 5) * 30;
  return (
    <svg width={W} height={H}>
      <path d="M 380 380 L 580 380 L 520 80 L 440 80 Z" fill="#7A5A3A" stroke={INK} strokeWidth={6} />
      <g transform={`rotate(${a} 480 340)`}><line x1={480} y1={340} x2={480} y2={60} stroke={INK} strokeWidth={10} /><rect x={455} y={130} width={50} height={40} rx={8} fill={RED} /></g>
      {Array.from({length: 8}, (_, i) => <rect key={i} x={640 + i * 36} y={200 - (i % 3) * 30} width={22} height={60 + (i % 3) * 30} rx={6} fill={i <= Math.floor(t * 1.6) % 9 ? RED : '#E3E6EC'} />)}
      <text x={120} y={220} fontFamily="Montserrat" fontWeight={900} fontSize={44} fill={INK}>avec arrêt</text>
    </svg>
  );
};
/** R2 — Gravité : une enclume tombe sur le plateau, qui s'enfonce. */
const Anvil: React.FC = () => {
  const t = useT();
  const f = prog(t, 14.9, 15.4, easeIn);
  const dip = spring(t, 15.4, 8, 18) * 60;
  return (
    <svg width={W} height={H}>
      <rect x={300} y={300 + dip} width={360} height={24} rx={10} fill={INK} />
      <line x1={480} y1={324 + dip} x2={480} y2={410} stroke={INK} strokeWidth={14} />
      <g transform={`translate(0 ${lerp(-260, 0, f) + dip})`}>
        <path d="M 360 290 L 600 290 L 580 240 L 640 210 L 640 180 L 320 180 L 320 210 L 380 240 Z" fill="#55607A" stroke={INK} strokeWidth={6} />
        <text x={480} y={232} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={36} fill="#fff">GRAVITÉ</text>
      </g>
      {f >= 1 && <text x={760} y={260} fontFamily="Montserrat" fontWeight={900} fontSize={60} fill={RED} opacity={pop(t, 15.4)}>BOUM</text>}
    </svg>
  );
};
/** R3 — Presque-accident : la caisse tombe… et s'arrête net au-dessus du casque. */
const Near: React.FC = () => {
  const t = useT();
  const f = prog(t, 18.0, 18.7, easeIn) * 0.86;
  const frozen = t > 18.7;
  return (
    <AbsoluteFill>
      <Abs x={420} y={250}><F n="casque" size={130} /></Abs>
      <Abs x={400} y={lerp(-200, 120, f / 0.86) - (frozen ? Math.sin(t * 30) * 2 : 0)} w={170} h={130} style={{background: '#C08A4A', border: `6px solid ${INK}`, borderRadius: 10, backgroundImage: `linear-gradient(45deg, transparent 46%, ${INK} 46% 54%, transparent 54%)`}} />
      {frozen && <Abs x={640} y={120} style={{transform: `rotate(8deg) scale(${spring(t, 18.7)})`}}><Chip c={ORANGE} size={46}>PRESQUE !</Chip></Abs>}
      {t > 19.6 && <Abs x={60} y={300} style={{opacity: pop(t, 19.6)}}><Chip c={RED} light size={32}>+ incidents significatifs</Chip></Abs>}
    </AbsoluteFill>
  );
};
/** R4 — Non-conformité qualité : sur le tapis, un produit est rejeté d'un coup de tampon. */
const Reject: React.FC = () => {
  const t = useT();
  const off = (t - 21.5) * 140;
  const st = spring(t, 23.6, 8, 16);
  return (
    <AbsoluteFill>
      <Abs x={0} y={300} w={W} h={40} style={{background: `repeating-linear-gradient(90deg, #8C9AB8 0 30px, #A9B4CC 30px 60px)`, backgroundPosition: `${off}px 0`}} />
      {Array.from({length: 6}, (_, i) => {
        const x = ((i * 190 + off) % 1140) - 180;
        const bad = i === 2;
        const kick = bad && t > 23.8 ? prog(t, 23.8, 24.4, easeIn) : 0;
        return <div key={i} style={{position: 'absolute', left: x, top: 180 - kick * -200, width: 120, height: 120, borderRadius: 16, background: bad && t > 23.6 ? RED : BLUE, border: `5px solid ${INK}`, transform: `rotate(${kick * 60}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40}}>{bad && t > 23.6 ? 'NC' : '✓'}</div>;
      })}
      {t > 23.4 && <Abs x={520} y={30} style={{transform: `scale(${st}) rotate(-10deg)`, border: `6px solid ${RED}`, borderRadius: 14, padding: '4px 18px'}}><T size={44} color={RED}>NON CONFORME</T></Abs>}
    </AbsoluteFill>
  );
};
/** R5 — Incident environnemental : la flaque se répand, puis un boudin la confine. */
const Spill: React.FC = () => {
  const t = useT();
  const g = prog(t, 26.4, 27.6, easeOut);
  const ring = prog(t, 27.4, 28.0);
  const pts = Array.from({length: 16}, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    const r = (40 + g * 170) * (0.8 + random(`s${i}`) * 0.4) + Math.sin(t * 3 + i) * 4;
    return `${480 + Math.cos(a) * r * 1.6},${240 + Math.sin(a) * r * 0.6}`;
  });
  return (
    <svg width={W} height={H}>
      <polygon points={pts.join(' ')} fill="#7CC95A" stroke="#4E9A36" strokeWidth={6} />
      <ellipse cx={480} cy={240} rx={340 * ring} ry={150 * ring} fill="none" stroke={ORANGE} strokeWidth={22} strokeDasharray="40 12" />
      <g transform="translate(120 40) rotate(-25)"><rect width={130} height={170} rx={20} fill={GREEN} stroke={INK} strokeWidth={6} /></g>
    </svg>
  );
};
/** R6 — Non-conformité réglementaire / d'audit : le marteau frappe le recueil. */
const Gavel: React.FC = () => {
  const t = useT();
  const hit = Math.max(0, Math.sin(Math.max(0, t - 30.8) * 7));
  return (
    <svg width={W} height={H}>
      <rect x={180} y={260} width={300} height={110} rx={14} fill={BLUE} stroke={INK} strokeWidth={6} />
      <text x={330} y={330} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={30} fill="#fff">RÉGLEMENTATION</text>
      <g transform={`rotate(${-30 + hit * 30} 700 300)`}>
        <rect x={520} y={150} width={200} height={90} rx={20} fill="#8A5A2B" stroke={INK} strokeWidth={6} />
        <rect x={610} y={235} width={24} height={170} rx={10} fill="#8A5A2B" stroke={INK} strokeWidth={6} />
      </g>
      <rect x={480} y={330} width={150} height={40} rx={8} fill="#6B4420" />
      {t > 31.4 && <text x={680} y={90} fontFamily="Montserrat" fontWeight={900} fontSize={40} fill={RED}>+ AUDITS</text>}
    </svg>
  );
};
/** P1 — Inspections : la loupe balaie la grille de contrôle et coche au passage. */
const Inspect: React.FC = () => {
  const t = useT();
  const x = lerp(80, 860, prog(t, 38.0, 39.8, easeInOut));
  return (
    <AbsoluteFill>
      {Array.from({length: 10}, (_, i) => {
        const cx = 90 + i * 85;
        return <div key={i} style={{position: 'absolute', left: cx, top: 180, width: 64, height: 64, borderRadius: 12, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GREEN, fontSize: 48, fontWeight: 900, background: cx < x ? `${GREEN}22` : '#fff'}}>{cx < x ? '✓' : ''}</div>;
      })}
      <Abs x={x - 80} y={110} style={{transform: 'rotate(-20deg)'}}><F n="loupe" size={190} /></Abs>
    </AbsoluteFill>
  );
};
/** P2 — Formations obligatoires : la salle se remplit, place par place. */
const Class: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Abs x={60} y={40} w={300} h={180} style={{background: '#22352B', borderRadius: 12, border: '10px solid #8A5A2B', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={34} color="#fff">FORMATION</T></Abs>
      {Array.from({length: 12}, (_, i) => {
        const on = t > 42.4 + i * 0.12;
        return <div key={i} style={{position: 'absolute', left: 420 + (i % 6) * 85, top: 70 + Math.floor(i / 6) * 150, width: 70, textAlign: 'center'}}>
          <div style={{transform: `scale(${on ? spring(t, 42.4 + i * 0.12) : 0})`}}><F n={i % 3 ? 'salarie' : 'salariee'} size={70} /></div>
          <div style={{height: 16, borderRadius: 6, background: on ? GREEN : '#E3E6EC'}} />
        </div>;
      })}
      <Abs x={60} y={260}><Chip c={GREEN} light size={32}>Obligatoires ✓</Chip></Abs>
    </AbsoluteFill>
  );
};
/** P3 — Évaluations des risques : la matrice 5×5 s'allume du vert au rouge. */
const Matrix: React.FC = () => {
  const t = useT();
  const col = (s: number) => (s < 3 ? GREEN : s < 5 ? YEL : s < 7 ? ORANGE : RED);
  return (
    <AbsoluteFill>
      {Array.from({length: 25}, (_, i) => {
        const x = i % 5, y = Math.floor(i / 5);
        const s = x + (4 - y);
        const on = t > 46.4 + s * 0.12;
        return <div key={i} style={{position: 'absolute', left: 280 + x * 82, top: 20 + y * 78, width: 74, height: 70, borderRadius: 10, background: on ? col(s) : '#E3E6EC', transform: `scale(${on ? 1 : 0.8})`}} />;
      })}
      <Abs x={60} y={180} style={{transform: 'rotate(-90deg)'}}><T size={26} color={DIM}>GRAVITÉ</T></Abs>
      <Abs x={330} y={400 - 10}><T size={26} color={DIM}>PROBABILITÉ</T></Abs>
      <Abs x={740} y={150}><F n="cible" size={140} /></Abs>
    </AbsoluteFill>
  );
};
/** P4 — Actions correctives : la carte file vers « Terminé » avant le drapeau de l'échéance. */
const Kanban: React.FC = () => {
  const t = useT();
  const p = prog(t, 50.6, 52.2, easeInOut);
  const cols = ['À FAIRE', 'EN COURS', 'TERMINÉ'];
  return (
    <AbsoluteFill>
      {cols.map((c, i) => <div key={c} style={{position: 'absolute', left: 30 + i * 250, top: 30, width: 230, height: 360, borderRadius: 18, background: [`${BLUE}18`, `${YEL}22`, `${GREEN}22`][i], paddingTop: 14, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>{c}</div>)}
      <Abs x={lerp(50, 550, p)} y={120} w={190} h={150} style={{background: '#fff', borderRadius: 14, border: `5px solid ${p > 0.99 ? GREEN : ORANGE}`, padding: 14, boxSizing: 'border-box', boxShadow: '0 10px 20px rgba(0,0,0,0.12)'}}>
        <T size={24}>Action corrective</T>
        {p > 0.99 && <T size={50} color={GREEN} style={{marginTop: 6}}>✓</T>}
      </Abs>
      <Abs x={800} y={60} style={{textAlign: 'center'}}><F n="chrono" size={110} /><T size={26} color={p > 0.99 ? GREEN : RED} style={{marginTop: 10}}>{p > 0.99 ? 'dans les délais' : 'échéance'}</T></Abs>
    </AbsoluteFill>
  );
};
/** P5 — Maintenance préventive critique : la clé serre l'engrenage, le calendrier se coche. */
const Maint: React.FC = () => {
  const t = useT();
  const g = (t - 53.5) * 60;
  return (
    <AbsoluteFill>
      <Abs x={120} y={60} style={{transform: `rotate(${g}deg)`}}><F n="engrenage" size={260} /></Abs>
      <Abs x={260} y={40} style={{transform: `rotate(${-20 + Math.sin(t * 4) * 18}deg)`, transformOrigin: '0 100%'}}><F n="cle" size={180} /></Abs>
      <Abs x={560} y={60} w={340} h={300} style={{background: '#fff', borderRadius: 16, border: `5px solid ${INK}`, overflow: 'hidden'}}>
        <div style={{height: 60, background: VIO, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={26} color="#fff">PLANNING</T></div>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, padding: 14}}>
          {Array.from({length: 12}, (_, i) => <div key={i} style={{width: 68, height: 44, borderRadius: 8, background: t > 54.8 + i * 0.15 ? `${GREEN}33` : '#F1F2F5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: GREEN, fontWeight: 900, fontSize: 28}}>{t > 54.8 + i * 0.15 ? '✓' : ''}</div>)}
        </div>
      </Abs>
    </AbsoluteFill>
  );
};
/** P6 — Audits internes et contrôles de conformité : la liste se coche, tampon « CONFORME ». */
const Audit: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Abs x={120} y={30} w={420} h={370} style={{background: '#fff', borderRadius: 16, border: `5px solid ${INK}`, padding: 24, boxSizing: 'border-box'}}>
        <div style={{position: 'absolute', left: 160, top: -20, width: 100, height: 40, borderRadius: 10, background: '#8C9AB8'}} />
        {['Audit interne', 'Contrôle 1', 'Contrôle 2', 'Contrôle 3'].map((l, i) => (
          <div key={l} style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: i ? 26 : 30}}>
            <div style={{width: 46, height: 46, borderRadius: 10, border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GREEN, fontSize: 38, fontWeight: 900}}>{t > 59.6 + i * 0.4 ? '✓' : ''}</div>
            <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 28, color: INK}}>{l}</div>
          </div>
        ))}
      </Abs>
      {t > 61.6 && <Abs x={560} y={140} style={{transform: `rotate(-12deg) scale(${spring(t, 61.6, 8, 16)})`, border: `7px solid ${GREEN}`, borderRadius: 16, padding: '6px 22px'}}><T size={60} color={GREEN}>CONFORME</T></Abs>}
    </AbsoluteFill>
  );
};

const IND: Ind[] = [
  {at: 9.6, end: 13.4, k: 0, name: 'Taux de fréquence des accidents avec arrêt', ph: 'incident/chute-entrepot.jpg', Anim: Metronome},
  {at: 13.3, end: 16.8, k: 1, name: 'Taux de gravité des accidents', ph: 'incident/blessure-soins.jpg', Anim: Anvil},
  {at: 16.7, end: 21.5, k: 2, name: 'Presque-accidents et incidents significatifs', ph: 'incident/chute-echelle.jpg', Anim: Near},
  {at: 21.4, end: 25.2, k: 3, name: 'Non-conformités qualité', ph: 'iso26/audit-checklist.jpg', Anim: Reject},
  {at: 25.1, end: 28.9, k: 4, name: 'Incidents environnementaux', ph: 'smi/fumees.jpg', Anim: Spill},
  {at: 28.8, end: 33.1, k: 5, name: 'Non-conformités réglementaires ou d’audit', ph: 'iso26/rapport-audit.jpg', Anim: Gavel},
  {at: 36.6, end: 40.8, k: 6, name: 'Taux de réalisation des inspections QHSE', ph: 'promo/terrain-controle.jpg', Anim: Inspect},
  {at: 40.7, end: 44.9, k: 7, name: 'Taux de réalisation des formations obligatoires', ph: 'promo/formation-incendie.jpg', Anim: Class},
  {at: 44.8, end: 49.2, k: 8, name: 'Taux de réalisation des évaluations des risques', ph: 'arsenal/risk.jpg', Anim: Matrix},
  {at: 49.1, end: 53.5, k: 9, name: 'Clôture des actions correctives dans les délais', ph: 'promo/audit-reunion.jpg', Anim: Kanban},
  {at: 53.4, end: 58.1, k: 10, name: 'Maintenance préventive critique réalisée', ph: 'promo/hse-machine.jpg', Anim: Maint},
  {at: 58.0, end: 63.2, k: 11, name: 'Audits internes et contrôles de conformité', ph: 'induction/reunion-audit.jpg', Anim: Audit},
];

/** Mini-intro de partie : rétroviseur (réactifs) ou phares (proactifs). */
const PartIntro: React.FC<{pro: boolean}> = ({pro}) => {
  const t = useT();
  const at = pro ? 35.3 : 8.5;
  return (
    <AbsoluteFill>
      <Title y={760} size={66}>{pro ? <>On <Mark c={GREEN} p={prog(t, at, at + 0.5)}>anticipe</Mark></> : <>On <Mark c={RED} p={prog(t, at, at + 0.5)}>constate</Mark></>}</Title>
      <Row y={900}><Hand size={50} color={DIM}>{pro ? 'des indicateurs qui préviennent' : 'des indicateurs qui mesurent l’après'}</Hand></Row>
    </AbsoluteFill>
  );
};

export const P1: React.FC = () => (
  <AbsoluteFill>
    <Sc a={8.4} b={9.7}><PartIntro pro={false} /></Sc>
    {IND.slice(0, 6).map((d) => <Sc key={d.k} a={d.at} b={d.end}><IndCard d={d} /></Sc>)}
  </AbsoluteFill>
);
export const P2: React.FC = () => (
  <AbsoluteFill>
    <Sc a={35.2} b={36.7}><PartIntro pro /></Sc>
    {IND.slice(6).map((d) => <Sc key={d.k} a={d.at} b={d.end}><IndCard d={d} /></Sc>)}
  </AbsoluteFill>
);

/** Fin : le tableau complet + appel au message. */
const Cta: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Title y={360} size={58}>Ton tableau de bord QHSE</Title>
      <Row y={520}><div style={{transform: `scale(${spring(t, 63.2, 6, 11)})`}}><Board cell={120} t={t} nums force={1} /></div></Row>
      <Row y={940} gap={20}>
        <Chip c={RED} light size={34}>6 réactifs</Chip><T size={50}>+</T><Chip c={GREEN} light size={34}>6 proactifs</Chip>
      </Row>
      {t > 64.3 && <Row y={1100}><div style={{transform: `scale(${spring(t, 64.3)})`}}><Chip c={BLUE} light size={42}>💬 Besoin d’un accompagnement ? Écris-moi</Chip></div></Row>}
    </AbsoluteFill>
  );
};
export const End: React.FC = () => <Sc a={63.1} b={67.0}><Cta /></Sc>;

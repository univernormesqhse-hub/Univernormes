import React from 'react';
import {AbsoluteFill} from 'remotion';
import {F} from '../iso/ui';
import {handFont} from '../theme';
import {Abs, BLUE, Chip, DIM, easeIn, easeInOut, easeOut, GREEN, Hand, INK, lerp, Mark, ORANGE, PH, Photo, PlanSheet, pop, prog, RED, Row, Sc, spring, T, Title, useT, VIO, YEL} from './kit';

/* ─────────── INTRO ─────────── */

/** Les problèmes s'empilent, puis le manager distribue les tâches comme des cartes. */
const Pile: React.FC = () => {
  const t = useT();
  const P = [
    {at: 0.74, l: 'Accidents', ph: 'incident/chute-entrepot.jpg', c: RED},
    {at: 1.54, l: 'Non-conformités', ph: 'iso26/audit-checklist.jpg', c: ORANGE},
    {at: 2.54, l: 'Problèmes récurrents', ph: 'promo/hse-machine.jpg', c: VIO},
  ];
  const deal = t > 4.6;
  return (
    <AbsoluteFill>
      {P.map((p, i) => {
        const d = spring(t, p.at + 0.05, 6, 11);
        return (
          <Photo key={i} src={p.ph} x={140 + i * 40} y={420 + i * 150} w={760} h={420} r={(i - 1) * 4} q={d * (deal ? 0.82 : 1)} o={deal ? 1 - prog(t, 4.6, 5.0) * 0.7 : 1}>
            <div style={{position: 'absolute', left: 20, bottom: 20}}><Chip c={p.c} light size={38}>{p.l}</Chip></div>
          </Photo>
        );
      })}
      {deal && ['Décisions', 'Tâches', 'Actions correctives'].map((l, i) => {
        const at = 4.8 + i * 1.2;
        const p = prog(t, at, at + 0.5, easeOut);
        return <Abs key={l} x={lerp(380, 70 + i * 330, p)} y={lerp(1600, 1140, p)} w={300} h={180} style={{transform: `rotate(${(1 - p) * 120 + (i - 1) * 5}deg)`, background: '#fff', borderRadius: 20, border: `5px solid ${BLUE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: p, boxShadow: '0 16px 30px rgba(20,33,61,0.2)'}}><T size={32}>{l}</T></Abs>;
      })}
    </AbsoluteFill>
  );
};

/** Quelques semaines plus tard : le calendrier s'effeuille… et les problèmes reviennent en boomerang. */
const Boomerang: React.FC = () => {
  const t = useT();
  const wk = Math.min(4, Math.floor(prog(t, 9.6, 11.2, (x) => x) * 4) + 1);
  const b = prog(t, 11.0, 12.6, easeInOut);
  const ang = b * Math.PI * 1.6;
  return (
    <AbsoluteFill>
      <Abs x={340} y={400} w={400} h={300} style={{background: '#fff', borderRadius: 20, border: `5px solid ${INK}`, overflow: 'hidden'}}>
        <div style={{height: 80, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={34} color="#fff">SEMAINE</T></div>
        <div style={{height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={150}>+{wk}</T></div>
      </Abs>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M 160 1300 C 160 800, 980 800, 920 1300" fill="none" stroke={`${RED}55`} strokeWidth={6} strokeDasharray="20 14" />
      </svg>
      <Abs x={540 - Math.cos(ang) * 380 - 90} y={1180 - Math.sin(ang) * 320 - 90} style={{transform: `rotate(${b * 1440}deg)`}}>
        <svg width={180} height={180}><path d="M 20 150 Q 30 30 150 20 L 160 50 Q 70 60 50 160 Z" fill={ORANGE} stroke={INK} strokeWidth={6} /></svg>
      </Abs>
      {t > 12.0 && <Row y={1380}><div style={{transform: `scale(${spring(t, 12.0)})`}}><Chip c={RED} light size={44}>↺ Les mêmes problèmes reviennent</Chip></div></Row>}
    </AbsoluteFill>
  );
};

/** Pourquoi ? Le projecteur se braque sur le plan d'action fissuré. */
const Why: React.FC = () => {
  const t = useT();
  const crack = prog(t, 18.4, 18.9);
  return (
    <AbsoluteFill>
      <Abs x={0} y={380} w={1080} style={{textAlign: 'center'}}><T size={260} color={`${RED}`} style={{opacity: pop(t, 13.3) * (1 - prog(t, 16.2, 16.6)), transform: `scale(${spring(t, 13.3)})`}}>?</T></Abs>
      {t > 16.2 && (
        <AbsoluteFill style={{opacity: pop(t, 16.2)}}>
          <div style={{position: 'absolute', left: 540 - 480, top: 300, width: 960, height: 1300, background: `radial-gradient(ellipse at 50% 55%, ${YEL}55 0%, transparent 60%)`}} />
          <Abs x={290} y={600} w={500} h={640} style={{background: '#fff', borderRadius: 16, border: `5px solid ${INK}`, padding: 40, boxSizing: 'border-box', transform: 'rotate(-3deg)'}}>
            <T size={48} color={RED}>PLAN D’ACTION</T>
            {Array.from({length: 8}, (_, i) => <div key={i} style={{marginTop: 30, height: 14, width: `${50 + (i % 3) * 18}%`, background: '#D5DBE6', borderRadius: 7}} />)}
            <svg width={500} height={640} style={{position: 'absolute', left: 0, top: 0}}><path d="M 250 0 L 220 120 L 290 220 L 230 340 L 300 470 L 260 640" stroke={INK} strokeWidth={6} fill="none" strokeDasharray={800} strokeDashoffset={800 * (1 - crack)} /></svg>
          </Abs>
          <Row y={1300}><Chip c={INK} light size={40}>Le problème vient de là</Chip></Row>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/** La machine à transformer : problèmes, risques, objectifs entrent… des actions concrètes sortent. */
const Machine: React.FC = () => {
  const t = useT();
  const IN = [{at: 25.8, l: 'Problèmes', c: RED}, {at: 27.6, l: 'Risques', c: ORANGE}, {at: 28.9, l: 'Objectifs', c: BLUE}];
  const OUT = [{at: 30.7, l: 'Concrètes'}, {at: 31.4, l: 'Organisées'}, {at: 32.1, l: 'Suivies'}];
  return (
    <AbsoluteFill>
      <Title>Un outil qui <Mark p={prog(t, 25.0, 25.8)}>transforme</Mark></Title>
      {IN.map((p, i) => {
        const d = prog(t, p.at, p.at + 0.9, easeIn);
        return <Abs key={i} x={90 + i * 320} y={lerp(450, 760, d)} style={{opacity: pop(t, p.at - 0.3) * (1 - prog(t, p.at + 0.8, p.at + 1.0)), transform: `scale(${1 - d * 0.5})`}}><Chip c={p.c} light size={36}>{p.l}</Chip></Abs>;
      })}
      <Abs x={190} y={760} w={700} h={360} style={{background: '#33415F', borderRadius: 30, border: `6px solid ${INK}`}}>
        {[0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: 60 + i * 210, top: -60, width: 160, height: 80, background: '#55607A', clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)'}} />)}
        <div style={{position: 'absolute', left: 300, top: 120, width: 100, height: 100, borderRadius: 50, border: `14px dashed ${YEL}`, transform: `rotate(${t * 200}deg)`}} />
        <div style={{position: 'absolute', left: 60, top: 140, width: 60, height: 60, borderRadius: 30, background: t % 0.6 < 0.3 ? GREEN : '#1A2440'}} />
      </Abs>
      {OUT.map((o, i) => {
        const d = prog(t, o.at, o.at + 0.6, easeOut);
        return <Abs key={i} x={120 + i * 290} y={lerp(1000, 1200, d)} w={260} h={120} style={{opacity: d, background: GREEN, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 12px 24px ${GREEN}55`}}><T size={32} color="#fff">✓ {o.l}</T></Abs>;
      })}
      {t > 30.6 && <Row y={1360}><T size={44} style={{opacity: pop(t, 30.6)}}>= des <Mark c={GREEN}>actions</Mark></T></Row>}
    </AbsoluteFill>
  );
};

/** Les 5 touches du clavier : Quoi, Pourquoi, Qui, Quand, Comment vérifier. */
const Keys: React.FC = () => {
  const t = useT();
  const K = [{at: 34.0, l: 'Quoi ?', s: 'l’action'}, {at: 35.1, l: 'Pourquoi ?', s: 'la cause'}, {at: 36.9, l: 'Qui ?', s: 'le responsable'}, {at: 38.1, l: 'Quand ?', s: 'le délai'}, {at: 39.0, l: 'Comment ?', s: 'la vérification'}];
  return (
    <AbsoluteFill>
      <Title>Il précise…</Title>
      {K.map((k, i) => {
        const press = Math.max(0, 1 - Math.abs(t - k.at - 0.1) * 6);
        const on = t > k.at;
        const x = i < 3 ? 70 + i * 320 : 230 + (i - 3) * 320;
        const y = i < 3 ? 520 : 900;
        return (
          <Abs key={i} x={x} y={y + press * 22} w={290} h={300} style={{borderRadius: 30, background: on ? YEL : '#fff', border: `6px solid ${INK}`, boxShadow: `0 ${22 - press * 22}px 0 ${INK}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}>
            <T size={k.l.length > 7 ? 38 : 46}>{k.l}</T>
            <div style={{fontFamily: handFont, fontSize: 38, color: on ? INK : DIM}}>{k.s}</div>
          </Abs>
        );
      })}
    </AbsoluteFill>
  );
};

/** Les étapes : la feuille du plan d'action apparaît, encore vide. */
const Preview: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Title>Les étapes à <Mark c={GREEN} p={prog(t, 46.3, 47.0)}>maîtriser</Mark></Title>
      <Abs x={140} y={470} style={{transform: `scale(${0.9 + spring(t, 41.6, 6, 11) * 0.1})`, opacity: pop(t, 41.6)}}><PlanSheet w={800} filled={0} /></Abs>
    </AbsoluteFill>
  );
};

export const Intro: React.FC = () => (
  <AbsoluteFill>
    <Sc a={0.4} b={9.4}><Pile /></Sc>
    <Sc a={9.3} b={13.2}><Boomerang /></Sc>
    <Sc a={13.1} b={20.1}><Why /></Sc>
    <Sc a={20.0} b={33.8}><Machine /></Sc>
    <Sc a={33.7} b={41.4}><Keys /></Sc>
    <Sc a={41.3} b={48.2}><Preview /></Sc>
  </AbsoluteFill>
);

/* ─────────── ÉTAPE 1 : identifier et analyser ─────────── */
const SRC = [
  {at: 51.7, l: 'Accident du travail', ph: 'incident/chute-echelle.jpg', c: RED},
  {at: 53.4, l: 'Non-conformité d’audit', ph: 'iso26/rapport-audit.jpg', c: BLUE},
  {at: 55.9, l: 'Presque-accident', ph: 'incident/chute-escalier.jpg', c: ORANGE},
  {at: 57.3, l: 'Risque terrain', ph: 'promo/terrain-controle.jpg', c: GREEN},
];
const Sources: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Title>D’où vient le problème ?</Title>
      {SRC.map((s, i) => {
        const p = pop(t, s.at - 0.2, 0.5);
        return (
          <Photo key={i} src={s.ph} x={60 + (i % 2) * 490} y={450 + Math.floor(i / 2) * 520} w={470} h={490} q={0.7 + p * 0.3} o={p} r={(1 - p) * (i % 2 ? 10 : -10)}>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '50px 18px 16px', background: `linear-gradient(180deg, transparent, ${s.c}EE)`}}><T size={34} color="#fff">{s.l}</T></div>
          </Photo>
        );
      })}
    </AbsoluteFill>
  );
};
/** Ne pas constater seulement : on déterre la plante pour voir la racine. */
const Roots: React.FC = () => {
  const t = useT();
  const dig = prog(t, 61.8, 63.8, easeInOut);
  const ground = 760 - dig * 360;
  return (
    <AbsoluteFill>
      <Title>Constater… ou comprendre ?</Title>
      <div style={{position: 'absolute', left: 0, right: 0, top: ground + 160, height: 1920, background: '#B58A5A'}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <g transform={`translate(0 ${ground - 760})`}>
          <path d="M 540 920 C 540 800, 540 760, 540 700" stroke="#3E8E41" strokeWidth={16} fill="none" />
          <ellipse cx={490} cy={720} rx={60} ry={26} fill="#4CAF50" transform="rotate(-30 490 720)" />
          <ellipse cx={590} cy={700} rx={60} ry={26} fill="#4CAF50" transform="rotate(30 590 700)" />
          <circle cx={540} cy={690} r={34} fill={RED} />
          <path d="M 540 920 C 500 1000, 420 1040, 380 1140 M 540 920 C 560 1020, 640 1060, 700 1160 M 540 920 L 540 1220 M 540 1060 C 600 1100, 640 1160, 640 1240" stroke="#6B4A2B" strokeWidth={10} fill="none" />
        </g>
      </svg>
      <Abs x={600} y={ground - 120} style={{opacity: 1 - dig * 0.4}}><Chip c={RED} light size={32}>Le symptôme</Chip></Abs>
      {dig > 0.6 && <Abs x={0} y={ground + 520} w={1080} style={{textAlign: 'center', transform: `scale(${spring(t, 63.4)})`}}><Chip c={INK} light size={44}>🔍 La cause racine</Chip></Abs>}
      {t > 64.4 && <Row y={1520}><Hand size={44} color="#fff" style={{opacity: pop(t, 64.4)}}>pour éviter qu’il ne se reproduise</Hand></Row>}
    </AbsoluteFill>
  );
};

/* ─────────── ÉTAPE 2 : définir les actions ─────────── */
/** La bonne clé pour la bonne serrure : l'action doit traiter la cause. */
const Lock: React.FC = () => {
  const t = useT();
  const k = prog(t, 71.8, 72.8, easeInOut);
  const open = prog(t, 73.0, 73.4);
  return (
    <AbsoluteFill>
      <Title>Une action qui <Mark c={ORANGE} p={prog(t, 73.2, 73.9)}>traite le problème</Mark></Title>
      <svg width={360} height={460} style={{position: 'absolute', left: 600, top: 560}}>
        <path d={`M 80 220 L 80 ${130 - open * 50} A 100 100 0 0 1 280 ${130 - open * 50} L 280 ${220 - open * 50}`} fill="none" stroke="#8C9AB8" strokeWidth={36} />
        <rect x={30} y={200} width={300} height={240} rx={30} fill={ORANGE} stroke={INK} strokeWidth={8} />
        <circle cx={180} cy={300} r={30} fill={INK} /><rect x={168} y={310} width={24} height={70} fill={INK} />
        <text x={180} y={420} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={30} fill="#fff">CAUSE</text>
      </svg>
      <Abs x={lerp(60, 330, k)} y={830} style={{transform: `rotate(${k > 0.95 ? open * 90 : 0}deg)`, transformOrigin: '100% 50%'}}>
        <svg width={460} height={90}><circle cx={60} cy={45} r={42} fill={YEL} stroke={INK} strokeWidth={8} /><rect x={100} y={34} width={340} height={22} fill={YEL} stroke={INK} strokeWidth={6} /><rect x={380} y={56} width={20} height={26} fill={YEL} stroke={INK} strokeWidth={5} /><rect x={410} y={56} width={20} height={20} fill={YEL} stroke={INK} strokeWidth={5} /></svg>
        <div style={{position: 'absolute', left: 120, top: -54}}><Chip c={INK} light size={26}>ACTION</Chip></div>
      </Abs>
    </AbsoluteFill>
  );
};
/** Chute de hauteur : rappeler les consignes ne suffit pas, le garde-corps se construit. */
const Rail: React.FC = () => {
  const t = useT();
  const cross = prog(t, 79.6, 80.2);
  const C = [{at: 83.8, l: 'Prévues'}, {at: 84.6, l: 'Installées'}, {at: 85.6, l: 'Adaptées'}];
  return (
    <AbsoluteFill>
      <Photo src="epiepc/garde-corps.jpg" x={60} y={330} w={960} h={520} pos="50% 50%">
        <div style={{position: 'absolute', left: 20, top: 20}}><Chip c={RED} light size={32}>Risque de chute de hauteur</Chip></div>
      </Photo>
      <Abs x={60} y={890} w={440} h={240} style={{background: '#fff', borderRadius: 24, border: `4px solid ${DIM}`, display: 'flex', alignItems: 'center', gap: 16, padding: 24, boxSizing: 'border-box', opacity: pop(t, 78.8)}}>
        <F n="megaphone" size={90} /><T size={30} color={DIM}>Rappeler les consignes</T>
        <svg width={440} height={240} style={{position: 'absolute', left: 0, top: 0}}><line x1={30} y1={210} x2={30 + 380 * cross} y2={210 - 180 * cross} stroke={RED} strokeWidth={14} strokeLinecap="round" /></svg>
      </Abs>
      <Abs x={540} y={890} w={480} h={240} style={{background: '#fff', borderRadius: 24, border: `5px solid ${GREEN}`, padding: 20, boxSizing: 'border-box', opacity: pop(t, 81.7)}}>
        <T size={30}>Protections collectives</T>
        <svg width={440} height={150} style={{marginTop: 6}}>
          {[0, 1, 2, 3].map((i) => <rect key={i} x={20 + i * 130} y={30} width={14} height={110 * prog(t, 82.0 + i * 0.25, 82.4 + i * 0.25)} fill={YEL} stroke={INK} strokeWidth={3} transform={`translate(0 ${110 * (1 - prog(t, 82.0 + i * 0.25, 82.4 + i * 0.25))})`} />)}
          <rect x={20} y={40} width={404 * prog(t, 83.0, 83.6)} height={14} fill={YEL} stroke={INK} strokeWidth={3} />
          <rect x={20} y={90} width={404 * prog(t, 83.3, 83.9)} height={14} fill={YEL} stroke={INK} strokeWidth={3} />
        </svg>
      </Abs>
      <Row y={1190} gap={16}>
        {C.map((c) => <div key={c.l} style={{transform: `scale(${spring(t, c.at)})`}}><Chip c={GREEN} light size={36}>✓ {c.l}</Chip></div>)}
      </Row>
    </AbsoluteFill>
  );
};

/* ─────────── ÉTAPE 3 : un responsable ─────────── */
/** Le projecteur désigne une seule personne dans le groupe. */
const Spot: React.FC = () => {
  const t = useT();
  const sx = lerp(200, 540, prog(t, 89.4, 91.0, easeInOut)) + (t < 91 ? Math.sin(t * 3) * 120 : 0);
  return (
    <AbsoluteFill>
      <Title>Un responsable <Mark c={YEL} p={prog(t, 92.6, 93.6)}>clairement identifié</Mark></Title>
      <AbsoluteFill style={{background: `radial-gradient(circle at ${sx}px 900px, transparent 150px, rgba(20,33,61,0.55) 170px)`}} />
      {Array.from({length: 5}, (_, i) => <Abs key={i} x={110 + i * 180} y={800}><F n={['salarie', 'salariee', 'superviseur', 'salariee', 'salarie'][i]} size={160} /></Abs>)}
      {t > 91.4 && <Abs x={440} y={1010} style={{transform: `scale(${spring(t, 91.4)})`}}><Chip c={YEL} size={34}>👤 Responsable : 1 nom</Chip></Abs>}
    </AbsoluteFill>
  );
};
/** La patate chaude : confiée à tout le monde, l'action tombe… réalisée par personne. */
const Potato: React.FC = () => {
  const t = useT();
  const pass = prog(t, 95.4, 97.6, (x) => x) * 4;
  const k = Math.min(3, Math.floor(pass));
  const fr = pass - k;
  const xs = [150, 400, 650, 900];
  const fall = prog(t, 97.6, 98.4, easeIn);
  const x = fall > 0 ? 900 : lerp(xs[k], xs[Math.min(3, k + 1)], fr);
  const y = fall > 0 ? 760 + fall * 560 : 760 - Math.sin(fr * Math.PI) * 220;
  return (
    <AbsoluteFill>
      <Title>Confiée à « tout le monde »…</Title>
      {xs.map((x0, i) => <Abs key={i} x={x0 - 80} y={880}><F n={i % 2 ? 'salariee' : 'salarie'} size={160} /></Abs>)}
      <Abs x={x - 90} y={y} w={180} h={110} style={{background: ORANGE, borderRadius: 18, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${pass * 90 + fall * 120}deg)`}}><T size={28} color="#fff">ACTION</T></Abs>
      {fall > 0.9 && <Row y={1380}><div style={{transform: `scale(${spring(t, 98.4)})`}}><Chip c={RED} light size={44}>…réalisée par personne</Chip></div></Row>}
    </AbsoluteFill>
  );
};

/* ─────────── ÉTAPE 4 : délais et priorités ─────────── */
const Deadline: React.FC = () => {
  const t = useT();
  const line = prog(t, 103.4, 105.0, easeInOut);
  const snooze = t > 107.4 && t < 110.9;
  const push = snooze ? ((t - 107.4) % 1.1) / 1.1 : 0;
  return (
    <AbsoluteFill>
      <Title>Une date de début, une <Mark c={GREEN} p={prog(t, 104.8, 105.6)}>échéance réaliste</Mark></Title>
      <div style={{position: 'absolute', left: 100, top: 640, width: 880 * line, height: 10, borderRadius: 5, background: GREEN}} />
      <Abs x={70} y={540}><F n="epingle" size={90} /></Abs>
      <Abs x={70} y={680}><T size={30}>Début</T></Abs>
      {line > 0.9 && <><Abs x={900} y={520} style={{transform: `scale(${spring(t, 105.0)})`}}><F n="calendrier" size={100} /></Abs><Abs x={860} y={680}><T size={30} color={GREEN}>Échéance</T></Abs></>}
      {t > 107.4 && (
        <Abs x={140} y={830} w={800} h={260} style={{background: '#fff', borderRadius: 26, border: `5px solid ${RED}`, overflow: 'hidden', opacity: pop(t, 107.4)}}>
          <T size={34} style={{position: 'absolute', left: 30, top: 24}}>Action sans délai</T>
          <div style={{position: 'absolute', left: 30 + push * 400, top: 100, width: 240, height: 110, borderRadius: 16, background: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={28} color="#fff">à faire…</T></div>
          <div style={{position: 'absolute', right: 30, top: 110}}><Chip c={RED} light size={30}>⏰ Reporter</Chip></div>
        </Abs>
      )}
    </AbsoluteFill>
  );
};
/** Prioriser : le podium Gravité · Obligations · Urgence. */
const Podium: React.FC = () => {
  const t = useT();
  const P = [{at: 113.1, l: 'Gravité', h: 420, c: RED, x: 390, n: 1}, {at: 114.4, l: 'Obligations', h: 310, c: ORANGE, x: 90, n: 2}, {at: 115.8, l: 'Urgence', h: 230, c: BLUE, x: 690, n: 3}];
  return (
    <AbsoluteFill>
      <Title>Priorise selon…</Title>
      {P.map((p) => {
        const g = spring(t, p.at, 6, 11);
        return (
          <Abs key={p.l} x={p.x} y={1400 - p.h * g} w={300} h={p.h * g} style={{background: p.c, borderRadius: '20px 20px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20, overflow: 'hidden'}}>
            <T size={90} color="#fff">{p.n}</T><T size={32} color="#fff">{p.l}</T>
          </Abs>
        );
      })}
      <div style={{position: 'absolute', left: 60, right: 60, top: 1400, height: 12, background: INK, borderRadius: 6}} />
    </AbsoluteFill>
  );
};

export const Steps1to4: React.FC = () => (
  <AbsoluteFill>
    <Sc a={49.7} b={59.4}><Sources /></Sc>
    <Sc a={59.3} b={66.3}><Roots /></Sc>
    <Sc a={67.9} b={74.8}><Lock /></Sc>
    <Sc a={74.7} b={87.4}><Rail /></Sc>
    <Sc a={89.0} b={94.7}><Spot /></Sc>
    <Sc a={94.6} b={99.6}><Potato /></Sc>
    <Sc a={101.2} b={111.0}><Deadline /></Sc>
    <Sc a={110.9} b={117.6}><Podium /></Sc>
  </AbsoluteFill>
);


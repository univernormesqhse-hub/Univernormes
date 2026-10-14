import React from 'react';
import {AbsoluteFill, Img, random} from 'remotion';
import {F} from '../iso/ui';
import {handFont, sansFont} from '../theme';
import {Abs, BLUE, Chip, Cluster, Dial, DIM, easeIn, easeInOut, easeOut, GREEN, Hand, INK, lerp, Mark, ORANGE, PH, Photo, pop, prog, RED, Row, Sc, spring, T, Title, useT, VIO, YEL} from './kit';

/* ─────────── INTRO ─────────── */

/** Tout le monde en parle : des bulles « tableau de bord ! » fusent de partout. */
const Buzz: React.FC = () => {
  const t = useT();
  const B = [[90, 480, -6], [600, 560, 5], [220, 800, 4], [640, 900, -5], [120, 1120, -3], [560, 1240, 6]];
  return (
    <AbsoluteFill>
      {B.map(([x, y, r], i) => (
        <Abs key={i} x={x} y={y} style={{transform: `rotate(${r}deg) scale(${spring(t, 2.7 + i * 0.22)})`}}>
          <div style={{position: 'relative', background: i % 2 ? '#fff' : YEL, border: `4px solid ${INK}`, borderRadius: 30, padding: '18px 28px', boxShadow: '0 12px 24px rgba(20,33,61,0.15)'}}>
            <T size={34}>{['Tableau de bord !', 'Les KPI…', 'Le dashboard ?', 'Nos indicateurs !', 'Le reporting…', 'Tableau de bord QHSE'][i]}</T>
            <div style={{position: 'absolute', left: 40, bottom: -22, width: 30, height: 30, background: i % 2 ? '#fff' : YEL, borderRight: `4px solid ${INK}`, borderBottom: `4px solid ${INK}`, transform: 'rotate(45deg)'}} />
          </div>
        </Abs>
      ))}
    </AbsoluteFill>
  );
};

/** Deux cartes-questions qui se retournent : QUOI ? puis COMMENT ? */
const Qs: React.FC = () => {
  const t = useT();
  const C = ({at, l, c, y, ic}: {at: number; l: string; c: string; y: number; ic: string}) => {
    const f = prog(t, at - 0.3, at + 0.3, easeInOut);
    return (
      <Abs x={140} y={y} w={800} h={380} style={{perspective: 2000}}>
        <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `rotateX(${(1 - f) * 180}deg)`}}>
          <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: 30, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, boxShadow: `0 24px 50px ${c}55`}}><F n={ic} size={130} /><T size={l.length > 6 ? 92 : 120} color="#fff">{l}</T></div>
          <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateX(180deg)', borderRadius: 30, background: '#fff', border: `5px dashed ${c}`}} />
        </div>
      </Abs>
    );
  };
  return (
    <AbsoluteFill>
      <C at={5.0} l="QUOI ?" c={BLUE} y={460} ic="question" />
      <C at={6.6} l="COMMENT ?" c={GREEN} y={900} ic="outils" />
    </AbsoluteFill>
  );
};

export const Intro: React.FC = () => (
  <AbsoluteFill>
    <Sc a={2.6} b={4.2}><Buzz /></Sc>
    <Sc a={4.1} b={7.9}><Qs /></Sc>
  </AbsoluteFill>
);

/* ─────────── PARTIE 1 : qu'est-ce que c'est ? ─────────── */

/** Poste de pilotage : le volant tourne, la courbe des performances se trace sur le pare-brise. */
const Cockpit: React.FC = () => {
  const t = useT();
  const steer = Math.sin((t - 9.6) * 1.6) * 28;
  const draw = prog(t, 12.1, 13.6, (x) => x);
  const pts = Array.from({length: 30}, (_, i) => `${100 + i * 30},${380 - Math.sin(i * 0.5) * 50 - i * 6 + (random(`c${i}`) - 0.5) * 30}`);
  return (
    <AbsoluteFill>
      <Title>Un <Mark c={BLUE} p={prog(t, 10.0, 10.8)}>outil de pilotage</Mark></Title>
      <Abs x={60} y={450} w={960} h={520} style={{borderRadius: '60px 60px 20px 20px', overflow: 'hidden', border: `10px solid ${INK}`}}>
        <Img src={PH('promo/raffinerie.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(1.05)'}} />
        <svg width={960} height={520} style={{position: 'absolute', inset: 0}}>
          <polyline points={pts.join(' ')} fill="none" stroke={GREEN} strokeWidth={10} strokeLinejoin="round" strokeDasharray={1400} strokeDashoffset={1400 * (1 - draw)} style={{filter: 'drop-shadow(0 0 6px #fff)'}} />
        </svg>
        {draw > 0.3 && <div style={{position: 'absolute', right: 24, top: 24}}><Chip c={GREEN} light size={30}>Suivre les performances</Chip></div>}
      </Abs>
      <Abs x={0} y={940} w={1080} h={300} style={{background: INK, borderRadius: '80px 80px 0 0'}} />
      <Abs x={140} y={1000}><Dial size={170} v={0.3 + Math.sin(t) * 0.05} /></Abs>
      <Abs x={770} y={1000}><Dial size={170} v={0.6 + Math.cos(t * 1.3) * 0.05} /></Abs>
      <svg width={460} height={460} style={{position: 'absolute', left: 310, top: 900, transform: `rotate(${steer}deg)`}}>
        <circle cx={230} cy={230} r={200} fill="none" stroke="#2A3550" strokeWidth={46} />
        <circle cx={230} cy={230} r={200} fill="none" stroke="#3A4C78" strokeWidth={10} />
        <path d="M 30 230 L 430 230 M 230 230 L 230 430" stroke="#2A3550" strokeWidth={40} />
        <circle cx={230} cy={230} r={70} fill={YEL} stroke={INK} strokeWidth={8} />
        <text x={230} y={246} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={44} fill={INK}>QHSE</text>
      </svg>
    </AbsoluteFill>
  );
};

/** Q · H · S · E : quatre fenêtres photo s'ouvrent, chacune avec son cadran. */
const DOM = [
  {at: 14.6, l: 'Qualité', ph: 'iso26/audit-checklist.jpg', c: BLUE, ic: 'medaille'},
  {at: 15.3, l: 'Hygiène', ph: 'soudage/aspirateur-fumees.jpg', c: VIO, ic: 'savon'},
  {at: 16.2, l: 'Sécurité', ph: 'promo/terrain-controle.jpg', c: ORANGE, ic: 'casque'},
  {at: 17.0, l: 'Environnement', ph: 'smi/raffinerie.jpg', c: GREEN, ic: 'pousse'},
];
const Qhse: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Title>Suivre la performance en…</Title>
      {DOM.map((d, i) => {
        const o = prog(t, d.at - 0.25, d.at + 0.35, easeOut);
        const x = 60 + (i % 2) * 490, y = 440 + Math.floor(i / 2) * 520;
        return (
          <Abs key={i} x={x} y={y} w={470} h={490} style={{clipPath: `inset(${(1 - o) * 50}% ${(1 - o) * 50}% round 28px)`}}>
            <Photo src={d.ph} x={0} y={0} w={470} h={490} pos="50% 40%">
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '60px 20px 18px', background: `linear-gradient(180deg, transparent, ${d.c}EE)`, display: 'flex', alignItems: 'center', gap: 12}}><F n={d.ic} size={60} /><T size={38} color="#fff">{d.l}</T></div>
              {t > 18.0 && <div style={{position: 'absolute', right: 16, top: 16, transform: `scale(${spring(t, 18.0 + i * 0.12)})`}}><Dial size={110} v={0.55 + i * 0.08 + Math.sin(t * 2 + i) * 0.03} ticks={false} /></div>}
            </Photo>
          </Abs>
        );
      })}
      {t > 18.0 && <Row y={1490}><Chip c={INK} light size={34} style={{opacity: pop(t, 18.0)}}>à travers des indicateurs précis</Chip></Row>}
    </AbsoluteFill>
  );
};

/** Son objectif en 4 verbes, chacun avec sa micro-animation. */
const Verbs: React.FC = () => {
  const t = useT();
  const V = [
    {at: 21.6, l: 'Mesurer', s: 'les résultats', c: BLUE},
    {at: 23.2, l: 'Détecter', s: 'les écarts', c: ORANGE},
    {at: 24.8, l: 'Anticiper', s: 'les dérives', c: VIO},
    {at: 27.8, l: 'Décider', s: 'les bonnes décisions', c: GREEN},
  ];
  const icon = (i: number, at: number) => {
    const k = Math.max(0, t - at);
    if (i === 0) return <div style={{width: 120, height: 40, borderRadius: 8, background: YEL, border: `4px solid ${INK}`, backgroundImage: `repeating-linear-gradient(90deg, ${INK} 0 3px, transparent 3px 14px)`, transform: `scaleX(${Math.min(1, k * 2)})`, transformOrigin: '0 50%'}} />;
    if (i === 1) return <div style={{position: 'relative', width: 120, height: 120}}>{[0, 1, 2].map((j) => <div key={j} style={{position: 'absolute', inset: 60 - ((k * 60 + j * 20) % 60), borderRadius: '50%', border: `4px solid ${ORANGE}`, opacity: 1 - ((k * 60 + j * 20) % 60) / 60}} />)}<div style={{position: 'absolute', left: 50, top: 50, width: 20, height: 20, borderRadius: 10, background: RED}} /></div>;
    if (i === 2) return <div style={{transform: `rotate(${-20 + Math.min(1, k) * 20}deg)`}}><F n="telescope" size={110} /></div>;
    return <div style={{width: 110, height: 110, borderRadius: 55, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 70, fontWeight: 900, transform: `scale(${spring(t, at)})`}}>✓</div>;
  };
  return (
    <AbsoluteFill>
      <Title>Son <Mark p={prog(t, 20.2, 21.0)}>objectif</Mark></Title>
      {V.map((v, i) => (
        <Abs key={i} x={70} y={440 + i * 260} w={940} h={230} style={{opacity: pop(t, v.at - 0.2), transform: `translateX(${(1 - pop(t, v.at - 0.2)) * 100}px)`, display: 'flex', alignItems: 'center', gap: 34, background: '#fff', borderRadius: 30, padding: '0 40px', boxSizing: 'border-box', borderLeft: `14px solid ${v.c}`, boxShadow: '0 14px 30px rgba(20,33,61,0.12)'}}>
          <div style={{width: 140, display: 'flex', justifyContent: 'center'}}>{icon(i, v.at)}</div>
          <div><T size={60} color={v.c}>{v.l}</T><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 32, color: DIM}}>{v.s}</div></div>
        </Abs>
      ))}
    </AbsoluteFill>
  );
};

export const P1: React.FC = () => (
  <AbsoluteFill>
    <Sc a={9.6} b={13.8}><Cockpit /></Sc>
    <Sc a={13.7} b={20.2}><Qhse /></Sc>
    <Sc a={20.1} b={29.9}><Verbs /></Sc>
  </AbsoluteFill>
);

/* ─────────── PARTIE 2 : les 5 étapes ─────────── */

const STEPS = [
  {at: 34.7, l: 'Objectifs', c: BLUE},
  {at: 38.0, l: 'Indicateurs', c: VIO},
  {at: 42.5, l: 'Fiche indicateur', c: ORANGE},
  {at: 51.9, l: 'Collecte & analyse', c: GREEN},
  {at: 55.2, l: 'Écarts & actions', c: RED},
];
/** Rail de progression : un curseur glisse d'étape en étape. */
const Rail: React.FC = () => {
  const t = useT();
  const cur = STEPS.filter((s) => t >= s.at - 0.3).length - 1;
  return (
    <Abs x={60} y={320} w={960} h={110} style={{opacity: pop(t, 32.6)}}>
      <div style={{position: 'absolute', left: 50, right: 50, top: 40, height: 10, borderRadius: 5, background: '#E3E6EC'}} />
      <div style={{position: 'absolute', left: 50, top: 40, height: 10, borderRadius: 5, background: GREEN, width: `${(Math.max(0, cur) / 4) * 860}px`}} />
      {STEPS.map((s, i) => (
        <div key={i} style={{position: 'absolute', left: 50 + i * 215 - 45, top: 0, width: 90, textAlign: 'center'}}>
          <div style={{width: 90, height: 90, borderRadius: 45, background: i <= cur ? s.c : '#fff', border: `5px solid ${i <= cur ? s.c : '#C9CED8'}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: i <= cur ? '#fff' : DIM, transform: `scale(${i === cur ? 1.15 : 1})`}}>{i + 1}</div>
        </div>
      ))}
    </Abs>
  );
};
const StepTitle: React.FC<{i: number}> = ({i}) => <Abs x={60} y={470} w={960} style={{textAlign: 'center'}}><T size={60} color={STEPS[i].c}>{i + 1}. {STEPS[i].l}</T></Abs>;

/** 1 — Objectifs : la flèche se plante au centre de la cible. */
const Target: React.FC = () => {
  const t = useT();
  const hit = prog(t, 36.0, 36.5, easeIn);
  return (
    <AbsoluteFill>
      <StepTitle i={0} />
      <svg width={700} height={700} style={{position: 'absolute', left: 190, top: 620}}>
        {[300, 230, 160, 90].map((r, k) => <circle key={r} cx={350} cy={350} r={r} fill={k % 2 ? '#fff' : RED} stroke={INK} strokeWidth={6} />)}
        <circle cx={350} cy={350} r={30} fill={YEL} stroke={INK} strokeWidth={6} />
      </svg>
      <Abs x={lerp(1200, 540, hit)} y={lerp(300, 950, hit)} style={{transform: 'rotate(-40deg)', transformOrigin: '0 50%'}}>
        <div style={{width: 360, height: 14, background: INK, borderRadius: 7}} />
        <div style={{position: 'absolute', left: -6, top: -18, width: 0, height: 0, borderTop: '25px solid transparent', borderBottom: '25px solid transparent', borderRight: `40px solid ${INK}`}} />
      </Abs>
      {t > 36.5 && <Row y={1360}><div style={{transform: `scale(${spring(t, 36.5)})`}}><Chip c={BLUE} light size={42}>Définis tes objectifs QHSE</Chip></div></Row>}
    </AbsoluteFill>
  );
};

/** 2 — Indicateurs : les cartes KPI pertinentes glissent, une non pertinente est écartée. */
const KPIS = [
  {l: 'Taux de fréquence', ic: 'graphique', ok: true},
  {l: 'Non-conformités', ic: 'clipboard', ok: true},
  {l: 'Couleur des murs', ic: 'feutre', ok: false},
  {l: 'Déchets triés', ic: 'recyclage', ok: true},
  {l: 'Audits réalisés', ic: 'loupe', ok: true},
];
const Kpi: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <StepTitle i={1} />
      {KPIS.map((k, i) => {
        const at = 38.9 + i * 0.35;
        const out = !k.ok ? prog(t, 40.6, 41.2, easeIn) : 0;
        return (
          <Abs key={i} x={120 + (i % 2) * 40} y={600 + i * 175} w={800} h={150} style={{opacity: pop(t, at) * (1 - out), transform: `translateX(${(1 - pop(t, at)) * 600 + out * 900}px) rotate(${out * 20}deg)`, display: 'flex', alignItems: 'center', gap: 24, background: '#fff', borderRadius: 24, padding: '0 30px', boxSizing: 'border-box', border: `4px solid ${k.ok ? VIO : RED}`}}>
            <F n={k.ic} size={80} /><T size={40} style={{flex: 1}}>{k.l}</T>
            <T size={50} color={k.ok ? GREEN : RED}>{t > 40.4 ? (k.ok ? '✓' : '✗') : ''}</T>
          </Abs>
        );
      })}
      <Row y={1500}><Hand size={44} color={DIM} style={{opacity: pop(t, 40.3)}}>exemples d’indicateurs, à choisir selon tes objectifs</Hand></Row>
    </AbsoluteFill>
  );
};

/** 3 — La fiche d'identité de l'indicateur : 5 champs se remplissent, tampon « VALIDÉ ». */
const FIELDS = [
  {at: 45.5, k: 'Cible', v: 'la valeur à atteindre', ic: 'cible'},
  {at: 46.3, k: 'Méthode de calcul', v: 'la formule', ic: 'equerre'},
  {at: 47.7, k: 'Source de données', v: 'd’où vient l’info', ic: 'dossier'},
  {at: 49.0, k: 'Responsable', v: 'qui le suit', ic: 'superviseur'},
  {at: 50.0, k: 'Fréquence de suivi', v: 'à quel rythme', ic: 'calendrier'},
];
const Card: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <StepTitle i={2} />
      <Abs x={90} y={590} w={900} h={920} style={{background: '#fff', borderRadius: 30, border: `5px solid ${ORANGE}`, boxShadow: '0 30px 60px rgba(20,33,61,0.18)', transform: `rotate(${(1 - spring(t, 42.8, 6, 10)) * -8}deg) scale(${0.9 + spring(t, 42.8, 6, 10) * 0.1})`}}>
        <div style={{height: 110, borderRadius: '24px 24px 0 0', background: ORANGE, display: 'flex', alignItems: 'center', padding: '0 36px', gap: 16}}><F n="carte-id" size={70} /><T size={40} color="#fff">FICHE INDICATEUR</T></div>
        {FIELDS.map((f, i) => {
          const n = Math.floor(prog(t, f.at, f.at + 0.6, (x) => x) * f.v.length);
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 20, padding: '0 36px', height: 150, borderBottom: i < 4 ? '2px dashed #D5DBE6' : 'none', opacity: 0.35 + 0.65 * pop(t, f.at - 0.1)}}>
              <F n={f.ic} size={70} />
              <div style={{flex: 1}}>
                <T size={36}>{f.k}</T>
                <div style={{fontFamily: handFont, fontSize: 40, color: BLUE, minHeight: 44}}>{f.v.slice(0, n)}</div>
              </div>
              <div style={{width: 50, height: 50, borderRadius: 10, border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GREEN, fontSize: 40, fontWeight: 900}}>{t > f.at + 0.6 ? '✓' : ''}</div>
            </div>
          );
        })}
      </Abs>
      {t > 51.0 && <Abs x={600} y={1380} style={{transform: `rotate(-12deg) scale(${spring(t, 51.0)})`, border: `6px solid ${GREEN}`, borderRadius: 14, padding: '4px 20px', background: '#ffffffee'}}><T size={46} color={GREEN}>COMPLÈTE</T></Abs>}
    </AbsoluteFill>
  );
};

/** 4 — Collecte & analyse : les données tombent dans l'entonnoir et ressortent en courbe. */
const Funnel: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <StepTitle i={3} />
      <Photo src="iso26/tablette-matrice.jpg" x={70} y={580} w={420} h={300} pos="50% 50%" />
      <Photo src="iso26/analyste-kpi.jpg" x={590} y={580} w={420} h={300} pos="50% 40%" o={pop(t, 53.6)} />
      <Abs x={70} y={890} w={420} style={{textAlign: 'center'}}><Chip c={GREEN} light size={32}>Collecter</Chip></Abs>
      {t > 53.6 && <Abs x={590} y={890} w={420} style={{textAlign: 'center'}}><Chip c={BLUE} light size={32}>Analyser</Chip></Abs>}
      <svg width={1080} height={700} style={{position: 'absolute', left: 0, top: 960}}>
        <path d="M 300 40 L 780 40 L 600 300 L 600 420 L 480 420 L 480 300 Z" fill="#fff" stroke={INK} strokeWidth={8} />
        <path d="M 340 520 Q 460 470 540 500 T 760 420" stroke={GREEN} strokeWidth={12} fill="none" strokeDasharray={600} strokeDashoffset={600 * (1 - prog(t, 53.8, 54.9))} />
      </svg>
      {Array.from({length: 16}, (_, i) => {
        const at = 52.6 + i * 0.12;
        const p = prog(t, at, at + 0.8, easeIn);
        const sx = 280 + random(`d${i}`) * 520;
        return <div key={i} style={{position: 'absolute', left: lerp(sx, 540, p) - 14, top: lerp(900, 1330, p), width: 28, height: 28, borderRadius: i % 3 ? 14 : 4, background: [BLUE, ORANGE, VIO, GREEN][i % 4], opacity: t > at ? 1 - prog(t, at + 0.7, at + 0.8) : 0}} />;
      })}
    </AbsoluteFill>
  );
};

/** 5 — Comparer à la cible : la barre s'arrête sous la ligne, l'écart est mesuré, le plan d'action se coche. */
const Gap: React.FC = () => {
  const t = useT();
  const bar = prog(t, 56.3, 57.3, easeOut) * 0.72;
  const gap = prog(t, 58.4, 59.0);
  const acts = ['Analyser la cause', 'Définir l’action', 'Fixer un délai'];
  return (
    <AbsoluteFill>
      <StepTitle i={4} />
      <Abs x={140} y={600} w={340} h={760} style={{borderBottom: `6px solid ${INK}`, borderLeft: `6px solid ${INK}`}}>
        <div style={{position: 'absolute', left: 60, bottom: 0, width: 200, height: 700 * bar, borderRadius: '16px 16px 0 0', background: BLUE}} />
        <div style={{position: 'absolute', left: -20, right: -40, top: 60, borderTop: `6px dashed ${GREEN}`}} />
        <div style={{position: 'absolute', right: -150, top: 30, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: GREEN}}>CIBLE</div>
        {gap > 0 && <div style={{position: 'absolute', left: 280, top: 66, height: (700 * 0.72 - 640) * -1 * gap, width: 30, borderTop: `5px solid ${RED}`, borderBottom: `5px solid ${RED}`, borderRight: `5px solid ${RED}`}} />}
        {gap > 0.5 && <div style={{position: 'absolute', left: 80, top: 150, fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: RED}}>ÉCART</div>}
      </Abs>
      {t > 59.9 && (
        <Abs x={560} y={720} w={460} style={{opacity: pop(t, 59.9)}}>
          <div style={{background: '#fff', borderRadius: 24, border: `5px solid ${RED}`, padding: '26px 28px'}}>
            <T size={38}>Plan d’actions</T>
            {acts.map((a, i) => (
              <div key={a} style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 22}}>
                <div style={{width: 44, height: 44, borderRadius: 10, border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GREEN, fontSize: 34, fontWeight: 900}}>{t > 60.3 + i * 0.4 ? '✓' : ''}</div>
                <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 28, color: INK}}>{a}</div>
              </div>
            ))}
          </div>
        </Abs>
      )}
    </AbsoluteFill>
  );
};

export const P2: React.FC = () => (
  <AbsoluteFill>
    <Rail />
    <Sc a={31.9} b={34.7}><Title y={700} size={72}>Voici les <Mark c={GREEN}>5 étapes</Mark></Title></Sc>
    <Sc a={34.6} b={38.0}><Target /></Sc>
    <Sc a={37.9} b={42.5}><Kpi /></Sc>
    <Sc a={42.4} b={51.9}><Card /></Sc>
    <Sc a={51.8} b={55.2}><Funnel /></Sc>
    <Sc a={55.1} b={62.0}><Gap /></Sc>
  </AbsoluteFill>
);

/* ─────────── PARTIE 3 : le piège à éviter ─────────── */

/** Un mur de chiffres décoratifs, barré : présenter ne suffit pas. */
const Wall: React.FC = () => {
  const t = useT();
  const cross = prog(t, 65.3, 65.8);
  const conv = prog(t, 66.6, 67.6, easeInOut);
  return (
    <AbsoluteFill>
      <Title>Pas simplement <Mark c={RED} p={prog(t, 65.3, 65.9)}>présenter des chiffres</Mark></Title>
      {Array.from({length: 60}, (_, i) => {
        const x = 70 + (i % 6) * 160, y = 480 + Math.floor(i / 6) * 95;
        const ch = String(Math.floor(random(`n${i}`) * 900) + 10);
        return <div key={i} style={{position: 'absolute', left: lerp(x, 540, conv), top: lerp(y + Math.sin(t * 2 + i) * 6, 960, conv), fontFamily: 'monospace', fontWeight: 700, fontSize: 44, color: '#9AA3B2', opacity: (1 - conv) * pop(t, 64.0 + (i % 10) * 0.05)}}>{ch}</div>;
      })}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: 1 - conv}}>
        <line x1={120} y1={1400} x2={120 + 840 * cross} y2={1400 - 900 * cross} stroke={RED} strokeWidth={22} strokeLinecap="round" />
      </svg>
      {conv > 0.3 && (
        <Abs x={340} y={760} style={{transform: `scale(${conv}) rotate(${(1 - conv) * 200}deg)`}}>
          <svg width={400} height={400}><circle cx={200} cy={200} r={190} fill="#fff" stroke={INK} strokeWidth={10} /><path d="M 200 40 L 240 200 L 200 360 L 160 200 Z" fill={RED} transform={`rotate(${Math.sin(t * 3) * 8 + 30} 200 200)`} /><circle cx={200} cy={200} r={20} fill={INK} /></svg>
        </Abs>
      )}
      {t > 67.4 && <Row y={1230}><div style={{transform: `scale(${spring(t, 67.4)})`}}><Chip c={GREEN} light size={44}>➜ T’aider à décider</Chip></div></Row>}
    </AbsoluteFill>
  );
};

/** Améliorer en continu : la roue PDCA gravit la pente, calée à chaque tour. */
const Wheel: React.FC = () => {
  const t = useT();
  const p = prog(t, 68.9, 70.8, (x) => x);
  const x = lerp(160, 760, p), y = lerp(1250, 700, p);
  return (
    <AbsoluteFill>
      <Title>Améliorer <Mark c={GREEN} p={prog(t, 69.0, 69.8)}>continuellement</Mark></Title>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M 60 1420 L 1020 820 L 1020 1440 Z" fill="#E3E6EC" stroke={INK} strokeWidth={6} />
      </svg>
      <div style={{position: 'absolute', left: x - 130, top: y - 130 + 60, width: 260, height: 260, transform: `rotate(${p * 540}deg)`}}>
        <svg width={260} height={260}>
          {['P', 'D', 'C', 'A'].map((l, i) => <path key={l} d={`M 130 130 L ${130 + Math.cos((i * Math.PI) / 2) * 125} ${130 + Math.sin((i * Math.PI) / 2) * 125} A 125 125 0 0 1 ${130 + Math.cos(((i + 1) * Math.PI) / 2) * 125} ${130 + Math.sin(((i + 1) * Math.PI) / 2) * 125} Z`} fill={[BLUE, ORANGE, GREEN, VIO][i]} stroke="#fff" strokeWidth={6} />)}
          {['P', 'D', 'C', 'A'].map((l, i) => <text key={l} x={130 + Math.cos(((i + 0.5) * Math.PI) / 2) * 70} y={142 + Math.sin(((i + 0.5) * Math.PI) / 2) * 70} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={42} fill="#fff">{l}</text>)}
        </svg>
      </div>
      <div style={{position: 'absolute', left: x - 175, top: y + 135, width: 70, height: 40, background: INK, clipPath: 'polygon(0 100%, 100% 100%, 100% 0)', transform: 'rotate(-32deg)'}} />
    </AbsoluteFill>
  );
};

/** Appel à l'action : le message part dans la boîte de réception ; les 4 cadrans passent au vert. */
const Cta: React.FC = () => {
  const t = useT();
  const fly = prog(t, 75.2, 75.9, easeIn);
  return (
    <AbsoluteFill>
      <Title size={50}>Besoin d’un <Mark p={prog(t, 71.2, 72.0)}>accompagnement</Mark> ?</Title>
      <Row y={470} gap={18}>
        {['Conception', 'Mise en place'].map((l, i) => <div key={l} style={{opacity: pop(t, 72.1 + i * 0.9)}}><Chip c="#fff" size={36} style={{border: `4px solid ${INK}`}}>{['✏️', '🛠'][i]} {l}</Chip></div>)}
      </Row>
      <Abs x={290} y={640} w={500} h={340} style={{transform: `translate(${fly * 300}px, ${-fly * 400}px) scale(${1 - fly * 0.6}) rotate(${fly * 20}deg)`, opacity: 1 - prog(t, 75.7, 76.0)}}>
        <div style={{position: 'absolute', inset: 0, background: '#fff', borderRadius: 20, border: `6px solid ${INK}`}} />
        <svg width={500} height={340} style={{position: 'absolute', inset: 0}}><path d="M 10 10 L 250 200 L 490 10" fill="none" stroke={INK} strokeWidth={6} /></svg>
        <div style={{position: 'absolute', right: -30, top: -30, width: 90, height: 90, borderRadius: 45, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 74.0)})`}}><T size={44} color="#fff">1</T></div>
      </Abs>
      {t > 74.0 && <Row y={1030}><div style={{transform: `scale(${spring(t, 74.0)})`}}><Chip c={BLUE} light size={44}>💬 Laisse-moi un message en inbox</Chip></div></Row>}
      <Row y={1200}><div style={{opacity: pop(t, 72.5)}}><Cluster size={130} p={prog(t, 72.5, 75.5)} /></div></Row>
    </AbsoluteFill>
  );
};

export const P3: React.FC = () => (
  <AbsoluteFill>
    <Sc a={64.0} b={68.9}><Wall /></Sc>
    <Sc a={68.8} b={70.9}><Wheel /></Sc>
    <Sc a={70.8} b={76.4}><Cta /></Sc>
  </AbsoluteFill>
);


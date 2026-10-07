import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {easeInOut, easeOut, Gate, Kinetic, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Wipe} from '../components/Fx';
import {Backdrop, Card, Check, Chrome, shadow} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, s, sansFont} from '../theme';
import {captions} from './captions';

/**
 * « L'architecture d'une équipe HSE performante » au format UI motion premium
 * (skill video-promo-diagnostic-qhse) : accroche, question bureau ↔ chantier, 6 maillons,
 * organigramme qui se construit, information qui remonte, circuit fermé.
 */
const LOGO = 'promo/logo.png';
const Q = 5.0;
const SIX = 9.82;
const ORG = 11.84;
const CIRCUIT = 57.7;
const OUTRO_AT = 67.0;
export const EQUIPEHSE_FRAMES = s(70.4);
const RED = '#D9443A';
const BLUE = '#3D7DD8';

/* ── 1. Accroche : les règles s'empilent… ── */
const Hook: React.FC = () => {
  const t = useT();
  const rules = ['Règlement intérieur', 'Procédure n° 12', 'Consigne de sécurité', 'Note de service', 'Mode opératoire', 'Affichage obligatoire'];
  const strike = prog(t, 3.5, 4.0, easeOut);
  return (
    <AbsoluteFill>
      <Kinetic text="Gérer la *sécurité*…" at={0.1} until={2.85} y={400} size={92} />
      <Kinetic text="ce n'est pas *empiler* des règles" at={2.9} y={400} size={80} accent={RED} />
      {rules.map((r, k) => {
        const at = 0.5 + k * 0.42;
        const p = prog(t, at, at + 0.4, easeOut);
        return (
          <div key={r} style={{position: 'absolute', left: 540 - 330, top: 1180 - k * 95, width: 660, height: 120, borderRadius: 24, background: '#fff', boxShadow: shadow, display: 'flex', alignItems: 'center', gap: 18, padding: '0 28px', opacity: p, transform: `translateY(${(1 - p) * -200}px) rotate(${(k % 2 ? 2 : -2) * p}deg)`}}>
            <F n="memo" size={60} />
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 36, color: colors.navy}}>{r}</div>
          </div>
        );
      })}
      {strike > 0 && <div style={{position: 'absolute', left: 150, top: 960, width: 780 * strike, height: 18, borderRadius: 9, background: RED, transform: 'rotate(-14deg)', transformOrigin: 'left center'}} />}
    </AbsoluteFill>
  );
};

/* ── 2. Bureau ↔ chantier ── */
const Question: React.FC = () => {
  const t = useT();
  const link = prog(t, 7.6, 8.6, easeInOut);
  return (
    <AbsoluteFill>
      <Kinetic text="Du *bureau* au *chantier* ?" at={Q + 0.1} y={400} size={86} />
      <Card at={Q + 0.6} x={540} y={540} w={860} h={430} tilt={-6}>
        <Chrome title="Politique HSE" />
        <div style={{height: 366, backgroundImage: `url(${staticFile('iso26/direction-equipe.jpg')})`, backgroundSize: 'cover', backgroundPosition: '50% 40%'}} />
      </Card>
      <Card at={7.6} x={540} y={1110} w={860} h={430} tilt={6}>
        <div style={{height: '100%', backgroundImage: `url(${staticFile('promo/terrain-controle.jpg')})`, backgroundSize: 'cover', backgroundPosition: '50% 35%'}} />
        <div style={{position: 'absolute', left: 24, bottom: 24, background: '#fff', borderRadius: 16, padding: '8px 20px', fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: colors.navy, display: 'flex', alignItems: 'center', gap: 10}}><F n="casque" size={44} />Le travailleur sur le chantier</div>
      </Card>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <line x1={540} y1={975} x2={540} y2={975 + 130 * link} stroke={colors.green} strokeWidth={8} strokeDasharray="16 12" />
      </svg>
      <div style={{position: 'absolute', left: 540 - 50, top: 990, width: 100, height: 100, borderRadius: 50, background: colors.navy, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${prog(t, 8.5, 8.85, easeOut)})`, boxShadow: '0 10px 20px rgba(0,0,0,0.25)'}}>?</div>
    </AbsoluteFill>
  );
};

/* ── 3. Organigramme ── */
type Node = {id: string; title: string; icon: string; x: number; y: number; at: number; chip: string; chipAt: number; color: string};
const NODES: Node[] = [
  {id: 'resp', title: 'Responsable HSE', icon: 'directeur', x: 540, y: 640, at: 12.6, chip: 'Stratégie · Conformité', chipAt: 17.18, color: colors.navy},
  {id: 'coord', title: 'Coordonnateur HSE', icon: 'coordinatrice', x: 285, y: 900, at: 23.2, chip: 'Procédures', chipAt: 24.52, color: BLUE},
  {id: 'sup', title: 'Superviseur HSE', icon: 'superviseur', x: 795, y: 900, at: 27.3, chip: 'Encadrement', chipAt: 29.44, color: BLUE},
  {id: 'agent', title: 'Agent HSE', icon: 'agent-hse', x: 285, y: 1190, at: 36.9, chip: 'Inspection · Intervention', chipAt: 37.98, color: colors.green},
  {id: 'relais', title: 'Relais HSE', icon: 'relais', x: 795, y: 1190, at: 48.1, chip: 'Signalement', chipAt: 48.58, color: colors.green},
  {id: 'assist', title: 'Assistant HSE', icon: 'assistante', x: 540, y: 1045, at: 52.4, chip: 'Statistiques · Rapports', chipAt: 55.82, color: '#8E5BD0'},
];
const N = (id: string) => NODES.find((n) => n.id === id)!;
const EDGES_DOWN: [string, string, number][] = [['resp', 'coord', 21.5], ['resp', 'sup', 21.8], ['coord', 'agent', 34.9], ['sup', 'relais', 47.0]];
const EDGES_UP: [string, string, number][] = [['agent', 'assist', 53.0], ['relais', 'assist', 53.3], ['assist', 'resp', 56.9]];

const NodeCard: React.FC<{n: Node; dim: number}> = ({n, dim}) => {
  const t = useT();
  const p = prog(t, n.at, n.at + 0.5, easeOut);
  const c = prog(t, n.chipAt, n.chipAt + 0.35, easeOut);
  if (p <= 0) return null;
  const W = 300;
  return (
    <div style={{position: 'absolute', left: n.x - W / 2, top: n.y - 95, width: W, opacity: p * (1 - dim * 0.15), transform: `scale(${0.7 + 0.3 * p})`}}>
      <div style={{background: '#fff', borderRadius: 30, boxShadow: shadow, padding: '14px 14px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderTop: `8px solid ${n.color}`}}>
        <div style={{width: 104, height: 104, borderRadius: 52, background: `${n.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={n.icon} size={86} /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 27, color: colors.navy, marginTop: 6, whiteSpace: 'nowrap'}}>{n.title}</div>
      </div>
      {c > 0 && <div style={{position: 'absolute', left: '50%', bottom: -30, transform: `translateX(-50%) scale(${c})`, background: n.color, color: '#fff', borderRadius: 20, padding: '6px 16px', fontFamily: sansFont, fontWeight: 800, fontSize: 21, whiteSpace: 'nowrap'}}>{n.chip}</div>}
    </div>
  );
};

const Edge: React.FC<{a: Node; b: Node; at: number; up?: boolean; t: number}> = ({a, b, at, up, t}) => {
  const p = prog(t, at, at + 0.6, easeInOut);
  if (p <= 0) return null;
  const from = up ? {x: a.x, y: a.y - 95} : {x: a.x, y: a.y + 70};
  const to = up ? {x: b.x, y: b.y + 75} : {x: b.x, y: b.y - 100};
  const c = up ? colors.green : BLUE;
  const dots = Array.from({length: 3}, (_, k) => ((t * 0.7 + k / 3) % 1));
  return (
    <g>
      <line x1={from.x} y1={from.y} x2={from.x + (to.x - from.x) * p} y2={from.y + (to.y - from.y) * p} stroke={c} strokeWidth={6} strokeLinecap="round" strokeDasharray={up ? '0' : '14 10'} />
      {p >= 1 && dots.map((d, k) => <circle key={k} cx={from.x + (to.x - from.x) * d} cy={from.y + (to.y - from.y) * d} r={8} fill={c} opacity={0.9} />)}
    </g>
  );
};

const Org: React.FC = () => {
  const t = useT();
  const loop = prog(t, 60.6, 61.8, easeInOut);
  const six = Math.min(6, NODES.filter((n) => t >= n.at).length);
  return (
    <AbsoluteFill>
      <Kinetic text="*6* maillons" at={SIX + 0.1} until={ORG + 0.2} y={400} size={110} />
      <Kinetic text="Au *sommet* : le pilote" at={ORG + 0.1} until={20.4} y={400} size={80} />
      <Kinetic text="La vision *descend*" at={20.6} until={32.0} y={400} size={86} accent={BLUE} />
      <Kinetic text="Un *œil expert* sur le terrain" at={32.2} until={42.8} y={400} size={76} />
      <Kinetic text="L'information *remonte*" at={42.95} until={CIRCUIT - 0.1} y={400} size={82} />
      <Kinetic text="Un *circuit fermé*" at={60.5} y={400} size={92} />
      {/* compteur de maillons */}
      <div style={{position: 'absolute', right: 60, top: 470, display: 'flex', gap: 8, opacity: prog(t, SIX, SIX + 0.4)}}>
        {Array.from({length: 6}, (_, k) => <div key={k} style={{width: 26, height: 26, borderRadius: 13, border: `4px solid ${colors.green}`, background: k < six ? colors.green : 'transparent', transform: `scale(${k === six - 1 ? 1 + 0.3 * (1 - prog(t, NODES[k].at, NODES[k].at + 0.4)) : 1})`}} />)}
      </div>
      {t < ORG && Array.from({length: 6}, (_, k) => {
        const p = prog(t, 10.6 + k * 0.12, 10.9 + k * 0.12, easeOut);
        return <div key={k} style={{position: 'absolute', left: 540 - 300 + (k % 3) * 300 - 60, top: 760 + Math.floor(k / 3) * 300, width: 120, height: 120, borderRadius: 60, border: `6px dashed ${colors.green}`, opacity: p, transform: `scale(${p})`}} />;
      })}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {EDGES_DOWN.map(([a, b, at]) => <Edge key={a + b} a={N(a)} b={N(b)} at={at} t={t} />)}
        {EDGES_UP.map(([a, b, at]) => <Edge key={a + b} a={N(a)} b={N(b)} at={at} up t={t} />)}
        {/* friction : information qui remonte sans blocage */}
        {t > 43 && t < 47 && <path d="M120 1250 C 60 950, 60 750, 300 600" fill="none" stroke={colors.green} strokeWidth={8} strokeLinecap="round" pathLength={1} strokeDasharray={`${prog(t, 43.3, 45.3)} 1`} />}
        {/* circuit fermé */}
        {loop > 0 && (
          <g opacity={loop}>
            <path d="M540 520 C 1060 520, 1060 1400, 540 1400 C 20 1400, 20 520, 540 520" fill="none" stroke={colors.green} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray={`${loop} 1`} />
            {loop > 0.98 && [0, 0.25, 0.5, 0.75].map((o) => {
              const k = (t * 0.25 + o) % 1;
              const ang = k * Math.PI * 2 - Math.PI / 2;
              return <circle key={o} cx={540 + Math.cos(ang) * 400} cy={960 + Math.sin(ang) * 440} r={13} fill={colors.green} />;
            })}
          </g>
        )}
      </svg>
      {NODES.map((n) => <NodeCard key={n.id} n={n} dim={0} />)}
      {/* faille détectée */}
      {t > 39.3 && t < 43 && <div style={{position: 'absolute', left: 285 + 120, top: 1100, transform: `scale(${prog(t, 39.3, 39.6, easeOut)})`}}><F n="loupe" size={90} /></div>}
      {t > 48.9 && t < 52.4 && <div style={{position: 'absolute', left: 795 - 190, top: 1110, transform: `scale(${prog(t, 48.9, 49.2, easeOut)})`}}><F n="megaphone" size={84} /></div>}
    </AbsoluteFill>
  );
};

/* ── 4. Conclusion : pas une hiérarchie, un circuit ── */
const Conclusion: React.FC = () => {
  const t = useT();
  const rows: [string, string, number, string, string][] = [
    ['Les directives protègent les opérateurs', '↓', 62.1, BLUE, 'bouclier'],
    ['Le terrain perfectionne la stratégie', '↑', 64.32, colors.green, 'cible'],
  ];
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 90, right: 90, top: 470, display: 'flex', justifyContent: 'center', opacity: prog(t, CIRCUIT, CIRCUIT + 0.4) * (1 - prog(t, 60.3, 60.6))}}>
        <div style={{position: 'relative', background: '#fff', borderRadius: 24, padding: '14px 30px', boxShadow: shadow, fontFamily: sansFont, fontWeight: 800, fontSize: 40, color: '#8A94A1'}}>
          Une simple hiérarchie administrative
          <div style={{position: 'absolute', left: 20, right: 20, top: '50%', height: 8, background: RED, borderRadius: 4, transform: `scaleX(${prog(t, 59.0, 59.6)})`, transformOrigin: 'left'}} />
        </div>
      </div>
      {rows.map(([l, arrow, at, c, ic], k) => {
        const p = prog(t, at - 0.2, at + 0.3, easeOut);
        return (
          <div key={l} style={{position: 'absolute', left: 70, width: 940, top: 1420 + k * 118, height: 102, borderRadius: 26, background: '#fff', boxShadow: shadow, display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px', opacity: p, transform: `translateY(${(1 - p) * 40}px)`, borderLeft: `12px solid ${c}`}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: c, width: 40}}>{arrow}</div>
            <F n={ic} size={56} />
            <div style={{flex: 1, fontFamily: sansFont, fontWeight: 800, fontSize: 33, color: colors.navy}}>{l}</div>
            <Check p={prog(t, at + 0.4, at + 0.8)} size={52} color={c} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/** Bruitages seuls (ni musique ni ambiance). */
const CUES: Sfx[] = [
  {at: 0.05, s: 'bass-hit', v: 0.45},
  ...Array.from({length: 6}, (_, k) => ({at: 0.5 + k * 0.42, s: 'sfx/thud', v: 0.32})),
  {at: 3.5, s: 'sfx/swish', v: 0.5},
  {at: Q - 0.25, s: 'soft-whoosh', v: 0.45},
  {at: Q + 0.6, s: 'sfx/pop', v: 0.42},
  {at: 7.6, s: 'sfx/pop', v: 0.42},
  {at: 8.5, s: 'sfx/ding', v: 0.42},
  {at: SIX - 0.25, s: 'soft-whoosh', v: 0.45},
  {at: 10.88, s: 'deep-hit', v: 0.5},
  ...Array.from({length: 6}, (_, k) => ({at: 10.6 + k * 0.12, s: 'sfx/click', v: 0.3})),
  ...NODES.flatMap((n) => [{at: n.at, s: 'sfx/pop', v: 0.5}, {at: n.chipAt + 0.1, s: 'tick', v: 0.45}]),
  ...EDGES_DOWN.map(([, , at]) => ({at, s: 'soft-whoosh', v: 0.32})),
  ...EDGES_UP.map(([, , at]) => ({at, s: 'sfx/swish', v: 0.35})),
  {at: 39.3, s: 'notification', v: 0.4},
  {at: 43.3, s: 'riser', v: 0.3, dur: 1.4},
  {at: 48.9, s: 'notification', v: 0.4},
  {at: CIRCUIT, s: 'soft-whoosh', v: 0.45},
  {at: 59.0, s: 'sfx/swish', v: 0.5},
  {at: 60.6, s: 'riser', v: 0.32, dur: 1.2},
  {at: 61.8, s: 'deep-hit', v: 0.5},
  {at: 62.5, s: 'validation', v: 0.45},
  {at: 64.7, s: 'validation', v: 0.45},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const EquipeHse: React.FC = () => (
  <AbsoluteFill>
    <Backdrop />
    <Gate from={0} to={Q}><Hook /></Gate>
    <Gate from={Q} to={SIX}><Question /></Gate>
    <Gate from={SIX} to={OUTRO_AT}><Org /></Gate>
    <Gate from={CIRCUIT} to={OUTRO_AT}><Conclusion /></Gate>
    <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    <Wipe at={OUTRO_AT} />
    <Gate from={0} to={OUTRO_AT}><Captions captions={captions} /></Gate>
    <Audio src={staticFile('voix-off-equipe-hse.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

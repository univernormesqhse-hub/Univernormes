import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {easeInOut, easeOut, Enter, Gate, Kinetic, prog, useT} from '../anim';
import {PhotoCard, RED, Strike} from '../charte/ui';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {Stamp} from '../danger2/ui';
import {F} from '../iso/ui';
import {BLUE, GOLD, PURPLE} from '../pieges/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, handFont, s, sansFont} from '../theme';
import {captions} from './captions';

const LOGO = 'promo/logo.png';
const END_AT = 74.28;
const OUTRO_AT = 85.5;
export const ARSENAL_FRAMES = s(88.9);
const ORANGE = '#EE7D1A';
const TEAL = '#1A9E8F';

type Img = {src: string; at: number; x: number; y: number; w: number; h: number; rot?: number; pos?: string; from?: 'up' | 'down' | 'left' | 'right' | 'scale'; until?: number};
type Tool = {n: number; at: number; title: string; short: string; icon: string; color: string; imgs: Img[]; chips: [string, number, string][]; extra?: 'why' | 'plan' | 'audit'};

const TOOLS: Tool[] = [
  {n: 1, at: 8.42, title: 'Analyse des *risques* professionnels', short: 'Analyse des risques', icon: 'danger', color: RED,
    imgs: [{src: 'arsenal/risk.jpg', at: 9.0, x: 540, y: 900, w: 560, h: 520, from: 'scale', until: 12.0}, {src: 'arsenal/cartographie.jpg', at: 12.1, x: 540, y: 900, w: 980, h: 360, from: 'right'}],
    chips: [['Identifier les dangers', 10.82, 'loupe'], ['Évaluer les risques', 12.1, 'balance'], ['Définir la prévention', 13.08, 'bouclier']]},
  {n: 2, at: 15.42, title: '*DUERP*', short: 'DUERP', icon: 'classeur', color: PURPLE,
    imgs: [{src: 'arsenal/duerp.jpg', at: 16.0, x: 540, y: 880, w: 940, h: 540, from: 'left'}],
    chips: [['Évaluer', 17.48, 'balance'], ['Formaliser par écrit', 18.06, 'memo']]},
  {n: 3, at: 20.76, title: '*JSA* / *JHA*', short: 'JSA / JHA', icon: 'clipboard', color: ORANGE,
    imgs: [{src: 'arsenal/jsa.jpg', at: 21.6, x: 290, y: 880, w: 420, h: 600, rot: -3, from: 'left'}, {src: 'arsenal/jha.jpg', at: 22.6, x: 790, y: 880, w: 470, h: 600, rot: 3, pos: '78% 50%', from: 'right'}],
    chips: [['Étape par étape', 24.94, 'pas'], ['Avant ou pendant l\'activité', 26.12, 'chrono']]},
  {n: 4, at: 28.08, title: 'Arbre des *causes*', short: 'Arbre des causes', icon: 'arbre', color: colors.green,
    imgs: [{src: 'arsenal/arbre-causes.jpg', at: 28.8, x: 540, y: 880, w: 960, h: 600, from: 'scale'}],
    chips: [['Causes profondes', 30.76, 'loupe2'], ['Accident ou incident', 31.7, 'pansement']]},
  {n: 5, at: 34.04, title: '5 *pourquoi*', short: '5 Pourquoi', icon: 'question', color: BLUE,
    imgs: [{src: 'arsenal/5-pourquoi.jpg', at: 34.5, x: 280, y: 960, w: 420, h: 640, rot: -3, pos: '50% 60%', from: 'left'}],
    chips: [], extra: 'why'},
  {n: 6, at: 39.08, title: 'Plan d\'actions *QHSE*', short: 'Plan d\'actions', icon: 'calendrier', color: TEAL,
    imgs: [], chips: [], extra: 'plan'},
  {n: 7, at: 46.64, title: 'Audit *interne*', short: 'Audit interne', icon: 'auditeur', color: colors.navy,
    imgs: [{src: 'iso26/audit-checklist.jpg', at: 47.3, x: 540, y: 870, w: 940, h: 540, from: 'left'}],
    chips: [['Pratiques terrain', 49.3, 'casque'], ['Système de management', 49.88, 'engrenage'], ['Conformes aux exigences ?', 50.9, 'check']], extra: 'audit'},
  {n: 8, at: 52.78, title: 'Veille *réglementaire*', short: 'Veille réglementaire', icon: 'juge', color: GOLD,
    imgs: [{src: 'arsenal/veille-juridique.jpg', at: 53.4, x: 540, y: 860, w: 940, h: 560, from: 'scale', until: 57.2}, {src: 'arsenal/veille-cyber.jpg', at: 57.3, x: 540, y: 860, w: 940, h: 560, pos: '60% 50%', from: 'right'}],
    chips: [['Exigences légales', 55.74, 'juge'], ['Applicables à l\'entreprise', 56.5, 'batiment'], ['Suivre leur évolution', 57.3, 'courbe']]},
  {n: 9, at: 59.0, title: 'Aspects & impacts *environnementaux*', short: 'Aspects environnementaux', icon: 'feuille', color: '#3E9B4F',
    imgs: [{src: 'arsenal/aspects-env.jpg', at: 60.0, x: 540, y: 900, w: 960, h: 600, from: 'scale'}],
    chips: [['Activités', 63.28, 'usine'], ['Impact sur l\'environnement', 64.1, 'planete'], ['Évaluer l\'importance', 65.38, 'balance']]},
  {n: 10, at: 67.24, title: 'Tableau de bord *QHSE*', short: 'Tableau de bord', icon: 'graphique', color: '#2E86C1',
    imgs: [{src: 'arsenal/tableau-bord.jpg', at: 67.9, x: 540, y: 880, w: 960, h: 560, from: 'scale'}],
    chips: [['Suivre les indicateurs', 70.5, 'graphique'], ['Mesurer la performance', 71.68, 'cible'], ['Prendre les bonnes décisions', 72.72, 'ampoule']]},
];
const endOf = (i: number) => (i + 1 < TOOLS.length ? TOOLS[i + 1].at : END_AT);
const card = (c: string): React.CSSProperties => ({background: '#fff', borderRadius: 24, boxShadow: '0 10px 22px rgba(14,30,60,0.14)', borderLeft: `12px solid ${c}`});

/** Bandeau « Outil n / 10 » avec jauge de progression. */
const ToolHead: React.FC<{tool: Tool}> = ({tool}) => {
  const t = useT();
  const p = prog(t, tool.at, tool.at + 0.4, easeOut);
  return (
    <div style={{position: 'absolute', left: 40, right: 40, top: 290, display: 'flex', alignItems: 'center', gap: 18, opacity: p}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, background: tool.color, color: '#fff', borderRadius: 22, padding: '6px 22px 6px 8px', transform: `scale(${0.7 + 0.3 * p})`, transformOrigin: 'left center', boxShadow: '0 10px 20px rgba(14,30,60,0.2)'}}>
        <div style={{width: 74, height: 74, borderRadius: 18, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={tool.icon} size={58} /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, lineHeight: 1}}>
          <div style={{fontSize: 22, letterSpacing: 3, opacity: 0.85}}>OUTIL</div>
          <div style={{fontSize: 52}}>{String(tool.n).padStart(2, '0')}<span style={{fontSize: 28, opacity: 0.7}}> / 10</span></div>
        </div>
      </div>
      <div style={{flex: 1, display: 'flex', gap: 6}}>
        {TOOLS.map((x) => <div key={x.n} style={{flex: 1, height: 12, borderRadius: 6, background: x.n < tool.n ? '#9AA5B3' : x.n === tool.n ? tool.color : '#D5D9DE', transform: x.n === tool.n ? `scaleY(${1 + 0.4 * (1 - prog(t, tool.at + 0.2, tool.at + 0.6))})` : undefined}} />)}
      </div>
    </div>
  );
};

/** Liste d'actions qui se coche au rythme de la voix. */
const Chips: React.FC<{tool: Tool; top?: number; left?: number; w?: number}> = ({tool, top = 1220, left = 60, w = 960}) => {
  const t = useT();
  return (
    <>
      {tool.chips.map(([l, at, ic], i) => {
        const p = prog(t, at - 0.1, at + 0.3, easeOut);
        const ok = prog(t, at + 0.35, at + 0.6, easeOut);
        return (
          <div key={l} style={{...card(tool.color), position: 'absolute', left, top: top + i * 102, width: w, height: 88, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px', opacity: p, transform: `translateX(${(1 - p) * -90}px)`}}>
            <F n={ic} size={62} />
            <div style={{flex: 1, fontFamily: sansFont, fontWeight: 800, fontSize: 40, color: colors.navy, whiteSpace: 'nowrap'}}>{l}</div>
            <div style={{width: 54, height: 54, borderRadius: '50%', background: colors.green, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${ok})`}}>
              <svg width={30} height={30} viewBox="0 0 24 24"><path d="M4 12.5 L10 18 L20 6" stroke="#fff" strokeWidth={3.8} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
        );
      })}
    </>
  );
};

/** Escalier des 5 pourquoi jusqu'à la cause racine. */
const WhyStairs: React.FC<{tool: Tool}> = ({tool}) => {
  const t = useT();
  const a = 35.5;
  return (
    <div style={{position: 'absolute', left: 540, top: 600, width: 500, height: 760}}>
      {[0, 1, 2, 3, 4].map((k) => {
        const at = a + k * 0.3;
        const p = prog(t, at, at + 0.3, easeOut);
        return (
          <div key={k} style={{position: 'absolute', left: k * 40, top: 640 - k * 118, display: 'flex', alignItems: 'center', gap: 10, opacity: p, transform: `translateY(${(1 - p) * 40}px)`}}>
            <div style={{width: 64, height: 64, borderRadius: '50%', background: '#fff', border: `5px solid ${tool.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: tool.color}}>{k + 1}</div>
            <div style={{...card(tool.color), padding: '12px 20px', fontFamily: handFont, fontSize: 40, color: colors.navy}}>Pourquoi ?</div>
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 80, top: -40, opacity: prog(t, 37.06, 37.4), transform: `scale(${prog(t, 37.06, 37.5, easeOut)})`, display: 'flex', alignItems: 'center', gap: 12, background: tool.color, color: '#fff', borderRadius: 20, padding: '12px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 36, whiteSpace: 'nowrap'}}>
        <F n="cible" size={64} /> Cause racine
      </div>
    </div>
  );
};

/** Plan d'actions qui se remplit : action, responsable, échéance. */
const PlanTable: React.FC<{tool: Tool}> = ({tool}) => {
  const t = useT();
  const cols = ['Constat / NC', 'Action', 'Resp.', 'Échéance'];
  const rows: [string, string, string, string][] = [['Garde-corps absent', 'Installer un garde-corps', 'Chef chantier', 'J+15'], ['FDS non à jour', 'Mettre à jour les FDS', 'Resp. QHSE', 'J+30'], ['EPI non portés', 'Sensibiliser l\'équipe', 'Manager', 'J+7']];
  const colAt = [42.14, 43.64, 44.78, 45.32];
  const W = [290, 330, 170, 170];
  const p0 = prog(t, 39.6, 40.0, easeOut);
  return (
    <div style={{position: 'absolute', left: 540, top: 900, transform: `translate(-50%, -50%) scale(${0.9 + 0.1 * p0})`, opacity: p0, background: '#fff', borderRadius: 26, boxShadow: '0 20px 44px rgba(14,30,60,0.2)', overflow: 'hidden', width: 980}}>
      <div style={{display: 'flex', background: tool.color}}>
        {cols.map((c, i) => <div key={c} style={{width: W[i], padding: '18px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff', opacity: 0.35 + 0.65 * prog(t, colAt[i] - 0.1, colAt[i] + 0.2)}}>{c}</div>)}
      </div>
      {rows.map((r, j) => (
        <div key={j} style={{display: 'flex', borderTop: '2px solid #E6EAEF', background: j % 2 ? '#F7F9FB' : '#fff'}}>
          {r.map((c, i) => {
            const at = colAt[i] + j * 0.12;
            const p = prog(t, at, at + 0.25);
            return <div key={i} style={{width: W[i], padding: '22px 14px', fontFamily: i < 2 ? sansFont : handFont, fontWeight: i < 2 ? 700 : 400, fontSize: i < 2 ? 27 : 32, color: i === 0 ? RED : colors.navy, opacity: p, transform: `translateY(${(1 - p) * 12}px)`}}>{c}</div>;
          })}
        </div>
      ))}
    </div>
  );
};

const ToolScene: React.FC<{tool: Tool; i: number}> = ({tool, i}) => {
  const t = useT();
  const end = endOf(i);
  if (t < tool.at || t >= end) return null;
  const chipsTop = tool.chips.length >= 3 ? 1220 : 1260;
  return (
    <AbsoluteFill style={{opacity: 1 - prog(t, end - 0.15, end)}}>
      <ToolHead tool={tool} />
      <Kinetic text={tool.title} at={tool.at + 0.3} y={tool.title.length > 26 ? 500 : 470} size={tool.title.length > 26 ? 66 : 84} accent={tool.color} maxWidth={1000} />
      {tool.imgs.map((m) => <PhotoCard key={m.src} src={m.src} at={m.at} until={m.until} x={m.x} y={m.y} w={m.w} h={m.h} rotate={m.rot ?? 0} pos={m.pos} from={m.from} />)}
      {tool.extra === 'why' && <WhyStairs tool={tool} />}
      {tool.extra === 'plan' && <PlanTable tool={tool} />}
      {tool.extra === 'plan' && (
        <Enter at={44.9} x={540} y={1340} bouncy>
          <div style={{display: 'flex', gap: 20}}>
            {[['equipe', 'Responsable'], ['calendrier', 'Échéance'], ['check', 'Suivi']].map(([ic, l]) => (
              <div key={l} style={{...card(tool.color), display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: colors.navy}}><F n={ic} size={56} />{l}</div>
            ))}
          </div>
        </Enter>
      )}
      {tool.extra === 'audit' && <Enter at={51.3} x={800} y={1080} from="scale"><Stamp text="CONFORME ?" p={prog(t, 51.3, 51.55)} color={colors.green} size={54} rotate={-8} /></Enter>}
      <Chips tool={tool} top={chipsTop} />
    </AbsoluteFill>
  );
};

/** Intro : l'accroche. */
const Intro: React.FC = () => {
  const t = useT();
  const burst = prog(t, 3.5, 4.2, easeOut);
  return (
    <AbsoluteFill>
      <Kinetic text="Tu es responsable *QHSE* ?" at={0.1} y={480} size={92} />
      <div style={{position: 'absolute', left: 540, top: 1090, transform: 'translate(-50%, -50%)'}}>
        <Enter at={2.6} x={0} y={0} bouncy><F n="boite-outils" size={300} float={6} /></Enter>
      </div>
      {TOOLS.map((tool, k) => {
        const ang = (k / TOOLS.length) * Math.PI * 2 - Math.PI / 2;
        const r = 360 * burst;
        return (
          <div key={tool.n} style={{position: 'absolute', left: 540 + Math.cos(ang) * r - 52, top: 1090 + Math.sin(ang) * r * 0.85 - 52, width: 104, height: 104, borderRadius: 26, background: '#fff', border: `5px solid ${tool.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: burst, transform: `scale(${burst}) rotate(${(1 - burst) * 180}deg)`, boxShadow: '0 8px 16px rgba(14,30,60,0.18)'}}>
            <F n={tool.icon} size={70} />
          </div>
        );
      })}
      <Enter at={3.52} x={540} y={690} bouncy>
        <div style={{background: RED, color: '#fff', borderRadius: 22, padding: '8px 28px', fontFamily: sansFont, fontWeight: 900, fontSize: 50, whiteSpace: 'nowrap', transform: 'rotate(-3deg)'}}>10 OUTILS À MAÎTRISER</div>
      </Enter>
      <Enter at={5.3} x={540} y={1520} from="up">
        <div style={{fontFamily: handFont, fontSize: 64, color: colors.navy, whiteSpace: 'nowrap'}}>pour <span style={{color: colors.green}}>piloter efficacement</span> ton système</div>
      </Enter>
    </AbsoluteFill>
  );
};

/** Final : la boîte à outils, connaître ≠ savoir utiliser, la question. */
const Ending: React.FC = () => {
  const t = useT();
  const dim = prog(t, 78.2, 78.6);
  const back = prog(t, 83.1, 83.5);
  const tileOpacity = 1 - dim * 0.88 + back * 0.88;
  const scan = t >= 83.5 ? Math.floor((t - 83.5) * 7) % 10 : -1;
  return (
    <AbsoluteFill>
      <Kinetic text="La boîte à outils du responsable *QHSE*" at={74.35} until={78.3} y={470} size={70} />
      <div style={{position: 'absolute', left: 50, right: 50, top: t >= 83.1 ? 560 : 620, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, opacity: tileOpacity, transform: `scale(${t >= 83.1 ? 0.92 : 1})`}}>
        {TOOLS.map((tool, k) => {
          const p = prog(t, 74.5 + k * 0.14, 74.85 + k * 0.14, easeOut);
          const hot = scan === k;
          return (
            <div key={tool.n} style={{...card(tool.color), height: 96, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', opacity: p, transform: `scale(${(0.6 + 0.4 * p) * (hot ? 1.06 : 1)})`, background: hot ? '#FFF6D9' : '#fff', outline: hot ? `5px solid ${GOLD}` : 'none'}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: tool.color, width: 44}}>{String(tool.n).padStart(2, '0')}</div>
              <F n={tool.icon} size={56} />
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: tool.short.length > 18 ? 24 : 28, color: colors.navy, lineHeight: 1.05}}>{tool.short}</div>
            </div>
          );
        })}
      </div>
      <Gate from={78.26} to={83.1}>
        <Kinetic text="Mais *attention*" at={78.3} until={83.0} y={460} size={90} accent={RED} />
        <Enter at={79.3} until={83.0} x={540} y={800} from="left">
          <div style={{...card(RED), position: 'relative', width: 900, padding: '26px 30px', display: 'flex', alignItems: 'center', gap: 22}}>
            <F n="livres" size={110} />
            <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: colors.navy}}>
              Connaître leurs noms
              <Strike p={prog(t, 80.2, 80.6)} w={500} />
            </div>
          </div>
        </Enter>
        <Enter at={80.9} until={83.0} x={540} y={1100} from="right">
          <div style={{...card(colors.green), width: 900, padding: '26px 30px', display: 'flex', alignItems: 'center', gap: 22}}>
            <F n="casque" size={110} float={4} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: colors.navy, lineHeight: 1.1}}>Savoir les <span style={{color: colors.green}}>utiliser</span><br />sur le terrain</div>
          </div>
        </Enter>
        <Enter at={82.4} until={83.0} x={700} y={1290} from="scale"><Stamp text="INDISPENSABLE" p={prog(t, 82.4, 82.65)} color={colors.green} size={42} rotate={-8} /></Enter>
      </Gate>
      <Gate from={83.1} to={OUTRO_AT}>
        <Kinetic text="Lequel maîtrises-tu le *moins* ?" at={83.2} y={430} size={72} accent={RED} />
        <Enter at={83.6} x={540} y={1430} bouncy><F n="pensif" size={170} float={5} /></Enter>
      </Gate>
    </AbsoluteFill>
  );
};

/** Bruitages seuls (ni musique ni ambiance), calés sur chaque action. */
const CUES: Sfx[] = [
  {at: 0.1, s: 'bass-hit', v: 0.55},
  {at: 2.6, s: 'sfx/pop', v: 0.55},
  {at: 3.5, s: 'sfx/whoosh', v: 0.55},
  ...TOOLS.map((_, k) => ({at: 3.55 + k * 0.05, s: 'sfx/click', v: 0.32})),
  {at: 3.6, s: 'tampon', v: 0.6},
  {at: 5.3, s: 'sfx/swish', v: 0.45},
  ...TOOLS.flatMap((tool) => [
    {at: tool.at - 0.3, s: 'soft-whoosh', v: 0.5},
    {at: tool.at + 0.05, s: 'deep-hit', v: 0.5},
    ...tool.imgs.map((m) => ({at: m.at, s: 'sfx/whoosh', v: 0.42})),
    ...tool.chips.flatMap(([, at]) => [{at: at - 0.05, s: 'sfx/swish', v: 0.35}, {at: at + 0.4, s: 'tick', v: 0.5}]),
  ]),
  ...[0, 1, 2, 3, 4].map((k) => ({at: 35.5 + k * 0.3, s: 'sfx/pop', v: 0.45})),
  {at: 37.06, s: 'validation', v: 0.55},
  ...[42.14, 43.64, 44.78, 45.32].map((at) => ({at, s: 'stylo', v: 0.45, dur: 0.45})),
  {at: 44.9, s: 'sfx/pop', v: 0.5},
  {at: 51.3, s: 'tampon', v: 0.7},
  // final
  {at: END_AT - 0.3, s: 'soft-whoosh', v: 0.5},
  {at: END_AT + 0.05, s: 'bass-hit', v: 0.5},
  ...TOOLS.map((_, k) => ({at: 74.5 + k * 0.14, s: 'sfx/pop', v: 0.35})),
  {at: 78.3, s: 'alarme', v: 0.22, dur: 0.8},
  {at: 79.3, s: 'soft-whoosh', v: 0.45},
  {at: 80.2, s: 'sfx/swish', v: 0.55},
  {at: 80.9, s: 'soft-whoosh', v: 0.45},
  {at: 82.4, s: 'tampon', v: 0.7},
  {at: 83.2, s: 'riser', v: 0.3, dur: 0.9},
  ...Array.from({length: 10}, (_, k) => ({at: 83.5 + k / 7, s: 'tick', v: 0.38})),
  {at: 84.9, s: 'sfx/ding', v: 0.5},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Arsenal: React.FC = () => (
  <AbsoluteFill>
    <Camera shakes={[]}>
      <Background />
      <Gate from={0} to={TOOLS[0].at}><Intro /></Gate>
      <Gate from={TOOLS[0].at} to={END_AT}>{TOOLS.map((tool, i) => <ToolScene key={tool.n} tool={tool} i={i} />)}</Gate>
      <Gate from={END_AT} to={OUTRO_AT}><Ending /></Gate>
      <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    </Camera>
    <Header hideAt={OUTRO_AT} logo={LOGO} />
    <Footer hideAt={OUTRO_AT} />
    {TOOLS.map((tool) => <Wipe key={tool.n} at={tool.at} dur={0.55} color={tool.color} />)}
    <Wipe at={END_AT} />
    <Wipe at={OUTRO_AT} />
    <Captions captions={captions} />
    <Audio src={staticFile('voix-off-arsenal.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

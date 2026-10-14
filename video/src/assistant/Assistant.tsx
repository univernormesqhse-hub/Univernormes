import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s, sansFont} from '../theme';
import {Abs, Bg, BLUE, Chip, DIM, easeIn, easeInOut, easeOut, GREEN, Hand, INK, lerp, LOGO, Mark, PAPER, PH, Photo, pop, prog, RED, Row, Sc, spring, T, Title, useT} from '../implIso/kit';
import {captions} from './captions';

/**
 * « L'impact réel de l'assistant HSE » (1 min 04) — voix d'origine, sous-titres recalés mot à mot, photos réelles,
 * thème « papier quadrillé » de la série.
 * Fil rouge inédit : le train d'engrenages — chaque petite tâche de l'assistant ajoute un pignon, et ce sont ces petits
 * pignons qui finissent par entraîner la grande roue « PRÉVENTION » (en-tête + final). Transitions : tempête de
 * post-it qui recouvrent l'écran, puis s'envolent.
 * Autres techniques nouvelles : classeur dont les pages s'envolent vers le terrain, traces de pas sur la photo, loupe
 * qui cercle un danger, drapeau d'anomalie planté, étagère d'EPI inventoriée, bulle de sensibilisation, compteur de
 * version de document, arête de poisson qui se trace, registre d'incidents, barres d'indicateurs, triple coche +
 * « APPROUVÉ », marteau des « grandes décisions » qui s'efface devant les petits pignons.
 */
const ORANGE = '#F28C1E';
const VIO = '#7B5CD6';
const OUTRO_AT = 60.4;
export const ASSISTANT_FRAMES = s(OUTRO_AT + 3.8);
type P = {n: number; l: string; sub: string; at: number; end: number; c: string};
const PT: P[] = [
  {n: 1, l: 'Sur le terrain', sub: 'Inspecter, repérer, signaler', at: 9.5, end: 26.9, c: ORANGE},
  {n: 2, l: 'Au quotidien', sub: 'Documenter, analyser, suivre', at: 26.9, end: 42.1, c: BLUE},
  {n: 3, l: 'Là où il fait la différence', sub: 'Les petits gestes qui comptent', at: 42.1, end: 59.9, c: GREEN},
];
const WIPE = 1.8;
/** Instants où chaque tâche ajoute un pignon au train d'engrenages. */
const COGS = [11.2, 14.1, 15.4, 16.7, 18.4, 21.3, 24.4, 28.4, 30.8, 32.8, 34.9, 38.8];
const COGC = [ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, BLUE, BLUE, BLUE, BLUE, BLUE];

const Cog: React.FC<{r: number; a: number; c: string; teeth?: number; label?: string}> = ({r, a, c, teeth = 10, label}) => {
  const pts: string[] = [];
  for (let i = 0; i < teeth * 2; i++) {
    const rr = i % 2 ? r * 0.8 : r;
    const a0 = (i / (teeth * 2)) * Math.PI * 2, a1 = ((i + 1) / (teeth * 2)) * Math.PI * 2;
    pts.push(`${Math.cos(a0) * rr},${Math.sin(a0) * rr}`, `${Math.cos(a1 - 0.05) * rr},${Math.sin(a1 - 0.05) * rr}`);
  }
  return (
    <div style={{position: 'relative', width: r * 2, height: r * 2}}>
      <svg width={r * 2} height={r * 2} style={{position: 'absolute', inset: 0, transform: `rotate(${a}deg)`}}>
        <g transform={`translate(${r},${r})`}><polygon points={pts.join(' ')} fill={c} stroke={INK} strokeWidth={Math.max(1.5, r * 0.05)} /><circle r={r * 0.32} fill="#fff" stroke={INK} strokeWidth={Math.max(1.5, r * 0.05)} /></g>
      </svg>
      {label && <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: r * 0.16, color: INK}}>{label}</div>}
    </div>
  );
};
/** Fil rouge : n pignons (fractionnaire) alignés + la grande roue, qui ne tourne que si drive > 0. */
const Train: React.FC<{w: number; n: number; drive: number}> = ({w, n, drive}) => {
  const t = useT();
  const R = w * 0.2, r = w * 0.045;
  const spin = t * 90 * drive;
  return (
    <div style={{position: 'relative', width: w, height: R * 2}}>
      {COGS.map((_, i) => {
        const on = Math.max(0, Math.min(1, n - i));
        const row = i % 2;
        return <div key={i} style={{position: 'absolute', left: i * r * 1.55, top: R - r + (row ? r * 0.9 : -r * 0.9), transform: `scale(${on})`}}><Cog r={r} a={(row ? -1 : 1) * spin * 4 + i * 10} c={on >= 1 ? COGC[i] : '#C9CED8'} teeth={8} /></div>;
      })}
      <div style={{position: 'absolute', right: 0, top: 0}}><Cog r={R} a={-spin} c={drive > 0.5 ? GREEN : '#D5DBE6'} teeth={18} label="PRÉVENTION" /></div>
    </div>
  );
};
const cogsAt = (t: number) => COGS.reduce((a, c) => a + prog(t, c, c + 0.4), 0);

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('induction/technicien-hse.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 980, objectFit: 'cover', objectPosition: '55% 30%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 46%, ${PAPER} 52%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={50} y={880} w={980} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>LES PETITS GESTES QUI PRÉVIENNENT</div>
        <T size={100} style={{marginTop: 20, textTransform: 'uppercase', letterSpacing: -3}}>L’impact réel de</T>
        <T size={110} style={{textTransform: 'uppercase', letterSpacing: -3, lineHeight: 1.08}}><span style={{background: '#F5B700', padding: '0 22px', borderRadius: 18}}>l’assistant</span> <span style={{color: GREEN}}>HSE</span></T>
      </Abs>
      <Abs x={190} y={1310}><Train w={700} n={12} drive={0} /></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : tempête de post-it ─────────── */
const PostIt: React.FC<{p: P}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const cols = ['#FFE27A', '#FFC1D6', '#B8F0C8', '#BDE0FF', '#FFD3A8'];
  return (
    <AbsoluteFill style={{zIndex: 55, pointerEvents: 'none'}}>
      {Array.from({length: 48}, (_, i) => {
        const cx = (i % 6) * 190 - 20, cy = Math.floor(i / 6) * 250 - 30;
        const d = random(`q${i}`) * 0.35;
        const inn = prog(t, a + d, a + d + 0.3, easeOut);
        const out = prog(t, b - 0.55 + d * 0.6, b - 0.15 + d * 0.6, easeIn);
        const r = (random(`r${i}`) - 0.5) * 24;
        return <div key={i} style={{position: 'absolute', left: cx + (1 - inn) * (random(`x${i}`) - 0.5) * 900 + out * (random(`o${i}`) - 0.3) * 1400, top: cy + (1 - inn) * -900 - out * 1200 * random(`u${i}`), width: 230, height: 230, background: cols[i % 5], transform: `rotate(${r + out * 120}deg)`, boxShadow: '0 8px 16px rgba(0,0,0,0.18)', opacity: inn}} />;
      })}
      <div style={{position: 'absolute', left: 140, top: 640, width: 800, height: 640, background: '#FFE27A', transform: `rotate(-3deg) scale(${spring(t, a + 0.35, 7, 13)}) translateY(${prog(t, b - 0.5, b - 0.1, easeIn) * -1600}px)`, boxShadow: '0 20px 40px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16}}>
        <div style={{position: 'absolute', top: -30, width: 200, height: 60, background: '#ffffff99', transform: 'rotate(2deg)'}} />
        <T size={40} color={p.c} style={{letterSpacing: 6}}>PARTIE {p.n}/3</T>
        <T size={84} style={{textAlign: 'center'}}>{p.l}</T>
        <Hand size={56} color={DIM}>{p.sub}</Hand>
      </div>
    </AbsoluteFill>
  );
};

/* ─────────── En-tête ─────────── */
const Header: React.FC = () => {
  const t = useT();
  const p = PT.findIndex((x) => t >= x.at + WIPE - 0.3 && t < x.end);
  const intro = t > 2.6 && t < 9.2;
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 80, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {(intro || p >= 0) && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 210, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: intro ? pop(t, 2.6) * (1 - prog(t, 8.9, 9.2)) : pop(t, PT[p].at + WIPE - 0.3) * (1 - prog(t, PT[p].end - 0.3, PT[p].end))}}>
          <Train w={150} n={cogsAt(t)} drive={t > 47 ? 1 : 0} />
          <div style={{padding: '6px 20px', borderRadius: 40, background: '#fff', border: `3px solid ${p >= 0 ? PT[p].c : INK}`}}><T size={30}>{p >= 0 ? `${PT[p].n}. ${PT[p].l}` : 'L’assistant HSE'}</T></div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── INTRO ─────────── */
const Binder: React.FC = () => {
  const t = useT();
  const open = prog(t, 6.2, 6.8, easeInOut);
  return (
    <AbsoluteFill>
      <Title size={46}>Prévenir les accidents… <Mark p={prog(t, 4.2, 5.0)}>pour de vrai</Mark></Title>
      <Photo src="promo/terrain-controle.jpg" x={60} y={430} w={960} h={600} pos="55% 35%" />
      <Abs x={300} y={1080} w={480} h={340} style={{perspective: 1600}}>
        <div style={{position: 'absolute', inset: 0, background: '#33415F', borderRadius: 16}} />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #4A5A80, #2A3550)', borderRadius: 16, transformOrigin: '0 50%', transform: `rotateY(${-open * 150}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', backfaceVisibility: 'hidden'}}><div style={{background: '#fff', padding: '10px 26px', borderRadius: 8}}><T size={40}>SÉCURITÉ</T></div></div>
      </Abs>
      {open > 0.5 && Array.from({length: 8}, (_, i) => {
        const at = 6.8 + i * 0.22;
        const f = prog(t, at, at + 1.0, easeOut);
        return <div key={i} style={{position: 'absolute', left: lerp(500, 120 + random(`px${i}`) * 820, f), top: lerp(1200, 480 + random(`py${i}`) * 480, f), width: 120, height: 150, background: '#fff', border: `3px solid ${INK}`, borderRadius: 6, transform: `rotate(${f * (random(`pr${i}`) - 0.5) * 70}deg) scale(${1 - f * 0.3})`, opacity: t > at ? 1 - prog(t, at + 1.2, at + 1.5) : 0, boxShadow: '0 8px 16px rgba(0,0,0,0.2)'}}><div style={{margin: 14, height: 8, background: '#D5DBE6', borderRadius: 4}} /><div style={{margin: 14, height: 8, background: '#D5DBE6', borderRadius: 4}} /></div>;
      })}
    </AbsoluteFill>
  );
};

/* ─────────── TERRAIN ─────────── */
const Field: React.FC = () => {
  const t = useT();
  const ring = prog(t, 15.3, 15.9);
  return (
    <AbsoluteFill>
      <Title>Il <Mark c={ORANGE} p={prog(t, 11.2, 11.9)}>accompagne</Mark> le terrain</Title>
      <Photo src="induction/briefing-atelier.jpg" x={60} y={430} w={960} h={760} pos="50% 50%">
        {Array.from({length: 8}, (_, i) => <div key={i} style={{position: 'absolute', left: 80 + i * 100, top: 640 - i * 40 + (i % 2) * 30, fontSize: 40, opacity: t > 11.4 + i * 0.12 ? 0.9 : 0, transform: `rotate(${-30}deg)`}}>👣</div>)}
        {t > 14.0 && <div style={{position: 'absolute', left: 560, top: 180, width: 240 * ring + 1, height: 240 * ring + 1, marginLeft: -120 * ring, marginTop: -120 * ring, borderRadius: '50%', border: `10px solid ${RED}`}} />}
      </Photo>
      {t > 13.9 && <Abs x={640} y={360} style={{transform: `rotate(-15deg) scale(${spring(t, 13.9)})`}}><F n="loupe" size={150} /></Abs>}
      {t > 15.4 && <Row y={1240}><Chip c={RED} light size={36} style={{opacity: pop(t, 15.4)}}>⚠ Situation dangereuse repérée</Chip></Row>}
    </AbsoluteFill>
  );
};
const Flag: React.FC = () => {
  const t = useT();
  const plant = spring(t, 16.8, 8, 14);
  const loop = prog(t, 18.4, 19.6, easeInOut);
  return (
    <AbsoluteFill>
      <Title>Signaler, puis <Mark c={ORANGE} p={prog(t, 18.0, 18.7)}>suivre</Mark></Title>
      <Abs x={160} y={560} style={{transform: `translateY(${(1 - plant) * -400}px)`}}>
        <svg width={300} height={500}><line x1={40} y1={20} x2={40} y2={480} stroke={INK} strokeWidth={12} /><path d={`M 46 30 Q 160 ${10 + Math.sin(t * 6) * 20} 270 40 L 270 170 Q 160 ${150 + Math.sin(t * 6) * 20} 46 180 Z`} fill={RED} stroke={INK} strokeWidth={6} /><text x={150} y={115} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={30} fill="#fff">ANOMALIE</text></svg>
      </Abs>
      <svg width={400} height={400} style={{position: 'absolute', left: 580, top: 600}}>
        <circle cx={200} cy={200} r={150} fill="none" stroke="#E3E6EC" strokeWidth={30} />
        <circle cx={200} cy={200} r={150} fill="none" stroke={GREEN} strokeWidth={30} strokeDasharray={942} strokeDashoffset={942 * (1 - loop)} transform="rotate(-90 200 200)" strokeLinecap="round" />
        <text x={200} y={215} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={34} fill={INK}>{loop >= 1 ? 'CLÔTURÉE' : 'EN SUIVI'}</text>
      </svg>
      <Abs x={580} y={1020} w={400} style={{textAlign: 'center', opacity: pop(t, 18.4)}}><T size={34}>Action corrective</T></Abs>
    </AbsoluteFill>
  );
};
const Shelf: React.FC = () => {
  const t = useT();
  const E = [{src: 'epiepc/casque-d.png', l: 'Casques'}, {src: 'epiepc/gants-d.png', l: 'Gants'}, {src: 'epiepc/harnais-d.png', l: 'Harnais'}, {src: 'epiepc/bouchons-d.png', l: 'Bouchons'}];
  return (
    <AbsoluteFill>
      <Title>Des <Mark c={ORANGE} p={prog(t, 22.0, 22.8)}>EPI</Mark> disponibles</Title>
      {[0, 1].map((r) => <div key={r} style={{position: 'absolute', left: 80, right: 80, top: 760 + r * 380, height: 26, background: '#8A5A2B', borderRadius: 8}} />)}
      {E.map((e, i) => (
        <Abs key={i} x={110 + (i % 2) * 450} y={460 + Math.floor(i / 2) * 380} w={400} style={{textAlign: 'center', opacity: pop(t, 20.6 + i * 0.2)}}>
          <Img src={PH(e.src)} style={{height: 280, objectFit: 'contain'}} />
          {t > 21.5 + i * 0.3 && <div style={{position: 'absolute', right: 30, top: 20, width: 70, height: 70, borderRadius: 35, background: GREEN, color: '#fff', fontSize: 44, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 21.5 + i * 0.3)})`}}>✓</div>}
        </Abs>
      ))}
    </AbsoluteFill>
  );
};
const Aware: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Title size={46}><Mark c={ORANGE} p={prog(t, 24.4, 25.1)}>Sensibiliser</Mark> aux bonnes pratiques</Title>
      <Photo src="causerie/groupe.jpg" x={60} y={430} w={960} h={700} pos="50% 40%" />
      <Abs x={160} y={1160} w={760} style={{transform: `scale(${spring(t, 25.4)})`, background: '#fff', borderRadius: 34, border: `5px solid ${INK}`, padding: '24px 34px'}}><T size={40}>💬 « Port des EPI, zones balisées, signalement… »</T></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── QUOTIDIEN ─────────── */
const Docs: React.FC = () => {
  const t = useT();
  const v = 1 + Math.min(3, Math.floor(prog(t, 28.4, 29.6, (x) => x) * 3));
  const fish = prog(t, 30.8, 31.8, easeInOut);
  return (
    <AbsoluteFill>
      <Abs x={60} y={340} w={460} h={330} style={{background: '#fff', borderRadius: 24, border: `5px solid ${BLUE}`, padding: 26, boxSizing: 'border-box', opacity: pop(t, 28.3)}}>
        <T size={32}>Documents HSE</T>
        <div style={{marginTop: 20, display: 'flex', alignItems: 'center', gap: 16}}><F n="dossier" size={100} /><div style={{padding: '8px 20px', borderRadius: 14, background: BLUE}}><T size={50} color="#fff">v{v}.0</T></div></div>
        <Hand size={36} color={DIM}>mis à jour</Hand>
      </Abs>
      <Abs x={560} y={340} w={460} h={330} style={{background: '#fff', borderRadius: 24, border: `5px solid ${VIO}`, padding: 26, boxSizing: 'border-box', opacity: pop(t, 30.7)}}>
        <T size={32}>Analyse de risques</T>
        <svg width={400} height={200} style={{marginTop: 10}}>
          <line x1={10} y1={100} x2={10 + 360 * fish} y2={100} stroke={INK} strokeWidth={6} />
          {[0, 1, 2].map((k) => <React.Fragment key={k}><line x1={60 + k * 110} y1={20} x2={100 + k * 110} y2={100} stroke={VIO} strokeWidth={5} opacity={fish > 0.3 + k * 0.2 ? 1 : 0} /><line x1={60 + k * 110} y1={180} x2={100 + k * 110} y2={100} stroke={VIO} strokeWidth={5} opacity={fish > 0.4 + k * 0.2 ? 1 : 0} /></React.Fragment>)}
          <rect x={360} y={75} width={36} height={50} fill={RED} opacity={fish > 0.95 ? 1 : 0} />
        </svg>
      </Abs>
      <Abs x={60} y={710} w={460} h={560} style={{background: '#FFFBEA', borderRadius: 24, border: `5px solid ${ORANGE}`, padding: 26, boxSizing: 'border-box', opacity: pop(t, 32.6)}}>
        <T size={32}>Registre des incidents</T>
        {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{marginTop: 22, height: 14, borderRadius: 7, background: t > 32.8 + k * 0.2 ? ORANGE : '#E3E6EC', width: `${70 + (k % 3) * 10}%`}} />)}
      </Abs>
      <Abs x={560} y={710} w={460} h={560} style={{background: '#fff', borderRadius: 24, border: `5px solid ${GREEN}`, padding: 26, boxSizing: 'border-box', opacity: pop(t, 34.6)}}>
        <T size={32}>Indicateurs sécurité</T>
        <div style={{display: 'flex', alignItems: 'flex-end', gap: 24, height: 360, marginTop: 20}}>
          {[0.5, 0.7, 0.6, 0.9].map((h, k) => <div key={k} style={{width: 70, height: 340 * h * prog(t, 34.8 + k * 0.15, 35.5 + k * 0.15), background: GREEN, borderRadius: '12px 12px 0 0'}} />)}
        </div>
      </Abs>
    </AbsoluteFill>
  );
};
const Approved: React.FC = () => {
  const t = useT();
  const C = [{at: 38.8, l: 'Documentées'}, {at: 39.8, l: 'Suivies'}, {at: 40.6, l: 'Réalisées dans les délais'}];
  return (
    <AbsoluteFill>
      <Title>Les actions de prévention</Title>
      <Photo src="iso26/tablette-matrice.jpg" x={60} y={430} w={960} h={460} pos="50% 50%" />
      {C.map((c, i) => (
        <Abs key={i} x={120} y={940 + i * 150} w={840} h={120} style={{opacity: pop(t, c.at), display: 'flex', alignItems: 'center', gap: 22, background: '#fff', borderRadius: 22, padding: '0 28px', boxSizing: 'border-box', border: `4px solid ${GREEN}`}}>
          <div style={{width: 70, height: 70, borderRadius: 35, background: GREEN, color: '#fff', fontSize: 46, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, c.at)})`}}>✓</div>
          <T size={40}>{c.l}</T>
        </Abs>
      ))}
      {t > 41.0 && <Abs x={600} y={700} style={{transform: `rotate(-12deg) scale(${spring(t, 41.0, 8, 16)})`, border: `7px solid ${GREEN}`, borderRadius: 14, padding: '4px 20px', background: '#ffffffee'}}><T size={56} color={GREEN}>APPROUVÉ</T></Abs>}
    </AbsoluteFill>
  );
};

/* ─────────── LA DIFFÉRENCE ─────────── */
const Small: React.FC = () => {
  const t = useT();
  const fade = prog(t, 45.4, 46.2);
  const drive = prog(t, 51.8, 52.6);
  return (
    <AbsoluteFill>
      <Abs x={0} y={420} w={1080} style={{textAlign: 'center', opacity: 1 - fade}}>
        <T size={52}>Pas toujours par de <Mark c={RED} p={prog(t, 44.4, 45.0)}>grandes décisions</Mark>…</T>
        <div style={{fontSize: 240, marginTop: 20, transform: `scale(${1 - fade * 0.4})`}}>🏛</div>
      </Abs>
      {fade > 0 && (
        <AbsoluteFill style={{opacity: fade}}>
          <Row y={430}><T size={52}>…mais par les <Mark c={GREEN}>petits gestes</Mark></T></Row>
          <Row y={560} gap={16}>
            {[{at: 47.6, l: '🚩 Anomalie repérée', c: ORANGE}, {at: 48.9, l: '⚠ Danger signalé', c: RED}, {at: 50.4, l: '✓ Action clôturée', c: GREEN}].map((c) => <div key={c.l} style={{transform: `scale(${spring(t, c.at)})`}}><Chip c={c.c} light size={32}>{c.l}</Chip></div>)}
          </Row>
          <Abs x={90} y={760}><Train w={900} n={12} drive={drive} /></Abs>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
const Difference: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Title>Il <Mark c={GREEN} p={prog(t, 54.6, 55.3)}>fait la différence</Mark></Title>
      <Photo src="induction/mine-equipe.jpg" x={60} y={430} w={960} h={620} pos="50% 35%" />
      <Abs x={90} y={1090}><Train w={900} n={12} drive={1} /></Abs>
      {t > 58.0 && <Row y={1520}><div style={{transform: `scale(${spring(t, 58.0)})`}}><Chip c={GREEN} light size={40}>La prévention, une réalité quotidienne</Chip></div></Row>}
    </AbsoluteFill>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2}, {at: 6.2, s: 'page', v: 0.5}, ...rep(6.8, 8, 0.22, 'sfx/swish', 0.18),
  ...PT.flatMap((p) => [...rep(p.at, 10, 0.04, 'page', 0.18), {at: p.at + 0.35, s: 'sfx/pop', v: 0.35}, {at: p.at + WIPE - 0.5, s: 'sfx/whoosh', v: 0.45}]),
  ...COGS.map((at) => ({at, s: 'sfx/click', v: 0.3})),
  ...rep(11.4, 8, 0.12, 'tick', 0.15), {at: 13.9, s: 'sfx/swish', v: 0.3}, {at: 15.4, s: 'alarme', v: 0.1, dur: 0.6},
  {at: 16.8, s: 'sfx/thud', v: 0.45}, {at: 18.4, s: 'sfx/rise', v: 0.25}, {at: 19.6, s: 'validation', v: 0.3},
  ...[21.5, 21.8, 22.1, 22.4].map((at) => ({at, s: 'sfx/ding', v: 0.18})), {at: 25.4, s: 'notification', v: 0.25},
  ...rep(28.4, 3, 0.4, 'sfx/click', 0.3), {at: 30.8, s: 'stylo', v: 0.35}, ...rep(32.8, 5, 0.2, 'stylo', 0.18), ...rep(34.8, 4, 0.15, 'sfx/pop', 0.2),
  ...[38.8, 39.8, 40.6].map((at) => ({at, s: 'sfx/ding', v: 0.25})), {at: 41.0, s: 'tampon', v: 0.55},
  {at: 44.4, s: 'deep-hit', v: 0.3}, {at: 45.6, s: 'soft-whoosh', v: 0.3, dur: 1}, ...[47.6, 48.9, 50.4].map((at) => ({at, s: 'sfx/pop', v: 0.3})), {at: 51.8, s: 'sfx/rise', v: 0.35}, ...rep(52.0, 10, 0.25, 'tick', 0.16),
  {at: 53.0, s: 'sfx/whoosh', v: 0.3}, {at: 58.0, s: 'validation', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Assistant: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.0} to={9.6}><Sc a={2.5} b={9.6}><Binder /></Sc></Gate>
    <Gate from={11.1} to={27.0}>
      <Sc a={11.2} b={16.6}><Field /></Sc>
      <Sc a={16.5} b={20.3}><Flag /></Sc>
      <Sc a={20.2} b={24.3}><Shelf /></Sc>
      <Sc a={24.2} b={26.9}><Aware /></Sc>
    </Gate>
    <Gate from={28.5} to={42.2}>
      <Sc a={28.6} b={36.3}><Docs /></Sc>
      <Sc a={36.2} b={42.1}><Approved /></Sc>
    </Gate>
    <Gate from={43.7} to={OUTRO_AT}>
      <Sc a={43.8} b={53.0}><Small /></Sc>
      <Sc a={52.9} b={OUTRO_AT}><Difference /></Sc>
    </Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><PostIt p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-assistant-hse-origine.m4a')} trimAfter={s(60.2)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {easeInOut, easeOut, Enter, Gate, Kinetic, prog, useT} from '../anim';
import {PhotoCard, RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {Stamp} from '../danger2/ui';
import {F} from '../iso/ui';
import {BLUE} from '../pieges/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, handFont, s, sansFont} from '../theme';
import {captions} from './captions';

const LOGO = 'promo/logo.png';
const DEF = 8.54;
const EX = 19.26;
const MATRIX = 56.4;
const CONCL = 65.38;
const OUTRO_AT = 71.6;
export const SWOT_FRAMES = s(75.0);
const ORANGE = '#EE7D1A';

type Q = {k: string; fr: string; en: string; color: string; at: number; end: number; ord: string; img: [string, number, number?][]; items: [string, number, string][]; internal: boolean};
const QS: Q[] = [
  {k: 'S', fr: 'Forces', en: 'Strengths', color: colors.green, at: 24.0, end: 31.62, ord: 'Premièrement', internal: true,
    img: [['swot/chef-client.jpg', 24.6]],
    items: [['Bonne qualité des plats', 26.02, 'assiette'], ['Prix accessibles', 27.54, 'argent'], ['Bon emplacement', 28.98, 'epingle'], ['Clients fidèles', 29.98, 'coeur']]},
  {k: 'W', fr: 'Faiblesses', en: 'Weaknesses', color: ORANGE, at: 31.62, end: 39.92, ord: 'Deuxièmement', internal: true,
    img: [['swot/cuisine-saturee.jpg', 32.2, 37.9], ['swot/salle-pleine.jpg', 38.0]],
    items: [['Espace limité', 33.24, 'brique'], ['Personnel peu nombreux', 34.78, 'equipe'], ['Faible capacité aux heures de pointe', 36.48, 'chrono']]},
  {k: 'O', fr: 'Opportunités', en: 'Opportunities', color: BLUE, at: 39.92, end: 48.48, ord: 'Troisièmement', internal: false,
    img: [['swot/livraison-appli.jpg', 40.5]],
    items: [['Livraison à domicile', 41.92, 'scooter'], ['Réseaux sociaux', 43.6, 'telephone'], ['Repas à emporter', 45.7, 'emporter']]},
  {k: 'T', fr: 'Menaces', en: 'Threats', color: RED, at: 48.48, end: MATRIX, ord: 'Quatrièmement', internal: false,
    img: [['swot/nouveau-bistrot.jpg', 49.1, 51.9], ['swot/hausse-prix.jpg', 51.96, 54.0], ['swot/pouvoir-achat.jpg', 54.1]],
    items: [['Nouveaux restaurants', 50.18, 'batiment'], ['Hausse des matières premières', 51.96, 'hausse'], ['Baisse du pouvoir d\'achat', 54.1, 'baisse']]},
];
const card = (c: string): React.CSSProperties => ({background: '#fff', borderRadius: 24, boxShadow: '0 10px 22px rgba(14,30,60,0.14)', borderLeft: `12px solid ${c}`});

/** Tuile-lettre façon post-it. */
const Tile: React.FC<{q: Q; size: number; p?: number}> = ({q, size, p = 1}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.14, background: q.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.66, boxShadow: `0 ${size * 0.07}px ${size * 0.16}px rgba(14,30,60,0.28)`, borderBottom: `${size * 0.05}px solid rgba(0,0,0,0.22)`, transform: `scale(${p}) rotate(${(1 - p) * -14}deg)`, opacity: Math.min(1, p * 2)}}>{q.k}</div>
);

const Intro: React.FC = () => {
  const t = useT();
  const fall = prog(t, 4.6, 6.0, easeInOut);
  return (
    <AbsoluteFill>
      <Kinetic text="Si tu es *entrepreneur*" at={0.1} until={3.9} y={460} size={92} />
      <PhotoCard src="swot/postits.jpg" at={2.4} until={4.0} x={540} y={960} w={900} h={600} pos="62% 50%" from="scale" />
      <Gate from={3.9} to={DEF}>
        <div style={{position: 'absolute', left: 140, top: 640, width: 800, height: 520, opacity: prog(t, 3.95, 4.3)}}>
          <svg width={800} height={520} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
            <path d="M0 470 H800 M0 470 V0" stroke={colors.navy} strokeWidth={6} />
            <path d={`M20 300 L200 250 L360 240 L520 ${240 + fall * 60} L780 ${250 + fall * 170}`} fill="none" stroke={RED} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{position: 'absolute', left: 20 + fall * 600, top: 170 + fall * 120}}><F n="escargot" size={130} /></div>
        </div>
        <Enter at={4.3} x={540} y={480} bouncy>
          <div style={{background: RED, color: '#fff', borderRadius: 20, padding: '8px 28px', fontFamily: sansFont, fontWeight: 900, fontSize: 60, whiteSpace: 'nowrap', transform: 'rotate(-3deg)'}}>RISQUE DE STAGNER</div>
        </Enter>
        {(['ampoule', 'fusee', 'cible'] as const).map((ic, k) => {
          const at = 6.3 + k * 0.25;
          const p = prog(t, at, at + 1.6, easeOut);
          return <div key={ic} style={{position: 'absolute', left: 220 + k * 280 + p * (k - 1) * 120, top: 1300 - p * 160, opacity: prog(t, at, at + 0.2) * (1 - prog(t, at + 0.8, at + 1.6))}}><F n={ic} size={130} /></div>;
        })}
        <Enter at={6.2} x={540} y={1480} from="up">
          <div style={{fontFamily: handFont, fontSize: 60, color: colors.navy, whiteSpace: 'nowrap'}}>… et de rater des <span style={{color: colors.green}}>opportunités</span></div>
        </Enter>
      </Gate>
    </AbsoluteFill>
  );
};

/** Définition : S, W, O, T qui se déplient. */
const Definition: React.FC = () => {
  const t = useT();
  const ats = [14.42, 15.36, 16.4, 17.36];
  return (
    <AbsoluteFill>
      <Kinetic text="C'est quoi le *SWOT* ?" at={DEF + 0.1} y={440} size={96} />
      <Enter at={11.0} x={540} y={600} from="up">
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: colors.navy, color: '#fff', borderRadius: 20, padding: '10px 26px', fontFamily: sansFont, fontWeight: 800, fontSize: 34, whiteSpace: 'nowrap'}}>
          <F n="loupe" size={54} /> Un outil d'analyse <span style={{color: colors.greenLight}}>stratégique</span>
        </div>
      </Enter>
      {QS.map((q, i) => {
        const at = ats[i];
        const p = prog(t, at - 0.15, at + 0.3, easeOut);
        const x = i % 2 ? 560 : 60;
        const y = 720 + Math.floor(i / 2) * 400;
        return (
          <div key={q.k} style={{position: 'absolute', left: x, top: y, width: 460, height: 370, borderRadius: 34, background: '#fff', boxShadow: '0 16px 32px rgba(14,30,60,0.16)', borderBottom: `10px solid ${q.color}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: Math.min(1, p * 2), transform: `scale(${0.7 + 0.3 * p})`}}>
            <Tile q={q} size={170} p={p} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: q.color}}>{q.fr}</div>
            <div style={{fontFamily: sansFont, fontStyle: 'italic', fontWeight: 700, fontSize: 28, color: '#7A8594'}}>{q.en}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const Example: React.FC = () => (
  <AbsoluteFill>
    <Kinetic text="Prenons un *exemple*" at={EX + 0.1} y={440} size={90} />
    <PhotoCard src="swot/salle-pleine.jpg" at={20.4} x={540} y={960} w={900} h={640} from="scale" label="Un petit restaurant" icon="cuisinier" />
  </AbsoluteFill>
);

/** Mini-matrice 2×2 indiquant le quadrant en cours. */
const MiniMap: React.FC<{active: number; at: number}> = ({active, at}) => {
  const t = useT();
  return (
    <div style={{position: 'absolute', right: 50, top: 300, display: 'grid', gridTemplateColumns: 'repeat(2, 56px)', gap: 8, opacity: prog(t, at, at + 0.3)}}>
      {QS.map((q, k) => <div key={q.k} style={{width: 56, height: 56, borderRadius: 12, background: k === active ? q.color : k < active ? '#9AA5B3' : '#D5D9DE', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: k === active ? `scale(${1 + 0.15 * (1 - prog(t, at + 0.2, at + 0.6))})` : undefined}}>{q.k}</div>)}
    </div>
  );
};

const Quadrant: React.FC<{q: Q; i: number}> = ({q, i}) => {
  const t = useT();
  const top = q.items.length >= 4 ? 1150 : 1190;
  return (
    <AbsoluteFill style={{opacity: 1 - prog(t, q.end - 0.15, q.end)}}>
      <MiniMap active={i} at={q.at} />
      <div style={{position: 'absolute', left: 50, top: 290, display: 'flex', alignItems: 'center', gap: 22}}>
        <Tile q={q} size={150} p={prog(t, q.at + 0.05, q.at + 0.45, easeOut)} />
        <div style={{opacity: prog(t, q.at + 0.25, q.at + 0.55), transform: `translateX(${(1 - prog(t, q.at + 0.25, q.at + 0.6)) * -40}px)`}}>
          <div style={{fontFamily: handFont, fontSize: 40, color: '#7A8594'}}>{q.ord}</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 76, color: q.color, lineHeight: 1}}>{q.fr.toUpperCase()}</div>
          <div style={{fontFamily: sansFont, fontStyle: 'italic', fontWeight: 700, fontSize: 28, color: '#7A8594'}}>{q.en} · facteur {q.internal ? 'interne' : 'externe'}</div>
        </div>
      </div>
      {q.img.map(([src, at, until]) => <PhotoCard key={src} src={src} at={at} until={until} x={540} y={800} w={900} h={560} rotate={i % 2 ? 1.5 : -1.5} from={i % 2 ? 'right' : 'left'} />)}
      {q.items.map(([l, at, ic], k) => {
        const p = prog(t, at - 0.1, at + 0.3, easeOut);
        return (
          <div key={l} style={{...card(q.color), position: 'absolute', left: 60, top: top + k * 98, width: 960, height: 84, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px', opacity: p, transform: `translateX(${(1 - p) * -90}px)`}}>
            <F n={ic} size={60} />
            <div style={{flex: 1, fontFamily: sansFont, fontWeight: 800, fontSize: l.length > 28 ? 34 : 40, color: colors.navy, whiteSpace: 'nowrap'}}>{l}</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: q.color, transform: `scale(${prog(t, at + 0.3, at + 0.55, easeOut)})`}}>{q.internal ? (q.k === 'S' ? '+' : '−') : q.k === 'O' ? '↗' : '⚠'}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/** La matrice complète, puis interne / externe. */
const Matrix: React.FC = () => {
  const t = useT();
  const inT = prog(t, 59.0, 59.5, easeOut);
  const exT = prog(t, 62.3, 62.8, easeOut);
  const thumbs = ['swot/chef-client.jpg', 'swot/cuisine-saturee.jpg', 'swot/livraison-appli.jpg', 'swot/nouveau-bistrot.jpg'];
  return (
    <AbsoluteFill>
      <Kinetic text="L'analyse *SWOT* complète" at={MATRIX + 0.1} y={420} size={80} />
      <PhotoCard src="swot/modele.png" at={MATRIX + 0.3} until={58.45} x={540} y={1000} w={620} h={880} pos="50% 30%" from="scale" label="Modèle SWOT" icon="memo" />
      {QS.map((q, i) => {
        const p = prog(t, 58.5 + i * 0.12, 58.85 + i * 0.12, easeOut);
        const x = 180 + (i % 2) * 430;
        const y = 560 + Math.floor(i / 2) * 470;
        const hl = q.internal ? inT * (1 - exT * 0.6) : exT;
        return (
          <div key={q.k} style={{position: 'absolute', left: x, top: y, width: 410, height: 440, borderRadius: 32, overflow: 'hidden', background: '#fff', boxShadow: `0 16px 32px rgba(14,30,60,${0.16 + hl * 0.14})`, border: `6px solid ${q.color}`, opacity: Math.min(1, p * 2) * (t > 59 && hl < 0.3 ? 0.55 : 1), transform: `scale(${(0.7 + 0.3 * p) * (1 + hl * 0.03)})`}}>
            <div style={{background: q.color, color: '#fff', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12, fontFamily: sansFont, fontWeight: 900, fontSize: 34}}>
              <span style={{fontSize: 46}}>{q.k}</span>{q.fr}
            </div>
            <div style={{height: 230, backgroundImage: `url(${staticFile(thumbs[i])})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
            <div style={{padding: '10px 18px', fontFamily: handFont, fontSize: 28, color: colors.navy, lineHeight: 1.15}}>{q.items.slice(0, 2).map(([l]) => l).join(' · ')}</div>
          </div>
        );
      })}
      {[[560, inT, 'INTERNES', colors.navy, 'equipe'], [1030, exT, 'EXTERNES', '#6B7684', 'globe']].map(([y, p, l, c, ic]) => (
        <div key={l as string} style={{position: 'absolute', left: 40, top: y as number, width: 120, height: 440, opacity: p as number, transform: `translateX(${(1 - (p as number)) * -60}px)`}}>
          <div style={{position: 'absolute', right: 6, top: 0, bottom: 0, width: 20, borderLeft: `8px solid ${c}`, borderTop: `8px solid ${c}`, borderBottom: `8px solid ${c}`, borderRadius: '20px 0 0 20px'}} />
          <div style={{position: 'absolute', left: -150, top: 200, width: 400, transform: 'rotate(-90deg)', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: c as string, letterSpacing: 3}}>FACTEURS {l}</div>
        </div>
      ))}
      <Enter at={60.2} x={290} y={1540} bouncy><div style={{display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap', background: colors.navy, color: '#fff', borderRadius: 18, padding: '8px 18px', fontFamily: sansFont, fontWeight: 800, fontSize: 28}}><F n="batiment" size={44} /> dans l'entreprise</div></Enter>
      <Enter at={64.1} x={770} y={1540} bouncy><div style={{display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap', background: '#6B7684', color: '#fff', borderRadius: 18, padding: '8px 18px', fontFamily: sansFont, fontWeight: 800, fontSize: 28}}><F n="globe" size={44} /> dans l'environnement</div></Enter>
    </AbsoluteFill>
  );
};

const Conclusion: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Kinetic text="Mieux *décider*" at={CONCL + 0.1} y={420} size={100} />
      <PhotoCard src="swot/manager.jpg" at={65.7} until={68.9} x={540} y={830} w={900} h={620} from="scale" label="L'entrepreneur" icon="pensif" />
      <PhotoCard src="swot/strategie.jpg" at={69.0} x={540} y={830} w={900} h={520} from="right" label="Décisions stratégiques" icon="cible" />
      {[['Comprendre sa situation', 67.42, 'loupe'], ['Meilleures décisions stratégiques', 69.38, 'cible']].map(([l, at, ic], k) => {
        const p = prog(t, (at as number) - 0.1, (at as number) + 0.3, easeOut);
        return (
          <div key={l as string} style={{...card(colors.green), position: 'absolute', left: 60, top: 1230 + k * 102, width: 960, height: 86, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px', opacity: p, transform: `translateX(${(1 - p) * -90}px)`}}>
            <F n={ic as string} size={60} />
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 40, color: colors.navy}}>{l}</div>
          </div>
        );
      })}
      <Enter at={70.4} x={800} y={1080} from="scale"><Stamp text="STRATÉGIE" p={prog(t, 70.4, 70.65)} color={colors.green} size={58} rotate={-8} /></Enter>
    </AbsoluteFill>
  );
};

/** Bruitages seuls (ni musique ni ambiance), calés sur les actions visibles. */
const CUES: Sfx[] = [
  {at: 0.1, s: 'bass-hit', v: 0.55},
  {at: 2.4, s: 'sfx/whoosh', v: 0.5},
  {at: 3.0, s: 'sfx/pop', v: 0.5},
  {at: 3.95, s: 'soft-whoosh', v: 0.45},
  {at: 4.6, s: 'tension', v: 0.3, dur: 1.4},
  {at: 4.3, s: 'tampon', v: 0.65},
  ...[6.3, 6.55, 6.8].map((at) => ({at, s: 'sfx/swish', v: 0.4})),
  // définition
  {at: DEF - 0.3, s: 'soft-whoosh', v: 0.5},
  {at: DEF + 0.1, s: 'deep-hit', v: 0.5},
  {at: 11.0, s: 'sfx/pop', v: 0.45},
  ...[14.42, 15.36, 16.4, 17.36].flatMap((at) => [{at: at - 0.1, s: 'sfx/pop', v: 0.5}, {at: at + 0.15, s: 'tick', v: 0.45}]),
  // exemple
  {at: EX - 0.3, s: 'soft-whoosh', v: 0.5},
  {at: 20.4, s: 'sfx/whoosh', v: 0.5},
  {at: 22.3, s: 'sfx/ding', v: 0.45},
  // quadrants
  ...QS.flatMap((q) => [
    {at: q.at - 0.3, s: 'soft-whoosh', v: 0.5},
    {at: q.at + 0.1, s: 'deep-hit', v: 0.5},
    {at: q.at + 0.15, s: 'sfx/pop', v: 0.5},
    ...q.img.map(([, at]) => ({at, s: 'sfx/whoosh', v: 0.42})),
    ...q.items.flatMap(([, at]) => [{at: at - 0.05, s: 'sfx/swish', v: 0.35}, {at: at + 0.35, s: q.internal ? 'tick' : 'sfx/click', v: 0.5}]),
  ]),
  {at: 50.2, s: 'alarme', v: 0.2, dur: 0.7},
  // matrice
  {at: MATRIX - 0.3, s: 'soft-whoosh', v: 0.5},
  {at: MATRIX + 0.3, s: 'sfx/whoosh', v: 0.45},
  ...QS.map((_, i) => ({at: 58.5 + i * 0.12, s: 'sfx/pop', v: 0.45})),
  {at: 59.0, s: 'sfx/swish', v: 0.5},
  {at: 59.1, s: 'deep-hit', v: 0.45},
  {at: 60.2, s: 'sfx/pop', v: 0.45},
  {at: 62.3, s: 'sfx/swish', v: 0.5},
  {at: 62.4, s: 'deep-hit', v: 0.45},
  {at: 64.1, s: 'sfx/pop', v: 0.45},
  // conclusion
  {at: CONCL - 0.3, s: 'soft-whoosh', v: 0.5},
  {at: CONCL + 0.1, s: 'bass-hit', v: 0.5},
  {at: 67.42, s: 'validation', v: 0.45},
  {at: 69.0, s: 'sfx/whoosh', v: 0.45},
  {at: 69.38, s: 'validation', v: 0.45},
  {at: 70.4, s: 'tampon', v: 0.75},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Swot: React.FC = () => (
  <AbsoluteFill>
    <Camera shakes={[4.3]}>
      <Background />
      <Gate from={0} to={DEF}><Intro /></Gate>
      <Gate from={DEF} to={EX}><Definition /></Gate>
      <Gate from={EX} to={QS[0].at}><Example /></Gate>
      {QS.map((q, i) => <Gate key={q.k} from={q.at} to={q.end}><Quadrant q={q} i={i} /></Gate>)}
      <Gate from={MATRIX} to={CONCL}><Matrix /></Gate>
      <Gate from={CONCL} to={OUTRO_AT}><Conclusion /></Gate>
      <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    </Camera>
    <Header hideAt={OUTRO_AT} logo={LOGO} />
    <Footer hideAt={OUTRO_AT} />
    {[DEF, EX, MATRIX, CONCL, OUTRO_AT].map((at) => <Wipe key={at} at={at} />)}
    {QS.map((q) => <Wipe key={q.k} at={q.at} color={q.color} />)}
    <Captions captions={captions} />
    <Audio src={staticFile('voix-off-swot.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

import React from 'react';
import {AbsoluteFill, Audio, Img, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Gate, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Check} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s, sansFont} from '../theme';
import {captions} from './captions';

/**
 * « Le rôle stratégique des grandes normes ISO » (2 min 36) — UI motion premium (skill video-promo-diagnostic-qhse),
 * voix d'origine. Technique nouvelle dans la série : plan de métro des normes — 9 stations sur une ligne multicolore,
 * une rame qui roule le long des courbes (caméra embarquée qui la suit), un panneau « station » qui s'ouvre à chaque
 * arrêt avec mots-clés synchronisés sur la voix, puis vue d'ensemble du réseau.
 */
const LOGO = 'promo/logo.png';
const INK = '#F3F6FA';
const DIM = 'rgba(243,246,250,0.6)';
const BG = '#0B1626';
type St = {n: string; def?: string; dom: string; c: string; icon: string; at: number; kw: [string, number][]; note?: [string, number]};
const ST: St[] = [
  {n: 'ISO 9001', def: "Système de management de la qualité", dom: 'Qualité', c: '#3D86E0', icon: 'pouce', at: 12.4, kw: [['Clients satisfaits', 19.8], ['Processus maîtrisés', 21.4], ['Amélioration continue', 22.6]]},
  {n: 'ISO 14001', def: "Maîtriser les impacts environnementaux", dom: 'Environnement', c: '#2EAE5A', icon: 'feuille', at: 25.6, kw: [['Impacts', 29.6], ['Pollutions évitées', 31.6], ['Déchets gérés', 33.4]]},
  {n: 'ISO 45001', def: "Système de management santé-sécurité", dom: 'Santé-sécurité au travail', c: '#F0922F', icon: 'casque', at: 36.8, kw: [['Dangers identifiés', 45.0], ['Risques évalués', 46.6], ['Accidents et maladies prévenus', 48.8]]},
  {n: 'ISO 22000', def: "Sécurité des denrées alimentaires", dom: 'Sécurité des aliments', c: '#D9B21F', icon: 'assiette', at: 51.6, kw: [['Chaîne alimentaire', 60.0], ['Dangers biologiques, chimiques, physiques', 62.6], ['Aliments sûrs', 66.0]]},
  {n: 'ISO 26000', def: "Lignes directrices de responsabilité sociétale", dom: 'Responsabilité sociétale', c: '#8C6BD6', icon: 'equipe', at: 67.2, kw: [['Social', 74.6], ['Environnemental', 75.4], ['Éthique', 76.2]], note: ['Lignes directrices · non certifiable', 79.2]},
  {n: 'ISO 50001', def: "Améliorer la performance énergétique", dom: 'Énergie', c: '#22B394', icon: 'eclair', at: 85.0, kw: [['Performance énergétique', 89.0], ['Consommation réduite', 91.2], ['Coûts maîtrisés', 94.8]]},
  {n: 'ISO 27001', def: "Système de management de la sécurité de l'information", dom: "Sécurité de l'information", c: '#5B6FE0', icon: 'cadenas', at: 95.6, kw: [['Confidentialité', 103.6], ['Intégrité', 104.8], ['Disponibilité', 106.0]]},
  {n: 'ISO 13485', def: "Qualité des dispositifs médicaux", dom: 'Dispositifs médicaux', c: '#E0669A', icon: 'stethoscope', at: 109.8, kw: [['Processus maîtrisés', 122.0], ['Exigences réglementaires', 124.0]]},
  {n: 'ISO/IEC 17025', def: "Compétence des laboratoires", dom: "Laboratoires d'essais et d'étalonnage", c: '#2FB3CF', icon: 'microscope', at: 125.8, kw: [['Compétence', 130.4], ['Impartialité', 131.4], ['Fiabilité des résultats', 137.0]]},
];
const FINAL = 142.0;
const OUTRO_AT = 155.8;
export const ROLENORMES_FRAMES = s(OUTRO_AT + 3.8);
const pos = (i: number): [number, number] => [i % 2 ? 790 : 290, 520 + i * 640];
const TRAVEL = 1.8;

const pop = (t: number, at: number, d = 0.35) => prog(t, at, at + d, easeOut);
const T: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 34, color = INK, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, textTransform: 'uppercase', letterSpacing: -0.5, textAlign: 'center', lineHeight: 1.05, ...style}}>{children}</div>
);
const bez = (i: number, u: number): [number, number] => {
  const [x0, y0] = pos(i);
  const [x3, y3] = pos(i + 1);
  const c1 = [x0, y0 + 360], c2 = [x3, y3 - 360];
  const m = 1 - u;
  return [m * m * m * x0 + 3 * m * m * u * c1[0] + 3 * m * u * u * c2[0] + u * u * u * x3, m * m * m * y0 + 3 * m * m * u * c1[1] + 3 * m * u * u * c2[1] + u * u * u * y3];
};
/** Position de la rame : à l'arrêt en station, ou en route vers la suivante. */
const train = (t: number): [number, number, number] => {
  let idx = 0;
  for (let i = 0; i < ST.length; i++) if (t >= ST[i].at - TRAVEL) idx = i;
  if (t < ST[0].at - TRAVEL) return [...pos(0), 0];
  const u = prog(t, ST[idx].at - TRAVEL, ST[idx].at, easeInOut);
  if (idx === 0) return [...pos(0), 0];
  const [x, y] = bez(idx - 1, u);
  return [x, y, idx - 1 + u];
};

/* ─────────── Plan du réseau ─────────── */
const Map: React.FC = () => {
  const t = useT();
  const draw = prog(t, 1.0, 6.0, easeInOut);
  const [tx, ty, prog01] = train(t);
  // caméra : vue d'ensemble au début et à la fin, sinon suit la rame
  const ovScale = 0.19;
  const ovY = (520 + 8 * 640 + 520) / 2;
  const intro = 1 - prog(t, 9.6, 12.0, easeInOut);
  const outro = prog(t, FINAL, FINAL + 2.0, easeInOut);
  const ov = Math.max(intro, outro);
  const sc = 1 + (ovScale - 1) * ov;
  const camX = 540 * ov + tx * (1 - ov);
  const camY = ovY * ov + ty * (1 - ov);
  const screenY = 700 * (1 - ov) + 1060 * ov;
  const segs = ST.slice(0, -1).map((_, i) => {
    const [x0, y0] = pos(i);
    const [x3, y3] = pos(i + 1);
    return `M${x0} ${y0} C ${x0} ${y0 + 360}, ${x3} ${y3 - 360}, ${x3} ${y3}`;
  });
  return (
    <div style={{position: 'absolute', left: 0, top: 0, transformOrigin: '0 0', transform: `translate(${540 - camX * sc}px, ${screenY - camY * sc}px) scale(${sc})`}}>
      <svg width={1080} height={6400} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
        {segs.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={46} strokeLinecap="round" />
            <path d={d} fill="none" stroke={ST[i + 1].c} strokeWidth={30} strokeLinecap="round" pathLength={1} strokeDasharray={`${Math.max(0, Math.min(1, draw * 8 - i))} 1`} opacity={prog01 >= i + 1 || t > FINAL ? 1 : 0.45} />
          </g>
        ))}
      </svg>
      {ST.map((st, i) => {
        const [x, y] = pos(i);
        const reached = t >= st.at - 0.1;
        const here = reached && (i === ST.length - 1 || t < ST[i + 1].at - TRAVEL) && t < FINAL;
        const blink = t > 152.2 && Math.floor((t + i * 0.13) * 3) % 2;
        return (
          <div key={st.n} style={{position: 'absolute', left: x - 70, top: y - 70, width: 140, height: 140, opacity: pop(t, 1.0 + i * 0.4, 0.4)}}>
            <div style={{width: 140, height: 140, borderRadius: 70, background: reached ? st.c : '#13233A', border: `14px solid ${reached ? '#fff' : st.c}`, boxSizing: 'border-box', boxShadow: here ? `0 0 0 ${16 + Math.sin(t * 5) * 8}px ${st.c}55` : blink ? `0 0 0 20px ${st.c}66` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {reached ? <Check p={1} size={60} color="#fff" /> : <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: st.c}}>{i + 1}</div>}
            </div>
            <div style={{position: 'absolute', top: 20, [i % 2 ? 'right' : 'left']: 170, width: 540, textAlign: i % 2 ? 'right' : 'left'}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 58, color: INK}}>{st.n}</div>
              <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 28, color: st.c, textTransform: 'uppercase', lineHeight: 1.1}}>{st.dom}</div>
            </div>
          </div>
        );
      })}
      {/* rame */}
      {t > ST[0].at - TRAVEL - 0.5 && t < FINAL + 0.5 && (
        <div style={{position: 'absolute', left: tx - 60, top: ty - 60, width: 120, height: 120, borderRadius: 30, background: '#fff', boxShadow: '0 0 40px rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5}}>
          <div style={{width: 70, height: 50, borderRadius: 14, background: '#0B1626', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 8px', boxSizing: 'border-box'}}>{[0, 1].map((k) => <div key={k} style={{width: 18, height: 24, borderRadius: 4, background: '#7CC4FF'}} />)}</div>
        </div>
      )}
    </div>
  );
};

/* ─────────── Panneau « station » ─────────── */
const Panel: React.FC = () => {
  const t = useT();
  const i = ST.reduce((a, st, k) => (t >= st.at - 0.2 ? k : a), -1);
  if (i < 0 || t >= FINAL - 0.3) return null;
  const st = ST[i];
  const next = i < ST.length - 1 ? ST[i + 1].at - TRAVEL : FINAL - 0.3;
  const p = pop(t, st.at - 0.2, 0.5) * (1 - prog(t, next - 0.4, next));
  return (
    <div style={{position: 'absolute', left: 50, right: 50, top: 1000, height: 600, borderRadius: 40, background: 'rgba(15,28,48,0.92)', border: `4px solid ${st.c}`, boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 60px ${st.c}33`, transform: `translateY(${(1 - p) * 700}px)`, opacity: p, overflow: 'hidden', zIndex: 20}}>
      <div style={{height: 150, background: st.c, display: 'flex', alignItems: 'center', gap: 22, padding: '0 34px'}}>
        <div style={{width: 110, height: 110, borderRadius: 55, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={st.icon} size={80} /></div>
        <div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: '#fff', lineHeight: 1}}>{st.n}</div>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: 'rgba(255,255,255,0.88)', textTransform: 'uppercase'}}>{st.dom}</div>
        </div>
        <div style={{marginLeft: 'auto', fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: 'rgba(255,255,255,0.35)'}}>{i + 1}/9</div>
      </div>
      {st.n === 'ISO 27001' ? (
        <svg width={980} height={430} viewBox="0 0 980 430">
          <path d="M490 40 L800 380 L180 380 Z" fill="none" stroke={st.c} strokeWidth={10} pathLength={1} strokeDasharray={`${prog(t, 103.4, 106.4)} 1`} />
          {st.kw.map(([l, at], k) => {
            const [x, y] = [[490, 40], [180, 380], [800, 380]][k];
            const q = pop(t, at, 0.3);
            return <g key={l} opacity={q}><circle cx={x} cy={y} r={30 * q} fill={st.c} /><text x={x} y={k ? y - 50 : y + 80} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={36} fill={INK}>{l.toUpperCase()}</text></g>;
          })}
        </svg>
      ) : (
        <div style={{padding: '34px 40px', display: 'flex', flexDirection: 'column', gap: 20}}>
          {st.def && <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 32, color: DIM, opacity: pop(t, st.at + 1.4, 0.5)}}>{st.def}</div>}
          {st.kw.map(([l, at]) => {
            const q = pop(t, at, 0.4);
            return (
              <div key={l} style={{display: 'flex', alignItems: 'center', gap: 18, opacity: q, transform: `translateX(${(1 - q) * -60}px)`}}>
                <Check p={prog(t, at + 0.1, at + 0.5)} size={56} color={st.c} />
                <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: l.length > 30 ? 32 : 40, color: INK}}>{l}</div>
              </div>
            );
          })}
          {st.note && t >= st.note[1] && (
            <div style={{alignSelf: 'flex-start', transform: `scale(${2 - pop(t, st.note[1], 0.25)}) rotate(-3deg)`, opacity: pop(t, st.note[1], 0.25), border: '6px solid #FF6B5B', color: '#FF6B5B', borderRadius: 16, padding: '6px 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, textTransform: 'uppercase'}}>{st.note[0]}</div>
          )}
        </div>
      )}
    </div>
  );
};

/* ─────────── Titres ─────────── */
const Titles: React.FC = () => {
  const t = useT();
  const intro = t < 12.0;
  const fin = t >= FINAL;
  return (
    <>
      <div style={{position: 'absolute', left: '50%', top: 95, transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.94)', borderRadius: 26, padding: '10px 28px', zIndex: 30}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {intro && (
        <div style={{position: 'absolute', left: 60, right: 60, top: 270, zIndex: 30, opacity: pop(t, 0.3) * (1 - prog(t, 11.4, 12.0))}}>
          <T size={60} color={DIM}>Qualité, travailleurs, environnement…</T>
          <T size={96} style={{marginTop: 10}}>9 normes ISO</T>
          <T size={64} color="#7CC4FF">incontournables</T>
        </div>
      )}
      {!intro && !fin && (
        <div style={{position: 'absolute', left: 40, top: 250, zIndex: 30, display: 'flex', gap: 8}}>
          {ST.map((st, k) => <div key={st.n} style={{width: 36, height: 10, borderRadius: 5, background: t >= st.at - 0.1 ? st.c : 'rgba(255,255,255,0.15)'}} />)}
        </div>
      )}
      {fin && (
        <div style={{position: 'absolute', left: 50, right: 50, top: 250, zIndex: 30, opacity: pop(t, FINAL + 0.4)}}>
          <T size={t < 152 ? 60 : 64}>{t < 152 ? 'Un objectif commun' : 'Lesquelles connaissez-vous ?'}</T>
          {t < 152 && <div style={{display: 'flex', justifyContent: 'center', gap: 16, marginTop: 20}}>{[['Performance', 147.2, '#3D86E0'], ['Risques maîtrisés', 148.0, '#F0922F'], ['Confiance', 150.0, '#2EAE5A']].map(([l, at, c]) => <div key={l as string} style={{padding: '12px 22px', borderRadius: 40, background: c as string, transform: `scale(${pop(t, at as number, 0.35)})`}}><T size={30} color="#fff">{l}</T></div>)}</div>}
        </div>
      )}
    </>
  );
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'bass-hit', v: 0.45},
  {at: 1.0, s: 'riser', v: 0.22, dur: 5},
  ...ST.map((_, i) => ({at: 1.0 + i * 0.4, s: 'sfx/click', v: 0.25})),
  {at: 9.6, s: 'soft-whoosh', v: 0.5},
  ...ST.slice(1).map((st) => ({at: st.at - TRAVEL, s: 'soft-whoosh', v: 0.42, dur: 2})),
  ...ST.map((st) => ({at: st.at - 0.1, s: 'sfx/ding', v: 0.32})),
  ...ST.map((st) => ({at: st.at + 0.1, s: 'sfx/swish', v: 0.35})),
  ...ST.flatMap((st) => st.kw.map(([, at]) => ({at, s: 'sfx/pop', v: 0.32}))),
  {at: 79.2, s: 'tampon', v: 0.6},
  {at: FINAL, s: 'soft-whoosh', v: 0.55, dur: 2.5},
  ...[147.2, 148.0, 150.0].map((at) => ({at, s: 'validation', v: 0.35})),
  {at: 152.2, s: 'notification', v: 0.4},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const RoleNormes: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(124,196,255,0.06) 2px, transparent 2px)', backgroundSize: '44px 44px'}} />
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 30%, rgba(61,134,224,0.18), transparent 60%)'}} />
    <Gate from={0} to={OUTRO_AT}><Map /></Gate>
    <Gate from={0} to={OUTRO_AT}><Panel /></Gate>
    <Gate from={0} to={OUTRO_AT}><Titles /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)'}} /></Gate>
    <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-role-normes-iso-origine.m4a')} trimAfter={s(155.6)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

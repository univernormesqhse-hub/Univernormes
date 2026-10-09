import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Gate, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Check} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s, sansFont} from '../theme';
import {captions} from './captions';

/**
 * « Le rôle stratégique des grandes normes ISO » (2 min 40) — version « excellence » du plan de métro des normes.
 * Cinématique du voyage : flou de mouvement proportionnel à la vitesse, traînée lumineuse et lignes de vitesse,
 * parallaxe à deux plans, roulis de caméra dans les courbes, afficheur LED « Prochain arrêt ». À chaque station,
 * le panneau s'ouvre en portes coulissantes et porte une illustration animée propre à la norme (roue PDCA, usine qui
 * verdit, danger → coche, chaîne de la ferme à l'assiette, Venn RSE, aiguille d'énergie, cadenas C-I-D, ECG,
 * cible de mesure). Final : les 9 lignes s'illuminent tour à tour puis convergent vers un pôle « Confiance ».
 */
const LOGO = 'promo/logo.png';
const INK = '#F3F6FA';
const DIM = 'rgba(243,246,250,0.6)';
const BG = '#0B1626';
type St = {n: string; def?: string; dom: string; c: string; icon: string; at: number; kw: [string, number][]; note?: [string, number]};
const ST: St[] = [
  {n: 'ISO 9001', def: 'Système de management de la qualité', dom: 'Qualité', c: '#3D86E0', icon: 'pouce', at: 12.4, kw: [['Clients satisfaits', 19.8], ['Processus maîtrisés', 21.4], ['Amélioration continue', 22.6]]},
  {n: 'ISO 14001', def: 'Maîtriser les impacts environnementaux', dom: 'Environnement', c: '#2EAE5A', icon: 'feuille', at: 25.6, kw: [['Impacts maîtrisés', 29.6], ['Pollutions évitées', 31.6], ['Déchets gérés', 33.4]]},
  {n: 'ISO 45001', def: 'Système de management santé-sécurité', dom: 'Santé-sécurité au travail', c: '#F0922F', icon: 'casque', at: 36.8, kw: [['Dangers identifiés', 45.0], ['Risques évalués', 46.6], ['Accidents prévenus', 48.8]]},
  {n: 'ISO 22000', def: 'Sécurité des denrées alimentaires', dom: 'Sécurité des aliments', c: '#D9B21F', icon: 'assiette', at: 51.6, kw: [['Chaîne alimentaire', 60.0], ['Dangers bio, chimiques, physiques', 62.6], ['Aliments sûrs', 66.0]]},
  {n: 'ISO 26000', def: 'Lignes directrices de responsabilité sociétale', dom: 'Responsabilité sociétale', c: '#8C6BD6', icon: 'equipe', at: 67.2, kw: [['Social', 74.6], ['Environnemental', 75.4], ['Éthique', 76.2]], note: ['Non certifiable', 79.2]},
  {n: 'ISO 50001', def: 'Améliorer la performance énergétique', dom: 'Énergie', c: '#22B394', icon: 'eclair', at: 85.0, kw: [['Performance énergétique', 89.0], ['Consommation réduite', 91.2], ['Coûts maîtrisés', 94.8]]},
  {n: 'ISO 27001', def: "Sécurité de l'information", dom: "Sécurité de l'information", c: '#5B6FE0', icon: 'cadenas', at: 95.6, kw: [['Confidentialité', 103.6], ['Intégrité', 104.8], ['Disponibilité', 106.0]]},
  {n: 'ISO 13485', def: 'Qualité des dispositifs médicaux', dom: 'Dispositifs médicaux', c: '#E0669A', icon: 'stethoscope', at: 109.8, kw: [['Processus maîtrisés', 122.0], ['Exigences réglementaires', 124.0]]},
  {n: 'ISO/IEC 17025', def: 'Compétence des laboratoires', dom: "Laboratoires d'essais et d'étalonnage", c: '#2FB3CF', icon: 'microscope', at: 125.8, kw: [['Compétence', 130.4], ['Impartialité', 131.4], ['Fiabilité des résultats', 137.0]]},
];
const FINAL = 142.0;
const OUTRO_AT = 155.8;
export const ROLENORMES_FRAMES = s(OUTRO_AT + 3.8);
const pos = (i: number): [number, number] => [i % 2 ? 790 : 290, 520 + i * 640];
const TRAVEL = 1.8;
const HUB: [number, number] = [540, 520 + 4 * 640];

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
/** Position de la rame, avancement global et vitesse instantanée (0..1). */
const train = (t: number): {x: number; y: number; p: number; v: number; dx: number} => {
  let idx = 0;
  for (let i = 0; i < ST.length; i++) if (t >= ST[i].at - TRAVEL) idx = i;
  if (t < ST[0].at - TRAVEL || idx === 0) return {x: pos(0)[0], y: pos(0)[1], p: 0, v: 0, dx: 0};
  const raw = Math.min(1, Math.max(0, (t - (ST[idx].at - TRAVEL)) / TRAVEL));
  const u = easeInOut(raw);
  const u2 = easeInOut(Math.min(1, raw + 0.02));
  const [x, y] = bez(idx - 1, u);
  const [x2] = bez(idx - 1, u2);
  const v = raw > 0 && raw < 1 ? Math.sin(raw * Math.PI) : 0;
  return {x, y, p: idx - 1 + u, v, dx: x2 - x};
};

/* ─────────── Plan du réseau (caméra embarquée) ─────────── */
const Map: React.FC = () => {
  const t = useT();
  const draw = prog(t, 1.0, 6.0, easeInOut);
  const tr = train(t);
  const ovScale = 0.19;
  const ovY = (520 + 8 * 640 + 520) / 2;
  const intro = 1 - prog(t, 9.6, 12.0, easeInOut);
  const outro = prog(t, FINAL, FINAL + 2.0, easeInOut);
  const ov = Math.max(intro, outro);
  const sc = (1 + (ovScale - 1) * ov) * (1 - 0.06 * tr.v);
  const camX = 540 * ov + tr.x * (1 - ov);
  const camY = ovY * ov + tr.y * (1 - ov);
  const screenY = 700 * (1 - ov) + 1060 * ov;
  const roll = tr.dx * 0.25 * (1 - ov);
  const blur = tr.v * 3.5 * (1 - ov);
  const glowAll = prog(t, FINAL + 1.6, FINAL + 4.2);
  const converge = prog(t, 147.0, 150.6, easeInOut);
  const segs = ST.slice(0, -1).map((_, i) => {
    const [x0, y0] = pos(i);
    const [x3, y3] = pos(i + 1);
    return `M${x0} ${y0} C ${x0} ${y0 + 360}, ${x3} ${y3 - 360}, ${x3} ${y3}`;
  });
  return (
    <AbsoluteFill style={{transform: `rotate(${roll}deg)`, filter: blur > 0.2 ? `blur(${blur}px)` : undefined}}>
      {/* plan lointain : poussière d'étoiles (parallaxe 30 %) */}
      <div style={{position: 'absolute', left: 0, top: 0, transform: `translate(${(540 - camX) * 0.3 * sc}px, ${(screenY - camY) * 0.3 * sc}px)`}}>
        {Array.from({length: 120}, (_, k) => <div key={k} style={{position: 'absolute', left: -800 + random(`sx${k}`) * 2700, top: -400 + random(`sy${k}`) * 3600, width: 3 + random(`sz${k}`) * 4, height: 3 + random(`sz${k}`) * 4, borderRadius: 4, background: '#7CC4FF', opacity: 0.15 + 0.35 * random(`so${k}`) * (0.6 + 0.4 * Math.sin(t * 1.5 + k))}} />)}
      </div>
      <div style={{position: 'absolute', left: 0, top: 0, transformOrigin: '0 0', transform: `translate(${540 - camX * sc}px, ${screenY - camY * sc}px) scale(${sc})`}}>
        <svg width={1080} height={6400} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          <defs><filter id="bloom"><feGaussianBlur stdDeviation="14" /></filter></defs>
          {segs.map((d, i) => {
            const passed = tr.p >= i + 1 || t > FINAL;
            const flare = glowAll > 0 ? prog(glowAll, i / 9, i / 9 + 0.25) : 0;
            return (
              <g key={i}>
                <path d={d} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={48} strokeLinecap="round" />
                <path d={d} fill="none" stroke={ST[i + 1].c} strokeWidth={40} strokeLinecap="round" filter="url(#bloom)" opacity={(passed ? 0.55 : 0.12) + flare * 0.45} pathLength={1} strokeDasharray={`${Math.max(0, Math.min(1, draw * 8 - i))} 1`} />
                <path d={d} fill="none" stroke={ST[i + 1].c} strokeWidth={26} strokeLinecap="round" pathLength={1} strokeDasharray={`${Math.max(0, Math.min(1, draw * 8 - i))} 1`} opacity={passed ? 1 : 0.4} />
                {/* flux lumineux le long des lignes déjà parcourues */}
                {passed && <path d={d} fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray="0.04 0.22" strokeDashoffset={-t * 0.35} opacity={0.6} />}
              </g>
            );
          })}
          {/* convergence finale vers le pôle « Confiance » */}
          {converge > 0 && ST.map((st, i) => {
            const [x, y] = pos(i);
            return <line key={i} x1={x} y1={y} x2={x + (HUB[0] - x) * converge} y2={y + (HUB[1] - y) * converge} stroke={st.c} strokeWidth={22} strokeLinecap="round" opacity={0.85} />;
          })}
        </svg>
        {ST.map((st, i) => {
          const [x, y] = pos(i);
          const reached = t >= st.at - 0.1;
          const here = reached && (i === ST.length - 1 || t < ST[i + 1].at - TRAVEL) && t < FINAL;
          const blink = t > 152.2 && Math.floor((t + i * 0.13) * 3) % 2;
          const arrive = pop(t, st.at - 0.1, 0.5);
          return (
            <div key={st.n} style={{position: 'absolute', left: x - 70, top: y - 70, width: 140, height: 140, opacity: pop(t, 1.0 + i * 0.4, 0.4)}}>
              {reached && arrive < 1 && <div style={{position: 'absolute', left: 70 - 200 * arrive, top: 70 - 200 * arrive, width: 400 * arrive, height: 400 * arrive, borderRadius: '50%', border: `8px solid ${st.c}`, opacity: 1 - arrive}} />}
              <div style={{width: 140, height: 140, borderRadius: 70, background: reached ? st.c : '#13233A', border: `14px solid ${reached ? '#fff' : st.c}`, boxSizing: 'border-box', boxShadow: here ? `0 0 0 ${16 + Math.sin(t * 5) * 8}px ${st.c}55, 0 0 60px ${st.c}` : blink ? `0 0 0 20px ${st.c}66` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + Math.sin(arrive * Math.PI) * 0.25})`}}>
                {reached ? <Check p={1} size={60} color="#fff" /> : <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: st.c}}>{i + 1}</div>}
              </div>
              <div style={{position: 'absolute', top: 20, [i % 2 ? 'right' : 'left']: 170, width: 540, textAlign: i % 2 ? 'right' : 'left'}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 58, color: INK}}>{st.n}</div>
                <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 28, color: st.c, textTransform: 'uppercase', lineHeight: 1.1}}>{st.dom}</div>
              </div>
            </div>
          );
        })}
        {/* traînée lumineuse + rame */}
        {t > ST[0].at - TRAVEL - 0.5 && t < FINAL + 0.5 && (
          <>
            {tr.v > 0.05 && Array.from({length: 14}, (_, k) => {
              const back = train(t - (k + 1) * 0.035);
              return <div key={k} style={{position: 'absolute', left: back.x - 50 + k, top: back.y - 50 + k, width: 100 - k * 2, height: 100 - k * 2, borderRadius: 30, background: ST[Math.min(8, Math.ceil(tr.p))].c, opacity: (0.5 - k * 0.034) * tr.v, filter: 'blur(6px)'}} />;
            })}
            <div style={{position: 'absolute', left: tr.x - 60, top: tr.y - 60, width: 120, height: 120, borderRadius: 30, background: '#fff', boxShadow: `0 0 ${40 + 60 * tr.v}px rgba(255,255,255,0.8)`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, transform: `rotate(${tr.dx * 3}deg)`}}>
              <div style={{width: 70, height: 50, borderRadius: 14, background: '#0B1626', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 8px', boxSizing: 'border-box'}}>{[0, 1].map((k) => <div key={k} style={{width: 18, height: 24, borderRadius: 4, background: '#7CC4FF'}} />)}</div>
            </div>
          </>
        )}
      </div>
      {/* lignes de vitesse (premier plan) */}
      {tr.v > 0.15 && (1 - ov) > 0.5 && Array.from({length: 22}, (_, k) => {
        const q = ((t * 3 + random(`l${k}`)) % 1);
        return <div key={k} style={{position: 'absolute', left: random(`lx${k}`) * 1080, top: 1920 - q * 2400, width: 3, height: 140 + random(`lh${k}`) * 200, background: 'linear-gradient(180deg, transparent, rgba(190,225,255,0.55), transparent)', opacity: tr.v}} />;
      })}
    </AbsoluteFill>
  );
};

/* ─────────── Illustrations animées par norme (lt = secondes depuis l'arrivée) ─────────── */
const Viz: React.FC<{i: number; lt: number; c: string}> = ({i, lt, c}) => {
  const t = useT();
  const p = (a: number, b: number) => prog(lt, a, b, easeOut);
  const W = 380;
  if (i === 0) {
    return (
      <svg width={W} height={W} viewBox="0 0 380 380">
        <g transform={`translate(190 190) rotate(${lt * 40})`}>
          {['P', 'D', 'C', 'A'].map((l, k) => (
            <g key={l} transform={`rotate(${k * 90})`}>
              <path d="M0 -150 A150 150 0 0 1 150 0" fill="none" stroke={k % 2 ? '#fff' : c} strokeWidth={34} opacity={p(0.4 + k * 0.25, 0.8 + k * 0.25)} />
              <text x={95} y={-80} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={44} fill="#fff" transform={`rotate(${-k * 90 - lt * 40} 95 -80)`}>{l}</text>
            </g>
          ))}
        </g>
        <path d="M120 230 L170 200 L210 215 L265 150" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray={`${p(1.2, 2.6)} 1`} />
      </svg>
    );
  }
  if (i === 1) {
    const clean = p(3.0, 6.0);
    return (
      <div style={{position: 'relative', width: W, height: W}}>
        <div style={{position: 'absolute', left: 60, bottom: 40}}><F n="usine2" size={220} /></div>
        {Array.from({length: 9}, (_, k) => {
          const q = ((t * 0.6 + k / 9) % 1);
          return <div key={k} style={{position: 'absolute', left: 120 + Math.sin(q * 6 + k) * 30, top: 180 - q * 180, width: 50 + q * 70, height: 50 + q * 70, borderRadius: '50%', background: clean > 0.5 ? `rgba(46,174,90,${0.5 * (1 - q)})` : `rgba(120,120,130,${0.6 * (1 - q)})`, filter: 'blur(6px)'}} />;
        })}
        <div style={{position: 'absolute', right: 20, top: 30, transform: `scale(${clean})`}}><F n="feuille" size={120} /></div>
      </div>
    );
  }
  if (i === 2) {
    const flip = p(8.0, 9.0);
    return (
      <div style={{width: W, height: W, display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: 900}}>
        <div style={{width: 260, height: 260, transform: `rotateY(${flip * 180}deg)`, transformStyle: 'preserve-3d', position: 'relative'}}>
          <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="danger" size={240} /></div>
          <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: 130, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Check p={1} size={200} color="#fff" /></div>
        </div>
      </div>
    );
  }
  if (i === 3) {
    const icons = ['epi-ble', 'usine', 'camion', 'assiette'];
    const q = (lt * 0.35) % 1;
    return (
      <div style={{position: 'relative', width: W, height: W}}>
        <svg width={W} height={W} style={{position: 'absolute', inset: 0}}><path d="M60 80 L320 80 L60 300 L320 300" fill="none" stroke={c} strokeWidth={8} strokeDasharray="14 12" strokeDashoffset={-t * 60} /></svg>
        {icons.map((n, k) => <div key={n} style={{position: 'absolute', left: [60, 320, 60, 320][k] - 60, top: [80, 80, 300, 300][k] - 60, transform: `scale(${p(0.3 + k * 0.4, 0.7 + k * 0.4)})`}}><F n={n} size={120} /></div>)}
        <div style={{position: 'absolute', left: (q < 0.33 ? 60 + q * 3 * 260 : q < 0.66 ? 320 - (q - 0.33) * 3 * 260 : 60 + (q - 0.66) * 3 * 260) - 14, top: (q < 0.33 ? 80 : q < 0.66 ? 80 + (q - 0.33) * 3 * 220 : 300) - 14, width: 28, height: 28, borderRadius: 14, background: '#fff', boxShadow: `0 0 20px ${c}`}} />
      </div>
    );
  }
  if (i === 4) {
    return (
      <svg width={W} height={W} viewBox="0 0 380 380">
        {[['Social', 190, 130, 7.4, 190, 70], ['Environ.', 130, 235, 8.2, 95, 330], ['Éthique', 250, 235, 9.0, 290, 330]].map(([l, x, y, at, lx, ly], k) => {
          const q = p(at as number, (at as number) + 0.6);
          const wob = Math.sin(t * 1.5 + k * 2) * 6;
          return <g key={l as string} opacity={q}><circle cx={(x as number) + wob} cy={(y as number) - wob} r={100 * q} fill={c} opacity={0.45} /><text x={lx as number} y={ly as number} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={26} fill="#fff">{(l as string).toUpperCase()}</text></g>;
        })}
      </svg>
    );
  }
  if (i === 5) {
    const down = p(5.5, 7.5);
    const a = -60 + 120 * (1 - down * 0.75);
    return (
      <svg width={W} height={W} viewBox="0 0 380 380">
        <path d="M50 260 A140 140 0 0 1 330 260" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={30} strokeLinecap="round" />
        <path d="M50 260 A140 140 0 0 1 330 260" fill="none" stroke="url(#gE)" strokeWidth={30} strokeLinecap="round" />
        <defs><linearGradient id="gE"><stop offset="0" stopColor={c} /><stop offset="0.6" stopColor="#F5D547" /><stop offset="1" stopColor="#E5432F" /></linearGradient></defs>
        <g transform={`translate(190 260) rotate(${a})`}><line x1={0} y1={0} x2={0} y2={-120} stroke="#fff" strokeWidth={10} strokeLinecap="round" /><circle r={18} fill="#fff" /></g>
        <text x={190} y={340} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={28} fill={c} opacity={down}>CONSOMMATION EN BAISSE</text>
      </svg>
    );
  }
  if (i === 6) {
    const lock = p(10.6, 11.4);
    return (
      <svg width={W} height={W} viewBox="0 0 380 380">
        <path d="M190 40 L330 300 L50 300 Z" fill="none" stroke={c} strokeWidth={6} opacity={0.6} pathLength={1} strokeDasharray={`${prog(lt, 7.8, 10.6)} 1`} />
        <g transform={`translate(190 205)`}>
          <path d={`M-45 -10 V-55 A45 45 0 0 1 45 -55 V${-10 - (1 - lock) * 40}`} fill="none" stroke="#fff" strokeWidth={16} strokeLinecap="round" />
          <rect x={-70} y={-10} width={140} height={110} rx={20} fill={lock >= 1 ? c : '#2A3550'} stroke="#fff" strokeWidth={6} />
          <circle cx={0} cy={40} r={14} fill="#fff" />
        </g>
        {[['C', 190, 40], ['I', 50, 300], ['D', 330, 300]].map(([l, x, y], k) => <g key={l as string} opacity={prog(lt, 8.0 + k * 1.2, 8.4 + k * 1.2)}><circle cx={x as number} cy={y as number} r={30} fill={c} /><text x={x as number} y={(y as number) + 12} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={34} fill="#fff">{l}</text></g>)}
      </svg>
    );
  }
  if (i === 7) {
    const pts: string[] = [];
    for (let x = 0; x <= 380; x += 4) {
      const ph = (x + t * 160) % 190;
      const y = ph > 80 && ph < 110 ? 190 - Math.sin(((ph - 80) / 30) * Math.PI * 2) * 90 : 190 + Math.sin(x / 20) * 3;
      pts.push(`${x},${y}`);
    }
    return (
      <svg width={W} height={W} viewBox="0 0 380 380">
        <rect x={10} y={60} width={360} height={260} rx={30} fill="rgba(255,255,255,0.05)" stroke={c} strokeWidth={4} />
        <polyline points={pts.join(' ')} fill="none" stroke={c} strokeWidth={8} strokeLinejoin="round" />
        <text x={340} y={110} textAnchor="end" fontFamily="monospace" fontSize={34} fill="#fff">♥ 72</text>
      </svg>
    );
  }
  // 17025 : impacts de mesure qui se resserrent sur la cible
  const tight = p(10.0, 12.0);
  return (
    <svg width={W} height={W} viewBox="0 0 380 380">
      {[150, 110, 70, 30].map((r, k) => <circle key={r} cx={190} cy={190} r={r} fill="none" stroke={k % 2 ? 'rgba(255,255,255,0.3)' : c} strokeWidth={8} />)}
      {Array.from({length: 10}, (_, k) => {
        const a = random(`ta${k}`) * Math.PI * 2;
        const r = (40 + random(`tr${k}`) * 110) * (1 - tight * 0.85);
        return <circle key={k} cx={190 + Math.cos(a) * r} cy={190 + Math.sin(a) * r} r={9} fill="#fff" opacity={p(0.5 + k * 0.2, 0.7 + k * 0.2)} />;
      })}
    </svg>
  );
};

/* ─────────── Panneau « station » en portes coulissantes ─────────── */
const Panel: React.FC = () => {
  const t = useT();
  const i = ST.reduce((a, st, k) => (t >= st.at - 0.2 ? k : a), -1);
  if (i < 0 || t >= FINAL - 0.3) return null;
  const st = ST[i];
  const next = i < ST.length - 1 ? ST[i + 1].at - TRAVEL : FINAL - 0.3;
  const open = prog(t, st.at - 0.1, st.at + 0.6, easeInOut);
  const close = prog(t, next - 0.5, next, easeIn);
  const doors = open * (1 - close);
  const lt = t - st.at;
  const H = 620;
  return (
    <div style={{position: 'absolute', left: 40, right: 40, top: 990, height: H, zIndex: 20}}>
      {/* contenu derrière les portes */}
      <div style={{position: 'absolute', inset: 0, borderRadius: 40, background: '#0C182A', border: `4px solid ${st.c}`, boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 70px ${st.c}40`, overflow: 'hidden', opacity: doors > 0 ? 1 : 0}}>
        <div style={{height: 140, background: `linear-gradient(90deg, ${st.c}, ${st.c}CC)`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 30px'}}>
          <div style={{width: 100, height: 100, borderRadius: 50, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={st.icon} size={72} /></div>
          <div style={{flex: 1}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 58, color: '#fff', lineHeight: 1, overflow: 'hidden', height: 60}}>
              <div style={{transform: `translateY(${(1 - pop(t, st.at + 0.2, 0.6)) * 60}px)`}}>{st.n}</div>
            </div>
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase'}}>{st.dom}</div>
          </div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: 'rgba(255,255,255,0.35)'}}>{i + 1}/9</div>
        </div>
        <div style={{display: 'flex', height: H - 148}}>
          <div style={{flex: 1, padding: '28px 30px', display: 'flex', flexDirection: 'column', gap: 18}}>
            {st.def && <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 30, color: DIM, lineHeight: 1.15, opacity: pop(t, st.at + 1.2, 0.5)}}>{st.def}</div>}
            {st.kw.map(([l, at]) => {
              const q = pop(t, at, 0.4);
              return (
                <div key={l} style={{display: 'flex', alignItems: 'center', gap: 14, opacity: q, transform: `translateX(${(1 - q) * -50}px)`}}>
                  <Check p={prog(t, at + 0.1, at + 0.5)} size={48} color={st.c} />
                  <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: l.length > 24 ? 28 : 34, color: INK, lineHeight: 1.1}}>{l}</div>
                </div>
              );
            })}
            {st.note && t >= st.note[1] && <div style={{alignSelf: 'flex-start', transform: `scale(${2 - pop(t, st.note[1], 0.25)}) rotate(-4deg)`, opacity: pop(t, st.note[1], 0.25), border: '6px solid #FF6B5B', color: '#FF6B5B', borderRadius: 14, padding: '4px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, textTransform: 'uppercase'}}>{st.note[0]}</div>}
          </div>
          <div style={{width: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, st.at + 0.6, 0.6)}}><Viz i={i} lt={lt} c={st.c} /></div>
        </div>
      </div>
      {/* portes coulissantes */}
      {doors < 1 && [0, 1].map((k) => (
        <div key={k} style={{position: 'absolute', top: 0, bottom: 0, [k ? 'right' : 'left']: 0, width: '50%', transform: `translateX(${(k ? 1 : -1) * doors * 102}%)`, background: 'linear-gradient(180deg, #2A3B55, #1A2740)', border: '4px solid #3B4F6E', borderRadius: k ? '0 40px 40px 0' : '40px 0 0 40px', boxSizing: 'border-box', opacity: open > 0 && close < 1 ? 1 : open > 0 ? 1 - close : 0}}>
          <div style={{position: 'absolute', top: 60, bottom: 160, [k ? 'left' : 'right']: 40, width: 240, borderRadius: 24, background: 'rgba(124,196,255,0.12)', border: '3px solid rgba(124,196,255,0.25)'}} />
          <div style={{position: 'absolute', top: '50%', [k ? 'left' : 'right']: 8, width: 10, height: 120, marginTop: -60, borderRadius: 5, background: st.c}} />
        </div>
      ))}
    </div>
  );
};

/* ─────────── Afficheur LED « Prochain arrêt » + titres ─────────── */
const Led: React.FC<{text: string; color: string}> = ({text, color}) => {
  const t = useT();
  const w = text.length * 26;
  const off = w > 760 ? ((t * 90) % (w + 200)) : 0;
  return (
    <div style={{position: 'absolute', left: 40, right: 40, top: 230, height: 90, borderRadius: 18, background: '#05090F', border: '3px solid #1C2A40', overflow: 'hidden', zIndex: 30, backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1.5px, transparent 1.5px)', backgroundSize: '8px 8px'}}>
      <div style={{position: 'absolute', left: 24, top: 18, whiteSpace: 'nowrap', fontFamily: 'monospace', fontWeight: 700, fontSize: 44, color, letterSpacing: 4, textShadow: `0 0 10px ${color}`, transform: `translateX(${-off}px)`}}>{text}</div>
    </div>
  );
};
const Titles: React.FC = () => {
  const t = useT();
  const intro = t < 12.0;
  const fin = t >= FINAL;
  const tr = train(t);
  const nextIdx = ST.findIndex((st) => t < st.at - 0.1);
  const moving = tr.v > 0.02;
  return (
    <>
      <div style={{position: 'absolute', left: '50%', top: 95, transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.94)', borderRadius: 26, padding: '10px 28px', zIndex: 30}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {intro && (
        <div style={{position: 'absolute', left: 60, right: 60, top: 270, zIndex: 30, opacity: pop(t, 0.3) * (1 - prog(t, 11.4, 12.0))}}>
          <T size={56} color={DIM}>Qualité, travailleurs, environnement…</T>
          <T size={100} style={{marginTop: 10}}>9 normes ISO</T>
          <T size={66} color="#7CC4FF">incontournables</T>
        </div>
      )}
      {!intro && !fin && (
        moving && nextIdx >= 0
          ? <Led text={`PROCHAIN ARRÊT › ${ST[nextIdx].n}`} color="#FFB13B" />
          : <Led text={`STATION ${ST.reduce((a, st, k) => (t >= st.at - 0.2 ? k : a), 0) + 1}/9 · ${ST[ST.reduce((a, st, k) => (t >= st.at - 0.2 ? k : a), 0)].n}`} color="#7CFFB2" />
      )}
      {t >= 150.2 && t < 152.2 && (() => {
        const q = pop(t, 150.4, 0.6);
        return (
          <div style={{position: 'absolute', left: 540 - 260, top: 1060 - 260, width: 520, height: 520, zIndex: 25, transform: `scale(${q}) rotate(${(1 - q) * -40}deg)`, opacity: 1 - prog(t, 151.8, 152.2)}}>
            {ST.map((st, k) => <div key={k} style={{position: 'absolute', left: 255, top: -40, width: 10, height: 300, transformOrigin: '5px 300px', transform: `rotate(${k * 40 + t * 20}deg)`, background: `linear-gradient(180deg, transparent, ${st.c})`, borderRadius: 5}} />)}
            <div style={{position: 'absolute', inset: 70, borderRadius: '50%', background: 'radial-gradient(circle, #FFFFFF 0%, #DDEFFF 55%, #7CC4FF 100%)', boxShadow: '0 0 120px #7CC4FF, 0 0 40px #fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <F n="pouce" size={80} />
            </div>
            <div style={{position: 'absolute', left: -100, right: -100, top: 540}}><T size={72} color="#fff" style={{textShadow: '0 0 30px #7CC4FF'}}>Confiance</T></div>
          </div>
        );
      })()}
      {fin && (
        <div style={{position: 'absolute', left: 50, right: 50, top: 250, zIndex: 30, opacity: pop(t, FINAL + 0.4)}}>
          <T size={t < 152 ? 64 : 64}>{t < 152 ? 'Un objectif commun' : 'Lesquelles connaissez-vous ?'}</T>
          {t < 152 && <div style={{display: 'flex', justifyContent: 'center', gap: 16, marginTop: 20}}>{[['Performance', 147.2, '#3D86E0'], ['Risques maîtrisés', 148.0, '#F0922F'], ['Confiance', 150.0, '#2EAE5A']].map(([l, at, c]) => <div key={l as string} style={{padding: '12px 22px', borderRadius: 40, background: c as string, transform: `scale(${pop(t, at as number, 0.35)})`, boxShadow: `0 0 30px ${c}`}}><T size={30} color="#fff">{l}</T></div>)}</div>}
        </div>
      )}
    </>
  );
};

/** Vignette et grain ciné. */
const Grade: React.FC = () => {
  const t = useT();
  const f = Math.floor(t * 24);
  return (
    <AbsoluteFill style={{pointerEvents: 'none', zIndex: 60}}>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)'}} />
      <AbsoluteFill style={{opacity: 0.05, backgroundImage: `radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)`, backgroundSize: '5px 5px', backgroundPosition: `${(f * 37) % 5}px ${(f * 53) % 5}px`}} />
    </AbsoluteFill>
  );
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'bass-hit', v: 0.45},
  {at: 1.0, s: 'riser', v: 0.22, dur: 5},
  ...ST.map((_, i) => ({at: 1.0 + i * 0.4, s: 'sfx/click', v: 0.25})),
  {at: 9.6, s: 'soft-whoosh', v: 0.5, dur: 2.5},
  ...ST.slice(1).map((st) => ({at: st.at - TRAVEL, s: 'soft-whoosh', v: 0.48, dur: 2})),
  ...ST.slice(1).map((st) => ({at: st.at - TRAVEL + 0.6, s: 'sfx/whoosh', v: 0.3})),
  ...ST.map((st) => ({at: st.at - 0.15, s: 'sfx/ding', v: 0.34})),
  ...ST.map((st) => ({at: st.at - 0.05, s: 'sfx/swish', v: 0.4})),
  ...ST.flatMap((st) => st.kw.map(([, at]) => ({at, s: 'sfx/pop', v: 0.32}))),
  ...ST.slice(0, -1).map((_, i) => ({at: ST[i + 1].at - TRAVEL - 0.45, s: 'sfx/swish', v: 0.3})),
  {at: 79.2, s: 'tampon', v: 0.6},
  {at: 95.6 + 11.4, s: 'cadenas', v: 0.5},
  {at: 36.8 + 8.6, s: 'validation', v: 0.35},
  {at: FINAL, s: 'soft-whoosh', v: 0.55, dur: 2.5},
  ...ST.map((_, i) => ({at: FINAL + 1.6 + i * 0.29, s: 'tick', v: 0.32})),
  {at: 147.0, s: 'riser', v: 0.28, dur: 3.4},
  {at: 150.4, s: 'bass-hit', v: 0.55},
  ...[147.2, 148.0, 150.0].map((at) => ({at, s: 'validation', v: 0.32})),
  {at: 152.2, s: 'notification', v: 0.4},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const RoleNormes: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 30%, rgba(61,134,224,0.2), transparent 60%)'}} />
    <Gate from={0} to={OUTRO_AT}><Map /></Gate>
    <Gate from={0} to={OUTRO_AT}><Panel /></Gate>
    <Gate from={0} to={OUTRO_AT}><Titles /></Gate>
    <Gate from={0} to={OUTRO_AT}><Grade /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80}} /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-role-normes-iso-origine.m4a')} trimAfter={s(155.6)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

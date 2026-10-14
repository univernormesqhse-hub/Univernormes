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
 * « Trois normes ISO enfin simplifiées » (1 min 04) — voix d'origine, sous-titres recalés mot à mot, photos réelles,
 * thème « papier quadrillé » de la série.
 * Fil rouge inédit : trois classeurs ISO 9001 · 14001 · 45001 sur une étagère ; celui de la norme en cours sort du rang
 * (en-tête). Transitions : un classeur à anneaux géant dont la couverture s'ouvre comme un livre sur la fiche de la norme.
 * Autres techniques nouvelles : bonneteau des trois numéros qui se mélangent, fils emmêlés qui se démêlent sous un
 * chronomètre, sceau doré « Qualité », chaîne de processus avec porte qualité, marteau du client, bouclier vert qui se
 * referme sur l'usine, empreinte écologique qui rétrécit, robinet qui cesse de goutter, boucle des ressources, casque et
 * cœur qui fusionnent, filet qui rattrape l'objet qui tombe, silhouette « physique + mentale », classeurs qui prennent la
 * poussière puis deviennent des manettes de pilotage, socle et trois médaillons client · planète · salarié.
 */
const ORANGE = '#F28C1E';
const OUTRO_AT = 62.3;
export const TROISISO_FRAMES = s(OUTRO_AT + 3.8);
type N = {n: number; code: string; l: string; sub: string; at: number; end: number; c: string; ic: string};
const NORMS: N[] = [
  {n: 1, code: '9001', l: 'La qualité', sub: 'Juge : le client', at: 7.7, end: 19.9, c: BLUE, ic: 'medaille'},
  {n: 2, code: '14001', l: 'L’environnement', sub: 'Le bouclier vert', at: 19.9, end: 33.6, c: GREEN, ic: 'pousse'},
  {n: 3, code: '45001', l: 'Santé & sécurité', sub: 'Protéger les travailleurs', at: 33.6, end: 46.4, c: ORANGE, ic: 'casque'},
];
const WIPE = 1.8;

/** Fil rouge : l'étagère des trois classeurs. active = index sorti (-1 = aucun), dust ∈ [0,1]. */
const Shelf: React.FC<{w: number; active: number; dust?: number; lift?: number}> = ({w, active, dust = 0, lift = 1}) => {
  const bw = w * 0.26, bh = w * 0.62;
  return (
    <div style={{position: 'relative', width: w, height: bh + w * 0.08}}>
      {NORMS.map((b, i) => (
        <div key={i} style={{position: 'absolute', left: w * 0.05 + i * (bw + w * 0.06), bottom: w * 0.06, width: bw, height: bh, borderRadius: w * 0.02, background: b.c, border: `${Math.max(2, w * 0.008)}px solid ${INK}`, transform: `translateY(${i === active ? -bh * 0.18 * lift : 0}px)`, boxShadow: i === active ? `0 ${w * 0.03}px ${w * 0.05}px ${b.c}66` : 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: w * 0.02, filter: `saturate(${1 - dust * 0.7}) brightness(${1 - dust * 0.1})`}}>
          <div style={{width: bw * 0.36, height: bw * 0.36, borderRadius: '50%', border: `${Math.max(2, w * 0.01)}px solid #fff`, opacity: 0.8}} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: bw * 0.2, color: '#fff', transform: 'rotate(-90deg)', whiteSpace: 'nowrap', marginTop: bh * 0.12}}>ISO {b.code}</div>
        </div>
      ))}
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: w * 0.06, borderRadius: w * 0.01, background: '#8A5A2B'}} />
      {dust > 0 && Array.from({length: 30}, (_, i) => <div key={i} style={{position: 'absolute', left: random(`d${i}`) * w, top: random(`e${i}`) * bh, width: w * 0.012, height: w * 0.012, borderRadius: '50%', background: '#B9B2A2', opacity: dust * 0.8}} />)}
    </div>
  );
};

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('iso26/audit-checklist.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 940, objectFit: 'cover', objectPosition: '50% 40%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 30%, ${PAPER}DD 44%, ${PAPER} 50%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={50} y={780} w={980} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>QUALITÉ · ENVIRONNEMENT · SÉCURITÉ</div>
        <T size={110} style={{marginTop: 20, textTransform: 'uppercase', letterSpacing: -3}}>Trois normes <span style={{background: '#F5B700', padding: '0 20px', borderRadius: 18}}>ISO</span></T>
        <T size={92} style={{textTransform: 'uppercase', letterSpacing: -2}}>enfin <span style={{color: GREEN}}>simplifiées</span></T>
        <div style={{display: 'flex', justifyContent: 'center', gap: 16, marginTop: 20}}>{NORMS.map((n) => <Chip key={n.code} c={n.c} light size={40}>ISO {n.code}</Chip>)}</div>
      </Abs>
      <Abs x={340} y={1300}><Shelf w={400} active={-1} /></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : le classeur à anneaux qui s'ouvre ─────────── */
const BinderWipe: React.FC<{p: N}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const inn = prog(t, a, a + 0.35, easeOut);
  const open = prog(t, a + 0.3, a + 0.8, easeInOut) * (1 - prog(t, b - 0.65, b - 0.3, easeInOut));
  const out = prog(t, b - 0.3, b, easeIn);
  const y = 380 + (1 - inn) * 1500 + out * 1500;
  return (
    <AbsoluteFill style={{zIndex: 55, pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: INK, opacity: 0.5 * inn * (1 - out)}} />
      <Abs x={110} y={y} w={860} h={1120} style={{perspective: 2600}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: 26, background: '#fff', boxShadow: '0 40px 80px rgba(0,0,0,0.45)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 60px 0 110px', boxSizing: 'border-box'}}>
          {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 26, top: 220 + k * 320, width: 56, height: 56, borderRadius: 28, border: `10px solid #9AA3B2`, background: '#fff'}} />)}
          <F n={p.ic} size={170} />
          <T size={40} color={p.c} style={{letterSpacing: 6}}>NORME {p.n}/3</T>
          <T size={130} color={INK}>ISO {p.code}</T>
          <T size={66}>{p.l}</T>
          <Hand size={52} color={DIM}>{p.sub}</Hand>
        </div>
        <div style={{position: 'absolute', inset: 0, borderRadius: 26, background: `linear-gradient(150deg, ${p.c}, ${p.c}CC)`, border: `8px solid ${INK}`, boxSizing: 'border-box', transformOrigin: '0% 50%', transform: `rotateY(${-open * 165}deg)`, backfaceVisibility: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{padding: '24px 40px', borderRadius: 16, background: '#fff', border: `5px solid ${INK}`}}><T size={80}>ISO {p.code}</T></div>
          <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 60, background: 'rgba(0,0,0,0.15)'}} />
        </div>
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── En-tête ─────────── */
const Header: React.FC = () => {
  const t = useT();
  const p = NORMS.findIndex((x) => t >= x.at + WIPE - 0.3 && t < x.end);
  const intro = t > 2.6 && t < 7.4;
  const fin = t >= 46.4 && t < OUTRO_AT;
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 80, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {(intro || p >= 0 || fin) && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 206, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: intro ? pop(t, 2.6) * (1 - prog(t, 7.1, 7.4)) : p >= 0 ? pop(t, NORMS[p].at + WIPE - 0.3) * (1 - prog(t, NORMS[p].end - 0.3, NORMS[p].end)) : pop(t, 46.4)}}>
          <Shelf w={64} active={p} />
          <div style={{padding: '6px 20px', borderRadius: 40, background: '#fff', border: `3px solid ${p >= 0 ? NORMS[p].c : INK}`}}><T size={30}>{p >= 0 ? `ISO ${NORMS[p].code} · ${NORMS[p].l}` : fin ? 'Bien plus que des classeurs' : '3 normes ISO'}</T></div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── INTRO ─────────── */
/** Bonneteau : les trois numéros sous des gobelets se mélangent. */
const Shell: React.FC = () => {
  const t = useT();
  const mix = prog(t, 3.0, 5.0, (x) => x);
  const pos = (i: number) => {
    const k = Math.floor(mix * 4);
    const perm = [[0, 1, 2], [1, 0, 2], [1, 2, 0], [2, 1, 0], [2, 0, 1]][Math.min(4, k)];
    const next = [[0, 1, 2], [1, 0, 2], [1, 2, 0], [2, 1, 0], [2, 0, 1]][Math.min(4, k + 1)];
    const f = easeInOut((mix * 4) % 1);
    return lerp(perm[i], next[i], k >= 4 ? 0 : f);
  };
  const lift = prog(t, 5.2, 5.6);
  return (
    <AbsoluteFill>
      <Title>Vous les <Mark p={prog(t, 2.3, 3.0)}>confondez</Mark> ?</Title>
      {NORMS.map((n, i) => {
        const x = 110 + pos(i) * 300;
        const arc = Math.sin(((mix * 4) % 1) * Math.PI) * (i === 1 ? -80 : 60) * (mix < 1 ? 1 : 0);
        return (
          <React.Fragment key={i}>
            <Abs x={x} y={1000} w={260} style={{textAlign: 'center', opacity: lift}}><Chip c={n.c} light size={38}>{n.code}</Chip></Abs>
            <Abs x={x} y={700 + arc - lift * 160} w={260} h={300} style={{background: `linear-gradient(180deg, ${n.c}, ${n.c}BB)`, clipPath: 'polygon(14% 0, 86% 0, 100% 100%, 0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={70} color="#fff">?</T></Abs>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
/** Les fils emmêlés se démêlent en trois lignes droites sous le chronomètre. */
const Untangle: React.FC = () => {
  const t = useT();
  const u = prog(t, 5.8, 7.2, easeInOut);
  return (
    <AbsoluteFill>
      <Title>On démêle tout ça</Title>
      <svg width={1080} height={900} style={{position: 'absolute', left: 0, top: 480}}>
        {NORMS.map((n, i) => {
          const y = 250 + i * 200;
          const pts = Array.from({length: 12}, (_, k) => {
            const x = 80 + k * 84;
            const wob = Math.sin(k * 1.7 + i * 2) * 180 * (1 - u);
            return `${x},${y + wob}`;
          });
          return <polyline key={i} points={pts.join(' ')} fill="none" stroke={n.c} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" />;
        })}
      </svg>
      <Abs x={420} y={1230} w={240} h={120} style={{background: '#fff', borderRadius: 24, border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={54}>⏱ 60 s</T></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── ISO 9001 ─────────── */
const Seal: React.FC = () => {
  const t = useT();
  const st = spring(t, 11.0, 8, 16);
  return (
    <AbsoluteFill>
      <Photo src="iso26/audit-checklist.jpg" x={60} y={330} w={960} h={620} pos="50% 50%" />
      <Abs x={340} y={880} style={{transform: `scale(${st}) rotate(${(1 - st) * 40 - 8}deg)`}}>
        <svg width={400} height={400}>
          {Array.from({length: 24}, (_, i) => <path key={i} d="M 200 200 L 200 10 L 230 30 Z" fill="#E0A800" transform={`rotate(${i * 15} 200 200)`} />)}
          <circle cx={200} cy={200} r={150} fill="#F5B700" stroke={INK} strokeWidth={8} />
          <text x={200} y={190} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={44} fill={INK}>ISO 9001</text>
          <text x={200} y={240} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={34} fill={INK}>QUALITÉ</text>
        </svg>
      </Abs>
    </AbsoluteFill>
  );
};
const Process: React.FC = () => {
  const t = useT();
  const off = (t - 12.5) * 160;
  return (
    <AbsoluteFill>
      <Title>Structurer les <Mark c={BLUE} p={prog(t, 12.6, 13.4)}>processus</Mark></Title>
      <Row y={470} gap={0}>
        {['Entrée', 'Processus', 'Sortie'].map((l, i) => (
          <React.Fragment key={l}>
            <div style={{opacity: pop(t, 12.6 + i * 0.4), padding: '22px 30px', borderRadius: 20, background: i === 1 ? BLUE : '#fff', border: `5px solid ${BLUE}`}}><T size={38} color={i === 1 ? '#fff' : INK}>{l}</T></div>
            {i < 2 && <T size={60} color={BLUE} style={{margin: '0 12px', opacity: pop(t, 12.8 + i * 0.4)}}>→</T>}
          </React.Fragment>
        ))}
      </Row>
      <Abs x={0} y={1000} w={1080} h={40} style={{background: 'repeating-linear-gradient(90deg, #8C9AB8 0 30px, #A9B4CC 30px 60px)', backgroundPosition: `${off}px 0`}} />
      <Abs x={500} y={700} w={80} h={300} style={{background: INK, borderRadius: 10}} />
      <Abs x={460} y={660} w={160} h={70} style={{background: GREEN, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={28} color="#fff">CONTRÔLE</T></Abs>
      {Array.from({length: 6}, (_, i) => {
        const x = ((i * 200 + off) % 1200) - 120;
        return <div key={i} style={{position: 'absolute', left: x, top: 880, width: 110, height: 110, borderRadius: 18, background: x > 540 ? GREEN : '#C9D3E6', border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 50, fontWeight: 900, color: '#fff'}}>{x > 540 ? '✓' : ''}</div>;
      })}
      {t > 15.2 && <Row y={1180}><div style={{transform: `scale(${spring(t, 15.2)})`}}><Chip c={GREEN} light size={40}>Des produits sans défaut</Chip></div></Row>}
    </AbsoluteFill>
  );
};
const Judge: React.FC = () => {
  const t = useT();
  const hit = Math.max(0, Math.sin(Math.max(0, t - 18.6) * 9)) * (t < 19.6 ? 1 : 0);
  return (
    <AbsoluteFill>
      <Title>Le seul juge : le <Mark c={BLUE} p={prog(t, 18.8, 19.4)}>client</Mark></Title>
      <Photo src="promo/participants.jpg" x={60} y={460} w={960} h={560} pos="50% 40%" />
      <svg width={500} height={360} style={{position: 'absolute', left: 290, top: 1040}}>
        <g transform={`rotate(${-30 + hit * 30} 330 160)`}><rect x={150} y={60} width={220} height={100} rx={20} fill="#8A5A2B" stroke={INK} strokeWidth={6} /><rect x={250} y={150} width={26} height={190} rx={10} fill="#8A5A2B" stroke={INK} strokeWidth={6} /></g>
        <rect x={60} y={260} width={180} height={50} rx={10} fill="#6B4420" />
      </svg>
      {t > 19.0 && <Abs x={140} y={1140} style={{transform: `scale(${spring(t, 19.0)})`}}><Chip c={BLUE} light size={36}>👍 Conforme ?</Chip></Abs>}
    </AbsoluteFill>
  );
};

/* ─────────── ISO 14001 ─────────── */
const Shield: React.FC = () => {
  const t = useT();
  const sh = prog(t, 22.2, 23.4, easeOut);
  return (
    <AbsoluteFill>
      <Title>Le <Mark c={GREEN} p={prog(t, 22.3, 23.0)}>bouclier environnemental</Mark></Title>
      <Abs x={290} y={700}><F n="usine" size={500} /></Abs>
      <svg width={900} height={1000} style={{position: 'absolute', left: 90, top: 470}}>
        <path d="M 450 40 L 820 180 Q 820 640 450 940 Q 80 640 80 180 Z" fill={`${GREEN}22`} stroke={GREEN} strokeWidth={22} strokeDasharray={2600} strokeDashoffset={2600 * (1 - sh)} />
      </svg>
      {sh > 0.9 && [0, 1, 2, 3].map((i) => <Abs key={i} x={180 + i * 200} y={540 + (i % 2) * 40} style={{transform: `scale(${spring(t, 23.4 + i * 0.1)}) rotate(${i * 30}deg)`}}><F n="feuille" size={90} /></Abs>)}
    </AbsoluteFill>
  );
};
const Footprint: React.FC = () => {
  const t = useT();
  const k = 1 - prog(t, 27.0, 28.6, easeInOut) * 0.55;
  return (
    <AbsoluteFill>
      <Photo src="smi/fumees.jpg" x={60} y={330} w={960} h={560} pos="50% 40%" />
      <Abs x={0} y={880} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', transform: `scale(${k})`, transformOrigin: '50% 50%'}}>
          <svg width={360} height={460}><ellipse cx={180} cy={300} rx={120} ry={160} fill={GREEN} /><circle cx={90} cy={110} r={34} fill={GREEN} /><circle cx={160} cy={80} r={30} fill={GREEN} /><circle cx={225} cy={90} r={27} fill={GREEN} /><circle cx={280} cy={120} r={23} fill={GREEN} /><circle cx={318} cy={165} r={19} fill={GREEN} /></svg>
        </div>
      </Abs>
      <Row y={1420}><Chip c={GREEN} light size={36}>Maîtriser l’impact écologique</Chip></Row>
    </AbsoluteFill>
  );
};
const Tap: React.FC = () => {
  const t = useT();
  const close = prog(t, 29.4, 29.8);
  const drop = ((t * 2.5) % 1);
  return (
    <AbsoluteFill>
      <Title>Fini le <Mark c={RED} p={prog(t, 29.3, 29.8)}>gaspillage</Mark> !</Title>
      <svg width={600} height={700} style={{position: 'absolute', left: 240, top: 520}}>
        <rect x={40} y={120} width={360} height={80} rx={20} fill="#9AA3B2" stroke={INK} strokeWidth={6} />
        <rect x={330} y={180} width={70} height={130} rx={14} fill="#9AA3B2" stroke={INK} strokeWidth={6} />
        <g transform={`rotate(${close * 90} 200 110)`}><rect x={120} y={60} width={160} height={30} rx={14} fill={RED} stroke={INK} strokeWidth={6} /></g>
        <rect x={190} y={70} width={20} height={50} fill={INK} />
        {close < 1 && <ellipse cx={365} cy={330 + drop * 300} rx={18} ry={26} fill={BLUE} opacity={1 - close} />}
      </svg>
    </AbsoluteFill>
  );
};
const Loop: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Title>Optimiser les <Mark c={GREEN} p={prog(t, 31.2, 31.9)}>ressources</Mark></Title>
      <Abs x={290} y={560} style={{transform: `rotate(${t * 60}deg)`}}><F n="recyclage" size={500} /></Abs>
      <Row y={1140} gap={16}>{['💧 Eau', '⚡ Énergie', '🧱 Matières'].map((l, i) => <div key={l} style={{transform: `scale(${spring(t, 31.6 + i * 0.3)})`}}><Chip c="#fff" size={36} style={{border: `4px solid ${GREEN}`}}>{l}</Chip></div>)}</Row>
      {t > 32.6 && <Row y={1290}><Chip c={GREEN} light size={40}>Protéger l’environnement</Chip></Row>}
    </AbsoluteFill>
  );
};

/* ─────────── ISO 45001 ─────────── */
const Fuse: React.FC = () => {
  const t = useT();
  const m = prog(t, 36.6, 37.6, easeInOut);
  return (
    <AbsoluteFill>
      <Title><Mark c={ORANGE} p={prog(t, 36.6, 37.2)}>Santé</Mark> et <Mark c={ORANGE} p={prog(t, 37.2, 37.9)}>sécurité</Mark> au travail</Title>
      <Abs x={lerp(120, 330, m)} y={620}><F n="coeur" size={280} /></Abs>
      <Abs x={lerp(680, 470, m)} y={600}><F n="casque" size={300} /></Abs>
      <Photo src="induction/operatrice.jpg" x={240} y={1000} w={600} h={420} pos="50% 30%" o={pop(t, 37.4)} />
    </AbsoluteFill>
  );
};
const Net: React.FC = () => {
  const t = useT();
  const f = prog(t, 39.6, 40.6, easeIn);
  const caught = t > 40.6;
  const sag = caught ? Math.sin(Math.min(1, (t - 40.6) * 2) * Math.PI) * 50 : 0;
  return (
    <AbsoluteFill>
      <Title><Mark c={ORANGE} p={prog(t, 38.7, 39.4)}>Anticiper</Mark>, avant l’accident</Title>
      <Abs x={460} y={lerp(380, 920, f) + sag} style={{transform: `rotate(${f * 200}deg)`}}><F n="cle" size={150} /></Abs>
      <svg width={900} height={300} style={{position: 'absolute', left: 90, top: 1000}}>
        <path d={`M 0 40 Q 450 ${160 + sag * 2} 900 40`} fill="none" stroke={INK} strokeWidth={8} />
        {Array.from({length: 10}, (_, i) => <line key={i} x1={i * 100} y1={40} x2={450} y2={170 + sag * 2} stroke={`${INK}66`} strokeWidth={4} />)}
      </svg>
      {caught && <Row y={1340}><div style={{transform: `scale(${spring(t, 40.7)})`}}><Chip c={GREEN} light size={40}>✓ Risque anticipé</Chip></div></Row>}
    </AbsoluteFill>
  );
};
const Integrity: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Title>L’intégrité <Mark c={ORANGE} p={prog(t, 44.0, 44.6)}>physique</Mark> et <Mark c={BLUE} p={prog(t, 44.9, 45.5)}>mentale</Mark></Title>
      <svg width={600} height={900} style={{position: 'absolute', left: 240, top: 470}}>
        <circle cx={300} cy={140} r={100} fill={`${BLUE}33`} stroke={BLUE} strokeWidth={10} />
        <path d="M 300 250 Q 140 260 120 480 L 180 760 L 260 760 L 300 520 L 340 760 L 420 760 L 480 480 Q 460 260 300 250 Z" fill={`${ORANGE}33`} stroke={ORANGE} strokeWidth={10} />
        {t > 44.9 && <circle cx={300} cy={140} r={100 + ((t * 60) % 60)} fill="none" stroke={BLUE} strokeWidth={4} opacity={1 - ((t * 60) % 60) / 60} />}
      </svg>
      <Abs x={680} y={560} style={{opacity: pop(t, 45.0)}}><F n="cerveau" size={140} /></Abs>
      <Abs x={160} y={900} style={{opacity: pop(t, 44.2)}}><F n="poing" size={140} /></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── FIN ─────────── */
const Dusty: React.FC = () => {
  const t = useT();
  const dust = prog(t, 48.6, 50.4);
  const pilot = prog(t, 51.2, 52.2, easeInOut);
  return (
    <AbsoluteFill>
      <Title>{pilot < 0.5 ? <>Pas de simples <Mark c={RED} p={prog(t, 48.5, 49.2)}>classeurs</Mark>…</> : <>De vrais <Mark c={GREEN} p={prog(t, 52.3, 53.0)}>outils de pilotage</Mark></>}</Title>
      <Abs x={190} y={480} style={{opacity: 1 - pilot, transform: `scale(${1 - pilot * 0.3})`}}><Shelf w={700} active={-1} dust={dust} /></Abs>
      {dust > 0.3 && pilot < 0.5 && <svg width={300} height={300} style={{position: 'absolute', left: 700, top: 460, opacity: dust}}><path d="M 300 0 L 0 300 M 300 0 L 120 290 M 300 0 L 20 180 M 220 80 L 80 220 M 160 40 L 260 140" stroke="#9AA3B2" strokeWidth={3} /></svg>}
      {pilot > 0 && (
        <Abs x={110} y={520} w={860} h={760} style={{opacity: pilot, background: INK, borderRadius: 40, transform: `scale(${0.8 + pilot * 0.2})`}}>
          {NORMS.map((n, i) => {
            const up = prog(t, 52.6 + i * 0.3, 53.2 + i * 0.3, easeOut);
            return (
              <div key={i} style={{position: 'absolute', left: 90 + i * 250, top: 100, width: 180, height: 560}}>
                <div style={{position: 'absolute', left: 80, top: 40, width: 20, height: 440, borderRadius: 10, background: '#33415F'}} />
                <div style={{position: 'absolute', left: 30, top: lerp(380, 60, up), width: 120, height: 80, borderRadius: 20, background: n.c, border: '5px solid #fff'}} />
                <div style={{position: 'absolute', left: 0, right: 0, top: 500, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff'}}>{n.code}</div>
              </div>
            );
          })}
        </Abs>
      )}
      {t > 53.5 && <Row y={1320} gap={14}><Chip c={RED} light size={32} style={{opacity: pop(t, 53.5), textDecoration: 'line-through'}}>Improviser</Chip><Chip c={GREEN} light size={32} style={{opacity: pop(t, 54.9)}}>✓ Maîtriser</Chip></Row>}
    </AbsoluteFill>
  );
};
const Actors: React.FC = () => {
  const t = useT();
  const A = [{at: 59.3, l: 'Le client', ic: 'pouce', c: BLUE}, {at: 60.0, l: 'La planète', ic: 'planete', c: GREEN}, {at: 60.7, l: 'Le salarié', ic: 'ouvrier', c: ORANGE}];
  return (
    <AbsoluteFill>
      <Title>Un <Mark p={prog(t, 56.0, 56.8)}>socle solide</Mark> pour 3 acteurs</Title>
      <Abs x={290} y={460}><Shelf w={500} active={-1} /></Abs>
      <Abs x={190} y={830} w={700} h={60} style={{background: INK, borderRadius: 12}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {A.map((a, i) => <line key={i} x1={360 + i * 165} y1={890} x2={180 + i * 360} y2={1060} stroke={a.c} strokeWidth={8} strokeDasharray={260} strokeDashoffset={260 * (1 - prog(t, a.at - 0.3, a.at))} />)}
      </svg>
      {A.map((a, i) => (
        <Abs key={i} x={60 + i * 360} y={1060} w={240} style={{textAlign: 'center', transform: `scale(${spring(t, a.at)})`}}>
          <div style={{width: 220, height: 220, margin: '0 auto', borderRadius: 110, background: '#fff', border: `10px solid ${a.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={a.ic} size={130} /></div>
          <T size={38} style={{marginTop: 14}}>{a.l}</T>
        </Abs>
      ))}
    </AbsoluteFill>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2}, ...rep(3.0, 8, 0.25, 'sfx/swish', 0.2), {at: 5.2, s: 'sfx/pop', v: 0.3},
  {at: 5.8, s: 'soft-whoosh', v: 0.3, dur: 1.4}, ...rep(5.9, 12, 0.12, 'tick', 0.2), {at: 7.2, s: 'sfx/ding', v: 0.25},
  ...NORMS.flatMap((p) => [{at: p.at, s: 'sfx/whoosh', v: 0.4}, {at: p.at + 0.3, s: 'sfx/thud', v: 0.3}, {at: p.at + 0.35, s: 'page', v: 0.5}, {at: p.at + WIPE - 0.6, s: 'page', v: 0.4}, {at: p.at + WIPE - 0.3, s: 'sfx/swish', v: 0.35}]),
  {at: 11.0, s: 'tampon', v: 0.55}, {at: 12.6, s: 'sfx/pop', v: 0.22}, {at: 13.0, s: 'sfx/pop', v: 0.22}, {at: 13.4, s: 'sfx/pop', v: 0.22}, {at: 15.2, s: 'validation', v: 0.3},
  ...[18.8, 19.15].map((at) => ({at, s: 'sfx/thud', v: 0.4})), {at: 19.0, s: 'sfx/pop', v: 0.22},
  {at: 22.2, s: 'sfx/rise', v: 0.3}, {at: 23.4, s: 'validation', v: 0.3}, {at: 27.0, s: 'soft-whoosh', v: 0.3, dur: 1.5},
  ...rep(28.8, 3, 0.4, 'sfx/pop', 0.12), {at: 29.6, s: 'sfx/click', v: 0.45}, {at: 31.6, s: 'sfx/pop', v: 0.22}, {at: 31.9, s: 'sfx/pop', v: 0.22}, {at: 32.2, s: 'sfx/pop', v: 0.22}, {at: 32.6, s: 'sfx/ding', v: 0.22},
  {at: 36.6, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 37.6, s: 'sfx/thud', v: 0.35}, {at: 39.6, s: 'sfx/whoosh', v: 0.35}, {at: 40.6, s: 'sfx/thud', v: 0.4}, {at: 40.7, s: 'validation', v: 0.3},
  {at: 44.2, s: 'sfx/pop', v: 0.22}, {at: 45.0, s: 'sfx/pop', v: 0.22},
  {at: 48.6, s: 'tension', v: 0.12, dur: 1.8}, {at: 51.2, s: 'sfx/whoosh', v: 0.4}, ...[52.6, 52.9, 53.2].map((at) => ({at, s: 'sfx/click', v: 0.45})), {at: 53.5, s: 'sfx/swish', v: 0.3}, {at: 54.9, s: 'validation', v: 0.3},
  {at: 56.0, s: 'sfx/thud', v: 0.4}, ...[59.3, 60.0, 60.7].map((at) => ({at, s: 'sfx/ding', v: 0.28})),
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

export const TroisIso: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.0} to={7.8}>
      <Sc a={2.4} b={5.7}><Shell /></Sc>
      <Sc a={5.6} b={7.8}><Untangle /></Sc>
    </Gate>
    <Gate from={9.3} to={20.0}>
      <Sc a={9.4} b={12.5}><Seal /></Sc>
      <Sc a={12.4} b={16.5}><Process /></Sc>
      <Sc a={16.4} b={19.9}><Judge /></Sc>
    </Gate>
    <Gate from={21.5} to={33.7}>
      <Sc a={21.6} b={24.9}><Shield /></Sc>
      <Sc a={24.8} b={29.2}><Footprint /></Sc>
      <Sc a={29.1} b={30.4}><Tap /></Sc>
      <Sc a={30.3} b={33.6}><Loop /></Sc>
    </Gate>
    <Gate from={35.2} to={46.5}>
      <Sc a={35.3} b={38.7}><Fuse /></Sc>
      <Sc a={38.6} b={42.8}><Net /></Sc>
      <Sc a={42.7} b={46.4}><Integrity /></Sc>
    </Gate>
    <Gate from={46.3} to={OUTRO_AT}>
      <Sc a={46.4} b={56.0}><Dusty /></Sc>
      <Sc a={55.9} b={OUTRO_AT}><Actors /></Sc>
    </Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {NORMS.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><BinderWipe p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-trois-iso-origine.m4a')} trimAfter={s(62.1)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);


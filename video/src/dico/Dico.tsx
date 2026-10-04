import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {easeOut, Enter, Gate, prog, useT} from '../anim';
import {PhotoCard, RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, s, sansFont} from '../theme';
import {captions} from './captions';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 36.9;
export const DICO_FRAMES = s(40.3);
const GOLD = '#E3A92B';

/** Mot de la définition : [texte, instant d'apparition, initiale à surligner ?]. */
type W = [string, number, boolean?];
type Entry = {
  at: number;
  end: number;
  acr: string;
  words: W[];
  color: string;
  icons: string[];
  photo?: string;
  cat: string;
};

const ENTRIES: Entry[] = [
  {at: 0.0, end: 4.7, acr: 'QHSE', cat: 'Management', color: colors.navy, icons: ['trophee', 'savon', 'casque', 'feuille'], photo: 'promo/audit-reunion.jpg',
    words: [['Qualité', 1.76, true], ['Hygiène', 2.44, true], ['Sécurité', 2.94, true], ['Environnement', 3.44, true]]},
  {at: 4.7, end: 8.14, acr: 'HSE', cat: 'Management', color: colors.green, icons: ['savon', 'casque', 'feuille'], photo: 'promo/raffinerie.jpg',
    words: [['Hygiène', 5.7, true], ['Sécurité', 6.28, true], ['Environnement', 6.8, true]]},
  {at: 8.14, end: 11.72, acr: 'SST', cat: 'Santé', color: '#2E86C1', icons: ['stethoscope', 'casque'], photo: 'integration/agent-terrain.jpg',
    words: [['Santé', 9.4, true], ['et', 9.8], ['Sécurité', 9.95, true], ['au', 10.28], ['Travail', 10.5, true]]},
  {at: 11.72, end: 15.34, acr: 'EPI', cat: 'Protection', color: GOLD, icons: ['gants', 'lunettes', 'casque'], photo: 'epi/epi-panoplie.jpg',
    words: [['Équipement', 12.84, true], ['de', 13.3], ['Protection', 13.4, true], ['Individuelle', 13.76, true]]},
  {at: 15.34, end: 19.24, acr: 'EPC', cat: 'Protection', color: '#E67E22', icons: ['barriere', 'vent'], photo: 'epi/garde-corps.jpg',
    words: [['Équipement', 16.44, true], ['de', 16.9], ['Protection', 17.0, true], ['Collective', 17.34, true]]},
  {at: 19.24, end: 23.58, acr: 'DUERP', cat: 'Réglementation', color: '#8E44AD', icons: ['classeur', 'memo'], photo: 'iso26/rapport-audit.jpg',
    words: [['Document', 20.54, true], ['Unique', 21.0, true], ["d'Évaluation", 21.3, true], ['des', 21.6], ['Risques', 21.8, true], ['Professionnels', 22.2, true]]},
  {at: 23.58, end: 26.34, acr: 'AT', cat: 'Accidentologie', color: RED, icons: ['pansement', 'ambulance'], photo: 'incident/blessure-soins.jpg',
    words: [['Accident', 24.62, true], ['du', 25.1], ['Travail', 25.3, true]]},
  {at: 26.34, end: 29.58, acr: 'FDS', cat: 'Produits chimiques', color: '#C0392B', icons: ['eprouvette', 'danger'], photo: 'confines/detecteur.jpg',
    words: [['Fiche', 27.58, true], ['de', 27.9], ['Données', 28.0, true], ['de', 28.22], ['Sécurité', 28.4, true]]},
  {at: 29.58, end: 32.66, acr: 'RPS', cat: 'Santé mentale', color: '#5D6D7E', icons: ['anxieux', 'cerveau'],
    words: [['Risques', 30.84, true], ['Psycho', 31.2, true], ['Sociaux', 31.45, true]]},
  {at: 32.66, end: OUTRO_AT, acr: 'PDCA', cat: 'Amélioration continue', color: colors.green, icons: [],
    words: [['Plan', 34.14, true], ['Do', 34.52, true], ['Check', 34.98, true], ['Act', 35.62, true]]},
];

/** Tuiles-lettres du sigle qui tombent en cascade. */
const Letters: React.FC<{e: Entry}> = ({e}) => {
  const t = useT();
  const n = e.acr.length;
  const size = n >= 5 ? 170 : n === 4 ? 200 : 230;
  return (
    <div style={{display: 'flex', gap: 16}}>
      {e.acr.split('').map((c, i) => {
        const p = prog(t, e.at + 0.08 + i * 0.09, e.at + 0.5 + i * 0.09, easeOut);
        const lit = e.words.filter((w) => w[2])[i];
        const on = lit ? t >= lit[1] : false;
        return (
          <div key={i} style={{width: size, height: size * 1.15, borderRadius: size * 0.16, background: on ? e.color : colors.navy, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.72, transform: `translateY(${(1 - p) * -260}px) rotate(${(1 - p) * (i % 2 ? 12 : -12)}deg)`, opacity: Math.min(1, p * 2), boxShadow: `0 ${size * 0.08}px ${size * 0.16}px rgba(14,30,60,0.3)`, borderBottom: `${size * 0.05}px solid rgba(0,0,0,0.25)`}}>{c}</div>
        );
      })}
    </div>
  );
};

/** Définition : les mots apparaissent au rythme de la voix, initiales en couleur. */
const Definition: React.FC<{e: Entry}> = ({e}) => {
  const t = useT();
  return (
    <div style={{width: 940, display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'center', columnGap: 18, rowGap: 4, fontFamily: sansFont, fontWeight: 800, fontSize: 62, lineHeight: 1.15, color: colors.navy}}>
      {e.words.map(([w, at, ini], i) => {
        const p = prog(t, at - 0.05, at + 0.25, easeOut);
        return (
          <span key={i} style={{opacity: p, transform: `translateY(${(1 - p) * 30}px)`, display: 'inline-block'}}>
            {ini ? <><span style={{color: e.color, fontSize: 78}}>{w[0] === "d" && w[1] === "'" ? w.slice(0, 3) : w[0]}</span>{w[0] === "d" && w[1] === "'" ? w.slice(3) : w.slice(1)}</> : <span style={{fontWeight: 600, color: '#7A8594'}}>{w}</span>}
          </span>
        );
      })}
    </div>
  );
};

/** Roue PDCA animée. */
const Pdca: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  const parts: [string, string, number][] = [['PLAN', colors.navy, 34.14], ['DO', colors.green, 34.52], ['CHECK', GOLD, 34.98], ['ACT', '#2E86C1', 35.62]];
  const rot = Math.max(0, t - at) * 12;
  return (
    <div style={{transform: `rotate(${rot}deg) scale(${prog(t, at, at + 0.6, easeOut)})`}}>
      <svg width={460} height={460} viewBox="-230 -230 460 460">
        {parts.map(([l, c, a], i) => {
          const a0 = (i * 90 - 90) * (Math.PI / 180);
          const a1 = ((i + 1) * 90 - 90) * (Math.PI / 180);
          const r = 215;
          const on = t >= a;
          return (
            <g key={l} opacity={on ? 1 : 0.25}>
              <path d={`M0 0 L${Math.cos(a0) * r} ${Math.sin(a0) * r} A${r} ${r} 0 0 1 ${Math.cos(a1) * r} ${Math.sin(a1) * r} Z`} fill={c} stroke="#fff" strokeWidth={8} />
              <text transform={`translate(${Math.cos((a0 + a1) / 2) * 130} ${Math.sin((a0 + a1) / 2) * 130}) rotate(${-rot})`} y={12} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={36} fill="#fff">{l}</text>
            </g>
          );
        })}
        <circle r={56} fill="#fff" />
      </svg>
    </div>
  );
};

const Page: React.FC<{e: Entry; i: number}> = ({e, i}) => {
  const t = useT();
  if (t < e.at || t >= e.end) return null;
  const fade = 1 - prog(t, e.end - 0.2, e.end);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: fade}}>
      {/* onglet du dictionnaire */}
      <div style={{position: 'absolute', left: 40, right: 40, top: 300, display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: prog(t, e.at, e.at + 0.3)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 18, padding: '10px 20px', boxShadow: '0 8px 18px rgba(14,30,60,0.12)'}}>
          <F n="livres" size={50} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: colors.navy, letterSpacing: 2}}>DICTIONNAIRE DE LA PRÉVENTION</div>
        </div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: e.color}}>{String(i + 1).padStart(2, '0')}<span style={{color: '#B9C0C8', fontSize: 30}}> / 10</span></div>
      </div>
      <Enter at={e.at + 0.2} x={540} y={460} bouncy>
        <div style={{background: e.color, color: '#fff', borderRadius: 30, padding: '8px 24px', fontFamily: sansFont, fontWeight: 800, fontSize: 28, letterSpacing: 3, textTransform: 'uppercase'}}>{e.cat}</div>
      </Enter>
      <div style={{position: 'absolute', left: 540, top: 690, transform: 'translate(-50%, -50%)'}}><Letters e={e} /></div>
      <div style={{position: 'absolute', left: 540, top: 1000, transform: 'translate(-50%, -50%)'}}><Definition e={e} /></div>
      {e.acr === 'PDCA' ? (
        <div style={{position: 'absolute', left: 540, top: 1360, transform: 'translate(-50%, -50%)'}}><Pdca at={e.at + 0.5} /></div>
      ) : (
        <>
          {e.photo && <PhotoCard src={e.photo} at={e.at + 0.6} x={380} y={1350} w={560} h={360} rotate={-2} from="left" />}
          <div style={{position: 'absolute', left: e.photo ? 850 : 540, top: 1350, transform: 'translate(-50%, -50%)', display: 'grid', gridTemplateColumns: e.photo ? '1fr' : `repeat(${e.icons.length}, 1fr)`, gap: 12}}>
            {e.icons.slice(0, e.photo ? 2 : 4).map((ic, k) => {
              const p = prog(t, e.at + 0.9 + k * 0.15, e.at + 1.3 + k * 0.15, easeOut);
              return (
                <div key={ic} style={{width: e.photo ? 170 : 220, height: e.photo ? 170 : 220, borderRadius: 40, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 24px rgba(14,30,60,0.16)', borderBottom: `8px solid ${e.color}`, transform: `scale(${p})`}}>
                  <F n={ic} size={e.photo ? 120 : 160} float={4} />
                </div>
              );
            })}
          </div>
        </>
      )}
      {/* progression */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 1570, display: 'flex', justifyContent: 'center', gap: 12}}>
        {ENTRIES.map((x, k) => <div key={x.acr} style={{width: k === i ? 46 : 14, height: 14, borderRadius: 7, background: k <= i ? e.color : '#D5D9DE'}} />)}
      </div>
    </div>
  );
};

const CUES: Sfx[] = [
  ...ENTRIES.flatMap((e, i) => [
    ...(i > 0 ? [{at: e.at - 0.12, s: 'page', v: 0.55}] : [{at: 0.0, s: 'bass-hit', v: 0.55}]),
    ...e.acr.split('').map((_, k) => ({at: e.at + 0.45 + k * 0.09, s: 'sfx/click', v: 0.4})),
    ...e.words.filter((w) => w[2]).map((w) => ({at: w[1], s: 'tick', v: 0.45})),
  ]),
  {at: 33.2, s: 'riser', v: 0.35, dur: 1.2},
  {at: 35.9, s: 'validation', v: 0.55},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Dico: React.FC = () => (
  <AbsoluteFill>
    <Camera shakes={[]}>
      <Background />
      <Gate from={0} to={OUTRO_AT}>{ENTRIES.map((e, i) => <Page key={e.acr} e={e} i={i} />)}</Gate>
      <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    </Camera>
    <Header hideAt={OUTRO_AT} logo={LOGO} />
    <Footer hideAt={OUTRO_AT} />
    {ENTRIES.slice(1).map((e) => <Wipe key={e.acr} at={e.at} dur={0.5} />)}
    <Wipe at={OUTRO_AT} />
    <Captions captions={captions} />
    <Audio src={staticFile('voix-off-dictionnaire.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

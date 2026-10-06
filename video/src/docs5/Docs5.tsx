import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {easeOut, Enter, Gate, Kinetic, prog, useT} from '../anim';
import {PhotoCard, RED} from '../charte/ui';
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
const NEXT = 20.82;
const OUTRO_AT = 24.6;
export const DOCS5_FRAMES = s(28.0);

type Doc = {n: number; at: number; title: string; sub: string; img: string; icon: string; color: string; words?: [string, number][]};
const DOCS: Doc[] = [
  {n: 1, at: 5.8, title: 'La politique *QSE*', sub: 'Le cap et les engagements de la direction', img: 'docs5/politique.jpg', icon: 'boussole', color: BLUE},
  {n: 2, at: 8.22, title: 'Le *DUERP*', sub: '', img: 'docs5/duerp.jpg', icon: 'loupe', color: RED,
    words: [['Document', 10.32], ['Unique', 10.6], ["d'Évaluation", 10.86], ['des Risques', 11.6], ['Professionnels', 11.88]]},
  {n: 3, at: 13.04, title: 'Le programme annuel de *prévention*', sub: 'Les actions planifiées sur l\'année', img: 'docs5/programme.jpg', icon: 'calendrier', color: colors.green},
  {n: 4, at: 15.88, title: 'Les procédures *QHSE*', sub: 'Qui fait quoi, quand et comment', img: 'docs5/procedures.jpg', icon: 'engrenage', color: PURPLE},
  {n: 5, at: 18.54, title: 'Les instructions *de travail*', sub: 'Le mode opératoire au poste', img: 'docs5/instructions.jpg', icon: 'clipboard', color: GOLD},
];
const endOf = (i: number) => (i + 1 < DOCS.length ? DOCS[i + 1].at : NEXT);

/** Rangée de 5 dossiers qui se cochent au fil de la liste. */
const Tracker: React.FC<{cur: number}> = ({cur}) => {
  const t = useT();
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1545, display: 'flex', justifyContent: 'center', gap: 18}}>
      {DOCS.map((d, k) => {
        const done = k < cur || (k === cur && t > endOf(k) - 0.6);
        const on = k === cur;
        return (
          <div key={d.n} style={{width: 150, height: 76, borderRadius: '14px 14px 10px 10px', background: on || done ? d.color : '#D5D9DE', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: sansFont, fontWeight: 900, fontSize: 32, transform: on ? `translateY(${-10 * (1 - prog(t, d.at, d.at + 0.4))}px) scale(1.08)` : undefined, boxShadow: on ? '0 10px 20px rgba(14,30,60,0.25)' : undefined, opacity: k > cur ? 0.7 : 1}}>
            {done ? <svg width={34} height={34} viewBox="0 0 24 24"><path d="M4 12.5 L10 18 L20 6" stroke="#fff" strokeWidth={3.8} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg> : `0${d.n}`}
          </div>
        );
      })}
    </div>
  );
};

const DocScene: React.FC<{d: Doc; i: number}> = ({d, i}) => {
  const t = useT();
  const end = endOf(i);
  const pn = prog(t, d.at + 0.05, d.at + 0.4, easeOut);
  return (
    <AbsoluteFill style={{opacity: 1 - prog(t, end - 0.12, end)}}>
      <div style={{position: 'absolute', left: 50, top: 300, display: 'flex', alignItems: 'center', gap: 16, opacity: pn}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, letterSpacing: 4, color: d.color}}>DOCUMENT</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#9AA5B3'}}>{d.n} / 5</div>
      </div>
      <PhotoCard src={d.img} at={d.at} x={540} y={830} w={680} h={760} rotate={i % 2 ? 2 : -2} from={i % 2 ? 'right' : 'left'} />
      <div style={{position: 'absolute', left: 120, top: 400, width: 190, height: 190, borderRadius: '50%', background: d.color, border: '10px solid #fff', boxShadow: '0 16px 30px rgba(14,30,60,0.3)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 100, transform: `scale(${pn}) rotate(${(1 - pn) * -90}deg)`}}>{d.n}</div>
      <Enter at={d.at + 0.5} x={880} y={1130} bouncy>
        <div style={{width: 150, height: 150, borderRadius: 34, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 24px rgba(14,30,60,0.2)', borderBottom: `8px solid ${d.color}`}}><F n={d.icon} size={110} float={4} /></div>
      </Enter>
      <Kinetic text={d.title} at={d.at + 0.4} y={1300} size={d.title.length > 26 ? 64 : 82} accent={d.color} />
      {d.words ? (
        <div style={{position: 'absolute', left: 60, right: 60, top: 1395, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: 12, fontFamily: sansFont, fontWeight: 800, fontSize: 38, color: colors.navy}}>
          {d.words.map(([w, at]) => {
            const p = prog(t, at - 0.05, at + 0.2, easeOut);
            const cut = w.startsWith("d'") ? 3 : w.startsWith('des ') ? 4 : 0;
            return <span key={w} style={{opacity: p, transform: `translateY(${(1 - p) * 20}px)`, display: 'inline-block'}}>{w.slice(0, cut)}<span style={{color: d.color, fontSize: 46}}>{w[cut]}</span>{w.slice(cut + 1)}</span>;
          })}
        </div>
      ) : (
        <Enter at={d.at + 0.9} x={540} y={1420} from="up">
          <div style={{fontFamily: handFont, fontSize: 50, color: '#6B7684', whiteSpace: 'nowrap'}}>{d.sub}</div>
        </Enter>
      )}
      <Tracker cur={i} />
    </AbsoluteFill>
  );
};

const Intro: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <PhotoCard src="docs5/responsable.jpg" at={0.0} until={2.4} x={540} y={900} w={720} h={840} from="scale" />
      <Kinetic text="T'es responsable *QHSE* ?" at={0.1} until={2.4} y={390} size={84} />
      <Gate from={2.3} to={DOCS[0].at}>
        <PhotoCard src="docs5/dossiers.jpg" at={2.35} x={540} y={980} w={760} h={720} from="up" />
        <div style={{position: 'absolute', left: 540, top: 470, transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'baseline', gap: 18, fontFamily: sansFont, fontWeight: 900, color: colors.navy}}>
          <span style={{fontSize: 210, color: RED, lineHeight: 1, transform: `scale(${prog(t, 2.64, 3.0, easeOut)})`, display: 'inline-block'}}>{Math.round(10 * prog(t, 2.64, 3.1))}</span>
          <span style={{fontSize: 76, opacity: prog(t, 2.96, 3.3)}}>DOCUMENTS</span>
        </div>
        <Enter at={4.3} x={540} y={1440} bouncy>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, background: colors.navy, color: '#fff', borderRadius: 24, padding: '12px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 44, whiteSpace: 'nowrap'}}>
            <F n="ecrit" size={64} /> À SAVOIR <span style={{color: colors.greenLight}}>RÉDIGER</span>
          </div>
        </Enter>
        <Enter at={3.4} x={850} y={640} from="scale"><Stamp text="PARTIE 1 / 2" p={prog(t, 3.4, 3.65)} color={RED} size={40} rotate={8} /></Enter>
      </Gate>
    </AbsoluteFill>
  );
};

/** Teaser : ce n'est que la première partie. */
const Next: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <PhotoCard src="docs5/dossiers-bleus.jpg" at={NEXT} until={22.25} x={540} y={900} w={760} h={800} from="scale" />
      <PhotoCard src="docs5/dossiers-lumiere.jpg" at={22.3} x={540} y={900} w={760} h={800} from="right" />
      <Kinetic text="La *première* partie" at={NEXT + 0.2} until={22.2} y={390} size={86} />
      <Kinetic text="5 autres documents *importants*" at={22.35} y={400} size={70} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 1380, display: 'flex', justifyContent: 'center', gap: 16}}>
        {[6, 7, 8, 9, 10].map((n, k) => {
          const p = prog(t, 22.7 + k * 0.12, 23.0 + k * 0.12, easeOut);
          return <div key={n} style={{width: 150, height: 150, borderRadius: 26, background: '#fff', border: `5px dashed ${colors.navy}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, color: colors.navy, opacity: p, transform: `scale(${0.5 + 0.5 * p})`}}><span style={{fontSize: 30, color: '#9AA5B3'}}>{String(n).padStart(2, '0')}</span><span style={{fontSize: 58}}>?</span></div>;
        })}
      </div>
      <Enter at={23.6} x={800} y={1220} from="scale"><Stamp text="À SUIVRE…" p={prog(t, 23.6, 23.85)} color={colors.green} size={56} rotate={-8} /></Enter>
    </AbsoluteFill>
  );
};

/** Bruitages seuls (ni musique ni ambiance). */
const CUES: Sfx[] = [
  {at: 0.05, s: 'bass-hit', v: 0.55},
  {at: 2.3, s: 'sfx/whoosh', v: 0.5},
  ...Array.from({length: 6}, (_, k) => ({at: 2.64 + k * 0.08, s: 'tick', v: 0.45})),
  {at: 3.1, s: 'deep-hit', v: 0.5},
  {at: 3.4, s: 'tampon', v: 0.6},
  {at: 4.3, s: 'stylo', v: 0.5, dur: 0.8},
  ...DOCS.flatMap((d) => [
    {at: d.at - 0.25, s: 'page', v: 0.55},
    {at: d.at + 0.05, s: 'deep-hit', v: 0.5},
    {at: d.at + 0.4, s: 'sfx/pop', v: 0.45},
    {at: endOf(d.n - 1) - 0.6, s: 'tick', v: 0.5},
    ...(d.words ?? []).map(([, at]) => ({at, s: 'sfx/click', v: 0.4})),
  ]),
  {at: NEXT - 0.25, s: 'soft-whoosh', v: 0.5},
  {at: NEXT + 0.1, s: 'bass-hit', v: 0.5},
  {at: 22.3, s: 'sfx/whoosh', v: 0.45},
  ...[0, 1, 2, 3, 4].map((k) => ({at: 22.7 + k * 0.12, s: 'sfx/pop', v: 0.42})),
  {at: 23.6, s: 'tampon', v: 0.7},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Docs5: React.FC = () => (
  <AbsoluteFill>
    <Camera shakes={[]}>
      <Background />
      <Gate from={0} to={DOCS[0].at}><Intro /></Gate>
      {DOCS.map((d, i) => <Gate key={d.n} from={d.at} to={endOf(i)}><DocScene d={d} i={i} /></Gate>)}
      <Gate from={NEXT} to={OUTRO_AT}><Next /></Gate>
      <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    </Camera>
    <Header hideAt={OUTRO_AT} logo={LOGO} />
    <Footer hideAt={OUTRO_AT} />
    {DOCS.map((d) => <Wipe key={d.n} at={d.at} dur={0.5} color={d.color} />)}
    <Wipe at={NEXT} />
    <Wipe at={OUTRO_AT} />
    <Captions captions={captions} />
    <Audio src={staticFile('voix-off-documents.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

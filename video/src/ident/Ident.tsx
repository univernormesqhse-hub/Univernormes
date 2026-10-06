import {AbsoluteFill, Audio, Img, staticFile} from 'remotion';
import {easeInOut, easeOut, Enter, Gate, Kinetic, prog, useT} from '../anim';
import {PhotoCard, RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Flash, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {Stamp} from '../danger2/ui';
import {F} from '../iso/ui';
import {BLUE} from '../pieges/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, handFont, s, sansFont} from '../theme';
import {captions} from './captions';

const LOGO = 'promo/logo.png';
const ID = 5.64;
const EXAMPLE = 11.88;
const GRID = 16.4;
const EVAL = 26.72;
const MATRIX = 35.44;
const RECAP = 43.8;
const OUTRO_AT = 55.4;
export const IDENT_FRAMES = s(58.8);
const ORANGE = '#EE7D1A';

const card = (c: string): React.CSSProperties => ({background: '#fff', borderRadius: 24, boxShadow: '0 10px 22px rgba(14,30,60,0.14)', borderLeft: `12px solid ${c}`});

/** Bandeau d'étape : 1 IDENTIFIER / 2 ÉVALUER. */
const Step: React.FC<{n: number; at: number; label: string; icon: string; color: string}> = ({n, at, label, icon, color}) => {
  const t = useT();
  const p = prog(t, at, at + 0.4, easeOut);
  return (
    <div style={{position: 'absolute', left: 50, top: 295, display: 'flex', alignItems: 'center', gap: 16, opacity: p, transform: `translateX(${(1 - p) * -60}px)`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, background: color, color: '#fff', borderRadius: 40, padding: '8px 30px 8px 8px', fontFamily: sansFont, fontWeight: 900, fontSize: 40, letterSpacing: 2, boxShadow: '0 10px 22px rgba(14,30,60,0.2)'}}>
        <div style={{width: 70, height: 70, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={icon} size={50} /></div>
        <span style={{opacity: 0.8}}>{n}.</span> {label}
      </div>
    </div>
  );
};

const Chips: React.FC<{items: [string, number, string][]; color: string; top: number}> = ({items, color, top}) => {
  const t = useT();
  return (
    <>
      {items.map(([l, at, ic], k) => {
        const p = prog(t, at - 0.1, at + 0.3, easeOut);
        return (
          <div key={l} style={{...card(color), position: 'absolute', left: 60, top: top + k * 100, width: 960, height: 86, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px', opacity: p, transform: `translateX(${(1 - p) * -90}px)`}}>
            <F n={ic} size={60} />
            <div style={{flex: 1, fontFamily: sansFont, fontWeight: 800, fontSize: l.length > 26 ? 34 : 40, color: colors.navy, whiteSpace: 'nowrap'}}>{l}</div>
          </div>
        );
      })}
    </>
  );
};

const Intro: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <PhotoCard src="ident/inspecteur.jpg" at={0.0} until={3.4} x={540} y={1060} w={740} h={860} from="scale" />
      <Enter at={0.72} x={540} y={420} from="left" until={3.4}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, background: BLUE, color: '#fff', borderRadius: 24, padding: '14px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 54}}><F n="loupe" size={70} /> IDENTIFICATION</div>
      </Enter>
      <Enter at={2.02} x={540} y={560} from="right" until={3.4}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, background: ORANGE, color: '#fff', borderRadius: 24, padding: '14px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 54}}><F n="balance" size={70} /> ÉVALUATION</div>
      </Enter>
      <Gate from={3.4} to={ID}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30}}>
          {[['loupe', 'Identifier', BLUE, -1], ['balance', 'Évaluer', ORANGE, 1]].map(([ic, l, c, d]) => {
            const p = prog(t, 3.45, 3.85, easeOut);
            return (
              <div key={l as string} style={{width: 380, height: 420, borderRadius: 36, background: '#fff', boxShadow: '0 16px 32px rgba(14,30,60,0.18)', borderBottom: `12px solid ${c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, transform: `translateX(${(1 - p) * 300 * (d as number)}px)`}}>
                <F n={ic as string} size={190} float={5} />
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: c as string}}>{l}</div>
              </div>
            );
          })}
        </div>
        <div style={{position: 'absolute', left: 490, top: 790, width: 100, height: 100, borderRadius: '50%', background: RED, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 80, border: '8px solid #fff', transform: `scale(${prog(t, 3.9, 4.2, easeOut)})`}}>≠</div>
        <Kinetic text="Quelle est la *différence* ?" at={3.52} y={450} size={80} accent={RED} />
        <Enter at={4.3} x={540} y={1300} bouncy><F n="question" size={170} /></Enter>
      </Gate>
    </AbsoluteFill>
  );
};

const Identification: React.FC = () => (
  <AbsoluteFill>
    <Step n={1} at={ID} label="IDENTIFIER" icon="loupe" color={BLUE} />
    <Kinetic text="Repérer les *dangers*" at={ID + 0.3} y={500} size={84} accent={BLUE} />
    <PhotoCard src="ident/entrepot.jpg" at={ID + 0.4} until={9.7} x={540} y={895} w={900} h={500} pos="50% 40%" from="left" />
    <PhotoCard src="ident/caisses.jpg" at={9.8} x={540} y={895} w={900} h={500} pos="50% 55%" from="right" />
    <Chips color={BLUE} top={1200} items={[['Repérer les dangers', 7.56, 'loupe2'], ['Et les situations à risque', 8.76, 'danger'], ['Susceptibles de causer un dommage', 9.84, 'pansement']]} />
  </AbsoluteFill>
);

type Hz = {l: string; img: string; at: number; x: number; y: number; p: number; g: number; icon: string};
const HAZ: Hz[] = [
  {l: "Chute d'objets", img: 'ident/chute-objets.png', at: 16.5, x: 290, y: 600, p: 2, g: 3, icon: 'colis'},
  {l: 'Risque électrique', img: 'ident/electrique.jpg', at: 18.2, x: 790, y: 600, p: 1, g: 4, icon: 'eclair'},
  {l: 'Glissade', img: 'ident/glissade.jpg', at: 19.9, x: 290, y: 950, p: 3, g: 2, icon: 'goutte'},
  {l: 'Machine', img: 'ident/machines.png', at: 21.58, x: 790, y: 950, p: 2, g: 4, icon: 'engrenage'},
  {l: 'Absence d\'EPI', img: 'ident/epi.jpg', at: 23.66, x: 540, y: 1300, p: 3, g: 3, icon: 'casque'},
];

const Example: React.FC = () => {
  const t = useT();
  const grid = t >= GRID;
  const found = HAZ.filter((h) => t >= h.at).length;
  return (
    <AbsoluteFill>
      <Step n={1} at={EXAMPLE} label="IDENTIFIER" icon="loupe" color={BLUE} />
      {!grid && (
        <>
          <Kinetic text="Par *exemple*" at={EXAMPLE + 0.1} until={GRID} y={470} size={88} accent={BLUE} />
          <PhotoCard src="ident/flaque.jpg" at={EXAMPLE + 0.2} until={GRID} x={540} y={1000} w={820} h={880} pos="50% 40%" from="scale" />
          <Enter at={14.76} x={820} y={680} until={GRID} bouncy>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, background: RED, color: '#fff', borderRadius: 20, padding: '10px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 38}}><F n="danger" size={56} /> Plusieurs dangers</div>
          </Enter>
        </>
      )}
      {grid && (
        <>
          <div style={{position: 'absolute', right: 50, top: 300, display: 'flex', alignItems: 'baseline', gap: 10, fontFamily: sansFont, fontWeight: 900, color: RED}}>
            <span style={{fontSize: 72}}>{found}</span><span style={{fontSize: 30, color: colors.navy}}>danger{found > 1 ? 's' : ''} identifié{found > 1 ? 's' : ''}</span>
          </div>
          {HAZ.map((h, k) => {
            const p = prog(t, h.at - 0.1, h.at + 0.3, easeOut);
            const ok = prog(t, h.at + 0.35, h.at + 0.6, easeOut);
            return (
              <div key={h.l} style={{position: 'absolute', left: h.x - 225, top: h.y - 150, width: 450, height: 310, borderRadius: 28, background: '#fff', boxShadow: '0 14px 28px rgba(14,30,60,0.18)', overflow: 'hidden', opacity: p, transform: `scale(${0.6 + 0.4 * p}) rotate(${(1 - p) * (k % 2 ? 8 : -8)}deg)`, border: `5px solid ${ok > 0.5 ? BLUE : '#fff'}`}}>
                <div style={{height: 225, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12}}>
                  <Img src={staticFile(h.img)} style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}} />
                </div>
                <div style={{height: 80, background: colors.navy, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontFamily: sansFont, fontWeight: 900, fontSize: 34}}>
                  <span style={{display: 'inline-flex', width: 44, height: 44, borderRadius: '50%', background: BLUE, alignItems: 'center', justifyContent: 'center', fontSize: 26, transform: `scale(${ok})`}}>{k + 1}</span>{h.l}
                </div>
              </div>
            );
          })}
          {(() => {
            const cur = [...HAZ].reverse().find((h) => t >= h.at - 0.4);
            if (!cur) return null;
            const a = prog(t, cur.at - 0.4, cur.at + 0.1, easeInOut);
            const prev = HAZ[HAZ.indexOf(cur) - 1] ?? {x: 540, y: 1500};
            return <div style={{position: 'absolute', left: prev.x + (cur.x - prev.x) * a + 90, top: prev.y + (cur.y - prev.y) * a - 40, transform: 'rotate(-20deg)', opacity: 1 - prog(t, 25.4, 25.8)}}><F n="loupe" size={140} /></div>;
          })()}
        </>
      )}
    </AbsoluteFill>
  );
};

const Evaluation: React.FC = () => (
  <AbsoluteFill>
    <Step n={2} at={EVAL} label="ÉVALUER" icon="balance" color={ORANGE} />
    <Kinetic text="Analyser et *prioriser*" at={EVAL + 0.3} y={500} size={84} accent={ORANGE} />
    <PhotoCard src="ident/tablette.jpg" at={EVAL + 0.4} x={540} y={895} w={900} h={500} pos="50% 55%" from="right" />
    <Chips color={ORANGE} top={1200} items={[['Analyser leur niveau', 29.76, 'graphique'], ['Déterminer leur importance', 31.48, 'balance'], ['Prioriser le traitement', 33.24, 'cible']]} />
  </AbsoluteFill>
);

/** Matrice probabilité × gravité où viennent se placer les 5 dangers. */
const Matrix: React.FC = () => {
  const t = useT();
  const N = 4;
  const C = 170;
  const X0 = 210;
  const Y0 = 560;
  const cellColor = (pp: number, gg: number) => {
    const c = pp * gg;
    return c >= 9 ? '#E74C3C' : c >= 6 ? '#F39C12' : c >= 3 ? '#F7DC6F' : '#82C785';
  };
  const grid = prog(t, MATRIX + 0.2, MATRIX + 0.8);
  return (
    <AbsoluteFill>
      <Step n={2} at={MATRIX} label="ÉVALUER" icon="balance" color={ORANGE} />
      <Enter at={MATRIX + 0.2} x={540} y={450} from="up">
        <div style={{display: 'flex', alignItems: 'center', gap: 16, fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: colors.navy, whiteSpace: 'nowrap'}}>
          <span style={{color: BLUE, opacity: 0.3 + 0.7 * prog(t, 38.06, 38.4)}}>Probabilité</span> × <span style={{color: RED, opacity: 0.3 + 0.7 * prog(t, 41.16, 41.5)}}>Gravité</span>
        </div>
      </Enter>
      {Array.from({length: N * N}, (_, k) => {
        const pp = (k % N) + 1;
        const gg = N - Math.floor(k / N);
        const d = (pp + (N - gg)) * 0.05;
        const p = prog(t, MATRIX + 0.3 + d, MATRIX + 0.6 + d, easeOut);
        return <div key={k} style={{position: 'absolute', left: X0 + (pp - 1) * C, top: Y0 + (N - gg) * C, width: C - 8, height: C - 8, borderRadius: 16, background: cellColor(pp, gg), opacity: p * 0.9, transform: `scale(${p})`}} />;
      })}
      <div style={{position: 'absolute', left: X0 - 12, top: Y0 - 20, width: 8, height: N * C + 20, background: colors.navy, borderRadius: 4, opacity: grid}} />
      <div style={{position: 'absolute', left: X0 - 12, top: Y0 + N * C, width: N * C + 20, height: 8, background: colors.navy, borderRadius: 4, opacity: grid}} />
      <div style={{position: 'absolute', left: X0, top: Y0 + N * C + 24, width: N * C, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: BLUE, opacity: prog(t, 38.06, 38.4)}}>PROBABILITÉ →</div>
      <div style={{position: 'absolute', left: X0 - 60 - (N * C) / 2, top: Y0 + (N * C) / 2 - 22, width: N * C, textAlign: 'center', transform: 'rotate(-90deg)', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: RED, opacity: prog(t, 41.16, 41.5)}}>GRAVITÉ →</div>
      {HAZ.map((h, k) => {
        const at = 41.6 + k * 0.25;
        const p = prog(t, at, at + 0.3, easeOut);
        const jitter = HAZ.slice(0, k).filter((o) => o.p === h.p && o.g === h.g).length;
        return (
          <div key={h.l} style={{position: 'absolute', left: X0 + (h.p - 1) * C + 20 + jitter * 50, top: Y0 + (N - h.g) * C + 20, width: 112, height: 112, borderRadius: '50%', background: '#fff', border: `5px solid ${colors.navy}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.25)', opacity: p, transform: `scale(${0.3 + 0.7 * p + 0.15 * Math.sin(p * Math.PI)})`}}>
            <F n={h.icon} size={70} />
          </div>
        );
      })}
      <Enter at={42.9} x={540} y={1360} from="up"><div style={{fontFamily: handFont, fontSize: 42, color: '#6B7684', whiteSpace: 'nowrap'}}>Exemple de cotation : plus c'est rouge, plus c'est prioritaire</div></Enter>
    </AbsoluteFill>
  );
};

const Recap: React.FC = () => {
  const t = useT();
  const cols: [string, string, string, string, string, number, number][] = [
    ['IDENTIFIER', 'loupe', 'ident/lampe.jpg', 'Trouver les dangers et les risques', BLUE, 45.2, 60],
    ['ÉVALUER', 'balance', 'ident/tablette.jpg', 'Déterminer leurs niveaux et hiérarchiser', ORANGE, 48.06, 560],
  ];
  const final = t >= 52.5;
  return (
    <AbsoluteFill>
      <Kinetic text="En *résumé*" at={RECAP + 0.1} until={52.4} y={420} size={92} />
      {!final && cols.map(([l, ic, img, txt, c, at, x]) => {
        const p = prog(t, at - 0.2, at + 0.3, easeOut);
        return (
          <div key={l} style={{position: 'absolute', left: x, top: 540, width: 460, borderRadius: 34, overflow: 'hidden', background: '#fff', boxShadow: '0 16px 32px rgba(14,30,60,0.18)', border: `6px solid ${c}`, opacity: p, transform: `translateY(${(1 - p) * 80}px)`}}>
            <div style={{background: c, color: '#fff', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, fontFamily: sansFont, fontWeight: 900, fontSize: 40}}><F n={ic} size={56} />{l}</div>
            <div style={{height: 420, backgroundImage: `url(${staticFile(img)})`, backgroundSize: 'cover', backgroundPosition: '50% 40%'}} />
            <div style={{padding: '22px 22px 26px', fontFamily: sansFont, fontWeight: 800, fontSize: 36, color: colors.navy, lineHeight: 1.15, minHeight: 130}}>{txt}</div>
          </div>
        );
      })}
      {!final && <Enter at={50.9} x={540} y={1420} from="scale"><Stamp text="HIÉRARCHISER" p={prog(t, 50.9, 51.15)} color={ORANGE} size={50} rotate={-6} /></Enter>}
      {final && (
        <>
          <PhotoCard src="ident/bras-croises.jpg" at={52.5} x={540} y={760} w={620} h={620} pos="50% 30%" from="scale" />
          <div style={{position: 'absolute', left: 0, right: 0, top: 1150, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20}}>
            {[['1', 'IDENTIFIER', 'loupe', BLUE, 53.0], ['2', 'ÉVALUER', 'balance', ORANGE, 54.3]].map(([n, l, ic, c, at], k) => {
              const p = prog(t, at as number, (at as number) + 0.35, easeOut);
              return (
                <div key={l as string} style={{display: 'flex', alignItems: 'center', gap: 20}}>
                  {k === 1 && <div style={{fontSize: 70, color: colors.navy, fontWeight: 900, opacity: prog(t, 54.0, 54.3), fontFamily: sansFont}}>→</div>}
                  <div style={{display: 'flex', alignItems: 'center', gap: 12, background: c as string, color: '#fff', borderRadius: 26, padding: '14px 24px', fontFamily: sansFont, fontWeight: 900, fontSize: 40, opacity: p, transform: `scale(${0.6 + 0.4 * p})`}}>
                    <span style={{fontSize: 52}}>{n}</span><F n={ic as string} size={56} />{l}
                  </div>
                </div>
              );
            })}
          </div>
          <Enter at={53.2} x={540} y={1330} from="up"><div style={{fontFamily: handFont, fontSize: 56, color: colors.navy, whiteSpace: 'nowrap'}}>d'abord on <span style={{color: BLUE}}>identifie</span>, puis on <span style={{color: ORANGE}}>évalue</span></div></Enter>
        </>
      )}
    </AbsoluteFill>
  );
};

/** Bruitages seuls (ni musique ni ambiance), calés sur chaque action. */
const CUES: Sfx[] = [
  {at: 0.05, s: 'bass-hit', v: 0.5},
  {at: 0.72, s: 'sfx/whoosh', v: 0.5},
  {at: 2.02, s: 'sfx/whoosh', v: 0.5},
  {at: 3.45, s: 'sfx/swish', v: 0.5},
  {at: 3.9, s: 'deep-hit', v: 0.55},
  {at: 4.3, s: 'sfx/ding', v: 0.45},
  // identification
  {at: ID - 0.3, s: 'soft-whoosh', v: 0.5},
  {at: ID + 0.05, s: 'deep-hit', v: 0.5},
  {at: ID + 0.4, s: 'sfx/whoosh', v: 0.42},
  {at: 9.8, s: 'sfx/whoosh', v: 0.42},
  ...[7.56, 8.76, 9.84].flatMap((at) => [{at: at - 0.05, s: 'sfx/swish', v: 0.35}, {at: at + 0.3, s: 'tick', v: 0.5}]),
  // exemple
  {at: EXAMPLE - 0.3, s: 'soft-whoosh', v: 0.5},
  {at: EXAMPLE + 0.2, s: 'sfx/whoosh', v: 0.45},
  {at: 14.76, s: 'alarme', v: 0.22, dur: 0.8},
  {at: GRID, s: 'soft-whoosh', v: 0.45},
  ...HAZ.flatMap((h) => [{at: h.at - 0.4, s: 'sfx/swish', v: 0.35}, {at: h.at, s: 'sfx/pop', v: 0.55}, {at: h.at + 0.4, s: 'tick', v: 0.5}]),
  {at: 18.25, s: 'sfx/click', v: 0.5},
  {at: 20.0, s: 'sfx/swish', v: 0.45},
  // évaluation
  {at: EVAL - 0.3, s: 'soft-whoosh', v: 0.5},
  {at: EVAL + 0.05, s: 'deep-hit', v: 0.5},
  {at: EVAL + 0.4, s: 'sfx/whoosh', v: 0.42},
  ...[29.76, 31.48, 33.24].flatMap((at) => [{at: at - 0.05, s: 'sfx/swish', v: 0.35}, {at: at + 0.3, s: 'tick', v: 0.5}]),
  // matrice
  {at: MATRIX - 0.3, s: 'soft-whoosh', v: 0.5},
  ...Array.from({length: 7}, (_, k) => ({at: MATRIX + 0.3 + k * 0.05, s: 'sfx/click', v: 0.3})),
  {at: 38.06, s: 'sfx/pop', v: 0.5},
  {at: 41.16, s: 'sfx/pop', v: 0.5},
  ...HAZ.map((_, k) => ({at: 41.6 + k * 0.25, s: 'sfx/pop', v: 0.5})),
  {at: 42.9, s: 'validation', v: 0.45},
  // récap
  {at: RECAP - 0.3, s: 'soft-whoosh', v: 0.5},
  {at: RECAP + 0.1, s: 'bass-hit', v: 0.5},
  {at: 45.0, s: 'sfx/whoosh', v: 0.45},
  {at: 47.86, s: 'sfx/whoosh', v: 0.45},
  {at: 50.9, s: 'tampon', v: 0.7},
  {at: 52.5, s: 'soft-whoosh', v: 0.45},
  {at: 53.0, s: 'validation', v: 0.5},
  {at: 54.3, s: 'validation', v: 0.5},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Ident: React.FC = () => (
  <AbsoluteFill>
    <Camera shakes={[3.9]}>
      <Background />
      <Gate from={0} to={ID}><Intro /></Gate>
      <Gate from={ID} to={EXAMPLE}><Identification /></Gate>
      <Gate from={EXAMPLE} to={EVAL}><Example /></Gate>
      <Gate from={EVAL} to={MATRIX}><Evaluation /></Gate>
      <Gate from={MATRIX} to={RECAP}><Matrix /></Gate>
      <Gate from={RECAP} to={OUTRO_AT}><Recap /></Gate>
      <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    </Camera>
    <Header hideAt={OUTRO_AT} logo={LOGO} />
    <Footer hideAt={OUTRO_AT} />
    <Wipe at={ID} color={BLUE} />
    <Wipe at={EXAMPLE} color={BLUE} />
    <Wipe at={GRID} dur={0.45} color={BLUE} />
    <Wipe at={EVAL} color={ORANGE} />
    <Wipe at={MATRIX} color={ORANGE} />
    <Wipe at={RECAP} />
    <Wipe at={OUTRO_AT} />
    <Flash at={18.25} />
    <Captions captions={captions} />
    <Audio src={staticFile('voix-off-identification.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

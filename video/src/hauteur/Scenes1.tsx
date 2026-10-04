import {interpolate} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, kf, Kinetic, prog, useSpring, useT} from '../anim';
import {PhotoCard, RED, Strike} from '../charte/ui';
import {Note, Op, Stamp, Win} from '../danger2/ui';
import {F, Pill} from '../iso/ui';
import {CineShot, Highlight} from '../prevention2/Cine';
import {Duel, Steps} from '../pieges/ui';
import {colors, handFont, sansFont} from '../theme';

export const ORANGE = '#EE7D1A';

/** Silhouette qui chute le long d'un trait pointillé. */
const Faller: React.FC<{p: number; x: number; y0: number; y1: number}> = ({p, x, y0, y1}) => (
  <div style={{position: 'absolute', left: x, top: interpolate(p, [0, 1], [y0, y1], {easing: easeIn}), transform: `translate(-50%, -50%) rotate(${p * 160}deg)`, opacity: p < 0.98 ? 1 : 0}}>
    <F n="ouvrier" size={140} />
  </div>
);

/** 0 – 38,6 s : une chute, une seconde, une vie. */
export const Intro: React.FC = () => {
  const t = useT();
  const sec = prog(t, 14.7, 15.7, (v) => v);
  const words = [
    ['UNE CHUTE.', 29.94, RED],
    ['UNE SECONDE.', 30.74, ORANGE],
    ['UNE VIE.', 31.72, colors.navy],
  ] as const;
  return (
    <>
      <Kinetic text="Le travail en *hauteur*" at={0.3} until={12.8} y={420} size={90} accent={ORANGE} maxWidth={1000} />
      <Kinetic text="Une *seconde*" at={12.85} until={26.0} y={420} size={100} accent={RED} />
      <Kinetic text="Aucune *deuxième* chance" at={32.5} until={38.6} y={420} size={78} accent={RED} maxWidth={1000} />

      <Win a={0.3} b={12.8}>
        <CineShot src="tirant/echafaudage.jpg" at={0.3} until={12.8} move="up" pos="50% 40%" y={980} h={860} label="Un risque sournois et dangereux" grade="warm" />
        <Highlight at={10.4} until={12.8} x={540} y={1000} r={110} color={RED} label="un détail" />
      </Win>

      <Win a={12.85} b={26.0}>
        <Enter at={13.0} x={540} y={900} bouncy>
          <div style={{position: 'relative', width: 420, height: 420}}>
            <svg width={420} height={420} style={{position: 'absolute', inset: 0}}>
              <circle cx={210} cy={210} r={190} fill="#fff" stroke={colors.navy} strokeWidth={14} />
              <circle cx={210} cy={210} r={160} fill="none" stroke={RED} strokeWidth={22} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - sec} transform="rotate(-90 210 210)" />
              <line x1={210} y1={210} x2={210 + Math.sin(sec * Math.PI * 2) * 130} y2={210 - Math.cos(sec * Math.PI * 2) * 130} stroke={colors.navy} strokeWidth={10} strokeLinecap="round" />
            </svg>
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: RED, paddingTop: 170}}>1 s</div>
          </div>
        </Enter>
        {t > 15.0 && <Faller p={prog(t, 15.0, 16.6)} x={850} y0={700} y1={1350} />}
        <Enter at={19.7} x={540} y={1300} bouncy><Pill label="Même pour le plus expérimenté" icon="casque" color={ORANGE} size={30} /></Enter>
        <Enter at={23.0} x={540} y={1440} bouncy><Note text="brutal et incroyablement rapide" color={RED} size={52} /></Enter>
      </Win>

      <Win a={26.05} b={38.6}>
        {words.map(([w, at, c], i) => {
          const sp = prog(t, at, at + 0.25, easeOut);
          return t >= at ? (
            <div key={w} style={{position: 'absolute', left: 540, top: 760 + i * 230, transform: `translate(-50%, -50%) scale(${2 - sp})`, opacity: sp, fontFamily: sansFont, fontWeight: 900, fontSize: 120, color: c, letterSpacing: -3, whiteSpace: 'nowrap'}}>{w}</div>
          ) : null;
        })}
        <Enter at={26.4} until={29.9} x={540} y={980} bouncy><Note text="trois mots qui claquent comme un verdict" size={54} /></Enter>
        {t > 32.8 && <div style={{position: 'absolute', left: 540, top: 1460, transform: 'translate(-50%, -50%)'}}><Stamp text="ZÉRO MARGE D'ERREUR" p={prog(t, 32.8, 33.1)} color={RED} size={50} /></div>}
      </Win>
    </>
  );
};

/** 42,3 – 83,6 s : le danger invisible. */
export const Danger: React.FC = () => {
  const t = useT();
  const h = kf(t, [76.0, 78.4], [0, 1]);
  const fall = prog(t, 79.2, 80.4, easeIn);
  return (
    <>
      <Kinetic text="Une cause de décès *majeure*" at={42.3} until={52.25} y={420} size={78} accent={RED} maxWidth={1000} />
      <Kinetic text="Le *potentiel* de chute" at={52.3} until={67.8} y={420} size={86} accent={ORANGE} maxWidth={1000} />
      <Kinetic text="Des risques *partout*" at={67.85} until={74.45} y={420} size={88} accent={ORANGE} maxWidth={1000} />
      <Kinetic text="*2 mètres* suffisent" at={74.5} until={83.55} y={420} size={92} accent={RED} maxWidth={1000} />

      <Win a={42.3} b={52.25}>
        <CineShot src="incident/chute-echelle.jpg" at={42.4} until={52.25} move="push" y={960} h={760} grade="alert" label="Parmi les premières causes d'accidents mortels" />
        <Enter at={49.0} x={290} y={1420} bouncy><Pill label="Partout" icon="globe" color={ORANGE} size={32} /></Enter>
        <Enter at={51.2} x={790} y={1420} bouncy><Pill label="Sous-estimé" icon="danger" color={RED} size={32} /></Enter>
      </Win>

      <Win a={52.3} b={67.8}>
        {t < 58.4 && (
          <Enter at={56.8} x={540} y={950} bouncy>
            <div style={{position: 'relative', textAlign: 'center'}}>
              <F n="batiment" size={300} />
              <div style={{fontFamily: handFont, fontSize: 52, color: colors.navy}}>gratte-ciels ?</div>
              <div style={{position: 'absolute', left: -20, right: -20, top: '45%'}}><Strike p={prog(t, 57.6, 58.1)} w={340} /></div>
            </div>
          </Enter>
        )}
        {t >= 58.4 && (
          <>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <rect x={160} y={860} width={420} height={30} rx={8} fill={colors.navy} />
              <rect x={170} y={890} width={14} height={560} fill={colors.navy} />
              <rect x={556} y={890} width={14} height={560} fill={colors.navy} />
              <path d="M600 860 Q 720 860 760 1440" stroke={RED} strokeWidth={8} strokeDasharray="20 14" fill="none" opacity={prog(t, 63.0, 63.5)} />
              <line x1={80} y1={1450} x2={1000} y2={1450} stroke={colors.navy} strokeWidth={6} opacity={0.4} />
            </svg>
            <Enter at={58.6} x={420} y={790} bouncy><F n="ouvrier" size={150} /></Enter>
            <Enter at={64.6} x={800} y={1180} bouncy><Pill label="Potentiel de chute" icon="danger" color={RED} size={32} /></Enter>
          </>
        )}
      </Win>

      <Win a={67.85} b={74.45}>
        {[
          ['incident/chute-echelle.jpg', 'Échelle', 70.1, 290, 820],
          ['tirant/echafaudage.jpg', 'Échafaudage', 71.2, 790, 820],
          ['confines/tripode-toit.jpg', 'Toiture', 71.9, 290, 1250],
          ['promo/raffinerie.jpg', 'Camion-citerne', 72.6, 790, 1250],
        ].map(([src, l, at, x, y], i) => (
          <PhotoCard key={l as string} src={src as string} at={at as number} x={x as number} y={y as number} w={460} h={380} label={l as string} from={i % 2 ? 'right' : 'left'} rotate={i % 2 ? 2 : -2} />
        ))}
      </Win>

      <Win a={74.5} b={83.55}>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <line x1={80} y1={1420} x2={1000} y2={1420} stroke={colors.navy} strokeWidth={8} />
          <rect x={260} y={1420 - 560 * h} width={240} height={560 * h} rx={10} fill="#D8CFB9" stroke={colors.navy} strokeWidth={6} />
          <line x1={640} y1={1420} x2={640} y2={1420 - 560 * h} stroke={ORANGE} strokeWidth={10} />
          {[0, 1, 2, 3, 4].map((k) => <line key={k} x1={620} y1={1420 - k * 140 * h} x2={660} y2={1420 - k * 140 * h} stroke={ORANGE} strokeWidth={6} />)}
        </svg>
        <div style={{position: 'absolute', left: 760, top: 1420 - 280 * h, transform: 'translate(-50%, -50%)', fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: ORANGE, opacity: h}}>2 m</div>
        {t < 79.2 ? (
          <div style={{position: 'absolute', left: 380, top: 1420 - 560 * h - 70, transform: 'translate(-50%, -50%)', opacity: h}}><F n="ouvrier" size={140} /></div>
        ) : (
          <Faller p={fall} x={440} y0={790} y1={1380} />
        )}
        {t > 80.2 && <div style={{position: 'absolute', left: 540, top: 1520, transform: 'translate(-50%, -50%)'}}><Stamp text="PEUT ÊTRE FATALE" p={prog(t, 80.2, 80.5)} color={RED} size={52} /></div>}
      </Win>
    </>
  );
};

/** 88 – 147,7 s : les causes réelles. */
export const Causes: React.FC = () => {
  const t = useT();
  const alarm = t > 139.1 ? (Math.floor(t * 4) % 2 ? 1 : 0.3) : 0;
  return (
    <>
      <Kinetic text="Jamais le *hasard*" at={88.05} until={98.95} y={420} size={92} accent={ORANGE} maxWidth={1000} />
      <Kinetic text="Le *comportement* humain" at={99.0} until={118.0} y={420} size={82} accent={RED} maxWidth={1000} />
      <Kinetic text="Le danger est dans la *tête*" at={118.05} until={131.75} y={420} size={78} accent={ORANGE} maxWidth={1000} />
      <Kinetic text="« Je fais *vite* »" at={131.8} until={147.7} y={420} size={96} accent={RED} />

      <Win a={88.05} b={98.95}>
        {[0, 1, 2, 3].map((i) => {
          const last = i === 3;
          return (
            <Enter key={i} at={93.2 + i * 0.6} x={200 + i * 230} y={1000} bouncy>
              <div style={{width: 200, height: 120, borderRadius: 60, border: `18px solid ${last ? RED : colors.navy}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: last ? 'rgba(217,68,58,0.1)' : 'transparent'}}>
                {last && <F n="bris" size={70} />}
              </div>
            </Enter>
          );
        })}
        <Enter at={95.2} x={820} y={1200} bouncy><Note text="le dernier maillon" color={RED} size={48} /></Enter>
        <Enter at={96.3} x={360} y={1320} bouncy><Pill label="Une chaîne de causes" icon="maillon" color={colors.navy} size={30} /></Enter>
      </Win>

      <Win a={99.0} b={118.0}>
        {t < 108.2 && <Duel y={980} h={560} a={{t: 'Le matériel', s: 'qui lâche ?', icon: 'outils', c: '#9AA4B2', at: 99.9}} b={{t: 'L’humain', s: 'cause n°1', icon: 'cerveau', c: RED, at: 105.2}} />}
        {t > 102.6 && t < 108.2 && <div style={{position: 'absolute', left: 290, top: 980, transform: 'translate(-50%, -50%)'}}><Strike p={prog(t, 103.4, 103.9)} w={420} /></div>}
        {t >= 108.2 && (
          <>
            <Steps y={700} gap={190} items={[
              {l: 'Aller trop vite', icon: 'chrono', at: 108.5, c: RED},
              {l: "L'excès de confiance", icon: 'pouce', at: 110.2, c: ORANGE},
              {l: 'Mauvaise utilisation du matériel', icon: 'outils', at: 111.4, c: colors.navy},
            ]} />
            <Enter at={114.5} x={540} y={1380} bouncy><Note text="→ des choix, des décisions" color={RED} size={58} /></Enter>
          </>
        )}
      </Win>

      <Win a={118.05} b={131.75}>
        <CineShot src="tirant/echafaudage-dessin.jpg" at={118.1} until={123.0} move="push" y={960} h={660} grade="none" />
        {t >= 122.4 && <Enter at={122.5} x={540} y={850} bouncy><F n="cerveau" size={300} float={6} /></Enter>}
        {[
          ['Habitude', 'repeter', 124.6, 220],
          ['Routine', 'calendrier', 125.5, 540],
          ['Pression du temps', 'sablier', 126.4, 860],
        ].map(([l, ic, at, x]) => <Enter key={l as string} at={at as number} x={x as number} y={1180} bouncy><Pill label={l as string} icon={ic as string} color={ORANGE} size={26} /></Enter>)}
        <Enter at={129.9} x={540} y={1370} bouncy><Note text="la sécurité est un état d'esprit" color={colors.green} size={54} /></Enter>
      </Win>

      <Win a={131.8} b={147.7}>
        <Enter at={134.7} x={540} y={850} bouncy>
          <div style={{position: 'relative', background: '#fff', borderRadius: 40, padding: '30px 40px', boxShadow: '0 16px 32px rgba(14,30,60,0.18)', maxWidth: 820}}>
            <div style={{fontFamily: handFont, fontSize: 60, color: colors.navy, lineHeight: 1.15, textAlign: 'center'}}>« T'inquiète, j'en ai pour une seconde. Je fais juste un aller-retour. »</div>
            <div style={{position: 'absolute', left: 120, bottom: -40, width: 0, height: 0, borderLeft: '30px solid transparent', borderRight: '30px solid transparent', borderTop: '44px solid #fff'}} />
          </div>
        </Enter>
        <Enter at={137.4} x={200} y={1150} bouncy><F n="ouvrier" size={160} /></Enter>
        {t > 139.1 && <div style={{position: 'absolute', left: 820, top: 1170, transform: 'translate(-50%, -50%)', opacity: alarm}}><F n="gyrophare" size={180} /></div>}
        <Enter at={140.0} x={540} y={1250} bouncy><Pill label="Signal d'alarme !" icon="danger" color={RED} size={32} /></Enter>
        {t > 146.8 && <div style={{position: 'absolute', left: 540, top: 1440, transform: 'translate(-50%, -50%)'}}><Stamp text="LE VITE FAIT TUE" p={prog(t, 146.8, 147.1)} color={RED} size={56} /></div>}
      </Win>
    </>
  );
};


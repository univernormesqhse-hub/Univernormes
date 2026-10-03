import {interpolate} from 'remotion';
import {easeInOut, easeOut, Enter, kf, Kinetic, prog, useSpring, useT} from '../anim';
import {PhotoCard, Row} from '../charte/ui';
import {F, Pill} from '../iso/ui';
import {Highlight} from '../prevention2/Cine';
import {colors, handFont, sansFont} from '../theme';
import {AMBER, Concept, Gauge, Note, Op, Quote, RED, Stamp, Win} from './ui';

const DEF2: [string, number, boolean?][] = [
  ['Le', 158.14], ['risque,', 158.3, true], ["c'est", 158.6], ["l'éventualité", 159.94, true], ["d'une", 160.6], ['rencontre', 160.86, true], ['entre', 161.5], ["l'homme", 161.7], ['et', 161.94], ['un', 162.2], ['danger', 162.5, true], ['auquel', 163.08], ['il', 163.5], ['est', 163.7], ['exposé.', 163.9],
];

/** 152,2 – 182 s : le risque, une éventualité de rencontre. */
export const Risque: React.FC = () => {
  const t = useT();
  const walk = kf(t, [172.3, 174.3, 177.2, 178.6], [0, 1, 1, 0]);
  const meet = t >= 174.3 && t < 177.2;
  const zero = useSpring(180.6, {damping: 8});
  return (
    <>
      <Kinetic text="Le mot magique" at={152.25} until={156.95} y={420} size={90} />
      <Kinetic text="Définition *INRS*" at={157.0} until={164.35} y={420} size={92} accent={AMBER} />
      <Kinetic text="Danger + humain = *risque*" at={164.4} until={177.0} y={420} size={78} accent={AMBER} maxWidth={1000} />
      <Kinetic text="Sans rencontre : *zéro*" at={177.05} until={181.95} y={420} size={84} accent={colors.green} maxWidth={1000} />

      <Win a={152.25} b={156.95}>
        <Enter at={152.5} x={540} y={1000} bouncy>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 104, color: AMBER, letterSpacing: -3, textTransform: 'uppercase', textShadow: '0 12px 30px rgba(227,155,31,0.35)'}}>éventualité</div>
        </Enter>
        <Enter at={153.0} x={540} y={760} bouncy><F n="de" size={220} float={8} /></Enter>
        <Enter at={154.0} x={540} y={1230} bouncy><Note text="retour chez l'INRS…" size={54} /></Enter>
      </Win>

      <Win a={157.0} b={164.35}>
        <Enter at={157.1} x={540} y={940} from="up" dist={260}><Quote source="DÉFINITION INRS · RISQUE" words={DEF2} color={AMBER} /></Enter>
        <Enter at={160.4} x={300} y={1330} bouncy><Pill label="l'homme" icon="ouvrier" color={AMBER} size={32} /></Enter>
        <Enter at={160.9} x={540} y={1330} bouncy><Op c="×" color={AMBER} size={90} /></Enter>
        <Enter at={162.6} x={780} y={1330} bouncy><Pill label="le danger" icon="danger" color={RED} size={32} /></Enter>
      </Win>

      {/* la rencontre */}
      <Win a={164.4} b={182.0}>
        <Enter at={164.8} x={760} y={1000} bouncy><Concept label="DANGER" icon="danger" color={RED} w={330} /></Enter>
        <div style={{position: 'absolute', left: interpolate(walk, [0, 1], [160, 470]), top: 1000, transform: 'translate(-50%, -50%)', opacity: prog(t, 165.4, 165.9)}}>
          <F n="ouvrier" size={260} />
        </div>
        {meet && (
          <div style={{position: 'absolute', left: 600, top: 680, transform: `translate(-50%, -50%) scale(${prog(t, 174.3, 174.7, easeOut)})`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, background: AMBER, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 64, padding: '14px 34px', borderRadius: 22, boxShadow: '0 16px 30px rgba(227,155,31,0.45)'}}>
              <F n="bris" size={80} /> RISQUE
            </div>
          </div>
        )}
        {t < 177.2 && <Enter at={168.3} x={540} y={1360} bouncy><Note text="il ne flotte pas dans le vide" size={52} /></Enter>}
        {t >= 177.2 && (
          <>
            <div style={{position: 'absolute', left: 600, top: 690, transform: `translate(-50%, -50%) scale(${zero})`, fontFamily: sansFont, fontWeight: 900, fontSize: 120, color: colors.green, display: 'flex', alignItems: 'center', gap: 20, opacity: prog(t, 180.4, 180.6)}}>
              RISQUE = 0
            </div>
            <Enter at={178.8} x={540} y={1360} bouncy><Pill label="Danger présent… mais pas de rencontre" icon="check" color={colors.green} size={32} /></Enter>
          </>
        )}
      </Win>
    </>
  );
};

const PAIRS = [
  {d: 'Un couteau', di: 'couteau', r: 'Se couper', ri: 'pansement', ad: 187.5, ar: 195.4},
  {d: 'Un feu allumé', di: 'feu', r: 'Se brûler', ri: 'chaud', ad: 188.3, ar: 196.06},
  {d: 'Des escaliers', di: 'echelle', r: 'Tomber', ri: 'effondre', ad: 189.2, ar: 196.8},
];

/** 182 – 208,4 s : objet vs conséquence. */
export const Comparaison: React.FC = () => {
  const t = useT();
  return (
    <>
      <Kinetic text="Une petite *comparaison*" at={182.05} until={197.8} y={420} size={82} maxWidth={1000} />
      <Kinetic text="L'objet ≠ *l'accident*" at={197.85} until={201.85} y={420} size={86} accent={AMBER} maxWidth={1000} />
      <Kinetic text="Séparer dans sa *tête*" at={201.9} until={208.3} y={420} size={86} maxWidth={1000} />

      <Win a={182.05} b={201.85}>
        <Enter at={185.1} x={290} y={660} from="left" dist={-300}>
          <div style={{width: 420, textAlign: 'center', background: RED, color: '#fff', borderRadius: 22, padding: '14px 0', fontFamily: sansFont, fontWeight: 900, fontSize: 46}}>DANGER<div style={{fontFamily: handFont, fontWeight: 400, fontSize: 36}}>statique, matériel</div></div>
        </Enter>
        <Enter at={191.2} x={790} y={660} from="right" dist={300}>
          <div style={{width: 420, textAlign: 'center', background: AMBER, color: '#fff', borderRadius: 22, padding: '14px 0', fontFamily: sansFont, fontWeight: 900, fontSize: 46}}>RISQUE<div style={{fontFamily: handFont, fontWeight: 400, fontSize: 36}}>conséquence humaine</div></div>
        </Enter>
        {PAIRS.map((p, i) => {
          const y = 880 + i * 200;
          const arrow = prog(t, p.ar - 0.3, p.ar + 0.2);
          return (
            <div key={p.d}>
              <Enter at={p.ad} x={290} y={y} from="left" dist={-300}>
                <div style={{width: 420, height: 170, display: 'flex', alignItems: 'center', gap: 18, background: '#fff', borderRadius: 28, padding: '0 22px', boxShadow: '0 12px 26px rgba(14,30,60,0.15)', borderLeft: `12px solid ${RED}`}}>
                  <F n={p.di} size={110} />
                  <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 36, color: colors.navy}}>{p.d}</div>
                </div>
              </Enter>
              <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
                <line x1={505} y1={y} x2={505 + 70 * arrow} y2={y} stroke={colors.navy} strokeWidth={8} strokeLinecap="round" opacity={arrow > 0.02 ? 1 : 0} />
                {arrow > 0.95 && <path d={`M${560} ${y - 16} L${578} ${y} L${560} ${y + 16}`} stroke={colors.navy} strokeWidth={8} fill="none" strokeLinecap="round" />}
              </svg>
              <Enter at={p.ar} x={790} y={y} from="right" dist={300}>
                <div style={{width: 420, height: 170, display: 'flex', alignItems: 'center', gap: 18, background: '#fff', borderRadius: 28, padding: '0 22px', boxShadow: '0 12px 26px rgba(14,30,60,0.15)', borderLeft: `12px solid ${AMBER}`}}>
                  <F n={p.ri} size={110} />
                  <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 36, color: colors.navy}}>{p.r}</div>
                </div>
              </Enter>
            </div>
          );
        })}
        <Enter at={198.0} x={290} y={1490} bouncy><Note text="= l'objet" color={RED} size={56} /></Enter>
        <Enter at={199.6} x={790} y={1490} bouncy><Note text="= l'accident potentiel" color={AMBER} size={50} /></Enter>
      </Win>

      <Win a={201.9} b={208.3}>
        <Enter at={202.1} x={540} y={940} bouncy><F n="cerveau" size={340} /></Enter>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <line x1={540} y1={720} x2={540} y2={720 + 460 * prog(t, 202.6, 203.4, easeInOut)} stroke={colors.navy} strokeWidth={10} strokeDasharray="22 16" strokeLinecap="round" />
        </svg>
        <Enter at={202.9} x={250} y={1240} from="left" dist={-200}><Pill label="Objet" icon="couteau" color={RED} size={36} /></Enter>
        <Enter at={203.6} x={830} y={1240} from="right" dist={200}><Pill label="Conséquence" icon="pansement" color={AMBER} size={36} /></Enter>
        <Enter at={205.3} x={540} y={1410} bouncy><Note text="une gymnastique indispensable" size={54} /></Enter>
      </Win>
    </>
  );
};

/** 208,4 – 237,6 s : la falaise et la rambarde. */
export const Falaise: React.FC = () => {
  const t = useT();
  const rail = prog(t, 221.3, 223.4, easeOut);
  const fall = t < 221.3 ? prog(t, 217.6, 219.2, easeInOut) : 0;
  const prob = kf(t, [224.7, 227.6], [0.82, 0.03]);
  const stamp = prog(t, 228.3, 228.6, easeOut);
  const walkX = kf(t, [213.8, 216.6], [180, 470]);
  return (
    <>
      <Kinetic text="L'exemple de la *falaise*" at={208.4} until={219.4} y={420} size={82} maxWidth={1000} />
      <Kinetic text="On ajoute une *rambarde*" at={219.45} until={229.2} y={420} size={82} accent={colors.green} maxWidth={1000} />
      <Kinetic text="La falaise n'a *pas bougé*" at={229.25} until={237.5} y={420} size={80} accent={RED} maxWidth={1000} />

      <Win a={208.4} b={237.5}>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#CFE3F2" /><stop offset="1" stopColor="#F1EDE3" /></linearGradient>
            <linearGradient id="rock" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#9C8B73" /><stop offset="1" stopColor="#6F604C" /></linearGradient>
          </defs>
          <g opacity={prog(t, 208.6, 209.2)}>
            <rect x={40} y={620} width={1000} height={880} rx={36} fill="url(#sky)" />
            <path d="M40 980 L600 980 L620 1040 L600 1110 L640 1190 L610 1290 L650 1380 L640 1500 L40 1500 Z" fill="url(#rock)" />
            <rect x={40} y={958} width={562} height={26} fill="#6FA35A" />
            <path d="M640 1500 Q 840 1440 1040 1470 L1040 1500 Z" fill="#5C8FB5" opacity={0.6} />
          </g>
          {/* trajectoire de chute */}
          {fall > 0 && <path d="M560 880 Q 720 880 760 1380" stroke={RED} strokeWidth={8} strokeDasharray="20 14" fill="none" pathLength={1} strokeDashoffset={0} opacity={fall} />}
          {/* rambarde */}
          <g opacity={rail > 0 ? 1 : 0}>
            {[0, 1, 2, 3].map((k) => (
              <rect key={k} x={430 + k * 52} y={960 - 150 * prog(t, 221.3 + k * 0.15, 221.8 + k * 0.15)} width={14} height={150 * prog(t, 221.3 + k * 0.15, 221.8 + k * 0.15)} fill={colors.green} rx={4} />
            ))}
            <rect x={425} y={812} width={180 * rail} height={16} rx={8} fill={colors.green} />
            <rect x={425} y={880} width={180 * rail} height={12} rx={6} fill={colors.green} />
          </g>
        </svg>
        <div style={{position: 'absolute', left: walkX, top: 880, transform: 'translate(-50%, -50%)', opacity: prog(t, 213.6, 214.0)}}>
          <F n="ouvrier" size={170} />
        </div>
        <Enter at={213.0} x={820} y={720} bouncy><Pill label="DANGER : ultra dangereux" icon="danger" color={RED} size={28} /></Enter>
        {t < 221.3 && <Enter at={217.6} x={860} y={1180} bouncy><Note text="risque : chute" color={RED} size={52} /></Enter>}
        {t >= 222.4 && t < 229.2 && <PhotoCard src="epi/garde-corps.jpg" at={222.4} until={229.2} x={830} y={1230} w={360} h={300} rotate={4} from="right" />}
        {t >= 224.6 && (
          <Enter at={224.6} x={540} y={1560} from="down" dist={160}>
            <div style={{background: '#fff', borderRadius: 26, padding: '22px 30px', boxShadow: '0 14px 28px rgba(14,30,60,0.18)'}}><Gauge v={prob} label="Probabilité de chute" w={760} /></div>
          </Enter>
        )}
        {t >= 228.3 && <div style={{position: 'absolute', left: 300, top: 1240, transform: 'translate(-50%, -50%)'}}><Stamp text="RISQUE ÉLIMINÉ" p={stamp} size={50} /></div>}
        <Highlight at={230.2} until={237.5} x={420} y={1240} r={190} color={RED} label="toujours dangereuse" />
      </Win>
    </>
  );
};

const FAMILIES = [
  {at: 242.6, icon: 'pas', l: 'Activité physique', s: 'faux mouvements, tendinites', c: '#2E86C1'},
  {at: 246.3, icon: 'eclair', l: 'Phénomènes physiques', s: 'électricité, chaleur extrême', c: AMBER},
  {at: 249.2, icon: 'eprouvette', l: 'Produits chimiques', s: 'détergents, particules fines', c: '#8E44AD'},
  {at: 252.8, icon: 'outils', l: 'Outils et machines', s: 'écrasement, coupure', c: colors.navy},
  {at: 255.5, icon: 'anxieux', l: 'Situations de travail', s: 'travail isolé, stress, burn-out', c: RED},
];

/** 237,6 – 265,9 s : les grandes familles de risques. */
export const Familles: React.FC = () => {
  const t = useT();
  return (
    <>
      <Kinetic text="Les familles de *risques*" at={237.65} until={261.65} y={420} size={82} accent={AMBER} maxWidth={1000} />
      <Kinetic text="Bureau ou *chantier* ?" at={261.7} until={265.8} y={420} size={86} maxWidth={1000} />
      <Win a={237.65} b={261.65}>
        <Enter at={238.6} x={540} y={600} bouncy><Note text="des rencontres aux mille formes" size={54} /></Enter>
        {FAMILIES.map((f, i) => (
          <Row key={f.l} at={f.at} y={760 + i * 160} icon={f.icon} label={f.l} sub={f.s} color={f.c} w={940} active={t < f.at + 3.6 || i === FAMILIES.length - 1 ? true : t > 258.5} />
        ))}
      </Win>
      <Win a={261.7} b={265.8}>
        <PhotoCard src="integration/responsable.jpg" at={261.9} x={290} y={980} w={460} h={560} rotate={-3} label="Bureau" icon="homme-bureau" from="left" />
        <PhotoCard src="epi/chantier.jpg" at={262.6} x={790} y={980} w={460} h={560} rotate={3} label="Chantier" icon="casque" from="right" />
        <Enter at={263.6} x={540} y={1390} bouncy><Pill label="Des priorités différentes" icon="cible" color={AMBER} size={34} /></Enter>
      </Win>
    </>
  );
};


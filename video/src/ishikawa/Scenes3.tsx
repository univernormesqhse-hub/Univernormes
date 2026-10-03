import {easeInOut, easeOut, Enter, kf, Kinetic, prog, useT} from '../anim';
import {RED, Strike} from '../charte/ui';
import {Note, Op, Quote, Stamp, Win} from '../danger2/ui';
import {F, Pill} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';
import {FIVE_M} from './Scenes2';
import {Fishbone, M_COLORS, TEAL} from './ui';

const QUOTE: [string, number, boolean?][] = [
  ['Le', 318.38], ['but', 318.6], ['du', 318.9], ['lean', 319.24, true], ['est', 319.6], ['la', 319.8], ['juste', 320.0, true], ['utilisation', 320.3, true], ['des', 320.76], ['ressources.', 321.0, true],
];

const THREE_M = [
  {n: 'Muda', s: 'gaspillage', d: 'stocks qui dorment, transports inutiles, attentes', icon: 'poubelle', at: 348.6, c: RED},
  {n: 'Muri', s: 'surcharge', d: 'équipes ou machines poussées à bout', icon: 'anxieux', at: 355.0, c: '#F2A33A'},
  {n: 'Mura', s: 'irrégularité', d: 'le stop-and-go permanent', icon: 'graphique', at: 360.4, c: '#7B5CD6'},
];

const KEYS = [
  {l: 'Impliquer tout le monde', s: 'du patron à l’opérateur', icon: 'equipe', at: 387.1},
  {l: 'Des faits', s: 'pas des opinions', icon: 'loupe2', at: 390.6},
  {l: 'Des indicateurs clairs', s: 'suivre les améliorations', icon: 'graphique', at: 393.2},
  {l: 'Former', s: 'former, encore former', icon: 'formatrice', at: 395.5},
];

/** 307,5 – 398,9 s : la vision lean. */
export const Lean: React.FC = () => {
  const t = useT();
  const tilt = kf(t, [331.5, 333.2, 334.1, 335.6, 336.8], [0, -14, -14, 14, 0]);
  return (
    <>
      <Kinetic text="Une pièce *maîtresse*" at={307.5} until={318.3} y={420} size={86} accent={TEAL} maxWidth={1000} />
      <Kinetic text="La juste *utilisation*" at={318.35} until={340.4} y={420} size={86} accent={TEAL} maxWidth={1000} />
      <Kinetic text="Les *3M* japonais" at={340.45} until={367.25} y={420} size={92} accent={RED} />
      <Kinetic text="Un outil lean par *excellence*" at={367.3} until={381.6} y={420} size={76} accent={TEAL} maxWidth={1000} />
      <Kinetic text="*4* clés du succès" at={381.65} until={398.85} y={420} size={92} accent={TEAL} />

      <Win a={307.5} b={318.3}>
        <Enter at={307.8} x={330} y={900} bouncy><F n="boite-outils" size={240} /></Enter>
        <Enter at={309.6} x={330} y={1130} bouncy>
          <div style={{position: 'relative', fontFamily: handFont, fontSize: 46, color: RED}}>
            un outil de temps en temps
            <div style={{position: 'absolute', left: -6, right: -6, top: '50%'}}><Strike p={prog(t, 311.0, 311.5)} w={480} /></div>
          </div>
        </Enter>
        <Enter at={312.6} x={780} y={900} bouncy><F n="puzzle" size={240} /></Enter>
        <Enter at={316.6} x={540} y={1380} bouncy>
          <div style={{background: TEAL, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 56, padding: '16px 40px', borderRadius: 22, boxShadow: '0 14px 30px rgba(31,184,154,0.4)'}}>LEAN MANAGEMENT</div>
        </Enter>
      </Win>

      <Win a={318.35} b={340.4}>
        {t < 328.8 && (
          <>
            <Enter at={318.5} until={328.8} x={540} y={820} from="up" dist={200}><Quote source="LA PHILOSOPHIE LEAN" words={QUOTE} color={TEAL} w={940} /></Enter>
            {t > 325.0 && (
              <div style={{position: 'absolute', left: 540, top: 1200, transform: 'translate(-50%, -50%)'}}>
                <div style={{position: 'relative', fontFamily: handFont, fontSize: 54, color: RED, opacity: prog(t, 325.0, 325.4)}}>
                  plus avec moins… jusqu'à l'épuisement
                  <div style={{position: 'absolute', left: -6, right: -6, top: '50%'}}><Strike p={prog(t, 328.2, 328.7)} w={760} /></div>
                </div>
              </div>
            )}
          </>
        )}
        {t >= 328.8 && (
          <>
            <div style={{position: 'absolute', left: 540, top: 1000, transform: 'translate(-50%, -50%)'}}>
              <svg width={800} height={500} style={{overflow: 'visible'}}>
                <polygon points="400,470 360,500 440,500" fill={colors.navy} />
                <rect x={392} y={150} width={16} height={330} fill={colors.navy} rx={6} />
                <g transform={`rotate(${tilt} 400 150)`}>
                  <rect x={60} y={140} width={680} height={20} rx={10} fill={colors.navy} />
                  <line x1={110} y1={150} x2={110} y2={260} stroke={colors.navy} strokeWidth={4} />
                  <line x1={690} y1={150} x2={690} y2={260} stroke={colors.navy} strokeWidth={4} />
                  <path d="M20 260 Q 110 330 200 260 Z" fill={RED} opacity={0.85} />
                  <path d="M600 260 Q 690 330 780 260 Z" fill="#F2A33A" opacity={0.85} />
                </g>
              </svg>
            </div>
            <Enter at={331.5} x={210} y={1290} bouncy><Pill label="Trop : gaspillage" icon="poubelle" color={RED} size={28} /></Enter>
            <Enter at={333.3} x={850} y={1290} bouncy><Pill label="Trop peu : surcharge" icon="anxieux" color="#F2A33A" size={28} /></Enter>
            <Enter at={336.6} x={540} y={700} bouncy><Pill label="La valeur attendue par le client" icon="cible" color={TEAL} size={32} /></Enter>
            {t > 338.6 && <div style={{position: 'absolute', left: 540, top: 1460, transform: 'translate(-50%, -50%)'}}><Stamp text="ÉQUILIBRE" p={prog(t, 338.6, 338.9)} color={TEAL} size={56} /></div>}
          </>
        )}
      </Win>

      <Win a={340.45} b={367.25}>
        <Enter at={341.0} x={540} y={620} bouncy><Pill label="La chasse au gaspillage" icon="loupe2" color={TEAL} size={32} /></Enter>
        {THREE_M.map((m, i) => {
          const elim = prog(t, 365.4 + i * 0.25, 365.9 + i * 0.25);
          return (
            <Enter key={m.n} at={m.at} x={540} y={800 + i * 230} from="left" dist={-300}>
              <div style={{position: 'relative', width: 920, display: 'flex', alignItems: 'center', gap: 24, background: '#fff', borderRadius: 30, padding: '20px 28px', boxShadow: '0 14px 30px rgba(14,30,60,0.15)', borderLeft: `16px solid ${m.c}`, opacity: 1 - 0.45 * elim}}>
                <F n={m.icon} size={110} />
                <div>
                  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: m.c, lineHeight: 1}}>{m.n} <span style={{fontSize: 34, color: colors.navy}}>· {m.s}</span></div>
                  <div style={{fontFamily: handFont, fontSize: 36, color: colors.navy, marginTop: 6}}>{m.d}</div>
                </div>
                {elim > 0 && <div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={elim} w={900} /></div>}
              </div>
            </Enter>
          );
        })}
      </Win>

      <Win a={367.3} b={381.6}>
        {[
          ['yeux', 'Visuel', 371.3],
          ['equipe', 'Collaboratif', 372.3],
          ['engrenage', 'Analyse le système', 375.0],
        ].map(([ic, l, at], i) => (
          <Enter key={l} at={at as number} x={200 + i * 340} y={860} bouncy>
            <div style={{width: 300, height: 300, borderRadius: 40, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 14px 30px rgba(14,30,60,0.16)', borderBottom: `10px solid ${M_COLORS[i + 5]}`}}>
              <F n={ic as string} size={140} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: colors.navy, textAlign: 'center'}}>{l}</div>
            </div>
          </Enter>
        ))}
        <Enter at={378.8} x={290} y={1230} from="left" dist={-200}>
          <div style={{background: TEAL, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40, padding: '14px 28px', borderRadius: 20}}>LE PROCESSUS</div>
        </Enter>
        <Enter at={380.5} x={540} y={1230} bouncy><Op c="≠" color={colors.navy} size={80} /></Enter>
        <Enter at={380.7} x={800} y={1230} from="right" dist={200}>
          <div style={{position: 'relative', background: '#fff', color: RED, fontFamily: sansFont, fontWeight: 900, fontSize: 40, padding: '14px 28px', borderRadius: 20}}>
            LES GENS
          </div>
        </Enter>
      </Win>

      <Win a={381.65} b={398.85}>
        <Enter at={382.4} x={540} y={620} bouncy><Note text="un outil seul ne suffit pas : une culture" size={50} /></Enter>
        {KEYS.map((k, i) => (
          <Enter key={k.l} at={k.at} x={540} y={790 + i * 185} from="left" dist={-280}>
            <div style={{width: 920, display: 'flex', alignItems: 'center', gap: 22, background: '#fff', borderRadius: 28, padding: '16px 26px', boxShadow: '0 12px 26px rgba(14,30,60,0.14)', borderLeft: `14px solid ${M_COLORS[i]}`}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 58, color: M_COLORS[i], width: 46}}>{i + 1}</div>
              <F n={k.icon} size={90} />
              <div>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: colors.navy}}>{k.l}</div>
                <div style={{fontFamily: handFont, fontSize: 34, color: '#5B6675'}}>{k.s}</div>
              </div>
            </div>
          </Enter>
        ))}
      </Win>
    </>
  );
};

/** 398,9 s – outro : une façon de penser, au tableau ! */
export const Conclusion: React.FC<{end: number}> = ({end}) => {
  const t = useT();
  const morph = prog(t, 414.2, 415.4, easeInOut);
  return (
    <>
      <Kinetic text="Une façon de *penser*" at={398.9} until={415.75} y={420} size={88} accent={TEAL} maxWidth={1000} />
      <Kinetic text="À vous de *jouer* !" at={415.8} until={429.6} y={420} size={92} accent={TEAL} />
      <Kinetic text="Quel premier *mystère* ?" at={429.65} until={end} y={420} size={84} accent={TEAL} maxWidth={1000} />

      <Win a={398.9} b={415.75}>
        <Enter at={401.3} x={540} y={820} bouncy><F n="cerveau" size={280} float={6} /></Enter>
        {t > 402.3 && (
          <div style={{position: 'absolute', left: 540, top: 1080, transform: 'translate(-50%, -50%)'}}>
            <div style={{position: 'relative', fontFamily: handFont, fontSize: 50, color: RED, opacity: prog(t, 402.3, 402.7)}}>
              un simple dessin au tableau
              <div style={{position: 'absolute', left: -6, right: -6, top: '50%'}}><Strike p={prog(t, 403.4, 403.9)} w={560} /></div>
            </div>
          </div>
        )}
        <Enter at={410.9} x={540} y={1210} bouncy><Pill label="Le problème = une opportunité" icon="ampoule" color={TEAL} size={34} /></Enter>
        {t > 413.4 && (
          <div style={{position: 'absolute', left: 540, top: 1420, transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', gap: 26}}>
            <div style={{opacity: 1 - 0.6 * morph}}><F n="bug" size={120} /></div>
            <Op c="→" size={80} color={TEAL} />
            <div style={{transform: `scale(${0.4 + 0.6 * morph})`, opacity: morph}}><F n="graphique" size={130} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: TEAL, opacity: morph}}>PROGRÈS</div>
          </div>
        )}
      </Win>

      <Win a={415.8} b={429.6}>
        <Enter at={416.0} x={540} y={1000} from="scale">
          <div style={{width: 1000, height: 760, borderRadius: 24, background: '#FDFDFB', border: '18px solid #B9C0C8', boxShadow: '0 20px 40px rgba(0,0,0,0.2)'}} />
        </Enter>
        {t > 419.3 && (
          <Enter at={419.3} until={423.1} x={540} y={1000} bouncy>
            <div style={{position: 'relative', fontFamily: handFont, fontSize: 58, color: RED}}>
              chercher un responsable
              <div style={{position: 'absolute', left: -6, right: -6, top: '50%'}}><Strike p={prog(t, 420.6, 421.1)} w={520} /></div>
            </div>
          </Enter>
        )}
        {t > 424.0 && <Fishbone at={425.0} headAt={425.6} head="PROBLÈME" y={1000} scale={0.88} branches={FIVE_M.map((m, i) => ({label: m.name, at: 426.7 + i * 0.28}))} />}
        <Enter at={423.4} x={900} y={1330} bouncy rotate={-30}><F n="feutre" size={120} /></Enter>
        <Enter at={428.9} x={540} y={1480} bouncy><Pill label="Lancer l'enquête collective" icon="equipe" color={TEAL} size={34} /></Enter>
      </Win>

      <Win a={429.65} b={end + 0.3}>
        <Enter at={429.9} x={540} y={950} bouncy><F n="detective" size={340} float={8} /></Enter>
        <Enter at={431.6} x={820} y={760} bouncy rotate={-14}><F n="loupe2" size={180} /></Enter>
        <Enter at={432.3} x={540} y={1300} bouncy><Note text="à vous d'élucider le premier !" color={TEAL} size={58} /></Enter>
      </Win>
    </>
  );
};


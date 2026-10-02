import {interpolate} from 'remotion';
import {easeIn, easeOut, Enter, Kinetic, prog, useSpring, useT} from '../anim';
import {PhotoCard, RED, Strike, Verdict} from '../charte/ui';
import {F, Pill} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';
import {BLUE, fade, IconCard} from './Scenes1';

/** 163,1 – 193,6 s : l'exemple du sous-traitant et du travail à chaud. */
export const Exemple: React.FC = () => {
  const t = useT();
  const out = prog(t, 193.3, 193.6, easeIn);
  const intro = t < 177.0;
  const list = t >= 177.0 && t < 190.2;
  const saved = t >= 190.2;
  const heat = prog(t, 171.7, 172.6) * (1 - prog(t, 176.6, 177.0));
  const items = [
    {at: 184.1, n: 'feu', l: "Risques d'incendie", s: 'liés à son intervention'},
    {at: 186.5, n: 'gyrophare', l: "Donner l'alerte", s: 'en cas de problème'},
    {at: 188.6, n: 'memo', l: 'Permis de travail', s: 'spécifique'},
  ];
  const permit = useSpring(189.0, {damping: 9});
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Un exemple *concret*" at={163.15} until={167.25} y={420} size={86} maxWidth={1000} />
      <Kinetic text="Un sous-traitant *soudeur*" at={167.3} until={171.65} y={420} size={76} maxWidth={1000} />
      <Kinetic text="Un travail à *chaud*" at={171.7} until={176.95} y={420} size={90} accent={RED} />
      <Kinetic text="Grâce à l'*induction*" at={177.0} until={190.15} y={420} size={86} maxWidth={1000} />
      <Kinetic text="Une catastrophe *évitée*" at={190.2} until={193.5} y={420} size={80} maxWidth={1000} />

      {intro && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 163.1, 177.0)}}>
          {t < 167.3 ? (
            <Enter at={163.2} x={540} y={1000} bouncy><F n="ampoule" size={300} float={8} /></Enter>
          ) : (
            <>
              <PhotoCard src="epi/soudeur.jpg" at={167.35} x={540} y={940} w={940} h={760} pos="35% 40%" label="Travaux de soudure" icon="outils">
                <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 45% 40%, rgba(255,140,40,${0.45 * heat}), transparent 55%)`}} />
              </PhotoCard>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                const p = ((t - 171.8) * 1.4 + i / 8) % 1;
                return t > 171.8 && t < 177 ? <div key={i} style={{position: 'absolute', left: 470 + Math.cos(i * 2.1) * p * 200, top: 840 + Math.sin(i * 1.7) * p * 160 + p * p * 120, width: 10, height: 10, borderRadius: 5, background: '#FFB13B', boxShadow: '0 0 12px #FF8A00', opacity: (1 - p) * heat}} /> : null;
              })}
              <Enter at={171.8} x={820} y={620} bouncy><F n="feu" size={170} float={6} /></Enter>
              <Enter at={175.4} x={540} y={1420} bouncy><Pill label="Risque élevé" icon="danger" color={RED} size={40} /></Enter>
            </>
          )}
        </div>
      )}
      {list && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 177.0, 190.2)}}>
          <Enter at={177.1} until={184.0} x={540} y={980} bouncy>
            <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
              <F n="diplome" size={220} />
              <div style={{fontFamily: handFont, fontSize: 90, color: colors.navy}}>→</div>
              <F n="ouvrier" size={240} />
            </div>
          </Enter>
          <Enter at={179.2} until={184.0} x={540} y={1340} bouncy><Pill label="Avant de brancher son poste" icon="eclair" color={colors.ochre} size={34} /></Enter>
          {items.map((it, i) => (
            <Enter key={it.l} at={it.at} x={540} y={700 + i * 260} from="left" dist={-300}>
              <div style={{width: 920, display: 'flex', alignItems: 'center', gap: 24, background: '#fff', borderRadius: 30, padding: '22px 26px', boxShadow: '0 14px 30px rgba(30,25,10,0.15)', borderLeft: `14px solid ${i === 2 ? colors.green : RED}`}}>
                <F n={it.n} size={100} />
                <div style={{fontFamily: sansFont}}>
                  <div style={{fontWeight: 900, fontSize: 46, color: colors.navy}}>{it.l}</div>
                  <div style={{fontWeight: 600, fontSize: 30, color: '#5B6675'}}>{it.s}</div>
                </div>
                <div style={{marginLeft: 'auto', transform: `scale(${prog(t, it.at + 0.4, it.at + 0.7)})`}}><Verdict ok size={80} /></div>
              </div>
            </Enter>
          ))}
          {t > 189.0 && (
            <div style={{position: 'absolute', left: 860, top: 1270, transform: `translate(-50%, -50%) rotate(-12deg) scale(${interpolate(permit, [0, 1], [2.2, 1])})`, opacity: Math.min(1, permit * 2), border: `8px solid ${colors.green}`, borderRadius: 16, padding: '6px 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: colors.green, background: 'rgba(255,255,255,0.9)'}}>VALIDÉ</div>
          )}
        </div>
      )}
      {saved && (
        <>
          <Enter at={190.3} x={540} y={1000} bouncy>
            <div style={{width: 440, height: 440, borderRadius: '50%', background: colors.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 24px rgba(46,155,62,0.18), 0 22px 44px rgba(46,155,62,0.35)'}}>
              <F n="bouclier" size={260} />
            </div>
          </Enter>
          <Enter at={190.9} x={200} y={760} bouncy><div style={{filter: 'grayscale(1)', opacity: 0.6, position: 'relative'}}><F n="feu" size={140} /><div style={{position: 'absolute', left: -10, right: -10, top: '50%'}}><Strike p={prog(t, 191.2, 191.6)} w={140} /></div></div></Enter>
          <Enter at={192.0} x={540} y={1440} bouncy><Pill label="L'information qui sauve" icon="check" size={38} /></Enter>
        </>
      )}
    </div>
  );
};

/** Badge de certification ISO (dessiné). */
const IsoSeal: React.FC<{num: string; label: string; color: string}> = ({num, label, color}) => (
  <div style={{width: 400, height: 400, borderRadius: '50%', background: '#fff', border: `14px solid ${color}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 18px 36px rgba(14,42,92,0.2)'}}>
    <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 44, color: '#5B6675', letterSpacing: 4}}>ISO</div>
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 96, color, lineHeight: 1}}>{num}</div>
    <div style={{width: 200, height: 6, borderRadius: 3, background: color, margin: '14px 0'}} />
    <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: colors.navy, textAlign: 'center', lineHeight: 1.15, whiteSpace: 'pre-line', padding: '0 30px'}}>{label}</div>
  </div>
);

/** 198,4 – 240,8 s : pilier de la culture, impact triple et normes ISO. */
export const Impact: React.FC = () => {
  const t = useT();
  const out = prog(t, 240.5, 240.8, easeIn);
  const pilier = t < 205.4;
  const triple = t >= 205.4 && t < 226.4;
  const iso = t >= 226.4;
  const tick = prog(t, 199.9, 200.5);
  const strike = prog(t, 201.3, 201.9, easeOut);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Pas une simple *case à cocher*" at={198.45} until={202.35} y={420} size={70} maxWidth={1000} accent={RED} />
      <Kinetic text="Un *pilier* de la culture" at={202.4} until={205.35} y={420} size={80} maxWidth={1000} />
      <Kinetic text="Un impact *triple*" at={205.4} until={226.35} y={420} size={96} />
      <Kinetic text="Les normes *internationales*" at={226.4} until={240.7} y={420} size={70} maxWidth={1000} />

      {pilier && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 198.4, 205.4)}}>
          {t < 202.4 ? (
            <Enter at={198.5} x={540} y={1000} bouncy>
              <div style={{position: 'relative', width: 760, borderRadius: 30, background: '#fff', padding: '30px 36px', boxShadow: '0 16px 34px rgba(30,25,10,0.15)'}}>
                {['Procédure administrative', 'Liste à cocher', 'Formalité'].map((l, i) => (
                  <div key={l} style={{display: 'flex', alignItems: 'center', gap: 20, marginBottom: 22, fontFamily: sansFont, fontWeight: 800, fontSize: 40, color: '#8A94A3'}}>
                    <div style={{width: 54, height: 54, borderRadius: 10, border: '5px solid #B9C1CC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8A94A3', fontSize: 40}}>{tick > (i + 1) / 3 ? '✓' : ''}</div>
                    {l}
                  </div>
                ))}
                <div style={{position: 'absolute', left: 20, right: 20, top: '50%'}}><Strike p={strike} w={700} /></div>
              </div>
            </Enter>
          ) : (
            <>
              <Enter at={202.45} x={540} y={1000} bouncy><F n="temple" size={340} /></Enter>
              <Enter at={203.4} x={540} y={1360} bouncy><Pill label="Culture d'entreprise" icon="equipe" size={40} /></Enter>
            </>
          )}
        </div>
      )}
      {triple && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 205.4, 226.4)}}>
          {t < 210.2 && <Enter at={205.5} x={540} y={1000} bouncy><F n="question" size={260} float={6} /></Enter>}
          {[
            {at: 210.2, n: 'graphique', l: "Moins d'accidents", s: 'le plus évident', c: BLUE},
            {at: 213.9, n: 'equipe', l: 'Culture de sécurité', s: 'dès le premier jour', c: colors.green},
            {at: 220.3, n: 'juge', l: 'Conformité légale', s: "l'entreprise est en règle", c: colors.navy},
          ].map((r, i) => (
            <Enter key={r.l} at={r.at} x={540} y={700 + i * 300} from="right" dist={300}>
              <div style={{width: 940, height: 250, display: 'flex', alignItems: 'center', gap: 26, background: '#fff', borderRadius: 34, padding: '0 30px', boxShadow: '0 14px 30px rgba(30,25,10,0.15)', borderLeft: `16px solid ${r.c}`}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: r.c, width: 80}}>{i + 1}</div>
                <F n={r.n} size={120} />
                <div style={{fontFamily: sansFont}}>
                  <div style={{fontWeight: 900, fontSize: 46, color: colors.navy}}>{r.l}</div>
                  <div style={{fontWeight: 600, fontSize: 30, color: '#5B6675'}}>{r.s}</div>
                </div>
              </div>
            </Enter>
          ))}
          {t > 223.6 && <Enter at={223.7} x={540} y={1620} bouncy><Pill label="Ce n'est pas rien !" icon="etoile" size={34} /></Enter>}
        </div>
      )}
      {iso && (
        <>
          <Enter at={226.5} until={231.6} x={540} y={1000} bouncy><F n="globe" size={300} float={8} /></Enter>
          <Enter at={231.7} x={300} y={1000} from="left" dist={-500}><IsoSeal num="45001" label={'Santé & sécurité\nau travail'} color={BLUE} /></Enter>
          <Enter at={234.8} x={780} y={1000} from="right" dist={500}><IsoSeal num="14001" label="Management environnemental" color={colors.green} /></Enter>
          <Enter at={237.9} x={540} y={1440} bouncy><Pill label="Un gage de sérieux mondial" icon="medaille" size={38} /></Enter>
        </>
      )}
    </div>
  );
};

/** 240,8 – 257,8 s : illusion vs réalité. */
export const Idees: React.FC = () => {
  const t = useT();
  const out = prog(t, 257.5, 257.8, easeIn);
  const rows = [
    {at: 244.4, bad: 'Une simple formalité', good: 'Réduit les accidents', rAt: 247.1, nb: 'memo', ng: 'graphique'},
    {at: 249.9, bad: 'Une perte de temps', good: 'Un investissement', rAt: 251.4, nb: 'sablier', ng: 'pousse'},
  ];
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Dépasser les *idées reçues*" at={240.85} until={257.7} y={420} size={74} maxWidth={1000} />
      <div style={{position: 'absolute', left: 60, top: 560, width: 960, display: 'flex', gap: 20, opacity: prog(t, 241.2, 241.7)}}>
        <div style={{flex: 1, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#8A94A3', letterSpacing: 3}}>ILLUSION</div>
        <div style={{flex: 1, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: colors.green, letterSpacing: 3}}>RÉALITÉ</div>
      </div>
      {rows.map((r, i) => (
        <div key={r.bad}>
          <Enter at={r.at} x={300} y={820 + i * 420} from="left" dist={-300}>
            <div style={{position: 'relative', width: 450, height: 340, borderRadius: 34, background: '#ECEEF1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, filter: `grayscale(${prog(t, r.rAt, r.rAt + 0.5)})`}}>
              <F n={r.nb} size={130} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: '#5B6675', textAlign: 'center', padding: '0 20px'}}>{r.bad}</div>
              <div style={{position: 'absolute', right: -20, top: -20}}><Verdict ok={false} size={80} /></div>
              <div style={{position: 'absolute', left: 30, right: 30, top: '72%'}}><Strike p={prog(t, r.rAt - 0.4, r.rAt)} w={390} /></div>
            </div>
          </Enter>
          <Enter at={r.rAt} x={780} y={820 + i * 420} from="right" dist={300}>
            <div style={{position: 'relative', width: 450, height: 340, borderRadius: 34, background: BLUE, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, boxShadow: '0 18px 36px rgba(47,111,228,0.35)'}}>
              <F n={r.ng} size={130} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: '#fff', textAlign: 'center', padding: '0 20px'}}>{r.good}</div>
              <div style={{position: 'absolute', right: -20, top: -20}}><Verdict ok size={80} /></div>
            </div>
          </Enter>
        </div>
      ))}
      <Enter at={255.8} x={540} y={1600} bouncy><Pill label="Renforce la culture de sécurité" icon="bouclier" size={34} /></Enter>
    </div>
  );
};

/** 257,8 – 280 s : définition finale, se protéger / les autres / la planète, question. */
export const Final: React.FC = () => {
  const t = useT();
  const out = prog(t, 279.7, 280.0, easeIn);
  const quote = t < 268.7;
  const three = t >= 268.7 && t < 273.9;
  const ask = t >= 273.9;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Simple mais *puissant*" at={257.85} until={268.65} y={420} size={86} maxWidth={1000} />
      <Kinetic text="Les *clés* pour protéger" at={268.7} until={273.85} y={420} size={82} maxWidth={1000} />
      <Kinetic text="Le *premier pas*, avec sérieux" at={273.9} until={279.9} y={420} size={70} maxWidth={1000} />

      {quote && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 257.8, 268.7)}}>
          <Enter at={258.0} x={540} y={980} bouncy>
            <div style={{position: 'relative', width: 920, borderRadius: 40, background: '#fff', padding: '70px 54px 54px', boxShadow: '0 22px 44px rgba(30,25,10,0.18)', borderTop: `14px solid ${BLUE}`}}>
              <div style={{position: 'absolute', left: 30, top: -70, fontFamily: 'Georgia, serif', fontSize: 220, color: BLUE, lineHeight: 1}}>“</div>
              {[
                {at: 261.4, txt: <>L'induction HSE,</>},
                {at: 262.5, txt: <>c'est la formation d'accueil <span style={{color: RED}}>obligatoire</span></>},
                {at: 264.0, txt: <>qui informe <span style={{color: BLUE}}>toute personne</span></>},
                {at: 265.0, txt: <>des <span style={{color: colors.green}}>règles HSE</span>.</>},
              ].map((l, i) => (
                <div key={i} style={{fontFamily: sansFont, fontWeight: i === 0 ? 900 : 800, fontSize: i === 0 ? 64 : 52, color: colors.navy, lineHeight: 1.18, opacity: prog(t, l.at, l.at + 0.4), transform: `translateY(${(1 - prog(t, l.at, l.at + 0.4)) * 24}px)`}}>{l.txt}</div>
              ))}
            </div>
          </Enter>
          <Enter at={258.4} until={261.3} x={540} y={1450} bouncy><F n="cle" size={160} float={6} /></Enter>
          <Enter at={266.0} x={540} y={1460} bouncy><Pill label="Santé · Sécurité · Environnement" icon="bouclier" size={34} /></Enter>
        </div>
      )}
      {three && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 268.7, 273.9)}}>
          <Enter at={268.8} x={540} y={700} bouncy><F n="cle" size={180} float={6} /></Enter>
          {[
            {at: 270.2, n: 'ouvrier', l: 'Se protéger', x: 200},
            {at: 271.4, n: 'equipe', l: 'Protéger les autres', x: 540},
            {at: 272.0, n: 'planete', l: 'Protéger la planète', x: 880},
          ].map((c, i) => (
            <Enter key={c.l} at={c.at} x={c.x} y={1150} bouncy>
              <IconCard n={c.n} label={c.l} w={310} color={[BLUE, colors.navy, colors.green][i]} />
            </Enter>
          ))}
        </div>
      )}
      {ask && (
        <>
          <Enter at={273.95} x={540} y={980} bouncy>
            <div style={{width: 520, height: 520, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 20px rgba(47,111,228,0.12), 0 20px 40px rgba(14,42,92,0.18)'}}>
              <F n="pas" size={300} />
            </div>
          </Enter>
          <Enter at={275.9} x={820} y={720} bouncy rotate={Math.sin(t * 4) * 6}><F n="question" size={170} /></Enter>
          <Enter at={277.6} x={540} y={1440} bouncy><Pill label="Toujours avec le plus grand sérieux" icon="medaille" size={32} /></Enter>
        </>
      )}
    </div>
  );
};


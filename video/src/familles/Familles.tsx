import {AbsoluteFill, Audio, Img, staticFile} from 'remotion';
import {easeOut, Gate, Kinetic, prog, useT} from '../anim';
import {PhotoCard, RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Flash, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {Stamp} from '../danger2/ui';
import {F} from '../iso/ui';
import {BLUE, GOLD, PURPLE} from '../pieges/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, handFont, s, sansFont} from '../theme';
import {captions} from './captions';

const LOGO = 'promo/logo.png';
const RECAP = 120.6;
const OUTRO_AT = 122.6;
export const FAMILLES_FRAMES = s(126.0);

const GROUPS: Record<string, [string, string]> = {
  meca: ['Physiques & mécaniques', RED],
  energie: ['Énergies', '#E67E22'],
  chimbio: ['Chimiques & biologiques', PURPLE],
  ambiance: ['Ambiances physiques', BLUE],
  ergo: ['Ergonomie', '#1A9E8F'],
  equip: ['Équipements & circulation', GOLD],
  travaux: ['Travaux particuliers', '#34495E'],
  humain: ['Humain & organisation', colors.green],
};

type Fam = {n: number; at: number; tAt: number; title: string; spoken: string; g: string; img: string; icons: string[]; sfx: string};
const FAMS: Fam[] = [
  {n: 1, at: 0.0, tAt: 0.9, title: "Mécanique", spoken: "Risque mécanique", g: 'meca', img: 'ident/machine.jpg', icons: ["engrenage", "outils"], sfx: 'sfx/click'},
  {n: 2, at: 2.1, tAt: 3.36, title: "Coupure & perforation", spoken: "Risque de coupure et perforation", g: 'meca', img: '', icons: ["couteau", "ciseaux", "tournevis"], sfx: 'sfx/swish'},
  {n: 3, at: 5.22, tAt: 6.64, title: "Chute de hauteur", spoken: "Risque de chute de hauteur", g: 'meca', img: 'incident/chute-echelle.jpg', icons: ["echelle"], sfx: 'sfx/thud'},
  {n: 4, at: 8.38, tAt: 9.7, title: "Chute de plain-pied", spoken: "Risque de chute de plain-pied", g: 'meca', img: 'incident/chute-entrepot.jpg', icons: ["banane"], sfx: 'sfx/thud'},
  {n: 5, at: 11.12, tAt: 12.74, title: "Chute d'objets", spoken: "Risque de chute d'objets", g: 'meca', img: 'ident/caisses.jpg', icons: ["colis"], sfx: 'sfx/thud'},
  {n: 6, at: 14.26, tAt: 15.52, title: "Effondrement", spoken: "Risque d'effondrement", g: 'meca', img: '', icons: ["effondre", "brique", "grue2"], sfx: 'deep-hit'},
  {n: 7, at: 16.5, tAt: 18.08, title: "Électrique", spoken: "Risques électriques", g: 'energie', img: 'ident/electrique.jpg', icons: ["eclair", "prise"], sfx: 'sfx/click'},
  {n: 8, at: 19.38, tAt: 20.52, title: "Incendie", spoken: "Risque d'incendie", g: 'energie', img: 'promo/formation-incendie.jpg', icons: ["feu", "extincteur"], sfx: 'sfx/whoosh'},
  {n: 9, at: 21.68, tAt: 23.1, title: "Explosion", spoken: "Risque d'explosion", g: 'energie', img: '', icons: ["bombe", "collision", "feu"], sfx: 'bass-hit'},
  {n: 10, at: 24.12, tAt: 25.6, title: "Chimique", spoken: "Risque chimique", g: 'chimbio', img: 'danger2/bidon.png', icons: ["eprouvette"], sfx: 'sfx/pop'},
  {n: 11, at: 26.78, tAt: 27.94, title: "Poussières", spoken: "Risque lié aux poussières", g: 'chimbio', img: 'epi/masque.png', icons: ["vent"], sfx: 'soft-whoosh'},
  {n: 12, at: 29.48, tAt: 30.66, title: "Fumées & gaz", spoken: "Risque lié aux fumées et gaz", g: 'chimbio', img: 'confines/detecteur.jpg', icons: ["nausee"], sfx: 'soft-whoosh'},
  {n: 13, at: 32.24, tAt: 33.62, title: "Biologique", spoken: "Risque biologique", g: 'chimbio', img: 'iso26/labo-manuel.jpg', icons: ["microbe"], sfx: 'sfx/pop'},
  {n: 14, at: 34.74, tAt: 36.28, title: "Agents infectieux", spoken: "Risque lié aux agents infectieux", g: 'chimbio', img: '', icons: ["microbe", "seringue", "hopital"], sfx: 'sfx/pop'},
  {n: 15, at: 37.88, tAt: 39.18, title: "Bruit", spoken: "Risque lié au bruit", g: 'ambiance', img: 'induction/miroir.jpg', icons: ["haut-parleur"], sfx: 'sfx/ding'},
  {n: 16, at: 40.54, tAt: 41.74, title: "Vibrations", spoken: "Risque lié aux vibrations", g: 'ambiance', img: '', icons: ["vibration", "outils", "boulon"], sfx: 'deep-hit'},
  {n: 17, at: 43.12, tAt: 44.74, title: "Rayonnements ionisants", spoken: "Risque lié aux rayonnements ionisants", g: 'ambiance', img: '', icons: ["radioactif", "hopital"], sfx: 'tension'},
  {n: 18, at: 46.88, tAt: 48.0, title: "Rayonnements non ionisants", spoken: "Risque lié aux rayonnements non ionisants", g: 'ambiance', img: 'epi/soudeur.jpg', icons: ["soleil", "etincelles"], sfx: 'sfx/pop'},
  {n: 19, at: 50.4, tAt: 51.7, title: "Températures extrêmes", spoken: "Risque lié aux températures extrêmes", g: 'ambiance', img: '', icons: ["chaud", "froid", "thermometre"], sfx: 'sfx/pop'},
  {n: 20, at: 53.8, tAt: 54.78, title: "Éclairage", spoken: "Risque lié à l'éclairage", g: 'ambiance', img: 'ident/lampe.jpg', icons: ["ampoule"], sfx: 'sfx/click'},
  {n: 21, at: 56.42, tAt: 57.76, title: "Ambiances atmosphériques", spoken: "Risque lié aux ambiances atmosphériques", g: 'ambiance', img: 'confines/ventilation.jpg', icons: ["brouillard"], sfx: 'soft-whoosh'},
  {n: 22, at: 59.98, tAt: 61.24, title: "Manutentions manuelles", spoken: "Risque lié aux manutentions manuelles", g: 'ergo', img: 'zones/entrepot.jpg', icons: ["colis"], sfx: 'sfx/thud'},
  {n: 23, at: 63.58, tAt: 64.68, title: "Ergonomie", spoken: "Risque ergonomique", g: 'ergo', img: '', icons: ["ordinateur", "femme-bureau", "courbe-dos"], sfx: 'sfx/pop'},
  {n: 24, at: 66.22, tAt: 67.52, title: "Postures", spoken: "Risque lié aux postures", g: 'ergo', img: '', icons: ["courbe-dos", "fatigue"], sfx: 'sfx/pop'},
  {n: 25, at: 69.0, tAt: 70.3, title: "Gestes répétitifs", spoken: "Risque lié aux gestes répétitifs", g: 'ergo', img: '', icons: ["repeter", "chrono", "boulon"], sfx: 'tick'},
  {n: 26, at: 72.4, tAt: 73.56, title: "Équipements de travail", spoken: "Risque lié aux équipements de travail", g: 'equip', img: 'promo/hse-machine.jpg', icons: ["outils"], sfx: 'sfx/click'},
  {n: 27, at: 75.42, tAt: 76.86, title: "Engins de manutention", spoken: "Risque lié aux engins de manutention", g: 'equip', img: 'induction/marquage.jpg', icons: ["camion"], sfx: 'sfx/whoosh'},
  {n: 28, at: 78.94, tAt: 80.36, title: "Véhicules & circulation", spoken: "Risque lié aux véhicules et à la circulation", g: 'equip', img: 'ident/entrepot.jpg', icons: ["voiture", "sens-interdit"], sfx: 'sfx/whoosh'},
  {n: 29, at: 82.7, tAt: 84.2, title: "Risque routier", spoken: "Risque routier professionnel", g: 'equip', img: 'zones/accident-voiture.jpg', icons: ["route"], sfx: 'sfx/thud'},
  {n: 30, at: 85.56, tAt: 87.04, title: "Espaces confinés", spoken: "Risque lié aux espaces confinés", g: 'travaux', img: 'confines/regard.jpg', icons: ["detective"], sfx: 'deep-hit'},
  {n: 31, at: 88.96, tAt: 90.12, title: "Travail isolé", spoken: "Risque lié au travail isolé", g: 'travaux', img: 'promo/mine-terrain.jpg', icons: ["telephone"], sfx: 'notification'},
  {n: 32, at: 91.76, tAt: 93.04, title: "Travaux en hauteur", spoken: "Risque lié aux travaux en hauteur", g: 'travaux', img: 'tirant/harnais-dos.jpg', icons: ["echelle"], sfx: 'sfx/whoosh'},
  {n: 33, at: 94.72, tAt: 96.22, title: "Terrassement", spoken: "Risque lié aux travaux de terrassement", g: 'travaux', img: 'risquebrut/chantier.jpg', icons: ["pelle", "grue2"], sfx: 'deep-hit'},
  {n: 34, at: 98.36, tAt: 99.44, title: "Travaux à chaud", spoken: "Risque lié aux travaux à chaud", g: 'travaux', img: 'epi/soudeur.jpg', icons: ["etincelles", "feu"], sfx: 'sfx/whoosh'},
  {n: 35, at: 100.86, tAt: 102.36, title: "Travaux sous pression", spoken: "Risque lié aux travaux sous pression", g: 'travaux', img: 'promo/raffinerie.jpg', icons: ["vapeur"], sfx: 'soft-whoosh'},
  {n: 36, at: 104.46, tAt: 105.58, title: "Agents physiques particuliers", spoken: "Risque lié aux agents physiques particuliers", g: 'travaux', img: '', icons: ["aimant", "eclair", "vibration"], sfx: 'sfx/pop'},
  {n: 37, at: 107.8, tAt: 109.02, title: "Psychosociaux", spoken: "Risques psychosociaux", g: 'humain', img: '', icons: ["anxieux", "cerveau", "fatigue"], sfx: 'tension'},
  {n: 38, at: 110.5, tAt: 111.68, title: "Violences & agressions", spoken: "Risque lié aux violences et agressions", g: 'humain', img: '', icons: ["bulle-colere", "poing", "stop"], sfx: 'sfx/thud'},
  {n: 39, at: 113.62, tAt: 114.96, title: "Facteurs organisationnels", spoken: "Risque lié aux facteurs organisationnels", g: 'humain', img: 'iso26/direction-equipe.jpg', icons: ["sablier", "calendrier"], sfx: 'sfx/pop'},
  {n: 40, at: 117.0, tAt: 118.5, title: "Urgence & crise", spoken: "Risque lié aux situations d'urgence et de crise", g: 'humain', img: 'incident/blessure-soins.jpg', icons: ["sirene", "ambulance"], sfx: 'alarme'},
];
const endOf = (i: number) => (i + 1 < FAMS.length ? FAMS[i + 1].at : RECAP);
const color = (f: Fam) => GROUPS[f.g][1];

/** Grille des 40 familles qui se remplit au fil de la vidéo. */
const Grid: React.FC<{cur: number; top?: number; size?: number}> = ({cur, top = 1470, size = 40}) => {
  const t = useT();
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top, display: 'grid', gridTemplateColumns: `repeat(20, ${size}px)`, gap: 6, justifyContent: 'center'}}>
      {FAMS.map((f, k) => {
        const on = k < cur || (k === cur && t >= f.tAt);
        const pop = k === cur ? 1 + 0.35 * (1 - prog(t, f.tAt, f.tAt + 0.3)) : 1;
        return <div key={f.n} style={{width: size, height: size, borderRadius: 8, background: on ? color(f) : '#D9DEE4', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.42, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${on ? pop : 1})`, boxShadow: k === cur ? '0 6px 12px rgba(14,30,60,0.3)' : undefined}}>{on ? f.n : ''}</div>;
      })}
    </div>
  );
};

const Card: React.FC<{f: Fam; i: number}> = ({f, i}) => {
  const t = useT();
  const end = endOf(i);
  const c = color(f);
  const [gName] = GROUPS[f.g];
  const pn = prog(t, f.at, f.at + 0.35, easeOut);
  const newGroup = i === 0 || FAMS[i - 1].g !== f.g;
  return (
    <AbsoluteFill style={{opacity: 1 - prog(t, end - 0.1, end)}}>
      <div style={{position: 'absolute', left: 40, right: 40, top: 292, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, background: c, color: '#fff', borderRadius: 30, padding: '8px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, letterSpacing: 1.5, textTransform: 'uppercase', transform: newGroup ? `scale(${0.6 + 0.4 * prog(t, f.at, f.at + 0.35, easeOut)})` : undefined, transformOrigin: 'left center', whiteSpace: 'nowrap'}}>{gName}</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#9AA5B3'}}>FAMILLE</div>
      </div>
      <div style={{position: 'absolute', left: 40, top: 370, width: 200, height: 200, borderRadius: 40, background: c, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, boxShadow: '0 14px 28px rgba(14,30,60,0.28)', transform: `scale(${pn}) rotate(${(1 - pn) * -30}deg)`}}>
        <div style={{fontSize: 110, lineHeight: 1}}>{f.n}</div>
        <div style={{fontSize: 24, opacity: 0.8}}>/ 40</div>
      </div>
      <div style={{position: 'absolute', left: 270, top: 380, width: 780, height: 180, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{fontFamily: handFont, fontSize: 40, color: '#7A8594', opacity: prog(t, f.tAt - 0.1, f.tAt + 0.2)}}>Risque</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: f.title.length > 22 ? 52 : 64, lineHeight: 1.02, color: c, textTransform: 'uppercase', opacity: prog(t, f.tAt, f.tAt + 0.25), transform: `translateY(${(1 - prog(t, f.tAt, f.tAt + 0.3, easeOut)) * 30}px)`}}>{f.title}</div>
      </div>
      {f.img ? (
        <>
          {f.img.endsWith('.png') ? (
            <div style={{position: 'absolute', left: 90, top: 640, width: 900, height: 700, borderRadius: 40, background: '#fff', boxShadow: '0 20px 40px rgba(14,30,60,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: prog(t, f.at + 0.15, f.at + 0.45), transform: `scale(${0.85 + 0.15 * prog(t, f.at + 0.15, f.at + 0.5, easeOut)})`, borderBottom: `12px solid ${c}`}}>
              <Img src={staticFile(f.img)} style={{maxWidth: 760, maxHeight: 600, objectFit: 'contain'}} />
            </div>
          ) : (
            <PhotoCard src={f.img} at={f.at + 0.15} x={540} y={990} w={920} h={700} rotate={i % 2 ? 1.5 : -1.5} from={i % 2 ? 'right' : 'left'} />
          )}
          <div style={{position: 'absolute', right: 50, top: 1190, display: 'flex', gap: 12}}>
            {f.icons.slice(0, 2).map((ic, k) => {
              const p = prog(t, f.tAt + 0.25 + k * 0.12, f.tAt + 0.55 + k * 0.12, easeOut);
              return <div key={ic} style={{width: 150, height: 150, borderRadius: 34, background: '#fff', border: `6px solid ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(14,30,60,0.25)', transform: `scale(${p})`}}><F n={ic} size={105} float={4} /></div>;
            })}
          </div>
        </>
      ) : (
        <div style={{position: 'absolute', left: 90, top: 640, width: 900, height: 700, borderRadius: 40, background: `linear-gradient(160deg, #fff, ${c}22)`, border: `8px solid ${c}`, boxShadow: '0 20px 40px rgba(14,30,60,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, opacity: prog(t, f.at + 0.1, f.at + 0.4)}}>
          {f.icons.map((ic, k) => {
            const p = prog(t, f.at + 0.2 + k * 0.15, f.at + 0.55 + k * 0.15, easeOut);
            const big = k === 0;
            return <div key={ic} style={{transform: `scale(${p}) rotate(${(1 - p) * 25}deg) translateY(${big ? 0 : 60}px)`}}><F n={ic} size={big ? 330 : 200} float={6} /></div>;
          })}
        </div>
      )}
      <Grid cur={i} />
    </AbsoluteFill>
  );
};

/** Récap : la grille complète des 40 familles. */
const Recap: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Kinetic text="40 familles de *risques* SST" at={RECAP + 0.05} y={460} size={78} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 620, display: 'grid', gridTemplateColumns: 'repeat(8, 112px)', gap: 12, justifyContent: 'center'}}>
        {FAMS.map((f, k) => {
          const p = prog(t, RECAP + 0.1 + k * 0.025, RECAP + 0.35 + k * 0.025, easeOut);
          return <div key={f.n} style={{width: 112, height: 112, borderRadius: 22, background: color(f), display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${p})`, boxShadow: '0 6px 12px rgba(14,30,60,0.2)'}}><F n={f.icons[0]} size={76} /></div>;
        })}
      </div>
      <div style={{position: 'absolute', left: 540, top: 1360, transform: 'translate(-50%, -50%)'}}><Stamp text="À ÉVALUER DANS LE DUERP" p={prog(t, RECAP + 1.2, RECAP + 1.45)} color={RED} size={44} rotate={-4} /></div>
    </AbsoluteFill>
  );
};

/** Bruitages seuls (ni musique ni ambiance) : une signature par famille. */
const CUES: Sfx[] = [
  {at: 0.0, s: 'bass-hit', v: 0.5},
  ...FAMS.flatMap((f, i) => [
    ...(i > 0 ? [{at: f.at - 0.08, s: FAMS[i - 1].g !== f.g ? 'deep-hit' : i % 2 ? 'page' : 'soft-whoosh', v: 0.5}] : []),
    {at: f.at + 0.2, s: 'sfx/pop', v: 0.4},
    {at: f.tAt, s: 'tick', v: 0.5},
    {at: f.tAt + 0.3, s: f.sfx, v: f.sfx === 'alarme' ? 0.22 : f.sfx === 'tension' ? 0.3 : f.sfx === 'bass-hit' ? 0.55 : 0.45, ...(f.sfx === 'alarme' || f.sfx === 'tension' ? {dur: 1} : {})},
  ]),
  {at: RECAP - 0.1, s: 'soft-whoosh', v: 0.5},
  ...Array.from({length: 8}, (_, k) => ({at: RECAP + 0.15 + k * 0.12, s: 'sfx/click', v: 0.32})),
  {at: RECAP + 1.2, s: 'tampon', v: 0.7},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Familles: React.FC = () => (
  <AbsoluteFill>
    <Camera shakes={[23.4, 41.9, 112.0]}>
      <Background />
      <Gate from={0} to={RECAP}>{FAMS.map((f, i) => <Gate key={f.n} from={f.at} to={endOf(i)}><Card f={f} i={i} /></Gate>)}</Gate>
      <Gate from={RECAP} to={OUTRO_AT}><Recap /></Gate>
      <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    </Camera>
    <Header hideAt={OUTRO_AT} logo={LOGO} />
    <Footer hideAt={OUTRO_AT} />
    {FAMS.slice(1).map((f, i) => (FAMS[i].g !== f.g ? <Wipe key={f.n} at={f.at} dur={0.5} color={color(f)} /> : null))}
    <Wipe at={RECAP} />
    <Wipe at={OUTRO_AT} />
    <Flash at={18.4} />
    <Flash at={23.4} />
    <Captions captions={captions} />
    <Audio src={staticFile('voix-off-40familles.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

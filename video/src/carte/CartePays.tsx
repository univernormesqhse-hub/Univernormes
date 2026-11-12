import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {geoBounds, geoCentroid, geoMercator, geoNaturalEarth1, geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import world from 'world-atlas/countries-50m.json';
import {easeInOut, easeOut, prog, useT} from '../anim';
import {sansFont} from '../theme';
import {TOUS_LES_PAYS, trouverPays} from './pays';

/**
 * Carte politique animée de n'importe quelle région du monde, style « atlas » : mer vert d'eau, pays crème à
 * frontières brunes, noms en capitales. Le pays cité s'allume en vert, se soulève avec une ombre, un repère tombe et
 * pulse, son nom apparaît en grand ; la caméra peut ensuite plonger sur le dernier pays cité. Le cadrage se fait tout
 * seul autour des pays cités (vue « auto »), ou sur le monde entier. Contours réels Natural Earth (domaine public).
 */
type Geo = {id?: string; properties: {name: string}; geometry: unknown};
const MONDE = (feature(world as never, (world as never as {objects: {countries: never}}).objects.countries) as unknown as {features: Geo[]}).features;
const parIso = (iso: string) => MONDE.find((f) => f.id === iso);

export const STYLE_ATLAS = {
  mer: '#A9D6C2',
  merTexte: '#3F8F72',
  terre: '#FBE3B6',
  frontiere: '#B0652F',
  texte: '#5A2A12',
  accent: '#1F8A3B',
};

export type CartePaysProps = {
  /** Pays à allumer, dans l'ordre : nom français, gentilé, code ISO à 2 lettres ou numérique. */
  pays: string[];
  /** Instant (s) où chaque pays s'allume ; par défaut toutes les 1,2 s à partir de `at`. */
  instants?: number[];
  /** Instant (s) d'apparition de la carte. */
  at?: number;
  /** « auto » : cadre la région autour des pays cités ; « monde » : planisphère entier. */
  vue?: 'auto' | 'monde';
  /** Marge de contexte autour des pays cités en vue auto (1 = serré, 3 = large). */
  contexte?: number;
  /** Zoom final sur le dernier pays cité (1 = pas de zoom). */
  zoom?: number;
  /** Affiche les noms des pays visibles, comme sur un atlas. */
  etiquettes?: boolean;
  /** Légende de mer ou d'océan à afficher en bas (texte libre, rien par défaut). */
  legende?: string;
  /** Zone de la carte dans l'image 1080 × 1920. */
  cadre?: [[number, number], [number, number]];
  couleurs?: Partial<typeof STYLE_ATLAS>;
};

/** Rectangle géographique (lon/lat) qui englobe les pays cités, élargi pour montrer leurs voisins. */
const cadrage = (isos: string[], contexte: number) => {
  const feats = isos.map(parIso).filter(Boolean) as Geo[];
  if (!feats.length) return null;
  const [[x0, y0], [x1, y1]] = geoBounds({type: 'FeatureCollection', features: feats} as never);
  const lon1 = x1 < x0 ? x1 + 360 : x1; // franchissement de l'antiméridien
  const cx = (x0 + lon1) / 2;
  const cy = (y0 + y1) / 2;
  const w = Math.max(lon1 - x0, 14) * contexte;
  const h = Math.max(y1 - y0, 12) * contexte;
  const la0 = Math.max(cy - h / 2, -80);
  const la1 = Math.min(cy + h / 2, 82);
  return {type: 'MultiPoint', coordinates: [[cx - w / 2, la0], [cx + w / 2, la0], [cx - w / 2, la1], [cx + w / 2, la1]]};
};

export const CartePays: React.FC<CartePaysProps> = ({pays, instants, at = 0, vue = 'auto', contexte = 2.6, zoom = 1, etiquettes = true, legende, cadre = [[40, 330], [1040, 1590]], couleurs}) => {
  const t = useT();
  const c = {...STYLE_ATLAS, ...couleurs};
  const cibles = pays.map((q) => trouverPays(q)).filter((p): p is NonNullable<typeof p> => !!p && !!parIso(p.iso));
  const isos = cibles.map((p) => p.iso).join(',');
  const proj = React.useMemo(() => {
    const zone = vue === 'monde' ? null : cadrage(isos.split(',').filter(Boolean), contexte);
    if (!zone) return geoNaturalEarth1().fitExtent(cadre, {type: 'Sphere'} as never);
    return geoMercator().fitExtent(cadre, zone as never);
  }, [isos, vue, contexte, cadre]);
  const path = React.useMemo(() => geoPath(proj), [proj]);
  const quand = cibles.map((_, i) => instants?.[i] ?? at + 0.8 + i * 1.2);

  // zoom : on voit toute la région, puis la caméra plonge sur le dernier pays de la liste quand il s'allume
  const focus = cibles[cibles.length - 1];
  const tFocus = quand[cibles.length - 1] ?? 0;
  const geoFocus = focus && parIso(focus.iso);
  const [zx, zy] = geoFocus ? (proj(geoCentroid(geoFocus as never)) as [number, number]) : [540, 960];
  const zk = focus ? interpolate(t, [tFocus + 0.3, tFocus + 1.6], [1, zoom], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut}) : 1;
  const kz = (zk - 1) / Math.max(zoom - 1, 0.001);
  const centre = (f: Geo) => proj(geoCentroid(f as never)) as [number, number];
  const allumes = cibles.filter((_, i) => t >= quand[i]).map((p) => centre(parIso(p.iso)!));
  const apparition = prog(t, at, at + 0.6, easeOut);
  const [[cx0, cy0], [cx1, cy1]] = cadre;

  return (
    <AbsoluteFill style={{background: c.mer, opacity: apparition, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, transform: `translate(${(540 - zx) * kz}px, ${(960 - zy) * kz}px) scale(${zk})`, transformOrigin: `${zx}px ${zy}px`}}>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          {MONDE.map((f, i) => {
            const k = cibles.findIndex((p) => p.iso === f.id);
            const on = k >= 0 && t >= quand[k];
            const p = on ? prog(t, quand[k], quand[k] + 0.5, easeOut) : 0;
            return (
              <path
                key={i}
                d={path(f as never) ?? ''}
                fill={on ? c.accent : c.terre}
                fillOpacity={on ? 0.35 + 0.65 * p : 1}
                stroke={c.frontiere}
                strokeWidth={on ? 3 : vue === 'monde' ? 0.8 : 1.6}
                strokeLinejoin="round"
                style={on ? {filter: `drop-shadow(0 ${10 * p}px ${14 * p}px rgba(60,30,10,${0.45 * p}))`, transform: `translateY(${-6 * p}px)`} : undefined}
              />
            );
          })}
        </svg>
        {/* noms des pays visibles et assez grands à l'écran, façon atlas */}
        {etiquettes &&
          MONDE.map((f) => {
            const p = f.id ? TOUS_LES_PAYS.find((x) => x.iso === f.id) : undefined;
            if (!p) return null;
            const [x, y] = centre(f);
            if (!(x > cx0 + 40 && x < cx1 - 40 && y > cy0 && y < cy1)) return null;
            // surface réellement dessinée (un archipel très étalé comme Sainte-Hélène n'a pas de nom)
            const aire = path.area(f as never);
            if (aire < 3500) return null;
            const larg = Math.sqrt(aire);
            // le nom d'atlas s'efface quand un pays allumé (et son grand nom) est tout proche
            if (allumes.some(([ax, ay]) => Math.hypot(ax - x, ay - y) < 170)) return null;
            return (
              <div key={f.id} style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', fontFamily: sansFont, fontWeight: 800, fontSize: larg > 220 ? 22 : 15, letterSpacing: 0.5, color: c.texte, textTransform: 'uppercase', textAlign: 'center', whiteSpace: 'nowrap', opacity: 0.85}}>
                {p.court ?? p.nom}
              </div>
            );
          })}
        {/* repère et nom en grand pour chaque pays allumé (les noms qui se chevaucheraient sont décalés vers le bas) */}
        {(() => {
          const places: [number, number][] = [];
          return cibles.map((p, i) => {
            if (t < quand[i]) return null;
            const [x, y] = centre(parIso(p.iso)!);
            let dy = 0;
            while (places.some(([px, py]) => Math.abs(px - x) < 380 && Math.abs(py - (y + dy)) < 52)) dy += 54;
            places.push([x, y + dy]);
            const d = t - quand[i];
            const pulse = (d % 1.4) / 1.4;
            const drop = interpolate(d, [0, 0.3, 0.45], [-90, 6, 0], {extrapolateRight: 'clamp'});
            // nom à gauche du repère quand le pays est sur le bord droit de l'image
            const aGauche = zx + (x - zx) * zk + (540 - zx) * kz > 700;
            return (
              <div key={p.iso} style={{position: 'absolute', left: x, top: y, transform: `scale(${1 / zk})`}}>
                <div style={{position: 'absolute', left: -50 * (0.4 + pulse), top: -50 * (0.4 + pulse), width: 100 * (0.4 + pulse), height: 100 * (0.4 + pulse), borderRadius: '50%', border: `5px solid ${c.accent}`, opacity: 1 - pulse}} />
                <div style={{position: 'absolute', left: -16, top: -16 + drop, width: 32, height: 32, borderRadius: '50%', background: c.accent, border: '6px solid #fff', boxShadow: '0 6px 14px rgba(0,0,0,0.3)'}} />
                <div style={{position: 'absolute', [aGauche ? 'right' : 'left']: 30, top: -34 + drop + dy * zk, fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: c.texte, whiteSpace: 'nowrap', textTransform: 'uppercase', textShadow: `0 0 10px ${c.terre}, 0 0 4px ${c.terre}`, opacity: prog(d, 0.25, 0.55)}}>
                  {p.court ?? p.nom}
                </div>
              </div>
            );
          });
        })()}
      </div>
      {legende && <div style={{position: 'absolute', left: 60, top: 1700, fontFamily: sansFont, fontWeight: 700, fontSize: 30, letterSpacing: 6, color: c.merTexte, textTransform: 'uppercase'}}>{legende}</div>}
    </AbsoluteFill>
  );
};

/** Démonstrations : Afrique de l'Ouest, planisphère, Europe. */
export const CartePaysDemo: React.FC = () => <CartePays pays={['Sénégal', 'Bénin', "Côte d'Ivoire"]} instants={[0.8, 2.2, 3.6]} zoom={2.2} legende="Golfe de Guinée" />;
export const CartePaysMondeDemo: React.FC = () => <CartePays vue="monde" pays={['France', 'Brésil', 'Japon', 'Canada', 'Australie']} instants={[0.6, 1.4, 2.2, 3.0, 3.8]} etiquettes={false} />;
export const CartePaysEuropeDemo: React.FC = () => <CartePays pays={['Allemagne', 'belge']} instants={[0.6, 1.8]} zoom={1.8} />;

/**
 * Cartes géographiques animées (d3-geo + Natural Earth 1:50m, `public/geo/countries-50m.json`) :
 * globe orthographique qui tourne, épingle qui tombe avec ondes, arcs de grand cercle qui se tracent, zoom, pays
 * mis en lumière ; carte plate (Mercator) centrée sur un point pour une fiche.
 */
import React, {useEffect, useState} from 'react';
import {continueRender, delayRender, staticFile} from 'remotion';
import {geoDistance, geoGraticule10, geoInterpolate, geoMercator, geoOrthographic, geoPath} from 'd3-geo';
import {feature, mesh} from 'topojson-client';
import type {Feature, FeatureCollection, Geometry, MultiLineString} from 'geojson';
import type {Topology} from 'topojson-specification';

export type LonLat = [number, number];
type World = {countries: FeatureCollection<Geometry, {name: string}>; borders: MultiLineString};
let WORLD: World | null = null;
let LOADING: Promise<World> | null = null;
const loadWorld = () => {
  if (!LOADING) LOADING = fetch(staticFile('geo/countries-50m.json')).then((r) => r.json()).then((topo: Topology) => {
    const o = topo.objects.countries;
    WORLD = {countries: feature(topo, o) as unknown as FeatureCollection<Geometry, {name: string}>, borders: mesh(topo, o as never, (a, b) => a !== b) as MultiLineString};
    return WORLD;
  });
  return LOADING;
};
export const useWorld = () => {
  const [w, setW] = useState<World | null>(WORLD);
  const [h] = useState(() => (WORLD ? null : delayRender('carte')));
  useEffect(() => { if (!WORLD && h !== null) loadWorld().then((x) => { setW(x); continueRender(h); }); }, [h]);
  return w;
};

export const CITIES: Record<string, LonLat> = {
  'Genève': [6.14, 46.2], Abidjan: [-4.01, 5.32], Dakar: [-17.44, 14.69], Douala: [9.7, 4.05], Lagos: [3.38, 6.52], Nairobi: [36.82, -1.29],
  Johannesburg: [28.05, -26.2], 'Le Caire': [31.24, 30.04], Casablanca: [-7.59, 33.57], 'São Paulo': [-46.63, -23.55], 'New York': [-74.0, 40.71],
  Mumbai: [72.88, 19.08], 'Pékin': [116.4, 39.9], Tokyo: [139.69, 35.69], Sydney: [151.21, -33.87],
};

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

export type Arc = {from: LonLat; to: LonLat; p: number; c: string};
export type Pin = {at: LonLat; label?: string; c: string; pop: number; ring?: number};

/** Globe orthographique. `center` = point au centre de l'écran, `r` = rayon en px. */
export const Globe: React.FC<{w: number; h: number; cx: number; cy: number; r: number; center: LonLat; tilt?: number; arcs?: Arc[]; pins?: Pin[]; hi?: Record<string, {c: string; a: number}>; land?: string; ocean?: string}> = ({w, h, cx, cy, r, center, tilt = 0, arcs = [], pins = [], hi = {}, land = '#F4EEDF', ocean = '#0E2A5C'}) => {
  const world = useWorld();
  if (!world || r <= 1) return null;
  const proj = geoOrthographic().rotate([-center[0], -center[1], tilt]).scale(r).translate([cx, cy]).clipAngle(90).precision(0.4);
  const path = geoPath(proj);
  const vis = (p: LonLat) => geoDistance(p, center) < Math.PI / 2 - 0.02;
  return (
    <svg width={w} height={h} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
      <defs>
        <radialGradient id="gOcean" cx="38%" cy="32%" r="75%"><stop offset="0%" stopColor="#2F6FD1" /><stop offset="55%" stopColor={ocean} /><stop offset="100%" stopColor="#06132B" /></radialGradient>
        <radialGradient id="gAtmo" cx="50%" cy="50%" r="50%"><stop offset="86%" stopColor="#5DB6FF" stopOpacity={0} /><stop offset="93%" stopColor="#7CC6FF" stopOpacity={0.55} /><stop offset="100%" stopColor="#7CC6FF" stopOpacity={0} /></radialGradient>
        <radialGradient id="gShade" cx="35%" cy="30%" r="80%"><stop offset="0%" stopColor="#fff" stopOpacity={0.18} /><stop offset="60%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.45} /></radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r * 1.12} fill="url(#gAtmo)" />
      <circle cx={cx} cy={cy} r={r} fill="url(#gOcean)" />
      <path d={path(geoGraticule10()) ?? ''} fill="none" stroke="#ffffff" strokeOpacity={0.12} strokeWidth={1} />
      {world.countries.features.map((f, i) => {
        const hk = hi[f.properties.name];
        return <path key={i} d={path(f as Feature) ?? ''} fill={hk ? mix(land, hk.c, hk.a) : land} stroke="none" />;
      })}
      <path d={path(world.borders) ?? ''} fill="none" stroke="#8C7F66" strokeOpacity={0.55} strokeWidth={0.8} />
      <circle cx={cx} cy={cy} r={r} fill="url(#gShade)" />
      {arcs.map((a, i) => {
        if (a.p <= 0) return null;
        const ip = geoInterpolate(a.from, a.to);
        const pp = clamp01(a.p), m = Math.max(2, Math.round(48 * pp));
        const coords = Array.from({length: m}, (_, k) => ip((k / (m - 1)) * pp));
        const d = path({type: 'LineString', coordinates: coords}) ?? '';
        const head = coords[coords.length - 1] as LonLat;
        const hp = proj(head);
        return (
          <g key={i}>
            <path d={d} fill="none" stroke={a.c} strokeOpacity={0.35} strokeWidth={9} strokeLinecap="round" />
            <path d={d} fill="none" stroke={a.c} strokeWidth={3.5} strokeLinecap="round" />
            {hp && vis(head) && a.p < 1 && <circle cx={hp[0]} cy={hp[1]} r={7} fill="#fff" stroke={a.c} strokeWidth={3} />}
          </g>
        );
      })}
      {pins.map((pn, i) => {
        const pp = proj(pn.at);
        if (!pp || !vis(pn.at) || pn.pop <= 0) return null;
        const s = Math.min(1.15, pn.pop * 1.15) - Math.max(0, pn.pop - 0.85) * 1;
        return (
          <g key={i} transform={`translate(${pp[0]}, ${pp[1]})`}>
            {pn.ring !== undefined && [0, 0.33, 0.66].map((o) => { const q = (pn.ring! + o) % 1; return <circle key={o} r={8 + q * 70} fill="none" stroke={pn.c} strokeWidth={4 * (1 - q)} opacity={1 - q} />; })}
            <g transform={`scale(${s})`}>
              <path d="M 0 0 C -6 -14 -18 -22 -18 -36 A 18 18 0 1 1 18 -36 C 18 -22 6 -14 0 0 Z" fill={pn.c} stroke="#fff" strokeWidth={3.5} />
              <circle cy={-36} r={7} fill="#fff" />
            </g>
            {pn.label && <text x={0} y={-62} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={30} fill="#fff" stroke="#0B0F18" strokeWidth={6} paintOrder="stroke" opacity={clamp01((pn.pop - 0.4) * 2)}>{pn.label}</text>}
          </g>
        );
      })}
    </svg>
  );
};

/** Carte plate (Mercator) centrée sur un point, pays mis en lumière, épingles. */
export const FlatMap: React.FC<{w: number; h: number; center: LonLat; zoom: number; hi?: Record<string, {c: string; a: number}>; pins?: Pin[]}> = ({w, h, center, zoom, hi = {}, pins = []}) => {
  const world = useWorld();
  if (!world) return null;
  const proj = geoMercator().center(center).scale(zoom).translate([w / 2, h / 2]);
  const path = geoPath(proj);
  return (
    <svg width={w} height={h} style={{display: 'block'}}>
      <rect width={w} height={h} fill="#CFE3F5" />
      <path d={path(geoGraticule10()) ?? ''} fill="none" stroke="#ffffff" strokeOpacity={0.6} strokeWidth={1} />
      {world.countries.features.map((f, i) => {
        const hk = hi[f.properties.name];
        return <path key={i} d={path(f as Feature) ?? ''} fill={hk ? mix('#F4EEDF', hk.c, hk.a) : '#F4EEDF'} />;
      })}
      <path d={path(world.borders) ?? ''} fill="none" stroke="#8C7F66" strokeWidth={1.2} />
      {pins.map((pn, i) => {
        const pp = proj(pn.at);
        if (!pp || pn.pop <= 0) return null;
        const s = Math.min(1.15, pn.pop * 1.15) - Math.max(0, pn.pop - 0.85);
        return (
          <g key={i} transform={`translate(${pp[0]}, ${pp[1]})`}>
            {pn.ring !== undefined && [0, 0.5].map((o) => { const q = (pn.ring! + o) % 1; return <circle key={o} r={10 + q * 80} fill="none" stroke={pn.c} strokeWidth={5 * (1 - q)} opacity={1 - q} />; })}
            <g transform={`scale(${s * 1.3})`}>
              <path d="M 0 0 C -6 -14 -18 -22 -18 -36 A 18 18 0 1 1 18 -36 C 18 -22 6 -14 0 0 Z" fill={pn.c} stroke="#fff" strokeWidth={3.5} />
              <circle cy={-36} r={7} fill="#fff" />
            </g>
          </g>
        );
      })}
    </svg>
  );
};

/** Mélange linéaire de deux couleurs hexadécimales. */
const mix = (a: string, b: string, t: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16)), pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * clamp01(t))).join(',')})`;
};

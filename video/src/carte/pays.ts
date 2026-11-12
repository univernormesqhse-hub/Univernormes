import countries from 'i18n-iso-countries';
import fr from 'i18n-iso-countries/langs/fr.json';

countries.registerLocale(fr);

// Tous les pays du monde : code ISO 3166-1 numérique (identifiant de world-atlas / Natural Earth), nom français
// d'affichage et variantes reconnues dans une transcription de voix off (normalisées, voir normaliser()).
// Les noms viennent de i18n-iso-countries (base ISO, traduction française officielle), corrigés ci-dessous quand
// l'usage courant diffère (« Côte d'Ivoire » sans trait d'union, « États-Unis » plutôt que « États-Unis d'Amérique »).
export type Pays = {iso: string; alpha2: string; nom: string; court?: string; variantes: string[]};

/** Nom d'usage, nom court et gentilés : ce que la voix off dit réellement. */
const USAGE: Record<string, {nom?: string; court?: string; variantes?: string[]}> = {
  CI: {nom: "Côte d'Ivoire", variantes: ['ivoirien', 'ivoirienne', 'ivoiriens', 'ivoiriennes']},
  CD: {nom: 'République démocratique du Congo', court: 'RD Congo', variantes: ['rdc', 'rd congo', 'congo kinshasa']},
  CG: {nom: 'Congo', variantes: ['congo brazzaville', 'republique du congo']},
  CF: {court: 'Centrafrique', variantes: ['centrafrique', 'centrafricain']},
  BF: {court: 'Burkina', variantes: ['burkina', 'burkinabe']},
  SN: {variantes: ['senegalais', 'senegalaise']},
  ML: {variantes: ['malien', 'malienne', 'maliens']},
  BJ: {variantes: ['beninois', 'beninoise']},
  TG: {variantes: ['togolais', 'togolaise']},
  CM: {variantes: ['camerounais', 'camerounaise']},
  GA: {variantes: ['gabonais', 'gabonaise']},
  GN: {variantes: ['guinee conakry', 'guineen', 'guineenne']},
  GH: {variantes: ['ghaneen', 'ghaneenne']},
  NG: {variantes: ['nigerian', 'nigeriane']},
  NE: {variantes: ['nigerien', 'nigerienne']},
  MA: {variantes: ['marocain', 'marocaine']},
  DZ: {variantes: ['algerien', 'algerienne']},
  TN: {variantes: ['tunisien', 'tunisienne']},
  EG: {variantes: ['egyptien', 'egyptienne']},
  ZA: {variantes: ['sud africain', 'sud africaine']},
  SZ: {nom: 'Eswatini', variantes: ['eswatini', 'swaziland']},
  CV: {variantes: ['cap vert', 'cabo verde']},
  MG: {variantes: ['malgache', 'malgaches']},
  MU: {variantes: ['ile maurice']},
  US: {nom: 'États-Unis', variantes: ['etats unis', 'usa', 'americain', 'americaine', 'amerique']},
  GB: {variantes: ['royaume uni', 'grande bretagne', 'britannique', 'angleterre']},
  FR: {variantes: ['francais', 'francaise', 'hexagone']},
  BE: {variantes: ['belge']},
  CH: {variantes: ['suisse']},
  CA: {variantes: ['canadien', 'canadienne', 'quebec']},
  DE: {variantes: ['allemand', 'allemande']},
  ES: {variantes: ['espagnol', 'espagnole']},
  IT: {variantes: ['italien', 'italienne']},
  PT: {variantes: ['portugais', 'portugaise']},
  CN: {variantes: ['chinois', 'chinoise']},
  JP: {variantes: ['japonais', 'japonaise']},
  IN: {variantes: ['indien', 'indienne']},
  BR: {variantes: ['bresilien', 'bresilienne']},
  RU: {variantes: ['russe']},
  TR: {variantes: ['turc', 'turque']},
  SA: {variantes: ['saoudien', 'saoudienne']},
  AE: {nom: 'Émirats arabes unis', court: 'Émirats', variantes: ['emirats', 'emirats arabes unis', 'dubai']},
  KR: {variantes: ['coree du sud', 'coreen', 'coreenne']},
  KP: {variantes: ['coree du nord', 'nord coreen']},
  NL: {variantes: ['pays bas', 'hollande', 'neerlandais']},
  HT: {variantes: ['haitien', 'haitienne']},
  LB: {variantes: ['libanais', 'libanaise']},
  MX: {variantes: ['mexicain', 'mexicaine']},
  AU: {variantes: ['australien', 'australienne']},
};

/** Minuscules, sans accents ni ponctuation, tirets et apostrophes typographiques normalisés. */
export const normaliser = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’`]/g, "'")
    .replace(/[-_]/g, ' ')
    .replace(/[^a-z' ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const NOMS = countries.getNames('fr', {select: 'all'}) as Record<string, string[]>;

export const TOUS_LES_PAYS: Pays[] = Object.keys(NOMS).map((alpha2) => {
  const u = USAGE[alpha2] ?? {};
  const officiels = NOMS[alpha2];
  const nom = u.nom ?? officiels[0];
  const variantes = new Set<string>([...officiels, nom, u.court ?? ''].filter(Boolean).map(normaliser));
  (u.variantes ?? []).forEach((v) => variantes.add(normaliser(v)));
  // « Côte d'Ivoire » et « Cote d Ivoire » (transcription) doivent tous deux être reconnus
  [...variantes].forEach((v) => variantes.add(v.replace(/'/g, ' ').replace(/\s+/g, ' ')));
  return {iso: countries.alpha2ToNumeric(alpha2) ?? '', alpha2, nom, court: u.court, variantes: [...variantes]};
});

/** Retrouve un pays par son nom français, une variante, un gentilé ou un code ISO (numérique ou à 2 lettres). */
export const trouverPays = (q: string): Pays | undefined => {
  const n = normaliser(q);
  return TOUS_LES_PAYS.find((p) => p.iso === q || p.alpha2 === q.toUpperCase() || p.variantes.includes(n));
};

/**
 * Détecte les pays cités dans une transcription mot à mot ([mot, seconde][]) et renvoie chaque mention avec l'instant
 * de son premier mot. Les noms composés jusqu'à 5 mots sont reconnus ; le plus long gagne (« Guinée équatoriale »
 * avant « Guinée »).
 */
export const detecterPays = (mots: [string, number][]): {pays: Pays; at: number}[] => {
  const out: {pays: Pays; at: number}[] = [];
  for (let i = 0; i < mots.length; i++) {
    for (let k = 5; k >= 1; k--) {
      if (i + k > mots.length) continue;
      const p = trouverPays(mots.slice(i, i + k).map((m) => m[0]).join(' '));
      if (p) {
        out.push({pays: p, at: mots[i][1]});
        i += k - 1;
        break;
      }
    }
  }
  return out;
};

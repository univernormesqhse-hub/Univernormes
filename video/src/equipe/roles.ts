export type RoleId = 'responsable' | 'coordonnateur' | 'superviseur' | 'agent' | 'relais' | 'assistant';

export type Role = {
  id: RoleId;
  num: string;
  title: string;
  mission: string;
  /** photo détourée (public/) et ses proportions */
  src: string;
  ratio: number;
  /** cadrage du médaillon : centre (fractions de l'image) et part de la hauteur visible */
  fx: number;
  fy: number;
  win: number;
  /** position dans l'organigramme */
  x: number;
  y: number;
  /** séquence « héros » : entrée, envol vers le médaillon, côté de l'écran */
  heroIn: number;
  heroOut: number;
  side: 'left' | 'right';
  heroHeight: number;
  chips: {at: number; label: string; strike?: boolean}[];
};

const P = 'personnages/equipe-hse/';

export const R = 108; // rayon des médaillons

export const ROLES: Record<RoleId, Role> = {
  responsable: {
    id: 'responsable', num: '01', title: 'Responsable HSE', mission: 'Stratégie & conformité',
    src: P + 'responsable.png', ratio: 738 / 1100, fx: 0.44, fy: 0.2, win: 0.42,
    x: 540, y: 560, heroIn: 12.5, heroOut: 20.3, side: 'right', heroHeight: 1060,
    chips: [
      {at: 14.0, label: 'Pilote le système'},
      {at: 15.2, label: 'Le quotidien', strike: true},
      {at: 16.6, label: 'Élabore la stratégie'},
      {at: 18.8, label: 'Garantit la conformité'},
    ],
  },
  coordonnateur: {
    id: 'coordonnateur', num: '02', title: 'Coordonnateur HSE', mission: 'Procédures',
    src: P + 'coordonnateur.png', ratio: 740 / 1100, fx: 0.5, fy: 0.22, win: 0.44,
    x: 240, y: 900, heroIn: 22.9, heroOut: 26.4, side: 'left', heroHeight: 1000,
    chips: [
      {at: 23.9, label: 'Harmonise les procédures'},
      {at: 25.0, label: 'Entre les services'},
    ],
  },
  superviseur: {
    id: 'superviseur', num: '03', title: 'Superviseur HSE', mission: 'Encadrement',
    src: P + 'superviseur.png', ratio: 586 / 1100, fx: 0.5, fy: 0.19, win: 0.4,
    x: 840, y: 900, heroIn: 27.1, heroOut: 31.9, side: 'right', heroHeight: 1080,
    chips: [
      {at: 28.0, label: 'Relais sur le site'},
      {at: 28.7, label: 'Encadre les équipes'},
    ],
  },
  agent: {
    id: 'agent', num: '04', title: 'Agent HSE', mission: 'Inspection & intervention',
    src: P + 'agent.png', ratio: 758 / 1100, fx: 0.4, fy: 0.21, win: 0.44,
    x: 240, y: 1390, heroIn: 36.7, heroOut: 42.6, side: 'left', heroHeight: 1040,
    chips: [
      {at: 36.9, label: 'Inspecte'},
      {at: 39.0, label: 'Détecte les failles'},
      {at: 40.0, label: 'Intervient'},
    ],
  },
  relais: {
    id: 'relais', num: '05', title: 'Relais HSE', mission: 'Signalement',
    src: P + 'relais.png', ratio: 1123 / 1100, fx: 0.72, fy: 0.27, win: 0.5,
    x: 840, y: 1390, heroIn: 46.7, heroOut: 51.4, side: 'right', heroHeight: 860,
    chips: [
      {at: 46.8, label: 'Intégré aux équipes'},
      {at: 47.9, label: 'Signale les dangers'},
    ],
  },
  assistant: {
    id: 'assistant', num: '06', title: 'Assistant HSE', mission: 'Statistiques & rapports',
    src: P + 'assistant.png', ratio: 748 / 1100, fx: 0.47, fy: 0.27, win: 0.48,
    x: 540, y: 1140, heroIn: 52.2, heroOut: 57.4, side: 'left', heroHeight: 1040,
    chips: [
      {at: 53.6, label: 'Centralise les observations'},
      {at: 55.7, label: 'Produit les statistiques'},
      {at: 56.3, label: 'Pour la direction'},
    ],
  },
};

export const ORDER: RoleId[] = ['responsable', 'coordonnateur', 'superviseur', 'agent', 'relais', 'assistant'];

/** Liens de l'organigramme : descendants (directives, marine) et remontants (information, vert). */
export type Link = {from: RoleId; to: RoleId; at: number; up?: boolean; label?: string};
export const LINKS: Link[] = [
  {from: 'responsable', to: 'coordonnateur', at: 21.1, label: 'Procédures'},
  {from: 'responsable', to: 'superviseur', at: 21.3, label: 'Encadrement'},
  {from: 'coordonnateur', to: 'agent', at: 34.5},
  {from: 'superviseur', to: 'relais', at: 43.4},
  {from: 'agent', to: 'assistant', at: 57.5, up: true},
  {from: 'relais', to: 'assistant', at: 57.65, up: true},
  {from: 'assistant', to: 'responsable', at: 57.8, up: true},
];

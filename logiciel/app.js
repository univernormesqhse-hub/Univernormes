/* UNIVERSNORMES QHSE — application monopage.
   Deux modes : local (données dans localStorage, aucun serveur) ou serveur (API du dossier serveur/, multi-utilisateurs,
   synchronisation et file d'attente hors ligne). Routage : hash (#/module ou #/module/id).
   Chaque module simple est décrit par un schéma (MODULES) : champs du formulaire, colonnes du tableau, filtres.
   Les écrans riches (tableau de bord, fiche événement, réalisation d'audit, risques, indicateurs) ont leur propre rendu. */
'use strict';

/* ───────────── Outils ───────────── */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const { pad, iso, today, addDays, addMonths, fmtDate, daysBetween } = Regles;
const MOIS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
const fmtMonth = m => { const [y, mo] = m.split('-'); return `${MOIS[+mo - 1]} ${y.slice(2)}`; };
const nf = (n, d = 0) => Number.isFinite(n) ? n.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d }) : '—';
const badge = (txt, cls = '') => txt ? `<span class="b ${cls}">${esc(txt)}</span>` : '';

function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.hidden = false;
  clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, 2600);
}

/* ───────────── Stockage ─────────────
   Mode local : tout est dans localStorage (KEY).
   Mode serveur : les données sont chargées depuis l'API ; chaque modification est appliquée tout de suite à l'écran,
   mise dans une file d'attente (conservée hors ligne) puis envoyée au serveur. Les modifications des autres
   utilisateurs sont récupérées toutes les 30 secondes. */
const KEY = 'universnormes-qhse-v1';
const KEY_SRV = 'universnormes-qhse-serveur-v1';
const COLLECTIONS = ['sites', 'personnel', 'evenements', 'risques', 'actions', 'modeles', 'audits', 'documents', 'formations', 'exigences', 'heures'];
const MODE = { serveur: false, user: null, enLigne: true };
const DB = {
  d: null, file: [], curseur: 0,
  load() {
    try { this.d = JSON.parse(localStorage.getItem(KEY)); } catch (e) { this.d = null; }
    if (!this.d || !this.d.meta) { this.d = seed(); this.save(); }
    this.normaliser();
  },
  normaliser() { this.d.meta ||= {}; COLLECTIONS.forEach(c => this.d[c] ||= []); this.d.meta.compteurs ||= {}; },
  save() {
    try {
      if (MODE.serveur) localStorage.setItem(KEY_SRV, JSON.stringify({ userId: MODE.user?.id, user: MODE.user, d: this.d, file: this.file, curseur: this.curseur }));
      else localStorage.setItem(KEY, JSON.stringify(this.d));
    } catch (e) {
      if (MODE.serveur) { try { localStorage.removeItem(KEY_SRV); } catch (_) { } }
      else toast('Stockage plein : supprimez des pièces jointes ou exportez vos données.');
    }
  },
  all(c) { return this.d[c]; },
  get(c, id) { return this.d[c].find(x => x.id === id); },
  poser(c, o) { const i = this.d[c].findIndex(x => x.id === o.id); if (i >= 0) this.d[c][i] = o; else this.d[c].push(o); },
  upsert(c, o) {
    this.poser(c, o);
    if (MODE.serveur) this.pousser({ op: 'put', c, id: o.id, data: o }); else this.save();
    return o;
  },
  remove(c, id) {
    this.d[c] = this.d[c].filter(x => x.id !== id);
    if (MODE.serveur) this.pousser({ op: 'del', c, id }); else this.save();
  },
  nextRef(prefix) {
    const y = new Date().getFullYear(), k = `${prefix}-${y}`;
    const n = (this.d.meta.compteurs[k] || 0) + 1;
    this.d.meta.compteurs[k] = n;
    return `${prefix}-${y}-${String(n).padStart(3, '0')}`;
  },
  // En mode serveur, la référence définitive est attribuée par le serveur (pas de doublon entre utilisateurs).
  attribuerRef(o, prefix) {
    if (MODE.serveur) { o.ref = `${prefix}-…`; o._refPending = prefix; } else o.ref = this.nextRef(prefix);
  },
  pousser(op) {
    this.file = this.file.filter(x => !(x.c === op.c && x.id === op.id));
    this.file.push(JSON.parse(JSON.stringify(op)));
    this.save(); afficherSync(); Sync.planifier();
  }
};

async function apiCall(method, chemin, corps) {
  const r = await fetch(chemin, { method, credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-QHSE': '1' }, body: corps === undefined ? undefined : JSON.stringify(corps) });
  let j = null; try { j = await r.json(); } catch (e) { }
  if (!r.ok) throw Object.assign(new Error(j?.erreur || `Erreur ${r.status}`), { status: r.status, corps: j });
  return j;
}

/* Remplace, dans `cible`, les pièces jointes encore en data: par la version du serveur (même id), récursivement. */
function remplacerFichiers(cible, source) {
  const parId = new Map();
  (function collecter(o) { if (Array.isArray(o)) o.forEach(collecter); else if (o && typeof o === 'object') { if (o.id && o.url) parId.set(o.id, o); Object.values(o).forEach(collecter); } })(source);
  (function patcher(o) {
    if (Array.isArray(o)) { o.forEach((x, i) => { if (x && x.id && x.data && parId.has(x.id)) o[i] = parId.get(x.id); else patcher(x); }); }
    else if (o && typeof o === 'object') for (const [k, x] of Object.entries(o)) { if (x && x.id && x.data && parId.has(x.id)) o[k] = parId.get(x.id); else patcher(x); }
  })(cible);
}

const Sync = {
  t: null, enCours: false, rendreApres: false,
  planifier(delai = 400) { clearTimeout(this.t); this.t = setTimeout(() => this.envoyer(), delai); },
  async envoyer() {
    if (!MODE.serveur || this.enCours || !DB.file.length) return;
    this.enCours = true; afficherSync();
    const ops = DB.file.slice(0, 20);
    let retry = 0;
    try {
      const r = await apiCall('POST', 'api/lot', { ops });
      MODE.enLigne = true;
      DB.file = DB.file.filter(x => !ops.some(o => o.c === x.c && o.id === x.id && JSON.stringify(o) === JSON.stringify(x)));
      for (const res of r.resultats) {
        const plusRecent = DB.file.find(x => x.c === res.c && x.id === res.id);
        if (!res.ok) {
          toast(`Non enregistré : ${res.erreur}`);
          if (!plusRecent) { const vrai = await apiCall('GET', 'api/donnees').catch(() => null); if (vrai) { DB.d[res.c] = vrai.donnees[res.c]; this.rendreApres = true; } }
          continue;
        }
        if (plusRecent) {
          if (plusRecent.data && res.data) { if (res.data.ref) { plusRecent.data.ref = res.data.ref; delete plusRecent.data._refPending; } remplacerFichiers(plusRecent.data, res.data); }
          const cache = DB.get(res.c, res.id); if (cache && res.data) { cache.ref = res.data.ref || cache.ref; delete cache._refPending; remplacerFichiers(cache, res.data); }
        } else if (res.data) { DB.poser(res.c, res.data); this.rendreApres = true; }
      }
    } catch (e) {
      if (e.status === 401) { afficherConnexion('Votre session a expiré. Reconnectez-vous : vos modifications en attente seront envoyées ensuite.'); }
      else if (e.status === 413) { toast('Envoi trop volumineux : retirez des photos.'); DB.file.shift(); }
      else { MODE.enLigne = false; retry = 15000; }
    } finally {
      this.enCours = false; DB.save(); afficherSync(); rafraichirSiInactif();
      if (DB.file.length && MODE.enLigne) this.planifier(50); else if (DB.file.length && retry) this.planifier(retry);
    }
  },
  async tirer() {
    if (!MODE.serveur || document.hidden) return;
    try {
      const r = await apiCall('GET', `api/changements?depuis=${DB.curseur}`);
      MODE.enLigne = true;
      for (const ch of r.changements) {
        if (DB.file.some(x => x.c === ch.c && x.id === ch.id)) continue; // une modification locale en attente a la priorité
        if (ch.data) DB.poser(ch.c, ch.data); else DB.d[ch.c] = DB.d[ch.c].filter(x => x.id !== ch.id);
        this.rendreApres = true;
      }
      DB.curseur = r.curseur; DB.save();
      if (DB.file.length) this.envoyer();
    } catch (e) {
      if (e.status === 401) afficherConnexion('Votre session a expiré.'); else MODE.enLigne = false;
    }
    afficherSync(); rafraichirSiInactif();
  }
};
function enSaisie() {
  if (!$('#modal').hidden) return true;
  const a = document.activeElement;
  return !!a && a.closest('#view') && a.matches('input,textarea,select');
}
function rafraichirSiInactif() { if (Sync.rendreApres && !enSaisie()) { Sync.rendreApres = false; route(); } }
function afficherSync() {
  const el = $('#syncEtat'); if (!el) return;
  el.hidden = !MODE.serveur; if (!MODE.serveur) return;
  const n = DB.file.length;
  const [cls, txt] = !MODE.enLigne ? ['orange', `Hors ligne${n ? ` · ${n} en attente` : ''}`] : n || Sync.enCours ? ['yellow', `Envoi… (${n})`] : ['green', 'Synchronisé'];
  el.className = 'sync ' + cls; el.textContent = txt;
  el.title = !MODE.enLigne ? 'Vos saisies sont gardées sur cet appareil et seront envoyées au retour de la connexion.' : '';
}
const peut = col => !MODE.serveur || Regles.peutEcrire(MODE.user?.role, col);
const peutSuppr = col => !MODE.serveur || Regles.peutSupprimer(MODE.user?.role, col);
const estAdmin = () => !MODE.serveur || MODE.user?.role === 'admin';
const estResp = () => !MODE.serveur || ['admin', 'responsable'].includes(MODE.user?.role);
const siteName = id => DB.get('sites', id)?.nom || '—';
const personName = id => DB.get('personnel', id)?.nom || '';
const currentSite = () => DB.d.meta.site || '';
const bySite = arr => currentSite() ? arr.filter(x => !('site' in x) || x.site === currentSite()) : arr;

/* ───────────── Règles métier (regles.js, partagées avec le serveur) ───────────── */
const { ACTION_OUVERTE, actionLate, crit, critLevel, echeanceState, auditScore, docRevueState } = Regles;
const CRIT_LBL = ['—', 'Faible', 'Moyen', 'Élevé', 'Critique'];
const CRIT_CLS = ['grey', 'green', 'yellow', 'orange', 'red'];
const critBadge = c => badge(`${c || '—'} · ${CRIT_LBL[critLevel(c)]}`, CRIT_CLS[critLevel(c)]);

/* ───────────── Schémas des modules ───────────── */
const SITE = { k: 'site', label: 'Site', type: 'site', required: true };
const MODULES = {
  evenements: {
    titre: 'Événements', un: 'un événement', prefix: 'EV', icon: '⚠️',
    fields: [
      { k: 'type', label: 'Type', type: 'select', required: true, options: ['Accident de travail', 'Presqu\'accident', 'Situation dangereuse', 'Incident matériel', 'Incident environnemental', 'Non-conformité produit', 'Réclamation client'] },
      { k: 'date', label: 'Date', type: 'date', required: true, def: today },
      SITE,
      { k: 'lieu', label: 'Lieu précis / poste' },
      { k: 'titre', label: 'Titre court', required: true, full: true },
      { k: 'description', label: 'Description des faits', type: 'textarea', full: true },
      { k: 'gravite', label: 'Gravité', type: 'select', options: ['Mineure', 'Modérée', 'Grave', 'Très grave'], def: () => 'Mineure' },
      { k: 'declarant', label: 'Déclarant', type: 'personne' },
      { k: 'victime', label: 'Victime', type: 'personne', showIf: o => o.type === 'Accident de travail' },
      { k: 'arret', label: 'Arrêt de travail', type: 'select', options: ['Non', 'Oui'], def: () => 'Non', showIf: o => o.type === 'Accident de travail' },
      { k: 'joursPerdus', label: 'Jours perdus', type: 'number', showIf: o => o.type === 'Accident de travail' && o.arret === 'Oui' },
      { k: 'mesureImmediate', label: 'Mesure immédiate prise', type: 'textarea', full: true },
      { k: 'photos', label: 'Photos du lieu, du matériel, des dégâts', type: 'photos', full: true },
      { k: 'statut', label: 'Statut', type: 'select', options: ['Déclaré', 'En analyse', 'Actions en cours', 'Clôturé'], def: () => 'Déclaré' }
    ],
    cols: [
      { k: 'ref', label: 'Réf.', cls: 'ref' }, { k: 'date', label: 'Date', fmt: fmtDate },
      { k: 'type', label: 'Type', html: o => badge(o.type, o.type === 'Accident de travail' ? 'red' : o.type.startsWith('Incident') ? 'orange' : '') },
      { k: 'titre', label: 'Titre' }, { k: 'site', label: 'Site', fmt: siteName },
      { k: 'gravite', label: 'Gravité', html: o => badge(o.gravite, { 'Mineure': 'green', 'Modérée': 'yellow', 'Grave': 'orange', 'Très grave': 'red' }[o.gravite]) },
      { k: 'statut', label: 'Statut', html: o => badge(o.statut, o.statut === 'Clôturé' ? 'grey' : '') }
    ],
    chips: { k: 'statut', values: ['Déclaré', 'En analyse', 'Actions en cours', 'Clôturé'] },
    filters: ['type'], sort: ['date', -1], detail: true
  },
  actions: {
    titre: 'Plan d\'actions', un: 'une action', prefix: 'AC', icon: '✅',
    fields: [
      { k: 'titre', label: 'Action à mener', required: true, full: true },
      { k: 'type', label: 'Type', type: 'select', options: ['Corrective', 'Préventive', 'Amélioration', 'Curative'], def: () => 'Corrective' },
      SITE,
      { k: 'responsable', label: 'Responsable', type: 'personne', required: true },
      { k: 'echeance', label: 'Échéance', type: 'date', required: true, def: () => addDays(today(), 30) },
      { k: 'priorite', label: 'Priorité', type: 'select', options: ['Basse', 'Normale', 'Haute'], def: () => 'Normale' },
      { k: 'statut', label: 'Statut', type: 'select', options: ['À faire', 'En cours', 'Réalisée', 'Efficace', 'Inefficace'], def: () => 'À faire' },
      { k: 'description', label: 'Détails', type: 'textarea', full: true },
      { k: 'dateRealisation', label: 'Date de réalisation', type: 'date', showIf: o => !ACTION_OUVERTE.includes(o.statut) },
      { k: 'efficacite', label: 'Vérification de l\'efficacité', type: 'textarea', full: true, showIf: o => ['Réalisée', 'Efficace', 'Inefficace'].includes(o.statut), hint: 'Comment avez-vous vérifié que le problème ne se reproduit pas ?' },
      { k: 'photos', label: 'Photos (avant / après, preuve de réalisation)', type: 'photos', full: true }
    ],
    cols: [
      { k: 'ref', label: 'Réf.', cls: 'ref' }, { k: 'titre', label: 'Action' },
      { k: 'origine', label: 'Origine', html: o => origineLink(o) },
      { k: 'responsable', label: 'Responsable', fmt: personName },
      { k: 'echeance', label: 'Échéance', html: o => `${fmtDate(o.echeance)} ${actionLate(o) ? badge('En retard', 'red') : ''}` },
      { k: 'statut', label: 'Statut', html: o => badge(o.statut, { 'À faire': '', 'En cours': 'yellow', 'Réalisée': 'green', 'Efficace': 'green', 'Inefficace': 'red' }[o.statut]) }
    ],
    chips: { k: 'statut', values: ['À faire', 'En cours', 'Réalisée', 'Efficace', 'Inefficace'], extra: [{ id: 'retard', label: 'En retard', test: actionLate }, { id: 'miennes', label: 'Mes actions', visible: () => !!MODE.user?.personne, test: o => o.responsable === MODE.user?.personne }] },
    filters: ['type', 'responsable'], sort: ['echeance', 1]
  },
  risques: {
    titre: 'Évaluation des risques', un: 'un risque', prefix: 'RI', icon: '🎯',
    fields: [
      SITE,
      { k: 'unite', label: 'Unité de travail', required: true },
      { k: 'activite', label: 'Activité / tâche', full: true },
      { k: 'danger', label: 'Danger', type: 'select', required: true, options: ['Chute de hauteur', 'Chute de plain-pied', 'Manutention manuelle', 'Machines et outils', 'Circulation / engins', 'Électricité', 'Incendie / explosion', 'Produits chimiques', 'Bruit', 'Chaleur', 'Poussières', 'Risques psychosociaux', 'Travail isolé', 'Biologique', 'Aspect environnemental', 'Autre'] },
      { k: 'risque', label: 'Risque (dommage possible)', required: true },
      { k: 'g', label: 'Gravité (1 à 4)', type: 'select', options: ['1', '2', '3', '4'], def: () => '2', hint: '1 = soins légers · 4 = décès ou incapacité' },
      { k: 'p', label: 'Probabilité (1 à 4)', type: 'select', options: ['1', '2', '3', '4'], def: () => '2', hint: '1 = très improbable · 4 = quotidien' },
      { k: 'mesures', label: 'Mesures de prévention existantes', type: 'textarea', full: true },
      { k: 'gRes', label: 'Gravité résiduelle', type: 'select', options: ['', '1', '2', '3', '4'] },
      { k: 'pRes', label: 'Probabilité résiduelle', type: 'select', options: ['', '1', '2', '3', '4'] }
    ],
    cols: [
      { k: 'ref', label: 'Réf.', cls: 'ref' }, { k: 'site', label: 'Site', fmt: siteName },
      { k: 'unite', label: 'Unité de travail' }, { k: 'danger', label: 'Danger' }, { k: 'risque', label: 'Risque' },
      { k: 'crit', label: 'Brut', val: o => crit(o.g, o.p), html: o => critBadge(crit(o.g, o.p)) },
      { k: 'critRes', label: 'Résiduel', val: o => crit(o.gRes, o.pRes), html: o => o.gRes && o.pRes ? critBadge(crit(o.gRes, o.pRes)) : '<span class="muted">—</span>' },
      { k: 'nbActions', label: 'Actions', cls: 'num', val: o => actionsFor('risque', o.id).length }
    ],
    filters: ['danger', 'unite'], sort: ['crit', -1]
  },
  audits: {
    titre: 'Audits et inspections', un: 'un audit', prefix: 'AU', icon: '📋',
    fields: [
      { k: 'modele', label: 'Grille', type: 'modele', required: true },
      SITE,
      { k: 'date', label: 'Date prévue', type: 'date', required: true, def: today },
      { k: 'auditeur', label: 'Auditeur', type: 'personne', required: true },
      { k: 'type', label: 'Type', type: 'select', options: ['Audit interne', 'Inspection terrain', 'Visite de sécurité', 'Audit fournisseur'], def: () => 'Audit interne' },
      { k: 'perimetre', label: 'Périmètre / processus audité', full: true },
      { k: 'statut', label: 'Statut', type: 'select', options: ['Planifié', 'En cours', 'Terminé'], def: () => 'Planifié' }
    ],
    cols: [
      { k: 'ref', label: 'Réf.', cls: 'ref' }, { k: 'date', label: 'Date', fmt: fmtDate },
      { k: 'modele', label: 'Grille', fmt: id => DB.get('modeles', id)?.nom || '—' }, { k: 'type', label: 'Type' },
      { k: 'site', label: 'Site', fmt: siteName }, { k: 'auditeur', label: 'Auditeur', fmt: personName },
      { k: 'score', label: 'Score', cls: 'num', val: o => auditScore(o).score ?? -1, html: o => { const s = auditScore(o).score; return s == null ? '<span class="muted">—</span>' : badge(s + ' %', s >= 85 ? 'green' : s >= 65 ? 'yellow' : 'red'); } },
      { k: 'nc', label: 'NC', cls: 'num', val: o => auditScore(o).nc },
      { k: 'statut', label: 'Statut', html: o => badge(o.statut, o.statut === 'Terminé' ? 'green' : o.statut === 'En cours' ? 'yellow' : (o.date < today() ? 'red' : '')) }
    ],
    chips: { k: 'statut', values: ['Planifié', 'En cours', 'Terminé'] },
    filters: ['type'], sort: ['date', -1], detail: true
  },
  documents: {
    titre: 'Documents', un: 'un document', prefix: 'DOC', icon: '📄',
    fields: [
      { k: 'code', label: 'Code', hint: 'Ex. PR-SST-04', required: true },
      { k: 'typeDoc', label: 'Type', type: 'select', options: ['Politique', 'Manuel', 'Procédure', 'Mode opératoire', 'Instruction', 'Formulaire', 'Enregistrement', 'Plan d\'urgence', 'Fiche de données de sécurité'], def: () => 'Procédure' },
      { k: 'titre', label: 'Titre', required: true, full: true },
      { k: 'processus', label: 'Processus', type: 'select', options: ['Direction', 'Qualité', 'Santé-sécurité', 'Environnement', 'Production', 'Achats', 'Ressources humaines', 'Maintenance', 'Commercial'] },
      { k: 'version', label: 'Version', def: () => '1' },
      { k: 'statut', label: 'Statut', type: 'select', options: ['Brouillon', 'En vérification', 'Approuvé', 'Obsolète'], def: () => 'Brouillon' },
      { k: 'redacteur', label: 'Rédacteur', type: 'personne' },
      { k: 'approbateur', label: 'Approbateur', type: 'personne' },
      { k: 'dateApprobation', label: 'Date d\'approbation', type: 'date' },
      { k: 'prochaineRevue', label: 'Prochaine revue', type: 'date', def: () => addMonths(today(), 12) },
      { k: 'lien', label: 'Lien vers le fichier (Drive, SharePoint…)', type: 'url', full: true },
      { k: 'fichier', label: 'Ou joindre le fichier (1 Mo max)', type: 'file', full: true },
      { k: 'modifs', label: 'Objet de la dernière modification', type: 'textarea', full: true }
    ],
    cols: [
      { k: 'code', label: 'Code', cls: 'ref' }, { k: 'titre', label: 'Titre' }, { k: 'typeDoc', label: 'Type' },
      { k: 'processus', label: 'Processus' }, { k: 'version', label: 'Vers.', cls: 'num' },
      { k: 'statut', label: 'Statut', html: o => badge(o.statut, { 'Brouillon': 'grey', 'En vérification': 'yellow', 'Approuvé': 'green', 'Obsolète': 'grey' }[o.statut]) },
      { k: 'prochaineRevue', label: 'Revue', html: o => { const s = docRevueState(o); return `${fmtDate(o.prochaineRevue)} ${s.etat !== 'ok' ? badge(s.txt, s.cls) : ''}`; } },
      { k: 'f', label: '', val: () => '', html: o => urlFichier(o.fichier) || o.lien ? '📎' : '' }
    ],
    chips: { k: 'statut', values: ['Brouillon', 'En vérification', 'Approuvé', 'Obsolète'], extra: [{ id: 'revue', label: 'Revue à faire', test: o => docRevueState(o).etat !== 'ok' }] },
    filters: ['typeDoc', 'processus'], sort: ['code', 1]
  },
  personnel: {
    titre: 'Personnel', un: 'une personne', icon: '👷',
    fields: [
      { k: 'nom', label: 'Nom et prénom', required: true }, { k: 'matricule', label: 'Matricule' },
      { k: 'poste', label: 'Poste' }, SITE,
      { k: 'service', label: 'Service' }, { k: 'telephone', label: 'Téléphone', type: 'tel' },
      { k: 'email', label: 'E-mail (alertes)', type: 'email' },
      { k: 'whatsapp', label: 'WhatsApp (alertes)', type: 'tel', hint: 'Format international conseillé : +225 07 01 02 03 04' },
      { k: 'dateEmbauche', label: 'Date d\'embauche', type: 'date' },
      { k: 'actif', label: 'Situation', type: 'select', options: ['Actif', 'Parti'], def: () => 'Actif' }
    ],
    cols: [
      { k: 'matricule', label: 'Matricule', cls: 'ref' }, { k: 'nom', label: 'Nom' }, { k: 'poste', label: 'Poste' },
      { k: 'service', label: 'Service' }, { k: 'site', label: 'Site', fmt: siteName },
      { k: 'hab', label: 'Habilitations', val: o => DB.all('formations').filter(f => f.personne === o.id).length, cls: 'num' },
      { k: 'alerte', label: 'État', val: o => persoAlertes(o.id), html: o => { const n = persoAlertes(o.id); return n ? badge(`${n} à renouveler`, 'orange') : badge('À jour', 'green'); } }
    ],
    filters: ['service', 'actif'], sort: ['nom', 1]
  },
  formations: {
    titre: 'Formations et habilitations', un: 'une formation', icon: '🎓',
    fields: [
      { k: 'personne', label: 'Personne', type: 'personne', required: true },
      { k: 'categorie', label: 'Catégorie', type: 'select', options: ['Formation', 'Habilitation', 'Autorisation de conduite', 'Visite médicale', 'Certificat'], def: () => 'Formation' },
      { k: 'intitule', label: 'Intitulé', required: true, full: true, list: 'formations-types' },
      { k: 'organisme', label: 'Organisme' },
      { k: 'dateObtention', label: 'Date d\'obtention', type: 'date', def: today },
      { k: 'dateExpiration', label: 'Date d\'expiration', type: 'date', hint: 'Laissez vide si pas de recyclage' },
      { k: 'fichier', label: 'Attestation (1 Mo max)', type: 'file', full: true }
    ],
    cols: [
      { k: 'personne', label: 'Personne', fmt: personName }, { k: 'categorie', label: 'Catégorie' }, { k: 'intitule', label: 'Intitulé' },
      { k: 'dateObtention', label: 'Obtenue le', fmt: fmtDate }, { k: 'dateExpiration', label: 'Expire le', fmt: fmtDate },
      { k: 'etat', label: 'État', val: o => echeanceState(o.dateExpiration).etat, html: o => { const s = echeanceState(o.dateExpiration); return badge(o.dateExpiration ? s.txt : 'Permanent', o.dateExpiration ? s.cls : 'grey'); } }
    ],
    chips: { k: '_etat', values: [], extra: [{ id: 'expire', label: 'Expirées', test: o => echeanceState(o.dateExpiration).etat === 'expire' }, { id: 'bientot', label: 'À renouveler sous 60 j', test: o => echeanceState(o.dateExpiration).etat === 'bientot' }] },
    filters: ['categorie', 'intitule'], sort: ['dateExpiration', 1], siteVia: o => DB.get('personnel', o.personne)?.site
  },
  exigences: {
    titre: 'Veille réglementaire', un: 'une exigence', prefix: 'EX', icon: '⚖️',
    fields: [
      { k: 'texte', label: 'Texte de référence', required: true, full: true, hint: 'Loi, décret, arrêté, norme, exigence client…' },
      { k: 'domaine', label: 'Domaine', type: 'select', options: ['Santé-sécurité', 'Environnement', 'Qualité', 'Social', 'Sûreté'], def: () => 'Santé-sécurité' },
      { k: 'theme', label: 'Thème', hint: 'Ex. incendie, déchets, électricité' },
      { k: 'exigence', label: 'Ce qui est exigé', type: 'textarea', full: true, required: true },
      { k: 'applicable', label: 'Applicable', type: 'select', options: ['Oui', 'Non', 'À vérifier'], def: () => 'Oui' },
      { k: 'conformite', label: 'Conformité', type: 'select', options: ['À évaluer', 'Conforme', 'Partiellement conforme', 'Non conforme'], def: () => 'À évaluer' },
      { k: 'derniereEvaluation', label: 'Dernière évaluation', type: 'date' },
      { k: 'responsable', label: 'Responsable', type: 'personne' },
      { k: 'preuve', label: 'Preuve de conformité', type: 'textarea', full: true }
    ],
    cols: [
      { k: 'ref', label: 'Réf.', cls: 'ref' }, { k: 'texte', label: 'Texte' }, { k: 'domaine', label: 'Domaine' }, { k: 'theme', label: 'Thème' },
      { k: 'conformite', label: 'Conformité', html: o => o.applicable === 'Non' ? badge('Non applicable', 'grey') : badge(o.conformite, { 'Conforme': 'green', 'Partiellement conforme': 'yellow', 'Non conforme': 'red', 'À évaluer': 'grey' }[o.conformite]) },
      { k: 'derniereEvaluation', label: 'Évaluée le', fmt: fmtDate }
    ],
    chips: { k: 'conformite', values: ['À évaluer', 'Conforme', 'Partiellement conforme', 'Non conforme'] },
    filters: ['domaine', 'theme'], sort: ['texte', 1]
  },
  heures: {
    titre: 'Heures travaillées', un: 'un mois', icon: '⏱️',
    fields: [
      { k: 'mois', label: 'Mois', type: 'month', required: true, def: () => today().slice(0, 7) }, SITE,
      { k: 'heures', label: 'Heures travaillées', type: 'number', required: true, hint: 'Effectif × heures par personne sur le mois' },
      { k: 'effectif', label: 'Effectif moyen', type: 'number' }
    ],
    cols: [
      { k: 'mois', label: 'Mois', fmt: fmtMonth }, { k: 'site', label: 'Site', fmt: siteName },
      { k: 'heures', label: 'Heures', cls: 'num', fmt: v => nf(+v) }, { k: 'effectif', label: 'Effectif', cls: 'num' }
    ],
    sort: ['mois', -1]
  },
  sites: {
    titre: 'Sites', un: 'un site', icon: '🏭',
    fields: [{ k: 'nom', label: 'Nom du site', required: true, full: true }, { k: 'ville', label: 'Ville' }, { k: 'responsable', label: 'Responsable QHSE', type: 'personne' }],
    cols: [{ k: 'nom', label: 'Site' }, { k: 'ville', label: 'Ville' }, { k: 'responsable', label: 'Responsable QHSE', fmt: personName }],
    sort: ['nom', 1]
  }
};

const NAV = [
  ['Pilotage', [['dashboard', '📊', 'Tableau de bord'], ['indicateurs', '📈', 'Indicateurs']]],
  ['Terrain', [['evenements', '⚠️', 'Événements'], ['risques', '🎯', 'Risques'], ['audits', '📋', 'Audits et inspections']]],
  ['Amélioration', [['actions', '✅', 'Plan d\'actions']]],
  ['Système', [['documents', '📄', 'Documents'], ['exigences', '⚖️', 'Veille réglementaire'], ['personnel', '👷', 'Personnel'], ['formations', '🎓', 'Formations']]],
  ['Réglages', [['heures', '⏱️', 'Heures travaillées'], ['modeles', '🧩', 'Grilles d\'audit'], ['sites', '🏭', 'Sites'], ['parametres', '⚙️', 'Données']]]
];

/* ───────────── Liens entre fiches ───────────── */
const actionsFor = (type, id) => DB.all('actions').filter(a => a.origine?.type === type && a.origine.id === id);
function origineLink(a) {
  const o = a.origine; if (!o) return '<span class="muted">Manuelle</span>';
  const map = { evenement: ['evenements', 'Événement'], audit: ['audits', 'Audit'], risque: ['risques', 'Risque'], exigence: ['exigences', 'Exigence'] };
  const [col, lbl] = map[o.type] || [];
  const src = col && DB.get(col, o.id);
  if (!src) return `<span class="muted">${esc(lbl || '—')}</span>`;
  const route = MODULES[col].detail ? `#/${col}/${src.id}` : `#/${col}?ouvrir=${src.id}`;
  return `<a href="${route}" onclick="event.stopPropagation()">${esc(lbl)} ${esc(src.ref || '')}</a>`;
}
const persoAlertes = pid => DB.all('formations').filter(f => f.personne === pid && echeanceState(f.dateExpiration).etat !== 'ok').length;

/* ───────────── Alertes ───────────── */
const computeAlerts = () => Regles.alertes(DB.d, currentSite());
function renderAlertBadge() {
  const n = computeAlerts().length;
  $('#alertCount').textContent = n ? (n > 99 ? '99+' : n) : '';
}
function openAlerts() {
  const al = computeAlerts(), d = $('#alertDrawer');
  d.innerHTML = `<div class="card-head"><h2>Alertes (${al.length})</h2><button class="btn small" id="closeDrawer">Fermer</button></div>
    ${al.length ? al.map((a, i) => `<div class="alert-item" data-i="${i}"><span class="dot" style="background:var(--${a.niv})"></span><div><b>${esc(a.txt)}</b><div class="small muted">${esc(a.sub)}</div></div></div>`).join('') : '<div class="empty">Aucune alerte. Tout est à jour 👍</div>'}`;
  d.hidden = false;
  $('#closeDrawer').onclick = () => d.hidden = true;
  $$('.alert-item', d).forEach(el => el.onclick = () => { d.hidden = true; location.hash = al[+el.dataset.i].go; });
}

/* ───────────── Photos et pièces jointes ───────────── */
const urlFichier = f => f?.url || f?.data || '';
const MAX_FICHIER = () => MODE.serveur ? 10 * 1024 * 1024 : 1024 * 1024;
const readFile = file => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file); });
/* Réduit une photo (1600 px en mode serveur, 1024 px en local) et la convertit en JPEG : une photo de téléphone
   de 4 Mo passe à 200–400 Ko, ce qui compte sur les réseaux mobiles. */
async function compresserImage(file) {
  const max = MODE.serveur ? 1600 : 1024, qualite = MODE.serveur ? 0.82 : 0.7;
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
    const k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL('image/jpeg', qualite);
  } finally { URL.revokeObjectURL(url); }
}
async function lirePhotos(fileList) {
  const out = [];
  for (const f of [...fileList]) {
    if (!f.type.startsWith('image/')) { toast(`${f.name} n'est pas une image`); continue; }
    try { out.push({ id: uid(), nom: f.name.replace(/\.\w+$/, '') + '.jpg', data: await compresserImage(f), quand: new Date().toISOString() }); }
    catch (e) { toast(`Impossible de lire ${f.name}`); }
  }
  return out;
}
function galerie(photos = [], { editable = false } = {}) {
  return `<div class="photos">${photos.map(p => `<figure><a href="${esc(urlFichier(p))}" target="_blank" rel="noopener"><img src="${esc(urlFichier(p))}" alt="${esc(p.nom || 'photo')}" loading="lazy"></a>${editable ? `<button type="button" class="ph-del" data-ph-del="${esc(p.id)}" aria-label="Retirer la photo">✕</button>` : ''}</figure>`).join('')}
    ${editable ? `<label class="ph-add" title="Prendre ou ajouter des photos">📷<span>Photo</span><input type="file" accept="image/*" capture="environment" multiple data-ph-add hidden></label>` : ''}</div>`;
}
/* Branche une galerie éditable : `get()` renvoie la liste, `set(liste)` l'enregistre et redessine. */
function brancherGalerie(el, get, set) {
  const add = $('[data-ph-add]', el);
  if (add) add.onchange = async () => { const n = await lirePhotos(add.files); if (n.length) set([...(get() || []), ...n]); };
  $$('[data-ph-del]', el).forEach(b => b.onclick = e => { e.preventDefault(); if (confirm('Retirer cette photo ?')) set((get() || []).filter(p => p.id !== b.dataset.phDel)); });
}

/* ───────────── Formulaire générique ───────────── */
function fieldInput(f, v) {
  const name = `name="${f.k}" ${f.required ? 'required' : ''}`;
  const opts = (list, withEmpty = true) => (withEmpty ? '<option value=""></option>' : '') + list.map(([val, lbl]) => `<option value="${esc(val)}" ${String(v ?? '') === String(val) ? 'selected' : ''}>${esc(lbl)}</option>`).join('');
  switch (f.type) {
    case 'textarea': return `<textarea ${name}>${esc(v)}</textarea>`;
    case 'select': return `<select ${name}>${opts(f.options.map(o => [o, o]), !f.def && !f.options.includes(''))}</select>`;
    case 'site': return `<select ${name}>${opts(DB.all('sites').map(s => [s.id, s.nom]))}</select>`;
    case 'personne': return `<select ${name}>${opts(DB.all('personnel').filter(p => p.actif !== 'Parti' || p.id === v).sort((a, b) => a.nom.localeCompare(b.nom)).map(p => [p.id, p.nom]))}</select>`;
    case 'modele': return `<select ${name}>${opts(DB.all('modeles').map(m => [m.id, m.nom]))}</select>`;
    case 'file': return `<input type="file" name="${f.k}">${v?.nom ? `<div class="hint">Fichier actuel : <a href="${esc(urlFichier(v))}" target="_blank" rel="noopener" download="${esc(v.nom)}">${esc(v.nom)}</a> — <label><input type="checkbox" name="${f.k}__suppr"> supprimer</label></div>` : ''}`;
    case 'photos': return `<div data-photos="${f.k}"></div>`;
    case 'number': return `<input type="number" min="0" step="any" ${name} value="${esc(v)}">`;
    default: return `<input type="${f.type || 'text'}" ${name} value="${esc(v)}" ${f.list ? `list="${f.list}"` : ''}>`;
  }
}
const majTexte = o => o?._maj ? `Modifié par ${o._maj.par} le ${new Date(o._maj.quand).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}` : '';

function openForm(col, obj, defaults = {}, onSaved) {
  const m = MODULES[col], isNew = !obj, ecriture = peut(col);
  const o = obj ? JSON.parse(JSON.stringify(obj)) : { ...defaults };
  if (isNew) m.fields.forEach(f => { if (o[f.k] === undefined && f.def) o[f.k] = f.def(); });
  const moi = MODE.user?.personne;
  if (isNew && m.fields.some(f => f.k === 'site') && !o.site) o.site = currentSite() || DB.get('personnel', moi)?.site || DB.all('sites')[0]?.id || '';
  if (isNew && moi && col === 'evenements' && !o.declarant) o.declarant = moi;
  if (isNew && moi && col === 'audits' && !o.auditeur) o.auditeur = moi;
  const photos = Object.fromEntries(m.fields.filter(f => f.type === 'photos').map(f => [f.k, [...(o[f.k] || [])]]));
  const box = $('#modalBox');
  box.innerHTML = `<form novalidate>
    <header><div><h2>${isNew ? 'Ajouter ' + m.un : esc(o.ref || o.code || o.nom || o.titre || 'Modifier')}</h2>${majTexte(o) ? `<div class="small muted">${esc(majTexte(o))}</div>` : ''}</div><button type="button" class="icon-btn" data-close aria-label="Fermer">✕</button></header>
    <div class="body">${!ecriture ? '<div class="full lecture">Lecture seule : votre rôle ne permet pas de modifier ces fiches.</div>' : ''}${m.fields.map(f => `<label class="${f.full ? 'full' : ''}" data-field="${f.k}"><span>${esc(f.label)}${f.required ? ' <em>*</em>' : ''}</span>${fieldInput(f, o[f.k])}${f.hint ? `<div class="hint">${esc(f.hint)}</div>` : ''}</label>`).join('')}
    ${col === 'formations' ? `<datalist id="formations-types">${[...new Set(DB.all('formations').map(f => f.intitule).concat(['Sauveteur secouriste du travail (SST)', 'Habilitation électrique B1V', 'Travail en hauteur', 'Conduite de chariot élévateur', 'Équipier de première intervention (EPI incendie)', 'Gestes et postures', 'Visite médicale périodique']))].map(x => `<option value="${esc(x)}">`).join('')}</datalist>` : ''}
    </div>
    <footer>${!isNew && peutSuppr(col) ? '<button type="button" class="btn danger left" data-del>Supprimer</button>' : ''}${!isNew && ['evenements', 'risques', 'exigences'].includes(col) && peut('actions') ? '<button type="button" class="btn" data-action>+ Action</button>' : ''}<button type="button" class="btn" data-close>${ecriture ? 'Annuler' : 'Fermer'}</button>${ecriture ? '<button class="btn primary">Enregistrer</button>' : ''}</footer>
  </form>`;
  const form = $('form', box);
  const dessinerPhotos = k => { const el = $(`[data-photos="${k}"]`, form); el.innerHTML = galerie(photos[k], { editable: ecriture }); brancherGalerie(el, () => photos[k], l => { photos[k] = l; dessinerPhotos(k); }); };
  Object.keys(photos).forEach(dessinerPhotos);
  if (!ecriture) $$('input,select,textarea', form).forEach(el => el.disabled = true);
  const values = () => { const v = { ...o }; m.fields.forEach(f => { const el = form.elements[f.k]; if (el && f.type !== 'file' && f.type !== 'photos') v[f.k] = el.value; }); return v; };
  const applyShow = () => { const v = values(); m.fields.forEach(f => { if (f.showIf) $(`[data-field="${f.k}"]`, form).hidden = !f.showIf(v); }); };
  form.addEventListener('input', applyShow); form.addEventListener('change', applyShow); applyShow();
  $$('[data-close]', box).forEach(b => b.onclick = closeModal);
  const del = $('[data-del]', box);
  if (del) del.onclick = () => {
    if (!confirm('Supprimer définitivement cette fiche ?')) return;
    DB.remove(col, o.id); closeModal(); toast('Fiche supprimée'); route();
  };
  const act = $('[data-action]', box);
  if (act) act.onclick = () => { closeModal(); newActionFrom(col, o); };
  form.onsubmit = async e => {
    e.preventDefault();
    if (!ecriture) return;
    const v = values();
    const missing = m.fields.filter(f => f.required && !(f.showIf && !f.showIf(v)) && !String(v[f.k] ?? '').trim());
    $$('[data-field] [name]', form).forEach(el => el.style.borderColor = '');
    if (missing.length) {
      missing.forEach(f => $(`[data-field="${f.k}"] [name]`, form).style.borderColor = 'var(--red)');
      toast(`Champ obligatoire : ${missing.map(f => f.label).join(', ')}`); return;
    }
    for (const f of m.fields.filter(f => f.type === 'file')) {
      const inp = form.elements[f.k], file = inp.files?.[0];
      if (form.elements[f.k + '__suppr']?.checked) v[f.k] = null;
      if (file) {
        if (file.size > MAX_FICHIER()) { toast(`Fichier trop lourd (${MODE.serveur ? 10 : 1} Mo max). Mettez plutôt un lien.`); return; }
        v[f.k] = { id: uid(), nom: file.name, data: await readFile(file) };
      }
    }
    Object.assign(v, photos);
    m.fields.forEach(f => { if (f.showIf && !f.showIf(v)) delete v[f.k]; });
    if (isNew) { v.id = uid(); v.cree = today(); if (m.prefix && !v.ref) DB.attribuerRef(v, m.prefix); }
    if (col === 'actions' && !ACTION_OUVERTE.includes(v.statut) && !v.dateRealisation) v.dateRealisation = today();
    if (col === 'documents' && obj && obj.version !== v.version && v.statut === 'Approuvé') { v.historique = [...(obj.historique || []), { version: obj.version, date: obj.dateApprobation, modifs: obj.modifs }]; }
    DB.upsert(col, v); closeModal(); toast(isNew ? 'Fiche créée' : 'Modifications enregistrées');
    if (onSaved) onSaved(v); else route();
  };
  openModal();
  setTimeout(() => form.querySelector('input:not([type=file]):not(:disabled),select:not(:disabled),textarea:not(:disabled)')?.focus(), 30);
}
function newActionFrom(col, src, extra = {}) {
  const type = { evenements: 'evenement', risques: 'risque', exigences: 'exigence', audits: 'audit' }[col];
  openForm('actions', null, {
    origine: { type, id: src.id }, site: src.site || currentSite() || DB.all('sites')[0]?.id,
    type: col === 'risques' ? 'Préventive' : 'Corrective',
    responsable: src.responsable || '', ...extra
  }, () => {
    if (col === 'evenements' && peut('evenements')) {
      const e = DB.get('evenements', src.id);
      if (e && ['Déclaré', 'En analyse'].includes(e.statut)) DB.upsert('evenements', { ...e, statut: 'Actions en cours' });
    }
    route();
  });
}
function openModal() { $('#modal').hidden = false; document.body.style.overflow = 'hidden'; }
function closeModal() { $('#modal').hidden = true; document.body.style.overflow = ''; setTimeout(rafraichirSiInactif, 0); }

/* ───────────── Liste générique ───────────── */
const listState = {};
function renderList(col, opts = {}) {
  const m = MODULES[col];
  const st = listState[col] ||= { q: '', chip: '', filters: {}, sort: m.sort || [m.cols[0].k, 1] };
  let rows = DB.all(col);
  if (currentSite()) rows = rows.filter(o => m.siteVia ? m.siteVia(o) === currentSite() : (!('site' in o) || o.site === currentSite()));
  if (opts.prefilter) rows = rows.filter(opts.prefilter);
  const base = rows;
  if (st.chip) {
    const ex = m.chips?.extra?.find(x => x.id === st.chip);
    rows = rows.filter(o => ex ? ex.test(o) : o[m.chips.k] === st.chip);
  }
  Object.entries(st.filters).forEach(([k, v]) => { if (v) rows = rows.filter(o => String(o[k] ?? '') === v); });
  if (st.q) {
    const q = st.q.toLowerCase();
    rows = rows.filter(o => m.cols.some(c => String(c.fmt ? c.fmt(o[c.k]) : (c.val ? c.val(o) : o[c.k] ?? '')).toLowerCase().includes(q)) || (o.description || '').toLowerCase().includes(q));
  }
  const [sk, sd] = st.sort, sc = m.cols.find(c => c.k === sk);
  const sv = o => sc?.val ? sc.val(o) : (sc?.fmt && !['date', 'echeance', 'mois'].includes(sk) && !/^date/.test(sk) ? sc.fmt(o[sk]) : o[sk]);
  rows = [...rows].sort((a, b) => { const x = sv(a) ?? '', y = sv(b) ?? ''; return (typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y), 'fr', { numeric: true })) * sd; });

  const filterSel = k => {
    const f = m.fields.find(f => f.k === k);
    const vals = [...new Set(base.map(o => o[k]).filter(Boolean))];
    const lbl = v => f?.type === 'personne' ? personName(v) : v;
    return `<select data-filter="${k}"><option value="">${esc(f?.label || k)} : tous</option>${vals.sort((a, b) => String(lbl(a)).localeCompare(String(lbl(b)), 'fr')).map(v => `<option value="${esc(v)}" ${st.filters[k] === v ? 'selected' : ''}>${esc(lbl(v))}</option>`).join('')}</select>`;
  };
  const chipCount = (test) => base.filter(test).length;
  const html = `
    <div class="toolbar">
      <div class="grow"><input type="search" placeholder="Rechercher…" value="${esc(st.q)}" data-q></div>
      ${(m.filters || []).map(filterSel).join('')}
      <button class="btn" data-csv>Exporter CSV</button>
      ${peut(col) ? '<button class="btn primary" data-new>+ Ajouter</button>' : ''}
    </div>
    ${m.chips ? `<div class="chips"><button class="chip ${!st.chip ? 'on' : ''}" data-chip="">Tous (${base.length})</button>
      ${m.chips.values.map(v => `<button class="chip ${st.chip === v ? 'on' : ''}" data-chip="${esc(v)}">${esc(v)} (${chipCount(o => o[m.chips.k] === v)})</button>`).join('')}
      ${(m.chips.extra || []).filter(x => !x.visible || x.visible()).map(x => `<button class="chip ${st.chip === x.id ? 'on' : ''}" data-chip="${x.id}">${esc(x.label)} (${chipCount(x.test)})</button>`).join('')}</div>` : ''}
    ${rows.length ? `<div class="table-wrap"><table><thead><tr>${m.cols.map(c => `<th data-sort="${c.k}" class="${c.cls === 'num' ? 'num' : ''} ${sk === c.k ? 'sorted' + (sd > 0 ? ' asc' : '') : ''}">${esc(c.label)}</th>`).join('')}</tr></thead>
      <tbody>${rows.map(o => `<tr data-id="${o.id}">${m.cols.map(c => `<td class="${c.cls || ''}">${c.html ? c.html(o) : esc(c.fmt ? c.fmt(o[c.k]) : (c.val ? c.val(o) : o[c.k] ?? ''))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      <div class="list-count">${rows.length} fiche${rows.length > 1 ? 's' : ''}</div>`
      : `<div class="card empty">Aucune fiche${st.q || st.chip ? ' pour ce filtre' : ''}. ${peut(col) ? `<br><br><button class="btn primary" data-new>+ Ajouter ${m.un}</button>` : ''}</div>`}`;
  const wrap = document.createElement('div'); wrap.innerHTML = html;
  const rerender = () => route();
  $('[data-q]', wrap)?.addEventListener('input', e => { st.q = e.target.value; clearTimeout(st.t); st.t = setTimeout(() => { rerender(); const i = $('[data-q]'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }, 250); });
  $$('[data-filter]', wrap).forEach(s => s.onchange = () => { st.filters[s.dataset.filter] = s.value; rerender(); });
  $$('[data-chip]', wrap).forEach(b => b.onclick = () => { st.chip = b.dataset.chip; rerender(); });
  $$('[data-sort]', wrap).forEach(th => th.onclick = () => { st.sort = [th.dataset.sort, st.sort[0] === th.dataset.sort ? -st.sort[1] : 1]; rerender(); });
  $$('[data-new]', wrap).forEach(b => b.onclick = () => openForm(col, null, opts.defaults || {}));
  $('[data-csv]', wrap).onclick = () => exportCSV(col, rows);
  $$('tbody tr', wrap).forEach(tr => tr.onclick = () => m.detail ? location.hash = `#/${col}/${tr.dataset.id}` : openForm(col, DB.get(col, tr.dataset.id)));
  return wrap;
}

function exportCSV(col, rows) {
  const m = MODULES[col];
  const fields = m.fields.filter(f => f.type !== 'file');
  const cell = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const val = (f, o) => f.type === 'site' ? siteName(o[f.k]) : f.type === 'personne' ? personName(o[f.k]) : f.type === 'modele' ? DB.get('modeles', o[f.k])?.nom : o[f.k];
  const head = (m.prefix ? ['Référence'] : []).concat(fields.map(f => f.label));
  const lines = [head.map(cell).join(';')].concat(rows.map(o => (m.prefix ? [o.ref] : []).concat(fields.map(f => val(f, o))).map(cell).join(';')));
  download(`${col}-${today()}.csv`, '﻿' + lines.join('\r\n'), 'text/csv;charset=utf-8');
}
function download(name, content, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type })); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/* ───────────── Graphiques (SVG simple) ───────────── */
function lastMonths(n) {
  const out = [], d = new Date(); d.setDate(1);
  for (let i = n - 1; i >= 0; i--) { const x = new Date(d.getFullYear(), d.getMonth() - i, 1); out.push(`${x.getFullYear()}-${pad(x.getMonth() + 1)}`); }
  return out;
}
function barChart(labels, series, { h = 180, line } = {}) {
  // series : [{ nom, couleur, valeurs[] }] empilées ; line : { nom, couleur, valeurs[] } sur un 2e axe
  const W = 640, H = h, L = 30, R = line ? 34 : 8, T = 10, B = 24;
  const tot = labels.map((_, i) => series.reduce((s, se) => s + (se.valeurs[i] || 0), 0));
  const max = Math.max(1, ...tot), step = (W - L - R) / labels.length, bw = Math.min(28, step * 0.62);
  const y = v => T + (H - T - B) * (1 - v / max);
  let g = '';
  for (let k = 0; k <= 4; k++) { const v = Math.round(max * k / 4); g += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="#E6EAF0"/><text x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${v}</text>`; }
  labels.forEach((lb, i) => {
    let acc = 0; const x = L + i * step + (step - bw) / 2;
    series.forEach(se => { const v = se.valeurs[i] || 0; if (v) g += `<rect x="${x}" y="${y(acc + v)}" width="${bw}" height="${y(acc) - y(acc + v)}" fill="${se.couleur}" rx="2"><title>${esc(se.nom)} : ${v}</title></rect>`; acc += v; });
    g += `<text x="${x + bw / 2}" y="${H - 6}" text-anchor="middle">${esc(lb)}</text>`;
  });
  if (line) {
    const lmax = Math.max(1, ...line.valeurs.filter(Number.isFinite)), ly = v => T + (H - T - B) * (1 - v / lmax);
    const pts = line.valeurs.map((v, i) => Number.isFinite(v) ? `${L + i * step + step / 2},${ly(v)}` : null).filter(Boolean);
    g += `<polyline points="${pts.join(' ')}" fill="none" stroke="${line.couleur}" stroke-width="2.5"/>`;
    line.valeurs.forEach((v, i) => { if (Number.isFinite(v)) g += `<circle cx="${L + i * step + step / 2}" cy="${ly(v)}" r="3.5" fill="${line.couleur}"><title>${esc(line.nom)} : ${nf(v, 1)}</title></circle>`; });
    g += `<text x="${W - R + 6}" y="${T + 8}">${nf(lmax, 0)}</text>`;
  }
  const leg = series.concat(line ? [line] : []).map(s => `<span><i style="background:${s.couleur}"></i>${esc(s.nom)}</span>`).join('');
  return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img">${g}</svg><div class="legend">${leg}</div></div>`;
}
function bars(items, max) {
  max = max || Math.max(1, ...items.map(i => i[1]));
  return items.map(([l, v, color]) => `<div class="bar-row"><span class="lbl" title="${esc(l)}">${esc(l)}</span><span class="trk"><span class="fill" style="display:block;width:${100 * v / max}%;${color ? 'background:' + color : ''}"></span></span><span class="val">${v}</span></div>`).join('') || '<div class="empty">Pas de données</div>';
}

/* ───────────── Indicateurs calculés ───────────── */
function tfTg(months) {
  const ev = bySite(DB.all('evenements')).filter(e => e.type === 'Accident de travail');
  const hrs = bySite(DB.all('heures'));
  return months.map(mo => {
    const h = hrs.filter(x => x.mois === mo).reduce((s, x) => s + (+x.heures || 0), 0);
    const acc = ev.filter(e => e.date?.startsWith(mo));
    const aaa = acc.filter(e => e.arret === 'Oui').length;
    const jp = acc.reduce((s, e) => s + (+e.joursPerdus || 0), 0);
    return { mois: mo, heures: h, accidents: acc.length, aaa, jp, tf: h ? aaa * 1e6 / h : NaN, tg: h ? jp * 1e3 / h : NaN };
  });
}
function sumTf(rows) {
  const h = rows.reduce((s, r) => s + r.heures, 0), a = rows.reduce((s, r) => s + r.aaa, 0), j = rows.reduce((s, r) => s + r.jp, 0);
  return { heures: h, aaa: a, jp: j, tf: h ? a * 1e6 / h : NaN, tg: h ? j * 1e3 / h : NaN };
}
function joursSansAccident() {
  const acc = bySite(DB.all('evenements')).filter(e => e.type === 'Accident de travail' && e.arret === 'Oui').map(e => e.date).sort();
  return acc.length ? daysBetween(acc[acc.length - 1], today()) : null;
}

/* ───────────── Écran : tableau de bord ───────────── */
function renderDashboard() {
  const ev = bySite(DB.all('evenements')), ac = bySite(DB.all('actions')), ri = bySite(DB.all('risques')), au = bySite(DB.all('audits'));
  const y = String(new Date().getFullYear());
  const jsa = joursSansAccident();
  const year = sumTf(tfTg(lastMonths(12).filter(m => m.startsWith(y))));
  const ouvertes = ac.filter(a => ACTION_OUVERTE.includes(a.statut)), retard = ac.filter(actionLate);
  const closedOnTime = ac.filter(a => !ACTION_OUVERTE.includes(a.statut));
  const tauxReal = ac.length ? Math.round(100 * closedOnTime.length / ac.length) : null;
  const finis = au.filter(a => a.statut === 'Terminé' && auditScore(a).score != null);
  const scoreMoy = finis.length ? Math.round(finis.reduce((s, a) => s + auditScore(a).score, 0) / finis.length) : null;
  const ex = DB.all('exigences').filter(e => e.applicable !== 'Non' && e.conformite !== 'À évaluer');
  const conf = ex.length ? Math.round(100 * ex.filter(e => e.conformite === 'Conforme').length / ex.length) : null;
  const critiques = ri.filter(r => critLevel(crit(r.g, r.p)) === 4).length;
  const fo = DB.all('formations').filter(f => !currentSite() || MODULES.formations.siteVia(f) === currentSite());
  const foOk = fo.length ? Math.round(100 * fo.filter(f => echeanceState(f.dateExpiration).etat !== 'expire').length / fo.length) : null;

  const months = lastMonths(12);
  const TYPES = [['Accident de travail', '#D23B3B'], ['Presqu\'accident', '#E8801E'], ['Situation dangereuse', '#E3B417'], ['Incident matériel', '#7B8BB0'], ['Incident environnemental', '#00A078'], ['Non-conformité produit', '#0A2669'], ['Réclamation client', '#9B6BC4']];
  const series = TYPES.map(([t, c]) => ({ nom: t, couleur: c, valeurs: months.map(mo => ev.filter(e => e.type === t && e.date?.startsWith(mo)).length) })).filter(s => s.valeurs.some(Boolean));

  const pyramide = TYPES.slice(0, 3).map(([t, c]) => [t, ev.filter(e => e.type === t && e.date?.startsWith(y)).length, c]);
  const kpi = (v, l, s, cls, href) => `<a class="kpi ${cls || ''}" href="${href}"><div class="v">${v}</div><div class="l">${l}</div>${s ? `<div class="s">${s}</div>` : ''}</a>`;

  const v = document.createElement('div');
  v.innerHTML = `
  <div class="kpis">
    ${kpi(jsa == null ? '—' : nf(jsa), 'Jours sans accident avec arrêt', jsa == null ? 'Aucun accident enregistré' : '', jsa != null && jsa < 30 ? 'bad' : '', '#/evenements')}
    ${kpi(nf(year.tf, 2), 'Taux de fréquence ' + y, `${year.aaa} AAA · ${nf(year.heures)} h`, 'navy', '#/indicateurs')}
    ${kpi(nf(year.tg, 2), 'Taux de gravité ' + y, `${year.jp} jours perdus`, 'navy', '#/indicateurs')}
    ${kpi(ouvertes.length, 'Actions ouvertes', `${retard.length} en retard`, retard.length ? 'bad' : '', '#/actions')}
    ${kpi(tauxReal == null ? '—' : tauxReal + ' %', 'Taux de réalisation des actions', `${closedOnTime.length} / ${ac.length}`, tauxReal != null && tauxReal < 60 ? 'warn' : '', '#/actions')}
    ${kpi(scoreMoy == null ? '—' : scoreMoy + ' %', 'Score moyen des audits', `${finis.length} audit(s) terminé(s)`, scoreMoy != null && scoreMoy < 70 ? 'warn' : '', '#/audits')}
    ${kpi(conf == null ? '—' : conf + ' %', 'Conformité réglementaire', `${ex.length} exigence(s) évaluée(s)`, conf != null && conf < 80 ? 'warn' : '', '#/exigences')}
    ${kpi(critiques, 'Risques critiques', `sur ${ri.length} risques évalués`, critiques ? 'bad' : '', '#/risques')}
    ${kpi(foOk == null ? '—' : foOk + ' %', 'Habilitations valides', `${fo.length} enregistrée(s)`, foOk != null && foOk < 90 ? 'warn' : '', '#/formations')}
  </div>
  <div class="grid g2">
    <div class="card"><div class="card-head"><h2>Événements sur 12 mois</h2><a href="#/evenements" class="small">Tout voir</a></div>${barChart(months.map(fmtMonth), series)}</div>
    <div class="card"><div class="card-head"><h2>Matrice des risques</h2><a href="#/risques" class="small">Ouvrir</a></div>${matrixHtml(ri)}</div>
  </div>
  <div class="grid g3" style="margin-top:16px">
    <div class="card"><div class="card-head"><h2>Actions en retard</h2><a href="#/actions" class="small">Plan d'actions</a></div>
      ${retard.length ? `<ul class="mini">${retard.sort((a, b) => a.echeance.localeCompare(b.echeance)).slice(0, 6).map(a => `<li data-go="#/actions?ouvrir=${a.id}"><span class="t">${esc(a.titre)}<div class="small muted">${esc(personName(a.responsable))}</div></span><span class="d">${badge(daysBetween(a.echeance, today()) + ' j', 'red')}</span></li>`).join('')}</ul>` : '<div class="empty">Aucune action en retard 👍</div>'}</div>
    <div class="card"><div class="card-head"><h2>Derniers événements</h2><a href="#/evenements" class="small">Déclarer</a></div>
      ${ev.length ? `<ul class="mini">${[...ev].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6).map(e => `<li data-go="#/evenements/${e.id}"><span class="t">${esc(e.titre)}<div class="small muted">${esc(e.type)} · ${esc(siteName(e.site))}</div></span><span class="d">${fmtDate(e.date)}</span></li>`).join('')}</ul>` : '<div class="empty">Aucun événement</div>'}</div>
    <div class="card"><div class="card-head"><h2>Pyramide de Bird ${y}</h2></div>
      ${bars(pyramide)}
      <p class="small muted" style="margin-top:12px">Plus on remonte de presqu'accidents et de situations dangereuses, plus on évite d'accidents. Encouragez la déclaration.</p></div>
  </div>`;
  $$('[data-go]', v).forEach(li => li.onclick = () => location.hash = li.dataset.go);
  $$('.matrix .cell', v).forEach(c => c.onclick = () => { listState.risques = { ...(listState.risques || {}), cell: c.dataset.cell }; location.hash = '#/risques'; });
  return v;
}

function matrixHtml(ri, sel, residuel) {
  const count = (g, p) => ri.filter(r => residuel ? (+r.gRes === g && +r.pRes === p) : (+r.g === g && +r.p === p)).length;
  let h = '<div class="matrix">';
  for (let g = 4; g >= 1; g--) {
    h += `<div class="ax" title="Gravité">G${g}</div>`;
    for (let p = 1; p <= 4; p++) { const n = count(g, p); h += `<div class="cell c${critLevel(g * p)} ${n ? '' : 'zero'} ${sel === `${g}-${p}` ? 'sel' : ''}" data-cell="${g}-${p}" title="Gravité ${g} × Probabilité ${p} = ${g * p}">${n || g * p}</div>`; }
  }
  h += '<div></div>' + [1, 2, 3, 4].map(p => `<div class="ax">P${p}</div>`).join('') + '</div>';
  h += `<div class="legend"><span><i class="c1"></i>Faible 1–3</span><span><i class="c2"></i>Moyen 4–6</span><span><i class="c3"></i>Élevé 8–9</span><span><i class="c4"></i>Critique 12–16</span><span>Gros chiffre = nombre de risques ; petit gris = criticité</span></div>`;
  return h;
}

/* ───────────── Écran : risques ───────────── */
function renderRisques() {
  const st = listState.risques ||= { q: '', chip: '', filters: {}, sort: MODULES.risques.sort };
  const ri = bySite(DB.all('risques'));
  const v = document.createElement('div');
  const levels = [4, 3, 2, 1].map(l => [CRIT_LBL[l], ri.filter(r => critLevel(crit(r.g, r.p)) === l).length, ['', '#6FCFA5', '#E3B417', '#E8801E', '#D23B3B'][l]]);
  v.innerHTML = `<div class="grid g2" style="margin-bottom:16px">
    <div class="card"><div class="card-head"><h2>Risques bruts</h2><label class="small"><input type="checkbox" id="resid" ${st.resid ? 'checked' : ''}> Voir le résiduel</label></div>${matrixHtml(ri, st.cell, st.resid)}
    ${st.cell ? `<div style="margin-top:8px"><button class="btn small" id="clearCell">Retirer le filtre de la case ${st.cell.replace('-', ' × ')}</button></div>` : ''}</div>
    <div class="card"><div class="card-head"><h2>Répartition</h2></div>${bars(levels)}
      <h3 style="margin:18px 0 8px">Dangers les plus fréquents</h3>
      ${bars(Object.entries(ri.reduce((m, r) => (m[r.danger] = (m[r.danger] || 0) + 1, m), {})).sort((a, b) => b[1] - a[1]).slice(0, 5))}</div>
  </div>`;
  const [g, p] = (st.cell || '').split('-').map(Number);
  v.append(renderList('risques', st.cell ? { prefilter: r => st.resid ? (+r.gRes === g && +r.pRes === p) : (+r.g === g && +r.p === p) } : {}));
  $$('.matrix .cell', v).forEach(c => c.onclick = () => { st.cell = st.cell === c.dataset.cell ? '' : c.dataset.cell; route(); });
  $('#resid', v).onchange = e => { st.resid = e.target.checked; st.cell = ''; route(); };
  const cc = $('#clearCell', v); if (cc) cc.onclick = () => { st.cell = ''; route(); };
  return v;
}

/* ───────────── Écran : fiche événement ───────────── */
function renderEvenement(id) {
  const e = DB.get('evenements', id);
  if (!e) return notFound();
  const lire = () => { const x = DB.get('evenements', id); x.analyse ||= { pourquoi: ['', '', '', '', ''], m5: {}, causeRacine: '' }; return x; };
  const an = e.analyse || { pourquoi: ['', '', '', '', ''], m5: {}, causeRacine: '' };
  const ecr = peut('evenements'), dis = ecr ? '' : 'disabled';
  const acts = actionsFor('evenement', e.id);
  const M5 = [['mainOeuvre', 'Main-d\'œuvre'], ['materiel', 'Matériel'], ['methode', 'Méthode'], ['milieu', 'Milieu'], ['matiere', 'Matière']];
  const v = document.createElement('div');
  v.innerHTML = `
  <div class="detail-head">
    <a href="#/evenements" class="btn small">← Retour</a>
    <h2>${esc(e.ref)} · ${esc(e.titre)}</h2>
    <select id="evStatut" ${dis}>${MODULES.evenements.fields.find(f => f.k === 'statut').options.map(s => `<option ${s === e.statut ? 'selected' : ''}>${s}</option>`).join('')}</select>
    <button class="btn" id="evPrint">Imprimer</button>
    <button class="btn navy" id="evEdit">${ecr ? 'Modifier' : 'Détails'}</button>
  </div>
  <div class="card">
    <div class="facts">
      <div><span>Type</span><b>${esc(e.type)}</b></div><div><span>Date</span><b>${fmtDate(e.date)}</b></div>
      <div><span>Site</span><b>${esc(siteName(e.site))}</b></div><div><span>Lieu</span><b>${esc(e.lieu || '—')}</b></div>
      <div><span>Gravité</span><b>${esc(e.gravite || '—')}</b></div><div><span>Déclarant</span><b>${esc(personName(e.declarant) || '—')}</b></div>
      ${e.type === 'Accident de travail' ? `<div><span>Victime</span><b>${esc(personName(e.victime) || '—')}</b></div><div><span>Arrêt</span><b>${esc(e.arret || 'Non')}${e.arret === 'Oui' ? ` · ${e.joursPerdus || 0} j perdus` : ''}</b></div>` : ''}
    </div>
    <h3 style="margin:16px 0 6px">Description</h3><div class="prose">${esc(e.description || '—')}</div>
    ${e.mesureImmediate ? `<h3 style="margin:16px 0 6px">Mesure immédiate</h3><div class="prose">${esc(e.mesureImmediate)}</div>` : ''}
    <h3 style="margin:16px 0 6px">Photos (${(e.photos || []).length})</h3><div id="evPhotos"></div>
    ${majTexte(e) ? `<div class="small muted" style="margin-top:12px">${esc(majTexte(e))}</div>` : ''}
  </div>
  <div class="card">
    <div class="card-head"><h2>Analyse des causes</h2><span class="small muted">${ecr ? 'Enregistrement automatique' : 'Lecture seule'}</span></div>
    <h3 style="margin-bottom:8px">Méthode des 5 pourquoi</h3>
    <div class="whys">${an.pourquoi.map((p, i) => `<label><input data-why="${i}" value="${esc(p)}" ${dis} placeholder="${i === 0 ? 'Pourquoi l\'événement s\'est-il produit ?' : 'Pourquoi ?'}"></label>`).join('')}</div>
    <h3 style="margin:18px 0 8px">Diagramme d'Ishikawa (5M)</h3>
    <div class="ishikawa">${M5.map(([k, l]) => `<label><span>${l}</span><textarea data-m5="${k}" ${dis} placeholder="Causes liées : ${l.toLowerCase()}">${esc(an.m5[k] || '')}</textarea></label>`).join('')}</div>
    <h3 style="margin:18px 0 8px">Cause racine retenue</h3>
    <textarea data-racine ${dis} placeholder="La cause profonde sur laquelle agir pour que cela ne se reproduise pas">${esc(an.causeRacine || '')}</textarea>
  </div>
  <div class="card">
    <div class="card-head"><h2>Actions (${acts.length})</h2>${peut('actions') ? '<button class="btn primary" id="evAction">+ Action corrective</button>' : ''}</div>
    ${acts.length ? `<ul class="mini">${acts.map(a => `<li data-act="${a.id}"><span class="t">${esc(a.titre)}<div class="small muted">${esc(personName(a.responsable))} · échéance ${fmtDate(a.echeance)}</div></span>${actionLate(a) ? badge('En retard', 'red') : ''} ${badge(a.statut, ACTION_OUVERTE.includes(a.statut) ? 'yellow' : a.statut === 'Inefficace' ? 'red' : 'green')}</li>`).join('')}</ul>` : '<div class="empty">Aucune action. Une fois la cause racine trouvée, créez au moins une action corrective.</div>'}
  </div>`;
  const dessinerPhotos = () => {
    const el = $('#evPhotos', v), ph = DB.get('evenements', id)?.photos || [];
    el.innerHTML = ph.length || ecr ? galerie(ph, { editable: ecr }) : '<span class="muted small">Aucune photo</span>';
    brancherGalerie(el, () => DB.get('evenements', id)?.photos || [], l => { DB.upsert('evenements', { ...DB.get('evenements', id), photos: l }); dessinerPhotos(); });
  };
  dessinerPhotos();
  const saveAnalyse = () => {
    const x = lire();
    x.analyse.pourquoi = $$('[data-why]', v).map(i => i.value);
    $$('[data-m5]', v).forEach(t => x.analyse.m5[t.dataset.m5] = t.value);
    x.analyse.causeRacine = $('[data-racine]', v).value;
    if (x.statut === 'Déclaré' && (x.analyse.causeRacine || x.analyse.pourquoi[0])) { x.statut = 'En analyse'; $('#evStatut', v).value = 'En analyse'; }
    DB.upsert('evenements', x);
  };
  let t; v.addEventListener('input', ev => { if (ev.target.matches('[data-why],[data-m5],[data-racine]')) { clearTimeout(t); t = setTimeout(saveAnalyse, 400); } });
  $('#evStatut', v).onchange = ev => {
    const x = lire();
    if (ev.target.value === 'Clôturé' && actionsFor('evenement', id).some(a => ACTION_OUVERTE.includes(a.statut)) && !confirm('Des actions sont encore ouvertes. Clôturer quand même ?')) { ev.target.value = x.statut; return; }
    x.statut = ev.target.value; DB.upsert('evenements', x); toast('Statut mis à jour'); renderAlertBadge();
  };
  $('#evEdit', v).onclick = () => openForm('evenements', lire());
  $('#evPrint', v).onclick = () => window.print();
  const ea = $('#evAction', v);
  if (ea) ea.onclick = () => { const x = lire(); newActionFrom('evenements', x, { titre: x.analyse.causeRacine ? `Traiter : ${x.analyse.causeRacine}`.slice(0, 120) : '' }); };
  $$('[data-act]', v).forEach(li => li.onclick = () => openForm('actions', DB.get('actions', li.dataset.act)));
  return v;
}

/* ───────────── Écran : réalisation d'un audit ───────────── */
function renderAudit(id) {
  if (!DB.get('audits', id)) return notFound();
  const lire = () => { const x = DB.get('audits', id); x.reponses ||= {}; return x; };
  const ecr = peut('audits');
  const v = document.createElement('div');
  const draw = () => {
    const a = lire(), mod = DB.get('modeles', a.modele), qs = mod?.questions || [];
    const s = auditScore(a), fige = a.statut === 'Terminé' || !ecr;
    let lastChap = null;
    v.innerHTML = `
    <div class="detail-head">
      <a href="#/audits" class="btn small">← Retour</a>
      <h2>${esc(a.ref)} · ${esc(mod?.nom || 'Grille supprimée')}</h2>
      ${badge(a.statut, a.statut === 'Terminé' ? 'green' : 'yellow')}
      <button class="btn" id="auPrint">Imprimer le rapport</button>
      <button class="btn" id="auEdit">${ecr ? 'Modifier' : 'Détails'}</button>
      ${!ecr ? '' : a.statut !== 'Terminé' ? '<button class="btn primary" id="auClose">Terminer l\'audit</button>' : '<button class="btn" id="auReopen">Rouvrir</button>'}
    </div>
    <div class="grid g3" style="margin-bottom:16px">
      <div class="card"><div class="small muted">Score de conformité</div><div class="score">${s.score == null ? '—' : s.score + ' %'}</div><div class="small muted">${s.c} conforme(s) · ${s.nc} non conforme(s) · ${s.na} N/A</div></div>
      <div class="card"><div class="small muted">Avancement</div><div class="score">${s.repondu} / ${qs.length}</div><div class="progress"><div style="width:${qs.length ? 100 * s.repondu / qs.length : 0}%"></div></div></div>
      <div class="card facts"><div><span>Site</span><b>${esc(siteName(a.site))}</b></div><div><span>Date</span><b>${fmtDate(a.date)}</b></div><div><span>Auditeur</span><b>${esc(personName(a.auditeur))}</b></div><div><span>Périmètre</span><b>${esc(a.perimetre || '—')}</b></div></div>
    </div>
    <div class="card">
      ${qs.length ? qs.map(q => {
        const r = a.reponses[q.id] || {};
        const chap = q.chapitre && q.chapitre !== lastChap ? (lastChap = q.chapitre, `<h3 style="margin:14px 0 2px">${esc(q.chapitre)}</h3>`) : '';
        const act = r.action && DB.get('actions', r.action);
        const ph = r.photos || [];
        return `${chap}<div class="q" data-q="${q.id}"><div><div class="txt">${esc(q.texte)}</div>${q.aide ? `<div class="small muted">${esc(q.aide)}</div>` : ''}${act ? `<div class="small">→ Action <a href="#/actions?ouvrir=${act.id}">${esc(act.ref)}</a> ${badge(act.statut)}</div>` : ''}</div>
          <div class="ans">${['C', 'NC', 'NA'].map(x => `<button type="button" class="${x} ${r.r === x ? 'on' : ''}" data-r="${x}" ${fige ? 'disabled' : ''}>${x === 'NA' ? 'N/A' : x}</button>`).join('')}</div>
          <input data-com placeholder="${r.r === 'NC' ? 'Constat : décrivez l\'écart observé (obligatoire pour une NC)' : 'Commentaire / preuve observée'}" value="${esc(r.commentaire || '')}" ${fige ? 'disabled' : ''}>
          ${ph.length || !fige ? `<div class="q-photos">${galerie(ph, { editable: !fige })}</div>` : ''}</div>`;
      }).join('') : '<div class="empty">Cette grille ne contient aucune question.</div>'}
    </div>`;
    $$('.q', v).forEach(div => {
      const qid = div.dataset.q;
      $$('[data-r]', div).forEach(b => b.onclick = () => {
        const x = lire(), cur = x.reponses[qid] || {};
        x.reponses[qid] = { ...cur, r: cur.r === b.dataset.r ? '' : b.dataset.r };
        if (x.statut === 'Planifié') x.statut = 'En cours';
        DB.upsert('audits', x); draw();
      });
      $('[data-com]', div).onchange = ev => { const x = lire(); x.reponses[qid] = { ...(x.reponses[qid] || {}), commentaire: ev.target.value }; DB.upsert('audits', x); };
      const g = $('.q-photos', div);
      if (g) brancherGalerie(g, () => lire().reponses[qid]?.photos || [], l => { const x = lire(); x.reponses[qid] = { ...(x.reponses[qid] || {}), photos: l }; if (x.statut === 'Planifié') x.statut = 'En cours'; DB.upsert('audits', x); draw(); });
    });
    $('#auPrint', v).onclick = () => window.print();
    $('#auEdit', v).onclick = () => openForm('audits', lire());
    const close = $('#auClose', v);
    if (close) close.onclick = () => {
      const x = lire(), s2 = auditScore(x);
      if (s2.repondu < qs.length && !confirm(`${qs.length - s2.repondu} question(s) sans réponse. Terminer quand même ?`)) return;
      const ncs = qs.filter(q => x.reponses[q.id]?.r === 'NC' && !x.reponses[q.id].action);
      const resp = DB.get('sites', x.site)?.responsable || x.auditeur;
      ncs.forEach(q => {
        const r = x.reponses[q.id];
        const nouvelle = { id: uid(), cree: today(), titre: `Lever l'écart : ${q.texte}`.slice(0, 140), description: r.commentaire ? `Constat d'audit : ${r.commentaire}` : '', type: 'Corrective', site: x.site, responsable: resp, echeance: addDays(today(), 30), priorite: 'Normale', statut: 'À faire', origine: { type: 'audit', id: x.id } };
        DB.attribuerRef(nouvelle, 'AC');
        DB.upsert('actions', nouvelle);
        r.action = nouvelle.id;
      });
      x.statut = 'Terminé'; x.dateRealisation = today(); DB.upsert('audits', x);
      toast(ncs.length ? `Audit terminé : ${ncs.length} action(s) corrective(s) créée(s) automatiquement` : 'Audit terminé');
      renderAlertBadge(); draw();
    };
    const re = $('#auReopen', v); if (re) re.onclick = () => { const x = lire(); x.statut = 'En cours'; DB.upsert('audits', x); draw(); };
  };
  draw();
  return v;
}

/* ───────────── Écran : grilles d'audit ───────────── */
function renderModeles() {
  const v = document.createElement('div');
  const mods = DB.all('modeles');
  v.innerHTML = `<div class="toolbar"><div class="grow muted">Les grilles servent de base aux audits et inspections. Une ligne = une question ; préfixez par « # » pour un chapitre.</div>${peut('modeles') ? '<button class="btn primary" id="newMod">+ Nouvelle grille</button>' : ''}</div>
    <div class="grid g2">${mods.map(m => `<div class="card"><div class="card-head"><h2>${esc(m.nom)}</h2>${peut('modeles') ? `<button class="btn small" data-edit="${m.id}">Modifier</button>` : ''}</div>
      <div class="small muted">${esc(m.referentiel || '')} · ${m.questions.length} question(s) · utilisée ${DB.all('audits').filter(a => a.modele === m.id).length} fois</div></div>`).join('')}</div>`;
  const edit = m => {
    const isNew = !m;
    m = m ? { ...m } : { id: uid(), nom: '', referentiel: '', questions: [] };
    let chap = '';
    const txt = m.questions.map(q => { let s = ''; if (q.chapitre && q.chapitre !== chap) { chap = q.chapitre; s = `# ${q.chapitre}\n`; } return s + q.texte; }).join('\n');
    $('#modalBox').innerHTML = `<form><header><h2>${isNew ? 'Nouvelle grille' : esc(m.nom)}</h2><button type="button" class="icon-btn" data-close>✕</button></header>
      <div class="body"><label><span>Nom <em>*</em></span><input name="nom" value="${esc(m.nom)}" required></label><label><span>Référentiel</span><input name="ref" value="${esc(m.referentiel)}" placeholder="ISO 45001, interne…"></label>
      <label class="full"><span>Questions</span><textarea name="q" style="min-height:300px">${esc(txt)}</textarea><div class="hint">Une question par ligne. « # Titre » démarre un chapitre.</div></label></div>
      <footer>${!isNew ? '<button type="button" class="btn danger left" data-del>Supprimer</button>' : ''}<button type="button" class="btn" data-close>Annuler</button><button class="btn primary">Enregistrer</button></footer></form>`;
    const f = $('#modalBox form');
    $$('[data-close]', f).forEach(b => b.onclick = closeModal);
    const d = $('[data-del]', f); if (d) d.onclick = () => {
      if (DB.all('audits').some(a => a.modele === m.id)) return toast('Grille utilisée par des audits : suppression impossible');
      if (confirm('Supprimer cette grille ?')) { DB.remove('modeles', m.id); closeModal(); route(); }
    };
    f.onsubmit = e => {
      e.preventDefault();
      if (!f.nom.value.trim()) return toast('Donnez un nom à la grille');
      const old = Object.fromEntries(m.questions.map(q => [q.texte, q.id]));
      let ch = ''; const qs = [];
      f.q.value.split('\n').map(l => l.trim()).filter(Boolean).forEach(l => { if (l.startsWith('#')) ch = l.replace(/^#+\s*/, ''); else qs.push({ id: old[l] || uid(), texte: l, chapitre: ch }); });
      DB.upsert('modeles', { ...m, nom: f.nom.value.trim(), referentiel: f.ref.value.trim(), questions: qs }); closeModal(); toast('Grille enregistrée'); route();
    };
    openModal();
  };
  const nm = $('#newMod', v); if (nm) nm.onclick = () => edit();
  $$('[data-edit]', v).forEach(b => b.onclick = () => edit(DB.get('modeles', b.dataset.edit)));
  return v;
}

/* ───────────── Écran : indicateurs ───────────── */
function renderIndicateurs() {
  const months = lastMonths(12), rows = tfTg(months), tot = sumTf(rows);
  const ac = bySite(DB.all('actions'));
  const v = document.createElement('div');
  const parOrigine = ['evenement', 'audit', 'risque', 'exigence', undefined].map(o => [{ evenement: 'Événements', audit: 'Audits', risque: 'Risques', exigence: 'Réglementation', undefined: 'Manuelles' }[o], ac.filter(a => a.origine?.type === o).length]);
  const parResp = Object.entries(ac.filter(a => ACTION_OUVERTE.includes(a.statut)).reduce((m, a) => (m[personName(a.responsable) || '—'] = (m[personName(a.responsable) || '—'] || 0) + 1, m), {})).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const audits = bySite(DB.all('audits')).filter(a => a.statut === 'Terminé').sort((a, b) => a.date.localeCompare(b.date)).slice(-10);
  v.innerHTML = `
  <div class="kpis">
    <div class="kpi navy"><div class="v">${nf(tot.tf, 2)}</div><div class="l">Taux de fréquence (12 mois)</div><div class="s">AAA × 1 000 000 / heures</div></div>
    <div class="kpi navy"><div class="v">${nf(tot.tg, 2)}</div><div class="l">Taux de gravité (12 mois)</div><div class="s">jours perdus × 1 000 / heures</div></div>
    <div class="kpi"><div class="v">${nf(tot.heures)}</div><div class="l">Heures travaillées</div><div class="s"><a href="#/heures">Saisir les heures</a></div></div>
    <div class="kpi bad"><div class="v">${tot.aaa}</div><div class="l">Accidents avec arrêt</div><div class="s">${tot.jp} jours perdus</div></div>
  </div>
  <div class="card"><div class="card-head"><h2>Accidents et taux de fréquence par mois</h2><button class="btn small" id="csvInd">Exporter CSV</button></div>
    ${barChart(months.map(fmtMonth), [{ nom: 'Accidents avec arrêt', couleur: '#D23B3B', valeurs: rows.map(r => r.aaa) }, { nom: 'Accidents sans arrêt', couleur: '#F2A7A7', valeurs: rows.map(r => r.accidents - r.aaa) }], { line: { nom: 'Taux de fréquence', couleur: '#0A2669', valeurs: rows.map(r => r.tf) } })}
    ${rows.every(r => !r.heures) ? '<p class="small" style="color:var(--orange)">Saisissez les heures travaillées pour calculer TF et TG.</p>' : ''}
  </div>
  <div class="table-wrap" style="margin-top:16px"><table><thead><tr><th>Mois</th><th class="num">Heures</th><th class="num">Accidents</th><th class="num">Avec arrêt</th><th class="num">Jours perdus</th><th class="num">TF</th><th class="num">TG</th></tr></thead>
    <tbody>${rows.map(r => `<tr><td>${fmtMonth(r.mois)}</td><td class="num">${nf(r.heures)}</td><td class="num">${r.accidents}</td><td class="num">${r.aaa}</td><td class="num">${r.jp}</td><td class="num">${nf(r.tf, 2)}</td><td class="num">${nf(r.tg, 2)}</td></tr>`).join('')}
    <tr style="font-weight:700"><td>Total 12 mois</td><td class="num">${nf(tot.heures)}</td><td class="num">${rows.reduce((s, r) => s + r.accidents, 0)}</td><td class="num">${tot.aaa}</td><td class="num">${tot.jp}</td><td class="num">${nf(tot.tf, 2)}</td><td class="num">${nf(tot.tg, 2)}</td></tr></tbody></table></div>
  <div class="grid g3" style="margin-top:16px">
    <div class="card"><h2 style="margin-bottom:10px">Origine des actions</h2>${bars(parOrigine)}</div>
    <div class="card"><h2 style="margin-bottom:10px">Actions ouvertes par responsable</h2>${bars(parResp)}</div>
    <div class="card"><h2 style="margin-bottom:10px">Scores des derniers audits</h2>${bars(audits.map(a => [`${fmtDate(a.date)} · ${DB.get('modeles', a.modele)?.nom || ''}`, auditScore(a).score ?? 0, (auditScore(a).score ?? 0) >= 85 ? '#00A078' : (auditScore(a).score ?? 0) >= 65 ? '#E3B417' : '#D23B3B']), 100)}</div>
  </div>`;
  $('#csvInd', v).onclick = () => {
    const l = [['Mois', 'Heures', 'Accidents', 'Avec arrêt', 'Jours perdus', 'TF', 'TG'].join(';')].concat(rows.map(r => [r.mois, r.heures, r.accidents, r.aaa, r.jp, nf(r.tf, 2), nf(r.tg, 2)].join(';')));
    download(`indicateurs-${today()}.csv`, '﻿' + l.join('\r\n'), 'text/csv;charset=utf-8');
  };
  return v;
}

/* ───────────── Écran : données ───────────── */
function renderParametres() {
  const v = document.createElement('div');
  const size = new Blob([localStorage.getItem(KEY) || '']).size;
  v.innerHTML = `<div class="grid g2">
    <div class="card"><h2>Sauvegarde</h2><p>Toutes vos données sont enregistrées <b>dans ce navigateur</b> (${nf(size / 1024, 0)} Ko utilisés). Exportez régulièrement une sauvegarde, et utilisez-la pour transférer les données sur un autre poste.</p>
      <div class="toolbar"><button class="btn primary" id="exp">Exporter la sauvegarde (.json)</button><label class="btn">Importer une sauvegarde<input type="file" id="imp" accept=".json" hidden></label></div></div>
    <div class="card"><h2>Installer l'application</h2><p>Sur téléphone ou ordinateur, ouvrez le menu du navigateur et choisissez <b>« Installer l'application »</b> ou <b>« Ajouter à l'écran d'accueil »</b>. Elle fonctionnera ensuite même sans connexion, ce qui est pratique pour les inspections sur le terrain.</p></div>
    <div class="card"><h2>Données de démonstration</h2><p>Remplace toutes les données par un jeu d'exemple (3 sites, événements, risques, audits…).</p><button class="btn" id="demo">Recharger la démonstration</button></div>
    <div class="card"><h2>Partir de zéro</h2><p>Efface tout et garde seulement les grilles d'audit types. Exportez d'abord une sauvegarde.</p><button class="btn danger" id="wipe">Tout effacer</button></div>
  </div>`;
  $('#exp', v).onclick = () => download(`sauvegarde-qhse-${today()}.json`, JSON.stringify(DB.d, null, 1), 'application/json');
  $('#imp', v).onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const d = JSON.parse(await f.text());
      if (!d.meta || !Array.isArray(d.evenements)) throw new Error('format');
      if (!confirm('Remplacer toutes les données actuelles par cette sauvegarde ?')) return;
      DB.d = d; COLLECTIONS.forEach(c => DB.d[c] ||= []); DB.d.meta.compteurs ||= {}; DB.save(); renderSiteFilter(); toast('Sauvegarde importée'); route();
    } catch (err) { toast('Fichier invalide'); }
  };
  $('#demo', v).onclick = () => { if (confirm('Remplacer toutes les données par la démonstration ?')) { DB.d = seed(); DB.save(); renderSiteFilter(); toast('Démonstration rechargée'); route(); } };
  $('#wipe', v).onclick = () => { if (confirm('Effacer définitivement toutes les données ?')) { const s = seed(); DB.d = { meta: { compteurs: {} }, modeles: s.modeles }; COLLECTIONS.forEach(c => DB.d[c] ||= []); DB.save(); toast('Données effacées'); route(); } };
  return v;
}
function notFound() { const v = document.createElement('div'); v.innerHTML = '<div class="card empty">Fiche introuvable. <a href="#/dashboard">Retour au tableau de bord</a></div>'; return v; }

/* ───────────── Écran : administration (mode serveur) ───────────── */
const adminState = { onglet: 'comptes' };
function renderAdmin() {
  const v = document.createElement('div');
  const onglets = [['compte', 'Mon compte', true], ['comptes', 'Utilisateurs', estAdmin()], ['alertes', 'Alertes e-mail / WhatsApp', estResp()], ['journal', 'Journal d\'activité', estResp()], ['sauvegarde', 'Sauvegarde', estResp()]].filter(o => o[2]);
  if (!onglets.some(o => o[0] === adminState.onglet)) adminState.onglet = onglets[0][0];
  v.innerHTML = `<div class="chips">${onglets.map(([k, l]) => `<button class="chip ${adminState.onglet === k ? 'on' : ''}" data-onglet="${k}">${l}</button>`).join('')}</div><div id="adminCorps"><div class="card empty">Chargement…</div></div>`;
  $$('[data-onglet]', v).forEach(b => b.onclick = () => { adminState.onglet = b.dataset.onglet; route(); });
  const corps = $('#adminCorps', v);
  const echec = e => { corps.innerHTML = `<div class="card empty">${esc(e.status ? e.message : 'Connexion au serveur impossible. Cette page demande une connexion.')}</div>`; };
  ({ compte: ongletCompte, comptes: ongletComptes, alertes: ongletAlertes, journal: ongletJournal, sauvegarde: ongletSauvegarde })[adminState.onglet](corps).catch(echec);
  return v;
}
async function ongletCompte(el) {
  const u = MODE.user;
  el.innerHTML = `<div class="grid g2"><div class="card"><h2>${esc(u.nom)}</h2><p class="muted">${esc(u.email)} · ${esc(Regles.ROLES[u.role]?.nom || u.role)}${u.personne ? ` · fiche ${esc(personName(u.personne))}` : ''}</p>
    <p class="small muted">${esc({ admin: 'Accès complet, y compris les comptes et les réglages.', responsable: 'Peut tout créer, modifier et supprimer, et voir le journal.', contributeur: 'Peut déclarer des événements, réaliser des audits et mettre à jour les actions.', lecteur: 'Peut tout consulter, sans rien modifier.' }[u.role] || '')}</p>
    <button class="btn" id="deco">Se déconnecter</button></div>
    <form class="card" id="mdp"><h2>Changer mon mot de passe</h2>
      <label class="champ"><span>Mot de passe actuel</span><input type="password" name="ancien" autocomplete="current-password" required></label>
      <label class="champ"><span>Nouveau mot de passe (8 caractères minimum)</span><input type="password" name="nouveau" autocomplete="new-password" minlength="8" required></label>
      <button class="btn primary">Enregistrer</button></form></div>`;
  $('#deco', el).onclick = deconnexion;
  $('#mdp', el).onsubmit = async e => {
    e.preventDefault(); const f = e.target;
    try { await apiCall('POST', 'api/mot-de-passe', { ancien: f.ancien.value, nouveau: f.nouveau.value }); f.reset(); toast('Mot de passe modifié'); }
    catch (err) { toast(err.message); }
  };
}
async function ongletComptes(el) {
  const { utilisateurs } = await apiCall('GET', 'api/utilisateurs');
  el.innerHTML = `<div class="toolbar"><div class="grow muted">Chaque collègue a son propre compte. Reliez-le à sa fiche Personnel pour qu'il voie « Mes actions » et reçoive ses alertes.</div><button class="btn primary" id="newU">+ Nouveau compte</button></div>
    <div class="table-wrap"><table><thead><tr><th>Nom</th><th>E-mail</th><th>Rôle</th><th>Fiche personnel</th><th>Dernière connexion</th><th>État</th></tr></thead><tbody>
    ${utilisateurs.map(u => `<tr data-u="${u.id}"><td>${esc(u.nom)}</td><td>${esc(u.email)}</td><td>${badge(Regles.ROLES[u.role]?.nom || u.role, u.role === 'admin' ? '' : u.role === 'lecteur' ? 'grey' : 'green')}</td><td>${esc(personName(u.personne) || '—')}</td><td>${u.derniereConnexion ? new Date(u.derniereConnexion).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '<span class="muted">jamais</span>'}</td><td>${u.actif ? badge('Actif', 'green') : badge('Désactivé', 'grey')}</td></tr>`).join('')}
    </tbody></table></div>`;
  const form = u => {
    const nouveau = !u;
    $('#modalBox').innerHTML = `<form novalidate><header><h2>${nouveau ? 'Nouveau compte' : esc(u.nom)}</h2><button type="button" class="icon-btn" data-close>✕</button></header><div class="body">
      <label><span>Nom <em>*</em></span><input name="nom" value="${esc(u?.nom)}" required></label>
      <label><span>E-mail (identifiant) <em>*</em></span><input type="email" name="email" value="${esc(u?.email)}" required></label>
      <label><span>Rôle</span><select name="role">${Object.entries(Regles.ROLES).map(([k, r]) => `<option value="${k}" ${(u?.role || 'contributeur') === k ? 'selected' : ''}>${esc(r.nom)}</option>`).join('')}</select></label>
      <label><span>Fiche personnel liée</span><select name="personne"><option value=""></option>${DB.all('personnel').slice().sort((a, b) => a.nom.localeCompare(b.nom)).map(p => `<option value="${p.id}" ${u?.personne === p.id ? 'selected' : ''}>${esc(p.nom)}</option>`).join('')}</select></label>
      <label><span>${nouveau ? 'Mot de passe provisoire <em>*</em>' : 'Nouveau mot de passe (laisser vide pour ne pas changer)'}</span><input name="motDePasse" type="text" autocomplete="off" value="${nouveau ? motDePasseAleatoire() : ''}"><div class="hint">8 caractères minimum. Communiquez-le à la personne, qui pourra le changer.</div></label>
      <label><span>Options</span><div><label class="inline"><input type="checkbox" name="notifEmail" ${u?.notifEmail !== false ? 'checked' : ''}> Récapitulatif quotidien par e-mail</label>${nouveau ? '' : `<label class="inline"><input type="checkbox" name="actif" ${u.actif ? 'checked' : ''}> Compte actif</label>`}</div></label>
      </div><footer><button type="button" class="btn" data-close>Annuler</button><button class="btn primary">Enregistrer</button></footer></form>`;
    const f = $('#modalBox form');
    $$('[data-close]', f).forEach(b => b.onclick = closeModal);
    f.onsubmit = async e => {
      e.preventDefault();
      const corps = { nom: f.nom.value, email: f.email.value, role: f.role.value, personne: f.personne.value, notifEmail: f.notifEmail.checked };
      if (f.motDePasse.value) corps.motDePasse = f.motDePasse.value;
      if (!nouveau) corps.actif = f.actif.checked;
      try { await apiCall(nouveau ? 'POST' : 'PUT', nouveau ? 'api/utilisateurs' : `api/utilisateurs/${u.id}`, corps); closeModal(); toast(nouveau ? `Compte créé. Mot de passe provisoire : ${corps.motDePasse}` : 'Compte modifié'); route(); }
      catch (err) { toast(err.message); }
    };
    openModal();
  };
  $('#newU', el).onclick = () => form();
  $$('[data-u]', el).forEach(tr => tr.onclick = () => form(utilisateurs.find(u => u.id === tr.dataset.u)));
}
function motDePasseAleatoire() {
  const a = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789', r = crypto.getRandomValues(new Uint32Array(10));
  return [...r].map(x => a[x % a.length]).join('');
}
async function ongletAlertes(el) {
  const { etat, historique } = await apiCall('GET', 'api/notifications');
  const ok = b => b ? badge('Configuré', 'green') : badge('Non configuré', 'orange');
  const sansContact = DB.all('personnel').filter(p => p.actif !== 'Parti' && !p.email && !p.whatsapp).length;
  el.innerHTML = `<div class="grid g2">
    <div class="card"><h2>État</h2>
      <div class="facts" style="margin:12px 0"><div><span>E-mail</span><b>${ok(etat.email)}</b></div><div><span>WhatsApp</span><b>${ok(etat.whatsapp)}</b></div>
      <div><span>Récapitulatif quotidien</span><b>${etat.actives ? `Lun–ven à ${etat.heure} h` : 'Désactivé'}</b></div><div><span>Dernier envoi</span><b>${etat.dernierRecap ? fmtDate(etat.dernierRecap) : '—'}</b></div></div>
      <p class="small muted">Chaque personne reçoit <b>ses</b> alertes (actions en retard, habilitations, revues de documents…). Les administrateurs et responsables QHSE reçoivent la liste complète. Envoi immédiat aussi quand une action est confiée à quelqu'un, et pour tout accident ou événement grave.</p>
      ${sansContact ? `<p class="small" style="color:var(--orange)">${sansContact} personne(s) n'ont ni e-mail ni WhatsApp dans leur fiche Personnel : elles ne recevront rien.</p>` : ''}
      ${!etat.email || !etat.whatsapp ? '<p class="small muted">Le paramétrage (serveur d\'envoi, compte WhatsApp) se fait dans le fichier <code>serveur/.env</code> : voir le guide d\'installation.</p>' : ''}
      ${estAdmin() ? '<button class="btn" id="recap">Envoyer le récapitulatif maintenant</button>' : ''}</div>
    ${estAdmin() ? `<form class="card" id="test"><h2>Envoyer un test</h2>
      <label class="champ"><span>Canal</span><select name="canal"><option value="email">E-mail</option><option value="whatsapp">WhatsApp</option></select></label>
      <label class="champ"><span>Destinataire</span><input name="destinataire" required placeholder="adresse e-mail ou +225…" value="${esc(MODE.user.email)}"></label>
      <button class="btn primary">Envoyer</button><div id="testRes" class="small" style="margin-top:8px"></div></form>` : ''}
  </div>
  <h2 style="margin:22px 0 10px">Derniers envois</h2>
  ${historique.length ? `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Canal</th><th>Destinataire</th><th>Objet</th><th>Résultat</th></tr></thead><tbody>${historique.map(n => `<tr><td>${new Date(n.quand).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}</td><td>${n.canal === 'email' ? 'E-mail' : 'WhatsApp'}</td><td>${esc(n.destinataire)}</td><td>${esc(n.sujet)}</td><td>${badge(n.statut, n.statut === 'envoyé' ? 'green' : n.statut === 'échec' ? 'red' : 'grey')}${n.erreur ? `<div class="small muted">${esc(n.erreur)}</div>` : ''}</td></tr>`).join('')}</tbody></table></div>` : '<div class="card empty">Aucun envoi pour le moment.</div>'}`;
  const rc = $('#recap', el);
  if (rc) rc.onclick = async () => { rc.disabled = true; try { const r = await apiCall('POST', 'api/notifications/recap'); toast(`${r.alertes} alerte(s), ${r.envoyes} message(s) envoyé(s)`); route(); } catch (e) { toast(e.message); rc.disabled = false; } };
  const t = $('#test', el);
  if (t) {
    t.canal.onchange = () => { t.destinataire.value = t.canal.value === 'email' ? MODE.user.email : (DB.get('personnel', MODE.user.personne)?.whatsapp || ''); };
    t.onsubmit = async e => {
      e.preventDefault(); const res = $('#testRes', t); res.textContent = 'Envoi…';
      try { const r = await apiCall('POST', 'api/notifications/test', { canal: t.canal.value, destinataire: t.destinataire.value }); res.innerHTML = r.ok ? '<span style="color:var(--green)">Envoyé ✔</span>' : `<span style="color:var(--red)">Échec : ${esc(r.detail?.erreur || 'inconnu')}</span>`; }
      catch (err) { res.textContent = err.message; }
    };
  }
}
async function ongletJournal(el) {
  const { journal } = await apiCall('GET', 'api/journal?limite=300');
  const noms = { evenements: 'Événement', risques: 'Risque', actions: 'Action', audits: 'Audit', documents: 'Document', exigences: 'Exigence', personnel: 'Personnel', formations: 'Formation', heures: 'Heures', sites: 'Site', modeles: 'Grille', utilisateurs: 'Compte' };
  el.innerHTML = `<p class="muted">Qui a fait quoi et quand : la traçabilité demandée par les normes ISO. Les 300 dernières opérations.</p>
    <div class="table-wrap"><table><thead><tr><th>Date</th><th>Utilisateur</th><th>Opération</th><th>Fiche</th></tr></thead><tbody>
    ${journal.map(j => `<tr><td>${new Date(j.quand).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}</td><td>${esc(j.user_nom)}</td><td>${badge(j.action, j.action === 'suppression' ? 'red' : j.action === 'création' ? 'green' : '')}</td><td>${esc(noms[j.collection] || j.collection)} ${esc(j.libelle)}</td></tr>`).join('')}</tbody></table></div>`;
}
async function ongletSauvegarde(el) {
  el.innerHTML = `<div class="grid g2">
    <div class="card"><h2>Exporter</h2><p>Télécharge toutes les fiches au format JSON. Les photos restent sur le serveur : sauvegardez aussi le dossier <code>donnees</code> du serveur.</p><button class="btn primary" id="exp">Exporter la sauvegarde (.json)</button></div>
    ${estAdmin() ? `<div class="card"><h2>Importer</h2><p>Ajoute ou remplace les fiches contenues dans une sauvegarde, par exemple celle d'un poste qui utilisait le logiciel sans serveur. Les fiches existantes portant le même identifiant sont remplacées.</p><label class="btn">Choisir un fichier .json<input type="file" id="imp" accept=".json" hidden></label></div>` : ''}
  </div>`;
  $('#exp', el).onclick = async () => { try { const d = await apiCall('GET', 'api/export'); download(`sauvegarde-qhse-${today()}.json`, JSON.stringify(d, null, 1), 'application/json'); } catch (e) { toast(e.message); } };
  const imp = $('#imp', el);
  if (imp) imp.onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const d = JSON.parse(await f.text());
      if (!d.meta || !Array.isArray(d.evenements)) throw new Error('Fichier invalide');
      if (!confirm('Importer cette sauvegarde sur le serveur ? Les fiches de même identifiant seront remplacées.')) return;
      const r = await apiCall('POST', 'api/import', { donnees: d });
      toast(`${r.importees} fiche(s) importée(s)`); await Sync.tirer(); route();
    } catch (err) { toast(err.message || 'Fichier invalide'); }
  };
}

/* ───────────── Connexion et installation ───────────── */
function ecranAuth(html) {
  let el = $('#auth');
  if (!el) { el = document.createElement('div'); el.id = 'auth'; document.body.append(el); }
  el.innerHTML = `<div class="auth-box"><img src="assets/universnormes-logo.png" alt="UNIVERSNORMES"><div class="auth-sous">Logiciel QHSE</div>${html}</div>`;
  el.hidden = false; return el;
}
function afficherConnexion(message = '') {
  if ($('#auth') && !$('#auth').hidden && $('#auth form[data-connexion]')) return;
  const el = ecranAuth(`<form data-connexion><h1>Connexion</h1>${message ? `<p class="small" style="color:var(--orange)">${esc(message)}</p>` : ''}
    <label class="champ"><span>E-mail</span><input type="email" name="email" autocomplete="username" required value="${esc(MODE.user?.email || '')}"></label>
    <label class="champ"><span>Mot de passe</span><input type="password" name="motDePasse" autocomplete="current-password" required></label>
    <button class="btn primary large">Se connecter</button><p class="small muted">Mot de passe oublié ? Demandez à l'administrateur du logiciel de le réinitialiser.</p></form>`);
  const f = $('form', el);
  setTimeout(() => (f.email.value ? f.motDePasse : f.email).focus(), 30);
  f.onsubmit = async e => {
    e.preventDefault(); const btn = $('button', f); btn.disabled = true;
    try {
      const r = await apiCall('POST', 'api/connexion', { email: f.email.value, motDePasse: f.motDePasse.value });
      el.hidden = true; await ouvrirSessionServeur(r.user);
    } catch (err) { toast(err.message); btn.disabled = false; }
  };
}
function afficherInstallation() {
  let local = null;
  try { local = JSON.parse(localStorage.getItem(KEY)); } catch (e) { }
  const nbLocal = local ? COLLECTIONS.reduce((s, c) => s + (local[c]?.length || 0), 0) : 0;
  const el = ecranAuth(`<form data-installation><h1>Installation</h1><p class="muted">Bienvenue ! Créez le compte administrateur. Vous pourrez ensuite créer les comptes de vos collègues.</p>
    <label class="champ"><span>Votre nom</span><input name="nom" required autocomplete="name"></label>
    <label class="champ"><span>E-mail</span><input type="email" name="email" required autocomplete="username"></label>
    <label class="champ"><span>Mot de passe (8 caractères minimum)</span><input type="password" name="motDePasse" minlength="8" required autocomplete="new-password"></label>
    <fieldset class="champ"><legend>Pour commencer</legend>
      <label class="inline"><input type="radio" name="depart" value="vide" checked> Base vide (avec les grilles d'audit ISO 9001, 14001, 45001)</label>
      <label class="inline"><input type="radio" name="depart" value="demo"> Données de démonstration</label>
      ${nbLocal ? `<label class="inline"><input type="radio" name="depart" value="local"> Reprendre les ${nbLocal} fiches déjà saisies dans ce navigateur</label>` : ''}
    </fieldset>
    <button class="btn primary large">Créer le compte et démarrer</button></form>`);
  const f = $('form', el);
  f.onsubmit = async e => {
    e.preventDefault(); const btn = $('button', f); btn.disabled = true;
    const depart = f.depart.value, demo = seed();
    const donnees = depart === 'demo' ? demo : depart === 'local' ? local : { meta: { compteurs: {} }, modeles: demo.modeles };
    try {
      const r = await apiCall('POST', 'api/installation', { nom: f.nom.value, email: f.email.value, motDePasse: f.motDePasse.value, donnees });
      el.hidden = true; toast(`Installation terminée${r.importees ? ` : ${r.importees} fiches` : ''}`);
      await ouvrirSessionServeur(r.user);
    } catch (err) { toast(err.message); btn.disabled = false; }
  };
}
async function deconnexion() {
  if (DB.file.length && !confirm(`${DB.file.length} modification(s) n'ont pas encore été envoyées au serveur et seront perdues. Se déconnecter quand même ?`)) return;
  try { await apiCall('POST', 'api/deconnexion'); } catch (e) { }
  try { localStorage.removeItem(KEY_SRV); } catch (e) { }
  DB.file = []; MODE.user = null; DB.d = { meta: {} }; DB.normaliser();
  afficherConnexion();
}
/* Charge les données du serveur (ou le cache de cet appareil) puis affiche l'application. */
async function ouvrirSessionServeur(user, horsLigne = false) {
  MODE.serveur = true;
  let cache = null; try { cache = JSON.parse(localStorage.getItem(KEY_SRV)); } catch (e) { }
  if (cache && cache.userId !== user.id) {
    if (cache.file?.length) toast(`${cache.file.length} modification(s) d'un autre compte non envoyées ont été écartées`);
    cache = null;
  }
  MODE.user = user;
  if (cache?.d) { DB.d = cache.d; DB.file = cache.file || []; DB.curseur = cache.curseur || 0; }
  else if (!horsLigne) { const r = await apiCall('GET', 'api/donnees'); DB.d = { meta: { compteurs: {}, site: '' }, ...r.donnees }; DB.curseur = r.curseur; DB.file = []; }
  DB.normaliser(); MODE.enLigne = !horsLigne; DB.save();
  demarrerInterface();
  if (!horsLigne) { Sync.tirer(); Sync.envoyer(); }
}
let interfaceDemarree = false;
function demarrerInterface() {
  $('#userBtn').hidden = !MODE.serveur;
  if (MODE.serveur) $('#userBtn').textContent = (MODE.user?.nom || '?').split(/\s+/).map(x => x[0]).slice(0, 2).join('').toUpperCase();
  renderSiteFilter(); afficherSync(); route();
  if (interfaceDemarree) return;
  interfaceDemarree = true;
  window.addEventListener('hashchange', route);
  if (MODE.serveur) {
    setInterval(() => Sync.tirer(), 30000);
    window.addEventListener('focus', () => Sync.tirer());
    window.addEventListener('online', () => { MODE.enLigne = true; Sync.envoyer(); Sync.tirer(); });
    window.addEventListener('offline', () => { MODE.enLigne = false; afficherSync(); });
    document.addEventListener('focusout', () => setTimeout(rafraichirSiInactif, 50));
    window.addEventListener('beforeunload', e => { if (DB.file.length && MODE.enLigne) { Sync.envoyer(); } });
  }
}

/* ───────────── Navigation ───────────── */
function renderNav(active) {
  const late = bySite(DB.all('actions')).filter(actionLate).length;
  $('#nav').innerHTML = NAV.map(([g, items]) => `<div class="group">${g}</div>` + items.map(([k, ico, l]) => `<a href="#/${k}" class="${active === k ? 'active' : ''}"><span class="ico">${ico}</span>${k === 'parametres' && MODE.serveur ? 'Administration' : l}${k === 'actions' && late ? `<span class="pill">${late}</span>` : ''}</a>`).join('')).join('');
}
function renderSiteFilter() {
  const s = $('#siteFilter');
  s.innerHTML = `<option value="">Tous les sites</option>` + DB.all('sites').map(x => `<option value="${x.id}" ${currentSite() === x.id ? 'selected' : ''}>${esc(x.nom)}</option>`).join('');
}
function route() {
  const [path, query] = location.hash.replace(/^#\/?/, '').split('?');
  const [mod, id] = (path || 'dashboard').split('/');
  const params = new URLSearchParams(query || '');
  const titles = { dashboard: 'Tableau de bord', indicateurs: 'Indicateurs', modeles: 'Grilles d\'audit', parametres: MODE.serveur ? 'Administration' : 'Données et sauvegarde' };
  let view;
  if (mod === 'dashboard') view = renderDashboard();
  else if (mod === 'indicateurs') view = renderIndicateurs();
  else if (mod === 'modeles') view = renderModeles();
  else if (mod === 'parametres') view = MODE.serveur ? renderAdmin() : renderParametres();
  else if (mod === 'risques') view = renderRisques();
  else if (mod === 'evenements' && id) view = renderEvenement(id);
  else if (mod === 'audits' && id) view = renderAudit(id);
  else if (MODULES[mod]) view = renderList(mod);
  else { location.hash = '#/dashboard'; return; }
  $('#pageTitle').textContent = titles[mod] || MODULES[mod]?.titre || '';
  document.title = `${$('#pageTitle').textContent} · UNIVERSNORMES QHSE`;
  const main = $('#view'); main.replaceChildren(view);
  renderNav(mod); renderAlertBadge(); renderSiteFilter();
  $('#sidebar').classList.remove('open');
  const ouvrir = params.get('ouvrir');
  if (ouvrir && MODULES[mod]) {
    history.replaceState(null, '', `#/${mod}`);
    const o = DB.get(mod, ouvrir); if (o) openForm(mod, o);
  }
}

/* ───────────── Données de démonstration ───────────── */
function seed() {
  const T = today(), d = n => addDays(T, n);
  const S = [{ id: 's1', nom: 'Siège — Abidjan Plateau', ville: 'Abidjan' }, { id: 's2', nom: 'Usine — Yopougon', ville: 'Abidjan' }, { id: 's3', nom: 'Chantier — San-Pédro', ville: 'San-Pédro' }];
  const P = [
    ['p1', 'Aya Kouassi', 'Responsable QHSE', 's1', 'QHSE'], ['p2', 'Moussa Traoré', 'Chef d\'atelier', 's2', 'Production'], ['p3', 'Fatou Diallo', 'Animatrice HSE', 's2', 'QHSE'],
    ['p4', 'Koffi Yao', 'Conducteur de travaux', 's3', 'Travaux'], ['p5', 'Awa Bamba', 'Responsable qualité', 's1', 'Qualité'], ['p6', 'Ibrahim Coulibaly', 'Électricien', 's2', 'Maintenance'],
    ['p7', 'Mariam Konaté', 'Cariste', 's2', 'Logistique'], ['p8', 'Serge N\'Guessan', 'Chef d\'équipe', 's3', 'Travaux'], ['p9', 'Jean-Marc Kouadio', 'Directeur général', 's1', 'Direction'], ['p10', 'Adama Ouattara', 'Soudeur', 's3', 'Travaux']
  ].map(([id, nom, poste, site, service], i) => ({ id, nom, poste, site, service, matricule: 'M' + String(101 + i), actif: 'Actif', dateEmbauche: addMonths(T, -12 - i * 7) }));
  S[0].responsable = 'p1'; S[1].responsable = 'p3'; S[2].responsable = 'p4';
  const cpt = {}, y = new Date().getFullYear();
  const ref = p => { cpt[`${p}-${y}`] = (cpt[`${p}-${y}`] || 0) + 1; return `${p}-${y}-${String(cpt[`${p}-${y}`]).padStart(3, '0')}`; };

  const E = [
    ['Accident de travail', -190, 's2', 'Coupure à la main sur la cisaille', 'Modérée', 'p2', 'Oui', 6, 'Clôturé', 'p7'],
    ['Presqu\'accident', -150, 's3', 'Chute d\'un outil depuis l\'échafaudage', 'Grave', 'p8', '', 0, 'Clôturé'],
    ['Situation dangereuse', -120, 's2', 'Extincteur masqué par des palettes', 'Mineure', 'p3', '', 0, 'Clôturé'],
    ['Accident de travail', -95, 's3', 'Entorse en descendant de la benne', 'Modérée', 'p4', 'Oui', 12, 'Actions en cours', 'p10'],
    ['Incident environnemental', -70, 's2', 'Fuite d\'huile hydraulique au sol', 'Modérée', 'p6', '', 0, 'Actions en cours'],
    ['Réclamation client', -55, 's1', 'Livraison non conforme au bon de commande', 'Mineure', 'p5', '', 0, 'Clôturé'],
    ['Presqu\'accident', -40, 's2', 'Chariot élévateur frôle un piéton', 'Grave', 'p7', '', 0, 'En analyse'],
    ['Non-conformité produit', -30, 's2', 'Lot de soudures hors tolérance', 'Modérée', 'p5', '', 0, 'Actions en cours'],
    ['Accident de travail', -21, 's2', 'Projection dans l\'œil au meulage', 'Modérée', 'p3', 'Oui', 3, 'En analyse', 'p6'],
    ['Situation dangereuse', -12, 's3', 'Tranchée non balisée de nuit', 'Grave', 'p8', '', 0, 'Déclaré'],
    ['Accident de travail', -9, 's1', 'Glissade dans l\'escalier mouillé', 'Mineure', 'p1', 'Non', 0, 'Déclaré', 'p5'],
    ['Presqu\'accident', -3, 's3', 'Câble électrique dénudé sur le chantier', 'Grave', 'p10', '', 0, 'Déclaré']
  ].map(([type, off, site, titre, gravite, declarant, arret, jp, statut, victime]) => ({ id: uid(), ref: ref('EV'), type, date: d(off), site, titre, gravite, declarant, statut, description: `${titre}. Constat fait sur place par ${P.find(p => p.id === declarant).nom}.`, ...(type === 'Accident de travail' ? { arret: arret || 'Non', joursPerdus: jp, victime } : {}), cree: d(off) }));
  E[0].analyse = { pourquoi: ['La main est passée sous la lame', 'Le carter de protection était démonté', 'Il gênait pour les petites pièces', 'Aucun outil adapté pour les petites pièces', 'Le besoin n\'avait pas été remonté'], m5: { materiel: 'Carter démonté', methode: 'Pas de mode opératoire pour petites pièces' }, causeRacine: 'Absence de poussoir pour les petites pièces, ce qui a conduit à démonter le carter' };

  const R = [
    ['s2', 'Atelier découpe', 'Découpe à la cisaille', 'Machines et outils', 'Coupure, amputation des doigts', 4, 3, 'Carter, gants anti-coupure', 4, 1],
    ['s2', 'Magasin', 'Circulation des chariots', 'Circulation / engins', 'Collision chariot / piéton', 4, 3, 'Formation des caristes', '', ''],
    ['s2', 'Atelier soudure', 'Soudage à l\'arc', 'Incendie / explosion', 'Départ de feu', 3, 2, 'Permis de feu, extincteurs', 3, 1],
    ['s2', 'Atelier soudure', 'Meulage', 'Poussières', 'Projection dans les yeux', 2, 4, 'Lunettes disponibles', 2, 2],
    ['s3', 'Gros œuvre', 'Travail sur échafaudage', 'Chute de hauteur', 'Chute mortelle', 4, 2, 'Garde-corps, harnais', 4, 1],
    ['s3', 'Terrassement', 'Creusement de tranchées', 'Circulation / engins', 'Ensevelissement, chute', 4, 3, 'Blindage partiel', '', ''],
    ['s3', 'Base vie', 'Travail en plein soleil', 'Chaleur', 'Coup de chaleur', 3, 3, 'Points d\'eau', 3, 2],
    ['s3', 'Électricité chantier', 'Branchements provisoires', 'Électricité', 'Électrisation', 4, 2, 'Coffrets avec différentiel', 4, 1],
    ['s1', 'Bureaux', 'Travail sur écran', 'Risques psychosociaux', 'Stress, troubles musculosquelettiques', 2, 3, 'Sièges réglables', 2, 2],
    ['s1', 'Bureaux', 'Déplacements dans les locaux', 'Chute de plain-pied', 'Glissade, fracture', 2, 2, 'Nettoyage hors horaires', '', ''],
    ['s2', 'Maintenance', 'Vidange hydraulique', 'Aspect environnemental', 'Pollution du sol', 3, 2, 'Bacs de rétention', 3, 1],
    ['s2', 'Magasin', 'Manutention des sacs', 'Manutention manuelle', 'Lombalgie', 2, 4, 'Diable disponible', 2, 3]
  ].map(([site, unite, activite, danger, risque, g, p, mesures, gRes, pRes]) => ({ id: uid(), ref: ref('RI'), site, unite, activite, danger, risque, g: String(g), p: String(p), mesures, gRes: String(gRes), pRes: String(pRes), cree: T }));

  const A = [];
  const act = (titre, site, resp, ech, statut, origine, extra = {}) => A.push({ id: uid(), ref: ref('AC'), titre, site, responsable: resp, echeance: d(ech), statut, type: 'Corrective', priorite: 'Normale', origine, cree: d(Math.min(ech - 30, -1)), ...(ACTION_OUVERTE.includes(statut) ? {} : { dateRealisation: d(ech - 5) }), ...extra });
  act('Fabriquer et installer un poussoir pour petites pièces', 's2', 'p2', -170, 'Efficace', { type: 'evenement', id: E[0].id }, { efficacite: 'Aucune coupure depuis 6 mois, carter toujours en place lors des visites.' });
  act('Mettre en place des filets anti-chute d\'objets', 's3', 'p4', -120, 'Réalisée', { type: 'evenement', id: E[1].id });
  act('Marquer au sol les emplacements des extincteurs', 's2', 'p3', -100, 'Efficace', { type: 'evenement', id: E[2].id });
  act('Installer un marchepied fixe sur les bennes', 's3', 'p8', -20, 'En cours', { type: 'evenement', id: E[3].id });
  act('Remplacer les flexibles hydrauliques usés de la presse', 's2', 'p6', -10, 'À faire', { type: 'evenement', id: E[4].id }, { priorite: 'Haute' });
  act('Tracer les allées piétonnes dans le magasin', 's2', 'p7', 15, 'En cours', { type: 'risque', id: R[1].id }, { type: 'Préventive', priorite: 'Haute' });
  act('Recalibrer le poste de soudure n° 3', 's2', 'p6', -2, 'En cours', { type: 'evenement', id: E[7].id });
  act('Rendre obligatoires les lunettes au meulage (affichage + contrôle)', 's2', 'p3', 10, 'À faire', { type: 'evenement', id: E[8].id });
  act('Blinder toutes les tranchées de plus de 1,30 m', 's3', 'p4', 7, 'À faire', { type: 'risque', id: R[5].id }, { type: 'Préventive', priorite: 'Haute' });
  act('Former l\'équipe à la prévention des coups de chaleur', 's3', 'p1', 25, 'À faire', { type: 'risque', id: R[6].id }, { type: 'Préventive' });
  act('Afficher la politique QHSE dans tous les sites', 's1', 'p9', -40, 'Réalisée', undefined, { type: 'Amélioration' });
  act('Mettre à jour le registre des déchets dangereux', 's2', 'p3', -5, 'À faire', undefined);

  const M = [
    { id: 'm1', nom: 'Visite de sécurité terrain', referentiel: 'Interne', q: ['# Organisation', 'Le poste est propre et rangé', 'Les allées de circulation sont dégagées', 'Le balisage des zones dangereuses est en place', '# Équipements de protection', 'Les EPI obligatoires sont portés', 'Les EPI sont en bon état', '# Incendie et urgence', 'Les extincteurs sont accessibles et vérifiés', 'Les issues de secours sont dégagées et signalées', 'La trousse de secours est complète', '# Machines et électricité', 'Les protecteurs des machines sont en place', 'Les coffrets électriques sont fermés', 'Les câbles et rallonges sont en bon état'] },
    { id: 'm2', nom: 'Audit interne ISO 45001', referentiel: 'ISO 45001:2018', q: ['# 5. Leadership et participation', 'La politique SST est établie, communiquée et disponible', 'Les rôles et responsabilités SST sont définis', 'Les travailleurs sont consultés et participent', '# 6. Planification', 'Les dangers sont identifiés et les risques évalués', 'Les exigences légales applicables sont identifiées', 'Des objectifs SST mesurables sont définis', '# 7. Support', 'Les compétences nécessaires sont définies et les formations à jour', 'Les informations documentées sont maîtrisées', '# 8. Réalisation', 'Les mesures de maîtrise des risques sont appliquées', 'La situation d\'urgence est préparée et testée', 'Les sous-traitants sont maîtrisés', '# 9-10. Évaluation et amélioration', 'Les incidents sont déclarés et analysés', 'Les actions correctives sont suivies jusqu\'à efficacité', 'La revue de direction est réalisée'] },
    { id: 'm3', nom: 'Audit interne ISO 9001', referentiel: 'ISO 9001:2015', q: ['# 4. Contexte', 'Les enjeux internes et externes sont identifiés', 'Les parties intéressées et leurs attentes sont connues', '# 5-6. Leadership et planification', 'La politique qualité est communiquée et comprise', 'Les risques et opportunités sont traités', '# 7. Support', 'Les équipements de mesure sont étalonnés', 'Les documents sont à jour et maîtrisés', '# 8. Réalisation', 'Les exigences client sont revues avant engagement', 'Les fournisseurs sont évalués', 'Les produits non conformes sont identifiés et isolés', '# 9-10. Évaluation et amélioration', 'La satisfaction client est mesurée', 'Les audits internes sont planifiés et réalisés', 'Les réclamations sont traitées'] },
    { id: 'm4', nom: 'Inspection environnementale', referentiel: 'ISO 14001:2015', q: ['Les déchets sont triés selon les filières', 'Les produits dangereux sont stockés sur rétention', 'Le registre des déchets est à jour', 'Aucune fuite ni pollution visible au sol', 'Les kits anti-pollution sont disponibles', 'Les consommations d\'eau et d\'énergie sont suivies'] }
  ].map(m => { let ch = ''; return { id: m.id, nom: m.nom, referentiel: m.referentiel, questions: m.q.flatMap(l => l.startsWith('#') ? (ch = l.slice(2), []) : [{ id: uid(), texte: l, chapitre: ch }]) }; });

  const answer = (mod, pattern) => Object.fromEntries(mod.questions.map((q, i) => [q.id, { r: pattern[i % pattern.length] }]));
  const AU = [
    { modele: 'm1', site: 's2', date: d(-80), auditeur: 'p3', type: 'Visite de sécurité', statut: 'Terminé', reponses: answer(M[0], ['C', 'C', 'NC', 'C', 'C', 'C', 'C', 'NC', 'C', 'C', 'C']) },
    { modele: 'm2', site: 's1', date: d(-45), auditeur: 'p5', type: 'Audit interne', perimetre: 'Système SST complet', statut: 'Terminé', reponses: answer(M[1], ['C', 'C', 'C', 'NC', 'C', 'C', 'C']) },
    { modele: 'm1', site: 's3', date: d(-15), auditeur: 'p1', type: 'Visite de sécurité', statut: 'Terminé', reponses: answer(M[0], ['C', 'NC', 'NC', 'C', 'C', 'NA', 'C', 'C', 'C', 'NC', 'C']) },
    { modele: 'm4', site: 's2', date: d(-6), auditeur: 'p1', type: 'Inspection terrain', statut: 'Planifié', reponses: {} },
    { modele: 'm3', site: 's1', date: d(20), auditeur: 'p1', type: 'Audit interne', perimetre: 'Processus achats et commercial', statut: 'Planifié', reponses: {} }
  ].map(a => ({ id: uid(), ref: ref('AU'), ...a }));

  const DOC = [
    ['MQ-01', 'Manuel', 'Manuel du système de management QHSE', 'Direction', '3', 'Approuvé', 'p1', 'p9', -200, 165],
    ['POL-01', 'Politique', 'Politique QHSE', 'Direction', '2', 'Approuvé', 'p1', 'p9', -330, 20],
    ['PR-SST-01', 'Procédure', 'Déclaration et analyse des accidents et incidents', 'Santé-sécurité', '2', 'Approuvé', 'p1', 'p9', -150, 215],
    ['PR-SST-02', 'Procédure', 'Évaluation des risques professionnels', 'Santé-sécurité', '1', 'Approuvé', 'p1', 'p9', -380, -15],
    ['PR-SST-03', 'Procédure', 'Permis de travail et permis de feu', 'Santé-sécurité', '1', 'En vérification', 'p3', 'p1', null, 365],
    ['PR-ENV-01', 'Procédure', 'Gestion des déchets', 'Environnement', '1', 'Approuvé', 'p3', 'p1', -100, 265],
    ['PR-QUA-01', 'Procédure', 'Maîtrise des produits non conformes', 'Qualité', '2', 'Approuvé', 'p5', 'p9', -60, 305],
    ['MO-PRO-04', 'Mode opératoire', 'Utilisation de la cisaille guillotine', 'Production', '2', 'Approuvé', 'p2', 'p1', -165, 200],
    ['PU-01', 'Plan d\'urgence', 'Plan d\'urgence incendie et évacuation', 'Santé-sécurité', '1', 'Approuvé', 'p1', 'p9', -350, 15],
    ['FO-SST-01', 'Formulaire', 'Fiche de déclaration d\'événement', 'Santé-sécurité', '1', 'Brouillon', 'p3', 'p1', null, 365]
  ].map(([code, typeDoc, titre, processus, version, statut, redacteur, approbateur, appr, revue]) => ({ id: uid(), code, typeDoc, titre, processus, version, statut, redacteur, approbateur, dateApprobation: appr == null ? '' : d(appr), prochaineRevue: d(revue), cree: T }));

  const F = [
    ['p7', 'Autorisation de conduite', 'Conduite de chariot élévateur', -700, 20], ['p6', 'Habilitation', 'Habilitation électrique B1V', -1000, -30], ['p6', 'Formation', 'Sauveteur secouriste du travail (SST)', -500, 230],
    ['p3', 'Formation', 'Sauveteur secouriste du travail (SST)', -300, 430], ['p4', 'Formation', 'Travail en hauteur', -400, 330], ['p8', 'Formation', 'Travail en hauteur', -800, -70],
    ['p10', 'Certificat', 'Qualification soudeur', -200, 530], ['p10', 'Visite médicale', 'Visite médicale périodique', -330, 35], ['p2', 'Formation', 'Équipier de première intervention (EPI incendie)', -250, 115],
    ['p1', 'Certificat', 'Auditeur interne ISO 45001', -500, null], ['p5', 'Certificat', 'Auditeur interne ISO 9001', -600, null], ['p7', 'Visite médicale', 'Visite médicale périodique', -100, 265]
  ].map(([personne, categorie, intitule, obt, exp]) => ({ id: uid(), personne, categorie, intitule, dateObtention: d(obt), dateExpiration: exp == null ? '' : d(exp), cree: T }));

  const EX = [
    ['Code du travail — obligations générales de sécurité de l\'employeur', 'Santé-sécurité', 'Général', 'Évaluer les risques et prendre les mesures nécessaires pour protéger la santé des travailleurs.', 'Conforme', 'p1'],
    ['Réglementation sur la prévention des incendies dans les établissements', 'Santé-sécurité', 'Incendie', 'Extincteurs vérifiés chaque année, exercice d\'évacuation périodique.', 'Partiellement conforme', 'p3'],
    ['Réglementation sur les installations électriques', 'Santé-sécurité', 'Électricité', 'Vérification périodique des installations par un organisme agréé.', 'Non conforme', 'p6'],
    ['Code de l\'environnement — gestion des déchets dangereux', 'Environnement', 'Déchets', 'Tenir un registre des déchets dangereux et les confier à un collecteur agréé.', 'Partiellement conforme', 'p3'],
    ['Visite médicale d\'embauche et périodique', 'Social', 'Médecine du travail', 'Chaque salarié bénéficie d\'une visite médicale à l\'embauche puis périodiquement.', 'Conforme', 'p1'],
    ['Port des équipements de protection individuelle', 'Santé-sécurité', 'EPI', 'Fournir gratuitement les EPI adaptés et veiller à leur utilisation.', 'Conforme', 'p1'],
    ['ISO 9001 — exigences client contractuelles', 'Qualité', 'Client', 'Respecter les spécifications et délais du cahier des charges client.', 'À évaluer', 'p5'],
    ['Appareils de levage — vérification périodique', 'Santé-sécurité', 'Levage', 'Vérification semestrielle des chariots et appareils de levage.', 'À évaluer', 'p2']
  ].map(([texte, domaine, theme, exigence, conformite, responsable]) => ({ id: uid(), ref: ref('EX'), texte, domaine, theme, exigence, conformite, responsable, applicable: 'Oui', derniereEvaluation: conformite === 'À évaluer' ? '' : d(-60), cree: T }));

  const H = [];
  lastMonths(12).forEach(mo => { H.push({ id: uid(), mois: mo, site: 's1', heures: 4200, effectif: 25 }); H.push({ id: uid(), mois: mo, site: 's2', heures: 15600, effectif: 92 }); H.push({ id: uid(), mois: mo, site: 's3', heures: 9800, effectif: 55 }); });

  return { meta: { version: 1, compteurs: cpt, site: '' }, sites: S, personnel: P, evenements: E, risques: R, actions: A, modeles: M, audits: AU, documents: DOC, formations: F, exigences: EX, heures: H };
}

/* ───────────── Démarrage ─────────────
   1. Si la page est servie par le serveur QHSE (api/session répond en JSON) : connexion / installation / mode serveur.
   2. Sinon (simple hébergement de fichiers, ou ouverture du fichier) : mode local, comme avant.
   3. Hors ligne avec un cache serveur sur l'appareil : mode serveur hors ligne, les saisies partent au retour du réseau. */
$('#siteFilter').onchange = e => { DB.d.meta.site = e.target.value; DB.save(); route(); };
$('#alertBtn').onclick = openAlerts;
$('#userBtn').onclick = () => { location.hash = '#/parametres'; adminState.onglet = 'compte'; route(); };
$('#menuBtn').onclick = () => $('#sidebar').classList.toggle('open');
$('#modal').addEventListener('mousedown', e => { if (e.target.id === 'modal') closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); $('#alertDrawer').hidden = true; } });

(async function demarrer() {
  let reponse = null, reseau = true;
  if (location.protocol.startsWith('http')) {
    try { reponse = await fetch('api/session', { credentials: 'same-origin', cache: 'no-store' }); }
    catch (e) { reseau = false; }
  }
  let j = null;
  if (reponse && (reponse.headers.get('content-type') || '').includes('application/json')) { try { j = await reponse.json(); } catch (e) { } }
  if (j) {
    MODE.serveur = true; DB.d = { meta: {} }; DB.normaliser();
    if (j.installation) return afficherInstallation();
    if (reponse.status === 401) {
      try { const c = JSON.parse(localStorage.getItem(KEY_SRV)); if (c?.user) MODE.user = c.user; } catch (e) { }
      return afficherConnexion();
    }
    return ouvrirSessionServeur(j.user).catch(err => { toast(err.message); afficherConnexion(); });
  }
  if (!reseau) {
    let c = null; try { c = JSON.parse(localStorage.getItem(KEY_SRV)); } catch (e) { }
    if (c?.user && c.d) return ouvrirSessionServeur(c.user, true);
  }
  DB.load(); demarrerInterface();
})();
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});

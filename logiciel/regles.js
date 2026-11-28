/* Règles métier partagées entre le navigateur (window.Regles) et le serveur (require('../regles.js')).
   Fonctions pures : elles reçoivent les données, elles ne lisent ni n'écrivent aucun stockage. */
(function (root) {
  'use strict';
  const pad = n => String(n).padStart(2, '0');
  const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const today = () => iso(new Date());
  const addDays = (s, n) => { const d = new Date(s + 'T00:00:00'); d.setDate(d.getDate() + n); return iso(d); };
  const addMonths = (s, n) => { const d = new Date(s + 'T00:00:00'); d.setMonth(d.getMonth() + n); return iso(d); };
  const daysBetween = (a, b) => Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 86400000);
  const fmtDate = s => s ? new Date(s + 'T00:00:00').toLocaleDateString('fr-FR') : '—';

  const ACTION_OUVERTE = ['À faire', 'En cours'];
  const actionLate = a => ACTION_OUVERTE.includes(a.statut) && !!a.echeance && a.echeance < today();
  const crit = (g, p) => (+g || 0) * (+p || 0);
  const critLevel = c => c >= 12 ? 4 : c >= 8 ? 3 : c >= 4 ? 2 : c > 0 ? 1 : 0;
  function echeanceState(date, alerteJours = 60) {
    if (!date) return { cls: 'grey', txt: 'Sans échéance', etat: 'ok' };
    const d = daysBetween(today(), date);
    if (d < 0) return { cls: 'red', txt: 'Expiré', etat: 'expire' };
    if (d <= alerteJours) return { cls: 'orange', txt: `Dans ${d} j`, etat: 'bientot' };
    return { cls: 'green', txt: 'Valide', etat: 'ok' };
  }
  const docRevueState = d => d.statut === 'Obsolète' ? { cls: 'grey', txt: 'Obsolète', etat: 'ok' } : echeanceState(d.prochaineRevue, 30);
  function auditScore(a) {
    const r = Object.values(a.reponses || {});
    const c = r.filter(x => x.r === 'C').length, nc = r.filter(x => x.r === 'NC').length, na = r.filter(x => x.r === 'NA').length;
    return { c, nc, na, repondu: c + nc + na, score: c + nc ? Math.round(100 * c / (c + nc)) : null };
  }

  /* Liste des alertes. `pour` = identifiants des personnes (fiches Personnel) concernées, pour les notifications. */
  function alertes(d, site = '') {
    const L = c => d[c] || [];
    const get = (c, id) => L(c).find(x => x.id === id);
    const nom = id => (get('personnel', id) || {}).nom || '';
    const siteNom = id => (get('sites', id) || {}).nom || '—';
    const respSite = id => (get('sites', id) || {}).responsable;
    const inSite = o => !site || !('site' in o) || o.site === site;
    const actionsFor = (type, id) => L('actions').filter(a => a.origine && a.origine.type === type && a.origine.id === id);
    const ids = (...x) => [...new Set(x.filter(Boolean))];
    const out = [];
    L('actions').filter(inSite).filter(actionLate).forEach(a => out.push({ cle: 'action:' + a.id, niv: 'red', txt: `Action en retard : ${a.titre}`, sub: `Échéance ${fmtDate(a.echeance)} · ${nom(a.responsable)}`, go: `#/actions?ouvrir=${a.id}`, pour: ids(a.responsable) }));
    L('formations').forEach(f => {
      const pers = get('personnel', f.personne);
      if (site && (pers || {}).site !== site) return;
      const s = echeanceState(f.dateExpiration);
      if (s.etat !== 'ok') out.push({ cle: 'formation:' + f.id, niv: s.etat === 'expire' ? 'red' : 'orange', txt: `${f.intitule} — ${nom(f.personne)}`, sub: s.etat === 'expire' ? `Expirée le ${fmtDate(f.dateExpiration)}` : `Expire le ${fmtDate(f.dateExpiration)}`, go: `#/formations?ouvrir=${f.id}`, pour: ids(f.personne, respSite((pers || {}).site)) });
    });
    L('documents').forEach(doc => {
      const s = docRevueState(doc);
      if (s.etat !== 'ok') out.push({ cle: 'document:' + doc.id, niv: s.etat === 'expire' ? 'red' : 'orange', txt: `Revue du document ${doc.code}`, sub: `${doc.titre} · prévue le ${fmtDate(doc.prochaineRevue)}`, go: `#/documents?ouvrir=${doc.id}`, pour: ids(doc.redacteur) });
    });
    L('audits').filter(inSite).filter(a => a.statut !== 'Terminé' && a.date < today()).forEach(a => out.push({ cle: 'audit:' + a.id, niv: 'orange', txt: `Audit non réalisé : ${(get('modeles', a.modele) || {}).nom || ''}`, sub: `Prévu le ${fmtDate(a.date)} · ${siteNom(a.site)}`, go: `#/audits/${a.id}`, pour: ids(a.auditeur) }));
    L('risques').filter(inSite).filter(r => critLevel(crit(r.g, r.p)) === 4 && !actionsFor('risque', r.id).some(a => a.statut !== 'Inefficace')).forEach(r => out.push({ cle: 'risque:' + r.id, niv: 'red', txt: `Risque critique sans action : ${r.risque}`, sub: `${r.unite} · ${siteNom(r.site)}`, go: `#/risques?ouvrir=${r.id}`, pour: ids(respSite(r.site)) }));
    L('exigences').filter(e => e.applicable !== 'Non' && e.conformite === 'Non conforme' && !actionsFor('exigence', e.id).length).forEach(e => out.push({ cle: 'exigence:' + e.id, niv: 'red', txt: `Non-conformité réglementaire : ${e.texte}`, sub: e.theme || e.domaine, go: `#/exigences?ouvrir=${e.id}`, pour: ids(e.responsable) }));
    L('evenements').filter(inSite).filter(e => e.statut === 'Déclaré' && daysBetween(e.date, today()) > 7).forEach(e => out.push({ cle: 'evenement:' + e.id, niv: 'orange', txt: `Événement non analysé depuis ${daysBetween(e.date, today())} j`, sub: `${e.ref} · ${e.titre}`, go: `#/evenements/${e.id}`, pour: ids(respSite(e.site)) }));
    return out.sort((a, b) => (a.niv === 'red' ? 0 : 1) - (b.niv === 'red' ? 0 : 1));
  }

  /* Droits par rôle. Le serveur les applique ; le navigateur s'en sert pour masquer les boutons. */
  const ROLES = {
    admin: { nom: 'Administrateur', ecrire: '*', supprimer: true },
    responsable: { nom: 'Responsable QHSE', ecrire: '*', supprimer: true },
    contributeur: { nom: 'Contributeur terrain', ecrire: ['evenements', 'audits', 'actions'], supprimer: false },
    lecteur: { nom: 'Lecteur', ecrire: [], supprimer: false }
  };
  const peutEcrire = (role, col) => { const r = ROLES[role]; return !!r && (r.ecrire === '*' || r.ecrire.includes(col)); };
  const peutSupprimer = (role, col) => peutEcrire(role, col) && !!(ROLES[role] || {}).supprimer;

  const R = { pad, iso, today, addDays, addMonths, daysBetween, fmtDate, ACTION_OUVERTE, actionLate, crit, critLevel, echeanceState, docRevueState, auditScore, alertes, ROLES, peutEcrire, peutSupprimer };
  if (typeof module !== 'undefined' && module.exports) module.exports = R; else root.Regles = R;
})(typeof self !== 'undefined' ? self : this);

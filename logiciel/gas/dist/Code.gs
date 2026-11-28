/* UNIVERSNORMES QHSE — version gratuite (Google Apps Script).
   FICHIER GÉNÉRÉ par gas/construire.js : ne pas modifier à la main, modifier regles.js et gas/src/serveur-gas.js.
   Généré le 2026-11-28. */

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


/* UNIVERSNORMES QHSE — serveur gratuit sur Google Apps Script.
   Données : un classeur Google Sheets (créé automatiquement). Photos et pièces jointes : un dossier Google Drive.
   E-mails : Gmail du compte qui déploie (MailApp, 100 destinataires par jour avec un compte Gmail gratuit).
   Même API que le serveur Node (serveur/server.js) : l'application est identique dans les deux cas.

   Sécurité : toute fonction globale SANS « _ » final peut être appelée depuis la page (google.script.run).
   Seules doGet, doPost, api, installer et recapQuotidien sont publiques ; tout le reste finit par « _ ». */

var COLLECTIONS_ = ['sites', 'personnel', 'evenements', 'risques', 'actions', 'modeles', 'audits', 'documents', 'formations', 'exigences', 'heures'];
var DUREE_SESSION_ = 30 * 24 * 3600 * 1000;
var MAX_FICHIER_ = 10 * 1024 * 1024;
var MAX_CELLULE_ = 49000;

/* ───────── Points d'entrée ───────── */
function doGet() {
  var html = HtmlService.createHtmlOutputFromFile('Index').getContent()
    .replace('__QHSE_URL__', ScriptApp.getService().getUrl() || '');
  return HtmlService.createHtmlOutput(html)
    .setTitle('UNIVERSNORMES QHSE')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
}
function doPost(e) {
  var rep;
  try { rep = traiter_(JSON.parse(e.postData.contents)); }
  catch (err) { rep = { status: 400, corps: { erreur: 'Requête illisible' } }; }
  return ContentService.createTextOutput(JSON.stringify(rep)).setMimeType(ContentService.MimeType.JSON);
}
/* Appel depuis la page servie par doGet : google.script.run.api(json) */
function api(json) { return JSON.stringify(traiter_(JSON.parse(json))); }

/* À exécuter une fois depuis l'éditeur : autorise le script, crée le classeur, le dossier et le déclencheur quotidien. */
function installer() {
  var ss = classeur_(), dossier = dossier_();
  installerDeclencheur_();
  var url = ScriptApp.getService().getUrl();
  Logger.log('Classeur des données : ' + ss.getUrl());
  Logger.log('Dossier des photos : ' + dossier.getUrl());
  Logger.log(url ? 'Adresse du logiciel : ' + url : 'Étape suivante : Déployer → Nouveau déploiement → Application Web.');
  return 'OK';
}

/* Déclencheur quotidien (et appel manuel par un administrateur). Une seule fois par jour, du lundi au vendredi. */
function recapQuotidien() { return recap_(false); }

/* ───────── Erreurs, réponses ───────── */
function Erreur_(status, message) { var e = new Error(message); e.status = status; return e; }
function traiter_(req) {
  var rep = { status: 200, corps: null };
  try { rep.corps = router_(req || {}, rep); }
  catch (err) {
    rep.status = err.status || 500;
    rep.corps = { erreur: err.status ? err.message : 'Erreur interne : ' + err.message };
    if (!err.status) console.error(err && err.stack || err);
  }
  return rep;
}

/* ───────── Stockage : Sheets, Drive, propriétés ───────── */
var _ss = null, _fiches = null;
function props_() { return PropertiesService.getScriptProperties(); }
function reglage_(cle, valeur) {
  if (valeur === undefined) return props_().getProperty('r_' + cle);
  props_().setProperty('r_' + cle, String(valeur));
}
var FEUILLES_ = {
  fiches: ['collection', 'id', 'maj', 'par', 'supprime', 'data'],
  utilisateurs: ['id', 'email', 'nom', 'role', 'personne', 'hash', 'actif', 'notifEmail', 'cree', 'derniereConnexion'],
  journal: ['quand', 'utilisateur', 'action', 'collection', 'id', 'libelle'],
  notifications: ['quand', 'canal', 'destinataire', 'sujet', 'statut', 'erreur']
};
function classeur_() {
  if (_ss) return _ss;
  var id = props_().getProperty('classeur');
  if (id) { try { _ss = SpreadsheetApp.openById(id); } catch (e) { _ss = null; } }
  if (!_ss) {
    _ss = SpreadsheetApp.create('UNIVERSNORMES QHSE — données (ne pas modifier à la main)');
    var noms = Object.keys(FEUILLES_);
    noms.forEach(function (nom, i) {
      var f = i === 0 ? _ss.getSheets()[0] : _ss.insertSheet(nom);
      if (i === 0) f.setName(nom);
      f.getRange(1, 1, 1, FEUILLES_[nom].length).setValues([FEUILLES_[nom]]);
      f.setFrozenRows(1);
      f.getRange('A:Z').setNumberFormat('@'); // texte brut : Sheets ne transforme pas les identifiants en dates ou nombres
    });
    props_().setProperty('classeur', _ss.getId());
  }
  return _ss;
}
function feuille_(nom) { return classeur_().getSheetByName(nom); }
function dossier_() {
  var id = props_().getProperty('dossier');
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) { } }
  var d = DriveApp.createFolder('UNIVERSNORMES QHSE — photos et pièces jointes');
  props_().setProperty('dossier', d.getId());
  return d;
}
function verrou_(fn) {
  var l = LockService.getScriptLock();
  l.waitLock(30000);
  try { return fn(); } finally { l.releaseLock(); }
}
/* Sheets interprète comme une formule tout texte commençant par = + - @ : l'apostrophe initiale force le texte
   (elle n'est pas conservée dans la valeur relue). */
function cellule_(v) { return typeof v === 'string' && /^[=+\-@]/.test(v) ? "'" + v : v; }
function ligneSure_(l) { return l.map(cellule_); }
function lignes_(nom) {
  var f = feuille_(nom), n = f.getLastRow() - 1;
  return n > 0 ? f.getRange(2, 1, n, FEUILLES_[nom].length).getValues() : [];
}

/* Fiches : une ligne par fiche (collection, id, maj, par, supprime, JSON). */
function chargerFiches_() {
  if (_fiches) return _fiches;
  var rows = lignes_('fiches'), index = {};
  rows.forEach(function (r, i) { index[r[0] + '/' + r[1]] = i; });
  _fiches = { rows: rows, index: index };
  return _fiches;
}
function curseur_() { return Number(props_().getProperty('curseur') || 0); }
function horloge_() {
  var t = Math.max(Date.now(), curseur_() + 1);
  props_().setProperty('curseur', String(t));
  return t;
}
function getFiche_(c, id) {
  var F = chargerFiches_(), i = F.index[c + '/' + id];
  if (i === undefined || Number(F.rows[i][4])) return null;
  return JSON.parse(F.rows[i][5]);
}
function ecrireLigne_(c, id, json, par, supprime) {
  var F = chargerFiches_(), cle = c + '/' + id, i = F.index[cle];
  var ligne = ligneSure_([c, id, horloge_(), par, supprime ? 1 : 0, json]);
  var f = feuille_('fiches');
  if (i === undefined) { f.appendRow(ligne); F.index[cle] = F.rows.length; F.rows.push(ligne); }
  else { f.getRange(i + 2, 1, 1, 6).setValues([ligne]); F.rows[i] = ligne; }
}
function putFiche_(c, data, par) {
  var json = JSON.stringify(data);
  if (json.length > MAX_CELLULE_) throw Erreur_(413, 'Fiche trop volumineuse : retirez du texte ou des pièces jointes');
  ecrireLigne_(c, data.id, json, par, false);
}
function supprimerFiche_(c, id, par) { ecrireLigne_(c, id, '', par, true); }
function toutesDonnees_() {
  var d = {}; COLLECTIONS_.forEach(function (c) { d[c] = []; });
  chargerFiches_().rows.forEach(function (r) { if (!Number(r[4]) && d[r[0]]) d[r[0]].push(JSON.parse(r[5])); });
  return d;
}
function changesDepuis_(depuis) {
  if (depuis >= curseur_()) return []; // rien de neuf : réponse immédiate sans lire le classeur
  return chargerFiches_().rows.filter(function (r) { return Number(r[2]) > depuis; })
    .sort(function (a, b) { return Number(a[2]) - Number(b[2]); })
    .map(function (r) { return { c: r[0], id: r[1], data: Number(r[4]) ? null : JSON.parse(r[5]) }; });
}
function journaliser_(user, action, c, id, libelle) {
  feuille_('journal').appendRow(ligneSure_([Date.now(), user, action, c, id, String(libelle || '').slice(0, 200)]));
}
function prochaineRef_(prefix) {
  var cle = 'cpt_' + prefix + '-' + new Date().getFullYear();
  var n = Number(props_().getProperty(cle) || 0) + 1;
  props_().setProperty(cle, String(n));
  return prefix + '-' + new Date().getFullYear() + '-' + ('00' + n).slice(-3);
}
function importerCompteurs_(compteurs) {
  Object.keys(compteurs || {}).forEach(function (k) {
    var n = compteurs[k];
    if (/^[A-Z]{2,4}-\d{4}$/.test(k) && Math.floor(n) === n && Number(props_().getProperty('cpt_' + k) || 0) < n) props_().setProperty('cpt_' + k, String(n));
  });
}

/* Pièces jointes envoyées en data: URL → fichier dans le dossier Drive, partagé « toute personne disposant du lien »
   (adresse impossible à deviner), remplacé dans la fiche par une URL. */
function extraireFichiers_(obj, par) {
  if (Array.isArray(obj)) { obj.forEach(function (x) { extraireFichiers_(x, par); }); return; }
  if (!obj || typeof obj !== 'object') return;
  if (typeof obj.data === 'string' && obj.data.indexOf('data:') === 0) {
    var m = /^data:([\w.+-]+\/[\w.+-]+)?(;[^,]*)?,([\s\S]*)$/.exec(obj.data);
    if (!m) throw Erreur_(400, 'Pièce jointe illisible');
    var type = m[1] || 'application/octet-stream';
    var octets = /;base64/.test(m[2] || '') ? Utilities.base64Decode(m[3]) : Utilities.newBlob(decodeURIComponent(m[3])).getBytes();
    if (octets.length > MAX_FICHIER_) throw Erreur_(413, 'Pièce jointe trop lourde (10 Mo max)');
    var fichier = dossier_().createFile(Utilities.newBlob(octets, type, String(obj.nom || 'fichier').slice(0, 200)));
    fichier.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    var fid = fichier.getId();
    delete obj.data;
    obj.url = /^image\//.test(type) ? 'https://drive.google.com/thumbnail?id=' + fid + '&sz=w1600' : 'https://drive.google.com/file/d/' + fid + '/view';
    obj.drive = fid; obj.type = type; obj.taille = octets.length;
    return;
  }
  Object.keys(obj).forEach(function (k) { if (obj[k] && typeof obj[k] === 'object') extraireFichiers_(obj[k], par); });
}

/* ───────── Comptes et sessions ───────── */
function octets_(s) { return Utilities.newBlob(String(s)).getBytes(); }
function hex_(bytes) { return bytes.map(function (b) { return ('0' + (b & 0xff).toString(16)).slice(-2); }).join(''); }
function deHex_(h) { var o = []; for (var i = 0; i < h.length; i += 2) { var v = parseInt(h.substr(i, 2), 16); o.push(v > 127 ? v - 256 : v); } return o; }
/* PBKDF2-HMAC-SHA256 (un bloc), 600 itérations : Apps Script n'a pas scrypt. */
function pbkdf2_(mdp, sel, n) {
  var cle = octets_(mdp), u = Utilities.computeHmacSha256Signature(sel.concat([0, 0, 0, 1]), cle), t = u.slice();
  for (var i = 1; i < n; i++) { u = Utilities.computeHmacSha256Signature(u, cle); for (var j = 0; j < t.length; j++) t[j] ^= u[j]; }
  return t;
}
function hacher_(mdp) {
  var sel = deHex_(Utilities.getUuid().replace(/-/g, ''));
  return 'pbkdf2$600$' + hex_(sel) + '$' + hex_(pbkdf2_(mdp, sel, 600));
}
function verifierMdp_(mdp, stocke) {
  var p = String(stocke).split('$');
  if (p[0] !== 'pbkdf2' || p.length !== 4) return false;
  var calc = hex_(pbkdf2_(mdp, deHex_(p[2]), Number(p[1])));
  var diff = calc.length ^ p[3].length;
  for (var i = 0; i < calc.length; i++) diff |= calc.charCodeAt(i) ^ p[3].charCodeAt(i);
  return diff === 0;
}
var COLS_U_ = FEUILLES_.utilisateurs;
function users_() {
  return lignes_('utilisateurs').map(function (r, i) {
    var u = { ligne: i + 2 }; COLS_U_.forEach(function (k, j) { u[k] = r[j]; });
    u.actif = Number(u.actif) === 1; u.notifEmail = Number(u.notifEmail) === 1;
    u.cree = Number(u.cree) || 0; u.derniereConnexion = Number(u.derniereConnexion) || null;
    return u;
  });
}
function userPublic_(u) { return u && { id: u.id, email: u.email, nom: u.nom, role: u.role, personne: u.personne || '', actif: u.actif, notifEmail: u.notifEmail, derniereConnexion: u.derniereConnexion }; }
function userParEmail_(email) { var e = String(email || '').trim().toLowerCase(); return users_().filter(function (u) { return String(u.email).toLowerCase() === e; })[0]; }
function userParId_(id) { return users_().filter(function (u) { return u.id === id; })[0]; }
function ecrireUser_(u) {
  var ligne = ligneSure_(COLS_U_.map(function (k) { return k === 'actif' || k === 'notifEmail' ? (u[k] ? 1 : 0) : (u[k] === null || u[k] === undefined ? '' : u[k]); }));
  if (u.ligne) feuille_('utilisateurs').getRange(u.ligne, 1, 1, ligne.length).setValues([ligne]);
  else feuille_('utilisateurs').appendRow(ligne);
}
function creerUser_(b) {
  var u = { id: Utilities.getUuid(), email: String(b.email).trim(), nom: String(b.nom).trim(), role: b.role, personne: b.personne || '', hash: hacher_(b.motDePasse), actif: true, notifEmail: b.notifEmail !== false, cree: Date.now(), derniereConnexion: '' };
  ecrireUser_(u); return userParId_(u.id);
}
function mdpValide_(m) { return typeof m === 'string' && m.length >= 8; }

function ouvrirSession_(userId) {
  var jeton = (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, '');
  var p = props_(), maintenant = Date.now();
  // Ménage des sessions expirées
  var toutes = p.getProperties();
  Object.keys(toutes).forEach(function (k) { if (k.indexOf('s_') === 0) { try { if (JSON.parse(toutes[k]).exp < maintenant) p.deleteProperty(k); } catch (e) { p.deleteProperty(k); } } });
  p.setProperty('s_' + jeton, JSON.stringify({ u: userId, exp: maintenant + DUREE_SESSION_ }));
  var u = userParId_(userId); u.derniereConnexion = maintenant; ecrireUser_(u);
  return jeton;
}
function fermerSessions_(userId, sauf) {
  var p = props_(), toutes = p.getProperties();
  Object.keys(toutes).forEach(function (k) { if (k.indexOf('s_') === 0 && k !== 's_' + sauf) { try { if (JSON.parse(toutes[k]).u === userId) p.deleteProperty(k); } catch (e) { } } });
}
function userDeJeton_(jeton) {
  if (!jeton || !/^[0-9a-f]{64}$/.test(jeton)) return null;
  var s = props_().getProperty('s_' + jeton); if (!s) return null;
  s = JSON.parse(s); if (s.exp < Date.now()) { props_().deleteProperty('s_' + jeton); return null; }
  var u = userParId_(s.u);
  return u && u.actif ? u : null;
}
/* Anti-force brute : 8 échecs en 15 minutes bloquent l'adresse. */
function bloque_(email) { return Number(CacheService.getScriptCache().get('echec_' + email) || 0) >= 8; }
function noterEchec_(email) { var c = CacheService.getScriptCache(), k = 'echec_' + email; c.put(k, String(Number(c.get(k) || 0) + 1), 900); }

/* ───────── Écriture d'une fiche ───────── */
function ecrire_(user, op) {
  var c = op.c, id = op.id;
  if (COLLECTIONS_.indexOf(c) < 0) throw Erreur_(400, 'Collection inconnue : ' + c);
  if (typeof id !== 'string' || !/^[\w-]{1,64}$/.test(id)) throw Erreur_(400, 'Identifiant invalide');
  var avant = getFiche_(c, id);
  if (op.op === 'del') {
    if (!Regles.peutSupprimer(user.role, c)) throw Erreur_(403, 'Vous n\'avez pas le droit de supprimer cette fiche');
    if (!avant) return { c: c, id: id, data: null };
    supprimerFiche_(c, id, user.nom);
    journaliser_(user.nom, 'suppression', c, id, avant.ref || avant.code || avant.nom || avant.titre);
    return { c: c, id: id, data: null };
  }
  if (!Regles.peutEcrire(user.role, c)) throw Erreur_(403, 'Vous n\'avez pas le droit de modifier ces fiches');
  var data = op.data;
  if (!data || typeof data !== 'object' || Array.isArray(data) || data.id !== id) throw Erreur_(400, 'Fiche invalide');
  if (data._refPending) {
    var prefix = String(data._refPending);
    if (!/^[A-Z]{2,4}$/.test(prefix)) throw Erreur_(400, 'Préfixe invalide');
    data.ref = avant && avant.ref && String(avant.ref).indexOf('…') < 0 ? avant.ref : prochaineRef_(prefix);
    delete data._refPending;
  }
  extraireFichiers_(data, user.nom);
  data._maj = { quand: Date.now(), par: user.nom };
  if (avant && avant._cree) data._cree = avant._cree; else if (!avant) data._cree = { quand: Date.now(), par: user.nom };
  putFiche_(c, data, user.nom);
  journaliser_(user.nom, avant ? 'modification' : 'création', c, id, data.ref || data.code || data.nom || data.titre || data.intitule || data.mois);
  try { apresEnregistrement_(c, avant, data, user); } catch (e) { console.error(e); }
  return { c: c, id: id, data: data };
}
function importer_(user, donnees) {
  if (!donnees || typeof donnees !== 'object') return 0;
  var n = 0;
  COLLECTIONS_.forEach(function (c) {
    (Array.isArray(donnees[c]) ? donnees[c] : []).forEach(function (rec) {
      if (!rec || typeof rec.id !== 'string') return;
      var copie = JSON.parse(JSON.stringify(rec));
      extraireFichiers_(copie, user.nom);
      putFiche_(c, copie, user.nom); n++;
    });
  });
  importerCompteurs_(donnees.meta && donnees.meta.compteurs);
  journaliser_(user.nom, 'import', '', '', n + ' fiche(s) importée(s)');
  return n;
}

/* ───────── Routes ───────── */
function exigerRole_(user, roles) { if (roles.indexOf(user.role) < 0) throw Erreur_(403, 'Réservé aux administrateurs'); }
function emailValide_(e) { return /^\S+@\S+\.\S+$/.test(e || ''); }
function router_(req, rep) {
  var route = String(req.route || ''), b = req.corps || {}, q = req.query || {};
  if (route === 'GET /api/session') {
    if (!users_().length) return { installation: true };
    var u0 = userDeJeton_(req.token);
    if (!u0) throw Erreur_(401, 'Non connecté');
    return { user: userPublic_(u0), roles: Regles.ROLES };
  }
  if (route === 'POST /api/installation') {
    return verrou_(function () {
      if (users_().length) throw Erreur_(409, 'Le logiciel est déjà installé');
      if (!b.nom || !emailValide_(b.email)) throw Erreur_(400, 'Nom et e-mail valides obligatoires');
      if (!mdpValide_(b.motDePasse)) throw Erreur_(400, 'Mot de passe : 8 caractères minimum');
      var u = creerUser_({ email: b.email, nom: b.nom, role: 'admin', motDePasse: b.motDePasse });
      var n = importer_(u, b.donnees);
      try { installerDeclencheur_(); } catch (e) { console.error(e); }
      rep.jeton = ouvrirSession_(u.id);
      return { user: userPublic_(u), importees: n };
    });
  }
  if (route === 'POST /api/connexion') {
    var email = String(b.email || '').toLowerCase();
    if (bloque_(email)) throw Erreur_(429, 'Trop de tentatives. Réessayez dans 15 minutes.');
    var uc = userParEmail_(email);
    if (!uc || !uc.actif || !verifierMdp_(b.motDePasse, uc.hash)) { noterEchec_(email); throw Erreur_(401, 'E-mail ou mot de passe incorrect'); }
    CacheService.getScriptCache().remove('echec_' + email);
    rep.jeton = ouvrirSession_(uc.id);
    return { user: userPublic_(uc), roles: Regles.ROLES };
  }

  var user = userDeJeton_(req.token);
  if (!user) throw Erreur_(401, 'Session expirée, reconnectez-vous');

  if (route === 'POST /api/deconnexion') { props_().deleteProperty('s_' + req.token); rep.jeton = null; return { ok: true }; }
  if (route === 'POST /api/mot-de-passe') {
    if (!verifierMdp_(b.ancien, user.hash)) throw Erreur_(400, 'Mot de passe actuel incorrect');
    if (!mdpValide_(b.nouveau)) throw Erreur_(400, 'Nouveau mot de passe : 8 caractères minimum');
    user.hash = hacher_(b.nouveau); ecrireUser_(user); fermerSessions_(user.id, req.token);
    return { ok: true };
  }
  if (route === 'GET /api/donnees') return { donnees: toutesDonnees_(), curseur: curseur_() };
  if (route === 'GET /api/changements') {
    var depuis = Number(q.depuis) || 0, cur = curseur_();
    return { changements: changesDepuis_(depuis), curseur: cur };
  }
  if (route === 'POST /api/lot') {
    if (!Array.isArray(b.ops) || b.ops.length > 100) throw Erreur_(400, 'Lot invalide');
    return verrou_(function () {
      var resultats = b.ops.map(function (op) {
        try { var r = ecrire_(user, op); r.ok = true; return r; }
        catch (e) { return { ok: false, c: op && op.c, id: op && op.id, status: e.status || 500, erreur: e.status ? e.message : 'Erreur interne' }; }
      });
      return { resultats: resultats, curseur: curseur_() };
    });
  }
  if (route === 'GET /api/export') {
    exigerRole_(user, ['admin', 'responsable']);
    var comp = {}, pr = props_().getProperties();
    Object.keys(pr).forEach(function (k) { if (k.indexOf('cpt_') === 0) comp[k.slice(4)] = Number(pr[k]); });
    var d = toutesDonnees_(); d.meta = { version: 1, compteurs: comp, exporte: new Date().toISOString() };
    return d;
  }
  if (route === 'POST /api/import') { exigerRole_(user, ['admin']); return verrou_(function () { return { importees: importer_(user, b.donnees), curseur: curseur_() }; }); }

  if (route === 'GET /api/utilisateurs') { exigerRole_(user, ['admin']); return { utilisateurs: users_().map(userPublic_).sort(function (x, y) { return String(x.nom).localeCompare(String(y.nom)); }) }; }
  if (route === 'POST /api/utilisateurs') {
    exigerRole_(user, ['admin']);
    if (!b.nom || !emailValide_(b.email)) throw Erreur_(400, 'Nom et e-mail valides obligatoires');
    if (!Regles.ROLES[b.role]) throw Erreur_(400, 'Rôle inconnu');
    if (!mdpValide_(b.motDePasse)) throw Erreur_(400, 'Mot de passe provisoire : 8 caractères minimum');
    return verrou_(function () {
      if (userParEmail_(b.email)) throw Erreur_(409, 'Un compte existe déjà avec cet e-mail');
      var nu = creerUser_(b);
      journaliser_(user.nom, 'création', 'utilisateurs', nu.id, nu.email);
      return { utilisateur: userPublic_(nu) };
    });
  }
  var mU = /^PUT \/api\/utilisateurs\/([\w-]+)$/.exec(route);
  if (mU) {
    exigerRole_(user, ['admin']);
    return verrou_(function () {
      var cible = userParId_(mU[1]); if (!cible) throw Erreur_(404, 'Compte introuvable');
      if (b.role !== undefined && !Regles.ROLES[b.role]) throw Erreur_(400, 'Rôle inconnu');
      if (b.motDePasse && !mdpValide_(b.motDePasse)) throw Erreur_(400, 'Mot de passe : 8 caractères minimum');
      if (b.email && String(b.email).toLowerCase() !== String(cible.email).toLowerCase() && userParEmail_(b.email)) throw Erreur_(409, 'Un compte existe déjà avec cet e-mail');
      var autresAdmins = users_().filter(function (x) { return x.role === 'admin' && x.actif && x.id !== cible.id; }).length;
      if (cible.role === 'admin' && !autresAdmins && ((b.role && b.role !== 'admin') || b.actif === false)) throw Erreur_(400, 'Il doit rester au moins un administrateur actif');
      ['nom', 'email', 'role', 'personne', 'actif', 'notifEmail'].forEach(function (k) { if (b[k] !== undefined) cible[k] = typeof b[k] === 'string' ? b[k].trim() : b[k]; });
      if (b.motDePasse) cible.hash = hacher_(b.motDePasse);
      ecrireUser_(cible);
      if (!cible.actif || b.motDePasse) fermerSessions_(cible.id, null);
      journaliser_(user.nom, 'modification', 'utilisateurs', cible.id, cible.email + (b.motDePasse ? ' (mot de passe réinitialisé)' : ''));
      return { utilisateur: userPublic_(userParId_(cible.id)) };
    });
  }
  if (route === 'GET /api/journal') {
    exigerRole_(user, ['admin', 'responsable']);
    var lim = Math.min(Number(q.limite) || 200, 1000), f = feuille_('journal'), der = f.getLastRow(), n = Math.min(lim, der - 1);
    var jl = n > 0 ? f.getRange(der - n + 1, 1, n, 6).getValues().reverse() : [];
    return { journal: jl.map(function (r) { return { quand: Number(r[0]), user_nom: r[1], action: r[2], collection: r[3], record_id: r[4], libelle: r[5] }; }) };
  }
  if (route === 'GET /api/notifications') {
    exigerRole_(user, ['admin', 'responsable']);
    var fn = feuille_('notifications'), dn = fn.getLastRow(), nn = Math.min(200, dn - 1);
    var h = nn > 0 ? fn.getRange(dn - nn + 1, 1, nn, 6).getValues().reverse() : [];
    return { etat: etatNotif_(), historique: h.map(function (r) { return { quand: Number(r[0]), canal: r[1], destinataire: r[2], sujet: r[3], statut: r[4], erreur: r[5] }; }) };
  }
  if (route === 'POST /api/notifications/test') {
    exigerRole_(user, ['admin']);
    if (b.canal === 'whatsapp') throw Erreur_(400, 'Version gratuite : WhatsApp s\'envoie avec les boutons « Prévenir sur WhatsApp » des fiches');
    var ok = envoyerEmail_(b.destinataire, 'Test des alertes QHSE', 'Message de test envoyé par ' + user.nom + '. Les alertes par e-mail fonctionnent.', [{ niv: 'green', txt: 'Configuration correcte', sub: new Date().toLocaleString('fr-FR') }]);
    var fn2 = feuille_('notifications'), d2 = fn2.getLastRow();
    var r2 = d2 > 1 ? fn2.getRange(d2, 1, 1, 6).getValues()[0] : null;
    return { ok: ok, detail: r2 && { statut: r2[4], erreur: r2[5] } };
  }
  if (route === 'POST /api/notifications/recap') { exigerRole_(user, ['admin']); return recap_(true); }
  throw Erreur_(404, 'Route inconnue');
}

/* ───────── Notifications : e-mail par Gmail ───────── */
function urlApp_() { try { return ScriptApp.getService().getUrl() || ''; } catch (e) { return ''; } }
function noterNotif_(canal, dest, sujet, statut, erreur) { feuille_('notifications').appendRow(ligneSure_([Date.now(), canal, dest, String(sujet).slice(0, 200), statut, String(erreur || '').slice(0, 500)])); }
function escHtml_(s) { return String(s === undefined || s === null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function gabarit_(titre, intro, lignes, lien) {
  var items = lignes.map(function (l) {
    return '<tr><td style="padding:10px 0;border-bottom:1px solid #E4E8EE"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:' + (l.niv === 'red' ? '#D23B3B' : l.niv === 'orange' ? '#E8801E' : '#00A078') + ';margin-right:8px"></span><b style="color:#18233A">' + escHtml_(l.txt) + '</b><br><span style="color:#8A94A7;font-size:13px;margin-left:17px">' + escHtml_(l.sub || '') + '</span></td></tr>';
  }).join('');
  return '<div style="background:#F4F2ED;padding:24px 12px;font-family:Arial,sans-serif"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden">' +
    '<tr><td style="background:#061A47;padding:18px 24px;color:#fff;font-size:13px;letter-spacing:2px">UNIVERSNORMES · LOGICIEL QHSE</td></tr>' +
    '<tr><td style="padding:22px 24px"><h1 style="margin:0 0 8px;color:#0A2669;font-size:20px">' + escHtml_(titre) + '</h1><p style="color:#55617A;margin:0 0 14px">' + escHtml_(intro) + '</p><table width="100%" cellpadding="0" cellspacing="0">' + items + '</table>' +
    (lien ? '<p style="margin:22px 0 0"><a href="' + escHtml_(lien) + '" style="background:#00A078;color:#fff;padding:11px 18px;border-radius:7px;text-decoration:none;font-weight:bold">Ouvrir le logiciel</a></p>' : '') +
    '</td></tr></table></div>';
}
function envoyerEmail_(to, sujet, intro, lignes) {
  if (!to || !emailValide_(to)) return false;
  try {
    if (MailApp.getRemainingDailyQuota() < 1) { noterNotif_('email', to, sujet, 'non envoyé', 'Quota quotidien Gmail atteint (100 par jour)'); return false; }
    var lien = urlApp_();
    MailApp.sendEmail({
      to: to, subject: sujet, name: 'UNIVERSNORMES QHSE',
      body: intro + '\n\n' + lignes.map(function (l) { return '- ' + l.txt + (l.sub ? ' (' + l.sub + ')' : ''); }).join('\n') + (lien ? '\n\n' + lien : ''),
      htmlBody: gabarit_(sujet, intro, lignes, lien)
    });
    noterNotif_('email', to, sujet, 'envoyé'); return true;
  } catch (e) { noterNotif_('email', to, sujet, 'échec', e.message); return false; }
}
function recap_(force) {
  var aujourdhui = Regles.today(), jour = new Date().getDay();
  if (!force && (reglage_('dernier_recap') === aujourdhui || jour === 0 || jour === 6)) return { alertes: 0, envoyes: 0, ignore: true };
  reglage_('dernier_recap', aujourdhui);
  var d = toutesDonnees_(), al = Regles.alertes(d), emails = {};
  function ajouter(email, nom, liste) {
    if (!email) return;
    var k = String(email).toLowerCase(), e = emails[k] || (emails[k] = { email: email, nom: nom, alertes: {} });
    liste.forEach(function (a) { e.alertes[a.cle] = a; });
  }
  d.personnel.filter(function (p) { return p.actif !== 'Parti'; }).forEach(function (p) { ajouter(p.email, p.nom, al.filter(function (a) { return a.pour.indexOf(p.id) >= 0; })); });
  users_().filter(function (u) { return u.actif && u.notifEmail; }).forEach(function (u) {
    ajouter(u.email, u.nom, ['admin', 'responsable'].indexOf(u.role) >= 0 ? al : al.filter(function (a) { return u.personne && a.pour.indexOf(u.personne) >= 0; }));
  });
  var envoyes = 0;
  Object.keys(emails).forEach(function (k) {
    var e = emails[k], liste = Object.keys(e.alertes).map(function (c) { return e.alertes[c]; });
    if (!liste.length) return;
    var rouges = liste.filter(function (a) { return a.niv === 'red'; }).length;
    if (envoyerEmail_(e.email, 'QHSE : ' + liste.length + ' point(s) à traiter' + (rouges ? ' dont ' + rouges + ' urgent(s)' : ''), 'Bonjour ' + e.nom + ', voici les points QHSE qui demandent votre attention aujourd\'hui.', liste.slice(0, 40))) envoyes++;
  });
  return { alertes: al.length, envoyes: envoyes };
}
function apresEnregistrement_(c, avant, apres, auteur) {
  var personnel = toutesDonnees_().personnel;
  function pers(id) { return personnel.filter(function (p) { return p.id === id; })[0]; }
  if (c === 'actions' && apres.responsable && apres.responsable !== (avant && avant.responsable) && apres.responsable !== auteur.personne) {
    var p = pers(apres.responsable);
    if (p && p.email) envoyerEmail_(p.email, ('Nouvelle action QHSE : ' + apres.titre).slice(0, 150), 'Bonjour ' + p.nom + ', une action vous a été confiée.', [{ niv: 'orange', txt: apres.titre, sub: 'Échéance ' + Regles.fmtDate(apres.echeance) + ' · confiée par ' + auteur.nom }]);
  }
  function grave(x) { return x && (x.type === 'Accident de travail' || x.gravite === 'Grave' || x.gravite === 'Très grave'); }
  if (c === 'evenements' && grave(apres) && !grave(avant)) {
    var sites = toutesDonnees_().sites, site = sites.filter(function (s) { return s.id === apres.site; })[0];
    var ligne = { niv: 'red', txt: apres.type + ' : ' + apres.titre, sub: Regles.fmtDate(apres.date) + ' · ' + (site ? site.nom : '') + ' · gravité ' + (apres.gravite || '—') + ' · déclaré par ' + auteur.nom };
    var vus = {};
    users_().filter(function (u) { return u.actif && u.notifEmail && (u.role === 'admin' || u.role === 'responsable'); }).forEach(function (u) {
      var k = String(u.email).toLowerCase(); if (vus[k]) return; vus[k] = 1;
      envoyerEmail_(u.email, ('⚠ ' + apres.type + ' déclaré : ' + apres.titre).slice(0, 150), 'Un événement important vient d\'être déclaré.', [ligne]);
    });
  }
}
function installerDeclencheur_() {
  var existe = ScriptApp.getProjectTriggers().some(function (t) { return t.getHandlerFunction() === 'recapQuotidien'; });
  if (!existe) ScriptApp.newTrigger('recapQuotidien').timeBased().everyDays(1).atHour(7).create();
}
function etatNotif_() {
  var actif = false;
  try { actif = ScriptApp.getProjectTriggers().some(function (t) { return t.getHandlerFunction() === 'recapQuotidien'; }); } catch (e) { }
  var quota = null; try { quota = MailApp.getRemainingDailyQuota(); } catch (e) { }
  return { email: true, whatsapp: false, gratuit: true, quotaEmail: quota, appUrl: urlApp_(), heure: 7, actives: actif, dernierRecap: reglage_('dernier_recap') || null, classeur: props_().getProperty('classeur') ? classeur_().getUrl() : null };
}

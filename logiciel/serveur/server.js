/* UNIVERSNORMES QHSE — serveur multi-utilisateurs.
   Sert l'application (dossier parent) et l'API /api/… . Aucune dépendance obligatoire ; nodemailer pour les e-mails.
   Démarrage : node server.js   (Node ≥ 22.13) */
'use strict';
process.removeAllListeners('warning');
process.on('warning', w => { if (w.name !== 'ExperimentalWarning') console.warn(w); });
try { process.loadEnvFile(require('node:path').join(__dirname, '.env')); } catch (e) { /* .env facultatif */ }

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const Regles = require('../regles.js');
const base = require('./base');
const auth = require('./auth');
const notif = require('./notifications');

const PORT = +process.env.PORT || 3000;
const RACINE = path.resolve(__dirname, '..');
const MAX_CORPS = 40 * 1024 * 1024;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon' };

class Erreur extends Error { constructor(status, message) { super(message); this.status = status; } }
const json = (res, status, obj, headers = {}) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers }); res.end(JSON.stringify(obj)); };

function lireCorps(req) {
  return new Promise((resolve, reject) => {
    let taille = 0; const morceaux = [];
    req.on('data', c => { taille += c.length; if (taille > MAX_CORPS) { reject(new Erreur(413, 'Envoi trop volumineux')); req.destroy(); } else morceaux.push(c); });
    req.on('end', () => { try { resolve(morceaux.length ? JSON.parse(Buffer.concat(morceaux).toString('utf8')) : {}); } catch (e) { reject(new Erreur(400, 'JSON invalide')); } });
    req.on('error', reject);
  });
}

/* ───── Fichiers statiques ───── */
function servirStatique(req, res, chemin) {
  let rel = decodeURIComponent(chemin.split('?')[0]);
  if (rel === '/' || rel === '') rel = '/index.html';
  const abs = path.resolve(RACINE, '.' + rel);
  const interdit = !abs.startsWith(RACINE + path.sep) || abs.startsWith(path.join(RACINE, 'serveur') + path.sep) || rel.split('/').some(p => p.startsWith('.')) || rel.endsWith('.md');
  if (interdit || !fs.existsSync(abs) || !fs.statSync(abs).isFile()) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Introuvable'); }
  const ext = path.extname(abs).toLowerCase();
  res.writeHead(200, { 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Cache-Control': ['.html', '.js', '.css', '.webmanifest'].includes(ext) ? 'no-cache' : 'public, max-age=86400', 'X-Content-Type-Options': 'nosniff' });
  fs.createReadStream(abs).pipe(res);
}

/* ───── Écriture d'une fiche (contrôle des droits, références, fichiers, journal, notifications) ───── */
function ecrire(user, op) {
  const { c, id } = op;
  if (!base.COLLECTIONS.includes(c)) throw new Erreur(400, `Collection inconnue : ${c}`);
  if (typeof id !== 'string' || !/^[\w-]{1,64}$/.test(id)) throw new Erreur(400, 'Identifiant invalide');
  const avant = base.getRecord(c, id);
  if (op.op === 'del') {
    if (!Regles.peutSupprimer(user.role, c)) throw new Erreur(403, 'Vous n\'avez pas le droit de supprimer cette fiche');
    if (!avant) return { c, id, data: null };
    base.deleteRecord(c, id, user.nom);
    base.journaliser(user.nom, 'suppression', c, id, avant.ref || avant.code || avant.nom || avant.titre);
    return { c, id, data: null };
  }
  if (!Regles.peutEcrire(user.role, c)) throw new Erreur(403, 'Vous n\'avez pas le droit de modifier ces fiches');
  const data = op.data;
  if (!data || typeof data !== 'object' || Array.isArray(data) || data.id !== id) throw new Erreur(400, 'Fiche invalide');
  if (data._refPending) {
    const prefix = String(data._refPending);
    if (!/^[A-Z]{2,4}$/.test(prefix)) throw new Erreur(400, 'Préfixe invalide');
    data.ref = avant?.ref && !String(avant.ref).includes('…') ? avant.ref : base.prochaineRef(prefix);
    delete data._refPending;
  }
  base.extraireFichiers(data, user.nom);
  data._maj = { quand: Date.now(), par: user.nom };
  if (avant?._cree) data._cree = avant._cree; else if (!avant) data._cree = { quand: Date.now(), par: user.nom };
  base.putRecord(c, data, user.nom);
  base.journaliser(user.nom, avant ? 'modification' : 'création', c, id, data.ref || data.code || data.nom || data.titre || data.intitule || data.mois);
  setImmediate(() => notif.apresEnregistrement(c, avant, data, user));
  return { c, id, data };
}

function importer(user, donnees) {
  if (!donnees || typeof donnees !== 'object') return 0;
  let n = 0;
  for (const c of base.COLLECTIONS) for (const rec of (Array.isArray(donnees[c]) ? donnees[c] : [])) {
    if (!rec || typeof rec.id !== 'string') continue;
    const copie = { ...rec };
    base.extraireFichiers(copie, user.nom);
    base.putRecord(c, copie, user.nom); n++;
  }
  base.importerCompteurs(donnees.meta?.compteurs);
  base.journaliser(user.nom, 'import', '', '', `${n} fiche(s) importée(s)`);
  return n;
}

/* ───── Routes de l'API ───── */
const exigerRole = (user, ...roles) => { if (!roles.includes(user.role)) throw new Erreur(403, 'Réservé aux administrateurs'); };

async function api(req, res, url) {
  const route = `${req.method} ${url.pathname.replace(/\/+$/, '')}`;
  // Protection CSRF : toute requête qui modifie quelque chose doit porter l'en-tête X-QHSE (impossible depuis un formulaire tiers).
  if (req.method !== 'GET' && req.headers['x-qhse'] !== '1') throw new Erreur(403, 'Requête refusée');

  /* Sans session */
  if (route === 'GET /api/session') {
    const u = auth.userDeRequete(req);
    if (!auth.nbUsers()) return json(res, 200, { installation: true });
    if (!u) return json(res, 401, { erreur: 'Non connecté' });
    return json(res, 200, { user: auth.publicUser(u), roles: Regles.ROLES });
  }
  if (route === 'POST /api/installation') {
    if (auth.nbUsers()) throw new Erreur(409, 'Le logiciel est déjà installé');
    const b = await lireCorps(req);
    if (!b.nom || !/^\S+@\S+\.\S+$/.test(b.email || '')) throw new Erreur(400, 'Nom et e-mail valides obligatoires');
    if (!auth.mdpValide(b.motDePasse)) throw new Erreur(400, 'Mot de passe : 8 caractères minimum');
    const u = auth.creerUser({ email: b.email, nom: b.nom, role: 'admin', motDePasse: b.motDePasse });
    const n = importer(u, b.donnees);
    const token = auth.ouvrirSession(u.id);
    return json(res, 200, { user: auth.publicUser(u), importees: n }, { 'Set-Cookie': auth.cookieSession(token, req) });
  }
  if (route === 'POST /api/connexion') {
    const b = await lireCorps(req);
    const ip = req.socket.remoteAddress, cleE = 'e:' + String(b.email || '').toLowerCase(), cleI = 'i:' + ip;
    if (auth.bloque(cleE) || auth.bloque(cleI)) throw new Erreur(429, 'Trop de tentatives. Réessayez dans 15 minutes.');
    const u = auth.userParEmail(b.email);
    if (!u || !u.actif || !auth.verifier(b.motDePasse, u.hash)) { auth.noterEchec(cleE); auth.noterEchec(cleI); throw new Erreur(401, 'E-mail ou mot de passe incorrect'); }
    auth.echecs.delete(cleE);
    const token = auth.ouvrirSession(u.id);
    return json(res, 200, { user: auth.publicUser(u), roles: Regles.ROLES }, { 'Set-Cookie': auth.cookieSession(token, req) });
  }

  /* Avec session */
  const user = auth.userDeRequete(req);
  if (!user) throw new Erreur(401, 'Session expirée, reconnectez-vous');

  if (route === 'POST /api/deconnexion') { auth.fermerSession(user.token); return json(res, 200, { ok: true }, { 'Set-Cookie': auth.cookieSession('', req, true) }); }
  if (route === 'POST /api/mot-de-passe') {
    const b = await lireCorps(req);
    if (!auth.verifier(b.ancien, user.hash)) throw new Erreur(400, 'Mot de passe actuel incorrect');
    if (!auth.mdpValide(b.nouveau)) throw new Erreur(400, 'Nouveau mot de passe : 8 caractères minimum');
    auth.modifierUser(user.id, { motDePasse: b.nouveau });
    const token = auth.ouvrirSession(user.id);
    return json(res, 200, { ok: true }, { 'Set-Cookie': auth.cookieSession(token, req) });
  }
  if (route === 'GET /api/donnees') {
    const curseur = base.curseur();
    return json(res, 200, { donnees: base.toutesDonnees(), curseur });
  }
  if (route === 'GET /api/changements') {
    const depuis = +url.searchParams.get('depuis') || 0;
    const curseur = base.curseur();
    return json(res, 200, { changements: base.changesDepuis(depuis), curseur });
  }
  if (route === 'POST /api/lot') {
    const b = await lireCorps(req);
    if (!Array.isArray(b.ops) || b.ops.length > 500) throw new Erreur(400, 'Lot invalide');
    const resultats = b.ops.map(op => {
      try { return { ok: true, ...ecrire(user, op) }; }
      catch (e) { return { ok: false, c: op?.c, id: op?.id, status: e.status || 500, erreur: e.status ? e.message : 'Erreur interne' }; }
    });
    return json(res, 200, { resultats, curseur: base.curseur() });
  }
  const mFichier = /^GET \/api\/fichiers\/([0-9a-f-]{36})$/.exec(route);
  if (mFichier) {
    const f = base.fichier(mFichier[1]);
    if (!f || !fs.existsSync(f.chemin)) throw new Erreur(404, 'Fichier introuvable');
    const sur = /^image\/(png|jpe?g|gif|webp)$/.test(f.type) || f.type === 'application/pdf';
    res.writeHead(200, {
      'Content-Type': sur ? f.type : 'application/octet-stream', 'Content-Length': f.taille,
      'Content-Disposition': `${sur ? 'inline' : 'attachment'}; filename*=UTF-8''${encodeURIComponent(f.nom)}`,
      'Cache-Control': 'private, max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff', 'Content-Security-Policy': 'sandbox'
    });
    return fs.createReadStream(f.chemin).pipe(res);
  }
  if (route === 'GET /api/export') {
    exigerRole(user, 'admin', 'responsable');
    const comp = Object.fromEntries(base.db.prepare('SELECT cle, n FROM compteurs').all().map(r => [r.cle, r.n]));
    return json(res, 200, { meta: { version: 1, compteurs: comp, exporte: new Date().toISOString() }, ...base.toutesDonnees() });
  }
  if (route === 'POST /api/import') {
    exigerRole(user, 'admin');
    const b = await lireCorps(req);
    return json(res, 200, { importees: importer(user, b.donnees), curseur: base.curseur() });
  }

  /* Administration */
  if (route === 'GET /api/utilisateurs') { exigerRole(user, 'admin'); return json(res, 200, { utilisateurs: auth.listeUsers() }); }
  if (route === 'POST /api/utilisateurs') {
    exigerRole(user, 'admin');
    const b = await lireCorps(req);
    if (!b.nom || !/^\S+@\S+\.\S+$/.test(b.email || '')) throw new Erreur(400, 'Nom et e-mail valides obligatoires');
    if (!Regles.ROLES[b.role]) throw new Erreur(400, 'Rôle inconnu');
    if (!auth.mdpValide(b.motDePasse)) throw new Erreur(400, 'Mot de passe provisoire : 8 caractères minimum');
    if (auth.userParEmail(b.email)) throw new Erreur(409, 'Un compte existe déjà avec cet e-mail');
    const u = auth.creerUser(b);
    base.journaliser(user.nom, 'création', 'utilisateurs', u.id, u.email);
    return json(res, 200, { utilisateur: auth.publicUser(u) });
  }
  const mUser = /^PUT \/api\/utilisateurs\/([\w-]+)$/.exec(route);
  if (mUser) {
    exigerRole(user, 'admin');
    const b = await lireCorps(req);
    const cible = auth.userParId(mUser[1]); if (!cible) throw new Erreur(404, 'Compte introuvable');
    if (b.role !== undefined && !Regles.ROLES[b.role]) throw new Erreur(400, 'Rôle inconnu');
    if (b.motDePasse && !auth.mdpValide(b.motDePasse)) throw new Erreur(400, 'Mot de passe : 8 caractères minimum');
    if (b.email && b.email.toLowerCase() !== cible.email.toLowerCase() && auth.userParEmail(b.email)) throw new Erreur(409, 'Un compte existe déjà avec cet e-mail');
    const resteAdmin = auth.listeUsers().filter(u => u.role === 'admin' && u.actif && u.id !== cible.id).length;
    if (cible.role === 'admin' && !resteAdmin && ((b.role && b.role !== 'admin') || b.actif === false)) throw new Erreur(400, 'Il doit rester au moins un administrateur actif');
    const u = auth.modifierUser(cible.id, b);
    base.journaliser(user.nom, 'modification', 'utilisateurs', u.id, u.email + (b.motDePasse ? ' (mot de passe réinitialisé)' : ''));
    return json(res, 200, { utilisateur: auth.publicUser(u) });
  }
  if (route === 'GET /api/journal') {
    exigerRole(user, 'admin', 'responsable');
    const limite = Math.min(+url.searchParams.get('limite') || 200, 1000);
    return json(res, 200, { journal: base.db.prepare('SELECT * FROM journal ORDER BY id DESC LIMIT ?').all(limite) });
  }
  if (route === 'GET /api/notifications') {
    exigerRole(user, 'admin', 'responsable');
    return json(res, 200, { etat: notif.etat(), historique: base.db.prepare('SELECT * FROM notifications ORDER BY id DESC LIMIT 200').all() });
  }
  if (route === 'POST /api/notifications/test') {
    exigerRole(user, 'admin');
    const b = await lireCorps(req);
    const ok = b.canal === 'whatsapp'
      ? await notif.envoyerWhatsApp(b.destinataire, `UNIVERSNORMES QHSE — message de test envoyé par ${user.nom}. Les alertes WhatsApp fonctionnent.`)
      : await notif.envoyerEmail(b.destinataire, 'Test des alertes QHSE', `Message de test envoyé par ${user.nom}. Les alertes par e-mail fonctionnent.`, [{ niv: 'green', txt: 'Configuration correcte', sub: new Date().toLocaleString('fr-FR') }]);
    const dernier = base.db.prepare('SELECT * FROM notifications ORDER BY id DESC LIMIT 1').get();
    return json(res, 200, { ok, detail: dernier });
  }
  if (route === 'POST /api/notifications/recap') { exigerRole(user, 'admin'); return json(res, 200, await notif.recapQuotidien()); }

  throw new Erreur(404, 'Route inconnue');
}

const serveur = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://local');
  try {
    if (url.pathname.startsWith('/api/')) return await api(req, res, url);
    if (req.method !== 'GET' && req.method !== 'HEAD') throw new Erreur(405, 'Méthode non autorisée');
    servirStatique(req, res, url.pathname);
  } catch (e) {
    if (!e.status) console.error(e);
    if (!res.headersSent) json(res, e.status || 500, { erreur: e.status ? e.message : 'Erreur interne du serveur' });
    else res.end();
  }
});

if (require.main === module) {
  serveur.listen(PORT, () => {
    console.log(`UNIVERSNORMES QHSE : http://localhost:${PORT}  (données : ${base.DATA_DIR})`);
    const n = notif.etat();
    console.log(`Alertes : e-mail ${n.email ? 'configuré' : 'non configuré'}, WhatsApp ${n.whatsapp ? 'configuré' : 'non configuré'}`);
  });
  notif.demarrerPlanificateur();
}
module.exports = { serveur };

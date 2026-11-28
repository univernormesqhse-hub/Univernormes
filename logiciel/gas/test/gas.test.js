/* Tests du serveur gratuit (Code.gs) dans le simulateur Apps Script : node --test gas/test/gas.test.js */
'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
execFileSync(process.execPath, [path.join(__dirname, '..', 'construire.js')]);
const { charger } = require('./simulateur');

const G = charger();
let jetonAdmin = '', jetonContrib = '';
const req = (route, corps, token, query) => G.doPost({ route, corps, token, query });
const PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
const Y = new Date().getFullYear();

test('page servie avec l\'adresse du script et la balise viewport', () => {
  const o = G.doGet();
  assert.ok(o.html.includes("url: 'https://script.google.com/macros/s/TEST/exec'"));
  assert.ok(!o.html.includes('__QHSE_URL__'));
  assert.match(o.meta.viewport, /width=device-width/);
});

test('installation : classeur, dossier, déclencheur quotidien, compte admin, jeton', () => {
  assert.deepEqual(req('GET /api/session').corps, { installation: true });
  const r = req('POST /api/installation', { nom: 'Aya Kouassi', email: 'aya@test.ci', motDePasse: 'motdepasse1', donnees: { meta: { compteurs: { [`EV-${Y}`]: 5 } }, sites: [{ id: 's1', nom: 'Usine', responsable: 'p1' }], personnel: [{ id: 'p1', nom: 'Moussa', email: 'moussa@test.ci', whatsapp: '0701020304' }, { id: 'p2', nom: 'Fatou', email: 'fatou@test.ci' }] } });
  assert.equal(r.status, 200, JSON.stringify(r)); assert.equal(r.corps.importees, 3);
  assert.match(r.jeton, /^[0-9a-f]{64}$/); jetonAdmin = r.jeton;
  assert.equal(Object.keys(G.etat.classeurs).length, 1);
  assert.deepEqual(G.etat.declencheurs.map(d => [d.fonction, d.heure]), [['recapQuotidien', 7]]);
  assert.equal(req('POST /api/installation', { nom: 'X', email: 'x@x.ci', motDePasse: 'motdepasse1' }).status, 409);
  assert.equal(req('GET /api/session', null, jetonAdmin).corps.user.role, 'admin');
});

test('connexion : refus, blocage après 8 échecs, jeton valide', () => {
  assert.equal(req('POST /api/connexion', { email: 'aya@test.ci', motDePasse: 'mauvais-mdp' }).status, 401);
  assert.equal(req('GET /api/donnees', null, 'f'.repeat(64)).status, 401);
  const ok = req('POST /api/connexion', { email: 'AYA@test.ci', motDePasse: 'motdepasse1' });
  assert.equal(ok.status, 200); assert.ok(ok.jeton);
  for (let i = 0; i < 8; i++) req('POST /api/connexion', { email: 'bloque@test.ci', motDePasse: 'x' });
  assert.equal(req('POST /api/connexion', { email: 'bloque@test.ci', motDePasse: 'x' }).status, 429);
});

test('comptes et droits par rôle ; références attribuées par le serveur', () => {
  assert.equal(req('POST /api/utilisateurs', { nom: 'Fatou', email: 'fatou@test.ci', role: 'contributeur', personne: 'p2', motDePasse: 'provisoire1' }, jetonAdmin).status, 200);
  assert.equal(req('POST /api/utilisateurs', { nom: 'Bis', email: 'FATOU@test.ci', role: 'lecteur', motDePasse: 'provisoire1' }, jetonAdmin).status, 409);
  jetonContrib = req('POST /api/connexion', { email: 'fatou@test.ci', motDePasse: 'provisoire1' }).jeton;
  const r = req('POST /api/lot', { ops: [
    { op: 'put', c: 'evenements', id: 'e1', data: { id: 'e1', titre: 'Chute', type: 'Presqu\'accident', site: 's1', ref: 'EV-…', _refPending: 'EV' } },
    { op: 'put', c: 'documents', id: 'd1', data: { id: 'd1', titre: 'Procédure' } },
    { op: 'del', c: 'evenements', id: 'e1' }
  ] }, jetonContrib).corps.resultats;
  assert.equal(r[0].ok, true); assert.equal(r[0].data.ref, `EV-${Y}-006`); assert.equal(r[0].data._maj.par, 'Fatou');
  assert.equal(r[1].status, 403); assert.equal(r[2].ok, false);
  assert.equal(req('GET /api/utilisateurs', null, jetonContrib).status, 403);
  const refs = req('POST /api/lot', { ops: [1, 2, 3].map(i => ({ op: 'put', c: 'actions', id: 'a' + i, data: { id: 'a' + i, titre: 'A' + i, _refPending: 'AC' } })) }, jetonAdmin).corps.resultats.map(x => x.data.ref);
  assert.deepEqual(refs, [`AC-${Y}-001`, `AC-${Y}-002`, `AC-${Y}-003`]);
  const re = req('POST /api/lot', { ops: [{ op: 'put', c: 'actions', id: 'a1', data: { id: 'a1', titre: 'Modifiée', ref: 'AC-…', _refPending: 'AC' } }] }, jetonAdmin).corps.resultats[0];
  assert.equal(re.data.ref, `AC-${Y}-001`);
});

test('identifiants qui ressemblent à des nombres ou des dates restent du texte', () => {
  const r = req('POST /api/lot', { ops: [{ op: 'put', c: 'heures', id: '2026-01', data: { id: '2026-01', mois: '2026-01', heures: 1200 } }] }, jetonAdmin);
  assert.equal(r.corps.resultats[0].ok, true);
  const h = req('GET /api/donnees', null, jetonAdmin).corps.donnees.heures;
  assert.equal(h[0].id, '2026-01'); assert.equal(h[0].heures, 1200);
});

test('textes commençant par = + - @ conservés tels quels (pas de formule)', () => {
  const r = req('POST /api/lot', { ops: [{ op: 'put', c: 'actions', id: 'af', data: { id: 'af', titre: '=SOMME(A1)', _refPending: 'AC' } }] }, jetonAdmin);
  assert.equal(r.corps.resultats[0].ok, true);
  assert.equal(req('POST /api/utilisateurs', { nom: '-Koné', email: '+kone@test.ci', role: 'lecteur', motDePasse: 'provisoire1' }, jetonAdmin).status, 200);
  const u = req('GET /api/utilisateurs', null, jetonAdmin).corps.utilisateurs.find(x => x.email === '+kone@test.ci');
  assert.equal(u.nom, '-Koné');
  const j = req('GET /api/journal', null, jetonAdmin).corps.journal;
  assert.ok(j.some(x => x.libelle === '+kone@test.ci'));
  req('POST /api/lot', { ops: [{ op: 'del', c: 'actions', id: 'af' }] }, jetonAdmin);
});

test('photos : déposées dans Drive, partagées par lien, URL dans la fiche', () => {
  const r = req('POST /api/lot', { ops: [{ op: 'put', c: 'evenements', id: 'e2', data: { id: 'e2', titre: 'Fuite', photos: [{ id: 'ph1', nom: 'fuite.png', data: PNG }] } }] }, jetonContrib).corps.resultats[0];
  const ph = r.data.photos[0];
  assert.equal(ph.data, undefined); assert.equal(ph.id, 'ph1');
  assert.match(ph.url, /^https:\/\/drive\.google\.com\/thumbnail\?id=fic\d+&sz=w1600$/);
  const f = G.etat.fichiers[ph.drive];
  assert.equal(f.partage, 'ANYONE_WITH_LINK'); assert.equal(f.blob.type, 'image/png'); assert.equal(f.blob.octets.length, 70);
});

test('fiche trop volumineuse refusée proprement (limite des cellules Sheets)', () => {
  const r = req('POST /api/lot', { ops: [{ op: 'put', c: 'documents', id: 'gros', data: { id: 'gros', modifs: 'x'.repeat(60000) } }] }, jetonAdmin).corps.resultats[0];
  assert.equal(r.ok, false); assert.equal(r.status, 413);
});

test('synchronisation : rien de neuf sans lire le classeur, puis changements et suppressions', () => {
  const { curseur } = req('GET /api/donnees', null, jetonContrib).corps;
  assert.deepEqual(req('GET /api/changements', null, jetonContrib, { depuis: String(curseur) }).corps.changements, []);
  req('POST /api/lot', { ops: [{ op: 'put', c: 'risques', id: 'r1', data: { id: 'r1', risque: 'Chute' } }, { op: 'del', c: 'actions', id: 'a3' }] }, jetonAdmin);
  const ch = req('GET /api/changements', null, jetonContrib, { depuis: String(curseur) }).corps.changements;
  assert.deepEqual(ch.map(x => [x.c, x.id, !!x.data]), [['risques', 'r1', true], ['actions', 'a3', false]]);
});

test('e-mails : action confiée, accident déclaré, test, récapitulatif personnalisé, quota', () => {
  G.etat.mails.length = 0;
  req('POST /api/lot', { ops: [{ op: 'put', c: 'actions', id: 'a9', data: { id: 'a9', titre: 'Réparer le garde-corps', responsable: 'p1', echeance: '2020-01-01', statut: 'À faire' } }] }, jetonAdmin);
  req('POST /api/lot', { ops: [{ op: 'put', c: 'evenements', id: 'e9', data: { id: 'e9', titre: 'Coupure', type: 'Accident de travail', site: 's1', gravite: 'Modérée', date: '2026-11-01' } }] }, jetonContrib);
  assert.deepEqual(G.etat.mails.map(m => [m.to, m.subject.slice(0, 22)]), [['moussa@test.ci', 'Nouvelle action QHSE :'], ['aya@test.ci', '⚠ Accident de travail ']]);
  assert.match(G.etat.mails[0].htmlBody, /Ouvrir le logiciel/);
  assert.equal(req('POST /api/notifications/test', { canal: 'email', destinataire: 'aya@test.ci' }, jetonAdmin).corps.ok, true);
  assert.equal(req('POST /api/notifications/test', { canal: 'whatsapp', destinataire: '07' }, jetonAdmin).status, 400);
  G.etat.mails.length = 0;
  const rc = req('POST /api/notifications/recap', null, jetonAdmin).corps;
  assert.ok(rc.envoyes >= 2);
  const moussa = G.etat.mails.find(m => m.to === 'moussa@test.ci');
  assert.match(moussa.subject, /point\(s\) à traiter/); assert.match(moussa.body, /Réparer le garde-corps/);
  const histo = req('GET /api/notifications', null, jetonAdmin).corps;
  assert.equal(histo.etat.gratuit, true); assert.ok(histo.historique.length >= 4);
  G.etat.quota = 0;
  assert.equal(req('POST /api/notifications/test', { canal: 'email', destinataire: 'aya@test.ci' }, jetonAdmin).corps.detail.erreur, 'Quota quotidien Gmail atteint (100 par jour)');
  G.etat.quota = 100;
});

test('déclencheur quotidien : une seule fois par jour', () => {
  G.etat.props.r_dernier_recap = '';
  const premier = G.appeler('recapQuotidien'), second = G.appeler('recapQuotidien');
  const jour = new Date().getDay();
  if (jour === 0 || jour === 6) assert.equal(premier.ignore, true);
  else { assert.notEqual(premier.ignore, true); assert.equal(second.ignore, true); }
});

test('journal, export, mot de passe, déconnexion, dernier admin protégé', () => {
  const j = req('GET /api/journal', null, jetonAdmin).corps.journal;
  assert.equal(j[0].action, 'création'); assert.ok(j.some(x => x.action === 'suppression'));
  const ex = req('GET /api/export', null, jetonAdmin).corps;
  assert.equal(ex.meta.compteurs[`AC-${Y}`], 4); assert.ok(Array.isArray(ex.evenements));
  const users = req('GET /api/utilisateurs', null, jetonAdmin).corps.utilisateurs;
  const aya = users.find(u => u.email === 'aya@test.ci');
  assert.equal(req(`PUT /api/utilisateurs/${aya.id}`, { role: 'lecteur' }, jetonAdmin).status, 400);
  assert.equal(req('POST /api/mot-de-passe', { ancien: 'faux', nouveau: 'nouveau-mdp' }, jetonContrib).status, 400);
  assert.equal(req('POST /api/mot-de-passe', { ancien: 'provisoire1', nouveau: 'nouveau-mdp' }, jetonContrib).status, 200);
  const d = req('POST /api/deconnexion', null, jetonContrib);
  assert.equal(d.jeton, null);
  assert.equal(req('GET /api/donnees', null, jetonContrib).status, 401);
});

test('seules les fonctions prévues sont appelables depuis la page (google.script.run)', () => {
  const publiques = G.executer(`Object.keys(globalThis).filter(k => typeof globalThis[k] === 'function' && !k.endsWith('_'))`);
  const attendues = ['doGet', 'doPost', 'api', 'installer', 'recapQuotidien'];
  const inattendues = publiques.filter(k => !attendues.includes(k) && !['console', 'JSON', 'Math', 'Date', 'Object', 'Array', 'String', 'Number', 'Error', 'RegExp', 'Map', 'Set', 'encodeURIComponent', 'decodeURIComponent', 'parseInt', 'isFinite'].includes(k));
  assert.deepEqual(inattendues, []);
  // google.script.run passe par api() : même contrôle d'accès que doPost
  assert.equal(G.api({ route: 'GET /api/donnees', token: '' }).status, 401);
});

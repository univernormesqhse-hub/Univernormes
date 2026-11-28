/* Tests de l'API : node --test test/   (base temporaire, effacée à la fin) */
'use strict';
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'qhse-test-'));
process.env.DATA_DIR = DIR;
for (const k of ['SMTP_HOST', 'SMTP_FROM', 'WHATSAPP_TOKEN', 'WHATSAPP_PHONE_ID']) delete process.env[k];
const { serveur } = require('../server.js');
let URL_BASE;

function client() {
  let cookie = '';
  return async (method, chemin, corps, { sansEntete = false } = {}) => {
    const r = await fetch(URL_BASE + chemin, {
      method, headers: { 'Content-Type': 'application/json', ...(sansEntete ? {} : { 'X-QHSE': '1' }), ...(cookie ? { Cookie: cookie } : {}) },
      body: corps === undefined ? undefined : JSON.stringify(corps)
    });
    const sc = r.headers.get('set-cookie'); if (sc) cookie = sc.split(';')[0];
    const type = r.headers.get('content-type') || '';
    return { status: r.status, corps: type.includes('json') ? await r.json() : await r.text(), headers: r.headers };
  };
}
const admin = client(), contrib = client(), anonyme = client();
const PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

before(async () => { await new Promise(r => serveur.listen(0, r)); URL_BASE = `http://127.0.0.1:${serveur.address().port}`; });
after(async () => { await new Promise(r => serveur.close(r)); require('../base').db.close(); fs.rmSync(DIR, { recursive: true, force: true }); });

test('installation : premier compte administrateur, une seule fois', async () => {
  assert.deepEqual((await anonyme('GET', '/api/session')).corps, { installation: true });
  const r = await admin('POST', '/api/installation', { nom: 'Aya Kouassi', email: 'aya@test.ci', motDePasse: 'motdepasse1', donnees: { meta: { compteurs: { 'EV-2026': 5 } }, sites: [{ id: 's1', nom: 'Usine' }], personnel: [{ id: 'p1', nom: 'Moussa', email: 'moussa@test.ci' }] } });
  assert.equal(r.status, 200); assert.equal(r.corps.user.role, 'admin'); assert.equal(r.corps.importees, 2);
  assert.equal((await anonyme('POST', '/api/installation', { nom: 'X', email: 'x@x.ci', motDePasse: 'motdepasse1' })).status, 409);
  assert.equal((await admin('GET', '/api/session')).corps.user.email, 'aya@test.ci');
});

test('connexion : mauvais mot de passe refusé, en-tête anti-CSRF exigé', async () => {
  assert.equal((await anonyme('GET', '/api/donnees')).status, 401);
  assert.equal((await anonyme('POST', '/api/connexion', { email: 'aya@test.ci', motDePasse: 'faux-faux' })).status, 401);
  assert.equal((await anonyme('POST', '/api/connexion', { email: 'aya@test.ci', motDePasse: 'motdepasse1' }, { sansEntete: true })).status, 403);
});

test('création de compte contributeur et droits par rôle', async () => {
  const r = await admin('POST', '/api/utilisateurs', { nom: 'Fatou', email: 'fatou@test.ci', role: 'contributeur', personne: 'p1', motDePasse: 'provisoire1' });
  assert.equal(r.status, 200);
  assert.equal((await admin('POST', '/api/utilisateurs', { nom: 'Doublon', email: 'FATOU@test.ci', role: 'lecteur', motDePasse: 'provisoire1' })).status, 409);
  assert.equal((await contrib('POST', '/api/connexion', { email: 'fatou@test.ci', motDePasse: 'provisoire1' })).status, 200);
  const lot = await contrib('POST', '/api/lot', { ops: [
    { op: 'put', c: 'evenements', id: 'e1', data: { id: 'e1', titre: 'Chute', type: 'Presqu\'accident', site: 's1', ref: 'EV-…', _refPending: 'EV' } },
    { op: 'put', c: 'documents', id: 'd1', data: { id: 'd1', titre: 'Procédure' } },
    { op: 'del', c: 'evenements', id: 'e1' }
  ] });
  const [ok, refuse, supp] = lot.corps.resultats;
  assert.equal(ok.ok, true); assert.equal(ok.data.ref, `EV-${new Date().getFullYear()}-${new Date().getFullYear() === 2026 ? '006' : '001'}`);
  assert.equal(ok.data._maj.par, 'Fatou'); assert.equal(ok.data._refPending, undefined);
  assert.equal(refuse.ok, false); assert.equal(refuse.status, 403);
  assert.equal(supp.ok, false);
  assert.equal((await contrib('GET', '/api/utilisateurs')).status, 403);
});

test('références : jamais de doublon, conservées lors des modifications', async () => {
  const a = await admin('POST', '/api/lot', { ops: [1, 2, 3].map(i => ({ op: 'put', c: 'actions', id: 'a' + i, data: { id: 'a' + i, titre: 'Action ' + i, _refPending: 'AC' } })) });
  const refs = a.corps.resultats.map(r => r.data.ref);
  assert.equal(new Set(refs).size, 3);
  const b = await admin('POST', '/api/lot', { ops: [{ op: 'put', c: 'actions', id: 'a1', data: { id: 'a1', titre: 'Modifiée', ref: 'AC-…', _refPending: 'AC' } }] });
  assert.equal(b.corps.resultats[0].data.ref, refs[0]);
});

test('photos : extraites des fiches, stockées sur disque, servies aux seuls connectés', async () => {
  const r = await contrib('POST', '/api/lot', { ops: [{ op: 'put', c: 'evenements', id: 'e2', data: { id: 'e2', titre: 'Fuite', photos: [{ id: 'ph1', nom: 'fuite.png', data: PNG }] } }] });
  const ph = r.corps.resultats[0].data.photos[0];
  assert.equal(ph.data, undefined); assert.match(ph.url, /^api\/fichiers\/[0-9a-f-]{36}$/); assert.equal(ph.id, 'ph1');
  const f = await contrib('GET', '/' + ph.url);
  assert.equal(f.status, 200); assert.equal(f.headers.get('content-type'), 'image/png');
  assert.equal((await anonyme('GET', '/' + ph.url)).status, 401);
  // Un fichier HTML est servi en téléchargement, jamais affiché (protection XSS)
  const h = await admin('POST', '/api/lot', { ops: [{ op: 'put', c: 'documents', id: 'd2', data: { id: 'd2', fichier: { id: 'x', nom: 'piege.html', data: 'data:text/html;base64,' + Buffer.from('<script>alert(1)</script>').toString('base64') } } }] });
  const fh = await admin('GET', '/' + h.corps.resultats[0].data.fichier.url);
  assert.equal(fh.headers.get('content-type'), 'application/octet-stream'); assert.match(fh.headers.get('content-disposition'), /^attachment/);
});

test('synchronisation : changements et suppressions depuis un curseur', async () => {
  const { curseur } = (await contrib('GET', '/api/donnees')).corps;
  await admin('POST', '/api/lot', { ops: [{ op: 'put', c: 'risques', id: 'r1', data: { id: 'r1', risque: 'Chute' } }, { op: 'del', c: 'actions', id: 'a3' }] });
  const ch = (await contrib('GET', `/api/changements?depuis=${curseur}`)).corps.changements;
  assert.deepEqual(ch.map(x => [x.c, x.id, !!x.data]), [['risques', 'r1', true], ['actions', 'a3', false]]);
  const tout = (await contrib('GET', '/api/donnees')).corps.donnees;
  assert.ok(!tout.actions.some(a => a.id === 'a3'));
});

test('journal, notifications sans configuration et récapitulatif', async () => {
  const j = (await admin('GET', '/api/journal')).corps.journal;
  assert.ok(j.some(x => x.action === 'suppression' && x.collection === 'actions'));
  const t = await admin('POST', '/api/notifications/test', { canal: 'email', destinataire: 'aya@test.ci' });
  assert.equal(t.corps.ok, false); assert.equal(t.corps.detail.erreur, 'SMTP non configuré');
  const rc = await admin('POST', '/api/notifications/recap');
  assert.equal(rc.status, 200);
});

test('dernier administrateur protégé ; compte désactivé déconnecté', async () => {
  const users = (await admin('GET', '/api/utilisateurs')).corps.utilisateurs;
  const aya = users.find(u => u.email === 'aya@test.ci'), fatou = users.find(u => u.email === 'fatou@test.ci');
  assert.equal((await admin('PUT', `/api/utilisateurs/${aya.id}`, { role: 'lecteur' })).status, 400);
  assert.equal((await admin('PUT', `/api/utilisateurs/${fatou.id}`, { actif: false })).status, 200);
  assert.equal((await contrib('GET', '/api/donnees')).status, 401);
});

test('fichiers statiques : application servie, code serveur et chemins détournés refusés', async () => {
  assert.equal((await anonyme('GET', '/')).status, 200);
  assert.equal((await anonyme('GET', '/regles.js')).status, 200);
  assert.equal((await anonyme('GET', '/serveur/server.js')).status, 404);
  assert.equal((await anonyme('GET', '/serveur/donnees/qhse.sqlite')).status, 404);
  assert.equal((await anonyme('GET', '/..%2f..%2fetc/passwd')).status, 404);
});

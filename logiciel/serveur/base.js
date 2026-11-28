/* Base de données SQLite (module intégré à Node ≥ 22.13) et stockage des fichiers sur disque. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');

const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(__dirname, 'donnees'));
const FILES_DIR = path.join(DATA_DIR, 'fichiers');
fs.mkdirSync(FILES_DIR, { recursive: true });

const db = new DatabaseSync(path.join(DATA_DIR, 'qhse.sqlite'));
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
  CREATE TABLE IF NOT EXISTS records (
    collection TEXT NOT NULL, id TEXT NOT NULL, data TEXT, maj INTEGER NOT NULL, par TEXT, supprime INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (collection, id));
  CREATE INDEX IF NOT EXISTS records_maj ON records(maj);
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE COLLATE NOCASE, nom TEXT NOT NULL, role TEXT NOT NULL,
    personne TEXT, hash TEXT NOT NULL, actif INTEGER NOT NULL DEFAULT 1, notif_email INTEGER NOT NULL DEFAULT 1,
    cree INTEGER NOT NULL, derniere_connexion INTEGER);
  CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, expire INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS compteurs (cle TEXT PRIMARY KEY, n INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS fichiers (id TEXT PRIMARY KEY, nom TEXT, type TEXT, taille INTEGER, cree INTEGER, par TEXT);
  CREATE TABLE IF NOT EXISTS journal (id INTEGER PRIMARY KEY AUTOINCREMENT, quand INTEGER, user_nom TEXT, action TEXT, collection TEXT, record_id TEXT, libelle TEXT);
  CREATE TABLE IF NOT EXISTS notifications (id INTEGER PRIMARY KEY AUTOINCREMENT, quand INTEGER, canal TEXT, destinataire TEXT, sujet TEXT, statut TEXT, erreur TEXT);
  CREATE TABLE IF NOT EXISTS reglages (cle TEXT PRIMARY KEY, valeur TEXT);
`);

const COLLECTIONS = ['sites', 'personnel', 'evenements', 'risques', 'actions', 'modeles', 'audits', 'documents', 'formations', 'exigences', 'heures'];

/* Horloge strictement croissante : sert de curseur de synchronisation. */
let dernierMaj = db.prepare('SELECT MAX(maj) m FROM records').get().m || 0;
const horloge = () => (dernierMaj = Math.max(Date.now(), dernierMaj + 1));
const curseur = () => dernierMaj;

const q = {
  get: db.prepare('SELECT data, supprime FROM records WHERE collection = ? AND id = ?'),
  put: db.prepare('INSERT INTO records (collection, id, data, maj, par, supprime) VALUES (?, ?, ?, ?, ?, 0) ON CONFLICT(collection, id) DO UPDATE SET data = excluded.data, maj = excluded.maj, par = excluded.par, supprime = 0'),
  del: db.prepare('UPDATE records SET supprime = 1, data = NULL, maj = ?, par = ? WHERE collection = ? AND id = ?'),
  all: db.prepare('SELECT collection, data FROM records WHERE supprime = 0'),
  since: db.prepare('SELECT collection, id, data, supprime FROM records WHERE maj > ? ORDER BY maj'),
  journal: db.prepare('INSERT INTO journal (quand, user_nom, action, collection, record_id, libelle) VALUES (?, ?, ?, ?, ?, ?)'),
  compteurGet: db.prepare('SELECT n FROM compteurs WHERE cle = ?'),
  compteurSet: db.prepare('INSERT INTO compteurs (cle, n) VALUES (?, ?) ON CONFLICT(cle) DO UPDATE SET n = excluded.n')
};

function getRecord(c, id) {
  const r = q.get.get(c, id);
  return r && !r.supprime ? JSON.parse(r.data) : null;
}
function putRecord(c, data, parNom) {
  q.put.run(c, data.id, JSON.stringify(data), horloge(), parNom);
}
function deleteRecord(c, id, parNom) { q.del.run(horloge(), parNom, c, id); }
function toutesDonnees() {
  const d = Object.fromEntries(COLLECTIONS.map(c => [c, []]));
  for (const r of q.all.all()) if (d[r.collection]) d[r.collection].push(JSON.parse(r.data));
  return d;
}
function changesDepuis(depuis) {
  return q.since.all(depuis).map(r => ({ c: r.collection, id: r.id, data: r.supprime ? null : JSON.parse(r.data) }));
}
function journaliser(userNom, action, c, id, libelle) { q.journal.run(Date.now(), userNom, action, c, id, String(libelle || '').slice(0, 200)); }

/* Références lisibles (EV-2026-001…) attribuées par le serveur pour éviter les doublons entre utilisateurs. */
function prochaineRef(prefix) {
  const y = new Date().getFullYear(), cle = `${prefix}-${y}`;
  const n = (q.compteurGet.get(cle)?.n || 0) + 1;
  q.compteurSet.run(cle, n);
  return `${prefix}-${y}-${String(n).padStart(3, '0')}`;
}
function importerCompteurs(compteurs = {}) {
  for (const [cle, n] of Object.entries(compteurs)) if (/^[A-Z]{2,4}-\d{4}$/.test(cle) && Number.isInteger(n)) {
    if ((q.compteurGet.get(cle)?.n || 0) < n) q.compteurSet.run(cle, n);
  }
}

/* Fichiers : toute pièce jointe envoyée en data: URL dans une fiche est écrite sur disque et remplacée par une URL. */
const MAX_FICHIER = 10 * 1024 * 1024;
function extraireFichiers(obj, parNom) {
  if (Array.isArray(obj)) { obj.forEach(x => extraireFichiers(x, parNom)); return; }
  if (!obj || typeof obj !== 'object') return;
  if (typeof obj.data === 'string' && obj.data.startsWith('data:')) {
    const m = /^data:([\w.+-]+\/[\w.+-]+)?(;[^,]*)?,(.*)$/s.exec(obj.data);
    if (!m) throw Object.assign(new Error('Pièce jointe illisible'), { status: 400 });
    const type = m[1] || 'application/octet-stream';
    const buf = /;base64/.test(m[2] || '') ? Buffer.from(m[3], 'base64') : Buffer.from(decodeURIComponent(m[3]));
    if (buf.length > MAX_FICHIER) throw Object.assign(new Error('Pièce jointe trop lourde (10 Mo max)'), { status: 413 });
    const id = crypto.randomUUID();
    fs.writeFileSync(path.join(FILES_DIR, id), buf);
    db.prepare('INSERT INTO fichiers (id, nom, type, taille, cree, par) VALUES (?, ?, ?, ?, ?, ?)').run(id, String(obj.nom || 'fichier').slice(0, 200), type, buf.length, Date.now(), parNom);
    delete obj.data;
    obj.url = `api/fichiers/${id}`; obj.type = type; obj.taille = buf.length;
    return;
  }
  for (const v of Object.values(obj)) if (v && typeof v === 'object') extraireFichiers(v, parNom);
}
function fichier(id) {
  if (!/^[0-9a-f-]{36}$/.test(id)) return null;
  const meta = db.prepare('SELECT * FROM fichiers WHERE id = ?').get(id);
  return meta ? { ...meta, chemin: path.join(FILES_DIR, id) } : null;
}

const reglage = (cle, valeur) => {
  if (valeur === undefined) return db.prepare('SELECT valeur FROM reglages WHERE cle = ?').get(cle)?.valeur;
  db.prepare('INSERT INTO reglages (cle, valeur) VALUES (?, ?) ON CONFLICT(cle) DO UPDATE SET valeur = excluded.valeur').run(cle, String(valeur));
};

module.exports = { db, DATA_DIR, COLLECTIONS, curseur, getRecord, putRecord, deleteRecord, toutesDonnees, changesDepuis, journaliser, prochaineRef, importerCompteurs, extraireFichiers, fichier, reglage };

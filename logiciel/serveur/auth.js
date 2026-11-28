/* Comptes, mots de passe (scrypt) et sessions (cookie HttpOnly). */
'use strict';
const crypto = require('node:crypto');
const { db } = require('./base');

const DUREE_SESSION = 30 * 24 * 3600 * 1000;
const COOKIE = 'qhse_session';

function hacher(mdp) {
  const sel = crypto.randomBytes(16);
  const h = crypto.scryptSync(String(mdp), sel, 64);
  return `scrypt$${sel.toString('hex')}$${h.toString('hex')}`;
}
function verifier(mdp, stocke) {
  const [algo, sel, h] = String(stocke).split('$');
  if (algo !== 'scrypt' || !sel || !h) return false;
  const calc = crypto.scryptSync(String(mdp), Buffer.from(sel, 'hex'), 64);
  const attendu = Buffer.from(h, 'hex');
  return attendu.length === calc.length && crypto.timingSafeEqual(attendu, calc);
}
function mdpValide(mdp) { return typeof mdp === 'string' && mdp.length >= 8; }

const nbUsers = () => db.prepare('SELECT COUNT(*) n FROM users').get().n;
const publicUser = u => u && ({ id: u.id, email: u.email, nom: u.nom, role: u.role, personne: u.personne || '', actif: !!u.actif, notifEmail: !!u.notif_email, derniereConnexion: u.derniere_connexion });
const userParEmail = email => db.prepare('SELECT * FROM users WHERE email = ?').get(String(email || '').trim());
const userParId = id => db.prepare('SELECT * FROM users WHERE id = ?').get(id);
const listeUsers = () => db.prepare('SELECT * FROM users ORDER BY nom').all().map(publicUser);

function creerUser({ email, nom, role, personne, motDePasse }) {
  const id = crypto.randomUUID();
  db.prepare('INSERT INTO users (id, email, nom, role, personne, hash, cree) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(id, String(email).trim(), String(nom).trim(), role, personne || null, hacher(motDePasse), Date.now());
  return userParId(id);
}
function modifierUser(id, champs) {
  const u = userParId(id); if (!u) return null;
  const n = { ...u };
  if (champs.nom !== undefined) n.nom = String(champs.nom).trim();
  if (champs.email !== undefined) n.email = String(champs.email).trim();
  if (champs.role !== undefined) n.role = champs.role;
  if (champs.personne !== undefined) n.personne = champs.personne || null;
  if (champs.actif !== undefined) n.actif = champs.actif ? 1 : 0;
  if (champs.notifEmail !== undefined) n.notif_email = champs.notifEmail ? 1 : 0;
  if (champs.motDePasse) n.hash = hacher(champs.motDePasse);
  db.prepare('UPDATE users SET nom = ?, email = ?, role = ?, personne = ?, actif = ?, notif_email = ?, hash = ? WHERE id = ?')
    .run(n.nom, n.email, n.role, n.personne, n.actif, n.notif_email, n.hash, id);
  if (!n.actif || champs.motDePasse) db.prepare('DELETE FROM sessions WHERE user_id = ?').run(id);
  return userParId(id);
}

function ouvrirSession(userId) {
  const token = crypto.randomBytes(32).toString('base64url');
  db.prepare('INSERT INTO sessions (token, user_id, expire) VALUES (?, ?, ?)').run(token, userId, Date.now() + DUREE_SESSION);
  db.prepare('UPDATE users SET derniere_connexion = ? WHERE id = ?').run(Date.now(), userId);
  db.prepare('DELETE FROM sessions WHERE expire < ?').run(Date.now());
  return token;
}
function fermerSession(token) { db.prepare('DELETE FROM sessions WHERE token = ?').run(token); }
function lireCookie(req) {
  const m = /(?:^|;\s*)qhse_session=([\w-]+)/.exec(req.headers.cookie || '');
  return m ? m[1] : null;
}
function userDeRequete(req) {
  const token = lireCookie(req); if (!token) return null;
  const s = db.prepare('SELECT * FROM sessions WHERE token = ? AND expire > ?').get(token, Date.now());
  if (!s) return null;
  const u = userParId(s.user_id);
  return u && u.actif ? { ...u, token } : null;
}
function cookieSession(token, req, effacer = false) {
  const secure = process.env.COOKIE_SECURE === '1' || req.headers['x-forwarded-proto'] === 'https' || req.socket.encrypted;
  return `${COOKIE}=${effacer ? '' : token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${effacer ? 0 : DUREE_SESSION / 1000}${secure ? '; Secure' : ''}`;
}

/* Anti-force brute : 8 échecs en 15 minutes bloquent l'adresse e-mail et l'IP pendant 15 minutes. */
const echecs = new Map();
function bloque(cle) { const e = echecs.get(cle); return !!e && e.n >= 8 && Date.now() - e.t < 15 * 60 * 1000; }
function noterEchec(cle) { const e = echecs.get(cle); if (!e || Date.now() - e.t > 15 * 60 * 1000) echecs.set(cle, { n: 1, t: Date.now() }); else e.n++; }

module.exports = { hacher, verifier, mdpValide, nbUsers, publicUser, userParEmail, userParId, listeUsers, creerUser, modifierUser, ouvrirSession, fermerSession, userDeRequete, cookieSession, bloque, noterEchec, echecs };

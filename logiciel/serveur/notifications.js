/* Notifications par e-mail (SMTP, via nodemailer) et WhatsApp (API WhatsApp Cloud de Meta).
   Tout est configuré par variables d'environnement (voir .env.exemple). Sans configuration, rien n'est envoyé
   et le journal des notifications l'indique. */
'use strict';
const Regles = require('../regles.js');
const base = require('./base');
const auth = require('./auth');

const env = k => (process.env[k] || '').trim();
const APP_URL = () => env('APP_URL').replace(/\/$/, '');
const emailConfigure = () => !!(env('SMTP_HOST') && env('SMTP_FROM'));
const whatsappConfigure = () => !!(env('WHATSAPP_TOKEN') && env('WHATSAPP_PHONE_ID'));

function noter(canal, destinataire, sujet, statut, erreur = '') {
  base.db.prepare('INSERT INTO notifications (quand, canal, destinataire, sujet, statut, erreur) VALUES (?, ?, ?, ?, ?, ?)')
    .run(Date.now(), canal, destinataire, String(sujet).slice(0, 200), statut, String(erreur).slice(0, 500));
}

let transport = null;
function getTransport() {
  if (transport) return transport;
  const nodemailer = require('nodemailer');
  transport = nodemailer.createTransport({
    host: env('SMTP_HOST'), port: +env('SMTP_PORT') || 587, secure: (+env('SMTP_PORT') || 587) === 465,
    auth: env('SMTP_USER') ? { user: env('SMTP_USER'), pass: env('SMTP_PASS') } : undefined
  });
  return transport;
}

const escHtml = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function gabaritEmail(titre, intro, lignes, lien) {
  const items = lignes.map(l => `<tr><td style="padding:10px 0;border-bottom:1px solid #E4E8EE"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${l.niv === 'red' ? '#D23B3B' : l.niv === 'orange' ? '#E8801E' : '#00A078'};margin-right:8px"></span><b style="color:#18233A">${escHtml(l.txt)}</b><br><span style="color:#8A94A7;font-size:13px;margin-left:17px">${escHtml(l.sub || '')}</span></td></tr>`).join('');
  return `<!doctype html><html><body style="margin:0;background:#F4F2ED;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:10px;overflow:hidden">
    <tr><td style="background:#061A47;padding:18px 24px;color:#fff;font-size:13px;letter-spacing:2px">UNIVERSNORMES · LOGICIEL QHSE</td></tr>
    <tr><td style="padding:22px 24px"><h1 style="margin:0 0 8px;color:#0A2669;font-size:20px">${escHtml(titre)}</h1>
      <p style="color:#55617A;margin:0 0 14px">${escHtml(intro)}</p>
      <table width="100%" cellpadding="0" cellspacing="0">${items}</table>
      ${lien ? `<p style="margin:22px 0 0"><a href="${escHtml(lien)}" style="background:#00A078;color:#fff;padding:11px 18px;border-radius:7px;text-decoration:none;font-weight:bold">Ouvrir le logiciel</a></p>` : ''}
    </td></tr></table></td></tr></table></body></html>`;
}

async function envoyerEmail(to, sujet, intro, lignes, chemin = '') {
  if (!to) return false;
  if (!emailConfigure()) { noter('email', to, sujet, 'non envoyé', 'SMTP non configuré'); return false; }
  const lien = APP_URL() ? APP_URL() + '/' + chemin : '';
  const texte = `${intro}\n\n${lignes.map(l => `- ${l.txt}${l.sub ? ' (' + l.sub + ')' : ''}`).join('\n')}${lien ? `\n\n${lien}` : ''}`;
  try {
    await getTransport().sendMail({ from: env('SMTP_FROM'), to, subject: sujet, text: texte, html: gabaritEmail(sujet, intro, lignes, lien) });
    noter('email', to, sujet, 'envoyé'); return true;
  } catch (e) { noter('email', to, sujet, 'échec', e.message); return false; }
}

/* Numéro au format international sans « + » (ex. 2250701020304). Un numéro saisi sans indicatif reçoit WHATSAPP_INDICATIF
   (225 par défaut). Attention : en Côte d'Ivoire le 0 initial fait partie du numéro et doit être conservé. */
function numeroWhatsApp(n) {
  const s = String(n || '').trim(); if (!s) return '';
  if (s.startsWith('+')) return s.replace(/\D/g, '');
  if (s.startsWith('00')) return s.replace(/\D/g, '').slice(2);
  return (env('WHATSAPP_INDICATIF') || '225') + s.replace(/\D/g, '');
}
async function envoyerWhatsApp(numero, texte) {
  const to = numeroWhatsApp(numero); if (!to) return false;
  const court = texte.split('\n')[0];
  if (!whatsappConfigure()) { noter('whatsapp', to, court, 'non envoyé', 'WhatsApp non configuré'); return false; }
  // Hors fenêtre de 24 h, WhatsApp n'accepte que des modèles approuvés : WHATSAPP_TEMPLATE doit contenir une variable {{1}}.
  const modele = env('WHATSAPP_TEMPLATE');
  const uneLigne = texte.replace(/\s*\n+\s*/g, ' · ').replace(/\s{4,}/g, ' ').slice(0, 1000);
  const corps = modele
    ? { messaging_product: 'whatsapp', to, type: 'template', template: { name: modele, language: { code: env('WHATSAPP_LANGUE') || 'fr' }, components: [{ type: 'body', parameters: [{ type: 'text', text: uneLigne }] }] } }
    : { messaging_product: 'whatsapp', to, type: 'text', text: { body: texte.slice(0, 4000) } };
  try {
    const r = await fetch(`${env('WHATSAPP_API_BASE') || 'https://graph.facebook.com'}/${env('WHATSAPP_API_VERSION') || 'v21.0'}/${env('WHATSAPP_PHONE_ID')}/messages`, {
      method: 'POST', headers: { Authorization: `Bearer ${env('WHATSAPP_TOKEN')}`, 'Content-Type': 'application/json' }, body: JSON.stringify(corps)
    });
    if (!r.ok) { const t = await r.text(); noter('whatsapp', to, court, 'échec', `${r.status} ${t}`); return false; }
    noter('whatsapp', to, court, 'envoyé'); return true;
  } catch (e) { noter('whatsapp', to, court, 'échec', e.message); return false; }
}

/* Destinataires : les fiches Personnel (e-mail / WhatsApp) et les comptes utilisateurs. */
function destinataires(donnees) {
  const parPersonne = new Map(donnees.personnel.filter(p => p.actif !== 'Parti').map(p => [p.id, p]));
  const users = auth.listeUsers().filter(u => u.actif);
  return { parPersonne, users };
}

/* Récapitulatif quotidien : chaque personne reçoit SES alertes ; administrateurs et responsables QHSE reçoivent tout. */
async function recapQuotidien() {
  const d = base.toutesDonnees();
  const al = Regles.alertes(d);
  const { parPersonne, users } = destinataires(d);
  const emails = new Map(); // email → { nom, alertes: Map(cle → alerte) }
  const ajouter = (email, nom, liste) => {
    if (!email) return;
    const k = email.toLowerCase(); const e = emails.get(k) || { email, nom, alertes: new Map() };
    liste.forEach(a => e.alertes.set(a.cle, a)); emails.set(k, e);
  };
  for (const p of parPersonne.values()) ajouter(p.email, p.nom, al.filter(a => a.pour.includes(p.id)));
  for (const u of users) {
    if (!u.notifEmail) continue;
    const liste = ['admin', 'responsable'].includes(u.role) ? al : al.filter(a => u.personne && a.pour.includes(u.personne));
    ajouter(u.email, u.nom, liste);
  }
  let envoyes = 0;
  for (const e of emails.values()) {
    const liste = [...e.alertes.values()];
    if (!liste.length) continue;
    const rouges = liste.filter(a => a.niv === 'red').length;
    if (await envoyerEmail(e.email, `QHSE : ${liste.length} point(s) à traiter${rouges ? ` dont ${rouges} urgent(s)` : ''}`, `Bonjour ${e.nom}, voici les points QHSE qui demandent votre attention aujourd'hui.`, liste.slice(0, 40), '#/dashboard')) envoyes++;
  }
  for (const p of parPersonne.values()) {
    if (!p.whatsapp) continue;
    const liste = al.filter(a => a.pour.includes(p.id));
    if (!liste.length) continue;
    const texte = `UNIVERSNORMES QHSE — ${p.nom}, vous avez ${liste.length} point(s) à traiter :\n${liste.slice(0, 5).map(a => '• ' + a.txt).join('\n')}${liste.length > 5 ? `\n… et ${liste.length - 5} autre(s)` : ''}${APP_URL() ? `\n${APP_URL()}` : ''}`;
    if (await envoyerWhatsApp(p.whatsapp, texte)) envoyes++;
  }
  base.reglage('dernier_recap', Regles.today());
  return { alertes: al.length, envoyes };
}

/* Notifications immédiates, déclenchées par l'enregistrement d'une fiche. */
async function apresEnregistrement(c, avant, apres, auteur) {
  try {
    const d = { personnel: base.toutesDonnees().personnel };
    const pers = id => d.personnel.find(p => p.id === id);
    if (c === 'actions' && apres.responsable && apres.responsable !== avant?.responsable && apres.responsable !== auteur.personne) {
      const p = pers(apres.responsable); if (!p) return;
      const ligne = { niv: 'orange', txt: apres.titre, sub: `Échéance ${Regles.fmtDate(apres.echeance)} · confiée par ${auteur.nom}` };
      await envoyerEmail(p.email, `Nouvelle action QHSE : ${apres.titre}`.slice(0, 150), `Bonjour ${p.nom}, une action vous a été confiée.`, [ligne], `#/actions?ouvrir=${apres.id}`);
      if (p.whatsapp) await envoyerWhatsApp(p.whatsapp, `UNIVERSNORMES QHSE — ${p.nom}, une action vous a été confiée par ${auteur.nom} : « ${apres.titre} », échéance ${Regles.fmtDate(apres.echeance)}.${APP_URL() ? ' ' + APP_URL() : ''}`);
    }
    const grave = x => x && (x.type === 'Accident de travail' || ['Grave', 'Très grave'].includes(x.gravite));
    if (c === 'evenements' && grave(apres) && !grave(avant)) {
      const sites = base.toutesDonnees().sites;
      const site = sites.find(s => s.id === apres.site);
      const ligne = { niv: 'red', txt: `${apres.type} : ${apres.titre}`, sub: `${Regles.fmtDate(apres.date)} · ${site?.nom || ''} · gravité ${apres.gravite || '—'} · déclaré par ${auteur.nom}` };
      const deja = new Set();
      for (const u of auth.listeUsers().filter(u => u.actif && u.notifEmail && ['admin', 'responsable'].includes(u.role))) {
        if (deja.has(u.email.toLowerCase())) continue; deja.add(u.email.toLowerCase());
        await envoyerEmail(u.email, `⚠ ${apres.type} déclaré : ${apres.titre}`.slice(0, 150), 'Un événement important vient d\'être déclaré.', [ligne], `#/evenements/${apres.id}`);
      }
      const resp = site && pers(site.responsable);
      if (resp?.whatsapp) await envoyerWhatsApp(resp.whatsapp, `UNIVERSNORMES QHSE — ${apres.type} déclaré sur ${site.nom} : « ${apres.titre} » (gravité ${apres.gravite || '—'}), par ${auteur.nom}.${APP_URL() ? ' ' + APP_URL() : ''}`);
    }
  } catch (e) { console.error('Notification :', e); }
}

/* Planification : récapitulatif une fois par jour, du lundi au vendredi, à partir de ALERTES_HEURE (7 h par défaut). */
function demarrerPlanificateur() {
  const tick = () => {
    const now = new Date();
    const jourOuvre = env('ALERTES_WEEKEND') === '1' || (now.getDay() >= 1 && now.getDay() <= 5);
    if (env('ALERTES_ACTIVES') === '0' || !jourOuvre || now.getHours() < (+env('ALERTES_HEURE') || 7)) return;
    if (base.reglage('dernier_recap') === Regles.today()) return;
    if (!auth.nbUsers()) return;
    recapQuotidien().then(r => console.log(`Récapitulatif QHSE : ${r.alertes} alerte(s), ${r.envoyes} message(s) envoyé(s)`)).catch(e => console.error('Récapitulatif :', e));
  };
  setTimeout(tick, 5000);
  return setInterval(tick, 10 * 60 * 1000);
}

const etat = () => ({ email: emailConfigure(), whatsapp: whatsappConfigure(), appUrl: APP_URL(), heure: +env('ALERTES_HEURE') || 7, actives: env('ALERTES_ACTIVES') !== '0', dernierRecap: base.reglage('dernier_recap') || null });

module.exports = { envoyerEmail, envoyerWhatsApp, recapQuotidien, apresEnregistrement, demarrerPlanificateur, etat, numeroWhatsApp };

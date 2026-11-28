/* Simulateur minimal des services Google Apps Script utilisés par Code.gs, pour tester le serveur gratuit
   sans compte Google : SpreadsheetApp, DriveApp, PropertiesService, CacheService, LockService, MailApp,
   Utilities, ContentService, HtmlService, ScriptApp, Logger. Comportements reproduits : valeurs de cellules
   (nombres restent nombres, texte au format « @ » reste texte), limite de 50 000 caractères par cellule,
   octets signés (-128..127) comme en Java, quota Gmail. */
'use strict';
const vm = require('node:vm');
const fs = require('node:fs');
const crypto = require('node:crypto');
const path = require('node:path');

function signe(buf) { return [...buf].map(b => (b > 127 ? b - 256 : b)); }
function versBuffer(o) { return Buffer.from(Array.isArray(o) ? o.map(b => b & 0xff) : o); }

function creer({ codeGs, indexHtml, url = 'https://script.google.com/macros/s/TEST/exec' } = {}) {
  const etat = { classeurs: {}, fichiers: {}, dossiers: {}, props: {}, cache: {}, mails: [], declencheurs: [], quota: 100 };
  let n = 0; const id = p => `${p}${++n}`;

  class Plage {
    constructor(f, r, c, nr, nc) { Object.assign(this, { f, r, c, nr, nc }); }
    getValues() {
      const out = [];
      for (let i = 0; i < this.nr; i++) { const l = this.f.lignes[this.r - 1 + i] || []; out.push(Array.from({ length: this.nc }, (_, j) => l[this.c - 1 + j] ?? '')); }
      return out;
    }
    setValues(v) {
      if (v.length !== this.nr || v.some(l => l.length !== this.nc)) throw new Error('Dimensions incorrectes');
      v.forEach((l, i) => { const ligne = this.f.lignes[this.r - 1 + i] ||= []; l.forEach((x, j) => { this.f.ecrireCellule(ligne, this.c - 1 + j, x); }); });
      return this;
    }
    setNumberFormat() { return this; }
  }
  class Feuille {
    constructor(nom) { this.nom = nom; this.lignes = []; }
    ecrireCellule(ligne, j, x) {
      if (typeof x === 'string' && x.length > 50000) throw new Error('Le contenu d\'une cellule ne peut pas dépasser 50 000 caractères');
      if (typeof x === 'string' && x.startsWith("'")) x = x.slice(1); // apostrophe = « forcer le texte », non conservée
      else if (typeof x === 'string' && /^[=+\-@]/.test(x)) x = '#ERROR!'; // Sheets l'aurait pris pour une formule
      ligne[j] = x === null || x === undefined ? '' : x;
    }
    getName() { return this.nom; } setName(n) { this.nom = n; return this; }
    getLastRow() { return this.lignes.length; }
    getRange(a, b, c, d) { if (typeof a === 'string') return new Plage(this, 1, 1, 0, 0); return new Plage(this, a, b, c || 1, d || 1); }
    appendRow(l) { const ligne = []; l.forEach((x, j) => this.ecrireCellule(ligne, j, x)); this.lignes.push(ligne); return this; }
    setFrozenRows() { return this; }
  }
  class Classeur {
    constructor(nom) { this.id = id('ss'); this.nom = nom; this.feuilles = [new Feuille('Feuille 1')]; etat.classeurs[this.id] = this; }
    getId() { return this.id; } getUrl() { return `https://docs.google.com/spreadsheets/d/${this.id}`; }
    getSheets() { return this.feuilles; }
    getSheetByName(n) { return this.feuilles.find(f => f.nom === n) || null; }
    insertSheet(n) { const f = new Feuille(n); this.feuilles.push(f); return f; }
  }
  class Blob {
    constructor(octets, type, nom) { this.octets = octets; this.type = type; this.nom = nom; }
    getBytes() { return this.octets.slice(); } getContentType() { return this.type; } getName() { return this.nom; }
    getDataAsString() { return versBuffer(this.octets).toString('utf8'); }
  }
  const Access = { ANYONE_WITH_LINK: 'ANYONE_WITH_LINK', PRIVATE: 'PRIVATE' }, Permission = { VIEW: 'VIEW' };
  class Dossier {
    constructor(nom) { this.id = id('dos'); this.nom = nom; etat.dossiers[this.id] = this; }
    getId() { return this.id; } getUrl() { return `https://drive.google.com/drive/folders/${this.id}`; }
    createFile(blob) {
      const fid = id('fic'); const f = { id: fid, blob, partage: Access.PRIVATE, dossier: this.id };
      etat.fichiers[fid] = f;
      return { getId: () => fid, setSharing: (a) => { f.partage = a; }, getUrl: () => `https://drive.google.com/file/d/${fid}/view` };
    }
  }
  const proprietes = {
    getProperty: k => (k in etat.props ? etat.props[k] : null),
    setProperty: (k, v) => { if (String(v).length > 9000) throw new Error('Valeur de propriété trop longue'); etat.props[k] = String(v); return proprietes; },
    deleteProperty: k => { delete etat.props[k]; return proprietes; },
    getProperties: () => ({ ...etat.props })
  };
  let verrouille = false;
  const globaux = {
    console, JSON, Math, Date, Object, Array, String, Number, Error, RegExp, Map, Set, encodeURIComponent, decodeURIComponent, parseInt, isFinite,
    Logger: { log: (...a) => etat.logs?.push(a.join(' ')) },
    SpreadsheetApp: {
      create: nom => new Classeur(nom),
      openById: i => { if (!etat.classeurs[i]) throw new Error('Classeur introuvable'); return etat.classeurs[i]; }
    },
    DriveApp: {
      Access, Permission,
      createFolder: nom => new Dossier(nom),
      getFolderById: i => { if (!etat.dossiers[i]) throw new Error('Dossier introuvable'); return etat.dossiers[i]; }
    },
    PropertiesService: { getScriptProperties: () => proprietes },
    CacheService: { getScriptCache: () => ({ get: k => etat.cache[k] ?? null, put: (k, v) => { etat.cache[k] = String(v); }, remove: k => { delete etat.cache[k]; } }) },
    LockService: { getScriptLock: () => ({ waitLock: () => { if (verrouille) throw new Error('Verrou déjà pris (appel imbriqué)'); verrouille = true; }, releaseLock: () => { verrouille = false; } }) },
    MailApp: {
      getRemainingDailyQuota: () => etat.quota,
      sendEmail: o => { if (etat.quota < 1) throw new Error('Service invoked too many times for one day: email.'); etat.quota--; etat.mails.push(o); }
    },
    Utilities: {
      getUuid: () => crypto.randomUUID(),
      newBlob: (d, type = 'text/plain', nom = '') => new Blob(typeof d === 'string' ? signe(Buffer.from(d, 'utf8')) : d.slice(), type, nom),
      base64Decode: s => signe(Buffer.from(s, 'base64')),
      base64Encode: o => versBuffer(o).toString('base64'),
      computeHmacSha256Signature: (v, k) => signe(crypto.createHmac('sha256', versBuffer(typeof k === 'string' ? Buffer.from(k) : k)).update(versBuffer(typeof v === 'string' ? Buffer.from(v) : v)).digest())
    },
    ContentService: { MimeType: { JSON: 'application/json' }, createTextOutput: t => ({ contenu: t, setMimeType() { return this; }, getContent() { return this.contenu; } }) },
    HtmlService: {
      XFrameOptionsMode: { DEFAULT: 'DEFAULT', ALLOWALL: 'ALLOWALL' },
      createHtmlOutputFromFile: nom => { if (nom !== 'Index') throw new Error('Fichier HTML introuvable : ' + nom); return { getContent: () => indexHtml || '' }; },
      createHtmlOutput: html => { const o = { html, meta: {}, setTitle(t) { o.titre = t; return o; }, addMetaTag(k, v) { o.meta[k] = v; return o; }, setXFrameOptionsMode() { return o; }, getContent: () => o.html }; return o; }
    },
    ScriptApp: {
      getService: () => ({ getUrl: () => url }),
      getProjectTriggers: () => etat.declencheurs.map(d => ({ getHandlerFunction: () => d.fonction })),
      newTrigger: fonction => { const d = { fonction }; const b = { timeBased: () => b, everyDays: x => { d.jours = x; return b; }, atHour: h => { d.heure = h; return b; }, create: () => { etat.declencheurs.push(d); return d; } }; return b; }
    }
  };
  globaux.globalThis = globaux;
  const ctx = vm.createContext(globaux);
  vm.runInContext(codeGs, ctx, { filename: 'Code.gs' });
  // Entre deux requêtes, Apps Script repart d'un environnement neuf : on réinitialise les caches globaux du script.
  const nouvelleExecution = () => vm.runInContext('_ss = null; _fiches = null;', ctx);
  return {
    etat, ctx,
    doPost: corps => { nouvelleExecution(); return JSON.parse(ctx.doPost({ postData: { contents: typeof corps === 'string' ? corps : JSON.stringify(corps) } }).getContent()); },
    api: corps => { nouvelleExecution(); return JSON.parse(ctx.api(JSON.stringify(corps))); },
    doGet: () => { nouvelleExecution(); return ctx.doGet({}); },
    appeler: (fn, ...a) => { nouvelleExecution(); return ctx[fn](...a); },
    executer: code => { nouvelleExecution(); return vm.runInContext(code, ctx); }
  };
}

function charger(options = {}) {
  const dist = path.join(__dirname, '..', 'dist');
  return creer({ codeGs: fs.readFileSync(path.join(dist, 'Code.gs'), 'utf8'), indexHtml: fs.readFileSync(path.join(dist, 'Index.html'), 'utf8'), ...options });
}
module.exports = { creer, charger };

/* Construit la version Google Apps Script dans gas/dist/ :
     Code.gs          = regles.js + gas/src/serveur-gas.js
     Index.html       = l'application en un seul fichier (CSS, JS et logo intégrés ; polices Google Fonts)
     appsscript.json  = fuseau horaire Abidjan, moteur V8, application Web
   Usage : node gas/construire.js   (depuis le dossier logiciel/) */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const R = path.resolve(__dirname, '..');
const lire = f => fs.readFileSync(path.join(R, f), 'utf8');
const DIST = path.join(__dirname, 'dist');
fs.mkdirSync(DIST, { recursive: true });

const entete = `/* UNIVERSNORMES QHSE — version gratuite (Google Apps Script).
   FICHIER GÉNÉRÉ par gas/construire.js : ne pas modifier à la main, modifier regles.js et gas/src/serveur-gas.js.
   Généré le ${new Date().toISOString().slice(0, 10)}. */\n\n`;
fs.writeFileSync(path.join(DIST, 'Code.gs'), entete + lire('regles.js') + '\n\n' + lire('gas/src/serveur-gas.js'));

const scriptSur = js => js.replace(/<\/script/gi, '<\\/script').replace(/<!--/g, '<\\!--');
const css = lire('styles.css').replace(/@font-face\s*{[^}]*}\s*/g, '');
const logo = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'logo-leger.png')).toString('base64');
let html = lire('index.html')
  .replace(/\s*<link rel="manifest"[^>]*>/, '')
  .replace(/\s*<link rel="icon"[^>]*>/, '')
  .replace(/\s*<meta name="viewport"[^>]*>/, '') // ajouté par doGet (HtmlService l'exige)
  .replace('<link rel="stylesheet" href="styles.css">',
    '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Source+Sans+3:wght@400;600;700&display=swap">\n  <style>\n' + css + '\n  </style>')
  .replace(/src="assets\/universnormes-logo\.png"/g, `src="${logo}"`)
  .replace('<script src="regles.js"></script>', `<script>window.QHSE_GAS = { url: '__QHSE_URL__' };</script>\n  <script>\n${scriptSur(lire('regles.js'))}\n  </script>`)
  .replace('<script src="app.js"></script>', () => `<script>\n${scriptSur(lire('app.js').replace(/assets\/universnormes-logo\.png/g, logo))}\n  </script>`);
for (const reste of ['styles.css', 'regles.js', 'app.js', 'manifest.webmanifest']) if (html.includes(`"${reste}"`)) throw new Error('Référence non intégrée : ' + reste);
fs.writeFileSync(path.join(DIST, 'Index.html'), html);

fs.writeFileSync(path.join(DIST, 'appsscript.json'), JSON.stringify({
  timeZone: 'Africa/Abidjan',
  dependencies: {},
  exceptionLogging: 'STACKDRIVER',
  runtimeVersion: 'V8',
  webapp: { executeAs: 'USER_DEPLOYING', access: 'ANYONE_ANONYMOUS' }
}, null, 2) + '\n');

for (const f of fs.readdirSync(DIST)) console.log(`${f.padEnd(16)} ${(fs.statSync(path.join(DIST, f)).size / 1024).toFixed(0).padStart(5)} Ko`);

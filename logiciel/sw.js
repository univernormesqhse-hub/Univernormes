// Service worker : met l'application en cache pour qu'elle fonctionne sans connexion.
const CACHE = 'un-qhse-v1';
const FILES = [
  './', './index.html', './styles.css', './app.js', './manifest.webmanifest',
  './assets/universnormes-logo.png', './assets/icone-192.png', './assets/icone-512.png',
  './assets/fonts/Manrope-Bold.ttf', './assets/fonts/Manrope-ExtraBold.ttf',
  './assets/fonts/SourceSans3-Regular.ttf', './assets/fonts/SourceSans3-SemiBold.ttf', './assets/fonts/SourceSans3-Bold.ttf'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // Réseau d'abord (pour recevoir les mises à jour), cache en secours hors ligne.
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request))
  );
});

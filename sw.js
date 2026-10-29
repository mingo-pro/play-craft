
const CACHE_NAME = 'eaglercraft-fixed-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'css/style_1.css',
  'js/ram_guard.js',
  'js/eaglercraft_engine.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
        
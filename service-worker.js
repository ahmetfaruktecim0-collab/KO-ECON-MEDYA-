const CACHE_NAME = 'kousbf-tv-cache-v4';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-real-512.png',
  './assets/econ-medya.svg',
  './app.js',
  './chat-widget.js'
];

self.addEventListener('install', event => {
  // Force the waiting service worker to become the active service worker.
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  // Tell the active service worker to take control of the page immediately.
  event.waitUntil(self.clients.claim());
  
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    // Network first, falling back to cache
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

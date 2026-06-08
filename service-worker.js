const CACHE_NAME = 'econ-medya-v1780906092827';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/oyun.html',
  '/merkez-bankasi.html',
  '/manifest.json',
  '/assets/icon-192.png',
  '/assets/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(ASSETS_TO_CACHE.map(url => cache.add(url)));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Network-first strategy: her zaman önce internetten güncelini çekmeye çalışır.
  // İnternet yoksa (offline) cache'den (önbellekten) yükler.
  event.respondWith(
    fetch(event.request).then(response => {
      // Başarılı bir şekilde internetten indiyse, cache'i de bu yeni veriyle güncelle.
      return caches.open(CACHE_NAME).then(cache => {
        // Sadece HTTP ve HTTPS isteklerini cache'le (chrome-extension vb. hatalarını engeller)
        if (event.request.url.startsWith('http')) {
            cache.put(event.request, response.clone());
        }
        return response;
      });
    }).catch(() => {
      // İnternet yoksa veya hata verdiyse cache'den getir.
      return caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        // Eğer cache'de de yoksa index.html'e yönlendir
        return caches.match('/index.html');
      });
    })
  );
});

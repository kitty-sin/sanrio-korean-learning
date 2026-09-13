// KITTY 韓語積木大冒險 - Service Worker 離線快取
const CACHE_NAME = 'kitty-korean-v1.0.0';
const STATIC_ASSETS = [
  './',
  './index.html',
  './korean_vocab_dictionary.html',
  './korean_hanja_dictionary.html',
  './sanrio_korean_food_100.html',
  './korean_vocab_5666_data.js',
  './korean_hanja_data.js',
  './assets/icon.png',
  './app_mobile_bridge.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // 對於 HTML / JS / 音頻 / CDN 資源採用 Network First 回退 Cache 策略
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200 && event.request.method === 'GET') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

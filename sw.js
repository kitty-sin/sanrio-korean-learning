// KITTY 韓語積木大冒險 - Service Worker 離線快取 v1.0.21
const CACHE_NAME = 'kitty-korean-v1.0.21';
const STATIC_ASSETS = [
  './',
  './index.html',
  './korean_vocab_dictionary.html',
  './korean_hanja_dictionary.html',
  './sanrio_korean_food_100.html',
  './sanrio_korean_songs.html',
  './kitty_search_engine.js',
  './korean_vocab_5666_data.js',
  './korean_vocab_kitty_add_data.js',
  './korean_hanja_data.js',
  './korean_songs_data.js',
  './assets/icon.png',
  './app_mobile_bridge.js'
];

self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] 正在清除舊版快取:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isHtmlOrData = 
    event.request.mode === 'navigate' || 
    event.request.destination === 'document' ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('data.js') ||
    url.pathname.endsWith('bridge.js');

  // 對 HTML 導航及核心數據請求一律採用 Network First，獲取最新版修復代碼
  if (isHtmlOrData) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 其他靜態資源採用 Cache First 回退 Network
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        // 背景更新快取 (Stale-While-Revalidate)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cached;
      }
      return fetch(event.request);
    })
  );
});

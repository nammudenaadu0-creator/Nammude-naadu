// High-Performance Service Worker for Nammude Naadu PWA
const CACHE_NAME = 'nammude-naadu-v7';
const STATIC_ASSETS = [
  './',
  './index.html',
  './version.json',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './css/main.css?v=3.0',
  './css/jobs.css?v=3.0',
  './css/nammude-naadu.css?v=3.0',
  './img/kerala-splash.jpg',
  './js/trades-catalog-500.js?v=2.5',
  './js/nammude-naadu-engine.js?v=2.6',
  './js/supabase-sdk.js',
  './js/supabase-backend.js?v=3.0',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Caching partial note:', err);
      });
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
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // NEVER intercept external dynamic APIs or websockets
  if (url.hostname.includes('supabase.co') ||
      url.hostname.includes('openstreetmap.org') ||
      url.hostname.includes('komoot.io') ||
      url.hostname.includes('bigdatacloud.net') ||
      url.protocol === 'ws:' ||
      url.protocol === 'wss:') {
    return;
  }

  // Stale-While-Revalidate strategy with safe offline fallback
  event.respondWith(
    caches.match(event.request).then(async (cachedResponse) => {
      if (cachedResponse) {
        // Revalidate in background if online
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && event.request.url.startsWith('http')) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      try {
        const networkResponse = await fetch(event.request);
        if (networkResponse && networkResponse.status === 200 && event.request.url.startsWith('http')) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      } catch (err) {
        // Offline recovery: fallback to cached index.html for navigation or clear offline message
        if (event.request.mode === 'navigate') {
          const fallback = await caches.match('./index.html');
          if (fallback) return fallback;
        }
        return new Response('Offline: ഇന്റർനെറ്റ് കണക്ഷൻ ലഭ്യമല്ല.', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({ 'Content-Type': 'text/plain; charset=utf-8' })
        });
      }
    })
  );
});

// Background Push Notification Listener (Triggers even when app / browser tab is completely closed)
self.addEventListener('push', (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch (_) {
    payload = { body: event.data ? event.data.text() : 'പുതിയ അറിയിപ്പ് എത്തിയിട്ടുണ്ട്' };
  }

  const title = payload.title || 'നമ്മുടെ നാട്';
  const options = {
    body: payload.body || 'നിങ്ങളുടെ നാട്ടിൽ പുതിയ അടിയന്തിര അറിയിപ്പ് / സർവീസ് റിക്വസ്റ്റ് എത്തിയിട്ടുണ്ട്.',
    icon: './img/kerala-splash.jpg',
    badge: './img/kerala-splash.jpg',
    vibrate: [300, 150, 300],
    data: payload.data || {},
    tag: payload.tag || 'nammude-naadu-alert',
    renotify: true,
    actions: [
      { action: 'open', title: 'ആപ്പ് തുറക്കുക' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const urlToOpen = './index.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let client of windowClients) {
        if (client.url.includes('index.html') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

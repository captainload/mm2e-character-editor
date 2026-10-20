const CACHE_NAME = 'mm2e-hero-builder-v131';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './character_model.js',
  './data_measurements.js',
  './data_skills.js',
  './data_feats.js',
  './data_powers_effects.js',
  './data_powers_profiles.js',
  './data_powers_modifiers.js',
  './data_equipment.js',
  './por_importer.js',
  './print.js',
  './peerjs.min.js',
  './dice_notation.js',
  './campaign_manager.js',
  './session_network.js',
  './log_window.html',
  './party_window.html',
  './tracker_window.html',
  './tables_window.html',
  './gm_window.html',
  './app.js',
  './README.md',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
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

// Network-First strategy: Fetch fresh files when online, fallback to cache when offline
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Popout windows and requests with cache-busting queries should always bypass cache and fetch fresh
  try {
    const url = new URL(event.request.url);
    const isPopoutOrTimestamped = url.pathname.endsWith('_window.html') || url.searchParams.has('ts') || url.searchParams.has('nocache');
    if (isPopoutOrTimestamped) {
      event.respondWith(
        fetch(event.request, { cache: 'no-store' })
          .catch(() => caches.match(event.request))
      );
      return;
    }
  } catch (e) {}

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});

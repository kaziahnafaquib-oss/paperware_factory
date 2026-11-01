// Service Worker for Paperware Platform
// Handles caching strategies for optimal performance.
// Scope-aware: the site is served under a base path on GitHub Pages (/paperware_factory/),
// so every URL is derived from the registration scope instead of "/".

const CACHE_VERSION = 'paperware-v1.1.0';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// Base path of the app (e.g. "/" or "/paperware_factory/").
const BASE = new URL('./', self.location.href).pathname;

// Assets to cache on install (the app shell; hashed JS/CSS are cached on first use).
const STATIC_ASSETS = [BASE, `${BASE}index.html`];

// Maximum cache sizes
const MAX_DYNAMIC_CACHE_SIZE = 50;
const MAX_IMAGE_CACHE_SIZE = 100;

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)).catch(() => undefined)
  );
  self.skipWaiting();
});

// Activate event - clean up caches from older versions (keep this version's three caches)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith('paperware-') && !key.startsWith(`${CACHE_VERSION}-`))
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Helper function to limit cache size
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(() => limitCacheSize(name, size));
      }
    });
  });
};

// Only full, successful, same-origin responses go into the cache (206 partials would throw in cache.put).
const cacheable = (res) => res && res.ok && res.status === 200 && res.type === 'basic';

const cacheFirst = (request, cacheName, limit) =>
  caches.match(request).then((cacheRes) =>
    cacheRes ||
    fetch(request).then((fetchRes) => {
      if (cacheable(fetchRes)) {
        const copy = fetchRes.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(request, copy);
          if (limit) limitCacheSize(cacheName, limit);
        });
      }
      return fetchRes;
    })
  );

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET, cross-origin (embeds, fonts CDN, analytics) and byte-range requests (video/audio seeking).
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;
  if (request.headers.has('range')) return;
  if (request.destination === 'video' || request.destination === 'audio') return;

  // Images - Cache First, then Network
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request, IMAGE_CACHE, MAX_IMAGE_CACHE_SIZE));
    return;
  }

  // Static assets (hashed filenames) - Cache First
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font'
  ) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Pages and data - Network First, then Cache, then app shell (SPA fallback)
  event.respondWith(
    fetch(request)
      .then((fetchRes) => {
        if (cacheable(fetchRes)) {
          const copy = fetchRes.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, copy);
            limitCacheSize(DYNAMIC_CACHE, MAX_DYNAMIC_CACHE_SIZE);
          });
        }
        return fetchRes;
      })
      .catch(() =>
        caches.match(request).then((cacheRes) => {
          if (cacheRes) return cacheRes;
          if (request.mode === 'navigate') {
            return caches.match(`${BASE}index.html`).then((shell) => shell || caches.match(BASE));
          }
          return Response.error();
        })
      )
  );
});

// Let the page trigger an update (used by src/app/lib/serviceWorker.ts).
self.addEventListener('message', (event) => {
  if (!event.data) return;
  if (event.data.type === 'SKIP_WAITING') self.skipWaiting();
  if (event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('paperware-')).map((k) => caches.delete(k))));
  }
});

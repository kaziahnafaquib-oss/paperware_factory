// Service Worker for Paperware Platform
// Handles caching strategies for optimal performance

const CACHE_VERSION = 'paperware-v1.0.0';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/app/App.tsx',
  '/src/styles/index.css',
];

// Maximum cache sizes
const MAX_DYNAMIC_CACHE_SIZE = 50;
const MAX_IMAGE_CACHE_SIZE = 100;

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key.startsWith('paperware-') && key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
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

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests with appropriate strategies
  
  // Images - Cache First, then Network
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then((cacheRes) => {
        return (
          cacheRes ||
          fetch(request).then((fetchRes) => {
            return caches.open(IMAGE_CACHE).then((cache) => {
              cache.put(request, fetchRes.clone());
              limitCacheSize(IMAGE_CACHE, MAX_IMAGE_CACHE_SIZE);
              return fetchRes;
            });
          })
        );
      })
    );
    return;
  }

  // Static assets - Cache First
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(request).then((cacheRes) => {
        return (
          cacheRes ||
          fetch(request).then((fetchRes) => {
            return caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, fetchRes.clone());
              return fetchRes;
            });
          })
        );
      })
    );
    return;
  }

  // API calls and pages - Network First, then Cache
  event.respondWith(
    fetch(request)
      .then((fetchRes) => {
        return caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(request, fetchRes.clone());
          limitCacheSize(DYNAMIC_CACHE, MAX_DYNAMIC_CACHE_SIZE);
          return fetchRes;
        });
      })
      .catch(() => {
        return caches.match(request).then((cacheRes) => {
          return (
            cacheRes ||
            caches.match('/').then((fallback) => {
              return fallback;
            })
          );
        });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // Implement your sync logic here
      Promise.resolve()
    );
  }
});

// Push notifications support
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  const data = event.data ? event.data.json() : {};
  
  const options = {
    body: data.body || 'New update available',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: data.primaryKey || 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Paperware', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked');
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((names) => {
        return Promise.all(names.map((name) => caches.delete(name)));
      })
    );
  }
});

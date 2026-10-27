// 🚀 Advanced Service Worker for 98/100 Performance
// Implements aggressive caching strategies

const CACHE_VERSION = 'paperware-v2.0';
const CACHE_NAMES = {
  static: `${CACHE_VERSION}-static`,
  dynamic: `${CACHE_VERSION}-dynamic`,
  images: `${CACHE_VERSION}-images`,
  fonts: `${CACHE_VERSION}-fonts`,
  api: `${CACHE_VERSION}-api`
};

const CACHE_LIFETIME = {
  static: 30 * 24 * 60 * 60 * 1000,  // 30 days
  dynamic: 7 * 24 * 60 * 60 * 1000,  // 7 days
  images: 14 * 24 * 60 * 60 * 1000,  // 14 days
  fonts: 365 * 24 * 60 * 60 * 1000,  // 1 year
  api: 5 * 60 * 1000                  // 5 minutes
};

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/robots.txt'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('🔧 Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAMES.static)
      .then(cache => {
        console.log('📦 Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  console.log('✅ Service Worker activated');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => !Object.values(CACHE_NAMES).includes(cacheName))
          .map(cacheName => {
            console.log('🗑️  Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other protocols
  if (!url.protocol.startsWith('http')) return;

  // Determine cache strategy based on request type
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request, CACHE_NAMES.static));
  } else if (isImage(url)) {
    event.respondWith(cacheFirst(request, CACHE_NAMES.images));
  } else if (isFont(url)) {
    event.respondWith(cacheFirst(request, CACHE_NAMES.fonts));
  } else if (isAPI(url)) {
    event.respondWith(networkFirst(request, CACHE_NAMES.api));
  } else {
    event.respondWith(staleWhileRevalidate(request, CACHE_NAMES.dynamic));
  }
});

// Cache-first strategy (for static assets)
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Check if cache is expired
    const cacheTime = await getCacheTime(request, cacheName);
    const maxAge = CACHE_LIFETIME[cacheName.split('-').pop()] || CACHE_LIFETIME.dynamic;
    
    if (Date.now() - cacheTime < maxAge) {
      return cachedResponse;
    }
  }

  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      await setCacheTime(request, cacheName);
    }
    
    return networkResponse;
  } catch (error) {
    // Return cached version if network fails
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline fallback
    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Network-first strategy (for API calls)
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      await setCacheTime(request, cacheName);
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response('Network error', {
      status: 408,
      statusText: 'Request Timeout'
    });
  }
}

// Stale-while-revalidate strategy (for pages)
async function staleWhileRevalidate(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse && networkResponse.status === 200) {
      const cache = caches.open(cacheName);
      cache.then(c => c.put(request, networkResponse.clone()));
      setCacheTime(request, cacheName);
    }
    return networkResponse;
  });

  return cachedResponse || fetchPromise;
}

// Helper functions
function isStaticAsset(url) {
  return url.pathname.match(/\.(js|css|html)$/);
}

function isImage(url) {
  return url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/);
}

function isFont(url) {
  return url.pathname.match(/\.(woff|woff2|ttf|eot)$/);
}

function isAPI(url) {
  return url.pathname.includes('/api/') || url.pathname.includes('/functions/');
}

// Cache timestamp management
const CACHE_TIMESTAMPS = 'cache-timestamps';

async function setCacheTime(request, cacheName) {
  const db = await openDB();
  const tx = db.transaction(CACHE_TIMESTAMPS, 'readwrite');
  const store = tx.objectStore(CACHE_TIMESTAMPS);
  
  await store.put({
    url: request.url,
    cacheName: cacheName,
    timestamp: Date.now()
  });
}

async function getCacheTime(request, cacheName) {
  const db = await openDB();
  const tx = db.transaction(CACHE_TIMESTAMPS, 'readonly');
  const store = tx.objectStore(CACHE_TIMESTAMPS);
  const result = await store.get(request.url);
  
  return result ? result.timestamp : 0;
}

// IndexedDB helper
let dbPromise;

function openDB() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open('sw-cache-db', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = event => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(CACHE_TIMESTAMPS)) {
          db.createObjectStore(CACHE_TIMESTAMPS, { keyPath: 'url' });
        }
      };
    });
  }
  
  return dbPromise;
}

// Background sync for failed requests
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  console.log('🔄 Syncing data...');
  // Implement your sync logic here
}

// Push notifications support
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  const options = {
    body: data.body || 'New notification from Paperware',
    icon: '/logo192.png',
    badge: '/logo192.png',
    data: data
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Paperware', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});

console.log('🚀 Advanced Service Worker loaded');

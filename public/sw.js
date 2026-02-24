const CACHE_NAME = 'liverton-codes-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((fetchResponse) => {
        // Don't cache API calls or dynamic content
        if (event.request.url.includes('firebase') || 
            event.request.method !== 'GET' ||
            event.request.url.includes('chrome-extension')) {
          return fetchResponse;
        }
        
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    }).catch(() => {
      // Return offline page for navigation requests
      if (event.request.mode === 'navigate') {
        return caches.match('/index.html');
      }
    })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-orders') {
    event.waitUntil(syncOrders());
  }
  if (event.tag === 'sync-contacts') {
    event.waitUntil(syncContacts());
  }
});

async function syncOrders() {
  // Sync pending orders when back online
  console.log('Syncing orders...');
}

async function syncContacts() {
  // Sync pending contacts when back online
  console.log('Syncing contacts...');
}

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'New notification from Liverton Codes',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('Liverton Codes', options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});

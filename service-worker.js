const CACHE_NAME = 'spentrack-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './signup.html',
    './signin.html',
    './style.css',
    './script.js',
    './icon/google-logo.png',
    './image/profile1.jpg',
    './image/profile2.jpg',
    './image/profile3.jpg',
    './image/profile4.jpg',
];

// Install the service worker and cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Serve cached content when offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Update the service worker and remove old caches
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
        })
    );
});
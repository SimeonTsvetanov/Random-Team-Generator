// Dynamic cache version based on timestamp - updates automatically
const CACHE_VERSION = "v" + Date.now();
const CACHE_NAME = `team-generator-${CACHE_VERSION}`;
const BASE_PATH = "/Random-Team-Generator";
const ASSETS_TO_CACHE = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/src/css/main.css`,
  `${BASE_PATH}/src/css/animations.css`,
  `${BASE_PATH}/src/css/components/logo.css`,
  `${BASE_PATH}/src/css/components/theme-switch.css`,
  `${BASE_PATH}/src/css/components/main-input.css`,
  `${BASE_PATH}/src/css/components/error-message.css`,
  `${BASE_PATH}/src/css/components/team-display.css`,
  `${BASE_PATH}/src/css/components/participant-counter.css`,
  `${BASE_PATH}/src/css/layout/grid.css`,
  `${BASE_PATH}/src/css/layout/containers.css`,
  `${BASE_PATH}/src/css/themes/dark.css`,
  `${BASE_PATH}/src/css/themes/light.css`,
  `${BASE_PATH}/src/js/utils/teamGenerator.js`,
  `${BASE_PATH}/src/js/utils/inputValidator.js`,
  `${BASE_PATH}/src/js/utils/storage.js`,
  `${BASE_PATH}/src/js/components/Logo.js`,
  `${BASE_PATH}/src/js/components/ThemeSwitch.js`,
  `${BASE_PATH}/src/js/components/MainInput.js`,
  `${BASE_PATH}/src/js/components/ErrorMessage.js`,
  `${BASE_PATH}/src/js/components/TeamDisplay.js`,
  `${BASE_PATH}/src/js/components/ParticipantCounter.js`,
  `${BASE_PATH}/src/js/main.js`,
  `${BASE_PATH}/src/assets/images/logo.svg`,
];

// Maximum age for cache in milliseconds (24 hours)
const MAX_CACHE_AGE = 24 * 60 * 60 * 1000;

// Install event - cache assets and skip waiting for immediate activation
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching app shell assets");
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => {
      // Force the new service worker to activate immediately
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches and take control immediately
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith("team-generator-") && name !== CACHE_NAME)
          .map((name) => {
            console.log("Deleting old cache:", name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - network first for HTML, cache first for assets with freshness check
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Handle navigation requests with network-first strategy
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // If network request succeeds, cache it and return
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
            return response;
          }
          throw new Error("Network response not ok");
        })
        .catch(() => {
          // If network fails, try cache
          return caches.match(`${BASE_PATH}/index.html`).then((response) => {
            if (response) {
              return response;
            }
            // If both network and cache fail, return a custom offline page
            return new Response(
              `<!DOCTYPE html>
                <html>
                <head><title>Offline - Random Team Generator</title></head>
                <body>
                  <h1>You are offline</h1>
                  <p>Please check your internet connection and try again.</p>
                </body>
                </html>`,
              {
                headers: { "Content-Type": "text/html" },
              }
            );
          });
        })
    );
    return;
  }

  // For CSS and JS files, use stale-while-revalidate strategy
  if (url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        }).catch(() => cachedResponse);

        // Return cached version immediately if available, otherwise wait for network
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // For other assets, use cache-first strategy
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

// Enhanced Service Worker for Random Team Generator PWA
// Implements dynamic caching with automatic updates and better debugging

const CACHE_VERSION = "v" + Date.now();
const CACHE_NAME = `team-generator-${CACHE_VERSION}`;
const BASE_PATH = "/Random-Team-Generator";

console.log("🚀 SW: Starting with cache version:", CACHE_VERSION);

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

// Maximum age for cache in milliseconds (1 hour - reduced for more frequent updates)
const MAX_CACHE_AGE = 60 * 60 * 1000;

// Install event - cache assets and skip waiting for immediate activation
self.addEventListener("install", (event) => {
  console.log("🔧 SW: Installing with version", CACHE_VERSION);
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("💾 SW: Caching app shell assets");
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        console.log("✅ SW: Cache populated, skipping waiting");
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("❌ SW: Install failed:", error);
      })
  );
});

// Activate event - clean up old caches and take control
self.addEventListener("activate", (event) => {
  console.log("🎯 SW: Activating version", CACHE_VERSION);
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        const oldCaches = cacheNames.filter(
          (name) => name.startsWith("team-generator-") && name !== CACHE_NAME
        );
        
        console.log("🧹 SW: Deleting old caches:", oldCaches);
        
        return Promise.all(
          oldCaches.map((name) => {
            console.log("🗑️ SW: Deleting cache:", name);
            return caches.delete(name);
          })
        );
      })
      .then(() => {
        console.log("👑 SW: Taking control of all clients");
        return self.clients.claim();
      })
      .then(() => {
        // Notify all clients about the update
        return self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            console.log("📨 SW: Notifying client about cache update");
            client.postMessage({
              type: 'CACHE_UPDATED',
              version: CACHE_VERSION
            });
          });
        });
      })
      .catch((error) => {
        console.error("❌ SW: Activation failed:", error);
      })
  );
});

// Fetch event - enhanced with better logging and cache strategies
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Handle navigation requests with network-first strategy
  if (event.request.mode === "navigate") {
    console.log("🧭 SW: Handling navigation request:", url.pathname);
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // If network request succeeds, cache it and return
          if (response && response.status === 200) {
            console.log("✅ SW: Network response OK for navigation");
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
            return response;
          }
          throw new Error("Network response not ok");
        })
        .catch(() => {
          console.log("📱 SW: Network failed, trying cache for navigation");
          // If network fails, try cache
          return caches.match(`${BASE_PATH}/index.html`).then((response) => {
            if (response) {
              console.log("💾 SW: Serving from cache for navigation");
              return response;
            }
            // If both network and cache fail, return a custom offline page
            console.log("⚠️ SW: Serving offline page");
            return new Response(
              `<!DOCTYPE html>
                <html>
                <head>
                  <title>Offline - Random Team Generator</title>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                    body { font-family: system-ui, -apple-system, sans-serif; text-align: center; padding: 2rem; }
                    h1 { color: #e74c3c; }
                  </style>
                </head>
                <body>
                  <h1>You are offline</h1>
                  <p>Please check your internet connection and try again.</p>
                  <button onclick="window.location.reload()">Retry</button>
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

  // For CSS and JS files, use network-first with fast cache fallback
  if (url.pathname.endsWith(".css") || url.pathname.endsWith(".js")) {
    console.log("📄 SW: Handling asset request:", url.pathname);
    event.respondWith(
      Promise.race([
        fetch(event.request, { cache: 'no-cache' })
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              console.log("🌐 SW: Fresh network response for", url.pathname);
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
              return networkResponse;
            }
            throw new Error("Network response not ok");
          }),
        // Race with cache after 1 second delay
        new Promise(resolve => {
          setTimeout(() => {
            caches.match(event.request).then(cachedResponse => {
              if (cachedResponse) {
                console.log("💾 SW: Fast cache fallback for", url.pathname);
                resolve(cachedResponse);
              }
            });
          }, 1000);
        })
      ]).catch(() => {
        console.log("📦 SW: Fallback to cache for", url.pathname);
        return caches.match(event.request);
      })
    );
    return;
  }

  // For other assets, use cache-first strategy
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("💾 SW: Cache hit for", url.pathname);
        return response;
      }

      console.log("🌐 SW: Fetching from network", url.pathname);
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

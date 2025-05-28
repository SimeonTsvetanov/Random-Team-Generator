const CACHE_NAME = "team-generator-v1";
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
  `${BASE_PATH}/src/js/utils/animations.js`,
  `${BASE_PATH}/src/js/components/Logo.js`,
  `${BASE_PATH}/src/js/components/ThemeSwitch.js`,
  `${BASE_PATH}/src/js/components/MainInput.js`,
  `${BASE_PATH}/src/js/components/ErrorMessage.js`,
  `${BASE_PATH}/src/js/components/TeamDisplay.js`,
  `${BASE_PATH}/src/js/components/ParticipantCounter.js`,
  `${BASE_PATH}/src/js/main.js`,
  `${BASE_PATH}/src/assets/images/logo.svg`,
];

// Install event - cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  
  // Handle navigation requests to return index.html for PWA
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(`${BASE_PATH}/index.html`)
            .then(response => {
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
                  headers: { "Content-Type": "text/html" }
                }
              );
            });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      // Clone the request because it can only be used once
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // Clone the response because it can only be used once
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

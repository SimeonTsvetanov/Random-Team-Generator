const CACHE_NAME = "team-generator-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/src/css/main.css",
  "/src/css/animations.css",
  "/src/css/components/logo.css",
  "/src/css/components/theme-switch.css",
  "/src/css/components/main-input.css",
  "/src/css/components/error-message.css",
  "/src/css/components/team-display.css",
  "/src/css/components/participant-counter.css",
  "/src/css/layout/grid.css",
  "/src/css/layout/containers.css",
  "/src/css/themes/dark.css",
  "/src/css/themes/light.css",
  "/src/js/utils/teamGenerator.js",
  "/src/js/utils/inputValidator.js",
  "/src/js/utils/storage.js",
  "/src/js/utils/animations.js",
  "/src/js/components/Logo.js",
  "/src/js/components/ThemeSwitch.js",
  "/src/js/components/MainInput.js",
  "/src/js/components/ErrorMessage.js",
  "/src/js/components/TeamDisplay.js",
  "/src/js/components/ParticipantCounter.js",
  "/src/js/main.js",
  "/src/assets/images/logo.svg",
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
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

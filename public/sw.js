const CACHE_VERSION = "v4";
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;
const OFFLINE_URL = "/offline";

const STATIC_ASSETS = [
  "/favicon-192.png",
  "/favicon-512.png",
  "/favicon-32.png",
  "/favicon-180.png",
  "/favicon-light.svg",
  "/favicon-dark.svg",
  "/manifest.webmanifest",
  OFFLINE_URL,
];

const cachePut = async (request, response) => {
  const cache = await caches.open(RUNTIME_CACHE);
  await cache.put(request, response);
};

const cacheFirst = async (request) => {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    const copy = response.clone();
    cachePut(request, copy);
    return response;
  } catch (error) {
    console.error("Cache-first fetch failed; returning cached asset.", error);
    return cacheFallback(request);
  }
};

const cacheFallback = async (request, fallbackUrl) => {
  const cached = await caches.match(request);
  if (cached) return cached;

  if (fallbackUrl) {
    const fallback = await caches.match(fallbackUrl);
    if (fallback) return fallback;
  }

  return new Response("Network error", {
    status: 504,
    statusText: "Gateway Timeout",
  });
};

const networkFirst = async (request, fallbackUrl) => {
  try {
    const response = await fetch(request);
    const copy = response.clone();
    cachePut(request, copy);
    return response;
  } catch (error) {
    console.error("Fetch failed; returning cached page instead.", error);
    return cacheFallback(request, fallbackUrl);
  }
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) =>
        Promise.all(
          STATIC_ASSETS.map((asset) =>
            cache.add(asset).catch((error) => {
              console.warn("Failed to cache asset during install:", asset, error);
            }),
          ),
        ),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches
        .keys()
        .then((keys) =>
          Promise.all(
            keys
              .filter((key) => ![STATIC_CACHE, RUNTIME_CACHE].includes(key))
              .map((key) => caches.delete(key)),
          ),
        ),
      self.clients.claim(),
    ]),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      networkFirst(event.request, OFFLINE_URL),
    );
    return;
  }

  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  if (event.request.destination === "image") {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return networkFirst(event.request);
      }),
    );
    return;
  }

  event.respondWith(networkFirst(event.request));
});

const CACHE_VERSION = "v2";
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  "/favicon-192.png",
  "/favicon-512.png",
  "/favicon-32.png",
  "/favicon-180.png",
  "/favicon-light.svg",
  "/favicon-dark.svg",
  "/manifest.webmanifest",
];

const cachePut = async (request, response) => {
  const cache = await caches.open(RUNTIME_CACHE);
  await cache.put(request, response);
};

const cacheFallback = async (request) => {
  const cached = await caches.match(request);
  if (cached) return cached;

  return new Response("Network error", {
    status: 504,
    statusText: "Gateway Timeout",
  });
};

const networkFirst = async (request) => {
  try {
    const response = await fetch(request);
    const copy = response.clone();
    cachePut(request, copy);
    return response;
  } catch (error) {
    console.error("Fetch failed; returning cached page instead.", error);
    return cacheFallback(request);
  }
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
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
      networkFirst(event.request),
    );
    return;
  }

  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request)),
    );
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

const STATIC_ASSETS = ["/", "/cacheTest.txt", "/cacheTest2.txt", "index.html"];

// `install` event listener
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("static").then(function (cache) {
      cache.addAll(STATIC_ASSETS);
    })
  );
});

// `activate` event listener
self.addEventListener("activate", function (event) {
  return self.clients.claim();
});

// `fetch` event listener
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

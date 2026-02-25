self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("barber-app").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/Logo rotondo .png",
        "/logo-nome.jpg",
        "/palo.jpg"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

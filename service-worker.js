// This address briefly served a different app that installed a service worker and cached itself here.
// This file replaces that worker: it clears those caches, removes itself and reloads the page.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.map((k) => caches.delete(k)));
  await self.registration.unregister();
  const pages = await self.clients.matchAll({ type: 'window' });
  pages.forEach((p) => p.navigate(p.url));
})()));

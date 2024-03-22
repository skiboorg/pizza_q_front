import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { setCacheNameDetails, clientsClaim } from "workbox-core";

const PREFIX = 'v11'
const SUFFIX = 'v1'

setCacheNameDetails({
  prefix: PREFIX,
  suffix: SUFFIX,
});

cleanupOutdatedCaches();


precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("controlling", () => {
  window.location.reload();
});

self.addEventListener("activate", (event) => {
  console.log('activate',)
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      return keys.map(async (cache) => {
        console.log(cache)

        return caches.delete(cache);
        // if (!cache.includes(PREFIX)) {
        //   console.log('includes')
        //   return await caches.delete(cache);
        // }
      });

    })()
  );
});

self.addEventListener("install", function () {
  self.skipWaiting();
});

clientsClaim();

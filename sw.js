const CACHE = 'popcorn-v4';
const ASSETS = ['./', './index.html', './manifest.json', './apple-touch-icon.png', './icon-192.png', './icon-512.png', './data.json'];
const POSTERS = ['./posters/30-days-of-night.webp', './posters/a-quiet-place-part-ii.webp', './posters/apostle.webp', './posters/as-above-so-below.webp', './posters/black-phone-2.webp', './posters/bring-her-back.webp', './posters/castle-rock.webp', './posters/dark.webp', './posters/dead-of-winter.webp', './posters/dead-snow.webp', './posters/evil-dead.webp', './posters/fresh.webp', './posters/from.webp', './posters/frozen.webp', './posters/get-out.webp', './posters/gonjiam-haunted-asylum.webp', './posters/haven.webp', './posters/hell-house-llc.webp', './posters/hereditary.webp', './posters/heretic.webp', './posters/host.webp', './posters/insidious-chapter-2.webp', './posters/insidious.webp', './posters/it-follows.webp', './posters/it-welcome-to-derry.webp', './posters/let-me-in.webp', './posters/let-the-right-one-in.webp', './posters/longlegs.webp', './posters/malignant.webp', './posters/midnight-mass.webp', './posters/misery.webp', './posters/nosferatu.webp', './posters/oddity.webp', './posters/orphan.webp', './posters/paranormal-activity.webp', './posters/ravenous.webp', './posters/resident-evil.webp', './posters/saint-maud.webp', './posters/see-for-me.webp', './posters/sinister.webp', './posters/skinamarink.webp', './posters/smile-2.webp', './posters/smile.webp', './posters/stranger-things.webp', './posters/talk-to-me.webp', './posters/the-autopsy-of-jane-doe.webp', './posters/the-babadook.webp', './posters/the-blackcoat-s-daughter.webp', './posters/the-borderlands.webp', './posters/the-conjuring-2.webp', './posters/the-conjuring.webp', './posters/the-cycle.webp', './posters/the-dark-and-the-wicked.webp', './posters/the-descent.webp', './posters/the-endless.webp', './posters/the-exorcism-of-emily-rose.webp', './posters/the-exorcism.webp', './posters/the-fearless-vampire-killers.webp', './posters/the-grey.webp', './posters/the-last-winter.webp', './posters/the-lodge.webp', './posters/the-medium.webp', './posters/the-nun.webp', './posters/the-shining.webp', './posters/the-substance.webp', './posters/the-thing.webp', './posters/the-vast-of-night.webp', './posters/the-wailing.webp', './posters/the-witch.webp', './posters/the-wolf-of-snow-hollow.webp', './posters/triangle.webp', './posters/twin-peaks.webp', './posters/under-the-dome.webp', './posters/wayward-pines.webp', './posters/we-are-still-here.webp', './posters/weapons.webp', './posters/werewolves-within.webp', './posters/when-evil-lurks.webp', './posters/you-won-t-be-alone.webp'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
    const cache = await caches.open(CACHE);
    await Promise.all(POSTERS.map(u => cache.add(u).catch(() => {})));
  })());
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      }
      return res;
    }))
  );
});

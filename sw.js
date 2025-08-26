// Basic service worker for runtime + precache strategy
const CACHE_VERSION='v1';
const PRECACHE='precache-'+CACHE_VERSION;
const RUNTIME='runtime-'+CACHE_VERSION;
// List core assets to precache (add more if needed)
const PRECACHE_URLS=[
  self.registration.scope + 'assets/tailwind.css',
  self.registration.scope + 'assets/js/site.js'
];

self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(PRECACHE).then(cache=>cache.addAll(PRECACHE_URLS)).then(self.skipWaiting())
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>![PRECACHE,RUNTIME].includes(k)).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
  );
});

// Cache-first for images & CSS/JS, network-first for others (HTML)
self.addEventListener('fetch',event=>{
  const req=event.request;
  const url=new URL(req.url);
  if(url.origin!==location.origin)return;
  if(req.method!=='GET')return;
  const isAsset=/\.(?:png|jpg|jpeg|webp|gif|svg|css|js)$/i.test(url.pathname);
  if(isAsset){
    event.respondWith(
      caches.match(req).then(cached=>{
        const fetchPromise=fetch(req).then(resp=>{
          if(resp && resp.status===200){
            const clone=resp.clone();
            caches.open(RUNTIME).then(c=>c.put(req,clone));
          }
          return resp;
        }).catch(()=>cached);
        return cached||fetchPromise;
      })
    );
    return;
  }
  if(req.headers.get('accept')?.includes('text/html')){
    event.respondWith(
      fetch(req).then(resp=>{
        const clone=resp.clone();
        caches.open(RUNTIME).then(c=>c.put(req,clone));
        return resp;
      }).catch(()=>caches.match(req))
    );
  }
});

self.addEventListener('message',event=>{
  if(event.data==='skipWaiting') self.skipWaiting();
});

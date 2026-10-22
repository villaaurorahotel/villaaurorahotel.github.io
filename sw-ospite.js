// App ospiti — Greta's House — generato da DeskFlow il 22/10/2026, 17:26:19
// Tiene sul telefono i file dell'app per aprirla anche senza internet; prende sempre la versione nuova quando c'è rete.
var CACHE='ospite-1792682779699';
var FILES=['area-ospite.html','manifest-ospite.json','icona-ospite-192.png','icona-ospite-512.png'];
self.addEventListener('install',function(e){ e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(FILES); }).then(function(){ return self.skipWaiting(); })); });
self.addEventListener('activate',function(e){ e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.filter(function(k){ return k.indexOf('ospite-')===0 && k!==CACHE; }).map(function(k){ return caches.delete(k); })); }).then(function(){ return self.clients.claim(); })); });
self.addEventListener('fetch',function(e){ var u=new URL(e.request.url); if(e.request.method!=='GET'||u.origin!==location.origin) return;
  var nome=u.pathname.split('/').pop(); if(FILES.indexOf(nome)<0) return; // tocca SOLO i file dell'app ospiti, mai il gestionale
  e.respondWith(fetch(e.request).then(function(r){ var cp=r.clone(); caches.open(CACHE).then(function(c){ c.put(nome, cp); }); return r; }).catch(function(){ return caches.match(nome); })); });

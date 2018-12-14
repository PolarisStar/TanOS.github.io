var cacheName = 'CacheThanOS';
var filesToCache = [
    '/',
    '/index.html',
    '/login.html',
    '/productos.html',
    '/ventas.html',
    "/js/app.js",
    "/js/app2.js",
    "/js/main.js",
    "/css/carrusel.css",  
    "/css/main.css",
    "/css/mobile.css",
    "/img/seccion1.jpg", 
    "/img/seccion2.jpg", 
    "/img/seccion3.jpg",
    "/img/seccion4.jpg",
    "img/img1.jpg",
    "img/img2.jpg",
    "img/img3.jpg",
    "img/img4.jpg",
    "/img/carrousel1.jpg",
    "/img/carrousel2.jpg",
    "/img/carrousel3.jpg",
    "/img/carrousel4.jpg",
    "/img/fondo.jpg",
    "/img/fondo1.jpg",
    "/img/logo.png",
];


self.addEventListener( 'install', function( e ) {
  console.log( '[ServiceWorker] Install' );
  e.waitUntil(
      caches.open( cacheName ).then( function( cache ) {
          console.log( '[ServiceWorker] Caching app shell' );
          return cache.addAll( filesToCache );
      } )
  );
} );

self.addEventListener( 'activate', function( e ) {
  console.log( '[ServiceWorker] Activate' );
  e.waitUntil(
      caches.keys( ).then( function( keyList ) {
          return Promise.all( keyList.map( function( key ) {
              if ( key != cacheName ) {
                  console.log('[ServiceWorker] Removing old cache', key);
                  return caches.delete( key );
              }
          }));
      })
  );
  return self.clients.claim();
});

self.addEventListener( 'fetch', function( e ) {
  console.log( '[ServiceWorker] Fetch', e.request.url );
  e.respondWith(
      caches.match( e.request ).then( function( response ) {
          return response || fetch( e.request );
      } )
  );
} );
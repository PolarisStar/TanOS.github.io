( function() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
                 .register('./service-worker.js')
                 .then(function(cache) { 
                     console.log('Service Worker Registered');                    
                });
      }
} )( );
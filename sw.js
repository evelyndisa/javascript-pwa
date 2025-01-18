const CACHE_STATIC_NAME = 'static-v08'
const CACHE_INMUTABLE_NAME = 'inmutable-v08'
const CACHE_DYNAMIC_NAME = 'dynamic-v08'

const CON_CACHE = true

self.addEventListener('install', e => {
    console.log('install')

    const cacheStatic = caches.open(CACHE_STATIC_NAME).then( cache => {
        //console.log(cache)

        // Guardo todos los recursos estáticos de la APP SHELL (son los necesarios para que este sitio funcione)
        return cache.addAll([
            '/index.html',
            '/css/estilos.css',
            '/js/main.js',
            '/js/api.js',
            '/plantillas/productos.hbs',
            '/images/super.jpg'
        ])
    })

    const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME).then( cache => {
        //console.log(cache)

        // Guardo todos los recursos inmutables de la APP SHELL (son los necesarios para que este sitio funcione)
        return cache.addAll([
            'https://code.jquery.com/jquery-3.7.1.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.8/handlebars.min.js',
            'https://code.getmdl.io/1.3.0/material.min.js',
            'https://code.getmdl.io/1.3.0/material.indigo-pink.min.css'
        ])
    })

    e.waitUntil(Promise.all[cacheStatic, cacheInmutable])

    /* const cache = caches.open('cache-1').then( cache => {
        console.log(cache)

        // Guardo todos los recursos de la APP SHELL (son los necesarios para que este sitio funcione)
        return cache.addAll([
            '/index.html',
            '/css/estilos.css',
            '/js/main.js',
            '/js/api.js',
            '/plantillas/productos.hbs',
            '/images/super.jpg',
            'https://code.jquery.com/jquery-3.7.1.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.8/handlebars.min.js',
            'https://code.getmdl.io/1.3.0/material.min.js',
            'https://code.getmdl.io/1.3.0/material.indigo-pink.min.css'
        ])
    })

    // espero a que todas las promesas de este listener se cumplan
    e.waitUntil(cache) */
})


self.addEventListener('activate', e => {
    console.log('activate')

    const cacheWhiteList = [
        CACHE_STATIC_NAME,
        CACHE_INMUTABLE_NAME,
        CACHE_DYNAMIC_NAME
    ]

    // Borro todos los caches que NO estén en la lista actual (borro los caches viejos)
    const cachesBorrados = caches.keys().then (nombres => {
        //console.log(nombres)
        return Promise.all(
            nombres.map( nombre => {
                if(!cacheWhiteList.includes(nombre)) {
                    return caches.delete(nombre)
                }
            })
        )
    })

    e.waitUntil(cachesBorrados)
})


self.addEventListener('fetch', e => {
    //console.log('fetch')

    if(CON_CACHE) {
        const { url, method } = e.request
        //console.log(method, url)

        if(method == 'GET' && !url.includes('mockapi.io') && !url.includes('chrome-extension')) {
            const respuesta = caches.match(e.request).then( res => {
                if(res) {
                    console.log('EXISTE el recurso en el cache', url)
                    return res
                }
                console.error('NO EXISTE el recurso en el cache', url)

                return fetch(e.request).then( nuevaRespuesta => {
                    caches.open(CACHE_DYNAMIC_NAME).then( cache => {
                        cache.put(e.request, nuevaRespuesta)
                    })
                    return nuevaRespuesta.clone()

                })
            })
            e.respondWith(respuesta)
        }
        else {
            console.warn('BYPASS', method, url)
        }
    }
})
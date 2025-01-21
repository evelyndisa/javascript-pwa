// ---------- SERVICE WORKER ---------- //


// nombre de los caches donde se almacenarán los archivos
const CACHE_STATIC_NAME = 'static-v08'; // recursos esenciales de la aplicación que no cambian
const CACHE_INMUTABLE_NAME = 'inmutable-v08'; // recursos externos que no cambian (bibliotecas, frameworks)
const CACHE_DYNAMIC_NAME = 'dynamic-v08'; // archivos que pueden cambiar dinámicamente (respuestas de red)

const CON_CACHE = true // controla si se usa el caché o no



// --------
// evento que se ejecuta cuando el Service Worker se instala
self.addEventListener('install', e => {
    console.log('install')

    const cacheStatic = caches.open(CACHE_STATIC_NAME).then( cache => {
        console.log(cache)

        // guardo todos los recursos estáticos de la APP SHELL (son los necesarios para que este sitio funcione)
        return cache.addAll([
            '/index.html',
            '/css/estilos.css',
            '/js/main.js',
            '/js/api.js',
            '/plantillas/productos.hbs',
            '/images/super.jpg'
        ])
    })

    // APP SHELL:  Es la estructura básica de la interfaz de usuario de la aplicación que se carga rápidamente y se almacena en caché localmente para que esté disponible incluso cuando no haya conexión a Internet.

    // almacena archivos inmutables como bibliotecas externas
    const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME).then( cache => {

        // guardo todos los recursos inmutables de la APP SHELL (son los necesarios para que este sitio funcione)
        return cache.addAll([
            'https://code.jquery.com/jquery-3.7.1.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.8/handlebars.min.js',
            'https://code.getmdl.io/1.3.0/material.min.js',
            'https://code.getmdl.io/1.3.0/material.indigo-pink.min.css'
        ])
    })

    // espera a que ambos caches se completen antes de finalizar el evento
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



// ----------
// evento que se ejecuta cuando el Service Worker se activa
self.addEventListener('activate', e => {
    console.log('activate')

    // lista de caches válidos (los actuales)
    const cacheWhiteList = [
        CACHE_STATIC_NAME,
        CACHE_INMUTABLE_NAME,
        CACHE_DYNAMIC_NAME
    ]

    // borro todos los caches que NO estén en la lista actual (borro los caches viejos): para orden y eficiencia del almacenamiento en caché de la aplicación.
    //1. evitar usar recursos desactualizados: cada vez que hacemos cambios en nuestra aplicación, es posible que los archivos antiguos aún estén almacenados en el caché. se podría cargar versiones obsoletas en lugar de las más recientes.
    //2. optimizar el espacio de almacenamiento: los navegadores tienen un límite de espacio disponible para el caché.
    //3. Mejorar el rendimiento de la PWA: cada solicitud de red que pasa por el Service Worker revisa los caches. Si hay demasiados caches obsoletos, el proceso de búsqueda se vuelve más lento.
    //4. Evitar conflictos entre versiones
    const cachesBorrados = caches.keys().then (nombres => {
        console.log(nombres)
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


// evento que se ejecuta cada vez que se hace una solicitud de red
self.addEventListener('fetch', e => {
    //console.log('fetch')

    if(CON_CACHE) { // si está activado el uso de caché
        const { url, method } = e.request
        //console.log(method, url)

        // solo se aplica para solicitudes GET que no sean hacia APIs o extensiones del navegador
        if(method == 'GET' && !url.includes('mockapi.io') && !url.includes('chrome-extension')) {
            const respuesta = caches.match(e.request).then( res => {
                if(res) {
                    console.log('EXISTE el recurso en el cache', url)
                    return res // si el recurso está en el caché, lo devuelve
                }
                console.error('NO EXISTE el recurso en el cache', url)

                // si no está en el caché, lo descarga de la red
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
            console.warn('BYPASS', method, url) // ignora solicitudes no relevantes
        }
    }
})
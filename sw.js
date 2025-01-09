//cuando se instala
self.addEventListener(
    'install', 
    function(e){
        console.log('service worker: instalado')
    }
)

// cuando se activa
self.addEventListener(
    'activate', 
    function(e){
        console.log('service worker: activado')
    }
)

//como capta las peticiones
self.addEventListener('fetch', e => {
    //console.log('fetch')

    //console.log(e)
    //console.log(e.request)
    
    /* const method = e.request.method
    const url = e.request.url */

    const { method, url } = e.request       // Object destructuring
    console.log(method,url)

    /* const { method:metodo, url:ruta } = e.request       // Object destructuring con alias
    console.log(metodo,ruta) */

    console.warn('¿Es un css?', url.includes('.css')? 'Si':'No')

    // ----------- Intervengo la hoja de estilos externa ----------
    if(url.includes('estilos.css')) {
        console.error('Petición del recurso estilos.css')

        //const respuesta = null
        const respuesta = new Response(`
            .w-10 { width: 10%; }
            .w-20 { width: 20%; }
            .w-30 { width: 30%; }
            .w-40 { width: 40%; }
            .w-50 { width: 50%; }
            .w-60 { width: 60%; }
            .w-70 { width: 70%; }
            .w-80 { width: 80%; }
            .w-90 { width: 90%; }
            .w-100 { width: 100%; }
            
            .ml-item {
                margin-left: 20px;
            }
            
            .mdl-layout {
                min-width: 380px;
            }
            
            .menu {
                padding: 20px;
                display: flex;
                justify-content: space-around;
                align-items: center;
            }
            
            .demo-list-icon {
            /* width: 300px; */
            }
            
            img {
                width: 100%;
                max-width: 800px;
            }        

            body {
                /* background-color: red; */
            }
        `, { headers: { 'content-type': 'text/css' } })

        e.respondWith(respuesta)
    }

    // ----------- Intervengo los recursos multimedia ----------
    else if(url.includes('super.jpg')) {
        console.error('Me di cuenta que estás pidiendo una imagen')

        //const respuesta = null
        //const respuesta = fetch('images/super-al-reves.jpg')
        const respuesta = fetch('https://static.educalingo.com/img/en/800/grocery-store.jpg', { mode: 'no-cors' })
                            .catch( error => console.error(`!!!ERROR EN FETCH DE IMÁGEN!!!': ${error.message}`))

        e.respondWith(respuesta)
    }
    
    // ----------- Intervengo el framework de estilos ----------
    else if(url.includes('https://code.getmdl.io/1.3.0/material.indigo-pink.min.css')) {
        console.error('Me di cuenta que estás pidiendo una hoja de estilos desde una CDN')

        //const respuesta = null
        const respuesta = fetch('https://code.getmdl.io/1.3.0/material.light_green-blue.min.css')
        e.respondWith(respuesta)
    }

    // ----------- Intervengo el codigo de la página ----------
    else if(url.includes('main.js')) {
        console.error('Me di cuenta que estás pidiendo el código principal del sitio')

        //const respuesta = null
        //const respuesta = fetch('js/main.js')
        const respuesta = fetch('https://danielsanchez.com.ar/main.js', { mode: 'no-cors' })
                            .catch( error => console.error(`!!!ERROR EN FETCH DE CÓDIGO!!!': ${error.message}`))
        e.respondWith(respuesta)
    }

    // ------------ casos intervenidos pero con respuesta del recurso real solicitado -----------
    else {
        //const respuesta = fetch(e.request)  // (1)
        //const respuesta = fetch(e.request.url)  // (2)
        const respuesta = fetch(url)  // (3)

        e.respondWith(respuesta)
    }

    console.log('')
})
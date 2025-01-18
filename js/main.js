/* -------------------------------------- */
/*          VARIABLES GLOBALES            */
/* -------------------------------------- */
let listaProductos = []

/* -------------------------------------- */
/*          FUNCIONES GLOBALES            */
/* -------------------------------------- */

// -------------- MANEJO DEL LOCAL STORAGE ----------------
function guardarListaProductos(lista) {
    localStorage.setItem('lista', JSON.stringify(lista))
}

function leerListaProductos() {
    let lista = []
    const prods = localStorage.getItem('lista')
    if(prods) {
        try {
            lista = JSON.parse(prods)
        }
        catch {
            guardarListaProductos(lista)
        }
    }
    return lista
}


async function borrarProd(id) {
    await apiProductos.delete(id)
    renderLista()
}

async function cambiarValorProd(que, id, el) {
    const cual = listaProductos.findIndex(p => p.id == id)
    const valor = el.value
    listaProductos[cual][que] = que == 'cantidad' ? parseInt(valor) : parseFloat(valor)

    const producto = listaProductos[cual]
    await apiProductos.put(id, producto)

    guardarListaProductos(listaProductos)
}

async function renderLista() {
    const plantilla = await $.ajax({ url: 'plantillas/productos.hbs' })
    const template = Handlebars.compile(plantilla);

    listaProductos = await apiProductos.get()
    guardarListaProductos(listaProductos)

    const html = template({listaProductos: listaProductos})

    $('#lista').html(html)

    const ul = $('#contenedor-lista')
    componentHandler.upgradeElements(ul)
}

function configurarListenersMenu() {

    /* botón agregar producto */
    $('#btn-entrada-producto').click(async () => {
        const input = $('#ingreso-producto')
        const nombre = input.val()

        const producto = { nombre: nombre, cantidad: 1, precio: 0 }
        await apiProductos.post(producto)

        renderLista()
        input.val('')
    })

    /* botón borrar todo */
    $('#btn-borrar-productos').click(() => {
        if (listaProductos.length) {
            var dialog = $('dialog')[0];
            dialog.showModal();
        }
    })
}

function registrarServiceWorker() {
    if ('serviceWorker' in navigator) {
        this.navigator.serviceWorker.register('/sw.js')
            .then(reg => {
                //console.log('El service worker se ha registrado correctamente', reg)
            })
            .catch(err => {
                console.error('Error al registrar el service worker', err)
            })
    }
    else {
        console.error('serviceWorker no está disponible en navigator')
    }
}

function iniDialog() {
    var dialog = $('dialog')[0];
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    $('dialog .aceptar').click(async () => {
        dialog.close();

        await apiProductos.deleteAll()
        renderLista()
    });

    $('dialog .cancelar').click( () => {
        dialog.close();
    });
}

function testCaches() {
    //https://caniuse.com
    //https://caniuse.com/?search=caches

    if(window.caches) {
        console.warn('El browser soporta Caches')

        console.log(caches)

        /* Creo espacios de cache */
        caches.open('prueba-1')
        caches.open('prueba-2')
        caches.open('prueba-3')

        /* Comprobamos si un cache existe */
        caches.has('prueba-2').then(rta => console.log(rta))
        //caches.has('prueba-3').then(rta => console.log(rta))
        caches.has('prueba-3').then(console.log)
        //caches.has('prueba-3').then(alert)

        /* Borrar un cache */
        caches.delete('prueba-1').then(console.log)

        /* Listo todos los nombre de cache (disponibles en caches) */
        caches.keys().then(console.log)

        /* Abro un cache y trabajo con el */
        caches.open('cache-v1.1').then( cache => {
            console.log('cache', cache)
            console.log('caches', caches)

            /* Agrego un recurso al cache abierto */
            //cache.add('/index.html')

            /* Agrego varios recurso al cache abierto */
            cache.addAll([
                '/index.html',
                '/css/estilos.css',
                '/images/super.jpg'
            ]).then( () => {
                console.log('Recursos agregados')

                /* Borro un recurso dentro del cache */
                cache.delete('/css/estilos.css').then(console.log)

                /* Verifico si un recurso existe en ese cache */
                //cache.match('/index.html').then( res => {
                cache.match('/css/estilos.css').then( res => {
                    console.log(res)
                    if(res) {
                        console.log('Recurso encontrado')
                        /* Acceso al contenido del recurso */
                        res.text().then(console.log)
                    }
                    else {
                        console.log('Recurso NO encontrado')
                    }
                })

                /* Creo ó modifico el contenido de un recurso */
                cache.put('/index.html', new Response('<p>Hola mundo</p>', { headers: { 'content-type':'text/html' } }))

                /* Listo todos los RECURSOS que contiene ese cache */
                cache.keys().then( recursos => console.log('Recursos almacenados en el cache abierto', recursos))
                cache.keys().then( recursos => {
                    recursos.forEach( recurso => {
                        console.log(recurso.url)
                    })
                })

                /* Listo todos los NOMBRES DE ESPACIO DE CACHE que contiene caches */
                caches.keys().then( nombres => console.log('Nombres de cache', nombres))
                caches.keys().then( nombres => {
                    nombres.forEach( nombre => {
                        console.log(nombre)
                    })
                })
            })
        })
    }
    else {
        console.error('El browser NO soporta Caches')
    }
}

function start() {
    //console.warn($('title').text())

    //testCaches()

    registrarServiceWorker()

    iniDialog()
    configurarListenersMenu()
    renderLista()
}


/* -------------------------------------- */
/*               EJECUCIÓN                */
/* -------------------------------------- */
$(document).ready(start)
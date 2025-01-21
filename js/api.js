// Se define un módulo autoejecutable que gestiona las operaciones con la API de productos.
// permite realizar operaciones CRUD (Crear, Read, Update, Delete)
const apiProductos = (function () {

    // Genera la URL para acceder a los recursos de la API. Si se pasa un ID, se incluye en la URL.
    // sin el ID, se accede a la lista completa
    function getURL(id) {
        return 'https://665b3ad4003609eda4604381.mockapi.io/api/productos/' + (id || '')
    }

    // Obtiene todos los productos de la API.
    async function get() {
        try {
            const prods = await $.ajax({ url: getURL() }) // Realiza una solicitud GET a la API.
            return prods // Devuelve los productos obtenidos.
        }
        catch (error) {
            console.error('ERROR GET', error)
            const prods = leerListaProductos() // Obtiene productos de un almacenamiento local como respaldo.
            console.log(prods)
            return prods // Devuelve los productos locales.
        }
    }


    // Agrega un nuevo producto a la API.
    async function post(producto) {
        const prodAgregado = await $.ajax({ url: getURL(), method: 'post', data: producto }) // Realiza una solicitud POST.
        return prodAgregado // Devuelve el producto agregado.
    }


    // Actualiza un producto existente en la API.
    async function put(id, producto) {
        const prodActualizado = await $.ajax({ url: getURL(id), method: 'put', data: producto }) // Realiza una solicitud PUT.
        return prodActualizado // Devuelve el producto actualizado.
    }


    // Elimina un producto específico de la API.
    async function del(id) {
        const prodEliminado = await $.ajax({ url: getURL(id), method: 'delete' }) // Realiza una solicitud DELETE.
        return prodEliminado // Devuelve el producto eliminado.
    }

    // Elimina todos los productos de la API uno por uno.
    async function deleteAll() {
        const progress = $('progress') // Selecciona el elemento de progreso (barra de carga).
        progress.css('display', 'block') // Muestra la barra de progreso.

        let porcentaje = 0
        for (let i = 0; i < listaProductos.length; i++) {
            porcentaje = parseInt((i * 100) / listaProductos.length) // Calcula el porcentaje de progreso.
            console.log(porcentaje + '%')
            progress.val(porcentaje) // Actualiza el valor de la barra de progreso.

            const { id } = listaProductos[i] // Obtiene el ID del producto.
            await del(id) // Elimina el producto con el ID actual.
        }
        porcentaje = 100
        console.log(porcentaje + '%')
        progress.val(porcentaje) // Completa la barra de progreso.

        // Oculta la barra de progreso después de 2 segundos.
        setTimeout(() => {
            progress.css('display', 'none')
        }, 2000)
    }

    return {
        get: () => get(), // Permite obtener productos.
        post: producto => post(producto), // Permite agregar un producto.
        put: (id, producto) => put(id, producto), // Permite actualizar un producto.
        delete: id => del(id), // Permite eliminar un producto por ID.
        deleteAll: () => deleteAll(), // Permite eliminar todos los productos.
    }
})()
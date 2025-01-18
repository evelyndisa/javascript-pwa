const apiProductos = (function() {

  function getURL(id) {
      return 'https://665b3ad4003609eda4604381.mockapi.io/api/productos/' + (id || '')
  }

  async function get() {
      try {
          const prods = await $.ajax({url: getURL()})
          return prods
      }
      catch(error) {
          console.error('ERROR GET', error)
          const prods = leerListaProductos()
          console.log(prods)
          return prods
      }
  }

  async function post(producto) {
      const prodAgregado = await $.ajax({url: getURL(), method: 'post', data: producto})
      return prodAgregado
  }

  async function put(id, producto) {
      const prodActualizado = await $.ajax({url: getURL(id), method: 'put', data: producto})
      return prodActualizado
  }

  async function del(id) {
      const prodEliminado = await $.ajax({url: getURL(id), method: 'delete'})
      return prodEliminado
  }

  async function deleteAll() {
      const progress = $('progress')
      progress.css('display','block')

      let porcentaje = 0
      for(let i=0; i<listaProductos.length; i++) {
          porcentaje = parseInt((i * 100) / listaProductos.length)
          console.log(porcentaje + '%')
          progress.val(porcentaje)

          const { id } = listaProductos[i]
          await del(id)
      }
      porcentaje = 100
      console.log(porcentaje + '%')
      progress.val(porcentaje)

      setTimeout(() => {
          progress.css('display','none')
      },2000)
  }

  return {
      get: () => get(),
      post: producto => post(producto),
      put: (id,producto) => put(id,producto),
      delete: id => del(id),
      deleteAll: () => deleteAll(),
  }
})()
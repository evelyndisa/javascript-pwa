const apiProducts = (function () {
    function getURL(id) {
      return (
        "https://6786e356f80b78923aa87199.mockapi.io/api/productos/" +
        (id ? id : "")
      );
    }
  
    async function get() {
      const prods = await $.ajax({ url: getURL() });
      return prods;
    }
  
    async function post(producto) {
      const prodAgregado = await $.ajax({
        url: getURL(),
        method: "POST",
        data: producto,
      });
      return prodAgregado;
    }
  
    async function put(id, producto) {
      const prodActualizado = await $.ajax({
        url: getURL(id),
        method: "PUT",
        data: producto,
      });
      return prodActualizado;
    }
  
    async function del(id, producto) {
      const prodEliminado = await $.ajax({
        url: getURL(id),
        method: "DELETE",
      });
      return prodEliminado;
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
      post: (producto) => post(producto),
      put: (id, producto) => put(id, producto),
      del: (id) => del(id),
      deleteAll: () => deleteAll()
    };
  })();  
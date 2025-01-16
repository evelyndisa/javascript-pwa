/* -------------------------------------- */
/*          VARIABLES GLOBALES            */
/* -------------------------------------- */
let listaProductos = [
];

/* -------------------------------------- */
/*          FUNCIONES GLOBALES            */
/* -------------------------------------- */
async function borrarProd(id) {
  await apiProducts.del(id)

  renderLista();
}

async function cambiarValorProd(que, id, el) {
  const cual = listaProductos.findIndex((p) => p.id == id);
  const valor = el.value;

  listaProductos[cual][que] =
    que == "cantidad" ? parseInt(valor) : parseFloat(valor);

  const producto = listaProductos[cual];
  await apiProducts.put(id, producto);
}

async function renderLista() {
  const plantilla = await $.ajax({ url: "plantillas/productos.hbs" });
  const template = Handlebars.compile(plantilla);

  listaProductos = await apiProducts.get();
  console.log(listaProductos);
  const html = template({ listaProductos: listaProductos });

  $("#lista").html(html);

  const ul = $("#contenedor-lista");
  componentHandler.upgradeElements(ul);
}

function configurarListenersMenu() {
  $("#btn-entrada-producto").click(async () => {
    const input = $("#ingreso-producto");
    const nombre = input.val();

    const producto = { nombre: nombre, cantidad: 1, precio: 0 };
    listaProductos.push(producto);

    await apiProducts.post(producto);

    renderLista();

    input.val("");
  });

  $("#btn-borrar-productos").click(() => {
    if (listaProductos.length) {
      var dialog = $("dialog")[0];
      dialog.showModal();
    }
  });
}

function registrarServiceWorker() {
  if ("serviceWorker" in navigator) {
    this.navigator.serviceWorker
      .register("sw.js")
      .then((reg) => {
        //console.log("Service Worker registrado.", reg);
      })
      .catch((err) => {
        console.error("Service Worker NO registrado.", err);
      });
  } else {
    console.error("Service Worker no soportado en este navegador.");
  }
}

function iniDialog() {
  let dialog = $("dialog")[0];
  if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
  $(".aceptar").click(async function () {
    dialog.close();

    // listaProductos = [];
    await apiProducts.deleteAll();

    renderLista();
  });
  $(".cancelar").click(function () {
    dialog.close();
  });
}

function start() {
  registrarServiceWorker();

  iniDialog();
  configurarListenersMenu();
  renderLista();
}

/* -------------------------------------- */
/*               EJECUCIÓN                */
/* -------------------------------------- */

$(document).ready(start);

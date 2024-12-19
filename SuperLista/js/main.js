// -----------------------------------------------------------
//                VARIABLES GLOBALES                
//------------------------------------------------------------
// listado de los productos

let listaProductos = [
    { nombre: 'Seitan', cantidad: 1, precio: 200 },
    { nombre: 'Jamon', cantidad: 3, precio: 200 },
    { nombre: 'Tofu', cantidad: 5, precio: 200 },
    { nombre: 'Medallon', cantidad: 22, precio: 200 }
]


// -----------------------------------------------------------
//                FUNCIONES GLOBALES                
//------------------------------------------------------------
function renderLista(){
    const lista = document.getElementById('lista');
    lista.innerHTML = ''; 
    const ul = document.createElement('ul');
    ul.classList.add('demo-list-icon', 'mdl-list')
    
    listaProductos.forEach((producto, index)=>{
        ul.innerHTML += `
        <li class="mdl-list__item">
                        
            <span class="mdl-list__item-primary-content w-10">
                <i class="material-icons mdl-list__item-icon">shopping_cart</i>
            </span>
            
            <span class="mdl-list__item-primary-content w-20">
                ${producto.nombre}
            </span>

            <span class="mdl-list__item-primary-content w-30">
                <div class="mdl-textfield mdl-js-textfield">
                    <input value=${producto.cantidad} class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="cantidad-1">
                    <label class="mdl-textfield__label" for="${index}">Cantidad</label>
                </div>
            </span>

            <span class="mdl-list__item-primary-content w-30 ml-10">
                <div class="mdl-textfield mdl-js-textfield">
                    <input value=${producto.precio} class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id=${index}>
                    <label class="mdl-textfield__label" for="${index}">Precio</label>
                </div>
            </span>
            
            <!-- Colored FAB button with ripple -->
            
            <span class="mdl-list__item-primary-content w-10 ml-10">
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                    <i class="material-icons">remove_shopping_cart</i>
                </button>
            </span>

        </li>
    `;
    })
    document.getElementById('lista').append(ul)
}


function configurarListenerMenu(){
    //boton borrar todo
    document.getElementById('btn-eliminar-productos').addEventListener('click', ()=>{
        listaProductos = [];
        renderLista();
    });
}


// -----------------------------------------------------------
//                    EJECUCIONES            
//------------------------------------------------------------
renderLista()
configurarListenerMenu()
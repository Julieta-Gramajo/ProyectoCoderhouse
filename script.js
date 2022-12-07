// acceso al carrito mediante botón id=menú
window.addEventListener("DOMContentLoaded", (e) => {

    const menuBoton = document.getElementById("menu")
    const div = document.querySelector("header div div")

    menuBoton.addEventListener("click", (e) => {
        menuBoton.classList.toggle("salir");
        div.classList.toggle("visible")
    })
})

fetch("./api.json")
.then(res => res.json())
.then(array => {

// DECLARACIÓN DE VARIABLES ----------------------------

// array vacio para renderizar productos agregados al carrito
let arrayCarrito = []



// DECLARACIÓN DE FUNCIONES ---------------------------

// función para filtrar productos
function buscador(){
    let filtrado = array.filter(producto => producto.nombre.toLocaleLowerCase().includes(input.value.toLocaleLowerCase()))
    renderizar(filtrado)
}

// función para renderizar productos
function renderizar(arrayProductos){
    // sección para renderizar productos
    let section = document.getElementById("section")
    section.classList.add("grid")
    section.innerHTML = ""

    for (const producto of arrayProductos) {
        let divColumna = document.createElement("div")
        divColumna.classList.add("tarjeta")
        divColumna.innerHTML = 
            `
                    <img src=${producto.img}>
                    <div class="h5"><h5>${producto.nombre}</h5></div>
                    <div class="p"><p>$${producto.precio}</p></div>
                    <div class="boton"><button class="button add" id="${producto.id}">Agregar al carrito</button></div>
            `
    
            section.append(divColumna)
        }
    
        let botones = document.getElementsByClassName("button")
        for (const boton of botones) {
            boton.addEventListener("click", agregarCarrito)
        }
}

// función para renderizar productos agregados al carrito
function renderizarCarrito(){
    // div para renderizar productos agregados al carrito
    let carrito = document.getElementById("carrito")

    carrito.innerHTML = ""
    for (const itemCarrito of arrayCarrito) {
        carrito.innerHTML += 
    `<div class="carrito">
            <img class="imgCarrito" src=${itemCarrito.img}>
        <div>
            <h5 class="h5Carrito">${itemCarrito.nombre}</h5>
            <p class="pCarrito">${itemCarrito.unidades}</p>
            <p class="pCarrito">$ ${itemCarrito.subtotal}</p>
        </div
        <div class="boton"><button class="button delete" id="${itemCarrito.id}">quitar</button></div>
    </div`
    }

    if(arrayCarrito.length == 0){
        carrito.innerHTML = 
        `
        <h4 class="h4Carrito">Tu carrito está vacío.</h4>
        `
    }
    
    let botones = document.getElementsByClassName("delete")
        for (const boton of botones) {
            boton.addEventListener("click", eliminarCarrito)
        }

    
    // contador de productos agregados al carrito
    const contador = document.getElementById("contador")
    contador.textContent = arrayCarrito.length
    
    // monto total de la compra en el carrito
    const total = document.getElementById("total")
    total.innerText = arrayCarrito.reduce((acumulador, producto) => acumulador + producto.unidades * producto.precio, 0 )


    guardarStorage()
}

// función para agregar productos al carrito.
function agregarCarrito(e){
    // console.dir(e.target.id)
    
    let productobuscado = array.find(producto => producto.id == e.target.id)
    let productoPosicion = arrayCarrito.findIndex(producto => producto.id == e.target.id)
    if(productoPosicion != -1){
        arrayCarrito[productoPosicion] = {
                id: arrayCarrito[productoPosicion].id, 
                nombre: arrayCarrito[productoPosicion].nombre, 
                precio: arrayCarrito[productoPosicion].precio, 
                img: arrayCarrito[productoPosicion].img, 
                unidades: arrayCarrito[productoPosicion].unidades + 1, 
                subtotal: arrayCarrito[productoPosicion].precio * (arrayCarrito[productoPosicion].unidades + 1)
            }
        }
    else{
        arrayCarrito.push({
            id: productobuscado.id, 
            nombre: productobuscado.nombre, 
            precio: productobuscado.precio, 
            img: productobuscado.img, 
            unidades: 1, 
            subtotal: productobuscado.precio
        })
    }

    renderizarCarrito()
    
}

// renderizar carrito
function renderizarCarrito(){
    const h42 = document.getElementById("h4Carrito2")
    h42.classList.add("ocultar")
    h42.classList.remove("mostrar")

    const total3 = document.getElementById("total3")
    total3.classList.add("ocultar")
    total3.classList.remove("mostrar")

    let carrito = document.getElementById("carrito")
    carrito.innerHTML = ""
    
    for (const itemCarrito of arrayCarrito) {
        carrito.innerHTML += 
    `<div class="carrito">
            <img class="imgCarrito" src=${itemCarrito.img}>
        <div>
            <h5 class="h5Carrito">${itemCarrito.nombre}</h5>
            <p class="pCarrito">${itemCarrito.unidades}</p>
            <p class="pCarrito">$ ${itemCarrito.subtotal}</p>
        </div
        <div class="boton"><button class="button delete" id="${itemCarrito.id}">quitar</button></div>
    </div`
    }

    if(arrayCarrito.length === 0){
        carrito.innerHTML = 
        `
        <h4 class="h4Carrito2">Tu carrito está vacío.</h4>
        `
    }
    
    let botones = document.getElementsByClassName("delete")
        for (const boton of botones) {
            boton.addEventListener("click", eliminarCarrito)
        }

    
    // contador carrito
    let contador = document.getElementById("contador")
    contador.textContent = arrayCarrito.length

    total.innerText = arrayCarrito.reduce((acumulador, producto) => acumulador + producto.unidades * producto.precio, 0 )


    guardarStorage()
}

// eliminar productos del carrito
function eliminarCarrito(e){
    let borrar = e.target.id
    arrayCarrito = arrayCarrito.filter((producto) => producto.id != borrar)

    let productoPosicion = arrayCarrito.findIndex(producto => producto.id == e.target.id)
    if(productoPosicion != -1){
        arrayCarrito[productoPosicion] = {
                unidades: arrayCarrito[productoPosicion].unidades = 1, 
            }
        }

    renderizarCarrito()
}

// guardar sotorage
function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(arrayCarrito))
}



// EVENTOS --------------------------------------------------------------------------------------------------------------------------

// local storage
document.addEventListener("DOMContentLoaded", () => {
    arrayCarrito = JSON.parse(localStorage.getItem("carrito")) || []

    renderizarCarrito()
})

// vaciar carrito
const vaciar = document.getElementById("vaciar")
vaciar.addEventListener("click", () =>{
    if(arrayCarrito.length == 0){
        Swal.fire(
            '¡Tu carrito ya está vacío!',
            'Agrega productos al carrito.',
            'error'
          )
    }
    else{
        arrayCarrito.length = []

        Swal.fire(
            '¡Tu carrito fue vaciado!',
            'Agrega productos al carrito.',
            'success'
          )
    }

    renderizarCarrito()
})

// botón "finalizar compra"
const finalizar = document.getElementById("finalizar")
finalizar.addEventListener("click", () =>{

    if(arrayCarrito.length == 0){

        Swal.fire(
            '¡Tu carrito está vacío!',
            'Agrega productos a tu carrito',
            'error'
          )
    }
    else{
        Swal.fire(
            '¡Muchas gracias por tu compra!',
            'Su compra ha finalizado',
            'success'
          )
    }
    
    arrayCarrito.length = []

    renderizarCarrito()
})

// acceso al filtrado de productos mediante input
let input = document.getElementById("input")
input.addEventListener("input",buscador)

// acceso a local storage
document.addEventListener("DOMContentLoaded", () => {
    arrayCarrito = JSON.parse(localStorage.getItem("carrito")) || []

    renderizarCarrito()
})


// LLAMADO DE FUNCIONES --------------------------------------------------------------------------------------------------------------------------
renderizar(array)
})














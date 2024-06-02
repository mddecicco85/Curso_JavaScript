//PIDO DATOS A LA API DE DRAGON BALL (A LA SECCIÓN PERSONAJES)

let cant = 10; //Cantidad de personajes a usar.
let vectorPrecios = [
  12, 24, 21, 17, 13, 15, 10, 23, 15, 24, 22, 15, 13, 13, 16, 18, 15, 15, 18,
  25, 21, 13, 23, 20, 14, 19, 20, 24, 17, 17,
]; //Hago un vector con random, con valores entre 10 y 25

//DE ESTA FORMA SE PUEDE, PERO CADA VEZ QUE ACTUALIZA DA VALORES DISTINTOS.
// let vectorPrecios = [];
// for (let i = 0; i < cant; i++) {
//   vectorPrecios[i] = Math.round(Math.random() * 15 + 10);
// }

let precios = JSON.stringify(vectorPrecios); //Paso el vector a String

localStorage.setItem("vectorPrecios", precios);
//let prices = Number(precios); //Quería transformar el vector de Strings a vector de números.
//console.log(prices);
//console.log(localStorage.getItem("vectorPrecios")); //Escribe el vector como String

document.addEventListener("DOMContentLoaded", cargarProductos);

let productos = []; //Quiero hacer un vector sólo con la cantidad que elegí.
let productosCarrito = []; //El carrito empieza vacío.
let num = 0; //Este contador va a generar el ID para encontrar el producto al momento de borrarlo.

//FUNCIÓN ASINCRÓNICA PARA TRAER LOS DATOS DE LA API.
async function cargarProductos() {
  let precios = JSON.parse(localStorage.getItem("vectorPrecios"));
  //console.log(precios);
  const resp = await fetch("https://dragonball-api.com/api/characters");
  //No logro que tome más de los 10 personajes que están en la 1ra página de la API.
  const data = await resp.json(); //await como prefijo a una promesa
  //console.log(data);
  for (let i = 0; i < cant; i++) {
    //console.log(data.items[i]);
    //data[i].precio = vectorPrecios[i];  //Con esto funciona pero no uso el localStorage.
    data.items[i].precio = precios[i];
    productos.push(data.items[i]);
    crearProducto(data.items[i]);
  }
  //console.log(productos);
  //localStorage.setItem("productos", JSON.stringify(productos));
  setearBotones();
}

//FUNCIONES SINCRÓNICAS

//Agrega cada producto al HTML para mostrarlo.
function crearProducto(personaje) {
  //personaje.precio = Math.ceil(Math.random() * 25);
  let producto = document.createElement("div");
  producto.setAttribute("class", "card");
  producto.innerHTML = `
  <img
    class="bd-placeholder-img"
    width="100%"
    height="225"
    src=${personaje.image}
    alt="${personaje.name}"
  />
  <div class="card-body">
    <h5 class="card-text">
      <strong>${personaje.name}</strong><br />
    </h5>
    <p class="card-house">
      <i>${personaje.race}</i><br />
    </p>
    
    <div
      class="d-flex justify-content-between align-items-center"
    >
      <!-- Start: view | edit button -->
      <div class="btn-group">
        <button
          id="${personaje.id}"
          type="button"
          class="btn btn-sm btn-outline-secondary"
        >
          Add to cart
        </button>
        <p class="card-price">
      <strong>$${personaje.precio}</strong><br />
    </p>
      </div>
      <!-- End: view | edit button -->
    </div>
  </div>
  `;
  let listado = document.getElementsByClassName("row");
  listado[0].append(producto);
}

//Agrega los eventos a los botones Add to cart.
function setearBotones() {
  for (let i = 0; i < productos.length; i++) {
    //console.log(productos[i].name);
    let id = `${productos[i].id}`; //Tomo el id del personaje.
    document
      .getElementById(`${productos[i].id}`)
      .addEventListener("click", () => {
        agregarAlCarrito(id);
      });
    document
      .getElementById(`${productos[i].id}`)
      .addEventListener("click", () => {
        mostrarCartelAgregado();
      });
  }
}

//Agrega los productos al vector carrito.
function agregarAlCarrito(id) {
  //console.log(id);
  actualizarCarrito();
  for (pers of productos) {
    //console.log(pers.id);
    if (pers.id === Number(id)) {
      //console.log(pers.name);
      pers.idBorrar = num;
      num++;
      productosCarrito.push(pers);
    }
  }
  //console.log(productosCarrito);
  localStorage.setItem("carrito", JSON.stringify(productosCarrito));
  //Gasta recursos sobreescribiendo. ¿Cómo hago?
}

//Verifica si el carrito está vacío o no. Si no está en localStorage es que se borró. Si no, guarda los productos que hay, en otro vector. Esto es por si se elimina alguno (o todos) desde la página del carrito.
function actualizarCarrito() {
  if (localStorage.getItem("carrito")) {
    //Si no lo pongo, falla al comienzo, porque "carrito" no está guardado. Aunque podría guardarlo al comienzo con un DOMContentLoaded.
    productosCarrito = JSON.parse(localStorage.getItem("carrito"));
    if (productosCarrito.length == 0) {
      num = 0; //Vuelvo a poner en cero el contador para generar los idBorrar sin que crezca indefinidamente.
    }
  }
}

//Muestra cartel al agregar un producto con el botón.
function mostrarCartelAgregado() {
  Toastify({
    text: "Product added.",
    duration: 1000,
    // gravity: top,
    // position: right,
    style: {
      background: "light_blue",
    },
    // onClick: () => {
    //     Toastify({}).showToast();
    // }
    destination: "index.html",
    // destination: "index_carrito_2.html",
  }).showToast();
}

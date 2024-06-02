//CREO EL VECTOR CARRITO VACÍO
let carrito = [];

let seApretoEnvio = false; //Es una bandera para saber si se apretó el botón de calcular envío.

document.addEventListener("DOMContentLoaded", recuperarCarrito);

//SETEO LOS BOTONES
let paraEnvio = document.getElementById("boton_envio");
paraEnvio.addEventListener("click", calcularEnvio);
paraEnvio.addEventListener("click", () => {
  seApretoEnvio = true;
  //console.log(seApretoEnvio);
});

let vacio = document.getElementById("boton_vaciar");
vacio.addEventListener("click", vaciarCarrito);

let finalizado = document.getElementById("btn-checkout");
finalizado.addEventListener("click", verificarCompra);

//FUNCIONES DEL CARRITO

//Agrega los elementos que están en el localStorage, guardados desde la página principal.
function agregarAlCarrito(carrito) {
  //console.log(carrito);
  for (producto of carrito) {
    //console.log(producto);
    let nuevoProducto = document.createElement("tr");
    //nuevoProducto.setAttribute("class", "product_row");
    nuevoProducto.className = "product_row";
    nuevoProducto.id = `${producto.idBorrar}`; //Éste va a ser el id de la fila (row), para poder borrarla.
    nuevoProducto.innerHTML = `
            <td>${producto.name}</td>
                <td>${producto.precio}</td>
                <td>
                  <button type="button" id="btn_${producto.idBorrar}" class="btn-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
                      />
                    </svg>
                  </button>
                </td>
            `;
    //listado.innerHTML = ""; //BORRA TODO LO DEL CARRITO
    document.getElementById("listadoEnCarrito").appendChild(nuevoProducto);
    let idBorrar = `${producto.idBorrar}`;
    let idBoton = `btn_${producto.idBorrar}`;
    let elimino = document.getElementById(idBoton);
    elimino.addEventListener("click", () => {
      eliminarDelStorage(idBorrar);
    }); //Si quiero eliminar primero visualmente, no anda bien.
    elimino.addEventListener("click", () => {
      eliminarDelCarrito(idBorrar);
    });
  }
}

//Revisa si quedó guardado el carrito en el localStorage. Por si cierra la ventana.
function recuperarCarrito() {
  let carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
  //console.log(carritoGuardado);
  agregarAlCarrito(carritoGuardado);
}

//Borra el producto del vector carrito en el localStorage.
function eliminarDelStorage(idB) {
  let carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
  //console.log(carritoGuardado);
  let nuevoCarrito = [];
  for (prod of carritoGuardado) {
    //Me fue imposible hacerlo con un filter.
    if (prod.idBorrar != idB) {
      nuevoCarrito.push(prod);
    }
  }
  //console.log(nuevoCarrito);
  localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
}

//Borra el producto en el carrito sólo visualmente.
function eliminarDelCarrito(idBorrar) {
  let linea = document.getElementById(idBorrar);
  linea.remove();
  let carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
  console.log(carritoGuardado);
  if (seApretoEnvio == true) {
    //Si se apretó alguna vez el botón de calcular envío, que lo calcule. No quiero que lo calcule cuando borro de a uno sin haber calculado el envío previamente.
    calcular(carritoGuardado);
  }
  //Hay que borrarlo del localStorage también, porque va a seguir estando en el vector carrito y en productosCarrito. Quizás con los métodos para borrar elementos de los vectores. ¿Cómo cambio productosCarrito?
}

//Aplica un porcentaje de descuento como si fuera un cupón.
//function aplicarCupon() {}

//Al apretar el botón Vaciar, se vacía el vector carrito del localStorage. Antes lo borraba entero.
function vaciarCarrito() {
  document.querySelectorAll(".product_row").forEach((el) => {
    el.remove();
  });
  if (document.getElementById("shipping_row")) {
    document.getElementById("shipping_row").remove();
  }
  if (document.getElementById("total_row")) {
    document.getElementById("total_row").remove();
  }
  //localStorage.clear(); //Esto borra todo el local storage, no afecta al vector.
  //localStorage.removeItem("carrito");
  let carrito = []; //Hago un vector nulo para almacenarlo en el localStorage.
  localStorage.setItem("carrito", JSON.stringify(carrito));
  seApretoEnvio = false;
}

//Calcula el costo de envío.
function calcularEnvio() {
  let cargoLosProductos = document.getElementsByClassName("product_row");
  //Esto es porque, si aprieta el botón del envío antes de refrescar la página, muestra el costo de envío y el total aunque no aparezcan los productos.
  let productosCarrito = JSON.parse(localStorage.getItem("carrito"));
  if (productosCarrito.length == 0 || cargoLosProductos.length == 0) {
    Swal.fire({
      title: "Your cart is empty!",
      text: "Fill it with products.",
      icon: "error",
      confirmButtonText: "Close",
    });
  } else {
    if (!document.getElementById("shipping_row")) {
      //Revisa que no esté la línea ya.
      calcular(productosCarrito);
    }
  }
}

//Calcula el costo de envío y el total, y los muestra.
function calcular(productosCarrito) {
  let suma = productosCarrito.reduce(sumarPrecios, 0); //Va a sumar los precios.
  let costoEnvio = Math.round(suma * 0.3); //Pongo un porcentaje cualquiera.
  let total = suma + costoEnvio;
  let hayFilaEnvio = document.getElementById("shipping_row");
  let hayFilaTotal = document.getElementById("total_row");
  if (hayFilaEnvio || hayFilaTotal) {
    console.log("Hay");
    hayFilaEnvio.remove(); //Si ya existe la fila con el envío, la borro.
    hayFilaTotal.remove();
  }
  if (productosCarrito.length > 0) {
    //Esto es para que no la cree con envío=0 cuando borro el último producto.
    let filaEnvio = document.createElement("tr"); //La vuelvo a crear.
    filaEnvio.id = "shipping_row";
    filaEnvio.innerHTML = `
            <td><strong>Shipping cost:</strong></td>
            <td>${costoEnvio}</td>
                `;
    document.getElementById("listadoEnCarrito").appendChild(filaEnvio);
    let filaTotal = document.createElement("tr");
    filaTotal.id = "total_row";
    filaTotal.innerHTML = `
            <td><strong>Total:</strong></td>
            <td>${total}</td>`;
    document.getElementById("listadoEnCarrito").appendChild(filaTotal);
  }
}

//Calcula la suma de los precios de los productos.
function sumarPrecios(acumulador, prod) {
  return acumulador + prod.precio;
}

//Muestra un cartel que pregunta si quiere confirmar la compra.
function verificarCompra() {
  let productosCarrito = JSON.parse(localStorage.getItem("carrito"));
  let cargoLosProductos = document.getElementsByClassName("product_row");
  if (productosCarrito.length == 0 || cargoLosProductos.length == 0) {
    Swal.fire({
      title: "Your cart is empty!",
      text: "Fill it with products.",
      icon: "error",
      confirmButtonText: "Close",
    });
  } else {
    if (document.getElementById("shipping_row")) {
      //Esto es para que no pueda terminar la compra sin haber calculado el envío y el total.
      Swal.fire({
        title: "Are you sure you want to submit your order?",
        confirmButtonText: "Yes, I do.",
        cancelButtonText: "No, I don't.",
        showCancelButton: true, //Si no lo pongo, no aparece el cartel para negar.
      }).then((result) => {
        if (result.isConfirmed) {
          //Si no pongo .isConfirmed, funciona para las dos opciones.
          vaciarCarrito();
          mostrarCompraFinalizada();
        }
      });
    } else {
      Swal.fire({
        text: "You must calculate shipping first.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  }
}

//Muestra cartel de que la compra finalizó con éxito.
function mostrarCompraFinalizada() {
  Swal.fire({
    title: "Thank you for your order!",
    text: "Your order has been saved.",
    icon: "success",
    confirmButtonText: "Close",
  });
}

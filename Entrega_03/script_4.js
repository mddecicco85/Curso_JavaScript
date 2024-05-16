// const nombre = document.getElementById("usuario").value;
// const contrasena = document.getElementById("contrasena").value;

//TOMO LOS NODOS DE INGRESO Y GUARDO LOS VALORES DE USUARIO Y CONTRASEÑA
const nombre = document.getElementById("usuario");
const contrasena = document.getElementById("contrasena");
//console.log(nombre.value);
nombre.onchange = () => {
  sessionStorage.setItem("usuario", nombre.value);
};
contrasena.onchange = () => {
  sessionStorage.setItem("contrasena", contrasena.value);
};

//SOLO PARA USAR JSON A PEDIDO DE LA CONSIGNA
const datos = { user: "Martín", password: 123 };
let botonUsuarioRecordado = document.getElementById("btn_datosRecordados");
botonUsuarioRecordado.addEventListener("click", mostrarDatosRecordados);
//botonUsuarioRecordado.addEventListener("click", darBienvenida);

//EVENTO DEL BOTÓN INGRESAR
let botonIniciar = document.getElementById("btn_iniciar");
botonIniciar.addEventListener("click", darBienvenida);

//FUNCIONES
function mostrarDatosRecordados() {
  let datosJSON = JSON.stringify(datos);
  //console.log(datosJSON);
  sessionStorage.setItem("datos", datosJSON);
  let datosRecordados = document.getElementById("datosRecordados");
  if (!datosRecordados) {
    datosRecordados = document.createElement("datosRecordados");
    datosRecordados.setAttribute("id", "datosRecordados");
    datosRecordados.innerHTML = `<p>Datos de usuario recordado:<br> ${sessionStorage.getItem(
      "datos"
    )}</p>`;
    document.body.appendChild(datosRecordados);
  }
}

function darBienvenida(e) {
  e.preventDefault();
  let nombreUsuario = sessionStorage.getItem("usuario");
  let password = sessionStorage.getItem("contrasena");
  if (nombreUsuario && password) {
    saludar(nombreUsuario, password);
    //Borro los datos ingresados. Al borrar el texto con value = "", vuelve a aparecer el placeholder.
    nombre.value = "";
    contrasena.value = "";

    // borrarFormularioIngreso(); //También podría mandarlo a otra pestaña.

    //Verifico si ya existe el botón Cerrar sesión, para que no vuelva a aparecer al tocar Ingresar.
    borrarDatosRecordados();
    borrarErrorIngreso();
    //borrarBotonIngreso();
    crearBotonCerrarSesion();
  } else {
    //console.log("No pueden quedar campos vacíos.");
    let errorIngreso = document.getElementById("errorIngreso");
    if (!errorIngreso) {
      crearErrorIngreso();
    }
  }
}

function saludar(nombreUsuario, password) {
  let saludo = document.getElementById("bienvenida");
  saludo.innerText = `¡Bienvenido, ${nombreUsuario}!`;
  //console.log(`Hola ${nombreUsuario}. Tu contraseña es ${password}.`);
}

function borrarFormularioIngreso() {
  let boton = document.getElementById("btn_iniciar").remove();
  //ESTO ERA PARA CUANDO NO BORRABA EL BOTÓN.
  let formulario = document.getElementById("formulario_ingreso");
  //Reviso si ya no se borró.
  if (formulario) {
    formulario.remove();
  }
}

function borrarDatosRecordados() {
  let texto = document.querySelector("datosRecordados");
  if (texto) {
    texto.remove();
  }
}

function crearErrorIngreso() {
  let errorIngreso = document.createElement("errorIngreso");
  errorIngreso.setAttribute("id", "errorIngreso");
  errorIngreso.innerHTML = "<p>No pueden quedar campos vacíos.</p>";
  document.body.appendChild(errorIngreso); //Me había olvidado de esto.
}

function crearBotonCerrarSesion() {
  let existeBotonCerrar = document.getElementById("btn_cerrarSesion");
  if (!existeBotonCerrar) {
    let botonCerrarSesion = document.createElement("button");
    botonCerrarSesion.innerText = "Cerrar sesión";
    botonCerrarSesion.setAttribute("id", "btn_cerrarSesion");
    document.body.appendChild(botonCerrarSesion);
    botonCerrarSesion.addEventListener("click", cerrarSesion);
  }
}

function cerrarSesion() {
  sessionStorage.clear();
  let saludo = document.getElementById("bienvenida");
  saludo.innerText = "Usuario no logueado.";
  //borrarBotonCerrarSesion();
}

function borrarErrorIngreso() {
  let texto = document.querySelector("errorIngreso");
  if (texto) {
    texto.remove();
  }
}

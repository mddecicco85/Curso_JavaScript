let num;
let i = 0;

//VERIFICACIÓN DE ENTRADA DE DATO
do {
  if (i > 0) {
    num = Number(prompt("Incorrecto. Ingrese un número natural del 1 al 100:"));
    //i++;
  } else {
    num = Number(prompt("Ingrese un número natural del 1 al 100:"));
    i++;
  }
} while (num < 1 || num > 100 || num * 1 !== num || num % 1 !== 0);

//MENÚ DE OPERACIONES
let opcion = Number(
  prompt(
    "¿Qué operación desea realizar? 1 - Elevar al cuadrado. 2 - Elevar al cubo. 3 - Calcular raíz cuadrada."
  )
);

//TAREAS A REALIZAR SEGÚN ELECCIÓN
switch (opcion) {
  case 1:
    elevarCuadrado(num);
    break;
  case 2:
    elevarCubo(num);
    break;
  case 3:
    raizCuadrada(num);
    break;
  default:
    alert(
      "Usted ha elegido una opción incorrecta. Por favor, vuelva a comenzar."
    );
}

//FUNCIONES
function elevarCuadrado(num) {
  let num2 = Math.pow(num, 2);
  alert(`${num} al cuadrado es igual a ${num2}.`);
}

function elevarCubo(num) {
  let num3 = Math.pow(num, 3);
  alert(`${num} al cubo es igual a ${num3}.`);
}

function raizCuadrada(num) {
  let raiz = Math.sqrt(num);
  alert("La raíz cuadrada de " + num + " es " + raiz + " .");
}

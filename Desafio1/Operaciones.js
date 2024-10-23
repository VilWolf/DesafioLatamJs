/* ESTA FUNCION SE DEBE UTILIZAR EN LA CONSOLA DEL NAVEGADOR O TENER HABILITADO EL PROMPT */

// Función para realizar las operaciones
function realizarOperaciones() {
    let num1, num2;

    // Pedir al usuario que ingrese dos números diferentes y mayores a cero
    do {
        num1 = parseFloat(prompt("Ingrese el primer número (mayor a 0):"));
        num2 = parseFloat(prompt("Ingrese el segundo número (mayor a 0 y diferente al primero):"));
        
        if (num1 <= 0 || num2 <= 0) {
            alert("Ambos números deben ser mayores a cero.");
        } else if (num1 === num2) {
            alert("Los números deben ser diferentes.");
        }
    } while (num1 <= 0 || num2 <= 0 || num1 === num2);

    // Realizar las operaciones
    const suma = num1 + num2;
    const resta = num1 - num2;
    const multiplicacion = num1 * num2;
    const division = num1 / num2;
    const modulo = num1 % num2;

    // Mostrar los resultados
    alert(`Resultados:
    Suma: ${suma}
    Resta: ${resta}
    Multiplicación: ${multiplicacion}
    División: ${division}
    Módulo: ${modulo}`);
}

// Llamar a la función
realizarOperaciones();

/* ESTA FUNCION SE DEBE UTILIZAR EN LA CONSOLA DEL NAVEGADOR O TENER HABILITADO EL PROMPT */

// Función para calcular la suma y el promedio de 5 números
function calcularSumaYPromedio() {
    let numeros = [];
    let suma = 0;

    // Pedir al usuario que ingrese 5 números
    for (let i = 1; i <= 5; i++) {
        let numero = parseFloat(prompt(`Ingrese el número ${i}:`));

        // Verificar que la entrada sea un número
        if (isNaN(numero)) {
            alert("Por favor, ingrese un número válido.");
            return;
        }

        numeros.push(numero);
        suma += numero; // Sumar el número ingresado
    }

    // Calcular el promedio
    const promedio = suma / numeros.length;

    // Mostrar los resultados
    alert(`Suma de los números: ${suma}\nPromedio de los números: ${promedio}`);
}

// Llamar a la función
calcularSumaYPromedio();

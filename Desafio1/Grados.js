/* ESTA FUNCION SE DEBE UTILIZAR EN LA CONSOLA DEL NAVEGADOR O TENER HABILITADO EL PROMPT */

// Función para convertir la temperatura
function convertirTemperatura() {
    // Pedir al usuario que ingrese la temperatura en grados Celsius
    let celsius = parseFloat(prompt("Ingrese la temperatura en grados Celsius:"));

    // Verificar que la entrada sea un número
    if (isNaN(celsius)) {
        alert("Por favor, ingrese un número válido.");
        return;
    }

    // Convertir a Kelvin y Fahrenheit
    const kelvin = celsius + 273.15;
    const fahrenheit = (celsius * 9/5) + 32;

    // Mostrar los resultados
    alert(`Temperatura en Kelvin: ${kelvin.toFixed(2)} K\nTemperatura en Fahrenheit: ${fahrenheit.toFixed(2)} °F`);
}

// Llamar a la función
convertirTemperatura();

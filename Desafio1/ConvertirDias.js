/* ESTA FUNCION SE DEBE UTILIZAR EN LA CONSOLA DEL NAVEGADOR O TENER HABILITADO EL PROMPT */

// Función para convertir días a años, semanas y días
function convertirDias() {
    // Pedir al usuario que ingrese la cantidad de días
    let totalDias = parseInt(prompt("Ingrese la cantidad de días:"));

    // Verificar que la entrada sea un número positivo
    if (isNaN(totalDias) || totalDias < 0) {
        alert("Por favor, ingrese un número válido y positivo.");
        return;
    }

    // Calcular años, semanas y días
    const años = Math.floor(totalDias / 365);
    totalDias %= 365; // Resto de días después de calcular años

    const semanas = Math.floor(totalDias / 7);
    const dias = totalDias % 7; // Resto de días después de calcular semanas

    // Mostrar los resultados
    alert(`Equivalente: ${años} año(s), ${semanas} semana(s) y ${dias} día(s).`);
}

// Llamar a la función
convertirDias();

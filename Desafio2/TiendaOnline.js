// Estructuras de datos
const productos = [
    { id: 1, nombre: "Camiseta", precio: 150, categoria: "Ropa", stock: 30 },
    { id: 2, nombre: "Pantalón", precio: 200, categoria: "Ropa", stock: 15 },
    { id: 3, nombre: "Zapatos", precio: 350, categoria: "Calzado", stock: 25 },
    { id: 4, nombre: "Gorra", precio: 50, categoria: "Accesorios", stock: 100 },
    { id: 5, nombre: "Chaqueta", precio: 500, categoria: "Ropa", stock: 8 },
    { id: 6, nombre: "Zapatillas", precio: 120, categoria: "Calzado", stock: 40 },
    { id: 7, nombre: "Sombrero", precio: 75, categoria: "Accesorios", stock: 5 },
    { id: 8, nombre: "Bolsos", precio: 250, categoria: "Accesorios", stock: 20 },
    { id: 9, nombre: "Camisa", precio: 180, categoria: "Ropa", stock: 12 },
    { id: 10, nombre: "Botines", precio: 300, categoria: "Calzado", stock: 18 }
];

const ventas = [
    { idVenta: 1, idProducto: 1, cantidadVendida: 20, fecha: "2024-10-01", idCliente: 1 },
    { idVenta: 2, idProducto: 2, cantidadVendida: 10, fecha: "2024-10-02", idCliente: 2 },
    { idVenta: 3, idProducto: 3, cantidadVendida: 15, fecha: "2024-10-03", idCliente: 3 },
    { idVenta: 4, idProducto: 4, cantidadVendida: 50, fecha: "2024-10-04", idCliente: 4 },
    { idVenta: 5, idProducto: 5, cantidadVendida: 8, fecha: "2024-10-05", idCliente: 5 },
    { idVenta: 6, idProducto: 6, cantidadVendida: 30, fecha: "2024-10-06", idCliente: 6 },
    { idVenta: 7, idProducto: 7, cantidadVendida: 4, fecha: "2024-10-07", idCliente: 7 },
    { idVenta: 8, idProducto: 8, cantidadVendida: 18, fecha: "2024-10-08", idCliente: 8 },
    { idVenta: 9, idProducto: 9, cantidadVendida: 12, fecha: "2024-10-09", idCliente: 9 },
    { idVenta: 10, idProducto: 10, cantidadVendida: 16, fecha: "2024-10-10", idCliente: 10 }
];

const clientes = [
    { idCliente: 1, nombre: "Juan", email: "juan@mail.com" },
    { idCliente: 2, nombre: "Ana", email: "ana@mail.com" },
    { idCliente: 3, nombre: "Carlos", email: "carlos@mail.com" },
    { idCliente: 4, nombre: "Marta", email: "marta@mail.com" },
    { idCliente: 5, nombre: "Luis", email: "luis@mail.com" },
    { idCliente: 6, nombre: "Laura", email: "laura@mail.com" },
    { idCliente: 7, nombre: "Pedro", email: "pedro@mail.com" },
    { idCliente: 8, nombre: "Sofía", email: "sofia@mail.com" },
    { idCliente: 9, nombre: "David", email: "david@mail.com" },
    { idCliente: 10, nombre: "Paula", email: "paula@mail.com" }
];

// 1. Función para obtener los 3 productos más vendidos
function obtenerProductosMasVendidos() {
    const ventasPorProducto = ventas.reduce((acumulador, venta) => {
        const producto = productos.find(p => p.id === venta.idProducto);
        if (producto) {
            if (!acumulador[producto.id]) {
                acumulador[producto.id] = { ...producto, cantidadVendida: 0 };
            }
            acumulador[producto.id].cantidadVendida += venta.cantidadVendida;
        }
        return acumulador;
    }, {});

    const productosOrdenados = Object.values(ventasPorProducto)
        .sort((a, b) => b.cantidadVendida - a.cantidadVendida);

    return productosOrdenados.slice(0, 3);
}

// 2. Función para calcular ingresos por categoría de producto
function calcularIngresosPorCategoria() {
    return ventas.reduce((acumulador, venta) => {
        const producto = productos.find(p => p.id === venta.idProducto);
        if (producto) {
            const ingreso = producto.precio * venta.cantidadVendida;
            if (!acumulador[producto.categoria]) {
                acumulador[producto.categoria] = 0;
            }
            acumulador[producto.categoria] += ingreso;
        }
        return acumulador;
    }, {});
}

// 3. Función para identificar clientes VIP (gasto > $1,000,000)
function obtenerClientesVIP() {
    const gastoPorCliente = ventas.reduce((acumulador, venta) => {
        const producto = productos.find(p => p.id === venta.idProducto);
        if (producto) {
            const gasto = producto.precio * venta.cantidadVendida;
            if (!acumulador[venta.idCliente]) {
                acumulador[venta.idCliente] = 0;
            }
            acumulador[venta.idCliente] += gasto;
        }
        return acumulador;
    }, {});

    return Object.keys(gastoPorCliente)
        .filter(clienteId => gastoPorCliente[clienteId] > 1000000)
        .map(clienteId => {
            const cliente = clientes.find(c => c.idCliente == clienteId);
            return { ...cliente, montoGastado: gastoPorCliente[clienteId] };
        });
}

// 4. Función para generar reporte de inventario
function generarReporteInventario() {
    return productos.map(producto => {
        let status = "In Stock";
        if (producto.stock < 10) {
            status = "Low Stock";
        } else if (producto.stock <= 20) {
            status = "In Stock";
        } else {
            status = "Enough Stock";
        }

        return {
            nombre: producto.nombre,
            categoria: producto.categoria,
            stock: producto.stock,
            status: status
        };
    });
}

// Ejecución de las funciones

console.log("Productos más vendidos:");
console.log(obtenerProductosMasVendidos());

console.log("\nIngresos por categoría:");
console.log(calcularIngresosPorCategoria());

console.log("\nClientes VIP:");
console.log(obtenerClientesVIP());

console.log("\nReporte de inventario:");
console.log(generarReporteInventario());

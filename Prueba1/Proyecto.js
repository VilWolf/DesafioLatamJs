
/***  REQUERIMIENTO 1 ***/
// Parte 1
// Estructura de datos para tareas
  class Tarea {
    constructor(id, descripcion, estado, fechaLimite) {
      this.id = id;
      this.descripcion = descripcion;
      this.estado = estado; // pendiente, en progreso, completada
      this.fechaLimite = new Date(fechaLimite);
    }
  }
  // Estructura de datos para proyectos
  class Proyecto {
    constructor(id, nombre, fechaInicio) {
      this.id = id;
      this.nombre = nombre;
      this.fechaInicio = new Date(fechaInicio);
      this.tareas = [];
    }
  
  //Parte 2
    // Añadir nuevas tareas a un proyecto
    agregarTarea(tarea) {
      this.tareas.push(tarea);
    }
  
  //Parte 3
    // Resumen de las tareas por estado
    resumenTareas() {
      const resumen = this.tareas.reduce((acc, tarea) => {
        acc[tarea.estado] = (acc[tarea.estado] || 0) + 1;
        return acc;
      }, {});
      return resumen;
    }
  
  //Parte 4
    // Ordenar tareas por fecha límite
    ordenarTareasPorFecha() {
      return this.tareas.sort((a, b) => a.fechaLimite - b.fechaLimite);
    }

  /***  REQUERIMIENTO 2 ***/
  //Parte 1    
    // Función de orden superior filtrarTareasProyecto
    filtrarTareasProyecto(filtro) {
      return this.tareas.filter(filtro);
    }
  
  //Parte 2
    // Calcular el tiempo restante (días) para completar todas las tareas pendientes
    calcularTiempoRestante() {
      const hoy = new Date();
      return this.tareas
        .filter(tarea => tarea.estado === 'pendiente')
        .reduce((acc, tarea) => acc + Math.ceil((tarea.fechaLimite - hoy) / (1000 * 60 * 60 * 24)), 0);
    }
  
  //Parte 3
    // Obtener tareas críticas (a menos de 3 días de su fecha límite y no completadas)
    obtenerTareasCriticas() {
      const hoy = new Date();
      return this.tareas.filter(tarea =>
        tarea.estado !== 'completada' &&
        (tarea.fechaLimite - hoy) <= (3 * 24 * 60 * 60 * 1000) // Menos de 3 días
      );
    }
  }
  
  /***  REQUERIMIENTO 2 ***/
  //Parte 1
  // Simulación de una llamada asíncrona para cargar detalles del proyecto
  async function cargarDetallesProyecto(proyectoId) {
    // Simulación de retraso en la llamada a la API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: proyectoId,
          nombre: 'Desarrollo de Aplicación Web',
          fechaInicio: '2024-10-01',
          tareas: [
            new Tarea(1, 'Diseñar la interfaz de usuario', 'pendiente', '2024-11-27'),
            new Tarea(2, 'Desarrollar la API', 'en progreso', '2024-12-15'),
            new Tarea(3, 'Pruebas de integración', 'pendiente', '2024-05-11')
          ]
        });
      }, 2000); // 2 segundos de retraso
    });
  }
  
  //Parte 2
  // Simulación de actualización del estado de una tarea
  async function actualizarEstadoTarea(tareaId, nuevoEstado) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) { // 80% de éxito
          resolve(`Tarea ${tareaId} actualizada a estado: ${nuevoEstado}`);
        } else {
          reject(`Error al actualizar la tarea ${tareaId}`);
        }
      }, 1000);
    });
  }

  //Parte3
  // Sistema de notificaciones
  class SistemaNotificaciones {
    constructor() {
      this.listeners = [];
    }
    // Función para suscribirse a las notificaciones
    suscribir(listener) {
      this.listeners.push(listener);
    }
    // Función para notificar cuando una tarea se completa
    notificarTareaCompletada(tarea) {
      this.listeners.forEach(listener => listener(tarea));
    }
  }
  
  /**** Función de ejemplo que usa todo junto al mismo tiempo ****/
  async function ejemplo() {
    // Crear un proyecto y tareas
    const proyecto = new Proyecto(1, 'Desarrollo de Aplicación Web', '2024-10-01');
    const tarea1 = new Tarea(1, 'Diseñar la interfaz de usuario', 'pendiente', '2024-10-10');
    const tarea2 = new Tarea(2, 'Desarrollar la API', 'en progreso', '2024-10-15');
    const tarea3 = new Tarea(3, 'Pruebas de integración', 'pendiente', '2024-10-20');
    
    proyecto.agregarTarea(tarea1);
    proyecto.agregarTarea(tarea2);
    proyecto.agregarTarea(tarea3);
  
    console.log('Resumen de Tareas:', proyecto.resumenTareas()); // { pendiente: 2, 'en progreso': 1 }
    console.log('Tareas ordenadas por fecha límite:', proyecto.ordenarTareasPorFecha());
    
    // Filtrar tareas pendientes
    const tareasPendientes = proyecto.filtrarTareasProyecto(tarea => tarea.estado === 'pendiente');
    console.log('Tareas Pendientes:', tareasPendientes);
    
    // Calcular el tiempo restante para las tareas pendientes
    console.log('Tiempo restante para tareas pendientes:', proyecto.calcularTiempoRestante(), 'días');
    
    // Obtener tareas críticas (menos de 3 días de fecha límite)
    const tareasCriticas = proyecto.obtenerTareasCriticas();
    console.log('Tareas Críticas:', tareasCriticas);
  
    // Simulación de carga de proyecto desde API
    const proyectoCargado = await cargarDetallesProyecto(1);
    console.log('Proyecto Cargado desde API:', proyectoCargado);
  
    // Actualización del estado de una tarea
    try {
      const resultado = await actualizarEstadoTarea(1, 'completada');
      console.log(resultado);
    } catch (error) {
      console.error(error);
    }
  
    // Sistema de notificaciones para tarea completada
    const notificaciones = new SistemaNotificaciones();
    notificaciones.suscribir(tarea => {
      if (tarea.estado === 'completada') {
        console.log(`¡Tarea completada! ${tarea.descripcion}`);
      }
    });
  
    // Simular la finalización de una tarea y notificación
    setTimeout(() => {
      const tareaCompletada = new Tarea(1, 'Diseñar la interfaz de usuario', 'completada', '2024-10-10');
      notificaciones.notificarTareaCompletada(tareaCompletada);
    }, 2000);
  }
  
  ejemplo();
  
/**
 * Modelo de datos para las metas 2026
 * Define la estructura inicial y funciones de cálculo
 */

/**
 * Estado inicial de todas las metas
 */
export const initialGoalsState = {
  // Meta 1: Leer 5 libros
  libros: {
    objetivo: 5,
    lista: [
      // Ejemplo de estructura:
      // { id: 1, titulo: "Libro X", autor: "Autor Y", fechaInicio: "2026-01-01", fechaFin: "2026-02-01", completado: true }
    ]
  },

  // Meta 2: Ahorrar $2,000
  ahorros: {
    objetivo: 2000,
    historial: [
      // Ejemplo de estructura:
      // { id: 1, monto: 200, fecha: "2026-01-31", nota: "Ahorro de enero" }
    ]
  },

  // Meta 3: Invertir $1,000
  inversiones: {
    objetivo: 1000,
    historial: [
      // Ejemplo de estructura:
      // { id: 1, monto: 100, tipo: "Acciones", nombre: "Apple", fecha: "2026-01-15" }
    ]
  },

  // Meta 4: Ejercicio 3 veces por semana (156 sesiones al año)
  ejercicio: {
    objetivo: 156, // 52 semanas * 3 sesiones
    sesiones: [
      // Ejemplo de estructura:
      // { id: 1, fecha: "2026-01-05", tipo: "Cardio", duracion: 30, notas: "Corrí 5km" }
    ]
  },

  // Meta 5: Meal Prep todos los domingos (52 semanas)
  mealPrep: {
    objetivo: 52,
    registros: [
      // Ejemplo de estructura:
      // { id: 1, fecha: "2026-01-05", realizado: true, recetas: "Pollo y arroz", notas: "" }
    ]
  },

  // Meta 6: Journal diario (365 días) - Manejado en journalModel.js
  journal: {
    objetivo: 365,
    // Las entradas se manejan en journalModel.js
    // Aquí solo guardamos el conteo para facilidad
    diasRegistrados: 0
  },

  // Meta 7: Dormir antes de las 00:00 (365 días)
  sueno: {
    objetivo: 365,
    registros: [
      // Ejemplo de estructura:
      // { id: 1, fecha: "2026-01-01", cumplido: true, horaReal: "23:30", notas: "" }
    ]
  }
};

/**
 * Calcula el progreso de una meta
 * @param {number} actual - Valor actual
 * @param {number} objetivo - Valor objetivo
 * @returns {number} - Porcentaje de progreso (0-100)
 */
export const calcularProgreso = (actual, objetivo) => {
  if (objetivo === 0) return 0;
  const porcentaje = (actual / objetivo) * 100;
  return Math.min(Math.round(porcentaje), 100); // Máximo 100%
};

/**
 * Calcula el total de libros completados
 * @param {Array} libros - Lista de libros
 * @returns {number} - Número de libros completados
 */
export const calcularLibrosCompletados = (libros) => {
  return libros.filter(libro => libro.completado).length;
};

/**
 * Calcula el total ahorrado
 * @param {Array} historialAhorros - Historial de ahorros
 * @returns {number} - Total ahorrado
 */
export const calcularTotalAhorrado = (historialAhorros) => {
  return historialAhorros.reduce((total, ahorro) => total + ahorro.monto, 0);
};

/**
 * Calcula el total invertido
 * @param {Array} historialInversiones - Historial de inversiones
 * @returns {number} - Total invertido
 */
export const calcularTotalInvertido = (historialInversiones) => {
  return historialInversiones.reduce((total, inversion) => total + inversion.monto, 0);
};

/**
 * Calcula sesiones de ejercicio realizadas
 * @param {Array} sesiones - Lista de sesiones
 * @returns {number} - Número de sesiones
 */
export const calcularSesionesEjercicio = (sesiones) => {
  return sesiones.length;
};

/**
 * Calcula semanas con meal prep completado
 * @param {Array} registros - Registros de meal prep
 * @returns {number} - Número de semanas cumplidas
 */
export const calcularMealPrepCompletado = (registros) => {
  return registros.filter(registro => registro.realizado).length;
};

/**
 * Calcula días cumpliendo horario de sueño
 * @param {Array} registros - Registros de sueño
 * @returns {number} - Número de días cumplidos
 */
export const calcularDiasSuenoCumplido = (registros) => {
  return registros.filter(registro => registro.cumplido).length;
};

/**
 * Calcula la racha actual de días consecutivos para una meta
 * @param {Array} registros - Array de objetos con propiedad 'fecha'
 * @param {Function} criterio - Función que determina si un registro cuenta (ej: r => r.cumplido)
 * @returns {number} - Días consecutivos
 */
export const calcularRachaActual = (registros, criterio) => {
  if (!registros || registros.length === 0) return 0;

  // Ordenar por fecha descendente
  const ordenados = [...registros]
    .filter(criterio)
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  if (ordenados.length === 0) return 0;

  let racha = 0;
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  for (let i = 0; i < ordenados.length; i++) {
    const fechaRegistro = new Date(ordenados[i].fecha);
    fechaRegistro.setHours(0, 0, 0, 0);

    const diferenciaDias = Math.floor((hoy - fechaRegistro) / (1000 * 60 * 60 * 24));

    if (diferenciaDias === racha) {
      racha++;
    } else {
      break;
    }
  }

  return racha;
};

/**
 * Obtiene resumen completo de todas las metas
 * @param {Object} metas - Estado de las metas
 * @returns {Object} - Objeto con progreso de cada meta
 */
export const obtenerResumenMetas = (metas) => {
  const librosCompletados = calcularLibrosCompletados(metas.libros.lista);
  const totalAhorrado = calcularTotalAhorrado(metas.ahorros.historial);
  const totalInvertido = calcularTotalInvertido(metas.inversiones.historial);
  const sesionesEjercicio = calcularSesionesEjercicio(metas.ejercicio.sesiones);
  const mealPrepCompletado = calcularMealPrepCompletado(metas.mealPrep.registros);
  const diasSueno = calcularDiasSuenoCumplido(metas.sueno.registros);

  return {
    libros: {
      actual: librosCompletados,
      objetivo: metas.libros.objetivo,
      progreso: calcularProgreso(librosCompletados, metas.libros.objetivo)
    },
    ahorros: {
      actual: totalAhorrado,
      objetivo: metas.ahorros.objetivo,
      progreso: calcularProgreso(totalAhorrado, metas.ahorros.objetivo)
    },
    inversiones: {
      actual: totalInvertido,
      objetivo: metas.inversiones.objetivo,
      progreso: calcularProgreso(totalInvertido, metas.inversiones.objetivo)
    },
    ejercicio: {
      actual: sesionesEjercicio,
      objetivo: metas.ejercicio.objetivo,
      progreso: calcularProgreso(sesionesEjercicio, metas.ejercicio.objetivo)
    },
    mealPrep: {
      actual: mealPrepCompletado,
      objetivo: metas.mealPrep.objetivo,
      progreso: calcularProgreso(mealPrepCompletado, metas.mealPrep.objetivo)
    },
    journal: {
      actual: metas.journal.diasRegistrados,
      objetivo: metas.journal.objetivo,
      progreso: calcularProgreso(metas.journal.diasRegistrados, metas.journal.objetivo)
    },
    sueno: {
      actual: diasSueno,
      objetivo: metas.sueno.objetivo,
      progreso: calcularProgreso(diasSueno, metas.sueno.objetivo)
    }
  };
};

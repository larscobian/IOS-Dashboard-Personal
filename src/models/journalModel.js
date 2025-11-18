/**
 * Modelo de datos para el Journal
 * Define la estructura de entradas y funciones auxiliares
 */

/**
 * Estado inicial del journal
 */
export const initialJournalState = {
  entradas: [
    // Ejemplo de estructura:
    // {
    //   id: 1,
    //   fecha: "2026-01-01",
    //   titulo: "Primer día del año",
    //   contenido: "Hoy comenzó mi viaje...",
    //   tags: ["reflexion", "metas"],
    //   createdAt: "2026-01-01T20:30:00",
    //   updatedAt: "2026-01-01T20:30:00"
    // }
  ]
};

/**
 * Crea una nueva entrada de journal
 * @param {string} titulo - Título de la entrada
 * @param {string} contenido - Contenido de la entrada
 * @param {Array<string>} tags - Tags opcionales
 * @returns {Object} - Nueva entrada
 */
export const crearEntrada = (titulo, contenido, tags = []) => {
  const ahora = new Date().toISOString();
  const fecha = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  return {
    id: Date.now(), // ID único basado en timestamp
    fecha,
    titulo,
    contenido,
    tags,
    createdAt: ahora,
    updatedAt: ahora
  };
};

/**
 * Actualiza una entrada existente
 * @param {Object} entrada - Entrada a actualizar
 * @param {Object} cambios - Cambios a aplicar
 * @returns {Object} - Entrada actualizada
 */
export const actualizarEntrada = (entrada, cambios) => {
  return {
    ...entrada,
    ...cambios,
    updatedAt: new Date().toISOString()
  };
};

/**
 * Filtra entradas por rango de fechas
 * @param {Array} entradas - Lista de entradas
 * @param {string} fechaInicio - Fecha de inicio (YYYY-MM-DD)
 * @param {string} fechaFin - Fecha de fin (YYYY-MM-DD)
 * @returns {Array} - Entradas filtradas
 */
export const filtrarPorFechas = (entradas, fechaInicio, fechaFin) => {
  return entradas.filter(entrada => {
    const fecha = new Date(entrada.fecha);
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    return fecha >= inicio && fecha <= fin;
  });
};

/**
 * Filtra entradas por mes
 * @param {Array} entradas - Lista de entradas
 * @param {number} mes - Mes (1-12)
 * @param {number} año - Año
 * @returns {Array} - Entradas del mes
 */
export const filtrarPorMes = (entradas, mes, año) => {
  return entradas.filter(entrada => {
    const fecha = new Date(entrada.fecha);
    return fecha.getMonth() + 1 === mes && fecha.getFullYear() === año;
  });
};

/**
 * Busca entradas por texto
 * @param {Array} entradas - Lista de entradas
 * @param {string} texto - Texto a buscar
 * @returns {Array} - Entradas que contienen el texto
 */
export const buscarEntradas = (entradas, texto) => {
  const textoLower = texto.toLowerCase();
  return entradas.filter(entrada =>
    entrada.titulo.toLowerCase().includes(textoLower) ||
    entrada.contenido.toLowerCase().includes(textoLower)
  );
};

/**
 * Filtra entradas por tag
 * @param {Array} entradas - Lista de entradas
 * @param {string} tag - Tag a buscar
 * @returns {Array} - Entradas con ese tag
 */
export const filtrarPorTag = (entradas, tag) => {
  return entradas.filter(entrada =>
    entrada.tags && entrada.tags.includes(tag)
  );
};

/**
 * Obtiene todas las fechas que tienen entrada
 * @param {Array} entradas - Lista de entradas
 * @returns {Set} - Set de fechas (YYYY-MM-DD)
 */
export const obtenerFechasConEntrada = (entradas) => {
  return new Set(entradas.map(entrada => entrada.fecha));
};

/**
 * Calcula racha actual de días consecutivos con entrada
 * @param {Array} entradas - Lista de entradas
 * @returns {number} - Días consecutivos
 */
export const calcularRachaActual = (entradas) => {
  if (!entradas || entradas.length === 0) return 0;

  const fechasSet = obtenerFechasConEntrada(entradas);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  let racha = 0;
  let fechaActual = new Date(hoy);

  while (true) {
    const fechaStr = fechaActual.toISOString().split('T')[0];

    if (fechasSet.has(fechaStr)) {
      racha++;
      fechaActual.setDate(fechaActual.getDate() - 1);
    } else {
      break;
    }
  }

  return racha;
};

/**
 * Calcula la racha más larga del año
 * @param {Array} entradas - Lista de entradas
 * @returns {number} - Racha más larga
 */
export const calcularRachaMaxima = (entradas) => {
  if (!entradas || entradas.length === 0) return 0;

  const fechas = [...obtenerFechasConEntrada(entradas)]
    .map(f => new Date(f))
    .sort((a, b) => a - b);

  let rachaMaxima = 1;
  let rachaActual = 1;

  for (let i = 1; i < fechas.length; i++) {
    const diferencia = (fechas[i] - fechas[i - 1]) / (1000 * 60 * 60 * 24);

    if (diferencia === 1) {
      rachaActual++;
      rachaMaxima = Math.max(rachaMaxima, rachaActual);
    } else {
      rachaActual = 1;
    }
  }

  return rachaMaxima;
};

/**
 * Obtiene estadísticas del journal
 * @param {Array} entradas - Lista de entradas
 * @returns {Object} - Objeto con estadísticas
 */
export const obtenerEstadisticas = (entradas) => {
  const totalEntradas = entradas.length;
  const rachaActual = calcularRachaActual(entradas);
  const rachaMaxima = calcularRachaMaxima(entradas);

  // Contar entradas por mes
  const entradasPorMes = {};
  entradas.forEach(entrada => {
    const fecha = new Date(entrada.fecha);
    const mes = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
    entradasPorMes[mes] = (entradasPorMes[mes] || 0) + 1;
  });

  // Obtener todos los tags únicos
  const todosLosTags = new Set();
  entradas.forEach(entrada => {
    if (entrada.tags) {
      entrada.tags.forEach(tag => todosLosTags.add(tag));
    }
  });

  return {
    totalEntradas,
    rachaActual,
    rachaMaxima,
    entradasPorMes,
    tagsUnicos: Array.from(todosLosTags),
    progreso: Math.round((totalEntradas / 365) * 100) // Porcentaje del año
  };
};

/**
 * Ordena entradas por fecha (más reciente primero)
 * @param {Array} entradas - Lista de entradas
 * @returns {Array} - Entradas ordenadas
 */
export const ordenarPorFecha = (entradas, descendente = true) => {
  return [...entradas].sort((a, b) => {
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);
    return descendente ? fechaB - fechaA : fechaA - fechaB;
  });
};

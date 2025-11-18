/**
 * Servicio de LocalStorage para Dashboard Personal 2026
 * Maneja toda la persistencia de datos en el navegador
 */

const STORAGE_KEY = 'dashboard-personal-2026';

/**
 * Guarda datos en localStorage
 * @param {Object} data - Objeto con todos los datos a guardar
 * @returns {boolean} - true si se guardó exitosamente
 */
export const saveData = (data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serializedData);
    return true;
  } catch (error) {
    console.error('Error guardando datos en localStorage:', error);
    return false;
  }
};

/**
 * Carga datos desde localStorage
 * @returns {Object|null} - Datos guardados o null si no existen
 */
export const loadData = () => {
  try {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error('Error cargando datos desde localStorage:', error);
    return null;
  }
};

/**
 * Limpia todos los datos del localStorage
 * @returns {boolean} - true si se limpió exitosamente
 */
export const clearData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error limpiando datos de localStorage:', error);
    return false;
  }
};

/**
 * Actualiza una sección específica de los datos
 * @param {string} section - Nombre de la sección (ej: 'libros', 'journal')
 * @param {any} value - Nuevo valor para la sección
 * @returns {boolean} - true si se actualizó exitosamente
 */
export const updateSection = (section, value) => {
  try {
    const currentData = loadData() || {};
    currentData[section] = value;
    return saveData(currentData);
  } catch (error) {
    console.error(`Error actualizando sección ${section}:`, error);
    return false;
  }
};

/**
 * Obtiene una sección específica de los datos
 * @param {string} section - Nombre de la sección
 * @returns {any} - Valor de la sección o undefined
 */
export const getSection = (section) => {
  try {
    const data = loadData();
    return data ? data[section] : undefined;
  } catch (error) {
    console.error(`Error obteniendo sección ${section}:`, error);
    return undefined;
  }
};

/**
 * Exporta todos los datos como JSON descargable
 * @param {string} filename - Nombre del archivo (opcional)
 */
export const exportData = (filename = 'dashboard-backup.json') => {
  try {
    const data = loadData();
    if (!data) {
      console.warn('No hay datos para exportar');
      return false;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Error exportando datos:', error);
    return false;
  }
};

/**
 * Importa datos desde un archivo JSON
 * @param {File} file - Archivo JSON a importar
 * @returns {Promise<boolean>} - Promesa que resuelve true si fue exitoso
 */
export const importData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        const success = saveData(importedData);
        resolve(success);
      } catch (error) {
        console.error('Error importando datos:', error);
        reject(error);
      }
    };

    reader.onerror = (error) => {
      console.error('Error leyendo archivo:', error);
      reject(error);
    };

    reader.readAsText(file);
  });
};

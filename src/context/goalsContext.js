/**
 * Contexto Global para Metas y Journal
 * Maneja el estado completo de la aplicación con persistencia en localStorage
 */

import { createContext, useContext, useReducer, useEffect } from 'react';
import { loadData, saveData } from 'services/localStorage';
import { initialGoalsState, obtenerResumenMetas } from 'models/goalsModel';
import { initialJournalState } from 'models/journalModel';

// Crear contextos
const GoalsContext = createContext();

// Tipos de acciones
const ACTIONS = {
  // Inicialización
  LOAD_DATA: 'LOAD_DATA',
  RESET_DATA: 'RESET_DATA',

  // Libros
  ADD_LIBRO: 'ADD_LIBRO',
  UPDATE_LIBRO: 'UPDATE_LIBRO',
  DELETE_LIBRO: 'DELETE_LIBRO',
  TOGGLE_LIBRO: 'TOGGLE_LIBRO',

  // Ahorros
  ADD_AHORRO: 'ADD_AHORRO',
  DELETE_AHORRO: 'DELETE_AHORRO',

  // Inversiones
  ADD_INVERSION: 'ADD_INVERSION',
  DELETE_INVERSION: 'DELETE_INVERSION',

  // Ejercicio
  ADD_SESION_EJERCICIO: 'ADD_SESION_EJERCICIO',
  DELETE_SESION_EJERCICIO: 'DELETE_SESION_EJERCICIO',

  // Meal Prep
  ADD_MEAL_PREP: 'ADD_MEAL_PREP',
  UPDATE_MEAL_PREP: 'UPDATE_MEAL_PREP',
  DELETE_MEAL_PREP: 'DELETE_MEAL_PREP',

  // Sueño
  ADD_REGISTRO_SUENO: 'ADD_REGISTRO_SUENO',
  UPDATE_REGISTRO_SUENO: 'UPDATE_REGISTRO_SUENO',
  DELETE_REGISTRO_SUENO: 'DELETE_REGISTRO_SUENO',

  // Journal
  ADD_JOURNAL_ENTRY: 'ADD_JOURNAL_ENTRY',
  UPDATE_JOURNAL_ENTRY: 'UPDATE_JOURNAL_ENTRY',
  DELETE_JOURNAL_ENTRY: 'DELETE_JOURNAL_ENTRY',
};

// Estado inicial
const initialState = {
  metas: initialGoalsState,
  journal: initialJournalState,
  loaded: false
};

// Reducer
const goalsReducer = (state, action) => {
  let newState = { ...state };

  switch (action.type) {
    case ACTIONS.LOAD_DATA:
      return {
        ...state,
        ...action.payload,
        loaded: true
      };

    case ACTIONS.RESET_DATA:
      return {
        metas: initialGoalsState,
        journal: initialJournalState,
        loaded: true
      };

    // === LIBROS ===
    case ACTIONS.ADD_LIBRO:
      newState = {
        ...state,
        metas: {
          ...state.metas,
          libros: {
            ...state.metas.libros,
            lista: [...state.metas.libros.lista, action.payload]
          }
        }
      };
      break;

    case ACTIONS.UPDATE_LIBRO:
      newState = {
        ...state,
        metas: {
          ...state.metas,
          libros: {
            ...state.metas.libros,
            lista: state.metas.libros.lista.map(libro =>
              libro.id === action.payload.id ? action.payload : libro
            )
          }
        }
      };
      break;

    case ACTIONS.DELETE_LIBRO:
      newState = {
        ...state,
        metas: {
          ...state.metas,
          libros: {
            ...state.metas.libros,
            lista: state.metas.libros.lista.filter(libro => libro.id !== action.payload)
          }
        }
      };
      break;

    case ACTIONS.TOGGLE_LIBRO:
      newState = {
        ...state,
        metas: {
          ...state.metas,
          libros: {
            ...state.metas.libros,
            lista: state.metas.libros.lista.map(libro =>
              libro.id === action.payload
                ? { ...libro, completado: !libro.completado }
                : libro
            )
          }
        }
      };
      break;

    // === AHORROS ===
    case ACTIONS.ADD_AHORRO:
      newState = {
        ...state,
        metas: {
          ...state.metas,
          ahorros: {
            ...state.metas.ahorros,
            historial: [...state.metas.ahorros.historial, action.payload]
          }
        }
      };
      break;

    case ACTIONS.DELETE_AHORRO:
      newState = {
        ...state,
        metas: {
          ...state.metas,
          ahorros: {
            ...state.metas.ahorros,
            historial: state.metas.ahorros.historial.filter(a => a.id !== action.payload)
          }
        }
      };
      break;

    // === INVERSIONES ===
    case ACTIONS.ADD_INVERSION:
      newState = {
        ...state,
        metas: {
          ...state.metas,
          inversiones: {
            ...state.metas.inversiones,
            historial: [...state.metas.inversiones.historial, action.payload]
          }
        }
      };
      break;

    case ACTIONS.DELETE_INVERSION:
      newState = {
        ...state,
        metas: {
          ...state.metas,
          inversiones: {
            ...state.metas.inversiones,
            historial: state.metas.inversiones.historial.filter(i => i.id !== action.payload)
          }
        }
      };
      break;

    // === EJERCICIO ===
    case ACTIONS.ADD_SESION_EJERCICIO:
      newState = {
        ...state,
        metas: {
          ...state.metas,
          ejercicio: {
            ...state.metas.ejercicio,
            sesiones: [...state.metas.ejercicio.sesiones, action.payload]
          }
        }
      };
      break;

    case ACTIONS.DELETE_SESION_EJERCICIO:
      newState = {
        ...state,
        metas: {
          ...state.metas,
          ejercicio: {
            ...state.metas.ejercicio,
            sesiones: state.metas.ejercicio.sesiones.filter(s => s.id !== action.payload)
          }
        }
      };
      break;

    // === MEAL PREP ===
    case ACTIONS.ADD_MEAL_PREP:
      newState = {
        ...state,
        metas: {
          ...state.metas,
          mealPrep: {
            ...state.metas.mealPrep,
            registros: [...state.metas.mealPrep.registros, action.payload]
          }
        }
      };
      break;

    case ACTIONS.UPDATE_MEAL_PREP:
      newState = {
        ...state,
        metas: {
          ...state.metas,
          mealPrep: {
            ...state.metas.mealPrep,
            registros: state.metas.mealPrep.registros.map(r =>
              r.id === action.payload.id ? action.payload : r
            )
          }
        }
      };
      break;

    case ACTIONS.DELETE_MEAL_PREP:
      newState = {
        ...state,
        metas: {
          ...state.metas,
          mealPrep: {
            ...state.metas.mealPrep,
            registros: state.metas.mealPrep.registros.filter(r => r.id !== action.payload)
          }
        }
      };
      break;

    // === SUEÑO ===
    case ACTIONS.ADD_REGISTRO_SUENO:
      newState = {
        ...state,
        metas: {
          ...state.metas,
          sueno: {
            ...state.metas.sueno,
            registros: [...state.metas.sueno.registros, action.payload]
          }
        }
      };
      break;

    case ACTIONS.UPDATE_REGISTRO_SUENO:
      newState = {
        ...state,
        metas: {
          ...state.metas,
          sueno: {
            ...state.metas.sueno,
            registros: state.metas.sueno.registros.map(r =>
              r.id === action.payload.id ? action.payload : r
            )
          }
        }
      };
      break;

    case ACTIONS.DELETE_REGISTRO_SUENO:
      newState = {
        ...state,
        metas: {
          ...state.metas,
          sueno: {
            ...state.metas.sueno,
            registros: state.metas.sueno.registros.filter(r => r.id !== action.payload)
          }
        }
      };
      break;

    // === JOURNAL ===
    case ACTIONS.ADD_JOURNAL_ENTRY:
      newState = {
        ...state,
        journal: {
          entradas: [...state.journal.entradas, action.payload]
        },
        metas: {
          ...state.metas,
          journal: {
            ...state.metas.journal,
            diasRegistrados: state.journal.entradas.length + 1
          }
        }
      };
      break;

    case ACTIONS.UPDATE_JOURNAL_ENTRY:
      newState = {
        ...state,
        journal: {
          entradas: state.journal.entradas.map(entrada =>
            entrada.id === action.payload.id ? action.payload : entrada
          )
        }
      };
      break;

    case ACTIONS.DELETE_JOURNAL_ENTRY:
      newState = {
        ...state,
        journal: {
          entradas: state.journal.entradas.filter(entrada => entrada.id !== action.payload)
        },
        metas: {
          ...state.metas,
          journal: {
            ...state.metas.journal,
            diasRegistrados: Math.max(0, state.journal.entradas.length - 1)
          }
        }
      };
      break;

    default:
      return state;
  }

  // Actualizar contador de journal
  if (newState !== state && newState.journal) {
    newState.metas.journal.diasRegistrados = newState.journal.entradas.length;
  }

  return newState;
};

// Provider Component
export const GoalsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(goalsReducer, initialState);

  // Cargar datos al iniciar
  useEffect(() => {
    const savedData = loadData();
    if (savedData) {
      dispatch({ type: ACTIONS.LOAD_DATA, payload: savedData });
    } else {
      dispatch({ type: ACTIONS.LOAD_DATA, payload: initialState });
    }
  }, []);

  // Guardar datos cuando cambie el estado (después de cargar)
  useEffect(() => {
    if (state.loaded) {
      saveData({
        metas: state.metas,
        journal: state.journal
      });
    }
  }, [state]);

  return (
    <GoalsContext.Provider value={{ state, dispatch, ACTIONS }}>
      {children}
    </GoalsContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (!context) {
    throw new Error('useGoals debe ser usado dentro de un GoalsProvider');
  }

  const { state, dispatch, ACTIONS } = context;

  // Funciones helper para facilitar el uso
  const helpers = {
    // Obtener resumen de todas las metas
    getResumen: () => obtenerResumenMetas(state.metas),

    // Libros
    addLibro: (libro) => dispatch({ type: ACTIONS.ADD_LIBRO, payload: libro }),
    updateLibro: (libro) => dispatch({ type: ACTIONS.UPDATE_LIBRO, payload: libro }),
    deleteLibro: (id) => dispatch({ type: ACTIONS.DELETE_LIBRO, payload: id }),
    toggleLibro: (id) => dispatch({ type: ACTIONS.TOGGLE_LIBRO, payload: id }),

    // Ahorros
    addAhorro: (ahorro) => dispatch({ type: ACTIONS.ADD_AHORRO, payload: ahorro }),
    deleteAhorro: (id) => dispatch({ type: ACTIONS.DELETE_AHORRO, payload: id }),

    // Inversiones
    addInversion: (inversion) => dispatch({ type: ACTIONS.ADD_INVERSION, payload: inversion }),
    deleteInversion: (id) => dispatch({ type: ACTIONS.DELETE_INVERSION, payload: id }),

    // Ejercicio
    addSesionEjercicio: (sesion) => dispatch({ type: ACTIONS.ADD_SESION_EJERCICIO, payload: sesion }),
    deleteSesionEjercicio: (id) => dispatch({ type: ACTIONS.DELETE_SESION_EJERCICIO, payload: id }),

    // Meal Prep
    addMealPrep: (registro) => dispatch({ type: ACTIONS.ADD_MEAL_PREP, payload: registro }),
    updateMealPrep: (registro) => dispatch({ type: ACTIONS.UPDATE_MEAL_PREP, payload: registro }),
    deleteMealPrep: (id) => dispatch({ type: ACTIONS.DELETE_MEAL_PREP, payload: id }),

    // Sueño
    addRegistroSueno: (registro) => dispatch({ type: ACTIONS.ADD_REGISTRO_SUENO, payload: registro }),
    updateRegistroSueno: (registro) => dispatch({ type: ACTIONS.UPDATE_REGISTRO_SUENO, payload: registro }),
    deleteRegistroSueno: (id) => dispatch({ type: ACTIONS.DELETE_REGISTRO_SUENO, payload: id }),

    // Journal
    addJournalEntry: (entrada) => dispatch({ type: ACTIONS.ADD_JOURNAL_ENTRY, payload: entrada }),
    updateJournalEntry: (entrada) => dispatch({ type: ACTIONS.UPDATE_JOURNAL_ENTRY, payload: entrada }),
    deleteJournalEntry: (id) => dispatch({ type: ACTIONS.DELETE_JOURNAL_ENTRY, payload: id }),

    // Reset
    resetAllData: () => dispatch({ type: ACTIONS.RESET_DATA })
  };

  return {
    ...state,
    ...helpers
  };
};

export default GoalsContext;

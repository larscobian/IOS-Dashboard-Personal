# Roadmap - Dashboard Personal 2026

Este archivo documenta el plan de desarrollo y los próximos pasos para implementar todas las funcionalidades del dashboard.

## Estado Actual del Proyecto

### ✅ Completado
- [x] Proyecto base duplicado desde Vision UI Dashboard
- [x] Estructura de carpetas creada
- [x] Rutas configuradas (`/dashboard`, `/metas`, `/journal`)
- [x] Layout de Metas con las 7 tarjetas visuales (estáticas)
- [x] Layout de Journal con formulario de entrada (no funcional)
- [x] Dashboard principal personalizado
- [x] Repositorio en GitHub: https://github.com/larscobian/IOS-Dashboard-Personal
- [x] Dependencias instaladas (npm install completado)

### 🚧 En Progreso
- [ ] Ninguna tarea en progreso actualmente

### 📋 Por Hacer

---

## Fase 1: Persistencia de Datos (Fundación)

**Objetivo:** Permitir que los datos persistan entre sesiones usando localStorage.

### 1.1 Sistema de Almacenamiento
- [ ] Crear `src/services/localStorage.js`
  - Funciones: `saveData()`, `loadData()`, `clearData()`
  - Estructura de datos en JSON
  - Manejo de errores y validación

### 1.2 Contexto Global para Datos
- [ ] Extender `src/context/index.js` o crear `src/context/goalsContext.js`
  - Estado para las 7 metas
  - Estado para entradas de journal
  - Acciones para actualizar datos
  - Hooks personalizados: `useGoals()`, `useJournal()`

### 1.3 Modelos de Datos
- [ ] Crear `src/models/goalsModel.js`
  ```javascript
  {
    libros: { actual: 0, objetivo: 5, lista: [] },
    ahorros: { actual: 0, objetivo: 2000, historial: [] },
    // ... etc
  }
  ```
- [ ] Crear `src/models/journalModel.js`
  ```javascript
  {
    entradas: [
      { id, fecha, titulo, contenido, tags }
    ]
  }
  ```

**Archivos a crear:**
- `src/services/localStorage.js`
- `src/context/goalsContext.js`
- `src/models/goalsModel.js`
- `src/models/journalModel.js`

---

## Fase 2: Funcionalidad de Metas

**Objetivo:** Hacer que las metas sean editables y calculen progreso automáticamente.

### 2.1 Componentes Reutilizables
- [ ] `src/layouts/metas/components/GoalCard.js`
  - Componente base para cualquier meta
  - Props: título, valor actual, objetivo, icono, color
  - Cálculo automático de porcentaje

### 2.2 Meta 1: Libros (5 libros)
- [ ] `src/layouts/metas/components/BooksTracker.js`
  - Lista de libros con checkbox
  - Botón para agregar libro
  - Modal/formulario con: título, autor, estado (leyendo/completado)
  - Barra de progreso: libros completados / 5

### 2.3 Meta 2: Ahorros ($2,000)
- [ ] `src/layouts/metas/components/SavingsTracker.js`
  - Input para agregar cantidad ahorrada
  - Historial de depósitos con fecha
  - Gráfico de línea mostrando progreso mensual
  - Proyección: "A este ritmo alcanzarás la meta en [fecha]"

### 2.4 Meta 3: Inversiones ($1,000)
- [ ] `src/layouts/metas/components/InvestmentTracker.js`
  - Similar a SavingsTracker
  - Opción de categorizar (acciones, crypto, fondos, etc.)
  - Desglose visual por categoría

### 2.5 Meta 4: Ejercicio (3x/semana = 156 sesiones)
- [ ] `src/layouts/metas/components/ExerciseTracker.js`
  - Calendario semanal interactivo
  - Botón rápido "Registrar sesión de hoy"
  - Vista mensual con días marcados
  - Contador: sesiones esta semana / 3
  - Racha actual de semanas cumplidas

### 2.6 Meta 5: Meal Prep (52 domingos)
- [ ] `src/layouts/metas/components/MealPrepTracker.js`
  - Checkbox semanal: "¿Hiciste meal prep este domingo?"
  - Calendario mostrando domingos completados
  - Opción para notas/recetas de la semana

### 2.7 Meta 6: Journal (365 días)
- [ ] Integrar con sistema de journal (Fase 3)
- [ ] Mostrar estadísticas en la tarjeta de meta

### 2.8 Meta 7: Sueño (dormir antes 00:00)
- [ ] `src/layouts/metas/components/SleepTracker.js`
  - Registro diario de hora de dormir
  - Vista de calendario mensual (verde = antes 00:00, rojo = después)
  - Racha actual de días cumpliendo
  - Promedio de la semana/mes

**Archivos a crear:**
- `src/layouts/metas/components/GoalCard.js`
- `src/layouts/metas/components/BooksTracker.js`
- `src/layouts/metas/components/SavingsTracker.js`
- `src/layouts/metas/components/InvestmentTracker.js`
- `src/layouts/metas/components/ExerciseTracker.js`
- `src/layouts/metas/components/MealPrepTracker.js`
- `src/layouts/metas/components/SleepTracker.js`

---

## Fase 3: Sistema de Journal Funcional

**Objetivo:** Permitir escribir, guardar y consultar entradas diarias.

### 3.1 Formulario de Entrada
- [ ] `src/layouts/journal/components/JournalEntry.js`
  - Conectar con contexto global
  - Guardar entrada al hacer clic en "Guardar"
  - Validación: título no vacío
  - Limpiar formulario después de guardar

### 3.2 Lista de Entradas
- [ ] `src/layouts/journal/components/EntryCard.js`
  - Mostrar entrada con fecha formateada
  - Botón "Ver completo" → Modal o página de detalle
  - Botón "Editar" y "Eliminar"

### 3.3 Calendario Visual
- [ ] `src/layouts/journal/components/Calendar2026.js`
  - Calendario anual estilo GitHub
  - Días con entrada: verde
  - Días sin entrada: gris
  - Click en día → ver entrada o crear nueva

### 3.4 Estadísticas
- [ ] `src/layouts/journal/components/StreakCounter.js`
  - Racha actual de días consecutivos
  - Racha más larga del año
  - Total de días registrados / 365

### 3.5 Búsqueda y Filtros
- [ ] Buscar por texto
- [ ] Filtrar por mes
- [ ] Tags/categorías opcionales

**Archivos a crear:**
- `src/layouts/journal/components/JournalEntry.js` (actualizar)
- `src/layouts/journal/components/EntryCard.js`
- `src/layouts/journal/components/Calendar2026.js`
- `src/layouts/journal/components/StreakCounter.js`
- `src/layouts/journal/components/EntryFilters.js`

---

## Fase 4: Dashboard Principal Integrado

**Objetivo:** Mostrar resumen real de todas las metas.

### 4.1 Resumen de Metas
- [ ] `src/layouts/dashboard/components/GoalsSummary.js`
  - Tarjeta por cada meta con mini-progreso
  - Click → navegar a página de meta específica

### 4.2 Progreso Semanal
- [ ] `src/layouts/dashboard/components/WeeklyProgress.js`
  - Ejercicio: sesiones esta semana
  - Journal: días registrados esta semana
  - Sueño: noches antes de 00:00

### 4.3 Progreso Mensual
- [ ] `src/layouts/dashboard/components/MonthlyStats.js`
  - Gráfico de barras: progreso de cada meta
  - Comparación con mes anterior

### 4.4 Acciones Rápidas
- [ ] `src/layouts/dashboard/components/QuickActions.js`
  - Botón "Registrar ejercicio hoy"
  - Botón "Nueva entrada de journal"
  - Botón "Registrar hora de sueño"

### 4.5 Actualizar Tarjetas Principales
- [ ] Conectar tarjetas de stats con datos reales:
  - "Progreso General" → cálculo basado en 7 metas
  - "Metas Completadas" → contar metas al 100%
  - "Días Registrados" → desde journal
  - "Racha Actual" → mayor racha entre metas

**Archivos a crear:**
- `src/layouts/dashboard/components/GoalsSummary.js`
- `src/layouts/dashboard/components/WeeklyProgress.js`
- `src/layouts/dashboard/components/MonthlyStats.js`
- `src/layouts/dashboard/components/QuickActions.js`

---

## Fase 5: Funcionalidades Avanzadas

### 5.1 Calendario Completo (nueva página)
- [ ] Crear `src/layouts/calendario/`
- [ ] Vista mensual/anual
- [ ] Marcar eventos importantes
- [ ] Integración con metas (ejercicio, meal prep, etc.)

### 5.2 Página de Ejercicio Detallada
- [ ] Crear `src/layouts/ejercicio/`
- [ ] Tipos de ejercicio (cardio, fuerza, flexibilidad)
- [ ] Duración y notas por sesión
- [ ] Gráficos de progreso

### 5.3 Página de Meal Prep
- [ ] Crear `src/layouts/meal-prep/`
- [ ] Planificador semanal
- [ ] Recetas guardadas
- [ ] Lista de compras

### 5.4 Estadísticas Generales
- [ ] Crear `src/layouts/estadisticas/`
- [ ] Gráficos comparativos de todas las metas
- [ ] Exportar datos a CSV/JSON
- [ ] Comparación trimestral

**Archivos a crear:**
- `src/layouts/calendario/index.js`
- `src/layouts/ejercicio/index.js`
- `src/layouts/meal-prep/index.js`
- `src/layouts/estadisticas/index.js`

---

## Fase 6: Mejoras y Pulido

### 6.1 Experiencia de Usuario
- [ ] Animaciones de transición
- [ ] Notificaciones/toasts al guardar
- [ ] Temas personalizables (oscuro/claro)
- [ ] Responsive design mejorado para móvil

### 6.2 Exportación de Datos
- [ ] Botón "Exportar todos mis datos"
- [ ] Backup automático semanal
- [ ] Importar datos desde archivo

### 6.3 Optimización
- [ ] Code splitting por ruta
- [ ] Lazy loading de componentes pesados
- [ ] Optimizar imágenes y assets

---

## Orden Sugerido de Implementación

**Para empezar en la próxima sesión:**

1. **Primero:** Crear sistema de localStorage (`src/services/localStorage.js`)
2. **Segundo:** Crear contexto de metas (`src/context/goalsContext.js`)
3. **Tercero:** Implementar BooksTracker (es la meta más simple)
4. **Cuarto:** Hacer funcional el Journal
5. **Quinto:** Actualizar Dashboard con datos reales
6. Continuar con las demás metas una por una

---

## Comandos Útiles para Iterar

```bash
# Crear nuevo componente
# Ejemplo: "Crea BooksTracker.js"

# Conectar componente con datos
# Ejemplo: "Conecta BooksTracker con goalsContext"

# Agregar funcionalidad
# Ejemplo: "Agrega persistencia de datos para libros"

# Actualizar vista
# Ejemplo: "Actualiza la página de Metas para usar datos reales"
```

---

## Notas de Desarrollo

- Todos los datos se guardan en localStorage (key: `dashboard-personal-2026`)
- Usar `useGoals()` y `useJournal()` hooks para acceder a datos
- Mantener componentes pequeños y reutilizables
- Seguir convención de nombres en español para este proyecto
- No olvidar hacer commits frecuentes al repositorio

---

## Links Importantes

- **Repositorio:** https://github.com/larscobian/IOS-Dashboard-Personal
- **Documentación Vision UI:** https://www.creative-tim.com/learning-lab/react/overview/vision-ui-dashboard/
- **ApexCharts Docs:** https://apexcharts.com/docs/react-charts/

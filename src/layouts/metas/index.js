// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

// React icons
import { IoBookSharp } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoTrendingUp } from "react-icons/io5";
import { IoFitness } from "react-icons/io5";
import { IoRestaurant } from "react-icons/io5";
import { IoJournal } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";

// Vision UI Components
import VuiButton from "components/VuiButton";

// Context
import { useGoals } from "context/goalsContext";

// Components
import BooksTracker from "./components/BooksTracker";
import SavingsTracker from "./components/SavingsTracker";
import InvestmentTracker from "./components/InvestmentTracker";
import ExerciseTracker from "./components/ExerciseTracker";
import MealPrepTracker from "./components/MealPrepTracker";
import SleepTracker from "./components/SleepTracker";

function Metas() {
  // Obtener datos reales desde el contexto y funciones helper
  const {
    getResumen,
    addLibro,
    addAhorro,
    addInversion,
    addSesionEjercicio,
    addMealPrep,
    addRegistroSueno
  } = useGoals();

  const metas = getResumen();

  // Función de prueba para agregar datos de ejemplo
  const agregarDatosDeEjemplo = () => {
    // Agregar 2 libros de ejemplo
    addLibro({
      id: Date.now(),
      titulo: "Hábitos Atómicos",
      autor: "James Clear",
      fechaInicio: "2026-01-01",
      fechaFin: "2026-01-20",
      completado: true
    });

    addLibro({
      id: Date.now() + 1,
      titulo: "El Poder del Ahora",
      autor: "Eckhart Tolle",
      fechaInicio: "2026-01-21",
      fechaFin: null,
      completado: false
    });

    // Agregar ahorros
    addAhorro({
      id: Date.now() + 2,
      monto: 500,
      fecha: "2026-01-31",
      nota: "Ahorro de enero"
    });

    // Agregar inversión
    addInversion({
      id: Date.now() + 3,
      monto: 250,
      tipo: "Acciones",
      nombre: "Apple Inc.",
      fecha: "2026-01-15"
    });

    // Agregar sesiones de ejercicio
    addSesionEjercicio({
      id: Date.now() + 4,
      fecha: "2026-01-05",
      tipo: "Cardio",
      duracion: 30,
      notas: "Corrí 5km"
    });

    addSesionEjercicio({
      id: Date.now() + 5,
      fecha: "2026-01-07",
      tipo: "Pesas",
      duracion: 45,
      notas: "Rutina de brazos"
    });

    // Agregar meal prep
    addMealPrep({
      id: Date.now() + 6,
      fecha: "2026-01-05",
      realizado: true,
      recetas: "Pollo al horno con verduras",
      notas: "Meal prep de la semana 1"
    });

    // Agregar registros de sueño
    addRegistroSueno({
      id: Date.now() + 7,
      fecha: "2026-01-01",
      cumplido: true,
      horaReal: "23:30",
      notas: ""
    });

    addRegistroSueno({
      id: Date.now() + 8,
      fecha: "2026-01-02",
      cumplido: true,
      horaReal: "23:45",
      notas: ""
    });

    alert("Datos de ejemplo agregados! Recarga la página para ver los cambios.");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3} display="flex" justifyContent="space-between" alignItems="center">
          <VuiTypography variant="h3" color="white" fontWeight="bold">
            Mis Metas 2026
          </VuiTypography>
          <VuiButton variant="contained" color="success" onClick={agregarDatosDeEjemplo}>
            <IoAdd size="18px" style={{ marginRight: "8px" }} />
            Agregar Datos de Ejemplo
          </VuiButton>
        </VuiBox>

        {/* Tarjetas resumen de metas */}
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Libros Leídos", fontWeight: "regular" }}
                count={`${metas.libros.actual}/${metas.libros.objetivo}`}
                percentage={{ color: "info", text: `${metas.libros.progreso}%` }}
                icon={{ color: "info", component: <IoBookSharp size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Ahorros", fontWeight: "regular" }}
                count={`$${metas.ahorros.actual}/$${metas.ahorros.objetivo}`}
                percentage={{ color: "success", text: `${metas.ahorros.progreso}%` }}
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Inversiones", fontWeight: "regular" }}
                count={`$${metas.inversiones.actual}/$${metas.inversiones.objetivo}`}
                percentage={{ color: "success", text: `${metas.inversiones.progreso}%` }}
                icon={{ color: "info", component: <IoTrendingUp size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Sesiones de Ejercicio", fontWeight: "regular" }}
                count={`${metas.ejercicio.actual}/${metas.ejercicio.objetivo}`}
                percentage={{ color: "warning", text: `${metas.ejercicio.progreso}%` }}
                icon={{ color: "info", component: <IoFitness size="22px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox>

        {/* Detalles de metas */}
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            {/* Meta 1: Leer 5 libros - COMPONENTE COMPLETO */}
            <Grid item xs={12} md={6}>
              <BooksTracker />
            </Grid>

            {/* Meta 2: Ahorrar $2,000 - COMPONENTE COMPLETO */}
            <Grid item xs={12} md={6}>
              <SavingsTracker />
            </Grid>

            {/* Meta 3: Invertir $1,000 - COMPONENTE COMPLETO */}
            <Grid item xs={12} md={6}>
              <InvestmentTracker />
            </Grid>

            {/* Meta 4: Ejercicio 3 veces por semana - COMPONENTE COMPLETO */}
            <Grid item xs={12} md={6}>
              <ExerciseTracker />
            </Grid>

            {/* Meta 5: Meal Prep domingos - COMPONENTE COMPLETO */}
            <Grid item xs={12} md={6}>
              <MealPrepTracker />
            </Grid>

            {/* Meta 6: Registro diario (Journal) */}
            <Grid item xs={12} md={6}>
              <Card>
                <VuiBox p={3}>
                  <VuiBox display="flex" alignItems="center" mb={2}>
                    <VuiBox
                      bgColor="info"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ borderRadius: "12px", width: "48px", height: "48px" }}
                      mr={2}
                    >
                      <IoJournal color="#fff" size="24px" />
                    </VuiBox>
                    <VuiTypography variant="h5" color="white" fontWeight="bold">
                      Registro Diario
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox mb={2}>
                    <VuiTypography variant="button" color="text" fontWeight="regular">
                      Progreso: {metas.journal.actual} de {metas.journal.objetivo} días
                    </VuiTypography>
                  </VuiBox>
                  <VuiProgress value={metas.journal.progreso} color="info" />
                  <VuiBox mt={2}>
                    <VuiTypography variant="caption" color="text">
                      Ver entradas en la sección Journal
                    </VuiTypography>
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>

            {/* Meta 7: Dormir antes de las 00:00 - COMPONENTE COMPLETO */}
            <Grid item xs={12} md={6}>
              <SleepTracker />
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Metas;

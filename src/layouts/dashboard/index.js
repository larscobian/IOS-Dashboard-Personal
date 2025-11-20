/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import Grid from "@mui/material/Grid";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

// Dashboard layout components
import BTCChart from "layouts/dashboard/components/BTCChart";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import PendientesAhora from "layouts/dashboard/components/PendientesAhora";
import PendientesFuturos from "layouts/dashboard/components/PendientesFuturos";
import JournalCalendar from "layouts/dashboard/components/JournalCalendar";
import TimerCards from "layouts/dashboard/components/TimerCards";

// React icons
import { IoIosRocket } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { IoFitness } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";

// Context
import { useGoals } from "context/goalsContext";

function Dashboard() {
  // Obtener datos reales
  const { getResumen, journal } = useGoals();
  const resumen = getResumen();

  // Calcular progreso general (promedio de todas las metas)
  const progresoGeneral = Math.round(
    (resumen.libros.progreso +
      resumen.ahorros.progreso +
      resumen.inversiones.progreso +
      resumen.ejercicio.progreso +
      resumen.mealPrep.progreso +
      resumen.journal.progreso +
      resumen.sueno.progreso) / 7
  );

  // Sesiones de ejercicio completadas
  const sesionesEjercicio = resumen.ejercicio.actual;

  // Días registrados en journal
  const diasJournal = journal.entradas?.length || 0;

  // Calcular días transcurridos y restantes del año
  const calcularDiasDelAnio = () => {
    const ahora = new Date();
    const inicioAnio2026 = new Date('2026-01-01');
    const unDia = 24 * 60 * 60 * 1000; // milisegundos en un día

    const diferenciaDias = Math.floor((inicioAnio2026 - ahora) / unDia);
    return diferenciaDias;
  };

  const diasRestantes = calcularDiasDelAnio();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Progreso General", fontWeight: "regular" }}
                count={`${progresoGeneral}%`}
                percentage={{ color: "info", text: "Año 2026" }}
                icon={{ color: "info", component: <IoIosRocket size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Sesiones de Ejercicio" }}
                count={`${sesionesEjercicio}/156`}
                percentage={{ color: "success", text: sesionesEjercicio > 0 ? "¡Sigue así!" : "Comienza hoy" }}
                icon={{ color: "info", component: <IoFitness size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Días Registrados" }}
                count={`${diasJournal}/365`}
                percentage={{ color: "warning", text: "Journaling" }}
                icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Días del Año" }}
                count={diasRestantes < 0 ? `Día ${Math.abs(diasRestantes)}` : `${diasRestantes} días`}
                percentage={{
                  color: diasRestantes < 0 ? "success" : "warning",
                  text: diasRestantes < 0 ? "¡Estamos en 2026!" : "Para 2026"
                }}
                icon={{ color: "info", component: <IoCalendarOutline size="20px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={12} xl={5}>
              <BTCChart />
            </Grid>
            <Grid item xs={12} lg={6} xl={3}>
              <PendientesAhora />
            </Grid>
            <Grid item xs={12} lg={6} xl={4}>
              <PendientesFuturos />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={7}>
              <JournalCalendar />
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
              <TimerCards />
            </Grid>
          </Grid>
        </VuiBox>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;

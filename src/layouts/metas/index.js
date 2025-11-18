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

function Metas() {
  // Datos de las metas 2026
  const metas = {
    libros: { actual: 0, objetivo: 5, progreso: 0 },
    ahorros: { actual: 0, objetivo: 2000, progreso: 0 },
    inversiones: { actual: 0, objetivo: 1000, progreso: 0 },
    ejercicio: {
      semanas: 0,
      objetivo: 52 * 3, // 3 veces por semana * 52 semanas
      progreso: 0
    },
    comidas: { semanas: 0, objetivo: 52, progreso: 0 },
    journal: { dias: 0, objetivo: 365, progreso: 0 },
    sueno: { diasCumplidos: 0, objetivo: 365, progreso: 0 }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <VuiTypography variant="h3" color="white" fontWeight="bold" mb="20px">
            Mis Metas 2026
          </VuiTypography>
        </VuiBox>

        {/* Tarjetas resumen de metas */}
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Libros Leídos", fontWeight: "regular" }}
                count={`${metas.libros.actual}/${metas.libros.objetivo}`}
                percentage={{ color: "info", text: "0%" }}
                icon={{ color: "info", component: <IoBookSharp size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Ahorros", fontWeight: "regular" }}
                count={`$${metas.ahorros.actual}/$${metas.ahorros.objetivo}`}
                percentage={{ color: "success", text: "0%" }}
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Inversiones", fontWeight: "regular" }}
                count={`$${metas.inversiones.actual}/$${metas.inversiones.objetivo}`}
                percentage={{ color: "success", text: "0%" }}
                icon={{ color: "info", component: <IoTrendingUp size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Sesiones de Ejercicio", fontWeight: "regular" }}
                count={`${metas.ejercicio.semanas}/${metas.ejercicio.objetivo}`}
                percentage={{ color: "warning", text: "3x/semana" }}
                icon={{ color: "info", component: <IoFitness size="22px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox>

        {/* Detalles de metas */}
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            {/* Meta 1: Leer 5 libros */}
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
                      <IoBookSharp color="#fff" size="24px" />
                    </VuiBox>
                    <VuiTypography variant="h5" color="white" fontWeight="bold">
                      Leer 5 Libros
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox mb={2}>
                    <VuiTypography variant="button" color="text" fontWeight="regular">
                      Progreso: {metas.libros.actual} de {metas.libros.objetivo} libros
                    </VuiTypography>
                  </VuiBox>
                  <VuiProgress value={metas.libros.progreso} color="info" />
                  <VuiBox mt={2}>
                    <VuiTypography variant="caption" color="text">
                      Lista de libros: (Pendiente de agregar)
                    </VuiTypography>
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>

            {/* Meta 2: Ahorrar $2,000 */}
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
                      <IoWallet color="#fff" size="24px" />
                    </VuiBox>
                    <VuiTypography variant="h5" color="white" fontWeight="bold">
                      Ahorrar $2,000
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox mb={2}>
                    <VuiTypography variant="button" color="text" fontWeight="regular">
                      Progreso: ${metas.ahorros.actual} de ${metas.ahorros.objetivo}
                    </VuiTypography>
                  </VuiBox>
                  <VuiProgress value={metas.ahorros.progreso} color="success" />
                  <VuiBox mt={2}>
                    <VuiTypography variant="caption" color="text">
                      Seguimiento mensual: (Pendiente de implementar)
                    </VuiTypography>
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>

            {/* Meta 3: Invertir $1,000 */}
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
                      <IoTrendingUp color="#fff" size="24px" />
                    </VuiBox>
                    <VuiTypography variant="h5" color="white" fontWeight="bold">
                      Invertir $1,000
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox mb={2}>
                    <VuiTypography variant="button" color="text" fontWeight="regular">
                      Progreso: ${metas.inversiones.actual} de ${metas.inversiones.objetivo}
                    </VuiTypography>
                  </VuiBox>
                  <VuiProgress value={metas.inversiones.progreso} color="success" />
                  <VuiBox mt={2}>
                    <VuiTypography variant="caption" color="text">
                      Desglose de inversiones: (Pendiente de implementar)
                    </VuiTypography>
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>

            {/* Meta 4: Ejercicio 3 veces por semana */}
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
                      <IoFitness color="#fff" size="24px" />
                    </VuiBox>
                    <VuiTypography variant="h5" color="white" fontWeight="bold">
                      Ejercicio 3x Semana
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox mb={2}>
                    <VuiTypography variant="button" color="text" fontWeight="regular">
                      Progreso: {metas.ejercicio.semanas} de {metas.ejercicio.objetivo} sesiones
                    </VuiTypography>
                  </VuiBox>
                  <VuiProgress value={metas.ejercicio.progreso} color="warning" />
                  <VuiBox mt={2}>
                    <VuiTypography variant="caption" color="text">
                      Calendario semanal: (Pendiente de implementar)
                    </VuiTypography>
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>

            {/* Meta 5: Organizar comidas los domingos */}
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
                      <IoRestaurant color="#fff" size="24px" />
                    </VuiBox>
                    <VuiTypography variant="h5" color="white" fontWeight="bold">
                      Meal Prep Domingos
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox mb={2}>
                    <VuiTypography variant="button" color="text" fontWeight="regular">
                      Progreso: {metas.comidas.semanas} de {metas.comidas.objetivo} semanas
                    </VuiTypography>
                  </VuiBox>
                  <VuiProgress value={metas.comidas.progreso} color="info" />
                  <VuiBox mt={2}>
                    <VuiTypography variant="caption" color="text">
                      Recetas y planificación: (Pendiente de implementar)
                    </VuiTypography>
                  </VuiBox>
                </VuiBox>
              </Card>
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
                      Progreso: {metas.journal.dias} de {metas.journal.objetivo} días
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

            {/* Meta 7: Dormir antes de las 00:00 */}
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
                      <IoMoon color="#fff" size="24px" />
                    </VuiBox>
                    <VuiTypography variant="h5" color="white" fontWeight="bold">
                      Dormir Antes 00:00
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox mb={2}>
                    <VuiTypography variant="button" color="text" fontWeight="regular">
                      Progreso: {metas.sueno.diasCumplidos} de {metas.sueno.objetivo} días
                    </VuiTypography>
                  </VuiBox>
                  <VuiProgress value={metas.sueno.progreso} color="info" />
                  <VuiBox mt={2}>
                    <VuiTypography variant="caption" color="text">
                      Historial de sueño: (Pendiente de implementar)
                    </VuiTypography>
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Metas;

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// React icons
import { IoCalendar } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";

function Journal() {
  // Datos de ejemplo de entradas del journal
  const entradas = [
    {
      fecha: "2026-01-01",
      titulo: "Ejemplo de entrada",
      contenido: "Esta es una entrada de ejemplo. Aquí puedes escribir sobre tu día...",
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3} display="flex" justifyContent="space-between" alignItems="center">
          <VuiTypography variant="h3" color="white" fontWeight="bold">
            Mi Journal 2026
          </VuiTypography>
          <VuiButton variant="contained" color="info">
            <IoAdd size="20px" style={{ marginRight: "8px" }} />
            Nueva Entrada
          </VuiButton>
        </VuiBox>

        {/* Sección para nueva entrada */}
        <VuiBox mb={3}>
          <Card>
            <VuiBox p={3}>
              <VuiBox mb={2} display="flex" alignItems="center">
                <VuiBox
                  bgColor="info"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ borderRadius: "12px", width: "48px", height: "48px" }}
                  mr={2}
                >
                  <IoCalendar color="#fff" size="24px" />
                </VuiBox>
                <VuiTypography variant="h5" color="white" fontWeight="bold">
                  Entrada de Hoy
                </VuiTypography>
              </VuiBox>

              <VuiBox mb={2}>
                <TextField
                  fullWidth
                  label="Título"
                  placeholder="¿Cómo estuvo tu día?"
                  variant="outlined"
                  sx={{
                    input: { color: "white" },
                    label: { color: "#8392AB" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#2D2E5F" },
                      "&:hover fieldset": { borderColor: "#0075FF" },
                    },
                  }}
                />
              </VuiBox>

              <VuiBox mb={2}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="¿Qué pasó hoy?"
                  placeholder="Escribe sobre tu día, tus logros, aprendizajes, sentimientos..."
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-root": { color: "white" },
                    label: { color: "#8392AB" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#2D2E5F" },
                      "&:hover fieldset": { borderColor: "#0075FF" },
                    },
                  }}
                />
              </VuiBox>

              <VuiBox display="flex" justifyContent="space-between" alignItems="center">
                <VuiTypography variant="caption" color="text">
                  Fecha: {new Date().toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </VuiTypography>
                <VuiButton variant="contained" color="info">
                  Guardar Entrada
                </VuiButton>
              </VuiBox>
            </VuiBox>
          </Card>
        </VuiBox>

        {/* Calendario de días registrados */}
        <VuiBox mb={3}>
          <Card>
            <VuiBox p={3}>
              <VuiTypography variant="h5" color="white" fontWeight="bold" mb={2}>
                Calendario 2026
              </VuiTypography>
              <VuiTypography variant="button" color="text" mb={2}>
                Días con entrada registrada: 0 de 365
              </VuiTypography>
              <VuiBox mt={2}>
                <VuiTypography variant="caption" color="text">
                  Vista de calendario: (Pendiente de implementar)
                </VuiTypography>
              </VuiBox>
            </VuiBox>
          </Card>
        </VuiBox>

        {/* Lista de entradas anteriores */}
        <VuiBox mb={3}>
          <VuiTypography variant="h4" color="white" fontWeight="bold" mb={2}>
            Entradas Anteriores
          </VuiTypography>
          <Grid container spacing={3}>
            {entradas.length === 0 ? (
              <Grid item xs={12}>
                <Card>
                  <VuiBox p={3} textAlign="center">
                    <VuiTypography variant="button" color="text">
                      No hay entradas anteriores. ¡Comienza a escribir tu historia de 2026!
                    </VuiTypography>
                  </VuiBox>
                </Card>
              </Grid>
            ) : (
              entradas.map((entrada, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card>
                    <VuiBox p={3}>
                      <VuiBox mb={1}>
                        <VuiTypography variant="button" color="text" fontWeight="regular">
                          {new Date(entrada.fecha).toLocaleDateString("es-ES", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </VuiTypography>
                      </VuiBox>
                      <VuiTypography variant="h6" color="white" fontWeight="bold" mb={1}>
                        {entrada.titulo}
                      </VuiTypography>
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        {entrada.contenido}
                      </VuiTypography>
                      <VuiBox mt={2} display="flex" justifyContent="flex-end">
                        <VuiButton variant="text" color="info" size="small">
                          Ver completo
                        </VuiButton>
                      </VuiBox>
                    </VuiBox>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Journal;

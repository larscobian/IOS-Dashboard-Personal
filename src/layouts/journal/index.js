import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiProgress from "components/VuiProgress";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// React icons
import { IoCalendar, IoAdd, IoTrash } from "react-icons/io5";

// Context y modelos
import { useGoals } from "context/goalsContext";
import { crearEntrada, calcularRachaActual } from "models/journalModel";
import { calcularProgreso } from "models/goalsModel";

function Journal() {
  const { journal, addJournalEntry, deleteJournalEntry } = useGoals();
  const [formData, setFormData] = useState({ titulo: "", contenido: "" });
  const [showForm, setShowForm] = useState(true);

  const entradas = journal.entradas || [];
  const diasRegistrados = entradas.length;
  const rachaActual = calcularRachaActual(entradas);
  const progreso = calcularProgreso(diasRegistrados, 365);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.titulo.trim()) {
      alert("Por favor ingresa un título");
      return;
    }

    const nuevaEntrada = crearEntrada(formData.titulo, formData.contenido);
    addJournalEntry(nuevaEntrada);

    setFormData({ titulo: "", contenido: "" });
    alert("Entrada guardada exitosamente!");
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Eliminar esta entrada?")) {
      deleteJournalEntry(id);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3} display="flex" justifyContent="space-between" alignItems="center">
          <VuiBox>
            <VuiTypography variant="h3" color="white" fontWeight="bold">
              Mi Journal 2026
            </VuiTypography>
            <VuiBox display="flex" gap="20px" mt={1}>
              <VuiTypography variant="button" color="text">
                {diasRegistrados} de 365 días registrados
              </VuiTypography>
              <VuiTypography variant="button" color="success">
                Racha: {rachaActual} días consecutivos
              </VuiTypography>
            </VuiBox>
          </VuiBox>
          <VuiButton variant="contained" color="info" onClick={() => setShowForm(!showForm)}>
            <IoAdd size="20px" style={{ marginRight: "8px" }} />
            {showForm ? "Ocultar Formulario" : "Nueva Entrada"}
          </VuiButton>
        </VuiBox>

        {/* Barra de progreso */}
        <VuiBox mb={3}>
          <VuiProgress value={progreso} color="info" />
          <VuiBox mt={1} textAlign="center">
            <VuiTypography variant="caption" color="text">
              {progreso}% del año completado
            </VuiTypography>
          </VuiBox>
        </VuiBox>

        {/* Formulario para nueva entrada */}
        {showForm && (
          <VuiBox mb={3}>
            <Card>
              <VuiBox p={3}>
                <form onSubmit={handleSubmit}>
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
                      value={formData.titulo}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                      sx={{
                        input: { color: "white" },
                        label: { color: "#8392AB" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#2D2E5F" },
                          "&:hover fieldset": { borderColor: "#0075FF" },
                          "&.Mui-focused fieldset": { borderColor: "#0075FF" }
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
                      value={formData.contenido}
                      onChange={(e) => setFormData({ ...formData, contenido: e.target.value })}
                      sx={{
                        "& .MuiInputBase-root": { color: "white" },
                        label: { color: "#8392AB" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#2D2E5F" },
                          "&:hover fieldset": { borderColor: "#0075FF" },
                          "&.Mui-focused fieldset": { borderColor: "#0075FF" }
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
                    <VuiButton type="submit" variant="contained" color="info">
                      Guardar Entrada
                    </VuiButton>
                  </VuiBox>
                </form>
              </VuiBox>
            </Card>
          </VuiBox>
        )}

        {/* Estadísticas */}
        <VuiBox mb={3}>
          <Card>
            <VuiBox p={3}>
              <VuiTypography variant="h5" color="white" fontWeight="bold" mb={2}>
                Estadísticas 2026
              </VuiTypography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <VuiBox textAlign="center">
                    <VuiTypography variant="h3" color="info" fontWeight="bold">
                      {diasRegistrados}
                    </VuiTypography>
                    <VuiTypography variant="caption" color="text">
                      Días registrados
                    </VuiTypography>
                  </VuiBox>
                </Grid>
                <Grid item xs={4}>
                  <VuiBox textAlign="center">
                    <VuiTypography variant="h3" color="success" fontWeight="bold">
                      {rachaActual}
                    </VuiTypography>
                    <VuiTypography variant="caption" color="text">
                      Racha actual
                    </VuiTypography>
                  </VuiBox>
                </Grid>
                <Grid item xs={4}>
                  <VuiBox textAlign="center">
                    <VuiTypography variant="h3" color="warning" fontWeight="bold">
                      {365 - diasRegistrados}
                    </VuiTypography>
                    <VuiTypography variant="caption" color="text">
                      Días restantes
                    </VuiTypography>
                  </VuiBox>
                </Grid>
              </Grid>
            </VuiBox>
          </Card>
        </VuiBox>

        {/* Lista de entradas */}
        <VuiBox mb={3}>
          <VuiTypography variant="h4" color="white" fontWeight="bold" mb={2}>
            Entradas ({entradas.length})
          </VuiTypography>
          <Grid container spacing={3}>
            {entradas.length === 0 ? (
              <Grid item xs={12}>
                <Card>
                  <VuiBox p={3} textAlign="center">
                    <VuiTypography variant="button" color="text">
                      No hay entradas aún. ¡Comienza a escribir tu historia de 2026!
                    </VuiTypography>
                  </VuiBox>
                </Card>
              </Grid>
            ) : (
              entradas
                .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                .map((entrada) => (
                  <Grid item xs={12} md={6} key={entrada.id}>
                    <Card>
                      <VuiBox p={3}>
                        <VuiBox mb={1} display="flex" justifyContent="space-between" alignItems="center">
                          <VuiTypography variant="button" color="text" fontWeight="regular">
                            {new Date(entrada.fecha).toLocaleDateString("es-ES", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </VuiTypography>
                          <VuiButton
                            variant="text"
                            color="error"
                            size="small"
                            onClick={() => handleDelete(entrada.id)}
                            sx={{ minWidth: "auto", p: 0.5 }}
                          >
                            <IoTrash size="18px" />
                          </VuiButton>
                        </VuiBox>
                        <VuiTypography variant="h6" color="white" fontWeight="bold" mb={1}>
                          {entrada.titulo}
                        </VuiTypography>
                        <VuiTypography variant="button" color="text" fontWeight="regular" sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden"
                        }}>
                          {entrada.contenido || "Sin contenido"}
                        </VuiTypography>
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

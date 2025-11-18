/**
 * SleepTracker - Componente para la meta de dormir antes de las 00:00
 */

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiProgress from "components/VuiProgress";

// React icons
import { IoMoon, IoAdd, IoTrash, IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

// Context
import { useGoals } from "context/goalsContext";
import { calcularProgreso } from "models/goalsModel";

function SleepTracker() {
  const { metas, addRegistroSueno, deleteRegistroSueno } = useGoals();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fecha: "",
    horaReal: "",
    cumplido: true
  });

  const registros = metas.sueno.registros || [];
  const diasCumplidos = registros.filter(r => r.cumplido).length;
  const objetivo = 365;
  const progreso = calcularProgreso(diasCumplidos, objetivo);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fecha) {
      alert("Por favor selecciona una fecha");
      return;
    }

    // Verificar si ya existe un registro para esa fecha
    const yaExiste = registros.some(r => r.fecha === formData.fecha);
    if (yaExiste) {
      alert("Ya existe un registro para esta fecha");
      return;
    }

    // Determinar si cumplió basándose en la hora
    let cumplido = formData.cumplido;
    if (formData.horaReal) {
      const [hora, minuto] = formData.horaReal.split(':');
      cumplido = parseInt(hora) < 24 && parseInt(hora) >= 0; // Antes de medianoche
    }

    const nuevoRegistro = {
      id: Date.now(),
      fecha: formData.fecha,
      cumplido: cumplido,
      horaReal: formData.horaReal || "",
      notas: ""
    };

    addRegistroSueno(nuevoRegistro);
    setFormData({ fecha: "", horaReal: "", cumplido: true });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este registro?")) {
      deleteRegistroSueno(id);
    }
  };

  const handleQuickAdd = () => {
    const hoy = new Date().toISOString().split('T')[0];
    const yaExiste = registros.some(r => r.fecha === hoy);

    if (yaExiste) {
      alert("Ya registraste el día de hoy");
      return;
    }

    const nuevoRegistro = {
      id: Date.now(),
      fecha: hoy,
      cumplido: true,
      horaReal: "",
      notas: ""
    };

    addRegistroSueno(nuevoRegistro);
  };

  return (
    <Card>
      <VuiBox p={3}>
        {/* Header */}
        <VuiBox display="flex" alignItems="center" mb={3}>
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
          <VuiBox flexGrow={1}>
            <VuiTypography variant="h5" color="white" fontWeight="bold">
              Dormir Antes 00:00
            </VuiTypography>
            <VuiTypography variant="button" color="text" fontWeight="regular">
              {diasCumplidos} de {objetivo} días
            </VuiTypography>
          </VuiBox>
          <VuiBox display="flex" gap="8px">
            <VuiButton
              variant="contained"
              color="info"
              size="small"
              onClick={handleQuickAdd}
            >
              <IoCheckmarkCircle size="18px" style={{ marginRight: "4px" }} />
              Hoy Cumplí
            </VuiButton>
            <VuiButton
              variant="outlined"
              color="info"
              size="small"
              onClick={() => setShowForm(!showForm)}
            >
              <IoAdd size="18px" />
            </VuiButton>
          </VuiBox>
        </VuiBox>

        {/* Barra de progreso */}
        <VuiBox mb={3}>
          <VuiProgress value={progreso} color="info" />
          <VuiBox mt={1} textAlign="center">
            <VuiTypography variant="caption" color="text">
              {progreso}% del año
            </VuiTypography>
          </VuiBox>
        </VuiBox>

        {/* Formulario */}
        {showForm && (
          <VuiBox
            mb={3}
            p={2}
            sx={{
              backgroundColor: "rgba(13, 23, 45, 0.5)",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}
          >
            <form onSubmit={handleSubmit}>
              <VuiBox mb={2}>
                <TextField
                  fullWidth
                  type="date"
                  label="Fecha"
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    input: { color: "white" },
                    label: { color: "#8392AB" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#2D2E5F" },
                      "&:hover fieldset": { borderColor: "#0075FF" },
                      "&.Mui-focused fieldset": { borderColor: "#0075FF" }
                    }
                  }}
                />
              </VuiBox>

              <VuiBox mb={2}>
                <TextField
                  fullWidth
                  type="time"
                  label="Hora en que dormiste (opcional)"
                  value={formData.horaReal}
                  onChange={(e) => setFormData({ ...formData, horaReal: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    input: { color: "white" },
                    label: { color: "#8392AB" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#2D2E5F" },
                      "&:hover fieldset": { borderColor: "#0075FF" },
                      "&.Mui-focused fieldset": { borderColor: "#0075FF" }
                    }
                  }}
                />
              </VuiBox>

              <VuiBox display="flex" gap="10px">
                <VuiButton type="submit" variant="contained" color="info" fullWidth>
                  Guardar
                </VuiButton>
                <VuiButton
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ fecha: "", horaReal: "", cumplido: true });
                  }}
                >
                  Cancelar
                </VuiButton>
              </VuiBox>
            </form>
          </VuiBox>
        )}

        {/* Lista de registros */}
        {registros.length === 0 ? (
          <VuiBox textAlign="center" py={3}>
            <VuiTypography variant="button" color="text">
              No has registrado ningún día aún. ¡Haz clic en "Hoy Cumplí" para empezar!
            </VuiTypography>
          </VuiBox>
        ) : (
          <VuiBox>
            {registros
              .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
              .slice(0, 10) // Mostrar solo los últimos 10
              .map((registro, index) => (
                <VuiBox key={registro.id}>
                  {index > 0 && <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", my: 1 }} />}
                  <VuiBox
                    display="flex"
                    alignItems="center"
                    py={2}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.02)",
                        borderRadius: "8px"
                      }
                    }}
                  >
                    {/* Ícono de cumplimiento */}
                    <VuiBox mr={2}>
                      {registro.cumplido ? (
                        <IoCheckmarkCircle size="24px" color="#4CAF50" />
                      ) : (
                        <IoCloseCircle size="24px" color="#E53E3E" />
                      )}
                    </VuiBox>

                    <VuiBox flexGrow={1}>
                      <VuiTypography variant="button" color="white" fontWeight="medium">
                        {new Date(registro.fecha).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </VuiTypography>
                      {registro.horaReal && (
                        <VuiBox mt={0.5}>
                          <VuiTypography variant="caption" color="text">
                            Hora: {registro.horaReal}
                          </VuiTypography>
                        </VuiBox>
                      )}
                    </VuiBox>

                    <IconButton onClick={() => handleDelete(registro.id)} sx={{ color: "#E53E3E" }}>
                      <IoTrash size="18px" />
                    </IconButton>
                  </VuiBox>
                </VuiBox>
              ))}

            {registros.length > 10 && (
              <VuiBox mt={2} textAlign="center">
                <VuiTypography variant="caption" color="text">
                  Mostrando los últimos 10 de {registros.length} registros
                </VuiTypography>
              </VuiBox>
            )}
          </VuiBox>
        )}

        {/* Mensaje de progreso */}
        {registros.length > 0 && (
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="caption" color="text">
              {progreso >= 100 ? (
                <span style={{ color: "#4CAF50", fontWeight: "bold" }}>
                  ¡Increíble! Mantuviste un buen horario todo el año
                </span>
              ) : (
                `Llevas ${diasCumplidos} días con buen horario de sueño`
              )}
            </VuiTypography>
          </VuiBox>
        )}
      </VuiBox>
    </Card>
  );
}

export default SleepTracker;

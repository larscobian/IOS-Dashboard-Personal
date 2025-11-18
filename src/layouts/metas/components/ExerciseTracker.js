/**
 * ExerciseTracker - Meta de ejercitarse 3 veces por semana (156 sesiones al año)
 */

import { useState } from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiProgress from "components/VuiProgress";

import { IoFitness, IoAdd, IoTrash } from "react-icons/io5";

import { useGoals } from "context/goalsContext";
import { calcularProgreso } from "models/goalsModel";

const TIPOS_EJERCICIO = ["Cardio", "Pesas", "Yoga", "Natación", "Ciclismo", "Caminata", "Otro"];

function ExerciseTracker() {
  const { metas, addSesionEjercicio, deleteSesionEjercicio } = useGoals();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fecha: "",
    tipo: "Cardio",
    duracion: "",
    notas: ""
  });

  const sesiones = metas.ejercicio.sesiones || [];
  const objetivo = 156; // 3 sesiones/semana * 52 semanas
  const progreso = calcularProgreso(sesiones.length, objetivo);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fecha) {
      alert("Por favor selecciona una fecha");
      return;
    }

    const nuevaSesion = {
      id: Date.now(),
      fecha: formData.fecha,
      tipo: formData.tipo,
      duracion: parseInt(formData.duracion) || 30,
      notas: formData.notas || ""
    };

    addSesionEjercicio(nuevaSesion);
    setFormData({ fecha: "", tipo: "Cardio", duracion: "", notas: "" });
    setShowForm(false);
  };

  const handleQuickAdd = () => {
    const hoy = new Date().toISOString().split('T')[0];

    const nuevaSesion = {
      id: Date.now(),
      fecha: hoy,
      tipo: "Ejercicio",
      duracion: 30,
      notas: ""
    };

    addSesionEjercicio(nuevaSesion);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Eliminar esta sesión?")) {
      deleteSesionEjercicio(id);
    }
  };

  // Calcular sesiones esta semana
  const hoy = new Date();
  const inicioSemana = new Date(hoy);
  inicioSemana.setDate(hoy.getDate() - hoy.getDay());
  inicioSemana.setHours(0, 0, 0, 0);

  const sesionesEstaSemana = sesiones.filter(s => {
    const fechaSesion = new Date(s.fecha);
    return fechaSesion >= inicioSemana;
  }).length;

  return (
    <Card>
      <VuiBox p={3}>
        <VuiBox display="flex" alignItems="center" mb={3}>
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
          <VuiBox flexGrow={1}>
            <VuiTypography variant="h5" color="white" fontWeight="bold">
              Ejercicio 3x Semana
            </VuiTypography>
            <VuiTypography variant="button" color="text" fontWeight="regular">
              {sesiones.length} de {objetivo} sesiones
            </VuiTypography>
          </VuiBox>
          <VuiBox display="flex" gap="8px">
            <VuiButton variant="contained" color="warning" size="small" onClick={handleQuickAdd}>
              <IoAdd size="18px" style={{ marginRight: "4px" }} />
              Hoy Hice
            </VuiButton>
            <VuiButton variant="outlined" color="warning" size="small" onClick={() => setShowForm(!showForm)}>
              <IoAdd size="18px" />
            </VuiButton>
          </VuiBox>
        </VuiBox>

        {/* Progreso */}
        <VuiBox mb={2}>
          <VuiProgress value={progreso} color="warning" />
          <VuiBox display="flex" justifyContent="space-between" mt={1}>
            <VuiTypography variant="caption" color="text">
              {progreso}% del año
            </VuiTypography>
            <VuiTypography variant="caption" color={sesionesEstaSemana >= 3 ? "success" : "text"}>
              Esta semana: {sesionesEstaSemana}/3
            </VuiTypography>
          </VuiBox>
        </VuiBox>

        {/* Formulario */}
        {showForm && (
          <VuiBox mb={3} p={2} sx={{ backgroundColor: "rgba(13, 23, 45, 0.5)", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
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
                      "&:hover fieldset": { borderColor: "#FFA726" },
                      "&.Mui-focused fieldset": { borderColor: "#FFA726" }
                    }
                  }}
                />
              </VuiBox>

              <VuiBox mb={2}>
                <TextField
                  fullWidth
                  select
                  label="Tipo de ejercicio"
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                  sx={{
                    "& .MuiSelect-select": { color: "white" },
                    label: { color: "#8392AB" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#2D2E5F" },
                      "&:hover fieldset": { borderColor: "#FFA726" },
                      "&.Mui-focused fieldset": { borderColor: "#FFA726" }
                    },
                    "& .MuiSvgIcon-root": { color: "white" }
                  }}
                >
                  {TIPOS_EJERCICIO.map((tipo) => (
                    <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                  ))}
                </TextField>
              </VuiBox>

              <VuiBox mb={2}>
                <TextField
                  fullWidth
                  type="number"
                  label="Duración (minutos)"
                  placeholder="30"
                  value={formData.duracion}
                  onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                  sx={{
                    input: { color: "white" },
                    label: { color: "#8392AB" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#2D2E5F" },
                      "&:hover fieldset": { borderColor: "#FFA726" },
                      "&.Mui-focused fieldset": { borderColor: "#FFA726" }
                    }
                  }}
                />
              </VuiBox>

              <VuiBox mb={2}>
                <TextField
                  fullWidth
                  label="Notas (opcional)"
                  value={formData.notas}
                  onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                  sx={{
                    input: { color: "white" },
                    label: { color: "#8392AB" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#2D2E5F" },
                      "&:hover fieldset": { borderColor: "#FFA726" },
                      "&.Mui-focused fieldset": { borderColor: "#FFA726" }
                    }
                  }}
                />
              </VuiBox>

              <VuiBox display="flex" gap="10px">
                <VuiButton type="submit" variant="contained" color="warning" fullWidth>Guardar</VuiButton>
                <VuiButton variant="outlined" color="secondary" fullWidth onClick={() => { setShowForm(false); setFormData({ fecha: "", tipo: "Cardio", duracion: "", notas: "" }); }}>Cancelar</VuiButton>
              </VuiBox>
            </form>
          </VuiBox>
        )}

        {/* Lista */}
        {sesiones.length === 0 ? (
          <VuiBox textAlign="center" py={3}>
            <VuiTypography variant="button" color="text">
              No has registrado sesiones. ¡Haz clic en "Hoy Hice"!
            </VuiTypography>
          </VuiBox>
        ) : (
          <VuiBox>
            {sesiones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 10).map((sesion, index) => (
              <VuiBox key={sesion.id}>
                {index > 0 && <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", my: 1 }} />}
                <VuiBox display="flex" alignItems="center" py={2} sx={{ "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.02)", borderRadius: "8px" } }}>
                  <VuiBox flexGrow={1}>
                    <VuiTypography variant="button" color="white" fontWeight="medium">
                      {sesion.tipo} - {sesion.duracion} min
                    </VuiTypography>
                    <VuiBox display="flex" gap="12px" mt={0.5}>
                      <VuiTypography variant="caption" color="text">
                        {new Date(sesion.fecha).toLocaleDateString('es-ES')}
                      </VuiTypography>
                      {sesion.notas && (
                        <>
                          <VuiTypography variant="caption" color="text">•</VuiTypography>
                          <VuiTypography variant="caption" color="text">{sesion.notas}</VuiTypography>
                        </>
                      )}
                    </VuiBox>
                  </VuiBox>
                  <IconButton onClick={() => handleDelete(sesion.id)} sx={{ color: "#E53E3E" }}>
                    <IoTrash size="18px" />
                  </IconButton>
                </VuiBox>
              </VuiBox>
            ))}
            {sesiones.length > 10 && (
              <VuiBox mt={2} textAlign="center">
                <VuiTypography variant="caption" color="text">
                  Mostrando las últimas 10 de {sesiones.length} sesiones
                </VuiTypography>
              </VuiBox>
            )}
          </VuiBox>
        )}

        {sesiones.length > 0 && (
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="caption" color="text">
              {progreso >= 100 ? (
                <span style={{ color: "#FFA726", fontWeight: "bold" }}>¡Meta alcanzada! 156+ sesiones</span>
              ) : (
                `Te faltan ${objetivo - sesiones.length} sesiones`
              )}
            </VuiTypography>
          </VuiBox>
        )}
      </VuiBox>
    </Card>
  );
}

export default ExerciseTracker;

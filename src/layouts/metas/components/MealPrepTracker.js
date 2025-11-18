/**
 * MealPrepTracker - Meta de hacer meal prep todos los domingos (52 semanas)
 */

import { useState } from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiProgress from "components/VuiProgress";

import { IoRestaurant, IoAdd, IoTrash, IoCheckmarkCircle } from "react-icons/io5";

import { useGoals } from "context/goalsContext";
import { calcularProgreso } from "models/goalsModel";

function MealPrepTracker() {
  const { metas, addMealPrep, deleteMealPrep } = useGoals();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fecha: "",
    recetas: "",
    notas: ""
  });

  const registros = metas.mealPrep.registros || [];
  const semanasCompletadas = registros.filter(r => r.realizado).length;
  const objetivo = 52;
  const progreso = calcularProgreso(semanasCompletadas, objetivo);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fecha) {
      alert("Por favor selecciona una fecha");
      return;
    }

    // Verificar que sea domingo
    const fecha = new Date(formData.fecha);
    if (fecha.getDay() !== 0) {
      const confirmar = window.confirm("La fecha seleccionada no es domingo. ¿Continuar de todos modos?");
      if (!confirmar) return;
    }

    const nuevoRegistro = {
      id: Date.now(),
      fecha: formData.fecha,
      realizado: true,
      recetas: formData.recetas || "",
      notas: formData.notas || ""
    };

    addMealPrep(nuevoRegistro);
    setFormData({ fecha: "", recetas: "", notas: "" });
    setShowForm(false);
  };

  const handleQuickAdd = () => {
    // Encontrar el próximo domingo
    const hoy = new Date();
    const domingo = new Date(hoy);
    const diff = (7 - hoy.getDay()) % 7;
    domingo.setDate(hoy.getDate() + (diff === 0 ? 0 : diff));

    const fechaDomingo = domingo.toISOString().split('T')[0];

    // Verificar si ya existe
    const yaExiste = registros.some(r => r.fecha === fechaDomingo);
    if (yaExiste) {
      alert("Ya registraste el meal prep de este domingo");
      return;
    }

    const nuevoRegistro = {
      id: Date.now(),
      fecha: fechaDomingo,
      realizado: true,
      recetas: "",
      notas: ""
    };

    addMealPrep(nuevoRegistro);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Eliminar este registro?")) {
      deleteMealPrep(id);
    }
  };

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
            <IoRestaurant color="#fff" size="24px" />
          </VuiBox>
          <VuiBox flexGrow={1}>
            <VuiTypography variant="h5" color="white" fontWeight="bold">
              Meal Prep Domingos
            </VuiTypography>
            <VuiTypography variant="button" color="text" fontWeight="regular">
              {semanasCompletadas} de {objetivo} semanas
            </VuiTypography>
          </VuiBox>
          <VuiBox display="flex" gap="8px">
            <VuiButton variant="contained" color="info" size="small" onClick={handleQuickAdd}>
              <IoCheckmarkCircle size="18px" style={{ marginRight: "4px" }} />
              Hoy Hice
            </VuiButton>
            <VuiButton variant="outlined" color="info" size="small" onClick={() => setShowForm(!showForm)}>
              <IoAdd size="18px" />
            </VuiButton>
          </VuiBox>
        </VuiBox>

        {/* Progreso */}
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
          <VuiBox mb={3} p={2} sx={{ backgroundColor: "rgba(13, 23, 45, 0.5)", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <form onSubmit={handleSubmit}>
              <VuiBox mb={2}>
                <TextField
                  fullWidth
                  type="date"
                  label="Fecha (preferible domingo)"
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
                  label="Recetas preparadas"
                  placeholder="Ej: Pollo al horno, arroz integral, ensaladas"
                  value={formData.recetas}
                  onChange={(e) => setFormData({ ...formData, recetas: e.target.value })}
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
                  multiline
                  rows={2}
                  label="Notas adicionales"
                  placeholder="Observaciones, ingredientes especiales, etc."
                  value={formData.notas}
                  onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                  sx={{
                    "& .MuiInputBase-root": { color: "white" },
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
                <VuiButton type="submit" variant="contained" color="info" fullWidth>Guardar</VuiButton>
                <VuiButton variant="outlined" color="secondary" fullWidth onClick={() => { setShowForm(false); setFormData({ fecha: "", recetas: "", notas: "" }); }}>Cancelar</VuiButton>
              </VuiBox>
            </form>
          </VuiBox>
        )}

        {/* Lista */}
        {registros.length === 0 ? (
          <VuiBox textAlign="center" py={3}>
            <VuiTypography variant="button" color="text">
              No has registrado meal preps. ¡Empieza este domingo!
            </VuiTypography>
          </VuiBox>
        ) : (
          <VuiBox>
            {registros.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 10).map((registro, index) => (
              <VuiBox key={registro.id}>
                {index > 0 && <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", my: 1 }} />}
                <VuiBox display="flex" alignItems="center" py={2} sx={{ "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.02)", borderRadius: "8px" } }}>
                  <VuiBox flexGrow={1}>
                    <VuiTypography variant="button" color="white" fontWeight="medium">
                      {new Date(registro.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </VuiTypography>
                    {registro.recetas && (
                      <VuiBox mt={0.5}>
                        <VuiTypography variant="caption" color="text">
                          Recetas: {registro.recetas}
                        </VuiTypography>
                      </VuiBox>
                    )}
                    {registro.notas && (
                      <VuiBox mt={0.5}>
                        <VuiTypography variant="caption" color="text" sx={{ fontStyle: "italic" }}>
                          {registro.notas}
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
                  Mostrando las últimas 10 de {registros.length} semanas
                </VuiTypography>
              </VuiBox>
            )}
          </VuiBox>
        )}

        {registros.length > 0 && (
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="caption" color="text">
              {progreso >= 100 ? (
                <span style={{ color: "#4CAF50", fontWeight: "bold" }}>¡Excelente! Completaste todo el año</span>
              ) : (
                `Te faltan ${objetivo - semanasCompletadas} domingos`
              )}
            </VuiTypography>
          </VuiBox>
        )}
      </VuiBox>
    </Card>
  );
}

export default MealPrepTracker;

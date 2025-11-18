/**
 * InvestmentTracker - Componente para gestionar la meta de invertir $1,000
 */

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiProgress from "components/VuiProgress";

// React icons
import { IoTrendingUp, IoAdd, IoTrash } from "react-icons/io5";

// Context
import { useGoals } from "context/goalsContext";
import { calcularProgreso } from "models/goalsModel";

const TIPOS_INVERSION = [
  "Acciones",
  "Bonos",
  "Criptomonedas",
  "Fondos de Inversión",
  "Bienes Raíces",
  "Otro"
];

function InvestmentTracker() {
  const { metas, addInversion, deleteInversion } = useGoals();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    monto: "",
    tipo: "Acciones",
    nombre: "",
    fecha: ""
  });

  const inversiones = metas.inversiones.historial || [];
  const totalInvertido = inversiones.reduce((sum, i) => sum + i.monto, 0);
  const objetivo = 1000;
  const progreso = calcularProgreso(totalInvertido, objetivo);

  const handleSubmit = (e) => {
    e.preventDefault();

    const monto = parseFloat(formData.monto);
    if (!monto || monto <= 0) {
      alert("Por favor ingresa un monto válido");
      return;
    }

    const nuevaInversion = {
      id: Date.now(),
      monto: monto,
      tipo: formData.tipo,
      nombre: formData.nombre || formData.tipo,
      fecha: formData.fecha || new Date().toISOString().split('T')[0]
    };

    addInversion(nuevaInversion);
    setFormData({ monto: "", tipo: "Acciones", nombre: "", fecha: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta inversión?")) {
      deleteInversion(id);
    }
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
            <IoTrendingUp color="#fff" size="24px" />
          </VuiBox>
          <VuiBox flexGrow={1}>
            <VuiTypography variant="h5" color="white" fontWeight="bold">
              Invertir $1,000
            </VuiTypography>
            <VuiTypography variant="button" color="text" fontWeight="regular">
              ${totalInvertido.toFixed(2)} de ${objetivo}
            </VuiTypography>
          </VuiBox>
          <VuiButton
            variant="contained"
            color="success"
            size="small"
            onClick={() => setShowForm(!showForm)}
          >
            <IoAdd size="18px" style={{ marginRight: "4px" }} />
            Agregar Inversión
          </VuiButton>
        </VuiBox>

        {/* Barra de progreso */}
        <VuiBox mb={3}>
          <VuiProgress value={progreso} color="success" />
          <VuiBox mt={1} textAlign="center">
            <VuiTypography variant="caption" color="text">
              {progreso}% completado
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
                  type="number"
                  label="Monto invertido"
                  placeholder="Ej: 250"
                  value={formData.monto}
                  onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                  sx={{
                    input: { color: "white" },
                    label: { color: "#8392AB" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#2D2E5F" },
                      "&:hover fieldset": { borderColor: "#4CAF50" },
                      "&.Mui-focused fieldset": { borderColor: "#4CAF50" }
                    }
                  }}
                />
              </VuiBox>

              <VuiBox mb={2}>
                <TextField
                  fullWidth
                  select
                  label="Tipo de inversión"
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                  sx={{
                    "& .MuiSelect-select": { color: "white" },
                    label: { color: "#8392AB" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#2D2E5F" },
                      "&:hover fieldset": { borderColor: "#4CAF50" },
                      "&.Mui-focused fieldset": { borderColor: "#4CAF50" }
                    },
                    "& .MuiSvgIcon-root": { color: "white" }
                  }}
                >
                  {TIPOS_INVERSION.map((tipo) => (
                    <MenuItem key={tipo} value={tipo}>
                      {tipo}
                    </MenuItem>
                  ))}
                </TextField>
              </VuiBox>

              <VuiBox mb={2}>
                <TextField
                  fullWidth
                  label="Nombre/Descripción"
                  placeholder="Ej: Apple Inc."
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  sx={{
                    input: { color: "white" },
                    label: { color: "#8392AB" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#2D2E5F" },
                      "&:hover fieldset": { borderColor: "#4CAF50" },
                      "&.Mui-focused fieldset": { borderColor: "#4CAF50" }
                    }
                  }}
                />
              </VuiBox>

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
                      "&:hover fieldset": { borderColor: "#4CAF50" },
                      "&.Mui-focused fieldset": { borderColor: "#4CAF50" }
                    }
                  }}
                />
              </VuiBox>

              <VuiBox display="flex" gap="10px">
                <VuiButton type="submit" variant="contained" color="success" fullWidth>
                  Guardar
                </VuiButton>
                <VuiButton
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ monto: "", tipo: "Acciones", nombre: "", fecha: "" });
                  }}
                >
                  Cancelar
                </VuiButton>
              </VuiBox>
            </form>
          </VuiBox>
        )}

        {/* Lista de inversiones */}
        {inversiones.length === 0 ? (
          <VuiBox textAlign="center" py={3}>
            <VuiTypography variant="button" color="text">
              No has registrado ninguna inversión aún. ¡Empieza a invertir!
            </VuiTypography>
          </VuiBox>
        ) : (
          <VuiBox>
            {inversiones
              .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
              .map((inversion, index) => (
                <VuiBox key={inversion.id}>
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
                    <VuiBox flexGrow={1}>
                      <VuiTypography variant="button" color="white" fontWeight="medium">
                        ${inversion.monto.toFixed(2)} - {inversion.nombre}
                      </VuiTypography>
                      <VuiBox display="flex" gap="12px" mt={0.5}>
                        <VuiTypography variant="caption" color="text">
                          {inversion.tipo}
                        </VuiTypography>
                        <VuiTypography variant="caption" color="text">•</VuiTypography>
                        <VuiTypography variant="caption" color="text">
                          {new Date(inversion.fecha).toLocaleDateString('es-ES')}
                        </VuiTypography>
                      </VuiBox>
                    </VuiBox>

                    <IconButton onClick={() => handleDelete(inversion.id)} sx={{ color: "#E53E3E" }}>
                      <IoTrash size="18px" />
                    </IconButton>
                  </VuiBox>
                </VuiBox>
              ))}
          </VuiBox>
        )}

        {/* Mensaje de progreso */}
        {inversiones.length > 0 && (
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="caption" color="text">
              {progreso >= 100 ? (
                <span style={{ color: "#4CAF50", fontWeight: "bold" }}>
                  ¡Felicidades! Has alcanzado tu meta de inversión
                </span>
              ) : (
                `Te faltan $${(objetivo - totalInvertido).toFixed(2)} para completar tu meta`
              )}
            </VuiTypography>
          </VuiBox>
        )}
      </VuiBox>
    </Card>
  );
}

export default InvestmentTracker;

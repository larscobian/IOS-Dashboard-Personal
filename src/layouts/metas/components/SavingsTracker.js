/**
 * SavingsTracker - Componente para gestionar la meta de ahorrar $2,000
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
import { IoWallet, IoAdd, IoTrash } from "react-icons/io5";

// Context
import { useGoals } from "context/goalsContext";
import { calcularProgreso } from "models/goalsModel";

function SavingsTracker() {
  const { metas, addAhorro, deleteAhorro } = useGoals();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    monto: "",
    fecha: "",
    nota: ""
  });

  const ahorros = metas.ahorros.historial || [];
  const totalAhorrado = ahorros.reduce((sum, a) => sum + a.monto, 0);
  const objetivo = 2000;
  const progreso = calcularProgreso(totalAhorrado, objetivo);

  const handleSubmit = (e) => {
    e.preventDefault();

    const monto = parseFloat(formData.monto);
    if (!monto || monto <= 0) {
      alert("Por favor ingresa un monto válido");
      return;
    }

    const nuevoAhorro = {
      id: Date.now(),
      monto: monto,
      fecha: formData.fecha || new Date().toISOString().split('T')[0],
      nota: formData.nota || ""
    };

    addAhorro(nuevoAhorro);
    setFormData({ monto: "", fecha: "", nota: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este registro?")) {
      deleteAhorro(id);
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
            <IoWallet color="#fff" size="24px" />
          </VuiBox>
          <VuiBox flexGrow={1}>
            <VuiTypography variant="h5" color="white" fontWeight="bold">
              Ahorrar $2,000
            </VuiTypography>
            <VuiTypography variant="button" color="text" fontWeight="regular">
              ${totalAhorrado.toFixed(2)} de ${objetivo}
            </VuiTypography>
          </VuiBox>
          <VuiButton
            variant="contained"
            color="success"
            size="small"
            onClick={() => setShowForm(!showForm)}
          >
            <IoAdd size="18px" style={{ marginRight: "4px" }} />
            Agregar Ahorro
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
                  label="Monto ahorrado"
                  placeholder="Ej: 500"
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

              <VuiBox mb={2}>
                <TextField
                  fullWidth
                  label="Nota (opcional)"
                  placeholder="Ej: Ahorro de enero"
                  value={formData.nota}
                  onChange={(e) => setFormData({ ...formData, nota: e.target.value })}
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
                    setFormData({ monto: "", fecha: "", nota: "" });
                  }}
                >
                  Cancelar
                </VuiButton>
              </VuiBox>
            </form>
          </VuiBox>
        )}

        {/* Lista de ahorros */}
        {ahorros.length === 0 ? (
          <VuiBox textAlign="center" py={3}>
            <VuiTypography variant="button" color="text">
              No has registrado ningún ahorro aún. ¡Comienza ahora!
            </VuiTypography>
          </VuiBox>
        ) : (
          <VuiBox>
            {ahorros
              .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
              .map((ahorro, index) => (
                <VuiBox key={ahorro.id}>
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
                        ${ahorro.monto.toFixed(2)}
                      </VuiTypography>
                      <VuiBox display="flex" gap="12px" mt={0.5}>
                        <VuiTypography variant="caption" color="text">
                          {new Date(ahorro.fecha).toLocaleDateString('es-ES')}
                        </VuiTypography>
                        {ahorro.nota && (
                          <>
                            <VuiTypography variant="caption" color="text">•</VuiTypography>
                            <VuiTypography variant="caption" color="text">
                              {ahorro.nota}
                            </VuiTypography>
                          </>
                        )}
                      </VuiBox>
                    </VuiBox>

                    <IconButton onClick={() => handleDelete(ahorro.id)} sx={{ color: "#E53E3E" }}>
                      <IoTrash size="18px" />
                    </IconButton>
                  </VuiBox>
                </VuiBox>
              ))}
          </VuiBox>
        )}

        {/* Mensaje de progreso */}
        {ahorros.length > 0 && (
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="caption" color="text">
              {progreso >= 100 ? (
                <span style={{ color: "#4CAF50", fontWeight: "bold" }}>
                  ¡Felicidades! Has alcanzado tu meta de ahorro
                </span>
              ) : (
                `Te faltan $${(objetivo - totalAhorrado).toFixed(2)} para completar tu meta`
              )}
            </VuiTypography>
          </VuiBox>
        )}
      </VuiBox>
    </Card>
  );
}

export default SavingsTracker;

/**
 * BooksTracker - Componente para gestionar la meta de leer 5 libros
 */

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";

// React icons
import { IoBookSharp, IoAdd, IoTrash, IoCheckmarkCircle, IoEllipseOutline } from "react-icons/io5";

// Context
import { useGoals } from "context/goalsContext";

function BooksTracker() {
  const { metas, addLibro, toggleLibro, deleteLibro } = useGoals();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    fechaInicio: ""
  });

  const libros = metas.libros.lista || [];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.titulo.trim()) {
      alert("Por favor ingresa el título del libro");
      return;
    }

    const nuevoLibro = {
      id: Date.now(),
      titulo: formData.titulo,
      autor: formData.autor || "Autor desconocido",
      fechaInicio: formData.fechaInicio || new Date().toISOString().split('T')[0],
      fechaFin: null,
      completado: false
    };

    addLibro(nuevoLibro);

    // Limpiar formulario
    setFormData({ titulo: "", autor: "", fechaInicio: "" });
    setShowForm(false);
  };

  const handleToggleComplete = (libro) => {
    toggleLibro(libro.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este libro?")) {
      deleteLibro(id);
    }
  };

  const librosCompletados = libros.filter(l => l.completado).length;

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
            <IoBookSharp color="#fff" size="24px" />
          </VuiBox>
          <VuiBox flexGrow={1}>
            <VuiTypography variant="h5" color="white" fontWeight="bold">
              Leer 5 Libros
            </VuiTypography>
            <VuiTypography variant="button" color="text" fontWeight="regular">
              {librosCompletados} de 5 libros completados
            </VuiTypography>
          </VuiBox>
          <VuiButton
            variant="contained"
            color="info"
            size="small"
            onClick={() => setShowForm(!showForm)}
          >
            <IoAdd size="18px" style={{ marginRight: "4px" }} />
            Agregar Libro
          </VuiButton>
        </VuiBox>

        {/* Formulario para agregar libro */}
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
                  label="Título del libro"
                  placeholder="Ej: Hábitos Atómicos"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
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
                  label="Autor"
                  placeholder="Ej: James Clear"
                  value={formData.autor}
                  onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
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
                  type="date"
                  label="Fecha de inicio"
                  value={formData.fechaInicio}
                  onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
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
                    setFormData({ titulo: "", autor: "", fechaInicio: "" });
                  }}
                >
                  Cancelar
                </VuiButton>
              </VuiBox>
            </form>
          </VuiBox>
        )}

        {/* Lista de libros */}
        {libros.length === 0 ? (
          <VuiBox textAlign="center" py={3}>
            <VuiTypography variant="button" color="text">
              No has agregado ningún libro aún. ¡Comienza agregando tu primer libro!
            </VuiTypography>
          </VuiBox>
        ) : (
          <VuiBox>
            {libros.map((libro, index) => (
              <VuiBox key={libro.id}>
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
                  {/* Checkbox */}
                  <IconButton
                    onClick={() => handleToggleComplete(libro)}
                    sx={{ color: libro.completado ? "#4CAF50" : "#8392AB", mr: 1 }}
                  >
                    {libro.completado ? (
                      <IoCheckmarkCircle size="24px" />
                    ) : (
                      <IoEllipseOutline size="24px" />
                    )}
                  </IconButton>

                  {/* Info del libro */}
                  <VuiBox flexGrow={1}>
                    <VuiTypography
                      variant="button"
                      color="white"
                      fontWeight="medium"
                      sx={{
                        textDecoration: libro.completado ? "line-through" : "none",
                        opacity: libro.completado ? 0.6 : 1
                      }}
                    >
                      {libro.titulo}
                    </VuiTypography>
                    <VuiBox display="flex" gap="12px" mt={0.5}>
                      <VuiTypography variant="caption" color="text">
                        {libro.autor}
                      </VuiTypography>
                      {libro.fechaInicio && (
                        <>
                          <VuiTypography variant="caption" color="text">•</VuiTypography>
                          <VuiTypography variant="caption" color="text">
                            Inicio: {new Date(libro.fechaInicio).toLocaleDateString('es-ES')}
                          </VuiTypography>
                        </>
                      )}
                      {libro.fechaFin && (
                        <>
                          <VuiTypography variant="caption" color="text">•</VuiTypography>
                          <VuiTypography variant="caption" color="text">
                            Fin: {new Date(libro.fechaFin).toLocaleDateString('es-ES')}
                          </VuiTypography>
                        </>
                      )}
                    </VuiBox>
                  </VuiBox>

                  {/* Botón eliminar */}
                  <IconButton
                    onClick={() => handleDelete(libro.id)}
                    sx={{ color: "#E53E3E" }}
                  >
                    <IoTrash size="18px" />
                  </IconButton>
                </VuiBox>
              </VuiBox>
            ))}
          </VuiBox>
        )}

        {/* Mensaje de progreso */}
        {libros.length > 0 && (
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="caption" color="text">
              {librosCompletados === 5 ? (
                <span style={{ color: "#4CAF50", fontWeight: "bold" }}>
                  ¡Felicidades! Has completado tu meta de leer 5 libros
                </span>
              ) : (
                `Te faltan ${5 - librosCompletados} libro(s) para completar tu meta`
              )}
            </VuiTypography>
          </VuiBox>
        )}
      </VuiBox>
    </Card>
  );
}

export default BooksTracker;

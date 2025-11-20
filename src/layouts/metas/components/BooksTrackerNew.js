/**
 * BooksTracker - Componente mejorado con portadas y porcentaje de lectura
 */

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiProgress from "components/VuiProgress";

// React icons
import { IoBookSharp, IoAdd, IoTrash, IoCheckmarkCircle, IoEllipseOutline, IoImage } from "react-icons/io5";

// Context
import { useGoals } from "context/goalsContext";

function BooksTrackerNew() {
  const { metas, addLibro, updateLibro, toggleLibro, deleteLibro } = useGoals();
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    portadaUrl: "",
    porcentajeLe\u00eddo: 0
  });

  const libros = metas.libros.lista || [];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.titulo.trim()) {
      alert("Por favor ingresa el título del libro");
      return;
    }

    if (editingBook) {
      // Actualizar libro existente
      const libroActualizado = {
        ...editingBook,
        titulo: formData.titulo,
        autor: formData.autor || "Autor desconocido",
        portadaUrl: formData.portadaUrl,
        porcentajeLeido: formData.porcentajeLeido,
        completado: formData.porcentajeLeido >= 100
      };
      updateLibro(libroActualizado);
      setEditingBook(null);
    } else {
      // Crear nuevo libro
      const nuevoLibro = {
        id: Date.now(),
        titulo: formData.titulo,
        autor: formData.autor || "Autor desconocido",
        portadaUrl: formData.portadaUrl || "",
        porcentajeLeido: formData.porcentajeLeido || 0,
        fechaInicio: new Date().toISOString().split('T')[0],
        fechaFin: null,
        completado: false
      };
      addLibro(nuevoLibro);
    }

    // Limpiar formulario
    setFormData({ titulo: "", autor: "", portadaUrl: "", porcentajeLeido: 0 });
    setShowForm(false);
  };

  const handleEdit = (libro) => {
    setEditingBook(libro);
    setFormData({
      titulo: libro.titulo,
      autor: libro.autor,
      portadaUrl: libro.portadaUrl || "",
      porcentajeLeido: libro.porcentajeLeido || 0
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este libro?")) {
      deleteLibro(id);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingBook(null);
    setFormData({ titulo: "", autor: "", portadaUrl: "", porcentajeLeido: 0 });
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
              Leer Libros
            </VuiTypography>
            <VuiTypography variant="button" color="text" fontWeight="regular">
              {librosCompletados} completados, {libros.length} total
            </VuiTypography>
          </VuiBox>
          <VuiButton
            variant="contained"
            color="info"
            size="small"
            onClick={() => setShowForm(!showForm)}
          >
            <IoAdd size="18px" style={{ marginRight: "4px" }} />
            {editingBook ? "Cancelar Edición" : "Agregar Libro"}
          </VuiButton>
        </VuiBox>

        {/* Formulario para agregar/editar libro */}
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
            <VuiTypography variant="lg" color="white" fontWeight="bold" mb={2}>
              {editingBook ? "Editar Libro" : "Nuevo Libro"}
            </VuiTypography>
            <form onSubmit={handleSubmit}>
              <VuiBox mb={2}>
                <TextField
                  fullWidth
                  label="Título del libro *"
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
                  label="URL de la portada (opcional)"
                  placeholder="https://ejemplo.com/portada.jpg"
                  value={formData.portadaUrl}
                  onChange={(e) => setFormData({ ...formData, portadaUrl: e.target.value })}
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
                <VuiTypography variant="caption" color="text" mt={1}>
                  Puedes usar enlaces de Google Books, Amazon, etc.
                </VuiTypography>
              </VuiBox>

              <VuiBox mb={3}>
                <VuiTypography variant="button" color="text" mb={1}>
                  Porcentaje leído: {formData.porcentajeLeido}%
                </VuiTypography>
                <Slider
                  value={formData.porcentajeLeido}
                  onChange={(e, newValue) => setFormData({ ...formData, porcentajeLeido: newValue })}
                  min={0}
                  max={100}
                  marks={[
                    { value: 0, label: '0%' },
                    { value: 25, label: '25%' },
                    { value: 50, label: '50%' },
                    { value: 75, label: '75%' },
                    { value: 100, label: '100%' },
                  ]}
                  sx={{
                    color: '#0075FF',
                    '& .MuiSlider-markLabel': {
                      color: '#8392AB',
                      fontSize: '10px'
                    },
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#0075FF'
                    }
                  }}
                />
              </VuiBox>

              <VuiBox display="flex" gap="10px">
                <VuiButton type="submit" variant="contained" color="info" fullWidth>
                  {editingBook ? "Actualizar" : "Guardar"}
                </VuiButton>
                <VuiButton
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={handleCancelForm}
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
          <Grid container spacing={2}>
            {libros.map((libro) => (
              <Grid item xs={12} sm={6} md={4} key={libro.id}>
                <VuiBox
                  sx={{
                    borderRadius: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    overflow: "hidden",
                    border: libro.completado ? "2px solid #4CAF50" : "1px solid rgba(255, 255, 255, 0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)"
                    }
                  }}
                >
                  {/* Portada del libro */}
                  <VuiBox
                    sx={{
                      height: "200px",
                      backgroundColor: "#1a1a2e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative"
                    }}
                  >
                    {libro.portadaUrl ? (
                      <img
                        src={libro.portadaUrl}
                        alt={libro.titulo}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                    ) : (
                      <IoImage size="64px" color="#8392AB" />
                    )}
                    {libro.completado && (
                      <VuiBox
                        sx={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          backgroundColor: "#4CAF50",
                          borderRadius: "50%",
                          p: 0.5
                        }}
                      >
                        <IoCheckmarkCircle size="24px" color="white" />
                      </VuiBox>
                    )}
                  </VuiBox>

                  {/* Información del libro */}
                  <VuiBox p={2}>
                    <VuiTypography
                      variant="button"
                      color="white"
                      fontWeight="bold"
                      mb={0.5}
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {libro.titulo}
                    </VuiTypography>
                    <VuiTypography variant="caption" color="text" mb={1.5}>
                      {libro.autor}
                    </VuiTypography>

                    {/* Barra de progreso */}
                    <VuiBox mb={1}>
                      <VuiProgress
                        value={libro.porcentajeLeido || 0}
                        color={libro.porcentajeLeido >= 100 ? "success" : "info"}
                        sx={{ background: "#2D2E5F" }}
                      />
                      <VuiTypography variant="caption" color="text" mt={0.5}>
                        {libro.porcentajeLeido || 0}% leído
                      </VuiTypography>
                    </VuiBox>

                    {/* Botones de acción */}
                    <VuiBox display="flex" justifyContent="space-between" mt={2}>
                      <VuiButton
                        variant="text"
                        color="info"
                        size="small"
                        onClick={() => handleEdit(libro)}
                        sx={{ p: 0.5 }}
                      >
                        Editar
                      </VuiButton>
                      <IconButton
                        onClick={() => handleDelete(libro.id)}
                        sx={{ color: "#E53E3E", p: 0.5 }}
                      >
                        <IoTrash size="18px" />
                      </IconButton>
                    </VuiBox>
                  </VuiBox>
                </VuiBox>
              </Grid>
            ))}
          </Grid>
        )}
      </VuiBox>
    </Card>
  );
}

export default BooksTrackerNew;

import React, { useState } from 'react';
import { Card, IconButton, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import VuiButton from 'components/VuiButton';
import { IoAdd, IoTrash } from 'react-icons/io5';
import colors from 'assets/theme/base/colors';

const PendientesAhora = () => {
  const { gradients } = colors;
  const { cardContent } = gradients;

  // Cargar pendientes del localStorage
  const [pendientes, setPendientes] = useState(() => {
    const saved = localStorage.getItem('pendientesAhora');
    return saved ? JSON.parse(saved) : [];
  });

  const [nuevoPendiente, setNuevoPendiente] = useState('');

  const agregarPendiente = () => {
    if (nuevoPendiente.trim()) {
      const nuevosPendientes = [...pendientes, { id: Date.now(), texto: nuevoPendiente, completado: false }];
      setPendientes(nuevosPendientes);
      localStorage.setItem('pendientesAhora', JSON.stringify(nuevosPendientes));
      setNuevoPendiente('');
    }
  };

  const togglePendiente = (id) => {
    const nuevosPendientes = pendientes.map(p =>
      p.id === id ? { ...p, completado: !p.completado } : p
    );
    setPendientes(nuevosPendientes);
    localStorage.setItem('pendientesAhora', JSON.stringify(nuevosPendientes));
  };

  const eliminarPendiente = (id) => {
    const nuevosPendientes = pendientes.filter(p => p.id !== id);
    setPendientes(nuevosPendientes);
    localStorage.setItem('pendientesAhora', JSON.stringify(nuevosPendientes));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      agregarPendiente();
    }
  };

  return (
    <Card sx={{ height: '340px', overflow: 'hidden' }}>
      <VuiBox display='flex' flexDirection='column' height="100%">
        <VuiTypography variant='lg' color='white' fontWeight='bold' mb='4px'>
          Pendientes Ahora
        </VuiTypography>
        <VuiTypography variant='button' color='warning' fontWeight='regular' mb='12px'>
          Tareas urgentes
        </VuiTypography>

        <VuiBox display="flex" gap="8px" mb={2}>
          <TextField
            fullWidth
            size="small"
            placeholder="Nueva tarea urgente..."
            value={nuevoPendiente}
            onChange={(e) => setNuevoPendiente(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': { borderColor: '#56577A' },
                '&:hover fieldset': { borderColor: '#0075FF' },
                '&.Mui-focused fieldset': { borderColor: '#0075FF' },
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#A0AEC0',
                opacity: 1,
              },
            }}
          />
          <IconButton
            onClick={agregarPendiente}
            sx={{
              backgroundColor: '#0075FF',
              '&:hover': { backgroundColor: '#0056CC' },
              width: '40px',
              height: '40px',
            }}
          >
            <IoAdd color="white" size="20px" />
          </IconButton>
        </VuiBox>

        <VuiBox flex={1} sx={{ overflowY: 'auto', minHeight: 0 }}>
          <List sx={{ py: 0 }}>
            {pendientes.map((pendiente) => (
              <ListItem
                key={pendiente.id}
                sx={{
                  borderRadius: '8px',
                  mb: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                <Checkbox
                  checked={pendiente.completado}
                  onChange={() => togglePendiente(pendiente.id)}
                  sx={{
                    color: '#56577A',
                    '&.Mui-checked': { color: '#0075FF' },
                  }}
                />
                <ListItemText
                  primary={pendiente.texto}
                  primaryTypographyProps={{
                    style: {
                      color: 'white',
                      textDecoration: pendiente.completado ? 'line-through' : 'none',
                      opacity: pendiente.completado ? 0.6 : 1,
                    },
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => eliminarPendiente(pendiente.id)}
                    sx={{ color: '#E31A1A' }}
                  >
                    <IoTrash size="18px" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </VuiBox>

        <VuiBox mt={1}>
          <VuiTypography variant='caption' color='text'>
            {pendientes.filter(p => !p.completado).length} pendiente(s)
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    </Card>
  );
};

export default PendientesAhora;

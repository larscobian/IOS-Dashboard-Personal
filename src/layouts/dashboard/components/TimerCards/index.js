import React, { useState, useEffect } from 'react';
import { Card, IconButton, Grid } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import { IoPlay, IoPause, IoStop, IoRefresh } from 'react-icons/io5';

const Timer = ({ title, color }) => {
  const [tiempo, setTiempo] = useState(0);
  const [activo, setActivo] = useState(false);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    let interval = null;
    if (activo && !pausado) {
      interval = setInterval(() => {
        setTiempo((tiempo) => tiempo + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [activo, pausado]);

  const formatearTiempo = (segundos) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`;
  };

  const iniciar = () => {
    setActivo(true);
    setPausado(false);
  };

  const pausar = () => {
    setPausado(!pausado);
  };

  const detener = () => {
    setActivo(false);
    setPausado(false);
  };

  const reiniciar = () => {
    setTiempo(0);
    setActivo(false);
    setPausado(false);
  };

  return (
    <VuiBox
      sx={{
        p: 2,
        borderRadius: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: activo && !pausado ? `2px solid ${color}` : '1px solid #56577A',
        transition: 'all 0.3s ease'
      }}
    >
      <VuiTypography variant="button" color="text" fontWeight="medium" mb={1}>
        {title}
      </VuiTypography>
      <VuiTypography
        variant="h2"
        color={activo ? "white" : "text"}
        fontWeight="bold"
        mb={2}
        sx={{ fontSize: '28px', fontFamily: 'monospace' }}
      >
        {formatearTiempo(tiempo)}
      </VuiTypography>
      <VuiBox display="flex" gap={1} justifyContent="center">
        {!activo ? (
          <IconButton
            onClick={iniciar}
            sx={{
              backgroundColor: color,
              '&:hover': { backgroundColor: color, opacity: 0.8 },
              width: '32px',
              height: '32px',
            }}
          >
            <IoPlay color="white" size="16px" />
          </IconButton>
        ) : (
          <IconButton
            onClick={pausar}
            sx={{
              backgroundColor: pausado ? color : '#FFB547',
              '&:hover': { opacity: 0.8 },
              width: '32px',
              height: '32px',
            }}
          >
            {pausado ? <IoPlay color="white" size="16px" /> : <IoPause color="white" size="16px" />}
          </IconButton>
        )}
        {activo && (
          <IconButton
            onClick={detener}
            sx={{
              backgroundColor: '#E31A1A',
              '&:hover': { opacity: 0.8 },
              width: '32px',
              height: '32px',
            }}
          >
            <IoStop color="white" size="16px" />
          </IconButton>
        )}
        {tiempo > 0 && !activo && (
          <IconButton
            onClick={reiniciar}
            sx={{
              backgroundColor: '#56577A',
              '&:hover': { opacity: 0.8 },
              width: '32px',
              height: '32px',
            }}
          >
            <IoRefresh color="white" size="16px" />
          </IconButton>
        )}
      </VuiBox>
    </VuiBox>
  );
};

const TimerCards = () => {
  return (
    <Card>
      <VuiBox>
        <VuiTypography variant="lg" color="white" fontWeight="bold" mb="12px">
          Cronómetros
        </VuiTypography>
        <VuiTypography variant="button" color="text" fontWeight="regular" mb="20px">
          Gestiona tu tiempo
        </VuiTypography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Timer title="Trabajo" color="#0075FF" />
          </Grid>
          <Grid item xs={6}>
            <Timer title="Ejercicio" color="#01B574" />
          </Grid>
          <Grid item xs={6}>
            <Timer title="Lectura" color="#FFB547" />
          </Grid>
          <Grid item xs={6}>
            <Timer title="Personal" color="#E31A1A" />
          </Grid>
        </Grid>
      </VuiBox>
    </Card>
  );
};

export default TimerCards;

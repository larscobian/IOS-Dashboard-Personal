import React, { useState } from 'react';
import { Card, IconButton } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { useGoals } from 'context/goalsContext';

const JournalCalendar = () => {
  const [mesActual, setMesActual] = useState(new Date());
  const { journal } = useGoals();

  const nombresMeses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const obtenerDiasDelMes = () => {
    const año = mesActual.getFullYear();
    const mes = mesActual.getMonth();

    const primerDia = new Date(año, mes, 1);
    const ultimoDia = new Date(año, mes + 1, 0);

    const diasDelMes = [];
    const primerDiaSemana = primerDia.getDay();

    // Días vacíos al inicio
    for (let i = 0; i < primerDiaSemana; i++) {
      diasDelMes.push(null);
    }

    // Días del mes
    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
      diasDelMes.push(dia);
    }

    return diasDelMes;
  };

  const obtenerEntradaJournal = (dia) => {
    if (!dia) return null;

    const año = mesActual.getFullYear();
    const mes = mesActual.getMonth();
    const fecha = new Date(año, mes, dia);
    const fechaStr = fecha.toISOString().split('T')[0];

    return journal.entradas?.find(e => e.fecha === fechaStr);
  };

  const cambiarMes = (direccion) => {
    const nuevaFecha = new Date(mesActual);
    nuevaFecha.setMonth(nuevaFecha.getMonth() + direccion);
    setMesActual(nuevaFecha);
  };

  const esDiaActual = (dia) => {
    if (!dia) return false;
    const hoy = new Date();
    return (
      dia === hoy.getDate() &&
      mesActual.getMonth() === hoy.getMonth() &&
      mesActual.getFullYear() === hoy.getFullYear()
    );
  };

  const getColorSentimiento = (sentimiento) => {
    const colores = {
      '😊': '#01B574', // verde
      '😐': '#FFB547', // amarillo
      '😞': '#E31A1A', // rojo
      '😄': '#0075FF', // azul
      '😢': '#A0AEC0'  // gris
    };
    return colores[sentimiento] || '#56577A';
  };

  const diasDelMes = obtenerDiasDelMes();

  return (
    <Card>
      <VuiBox sx={{ height: "100%", p: 2 }}>
        {/* Header con navegación */}
        <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <IconButton onClick={() => cambiarMes(-1)} sx={{ color: 'white' }}>
            <IoChevronBack />
          </IconButton>
          <VuiTypography variant="lg" color="white" fontWeight="bold">
            {nombresMeses[mesActual.getMonth()]} {mesActual.getFullYear()}
          </VuiTypography>
          <IconButton onClick={() => cambiarMes(1)} sx={{ color: 'white' }}>
            <IoChevronForward />
          </IconButton>
        </VuiBox>

        {/* Días de la semana */}
        <VuiBox
          display="grid"
          gridTemplateColumns="repeat(7, 1fr)"
          gap="4px"
          mb={1}
        >
          {diasSemana.map((dia) => (
            <VuiBox key={dia} textAlign="center">
              <VuiTypography variant="caption" color="text" fontWeight="bold">
                {dia}
              </VuiTypography>
            </VuiBox>
          ))}
        </VuiBox>

        {/* Calendario */}
        <VuiBox
          display="grid"
          gridTemplateColumns="repeat(7, 1fr)"
          gap="4px"
        >
          {diasDelMes.map((dia, index) => {
            const entrada = obtenerEntradaJournal(dia);
            const tieneEntrada = Boolean(entrada);
            const esHoy = esDiaActual(dia);

            return (
              <VuiBox
                key={index}
                sx={{
                  aspectRatio: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  backgroundColor: dia ? (esHoy ? '#0075FF' : 'rgba(255, 255, 255, 0.05)') : 'transparent',
                  border: tieneEntrada ? `2px solid ${getColorSentimiento(entrada.sentimiento)}` : 'none',
                  cursor: dia && tieneEntrada ? 'pointer' : 'default',
                  position: 'relative',
                  '&:hover': dia && tieneEntrada ? {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    '& .journal-preview': {
                      display: 'block'
                    }
                  } : {}
                }}
              >
                {dia && (
                  <>
                    <VuiTypography
                      variant="button"
                      color={esHoy ? 'white' : 'text'}
                      fontWeight={esHoy ? 'bold' : 'regular'}
                    >
                      {dia}
                    </VuiTypography>
                    {tieneEntrada && entrada.rating && (
                      <VuiTypography
                        variant="caption"
                        color="white"
                        sx={{ fontSize: '10px' }}
                      >
                        {entrada.rating}/9
                      </VuiTypography>
                    )}
                    {/* Tooltip con preview */}
                    {tieneEntrada && entrada.notaDelDia && (
                      <VuiBox
                        className="journal-preview"
                        sx={{
                          display: 'none',
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          mt: 1,
                          p: 1.5,
                          backgroundColor: 'rgba(17, 18, 43, 0.95)',
                          borderRadius: '8px',
                          border: '1px solid #56577A',
                          minWidth: '200px',
                          maxWidth: '300px',
                          zIndex: 1000,
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                        }}
                      >
                        <VuiTypography variant="caption" color="text" mb={0.5}>
                          {entrada.sentimiento} Día {entrada.rating}/9
                        </VuiTypography>
                        <VuiTypography variant="caption" color="white">
                          {entrada.notaDelDia.substring(0, 100)}
                          {entrada.notaDelDia.length > 100 ? '...' : ''}
                        </VuiTypography>
                      </VuiBox>
                    )}
                  </>
                )}
              </VuiBox>
            );
          })}
        </VuiBox>

        {/* Leyenda */}
        <VuiBox mt={2} display="flex" gap={2} flexWrap="wrap" justifyContent="center">
          <VuiBox display="flex" alignItems="center" gap={0.5}>
            <VuiBox
              sx={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#0075FF'
              }}
            />
            <VuiTypography variant="caption" color="text">
              Hoy
            </VuiTypography>
          </VuiBox>
          <VuiBox display="flex" alignItems="center" gap={0.5}>
            <VuiBox
              sx={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: '2px solid #01B574'
              }}
            />
            <VuiTypography variant="caption" color="text">
              Con entrada
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </Card>
  );
};

export default JournalCalendar;

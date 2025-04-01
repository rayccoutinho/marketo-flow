import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  CircularProgress,
  useTheme,
  styled
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { AlertCard } from './components/AlertCard';
import { AlertFilters } from './components/AlertFilters';
import { useAlerts } from './hooks/useAlerts';
import { Alert, AlertFilter } from './types/alert';

// Componentes estilizados
const GlassPaper = styled(Box)(({ theme }) => ({
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  borderRadius: '12px',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
}));

const EmptyState = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(8),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  '& svg': {
    fontSize: '3rem',
    color: theme.palette.text.disabled,
    marginBottom: theme.spacing(2),
  }
}));

const ErrorState = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: 'rgba(255, 235, 238, 0.7)',
  border: '1px solid rgba(255, 0, 0, 0.1)',
  borderRadius: '12px',
}));

const AlertsPage = () => {
  const theme = useTheme();
  const [filters, setFilters] = useState<AlertFilter>({});
  const { alerts, loading, error } = useAlerts(filters);

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 },
      minHeight: '100vh',
      background: 'radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.05) 0%, transparent 25%), radial-gradient(circle at 90% 80%, rgba(124, 58, 237, 0.05) 0%, transparent 25%)'
    }}>
      <Box sx={{ mb: 4, maxWidth: '800px' }}>
        <Typography variant="h3" fontWeight={600} gutterBottom sx={{ 
          fontSize: { xs: '1.8rem', md: '2.2rem' },
          lineHeight: 1.2
        }}>
          Alertas Inteligentes
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
          Notificações proativas baseadas no desempenho das campanhas
        </Typography>
      </Box>

      <GlassPaper>
        <AlertFilters filters={filters} setFilters={setFilters} />
      </GlassPaper>

      {loading ? (
        <GlassPaper>
          <Box display="flex" justifyContent="center" py={6}>
            <CircularProgress size={60} thickness={4} />
          </Box>
        </GlassPaper>
      ) : error ? (
        <GlassPaper>
          <ErrorState>
            <ErrorIcon fontSize="large" color="error" />
            <Box>
              <Typography variant="subtitle1" fontWeight={500} color="error">
                Erro ao carregar alertas
              </Typography>
              <Typography variant="body2" color="error.main">
                {error.message}
              </Typography>
            </Box>
          </ErrorState>
        </GlassPaper>
      ) : alerts.length === 0 ? (
        <GlassPaper>
          <EmptyState>
            <WarningIcon />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Nenhum alerta encontrado
            </Typography>
            <Typography variant="body2">
              Ajuste seus filtros ou verifique novamente mais tarde
            </Typography>
          </EmptyState>
        </GlassPaper>
      ) : (
        <GlassPaper sx={{ padding: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {alerts.map((alert: Alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </Box>
        </GlassPaper>
      )}
    </Box>
  );
};

export default AlertsPage;
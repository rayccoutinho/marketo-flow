// src/features/Alerts/AlertsPage.tsx
import { useState } from 'react';
import { Box, Typography, CircularProgress, Alert as MuiAlert } from '@mui/material';
import { AlertCard } from './components/AlertCard';
import { AlertFilters } from './components/AlertFilters';
import { useAlerts } from './hooks/useAlerts';
import { Alert, AlertFilter } from './types/alert';

const AlertsPage = () => {
  const [filters, setFilters] = useState<AlertFilter>({});
  const { alerts, loading, error } = useAlerts(filters);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Alertas Inteligentes
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Notificações proativas baseadas no desempenho das campanhas
      </Typography>

      <AlertFilters filters={filters} setFilters={setFilters} />
      
      <Box sx={{ mt: 4 }}>
        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <MuiAlert severity="error" sx={{ mb: 3 }}>
            Erro ao carregar alertas: {error.message}
          </MuiAlert>
        )}

        {!loading && !error && (
          <>
            {alerts.length === 0 ? (
              <Box 
                sx={{ 
                  p: 4, 
                  textAlign: 'center', 
                  backgroundColor: 'background.paper',
                  borderRadius: 1,
                  border: '1px dashed',
                  borderColor: 'divider'
                }}
              >
                <Typography variant="body1">
                  Nenhum alerta encontrado com os filtros atuais
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {alerts.map((alert: Alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default AlertsPage;
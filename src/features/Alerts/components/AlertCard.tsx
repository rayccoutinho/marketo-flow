// src/features/Alerts/components/AlertCard.tsx
import { Alert } from '../types/alert';
import { AlertSeverityBadge } from './AlertSeverityBadge';
import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AlertCardProps {
  alert: Alert;
}

export function AlertCard({ alert }: AlertCardProps) {
  return (
    <Box
      sx={{
        p: 3,
        borderLeft: 4,
        borderColor: getBorderColor(alert.severity),
        backgroundColor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        <AlertSeverityBadge severity={alert.severity} />
        <Typography variant="subtitle1" fontWeight="medium">
          {alert.title}
        </Typography>
      </Box>
      
      <Typography variant="body2" sx={{ mb: 2 }}>
        {alert.message}
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption" color="text.secondary">
          {format(new Date(alert.timestamp), 'PPp', { locale: ptBR })}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {alert.channel}
        </Typography>
      </Box>
    </Box>
  );
}

function getBorderColor(severity: Alert['severity']) {
  switch (severity) {
    case 'critical': return 'error.main';
    case 'high': return 'warning.main';
    case 'medium': return 'info.main';
    default: return 'grey.500';
  }
}
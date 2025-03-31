// src/features/Alerts/components/AlertSeverityBadge.tsx
import { AlertSeverity } from '../types/alert';
import { Badge, BadgeProps } from '@mui/material';

interface AlertSeverityBadgeProps {
  severity: AlertSeverity;
}

export function AlertSeverityBadge({ severity }: AlertSeverityBadgeProps) {
  const severityMap: Record<AlertSeverity, { color: BadgeProps['color'], label: string }> = {
    critical: { color: 'error', label: 'Crítico' },
    high: { color: 'warning', label: 'Alto' },
    medium: { color: 'info', label: 'Médio' },
    low: { color: 'success', label: 'Baixo' }
  };

  return (
    <Badge 
      color={severityMap[severity].color} 
      badgeContent={severityMap[severity].label}
      sx={{ 
        '& .MuiBadge-badge': { 
          position: 'static',
          transform: 'none',
          padding: '0 8px',
          borderRadius: 1
        }
      }}
    />
  );
}
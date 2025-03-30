import React from 'react';
import { Paper, Stack, Typography, useTheme } from '@mui/material';

interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
}

export default function MetricCard({ icon: Icon, title, value, color }: MetricCardProps) {
  const theme = useTheme();
  
  return (
    <Paper sx={{ 
      p: 2, 
      height: '100%',
      borderLeft: 4,
      borderColor: theme.palette[color].main,
      bgcolor: 'background.paper',
      borderRadius: 1,
      boxShadow: theme.shadows[2]
    }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        <Icon sx={{ color: theme.palette[color].main }} />
        <Typography variant="subtitle1" color="text.secondary">{title}</Typography>
      </Stack>
      <Typography variant="h4" sx={{ 
        color: theme.palette[color].dark,
        fontWeight: 'bold' 
      }}>
        {value}
      </Typography>
    </Paper>
  );
}
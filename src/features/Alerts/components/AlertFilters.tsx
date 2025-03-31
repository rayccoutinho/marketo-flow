// src/features/Alerts/components/AlertFilters.tsx
import { AlertFilter } from '../types/alert';
import { Box, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

interface AlertFiltersProps {
  filters: AlertFilter;
  setFilters: (filters: AlertFilter) => void;
}

export function AlertFilters({ filters, setFilters }: AlertFiltersProps) {
  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 2,
      flexWrap: 'wrap',
      p: 2,
      backgroundColor: 'background.paper',
      borderRadius: 1,
      mb: 2
    }}>
      <TextField
        label="Buscar alertas"
        variant="outlined"
        size="small"
        value={filters.search || ''}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        sx={{ minWidth: 200 }}
      />
      
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Severidade</InputLabel>
        <Select
          value={filters.severity || ''}
          label="Severidade"
          onChange={(e) => setFilters({ ...filters, severity: e.target.value as any })}
        >
          <MenuItem value="">Todas</MenuItem>
          <MenuItem value="critical">Crítica</MenuItem>
          <MenuItem value="high">Alta</MenuItem>
          <MenuItem value="medium">Média</MenuItem>
          <MenuItem value="low">Baixa</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Canal</InputLabel>
        <Select
          value={filters.channel || ''}
          label="Canal"
          onChange={(e) => setFilters({ ...filters, channel: e.target.value as any })}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="google-ads">Google Ads</MenuItem>
          <MenuItem value="meta">Meta Ads</MenuItem>
          <MenuItem value="tiktok">TikTok</MenuItem>
          <MenuItem value="email">E-mail</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
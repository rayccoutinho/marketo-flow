import React from 'react';
import { 
  Box, 
  Typography, 
  Skeleton, 
  useTheme,
  styled
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { useInsights } from './hooks/useInsights';
import { InsightCard } from './components/InsightCard';
import { Filters } from './components/Filters';

// Componentes estilizados (consistentes com outras páginas)
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

const InsightsPage = () => {
  const theme = useTheme();
  const { insights, loading, error, filters, setFilters } = useInsights();

  return (
    <Box sx={{ 
      p: { xs: 2, md: 3 },
      minHeight: '100vh',
      background: 'radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.05) 0%, transparent 25%), radial-gradient(circle at 90% 80%, rgba(124, 58, 237, 0.05) 0%, transparent 25%)'
    }}>
      {/* Cabeçalho padronizado */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Insights Analíticos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Descubra padrões e oportunidades em seus dados
        </Typography>
      </Box>

      <GlassPaper>
        <Filters filters={filters} setFilters={setFilters} />
      </GlassPaper>

      {loading ? (
        <GlassPaper>
          <Box sx={{ display: 'grid', gap: 3 }}>
            {[...Array(3)].map((_, index) => (
              <Skeleton 
                key={index} 
                variant="rounded" 
                height={120} 
                sx={{ 
                  borderRadius: '12px',
                  bgcolor: 'rgba(0, 0, 0, 0.05)'
                }} 
              />
            ))}
          </Box>
        </GlassPaper>
      ) : error ? (
        <GlassPaper>
          <ErrorState>
            <ErrorIcon fontSize="large" color="error" />
            <Box>
              <Typography variant="subtitle1" fontWeight={500} color="error">
                Erro ao carregar insights
              </Typography>
              <Typography variant="body2" color="error.main">
                {error}
              </Typography>
            </Box>
          </ErrorState>
        </GlassPaper>
      ) : insights.length === 0 ? (
        <GlassPaper>
          <EmptyState>
            <WarningIcon />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Nenhum insight encontrado
            </Typography>
            <Typography variant="body2">
              Ajuste seus filtros para ver mais resultados
            </Typography>
          </EmptyState>
        </GlassPaper>
      ) : (
        <GlassPaper sx={{ padding: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'grid', gap: 3 }}>
            {insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </Box>
        </GlassPaper>
      )}
    </Box>
  );
};

export default InsightsPage;
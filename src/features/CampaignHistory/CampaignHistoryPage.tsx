import React from 'react';
import { 
  Box, 
  Typography, 
  Skeleton,
  useTheme,
  styled
} from '@mui/material';
import { CampaignHistoryTable } from './components/CampaignHistoryTable';
import { CampaignStats } from './components/CampaignStats';
import { useCampaignHistory } from './hooks/useCampaignHistory';

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

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

const CampaignHistoryPage = () => {
  const theme = useTheme();
  const { campaigns, loading, error } = useCampaignHistory();

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
          Histórico de Campanhas
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
          Visualize o desempenho detalhado das suas campanhas anteriores
        </Typography>
      </Box>

      {loading ? (
        <>
          <GlassPaper>
            <StatsContainer>
              {[...Array(4)].map((_, index) => (
                <Skeleton 
                  key={index}
                  variant="rounded" 
                  height={120}
                  sx={{ borderRadius: '12px' }}
                />
              ))}
            </StatsContainer>
          </GlassPaper>
          <GlassPaper>
            <Skeleton variant="rounded" height={400} sx={{ borderRadius: '12px' }} />
          </GlassPaper>
        </>
      ) : error ? (
        <GlassPaper sx={{ 
          backgroundColor: 'rgba(255, 235, 238, 0.7)',
          borderColor: 'rgba(255, 0, 0, 0.1)'
        }}>
          <Typography color="error">
            Erro ao carregar histórico de campanhas
          </Typography>
        </GlassPaper>
      ) : (
        <>
          <GlassPaper sx={{ padding: { xs: 2, md: 3 } }}>
            <CampaignStats campaigns={campaigns} />
          </GlassPaper>
          
          <GlassPaper sx={{ padding: { xs: 0, md: 0 }, overflow: 'hidden' }}>
            <CampaignHistoryTable campaigns={campaigns} loading={loading} />
          </GlassPaper>
        </>
      )}
    </Box>
  );
};

export default CampaignHistoryPage;
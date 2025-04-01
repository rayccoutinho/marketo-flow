import React from 'react';
import { 
  Box, 
  Typography, 
  useTheme,
  styled,
  Button
} from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { 
  Description as ReportIcon,
  InsertChartOutlined as ChartIcon,
  Download as DownloadIcon
} from '@mui/icons-material';

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

const ComingSoonCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: theme.spacing(8),
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  borderRadius: '12px',
  border: '1px dashed rgba(0, 0, 0, 0.12)',
  '& svg': {
    fontSize: '4rem',
    color: theme.palette.text.disabled,
    marginBottom: theme.spacing(3),
  }
}));

const ReportFeatureCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
}));

const CustomReports = () => {
  const theme = useTheme();

  const upcomingFeatures = [
    {
      title: "Relatórios de Performance",
      description: "Análise detalhada do desempenho das campanhas",
      icon: <ChartIcon color="primary" sx={{ fontSize: 40 }} />
    },
    {
      title: "Exportação Avançada",
      description: "Exporte dados em múltiplos formatos (PDF, CSV, XLSX)",
      icon: <DownloadIcon color="primary" sx={{ fontSize: 40 }} />
    }
  ];

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
          Relatórios Personalizados
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
          Crie e visualize relatórios detalhados sobre suas campanhas
        </Typography>
      </Box>

      <GlassPaper>
        <ComingSoonCard>
          <ConstructionIcon />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Funcionalidade em Desenvolvimento
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: '600px', mb: 3 }}>
            Estamos trabalhando em uma poderosa ferramenta de relatórios personalizados que permitirá você analisar seus dados de marketing de forma profunda e flexível.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{
              borderRadius: '8px',
              padding: theme.spacing(1.5, 4),
              fontWeight: 500
            }}
          >
            Avise-me quando estiver pronto
          </Button>
        </ComingSoonCard>
      </GlassPaper>

      <GlassPaper>
        <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
          Recursos que estão por vir
        </Typography>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 3
        }}>
          {upcomingFeatures.map((feature, index) => (
            <ReportFeatureCard key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                {feature.icon}
                <Typography variant="h6" fontWeight={600}>
                  {feature.title}
                </Typography>
              </Box>
              <Typography color="text.secondary">
                {feature.description}
              </Typography>
            </ReportFeatureCard>
          ))}
        </Box>
      </GlassPaper>
    </Box>
  );
};

export default CustomReports;
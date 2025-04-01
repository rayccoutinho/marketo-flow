import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Tabs, 
  Tab, 
  Chip, 
  Divider, 
  TextField,
  IconButton,
  useTheme,
  styled,
  Skeleton
} from '@mui/material';
import {
  Settings as SettingsIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Link as LinkIcon,
  OpenInNew as OpenInNewIcon,
  ContentCopy as CopyIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

// Componentes estilizados (consistentes com as outras páginas)
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

const IntegrationCard = styled(Box)(({ theme }) => ({
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

const PrimaryButton = styled(Button)(({ theme }) => ({
  fontWeight: 500,
  letterSpacing: '0.01em',
  borderRadius: '8px',
  padding: theme.spacing(1.5, 3),
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  fontWeight: 500,
  letterSpacing: '0.01em',
  borderRadius: '8px',
  padding: theme.spacing(1.5, 3),
  textTransform: 'none',
  borderColor: 'rgba(0, 0, 0, 0.12)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderColor: 'rgba(0, 0, 0, 0.24)',
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 3,
  },
  marginBottom: theme.spacing(3),
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.875rem',
  minWidth: 'unset',
  padding: theme.spacing(1, 2),
  marginRight: theme.spacing(2),
  color: theme.palette.text.primary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

// Tipos
interface Integration {
  id: number;
  name: string;
  logo: string;
  status?: 'active' | 'error';
  lastSync?: string;
  description?: string;
}

const IntegrationSettings = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<'connected' | 'available'>('connected');
  const [apiKey] = useState('mk_live_1234567890abcdef1234567890abcdef');
  const [isLoading] = useState(false);

  const connectedIntegrations: Integration[] = [
    {
      id: 1,
      name: 'Google Ads',
      logo: 'https://logo.clearbit.com/google.com',
      status: 'active',
      lastSync: 'Hoje, 09:42'
    },
    {
      id: 2,
      name: 'Meta Ads',
      logo: 'https://logo.clearbit.com/meta.com',
      status: 'active',
      lastSync: 'Hoje, 08:15'
    },
    {
      id: 3,
      name: 'Google Analytics',
      logo: 'https://logo.clearbit.com/analytics.google.com',
      status: 'error',
      lastSync: 'Ontem, 14:30'
    }
  ];

  const availableIntegrations: Integration[] = [
    {
      id: 4,
      name: 'Slack',
      logo: 'https://logo.clearbit.com/slack.com',
      description: 'Receba notificações e gerencie tarefas'
    },
    {
      id: 5,
      name: 'Mailchimp',
      logo: 'https://logo.clearbit.com/mailchimp.com',
      description: 'Sincronize suas listas de email'
    },
    {
      id: 6,
      name: 'Zapier',
      logo: 'https://logo.clearbit.com/zapier.com',
      description: 'Conecte com +3000 aplicativos'
    }
  ];

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
  };

  const handleGenerateNewKey = () => {
    // Lógica para gerar nova chave
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 3 },
      minHeight: '100vh',
      background: 'radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.05) 0%, transparent 25%), radial-gradient(circle at 90% 80%, rgba(124, 58, 237, 0.05) 0%, transparent 25%)'
    }}>
      {/* Cabeçalho padronizado com as outras páginas */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <SettingsIcon sx={{ fontSize: 28, color: 'text.primary', mr: 2 }} />
        <Typography variant="h4" fontWeight={600}>
          Configurações de Integração
        </Typography>
      </Box>

      <GlassPaper>
        <StyledTabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          aria-label="integration tabs"
        >
          <StyledTab 
            value="connected" 
            label={`Conectadas (${connectedIntegrations.length})`} 
          />
          <StyledTab 
            value="available" 
            label={`Disponíveis (${availableIntegrations.length})`} 
          />
        </StyledTabs>

        <Divider sx={{ mb: 3 }} />

        {isLoading ? (
          <Box sx={{ display: 'grid', gap: 2 }}>
            {[...Array(3)].map((_, index) => (
              <Skeleton 
                key={index}
                variant="rounded"
                height={96}
                sx={{ borderRadius: '12px' }}
              />
            ))}
          </Box>
        ) : activeTab === 'connected' ? (
          <Box sx={{ display: 'grid', gap: 2 }}>
            {connectedIntegrations.map((integration) => (
              <IntegrationCard key={integration.id}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 2
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={integration.logo}
                      alt={integration.name}
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                    <Box>
                      <Typography fontWeight={500}>{integration.name}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        {integration.status === 'active' ? (
                          <>
                            <CheckCircleIcon sx={{ color: 'success.main', fontSize: 16, mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              Conectado • Última sincronização: {integration.lastSync}
                            </Typography>
                          </>
                        ) : (
                          <>
                            <ErrorIcon sx={{ color: 'warning.main', fontSize: 16, mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              Erro na conexão • Última tentativa: {integration.lastSync}
                            </Typography>
                          </>
                        )}
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      startIcon={<LinkIcon />}
                      sx={{ color: 'primary.main' }}
                    >
                      Reconfigurar
                    </Button>
                    <Button
                      sx={{ color: 'error.main' }}
                    >
                      Desconectar
                    </Button>
                  </Box>
                </Box>
              </IntegrationCard>
            ))}
          </Box>
        ) : (
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }, 
            gap: 3 
          }}>
            {availableIntegrations.map((integration) => (
              <IntegrationCard key={integration.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                  <Box
                    component="img"
                    src={integration.logo}
                    alt={integration.name}
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <Typography fontWeight={500} variant="h6">
                    {integration.name}
                  </Typography>
                </Box>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  {integration.description}
                </Typography>
                <PrimaryButton
                  fullWidth
                  startIcon={<OpenInNewIcon />}
                >
                  Conectar
                </PrimaryButton>
              </IntegrationCard>
            ))}
          </Box>
        )}
      </GlassPaper>

      <GlassPaper sx={{ mt: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          API Key
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          alignItems: { md: 'center' },
          gap: 2,
          mb: 1
        }}>
          <TextField
            value={apiKey}
            fullWidth
            InputProps={{
              readOnly: true,
              endAdornment: (
                <IconButton onClick={handleCopyApiKey}>
                  <CopyIcon fontSize="small" />
                </IconButton>
              ),
              sx: {
                fontFamily: 'monospace',
                bgcolor: 'action.hover'
              }
            }}
          />
          <SecondaryButton
            startIcon={<RefreshIcon />}
            onClick={handleGenerateNewKey}
            sx={{ flexShrink: 0 }}
          >
            Gerar nova chave
          </SecondaryButton>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Use esta chave para conectar com outras plataformas via API
        </Typography>
      </GlassPaper>
    </Box>
  );
};

export default IntegrationSettings;
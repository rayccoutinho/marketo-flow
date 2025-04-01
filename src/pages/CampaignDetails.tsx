import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Tabs, 
  Tab,
  Paper,
  Chip,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Grid,
  Snackbar,
  Alert,
  useTheme,
  styled
} from '@mui/material';
import { 
  FiEdit, 
  FiArrowLeft, 
  FiBarChart2, 
  FiFileText, 
  FiCheckCircle,
  FiDollarSign,
  FiCalendar,
  FiUsers
} from 'react-icons/fi';

// Componentes estilizados
const GlassPaper = styled(Paper)(({ theme }) => ({
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  borderRadius: '12px',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '-0.01em',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  fontSize: '1.25rem',
}));

const ContentCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
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

interface ContentItem {
  id: string;
  title: string;
  type: string;
  platform: string;
  nature: string;
  dueDate: string;
  assignedTo: string;
  budget?: number;
  notes?: string;
}

interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
}

interface Kpis {
  roas: number;
  ctr: number;
  engagementRate: number;
}

interface ProgressMetrics {
  targetProgress: number;
  reviewStages: string[];
}

interface ContentPlan {
  items: ContentItem[];
}

type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed';

interface Campaign {
  id: string;
  campaignName: string;
  campaignType: string;
  objective: string;
  targetAudience: string;
  budget: number;
  paidTrafficBudget?: number;
  contentBudget?: number;
  startDate: string;
  endDate: string;
  primaryChannel: string;
  secondaryChannels: string[];
  keyMessages: string;
  successMetrics: string;
  kpis: Kpis;
  competitorAnalysis: string;
  requiresApproval: boolean;
  template: string;
  contentPlan: ContentPlan;
  approvalWorkflow: string[];
  progressMetrics: ProgressMetrics;
  attachments: Attachment[];
  status: CampaignStatus;
  createdAt: string;
}

const CampaignDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info'
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    const loadCampaign = () => {
      try {
        // Check if coming from dashboard with state
        if (location.state?.campaign) {
          setCampaign(location.state.campaign);
          setLoading(false);
          return;
        }

        // Otherwise load from localStorage
        const savedCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
        const foundCampaign = savedCampaigns.find((c: Campaign) => c.id === id);
        
        if (!foundCampaign) {
          setSnackbar({
            open: true,
            message: 'Campanha não encontrada',
            severity: 'error'
          });
          navigate('/dashboard', { replace: true });
          return;
        }

        // Initialize missing fields
        if (!foundCampaign.contentPlan?.items) {
          foundCampaign.contentPlan = { items: [] };
        }
        if (!foundCampaign.secondaryChannels) {
          foundCampaign.secondaryChannels = [];
        }
        if (!foundCampaign.approvalWorkflow) {
          foundCampaign.approvalWorkflow = [];
        }
        
        setCampaign(foundCampaign);
      } catch (error) {
        console.error('Error loading campaign:', error);
        setSnackbar({
          open: true,
          message: 'Erro ao carregar campanha',
          severity: 'error'
        });
        navigate('/dashboard', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    loadCampaign();
  }, [id, navigate, location.state]);

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Data inválida' : date.toLocaleDateString('pt-BR');
    } catch {
      return 'Data inválida';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '80vh',
        flexDirection: 'column',
        gap: 2,
        backdropFilter: 'blur(4px)',
      }}>
        <CircularProgress size={60} />
        <Typography variant="body1" color="text.secondary">
          Carregando campanha...
        </Typography>
      </Box>
    );
  }

  if (!campaign) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Campanha não encontrada</Typography>
        <PrimaryButton 
          variant="contained" 
          onClick={() => navigate('/dashboard')}
          sx={{ mt: 2 }}
        >
          Voltar ao Dashboard
        </PrimaryButton>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <SecondaryButton 
        startIcon={<FiArrowLeft />} 
        onClick={() => navigate('/dashboard')}
        sx={{ mb: 3 }}
      >
        Voltar ao Dashboard
      </SecondaryButton>

      <GlassPaper>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="h4" sx={{ 
            wordBreak: 'break-word',
            fontWeight: 600,
            letterSpacing: '-0.02em'
          }}>
            {campaign.campaignName}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              label={
                campaign.status === 'draft' ? 'Rascunho' :
                campaign.status === 'active' ? 'Ativa' :
                campaign.status === 'paused' ? 'Pausada' : 'Concluída'
              } 
              color={
                campaign.status === 'draft' ? 'default' :
                campaign.status === 'active' ? 'success' :
                campaign.status === 'paused' ? 'warning' : 'info'
              }
              sx={{ 
                textTransform: 'capitalize',
                fontWeight: 500,
                borderRadius: '6px'
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Criada em: {formatDate(campaign.createdAt)}
            </Typography>
          </Box>
        </Box>

        <StyledTabs 
          value={activeTab} 
          onChange={(_, newValue) => setActiveTab(newValue)} 
          variant="scrollable"
          scrollButtons="auto"
        >
          <StyledTab label="Visão Geral" icon={<FiFileText />} />
          <StyledTab label="Conteúdo" icon={<FiFileText />} />
          <StyledTab label="Progresso" icon={<FiBarChart2 />} />
          <StyledTab label="Aprovação" icon={<FiCheckCircle />} />
          <StyledTab label="Orçamento" icon={<FiDollarSign />} />
        </StyledTabs>

        {activeTab === 0 && (
          <Box>
            <SectionHeader>
              Informações Básicas
            </SectionHeader>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography><strong>Template:</strong> {campaign.template || 'Não especificado'}</Typography>
                <Typography sx={{ mt: 1.5 }}><strong>Objetivo:</strong> {campaign.objective}</Typography>
                <Typography sx={{ mt: 1.5 }}><strong>Tipo de Campanha:</strong> {campaign.campaignType}</Typography>
                <Typography sx={{ mt: 1.5 }}>
                  <strong>Análise de Concorrentes:</strong> {campaign.competitorAnalysis || 'Não informada'}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography>
                  <strong>Período:</strong> {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                </Typography>
                <Typography sx={{ mt: 1.5 }}>
                  <strong>Canal Principal:</strong> {campaign.primaryChannel}
                </Typography>
                <Typography sx={{ mt: 1.5 }}>
                  <strong>Canais Secundários:</strong> 
                  {campaign.secondaryChannels?.length > 0 ? 
                    ` ${campaign.secondaryChannels.join(', ')}` : 
                    ' Nenhum canal secundário definido'}
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <SectionHeader sx={{ mt: 3 }}>
                  Público-Alvo
                </SectionHeader>
                <Typography>{campaign.targetAudience}</Typography>
              </Grid>

              <Grid item xs={12}>
                <SectionHeader sx={{ mt: 3 }}>
                  Mensagens-Chave
                </SectionHeader>
                <Typography>{campaign.keyMessages}</Typography>
              </Grid>
            </Grid>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <SectionHeader>
              Plano de Conteúdo
            </SectionHeader>
            <Divider sx={{ mb: 3 }} />
            
            {campaign.contentPlan.items.length > 0 ? (
              <List disablePadding>
                {campaign.contentPlan.items.map((item) => (
                  <ListItem 
                    key={item.id} 
                    disablePadding
                    sx={{ mb: 2 }}
                  >
                    <ContentCard sx={{ width: '100%' }}>
                      <ListItemText
                        primary={
                          <Typography fontWeight={500}>
                            {item.title}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography component="span" display="block" variant="body2">
                              Tipo: {item.type} | Plataforma: {item.platform} | Natureza: {item.nature}
                            </Typography>
                            <Typography component="span" display="block" variant="body2">
                              Responsável: {item.assignedTo} | Entrega: {formatDate(item.dueDate)}
                              {item.budget && ` | Orçamento: ${formatCurrency(item.budget)}`}
                            </Typography>
                            {item.notes && (
                              <Typography component="span" display="block" variant="body2" sx={{ mt: 1 }}>
                                <strong>Observações:</strong> {item.notes}
                              </Typography>
                            )}
                          </>
                        }
                      />
                    </ContentCard>
                  </ListItem>
                ))}
              </List>
            ) : (
              <ContentCard sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: 100,
                border: '1px dashed rgba(0, 0, 0, 0.12)'
              }}>
                <Typography color="text.secondary">
                  Nenhum item de conteúdo definido
                </Typography>
              </ContentCard>
            )}
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <SectionHeader>
              Progresso da Campanha
            </SectionHeader>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                  Progresso Atual
                </Typography>
                <ContentCard sx={{ 
                  height: 120,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <CircularProgress 
                    variant="determinate" 
                    value={campaign.progressMetrics.targetProgress} 
                    size={80}
                    thickness={6}
                    color={
                      campaign.progressMetrics.targetProgress > 75 ? 'success' :
                      campaign.progressMetrics.targetProgress > 50 ? 'primary' :
                      campaign.progressMetrics.targetProgress > 25 ? 'warning' : 'error'
                    }
                  />
                  <Box sx={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <Typography variant="h6" component="div">
                      {campaign.progressMetrics.targetProgress}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Concluído
                    </Typography>
                  </Box>
                </ContentCard>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                  Estágios de Revisão
                </Typography>
                {campaign.progressMetrics.reviewStages?.length > 0 ? (
                  <ContentCard>
                    <List disablePadding dense>
                      {campaign.progressMetrics.reviewStages.map((stage, index) => (
                        <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                          <ListItemText
                            primary={`${index + 1}. ${stage}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </ContentCard>
                ) : (
                  <ContentCard sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: 100,
                    border: '1px dashed rgba(0, 0, 0, 0.12)'
                  }}>
                    <Typography color="text.secondary">
                      Nenhum estágio de revisão definido
                    </Typography>
                  </ContentCard>
                )}
              </Grid>
            </Grid>
          </Box>
        )}

        {activeTab === 3 && (
          <Box>
            <SectionHeader>
              Fluxo de Aprovação
            </SectionHeader>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ mb: 3 }}>
              <Typography>
                <strong>Requer aprovação:</strong> {campaign.requiresApproval ? 'Sim' : 'Não'}
              </Typography>
            </Box>
            
            {campaign.approvalWorkflow.length > 0 ? (
              <List disablePadding>
                {campaign.approvalWorkflow.map((approver, index) => (
                  <ListItem 
                    key={index} 
                    disablePadding
                    sx={{ mb: 1 }}
                  >
                    <ContentCard sx={{ width: '100%' }}>
                      <ListItemText
                        primary={`${index + 1}. ${approver}`}
                      />
                    </ContentCard>
                  </ListItem>
                ))}
              </List>
            ) : (
              <ContentCard sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: 100,
                border: '1px dashed rgba(0, 0, 0, 0.12)'
              }}>
                <Typography color="text.secondary">
                  Nenhum aprovador definido
                </Typography>
              </ContentCard>
            )}
          </Box>
        )}

        {activeTab === 4 && (
          <Box>
            <SectionHeader>
              Orçamento e Métricas
            </SectionHeader>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                  Distribuição de Orçamento
                </Typography>
                <ContentCard>
                  <Typography><strong>Total:</strong> {formatCurrency(campaign.budget)}</Typography>
                  {campaign.paidTrafficBudget && (
                    <Typography sx={{ mt: 1.5 }}>
                      <strong>Tráfego Pago:</strong> {formatCurrency(campaign.paidTrafficBudget)}
                    </Typography>
                  )}
                  {campaign.contentBudget && (
                    <Typography sx={{ mt: 1.5 }}>
                      <strong>Conteúdo:</strong> {formatCurrency(campaign.contentBudget)}
                    </Typography>
                  )}
                </ContentCard>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                  KPIs Definidos
                </Typography>
                <ContentCard>
                  <Typography><strong>ROAS Mínimo:</strong> {campaign.kpis.roas}x</Typography>
                  <Typography sx={{ mt: 1.5 }}>
                    <strong>CTR Mínimo:</strong> {campaign.kpis.ctr}%
                  </Typography>
                  <Typography sx={{ mt: 1.5 }}>
                    <strong>Taxa de Engajamento:</strong> {campaign.kpis.engagementRate}%
                  </Typography>
                </ContentCard>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight={500} gutterBottom sx={{ mt: 2 }}>
                  Métricas de Sucesso
                </Typography>
                <ContentCard>
                  <Typography>{campaign.successMetrics}</Typography>
                </ContentCard>
              </Grid>
            </Grid>
          </Box>
        )}

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: 2, 
          mt: 4 
        }}>
          <SecondaryButton
            onClick={() => navigate(`/campanhas/${campaign.id}/editar`)}
            startIcon={<FiEdit />}
            disabled={campaign.status === 'completed'}
          >
            {campaign.status === 'completed' ? 'Edição bloqueada' : 'Editar Briefing'}
          </SecondaryButton>
          <PrimaryButton
            onClick={() => navigate(`/campanhas/${campaign.id}/progresso`)}
            startIcon={<FiBarChart2 />}
          >
            Ver Progresso
          </PrimaryButton>
        </Box>
      </GlassPaper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            backdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CampaignDetails;
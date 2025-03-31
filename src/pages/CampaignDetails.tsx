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
  Alert
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
        gap: 2
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
        <Button 
          variant="contained" 
          onClick={() => navigate('/dashboard')}
          sx={{ mt: 2 }}
        >
          Voltar ao Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button 
        startIcon={<FiArrowLeft />} 
        onClick={() => navigate('/dashboard')}
        sx={{ mb: 3 }}
        variant="outlined"
      >
        Voltar ao Dashboard
      </Button>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="h4" sx={{ wordBreak: 'break-word' }}>
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
              sx={{ textTransform: 'capitalize' }}
            />
            <Typography variant="body2" color="text.secondary">
              Criada em: {formatDate(campaign.createdAt)}
            </Typography>
          </Box>
        </Box>

        <Tabs 
          value={activeTab} 
          onChange={(_, newValue) => setActiveTab(newValue)} 
          sx={{ mb: 3 }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Visão Geral" icon={<FiFileText />} />
          <Tab label="Conteúdo" icon={<FiFileText />} />
          <Tab label="Progresso" icon={<FiBarChart2 />} />
          <Tab label="Aprovação" icon={<FiCheckCircle />} />
          <Tab label="Orçamento" icon={<FiDollarSign />} />
        </Tabs>

        {activeTab === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
              Informações Básicas
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography><strong>Template:</strong> {campaign.template || 'Não especificado'}</Typography>
                <Typography sx={{ mt: 1 }}><strong>Objetivo:</strong> {campaign.objective}</Typography>
                <Typography sx={{ mt: 1 }}><strong>Tipo de Campanha:</strong> {campaign.campaignType}</Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>Análise de Concorrentes:</strong> {campaign.competitorAnalysis || 'Não informada'}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography>
                  <strong>Período:</strong> {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>Canal Principal:</strong> {campaign.primaryChannel}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>Canais Secundários:</strong> 
                  {campaign.secondaryChannels?.length > 0 ? 
                    ` ${campaign.secondaryChannels.join(', ')}` : 
                    ' Nenhum canal secundário definido'}
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Público-Alvo
                </Typography>
                <Typography>{campaign.targetAudience}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Mensagens-Chave
                </Typography>
                <Typography>{campaign.keyMessages}</Typography>
              </Grid>
            </Grid>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Plano de Conteúdo
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            {campaign.contentPlan.items.length > 0 ? (
              <List>
                {campaign.contentPlan.items.map((item) => (
                  <ListItem 
                    key={item.id} 
                    sx={{ 
                      border: '1px solid #eee', 
                      mb: 2, 
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        borderColor: 'primary.main'
                      }
                    }}
                  >
                    <ListItemText
                      primary={item.title}
                      secondary={
                        <>
                          <Typography component="span" display="block">
                            Tipo: {item.type} | Plataforma: {item.platform} | Natureza: {item.nature}
                          </Typography>
                          <Typography component="span" display="block">
                            Responsável: {item.assignedTo} | Entrega: {formatDate(item.dueDate)}
                            {item.budget && ` | Orçamento: ${formatCurrency(item.budget)}`}
                          </Typography>
                          {item.notes && (
                            <Typography component="span" display="block" sx={{ mt: 1 }}>
                              <strong>Observações:</strong> {item.notes}
                            </Typography>
                          )}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: 100,
                border: '1px dashed #ccc',
                borderRadius: 1
              }}>
                <Typography color="textSecondary">
                  Nenhum item de conteúdo definido
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Progresso da Campanha
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Progresso Atual
                </Typography>
                <Box sx={{ 
                  height: 120,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 1,
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
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Estágios de Revisão
                </Typography>
                {campaign.progressMetrics.reviewStages?.length > 0 ? (
                  <List dense>
                    {campaign.progressMetrics.reviewStages.map((stage, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemText
                          primary={`${index + 1}. ${stage}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography color="text.secondary">
                    Nenhum estágio de revisão definido
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
        )}

        {activeTab === 3 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Fluxo de Aprovação
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ mb: 3 }}>
              <Typography>
                <strong>Requer aprovação:</strong> {campaign.requiresApproval ? 'Sim' : 'Não'}
              </Typography>
            </Box>
            
            {campaign.approvalWorkflow.length > 0 ? (
              <List>
                {campaign.approvalWorkflow.map((approver, index) => (
                  <ListItem 
                    key={index} 
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 1
                    }}
                  >
                    <ListItemText
                      primary={`${index + 1}. ${approver}`}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: 100,
                border: '1px dashed #ccc',
                borderRadius: 1
              }}>
                <Typography color="textSecondary">
                  Nenhum aprovador definido
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {activeTab === 4 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Orçamento e Métricas
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Distribuição de Orçamento
                </Typography>
                <Typography><strong>Total:</strong> {formatCurrency(campaign.budget)}</Typography>
                {campaign.paidTrafficBudget && (
                  <Typography sx={{ mt: 1 }}>
                    <strong>Tráfego Pago:</strong> {formatCurrency(campaign.paidTrafficBudget)}
                  </Typography>
                )}
                {campaign.contentBudget && (
                  <Typography sx={{ mt: 1 }}>
                    <strong>Conteúdo:</strong> {formatCurrency(campaign.contentBudget)}
                  </Typography>
                )}
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  KPIs Definidos
                </Typography>
                <Typography><strong>ROAS Mínimo:</strong> {campaign.kpis.roas}x</Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>CTR Mínimo:</strong> {campaign.kpis.ctr}%
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>Taxa de Engajamento:</strong> {campaign.kpis.engagementRate}%
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                  Métricas de Sucesso
                </Typography>
                <Typography>{campaign.successMetrics}</Typography>
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
          <Button
            variant="outlined"
            onClick={() => navigate(`/campanhas/${campaign.id}/editar`)}
            startIcon={<FiEdit />}
            disabled={campaign.status === 'completed'}
            sx={{ 
              '&:disabled': {
                borderColor: 'action.disabled',
                color: 'text.disabled'
              }
            }}
          >
            {campaign.status === 'completed' ? 'Edição bloqueada' : 'Editar Briefing'}
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate(`/campanhas/${campaign.id}/progresso`)}
            startIcon={<FiBarChart2 />}
          >
            Ver Progresso
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CampaignDetails;
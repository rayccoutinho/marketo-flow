import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  TextField, 
  InputAdornment,
  Chip,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  styled,
  useTheme,
  Skeleton
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Campaign as CampaignIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Layers as LayersIcon,
  AttachMoney as MoneyIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as TimeIcon,
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowUp as ArrowUpIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import CampaignProgressChart from '../components/CampaignProgressChart';
import ContentStatusChart from '../components/ContentStatusChart';
import TaskCompletionChart from '../components/TaskCompletionChart';

// Componentes estilizados
const GlassPaper = styled(Box)(({ theme }) => ({
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  borderRadius: '12px',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const MetricCard = styled(Box)(({ theme }) => ({
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

const AlertHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
}));

// Tipos de dados
interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused';
  progress: number;
  pendingTasks: number;
  overdueTasks: number;
  channel: string;
  type: string;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  briefingStatus: 'approved' | 'pending' | 'draft';
  contentItems: Array<{
    status: string;
    count: number;
  }>;
}

interface Alert {
  id: string;
  type: 'warning' | 'success' | 'info';
  message: string;
}

const MarketingDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'paused'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [alertsExpanded, setAlertsExpanded] = useState(true);
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  const [isLoading] = useState(false);

  // Dados de exemplo
  const campaignData: Campaign[] = [
    { 
      id: '1',
      name: 'Black Friday 2024', 
      status: 'active',
      progress: 65,
      pendingTasks: 3,
      overdueTasks: 1,
      channel: 'paid',
      type: 'promocional',
      budget: 15000,
      spent: 9800,
      startDate: '2024-11-20',
      endDate: '2024-11-30',
      briefingStatus: 'approved',
      contentItems: [
        { status: 'published', count: 5 },
        { status: 'approved', count: 3 },
        { status: 'in_progress', count: 2 },
        { status: 'not_started', count: 1 }
      ]
    },
    { 
      id: '2', 
      name: 'Natal 2024', 
      status: 'active',
      progress: 42,
      pendingTasks: 7,
      overdueTasks: 2,
      channel: 'organic',
      type: 'branding',
      budget: 20000,
      spent: 8500,
      startDate: '2024-12-01',
      endDate: '2024-12-25',
      briefingStatus: 'approved',
      contentItems: [
        { status: 'published', count: 3 },
        { status: 'approved', count: 4 },
        { status: 'in_progress', count: 5 },
        { status: 'not_started', count: 2 }
      ]
    },
    { 
      id: '3', 
      name: 'Lead Gen - Imóveis', 
      status: 'paused',
      progress: 28,
      pendingTasks: 5,
      overdueTasks: 3,
      channel: 'paid',
      type: 'conversão',
      budget: 12000,
      spent: 6500,
      startDate: '2024-10-15',
      endDate: '2024-11-15',
      briefingStatus: 'pending',
      contentItems: [
        { status: 'published', count: 2 },
        { status: 'approved', count: 1 },
        { status: 'in_progress', count: 3 },
        { status: 'not_started', count: 4 }
      ]
    }
  ];

  const alerts: Alert[] = [
    { id: 'alert1', type: 'warning', message: '3 tarefas atrasadas na campanha Lead Gen - Imóveis' },
    { id: 'alert2', type: 'success', message: 'Briefing da campanha Black Friday aprovado' },
    { id: 'alert3', type: 'info', message: '5 novos conteúdos para revisão no Natal 2024' }
  ];

  // Filtros
  const filteredCampaigns = campaignData.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || campaign.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const visibleAlerts = alerts.filter(alert => !dismissedAlerts.includes(alert.id));

  // Métricas calculadas
  const totalCampaigns = campaignData.length;
  const activeCampaigns = campaignData.filter(c => c.status === 'active').length;
  const avgProgress = Math.round(campaignData.reduce((sum, c) => sum + c.progress, 0) / campaignData.length);
  const totalPendingTasks = campaignData.reduce((sum, c) => sum + c.pendingTasks, 0);
  const totalBudget = campaignData.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaignData.reduce((sum, c) => sum + c.spent, 0);
  const budgetUsage = Math.round((totalSpent / totalBudget) * 100);

  // Status de briefing
  const briefingStatus = {
    approved: campaignData.filter(c => c.briefingStatus === 'approved').length,
    pending: campaignData.filter(c => c.briefingStatus === 'pending').length,
    draft: campaignData.filter(c => c.briefingStatus === 'draft').length
  };

  // Status de conteúdo
  const contentStatus = {
    published: campaignData.flatMap(c => c.contentItems).reduce((sum, item) => item.status === 'published' ? sum + item.count : sum, 0),
    approved: campaignData.flatMap(c => c.contentItems).reduce((sum, item) => item.status === 'approved' ? sum + item.count : sum, 0),
    in_progress: campaignData.flatMap(c => c.contentItems).reduce((sum, item) => item.status === 'in_progress' ? sum + item.count : sum, 0),
    not_started: campaignData.flatMap(c => c.contentItems).reduce((sum, item) => item.status === 'not_started' ? sum + item.count : sum, 0)
  };

  // Manipuladores
  const handleDismissAlert = (alertId: string) => {
    setDismissedAlerts([...dismissedAlerts, alertId]);
  };

  const toggleAlerts = () => {
    setAlertsExpanded(!alertsExpanded);
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 3 },
      minHeight: '100vh',
      background: 'radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.05) 0%, transparent 25%), radial-gradient(circle at 90% 80%, rgba(124, 58, 237, 0.05) 0%, transparent 25%)'
    }}>
      {/* Cabeçalho */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <DashboardIcon sx={{ fontSize: 28, color: 'text.primary', mr: 2 }} />
        <Typography variant="h4" fontWeight={600}>
          Dashboard de Marketing
        </Typography>
      </Box>

      {/* Barra de busca e ações */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { sm: 'center' },
        gap: 2,
        mb: 3
      }}>
        <TextField
          placeholder="Buscar campanhas..."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              width: { xs: '100%', sm: 300 }
            }
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/campaigns/new')}
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            padding: theme.spacing(1.5, 3),
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }
          }}
        >
          Nova Campanha
        </Button>
      </Box>

      {/* Seção de Alertas */}
      {visibleAlerts.length > 0 && (
        <GlassPaper sx={{ padding: 0 }}>
          <AlertHeader onClick={toggleAlerts}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Alertas ({visibleAlerts.length})
              </Typography>
              {alertsExpanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </Box>
            <IconButton 
              size="small" 
              onClick={(e) => {
                e.stopPropagation();
                setDismissedAlerts(alerts.map(alert => alert.id));
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </AlertHeader>
          
          <Collapse in={alertsExpanded}>
            <Box sx={{ p: 2, pt: 0 }}>
              {visibleAlerts.map((alert) => (
                <Box 
                  key={alert.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    mb: 1,
                    borderRadius: '8px',
                    backgroundColor: 
                      alert.type === 'warning' ? 'rgba(234, 179, 8, 0.1)' :
                      alert.type === 'success' ? 'rgba(16, 185, 129, 0.1)' :
                      'rgba(59, 130, 246, 0.1)',
                    border: '1px solid',
                    borderColor: 
                      alert.type === 'warning' ? 'rgba(234, 179, 8, 0.2)' :
                      alert.type === 'success' ? 'rgba(16, 185, 129, 0.2)' :
                      'rgba(59, 130, 246, 0.2)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {alert.type === 'warning' && <WarningIcon color="warning" />}
                    {alert.type === 'success' && <CheckCircleIcon color="success" />}
                    {alert.type === 'info' && <TimeIcon color="info" />}
                    <Typography variant="body2">{alert.message}</Typography>
                  </Box>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDismissAlert(alert.id)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Collapse>
        </GlassPaper>
      )}

      {/* Métricas */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, 
        gap: 3, 
        mb: 3 
      }}>
        <MetricCard>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ 
              p: 1.5,
              borderRadius: '8px',
              backgroundColor: 'rgba(37, 99, 235, 0.1)',
              color: 'primary.main'
            }}>
              <CampaignIcon />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Campanhas Ativas</Typography>
              <Typography variant="h5" fontWeight={600}>{activeCampaigns}/{totalCampaigns}</Typography>
            </Box>
          </Box>
          <Chip 
            label="↑ 5.2%" 
            size="small" 
            sx={{ 
              mt: 1,
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              color: 'success.main'
            }} 
          />
        </MetricCard>

        <MetricCard>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ 
              p: 1.5,
              borderRadius: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              color: 'success.main'
            }}>
              <BarChartIcon />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Progresso Médio</Typography>
              <Typography variant="h5" fontWeight={600}>{avgProgress}%</Typography>
            </Box>
          </Box>
          <Chip 
            label="↑ 2.7%" 
            size="small" 
            sx={{ 
              mt: 1,
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              color: 'success.main'
            }} 
          />
        </MetricCard>

        <MetricCard>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ 
              p: 1.5,
              borderRadius: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: 'error.main'
            }}>
              <LayersIcon />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Tarefas Pendentes</Typography>
              <Typography variant="h5" fontWeight={600}>{totalPendingTasks}</Typography>
            </Box>
          </Box>
          <Chip 
            label="↓ 3.1%" 
            size="small" 
            sx={{ 
              mt: 1,
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: 'error.main'
            }} 
          />
        </MetricCard>

        <MetricCard>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ 
              p: 1.5,
              borderRadius: '8px',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              color: 'secondary.main'
            }}>
              <MoneyIcon />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Orçamento Utilizado</Typography>
              <Typography variant="h5" fontWeight={600}>{budgetUsage}%</Typography>
            </Box>
          </Box>
          <Chip 
            label="↑ 8.4%" 
            size="small" 
            sx={{ 
              mt: 1,
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              color: 'success.main'
            }} 
          />
        </MetricCard>
      </Box>

      {/* Gráficos */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' }, 
        gap: 3, 
        mb: 3 
      }}>
        <GlassPaper>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Progresso das Campanhas
          </Typography>
          <Box sx={{ height: 240 }}>
            <CampaignProgressChart campaigns={campaignData} />
          </Box>
        </GlassPaper>

        <GlassPaper>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Status de Conteúdo
          </Typography>
          <Box sx={{ height: 240 }}>
            <ContentStatusChart data={contentStatus} />
          </Box>
        </GlassPaper>

        <GlassPaper>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Status de Briefing
          </Typography>
          <Box sx={{ height: 240 }}>
            <TaskCompletionChart 
              approved={briefingStatus.approved} 
              pending={briefingStatus.pending} 
              draft={briefingStatus.draft} 
            />
          </Box>
        </GlassPaper>
      </Box>

      {/* Tabela de Campanhas */}
      <GlassPaper>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2
        }}>
          <Typography variant="h6" fontWeight={600}>
            Todas as Campanhas
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            p: 0.5, 
            borderRadius: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.05)'
          }}>
            <Button
              size="small"
              variant={activeTab === 'all' ? 'contained' : 'text'}
              onClick={() => setActiveTab('all')}
              sx={{
                borderRadius: '6px',
                textTransform: 'none',
                minWidth: 80,
                boxShadow: 'none',
                '&.MuiButton-contained': {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  color: 'text.primary'
                }
              }}
            >
              Todos
            </Button>
            <Button
              size="small"
              variant={activeTab === 'active' ? 'contained' : 'text'}
              onClick={() => setActiveTab('active')}
              sx={{
                borderRadius: '6px',
                textTransform: 'none',
                minWidth: 80,
                boxShadow: 'none',
                '&.MuiButton-contained': {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  color: 'text.primary'
                }
              }}
            >
              Ativas
            </Button>
            <Button
              size="small"
              variant={activeTab === 'paused' ? 'contained' : 'text'}
              onClick={() => setActiveTab('paused')}
              sx={{
                borderRadius: '6px',
                textTransform: 'none',
                minWidth: 80,
                boxShadow: 'none',
                '&.MuiButton-contained': {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  color: 'text.primary'
                }
              }}
            >
              Pausadas
            </Button>
          </Box>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ 
                '& .MuiTableCell-root': { 
                  color: 'text.secondary',
                  fontWeight: 600,
                  borderBottomColor: 'divider',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)'
                } 
              }}>
                <TableCell>Campanha</TableCell>
                <TableCell>Progresso</TableCell>
                <TableCell>Tarefas</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Período</TableCell>
                <TableCell>Orçamento</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow 
                  key={campaign.id}
                  hover
                  sx={{ 
                    '&:last-child td': { borderBottom: 0 },
                    '& .MuiTableCell-root': { 
                      borderBottomColor: 'divider',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)'
                    }
                  }}
                >
                  <TableCell>
                    <Typography fontWeight={500}>{campaign.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{campaign.type}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: '100%', maxWidth: 100 }}>
                        <LinearProgress
                          variant="determinate"
                          value={campaign.progress}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: 
                                campaign.progress < 30 ? theme.palette.error.main :
                                campaign.progress < 70 ? theme.palette.warning.main :
                                theme.palette.success.main,
                              borderRadius: 3
                            }
                          }}
                        />
                      </Box>
                      <Typography variant="body2">{campaign.progress}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {campaign.pendingTasks > 0 && (
                        <Chip
                          label={`${campaign.pendingTasks} pendentes`}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(234, 179, 8, 0.1)',
                            color: 'warning.main'
                          }}
                        />
                      )}
                      {campaign.overdueTasks > 0 && (
                        <Chip
                          label={`${campaign.overdueTasks} atrasadas`}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            color: 'error.main'
                          }}
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={campaign.status === 'active' ? 'Ativa' : 'Pausada'}
                      size="small"
                      sx={{
                        backgroundColor: 
                          campaign.status === 'active' ? 'rgba(16, 185, 129, 0.1)' :
                          'rgba(234, 179, 8, 0.1)',
                        color: 
                          campaign.status === 'active' ? 'success.main' :
                          'warning.main'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(campaign.startDate).toLocaleDateString('pt-BR')} - {new Date(campaign.endDate).toLocaleDateString('pt-BR')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      R$ {(campaign.budget / 1000).toFixed(1)}k
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/campaigns/${campaign.id}`)}
                        sx={{
                          color: 'primary.main',
                          '&:hover': {
                            backgroundColor: 'rgba(59, 130, 246, 0.1)'
                          }
                        }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/campaigns/${campaign.id}/progress`)}
                        sx={{
                          color: 'info.main',
                          '&:hover': {
                            backgroundColor: 'rgba(14, 165, 233, 0.1)'
                          }
                        }}
                      >
                        <BarChartIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/campaigns/${campaign.id}/edit`)}
                        sx={{
                          color: 'secondary.main',
                          '&:hover': {
                            backgroundColor: 'rgba(168, 85, 247, 0.1)'
                          }
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </GlassPaper>
    </Box>
  );
};

export default MarketingDashboard;
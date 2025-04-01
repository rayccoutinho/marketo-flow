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
  useTheme
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Campaign as CampaignIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  BarChart as BarChartIcon,
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

// Componentes estilizados modernizados
const DashboardCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  boxShadow: theme.shadows[2],
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-2px)'
  }
}));

const MetricCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4]
  }
}));

// Tipos de dados
interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused';
  progress: number;
  pendingTasks: number;
  overdueTasks: number;
  channel: 'paid' | 'organic';
  type: string;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  briefingStatus: 'approved' | 'pending' | 'draft';
  contentItems: Array<{
    status: 'published' | 'approved' | 'in_progress' | 'not_started';
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

  // Dados de exemplo atualizados
  const campaignData: Campaign[] = [
    { 
      id: '1',
      name: 'Black Friday 2024', 
      status: 'active',
      progress: 78,
      pendingTasks: 2,
      overdueTasks: 0,
      channel: 'paid',
      type: 'Promocional',
      budget: 25000,
      spent: 18500,
      startDate: '2024-11-20',
      endDate: '2024-11-30',
      briefingStatus: 'approved',
      contentItems: [
        { status: 'published', count: 8 },
        { status: 'approved', count: 4 },
        { status: 'in_progress', count: 3 },
        { status: 'not_started', count: 1 }
      ]
    },
    { 
      id: '2', 
      name: 'Natal 2024', 
      status: 'active',
      progress: 65,
      pendingTasks: 5,
      overdueTasks: 1,
      channel: 'organic',
      type: 'Branding',
      budget: 18000,
      spent: 12000,
      startDate: '2024-12-01',
      endDate: '2024-12-25',
      briefingStatus: 'approved',
      contentItems: [
        { status: 'published', count: 6 },
        { status: 'approved', count: 5 },
        { status: 'in_progress', count: 4 },
        { status: 'not_started', count: 2 }
      ]
    }
  ];

  const alerts: Alert[] = [
    { id: 'alert1', type: 'success', message: 'Campanha Black Friday atingiu 78% do progresso' },
    { id: 'alert2', type: 'info', message: 'Novos conteúdos aprovados para revisão' }
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
      background: theme.palette.background.default
    }}>
      {/* Cabeçalho */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 4,
        p: 3,
        borderRadius: '16px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1]
      }}>
        <DashboardIcon sx={{ 
          fontSize: 32, 
          color: theme.palette.primary.main, 
          mr: 2 
        }} />
        <Typography variant="h4" fontWeight={600} sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Marketo Flow Dashboard
        </Typography>
      </Box>

      {/* Barra de busca e ações */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { sm: 'center' },
        gap: 2,
        mb: 4
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
              borderRadius: '12px',
              backgroundColor: theme.palette.background.paper,
              width: { xs: '100%', sm: 320 },
              boxShadow: theme.shadows[1]
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
            borderRadius: '12px',
            textTransform: 'none',
            px: 4,
            py: 1.5,
            boxShadow: theme.shadows[2],
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            '&:hover': {
              boxShadow: theme.shadows[4],
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Nova Campanha
        </Button>
      </Box>

      {/* Seção de Alertas */}
      {visibleAlerts.length > 0 && (
        <DashboardCard sx={{ mb: 4 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              p: 3,
              cursor: 'pointer',
              borderBottom: `1px solid ${theme.palette.divider}`
            }}
            onClick={toggleAlerts}
          >
            <Typography variant="h6" fontWeight={600}>
              Alertas ({visibleAlerts.length})
            </Typography>
            <IconButton size="small">
              {alertsExpanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </IconButton>
          </Box>
          
          <Collapse in={alertsExpanded}>
            <Box sx={{ p: 2 }}>
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
                      alert.type === 'warning' ? 'rgba(255, 193, 7, 0.1)' :
                      alert.type === 'success' ? 'rgba(76, 175, 80, 0.1)' :
                      'rgba(33, 150, 243, 0.1)',
                    border: '1px solid',
                    borderColor: 
                      alert.type === 'warning' ? 'rgba(255, 193, 7, 0.2)' :
                      alert.type === 'success' ? 'rgba(76, 175, 80, 0.2)' :
                      'rgba(33, 150, 243, 0.2)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {alert.type === 'warning' && <WarningIcon color="warning" />}
                    {alert.type === 'success' && <CheckCircleIcon color="success" />}
                    {alert.type === 'info' && <TimeIcon color="info" />}
                    <Typography variant="body2" fontWeight={500}>{alert.message}</Typography>
                  </Box>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDismissAlert(alert.id)}
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Collapse>
        </DashboardCard>
      )}

      {/* Métricas */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, 
        gap: 3, 
        mb: 4 
      }}>
        <MetricCard>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ 
              p: 1.5,
              borderRadius: '12px',
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
              color: theme.palette.primary.main
            }}>
              <CampaignIcon />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Campanhas Ativas</Typography>
              <Typography variant="h4" fontWeight={700}>
                {activeCampaigns}/{totalCampaigns}
              </Typography>
            </Box>
          </Box>
        </MetricCard>

        <MetricCard>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ 
              p: 1.5,
              borderRadius: '12px',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              color: theme.palette.success.main
            }}>
              <BarChartIcon />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Progresso Médio</Typography>
              <Typography variant="h4" fontWeight={700}>
                {avgProgress}%
              </Typography>
            </Box>
          </Box>
        </MetricCard>

        <MetricCard>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ 
              p: 1.5,
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 193, 7, 0.1)',
              color: theme.palette.warning.main
            }}>
              <BarChartIcon />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Tarefas Pendentes</Typography>
              <Typography variant="h4" fontWeight={700}>
                {totalPendingTasks}
              </Typography>
            </Box>
          </Box>
        </MetricCard>

        <MetricCard>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ 
              p: 1.5,
              borderRadius: '12px',
              backgroundColor: 'rgba(156, 39, 176, 0.1)',
              color: theme.palette.secondary.main
            }}>
              <BarChartIcon />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Orçamento Utilizado</Typography>
              <Typography variant="h4" fontWeight={700}>
                {budgetUsage}%
              </Typography>
            </Box>
          </Box>
        </MetricCard>
      </Box>

      {/* Gráficos */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' }, 
        gap: 3, 
        mb: 4 
      }}>
        <CampaignProgressChart campaigns={campaignData} />
        <ContentStatusChart data={contentStatus} />
        <TaskCompletionChart 
          approved={briefingStatus.approved} 
          pending={briefingStatus.pending} 
          draft={briefingStatus.draft} 
        />
      </Box>

      {/* Tabela de Campanhas */}
      <DashboardCard>
        <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6" fontWeight={600}>Todas as Campanhas</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ 
                '& .MuiTableCell-root': { 
                  backgroundColor: theme.palette.background.paper,
                  fontWeight: 600,
                  color: theme.palette.text.secondary
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
                      borderBottom: `1px solid ${theme.palette.divider}`
                    }
                  }}
                >
                  <TableCell>
                    <Typography fontWeight={600}>{campaign.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{campaign.type}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: '100%', maxWidth: 120 }}>
                        <LinearProgress
                          variant="determinate"
                          value={campaign.progress}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              backgroundColor: 
                                campaign.progress < 30 ? theme.palette.error.main :
                                campaign.progress < 70 ? theme.palette.warning.main :
                                theme.palette.success.main
                            }
                          }}
                        />
                      </Box>
                      <Typography variant="body2" fontWeight={500}>
                        {campaign.progress}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {campaign.pendingTasks > 0 && (
                        <Chip
                          label={`${campaign.pendingTasks} pendentes`}
                          size="small"
                          sx={{ backgroundColor: 'rgba(255, 193, 7, 0.1)' }}
                        />
                      )}
                      {campaign.overdueTasks > 0 && (
                        <Chip
                          label={`${campaign.overdueTasks} atrasadas`}
                          size="small"
                          sx={{ backgroundColor: 'rgba(244, 67, 54, 0.1)' }}
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
                          campaign.status === 'active' ? 'rgba(76, 175, 80, 0.1)' :
                          'rgba(255, 193, 7, 0.1)'
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
                      <IconButton size="small" onClick={() => navigate(`/campaigns/${campaign.id}`)}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => navigate(`/campaigns/${campaign.id}/edit`)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
    </Box>
  );
};

export default MarketingDashboard;
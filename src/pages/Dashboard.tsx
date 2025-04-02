import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Avatar,
  Stack,
  IconButton,
  useTheme,
  styled,
  LinearProgress,
  Chip,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Tooltip as MuiTooltip
} from '@mui/material';
import {
  Campaign as CampaignIcon,
  TrendingUp,
  Email,
  Group,
  Add,
  FilterList,
  MoreVert,
  ArrowDropUp,
  Business,
  ArrowDropDown,
  AccountCircle,
  MonetizationOn,
  InfoOutlined,
  DateRange
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

// Componentes estilizados
const GlassCard = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(20px)',
  borderRadius: theme.shape.borderRadius * 3,
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-2px)'
  }
}));

interface Account {
  id: number;
  name: string;
  campaigns: Campaign[];
  metrics: {
    totalCampaigns: number;
    engagementRate: string;
    leads: string;
    conversions: number;
    roi: string;
  };
}

interface Campaign {
  id: number;
  name: string;
  progress: number;
  budget: number;
  spent: number;
  revenue: number;
  channels: string[];
  kpi: string;
  target: string | number;
  status: string;
  type: string;
}

interface AccountSelectorProps {
  accounts: Account[];
  selectedAccount: Account | null;
  onSelect: (account: Account) => void;
}

const AccountSelector: React.FC<AccountSelectorProps> = ({ accounts, selectedAccount, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<AccountCircle />}
        endIcon={<ArrowDropDown />}
        onClick={handleClick}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          py: 1.5,
          px: 3,
          borderColor: 'divider',
          backgroundColor: 'background.paper'
        }}
      >
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="subtitle2" color="text.secondary">
            Conta selecionada
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {selectedAccount?.name || 'Selecione uma conta'}
          </Typography>
        </Box>
      </Button>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 320,
            maxHeight: 400,
            borderRadius: 2,
            mt: 1,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        <MenuItem dense sx={{ pointerEvents: 'none' }}>
          <Typography variant="subtitle2" fontWeight={600}>
            Selecione a conta para gerenciar
          </Typography>
        </MenuItem>
        
        {accounts.map((account) => (
          <MenuItem
            key={account.id}
            selected={selectedAccount?.id === account.id}
            onClick={() => {
              onSelect(account);
              handleClose();
            }}
            sx={{
              py: 1.5,
              borderLeft: selectedAccount?.id === account.id ? '3px solid' : 'none',
              borderColor: 'primary.main'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ 
                bgcolor: selectedAccount?.id === account.id ? 'primary.light' : 'rgba(0, 0, 0, 0.04)', 
                color: selectedAccount?.id === account.id ? 'primary.main' : 'text.secondary'
              }}>
                <Business />
              </Avatar>
              <Box>
                <Typography fontWeight={600}>{account.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {account.campaigns.length} campanhas ativas
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [timeRange, setTimeRange] = useState<string>('month');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaignFilter, setCampaignFilter] = useState<string>('all');

  // Dados simulados de contas/cliente
  const accounts: Account[] = [
    {
      id: 1,
      name: "Marca A",
      campaigns: [
        {
          id: 1,
          name: "Campanha de Performance",
          progress: 65,
          budget: 20000,
          spent: 15000,
          revenue: 45000,
          channels: ['Instagram', 'Facebook Ads', 'Google Ads'],
          kpi: 'Conversões',
          target: 500,
          status: 'active',
          type: 'performance'
        },
        {
          id: 2,
          name: "Campanha de Branding",
          progress: 42,
          budget: 15000,
          spent: 8000,
          revenue: 0,
          channels: ['YouTube', 'LinkedIn'],
          kpi: 'Impressões',
          target: '1M',
          status: 'active',
          type: 'branding'
        }
      ],
      metrics: {
        totalCampaigns: 2,
        engagementRate: '64.2%',
        leads: '2.4K',
        conversions: 124,
        roi: '215%'
      }
    },
    {
      id: 2,
      name: "Marca B",
      campaigns: [
        {
          id: 3,
          name: "Campanha de Vendas",
          progress: 88,
          budget: 30000,
          spent: 28000,
          revenue: 95000,
          channels: ['TikTok', 'Instagram', 'Email Marketing'],
          kpi: 'Vendas',
          target: 1200,
          status: 'active',
          type: 'sales'
        }
      ],
      metrics: {
        totalCampaigns: 1,
        engagementRate: '58.6%',
        leads: '1.2K',
        conversions: 86,
        roi: '239%'
      }
    }
  ];

  // Seleciona a primeira conta por padrão ao carregar
  React.useEffect(() => {
    if (accounts.length > 0 && !selectedAccount) {
      setSelectedAccount(accounts[0]);
    }
  }, [selectedAccount]);

  const handleFilterMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterAnchorEl(null);
  };

  // Dados para gráficos (fictícios)
  const performanceData = [
    { name: 'Jan', value: 4000, kpi: 'Conversões', meta: 3500, roi: 125 },
    { name: 'Fev', value: 3000, kpi: 'Conversões', meta: 3200, roi: 110 },
    { name: 'Mar', value: 6000, kpi: 'Conversões', meta: 5000, roi: 185 },
    { name: 'Abr', value: 2780, kpi: 'Impressões', meta: 3000, roi: 92 },
    { name: 'Mai', value: 1890, kpi: 'Impressões', meta: 2000, roi: 63 },
    { name: 'Jun', value: 2390, kpi: 'Impressões', meta: 2500, roi: 145 }
  ];

  const channelData = [
    { name: 'Instagram', value: 35 },
    { name: 'Facebook', value: 25 },
    { name: 'Google Ads', value: 20 },
    { name: 'Email', value: 15 },
    { name: 'LinkedIn', value: 5 }
  ];

  const roiData = [
    { name: 'Jan', value: 125 },
    { name: 'Fev', value: 110 },
    { name: 'Mar', value: 185 },
    { name: 'Abr', value: 92 },
    { name: 'Mai', value: 63 },
    { name: 'Jun', value: 145 }
  ];

  const COLORS = ['#3b5998', '#E1306C', '#4285F4', '#4B6F9D', '#0077B5'];
  const ROICOLORS = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107'];

  const filteredCampaigns = selectedAccount?.campaigns.filter((campaign) => 
    campaignFilter === 'all' || campaign.id.toString() === campaignFilter
  );

  if (!selectedAccount) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: 3
      }}>
        <Typography variant="h5" fontWeight={600}>
          Selecione uma conta para gerenciar
        </Typography>
        <AccountSelector 
          accounts={accounts} 
          selectedAccount={null} 
          onSelect={setSelectedAccount} 
        />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 },
      background: theme.palette.background.default,
      minHeight: '100vh'
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box>
          <Typography variant="h4" fontWeight={700} sx={{ 
            letterSpacing: '-0.02em',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Painel de Campanhas
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gerenciando: {selectedAccount.name}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <AccountSelector 
            accounts={accounts} 
            selectedAccount={selectedAccount} 
            onSelect={setSelectedAccount} 
          />
          
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={handleFilterMenuOpen}
            sx={{ borderRadius: 2 }}
          >
            Filtros
          </Button>
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterMenuClose}
            PaperProps={{
              sx: {
                p: 2,
                borderRadius: 3,
                minWidth: 300
              }
            }}
          >
            <MenuItem dense sx={{ pointerEvents: 'none' }}>
              <Typography variant="subtitle2" fontWeight={600}>
                Configurar Filtros
              </Typography>
            </MenuItem>
            
            <MenuItem>
              <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                <InputLabel>Período</InputLabel>
                <Select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as string)}
                  label="Período"
                  startAdornment={<DateRange fontSize="small" sx={{ mr: 1 }} />}
                >
                  <MenuItem value="week">Semanal</MenuItem>
                  <MenuItem value="month">Mensal</MenuItem>
                  <MenuItem value="quarter">Trimestral</MenuItem>
                  <MenuItem value="custom">Personalizado</MenuItem>
                </Select>
              </FormControl>
            </MenuItem>
            
            <MenuItem>
              <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                <InputLabel>Campanha</InputLabel>
                <Select
                  value={campaignFilter}
                  onChange={(e) => setCampaignFilter(e.target.value as string)}
                  label="Campanha"
                  startAdornment={<CampaignIcon fontSize="small" sx={{ mr: 1 }} />}
                >
                  <MenuItem value="all">Todas as Campanhas</MenuItem>
                  {selectedAccount.campaigns.map((campaign) => (
                    <MenuItem key={campaign.id} value={campaign.id.toString()}>
                      {campaign.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </MenuItem>
          </Menu>
          
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ borderRadius: 2 }}
          >
            Nova Campanha
          </Button>
        </Box>
      </Box>

      {/* Métricas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <GlassCard sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Avatar sx={{ 
                bgcolor: 'rgba(37, 99, 235, 0.1)', 
                color: theme.palette.primary.main,
                width: 40,
                height: 40
              }}>
                <CampaignIcon />
              </Avatar>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Box>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
              {selectedAccount.metrics.totalCampaigns}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Campanhas Ativas
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ArrowDropUp color="success" />
              <Typography variant="caption" color="success.main" fontWeight={500}>
                12.5% vs período anterior
              </Typography>
            </Box>
          </GlassCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <GlassCard sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Avatar sx={{ 
                bgcolor: 'rgba(76, 175, 80, 0.1)', 
                color: theme.palette.success.main,
                width: 40,
                height: 40
              }}>
                <TrendingUp />
              </Avatar>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Box>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
              {selectedAccount.metrics.engagementRate}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Taxa de Engajamento
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ArrowDropUp color="success" />
              <Typography variant="caption" color="success.main" fontWeight={500}>
                8.7% vs período anterior
              </Typography>
            </Box>
          </GlassCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <GlassCard sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Avatar sx={{ 
                bgcolor: 'rgba(255, 193, 7, 0.1)', 
                color: theme.palette.warning.main,
                width: 40,
                height: 40
              }}>
                <MonetizationOn />
              </Avatar>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Box>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
              {selectedAccount.metrics.roi}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              ROI (Retorno sobre Investimento)
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ArrowDropUp color="success" />
              <Typography variant="caption" color="success.main" fontWeight={500}>
                22.3% vs período anterior
              </Typography>
            </Box>
          </GlassCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <GlassCard sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Avatar sx={{ 
                bgcolor: 'rgba(156, 39, 176, 0.1)', 
                color: theme.palette.secondary.main,
                width: 40,
                height: 40
              }}>
                <Group />
              </Avatar>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Box>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
              {selectedAccount.metrics.conversions}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Conversões
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ArrowDropUp color="success" />
              <Typography variant="caption" color="success.main" fontWeight={500}>
                5.8% vs período anterior
              </Typography>
            </Box>
          </GlassCard>
        </Grid>
      </Grid>

      {/* Gráficos */}
      <Grid container spacing={3}>
        {/* Gráfico de Performance */}
        <Grid item xs={12} lg={8}>
          <GlassCard sx={{ p: 3, height: '100%' }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3
            }}>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  Performance Mensal
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                  <InfoOutlined fontSize="small" sx={{ mr: 0.5 }} />
                  Mostrando dados de {campaignFilter === 'all' ? 'todas as campanhas' : 
                    selectedAccount.campaigns.find((c) => c.id.toString() === campaignFilter)?.name}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <Button 
                  variant={timeRange === 'week' ? 'contained' : 'outlined'} 
                  size="small" 
                  sx={{ borderRadius: 2 }}
                  onClick={() => setTimeRange('week')}
                >
                  Semanal
                </Button>
                <Button 
                  variant={timeRange === 'month' ? 'contained' : 'outlined'} 
                  size="small" 
                  sx={{ borderRadius: 2 }}
                  onClick={() => setTimeRange('month')}
                >
                  Mensal
                </Button>
                <Button 
                  variant={timeRange === 'quarter' ? 'contained' : 'outlined'} 
                  size="small" 
                  sx={{ borderRadius: 2 }}
                  onClick={() => setTimeRange('quarter')}
                >
                  Trimestral
                </Button>
              </Stack>
            </Box>
            
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      borderColor: theme.palette.divider,
                      borderRadius: '12px'
                    }}
                    formatter={(value: number, name: string, props: any) => {
                      const kpi = props.payload.kpi;
                      const meta = props.payload.meta;
                      const roi = props.payload.roi;
                      return [
                        [`${kpi}: ${value.toLocaleString('pt-BR')}`],
                        [`Meta: ${meta.toLocaleString('pt-BR')}`],
                        [`ROI: ${roi}%`]
                      ];
                    }}
                  />
                  <Legend 
                    formatter={(value) => {
                      if (value === 'value') return timeRange === 'week' ? 'Engajamento' : timeRange === 'month' ? 'Conversões' : 'ROI';
                      return value;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={theme.palette.primary.main} 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="meta" 
                    stroke={theme.palette.secondary.main} 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </GlassCard>
        </Grid>

        {/* Gráfico de ROI */}
        <Grid item xs={12} lg={4}>
          <GlassCard sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
              Retorno sobre Investimento (ROI)
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={roiData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      borderColor: theme.palette.divider,
                      borderRadius: '12px'
                    }}
                    formatter={(value: number) => [`${value}%`, 'ROI']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={theme.palette.success.main} 
                    strokeWidth={2}
                    fill={theme.palette.success.light}
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </GlassCard>
        </Grid>

        {/* Distribuição por Canal */}
        <Grid item xs={12} lg={6}>
          <GlassCard sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
              Distribuição por Canal
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`R$ ${(Number(value) * 1000).toLocaleString('pt-BR')}`, 'Investimento']}
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      borderColor: theme.palette.divider,
                      borderRadius: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </GlassCard>
        </Grid>

        {/* ROI por Canal */}
        <Grid item xs={12} lg={6}>
          <GlassCard sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
              ROI por Canal
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(150 - (percent * 100)).toFixed(0)}%`}
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={ROICOLORS[index % ROICOLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${(150 - (Number(value) * 2)).toFixed(0)}%`, 'ROI']}
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      borderColor: theme.palette.divider,
                      borderRadius: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </GlassCard>
        </Grid>
      </Grid>

      {/* Campanhas Ativas */}
      <Grid item xs={12} sx={{ mt: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Campanhas Ativas {campaignFilter !== 'all' ? `- Filtrada` : ''}
        </Typography>
        <Grid container spacing={3}>
          {filteredCampaigns?.map((campaign) => (
            <Grid item xs={12} md={6} key={campaign.id}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <GlassCard sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {campaign.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={`${campaign.type === 'performance' ? 'Performance' : campaign.type === 'branding' ? 'Branding' : 'Vendas'}`}
                        size="small"
                        sx={{ 
                          backgroundColor: 
                            campaign.type === 'performance' ? 'rgba(37, 99, 235, 0.1)' : 
                            campaign.type === 'branding' ? 'rgba(156, 39, 176, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                          color: 
                            campaign.type === 'performance' ? theme.palette.primary.main : 
                            campaign.type === 'branding' ? theme.palette.secondary.main : theme.palette.success.main
                        }}
                      />
                      <Chip
                        label={`KPI: ${campaign.kpi}`}
                        size="small"
                        sx={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', color: 'text.secondary' }}
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Progresso: {campaign.progress}% | Meta: {campaign.target} {campaign.kpi}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={campaign.progress}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                          backgroundColor: 
                            campaign.progress < 30 ? theme.palette.error.main :
                            campaign.progress < 70 ? theme.palette.warning.main :
                            theme.palette.success.main
                        }
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Canais:
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                      {campaign.channels.map((channel: string, index: number) => (
                        <Chip
                          key={index}
                          label={channel}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            borderRadius: 1,
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)'
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Orçamento: R$ {campaign.budget.toLocaleString('pt-BR')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Gasto: R$ {campaign.spent.toLocaleString('pt-BR')}
                    </Typography>
                  </Box>

                  {campaign.revenue > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Receita: R$ {campaign.revenue.toLocaleString('pt-BR')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ROI: {Math.round((campaign.revenue / campaign.spent) * 100)}%
                      </Typography>
                    </Box>
                  )}
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      onClick={() => setSelectedCampaign(campaign)}
                      sx={{ borderRadius: 2 }}
                    >
                      Detalhes
                    </Button>
                    <Button 
                      variant="contained" 
                      size="small" 
                      sx={{ borderRadius: 2 }}
                    >
                      Editar
                    </Button>
                  </Box>
                </GlassCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
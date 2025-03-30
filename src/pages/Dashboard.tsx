import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiDollarSign,
  FiTrendingUp,
  FiUsers,
  FiPieChart,
  FiBarChart2,
  FiGrid,
  FiPlus,
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiPhone,
  FiSearch,
  FiEye,
  FiHeart,
  FiShare2,
  FiMessageSquare
} from 'react-icons/fi';
import BudgetPieChart from '../components/BudgetPieChart';
import PerformanceLineChart from '../components/PerformanceLineChart';
import ChannelBreakdownChart from '../components/ChannelBreakdownChart';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: number;
  colorClass: string;
}

const MetricCard = ({ icon, title, value, change, colorClass }: MetricCardProps) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`bg-gradient-to-br ${colorClass} p-6 rounded-2xl border border-opacity-30 backdrop-blur-sm`}
  >
    <div className="flex items-start justify-between">
      <div>
        <div className={`${colorClass.includes('indigo') ? 'text-indigo-400' : 
                        colorClass.includes('green') ? 'text-green-400' :
                        colorClass.includes('purple') ? 'text-purple-400' : 
                        colorClass.includes('blue') ? 'text-blue-400' :
                        colorClass.includes('pink') ? 'text-pink-400' : 'text-yellow-400'} mb-3`}>
          {icon}
        </div>
        <h3 className="text-sm font-medium text-gray-300">{title}</h3>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full ${change >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
        {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
      </span>
    </div>
  </motion.div>
);

interface AlertCardProps {
  type: 'warning' | 'success' | 'info';
  message: string;
}

const AlertCard = ({ type, message }: AlertCardProps) => {
  const icon = {
    warning: <FiAlertTriangle className="text-yellow-400" size={20} />,
    success: <FiCheckCircle className="text-green-400" size={20} />,
    info: <FiClock className="text-blue-400" size={20} />
  }[type];

  const bgColor = {
    warning: 'bg-yellow-900/20 border-yellow-800/30',
    success: 'bg-green-900/20 border-green-800/30',
    info: 'bg-blue-900/20 border-blue-800/30'
  }[type];

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg ${bgColor} border`}>
      <div className="mt-0.5">{icon}</div>
      <p className="text-sm text-gray-200">{message}</p>
    </div>
  );
};

export default function MarketingDashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Dados de exemplo ampliados para marketing geral
  const campaignData = [
    { 
      id: 1, 
      name: 'Black Friday 2024', 
      status: 'active', 
      channel: 'paid',
      type: 'promocional',
      budget: 15000,
      spent: 9800,
      reach: 125000,
      engagements: 18420,
      clicks: 9240,
      impressions: 250210,
      ctr: 3.7,
      roas: 4.2,
      conversions: 1420,
      leads: 820,
      startDate: '2024-11-20',
      endDate: '2024-11-30'
    },
    { 
      id: 2, 
      name: 'Lançamento de Verão', 
      status: 'paused', 
      channel: 'organic',
      type: 'branding',
      budget: 8000,
      spent: 3200,
      reach: 85000,
      engagements: 12400,
      clicks: 4200,
      impressions: 180000,
      ctr: 2.3,
      roas: 2.1,
      conversions: 610,
      leads: 420,
      startDate: '2024-12-01',
      endDate: '2024-12-31'
    },
    { 
      id: 3, 
      name: 'Lead Gen - Imóveis', 
      status: 'active', 
      channel: 'email',
      type: 'conversão',
      budget: 12000,
      spent: 8950,
      reach: 45000,
      engagements: 8932,
      clicks: 3932,
      impressions: 98000,
      ctr: 4.0,
      roas: 5.1,
      conversions: 1320,
      leads: 920,
      startDate: '2024-10-15',
      endDate: '2024-11-15'
    },
    { 
      id: 4, 
      name: 'Natal 2024', 
      status: 'completed', 
      channel: 'paid',
      type: 'promocional',
      budget: 20000,
      spent: 19500,
      reach: 185000,
      engagements: 32100,
      clicks: 12100,
      impressions: 285000,
      ctr: 4.2,
      roas: 4.8,
      conversions: 2680,
      leads: 1580,
      startDate: '2024-12-01',
      endDate: '2024-12-26'
    },
    { 
      id: 5, 
      name: 'Webinar - Investimentos', 
      status: 'active', 
      channel: 'content',
      type: 'educacional',
      budget: 5000,
      spent: 3200,
      reach: 35000,
      engagements: 8200,
      clicks: 2200,
      impressions: 75000,
      ctr: 2.9,
      roas: 3.2,
      conversions: 420,
      leads: 320,
      startDate: '2024-11-01',
      endDate: '2024-11-30'
    }
  ];

  // Filtrar campanhas
  const filteredCampaigns = campaignData.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || campaign.channel === activeTab;
    return matchesSearch && matchesTab;
  });

  // Métricas calculadas ampliadas
  const totalBudget = campaignData.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = campaignData.reduce((sum, item) => sum + item.spent, 0);
  const activeCampaigns = campaignData.filter(item => item.status === 'active').length;
  const totalReach = campaignData.reduce((sum, item) => sum + item.reach, 0);
  const totalEngagements = campaignData.reduce((sum, item) => sum + item.engagements, 0);
  const totalLeads = campaignData.reduce((sum, item) => sum + item.leads, 0);
  const avgCTR = campaignData.reduce((sum, item) => sum + item.ctr, 0) / campaignData.length;
  const avgROAS = campaignData.reduce((sum, item) => sum + item.roas, 0) / campaignData.length;
  const totalConversions = campaignData.reduce((sum, item) => sum + item.conversions, 0);
  const conversionRate = (totalConversions / campaignData.reduce((sum, item) => sum + item.clicks, 0)) * 100;
  const engagementRate = (totalEngagements / campaignData.reduce((sum, item) => sum + item.reach, 0)) * 100;

  // Dados para gráficos atualizados
  const pieData = [
    { name: 'Ativas', value: campaignData.filter(c => c.status === 'active').length, color: '#6366f1' },
    { name: 'Pausadas', value: campaignData.filter(c => c.status === 'paused').length, color: '#8b5cf6' },
    { name: 'Concluídas', value: campaignData.filter(c => c.status === 'completed').length, color: '#ec4899' }
  ];

  const performanceData = [
    { name: 'Jan', ctr: 1.8, roas: 2.5, conversions: 320, engagements: 4200, reach: 85000 },
    { name: 'Fev', ctr: 2.1, roas: 2.8, conversions: 380, engagements: 5200, reach: 92000 },
    { name: 'Mar', ctr: 2.3, roas: 3.1, conversions: 420, engagements: 6800, reach: 105000 },
    { name: 'Abr', ctr: 2.5, roas: 3.3, conversions: 450, engagements: 7200, reach: 115000 },
    { name: 'Mai', ctr: 2.7, roas: 3.6, conversions: 490, engagements: 8200, reach: 125000 },
    { name: 'Jun', ctr: 2.9, roas: 3.8, conversions: 520, engagements: 9200, reach: 135000 }
  ];

  const channelData = [
    { name: 'Tráfego Pago', value: 45, color: '#4267B2' },
    { name: 'Orgânico', value: 25, color: '#34A853' },
    { name: 'Email', value: 15, color: '#EA4335' },
    { name: 'Conteúdo', value: 10, color: '#FBBC05' },
    { name: 'Parcerias', value: 5, color: '#673AB7' }
  ];

  const campaignTypeData = [
    { name: 'Promocional', value: 40, color: '#6366f1' },
    { name: 'Branding', value: 25, color: '#8b5cf6' },
    { name: 'Conversão', value: 20, color: '#ec4899' },
    { name: 'Educacional', value: 15, color: '#f59e0b' }
  ];

  // Alertas automatizados atualizados
  const alerts = [
    {
      type: 'success' as const,
      message: 'Campanha "Black Friday 2024" com ROAS 40% acima da média (4.2x vs 3.0x)'
    },
    {
      type: 'warning' as const,
      message: 'Aumentar orçamento em "Lead Gen - Imóveis" - apenas 25% do orçamento restante'
    },
    {
      type: 'info' as const,
      message: 'Webinar "Investimentos" com alta taxa de engajamento (23.4%)'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-bold text-white">Dashboard de Marketing</h1>
          <p className="text-gray-400">Visão geral de todas as suas campanhas de marketing</p>
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all"
        >
          <FiPlus size={18} />
          Nova Campanha
        </motion.button>
      </div>

      {/* Alertas Automatizados */}
      <div className="grid grid-cols-1 gap-3 mb-8">
        {alerts.map((alert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AlertCard type={alert.type} message={alert.message} />
          </motion.div>
        ))}
      </div>

      {/* Metric Cards - Atualizadas para marketing geral */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <MetricCard
          icon={<FiDollarSign size={20} />}
          title="Orçamento Total"
          value={`R$ ${(totalBudget / 1000).toFixed(1)}k`}
          change={5.2}
          colorClass="from-indigo-900/20 to-indigo-800/20 border-indigo-800"
        />
        <MetricCard
          icon={<FiUsers size={20} />}
          title="Alcance Total"
          value={`${(totalReach / 1000).toFixed(1)}k`}
          change={12.7}
          colorClass="from-blue-900/20 to-blue-800/20 border-blue-800"
        />
        <MetricCard
          icon={<FiHeart size={20} />}
          title="Engajamentos"
          value={`${(totalEngagements / 1000).toFixed(1)}k`}
          change={8.4}
          colorClass="from-pink-900/20 to-pink-800/20 border-pink-800"
        />
        <MetricCard
          icon={<FiTrendingUp size={20} />}
          title="Leads Gerados"
          value={totalLeads.toString()}
          change={15.1}
          colorClass="from-green-900/20 to-green-800/20 border-green-800"
        />
      </div>

      {/* Charts Section - Ampliada */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        {/* Budget Allocation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FiPieChart className="text-indigo-400" size={20} />
              <h2 className="text-lg font-semibold text-white">Status das Campanhas</h2>
            </div>
            <select className="bg-gray-700/50 text-sm text-gray-300 px-3 py-1 rounded-lg border border-gray-600">
              <option>Últimos 30 dias</option>
              <option>Este mês</option>
              <option>Personalizado</option>
            </select>
          </div>
          <div className="h-64">
            <BudgetPieChart data={pieData} />
          </div>
        </motion.div>

        {/* Performance Trend */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FiBarChart2 className="text-green-400" size={20} />
              <h2 className="text-lg font-semibold text-white">Performance Mensal</h2>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-lg">Engajamento</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-lg">Conversões</button>
              <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg">ROAS</button>
            </div>
          </div>
          <div className="h-64">
            <PerformanceLineChart data={performanceData} />
          </div>
        </motion.div>

        {/* Channel Breakdown */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FiGrid className="text-purple-400" size={20} />
              <h2 className="text-lg font-semibold text-white">Distribuição por Canal</h2>
            </div>
            <select className="bg-gray-700/50 text-sm text-gray-300 px-3 py-1 rounded-lg border border-gray-600">
              <option>Últimos 30 dias</option>
              <option>Este mês</option>
              <option>Personalizado</option>
            </select>
          </div>
          <div className="h-64">
            <ChannelBreakdownChart data={channelData} />
          </div>
        </motion.div>
      </div>

      {/* Additional Marketing Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <MetricCard
          icon={<FiEye size={20} />}
          title="Taxa de CTR"
          value={`${avgCTR.toFixed(2)}%`}
          change={2.4}
          colorClass="from-purple-900/20 to-purple-800/20 border-purple-800"
        />
        <MetricCard
          icon={<FiMessageSquare size={20} />}
          title="Taxa de Engajamento"
          value={`${engagementRate.toFixed(2)}%`}
          change={5.8}
          colorClass="from-yellow-900/20 to-yellow-800/20 border-yellow-800"
        />
        <MetricCard
          icon={<FiShare2 size={20} />}
          title="ROAS Médio"
          value={`${avgROAS.toFixed(1)}x`}
          change={3.1}
          colorClass="from-green-900/20 to-green-800/20 border-green-800"
        />
        <MetricCard
          icon={<FiCheckCircle size={20} />}
          title="Taxa de Conversão"
          value={`${conversionRate.toFixed(1)}%`}
          change={8.1}
          colorClass="from-blue-900/20 to-blue-800/20 border-blue-800"
        />
      </div>

      {/* Campaigns Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-lg font-semibold text-white">Todas as Campanhas</h2>
          
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            {/* Filtros por canal */}
            <div className="flex rounded-lg bg-gray-700/50 p-1 border border-gray-600">
              <button 
                className={`px-3 py-1 text-sm rounded-md ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}
                onClick={() => setActiveTab('all')}
              >
                Todos
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${activeTab === 'paid' ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}
                onClick={() => setActiveTab('paid')}
              >
                <FiDollarSign className="inline mr-1" size={16} /> Pago
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${activeTab === 'organic' ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}
                onClick={() => setActiveTab('organic')}
              >
                <FiTrendingUp className="inline mr-1" size={16} /> Orgânico
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${activeTab === 'email' ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}
                onClick={() => setActiveTab('email')}
              >
                <FiMail className="inline mr-1" size={16} /> Email
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${activeTab === 'content' ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}
                onClick={() => setActiveTab('content')}
              >
                <FiMessageSquare className="inline mr-1" size={16} /> Conteúdo
              </button>
            </div>
            
            {/* Busca */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Filtrar campanhas..." 
                className="bg-gray-700/50 text-gray-300 pl-10 pr-4 py-2 rounded-lg border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                <th className="pb-3 pl-2">Campanha</th>
                <th className="pb-3">Tipo</th>
                <th className="pb-3">Canal</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Alcance</th>
                <th className="pb-3">Engajamento</th>
                <th className="pb-3">Leads</th>
                <th className="pb-3">ROAS</th>
                <th className="pb-3 pr-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors">
                  <td className="py-4 pl-2">
                    <p className="font-medium text-white">{campaign.name}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(campaign.startDate).toLocaleDateString('pt-BR')} - {new Date(campaign.endDate).toLocaleDateString('pt-BR')}
                    </p>
                  </td>
                  <td>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                      campaign.type === 'promocional' ? 'bg-purple-900/30 text-purple-400' :
                      campaign.type === 'branding' ? 'bg-blue-900/30 text-blue-400' :
                      campaign.type === 'conversão' ? 'bg-green-900/30 text-green-400' :
                      'bg-yellow-900/30 text-yellow-400'
                    }`}>
                      {campaign.type === 'promocional' ? 'Promocional' : 
                       campaign.type === 'branding' ? 'Branding' : 
                       campaign.type === 'conversão' ? 'Conversão' : 'Educacional'}
                    </span>
                  </td>
                  <td>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                      campaign.channel === 'paid' ? 'bg-indigo-900/30 text-indigo-400' :
                      campaign.channel === 'organic' ? 'bg-green-900/30 text-green-400' :
                      campaign.channel === 'email' ? 'bg-red-900/30 text-red-400' :
                      'bg-yellow-900/30 text-yellow-400'
                    }`}>
                      {campaign.channel === 'paid' ? 'Tráfego Pago' : 
                       campaign.channel === 'organic' ? 'Orgânico' : 
                       campaign.channel === 'email' ? 'Email' : 'Conteúdo'}
                    </span>
                  </td>
                  <td>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      campaign.status === 'active' ? 'bg-green-900/30 text-green-400' :
                      campaign.status === 'paused' ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-gray-700 text-gray-400'
                    }`}>
                      {campaign.status === 'active' ? 'Ativa' : campaign.status === 'paused' ? 'Pausada' : 'Concluída'}
                    </span>
                  </td>
                  <td className="text-white">{(campaign.reach / 1000).toFixed(1)}k</td>
                  <td className="text-white">{(campaign.engagements / 1000).toFixed(1)}k</td>
                  <td className="text-white">{campaign.leads}</td>
                  <td className={`${campaign.roas > 3 ? 'text-green-400' : 'text-yellow-400'}`}>{campaign.roas.toFixed(1)}x</td>
                  <td className="pr-2">
                    <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
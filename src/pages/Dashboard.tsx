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
  FiFileText,
  FiMessageSquare,
  FiAward
} from 'react-icons/fi';
import BudgetAllocationChart from '../components/BudgetAllocationChart';
import PerformanceTrendChart from '../components/PerformanceTrendChart';
import ChannelPerformanceChart from '../components/ChannelPerformanceChart';
import CampaignTypeDistribution from '../components/CampaignTypeDistribution';

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
                        colorClass.includes('purple') ? 'text-purple-400' : 'text-blue-400'} mb-3`}>
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
  action?: () => void;
}

const AlertCard = ({ type, message, action }: AlertCardProps) => {
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
      <div className="flex-1">
        <p className="text-sm text-gray-200">{message}</p>
        {action && (
          <button 
            onClick={action}
            className="mt-2 text-xs font-medium text-indigo-400 hover:text-indigo-300"
          >
            Ver detalhes
          </button>
        )}
      </div>
    </div>
  );
};

export default function MarketingDashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Dados de exemplo para campanhas integradas
  const campaignData = [
    { 
      id: 1,
      name: 'Black Friday 2024',
      type: 'integrated', // pago + orgânico
      status: 'active',
      channels: ['meta', 'email', 'organic_social'],
      budget: 15000,
      spent: 8200,
      contentProduced: 8,
      engagementRate: 3.2,
      roas: 4.1,
      leads: 1240,
      conversions: 420,
      startDate: '2024-11-20',
      endDate: '2024-11-30',
      briefingStatus: 'approved'
    },
    { 
      id: 2,
      name: 'Brand Awareness - Verão',
      type: 'branding',
      status: 'active',
      channels: ['organic_social', 'pr', 'influencers'],
      budget: 8000,
      spent: 3500,
      contentProduced: 15,
      engagementRate: 4.8,
      roas: null, // não aplicável
      leads: 320,
      conversions: null,
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      briefingStatus: 'approved'
    },
    { 
      id: 3,
      name: 'Geração de Leads - Imóveis',
      type: 'leadgen',
      status: 'active',
      channels: ['google', 'landing_pages', 'email'],
      budget: 12000,
      spent: 6500,
      contentProduced: 5,
      engagementRate: 2.1,
      roas: 3.5,
      leads: 932,
      conversions: 320,
      startDate: '2024-10-15',
      endDate: '2024-11-15',
      briefingStatus: 'changes_requested'
    },
    { 
      id: 4,
      name: 'Natal 2024 - Institucional',
      type: 'institutional',
      status: 'planned',
      channels: ['meta', 'email', 'organic_social', 'website'],
      budget: 20000,
      spent: 0,
      contentProduced: 0,
      engagementRate: null,
      roas: null,
      leads: null,
      conversions: null,
      startDate: '2024-12-01',
      endDate: '2024-12-26',
      briefingStatus: 'pending'
    }
  ];

  // Filtrar campanhas
  const filteredCampaigns = campaignData.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || campaign.type === activeTab;
    return matchesSearch && matchesTab;
  });

  // Métricas calculadas
  const totalBudget = campaignData.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = campaignData.reduce((sum, item) => sum + (item.spent || 0), 0);
  const activeCampaigns = campaignData.filter(item => item.status === 'active').length;
  const avgEngagement = campaignData.reduce((sum, item) => sum + (item.engagementRate || 0), 0) / 
                      campaignData.filter(item => item.engagementRate).length;
  const avgROAS = campaignData.reduce((sum, item) => sum + (item.roas || 0), 0) / 
                 campaignData.filter(item => item.roas).length;
  const totalLeads = campaignData.reduce((sum, item) => sum + (item.leads || 0), 0);
  const totalContent = campaignData.reduce((sum, item) => sum + (item.contentProduced || 0), 0);

  // Dados para gráficos
  const budgetData = [
    { name: 'Tráfego Pago', value: 45, color: '#6366f1' },
    { name: 'Conteúdo', value: 30, color: '#8b5cf6' },
    { name: 'Produção', value: 15, color: '#ec4899' },
    { name: 'Outros', value: 10, color: '#f59e0b' }
  ];

  const performanceData = [
    { name: 'Jan', engagement: 2.8, roas: 2.5, leads: 320 },
    { name: 'Fev', engagement: 3.1, roas: 2.8, leads: 380 },
    { name: 'Mar', engagement: 3.3, roas: 3.1, leads: 420 },
    { name: 'Abr', engagement: 3.5, roas: 3.3, leads: 450 },
    { name: 'Mai', engagement: 3.7, roas: 3.6, leads: 490 },
    { name: 'Jun', engagement: 3.9, roas: 3.8, leads: 520 }
  ];

  const campaignTypeData = [
    { name: 'Institucional', value: 35, color: '#3b82f6' },
    { name: 'E-commerce', value: 25, color: '#6366f1' },
    { name: 'Geração de Leads', value: 20, color: '#8b5cf6' },
    { name: 'Branding', value: 15, color: '#ec4899' },
    { name: 'Outros', value: 5, color: '#f59e0b' }
  ];

  // Alertas automatizados
  const alerts = [
    {
      type: 'success' as const,
      message: 'Campanha "Black Friday" com ROAS 25% acima da média (4.1x vs 3.3x)'
    },
    {
      type: 'warning' as const,
      message: 'Briefing para "Natal 2024" pendente de aprovação há 3 dias'
    },
    {
      type: 'info' as const,
      message: 'Campanha de Branding com engajamento 40% acima da média',
      action: () => setActiveTab('branding')
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
          <h1 className="text-3xl font-bold text-white">Marketing Dashboard</h1>
          <p className="text-gray-400">Visão integrada de todas as campanhas e canais</p>
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
            <AlertCard type={alert.type} message={alert.message} action={alert.action} />
          </motion.div>
        ))}
      </div>

      {/* Metric Cards - Foco em Marketing Integrado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <MetricCard
          icon={<FiDollarSign size={20} />}
          title="Orçamento Total"
          value={`R$ ${totalBudget.toLocaleString('pt-BR')}`}
          change={5.2}
          colorClass="from-indigo-900/20 to-indigo-800/20 border-indigo-800"
        />
        <MetricCard
          icon={<FiTrendingUp size={20} />}
          title="Engajamento Médio"
          value={`${avgEngagement.toFixed(1)}%`}
          change={8.7}
          colorClass="from-green-900/20 to-green-800/20 border-green-800"
        />
        <MetricCard
          icon={<FiUsers size={20} />}
          title="Leads Gerados"
          value={totalLeads.toLocaleString('pt-BR')}
          change={12.4}
          colorClass="from-purple-900/20 to-purple-800/20 border-purple-800"
        />
        <MetricCard
          icon={<FiFileText size={20} />}
          title="Conteúdos Produzidos"
          value={totalContent.toString()}
          change={15.1}
          colorClass="from-blue-900/20 to-blue-800/20 border-blue-800"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        {/* Alocação de Orçamento */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FiPieChart className="text-indigo-400" size={20} />
              <h2 className="text-lg font-semibold text-white">Alocação de Orçamento</h2>
            </div>
            <select className="bg-gray-700/50 text-sm text-gray-300 px-3 py-1 rounded-lg border border-gray-600">
              <option>Últimos 30 dias</option>
              <option>Este mês</option>
              <option>Personalizado</option>
            </select>
          </div>
          <div className="h-64">
            <BudgetAllocationChart data={budgetData} />
          </div>
        </motion.div>

        {/* Performance Mensal */}
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
              <button className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-lg">Leads</button>
              <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg">ROAS</button>
            </div>
          </div>
          <div className="h-64">
            <PerformanceTrendChart data={performanceData} />
          </div>
        </motion.div>
      </div>

      {/* Tipos de Campanha e Canais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        {/* Distribuição por Tipo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FiAward className="text-purple-400" size={20} />
              <h2 className="text-lg font-semibold text-white">Tipos de Campanha</h2>
            </div>
            <select className="bg-gray-700/50 text-sm text-gray-300 px-3 py-1 rounded-lg border border-gray-600">
              <option>Últimos 30 dias</option>
              <option>Este mês</option>
              <option>Personalizado</option>
            </select>
          </div>
          <div className="h-64">
            <CampaignTypeDistribution data={campaignTypeData} />
          </div>
        </motion.div>

        {/* Performance por Canal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FiGrid className="text-blue-400" size={20} />
              <h2 className="text-lg font-semibold text-white">Performance por Canal</h2>
            </div>
            <select className="bg-gray-700/50 text-sm text-gray-300 px-3 py-1 rounded-lg border border-gray-600">
              <option>Últimos 30 dias</option>
              <option>Este mês</option>
              <option>Personalizado</option>
            </select>
          </div>
          <div className="h-64">
            <ChannelPerformanceChart data={performanceData} />
          </div>
        </motion.div>
      </div>

      {/* Lista de Campanhas */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-lg font-semibold text-white">Todas as Campanhas</h2>
          
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            {/* Filtros por tipo */}
            <div className="flex rounded-lg bg-gray-700/50 p-1 border border-gray-600">
              <button 
                className={`px-3 py-1 text-sm rounded-md ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}
                onClick={() => setActiveTab('all')}
              >
                Todos
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${activeTab === 'institutional' ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}
                onClick={() => setActiveTab('institutional')}
              >
                <FiMessageSquare className="inline mr-1" size={16} /> Institucional
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${activeTab === 'leadgen' ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}
                onClick={() => setActiveTab('leadgen')}
              >
                <FiUsers className="inline mr-1" size={16} /> Leads
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${activeTab === 'branding' ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}
                onClick={() => setActiveTab('branding')}
              >
                <FiAward className="inline mr-1" size={16} /> Branding
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
                <th className="pb-3">Status</th>
                <th className="pb-3">Briefing</th>
                <th className="pb-3">Orçamento</th>
                <th className="pb-3">Engajamento</th>
                <th className="pb-3">Leads</th>
                <th className="pb-3">Conteúdos</th>
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
                      campaign.type === 'institutional' ? 'bg-blue-900/30 text-blue-400' :
                      campaign.type === 'leadgen' ? 'bg-purple-900/30 text-purple-400' :
                      campaign.type === 'branding' ? 'bg-pink-900/30 text-pink-400' :
                      'bg-indigo-900/30 text-indigo-400'
                    }`}>
                      {campaign.type === 'institutional' ? 'Institucional' : 
                       campaign.type === 'leadgen' ? 'Geração de Leads' :
                       campaign.type === 'branding' ? 'Branding' : 'Integrada'}
                    </span>
                  </td>
                  <td>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      campaign.status === 'active' ? 'bg-green-900/30 text-green-400' :
                      campaign.status === 'paused' ? 'bg-yellow-900/30 text-yellow-400' :
                      campaign.status === 'planned' ? 'bg-gray-700 text-gray-400' :
                      'bg-gray-800 text-gray-300'
                    }`}>
                      {campaign.status === 'active' ? 'Ativa' : 
                       campaign.status === 'paused' ? 'Pausada' :
                       campaign.status === 'planned' ? 'Planejada' : 'Concluída'}
                    </span>
                  </td>
                  <td>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      campaign.briefingStatus === 'approved' ? 'bg-green-900/30 text-green-400' :
                      campaign.briefingStatus === 'pending' ? 'bg-blue-900/30 text-blue-400' :
                      'bg-yellow-900/30 text-yellow-400'
                    }`}>
                      {campaign.briefingStatus === 'approved' ? 'Aprovado' : 
                       campaign.briefingStatus === 'pending' ? 'Pendente' : 'Alterações'}
                    </span>
                  </td>
                  <td className="text-white">R$ {campaign.budget.toLocaleString('pt-BR')}</td>
                  <td className={`${campaign.engagementRate && campaign.engagementRate > 3 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {campaign.engagementRate ? `${campaign.engagementRate}%` : '-'}
                  </td>
                  <td className="text-white">{campaign.leads ? campaign.leads.toLocaleString('pt-BR') : '-'}</td>
                  <td className="text-white">{campaign.contentProduced || '-'}</td>
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
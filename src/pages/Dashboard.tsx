import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiDollarSign,
  FiCalendar,
  FiUsers,
  FiPieChart,
  FiBarChart2,
  FiGrid,
  FiPlus,
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiSearch,
  FiEye,
  FiFileText,
  FiTrendingUp,
  FiLayers
} from 'react-icons/fi';
import CampaignProgressChart from '../components/CampaignProgressChart';
import ContentStatusChart from '../components/ContentStatusChart';
import TaskCompletionChart from '../components/TaskCompletionChart';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

const MetricCard = ({ icon, title, value, change, trend }: MetricCardProps) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-xl shadow border border-gray-200 hover:shadow-md transition-shadow"
  >
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
      </div>
      <span className={`text-sm px-2 py-1 rounded-full ${
        trend === 'up' ? 'bg-green-100 text-green-800' : 
        trend === 'down' ? 'bg-red-100 text-red-800' : 
        'bg-gray-100 text-gray-800'
      }`}>
        {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {change}%
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
    warning: <FiAlertTriangle className="text-yellow-500" size={18} />,
    success: <FiCheckCircle className="text-green-500" size={18} />,
    info: <FiClock className="text-blue-500" size={18} />
  }[type];

  const bgColor = {
    warning: 'bg-yellow-50 border-yellow-200',
    success: 'bg-green-50 border-green-200',
    info: 'bg-blue-50 border-blue-200'
  }[type];

  const textColor = {
    warning: 'text-yellow-800',
    success: 'text-green-800',
    info: 'text-blue-800'
  }[type];

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${bgColor} ${textColor}`}>
      <div className="mt-0.5">{icon}</div>
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default function MarketingDashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Dados de exemplo integrados com briefing e progresso
  const campaignData = [
    { 
      id: 1, 
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
      id: 2, 
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
      id: 3, 
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

  // Filtrar campanhas
  const filteredCampaigns = campaignData.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || campaign.status === activeTab;
    return matchesSearch && matchesTab;
  });

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

  // Status de conteúdo agregado
  const contentStatus = {
    published: campaignData.flatMap(c => c.contentItems).reduce((sum, item) => item.status === 'published' ? sum + item.count : sum, 0),
    approved: campaignData.flatMap(c => c.contentItems).reduce((sum, item) => item.status === 'approved' ? sum + item.count : sum, 0),
    in_progress: campaignData.flatMap(c => c.contentItems).reduce((sum, item) => item.status === 'in_progress' ? sum + item.count : sum, 0),
    not_started: campaignData.flatMap(c => c.contentItems).reduce((sum, item) => item.status === 'not_started' ? sum + item.count : sum, 0)
  };

  // Alertas
  const alerts = [
    {
      type: 'warning' as const,
      message: '3 tarefas atrasadas na campanha Lead Gen - Imóveis'
    },
    {
      type: 'success' as const,
      message: 'Briefing da campanha Black Friday aprovado'
    },
    {
      type: 'info' as const,
      message: '5 novos conteúdos para revisão no Natal 2024'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard de Campanhas</h1>
          <p className="text-gray-600">Visão geral do progresso e status das campanhas</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar campanhas..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <FiPlus size={18} />
            Nova Campanha
          </button>
        </div>
      </div>

      {/* Alertas */}
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

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <MetricCard
          icon={<FiFileText size={20} />}
          title="Campanhas Ativas"
          value={`${activeCampaigns}/${totalCampaigns}`}
          change={5.2}
          trend="up"
        />
        <MetricCard
          icon={<FiTrendingUp size={20} />}
          title="Progresso Médio"
          value={`${avgProgress}%`}
          change={2.7}
          trend="up"
        />
        <MetricCard
          icon={<FiLayers size={20} />}
          title="Tarefas Pendentes"
          value={totalPendingTasks.toString()}
          change={-3.1}
          trend="down"
        />
        <MetricCard
          icon={<FiDollarSign size={20} />}
          title="Orçamento Utilizado"
          value={`${budgetUsage}%`}
          change={8.4}
          trend="up"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        {/* Progresso das Campanhas */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FiBarChart2 className="text-blue-600" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">Progresso das Campanhas</h2>
            </div>
          </div>
          <div className="h-64">
            <CampaignProgressChart campaigns={campaignData} />
          </div>
        </motion.div>

        {/* Status de Conteúdo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FiPieChart className="text-blue-600" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">Status de Conteúdo</h2>
            </div>
          </div>
          <div className="h-64">
            <ContentStatusChart data={contentStatus} />
          </div>
        </motion.div>

        {/* Status de Briefing */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FiGrid className="text-blue-600" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">Status de Briefing</h2>
            </div>
          </div>
          <div className="h-64">
            <TaskCompletionChart approved={briefingStatus.approved} pending={briefingStatus.pending} draft={briefingStatus.draft} />
          </div>
        </motion.div>
      </div>

      {/* Campanhas Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-xl shadow border border-gray-200"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Todas as Campanhas</h2>
          
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            {/* Filtros por status */}
            <div className="flex rounded-lg bg-gray-100 p-1 border border-gray-300">
              <button 
                className={`px-3 py-1 text-sm rounded-md ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
                onClick={() => setActiveTab('all')}
              >
                Todos
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${activeTab === 'active' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
                onClick={() => setActiveTab('active')}
              >
                Ativas
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${activeTab === 'paused' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
                onClick={() => setActiveTab('paused')}
              >
                Pausadas
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600 text-sm border-b border-gray-200">
                <th className="pb-3 pl-2">Campanha</th>
                <th className="pb-3">Progresso</th>
                <th className="pb-3">Tarefas</th>
                <th className="pb-3">Briefing</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Período</th>
                <th className="pb-3">Orçamento</th>
                <th className="pb-3 pr-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-4 pl-2">
                    <p className="font-medium text-gray-900">{campaign.name}</p>
                    <p className="text-xs text-gray-500">{campaign.type}</p>
                  </td>
                  <td>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          campaign.progress < 30 ? 'bg-red-500' :
                          campaign.progress < 70 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`} 
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{campaign.progress}%</span>
                  </td>
                  <td>
                    <div className="flex gap-1">
                      {campaign.pendingTasks > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                          {campaign.pendingTasks} pendentes
                        </span>
                      )}
                      {campaign.overdueTasks > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                          {campaign.overdueTasks} atrasadas
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      campaign.briefingStatus === 'approved' ? 'bg-green-100 text-green-800' :
                      campaign.briefingStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.briefingStatus === 'approved' ? 'Aprovado' : 
                       campaign.briefingStatus === 'pending' ? 'Pendente' : 'Rascunho'}
                    </span>
                  </td>
                  <td>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status === 'active' ? 'Ativa' : 'Pausada'}
                    </span>
                  </td>
                  <td className="text-sm text-gray-600">
                    {new Date(campaign.startDate).toLocaleDateString('pt-BR')} - {new Date(campaign.endDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="text-sm text-gray-600">
                    R$ {(campaign.budget / 1000).toFixed(1)}k
                  </td>
                  <td className="pr-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                      <FiEye size={14} />
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
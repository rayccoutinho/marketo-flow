import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiEdit,
  FiImage,
  FiVideo,
  FiFileText,
  FiLayers,
  FiCalendar,
  FiUser,
  FiArrowRight,
  FiSearch,
  FiPlus,
  FiTrash2
} from 'react-icons/fi';

// Definindo os tipos
type ContentType = 'image' | 'video' | 'text' | 'banner' | 'story';
type PlatformType = 'instagram' | 'facebook' | 'linkedin' | 'twitter' | 'website';
type StatusType = 'not_started' | 'in_progress' | 'review' | 'approved' | 'published';
type CampaignStatusType = 'planning' | 'active' | 'paused' | 'completed';

interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  platform: PlatformType;
  status: StatusType;
  assignedTo: string;
  dueDate: string;
  progress: number;
  notes?: string;
}

interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: CampaignStatusType;
  contentItems: ContentItem[];
}

// Constantes para status
const STATUS_COLORS: Record<StatusType, string> = {
  not_started: 'bg-gray-500',
  in_progress: 'bg-blue-500',
  review: 'bg-yellow-500',
  approved: 'bg-purple-500',
  published: 'bg-green-500'
};

const STATUS_LABELS: Record<StatusType, string> = {
  not_started: 'Não Iniciado',
  in_progress: 'Em Progresso',
  review: 'Em Revisão',
  approved: 'Aprovado',
  published: 'Publicado'
};

// Ícones para tipos de conteúdo
const TYPE_ICONS: Record<ContentType, JSX.Element> = {
  image: <FiImage className="text-pink-500" />,
  video: <FiVideo className="text-red-500" />,
  text: <FiFileText className="text-blue-500" />,
  banner: <FiLayers className="text-indigo-500" />,
  story: <FiImage className="text-purple-500" />
};

// Cores para plataformas
const PLATFORM_COLORS: Record<PlatformType, string> = {
  instagram: 'bg-gradient-to-r from-pink-500 to-yellow-500',
  facebook: 'bg-blue-600',
  linkedin: 'bg-blue-700',
  twitter: 'bg-blue-400',
  website: 'bg-gray-600'
};

// Componente ProgressBar
const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div 
      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
      style={{ width: `${progress}%` }}
    />
  </div>
);

// Componente StatusBadge
const StatusBadge = ({ status }: { status: StatusType }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${STATUS_COLORS[status]}`}>
    {STATUS_LABELS[status]}
  </span>
);

// Componente ContentItemCard
interface ContentItemCardProps {
  item: ContentItem;
  onEdit: (item: ContentItem) => void;
  onStatusChange: (id: string, status: StatusType) => void;
  onDelete: (id: string) => void;
}

const ContentItemCard = ({ 
  item,
  onEdit,
  onStatusChange,
  onDelete
}: ContentItemCardProps) => {
  const NEXT_STATUS_MAP: Record<StatusType, StatusType | null> = {
    not_started: 'in_progress',
    in_progress: 'review',
    review: 'approved',
    approved: 'published',
    published: null
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow p-4 border border-gray-200 transition-shadow hover:shadow-md"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gray-100 rounded-lg">
            {TYPE_ICONS[item.type]}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 line-clamp-1">{item.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-block w-3 h-3 rounded-full ${PLATFORM_COLORS[item.platform]}`} />
              <span className="text-xs text-gray-500 capitalize">{item.platform}</span>
            </div>
          </div>
        </div>
        <StatusBadge status={item.status} />
      </div>

      <div className="my-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progresso</span>
          <span>{item.progress}%</span>
        </div>
        <ProgressBar progress={item.progress} />
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <FiUser size={14} />
          <span className="truncate max-w-[120px]">{item.assignedTo}</span>
        </div>
        <div className="flex items-center gap-1">
          <FiCalendar size={14} />
          <span>{new Date(item.dueDate).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(item)}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <FiEdit size={14} />
            Editar
          </button>
          <button 
            onClick={() => onDelete(item.id)}
            className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
          >
            <FiTrash2 size={14} />
            Excluir
          </button>
        </div>
        
        <div className="flex gap-2">
          {item.status !== 'not_started' && (
            <button 
              onClick={() => onStatusChange(item.id, 'not_started')}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
            >
              Reiniciar
            </button>
          )}
          <button 
            onClick={() => {
              const nextStatus = NEXT_STATUS_MAP[item.status];
              nextStatus && onStatusChange(item.id, nextStatus);
            }}
            disabled={!NEXT_STATUS_MAP[item.status]}
            className={`text-xs px-2 py-1 rounded flex items-center gap-1 transition-colors ${
              !NEXT_STATUS_MAP[item.status] 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
          >
            Avançar <FiArrowRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Dados iniciais
const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    name: 'Black Friday 2024',
    startDate: '2024-11-20',
    endDate: '2024-11-30',
    status: 'planning',
    contentItems: [
      {
        id: '1-1',
        title: 'Banner Principal - Site',
        type: 'banner',
        platform: 'website',
        status: 'in_progress',
        assignedTo: 'Ana Silva',
        dueDate: '2024-11-10',
        progress: 65,
        notes: 'Precisa incluir promoção de eletrônicos'
      },
      {
        id: '1-2',
        title: 'Post Feed - Produtos em Destaque',
        type: 'image',
        platform: 'instagram',
        status: 'not_started',
        assignedTo: 'Carlos Mendes',
        dueDate: '2024-11-15',
        progress: 0
      }
    ]
  },
  {
    id: '2',
    name: 'Natal 2024',
    startDate: '2024-12-01',
    endDate: '2024-12-25',
    status: 'planning',
    contentItems: [
      {
        id: '2-1',
        title: 'Campanha Natalina - Instagram',
        type: 'story',
        platform: 'instagram',
        status: 'not_started',
        assignedTo: 'João Santos',
        dueDate: '2024-11-25',
        progress: 0
      }
    ]
  }
];

// Componente principal
const ContentProgressPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('1');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState<Omit<ContentItem, 'id'>>({
    title: '',
    type: 'image',
    platform: 'instagram',
    status: 'not_started',
    assignedTo: '',
    dueDate: new Date().toISOString().split('T')[0],
    progress: 0,
    notes: ''
  });

  const currentCampaign = campaigns.find(c => c.id === selectedCampaignId) ?? INITIAL_CAMPAIGNS[0];
  
  const filteredItems = currentCampaign.contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesPlatform = filterPlatform === 'all' || item.platform === filterPlatform;
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const campaignProgress = currentCampaign.contentItems.length > 0
    ? currentCampaign.contentItems.reduce((sum, item) => sum + item.progress, 0) / 
      currentCampaign.contentItems.length
    : 0;

  const handleStatusChange = (itemId: string, newStatus: StatusType) => {
    const updatedCampaigns = campaigns.map(campaign => {
      if (campaign.id === selectedCampaignId) {
        const updatedItems = campaign.contentItems.map(item => {
          if (item.id === itemId) {
            let newProgress = item.progress;
            if (newStatus === 'not_started') newProgress = 0;
            else if (newStatus === 'in_progress') newProgress = Math.max(item.progress, 25);
            else if (newStatus === 'review') newProgress = Math.max(item.progress, 75);
            else if (newStatus === 'approved') newProgress = 90;
            else if (newStatus === 'published') newProgress = 100;
            
            return { ...item, status: newStatus, progress: newProgress };
          }
          return item;
        });
        return { ...campaign, contentItems: updatedItems };
      }
      return campaign;
    });
    setCampaigns(updatedCampaigns);
  };

  const handleEditItem = (item: ContentItem) => {
    // Implementar lógica de edição aqui
    console.log('Editing item:', item);
  };

  const handleDeleteItem = (itemId: string) => {
    const updatedCampaigns = campaigns.map(campaign => {
      if (campaign.id === selectedCampaignId) {
        return {
          ...campaign,
          contentItems: campaign.contentItems.filter(item => item.id !== itemId)
        };
      }
      return campaign;
    });
    setCampaigns(updatedCampaigns);
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.assignedTo) return;
    
    const task: ContentItem = {
      ...newTask,
      id: `task-${Date.now()}`,
      progress: newTask.status === 'published' ? 100 : 
               newTask.status === 'approved' ? 90 :
               newTask.status === 'review' ? 75 :
               newTask.status === 'in_progress' ? 25 : 0
    };

    const updatedCampaigns = campaigns.map(campaign => {
      if (campaign.id === selectedCampaignId) {
        return {
          ...campaign,
          contentItems: [...campaign.contentItems, task]
        };
      }
      return campaign;
    });

    setCampaigns(updatedCampaigns);
    setIsAddingTask(false);
    setNewTask({
      title: '',
      type: 'image',
      platform: 'instagram',
      status: 'not_started',
      assignedTo: '',
      dueDate: new Date().toISOString().split('T')[0],
      progress: 0,
      notes: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Progresso de Conteúdos</h1>
          <p className="text-gray-600">Acompanhe e gerencie o desenvolvimento de materiais</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar conteúdos..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedCampaignId}
            onChange={(e) => setSelectedCampaignId(e.target.value)}
          >
            {campaigns.map(campaign => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-8 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{currentCampaign.name}</h2>
            <p className="text-gray-500">
              {new Date(currentCampaign.startDate).toLocaleDateString('pt-BR')} - {new Date(currentCampaign.endDate).toLocaleDateString('pt-BR')}
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {Math.round(campaignProgress)}%
            </div>
            <div className="text-sm text-gray-500">Progresso Geral</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${campaignProgress}%` }}
          />
        </div>

        <div className="flex gap-3 mb-4">
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Todos os status</option>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
          >
            <option value="all">Todas as plataformas</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="linkedin">LinkedIn</option>
            <option value="twitter">Twitter</option>
            <option value="website">Website</option>
          </select>

          <button
            onClick={() => setIsAddingTask(true)}
            className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiPlus /> Adicionar Tarefa
          </button>
        </div>
      </div>

      {isAddingTask && (
        <div className="bg-white rounded-xl shadow p-6 mb-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Adicionar Nova Tarefa</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                placeholder="Nome da tarefa"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Responsável*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTask.assignedTo}
                onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                placeholder="Quem vai realizar"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTask.type}
                onChange={(e) => setNewTask({...newTask, type: e.target.value as ContentType})}
              >
                <option value="image">Imagem</option>
                <option value="video">Vídeo</option>
                <option value="text">Texto</option>
                <option value="banner">Banner</option>
                <option value="story">Story</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plataforma</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTask.platform}
                onChange={(e) => setNewTask({...newTask, platform: e.target.value as PlatformType})}
              >
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter</option>
                <option value="website">Website</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTask.status}
                onChange={(e) => setNewTask({...newTask, status: e.target.value as StatusType})}
              >
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Entrega</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTask.notes || ''}
                onChange={(e) => setNewTask({...newTask, notes: e.target.value})}
                placeholder="Detalhes importantes"
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsAddingTask(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
              disabled={!newTask.title || !newTask.assignedTo}
            >
              Adicionar Tarefa
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <ContentItemCard
            key={item.id}
            item={item}
            onEdit={handleEditItem}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteItem}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-white rounded-xl shadow p-8 text-center border border-gray-200">
          <p className="text-gray-500">Nenhuma tarefa encontrada</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
              setFilterPlatform('all');
            }}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentProgressPage;
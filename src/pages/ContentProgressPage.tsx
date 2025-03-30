import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiCheckCircle,
  FiClock,
  FiEdit,
  FiImage,
  FiVideo,
  FiFileText,
  FiLayers,
  FiPercent,
  FiCalendar,
  FiUser,
  FiPlus,
  FiSearch,
  FiFilter,
  FiArrowRight
} from 'react-icons/fi';

interface ContentItem {
  id: string;
  title: string;
  type: 'image' | 'video' | 'text' | 'banner' | 'story';
  platform: 'instagram' | 'facebook' | 'linkedin' | 'twitter' | 'website';
  status: 'not_started' | 'in_progress' | 'review' | 'approved' | 'published';
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
  status: 'planning' | 'active' | 'paused' | 'completed';
  contentItems: ContentItem[];
}

const statusColors = {
  not_started: 'bg-gray-500',
  in_progress: 'bg-blue-500',
  review: 'bg-yellow-500',
  approved: 'bg-purple-500',
  published: 'bg-green-500'
};

const typeIcons = {
  image: <FiImage className="text-pink-500" />,
  video: <FiVideo className="text-red-500" />,
  text: <FiFileText className="text-blue-500" />,
  banner: <FiLayers className="text-indigo-500" />,
  story: <FiImage className="text-purple-500" />
};

const platformColors = {
  instagram: 'bg-gradient-to-r from-pink-500 to-yellow-500',
  facebook: 'bg-blue-600',
  linkedin: 'bg-blue-700',
  twitter: 'bg-blue-400',
  website: 'bg-gray-600'
};

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div 
      className="bg-blue-600 h-2.5 rounded-full" 
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

const StatusBadge = ({ status }: { status: ContentItem['status'] }) => {
  const statusText = {
    not_started: 'Não Iniciado',
    in_progress: 'Em Progresso',
    review: 'Em Revisão',
    approved: 'Aprovado',
    published: 'Publicado'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${statusColors[status]}`}>
      {statusText[status]}
    </span>
  );
};

const ContentItemCard = ({ 
  item,
  onEdit,
  onStatusChange
}: {
  item: ContentItem;
  onEdit: (item: ContentItem) => void;
  onStatusChange: (id: string, status: ContentItem['status']) => void;
}) => {
  const nextStatusMap: Record<ContentItem['status'], ContentItem['status'] | null> = {
    not_started: 'in_progress',
    in_progress: 'review',
    review: 'approved',
    approved: 'published',
    published: null
  };

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white rounded-lg shadow p-4 border border-gray-200"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gray-100 rounded-lg">
            {typeIcons[item.type]}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{item.title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`inline-block w-3 h-3 rounded-full ${platformColors[item.platform]}`}></span>
              <span className="text-xs text-gray-500 capitalize">{item.platform}</span>
            </div>
          </div>
        </div>
        <StatusBadge status={item.status} />
      </div>

      <div className="mt-3 mb-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progresso</span>
          <span>{item.progress}%</span>
        </div>
        <ProgressBar progress={item.progress} />
      </div>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center text-gray-500">
          <FiUser className="mr-1" size={14} />
          <span>{item.assignedTo}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <FiCalendar className="mr-1" size={14} />
          <span>{new Date(item.dueDate).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
        <button 
          onClick={() => onEdit(item)}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
        >
          <FiEdit className="mr-1" size={14} />
          Editar
        </button>
        
        <div className="flex space-x-2">
          {item.status !== 'not_started' && (
            <button 
              onClick={() => onStatusChange(item.id, 'not_started')}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
            >
              Reiniciar
            </button>
          )}
          <button 
            onClick={() => {
              const nextStatus = nextStatusMap[item.status];
              if (nextStatus) {
                onStatusChange(item.id, nextStatus);
              }
            }}
            disabled={!nextStatusMap[item.status]}
            className={`text-xs px-2 py-1 rounded hover:bg-blue-200 flex items-center ${
              !nextStatusMap[item.status] 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-100 text-blue-600'
            }`}
          >
            Avançar <FiArrowRight className="ml-1" size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ContentProgressPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
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
        },
        {
          id: '1-3',
          title: 'Vídeo Story - Depoimentos',
          type: 'video',
          platform: 'instagram',
          status: 'review',
          assignedTo: 'Juliana Costa',
          dueDate: '2024-11-12',
          progress: 90
        },
        {
          id: '1-4',
          title: 'Post Informativo - Prazos',
          type: 'text',
          platform: 'linkedin',
          status: 'approved',
          assignedTo: 'Ricardo Almeida',
          dueDate: '2024-11-18',
          progress: 100
        },
        {
          id: '1-5',
          title: 'Story - Contagem Regressiva',
          type: 'story',
          platform: 'facebook',
          status: 'published',
          assignedTo: 'Fernanda Lima',
          dueDate: '2024-11-01',
          progress: 100
        }
      ]
    },
    {
      id: '2',
      name: 'Lançamento Verão 2025',
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      status: 'planning',
      contentItems: [
        {
          id: '2-1',
          title: 'Catálogo Digital',
          type: 'banner',
          platform: 'website',
          status: 'not_started',
          assignedTo: 'Ana Silva',
          dueDate: '2024-11-25',
          progress: 0
        }
      ]
    }
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState<string>('1');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ContentItem | null>(null);

  const currentCampaign = campaigns.find(c => c.id === selectedCampaign) || campaigns[0];
  
  const filteredItems = currentCampaign.contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesPlatform = filterPlatform === 'all' || item.platform === filterPlatform;
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const handleStatusChange = (itemId: string, newStatus: ContentItem['status']) => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === selectedCampaign) {
        return {
          ...campaign,
          contentItems: campaign.contentItems.map(item => {
            if (item.id === itemId) {
              const progress = {
                not_started: 0,
                in_progress: 40,
                review: 80,
                approved: 95,
                published: 100
              }[newStatus];
              
              return { ...item, status: newStatus, progress };
            }
            return item;
          })
        };
      }
      return campaign;
    }));
  };

  const handleEditItem = (item: ContentItem) => {
    setCurrentItem(item);
    setIsEditModalOpen(true);
  };

  const handleSaveItem = (updatedItem: ContentItem) => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === selectedCampaign) {
        return {
          ...campaign,
          contentItems: campaign.contentItems.map(item => 
            item.id === updatedItem.id ? updatedItem : item
          )
        };
      }
      return campaign;
    }));
    setIsEditModalOpen(false);
  };

  const handleAddContent = () => {
    const newItem: ContentItem = {
      id: `new-${Date.now()}`,
      title: 'Novo Conteúdo',
      type: 'image',
      platform: 'instagram',
      status: 'not_started',
      assignedTo: 'Não Atribuído',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      progress: 0
    };
    
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === selectedCampaign) {
        return {
          ...campaign,
          contentItems: [...campaign.contentItems, newItem]
        };
      }
      return campaign;
    }));
    
    setCurrentItem(newItem);
    setIsEditModalOpen(true);
  };

  const calculateCampaignProgress = () => {
    const items = currentCampaign.contentItems;
    if (items.length === 0) return 0;
    
    const totalProgress = items.reduce((sum, item) => sum + item.progress, 0);
    return Math.round(totalProgress / items.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Progresso de Conteúdos</h1>
          <p className="text-gray-600">Acompanhe e gerencie o desenvolvimento de materiais para suas campanhas</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar conteúdos..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
          >
            {campaigns.map(campaign => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Campaign Overview */}
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
              {calculateCampaignProgress()}%
            </div>
            <div className="text-sm text-gray-500">Progresso Geral</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${calculateCampaignProgress()}%` }}
          ></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Não Iniciados</div>
            <div className="text-2xl font-bold">
              {currentCampaign.contentItems.filter(i => i.status === 'not_started').length}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Em Progresso</div>
            <div className="text-2xl font-bold">
              {currentCampaign.contentItems.filter(i => i.status === 'in_progress').length}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Em Revisão</div>
            <div className="text-2xl font-bold">
              {currentCampaign.contentItems.filter(i => i.status === 'review').length}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Concluídos</div>
            <div className="text-2xl font-bold">
              {currentCampaign.contentItems.filter(i => i.status === 'approved' || i.status === 'published').length}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-400" />
            <span className="text-sm text-gray-500">Filtrar:</span>
          </div>
          
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Todos Status</option>
            <option value="not_started">Não Iniciado</option>
            <option value="in_progress">Em Progresso</option>
            <option value="review">Em Revisão</option>
            <option value="approved">Aprovado</option>
            <option value="published">Publicado</option>
          </select>
          
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
          >
            <option value="all">Todas Plataformas</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="linkedin">LinkedIn</option>
            <option value="twitter">Twitter</option>
            <option value="website">Website</option>
          </select>
        </div>
        
        <button
          onClick={handleAddContent}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus />
          <span>Adicionar Conteúdo</span>
        </button>
      </div>

      {/* Content Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <ContentItemCard
              key={item.id}
              item={item}
              onEdit={handleEditItem}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow p-8 text-center border border-gray-200">
          <FiFileText className="mx-auto text-gray-400" size={48} />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Nenhum conteúdo encontrado</h3>
          <p className="mt-2 text-gray-500">Ajuste seus filtros ou adicione novos conteúdos</p>
          <button
            onClick={handleAddContent}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiPlus className="mr-2" />
            Adicionar Conteúdo
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && currentItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-md"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Editar Conteúdo</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={currentItem.title}
                    onChange={(e) => setCurrentItem({...currentItem, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={currentItem.type}
                    onChange={(e) => setCurrentItem({...currentItem, type: e.target.value as any})}
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
                    value={currentItem.platform}
                    onChange={(e) => setCurrentItem({...currentItem, platform: e.target.value as any})}
                  >
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                    <option value="website">Website</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Responsável</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={currentItem.assignedTo}
                    onChange={(e) => setCurrentItem({...currentItem, assignedTo: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de Entrega</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={currentItem.dueDate}
                    onChange={(e) => setCurrentItem({...currentItem, dueDate: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Progresso (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={currentItem.progress}
                    onChange={(e) => setCurrentItem({...currentItem, progress: parseInt(e.target.value) || 0})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={currentItem.status}
                    onChange={(e) => setCurrentItem({...currentItem, status: e.target.value as any})}
                  >
                    <option value="not_started">Não Iniciado</option>
                    <option value="in_progress">Em Progresso</option>
                    <option value="review">Em Revisão</option>
                    <option value="approved">Aprovado</option>
                    <option value="published">Publicado</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    value={currentItem.notes || ''}
                    onChange={(e) => setCurrentItem({...currentItem, notes: e.target.value})}
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleSaveItem(currentItem)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Salvar Alterações
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ContentProgressPage;
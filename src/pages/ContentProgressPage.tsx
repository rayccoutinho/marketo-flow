import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  Button, 
  Select, 
  MenuItem, 
  InputBase, 
  Divider, 
  Chip,
  CircularProgress,
  TextField,
  Paper,
  useTheme,
  styled
} from '@mui/material';
import { 
  Edit as EditIcon,
  Image as ImageIcon,
  Videocam as VideoIcon,
  Description as TextIcon,
  Layers as BannerIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  ArrowForward as ArrowForwardIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

// Componentes estilizados
const GlassPaper = styled(Paper)(({ theme }) => ({
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  borderRadius: '12px',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
}));

const ContentCard = styled(Paper)(({ theme }) => ({
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

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: '8px',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.12)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.24)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    borderWidth: 1,
  },
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    padding: '10px 12px',
    '&:hover': {
      borderColor: 'rgba(0, 0, 0, 0.24)',
    },
    '&:focus': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
    },
  },
}));

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
const STATUS_LABELS: Record<StatusType, string> = {
  not_started: 'Não Iniciado',
  in_progress: 'Em Progresso',
  review: 'Em Revisão',
  approved: 'Aprovado',
  published: 'Publicado'
};

// Mapeamento de status para cores do Material UI
const STATUS_COLORS: Record<StatusType, 'default' | 'primary' | 'warning' | 'secondary' | 'success'> = {
  not_started: 'default',
  in_progress: 'primary',
  review: 'warning',
  approved: 'secondary',
  published: 'success'
};

// Ícones para tipos de conteúdo
const TYPE_ICONS: Record<ContentType, JSX.Element> = {
  image: <ImageIcon color="secondary" />,
  video: <VideoIcon color="error" />,
  text: <TextIcon color="primary" />,
  banner: <BannerIcon color="info" />,
  story: <ImageIcon color="primary" />
};

// Cores para plataformas
const PLATFORM_COLORS: Record<PlatformType, string> = {
  instagram: 'linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)',
  facebook: '#1877f2',
  linkedin: '#0a66c2',
  twitter: '#1da1f2',
  website: '#6b7280'
};

// Componente ProgressBar
const ProgressBar = ({ progress }: { progress: number }) => (
  <Box sx={{ width: '100%', bgcolor: 'divider', borderRadius: 5, height: 8 }}>
    <Box 
      sx={{ 
        bgcolor: 'primary.main', 
        height: 8, 
        borderRadius: 5,
        transition: 'width 0.3s ease',
        width: `${progress}%` 
      }}
    />
  </Box>
);

// Componente StatusBadge corrigido
const StatusBadge = ({ status }: { status: StatusType }) => {
  const color = STATUS_COLORS[status];
  return (
    <Chip 
      label={STATUS_LABELS[status]} 
      color={color}
      size="small"
      sx={{ 
        borderRadius: '6px',
        color: status === 'not_started' ? 'text.primary' : 'common.white'
      }}
    />
  );
};

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
    <motion.div whileHover={{ y: -5 }}>
      <ContentCard sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1.5, bgcolor: 'action.hover', borderRadius: '8px' }}>
              {TYPE_ICONS[item.type]}
            </Box>
            <Box>
              <Typography fontWeight={500} noWrap sx={{ maxWidth: 200 }}>
                {item.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  background: PLATFORM_COLORS[item.platform] 
                }} />
                <Typography variant="body2" color="text.secondary" textTransform="capitalize">
                  {item.platform}
                </Typography>
              </Box>
            </Box>
          </Box>
          <StatusBadge status={item.status} />
        </Box>

        <Box sx={{ my: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">Progresso</Typography>
            <Typography variant="body2" color="text.secondary">{item.progress}%</Typography>
          </Box>
          <ProgressBar progress={item.progress} />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 120 }}>
              {item.assignedTo}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {new Date(item.dueDate).toLocaleDateString('pt-BR')}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              startIcon={<EditIcon />}
              onClick={() => onEdit(item)}
              sx={{ color: 'primary.main', fontSize: 14 }}
            >
              Editar
            </Button>
            <Button
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => onDelete(item.id)}
              sx={{ color: 'error.main', fontSize: 14 }}
            >
              Excluir
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            {item.status !== 'not_started' && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => onStatusChange(item.id, 'not_started')}
                sx={{ 
                  fontSize: 12,
                  borderColor: 'divider',
                  color: 'text.secondary'
                }}
              >
                Reiniciar
              </Button>
            )}
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                const nextStatus = NEXT_STATUS_MAP[item.status];
                nextStatus && onStatusChange(item.id, nextStatus);
              }}
              disabled={!NEXT_STATUS_MAP[item.status]}
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                fontSize: 12,
                '&.Mui-disabled': {
                  bgcolor: 'action.disabledBackground',
                  color: 'text.disabled'
                }
              }}
            >
              Avançar
            </Button>
          </Box>
        </Box>
      </ContentCard>
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
  const theme = useTheme();
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
    <Box sx={{ 
      minHeight: '100vh', 
      p: { xs: 2, md: 3 },
      background: 'radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.05) 0%, transparent 25%), radial-gradient(circle at 90% 80%, rgba(124, 58, 237, 0.05) 0%, transparent 25%)'
    }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', md: 'center' }, 
        gap: 3, 
        mb: 4 
      }}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Progresso de Conteúdos
          </Typography>
          <Typography color="text.secondary">
            Acompanhe e gerencie o desenvolvimento de materiais
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 2, 
          width: { xs: '100%', md: 'auto' }
        }}>
          <Box sx={{ position: 'relative', width: { xs: '100%', sm: 240 } }}>
            <SearchIcon sx={{ 
              position: 'absolute', 
              left: 12, 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: 'text.secondary' 
            }} />
            <StyledInput
              placeholder="Buscar conteúdos..."
              sx={{ pl: 4, width: '100%' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>
          
          <StyledSelect
            value={selectedCampaignId}
            onChange={(e) => setSelectedCampaignId(e.target.value as string)}
            sx={{ minWidth: 200 }}
          >
            {campaigns.map(campaign => (
              <MenuItem key={campaign.id} value={campaign.id}>
                {campaign.name}
              </MenuItem>
            ))}
          </StyledSelect>
        </Box>
      </Box>

      <GlassPaper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {currentCampaign.name}
            </Typography>
            <Typography color="text.secondary">
              {new Date(currentCampaign.startDate).toLocaleDateString('pt-BR')} - {new Date(currentCampaign.endDate).toLocaleDateString('pt-BR')}
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={600} color="primary">
              {Math.round(campaignProgress)}%
            </Typography>
            <Typography variant="body2" color="text.secondary">Progresso Geral</Typography>
          </Box>
        </Box>
        
        <ProgressBar progress={campaignProgress} />

        <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
          <StyledSelect
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as string)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="all">Todos os status</MenuItem>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <MenuItem key={value} value={value}>{label}</MenuItem>
            ))}
          </StyledSelect>

          <StyledSelect
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value as string)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="all">Todas as plataformas</MenuItem>
            <MenuItem value="instagram">Instagram</MenuItem>
            <MenuItem value="facebook">Facebook</MenuItem>
            <MenuItem value="linkedin">LinkedIn</MenuItem>
            <MenuItem value="twitter">Twitter</MenuItem>
            <MenuItem value="website">Website</MenuItem>
          </StyledSelect>

          <PrimaryButton
            startIcon={<AddIcon />}
            onClick={() => setIsAddingTask(true)}
            sx={{ ml: 'auto' }}
          >
            Adicionar Tarefa
          </PrimaryButton>
        </Box>
      </GlassPaper>

      {isAddingTask && (
        <GlassPaper>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Adicionar Nova Tarefa
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
            <TextField
              label="Título*"
              fullWidth
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              placeholder="Nome da tarefa"
            />
            <TextField
              label="Responsável*"
              fullWidth
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
              placeholder="Quem vai realizar"
            />
            <StyledSelect
              label="Tipo"
              fullWidth
              value={newTask.type}
              onChange={(e) => setNewTask({...newTask, type: e.target.value as ContentType})}
            >
              <MenuItem value="image">Imagem</MenuItem>
              <MenuItem value="video">Vídeo</MenuItem>
              <MenuItem value="text">Texto</MenuItem>
              <MenuItem value="banner">Banner</MenuItem>
              <MenuItem value="story">Story</MenuItem>
            </StyledSelect>
            <StyledSelect
              label="Plataforma"
              fullWidth
              value={newTask.platform}
              onChange={(e) => setNewTask({...newTask, platform: e.target.value as PlatformType})}
            >
              <MenuItem value="instagram">Instagram</MenuItem>
              <MenuItem value="facebook">Facebook</MenuItem>
              <MenuItem value="linkedin">LinkedIn</MenuItem>
              <MenuItem value="twitter">Twitter</MenuItem>
              <MenuItem value="website">Website</MenuItem>
            </StyledSelect>
            <StyledSelect
              label="Status"
              fullWidth
              value={newTask.status}
              onChange={(e) => setNewTask({...newTask, status: e.target.value as StatusType})}
            >
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <MenuItem key={value} value={value}>{label}</MenuItem>
              ))}
            </StyledSelect>
            <TextField
              label="Data de Entrega"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newTask.dueDate}
              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
            />
            <Box sx={{ gridColumn: '1 / -1' }}>
              <TextField
                label="Observações"
                fullWidth
                multiline
                rows={3}
                value={newTask.notes || ''}
                onChange={(e) => setNewTask({...newTask, notes: e.target.value})}
                placeholder="Detalhes importantes"
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <SecondaryButton
              onClick={() => setIsAddingTask(false)}
            >
              Cancelar
            </SecondaryButton>
            <PrimaryButton
              onClick={handleAddTask}
              disabled={!newTask.title || !newTask.assignedTo}
            >
              Adicionar Tarefa
            </PrimaryButton>
          </Box>
        </GlassPaper>
      )}

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }, 
        gap: 3 
      }}>
        {filteredItems.map(item => (
          <ContentItemCard
            key={item.id}
            item={item}
            onEdit={handleEditItem}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteItem}
          />
        ))}
      </Box>

      {filteredItems.length === 0 && (
        <GlassPaper sx={{ textAlign: 'center' }}>
          <Typography color="text.secondary" gutterBottom>
            Nenhuma tarefa encontrada
          </Typography>
          <Button
            onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
              setFilterPlatform('all');
            }}
            sx={{ color: 'primary.main' }}
          >
            Limpar filtros
          </Button>
        </GlassPaper>
      )}
    </Box>
  );
};

export default ContentProgressPage;
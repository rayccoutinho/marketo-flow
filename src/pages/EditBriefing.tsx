import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CampaignBriefing from './CampaignBriefing';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { FiArrowLeft } from 'react-icons/fi';

// Interface completa alinhada com a estrutura do projeto
interface CampaignData {
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
  kpis: {
    roas: number;
    ctr: number;
    engagementRate: number;
  };
  competitorAnalysis: string;
  requiresApproval: boolean;
  template: string;
  contentPlan: {
    items: Array<{
      id: string;
      title: string;
      type: string;
      platform: string;
      nature: string;
      dueDate: string;
      assignedTo: string;
      budget?: number;
      notes?: string;
    }>;
  };
  approvalWorkflow: string[];
  status: 'draft' | 'active' | 'paused' | 'completed';
}

// Solução para o erro de tipagem - type assertion com interface estendida
interface CampaignBriefingComponentProps {
  initialValues?: CampaignData;
  onSubmit: (data: CampaignData) => void;
  isEditMode?: boolean;
}

// Criamos um componente tipado explicitamente
const TypedCampaignBriefing = CampaignBriefing as React.FC<CampaignBriefingComponentProps>;

const EditBriefing: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [initialValues, setInitialValues] = React.useState<CampaignData | null>(null);

  React.useEffect(() => {
    const loadCampaign = async () => {
      try {
        const savedCampaigns: CampaignData[] = JSON.parse(localStorage.getItem('campaigns') || '[]');
        const campaignToEdit = savedCampaigns.find((c: CampaignData) => c.id === id);
        
        if (!campaignToEdit) {
          return;
        }

        // Garantir que arrays sejam inicializados se não existirem
        const campaignWithDefaults = {
          ...campaignToEdit,
          secondaryChannels: campaignToEdit.secondaryChannels || [],
          approvalWorkflow: campaignToEdit.approvalWorkflow || [],
          contentPlan: {
            items: campaignToEdit.contentPlan?.items || []
          },
          kpis: campaignToEdit.kpis || {
            roas: 0,
            ctr: 0,
            engagementRate: 0
          }
        };

        setInitialValues(campaignWithDefaults);
      } catch (error) {
        console.error('Erro ao carregar briefing:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCampaign();
  }, [id]);

  const handleSubmit = (data: CampaignData) => {
    try {
      const campaigns: CampaignData[] = JSON.parse(localStorage.getItem('campaigns') || '[]');
      const updatedCampaigns = campaigns.map((c: CampaignData) => 
        c.id === id ? { ...data, id } : c
      );
      localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
      navigate(`/campanhas/${id}`);
    } catch (error) {
      console.error('Erro ao salvar briefing:', error);
      // Adicionar feedback visual para o usuário em caso de erro
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '300px'
      }}>
        <CircularProgress size={60} />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Carregando briefing...
        </Typography>
      </Box>
    );
  }

  if (!initialValues) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Briefing não encontrado
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          O briefing que você está tentando editar não foi encontrado ou não existe mais.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/dashboard')}
          sx={{ mt: 1 }}
          startIcon={<FiArrowLeft />}
        >
          Voltar ao Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <TypedCampaignBriefing 
      initialValues={initialValues} 
      onSubmit={handleSubmit} 
      isEditMode={true} 
    />
  );
};

export default EditBriefing;
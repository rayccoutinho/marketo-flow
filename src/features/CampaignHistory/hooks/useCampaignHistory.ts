// src/features/CampaignHistory/hooks/useCampaignHistory.ts
import { useEffect, useState } from 'react';
import { Campaign } from '../types/campaign';
import { CAMPAIGN_DATA } from '../mocks/campaigns';

export const useCampaignHistory = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        // Simula chamada API
        await new Promise(resolve => setTimeout(resolve, 800));
        setCampaigns(CAMPAIGN_DATA);
      } catch (err) {
        setError('Erro ao carregar histórico de campanhas');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return { campaigns, loading, error };
};
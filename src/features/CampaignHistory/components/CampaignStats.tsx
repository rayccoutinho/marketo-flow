// src/features/CampaignHistory/components/CampaignStats.tsx
import { Campaign } from '../types/campaign';

interface CampaignStatsProps {
  campaigns: Campaign[];
}

export const CampaignStats = ({ campaigns }: CampaignStatsProps) => {
  const totalCampaigns = campaigns.length;
  const totalInvestment = campaigns.reduce((sum, c) => sum + c.investment, 0);
  const avgROI = campaigns.length > 0 
    ? (campaigns.reduce((sum, c) => sum + c.roi, 0) / campaigns.length)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Total de Campanhas</h3>
        <p className="text-2xl font-semibold">{totalCampaigns}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Investimento Total</h3>
        <p className="text-2xl font-semibold">
          {new Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
          }).format(totalInvestment)}
        </p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">ROI Médio</h3>
        <p className={`text-2xl font-semibold ${avgROI >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {avgROI.toFixed(1)}%
        </p>
      </div>
    </div>
  );
};
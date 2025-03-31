// src/features/CampaignHistory/CampaignHistoryPage.tsx
import { CampaignHistoryTable } from './components/CampaignHistoryTable';
import { CampaignStats } from './components/CampaignStats';
import { useCampaignHistory } from './hooks/useCampaignHistory';

export default function CampaignHistoryPage() {
  const { campaigns, loading } = useCampaignHistory(); // Removido 'error' que não era usado

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Histórico de Campanhas</h1>
        <p className="text-gray-600">Visualize o desempenho das suas campanhas anteriores</p>
      </header>

      <CampaignStats campaigns={campaigns} />
      
      <div className="mt-8 bg-white rounded-lg shadow">
        <CampaignHistoryTable campaigns={campaigns} loading={loading} />
      </div>
    </div>
  );
}
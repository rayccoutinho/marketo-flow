// src/features/CampaignHistory/components/CampaignHistoryTable.tsx
import { Campaign } from '../types/campaign';

interface CampaignHistoryTableProps {
  campaigns: Campaign[];
  loading: boolean;
}

const StatusBadge = ({ status }: { status: Campaign['status'] }) => {
  const statusMap = {
    active: { color: 'bg-blue-100 text-blue-800', label: 'Ativa' },
    completed: { color: 'bg-green-100 text-green-800', label: 'Concluída' },
    paused: { color: 'bg-yellow-100 text-yellow-800', label: 'Pausada' }
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${statusMap[status].color}`}>
      {statusMap[status].label}
    </span>
  );
};

export const CampaignHistoryTable = ({ campaigns, loading }: CampaignHistoryTableProps) => {
  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Carregando histórico de campanhas...
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        Nenhuma campanha encontrada
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Campanha
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Período
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Investimento
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ROI
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {campaigns.map((campaign) => (
            <tr key={campaign.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{campaign.name}</div>
                <div className="text-sm text-gray-500">{campaign.channel}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(campaign.startDate).toLocaleDateString()} -{' '}
                {new Date(campaign.endDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(campaign.investment)}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                campaign.roi >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {campaign.roi > 0 ? '+' : ''}{campaign.roi}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={campaign.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
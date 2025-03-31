import { FiAlertTriangle, FiTrendingUp } from 'react-icons/fi';
import InsightCard, { Insight } from './InsightCard';

interface PriorityInsightsProps {
  insights: Insight[];
}

export default function PriorityInsights({ insights }: PriorityInsightsProps) {
  const criticalInsights = insights.filter(i => i.priority === 'critical');
  const highInsights = insights.filter(i => i.priority === 'high');

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        Insights Prioritários
      </h2>

      {criticalInsights.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 text-red-600 mb-3">
            <FiAlertTriangle />
            <h3 className="font-medium">Requer atenção imediata</h3>
          </div>
          <div className="grid gap-4">
            {criticalInsights.map((insight) => (
              <InsightCard 
                key={insight.id} 
                insight={insight} 
                className="border-red-100 bg-red-50" 
              />
            ))}
          </div>
        </div>
      )}

      {highInsights.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-yellow-600 mb-3">
            <FiTrendingUp />
            <h3 className="font-medium">Oportunidades importantes</h3>
          </div>
          <div className="grid gap-4">
            {highInsights.map((insight) => (
              <InsightCard 
                key={insight.id} 
                insight={insight} 
                className="border-yellow-100 bg-yellow-50" 
              />
            ))}
          </div>
        </div>
      )}

      {insights.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhum insight prioritário no momento
        </div>
      )}
    </div>
  );
}
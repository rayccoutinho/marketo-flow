// src/features/Insights/components/InsightCard.tsx
import { Insight } from '../types/insight';

interface InsightCardProps {
  insight: Insight;
  className?: string;
}

// Exportação nomeada (adicione "export" antes da declaração)
export const InsightCard = ({ insight, className = '' }: InsightCardProps) => {
  return (
    <div className={`p-4 border rounded-lg ${className}`}>
      <h3 className="font-bold text-gray-800">{insight.title}</h3>
      <p className="text-gray-600 mt-1">{insight.description}</p>
      {insight.suggestedAction && (
        <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-700">
          <span className="font-medium">Ação sugerida:</span> {insight.suggestedAction}
        </div>
      )}
    </div>
  );
};

// Remova o "export default" se optar por usar apenas exportação nomeada
// src/features/Insights/components/PriorityInsights.tsx
import { FiAlertTriangle, FiTrendingUp } from 'react-icons/fi';
import { InsightCard } from './InsightCard';
import { Insight, InsightPriority } from '../types/insight';

interface PriorityInsightsProps {
  insights?: Insight[];
}

export default function PriorityInsights({ insights = [] }: PriorityInsightsProps) {
  // Filtrando insights por prioridade com tipagem segura
  const criticalInsights = insights.filter((i): i is Insight & { priority: 'high' } => 
    i.priority === 'high'
  );
  
  const highInsights = insights.filter((i): i is Insight & { priority: 'medium' } => 
    i.priority === 'medium'
  );

  return (
    <div className="mb-8">
      <header className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          Insights Prioritários
        </h2>
        <p className="text-sm text-gray-500">
          Análises que requerem sua atenção imediata
        </p>
      </header>

      {/* Seção de Insights Críticos */}
      {criticalInsights.length > 0 && (
        <section className="mb-8" aria-labelledby="critical-insights-heading">
          <div className="flex items-center gap-2 text-red-600 mb-3">
            <FiAlertTriangle className="text-lg" aria-hidden="true" />
            <h3 id="critical-insights-heading" className="font-medium">
              Requer atenção imediata
            </h3>
          </div>
          <div className="grid gap-4">
            {criticalInsights.map((insight) => (
              <InsightCard 
                key={insight.id}
                insight={insight}
                className="border-red-200 bg-red-50 hover:bg-red-100 transition-colors"
              />
            ))}
          </div>
        </section>
      )}

      {/* Seção de Insights Importantes */}
      {highInsights.length > 0 && (
        <section aria-labelledby="high-insights-heading">
          <div className="flex items-center gap-2 text-yellow-600 mb-3">
            <FiTrendingUp className="text-lg" aria-hidden="true" />
            <h3 id="high-insights-heading" className="font-medium">
              Oportunidades importantes
            </h3>
          </div>
          <div className="grid gap-4">
            {highInsights.map((insight) => (
              <InsightCard
                key={insight.id}
                insight={insight}
                className="border-yellow-200 bg-yellow-50 hover:bg-yellow-100 transition-colors"
              />
            ))}
          </div>
        </section>
      )}

      {/* Estado vazio */}
      {insights.length === 0 && (
        <div 
          className="text-center py-8 text-gray-500 rounded-lg bg-gray-50"
          aria-live="polite"
        >
          Nenhum insight prioritário no momento
        </div>
      )}
    </div>
  );
}
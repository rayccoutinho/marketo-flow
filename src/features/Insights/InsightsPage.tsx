// src/features/insights/InsightsPage.tsx
import { useInsights } from './hooks/useInsights';
import { InsightCard } from './components/InsightCard';
import { Filters } from './components/Filters';

// Mude para exportação padrão
const InsightsPage = () => {
  const { insights, loading, error, filters, setFilters } = useInsights();

  if (loading) return <div className="p-4">Carregando insights...</div>;
  if (error) return <div className="p-4 text-red-500">Erro: {error}</div>;

  return (
    <div className="p-4">
      <Filters filters={filters} setFilters={setFilters} />
      
      {insights.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          Nenhum insight encontrado com os filtros atuais
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InsightsPage; // Exportação padrão adicionada
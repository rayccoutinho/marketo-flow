import { INSIGHTS_DATA } from "@/mocks/insights"; // Corrigido o caminho de importação
import InsightCard from "./components/InsightCard";
import { Insight } from "@/types/insight"; // Adicionado importação do tipo

export default function InsightsPage() {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Insights Automatizados</h1>
        <p className="text-gray-600">
          Análises geradas para otimizar suas campanhas
        </p>
      </header>

      <div className="grid gap-6">
        {INSIGHTS_DATA.map((insight: Insight) => ( // Adicionado tipo explicitamente
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </div>
  );
}
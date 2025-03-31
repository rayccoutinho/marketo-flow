import { INSIGHTS_DATA } from "@/mocks/insights";
import InsightCard from "./components/InsightCard";

export default function InsightsPage() {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Insights Automatizados</h1>
        <p className="text-gray-600">
          Análises geradas para otimizar suas campanhas
        </p>
      </header>

      {/* Filtros (implementar depois) */}
      <div className="grid gap-6">
        {INSIGHTS_DATA.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </div>
  );
}
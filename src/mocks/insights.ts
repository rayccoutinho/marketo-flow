import { Insight } from "@/types/insight";

export const INSIGHTS_DATA: Insight[] = [
  {
    id: "1",
    title: "Melhor horário para posts no Instagram",
    description: "Seus conteúdos têm 32% mais engajamento entre 19h-21h",
    type: "engagement",
    channel: "instagram",
    priority: "high",
    suggestedAction: "Agendar posts para este horário",
    date: "2024-05-15",
    metrics: {
      current: 32,
      benchmark: 22,
      unit: "%"
    }
  },
  // ... outros insights
];

// Exportações para filtros
export const INSIGHT_TYPES = [
  { value: "performance", label: "Desempenho" },
  // ... outros tipos
] as const;

export const CHANNEL_OPTIONS = [
  { value: "instagram", label: "Instagram" },
  // ... outros canais
] as const;
// src/features/Insights/types/insight.ts
export type InsightPriority = 'high' | 'medium' | 'low'; // Ajuste conforme necessário

export interface InsightMetrics {
  current: number;
  benchmark: number;
  unit: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: string;
  channel: string;
  priority: InsightPriority;
  suggestedAction: string;
  date: string;
  metrics: InsightMetrics;
}

export interface InsightFilter {
  type?: string;
  channel?: string;
  search?: string;
}
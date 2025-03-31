export type InsightPriority = "high" | "medium" | "critical";
export type InsightType = "performance" | "engagement" | "budget" | "content";

export interface InsightMetrics {
  current: number;
  benchmark: number;
  unit?: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: InsightType;
  channel: string;
  priority: InsightPriority;
  suggestedAction: string;
  date: string;
  metrics?: InsightMetrics;
}
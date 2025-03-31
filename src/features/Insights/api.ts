// src/features/insights/api.ts
import { INSIGHTS_DATA } from './mocks/insights';
import { Insight, InsightFilter } from './types/insight';

export const fetchInsights = async (
  filters: InsightFilter
): Promise<Insight[]> => {
  // Simula delay de API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return INSIGHTS_DATA.filter(insight => {
    if (filters.type && insight.type !== filters.type) return false;
    if (filters.channel && insight.channel !== filters.channel) return false;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      return (
        insight.title.toLowerCase().includes(search) ||
        insight.description.toLowerCase().includes(search)
      );
    }
    return true;
  });
};
// src/features/insights/hooks/useInsights.ts
import { useEffect, useState } from 'react';
import { Insight, InsightFilter } from '../types/insight';
import { fetchInsights } from '../api'; // Mock ou API real

export const useInsights = (initialFilters: InsightFilter = {}) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchInsights(filters);
        setInsights(data);
      } catch (err) {
        setError('Failed to load insights');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filters]);

  return { insights, loading, error, filters, setFilters };
};
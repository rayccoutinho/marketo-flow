import { useState, useEffect } from 'react';
import { Alert, AlertFilter } from '../types/alert';
import { ALERTS_DATA } from '../mocks/alerts';

export const useAlerts = (filters: AlertFilter) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        // Simula chamada API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Aplica filtros
        let filteredAlerts = [...ALERTS_DATA];
        
        if (filters.search) {
          const search = filters.search.toLowerCase();
          filteredAlerts = filteredAlerts.filter(a => 
            a.title.toLowerCase().includes(search) || 
            a.message.toLowerCase().includes(search)
          );
        }
        
        if (filters.severity) {
          filteredAlerts = filteredAlerts.filter(a => a.severity === filters.severity);
        }
        
        if (filters.channel) {
          filteredAlerts = filteredAlerts.filter(a => a.channel === filters.channel);
        }
        
        setAlerts(filteredAlerts);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao carregar alertas'));
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [filters]);

  return { alerts, loading, error };
};
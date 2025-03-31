// src/features/insights/components/Filters.tsx
import { InsightFilter } from '../types/insight';

interface FiltersProps {
  filters: InsightFilter;
  setFilters: (filters: InsightFilter) => void;
}

export const Filters = ({ filters, setFilters }: FiltersProps) => {
  return (
    <div className="flex gap-4 mb-6">
      <select
        value={filters.type || ''}
        onChange={(e) => setFilters({ ...filters, type: e.target.value || undefined })}
        className="p-2 border rounded"
      >
        <option value="">Todos os tipos</option>
        <option value="performance">Desempenho</option>
        <option value="engagement">Engajamento</option>
        <option value="content">Conteúdo</option>
      </select>

      <select
        value={filters.channel || ''}
        onChange={(e) => setFilters({ ...filters, channel: e.target.value || undefined })}
        className="p-2 border rounded"
      >
        <option value="">Todos os canais</option>
        <option value="instagram">Instagram</option>
        <option value="facebook">Facebook</option>
        <option value="google-ads">Google Ads</option>
      </select>

      <input
        type="text"
        placeholder="Buscar insights..."
        value={filters.search || ''}
        onChange={(e) => setFilters({ ...filters, search: e.target.value || undefined })}
        className="p-2 border rounded flex-grow"
      />
    </div>
  );
};
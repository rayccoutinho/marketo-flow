import { FiFilter, FiX } from 'react-icons/fi';

interface FiltersPanelProps {
  channels: string[];
  selectedChannel: string;
  onChannelChange: (channel: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  onClearFilters: () => void;
}

export default function FiltersPanel({
  channels,
  selectedChannel,
  onChannelChange,
  selectedType,
  onTypeChange,
  onClearFilters
}: FiltersPanelProps) {
  const insightTypes = [
    { value: 'all', label: 'Todos os tipos' },
    { value: 'performance', label: 'Desempenho' },
    { value: 'engagement', label: 'Engajamento' },
    { value: 'budget', label: 'Orçamento' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 font-medium">
          <FiFilter className="text-blue-500" />
          Filtros
        </h3>
        <button 
          onClick={onClearFilters}
          className="text-sm flex items-center gap-1 text-gray-500 hover:text-gray-700"
        >
          <FiX size={14} />
          Limpar tudo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Filtro por Canal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plataforma
          </label>
          <select
            value={selectedChannel}
            onChange={(e) => onChannelChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Todas plataformas</option>
            {channels.map((channel) => (
              <option key={channel} value={channel}>
                {channel.charAt(0).toUpperCase() + channel.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Tipo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Insight
          </label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {insightTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
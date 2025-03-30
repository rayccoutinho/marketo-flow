// src/components/MetricTabs.tsx
import { useState } from 'react';

interface MetricTab {
  id: string;
  label: string;
  component: React.ReactNode;
}

export const MetricTabs = ({ tabs }: { tabs: MetricTab[] }) => {
  // Adicionando verificação para tabs vazia
  const [activeTab, setActiveTab] = useState(tabs.length > 0 ? tabs[0].id : '');

  // Se não houver tabs, retorna null ou uma mensagem
  if (tabs.length === 0) {
    return <div className="bg-white rounded-xl shadow p-6">No tabs available</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-colors duration-200`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-6">
        {tabs.find((tab) => tab.id === activeTab)?.component || (
          <div>No content available for this tab</div>
        )}
      </div>
    </div>
  );
};
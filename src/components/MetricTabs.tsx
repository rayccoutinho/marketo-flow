// src/components/MetricTabs.tsx
interface MetricTab {
    id: string;
    label: string;
    component: React.ReactNode;
  }
  
  export const MetricTabs = ({ tabs }: { tabs: MetricTab[] }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    
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
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          {tabs.find(tab => tab.id === activeTab)?.component}
        </div>
      </div>
    );
  };
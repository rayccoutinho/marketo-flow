import React, { useState } from 'react';
import { FiSettings, FiCheckCircle, FiAlertCircle, FiLink, FiExternalLink } from 'react-icons/fi';

const IntegrationSettings = () => {
  const [activeTab, setActiveTab] = useState<'connected' | 'available'>('connected');

  const connectedIntegrations = [
    {
      id: 1,
      name: 'Google Ads',
      logo: 'https://logo.clearbit.com/google.com',
      status: 'active',
      lastSync: 'Hoje, 09:42'
    },
    {
      id: 2,
      name: 'Meta Ads',
      logo: 'https://logo.clearbit.com/meta.com',
      status: 'active',
      lastSync: 'Hoje, 08:15'
    },
    {
      id: 3,
      name: 'Google Analytics',
      logo: 'https://logo.clearbit.com/analytics.google.com',
      status: 'error',
      lastSync: 'Ontem, 14:30'
    }
  ];

  const availableIntegrations = [
    {
      id: 4,
      name: 'Slack',
      logo: 'https://logo.clearbit.com/slack.com',
      description: 'Receba notificações e gerencie tarefas'
    },
    {
      id: 5,
      name: 'Mailchimp',
      logo: 'https://logo.clearbit.com/mailchimp.com',
      description: 'Sincronize suas listas de email'
    },
    {
      id: 6,
      name: 'Zapier',
      logo: 'https://logo.clearbit.com/zapier.com',
      description: 'Conecte com +3000 aplicativos'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-8">
        <FiSettings className="text-2xl text-gray-700 mr-3" />
        <h1 className="text-2xl font-bold text-gray-800">Configurações de Integração</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'connected' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('connected')}
            >
              Conectadas ({connectedIntegrations.length})
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'available' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('available')}
            >
              Disponíveis ({availableIntegrations.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'connected' ? (
            <div className="space-y-4">
              {connectedIntegrations.map((integration) => (
                <div key={integration.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <img src={integration.logo} alt={integration.name} className="w-10 h-10 rounded-full mr-4" />
                    <div>
                      <h3 className="font-medium text-gray-800">{integration.name}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        {integration.status === 'active' ? (
                          <>
                            <FiCheckCircle className="text-green-500 mr-1" />
                            <span>Conectado • Última sincronização: {integration.lastSync}</span>
                          </>
                        ) : (
                          <>
                            <FiAlertCircle className="text-yellow-500 mr-1" />
                            <span>Erro na conexão • Última tentativa: {integration.lastSync}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                      <FiLink className="mr-1" /> Reconfigurar
                    </button>
                    <button className="text-red-600 hover:text-red-800 flex items-center text-sm">
                      Desconectar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableIntegrations.map((integration) => (
                <div key={integration.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <img src={integration.logo} alt={integration.name} className="w-12 h-12 rounded-full mr-4" />
                    <h3 className="font-medium text-lg text-gray-800">{integration.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{integration.description}</p>
                  <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center">
                    <FiExternalLink className="mr-2" /> Conectar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">API Key</h2>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-grow">
            <div className="relative">
              <input
                type="text"
                value="mk_live_1234567890abcdef1234567890abcdef"
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 font-mono"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800">
                Copiar
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Use esta chave para conectar com outras plataformas via API</p>
          </div>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg whitespace-nowrap">
            Gerar nova chave
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSettings;
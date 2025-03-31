import React, { useState } from 'react';
import { FiSearch, FiGrid, FiList, FiDownload, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';

const TemplatesLibrary = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const templates = [
    {
      id: 1,
      name: 'E-commerce - Black Friday',
      description: 'Fluxo completo para promoções de e-commerce',
      category: 'Vendas',
      lastUsed: '15/11/2023'
    },
    {
      id: 2,
      name: 'Onboarding SaaS',
      description: 'Sequência de emails para ativação de usuários',
      category: 'Engajamento',
      lastUsed: '02/11/2023'
    },
    {
      id: 3,
      name: 'Geração de Leads B2B',
      description: 'Campanha para captação de leads qualificados',
      category: 'Captação',
      lastUsed: '25/10/2023'
    },
    {
      id: 4,
      name: 'Reengajamento',
      description: 'Recuperação de clientes inativos',
      category: 'Retenção',
      lastUsed: '10/10/2023'
    }
  ];

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Biblioteca de Templates</h1>
        <div className="flex space-x-4">
          <button 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => {/* Lógica para novo template */}}
          >
            <FiPlus className="mr-2" />
            Novo Template
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-grow max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar templates..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setViewMode('grid')}
            >
              <FiGrid size={20} />
            </button>
            <button
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setViewMode('list')}
            >
              <FiList size={20} />
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ y: -5 }}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="bg-blue-50 p-4">
                  <h3 className="font-semibold text-lg text-gray-800">{template.name}</h3>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mt-2">
                    {template.category}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Usado em: {template.lastUsed}</span>
                    <button className="text-blue-600 hover:text-blue-800 flex items-center">
                      <FiDownload className="mr-1" /> Usar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-600 border-b border-gray-200">
                  <th className="pb-3">Nome</th>
                  <th className="pb-3">Descrição</th>
                  <th className="pb-3">Categoria</th>
                  <th className="pb-3">Último Uso</th>
                  <th className="pb-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredTemplates.map((template) => (
                  <tr key={template.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 font-medium text-gray-800">{template.name}</td>
                    <td className="py-4 text-gray-600">{template.description}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {template.category}
                      </span>
                    </td>
                    <td className="py-4 text-gray-500">{template.lastUsed}</td>
                    <td className="py-4">
                      <button className="text-blue-600 hover:text-blue-800 flex items-center">
                        <FiDownload className="mr-1" /> Usar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatesLibrary;
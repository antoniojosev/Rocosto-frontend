import React, { useState } from 'react';
import { ArrowLeft, Plus, Copy, Search, ArrowUpDown } from 'lucide-react';

interface Database {
  id: string;
  name: string;
  description: string;
  materials: number;
  equipment: number;
  labor: number;
  items: number;
}

interface DatabaseItemsViewProps {
  database: Database;
  onBack: () => void;
}

interface Item {
  code: string;
  description: string;
  unit: string;
  cost: number;
}

const mockItems: Item[] = [
  {
    code: 'MAT001',
    description: 'Cemento',
    unit: 'kg',
    cost: 0.50,
  },
  {
    code: 'MAT002',
    description: 'Arena',
    unit: 'm3',
    cost: 20.00,
  },
];

const DatabaseItemsView: React.FC<DatabaseItemsViewProps> = ({ database, onBack }) => {
  const [activeTab, setActiveTab] = useState('materials');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'materials', label: 'Materiales' },
    { id: 'equipment', label: 'Equipos' },
    { id: 'labor', label: 'Mano de Obra' },
    { id: 'items', label: 'Partidas' },
  ];

  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
      >
        <ArrowLeft size={20} />
        Volver a Bases de Datos
      </button>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">{database.name}</h1>
          <p className="text-gray-400">{database.description}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors">
            <Copy size={20} />
            Copiar Item
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
            <Plus size={20} />
            Nuevo Item
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-black'
                : 'bg-[#2a2a2a] text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Filtrar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#2a2a2a] text-white rounded-lg pl-10 pr-4 py-2 border border-gray-700 focus:outline-none focus:border-gray-600"
        />
      </div>

      <div className="bg-[#1a1a1a] rounded-lg border border-gray-800">
        <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-800 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            Código <ArrowUpDown size={14} />
          </div>
          <div className="flex items-center gap-2">
            Descripción <ArrowUpDown size={14} />
          </div>
          <div className="flex items-center gap-2">
            Unidad <ArrowUpDown size={14} />
          </div>
          <div className="flex items-center gap-2">
            Costo <ArrowUpDown size={14} />
          </div>
        </div>

        <div className="divide-y divide-gray-800">
          {mockItems
            .filter(item => 
              item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.code.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(item => (
              <div
                key={item.code}
                className="grid grid-cols-4 gap-4 p-4 text-sm hover:bg-[#2a2a2a] cursor-pointer transition-colors"
              >
                <div className="text-white">{item.code}</div>
                <div className="text-white">{item.description}</div>
                <div className="text-white">{item.unit}</div>
                <div className="text-white">{item.cost.toFixed(2)} US$</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DatabaseItemsView;
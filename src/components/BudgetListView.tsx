import React, { useState } from 'react';
import { Plus, Search, ArrowUpDown } from 'lucide-react';
import Modal from './Modal';

interface BudgetListViewProps {
  onBudgetClick: () => void;
}

const mockBudgets = [
  {
    id: 1,
    name: 'Proyecto Residencial Torres del Valle',
    company: 'Constructora XYZ',
    createdAt: '2024-03-15',
    status: 'En Proceso',
    progress: 45,
    total: 250000.00
  },
  {
    id: 2,
    name: 'Centro Comercial Plaza Central',
    company: 'Constructora ABC',
    createdAt: '2024-03-10',
    status: 'Pendiente',
    progress: 0,
    total: 1500000.00
  }
];

const BudgetListView: React.FC<BudgetListViewProps> = ({ onBudgetClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Presupuestos</h1>
          <p className="text-gray-400">Gestione sus presupuestos y análisis de precios unitarios</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Plus size={20} />
          Nuevo Presupuesto
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar presupuestos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#2a2a2a] text-white rounded-lg pl-10 pr-4 py-2 border border-gray-700 focus:outline-none focus:border-gray-600"
        />
      </div>

      <div className="bg-[#1a1a1a] rounded-lg border border-gray-800">
        <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-800 text-sm text-gray-400">
          <div className="col-span-2 flex items-center gap-2">
            Nombre <ArrowUpDown size={14} />
          </div>
          <div className="flex items-center gap-2">
            Empresa <ArrowUpDown size={14} />
          </div>
          <div className="flex items-center gap-2">
            Fecha <ArrowUpDown size={14} />
          </div>
          <div className="flex items-center gap-2">
            Estado <ArrowUpDown size={14} />
          </div>
          <div className="flex items-center gap-2">
            Total <ArrowUpDown size={14} />
          </div>
        </div>

        <div className="divide-y divide-gray-800">
          {mockBudgets
            .filter(budget => 
              budget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              budget.company.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(budget => (
              <div
                key={budget.id}
                onClick={onBudgetClick}
                className="grid grid-cols-6 gap-4 p-4 text-sm hover:bg-[#2a2a2a] cursor-pointer transition-colors"
              >
                <div className="col-span-2">
                  <div className="text-white font-medium">{budget.name}</div>
                  <div className="text-gray-400 text-xs mt-1">
                    Progreso: {budget.progress}%
                  </div>
                </div>
                <div className="text-white">{budget.company}</div>
                <div className="text-white">{budget.createdAt}</div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    budget.status === 'En Proceso' 
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {budget.status}
                  </span>
                </div>
                <div className="text-white">{budget.total.toLocaleString('es-VE', { style: 'currency', currency: 'USD' })}</div>
              </div>
            ))}
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCreateBudget={onBudgetClick}
      />
    </div>
  );
};

export default BudgetListView;
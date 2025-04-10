import React, { useState } from 'react';
import { Plus, Search, ArrowUpDown } from 'lucide-react';
import Modal from './BudgetCreateModal';
import useBudget from '../../hooks/useBudget';
import { IBudget, StateChoices, StateInfo} from '../../types/Budget';
import Header from './components/header';
import SearchBar from '../../components/Searcn';
import ItemBudget from './components/ItemBudgetList';

interface BudgetListViewProps {
  onBudgetClick: (budget: IBudget) => void;
}

const BudgetListView: React.FC<BudgetListViewProps> = ({ onBudgetClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { data } = useBudget();

  const handleBudgetClick = (budget: IBudget): void => {
    console.log('aqii', data);
    onBudgetClick(budget);
  };

  return (
    <div className="p-6">
      <Header
        setIsModalOpen={setIsModalOpen}
        title='Presupuesto'
        subtitle='Gestione sus presupuestos y análisis de precios unitarios'
        titleButton='Nuevo presupuesto'
      />

      <SearchBar onSearch={setSearchTerm}/>

      <div className="bg-[#1a1a1a] rounded-lg border border-gray-800">
        <div className="grid grid-cols-7 gap-4 p-4 border-b border-gray-800 text-sm text-gray-400">
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
          <div className="flex items-center gap-2">
            Acciones
          </div>
        </div>

        <div className="divide-y divide-gray-800">
          {(data ?? [])
            .filter(budget => 
              budget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              budget.code.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(budget => (
              <ItemBudget 
                key={budget.id}
                budget={budget}
                handleBudgetClick={handleBudgetClick}
              />
            ))}
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onCreateBudget={onBudgetClick}
      />
    </div>
  );
};

export default BudgetListView;
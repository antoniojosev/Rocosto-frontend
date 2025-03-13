import React from 'react';
import { IBudget, StateChoices, StateInfo } from '../../../types/Budget';


const stateMapping: Record<StateChoices, StateInfo> = {
    IN_PROGRESS: {
      text: 'In Progress',
      style: 'bg-blue-500/20 text-blue-400',
    },
    PENDING: {
      text: 'Pending',
      style: 'bg-yellow-500/20 text-yellow-400',
    },
    FINISHED: {
      text: 'Finished',
      style: 'bg-green-500/20 text-green-400',
    },
  };

interface ItemBudgetListProps {
    budget: IBudget;
    handleBudgetClick: (budget: IBudget) => void;
}

const ItemBudget: React.FC<ItemBudgetListProps> = ({ budget, handleBudgetClick }) => {
    return (
        <div
            key={budget.id}
            onClick={() => handleBudgetClick(budget)}
            className="grid grid-cols-6 gap-4 p-4 text-sm hover:bg-[#2a2a2a] cursor-pointer transition-colors"
        >
            <div className="col-span-2">
                <div className="text-white font-medium">{budget.name}</div>
            </div>
            <div className="text-white">{budget.company.name}</div>
            <div className="text-white">{new Date(budget.created_at).toLocaleDateString('es-ES')}</div>
            <div>
                <span className={`px-2 py-1 rounded-full text-xs ${stateMapping[budget.state].style}`}>
                    {stateMapping[budget.state].text}
                </span>
            </div>
            <div className="text-white">{budget.code}</div>
        </div>
    );
};

export default ItemBudget;
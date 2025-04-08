import React, { useState } from 'react';
import { IBudget, StateChoices, StateInfo } from '../../../types/Budget';
import { Pencil, Trash } from 'lucide-react';
import Modal from '../BudgetCreateModal';
import { useDeleteBudget } from '../../../hooks/useBudget';

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
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { mutate: deleteBudget } = useDeleteBudget();

    const handleEdit = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        console.log(`Editing budget with ID: ${id}`);
        console.log(`Editing budget: ${budget.calculated_by}`);
        setIsEditModalOpen(true);
    };

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        console.log(`Deleting budget with ID: ${id}`);
        deleteBudget(id);
    };

    const handleEditComplete = (updatedBudget: IBudget) => {
        console.log("Budget updated:", updatedBudget);
        // Any additional logic after a successful update
    };

    return (
        <>
            <div
                key={budget.id}
                onClick={() => handleBudgetClick(budget)}
                className="grid grid-cols-7 gap-4 p-4 text-sm hover:bg-[#2a2a2a] cursor-pointer transition-colors"
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
                <div className="flex items-center gap-2">
                    <button 
                        onClick={(e) => handleEdit(e, budget.id)}
                        className="p-1.5 bg-blue-500/20 text-blue-400 rounded-md hover:bg-blue-500/30 transition-colors"
                    >
                        <Pencil size={16} />
                    </button>
                    <button 
                        onClick={(e) => handleDelete(e, budget.id)}
                        className="p-1.5 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30 transition-colors"
                    >
                        <Trash size={16} />
                    </button>
                </div>
            </div>

            <Modal 
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onCreateBudget={handleEditComplete}
                budget={budget}
                isEditMode={true}
            />
        </>
    );
};

export default ItemBudget;
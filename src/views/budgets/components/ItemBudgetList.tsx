import React, { useState } from 'react';
import { IBudget, StateChoices, StateInfo } from '../../../types/Budget';
import { Pencil, Trash, AlertCircle } from 'lucide-react';
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

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    budgetName: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, onClose, onConfirm, budgetName }) => {
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] rounded-lg p-6 max-w-md w-full border border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="text-red-500" size={24} />
                    <h3 className="text-lg font-medium text-white">Confirmar eliminación</h3>
                </div>
                <p className="mb-6 text-gray-300">
                    ¿Está seguro que desea eliminar el presupuesto <span className="font-medium text-white">{budgetName}</span>? Esta acción no se puede deshacer.
                </p>
                <div className="flex justify-end gap-3">
                    <button 
                        className="px-4 py-2 bg-gray-700 rounded-md text-gray-300 hover:bg-gray-600 transition-colors"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button 
                        className="px-4 py-2 bg-red-500 rounded-md text-white hover:bg-red-600 transition-colors"
                        onClick={onConfirm}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

const ItemBudget: React.FC<ItemBudgetListProps> = ({ budget, handleBudgetClick }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const { mutate: deleteBudget } = useDeleteBudget();

    const handleEdit = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        console.log(`Editing budget with ID: ${id}`);
        console.log(`Editing budget: ${budget.calculated_by}`);
        setIsEditModalOpen(true);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        deleteBudget(budget.id);
        setIsDeleteDialogOpen(false);
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
                        onClick={(e) => handleDelete(e)}
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

            <ConfirmDialog 
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
                budgetName={budget.name}
            />
        </>
    );
};

export default ItemBudget;
import React, { useState } from 'react';
import { Plus, Copy, ArrowLeft, X, Trash, Edit2, Save, ChevronRight } from 'lucide-react';
import { IBudget } from '../../types/Budget';
import { IWorkItem } from '../../types/Database';
import BudgetItemModal from '../../components/BudgetItemModal';
import CopyItemModal from '../../components/CopyItemModal';
import Header from './components/header';
import LeftBudgetContainer from './components/leftBudgetContainer';
import RightBudgetContainer from './components/rightBudgetContainer';



interface BudgetViewProps {
  onBack: () => void;
  budget: IBudget;
  setSelectedBudget: (budget: IBudget) => void;
}

const mockItems = [
  {
    id: 1,
    codigo: "PAR001",
    description: "Excavación Manual",
    unit: "m3",
    quantity: 100,
    unitPrice: 25.50,
    total: 2550.00,
    materiales: [
      { codigo: "MAT001", descripcion: "Pico", costo: 45.00, cantidad: 2, total: 90.00 },
      { codigo: "MAT002", descripcion: "Pala", costo: 35.00, cantidad: 2, total: 70.00 }
    ],
    equipos: [
      { codigo: "EQU001", descripcion: "Carretilla", costo: 150.00, cantidad: 1, total: 150.00 }
    ],
    manoDeObra: [
      { codigo: "MO001", descripcion: "Obrero", costo: 10.00, cantidad: 4, total: 40.00 },
      { codigo: "MO002", descripcion: "Capataz", costo: 15.00, cantidad: 1, total: 15.00 }
    ],
    materialesTotal: 160.00,
    equiposTotal: 150.00,
    manoDeObraTotal: 55.00
  },
  {
    id: 2,
    codigo: "PAR002",
    description: "Concreto f'c=210 kg/cm2",
    unit: "m3",
    quantity: 50,
    unitPrice: 120.00,
    total: 6000.00,
    materiales: [
      { codigo: "MAT003", descripcion: "Cemento", costo: 8.50, cantidad: 350, total: 2975.00 },
      { codigo: "MAT004", descripcion: "Arena", costo: 25.00, cantidad: 0.5, total: 12.50 },
      { codigo: "MAT005", descripcion: "Piedra", costo: 30.00, cantidad: 0.75, total: 22.50 }
    ],
    equipos: [
      { codigo: "EQU002", descripcion: "Mezcladora", costo: 250.00, cantidad: 1, total: 250.00 },
      { codigo: "EQU003", descripcion: "Vibrador", costo: 180.00, cantidad: 1, total: 180.00 }
    ],
    manoDeObra: [
      { codigo: "MO003", descripcion: "Operario", costo: 12.00, cantidad: 2, total: 24.00 },
      { codigo: "MO001", descripcion: "Obrero", costo: 10.00, cantidad: 4, total: 40.00 }
    ],
    materialesTotal: 3010.00,
    equiposTotal: 430.00,
    manoDeObraTotal: 64.00
  },
  {
    id: 3,
    codigo: "PAR002",
    description: "Concreto f'c=210 kg/cm2",
    unit: "m3",
    quantity: 50,
    unitPrice: 120.00,
    total: 6000.00,
    materiales: [
      { codigo: "MAT003", descripcion: "Cemento", costo: 8.50, cantidad: 350, total: 2975.00 },
      { codigo: "MAT004", descripcion: "Arena", costo: 25.00, cantidad: 0.5, total: 12.50 },
      { codigo: "MAT005", descripcion: "Piedra", costo: 30.00, cantidad: 0.75, total: 22.50 }
    ],
    equipos: [
      { codigo: "EQU002", descripcion: "Mezcladora", costo: 250.00, cantidad: 1, total: 250.00 },
      { codigo: "EQU003", descripcion: "Vibrador", costo: 180.00, cantidad: 1, total: 180.00 }
    ],
    manoDeObra: [
      { codigo: "MO003", descripcion: "Operario", costo: 12.00, cantidad: 2, total: 24.00 },
      { codigo: "MO001", descripcion: "Obrero", costo: 10.00, cantidad: 4, total: 40.00 }
    ],
    materialesTotal: 3010.00,
    equiposTotal: 430.00,
    manoDeObraTotal: 64.00
  },
  {
    id: 4,
    codigo: "PAR002",
    description: "Concreto f'c=210 kg/cm2",
    unit: "m3",
    quantity: 50,
    unitPrice: 120.00,
    total: 6000.00,
    materiales: [
      { codigo: "MAT003", descripcion: "Cemento", costo: 8.50, cantidad: 350, total: 2975.00 },
      { codigo: "MAT004", descripcion: "Arena", costo: 25.00, cantidad: 0.5, total: 12.50 },
      { codigo: "MAT005", descripcion: "Piedra", costo: 30.00, cantidad: 0.75, total: 22.50 }
    ],
    equipos: [
      { codigo: "EQU002", descripcion: "Mezcladora", costo: 250.00, cantidad: 1, total: 250.00 },
      { codigo: "EQU003", descripcion: "Vibrador", costo: 180.00, cantidad: 1, total: 180.00 }
    ],
    manoDeObra: [
      { codigo: "MO003", descripcion: "Operario", costo: 12.00, cantidad: 2, total: 24.00 },
      { codigo: "MO001", descripcion: "Obrero", costo: 10.00, cantidad: 4, total: 40.00 }
    ],
    materialesTotal: 3010.00,
    equiposTotal: 430.00,
    manoDeObraTotal: 64.00
  },
  {
    id: 5,
    codigo: "PAR002",
    description: "Concreto f'c=210 kg/cm2",
    unit: "m3",
    quantity: 50,
    unitPrice: 120.00,
    total: 6000.00,
    materiales: [
      { codigo: "MAT003", descripcion: "Cemento", costo: 8.50, cantidad: 350, total: 2975.00 },
      { codigo: "MAT004", descripcion: "Arena", costo: 25.00, cantidad: 0.5, total: 12.50 },
      { codigo: "MAT005", descripcion: "Piedra", costo: 30.00, cantidad: 0.75, total: 22.50 }
    ],
    equipos: [
      { codigo: "EQU002", descripcion: "Mezcladora", costo: 250.00, cantidad: 1, total: 250.00 },
      { codigo: "EQU003", descripcion: "Vibrador", costo: 180.00, cantidad: 1, total: 180.00 }
    ],
    manoDeObra: [
      { codigo: "MO003", descripcion: "Operario", costo: 12.00, cantidad: 2, total: 24.00 },
      { codigo: "MO001", descripcion: "Obrero", costo: 10.00, cantidad: 4, total: 40.00 }
    ],
    materialesTotal: 3010.00,
    equiposTotal: 430.00,
    manoDeObraTotal: 64.00
  },
  {
    id: 6,
    codigo: "PAR002",
    description: "Concreto f'c=210 kg/cm2",
    unit: "m3",
    quantity: 50,
    unitPrice: 120.00,
    total: 6000.00,
    materiales: [
      { codigo: "MAT003", descripcion: "Cemento", costo: 8.50, cantidad: 350, total: 2975.00 },
      { codigo: "MAT004", descripcion: "Arena", costo: 25.00, cantidad: 0.5, total: 12.50 },
      { codigo: "MAT005", descripcion: "Piedra", costo: 30.00, cantidad: 0.75, total: 22.50 }
    ],
    equipos: [
      { codigo: "EQU002", descripcion: "Mezcladora", costo: 250.00, cantidad: 1, total: 250.00 },
      { codigo: "EQU003", descripcion: "Vibrador", costo: 180.00, cantidad: 1, total: 180.00 }
    ],
    manoDeObra: [
      { codigo: "MO003", descripcion: "Operario", costo: 12.00, cantidad: 2, total: 24.00 },
      { codigo: "MO001", descripcion: "Obrero", costo: 10.00, cantidad: 4, total: 40.00 }
    ],
    materialesTotal: 3010.00,
    equiposTotal: 430.00,
    manoDeObraTotal: 64.00
  },
  {
    id: 7,
    codigo: "PAR002",
    description: "Concreto f'c=210 kg/cm2",
    unit: "m3",
    quantity: 50,
    unitPrice: 120.00,
    total: 6000.00,
    materiales: [
      { codigo: "MAT003", descripcion: "Cemento", costo: 8.50, cantidad: 350, total: 2975.00 },
      { codigo: "MAT004", descripcion: "Arena", costo: 25.00, cantidad: 0.5, total: 12.50 },
      { codigo: "MAT005", descripcion: "Piedra", costo: 30.00, cantidad: 0.75, total: 22.50 }
    ],
    equipos: [
      { codigo: "EQU002", descripcion: "Mezcladora", costo: 250.00, cantidad: 1, total: 250.00 },
      { codigo: "EQU003", descripcion: "Vibrador", costo: 180.00, cantidad: 1, total: 180.00 }
    ],
    manoDeObra: [
      { codigo: "MO003", descripcion: "Operario", costo: 12.00, cantidad: 2, total: 24.00 },
      { codigo: "MO001", descripcion: "Obrero", costo: 10.00, cantidad: 4, total: 40.00 }
    ],
    materialesTotal: 3010.00,
    equiposTotal: 430.00,
    manoDeObraTotal: 64.00
  },
  {
    id: 8,
    codigo: "PAR002",
    description: "Concreto f'c=210 kg/cm2",
    unit: "m3",
    quantity: 50,
    unitPrice: 120.00,
    total: 6000.00,
    materiales: [
      { codigo: "MAT003", descripcion: "Cemento", costo: 8.50, cantidad: 350, total: 2975.00 },
      { codigo: "MAT004", descripcion: "Arena", costo: 25.00, cantidad: 0.5, total: 12.50 },
      { codigo: "MAT005", descripcion: "Piedra", costo: 30.00, cantidad: 0.75, total: 22.50 }
    ],
    equipos: [
      { codigo: "EQU002", descripcion: "Mezcladora", costo: 250.00, cantidad: 1, total: 250.00 },
      { codigo: "EQU003", descripcion: "Vibrador", costo: 180.00, cantidad: 1, total: 180.00 }
    ],
    manoDeObra: [
      { codigo: "MO003", descripcion: "Operario", costo: 12.00, cantidad: 2, total: 24.00 },
      { codigo: "MO001", descripcion: "Obrero", costo: 10.00, cantidad: 4, total: 40.00 }
    ],
    materialesTotal: 3010.00,
    equiposTotal: 430.00,
    manoDeObraTotal: 64.00
  },
  {
    id: 9,
    codigo: "PAR002",
    description: "Concreto f'c=210 kg/cm2",
    unit: "m3",
    quantity: 50,
    unitPrice: 120.00,
    total: 6000.00,
    materiales: [
      { codigo: "MAT003", descripcion: "Cemento", costo: 8.50, cantidad: 350, total: 2975.00 },
      { codigo: "MAT004", descripcion: "Arena", costo: 25.00, cantidad: 0.5, total: 12.50 },
      { codigo: "MAT005", descripcion: "Piedra", costo: 30.00, cantidad: 0.75, total: 22.50 }
    ],
    equipos: [
      { codigo: "EQU002", descripcion: "Mezcladora", costo: 250.00, cantidad: 1, total: 250.00 },
      { codigo: "EQU003", descripcion: "Vibrador", costo: 180.00, cantidad: 1, total: 180.00 }
    ],
    manoDeObra: [
      { codigo: "MO003", descripcion: "Operario", costo: 12.00, cantidad: 2, total: 24.00 },
      { codigo: "MO001", descripcion: "Obrero", costo: 10.00, cantidad: 4, total: 40.00 }
    ],
    materialesTotal: 3010.00,
    equiposTotal: 430.00,
    manoDeObraTotal: 64.00
  },
  {
    id: 10,
    codigo: "PAR002",
    description: "Concreto f'c=210 kg/cm2",
    unit: "m3",
    quantity: 50,
    unitPrice: 120.00,
    total: 6000.00,
    materiales: [
      { codigo: "MAT003", descripcion: "Cemento", costo: 8.50, cantidad: 350, total: 2975.00 },
      { codigo: "MAT004", descripcion: "Arena", costo: 25.00, cantidad: 0.5, total: 12.50 },
      { codigo: "MAT005", descripcion: "Piedra", costo: 30.00, cantidad: 0.75, total: 22.50 }
    ],
    equipos: [
      { codigo: "EQU002", descripcion: "Mezcladora", costo: 250.00, cantidad: 1, total: 250.00 },
      { codigo: "EQU003", descripcion: "Vibrador", costo: 180.00, cantidad: 1, total: 180.00 }
    ],
    manoDeObra: [
      { codigo: "MO003", descripcion: "Operario", costo: 12.00, cantidad: 2, total: 24.00 },
      { codigo: "MO001", descripcion: "Obrero", costo: 10.00, cantidad: 4, total: 40.00 }
    ],
    materialesTotal: 3010.00,
    equiposTotal: 430.00,
    manoDeObraTotal: 64.00
  },
  {
    id: 11,
    codigo: "PAR002",
    description: "Concreto f'c=210 kg/cm2",
    unit: "m3",
    quantity: 50,
    unitPrice: 120.00,
    total: 6000.00,
    materiales: [
      { codigo: "MAT003", descripcion: "Cemento", costo: 8.50, cantidad: 350, total: 2975.00 },
      { codigo: "MAT004", descripcion: "Arena", costo: 25.00, cantidad: 0.5, total: 12.50 },
      { codigo: "MAT005", descripcion: "Piedra", costo: 30.00, cantidad: 0.75, total: 22.50 }
    ],
    equipos: [
      { codigo: "EQU002", descripcion: "Mezcladora", costo: 250.00, cantidad: 1, total: 250.00 },
      { codigo: "EQU003", descripcion: "Vibrador", costo: 180.00, cantidad: 1, total: 180.00 }
    ],
    manoDeObra: [
      { codigo: "MO003", descripcion: "Operario", costo: 12.00, cantidad: 2, total: 24.00 },
      { codigo: "MO001", descripcion: "Obrero", costo: 10.00, cantidad: 4, total: 40.00 }
    ],
    materialesTotal: 3010.00,
    equiposTotal: 430.00,
    manoDeObraTotal: 64.00
  },
  {
    id: 12,
    codigo: "PAR002",
    description: "Concreto f'c=210 kg/cm2",
    unit: "m3",
    quantity: 50,
    unitPrice: 120.00,
    total: 6000.00,
    materiales: [
      { codigo: "MAT003", descripcion: "Cemento", costo: 8.50, cantidad: 350, total: 2975.00 },
      { codigo: "MAT004", descripcion: "Arena", costo: 25.00, cantidad: 0.5, total: 12.50 },
      { codigo: "MAT005", descripcion: "Piedra", costo: 30.00, cantidad: 0.75, total: 22.50 }
    ],
    equipos: [
      { codigo: "EQU002", descripcion: "Mezcladora", costo: 250.00, cantidad: 1, total: 250.00 },
      { codigo: "EQU003", descripcion: "Vibrador", costo: 180.00, cantidad: 1, total: 180.00 }
    ],
    manoDeObra: [
      { codigo: "MO003", descripcion: "Operario", costo: 12.00, cantidad: 2, total: 24.00 },
      { codigo: "MO001", descripcion: "Obrero", costo: 10.00, cantidad: 4, total: 40.00 }
    ],
    materialesTotal: 3010.00,
    equiposTotal: 430.00,
    manoDeObraTotal: 64.00
  }
];


const BudgetView: React.FC<BudgetViewProps> = ({ onBack, budget, setSelectedBudget }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<any[]>(mockItems);
  const [selectedItem, setSelectedItem] = useState<IWorkItem | null>(null);
  const [copyModalType, setCopyModalType] = useState<'material' | 'equipo' | 'mano-de-obra' | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'materiales' | 'equipos' | 'mano-de-obra'>('materiales');
  const [detailBudget, setDetailBudget] = useState<IBudget>(budget)

  const addWorkItem = (IWorkItem: IWorkItem): void => {
    setDetailBudget(prevBudget => ({
      ...prevBudget,
      work_item: [...prevBudget.work_item, IWorkItem]
    }));
    handleItemClick(IWorkItem)
  };

  const handleItemClick = (item: IWorkItem) => {
    if (selectedItem?.id === item.id) {
      // If clicking the same item, toggle details visibility
      setDetailsVisible(!detailsVisible);
    } else {
      // If clicking a different item, select it and show details
      setSelectedItem(item);
      setDetailsVisible(true);
      setActiveTab('materiales');
    }
  };
  const handleCloseDetails = () => {
    setDetailsVisible(false);
  };

  const handleCopyItem = (type: 'material' | 'equipo' | 'mano-de-obra') => {
    setCopyModalType(type);
  };

  const handleSelectCopiedItem = (item: any) => {
    if (!selectedItem) return;

    const updatedItems = items.map(budgetItem => {
      if (budgetItem === selectedItem) {
        if (copyModalType === 'material') {
          return {
            ...budgetItem,
            materiales: [...(budgetItem.materiales || []), { ...item, cantidad: 1 }]
          };
        } else if (copyModalType === 'equipo') {
          return {
            ...budgetItem,
            equipos: [...(budgetItem.equipos || []), { ...item, cantidad: 1 }]
          };
        } else if (copyModalType === 'mano-de-obra') {
          return {
            ...budgetItem,
            manoDeObra: [...(budgetItem.manoDeObra || []), { ...item, cantidad: 1 }]
          };
        }
      }
      return budgetItem;
    });

    setItems(updatedItems);
    setSelectedItem(updatedItems.find(item => item === selectedItem));
    setCopyModalType(null);
  };

  const handleDeleteItem = (type: string, itemToDelete: any) => {
    const updatedItems = items.map(budgetItem => {
      if (budgetItem === selectedItem) {
        if (type === 'material') {
          return {
            ...budgetItem,
            materiales: budgetItem.materiales.filter((item: any) => item !== itemToDelete)
          };
        } else if (type === 'equipo') {
          return {
            ...budgetItem,
            equipos: budgetItem.equipos.filter((item: any) => item !== itemToDelete)
          };
        } else if (type === 'mano-de-obra') {
          return {
            ...budgetItem,
            manoDeObra: budgetItem.manoDeObra.filter((item: any) => item !== itemToDelete)
          };
        }
      }
      return budgetItem;
    });

    setItems(updatedItems);
    setSelectedItem(updatedItems.find(item => item === selectedItem));
  };

  const handleEditItem = (type: string, item: any) => {
    setEditingItem({ type, item });
  };

  const handleUpdateItem = (type: string, updatedItem: any) => {
   
      const budgetUpdated = {
        ...budget,
        work_item: budget.work_item.some(item => item.id === updatedItem.id)
          ? budget.work_item.map(item => item.id === updatedItem.id ? updatedItem : item)
          : [...budget.work_item, updatedItem]
      };
    setSelectedBudget(budgetUpdated);
    setDetailBudget(budgetUpdated);
    setEditingItem(null);
  };

  const handleUpdateQuantity = (e: React.ChangeEvent<HTMLInputElement>, type: string, item: any) => {
    const updatedItems = items.map(budgetItem => {
      if (budgetItem === selectedItem) {
        if (type === 'material') {
          return {
            ...budgetItem,
            materiales: budgetItem.materiales.map((mat: any) =>
              mat === item ? { ...mat, cantidad: Number(e.target.value) } : mat
            )
          };
        } else if (type === 'equipo') {
          return {
            ...budgetItem,
            equipos: budgetItem.equipos.map((eq: any) =>
              eq === item ? { ...eq, cantidad: Number(e.target.value) } : eq
            )
          };
        } else if (type === 'mano-de-obra') {
          return {
            ...budgetItem,
            manoDeObra: budgetItem.manoDeObra.map((mo: any) =>
              mo === item ? { ...mo, cantidad: Number(e.target.value) } : mo
            )
          };
        }
      }
      return budgetItem;
    });

    setItems(updatedItems);
    setSelectedItem(updatedItems.find(item => item === selectedItem));
  };

  const handleSaveChanges = () => {
    console.log('Saving changes:', selectedItem);
  };
  const calculateTotal = (item: any) => {
    return item.materialesTotal + item.equiposTotal + item.manoDeObraTotal;
  };
  const getPresupuestoTotal = () => {
    return items.reduce((total, item) => total + calculateTotal(item), 0);
  };


  return (
    <div className="p-6 relative">


      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
      >
        <ArrowLeft size={20} />
        Volver a Presupuestos
      </button>
      <Header
        setIsModalOpen={setIsModalOpen}
        title={budget.name}
        subtitle={budget.company.name}
        titleButton='Nueva partida'
      />

      <div className="flex">
        {/* Left side - Budget Summary */}
        <div className={`bg-[#1a1a1a] rounded-lg border border-gray-800 transition-all duration-300 ${detailsVisible && selectedItem ? 'flex-1 mr-6' : 'w-full'
          }`}>
          <LeftBudgetContainer
            detailBudget={detailBudget}
            handleItemClick={handleItemClick}
            selectedItem={selectedItem}
            detailsVisible={detailsVisible}
            getPresupuestoTotal={getPresupuestoTotal}
          />
        </div>

        {/* Right side - Item Details */}
        <div
          className={` ${detailsVisible && selectedItem ? 'bg-[#1a1a1a] rounded-lg border border-gray-800 transition-all duration-300 ease-in-out opacity-100 translate-x-0 w-7/12 h-3/4' : 'opacity-0 translate-x-20 w-0 overflow-hidden'
            }`}
        >
          {selectedItem && (
            <RightBudgetContainer
              selectedItem={{
                ...selectedItem,
                material: selectedItem.material?.map(m => ({
                  ...m,
                  quantity: m.quantity === null || m.quantity === undefined ? 1 : m.quantity,
                })),
                labor: selectedItem.labor?.map(l => ({
                  ...l,
                  quantity: l.quantity === null || l.quantity === undefined ? 1 : l.quantity,
                })),
                equipment: selectedItem.equipment?.map(e => ({
                  ...e,
                  quantity: e.quantity === null || e.quantity === undefined ? 1 : e.quantity,
                }))
              }}
              setSelectedItem={setSelectedItem}
              handleUpdateItems={handleUpdateItem}
            />
          )}
        </div>
      </div>

      <BudgetItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        detailBudget={detailBudget}
        onAdd={addWorkItem}
      />

      {copyModalType && (
        <CopyItemModal
          isOpen={true}
          onClose={() => setCopyModalType(null)}
          onSelect={handleSelectCopiedItem}
          title={`Copiar ${copyModalType === 'mano-de-obra' ? 'Mano de Obra' : copyModalType === 'material' ? 'Material' : 'Equipo'}`}
          type={copyModalType}
        />
      )}
    </div>
  );
};

export default BudgetView;
import React, { useState } from 'react';
import { Plus, Copy, ArrowLeft, X, Trash, Edit2, Save, ChevronRight } from 'lucide-react';
import BudgetItemModal from './BudgetItemModal';
import CopyItemModal from './CopyItemModal';
import { Equipment, IBudget, Labor, Material, WorkItem } from '../api/endpoints/budgets';

interface BudgetViewProps {
  onBack: () => void;
  budget: IBudget
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


const BudgetView: React.FC<BudgetViewProps> = ({ onBack, budget }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<any[]>(mockItems);
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const [copyModalType, setCopyModalType] = useState<'material' | 'equipo' | 'mano-de-obra' | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'materiales' | 'equipos' | 'mano-de-obra'>('materiales');

  const handleItemClick = (item: WorkItem) => {
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
    // Here you would typically save the changes to your backend
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

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Proyecto Example</h1>
          
          <p className="text-gray-400">Constructora XYZ</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Plus size={20} />
          Nueva Partida
        </button>
      </div>

      <div className="flex">
        {/* Left side - Budget Summary */}
        <div className={`bg-[#1a1a1a] rounded-lg border border-gray-800 transition-all duration-300 ${
          detailsVisible && selectedItem ? 'flex-1 mr-6' : 'w-full'
        }`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Resumen del Presupuesto</h2>
              <div className="text-right">
                <p className="text-gray-400 text-sm">Total del Presupuesto</p>
                <p className="text-white text-2xl font-bold">{getPresupuestoTotal()?.toFixed(2)}</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-4 p-4 border-b border-gray-800 text-sm text-gray-400">
              <div>Código</div>
              <div className="col-span-2">Descripción</div>
              <div>Unidad</div>
              <div>Materiales</div>
              <div>Equipos</div>
              <div>Mano de Obra</div>
            </div>

            {(!budget || budget.work_item.length === 0) ? (
              <div className="p-8 text-center">
                <p className="text-gray-400">No hay partidas creadas. Haga clic en "Nueva Partida" para comenzar.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {budget.work_item.map((item) => (
                  <div
                    key={item.id}
                    className={`grid grid-cols-7 gap-4 p-4 text-sm cursor-pointer transition-colors ${
                      selectedItem?.id === item.id ? 'bg-[#2a2a2a]' : 'hover:bg-[#2a2a2a]'
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="text-white">{item.code}</div>
                    <div className="col-span-2 text-white">{item.description}</div>
                    <div className="text-white">{item.code}</div>
                    <div className="text-white">{item.code}</div>
                    <div className="text-white">{item.code}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">{item.code}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClick(item);
                        }}
                        className={`flex items-center justify-center w-8 h-8 rounded-full bg-[#333] hover:bg-[#444] transition-colors ${
                          selectedItem?.id === item.id && detailsVisible ? 'bg-white text-black' : ''
                        }`}
                        title={selectedItem?.id === item.id && detailsVisible ? "Ocultar detalles" : "Ver detalles"}
                      >
                        <ChevronRight size={18} className={`transition-transform duration-300 ${
                          selectedItem?.id === item.id && detailsVisible ? 'rotate-90 text-black' : 'text-white'
                        }`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side - Item Details */}
        <div 
          className={` ${
            detailsVisible && selectedItem ? 'bg-[#1a1a1a] rounded-lg border border-gray-800 transition-all duration-300 ease-in-out opacity-100 translate-x-0 w-[500px] h-3/4' : 'opacity-0 translate-x-20 w-0 overflow-hidden'
          }`}
        >
          {selectedItem && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-white text-lg font-semibold">{selectedItem.code}</h3>
                  <p className="text-gray-400 text-sm mt-1">{selectedItem.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleSaveChanges()}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Save size={16} />
                    Guardar Cambios
                  </button>
                  <button
                    onClick={handleCloseDetails}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-[#333] hover:bg-[#444] transition-colors"
                  >
                    <X size={18} className="text-white" />
                  </button>
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('materiales')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'materiales'
                      ? 'bg-white text-black'
                      : 'bg-[#2a2a2a] text-gray-300 hover:text-white'
                  }`}
                >
                  Materiales ({selectedItem.materials.length})
                </button>
                <button
                  onClick={() => setActiveTab('equipos')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'equipos'
                      ? 'bg-white text-black'
                      : 'bg-[#2a2a2a] text-gray-300 hover:text-white'
                  }`}
                >
                  Equipos ({selectedItem.equipment.length})
                </button>
                <button
                  onClick={() => setActiveTab('mano-de-obra')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'mano-de-obra'
                      ? 'bg-white text-black'
                      : 'bg-[#2a2a2a] text-gray-300 hover:text-white'
                  }`}
                >
                  Mano de Obra ({selectedItem.labor.length})
                </button>
              </div>

              {activeTab === 'materiales' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-white font-medium">Materiales</h4>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopyItem('material')}
                        className="flex items-center gap-2 px-3 py-1 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors text-sm"
                      >
                        <Copy size={16} />
                        Copiar Material
                      </button>
                      <button
                        className="flex items-center gap-2 px-3 py-1 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      >
                        <Plus size={16} />
                        Agregar Material
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-4 mb-2 text-sm text-gray-400">
                    <div>Código</div>
                    <div>Descripción</div>
                    <div>Cantidad</div>
                    <div>Costo</div>
                    <div>Total</div>
                  </div>

                  <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                    {selectedItem.materials.map((material: Material) => (
                      <div key={material.id} className="grid grid-cols-5 gap-4 items-center bg-[#2a2a2a] p-3 rounded-lg">
                        <div className="text-white">{material.code}</div>
                        <div className="text-white">{material.description}</div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={material.cost}
                            onChange={(e) => handleUpdateQuantity(e, 'material', material)}
                            className="bg-[#1a1a1a] text-white text-sm rounded px-2 py-1 w-20 border border-gray-700"
                          />
                        </div>
                        <div className="text-white">{material.cost}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-white">{material.cost}</span>
                          <div className="flex gap-2">
                            
                            <button
                              onClick={() => handleDeleteItem('material', material)}
                              className="text-gray-400 hover:text-white"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700 text-right">
                    <span className="text-gray-400 text-sm">Total Materiales: </span>
                    <span className="text-white font-semibold">{selectedItem.unit}</span>
                  </div>
                </div>
              )}

              {activeTab === 'equipos' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-white font-medium">Equipos</h4>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopyItem('equipo')}
                        className="flex items-center gap-2 px-3 py-1 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors text-sm"
                      >
                        <Copy size={16} />
                        Copiar Equipo
                      </button>
                      <button
                        className="flex items-center gap-2 px-3 py-1 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      >
                        <Plus size={16} />
                        Agregar Equipo
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-4 mb-2 text-sm text-gray-400">
                    <div>Código</div>
                    <div>Descripción</div>
                    <div>Cantidad</div>
                    <div>Costo</div>
                    <div>Total</div>
                  </div>

                  <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                    {selectedItem.equipment.map((equipo: Equipment) => (
                      <div key={equipo.id} className="grid grid-cols-5 gap-4 items-center bg-[#2a2a2a] p-3 rounded-lg">
                        <div className="text-white">{equipo.code}</div>
                        <div className="text-white">{equipo.description}</div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={equipo.depreciation}
                            onChange={(e) => handleUpdateQuantity(e, 'equipo', equipo)}
                            className="bg-[#1a1a1a] text-white text-sm rounded px-2 py-1 w-20 border border-gray-700"
                          />
                        </div>
                        <div className="text-white">{equipo.cost}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-white">{equipo.cost}</span>
                          <div className="flex gap-2">
                            <button className="text-gray-400 hover:text-white">
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('equipo', equipo)}
                              className="text-gray-400 hover:text-white"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700 text-right">
                    <span className="text-gray-400 text-sm">Total Equipos: </span>
                    <span className="text-white font-semibold">{selectedItem.yield_rate}</span>
                  </div>
                </div>
              )}

              {activeTab === 'mano-de-obra' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-white font-medium">Mano de Obra</h4>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopyItem('mano-de-obra')}
                        className="flex items-center gap-2 px-3 py-1 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors text-sm"
                      >
                        <Copy size={16} />
                        Copiar Mano de Obra
                      </button>
                      <button
                        className="flex items-center gap-2 px-3 py-1 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      >
                        <Plus size={16} />
                        Agregar Mano de Obra
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-4 mb-2 text-sm text-gray-400">
                    <div>Código</div>
                    <div>Descripción</div>
                    <div>Cantidad</div>
                    <div>Costo</div>
                    <div>Total</div>
                  </div>

                  <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                    {selectedItem.labor.map((mano: Labor) => (
                      <div key={mano.code} className="grid grid-cols-5 gap-4 items-center bg-[#2a2a2a] p-3 rounded-lg">
                        <div className="text-white">{mano.code}</div>
                        <div className="text-white">{mano.description}</div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={mano.hourly_cost}
                            onChange={(e) => handleUpdateQuantity(e, 'mano-de-obra', mano)}
                            className="bg-[#1a1a1a] text-white text-sm rounded px-2 py-1 w-20 border border-gray-700"
                          />
                        </div>
                        <div className="text-white">{mano.hourly_cost}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-white">{mano.hourly_cost}</span>
                          <div className="flex gap-2">
                            <button className="text-gray-400 hover:text-white">
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('mano-de-obra', mano)}
                              className="text-gray-400 hover:text-white"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700 text-right">
                    <span className="text-gray-400 text-sm">Total Mano de Obra: </span>
                    <span className="text-white font-semibold">{selectedItem.yield_rate}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <BudgetItemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={(item) => {
          const newItem = {
            id: items.length + 1,
            codigo: `PAR00${items.length + 1}`,
            description: item.description,
            unit: item.unit,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.total,
            materiales: [],
            equipos: [],
            manoDeObra: [],
            materialesTotal: 0,
            equiposTotal: 0,
            manoDeObraTotal: 0
          };
          setItems([...items, newItem]);
          setIsModalOpen(false);
        }}
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
import React, { useState } from 'react';
import { Plus, Copy, ArrowLeft, X, Trash, Edit2, Save } from 'lucide-react';
import BudgetItemModal from './BudgetItemModal';
import CopyItemModal from './CopyItemModal';

interface BudgetViewProps {
  onBack: () => void;
}

const mockItems = [
  {
    description: "Excavación Manual",
    unit: "m3",
    quantity: 100,
    unitPrice: 25.50,
    total: 2550.00,
    materiales: [
      { codigo: "MAT001", descripcion: "Pico", costo: 45.00, cantidad: 2 },
      { codigo: "MAT002", descripcion: "Pala", costo: 35.00, cantidad: 2 }
    ],
    equipos: [
      { codigo: "EQU001", descripcion: "Carretilla", costo: 150.00, cantidad: 1 }
    ],
    manoDeObra: [
      { codigo: "MO001", descripcion: "Obrero", costo: 10.00, cantidad: 4 },
      { codigo: "MO002", descripcion: "Capataz", costo: 15.00, cantidad: 1 }
    ]
  },
  {
    description: "Concreto f'c=210 kg/cm2",
    unit: "m3",
    quantity: 50,
    unitPrice: 120.00,
    total: 6000.00,
    materiales: [
      { codigo: "MAT003", descripcion: "Cemento", costo: 8.50, cantidad: 350 },
      { codigo: "MAT004", descripcion: "Arena", costo: 25.00, cantidad: 0.5 },
      { codigo: "MAT005", descripcion: "Piedra", costo: 30.00, cantidad: 0.75 }
    ],
    equipos: [
      { codigo: "EQU002", descripcion: "Mezcladora", costo: 250.00, cantidad: 1 },
      { codigo: "EQU003", descripcion: "Vibrador", costo: 180.00, cantidad: 1 }
    ],
    manoDeObra: [
      { codigo: "MO003", descripcion: "Operario", costo: 12.00, cantidad: 2 },
      { codigo: "MO001", descripcion: "Obrero", costo: 10.00, cantidad: 4 }
    ]
  }
];

const BudgetView: React.FC<BudgetViewProps> = ({ onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<any[]>(mockItems);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [copyModalType, setCopyModalType] = useState<'material' | 'equipo' | 'mano-de-obra' | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);

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
          <h1 className="text-2xl font-bold text-white mb-2">Proyecto Example new-budget-id</h1>
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

      {items.length === 0 ? (
        <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-8 text-center">
          <p className="text-gray-400">No hay partidas creadas. Haga clic en "Nueva Partida" para comenzar.</p>
        </div>
      ) : (
        <div className="bg-[#1a1a1a] rounded-lg border border-gray-800">
          <div className="grid grid-cols-7 gap-4 p-4 border-b border-gray-800 text-sm text-gray-400">
            <div className="col-span-2">Descripción</div>
            <div>Unidad</div>
            <div>Cantidad</div>
            <div>P.U.</div>
            <div>Total</div>
            <div></div>
          </div>

          <div className="divide-y divide-gray-800">
            {items.map((item, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-7 gap-4 p-4 text-sm hover:bg-[#2a2a2a] cursor-pointer transition-colors ${
                  selectedItem === item ? 'bg-[#2a2a2a]' : ''
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="col-span-2 text-white">{item.description}</div>
                <div className="text-white">{item.unit}</div>
                <div className="text-white">{item.quantity}</div>
                <div className="text-white">{item.unitPrice}</div>
                <div className="text-white">{item.total}</div>
                <div className="flex justify-end gap-2">
                  <button className="text-gray-400 hover:text-white">
                    <Copy size={16} />
                  </button>
                  <button className="text-gray-400 hover:text-white">
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sliding Panel */}
      {selectedItem && (
        <div className="fixed inset-y-0 right-0 w-96 bg-[#1a1a1a] border-l border-gray-800 shadow-xl transform transition-transform duration-200 ease-in-out overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-xl font-semibold">Detalles de Partida</h2>
              <button 
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Materials Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-white font-medium">Materiales</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {selectedItem.materiales?.length || 0} items
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopyItem('material')}
                    className="flex items-center gap-2 px-3 py-1 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors text-sm"
                  >
                    <Copy size={16} />
                    Copiar
                  </button>
                  <button
                    className="flex items-center gap-2 px-3 py-1 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors text-sm"
                  >
                    <Plus size={16} />
                    Agregar
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {selectedItem.materiales?.map((material: any, index: number) => (
                  <div key={index} className="bg-[#2a2a2a] p-3 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-white text-sm font-medium">{material.descripcion}</div>
                        <div className="text-gray-400 text-xs">
                          Código: {material.codigo} | Costo: {material.costo}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditItem('material', material)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteItem('material', material)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <label className="text-gray-400 text-xs">Cantidad:</label>
                      <input
                        type="number"
                        value={material.cantidad}
                        onChange={(e) => handleUpdateQuantity(e, 'material', material)}
                        className="bg-[#1a1a1a] text-white text-sm rounded px-2 py-1 w-20"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-white font-medium">Equipos</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {selectedItem.equipos?.length || 0} items
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopyItem('equipo')}
                    className="flex items-center gap-2 px-3 py-1 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors text-sm"
                  >
                    <Copy size={16} />
                    Copiar
                  </button>
                  <button
                    className="flex items-center gap-2 px-3 py-1 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors text-sm"
                  >
                    <Plus size={16} />
                    Agregar
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {selectedItem.equipos?.map((equipo: any, index: number) => (
                  <div key={index} className="bg-[#2a2a2a] p-3 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-white text-sm font-medium">{equipo.descripcion}</div>
                        <div className="text-gray-400 text-xs">
                          Código: {equipo.codigo} | Costo: {equipo.costo}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditItem('equipo', equipo)}
                          className="text-gray-400 hover:text-white"
                        >
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
                    <div className="flex items-center gap-2 mt-2">
                      <label className="text-gray-400 text-xs">Cantidad:</label>
                      <input
                        type="number"
                        value={equipo.cantidad}
                        onChange={(e) => handleUpdateQuantity(e, 'equipo', equipo)}
                        className="bg-[#1a1a1a] text-white text-sm rounded px-2 py-1 w-20"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Labor Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-white font-medium">Mano de Obra</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {selectedItem.manoDeObra?.length || 0} items
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopyItem('mano-de-obra')}
                    className="flex items-center gap-2 px-3 py-1 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors text-sm"
                  >
                    <Copy size={16} />
                    Copiar
                  </button>
                  <button
                    className="flex items-center gap-2 px-3 py-1 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors text-sm"
                  >
                    <Plus size={16} />
                    Agregar
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {selectedItem.manoDeObra?.map((mano: any, index: number) => (
                  <div key={index} className="bg-[#2a2a2a] p-3 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-white text-sm font-medium">{mano.descripcion}</div>
                        <div className="text-gray-400 text-xs">
                          Código: {mano.codigo} | Costo: {mano.costo}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditItem('mano-de-obra', mano)}
                          className="text-gray-400 hover:text-white"
                        >
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
                    <div className="flex items-center gap-2 mt-2">
                      <label className="text-gray-400 text-xs">Cantidad:</label>
                      <input
                        type="number"
                        value={mano.cantidad}
                        onChange={(e) => handleUpdateQuantity(e, 'mano-de-obra', mano)}
                        className="bg-[#1a1a1a] text-white text-sm rounded px-2 py-1 w-20"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800">
              <button
                onClick={handleSaveChanges}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Save size={20} />
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      <BudgetItemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={(item) => {
          setItems([...items, item]);
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
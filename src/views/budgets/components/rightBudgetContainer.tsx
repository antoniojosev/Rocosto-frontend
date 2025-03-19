import React, { useState, useCallback } from 'react';
// import EditListItem from '../../../components/ui/editItemList';
import { IEquipment, ILabor, IMaterial, IWorkItem } from '../../../types/Database';
import { Copy, Edit2, Plus, Save, Trash, X } from 'lucide-react';
import Header from './header';
import HeaderTable from '../../../components/ui/headerTable';
import EditListItem from '../../../components/ui/editItemList';

interface rightBudgetContainerProps {
  selectedItem: IWorkItem;
}

function RightBudgetContainer({ selectedItem }: rightBudgetContainerProps) {
  const [activeTab, setActiveTab] = useState('material');

  const tabsConfig = [
    {
      key: 'material',
      label: 'Materiales',
      count: selectedItem.material.length,
      columns: [
        { key: 'code', label: 'Código', type: 'text', colSpan: 1 },
        { key: 'description', label: 'Descripción', type: 'text', colSpan: 2},
        { key: 'unit', label: 'Unidad', type: 'select', colSpan: 1 },
        { key: 'quantity', label: 'Cantidad', type: 'number', colSpan: 1 },
        { key: 'cost', label: 'Costo', type: 'number', colSpan: 1 },
        { key: 'total', label: 'Total', type: 'display', colSpan: 1, compute: (item: IMaterial) => item.quantity * item.cost }
      ]
    },
    {
      key: 'equipment',
      label: 'Equipos',
      count: selectedItem.equipment.length, 
      columns: [
        { key: 'code', label: 'Código', type: 'text' },
        { key: 'description', label: 'Descripción', type: 'text' },
        { key: 'quantity', label: 'Cantidad', type: 'number' },
        { key: 'cost', label: 'Costo', type: 'number' },
        { key: 'depreciation', label: 'Depreciación', type: 'number' },
        { key: 'total', label: 'Total', type: 'display', compute: (item: IEquipment) => item.quantity * item.depreciation * item.cost }
      ]
    },
    {
      key: 'labor',
      label: 'Mano de Obra',
      count: selectedItem.labor.length,
      columns: [
        { key: 'code', label: 'Código', type: 'text' },
        { key: 'description', label: 'Descripción', type: 'text' }, 
        { key: 'quantity', label: 'Cantidad', type: 'number' },
        { key: 'hourly_cost', label: 'Costo por Hora', type: 'number' },
        { key: 'total', label: 'Total', type: 'display', compute: (item: ILabor) => item.quantity * item.hourly_cost }
      ]
    }
  ]

  return (
    <div className="p-6">
      <Header
        title={selectedItem.code}
        subtitle={selectedItem.description}
        titleButton="Guardar Cambios"
        setIsModalOpen={() => { }}
      />{/* TODO: Agregar funcionalidad para guardar los cambios */}

      <div className="flex gap-2 mb-6">
        {tabsConfig.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.key
              ? 'bg-white text-black'
              : 'bg-[#2a2a2a] text-gray-300 hover:text-white'
              }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {activeTab === 'material' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-white font-medium">Materiales</h4>
            <div className="flex gap-2">
              <button
                // onClick={() => handleCopyItem('material')}
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

          <HeaderTable
            columns={tabsConfig[0].columns}
            gridCols={tabsConfig[0].columns.length + 1}
          />

          <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
            {selectedItem.material.map((material: IMaterial) => (
              <EditListItem
                key={material.id}
                item={{...material, quantity : 1}}
                columns={tabsConfig[0].columns}
                gridCols={tabsConfig[0].columns.length + 1 }
              />
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700 text-right">
            <span className="text-gray-400 text-sm">Total Materiales: </span>
            <span className="text-white font-semibold">{selectedItem.unit}</span>
          </div>
        </div>
      )}

      {activeTab === 'equipment' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-white font-medium">Equipos</h4>
            <div className="flex gap-2">
              <button
                // onClick={() => handleCopyItem('equipo')}
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
            {selectedItem.equipment.map((equipo: IEquipment) => (
              <div key={equipo.id} className="grid grid-cols-5 gap-4 items-center bg-[#2a2a2a] p-3 rounded-lg">
                <div className="text-white">{equipo.code}</div>
                <div className="text-white">{equipo.description}</div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={equipo.depreciation}
                    // onChange={(e) => handleUpdateQuantity(e, 'equipo', equipo)}
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
                      // onClick={() => handleDeleteItem('equipo', equipo)}
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

      {activeTab === 'labor' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-white font-medium">Mano de Obra</h4>
            <div className="flex gap-2">
              <button
                // onClick={() => handleCopyItem('mano-de-obra')}
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
            {selectedItem.labor.map((mano: ILabor) => (
              <div key={mano.code} className="grid grid-cols-5 gap-4 items-center bg-[#2a2a2a] p-3 rounded-lg">
                <div className="text-white">{mano.code}</div>
                <div className="text-white">{mano.description}</div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={mano.hourly_cost}
                    // onChange={(e) => handleUpdateQuantity(e, 'mano-de-obra', mano)}
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
                      // onClick={() => handleDeleteItem('mano-de-obra', mano)}
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


  );
}

export default RightBudgetContainer;

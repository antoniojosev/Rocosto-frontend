import React, { useState } from 'react';
import { IEquipment, ILabor, IMaterial, IWorkItem } from '../../../types/Database';
import Header from './header';
import EditWorkItemTable from './editWorkItemTable';

interface rightBudgetContainerProps {
  selectedItem: IWorkItem;
  setSelectedItem: (selecteItem: IWorkItem) => void;
}

function RightBudgetContainer({ selectedItem, setSelectedItem }: rightBudgetContainerProps) {
  const [activeTab, setActiveTab] = useState('material');

  const handleNewItem = (key: string) => {
    const tab = tabsConfig.find(t => t.key === key);
    if (!tab) return;

    const newItem = tab.columns.reduce((acc, col) => {
      if (col.type !== 'display') {
        acc[col.key] = col.type === 'number' ? 1 : '';
      }
      return acc;
    }, {} as any);

    const updatedItem = {
      ...selectedItem,
      [key]: [...selectedItem[key as keyof IWorkItem] as any[], newItem]
    };
    setSelectedItem(updatedItem);
  };


  const handleUpdateItem = (key: string, index: number, field: string, value: any) => {
    const updatedItems = (selectedItem[key as keyof IWorkItem] as any[]).map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, [field]: value };
        const tabConfig = tabsConfig.find(tab => tab.key === key);
        
        const compute = tabConfig?.compute;
        return { ...updatedItem, total: compute ? compute(updatedItem) : 15 };
      }
      return item;
    });
    
    const newCategoryTotal = updatedItems.reduce((acc: number, item) => acc + (item.total || 0), 0);

    const updatedItem = {
      ...selectedItem,
      [key]: updatedItems,
      total: newCategoryTotal
    };

    setSelectedItem(updatedItem);


    console.log(updatedItem)
  };


  const tabsConfig = [
    {
      key: 'material',
      label: 'Materiales',
      count: selectedItem.material.length,
      compute: (item: IMaterial) => item.quantity * item.cost,
      columns: [
        { key: 'code', label: 'Código', type: 'text', colSpan: 1 },
        { key: 'description', label: 'Descripción', type: 'text', colSpan: 2 },
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
      compute: (item: IEquipment) => item.quantity * item.depreciation * item.cost,
      columns: [
        { key: 'code', label: 'Código', type: 'text' },
        { key: 'description', label: 'Descripción', type: 'text', colSpan: 2 },
        { key: 'quantity', label: 'Cantidad', type: 'number' },
        { key: 'cost', label: 'Costo', type: 'number' },
        { key: 'depreciation', label: 'Depreciación', type: 'number' },
        {
          key: 'total',
          label: 'Total',
          type: 'display',
          compute: (item: IEquipment) => item.quantity * item.depreciation * item.cost
        }
      ]
    },
    {
      key: 'labor',
      label: 'Mano de Obra',
      count: selectedItem.labor.length,
      compute: (item: ILabor) => item.quantity * item.hourly_cost,  
      columns: [
        { key: 'code', label: 'Código', type: 'text' },
        { key: 'description', label: 'Descripción', type: 'text', colSpan: 2 },
        { key: 'quantity', label: 'Cantidad', type: 'number' },
        { key: 'hourly_cost', label: 'Costo por Hora', type: 'number' },
        {
          key: 'total',
          label: 'Total',
          type: 'display',
          compute: (item: ILabor) => item.quantity * item.hourly_cost
        }
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
      />

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

      {tabsConfig.map((tab, index) => (
        activeTab === tab.key && (
          <EditWorkItemTable
            key={tab.key}
            columns={tab.columns}
            workItem={selectedItem}
            handleNewItem={handleNewItem}
            handleUpdateItem={handleUpdateItem}
            tab={tab.key}
            index={index}
          />
        )
      ))}
    </div>


  );
}

export default RightBudgetContainer;

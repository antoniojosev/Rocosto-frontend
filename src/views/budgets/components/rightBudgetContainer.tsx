import React, { useState } from 'react';
import { IEquipment, ILabor, IMaterial, IWorkItem } from '../../../types/Database';
import Header from './header';
import EditWorkItemTable from './editWorkItemTable';
import { useDeleteItem, useDeleteWorkItem, useUpdateWorkItem } from '../../../hooks/useDatabases';

interface rightBudgetContainerProps {
  selectedItem: IWorkItem;
  setSelectedItem: (selecteItem: IWorkItem) => void;
  handleUpdateItems: (key: string, item: any) => void;
}

function RightBudgetContainer({ selectedItem, setSelectedItem, handleUpdateItems }: rightBudgetContainerProps) {
  const [activeTab, setActiveTab] = useState('material');
  const [editableInput, setEditableInput] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const mutation = useUpdateWorkItem();
  const deleteItem = useDeleteItem();

  type ValidationError = { index: number, item: any, errors: { field: string, message: string }[] };
  const [errors, setErrors] = useState<{ [key: string]: ValidationError[] }>({});


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

    
    const validationErrors: ValidationError[] = [];


    const tab = tabsConfig.find(tab => tab.key === key);
    const updateValidationBudgetItem = (updatedItem[key as keyof IWorkItem] as any[]).map((item, i) => {
    
      Object.keys(item).forEach(attr => {
        console.log(attr)
        tab?.columns.forEach(col => {
  
          if (col.key === attr && col.validation) {
            col.validation.forEach(rule => {
              if (rule.required && !item[attr]) {

                const existingError = validationErrors.find(error => error.index === i);
                if (existingError) {
                  existingError.errors.push({
                    field: col.key,
                    message: `${col.label} es requerido`
                  });
                } else {
                  validationErrors.push({
                    item: item,
                    index: i,
                    errors: [{
                      field: col.key,
                      message: `${col.label} es requerido`
                    }]
                  });
                }
              }
              // Add more validation rules here as needed
            });``
          }
  
        });
  
  
      });
    
    });

    if (validationErrors.length > 0) {
      console.error('Errores de validación:', validationErrors);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: validationErrors, // Actualizamos los errores sólo para la pestaña activa
      }));
      return;
    }

    console.log(updatedItem)
  };

  const handleSaveChanges = (selectedItem : IWorkItem) => {
    if(editableInput){

      setIsSaving(true);
      setEditableInput(false);
      const startTime = Date.now();
      
      const itemToCreate = {
        ...selectedItem,
        material: selectedItem.material.map(item => ({ 
          ...item, 
          unit_id: item.unit?.id || item.unit 
        })),
      };
  
      mutation.mutate(itemToCreate, {
        onSuccess: (data) => {
          const elapsedTime = Date.now() - startTime;
          const minimumTime = 1000; // 1 segundo
  
          if (elapsedTime < minimumTime) {
            setTimeout(() => {
              setIsSaving(false);
              setEditableInput(false);
              setSelectedItem(data);
              handleUpdateItems('material', data);
            }, minimumTime - elapsedTime);
          } else {
            setIsSaving(false);
            setEditableInput(false);
            setSelectedItem(data);
            handleUpdateItems('material', data);
          }
        },
        onError: () => {
          const elapsedTime = Date.now() - startTime;
          const minimumTime = 1000;
  
          if (elapsedTime < minimumTime) {
            setTimeout(() => {
              setIsSaving(false);
            }, minimumTime - elapsedTime);
          } else {
            setIsSaving(false);
          }
        }
      });
    }
  };

  const handleDeleteItem = (key: string, index: number) => {
    const itemToDelete = (selectedItem[key as keyof IWorkItem] as any[])[index];
    const itemId = itemToDelete.id; // Get the id before deleting
    console.log('Deleting item with id:', itemId);
    deleteItem.mutate(
      { id: itemId, type: key },
      {
        onSuccess: () => {
          console.log('Item deleted successfully');
        }
      }
    );

    const updatedItems = (selectedItem[key as keyof IWorkItem] as any[]).filter((_, i) => i !== index);
    const newCategoryTotal = updatedItems.reduce((acc: number, item) => acc + (item.total || 0), 0);

    const updatedItem = {
      ...selectedItem,
      [key]: updatedItems,
      total: newCategoryTotal
    };

    setSelectedItem(updatedItem);
  };


  const tabsConfig = [
    {
      key: 'material',
      label: 'Materiales',
      count: selectedItem.material.length,
      compute: (item: IMaterial) => item.quantity * item.cost,
      columns: [
        { key: 'code', label: 'Código', type: 'text', colSpan: 1, validation: [{ required: true }] },
        { key: 'description', label: 'Descripción', type: 'text', colSpan: 2, validation: [{ required: true }] },
        { key: 'unit', label: 'Unidad', type: 'select', colSpan: 1, validation: [{ required: true }] },
        { key: 'quantity', label: 'Cantidad', type: 'number', colSpan: 1, validation: [{ required: true }] },
        { key: 'cost', label: 'Costo', type: 'number', colSpan: 1, validation: [{ required: true }] },
        { key: 'total', label: 'Total', type: 'display', colSpan: 1, compute: (item: IMaterial) => item.quantity * item.cost }
      ]
    },
    {
      key: 'equipment',
      label: 'Equipos',
      count: selectedItem.equipment.length,
      compute: (item: IEquipment) => item.quantity * item.depreciation * item.cost,
      columns: [
        { key: 'code', label: 'Código', type: 'text', validation: [{ required: true }] },
        { key: 'description', label: 'Descripción', type: 'text', colSpan: 2, validation: [{ required: true }] },
        { key: 'quantity', label: 'Cantidad', type: 'number', validation: [{ required: true }] },
        { key: 'cost', label: 'Costo', type: 'number', validation: [{ required: true }] },
        { key: 'depreciation', label: 'Depreciación', type: 'number', validation: [{ required: true }] },
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
        { key: 'code', label: 'Código', type: 'text', validation: [{ required: true }] },
        { key: 'description', label: 'Descripción', type: 'text', colSpan: 2, validation: [{ required: true }] },
        { key: 'quantity', label: 'Cantidad', type: 'number', validation: [{ required: true }] },
        { key: 'hourly_cost', label: 'Costo por Hora', type: 'number', validation: [{ required: true }] },
        {
          key: 'total',
          label: 'Total',
          type: 'display',
          compute: (item: ILabor) => item.quantity * item.hourly_cost
        }
      ]
    }
  ]

  const disableButtonStyle = 'text-white cursor-not-allowed bg-transparent';
  const activeButtonStyle = 'bg-white text-black rounded-lg border-0 hover:bg-gray-200 transition-colors'

  return (
    <div className={`p-6 relative overflow-hidden ${isSaving ? 'loading-background pointer-events-none' : ''}`}>
      {isSaving && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent loading-animation" />
      )}
      <Header
        title={selectedItem.code}
        subtitle={selectedItem.description}
        titleButton="Guardar Cambios"
        setIsModalOpen={() => handleSaveChanges(selectedItem)}
        classNameButton={editableInput ? activeButtonStyle : disableButtonStyle}
        isLoading={isSaving}
        isSuccess={saveSuccess}
      />

      <div className="flex gap-2 mb-6">
        {tabsConfig.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`w-full px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.key
              ? 'bg-white text-black'
              : 'bg-[#2a2a2a] text-gray-300 hover:text-white'
              }`}
          >
            {tab.label} ( {tab.count} ) {errors[tab.key]?.length > 0 && <span className="text-red-500">*</span>}
          </button>
        ))}
      </div>

      {tabsConfig.map((tab) => (
        activeTab === tab.key && (
          <EditWorkItemTable
            key={tab.key}
            columns={tab.columns}
            workItem={selectedItem}
            handleNewItem={handleNewItem}
            handleUpdateItem={handleUpdateItem}
            handleDeleteItem={handleDeleteItem}
            tab={tab.key}
            errorsInWorkItem={errors[tab.key] || []}
            editableInput={editableInput}
            setEditableInput={setEditableInput}
          />
        )
      ))}
    </div>
  );
}

// Add this CSS at the end of the file
const styles = `
@keyframes loading {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

.loading-animation {
    animation: loading 1.5s infinite;
}

@keyframes progress {
    0% { width: 0%; }
    100% { width: 100%; }
}

.animate-progress {
    animation: progress 1s ease-out forwards;
}
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default RightBudgetContainer;

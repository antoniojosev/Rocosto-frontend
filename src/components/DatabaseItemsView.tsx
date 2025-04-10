import React, { useState } from 'react';
import { ArrowLeft, Plus, Copy, Search, ArrowUpDown, AlertCircle } from 'lucide-react';
import { IPageDatabase, IMaterial, IEquipment, ILabor } from '../types/Database';
import { useDatabaseWithResource, useDeleteItem, useUpdateMaterial, useUpdateEquipment, useUpdateLabor } from '../hooks/useDatabases';
import { useNotification } from '../context/NotificationContext';
import SearchBar from './Searcn';
import ResourceTable from './ResourceTable';
import DatabaseItemModal from './DatabaseItemModal';
import BudgetItemModal from './BudgetItemModal';
import CopyItemModal from './CopyItemModal';

// Componente para confirmar eliminación
interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  itemType: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, onClose, onConfirm, itemName, itemType }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-lg p-6 max-w-md w-full border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="text-red-500" size={24} />
          <h3 className="text-lg font-medium text-white">Confirmar eliminación</h3>
        </div>
        <p className="mb-6 text-gray-300">
          ¿Está seguro que desea eliminar {itemType} <span className="font-medium text-white">{itemName}</span>? Esta acción no se puede deshacer.
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

interface Database {
  id: string;
  name: string;
  description: string;
  materials: number;
  equipment: number;
  labor: number;
  items: number;
}

interface DatabaseItemsViewProps {
  database: IPageDatabase;
  onBack: () => void;
}

interface Item {
  code: string;
  description: string;
  unit: string;
  cost: number;
}

const mockItems: Item[] = [
  {
    code: 'MAT001',
    description: 'Cemento',
    unit: 'kg',
    cost: 0.50,
  },
  {
    code: 'MAT002',
    description: 'Arena',
    unit: 'm3',
    cost: 20.00,
  },
];

const DatabaseItemsView: React.FC<DatabaseItemsViewProps> = ({ database, onBack }) => {
  const [activeTab, setActiveTab] = useState('MAT');
  const [searchTerm, setSearchTerm] = useState('');
  const [resourceType, setResourceType] = useState(activeTab);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: string, name: string, type: string} | null>(null);
  const { data, refetch } = useDatabaseWithResource(database.id, resourceType);
  const deleteItemMutation = useDeleteItem();
  const { addNotification } = useNotification();
  
  // Update resourceType when activeTab changes
  React.useEffect(() => {
    setResourceType(activeTab);
  }, [activeTab]);
  
  // Function to handle custom resource type changes
  const handleResourceTypeChange = (type: string) => {
    setResourceType(type);
  };

  // Handle adding new item
  const handleAddItem = () => {
    setEditItem(null);
    setIsModalOpen(true);
  };

  // Handle editing an item
  const handleEditItem = (item: any) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  // Handle deleting an item
  const handleDeleteItem = (item: any) => {
    let itemType = '';
    switch (activeTab) {
      case 'MAT':
        itemType = 'el material';
        break;
      case 'EQU':
        itemType = 'el equipo';
        break;
      case 'LAB':
        itemType = 'la mano de obra';
        break;
      case 'WI':
        itemType = 'la partida';
        break;
    }
    
    setItemToDelete({
      id: item.id,
      name: item.description || item.code,
      type: itemType
    });
    setIsDeleteDialogOpen(true);
  };

  // Confirm deletion
  const confirmDelete = async () => {
    if (!itemToDelete) return;
    
    let resourceTypeForDelete = '';
    switch (activeTab) {
      case 'MAT':
        resourceTypeForDelete = 'material';
        break;
      case 'EQU':
        resourceTypeForDelete = 'equipment';
        break;
      case 'LAB':
        resourceTypeForDelete = 'labor';
        break;
      default:
        resourceTypeForDelete = '';
    }
    
    try {
      if (activeTab === 'WI') {
        // Use a different API endpoint for work items
        await deleteItemMutation.mutateAsync({ id: itemToDelete.id, type: 'workitem' });
      } else {
        await deleteItemMutation.mutateAsync({ id: itemToDelete.id, type: resourceTypeForDelete });
      }
      addNotification('success', 'Item eliminado correctamente');
      refetch();
    } catch (error) {
      console.error('Error al eliminar el item:', error);
      addNotification('error', 'Error al eliminar el item');
    }
    
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditItem(null);
  };

  // Handle item updated or created
  const handleItemCreated = (item: any) => {
    console.log('Item processed:', item);
    // Refetch data to update the list
    refetch();
  };

  const tabs = [
    { id: 'MAT', label: 'Materiales' },
    { id: 'EQU', label: 'Equipos' },
    { id: 'LAB', label: 'Mano de Obra' },
    { id: 'WI', label: 'Partidas' },
  ];

  const tabsConfig = [
      {
        key: 'MAT',
        label: 'Materiales',
        columns: [
          { key: 'code', label: 'Código', type: 'text', colSpan: 1, validation: [{ required: true }] },
          { key: 'description', label: 'Descripción', type: 'text', colSpan: 2, validation: [{ required: true }] },
          { key: 'unit', label: 'Unidad', type: 'select', colSpan: 1, validation: [{ required: true }] },
          { key: 'cost', label: 'Costo', type: 'number', colSpan: 1, validation: [{ required: true }] },
        ]
      },
      {
        key: 'EQU',
        label: 'Equipos',
        columns: [
          { key: 'code', label: 'Código', type: 'text', validation: [{ required: true }] },
          { key: 'description', label: 'Descripción', type: 'text', colSpan: 2, validation: [{ required: true }] },
          { key: 'cost', label: 'Costo', type: 'number', validation: [{ required: true }] },
          { key: 'depreciation', label: 'Depreciación', type: 'number', validation: [{ required: true }]},        ]
      },
      {
        key: 'LAB',
        label: 'Mano de Obra', 
        columns: [
          { key: 'code', label: 'Código', type: 'text', validation: [{ required: true }] },
          { key: 'description', label: 'Descripción', type: 'text', colSpan: 2, validation: [{ required: true }] },
          { key: 'hourly_cost', label: 'Costo por Hora', type: 'number', validation: [{ required: true }] },
        ]
      },
      {
        key: 'WI',
        label: 'Partidas',
        columns: [
          { key: 'code', label: 'Código', type: 'text', colSpan: 1, validation: [{ required: true }] },
          { key: 'description', label: 'Descripción', type: 'text', colSpan: 2, validation: [{ required: true }] },
          { key: 'unit', label: 'Unidad', type: 'select', colSpan: 1, validation: [{ required: true }] },
          { key: 'total_cost', label: 'Total', type: 'number', colSpan: 1, validation: [{ required: true }] }
        ]
      }
    ]

  // Obtener la configuración actual según la pestaña activa
  const activeConfig = tabsConfig.find(tab => tab.key === activeTab) || tabsConfig[0];

  // Mock budget for WI tab
  const mockBudget = {
    id: "mock-budget-id",
    name: "Mock Budget",
    code: "MB-001",
    company: { id: "1", name: "Company" },
    created_at: new Date().toISOString(),
    state: "IN_PROGRESS",
    owner: { id: "1", username: "Owner" },
    calculated_by: { id: "2", username: "Calculator" },
    reviewed_by: { id: "3", username: "Reviewer" }
  };

  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
      >
        <ArrowLeft size={20} />
        Volver a Bases de Datos
      </button>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">{database.name}</h1>
          <p className="text-gray-400">{database.description}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors">
            <Copy size={20} />
            Copiar Item
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
            onClick={handleAddItem}
          >
            <Plus size={20} />
            Agregar {tabs.find(tab => tab.id === activeTab)?.label.replace('es', '').replace('s', '')}
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-black'
                : 'bg-[#2a2a2a] text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>


      <SearchBar onSearch={setSearchTerm}/>

      <div className="bg-[#1a1a1a] rounded-lg border border-gray-800">
        <ResourceTable 
          config={tabsConfig.find(tab => tab.key === activeTab) || tabsConfig[0]} 
          data={data?.resources?.results || []} 
          searchTerm={searchTerm} 
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
        />
      </div>

      {/* Modal for creating new items */}
      {isModalOpen && activeTab !== 'WI' && (
        <DatabaseItemModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          resourceType={activeTab}
          databaseId={database.id}
          onAdd={handleItemCreated}
          columns={activeConfig.columns}
          editItem={editItem}
        />
      )}

      {/* Use BudgetItemModal for workitems (WI) */}
      {isModalOpen && activeTab === 'WI' && (
        <BudgetItemModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          database={database}
          onAdd={handleItemCreated}
        />
      )}

      {/* Confirm delete dialog */}
      {isDeleteDialogOpen && itemToDelete && (
        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          itemName={itemToDelete.name}
          itemType={itemToDelete.type}
        />
      )}
    </div>
  );
};

export default DatabaseItemsView;
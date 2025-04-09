import React, { useState } from 'react';
import { ArrowLeft, Plus, Copy, Search, ArrowUpDown } from 'lucide-react';
import { IPageDatabase } from '../types/Database';
import { useDatabaseWithResource } from '../hooks/useDatabases';
import SearchBar from './Searcn';
import ResourceTable from './ResourceTable';
import DatabaseItemModal from './DatabaseItemModal';
import BudgetItemModal from './BudgetItemModal';

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
  const { data, refetch } = useDatabaseWithResource(database.id, resourceType);
  
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
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle new item created
  const handleItemCreated = (item: any) => {
    console.log('New item created:', item);
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
    </div>
  );
};

export default DatabaseItemsView;
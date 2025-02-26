import React, { useState } from 'react';
import { Plus, Copy, Search, ArrowUpDown } from 'lucide-react';
import DatabaseModal from './DatabaseModal';
import DatabaseItemsView from './DatabaseItemsView';

interface Database {
  id: string;
  name: string;
  description: string;
  materials: number;
  equipment: number;
  labor: number;
  items: number;
}

const mockDatabases: Database[] = [
  {
    id: '1',
    name: 'Base de Datos General',
    description: 'Base de datos principal con todos los items estándar',
    materials: 150,
    equipment: 75,
    labor: 50,
    items: 100,
  },
];

const DatabaseView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDatabase, setSelectedDatabase] = useState<Database | null>(null);

  if (selectedDatabase) {
    return (
      <DatabaseItemsView 
        database={selectedDatabase} 
        onBack={() => setSelectedDatabase(null)} 
      />
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Bases de Datos</h1>
          <p className="text-gray-400">Gestione sus bases de datos de materiales, equipos, mano de obra y partidas</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Plus size={20} />
          Nueva Base de Datos
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Filtrar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#2a2a2a] text-white rounded-lg pl-10 pr-4 py-2 border border-gray-700 focus:outline-none focus:border-gray-600"
        />
      </div>

      <div className="bg-[#1a1a1a] rounded-lg border border-gray-800">
        <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-800 text-sm text-gray-400">
          <div className="col-span-2 flex items-center gap-2">
            Nombre <ArrowUpDown size={14} />
          </div>
          <div className="flex items-center gap-2">
            Materiales <ArrowUpDown size={14} />
          </div>
          <div className="flex items-center gap-2">
            Equipos <ArrowUpDown size={14} />
          </div>
          <div className="flex items-center gap-2">
            Mano de Obra <ArrowUpDown size={14} />
          </div>
          <div className="flex items-center gap-2">
            Partidas <ArrowUpDown size={14} />
          </div>
        </div>

        <div className="divide-y divide-gray-800">
          {mockDatabases
            .filter(db => db.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(database => (
              <div
                key={database.id}
                className="grid grid-cols-6 gap-4 p-4 text-sm hover:bg-[#2a2a2a] cursor-pointer transition-colors"
                onClick={() => setSelectedDatabase(database)}
              >
                <div className="col-span-2">
                  <div className="text-white font-medium">{database.name}</div>
                  <div className="text-gray-400 text-xs mt-1">{database.description}</div>
                </div>
                <div className="text-white">{database.materials}</div>
                <div className="text-white">{database.equipment}</div>
                <div className="text-white">{database.labor}</div>
                <div className="text-white">{database.items}</div>
              </div>
            ))}
        </div>
      </div>

      <DatabaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default DatabaseView;
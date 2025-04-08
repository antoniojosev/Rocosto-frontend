import React, { useState } from 'react';
import { Plus, Search, ArrowUpDown, Pencil, Trash, AlertCircle } from 'lucide-react';
import DatabaseModal from './DatabaseModal';
import DatabaseItemsView from './DatabaseItemsView';
import useDatabase, { useDeleteDatabase } from '../hooks/useDatabases';
import { IPageDatabase } from '../types/Database';
import { useNotification } from '../context/NotificationContext';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  databaseName: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, onClose, onConfirm, databaseName }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-lg p-6 max-w-md w-full border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="text-red-500" size={24} />
          <h3 className="text-lg font-medium text-white">Confirmar eliminación</h3>
        </div>
        <p className="mb-6 text-gray-300">
          ¿Está seguro que desea eliminar la base de datos <span className="font-medium text-white">{databaseName}</span>? Esta acción no se puede deshacer.
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

const DatabaseView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDatabase, setSelectedDatabase] = useState<IPageDatabase | null>(null);
  const [editDatabase, setEditDatabase] = useState<IPageDatabase | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [databaseToDelete, setDatabaseToDelete] = useState<{id: string, name: string} | null>(null);
  const { data } = useDatabase();
  const deleteDatabase = useDeleteDatabase();
  const { addNotification } = useNotification();

  const handleEdit = (e: React.MouseEvent, database: IPageDatabase) => {
    e.stopPropagation();
    setEditDatabase(database);
    setIsModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent, database: IPageDatabase) => {
    e.stopPropagation();
    setDatabaseToDelete({id: database.id, name: database.name});
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!databaseToDelete) return;
    
    try {
      await deleteDatabase.mutateAsync(databaseToDelete.id);
      addNotification('success', 'Base de datos eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la base de datos:', error);
      addNotification('error', 'Error al eliminar la base de datos');
    }
    
    setIsDeleteDialogOpen(false);
    setDatabaseToDelete(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditDatabase(null);
  };

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
          className="w-full bg-[#2a2a2a] text-white rounded-lg pl-10 pr-4 py-2 border border-gray-700"
        />
      </div>

      <div className="bg-[#2a2a2a] rounded-lg">
        <div className="grid grid-cols-7 gap-4 p-4 border-b border-gray-800 text-sm text-gray-400">
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
          <div className="text-center">Acciones</div>
        </div>

        <div className="divide-y divide-gray-800">
          {(data ?? []) 
            .filter(db => db.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(database => (
              <div
                key={database.id}
                className="grid grid-cols-7 gap-4 p-4 text-sm hover:bg-[#3a3a3a] cursor-pointer transition-colors"
                onClick={() => setSelectedDatabase(database)}
              >
                <div className="col-span-2">
                  <div className="text-white font-medium">{database.name}</div>
                  <div className="text-gray-400 text-xs mt-1">{database.description}</div>
                </div>
                <div className="text-white">{database.total_materials}</div>
                <div className="text-white">{database.total_equipment}</div>
                <div className="text-white">{database.total_labor}</div>
                <div className="text-white">{database.total_equipment + database.total_materials + database.total_labor}</div>
                <div className="flex justify-center items-center gap-2">
                  <button 
                    onClick={(e) => handleEdit(e, database)}
                    className="p-1.5 bg-blue-500/20 text-blue-400 rounded-md hover:bg-blue-500/30 transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, database)}
                    className="p-1.5 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30 transition-colors"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <DatabaseModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        database={editDatabase || undefined}
        isEditMode={!!editDatabase}
      />

      <ConfirmDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        databaseName={databaseToDelete?.name || ''}
      />
    </div>
  );
};

export default DatabaseView;
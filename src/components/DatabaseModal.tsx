import React from 'react';
import { X } from 'lucide-react';

interface DatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DatabaseModal: React.FC<DatabaseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#1a1a1a] rounded-lg w-full max-w-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-2xl font-semibold">Nueva Base de Datos</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">Nombre</label>
              <input
                type="text"
                className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700"
                placeholder="Nombre de la base de datos"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Descripción</label>
              <textarea
                className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700 h-24 resize-none"
                placeholder="Descripción de la base de datos"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-800">
            <button
              onClick={onClose}
              className="px-4 py-2 text-white bg-[#2a2a2a] rounded-md hover:bg-[#3a3a3a] transition-colors"
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
            >
              Crear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseModal;
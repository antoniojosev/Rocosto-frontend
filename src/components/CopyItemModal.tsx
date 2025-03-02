import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

interface CopyItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: any) => void;
  title: string;
  type: 'partida' | 'material' | 'equipo' | 'mano-de-obra';
}

const mockDatabases = [
  { id: 1, name: 'Base de Datos 1' },
  { id: 2, name: 'Base de Datos 2' },
  { id: 3, name: 'Base de Datos General' },
];

const mockItems = {
  partida: [
    { codigo: 'PAR001', descripcion: 'Partida 1', unidad: 'm2', costo: 100.00 },
    { codigo: 'PAR002', descripcion: 'Partida 2', unidad: 'm3', costo: 200.00 },
  ],
  material: [
    { codigo: 'MAT001', descripcion: 'Cemento', unidad: 'kg', costo: 0.50 },
    { codigo: 'MAT002', descripcion: 'Arena', unidad: 'm3', costo: 20.00 },
  ],
  equipo: [
    { codigo: 'EQU001', descripcion: 'Mezcladora', unidad: 'hr', costo: 15.00 },
    { codigo: 'EQU002', descripcion: 'Andamio', unidad: 'día', costo: 25.00 },
  ],
  'mano-de-obra': [
    { codigo: 'MO001', descripcion: 'Albañil', unidad: 'hr', costo: 12.00 },
    { codigo: 'MO002', descripcion: 'Ayudante', unidad: 'hr', costo: 8.00 },
  ],
};

const CopyItemModal: React.FC<CopyItemModalProps> = ({ isOpen, onClose, onSelect, title, type }) => {
  const [selectedDatabase, setSelectedDatabase] = useState(mockDatabases[0].id);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredItems = mockItems[type].filter(
    item => 
      item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-lg w-full max-w-3xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-2xl font-semibold">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <select
                value={selectedDatabase}
                onChange={(e) => setSelectedDatabase(Number(e.target.value))}
                className="w-full bg-[#2a2a2a] text-white rounded-lg pl-4 pr-10 py-2 border border-gray-700 appearance-none"
              >
                {mockDatabases.map(db => (
                  <option key={db.id} value={db.id}>{db.name}</option>
                ))}
              </select>
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#2a2a2a] text-white rounded-lg pl-10 pr-4 py-2 border border-gray-700"
              />
            </div>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg border border-gray-700">
            <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-700 text-sm text-gray-400">
              <div>Código</div>
              <div>Descripción</div>
              <div>Unidad</div>
              <div className="text-right">Costo</div>
            </div>

            <div className="divide-y divide-gray-700">
              {filteredItems.map((item) => (
                <div
                  key={item.codigo}
                  className="grid grid-cols-4 gap-4 p-4 text-sm hover:bg-[#3a3a3a] transition-colors"
                >
                  <div className="text-white">{item.codigo}</div>
                  <div className="text-white">{item.descripcion}</div>
                  <div className="text-white">{item.unidad}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">{item.costo?.toFixed(2)}</span>
                    <button
                      onClick={() => onSelect(item)}
                      className="px-4 py-1 bg-white text-black rounded-md hover:bg-gray-200 transition-colors text-sm"
                    >
                      Seleccionar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyItemModal;
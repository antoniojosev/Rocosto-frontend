import React, { useState } from 'react';
import { X, Plus, Copy, Trash } from 'lucide-react';
import CopyItemModal from './CopyItemModal';

interface BudgetItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: any) => void;
}

const BudgetItemModal: React.FC<BudgetItemModalProps> = ({ isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [unitaryType, setUnitaryType] = useState('unitary');
  const [copyModalType, setCopyModalType] = useState<'partida' | 'material' | 'equipo' | 'mano-de-obra' | null>(null);
  const [formData, setFormData] = useState({
    codigo: '',
    codigoCovenin: '',
    descripcion: '',
    unidad: '',
    rendimiento: 0,
    materiales: [],
    equipos: [],
    manoDeObra: []
  });

  if (!isOpen) return null;

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'materiales', label: 'Materiales' },
    { id: 'equipos', label: 'Equipos' },
    { id: 'mano-de-obra', label: 'Mano de Obra' },
    { id: 'mediciones', label: 'Mediciones' },
  ];

  const handleCopyItem = (type: 'partida' | 'material' | 'equipo' | 'mano-de-obra') => {
    setCopyModalType(type);
  };

  const handleSelectItem = (item: any) => {
    if (copyModalType === 'partida') {
      setFormData({
        ...formData,
        codigo: item.codigo,
        descripcion: item.descripcion,
        unidad: item.unidad
      });
    } else if (copyModalType === 'material') {
      setFormData({
        ...formData,
        materiales: [...formData.materiales, item]
      });
    } else if (copyModalType === 'equipo') {
      setFormData({
        ...formData,
        equipos: [...formData.equipos, item]
      });
    } else if (copyModalType === 'mano-de-obra') {
      setFormData({
        ...formData,
        manoDeObra: [...formData.manoDeObra, item]
      });
    }
    setCopyModalType(null);
  };

  const handleSave = () => {
    onSave({
      ...formData,
      description: formData.descripcion,
      unit: formData.unidad,
      quantity: 1,
      unitPrice: 100,
      total: 100
    });
  };

  const modalTitles = {
    partida: 'Copiar Partida',
    material: 'Copiar Material',
    equipo: 'Copiar Equipo',
    'mano-de-obra': 'Copiar Mano de Obra',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#1a1a1a] rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-white text-2xl font-semibold">Nueva Partida</h2>
              <p className="text-gray-400 text-sm mt-1">
                Complete los detalles de la nueva partida. Incluya información general, materiales, equipos y mano de obra.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleCopyItem('partida')}
                className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors"
              >
                <Copy size={20} />
                Copiar Partida Existente
              </button>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X size={24} />
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

          <div className="overflow-y-auto max-h-[calc(90vh-16rem)] pr-2 custom-scrollbar">
            {activeTab === 'general' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Código</label>
                    <input 
                      type="text" 
                      value={formData.codigo}
                      onChange={(e) => setFormData({...formData, codigo: e.target.value})}
                      className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700" 
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Código Covenin</label>
                    <input 
                      type="text" 
                      value={formData.codigoCovenin}
                      onChange={(e) => setFormData({...formData, codigoCovenin: e.target.value})}
                      className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white mb-2">Descripción</label>
                  <textarea 
                    value={formData.descripcion}
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700 h-24 resize-none" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Unidad</label>
                    <input 
                      type="text" 
                      value={formData.unidad}
                      onChange={(e) => setFormData({...formData, unidad: e.target.value})}
                      className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700" 
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Rendimiento</label>
                    <input 
                      type="number" 
                      value={formData.rendimiento}
                      onChange={(e) => setFormData({...formData, rendimiento: Number(e.target.value)})}
                      className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white mb-4">Usar unitario de materiales</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-300">
                      <input 
                        type="radio" 
                        name="unitary" 
                        value="unitary"
                        checked={unitaryType === 'unitary'}
                        onChange={(e) => setUnitaryType(e.target.value)}
                        className="text-orange-500" 
                      />
                      Unitario
                    </label>
                    <label className="flex items-center gap-2 text-gray-300">
                      <input 
                        type="radio" 
                        name="unitary" 
                        value="divided"
                        checked={unitaryType === 'divided'}
                        onChange={(e) => setUnitaryType(e.target.value)}
                        className="text-orange-500" 
                      />
                      Dividido por la cantidad
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'materiales' && (
              <div>
                <div className="flex justify-end gap-2 mb-4">
                  <button 
                    onClick={() => handleCopyItem('material')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors"
                  >
                    <Copy size={20} />
                    Copiar Material
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
                    <Plus size={20} />
                    Agregar Material
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-4 mb-2 text-sm text-gray-400">
                  <div>Código</div>
                  <div>Descripción</div>
                  <div>Cantidad</div>
                  <div>Costo</div>
                  <div>Desperdicio %</div>
                </div>

                <div className="space-y-2">
                  {formData.materiales.map((material: any, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 items-center">
                      <div className="text-white">{material.codigo}</div>
                      <div className="text-white">{material.descripcion}</div>
                      <input 
                        type="number" 
                        defaultValue={1}
                        className="bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700" 
                      />
                      <div className="text-white">{material.costo}</div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          defaultValue={0}
                          className="bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700" 
                        />
                        <button 
                          onClick={() => {
                            const newMateriales = [...formData.materiales];
                            newMateriales.splice(index, 1);
                            setFormData({...formData, materiales: newMateriales});
                          }} 
                          className="text-gray-400 hover:text-white"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'equipos' && (
              <div>
                <div className="flex justify-end gap-2 mb-4">
                  <button 
                    onClick={() => handleCopyItem('equipo')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors"
                  >
                    <Copy size={20} />
                    Copiar Equipo
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
                    <Plus size={20} />
                    Agregar Equipo
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-4 mb-2 text-sm text-gray-400">
                  <div>Código</div>
                  <div>Descripción</div>
                  <div>Cantidad</div>
                  <div>Costo</div>
                  <div>Depreciación</div>
                </div>

                <div className="space-y-2">
                  {formData.equipos.map((equipo: any, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 items-center">
                      <div className="text-white">{equipo.codigo}</div>
                      <div className="text-white">{equipo.descripcion}</div>
                      <input 
                        type="number" 
                        defaultValue={1}
                        className="bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700" 
                      />
                      <div className="text-white">{equipo.costo}</div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          defaultValue={0}
                          className="bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700" 
                        />
                        <button 
                          onClick={() => {
                            const newEquipos = [...formData.equipos];
                            newEquipos.splice(index, 1);
                            setFormData({...formData, equipos: newEquipos});
                          }}
                          className="text-gray-400 hover:text-white"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'mano-de-obra' && (
              <div>
                <div className="flex justify-end gap-2 mb-4">
                  <button 
                    onClick={() => handleCopyItem('mano-de-obra')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors"
                  >
                    <Copy size={20} />
                    Copiar Mano de Obra
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
                    <Plus size={20} />
                    Agregar Mano de Obra
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-2 text-sm text-gray-400">
                  <div>Código</div>
                  <div>Descripción</div>
                  <div>Cantidad</div>
                  <div>Costo</div>
                </div>

                <div className="space-y-2">
                  {formData.manoDeObra.map((mano: any, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 items-center">
                      <div className="text-white">{mano.codigo}</div>
                      <div className="text-white">{mano.descripcion}</div>
                      <input 
                        type="number" 
                        defaultValue={1}
                        className="bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700" 
                      />
                      <div className="flex items-center gap-2">
                        <div className="text-white">{mano.costo}</div>
                        <button 
                          onClick={() => {
                            const newManoDeObra = [...formData.manoDeObra];
                            newManoDeObra.splice(index, 1);
                            setFormData({...formData, manoDeObra: newManoDeObra});
                          }}
                          className="text-gray-400 hover:text-white"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-800">
            <div className="bg-[#2a2a2a] rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3">Resumen de Costos</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Total Materiales:</p>
                  <p className="text-white">0.00</p>
                </div>
                <div>
                  <p className="text-gray-400">Total Equipos:</p>
                  <p className="text-white">0.00</p>
                </div>
                <div>
                  <p className="text-gray-400">Total Mano de Obra:</p>
                  <p className="text-white">0.00</p>
                </div>
                <div>
                  <p className="text-gray-400">Total Partida:</p>
                  <p className="text-white font-semibold">0.00</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button 
                onClick={onClose}
                className="px-4 py-2 text-white bg-[#2a2a2a] rounded-md hover:bg-[#3a3a3a] transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
              >
                Crear Partida
              </button>
            </div>
          </div>
        </div>
      </div>

      {copyModalType && (
        <CopyItemModal
          isOpen={true}
          onClose={() => setCopyModalType(null)}
          onSelect={handleSelectItem}
          title={modalTitles[copyModalType]}
          type={copyModalType}
        />
      )}
    </div>
  );
};

export default BudgetItemModal;
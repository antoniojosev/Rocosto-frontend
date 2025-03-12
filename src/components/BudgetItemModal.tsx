import React, { useState } from 'react';
import { X } from 'lucide-react';
import CopyItemModal from './CopyItemModal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useCreateWorkItem } from '../hooks/useDatabases';
import { IBudget } from '../types/Budget';
import { IWorkItem } from '../types/Database';



interface BudgetItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  detailBudget: IBudget;
  onAdd: (work_item : IWorkItem ) => void;
}

const BudgetItemModal: React.FC<BudgetItemModalProps> = ({ isOpen, onClose, detailBudget, onAdd }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [unitaryType, setUnitaryType] = useState('unitary');
  const [copyModalType, setCopyModalType] = useState<'partida' | 'material' | 'equipo' | 'mano-de-obra' | null>(null);
  const [formData, setFormData] = useState<IWorkItem>({
    id: '',
    code: '',
    covening_code: '',
    description: '',
    unit: '',
    yield_rate: 0,
    material_unit_usage: '',
    material: [],
    equipment: [],
    labor: [],
    budget_id: detailBudget.id,
    database: null,
    total_labor_cost: 0,
    total_equipment_cost: 0,
    total_material_cost: 0,
    total_cost: 0
  });

  const { register, handleSubmit, formState: { errors } } = useForm<IWorkItem>();

  const mutation = useCreateWorkItem();

  const onSubmit: SubmitHandler<IWorkItem> = data => {
    const dataToCreate = {...data, budget_id: detailBudget.id}
    console.log('Datos del formulario:', dataToCreate);
    
    mutation.mutate(dataToCreate, {
      onSuccess: (data) => {
        console.log('response: ', data)
        onAdd(data)
        onClose()
      }
    });
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'general', label: 'General' },
    // { id: 'materiales', label: 'Materiales' },
    // { id: 'equipos', label: 'Equipos' },
    // { id: 'mano-de-obra', label: 'Mano de Obra' },
    // { id: 'mediciones', label: 'Mediciones' }, 
  ];

  const handleCopyItem = (type: 'partida' | 'material' | 'equipo' | 'mano-de-obra') => {
    setCopyModalType(type);
  };

  const handleSelectItem = (item: any) => {
    if (copyModalType === 'partida') {
      setFormData({
        ...formData,
        code: item.codigo,
        description: item.descripcion,
        unit: item.unidad
      });
    } else if (copyModalType === 'material') {
      setFormData({
        ...formData,
        material: [...formData.material, item]
      });
    } else if (copyModalType === 'equipo') {
      setFormData({
        ...formData,
        equipment: [...formData.equipment, item]
      });
    } else if (copyModalType === 'mano-de-obra') {
      setFormData({
        ...formData,
        labor: [...formData.labor, item]
      });
    }
    setCopyModalType(null);
  };


  const modalTitles = {
    partida: 'Copiar Partida',
    material: 'Copiar Material',
    equipo: 'Copiar Equipo',
    'mano-de-obra': 'Copiar Mano de Obra',
  };

  const handleAddNewItem = (type: 'material' | 'equipment' | 'labor') => {

    if (type === 'material') {
      const newItem = {
        code: '',
        description: '',
        unit_id: '',
        cost: 0,
        id: uuidv4()
      };
      setFormData({
        ...formData,
        material: [...formData.material, { ...newItem }]
      });
    } else if (type === 'equipment') {
      const newItem = {
        code: '',
        description: '',
        cost: 0,
        depreciation: 1,
        id: uuidv4()
      };
      setFormData({
        ...formData,
        equipment: [...formData.equipment, { ...newItem }]
      });
    } else if (type === 'labor') {
      const newItem = {
        code: '',
        description: '',
        hourly_cost: 0,
        id: uuidv4()
      };
      setFormData({
        ...formData,
        labor: [...formData.labor, newItem]
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                {/* <button
                  onClick={() => handleCopyItem('partida')}
                  className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors"
                >
                  <Copy size={20} />
                  Copiar Partida Existente
                </button> */}
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* <div className="flex gap-2 mb-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.id
                    ? 'bg-white text-black'
                    : 'bg-[#2a2a2a] text-gray-400 hover:text-white'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div> */}

            <div className="overflow-y-auto max-h-[calc(90vh-16rem)] pr-2 custom-scrollbar">
              {activeTab === 'general' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2">Código</label>
                      <input
                        id='code'
                        {...register('code', { required: 'El código es obligatorio' })}
                        type="text"
                        // value={formData.codigo}
                        // onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                        className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2">Código Covenin</label>
                      <input
                        type="text"
                        id='covening_code'
                        {...register('covening_code', { required: 'El código convening es obligatorio' })}
                        // value={formData.codigoCovenin}
                        // onChange={(e) => setFormData({ ...formData, codigoCovenin: e.target.value })}
                        className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white mb-2">Descripción</label>
                    <textarea
                      // value={formData.descripcion}
                      // onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                      id='description'
                      {...register('description', { required: 'La descripcion es obligatoria' })}
                      className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700 h-24 resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2">Unidad</label>
                      <input
                        type="text"
                        id='unit'
                        {...register('unit', { required: 'La unidad es obligatoria' })}
                        // value={formData.unidad}
                        // onChange={(e) => setFormData({ ...formData, unidad: e.target.value })}
                        className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2">Rendimiento</label>
                      <input
                        type="number"
                        id='yield_rate'
                        {...register('yield_rate', { required: 'El rendimiento es obligatorio' })}
                        // value={formData.rendimiento}
                        // onChange={(e) => setFormData({ ...formData, rendimiento: Number(e.target.value) })}
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
                          id='UNITARY'
                          
                          {...register('material_unit_usage')}
                          // name="unitary"
                          value="UNITARY"
                          // checked={unitaryType === 'unitary'}
                          // onChange={(e) => setUnitaryType(e.target.value)}
                          className="text-orange-500"
                        />
                        Unitario
                      </label>
                      <label className="flex items-center gap-2 text-gray-300">
                        <input
                          type="radio"
                          id='DIVIDED'
                          {...register('material_unit_usage')}
                          // name="unitary"
                          value="DIVIDED"
                          // checked={unitaryType === 'divided'}
                          // onChange={(e) => setUnitaryType(e.target.value)}
                          className="text-orange-500"
                        />
                        Dividido por la cantidad
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* {activeTab === 'materiales' && (
                <div>
                  <div className="flex justify-end gap-2 mb-4">
                    <button
                      onClick={() => handleCopyItem('material')}
                      className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors"
                    >
                      <Copy size={20} />
                      Copiar Material
                    </button>
                    <button
                      onClick={() => handleAddNewItem('material')}
                      className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
                      <Plus size={20} />
                      Agregar Material
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-2 text-sm text-gray-400">
                    <div>Código</div>
                    <div>Descripción</div>
                    <div>Unidad</div>
                    <div>Costo</div>
                  </div>

                  <div className="space-y-2">
                    {formData.material.map((material: IMaterial, index) => (
                      <div key={material.id} className="grid grid-cols-4 gap-4 items-center">
                        <input
                          type="text"
                          {...register('code', {required: 'El rendimiento es obligatorio' })}
                          defaultValue={material.code}
                          className="bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700"
                          placeholder="Código"
                        />
                        <input
                          type="text"
                          {...register('description', {required: 'El rendimiento es obligatorio' })}
                          defaultValue={material.description}
                          className="bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700"
                          placeholder="Descripción"
                        />
                        <input
                          type="text"
                          {...register(`material.${index}.unit_id`, {required: 'El rendimiento es obligatorio' })}
                          defaultValue={material.unit_id}
                          className="bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700"
                        />
                        <input
                          type="number"
                          {...register(`material.${index}.cost`, {required: 'El costo es obligatorio' })}
                          defaultValue={material.cost}
                          // onChange={(e) => handleUpdateItem('material', index, 'costo', Number(e.target.value))}
                          className="bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700"
                          placeholder="Costo"
                        />

                        <button
                          onClick={() => {
                            const newMateriales = [...formData.material];
                            newMateriales.splice(index, 1);
                            setFormData({ ...formData, material: newMateriales });
                          }}
                          className="text-gray-400 hover:text-white"
                        >
                          <Trash size={16} />
                        </button>
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
                            setFormData({ ...formData, equipos: newEquipos });
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
                            setFormData({ ...formData, manoDeObra: newManoDeObra });
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
            )} */}
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
                type="submit"
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
    </form >
  );
};

export default BudgetItemModal;
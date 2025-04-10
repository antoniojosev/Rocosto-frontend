import React, { useState, useEffect } from 'react';
import { Copy, X } from 'lucide-react';
import CopyItemModal from './CopyItemModal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useCreateWorkItem, useCreateWorkItemFromDatabase, useUpdateWorkItem, useUpdateWorkItemFromDatabase } from '../hooks/useDatabases';
import { IBudget } from '../types/Budget';
import { IWorkItem, IPageDatabase } from '../types/Database';

interface BudgetItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  detailBudget?: IBudget;
  database?: IPageDatabase;
  onAdd: (work_item: IWorkItem) => void;
  editItem?: IWorkItem;
}

const BudgetItemModal: React.FC<BudgetItemModalProps> = ({ isOpen, onClose, detailBudget, database, onAdd, editItem }) => {
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
    budget_id: detailBudget?.id,
    database: null,
    total_labor_cost: 0,
    total_equipment_cost: 0,
    total_material_cost: 0,
    total_cost: 0
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IWorkItem>({
    defaultValues: {
      code: editItem?.code || '',
      covening_code: editItem?.covening_code || '',
      description: editItem?.description || '',
      unit: editItem?.unit || '',
      yield_rate: editItem?.yield_rate || 0,
      material_unit_usage: editItem?.material_unit_usage || 'UNITARY',
      budget_id: detailBudget?.id
    }
  });

  // Actualizar los valores del formulario cuando se edita un ítem
  useEffect(() => {
    if (editItem) {
      reset({
        ...editItem,
        budget_id: detailBudget?.id
      });
      setFormData({
        ...editItem,
        budget_id: detailBudget?.id
      });
    }
  }, [editItem, reset, detailBudget?.id]);

  const budgetMutation = useCreateWorkItem();
  const databaseMutation = useCreateWorkItemFromDatabase();
  const updateWorkItemMutation = useUpdateWorkItem();
  const updateWorkItemFromDatabaseMutation = useUpdateWorkItemFromDatabase();

  const onSubmit: SubmitHandler<IWorkItem> = data => {
    console.log('Datos del formulario:', database);
    
    // Si estamos editando un item existente
    if (editItem) {
      if (database) {
        // Para actualizar un workitem de base de datos, enviamos solo los campos necesarios
        // Asegurarnos de usar el endpoint correcto enviando solo los campos necesarios
        const dataToUpdate = {
          id: editItem.id,
          code: data.code,
          covening_code: data.covening_code,
          description: data.description,
          unit: data.unit,
          yield_rate: data.yield_rate,
          material_unit_usage: data.material_unit_usage,
          database_id: database.id
        };
        
        console.log('Enviando datos para actualizar partida de base de datos:', dataToUpdate);
        
        // Usar directamente el endpoint para base de datos
        updateWorkItemFromDatabaseMutation.mutate(dataToUpdate, {
          onSuccess: (updatedData) => {
            console.log('Partida de base de datos actualizada correctamente:', updatedData);
            onAdd(updatedData);
            onClose();
          },
          onError: (error: any) => {
            console.error('Error al actualizar partida de base de datos:', error);
            console.error('Detalles del error:', error.response?.data);
          }
        });
      } else {
        // Para presupuestos, enviamos todos los datos
        const dataToUpdate = {
          ...data,
          id: editItem.id,
          budget_id: detailBudget?.id || null
        };
        
        updateWorkItemMutation.mutate(dataToUpdate, {
          onSuccess: (updatedData) => {
            console.log('WorkItem updated: ', updatedData);
            onAdd(updatedData);
            onClose();
          }
        });
      }
      
      return;
    }
    
    // Si estamos creando un nuevo item
    if (database) {
      // Create workitem for database
      const dataToCreate = { 
        id: uuidv4(),
        code: data.code,
        covening_code: data.covening_code,
        description: data.description,
        unit: data.unit,
        yield_rate: data.yield_rate,
        material_unit_usage: data.material_unit_usage,
        database_id: database.id,
        material: [],
        equipment: [],
        labor: []
      };
      
      console.log('Datos para crear nueva partida en base de datos:', dataToCreate);
      
      databaseMutation.mutate(dataToCreate, {
        onSuccess: (data) => {
          console.log('Database workitem created: ', data);
          onAdd(data);
          onClose();
        }
      });
    } else if (detailBudget) {
      // Create workitem for budget
      const dataToCreate = { 
        ...data, 
        budget_id: detailBudget.id
      };
      
      budgetMutation.mutate(dataToCreate, {
        onSuccess: (data) => {
          console.log('Budget workitem created: ', data);
          onAdd(data);
          onClose();
        }
      });
    }
  };

  if (!isOpen) return null;

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

  // CSS classes for form fields
  const baseInputClass = "w-full bg-[#2a2a2a] text-white rounded-md p-2 border";
  const validInputClass = `${baseInputClass} border-gray-700`;
  const invalidInputClass = `${baseInputClass} border-red-500`;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-[#1a1a1a] rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-white text-2xl font-semibold">{editItem ? 'Editar Partida' : 'Nueva Partida'}</h2>
                <p className="text-gray-400 text-sm mt-1">
                  {editItem 
                    ? 'Modifique los detalles de la partida. Puede editar información general, materiales, equipos y mano de obra.'
                    : 'Complete los detalles de la nueva partida. Incluya información general, materiales, equipos y mano de obra.'}
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

            <div className="overflow-y-auto max-h-[calc(90vh-16rem)] pr-2 custom-scrollbar">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Código</label>
                    <input
                      id='code'
                      {...register('code', { required: 'El código es obligatorio' })}
                      type="text"
                      className={errors.code ? invalidInputClass : validInputClass}
                      placeholder={errors.code ? "Campo obligatorio" : ""}
                    />
                    {errors.code && (
                      <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-white mb-2">Código Covenin</label>
                    <input
                      type="text"
                      id='covening_code'
                      {...register('covening_code', { required: 'El código Covenin es obligatorio' })}
                      className={errors.covening_code ? invalidInputClass : validInputClass}
                      placeholder={errors.covening_code ? "Campo obligatorio" : ""}
                    />
                    {errors.covening_code && (
                      <p className="text-red-500 text-sm mt-1">{errors.covening_code.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-white mb-2">Descripción</label>
                  <textarea
                    id='description'
                    {...register('description', { required: 'La descripción es obligatoria' })}
                    className={errors.description ? invalidInputClass : validInputClass}
                    placeholder={errors.description ? "Campo obligatorio" : ""}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Unidad</label>
                    <input
                      type="text"
                      id='unit'
                      {...register('unit', { required: 'La unidad es obligatoria' })}
                      className={errors.unit ? invalidInputClass : validInputClass}
                      placeholder={errors.unit ? "Campo obligatorio" : ""}
                    />
                    {errors.unit && (
                      <p className="text-red-500 text-sm mt-1">{errors.unit.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-white mb-2">Rendimiento</label>
                    <input
                      type="number"
                      id='yield_rate'
                      {...register('yield_rate', { 
                        required: 'El rendimiento es obligatorio',
                        min: {
                          value: 0,
                          message: 'El rendimiento debe ser mayor o igual a 0'
                        }
                      })}
                      className={errors.yield_rate ? invalidInputClass : validInputClass}
                      placeholder={errors.yield_rate ? "Campo obligatorio" : ""}
                    />
                    {errors.yield_rate && (
                      <p className="text-red-500 text-sm mt-1">{errors.yield_rate.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-white mb-4">Usar unitario de materiales</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-300">
                      <input
                        type="radio"
                        id='UNITARY'
                        {...register('material_unit_usage', { required: 'Seleccione una opción' })}
                        value="UNITARY"
                        className={`text-orange-500 ${errors.material_unit_usage ? 'border-red-500' : ''}`}
                      />
                      Unitario
                    </label>
                    <label className="flex items-center gap-2 text-gray-300">
                      <input
                        type="radio"
                        id='DIVIDED'
                        {...register('material_unit_usage', { required: 'Seleccione una opción' })}
                        value="DIVIDED"
                        className={`text-orange-500 ${errors.material_unit_usage ? 'border-red-500' : ''}`}
                      />
                      Dividido por la cantidad
                    </label>
                    {errors.material_unit_usage && (
                      <p className="text-red-500 text-sm mt-1">{errors.material_unit_usage.message}</p>
                    )}
                  </div>
                </div>
              </div>
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
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-white bg-[#2a2a2a] rounded-md hover:bg-[#3a3a3a] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
                >
                  {editItem ? 'Guardar Cambios' : 'Crear Partida'}
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
    </form>
  );
};

export default BudgetItemModal;
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { IEquipment, ILabor, IMaterial, IUnit } from '../types/Database';
import { useNotification } from '../context/NotificationContext';
import { 
  useUnits, 
  useCreateMaterial, 
  useCreateEquipment, 
  useCreateLabor,
  useUpdateMaterial,
  useUpdateEquipment,
  useUpdateLabor
} from '../hooks/useDatabases';

interface Column {
  key: string;
  label: string;
  type: string;
  colSpan?: number;
  validation?: Array<{ required: boolean }>;
}

interface DatabaseItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceType: string;
  databaseId: string;
  onAdd: (item: any) => void;
  columns: Column[];
  editItem?: any; // Item a editar (opcional)
}

const DatabaseItemModal: React.FC<DatabaseItemModalProps> = ({ 
  isOpen, 
  onClose, 
  resourceType, 
  databaseId,
  onAdd,
  columns,
  editItem
}) => {
  const { data: units = [] } = useUnits();
  const { addNotification } = useNotification();
  
  const isEditMode = !!editItem;
  
  // Crear formulario según el tipo de recurso
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: getDefaultValues(resourceType, editItem)
  });

  // Cargar valores cuando se está editando un item
  useEffect(() => {
    if (editItem) {
      // Para cada propiedad en editItem, establecer el valor en el formulario
      Object.keys(editItem).forEach(key => {
        setValue(key, editItem[key]);
      });
      
      // Si el tipo es MAT y tiene unit, establecer unit_id
      if (resourceType === 'MAT' && editItem.unit) {
        setValue('unit_id', editItem.unit.id);
      }
    }
  }, [editItem, setValue, resourceType]);

  // Devuelve valores por defecto según el tipo de recurso
  function getDefaultValues(type: string, item?: any) {
    // Si se está editando, usar los valores del item
    if (item) {
      const baseValues = { ...item };
      
      // Si el tipo es MAT y tiene unit, asignar unit_id
      if (type === 'MAT' && item.unit) {
        baseValues.unit_id = item.unit.id;
      }
      
      return baseValues;
    }
    
    // Si es un nuevo item, valores por defecto
    const base = {
      id: uuidv4(),
      code: '',
      description: '',
      database_id: databaseId
    };

    switch (type) {
      case 'MAT':
        return {
          ...base,
          unit_id: '',
          cost: 0
        };
      case 'EQU':
        return {
          ...base,
          cost: 0,
          depreciation: 1
        };
      case 'LAB':
        return {
          ...base,
          hourly_cost: 0
        };
      default:
        return base;
    }
  }

  // Hooks para crear los diferentes tipos de recursos
  const createMaterial = useCreateMaterial();
  const createEquipment = useCreateEquipment();
  const createLabor = useCreateLabor();
  
  // Hooks para actualizar los diferentes tipos de recursos
  const updateMaterial = useUpdateMaterial();
  const updateEquipment = useUpdateEquipment();
  const updateLabor = useUpdateLabor();
  
  // Envío del formulario
  const onSubmit: SubmitHandler<any> = (data) => {
    // Asegurarnos de que los valores numéricos sean números
    const processedData = {
      ...data,
      database_id: databaseId
    };

    switch (resourceType) {
      case 'MAT':
        processedData.cost = Number(data.cost);
        if (isEditMode) {
          updateMaterial.mutate(processedData as IMaterial, {
            onSuccess: (updatedItem) => {
              onAdd(updatedItem);
              onClose();
            }
          });
        } else {
          createMaterial.mutate(processedData as IMaterial, {
            onSuccess: (createdItem) => {
              reset(getDefaultValues(resourceType));
              onAdd(createdItem);
              onClose();
            }
          });
        }
        break;
      case 'EQU':
        processedData.cost = Number(data.cost);
        processedData.depreciation = Number(data.depreciation);
        if (isEditMode) {
          updateEquipment.mutate(processedData as IEquipment, {
            onSuccess: (updatedItem) => {
              onAdd(updatedItem);
              onClose();
            }
          });
        } else {
          createEquipment.mutate(processedData as IEquipment, {
            onSuccess: (createdItem) => {
              reset(getDefaultValues(resourceType));
              onAdd(createdItem);
              onClose();
            }
          });
        }
        break;
      case 'LAB':
        processedData.hourly_cost = Number(data.hourly_cost);
        if (isEditMode) {
          updateLabor.mutate(processedData as ILabor, {
            onSuccess: (updatedItem) => {
              onAdd(updatedItem);
              onClose();
            }
          });
        } else {
          createLabor.mutate(processedData as ILabor, {
            onSuccess: (createdItem) => {
              reset(getDefaultValues(resourceType));
              onAdd(createdItem);
              onClose();
            }
          });
        }
        break;
      default:
        addNotification('error', 'Tipo de recurso no soportado');
        break;
    }
  };

  // Mapeo de tipo de recurso a nombre amigable
  const resourceTitles = {
    'MAT': 'Material',
    'EQU': 'Equipo',
    'LAB': 'Mano de Obra',
    'WI': 'Partida'
  };

  if (!isOpen) return null;

  // CSS classes for form fields
  const baseInputClass = "w-full bg-[#2a2a2a] text-white rounded-md p-2 border";
  const validInputClass = `${baseInputClass} border-gray-700`;
  const invalidInputClass = `${baseInputClass} border-red-500`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl font-semibold">
            {isEditMode ? 'Editar' : 'Nuevo'} {resourceTitles[resourceType as keyof typeof resourceTitles]}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {columns.map((column) => {
              if (column.type === 'text' || column.type === 'number') {
                return (
                  <div key={column.key}>
                    <label className="block text-white mb-2">{column.label}</label>
                    <input
                      type={column.type}
                      {...register(column.key, { 
                        required: column.validation?.some(v => v.required) 
                          ? `${column.label} es obligatorio` 
                          : false,
                        min: column.type === 'number' ? { value: 0, message: `${column.label} debe ser mayor o igual a 0` } : undefined
                      })}
                      className={errors[column.key] ? invalidInputClass : validInputClass}
                      placeholder={errors[column.key] ? "Campo obligatorio" : ""}
                    />
                    {errors[column.key] && (
                      <p className="text-red-500 text-sm mt-1">{errors[column.key]?.message?.toString()}</p>
                    )}
                  </div>
                );
              }
              
              if (column.type === 'select' && column.key === 'unit') {
                return (
                  <div key={column.key}>
                    <label className="block text-white mb-2">{column.label}</label>
                    <select
                      {...register('unit_id', { 
                        required: column.validation?.some(v => v.required) 
                          ? `${column.label} es obligatorio` 
                          : false 
                      })}
                      className={errors.unit_id ? invalidInputClass : validInputClass}
                    >
                      <option value="">Seleccione una unidad</option>
                      {units.map((unit: IUnit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.name} ({unit.symbol})
                        </option>
                      ))}
                    </select>
                    {errors.unit_id && (
                      <p className="text-red-500 text-sm mt-1">{errors.unit_id.message?.toString()}</p>
                    )}
                  </div>
                );
              }
              
              return null;
            })}
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-800">
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
              {isEditMode ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DatabaseItemModal;
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { ICreateDatabase, IPageDatabase } from '../types/Database';
import { useCreateDatabase, useUpdateDatabase } from '../hooks/useDatabases';

interface DatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  database?: IPageDatabase; // For edit mode
  isEditMode?: boolean;
}

const DatabaseModal: React.FC<DatabaseModalProps> = ({ isOpen, onClose, database, isEditMode = false }) => {
  const createMutation = useCreateDatabase();
  const updateMutation = useUpdateDatabase();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ICreateDatabase>({
    defaultValues: {
      id: uuidv4(),
      code: '',
      name: '',
      description: ''
    }
  });

  // Set form values when in edit mode and database data is available
  useEffect(() => {
    if (isEditMode && database) {
      reset({
        id: database.id,
        code: database.code,
        name: database.name,
        description: database.description
      });
    }
  }, [isEditMode, database, reset]);

  const onSubmit: SubmitHandler<ICreateDatabase> = (data) => {
    if (isEditMode && database) {
      updateMutation.mutate({ 
        id: database.id, 
        database: data 
      }, {
        onSuccess: () => {
          onClose();
        }
      });
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          onClose();
        }
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-lg w-full max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-2xl font-semibold">
                {isEditMode ? 'Editar Base de Datos' : 'Nueva Base de Datos'}
              </h2>
              <button type="button" onClick={onClose} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Código</label>
                <input
                  type="text"
                  className={`w-full bg-[#2a2a2a] text-white rounded-md p-2 border ${errors.code ? 'border-red-500' : 'border-gray-700'}`}
                  placeholder="Código de la base de datos"
                  {...register('code', { required: 'El código es requerido' })}
                />
                {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>}
              </div>
              <div>
                <label className="block text-white mb-2">Nombre</label>
                <input
                  type="text"
                  className={`w-full bg-[#2a2a2a] text-white rounded-md p-2 border ${errors.name ? 'border-red-500' : 'border-gray-700'}`}
                  placeholder="Nombre de la base de datos"
                  {...register('name', { required: 'El nombre es requerido' })}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-white mb-2">Descripción</label>
                <textarea
                  className={`w-full bg-[#2a2a2a] text-white rounded-md p-2 border ${errors.description ? 'border-red-500' : 'border-gray-700'} h-24 resize-none`}
                  placeholder="Descripción de la base de datos"
                  {...register('description')}
                />
              </div>
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
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {isEditMode ? 'Guardar Cambios' : 'Crear'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DatabaseModal;
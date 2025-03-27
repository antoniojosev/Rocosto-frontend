import { useMutation, useQuery } from '@tanstack/react-query';
import { createWorkItem, deleteEquipment, deleteLabor, deleteMaterial, deleteWorkItem, fetchDatabase, getUnits, updateWorkItem} from '../api/endpoints/databases';
import { IDatabase, IUnit, IWorkItem, IWorkItemCreate } from '../types/Database';

const useDatabase = () => {
  return useQuery<IDatabase[], Error, IDatabase[], readonly ['databases']>({
    queryKey: ['databases'] as const,
    queryFn: fetchDatabase,
  });
};


export const useCreateWorkItem = () => {
  return useMutation<IWorkItem, Error, IWorkItemCreate>({
    mutationFn: createWorkItem,
    onError: (error) => {
      console.error('Error al crear partida:', error);
    }
  });
};

export const useUpdateWorkItem = () => {
  return useMutation<IWorkItem, Error, IWorkItemCreate>({
    mutationFn: updateWorkItem,
    onError: (error) => {
      console.error('Error al actualizar partida:', error);
    }
  });
};

export const useDeleteWorkItem = () => {
  return useMutation<void, Error, string>({
    mutationFn: deleteWorkItem,
    onError: (error) => {
      console.error('Error al eliminar partida:', error);
    }
  });
};

export const useDeleteItem = () => {
  return useMutation<void, Error, { id: string, type: 'material' | 'labor' | 'equipment' }>({
    mutationFn: ({ id, type }) => {
      switch (type) {
        case 'material':
          return deleteMaterial(id);
        case 'labor':
          return deleteLabor(id);
        case 'equipment':
          return deleteEquipment(id);
        default:
          throw new Error('Tipo de item no soportado');
      }
    },
    onError: (error) => {
      console.error('Error al eliminar item:', error);
    }
  });
};

export const useUnits = () => { 
  return useQuery<IUnit[], Error, IUnit[], readonly ['units']>({
    queryKey: ['units'] as const,
    queryFn: getUnits,
  });
};

export default useDatabase;
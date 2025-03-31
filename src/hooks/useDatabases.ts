import { useMutation, useQuery } from '@tanstack/react-query';
import { createWorkItem, deleteEquipment, deleteLabor, deleteMaterial, deleteWorkItem, fetchDatabase, fetchDatabaseWithResource, getUnits, updateWorkItem} from '../api/endpoints/databases';
import { IPageDatabase, IUnit, IWorkItem, IWorkItemCreate } from '../types/Database';

const useDatabase = () => {
  return useQuery<IPageDatabase[], Error, IPageDatabase[], readonly ['databases']>({
    queryKey: ['databases'] as const,
    queryFn: fetchDatabase,
  });
};

export const useDatabaseWithResource = (idDatabase: string, queryParams?: string) => {
  return useQuery<IPageDatabase, Error, IPageDatabase, readonly ['database', string, string | undefined]>({
    queryKey: ['database', idDatabase, queryParams] as const,
    queryFn: () => fetchDatabaseWithResource(idDatabase, queryParams),
    enabled: !!idDatabase, // Only fetch when there is an actual ID
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
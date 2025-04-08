import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createWorkItem, deleteEquipment, deleteLabor, deleteMaterial, deleteWorkItem, fetchDatabase, fetchDatabaseWithResource, getUnits, updateWorkItem} from '../api/endpoints/databases';
import { IPageDatabase, IUnit, IWorkItem, IWorkItemCreate } from '../types/Database';
import { useNotification } from '../context/NotificationContext';
import { useErrorHandler } from './useErrorHandler';

const useDatabase = () => {
  const { handleError } = useErrorHandler();
  
  return useQuery<IPageDatabase[], Error, IPageDatabase[], readonly ['databases']>({
    queryKey: ['databases'] as const,
    queryFn: fetchDatabase,
    onError: (error) => {
      handleError(error, 'Error al cargar las bases de datos');
    }
  });
};

export const useDatabaseWithResource = (idDatabase: string, queryParams?: string) => {
  const { handleError } = useErrorHandler();
  
  return useQuery<IPageDatabase, Error, IPageDatabase, readonly ['database', string, string | undefined]>({
    queryKey: ['database', idDatabase, queryParams] as const,
    queryFn: () => fetchDatabaseWithResource(idDatabase, queryParams),
    enabled: !!idDatabase, // Only fetch when there is an actual ID
    onError: (error) => {
      handleError(error, `Error al cargar la base de datos con recursos`);
    }
  });
};

export const useCreateWorkItem = () => {
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  
  return useMutation<IWorkItem, Error, IWorkItemCreate>({
    mutationFn: createWorkItem,
    onSuccess: () => {
      addNotification('success', 'Partida creada correctamente');
      queryClient.invalidateQueries({ queryKey: ['database'] });
    },
    onError: (error) => {
      handleError(error, 'Error al crear partida');
    }
  });
};

export const useUpdateWorkItem = () => {
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  
  return useMutation<IWorkItem, Error, IWorkItemCreate>({
    mutationFn: updateWorkItem,
    onSuccess: () => {
      addNotification('success', 'Partida actualizada correctamente');
      queryClient.invalidateQueries({ queryKey: ['database'] });
    },
    onError: (error) => {
      handleError(error, 'Error al actualizar partida');
    }
  });
};

export const useDeleteWorkItem = () => {
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, string>({
    mutationFn: deleteWorkItem,
    onSuccess: () => {
      addNotification('success', 'Partida eliminada correctamente');
      queryClient.invalidateQueries({ queryKey: ['database'] });
    },
    onError: (error) => {
      handleError(error, 'Error al eliminar partida');
    }
  });
};

export const useDeleteItem = () => {
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  
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
    onSuccess: () => {
      addNotification('success', 'Item eliminado correctamente');
      queryClient.invalidateQueries({ queryKey: ['database'] });
    },
    onError: (error) => {
      handleError(error, 'Error al eliminar item');
    }
  });
};

export const useUnits = () => {
  const { handleError } = useErrorHandler();
  
  return useQuery<IUnit[], Error, IUnit[], readonly ['units']>({
    queryKey: ['units'] as const,
    queryFn: getUnits,
    onError: (error) => {
      handleError(error, 'Error al cargar unidades');
    }
  });
};

export default useDatabase;
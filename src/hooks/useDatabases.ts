import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createDatabase, createWorkItem, createWorkItemFromDatabase, deleteDatabase, deleteEquipment, deleteLabor, deleteMaterial, deleteWorkItem, fetchDatabase, fetchDatabaseWithResource, getUnits, updateDatabase, updateWorkItem, createMaterial, createEquipment, createLabor, updateMaterial, updateEquipment, updateLabor } from '../api/endpoints/databases';
import { ICreateDatabase, IPageDatabase, IUnit, IWorkItem, IWorkItemCreate, IWorkItemDatabaseCreate, IMaterial, IEquipment, ILabor } from '../types/Database';
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

export const useCreateDatabase = () => {
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  
  return useMutation<IPageDatabase, Error, ICreateDatabase>({
    mutationFn: createDatabase,
    onSuccess: () => {
      addNotification('success', 'Base de datos creada correctamente');
      queryClient.invalidateQueries({ queryKey: ['databases'] });
    },
    onError: (error) => {
      handleError(error, 'Error al crear base de datos');
    }
  });
};

export const useUpdateDatabase = () => {
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  
  return useMutation<IPageDatabase, Error, { id: string, database: ICreateDatabase }>({
    mutationFn: ({ id, database }) => updateDatabase(id, database),
    onSuccess: () => {
      addNotification('success', 'Base de datos actualizada correctamente');
      queryClient.invalidateQueries({ queryKey: ['databases'] });
    },
    onError: (error) => {
      handleError(error, 'Error al actualizar base de datos');
    }
  });
};

export const useDeleteDatabase = () => {
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, string>({
    mutationFn: deleteDatabase,
    onSuccess: () => {
      addNotification('success', 'Base de datos eliminada correctamente');
      queryClient.invalidateQueries({ queryKey: ['databases'] });
    },
    onError: (error) => {
      handleError(error, 'Error al eliminar base de datos');
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

export const useCreateWorkItemFromDatabase = () => {
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  
  return useMutation<IWorkItem, Error, IWorkItemDatabaseCreate>({
    mutationFn: createWorkItemFromDatabase,
    onSuccess: () => {
      addNotification('success', 'Partida creada correctamente desde base de datos');
      queryClient.invalidateQueries({ queryKey: ['database'] });
    },
    onError: (error) => {
      handleError(error, 'Error al crear partida desde base de datos');
    }
  });
};

export const useCreateMaterial = () => {
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  
  return useMutation<IMaterial, Error, IMaterial>({
    mutationFn: createMaterial,
    onSuccess: () => {
      addNotification('success', 'Material creado correctamente');
      queryClient.invalidateQueries({ queryKey: ['database'] });
    },
    onError: (error) => {
      handleError(error, 'Error al crear material');
    }
  });
};

export const useCreateEquipment = () => {
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  
  return useMutation<IEquipment, Error, IEquipment>({
    mutationFn: createEquipment,
    onSuccess: () => {
      addNotification('success', 'Equipo creado correctamente');
      queryClient.invalidateQueries({ queryKey: ['database'] });
    },
    onError: (error) => {
      handleError(error, 'Error al crear equipo');
    }
  });
};

export const useCreateLabor = () => {
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  
  return useMutation<ILabor, Error, ILabor>({
    mutationFn: createLabor,
    onSuccess: () => {
      addNotification('success', 'Mano de obra creada correctamente');
      queryClient.invalidateQueries({ queryKey: ['database'] });
    },
    onError: (error) => {
      handleError(error, 'Error al crear mano de obra');
    }
  });
};

export const useUpdateMaterial = () => {
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  
  return useMutation<IMaterial, Error, IMaterial>({
    mutationFn: updateMaterial,
    onSuccess: () => {
      addNotification('success', 'Material actualizado correctamente');
      queryClient.invalidateQueries({ queryKey: ['database'] });
    },
    onError: (error) => {
      handleError(error, 'Error al actualizar material');
    }
  });
};

export const useUpdateEquipment = () => {
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  
  return useMutation<IEquipment, Error, IEquipment>({
    mutationFn: updateEquipment,
    onSuccess: () => {
      addNotification('success', 'Equipo actualizado correctamente');
      queryClient.invalidateQueries({ queryKey: ['database'] });
    },
    onError: (error) => {
      handleError(error, 'Error al actualizar equipo');
    }
  });
};

export const useUpdateLabor = () => {
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  
  return useMutation<ILabor, Error, ILabor>({
    mutationFn: updateLabor,
    onSuccess: () => {
      addNotification('success', 'Mano de obra actualizada correctamente');
      queryClient.invalidateQueries({ queryKey: ['database'] });
    },
    onError: (error) => {
      handleError(error, 'Error al actualizar mano de obra');
    }
  });
};

export const useDeleteItem = () => {
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, { id: string, type: 'material' | 'labor' | 'equipment' | 'workitem' }>({
    mutationFn: ({ id, type }) => {
      switch (type) {
        case 'material':
          return deleteMaterial(id);
        case 'labor':
          return deleteLabor(id);
        case 'equipment':
          return deleteEquipment(id);
        case 'workitem':
          return deleteWorkItem(id);
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
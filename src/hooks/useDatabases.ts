import { useMutation, useQuery } from '@tanstack/react-query';
import { createWorkItem, fetchDatabase, getUnits} from '../api/endpoints/databases';
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

export const useUnits = () => {
  return useQuery<IUnit[], Error, IUnit[], readonly ['units']>({
    queryKey: ['units'] as const,
    queryFn: getUnits,
  });
};

export default useDatabase;
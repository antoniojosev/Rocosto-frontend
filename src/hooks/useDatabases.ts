import { useMutation, useQuery } from '@tanstack/react-query';
import { createWorkItem, fetchDatabase} from '../api/endpoints/databases';
import { IDatabase, IWorkItem } from '../types/Database';

const useDatabase = () => {
  return useQuery<IDatabase[], Error, IDatabase[], readonly ['databases']>({
    queryKey: ['databases'] as const,
    queryFn: fetchDatabase,
  });
};


export const useCreateWorkItem = () => {
  return useMutation<IWorkItem, Error, IWorkItem>({
    mutationFn: createWorkItem,
    onError: (error) => {
      console.error('Error al crear partida:', error);
    }
  });
};

export default useDatabase;
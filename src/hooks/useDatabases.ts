import { useMutation, useQuery } from '@tanstack/react-query';
import { createWorkItem, fetchDatabase, IDatabase, IFormWorkItem } from '../api/endpoints/databases';

const useDatabase = () => {
  return useQuery<IDatabase[], Error, IDatabase[], readonly ['databases']>({
    queryKey: ['databases'] as const,
    queryFn: fetchDatabase,
  });
};


export const useCreateWorkItem = () => {
  return useMutation<IFormWorkItem, Error, IFormWorkItem>({
    mutationFn: createWorkItem,
    onError: (error) => {
      console.error('Error al crear partida:', error);
    }
  });
};

export default useDatabase;
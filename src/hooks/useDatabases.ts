import { useQuery } from '@tanstack/react-query';
import { fetchDatabase, IDatabase } from '../api/endpoints/databases';

const useDatabase = () => {
    return useQuery<IDatabase[], Error, IDatabase[], readonly ['databases']>({
      queryKey: ['databases'] as const,
      queryFn: fetchDatabase,
    });
  };
  

export default useDatabase;
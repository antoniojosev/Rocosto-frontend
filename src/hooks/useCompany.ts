import { useQuery } from '@tanstack/react-query';
import { fetchCompany, ICompany } from '../api/endpoints/companies';

const useCompany = () => {
    return useQuery<ICompany[], Error, ICompany[], readonly ['companies']>({
      queryKey: ['companies'] as const,
      queryFn: fetchCompany,
    });
  };
  

export default useCompany;
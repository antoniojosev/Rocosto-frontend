import { useQuery } from '@tanstack/react-query';
import { fetchCompany } from '../api/endpoints/companies';
import { ICompany } from '../types/Company';

const useCompany = () => {
    return useQuery<ICompany[], Error, ICompany[], readonly ['companies']>({
      queryKey: ['companies'] as const,
      queryFn: fetchCompany,
    });
  };
  

export default useCompany;
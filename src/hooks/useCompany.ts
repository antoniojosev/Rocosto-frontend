import { useQuery } from '@tanstack/react-query';
import { fetchCompany } from '../api/endpoints/companies';
import { ICompany } from '../types/Company';
import { useErrorHandler } from './useErrorHandler';

const useCompany = () => {
  const { handleError } = useErrorHandler();
  
  return useQuery<ICompany[], Error, ICompany[], readonly ['companies']>({
    queryKey: ['companies'] as const,
    queryFn: fetchCompany,
    onError: (error) => {
      handleError(error, 'Error al cargar las empresas');
    }
  });
};

export default useCompany;
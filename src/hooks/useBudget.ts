import { useQuery } from '@tanstack/react-query';
import { fetchBudget, IBudget } from '../api/endpoints/budgets';

const useBudget = () => {
    return useQuery<IBudget[], Error, IBudget[], readonly ['Budgets']>({
      queryKey: ['Budgets'] as const,
      queryFn: fetchBudget,
    });
  };
  

export default useBudget;
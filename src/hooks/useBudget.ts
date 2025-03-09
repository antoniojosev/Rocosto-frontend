import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchBudget, IBudget, BudgetFormData, createBudget, getBudgetById } from '../api/endpoints/budgets';

const useBudget = () => {
  return useQuery<IBudget[], Error, IBudget[], readonly ['Budgets']>({
    queryKey: ['Budgets'] as const,
    queryFn: fetchBudget,
  });
};

export const useCreateBudget = () => {
  return useMutation<IBudget, Error, BudgetFormData>({
    mutationFn: createBudget,
    onError: (error) => {
      console.error('Error al crear presupuesto:', error);
    }
  });
};

export const useBudgetById = (id: string) => {
  return useQuery<IBudget, Error>({
    queryKey: ['budget', id],
    queryFn: () => getBudgetById(id)
  });
};


export default useBudget;
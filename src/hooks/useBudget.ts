import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchBudget, createBudget, getBudgetById } from '../api/endpoints/budgets';
import { IBudget, IBudgetCreate } from '../types/Budget';

const useBudget = () => {
  return useQuery<IBudget[], Error, IBudget[], readonly ['Budgets']>({
    queryKey: ['Budgets'] as const,
    queryFn: fetchBudget,
  });
};

export const useCreateBudget = () => {
  return useMutation<IBudget, Error, IBudgetCreate>({
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
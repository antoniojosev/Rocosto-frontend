import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBudget, createBudget, getBudgetById, deleteBudget, updateBudget } from '../api/endpoints/budgets';
import { IBudget, IBudgetCreate, IBudgetUpdate } from '../types/Budget';
import { useNotification } from '../context/NotificationContext';
import { useErrorHandler } from './useErrorHandler';

const useBudget = () => {
  const { handleError } = useErrorHandler();
  
  return useQuery<IBudget[], Error, IBudget[], readonly ['Budgets']>({
    queryKey: ['Budgets'] as const,
    queryFn: fetchBudget,
    onError: (error) => {
      handleError(error, 'Error al cargar los presupuestos');
    }
  });
};

export const useCreateBudget = () => {
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  
  return useMutation<IBudget, Error, IBudgetCreate>({
    mutationFn: createBudget,
    onSuccess: () => {
      addNotification('success', 'Presupuesto creado exitosamente');
      queryClient.invalidateQueries({ queryKey: ['Budgets'] });
    },
    onError: (error) => {
      handleError(error, 'Error al crear presupuesto');
    }
  });
};

export const useBudgetById = (id: string) => {
  const { handleError } = useErrorHandler();
  
  return useQuery<IBudget, Error>({
    queryKey: ['budget', id],
    queryFn: () => getBudgetById(id),
    onError: (error) => {
      handleError(error, `Error al cargar el presupuesto con ID ${id}`);
    }
  });
};

export const useUpdateBudget = () => {
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  
  return useMutation<
    IBudget, 
    Error, 
    { id: string; budget: IBudgetUpdate }
  >({
    mutationFn: updateBudget,
    onSuccess: () => {
      addNotification('success', 'Presupuesto actualizado exitosamente');
      queryClient.invalidateQueries({ queryKey: ['Budgets'] });
    },
    onError: (error) => {
      handleError(error, 'Error al actualizar el presupuesto');
    }
  });
};

export const useDeleteBudget = () => {
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, string>({
    mutationFn: deleteBudget,
    onSuccess: () => {
      addNotification('success', 'Presupuesto eliminado exitosamente');
      queryClient.invalidateQueries({ queryKey: ['Budgets'] });
    },
    onError: (error) => {
      handleError(error, 'Error al eliminar el presupuesto');
    }
  });
};

export default useBudget;
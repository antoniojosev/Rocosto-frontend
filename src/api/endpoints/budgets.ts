import { IBudget, IBudgetCreate, IBudgetUpdate } from '../../types/Budget';
import client from '../client';


export const fetchBudget = async (): Promise<IBudget[]> => {
  const response = await client.get<IBudget[]>('/budgets');
  console.log(response.data);
  return response.data;
};

export const createBudget = async (newBudget: IBudgetCreate): Promise<IBudget> => {
  const response = await client.post<IBudget>('/budgets/', newBudget);
  return response.data;
};

export const getBudgetById = async (id: string): Promise<IBudget> => {
  const response = await client.get<IBudget>(`/budgets/${id}`);
  return response.data;
};

export const deleteBudget = async (id: string): Promise<void> => {
  await client.delete(`/budgets/${id}/`);
};

export const updateBudget = async ({ id, budget }: { id: string; budget: IBudgetUpdate }): Promise<IBudget> => {
  const response = await client.put<IBudget>(`/budgets/${id}/`, budget);
  return response.data;
};
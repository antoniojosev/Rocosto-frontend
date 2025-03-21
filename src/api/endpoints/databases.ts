import { IDatabase, IUnit, IWorkItem, IWorkItemCreate } from '../../types/Database';
import client from '../client';


export const fetchDatabase = async (): Promise<IDatabase[]> => {
  const response = await client.get<IDatabase[]>('/databases');
  return response.data;
};


export const createWorkItem = async (newBudget: IWorkItemCreate): Promise<IWorkItem> => {
  const response = await client.post<IWorkItem>('/databases/work-items/', newBudget);
  return response.data;
};

export const getUnits = async (): Promise<IUnit[]> => {
  const response = await client.get<IUnit[]>('/databases/units/');
  return response.data;
};
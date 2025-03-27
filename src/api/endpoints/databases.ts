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

export const updateWorkItem = async (workItem: IWorkItemCreate): Promise<IWorkItem> => {
  const response = await client.put<IWorkItem>(`/databases/work-items/${workItem.id}/`, workItem);
  return response.data;
};

export const deleteWorkItem = async (id: string): Promise<void> => {
  await client.delete(`/databases/work-items/${id}/`);
};

export const deleteMaterial = async (id: string): Promise<void> => {
  await client.delete(`/databases/materials/${id}/`);
};

export const deleteLabor = async (id: string): Promise<void> => {
  await client.delete(`/databases/labors/${id}/`);
};

export const deleteEquipment = async (id: string): Promise<void> => {
  await client.delete(`/databases/equipments/${id}/`);
};

export const getUnits = async (): Promise<IUnit[]> => {
  const response = await client.get<IUnit[]>('/databases/units/');
  return response.data;
};
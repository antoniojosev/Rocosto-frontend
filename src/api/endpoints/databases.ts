import { ICreateDatabase, IDatabase, IEquipment, ILabor, IMaterial, IPageDatabase, IUnit, IWorkItem, IWorkItemCreate, IWorkItemDatabaseCreate } from '../../types/Database';
import client from '../client';

export const fetchDatabase = async (): Promise<IPageDatabase[]> => {
  const response = await client.get<IPageDatabase[]>('/databases');
  return response.data;
};

export const fetchDatabaseWithResource = async (idDatabase: string, resource?: string): Promise<IPageDatabase> => {
  const base = `/databases/resources/${idDatabase}/`;
  const url = resource ? `${base}?filter=${resource}` : base;
  const response = await client.get<IPageDatabase>(url);
  return response.data;
};

export const createDatabase = async (database: ICreateDatabase): Promise<IPageDatabase> => {
  const response = await client.post<IPageDatabase>('/databases/', database);
  return response.data;
};

export const updateDatabase = async (id: string, database: ICreateDatabase): Promise<IPageDatabase> => {
  const response = await client.put<IPageDatabase>(`/databases/${id}/`, database);
  return response.data;
};

export const deleteDatabase = async (id: string): Promise<void> => {
  await client.delete(`/databases/${id}/`);
};

export const createWorkItem = async (newBudget: IWorkItemCreate): Promise<IWorkItem> => {
  const response = await client.post<IWorkItem>('/databases/work-items/', newBudget);
  return response.data;
};

export const createWorkItemFromDatabase = async (newItem: IWorkItemDatabaseCreate): Promise<IWorkItem> => {
  const response = await client.post<IWorkItem>('/databases/database-work-items/', newItem);
  return response.data;
};

export const updateWorkItem = async (workItem: IWorkItemCreate): Promise<IWorkItem> => {
  const response = await client.put<IWorkItem>(`/databases/work-items/${workItem.id}/`, workItem);
  return response.data;
};

export const deleteWorkItem = async (id: string): Promise<void> => {
  await client.delete(`/databases/work-items/${id}/`);
};

export const createMaterial = async (material: IMaterial): Promise<IMaterial> => {
  const response = await client.post<IMaterial>('/databases/materials/', material);
  return response.data;
};

export const createEquipment = async (equipment: IEquipment): Promise<IEquipment> => {
  const response = await client.post<IEquipment>('/databases/equipment/', equipment);
  return response.data;
};

export const createLabor = async (labor: ILabor): Promise<ILabor> => {
  const response = await client.post<ILabor>('/databases/labor/', labor);
  return response.data;
};

export const updateMaterial = async (material: IMaterial): Promise<IMaterial> => {
  const response = await client.put<IMaterial>(`/databases/materials/${material.id}/`, material);
  return response.data;
};

export const updateEquipment = async (equipment: IEquipment): Promise<IEquipment> => {
  const response = await client.put<IEquipment>(`/databases/equipment/${equipment.id}/`, equipment);
  return response.data;
};

export const updateLabor = async (labor: ILabor): Promise<ILabor> => {
  const response = await client.put<ILabor>(`/databases/labor/${labor.id}/`, labor);
  return response.data;
};

export const deleteMaterial = async (id: string): Promise<void> => {
  await client.delete(`/databases/materials/${id}/`);
};

export const deleteLabor = async (id: string): Promise<void> => {
  await client.delete(`/databases/labor/${id}/`);
};

export const deleteEquipment = async (id: string): Promise<void> => {
  await client.delete(`/databases/equipment/${id}/`);
};

export const getUnits = async (): Promise<IUnit[]> => {
  const response = await client.get<IUnit[]>('/databases/units/');
  return response.data;
};
import client from '../client';

export interface IDatabase {
  id: number;
  code: string;
  name: string;
  description: string;
}

export const fetchDatabase = async (): Promise<IDatabase[]> => {
  const response = await client.get<IDatabase[]>('/databases');
  return response.data;
};
export interface IFormWorkItem {
  code: string
  description: string
  unit: string
  yield_rate: number
  covening_code: string
  material_unit_usage: string
  material: IMaterial[]
  equipment: IEquipment[]
  labor: ILabor[]
  budget_id: string
}

export interface IMaterial {
  code: string
  description: string
  unit_id: string
  cost: number
  id: string
}

export interface IEquipment {
  code: string
  description: string
  cost: number
  depreciation: number
  id: string
}

export interface ILabor {
  code: string
  description: string
  hourly_cost: number
  id: string
}

export const createWorkItem = async (newBudget: IFormWorkItem): Promise<IFormWorkItem> => {
  const response = await client.post<IFormWorkItem>('/databases/work-items/', newBudget);
  return response.data;
};
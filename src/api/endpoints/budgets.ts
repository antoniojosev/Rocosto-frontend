import client from '../client';

export type StateChoices = 'IN_PROGRESS' | 'PENDING' | 'FINISHED';

export interface StateInfo {
  text: string;
  style: string;
}

export interface Company {
  id: string
  name: string
}

// TODO: Add more fields to the user interface
export interface IBudget {
    id: string
    code: string
    contract: string
    budget_date: string
    name: string
    owner: string
    calculated_by: string
    reviewed_by: any
    hours_per_day: string
    currency: string
    use_associated_cost_factor: boolean
    direct_labor_factor: string
    iva_type: string
    iva_percentage: string
    administration_percentage: string
    utility_percentage: string
    financing_percentage: string
    use_medical_insurance: boolean
    bonds: Bond[]
    retentions: Retention[]
    work_item: WorkItem[]
    created_at: string
    state: StateChoices
    company: Company
  }
  
export interface Bond {
  id: string
  title: string
  amount: string
  salary_limit_per_day: string
}

export interface Retention {
  id: string
  retention_type: string
  amount: string
  percentage: string
}

export interface WorkItem {
  id: string
  code: string
  description: string
  unit: string
  materials: Material[]
  equipment: Equipment[]
  labor: Labor[]
  yield_rate: string
  database: Database4
  total_labor_cost: string
  total_equipment_cost: string
  total_material_cost: string
  total_cost: string
}

export interface Material {
  id: string
  code: string
  description: string
  unit: Unit
  cost: string
  database: Database
}

export interface Unit {
  id: string
  name: string
  symbol: string
}

export interface Database {
  id: string
  code: string
  name: string
  description: string
}

export interface Equipment {
  id: string
  code: string
  description: string
  cost: string
  depreciation: string
  database: Database2
}

export interface Database2 {
  id: string
  code: string
  name: string
  description: string
}

export interface Labor {
  id: string
  code: string
  description: string
  hourly_cost: string
  database: Database3
}

export interface Database3 {
  id: string
  code: string
  name: string
  description: string
}

export interface Database4 {
  id: string
  code: string
  name: string
  description: string
}

export interface BudgetFormData {
  code: string;
  name: string;
  owner_id: string | null;
  calculated_by_id: string | null;
  reviewed_by_id: string | null;
  direct_labor_factor: number;
  administration_percentage: number;
  utility_percentage: number;
  financing_percentage: number;
  iva_type: string;
  iva_percentage: number;
  use_medical_insurance: boolean;
  company_id: string;
}
  
export const fetchBudget = async (): Promise<IBudget[]> => {
  const response = await client.get<IBudget[]>('/budgets');
  return response.data;
};

export const createBudget = async (newBudget: BudgetFormData): Promise<IBudget> => {
  const response = await client.post<IBudget>('/budgets/', newBudget);
  return response.data;
};

export const getBudgetById = async (id: string): Promise<IBudget> => {
  const response = await client.get<IBudget>(`/budgets/${id}`);
  return response.data;
};
import { Company } from "./Company";
import { IWorkItem } from "./Database";


export type StateChoices = 'IN_PROGRESS' | 'PENDING' | 'FINISHED';

export interface StateInfo {
    text: string;
    style: string;
}

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
    work_item: IWorkItem[]
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

export interface IBudgetCreate {
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
    use_associated_cost_factor: boolean
}
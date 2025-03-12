

export interface IWorkItem {
    id: string
    code: string
    description: string
    covening_code: string
    unit: string
    material_unit_usage: string
    material: IMaterial[]
    equipment: IEquipment[]
    labor: ILabor[]
    yield_rate: number
    database: IDatabase | null
    total_labor_cost: number
    total_equipment_cost: number
    total_material_cost: number
    total_cost: number
    budget_id: string
}

export interface IMaterial {
    id: string
    code: string
    description: string
    unit: IUnit
    cost: string
    database: IDatabase
}

export interface IUnit {
    id: string
    name: string
    symbol: string
}

export interface IDatabase {
    id: string
    code: string
    name: string
    description: string
}

export interface IEquipment {
    id: string
    code: string
    description: string
    cost: string
    depreciation: string
    database: IDatabase
}

export interface ILabor {
    id: string
    code: string
    description: string
    hourly_cost: string
    database: IDatabase
}
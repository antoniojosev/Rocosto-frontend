

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

export interface IWorkItemCreate {
    id: string,
    material: IMaterial[]
    equipment: IEquipment[]
    labor: ILabor[]
    budget_id: string
}

export interface IMaterial {
    id: string
    code: string
    description: string
    unit: IUnit
    cost: number
    database: IDatabase
    quantity: number
    total: number
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
    resource: []
}

export interface IEquipment {
    id: string
    code: string
    description: string
    cost: number
    depreciation: number
    database: IDatabase
    quantity: number
    total: number
}

export interface ILabor {
    id: string
    code: string
    description: string
    hourly_cost: number
    database: IDatabase
    quantity: number
    total: number
}

export interface IPageDatabase {
    id: string
    code: string
    name: string
    description: string
    total_materials: number
    total_equipment: number
    total_labor: number
    resources: Resources
}

export interface ICreateDatabase {
    id: string
    code: string
    name: string
    description: string
}
export interface IPageDatabase {
    id: string
    code: string
    name: string
    description: string
    total_materials: number
    total_equipment: number
    total_labor: number
    resources: Resources
}
  
export interface Resources {
    count: number
    next: boolean
    previous: boolean
    results?: (IMaterial | IEquipment | ILabor)[] 
}
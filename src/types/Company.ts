import { IOwner } from "./User";



export interface Company {
    id: string
    name: string
}
  

export interface ICompany {
    id: string
    tax_id: string
    name: string
    address: string
    phone: string
    user: string,
    owners: IOwner[],
    created_at: string
    updated_at: string
}
  
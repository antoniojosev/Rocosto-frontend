import client from '../client';

export interface IOwner {
    id: string
    username: string
    email: string
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
  

export const fetchCompany = async (): Promise<ICompany[]> => {
    const response = await client.get<ICompany[]>('/companies');
    return response.data;
};
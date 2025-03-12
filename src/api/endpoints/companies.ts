import { ICompany } from '../../types/Company';
import client from '../client';



export const fetchCompany = async (): Promise<ICompany[]> => {
    const response = await client.get<ICompany[]>('/companies');
    return response.data;
};
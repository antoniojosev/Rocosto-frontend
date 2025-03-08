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
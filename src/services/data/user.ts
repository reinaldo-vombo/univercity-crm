import { TAuthLogos } from '@/types/global';
import { serverFetch } from '../server-fetch';
import { handleApiError } from '../error-handler';

export const getSigleUser = async (id: string): Promise<TAuthLogos[]> => {
  try {
    const user = await serverFetch<TAuthLogos[]>(`/users/${id}`, {
      next: { tags: ['user'] },
    });
    return user;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllUsers = async (): Promise<TAuthLogos[]> => {
  try {
    const users = await serverFetch<TAuthLogos[]>('/users', {
      next: { tags: ['users'] },
    });
    return users;
  } catch (error) {
    handleApiError(error);
  }
};
export const getUserLogs = async (id: string): Promise<TAuthLogos[]> => {
  try {
    const logs = await serverFetch<TAuthLogos[]>(`/users/logs/${id}`, {
      next: { tags: ['logs'] },
    });
    return logs;
  } catch (error) {
    handleApiError(error);
  }
};

import { TUser } from '@/types/global';
import { serverFetch } from '../server-fetch';
import { handleApiError } from '../error-handler';
import { REVALIDATION } from '@/constants/mock-data';

export const getSigleUser = async (id: string): Promise<TUser[]> => {
  try {
    const user = await serverFetch<TUser[]>(`/users/${id}`, {
      next: { tags: ['user'] },
    });
    return user;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllUsers = async (): Promise<TUser[]> => {
  try {
    const users = await serverFetch<TUser[]>('/users', {
      next: { tags: ['users'], revalidate: REVALIDATION.THIRTY_MINUTE },
    });
    return users;
  } catch (error) {
    handleApiError(error);
  }
};

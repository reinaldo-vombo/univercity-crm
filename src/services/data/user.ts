import { TUser } from '@/types/global';
import { serverFetch } from '../server-fetch';
import { handleApiError } from '../error-handler';
import { REVALIDATION } from '@/constants/mock-data';
import { FLASH_MESSAGE } from '@/constants/flash-message';

export const getAllUsers = async (): Promise<TUser[]> => {
  try {
    const users = await serverFetch<TUser[]>('/users', {
      next: { tags: ['user'], revalidate: REVALIDATION.THIRTY_MINUTE },
    });
    return users;
  } catch (error) {
    handleApiError(error);
  }
};

export const getSigleUser = async (userId: string): Promise<TUser[]> => {
  if (!userId) {
    console.error(FLASH_MESSAGE.ID_REQUIRID);
    return [];
  }
  try {
    const user = await serverFetch<TUser[]>(`/users/${userId}`, {
      next: { tags: ['user'] },
    });
    return user;
  } catch (error) {
    handleApiError(error);
  }
};

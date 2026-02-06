import { TUser } from '@/types/global';
import { serverFetch } from '../server-fetch';
import { handleApiError } from '../error-handler';
import { REVALIDATION } from '@/constants/relalidation';

export const getAllUsers = async (): Promise<TUser[]> => {
  try {
    const users = await serverFetch<TUser[]>('/users', {
      next: {
        tags: ['user'],
        revalidate:
          process.env.NODE_ENV === 'production' ? REVALIDATION.TEN_MINUTES : 0,
      },
    });
    return users;
  } catch (error) {
    handleApiError(error);
  }
};

export const getSigleUser = async (userId: string): Promise<TUser> => {
  try {
    const user = await serverFetch<TUser>(`/users/${userId}`, {
      next: { tags: ['user'] },
    });
    return user;
  } catch (error) {
    handleApiError(error);
  }
};

import { TUser } from '@/types/global';
import { serverFetch } from '../server-fetch';
import { handleApiError } from '../error-handler';
import { cacheLife, cacheTag } from 'next/cache';
import { getUserToken } from '@/lib/helper/auth/user';

export const getAllUsers = async (): Promise<TUser[]> => {
  const token = await getUserToken();
  try {
    const getUsers = async () => {
      'use cache';
      cacheTag('users');
      cacheLife('hours');
      return serverFetch<TUser[]>('/users', {}, token);
    };
    return getUsers();
  } catch (error) {
    handleApiError(error);
  }
};

export const getSigleUser = async (userId: string): Promise<TUser> => {
  const token = await getUserToken();
  try {
    const getUser = async () => {
      'use cache';
      cacheTag(`user-${userId}`);
      cacheLife('hours');
      return serverFetch<TUser>(`/users/${userId}`, {}, token);
    };

    return getUser();
  } catch (error) {
    handleApiError(error);
  }
};

import { TPrice } from '@/types/global';
import { handleApiError } from '../error-handler';
import { serverFetch } from '../server-fetch';
import { cacheLife, cacheTag } from 'next/cache';
import { getUserToken } from '@/lib/helper/auth/user';

export const getAllPrice = async (): Promise<TPrice[]> => {
  try {
    const token = await getUserToken();
    const getAPrice = async () => {
      'use cache';
      cacheTag('prices');
      cacheLife('hours');
      return serverFetch<TPrice[]>('/prices', {}, token);
    };
    return getAPrice();
  } catch (error) {
    handleApiError(error);
  }
};

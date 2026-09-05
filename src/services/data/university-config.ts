import { serverFetch } from '../server-fetch';
import { TUniversityConfig } from '@/types/global';
import { handleApiError } from '../error-handler';
import { cacheLife, cacheTag } from 'next/cache';
import { getUserToken } from '@/lib/helper/auth/user';

export const getUniversityRules = async (): Promise<TUniversityConfig> => {
  try {
    const token = await getUserToken();
    const getUniversityRule = async () => {
      'use cache';
      cacheTag('university');
      cacheLife('hours');
      return serverFetch<TUniversityConfig>('/university', {}, token);
    };

    return getUniversityRule();
  } catch (error) {
    handleApiError(error);
  }
};

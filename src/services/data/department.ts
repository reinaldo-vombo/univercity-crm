import { TDepartemant } from '@/types/global';
import { handleApiError } from '../error-handler';
import { serverFetch } from '../server-fetch';
import { cacheLife, cacheTag } from 'next/cache';
import { getUserToken } from '@/lib/helper/auth/user';
// import { REVALIDATION } from '@/constants/relalidation';;

export const getAllDepartments = async (): Promise<TDepartemant[]> => {
  try {
    const token = await getUserToken();
    const getDepartments = async () => {
      'use cache';
      cacheTag('departements');
      cacheLife('hours');
      return serverFetch<TDepartemant[]>('/academic-department', {}, token);
    };

    return getDepartments();
  } catch (error) {
    handleApiError(error);
  }
};

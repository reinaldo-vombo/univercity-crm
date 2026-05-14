import { IQueryParams, TDiscipline } from '@/types/global';
import { serverFetch } from '../server-fetch';
import { handleApiError } from '../error-handler';
import { cacheLife, cacheTag } from 'next/cache';
import { getUserToken } from '@/lib/helper/auth/user';

export const getAllDiscipline = async (
  query?: IQueryParams,
): Promise<TDiscipline[]> => {
  console.log(query);

  try {
    const token = await getUserToken();
    const getDiscipline = async () => {
      'use cache';
      cacheTag('disciplines');
      cacheLife('hours');
      return serverFetch<TDiscipline[]>('/discipline', {}, token);
    };

    return getDiscipline();
  } catch (error) {
    handleApiError(error);
  }
};

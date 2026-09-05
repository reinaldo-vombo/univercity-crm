import { TCourse } from '@/types/global';
import { serverFetch } from '../server-fetch';
import { handleApiError } from '../error-handler';
import { cacheLife, cacheTag } from 'next/cache';
import { getUserToken } from '@/lib/helper/auth/user';

export const getAllCurses = async (): Promise<TCourse[]> => {
  try {
    const token = await getUserToken();
    const getCourses = async () => {
      'use cache';
      cacheTag('curses');
      cacheLife('hours');
      return serverFetch<TCourse[]>('/course', {}, token);
    };

    return getCourses();
  } catch (error) {
    handleApiError(error);
  }
};

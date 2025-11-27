import { TCourse } from '@/types/global';
import { serverFetch } from '../server-fetch';
import { handleApiError } from '../error-handler';
import { REVALIDATION } from '@/constants/mock-data';

export const getAllCurses = async (): Promise<TCourse[]> => {
  try {
    const curses = await serverFetch<TCourse[]>('/course', {
      next: {
        tags: ['curse'],
        revalidate:
          process.env.NODE_ENV === 'production' ? REVALIDATION.FIVE_MINUTES : 0,
      }, // 🚀 tags for smart revalidation
    });
    return curses;
  } catch (error) {
    handleApiError(error);
  }
};

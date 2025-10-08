import { TCourse } from '@/types/global';
import { serverFetch } from '../server-fetch';
import { handleApiError } from '../error-handler';

export const getAllCurses = async (): Promise<TCourse[]> => {
  try {
    const curses = await serverFetch<TCourse[]>('/course', {
      next: { tags: ['curse'] }, // 🚀 tags for smart revalidation
    });
    return curses;
  } catch (error) {
    handleApiError(error);
  }
};

import { TStudent } from '@/types/global';
import { handleApiError } from '../error-handler';
import { serverFetch } from '../server-fetch';

export const getAllStudent = async (): Promise<TStudent[]> => {
  try {
    const students = await serverFetch<TStudent[]>('/student', {
      next: { tags: ['student'] },
    });
    return students;
  } catch (error) {
    handleApiError(error);
  }
};

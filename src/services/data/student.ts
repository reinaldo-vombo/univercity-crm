import { TStudent } from '@/types/global';
import { handleApiError } from '../error-handler';
import { serverFetch } from '../server-fetch';
import { FLASH_MESSAGE } from '@/constants/flash-message';

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
export const getSingleStudent = async (
  studentId: string
): Promise<TStudent[]> => {
  if (!studentId) {
    console.error(FLASH_MESSAGE.ID_REQUIRID);
    return [];
  }
  try {
    const student = await serverFetch<TStudent[]>(`/student/${studentId}`, {
      next: { tags: ['student'] },
    });
    return student;
  } catch (error) {
    handleApiError(error);
  }
};
export const getStudentCouse = async (
  studentId: string
): Promise<TStudent[]> => {
  if (!studentId) {
    console.error(FLASH_MESSAGE.ID_REQUIRID);
    return [];
  }
  try {
    const student = await serverFetch<TStudent[]>(`/my-courses/${studentId}`, {
      next: { tags: ['student'] },
    });
    return student;
  } catch (error) {
    handleApiError(error);
  }
};

import { TFaculty } from '@/types/global';
import { handleApiError } from '../error-handler';
import { serverFetch } from '../server-fetch';

export const getSigleFalcultyService = async (
  id: string
): Promise<TFaculty[]> => {
  try {
    const faculty = await serverFetch<TFaculty[]>(`/faculty/${id}`, {
      next: { tags: ['faculty_service'] },
    });
    return faculty;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllFalculty = async (): Promise<TFaculty[]> => {
  try {
    const faculty = await serverFetch<TFaculty[]>('/faculty/', {
      next: { tags: ['faculty'] },
    });
    return faculty;
  } catch (error) {
    handleApiError(error);
  }
};

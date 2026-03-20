import { TFaculty, TFacultyDisciplines } from '@/types/global';
import { handleApiError } from '../error-handler';
import { serverFetch } from '../server-fetch';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { REVALIDATION } from '@/constants/relalidation';

export const getSigleFalcultyService = async (
  facultyId: string
): Promise<TFaculty[]> => {
  if (!facultyId) {
    console.error(FLASH_MESSAGE.ID_REQUIRID);
    return [];
  }
  try {
    const faculty = await serverFetch<TFaculty[]>(`/faculty/${facultyId}`, {
      next: {
        tags: ['faculty_service'],
        revalidate:
          process.env.NODE_ENV === 'production' ? REVALIDATION.FIVE_MINUTES : 0,
      },
    });
    return faculty;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllFalculty = async (): Promise<TFaculty[]> => {
  try {
    const faculty = await serverFetch<TFaculty[]>('/faculty', {
      next: {
        tags: ['faculty'],
        revalidate:
          process.env.NODE_ENV === 'production' ? REVALIDATION.FIVE_MINUTES : 0,
      },
    });
    return faculty;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllFacultyDocList = async (
  filters: string
): Promise<Response> => {
  try {
    const documentList = await serverFetch<Response>(
      `/export/faculty?${filters}`
    );
    return documentList;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllFacultyDiscipline = async (
  offeredCourseSectionId: string
): Promise<TFacultyDisciplines> => {
  try {
    const disciplines = await serverFetch<TFacultyDisciplines>(
      `/assign-discipline/${offeredCourseSectionId}`
    );
    return disciplines;
  } catch (error) {
    handleApiError(error);
  }
};
export const getFacultyCourses = async (): Promise<any> => {
  try {
    const services = await serverFetch<any>(`/my-courses`, {
      next: {
        tags: ['courses-service'],
        revalidate:
          process.env.NODE_ENV === 'production' ? REVALIDATION.FIVE_MINUTES : 0,
      },
    });
    return services;
  } catch (error) {
    handleApiError(error);
  }
};

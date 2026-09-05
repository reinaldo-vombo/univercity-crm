import { TFaculty, TFacultyDisciplines } from '@/types/global';
import { handleApiError } from '../error-handler';
import { serverFetch } from '../server-fetch';
import { cacheLife, cacheTag } from 'next/cache';
import { getUserToken } from '@/lib/helper/auth/user';

export const getSigleFalcultyService = async (
  facultyId: string,
): Promise<TFaculty> => {
  try {
    const token = await getUserToken();
    const getFalcultyService = async () => {
      'use cache';
      cacheTag(`faculty-service-${facultyId}`);
      cacheLife('hours');
      return serverFetch<TFaculty>(`/faculty/${facultyId}`, {}, token);
    };
    return getFalcultyService();
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllFalculty = async (): Promise<TFaculty[]> => {
  try {
    const token = await getUserToken();
    const getFalculty = async () => {
      'use cache';
      cacheTag('facultys');
      cacheLife('hours');
      return serverFetch<TFaculty[]>('/faculty', {}, token);
    };
    return getFalculty();
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllFacultyDocList = async (
  filters: string,
): Promise<Response> => {
  try {
    const token = await getUserToken();
    const documentList = await serverFetch<Response>(
      `/export/faculty?${filters}`,
      {},
      token,
    );
    return documentList;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllFacultyDiscipline = async (
  offeredCourseSectionId: string,
): Promise<TFacultyDisciplines> => {
  try {
    const token = await getUserToken();
    const getFacultyDiscipline = async () => {
      'use cache';
      cacheTag(`assign-discipline-${offeredCourseSectionId}`);
      cacheLife('hours');
      return serverFetch<TFacultyDisciplines>(
        `/assign-discipline/${offeredCourseSectionId}`,
        {},
        token,
      );
    };
    return getFacultyDiscipline();
  } catch (error) {
    handleApiError(error);
  }
};
export const getFacultyCourses = async (): Promise<any> => {
  try {
    const token = await getUserToken();
    const getFacultyCourse = async () => {
      'use cache';
      cacheTag('courses-service');
      cacheLife('hours');
      return serverFetch<TFacultyDisciplines>('my-courses', {}, token);
    };
    return getFacultyCourse();
  } catch (error) {
    handleApiError(error);
  }
};

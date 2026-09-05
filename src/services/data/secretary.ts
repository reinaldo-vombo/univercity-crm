import { handleApiError } from '../error-handler';
import { serverFetch } from '../server-fetch';
import { TAcademicService, TRequest, TUactiveStudents } from '@/types/global';
import { cacheLife, cacheTag } from 'next/cache';
import { getUserToken } from '@/lib/helper/auth/user';

export const getAllStudentsRequests = async (): Promise<TRequest[]> => {
  try {
    const token = await getUserToken();
    const getStudentsRequests = async () => {
      'use cache';
      cacheTag('student-requests');
      cacheLife('hours');
      return serverFetch<TRequest[]>('/secretary/requests', {}, token);
    };

    return getStudentsRequests();
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllUnactiveStudent = async (): Promise<TUactiveStudents[]> => {
  try {
    const token = await getUserToken();
    const getUnactiveStudent = async () => {
      'use cache';
      cacheTag('unactive-students');
      cacheLife('hours');
      return serverFetch<TUactiveStudents[]>(
        '/secretary/unactive-students',
        {},
        token,
      );
    };

    return getUnactiveStudent();
  } catch (error) {
    handleApiError(error);
  }
};
export const getAcademicServices = async (): Promise<TAcademicService[]> => {
  try {
    const token = await getUserToken();
    const getAcademicService = async () => {
      'use cache';
      cacheTag('academic-service');
      cacheLife('hours');
      return serverFetch<TAcademicService[]>('/academic-service', {}, token);
    };

    return getAcademicService();
  } catch (error) {
    handleApiError(error);
  }
};

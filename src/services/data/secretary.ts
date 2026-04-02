import { REVALIDATION } from '@/constants/relalidation';
import { handleApiError } from '../error-handler';
import { serverFetch } from '../server-fetch';
import { TRequest, TUactiveStudents } from '@/types/global';

export const getAllStudentsRequests = async (): Promise<TRequest[]> => {
  try {
    const requests = await serverFetch<TRequest[]>('/secretary/requests', {
      next: {
        tags: ['requests'],
        revalidate:
          process.env.NODE_ENV === 'production' ? REVALIDATION.ONE_HOUR : 0,
      },
    });
    return requests;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllUnactiveStudent = async (): Promise<TUactiveStudents[]> => {
  try {
    const requests = await serverFetch<TUactiveStudents[]>(
      '/secretary/unactive-students',
      {
        next: {
          tags: ['unactive-students'],
          revalidate:
            process.env.NODE_ENV === 'production' ? REVALIDATION.ONE_HOUR : 0,
        },
      },
    );
    return requests;
  } catch (error) {
    handleApiError(error);
  }
};

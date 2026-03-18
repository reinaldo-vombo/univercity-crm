import { REVALIDATION } from '@/constants/relalidation';
import { serverFetch } from '../server-fetch';
import { TAcademicService, TUniversityRules } from '@/types/global';
import { handleApiError } from '../error-handler';

export const getUniversityRules = async (): Promise<TUniversityRules> => {
  try {
    const accounts = await serverFetch<TUniversityRules>('/university', {
      next: {
        tags: ['university'],
        revalidate:
          process.env.NODE_ENV === 'production' ? REVALIDATION.ONE_HOUR : 0,
      },
    });
    return accounts;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAcademicServices = async (): Promise<TAcademicService[]> => {
  try {
    const accounts = await serverFetch<TAcademicService[]>(
      '/academic-service',
      {
        next: {
          tags: ['academic-service'],
          revalidate:
            process.env.NODE_ENV === 'production' ? REVALIDATION.ONE_HOUR : 0,
        },
      },
    );
    return accounts;
  } catch (error) {
    handleApiError(error);
  }
};

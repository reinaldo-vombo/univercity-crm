import { TDepartemant } from '@/types/global';
import { handleApiError } from '../error-handler';
import { serverFetch } from '../server-fetch';
import { REVALIDATION } from '@/constants/relalidation';
// import { REVALIDATION } from '@/constants/relalidation';;

export const getAllDepartments = async (): Promise<TDepartemant[]> => {
  try {
    const departements = await serverFetch<TDepartemant[]>(
      '/academic-department',
      {
        next: {
          tags: ['departement'],
          revalidate:
            process.env.NODE_ENV === 'production'
              ? REVALIDATION.FIVE_MINUTES
              : 0,
        },
      }
    );
    return departements;
  } catch (error) {
    handleApiError(error);
  }
};

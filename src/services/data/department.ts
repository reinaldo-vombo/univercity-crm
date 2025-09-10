import { TDepartemant } from '@/types/global';
import { handleApiError } from '../error-handler';
import { serverFetch } from '../server-fetch';
// import { REVALIDATION } from '@/constants/mock-data';

export const getAllDepartments = async (): Promise<TDepartemant[]> => {
  try {
    const departements = await serverFetch<TDepartemant[]>(
      '/academic-department',
      {
        next: { tags: ['departement'] },
      }
    );
    return departements;
  } catch (error) {
    handleApiError(error);
  }
};

import { IQueryParams, TDiscipline } from '@/types/global';
import { serverFetch } from '../server-fetch';
import { handleApiError } from '../error-handler';
import { REVALIDATION } from '@/constants/mock-data';

export const getAllDiscipline = async (
  query?: IQueryParams
): Promise<TDiscipline[]> => {
  try {
    const queryString = new URLSearchParams(
      Object.entries(query || {}).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '')
          acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const url = `/discipline${queryString ? `?${queryString}` : ''}`;
    const discipline = await serverFetch<TDiscipline[]>(url, {
      next: {
        tags: ['discipline'],
        revalidate:
          process.env.NODE_ENV === 'production' ? REVALIDATION.FIVE_MINUTES : 0,
      },
    });
    return discipline;
  } catch (error) {
    handleApiError(error);
  }
};

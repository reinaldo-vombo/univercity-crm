import { TPrice } from '@/types/global';
import { handleApiError } from '../error-handler';
import { serverFetch } from '../server-fetch';
import { REVALIDATION } from '@/constants/mock-data';

export const getAllPrice = async (): Promise<TPrice[]> => {
  try {
    const prices = await serverFetch<TPrice[]>('/price', {
      next: { tags: ['price'], revalidate: REVALIDATION.ONE_HOUR },
    });
    return prices;
  } catch (error) {
    handleApiError(error);
  }
};

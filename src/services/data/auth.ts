import { TLockedAccount } from '@/types/global';
import { serverFetch } from '../server-fetch';
import { REVALIDATION } from '@/constants/relalidation';
import { handleApiError } from '../error-handler';

export const getLockAccount = async (): Promise<TLockedAccount[]> => {
  try {
    const accounts = await serverFetch<TLockedAccount[]>(
      '/auth/locked-accounts',
      {
        next: {
          tags: ['locked-accounts'],
          revalidate:
            process.env.NODE_ENV === 'production'
              ? REVALIDATION.TEN_MINUTES
              : 0,
        },
      },
    );
    return accounts;
  } catch (error) {
    handleApiError(error);
  }
};

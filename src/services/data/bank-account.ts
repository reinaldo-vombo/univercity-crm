import { REVALIDATION } from '@/constants/relalidation';
import { serverFetch } from '../server-fetch';
import { TBankAccountAnalitycs } from '@/types/global';
import { handleApiError } from '../error-handler';

export const getAllAccounts = async (): Promise<TBankAccountAnalitycs[]> => {
  try {
    const accounts = await serverFetch<TBankAccountAnalitycs[]>(
      '/bank-accountes',
      {
        next: {
          tags: ['bank-accountes'],
          revalidate:
            process.env.NODE_ENV === 'production'
              ? REVALIDATION.FIVE_MINUTES
              : 0,
        },
      },
    );
    return accounts;
  } catch (error) {
    handleApiError(error);
  }
};
export const getSigleAccountAnalitycs = async (
  bankId: string,
): Promise<TBankAccountAnalitycs> => {
  try {
    const accounts = await serverFetch<TBankAccountAnalitycs>(
      `/bank-accountes/analitycs/${bankId}`,
      {
        next: {
          tags: ['bank-accountes'],
          revalidate:
            process.env.NODE_ENV === 'production'
              ? REVALIDATION.FIVE_MINUTES
              : 0,
        },
      },
    );
    return accounts;
  } catch (error) {
    handleApiError(error);
  }
};

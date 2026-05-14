import { serverFetch } from '../server-fetch';
import { TBankAccountAnalitycs } from '@/types/global';
import { handleApiError } from '../error-handler';
import { cacheLife, cacheTag } from 'next/cache';
import { getUserToken } from '@/lib/helper/auth/user';

export const getAllAccounts = async (): Promise<TBankAccountAnalitycs[]> => {
  try {
    const token = await getUserToken();
    const getAccounts = async () => {
      'use cache';
      cacheTag('bank-accountes');
      cacheLife('hours');
      return serverFetch<TBankAccountAnalitycs[]>('/bank-accountes', {}, token);
    };

    return getAccounts();
  } catch (error) {
    handleApiError(error);
  }
};
export const getSigleAccountAnalitycs = async (
  bankId: string,
): Promise<TBankAccountAnalitycs> => {
  try {
    const token = await getUserToken();
    const getAccount = async () => {
      'use cache';
      cacheTag(`bank-accountes-${bankId}`);
      cacheLife('hours');
      return serverFetch<TBankAccountAnalitycs>(
        `/bank-accountes/analytics/${bankId}`,
        {},
        token,
      );
    };
    return getAccount();
  } catch (error) {
    handleApiError(error);
  }
};

import { TLockedAccount } from '@/types/global';
import { serverFetch } from '../server-fetch';
import { handleApiError } from '../error-handler';
import { cacheLife, cacheTag } from 'next/cache';
import { getUserToken } from '@/lib/helper/auth/user';

export const getLockAccount = async (): Promise<TLockedAccount[]> => {
  try {
    const token = await getUserToken();
    const LockAccounts = async () => {
      'use cache';
      cacheTag('locked-accounts');
      cacheLife('hours');
      return serverFetch<TLockedAccount[]>('/auth/locked-accounts', {}, token);
    };

    return LockAccounts();
  } catch (error) {
    handleApiError(error);
  }
};

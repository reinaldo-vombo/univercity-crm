import { serverFetch } from '../server-fetch';
import { handleApiError } from '../error-handler';
import { TActionHistory, TAuthLogos, TNotification } from '@/types/global';
import { cacheLife, cacheTag } from 'next/cache';
import { getUserToken } from '@/lib/helper/auth/user';

export const getUserSeesionLogs = async (
  userId: string,
): Promise<TAuthLogos[]> => {
  const token = await getUserToken();
  try {
    const getSession = async () => {
      'use cache';
      cacheTag(`logs-${userId}`);
      cacheLife('hours');
      return serverFetch<TAuthLogos[]>(`/users-session/${userId}`, {}, token);
    };

    return getSession();
  } catch (error) {
    handleApiError(error);
  }
};
export const getUserNotifications = async (
  userId: string,
): Promise<TNotification> => {
  const token = await getUserToken();
  const getNotifications = async () => {
    'use cache';
    cacheTag(`notification-${userId}`);
    cacheLife('hours');
    return serverFetch<TNotification>(
      `/notifications/${userId}/USER`,
      {},
      token,
    );
  };
  try {
    return getNotifications();
  } catch (error) {
    handleApiError(error);
  }
};

// export const getUserNotificationsPreference = async (
//   userId: string,
// ): Promise<TNotificationPreference> => {
//   try {
//     const preferenceSettings = await serverFetch<TNotificationPreference>(
//       `/notifications/preferences/${userId}`,
//       {
//         next: { tags: ['preference'], revalidate: REVALIDATION.ONE_MINUTES },
//       },
//     );
//     return preferenceSettings;
//   } catch (error) {
//     handleApiError(error);
//   }
// };
export const getAllUserActionHistory = async (): Promise<TActionHistory[]> => {
  const token = await getUserToken();
  const getAllUserActionHistory = async () => {
    'use cache';
    cacheTag('actionHistory');
    cacheLife('hours');
    return serverFetch<TActionHistory[]>(`/audit`, {}, token);
  };
  try {
    return getAllUserActionHistory();
  } catch (error) {
    handleApiError(error);
  }
};

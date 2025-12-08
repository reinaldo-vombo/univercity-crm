import { serverFetch } from '../server-fetch';
import { handleApiError } from '../error-handler';
import { REVALIDATION } from '@/constants/mock-data';
import {
  TActionHistory,
  TAuthLogos,
  TNotification,
  TNotificationPreference,
} from '@/types/global';
import { FLASH_MESSAGE } from '@/constants/flash-message';

export const getUserSeesionLogs = async (
  userId: string
): Promise<TAuthLogos[]> => {
  if (!userId) {
    console.error(FLASH_MESSAGE.ID_REQUIRID);
    return [];
  }
  try {
    const sessionLogs = await serverFetch<TAuthLogos[]>(
      `/users-session/${userId}`,
      {
        next: {
          tags: ['logs'],
          revalidate:
            process.env.NODE_ENV === 'production'
              ? REVALIDATION.FIVE_MINUTES
              : 0,
        },
      }
    );
    return sessionLogs;
  } catch (error) {
    handleApiError(error);
  }
};
export const getUserNotifications = async (
  userId: string
): Promise<TNotification[]> => {
  if (!userId) {
    console.error(FLASH_MESSAGE.ID_REQUIRID);
    return [];
  }
  try {
    const notifications = await serverFetch<TNotification[]>(
      `/notifications/${userId}`,
      {
        next: { tags: ['notification'], revalidate: REVALIDATION.ONE_MINUTES },
      }
    );
    return notifications;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUserNotificationsPreference = async (
  userId: string
): Promise<TNotificationPreference> => {
  try {
    const preferenceSettings = await serverFetch<TNotificationPreference>(
      `/notifications/preferences/${userId}`,
      {
        next: { tags: ['preference'], revalidate: REVALIDATION.ONE_MINUTES },
      }
    );
    return preferenceSettings;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllUserActionHistory = async (
  options?: Record<string, string | string[] | number | undefined>
): Promise<TActionHistory[]> => {
  const queryString = options
    ? '?' +
      Object.entries(options)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
        )
        .join('&')
    : '';
  console.log(queryString);
  //userId 'orderBy','entityType','action','from','to','take'
  try {
    const result = await serverFetch<TActionHistory[]>(`/audit`, {
      next: { tags: ['actionHistory'] },
    });
    return result;
  } catch (error) {
    handleApiError(error);
  }
};

import { serverFetch } from '../server-fetch';
import { handleApiError } from '../error-handler';
import { REVALIDATION } from '@/constants/mock-data';
import {
  TActionHistory,
  TAuthLogos,
  TNotification,
  TNotificationPreference,
} from '@/types/global';

export const getUserSeesionLogs = async (id: string): Promise<TAuthLogos[]> => {
  if (!id) {
    console.error('Id é obrigatorio');
    return [];
  }
  try {
    const sessionLogs = await serverFetch<TAuthLogos[]>(
      `/users-session/${id}`,
      {
        next: { tags: ['logs'], revalidate: REVALIDATION.ONE_MINUTES },
      }
    );
    return sessionLogs;
  } catch (error) {
    handleApiError(error);
  }
};
export const getUserNotifications = async (
  id: string
): Promise<TNotification[]> => {
  try {
    const notifications = await serverFetch<TNotification[]>(
      `/notifications/${id}`,
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
  id: string
): Promise<TNotificationPreference> => {
  try {
    const preferenceSettings = await serverFetch<TNotificationPreference>(
      `/notifications/preferences/${id}`,
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
  options?: string[]
): Promise<TActionHistory[]> => {
  console.log(options);

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

'use server';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import {
  actionWithUser,
  validatedActionWithUser,
} from '@/lib/helper/action-helper';
import { preferenceShema } from '@/lib/validation/user';
import { ApiResponseError } from '@/services/api-error';
import { ActionResult, ActionState } from '../types/api-error';
import { serverFetch } from '@/services/server-fetch';
import {
  TAuthLogos,
  TNotification,
  TNotificationPreference,
} from '@/types/global';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';
import { serverUser } from '@/lib/helper/auth/user';

export const logUserActivitys = async (
  userId: string,
  refreshToken: string,
) => {
  const headersList = await headers();

  const forwardedFor = headersList.get('x-forwarded-for');
  const realIp = headersList.get('x-real-ip');
  const ip = forwardedFor?.split(',')[0] || realIp || 'unkwon';

  const userAgent = headersList.get('user-agent') || 'unkwon';
  const { browser, device, os } = UAParser(userAgent);

  const timestamp = new Date();
  const data = {
    userId,
    ip,
    browser,
    os,
    refreshToken,
    deviceType: device,
    timestamp,
    isActive: true,
  };
  try {
    await serverFetch<TAuthLogos>('/users-session', {
      method: 'POST',
      body: data,
    });
  } catch (err) {
    if (err instanceof ApiResponseError) {
      return {
        error: true,
        message: err.message,
        errorMessages: err.errorMessages,
        meta: err.meta,
      };
    }

    return {
      error: true,
      message:
        err instanceof Error ? err.message : FLASH_MESSAGE.UNESPECTED_ERROR,
    };
  }
};
export const deleteUserActivitys = async (id: string) => {
  try {
    await serverFetch(`/users-session/${id}`, {
      method: 'DELETE',
    });
    revalidateTag('logs');
  } catch (err) {
    if (err instanceof ApiResponseError) {
      return {
        error: true,
        message: err.message,
        errorMessages: err.errorMessages,
        meta: err.meta,
      };
    }

    return {
      error: true,
      message:
        err instanceof Error ? err.message : FLASH_MESSAGE.UNESPECTED_ERROR,
    };
  }
};
export const closeSession = async () => {
  try {
    const user = await serverUser();
    await serverFetch(`/users-session/logout/${user?.id}`, {
      method: 'PATCH',
      body: user?.refreshToken,
    });
  } catch (err) {
    if (err instanceof ApiResponseError) {
      return {
        error: true,
        message: err.message,
        errorMessages: err.errorMessages,
        meta: err.meta,
      };
    }

    return {
      error: true,
      message:
        err instanceof Error ? err.message : FLASH_MESSAGE.UNESPECTED_ERROR,
    };
  }
};
export const marknotificationAsRead = async (id: string, userId: string) => {
  try {
    await serverFetch(`/notifications/${id}/read/${userId}`, {
      method: 'PATCH',
      body: null,
    });
    revalidateTag('notification');
  } catch (err) {
    if (err instanceof ApiResponseError) {
      return {
        error: true,
        message: err.message,
        errorMessages: err.errorMessages,
        meta: err.meta,
      };
    }

    return {
      error: true,
      message:
        err instanceof Error ? err.message : FLASH_MESSAGE.UNESPECTED_ERROR,
    };
  }
};
export const markAllNotificationAsRead = async () => {
  try {
    await serverFetch(`/notifications/read-all`, {
      method: 'PATCH',
      body: null,
    });
    revalidateTag('notification');
  } catch (err) {
    if (err instanceof ApiResponseError) {
      return {
        error: true,
        message: err.message,
        errorMessages: err.errorMessages,
        meta: err.meta,
      };
    }

    return {
      error: true,
      message:
        err instanceof Error ? err.message : FLASH_MESSAGE.UNESPECTED_ERROR,
    };
  }
};

export const createNotificationPreference = validatedActionWithUser(
  preferenceShema,
  async (data, _, user): Promise<ActionResult<TNotificationPreference>> => {
    const { enabled, ...settings } = data;
    const newBody = {
      userId: user.id,
      enabled,
      settings,
    };

    try {
      const settings = await serverFetch<TNotificationPreference>(
        '/notifications/preferences',
        {
          method: 'POST',
          body: newBody,
        },
      );

      revalidateTag('preference');

      return {
        error: false,
        data: settings,
      };
    } catch (err) {
      if (err instanceof ApiResponseError) {
        return {
          error: true,
          message: err.message,
          errorMessages: err.errorMessages,
          meta: err.meta,
        };
      }

      return {
        error: true,
        message:
          err instanceof Error ? err.message : FLASH_MESSAGE.UNESPECTED_ERROR,
      };
    }
  },
);

export const deleteNotification = actionWithUser(
  async (id, user): Promise<ActionState<TNotification>> => {
    try {
      const log = await serverFetch<TNotification>(`/notifications/${id}`, {
        method: 'DELETE',
        body: { userId: user.id },
      });

      revalidateTag('notification');
      return {
        error: false,
        message: FLASH_MESSAGE.DELETED,
        data: log,
      };
    } catch (error) {
      return {
        error: true,
        message: error as string,
      };
    }
  },
);
export const deleteAllNotification = async (): Promise<
  ActionState<TNotification>
> => {
  try {
    const log = await serverFetch<TNotification>(`/notifications/`, {
      method: 'DELETE',
    });

    revalidateTag('notification');
    return {
      error: false,
      message: FLASH_MESSAGE.DELETED,
      data: log,
    };
  } catch (error) {
    return {
      error: true,
      message: error as string,
    };
  }
};

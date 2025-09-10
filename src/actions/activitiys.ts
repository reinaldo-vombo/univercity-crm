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
  TActionHistory,
  TAuthLogos,
  TNotification,
  TNotificationPreference,
} from '@/types/global';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';

export const logUserActivitys = async (id: string) => {
  const headersList = await headers();

  const forwardedFor = headersList.get('x-forwarded-for');
  const realIp = headersList.get('x-real-ip');
  const ip = forwardedFor?.split(',')[0] || realIp || 'unkwon';

  const userAgent = headersList.get('user-agent') || 'unkwon';
  const { browser, device, os } = UAParser(userAgent);

  const timestamp = new Date();
  const data = {
    userId: id,
    ip,
    browser,
    os,
    deviceType: device,
    timestamp,
    isActive: true,
  };
  console.log('logs', data);
  try {
    await serverFetch<TAuthLogos>('/users-session', {
      method: 'POST',
      body: data,
    });
    console.log('sucesse');
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
export const logoutUserActivitys = actionWithUser(async (id, user) => {
  try {
    await serverFetch(`/users-session`, {
      method: 'PUT',
      body: {
        id,
        userId: user.id,
      },
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
});
export const marknotificationAsRead = async (id: string) => {
  try {
    await serverFetch(`/notifications/${id}/read`, {
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
export const markAllNotificationAsRead = async (id: string) => {
  try {
    await serverFetch(`/notifications/${id}/read/all`, {
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
    const newBody = {
      userId: user.id,
      settings: {
        important: data.important,
        payment: data.department,
        user: data.user,
        department: data.payment,
      },
    };

    try {
      const settings = await serverFetch<TNotificationPreference>(
        '/notifications/preferences',
        {
          method: 'POST',
          body: newBody,
        }
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
  }
);

export const deleteAudiLog = actionWithUser(
  async (id, user): Promise<ActionState<TActionHistory>> => {
    try {
      const log = await serverFetch<TActionHistory>(
        `/audit/${id}?authorName=${user.name}&userId=${user.id}`,
        {
          method: 'DELETE',
        }
      );

      revalidateTag('actionHistory');
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
  }
);
export const deleteAllAudiLog = actionWithUser(
  async (id, user): Promise<ActionState<TActionHistory>> => {
    try {
      const log = await serverFetch<TActionHistory>(
        `/audit/all?userId=${user.id}&authorName=${user.name}`,
        {
          method: 'DELETE',
        }
      );

      revalidateTag('actionHistory');
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
  }
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
  }
);
export const deleteAllNotification = actionWithUser(
  async (id, user): Promise<ActionState<TNotification>> => {
    try {
      const log = await serverFetch<TNotification>(
        `/notifications/all/${user.id}`,
        {
          method: 'DELETE',
        }
      );

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
  }
);

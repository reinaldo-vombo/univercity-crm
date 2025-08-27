'use server';

import { revalidateTag } from 'next/cache';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { serverFetch } from '@/services/server-fetch';
import { TAuthLogos, TUser } from '../types/global';
import { validatedActionWithUser } from '../lib/helper/action-helper';
import { updateSchema, userSchema } from '../lib/validation/user';
import { ActionResult, ActionState } from '../types/api-error';
import { saveFile } from '../lib/helper/uploade';
import { headers } from 'next/headers';
import { ApiResponseError } from '@/services/api-error';
import { UAParser } from 'ua-parser-js';

export const addNewUser = validatedActionWithUser(
  userSchema,
  async (data): Promise<ActionResult<TUser>> => {
    try {
      const user = await serverFetch<TUser>('/users', {
        method: 'POST',
        body: data,
      });

      revalidateTag('users');

      return {
        error: false,
        data: user,
      };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';

      return {
        error: true,
        message,
      };
    }
  }
);

export const updatedUser = validatedActionWithUser(
  updateSchema,
  async (data): Promise<ActionResult<TUser>> => {
    try {
      let avatarUrl: any = data.avatar;
      if (data.avatar instanceof File) {
        avatarUrl = await saveFile(data.avatar, 'users');
      }
      data = { ...data, avatar: avatarUrl };

      const result = await serverFetch<TUser>(`/users/${data.id}`, {
        method: 'PUT',
        body: data,
      });

      revalidateTag('users');

      return {
        error: false,
        data: result,
      };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';

      return {
        error: true,
        message,
      };
    }
  }
);
export const deleteUser = async (id: string): Promise<ActionState<null>> => {
  try {
    await serverFetch<null>(`/users/${id}`, {
      method: 'DELETE',
    });

    revalidateTag('users');
    return {
      error: false,
      message: FLASH_MESSAGE.DELETED,
      data: null,
    };
  } catch (error) {
    return {
      error: true,
      message: error as string,
    };
  }
};
export const recoverPassword = async (
  data: string
): Promise<ActionState<null>> => {
  try {
    await serverFetch<null>('/recover-password', {
      method: 'POST',
      body: data,
    });

    return {
      error: false,
      message: 'Um email foi enviado a sua caixa',
      data: null,
    };
  } catch (err) {
    return {
      error: true,
      message:
        err instanceof Error ? err.message : FLASH_MESSAGE.UNESPECTED_ERROR,
    };
  }
};

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

  try {
    await serverFetch<TAuthLogos>('/users/logs', {
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
export const logoutUserActivitys = async (id: string) => {
  try {
    await serverFetch(`/users/logs/${id}`, {
      method: 'POST',
      body: null,
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

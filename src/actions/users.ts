'use server';

import { revalidateTag } from 'next/cache';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { serverFetch } from '@/services/server-fetch';
import { TUser } from '../types/global';
import {
  actionWithUser,
  validatedActionWithUser,
} from '../lib/helper/action-helper';
import { updateSchema, userSchema } from '../lib/validation/user';
import { ActionResult, ActionState } from '../types/api-error';
import { saveFile } from '../lib/helper/uploade';
import { ApiResponseError } from '@/services/api-error';

export const addNewUser = validatedActionWithUser(
  userSchema,
  async (data, _, user): Promise<ActionResult<TUser>> => {
    try {
      const member = await serverFetch<TUser>(
        `/users?userId=${user.id}&authorName=${user.name}`,
        {
          method: 'POST',
          body: data,
        }
      );

      revalidateTag('users');

      return {
        error: false,
        data: member,
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

export const updatedUser = validatedActionWithUser(
  updateSchema,
  async (data, _, user): Promise<ActionResult<TUser>> => {
    try {
      let avatarUrl: any = data.avatar;
      if (data.avatar instanceof File) {
        avatarUrl = await saveFile(data.avatar, 'users');
      }
      data = { ...data, avatar: avatarUrl };

      const result = await serverFetch<TUser>(
        `/users/${data.id}?userId=${user.id}&authorName=${user.name}`,
        {
          method: 'PUT',
          body: data,
        }
      );

      revalidateTag('users');

      return {
        error: false,
        data: result,
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
export const deleteUser = actionWithUser(
  async (id, user): Promise<ActionState<TUser>> => {
    try {
      const dletedUser = await serverFetch<TUser>(
        `/users/${id}?userId=${user.id}&authorName=${user.name}`,
        {
          method: 'DELETE',
        }
      );

      revalidateTag('users');
      return {
        error: false,
        message: FLASH_MESSAGE.DELETED,
        data: dletedUser,
      };
    } catch (error) {
      return {
        error: true,
        message: error as string,
      };
    }
  }
);

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

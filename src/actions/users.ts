'use server';

import { revalidateTag } from 'next/cache';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { serverFetch } from '@/services/server-fetch';
import { TUser } from '../types/global';
import { validatedActionWithUser } from '../lib/helper/action-helper';
import {
  changePasswordShema,
  updateSchema,
  userSchema,
} from '../lib/validation/user';
import { ActionResult, ActionState } from '../types/api-error';
import { saveFile } from '../lib/helper/uploade';
import { ApiResponseError } from '@/services/api-error';
import { serverUser } from '@/lib/helper/auth/user';

export const addNewUser = validatedActionWithUser(
  userSchema,
  async (data, _, user): Promise<ActionResult<TUser>> => {
    try {
      const member = await serverFetch<TUser>(`/users?name=${user.name}`, {
        method: 'POST',
        body: data,
      });

      revalidateTag('user');

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
        `/users/${data.id}?name=${user.name}`,
        {
          method: 'PATCH',
          body: data,
        }
      );

      revalidateTag('user');

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
export const updatedUserPassword = validatedActionWithUser(
  changePasswordShema,
  async (data, _, user): Promise<ActionResult<TUser>> => {
    try {
      const { confirm_password, new_password } = data;

      if (new_password !== confirm_password) {
        return {
          error: true,
          message: 'As senha não combinam',
        };
      }
      const result = await serverFetch<TUser>(
        `/users/${user.id}/change-password`,
        {
          method: 'PATCH',
          body: data,
        }
      );

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
export const deleteUser = async (id: string): Promise<ActionState<TUser>> => {
  const user = await serverUser();

  try {
    const dletedUser = await serverFetch<TUser>(
      `/users/${id}?name=${user?.name}`,
      {
        method: 'DELETE',
      }
    );

    revalidateTag('user');
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
};

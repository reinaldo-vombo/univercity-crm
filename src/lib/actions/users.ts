'use server';

import { revalidateTag } from 'next/cache';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { serverFetch } from '@/services/server-fetch';
import { TUser } from '../../types/global';
import { validatedActionWithUser } from '../helper/action-helper';
import { updateSchema, userSchema } from '../validation/user';
import { ActionResult, ActionState } from '../../types/api-error';
import { saveFile } from '../helper/uploade';

export const addNewUser = validatedActionWithUser(
  userSchema,
  async (data): Promise<ActionResult<TUser>> => {
    try {
      const user = await serverFetch<TUser>('/auth/register', {
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
  async (data, formData, user): Promise<ActionResult<TUser>> => {
    try {
      let avatarUrl: any = data.avatar;
      if (data.avatar instanceof File) {
        avatarUrl = await saveFile(data.avatar, 'users');
      }
      data = { ...data, avatar: avatarUrl };

      const result = await serverFetch<TUser>(`/users/${user.id}`, {
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
      message: FLASH_MESSAGE.USER_DELETED,
      data: null,
    };
  } catch (error) {
    return {
      error: true,
      message: error as string,
    };
  }
};

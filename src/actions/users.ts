'use server';

import { updateTag } from 'next/cache';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { serverActionFetch } from '@/services/server-fetch';
import { TUser } from '../types/global';
import { validatedActionWithUser } from '../lib/helper/action-helper';
import {
  changePasswordShema,
  updateSchema,
  userSchema,
} from '../lib/validation/user';
import { ActionResult, ActionState } from '../types/api-error';
import { ApiResponseError } from '@/services/api-error';

export const addNewUser = validatedActionWithUser(
  userSchema,
  async (data): Promise<ActionResult<TUser>> => {
    try {
      const member = await serverActionFetch<TUser>(`/users`, {
        method: 'POST',
        body: data,
      });

      updateTag('users');

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
  },
);

export const updatedUser = validatedActionWithUser(
  updateSchema,
  async (data): Promise<ActionResult<TUser>> => {
    const { id, ...res } = data;

    try {
      const result = await serverActionFetch<TUser>(
        `/users/${id}`,
        {
          method: 'PATCH',
          body: res,
        },
        true,
      );
      console.log(data);

      updateTag(`user-${data.id}`);

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
  },
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
      const result = await serverActionFetch<TUser>(
        `/users/${user.id}/change-password`,
        {
          method: 'PATCH',
          body: data,
        },
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
  },
);
export const deleteUser = async (id: string): Promise<ActionState<TUser>> => {
  try {
    const dletedUser = await serverActionFetch<TUser>(`/users/${id}`, {
      method: 'DELETE',
    });

    updateTag(`user-${id}`);
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

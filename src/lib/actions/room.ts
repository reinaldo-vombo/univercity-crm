'use server';

import { revalidateTag } from 'next/cache';
import { serverFetch } from '@/services/server-fetch';
import { TRoom } from '../../types/global';
import { validatedActionWithUser } from '../helper/action-helper';
import { roomSchema, updateRoomSchema } from '../validation/building';
import { ApiResponseError } from '@/services/api-error';
import { ActionResult } from '../../types/api-error';
import { FLASH_MESSAGE } from '@/constants/flash-message';

export const addNewRoom = validatedActionWithUser(
  roomSchema,
  async (data): Promise<ActionResult<TRoom>> => {
    try {
      const room = await serverFetch<TRoom>('/room', {
        method: 'POST',
        body: data,
      });

      revalidateTag('room');

      return {
        error: false,
        data: room,
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
export const updateRoom = validatedActionWithUser(
  updateRoomSchema,
  async (data): Promise<ActionResult<TRoom>> => {
    const { id, ...body } = data;
    try {
      const room = await serverFetch<TRoom>(`/room/${id}`, {
        method: 'PATCH',
        body: body,
      });

      revalidateTag('room');

      return {
        error: false,
        data: room,
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
export const deleteRoom = async (id: string): Promise<ActionResult<TRoom>> => {
  try {
    const data = await serverFetch<TRoom>(`/room/${id}`, {
      method: 'DELETE',
    });

    revalidateTag('room');
    return {
      error: false,
      data,
    };
  } catch (error) {
    return {
      error: true,
      message:
        error instanceof Error ? error.message : FLASH_MESSAGE.UNESPECTED_ERROR,
    };
  }
};

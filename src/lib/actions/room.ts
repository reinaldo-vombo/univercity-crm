'use server';

import { revalidateTag } from 'next/cache';
import { serverFetch } from '../helper/api/server-fetch';
import { TBuiding } from '../types/global';
import { validatedActionWithUser } from '../helper/action-helper';
import { roomSchema, updateRoomSchema } from '../validation/building';
import { ApiResponseError } from '../helper/api/api-error';
import { ActionResult } from '../types/api-error';
import { FLASH_MESSAGE } from '@/constants/flash-message';

export const addNewRoom = validatedActionWithUser(
  roomSchema,
  async (data): Promise<ActionResult<TBuiding>> => {
    try {
      const curses = await serverFetch<TBuiding>('/room', {
        method: 'POST',
        body: data,
      });

      revalidateTag('room');

      return {
        error: false,
        data: curses,
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
  async (data): Promise<ActionResult<TBuiding>> => {
    const { id, ...body } = data;
    try {
      const building = await serverFetch<TBuiding>(`/room/${id}`, {
        method: 'PATCH',
        body: body,
      });

      revalidateTag('room');

      return {
        error: false,
        data: building,
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
export const deleteRoom = async (
  id: string
): Promise<ActionResult<TBuiding>> => {
  try {
    const data = await serverFetch<TBuiding>(`/room/${id}`, {
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

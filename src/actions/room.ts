'use server';

import { updateTag } from 'next/cache';
import { serverActionFetch } from '@/services/server-fetch';
import { TRoom } from '../types/global';
import {
  actionWithUser,
  validatedActionWithUser,
} from '../lib/helper/action-helper';
import {
  blukUpdateRoomShema,
  roomSchema,
  updateRoomSchema,
} from '../lib/validation/building';
import { ApiResponseError } from '@/lib/errors/api-error';
import { ActionResult } from '../lib/errors/api-error.type';
import { FLASH_MESSAGE } from '@/constants/flash-message';

export const addNewRoom = validatedActionWithUser(
  roomSchema,
  async (data): Promise<ActionResult<TRoom>> => {
    try {
      const room = await serverActionFetch<TRoom>('/room', {
        method: 'POST',
        body: data,
      });

      updateTag('rooms');

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
          err instanceof Error ? err.message : FLASH_MESSAGE.SERVER_ERROR,
      };
    }
  },
  { action: 'create', subject: 'Room' },
);
export const updateRoom = validatedActionWithUser(
  updateRoomSchema,
  async (data): Promise<ActionResult<TRoom>> => {
    const { id, ...body } = data;
    try {
      const room = await serverActionFetch<TRoom>(`/room/${id}`, {
        method: 'PATCH',
        body: body,
      });

      updateTag('room');

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
          err instanceof Error ? err.message : FLASH_MESSAGE.SERVER_ERROR,
      };
    }
  },
  { action: 'update', subject: 'Room' },
);
export const updateManyRoom = validatedActionWithUser(
  blukUpdateRoomShema,
  async (data): Promise<ActionResult<TRoom>> => {
    try {
      const room = await serverActionFetch<TRoom>(`/room/update`, {
        method: 'PATCH',
        body: data,
      });

      updateTag('room');

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
          err instanceof Error ? err.message : FLASH_MESSAGE.SERVER_ERROR,
      };
    }
  },
  { action: 'update', subject: 'Room' },
);
export const deleteRoom = actionWithUser(
  async (id: string): Promise<ActionResult<TRoom>> => {
    const parsedId = Number(id);
    try {
      const data = await serverActionFetch<TRoom>(`/room/${parsedId}`, {
        method: 'DELETE',
      });

      updateTag('room');
      return {
        error: false,
        data,
      };
    } catch (error) {
      return {
        error: true,
        message:
          error instanceof Error ? error.message : FLASH_MESSAGE.SERVER_ERROR,
      };
    }
  },
  { action: 'delete', subject: 'Room' },
);
export const deleteManyRoom = async (
  ids: string[],
): Promise<ActionResult<TRoom>> => {
  try {
    const data = await serverActionFetch<TRoom>(`/room/delete`, {
      method: 'DELETE',
      body: ids,
    });

    updateTag('room');
    return {
      error: false,
      data,
    };
  } catch (error) {
    return {
      error: true,
      message:
        error instanceof Error ? error.message : FLASH_MESSAGE.SERVER_ERROR,
    };
  }
};

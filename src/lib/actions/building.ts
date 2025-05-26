'use server';

import { revalidateTag } from 'next/cache';
import { serverFetch } from '../helper/api/server-fetch';
import { TBuiding, TCurse } from '../types/global';
import { validatedActionWithUser } from '../action-helper';
import { buildingSchema } from '../validation/building';
import { ApiResponseError } from '../helper/api/api-error';
import { ActionResult, ActionState } from '../types/api-error';
import { FLASH_MESSAGE } from '@/constants/flash-message';

export const addNewBuilding = validatedActionWithUser(
  buildingSchema,
  async (data): Promise<ActionResult<TBuiding>> => {
    try {
      const curses = await serverFetch<TBuiding>('/building', {
        method: 'POST',
        body: data,
      });

      revalidateTag('buiding');

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
export const updateBuilding = validatedActionWithUser(
  buildingSchema,
  async (data): Promise<ActionResult<TBuiding>> => {
    try {
      const curses = await serverFetch<TBuiding>('/building', {
        method: 'PATCH',
        body: data,
      });

      revalidateTag('buidings');

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
export const deleteBuilding = async (
  id: string
): Promise<ActionState<TCurse>> => {
  try {
    const data = await serverFetch<TCurse>(`/building/${id}`, {
      method: 'DELETE',
    });

    revalidateTag('buidings');
    return {
      error: false,
      message: 'Edificio criado',
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

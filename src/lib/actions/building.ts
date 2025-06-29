'use server';

import { revalidateTag } from 'next/cache';
import { serverFetch } from '../helper/api/server-fetch';
import { TBuiding } from '../types/global';
import { validatedActionWithUser } from '../helper/action-helper';
import { buildingSchema, updateBuildingSchema } from '../validation/building';
import { ApiResponseError } from '../helper/api/api-error';
import { ActionResult } from '../types/api-error';
import { FLASH_MESSAGE } from '@/constants/flash-message';

export const addNewBuilding = validatedActionWithUser(
  buildingSchema,
  async (data): Promise<ActionResult<TBuiding>> => {
    try {
      const curses = await serverFetch<TBuiding>('/building', {
        method: 'POST',
        body: data,
      });

      revalidateTag('building');

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
  updateBuildingSchema,
  async (data): Promise<ActionResult<TBuiding>> => {
    const { id, title } = data;
    try {
      const building = await serverFetch<TBuiding>(`/building/${id}`, {
        method: 'PATCH',
        body: title,
      });

      revalidateTag('building');

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
export const deleteBuilding = async (
  id: string
): Promise<ActionResult<TBuiding>> => {
  try {
    const data = await serverFetch<TBuiding>(`/building/${id}`, {
      method: 'DELETE',
    });

    revalidateTag('building');
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

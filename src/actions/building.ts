'use server';

import { updateTag } from 'next/cache';
import { serverActionFetch } from '@/services/server-fetch';
import { TBuilding } from '@/types/global';
import { validatedActionWithUser } from '../lib/helper/action-helper';
import {
  buildingSchema,
  updateBuildingSchema,
} from '../lib/validation/building';
import { ApiResponseError } from '@/services/api-error';
import { ActionResult } from '../types/api-error';
import { FLASH_MESSAGE } from '@/constants/flash-message';

export const addNewBuilding = validatedActionWithUser(
  buildingSchema,
  async (data): Promise<ActionResult<TBuilding>> => {
    try {
      const curses = await serverActionFetch<TBuilding>('/building', {
        method: 'POST',
        body: data,
      });

      updateTag('buildings');

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
  },
);
export const updateBuilding = validatedActionWithUser(
  updateBuildingSchema,
  async (data): Promise<ActionResult<TBuilding>> => {
    const { id, title } = data;
    try {
      const building = await serverActionFetch<TBuilding>(`/building/${id}`, {
        method: 'PATCH',
        body: title,
      });

      updateTag('building');

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
  },
);
export const deleteBuilding = async (
  id: string,
): Promise<ActionResult<TBuilding>> => {
  try {
    const data = await serverActionFetch<TBuilding>(`/building/${id}`, {
      method: 'DELETE',
    });

    updateTag('building');
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

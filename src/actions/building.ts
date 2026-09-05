'use server';

import { updateTag } from 'next/cache';
import { serverActionFetch } from '@/services/server-fetch';
import { TBuilding } from '@/types/global';
import {
  actionWithUser,
  validatedActionWithUser,
} from '../lib/helper/action-helper';
import {
  buildingSchema,
  updateBuildingSchema,
} from '../lib/validation/building';
import { ApiResponseError } from '@/lib/errors/api-error';
import { ActionResult } from '../lib/errors/api-error.type';
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
          err instanceof Error ? err.message : FLASH_MESSAGE.SERVER_ERROR,
      };
    }
  },
  { action: 'create', subject: 'building' },
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
          err instanceof Error ? err.message : FLASH_MESSAGE.SERVER_ERROR,
      };
    }
  },
  { action: 'update', subject: 'AcademicFaculty' },
);
export const deleteBuilding = actionWithUser(
  async (id: string): Promise<ActionResult<TBuilding>> => {
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
          error instanceof Error ? error.message : FLASH_MESSAGE.SERVER_ERROR,
      };
    }
  },
  { action: 'delete', subject: 'building' },
);

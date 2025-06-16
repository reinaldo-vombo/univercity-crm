'use server';

import { revalidateTag } from 'next/cache';
import { serverFetch } from '../helper/api/server-fetch';
import { TDepartemant } from '../types/global';
import { validatedActionWithUser } from '../helper/action-helper';
import { departmentSchema } from '../validation/departement';
import { ActionResult } from '../types/api-error';
import { ApiResponseError } from '../helper/api/api-error';
import { FLASH_MESSAGE } from '@/constants/flash-message';

export const addNewDepartemant = validatedActionWithUser(
  departmentSchema,
  async (data): Promise<ActionResult<TDepartemant>> => {
    try {
      const departements = await serverFetch<TDepartemant>(
        '/academic-department',
        {
          method: 'POST',
          body: data,
        }
      );

      revalidateTag('departement');

      return {
        error: false,
        data: departements,
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
export const updatedDepartemant = validatedActionWithUser(
  departmentSchema,
  async (data): Promise<ActionResult<TDepartemant>> => {
    try {
      const { id, ...updateData } = data; // Remove `id` from request body

      const departmentId = id;
      const departements = await serverFetch<TDepartemant>(
        `/academic-department/${departmentId}`,
        {
          method: 'PATCH',
          body: updateData,
        }
      );

      revalidateTag('departement');

      return {
        error: false,
        data: departements,
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

'use server';

import { updateTag } from 'next/cache';
import { serverActionFetch } from '@/services/server-fetch';
import { TDepartemant } from '../types/global';
import { validatedActionWithUser } from '../lib/helper/action-helper';
import {
  departmentSchema,
  updateDepartmentSchema,
} from '../lib/validation/departement';
import { ActionResult } from '../types/api-error';
import { ApiResponseError } from '@/services/api-error';
import { FLASH_MESSAGE } from '@/constants/flash-message';

export const addNewDepartemant = validatedActionWithUser(
  departmentSchema,
  async (data, _, user): Promise<ActionResult<TDepartemant>> => {
    try {
      const departements = await serverActionFetch<TDepartemant>(
        `/academic-department?name=${user.name}`,
        {
          method: 'POST',
          body: data,
        },
      );

      updateTag('departements');

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
  },
);
export const updatedDepartemant = validatedActionWithUser(
  updateDepartmentSchema,
  async (data): Promise<ActionResult<TDepartemant>> => {
    try {
      const { id, ...updateData } = data;
      const departements = await serverActionFetch<TDepartemant>(
        `/academic-department/${id}`,
        {
          method: 'PATCH',
          body: updateData,
        },
      );

      updateTag('departements');

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
  },
);

export const deleteDepartment = async (
  id: string,
): Promise<ActionResult<TDepartemant>> => {
  try {
    const data = await serverActionFetch<TDepartemant>(
      `/academic-department/${id}`,
      {
        method: 'DELETE',
      },
    );

    updateTag('departements');
    return {
      error: false,
      data,
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      return {
        error: true,
        message: error.message,
        errorMessages: error.errorMessages,
        meta: error.meta,
      };
    }

    return {
      error: true,
      message:
        error instanceof Error ? error.message : FLASH_MESSAGE.UNESPECTED_ERROR,
    };
  }
};

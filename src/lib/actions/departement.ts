'use server';

import { revalidateTag } from 'next/cache';
import { serverFetch } from '@/services/server-fetch';
import { TDepartemant } from '../../types/global';
import { validatedActionWithUser } from '../helper/action-helper';
import {
  departmentSchema,
  updateDepartmentSchema,
} from '../validation/departement';
import { ActionResult } from '../../types/api-error';
import { ApiResponseError } from '@/services/api-error';
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
  updateDepartmentSchema,
  async (data): Promise<ActionResult<TDepartemant>> => {
    try {
      const { id, ...updateData } = data;
      const departements = await serverFetch<TDepartemant>(
        `/academic-department/${id}`,
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

export const deleteDepartment = async (
  id: string
): Promise<ActionResult<TDepartemant>> => {
  try {
    const data = await serverFetch<TDepartemant>(`/academic-department/${id}`, {
      method: 'DELETE',
    });

    revalidateTag('departement');
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

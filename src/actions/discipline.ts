'use server';

import { revalidateTag } from 'next/cache';
import { serverFetch } from '@/services/server-fetch';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import {
  validatedActionWithUser,
  validatedActionWithUserJson,
} from '../lib/helper/action-helper';
import { ApiResponseError } from '@/services/api-error';
import { ActionResult } from '../types/api-error';
import { TDiscipline } from '../types/global';
import {
  bulkDisciplineSchema,
  updateDisciplineSchema,
} from '../lib/validation/discipline';

export const addNewDiscipline = validatedActionWithUserJson(
  bulkDisciplineSchema,
  async (data, _, user): Promise<ActionResult<TDiscipline>> => {
    try {
      const discipline = await serverFetch<TDiscipline>(
        `/discipline?name=${user.name}`,
        {
          method: 'POST',
          body: data,
        }
      );

      revalidateTag('discipline');

      return {
        error: false,
        data: discipline,
      };
    } catch (err) {
      if (err instanceof ApiResponseError) {
        console.error(err.message);

        return {
          error: true,
          message: err.message,
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
export const updateDiscipline = validatedActionWithUser(
  updateDisciplineSchema,
  async (data): Promise<ActionResult<TDiscipline>> => {
    const { id, ...updateData } = data;
    try {
      const discipline = await serverFetch<TDiscipline>(`/discipline/${id}`, {
        method: 'PATCH',
        body: updateData,
      });

      revalidateTag('discipline');

      return {
        error: false,
        data: discipline,
      };
    } catch (err) {
      if (err instanceof ApiResponseError) {
        return {
          error: true,
          message: err.message,
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

export const deleteDiscipline = async (
  id: string
): Promise<ActionResult<TDiscipline>> => {
  try {
    const data = await serverFetch<TDiscipline>(`/discipline/${id}`, {
      method: 'DELETE',
    });

    revalidateTag('discipline');
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

'use server';

import { revalidateTag } from 'next/cache';
import { serverFetch } from '../helper/api/server-fetch';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { validatedActionWithUser } from '../helper/action-helper';
import { ApiResponseError } from '../helper/api/api-error';
import { ActionResult } from '../types/api-error';
import { TDiscipline } from '../types/global';
import {
  disciplineSchema,
  updateDisciplineSchema,
} from '../validation/discipline';

export const addNewDiscipline = validatedActionWithUser(
  disciplineSchema,
  async (data): Promise<ActionResult<TDiscipline>> => {
    try {
      const curses = await serverFetch<TDiscipline>('/discipline', {
        method: 'POST',
        body: data,
      });

      revalidateTag('discipline');

      return {
        error: false,
        data: curses,
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
      const curses = await serverFetch<TDiscipline>(`/discipline/${id}`, {
        method: 'PATCH',
        body: updateData,
      });

      revalidateTag('discipline');

      return {
        error: false,
        data: curses,
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

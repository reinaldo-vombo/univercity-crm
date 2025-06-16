'use server';

import { FLASH_MESSAGE } from '@/constants/flash-message';
import { ApiResponseError } from '../helper/api/api-error';
import { revalidateTag } from 'next/cache';
import { serverFetch } from '../helper/api/server-fetch';
import { TAdmitionExame } from '../types/global';
import { validatedActionWithUser } from '../helper/action-helper';
import { ActionResult } from '../types/api-error';
import { admitionExameSchema } from '../validation/adnition-exame';

export const updateAdmitionExame = validatedActionWithUser(
  admitionExameSchema,
  async (data): Promise<ActionResult<TAdmitionExame>> => {
    try {
      const exames = await serverFetch<TAdmitionExame>('/admission-exame', {
        method: 'PUT',
        body: data,
      });

      revalidateTag('admitionExame');

      return {
        error: false,
        data: exames,
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
): Promise<ActionResult<TAdmitionExame>> => {
  try {
    const data = await serverFetch<TAdmitionExame>(`/admission-exame/${id}`, {
      method: 'DELETE',
    });

    revalidateTag('admitionExame');
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

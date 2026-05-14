'use server';

import { updateTag } from 'next/cache';
import { serverActionFetch } from '@/services/server-fetch';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { validatedActionWithUser } from '../lib/helper/action-helper';
import { ApiResponseError } from '@/services/api-error';
import { ActionResult } from '../types/api-error';
import { TCoursePrice } from '../types/global';
import { createpriceSchema, UpdatePriceSchema } from '../lib/validation/price';

export const addNewPrice = validatedActionWithUser(
  createpriceSchema,
  async (data): Promise<ActionResult<TCoursePrice>> => {
    try {
      const price = await serverActionFetch<TCoursePrice>(`/prices`, {
        method: 'POST',
        body: data,
      });

      updateTag('prices');

      return {
        error: false,
        data: price,
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
  },
);
export const updatePrice = validatedActionWithUser(
  UpdatePriceSchema,
  async (data): Promise<ActionResult<TCoursePrice>> => {
    try {
      const curses = await serverActionFetch<TCoursePrice>(
        `/prices/${data.id}`,
        {
          method: 'PATCH',
          body: data,
        },
      );

      updateTag('price');

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
  },
);

export const deletePrice = async (
  id: string,
): Promise<ActionResult<TCoursePrice>> => {
  try {
    const data = await serverActionFetch<TCoursePrice>(`/prices/${id}`, {
      method: 'DELETE',
    });

    updateTag('price');
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

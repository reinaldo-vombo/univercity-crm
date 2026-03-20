'use server';
import { revalidateTag } from 'next/cache';
import { serverFetch } from '@/services/server-fetch';
import { validatedActionWithUser } from '../lib/helper/action-helper';
import { requestCourseTransferZodSchema } from '../lib/validation/secretary';
import { ApiResponseError } from '@/services/api-error';
import { ActionResult } from '../types/api-error';
import { FLASH_MESSAGE } from '@/constants/flash-message';

export const handleCourseTransferReuest = validatedActionWithUser(
  requestCourseTransferZodSchema,
  async (data): Promise<ActionResult<null>> => {
    try {
      const curses = await serverFetch<null>('/secretary', {
        method: 'POST',
        body: data,
      });

      revalidateTag('secretary');

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

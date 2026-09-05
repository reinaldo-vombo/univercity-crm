'use server';

import { FLASH_MESSAGE } from '@/constants/flash-message';
import { ApiResponseError } from '@/lib/errors/api-error';
import { updateTag } from 'next/cache';
import { serverActionFetch } from '@/services/server-fetch';
import { validatedActionWithUserJson } from '../lib/helper/action-helper';
import { ActionResult } from '../lib/errors/api-error.type';
import { updateBulkRetakeSchema } from '@/lib/validation/retake';
import { TRetakeAta } from '@/types/global';

export const updateBulkRetake = validatedActionWithUserJson(
  updateBulkRetakeSchema,
  async (data): Promise<ActionResult<TRetakeAta>> => {
    try {
      const exames = await serverActionFetch<TRetakeAta>(
        `/retake//bulk-update/section`,
        {
          method: 'PATCH',
          body: data,
        },
      );

      updateTag('retake-exame');

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
          err instanceof Error ? err.message : FLASH_MESSAGE.SERVER_ERROR,
      };
    }
  },
  { action: 'update', subject: 'Retake' },
);

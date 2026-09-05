'use server';

import { FLASH_MESSAGE } from '@/constants/flash-message';
import { validatedActionWithUser } from '@/lib/helper/action-helper';
import { createMenssageSchema } from '@/lib/validation/menssage';
import { ApiResponseError } from '@/lib/errors/api-error';
import { serverActionFetch } from '@/services/server-fetch';
import { ActionResult } from '@/lib/errors/api-error.type';
import { TMenssage } from '@/types/global';
import { updateTag } from 'next/cache';

export const sendeMenssage = validatedActionWithUser(
  createMenssageSchema,
  async (data, _, user): Promise<ActionResult<TMenssage>> => {
    const newBody = {
      senderName: user.name,
      ...data,
    };
    try {
      const menssage = await serverActionFetch<TMenssage>(
        `/menssage/${data.type}`,
        {
          method: 'POST',
          body: newBody,
        },
      );

      updateTag('menssage');

      return {
        error: false,
        data: menssage,
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
);

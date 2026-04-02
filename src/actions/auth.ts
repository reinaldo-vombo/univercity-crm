'use server';

import { FLASH_MESSAGE } from '@/constants/flash-message';
import { validatedAction } from '@/lib/helper/action-helper';
import { resetPasswordSchema } from '@/lib/validation/admin';
import { ApiResponseError } from '@/services/api-error';
import { serverFetch } from '@/services/server-fetch';
import { ActionResult, ActionState } from '@/types/api-error';

export const recoverPassword = async (
  data: string,
): Promise<ActionState<null>> => {
  try {
    await serverFetch<null>('/auth/recover-password', {
      method: 'POST',
      body: { email: data },
    });

    return {
      error: false,
      message: 'Verifique Sua Caixa De Correio',
      data: null,
    };
  } catch (err) {
    return {
      error: true,
      message:
        err instanceof Error ? err.message : FLASH_MESSAGE.UNESPECTED_ERROR,
    };
  }
};

export const resetPassword = validatedAction(
  resetPasswordSchema,
  async (data): Promise<ActionResult<null>> => {
    try {
      await serverFetch<null>('/auth/reset-password', {
        method: 'POST',
        body: data,
      });

      return {
        error: false,
        data: null,
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
export const unlockAccount = async (userId: string) => {
  try {
    await serverFetch<null>(`/auth/unlock/${userId}`, {
      method: 'POST',
      body: null,
    });

    return {
      error: false,
      data: null,
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
};

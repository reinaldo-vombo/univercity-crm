'use server';

import { serverEnv } from '@/config/env/server';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import ResetPassword from '@/lib/email/reset-password';
import { validatedAction } from '@/lib/helper/action-helper';
import { resetPasswordSchema } from '@/lib/validation/admin';
import { ApiResponseError } from '@/services/api-error';
import { serverActionFetch } from '@/services/server-fetch';
import { ActionResult, ActionState } from '@/types/api-error';
import { updateTag } from 'next/cache';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export const recoverPassword = async (
  data: string,
): Promise<ActionState<null>> => {
  try {
    await serverActionFetch<null>('/auth/recover-password', {
      method: 'POST',
      body: { email: data },
    });

    const { error } = await resend.emails.send({
      from: serverEnv.ONBORDING,
      to: ['delivered@resend.dev'],
      subject: 'Pedido de redefinição de senha',
      react: ResetPassword({}),
    });

    if (error) {
      return {
        error: true,
        message: 'Ocorreu um erro ao enviar email, por favor tente de novo',
      };
    }

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
      await serverActionFetch<null>('/auth/reset-password', {
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
export const unlockAccount = async (
  userId: string,
): Promise<ActionResult<null>> => {
  try {
    await serverActionFetch<null>(`/auth/unlock/${userId}`, {
      method: 'POST',
      body: null,
    });

    updateTag('locked-accounts');

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

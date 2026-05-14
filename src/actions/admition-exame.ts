'use server';

import { FLASH_MESSAGE } from '@/constants/flash-message';
import { ApiResponseError } from '@/services/api-error';
import { updateTag } from 'next/cache';
import { serverActionFetch } from '@/services/server-fetch';
import { TAdmitionExame } from '../types/global';
import { validatedActionWithUser } from '../lib/helper/action-helper';
import { ActionResult } from '../types/api-error';
import {
  admitionExameFaseSchema,
  admitionExameSchema,
  updateAdmitionExameFaseSchema,
} from '../lib/validation/adnition-exame';

export const updateAdmitionExame = validatedActionWithUser(
  admitionExameSchema,
  async (data): Promise<ActionResult<TAdmitionExame>> => {
    try {
      const exames = await serverActionFetch<TAdmitionExame>(
        `/admission-exame/${data.id}`,
        {
          method: 'PUT',
          body: data,
        },
      );

      updateTag('admitionExame');

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
  },
);
export const deleteAdmitionExame = async (
  id: string,
): Promise<ActionResult<TAdmitionExame>> => {
  try {
    const data = await serverActionFetch<TAdmitionExame>(
      `/admission-exame/${id}`,
      {
        method: 'DELETE',
      },
    );

    updateTag('admitionExame');
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

export const createAdmitionExameFase = validatedActionWithUser(
  admitionExameFaseSchema,
  async (data): Promise<ActionResult<TAdmitionExame>> => {
    try {
      const fases = await serverActionFetch<TAdmitionExame>(
        `/admission-exame/fases`,
        {
          method: 'POST',
          body: data,
        },
      );

      updateTag('admitionExameFase');

      return {
        error: false,
        data: fases,
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
export const updateAdmitionExameFase = validatedActionWithUser(
  updateAdmitionExameFaseSchema,
  async (data): Promise<ActionResult<TAdmitionExame>> => {
    const { id, ...res } = data;
    try {
      const fases = await serverActionFetch<TAdmitionExame>(
        `/admission-exame/fases/${id}`,
        {
          method: 'PATCH',
          body: res,
        },
      );

      updateTag('admitionExameFase');

      return {
        error: false,
        data: fases,
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
export const deleteAdmitionExameFase = async (
  id: number,
): Promise<ActionResult<TAdmitionExame>> => {
  try {
    const data = await serverActionFetch<TAdmitionExame>(
      `/admission-exame/fases/${id}`,
      {
        method: 'DELETE',
      },
    );

    updateTag('admitionExameFase');
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

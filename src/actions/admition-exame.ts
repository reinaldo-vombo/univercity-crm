'use server';

import { ApiResponseError } from '@/lib/errors/api-error';
import { updateTag } from 'next/cache';
import { serverActionFetch } from '@/services/server-fetch';
import { TAdmitionExame } from '../types/global';
import {
  validatedActionWithUser,
  validatedActionWithUserJson,
} from '../lib/helper/action-helper';
import { ActionResult } from '../lib/errors/api-error.type';
import {
  admitionExameFaseSchema,
  admitionExameSchema,
  updateAdmitionExameFaseSchema,
} from '../lib/validation/adnition-exame';
import { sendEmail } from '@/config/send-email';
import { render as Render } from '@react-email/render';
import { ExameAcessoAprovado } from '@/lib/email/exame-acesso-aprovado';
import { sendErrorToClient } from '@/lib/errors/send-error-to-client';
import { error } from 'console';

export const updateAdmitionExame = validatedActionWithUser(
  admitionExameSchema,
  async (data): Promise<ActionResult<TAdmitionExame>> => {
    try {
      const exames = await serverActionFetch<TAdmitionExame>(
        `/admission-exame/${data.id}`,
        {
          method: 'PATCH',
          body: data,
        },
      );
      const html = await Render(
        ExameAcessoAprovado({
          applicantName: exames.firstName,
          examId: exames.exameId,
        }),
      );

      updateTag('admitionExame');

      await sendEmail([exames.email], 'Resultado do exame de admissão', html);

      return {
        error: false,
        data: exames,
      };
    } catch (err) {
      if (err instanceof ApiResponseError) {
        return {
          error: true,
          message: sendErrorToClient(error),
          errorMessages: err.errorMessages,
          meta: err.meta,
        };
      }

      return {
        error: true,
        message: sendErrorToClient(error),
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
      message: sendErrorToClient(error),
    };
  }
};

export const createAdmitionExameFase = validatedActionWithUserJson(
  admitionExameFaseSchema,
  async (data): Promise<ActionResult<TAdmitionExame>> => {
    const { startDate, ...res } = data;

    try {
      const fases = await serverActionFetch<TAdmitionExame>(
        `/admission-exame/fases`,
        {
          method: 'POST',
          body: {
            ...res,
            startDate: startDate.date,
            startTime: startDate.time.start,
            endTime: startDate.time.end,
          },
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
          message: sendErrorToClient(err),
          errorMessages: err.errorMessages,
          meta: err.meta,
        };
      }

      return {
        error: true,
        message: sendErrorToClient(err),
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
          message: sendErrorToClient(error),
          errorMessages: err.errorMessages,
          meta: err.meta,
        };
      }

      return {
        error: true,
        message: sendErrorToClient(error),
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
      message: sendErrorToClient(error),
    };
  }
};

'use server';
import { ApiResponseError } from '@/lib/errors/api-error';
import { ActionResult } from '@/lib/errors/api-error.type';
import { sendErrorToClient } from '@/lib/errors/send-error-to-client';
import {
  actionWithUser,
  validatedActionWithUserJson,
} from '@/lib/helper/action-helper';
import { examStatementSchema } from '@/lib/validation/exame-statemant';
import { serverActionFetch } from '@/services/server-fetch';
import { ExamResult } from '@/types/global';
import { updateTag } from 'next/cache';

export const createExamStatement = validatedActionWithUserJson(
  examStatementSchema,
  async (data, _, user): Promise<ActionResult<ExamResult>> => {
    try {
      const examStatement = await serverActionFetch<ExamResult>(
        `/exame-statements/${user.id}`,
        {
          method: 'POST',
          body: data,
        },
      );

      updateTag('exame-statements');
      // updateTag('questions');

      return {
        error: false,
        data: examStatement,
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
  { action: 'create', subject: 'ExamStatement' },
);

export const updateExamStatement = validatedActionWithUserJson(
  examStatementSchema,
  async (data): Promise<ActionResult<ExamResult>> => {
    const { id, ...res } = data;

    try {
      const examStatement = await serverActionFetch<ExamResult>(
        `/exame-statements/${id}`,
        {
          method: 'PATCH',
          body: res,
        },
      );

      updateTag('exame-statements');

      return {
        error: false,
        data: examStatement,
      };
    } catch (err) {
      const error = sendErrorToClient(err);
      if (err instanceof ApiResponseError) {
        return {
          error: true,
          message: error,
          errorMessages: err.errorMessages,
          meta: err.meta,
        };
      }

      return {
        error: true,
        message: error,
      };
    }
  },
  { action: 'update', subject: 'ExamStatement' },
);

export const deleteExamStatement = actionWithUser(
  async (id: string): Promise<ActionResult<null>> => {
    try {
      const result = await serverActionFetch<any>(`/exame-statements/${id}`, {
        method: 'DELETE',
        body: null,
      });

      updateTag('exame-statements');

      return {
        error: false,
        data: result,
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
  { action: 'delete', subject: 'ExamStatement' },
);

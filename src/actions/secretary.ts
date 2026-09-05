'use server';
import { updateTag } from 'next/cache';
import { serverActionFetch } from '@/services/server-fetch';
import {
  actionWithUser,
  validatedActionWithUser,
  validatedActionWithUserJson,
} from '../lib/helper/action-helper';
import {
  academicServiceZodShema,
  createPeriodSchema,
  requestCourseTransferZodSchema,
  updateAcademicServiceZodShema,
} from '../lib/validation/secretary';
import { ApiResponseError } from '@/lib/errors/api-error';
import { ActionResult } from '../lib/errors/api-error.type';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { TAcademicService } from '@/types/global';

export const handleCourseTransferReuest = validatedActionWithUser(
  requestCourseTransferZodSchema,
  async (data): Promise<ActionResult<null>> => {
    const { studentId, toCourseId, reason } = data;
    try {
      const curses = await serverActionFetch<null>(
        `/secretary/requestCourseTransfer/${studentId}/${toCourseId}`,
        {
          method: 'POST',
          body: { reason },
        },
      );

      updateTag('request-transfer');

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
          err instanceof Error ? err.message : FLASH_MESSAGE.SERVER_ERROR,
      };
    }
  },
  { action: 'create', subject: 'Secretary' },
);
export const CreateServicePeriod = validatedActionWithUserJson(
  createPeriodSchema,
  async (data): Promise<ActionResult<null>> => {
    try {
      const curses = await serverActionFetch<null>('/secretary', {
        method: 'POST',
        body: data,
      });

      updateTag('secretary-services');

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
          err instanceof Error ? err.message : FLASH_MESSAGE.SERVER_ERROR,
      };
    }
  },
  { action: 'create', subject: 'Secretary' },
);

export const addAcademicService = validatedActionWithUser(
  academicServiceZodShema,
  async (data): Promise<ActionResult<TAcademicService[]>> => {
    try {
      const account = await serverActionFetch<TAcademicService[]>(
        '/academic-service',
        {
          method: 'POST',
          body: data,
        },
      );

      updateTag('academic-service');

      return {
        error: false,
        data: account,
      };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';

      return {
        error: true,
        message,
      };
    }
  },
  { action: 'create', subject: 'Secretary' },
);
export const updateAcademicService = validatedActionWithUser(
  updateAcademicServiceZodShema,
  async (data): Promise<ActionResult<TAcademicService[]>> => {
    const { id, ...res } = data;
    try {
      const account = await serverActionFetch<TAcademicService[]>(
        `/academic-service/${id}`,
        {
          method: 'PATCH',
          body: res,
        },
      );

      updateTag('academic-service');

      return {
        error: false,
        data: account,
      };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';

      return {
        error: true,
        message,
      };
    }
  },
  { action: 'update', subject: 'Secretary' },
);

export const deleteAcademicService = actionWithUser(
  async (id: string): Promise<ActionResult<TAcademicService>> => {
    try {
      const data = await serverActionFetch<TAcademicService>(
        `/academic-service/${id}`,
        {
          method: 'DELETE',
        },
      );

      updateTag('academic-service');
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
          error instanceof Error ? error.message : FLASH_MESSAGE.SERVER_ERROR,
      };
    }
  },
  { action: 'delete', subject: 'Secretary' },
);

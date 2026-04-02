'use server';

import { revalidateTag } from 'next/cache';
import { serverFetch } from '@/services/server-fetch';
import { validatedActionWithUser } from '../lib/helper/action-helper';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { ActionResult } from '../types/api-error';
import { TAcademicService } from '../types/global';
import { ApiResponseError } from '@/services/api-error';
import {
  academicServiceZodShema,
  updateAcademicServiceZodShema,
} from '@/lib/validation/secretary';

export const addAcademicService = validatedActionWithUser(
  academicServiceZodShema,
  async (data): Promise<ActionResult<TAcademicService[]>> => {
    try {
      const account = await serverFetch<TAcademicService[]>(
        '/academic-service',
        {
          method: 'POST',
          body: data,
        },
      );

      revalidateTag('academic-service');

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
);
export const updateAcademicService = validatedActionWithUser(
  updateAcademicServiceZodShema,
  async (data): Promise<ActionResult<TAcademicService[]>> => {
    const { id, ...res } = data;
    try {
      const account = await serverFetch<TAcademicService[]>(
        `/academic-service/${id}`,
        {
          method: 'PATCH',
          body: res,
        },
      );

      revalidateTag('academic-service');

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
);

export const deleteAcademicService = async (
  id: string,
): Promise<ActionResult<TAcademicService>> => {
  try {
    const data = await serverFetch<TAcademicService>(
      `/academic-service/${id}`,
      {
        method: 'DELETE',
      },
    );

    revalidateTag('academic-service');
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

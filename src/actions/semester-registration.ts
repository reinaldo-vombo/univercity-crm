'use server';

import { FLASH_MESSAGE } from '@/constants/flash-message';
import { ApiResponseError } from '@/services/api-error';
import { serverActionFetch } from '@/services/server-fetch';
import { ActionResult } from '@/types/api-error';
import { TSemesterRegistration } from '@/types/global';
import { updateTag } from 'next/cache';

export const addNewSemesterRegistartion = async (
  data: any,
): Promise<ActionResult<TSemesterRegistration>> => {
  try {
    const semester = await serverActionFetch<TSemesterRegistration>(
      '/semester-registration',
      {
        method: 'POST',
        body: data,
      },
    );

    updateTag('semester-registration');

    return {
      error: false,
      data: semester,
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

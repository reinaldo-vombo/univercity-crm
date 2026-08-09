'use server';

import { updateTag } from 'next/cache';
import { serverActionFetch } from '@/services/server-fetch';
import { TSemester } from '../types/global';
import { ApiResponseError } from '@/lib/errors/api-error';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { ActionResult } from '../lib/errors/api-error.type';
import { serverUser } from '@/lib/helper/auth/user';

export const addNewSemester = async (
  data: any,
): Promise<ActionResult<TSemester>> => {
  try {
    const semester = await serverActionFetch<TSemester>('/academic-semester', {
      method: 'POST',
      body: data,
    });

    updateTag('semester');

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
      message: err instanceof Error ? err.message : FLASH_MESSAGE.SERVER_ERROR,
    };
  }
};

export const updatedSemester = async (
  data: TSemester,
): Promise<ActionResult<TSemester>> => {
  try {
    const user = await serverUser();
    if (!user) {
      return {
        error: true,
        message: FLASH_MESSAGE.UNAUTHORIZED,
      };
    }
    const semester = await serverActionFetch<TSemester>(
      `/academic-semester/${data.id}`,
      {
        method: 'PATCH',
        body: data,
      },
    );

    updateTag('semester');

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
      message: err instanceof Error ? err.message : FLASH_MESSAGE.SERVER_ERROR,
    };
  }
};
export const deleteSemester = async (
  id: string,
): Promise<ActionResult<TSemester>> => {
  try {
    const data = await serverActionFetch<TSemester>(
      `/academic-semester/${id}`,
      {
        method: 'DELETE',
      },
    );

    updateTag('semester');
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
};

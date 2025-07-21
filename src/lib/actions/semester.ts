'use server';

import { revalidateTag } from 'next/cache';
import { serverFetch } from '@/services/server-fetch';
import { TSemester } from '../../types/global';
import { validatedActionWithUser } from '../helper/action-helper';
import { semesterSchema } from '../validation/semester';
import { ApiResponseError } from '@/services/api-error';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { ActionResult } from '../../types/api-error';

export const addNewSemester = validatedActionWithUser(
  semesterSchema,
  async (data): Promise<ActionResult<TSemester>> => {
    console.log('data', data);

    try {
      const semester = await serverFetch<TSemester>('/academic-semester', {
        method: 'POST',
        body: data,
      });

      revalidateTag('semester');

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
  }
);
export const updatedSemester = validatedActionWithUser(
  semesterSchema,
  async (data, _, user): Promise<ActionResult<TSemester>> => {
    try {
      const semester = await serverFetch<TSemester>(
        `/academic-semester/${user.id}`,
        {
          method: 'PATCH',
          body: data,
        }
      );

      revalidateTag('semester');

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
  }
);
export const deleteSemester = async (
  id: string
): Promise<ActionResult<TSemester>> => {
  try {
    const data = await serverFetch<TSemester>(`/academic-semester/${id}`, {
      method: 'DELETE',
    });

    revalidateTag('semester');
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

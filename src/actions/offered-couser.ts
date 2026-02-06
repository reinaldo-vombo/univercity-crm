'use server';

import { FLASH_MESSAGE } from '@/constants/flash-message';
import {
  validatedActionWithUser,
  validatedActionWithUserJson,
} from '@/lib/helper/action-helper';
import {
  createOfferedCourseBatchSchema,
  updateOfferedCourseZodSchema,
} from '@/lib/validation/offered-course';
import { ApiResponseError } from '@/services/api-error';
import { serverFetch } from '@/services/server-fetch';
import { ActionResult } from '@/types/api-error';
import { TOfferedCourse } from '@/types/global';
import { revalidateTag } from 'next/cache';

export const addNewOfferedCourse = validatedActionWithUserJson(
  createOfferedCourseBatchSchema,
  async (data): Promise<ActionResult<TOfferedCourse>> => {
    try {
      const course = await serverFetch<TOfferedCourse>('/offered-course', {
        method: 'POST',
        body: data,
      });

      revalidateTag('offered-course');

      return {
        error: false,
        data: course,
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
export const updateOfferedCourse = validatedActionWithUser(
  updateOfferedCourseZodSchema,
  async (data): Promise<ActionResult<TOfferedCourse>> => {
    try {
      const course = await serverFetch<TOfferedCourse>(
        `/offered-course/${data.id}`,
        {
          method: 'PATCH',
          body: data,
        },
      );

      revalidateTag('offered-course');

      return {
        error: false,
        data: course,
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
export const DeleteOfferedCourse = async (
  id: string,
): Promise<ActionResult<TOfferedCourse>> => {
  console.log(id);

  try {
    const data = await serverFetch<TOfferedCourse>(`/offered-course/${id}`, {
      method: 'DELETE',
    });

    revalidateTag('offered-course');
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

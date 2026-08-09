'use server';

import { FLASH_MESSAGE } from '@/constants/flash-message';
import { validatedActionWithUser } from '@/lib/helper/action-helper';
import {
  createOfferedCourseSectionZodSchema,
  updateOfferedCourseSectionZodSchema,
} from '@/lib/validation/offered-course';
import { ApiResponseError } from '@/lib/errors/api-error';
import { serverActionFetch } from '@/services/server-fetch';
import { ActionResult } from '@/lib/errors/api-error.type';
import { TOfferedCourseSection } from '@/types/global';
import { updateTag } from 'next/cache';

export const addNewOfferedCourseSection = validatedActionWithUser(
  createOfferedCourseSectionZodSchema,
  async (data): Promise<ActionResult<TOfferedCourseSection>> => {
    try {
      const course = await serverActionFetch<TOfferedCourseSection>(
        '/offered-course-section',
        {
          method: 'POST',
          body: data,
        },
      );

      updateTag('offered-course-section');

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
          err instanceof Error ? err.message : FLASH_MESSAGE.SERVER_ERROR,
      };
    }
  },
);
export const updateOfferedCourseSection = validatedActionWithUser(
  updateOfferedCourseSectionZodSchema,
  async (data): Promise<ActionResult<TOfferedCourseSection>> => {
    const { id, ...rest } = data;
    const body = {
      ...rest,
      classSchedules: [],
    };
    try {
      const course = await serverActionFetch<TOfferedCourseSection>(
        `/offered-course-section/${id}`,
        {
          method: 'PATCH',
          body,
        },
      );

      updateTag('offered-course-section');

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
          err instanceof Error ? err.message : FLASH_MESSAGE.SERVER_ERROR,
      };
    }
  },
);
export const DeleteOfferedCourseSection = async (
  id: string,
): Promise<ActionResult<TOfferedCourseSection>> => {
  try {
    const data = await serverActionFetch<TOfferedCourseSection>(
      `/offered-course-section/${id}`,
      {
        method: 'DELETE',
      },
    );

    updateTag('offered-course-section');
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

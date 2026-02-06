'use server';

import { FLASH_MESSAGE } from '@/constants/flash-message';
import { validatedActionWithUserJson } from '@/lib/helper/action-helper';
import { createScheduleSchema } from '@/lib/validation/class-schedule';
import { ApiResponseError } from '@/services/api-error';
import { serverFetch } from '@/services/server-fetch';
import { ActionResult } from '@/types/api-error';
import { TClassShedule } from '@/types/global';
import { revalidateTag } from 'next/cache';

export const addNewOfferedCourseClassSchedule = validatedActionWithUserJson(
  createScheduleSchema,
  async (data): Promise<ActionResult<TClassShedule>> => {
    try {
      const course = await serverFetch<TClassShedule>(
        '/offered-course-class-schedule',
        {
          method: 'POST',
          body: data,
        },
      );

      revalidateTag('offered-course-class-schedule');

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

export const DeleteOfferedCourseSchedule = async (
  id: string,
): Promise<ActionResult<TClassShedule>> => {
  try {
    const data = await serverFetch<TClassShedule>(
      `/offered-course-class-schedule/${id}`,
      {
        method: 'DELETE',
      },
    );

    revalidateTag('offered-course-section');
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
export const DeleteOfferedCourseScheduleByDiscipline = async (
  sectionId: string,
  disciplineId: string,
): Promise<ActionResult<TClassShedule>> => {
  try {
    const data = await serverFetch<TClassShedule>(
      `/offered-course-class-schedule/section/${sectionId}/discipline/${disciplineId}`,
      {
        method: 'DELETE',
      },
    );

    revalidateTag('offered-course-section');
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

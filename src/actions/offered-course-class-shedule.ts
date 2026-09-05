'use server';

import { FLASH_MESSAGE } from '@/constants/flash-message';
import {
  actionWithUser,
  validatedActionWithUserJson,
} from '@/lib/helper/action-helper';
import { createScheduleSchema } from '@/lib/validation/class-schedule';
import { ApiResponseError } from '@/lib/errors/api-error';
import { serverActionFetch } from '@/services/server-fetch';
import { ActionResult } from '@/lib/errors/api-error.type';
import { TClassShedule } from '@/types/global';
import { updateTag } from 'next/cache';

export const addNewOfferedCourseClassSchedule = validatedActionWithUserJson(
  createScheduleSchema,
  async (data): Promise<ActionResult<TClassShedule>> => {
    try {
      const course = await serverActionFetch<TClassShedule>(
        '/offered-course-class-schedule',
        {
          method: 'POST',
          body: data,
        },
      );

      updateTag('offered-course-class-schedule');

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
  { action: 'create', subject: 'OfferedCourseClassScheudule' },
);

export const DeleteOfferedCourseSchedule = actionWithUser(
  async (id: string): Promise<ActionResult<TClassShedule>> => {
    try {
      const data = await serverActionFetch<TClassShedule>(
        `/offered-course-class-schedule/${id}`,
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
  },
  { action: 'create', subject: 'OfferedCourseClassScheudule' },
);
export const DeleteOfferedCourseScheduleByDiscipline = async (
  sectionId: string,
  disciplineId: string,
): Promise<ActionResult<TClassShedule>> => {
  try {
    const data = await serverActionFetch<TClassShedule>(
      `/offered-course-class-schedule/section/${sectionId}/discipline/${disciplineId}`,
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

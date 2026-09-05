'use server';

import { FLASH_MESSAGE } from '@/constants/flash-message';
import {
  actionWithUser,
  validatedActionWithUser,
  validatedActionWithUserJson,
} from '@/lib/helper/action-helper';
import {
  autoGenerateOfferedSchema,
  updateOfferedCourseZodSchema,
} from '@/lib/validation/offered-course';
import { ApiResponseError } from '@/lib/errors/api-error';
import { serverActionFetch } from '@/services/server-fetch';
import { ActionResult } from '@/lib/errors/api-error.type';
import { TOfferedCourse } from '@/types/global';
import { updateTag } from 'next/cache';

export const addNewOfferedCourse = validatedActionWithUserJson(
  autoGenerateOfferedSchema,
  async (data): Promise<ActionResult<TOfferedCourse>> => {
    try {
      const course = await serverActionFetch<TOfferedCourse>(
        `/offered-course/auto-generate/${data.semesterRegistrationId}`,
        {
          method: 'POST',
          body: data,
        },
      );

      updateTag('offered-course');

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
  { action: 'create', subject: 'OfferedCourse' },
);

export const updateOfferedCourse = validatedActionWithUser(
  updateOfferedCourseZodSchema,
  async (data): Promise<ActionResult<TOfferedCourse>> => {
    try {
      const course = await serverActionFetch<TOfferedCourse>(
        `/offered-course/${data.id}`,
        {
          method: 'PATCH',
          body: data,
        },
      );

      updateTag('offered-course');

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
  { action: 'update', subject: 'OfferedCourse' },
);

export const DeleteOfferedCourse = actionWithUser(
  async (id: string): Promise<ActionResult<TOfferedCourse>> => {
    try {
      const data = await serverActionFetch<TOfferedCourse>(
        `/offered-course/${id}`,
        {
          method: 'DELETE',
        },
      );

      updateTag('offered-course');
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
  { action: 'delete', subject: 'OfferedCourse' },
);

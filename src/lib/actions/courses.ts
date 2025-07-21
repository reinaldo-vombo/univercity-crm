'use server';

import { revalidateTag } from 'next/cache';
import { serverFetch } from '@/services/server-fetch';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { validatedActionWithUser } from '../helper/action-helper';
import { ApiResponseError } from '@/services/api-error';
import { ActionResult } from '../../types/api-error';
import {
  assignRemoveFacultiesSchema,
  courseSchema,
  updateCourseSchema,
} from '../validation/curses';
import { TCourse } from '../../types/global';

export const addNewCourse = validatedActionWithUser(
  courseSchema,
  async (data): Promise<ActionResult<TCourse>> => {
    try {
      const curses = await serverFetch<TCourse>('/course', {
        method: 'POST',
        body: data,
      });

      revalidateTag('curse');

      return {
        error: false,
        data: curses,
      };
    } catch (err) {
      if (err instanceof ApiResponseError) {
        console.error(err.message);

        return {
          error: true,
          message: err.message,
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
export const updateCourse = validatedActionWithUser(
  updateCourseSchema,
  async (data): Promise<ActionResult<TCourse>> => {
    const { id, ...updateData } = data;
    try {
      const curses = await serverFetch<TCourse>(`/course/${id}`, {
        method: 'PATCH',
        body: updateData,
      });

      revalidateTag('curse');

      return {
        error: false,
        data: curses,
      };
    } catch (err) {
      if (err instanceof ApiResponseError) {
        return {
          error: true,
          message: err.message,
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
export const assignFaculties = validatedActionWithUser(
  assignRemoveFacultiesSchema,
  async (data): Promise<ActionResult<TCourse>> => {
    const { id, ...updateData } = data;
    console.log('updateData', updateData.faculties);

    try {
      const curses = await serverFetch<TCourse>(`/assign-faculties/${id}`, {
        method: 'POST',
        body: updateData.faculties,
      });

      revalidateTag('curse');

      return {
        error: false,
        data: curses,
      };
    } catch (err) {
      if (err instanceof ApiResponseError) {
        console.log('err.message', err.message);
        return {
          error: true,
          message: err.message,
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

export const deleteCourse = async (
  id: string
): Promise<ActionResult<TCourse>> => {
  try {
    const data = await serverFetch<TCourse>(`/course/${id}`, {
      method: 'DELETE',
    });

    revalidateTag('curse');
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

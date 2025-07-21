'use server';

import { revalidateTag } from 'next/cache';
import { serverFetch } from '@/services/server-fetch';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { validatedActionWithUser } from '../helper/action-helper';
import { ApiResponseError } from '@/services/api-error';
import { ActionResult } from '../../types/api-error';
import { courseSchema, updateCourseSchema } from '../validation/curses';
import { TDiscipline } from '../../types/global';

export const addNewEvent = validatedActionWithUser(
  courseSchema,
  async (data): Promise<ActionResult<TDiscipline>> => {
    try {
      const curses = await serverFetch<TDiscipline>('/events', {
        method: 'POST',
        body: data,
      });

      revalidateTag('events');

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
export const updateEvent = validatedActionWithUser(
  updateCourseSchema,
  async (data): Promise<ActionResult<TDiscipline>> => {
    const { id, ...updateData } = data;
    try {
      const curses = await serverFetch<TDiscipline>(`/events/${id}`, {
        method: 'PATCH',
        body: updateData,
      });

      revalidateTag('events');

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

export const deleteEvent = async (
  id: string
): Promise<ActionResult<TDiscipline>> => {
  try {
    const data = await serverFetch<TDiscipline>(`/events/${id}`, {
      method: 'DELETE',
    });

    revalidateTag('events');
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

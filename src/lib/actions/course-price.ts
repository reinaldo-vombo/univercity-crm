'use server';

import { revalidateTag } from 'next/cache';
import { serverFetch } from '@/services/server-fetch';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { validatedActionWithUser } from '../helper/action-helper';
import { ApiResponseError } from '@/services/api-error';
import { ActionResult } from '../../types/api-error';
import { TCoursePrice } from '../../types/global';
import {
  coursePriceSchema,
  updateCoursePriceSchema,
} from '../validation/coursePrice';

export const addNewCoursePrice = validatedActionWithUser(
  coursePriceSchema,
  async (data): Promise<ActionResult<TCoursePrice>> => {
    const { courseId, price } = data;
    const covertePrice = Number(price);
    const newbody = {
      courseId,
      price: covertePrice,
    };

    try {
      const curses = await serverFetch<TCoursePrice>('/course-price', {
        method: 'POST',
        body: newbody,
      });

      revalidateTag('coursePrice');

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
export const updateCoursePrice = validatedActionWithUser(
  updateCoursePriceSchema,
  async (data): Promise<ActionResult<TCoursePrice>> => {
    const { courseId, id, price } = data;
    const covertePrice = Number(price);
    const newBody = {
      courseId,
      price: covertePrice,
    };
    try {
      const curses = await serverFetch<TCoursePrice>(`/course-price/${id}`, {
        method: 'PATCH',
        body: newBody,
      });

      revalidateTag('coursePrice');

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

export const deleteCoursePrice = async (
  id: string
): Promise<ActionResult<TCoursePrice>> => {
  try {
    const data = await serverFetch<TCoursePrice>(`/course-price/${id}`, {
      method: 'DELETE',
    });

    revalidateTag('coursePrice');
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

'use server';

import { revalidateTag } from 'next/cache';
import { serverFetch } from '../helper/api/server-fetch';
import { validatedActionWithUser } from '../helper/action-helper';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { ActionResult } from '../types/api-error';
import { TAcademicFaculty } from '../types/global';
import { ApiResponseError } from '../helper/api/api-error';
import {
  academicFacultyacultySchema,
  updateAcademicFacultyacultySchema,
} from '../validation/academicFaculty';

export const addNewAcademicFaculty = validatedActionWithUser(
  academicFacultyacultySchema,
  async (data): Promise<ActionResult<TAcademicFaculty>> => {
    try {
      const curses = await serverFetch<TAcademicFaculty>('/academic-faculty', {
        method: 'POST',
        body: data,
      });

      revalidateTag('faculty');

      return {
        error: false,
        data: curses,
      };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';

      return {
        error: true,
        message,
      };
    }
  }
);
export const updateAcademicFaculty = validatedActionWithUser(
  updateAcademicFacultyacultySchema,
  async (data): Promise<ActionResult<TAcademicFaculty>> => {
    try {
      const curses = await serverFetch<TAcademicFaculty>(
        `/academic-faculty/${data.id}`,
        {
          method: 'PATCH',
          body: data,
        }
      );

      revalidateTag('faculty');

      return {
        error: false,
        data: curses,
      };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';

      return {
        error: true,
        message,
      };
    }
  }
);

export const deleteFaculty = async (
  id: string
): Promise<ActionResult<TAcademicFaculty>> => {
  try {
    const data = await serverFetch<TAcademicFaculty>(
      `/academic-faculty/${id}`,
      {
        method: 'DELETE',
      }
    );

    revalidateTag('faculty');
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

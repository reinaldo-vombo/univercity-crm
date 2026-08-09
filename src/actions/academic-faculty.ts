'use server';
import { serverActionFetch } from '@/services/server-fetch';
import { validatedActionWithUser } from '../lib/helper/action-helper';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { ActionResult } from '../lib/errors/api-error.type';
import { TAcademicFaculty } from '../types/global';
import { ApiResponseError } from '@/lib/errors/api-error';
import {
  academicFacultyacultySchema,
  updateAcademicFacultyacultySchema,
} from '../lib/validation/academicFaculty';
import { updateTag } from 'next/cache';

export const addNewAcademicFaculty = validatedActionWithUser(
  academicFacultyacultySchema,
  async (data): Promise<ActionResult<TAcademicFaculty>> => {
    try {
      const curses = await serverActionFetch<TAcademicFaculty>(
        '/academic-faculty',
        {
          method: 'POST',
          body: data,
        },
      );

      updateTag('faculty');

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
  },
);
export const updateAcademicFaculty = validatedActionWithUser(
  updateAcademicFacultyacultySchema,
  async (data): Promise<ActionResult<TAcademicFaculty>> => {
    try {
      const curses = await serverActionFetch<TAcademicFaculty>(
        `/academic-faculty/${data.id}`,
        {
          method: 'PATCH',
          body: data,
        },
      );

      updateTag('faculty');

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
  },
);

export const deleteFaculty = async (
  id: string,
): Promise<ActionResult<TAcademicFaculty>> => {
  try {
    const data = await serverActionFetch<TAcademicFaculty>(
      `/academic-faculty/${id}`,
      {
        method: 'DELETE',
      },
    );

    updateTag('faculty');
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

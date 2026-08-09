'use server';

import { updateTag } from 'next/cache';
import { serverActionFetch } from '@/services/server-fetch';
import { TFaculty, TFacultyDisciplines } from '../types/global';
import {
  validatedActionWithUser,
  validatedActionWithUserJson,
} from '../lib/helper/action-helper';
import { ActionResult } from '../lib/errors/api-error.type';
import { ApiResponseError } from '@/lib/errors/api-error';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import {
  assignFacultyToSectionDisciplinesSchema,
  facultySchema,
  updateFacultySchema,
} from '../lib/validation/faculty';
export const addNewFaculty = validatedActionWithUser(
  facultySchema,
  async (data, formData): Promise<ActionResult<TFaculty>> => {
    try {
      const facultys = await serverActionFetch<TFaculty>('/faculty', {
        method: 'POST',
        body: formData,
      });

      updateTag('facultys');

      return {
        error: false,
        data: facultys,
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
export const updatedFaculty = validatedActionWithUserJson(
  updateFacultySchema,
  async (data): Promise<ActionResult<TFaculty>> => {
    try {
      const { id, ...updateData } = data;
      const faculty = await serverActionFetch<TFaculty>(`/faculty/${id}`, {
        method: 'PATCH',
        body: updateData,
      });

      updateTag('faculty');

      return {
        error: false,
        data: faculty,
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

export const assingFacultyToDiscipline = validatedActionWithUserJson(
  assignFacultyToSectionDisciplinesSchema,
  async (data): Promise<ActionResult<TFacultyDisciplines>> => {
    try {
      const { offeredCourseSectionId, assignments } = data;

      const discipline = await serverActionFetch<TFacultyDisciplines>(
        `/faculty/assign-faculty-to-section/${offeredCourseSectionId}`,
        {
          method: 'POST',
          body: { assignments },
        },
      );

      // updateTag('discipline');

      return {
        error: false,
        data: discipline,
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

export const deleteFaculty = async (
  id: string,
): Promise<ActionResult<TFaculty>> => {
  try {
    const data = await serverActionFetch<TFaculty>(`/faculty/${id}`, {
      method: 'DELETE',
    });

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

'use server';

import { revalidateTag } from 'next/cache';
import { serverFetch } from '@/services/server-fetch';
import { TFaculty, TFacultyDisciplines } from '../types/global';
import {
  validatedActionWithUser,
  validatedActionWithUserJson,
} from '../lib/helper/action-helper';
import { ActionResult } from '../types/api-error';
import { ApiResponseError } from '@/services/api-error';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import {
  assignFacultyToSectionDisciplinesSchema,
  facultySchema,
  updateFacultySchema,
} from '../lib/validation/faculty';
import { saveFile } from '../lib/helper/uploade';

export const addNewFaculty = validatedActionWithUser(
  facultySchema,
  async (data): Promise<ActionResult<TFaculty>> => {
    try {
      let avatarUrl: any = data.profileImage;
      if (data.profileImage instanceof File) {
        avatarUrl = await saveFile(data.profileImage, 'facultys');
      }
      data = { ...data, profileImage: avatarUrl };
      const facultys = await serverFetch<TFaculty>('/faculty', {
        method: 'POST',
        body: data,
      });

      revalidateTag('faculty');

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
          err instanceof Error ? err.message : FLASH_MESSAGE.UNESPECTED_ERROR,
      };
    }
  },
);
export const updatedFaculty = validatedActionWithUserJson(
  updateFacultySchema,
  async (data): Promise<ActionResult<TFaculty>> => {
    try {
      const { id, ...updateData } = data;
      const faculty = await serverFetch<TFaculty>(`/faculty/${id}`, {
        method: 'PATCH',
        body: updateData,
      });

      revalidateTag('faculty');

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
          err instanceof Error ? err.message : FLASH_MESSAGE.UNESPECTED_ERROR,
      };
    }
  },
);

export const assingFacultyToDiscipline = validatedActionWithUserJson(
  assignFacultyToSectionDisciplinesSchema,
  async (data): Promise<ActionResult<TFacultyDisciplines>> => {
    try {
      const { offeredCourseSectionId, assignments } = data;

      const discipline = await serverFetch<TFacultyDisciplines>(
        `/faculty/assign-faculty-to-section/${offeredCourseSectionId}`,
        {
          method: 'POST',
          body: { assignments },
        },
      );

      // revalidateTag('discipline');

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
          err instanceof Error ? err.message : FLASH_MESSAGE.UNESPECTED_ERROR,
      };
    }
  },
);

export const deleteFaculty = async (
  id: string,
): Promise<ActionResult<TFaculty>> => {
  try {
    const data = await serverFetch<TFaculty>(`/faculty/${id}`, {
      method: 'DELETE',
    });

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

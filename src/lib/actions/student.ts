'use server';

import { revalidateTag } from 'next/cache';
import { serverFetch } from '@/services/server-fetch';
import { TStudent } from '../../types/global';
import { validatedActionWithUser } from '../helper/action-helper';
import { ActionResult } from '../../types/api-error';
import { ApiResponseError } from '@/services/api-error';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { studentSchema, updateStudentSchema } from '../validation/student';

export const addNewStudent = validatedActionWithUser(
  studentSchema,
  async (data): Promise<ActionResult<TStudent>> => {
    try {
      const Students = await serverFetch<TStudent>('/student', {
        method: 'POST',
        body: data,
      });

      revalidateTag('student');

      return {
        error: false,
        data: Students,
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
  }
);
export const updatedStudent = validatedActionWithUser(
  updateStudentSchema,
  async (data): Promise<ActionResult<TStudent>> => {
    try {
      const { id, ...updateData } = data;
      const departements = await serverFetch<TStudent>(`/student/${id}`, {
        method: 'PATCH',
        body: updateData,
      });

      revalidateTag('student');

      return {
        error: false,
        data: departements,
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
  }
);

export const deleteStudent = async (
  id: string
): Promise<ActionResult<TStudent>> => {
  try {
    const data = await serverFetch<TStudent>(`/student/${id}`, {
      method: 'DELETE',
    });

    revalidateTag('student');
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

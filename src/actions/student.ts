'use server';

import { updateTag } from 'next/cache';
import { serverActionFetch } from '@/services/server-fetch';
import { TStudent, TStudentDocuments } from '../types/global';
import { validatedActionWithUser } from '../lib/helper/action-helper';
import { ActionResult } from '../types/api-error';
import { ApiResponseError } from '@/services/api-error';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import {
  reviewDocumentZodSchema,
  studentSchema,
  updateStudentSchema,
} from '../lib/validation/student';

export const addNewStudent = validatedActionWithUser(
  studentSchema,
  async (data): Promise<ActionResult<TStudent>> => {
    try {
      const Students = await serverActionFetch<TStudent>(`/student`, {
        method: 'POST',
        body: data,
      });

      updateTag('student');

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
  },
);
export const updatedStudent = validatedActionWithUser(
  updateStudentSchema,
  async (data): Promise<ActionResult<TStudent>> => {
    try {
      const { id, ...updateData } = data;
      const departements = await serverActionFetch<TStudent>(`/student/${id}`, {
        method: 'PATCH',
        body: updateData,
      });

      updateTag('student');

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
  },
);
export const updatedStudentDocuments = validatedActionWithUser(
  reviewDocumentZodSchema,
  async (data): Promise<ActionResult<TStudentDocuments>> => {
    try {
      const { documentId, ...updateData } = data;
      const departements = await serverActionFetch<TStudentDocuments>(
        `/student/documents/${documentId}`,
        {
          method: 'PATCH',
          body: updateData,
        },
      );

      updateTag('student-docs');

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
  },
);

export const deleteStudent = async (
  id: string,
): Promise<ActionResult<TStudent>> => {
  try {
    const data = await serverActionFetch<TStudent>(`/student/${id}`, {
      method: 'DELETE',
    });

    updateTag('student');
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

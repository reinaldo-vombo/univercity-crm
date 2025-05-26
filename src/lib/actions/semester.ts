'use server';

import { revalidateTag } from 'next/cache';
import { serverFetch } from '../helper/api/server-fetch';
import { TSemester } from '../types/global';
import { validatedActionWithUser } from '../action-helper';
import { semesterSchema } from '../validation/semester';
import { ApiResponseError } from '../helper/api/api-error';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { ActionResult } from '../types/api-error';

export const addNewDepartemant = validatedActionWithUser(
  semesterSchema,
  async (data): Promise<ActionResult<TSemester>> => {
    try {
      const departements = await serverFetch<TSemester>('/academic-semester', {
        method: 'POST',
        body: data,
      });

      revalidateTag('semester');

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
export const updatedDepartemant = validatedActionWithUser(
  semesterSchema,
  async (data, _, user): Promise<ActionResult<TSemester>> => {
    try {
      const departements = await serverFetch<TSemester>(
        `/academic-department/${user.id}`,
        {
          method: 'PATCH',
          body: data,
        }
      );

      revalidateTag('semester');

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

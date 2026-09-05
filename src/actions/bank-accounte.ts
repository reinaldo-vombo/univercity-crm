'use server';

import { updateTag } from 'next/cache';
import { serverActionFetch } from '@/services/server-fetch';
import {
  actionWithUser,
  validatedActionWithUser,
} from '../lib/helper/action-helper';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { ActionResult } from '../lib/errors/api-error.type';
import { TUniversityBankAccount } from '../types/global';
import { ApiResponseError } from '@/lib/errors/api-error';
import {
  createBankAccountZodSchema,
  updateBankAccountZodSchema,
} from '@/lib/validation/bank-account';

export const addNewBankAccount = validatedActionWithUser(
  createBankAccountZodSchema,
  async (data): Promise<ActionResult<TUniversityBankAccount>> => {
    try {
      const account = await serverActionFetch<TUniversityBankAccount>(
        '/bank-accountes',
        {
          method: 'POST',
          body: data,
        },
      );

      updateTag('bank-accountes');

      return {
        error: false,
        data: account,
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
  { action: 'create', subject: 'BankAccounte' },
);
export const updateBankAccount = validatedActionWithUser(
  updateBankAccountZodSchema,
  async (data): Promise<ActionResult<TUniversityBankAccount>> => {
    const { id, ...res } = data;
    try {
      const account = await serverActionFetch<TUniversityBankAccount>(
        `/bank-accountes/${id}`,
        {
          method: 'PATCH',
          body: res,
        },
      );

      updateTag('bank-accountes');

      return {
        error: false,
        data: account,
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
  { action: 'update', subject: 'AcademicFaculty' },
);

export const deleteFaculty = actionWithUser(
  async (id: string): Promise<ActionResult<TUniversityBankAccount>> => {
    try {
      const data = await serverActionFetch<TUniversityBankAccount>(
        `/bank-accountes/${id}`,
        {
          method: 'DELETE',
        },
      );

      updateTag('bank-accountes');
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
  },
  { action: 'delete', subject: 'BankAccounte' },
);

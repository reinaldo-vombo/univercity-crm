'use server';

import { revalidateTag } from 'next/cache';
import { serverFetch } from '../helper/api/server-fetch';
import { ActionResult, ActionState, TCurse } from '../types/global';
import { curseSchema } from '../validation/curse';
import { validatedActionWithUser } from '../action-helper';
import { FLASH_MESSAGE } from '@/constants/flash-message';

export const addNewCurse = validatedActionWithUser(
  curseSchema,
  async (data): Promise<ActionResult<TCurse>> => {
    try {
      const curses = await serverFetch<TCurse>('/academic-faculty', {
        method: 'POST',
        body: data,
      });

      revalidateTag('curses');

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

export const deleteCurse = async (id: string): Promise<ActionState<TCurse>> => {
  try {
    const data = await serverFetch<TCurse>(`/academic-faculty/${id}`, {
      method: 'DELETE',
    });

    revalidateTag('curses');
    return {
      error: false,
      message: FLASH_MESSAGE.COURSE_DELETED,
      data,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong';
    return {
      error: true,
      message,
    };
  }
};

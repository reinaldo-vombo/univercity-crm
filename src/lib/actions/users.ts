'use server';

import { revalidatePath } from 'next/cache';
import { validatedActionWithUser } from '../action-helper';
import { addNewUser } from '../helper/db/querys';
import { userSchema } from '../validation/user';
import { FLASH_MESSAGE } from '@/constants/flash-message';

export const registerUser = validatedActionWithUser(
  userSchema,
  async (data) => {
    try {
      await addNewUser(data);
      revalidatePath('/');
      return {
        success: true,
        message: FLASH_MESSAGE.USER_CREATED,
      };
    } catch (error) {
      return {
        error: true,
        message: error,
      };
    }
  }
);
export const updatedUser = async () => {};
export const deleteUser = async () => {};

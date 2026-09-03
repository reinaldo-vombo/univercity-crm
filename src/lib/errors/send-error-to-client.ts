import { serverEnv } from '@/config/env/server';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { ResponseError } from './api-error';

export const sendErrorToClient = (error: any) => {
  const isDevelopment = serverEnv.NODE_ENV === 'development';
  if (error instanceof ResponseError) {
    console.log('hello');

    return FLASH_MESSAGE.SERVER_ERROR;
  }

  const message =
    error instanceof Error ? error.message : FLASH_MESSAGE.SERVER_ERROR;

  return isDevelopment ? message : FLASH_MESSAGE.SERVER_ERROR;
};

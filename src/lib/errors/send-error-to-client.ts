import { serverEnv } from '@/config/env/server';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { ApiResponseError } from './api-error';

export const sendErrorToClient = (error: any) => {
  const isDevelopment = serverEnv.NODE_ENV === 'development';
  if (error instanceof ApiResponseError) {
    return error.message;
  }

  const message =
    error instanceof Error ? error.message : FLASH_MESSAGE.SERVER_ERROR;

  return isDevelopment ? message : FLASH_MESSAGE.SERVER_ERROR;
};

import { serverEnv } from '@/config/env/server';
import { FLASH_MESSAGE } from '@/constants/flash-message';

export const sendErrorToClient = (error: any) => {
  const isDevelopment = serverEnv.NODE_ENV === 'development';

  return isDevelopment ? error.message : FLASH_MESSAGE.SERVER_ERROR;
};

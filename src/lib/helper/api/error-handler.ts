// lib/error/handle-api-error.ts
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { ApiResponseError } from './api-error';

export function handleApiError(error: unknown): never {
  if (error instanceof ApiResponseError) {
    console.error('API returned structured error:', {
      statusCode: error.statusCode,
      message: error.message,
      details: error.errorMessages,
      meta: error.meta,
    });

    throw new Error(error.message || FLASH_MESSAGE.UNESPECTED_ERROR);
  }

  if (error instanceof Error) {
    const message = error.message;

    if (message.includes('Fetch failed')) {
      throw new Error(message);
    }

    if (
      message.includes('NetworkError') ||
      message.includes('Failed to fetch')
    ) {
      throw new Error(FLASH_MESSAGE.SERVER_ERROR_500);
    }

    throw new Error(`${FLASH_MESSAGE.UNESPECTED_ERROR}: ${message}`);
  }

  throw new Error(FLASH_MESSAGE.UNESPECTED_ERROR);
}

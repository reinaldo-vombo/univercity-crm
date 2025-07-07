// lib/error/handle-api-error.ts
import { redirect } from 'next/navigation';
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

    if (
      message.includes('Fetch failed') ||
      message.includes('NetworkError') ||
      message.includes('Failed to fetch')
    ) {
      console.error('External API down detected, redirecting to /api-down');
      redirect('/api-down'); // immediately redirect
    }

    throw new Error(`${FLASH_MESSAGE.UNESPECTED_ERROR}: ${message}`);
  }

  throw new Error(FLASH_MESSAGE.UNESPECTED_ERROR);
}

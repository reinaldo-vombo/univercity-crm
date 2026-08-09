// lib/errors/error-handler.ts

import { NextResponse } from 'next/server';
import { AppError } from './app-error';
import { FLASH_MESSAGE } from '@/constants/flash-message';

export function RouteHandlerError(error: unknown, context?: string) {
  console.error(`[${context ?? 'API'}]`, error);

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
      },
      {
        status: error.statusCode,
      },
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: FLASH_MESSAGE.SERVER_ERROR,
    },
    {
      status: 500,
    },
  );
}

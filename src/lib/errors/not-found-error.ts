// lib/errors/not-found-error.ts
import { AppError } from './app-error';

export class NotFoundError extends AppError {
  constructor(message = 'O recurso solicitado não foi encontrado.') {
    super(message, 404, 'NOT_FOUND');
  }
}

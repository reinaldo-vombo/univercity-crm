// lib/errors/internal-server-error.ts
import { AppError } from './app-error';

export class InternalServerError extends AppError {
  constructor(message = 'Ocorreu um erro interno. Tente novamente.') {
    super(message, 500, 'INTERNAL_SERVER_ERROR');
  }
}

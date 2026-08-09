// lib/errors/forbidden-error.ts
import { AppError } from './app-error';

export class ForbiddenError extends AppError {
  constructor(message = 'Não tens permissão para realizar esta ação.') {
    super(message, 403, 'FORBIDDEN');
  }
}

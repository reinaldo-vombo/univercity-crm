// lib/errors/unauthorized-error.ts
import { AppError } from './app-error';

export class UnauthorizedError extends AppError {
  constructor(message = 'É necessário autenticar-se para continuar.') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

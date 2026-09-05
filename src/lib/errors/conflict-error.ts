// lib/errors/conflict-error.ts
import { AppError } from './app-error';

export class ConflictError extends AppError {
  constructor(message = 'Já existe um recurso com estas informações.') {
    super(message, 409, 'CONFLICT');
  }
}

// lib/errors/bad-request-error.ts
import { AppError } from './app-error';

export class BadRequestError extends AppError {
  constructor(message = 'Pedido inválido.') {
    super(message, 400, 'BAD_REQUEST');
  }
}

// lib/error/api-error.ts
export class ApiResponseError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errorMessages?: { path: string; message: string }[],
    public meta?: Record<string, any>,
    public stackTrace?: string
  ) {
    super(message);
    this.name = 'ApiResponseError';
  }
}

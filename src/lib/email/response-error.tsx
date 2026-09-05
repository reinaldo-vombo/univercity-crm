export class ResponseError extends Error {
   constructor(
      public status: number,
      public message: string,
      public errorMessages?: { path: string; message: string }[],
      public stackTrace?: string
   ) {
      super(message);
      this.name = 'AppResponseError';
   }
}
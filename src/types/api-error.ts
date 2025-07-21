export type ActionError = {
  error: true;
  message: string;
  errorMessages?: { path: string; message: string }[];
  meta?: Record<string, any>;
};

export type ActionSuccess<T> = {
  error: false;
  data: T;
};

export type ActionResult<T> = ActionError | ActionSuccess<T>;

export type ActionState<T> =
  | { error: false; message: string; data: T }
  | { error: true; message: string };

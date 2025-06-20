import { z } from 'zod';
import { TUser } from '@/lib/types/global';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/config';
import { FLASH_MESSAGE } from '@/constants/flash-message';

export type ActionState = {
  error?: string;
  success?: string;
  [key: string]: any;
};

// Generic type for actions with schema validation (no auth)
type ValidatedActionFn<S extends z.ZodTypeAny, R> = (
  data: z.infer<S>,
  formData: FormData
) => Promise<R>;

// Generic type for actions with schema + authenticated user
type ValidatedUserActionFn<S extends z.ZodTypeAny, R> = (
  data: z.infer<S>,
  formData: FormData,
  user: TUser
) => Promise<R>;

/**
 * Wraps an action function with schema validation only
 */
export function validatedAction<S extends z.ZodTypeAny, R>(
  schema: S,
  actionFn: ValidatedActionFn<S, R>
) {
  return async (prevState: ActionState, formData: FormData): Promise<R> => {
    const parsed = schema.safeParse(Object.fromEntries(formData.entries()));

    if (!parsed.success) {
      return { error: parsed.error.errors[0].message } as R;
    }

    return actionFn(parsed.data, formData);
  };
}

/**
 * Wraps an action function with schema validation and session-based auth
 */

// export function validatedActionWithUser<S extends z.ZodTypeAny, R>(
//   schema: S,
//   actionFn: ValidatedUserActionFn<S, R>
// ) {
//   return async (formData: FormData): Promise<R> => {
//     const session = await getServerSession(authOptions);
//     const user = session?.user;

//     if (!user) {
//       return {
//         error: true,
//         message: FLASH_MESSAGE.NOTAUTHORIZED,
//       } as R;
//     }
//     const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
//     console.log('parsed path', parsed.error?.errors[0].path);
//     console.log('parsed message', parsed.error?.errors[0].message);
//     if (!parsed.success) {
//       return {
//         error: true,
//         message: parsed.error.errors[0].message,
//       } as R;
//     }

//     return actionFn(parsed.data, formData, user);
//   };
// }
export function validatedActionWithUser<S extends z.ZodTypeAny, R>(
  schema: S,
  actionFn: ValidatedUserActionFn<S, R>
) {
  return async (formData: FormData): Promise<R> => {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
      return {
        error: true,
        message: FLASH_MESSAGE.NOTAUTHORIZED,
      } as R;
    }

    const formObject: any = Object.fromEntries(formData.entries());
    if (formObject.durationInYears) {
      formObject.durationInYears = Number(formObject.durationInYears);
    }
    if (formObject.credits) {
      formObject.credits = Number(formObject.credits);
    }

    // Parse with Zod
    const parsed = schema.safeParse(formObject);

    console.log('parsed path', parsed.error?.errors[0].path);
    console.log('parsed message', parsed.error?.errors[0].message);

    if (!parsed.success) {
      return {
        error: true,
        message: parsed.error.errors[0].message,
      } as R;
    }

    return actionFn(parsed.data, formData, user);
  };
}

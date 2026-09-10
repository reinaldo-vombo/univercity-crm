import { z } from 'zod';
import { TUser } from '@/types/global';
import { getServerSession } from 'next-auth';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { authOptions } from '@/config/auth';
import { Action, hasPermission, Subject } from './auth/permissions';

export type ActionState = {
  error?: string;
  success?: string;
  [key: string]: any;
};
type RequiredPermission = { action: Action; subject: Subject };
// Generic type for actions with schema validation (no auth)
type ValidatedActionFn<S extends z.ZodTypeAny, R> = (
  data: z.infer<S>,
  formData: FormData,
) => Promise<R>;

// Generic type for actions with schema + authenticated user
type ValidatedUserActionFn<S extends z.ZodTypeAny, R> = (
  data: z.infer<S>,
  formData: FormData,
  user: TUser,
) => Promise<R>;

type TUserIdAction<R> = (id: string, user: TUser) => Promise<R>;

/**
 * Wraps an action function with schema validation only
 */
export function validatedAction<S extends z.ZodTypeAny, R>(
  schema: S,
  actionFn: ValidatedActionFn<S, R>,
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

export function actionWithUser<R>(
  actionnFn: TUserIdAction<R>,
  requiredPermission?: RequiredPermission,
) {
  return async (id?: string): Promise<R> => {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const currentUser: any = user;

    if (!user) {
      return {
        error: true,
        message: FLASH_MESSAGE.PERMISSION_NOT_FOUND,
      } as R;
    }

    if (!requiredPermission) {
      return {
        error: true,
        message: FLASH_MESSAGE.NO_PERMISSION,
      } as R;
    }
    if (requiredPermission) {
      const allowed = hasPermission(
        user.permissions ?? [],
        requiredPermission.action,
        requiredPermission.subject,
      );

      if (!allowed) {
        return {
          error: true,
          message: FLASH_MESSAGE.NO_PERMISSION,
        } as R;
      }
    }

    return actionnFn(id || '', currentUser);
  };
}
export function validatedActionWithUser<S extends z.ZodTypeAny, R>(
  schema: S,
  actionFn: ValidatedUserActionFn<S, R>,
  requiredPermission?: RequiredPermission,
) {
  return async (formData: FormData): Promise<R> => {
    const session: any = await getServerSession(authOptions);
    const user: TUser = session?.user;

    if (!user) {
      return {
        error: true,
        message: FLASH_MESSAGE.UNAUTHORIZED,
      } as R;
    }

    if (!requiredPermission) {
      return {
        error: true,
        message: FLASH_MESSAGE.PERMISSION_NOT_FOUND,
      } as R;
    }
    if (requiredPermission) {
      const allowed = hasPermission(
        user.permissions ?? [],
        requiredPermission.action,
        requiredPermission.subject,
      );

      if (!allowed) {
        return {
          error: true,
          message: FLASH_MESSAGE.NO_PERMISSION,
        } as R;
      }
    }
    const formObject: Record<
      string,
      FormDataEntryValue | FormDataEntryValue[]
    > = {};
    for (const key of formData.keys()) {
      const values = formData.getAll(key);
      formObject[key] = values.length > 1 ? values : values[0];
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

export function validatedActionWithUserJson<S extends z.ZodTypeAny, R>(
  schema: S,
  actionFn: ValidatedUserActionFn<S, R>,
  requiredPermission?: RequiredPermission,
) {
  return async (formData: FormData): Promise<R> => {
    const session: any = await getServerSession(authOptions);
    const user: TUser = session?.user;

    if (!user) {
      return {
        error: true,
        message: FLASH_MESSAGE.UNAUTHORIZED,
      } as R;
    }
    if (!requiredPermission) {
      return {
        error: true,
        message: FLASH_MESSAGE.PERMISSION_NOT_FOUND,
      } as R;
    }
    if (requiredPermission) {
      const allowed = hasPermission(
        user.permissions ?? [],
        requiredPermission.action,
        requiredPermission.subject,
      );

      if (!allowed) {
        return {
          error: true,
          message: FLASH_MESSAGE.NO_PERMISSION,
        } as R;
      }
    }

    const formObject: Record<string, any> = {};

    const shape = schema instanceof z.ZodObject ? schema.shape : undefined;

    for (const key of formData.keys()) {
      const values = formData.getAll(key);

      const schemaField = shape?.[key];

      const isArrayField = schemaField instanceof z.ZodArray;

      // 👇 Campo definido como array no schema
      if (isArrayField) {
        formObject[key] = values.map((v) => {
          if (typeof v === 'string') {
            const trimmed = v.trim();
            if (
              (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
              (trimmed.startsWith('[') && trimmed.endsWith(']'))
            ) {
              try {
                return JSON.parse(trimmed);
              } catch {
                return v;
              }
            }
          }
          return v;
        });

        // se veio um único array serializado
        if (formObject[key].length === 1 && Array.isArray(formObject[key][0])) {
          formObject[key] = formObject[key][0];
        }

        continue;
      }

      // 👇 Campo não-array
      const value = values[0];

      if (typeof value === 'string') {
        const trimmed = value.trim();
        if (
          (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
          (trimmed.startsWith('[') && trimmed.endsWith(']'))
        ) {
          try {
            formObject[key] = JSON.parse(trimmed);
            continue;
          } catch {}
        }
      }

      formObject[key] = value;
    }

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

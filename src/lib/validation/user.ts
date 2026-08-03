import * as z from 'zod';
import { ENUM_USER_ROLE } from '../enums/user';

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  avatar: z.instanceof(File).optional(),
  role: z.enum([
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.DEPARTMENT_HEAD,
    ENUM_USER_ROLE.STAFF,
  ]),
});
export const updateSchema = z.object({
  id: z.string({ message: 'userId é obrigatorio' }),
  name: z.string().min(1, { message: 'Nome deve conter no minimo 5' }),
  email: z.string().email({ message: 'Email é obrigatorio' }),
  role: z.enum([
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.DEPARTMENT_HEAD,
    ENUM_USER_ROLE.STAFF,
  ]),
  contact: z
    .object({
      phone: z.coerce.number().optional(),
      location: z.string().optional(),
    })
    .optional(),
  avatar: z.instanceof(File).optional(),
});

export const changePasswordShema = z.object({
  corrent_password: z
    .string({ required_error: 'Senha antinga é obrigatoria' })
    .min(5, { message: 'Senha deve conter no minimo 5 carateres' }),
  new_password: z
    .string({ required_error: 'Nova senha antinga é obrigatoria' })
    .min(5, { message: 'Senha deve conter no minimo 5 carateres' }),
  confirm_password: z
    .string({ required_error: 'Senha de confirmação é obrigatoria' })
    .min(5, { message: 'Senha deve conter no minimo 5 carateres' }),
});
export const preferenceShema = z.object({
  enabled: z.coerce.boolean(),
  user_action: z.coerce.boolean(),
  users_logs: z.coerce.boolean(),
  student_action: z.coerce.boolean(),
  department_action: z.coerce.boolean(),
  payment_action: z.coerce.boolean(),
  course_action: z.coerce.boolean(),
  events_action: z.coerce.boolean(),
  calendar_action: z.coerce.boolean(),
  exames_action: z.coerce.boolean(),
});

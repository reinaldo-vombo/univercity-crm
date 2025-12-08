import * as z from 'zod';

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum([
    'super_admin',
    'admin',
    'student',
    'faculty',
    'accountant',
    'editor',
    'department_head',
  ]),
});
export const updateSchema = z.object({
  id: z.string({ message: 'userId é obrigatorio' }),
  name: z.string().min(1, { message: 'Nome deve conter no minimo 5' }),
  email: z.string().email({ message: 'Email é obrigatorio' }),
  role: z.string().optional(),
  contact: z
    .object({ phone: z.coerce.number(), location: z.string() })
    .optional(),
  avatar: z
    .union([z.string().url(), z.instanceof(File)])
    .nullable()
    .optional(),
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

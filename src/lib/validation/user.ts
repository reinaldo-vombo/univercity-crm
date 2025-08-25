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
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.string().optional(),
  avatar: z.union([z.string().url(), z.instanceof(File)]).optional(),
});

export const changePasswordShema = z.object({
  corrent_password: z
    .string({ required_error: 'Senha antinga é obrigatoria' })
    .min(7, { message: 'Senha deve conter no minimo 7 carateres' })
    .max(8),
  new_password: z
    .string({ required_error: 'Nova senha antinga é obrigatoria' })
    .min(7, { message: 'Senha deve conter no minimo 7 carateres' })
    .max(8),
  confirm_password: z
    .string({ required_error: 'Senha de confirmação é obrigatoria' })
    .min(7, { message: 'Senha deve conter no minimo 7 carateres' })
    .max(8),
});

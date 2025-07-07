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
  name: z.string().min(1),
  email: z.string().email(),
  role: z.string().optional(),
  avatar: z.union([z.string().url(), z.instanceof(File)]).optional(),
});

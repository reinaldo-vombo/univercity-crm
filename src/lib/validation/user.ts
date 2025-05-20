import * as z from 'zod';

export const userSchema = z.object({
  name: z.string().min(1).max(9),
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

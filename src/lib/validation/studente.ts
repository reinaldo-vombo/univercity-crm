import * as z from 'zod';

export const studentSchema = z.object({
  number: z.string().min(1),
  password: z.string(),
});

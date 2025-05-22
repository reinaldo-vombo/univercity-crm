import * as z from 'zod';

export const curseSchema = z.object({
  title: z.string().min(1),
});

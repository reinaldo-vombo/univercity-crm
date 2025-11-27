import { z } from 'zod';

export const createMenssageSchema = z.object({
  type: z.string(),
  message: z
    .string()
    .max(102, { message: 'A menssagem deve conter apenas 120 carateres' })
    .optional(),
});

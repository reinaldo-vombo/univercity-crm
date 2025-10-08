import { z } from 'zod';

export const createMenssageSchema = z.object({
  type: z.string(),
  smsMessage: z
    .string()
    .max(102, { message: 'A menssagem deve conter apenas 120 carateres' })
    .optional(),
  menssage: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().optional(),
});

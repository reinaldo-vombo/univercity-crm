import { z } from 'zod';

export const createpriceSchema = z.object({
  amount: z.coerce.number(),
  currency: z.string().optional(),
  description: z.string().optional(),
});
export const UpdatePriceSchema = z.object({
  id: z.string(),
  amount: z.coerce.number(),
  currency: z.string().optional(),
  description: z.string().optional(),
});

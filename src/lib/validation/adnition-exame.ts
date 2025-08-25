import { z } from 'zod';

export const admitionExameSchema = z.object({
  id: z.string(),
  applicantName: z.string({ required_error: 'Primero nome é obrigatorio' }),
  paymentAmoute: z.coerce.number({ required_error: 'Pagamento é obrigatorio' }),
  aprovePayment: z.coerce.boolean(),
  passed: z.coerce.boolean(),
  exameResults: z.coerce.number(),
  exameDate: z.coerce.date({ required_error: 'Data do exame é obrigatorio' }),
});

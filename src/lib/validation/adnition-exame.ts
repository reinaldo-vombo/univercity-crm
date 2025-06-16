import { z } from 'zod';

export const admitionExameSchema = z.object({
  applicantName: z.string({ required_error: 'Primero nome é obrigatorio' }),
  paymentAmoute: z
    .number({ required_error: 'Pagamento é obrigatorio' })
    .nullable(),
  aprovePayment: z.boolean().nullable(),
  passed: z.boolean().nullable(),
  exameResults: z.number().nullable(),
  exameDate: z.date({ required_error: 'Data do exame é obrigatorio' }),
});

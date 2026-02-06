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
export const admitionExameFaseSchema = z.object({
  name: z
    .string({ message: 'nome é obrigatorio' })
    .min(1, { message: 'nome é obrigatorio' }),
  ordem: z.coerce
    .number({ message: 'Numeração é obrigatorio' })
    .min(1, { message: 'Numeração é obrigatorio' }),
  buildingId: z.coerce.number().optional(),
  roomId: z.coerce.number().optional(),
  startDate: z.coerce.date({ message: 'Data do exame é obrigatorio' }),
  endDate: z.coerce.date({ message: 'Data do exame é obrigatorio' }),
  duoDate: z.coerce.date({ message: 'Data do exame é obrigatorio' }),
});
export const updateAdmitionExameFaseSchema = z.object({
  id: z.coerce.number(),
  name: z
    .string({ message: 'nome é obrigatorio' })
    .min(1, { message: 'nome é obrigatorio' }),
  ordem: z.coerce
    .number({ message: 'Numeração é obrigatorio' })
    .min(1, { message: 'Numeração é obrigatorio' }),
  buildingId: z.coerce.number().optional(),
  roomId: z.coerce.number().optional(),
  startDate: z.coerce.date({ message: 'Data inicail do exame é obrigatorio' }),
  endDate: z.coerce.date({ message: 'Data final do exame é obrigatorio' }),
  duoDate: z.coerce.date({ message: 'Data do exame é obrigatorio' }),
});

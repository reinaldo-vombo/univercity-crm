import { z } from 'zod';

export const admitionExameSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, 'Primero nome é obrigatorio'),
  middleName: z.string().min(1, 'Nome do Meio é obrigatorio'),
  lastName: z.string().min(1, 'Ultimo nome é obrigatorio'),
  paymentAmoute: z.coerce.number({ required_error: 'Pagamento é obrigatorio' }),
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

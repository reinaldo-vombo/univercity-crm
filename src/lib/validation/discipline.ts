import { z } from 'zod';

export const disciplineSchema = z.object({
  name: z.string({
    required_error: 'O nome da disciplina é obrigatório',
  }),
  code: z.string({
    required_error: 'O código da disciplina é obrigatório',
  }),
  description: z.string().optional(),
  credits: z.coerce
    .number({
      required_error: 'O número de créditos é obrigatório',
    })
    .min(1, { message: 'Créditos devem ser maior que 0' }),
  minimumGradeToDismiss: z.coerce.number(),
});

export const updateDisciplineSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  code: z.string().optional(),
  description: z.string().optional(),
  credits: z.coerce.number(),
  minimumGradeToDismiss: z.coerce.number(),
});

import { z } from 'zod';

export const createEventSchema = z.object({
  title: z.string({
    required_error: 'Titulo é obrigatório',
  }),
  description: z.string({
    required_error: 'descrição é obrigatório',
  }),
  color: z.string({
    required_error: 'Cor é obrigatório',
  }),
  location: z.string({
    required_error: 'Localização é obrigatório',
  }),
  required: z.boolean().optional(),
  date: z.date({
    required_error: 'Data é obrigatório',
  }),
});

export const updateEventSchema = z.object({
  id: z.string(),
  title: z.string({
    required_error: 'Titulo é obrigatório',
  }),
  description: z.string({
    required_error: 'descrição é obrigatório',
  }),
  color: z.string({
    required_error: 'Cor é obrigatório',
  }),
  location: z.string({
    required_error: 'Localização é obrigatório',
  }),
  required: z.boolean().optional(),
  date: z.date({
    required_error: 'Data é obrigatório',
  }),
});

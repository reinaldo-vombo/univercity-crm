import { z } from 'zod';

export const createEventSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  description: z.string().optional(),
  type: z.enum(['EVENTO', 'SERVICO_ACADEMICO']),
  location: z.string().optional(),
  start: z.coerce.date({
    required_error: 'Data é obrigatorio',
  }),
  end: z.coerce.date({
    required_error: 'Data é obrigatorio',
  }),
});

export const updateEventCalendarSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string(),
  type: z.enum(['EVENTO', 'SERVICO_ACADEMICO']),
  location: z.string(),
  start: z.coerce.date(),
  end: z.coerce.date(),
});

import { z } from 'zod';

export const courseSchema = z.object({
  title: z.string({
    required_error: 'Titulo é obrigatorio',
  }),
  code: z.string({
    required_error: 'Codigo é obrigatorio',
  }),
  credits: z.number({
    required_error: 'Creditos é obrigatorio',
  }),
});
export const updateCourseSchema = z.object({
  id: z.string(),
  title: z.string({
    required_error: 'Titulo é obrigatorio',
  }),
  code: z.string({
    required_error: 'Codigo é obrigatorio',
  }),
  credits: z.number({
    required_error: 'Creditos é obrigatorio',
  }),
});

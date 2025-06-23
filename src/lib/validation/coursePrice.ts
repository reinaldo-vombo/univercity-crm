import { z } from 'zod';

export const coursePriceSchema = z.object({
  price: z.string({
    required_error: 'Preço é obrigatorio',
  }),
  courseId: z.string({
    required_error: 'É obrigatorio selecionar o curso',
  }),
});
export const updateCoursePriceSchema = z.object({
  id: z.string(),
  price: z.string({
    required_error: 'Preço é obrigatorio',
  }),
  courseId: z.string({
    required_error: 'É obrigatorio selecionar o curso',
  }),
});

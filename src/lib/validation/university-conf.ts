import { z } from 'zod';

export const academicServiceZodShema = z.object({
  title: z.string().min(1, 'Titulo é obrigatorio'),
  priceId: z.string().min(1, 'preço é obrigatorio'),
});
export const updateAcademicServiceZodShema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Titulo é obrigatorio'),
  priceId: z.string().min(1, 'preço é obrigatorio'),
});

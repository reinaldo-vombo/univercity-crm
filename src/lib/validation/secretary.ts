import { z } from 'zod';

export const reviewCourseTransferZodSchema = z.object({
  decision: z.enum(['APPROVED', 'REJECTED']),
  adminNote: z.string().optional(),
  keptDisciplineIds: z
    .array(z.object({ disciplineId: z.string(), originalMark: z.number() }))
    .optional(),
});
export const requestCourseTransferZodSchema = z.object({
  reason: z.string().optional(),
});
export const academicServiceZodShema = z.object({
  title: z.string().min(1, 'Titulo é obrigatorio'),
  priceId: z.string().min(1, 'preço é obrigatorio'),
});
export const updateAcademicServiceZodShema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Titulo é obrigatorio'),
  priceId: z.string().min(1, 'preço é obrigatorio'),
});

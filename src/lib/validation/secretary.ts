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

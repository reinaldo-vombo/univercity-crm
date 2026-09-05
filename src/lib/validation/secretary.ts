import { z } from 'zod';
const ServicePeriodType = z.enum(['ADMISSION_EXAM', 'RESIT', 'SPECIAL_EXAM']); // ajusta aos teus valores

export const reviewCourseTransferZodSchema = z.object({
  decision: z.enum(['APPROVED', 'REJECTED']),
  adminNote: z.string().optional(),
  keptDisciplineIds: z
    .array(z.object({ disciplineId: z.string(), originalMark: z.number() }))
    .optional(),
});
export const requestCourseTransferZodSchema = z.object({
  reason: z.string().optional(),
  studentId: z.string(),
  toCourseId: z.string(),
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
const periodSchema = z
  .object({
    type: ServicePeriodType,
    startDate: z.string().min(1, 'Data de início obrigatória'),
    endDate: z.string().min(1, 'Data de fim obrigatória'),
    isActive: z.boolean(),
  })
  .refine((d) => new Date(d.endDate) > new Date(d.startDate), {
    message: 'Data de fim deve ser depois da data de início',
    path: ['endDate'],
  });

export const createPeriodSchema = z.object({
  periods: z.array(periodSchema).min(1, 'Adiciona pelo menos um período'),
});

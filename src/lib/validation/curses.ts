import { z } from 'zod';

export const courseSchema = z.object({
  title: z.string({
    required_error: 'Titulo é obrigatorio',
  }),
  code: z.string({
    required_error: 'Codigo é obrigatorio',
  }),
  academicDepartmentId: z.string({
    required_error: 'Departamento acadêmico é obrigatorio',
  }),
  durationInYears: z.coerce.number({
    required_error: 'O ano de duração é obrigatorio',
  }),
  yearLevel: z.enum(['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH']),
  shiftId: z.coerce.number(),
  priceId: z.string().optional(),
});
export const updateCourseSchema = z.object({
  id: z.string(),
  title: z.string({
    required_error: 'Nome do Curso é obrigatorio',
  }),
  academicDepartmentId: z.string({
    required_error: 'Departamento acadêmico é obrigatorio',
  }),
  durationInYears: z.coerce.number({
    required_error: 'O ano de duração é obrigatorio',
  }),
  code: z.string({
    required_error: 'Codigo é obrigatorio',
  }),
  yearLevel: z.enum(['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH']),
  shiftId: z.coerce.number(),
  priceId: z.string().optional(),
});
export const assignRemoveCoursesZodSchema = z.object({
  courseId: z.string().uuid(),
  facultys: z.array(z.string(), {
    required_error: 'Selecione pelo menos um professor',
  }),
});

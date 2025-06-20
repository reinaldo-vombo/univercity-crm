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
  credits: z.number(),
  durationInYears: z.number({
    required_error: 'O ano de duração é obrigatorio',
  }),
});
export const updateCourseSchema = z.object({
  id: z.string(),
  title: z.string({
    required_error: 'Titulo é obrigatorio',
  }),
  academicDepartmentId: z.string({
    required_error: 'Departamento acadêmico é obrigatorio',
  }),
  durationInYears: z.number({
    required_error: 'O ano de duração é obrigatorio',
  }),
  code: z.string({
    required_error: 'Codigo é obrigatorio',
  }),
  credits: z.number({
    required_error: 'Creditos é obrigatorio',
  }),
});

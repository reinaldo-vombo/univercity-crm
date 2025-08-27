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
  shift: z.enum(['MORNING', 'AFTERNOON', 'EVENING']),
});
export const updateCourseSchema = z.object({
  id: z.string(),
  title: z.string({
    required_error: 'Titulo é obrigatorio',
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
  credits: z.number({
    required_error: 'Creditos é obrigatorio',
  }),
  yearLevel: z.enum(['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH']).optional(),
  shift: z.enum(['MORNING', 'AFTERNOON', 'EVENING']).optional(),
});
export const assignRemoveFacultiesSchema = z.object({
  id: z.string(),
  // faculties: z.array(z.string(), {
  //   required_error: 'Faculties Are Required',
  // }),
  faculties: z.any(),
  // faculties: z
  //   .union([z.string(), z.array(z.string())])
  //   .transform((val) => (typeof val === 'string' ? [val] : val))
  //   .refine((val) => val.length > 0, {
  //     message: 'Faculties are required',
  //   }),
});
export type AssignRemoveFaculties = z.infer<typeof assignRemoveFacultiesSchema>;

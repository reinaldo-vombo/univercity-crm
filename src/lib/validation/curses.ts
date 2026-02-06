import { z } from 'zod';

export const courseSchema = z.object({
  title: z
    .string({
      required_error: 'Titulo é obrigatorio',
    })
    .min(1, { message: 'Titulo é obrigatorio' }),
  academicDepartmentId: z
    .string({
      required_error: 'Departamento acadêmico é obrigatorio',
    })
    .min(1, { message: 'Departamento é obrigatorio' }),
  durationInYears: z.coerce.number({
    required_error: 'O ano de duração é obrigatorio',
  }),
  priceId: z.string().optional(),
  shiftIds: z
    .array(z.coerce.number())
    .min(1, { message: 'Selecione os turnos' }),
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
  priceId: z.string().optional(),
  shiftIds: z
    .array(z.coerce.number())
    .min(1, { message: 'Selecione os turnos' }),
});
export const assignRemoveCoursesZodSchema = z.object({
  courseId: z.string().uuid(),
  facultys: z.array(z.string(), {
    required_error: 'Selecione pelo menos um professor',
  }),
});

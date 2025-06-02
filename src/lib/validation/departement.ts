import * as z from 'zod';

export const departmentSchema = z.object({
  id: z.string(),
  title: z.string({ required_error: 'Nome do departamento é obrigatorio' }),
  departmentHeadId: z.string().nullable(),
  academicFacultyId: z.string({
    required_error: 'Academic Faculty is Required',
  }),
});

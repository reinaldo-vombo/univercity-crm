import * as z from 'zod';

export const departmentSchema = z.object({
  title: z.string({ required_error: 'Nome do departamento é obrigatorio' }),
  academicFacultyId: z.string({
    required_error: 'Academic Faculty is Required',
  }),
});

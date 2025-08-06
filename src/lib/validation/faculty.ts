import { z } from 'zod';

export const facultySchema = z.object({
  firstName: z.string({
    required_error: 'Primero nome é obrigatorio',
  }),
  lastName: z.string({
    required_error: 'Último nome é obrigatorio',
  }),
  middleName: z.string().optional(),
  profileImage: z.union([z.string().url(), z.instanceof(File)]).optional(),
  email: z.string({
    required_error: 'Email é obrigatorio',
  }),
  contactNo: z.string().optional(),
  gender: z.string({
    required_error: 'Genero é obrigatorio',
  }),
  designation: z.string({
    required_error: 'Designation is required',
  }),
  academicDepartmentId: z.string({
    required_error: 'Departamento é obrigatorio',
  }),
  academicFacultyId: z.string({
    required_error: 'Únidade acadêmica é obrigatorio',
  }),
  shift: z.enum(['MORNING', 'AFTERNOON', 'EVENING']),
});

export const updateFacultySchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
  profileImage: z.string().optional().nullable(),
  email: z.string(),
  contactNo: z.string(),
  gender: z.string(),
  designation: z.string(),
  academicDepartmentId: z.string(),
  academicFacultyId: z.string(),
  shift: z.enum(['MORNING', 'AFTERNOON', 'EVENING']),
});

export const assignRemoveCoursesZodSchema = z.object({
  body: z.object({
    courses: z.array(z.string(), {
      required_error: 'Courses Are Required',
    }),
  }),
});

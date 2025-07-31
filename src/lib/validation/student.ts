import { z } from 'zod';

export const studentSchema = z.object({
  firstName: z.string({
    required_error: 'Primero nome é obrigatorio',
  }),
  lastName: z.string({
    required_error: 'Último nome é obrigatorio',
  }),
  middleName: z.string().optional(),
  profileImage: z.string().optional(),
  email: z.string({
    required_error: 'Email é obrigatorio',
  }),
  contactNo: z.string().optional(),
  gender: z.string({
    required_error: 'Genero é obrigatorio',
  }),
  academicSemesterId: z.string({
    required_error: 'Semestre academico é obrigatorio',
  }),

  CourseId: z.string({
    required_error: 'Curso é obrigatorio',
  }),
  shift: z.enum(['MORNING', 'AFTERNOON', 'EVENING']),
});

export const updateStudentSchema = z.object({
  studentId: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  middleName: z.string().optional(),
  profileImage: z.string().optional(),
  email: z.string().optional(),
  contactNo: z.string().optional(),
  gender: z.string().optional(),
  academicSemesterId: z.string().optional(),
  academicFacultyId: z.string().optional(),
  studentType: z.string().optional(),
  isWoker: z.string().optional(),
  CourseId: z.string({
    required_error: 'Curso é obrigatorio',
  }),
  shift: z.enum(['MORNING', 'AFTERNOON', 'EVENING']),
});

export const assignRemoveCoursesZodSchema = z.object({
  body: z.object({
    courses: z.array(z.string(), {
      required_error: 'Courses Are Required',
    }),
  }),
});

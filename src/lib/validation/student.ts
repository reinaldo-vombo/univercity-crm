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
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string(),
  profileImage: z.string(),
  email: z.string(),
  contactNo: z.string(),
  academicSemesterId: z.string(),
  academicFacultyId: z.string(),
  studentType: z.string().optional(),
  isWoker: z.boolean(),
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
export const studentLogIn = z.object({
  number: z.string({
    required_error: 'Número do estudante é obrigatorio',
  }),
  password: z
    .string({
      required_error: 'Palavra-passe é obrigatorio',
    })
    .max(10, { message: '10 caracteres no maximo' }),
});

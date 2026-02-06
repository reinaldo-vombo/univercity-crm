import { z } from 'zod';

export const createOfferedCourseZodSchema = z.object({
  academicDepartmentId: z.string({
    required_error: 'Academic Department Id is required',
  }),
  semesterRegistrationId: z.string({
    required_error: 'Semester Registration Id is required',
  }),
  courseIds: z.array(z.string({ required_error: 'Course Id is required' })),
  disciplineIds: z.array(
    z.string({ required_error: 'disciplineIds is required' }),
  ),
  yearLevel: z.enum(['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH']),
});
export const updateOfferedCourseZodSchema = z.object({
  id: z.string().uuid(),
  academicDepartmentId: z.string().optional(),
  semesterRegistrationId: z.string().optional(),
  disciplineIds: z.any(),
  courseIds: z.any(),
  yearLevel: z.enum(['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH']).optional(),
});

export const createOfferedCourseSectionZodSchema = z.object({
  maxCapacity: z.coerce
    .number({
      required_error: 'Capacidade maxima é obrigatorio',
    })
    .min(1, { message: 'Limite de vagas é obrigatorio' }),

  yearLevel: z.enum(['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH']),
  currentlyEnrolledStudent: z.coerce.number().optional(),
  offeredCourseId: z.string({
    required_error: 'Offered Course Id is required',
  }),
});

export const updateOfferedCourseSectionZodSchema = z.object({
  id: z.string(),
  title: z.string({}).optional(),
  maxCapacity: z.number({}).optional(),
  currentlyEnrolledStudent: z.coerce.number().optional(),
  offeredCourseId: z.string({}).optional(),
  shiftId: z.coerce.number(),
  yearLevel: z.enum(['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH']).optional(),
});
const defaultPricePerShiftSchema = z.record(z.coerce.number().min(0));

export const offeredCourseItemSchema = z.object({
  courseId: z.string().uuid('Curso inválido'),
  yearLevel: z.enum(['FIRST', 'SECOND', 'THIRD', 'FOURTH']),
  disciplineIds: z
    .array(z.string())
    .min(1, 'Selecione pelo menos uma disciplina'),
  defaultPricePerShift: defaultPricePerShiftSchema,
});

export const createOfferedCourseBatchSchema = z.object({
  academicDepartmentId: z.string().uuid({ message: 'Id invalido' }),
  semesterRegistrationId: z.string().uuid({ message: 'Id invalido' }),
  maxCapacity: z.coerce.number(),
  items: z
    .array(offeredCourseItemSchema)
    .min(1, 'Adicione pelo menos um curso'),
});

import { z } from 'zod';

export const disciplineSchema = z.object({
  name: z.string({
    required_error: 'O nome da disciplina é obrigatório',
  }),
  code: z.string({
    required_error: 'O código da disciplina é obrigatório',
  }),
  courseId: z.string({
    required_error: 'O id do curso é obrigatório',
  }),
  semesterId: z.string({
    required_error: 'O id do semestre é obrigatório',
  }),
  description: z.string().optional(),
  yearLevel: z.enum(['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH']),
  minimumGradeToDismiss: z.coerce.number(),
});

export const updateDisciplineSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  code: z.string().optional(),
  courseDisciplinesId: z.string().uuid(),
  semesterId: z.string().uuid(),
  courseId: z.string().uuid(),
  description: z.string().optional(),
  yearLevel: z.enum(['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH']).optional(),
  minimumGradeToDismiss: z.coerce.number(),
});

import { z } from 'zod';

export const disciplineSchema = z.object({
  name: z.string({ message: 'O nome da disciplina é obrigatório' }),
  code: z.string({
    message: 'O código da disciplina é obrigatório',
  }),
  courseId: z.string().min(1, { message: 'O curso é obrigatório' }),
  semesterId: z.string().min(1, { message: 'Semestre é obrigatório' }),
  description: z.string().optional(),
  yearLevel: z.enum(['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH'], {
    message: 'Ano curricular é obrigatorio',
  }),
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

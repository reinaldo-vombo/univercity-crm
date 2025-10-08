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
  minimumGradeToDismiss: z.coerce.number(),
});

export const updateDisciplineSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  courseId: z.string().optional(),
  semesterId: z.string().optional(),
  code: z.string().optional(),
  minimumGradeToDismiss: z.coerce.number(),
});

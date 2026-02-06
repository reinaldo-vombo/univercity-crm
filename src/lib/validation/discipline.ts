import { z } from 'zod';

export const disciplineSchema = z.object({
  name: z.string({ message: 'O nome da disciplina é obrigatório' }),
  courseId: z.string().min(1, { message: 'O curso é obrigatório' }),
  semesterId: z.string().min(1, { message: 'Semestre é obrigatório' }),
  description: z.string().optional(),
  yearLevel: z.enum(['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH'], {
    message: 'Ano curricular é obrigatorio',
  }),
  suspendGrade: z.coerce.number(),
});
export const bulkDisciplineSchema = z.object({
  courseId: z.string().min(1, 'Curso é obrigatorio'),
  semesterId: z.string().min(1, 'Semestre é obrigatorio'),
  disciplines: z
    .array(
      z.object({
        name: z.string().min(2, 'Nome obrigatório'),
        yearLevel: z.enum(['FIRST', 'SECOND', 'THIRD', 'FOURTH']),
        suspendGrade: z.number().min(0).max(20).optional(),
      }),
    )
    .min(1, 'Adicione pelo menos uma disciplina'),
});

export const updateDisciplineSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Nome obrigatório'),
  suspendGrade: z.coerce.number().min(1).max(20).optional(),
  courseId: z.string().min(1, 'Curso é obrigatorio'),
  semesterId: z.string().min(1, 'Semestre é obrigatorio'),
  courseDisciplineId: z.string(),
  yearLevel: z.enum(['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH']),
});

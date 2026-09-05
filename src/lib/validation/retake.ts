import { z } from 'zod';

export const updateBulkRetakeSchema = z.object({
  ids: z.array(z.coerce.number()),
  buildingId: z.coerce.number(),
  roomId: z.coerce.number(),
  time: z.string(),
  offeredCourseSectionId: z.string().min(1, 'A turma é obrigatorio'),
  academicSemesterId: z.string().min(1, 'O semestre é obrigatorio'),
  disciplineId: z.string().min(1, 'A disciplina é obrigatorio'),
  duoDate: z.coerce.date(),
});

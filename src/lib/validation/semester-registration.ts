import { z } from 'zod';

export const semesterRegisterSchema = z.object({
  startDate: z.date({
    required_error: 'Data inicial é obrigatorio',
  }),
  endDate: z.date({
    required_error: 'Data de encerramento é obrigatorio',
  }),
  status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']).optional(),

  academicSemesterId: z.string({
    required_error: 'Semestre academico é obrigatorio',
  }),
});
export const upadateSemesterRegisterSchema = z.object({
  id: z.string({ message: 'Id é obrogatório' }),
  startDate: z.date({
    required_error: 'Data inicial é obrigatorio',
  }),
  endDate: z.date({
    required_error: 'Data de encerramento é obrigatorio',
  }),
  status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']).optional(),
  academicSemesterId: z.string({
    required_error: 'Semestre academico é obrigatorio',
  }),
});

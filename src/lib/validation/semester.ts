import { months } from '@/constants/schedule';
import z from 'zod';

export const semesterSchema = z.object({
  title: z.enum(['1º Semestre', '2º Semestre'], {
    message: 'Temorada é obrigatorio',
  }),
  year: z.string({
    message: 'Ano corrente é obrigatorio',
  }),
  isCurrent: z.coerce.boolean(),
  code: z.enum(['01', '02', '03']),
  startMonth: z.enum(months, {
    message: 'Mês inicial é obrigatorio',
  }),
  endMonth: z.enum(months, {
    message: 'Mês de encerramento é obrigatorio',
  }),
});
export const updateSemesterSchema = z.object({
  id: z.string(),
  title: z.enum(['1º Semestre', '2º Semestre'], {
    message: 'Temorada é obrigatorio',
  }),
  year: z.string({
    message: 'Ano corrente é obrigatorio',
  }),
  isCurrent: z.coerce.boolean(),
  code: z.enum(['01', '02', '03']),
  startMonth: z.string({
    message: 'Mês inicial é obrigatorio',
  }),
  endMonth: z.string({
    message: 'Mês de encerramento é obrigatorio',
  }),
});

import { months } from '@/constants/mock-data';
import * as z from 'zod';

export const semesterSchema = z.object({
  title: z.enum(['1º Semestre', '2º Semestre'], {
    required_error: 'Temorada é obrigatorio',
  }),
  year: z.string({
    required_error: 'Ano corrente é obrigatorio',
  }),
  isCurrent: z.coerce.boolean(),
  code: z.enum(['01', '02', '03']),
  startMonth: z.enum(months, {
    required_error: 'Mês inicial é obrigatorio',
  }),
  endMonth: z.enum(months, {
    required_error: 'Mês de encerramento é obrigatorio',
  }),
});
export const updateSemesterSchema = z.object({
  id: z.string(),
  title: z.enum(['1 semestre', '2 semestre'], {
    required_error: 'Temorada é obrigatorio',
  }),
  year: z.string({
    required_error: 'Ano corrente é obrigatorio',
  }),
  isCurrent: z.coerce.boolean(),
  code: z.enum(['01', '02', '03']),
  startMonth: z.string({
    required_error: 'Mês inicial é obrigatorio',
  }),
  endMonth: z.string({
    required_error: 'Mês de encerramento é obrigatorio',
  }),
});

import { months } from '@/constants/mock-data';
import * as z from 'zod';

export const semesterSchema = z.object({
  title: z.enum(['Primavera', 'Outono', 'Verão', 'Inverno'], {
    required_error: 'Titulo é obrigatorio',
  }),
  year: z.string({
    required_error: 'Ano corrente é obrigatorio',
  }),
  isCurrent: z.boolean(),
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
  title: z.string({
    required_error: 'Titulo é obrigatorio',
  }),
  year: z.string({
    required_error: 'Ano corrente é obrigatorio',
  }),
  isCurrent: z.boolean(),
  code: z.string(),
  startMonth: z.string({
    required_error: 'Mês inicial é obrigatorio',
  }),
  endMonth: z.string({
    required_error: 'Mês de encerramento é obrigatorio',
  }),
});

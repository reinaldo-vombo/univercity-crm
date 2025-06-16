import { months } from '@/constants/mock-data';
import * as z from 'zod';

export const semesterSchema = z.object({
  title: z.enum(['Autumn', 'Summer', 'Fall'], {
    required_error: 'Titulo é obrigatorio',
  }),
  year: z.string({
    required_error: 'Ano corrente é obrigatorio',
  }),
  code: z.enum(['01', '02', '03']),
  startMonth: z.enum(months, {
    required_error: 'Mês inicial é obrigatorio',
  }),
  endMonth: z.enum(months, {
    required_error: 'Mês de encerramento é obrigatorio',
  }),
});
export const updateSemesterSchema = z.object({
  body: z
    .object({
      title: z.enum(['Autumn', 'Summer', 'Fall']).optional(),
      year: z.string().optional(),
      code: z.enum(['01', '02', '03']).optional(),
      startMonth: z.enum(months).optional(),
      endMonth: z.enum(months).optional(),
    })
    .refine(
      (data) => (data.title && data.code) || (!data.title && !data.code),
      {
        message: 'Title and code must be provided together',
        path: ['title', 'code'],
      }
    ),
});

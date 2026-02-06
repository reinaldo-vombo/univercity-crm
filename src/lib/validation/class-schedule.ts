import { z } from 'zod';

const classScheduleSchema = z.object({
  id: z.string().optional(),
  dayOfWeek: z.enum([
    'SEGUNDA',
    'TERCA',
    'QUARTA',
    'QUINTA',
    'SEXTA',
    'SABADO',
    'DOMINGO',
  ]),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Formato deve ser HH:mm'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Formato deve ser HH:mm'),
  roomId: z.coerce.number().min(1, 'Sala é obrigatória'),
  disciplineId: z.string().min(1, 'Disciplina é obrigatória'),
});

export const createScheduleSchema = z.object({
  offeredCourseSectionId: z.string().min(1, { message: 'Turma é obrigatorio' }),
  semesterRegistrationId: z
    .string()
    .min(1, { message: 'Registro semestral é obrigatorio' }),

  classSchedules: z
    .array(classScheduleSchema)
    .min(1, 'Adicione pelo menos um horário')
    .max(10, 'Máximo 10 blocos por requisição'),
});

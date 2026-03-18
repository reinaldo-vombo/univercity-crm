import { DayOfWeek } from '@/types/enum';
import { TStudentSchedule } from '@/types/global';

const DAY_MAP: Record<string, DayOfWeek> = {
  MONDAY: 'SEGUNDA',
  TUESDAY: 'TERCA',
  WEDNESDAY: 'QUARTA',
  THURSDAY: 'QUINTA',
  FRIDAY: 'SEXTA',
  SATURDAY: 'SABADO',
  SUNDAY: 'DOMINGO',
};
export function groupByDay(
  schedule: TStudentSchedule['schedule'],
): Partial<Record<DayOfWeek, TStudentSchedule['schedule']>> {
  return schedule.reduce(
    (acc, aula) => {
      const rawDay = aula.class.dayOfWeek; // "MONDAY"
      const day = (DAY_MAP[rawDay] ?? rawDay) as DayOfWeek; // "SEGUNDA"

      if (!acc[day]) acc[day] = [];
      acc[day]!.push(aula);
      return acc;
    },
    {} as Partial<Record<DayOfWeek, TStudentSchedule['schedule']>>,
  );
}

export function duration(start: string, end: string) {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  const mins = eh * 60 + em - (sh * 60 + sm);
  return `${mins / 60}h`;
}

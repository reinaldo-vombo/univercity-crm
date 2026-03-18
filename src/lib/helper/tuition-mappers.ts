// lib/tuition-mappers.ts

import { TuitionSemester } from '@/types/global';

// Buscar semestre específico
export function getTuitionSemester(
  data: TuitionSemester[],
  year: number,
  semester: '1º Semestre' | '2º Semestre',
) {
  return (
    data.find(
      (d) => d.semester.year === String(year) && d.semester.title === semester,
    ) ?? null
  );
}

// Todos os semestres de um ano
export function getTuitionByYear(tuitionData: TuitionSemester[], year: number) {
  return tuitionData.filter((d) => d.semester.year === String(year));
}

// Chart mensal — base vs multa (composição da propina)
export function getTuitionCompositionChart(
  tuitionData: TuitionSemester[],
  year: number,
  semester: '1º Semestre' | '2º Semestre',
) {
  const data = getTuitionSemester(tuitionData, year, semester);
  return (
    data?.monthlyBreakdown.map((m) => ({
      month: m.monthName,
      base: Math.round(m.baseAmount / 1000),
      multa: Math.round(m.lateFee / 1000),
      pago: Math.round(m.paid / 1000),
      pendente: Math.round(m.pending / 1000),
    })) ?? []
  );
}

// Alunos em dívida para tabela de alertas
export function getStudentsInDebt(
  tuitionData: TuitionSemester[],
  year: number,
  semester: '1º Semestre' | '2º Semestre',
) {
  const data = getTuitionSemester(tuitionData, year, semester);
  return (data?.studentBreakdown ?? [])
    .filter((s) => s.totalPending > 0)
    .sort((a, b) => b.totalPending - a.totalPending);
}

// byStatus formatado para gráfico de pizza
export function getStatusPieData(
  tuitionData: TuitionSemester[],
  year: number,
  semester: '1º Semestre' | '2º Semestre',
) {
  const data = getTuitionSemester(tuitionData, year, semester);
  if (!data) return [];
  return [
    {
      status: 'Pago',
      value: data.byStatus.PAID.total,
      count: data.byStatus.PAID.count,
    },
    {
      status: 'Pendente',
      value: data.byStatus.PENDING.total,
      count: data.byStatus.PENDING.count,
    },
    {
      status: 'Em atraso',
      value: data.byStatus.OVERDUE.total,
      count: data.byStatus.OVERDUE.count,
    },
  ];
}

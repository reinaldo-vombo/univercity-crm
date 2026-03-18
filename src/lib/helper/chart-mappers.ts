import { TGlobalAnalitics } from '@/types/global';

// lib/chart-mappers.ts — atualizado com taxa
export function getMonthlyChartData(data: TGlobalAnalitics[], year: number) {
  const entry = data.find((d) => d.year === year);
  if (!entry) return [];

  return entry.monthlyBreakdown.map((m) => ({
    month: m.monthName,
    cobrado: Math.round(m.totalCollected / 1000),
    pendente: Math.round(m.totalPending / 1000),
    taxa: Math.round((m.totalCollected / m.totalGenerated) * 100),
  }));
}
export function getRevenueSourceWithYoY(
  data: TGlobalAnalitics[],
  year: number,
) {
  const current = data.find((d) => d.year === year);
  const previous = data.find((d) => d.year === year - 1);

  return (
    current?.revenueBySource.map((item) => {
      const prevItem = previous?.revenueBySource.find(
        (p) => p.source === item.source,
      );
      const yoy = prevItem
        ? Math.round(((item.total - prevItem.total) / prevItem.total) * 1000) /
          10
        : null;

      return {
        ...item,
        yoy,
        previousTotal: prevItem?.total ?? null,
      };
    }) ?? []
  );
}
export function getYearlyChartData(data: TGlobalAnalitics[]) {
  return data.map((d) => ({
    month: String(d.year),
    cobrado: Math.round(d.summary.totalCollected / 1000),
    pendente: Math.round(d.summary.totalPending / 1000),
    taxa: d.summary.collectionRate,
  }));
}

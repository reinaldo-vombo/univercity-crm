// components/tuition/status-donut-chart.tsx
"use client"

import { useState } from "react"
import { Pie, PieChart, Cell } from "recharts"
import {
   ChartContainer, ChartTooltip, ChartTooltipContent,
   ChartLegend, ChartLegendContent, type ChartConfig,
} from "@/components/ui/chart"
import {
   Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction,
} from "@/components/ui/card"
import { getTuitionSemester } from "@/lib/helper/tuition-mappers"
import { TuitionSemester } from "@/types/global"
import { TuitionFilterSelect } from "@/components/table-filters/tuition-filter-select"
type TProps = {
   payload: TuitionSemester[]
}
const config = {
   Pago: { label: "Pago", color: "var(--chart-1)" },
   Pendente: { label: "Pendente", color: "var(--chart-2)" },
   "Em atraso": { label: "Em atraso", color: "var(--chart-3)" },
} satisfies ChartConfig

export function StatusDonutChart({ payload }: TProps) {
   const [year, setYear] = useState(new Date().getFullYear())
   const [semester, setSemester] = useState<"1º Semestre" | "2º Semestre">("1º Semestre")

   const data = getTuitionSemester(payload, year, semester)

   const chartData = data ? [
      { status: "Pago", value: data.byStatus.PAID.count, fill: "var(--color-Pago)" },
      { status: "Pendente", value: data.byStatus.PENDING.count, fill: "var(--color-Pendente)" },
      { status: "Em atraso", value: data.byStatus.OVERDUE.count, fill: "var(--color-Em atraso)" },
   ] : []

   return (
      <Card className="flex flex-col">
         <CardHeader>
            <div>
               <CardTitle>Estado dos pagamentos</CardTitle>
               <CardDescription>Distribuição por aluno</CardDescription>
            </div>
            <CardAction>
               <TuitionFilterSelect
                  year={year} semester={semester}
                  onYearChange={setYear} onSemesterChange={setSemester}
               />
            </CardAction>
         </CardHeader>
         <CardContent className="flex-1">
            <ChartContainer config={config} className="mx-auto aspect-square max-h-[220px]">
               <PieChart>
                  <ChartTooltip content={<ChartTooltipContent nameKey="status" />} />
                  <Pie data={chartData} dataKey="value" nameKey="status"
                     innerRadius={55} outerRadius={85} paddingAngle={3}>
                     {chartData.map((entry) => (
                        <Cell key={entry.status} fill={entry.fill} />
                     ))}
                  </Pie>
                  <ChartLegend content={<ChartLegendContent nameKey="status" />} />
               </PieChart>
            </ChartContainer>
         </CardContent>
      </Card>
   )
}
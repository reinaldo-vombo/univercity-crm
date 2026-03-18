// components/tuition/monthly-bar-chart.tsx
"use client"

import { useState } from "react"
import { Bar, ComposedChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"
import {
   ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart"
import {
   Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction,
} from "@/components/ui/card"
import { TuitionSemester } from "@/types/global"
import { getTuitionSemester } from "@/lib/helper/tuition-mappers"
import { TuitionFilterSelect } from "@/components/table-filters/tuition-filter-select"
import { formatCurrency } from "@/lib/helper"
type TProps = {
   payload: TuitionSemester[]
}
const config = {
   pago: { label: "Pago", color: "var(--chart-1)" },
   pendente: { label: "Pendente", color: "var(--chart-2)" },
   taxa: { label: "Taxa %", color: "var(--chart-3)" },
} satisfies ChartConfig

export function MonthlyBarChart({ payload }: TProps) {
   const [year, setYear] = useState(new Date().getFullYear())
   const [semester, setSemester] = useState<"1º Semestre" | "2º Semestre">("1º Semestre")

   const data = getTuitionSemester(payload, year, semester)

   const chartData = data?.monthlyBreakdown.map((m) => ({
      month: m.monthName.slice(0, 3),
      pago: Math.round(m.paid / 1000),
      pendente: Math.round(m.pending / 1000),
      taxa: Math.round((m.paid / m.totalAmount) * 100),
   })) ?? []

   return (
      <Card>
         <CardHeader>
            <div>
               <CardTitle>Cobrado vs Pendente</CardTitle>
               <CardDescription>Evolução mensal · <span className="text-green-500">{formatCurrency(data?.summary.totalAmount || 0)}</span></CardDescription>
            </div>
            <CardAction>
               <TuitionFilterSelect
                  year={year} semester={semester}
                  onYearChange={setYear} onSemesterChange={setSemester}
               />
            </CardAction>
         </CardHeader>
         <CardContent>
            <ChartContainer config={config} className="min-h-[240px] w-full">
               <ComposedChart data={chartData} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false}
                     tickFormatter={(v) => `${v}k`} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false}
                     domain={[60, 100]} tickFormatter={(v) => `${v}%`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar yAxisId="left" dataKey="pago" fill="var(--color-pago)" radius={4} />
                  <Bar yAxisId="left" dataKey="pendente" fill="var(--color-pendente)" radius={4} />
                  <Line yAxisId="right" dataKey="taxa" stroke="var(--color-taxa)"
                     dot={{ r: 4 }} strokeWidth={2} type="monotone" />
               </ComposedChart>
            </ChartContainer>
         </CardContent>
      </Card>
   )
}
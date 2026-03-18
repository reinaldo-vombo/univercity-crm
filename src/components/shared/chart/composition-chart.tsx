// components/tuition/composition-chart.tsx
"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
   ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart"
import {
   Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction,
} from "@/components/ui/card"
import { TuitionSemester } from "@/types/global"
import { getTuitionSemester } from "@/lib/helper/tuition-mappers"
import { TuitionFilterSelect } from "@/components/table-filters/tuition-filter-select"
type TProps = {
   payload: TuitionSemester[]
}
const config = {
   base: { label: "Propina base", color: "var(--chart-1)" },
   multa: { label: "Multa atraso", color: "var(--chart-2)" },
} satisfies ChartConfig

export function CompositionChart({ payload }: TProps) {
   const [year, setYear] = useState(new Date().getFullYear())
   const [semester, setSemester] = useState<"1º Semestre" | "2º Semestre">("1º Semestre")

   const data = getTuitionSemester(payload, year, semester)

   const chartData = data?.monthlyBreakdown.map((m) => ({
      month: m.monthName.slice(0, 3),
      base: Math.round(m.baseAmount / 1000),
      multa: Math.round(m.lateFee / 1000),
   })) ?? []

   return (
      <Card>
         <CardHeader>
            <div>
               <CardTitle>Composição da receita</CardTitle>
               <CardDescription>Propina base vs multas · mil Kz</CardDescription>
            </div>
            <CardAction>
               <TuitionFilterSelect
                  year={year} semester={semester}
                  onYearChange={setYear} onSemesterChange={setSemester}
               />
            </CardAction>
         </CardHeader>
         <CardContent>
            <ChartContainer config={config} className="min-h-[200px] w-full">
               <BarChart data={chartData} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="base" fill="var(--color-base)" radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="multa" fill="var(--color-multa)" radius={[4, 4, 0, 0]} stackId="a" />
               </BarChart>
            </ChartContainer>
         </CardContent>
      </Card>
   )
}